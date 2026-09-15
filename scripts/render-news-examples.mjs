/** Authoring utility: original code graphics + existing artwork + local narration -> captioned MP4s. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let playwrightPath = process.env.PLAYWRIGHT_MODULE;
if (!playwrightPath) {
  try { playwrightPath = require.resolve('playwright'); }
  catch { playwrightPath = path.join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'); }
}
const { chromium } = await import(pathToFileURL(playwrightPath).href);
const ffmpeg = require('ffmpeg-static');
const root=process.cwd();
const manifestPath='src/app/projects/expedition-news-network/expedition-examples.json';
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const temp='tmp/expedition-example-media';
const destination='public/history-live/expedition-examples';
fs.mkdirSync(destination,{recursive:true});
const art='data:image/png;base64,'+fs.readFileSync('public'+manifest.artwork).toString('base64');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const write=(p,value)=>fs.writeFileSync(p,value);
function run(args) { const r=spawnSync(ffmpeg,['-nostdin','-y','-hide_banner','-loglevel','error',...args],{encoding:'utf8',windowsHide:true,maxBuffer:2e6}); if(r.status!==0) throw Error(r.stderr||String(r.error)); }
function wavSeconds(file) {
  const b=fs.readFileSync(file); let offset=12,rate=0,data=0;
  while(offset+8<=b.length) { const id=b.toString('ascii',offset,offset+4),size=b.readUInt32LE(offset+4); if(id==='fmt ') rate=b.readUInt32LE(offset+8+8); if(id==='data') data=size; offset+=8+size+(size%2); }
  if(!rate||!data) throw Error('Invalid narration WAV: '+file); return data/rate;
}
const stamp=(seconds,comma=false)=>{const ms=Math.round(seconds*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}${comma?',':'.'}${String(ms%1000).padStart(3,'0')}`;};
const assStamp=s=>`${Math.floor(s/3600)}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${(s%60).toFixed(2).padStart(5,'0')}`;
function visual(scene) {
  if(scene.visual==='route') return `<div class="route"><div class="node"><b>1</b><strong>Weddell Sea</strong><span>Camp on the ice</span></div><div class="arrow">↓ <small>three small boats</small></div><div class="node"><b>2</b><strong>Elephant Island</strong><span>Land reached · April 1916</span></div><div class="arrow">↓ <small>six people in James Caird</small></div><div class="node"><b>3</b><strong>South Georgia</strong><span>A destination for help</span></div></div>`;
  if(scene.visual==='quote') return `<div class="quotation"><div class="quote-mark">“</div><p>${esc(scene.points[0])}</p><span>Ernest Shackleton · South · 1919</span></div>`;
  if(scene.visual==='timeline') return `<div class="timeline">${scene.points.map((p,i)=>`<div><b>0${i+1}</b><span>${esc(p)}</span></div>`).join('')}</div>`;
  if(scene.visual==='team'||scene.visual==='sources') return `<div class="tiles">${scene.points.map((p,i)=>`<div><b>${['01','02','03'][i]}</b><span>${esc(p)}</span></div>`).join('')}</div>`;
  if(scene.visual==='closing') return `<div class="outcome"><b>28</b><span>members of the Endurance party survived</span><div>THE PLANNED CROSSING<br/>WAS NOT COMPLETED</div></div>`;
  return `<div class="studio-view"><div class="stamp">ENN</div><div>ENDURANCE<br/><strong>SPECIAL REPORT</strong></div><p>Changing plans.<br/>Working together.</p></div>`;
}
function html(scene,index,count) {return `<!doctype html><html><head><style>
*{box-sizing:border-box}body{margin:0;width:1280px;height:720px;overflow:hidden;color:#fff9e9;font-family:Arial,sans-serif;background:#0c2831 url('${art}') center/cover}body:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#081f2ef5,#1238419c)}
.brand{position:absolute;top:30px;left:48px;right:48px;display:flex;align-items:center;gap:17px;font-size:24px;letter-spacing:.5px}.badge{padding:13px 12px;background:#c69b50;color:#0b2931;font-weight:900;border-radius:8px}.model{margin-left:auto;border:1px solid #b4c7c7;border-radius:30px;padding:10px 16px;font-size:16px;letter-spacing:1px}
main{position:absolute;left:48px;right:48px;top:125px;height:408px;display:grid;grid-template-columns:1fr 1.08fr;gap:40px;align-items:center}.headline{color:#e7bc70;font-size:16px;line-height:1.5;letter-spacing:1.6px;font-weight:bold}h1{font:600 51px/1.08 Georgia,serif;margin:18px 0 22px;max-width:540px}.left .point{font-size:22px;line-height:1.55;color:#d4e6e4;padding:7px 0}.left .point:before{content:'— ';color:#ecc477}
.visual{height:400px;border:1px solid #95ad9e80;border-radius:18px;background:#102e36dc;padding:25px;box-shadow:0 10px 35px #00172280}.route{display:flex;flex-direction:column;align-items:flex-start;padding:0 12px}.node{display:grid;grid-template-columns:40px 1fr;column-gap:14px;align-items:center}.node b{grid-row:span 2;border-radius:50%;background:#e3b764;color:#102c32;font-size:22px;width:38px;height:38px;display:grid;place-items:center}.node strong{font-size:25px}.node span{font-size:17px;color:#b8d5d5;padding-top:4px}.arrow{font-size:31px;color:#e5c78b;margin-left:14px;line-height:1.6}.arrow small{font-size:16px;color:#cbe1dc;margin-left:20px}
.quotation p{font:30px/1.3 Georgia,serif;margin:0 0 21px}.quote-mark{font:80px/.9 Georgia;color:#e3b764}.quotation span{font-size:17px;color:#afd1d1}.timeline,.tiles{height:100%;display:flex;flex-direction:column;justify-content:center;gap:22px}.timeline>div,.tiles>div{display:flex;align-items:center;gap:20px;padding:20px 15px;border-left:4px solid #e3b764;background:#ffffff0b;border-radius:4px}.timeline b,.tiles b{font-size:21px;color:#e3b764}.timeline span,.tiles span{font-size:25px;line-height:1.3}.outcome{text-align:center}.outcome>b{font:700 142px/1.1 Georgia;color:#eac985}.outcome>span{display:block;font-size:26px;line-height:1.3;margin:auto;max-width:330px}.outcome>div{margin-top:25px;border-top:1px solid #59777d;padding-top:20px;font-size:18px;line-height:1.5;color:#c9dfdc}.studio-view{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.stamp{width:100px;height:85px;background:#d3b371;color:#142f36;border-radius:10px;display:grid;place-items:center;font-size:35px;font-weight:900;letter-spacing:2px;margin-bottom:23px}.studio-view>div+div{font-size:22px;line-height:1.5}.studio-view>p{font:italic 26px/1.4 Georgia;color:#e8d3a8;margin:17px 0}
.lower{position:absolute;left:48px;right:48px;top:547px;border-top:2px solid #cea65d;padding-top:12px;display:flex;align-items:center;gap:20px}.role{font-size:23px;font-weight:700}.scene{margin-left:auto;color:#cfddd6;font-size:16px}.credit{position:absolute;left:48px;right:48px;top:602px;font-size:15px;color:#d4e4df}.captions{position:absolute;left:0;right:0;top:632px;bottom:0;background:#061820f2}
</style></head><body><div class="brand"><span class="badge">ENN</span><span>Expedition News Network</span><span class="model">CLASSROOM MODEL · SYNTHETIC VOICES</span></div><main><div class="left"><div class="headline">${esc(scene.headline)}</div><h1>${esc(scene.title)}</h1>${scene.visual==='studio'||scene.visual==='closing'?scene.points.map(p=>`<div class="point">${esc(p)}</div>`).join(''):''}</div><div class="visual">${visual(scene)}</div></main><div class="lower"><span class="role">${esc(scene.label)}</span><span class="scene">${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}</span></div><div class="credit">${esc(scene.credit)}</div><div class="captions"></div></body></html>`;}
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
const timing={};
try {
for(const item of manifest.items) {
  let cursor=0; const chapters=[],cues=[],videos=[];
  for(const [i,scene] of item.scenes.entries()) {
    const imageFile=`${temp}/${item.id}-${i}.png`;
    await page.setContent(html(scene,i,item.scenes.length));
    await page.evaluate(async()=>{ await document.fonts.ready; const url=getComputedStyle(document.body).backgroundImage.slice(5,-2); await new Promise(resolve=>{ const img=new Image();img.onload=resolve;img.onerror=resolve;img.src=url; }); });
    await page.screenshot({path:imageFile});
    if(i===0) fs.copyFileSync(imageFile,`${destination}/${item.id}-poster.png`);
    const start=cursor, audioFiles=[];
    for(const [j,line] of scene.narration.entries()) {
      const file=`${temp}/${item.id}-${i}-${j}.wav`,duration=wavSeconds(file);audioFiles.push(file);
      const words=line.split(/\s+/),chunks=[];
      for(let offset=0;offset<words.length;offset+=13) chunks.push(words.slice(offset,offset+13).join(' '));
      const total=chunks.reduce((n,c)=>n+c.length,0);let elapsed=0;
      for(const chunk of chunks) { const span=duration*chunk.length/total;cues.push({start:cursor+elapsed,end:cursor+elapsed+span,text:chunk});elapsed+=span; }
      cursor+=duration;
    }
    const concat=`${temp}/${item.id}-${i}-audio.txt`;
    write(concat,audioFiles.map(f=>`file '${path.basename(f)}'`).join('\n'));
    const audio=`${temp}/${item.id}-${i}.wav`;
    run(['-f','concat','-safe','0','-i',concat,'-c:a','pcm_s16le',audio]);
    const duration=cursor-start, video=`${temp}/${item.id}-${i}.mp4`;
    run(['-loop','1','-framerate','24','-i',imageFile,'-i',audio,'-t',duration.toFixed(4),'-vf',`scale=1280:720,fade=t=in:st=0:d=0.25,fade=t=out:st=${Math.max(0,duration-.25).toFixed(4)}:d=0.25,format=yuv420p`,'-c:v','libx264','-preset','veryfast','-crf','22','-threads','2','-c:a','aac','-b:a','96k','-ar','44100',video]);
    videos.push(video);chapters.push({startSeconds:Number(start.toFixed(3)),durationSeconds:Number(duration.toFixed(3)),label:scene.label});
    console.log(`${item.id}: scene ${i+1}/${item.scenes.length} rendered (${duration.toFixed(1)}s)`);
  }
  const list=`${temp}/${item.id}-video.txt`;write(list,videos.map(f=>`file '${path.basename(f)}'`).join('\n'));
  const ass=`${temp}/${item.id}.ass`;
  write(ass,`[Script Info]\nScriptType: v4.00+\nPlayResX: 1280\nPlayResY: 720\nWrapStyle: 0\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,27,&H00FFFFFF,&H00FFFFFF,&H00102020,&H00102020,0,0,0,0,100,100,0,0,1,0,0,2,60,60,15,1\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`+cues.map(c=>`Dialogue: 0,${assStamp(c.start)},${assStamp(c.end)},Default,,0,0,0,,${c.text.replaceAll('\n','\\N')}`).join('\n'));
  const output=`${destination}/${item.id}.mp4`;
  run(['-f','concat','-safe','0','-i',list,'-vf',`ass=${ass},format=yuv420p`,'-c:v','libx264','-preset','veryfast','-crf','22','-threads','2','-c:a','aac','-b:a','96k','-movflags','+faststart',output]);
  write(`${destination}/${item.id}.vtt`,'WEBVTT\n\n'+cues.map(c=>`${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`).join('\n'));
  timing[item.id]={durationSeconds:Number(cursor.toFixed(3)),chapters};
  console.log(`Finished ${output}: ${cursor.toFixed(1)} seconds; ${(fs.statSync(output).size/1e6).toFixed(1)} MB`);
}
write('src/app/projects/expedition-news-network/expedition-examples.timing.json',JSON.stringify(timing,null,2)+'\n');
} finally { await browser.close(); }
