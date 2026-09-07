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

export class InvestigationValueValidator
  implements ProjectValidator<ProjectDefinitionGraph, CapabilityRegistryView>
{
  readonly id = 'investigation-values';

  validate(graph: ProjectDefinitionGraph): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (graph.investigation.phases.length === 0) {
      issues.push({
        code: 'INVESTIGATION_PHASES_EMPTY',
        severity: 'error',
        entityId: graph.investigation.id,
        message: 'An investigation requires at least one phase.',
      });
    }
    collectDuplicateNumbers(
      graph.investigation.phases.map((phase) => ({ id: phase.id, value: phase.order })),
      'PHASE_ORDER_DUPLICATE',
      issues,
    );
    collectDuplicateNumbers(
      graph.caseBoard.sections.map((section) => ({ id: section.id, value: section.order })),
      'BOARD_SECTION_ORDER_DUPLICATE',
      issues,
    );
    for (const section of graph.finalSubmission.sections) {
      if ((section.minEvidenceCount ?? 0) < 0) {
        issues.push({
          code: 'FINAL_EVIDENCE_COUNT_INVALID',
          severity: 'error',
          entityId: section.id,
          message: `Final section "${section.id}" cannot require a negative evidence count.`,
        });
      }
    }
    for (const resource of graph.resourcesById.values()) {
      if (
        (resource.min !== undefined && resource.initialAmount < resource.min) ||
        (resource.max !== undefined && resource.initialAmount > resource.max) ||
        (resource.min !== undefined && resource.max !== undefined && resource.min > resource.max)
      ) {
        issues.push({
          code: 'RESOURCE_BOUNDS_INVALID',
          severity: 'error',
          entityId: resource.id,
          message: `Resource "${resource.id}" has inconsistent initial/minimum/maximum values.`,
        });
      }
    }
    return issues;
  }
}

export class InvestigationPublicationValidator
  implements ProjectValidator<ProjectDefinitionGraph, CapabilityRegistryView>
{
  readonly id = 'investigation-publication';

  validate(graph: ProjectDefinitionGraph): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (graph.manifest.status !== 'published') {
      issues.push({
        code: 'PROJECT_NOT_PUBLISHED',
        severity: 'warning',
        entityId: graph.manifest.id,
        message: `Project "${graph.manifest.id}" is in ${graph.manifest.status} status.`,
        suggestion: 'Publish the package before assigning it to a classroom.',
      });
    }
    for (const phase of graph.investigation.phases) {
      const hasWork = (phase.activityIds?.length ?? 0) + (phase.lessonIds?.length ?? 0) > 0;
      const hasCompletion = (phase.completionRuleIds?.length ?? 0) > 0;
      if (!phase.optional && !hasWork && !hasCompletion) {
        issues.push({
          code: 'PHASE_WITHOUT_PROGRESS_PATH',
          severity: 'warning',
          entityId: phase.id,
          phaseId: phase.id,
          message: `Required phase "${phase.id}" has no configured work or completion rule.`,
        });
      }
    }
    if (graph.finalSubmission.sections.length === 0) {
      issues.push({
        code: 'FINAL_SUBMISSION_EMPTY',
        severity: 'error',
        entityId: graph.finalSubmission.id,
        message: 'A final submission requires at least one configured section.',
      });
    }
    return issues;
  }
}

function collectDuplicateNumbers(
  entries: readonly { readonly id: string; readonly value: number }[],
  code: string,
  issues: ValidationIssue[],
): void {
  const seen = new Map<number, string>();
  for (const entry of entries) {
    if (!Number.isFinite(entry.value) || entry.value < 0) {
      issues.push({
        code: 'ORDER_VALUE_INVALID',
        severity: 'error',
        entityId: entry.id,
        message: `Order for "${entry.id}" must be a non-negative number.`,
      });
      continue;
    }
    const prior = seen.get(entry.value);
    if (prior !== undefined) {
      issues.push({
        code,
        severity: 'error',
        entityId: entry.id,
        relatedEntityIds: [prior],
        message: `Order ${entry.value} is shared by "${prior}" and "${entry.id}".`,
      });
    } else {
      seen.set(entry.value, entry.id);
    }
  }
}

function investigationExtension(value: unknown): InvestigationActivityExtension | undefined {
  return typeof value === 'object' && value !== null
    ? (value as InvestigationActivityExtension)
    : undefined;
}
