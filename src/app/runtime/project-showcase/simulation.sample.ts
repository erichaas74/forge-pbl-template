import { frontierTradingConfig } from '../../projects/frontier-trading/frontier-trading.config';
import {
  createSimulationSample,
  simulationSampleGuide,
} from '../../projects/completed-samples/simulation.sample-data';
import { SimulationFinalShowcaseComponent } from '../../templates/simulation-decision/ui/pages/final-showcase.component';
import { SimulationDecisionRuntimeService } from '../../templates/simulation-decision/runtime/simulation-decision-runtime.service';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
  SIMULATION_DECISION_SESSION_CONTEXT,
} from '../../templates/simulation-decision/runtime/simulation-decision.tokens';
import { samplePersistence, type CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  const state = createSimulationSample();
  return {
    ...simulationSampleGuide(state),
    component: SimulationFinalShowcaseComponent,
    inputs: { readOnly: true },
    providers: [
      SimulationDecisionRuntimeService,
      { provide: SIMULATION_DECISION_CONFIG, useValue: frontierTradingConfig },
      { provide: SIMULATION_DECISION_SESSION_CONTEXT, useValue: null },
      { provide: SIMULATION_DECISION_PERSISTENCE, useValue: samplePersistence(state) },
    ],
  };
}
