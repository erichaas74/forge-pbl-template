import fixture from '../../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { RestorationCollectionEngine, collectionReady } from './restoration-collection.engine';
import { requireRestorationMission } from './restoration-collection.validation';
import type { CollectionCommand, RestorationMission } from './restoration-collection.models';
import type { AcademicLock, LockAnswer } from '../gallery/domain/gallery.models';
const mission = requireRestorationMission(fixture);
function sender(engine: RestorationCollectionEngine) { let n = 0; return (command: CollectionCommand) => engine.dispatch({ id: `test-${++n}`, elapsed: n, command }); }
function restoreAll(engine: RestorationCollectionEngine, send: ReturnType<typeof sender>) {
  for (const w of engine.mission.works) {
    send({ type: 'open', workId: w.id });
    for (const r of w.regions) { const a = r.answers[0]; send({ type: 'repair', workId: w.id, action: { type: 'inspect', regionId: r.id } }); if (a.optionId !== r.originalOptionId) send({ type: 'repair', workId: w.id, action: { type: 'edit', regionId: r.id, optionId: a.optionId } }); send({ type: 'repair', workId: w.id, action: { type: 'justify', regionId: r.id, note: { evidenceId: a.evidenceId, relationship: a.relationship, explanation: 'This reference establishes the time and place needed for this image decision.' } } }); }
    send({ type: 'repair', workId: w.id, action: { type: 'submit' } });
  }
}
function answer(lock: AcademicLock): LockAnswer { return { calculation: lock.target ?? lock.capacity, setting: lock.target, placements: lock.matches, selected: lock.solution ?? lock.requiredItems }; }
describe('Restoration collection and final recovery', () => {
  it('requires every restoration before the heist and all mechanisms before extraction', () => {
    const e = new RestorationCollectionEngine(mission), send = sender(e);
    expect(send({ type: 'start-heist' })).toBe(false); expect(send({ type: 'extract' })).toBe(false);
    restoreAll(e, send); expect(collectionReady(mission, e.state)).toBe(true); expect(send({ type: 'start-heist' })).toBe(true);
    expect(send({ type: 'repair', workId: mission.works.at(-1)!.id, action: { type: 'undo' } })).toBe(false);
    expect(send({ type: 'operate', lockId: 'vault-nation', answer: { selected: ['spain'] } })).toBe(false);
    for (const id of mission.finalLockIds) { expect(send({ type: 'extract' })).toBe(false); const lock = mission.sourceGallery.locks.find(l => l.id === id)!; expect(send({ type: 'operate', lockId: id, answer: answer(lock) })).toBe(true); expect(e.state.solvedLocks).toContain(id); }
    expect(send({ type: 'extract' })).toBe(true); expect(send({ type: 'extract' })).toBe(false); expect(e.dossier().complete).toBe(true); expect(e.dossier().works).toHaveLength(16);
    const replay = new RestorationCollectionEngine(mission); for (const event of e.events) expect(replay.dispatch(event)).toBe(true); expect(replay.state).toEqual(e.state);
  });
  it('preserves painting context and draft through the story portal', () => {
    const e = new RestorationCollectionEngine(mission), send = sender(e), w = mission.works[0];
    send({ type: 'open', workId: w.id }); send({ type: 'repair', workId: w.id, action: { type: 'inspect', regionId: 'detail' } }); send({ type: 'repair', workId: w.id, action: { type: 'edit', regionId: 'detail', optionId: 'remove' } });
    const saved = e.state.works[w.id]; expect(send({ type: 'encounter', encounterId: w.encounterId!, action: { type: 'enter' } })).toBe(true);
    expect(send({ type: 'open', workId: mission.works[1].id })).toBe(false); expect(send({ type: 'encounter', encounterId: w.encounterId!, action: { type: 'exit' } })).toBe(true);
    expect(e.state.workId).toBe(w.id); expect(e.state.works[w.id]).toEqual(saved);
  });
  it('rejects duplicated events and malformed capabilities', () => {
    const e = new RestorationCollectionEngine(mission), event = { id: 'one', elapsed: 0, command: { type: 'open' as const, workId: mission.works[0].id } };
    expect(e.dispatch(event)).toBe(true); expect(e.dispatch(event)).toBe(false); expect(e.events).toHaveLength(1);
    expect(() => requireRestorationMission({ ...fixture, works: [{ ...fixture.works[0], paintingId: 'missing' }] })).toThrow();
    expect(() => requireRestorationMission({ ...fixture, finalLockIds: ['not-a-lock'] })).toThrow();
    expect(() => requireRestorationMission({ ...fixture, works: [{ ...fixture.works[2], encounterId: 'coastal-encounter' }] })).toThrow();
    expect(() => requireRestorationMission({ ...fixture, works: [{ ...fixture.works[0], type: 'missing' }] } as unknown as RestorationMission)).toThrow('CAPABILITY_NOT_INSTALLED');
  });
});
