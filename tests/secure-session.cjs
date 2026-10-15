const assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {createSecureSession}=require('../secure-session.cjs');
(async()=>{const dir=await fs.mkdtemp(path.join(os.tmpdir(),'cx-session-'));let secret=null;const vault=async(action,value)=>{if(action==='get')return secret;if(action==='set')secret=value;if(action==='delete')secret=null;};
 try{let session=createSecureSession(dir,vault);await session.setRemember(true);await session.storage.setItem('cx-workspace-session-code-verifier','temporary-verifier');await session.storage.removeItem('cx-workspace-session-code-verifier');assert.equal(session.isRemembered(),true);assert.deepEqual(await fs.readdir(dir),[]);await session.setRemember(false);await session.storage.setItem('cx-workspace-session','token-sensitive-test');assert.equal((await fs.readdir(dir)).length,0);
 await session.setRemember(true);await session.storage.setItem('cx-workspace-session-code-verifier','temporary-verifier');await session.storage.removeItem('cx-workspace-session-code-verifier');assert.equal(session.isRemembered(),true);const file=path.join(dir,'remembered-session-v1.enc');const raw=await fs.readFile(file,'utf8');assert(!raw.includes('token-sensitive-test'));assert.equal(secret.length,64);
 session=createSecureSession(dir,vault);assert.equal(await session.storage.getItem('cx-workspace-session'),'token-sensitive-test');assert.equal(session.isRemembered(),true);
 await session.setRemember(false);assert.equal(secret,null);assert.equal(await session.storage.getItem('cx-workspace-session'),'token-sensitive-test');assert.equal(await createSecureSession(dir,vault).storage.getItem('cx-workspace-session'),null);
 await session.setRemember(true);await session.storage.removeItem('cx-workspace-session');assert.equal(secret,null);assert.deepEqual(await fs.readdir(dir),[]);
 const bad=createSecureSession(dir,async()=>{throw Error('Denied');});await bad.storage.setItem('cx-workspace-session','private');await assert.rejects(()=>bad.setRemember(true));assert.deepEqual(await fs.readdir(dir),[]);
 console.log('Remembered access: opt-in, encrypted persistence, restore, forget, logout and vault failure passed.');
 }finally{await fs.rm(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1});
