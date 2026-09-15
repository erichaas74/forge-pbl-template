import * as T from 'three';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { MachineDefinition, Point, StageAnswer } from '../machine.models';
import { machineReading } from '../machine.rules';
import { DioramaSurfaces } from '../diorama-surfaces';
import { batchMetalwork } from '../timing-cage/timing-cage.batch';
import { createRabbit, type RabbitRig } from '../fraction-cage/fraction-cage.rabbit';
import { bridgeParts, bridgeRelease, cablePoints, carriagePoint, crossingRabbit, fittedCable } from './bridge-cage.motion';

export interface BridgeDiorama {
  root: T.Group; coordinate: T.Group; cable: T.Group; carriage: T.Group;
  xRail: T.Mesh; yRail: T.Mesh; xWheel: T.Group; yWheel: T.Group;
  deck: T.Group; gate: T.Group; bolt: T.Mesh; pin: T.Mesh; drum: T.Group;
  hoists: T.Mesh[]; trip: T.Mesh; cableSegments: T.Mesh[]; hook: T.Group;
  rabbits: RabbitRig[]; lamps: T.Mesh[]; ripple: T.Group;
}
const vector = (p: readonly number[]) => new T.Vector3(p[0], p[1], p[2]);

export function createBridgeDiorama(art: BalanceMetalwork, d: MachineDefinition): BridgeDiorama {
  const [coordinateDefinition, cableDefinition] = bridgeParts(d);
  const root = new T.Group(), scenery = new T.Group(), coordinate = new T.Group(), cable = new T.Group();
  root.add(scenery, coordinate, cable);
  const surfaces = new DioramaSurfaces(art), stone = surfaces.stone(0x778c8c), edge = surfaces.stone(0x445e60),
    wood = surfaces.wood(0x947444), grass = art.material({ color: 0x627a45, roughness: 0.95 }),
    water = art.material({ color: 0x34848b, metalness: 0.35, roughness: 0.24 }),
    blue = art.material({ color: 0x719da5, emissive: 0x234954, emissiveIntensity: 0.3 });
  // Two banks with a real gap, a recessed river and distant masonry establish the crossing.
  art.box(scenery, -5.8, -0.3, 2.2, 15.6, 1.6, 9, edge);
  art.box(scenery, 12, -0.3, 2.2, 6, 1.6, 9, edge);
  art.box(scenery, 5.5, -0.8, 1.6, 7, 0.22, 12.5, water);
  for (const [center, width] of [[-5.8, 15.6], [12, 6]]) {
    art.box(scenery, center, 0.58, 2.1, width, 0.24, 8.6, grass);
    art.box(scenery, center, 0.73, 3.4, width, 0.23, 3.85, stone);
    for (let x = center - width / 2 + 0.7; x < center + width / 2; x += 1.45)
      for (const z of [2.6, 4.15]) art.box(scenery, x, 0.87, z, 1.39, 0.05, 1.47, stone, 0.02);
  }
  for (const x of [1.75, 9.25]) {
    for (let z = -1; z <= 6; z += 1.2) art.box(scenery, x, 0.06, z, 0.42, 1.5, 1.14, stone);
    for (const z of [1.3, 5.7]) {
      art.box(scenery, x, 1.02, z, 0.65, 0.45, 0.68, stone);
      art.box(scenery, x, 2.06, z, 0.32, 1.7, 0.35, art.dark);
      art.cylinder(scenery, x, 2.99, z, 0.3, 0.18, art.brass);
    }
  }
  const ripple = new T.Group(); root.add(ripple);
  for (let i = 0; i < 18; i++) {
    const line = art.box(ripple, 2.5 + (i % 4) * 1.65, -0.65, -3.9 + Math.floor(i / 4) * 2.3, 0.75 + (i % 3) * 0.15, 0.014, 0.065, blue, 0.005);
    line.castShadow = false;
  }
  for (let i = 0; i < 9; i++) {
    const hill = art.mesh(new T.ConeGeometry(2.7 + i % 2, 3 + i % 3, 7), edge, scenery, -12 + i * 3.6, 1.9, -5.5);
    hill.scale.z = 0.5;
  }
  for (const x of [-12.6, -2.1, 13.8]) {
    for (let row = 0; row < 5; row++) art.box(scenery, x, 0.7 + row * 0.65, -2.2, 1.15, 0.61, 1.2, stone);
    art.box(scenery, x, 3.9, -2.2, 1.35, 0.35, 1.4, edge);
    for (const dx of [-0.4, 0.4]) art.box(scenery, x + dx, 4.25, -2.2, 0.4, 0.4, 1.4, stone);
  }
  // Brass-edged control station, connected to the winch by a visible shaft.
  art.box(scenery, -7.25, 6.6, -0.08, 10.2, 9.7, 0.5, art.dark);
  art.box(scenery, -7.25, 6.6, 0.23, 9.7, 9.2, 0.15, surfaces.wood(0x314f57));
  for (const x of [-12.25, -2.25]) art.box(scenery, x, 6.6, 0.3, 0.13, 9.7, 0.22, art.brass);
  for (const y of [1.8, 11.4]) art.box(scenery, -7.25, y, 0.3, 10.2, 0.14, 0.22, art.brass);
  for (const x of [-12, -2.5]) for (const y of [2.05, 11.12]) art.screw(scenery, x, y, 0.44);
  art.rod(scenery, new T.Vector3(-2.2, 2.0, 0.4), new T.Vector3(1.25, 2.0, 0.4), 0.09, art.steel);
  art.rod(scenery, new T.Vector3(1.25, 2, 0.4), new T.Vector3(1.25, 1.1, 1.3), 0.09, art.steel);
  const lamps = [0, 1].map(i => {
    art.torus(scenery, -8.4 + i * 2.25, 2.24, 0.51, 0.13, 0.04);
    return art.mesh(new T.SphereGeometry(0.1, 12, 8), art.dark, root, -8.4 + i * 2.25, 2.24, 0.54);
  });
  art.label(scenery, 'ANCHOR', -9.35, 2.25, 0.54, 1.0, 0.21);
  art.label(scenery, 'CABLE', -7.1, 2.25, 0.54, 0.85, 0.21);
  // Every coordinate tick is modeled from the authored bounds, not a decorative grid.
  for (let n = coordinateDefinition.min; n <= coordinateDefinition.max; n++) {
    const p = carriagePoint(coordinateDefinition, { x: n, y: n });
    art.box(coordinate, p[0], 6.85, 0.43, n === 0 ? 0.032 : 0.014, 7.5, 0.018, n === 0 ? art.brass : art.trim, 0.004);
    art.box(coordinate, -7.25, p[1], 0.43, 7.5, n === 0 ? 0.032 : 0.014, 0.018, n === 0 ? art.brass : art.trim, 0.004);
    art.label(coordinate, String(n), p[0], 2.77, 0.51, 0.27, 0.22);
    art.label(coordinate, String(n), -11.36, p[1], 0.51, 0.3, 0.24);
  }
  art.label(coordinate, 'X', -3.05, 2.8, 0.51, 0.28, 0.3);
  art.label(coordinate, 'Y', -11.4, 10.98, 0.51, 0.28, 0.3);
  const xRail = art.box(coordinate, -11, 6.85, 0.65, 0.11, 7.65, 0.12, art.steel);
  const yRail = art.box(coordinate, -7.25, 3.1, 0.73, 7.65, 0.11, 0.12, art.steel);
  const carriage = new T.Group(); coordinate.add(carriage);
  art.box(carriage, 0, 0, 0, 0.55, 0.55, 0.18, art.brass);
  art.torus(carriage, 0, 0, 0.13, 0.22, 0.055, art.steel);
  art.box(carriage, 0, 0, 0.14, 0.45, 0.023, 0.03, art.dark);
  art.box(carriage, 0, 0, 0.14, 0.023, 0.45, 0.03, art.dark);
  const wheel = (x: number, y: number) => {
    const group = new T.Group(); group.position.set(x, y, 0.66); coordinate.add(group);
    art.torus(group, 0, 0, 0, 0.29, 0.05);
    for (const a of [0, Math.PI / 3, 2 * Math.PI / 3]) {
      const bar = art.box(group, 0, 0, 0, 0.58, 0.04, 0.055, art.steel); bar.rotation.z = a;
    }
    art.rod(group, new T.Vector3(0.25, 0, 0), new T.Vector3(0.25, 0, 0.17), 0.07, art.dark);
    batchMetalwork(art, group); return group;
  };
  const xWheel = wheel(-11, 2.36), yWheel = wheel(-11.92, 3.1);
  // A separate face of the same station fits the authored cable route uniformly.
  const anchors = cablePoints(cableDefinition);
  anchors.forEach((p, i) => {
    art.torus(cable, ...p, i === 0 || i === anchors.length - 1 ? 0.19 : 0.25, 0.05);
    art.label(cable, String.fromCharCode(65 + i), p[0], p[1] + 0.46, 0.91, 0.35, 0.3);
  });
  const routeLine = (a: readonly number[], b: readonly number[]) => {
    for (let j = 0; j < 12; j++) {
      const start = vector(a).lerp(vector(b), j / 12), end = vector(a).lerp(vector(b), (j + 0.55) / 12);
      art.rod(cable, start, end, 0.018, blue);
    }
  };
  anchors.slice(1).forEach((p, i) => {
    routeLine(anchors[i], p);
    if (cableDefinition.mode === 'route') {
      const a = cableDefinition.route[i], b = cableDefinition.route[i + 1];
      art.label(cable, `${Math.hypot(a.x - b.x, a.y - b.y)} u`, (p[0] + anchors[i][0]) / 2 + (a.x === b.x ? 0.53 : 0), (p[1] + anchors[i][1]) / 2 - (a.y === b.y ? 0.48 : 0), 0.92, 1.05, 0.36);
    }
  });
  if (cableDefinition.mode === 'diagonal') {
    const [a, b] = anchors, corner = [b[0], a[1], a[2]];
    routeLine(a, corner); routeLine(corner, b);
    const [p, q] = cableDefinition.route;
    art.label(cable, `${Math.abs(q.x - p.x)} u`, (a[0] + b[0]) / 2, a[1] - 0.48, 0.92, 1.0, 0.35);
    art.label(cable, `${Math.abs(q.y - p.y)} u`, b[0] + 0.5, (a[1] + b[1]) / 2, 0.92, 0.85, 0.35);
  }
  art.label(cable, `1 u = ${cableDefinition.scale} ${cableDefinition.unit}`, -7.25, 10.72, 0.65, 3.3, 0.4);
  const cableSegments = Array.from({ length: 60 }, () => art.cylinder(cable, 0, 0, 0, 0.045, 1, art.rope));
  const hook = new T.Group(); cable.add(hook);
  art.mesh(new T.TorusGeometry(0.13, 0.043, 8, 20, Math.PI * 1.6), art.steel, hook);
  // Seven-unit drawbridge, real hinges, wood planks, side rails, and a drum-driven hoist.
  const deck = new T.Group(); deck.position.set(2, 0.8, 3.4); root.add(deck);
  for (let i = 0; i < 14; i++) art.box(deck, 0.25 + i * 0.5, 0, 0, 0.47, 0.24, 4.0, wood);
  for (const z of [-1.7, 1.7]) {
    art.box(deck, 3.5, -0.2, z, 7.0, 0.23, 0.2, art.dark);
    art.box(deck, 3.5, 0.95, z, 7, 0.12, 0.13, wood);
    for (let x = 0.15; x <= 7; x += 1.12) {
      art.box(deck, x, 0.45, z, 0.13, 1, 0.13, art.dark);
      art.screw(deck, x, 0.03, z + 0.09);
    }
  }
  const drum = new T.Group(); drum.position.set(1.35, 1.36, 1.35); root.add(drum);
  for (const z of [-0.28, 0.28]) art.torus(drum, 0, 0, z, 0.36, 0.07);
  for (let i = 0; i < 7; i++) art.torus(drum, 0, 0, -0.23 + i * 0.076, 0.27, 0.038, art.rope);
  art.box(scenery, 1.35, 1.04, 1.35, 0.95, 0.24, 1.0, art.dark);
  const pin = art.box(root, 1.35, 1.76, 1.35, 0.12, 0.65, 0.12, art.steel);
  const hoists = [1.7, 5.1].map(z => art.rod(root, new T.Vector3(1.75, 3.0, z), new T.Vector3(9, 0.85, z), 0.045, art.rope));
  // Cage is an existing rescue group's holding enclosure; the gate faces the bridge.
  const gate = new T.Group(); gate.position.set(1.1, 0.92, 3.55); root.add(gate);
  for (const x of [-2, 1.1]) for (const z of [1.85, 5.3]) art.box(scenery, x, 2.38, z, 0.15, 3.1, 0.15, art.dark);
  for (const z of [1.85, 5.3]) {
    art.box(scenery, -0.45, 3.93, z, 3.4, 0.18, 0.2, wood);
    for (let x = -1.8; x < 1; x += 0.42) art.box(scenery, x, 2.37, z, 0.042, 2.95, 0.042, art.steel);
  }
  for (const y of [0.07, 2.82]) art.box(gate, 0, y, 0, 0.15, 0.13, 3.5, art.brass);
  for (let z = -1.5; z <= 1.5; z += 0.38) art.box(gate, 0, 1.46, z, 0.055, 2.8, 0.055, art.steel);
  for (const z of [1.8, 5.3]) art.box(scenery, 1.1, 3.4, z, 0.13, 5.1, 0.13, art.dark);
  const bolt = art.box(root, 1.12, 1.75, 5.46, 0.13, 0.13, 0.8, art.brass);
  const trip = art.rod(root, new T.Vector3(1.9, 0.8, 5.6), new T.Vector3(1.12, 1.75, 5.6), 0.055, art.steel);
  const rabbits = Array.from({ length: d.presentation?.rabbits ?? 6 }, (_, i) => {
    const rabbit = createRabbit(art, art.material({ color: [0xc9b89a, 0xe2d5bc, 0x8c877f][i % 3], roughness: 0.95 }), i);
    rabbit.root.scale.multiplyScalar(0.68); root.add(rabbit.root); return rabbit;
  });
  for (const x of [-11.7, 10.5, 14.1]) for (let i = 0; i < 6; i++) {
    const stem = art.box(scenery, x + (i % 2) * 0.28, 0.94, -0.9 + Math.floor(i / 2) * 0.24, 0.035, 0.5, 0.035, grass);
    stem.rotation.z = (i - 2) * 0.1;
    art.mesh(new T.SphereGeometry(0.065, 8, 6), i % 2 ? art.glow : art.brass, scenery, stem.position.x, 1.2, stem.position.z);
  }
  batchMetalwork(art, scenery); batchMetalwork(art, deck); batchMetalwork(art, gate); batchMetalwork(art, drum); batchMetalwork(art, carriage);
  return { root, coordinate, cable, carriage, xRail, yRail, xWheel, yWheel, deck, gate, bolt, pin, drum, hoists, trip, cableSegments, hook, rabbits, lamps, ripple };
}

export function positionBridgeDiorama(art: BalanceMetalwork, model: BridgeDiorama, d: MachineDefinition,
  answers: readonly StageAnswer[], active: number, time: number, age: number, preview?: Point) {
  const [coordinate, cable] = bridgeParts(d), a = answers[0], b = answers[1];
  const position = preview ?? (a.kind === 'coordinate' ? a : { x: 0, y: 0 }), p = carriagePoint(coordinate, position);
  model.coordinate.visible = active === 0; model.cable.visible = active === 1;
  model.carriage.position.set(...p); model.xRail.position.x = p[0]; model.yRail.position.y = p[1];
  model.xWheel.position.x = p[0]; model.yWheel.position.y = p[1];
  model.xWheel.rotation.z = -position.x * Math.PI / 2; model.yWheel.rotation.z = position.y * Math.PI / 2;
  const fitted = fittedCable(cable, b.kind === 'cable' ? b.cable : -1);
  model.cableSegments.forEach((segment, i) => {
    segment.visible = i + 1 < fitted.points.length;
    if (segment.visible) art.positionRod(segment, vector(fitted.points[i]), vector(fitted.points[i + 1]));
    segment.material = fitted.state === 'taut' ? art.glow : art.rope;
  });
  model.hook.visible = fitted.points.length > 0;
  if (model.hook.visible) model.hook.position.copy(vector(fitted.points.at(-1)!));
  model.lamps.forEach((lamp, i) => lamp.material = machineReading(d.stages[i], answers[i]).solved ? art.glow : art.dark);
  const release = bridgeRelease(time);
  model.deck.rotation.z = (1 - release.deck) * 1.24;
  model.deck.updateMatrixWorld(true);
  model.hoists.forEach((rope, i) => {
    const end = model.deck.localToWorld(new T.Vector3(6.8, 0.28, i ? 1.7 : -1.7));
    art.positionRod(rope, new T.Vector3(1.75, 3, i ? 5.1 : 1.7), end);
  });
  model.gate.position.y = 0.92 + release.gate * 3.15;
  model.bolt.position.z = 5.46 + release.bolt * 0.72;
  model.pin.position.y = 1.76 + release.pin * 0.65;
  model.drum.rotation.z = -release.deck * Math.PI * 3;
  model.trip.rotation.z = -release.bolt * 0.4;
  model.ripple.position.z = Math.sin(age * 0.45) * 0.18;
  let escaped = 0;
  model.rabbits.forEach((rig, i) => {
    const pose = crossingRabbit(i, time, age);
    // Two rows within the enclosure merge into three bridge lanes.
    rig.root.position.set(pose.x - (pose.progress === 0 && i >= 3 ? 0.5 : 0), pose.y, pose.z);
    rig.root.rotation.y = pose.yaw; rig.body.rotation.x = pose.pitch;
    rig.head.rotation.y = pose.progress === 0 ? Math.sin(age * 0.7 + i) * 0.12 : 0;
    rig.ears.forEach(ear => ear.rotation.x = pose.ear);
    rig.legs.forEach((leg, j) => leg.rotation.x = pose.leg * (j < 2 ? -1 : 1));
    if (pose.escaped) escaped++;
  });
  return { fitted, release, escaped };
}
