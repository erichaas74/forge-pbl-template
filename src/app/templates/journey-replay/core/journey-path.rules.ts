import { ActionRegistry, ConditionRegistry } from '../../../core/registries/specialized-registries';
import { DeterministicRuleEngine } from '../../../core/rules/deterministic-rule-engine';
import type { RuleDefinition } from '../../../core/rules/rule-contracts';
import type { CoreRuntimeState } from '../../../core/state/core-runtime-state';
import type { JourneyPathNode } from '../domain/journey-path.models';

const conditions = new ConditionRegistry<CoreRuntimeState>();
conditions.register({
  id: 'journey.discoveryPresent',
  version: '1.0.0',
  status: 'core',
  evaluator: {
    type: 'journey.discoveryPresent',
    evaluate: (condition, state) => state.stateValues[condition.targetId ?? ''] === true,
  },
});
const engine = new DeterministicRuleEngine(conditions, new ActionRegistry<CoreRuntimeState>());
const cache = new WeakMap<JourneyPathNode, RuleDefinition[]>();

/** Read-only availability query using the shared rule engine. It awards no completion. */
export function revealedJourneyChoices(
  node: JourneyPathNode,
  tags: ReadonlySet<string>,
): ReadonlySet<string> {
  let rules = cache.get(node);
  if (!rules) {
    rules = node.choices.map((choice) => ({
      id: choice.id,
      schemaVersion: '1.0',
      enabled: true,
      repeatable: true,
      priority: 0,
      actions: [],
      ...(choice.requiresAny?.length
        ? {
            conditions: {
              operator: 'OR' as const,
              conditions: choice.requiresAny.map((tag) => ({
                type: 'journey.discoveryPresent',
                targetId: tag,
              })),
            },
          }
        : {}),
    }));
    cache.set(node, rules);
  }
  const scope = {
    tenantId: 'projection',
    projectId: 'journey-path-query',
    projectVersion: '1.0',
    scopeType: 'student' as const,
  };
  const state: CoreRuntimeState = {
    ...scope,
    scope,
    version: 0,
    lastUpdated: '',
    stateValues: Object.fromEntries([...tags].map((tag) => [tag, true])),
    firedRuleIds: [],
  };
  const result = engine.evaluateEvent(
    {
      id: 'availability-query',
      eventType: 'activity.completed',
      timestamp: '',
      tenantId: scope.tenantId,
      projectId: scope.projectId,
      actor: { type: 'system' },
    },
    state,
    rules,
  );
  if (result.errors?.length) throw new Error('JOURNEY_PATH_RULE_INVALID');
  return new Set(result.matchedRules);
}
