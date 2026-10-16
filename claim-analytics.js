(function(root){
 const clean=v=>String(v??'').normalize('NFC').replace(/\s+/g,' ').trim();
 const key=v=>clean(v).toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const reasons=['Producto no funciona o presenta daños','Arrepentimiento','Producto diferente'];
 function reason(v){const k=key(v);if(/arrep|no lo quiere/.test(k))return reasons[1];if(/diferente|no corresponde/.test(k))return reasons[2];if(/no funcion|no enciende|falla funcional|danad|producto dano|roto/.test(k))return reasons[0];return clean(v)||'Sin motivo informado';}
 const sale=r=>Number.isSafeInteger(r.orderTotal)?r.orderTotal:(Number(r.quantity)||0)*(Number(r.price)||0);
 const executed=r=>r.type===3||r.closure?.outcome==='buyer'||(r.module==='devoluciones'&&r.index===0&&r.resolution==='En proceso de devolución');
 const executedAmount=r=>r.type===3?(Number(r.refund)||0):sale(r);
 function faults(r){return [r,...(r.additionalFaults||[])].map(f=>({reason:reason(f.reason),component:clean(f.component),specifics:[...new Set((Array.isArray(f.specificReasons)&&f.specificReasons.length?f.specificReasons:[f.specificReason]).map(clean).filter(Boolean))]}));}
 function groups(rows,values){const map=new Map();for(const r of rows){const unique=new Map(values(r).map(v=>[key(v),clean(v)||'Sin información']));for(const [k,label] of unique){if(!map.has(k))map.set(k,{label,count:0,total:0});const item=map.get(k);item.count++;item.total+=sale(r);}}return [...map.values()].sort((a,b)=>b.count-a.count||b.total-a.total||a.label.localeCompare(b.label));}
 function drilldown(rows,selectedReason='',component=''){
  const normalized=selectedReason?reason(selectedReason):'';
  const selectedRows=normalized?rows.filter(r=>faults(r).some(f=>f.reason===normalized)):rows;
  const matching=r=>faults(r).filter(f=>!normalized||f.reason===normalized);
  const components=groups(selectedRows,r=>matching(r).flatMap(f=>f.reason===reasons[0]?[f.component||'Sin problema reportado']:f.specifics.length?f.specifics:['Sin motivo específico']));
  const componentRows=component?selectedRows.filter(r=>matching(r).some(f=>f.reason===reasons[0]?key(f.component||'Sin problema reportado')===key(component):f.specifics.some(s=>key(s)===key(component)))):[];
  const specifics=normalized===reasons[0]&&component?groups(componentRows,r=>matching(r).filter(f=>key(f.component||'Sin problema reportado')===key(component)).flatMap(f=>f.specifics.length?f.specifics:['Sin falla específica'])):[];
  return {reasons:groups(rows,r=>faults(r).map(f=>f.reason)),components,specifics,selectedRows,componentRows};
 }
 function salesForPeriod(monthlySales,from,to,channel=''){
  const months=monthlySales.filter(m=>m.month>=from.slice(0,7)&&m.month<=to.slice(0,7));
  return {total:months.reduce((sum,m)=>sum+(channel?Number(m.totals?.[channel]||0):Object.values(m.totals||{}).reduce((s,n)=>s+Number(n||0),0)),0),available:months.length>0};
 }
 function monthlyHistory(records,monthlySales,from,to,channel=''){
  const start=from.slice(0,4)+'-01',end=to.slice(0,7),points=[];
  const unique=[...new Map(records.map((r,i)=>[r.id||'row-'+i,r])).values()];
  for(let year=Number(start.slice(0,4)),month=1;year+'-'+String(month).padStart(2,'0')<=end;month===12?(year++,month=1):month++){
   const key=year+'-'+String(month).padStart(2,'0');
   const rows=unique.filter(r=>r.date?.slice(0,7)===key&&(!channel||r.contact===channel)&&executed(r));
   const total=rows.reduce((sum,r)=>sum+executedAmount(r),0),sales=salesForPeriod(monthlySales,key+'-01',key+'-31',channel);
   points.push({month:key,total,sales:sales.total,value:rows.length===0?0:sales.total>0?total/sales.total*100:null,count:rows.length});
  }
  return points;
 }
 const api={monthlyHistory,salesForPeriod,clean,key,reasons,reason,sale,executed,executedAmount,faults,groups,drilldown};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.claimAnalytics=api;
})(globalThis);
