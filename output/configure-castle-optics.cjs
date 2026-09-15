const fs = require('node:fs');
const file = 'public/projects/castle-archive-rescue/project.json';
const before = fs.readFileSync(file, 'utf8');
if (before.includes('"optics-cage"')) throw new Error('Already opted in');
let count = 0;
const next = before.replace(/^([ \t]*)"kind": "reflection",/gm, (line, indent) => {
  count++;
  return `${line}\n${indent}"presentation": { "kind": "optics-cage", "owls": 2 },`;
});
if (count !== 4) throw new Error(`Expected four pathways, found ${count}`);
const strip = value => {
  if (Array.isArray(value)) return value.map(strip);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key,v])=>!(key==='presentation'&&v.kind==='optics-cage')).map(([key,v])=>[key,strip(v)]));
  return value;
};
if (JSON.stringify(JSON.parse(before)) !== JSON.stringify(strip(JSON.parse(next)))) throw new Error('Unexpected content difference');
fs.writeFileSync(file,next);
fs.writeFileSync('output/build-castle-optics.cjs',fs.readFileSync('output/build-castle-fox.cjs','utf8').replaceAll('castle-fox','castle-optics'));
console.log('Four optics presentations added; all educational configuration preserved.');
