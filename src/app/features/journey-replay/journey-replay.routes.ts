import { inject } from '@angular/core';
import type { Routes } from '@angular/router';

import { IndexedDbAssetStorageAdapter } from '../../infrastructure/storage/indexeddb-asset-storage.adapter';
import {
  HttpJourneyReplayAuthorityAdapter,
  HttpJourneyReplayMediaAdapter,
} from '../../infrastructure/journey-replay/http-journey-replay.adapters';
import { ageOfExplorationJourneyConfig } from '../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { BrowserJourneyReplayPersistenceAdapter } from '../../templates/journey-replay/persistence/journey-replay.persistence';
import { JourneyReplayRuntimeService } from '../../templates/journey-replay/runtime/journey-replay-runtime.service';
import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE,
} from '../../templates/journey-replay/runtime/journey-replay.tokens';
import { journeyAuthorityLocator } from '../../templates/journey-replay/persistence/journey-replay.authority';

export const JOURNEY_REPLAY_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: JOURNEY_REPLAY_CONFIG, useValue: ageOfExplorationJourneyConfig },
      {
        provide: JOURNEY_REPLAY_ENROLLMENT,
        useValue: {
          tenantId: 'demo',
          classId: 'local-preview',
          studentId: 'demo-navigator',
          studentDisplayName: 'Demo navigator',
          classLabel: 'Local demonstration',
          mode: 'demo',
        },
      },
      {
        provide: JOURNEY_REPLAY_PERSISTENCE,
        useFactory: () => new BrowserJourneyReplayPersistenceAdapter(),
      },
      {
        provide: JOURNEY_REPLAY_AUTHORITY,
        useFactory: () => new HttpJourneyReplayAuthorityAdapter(),
      },
      {
        provide: JOURNEY_REPLAY_MEDIA,
        useFactory: () => {
          const enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
          const fallback = new IndexedDbAssetStorageAdapter(
            JSON.stringify([
              enrollment.tenantId,
              enrollment.classId,
              enrollment.studentId,
              ageOfExplorationJourneyConfig.projectId,
              ageOfExplorationJourneyConfig.projectVersion,
            ]),
          );
          return new HttpJourneyReplayMediaAdapter(
            journeyAuthorityLocator(
              enrollment,
              ageOfExplorationJourneyConfig.projectId,
              ageOfExplorationJourneyConfig.projectVersion,
            ),
            fallback,
          );
        },
      },
      JourneyReplayRuntimeService,
    ],
    loadComponent: () =>
      import('../../templates/journey-replay/ui/journey-shell.component').then(
        (module) => module.JourneyReplayPageComponent,
      ),
  },
];
