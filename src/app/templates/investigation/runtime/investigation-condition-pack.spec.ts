import { compareValues } from '../../../core/rules/comparison';
import {
  createSimpleRuntime,
  studentScope,
} from '../../../testing/runtime-test-helpers';

describe('Investigation condition pack', () => {
  it.each([
    ['activity.status', 'act-test', 'notStarted'],
    ['evidence.status', 'ev-intro', 'available'],
    ['state.value', 'case.path', 'default'],
    ['resource.amount', 'resource-credits', 2],
    ['phase.status', 'phase-start', 'available'],
  ])('evaluates %s true and false through shared comparison semantics', async (type, targetId, value) => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    const evaluator = platform.conditions.get(type)?.evaluator;
    const context = {
      event: {
        id: 'event-condition',
        eventType: 'activity.completed',
        timestamp: '2026-09-02T00:00:00.000Z',
        tenantId: snapshot.tenantId,
        projectId: snapshot.projectId,
        actor: { type: 'system' as const },
      },
      tenantId: snapshot.tenantId,
      projectId: snapshot.projectId,
      projectVersion: snapshot.projectVersion,
      definitions: graph,
    };

    expect(evaluator?.evaluate({ type, targetId, value }, snapshot, context)).toEqual({
      matched: true,
    });
    expect(
      evaluator?.evaluate({ type, targetId, value: '__not-the-value__' }, snapshot, context),
    ).toEqual({ matched: false });
  });

  it('evaluates evidence counts and reports missing targets safely', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    const context = {
      event: {
        id: 'event-count',
        eventType: 'evidence.collected',
        timestamp: '2026-09-02T00:00:00.000Z',
        tenantId: snapshot.tenantId,
        projectId: snapshot.projectId,
        actor: { type: 'system' as const },
      },
      tenantId: snapshot.tenantId,
      projectId: snapshot.projectId,
      projectVersion: snapshot.projectVersion,
      definitions: graph,
    };

    const count = platform.conditions.get('evidence.count')!.evaluator.evaluate(
      {
        type: 'evidence.count',
        operator: 'equals',
        value: 1,
        params: { status: 'available' },
      },
      snapshot,
      context,
    );
    const missing = platform.conditions.get('evidence.status')!.evaluator.evaluate(
      { type: 'evidence.status', targetId: 'ev-missing', value: 'available' },
      snapshot,
      context,
    );

    expect(count).toEqual({ matched: true });
    expect(missing).toMatchObject({
      matched: false,
      errors: [{ code: 'CONDITION_TARGET_NOT_FOUND' }],
    });
  });

  it.each([
    ['equals', 2, 2, true],
    ['notEquals', 2, 3, true],
    ['greaterThan', 3, 2, true],
    ['greaterThanOrEqual', 2, 2, true],
    ['lessThan', 1, 2, true],
    ['lessThanOrEqual', 2, 2, true],
    ['contains', ['a', 'b'], 'b', true],
    ['notContains', 'alpha', 'z', true],
    ['in', 'a', ['a', 'b'], true],
    ['notIn', 'z', ['a', 'b'], true],
    ['exists', 0, undefined, true],
  ])('uses consistent %s comparison semantics', (operator, actual, expected, matched) => {
    expect(compareValues(actual, operator, expected)).toEqual({ matched });
  });

  it('returns structured errors for invalid comparison operators and value types', () => {
    expect(compareValues(1, 'unsupported', 1)).toMatchObject({
      matched: false,
      errors: [{ code: 'INVALID_COMPARISON_OPERATOR' }],
    });
    expect(compareValues('one', 'greaterThan', 1)).toMatchObject({
      matched: false,
      errors: [{ code: 'INVALID_COMPARISON_VALUE' }],
    });
  });
});
