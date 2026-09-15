import * as T from 'three';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { Reflection } from '../machine.models';
import { traceBeam } from '../machine.geometry';
import { batchMetalwork } from '../timing-cage/timing-cage.batch';
import { opticsPoint, opticsRelease, OPTICS_SCALE } from './optics-cage.motion';
import { createTowerOwl, poseTowerOwl } from './optics-cage.owls';
import { DioramaSurfaces } from '../diorama-surfaces';

export function createOpticsDiorama(art: BalanceMetalwork, d: Reflection) {
  const root = new T.Group(),
    fixed = new T.Group();
  root.add(fixed);
  const surfaces = new DioramaSurfaces(art);
  const slate = surfaces.stone(0x304c68);
  const stone = surfaces.stone(0x60768c);
  const deep = art.material({ color: 0x122538, roughness: 0.84 });
  const engraved = art.material({ color: 0x38576b, roughness: 0.75, metalness: 0.25 });
  const silver = art.material({
    color: 0xbde9f1,
    metalness: 0.88,
    roughness: 0.14,
    emissive: 0x386a79,
    emissiveIntensity: 0.18,
  });
  const moon = art.material({
    color: 0xe1f5ff,
    emissive: 0xa7c7ef,
    emissiveIntensity: 1.15,
    roughness: 0.9,
  });
  const light = art.material({
    color: 0xe0ffff,
    emissive: 0xa9f4ff,
    emissiveIntensity: 3,
    toneMapped: false,
  });
  const halo = art.material({
    color: 0x81d6ef,
    emissive: 0x75cce9,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    blending: T.AdditiveBlending,
  });
  art.box(fixed, -0.15, 0.13, 1.5, 24.3, 0.45, 10.8, slate, 0.12);
  art.box(fixed, -0.15, -0.12, 1.5, 24.65, 0.16, 11.1, art.brass);
  // Inlaid floor tiles, thick jambs and a recessed star window give the scene tangible depth.
  for (let x = -11; x <= 11; x += 1.5)
    for (let z = -2.7; z < 6; z += 1.5)
      art.box(fixed, x, 0.38, z, 1.47, 0.08, 1.47, Math.round(x + z) % 3 ? stone : slate, 0.015);
  art.box(fixed, -5, 5.44, -0.08, 12.15, 9.8, 0.7, deep, 0.15);
  art.box(fixed, -5, 5.44, 0.29, 11.68, 9.32, 0.09, slate);
  for (const x of [-11.08, 1.08]) art.box(fixed, x, 5.44, 0.12, 0.22, 10.0, 0.6, art.brass);
  for (const y of [0.45, 10.42]) art.box(fixed, -5, y, 0.12, 12.38, 0.2, 0.6, art.brass);
  for (let x = 0; x <= 10; x++)
    art.box(fixed, -10.5 + x * OPTICS_SCALE, 5.4, 0.355, 0.015, 8.8, 0.012, engraved, 0.002);
  for (let y = 0; y <= 8; y++)
    art.box(fixed, -5, 9.8 - y * OPTICS_SCALE, 0.355, 11, 0.015, 0.012, engraved, 0.002);
  for (const x of [-10.83, 0.83]) for (const y of [0.72, 10.12]) art.screw(fixed, x, y, 0.49);
  art.label(fixed, 'L U N A R   O B S E R V A T O R Y', -5, 10.04, 0.43, 7, 0.25);

  art.box(fixed, 6.8, 5.4, -2.4, 10.9, 10.7, 0.42, deep);
  for (const x of [2.05, 11.35])
    for (let y = 0.85; y < 11; y += 0.8) {
      art.box(fixed, x, y, -1.66, 0.88, 0.76, 1.25, y % 1.6 < 0.8 ? stone : slate, 0.055);
    }
  for (let i = 0; i < 36; i++) {
    const x = 2.9 + ((i * 1.731) % 7.75),
      y = 5.5 + ((i * 0.893) % 4.8);
    art.mesh(new T.SphereGeometry(i % 5 ? 0.019 : 0.035, 6, 4), moon, fixed, x, y, -2.08);
  }
  const moonDisc = art.mesh(new T.SphereGeometry(0.85, 40, 24), moon, fixed, 8.9, 8.5, -1.85);
  moonDisc.scale.z = 0.3;
  const crater = art.material({
    color: 0xaecbd9,
    emissive: 0x628fac,
    emissiveIntensity: 0.65,
    roughness: 1,
  });
  for (const [x, y, r] of [
    [-0.3, 0.2, 0.15],
    [0.3, 0.36, 0.13],
    [0.2, -0.38, 0.19],
    [-0.37, -0.3, 0.09],
  ]) {
    const mark = art.mesh(new T.SphereGeometry(r, 14, 10), crater, fixed, 8.9 + x, 8.5 + y, -1.61);
    mark.scale.z = 0.12;
  }
  const mirrors = d.mirrors.map((mirror, i) => {
    const [x, y, z] = opticsPoint(mirror.center);
    const mount = art.cylinder(fixed, x, y, 0.47, 1.06, 0.2, art.dark);
    mount.rotation.x = Math.PI / 2;
    art.torus(fixed, x, y, 0.59, 1.08, 0.045, art.brass);
    art.torus(fixed, x, y, 0.6, 0.93, 0.015, art.steel);
    for (let degree = 0; degree < 360; degree += 15) {
      const a = (-degree * Math.PI) / 180,
        major = degree % 45 === 0;
      const tick = art.box(
        fixed,
        x + Math.cos(a),
        y + Math.sin(a),
        0.625,
        major ? 0.14 : 0.075,
        0.025,
        0.025,
        major ? art.brass : art.steel,
        0.003,
      );
      tick.rotation.z = a;
    }
    const pivot = new T.Group();
    pivot.position.set(x, y, z);
    root.add(pivot);
    art.box(pivot, 0, 0, 0, mirror.length * OPTICS_SCALE + 0.09, 0.23, 0.26, art.brass);
    art.box(pivot, 0, 0, 0.15, mirror.length * OPTICS_SCALE, 0.12, 0.05, silver, 0.015);
    art.box(pivot, 0.92, 0, 0.14, 0.28, 0.17, 0.3, art.brass);
    art.torus(pivot, 1.02, 0, 0.33, 0.1, 0.03, art.dark);
    const hub = art.cylinder(pivot, 0, 0, 0.2, 0.11, 0.13, art.brass);
    hub.rotation.x = Math.PI / 2;
    art.screw(pivot, 0, 0, 0.31);
    art.label(fixed, String(i + 1), x, y - 1.33, 0.63, 0.37, 0.35);
    batchMetalwork(art, pivot);
    return pivot;
  });
  d.obstacles.forEach((obstacle) => {
    const a = new T.Vector3(...opticsPoint(obstacle.a)),
      b = new T.Vector3(...opticsPoint(obstacle.b));
    const body = art.box(fixed, 0, 0, 0, 0.25, 1, 0.66, stone);
    art.positionRod(body, a, b);
    body.scale.y = a.distanceTo(b);
    const ridge = art.rod(fixed, a.clone().setZ(1.08), b.clone().setZ(1.08), 0.045, art.brass);
    ridge.castShadow = true;
  });
  const emitter = new T.Vector3(...opticsPoint(d.emitter));
  const source = new T.Group();
  source.position.copy(emitter);
  source.rotation.z = (-d.direction * Math.PI) / 180;
  fixed.add(source);
  const lamp = art.cylinder(source, -0.4, 0, 0, 0.28, 0.55, art.brass);
  lamp.rotation.z = Math.PI / 2;
  const lens = art.cylinder(source, -0.1, 0, 0, 0.2, 0.045, light);
  lens.rotation.z = Math.PI / 2;
  art.box(source, -0.45, -0.28, -0.05, 0.55, 0.16, 0.6, art.dark);
  const receiver = new T.Vector3(...opticsPoint(d.receiver));
  const receiverMaterial = art.material({
    color: 0x496273,
    emissive: 0x91efff,
    emissiveIntensity: 0.0,
    metalness: 0.35,
    roughness: 0.25,
  });
  const detector = art.cylinder(
    fixed,
    receiver.x,
    receiver.y,
    0.56,
    d.radius * OPTICS_SCALE,
    0.17,
    receiverMaterial,
  );
  detector.rotation.x = Math.PI / 2;
  art.torus(fixed, receiver.x, receiver.y, 0.68, d.radius * OPTICS_SCALE + 0.09, 0.055, art.brass);
  art.label(fixed, 'RECEIVER', receiver.x - 0.5, receiver.y - 0.63, 0.62, 1.48, 0.25);
  // A single cable path carries the receiver's release to the cage's catch and pulley.
  const cablePoints = [
    receiver.clone().setZ(0.45),
    new T.Vector3(1.65, receiver.y, 0.45),
    new T.Vector3(1.65, 6.15, 0.45),
    new T.Vector3(3.65, 6.15, 0.45),
    new T.Vector3(3.65, 4.8, 1.8),
  ];
  for (let i = 1; i < cablePoints.length; i++)
    art.rod(fixed, cablePoints[i - 1], cablePoints[i], 0.038, art.brass);
  const bolt = new T.Group();
  bolt.position.set(3.85, 4.82, 1.84);
  root.add(bolt);
  art.box(bolt, 0, 0, 0, 1.18, 0.17, 0.25, art.steel);
  art.box(bolt, -0.55, 0, 0.08, 0.15, 0.38, 0.34, art.brass);
  batchMetalwork(art, bolt);
  // Tall guide rails keep the rising grille mechanically connected and clear of the owls.
  for (const x of [3.72, 10.15]) {
    art.box(fixed, x, 4.9, 1.95, 0.32, 9.1, 0.48, stone);
    art.box(fixed, x, 4.9, 2.22, 0.11, 8.95, 0.09, art.brass);
    art.box(fixed, x, 0.8, 0.1, 0.65, 0.8, 4.4, stone);
  }
  art.box(fixed, 6.94, 4.91, 0.05, 6.85, 0.3, 4.42, slate);
  art.box(fixed, 6.94, 0.62, 0.05, 6.85, 0.25, 4.42, stone);
  // Side rails stay behind the animals' exit; the front is an independently raised group.
  for (const x of [3.78, 10.09])
    for (let z = -1.5; z < 1.8; z += 0.65) art.cylinder(fixed, x, 2.7, z, 0.045, 4.1, art.steel);
  const grille = new T.Group();
  grille.position.set(6.94, 0.8, 2.19);
  root.add(grille);
  for (const y of [0, 3.85]) art.box(grille, 0, y, 0, 6.2, 0.2, 0.2, art.brass);
  for (let x = -2.95; x <= 3; x += 0.59) art.cylinder(grille, x, 1.92, 0, 0.047, 3.85, art.steel);
  art.box(grille, -2.9, 3.7, 0.05, 0.4, 0.36, 0.18, art.brass);
  batchMetalwork(art, grille);
  const pulley = new T.Group();
  pulley.position.set(6.94, 9.5, 2.05);
  root.add(pulley);
  art.torus(pulley, 0, 0, 0, 0.4, 0.075, art.brass);
  art.torus(pulley, 0, 0, 0.04, 0.32, 0.025, art.dark);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    art.rod(
      pulley,
      new T.Vector3(),
      new T.Vector3(Math.cos(a) * 0.35, Math.sin(a) * 0.35, 0),
      0.027,
      art.steel,
    );
  }
  batchMetalwork(art, pulley);
  const weight = art.box(root, 7.38, 8.9, 1.9, 0.46, 0.72, 0.44, art.dark);
  const cageRope = art.rod(
    root,
    new T.Vector3(6.51, 9.5, 2.05),
    new T.Vector3(6.51, 4.65, 2.19),
    0.035,
  );
  const weightRope = art.rod(
    root,
    new T.Vector3(7.37, 9.5, 2.05),
    new T.Vector3(7.38, 9.25, 1.9),
    0.035,
  );
  // Both resting and landing perches are real geometry, aligned with the claws.
  for (const [x, y, z] of [
    [5.4, 1.3, 0.2],
    [8.4, 1.3, 0.2],
    [4.1, 2.2, 5.7],
    [9.55, 2.2, 5.7],
  ]) {
    art.cylinder(fixed, x, y / 2, z, 0.105, y, art.dark);
    art.rod(
      fixed,
      new T.Vector3(x - 0.6, y - 0.06, z + 0.14),
      new T.Vector3(x + 0.6, y - 0.06, z + 0.14),
      0.08,
      art.rope,
    );
    art.cylinder(fixed, x, 0.48, z, 0.36, 0.12, art.brass);
  }
  const owls = Array.from({ length: d.presentation?.owls ?? 2 }, (_, i) => {
    const owl = createTowerOwl(art, i);
    root.add(owl.root);
    return owl;
  });
  const beam = Array.from({ length: d.bounceLimit + 2 }, () => ({
    core: art.rod(root, new T.Vector3(), new T.Vector3(1, 0, 0), 0.018, light),
    glow: art.rod(root, new T.Vector3(), new T.Vector3(1, 0, 0), 0.085, halo),
  }));
  beam.forEach((segment) => {
    segment.core.castShadow = false;
    segment.glow.castShadow = false;
    segment.core.receiveShadow = false;
    segment.glow.receiveShadow = false;
  });
  const selected = art.torus(root, 0, 0, 0.66, 1.13, 0.023, light);
  selected.castShadow = false;
  batchMetalwork(art, fixed);
  batchMetalwork(art, source);
  return {
    root,
    mirrors,
    beam,
    receiverMaterial,
    grille,
    bolt,
    pulley,
    weight,
    cageRope,
    weightRope,
    owls,
    selected,
  };
}
export type OpticsDiorama = ReturnType<typeof createOpticsDiorama>;

export function positionOpticsDiorama(
  art: BalanceMetalwork,
  stage: OpticsDiorama,
  d: Reflection,
  angles: readonly number[],
  selection: number,
  time: number,
  idle: number,
) {
  stage.mirrors.forEach((mirror, i) => {
    mirror.rotation.z = (-angles[i] * Math.PI) / 180;
  });
  const trace = traceBeam(d, angles),
    release = opticsRelease(time);
  stage.beam.forEach((segment, i) => {
    const a = trace.points[i],
      b = trace.points[i + 1];
    segment.core.visible = segment.glow.visible = !!a && !!b;
    if (a && b) {
      const start = new T.Vector3(...opticsPoint(a)),
        end = new T.Vector3(...opticsPoint(b));
      art.positionRod(segment.core, start, end);
      art.positionRod(segment.glow, start, end);
    }
  });
  stage.receiverMaterial.emissiveIntensity = trace.hit ? 1.5 + release.charge : 0;
  stage.grille.position.y = 0.8 + release.lift * 4.55;
  stage.bolt.position.x = 3.85 - release.bolt * 0.8;
  stage.pulley.rotation.z = (-release.lift * 4.55) / 0.4;
  stage.weight.position.y = 8.9 - release.lift * 4.55;
  art.positionRod(
    stage.cageRope,
    new T.Vector3(6.51, 9.5, 2.05),
    new T.Vector3(6.51, 4.65 + release.lift * 4.55, 2.19),
  );
  art.positionRod(
    stage.weightRope,
    new T.Vector3(7.37, 9.5, 2.05),
    new T.Vector3(7.38, stage.weight.position.y + 0.36, 1.9),
  );
  stage.selected.visible = !!d.mirrors[selection];
  if (d.mirrors[selection])
    stage.selected.position.set(...opticsPoint(d.mirrors[selection].center)).setZ(0.66);
  const escaped = stage.owls.reduce(
    (total, owl, i) => total + (poseTowerOwl(owl, i, time, idle) ? 1 : 0),
    0,
  );
  return { trace, release, escaped };
}
