// Only Rust writes requests to this private stdin pipe. No HTTP service is exposed.
const fs=require('node:fs'),path=require('node:path'),readline=require('node:readline');
const {createStore}=require('../store.cjs');
const {createCloudClient}=require('../cloud-client.cjs');
const config=require('../cloud-config.json');
const report=require('../report-builder.js');
const {createReportPDF}=require('../report-pdf.cjs');
const methods=new Set(['faultReportData','dashboardData','listMonthlySales','saveMonthlySales','status','setup','login','logout','changePassword','listRecords','saveRecord','saveRecords','deleteRecord','saveRepair','listTechnicians','listCommentUsers','addRecordComment','listNotifications','readNotification','validateQuality','confirmReceipt','receiveAndSend','receiveExchange','saveIdentifier','closeReturn','migrateRecords','listUsers','saveUser']);
const emit=value=>process.stdout.write(JSON.stringify(value)+'\n');
console.log=(...args)=>console.error(...args);
const directory=process.argv[2];if(!directory)throw Error('Missing application data directory');
fs.mkdirSync(directory,{recursive:true});
// Credential keys travel only over the private parent/child pipe, never to the webview.
let vaultSequence=0;const vaultPending=new Map();
const vault=(action,value)=>new Promise((resolve,reject)=>{const id=++vaultSequence;vaultPending.set(id,{resolve,reject});emit({event:'secure-vault',vaultId:id,action,value});});
const cloud=config.enabled?createCloudClient(config,directory,{vault,shell:{openExternal:async url=>emit({event:'open-url',url})}}):null;
const local=cloud?null:createStore(directory);
const invoke=async(method,input)=>{
 if(cloud){if(['status','login','logout','changePassword'].includes(method))return cloud[method](input);if(method==='migrateRecords')return cloud.call('listRecords');if(method==='setup')throw Error('Las cuentas se administran en el espacio compartido.');return cloud.call(method,input);}
 return local[method](input);
};
const cloudMethods={cloudResume:'resume',cloudGoogle:'google',cloudSendSignup:'sendSignup',cloudVerifySignup:'verifySignup',cloudRequestReset:'requestReset',cloudVerifyReset:'verifyReset',cloudProfile:'profile'};
async function dispatch(method,input){
 if(methods.has(method))return invoke(method,input);
 if(['reportMailStatus','sendFaultReport'].includes(method)){if(!cloud)throw Error('El envío de reportes requiere el espacio compartido.');return cloud.call(method,input);}
 if(Object.hasOwn(cloudMethods,method)){if(!cloud)throw Error('Acceso compartido no configurado.');return cloud[cloudMethods[method]](input);}
 if(method==='cloudImportLocal'){
  if(!cloud)throw Error('Acceso compartido no configurado.');const p=await cloud.profile();if(p.role!=='admin'||!p.active||p.pending)throw Error('Solo el administrador puede importar los datos.');
  const file=path.join(directory,'cx-data-v1.json');if(!fs.existsSync(file))throw Error('No hay expedientes locales que importar.');
  const data=JSON.parse(fs.readFileSync(file,'utf8'));return cloud.call('importLocalData',{records:data.records,monthlySales:data.monthlySales||[],workflowVersion:data.workflowVersion||1});
 }
 if(method==='openProductLink'){
  const record=(await invoke('listRecords')).find(r=>r.id===input);if(!record?.productUrl)throw Error('No se encontró el enlace del producto.');
  const url=new URL(record.productUrl);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error('Enlace del producto inválido.');emit({event:'open-url',url:url.href});return true;
 }
 if(method==='exportFaultReport'){
  const rows=await invoke('faultReportData',input);
  const columns=['Expediente','Fecha','Pedido','Producto','Serie / SN','Canal','Área responsable','Motivo','Problema / componente','Detalles reportados','Texto del cliente','Fallas adicionales','Resolución','Resultado del cierre'];
  const quote=value=>{let v=String(value??'');if(/^[\s]*[=+@-]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';};
  const lines=[columns,...rows.map(r=>['EXP-'+String(r.expedientNumber).padStart(3,'0'),r.date,r.order,r.product,r.serial,r.contact,r.responsibleArea||'Sin área asignada',r.reason,r.component,r.specificReason,r.customerReason,(r.additionalFaults||[]).map(f=>[f.reason,f.component,f.specificReason].filter(Boolean).join(' · ')).join(' | '),r.resolution,r.closure?.outcome==='buyer'?'Reembolso al comprador':r.closure?.outcome==='rematech'?'Cerrado a favor de Rematech':''])];
  return '\uFEFF'+lines.map(row=>row.map(quote).join(',')).join('\r\n');
 }
 if(method==='exportReturnPDF'){
  const analyses=report.pages(await invoke('faultReportData',input),input,(await invoke('dashboardData')).monthlySales);
  return {bytes:Array.from(await createReportPDF(analyses)),filename:report.filename(input)};
 }
 throw Error('Operación no permitida.');
}
// A serial queue protects local writes, session changes and one-shot migrations.
let queue=Promise.resolve();
readline.createInterface({input:process.stdin,crlfDelay:Infinity}).on('line',line=>{
 let vaultReply;try{vaultReply=JSON.parse(line);}catch{}
 if(vaultReply?.event==='secure-vault-result'){const pending=vaultPending.get(vaultReply.vaultId);if(pending){vaultPending.delete(vaultReply.vaultId);if(vaultReply.error)pending.reject(Error('No se pudo acceder al almacenamiento seguro del sistema.'));else pending.resolve(vaultReply.result);}return;}
 queue=queue.then(async()=>{let message;try{message=JSON.parse(line);if(!Number.isSafeInteger(message.id))throw Error('Solicitud inválida.');const result=await dispatch(message.method,message.input);emit({id:message.id,result:result??null});}catch(e){emit({id:message?.id,error:e.message||'No se pudo completar la operación.'});}});
}).on('close',()=>process.exit(0));
