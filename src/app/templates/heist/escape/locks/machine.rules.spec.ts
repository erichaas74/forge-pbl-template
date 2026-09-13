import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { stepForGrade } from '../domain/escape.models';
import { cableLength, coordinateTarget, traceBeam } from './machine.geometry';
import {
  evaluateMachine,
  initialMachine,
  machineReading,
  reduceMachine,
  validMachineAnswer,
} from './machine.rules';
import { machineWitness, validateMachine } from './machine.validation';
import type { MachineChallenge, MachineDefinition, MachineKind, MathGrade } from './machine.models';

const mission = requireEscapeMission(data);
function definition(kind: MachineKind, grade: MathGrade = 5): MachineDefinition {
  for (const step of mission.steps) {
    const p = stepForGrade(step, grade).puzzle;
    if (p.type === 'machine-lock' && p.lock.stages.some((s) => s.kind === kind)) return p.lock;
  }
  throw new Error('Missing registered workshop');
}
function challenge<K extends MachineKind>(
  kind: K,
  grade: MathGrade = 5,
): Extract<MachineChallenge, { kind: K }> {
  return definition(kind, grade).stages.find((s) => s.kind === kind) as Extract<
    MachineChallenge,
    { kind: K }
  >;
}
describe('Grade 5-8 mathematical machines', () => {
  for (const grade of [5, 6, 7, 8] as const) {
    for (const kind of [
      'fraction-gear',
      'volume',
      'timing-wheels',
      'coordinate',
      'reflection',
      'mixing',
      'cable',
    ] as const) {
      it(`has a reachable, initially unsolved ${kind} for grade ${grade}`, () => {
        const d = definition(kind, grade),
          s = challenge(kind, grade);
        expect(() => validateMachine(d)).not.toThrow();
        expect(evaluateMachine(d, initialMachine(d))).toBe(false);
        expect(machineReading(s, machineWitness(s)).solved).toBe(true);
      });
    }
  }
  it('requires physical coverage as well as a fraction sum of one', () => {
    const d = challenge('fraction-gear');
    expect(machineReading(d, { kind: d.kind, offsets: [0, -1, 0, 0, -1, -1] }).solved).toBe(false);
    expect(machineReading(d, { kind: d.kind, offsets: [0, -1, 0, 0, -1, -1] }).equation).toContain(
      '= 1 whole',
    );
    expect(machineReading(d, { kind: d.kind, offsets: [0, -1, 12, 18, -1, -1] }).solved).toBe(true);
    expect(machineReading(d, { kind: d.kind, offsets: [18, -1, 6, 12, -1, -1] }).solved).toBe(true);
  });
  it('conserves measured liquid and distinguishes low, high and overflow', () => {
    const d = challenge('volume'),
      a = { kind: d.kind, pours: [1, 1, 1, 0, 0, 0] } as const;
    expect(machineReading(d, a).feedback).toContain('below');
    expect(
      machineReading(d, reduceMachine(d, a, { type: 'pour', index: 3, delta: 1 })).solved,
    ).toBe(true);
    expect(machineReading(d, { kind: d.kind, pours: [1, 1, 1, 1, 1, 0] }).feedback).toContain(
      'above',
    );
    expect(machineReading(d, { kind: d.kind, pours: [1, 1, 1, 1, 1, 1] }).feedback).toContain(
      'overflow',
    );
    expect(reduceMachine(d, a, { type: 'pour', index: 0, delta: 1 })).toBe(a);
  });
  it('rejects zero and later common multiples when first alignment is required', () => {
    const d = challenge('timing-wheels');
    expect(machineReading(d, { kind: d.kind, steps: 0 }).solved).toBe(false);
    expect(machineReading(d, { kind: d.kind, steps: 24 }).feedback).toContain('earlier');
    expect(
      machineReading({ ...d, firstAlignment: false }, { kind: d.kind, steps: 24 }).solved,
    ).toBe(true);
    expect(machineReading(d, { kind: d.kind, steps: 12 }).solved).toBe(true);
    const offset = challenge('timing-wheels', 8);
    expect(machineReading(offset, { kind: offset.kind, steps: 23 }).solved).toBe(true);
  });
  it('calculates signed transformations and a simultaneous linear intersection', () => {
    expect(coordinateTarget(challenge('coordinate', 6))).toEqual({ x: 2, y: -3 });
    expect(coordinateTarget(challenge('coordinate', 7))).toEqual({ x: 3, y: 2 });
    expect(coordinateTarget(challenge('coordinate', 8))).toEqual({ x: 2, y: 5 });
  });
  it('traces each reflection, stops at obstacles and obeys the bounce limit', () => {
    const d = challenge('reflection');
    const trace = traceBeam(d, [135, 135]);
    expect(trace.hit).toBe(true);
    expect(trace.points).toHaveLength(4);
    expect(trace.points[1].x).toBeCloseTo(4);
    expect(trace.points[2].y).toBeCloseTo(1);
    expect(traceBeam({ ...d, bounceLimit: 1 }, [135, 135]).hit).toBe(false);
    expect(
      traceBeam({ ...d, obstacles: [{ a: { x: 2, y: 3 }, b: { x: 2, y: 5 } }] }, [135, 135]).reason,
    ).toBe('blocked');
    expect(traceBeam(d, [45, 135]).hit).toBe(false);
  });
  it('requires positive proportional quantities AND the specified total', () => {
    const d = challenge('mixing');
    expect(machineReading(d, { kind: d.kind, measures: [0, 0] }).solved).toBe(false);
    expect(machineReading(d, { kind: d.kind, measures: [2, 3] }).solved).toBe(false);
    expect(machineReading(d, { kind: d.kind, measures: [5, 5] }).solved).toBe(false);
    expect(machineReading(d, { kind: d.kind, measures: [4, 6] }).solved).toBe(true);
    expect(
      machineReading({ ...d, total: undefined }, { kind: d.kind, measures: [2, 3] }).solved,
    ).toBe(true);
  });
  it('compares cable length to the actual route and diagonal', () => {
    const d = challenge('cable', 8);
    expect(cableLength(d)).toBe(10);
    expect(machineReading(d, { kind: d.kind, cable: 0 }).feedback).toContain('short');
    expect(machineReading(d, { kind: d.kind, cable: 2 }).solved).toBe(true);
    expect(machineReading(d, { kind: d.kind, cable: 4 }).feedback).toContain('sags');
  });
  it('rejects forged seals, malformed arrays, nonfinite values and impossible definitions', () => {
    const d = definition('coordinate'),
      a = initialMachine(d);
    expect(validMachineAnswer(d, { ...a, seals: [d.stages[0].id] })).toBe(false);
    expect(validMachineAnswer(d, { ...a, stages: [] })).toBe(false);
    expect(
      validMachineAnswer(d, { ...a, stages: [{ kind: 'coordinate', x: NaN, y: 0 }, a.stages[1]] }),
    ).toBe(false);
    const stage = challenge('fraction-gear');
    expect(() =>
      validateMachine({
        ...definition('fraction-gear'),
        stages: [
          {
            ...stage,
            pieces: stage.pieces.slice(0, 3).map((p) => ({ ...p, numerator: 1, denominator: 24 })),
          },
        ],
      }),
    ).toThrow('reachability');
    expect(() =>
      validateMachine({
        ...definition('reflection'),
        stages: [{ ...challenge('reflection'), mirrors: [] }],
      }),
    ).toThrow();
  });
});
