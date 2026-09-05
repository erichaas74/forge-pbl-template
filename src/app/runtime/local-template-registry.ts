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

export const investigationTemplateImplementationVersion = '1.0.0';
export const simulationDecisionTemplateImplementationVersion = '1.0.0';
export const exhibitHallTemplateImplementationVersion = '1.0.0';
export const journeyReplayTemplateImplementationVersion = '1.0.0';

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

export function createLocalTemplateRegistry(
  source: ProjectPackageSource,
  clock: Clock = new SystemClock(),
): TemplateRegistry {
  const registry = new TemplateRegistry();
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
  return registry;
}
