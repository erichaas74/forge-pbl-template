// Original illustrative dugout geometry, authored for this project. No third-party model.
import * as T from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import fs from 'node:fs/promises';
globalThis.FileReader = class { readAsArrayBuffer(blob) { blob.arrayBuffer().then(value => { this.result = value; this.onloadend?.(); }); } };
const scene = new T.Scene();
const wood = new T.MeshStandardMaterial({ vertexColors: true, roughness: .94, side: T.DoubleSide });
const vertices=[], colors=[], indices=[]; const rows=120, cols=48;
function surface(inner) {
  const offset=vertices.length/3;
  for(let i=0;i<=rows;i++) for(let j=0;j<=cols;j++) {
    const t=i/rows*2-1, a=j/cols*Math.PI, z=t*(inner?2.78:3.05);
    const taper=Math.sqrt(Math.max(.014,1-t*t*t*t));
    const w=(inner?.54:.69)*taper, depth=(inner?.44:.62)*taper;
    const x=w*Math.cos(a), y=.91+.10*t*t-depth*Math.sin(a);
    vertices.push(x,y,z);
    const grain=.065*Math.sin(a*110+Math.sin(t*18)*2)+.028*Math.sin(t*190+a*9);
    const shade=(inner?.60:.43)+grain+.035*Math.sin(t*7);
    const c=new T.Color().setRGB(shade,shade*.61,shade*.32); colors.push(c.r,c.g,c.b);
    if(i<rows&&j<cols) {const k=offset+i*(cols+1)+j; indices.push(k,k+cols+1,k+1,k+1,k+cols+1,k+cols+2);}
  }
  return offset;
}
const outer=surface(false), inside=surface(true);
function join(a,b,c,d){indices.push(a,b,c,b,d,c);}
for(let i=0;i<rows;i++) for(const j of [0,cols]) {const k=i*(cols+1)+j;join(k,k+cols+1,inside+k,inside+k+cols+1);}
for(const i of [0,rows]) for(let j=0;j<cols;j++){const k=i*(cols+1)+j;join(k,k+1,inside+k,inside+k+1);}
const geometry=new T.BufferGeometry(); geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3)); geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3)); geometry.setIndex(indices); geometry.computeVertexNormals();
const hull=new T.Mesh(geometry,wood); hull.name='INT_hull'; scene.add(hull);
const rim=new T.Group();rim.name='INT_rim';scene.add(rim);
const rimMat=new T.MeshStandardMaterial({color:0x96704a,roughness:.93});
for(const sign of [-1,1]) {const pts=[];for(let i=0;i<=80;i++){const t=i/80*2-1;pts.push(new T.Vector3(sign*.62*Math.sqrt(Math.max(.014,1-t**4)),.915+.1*t*t,t*2.94));}rim.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),100,.045,6,false),rimMat));}
const sand=new T.Mesh(new T.CylinderGeometry(12,12,.14,96),new T.MeshStandardMaterial({color:0xc3b18b,roughness:1}));sand.position.y=-.08;sand.name='ENV_ground';scene.add(sand);
const logMat=new T.MeshStandardMaterial({color:0x584534,roughness:1});
for(const z of [-1.8,1.8]){const m=new T.Mesh(new T.CylinderGeometry(.15,.18,2,12),logMat);m.rotation.z=Math.PI/2;m.position.set(0,.14,z);m.name='ENV_support_'+(z<0?'a':'b');scene.add(m);}
const tool=new T.Group();tool.name='INT_stone';tool.position.set(1.8,.42,.4);scene.add(tool);
const stone=new T.Mesh(new T.IcosahedronGeometry(.23,1),new T.MeshStandardMaterial({color:0x687271,roughness:.9}));stone.scale.set(.7,.45,1.6);stone.rotation.y=.35;tool.add(stone);
const slab=new T.Mesh(new T.CylinderGeometry(.64,.75,.36,9),new T.MeshStandardMaterial({color:0x938a73,roughness:1}));slab.position.set(1.8,.17,.4);slab.name='ENV_workstone';scene.add(slab);
const chips=new T.Group();chips.name='ENV_shavings';scene.add(chips);
const chipMat=new T.MeshStandardMaterial({color:0xba8f55,roughness:1});
// One combined mesh keeps small incidental details inexpensive.
const cp=[],ci=[];
for(let i=0;i<60;i++){const x=.85+((i*37)%91)/80,z=-2.5+((i*17)%97)/20,k=cp.length/3;cp.push(x,.01,z,x+.08,.018,z+.02,x+.035,.035,z+.17);ci.push(k,k+1,k+2);}
const cg=new T.BufferGeometry();cg.setAttribute('position',new T.Float32BufferAttribute(cp,3));cg.setIndex(ci);cg.computeVertexNormals();chipMat.side=T.DoubleSide;chips.add(new T.Mesh(cg,chipMat));
const socket=new T.Object3D();socket.name='SOCKET_overview';socket.position.set(5,3,6);scene.add(socket);
const binary=await new GLTFExporter().parseAsync(scene,{binary:true});
const out='public/projects/shadow-gallery/coastal-3d-v1';await fs.mkdir(out,{recursive:true});await fs.writeFile(out+'/workshop.glb',Buffer.from(binary));
console.log('Authored workshop.glb',binary.byteLength,'bytes');
