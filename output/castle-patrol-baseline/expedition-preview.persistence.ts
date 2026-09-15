import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import type { EscapeMission } from '../domain/escape.models';
import type { ExpeditionPreviewSnapshot } from './expedition-preview.models';
import { acceptsPistonUpgrade } from '../balance-lock/balance-lock.migration';

export const EXPEDITION_PREVIEW_SESSION = new InjectionToken<ProjectSessionContext>(
  'EXPEDITION_PREVIEW_SESSION',
);
export interface ExpeditionPreviewPersistence {
  load(): unknown;
  save(snapshot: ExpeditionPreviewSnapshot): void;
}
export const EXPEDITION_PREVIEW_PERSISTENCE = new InjectionToken<ExpeditionPreviewPersistence>(
  'EXPEDITION_PREVIEW_PERSISTENCE',
);

/** Same actor/attempt scope as the escape adapter, with separate snapshot storage. */
export class LocalExpeditionPreviewAdapter implements ExpeditionPreviewPersistence {
  private readonly key: string;
  private readonly fingerprint: string;
  constructor(session: ProjectSessionContext, mission: EscapeMission) {
    if (session.mode !== 'preview' || session.authorityMode !== 'localDemo')
      throw new Error('PERMISSION_DENIED: local authoring preview required');
    this.key =
      'forge:heist:expedition-preview:1:' +
      JSON.stringify([
        session.tenantId,
        session.classId,
        session.projectId,
        session.projectVersion,
        session.actorId,
        session.teamId,
        session.attemptId,
      ]);
    this.fingerprint = JSON.stringify(mission.steps);
  }
  load(): unknown {
    const raw = localStorage.getItem(this.key);
    if (!raw) return undefined;
    const value: unknown = JSON.parse(raw);
    if (
      !value ||
      typeof value !== 'object' ||
      !('fingerprint' in value) ||
      typeof value.fingerprint !== 'string' ||
      (value.fingerprint !== this.fingerprint &&
        !acceptsPistonUpgrade(value.fingerprint, this.fingerprint)) ||
      !('snapshot' in value)
    )
      throw new Error('STATE_CONFLICT: preview settings do not match this package');
    return value.snapshot;
  }
  save(snapshot: ExpeditionPreviewSnapshot): void {
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, snapshot }));
  }
}
