import fs from 'node:fs';
const file = 'public/projects/castle-archive-rescue/project.json';
let source = fs.readFileSync(file, 'utf8');
const presentation = {kind:'timing-cage', animal:{label:'Fox', model:'/projects/castle-archive-rescue/art/patrol/fox.glb', idle:'Survey', walk:'Walk', run:'Run', credits:'/projects/castle-archive-rescue/art/patrol/credits.html'}};
let count = 0;
source = source.replace(/^([ \t]*)"firstAlignment": true\r?$/gm, (_, indent) => {
  count++;
  const json = JSON.stringify(presentation, null, 2).split('\n').join('\r\n' + indent);
  return `${indent}"firstAlignment": true,\r\n${indent}"presentation": ${json}`;
});
if (count !== 4) throw new Error(`Expected 4 timing configurations; found ${count}`);
source = source.replaceAll('All the holes align at the first possible moment. The lookout shutter closes!', 'The shared pin slides home. The lookout shutter closes and the holding cage opens.');
JSON.parse(source);
fs.writeFileSync(file, source);
