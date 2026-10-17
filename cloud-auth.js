let cloudMode=false,cloudSavedAccount=null;
function cloudImportDialog(){
 if(!cloudMode||!isAdmin())return;
 accountMenu.hidden=true;
 const dialog=document.createElement('dialog');dialog.className='confirm-dialog';
 dialog.innerHTML='<h2>Importar expedientes locales</h2><p>Se enviarán los expedientes y ventas mensuales de este equipo al espacio compartido de Rematech en Supabase. Los archivos locales se conservan. No se envían las contraseñas anteriores.</p><p>Disponible una sola vez, cuando el espacio compartido está vacío.</p><p role="status"></p><div class="form-actions"><button class="secondary-button" data-cancel>Cancelar</button><button class="primary-button" data-import>Importar al espacio compartido</button></div>';
 dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();
 dialog.querySelector('[data-import]').onclick=async e=>{const b=e.currentTarget;b.disabled=true;const message=dialog.querySelector('[role="status"]');try{const result=await desktop.cloudImportLocal();message.textContent=result.imported+' expedientes importados.';records=await desktop.listRecords();render();b.hidden=true;dialog.querySelector('[data-cancel]').textContent='Cerrar';}catch(error){message.textContent=authError(error);b.disabled=false;}};
 dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();
}
function cloudCard(title,description,body){authRoot.hidden=false;document.querySelector('.shell').hidden=true;authRoot.innerHTML=`<div class="login-card"><div class="login-brand">cx<span>•</span> Workspace</div><h1>${title}</h1><p>${description}</p>${body}<p id="cloud-error" role="alert" hidden></p><button type="button" id="access-updates" class="secondary-button">Buscar actualizaciones</button></div>`;document.getElementById('access-updates').onclick=showAppUpdates;}
function cloudError(error){const el=document.getElementById('cloud-error');if(el){el.hidden=false;el.textContent=authError(error);}}
async function cloudEnter(user){currentUser=user;if(user.pending||!user.active){cloudWaiting();return;}await enterWorkspace();}
function cloudWaiting(){cloudCard('Cuenta pendiente de acceso',(currentUser?.username?escapeHTML(currentUser.username)+' · ':'')+'Tu cuenta está verificada. El administrador debe asignarte un rol y permisos para usar los módulos.','<button id="cloud-refresh" class="primary-button">Revisar autorización</button><button id="cloud-exit" class="secondary-button">Cerrar sesión</button>');document.getElementById('cloud-refresh').onclick=async()=>{try{await cloudEnter(await desktop.cloudProfile());}catch(e){cloudError(e);}};document.getElementById('cloud-exit').onclick=logout;}
function cloudLoginScreen(){cloudCard('Bienvenido a CX','Ingresa con Google o con tu correo electrónico.',`${cloudSavedAccount?'<button id="cloud-resume" class="primary-button">Iniciar sesión como '+escapeHTML(cloudSavedAccount.email)+'</button><p>Tu acceso está guardado en este equipo.</p>':''}<button id="cloud-google" class="secondary-button">Continuar con Google</button><form id="cloud-login"><label>Correo electrónico<input name="username" type="email" required autocomplete="username"></label><label>Contraseña<input name="password" type="password" required autocomplete="current-password"></label><button class="primary-button" type="submit">Iniciar sesión</button></form><label class="remember-session"><input id="cloud-remember" type="checkbox" name="remember">Recordar sesión en este equipo</label><div class="cloud-auth-links"><button id="cloud-signup" class="secondary-button">Crear cuenta</button><button id="cloud-reset" class="secondary-button">Restablecer contraseña</button></div>`);document.getElementById('cloud-login').onsubmit=async e=>{e.preventDefault();try{await cloudEnter(await desktop.login({...Object.fromEntries(new FormData(e.target)),remember:document.getElementById('cloud-remember').checked}));}catch(error){cloudError(error);}};document.getElementById('cloud-google').onclick=async e=>{const b=e.currentTarget;b.disabled=true;try{await cloudEnter(await desktop.cloudGoogle({remember:document.getElementById('cloud-remember').checked}));}catch(error){cloudError(error);}finally{b.disabled=false;}};document.getElementById('cloud-resume')?.addEventListener('click',async e=>{e.currentTarget.disabled=true;try{await cloudEnter(await desktop.cloudResume());}catch(error){cloudSavedAccount=null;cloudLoginScreen();cloudError(error);}});document.getElementById('cloud-signup').onclick=cloudSignupScreen;document.getElementById('cloud-reset').onclick=cloudResetScreen;}
function cloudSignupScreen(){cloudCard('Crear cuenta','Recibirás un código para verificar tu correo. Al verificar tu correo podrás entrar a la aplicación. Los módulos se habilitarán cuando el administrador asigne tus permisos.','<form id="cloud-signup-form"><label>Nombre<input name="name" required maxlength="100" autocomplete="name"></label><label>Correo electrónico<input name="email" type="email" required autocomplete="email"></label><label>Contraseña<input name="password" type="password" required minlength="8" maxlength="128" autocomplete="new-password"></label><button class="primary-button" type="submit">Enviar código</button></form><button id="cloud-back" class="secondary-button">Volver</button>');document.getElementById('cloud-back').onclick=cloudLoginScreen;document.getElementById('cloud-signup-form').onsubmit=async e=>{e.preventDefault();const input=Object.fromEntries(new FormData(e.target));try{await desktop.cloudSendSignup(input);cloudVerifyScreen(input.email);}catch(error){cloudError(error);}};}
function cloudVerifyScreen(email){cloudCard('Verifica tu correo','Ingresa el código que recibiste por correo electrónico.','<form id="cloud-verify-form"><label>Código de verificación<input name="code" required inputmode="numeric" pattern="[0-9]{6,8}" minlength="6" maxlength="8" autocomplete="one-time-code"></label><button class="primary-button" type="submit">Verificar correo</button></form><button id="cloud-back" class="secondary-button">Volver</button>');document.getElementById('cloud-back').onclick=cloudLoginScreen;document.getElementById('cloud-verify-form').onsubmit=async e=>{e.preventDefault();try{await cloudEnter(await desktop.cloudVerifySignup({email,code:e.target.elements.code.value}));}catch(error){cloudError(error);}};}
function cloudResetScreen(){cloudCard('Restablecer contraseña','Solicita un código de recuperación a tu correo.','<form id="cloud-reset-form"><label>Correo electrónico<input name="email" type="email" required autocomplete="email"></label><button class="primary-button" type="submit">Enviar código</button></form><button id="cloud-back" class="secondary-button">Volver</button>');document.getElementById('cloud-back').onclick=cloudLoginScreen;document.getElementById('cloud-reset-form').onsubmit=async e=>{e.preventDefault();const email=e.target.elements.email.value;try{await desktop.cloudRequestReset({email});cloudResetVerify(email);}catch(error){cloudError(error);}};}
function cloudResetVerify(email){cloudCard('Nueva contraseña','Si el correo tiene una cuenta, recibirás un código de recuperación.','<form id="cloud-new-password"><label>Código<input name="code" required inputmode="numeric" pattern="[0-9]{6,8}" minlength="6" maxlength="8" autocomplete="one-time-code"></label><label>Nueva contraseña<input name="password" type="password" minlength="8" maxlength="128" required autocomplete="new-password"></label><button class="primary-button" type="submit">Restablecer contraseña</button></form><button id="cloud-back" class="secondary-button">Volver</button>');document.getElementById('cloud-back').onclick=cloudLoginScreen;document.getElementById('cloud-new-password').onsubmit=async e=>{e.preventDefault();try{const data=Object.fromEntries(new FormData(e.target));await cloudEnter(await desktop.cloudVerifyReset({...data,email}));}catch(error){cloudError(error);}};}
let cloudAccessReviewRunning=false;
let cloudRecordsSnapshot=null;
async function reviewCloudAccess(){
 if(cloudAccessReviewRunning||!cloudMode||!currentUser||authRoot.hidden!==true)return;
 cloudAccessReviewRunning=true;
 const accountId=currentUser.id;
 try{
  let user;
  try{user=await desktop.cloudProfile();}catch{return;}
  if(!currentUser||currentUser.id!==accountId||authRoot.hidden!==true)return;
  const accessChanged=JSON.stringify([currentUser.role,currentUser.permissions])!==JSON.stringify([user.role,user.permissions]);
  currentUser=user;
  if(user.pending||!user.active){
   closeGlobalSearch();records=[];openRecord=null;cloudWaiting();return;
  }
  updateProfile();
  if(accessChanged){closeGlobalSearch();records=[];openRecord=null;editingRecord=null;recordType=null;current=Object.keys(moduleNames).find(m=>can(m))||'registros';selected=0;render();}
  if(user.role!=='admin'&&!Object.values(user.permissions||{}).some(p=>p.view))return;
  const unchanged=!accessChanged&&Number.isSafeInteger(user.dataVersion)&&cloudRecordsSnapshot?.accountId===accountId&&cloudRecordsSnapshot.version===user.dataVersion;
  if(!recordType&&!openRecord&&!unchanged){
   try{
    const refreshed=await desktop.listRecords();
    if(!currentUser||currentUser.id!==accountId||authRoot.hidden!==true||recordType||openRecord)return;
    records=refreshed;cloudRecordsSnapshot={accountId,version:user.dataVersion};
    if(['devoluciones','reparacion','calidad'].includes(current))drawRecordCards();
   }catch{/* A failed refresh preserves the current workspace; server permissions still apply to every operation. */}
  }
 }finally{cloudAccessReviewRunning=false;}
}
setInterval(reviewCloudAccess,30000);
