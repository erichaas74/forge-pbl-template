import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import data from '../../testing/castle-escape-v2.fixture.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { requireEscapeMission } from '../domain/escape.validation';
import type { EscapeEnvelope } from '../domain/escape.models';
import {
  ESCAPE_MISSION,
  ESCAPE_PERSISTENCE,
  EscapeRuntime,
  LocalEscapeAdapter,
  type EscapePersistence,
} from './escape-runtime';

const mission = requireEscapeMission(data);
function runtime(persistence: EscapePersistence): EscapeRuntime {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      EscapeRuntime,
      { provide: ESCAPE_MISSION, useValue: mission },
      { provide: ESCAPE_PERSISTENCE, useValue: persistence },
    ],
  });
  return TestBed.inject(EscapeRuntime);
}
describe('Escape practice checkpoints', () => {
  it('restores wrong attempts, solved locks and the current step', () => {
    let saved: readonly EscapeEnvelope[] = [];
    const storage = {
      load: () => structuredClone(saved),
      save: (history: readonly EscapeEnvelope[]) => {
        saved = structuredClone(history);
      },
    };
    const first = runtime(storage);
    first.send({ type: 'start' });
    first.send({ type: 'submit', stepId: 'census', answer: '123' });
    first.send({ type: 'submit', stepId: 'census', answer: '642' });
    const restored = runtime(storage);
    expect(restored.engine.solved.has('census')).toBe(true);
    expect(restored.engine.attempts).toHaveLength(2);
    restored.send({ type: 'continue', stepId: 'census' });
    expect(runtime(storage).engine.current.id).toBe('lookout');
  });
  it('protects an unreadable save until an explicit restart and reports failed writes', () => {
    const save = vi.fn();
    const r = runtime({
      load: () => [{ id: 'bad', command: { type: 'continue', stepId: 'boat' } }],
      save,
    });
    expect(r.restoreBlocked()).toBe(true);
    expect(r.send({ type: 'start' })).toBe(false);
    expect(save).not.toHaveBeenCalled();
    r.reset();
    expect(r.restoreBlocked()).toBe(false);
    expect(save).toHaveBeenCalledWith([]);
    const failed = runtime({
      load: () => [],
      save: () => {
        throw new Error('quota');
      },
    });
    expect(failed.send({ type: 'start' })).toBe(true);
    expect(failed.warning()).toContain('could not save');
  });
  it('isolates students and versions and rejects package changes', () => {
    localStorage.clear();
    const session = createLocalPreviewSession(mission.projectId, mission.projectVersion);
    const adapter = new LocalEscapeAdapter(session, mission);
    adapter.save([{ id: 'start', command: { type: 'start' } }]);
    expect(adapter.load()).toHaveLength(1);
    expect(
      new LocalEscapeAdapter({ ...session, actorId: 'another-actor' }, mission).load(),
    ).toEqual([]);
    expect(new LocalEscapeAdapter({ ...session, projectVersion: '1.1.0' }, mission).load()).toEqual(
      [],
    );
    expect(() =>
      new LocalEscapeAdapter(session, { ...mission, title: 'Changed content' }).load(),
    ).toThrow('could not be restored');
  });
});
