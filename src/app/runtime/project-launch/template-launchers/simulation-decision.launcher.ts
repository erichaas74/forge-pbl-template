import type { SimulationDecisionConfig } from '../../../templates/simulation-decision/domain/simulation-decision.models';
import { BrowserSimulationDecisionPersistenceAdapter } from '../../../templates/simulation-decision/runtime/simulation-decision.persistence';
import { SimulationDecisionRuntimeService } from '../../../templates/simulation-decision/runtime/simulation-decision-runtime.service';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_BUILDER_INFO,
  SIMULATION_DECISION_PERSISTENCE,
  SIMULATION_DECISION_PROJECT_ROUTE,
  SIMULATION_DECISION_SESSION_CONTEXT,
} from '../../../templates/simulation-decision/runtime/simulation-decision.tokens';
import { frontierTradingBuilderInfo } from '../../../projects/frontier-trading/frontier-trading.builder-info';
import type { SimulationDecisionBuilderInfoDefinition } from '../../../templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.models';
import type { ProjectLaunchRequest, TemplateLauncher } from '../project-launch.contracts';

export const simulationDecisionLauncher: TemplateLauncher = {
  templateId: 'simulation-decision',
  async load(request: ProjectLaunchRequest) {
    const config = requireSimulationConfig(request.projectDefinition, request.project.id);
    const providers = [
      { provide: SIMULATION_DECISION_CONFIG, useValue: config },
      { provide: SIMULATION_DECISION_SESSION_CONTEXT, useValue: request.session },
      {
        provide: SIMULATION_DECISION_PERSISTENCE,
        useFactory: () => new BrowserSimulationDecisionPersistenceAdapter(undefined, request.session),
      },
      SimulationDecisionRuntimeService,
    ];
    if (request.view === 'builder-info') {
      const module = await import(
        '../../../templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.component'
      );
      return {
        component: module.SimulationDecisionBuilderInfoComponent,
        providers: [
          ...providers,
          {
            provide: SIMULATION_DECISION_BUILDER_INFO,
            useValue:
              request.project.id === 'frontier-trading-company'
                ? frontierTradingBuilderInfo
                : defaultBuilderInfo(config, request.project.route),
          },
          { provide: SIMULATION_DECISION_PROJECT_ROUTE, useValue: request.project.route },
        ],
      };
    }
    const module = await import(
      '../../../templates/simulation-decision/ui/simulation-decision-shell.component'
    );
    return { component: module.SimulationDecisionShellComponent, providers };
  },
};

function requireSimulationConfig(value: unknown, projectId: string): SimulationDecisionConfig {
  if (!isRecord(value) || value['projectId'] !== projectId || !Array.isArray(value['routes'])) {
    throw new Error(`Project "${projectId}" is not a valid simulation-decision definition.`);
  }
  return value as unknown as SimulationDecisionConfig;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function defaultBuilderInfo(
  config: SimulationDecisionConfig,
  studentRoute: string,
): SimulationDecisionBuilderInfoDefinition {
  return {
    projectLabel: config.title,
    snapshotVersion: config.projectVersion,
    updatedAt: 'Generated from project package',
    updatedBy: 'Forge PBL project host',
    currentMode: 'Package-driven simulation decision project',
    statusSummary: 'This builder view is generated from the currently loaded project package.',
    studentPath: config.choiceProgression?.stages.map((stage) => stage.title) ?? [],
    paths: [
      { label: 'Project library', path: '/projects', purpose: 'Project library.', kind: 'app' },
      { label: 'Student project', path: studentRoute, purpose: 'Student experience.', kind: 'app' },
    ],
    changes: [],
    historicalDirection: [],
    guardrails: ['Keep project content in the package and reusable behavior in the template.'],
    roadmap: [],
  };
}
