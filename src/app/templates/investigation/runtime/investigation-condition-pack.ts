import type { RuntimeError } from '../../../core/errors/runtime-error';
import { runtimeError } from '../../../core/errors/runtime-error-factory';
import type { ConditionRegistry } from '../../../core/registries/specialized-registries';
import { compareValues } from '../../../core/rules/comparison';
import type {
  ConditionEvaluationResult,
  ConditionEvaluator,
  RuleCondition,
} from '../../../core/rules/rule-contracts';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';

type InvestigationConditionEvaluator = ConditionEvaluator<
  RuntimeStateSnapshot,
  ProjectDefinitionGraph
>;

export const investigationConditionTypes = [
  'activity.status',
  'evidence.status',
  'evidence.count',
  'evidence.classification',
  'evidence.relationship',
  'hypothesis.exists',
  'hypothesis.selected',
  'hypothesis.revised',
  'hypothesis.count',
  'hypothesis.confidence',
  'state.value',
  'resource.amount',
  'phase.status',
  'team.taskStatus',
  'teacher.release',
] as const;

export function registerInvestigationConditionPack(
  registry: ConditionRegistry<RuntimeStateSnapshot, ProjectDefinitionGraph>,
): void {
  const evaluators: InvestigationConditionEvaluator[] = [
    targetEvaluator('activity.status', (id, state) => state.activities[id]?.status),
    targetEvaluator('evidence.status', (id, state) => state.evidence[id]?.status),
    evidenceCountEvaluator(),
    targetEvaluator(
      'evidence.classification',
      (id, state) => state.evidence[id]?.classification,
    ),
    evidenceRelationshipEvaluator(),
    hypothesisExistsEvaluator(),
    hypothesisSelectedEvaluator(),
    hypothesisRevisedEvaluator(),
    valueEvaluator('hypothesis.count', (_condition, state) =>
      state.hypotheses.filter((hypothesis) => !hypothesis.eliminated).length,
    ),
    targetEvaluator('hypothesis.confidence', (id, state) =>
      state.hypotheses.find((hypothesis) => hypothesis.id === id)?.confidence,
    ),
    targetEvaluator('state.value', (id, state) => state.stateValues[id]),
    targetEvaluator('resource.amount', (id, state) => state.resources[id]),
    targetEvaluator('phase.status', (id, state) => state.phases[id]?.status),
    targetEvaluator('team.taskStatus', (id, state) => state.teamTasks[id]),
    targetEvaluator('teacher.release', (id, state) => state.teacherReleases[id]),
  ];

  for (const evaluator of evaluators) {
    registry.register({
      id: evaluator.type,
      version: '1.0.0',
      status: 'core',
      evaluator,
    });
  }
}

function targetEvaluator(
  type: string,
  read: (id: string, state: RuntimeStateSnapshot) => unknown,
): InvestigationConditionEvaluator {
  return {
    type,
    evaluate: (condition, state) => {
      if (condition.targetId === undefined) {
        return conditionError(
          'CONDITION_TARGET_REQUIRED',
          `Condition "${type}" requires targetId.`,
        );
      }
      const actual = read(condition.targetId, state);
      if (actual === undefined) {
        return conditionError(
          'CONDITION_TARGET_NOT_FOUND',
          `Condition "${type}" target "${condition.targetId}" was not found.`,
          condition.targetId,
        );
      }
      return compareValues(actual, condition.operator ?? 'equals', condition.value);
    },
  };
}

function valueEvaluator(
  type: string,
  read: (condition: RuleCondition, state: RuntimeStateSnapshot) => unknown,
): InvestigationConditionEvaluator {
  return {
    type,
    evaluate: (condition, state) =>
      compareValues(read(condition, state), condition.operator ?? 'equals', condition.value),
  };
}

function evidenceCountEvaluator(): InvestigationConditionEvaluator {
  return {
    type: 'evidence.count',
    evaluate: (condition, state, context) => {
      const status = condition.params?.['status'];
      const requirement = condition.params?.['requirement'];
      const evidenceType = condition.params?.['type'];
      const phase = condition.params?.['phase'];
      const count = Object.entries(state.evidence).filter(([id, runtime]) => {
        const definition = context.definitions?.evidenceById.get(id);
        return (
          (status === undefined || runtime.status === status) &&
          (requirement === undefined || definition?.requirement === requirement) &&
          (evidenceType === undefined || definition?.evidenceType === evidenceType) &&
          (phase === undefined || definition?.availability.availableFromPhaseId === phase)
        );
      }).length;
      return compareValues(count, condition.operator ?? 'equals', condition.value);
    },
  };
}

function evidenceRelationshipEvaluator(): InvestigationConditionEvaluator {
  return {
    type: 'evidence.relationship',
    evaluate: (condition, state) => {
      if (condition.targetId === undefined) {
        return conditionError(
          'CONDITION_TARGET_REQUIRED',
          'evidence.relationship requires source targetId.',
        );
      }
      const relatedTargetId = condition.params?.['targetId'];
      const relationshipType = condition.params?.['relationshipType'];
      if (typeof relatedTargetId !== 'string' || typeof relationshipType !== 'string') {
        return conditionError(
          'INVALID_CONDITION_VALUE',
          'evidence.relationship requires string targetId and relationshipType params.',
          condition.targetId,
        );
      }
      const exists = state.evidenceRelationships.some(
        (relationship) =>
          relationship.sourceId === condition.targetId &&
          relationship.targetId === relatedTargetId &&
          relationship.relationshipType === relationshipType,
      );
      return compareValues(
        exists,
        condition.operator ?? 'equals',
        condition.value ?? true,
      );
    },
  };
}

function hypothesisExistsEvaluator(): InvestigationConditionEvaluator {
  return {
    type: 'hypothesis.exists',
    evaluate: (condition, state) => {
      const exists =
        condition.targetId === undefined
          ? state.hypotheses.some((hypothesis) => !hypothesis.eliminated)
          : state.hypotheses.some(
              (hypothesis) =>
                hypothesis.id === condition.targetId && !hypothesis.eliminated,
            );
      return compareValues(
        exists,
        condition.operator ?? 'equals',
        condition.value ?? true,
      );
    },
  };
}

function hypothesisSelectedEvaluator(): InvestigationConditionEvaluator {
  return {
    type: 'hypothesis.selected',
    evaluate: (condition, state) => {
      const selected = state.hypotheses.some(
        (hypothesis) =>
          hypothesis.selected &&
          (condition.targetId === undefined || hypothesis.id === condition.targetId),
      );
      return compareValues(
        selected,
        condition.operator ?? 'equals',
        condition.value ?? true,
      );
    },
  };
}

function hypothesisRevisedEvaluator(): InvestigationConditionEvaluator {
  return {
    type: 'hypothesis.revised',
    evaluate: (condition, state) => {
      const hypotheses =
        condition.targetId === undefined
          ? state.hypotheses
          : state.hypotheses.filter((hypothesis) => hypothesis.id === condition.targetId);
      if (condition.targetId !== undefined && hypotheses.length === 0) {
        return conditionError(
          'CONDITION_TARGET_NOT_FOUND',
          `Hypothesis "${condition.targetId}" was not found.`,
          condition.targetId,
        );
      }
      const revisionCount = hypotheses.reduce(
        (sum, hypothesis) => sum + hypothesis.revisions.length,
        0,
      );
      return compareValues(
        revisionCount,
        condition.operator ?? 'greaterThan',
        condition.value ?? 0,
      );
    },
  };
}

function conditionError(
  code: string,
  message: string,
  sourceId?: string,
): ConditionEvaluationResult {
  const error: RuntimeError = runtimeError(code, message, { sourceId });
  return { matched: false, errors: [error] };
}

