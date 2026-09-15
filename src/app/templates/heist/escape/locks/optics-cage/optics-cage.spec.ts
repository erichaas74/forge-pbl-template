import * as T from 'three';
import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../../domain/escape.validation';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { Reflection, StageAnswer } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { traceBeam, mirrorSegment } from '../machine.geometry';
import { machineReading } from '../machine.rules';
import { machineWitness, validateMachine } from '../machine.validation';
import { isCageDiorama } from '../machine-presentation';
import { acceptsOpticsCageUpgrade } from './optics-cage.migration';
import {
  opticsPoint,
  opticsRelease,
  snapMirror,
  owlMotion,
  OpticsCageSequence,
  OWL_ESCAPE_DURATION,
} from './optics-cage.motion';
import { createOpticsDiorama, positionOpticsDiorama } from './optics-cage.model';

const step = requireEscapeMission(data).steps[4],
  puzzle = step.puzzle;
if (puzzle.type !== 'machine-lock' || puzzle.lock.stages[0].kind !== 'reflection')
  throw new Error('Expected optics');
const d: Reflection = puzzle.lock.stages[0];
const initial: StageAnswer = { kind: 'reflection', angles: d.mirrors.map((m) => m.start) };
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

describe('Moon-tower optics', () => {
  it('preserves exact two- and three-bounce solutions for all four grade pathways', () => {
    for (const p of [step.puzzle, ...Object.values(step.gradePuzzles ?? {})]) {
      if (p.type !== 'machine-lock' || p.lock.stages[0].kind !== 'reflection')
        throw new Error('Expected optics pathway');
      const stage = p.lock.stages[0],
        answer = machineWitness(stage);
      expect(() => validateMachine(p.lock)).not.toThrow();
      expect(isCageDiorama(stage)).toBe(true);
      expect(stage.presentation).toEqual({ kind: 'optics-cage', owls: 2 });
      expect(machineReading(stage, answer).solved).toBe(true);
      if (answer.kind !== 'reflection') throw new Error('Expected angles');
      expect(answer.angles).toEqual(stage.mirrors.length === 2 ? [135, 135] : [135, 135, 45]);
      const trace = traceBeam(stage, answer.angles);
      expect(trace.points.length).toBe(stage.mirrors.length + 2);
      trace.points.slice(1, -1).forEach((point, i) => {
        expect(point.x).toBeCloseTo(stage.mirrors[i].center.x, 10);
        expect(point.y).toBeCloseTo(stage.mirrors[i].center.y, 10);
      });
      expect(trace.reason).toBe('receiver');
      expect(stage.mirrors.map((m) => m.start)).toEqual(
        stage.mirrors.length === 2 ? [0, 90] : [0, 90, 0],
      );
      if (stage.obstacles.length) {
        const blocked = traceBeam(stage, stage.mirrors.map(m => m.start));
        expect(blocked.reason).toBe('blocked');
        expect(blocked.points.at(-1)?.x).toBeCloseTo(5.5);
      }
    }
  });
  it('preserves reflection angles under the world transform and snaps clockwise in both directions', () => {
    for (const angle of [0, 45, 90, 135, 165]) {
      const segment = mirrorSegment(d, 0, angle),
        a = new T.Vector3(...opticsPoint(segment.a)),
        b = new T.Vector3(...opticsPoint(segment.b));
      expect(a.distanceTo(b)).toBeCloseTo(d.mirrors[0].length * 1.1);
      const vector = b.sub(a).normalize();
      expect(vector.x).toBeCloseTo(Math.cos((angle * Math.PI) / 180));
      expect(vector.y).toBeCloseTo(-Math.sin((angle * Math.PI) / 180));
    }
    expect(snapMirror(-15, 15)).toBe(165);
    expect(snapMirror(180, 45)).toBe(0);
    expect(snapMirror(133, 45)).toBe(135);
  });
  it('never opens for a miss and requires a committed stable beam before one automatic trial', () => {
    const sequence = new OpticsCageSequence(d, view()),
      whole = view(machineWitness(d));
    expect(sequence.update(view(), 1, true).engage).toBe(false);
    expect(sequence.update(whole, 1, false).engage).toBe(false);
    expect(sequence.update(whole, 0.2, true).engage).toBe(false);
    expect(sequence.update({ ...whole, paused: true }, 10, true).engage).toBe(false);
    expect(sequence.update(whole, 0, true).engage).toBe(false);
    expect(sequence.update(whole, 0.2, true).engage).toBe(true);
    expect(sequence.update(whole, 1, true).engage).toBe(false);
  });
  it('restores a solved pose, freezes replay while paused, finishes once and supports reduced motion', () => {
    const whole = view(machineWitness(d)),
      sequence = new OpticsCageSequence(d, whole);
    expect(sequence.time).toBe(OWL_ESCAPE_DURATION);
    expect(sequence.update(whole, 1, true).engage).toBe(false);
    const running = { ...whole, testing: true, passed: true, trial: 1 };
    sequence.update(running, 1, true);
    expect(sequence.time).toBe(1);
    sequence.update({ ...running, paused: true, reducedMotion: true }, 1, true);
    expect(sequence.time).toBe(1);
    expect(sequence.update({ ...running, reducedMotion: true }, 0, true).finished).toBe(false);
    expect(sequence.update({ ...running, reducedMotion: true }, 0.1, true)).toEqual({
      engage: false,
      finished: true,
    });
    expect(sequence.update(running, 1, true).finished).toBe(false);
    sequence.update({ ...running, trial: 2 }, 0.1, true);
    expect(sequence.time).toBe(0.1);
    sequence.update(view(), 0.1, true);
    expect(sequence.time).toBe(0);
  });
  it('clears the grille before flight and carries both owls through its opening before banking', () => {
    expect(opticsRelease(2.7).lift).toBe(1);
    for (let i = 0; i < 2; i++) {
      expect(owlMotion(i, 2.7, 0).progress).toBe(0);
      for (let time = 3; time <= 9; time += 0.05) {
        const pose = owlMotion(i, time, 0);
        if (pose.z < 3.0) {
          expect(pose.x).toBe(i === 0 ? 5.4 : 8.4);
          expect(pose.y + 1.9).toBeLessThan(4.91);
        }
      }
      const end = owlMotion(i, OWL_ESCAPE_DURATION, 0);
      expect(end.escaped).toBe(true);
      expect(end.z).toBeCloseTo(5.7);
      expect(end.y).toBeCloseTo(2.2);
    }
    expect(owlMotion(0, 3.5, 0).progress).toBeGreaterThan(0);
    expect(owlMotion(1, 3.5, 0).progress).toBe(0);
  });
  it('renders the domain trace and final mechanism pose without adding an alternate light path', () => {
    const art = new BalanceMetalwork(false),
      model = createOpticsDiorama(art, d),
      answer = machineWitness(d);
    if (answer.kind !== 'reflection') throw new Error('Expected angles');
    try {
      const result = positionOpticsDiorama(art, model, d, answer.angles, 0, OWL_ESCAPE_DURATION, 0);
      expect(result.escaped).toBe(2);
      expect(model.grille.position.y).toBeCloseTo(5.35);
      expect(model.mirrors[0].rotation.z).toBeCloseTo((-135 * Math.PI) / 180);
      result.trace.points.slice(1).forEach((point, i) => {
        const a = new T.Vector3(...opticsPoint(result.trace.points[i])),
          b = new T.Vector3(...opticsPoint(point));
        expect(model.beam[i].core.position.distanceTo(a.add(b).multiplyScalar(0.5))).toBeLessThan(
          1e-8,
        );
      });
      const wrong = positionOpticsDiorama(
        art,
        model,
        d,
        d.mirrors.map((m) => m.start),
        0,
        0,
        0,
      );
      expect(wrong.trace.hit).toBe(false);
      expect(model.grille.position.y).toBe(0.8);
      expect(wrong.escaped).toBe(0);
    } finally {
      art.dispose();
    }
    expect(art.geometries.size).toBe(0);
  });
  it('accepts only an added presentation when preserving saved drafts', () => {
    const { presentation, ...old } = d;
    expect(acceptsOpticsCageUpgrade(JSON.stringify(old), JSON.stringify(d))).toBe(true);
    expect(acceptsOpticsCageUpgrade(JSON.stringify(d), JSON.stringify(old))).toBe(false);
    expect(
      acceptsOpticsCageUpgrade(JSON.stringify(old), JSON.stringify({ ...d, radius: 0.4 })),
    ).toBe(false);
    expect(
      acceptsOpticsCageUpgrade(
        JSON.stringify(old),
        JSON.stringify({ ...d, receiver: { x: 8, y: 1 } }),
      ),
    ).toBe(false);
    expect(acceptsOpticsCageUpgrade('bad json', JSON.stringify(d))).toBe(false);
  });
});
