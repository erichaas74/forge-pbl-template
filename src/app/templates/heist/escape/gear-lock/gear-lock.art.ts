import * as Phaser from 'phaser';

/** A common tooth pitch makes diameter proportional to tooth count in every displayed cog. */
export const gearRadius = (teeth: number): number => teeth * 2.7;
export function createGearTexture(scene: Phaser.Scene, teeth: number, silver = false): string {
  const key = `cog-${teeth}-${silver}`;
  if (scene.textures.exists(key)) return key;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 400;
  const c = canvas.getContext('2d')!;
  c.translate(200, 200);
  const pitch = 174,
    depth = ((pitch * Math.PI) / teeth) * 0.48;
  const path = () => {
    c.beginPath();
    for (let i = 0; i < teeth * 4; i++) {
      const angle = (i / (teeth * 4)) * Math.PI * 2;
      const r = pitch + (i % 4 === 1 || i % 4 === 2 ? depth : -depth);
      const x = Math.cos(angle) * r,
        y = Math.sin(angle) * r;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
  };
  c.save();
  c.translate(0, 9);
  path();
  c.fillStyle = '#1b1611';
  c.shadowColor = '#000';
  c.shadowBlur = 15;
  c.fill();
  c.restore();
  const metal = c.createLinearGradient(-150, -180, 160, 190);
  const colors = silver
    ? ['#c9eae4', '#508e90', '#d1f3db', '#225259']
    : ['#fff0bc', '#b38440', '#f5d28a', '#684521'];
  colors.forEach((color, i) => metal.addColorStop(i / 3, color));
  path();
  c.fillStyle = metal;
  c.fill();
  c.strokeStyle = silver ? '#9dcac7' : '#f4d8a0';
  c.lineWidth = 2;
  c.stroke();
  for (const [r, color, width] of [
    [145, '#33291e', 4],
    [140, colors[0], 2],
    [66, '#291f18', 4],
    [62, colors[0], 2],
  ] as const) {
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
  }
  for (let i = 0; i < 6; i++) {
    c.save();
    c.rotate((i * Math.PI) / 3);
    c.beginPath();
    c.roundRect(77, -23, 49, 46, 15);
    c.fillStyle = '#10282b';
    c.fill();
    c.strokeStyle = '#655136';
    c.lineWidth = 3;
    c.stroke();
    c.restore();
  }
  const hub = c.createRadialGradient(-15, -20, 3, 0, 0, 60);
  hub.addColorStop(0, colors[1]);
  hub.addColorStop(1, '#253439');
  c.beginPath();
  c.arc(0, 0, 57, 0, Math.PI * 2);
  c.fillStyle = hub;
  c.fill();
  // A distinct index mark lets students follow revolutions even though labels remain upright.
  c.fillStyle = '#fff3cc';
  c.beginPath();
  c.moveTo(0, -164);
  c.lineTo(-8, -149);
  c.lineTo(8, -149);
  c.closePath();
  c.fill();
  for (let i = 0; i < 90; i++) {
    const a = i * 2.399,
      r = 70 + ((i * 29) % 65);
    c.fillStyle = '#fff2cd20';
    c.fillRect(Math.cos(a) * r, Math.sin(a) * r, 2, 1);
  }
  scene.textures.addCanvas(key, canvas);
  return key;
}
export function plate(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  width = 180,
): Phaser.GameObjects.Container {
  const root = scene.add.container(x, y);
  const shadow = scene.add.rectangle(3, 5, width, 40, 0x000000, 0.5);
  const board = scene.add.rectangle(0, 0, width, 40, 0x112b2e).setStrokeStyle(1, 0x917449);
  const label = scene.add
    .text(0, 0, text, {
      fontFamily: 'Trebuchet MS',
      fontSize: '15px',
      color: '#f3dfaf',
      align: 'center',
    })
    .setOrigin(0.5);
  root.add([shadow, board, label]);
  for (const side of [-1, 1]) root.add(scene.add.circle(side * (width / 2 - 8), 0, 2, 0xc19b58));
  return root;
}
