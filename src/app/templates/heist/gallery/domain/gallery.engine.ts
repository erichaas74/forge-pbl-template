import { evaluateLock } from './academic-locks';
import { buildGalleryAudit } from './gallery-audit';
import { initialEncounterState, transitionEncounter } from '../../../../shared/encounters/encounter.engine';
import type { EncounterState } from '../../../../shared/encounters/encounter.models';
import type { AcademicLock, GalleryCommandEnvelope, GalleryEvent, GalleryMission, GalleryPhase, GallerySnapshot, LockAnswer } from './gallery.models';

/** Deterministic local practice state. Phaser only presents snapshots; it never awards mastery. */
export class GalleryEngine {
  chamberId: string;
  phase: GalleryPhase = 'recon';
  paintingId?: string;
  readonly cleared: string[] = [];
  readonly frauds: string[] = [];
  readonly solved: string[] = [];
  readonly inspections: Record<string, string[]> = {};
  readonly evidenceRead: string[] = [];
  readonly facts: string[] = [];
  readonly mechanisms: Record<string, LockAnswer> = {};
  readonly events: GalleryEvent[] = [];
  readonly encounters: Record<string, EncounterState> = {};
  activeEncounterId?: string;
  defense: readonly string[] = [];
  private readonly seen = new Set<string>();
  constructor(readonly mission: GalleryMission) { this.chamberId = mission.entry; }
  get chamber() { return this.mission.chambers.find(chamber => chamber.id === this.chamberId)!; }
  get painting() { return this.chamber.paintings.find(painting => painting.id === this.paintingId); }
  get activeLocks(): readonly AcademicLock[] {
    const ids = this.phase === 'recovery' ? [this.painting?.fraud?.recoveryLockId] : this.phase === 'mechanism' ? this.chamber.lockIds : [];
    return ids.filter((id): id is string => !!id && !this.solved.includes(id)).map(id => this.mission.locks.find(lock => lock.id === id)!);
  }
  snapshot(): GallerySnapshot { return structuredClone({ chamberId: this.chamberId, phase: this.phase, paintingId: this.paintingId, cleared: this.cleared, frauds: this.frauds, solved: this.solved, mechanisms: this.mechanisms, ...(this.mission.encounters ? { encounters: this.encounters, activeEncounterId: this.activeEncounterId } : {}) }); }
  dispatch(envelope: GalleryCommandEnvelope): boolean {
    if (!envelope || typeof envelope.id !== 'string' || !envelope.id || this.seen.has(envelope.id) || !Number.isFinite(envelope.elapsed) || envelope.elapsed < 0 || envelope.elapsed < (this.events.at(-1)?.elapsed ?? 0) || this.events.length >= 1800) return false;
    const c = envelope.command;
    if (!c || typeof c !== 'object') return false;
    const chamberId = this.chamberId;
    let message = '', correct: boolean | undefined, runtimeEventType: string | undefined;
    if (this.activeEncounterId && c.type !== 'encounter' && c.type !== 'read') return false;
    if (c.type === 'encounter') {
      const definition = this.mission.encounters?.find(e => e.id === c.encounterId);
      if (!definition || !c.action || typeof c.action !== 'object') return false;
      if (c.action.type === 'enter') {
        if (this.activeEncounterId || !definition.chamberIds.some(id => id === this.chamberId || this.cleared.includes(id))) return false;
      } else if (this.activeEncounterId !== definition.id) return false;
      const previous = this.encounters[definition.id] ?? initialEncounterState(definition);
      const result = transitionEncounter(definition, previous, c.action);
      if (!result) return false;
      this.encounters[definition.id] = result.state;
      if (c.action.type === 'enter') this.activeEncounterId = definition.id;
      if (c.action.type === 'exit') this.activeEncounterId = undefined;
      if (result.correct && !previous.insightEarned) this.addFacts([definition.insight.answerEvidenceId]);
      message = result.message; correct = result.correct; runtimeEventType = result.eventType;
    } else if (c.type === 'inspect') {
      const painting = this.chamber.paintings.find(p => p.id === c.paintingId);
      const hotspot = painting?.hotspots.find(h => h.id === c.hotspotId);
      if (!hotspot || this.phase === 'extracted') return false;
      const seen = this.inspections[c.paintingId] ??= [];
      if (seen.includes(c.hotspotId)) return false;
      seen.push(c.hotspotId); message = `Inspected ${hotspot.label}.`;
    } else if (c.type === 'choose') {
      const painting = this.chamber.paintings.find(p => p.id === c.paintingId);
      if (this.phase !== 'recon' || !painting || this.frauds.includes(painting.id)) return false;
      if (!(this.inspections[painting.id]?.length)) return false;
      this.paintingId = painting.id; correct = painting.authentic;
      this.phase = correct ? 'mechanism' : 'fraud';
      if (correct) this.addFacts(this.chamber.factIds);
      message = correct ? 'Painting authenticated. Operate the passage mechanism.' : 'The passage catches. Inspect the detail and explain the historical impossibility.';
    } else if (c.type === 'classify') {
      const fraud = this.painting?.fraud;
      if (this.phase !== 'fraud' || !fraud || !this.inspections[this.paintingId!]?.includes(c.hotspotId)) return false;
      correct = fraud.category === c.category && fraud.hotspotId === c.hotspotId;
      if (correct) this.phase = 'recovery';
      message = correct ? `${fraud.explanation} Repair the related mechanism to return to the junction.` : 'That category and detail do not establish the fraud. Consult the field notes and inspect again.';
    } else if (c.type === 'operate') {
      const lock = this.activeLocks.find(l => l.id === c.lockId);
      if (!lock || !c.answer || typeof c.answer !== 'object' || !this.validAnswer(c.answer)) return false;
      correct = evaluateLock(lock, c.answer);
      this.mechanisms[lock.id] = structuredClone(c.answer);
      message = correct ? lock.consequence : 'The mechanism moved to your setting, but it does not align. Recheck the evidence and try again.';
      if (correct) {
        this.solved.push(lock.id); this.addFacts(lock.evidenceIds);
        if (this.phase === 'recovery') {
          this.frauds.push(this.paintingId!); this.paintingId = undefined; this.phase = 'recon';
          message += ' Fraud sealed; return to the three passages.';
        } else if (!this.activeLocks.length) { this.phase = 'unlocked'; message += ' The authenticated passage is open.'; }
      }
    } else if (c.type === 'continue') {
      if (this.phase !== 'unlocked') return false;
      this.cleared.push(this.chamberId);
      const next = this.chamber.next;
      if (next) { this.chamberId = next; this.phase = 'recon'; this.paintingId = undefined; message = `Entered ${this.chamber.title}.`; }
      else { this.phase = 'extracted'; message = 'The collection is safe. Historical Authentication Dossier ready.'; }
    } else if (c.type === 'read') {
      const evidence = this.mission.evidence.find(e => e.id === c.evidenceId);
      if (!evidence || this.evidenceRead.includes(evidence.id)) return false;
      this.evidenceRead.push(evidence.id); message = `Consulted ${evidence.title}.`;
    } else if (c.type === 'defend') {
      if (this.phase !== 'extracted' || !Array.isArray(c.responses) || c.responses.length !== this.mission.defensePrompts.length || c.responses.some(r => typeof r !== 'string' || r.length > 4000)) return false;
      this.defense = [...c.responses]; message = 'Defense saved in the authentication dossier.';
    } else return false;
    this.seen.add(envelope.id);
    this.events.push({ ...envelope, chamberId, type: c.type, command: structuredClone(c), message, correct, snapshot: this.snapshot(), ...(runtimeEventType ? { runtimeEventType } : {}) });
    return true;
  }
  private addFacts(ids: readonly string[]): void { for (const id of ids) if (!this.facts.includes(id)) this.facts.push(id); }
  private validAnswer(answer: LockAnswer): boolean {
    return (answer.calculation === undefined || Number.isFinite(answer.calculation)) && (answer.setting === undefined || Number.isFinite(answer.setting))
      && [answer.order, answer.selected].every(list => list === undefined || Array.isArray(list) && list.length <= 30 && list.every(id => typeof id === 'string'))
      && (answer.placements === undefined || !!answer.placements && typeof answer.placements === 'object' && !Array.isArray(answer.placements) && Object.keys(answer.placements).length <= 30 && Object.values(answer.placements).every(id => typeof id === 'string'));
  }
  encounterRecords() {
    return (this.mission.encounters ?? []).filter(e => this.encounters[e.id]).map(e => ({
        encounterId: e.id, title: e.title, location: e.location, attribution: e.attribution,
        state: structuredClone(this.encounters[e.id]),
        chapters: e.chapters.filter(c => this.encounters[e.id].chapters.includes(c.id)),
        questions: e.questions.filter(q => this.encounters[e.id].questions.includes(q.id)),
        observations: e.object.features.filter(f => this.encounters[e.id].features.includes(f.id)),
        insight: this.encounters[e.id].insightEarned ? { claim: e.insight.claim, relationship: e.insight.relationship, explanation: e.insight.explanation, source: this.mission.evidence.find(s => s.id === e.insight.answerEvidenceId) } : undefined,
      }));
  }
  dossier() {
    const audit = buildGalleryAudit(this);
    return { title: 'Historical Authentication Dossier', projectId: this.mission.projectId, projectVersion: this.mission.projectVersion,
      authority: 'local-practice', complete: this.phase === 'extracted', route: [...this.cleared],
      authenticPaintings: this.events.filter(e => e.type === 'choose' && e.correct).map(e => ({ chamberId: e.chamberId, painting: this.mission.chambers.find(c => c.id === e.chamberId)!.paintings.find(p => p.id === e.snapshot.paintingId) })),
      frauds: this.mission.chambers.flatMap(c => c.paintings.filter(p => this.frauds.includes(p.id)).map(p => ({ paintingId: p.id, title: p.title, ...p.fraud }))),
      inspections: structuredClone(this.inspections), evidenceConsulted: this.mission.evidence.filter(e => this.evidenceRead.includes(e.id)),
      clueLog: audit.clues, vaultAudit: { chamberId: audit.chamberId, steps: audit.steps, locks: audit.locks, route: audit.route },
      encounterRecords: this.encounterRecords(),
      confirmedEvidence: this.mission.evidence.filter(e => this.facts.includes(e.id)),
      attempts: this.events.filter(e => ['choose', 'classify', 'operate'].includes(e.type)),
      elapsedSeconds: this.events.at(-1)?.elapsed ?? 0, finalVault: this.cleared.includes(this.mission.chambers.find(c => !c.next)!.id),
      defense: this.mission.defensePrompts.map((prompt, i) => ({ prompt, response: this.defense[i] ?? '' })), events: this.events };
  }
}
