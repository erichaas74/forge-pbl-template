import {readFileSync,writeFileSync} from 'node:fs';
const path='public/projects/castle-archive-rescue/project.json';
const source=readFileSync(path,'utf8');
if(source.includes('"fraction-cage"')) throw new Error('Rabbit presentation already configured');
let count=0;
const next=source.replace(/^(\s*)"kind": "fraction-gear",/gm,(match,indent)=>{
  count++;return `${match}\n${indent}"presentation": { "kind": "fraction-cage", "rabbits": 6 },`;
});
if(count!==4) throw new Error(`Expected four grade configurations, found ${count}`);
JSON.parse(next);writeFileSync(path,next);
