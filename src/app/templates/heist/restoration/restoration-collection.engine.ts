import { initialRestoration, selectedRepair, transitionRestoration } from '../../../shared/restoration/restoration.engine';
import { initialEncounterState, transitionEncounter } from '../../../shared/encounters/encounter.engine';
import { evaluateLock } from '../gallery/domain/academic-locks';
import type { LockAnswer } from '../gallery/domain/gallery.models';
import type { CollectionCommand, CollectionEnvelope, CollectionEvent, CollectionState, RestorationMission } from './restoration-collection.models';
const initial = (): CollectionState => ({ works: {}, encounters: {}, sourcesRead: [], heistStarted: false, solvedLocks: [], answers: {}, extracted: false, museumLabel: '' });
type Result = { state: CollectionState; message: string; eventType: string };
type Handlers = { [K in CollectionCommand['type']]: (m: RestorationMission, s: CollectionState, c: Extract<CollectionCommand, { type: K }>) => Result | undefined };
export const collectionReady = (m: RestorationMission, s: CollectionState) => m.works.every(w => s.works[w.id]?.verified);
function validAnswer(a: LockAnswer): boolean {
  return !!a && typeof a === 'object' && (a.calculation === undefined || Number.isFinite(a.calculation)) && (a.setting === undefined || Number.isFinite(a.setting))
    && [a.order, a.selected].every(x => x === undefined || Array.isArray(x) && x.length <= 30 && x.every(id => typeof id === 'string'))
    && (a.placements === undefined || !!a.placements && typeof a.placements === 'object' && !Array.isArray(a.placements) && Object.keys(a.placements).length <= 30 && Object.values(a.placements).every(id => typeof id === 'string'));
}
export const collectionActions: Handlers = {
  open: (m, s, c) => {
    if (!m.works.some(w => w.id === c.workId) || s.workId === c.workId) return;
    return { state: { ...s, workId: c.workId, works: { ...s.works, [c.workId]: s.works[c.workId] ?? initialRestoration() } }, message: 'Opened restoration commission.', eventType: 'activity.started' };
  },
  repair: (m, s, c) => {
    const work = m.works.find(w => w.id === c.workId); if (!work || s.workId !== work.id || s.heistStarted) return;
    const result = transitionRestoration(work, s.works[work.id] ?? initialRestoration(), c.action); if (!result) return;
    return { ...result, state: { ...s, works: { ...s.works, [work.id]: result.state } } };
  },
  read: (m, s, c) => {
    if (s.sourcesRead.includes(c.evidenceId) || !m.sourceGallery.evidence.some(e => e.id === c.evidenceId)) return;
    return { state: { ...s, sourcesRead: [...s.sourcesRead, c.evidenceId] }, message: 'Consulted a reference.', eventType: 'evidence.viewed' };
  },
  encounter: (m, s, c) => {
    const d = m.sourceGallery.encounters?.find(e => e.id === c.encounterId), work = m.works.find(w => w.id === s.workId);
    if (!d || !c.action || typeof c.action !== 'object') return;
    if (c.action.type === 'enter' ? s.activeEncounterId || work?.encounterId !== d.id : s.activeEncounterId !== d.id) return;
    const result = transitionEncounter(d, s.encounters[d.id] ?? initialEncounterState(d), c.action); if (!result) return;
    return { ...result, state: { ...s, encounters: { ...s.encounters, [d.id]: result.state }, activeEncounterId: c.action.type === 'exit' ? undefined : d.id } };
  },
  'start-heist': (m, s) => {
    if (s.heistStarted || !collectionReady(m, s)) return;
    return { state: { ...s, heistStarted: true }, message: 'The restoration ledger is ready. Use it to recover the collection.', eventType: 'phase.completed' };
  },
  operate: (m, s, c) => {
    const id = m.finalLockIds.find(id => !s.solvedLocks.includes(id)), lock = m.sourceGallery.locks.find(l => l.id === id);
    if (!s.heistStarted || s.extracted || !collectionReady(m, s) || c.lockId !== id || !lock || !validAnswer(c.answer)) return;
    const correct = evaluateLock(lock, c.answer);
    return { state: { ...s, answers: { ...s.answers, [id!]: structuredClone(c.answer) }, solvedLocks: correct ? [...s.solvedLocks, id!] : s.solvedLocks }, message: correct ? lock.consequence : 'The mechanism needs another adjustment. Consult your references and try again.', eventType: 'activity.resultSubmitted' };
  },
  extract: (m, s) => {
    if (!s.heistStarted || s.extracted || !collectionReady(m, s) || !m.finalLockIds.every(id => s.solvedLocks.includes(id))) return;
    return { state: { ...s, extracted: true }, message: 'Collection recovered. Your reconstructions and evidence tell its story.', eventType: 'finalSubmission.submitted' };
  },
  'museum-label': (_m, s, c) => {
    if (typeof c.text !== 'string' || c.text.length > 4000 || c.text === s.museumLabel) return;
    return { state: { ...s, museumLabel: c.text }, message: 'Museum label saved.', eventType: 'evidence.annotationAdded' };
  },
};
export class RestorationCollectionEngine {
  state = initial(); readonly events: CollectionEvent[] = []; private readonly seen = new Set<string>();
  constructor(readonly mission: RestorationMission) {}
  dispatch(e: CollectionEnvelope): boolean {
    if (!e || typeof e.id !== 'string' || !e.id || this.seen.has(e.id) || !Number.isFinite(e.elapsed) || e.elapsed < (this.events.at(-1)?.elapsed ?? 0) || this.events.length >= 2400 || !e.command || typeof e.command !== 'object' || !Object.hasOwn(collectionActions, e.command.type)) return false;
    if (this.state.activeEncounterId && !['encounter', 'read'].includes(e.command.type)) return false;
    const handler = collectionActions[e.command.type] as (m: RestorationMission, s: CollectionState, c: CollectionCommand) => Result | undefined;
    const result = handler(this.mission, this.state, e.command); if (!result) return false;
    this.state = result.state; this.seen.add(e.id); this.events.push({ ...structuredClone(e), message: result.message, eventType: result.eventType }); return true;
  }
  dossier() {
    return { projectId: this.mission.projectId, projectVersion: this.mission.projectVersion, title: this.mission.title, authority: 'local-practice', complete: this.state.extracted, restorationComplete: collectionReady(this.mission, this.state), museumLabel: this.state.museumLabel,
      works: this.mission.works.map(work => { const state = this.state.works[work.id] ?? initialRestoration(); return { id: work.id, title: work.title, date: work.date, location: work.location, image: work.image, attribution: work.attribution, verified: state.verified, reflectionReview: 'Teacher review not recorded', submissions: state.submissions,
        repairs: work.regions.map(region => ({ regionId: region.id, title: region.title, originalClaim: region.claim, original: region.options.find(o => o.id === region.originalOptionId), restored: selectedRepair(region, state), note: state.notes[region.id], source: this.mission.sourceGallery.evidence.find(e => e.id === state.notes[region.id]?.evidenceId) })) }; }),
      encounters: (this.mission.sourceGallery.encounters ?? []).filter(d => this.state.encounters[d.id]).map(d => ({ id: d.id, title: d.title, attribution: d.attribution, state: this.state.encounters[d.id], chapters: d.chapters.filter(c => this.state.encounters[d.id].chapters.includes(c.id)), questions: d.questions.filter(q => this.state.encounters[d.id].questions.includes(q.id)), insight: this.state.encounters[d.id].insightEarned ? d.insight : undefined })),
      finalHeist: { started: this.state.heistStarted, solvedLocks: this.state.solvedLocks, answers: this.state.answers, extracted: this.state.extracted }, events: this.events };
  }
}
