import * as T from 'three';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import { createTimingDiorama, positionTimingDiorama } from './timing-cage.model';
import { firstAlignment } from '../machine.rules';
import type { TimingWheels } from '../machine.models';
describe('Timing cage geometry', () => {
  for (const [periods, phases] of [
    [
      [4, 6],
      [0, 0],
    ],
    [
      [4, 6, 9],
      [0, 0, 0],
    ],
    [
      [6, 8],
      [1, 1],
    ],
  ] as const) {
    it(`aligns actual holes in every disc at the solution for ${periods}`, () => {
      const d: TimingWheels = {
        kind: 'timing-wheels',
        id: 'timing',
        title: 'Timing',
        instruction: 'Turn',
        hint: 'Compare',
        success: 'Open',
        periods,
        phases,
        maxSteps: 120,
        firstAlignment: true,
      };
      const art = new BalanceMetalwork(false),
        stage = createTimingDiorama(art, d);
      let meshes = 0;
      stage.root.traverse((o) => {
        if (o instanceof T.Mesh) meshes++;
      });
      expect(meshes).toBeLessThan(65);
      positionTimingDiorama(stage, d, firstAlignment(periods, phases, 120), 0);
      stage.root.updateMatrixWorld(true);
      stage.wheels.forEach((wheel, i) => {
        const hole = new T.Vector3(
          Math.cos(stage.holeAngles[i]) * 1.15,
          Math.sin(stage.holeAngles[i]) * 1.15,
          0,
        ).applyMatrix4(wheel.matrixWorld);
        expect(hole.x).toBeCloseTo(-4.25);
        expect(hole.y).toBeCloseTo(3.45);
        // A real ray passes through the metal aperture, rather than a painted-on mark.
        const ray = new T.Raycaster(new T.Vector3(hole.x, hole.y, 5), new T.Vector3(0, 0, -1));
        expect(ray.intersectObject(wheel, true)).toHaveLength(0);
      });
      positionTimingDiorama(stage, d, firstAlignment(periods, phases, 120), 3);
      expect(stage.door.rotation.y).toBeLessThan(-Math.PI / 2);
      expect(stage.latch.position.x).toBeCloseTo(6.06);
      art.dispose();
    });
  }
});
