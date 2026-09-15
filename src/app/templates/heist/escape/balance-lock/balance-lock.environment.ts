import * as T from 'three';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import { DioramaSurfaces } from '../locks/diorama-surfaces';
import { batchMetalwork } from '../locks/timing-cage/timing-cage.batch';

export function createBalanceEnvironment(
  art: BalanceMetalwork,
  center: number,
  width: number,
): T.Group {
  const root = new T.Group(),
    surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(0x52636a),
    edge = surfaces.stone(0x36474f),
    wood = surfaces.wood(0x72543b);
  const left = center - width / 2 - 0.32,
    right = center + width / 2 + 0.32;
  art.box(root, center, 0.6, -1.02, width + 1.35, 6.55, 0.42, edge, 0.08);
  for (let row = 0; row < 7; row++)
    for (let col = 0; col < Math.ceil((width + 1.1) / 0.92); col++) {
      const x = left + col * 0.94;
      art.box(
        root,
        x,
        -2.15 + row * 0.91,
        -0.76,
        0.9,
        0.86,
        0.2,
        (row + col) % 5 ? stone : edge,
        0.04,
      );
    }
  for (const x of [left - 0.35, right + 0.35]) {
    art.box(root, x, 0.54, -0.36, 0.26, 6.5, 0.55, edge);
    for (const y of [-2.35, 3.54]) art.box(root, x, y, -0.29, 0.55, 0.22, 0.7, stone);
  }
  art.box(root, center, -2.37, 0.05, width + 1.5, 0.18, 2.7, wood);
  art.box(root, center, -2.52, 0.6, width + 1.62, 0.12, 3.9, edge);
  art.box(root, center, 3.53, -0.66, width + 1.12, 0.11, 0.45, art.brass);
  for (const x of [left + 0.2, right - 0.2])
    for (let y = -1.8; y < 3.2; y += 0.8) art.screw(root, x, y, -0.54);
  batchMetalwork(art, root);
  return root;
}
