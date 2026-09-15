import { vi } from 'vitest';
import { Vector3 } from 'three';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import { createBalanceStage, positionBalanceStage, STATION } from './balance-lock.3d-model';
import { balancePinTargets } from './balance-lock.motion';
import { emptyBalance, type BalanceLockDefinition } from './balance-lock.domain';

const lock = data.steps[0].puzzle.lock as BalanceLockDefinition;
describe('3D hanging balance mechanism', () => {
  it('connects every piston directly to the beam opposite its single weight pan', () => {
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
    expect(stage.pins[1].pin.position.y).toBeLessThan(STATION.axis);
    expect(stage.pins[2].pin.position.y).toBeLessThan(STATION.axis);
    expect(stage.scales).toHaveLength(3);
    expect(stage.housing.parent).toBe(stage.root);
    expect(
      stage.root.children.filter((child) => child.name === 'shared-sliding-bolt'),
    ).toHaveLength(1);
    stage.pins.forEach((pin, i) => {
      const eyeTop = pin.pin.position.y + 1.14;
      expect(pin.rope.position.y).toBeCloseTo(eyeTop, 8);
      const scale = stage.scales[i];
      expect(scale.pans).toHaveLength(1);
      expect(scale.pans[0].userData['side']).toBe(2);
      expect(pin.rope.position.y + pin.ropeLength).toBeCloseTo(scale.suspension!.position.y, 8);
      expect(pin.rope.getWorldPosition(new Vector3()).x).toBeCloseTo(
        scale.suspension!.getWorldPosition(new Vector3()).x,
        8,
      );
      expect(scale.pans[0].position.y - STATION.pan).toBeCloseTo(
        -(pin.pin.position.y - STATION.axis),
        8,
      );
      expect(stage.scales[i].root.visible).toBe(true);
    });
    expect(stage.scales[0].beam.rotation.z).toBeCloseTo(0);
    expect(stage.scales[1].beam.rotation.z).toBeLessThan(0);
    expect(stage.masterBolt.position.x).toBeCloseTo(0);
    art.dispose();
  });
  it('keeps a tiny arithmetic near miss outside the bolt clearance and retracts the common bolt', () => {
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
    expect(stage.masterBolt.position.x).toBe(-0.65);
    positionBalanceStage(stage, art, [0, 19, 0], 1, 0);
    expect(stage.pins[1].pin.position.y).toBeLessThan(STATION.axis);
    expect(stage.pins[0].pin.position.y).toBe(STATION.axis);
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
