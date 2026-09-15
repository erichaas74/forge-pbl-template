const fs = require('node:fs');
const base = 'src/app/templates/heist/escape/';
const old = fs.readFileSync(base + 'locks/optics-cage/optics-cage.migration.ts', 'utf8');
const migration = old
  .replace("import { acceptsGearCageUpgrade }", "import { acceptsOpticsCageUpgrade } from '../optics-cage/optics-cage.migration';\nimport { acceptsGearCageUpgrade }")
  .replaceAll('acceptsOpticsCageUpgrade(before: string', 'acceptsBridgeCageUpgrade(before: string')
  .replace('changing the optics', 'changing the bridge mathematics')
  .replace("a['kind'] === 'reflection' &&\n      b['kind'] === 'reflection' &&", "Array.isArray(a['stages']) && Array.isArray(b['stages']) &&\n      a['stages'].length === 2 && b['stages'].length === 2 &&\n      row(b['stages'][0]) && b['stages'][0]['kind'] === 'coordinate' &&\n      row(b['stages'][1]) && b['stages'][1]['kind'] === 'cable' &&")
  .replace("b['presentation']['kind'] === 'optics-cage'", "b['presentation']['kind'] === 'bridge-cage'")
  .replace('acceptsGearCageUpgrade(before, text) ||', 'acceptsOpticsCageUpgrade(before, text) ||\n        acceptsGearCageUpgrade(before, text) ||');
if (!migration.includes('export function acceptsBridgeCageUpgrade')) throw Error('migration rewrite failed');
fs.writeFileSync(base + 'locks/bridge-cage/bridge-cage.migration.ts', migration);
for (const path of ['weekly/expedition-preview.persistence.ts', 'runtime/escape-runtime.ts']) {
  const source = fs.readFileSync(base + path, 'utf8');
  fs.writeFileSync(base + path, source
    .replace("import { acceptsOpticsCageUpgrade }", "import { acceptsBridgeCageUpgrade } from '../locks/bridge-cage/bridge-cage.migration';\nimport { acceptsOpticsCageUpgrade }")
    .replace('!acceptsOpticsCageUpgrade(value.fingerprint, this.fingerprint)', '!acceptsOpticsCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsBridgeCageUpgrade(value.fingerprint, this.fingerprint)')
    .replace('!acceptsOpticsCageUpgrade(saved.fingerprint, this.fingerprint)', '!acceptsOpticsCageUpgrade(saved.fingerprint, this.fingerprint) && !acceptsBridgeCageUpgrade(saved.fingerprint, this.fingerprint)'));
}
const file = 'public/projects/castle-archive-rescue/project.json';
const source = fs.readFileSync(file, 'utf8');
fs.mkdirSync('output/castle-bridge-baseline', {recursive:true});
fs.writeFileSync('output/castle-bridge-baseline/project.json', source);
let count=0;
const next = source.replace(/("title": "Bridge engineering workshop",\r?\n)(\s*)("backdrop": "[^"]+",)/g,
  (_, title, space, backdrop) => {count++; return title + space + '"presentation": { "kind": "bridge-cage", "rabbits": 6 },\n' + space + backdrop;});
if(count!==4)throw Error('Expected exactly four bridge pathways');
const stripped=JSON.parse(next);
function strip(x){if(!x||typeof x!=='object')return; if(x.presentation?.kind==='bridge-cage')delete x.presentation; for(const v of Object.values(x))strip(v);}
strip(stripped);
if(JSON.stringify(stripped)!==JSON.stringify(JSON.parse(source)))throw Error('Unexpected content change');
fs.writeFileSync(file,next);
fs.writeFileSync('output/build-castle-bridge.cjs', fs.readFileSync('output/build-castle-optics.cjs','utf8').replaceAll('castle-optics','castle-bridge'));
console.log('Added bridge presentation to exactly four pathways; authored math unchanged.');
