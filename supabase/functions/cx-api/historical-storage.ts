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
