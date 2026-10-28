import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
const readMethods=new Set(['listRecords','listMonthlySales','dashboardData','faultReportData','listTechnicians','listCommentUsers','listNotifications']);
const writeMethods=new Set(['saveRecord','saveRecords','deleteRecord','saveRepair','addRecordComment','readNotification','readAllNotifications','validateQuality','confirmReceipt','receiveAndSend','receiveExchange','saveIdentifier','closeReturn','saveMonthlySales']);
// Keep older installed clients readable while they receive the new navigation.
function legacyWorkflowResult(value,input){
 const convert=r=>{if(!r||!['reparacion','calidad'].includes(r.module))return r;const index=r.type===2?2:r.type===1?1:0;return {...r,index,location:`Expedientes • ${r.module==='calidad'?'Calidad':'Reparación'} / ${index===2?'Equipos en servicio':index===1?'Cambio de equipo':'Devoluciones'}${r.archived?' · Archivado':''}`};};
 if(Array.isArray(value))return value.map(convert);
 if(value&&Array.isArray(value.records)){const target=value.records.find(r=>r.id===input?.id),result={...value,records:value.records.map(convert)};if(target&&Number.isInteger(value.index))result.index=convert(target).index;return result;}
 return value;
}
const userShape=p=>({id:p.id,name:p.name,username:p.email,role:p.role,permissions:p.permissions,active:p.active&&p.approved,mustChangePassword:false,pending:!p.approved});
const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 try{
 if(req.method!=='POST')return reply({error:'Método no permitido'},405);
 const token=req.headers.get('Authorization');if(!token?.startsWith('Bearer '))return reply({error:'Inicia sesión.'},401);
 const url=Deno.env.get('SUPABASE_URL'),anon=Deno.env.get('SUPABASE_ANON_KEY'),secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 const auth=createClient(url,anon,{global:{headers:{Authorization:token}},auth:{persistSession:false}});
 const {data:authData,error:authError}=await auth.auth.getUser();if(authError||!authData.user)return reply({error:'Sesión inválida.'},401);
 const service=createClient(url,secret,{auth:{persistSession:false}}),body=await req.json(),{method,input,clientVersion}=body;const [clientMajor,clientMinor]=String(clientVersion||'0.0').split('.').map(Number),modernClient=clientMajor>0||clientMinor>=10;
 const fetchProfiles=async()=>{const {data,error}=await service.from('cx_profiles').select('*');if(error)throw Error('No se pudo leer la configuración de usuarios.');return data;};
 let profiles=await fetchProfiles(),profile=profiles.find(p=>p.id===authData.user.id);if(!profile)return reply({error:'No se encontró el perfil.'},403);
 if(method==='getProfile'){
  let dataVersion=null;
  if(profile.approved&&profile.active&&(profile.role==='admin'||Object.values(profile.permissions||{}).some(p=>p.view))){const {data}=await service.from('cx_workspace').select('version').eq('id',1).single();dataVersion=Number.isSafeInteger(data?.version)?data.version:null;}
  return reply({result:{...userShape(profile),dataVersion}});
 }
 if(!profile.approved||!profile.active)return reply({error:'Tu cuenta está pendiente de autorización del administrador.'},403);
 if(method==='archiveConnectionTest'){if(profile.role!=='admin')return reply({error:'Solo el administrador puede configurar el histórico.'},403);return reply({result:await archiveConnectionTest()});}
 if(method==='listUsers'){if(profile.role!=='admin')return reply({error:'Solo el administrador puede gestionar usuarios.'},403);return reply({result:profiles.map(userShape)});}
 if(method==='saveUser'){
 if(profile.role!=='admin')return reply({error:'Solo el administrador puede gestionar usuarios.'},403);
 if(!input?.id)throw Error('El usuario debe registrarse primero; después puedes asignarle rol y permisos.');
 if(input.id===profile.id&&(input.role!=='admin'||input.active===false))throw Error('No puedes quitarte el acceso de administrador.');
 const user=profiles.find(p=>p.id===input.id);if(!user)throw Error('Usuario no encontrado.');
 const business=createBusinessStore({users:profiles.map(userShape),records:[],audit:[],notifications:[],monthlySales:[],nextNumber:1},profile.id);
 // Use the established role and permission validator without storing Supabase passwords.
 business.api.saveUser({id:user.id,username:'cloud-'+user.id,name:input.name,role:input.role,permissions:input.permissions,active:input.active!==false});
 const normalized=business.getState().users.find(u=>u.id===user.id);
 const {error}=await service.from('cx_profiles').update({name:normalized.name,role:normalized.role,permissions:normalized.permissions,approved:true,active:input.active!==false,updated_at:new Date().toISOString()}).eq('id',user.id);if(error)throw Error('No se pudo guardar el usuario.');return reply({result:(await fetchProfiles()).map(userShape)});
 }
 if(method==='reportMailStatus')return reply({result:reportMailStatus(profile)});
 if(method==='sendFaultReport')return reply({result:await deliverReport(service,profile,input,fetchProfiles)});
 if(!readMethods.has(method)&&!writeMethods.has(method)&&method!=='importLocalData')return reply({error:'Acción no disponible.'},400);
 for(let attempt=0;attempt<4;attempt++){
 profiles=await fetchProfiles();profile=profiles.find(p=>p.id===authData.user.id);if(!profile?.active||!profile.approved)return reply({error:'Tu cuenta no tiene acceso.'},403);
 const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)throw Error('No se pudo cargar el espacio compartido.');
 const state={...await hydrateWorkspace(workspace.state),users:profiles.map(userShape)},business=createBusinessStore(state,profile.id);let result;
 if(method==='importLocalData'){
 if(profile.role!=='admin')return reply({error:'Solo el administrador puede importar datos.'},403);
 if(state.records.length)throw Error('La importación inicial solo está disponible cuando el espacio compartido está vacío.');
 if(!Array.isArray(input?.records)||input.records.length>10000)throw Error('Archivo de expedientes inválido.');
 business.api.migrateRecords(input.records.map(r=>({...r,responsibleArea:r.responsibleArea==='Paquetería - Logística'?'Empaque - Logística':r.responsibleArea})));
 const next=business.getState(),original=new Map(input.records.map(r=>[r.id,r]));
 next.records=next.records.map(r=>{const old=original.get(r.id)||{};const metadata={};for(const k of ['receipt','closure','repair','quality','qualityHistory','archived','archivedAt','createdAt','updatedAt','returnMitigated','sentToQualityAt','receivedOutcome','claimClassification','exchange','originalType'])if(old[k]!==undefined)metadata[k]=old[k];return {...r,...metadata,module:old.module||r.module,index:Number.isInteger(old.index)?old.index:r.index,resolution:old.resolution||r.resolution,expedientNumber:Number.isInteger(old.expedientNumber)?old.expedientNumber:r.expedientNumber};});
 next.records=normalizeWorkflowState({records:next.records,workflowVersion:input.workflowVersion||1}).records;next.workflowVersion=2;
 if(new Set(next.records.map(r=>r.expedientNumber)).size!==next.records.length)throw Error('Hay números de expediente duplicados.');
 next.nextNumber=Math.max(1,...next.records.map(r=>r.expedientNumber+1));
 for(const sale of input.monthlySales||[])business.api.saveMonthlySales(sale);
 result={imported:next.records.length};
 }else result=business.api[method](input);
 if(readMethods.has(method))return reply({result:modernClient?result:legacyWorkflowResult(result,input)});
 const next=await stageWorkspace(business.getState());next.users=[];
 const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:next,actor_id:profile.id,expected_profile_updated:profile.updated_at});if(commitError)throw Error('No se pudieron guardar los cambios.');if(committed)return reply({result:modernClient?result:legacyWorkflowResult(result,input)});
 }
 return reply({error:'Otro usuario actualizó los datos. Intenta nuevamente.'},409);
 }catch(error){return reply({error:error.message||'No se pudo completar la acción.'},400);}
});
