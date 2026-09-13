import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import {
  emptyGears,
  evaluateGearLock,
  gearFeedback,
  gearMotion,
  moveGear,
  releaseFrame,
  validateGearLock,
  validGearDraft,
  type GearLockDefinition,
} from './gear-lock.domain';
import { requireEscapeMission } from '../domain/escape.validation';
import { evaluateEscapePuzzle } from '../domain/escape-puzzles';

const lock = data.steps[3].puzzle.lock as GearLockDefinition;
describe('Gear restoration mathematics', () => {
  it('uses two real gear ratios with opposite mesh directions and a shared axle', () => {
    expect(gearMotion(lock, [2, 1, 3], 3)).toEqual({ drive: 3, axle: -2, output: 1 });
    expect(gearMotion(lock, [2, 3, 3], 3)).toEqual({ drive: 3, axle: -2, output: 0.5 });
    expect(evaluateGearLock(lock, [2, 1, 3])).toBe(true);
    // The correct final output alone cannot bypass either calibration clue.
    expect(evaluateGearLock(lock, [4, 1, 1])).toBe(false);
    expect(gearFeedback(lock, [2, 1, 2])).toContain('stops short');
    expect(gearFeedback(lock, [2, 1, 4])).toContain('passes');
    expect(gearFeedback(lock, [0, 1, 3])).toContain('Axle A');
    expect(gearFeedback(lock, [2, 0, 3])).toContain('Axle B');
  });
  it('conserves inventory when moving and replacing cogs and rejects malformed intents', () => {
    const a = moveGear(lock, emptyGears(), 2, 0);
    expect(moveGear(lock, a, 2, 1)).toEqual([-1, 2, 1]);
    expect(moveGear(lock, [2, 1, 3], 4, 0)).toEqual([4, 1, 3]);
    expect(moveGear(lock, [2, 1, 3], 2, -1)).toEqual([-1, 1, 3]);
    for (const value of [
      [2, 2, 3],
      [2, 1, 0],
      [2, 1, 9],
      [2, 1, 3.5],
      [99, 1, 3],
      [-2, 1, 3],
      [2, 1, 3, 0],
      [NaN, 1, 3],
    ]) {
      expect(validGearDraft(lock, value)).toBe(false);
      expect(evaluateGearLock(lock, value)).toBe(false);
    }
    expect(evaluateGearLock(lock, emptyGears())).toBe(false);
  });
  it('validates authored solvability, fraction bounds, assets, inventory and physical connectors', () => {
    expect(() => validateGearLock(lock)).not.toThrow();
    for (const patch of [
      { driverTeeth: 0 },
      { firstMultiplier: { numerator: 3, denominator: 0 } },
      { maxCrank: 2 },
      { backdrop: 'https://untrusted.example/scene.png' },
      { gears: [lock.gears[0], lock.gears[0], lock.gears[1]] },
      { release: ['gate', 'drive'] },
      { outputTurns: { numerator: 1, denominator: 11 } },
    ])
      expect(() => validateGearLock({ ...lock, ...patch })).toThrow('INVALID_HEIST_ESCAPE');
    const mission = requireEscapeMission(data);
    expect(evaluateEscapePuzzle(mission.steps[3].puzzle, [2, 1, 3])).toBe(true);
    expect(() => requireEscapeMission({ ...data, world: undefined })).toThrow();
    // A different authored train reuses the same evaluator without castle-specific code.
    const variant = {
      ...lock,
      driverTeeth: 12,
      firstMultiplier: { numerator: 2, denominator: 1 },
      secondMultiplier: { numerator: 3, denominator: 2 },
      outputTurns: { numerator: 1, denominator: 1 },
    };
    expect(() => validateGearLock(variant)).not.toThrow();
    expect(evaluateGearLock(variant, [1, 0, 3])).toBe(true);
  });
  it('does not move downstream modules before their upstream trigger completes', () => {
    expect(releaseFrame(lock.release, 2).progress.ball).toBe(0);
    expect(releaseFrame(lock.release, 4).progress.drive).toBe(1);
    expect(releaseFrame(lock.release, 4).progress.hammer).toBe(0);
    const done = releaseFrame(lock.release, 100);
    expect(done.complete).toBe(true);
    expect(Object.values(done.progress)).toEqual([1, 1, 1, 1, 1, 1]);
  });
});
