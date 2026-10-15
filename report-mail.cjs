function validateReportMail(input){
 if(!input||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.requestId||''))throw Error('Solicitud de envío inválida.');
 const filter=input.filter;if(!filter||!['general','area'].includes(filter.mode)||filter.mode==='general'&&filter.area)throw Error('Selecciona un reporte general o por área.');
 if(!Array.isArray(input.recipients)||input.recipients.length<1||input.recipients.length>20)throw Error('Agrega entre 1 y 20 destinatarios.');
 const recipients=[...new Set(input.recipients.map(v=>{if(typeof v!=='string')throw Error('Correo inválido.');const s=v.trim().toLowerCase();if(s.length>254||! /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(s))throw Error('Revisa los correos de los destinatarios.');return s;}))];
 return {requestId:input.requestId,filter:{mode:filter.mode,area:filter.area||'',from:filter.from,to:filter.to},recipients};
}
function reportMailAccess(profile){return profile?.active&&profile.approved&&(profile.role==='admin'||profile.permissions?.dashboard?.view&&profile.permissions?.dashboard?.edit);}
module.exports={validateReportMail,reportMailAccess};
