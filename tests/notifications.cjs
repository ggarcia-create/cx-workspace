'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createStore}=require('../store.cjs');
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'cx-notifications-'));
try{
 const store=createStore(directory);store.setup({username:'admin',name:'Administradora',password:'test-password'});
 const tech=store.saveUser({username:'reparacion',name:'Equipo de Reparación',role:'technician',password:'test-password',permissions:{reparacion:{view:true,edit:true}}}).find(u=>u.role==='technician');
 const quality=store.saveUser({username:'calidad',name:'Equipo de Calidad',role:'quality',password:'test-password',permissions:{calidad:{view:true,edit:true}}}).find(u=>u.role==='quality');
 store.login({username:'reparacion',password:'test-password'});store.changePassword({currentPassword:'test-password',password:'tech-new-password'});store.login({username:'admin',password:'test-password'});
 const record=store.saveRecord({type:2,date:'2026-10-27',order:'EC4070',product:'Lenovo ThinkPad T480',quantity:1,price:10000,contact:'Shopify',responsibleArea:'Acondicionamiento',reason:'El comprador se arrepintió',specificReasons:['Ya no necesita el producto'],customerReason:'Ya no lo necesita.'})[0];
 store.login({username:'reparacion',password:'tech-new-password'});
 let notifications=store.listNotifications();assert.equal(notifications.length,1);assert.equal(notifications[0].kind,'workflow');assert.equal(notifications[0].event,'entered-repair');
 store.login({username:'admin',password:'test-password'});
 store.saveRepair({id:record.id,technicianId:tech.id,diagnosis:'Equipo probado',result:'Reparado',failedComponents:[]});
 store.login({username:'calidad',password:'test-password'});store.changePassword({currentPassword:'test-password',password:'quality-new-password'});store.login({username:'admin',password:'test-password'});store.addRecordComment({id:record.id,message:'Favor de validar este equipo.',recipientIds:[quality.id]});
 store.login({username:'calidad',password:'quality-new-password'});
 notifications=store.listNotifications();assert.deepEqual(new Set(notifications.map(n=>n.kind)),new Set(['workflow','record-comment']));assert(notifications.some(n=>n.event==='repair-to-quality'));assert(notifications.some(n=>n.message==='Favor de validar este equipo.'));
 store.readAllNotifications({kind:'record-comment'});notifications=store.listNotifications();assert.equal(notifications.find(n=>n.kind==='record-comment').read,true);assert.equal(notifications.find(n=>n.kind==='workflow').read,false);
 store.readAllNotifications({kind:'workflow'});assert(notifications.some(n=>!n.read));assert(store.listNotifications().every(n=>n.read));
 const api=fs.readFileSync(path.join(__dirname,'../supabase/functions/cx-api/index.ts'),'utf8');assert.match(api,/if\(method==='listNotifications'\)\{const \{data:workspace,error\}=await service\.from\('cx_workspace'\)\.select\('state'\)/);assert.match(api,/if\(method==='readNotification'\|\|method==='readAllNotifications'\)return reply\(\{result:await updateNotificationReads/);assert.match(api,/function notificationRows\(state,profile\)/);
 const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');assert.match(app,/data-notification-tab="inbox"[^]*Bandeja/);assert.match(app,/data-notification-tab="received"[^]*Recibidos/);assert.match(app,/data-read-all/);assert.match(app,/np\.addEventListener\('click',async e=>\{e\.stopPropagation\(\)/);assert.match(app,/if\(!message\.includes\('accion no disponible'\)\)throw err;for\(const n of pending\)await desktop\.readNotification\(n\.id\)/);assert.match(app,/},60000\)/);assert.doesNotMatch(app,/await desktop\.readNotification\(b\.dataset\.notification\);records=await desktop\.listRecords\(\)/);
 console.log('Notifications: targeted workflow/comment inboxes, recipient permissions, mark-all-by-tab and lightweight refresh path passed.');
}finally{fs.rmSync(directory,{recursive:true,force:true});}
