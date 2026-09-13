import data from '../../../../../../public/projects/shadow-gallery/project.json';
import { angularDistance, evaluateLock } from './academic-locks';
import { GalleryEngine } from './gallery.engine';
import type { AcademicLock, GalleryCommand, GalleryCommandEnvelope, LockAnswer } from './gallery.models';
import { requireGalleryMission } from './gallery.validation';

const mission = requireGalleryMission(data);
export function solution(lock: AcademicLock): LockAnswer {
  if (['combo', 'rotation', 'measurement'].includes(lock.type)) return { calculation: lock.target, setting: lock.target };
  if (lock.type === 'cargo') return { calculation: lock.capacity, selected: lock.requiredItems };
  if (lock.type === 'lever') return { selected: lock.solution };
  if (lock.type === 'timeline' || lock.type === 'map-route') return { order: lock.solution };
  return { placements: lock.matches };
}
function harness() {
  const engine = new GalleryEngine(mission); const history: GalleryCommandEnvelope[] = [];
  const send = (command: GalleryCommand) => { const envelope = { id: `test-${history.length}`, elapsed: history.length * 3, command }; const result = engine.dispatch(envelope); if (result) history.push(envelope); return result; };
  const choose = (authentic: boolean) => { const p = engine.chamber.paintings.find(p => p.authentic === authentic)!; send({ type: 'inspect', paintingId: p.id, hotspotId: p.hotspots[0].id }); send({ type: 'choose', paintingId: p.id }); return p; };
  return { engine, send, history, choose };
}
describe('Academic heist gallery', () => {
  it('validates the complete eight-gallery package with rotated authentic positions', () => {
    expect(mission.chambers).toHaveLength(8);
    expect(new Set(mission.chambers.map(c => c.paintings.findIndex(p => p.authentic))).size).toBe(3);
    expect(new Set(mission.locks.map(l => l.type)).size).toBe(11);
  });
  it('requires inspection, authentication and all physical mechanisms before passage', () => {
    const h = harness(), p = h.engine.chamber.paintings.find(p => p.authentic)!;
    expect(h.send({ type: 'choose', paintingId: p.id })).toBe(false);
    h.choose(true); expect(h.engine.phase).toBe('mechanism');
    expect(h.send({ type: 'continue' })).toBe(false);
    const lock = h.engine.activeLocks[0]; h.send({ type: 'operate', lockId: lock.id, answer: solution(lock) });
    expect(h.engine.phase).toBe('mechanism'); expect(h.send({ type: 'continue' })).toBe(false);
    const angle = h.engine.activeLocks[0];
    h.send({ type: 'operate', lockId: angle.id, answer: { calculation: angle.target, setting: 90 } });
    expect(h.engine.solved).not.toContain(angle.id); expect(h.engine.mechanisms[angle.id].setting).toBe(90);
    h.send({ type: 'operate', lockId: angle.id, answer: solution(angle) }); expect(h.engine.phase).toBe('unlocked');
    h.send({ type: 'continue' }); expect(h.engine.chamberId).toBe('workshop');
  });
  it('requires both fraud category and inspected offending detail and a related recovery lock', () => {
    const h = harness(), p = h.choose(false), fraud = p.fraud!;
    expect(h.engine.phase).toBe('fraud');
    expect(h.send({ type: 'choose', paintingId: h.engine.chamber.paintings.find(p => p.authentic)!.id })).toBe(false);
    h.send({ type: 'classify', category: 'timeline', hotspotId: fraud.hotspotId }); expect(h.engine.phase).toBe('fraud');
    h.send({ type: 'inspect', paintingId: p.id, hotspotId: p.hotspots[1].id });
    h.send({ type: 'classify', category: fraud.category, hotspotId: p.hotspots[1].id }); expect(h.engine.phase).toBe('fraud');
    h.send({ type: 'classify', category: fraud.category, hotspotId: fraud.hotspotId }); expect(h.engine.phase).toBe('recovery');
    expect(h.engine.frauds).toEqual([]); const lock = h.engine.activeLocks[0];
    h.send({ type: 'operate', lockId: lock.id, answer: solution(lock) });
    expect(h.engine.phase).toBe('recon'); expect(h.engine.frauds).toEqual([p.id]);
    expect(h.send({ type: 'choose', paintingId: p.id })).toBe(false);
  });
  it('recovers every fraud, opens every mechanism, extracts and replays the same evidence', () => {
    const h = harness();
    for (const chamber of mission.chambers) {
      expect(h.engine.chamberId).toBe(chamber.id);
      for (const p of chamber.paintings.filter(p => !p.authentic)) {
        expect(h.send({ type: 'inspect', paintingId: p.id, hotspotId: p.fraud!.hotspotId })).toBe(true);
        expect(h.send({ type: 'choose', paintingId: p.id })).toBe(true);
        h.send({ type: 'classify', category: p.fraud!.category, hotspotId: p.fraud!.hotspotId });
        const lock = h.engine.activeLocks[0]; expect(lock.id).toBe(p.fraud!.recoveryLockId);
        expect(h.send({ type: 'operate', lockId: lock.id, answer: solution(lock) })).toBe(true); expect(h.engine.phase).toBe('recon');
      }
      h.choose(true);
      while (h.engine.activeLocks.length) { const lock = h.engine.activeLocks[0]; h.send({ type: 'operate', lockId: lock.id, answer: solution(lock) }); }
      expect(h.engine.phase).toBe('unlocked'); expect(h.send({ type: 'continue' })).toBe(true);
    }
    expect(h.engine.phase).toBe('extracted'); expect(h.engine.frauds).toHaveLength(16); expect(h.engine.solved).toHaveLength(33);
    h.send({ type: 'defend', responses: mission.defensePrompts.map(() => 'I matched the concrete clue with a dated source.') });
    const restored = new GalleryEngine(mission); h.history.forEach(envelope => expect(restored.dispatch(envelope)).toBe(true));
    expect(restored.dossier()).toEqual(h.engine.dossier()); expect(restored.dossier().authenticPaintings).toHaveLength(8);
    expect(restored.dossier().finalVault).toBe(true); expect(h.engine.events[0].snapshot.solved).toEqual([]);
  });
  it('rejects duplicate IDs, backwards time and malformed answers without changing the state', () => {
    const h = harness(); h.choose(true); const snapshot = h.engine.snapshot();
    expect(h.engine.dispatch(h.history[0])).toBe(false);
    expect(h.engine.dispatch({ id: 'backwards', elapsed: 0, command: { type: 'continue' } })).toBe(false);
    expect(h.send({ type: 'operate', lockId: h.engine.activeLocks[0].id, answer: { placements: null } as unknown as LockAnswer })).toBe(false);
    expect(h.send({ type: 'operate', lockId: 'vault-date', answer: { calculation: 1492, setting: 1492 } })).toBe(false);
    expect(h.engine.snapshot()).toEqual(snapshot);
  });
  it('supports a second mission entirely through configuration', () => {
    const different = structuredClone(data); different.projectId = 'restoration-workshop'; different.title = 'Restore the archive'; different.subject = 'math';
    different.chambers = [different.chambers[4]]; delete different.chambers[0].next; different.entry = different.chambers[0].id;
    const adapted = requireGalleryMission(different), engine = new GalleryEngine(adapted); let i = 0;
    const send = (command: GalleryCommand) => engine.dispatch({ id: `adapted-${i}`, elapsed: i++, command });
    const painting = engine.chamber.paintings.find(p => p.authentic)!;
    send({ type: 'inspect', paintingId: painting.id, hotspotId: painting.hotspots[0].id }); send({ type: 'choose', paintingId: painting.id });
    while (engine.activeLocks.length) { const lock = engine.activeLocks[0]; send({ type: 'operate', lockId: lock.id, answer: solution(lock) }); }
    send({ type: 'continue' }); expect(engine.phase).toBe('extracted'); expect(engine.dossier().projectId).toBe('restoration-workshop');
  });
});
describe('Physical academic lock evaluation', () => {
  it('uses circular distance near north but retains the calculation and control bounds', () => {
    const lock = { ...mission.locks.find(l => l.type === 'rotation')!, target: 0 };
    expect(angularDistance(359, 1)).toBe(2); expect(angularDistance(-1, 359)).toBe(0);
    expect(evaluateLock(lock, { calculation: 0, setting: 359 })).toBe(true);
    expect(evaluateLock(lock, { calculation: 45, setting: 0 })).toBe(false);
    expect(evaluateLock(lock, { calculation: 0, setting: 720 })).toBe(false);
    expect(evaluateLock({ ...lock, wrap: false, target: 360 }, { calculation: 360, setting: 0 })).toBe(false);
  });
  it('tests the actual cargo selected and permits more than one safe load', () => {
    const lock = mission.locks.find(l => l.type === 'cargo')!;
    expect(evaluateLock(lock, { calculation: 180, selected: ['operative', 'archive'] })).toBe(true);
    expect(evaluateLock(lock, { calculation: 180, selected: ['operative', 'archive', 'spare'] })).toBe(true);
    expect(evaluateLock(lock, { calculation: 180, selected: ['operative', 'archive', 'spare', 'tools'] })).toBe(false);
    expect(evaluateLock(lock, { calculation: 240, selected: ['operative', 'archive'] })).toBe(false);
    expect(evaluateLock(lock, { calculation: 180, selected: ['tools'] })).toBe(false);
  });
  it('requires every classified object and the exact plotted route', () => {
    const sorting = mission.locks.find(l => l.type === 'sorting')!, route = mission.locks.find(l => l.type === 'map-route')!;
    expect(evaluateLock(sorting, { placements: { maize: 'new' } })).toBe(false);
    expect(evaluateLock(sorting, { placements: { ...sorting.matches, unknown: 'old' } })).toBe(false);
    expect(evaluateLock(route, { order: ['lisbon', 'caribbean', 'india'] })).toBe(false);
    expect(evaluateLock(route, solution(route))).toBe(true);
  });
});
describe('Gallery validation', () => {
  it.each(['missing evidence', 'no authentic painting', 'missing recovery', 'unreachable', 'cycle', 'invalid angle', 'unknown lock', 'impossible cargo', 'remote art'])('rejects %s before rendering', problem => {
    const m = structuredClone(data);
    if (problem === 'missing evidence') m.chambers[0].factIds = ['missing'];
    if (problem === 'no authentic painting') m.chambers[0].paintings.forEach(p => p.authentic = false);
    if (problem === 'missing recovery') m.chambers[0].paintings[0].fraud!.recoveryLockId = 'missing';
    if (problem === 'unreachable') delete m.chambers[0].next;
    if (problem === 'cycle') m.chambers.at(-1)!.next = m.entry;
    if (problem === 'invalid angle') m.locks.find(l => l.type === 'rotation')!.target = Number.NaN;
    if (problem === 'unknown lock') m.locks[0].type = 'unsupported';
    if (problem === 'impossible cargo') m.locks.find(l => l.type === 'cargo')!.capacity = 1;
    if (problem === 'remote art') m.environment = 'javascript:alert(1)';
    expect(() => requireGalleryMission(m)).toThrow(/INVALID_HEIST_GALLERY|CAPABILITY_NOT_INSTALLED/);
  });
});
