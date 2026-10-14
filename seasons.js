(() => {
 const names={halloween:'Halloween',muertos:'Día de Muertos',christmas:'Navidad',none:'Sin decoraciones'};
 const dates={halloween:'1–31 de octubre',muertos:'1–3 de noviembre',christmas:'4 de noviembre–6 de enero'};
 const modes=['automatic','none','halloween','muertos','christmas'];
 const shell=document.querySelector('.shell'),topbar=document.querySelector('.topbar'),label=document.querySelector('.workspace-label'),search=document.querySelector('.search-wrap');
 const arts=['main','left','right','top','bottom','pumpkin'].map(part=>{const el=document.createElement('div');el.className='season-header-art';el.dataset.part=part;el.setAttribute('aria-hidden','true');el.hidden=true;topbar.append(el);return el;});
 let mode='automatic',active='none',scheduled=false;
 try{const saved=localStorage.getItem('cx-season-corner-mode');if(modes.includes(saved))mode=saved;}catch{}
 function seasonForDate(date=new Date()){const month=date.getMonth()+1,day=date.getDate();return month===10?'halloween':month===11&&day<=3?'muertos':month===11||month===12||month===1&&day<=6?'christmas':'none';}
 function position(){scheduled=false;arts.forEach(el=>el.hidden=true);if(active==='none'||shell.hidden)return;
 const header=topbar.getBoundingClientRect(),r=label.getBoundingClientRect(),s=search.getBoundingClientRect();
 const start=r.width?r.right+8:header.left+30,end=s.left-12,available=end-start;
 // Keep the approved artwork at its original display size.
 if(available>=210){Object.assign(arts[0].style,{left:(start-header.left)+'px',width:'210px',height:'72px',top:((header.height-72)/2)+'px',backgroundSize:'1440px 960px',backgroundPosition:'-401px 0'});arts[0].hidden=false;}

 for(const strip of [arts[3],arts[4]]){const count=Math.ceil(header.width/200);if(strip.children.length!==count){strip.replaceChildren(...Array.from({length:count},()=>document.createElement('span')));}}

 // Fixed-size source crops preserve the approved artwork at every window size.
 arts[3].hidden=active==='christmas';arts[4].hidden=false;arts[5].hidden=active!=='halloween'||!r.width;
 const controls=[label,search,document.querySelector('.top-actions')].map(e=>e.getBoundingClientRect()).filter(r=>r.width);
 for(const el of [arts[1],arts[2]]){el.hidden=false;const art=el.getBoundingClientRect();if(controls.some(c=>c.left<art.right&&c.right>art.left&&c.top<art.bottom&&c.bottom>art.top))el.hidden=true;}

 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(position);}}
 function apply(){active=mode==='automatic'?seasonForDate():mode;shell.dataset.season=active;schedule();}
 function setMode(value){if(!modes.includes(value))return;mode=value;try{localStorage.setItem('cx-season-corner-mode',value);}catch{}apply();}
 window.seasonalDecorations={enabled:true,seasonForDate,setMode,getMode:()=>mode,getSeason:()=>active,names,dates};
 new ResizeObserver(schedule).observe(topbar);new ResizeObserver(schedule).observe(search);
 new MutationObserver(schedule).observe(shell,{attributes:true,attributeFilter:['hidden','class']});
 window.addEventListener('resize',schedule);window.addEventListener('focus',apply);document.addEventListener('visibilitychange',apply);
 apply();setInterval(apply,60000);
})();
