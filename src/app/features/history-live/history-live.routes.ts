import type { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { IndexedDbAssetStorageAdapter } from '../../infrastructure/storage/indexeddb-asset-storage.adapter';

import { historyLiveRevolutionaryWarConfig } from '../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config';
import {
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_PERSISTENCE,
} from '../../templates/history-live/persistence/history-live.persistence';
import { HistoryLiveRuntimeService } from '../../templates/history-live/runtime/history-live-runtime.service';
import {
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_MEDIA,
} from '../../templates/history-live/runtime/history-live.tokens';

export const HISTORY_LIVE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: HISTORY_LIVE_CONFIG, useValue: historyLiveRevolutionaryWarConfig },
      {
        provide: HISTORY_LIVE_ENROLLMENT,
        useValue: {
          tenantId: 'demo',
          classId: 'local-preview',
          studentId: 'demo-reporter',
          studentDisplayName: 'Demo reporter',
          teacherDisplayName: 'Demo producer',
          classLabel: 'Local demonstration',
          mode: 'demo',
          role: 'student',
          permissions: [],
        },
      },
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
              historyLiveRevolutionaryWarConfig.projectId,
              historyLiveRevolutionaryWarConfig.projectVersion,
            ]),
          );
        },
      },
      HistoryLiveRuntimeService,
    ],
    loadComponent: () =>
      import('../../templates/history-live/ui/history-live-page.component').then(
        (module) => module.HistoryLivePageComponent,
      ),
  },
];
