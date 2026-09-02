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

export const investigationTemplateImplementationVersion = '1.0.0';

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

export function createLocalTemplateRegistry(
  source: ProjectPackageSource,
  clock: Clock = new SystemClock(),
): TemplateRegistry {
  const registry = new TemplateRegistry();
  const result = registerLocalInvestigationTemplate(registry, source, clock);
  if (!result.ok) {
    throw new Error(result.error.message);
  }
  return registry;
}

