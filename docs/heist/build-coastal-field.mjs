// Original illustrative crop geometry. No downloaded models or textures.
import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import fs from 'node:fs/promises';
globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(value=>{this.result=value;this.onloadend?.();});}};
const scene=new T.Scene(), bins=new Map();
const mats={soil:0x705039,sand:0xc3b18b,leaf:0x4e7937,stalk:0x788a40,kernel:0xd1ae53,root:0x9e6759,straw:0x9d8050};
function add(target,material,geometry,position=[0,0,0],scale=[1,1,1],rotation=[0,0,0]){
  const transform=new T.Matrix4().compose(new T.Vector3(...position),new T.Quaternion().setFromEuler(new T.Euler(...rotation)),new T.Vector3(...scale));
  const g=geometry.toNonIndexed();g.applyMatrix4(transform);g.deleteAttribute('uv');const key=target+'|'+material;if(!bins.has(key))bins.set(key,[]);bins.get(key).push(g);
}
function leaf(target,x,y,z,angle,length,width){
  const positions=[],indices=[];
  for(let i=0;i<=12;i++){const t=i/12,w=Math.sin(Math.PI*t)*width,h=Math.sin(t*Math.PI)*.20-t*t*.12;for(const side of [-1,1])positions.push(t*length,h,w*side);if(i<12){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();add(target,'leaf',g,[x,y,z],[1,1,1],[0,angle,0]);
}
function ear(target,x,y,z,tilt=0){
  add(target,'stalk',new T.CylinderGeometry(.018,.045,.42,8),[x,y,z],[1,1,1],[0,0,tilt]);
  for(let row=0;row<9;row++)for(let col=0;col<8;col++){const a=col/8*Math.PI*2,r=.045*Math.sin((row+1)/11*Math.PI)+.014;add(target,'kernel',new T.SphereGeometry(1,6,4),[x+Math.cos(a)*r,y-.15+row*.037,z+Math.sin(a)*r],[.029,.024,.027]);}
}
add('ENV_ground','sand',new T.CylinderGeometry(80,80,.15,64),[0,-.09,0]);
// Two small planting areas separated by an inspectable path.
for(let i=0;i<6;i++){
  const x=-1.7+(i%2)*.68,z=-1.6+Math.floor(i/2)*1.08,h=1.8+(i%3)*.15;
  add('ENV_ground','soil',new T.SphereGeometry(1,12,6),[x,-.01,z],[.52,.18,.5]);
  add('INT_maize','stalk',new T.CylinderGeometry(.016,.032,h,8),[x,h/2,z]);
  for(let k=0;k<7;k++)leaf('INT_maize',x,.3+k*.20,z,k*2.4+i,.65,.075);
  ear('INT_maize',x+.12,1.0,z);
  for(let k=0;k<5;k++)add('INT_maize','stalk',new T.CylinderGeometry(.004,.009,.35,5),[x+(k-2)*.027,h+.09,z],[1,1,1],[0,0,(k-2)*.20]);
}
// Sweet potato vines over soil mounds; roots are represented in the harvested sample.
for(let i=0;i<5;i++){
  const x=.9+(i%2)*.75,z=-1.5+Math.floor(i/2)*1.05;
  add('ENV_ground','soil',new T.SphereGeometry(1,16,8),[x,.02,z],[.60,.27,.52]);
  for(let k=0;k<9;k++){
    const a=k*2.4,r=.12+k*.044,px=x+Math.cos(a)*r,pz=z+Math.sin(a)*r;
    const path=new T.LineCurve3(new T.Vector3(x,.27,z),new T.Vector3(px,.18,pz));
    add('INT_vines','stalk',new T.TubeGeometry(path,1,.012,4,false));
    // Heart-shaped blade, gently raised along the central vein.
    const shape=new T.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-.23,-.03,-.22,.18,0,.38);shape.bezierCurveTo(.22,.18,.23,-.03,0,0);
    const g=new T.ShapeGeometry(shape,8);add('INT_vines','leaf',g,[px,.20,pz],[1,1,1],[-Math.PI/2,0,a]);
  }
}
// Roots and an ear laid on a shallow woven-colour tray for close comparison.
add('ENV_tray','straw',new T.CylinderGeometry(.85,.78,.07,32),[.25,.05,2.25],[1,1,.65]);
for(let i=0;i<6;i++)add('INT_roots','root',new T.SphereGeometry(1,16,10),[-.20+(i%3)*.25,.18+(i>2?.11:0),2.05+Math.floor(i/3)*.2],[.11,.09,.29],[0,(i-2)*.3,0]);
ear('INT_ear',.78,.27,2.25);
const groups=new Map();
for(const [key,geometries]of bins){const[target,material]=key.split('|');if(!groups.has(target)){const g=new T.Group();g.name=target;groups.set(target,g);scene.add(g);}const merged=mergeGeometries(geometries,false);merged.computeVertexNormals();groups.get(target).add(new T.Mesh(merged,new T.MeshStandardMaterial({color:mats[material],roughness:.95,side:T.DoubleSide})));}
const binary=await new GLTFExporter().parseAsync(scene,{binary:true});const out='public/projects/shadow-gallery/coastal-3d-v1';await fs.mkdir(out,{recursive:true});await fs.writeFile(out+'/field.glb',Buffer.from(binary));console.log('Authored field.glb',binary.byteLength,'bytes');
