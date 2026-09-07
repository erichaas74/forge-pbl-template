import { inject } from '@angular/core';

import { IndexedDbAssetStorageAdapter } from '../../../infrastructure/storage/indexeddb-asset-storage.adapter';
import type {
  HistoryLiveEnrollment,
  HistoryLiveProjectConfig,
} from '../../../templates/history-live/domain/history-live.models';
import {
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_PERSISTENCE,
} from '../../../templates/history-live/persistence/history-live.persistence';
import { HistoryLiveRuntimeService } from '../../../templates/history-live/runtime/history-live-runtime.service';
import {
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_MEDIA,
} from '../../../templates/history-live/runtime/history-live.tokens';
import type { ProjectLaunchRequest, TemplateLauncher } from '../project-launch.contracts';

export const historyLiveLauncher: TemplateLauncher = {
  templateId: 'history-live-broadcast',
  async load(request: ProjectLaunchRequest) {
    const config = requireHistoryConfig(request.projectDefinition, request.project.id);
    const enrollment = previewEnrollment(request);
    const module = await import('../../../templates/history-live/ui/history-live-page.component');
    return {
      component: module.HistoryLivePageComponent,
      providers: [
        { provide: HISTORY_LIVE_CONFIG, useValue: config },
        { provide: HISTORY_LIVE_ENROLLMENT, useValue: enrollment },
        {
          provide: HISTORY_LIVE_PERSISTENCE,
          useFactory: () => new BrowserHistoryLivePersistenceAdapter(inject(HISTORY_LIVE_ENROLLMENT)),
        },
        {
          provide: HISTORY_LIVE_MEDIA,
          useFactory: () => {
            const context = inject(HISTORY_LIVE_ENROLLMENT);
            return new IndexedDbAssetStorageAdapter(
              JSON.stringify([
                context.tenantId,
                context.classId,
                context.studentId,
                config.projectId,
                config.projectVersion,
              ]),
            );
          },
        },
        HistoryLiveRuntimeService,
      ],
    };
  },
};

function previewEnrollment(request: ProjectLaunchRequest): HistoryLiveEnrollment {
  return {
    tenantId: request.session.tenantId,
    classId: request.session.classId ?? 'local-preview-class',
    studentId: request.session.studentId ?? request.session.actorId,
    studentDisplayName: request.session.actorDisplayName,
    teacherDisplayName: 'Preview producer',
    classLabel: 'Local demonstration',
    mode: 'demo',
    role: request.session.mode === 'teacher' ? 'producer' : 'student',
    permissions: request.session.permissions,
  };
}

function requireHistoryConfig(value: unknown, projectId: string): HistoryLiveProjectConfig {
  if (!isRecord(value) || value['projectId'] !== projectId || !Array.isArray(value['sources'])) {
    throw new Error(`Project "${projectId}" is not a valid history-live definition.`);
  }
  return value as unknown as HistoryLiveProjectConfig;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
