// Keep a visible recovery screen if loading the desktop service or a script fails.
function showStartupError(){const box=document.getElementById('startup-status');if(!box)return;box.hidden=false;box.innerHTML='<h1>No se pudo abrir CX Workspace</h1><p>Cierra y vuelve a abrir la aplicación. Si continúa, descarga el instalador de la versión más reciente.</p><button type="button">Volver a intentar</button>';box.querySelector('button').onclick=()=>location.reload();}
window.addEventListener('error',showStartupError);
setTimeout(()=>{const box=document.getElementById('startup-status');if(box&&!box.hidden)showStartupError();},20000);
