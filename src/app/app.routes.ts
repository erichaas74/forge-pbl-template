import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mystery-substance',
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
    path: '**',
    redirectTo: 'mystery-substance',
  },
];
