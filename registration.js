(function(root){
 function detectChannel(order){const value=String(order??'').trim().toUpperCase();
  if(/^200002\d{10}$/.test(value))return 'Mercado Libre';
  if(/^EC\d{4}$/.test(value))return 'Shopify';
  if(/^.+-A$/.test(value))return 'Coppel';
  if(/^6000\d*$/.test(value))return 'Walmart';
  if(/^70\d-\d+-\d+$/.test(value))return 'Amazon';
  return '';
 }
 const api={detectChannel};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.registration=api;
})(globalThis);
