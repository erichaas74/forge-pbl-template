import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import type * as Three from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { MountedSpatialAsset } from './spatial-asset';
import { requireSpatialInspection, type SpatialInspectionDefinition } from './spatial-inspection.definition';
@Component({selector:'app-spatial-inspection',templateUrl:'./spatial-inspection.component.html',styleUrl:'./spatial-inspection.component.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class SpatialInspectionComponent {
  readonly definition=input.required<SpatialInspectionDefinition>(); readonly leave=output<void>();
  readonly surface=viewChild<ElementRef<HTMLDivElement>>('surface'); readonly canvas=viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  readonly loading=signal(true); readonly error=signal(''); readonly selected=signal(''); readonly heading=signal(0);
  private T?:typeof Three; private renderer?:Three.WebGLRenderer; private camera?:Three.PerspectiveCamera; private scene?:Three.Scene;
  private controls?:OrbitControls; private mounted?:MountedSpatialAsset; private observer?:ResizeObserver; private request=new AbortController();
  private pointer?:{x:number;y:number};
  constructor(){afterNextRender(()=>void this.setup());inject(DestroyRef).onDestroy(()=>{this.request.abort();this.observer?.disconnect();this.controls?.dispose();this.mounted?.dispose();this.scene?.traverse(node=>{if(this.T&&node instanceof this.T.DirectionalLight)node.shadow.dispose();});this.renderer?.dispose();});}
  private async setup():Promise<void>{
    try {
      const definition=requireSpatialInspection(this.definition());
      const [T,{OrbitControls},{loadSpatialAsset}]=await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js'),import('./spatial-asset.loader')]);
      if(this.request.signal.aborted)return;this.T=T;
      const renderer=this.renderer=new T.WebGLRenderer({canvas:this.canvas()!.nativeElement,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0xc8d6d5);renderer.outputColorSpace=T.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
      const scene=this.scene=new T.Scene();scene.fog=new T.Fog(0xc8d6d5,15,30);
      scene.add(new T.HemisphereLight(0xe8f7ff,0x716044,2.4));const sun=new T.DirectionalLight(0xffe5bc,3);sun.position.set(-3,8,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:30});sun.shadow.normalBias=.03;scene.add(sun);
      const camera=this.camera=new T.PerspectiveCamera(48,1,.05,60);
      const controls=this.controls=new OrbitControls(camera,this.canvas()!.nativeElement);controls.enablePan=false;controls.enableDamping=false;controls.minPolarAngle=.18;controls.maxPolarAngle=1.3;controls.maxDistance=11;controls.addEventListener('change',()=>this.draw());
      this.mounted=await loadSpatialAsset(definition.asset,this.request.signal);this.mounted.pivot.traverse(node=>{if(node instanceof T.Mesh){node.castShadow=true;node.receiveShadow=true;}});scene.add(this.mounted.pivot);renderer.shadowMap.needsUpdate=true;
      this.loading.set(false);this.overview();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.surface()!.nativeElement);this.resize();
    }catch(error){if(!this.request.signal.aborted){this.loading.set(false);this.error.set('The scene could not open. Return to the village and try again.');}}
  }
  private resize():void{const box=this.surface()?.nativeElement;if(!box||!this.camera||!this.renderer)return;this.renderer.setSize(box.clientWidth,box.clientHeight,false);this.camera.aspect=box.clientWidth/Math.max(1,box.clientHeight);this.camera.updateProjectionMatrix();this.draw();}
  private draw():void{if(this.renderer&&this.scene&&this.camera){this.renderer.render(this.scene,this.camera);if(this.controls){const degrees=this.controls.getAzimuthalAngle()*180/Math.PI;this.heading.set(Math.round((degrees+360)%360));}}}
  overview():void{if(!this.camera||!this.controls)return;this.selected.set('');this.controls.target.set(0,.6,0);this.controls.minDistance=4.3;this.camera.position.set(5,3.2,5.8);this.controls.update();this.draw();}
  inspect(name:string):void{const target=this.definition().targets.find(t=>t.name===name);if(!target||!this.camera||!this.controls)return;this.selected.set(target.label);this.controls.target.set(...target.focus);this.controls.minDistance=Math.max(1.1,target.distance*.65);this.camera.position.set(target.focus[0]+target.distance*.7,target.focus[1]+target.distance*.75,target.focus[2]+target.distance*.6);this.controls.update();this.draw();}
  step(angle:number):void{if(!this.camera||!this.controls||!this.T)return;const offset=this.camera.position.clone().sub(this.controls.target);offset.applyAxisAngle(new this.T.Vector3(0,1,0),angle);this.camera.position.copy(this.controls.target).add(offset);this.controls.update();this.draw();}
  zoom(scale:number):void{if(!this.camera||!this.controls)return;const offset=this.camera.position.clone().sub(this.controls.target);offset.setLength(Math.max(this.controls.minDistance,Math.min(this.controls.maxDistance,offset.length()*scale)));this.camera.position.copy(this.controls.target).add(offset);this.controls.update();this.draw();}
  elevation(delta:number):void{if(!this.camera||!this.controls||!this.T)return;const s=new this.T.Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target));s.phi=Math.max(.18,Math.min(1.3,s.phi+delta));this.camera.position.copy(this.controls.target).add(new this.T.Vector3().setFromSpherical(s));this.controls.update();this.draw();}
  down(e:PointerEvent):void{this.pointer={x:e.clientX,y:e.clientY};}
  pick(e:PointerEvent):void{
    const start=this.pointer;this.pointer=undefined;if(!start||Math.hypot(start.x-e.clientX,start.y-e.clientY)>6||!this.T||!this.camera||!this.mounted)return;
    const rect=this.canvas()!.nativeElement.getBoundingClientRect(),ray=new this.T.Raycaster();ray.setFromCamera(new this.T.Vector2((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2),this.camera);
    const targets=this.definition().targets.map(t=>this.mounted!.nodes.get(t.name)!).filter(Boolean);let node:Three.Object3D|undefined=ray.intersectObjects(targets,true)[0]?.object;
    while(node){if(this.definition().targets.some(t=>t.name===node!.name)){this.inspect(node.name);break;}node=node.parent??undefined;}
  }
  key(e:KeyboardEvent):void{const actions:Record<string,()=>void>={ArrowLeft:()=>this.step(-Math.PI/6),ArrowRight:()=>this.step(Math.PI/6),ArrowUp:()=>this.elevation(-.15),ArrowDown:()=>this.elevation(.15),'+':()=>this.zoom(.8),'-':()=>this.zoom(1.25),Escape:()=>this.overview()};if(actions[e.key]){e.preventDefault();actions[e.key]();}}
}
