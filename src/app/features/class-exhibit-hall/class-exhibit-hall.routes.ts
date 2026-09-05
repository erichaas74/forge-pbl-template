import type { Routes } from '@angular/router';

import { classExhibitHallConfig } from '../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { BrowserExhibitPersistenceAdapter } from '../../templates/exhibit-hall/persistence/exhibit-persistence';
import { ExhibitHallRuntimeService } from '../../templates/exhibit-hall/runtime/exhibit-hall-runtime.service';
import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_RENDERER_COMPONENTS,
} from '../../templates/exhibit-hall/runtime/exhibit-hall.tokens';
import { MuseumBoardComponent } from '../../templates/exhibit-hall/ui/museum-board.component';
import { SciencePosterDemoComponent } from '../../templates/exhibit-hall/ui/science-poster-demo.component';

export const CLASS_EXHIBIT_HALL_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: EXHIBIT_HALL_CONFIG, useValue: classExhibitHallConfig },
      {
        provide: EXHIBIT_HALL_PERSISTENCE,
        useFactory: () => new BrowserExhibitPersistenceAdapter(),
      },
      {
        provide: EXHIBIT_RENDERER_COMPONENTS,
        useValue: [
          { rendererType: 'museum-board-v1', component: MuseumBoardComponent },
          { rendererType: 'science-poster-demo', component: SciencePosterDemoComponent },
        ],
      },
      ExhibitHallRuntimeService,
    ],
    loadComponent: () =>
      import('../../templates/exhibit-hall/ui/exhibit-hall-page.component').then(
        (module) => module.ExhibitHallPageComponent,
      ),
  },
];
