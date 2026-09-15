import { TestBed } from '@angular/core/testing';
import data from '../../testing/castle-escape-v3.3.fixture.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { worldDistance } from '../domain/expedition.navigation';
import type { EscapeAnswer, EscapeEnvelope } from '../domain/escape.models';
import { ESCAPE_MISSION, ESCAPE_PERSISTENCE, EscapeRuntime } from './escape-runtime';
import { ExpeditionRuntime } from './expedition-runtime';

const mission = requireEscapeMission(data);
function create(saved: readonly EscapeEnvelope[] = []): ExpeditionRuntime {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      EscapeRuntime,
      ExpeditionRuntime,
      { provide: ESCAPE_MISSION, useValue: mission },
      { provide: ESCAPE_PERSISTENCE, useValue: { load: () => saved, save: () => undefined } },
    ],
  });
  return TestBed.inject(ExpeditionRuntime);
}
function arrive(r: ExpeditionRuntime): void {
  r.inspect();
  for (let i = 0; r.phase() === 'explore' && i < 3000; i++) r.tick(0.05, { x: 0, y: 0 });
  expect(r.phase()).toBe('puzzle');
}
function answer(r: ExpeditionRuntime, value: EscapeAnswer): void {
  if (typeof value === 'string')
    for (const [index, digit] of [...value].entries())
      for (let n = 0; n < +digit; n++) r.input({ type: 'dial', index, change: 1 });
  else if (typeof value === 'number') {
    if (r.current().puzzle.type === 'timing') r.setDeparture(value);
    else r.setNumber(value);
  } else if (!Array.isArray(value)) return;
  else if (r.current().puzzle.type === 'gear-lock') r.input({ type: 'gear-change', answer: value });
  else if (r.current().puzzle.type === 'balance-lock')
    value.forEach((side, index) =>
      r.input({ type: 'balance-place', index, side: side as 0 | 1 | 2 }),
    );
  else for (const index of value) r.input({ type: 'weight', index });
}
describe('Phaser expedition orchestration', () => {
  it('visits unsolved locks, keeps drafts separate, and cannot finish by visiting the final lock', () => {
    const r = create();
    expect(r.visitLock(7)).toBe(false);
    r.start();
    r.visitLock(0);
    r.input({ type: 'balance-place', index: 0, side: 2 });
    expect(r.visitLock(1)).toBe(true);
    r.setDeparture(20);
    expect(r.visitLock(7)).toBe(true);
    expect(r.current().id).toBe('boat');
    expect(r.phase()).toBe('puzzle');
    expect(r.engine().solved.size).toBe(0);
    expect(r.engine().attempts).toHaveLength(0);
    expect(r.engine().rescued).toBe(0);
    expect(r.engine().complete).toBe(false);
    r.setNumber(3);
    expect(r.submit()).toBe('correct');
    r.next();
    expect(r.engine().complete).toBe(false);
    expect(r.current().id).toBe('census');
    expect(r.draft().placements?.[0]).toBe(2);
    r.visitLock(1);
    expect(r.draft().departure).toBe(20);
    r.paused.set(true);
    expect(r.visitLock(2)).toBe(false);
    r.paused.set(false);
    for (const index of [-1, 8, NaN, 1.5]) expect(r.visitLock(index)).toBe(false);
  });
  it('restores a visited lock without fabricating earlier solutions', () => {
    const r = create([
      { id: 'start-visit', command: { type: 'start' } },
      { id: 'visit-last', command: { type: 'visit', stepId: 'boat' } },
    ]);
    expect(r.progress.restoreBlocked()).toBe(false);
    r.start();
    expect(r.current().id).toBe('boat');
    expect(r.engine().solved.size).toBe(0);
    expect(r.engine().rescued).toBe(0);
  });
  it('restores a completed gear train and rejects invalid or paused gear changes', () => {
    const history: EscapeEnvelope[] = [{ id: 'gear-start', command: { type: 'start' } }];
    const values: EscapeAnswer[] = [[2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0], 25, 12];
    values.forEach((value, index) => {
      history.push({
        id: `gear-solve-${index}`,
        command: { type: 'submit', stepId: mission.steps[index].id, answer: value },
      });
      history.push({
        id: `gear-next-${index}`,
        command: { type: 'continue', stepId: mission.steps[index].id },
      });
    });
    const r = create(history);
    r.start();
    arrive(r);
    r.input({ type: 'gear-change', answer: [2, 2, 3] });
    expect(r.draft().placements).toBeUndefined();
    r.paused.set(true);
    r.input({ type: 'gear-change', answer: [2, 1, 3] });
    expect(r.draft().placements).toBeUndefined();
    r.paused.set(false);
    r.input({ type: 'gear-change', answer: [2, 1, 3] });
    expect(r.submit()).toBe('correct');
    history.push({
      id: 'gear-release',
      command: { type: 'submit', stepId: 'foxes', answer: [2, 1, 3] },
    });
    const restored = create(history);
    restored.start();
    expect(restored.phase()).toBe('celebrate');
    expect(restored.draft().placements).toEqual([2, 1, 3]);
    expect(restored.engine().rescued).toBe(10);
  });
  it('restores exact placements and clears rescue evidence on reset while paths remain visitable', () => {
    const placements = [2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0];
    const r = create([
      { id: 'start-lock', command: { type: 'start' } },
      { id: 'release-lock', command: { type: 'submit', stepId: 'census', answer: placements } },
    ]);
    r.start();
    expect(r.phase()).toBe('celebrate');
    expect(r.draft().placements).toEqual(placements);
    const inside = r.definition.nodes.find((node) => node.id === 'inner-gate')!;
    expect(r.navigation.navigate(inside)).toBe(true);
    r.reset();
    expect(r.draft().placements).toBeUndefined();
    expect(r.navigation.navigate(inside)).toBe(true);
    expect(r.engine().solved.size).toBe(0);
  });
  it('requires walking, math, and explicit continuation for all eight rescues', () => {
    const r = create();
    r.start();
    const answers: EscapeAnswer[] = [
      [2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0],
      25,
      12,
      [2, 1, 3],
      [2, 2, 0, 0, 0],
      3,
      3,
      3,
    ];
    for (const [index, value] of answers.entries()) {
      expect(r.engine().index).toBe(index);
      r.next();
      expect(r.engine().index).toBe(index);
      arrive(r);
      if (index === 0) {
        expect(r.submit()).toBe('incorrect');
        expect(r.phase()).toBe('puzzle');
      }
      answer(r, value);
      expect(r.submit()).toBe('correct');
      expect(r.phase()).toBe('celebrate');
      expect(r.submit()).toBe('invalid');
      r.next();
    }
    expect(r.engine().complete).toBe(true);
    expect(r.engine().rescued).toBe(12);
    expect(r.phase()).toBe('complete');
    r.openJournal();
    r.closeJournal();
    expect(r.phase()).toBe('complete');
  });
  it('prevents remote and paused interactions from bypassing proximity', () => {
    const r = create();
    r.start();
    r.input({ type: 'interact', stepId: 'boat' });
    expect(r.phase()).toBe('explore');
    r.navigation.position = { x: 1100, y: 600 };
    r.phase.set('puzzle');
    answer(r, '864');
    expect(r.submit()).toBe('invalid');
    expect(r.engine().solved.size).toBe(0);
    r.phase.set('explore');
    r.navigation.position = { ...r.definition.spawn };
    r.inspect();
    r.paused.set(true);
    const before = { ...r.navigation.position };
    r.tick(10, { x: 1, y: 1 });
    expect(r.navigation.position).toEqual(before);
    r.paused.set(false);
    arrive(r);
    r.paused.set(true);
    expect(r.submit()).toBe('invalid');
  });
  it('restores at the active checkpoint and keeps peer presentation separate from outcomes', () => {
    const r = create([
      { id: 'a', command: { type: 'start' } },
      {
        id: 'b',
        command: {
          type: 'submit',
          stepId: 'census',
          answer: [2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0],
        },
      },
      { id: 'c', command: { type: 'continue', stepId: 'census' } },
    ]);
    expect(worldDistance(r.navigation.position, r.point(r.current()))).toBe(0);
    r.start();
    expect(r.current().id).toBe('lookout');
    const local = r.players[0];
    r.receivePresence([
      { ...local, id: 'friend', name: 'Friend' },
      { ...local, id: 'friend' },
      local,
      { ...local, id: 'invalid', position: { x: 0, y: 0 } },
    ]);
    expect(r.players.map((p) => p.id)).toEqual([local.id, 'friend']);
    expect(r.engine().solved.size).toBe(1);
    expect(r.engine().rescued).toBe(0);
    r.reset();
    expect(r.phase()).toBe('opening');
    expect(r.players).toHaveLength(1);
    expect(r.engine().started).toBe(false);
  });
});
