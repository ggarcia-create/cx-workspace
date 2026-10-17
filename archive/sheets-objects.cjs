'use strict';
const {Buffer}=require('node:buffer');
const {randomUUID}=require('node:crypto');
const {canonical,digest}=require('./snapshot.cjs');
function createSheetsObjects(request){
 const rangeOK=range=>typeof range==='string'&&/^'?Versiones'?!(?:A|A\$)\d+:F\d+$/.test(range);
 function decode(ref,rows){
  if(!Array.isArray(rows)||!rows.length||rows.length>1000)throw Error('Histórico incompleto.');
  const id=rows[0][0];
  if(rows.some((r,i)=>r.length!==6||r[0]!==id||r[1]!==ref.hash||Number(r[2])!==i||Number(r[3])!==rows.length||typeof r[4]!=='string'||r[4].length>30000))throw Error('Fragmentos históricos inválidos.');
  const bundle=JSON.parse(Buffer.from(rows.map(r=>r[4]).join(''),'base64').toString('utf8'));
  if(digest(bundle)!==ref.hash)throw Error('El histórico no pasó la verificación de integridad.');
  return bundle;
 }
 async function readMany(refs){
  if(!refs.length)return [];
  if(refs.some(r=>!rangeOK(r.range)||!/^[a-f0-9]{64}$/.test(r.hash)))throw Error('Referencia histórica inválida.');
  const result=[];
  for(let offset=0;offset<refs.length;offset+=24){
   const batch=refs.slice(offset,offset+24),params=new URLSearchParams({valueRenderOption:'UNFORMATTED_VALUE'});
   for(const ref of batch)params.append('ranges',ref.range);
   const response=await request('/values:batchGet?'+params);
   if(response.valueRanges?.length!==batch.length)throw Error('Respuesta histórica incompleta.');
   result.push(...batch.map((ref,i)=>decode(ref,response.valueRanges[i].values)));
  }
  return result;
 }
 async function putVerified(bundle,hash){
  if(digest(bundle)!==hash)throw Error('Huella histórica inválida.');
  const raw=Buffer.from(canonical(bundle),'utf8').toString('base64'),id=randomUUID(),count=Math.ceil(raw.length/30000),values=[];
  if(count>1000)throw Error('El lote histórico excede el tamaño permitido.');
  for(let i=0;i<count;i++)values.push([id,hash,i,count,raw.slice(i*30000,(i+1)*30000),new Date().toISOString()]);
  // No retry on append: after an ambiguous response, an unreferenced revision
  // may exist, but cannot become visible or overwrite a committed revision.
  const response=await request('/values/'+encodeURIComponent('Versiones!A:F')+':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS',{method:'POST',body:JSON.stringify({majorDimension:'ROWS',values})});
  const ref={range:response.updates?.updatedRange,hash};
  if(!rangeOK(ref.range)||response.updates?.updatedRows!==count)throw Error('No se confirmó la escritura histórica.');
  await readMany([ref]);return ref;
 }
 return {readMany,putVerified};
}
module.exports={createSheetsObjects};
