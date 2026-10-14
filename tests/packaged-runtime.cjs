const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const base=path.resolve('src-tauri/target',process.argv[2]||'','release');
const app=path.join(base,'bundle/macos/CX Workspace.app/Contents');
const executable=process.platform==='darwin'?path.join(app,'MacOS/cx-node'):path.join(base,'cx-node.exe');
const script=process.platform==='darwin'?path.join(app,'Resources/backend.cjs'):path.join(base,'backend.cjs');
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'cx-packaged-test-'));
const child=spawn(executable,[script,directory],{stdio:['pipe','pipe','pipe']});let buffer='',stderr='',finished=false;
const timeout=setTimeout(()=>finish(Error('Packaged runtime did not respond')),15000);
function finish(error){if(finished)return;finished=true;clearTimeout(timeout);child.kill();fs.rmSync(directory,{recursive:true,force:true});if(error){console.error(error.message,stderr);process.exitCode=1;}else console.log('Packaged runtime starts and validates RPC in '+process.platform);}
child.on('error',finish);child.stderr.on('data',b=>stderr+=b);child.on('exit',code=>{if(!finished)finish(Error('Packaged runtime exited: '+code));});
child.stdout.on('data',b=>{buffer+=b;while(buffer.includes('\n')){const i=buffer.indexOf('\n'),line=buffer.slice(0,i);buffer=buffer.slice(i+1);try{const r=JSON.parse(line);if(r.id===1){assert.equal(r.result.cloud,true);child.stdin.write(JSON.stringify({id:2,method:'notAllowed'})+'\n');}else if(r.id===2){assert.match(r.error,/permitida/);finish();}}catch(e){finish(e);}}});
child.stdin.write(JSON.stringify({id:1,method:'status'})+'\n');
