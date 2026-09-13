const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const context={};context.window=context;vm.createContext(context);
for(const file of ['vendor/suncalc.js','vendor/luxon.min.js','seasons.js','geometry.js','solar-day.js','solar-explorer.js','solar-trails.js','monument-editor.js','optics.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/simulations/solar-monument',file),'utf8'),context);
const E=context.SolarExplorer,D=context.luxon.DateTime;
const settings={latitude:38.83,longitude:-104.82,zone:'America/Denver',localDate:'2026-06-21',minutes:782.34};
for(const [date,hours] of [['2026-03-08',23],['2026-11-01',25],['2026-06-21',24]]){
  const s={...settings,localDate:date};
  const start=E.observation(s,'day','noon',0).date,mid=E.observation(s,'day','noon',.5).date;
  assert.equal(mid-start,hours*3600000/2,'Day playback must use the real length of the local day across DST.');
  assert.equal(D.fromJSDate(E.observation(s,'day','noon',1).date,{zone:s.zone}).toISODate(),date);
}
for(const date of ['2026-06-21','2026-12-21','2028-02-29']){
  const s={...settings,localDate:date},day=context.SolarDay.day(s);
  assert.equal(E.observation(s,'year','noon').date.toISOString(),day.at(day.noon).toISOString());
  assert.equal(E.observation(s,'year','sunrise',.5,30).date.toISOString(),day.at(day.start+30).toISOString());
}
const samples=E.annual(settings);assert.equal(samples.length,12);assert.ok(samples[5].rise<65&&samples[11].rise>115);
const block={id:'a',x:0,y:0,z:0,width:.2,height:1,depth:.2,rotation:359.5};
const summer=context.SolarTrails.shadowTip(block,samples[5]),winter=context.SolarTrails.shadowTip(block,samples[11]);
assert.ok(winter.z<summer.z,'Winter noon reference extends farther north at this site.');
assert.equal(context.SolarTrails.shadowTip(block,{altitude:-2,bearing:180}),null);
for(const localDate of ['2026-06-21','2026-12-21']){
  const s={...settings,latitude:80,localDate},day=context.SolarDay.day(s);
  assert.notEqual(day.kind,'normal');assert.equal(E.observation(s,'year','sunrise').date.toISOString(),day.at(day.noon).toISOString());
}
const design={blocks:[block],targets:[]};
assert.equal(context.MonumentEditor.transform(design,['a'],{dx:.1}).blocks[0].rotation,359.5);
assert.equal(context.MonumentEditor.transform(design,['a'],{turn:15}).blocks[0].rotation,14.5);
assert.ok(context.SolarOptics.validDesign({...design,blocks:[{...block,label:'East pillar',assemblyId:'gate'}]}));
assert.equal(context.SolarOptics.validDesign({...design,blocks:[{...block,assemblyId:''}]}),false);
assert.equal(settings.minutes,782.34);assert.equal(design.blocks[0].x,0);
console.log('Solar explorer: local day lengths, leap date, noon/sunrise sampling, polar fallback, monthly trail and editor metadata passed.');
