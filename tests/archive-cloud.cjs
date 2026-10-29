'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{createTieredState}=require('../archive/tiered-state.cjs');
let source=fs.readFileSync('supabase/functions/cx-api/index.ts','utf8')
 .replace("import {scryptSync,randomBytes,timingSafeEqual,randomUUID} from 'node:crypto';","const {scryptSync,randomBytes,timingSafeEqual,randomUUID}=require('node:crypto');")
 .replace("import {createHash} from 'node:crypto';","const {createHash}=require('node:crypto');")
 .replace("import {JWT} from 'npm:google-auth-library@11.3.1';",'')
 .replace("import {createClient} from 'npm:@supabase/supabase-js@2.117.3';",'')
 .replace("import * as pdfLib from 'npm:pdf-lib@1.17.1';","const pdfLib=require('pdf-lib');")
 .replace("import nodemailer from 'npm:nodemailer@7.0.11';",'')
 .replace("import {Buffer} from 'node:buffer';","const {Buffer}=require('node:buffer');")
 .replace("import {SHEET_INTAKE, mapSheetRecord, rowHasInput, rowSelected, routeSheetRecord} from '../../../sheet-intake.mjs';",'')
 .replace('const historicalStore=createTieredState(createSheetsObjects(sheetsRequest));','const historicalStore=createTieredState(testObjects);');
const objects=new Map();let unavailable=false;
const testObjects={putVerified:async(value,hash)=>{if(unavailable)throw Error('Sheets unavailable');objects.set(hash,structuredClone(value));return {hash,range:'Versiones!A2:F3'};},readMany:async refs=>{if(unavailable)throw Error('Sheets unavailable');return refs.map(r=>structuredClone(objects.get(r.hash)));}};
const users=[{id:'admin',role:'admin',name:'Admin',email:'admin@example.test',approved:true,active:true,updated_at:'now'},{id:'viewer',role:'agent',name:'Viewer',permissions:{devoluciones:{view:true}},approved:true,active:true,updated_at:'now'}];
const old={id:'old',expedientNumber:1,date:'2026-09-10',order:'2000018284168414',product:'Dell Latitude 5420',quantity:1,price:10000,orderTotal:10000,total:10000,type:0,module:'devoluciones',index:1,receipt:{receivedAt:'2026-09-12'},reason:'Producto no funciona o presenta daños',component:'Batería',specificReasons:['No retiene carga'],additionalFaults:[]};
const full={records:[old,{...old,id:'current',expedientNumber:2,date:'2026-10-10'}],monthlySales:[{month:'2026-09',totals:{Shopify:50000}},{month:'2026-10',totals:{Shopify:50000}}],audit:[],notifications:[],nextNumber:3,workflowVersion:2};
let handler,workspace={version:10};
const service={from(table){return {select(){if(table==='cx_profiles')return Promise.resolve({data:structuredClone(users)});return {eq(){return {single:async()=>({data:structuredClone(workspace)})};}};}};},rpc:async(_,args)=>{if(args.expected_version!==workspace.version)return {data:false};workspace.state=structuredClone(args.next_state);workspace.version++;return {data:true};}};
const createClient=(_,key,options)=>key==='secret'?service:{auth:{getUser:async()=>({data:{user:{id:options.global.headers.Authorization.slice(7)}}})}};
async function call(actor,method,input){const res=await handler(new Request('https://test.invalid',{method:'POST',headers:{Authorization:'Bearer '+actor},body:JSON.stringify({method,input,clientVersion:'0.10.9'})}));return {status:res.status,value:await res.json()};}
(async()=>{
 workspace.state=await createTieredState(testObjects).stage(full,new Date('2026-10-17T12:00:00Z'));
 new Function('require','createClient','Deno','testObjects',source)(require,createClient,{env:{get:key=>key==='SUPABASE_SERVICE_ROLE_KEY'?'secret':'public'},serve:fn=>handler=fn},testObjects);
 const listed=(await call('admin','listRecords')).value.result;assert.equal(listed.length,2);assert.equal(listed.find(r=>r.id==='old').historicalMonth,'2026-09');assert.equal(listed.find(r=>r.id==='old').historicalStatus,'Cerrado · Histórico en Sheets');
 assert.equal((await call('admin','dashboardData')).value.result.records.length,2);
 assert.equal((await call('viewer','saveIdentifier',{id:'old',serial:'NEW'})).status,400);
 assert.equal(workspace.version,10);
 const changed=await call('admin','saveIdentifier',{id:'old',serial:'NEW-SERIAL'});assert.equal(changed.status,400,JSON.stringify(changed.value));
 assert.equal(workspace.version,10);assert.equal(workspace.state.records.length,1);assert(!workspace.state.records.some(r=>r.id==='old'));
 const restored=await createTieredState(testObjects).hydrate(workspace.state);assert.equal(restored.records.find(r=>r.id==='old').serial,undefined);assert.equal(restored.records.length,2);
 unavailable=true;const failed=await call('admin','dashboardData');assert.equal(failed.status,400,'History failure must not produce incomplete report totals.');
 assert.equal(workspace.version,10,'A failed historical read must not change cloud state.');
 console.log('Cloud archive: historical reads, closed historical records, combined dashboard, permissions and unavailable-history handling passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
