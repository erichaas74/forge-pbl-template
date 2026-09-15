const fs = require('node:fs');
const file = 'public/projects/castle-archive-rescue/project.json';
const before = fs.readFileSync(file, 'utf8');
const line = /^([ \t]*)"backdrop": "\/projects\/castle-archive-rescue\/art\/v3\/gear-workshop.png",(?=\r?\n[ \t]*"title": "The clockwork fox rescue")/gm;
const matches = [...before.matchAll(line)];
if (matches.length !== 4 || before.includes('"kind": "gear-cage"')) throw new Error('Unexpected gear presentation baseline');
const presentation = {
  kind: 'gear-cage', foxes: 4,
  animal: { model: '/projects/castle-archive-rescue/art/patrol/fox.glb', credits: '/projects/castle-archive-rescue/art/patrol/credits.html', idle: 'Survey', walk: 'Walk', run: 'Run' },
};
const after = before.replace(line, (match, indent) => match + '\n' + indent + '"presentation": ' + JSON.stringify(presentation, null, 2).replace(/\n/g, '\n' + indent) + ',');
const strip = value => {
  if (Array.isArray(value)) return value.map(strip);
  if (!value || typeof value !== 'object') return value;
  const result = Object.fromEntries(Object.entries(value).filter(([k,v]) => !(k === 'presentation' && v?.kind === 'gear-cage')).map(([k,v]) => [k,strip(v)]));
  return result;
};
if (JSON.stringify(strip(JSON.parse(after))) !== JSON.stringify(JSON.parse(before))) throw new Error('Unexpected content change');
fs.writeFileSync(file, after);
console.log('Enabled gear-cage for four grade pathways. All other project content preserved.');
