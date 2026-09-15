import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import {
  evaluateGearLock,
  gearMotion,
  validateGearLock,
  type GearLockDefinition,
} from '../gear-lock.domain';
import type { GearView } from '../gear-lock.scene';
import { acceptsGearCageUpgrade } from './gear-cage.migration';
import { createGearDiorama, positionCompound } from './gear-cage.model';
import {
  compoundLayout,
  escapeDuration,
  foxRoute,
  GearCageSequence,
  releaseDuration,
} from './gear-cage.motion';
import { positionGearRelease } from './gear-cage.release';

const lock = data.steps[3].puzzle.lock as GearLockDefinition;
const view = (patch: Partial<GearView> = {}): GearView => ({
  answer: [-1, -1, 1],
  selected: null,
  running: false,
  runId: 0,
  passed: false,
  completed: false,
  paused: false,
  reducedMotion: false,
  ...patch,
});
describe('Gear cage release and geometry', () => {
  it('preserves exact gear solutions across every grade pathway', () => {
    const variants = [
      lock,
      ...Object.values(data.steps[3].gradePuzzles!).map((p) => p.lock as GearLockDefinition),
    ];
    const solutions = [
      [2, 1, 3],
      [2, 1, 6],
      [2, 1, 6],
      [1, 2, 9],
    ];
    variants.forEach((d, i) => {
      expect(() => validateGearLock(d)).not.toThrow();
      expect(evaluateGearLock(d, solutions[i])).toBe(true);
      const motion = gearMotion(d, solutions[i], solutions[i][2]);
      expect(motion.output).toBe(d.outputTurns.numerator / d.outputTurns.denominator);
      expect(motion.axle).toBeLessThan(0);
      expect(evaluateGearLock(d, [...solutions[i].slice(0, 2), solutions[i][2] - 1])).toBe(false);
    });
  });
  it('keeps both tooth pitch circles in contact for every usable inventory pair', () => {
    lock.gears.forEach((_a, a) =>
      lock.gears.forEach((_b, b) => {
        if (a === b) return;
        const l = compoundLayout(lock, [a, b, 1]);
        expect(l.aX - l.driveX).toBeCloseTo(l.driveRadius + l.aRadius);
        expect(l.bX - l.aX).toBeCloseTo(l.pinionRadius + l.bRadius);
        expect(l.bX + l.bRadius).toBeLessThan(0.5);
      }),
    );
  });
  it('renders A behind its shared pinion and B on the pinion plane, with independent mesh directions', () => {
    const art = new BalanceMetalwork(),
      stage = createGearDiorama(art, lock),
      answer = [2, 1, 3];
    positionCompound(art, stage, lock, answer, gearMotion(lock, answer, 0.25));
    expect(stage.inventory[2].position.x).toBe(stage.pinion.position.x);
    expect(stage.inventory[2].position.z).toBeLessThan(stage.pinion.position.z);
    expect(stage.inventory[1].position.z).toBe(stage.pinion.position.z);
    expect(stage.driver.rotation.z).toBeLessThan(0);
    expect(stage.pinion.rotation.z).toBeGreaterThan(0);
    expect(stage.outputPulley.rotation.z).toBeLessThan(0);
    expect(stage.inventory.filter((g) => g.visible)).toHaveLength(2);
    art.dispose();
  });
  it('requires a drive trial even after a user finishes fitting the correct gears', () => {
    const sequence = new GearCageSequence(lock, view());
    const result = sequence.update(view({ answer: [2, 1, 3] }), 100);
    expect(result.allowed).toBe(false);
    expect(result.escape).toBe(0);
    expect(result.frame.progress.gate).toBe(0);
    expect(result.finish).toBe(false);
  });
  it.each([
    [2, 1, 2],
    [2, 1, 4],
    [4, 1, 1],
  ])('keeps every downstream mechanism and fox still after failed trial %j', (a, b, c) => {
    const sequence = new GearCageSequence(lock, view());
    const result = sequence.update(view({ answer: [a, b, c], running: true, runId: 1 }), 100);
    expect(result.finish).toBe(true);
    expect(result.allowed).toBe(false);
    expect(result.motion.output).toBeGreaterThan(0);
    expect(result.frame.progress).toEqual({
      drive: 1,
      ball: 0,
      hammer: 0,
      weight: 0,
      domino: 0,
      gate: 0,
    });
    expect(result.escape).toBe(0);
  });
  it('waits for the open cage, then all four escaping foxes, before finishing exactly once', () => {
    const sequence = new GearCageSequence(lock, view()),
      v = view({ answer: [2, 1, 3], running: true, runId: 1, passed: true });
    let state = sequence.update(v, releaseDuration(lock) - 0.1);
    expect(state.escape).toBe(0);
    expect(state.frame.progress.gate).toBeLessThan(1);
    expect(state.finish).toBe(false);
    state = sequence.update(v, 0.2);
    expect(state.frame.progress.gate).toBe(1);
    expect(state.escape).toBeGreaterThan(0);
    expect(foxRoute(0, state.escape).progress).toBeGreaterThan(0);
    expect(foxRoute(1, state.escape).progress).toBe(0);
    expect(state.finish).toBe(false);
    state = sequence.update(v, 100);
    for (let i = 0; i < 4; i++) expect(foxRoute(i, state.escape).escaped).toBe(true);
    expect(state.finish).toBe(true);
    expect(sequence.update(v, 1).finish).toBe(false);
  });
  it('freezes phase and output when paused or hidden, including reduced motion', () => {
    const sequence = new GearCageSequence(lock, view()),
      v = view({ answer: [2, 1, 3], running: true, runId: 1, passed: true });
    const first = sequence.update(v, 1);
    expect(sequence.update({ ...v, paused: true, reducedMotion: true }, 100)).toEqual(first);
    expect(sequence.update(v, 0)).toEqual(first);
    const done = sequence.update({ ...v, reducedMotion: true }, 0.01);
    expect(done.finish).toBe(true);
    expect(sequence.time).toBe(escapeDuration(lock));
  });
  it('opens a physical door only after retracting the bolt and keeps all fox routes within the doorway', () => {
    const art = new BalanceMetalwork(),
      rig = createGearDiorama(art, lock).release;
    const phase = { drive: 1, ball: 1, hammer: 1, weight: 1, domino: 1, gate: 0.27 };
    positionGearRelease(art, rig, phase, 1, true);
    expect(rig.door.rotation.y).toBeCloseTo(0);
    expect(rig.latch.position.x).toBeGreaterThan(10.5);
    positionGearRelease(art, rig, { ...phase, gate: 1 }, 1, true);
    expect(rig.door.rotation.y).toBeLessThan(-Math.PI / 2);
    const destinations = [];
    for (let i = 0; i < 4; i++) {
      for (let t = 0; t < 9; t += 0.1) {
        const route = foxRoute(i, t);
        if (route.z > 1 && route.z < 3) {
          expect(route.x).toBeGreaterThan(4.7);
          expect(route.x).toBeLessThan(9.5);
        }
      }
      destinations.push(foxRoute(i, 100));
    }
    expect(new Set(destinations.map((p) => `${p.x},${p.z}`)).size).toBe(4);
    expect(destinations.every((p) => p.z > 5)).toBe(true);
    art.dispose();
  });
  it('restores a solved draft and replays its escape as a new animation', () => {
    const v = view({ answer: [2, 1, 3] }),
      sequence = new GearCageSequence(lock, v);
    expect(sequence.update(v, 0).frame.progress.gate).toBe(1);
    expect(sequence.update(v, 0).finish).toBe(false);
    const replay = sequence.update({ ...v, passed: true, running: true, runId: 1 }, 0.1);
    expect(replay.frame.progress.gate).toBe(0);
    expect(replay.escape).toBe(0);
    expect(replay.finish).toBe(false);
  });
});

describe('Optional gear cage configuration and draft migration', () => {
  it('rejects invalid populations, clip names and non-local assets', () => {
    for (const patch of [
      { foxes: 0 },
      { foxes: 5 },
      { animal: { ...lock.presentation!.animal, model: 'https://example.com/fox.glb' } },
      { animal: { ...lock.presentation!.animal, idle: '' } },
    ]) {
      expect(() =>
        validateGearLock({ ...lock, presentation: { ...lock.presentation, ...patch } }),
      ).toThrow('INVALID_HEIST_ESCAPE');
    }
    const { presentation: _, ...legacy } = lock;
    expect(() => validateGearLock(legacy)).not.toThrow();
  });
  it('accepts presentation-only upgrades without accepting changed mathematics, content or inventory', () => {
    const { presentation: _, ...old } = lock;
    const before = JSON.stringify({ lock: old }),
      after = JSON.stringify({ lock });
    expect(acceptsGearCageUpgrade(before, after)).toBe(true);
    expect(acceptsGearCageUpgrade(after, before)).toBe(false);
    for (const patch of [
      { driverTeeth: 18 },
      { success: 'Changed' },
      { gears: lock.gears.slice(1) },
    ])
      expect(acceptsGearCageUpgrade(before, JSON.stringify({ lock: { ...lock, ...patch } }))).toBe(
        false,
      );
    expect(acceptsGearCageUpgrade('invalid', after)).toBe(false);
  });
});
