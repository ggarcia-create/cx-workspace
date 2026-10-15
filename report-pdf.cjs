const pdfLib=require('pdf-lib');
const {PDFDocument,StandardFonts,rgb}=pdfLib;
const reportPdfColors=['#173b62','#e4a83d','#4b9d90','#8974ba','#d07872','#8b9cab'];
const pdfColor=hex=>rgb(...hex.replace('#','').match(/../g).map(s=>parseInt(s,16)/255));
const pdfText=value=>String(value??'').normalize('NFC').replace(/[\u2010-\u2015]/g,'-').replace(/\u2026/g,'...').replace(/[^\x20-\x7e\xa0-\xff\n]/g,'');
const pdfMoney=n=>'$ '+(n/100).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
const pdfPct=(n,d)=>d?(100*n/d).toLocaleString('es-MX',{maximumFractionDigits:1})+' %':'0 %';
async function createReportPDF(analyses){
 const doc=await PDFDocument.create();doc.setTitle('Reporte de devoluciones - Rematech');doc.setAuthor('Rematech - CX Workspace');
 const regular=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold),W=595.28,H=841.89,margin=30,inner=W-margin*2;
 function text(page,value,x,top,size=9,options={}){page.drawText(pdfText(value),{x,y:H-top-size,font:options.bold?bold:regular,size,color:pdfColor(options.color||'#18364e')});}
 function wrap(value,width,size=9,isBold=false){const font=isBold?bold:regular,lines=[];for(const paragraph of pdfText(value).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){if(font.widthOfTextAtSize((line?line+' ':'')+word,size)>width&&line){lines.push(line);line='';}if(font.widthOfTextAtSize(word,size)>width){for(const c of word){if(font.widthOfTextAtSize(line+c,size)>width){lines.push(line);line='';}line+=c;}}else line+=(line?' ':'')+word;}lines.push(line);}return lines;}
 function paragraph(page,value,x,top,width,size=8.5,lineHeight=11){let y=top;for(const line of wrap(value,width,size)){text(page,line,x,y,size);y+=lineHeight;}return y;}
 function box(page,x,top,width,height,color='#ffffff',border='#dfe7ee'){page.drawRectangle({x,y:H-top-height,width,height,color:pdfColor(color),borderColor:pdfColor(border),borderWidth:.6});}
 function heading(page,title,x,top,width){text(page,title,x,top,10,{bold:true,color:'#173b62'});page.drawLine({start:{x,y:H-top-17},end:{x:x+width,y:H-top-17},color:pdfColor('#e4a83d'),thickness:2});}
 function header(page,a,detail){box(page,margin,27,inner,69,'#173b62','#173b62');text(page,'REMATECH  |  CUSTOMER EXPERIENCE',margin+14,37,8,{color:'#ffffff'});text(page,'Reporte de devoluciones',margin+14,51,21,{bold:true,color:'#ffffff'});const scope=a.filter.mode==='area'?(a.filter.area||'Todas las áreas'):'General';text(page,`${scope}  |  ${a.filter.from} al ${a.filter.to}`,margin+14,78,9,{color:'#ffffff'});if(detail)text(page,'DETALLE DE PROBLEMAS REPORTADOS',margin,110,10,{bold:true});}
 function foot(page,index){page.drawLine({start:{x:margin,y:32},end:{x:W-margin,y:32},color:pdfColor('#dfe7ee'),thickness:.5});text(page,'CX Workspace | Fecha del registro | MXN | Síntomas del cliente, no diagnóstico confirmado',margin,H-26,7);text(page,String(index),W-margin-12,H-26,7);}
 function ranking(page,items,total,x,top,width,height=160,maxItems=5){
  if(!items.length){paragraph(page,'Sin datos para esta selección.',x,top,width);return;}
  const chosen=items.slice(0,maxItems),max=Math.max(1,...chosen.map(i=>i.count)),rowHeight=height/Math.max(maxItems,chosen.length);
  chosen.forEach((item,n)=>{const t=top+n*rowHeight,lines=wrap(item.label,width-60,8).slice(0,2);for(let i=0;i<lines.length;i++)text(page,lines[i],x,t+i*9,8);const y=t+lines.length*9+2;box(page,x,y,width-62,5,'#edf3f9','#edf3f9');box(page,x,y,(width-62)*item.count/max,5,reportPdfColors[n%6],reportPdfColors[n%6]);text(page,`${item.count} | ${pdfPct(item.count,total)}`,x+width-55,t+5,8,{bold:true});});
 }
 function pie(page,items,total,x,top,width){
  if(!total){paragraph(page,'Sin expedientes en el periodo.',x,top,width);return;}
  const mentions=items.reduce((sum,i)=>sum+i.count,0),radius=45,cx=x+50,cy=top+53;let angle=-Math.PI/2;
  items.forEach((item,n)=>{const end=angle+item.count/mentions*2*Math.PI,points=[];for(let a=angle;a<end;a+=.06)points.push([Math.cos(a)*radius,Math.sin(a)*radius]);points.push([Math.cos(end)*radius,Math.sin(end)*radius]);const path='M0 0 '+points.map(([px,py])=>`L${px} ${py}`).join(' ')+' Z';page.drawSvgPath(path,{x:cx,y:H-cy,color:pdfColor(reportPdfColors[n%6])});angle=end;});
  let y=top+4;items.slice(0,5).forEach((item,n)=>{box(page,x+108,y+2,6,6,reportPdfColors[n%6],reportPdfColors[n%6]);y=paragraph(page,item.label,x+120,y,width-120,8,10);text(page,`${item.count} exp. | ${pdfPct(item.count,mentions)}`,x+120,y+2,8,{bold:true});y+=25;});
 }
 let number=0;
 for(const a of analyses){
  let page=doc.addPage([W,H]);header(page,a,false);const n=a.rows.length,gap=8,kw=(inner-gap*3)/4,values=[['Total de reclamos',pdfMoney(a.total)],['Reclamos ejecutados',pdfMoney(a.executedTotal)],['% de reclamos',a.sales?pdfPct(a.total,a.sales):'Sin base'],['% reclamos ejecutados',a.sales?pdfPct(a.executedTotal,a.sales):'Sin base']];
  values.forEach(([label,value],i)=>{const x=margin+i*(kw+gap);box(page,x,110,kw,54,'#edf3f9','#edf3f9');box(page,x,110,kw,3,'#e4a83d','#e4a83d');text(page,label,x+8,121,8);const size=Math.min(15,(kw-16)/Math.max(1,bold.widthOfTextAtSize(pdfText(value),1)));text(page,value,x+8,139,size,{bold:true});});
  box(page,margin,175,inner,76,'#fcf8ef','#fcf8ef');text(page,'Resumen del periodo',margin+10,184,10,{bold:true});paragraph(page,`${n} expedientes: ${a.typeCounts[0]} devoluciones, ${a.typeCounts[1]} cambios, ${a.typeCounts[2]} servicios y ${a.typeCounts[3]} reembolsos parciales.`,margin+10,201,inner-20,8.5,11);paragraph(page,a.findings[1]||a.findings[0],margin+10,225,inner-20,8.5,11);
  const panelW=(inner-12)/2;box(page,margin,263,panelW,172);heading(page,'Motivos de reclamo',margin+10,273,panelW-20);pie(page,a.reasons,n,margin+10,299,panelW-20);
  box(page,margin+panelW+12,263,panelW,172);heading(page,'Problemas técnicos reportados',margin+panelW+22,273,panelW-20);ranking(page,a.components,n,margin+panelW+22,301,panelW-20,119,4);
  box(page,margin,447,panelW,159);heading(page,'Reclamos por canal',margin+10,457,panelW-20);ranking(page,a.channels,n,margin+10,483,panelW-20,111,5);
  box(page,margin+panelW+12,447,panelW,159);heading(page,'Áreas responsables',margin+panelW+22,457,panelW-20);ranking(page,a.areas,n,margin+panelW+22,483,panelW-20,111,6);
  box(page,margin,618,panelW,116);heading(page,'Modelos con más reclamos',margin+10,628,panelW-20);ranking(page,a.products,n,margin+10,654,panelW-20,69,3);
  box(page,margin+panelW+12,618,panelW,116);heading(page,'Concentración y seguimiento',margin+panelW+22,628,panelW-20);paragraph(page,a.findings.slice(2,4).join(' ')||'Sin casos para priorizar en este periodo.',margin+panelW+22,654,panelW-20,8.2,11);
  paragraph(page,`Base de ventas: ${pdfMoney(a.sales)}, todos los meses, sin recorte por fecha ni área. Reclamos: venta original. Ejecutados: devoluciones en proceso, reembolso al comprador y monto del reembolso parcial. Motivos: % de menciones principales y adicionales. Los gráficos muestran los principales grupos; los detalles completos están en el CSV.`,margin,745,inner,7.3,10);foot(page,++number);
  page=doc.addPage([W,H]);header(page,a,true);paragraph(page,'Incluye motivos principales y fallas adicionales. Cada problema o detalle se cuenta una sola vez por expediente; sus porcentajes pueden coexistir.',margin,129,inner,8.5,11);
  a.sections.forEach((section,i)=>{const t=169+i*202;box(page,margin,t,inner,190);heading(page,`${section.label} | ${section.count} expedientes`,margin+10,t+10,inner-20);const left=margin+10,right=margin+panelW+22;
   if(i===0){text(page,'Problema / componente',left,t+36,9,{bold:true});ranking(page,section.items,section.count,left,t+55,panelW-20,120,4);text(page,'Falla específica',right,t+36,9,{bold:true});ranking(page,section.specifics,section.count,right,t+55,panelW-20,120,4);}else{text(page,'Motivos específicos del cliente',left,t+36,9,{bold:true});ranking(page,section.items,section.count,left,t+55,panelW-20,120,4);const top=section.items[0];paragraph(page,top?`El motivo más frecuente es ${top.label}: ${top.count} expedientes (${pdfPct(top.count,section.count)}).`:'No hay casos de este motivo en el periodo seleccionado.',right,t+55,panelW-20,9,13);paragraph(page,'Se distingue de los problemas técnicos para evitar mezclar inconformidades con fallas del equipo.',right,t+116,panelW-20,8.5,12);}
  });foot(page,++number);
 }
 return doc.save();
}
module.exports={createReportPDF};
