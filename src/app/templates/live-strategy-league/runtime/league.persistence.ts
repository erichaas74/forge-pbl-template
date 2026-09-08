import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { LeagueSnapshot } from '../domain/league.models';

export interface LeaguePersistence {
  load(): LeagueSnapshot | null;
  save(snapshot: LeagueSnapshot, expectedRevision: number): void;
}
export const LEAGUE_PERSISTENCE = new InjectionToken<LeaguePersistence>('League practice persistence');

/** Local practice only. A production adapter must enforce membership and commands on a server. */
export class BrowserLeaguePersistence implements LeaguePersistence {
  private readonly key: string;
  constructor(session: ProjectSessionContext) {
    this.key = 'forge:league:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId,
      session.projectVersion, session.actorId, session.attemptId]);
  }
  load(): LeagueSnapshot | null {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    const state = JSON.parse(raw) as LeagueSnapshot;
    if (state.schemaVersion !== 1 || !Number.isInteger(state.revision) || !Array.isArray(state.teams) || !Array.isArray(state.history))
      throw new Error('Saved practice could not be read.');
    return state;
  }
  save(snapshot: LeagueSnapshot, expectedRevision: number): void {
    const current = this.load();
    if (current && current.revision !== expectedRevision)
      throw new Error('Practice changed in another tab. Reload to continue.');
    localStorage.setItem(this.key, JSON.stringify(snapshot));
  }
}
