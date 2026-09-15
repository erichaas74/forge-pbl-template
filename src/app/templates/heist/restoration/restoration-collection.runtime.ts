import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { RestorationCollectionEngine } from './restoration-collection.engine';
import type { CollectionCommand, CollectionEnvelope, CollectionState, RestorationMission } from './restoration-collection.models';
export const RESTORATION_MISSION = new InjectionToken<RestorationMission>('RESTORATION_MISSION');
export interface RestorationPersistence { load(): readonly CollectionEnvelope[]; save(history: readonly CollectionEnvelope[], snapshot: CollectionState): void }
export const RESTORATION_PERSISTENCE = new InjectionToken<RestorationPersistence>('RESTORATION_PERSISTENCE');
export class LocalRestorationAdapter implements RestorationPersistence {
  readonly key: string; private readonly signature: string;
  constructor(session: ProjectSessionContext, mission: RestorationMission) {
    this.key = 'forge:heist:restoration:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
    // Optional authoring content does not change the assessed collection's saved rules.
    const { previewWeeks: _preview, ...assessedMission } = mission;
    this.signature = JSON.stringify(assessedMission);
  }
  load(): readonly CollectionEnvelope[] {
    const raw = localStorage.getItem(this.key); if (!raw) return [];
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !('signature' in saved) || saved.signature !== this.signature || !('history' in saved) || !Array.isArray(saved.history) || saved.history.length > 2400) throw new Error('Saved restoration does not match this collection. Export existing work before starting another practice.');
    return saved.history as CollectionEnvelope[];
  }
  save(history: readonly CollectionEnvelope[], snapshot: CollectionState): void { localStorage.setItem(this.key, JSON.stringify({ signature: this.signature, history, snapshot })); }
}
@Injectable()
export class RestorationCollectionRuntime {
  readonly mission = inject(RESTORATION_MISSION); private readonly persistence = inject(RESTORATION_PERSISTENCE);
  engine = new RestorationCollectionEngine(this.mission); readonly revision = signal(0); readonly warning = signal(''); readonly blocked = signal(false);
  private history: CollectionEnvelope[] = []; private epoch = Date.now();
  constructor() {
    try { const history = this.persistence.load(); for (const e of history) if (!this.engine.dispatch(e)) throw new Error('Saved restoration contains an invalid action. Start another practice to replace it.'); this.history = [...history]; this.epoch -= (history.at(-1)?.elapsed ?? 0) * 1000; }
    catch (e) { this.engine = new RestorationCollectionEngine(this.mission); this.blocked.set(true); this.warning.set(e instanceof Error ? e.message : 'Saved restoration could not load.'); }
  }
  send(command: CollectionCommand): boolean {
    if (this.blocked()) return false;
    if (this.history.length >= 2400) { this.warning.set('This local practice has reached its saved-action limit. Download your ledger and exhibition before starting another practice.'); return false; }
    const e = { id: crypto.randomUUID(), elapsed: Math.max(this.history.at(-1)?.elapsed ?? 0, (Date.now() - this.epoch) / 1000), command };
    if (!this.engine.dispatch(e)) return false; this.history.push(e); this.revision.update(n => n + 1); this.retrySave(); return true;
  }
  retrySave(): void { if (this.blocked()) return; try { this.persistence.save(this.history, this.engine.state); this.warning.set(''); } catch { this.warning.set('Browser storage is unavailable. Your changes are here; download the ledger before leaving.'); } }
  reset(): void { this.engine = new RestorationCollectionEngine(this.mission); this.history = []; this.epoch = Date.now(); this.blocked.set(false); this.revision.update(n => n + 1); this.retrySave(); }
}
