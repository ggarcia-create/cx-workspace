(() => {
 const invoke=window.__TAURI__.core.invoke;
 const methods=['sendFaultReport','reportMailStatus','cloudResume','cloudGoogle','cloudSendSignup','cloudVerifySignup','cloudRequestReset','cloudVerifyReset','cloudProfile','cloudImportLocal','updateStatus','checkUpdates','installUpdate','exportReturnPDF','faultReportData','exportFaultReport','openProductLink','dashboardData','listMonthlySales','saveMonthlySales','status','setup','login','logout','changePassword','listRecords','saveRecord','saveRecords','deleteRecord','saveRepair','listTechnicians','listNotifications','readNotification','validateQuality','confirmReceipt','receiveAndSend','receiveExchange','saveIdentifier','closeReturn','migrateRecords','listUsers','saveUser'];
 window.cxDesktop=Object.fromEntries(methods.map(method=>[method,async input=>{try{return await invoke('cx_call',{method,input:input??null});}catch(e){throw new Error(typeof e==='string'?e:e.message||'No se pudo completar la operación.');}}]));
})();
