import * as T from 'three';
import { vi } from 'vitest';
import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../../domain/escape.validation';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { MachineView } from '../machine-surface';
import type { StageAnswer } from '../machine.models';
import { cableLength, coordinateTarget } from '../machine.geometry';
import { initialMachine, machineReading } from '../machine.rules';
import { machineWitness, validateMachine } from '../machine.validation';
import { isBridgeDiorama } from '../machine-presentation';
import { acceptsBridgeCageUpgrade } from './bridge-cage.migration';
import {
  bridgeAnswers,
  bridgeParts,
  bridgeRelease,
  bridgeSolved,
  BridgeSequence,
  BRIDGE_DURATION,
  cablePoints,
  carriageInput,
  carriagePoint,
  crossingRabbit,
  fittedCable,
} from './bridge-cage.motion';
import { createBridgeDiorama, positionBridgeDiorama } from './bridge-cage.model';

const step = requireEscapeMission(data).steps[5],
  puzzle = step.puzzle;
if (puzzle.type !== 'machine-lock') throw Error('Expected bridge');
const d = puzzle.lock,
  initial = initialMachine(d).stages,
  solved = d.stages.map(machineWitness);
const view = (stages: readonly StageAnswer[] = initial, active = 0): MachineView => ({
  stages,
  active,
  answer: stages[active],
  freelySelectStages: true,
  selected: null,
  testing: false,
  trial: 0,
  passed: false,
  completed: false,
  paused: false,
  reducedMotion: false,
});

describe('Bridge holding-enclosure workshop', () => {
  it('preserves all four grade goals, exact cable lengths, and bounded rail geometry', () => {
    const targets = [
        { x: 6, y: 4 },
        { x: 2, y: -3 },
        { x: 3, y: 2 },
        { x: 2, y: 5 },
      ],
      lengths = [6, 8, 7.5, 10];
    [step.puzzle, ...Object.values(step.gradePuzzles ?? {})].forEach((p, i) => {
      if (p.type !== 'machine-lock') throw Error('Expected bridge pathway');
      expect(() => validateMachine(p.lock)).not.toThrow();
      expect(isBridgeDiorama(p.lock)).toBe(true);
      const [coordinate, cable] = bridgeParts(p.lock);
      expect(coordinateTarget(coordinate)).toEqual(targets[i]);
      expect(cableLength(cable)).toBe(lengths[i]);
      expect(bridgeSolved(p.lock, p.lock.stages.map(machineWitness))).toBe(true);
      for (const point of [{ x: coordinate.min, y: coordinate.max }, targets[i], { x: 0, y: 0 }]) {
        const world = carriagePoint(coordinate, point);
        expect(carriageInput(coordinate, world[0], world[1])).toEqual(point);
      }
      expect(carriageInput(coordinate, -100, 100)).toEqual({
        x: coordinate.min,
        y: coordinate.max,
      });
    });
  });
  it('shows a proportional shortfall, a slack curve, and the exact routed or diagonal span', () => {
    for (const p of [step.puzzle, ...Object.values(step.gradePuzzles ?? {})]) {
      if (p.type !== 'machine-lock') throw Error('Expected bridge');
      const [, cable] = bridgeParts(p.lock),
        anchors = cablePoints(cable);
      const short = fittedCable(cable, 0),
        taut = fittedCable(cable, 2),
        slack = fittedCable(cable, 4);
      expect(fittedCable(cable, -1).state).toBe('empty');
      expect(short.state).toBe('short');
      expect(taut.state).toBe('taut');
      expect(slack.state).toBe('slack');
      expect(short.points.at(-1)?.slice(0, 2)).not.toEqual(anchors.at(-1)?.slice(0, 2));
      for (const axis of [0, 1])
        expect(taut.points.at(-1)![axis]).toBeCloseTo(anchors.at(-1)![axis], 10);
      expect(slack.points.at(-1)?.[1]).toBeCloseTo(anchors.at(-1)![1]);
      expect(slack.points[10][1]).toBeLessThan(taut.points[10][1]);
    }
  });
  it('auto-engages a newly committed correct stage once, never a drag or a stage switch', () => {
    const sequence = new BridgeSequence(d, view());
    const partial = [solved[0], initial[1]],
      v = view(partial);
    expect(sequence.update(v, 1, false).engage).toBe(false);
    expect(sequence.update(v, 0.2, true).engage).toBe(false);
    expect(sequence.update(v, 0.2, true).engage).toBe(true);
    expect(sequence.update(v, 1, true).engage).toBe(false);
    expect(sequence.update({ ...v, testing: true, passed: true, trial: 1 }, 1, true).finished).toBe(
      true,
    );
    expect(sequence.time).toBe(0.85);
    expect(sequence.update(view(partial, 1), 1, true).engage).toBe(false);
    expect(sequence.update(view(solved, 1), 0.4, true).engage).toBe(true);
  });
  it('keeps the bridge raised if only the cable fits, including direct entry to stage two', () => {
    const partial = [initial[0], solved[1]],
      sequence = new BridgeSequence(d, view(initial, 1));
    expect(sequence.update(view(partial, 1), 0.4, true)).toMatchObject({
      engage: true,
      all: false,
    });
    expect(bridgeSolved(d, partial)).toBe(false);
    expect(bridgeAnswers(d, { ...view(), stages: undefined })).toEqual(initial);
    const wrong = view();
    expect(
      sequence.update({ ...wrong, testing: true, passed: false, trial: 1 }, 1, true).finished,
    ).toBe(true);
  });
  it('restores solved poses, pauses hidden frames, and replays reduced motion without auto trials', () => {
    const v = view(solved, 1),
      sequence = new BridgeSequence(d, v);
    expect(sequence.time).toBe(BRIDGE_DURATION);
    expect(sequence.update(v, 1, true).engage).toBe(false);
    const replay = { ...v, testing: true, passed: true, trial: 1 };
    sequence.update(replay, 0.5, true);
    const t = sequence.time;
    sequence.update({ ...replay, paused: true }, 2, true);
    expect(sequence.time).toBe(t);
    sequence.update(replay, 0, true);
    expect(sequence.time).toBe(t);
    expect(sequence.update({ ...replay, reducedMotion: true }, 0.1, true).finished).toBe(true);
    expect(sequence.time).toBe(BRIDGE_DURATION);
    expect(sequence.update({ ...replay, reducedMotion: true }, 0.1, true).finished).toBe(false);
  });
  it('fully lowers the deck and clears the gate before any rabbit enters the crossing', () => {
    expect(bridgeRelease(2.9).deck).toBe(1);
    expect(bridgeRelease(2.9).gate).toBe(0);
    expect(bridgeRelease(4.21).gate).toBe(1);
    for (let i = 0; i < 6; i++) {
      expect(crossingRabbit(i, 4.4, 0).progress).toBe(0);
      for (let time = 0; time < 14; time += 0.05) {
        const rabbit = crossingRabbit(i, time, 0);
        if (rabbit.x > 1.1) {
          expect(bridgeRelease(time).gate).toBe(1);
          expect(bridgeRelease(time).deck).toBe(1);
          expect(rabbit.y).toBeGreaterThanOrEqual(0.93);
          expect(rabbit.z).toBeGreaterThan(1.7);
          expect(rabbit.z).toBeLessThan(5.1);
        }
      }
      expect(crossingRabbit(i, BRIDGE_DURATION, 0).escaped).toBe(true);
    }
  });
  it('poses the actual scene and owns its geometry/material disposal', () => {
    const art = new BalanceMetalwork(false),
      model = createBridgeDiorama(art, d, false);
    const before = positionBridgeDiorama(art, model, d, initial, 0, 0, 0);
    expect(before.release.deck).toBe(0);
    expect(model.coordinate.visible).toBe(true);
    const final = positionBridgeDiorama(art, model, d, solved, 1, BRIDGE_DURATION, 0);
    expect(final.escaped).toBe(6);
    expect(model.deck.rotation.z).toBe(0);
    expect(model.gate.position.y).toBeGreaterThan(4);
    expect(model.cable.visible).toBe(true);
    expect(model.coordinate.visible).toBe(false);
    expect(model.rabbits.every((r) => r.root.position.x > 9)).toBe(true);
    const landings = model.rabbits.map((r) => r.root.position);
    for (let i = 0; i < landings.length; i++)
      for (let j = i + 1; j < landings.length; j++)
        expect(landings[i].distanceTo(landings[j])).toBeGreaterThan(0.85);
    const geometry = [...art.geometries][0],
      texture = [...art.textures][0],
      dispose = vi.spyOn(geometry, 'dispose'),
      disposeTexture = vi.spyOn(texture, 'dispose');
    const box = new T.Box3().setFromObject(model.deck);
    expect(box.max.x).toBeCloseTo(9, 0);
    art.dispose();
    expect(dispose).toHaveBeenCalledOnce();
    expect(disposeTexture).toHaveBeenCalledOnce();
    expect(art.geometries.size).toBe(0);
  });
  it('accepts only a presentation upgrade and rejects changed geometry or malformed stage pairs', () => {
    const old = { ...d, presentation: undefined };
    expect(acceptsBridgeCageUpgrade(JSON.stringify(old), JSON.stringify(d))).toBe(true);
    expect(acceptsBridgeCageUpgrade(JSON.stringify(d), JSON.stringify(old))).toBe(false);
    expect(acceptsBridgeCageUpgrade('bad json', JSON.stringify(d))).toBe(false);
    expect(
      acceptsBridgeCageUpgrade(
        JSON.stringify(old),
        JSON.stringify({ ...d, stages: [{ ...d.stages[0], max: 9 }, d.stages[1]] }),
      ),
    ).toBe(false);
    expect(() =>
      validateMachine({ ...d, presentation: { kind: 'bridge-cage', rabbits: 7 } }),
    ).toThrow();
    expect(() => validateMachine({ ...d, stages: [d.stages[1], d.stages[0]] })).toThrow();
    expect(machineReading(d.stages[0], solved[0]).solved).toBe(true);
  });
});
