import type { CapabilityRegistryView } from '../../../core/registries/registration-contracts';
import type {
  ProjectValidator,
  ValidationIssue,
} from '../../../core/validation/validation-contracts';
import type { ExhibitHallDefinitionGraph } from './exhibit-hall-package-contracts';

export class ExhibitHallCapabilityValidator implements ProjectValidator<
  ExhibitHallDefinitionGraph,
  CapabilityRegistryView
> {
  readonly id = 'exhibit-hall-capabilities';

  validate(graph: ExhibitHallDefinitionGraph, registry: CapabilityRegistryView): ValidationIssue[] {
    return [...graph.capabilities].flatMap((capabilityId) => {
      const registration = registry.get(capabilityId);
      if (registration === undefined || registration.status === 'future') {
        return [
          {
            code: 'CAPABILITY_NOT_INSTALLED',
            severity: 'error' as const,
            capabilityId,
            message: `Required exhibit capability "${capabilityId}" is not installed.`,
          },
        ];
      }
      return [];
    });
  }
}
