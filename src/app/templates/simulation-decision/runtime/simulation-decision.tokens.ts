import { InjectionToken } from '@angular/core';

import type { SimulationDecisionConfig } from '../domain/simulation-decision.models';
import type { SimulationDecisionPersistenceAdapter } from './simulation-decision.persistence';

export const SIMULATION_DECISION_CONFIG = new InjectionToken<SimulationDecisionConfig>(
  'SIMULATION_DECISION_CONFIG',
);

export const SIMULATION_DECISION_PERSISTENCE =
  new InjectionToken<SimulationDecisionPersistenceAdapter>('SIMULATION_DECISION_PERSISTENCE');
