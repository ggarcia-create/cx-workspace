const fs=require('fs'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..');
let source=fs.readFileSync(path.join(root,'supabase/functions/cx-api/index.ts'),'utf8');
source=source.replace("import {scryptSync,randomBytes,timingSafeEqual,randomUUID} from 'node:crypto';","const {scryptSync,randomBytes,timingSafeEqual,randomUUID}=require('crypto');").replace("import {createClient} from 'npm:@supabase/supabase-js@2.117.3';",'');
const users=[{id:'admin',email:'admin@example.test',name:'Admin',role:'admin',permissions:{},approved:true,active:true,updated_at:'2026-10-14T00:00:00Z'},{id:'pending',email:'pending@example.test',name:'Pending',role:'agent',permissions:{registros:{view:true,edit:true}},approved:false,active:true,updated_at:'2026-10-14T00:00:00Z'},{id:'viewer',email:'viewer@example.test',name:'Viewer',role:'agent',permissions:{devoluciones:{view:true,edit:false}},approved:true,active:true,updated_at:'2026-10-14T00:00:00Z'}];
let handler,commits=0,reads=0;
const workspace={id:1,version:0,state:{records:[],audit:[],notifications:[],monthlySales:[],nextNumber:1,migrated:false}};
const service={from(table){return {select(){if(table==='cx_profiles')return Promise.resolve({data:structuredClone(users)});reads++;return {eq(){return {single:async()=>({data:structuredClone(workspace)})};}};},update(values){return {eq:async(_,id)=>{Object.assign(users.find(u=>u.id===id),values);return {error:null};}};} };},async rpc(_,args){commits++;workspace.state=structuredClone(args.next_state);workspace.version++;return {data:true,error:null};}};
function createClient(_,key,options){if(key==='secret')return service;return {auth:{getUser:async()=>{const id=options.global.headers.Authorization.slice(7);return users.some(u=>u.id===id)?{data:{user:{id}},error:null}:{data:{user:null},error:{message:'invalid'}};}}};}
new Function('require','createClient','Deno',source)(require,createClient,{env:{get:key=>key==='SUPABASE_SERVICE_ROLE_KEY'?'secret':'public'},serve:fn=>handler=fn});
async function request(actor,method,input){const response=await handler(new Request('https://example.test',{method:'POST',headers:actor?{Authorization:'Bearer '+actor,'Content-Type':'application/json'}:{},body:JSON.stringify({method,input})}));return {status:response.status,body:await response.json()};}
(async()=>{
 assert.equal((await request(null,'listRecords')).status,401);
 assert.equal((await request('invalid','listRecords')).status,401);
 assert.equal((await request('pending','listRecords')).status,403);
 assert.equal(reads,0,'Pending accounts cannot load workspace');
 assert.equal((await request('viewer','listUsers')).status,403);
 assert.equal((await request('viewer','importLocalData',{records:[]})).status,403);
 assert.equal(commits,0,'Denied operations cannot persist');
 assert.equal((await request('viewer','saveMonthlySales',{})).status,400);
 assert.equal(commits,0);
 assert.equal((await request('admin','arbitraryAction')).status,400);
 assert.equal((await request('admin','saveUser',{id:'admin',role:'agent',active:false})).status,400);
 const update=await request('admin','saveUser',{id:'pending',name:'Authorized',role:'intake',active:true,permissions:{registros:{view:true,edit:true}}});
 assert.equal(update.status,200);assert.equal(users[1].approved,true);
 const listed=await request('pending','listRecords');assert.equal(listed.status,200);assert.deepEqual(listed.body.result,[]);
 const shape=(await request('admin','listUsers')).body.result;assert(!shape.some(u=>'password' in u||'hash' in u||'salt' in u));
 users[1].active=false;assert.equal((await request('pending','listRecords')).status,403);
 console.log('Cloud access: session validation, pending denial, permissions, admin approval, revocation and credential-free profiles passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
