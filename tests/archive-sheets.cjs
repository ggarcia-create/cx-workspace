'use strict';
const assert=require('node:assert/strict'),{digest}=require('../archive/snapshot.cjs'),{createSheetsObjects}=require('../archive/sheets-objects.cjs');
let rows=[],writes=0,corrupt=false;
const objects=createSheetsObjects(async(path,options)=>{
 if(options?.method==='POST'){
  writes++;const values=JSON.parse(options.body).values;rows=structuredClone(values);
  assert(path.includes('valueInputOption=RAW'));return {updates:{updatedRange:'Versiones!A2:F'+(values.length+1),updatedRows:values.length}};
 }
 const values=structuredClone(rows);if(corrupt)values[0][4]='bad';
 return {valueRanges:[{values}]};
});
(async()=>{
 const value={month:'2026-09',records:[{id:'a',order:'2000018284168414',notes:'á'.repeat(40000)}],monthlySales:[]};
 const ref=await objects.putVerified(value,digest(value));assert.equal(writes,1);assert(rows.length>1);
 assert.deepEqual(await objects.readMany([ref]),[value]);
 corrupt=true;await assert.rejects(()=>objects.readMany([ref]));
 await assert.rejects(()=>objects.readMany([{range:'Control!A1:F2',hash:ref.hash}]),/Referencia/);
 await assert.rejects(()=>objects.putVerified(value,'bad'),/Huella/);
 console.log('Sheets archive: exact order numbers, Unicode chunking, readback verification and invalid reference rejection passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
