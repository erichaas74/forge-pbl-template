import { DeterministicRuleEngine } from './deterministic-rule-engine';
import type { RuleDefinition } from './rule-contracts';
import {
  createSimpleRuntime,
  runtimeEvent,
  studentScope,
} from '../../testing/runtime-test-helpers';

describe('DeterministicRuleEngine', () => {
  it('matches event type and source target, then filters failed conditions', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const engine = new DeterministicRuleEngine(platform.conditions, platform.actions);
    const state = platform.state.getSnapshot(studentScope)!;
    const rules: RuleDefinition[] = [
      rule('rule-match', 10, 'act-test', {
        operator: 'AND',
        conditions: [
          { type: 'state.value', targetId: 'case.path', operator: 'equals', value: 'default' },
        ],
      }),
      rule('rule-condition-fails', 20, 'act-test', {
        operator: 'AND',
        conditions: [
          { type: 'state.value', targetId: 'case.path', operator: 'equals', value: 'npc' },
        ],
      }),
      rule('rule-target-fails', 30, 'act-other'),
    ];

    const result = engine.evaluateEvent(
      runtimeEvent('event-rule', 'activity.completed', 'act-test'),
      state,
      rules,
      graph,
    );

    expect(result.matchedRules).toEqual(['rule-match']);
    expect(result.commands).toEqual([
      { commandType: 'state.set', targetId: 'case.path', value: 'npc', params: undefined },
    ]);
  });

  it('orders higher priority first and uses stable ID as a tie breaker', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const engine = new DeterministicRuleEngine(platform.conditions, platform.actions);
    const state = platform.state.getSnapshot(studentScope)!;
    const rules = [
      rule('rule-z', 5),
      rule('rule-b', 10),
      rule('rule-a', 10),
    ];

    const result = engine.evaluateEvent(
      runtimeEvent('event-order', 'activity.completed', 'act-test'),
      state,
      rules,
      graph,
    );

    expect(result.matchedRules).toEqual(['rule-a', 'rule-b', 'rule-z']);
  });

  it('supports nested AND, OR, NOT, and X_OF groups', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const engine = new DeterministicRuleEngine(platform.conditions, platform.actions);
    const state = platform.state.getSnapshot(studentScope)!;
    const nested = rule('rule-nested', 1, undefined, {
      operator: 'AND',
      conditions: [
        {
          operator: 'OR',
          conditions: [
            { type: 'state.value', targetId: 'case.path', value: 'npc' },
            { type: 'state.value', targetId: 'case.path', value: 'default' },
          ],
        },
        {
          operator: 'NOT',
          conditions: [
            { type: 'resource.amount', targetId: 'resource-credits', value: 0 },
          ],
        },
        {
          operator: 'X_OF',
          requiredCount: 2,
          conditions: [
            { type: 'phase.status', targetId: 'phase-start', value: 'available' },
            { type: 'state.value', targetId: 'case.path', value: 'default' },
            { type: 'resource.amount', targetId: 'resource-credits', value: 0 },
          ],
        },
      ],
    });

    const result = engine.evaluateEvent(
      runtimeEvent('event-nested', 'activity.completed', 'act-test'),
      state,
      [nested],
      graph,
    );

    expect(result.matchedRules).toEqual(['rule-nested']);
  });

  it('skips an already-fired non-repeatable rule but allows a repeatable rule', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const engine = new DeterministicRuleEngine(platform.conditions, platform.actions);
    const state = platform.state.getSnapshot(studentScope)!;
    state.firedRuleIds = ['rule-once'];
    const once = rule('rule-once', 2);
    const repeatable = { ...rule('rule-repeat', 1), repeatable: true };

    const result = engine.evaluateEvent(
      runtimeEvent('event-repeat', 'activity.completed', 'act-test'),
      state,
      [once, repeatable],
      graph,
    );

    expect(result.matchedRules).toEqual(['rule-repeat']);
    expect(result.ruleIdsToMarkFired).toEqual([]);
  });

  it('fails safely for unknown condition and action types', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const engine = new DeterministicRuleEngine(platform.conditions, platform.actions);
    const state = platform.state.getSnapshot(studentScope)!;
    const unknownCondition = rule('rule-condition', 2, undefined, {
      operator: 'AND',
      conditions: [{ type: 'unknown.condition' }],
    });
    const unknownAction = {
      ...rule('rule-action', 1),
      actions: [{ type: 'unknown.action' }],
    };

    const result = engine.evaluateEvent(
      runtimeEvent('event-unknown', 'activity.completed', 'act-test'),
      state,
      [unknownCondition, unknownAction],
      graph,
    );

    expect(result.commands).toEqual([]);
    expect(result.errors?.map((error) => error.code)).toEqual(
      expect.arrayContaining(['UNKNOWN_CONDITION_TYPE', 'UNKNOWN_ACTION_TYPE']),
    );
  });
});

function rule(
  id: string,
  priority: number,
  targetId: string | undefined = 'act-test',
  conditions?: RuleDefinition['conditions'],
): RuleDefinition {
  return {
    id,
    schemaVersion: '1.0',
    trigger: { eventType: 'activity.completed', targetId },
    conditions,
    actions: [{ type: 'state.set', targetId: 'case.path', value: 'npc' }],
    repeatable: false,
    priority,
    enabled: true,
  };
}

