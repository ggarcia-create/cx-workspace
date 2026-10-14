const fs=require('node:fs'),path=require('node:path');
const [target,platform]=process.argv.slice(2),version=require('../package.json').version;
const dir=path.join(__dirname,'../src-tauri/target',target,'release/bundle'),out=path.join(__dirname,'../release-files');fs.mkdirSync(out,{recursive:true});
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&!e.name.endsWith('.app')?walk(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:[]);}
const files=walk(dir);const extensions=platform.startsWith('mac')?['.dmg','.app.tar.gz','.app.tar.gz.sig']:['.exe','.exe.sig'];
for(const ext of extensions){const matches=files.filter(f=>f.endsWith(ext));if(matches.length!==1)throw Error('Expected one '+ext+', found '+matches.length);fs.copyFileSync(matches[0],path.join(out,`CX-Workspace-${version}-${platform}${ext}`));}
