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
import { signal } from '@angular/core';
import { ExpeditionWorkspaceComponent } from '../../templates/simulation-decision/ui/expedition/expedition-workspace.component';
import { exampleExpedition } from '../../templates/simulation-decision/domain/expedition-course.example';
import {
  reduceExpedition,
  receiptBin,
} from '../../templates/simulation-decision/domain/expedition-course.engine';
import { createSimulationState } from '../../templates/simulation-decision/domain/simulation-decision.engine';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import { projectLessonRegistry } from '../project-launch/project-lesson.registry';
export function loadSample(): CompletedSample {
  if (frontierTradingConfig.expeditionCourse) {
    const config = frontierTradingConfig;
    const state = createSimulationState(config);
    const expeditions = Object.fromEntries(
      config.expeditionCourse!.cycles.map((cycle) => {
        let trip = exampleExpedition(config, cycle);
        for (const r of trip.receipts)
          trip = reduceExpedition(config, cycle, trip, {
            type: 'file',
            receiptId: r.id,
            bin: receiptBin(r),
          }).state;
        trip = reduceExpedition(config, cycle, trip, { type: 'balance' }).state;
        trip = {
          ...trip,
          reflection:
            'I would protect more of my cargo and reserve cash for both directions. My ledger separates travel payments from damaged stock. A larger opening budget is extra capital, not profit.',
        };
        return [cycle.id, trip];
      }),
    );
    return {
      integratedHeader: true,
      component: ExpeditionWorkspaceComponent,
      inputs: { exampleMode: true },
      title: 'A trading company with balanced books',
      subtitle: 'Four fictional round trips and their reconciled budgets.',
      audience: 'Classroom review',
      duration: 'Eight weekly sessions',
      trail: [
        {
          label: 'Trade',
          title: 'Out and back',
          text: 'Load goods, visit the destination, sell, and pay for the return road.',
        },
        {
          label: 'Account',
          title: 'Follow every receipt',
          text: 'Separate cash spending from lost stock, then reconcile the cash box.',
        },
      ],
      review: {
        strength: 'The ledger includes both directions and noncash cargo losses.',
        question: 'Would paying for protection have produced a better return?',
        revision:
          'Reserve enough cash for disruptions and compare protection with the cost of lost goods.',
        assessment:
          'This is fictional sample evidence, not a grade. Ask each learner to explain their own ledger.',
      },
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: config },
        { provide: SIMULATION_DECISION_SESSION_CONTEXT, useValue: null },
        {
          provide: SIMULATION_DECISION_PERSISTENCE,
          useValue: samplePersistence({ ...state, expeditions }),
        },
        {
          provide: PROJECT_LESSON_FOCUS,
          useValue: signal(
            projectLessonRegistry.find(config.projectId, config.projectVersion)!.lessons[7],
          ),
        },
      ],
    };
  }
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
