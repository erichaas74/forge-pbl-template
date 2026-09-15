import * as T from 'three';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import { batchMetalwork } from '../../locks/timing-cage/timing-cage.batch';
import type { GearLockDefinition } from '../gear-lock.domain';
import { cogRadius, compoundLayout } from './gear-cage.motion';
import { createGearRelease } from './gear-cage.release';
import { DioramaSurfaces } from '../../locks/diorama-surfaces';

export function gearShape(teeth: number): T.ExtrudeGeometry {
  const radius = cogRadius(teeth),
    shape = new T.Shape();
  for (let tooth = 0; tooth < teeth; tooth++)
    for (let corner = 0; corner < 4; corner++) {
      const a = ((tooth + (corner + 0.1) / 4) * Math.PI * 2) / teeth,
        r = radius + (corner === 1 || corner === 2 ? 0.055 : -0.055);
      const x = Math.cos(a) * r,
        y = Math.sin(a) * r;
      if (tooth === 0 && corner === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
  shape.closePath();
  const axle = new T.Path();
  axle.absarc(0, 0, 0.12, 0, Math.PI * 2, true);
  shape.holes.push(axle);
  return new T.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSize: 0.009,
    bevelThickness: 0.018,
    bevelSegments: 2,
    steps: 1,
  });
}
function cog(
  art: BalanceMetalwork,
  root: T.Group,
  teeth: number,
  material: T.MeshStandardMaterial,
): T.Group {
  const group = new T.Group();
  root.add(group);
  art.mesh(gearShape(teeth), material, group);
  const radius = cogRadius(teeth);
  art.torus(group, 0, 0, 0.19, radius * 0.67, 0.028, art.dark);
  art.torus(group, 0, 0, 0.182, radius * 0.86, 0.012, art.brass);
  art.torus(group, 0, 0, 0.185, radius * 0.38, 0.018, art.dark);
  for (let n = 0; n < 4; n++)
    art.screw(
      group,
      Math.cos((n * Math.PI) / 2) * radius * 0.62,
      Math.sin((n * Math.PI) / 2) * radius * 0.62,
      0.21,
    );
  art.box(group, 0, radius * 0.8, 0.205, 0.04, radius * 0.22, 0.025, art.steel, 0.003);
  batchMetalwork(art, group);
  return group;
}
export function createGearDiorama(art: BalanceMetalwork, d: GearLockDefinition) {
  const root = new T.Group();
  root.name = 'compound-gear-cage';
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(0x697b89),
    edge = surfaces.stone(0x3e5361);
  const tile = surfaces.stone(0x979c8e),
    wood = surfaces.wood(0x886340);
  const blue = art.material({ color: 0x67999e, metalness: 0.73, roughness: 0.32 });
  art.box(root, 0, -0.2, 2.2, 24.3, 0.6, 12, edge, 0.13);
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 14; col++)
      art.box(
        root,
        -11.25 + col * 1.72,
        0.12,
        -2.7 + row * 1.93,
        1.66,
        0.18,
        1.87,
        (row + col) % 7 ? tile : stone,
        0.04,
      );
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 14; col++)
      art.box(
        root,
        -11.24 + col * 1.72 + (row % 2) * 0.08,
        0.55 + row * 0.92,
        -2.93,
        1.65,
        0.87,
        0.48,
        (row + col) % 5 ? stone : edge,
        0.04,
      );
  for (const x of [-11.6, 0.1, 11.6]) {
    art.box(root, x, 4.6, -2.5, 0.45, 9.3, 0.62, edge, 0.06);
    art.box(root, x, 9.1, -2.45, 0.8, 0.3, 0.9, art.trim, 0.04);
  }
  // A generous workbench has room for the largest supported cogs and sliding mounts.
  art.box(root, -5.55, 3.65, -0.5, 11.8, 6.55, 0.5, art.dark, 0.16);
  art.box(root, -5.55, 0.45, 0.1, 12.1, 0.25, 1.4, wood, 0.06);
  art.box(root, -5.55, 6.9, -0.16, 12.1, 0.22, 0.85, art.brass, 0.035);
  for (const y of [2.55, 4.73]) {
    art.box(root, -5.45, y, 0.15, 10.9, 0.13, 0.2, art.steel, 0.025);
    for (const x of [-10.72, -0.22]) art.screw(root, x, y, 0.28);
  }
  const driver = cog(art, root, d.driverTeeth, art.brass),
    pinion = cog(art, root, d.pinionTeeth, blue);
  const inventory = d.gears.map((g, i) => cog(art, root, g.teeth, i % 2 ? art.brass : art.steel));
  inventory.forEach((g, i) => {
    g.name = `cog-${d.gears[i].teeth}-${i}`;
    g.userData['index'] = i;
  });
  const mounts = [new T.Group(), new T.Group()];
  mounts.forEach((mount, i) => {
    root.add(mount);
    art.box(mount, 0, 0, -0.15, 0.47, 2.42, 0.27, art.trim, 0.045);
    const shaft = art.cylinder(mount, 0, 0, 0.57, 0.13, 1.72, art.steel);
    shaft.rotation.x = Math.PI / 2;
    art.torus(mount, 0, 0, 1.51, 0.23, 0.037, i ? blue : art.brass);
    batchMetalwork(art, mount);
  });
  const crank = new T.Group();
  root.add(crank);
  art.torus(crank, 0, 0, 0, 0.49, 0.056, art.brass);
  art.box(crank, 0, 0, 0, 0.98, 0.07, 0.1, art.steel);
  art.box(crank, 0, 0, 0, 0.07, 0.98, 0.1, art.steel);
  const handle = art.cylinder(crank, 0.46, 0, 0.2, 0.088, 0.44, wood);
  handle.rotation.x = Math.PI / 2;
  batchMetalwork(art, crank);
  const outputPulley = new T.Group();
  root.add(outputPulley);
  art.torus(outputPulley, 0, 0, 0, 0.38, 0.045, art.dark);
  art.box(outputPulley, 0, 0, 0.04, 0.75, 0.04, 0.05, art.brass);
  batchMetalwork(art, outputPulley);
  const belt = [
    art.rod(root, new T.Vector3(), new T.Vector3(1, 1, 1), 0.042, art.rope),
    art.rod(root, new T.Vector3(), new T.Vector3(1, 1, 1), 0.042, art.rope),
  ];
  const release = createGearRelease(art, root);
  for (const x of [-11.2, 11.2]) {
    art.box(root, x, 5.7, -1.5, 0.13, 0.8, 0.13, wood);
    const flame = art.mesh(
      new T.SphereGeometry(0.15, 12, 8),
      art.material({ color: 0xffd58b, emissive: 0xffb252, emissiveIntensity: 1.4 }),
      root,
      x,
      6.2,
      -1.5,
    );
    flame.scale.y = 1.8;
  }
  const moving = new Set<T.Object3D>([
    ...belt,
    release.ball,
    release.weightCord,
    release.dominoCord,
    release.cageCord,
    release.tripCord,
  ]);
  batchMetalwork(art, root, moving);
  return { root, driver, pinion, inventory, mounts, crank, outputPulley, belt, release };
}
export type GearDiorama = ReturnType<typeof createGearDiorama>;
export function positionCompound(
  art: BalanceMetalwork,
  stage: GearDiorama,
  d: GearLockDefinition,
  answer: readonly number[],
  motion: { drive: number; axle: number; output: number },
) {
  const layout = compoundLayout(d, answer),
    tau = Math.PI * 2;
  stage.driver.position.set(layout.driveX, layout.y, 0.5);
  stage.driver.rotation.z = -motion.drive * tau;
  stage.pinion.position.set(layout.aX, layout.y, 1.27);
  stage.pinion.rotation.z = -motion.axle * tau;
  stage.mounts[0].position.set(layout.aX, layout.y, 0);
  stage.mounts[1].position.set(layout.bX, layout.y, 0);
  stage.inventory.forEach((cog, i) => {
    const socket = answer[0] === i ? 0 : answer[1] === i ? 1 : -1;
    cog.visible = socket >= 0;
    if (socket < 0) return;
    cog.position.set(socket === 0 ? layout.aX : layout.bX, layout.y, socket === 0 ? 0.5 : 1.27);
    cog.rotation.z =
      -(socket === 0 ? motion.axle : motion.output) * tau + Math.PI / d.gears[i].teeth;
  });
  stage.crank.position.set(layout.driveX, layout.y, 1.52);
  stage.crank.rotation.z = -motion.drive * tau;
  stage.outputPulley.position.set(layout.bX, layout.y, 1.62);
  stage.outputPulley.rotation.z = -motion.output * tau;
  for (let i = 0; i < 2; i++)
    art.positionRod(
      stage.belt[i],
      new T.Vector3(layout.bX, layout.y + (i ? -0.38 : 0.38), 1.62),
      new T.Vector3(1.12, 7.8 + (i ? -0.53 : 0.53), 0.65),
    );
  return layout;
}
