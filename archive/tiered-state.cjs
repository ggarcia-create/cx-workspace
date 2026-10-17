'use strict';
const {digest,currentMonth,recordMonth,validateRecords}=(()=>{const a=require('./snapshot.cjs');return {...a,validateRecords:records=>a.mergeRecords(records,[])};})();
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
module.exports={createTieredState};
