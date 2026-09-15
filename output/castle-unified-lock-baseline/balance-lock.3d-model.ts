import * as T from 'three';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import { formatPiece, scaleOffset, type BalanceLockDefinition } from './balance-lock.domain';

export const STATION = {
  center: -1.65,
  half: 1.65,
  beam: 2.15,
  pan: 1.02,
  axis: -0.68,
  pin: 0,
  left: -3.3,
  right: 0,
};
export interface PinModel {
  root: T.Group;
  pin: T.Group;
  rope: T.Group;
  indicator: T.Mesh;
}

function suspendedPin(
  art: BalanceMetalwork,
  parent: T.Object3D,
  x: number,
  number: number,
): PinModel {
  const root = new T.Group();
  root.position.x = x;
  parent.add(root);
  art.box(root, 0, STATION.axis, -0.16, 1.03, 2.5, 0.2, art.dark, 0.09);
  art.box(root, -0.61, STATION.axis, 0.02, 0.2, 2.63, 0.37, art.steel);
  art.box(root, 0.61, STATION.axis, 0.02, 0.2, 2.63, 0.37, art.steel);
  if (number) art.label(root, String(number), 0, -1.74, 0.04, 0.3, 0.14, '#9babb1');
  const indicator = art.box(root, 0.63, 0.79, 0.12, 0.07, 0.07, 0.06, art.dark);
  const pin = new T.Group();
  root.add(pin);
  for (const sign of [-1, 1]) {
    art.cylinder(pin, 0, sign * 0.548, 0.12, 0.26, 0.8);
    const rim = art.torus(pin, 0, sign * 0.158, 0.12, 0.244, 0.019);
    rim.rotation.x = Math.PI / 2;
  }
  // The back of the pin connects the two brass ends; its front cutout clears the bolt.
  art.box(pin, 0, 0, -0.1, 0.24, 0.32, 0.055, art.brass, 0.01);
  art.torus(pin, 0, 1.035, 0.12, 0.079, 0.026);
  const rope = new T.Group();
  root.add(rope);
  const length = STATION.pan - 0.04 - (STATION.axis + 1.14);
  art.cylinder(rope, 0, length / 2, 0.12, 0.021, length, art.rope);
  for (const phase of [0, Math.PI]) {
    const points: T.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const angle = (i / 96) * Math.PI * 26 + phase;
      points.push(
        new T.Vector3(Math.cos(angle) * 0.022, (i / 96) * length, 0.12 + Math.sin(angle) * 0.022),
      );
    }
    art.mesh(
      new T.TubeGeometry(new T.CatmullRomCurve3(points), 96, 0.006, 4, false),
      art.rope,
      rope,
    );
  }
  return { root, pin, rope, indicator };
}

function lockFrame(art: BalanceMetalwork, parent: T.Object3D, xs: readonly number[]) {
  const left = xs[0] - 0.78,
    right = xs[xs.length - 1] + 0.78,
    width = right - left;
  art.box(parent, (left + right) / 2, STATION.axis, -0.35, width + 0.12, 2.93, 0.4, art.trim, 0.12);
  for (const y of [0.72, -2.08]) {
    art.box(parent, (left + right) / 2, y, 0, width, 0.18, 0.4, art.steel);
    for (const x of [left + 0.16, right - 0.16]) art.screw(parent, x, y, 0.23);
  }
  const latchX = right + 0.33;
  art.box(parent, latchX, STATION.axis, -0.12, 0.4, 0.8, 0.58, art.steel);
  art.box(parent, latchX - 0.04, STATION.axis, 0.184, 0.3, 0.26, 0.05, art.dark, 0.01);
  for (const y of [STATION.axis + 0.31, STATION.axis - 0.31]) art.screw(parent, latchX, y, 0.19);
  const bolt = new T.Group();
  parent.add(bolt);
  const boltLeft = left - 0.3,
    boltRight = latchX + 0.06;
  art.box(
    bolt,
    (boltLeft + boltRight) / 2,
    STATION.axis,
    0.24,
    boltRight - boltLeft,
    0.18,
    0.16,
    art.steel,
    0.035,
  );
  art.box(bolt, boltLeft + 0.07, STATION.axis, 0.24, 0.1, 0.3, 0.24, art.trim);
  return bolt;
}

function pan(art: BalanceMetalwork, parent: T.Object3D, side: number) {
  const group = new T.Group();
  group.userData['side'] = side;
  parent.add(group);
  const dish = art.mesh(new T.CylinderGeometry(0.6, 0.48, 0.11, 48), art.brass, group);
  dish.userData['side'] = side;
  const rim = art.torus(group, 0, 0.055, 0, 0.577, 0.026);
  rim.rotation.x = Math.PI / 2;
  const inner = art.cylinder(group, 0, 0.06, 0, 0.52, 0.017, art.trim);
  inner.userData['side'] = side;
  return group;
}

export function createBalanceStage(art: BalanceMetalwork, lock: BalanceLockDefinition) {
  const working = new T.Group(),
    overview = new T.Group();
  const beam = new T.Group();
  beam.position.set(STATION.center, STATION.beam, 0);
  working.add(beam);
  art.box(beam, 0, 0, 0, 3.43, 0.16, 0.2, art.brass, 0.04);
  for (const x of [-1.3, -0.85, -0.4, 0.4, 0.85, 1.3]) art.screw(beam, x, 0, 0.12);
  art.box(working, STATION.center, 0.78, -0.08, 0.18, 2.63, 0.28, art.brass);
  art.box(working, STATION.center, -0.56, -0.04, 1.08, 0.15, 0.75, art.brass, 0.05);
  art.box(working, STATION.center, -0.7, -0.18, 1.48, 0.14, 0.99, art.dark);
  art.cylinder(working, STATION.center, -1.46, -0.18, 0.32, 1.46, art.trim);
  art.cylinder(working, STATION.center, -2.16, -0.18, 0.47, 0.12, art.brass);
  art.cylinder(working, STATION.center, -0.79, -0.18, 0.38, 0.1, art.brass);
  const hub = art.cylinder(working, STATION.center, STATION.beam, 0.16, 0.22, 0.24);
  hub.rotation.x = Math.PI / 2;
  art.torus(working, STATION.center, STATION.beam, 0.295, 0.15, 0.025, art.steel);
  const pans = [pan(art, working, 1), pan(art, working, 2)];
  const chains = [0, 1].map(() =>
    [-1, 1].map(() => art.rod(working, new T.Vector3(), new T.Vector3(0, 1, 0), 0.014)),
  );
  const activePin = suspendedPin(art, working, 0, 0);
  const activeBolt = lockFrame(art, working, [0]);
  const pinXs = lock.scales.map((_, i) => (i - (lock.scales.length - 1) / 2) * 1.48);
  const pins = pinXs.map((x, i) => suspendedPin(art, overview, x, i + 1));
  const masterBolt = lockFrame(art, overview, pinXs);
  const overheadRopes = pinXs.map((x) =>
    art.rod(overview, new T.Vector3(x, 0.86, 0.12), new T.Vector3(x, 2.23, 0.12), 0.02),
  );
  art.box(overview, 0, 2.32, -0.03, lock.scales.length * 1.48 + 0.25, 0.14, 0.25, art.trim);
  const floor = art.box(working, -1.3, -2.28, -0.18, 6.4, 0.14, 2.7, art.dark, 0.04);
  floor.receiveShadow = true;
  const feet = art.box(
    overview,
    0,
    -2.28,
    -0.18,
    lock.scales.length * 1.48 + 1.5,
    0.14,
    2.4,
    art.dark,
    0.04,
  );
  feet.receiveShadow = true;
  return {
    working,
    overview,
    beam,
    pans,
    chains,
    activePin,
    activeBolt,
    pins,
    masterBolt,
    overheadRopes,
  };
}
export type BalanceStage = ReturnType<typeof createBalanceStage>;

export function positionBalanceStage(
  stage: BalanceStage,
  art: BalanceMetalwork,
  offsets: readonly number[],
  active: number,
  release: number,
): void {
  const shifts = offsets.map((offset) => -offset / 65),
    shift = shifts[active];
  stage.beam.rotation.z = Math.asin(shift / STATION.half);
  for (const [i, pan] of stage.pans.entries()) {
    const side = i === 0 ? -1 : 1;
    pan.position.set(i === 0 ? STATION.left : STATION.right, STATION.pan + side * shift, 0);
    const start = new T.Vector3(
      STATION.center + side * Math.cos(stage.beam.rotation.z) * STATION.half,
      STATION.beam + side * shift,
      0,
    );
    for (const [j, chain] of stage.chains[i].entries())
      art.positionRod(
        chain,
        start,
        new T.Vector3(pan.position.x + (j === 0 ? -0.49 : 0.49), pan.position.y + 0.06, 0.04),
      );
  }
  const positionPin = (pin: PinModel, dy: number) => {
    pin.pin.position.y = STATION.axis + dy;
    pin.rope.position.y = STATION.axis + 1.14 + dy;
    pin.indicator.material = Math.abs(dy) < 0.002 ? art.glow : art.dark;
  };
  positionPin(stage.activePin, shift);
  stage.pins.forEach((pin, i) => {
    positionPin(pin, shifts[i]);
    art.positionRod(
      stage.overheadRopes[i],
      new T.Vector3(pin.root.position.x, STATION.pan - 0.04 + shifts[i], 0.12),
      new T.Vector3(pin.root.position.x, 2.26, 0.12),
    );
  });
  stage.activeBolt.position.x = stage.masterBolt.position.x = -release * 0.65;
}

export function createBalanceWeights(
  art: BalanceMetalwork,
  lock: BalanceLockDefinition,
  active: number,
  parent: T.Object3D,
) {
  const scale = lock.scales[active],
    offset = scaleOffset(lock, active);
  return [
    ...scale.left.map((piece) => ({ piece, index: -1, fixed: 1 })),
    ...scale.right.map((piece) => ({ piece, index: -1, fixed: 2 })),
    ...scale.pieces.map((piece, i) => ({ piece, index: offset + i, fixed: 0 })),
  ].map((definition) => {
    const root = new T.Group();
    parent.add(root);
    root.userData['weight'] = definition.fixed ? undefined : definition.index;
    art.mesh(new T.CylinderGeometry(0.205, 0.26, 0.39, 32), art.brass, root, 0, 0.24, 0);
    art.cylinder(root, 0, 0.055, 0, 0.27, 0.07);
    art.torus(root, 0, 0.48, 0, 0.083, 0.022);
    art.box(root, 0, 0.235, 0.238, 0.42, 0.25, 0.04, art.dark, 0.035);
    art.label(root, formatPiece(definition.piece), 0, 0.26, 0.266, 0.4, 0.18);
    if (definition.fixed) art.label(root, 'FIXED', 0, 0.12, 0.266, 0.22, 0.06, '#afd2cc');
    return { ...definition, root };
  });
}
