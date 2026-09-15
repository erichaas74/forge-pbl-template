import { vi } from 'vitest';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import { createBalanceStage, positionBalanceStage, STATION } from './balance-lock.3d-model';
import { balancePinTargets } from './balance-lock.motion';
import { emptyBalance, type BalanceLockDefinition } from './balance-lock.domain';

const lock = data.steps[0].puzzle.lock as BalanceLockDefinition;
describe('3D hanging balance mechanism', () => {
  it('moves each pin with its own scale and keeps the working rope attached at both ends', () => {
    const art = new BalanceMetalwork(false),
      stage = createBalanceStage(art, lock);
    const positions = emptyBalance(lock);
    positions[0] = positions[1] = 2;
    const targets = balancePinTargets(lock, positions);
    positionBalanceStage(
      stage,
      art,
      targets.map((target) => target.offset),
      1,
      0,
    );
    expect(stage.pins[0].pin.position.y).toBe(STATION.axis);
    expect(stage.pins[1].pin.position.y).toBeGreaterThan(STATION.axis);
    expect(stage.pins[2].pin.position.y).toBeGreaterThan(STATION.axis);
    expect(stage.activePin.pin.position.y).toBe(stage.pins[1].pin.position.y);
    const eyeTop = stage.activePin.pin.position.y + 1.14;
    expect(stage.activePin.rope.position.y).toBeCloseTo(eyeTop, 8);
    const ropeLength = STATION.pan - 0.04 - (STATION.axis + 1.14);
    expect(stage.activePin.rope.position.y + ropeLength).toBeCloseTo(
      stage.pans[1].position.y - 0.04,
      8,
    );
    expect(stage.activeBolt.position.x).toBeCloseTo(0);
    expect(stage.masterBolt.position.x).toBeCloseTo(0);
    art.dispose();
  });
  it('keeps a tiny arithmetic near miss outside the bolt clearance and retracts both views together', () => {
    const tiny = {
      ...lock,
      scales: [
        {
          ...lock.scales[0],
          left: [{ ...lock.scales[0].left[0], value: { numerator: 751, denominator: 1000 } }],
        },
      ],
    };
    const targets = balancePinTargets(tiny, [2, 2, 0, 0, 0]);
    expect(targets[0].aligned).toBe(false);
    expect(Math.abs(targets[0].offset / 65)).toBeGreaterThan(0.148 + 0.09);
    const art = new BalanceMetalwork(false),
      stage = createBalanceStage(art, lock);
    positionBalanceStage(stage, art, [0, 0, 0], 2, 1);
    expect(stage.pins.every((pin) => pin.pin.position.y === STATION.axis)).toBe(true);
    expect(stage.activeBolt.position.x).toBe(-0.65);
    expect(stage.masterBolt.position.x).toBe(-0.65);
    positionBalanceStage(stage, art, [0, 19, 0], 1, 0);
    expect(stage.activePin.pin.position.y).toBeLessThan(STATION.axis);
    expect(stage.masterBolt.position.x).toBeCloseTo(0);
    art.dispose();
  });
  it('disposes the mounted workshop geometry, materials and textures', () => {
    const art = new BalanceMetalwork(false);
    createBalanceStage(art, lock);
    const geometry = [...art.geometries][0],
      texture = [...art.textures][0];
    const geometryDispose = vi.spyOn(geometry, 'dispose'),
      materialDispose = vi.spyOn(art.brass, 'dispose'),
      textureDispose = vi.spyOn(texture, 'dispose');
    art.dispose();
    expect(geometryDispose).toHaveBeenCalledOnce();
    expect(materialDispose).toHaveBeenCalledOnce();
    expect(textureDispose).toHaveBeenCalledOnce();
    expect(art.geometries.size + art.materials.size + art.textures.size).toBe(0);
  });
});
