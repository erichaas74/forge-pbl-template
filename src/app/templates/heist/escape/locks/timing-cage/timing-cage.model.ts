import * as T from 'three';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { TimingWheels } from '../machine.models';
import { cagePose } from './timing-cage.motion';
import { batchMetalwork } from './timing-cage.batch';
import { DioramaSurfaces, stoneArch } from '../diorama-surfaces';

export interface TimingDiorama {
  root: T.Group;
  wheels: T.Group[];
  wheelCenters: T.Vector3[];
  holeAngles: number[];
  pin: T.Group;
  latch: T.Group;
  door: T.Group;
  crank: T.Group;
  lever: T.Group;
  shutter: T.Group;
  animal: T.Group;
  flames: T.Mesh[];
  indicators: T.Mesh[];
  drawbar: T.Mesh;
  cageCable: T.Mesh;
}

function disc(
  art: BalanceMetalwork,
  parent: T.Group,
  radius: number,
  holeAngle: number,
  holeDistance: number,
  material: T.MeshStandardMaterial,
) {
  const shape = new T.Shape();
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
  const hole = new T.Path();
  hole.absarc(
    Math.cos(holeAngle) * holeDistance,
    Math.sin(holeAngle) * holeDistance,
    0.27,
    0,
    Math.PI * 2,
    true,
  );
  shape.holes.push(hole);
  const axle = new T.Path();
  axle.absarc(0, 0, 0.16, 0, Math.PI * 2, true);
  shape.holes.push(axle);
  art.mesh(
    new T.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 48,
    }),
    material,
    parent,
  );
  art.torus(parent, 0, 0, 0.13, radius - 0.045, 0.045, art.brass);
  art.torus(
    parent,
    Math.cos(holeAngle) * holeDistance,
    Math.sin(holeAngle) * holeDistance,
    0.14,
    0.27,
    0.035,
    art.steel,
  );
  for (let i = 0; i < 40; i++) {
    const a = (i * Math.PI) / 20;
    const tooth = art.box(
      parent,
      Math.cos(a) * (radius + 0.035),
      Math.sin(a) * (radius + 0.035),
      0.065,
      0.14,
      0.12,
      0.16,
      material,
      0.018,
    );
    tooth.rotation.z = a;
  }
}

export function createTimingDiorama(art: BalanceMetalwork, d: TimingWheels): TimingDiorama {
  const root = new T.Group();
  root.name = 'timing-cage-diorama';
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(0x667786);
  const edge = surfaces.stone(0x344955);
  const floor = surfaces.stone(0x7b837d);
  const wood = surfaces.wood(0x896039);
  const blue = art.material({ color: 0x538391, metalness: 0.7, roughness: 0.35 });
  const bronze = art.material({ color: 0x927255, metalness: 0.8, roughness: 0.38 });
  const leaves = art.material({ color: 0x47694b, roughness: 0.96 });
  // A shallow courtyard with a continuous floor keeps the lock and escape in one space.
  art.box(root, 0, -0.22, 1.15, 17.6, 0.6, 8.3, edge, 0.12);
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 11; col++) {
      const tile = art.box(
        root,
        -7.9 + col * 1.57 + (row % 2) * 0.06,
        0.09,
        -1.5 + row * 1.53,
        1.51,
        0.17,
        1.45,
        floor,
        0.055,
      );
      tile.rotation.y = Math.sin(row * 23 + col * 7) * 0.007;
    }
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 11; col++) {
      const x = -8 + col * 1.6 + (row % 2) * 0.25;
      if (x > 1.8 && x < 5.6 && row > 1 && row < 5) continue;
      art.box(
        root,
        x,
        0.58 + row * 1.0,
        -1.55,
        1.52,
        0.94,
        0.46,
        (row + col) % 5 === 0 ? edge : stone,
        0.065,
      );
    }
  // Moonlit recess above the animal enclosure.
  const night = art.material({ color: 0x0c2539, roughness: 1 });
  art.box(root, 3.6, 3.3, -1.83, 4.0, 4.6, 0.18, night);
  stoneArch(art, root, 3.6, 3.28, 2.03, -1.28, stone);
  const moon = art.material({ color: 0xdbe6db, emissive: 0xa8cdda, emissiveIntensity: 0.65 });
  art.mesh(new T.SphereGeometry(0.5, 24, 12), moon, root, 4.2, 4.5, -1.6);
  for (let i = 0; i < 17; i++)
    art.mesh(new T.SphereGeometry(0.016, 6, 4), moon, root, 2.02 + (i * 0.773) % 3.2, 3.8 + (i * 0.317) % 1.15, -1.67);
  for (const x of [-8.25, 0.15, 7.5]) {
    art.box(root, x, 3.0, -1.0, 0.52, 6.1, 0.65, edge, 0.08);
    art.box(root, x, 0.4, -0.95, 0.8, 0.5, 0.85, stone, 0.05);
    art.box(root, x, 5.7, -0.95, 0.8, 0.4, 0.85, stone, 0.05);
  }
  for (let i = 0; i < 17; i++) {
    const x = 6.65 + Math.sin(i * 2) * 0.5,
      y = 1.6 + i * 0.23;
    const leaf = art.mesh(new T.SphereGeometry(0.13, 6, 4), leaves, root, x, y, -0.98);
    leaf.scale.set(1, 1.8, 0.4);
    leaf.rotation.z = Math.sin(i) * 0.7;
  }
  // Lock frame, deliberately larger than surrounding decoration.
  const frameTop = d.periods.length > 2 ? 6.5 : 5.72;
  art.box(root, -4.25, (frameTop + 0.35) / 2, -0.44, 7.0, frameTop - 0.35, 0.65, art.dark, 0.17);
  art.box(root, -4.25, 0.4, 0.05, 7.45, 0.35, 1.9, art.trim, 0.06);
  art.box(root, -4.25, frameTop, 0, 7.25, 0.24, 1.1, art.brass, 0.035);
  for (const x of [-7.5, -1]) for (const y of [0.72, 5.36]) art.screw(root, x, y, -0.05);
  const releasePoint = new T.Vector3(-4.25, 3.45, 0);
  const wheelCenters: T.Vector3[] = [],
    holeAngles: number[] = [],
    wheels: T.Group[] = [];
  d.periods.forEach((period, i) => {
    const angle =
      d.periods.length === 2
        ? Math.PI * (1 - i)
        : Math.PI / 2 + (i * Math.PI * 2) / d.periods.length;
    const center = new T.Vector3(
      releasePoint.x + Math.cos(angle) * 1.15,
      releasePoint.y + Math.sin(angle) * 1.15,
      0.35 + i * 0.24,
    );
    const wheel = new T.Group();
    wheel.name = `timing-disc-${i + 1}`;
    wheel.position.copy(center);
    root.add(wheel);
    const holeAngle = angle + Math.PI;
    disc(
      art,
      wheel,
      d.periods.length === 2 ? 1.77 : 1.5,
      holeAngle,
      1.15,
      [art.brass, blue, bronze, art.steel][i],
    );
    const rim = d.periods.length === 2 ? 1.49 : 1.29;
    art.torus(wheel, 0, 0, 0.146, 0.65, 0.012, art.dark);
    art.torus(wheel, 0, 0, 0.146, 0.72, 0.009, art.brass);
    for (let tick = 0; tick < period; tick++) {
      const a = holeAngle - (tick * Math.PI * 2) / period;
      const mark = art.box(
        wheel,
        Math.cos(a) * rim,
        Math.sin(a) * rim,
        0.155,
        0.022,
        0.13,
        0.015,
        art.dark,
        0.004,
      );
      mark.rotation.z = a - Math.PI / 2;
      if (period <= 12 || tick % 2 === 0)
        art.label(
          wheel,
          String(tick),
          Math.cos(a) * (rim + 0.12),
          Math.sin(a) * (rim + 0.12),
          0.18,
          0.25,
          0.22,
          '#182a32',
        );
    }
    art.torus(root, center.x, center.y, center.z + 0.23, 0.23, 0.08, art.steel);
    art.screw(root, center.x, center.y, center.z + 0.26);
    wheelCenters.push(center);
    holeAngles.push(holeAngle);
    wheels.push(wheel);
  });
  const pin = new T.Group();
  pin.name = 'shared-alignment-pin';
  pin.position.set(-4.25, 3.45, 1.95);
  root.add(pin);
  const shaft = art.cylinder(pin, 0, 0, -0.42, 0.135, 1.2, art.steel);
  shaft.rotation.x = Math.PI / 2;
  art.torus(pin, 0, 0, 0.2, 0.29, 0.055, art.brass);
  // Visible spring and vertical drawbar transfer axial release into a cable pull.
  for (let i = 0; i < 7; i++) art.torus(root, -4.25, 3.45, 1.48 + i * 0.065, 0.2, 0.018, art.steel);
  const drawbar = art.rod(
    root,
    new T.Vector3(-4.25, 3.8, 1.95),
    new T.Vector3(-4.25, 5.8, 1.65),
    0.047,
    art.steel,
  );
  const lever = new T.Group();
  lever.position.set(-4.25, 5.8, 1.65);
  root.add(lever);
  art.box(lever, 0.35, 0, 0, 0.85, 0.14, 0.16, art.brass);
  art.screw(lever, 0, 0, 0.11);
  art.rod(root, new T.Vector3(-3.48, 5.8, 1.65), new T.Vector3(5.65, 5.8, 1.65), 0.026, art.rope);
  art.torus(root, 5.65, 5.57, 1.65, 0.24, 0.05, art.brass);
  const cageCable = art.rod(
    root,
    new T.Vector3(5.89, 5.57, 1.65),
    new T.Vector3(5.78, 2.05, 2.47),
    0.026,
    art.rope,
  );
  // Crank is a real hit target on the front of the frame.
  const crank = new T.Group();
  crank.name = 'crank-handle';
  crank.position.set(-4.25, 1.12, 1.25);
  root.add(crank);
  art.torus(crank, 0, 0, 0, 0.53, 0.065, art.brass);
  art.box(crank, 0, 0, 0, 1.02, 0.085, 0.11, art.steel);
  art.box(crank, 0, 0, 0, 0.085, 1.02, 0.11, art.steel);
  const handle = art.cylinder(crank, 0.5, 0, 0.22, 0.105, 0.5, wood);
  handle.rotation.x = Math.PI / 2;
  const indicators: T.Mesh[] = [];
  for (let i = 0; i < d.periods.length; i++) {
    const lamp = art.mesh(
      new T.SphereGeometry(0.08, 12, 8),
      art.material({ color: 0x253c42, emissive: 0x203a3a }),
      root,
      -5.05 + i * 0.53,
      5.35,
      0.3,
    );
    indicators.push(lamp);
  }
  // Cage is on the same floor, with genuinely occluding bars and an outward-swinging door.
  art.box(root, 3.55, 0.31, 0.65, 4.25, 0.24, 3.55, wood, 0.05);
  for (const x of [1.48, 5.62])
    for (const z of [-1.0, 2.32]) {
      art.box(root, x, 2.2, z, 0.2, 3.9, 0.2, art.dark, 0.04);
      art.mesh(new T.SphereGeometry(0.17, 12, 8), art.brass, root, x, 4.2, z);
    }
  for (const y of [0.55, 4.0]) {
    for (const z of [-1, 2.32]) art.box(root, 3.55, y, z, 4.25, 0.14, 0.16, art.steel, 0.02);
    for (const x of [1.48, 5.62]) art.box(root, x, y, 0.65, 0.14, 0.14, 3.4, art.steel, 0.02);
  }
  for (let i = 1; i < 9; i++)
    art.rod(
      root,
      new T.Vector3(1.48 + i * 0.46, 0.55, -1),
      new T.Vector3(1.48 + i * 0.46, 4, -1),
      0.035,
      art.steel,
    );
  for (let i = 1; i < 6; i++)
    for (const x of [1.48, 5.62])
      art.rod(
        root,
        new T.Vector3(x, 0.55, -1 + i * 0.55),
        new T.Vector3(x, 4, -1 + i * 0.55),
        0.035,
        art.steel,
      );
  const door = new T.Group();
  door.name = 'animal-cage-door';
  door.position.set(1.58, 0.48, 2.32);
  root.add(door);
  for (const y of [0, 3.44]) art.box(door, 1.97, y, 0, 3.94, 0.14, 0.16, art.brass, 0.02);
  for (const x of [0, 3.94]) art.box(door, x, 1.72, 0, 0.14, 3.44, 0.16, art.steel, 0.02);
  for (let i = 1; i < 9; i++)
    art.rod(
      door,
      new T.Vector3(i * 0.438, 0, 0),
      new T.Vector3(i * 0.438, 3.44, 0),
      0.043,
      art.steel,
    );
  for (const y of [1.1, 2.8]) art.cylinder(root, 1.58, y, 2.32, 0.12, 0.35, art.brass);
  const latch = new T.Group();
  latch.name = 'cage-latch';
  latch.position.set(5.28, 2.05, 2.47);
  root.add(latch);
  art.box(latch, 0, 0, 0, 1.0, 0.14, 0.16, art.brass, 0.035);
  art.box(root, 5.66, 2.05, 2.48, 0.26, 0.42, 0.27, art.dark);
  // The lookout shutter closes as the same release opens the holding cage.
  const shutter = new T.Group();
  shutter.position.set(-7.15, 4.7, -0.05);
  root.add(shutter);
  art.box(shutter, 0, 0, 0, 0.52, 0.85, 0.07, wood);
  const animal = new T.Group();
  animal.name = 'escaping-animal';
  root.add(animal);
  const flames: T.Mesh[] = [];
  for (const x of [-8.0, 6.75]) {
    art.box(root, x, 3.5, -0.3, 0.13, 0.9, 0.15, wood);
    art.cylinder(root, x, 3.97, -0.3, 0.18, 0.19, art.dark);
    const flame = art.mesh(
      new T.SphereGeometry(0.18, 12, 8),
      art.material({ color: 0xffca73, emissive: 0xff832c, emissiveIntensity: 2 }),
      root,
      x,
      4.28,
      -0.3,
    );
    flame.scale.y = 1.85;
    flames.push(flame);
    const light = new T.PointLight(0xffa44f, 8, 7, 2);
    light.position.set(x, 4.4, 0.1);
    root.add(light);
  }
  for (const group of [...wheels, door, crank, lever, pin]) batchMetalwork(art, group);
  batchMetalwork(art, root, new Set<T.Object3D>([drawbar, cageCable, ...flames, ...indicators]));
  return {
    root,
    wheels,
    wheelCenters,
    holeAngles,
    pin,
    latch,
    door,
    crank,
    lever,
    shutter,
    animal,
    flames,
    indicators,
    drawbar,
    cageCable,
  };
}

export function positionTimingDiorama(
  stage: TimingDiorama,
  d: TimingWheels,
  tick: number,
  release: number,
): void {
  stage.wheels.forEach((wheel, i) => {
    wheel.rotation.z = ((tick + d.phases[i]) * Math.PI * 2) / d.periods[i];
  });
  stage.crank.rotation.z = (-tick * Math.PI) / 2;
  const pose = cagePose(release);
  stage.pin.position.z = 1.95 - pose.pin * 1.0;
  stage.lever.rotation.y = pose.latch * 0.4;
  stage.latch.position.x = 5.28 + pose.latch * 0.78;
  stage.door.rotation.y = -pose.door * Math.PI * 0.56;
  stage.shutter.position.y = 4.7 - pose.latch * 0.7;
  const connect = (mesh: T.Mesh, from: T.Vector3, to: T.Vector3) => {
    const delta = to.clone().sub(from);
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.scale.y = delta.length();
    mesh.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), delta.normalize());
  };
  connect(
    stage.drawbar,
    new T.Vector3(-4.25, 3.73, stage.pin.position.z + 0.2),
    new T.Vector3(-4.25, 5.8, 1.65),
  );
  connect(
    stage.cageCable,
    new T.Vector3(5.89, 5.57, 1.65),
    new T.Vector3(stage.latch.position.x + 0.5, 2.05, 2.47),
  );
  stage.indicators.forEach((lamp, i) => {
    const aligned =
      Math.abs(
        (tick + d.phases[i]) / d.periods[i] - Math.round((tick + d.phases[i]) / d.periods[i]),
      ) < 0.003;
    const material = lamp.material as T.MeshStandardMaterial;
    material.color.setHex(aligned && tick > 0 ? 0x98e4bd : 0x7c683b);
    material.emissive.setHex(aligned && tick > 0 ? 0x3b9e69 : 0x302613);
  });
}
