import { inject } from '@angular/core';
import type { Routes } from '@angular/router';

import { FIREBASE_APP } from '../../infrastructure/firebase';
import {
  FirebaseDebateMediaAdapter,
  FirebaseDebateSessionAdapter,
} from '../../infrastructure/firebase/firebase-debate-studio.adapters';
import { romanSenateDebateConfig } from '../../projects/roman-senate-debate/roman-senate-debate.config';
import {
  BrowserDebateWorkspacePersistenceAdapter,
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
} from '../../templates/debate-studio/persistence/debate-studio.persistence';
import { DebateStudioRuntimeService } from '../../templates/debate-studio/runtime/debate-studio-runtime.service';
import { DEBATE_STUDIO_CONFIG } from '../../templates/debate-studio/runtime/debate-studio.tokens';

export const DEBATE_STUDIO_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: DEBATE_STUDIO_CONFIG, useValue: romanSenateDebateConfig },
      {
        provide: DEBATE_STUDIO_PERSISTENCE,
        useFactory: () => new BrowserDebateWorkspacePersistenceAdapter(),
      },
      {
        provide: DEBATE_STUDIO_SESSION,
        useFactory: () => new FirebaseDebateSessionAdapter(inject(FIREBASE_APP)),
      },
      {
        provide: DEBATE_STUDIO_MEDIA,
        useFactory: () => new FirebaseDebateMediaAdapter(inject(FIREBASE_APP)),
      },
      DebateStudioRuntimeService,
    ],
    loadComponent: () =>
      import('../../templates/debate-studio/ui/debate-studio-page.component').then(
        (module) => module.DebateStudioPageComponent,
      ),
  },
];
