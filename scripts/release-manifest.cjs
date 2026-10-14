const fs=require('node:fs'),path=require('node:path'),version=require('../package.json').version;
const dir=path.join(__dirname,'../release-files'),platforms={};
for(const [key,label,ext] of [['darwin-aarch64','mac-arm64','.app.tar.gz'],['darwin-x86_64','mac-intel','.app.tar.gz'],['windows-x86_64','windows-x64','.exe']]){
 const name=`CX-Workspace-${version}-${label}${ext}`;if(!fs.statSync(path.join(dir,name)).size)throw Error('Empty installer');
 const signature=fs.readFileSync(path.join(dir,name+'.sig'),'utf8').trim();if(!signature)throw Error('Missing signature');
 platforms[key]={signature,url:`https://github.com/ggarcia-create/cx-workspace/releases/download/v${version}/${name}`};
}
fs.writeFileSync(path.join(dir,'latest.json'),JSON.stringify({version,notes:'CX Workspace con Tauri, acceso Google y actualizaciones firmadas.',pub_date:new Date().toISOString(),platforms},null,2));
