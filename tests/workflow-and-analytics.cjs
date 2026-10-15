const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createStore}=require('../store.cjs'),analytics=require('../claim-analytics.js'),report=require('../report-builder.js'),{records:fixtures,monthlySales,filter}=require('./report-fixtures.cjs');
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'cx-workflow-'));
try{
 let store=createStore(directory);store.setup({username:'admin',name:'Administrador',password:'test-password'});
 const input={type:1,date:'2026-10-15',order:'test-change',product:'Dell Latitude 5420',quantity:1,price:600000,contact:'Shopify',responsibleArea:'Cliente',reason:'El comprador se arrepintió',specificReasons:['Ya no necesita el producto'],customerReason:'El cliente solicita un cambio.',receivedOnRegistration:true,serial:'SN-TEST'};
 let rows=store.saveRecord(input),r=rows[0];assert.equal(r.module,'devoluciones');assert.equal(r.index,0);assert(!r.returnMitigated);assert(r.receipt);
 assert.throws(()=>store.receiveExchange({id:r.id,receivedHere:true}),/efectuó/);
 let move=store.receiveExchange({id:r.id,receivedHere:true,exchangeCompleted:true});assert.equal(move.index,0);r=move.records[0];assert.equal(r.type,1);assert.equal(r.module,'reparacion');assert(r.exchange.completedAt);assert(r.returnMitigated);
 const technician=store.saveUser({username:'tecnico',name:'Técnico',role:'technician',password:'test-password',permissions:{reparacion:{view:true,edit:true}}}).find(u=>u.role==='technician');
 move=store.saveRepair({id:r.id,technicianId:technician.id,diagnosis:'Equipo probado',result:'Reparado',failedComponents:[]});assert.equal(move.module,'calidad');assert.equal(move.index,0);
 move=store.validateQuality({id:r.id,result:'approved',functioning:true});assert(move.records.find(x=>x.id===r.id).archived);
 r=store.saveRecord({...input,type:2,order:'service',receivedOnRegistration:false})[0];assert.equal(r.index,1);assert.equal(r.module,'reparacion');
 r=store.saveRecord({...input,type:0,order:'technical-change',receivedOutcome:'buyer'})[0];move=store.saveRepair({id:r.id,technicianId:technician.id,diagnosis:'Se propone un cambio',result:'Cambio de equipo'});assert.equal(move.module,'devoluciones');assert.equal(move.index,0);assert.equal(move.records.find(x=>x.id===r.id).originalType,0);
 const file=path.join(directory,'cx-data-v1.json'),state=JSON.parse(fs.readFileSync(file));state.workflowVersion=1;state.records=[{...state.records[0],id:'old-change',type:1,module:'reparacion',index:1},{...state.records[0],id:'old-service',type:2,module:'calidad',index:2,archived:true}];fs.writeFileSync(file,JSON.stringify(state));store=createStore(directory);store.login({username:'admin',password:'test-password'});rows=store.listRecords();assert.equal(rows[0].index,0);assert.equal(rows[1].index,1);assert(rows[1].archived);assert(!rows.some(r=>r.location.includes('Cambio de equipo')));
 const duplicate={...fixtures[0],additionalFaults:[{reason:'El producto llegó dañado',component:fixtures[0].component,specificReasons:fixtures[0].specificReasons}]};let d=analytics.drilldown([duplicate],analytics.reasons[0],duplicate.component);assert.equal(d.components[0].count,1);assert(d.specifics.every(s=>s.count===1));
 d=analytics.drilldown(fixtures,analytics.reasons[0],'Batería');assert(d.specifics.some(s=>s.label==='Hinchada'));assert(!d.specifics.some(s=>/RAM|gustó/.test(s.label)));
 d=analytics.drilldown(fixtures,'Arrepentimiento');assert(d.components.some(s=>s.label==='Ya no necesita el producto'));assert.equal(d.specifics.length,0);
 const a=report.analyze(fixtures,filter,monthlySales);assert.equal(a.rows.length,48);assert.equal(a.products.length,1);assert.equal(a.sales,300000000);assert.equal(a.sections.length,3);assert.equal(a.sections[1].count,16);
 const area=report.analyze(fixtures,{...filter,mode:'area',area:'Cliente'},monthlySales);assert(area.rows.every(r=>r.responsibleArea==='Cliente'));assert.equal(area.sales,a.sales);assert.equal(report.pages(fixtures,{...filter,mode:'area'},monthlySales).length,6);assert.equal(report.subject({...filter,mode:'area',area:'Cliente'}),'Reporte de devoluciones - Cliente - 2026-10-01 al 2026-10-15');
 console.log('Unified exchange workflow, legacy migration, linked analytics, deduplication and scoped report KPIs passed.');
}finally{fs.rmSync(directory,{recursive:true,force:true});}
