import * as Phaser from 'phaser';
import type { JourneyPathNode } from '../../domain/journey-path.models';
import type { JourneyWorldCallbacks, JourneyWorldHandle, JourneyWorldView } from './journey-world.contracts';
import { makeBarrelTexture, makeSailTexture } from './journey-ship.art';

/** A bounded visual projection. Decisions and resources remain in the shared journey runtime. */
export function mountJourneyLocationWorld(parent:HTMLElement,node:JourneyPathNode,view:()=>JourneyWorldView,callbacks:JourneyWorldCallbacks):JourneyWorldHandle {
  let disposed=false;
  const rough=node.scene==='storm'||node.scene==='cape';
  const damaged=node.events.some(event=>event.object.icon==='sail');
  class Anchorage extends Phaser.Scene {
    private backdrop!:Phaser.GameObjects.Image;
    private ship!:Phaser.GameObjects.Container;
    private frontSail!:Phaser.GameObjects.Image;
    private rearSail!:Phaser.GameObjects.Image;
    private water!:Phaser.GameObjects.Graphics;
    private atmosphere!:Phaser.GameObjects.Graphics;
    private survey!:Phaser.GameObjects.Graphics;
    private cargo:Phaser.GameObjects.Image[]=[];
    private tender!:Phaser.GameObjects.Container;
    private timber!:Phaser.GameObjects.Graphics;
    private shade!:Phaser.GameObjects.Ellipse;
    private effectKey='';
    private elapsed=0;
    private shipBase={x:0,y:0};
    private lastPointer={x:0,y:0};
    private sceneReady=false;
    constructor(){super('journey-anchorage');}
    preload():void {
      this.load.image('coast',node.sceneArt!.backdrop);
      this.load.image('vessel',node.sceneArt!.ship);
      this.load.on('loaderror',()=>callbacks.failed());
    }
    create():void {
      if(disposed||!this.textures.exists('coast')||!this.textures.exists('vessel'))return;
      this.backdrop=this.add.image(0,0,'coast').setOrigin(.5);
      this.shade=this.add.ellipse(0,0,600,48,0x031b24,.48);
      this.water=this.add.graphics();
      makeSailTexture(this,'canvas-full',false,false);
      makeSailTexture(this,'canvas-torn',true,false);
      makeSailTexture(this,'canvas-patched',false,true);
      makeBarrelTexture(this);
      this.ship=this.add.container(0,0);
      this.frontSail=this.add.image(-126,-754,damaged?'canvas-torn':'canvas-full').setOrigin(.5,0).setDisplaySize(490,400);
      this.rearSail=this.add.image(328,-722,'canvas-full').setOrigin(.5,0).setDisplaySize(402,288);
      this.ship.add([this.frontSail,this.rearSail,this.add.image(0,0,'vessel').setOrigin(.5,1)]);
      this.timber=this.add.graphics().setVisible(false);
      for(let i=0;i<3;i++){this.timber.fillStyle(0x9d7549).fillRoundedRect(-140,-259+i*13,220,12,2).lineStyle(2,0xd5af70,.6).lineBetween(-130,-255+i*13,72,-255+i*13);}
      this.ship.add(this.timber);
      for(let i=0;i<4;i++){const barrel=this.add.image(-225+i*74,-276,'journey-barrel').setDisplaySize(59,72).setAlpha(i===0?1:0);this.ship.add(barrel);this.cargo.push(barrel);}
      const paper=this.add.graphics().fillStyle(0xe9d19a,1).fillPoints([{x:190,y:-306},{x:287,y:-331},{x:320,y:-283},{x:209,y:-265}].map(p=>new Phaser.Math.Vector2(p.x,p.y)),true);
      paper.lineStyle(2,0x4b7167,.9).lineBetween(210,-289,252,-315).lineBetween(252,-315,294,-292);this.ship.add(paper);
      this.tender=this.add.container(0,0);
      const boat=this.add.graphics();boat.fillStyle(0x112733,.5).fillEllipse(0,15,137,22);boat.fillStyle(0x553d27,1).fillPoints([{x:-74,y:-12},{x:-42,y:18},{x:47,y:15},{x:78,y:-19},{x:33,y:-5},{x:-33,y:-3}].map(p=>new Phaser.Math.Vector2(p.x,p.y)),true);boat.lineStyle(3,0xc5a16c,1).lineBetween(-73,-13,-32,-4).lineBetween(-32,-4,33,-6).lineBetween(33,-6,77,-19);boat.lineStyle(5,0x8c6d43,1).lineBetween(-11,-10,43,44);this.tender.add(boat);
      this.tender.add(this.add.image(12,-10,'journey-barrel').setDisplaySize(21,28));
      this.survey=this.add.graphics();
      this.atmosphere=this.add.graphics();
      this.input.on('pointermove',(p:Phaser.Input.Pointer)=>{this.lastPointer={x:p.x/this.scale.width-.5,y:p.y/this.scale.height-.5};});
      const resize=()=>this.layout();this.scale.on('resize',resize);this.layout();
      this.sceneReady=true;callbacks.ready();
      if(!view().reducedMotion)this.cameras.main.fadeIn(450,7,27,34);
    }
    private layout():void {
      if(!this.backdrop)return;
      const w=this.scale.width,h=this.scale.height;
      const cover=Math.max(w/1536,h/1024)*1.03;
      this.backdrop.setDisplaySize(1536*cover,1024*cover).setPosition(w*.5,h*.5);
      this.shipBase={x:w*(w<650?.46:.40),y:h*.83};
      const shipWidth=w*(w<650?.98:.70);
      this.ship.setPosition(this.shipBase.x,this.shipBase.y).setScale(Math.min(shipWidth/1536,h*.70/1024));
      this.shade.setPosition(this.shipBase.x,this.shipBase.y-6).setDisplaySize(shipWidth*.7,Math.max(15,shipWidth*.045));
      this.tender.setPosition(w*.76,h*.63).setScale(Math.max(.45,Math.min(.85,w/1100)));
      this.effectKey='';
    }
    override update(_time:number,delta:number):void {
      if(!this.sceneReady||disposed)return;
      const v=view(),w=this.scale.width,h=this.scale.height;
      const moving=!v.paused&&!v.reducedMotion;
      this.tweens.timeScale=moving?1:0;
      if(moving)this.elapsed+=Math.min(delta,60);
      const t=this.elapsed/1000;
      const sheltered=v.effects.has('rest');
      const strength=rough&&!sheltered?1.5:.45;
      this.ship.setAngle(moving?Math.sin(t*.75)*strength:0).setY(this.shipBase.y+(moving?Math.sin(t*1.05)*3.5:0));
      this.backdrop.setPosition(w*.5+(moving?this.lastPointer.x*5:0),h*.5+(moving?this.lastPointer.y*3:0));
      const key=[...v.effects].sort().join('|');
      if(key!==this.effectKey){
        this.effectKey=key;
        this.frontSail.setTexture(v.effects.has('repair')&&damaged?'canvas-patched':damaged?'canvas-torn':'canvas-full');
        this.timber.setVisible(v.effects.has('repair')&&!damaged);
        const sailHeight=sheltered?95:400;
        if(moving){this.tweens.killTweensOf([this.frontSail,this.rearSail]);this.tweens.add({targets:this.frontSail,displayHeight:sailHeight,duration:700,ease:'Sine.easeInOut'});this.tweens.add({targets:this.rearSail,displayHeight:sheltered?70:288,duration:700,ease:'Sine.easeInOut'});}
        else {this.frontSail.displayHeight=sailHeight;this.rearSail.displayHeight=sheltered?70:288;}
        const supplied=v.effects.has('water')||v.effects.has('exchange');
        this.cargo.forEach((barrel,i)=>{this.tweens.killTweensOf(barrel);if(moving)this.tweens.add({targets:barrel,alpha:supplied||i===0?1:0,duration:550,delay:i*100});else barrel.setAlpha(supplied||i===0?1:0);});
        const target={x:w*(supplied?.63:.76),y:h*(supplied?.78:.63)};
        this.tweens.killTweensOf(this.tender);if(moving)this.tweens.add({targets:this.tender,...target,duration:1600,ease:'Sine.easeInOut'});else this.tender.setPosition(target.x,target.y);
      }
      this.drawWater(t,w,h,strength);
      this.drawSurvey(w,h,v.effects.has('charts'));
      this.drawAtmosphere(t,w,h,moving,rough&&!sheltered);
    }
    private drawWater(t:number,w:number,h:number,strength:number):void {
      const g=this.water;g.clear();
      // Sparse specular wave crests follow the water perspective and leave the source coastline readable.
      for(let i=0;i<48;i++){
        const depth=((i*37)%100)/100;
        const y=h*(.48+depth*.50);
        const x=((i*163+t*(8+depth*15))%(w+80))-40;
        const width=8+depth*35;
        g.lineStyle(.5+depth,rough?0xc4e9e6:0xffedbc,(.08+Math.sin(t*.6+i)*.04)*depth);
        g.beginPath();g.moveTo(x,y);g.lineTo(x+width*.4,y-1.5*strength);g.lineTo(x+width,y);g.strokePath();
      }
      const x=this.shipBase.x,y=this.ship.y-8,sw=this.ship.scaleX*1536;
      for(let i=0;i<3;i++)g.lineStyle(1.4,0xdbf7ec,.14-i*.025).strokeEllipse(x+sw*.02,y+i*5,sw*(.68+i*.05),10+i*9);
    }
    private drawSurvey(w:number,h:number,visible:boolean):void {
      const g=this.survey;g.clear();if(!visible)return;
      const start={x:this.shipBase.x+this.ship.scaleX*247,y:this.ship.y-this.ship.scaleX*291};
      for(const end of [{x:w*.68,y:h*.32},{x:w*.85,y:h*.43}]){
        const distance=Math.hypot(end.x-start.x,end.y-start.y),steps=Math.ceil(distance/15);
        g.lineStyle(1.4,0xffd788,.72);
        for(let i=0;i<steps;i+=2){const a=i/steps,b=Math.min(1,(i+1)/steps);g.lineBetween(start.x+(end.x-start.x)*a,start.y+(end.y-start.y)*a,start.x+(end.x-start.x)*b,start.y+(end.y-start.y)*b);}
        g.strokeCircle(end.x,end.y,13).strokeCircle(end.x,end.y,4);
      }
      g.lineStyle(1.5,0xffebba,.85).strokeCircle(start.x,start.y,12);
    }
    private drawAtmosphere(t:number,w:number,h:number,moving:boolean,rain:boolean):void {
      const g=this.atmosphere;g.clear();
      if(rain){
        g.lineStyle(1,0xcde8ee,.22);
        for(let i=0;i<65;i++){const x=((i*193-t*65)%(w+120)+w+120)%(w+120)-60,y=(i*89+t*240)%(h+80)-40;g.lineBetween(x,y,x-12,y+29);}
      }
      // Two distant gulls provide scale, with slow flight rather than a busy particle field.
      for(let i=0;i<2;i++){const x=w*(.2+i*.14)+(moving?Math.sin(t*.13+i)*24:0),y=h*(.18+i*.045);g.lineStyle(1.7,0x152b35,.55).beginPath().moveTo(x-9,y+1).lineTo(x-4,y-3).lineTo(x,y).lineTo(x+4,y-3).lineTo(x+9,y+1).strokePath();}
    }
  }
  const game=new Phaser.Game({type:Phaser.AUTO,parent,width:Math.max(1,parent.clientWidth),height:Math.max(1,parent.clientHeight),backgroundColor:'#082934',scene:new Anchorage(),banner:false,audio:{noAudio:true},fps:{target:30},scale:{mode:Phaser.Scale.RESIZE},render:{antialias:true}});
  const observer=new ResizeObserver(()=>{if(!disposed&&game.isBooted&&parent.clientWidth&&parent.clientHeight)game.scale.setParentSize(parent.clientWidth,parent.clientHeight);});observer.observe(parent);
  return {destroy(){disposed=true;observer.disconnect();game.destroy(true);}};
}
