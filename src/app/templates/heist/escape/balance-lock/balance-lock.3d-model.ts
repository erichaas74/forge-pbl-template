import * as T from 'three';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import {
  formatPiece,
  scaleOffset,
  usesPiston,
  pistonMassLabel,
  type BalanceLockDefinition,
} from './balance-lock.domain';

export const STATION = {
  center: -0.94,
  half: 0.94,
  beam: 2.8,
  pan: 1.72,
  axis: -0.68,
  pin: 0,
  left: -1.88,
  right: 0,
  spacing: 2.75,
  panRadius: 0.42,
};
export interface PinModel {
  root: T.Group;
  pin: T.Group;
  rope: T.Group;
  indicator: T.Mesh;
  ropeLength: number;
}

function suspendedPin(
  art: BalanceMetalwork,
  parent: T.Object3D,
  x: number,
  number: number,
  counterweight?: string,
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
  pin.name = `hanging-piston-${number}`;
  root.add(pin);
  for (const sign of [-1, 1]) {
    art.cylinder(pin, 0, sign * 0.548, 0.12, counterweight ? 0.31 : 0.26, 0.8);
    const rim = art.torus(pin, 0, sign * 0.158, 0.12, counterweight ? 0.294 : 0.244, 0.019);
    rim.rotation.x = Math.PI / 2;
  }
  // The back of the pin connects the two brass ends; its front cutout clears the bolt.
  art.box(pin, 0, 0, -0.1, 0.24, 0.32, 0.055, art.brass, 0.01);
  art.torus(pin, 0, 1.035, 0.12, 0.079, 0.026);
  if (counterweight) {
    art.box(pin, 0, 0.61, 0.415, 0.54, 0.4, 0.04, art.dark, 0.025);
    art.label(pin, 'MASS', 0, 0.745, 0.439, 0.28, 0.065, '#b2c8c5');
    art.label(pin, counterweight, 0, 0.575, 0.444, 0.49, 0.2, '#ffe1a1');
  }
  const rope = new T.Group();
  root.add(rope);
  const length = (counterweight ? STATION.beam : STATION.pan - 0.04) - (STATION.axis + 1.14);
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
  return { root, pin, rope, indicator, ropeLength: length };
}

function lockFrame(art: BalanceMetalwork, parent: T.Object3D, xs: readonly number[]) {
  const left = xs[0] + STATION.left - 0.6,
    right = xs[xs.length - 1] + 0.78,
    width = right - left;
  const housing = new T.Group();
  housing.name = 'shared-lock-housing';
  parent.add(housing);
  art.box(
    housing,
    (left + right) / 2,
    STATION.axis,
    -0.35,
    width + 0.12,
    2.93,
    0.4,
    art.trim,
    0.12,
  );
  for (const y of [0.72, -2.08]) {
    art.box(housing, (left + right) / 2, y, 0, width, 0.18, 0.4, art.steel);
    for (const x of [left + 0.16, right - 0.16]) art.screw(housing, x, y, 0.23);
  }
  const latchX = right + 0.33;
  art.box(parent, latchX, STATION.axis, -0.12, 0.4, 0.8, 0.58, art.steel);
  art.box(parent, latchX - 0.04, STATION.axis, 0.184, 0.3, 0.26, 0.05, art.dark, 0.01);
  for (const y of [STATION.axis + 0.31, STATION.axis - 0.31]) art.screw(parent, latchX, y, 0.19);
  const bolt = new T.Group();
  bolt.name = 'shared-sliding-bolt';
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
  return { bolt, housing, left, right: latchX + 0.25 };
}

function pan(art: BalanceMetalwork, parent: T.Object3D, side: number) {
  const group = new T.Group();
  group.userData['side'] = side;
  parent.add(group);
  const dish = art.mesh(
    new T.CylinderGeometry(STATION.panRadius, 0.34, 0.09, 48),
    art.brass,
    group,
  );
  dish.userData['side'] = side;
  const rim = art.torus(group, 0, 0.045, 0, 0.407, 0.02);
  rim.rotation.x = Math.PI / 2;
  const inner = art.cylinder(group, 0, 0.05, 0, 0.365, 0.017, art.trim);
  inner.userData['side'] = side;
  return group;
}

/** Every scale feeds a pin in the same housing; there are no inspection copies. */
export function createBalanceStage(art: BalanceMetalwork, lock: BalanceLockDefinition) {
  const piston = usesPiston(lock);
  const root = new T.Group();
  root.name = 'integrated-balance-lock';
  const pinXs = lock.scales.map((_, i) => (i - (lock.scales.length - 1) / 2) * STATION.spacing);
  const frame = lockFrame(art, root, pinXs);
  const scales = pinXs.map((x, index) => {
    const group = new T.Group();
    group.name = `scale-${index + 1}`;
    group.userData['scale'] = index;
    group.position.x = x;
    root.add(group);
    const beam = new T.Group();
    beam.position.set(STATION.center, STATION.beam, 0);
    group.add(beam);
    art.box(beam, 0, 0, 0, STATION.half * 2 + 0.12, 0.12, 0.18, art.brass, 0.035);
    for (const dx of [-0.72, -0.37, 0.37, 0.72]) art.screw(beam, dx, 0, 0.105);
    // All three uprights are bolted directly into the common lock body.
    art.box(group, STATION.center, 1.77, -0.13, 0.14, 2.05, 0.25, art.brass);
    art.box(group, STATION.center, 0.85, -0.1, 0.48, 0.15, 0.5, art.brass);
    for (const dx of [-0.17, 0.17]) art.screw(group, STATION.center + dx, 0.84, 0.17);
    const hub = art.cylinder(group, STATION.center, STATION.beam, 0.1, 0.16, 0.23);
    hub.rotation.x = Math.PI / 2;
    const focusRing = art.torus(group, STATION.center, STATION.beam, 0.23, 0.105, 0.026, art.steel);
    art.label(group, String(index + 1), STATION.center, 3.22, 0.1, 0.26, 0.2, '#e8d5ad');
    const pans = piston ? [pan(art, group, 2)] : [pan(art, group, 1), pan(art, group, 2)];
    const chains = pans.map(() =>
      [-1, 1].map(() => art.rod(group, new T.Vector3(), new T.Vector3(0, 1, 0), 0.012)),
    );
    const connector = piston
      ? art.rod(group, new T.Vector3(), new T.Vector3(0, 0.1, 0), 0.035, art.steel)
      : undefined;
    const suspension = piston
      ? art.torus(group, 0, STATION.beam, 0.12, 0.048, 0.015, art.steel)
      : undefined;
    // Engraved bay plates repeat the scale numbers on the one continuous casing.
    art.box(group, STATION.center - 0.1, -1.45, -0.09, 0.84, 0.56, 0.08, art.dark);
    art.label(
      group,
      `SCALE ${index + 1}`,
      STATION.center - 0.1,
      -1.45,
      -0.035,
      0.64,
      0.16,
      '#c5bd9d',
    );
    for (const y of [-0.31, -1.04]) {
      art.box(group, STATION.center - 0.16, y, -0.06, 0.72, 0.045, 0.035, art.brass, 0.01);
    }
    return { root: group, beam, pans, chains, focusRing, connector, suspension };
  });
  const pins = pinXs.map((x, i) => {
    const pin = suspendedPin(art, root, x, i + 1, piston ? pistonMassLabel(lock, i) : undefined);
    pin.root.userData['scale'] = i;
    return pin;
  });
  const center = (frame.left + frame.right) / 2;
  const width = frame.right - frame.left + 0.7;
  const floor = art.box(root, center, -2.28, -0.18, width, 0.14, 2.1, art.dark, 0.04);
  floor.receiveShadow = true;
  return { root, scales, pins, masterBolt: frame.bolt, housing: frame.housing, center, width };
}
export type BalanceStage = ReturnType<typeof createBalanceStage>;

export function positionBalanceStage(
  stage: BalanceStage,
  art: BalanceMetalwork,
  offsets: readonly number[],
  active: number,
  release: number,
): void {
  stage.scales.forEach((scale, index) => {
    const shift = -offsets[index] / 65;
    scale.beam.rotation.z = Math.asin(shift / STATION.half);
    scale.focusRing.material = index === active ? art.glow : art.steel;
    for (const [i, pan] of scale.pans.entries()) {
      const side = i === 0 ? -1 : 1;
      pan.position.set(i === 0 ? STATION.left : STATION.right, STATION.pan + side * shift, 0);
      const start = new T.Vector3(
        STATION.center + side * Math.cos(scale.beam.rotation.z) * STATION.half,
        STATION.beam + side * shift,
        0,
      );
      for (const [j, chain] of scale.chains[i].entries())
        art.positionRod(
          chain,
          start,
          new T.Vector3(pan.position.x + (j === 0 ? -0.35 : 0.35), pan.position.y + 0.05, 0.04),
        );
    }
    if (scale.connector && scale.suspension) {
      const endY = STATION.beam + shift;
      // The short sliding clevis lets the rope stay on the piston's vertical guide axis.
      art.positionRod(
        scale.connector,
        new T.Vector3(
          STATION.center + Math.cos(scale.beam.rotation.z) * STATION.half - 0.035,
          endY,
          0.12,
        ),
        new T.Vector3(0.025, endY, 0.12),
      );
      scale.suspension.position.y = endY;
    }
    const pin = stage.pins[index];
    pin.pin.position.y = STATION.axis + shift;
    pin.rope.position.y = STATION.axis + 1.14 + shift;
    pin.indicator.material = Math.abs(shift) < 0.002 ? art.glow : art.dark;
  });
  stage.masterBolt.position.x = -release * 0.65;
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
    ...(usesPiston(lock) ? [] : scale.left.map((piece) => ({ piece, index: -1, fixed: 1 }))),
    ...(usesPiston(lock) ? [] : scale.right.map((piece) => ({ piece, index: -1, fixed: 2 }))),
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
