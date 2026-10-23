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
use tauri::{AppHandle, Manager, State as TauriState, WebviewWindow};
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
            if reply["event"] == "secure-vault" {
                let result: Result<Value, String> = (|| {
                    let entry =
                        keyring::Entry::new("com.yio.cxworkspace.session.v1", "session-key")
                            .map_err(|_| "Almacenamiento seguro no disponible".to_string())?;
                    match reply["action"].as_str() {
                        Some("get") => match entry.get_password() {
                            Ok(value) => Ok(json!(value)),
                            Err(keyring::Error::NoEntry) => Ok(Value::Null),
                            Err(_) => Err("No se pudo leer el acceso guardado".into()),
                        },
                        Some("set") => {
                            let value = reply["value"]
                                .as_str()
                                .filter(|s| {
                                    s.len() == 64 && s.bytes().all(|c| c.is_ascii_hexdigit())
                                })
                                .ok_or("Clave inválida")?;
                            entry
                                .set_password(value)
                                .map_err(|_| "No se pudo guardar el acceso".to_string())?;
                            Ok(Value::Bool(true))
                        }
                        Some("delete") => {
                            match entry.delete_credential() {
                                Ok(()) | Err(keyring::Error::NoEntry) => {}
                                Err(_) => return Err("No se pudo olvidar el acceso".into()),
                            }
                            Ok(Value::Bool(true))
                        }
                        _ => Err("Operación segura inválida".into()),
                    }
                })();
                let response = match result {
                    Ok(value) => {
                        json!({"event":"secure-vault-result","vaultId":reply["vaultId"],"result":value})
                    }
                    Err(_) => {
                        json!({"event":"secure-vault-result","vaultId":reply["vaultId"],"error":true})
                    }
                };
                writeln!(self.input, "{}", response).map_err(|_| "Servicio no disponible")?;
                self.input.flush().map_err(|_| "Servicio no disponible")?;
                continue;
            }
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
struct DeepLinkPending(Arc<AtomicBool>);

fn is_sheet_sync_link(value: &str) -> bool {
    value == "cxworkspace://sync-sheet"
}

#[tauri::command]
fn consume_sheet_sync_request(state: TauriState<'_, DeepLinkPending>) -> bool {
    state.0.swap(false, Ordering::SeqCst)
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
    // macOS can replace the bundle while its sidecar is running. Keep it alive
    // on failure so the user can continue working and retry the downloaded update.
    #[cfg(windows)]
    {
        let mut backend = s.backend.lock().map_err(|_| "Servicio no disponible")?;
        let _ = backend.child.kill();
        let _ = backend.child.wait();
    }
    let installer = update.clone();
    let outcome = tauri::async_runtime::spawn_blocking(move || {
        let result = installer.install(&bytes).map_err(|e| e.to_string());
        (result, bytes)
    })
    .await;
    let (result, bytes) = match outcome {
        Ok(value) => value,
        Err(error) => (Err(error.to_string()), Vec::new()),
    };
    if let Err(error) = result {
        if !bytes.is_empty() {
            *s.pending.lock().unwrap() = Some((update, bytes));
        }
        s.installing.store(false, Ordering::SeqCst);
        status(&app, "error", &format!("No se pudo instalar la actualización: {error}. Puedes volver a intentarlo o descargar el instalador."));
        return Err(
            "No se pudo instalar la actualización. Consulta Actualizaciones para ver el motivo."
                .into(),
        );
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
        let bytes: Vec<u8> = result["bytes"]
            .as_array()
            .ok_or("PDF inválido")?
            .iter()
            .map(|n| {
                n.as_u64()
                    .filter(|v| *v <= 255)
                    .map(|v| v as u8)
                    .ok_or("PDF inválido")
            })
            .collect::<Result<_, _>>()?;
        let filename = result["filename"]
            .as_str()
            .unwrap_or("Reporte-devoluciones.pdf")
            .to_string();
        let handle = app.clone();
        return tauri::async_runtime::spawn_blocking(move || {
            let selected = handle
                .dialog()
                .file()
                .set_title("Guardar reporte PDF")
                .set_file_name(filename)
                .add_filter("PDF", &["pdf"])
                .blocking_save_file();
            if let Some(file) = selected {
                std::fs::write(file.into_path().map_err(|e| e.to_string())?, bytes)
                    .map_err(|e| e.to_string())?;
                Ok(json!({"saved":true}))
            } else {
                Ok(json!({"saved":false}))
            }
        })
        .await
        .map_err(|e| e.to_string())?;
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
    let pending_sheet_sync = Arc::new(AtomicBool::new(false));
    let single_instance_pending = pending_sheet_sync.clone();
    let setup_pending = pending_sheet_sync.clone();
    let app=tauri::Builder::default()
  .manage(DeepLinkPending(pending_sheet_sync))
  .plugin(tauri_plugin_single_instance::init(move |app,args,_|{
    if args.iter().any(|arg| is_sheet_sync_link(arg)) {
      single_instance_pending.store(true, Ordering::SeqCst);
    }
    if let Some(w)=app.get_webview_window("main"){let _=w.show();let _=w.set_focus();}
  }))
  .plugin(tauri_plugin_deep_link::init())
  .plugin(tauri_plugin_opener::init()).plugin(tauri_plugin_dialog::init()).plugin(tauri_plugin_updater::Builder::new().build())
  .setup(move |app|{
   use tauri_plugin_deep_link::DeepLinkExt;
   if let Ok(Some(urls)) = app.deep_link().get_current() {
    if urls.iter().any(|url| is_sheet_sync_link(url.as_str())) {
     setup_pending.store(true, Ordering::SeqCst);
    }
   }
   let open_pending = setup_pending.clone();
   let open_app = app.handle().clone();
   app.deep_link().on_open_url(move |event| {
    if event.urls().iter().any(|url| is_sheet_sync_link(url.as_str())) {
     open_pending.store(true, Ordering::SeqCst);
    }
    if let Some(w)=open_app.get_webview_window("main"){let _=w.show();let _=w.set_focus();}
   });
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
  .on_window_event(|window,event|{if window.label()=="main"{if let tauri::WindowEvent::CloseRequested{api,..}=event{let app=window.app_handle();if app.state::<State>().installing.load(Ordering::SeqCst){api.prevent_close();return;}if app.state::<State>().pending.lock().unwrap().is_some(){api.prevent_close();let handle=app.clone();tauri::async_runtime::spawn(async move{let _=install(handle).await;});}}}})
  .invoke_handler(tauri::generate_handler![cx_call,consume_sheet_sync_request,print_content,print_ready]).build(tauri::generate_context!()).expect("No se pudo iniciar CX Workspace");
    app.run(|app, event| {
        if let tauri::RunEvent::ExitRequested { code, api, .. } = &event {
            let state = app.state::<State>();
            if intercept_update_exit(
                *code,
                state.pending.lock().unwrap().is_some(),
                state.installing.load(Ordering::SeqCst),
            ) {
                api.prevent_exit();
                let handle = app.clone();
                tauri::async_runtime::spawn(async move {
                    let _ = install(handle).await;
                });
            } else if state.installing.load(Ordering::SeqCst)
                && *code != Some(tauri::RESTART_EXIT_CODE)
            {
                api.prevent_exit();
            }
        }
        if let tauri::RunEvent::Exit = event {
            if let Ok(mut backend) = app.state::<State>().backend.try_lock() {
                let _ = backend.child.kill();
            }
        }
    });
}

fn intercept_update_exit(code: Option<i32>, pending: bool, installing: bool) -> bool {
    pending && !installing && code != Some(tauri::RESTART_EXIT_CODE)
}

#[cfg(test)]
mod deep_link_tests {
    use super::*;

    #[test]
    fn only_the_sheet_sync_link_is_accepted_and_consumed_once() {
        assert!(is_sheet_sync_link("cxworkspace://sync-sheet"));
        assert!(!is_sheet_sync_link("cxworkspace://other"));
        assert!(!is_sheet_sync_link("https://example.com/sync-sheet"));

        let pending = DeepLinkPending(Arc::new(AtomicBool::new(true)));
        assert!(pending.0.swap(false, Ordering::SeqCst));
        assert!(!pending.0.swap(false, Ordering::SeqCst));
    }
}

#[cfg(test)]
mod updater_tests {
    use super::*;
    #[test]
    fn quit_installs_pending_update_but_restart_is_allowed() {
        assert!(intercept_update_exit(None, true, false)); // macOS Quit / Cmd+Q
        assert!(intercept_update_exit(Some(0), true, false));
        assert!(!intercept_update_exit(None, false, false));
        assert!(!intercept_update_exit(None, true, true));
        assert!(!intercept_update_exit(
            Some(tauri::RESTART_EXIT_CODE),
            true,
            false
        ));
    }
}
