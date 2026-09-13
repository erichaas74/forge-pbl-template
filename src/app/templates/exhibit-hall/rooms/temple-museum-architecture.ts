import * as THREE from 'three';

/** Presentation only: the assigned room dimensions and display slots remain unchanged. */
export const TEMPLE_PALETTE = {
  sandstone: '#d5b57b',
  paleStone: '#e9cfa0',
  lapis: '#204456',
  gold: '#bc8b39',
  red: '#a65337',
  turquoise: '#467b76',
} as const;

/** A reusable, Egyptian-inspired museum shell, without additional assets or animation. */
export function buildTempleMuseum(
  group: THREE.Group,
  width: number,
  depth: number,
  height: number,
): void {
  const stone = material(TEMPLE_PALETTE.sandstone);
  stone.map = stoneTexture(false);
  const pale = material(TEMPLE_PALETTE.paleStone);
  const blue = material(TEMPLE_PALETTE.lapis);
  const gold = material(TEMPLE_PALETTE.gold, 0.3);
  const red = material(TEMPLE_PALETTE.red);
  const teal = material(TEMPLE_PALETTE.turquoise);
  const floor = material('#f0d6a2');
  floor.map = stoneTexture(true);
  const relief = new THREE.MeshStandardMaterial({ map: reliefTexture(), roughness: 0.95 });
  const frieze = new THREE.MeshStandardMaterial({ map: friezeTexture(), roughness: 0.9 });
  const ceiling = new THREE.MeshBasicMaterial({ color: '#c5d3db', map: starTexture() });

  box(group, [width, 0.16, depth], [0, -0.09, 0], floor).receiveShadow = true;
  // An inlaid processional path leads toward the collection, with no movable architecture.
  for (const x of [-1.42, 1.42]) {
    box(group, [0.07, 0.012, depth - 0.3], [x, 0.006, 0], gold);
    box(group, [0.13, 0.01, depth - 0.3], [x + Math.sign(x) * 0.13, 0.005, 0], blue);
  }
  box(group, [width, height, 0.24], [0, height / 2, -depth / 2], stone);
  for (const side of [-1, 1]) {
    box(group, [0.24, height, depth], [(side * width) / 2, height / 2, 0], stone);
    box(group, [0.18, 0.38, depth], [side * (width / 2 - 0.16), 0.19, 0], pale);
    box(group, [0.08, 0.16, depth], [side * (width / 2 - 0.22), 0.48, 0], blue);
    box(group, [0.1, 0.06, depth], [side * (width / 2 - 0.23), 0.61, 0], gold);
    const band = panel(group, depth, 0.52, [side * (width / 2 - 0.14), height - 0.72, 0], frieze);
    band.rotation.y = (-side * Math.PI) / 2;
    box(group, [0.5, 0.22, depth], [side * (width / 2 - 0.12), height - 0.2, 0], pale);
    for (const z of [-depth / 2 + 1.1, 0, depth / 2 - 1.1]) {
      column(group, side * (width / 2 - 1), z, height, stone, pale, blue, gold, red, teal);
    }
  }
  box(group, [width, 0.38, 0.18], [0, 0.19, -depth / 2 + 0.16], pale);
  box(group, [width, 0.16, 0.08], [0, 0.48, -depth / 2 + 0.22], blue);
  box(group, [width, 0.06, 0.1], [0, 0.61, -depth / 2 + 0.23], gold);
  panel(group, width, 0.52, [0, height - 0.72, -depth / 2 + 0.14], frieze);

  // Deep portal jambs and stepped lintels echo a temple gateway.
  for (const side of [-1, 1]) {
    box(group, [1.6, height, 0.8], [side * (width / 2 - 0.7), height / 2, depth / 2], stone);
    box(group, [1.76, 0.32, 1], [side * (width / 2 - 0.7), 0.16, depth / 2], pale);
  }
  box(group, [width, 0.52, 0.85], [0, height - 0.26, depth / 2], pale);
  box(group, [width, 0.13, 0.94], [0, height - 0.59, depth / 2], blue);
  box(group, [width, 0.07, 1], [0, height - 0.69, depth / 2], gold);
  box(group, [width, 0.14, depth], [0, height + 0.04, 0], ceiling);
  for (const z of [-depth / 2 + 0.3, 0, depth / 2 - 0.3]) {
    box(group, [width, 0.23, 0.32], [0, height - 0.12, z], pale);
    box(group, [width, 0.04, 0.34], [0, height - 0.255, z], gold);
  }
  // Recessed warm ceiling panels keep the student artifacts easy to see.
  const glow = new THREE.MeshBasicMaterial({ color: '#fff1ca' });
  for (const z of [-2.8, 2.8]) {
    box(group, [2.2, 0.035, 1.7], [0, height - 0.06, z], glow);
  }

  for (const x of [-width / 2 + 1.95, width / 2 - 1.95]) {
    box(group, [1.48, 2.78, 0.1], [x, 2.65, -depth / 2 + 0.17], gold);
    panel(group, 1.35, 2.65, [x, 2.65, -depth / 2 + 0.23], relief);
  }
  // Stylized sun and lotus motifs are decoration, not purported historical inscriptions.
  const emblem = new THREE.MeshBasicMaterial({ map: sunTexture(), transparent: true });
  panel(group, 4.4, 0.74, [0, height - 0.76, -depth / 2 + 0.2], emblem);
}

function column(
  parent: THREE.Group,
  x: number,
  z: number,
  height: number,
  stone: THREE.Material,
  pale: THREE.Material,
  blue: THREE.Material,
  gold: THREE.Material,
  red: THREE.Material,
  teal: THREE.Material,
): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  parent.add(group);
  cylinder(group, 0.65, 0.7, 0.2, 0.1, pale);
  cylinder(group, 0.5, 0.6, 0.18, 0.29, gold);
  cylinder(group, 0.37, 0.47, height - 1.5, (height - 1.5) / 2 + 0.38, stone);
  cylinder(group, 0.49, 0.49, 0.36, 0.62, teal);
  cylinder(group, 0.49, 0.49, 0.06, 0.84, gold);
  // Flared papyrus-inspired capitals, painted with bands and petal shapes.
  const capitalY = height - 0.85;
  cylinder(group, 0.72, 0.37, 0.66, capitalY, teal);
  cylinder(group, 0.75, 0.75, 0.13, height - 0.47, blue);
  cylinder(group, 0.76, 0.76, 0.07, height - 0.37, gold);
  cylinder(group, 0.4, 0.4, 0.12, height - 1.25, red);
  cylinder(group, 0.41, 0.41, 0.05, height - 1.34, gold);
  box(group, [1.53, 0.23, 1.53], [0, height - 0.2, 0], pale);
  const petals = new THREE.BufferGeometry();
  const points: number[] = [];
  for (let index = 0; index < 12; index++) {
    const angle = (index * Math.PI) / 6;
    for (const [theta, radius, y] of [
      [angle + 0.15, 0.725, capitalY + 0.32],
      [angle - 0.15, 0.725, capitalY + 0.32],
      [angle, 0.395, capitalY - 0.29],
    ])
      points.push(Math.sin(theta!) * radius!, y!, Math.cos(theta!) * radius!);
  }
  petals.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  petals.computeVertexNormals();
  group.add(new THREE.Mesh(petals, gold));
}

function material(color: string, metalness = 0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness });
}
function box(
  group: THREE.Group,
  size: readonly number[],
  position: readonly number[],
  material: THREE.Material,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(position[0]!, position[1]!, position[2]!);
  group.add(mesh);
  return mesh;
}
function cylinder(
  group: THREE.Group,
  top: number,
  bottom: number,
  height: number,
  y: number,
  material: THREE.Material,
): void {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, height, 24), material);
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}
function panel(
  group: THREE.Group,
  width: number,
  height: number,
  position: readonly number[],
  material: THREE.Material,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.position.set(position[0]!, position[1]!, position[2]!);
  group.add(mesh);
  return mesh;
}
function texture(
  width: number,
  height: number,
  draw: (context: CanvasRenderingContext2D) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;
  draw(context);
  const result = new THREE.CanvasTexture(canvas);
  result.colorSpace = THREE.SRGBColorSpace;
  return result;
}
function stoneTexture(floor: boolean): THREE.CanvasTexture {
  const result = texture(512, 512, (ctx) => {
    ctx.fillStyle = '#e4cfab';
    ctx.fillRect(0, 0, 512, 512);
    let seed = 37;
    const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    for (let i = 0; i < 4500; i++) {
      ctx.fillStyle = i % 2 ? '#ab845918' : '#fff3d32b';
      ctx.fillRect(random() * 512, random() * 512, random() * 6 + 1, random() * 2 + 1);
    }
    ctx.strokeStyle = '#96734755';
    ctx.lineWidth = 2;
    for (let row = 0; row < 4; row++) {
      ctx.beginPath();
      ctx.moveTo(0, row * 128);
      ctx.lineTo(512, row * 128);
      for (let x = (row % 2) * 128; x <= 512; x += 256) {
        ctx.moveTo(x, row * 128);
        ctx.lineTo(x, (row + 1) * 128);
      }
      ctx.stroke();
    }
  });
  result.wrapS = result.wrapT = THREE.RepeatWrapping;
  result.repeat.set(floor ? 4 : 3, floor ? 4 : 1.5);
  return result;
}
function lotus(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  for (const rotation of [-0.65, 0, 0.65]) {
    ctx.save();
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.quadraticCurveTo(-22, -8, 0, -38);
    ctx.quadraticCurveTo(22, -8, 0, 18);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.moveTo(-27, 18);
  ctx.quadraticCurveTo(0, 43, 27, 18);
  ctx.stroke();
  ctx.restore();
}
function reliefTexture(): THREE.CanvasTexture {
  return texture(256, 512, (ctx) => {
    ctx.fillStyle = '#cead76';
    ctx.fillRect(0, 0, 256, 512);
    ctx.strokeStyle = '#846039';
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, 228, 484);
    ctx.strokeRect(23, 23, 210, 466);
    ctx.fillStyle = '#b78a4b';
    ctx.beginPath();
    ctx.arc(128, 96, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // An ankh-shaped relief sits between the sun and lotus ornament.
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.ellipse(128, 200, 27, 38, 0, 0, Math.PI * 2);
    ctx.moveTo(128, 238);
    ctx.lineTo(128, 335);
    ctx.moveTo(84, 256);
    ctx.lineTo(172, 256);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.fillStyle = '#b5915c';
    lotus(ctx, 128, 412, 1.3);
    for (const x of [43, 213])
      for (let y = 150; y < 370; y += 38) {
        ctx.strokeRect(x - 4, y, 8, 15);
      }
  });
}
function friezeTexture(): THREE.CanvasTexture {
  return texture(1024, 64, (ctx) => {
    ctx.fillStyle = TEMPLE_PALETTE.lapis;
    ctx.fillRect(0, 0, 1024, 64);
    ctx.fillStyle = TEMPLE_PALETTE.gold;
    ctx.fillRect(0, 0, 1024, 5);
    ctx.fillRect(0, 59, 1024, 5);
    ctx.fillStyle = '#b7ad74';
    ctx.strokeStyle = '#d9b967';
    ctx.lineWidth = 1;
    for (let x = 32; x < 1024; x += 64) lotus(ctx, x, 35, 0.6);
  });
}
function starTexture(): THREE.CanvasTexture {
  const result = texture(256, 256, (ctx) => {
    ctx.fillStyle = '#597483';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#e4cb89';
    ctx.lineWidth = 2;
    for (let y = 32; y < 256; y += 64)
      for (let x = 32; x < 256; x += 64) {
        ctx.beginPath();
        for (let ray = 0; ray < 5; ray++) {
          const a = (ray * Math.PI * 2) / 5 - Math.PI / 2;
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7);
        }
        ctx.stroke();
      }
  });
  result.wrapS = result.wrapT = THREE.RepeatWrapping;
  result.repeat.set(4, 4);
  return result;
}
function sunTexture(): THREE.CanvasTexture {
  return texture(1024, 180, (ctx) => {
    ctx.fillStyle = '#b2863b';
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(512, 75);
      ctx.scale(side, 1);
      for (let feather = 0; feather < 15; feather++) {
        const x = 58 + feather * 25;
        ctx.beginPath();
        ctx.moveTo(x, -12 - feather * 1.4);
        ctx.lineTo(x + 36, -21 - feather * 1.4);
        ctx.lineTo(x + 9, 73 - feather * 4.5);
        ctx.lineTo(x - 9, 71 - feather * 4.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(512, 74, 46, 0, Math.PI * 2);
    ctx.fillStyle = '#b76338';
    ctx.fill();
    ctx.strokeStyle = '#e0b455';
    ctx.lineWidth = 7;
    ctx.stroke();
  });
}
