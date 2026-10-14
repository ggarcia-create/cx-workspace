#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde_json::{json, Value};
use std::{
    io::{BufRead, BufReader, Write},
    process::{Child, ChildStdin, ChildStdout, Command, Stdio},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc, Mutex,
    },
    time::Duration,
};
use tauri::{AppHandle, Manager, WebviewWindow};
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_opener::OpenerExt;
use tauri_plugin_updater::{Update, UpdaterExt};

struct Backend {
    child: Child,
    input: ChildStdin,
    output: BufReader<ChildStdout>,
    next: u64,
}
impl Backend {
    fn call(&mut self, app: &AppHandle, method: &str, input: Value) -> Result<Value, String> {
        self.next += 1;
        let id = self.next;
        writeln!(
            self.input,
            "{}",
            json!({"id":id,"method":method,"input":input})
        )
        .map_err(|_| "El servicio local no está disponible.")?;
        self.input.flush().map_err(|e| e.to_string())?;
        loop {
            let mut line = String::new();
            if self
                .output
                .read_line(&mut line)
                .map_err(|e| e.to_string())?
                == 0
            {
                return Err("El servicio local se cerró. Reinicia CX Workspace.".into());
            }
            let reply: Value =
                serde_json::from_str(&line).map_err(|_| "Respuesta local inválida.")?;
            if reply["event"] == "open-url" {
                let url = reply["url"].as_str().ok_or("Enlace inválido")?;
                let parsed = tauri::Url::parse(url).map_err(|_| "Enlace inválido")?;
                if !["https", "http"].contains(&parsed.scheme())
                    || !parsed.username().is_empty()
                    || parsed.password().is_some()
                {
                    return Err("Enlace no permitido".into());
                }
                app.opener()
                    .open_url(url, None::<&str>)
                    .map_err(|e| e.to_string())?;
                continue;
            }
            if reply["id"] != id {
                return Err("Respuesta fuera de secuencia".into());
            }
            if let Some(error) = reply["error"].as_str() {
                return Err(error.into());
            }
            return Ok(reply["result"].clone());
        }
    }
}
impl Drop for Backend {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}
struct State {
    backend: Arc<Mutex<Backend>>,
    status: Mutex<Value>,
    pending: Mutex<Option<(Update, Vec<u8>)>>,
    checking: AtomicBool,
    installing: AtomicBool,
    report: Mutex<String>,
}
fn status(app: &AppHandle, state: &str, message: &str) {
    *app.state::<State>().status.lock().unwrap() =
        json!({"state":state,"message":message,"version":app.package_info().version.to_string()});
}
async fn check(app: AppHandle) -> Result<Value, String> {
    let s = app.state::<State>();
    if s.pending.lock().unwrap().is_some() || s.checking.swap(true, Ordering::SeqCst) {
        return Ok(s.status.lock().unwrap().clone());
    }
    status(&app, "checking", "Buscando actualizaciones…");
    let result = async {
        let updater = app.updater().map_err(|e| e.to_string())?;
        if let Some(update) = updater.check().await.map_err(|e| e.to_string())? {
            status(
                &app,
                "downloading",
                &format!("Descargando actualización {}…", update.version),
            );
            let progress_app = app.clone();
            let mut downloaded = 0u64;
            let bytes = update
                .download(
                    move |len, total| {
                        downloaded += len as u64;
                        if let Some(total) = total.filter(|n| *n > 0) {
                            status(
                                &progress_app,
                                "downloading",
                                &format!(
                                    "Descargando actualización: {} %",
                                    downloaded * 100 / total
                                ),
                            );
                        }
                    },
                    || {},
                )
                .await
                .map_err(|e| e.to_string())?;
            // The updater verifies the archive signature before returning these bytes.
            *s.pending.lock().unwrap() = Some((update, bytes));
            status(
                &app,
                "ready",
                "Actualización lista. Se instalará al cerrar CX Workspace.",
            );
        } else {
            status(&app, "current", "Tienes la versión más reciente.");
        }
        Ok::<(), String>(())
    }
    .await;
    if result.is_err() {
        status(&app,"error","No se pudo comprobar la actualización. Puedes seguir trabajando e intentarlo más tarde.");
    }
    s.checking.store(false, Ordering::SeqCst);
    let result = s.status.lock().unwrap().clone();
    Ok(result)
}
async fn install(app: AppHandle) -> Result<Value, String> {
    let s = app.state::<State>();
    if s.installing.swap(true, Ordering::SeqCst) {
        return Err("La actualización ya se está instalando.".into());
    }
    if s.backend.try_lock().is_err() {
        s.installing.store(false, Ordering::SeqCst);
        return Err("Espera a que termine la operación actual antes de actualizar.".into());
    }
    let pending = s.pending.lock().unwrap().take();
    let Some((update, bytes)) = pending else {
        s.installing.store(false, Ordering::SeqCst);
        return Err("No hay una actualización lista.".into());
    };
    status(&app, "installing", "Instalando actualización…");
    {
        let mut backend = s.backend.lock().map_err(|_| "Servicio no disponible")?;
        let _ = backend.child.kill();
        let _ = backend.child.wait();
    }
    let outcome = tauri::async_runtime::spawn_blocking(move || {
        update.install(bytes).map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| e.to_string())?;
    if outcome.is_err() {
        s.installing.store(false, Ordering::SeqCst);
        status(
            &app,
            "error",
            "No se pudo instalar. Reinicia CX Workspace y vuelve a intentarlo.",
        );
        return Err("No se pudo instalar la actualización.".into());
    }
    app.restart();
}
fn local_window(window: &WebviewWindow) -> bool {
    window
        .url()
        .map(|u| {
            matches!(u.scheme(), "tauri" | "http" | "https")
                && matches!(u.host_str(), Some("localhost" | "tauri.localhost"))
        })
        .unwrap_or(false)
}
#[tauri::command]
async fn cx_call(
    app: AppHandle,
    window: WebviewWindow,
    method: String,
    input: Value,
) -> Result<Value, String> {
    if window.label() != "main" || !local_window(&window) {
        return Err("Solicitud no autorizada".into());
    }
    match method.as_str() {
        "updateStatus" => return Ok(app.state::<State>().status.lock().unwrap().clone()),
        "checkUpdates" => return check(app).await,
        "installUpdate" => return install(app).await,
        _ => {}
    }
    let backend = app.state::<State>().backend.clone();
    let handle = app.clone();
    let operation = method.clone();
    let result = tauri::async_runtime::spawn_blocking(move || {
        backend
            .lock()
            .map_err(|_| "Servicio no disponible".to_string())?
            .call(&handle, &operation, input)
    })
    .await
    .map_err(|e| e.to_string())??;
    if method == "exportFaultReport" {
        let handle = app.clone();
        let csv = result.as_str().ok_or("Reporte inválido")?.to_string();
        return tauri::async_runtime::spawn_blocking(move || {
            let selected = handle
                .dialog()
                .file()
                .set_title("Guardar reporte de fallas")
                .set_file_name("Reporte-fallas.csv")
                .add_filter("CSV", &["csv"])
                .blocking_save_file();
            if let Some(file) = selected {
                let path = file.into_path().map_err(|e| e.to_string())?;
                std::fs::write(path, csv).map_err(|e| e.to_string())?;
                Ok(json!({"saved":true}))
            } else {
                Ok(json!({"saved":false}))
            }
        })
        .await
        .map_err(|e| e.to_string())?;
    }
    if method == "exportReturnPDF" {
        *app.state::<State>().report.lock().unwrap() =
            result.as_str().ok_or("Reporte inválido")?.to_string();
        if let Some(previous) = app.get_webview_window("print") {
            previous.close().map_err(|e| e.to_string())?;
        }
        tauri::WebviewWindowBuilder::new(
            &app,
            "print",
            tauri::WebviewUrl::App("print.html".into()),
        )
        .title("Informe de reclamos · Guardar como PDF")
        .inner_size(1000., 800.)
        .build()
        .map_err(|e| e.to_string())?;
        return Ok(json!({"saved":false,"printDialog":true}));
    }
    Ok(result)
}
#[tauri::command]
fn print_content(app: AppHandle, window: WebviewWindow) -> Result<String, String> {
    if window.label() != "print" || !local_window(&window) {
        return Err("Solicitud no autorizada".into());
    }
    Ok(app.state::<State>().report.lock().unwrap().clone())
}
#[tauri::command]
fn print_ready(window: WebviewWindow) -> Result<(), String> {
    if window.label() != "print" || !local_window(&window) {
        return Err("Solicitud no autorizada".into());
    }
    window.print().map_err(|e| e.to_string())
}
fn main() {
    let app=tauri::Builder::default()
  .plugin(tauri_plugin_single_instance::init(|app,_,_|{if let Some(w)=app.get_webview_window("main"){let _=w.show();let _=w.set_focus();}}))
  .plugin(tauri_plugin_opener::init()).plugin(tauri_plugin_dialog::init()).plugin(tauri_plugin_updater::Builder::new().build())
  .setup(|app|{
   let data=app.path().data_dir()?.join("cx-workspace");
   #[cfg(debug_assertions)]let data=std::env::var_os("CX_TEST_DATA_DIR").map(std::path::PathBuf::from).unwrap_or(data);
   std::fs::create_dir_all(&data)?;
   let exe=std::env::current_exe()?.parent().unwrap().join(if cfg!(windows){"cx-node.exe"}else{"cx-node"});
   let script=app.path().resource_dir()?.join("backend.cjs");
   let mut command=Command::new(exe);command.arg(script).arg(data).stdin(Stdio::piped()).stdout(Stdio::piped()).stderr(Stdio::null());
   // Do not inherit Node injection/debugging options from the user's shell.
   command.env_remove("NODE_OPTIONS").env_remove("NODE_PATH");
   #[cfg(windows)]{use std::os::windows::process::CommandExt;command.creation_flags(0x08000000);}
   let mut child=command.spawn()?;let input=child.stdin.take().unwrap();let output=BufReader::new(child.stdout.take().unwrap());
   app.manage(State{backend:Arc::new(Mutex::new(Backend{child,input,output,next:0})),status:Mutex::new(json!({"state":"idle","message":"Buscar actualizaciones.","version":app.package_info().version.to_string()})),pending:Mutex::new(None),checking:AtomicBool::new(false),installing:AtomicBool::new(false),report:Mutex::new(String::new())});
   let handle=app.handle().clone();tauri::async_runtime::spawn(async move{tokio::time::sleep(Duration::from_secs(15)).await;loop{let _=check(handle.clone()).await;tokio::time::sleep(Duration::from_secs(21600)).await;}});
   Ok(())
  })
  .on_window_event(|window,event|{if window.label()=="main"{if let tauri::WindowEvent::CloseRequested{api,..}=event{let app=window.app_handle();if app.state::<State>().pending.lock().unwrap().is_some(){api.prevent_close();let handle=app.clone();tauri::async_runtime::spawn(async move{let _=install(handle).await;});}}}})
  .invoke_handler(tauri::generate_handler![cx_call,print_content,print_ready]).build(tauri::generate_context!()).expect("No se pudo iniciar CX Workspace");
    app.run(|app, event| {
        if let tauri::RunEvent::Exit = event {
            if let Ok(mut backend) = app.state::<State>().backend.try_lock() {
                let _ = backend.child.kill();
            }
        }
    });
}
