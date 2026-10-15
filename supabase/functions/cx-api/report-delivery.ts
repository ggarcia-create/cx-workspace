import {Buffer} from 'node:buffer';
import nodemailer from 'npm:nodemailer@7.0.11';
const reportMailConfig=()=>({host:Deno.env.get('REPORT_SMTP_HOST')||'smtp.gmail.com',user:Deno.env.get('REPORT_SMTP_USER')||'',password:Deno.env.get('REPORT_SMTP_PASSWORD')||''});
function reportMailStatus(profile){if(profile.role!=='admin'&&!profile.permissions?.dashboard?.view)throw Error('No tienes permiso para consultar reportes.');const c=reportMailConfig();return {configured:!!(c.user&&c.password),sender:c.user||null};}
async function deliverReport(service,profile,rawInput,fetchProfiles){
 if(!reportMailAccess(profile))throw Error('Necesitas permiso de edición de Dashboard para enviar reportes.');
 const input=validateReportMail(rawInput),config=reportMailConfig();if(!config.user||!config.password)throw Error('El administrador debe configurar el remitente de reportes en el servidor.');
 const fingerprint=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify({filter:input.filter,recipients:input.recipients.slice().sort()}))))).map(n=>n.toString(16).padStart(2,'0')).join('');
 let analyses,entry,actor=profile;
 for(let attempt=0;attempt<4;attempt++){
  actor=(await fetchProfiles()).find(p=>p.id===profile.id);if(!reportMailAccess(actor))throw Error('Tu cuenta ya no tiene permiso para enviar reportes.');
  const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)throw Error('No se pudo cargar el reporte.');
  const business=createBusinessStore({...workspace.state,users:[userShape(actor)]},actor.id),rows=business.api.faultReportData(input.filter),state=business.getState();
  const previous=(state.reportDeliveries||[]).find(e=>e.id===input.requestId);if(previous){if(previous.userId!==actor.id||previous.fingerprint!==fingerprint)throw Error('Esta solicitud ya se utilizó para otro envío.');if(previous.status==='sent')return {acceptedCount:previous.acceptedCount,rejectedCount:previous.rejectedCount};throw Error('Esta solicitud ya fue procesada. Revisa el correo antes de iniciar otro envío.');}
  const recent=(state.reportDeliveries||[]).filter(e=>e.userId===actor.id&&Date.parse(e.at)>Date.now()-600000);if(recent.length>=5)throw Error('Espera unos minutos antes de enviar más reportes.');
  entry={id:input.requestId,userId:actor.id,at:new Date().toISOString(),fingerprint,status:'sending'};
  state.reportDeliveries=[...(state.reportDeliveries||[]),entry];state.users=[];
  const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:state,actor_id:actor.id,expected_profile_updated:actor.updated_at});if(commitError)throw Error('No se pudo preparar el envío.');if(committed){analyses=returnReport.pages(rows,input.filter,state.monthlySales||[]);break;}
 }
 if(!analyses)throw Error('Otro usuario actualizó los datos. Vuelve a preparar el reporte.');
 const finalize=async values=>{for(let attempt=0;attempt<4;attempt++){const current=(await fetchProfiles()).find(p=>p.id===actor.id);if(!current?.active||!current.approved)return;const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)return;const state=workspace.state,target=(state.reportDeliveries||[]).find(e=>e.id===entry.id);if(!target)return;Object.assign(target,values);const {data:ok}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:state,actor_id:current.id,expected_profile_updated:current.updated_at});if(ok)return;}};
 let transport;
 try{
  const current=(await fetchProfiles()).find(p=>p.id===actor.id);if(!reportMailAccess(current))throw Object.assign(Error('Revocado'),{code:'EAUTH'});
  const pdf=await createReportPDF(analyses);
  transport=nodemailer.createTransport({host:config.host,port:465,secure:true,auth:{user:config.user,pass:config.password},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:20000,disableFileAccess:true,disableUrlAccess:true});
  const sent=await transport.sendMail({from:{name:'Rematech - CX Workspace',address:config.user},bcc:input.recipients,messageId:`<${input.requestId}@cx-workspace.rematech.mx>`,subject:returnReport.subject(input.filter),text:`Se adjunta el reporte de devoluciones ${returnReport.scopeName(input.filter)} del ${input.filter.from} al ${input.filter.to}.\nGenerado desde CX Workspace.`,attachments:[{filename:returnReport.filename(input.filter),content:Buffer.from(pdf),contentType:'application/pdf'}]});
  const result={acceptedCount:sent.accepted?.length||0,rejectedCount:sent.rejected?.length||0};await finalize({status:'sent',...result});return result;
 }catch(error){const certain=['EAUTH','EENVELOPE'].includes(error.code);await finalize({status:certain?'failed':'unknown'});throw Error(certain?'El servidor de correo rechazó el envío. Revisa la configuración del remitente y los destinatarios.':'No se recibió confirmación del correo. Revisa si llegó antes de iniciar un nuevo envío para evitar duplicados.');}finally{transport?.close();}
}
