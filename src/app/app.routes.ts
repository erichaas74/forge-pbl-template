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
    path: 'projects/:projectId/:view',
    canDeactivate: [
      (component: { canLeave: () => boolean | Promise<boolean> }) => component.canLeave(),
    ],
    loadComponent: () =>
      import('./runtime/project-launch/project-host.component').then(
        (module) => module.ProjectHostComponent,
      ),
  },
  {
    path: 'projects/:projectId',
    canDeactivate: [
      (component: { canLeave: () => boolean | Promise<boolean> }) => component.canLeave(),
    ],
    loadComponent: () =>
      import('./runtime/project-launch/project-host.component').then(
        (module) => module.ProjectHostComponent,
      ),
  },
  {
    path: 'mystery-substance',
    pathMatch: 'full',
    redirectTo: 'projects/mystery-substance',
  },
  {
    path: 'frontier-trading/builder-info',
    pathMatch: 'full',
    redirectTo: 'projects/frontier-trading-company/builder-info',
  },
  {
    path: 'frontier-trading',
    pathMatch: 'full',
    redirectTo: 'projects/frontier-trading-company',
  },
  {
    path: 'class-exhibit-hall',
    pathMatch: 'full',
    redirectTo: 'projects/objects-that-changed-us',
  },
  {
    path: 'history-live',
    pathMatch: 'full',
    redirectTo: 'projects/history-live-revolutionary-war',
  },
  {
    path: 'debate-studio',
    pathMatch: 'full',
    redirectTo: 'projects/the-fate-of-the-republic',
  },
  {
    path: 'journey-replay',
    pathMatch: 'full',
    redirectTo: 'projects/race-around-the-world',
  },
  {
    path: '**',
    redirectTo: 'projects',
  },
];
