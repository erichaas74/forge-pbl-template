import type { CapabilityRegistryView } from '../../../core/registries/registration-contracts';
import type { ProjectValidator, ValidationIssue } from '../../../core/validation/validation-contracts';
import type { JourneyReplayDefinitionGraph } from './journey-replay-package-contracts';

export class JourneyReplayCapabilityValidator
  implements ProjectValidator<JourneyReplayDefinitionGraph, CapabilityRegistryView>
{
  readonly id = 'journey-replay-capabilities';

  validate(
    graph: JourneyReplayDefinitionGraph,
    registry: CapabilityRegistryView,
  ): ValidationIssue[] {
    return [...graph.capabilities].flatMap((capabilityId) => {
      const registration = registry.get(capabilityId);
      return registration === undefined || registration.status === 'future'
        ? [
            {
              code: 'CAPABILITY_NOT_INSTALLED',
              severity: 'error' as const,
              capabilityId,
              message: `Required journey capability "${capabilityId}" is not installed.`,
            },
          ]
        : [];
    });
  }
}
