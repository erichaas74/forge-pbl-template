import * as T from 'three';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import { batchMetalwork } from '../timing-cage/timing-cage.batch';
import { owlMotion } from './optics-cage.motion';

export interface TowerOwl {
  root: T.Group;
  head: T.Group;
  wings: T.Group[];
  eyes: T.Group[];
  feet: T.Group;
}

/** Original articulated geometry: individual feather layers, hinged wings and grasping talons. */
export function createTowerOwl(art: BalanceMetalwork, index: number): TowerOwl {
  const root = new T.Group(),
    head = new T.Group(),
    feet = new T.Group();
  const feather = art.material({ color: index ? 0x8a6954 : 0x536270, roughness: 0.92 });
  const dark = art.material({ color: index ? 0x513f34 : 0x303f50, roughness: 0.86 });
  const cream = art.material({ color: index ? 0xe7d4ae : 0xe4e7dc, roughness: 0.95 });
  const amber = art.material({ color: 0xe9b75c, roughness: 0.36 });
  const pupil = art.material({ color: 0x101c28, roughness: 0.08 });
  const ellipsoid = (
    parent: T.Object3D,
    material: T.MeshStandardMaterial,
    x: number,
    y: number,
    z: number,
    sx: number,
    sy: number,
    sz: number,
  ) => {
    const mesh = art.mesh(new T.SphereGeometry(1, 20, 14), material, parent, x, y, z);
    mesh.scale.set(sx, sy, sz);
    return mesh;
  };
  ellipsoid(root, feather, 0, 0.8, 0, 0.49, 0.63, 0.36);
  ellipsoid(root, cream, 0, 0.76, 0.22, 0.37, 0.48, 0.2);
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 3; col++) {
      const x = (col - 1) * 0.18 + (row % 2 ? 0.025 : -0.025);
      const f = ellipsoid(
        root,
        feather,
        x,
        0.45 + row * 0.16,
        0.393 - Math.abs(x) * 0.12,
        0.035,
        0.072,
        0.015,
      );
      f.rotation.z = x * 0.6;
    }
  ellipsoid(root, dark, 0, 0.35, -0.28, 0.24, 0.42, 0.1).rotation.x = -0.45;
  head.position.set(0, 1.39, 0.02);
  root.add(head);
  ellipsoid(head, feather, 0, 0, 0, 0.57, 0.46, 0.39);
  const eyes: T.Group[] = [];
  for (const side of [-1, 1]) {
    const disc = ellipsoid(head, dark, side * 0.235, 0.0, 0.28, 0.294, 0.315, 0.13);
    disc.rotation.z = side * 0.14;
    ellipsoid(head, cream, side * 0.235, 0, 0.34, 0.258, 0.273, 0.09);
    const eye = new T.Group();
    eye.position.set(side * 0.235, 0.025, 0.422);
    head.add(eye);
    ellipsoid(eye, amber, 0, 0, 0, 0.135, 0.15, 0.055);
    ellipsoid(eye, pupil, 0, 0, 0.043, 0.075, 0.103, 0.034);
    ellipsoid(eye, cream, -0.026, 0.043, 0.072, 0.025, 0.026, 0.014);
    eyes.push(eye);
    const tuft = art.mesh(
      new T.ConeGeometry(0.13, 0.42, 12),
      feather,
      head,
      side * 0.4,
      0.37,
      -0.035,
    );
    tuft.rotation.z = side * -0.31;
    const brow = ellipsoid(head, feather, side * 0.23, 0.24, 0.395, 0.25, 0.06, 0.07);
    brow.rotation.z = side * 0.12;
  }
  const beak = art.mesh(new T.ConeGeometry(0.105, 0.27, 12), amber, head, 0, -0.16, 0.435);
  beak.rotation.z = Math.PI;
  beak.rotation.x = 0.2;
  root.add(feet);
  for (const side of [-1, 1]) {
    art.cylinder(feet, side * 0.19, 0.19, 0.1, 0.055, 0.29, amber);
    for (let toe = -1; toe <= 1; toe++) {
      art.rod(
        feet,
        new T.Vector3(side * 0.19, 0.08, 0.07),
        new T.Vector3(side * 0.19 + toe * 0.075, 0.035, 0.31),
        0.022,
        amber,
      );
      const claw = art.mesh(
        new T.ConeGeometry(0.026, 0.1, 8),
        pupil,
        feet,
        side * 0.19 + toe * 0.075,
        0.019,
        0.32,
      );
      claw.rotation.x = 0.9;
    }
  }
  const wings = [-1, 1].map((side) => {
    const wing = new T.Group();
    wing.position.set(side * 0.34, 1.04, -0.035);
    root.add(wing);
    const shape = new T.Group();
    shape.scale.x = side;
    wing.add(shape);
    ellipsoid(shape, feather, 0.42, -0.04, 0, 0.58, 0.24, 0.115).rotation.z = -0.14;
    for (let i = 0; i < 7; i++) {
      const f = ellipsoid(
        shape,
        i % 2 ? feather : dark,
        0.51 + i * 0.115,
        -0.11 - i * 0.021,
        -0.01,
        0.44 - i * 0.019,
        0.094,
        0.046,
      );
      f.rotation.z = -0.42 - i * 0.105;
      const tip = ellipsoid(
        shape,
        cream,
        0.74 + i * 0.095,
        -0.28 - i * 0.04,
        0.035,
        0.055,
        0.04,
        0.015,
      );
      tip.rotation.z = -0.55;
    }
    batchMetalwork(art, shape);
    return wing;
  });
  batchMetalwork(art, root);
  batchMetalwork(art, head);
  batchMetalwork(art, feet);
  eyes.forEach((eye) => batchMetalwork(art, eye));
  return { root, head, wings, eyes, feet };
}

export function poseTowerOwl(owl: TowerOwl, index: number, time: number, idle: number): boolean {
  const pose = owlMotion(index, time, idle);
  owl.root.position.set(pose.x, pose.y, pose.z);
  owl.root.rotation.set(pose.pitch, pose.yaw, 0);
  owl.head.rotation.y = pose.head;
  owl.wings[0].rotation.z = pose.wing;
  owl.wings[1].rotation.z = -pose.wing;
  owl.feet.position.y = pose.tuck * 0.16;
  owl.feet.rotation.x = -pose.tuck * 0.8;
  owl.eyes.forEach((eye) => {
    eye.scale.y = pose.blink;
  });
  return pose.escaped;
}
