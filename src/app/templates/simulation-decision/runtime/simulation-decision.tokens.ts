import { InjectionToken } from '@angular/core';

import type { SimulationDecisionConfig } from '../domain/simulation-decision.models';
import type { SimulationDecisionPersistenceAdapter } from './simulation-decision.persistence';
import type { SimulationDecisionBuilderInfoDefinition } from '../ui/builder-info/simulation-decision-builder-info.models';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';

export const SIMULATION_DECISION_CONFIG = new InjectionToken<SimulationDecisionConfig>(
  'SIMULATION_DECISION_CONFIG',
);

export const SIMULATION_DECISION_PERSISTENCE =
  new InjectionToken<SimulationDecisionPersistenceAdapter>('SIMULATION_DECISION_PERSISTENCE');

export const SIMULATION_DECISION_BUILDER_INFO =
  new InjectionToken<SimulationDecisionBuilderInfoDefinition>('SIMULATION_DECISION_BUILDER_INFO');
export const SIMULATION_DECISION_PROJECT_ROUTE = new InjectionToken<string>(
  'SIMULATION_DECISION_PROJECT_ROUTE',
);
export const SIMULATION_DECISION_SESSION_CONTEXT = new InjectionToken<ProjectSessionContext>(
  'SIMULATION_DECISION_SESSION_CONTEXT',
);
