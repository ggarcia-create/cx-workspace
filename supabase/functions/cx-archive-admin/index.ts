// @ts-nocheck
import {Buffer} from "node:buffer";
import {randomUUID,timingSafeEqual} from "node:crypto";
// Lossless business-data export. This module intentionally cannot delete source data.
'use strict';
import {createHash} from 'node:crypto';
function canonical(value){
 if(value===null||typeof value!=='object')return JSON.stringify(value);
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 return '{'+Object.keys(value).sort().filter(k=>value[k]!==undefined).map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}';
}
const digest=value=>createHash('sha256').update(canonical(value)).digest('hex');
function currentMonth(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit'}).formatToParts(now);
 return parts.find(p=>p.type==='year').value+'-'+parts.find(p=>p.type==='month').value;
}
function recordMonth(record){
 if(typeof record.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(record.date)||new Date(record.date+'T12:00:00Z').toISOString().slice(0,10)!==record.date)throw Error('Fecha de expediente inválida.');
 return record.date.slice(0,7);
}
function validateRecords(records){
 if(!Array.isArray(records))throw Error('Falta la lista de expedientes.');
 const ids=new Set(),folios=new Set();
 for(const r of records){
  recordMonth(r);
  if(typeof r.id!=='string'||!r.id||ids.has(r.id))throw Error('Identificador ausente o duplicado.');
  if(!Number.isSafeInteger(r.expedientNumber)||r.expedientNumber<1||folios.has(r.expedientNumber))throw Error('Folio ausente o duplicado.');
  if(typeof r.order!=='string'||!r.order.trim())throw Error('El pedido debe conservarse como texto.');
  if(!['devoluciones','reparacion','calidad'].includes(r.module)||!Number.isInteger(r.index)||r.index<0)throw Error('Destino de expediente inválido.');
  for(const key of ['price','total','orderTotal','refund'])if(r[key]!=null&&(!Number.isSafeInteger(r[key])||r[key]<0))throw Error('Importe inválido en centavos.');
  ids.add(r.id);folios.add(r.expedientNumber);
 }
}
function prepareSnapshot(state,sourceVersion,now=new Date()){
 validateRecords(state.records);
 if(!Number.isSafeInteger(sourceVersion)||sourceVersion<0)throw Error('Versión de origen inválida.');
 const month=currentMonth(now),business=structuredClone(state);
 // Account profiles and authentication material do not belong in an archive workbook.
 delete business.users;
 const historical=business.records.filter(r=>recordMonth(r)<month);
 const manifest={schemaVersion:1,sourceVersion,createdAt:now.toISOString(),currentMonth:month,records:business.records.length,historical:historical.length,stateHash:digest(business),historicalHash:digest(historical)};
 return {manifest,business,historicalIds:historical.map(r=>r.id)};
}
function verifySnapshot(snapshot){
 const {manifest,business}=snapshot;
 validateRecords(business.records);
 if(business.users!==undefined||manifest.schemaVersion!==1||digest(business)!==manifest.stateHash||business.records.length!==manifest.records)throw Error('La copia no coincide con su control de integridad.');
 const historical=business.records.filter(r=>recordMonth(r)<manifest.currentMonth);
 if(historical.length!==manifest.historical||digest(historical)!==manifest.historicalHash||canonical(historical.map(r=>r.id))!==canonical(snapshot.historicalIds))throw Error('El histórico no coincide.');
 return true;
}
function partitionSnapshot(snapshot){
 verifySnapshot(snapshot);
 const ids=new Set(snapshot.historicalIds);
 return {current:snapshot.business.records.filter(r=>!ids.has(r.id)),historical:snapshot.business.records.filter(r=>ids.has(r.id))};
}
// Repeated components/failures never create repeated tickets in the merged data set.
function mergeRecords(current,historical){
 validateRecords(current);validateRecords(historical);
 const records=[...current,...historical];validateRecords(records);
 return records;
}
// A single encoded cell stays below Sheets' cell limit, including Unicode text.
function encodeSnapshot(snapshot){
 verifySnapshot(snapshot);
 const raw=Buffer.from(canonical(snapshot),'utf8').toString('base64'),rows=[];
 for(let offset=0;offset<raw.length;offset+=30000)rows.push([rows.length,raw.slice(offset,offset+30000)]);
 return rows;
}
function decodeSnapshot(rows){
 if(!Array.isArray(rows)||!rows.length||rows.some((r,i)=>r[0]!==i||typeof r[1]!=='string'||r[1].length>30000))throw Error('Fragmentos incompletos o fuera de orden.');
 const snapshot=JSON.parse(Buffer.from(rows.map(r=>r[1]).join(''),'base64').toString('utf8'));
 verifySnapshot(snapshot);return snapshot;
}


'use strict';
// The caller commits the returned small index with cx_commit_state. Immutable
// objects written by a losing CAS attempt remain unreferenced, never visible.
function createTieredState(objects){
 async function hydrate(stored){
  if(!stored.archive)return structuredClone(stored);
  if(stored.archive.schemaVersion!==1)throw Error('Versión de histórico no compatible.');
  const state=structuredClone(stored),months=Object.entries(state.archive.months);
  const bundles=await objects.readMany(months.map(([,ref])=>ref));
  if(bundles.length!==months.length)throw Error('Respuesta histórica incompleta.');
  for(let i=0;i<months.length;i++){
   const [month,ref]=months[i],bundle=bundles[i];
   if(bundle.month!==month||digest(bundle)!==ref.hash||!Array.isArray(bundle.records)||!Array.isArray(bundle.monthlySales))throw Error('El histórico no pasó la verificación de integridad.');
   if(bundle.records.some(r=>recordMonth(r)!==month)||bundle.monthlySales.some(s=>s.month!==month))throw Error('Periodo histórico incorrecto.');
   state.records.push(...bundle.records);state.monthlySales.push(...bundle.monthlySales);
  }
  validateRecords(state.records);
  state.records.sort((a,b)=>b.expedientNumber-a.expedientNumber);
  if(new Set(state.monthlySales.map(s=>s.month)).size!==state.monthlySales.length)throw Error('Ventas mensuales duplicadas.');
  return state;
 }
 async function stage(full,now=new Date()){
  validateRecords(full.records);
  const cutoff=currentMonth(now),next=structuredClone(full),months=new Map();
  const get=month=>{if(!months.has(month))months.set(month,{schemaVersion:1,month,records:[],monthlySales:[]});return months.get(month);};
  for(const r of full.records)if(recordMonth(r)<cutoff)get(recordMonth(r)).records.push(r);
  for(const sale of full.monthlySales||[]){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(sale.month))throw Error('Mes de ventas inválido.');if(sale.month<cutoff)get(sale.month).monthlySales.push(sale);}
  if(new Set((full.monthlySales||[]).map(s=>s.month)).size!==(full.monthlySales||[]).length)throw Error('Ventas mensuales duplicadas.');
  const refs={};
  for(const [month,bundle]of months){
   bundle.records.sort((a,b)=>a.id.localeCompare(b.id));
   const hash=digest(bundle),previous=full.archive?.months?.[month];
   refs[month]=previous?.hash===hash?previous:await objects.putVerified(bundle,hash);
   if(refs[month].hash!==hash)throw Error('No se confirmó la escritura del histórico.');
  }
  next.records=next.records.filter(r=>recordMonth(r)>=cutoff);
  next.monthlySales=(next.monthlySales||[]).filter(s=>s.month>=cutoff);
  next.archive={schemaVersion:1,months:refs,...(full.archive?.backup?{backup:structuredClone(full.archive.backup)}:{})};
  return next;
 }
 return {hydrate,stage};
}


'use strict';



function createSheetsObjects(request){
 const rangeOK=range=>typeof range==='string'&&/^'?Versiones'?!(?:A|A\$)\d+:F\d+$/.test(range);
 function decode(ref,rows){
  if(!Array.isArray(rows)||!rows.length||rows.length>1000)throw Error('Histórico incompleto.');
  const id=rows[0][0];
  if(rows.some((r,i)=>r.length!==6||r[0]!==id||r[1]!==ref.hash||Number(r[2])!==i||Number(r[3])!==rows.length||typeof r[4]!=='string'||r[4].length>30000))throw Error('Fragmentos históricos inválidos.');
  const bundle=JSON.parse(Buffer.from(rows.map(r=>r[4]).join(''),'base64').toString('utf8'));
  if(digest(bundle)!==ref.hash)throw Error('El histórico no pasó la verificación de integridad.');
  return bundle;
 }
 async function readMany(refs){
  if(!refs.length)return [];
  if(refs.some(r=>!rangeOK(r.range)||!/^[a-f0-9]{64}$/.test(r.hash)))throw Error('Referencia histórica inválida.');
  const result=[];
  for(let offset=0;offset<refs.length;offset+=24){
   const batch=refs.slice(offset,offset+24),params=new URLSearchParams({valueRenderOption:'UNFORMATTED_VALUE'});
   for(const ref of batch)params.append('ranges',ref.range);
   const response=await request('/values:batchGet?'+params);
   if(response.valueRanges?.length!==batch.length)throw Error('Respuesta histórica incompleta.');
   result.push(...batch.map((ref,i)=>decode(ref,response.valueRanges[i].values)));
  }
  return result;
 }
 async function putVerified(bundle,hash){
  if(digest(bundle)!==hash)throw Error('Huella histórica inválida.');
  const raw=Buffer.from(canonical(bundle),'utf8').toString('base64'),id=randomUUID(),count=Math.ceil(raw.length/30000),values=[];
  if(count>1000)throw Error('El lote histórico excede el tamaño permitido.');
  for(let i=0;i<count;i++)values.push([id,hash,i,count,raw.slice(i*30000,(i+1)*30000),new Date().toISOString()]);
  // No retry on append: after an ambiguous response, an unreferenced revision
  // may exist, but cannot become visible or overwrite a committed revision.
  const response=await request('/values/'+encodeURIComponent('Versiones!A:F')+':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS',{method:'POST',body:JSON.stringify({majorDimension:'ROWS',values})});
  const ref={range:response.updates?.updatedRange,hash};
  if(!rangeOK(ref.range)||response.updates?.updatedRows!==count)throw Error('No se confirmó la escritura histórica.');
  await readMany([ref]);return ref;
 }
 return {readMany,putVerified};
}


import {JWT} from 'npm:google-auth-library@11.3.1';
let sheetsIdentity;
const archiveWorkbook='18K2GhkeDERiHDx1cw_lNXOIcdUFF4cG6X1QQE1ghd1I';
function archiveConfigured(){return !!Deno.env.get('GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON');}
async function sheetsRequest(path,options={}){
 if(!archiveConfigured())throw Error('La conexión del histórico no está configurada.');
 if(!sheetsIdentity){
  let credentials;try{credentials=JSON.parse(Deno.env.get('GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON'));}catch{throw Error('La credencial de Sheets no tiene formato JSON válido.');}
  if(credentials.type!=='service_account'||credentials.client_email!=='rematech-sheets@rematech-devoluciones.iam.gserviceaccount.com'||typeof credentials.private_key!=='string')throw Error('La credencial no corresponde a Rematech Sheets.');
  sheetsIdentity=new JWT({email:credentials.client_email,key:credentials.private_key,scopes:['https://www.googleapis.com/auth/spreadsheets']});
 }
 let access;try{access=await sheetsIdentity.getAccessToken();}catch{throw Error('Google no pudo validar la credencial de Sheets.');}
 const response=await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+archiveWorkbook+path,{...options,headers:{Authorization:'Bearer '+access.token,'Content-Type':'application/json'},signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error(response.status===403?'Sheets rechazó el acceso. Revisa el permiso del archivo y que la API de Sheets esté habilitada.':'No se pudo consultar o guardar el histórico en Sheets.');
 return response.json();
}
const historicalStore=createTieredState(createSheetsObjects(sheetsRequest));
const hydrateWorkspace=async state=>state.archive?historicalStore.hydrate(state):structuredClone(state);
// Archive is explicitly activated by an administrator after verification.
const stageWorkspace=async state=>state.archive?historicalStore.stage(state):state;
async function archiveConnectionTest(){
 const metadata=await sheetsRequest('?fields=spreadsheetId,sheets.properties');
 const hasVersions=metadata.sheets.some(s=>s.properties.title==='Versiones');
 if(!hasVersions)throw Error('Falta preparar la hoja Versiones del histórico.');
 const objects=createSheetsObjects(sheetsRequest),probe={schemaVersion:1,kind:'connection-test',at:new Date().toISOString(),records:[],monthlySales:[]};
 const ref=await objects.putVerified(probe,digest(probe));
 return {connected:true,readWriteVerified:true,workbook:archiveWorkbook,probeHash:ref.hash};
}

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
