import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../../domain/escape.validation';
import type { FractionGear, StageAnswer } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { machineReading } from '../machine.rules';
import { machineWitness, validateMachine } from '../machine.validation';
import {
  FractionCageSequence,
  fractionCagePose,
  rabbitMotion,
  RABBIT_ESCAPE_DURATION,
  sectorFits,
} from './fraction-cage.motion';
import { acceptsFractionCageUpgrade } from './fraction-cage.migration';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import {
  createFractionDiorama,
  positionFractionDiorama,
  COG_CENTER,
  sectorGeometry,
} from './fraction-cage.model';
import * as T from 'three';

const mission = requireEscapeMission(data),
  puzzle = mission.steps[2].puzzle;
if (puzzle.type !== 'machine-lock' || puzzle.lock.stages[0].kind !== 'fraction-gear')
  throw new Error('Fraction workshop required');
const d: FractionGear = puzzle.lock.stages[0];
const initial = { kind: 'fraction-gear' as const, offsets: d.pieces.map(() => -1) };
const view = (answer: StageAnswer = initial): MachineView => ({
  active: 0,
  answer,
  selected: null,
  testing: false,
  trial: 0,
  passed: false,
  completed: false,
  paused: false,
  reducedMotion: false,
});

describe('Fraction cage mechanics', () => {
  it('rejects overlaps, allows a circular wrap, and ignores the piece being repositioned', () => {
    const offsets = [0, -1, 12, -1, -1, -1];
    expect(sectorFits(d, offsets, 3, 12)).toBe(false);
    expect(sectorFits(d, offsets, 3, 18)).toBe(true);
    expect(sectorFits(d, offsets, 0, 0)).toBe(true);
    expect(sectorFits(d, [-1, -1, 6, -1, -1, -1], 0, 18)).toBe(true);
    expect(sectorFits(d, offsets, 9, 0)).toBe(false);
  });
  it('does not release a gapped or overlapping cog and engages the completed whole once', () => {
    const sequence = new FractionCageSequence(d, view());
    const gap = view({ kind: 'fraction-gear', offsets: [0, -1, 12, -1, -1, -1] });
    expect(sequence.update(gap, 0.4, true).engage).toBe(false);
    const overlap = view({ kind: 'fraction-gear', offsets: [0, -1, 12, 12, -1, -1] });
    expect(sequence.update(overlap, 0.4, true).engage).toBe(false);
    const whole = view({ kind: 'fraction-gear', offsets: [0, -1, 12, 18, -1, -1] });
    expect(sequence.update(whole, 0.1, false).engage).toBe(false);
    expect(sequence.update(whole, 0.3, true).engage).toBe(true);
    expect(sequence.update(whole, 0.3, true).engage).toBe(false);
  });
  it('holds the door and rabbits while paused and supports reduced-motion replay without re-engaging', () => {
    const whole = view(machineWitness(d)),
      sequence = new FractionCageSequence(d, whole);
    expect(sequence.time).toBe(RABBIT_ESCAPE_DURATION);
    const running = { ...whole, testing: true, passed: true, trial: 1 };
    sequence.update(running, 1, true);
    const time = sequence.time;
    sequence.update({ ...running, paused: true }, 5, true);
    expect(sequence.time).toBe(time);
    expect(sequence.update({ ...running, reducedMotion: true }, 0.1, true)).toEqual({
      engage: false,
      finished: true,
    });
    expect(sequence.update({ ...running, reducedMotion: true }, 0.1, true).finished).toBe(false);
    sequence.update({ ...running, testing: false }, 0.1, true);
    expect(sequence.update({ ...running, trial: 2 }, 0.1, true).engage).toBe(false);
    expect(sequence.time).toBeCloseTo(0.1);
  });
  it('clears the grille before any rabbit travels and staggers all six departures', () => {
    expect(fractionCagePose(2.7).lift).toBe(1);
    for (let i = 0; i < 6; i++) {
      expect(rabbitMotion(i, 2.7, 0).progress).toBe(0);
      expect(rabbitMotion(i, RABBIT_ESCAPE_DURATION, 0).escaped).toBe(true);
      expect(rabbitMotion(i, RABBIT_ESCAPE_DURATION, 0).z).toBeGreaterThan(4.5);
    }
    expect(rabbitMotion(0, 3.5, 0).progress).toBeGreaterThan(0);
    expect(rabbitMotion(1, 3.5, 0).progress).toBe(0);
    expect(rabbitMotion(0, 3.05 + 0.34, 0).y).toBeGreaterThan(0.4);
    const safe = Array.from({ length: 6 }, (_, i) => rabbitMotion(i, RABBIT_ESCAPE_DURATION, 0));
    for (let i = 0; i < safe.length; i++)
      for (let j = i + 1; j < safe.length; j++)
        expect(Math.hypot(safe[i].x - safe[j].x, safe[i].z - safe[j].z)).toBeGreaterThan(0.9);
  });
  it('retains a reachable exact whole in every grade', () => {
    const step = mission.steps[2];
    for (const puzzle of [step.puzzle, ...Object.values(step.gradePuzzles ?? {})]) {
      if (puzzle.type !== 'machine-lock') throw new Error('machine');
      const stage = puzzle.lock.stages[0];
      expect(machineReading(stage, machineWitness(stage)).solved).toBe(true);
      expect(() => validateMachine(puzzle.lock)).not.toThrow();
    }
    expect(() =>
      validateMachine({
        ...puzzle.lock,
        stages: [{ ...d, presentation: { kind: 'fraction-cage', rabbits: 7 } }],
      }),
    ).toThrow();
  });
});

describe('Fraction cage geometry', () => {
  it('leaves an actual axle hole in the metal sector', () => {
    const geometry = sectorGeometry(0.5),
      mesh = new T.Mesh(geometry, new T.MeshBasicMaterial({ side: T.DoubleSide }));
    mesh.updateMatrixWorld();
    expect(
      new T.Raycaster(new T.Vector3(0, 0, 2), new T.Vector3(0, 0, -1)).intersectObject(mesh),
    ).toHaveLength(0);
    expect(
      new T.Raycaster(new T.Vector3(1, 0, 2), new T.Vector3(0, 0, -1)).intersectObject(mesh).length,
    ).toBeGreaterThan(0);
    geometry.dispose();
    (mesh.material as T.Material).dispose();
  });
  it('keeps the lifting cable attached to the moving door and all six articulated animals in the scene', () => {
    const art = new BalanceMetalwork(false),
      stage = createFractionDiorama(art, d);
    expect(stage.rabbits).toHaveLength(6);
    expect(stage.rabbits.every((r) => r.ears.length === 2 && r.legs.length === 4)).toBe(true);
    const answer = machineWitness(d);
    if (answer.kind !== 'fraction-gear') throw new Error('answer');
    expect(positionFractionDiorama(art, stage, d, answer.offsets, 0, 0, false)).toBe(0);
    expect(stage.cog.position.distanceTo(COG_CENTER)).toBe(0);
    expect(
      positionFractionDiorama(art, stage, d, answer.offsets, RABBIT_ESCAPE_DURATION, 0, true),
    ).toBe(6);
    expect(stage.door.position.y).toBeCloseTo(3.06);
    stage.root.updateMatrixWorld(true);
    for (const sector of stage.sectors.filter((s) => s.visible)) {
      const label = sector.getObjectByName('fraction-value')!;
      expect(label.rotation.z + sector.rotation.z + stage.cog.rotation.z).toBeCloseTo(0);
    }
    // The rod's local direction can be reversed; its center and length determine the endpoints.
    const ends = [new T.Vector3(0, 0.5, 0), new T.Vector3(0, -0.5, 0)].map((v) =>
      v.applyMatrix4(stage.rope.matrixWorld),
    );
    expect(
      Math.min(
        ...ends.map((v) => v.distanceTo(new T.Vector3(4.56, stage.door.position.y + 2.97, 1.25))),
      ),
    ).toBeLessThan(0.0001);
    art.dispose();
  });
});

describe('Fraction scene saved-draft upgrade', () => {
  const latest = JSON.stringify(mission.steps);
  const old = () =>
    JSON.parse(latest, (key, value) =>
      key === 'presentation' && value?.kind === 'fraction-cage' ? undefined : value,
    );
  it('retains all drafts when only the optional rabbit scene is added', () => {
    expect(acceptsFractionCageUpgrade(JSON.stringify(old()), latest)).toBe(true);
    const reversed = JSON.parse(JSON.stringify(old()), (_key, v) =>
      v && typeof v === 'object' && !Array.isArray(v)
        ? Object.fromEntries(Object.entries(v).reverse())
        : v,
    );
    expect(acceptsFractionCageUpgrade(JSON.stringify(reversed), latest)).toBe(true);
  });
  it('composes with older Patrol and piston presentation upgrades', () => {
    const before = JSON.parse(JSON.stringify(old()), (key, value) =>
      (key === 'presentation' && value?.kind === 'timing-cage') ||
      (key === 'mechanism' && value === 'piston-counterweight')
        ? undefined
        : value,
    );
    expect(acceptsFractionCageUpgrade(JSON.stringify(before), latest)).toBe(true);
  });
  it('rejects fraction, inventory, other-workshop and malformed changes', () => {
    const before = old();
    before[2].puzzle.lock.stages[0].pieces[0].numerator = 2;
    expect(acceptsFractionCageUpgrade(JSON.stringify(before), latest)).toBe(false);
    const other = old();
    other[1].puzzle.lock.stages[0].periods[0] = 5;
    expect(acceptsFractionCageUpgrade(JSON.stringify(other), latest)).toBe(false);
    expect(acceptsFractionCageUpgrade('invalid', latest)).toBe(false);
    expect(acceptsFractionCageUpgrade(latest, JSON.stringify(old()))).toBe(false);
  });
});
