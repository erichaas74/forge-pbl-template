import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: 'projects',
    title: 'Projects | Forge PBL',
    loadComponent: () =>
      import('./features/project-home/project-home.component').then(
        (module) => module.ProjectHomeComponent,
      ),
  },
  {
    path: 'mystery-substance',
    title: 'The Unlabeled Shelf | Forge PBL',
    loadComponent: () =>
      import('./features/mystery-investigation').then(
        (module) => module.MysteryInvestigationComponent,
      ),
  },
  {
    path: 'frontier-trading',
    title: 'Frontier Trading Company | Forge PBL',
    loadChildren: () =>
      import('./features/frontier-trading/frontier-trading.routes').then(
        (module) => module.FRONTIER_TRADING_ROUTES,
      ),
  },
  {
    path: 'class-exhibit-hall',
    title: 'Objects That Changed Us: Ancient Egypt | Class Exhibit Hall',
    loadChildren: () =>
      import('./features/class-exhibit-hall/class-exhibit-hall.routes').then(
        (module) => module.CLASS_EXHIBIT_HALL_ROUTES,
      ),
  },
  {
    path: 'history-live',
    title: 'History Live: The Revolutionary War | Forge PBL',
    loadChildren: () =>
      import('./features/history-live/history-live.routes').then(
        (module) => module.HISTORY_LIVE_ROUTES,
      ),
  },
  {
    path: 'debate-studio',
    title: 'The Fate of the Republic | Ancient World Debate Studio',
    loadChildren: () =>
      import('./features/debate-studio/debate-studio.routes').then(
        (module) => module.DEBATE_STUDIO_ROUTES,
      ),
  },
  {
    path: 'journey-replay',
    title: 'Race Around the World | Expedition Journey Replay',
    loadChildren: () =>
      import('./features/journey-replay/journey-replay.routes').then(
        (module) => module.JOURNEY_REPLAY_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: 'projects',
  },
];
