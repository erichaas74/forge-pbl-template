import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { CompetitionRequest } from '../domain/competition.models';

export interface CompetitionPersistence {
  load(): CompetitionRequest[];
  append(request: CompetitionRequest, expectedRevision: number): void;
}
export const COMPETITION_PERSISTENCE = new InjectionToken<CompetitionPersistence>('Competition persistence');
/** Local rehearsal storage. Does not claim cross-device synchronization or server authority. */
export class BrowserCompetitionPersistence implements CompetitionPersistence {
  private readonly key: string;
  constructor(session: ProjectSessionContext, private readonly fingerprint: string) {
    this.key = 'forge:competition:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId,
      session.projectVersion, session.actorId, session.attemptId]);
  }
  load(): CompetitionRequest[] {
    const raw = localStorage.getItem(this.key);
    if (!raw) return [];
    const saved = JSON.parse(raw) as { fingerprint: string; events: CompetitionRequest[] };
    if (!saved || saved.fingerprint !== this.fingerprint || !Array.isArray(saved.events) || saved.events.length > 2000)
      throw new Error('SAVED_COMPETITION_INVALID: Saved rehearsal does not match this package.');
    return saved.events;
  }
  append(request: CompetitionRequest, expectedRevision: number): void {
    const events = this.load();
    if (events.some(e => e.id === request.id)) return;
    if (events.length !== expectedRevision) throw new Error('STATE_CONFLICT: This rehearsal changed in another tab. Reload to continue.');
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, events: [...events, request] }));
  }
}
