import type { GalleryEngine } from './gallery.engine';
import type { FraudCategory } from './gallery.models';

const categories: Record<FraudCategory, string> = {
  timeline: 'Wrong timeline', 'animal-plant': 'Wrong animal / plant',
  people: 'Wrong group of people', technology: 'Wrong technology',
};

/** Read-only projection of earned discoveries. Opening the audit never advances practice. */
export function buildGalleryAudit(engine: GalleryEngine) {
  const { mission, chamber } = engine;
  const authenticated = new Set(engine.events.filter(e => e.type === 'choose' && e.correct).map(e => e.snapshot.paintingId));
  const identified = new Set(engine.events.filter(e => e.type === 'classify' && e.correct).map(e => e.snapshot.paintingId));
  const inspectedIds = [...new Set(engine.events.flatMap(e => e.command.type === 'inspect' ? [e.command.paintingId] : []))];
  const clues = inspectedIds.flatMap(id => mission.chambers.flatMap(room => room.paintings.filter(p => p.id === id).map(p => {
    const fraudKnown = identified.has(p.id) || engine.frauds.includes(p.id);
    const recovery = fraudKnown ? mission.locks.find(l => l.id === p.fraud?.recoveryLockId) : undefined;
    const evidenceIds = new Set([...room.factIds, ...(recovery?.evidenceIds ?? [])]);
    return {
      paintingId: p.id, chamberId: room.id, chamber: room.title, title: p.title,
      passage: ['I', 'II', 'III'][room.paintings.indexOf(p)], caption: p.caption,
      details: p.hotspots.filter(h => engine.inspections[p.id]?.includes(h.id)).map(h => ({ id: h.id, label: h.label, detail: h.detail })),
      status: engine.frauds.includes(p.id) ? 'Fraud sealed' : fraudKnown ? 'Fraud identified · repair pending' : authenticated.has(p.id) ? 'Scene authenticated' : engine.paintingId === p.id && engine.phase === 'fraud' ? 'Analysis needed' : 'Inspected · unverified',
      category: fraudKnown && p.fraud ? categories[p.fraud.category] : undefined,
      explanation: fraudKnown ? p.fraud?.explanation : undefined,
      recovery: recovery ? { title: recovery.title, complete: engine.solved.includes(recovery.id) } : undefined,
      evidence: mission.evidence.filter(e => evidenceIds.has(e.id)),
    };
  })));
  const sceneAuthenticated = chamber.paintings.some(p => authenticated.has(p.id));
  const inspected = chamber.paintings.some(p => !!engine.inspections[p.id]?.length);
  const locks = chamber.lockIds.map(id => mission.locks.find(l => l.id === id)!).map(l => ({ id: l.id, title: l.title, prompt: l.prompt, complete: engine.solved.includes(l.id), current: engine.activeLocks[0]?.id === l.id }));
  const steps = [
    { title: 'Inspect a marked detail', detail: 'Compare the detail and setting inscription with the field notes.', complete: inspected },
    { title: 'Authenticate a scene', detail: 'Choose its passage. If it catches, identify the fraud and repair its lock, then compare the remaining paintings.', complete: sceneAuthenticated },
    { title: 'Operate the passage mechanisms', detail: 'Complete each mechanism below. For numeric locks, both the calculation and the physical setting must agree.', complete: locks.every(l => l.complete) },
    { title: chamber.next ? 'Enter the next gallery' : 'Recover the collection', detail: 'Use the open passage to record this gallery as cleared.', complete: engine.cleared.includes(chamber.id) },
  ];
  return {
    chamberId: chamber.id, chamber: chamber.title, date: chamber.date, location: chamber.location,
    phase: engine.phase, complete: engine.phase === 'extracted',
    steps, currentStep: steps.findIndex(s => !s.complete), locks,
    activeLock: engine.activeLocks[0] ? { title: engine.activeLocks[0].title, prompt: engine.activeLocks[0].prompt } : undefined,
    evidence: mission.evidence.filter(e => chamber.factIds.includes(e.id)), clues,
    fraudCount: clues.filter(c => !!c.explanation).length, sealedCount: engine.frauds.length,
    encounters: engine.encounterRecords(),
    route: mission.chambers.map(c => ({ id: c.id, title: c.title, complete: engine.cleared.includes(c.id), current: c.id === chamber.id && engine.phase !== 'extracted' })),
  };
}

export type GalleryAudit = ReturnType<typeof buildGalleryAudit>;
