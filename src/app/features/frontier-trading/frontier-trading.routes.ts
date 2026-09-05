import type { Routes } from '@angular/router';

import { frontierTradingBuilderInfo } from '../../projects/frontier-trading/frontier-trading.builder-info';
import { frontierTradingConfig } from '../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../../templates/simulation-decision/runtime/simulation-decision-runtime.service';
import { BrowserSimulationDecisionPersistenceAdapter } from '../../templates/simulation-decision/runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../../templates/simulation-decision/runtime/simulation-decision.tokens';

export const FRONTIER_TRADING_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: SIMULATION_DECISION_CONFIG, useValue: frontierTradingConfig },
      {
        provide: SIMULATION_DECISION_PERSISTENCE,
        useFactory: () => new BrowserSimulationDecisionPersistenceAdapter(),
      },
      SimulationDecisionRuntimeService,
    ],
    children: [
      {
        path: 'builder-info',
        title: 'Frontier Trading Builder Information | Forge PBL',
        data: { builderInfo: frontierTradingBuilderInfo },
        loadComponent: () =>
          import(
            '../../templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.component'
          ).then((module) => module.SimulationDecisionBuilderInfoComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('../../templates/simulation-decision/ui/simulation-decision-shell.component').then(
            (module) => module.SimulationDecisionShellComponent,
          ),
      },
    ],
  },
];
