// Lossless business-data export. This module intentionally cannot delete source data.
'use strict';
const {createHash}=require('node:crypto');
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
module.exports={canonical,digest,currentMonth,recordMonth,prepareSnapshot,verifySnapshot,partitionSnapshot,mergeRecords,encodeSnapshot,decodeSnapshot};
