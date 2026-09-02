import type { BaseEntity } from '../models/base-entity';
import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from '../events/runtime-event';

export interface RuleTrigger {
  eventType: string;
  targetId?: string;
}

export interface RuleCondition {
  type: string;
  targetId?: string;
  operator?: string;
  value?: unknown;
  params?: Record<string, unknown>;
}

export interface ConditionGroup {
  operator: 'AND' | 'OR' | 'NOT' | 'X_OF';
  requiredCount?: number;
  conditions: Array<RuleCondition | ConditionGroup>;
}

export interface RuleAction {
  type: string;
  targetId?: string;
  value?: unknown;
  params?: Record<string, unknown>;
}

export interface RuleDefinition extends BaseEntity {
  trigger?: RuleTrigger;
  conditions?: ConditionGroup;
  actions: RuleAction[];
  repeatable?: boolean;
  priority?: number;
  enabled: boolean;
}

export interface RuleEvaluationContext<TDefinitions = unknown> {
  event: RuntimeEvent;
  tenantId: string;
  projectId: string;
  projectVersion: string;
  definitions?: TDefinitions;
}

export interface ConditionEvaluationResult {
  matched: boolean;
  errors?: RuntimeError[];
}

export type ConditionEvaluation = boolean | ConditionEvaluationResult;

export interface ConditionEvaluator<TState = unknown, TDefinitions = unknown> {
  type: string;
  evaluate(
    condition: RuleCondition,
    state: TState,
    context: RuleEvaluationContext<TDefinitions>,
  ): ConditionEvaluation;
}

export interface ActionHandler<TState = unknown, TDefinitions = unknown> {
  type: string;
  createCommands(
    action: RuleAction,
    state: TState,
    context: RuleEvaluationContext<TDefinitions>,
  ): RuntimeCommand[];
}

export interface RuleEvaluationResult {
  matchedRules: string[];
  commands: RuntimeCommand[];
  ruleIdsToMarkFired?: string[];
  errors?: RuntimeError[];
}

export interface RuleEngine<TState = unknown, TDefinitions = unknown> {
  evaluateEvent(
    event: RuntimeEvent,
    state: TState,
    rules: RuleDefinition[],
    definitions?: TDefinitions,
  ): RuleEvaluationResult;
}
