const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
require('@angular/compiler');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true }
}).outputText, filename);
const root = path.resolve(__dirname, '../../..');
const app = name => require(path.join(root, 'src/app', name));
const { ageOfExplorationJourneyConfig: config } = app('projects/age-of-exploration-journey/age-of-exploration-journey.config.ts');
const engine = app('templates/journey-replay/core/journey-replay.engine.ts');
const { MemoryJourneyReplayPersistenceAdapter, BrowserJourneyReplayPersistenceAdapter } = app('templates/journey-replay/persistence/journey-replay.persistence.ts');
const { HttpJourneyReplayMediaAdapter } = app('infrastructure/journey-replay/http-journey-replay.adapters.ts');
const { JourneyReplayRuntimeService } = app('templates/journey-replay/runtime/journey-replay-runtime.service.ts');
const tokens = app('templates/journey-replay/runtime/journey-replay.tokens.ts');
const { createEnvironmentInjector, runInInjectionContext } = require('@angular/core');
const policy = require(path.join(root, 'server/journey-policy.ts'));
const projectPolicy = JSON.parse(fs.readFileSync(path.join(root, 'server/config/journey-project-policies.json')))[`${config.projectId}@${config.projectVersion}`];
const results = [];
function step(record, choice, text='I chose this route because the wind evidence supports a safer journey.') {
  return engine.completeJourneyStep(config, engine.updateJourneyResponseDraft(engine.selectJourneyChoice(config, record, choice), {text}));
}
const choices = ['mission-trade','supply-water','route-choice-islands','storm-west','encounter-negotiate'];
let record = engine.createInitialJourneyRecord(config, 'audit-student');
const memory = new MemoryJourneyReplayPersistenceAdapter();
for (const choice of choices) {
  record = step(record, choice);
  memory.save(record);
  const loaded = memory.load(config.projectId, config.projectVersion, 'audit-student');
  assert.deepEqual(loaded, record);
  record = loaded;
}
assert.equal(record.completedSteps.length, 5);
assert.equal(record.route.at(-1).locationId, 'recife');
assert.equal(record.replayTimeline.length, 5);
assert.deepEqual(engine.routeForScene(record, record.replayTimeline.at(-1)), record.route);
results.push({check:'Complete five chapters, round-trip every record, reconstruct final replay route', result:'PASS', routePoints:record.route.length, destination:record.route.at(-1).locationId});
assert(record.route.some(p=>p.longitude===-25.67 && p.latitude===37.74));
assert(!record.route.some(p=>p.locationId==='azores'));
results.push({check:'Azores coordinates are saved but its intermediate location ID is omitted',result:'REPRODUCED'});
let allPaths = 0;
function explore(r) {
  const next = engine.currentStep(config,r);
  if (!next) { assert.equal(r.completedSteps.length,5); assert.equal(r.replayTimeline.length,5); allPaths++; return; }
  for (const choice of next.choices) explore(step(r,choice.id));
}
explore(engine.createInitialJourneyRecord(config,'audit-branches'));
results.push({check:'All configured choice combinations reach a five-scene replay', result:'PASS', combinations:allPaths});
let draft = engine.selectJourneyChoice(config, engine.createInitialJourneyRecord(config,'audit-draft'),'mission-trade');
draft = engine.updateJourneyResponseDraft(draft,{text:'My carefully written explanation should be preserved.'});
assert.equal(engine.selectJourneyChoice(config,draft,'mission-trade').responseDraft.text,'');
results.push({check:'Clicking the already-selected choice erases its draft', result:'REPRODUCED'});
let weak = step(engine.createInitialJourneyRecord(config,'audit-weak'),'mission-trade','aaaaaaaaaaaa');
assert.equal(weak.completedSteps.length,1);
results.push({check:'Twelve repeated letters pass the response gate', result:'REPRODUCED'});
const forged = {...record,route:[],replayTimeline:[],completedSteps:record.completedSteps.map(s=>({...s,studentResponse:undefined}))};
policy.assertSubmittableJourney(forged,projectPolicy);
results.push({check:'Server policy accepts completed IDs/tags without answers, route, or replay', result:'REPRODUCED'});
const writes = [];
const storage = {setItem:(k,v)=>writes.push([k,v]),getItem:()=>null,removeItem:()=>{}};
new BrowserJourneyReplayPersistenceAdapter(storage).save(record);
assert(!writes[0][0].includes('class'));
results.push({check:'Browser cache key includes project/version/student only; no class or tenant', result:'CONFIRMED', key:writes[0][0]});

async function asyncChecks() {
  const fallback = {upload:async()=>({id:'audit-audio',reference:'indexeddb:audit-audio'}),getReference:async()=>({id:'audit-audio',reference:'blob:audit-local'})};
  const locator={tenantId:'audit',classId:'audit',classLabel:'Audit',projectId:config.projectId,projectVersion:config.projectVersion};
  const unavailable=async()=>Response.json({error:'NOT_FOUND'},{status:404});
  const media = new HttpJourneyReplayMediaAdapter(locator,fallback,'/api/journey',unavailable);
  await media.upload({file:new Blob(['audit'],{type:'audio/webm'}),fileName:'audit.webm',contentType:'audio/webm'});
  assert.equal((await media.getReference('audit-audio')).reference,'blob:audit-local');
  const reloaded = new HttpJourneyReplayMediaAdapter(locator,fallback,'/api/journey',unavailable);
  assert.equal((await reloaded.getReference('audit-audio')).reference,'/api/journey/media/audit-audio');
  results.push({check:'Recreating media adapter loses locally stored audio routing',result:'REPRODUCED'});
  const initial=engine.createInitialJourneyRecord(config,'audit-student');
  const newer=step(initial,'mission-trade');
  const local = new MemoryJourneyReplayPersistenceAdapter(); local.save(newer);
  const authority={openSession:async()=>({authenticated:true,actor:{id:'audit-student',email:'audit@example.invalid',displayName:'Audit'},role:'student',classId:'audit',classLabel:'Audit'}),loadRecord:async()=>({record:initial,serverRevision:1,updatedAt:'2026-09-01T00:00:00Z'}),loadSubmission:async()=>undefined};
  const injector=createEnvironmentInjector([
    {provide:tokens.JOURNEY_REPLAY_CONFIG,useValue:config},
    {provide:tokens.JOURNEY_REPLAY_ENROLLMENT,useValue:{...locator,studentId:'audit-student',studentDisplayName:'Audit',mode:'student'}},
    {provide:tokens.JOURNEY_REPLAY_PERSISTENCE,useValue:local},
    {provide:tokens.JOURNEY_REPLAY_AUTHORITY,useValue:authority}
  ]);
  const runtime=runInInjectionContext(injector,()=>new JourneyReplayRuntimeService());
  assert.equal(runtime.state().completedSteps.length,1);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(runtime.state().completedSteps.length,0);
  assert.equal(local.load(config.projectId,config.projectVersion,'audit-student').completedSteps.length,0);
  results.push({check:'Loading older authoritative state replaces newer local chapter and its cache',result:'REPRODUCED'});
  injector.destroy();
  const failingInjector=createEnvironmentInjector([
    {provide:tokens.JOURNEY_REPLAY_CONFIG,useValue:config},
    {provide:tokens.JOURNEY_REPLAY_ENROLLMENT,useValue:{...locator,studentId:'audit-save-failure',studentDisplayName:'Audit',mode:'demo'}},
    {provide:tokens.JOURNEY_REPLAY_PERSISTENCE,useValue:{load:()=>undefined,save:()=>{throw new Error('QuotaExceededError');},clear:()=>{}}}
  ]);
  const failingRuntime=runInInjectionContext(failingInjector,()=>new JourneyReplayRuntimeService());
  failingRuntime.selectChoice('mission-trade');
  failingRuntime.setResponseText('Audit response which must not silently disappear when storage fails.');
  assert.equal(failingRuntime.completeCurrentStep(),true);
  assert.equal(failingRuntime.saveState(),'error');
  assert.equal(failingRuntime.error(),undefined);
  assert.equal(failingRuntime.state().completedSteps.length,1);
  results.push({check:'Local storage failure still advances chapter and clears the error',result:'REPRODUCED'});
  failingInjector.destroy();
  console.log(JSON.stringify(results,null,2));
  fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(results,null,2));
}
asyncChecks().catch(error=>{console.error(error);process.exitCode=1;});
