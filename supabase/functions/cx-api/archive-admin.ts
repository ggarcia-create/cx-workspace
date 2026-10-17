// Maintenance endpoint: only the project's server credential is accepted.
// Never expose this credential to the desktop client.
import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
Deno.serve(async req=>{
 const actual=Buffer.from(req.headers.get('apikey')||'');
 const keys=Object.values(JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}')).filter(v=>typeof v==='string'&&v.startsWith('sb_secret_'));
 const authorized=keys.some(k=>{const b=Buffer.from(k);return actual.length===b.length&&timingSafeEqual(actual,b);});
 const respond=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 if(!authorized)return respond({error:'Acceso de mantenimiento requerido.'},401);
 if(req.method!=='POST')return respond({error:'Método no permitido.'},405);
 try{
  const input=await req.json();
  if(input.action==='check')return respond(await archiveConnectionTest());
  if(!['prepare','activate'].includes(input.action))return respond({error:'Acción no disponible.'},400);
  const service=createClient(Deno.env.get('SUPABASE_URL'),Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),{auth:{persistSession:false}});
  const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)throw Error('No se pudo leer el espacio de trabajo.');
  const full=await hydrateWorkspace(workspace.state),snapshot=prepareSnapshot(full,workspace.version);
  verifySnapshot(snapshot);
  const prepared=await historicalStore.stage({...full,archive:full.archive||{schemaVersion:1,months:{}}});
  const restored=await historicalStore.hydrate(prepared);
  const ordered=state=>({...state,records:state.records.slice().sort((a,b)=>a.id.localeCompare(b.id)),monthlySales:(state.monthlySales||[]).slice().sort((a,b)=>a.month.localeCompare(b.month)),archive:undefined});
  if(digest(ordered(full))!==digest(ordered(restored)))throw Error('La verificación completa del histórico no coincide.');
  const backup=await createSheetsObjects(sheetsRequest).putVerified({kind:'workspace-backup',snapshot},digest({kind:'workspace-backup',snapshot}));
  prepared.archive.backup=backup;
  const report={sourceVersion:workspace.version,records:full.records.length,historical:snapshot.manifest.historical,current:prepared.records.length,month:snapshot.manifest.currentMonth,snapshotHash:snapshot.manifest.stateHash,backupHash:backup.hash,verified:true,activated:!!workspace.state.archive};
  if(input.action==='prepare')return respond(report);
  if(workspace.state.archive)throw Error('El histórico ya está activo.');
  if(input.expectedVersion!==workspace.version||input.snapshotHash!==snapshot.manifest.stateHash)throw Error('Los datos cambiaron. Prepara y revisa otra vez la migración.');
  const {data:admin,error:adminError}=await service.from('cx_profiles').select('*').eq('email','g.garcia@rematech.mx').single();
  if(adminError||admin?.role!=='admin'||!admin.active||!admin.approved)throw Error('No se pudo verificar al administrador.');
  prepared.users=[];
  const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:prepared,actor_id:admin.id,expected_profile_updated:admin.updated_at});
  if(commitError||!committed)throw Error('Otro usuario modificó el espacio. No se activó el histórico.');
  return respond({...report,activated:true});
 }catch(error){return respond({error:error.message||'No se pudo verificar el histórico.'},400);}
});
