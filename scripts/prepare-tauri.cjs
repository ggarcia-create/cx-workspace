const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');process.chdir(root);
(async()=>{
 const esbuild=require('esbuild');
 for(const dir of ['web-dist','src-tauri/resources','src-tauri/binaries'])fs.mkdirSync(dir,{recursive:true});
 const files=['index.html','tauri-bridge.js','app.js','styles.css','auth.js','cloud-auth.js','seasons.js','seasons.css','claim-components.js','settings.js','dashboard.js','report-builder.js','report.css','print.html','print.js'];
 for(const file of files)fs.copyFileSync(file,path.join('web-dist',file));
 fs.cpSync('assets','web-dist/assets',{recursive:true});
 await esbuild.build({entryPoints:['runtime/backend.cjs'],bundle:true,platform:'node',target:'node24',outfile:'src-tauri/resources/backend.cjs',loader:{'.css':'text'},logLevel:'warning'});
 const target=execFileSync('rustc',['--print','host-tuple'],{encoding:'utf8'}).trim();
 const suffix=process.platform==='win32'?'.exe':'';
 fs.copyFileSync(process.execPath,`src-tauri/binaries/cx-node-${target}${suffix}`);
 if(!suffix)fs.chmodSync(`src-tauri/binaries/cx-node-${target}`,0o755);
 console.log('Prepared Tauri frontend and runtime for '+target);
})().catch(e=>{console.error(e);process.exit(1)});
