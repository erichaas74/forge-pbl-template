import data from '../../testing/castle-escape-v2.fixture.json';
import { EscapeEngine } from './escape.engine';
import { requireEscapeMission } from './escape.validation';
import { evaluateEscapePuzzle } from './escape-puzzles';
import type { EscapeAnswer, EscapeCommand } from './escape.models';

const mission = requireEscapeMission(data);
const solutions: EscapeAnswer[] = ['642', 25, 12, '16', [1, 2], 3, 3, 3];
function send(e: EscapeEngine, command: EscapeCommand): boolean {
  return e.dispatch({ id: crypto.randomUUID(), command });
}
describe('Math escape progression', () => {
  it('requires every mechanism, releases exactly 12 animals, and reaches the sanctuary', () => {
    const e = new EscapeEngine(mission);
    expect(send(e, { type: 'submit', stepId: 'census', answer: '642' })).toBe(false);
    send(e, { type: 'start' });
    const rescued: number[] = [];
    for (const [i, answer] of solutions.entries()) {
      const id = e.current.id;
      expect(send(e, { type: 'continue', stepId: id })).toBe(false);
      if (id !== 'boat') expect(send(e, { type: 'submit', stepId: 'boat', answer: 3 })).toBe(false);
      expect(send(e, { type: 'submit', stepId: id, answer: -1 })).toBe(true);
      expect(e.solved.has(id)).toBe(false);
      expect(send(e, { type: 'submit', stepId: id, answer })).toBe(true);
      expect(e.solved.has(id)).toBe(true);
      rescued.push(e.rescued);
      expect(send(e, { type: 'submit', stepId: id, answer })).toBe(false);
      expect(send(e, { type: 'continue', stepId: id })).toBe(true);
      expect(e.index).toBe(i + 1);
    }
    expect(rescued).toEqual([0, 0, 6, 10, 12, 12, 12, 12]);
    expect(e.complete).toBe(true);
    expect(e.rescued).toBe(12);
    expect(e.attempts).toHaveLength(16);
  });
  it('replays idempotent commands without duplicating rewards or progression', () => {
    const e = new EscapeEngine(mission);
    const start = { id: 'start', command: { type: 'start' } };
    expect(e.dispatch(start)).toBe(true);
    expect(e.dispatch(start)).toBe(true);
    const submit = { id: 'answer', command: { type: 'submit', stepId: 'census', answer: '642' } };
    e.dispatch(submit);
    e.dispatch(submit);
    expect(e.attempts).toHaveLength(1);
    const next = { id: 'next', command: { type: 'continue', stepId: 'census' } };
    e.dispatch(next);
    e.dispatch(next);
    expect(e.index).toBe(1);
    expect(
      e.dispatch({
        id: 'invalid',
        command: { type: 'submit', stepId: 'lookout', answer: Number.NaN },
      }),
    ).toBe(false);
    expect(e.dispatch({ id: 'invalid', command: null })).toBe(false);
  });
  it('checks the latest safe departure and exact, single-use counterweights', () => {
    const timing = mission.steps[1].puzzle,
      balance = mission.steps[4].puzzle;
    for (const n of [19, 20, 24, 26, 60, 25.5]) expect(evaluateEscapePuzzle(timing, n)).toBe(false);
    expect(evaluateEscapePuzzle(timing, 25)).toBe(true);
    expect(evaluateEscapePuzzle(balance, [1, 2])).toBe(true);
    for (const answer of [[0, 1], [0, 0, 2], [1, 2, 3], [4], [], [1.2]])
      expect(evaluateEscapePuzzle(balance, answer)).toBe(false);
  });
  it('runs a different harbor shelter package with new animals, controls and release order', () => {
    const harbor = requireEscapeMission({
      ...data,
      projectId: 'harbor-shelter',
      title: 'Before the storm',
      animals: [
        { ...data.animals[0], id: 'otters', count: 3 },
        { ...data.animals[1], id: 'puffins', count: 5 },
      ],
      steps: [
        {
          ...data.steps[0],
          id: 'shelter',
          release: ['puffins'],
          puzzle: { ...data.steps[0].puzzle, answer: '35', labels: ['Otters', 'Puffins'] },
        },
        {
          ...data.steps[1],
          id: 'tide',
          release: [],
          puzzle: { ...data.steps[1].puzzle, cycle: 80, safeStart: 30, safeEnd: 50, crossing: 12 },
        },
        {
          ...data.steps[4],
          id: 'lift',
          release: ['otters'],
          puzzle: { ...data.steps[4].puzzle, target: 9, weights: [2, 3, 6] },
        },
        {
          ...data.steps[7],
          id: 'supplies',
          release: [],
          puzzle: { ...data.steps[7].puzzle, answer: 4 },
        },
      ],
    });
    const e = new EscapeEngine(harbor);
    send(e, { type: 'start' });
    for (const answer of ['35', 38, [1, 2], 4] as const) {
      send(e, { type: 'submit', stepId: e.current.id, answer });
      expect(e.solved.has(e.current.id)).toBe(true);
      send(e, { type: 'continue', stepId: e.current.id });
    }
    expect(e.complete).toBe(true);
    expect(e.rescued).toBe(8);
  });
});
describe('Escape package validation', () => {
  it('rejects unsupported mechanisms, broken references, and unreachable puzzle solutions', () => {
    expect(() =>
      requireEscapeMission({
        ...data,
        steps: [{ ...data.steps[0], puzzle: { ...data.steps[0].puzzle, type: 'remote-script' } }],
      }),
    ).toThrow('CAPABILITY_NOT_INSTALLED');
    const mutate = (index: number, patch: object) => ({
      ...data,
      steps: data.steps.map((s, i) =>
        i === index ? { ...s, puzzle: { ...s.puzzle, ...patch } } : s,
      ),
    });
    expect(() => requireEscapeMission(mutate(4, { target: 50 }))).toThrow('no solution');
    expect(() => requireEscapeMission(mutate(1, { crossing: 16 }))).toThrow('timing.crossing');
    expect(() => requireEscapeMission(mutate(0, { labels: ['One'] }))).toThrow('code.labels');
    expect(() => requireEscapeMission(mutate(2, { answer: 99 }))).toThrow('number.answer');
    expect(() =>
      requireEscapeMission({ ...data, steps: data.steps.map((s) => ({ ...s, release: [] })) }),
    ).toThrow('reachable');
    expect(() =>
      requireEscapeMission({ ...data, animals: [data.animals[0], data.animals[0]] }),
    ).toThrow('duplicate');
    expect(() =>
      requireEscapeMission({ ...data, environment: 'https://unknown/image.svg' }),
    ).toThrow('environment');
    expect(() => requireEscapeMission({ ...data, steps: [null] })).toThrow('INVALID_HEIST_ESCAPE');
  });
});
