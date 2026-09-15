import * as T from 'three';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import { batchMetalwork } from '../../locks/timing-cage/timing-cage.batch';
import type { ReleaseModule } from '../gear-lock.domain';
import { smooth } from './gear-cage.motion';

export interface GearCageRelease {
  drum: T.Group;
  ball: T.Mesh;
  catch: T.Group;
  hammer: T.Group;
  peg: T.Group;
  weight: T.Group;
  dominoes: T.Group[];
  door: T.Group;
  latch: T.Group;
  weightCord: T.Mesh;
  dominoCord: T.Mesh;
  cageCord: T.Mesh;
  tripCord: T.Mesh;
  animals: T.Group;
  ballPath: T.Vector3[];
}
export function createGearRelease(art: BalanceMetalwork, root: T.Group): GearCageRelease {
  const wood = art.material({ color: 0x76563d, roughness: 0.87 });
  const blue = art.material({ color: 0x62928f, metalness: 0.52, roughness: 0.4 });
  // Output belt turns this marked drum. Its peg releases the ball catch only after calibration.
  const drum = new T.Group();
  drum.position.set(1.12, 7.8, 0.65);
  root.add(drum);
  const face = art.cylinder(drum, 0, 0, 0, 0.53, 0.3, art.brass);
  face.rotation.x = Math.PI / 2;
  art.torus(drum, 0, 0, 0.19, 0.47, 0.035, art.dark);
  art.box(drum, 0, 0.24, 0.23, 0.05, 0.42, 0.05, art.steel);
  art.screw(drum, 0, 0, 0.25);
  const catchArm = new T.Group();
  catchArm.position.set(1.92, 7.57, 0.8);
  root.add(catchArm);
  art.box(catchArm, 0, 0.12, 0, 0.12, 0.52, 0.16, blue);
  art.rod(root, new T.Vector3(1.42, 7.89, 0.8), new T.Vector3(1.92, 7.9, 0.8), 0.034, art.steel);
  const ballPath = [
    new T.Vector3(1.98, 7.66, 0.69),
    new T.Vector3(3.58, 7.28, 0.69),
    new T.Vector3(2.96, 6.7, 0.69),
    new T.Vector3(4.58, 6.18, 0.69),
  ];
  for (let i = 0; i < ballPath.length - 1; i++)
    for (const z of [0.52, 0.86]) {
      const a = ballPath[i].clone().add(new T.Vector3(0, -0.14, z - 0.69));
      const b = ballPath[i + 1].clone().add(new T.Vector3(0, -0.14, z - 0.69));
      art.rod(root, a, b, 0.038, art.brass);
    }
  for (const p of ballPath)
    art.rod(
      root,
      new T.Vector3(p.x, p.y - 0.14, 0.53),
      new T.Vector3(p.x, p.y - 0.14, 0.86),
      0.025,
      art.steel,
    );
  const ball = art.mesh(new T.SphereGeometry(0.15, 20, 12), art.steel, root);
  ball.position.copy(ballPath[0]);
  const hammer = new T.Group();
  hammer.position.set(5.02, 7.0, 0.7);
  root.add(hammer);
  art.box(hammer, 0, -0.49, 0, 0.13, 0.98, 0.15, wood);
  art.box(hammer, 0, -1, 0, 0.46, 0.3, 0.36, art.steel);
  art.screw(root, 5.02, 7.0, 0.93);
  const peg = new T.Group();
  peg.position.set(5.85, 6.17, 0.75);
  root.add(peg);
  art.box(peg, 0.15, 0, 0, 0.65, 0.13, 0.17, art.brass);
  art.box(root, 6.17, 6.17, 0.6, 0.17, 0.4, 0.36, art.dark);
  const weight = new T.Group();
  weight.position.set(6.23, 6.65, 0.65);
  root.add(weight);
  art.box(weight, 0, 0, 0, 0.72, 0.81, 0.57, wood, 0.07);
  for (const y of [-0.25, 0.25]) art.box(weight, 0, y, 0.31, 0.79, 0.1, 0.08, art.brass, 0.02);
  for (const x of [-0.27, 0.27]) for (const y of [-0.25, 0.25]) art.screw(weight, x, y, 0.37);
  art.torus(root, 6.48, 8.43, 0.65, 0.25, 0.046, art.brass);
  // Redirect the opposite end above and around the dominoes, so a falling weight pulls right.
  art.torus(root, 10.8, 8.43, 0.65, 0.25, 0.046, art.brass);
  art.torus(root, 10.8, 6.3, 0.65, 0.25, 0.046, art.brass);
  art.rod(root, new T.Vector3(6.48, 8.68, 0.65), new T.Vector3(10.8, 8.68, 0.65), 0.024);
  art.rod(root, new T.Vector3(11.05, 8.43, 0.65), new T.Vector3(11.05, 6.3, 0.65), 0.024);
  const weightCord = art.rod(
    root,
    new T.Vector3(6.23, 8.43, 0.65),
    new T.Vector3(6.23, 7.08, 0.65),
    0.024,
  );
  const dominoes: T.Group[] = [];
  art.box(root, 8.62, 5.13, 0.72, 3.9, 0.17, 0.85, wood, 0.05);
  for (let i = 0; i < 6; i++) {
    const domino = new T.Group();
    domino.position.set(7.15 + i * 0.52, 5.23, 0.7);
    root.add(domino);
    art.box(domino, 0, 0.46, 0, 0.15, 0.91, 0.35, i % 2 ? blue : art.brass, 0.025);
    art.screw(domino, 0, 0.6, 0.2);
    dominoes.push(domino);
  }
  const dominoCord = art.rod(
    root,
    new T.Vector3(10.8, 6.05, 0.65),
    new T.Vector3(7.15, 6.05, 0.7),
    0.024,
  );
  for (const x of [6.8, 10.6])
    art.rod(root, new T.Vector3(x, 5.1, 0.65), new T.Vector3(x, 4.52, -1), 0.09, art.trim);
  // A visible cable transfers the last domino's fall to the side-mounted cage bolt.
  art.rod(root, new T.Vector3(10.3, 5.6, 0.7), new T.Vector3(10.62, 5.6, 0.7), 0.055, art.brass);
  art.torus(root, 10.62, 5.4, 0.7, 0.2, 0.035, art.brass);
  const left = 4.03,
    right = 10.08,
    front = 2.0,
    back = -2.25,
    top = 4.43;
  art.box(root, 7.05, 0.25, -0.1, 6.4, 0.21, 4.62, wood, 0.065);
  for (const x of [left, right])
    for (const z of [front, back]) {
      art.box(root, x, 2.36, z, 0.2, 4.28, 0.2, art.dark, 0.03);
      art.mesh(new T.SphereGeometry(0.15, 12, 8), art.brass, root, x, 4.56, z);
    }
  for (const y of [0.42, top]) {
    for (const z of [back, front]) art.box(root, 7.05, y, z, 6.23, 0.15, 0.16, art.steel, 0.025);
    for (const x of [left, right]) art.box(root, x, y, -0.12, 0.15, 0.15, 4.4, art.steel, 0.025);
  }
  for (let i = 1; i < 11; i++)
    art.rod(
      root,
      new T.Vector3(left + i * 0.55, 0.43, back),
      new T.Vector3(left + i * 0.55, top, back),
      0.032,
      art.steel,
    );
  for (const x of [left, right])
    for (let i = 1; i < 8; i++)
      art.rod(
        root,
        new T.Vector3(x, 0.43, back + i * 0.53),
        new T.Vector3(x, top, back + i * 0.53),
        0.032,
        art.steel,
      );
  const door = new T.Group();
  door.name = 'fox-cage-door';
  door.position.set(4.14, 0.46, front);
  root.add(door);
  for (const y of [0, 3.78]) art.box(door, 2.9, y, 0, 5.8, 0.16, 0.17, art.brass, 0.025);
  for (let i = 0; i < 12; i++)
    art.rod(
      door,
      new T.Vector3(i * 0.526, 0, 0),
      new T.Vector3(i * 0.526, 3.78, 0),
      0.039,
      art.steel,
    );
  for (const y of [1.12, 3.4]) art.cylinder(root, 4.14, y, front, 0.14, 0.36, art.brass);
  const latch = new T.Group();
  latch.position.set(9.82, 2.51, 2.16);
  root.add(latch);
  art.box(latch, 0, 0, 0, 1.03, 0.15, 0.18, art.brass, 0.03);
  art.box(root, 10.13, 2.51, 2.13, 0.24, 0.38, 0.31, art.dark);
  const cageCord = art.rod(
    root,
    new T.Vector3(10.82, 5.4, 0.7),
    new T.Vector3(10.32, 2.51, 2.16),
    0.025,
  );
  const tripCord = art.rod(
    root,
    new T.Vector3(9.75, 6.05, 0.7),
    new T.Vector3(10.62, 5.6, 0.7),
    0.024,
  );
  // A tension spring retracts the bolt when the final domino releases its retaining catch.
  for (let i = 0; i < 9; i++) {
    const turn = art.torus(root, 10.47 + i * 0.075, 2.51, 2.16, 0.115, 0.013, art.steel);
    turn.rotation.y = Math.PI / 2;
  }
  const animals = new T.Group();
  root.add(animals);
  for (const group of [drum, catchArm, hammer, peg, weight, ...dominoes, door, latch])
    batchMetalwork(art, group);
  return {
    drum,
    ball,
    catch: catchArm,
    hammer,
    peg,
    weight,
    dominoes,
    door,
    latch,
    weightCord,
    dominoCord,
    cageCord,
    tripCord,
    animals,
    ballPath,
  };
}

export function positionGearRelease(
  art: BalanceMetalwork,
  r: GearCageRelease,
  p: Record<ReleaseModule, number>,
  output: number,
  allowed: boolean,
): void {
  r.drum.rotation.z = -output * Math.PI * 2;
  r.catch.position.y = 7.57 + (allowed ? smooth((p.drive - 0.88) / 0.12) * 0.43 : 0);
  const along = Math.min(2.999999, p.ball * 3),
    i = Math.floor(along);
  r.ball.position.lerpVectors(r.ballPath[i], r.ballPath[i + 1], along - i);
  r.hammer.rotation.z = -0.65 + smooth(p.hammer) * 1.4;
  r.peg.position.x = 5.85 + smooth(p.hammer) * 0.65;
  r.weight.position.y = 6.65 - smooth(p.weight) * 1.72;
  r.dominoes.forEach((domino, i) => {
    domino.rotation.z = -smooth(p.domino * 6 - i) * 1.25;
  });
  r.latch.position.x = 9.82 + smooth(p.gate * 3) * 0.88;
  r.door.rotation.y = -smooth((p.gate - 0.28) / 0.72) * Math.PI * 0.56;
  art.positionRod(
    r.weightCord,
    new T.Vector3(6.23, 8.43, 0.65),
    new T.Vector3(6.23, r.weight.position.y + 0.43, 0.65),
  );
  const angle = r.dominoes[0].rotation.z;
  art.positionRod(
    r.dominoCord,
    new T.Vector3(10.8, 6.05, 0.65),
    new T.Vector3(7.15 - Math.sin(angle) * 0.82, 5.23 + Math.cos(angle) * 0.82, 0.7),
  );
  art.positionRod(
    r.cageCord,
    new T.Vector3(10.82, 5.4, 0.7),
    new T.Vector3(r.latch.position.x + 0.5, 2.51, 2.16),
  );
  const finalAngle = r.dominoes[5].rotation.z;
  art.positionRod(
    r.tripCord,
    new T.Vector3(9.75 - Math.sin(finalAngle) * 0.82, 5.23 + Math.cos(finalAngle) * 0.82, 0.7),
    new T.Vector3(10.62, 5.6, 0.7),
  );
}
