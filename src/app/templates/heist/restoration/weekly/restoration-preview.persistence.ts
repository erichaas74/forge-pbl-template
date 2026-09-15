import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import type { RestorationMission } from '../restoration-collection.models';
import type { RestorationPreviewState } from './restoration-preview.models';
import { requirePreviewState } from './restoration-preview.validation';

export const RESTORATION_PREVIEW_SESSION = new InjectionToken<ProjectSessionContext>('RESTORATION_PREVIEW_SESSION');
export interface RestorationPreviewPersistence { load(): RestorationPreviewState | undefined; save(state: RestorationPreviewState): void }
export const RESTORATION_PREVIEW_PERSISTENCE = new InjectionToken<RestorationPreviewPersistence>('RESTORATION_PREVIEW_PERSISTENCE');
export class LocalRestorationPreviewAdapter implements RestorationPreviewPersistence {
  readonly key: string;
  constructor(session: ProjectSessionContext, private readonly mission: RestorationMission) {
    this.key = 'forge:restoration:weekly:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
  }
  load(): RestorationPreviewState | undefined {
    const raw = localStorage.getItem(this.key);
    return raw === null ? undefined : requirePreviewState(JSON.parse(raw), this.mission);
  }
  save(state: RestorationPreviewState): void { localStorage.setItem(this.key, JSON.stringify(state)); }
}
