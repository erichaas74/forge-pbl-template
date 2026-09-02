import type { CapabilityRegistryView } from '../../../core/registries/registration-contracts';
import type {
  ProjectValidator,
  ValidationIssue,
} from '../../../core/validation/validation-contracts';
import type { InvestigationActivityExtension } from '../domain/activity-extension';
import type { ProjectDefinitionGraph } from './project-definition-graph';

export class RegisteredProjectCapabilityValidator
  implements ProjectValidator<ProjectDefinitionGraph, CapabilityRegistryView>
{
  readonly id = 'registered-project-capabilities';

  validate(
    graph: ProjectDefinitionGraph,
    registry: CapabilityRegistryView,
  ): ValidationIssue[] {
    return [...graph.capabilities]
      .filter((capabilityId) => !registry.has(capabilityId))
      .map((capabilityId) => ({
        code: 'CAPABILITY_NOT_INSTALLED',
        severity: 'error' as const,
        entityId: graph.manifest.id,
        capabilityId,
        message: `Required capability "${capabilityId}" is not registered.`,
      }));
  }
}

export class InvestigationCoreReferenceValidator
  implements ProjectValidator<ProjectDefinitionGraph, CapabilityRegistryView>
{
  readonly id = 'investigation-core-references';

  validate(graph: ProjectDefinitionGraph): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requireReference = (
      exists: boolean,
      sourceId: string,
      targetId: string,
      relation: string,
    ): void => {
      if (!exists) {
        issues.push({
          code: 'REFERENCE_NOT_FOUND',
          severity: 'error',
          entityId: sourceId,
          relatedEntityIds: [targetId],
          message: `${sourceId} references missing ${relation} "${targetId}".`,
        });
      }
    };

    for (const phase of graph.investigation.phases) {
      for (const id of phase.activityIds ?? []) {
        requireReference(graph.activitiesById.has(id), phase.id, id, 'activity');
      }
      for (const id of phase.lessonIds ?? []) {
        requireReference(graph.lessonsById.has(id), phase.id, id, 'lesson');
      }
      for (const id of [...(phase.entryRuleIds ?? []), ...(phase.completionRuleIds ?? [])]) {
        requireReference(graph.rulesById.has(id), phase.id, id, 'rule');
      }
    }

    for (const evidence of graph.evidenceById.values()) {
      if (evidence.availability.availableFromPhaseId !== undefined) {
        const phaseId = evidence.availability.availableFromPhaseId;
        requireReference(
          graph.investigation.phases.some((phase) => phase.id === phaseId),
          evidence.id,
          phaseId,
          'phase',
        );
      }
      for (const id of [
        ...(evidence.availability.ruleIds ?? []),
        ...(evidence.unlockRuleIds ?? []),
      ]) {
        requireReference(graph.rulesById.has(id), evidence.id, id, 'rule');
      }
    }

    for (const activity of graph.activitiesById.values()) {
      const extension = investigationExtension(activity.extensions?.['investigation']);
      for (const id of extension?.evidenceProducedIds ?? []) {
        requireReference(graph.evidenceById.has(id), activity.id, id, 'evidence');
      }
      for (const id of extension?.ruleIds ?? []) {
        requireReference(graph.rulesById.has(id), activity.id, id, 'rule');
      }
      for (const id of extension?.randomizationIds ?? []) {
        requireReference(graph.randomizationsById.has(id), activity.id, id, 'randomization');
      }
      for (const cost of extension?.resourceCosts ?? []) {
        requireReference(
          graph.resourcesById.has(cost.resourceId),
          activity.id,
          cost.resourceId,
          'resource',
        );
      }
    }

    for (const randomization of graph.randomizationsById.values()) {
      requireReference(
        graph.stateById.has(randomization.outputStateId),
        randomization.id,
        randomization.outputStateId,
        'state variable',
      );
    }

    for (const npc of graph.npcsById.values()) {
      for (const dialogue of npc.dialogueNodes ?? []) {
        for (const id of dialogue.availabilityRuleIds ?? []) {
          requireReference(graph.rulesById.has(id), npc.id, id, 'rule');
        }
        for (const id of dialogue.evidenceProducedIds ?? []) {
          requireReference(graph.evidenceById.has(id), npc.id, id, 'evidence');
        }
      }
    }

    for (const id of graph.finalSubmission.availabilityRuleIds ?? []) {
      requireReference(graph.rulesById.has(id), graph.finalSubmission.id, id, 'rule');
    }

    return issues;
  }
}

function investigationExtension(value: unknown): InvestigationActivityExtension | undefined {
  return typeof value === 'object' && value !== null
    ? (value as InvestigationActivityExtension)
    : undefined;
}

