'use strict';
const assert=require('node:assert/strict'),{createTieredState}=require('../archive/tiered-state.cjs');
const memory=new Map();let writes=0,fail=false;
const objects={readMany:async refs=>refs.map(r=>structuredClone(memory.get(r.hash))),putVerified:async(bundle,hash)=>{if(fail)throw Error('Sheets unavailable');writes++;memory.set(hash,structuredClone(bundle));return {hash,range:'Versions!A'+writes};}};
const tier=createTieredState(objects),now=new Date('2026-10-17T12:00:00Z');
const row=(id,date,folio)=>({id,date,expedientNumber:folio,order:'2000018284168414',module:'devoluciones',index:0,total:10000,repair:{pending:true}});
(async()=>{
 const full={records:[row('old','2026-09-15',1),row('new','2026-10-01',2)],monthlySales:[{month:'2026-09',totals:{Shopify:10000}},{month:'2026-10',totals:{Shopify:20000}}],nextNumber:3};
 const stored=await tier.stage(full,now);assert.equal(stored.records.length,1);assert.equal(stored.monthlySales.length,1);assert.equal(writes,1);
 const hydrated=await tier.hydrate(stored);assert.equal(hydrated.records.length,2);assert.equal(hydrated.monthlySales.length,2);
 await tier.stage(hydrated,now);assert.equal(writes,1);
 const changed=structuredClone(hydrated);changed.records.find(r=>r.id==='old').repair.pending=false;
 const winner=await tier.stage(changed,now);assert.equal(writes,2);
 // Readers use only committed references: staged revisions never overwrite an old view.
 assert.equal((await tier.hydrate(stored)).records.find(r=>r.id==='old').repair.pending,true);
 assert.equal((await tier.hydrate(winner)).records.find(r=>r.id==='old').repair.pending,false);
 fail=true;changed.records.find(r=>r.id==='old').repair.pending='another';await assert.rejects(()=>tier.stage(changed,now),/unavailable/);assert.equal(stored.records.length,1);
 memory.get(winner.archive.months['2026-09'].hash).records.pop();await assert.rejects(()=>tier.hydrate(winner),/integridad/);
 console.log('Tiered archive: historical edits, immutable revisions, unchanged reuse and failure isolation passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
