import { runtimeError } from '../errors/runtime-error-factory';
import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from '../events/runtime-event';
import type {
  ActionRegistry,
  ConditionRegistry,
} from '../registries/specialized-registries';
import type { CoreRuntimeState } from '../state/core-runtime-state';
import type {
  ConditionEvaluation,
  ConditionGroup,
  RuleCondition,
  RuleDefinition,
  RuleEngine,
  RuleEvaluationContext,
  RuleEvaluationResult,
} from './rule-contracts';

interface RuleIndex {
  byEvent: ReadonlyMap<string, readonly RuleDefinition[]>;
  byEventAndTarget: ReadonlyMap<string, readonly RuleDefinition[]>;
  withoutTrigger: readonly RuleDefinition[];
}

/** Higher numeric priority executes first; stable rule ID breaks ties. */
export class DeterministicRuleEngine<
  TState extends CoreRuntimeState,
  TDefinitions = unknown,
> implements RuleEngine<TState, TDefinitions>
{
  private readonly indexCache = new WeakMap<RuleDefinition[], RuleIndex>();

  constructor(
    private readonly conditions: ConditionRegistry<TState, TDefinitions>,
    private readonly actions: ActionRegistry<TState>,
  ) {}

  evaluateEvent(
    event: RuntimeEvent,
    state: TState,
    rules: RuleDefinition[],
    definitions?: TDefinitions,
  ): RuleEvaluationResult {
    const context: RuleEvaluationContext<TDefinitions> = {
      event,
      tenantId: state.tenantId,
      projectId: state.projectId,
      projectVersion: state.projectVersion,
      definitions,
    };
    const errors: RuntimeError[] = [];
    const matchedRules: string[] = [];
    const ruleIdsToMarkFired: string[] = [];
    const commands: RuntimeCommand[] = [];

    for (const rule of this.candidates(event, rules)) {
      if (!rule.enabled || (!rule.repeatable && state.firedRuleIds.includes(rule.id))) {
        continue;
      }

      const conditionResult =
        rule.conditions === undefined
          ? { matched: true, errors: [] as RuntimeError[] }
          : this.evaluateGroup(rule.conditions, state, context);
      errors.push(...conditionResult.errors);
      if (!conditionResult.matched || conditionResult.errors.length > 0) {
        continue;
      }

      const ruleCommands: RuntimeCommand[] = [];
      let actionFailed = false;
      for (const action of rule.actions) {
        const registration = this.actions.get(action.type);
        if (registration === undefined) {
          errors.push(
            runtimeError(
              'UNKNOWN_ACTION_TYPE',
              `Rule "${rule.id}" uses unregistered action type "${action.type}".`,
              { sourceId: rule.id },
            ),
          );
          actionFailed = true;
          break;
        }
        try {
          ruleCommands.push(
            ...registration.handler.createCommands(action, state, context),
          );
        } catch {
          errors.push(
            runtimeError(
              'ACTION_HANDLER_FAILED',
              `Action handler "${action.type}" failed safely for rule "${rule.id}".`,
              { sourceId: rule.id },
            ),
          );
          actionFailed = true;
          break;
        }
      }

      if (actionFailed) {
        continue;
      }

      matchedRules.push(rule.id);
      commands.push(...ruleCommands);
      if (!rule.repeatable) {
        ruleIdsToMarkFired.push(rule.id);
      }
    }

    return {
      matchedRules,
      commands,
      ruleIdsToMarkFired,
      errors: errors.length === 0 ? undefined : errors,
    };
  }

  private candidates(event: RuntimeEvent, rules: RuleDefinition[]): RuleDefinition[] {
    let index = this.indexCache.get(rules);
    if (index === undefined) {
      index = this.buildIndex(rules);
      this.indexCache.set(rules, index);
    }

    const candidates = new Map<string, RuleDefinition>();
    for (const rule of index.withoutTrigger) {
      candidates.set(rule.id, rule);
    }
    for (const rule of index.byEvent.get(event.eventType) ?? []) {
      candidates.set(rule.id, rule);
    }
    if (event.sourceId !== undefined) {
      for (
        const rule of
          index.byEventAndTarget.get(this.triggerKey(event.eventType, event.sourceId)) ?? []
      ) {
        candidates.set(rule.id, rule);
      }
    }

    return [...candidates.values()].sort(
      (left, right) =>
        (right.priority ?? 0) - (left.priority ?? 0) || left.id.localeCompare(right.id),
    );
  }

  private buildIndex(rules: RuleDefinition[]): RuleIndex {
    const byEvent = new Map<string, RuleDefinition[]>();
    const byEventAndTarget = new Map<string, RuleDefinition[]>();
    const withoutTrigger: RuleDefinition[] = [];

    for (const rule of rules) {
      if (rule.trigger === undefined) {
        withoutTrigger.push(rule);
      } else if (rule.trigger.targetId === undefined) {
        this.addToIndex(byEvent, rule.trigger.eventType, rule);
      } else {
        this.addToIndex(
          byEventAndTarget,
          this.triggerKey(rule.trigger.eventType, rule.trigger.targetId),
          rule,
        );
      }
    }

    return { byEvent, byEventAndTarget, withoutTrigger };
  }

  private addToIndex(
    index: Map<string, RuleDefinition[]>,
    key: string,
    rule: RuleDefinition,
  ): void {
    const entries = index.get(key) ?? [];
    entries.push(rule);
    index.set(key, entries);
  }

  private triggerKey(eventType: string, targetId: string): string {
    return `${eventType}::${targetId}`;
  }

  private evaluateGroup(
    group: ConditionGroup,
    state: TState,
    context: RuleEvaluationContext<TDefinitions>,
  ): { matched: boolean; errors: RuntimeError[] } {
    if (group.operator === 'NOT' && group.conditions.length !== 1) {
      return {
        matched: false,
        errors: [
          runtimeError(
            'INVALID_CONDITION_GROUP',
            'NOT condition groups must contain exactly one child.',
          ),
        ],
      };
    }
    if (
      group.operator === 'X_OF' &&
      (!Number.isInteger(group.requiredCount) ||
        (group.requiredCount ?? -1) < 0 ||
        (group.requiredCount ?? 0) > group.conditions.length)
    ) {
      return {
        matched: false,
        errors: [
          runtimeError(
            'INVALID_CONDITION_GROUP',
            'X_OF condition groups require a valid requiredCount.',
          ),
        ],
      };
    }

    const results = group.conditions.map((condition) =>
      this.isGroup(condition)
        ? this.evaluateGroup(condition, state, context)
        : this.evaluateCondition(condition, state, context),
    );
    const errors = results.flatMap((result) => result.errors);
    if (errors.length > 0) {
      return { matched: false, errors };
    }
    const matches = results.filter((result) => result.matched).length;

    switch (group.operator) {
      case 'AND':
        return { matched: matches === results.length, errors };
      case 'OR':
        return { matched: matches > 0, errors };
      case 'NOT':
        return { matched: matches === 0, errors };
      case 'X_OF':
        return { matched: matches >= (group.requiredCount ?? 0), errors };
    }
  }

  private evaluateCondition(
    condition: RuleCondition,
    state: TState,
    context: RuleEvaluationContext<TDefinitions>,
  ): { matched: boolean; errors: RuntimeError[] } {
    const registration = this.conditions.get(condition.type);
    if (registration === undefined) {
      return {
        matched: false,
        errors: [
          runtimeError(
            'UNKNOWN_CONDITION_TYPE',
            `Condition type "${condition.type}" is not registered.`,
            { sourceId: condition.targetId },
          ),
        ],
      };
    }

    try {
      return this.normalize(
        registration.evaluator.evaluate(condition, state, context),
      );
    } catch {
      return {
        matched: false,
        errors: [
          runtimeError(
            'CONDITION_EVALUATOR_FAILED',
            `Condition evaluator "${condition.type}" failed safely.`,
            { sourceId: condition.targetId },
          ),
        ],
      };
    }
  }

  private normalize(
    evaluation: ConditionEvaluation,
  ): { matched: boolean; errors: RuntimeError[] } {
    return typeof evaluation === 'boolean'
      ? { matched: evaluation, errors: [] }
      : { matched: evaluation.matched, errors: evaluation.errors ?? [] };
  }

  private isGroup(value: RuleCondition | ConditionGroup): value is ConditionGroup {
    return 'conditions' in value && Array.isArray(value.conditions);
  }
}
