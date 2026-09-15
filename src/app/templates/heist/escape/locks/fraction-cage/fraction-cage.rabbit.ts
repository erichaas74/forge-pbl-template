import * as T from 'three';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import { batchMetalwork } from '../timing-cage/timing-cage.batch';
import { rabbitMotion } from './fraction-cage.motion';

export interface RabbitRig {
  root: T.Group;
  body: T.Group;
  head: T.Group;
  ears: T.Group[];
  legs: T.Group[];
}

/** Original rounded, articulated rabbit. Geometry and resources belong to the scene's art owner. */
export function createRabbit(
  art: BalanceMetalwork,
  fur: T.MeshStandardMaterial,
  index: number,
): RabbitRig {
  const root = new T.Group(),
    body = new T.Group(),
    head = new T.Group();
  root.name = `rabbit-${index + 1}`;
  root.add(body);
  body.add(head);
  head.position.set(0, 0.86, 0.32);
  const cream = art.material({ color: 0xf6edda, roughness: 0.96 });
  const pink = art.material({ color: 0xd99d99, roughness: 0.9 });
  const eyes = art.material({ color: 0x171e24, roughness: 0.12 });
  const glint = art.material({ color: 0xffffff, emissive: 0x8b9b9a, emissiveIntensity: 0.4 });
  const ellipsoid = (
    p: T.Group,
    x: number,
    y: number,
    z: number,
    a: number,
    b: number,
    c: number,
    m = fur,
  ) => {
    const mesh = art.mesh(new T.SphereGeometry(1, 18, 12), m, p, x, y, z);
    mesh.scale.set(a, b, c);
    return mesh;
  };
  ellipsoid(body, 0, 0.55, -0.07, 0.35, 0.45, 0.49);
  ellipsoid(body, 0, 0.4, -0.35, 0.4, 0.38, 0.31);
  ellipsoid(body, 0, 0.59, -0.62, 0.17, 0.18, 0.17, cream);
  ellipsoid(body, 0, 0.5, 0.34, 0.25, 0.31, 0.15, cream);
  ellipsoid(head, 0, 0, 0, 0.29, 0.3, 0.29);
  for (const side of [-1, 1]) {
    ellipsoid(head, side * 0.104, -0.09, 0.236, 0.132, 0.103, 0.112, cream);
    ellipsoid(head, side * 0.225, 0.052, 0.19, 0.054, 0.068, 0.046, eyes);
    ellipsoid(head, side * 0.224, 0.077, 0.232, 0.019, 0.022, 0.013, glint);
  }
  ellipsoid(head, 0, -0.046, 0.342, 0.046, 0.034, 0.029, pink);
  const ears: T.Group[] = [];
  for (const side of [-1, 1]) {
    const ear = new T.Group();
    ear.position.set(side * 0.135, 0.205, -0.045);
    ear.rotation.z = side * -0.13;
    head.add(ear);
    ellipsoid(ear, 0, 0.285, 0, 0.098, 0.36, 0.084);
    ellipsoid(ear, 0, 0.3, 0.057, 0.055, 0.268, 0.03, pink);
    ears.push(ear);
    batchMetalwork(art, ear);
  }
  const legs: T.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const leg = new T.Group(),
      back = i > 1,
      side = i % 2 ? 1 : -1;
    leg.position.set(side * (back ? 0.28 : 0.2), back ? 0.26 : 0.31, back ? -0.31 : 0.25);
    body.add(leg);
    ellipsoid(leg, 0, -0.05, 0, back ? 0.17 : 0.085, back ? 0.2 : 0.19, 0.13);
    ellipsoid(leg, 0, -0.19, 0.095, back ? 0.13 : 0.082, 0.08, back ? 0.24 : 0.16, cream);
    legs.push(leg);
    batchMetalwork(art, leg);
  }
  batchMetalwork(art, head);
  batchMetalwork(art, body);
  const scale = [1, 0.91, 0.97, 0.92, 1.04, 0.95][index % 6];
  root.scale.setScalar(scale);
  return { root, body, head, ears, legs };
}

export function poseRabbit(
  rig: RabbitRig,
  index: number,
  time: number,
  idle: number,
  reduced: boolean,
): boolean {
  const pose = rabbitMotion(index, time, reduced ? 0 : idle);
  rig.root.position.set(pose.x, pose.y, pose.z);
  rig.root.rotation.y = pose.yaw;
  rig.body.rotation.x = pose.pitch;
  rig.body.scale.y = time === 0 && !reduced ? 1 + Math.sin(idle * 2 + index) * 0.018 : 1;
  rig.head.rotation.y = time === 0 && !reduced ? Math.sin(idle * 0.65 + index * 1.8) * 0.18 : 0;
  rig.ears.forEach((ear, i) => {
    ear.rotation.x = pose.ear * (i ? 0.8 : 1);
  });
  rig.legs.forEach((leg, i) => {
    leg.rotation.x = pose.leg * (i < 2 ? -1 : 1);
  });
  return pose.escaped;
}
