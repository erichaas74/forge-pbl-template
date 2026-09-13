import data from '../../../../../../public/projects/shadow-gallery/project.json';
import { buildGalleryAudit } from './gallery-audit';
import { GalleryEngine } from './gallery.engine';
import { requireGalleryMission } from './gallery.validation';
import type { AcademicLock, GalleryCommand, LockAnswer } from './gallery.models';

const mission = requireGalleryMission(data);
function send(engine: GalleryEngine, command: GalleryCommand) {
  const n = engine.events.length + 1;
  expect(engine.dispatch({ id: `event-${n}`, elapsed: n, command })).toBe(true);
}
function solution(lock: AcademicLock): LockAnswer {
  return { calculation: lock.target ?? lock.capacity, setting: lock.target, placements: lock.matches, order: lock.solution, selected: lock.requiredItems ?? lock.solution };
}
describe('Gallery clue log and vault audit', () => {
  it('keeps uninspected details and fraud solutions out of the log until analysis succeeds', () => {
    const engine = new GalleryEngine(mission), painting = engine.chamber.paintings[0];
    expect(buildGalleryAudit(engine).clues).toEqual([]);
    send(engine, { type: 'inspect', paintingId: painting.id, hotspotId: painting.hotspots[1].id });
    let audit = buildGalleryAudit(engine);
    expect(audit.clues[0].details.map(d => d.label)).toEqual(['Setting inscription']);
    expect(audit.clues[0].explanation).toBeUndefined();
    expect(audit.clues[0].category).toBeUndefined();
    send(engine, { type: 'choose', paintingId: painting.id });
    send(engine, { type: 'classify', category: 'animal-plant', hotspotId: painting.hotspots[1].id });
    expect(buildGalleryAudit(engine).fraudCount).toBe(0);
    send(engine, { type: 'inspect', paintingId: painting.id, hotspotId: painting.fraud!.hotspotId });
    send(engine, { type: 'classify', category: painting.fraud!.category, hotspotId: painting.fraud!.hotspotId });
    audit = buildGalleryAudit(engine);
    expect(audit.fraudCount).toBe(1); expect(audit.sealedCount).toBe(0);
    expect(audit.clues[0].status).toBe('Fraud identified · repair pending');
    expect(audit.clues[0].explanation).toBe(painting.fraud!.explanation);
    expect(audit.steps[1].complete).toBe(false);
    send(engine, { type: 'operate', lockId: engine.activeLocks[0].id, answer: solution(engine.activeLocks[0]) });
    expect(buildGalleryAudit(engine).clues[0].status).toBe('Fraud sealed');
    expect(buildGalleryAudit(engine).sealedCount).toBe(1);
    expect(buildGalleryAudit(engine).locks.every(l => !l.complete)).toBe(true);
  });
  it('retains discovery order across rooms, exports the log, and reconstructs it from saved decisions', () => {
    const engine = new GalleryEngine(mission), [fraud, authentic] = engine.chamber.paintings;
    for (const p of [authentic, fraud]) send(engine, { type: 'inspect', paintingId: p.id, hotspotId: p.hotspots[0].id });
    send(engine, { type: 'choose', paintingId: authentic.id });
    while (engine.activeLocks.length) send(engine, { type: 'operate', lockId: engine.activeLocks[0].id, answer: solution(engine.activeLocks[0]) });
    expect(buildGalleryAudit(engine).steps[3].complete).toBe(false);
    send(engine, { type: 'continue' });
    const next = engine.chamber.paintings[0];
    send(engine, { type: 'inspect', paintingId: next.id, hotspotId: next.hotspots[0].id });
    const before = JSON.stringify(engine.events), audit = buildGalleryAudit(engine);
    expect(audit.clues.map(c => c.paintingId)).toEqual([authentic.id, fraud.id, next.id]);
    expect(audit.clues[0].status).toBe('Scene authenticated');
    expect(audit.clues[1].status).toBe('Inspected · unverified');
    expect(engine.dossier().clueLog).toEqual(audit.clues);
    expect(JSON.stringify(engine.events)).toBe(before);
    const restored = new GalleryEngine(mission);
    for (const event of engine.events) expect(restored.dispatch(event)).toBe(true);
    expect(buildGalleryAudit(restored)).toEqual(audit);
  });
  it('steps through all final locks and waits for extraction before marking the audit complete', () => {
    const engine = new GalleryEngine(mission);
    for (const room of mission.chambers) {
      const p = room.paintings.find(p => p.authentic)!;
      send(engine, { type: 'inspect', paintingId: p.id, hotspotId: p.hotspots[0].id });
      send(engine, { type: 'choose', paintingId: p.id });
      for (const id of room.lockIds) {
        expect(buildGalleryAudit(engine).locks.find(l => l.current)?.id).toBe(id);
        send(engine, { type: 'operate', lockId: id, answer: solution(engine.activeLocks[0]) });
      }
      expect(buildGalleryAudit(engine).complete).toBe(false);
      expect(buildGalleryAudit(engine).currentStep).toBe(3);
      send(engine, { type: 'continue' });
    }
    const audit = buildGalleryAudit(engine);
    expect(audit.complete).toBe(true); expect(audit.currentStep).toBe(-1);
    expect(audit.route.every(r => r.complete && !r.current)).toBe(true);
    expect(audit.fraudCount).toBe(0);
  });
  it('derives guidance from another configuration without curriculum identity checks', () => {
    const changed = { ...mission, projectId: 'archive-review', title: 'Archive review', chambers: mission.chambers.map(c => ({ ...c, title: `Review ${c.id}`, date: 'Reference date', location: 'Reference place' })) };
    const engine = new GalleryEngine(changed), audit = buildGalleryAudit(engine);
    expect(audit.chamber).toBe('Review shore');
    expect(audit.date).toBe('Reference date'); expect(audit.location).toBe('Reference place');
    expect(audit.route.map(r => r.title)).toEqual(changed.chambers.map(c => c.title));
  });
});
