import type * as Phaser from 'phaser';

/** Authored canvas textures: sails remain separate physical parts so reefing and repair are visible. */
export function makeSailTexture(scene: Phaser.Scene, key: string, damaged: boolean, patched: boolean): void {
  if (scene.textures.exists(key)) return;
  const texture = scene.textures.createCanvas(key,520,450)!;
  const c=texture.context;
  const cloth=new Path2D('M23 18 Q250 42 495 19 Q473 135 508 404 Q266 447 5 407 Q50 199 23 18Z');
  c.save(); c.clip(cloth);
  const gradient=c.createLinearGradient(0,0,520,100);
  gradient.addColorStop(0,'#a28a60');gradient.addColorStop(.18,'#f0dda8');gradient.addColorStop(.5,'#d7b87c');gradient.addColorStop(.72,'#f5e5b5');gradient.addColorStop(1,'#8c744f');
  c.fillStyle=gradient;c.fillRect(0,0,520,450);
  const shade=c.createLinearGradient(0,0,0,450);shade.addColorStop(0,'#fff5c122');shade.addColorStop(.55,'#60442100');shade.addColorStop(1,'#59411c55');c.fillStyle=shade;c.fillRect(0,0,520,450);
  for(let x=44;x<520;x+=48){ c.strokeStyle='#69502d50';c.lineWidth=2;c.beginPath();c.moveTo(x,15);c.bezierCurveTo(x+20,140,x-25,280,x+10,450);c.stroke(); }
  // Deterministic fine weave, not per-frame noise.
  for(let y=0;y<450;y+=3){ c.strokeStyle=y%9===0?'#fff6ce19':'#62492813';c.lineWidth=.6;c.beginPath();c.moveTo(0,y);c.lineTo(520,y+2);c.stroke(); }
  c.restore();c.strokeStyle='#745534';c.lineWidth=5;c.stroke(cloth);
  if(damaged){c.save();c.globalCompositeOperation='destination-out';c.fill(new Path2D('M307 107L266 172 310 183 254 299 338 213 303 184 348 133Z'));c.restore();c.strokeStyle='#553e2d';c.lineWidth=2;c.stroke(new Path2D('M307 107L266 172 310 183 254 299 338 213 303 184 348 133'));}
  if(patched){c.fillStyle='#e4c994';c.strokeStyle='#6b5437';c.lineWidth=2;c.save();c.translate(300,200);c.rotate(-.09);c.fillRect(-72,-92,145,188);c.setLineDash([4,6]);c.strokeRect(-66,-86,133,176);c.restore();}
  texture.refresh();
}

export function makeBarrelTexture(scene:Phaser.Scene):void {
  if(scene.textures.exists('journey-barrel'))return;
  const t=scene.textures.createCanvas('journey-barrel',76,92)!;const c=t.context;
  const path=new Path2D('M13 13Q1 48 13 79Q37 95 63 79Q75 48 63 13Z');
  const g=c.createLinearGradient(0,0,76,0);g.addColorStop(0,'#33291f');g.addColorStop(.25,'#c59554');g.addColorStop(.55,'#8c633d');g.addColorStop(1,'#2f3229');c.fillStyle=g;c.fill(path);
  c.save();c.clip(path);for(let x=15;x<76;x+=11){c.strokeStyle='#382d2599';c.lineWidth=2;c.beginPath();c.moveTo(x,0);c.quadraticCurveTo(x-9,50,x,90);c.stroke();}c.fillStyle='#394749';c.fillRect(0,23,76,7);c.fillRect(0,65,76,7);c.restore();
  c.fillStyle='#c7a26b';c.beginPath();c.ellipse(38,13,25,10,0,0,Math.PI*2);c.fill();c.strokeStyle='#413c2d';c.lineWidth=3;c.stroke();t.refresh();
}
