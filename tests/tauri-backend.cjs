const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),os=require('node:os'),path=require('node:path'),{EventEmitter}=require('node:events');
const root=path.resolve(__dirname,'..');
async function load(cloudMode){
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'cx-tauri-test-'));const input=new EventEmitter(),responses=[],calls=[];
 const mockCloud={status:async()=>({cloud:true,setupRequired:false}),profile:async()=>({role:'admin',active:true,pending:false}),google:async()=>({role:'agent',pending:true}),call:async(method,payload)=>{calls.push({method,payload});if(method==='faultReportData')return [{expedientNumber:1,product:'=HYPERLINK("x")',additionalFaults:[]}];return [];}};
 const realRequire=require('node:module').createRequire(path.join(root,'runtime/backend.cjs'));
 vm.runInNewContext(fs.readFileSync(path.join(root,'runtime/backend.cjs'),'utf8'),{
  require(name){if(name==='../cloud-config.json')return {enabled:cloudMode};if(name==='../cloud-client.cjs')return {createCloudClient:(_,__,platform)=>{mockCloud.resume=async()=>({role:'admin',active:true,pending:false});mockCloud.google=async()=>{await platform.vault('get');return {role:'agent',pending:true};};return mockCloud;}};if(name==='node:readline')return {createInterface:()=>input};if(name==='../report.css')return '';return realRequire(name);},
  process:{argv:['node','backend',directory],stdout:{write:s=>{const reply=JSON.parse(s);if(reply.event==='secure-vault')input.emit('line',JSON.stringify({event:'secure-vault-result',vaultId:reply.vaultId,result:null}));else responses.push(reply);}},exit:()=>{}},console,URL,structuredClone,Buffer,setTimeout
 });
 let id=0;async function call(method,payload){const n=++id;input.emit('line',JSON.stringify({id:n,method,input:payload}));for(let i=0;i<100;i++){const reply=responses.find(r=>r.id===n);if(reply)return reply;await new Promise(r=>setTimeout(r,10));}throw Error('RPC timeout');}
 return {directory,call,calls,cleanup:()=>fs.rmSync(directory,{recursive:true,force:true})};
}
(async()=>{
 const local=await load(false);try{
  assert.equal((await local.call('status')).result.setupRequired,true);
  assert.match((await local.call('arbitraryMethod')).error,/permitida/);
  assert.match((await local.call('listRecords')).error,/sesión/);
  assert.equal((await local.call('setup',{username:'admin',name:'Admin',password:'Safe-test-123'})).result.role,'admin');
  assert.deepEqual((await local.call('listRecords')).result,[]);
  assert.equal((await local.call('openSheetIntake')).result,true);
  assert.match((await local.call('syncSheetIntake')).error,/conexión compartida/);
  const pdf=(await local.call('exportReturnPDF',{from:'2026-10-01',to:'2026-10-15',mode:'general'})).result;assert.equal(Buffer.from(pdf.bytes).subarray(0,5).toString(),'%PDF-');assert.match(pdf.filename,/General.*\.pdf$/);
  assert.equal((await local.call('logout')).result,true);
  assert.match((await local.call('listRecords')).error,/sesión/);
  assert.ok(fs.existsSync(path.join(local.directory,'cx-data-v1.json')));
 }finally{local.cleanup();}
 const cloud=await load(true);try{
  assert.equal((await cloud.call('status')).result.cloud,true);
  assert.equal((await cloud.call('cloudGoogle')).result.pending,true);assert.equal((await cloud.call('cloudResume')).result.role,'admin');
  await cloud.call('syncSheetIntake');assert.equal(cloud.calls.at(-1).method,'syncSheetIntake');
  await cloud.call('hasSelectedSheetIntake');assert.equal(cloud.calls.at(-1).method,'hasSelectedSheetIntake');
  const csv=(await cloud.call('exportFaultReport',{})).result;assert.ok(csv.includes("'=HYPERLINK"),'CSV formula injection neutralized');
  assert.match((await cloud.call('cloudImportLocal')).error,/No hay expedientes/);
  await cloud.call('deleteRecord','case-id');assert.equal(cloud.calls.at(-1).method,'deleteRecord');
  assert.equal(fs.existsSync(path.join(cloud.directory,'cloud-session.enc')),false);
 }finally{cloud.cleanup();}
 console.log('Tauri backend: local login/persistence, RPC whitelist, cloud dispatch, pending profiles, safe CSV and migration passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
