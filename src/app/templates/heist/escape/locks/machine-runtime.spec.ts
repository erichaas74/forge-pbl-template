import { TestBed } from '@angular/core/testing';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { EscapeEngine } from '../domain/escape.engine';
import type { EscapeAnswer, EscapeEnvelope, EscapePuzzle } from '../domain/escape.models';
import { requireEscapeMission } from '../domain/escape.validation';
import { evaluateGearLock } from '../gear-lock/gear-lock.domain';
import { EscapeRuntime, ESCAPE_MISSION, ESCAPE_PERSISTENCE } from '../runtime/escape-runtime';
import { ExpeditionRuntime } from '../runtime/expedition-runtime';
import { initialMachine } from './machine.rules';
import { machineWitness } from './machine.validation';

const mission = requireEscapeMission(data);
function solution(p: EscapePuzzle): EscapeAnswer {
  if (p.type === 'machine-lock')
    return {
      type: p.type,
      stages: p.lock.stages.map(machineWitness),
      seals: p.lock.stages.map((s) => s.id),
    };
  if (p.type === 'balance-lock') return [2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0];
  if (p.type === 'gear-lock')
    for (let a = 0; a < p.lock.gears.length; a++)
      for (let b = 0; b < p.lock.gears.length; b++)
        for (let t = 1; t <= p.lock.maxCrank; t++)
          if (evaluateGearLock(p.lock, [a, b, t])) return [a, b, t];
  throw new Error('Unexpected workshop');
}
describe('Versioned grade-based rescue progression', () => {
  for (const grade of [5, 6, 7, 8] as const)
    it(`completes all eight locations and restores grade ${grade} without duplicate rewards`, () => {
      const engine = new EscapeEngine(mission),
        history: EscapeEnvelope[] = [];
      const send = (command: EscapeEnvelope['command']) => {
        const e = { id: String(history.length), command };
        expect(engine.dispatch(e)).toBe(true);
        history.push(e);
        return e;
      };
      send({ type: 'select-grade', grade });
      send({ type: 'start' });
      expect(
        engine.dispatch({ id: 'late-grade', command: { type: 'select-grade', grade: 5 } }),
      ).toBe(false);
      while (!engine.complete) {
        const step = engine.current,
          answer = solution(step.puzzle);
        if (step.puzzle.type === 'machine-lock')
          send({
            type: 'checkpoint',
            stepId: step.id,
            answer: answer as ReturnType<typeof initialMachine>,
          });
        const event = send({ type: 'submit', stepId: step.id, answer });
        expect(engine.dispatch(event)).toBe(true);
        send({ type: 'continue', stepId: step.id });
      }
      expect(engine.attempts).toHaveLength(8);
      expect(engine.rescued).toBe(12);
      const restored = new EscapeEngine(mission);
      for (const e of history) expect(restored.dispatch(e)).toBe(true);
      expect(restored.grade).toBe(grade);
      expect(restored.complete).toBe(true);
      expect(restored.rescued).toBe(12);
    });
  it('restores the first sealed bridge stage and guards paused edits', () => {
    const engine = new EscapeEngine(mission),
      history: EscapeEnvelope[] = [];
    const send = (command: EscapeEnvelope['command']) => {
      const e = { id: String(history.length), command };
      engine.dispatch(e);
      history.push(e);
    };
    send({ type: 'select-grade', grade: 8 });
    send({ type: 'start' });
    while (engine.index < 5) {
      send({ type: 'submit', stepId: engine.current.id, answer: solution(engine.current.puzzle) });
      send({ type: 'continue', stepId: engine.current.id });
    }
    const p = engine.current.puzzle;
    if (p.type !== 'machine-lock') throw new Error('Bridge');
    const draft = initialMachine(p.lock),
      checkpoint = {
        ...draft,
        stages: [machineWitness(p.lock.stages[0]), draft.stages[1]],
        seals: [p.lock.stages[0].id],
      };
    send({ type: 'checkpoint', stepId: 'bridge', answer: checkpoint });
    TestBed.configureTestingModule({
      providers: [
        EscapeRuntime,
        ExpeditionRuntime,
        { provide: ESCAPE_MISSION, useValue: mission },
        { provide: ESCAPE_PERSISTENCE, useValue: { load: () => history, save: () => undefined } },
      ],
    });
    const r = TestBed.inject(ExpeditionRuntime);
    expect(r.engine().grade).toBe(8);
    expect(r.draft().machine).toEqual(checkpoint);
    r.start();
    r.inspect();
    expect(r.phase()).toBe('puzzle');
    r.paused.set(true);
    r.input({ type: 'machine-change', answer: initialMachine(p.lock) });
    expect(r.draft().machine).toEqual(checkpoint);
    r.paused.set(false);
    expect(r.submit()).toBe('incorrect');
    expect(r.engine().solved.has('bridge')).toBe(false);
    r.input({ type: 'machine-change', answer: solution(p) as typeof checkpoint });
    expect(r.submit()).toBe('correct');
    expect(r.submit()).toBe('invalid');
  });
});
