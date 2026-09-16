// Original illustrative crop geometry. No downloaded models or textures.
import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import fs from 'node:fs/promises';
globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(value=>{this.result=value;this.onloadend?.();});}};
const scene=new T.Scene(), bins=new Map();
const mats={soil:0x705039,sand:0xc3b18b,leaf:0x4e7937,stalk:0x788a40,kernel:0xd1ae53,root:0x9e6759,straw:0x9d8050,wood:0x80644b,pod:0x85a64a,chili:0xb93a23,squash:0xb59c50};
function add(target,material,geometry,position=[0,0,0],scale=[1,1,1],rotation=[0,0,0]){
  const transform=new T.Matrix4().compose(new T.Vector3(...position),new T.Quaternion().setFromEuler(new T.Euler(...rotation)),new T.Vector3(...scale));
  const g=geometry.toNonIndexed();g.applyMatrix4(transform);g.deleteAttribute('uv');const key=target+'|'+material;if(!bins.has(key))bins.set(key,[]);bins.get(key).push(g);
}
function leaf(target,x,y,z,angle,length,width){
  const positions=[],indices=[];
  for(let i=0;i<=12;i++){const t=i/12,w=Math.sin(Math.PI*t)*width,h=Math.sin(t*Math.PI)*.20-t*t*.12;for(const side of [-1,1])positions.push(t*length,h,w*side);if(i<12){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();add(target,'leaf',g,[x,y,z],[1,1,1],[0,angle,0]);
}
function ear(target,x,y,z,tilt=0,detailed=true){
  add(target,'stalk',new T.CylinderGeometry(.018,.045,.42,8),[x,y,z],[1,1,1],[0,0,tilt]);
  // Individual kernels are reserved for the path-side inspection plants and sample.
  if(!detailed){add(target,'kernel',new T.SphereGeometry(1,8,6),[x,y,z],[.065,.20,.065]);return;}
  for(let row=0;row<9;row++)for(let col=0;col<8;col++){const a=col/8*Math.PI*2,r=.045*Math.sin((row+1)/11*Math.PI)+.014;add(target,'kernel',new T.SphereGeometry(1,6,4),[x+Math.cos(a)*r,y-.15+row*.037,z+Math.sin(a)*r],[.029,.024,.027]);}
}
add('ENV_ground','sand',new T.CylinderGeometry(80,80,.15,64),[0,-.09,0]);
// Broad planted beds flank an open central inspection path.
const columns=8,rows=10;
for(let i=0;i<columns*rows;i++){
  const col=i%columns,row=Math.floor(i/columns);
  const x=-1.1-col*.7+(row%2)*.08,z=-3.5-row*.7,h=1.8+(i%3)*.15;
  add('ENV_ground','soil',new T.SphereGeometry(1,12,6),[x,-.01,z],[.52,.18,.5]);
  add('INT_maize','stalk',new T.CylinderGeometry(.016,.032,h,8),[x,h/2,z]);
  for(let k=0;k<7;k++)leaf('INT_maize',x,.3+k*.20,z,k*2.4+i,.65,.075);
  ear('INT_maize',x+.12,1.0,z,0,col<2&&row<3);
  for(let k=0;k<5;k++)add('INT_maize','stalk',new T.CylinderGeometry(.004,.009,.35,5),[x+(k-2)*.027,h+.09,z],[1,1,1],[0,0,(k-2)*.20]);
}
// Sweet potato vines over soil mounds; roots are represented in the harvested sample.
for(let i=0;i<columns*rows;i++){
  const col=i%columns,row=Math.floor(i/columns);
  const x=1.1+col*.7-(row%2)*.08,z=-3.5-row*.7;
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
function stem(target,material,from,to,radius=.014){
  add(target,material,new T.TubeGeometry(new T.LineCurve3(new T.Vector3(...from),new T.Vector3(...to)),1,radius,5,false));
}
function ovalLeaf(target,x,y,z,angle,size=.22){
  const shape=new T.Shape();shape.moveTo(0,0);shape.quadraticCurveTo(-size,size*.6,0,size*2);shape.quadraticCurveTo(size,size*.6,0,0);
  add(target,'leaf',new T.ShapeGeometry(shape,5),[x,y,z],[1,1,1],[-1.2,0,angle]);
}
// Cassava: woody branching stems and palmate leaves with narrow lobes.
for(let i=0;i<16;i++){
  const x=-1.3-(i%4)*1.15,z=-1+Math.floor(i/4)*.95,h=1.3+(i%3)*.12;
  add('ENV_ground','soil',new T.SphereGeometry(1,10,5),[x,-.01,z],[.5,.18,.45]);
  stem('INT_cassava','wood',[x,0,z],[x,h,z],.027);
  for(let k=0;k<5;k++){
    const angle=k*2.4,px=x+Math.cos(angle)*.32,pz=z+Math.sin(angle)*.32,py=h-.35+(k%2)*.22;
    stem('INT_cassava','stalk',[x,py-.12,z],[px,py,pz],.012);
    for(let lobe=0;lobe<7;lobe++)leaf('INT_cassava',px,py,pz,angle+lobe*Math.PI*2/7,.34,.025);
  }
}
// Bean bushes: trifoliate leaves and hanging green pods.
for(let i=0;i<16;i++){
  const x=-1.3-(i%4)*1.15,z=3.6+Math.floor(i/4)*.9;
  stem('INT_beans','stalk',[x,0,z],[x,.65,z]);
  for(let k=0;k<4;k++){
    const a=k*2.4,px=x+Math.cos(a)*.25,pz=z+Math.sin(a)*.25,y=.3+k*.09;
    stem('INT_beans','stalk',[x,y-.1,z],[px,y,pz]);
    for(let l=0;l<3;l++)ovalLeaf('INT_beans',px,y,pz,a+(l-1)*1.8,.16);
    const curve=new T.CatmullRomCurve3([new T.Vector3(px,y,pz),new T.Vector3(px+.04,y-.14,pz+.025),new T.Vector3(px+.01,y-.29,pz)]);
    add('INT_beans','pod',new T.TubeGeometry(curve,5,.026,5,false));
  }
}
// Chili shrubs: pointed leaves and tapered red/green fruits.
for(let i=0;i<16;i++){
  const x=1.3+(i%4)*1.15,z=-1+Math.floor(i/4)*.95,h=.85+(i%3)*.07;
  stem('INT_chili','wood',[x,0,z],[x,h,z],.019);
  for(let k=0;k<6;k++){
    const a=k*2.4,px=x+Math.cos(a)*.27,pz=z+Math.sin(a)*.27,y=.35+k*.085;
    stem('INT_chili','stalk',[x,y-.12,z],[px,y,pz],.009);
    ovalLeaf('INT_chili',px,y,pz,a,.15);
    // Lathed tapered fruit, hanging from a short stem.
    const profile=[new T.Vector2(.002,-.22),new T.Vector2(.028,-.15),new T.Vector2(.042,-.06),new T.Vector2(.025,0),new T.Vector2(.005,.015)];
    add('INT_chili',k%3?'chili':'pod',new T.LatheGeometry(profile,6),[px,y-.06,pz],[1,1,1],[0,a,.2]);
    stem('INT_chili','stalk',[px,y,pz],[px,y-.05,pz],.007);
  }
}
// Squash: spreading runners, broad lobed leaves and ribbed fruits.
for(let i=0;i<16;i++){
  const x=1.3+(i%4)*1.15,z=3.6+Math.floor(i/4)*.9;
  for(let k=0;k<5;k++){
    const a=k*2.4,px=x+Math.cos(a)*.46,pz=z+Math.sin(a)*.46;
    stem('INT_squash','stalk',[x,.07,z],[px,.14,pz],.016);
    const shape=new T.Shape();
    for(let p=0;p<20;p++){const angle=p/20*Math.PI*2,r=p%4===0?.34:p%2===0?.22:.28;const lx=Math.cos(angle)*r,lz=Math.sin(angle)*r;p?shape.lineTo(lx,lz):shape.moveTo(lx,lz);}shape.closePath();
    add('INT_squash','leaf',new T.ShapeGeometry(shape),[px,.27,pz],[1,1,1],[-Math.PI/2,0,a]);
  }
  const fruit=new T.SphereGeometry(1,16,8),positions=fruit.getAttribute('position');
  for(let p=0;p<positions.count;p++){const px=positions.getX(p),pz=positions.getZ(p),rib=1+.065*Math.cos(Math.atan2(pz,px)*8);positions.setXYZ(p,px*rib,positions.getY(p),pz*rib);}fruit.computeVertexNormals();
  add('INT_squash','squash',fruit,[x,.23,z],[.29,.23,.29]);
  stem('INT_squash','stalk',[x,.42,z],[x+.03,.53,z],.025);
}
// Roots and an ear laid on a shallow woven-colour tray for close comparison.
add('ENV_tray','straw',new T.CylinderGeometry(.85,.78,.07,32),[.25,.05,2.25],[1,1,.65]);
for(let i=0;i<6;i++)add('INT_roots','root',new T.SphereGeometry(1,16,10),[-.20+(i%3)*.25,.18+(i>2?.11:0),2.05+Math.floor(i/3)*.2],[.11,.09,.29],[0,(i-2)*.3,0]);
ear('INT_ear',.78,.27,2.25);
const groups=new Map();
for(const [key,geometries]of bins){const[target,material]=key.split('|');if(!groups.has(target)){const g=new T.Group();g.name=target;groups.set(target,g);scene.add(g);}const merged=mergeGeometries(geometries,false);merged.computeVertexNormals();groups.get(target).add(new T.Mesh(merged,new T.MeshStandardMaterial({color:mats[material],roughness:.95,side:T.DoubleSide})));}
const binary=await new GLTFExporter().parseAsync(scene,{binary:true});const out='public/projects/shadow-gallery/coastal-3d-v1';await fs.mkdir(out,{recursive:true});await fs.writeFile(out+'/field.glb',Buffer.from(binary));console.log('Authored field.glb',binary.byteLength,'bytes');
let meshes=0,triangles=0;scene.traverse(node=>{if(node instanceof T.Mesh){meshes++;triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;}});
console.log(JSON.stringify({maizePlants:columns*rows,sweetPotatoMounds:columns*rows,cassavaPlants:16,beanPlants:16,chiliPlants:16,squashPlants:16,meshes,triangles}));
