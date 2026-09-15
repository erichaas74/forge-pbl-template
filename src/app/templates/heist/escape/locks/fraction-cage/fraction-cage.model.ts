import * as T from 'three';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { FractionGear } from '../machine.models';
import { batchMetalwork } from '../timing-cage/timing-cage.batch';
import { createRabbit, poseRabbit, type RabbitRig } from './fraction-cage.rabbit';
import { fractionCagePose } from './fraction-cage.motion';
import { DioramaSurfaces, stoneArch } from '../diorama-surfaces';

export const COG_CENTER = new T.Vector3(-4.75, 3.35, 0.65);
export const COG_RADIUS = 2.24;
export const SECTOR_COLORS = [
  0xcda856, 0x73998b, 0xa98666, 0x8b9ab0, 0xb98986, 0xa8a46d, 0x9285ab, 0x6baca3,
];
export interface FractionDiorama {
  root: T.Group;
  cog: T.Group;
  sectors: T.Group[];
  ghosts: T.Mesh[];
  drive: T.Group;
  winch: T.Group;
  door: T.Group;
  rope: T.Mesh;
  pawl: T.Group;
  rabbits: RabbitRig[];
}

/** Top is notch zero; sectors and UI rotate clockwise. The inner cutout keeps the axle exposed. */
export function sectorGeometry(fraction: number): T.ExtrudeGeometry {
  const shape = new T.Shape(),
    start = Math.PI / 2,
    end = start - Math.PI * 2 * fraction;
  shape.moveTo(0.4 * Math.cos(start), 0.4 * Math.sin(start));
  shape.lineTo(COG_RADIUS * Math.cos(start), COG_RADIUS * Math.sin(start));
  shape.absarc(0, 0, COG_RADIUS, start, end, true);
  shape.lineTo(0.4 * Math.cos(end), 0.4 * Math.sin(end));
  shape.absarc(0, 0, 0.4, end, start, false);
  shape.closePath();
  return new T.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelSize: 0.012,
    bevelThickness: 0.025,
    bevelSegments: 2,
    curveSegments: 48,
    steps: 1,
  });
}

export function createFractionDiorama(art: BalanceMetalwork, d: FractionGear): FractionDiorama {
  const root = new T.Group();
  root.name = 'fraction-cage-diorama';
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(0x728c82);
  const tile = surfaces.stone(0xa0a58e);
  const edge = surfaces.stone(0x425b57);
  const wood = surfaces.wood(0x886044);
  const leaf = art.material({ color: 0x577b54, roughness: 0.93 });
  art.box(root, 0, -0.17, 1.8, 18, 0.55, 10.6, edge, 0.12);
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 12; c++)
      art.box(
        root,
        -8.15 + c * 1.49,
        0.09,
        -2.65 + r * 1.78,
        1.43,
        0.17,
        1.72,
        (r + c) % 7 ? tile : stone,
        0.045,
      );
  // A garden courtyard rather than another dark machinery room.
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 12; c++) {
      if (c > 6 && c < 10 && r > 2) continue;
      art.box(
        root,
        -8.18 + c * 1.51 + (r % 2) * 0.11,
        0.5 + r * 0.87,
        -2.66,
        1.46,
        0.82,
        0.5,
        (r + c) % 4 ? stone : edge,
        0.05,
      );
    }
  const sky = art.material({ color: 0x24494c, roughness: 1 });
  art.box(root, 4.5, 4.6, -3, 5, 3.1, 0.15, sky);
  stoneArch(art, root, 4.5, 3.58, 2.25, -2.46, stone);
  const flower = art.material({ color: 0xe8c689, roughness: 0.92 });
  for (const x of [-8, 7.2]) for (let i = 0; i < 5; i++) {
    const px = x + Math.sin(i * 2.4) * 0.25, pz = 3.3 + Math.cos(i * 2.4) * 0.18;
    art.cylinder(root, px, 0.85, pz, 0.015, 0.6, leaf);
    for (let p = 0; p < 5; p++) {
      const petal = art.mesh(new T.SphereGeometry(0.07, 8, 6), flower, root, px + Math.cos(p * Math.PI * 0.4) * 0.065, 1.16, pz + Math.sin(p * Math.PI * 0.4) * 0.065);
      petal.scale.y = 0.4;
    }
  }
  for (const x of [-8.4, 0.25, 7.9]) {
    art.box(root, x, 3.2, -2.25, 0.5, 6.4, 0.6, edge, 0.07);
    art.box(root, x, 6.1, -2.2, 0.8, 0.24, 0.83, art.trim, 0.04);
  }
  for (let i = 0; i < 24; i++) {
    const mesh = art.mesh(
      new T.SphereGeometry(0.13, 8, 6),
      leaf,
      root,
      7.35 + Math.sin(i * 2.3) * 0.39,
      0.75 + i * 0.215,
      -2.12,
    );
    mesh.scale.set(1, 1.7, 0.4);
    mesh.rotation.z = Math.sin(i) * 0.9;
  }
  for (const x of [-8, 7.2]) {
    art.cylinder(root, x, 0.45, 3.3, 0.42, 0.6, wood);
    for (let i = 0; i < 6; i++) {
      const stem = art.mesh(
        new T.SphereGeometry(0.12, 8, 6),
        leaf,
        root,
        x + Math.sin(i * 2) * 0.25,
        0.85,
        3.3 + Math.cos(i * 2) * 0.2,
      );
      stem.scale.set(1, 3.1, 0.5);
      stem.rotation.z = Math.sin(i) * 0.4;
    }
  }
  // Engraved backing plate, with each mathematical notch visible around the rim.
  art.box(root, -4.75, 3.23, -0.3, 6.9, 5.85, 0.55, art.dark, 0.15);
  art.box(root, -4.75, 6.17, -0.02, 7.14, 0.19, 0.88, art.brass, 0.03);
  art.box(root, -4.75, 0.35, 0.05, 7.2, 0.25, 1.5, art.trim, 0.06);
  const ring = art.torus(root, COG_CENTER.x, COG_CENTER.y, 0.47, 2.58, 0.055, art.brass);
  ring.name = 'notch-ring';
  for (let n = 0; n < d.slots; n++) {
    const a = Math.PI / 2 - (n * Math.PI * 2) / d.slots;
    const mark = art.box(
      root,
      COG_CENTER.x + Math.cos(a) * 2.57,
      COG_CENTER.y + Math.sin(a) * 2.57,
      0.54,
      0.022,
      n % 3 ? 0.105 : 0.2,
      0.015,
      n % 3 ? art.steel : art.brass,
      0.003,
    );
    mark.rotation.z = a - Math.PI / 2;
    if (n % Math.max(1, Math.round(d.slots / 8)) === 0)
      art.label(
        root,
        String(n),
        COG_CENTER.x + Math.cos(a) * 2.85,
        COG_CENTER.y + Math.sin(a) * 2.85,
        0.55,
        0.32,
        0.23,
      );
  }
  const cog = new T.Group();
  cog.position.copy(COG_CENTER);
  root.add(cog);
  const sectors: T.Group[] = [],
    ghosts: T.Mesh[] = [];
  d.pieces.forEach((p, i) => {
    const sector = new T.Group(),
      fraction = p.numerator / p.denominator;
    sector.name = `fraction-sector-${i + 1}`;
    sector.userData['piece'] = i;
    cog.add(sector);
    const m = art.material({ color: SECTOR_COLORS[i], metalness: 0.73, roughness: 0.34 });
    art.mesh(sectorGeometry(fraction), m, sector);
    const count = d.teeth * fraction;
    for (let n = 0; n < count; n++) {
      const a = Math.PI / 2 - ((n + 0.5) * Math.PI * 2) / d.teeth;
      const tooth = art.box(
        sector,
        Math.cos(a) * (COG_RADIUS + 0.055),
        Math.sin(a) * (COG_RADIUS + 0.055),
        0.11,
        0.17,
        0.14,
        0.22,
        m,
        0.018,
      );
      tooth.rotation.z = a;
    }
    const mid = Math.PI / 2 - Math.PI * fraction;
    for (const r of [0.65, 2.0]) art.screw(sector, Math.cos(mid) * r, Math.sin(mid) * r, 0.25);
    const value = new T.Group();
    value.name = 'fraction-value';
    value.position.set(Math.cos(mid) * 1.4, Math.sin(mid) * 1.4, 0.29);
    sector.add(value);
    art.label(value, `${p.numerator}/${p.denominator}`, 0, 0, 0, 0.74, 0.35, '#152b2b');
    batchMetalwork(art, sector);
    sectors.push(sector);
    const ghostMaterial = art.material({
      color: 0x97e1bf,
      transparent: true,
      opacity: 0.43,
      depthWrite: false,
      metalness: 0.1,
      roughness: 0.6,
    });
    const ghost = art.mesh(
      sectorGeometry(fraction),
      ghostMaterial,
      root,
      COG_CENTER.x,
      COG_CENTER.y,
      COG_CENTER.z + 0.38,
    );
    ghost.name = `sector-preview-${i + 1}`;
    ghost.castShadow = false;
    ghost.visible = false;
    ghosts.push(ghost);
  });
  const cap = art.cylinder(root, COG_CENTER.x, COG_CENTER.y, 1.01, 0.36, 0.48, art.steel);
  cap.rotation.x = Math.PI / 2;
  art.torus(root, COG_CENTER.x, COG_CENTER.y, 1.29, 0.23, 0.035, art.brass);
  art.screw(root, COG_CENTER.x, COG_CENTER.y, 1.31);
  const drive = new T.Group();
  drive.position.set(-1.68, 3.35, 0.65);
  root.add(drive);
  const disc = art.cylinder(drive, 0, 0, 0.1, 0.68, 0.22, art.brass);
  disc.rotation.x = Math.PI / 2;
  for (let n = 0; n < 16; n++) {
    const a = (n * Math.PI) / 8;
    const tooth = art.box(
      drive,
      Math.cos(a) * 0.73,
      Math.sin(a) * 0.73,
      0.1,
      0.16,
      0.16,
      0.22,
      art.brass,
      0.015,
    );
    tooth.rotation.z = a;
  }
  art.torus(drive, 0, 0, 0.24, 0.42, 0.035, art.dark);
  for (let n = 0; n < 4; n++)
    art.screw(drive, Math.cos((n * Math.PI) / 2) * 0.4, Math.sin((n * Math.PI) / 2) * 0.4, 0.29);
  const winch = new T.Group();
  winch.position.set(-1.68, 3.35, 1.18);
  root.add(winch);
  const drum = art.cylinder(winch, 0, 0, 0.1, 0.35, 0.5, wood);
  drum.rotation.x = Math.PI / 2;
  for (const z of [-0.17, 0.37]) art.torus(winch, 0, 0, z, 0.39, 0.045, art.steel);
  for (let n = 0; n < 7; n++) art.torus(winch, 0, 0, -0.12 + n * 0.07, 0.355, 0.021, art.rope);
  art.box(winch, 0, 0, 0.4, 0.75, 0.08, 0.1, art.brass);
  const pawl = new T.Group();
  pawl.position.set(-0.95, 3.93, 0.85);
  root.add(pawl);
  art.box(pawl, -0.1, -0.12, 0, 0.14, 0.43, 0.14, art.steel);
  art.screw(pawl, 0, 0, 0.1);
  // A single continuous cable goes from the winding drum to the door's central lifting eye.
  art.rod(root, new T.Vector3(-2.04, 3.35, 1.25), new T.Vector3(-2.04, 6.35, 1.25), 0.028);
  art.torus(root, -1.83, 6.35, 1.25, 0.21, 0.045, art.brass);
  art.rod(root, new T.Vector3(-1.83, 6.56, 1.25), new T.Vector3(4.35, 6.56, 1.25), 0.028);
  art.torus(root, 4.35, 6.35, 1.25, 0.21, 0.045, art.brass);
  // Six rabbits share a broad enclosure; a portcullis lifts in tall side guides.
  const left = 2.25,
    right = 6.75,
    front = 1.52,
    back = -2.1;
  for (const x of [left, right]) {
    art.box(root, x, 3.2, front, 0.22, 6.05, 0.24, art.dark, 0.04);
    art.box(root, x, 1.66, back, 0.18, 2.98, 0.18, art.dark, 0.04);
    art.box(root, x, 3.22, -0.29, 0.16, 0.14, 3.75, art.steel, 0.02);
    for (let i = 0; i < 7; i++)
      art.rod(
        root,
        new T.Vector3(x, 0.22, back + i * 0.56),
        new T.Vector3(x, 3.2, back + i * 0.56),
        0.035,
        art.steel,
      );
  }
  for (const y of [0.24, 3.22]) art.box(root, 4.5, y, back, 4.55, 0.15, 0.16, art.steel, 0.02);
  for (let i = 1; i < 9; i++)
    art.rod(
      root,
      new T.Vector3(left + i * 0.5, 0.24, back),
      new T.Vector3(left + i * 0.5, 3.2, back),
      0.035,
      art.steel,
    );
  art.box(root, 4.5, 6.22, front, 4.78, 0.2, 0.45, art.brass, 0.03);
  const door = new T.Group();
  door.position.set(4.5, 0.26, front);
  door.name = 'lifting-cage-grille';
  root.add(door);
  for (const y of [0, 2.8]) art.box(door, 0, y, 0, 4.25, 0.16, 0.16, art.brass, 0.025);
  for (let i = 0; i < 10; i++)
    art.rod(
      door,
      new T.Vector3(-2.11 + i * 0.47, 0, 0),
      new T.Vector3(-2.11 + i * 0.47, 2.8, 0),
      0.043,
      art.steel,
    );
  art.torus(door, 0.06, 2.97, -0.27, 0.14, 0.04, art.brass);
  const rope = art.rod(
    root,
    new T.Vector3(4.56, 6.35, 1.25),
    new T.Vector3(4.56, 3.23, 1.25),
    0.03,
  );
  const palette = [0xe8dfce, 0xaca899, 0xcfbca1];
  const fur = palette.map((color) => art.material({ color, roughness: 0.99 }));
  const rabbits = Array.from({ length: d.presentation?.rabbits ?? 6 }, (_, i) =>
    createRabbit(art, fur[i % 3], i),
  );
  rabbits.forEach((r) => root.add(r.root));
  for (const group of [drive, winch, pawl, door]) batchMetalwork(art, group);
  batchMetalwork(art, root, new Set<T.Object3D>([rope, ...ghosts]));
  return { root, cog, sectors, ghosts, drive, winch, door, rope, pawl, rabbits };
}

export function positionFractionDiorama(
  art: BalanceMetalwork,
  stage: FractionDiorama,
  d: FractionGear,
  offsets: readonly number[],
  release: number,
  age: number,
  reduced: boolean,
): number {
  const pose = fractionCagePose(release);
  stage.cog.rotation.z = -pose.turn;
  stage.sectors.forEach((sector, i) => {
    sector.visible = offsets[i] >= 0;
    sector.rotation.z = (-Math.max(0, offsets[i]) * Math.PI * 2) / d.slots;
    const label = sector.getObjectByName('fraction-value');
    if (label) label.rotation.z = -sector.rotation.z - stage.cog.rotation.z;
  });
  stage.drive.rotation.z = (pose.turn * d.teeth) / 16 + Math.PI / 16;
  stage.winch.rotation.z = stage.drive.rotation.z;
  stage.pawl.rotation.z = pose.clutch * -0.65;
  stage.door.position.y = 0.26 + pose.lift * 2.8;
  art.positionRod(
    stage.rope,
    new T.Vector3(4.56, 6.35, 1.25),
    new T.Vector3(4.56, stage.door.position.y + 2.97, 1.25),
  );
  return stage.rabbits.reduce(
    (count, rabbit, i) => count + Number(poseRabbit(rabbit, i, release, age, reduced)),
    0,
  );
}
