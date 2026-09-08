import type { ProjectPackageSource } from '../core/packages/project-package-contracts';
import { TemplateRegistry } from '../core/templates/template-registry';
import type {
  ProjectTemplateRegistration,
  TemplateRegistryResult,
} from '../core/templates/template-contracts';
import type { Clock } from '../core/time/clock';
import { SystemClock } from '../core/time/clock';
import { investigationProjectPackageDescriptor } from '../templates/investigation/package/investigation-project-package-assembler';
import { LocalInvestigationRuntime } from './local-investigation-runtime';
import { LocalSimulationDecisionRuntime } from './local-simulation-decision-runtime';
import { simulationDecisionProjectPackageDescriptor } from '../templates/simulation-decision/package/simulation-decision-project-package-assembler';
import { exhibitHallProjectPackageDescriptor } from '../templates/exhibit-hall/package/exhibit-hall-project-package-assembler';
import { LocalExhibitHallRuntime } from './local-exhibit-hall-runtime';
import { journeyReplayProjectPackageDescriptor } from '../templates/journey-replay/package/journey-replay-project-package-assembler';
import { LocalJourneyReplayRuntime } from './local-journey-replay-runtime';
import { LocalEngineeringDesignRuntime } from './local-engineering-design-runtime';
import { LocalCrisisOperationsRuntime } from './local-crisis-operations-runtime';
import {
  LocalProjectConfigRuntime,
  singleProjectConfigPackageDescriptor,
} from './local-project-config-runtime';

export const investigationTemplateImplementationVersion = '1.0.0';
export const simulationDecisionTemplateImplementationVersion = '1.0.0';
export const exhibitHallTemplateImplementationVersion = '1.0.0';
export const journeyReplayTemplateImplementationVersion = '1.0.0';
export const historyLiveTemplateImplementationVersion = '1.1.0';
export const debateStudioTemplateImplementationVersion = '2.0.0';
export const narrativeStudioTemplateImplementationVersion = '1.2.0';

export function createInvestigationTemplateRegistration(
  source: ProjectPackageSource,
  clock: Clock = new SystemClock(),
): ProjectTemplateRegistration<LocalInvestigationRuntime> {
  return {
    id: 'investigation',
    version: investigationTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['investigation'],
    packageDescriptor: investigationProjectPackageDescriptor,
    createRuntime: () => new LocalInvestigationRuntime(source, clock),
  };
}

export function registerLocalInvestigationTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
  clock: Clock = new SystemClock(),
): TemplateRegistryResult<LocalInvestigationRuntime> {
  return registry.register(createInvestigationTemplateRegistration(source, clock));
}

export function createSimulationDecisionTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalSimulationDecisionRuntime> {
  return {
    id: 'simulation-decision',
    version: simulationDecisionTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['simulation-decision'],
    packageDescriptor: simulationDecisionProjectPackageDescriptor,
    createRuntime: () => new LocalSimulationDecisionRuntime(source),
  };
}

export function registerLocalSimulationDecisionTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalSimulationDecisionRuntime> {
  return registry.register(createSimulationDecisionTemplateRegistration(source));
}

export function createExhibitHallTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalExhibitHallRuntime> {
  return {
    id: 'exhibit-hall',
    version: exhibitHallTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['exhibit-hall'],
    packageDescriptor: exhibitHallProjectPackageDescriptor,
    createRuntime: () => new LocalExhibitHallRuntime(source),
  };
}

export function registerLocalExhibitHallTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalExhibitHallRuntime> {
  return registry.register(createExhibitHallTemplateRegistration(source));
}

export function createJourneyReplayTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalJourneyReplayRuntime> {
  return {
    id: 'journey-replay',
    version: journeyReplayTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['journey-replay'],
    packageDescriptor: journeyReplayProjectPackageDescriptor,
    createRuntime: () => new LocalJourneyReplayRuntime(source),
  };
}

export function registerLocalJourneyReplayTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalJourneyReplayRuntime> {
  return registry.register(createJourneyReplayTemplateRegistration(source));
}

export function createHistoryLiveTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalProjectConfigRuntime> {
  return {
    id: 'history-live-broadcast',
    version: historyLiveTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['history-live-broadcast'],
    packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'history-live-broadcast'),
  };
}

export function createDebateStudioTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalProjectConfigRuntime> {
  return {
    id: 'debate-studio',
    version: debateStudioTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [2],
    projectTypes: ['debate-studio'],
    packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'debate-studio'),
  };
}

export function createNarrativeStudioTemplateRegistration(
  source: ProjectPackageSource,
): ProjectTemplateRegistration<LocalProjectConfigRuntime> {
  return {
    id: 'narrative-studio',
    version: narrativeStudioTemplateImplementationVersion,
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['narrative-studio'],
    packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'narrative-studio'),
  };
}

export function registerLocalHistoryLiveTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalProjectConfigRuntime> {
  return registry.register(createHistoryLiveTemplateRegistration(source));
}

export function registerLocalDebateStudioTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalProjectConfigRuntime> {
  return registry.register(createDebateStudioTemplateRegistration(source));
}

export function registerLocalNarrativeStudioTemplate(
  registry: TemplateRegistry,
  source: ProjectPackageSource,
): TemplateRegistryResult<LocalProjectConfigRuntime> {
  return registry.register(createNarrativeStudioTemplateRegistration(source));
}

export function createLocalTemplateRegistry(
  source: ProjectPackageSource,
  clock: Clock = new SystemClock(),
): TemplateRegistry {
  const registry = new TemplateRegistry();
  const competitionResult = registry.register({
    id: 'competition-show', version: '1.0.0', compatibleTemplateMajorVersions: [1],
    projectTypes: ['competition-show'], packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'competition-show'),
  });
  if (!competitionResult.ok) throw new Error(competitionResult.error.message);
  const leagueResult = registry.register({
    id: 'live-strategy-league', version: '1.0.0', compatibleTemplateMajorVersions: [1],
    projectTypes: ['live-strategy-league'], packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'live-strategy-league'),
  });
  if (!leagueResult.ok) throw new Error(leagueResult.error.message);
  const crisisResult = registry.register({
    id: 'crisis-operations', version: '1.0.0', compatibleTemplateMajorVersions: [1],
    projectTypes: ['crisis-operations'], packageDescriptor: { requiredFiles: ['project.json'], optionalFiles: [] },
    createRuntime: () => new LocalCrisisOperationsRuntime(source),
  });
  if (!crisisResult.ok) throw new Error(crisisResult.error.message);
  const engineeringResult = registry.register({
    id: 'engineering-design',
    version: '1.0.0',
    compatibleTemplateMajorVersions: [1],
    projectTypes: ['engineering-design'],
    packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalEngineeringDesignRuntime(source),
  });
  if (!engineeringResult.ok) throw new Error(engineeringResult.error.message);
  const automationResult = registry.register({
    id: 'programming-automation', version: '1.0.0', compatibleTemplateMajorVersions: [1],
    projectTypes: ['programming-automation'], packageDescriptor: singleProjectConfigPackageDescriptor,
    createRuntime: () => new LocalProjectConfigRuntime(source, 'programming-automation'),
  });
  if (!automationResult.ok) throw new Error(automationResult.error.message);
  const result = registerLocalInvestigationTemplate(registry, source, clock);
  if (!result.ok) {
    throw new Error(result.error.message);
  }
  const simulationResult = registerLocalSimulationDecisionTemplate(registry, source);
  if (!simulationResult.ok) {
    throw new Error(simulationResult.error.message);
  }
  const exhibitHallResult = registerLocalExhibitHallTemplate(registry, source);
  if (!exhibitHallResult.ok) {
    throw new Error(exhibitHallResult.error.message);
  }
  const journeyResult = registerLocalJourneyReplayTemplate(registry, source);
  if (!journeyResult.ok) {
    throw new Error(journeyResult.error.message);
  }
  const historyResult = registerLocalHistoryLiveTemplate(registry, source);
  if (!historyResult.ok) {
    throw new Error(historyResult.error.message);
  }
  const debateResult = registerLocalDebateStudioTemplate(registry, source);
  if (!debateResult.ok) {
    throw new Error(debateResult.error.message);
  }
  const narrativeResult = registerLocalNarrativeStudioTemplate(registry, source);
  if (!narrativeResult.ok) {
    throw new Error(narrativeResult.error.message);
  }
  return registry;
}
