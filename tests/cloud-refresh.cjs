const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('cloud-auth.js','utf8');
function setup(profile,list){const c={desktop:{cloudProfile:profile,listRecords:list},currentUser:{id:'admin',active:true,role:'admin'},authRoot:{hidden:true},records:['existing'],recordType:null,openRecord:null,current:'devoluciones',setInterval(){},updateProfile(){},drawRecordCards(){},closeGlobalSearch(){}};vm.createContext(c);vm.runInContext(source,c);vm.runInContext('cloudMode=true;cloudWaiting=()=>{authRoot.hidden=false;}',c);return c;}
(async()=>{
 const admin={id:'admin',active:true,role:'admin',pending:false};
 let c=setup(async()=>{throw Error('offline')},async()=>[]);await c.reviewCloudAccess();assert.equal(c.authRoot.hidden,true);assert.equal(c.records[0],'existing');
 c=setup(async()=>admin,async()=>{throw Error('timeout')});await c.reviewCloudAccess();assert.equal(c.authRoot.hidden,true);assert.equal(c.records[0],'existing');
 c=setup(async()=>({...admin,active:false}),async()=>[]);await c.reviewCloudAccess();assert.equal(c.authRoot.hidden,false);assert.equal(c.records.length,0);
 let resolve,calls=0;c=setup(()=>{calls++;return new Promise(r=>resolve=r)},async()=>[]);const first=c.reviewCloudAccess();await c.reviewCloudAccess();assert.equal(calls,1);c.currentUser=null;resolve(admin);await first;assert.equal(c.currentUser,null);assert.equal(c.records[0],'existing');
 c=setup(async()=>admin,async()=>['fresh']);await c.reviewCloudAccess();assert.equal(c.records[0],'fresh');
 console.log('Cloud refresh: transient failures preserve workspace, revocation blocks, overlapping checks and stale sessions are ignored.');
})().catch(e=>{console.error(e);process.exitCode=1});
