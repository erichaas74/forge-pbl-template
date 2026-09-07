import { RegisteredCommandExecutor } from './command-executor';
import type { StateVariableConstraint } from '../state/core-runtime-state';
import {
  createSimpleRuntime,
  FixedClock,
  studentScope,
} from '../../testing/runtime-test-helpers';

describe('RegisteredCommandExecutor', () => {
  it('executes all registered state handlers atomically', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    snapshot.stateValues['case.flag'] = false;
    snapshot.stateValues['case.items'] = ['a'];
    const definitions = new Map<string, StateVariableConstraint>([
      ['case.progress', graph.stateById.get('case.progress')!],
      ['case.flag', { id: 'case.flag', stateType: 'boolean', mutable: true }],
      ['case.items', { id: 'case.items', stateType: 'list', mutable: true }],
    ]);
    const executor = new RegisteredCommandExecutor(
      platform.commandHandlers,
      undefined,
      new FixedClock(),
    );

    const result = await executor.execute(
      [
        { commandType: 'state.increment', targetId: 'case.progress', value: 2 },
        { commandType: 'state.decrement', targetId: 'case.progress', value: 1 },
        { commandType: 'state.toggle', targetId: 'case.flag' },
        { commandType: 'state.addToList', targetId: 'case.items', value: 'b' },
        { commandType: 'state.removeFromList', targetId: 'case.items', value: 'a' },
      ],
      snapshot,
      context(graph, definitions),
    );

    expect(result.success).toBe(true);
    expect(result.snapshot?.version).toBe(1);
    expect(result.snapshot?.stateValues).toMatchObject({
      'case.progress': 1,
      'case.flag': true,
      'case.items': ['b'],
    });
    expect(snapshot.stateValues).toMatchObject({
      'case.progress': 0,
      'case.flag': false,
      'case.items': ['a'],
    });
  });

  it('rolls back an entire command batch when a command is unknown', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    const executor = new RegisteredCommandExecutor(platform.commandHandlers);

    const result = await executor.execute(
      [
        { commandType: 'state.set', targetId: 'case.path', value: 'npc' },
        { commandType: 'unknown.command' },
      ],
      snapshot,
      context(graph, graph.stateById as ReadonlyMap<string, StateVariableConstraint>),
    );

    expect(result).toMatchObject({
      success: false,
      mutations: [],
      errors: [{ code: 'INVALID_COMMAND' }],
    });
    expect(result.snapshot?.stateValues['case.path']).toBe('default');
  });

  it('enforces state type, allowed-value, and numeric constraints', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    const executor = new RegisteredCommandExecutor(platform.commandHandlers);
    const executionContext = context(
      graph,
      graph.stateById as ReadonlyMap<string, StateVariableConstraint>,
    );

    const invalidChoice = await executor.execute(
      [{ commandType: 'state.set', targetId: 'case.path', value: 'unsupported' }],
      snapshot,
      executionContext,
    );
    const overMaximum = await executor.execute(
      [{ commandType: 'state.increment', targetId: 'case.progress', value: 11 }],
      snapshot,
      executionContext,
    );

    expect(invalidChoice.errors?.[0]?.code).toBe('INVALID_STATE_VALUE');
    expect(overMaximum.errors?.[0]?.code).toBe('STATE_MAX_EXCEEDED');
  });

  it('blocks unconfirmed resource spending and executes only after server confirmation', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const snapshot = platform.state.getSnapshot(studentScope)!;
    const executor = new RegisteredCommandExecutor(platform.commandHandlers);

    const unconfirmed = await executor.execute(
      [{ commandType: 'resource.spend', targetId: 'resource-credits', value: 3 }],
      snapshot,
      context(graph, graph.stateById as ReadonlyMap<string, StateVariableConstraint>),
    );
    const failed = await executor.execute(
      [{ commandType: 'resource.spend', targetId: 'resource-credits', value: 3 }],
      snapshot,
      {
        ...context(graph, graph.stateById as ReadonlyMap<string, StateVariableConstraint>),
        authorityMode: 'serverConfirmed',
      },
    );
    const accepted = await executor.execute(
      [{ commandType: 'resource.spend', targetId: 'resource-credits', value: 1 }],
      snapshot,
      {
        ...context(graph, graph.stateById as ReadonlyMap<string, StateVariableConstraint>),
        authorityMode: 'serverConfirmed',
      },
    );

    expect(unconfirmed.errors?.[0]?.code).toBe('AUTHORITATIVE_CONFIRMATION_REQUIRED');
    expect(unconfirmed.snapshot?.resources['resource-credits']).toBe(2);
    expect(unconfirmed.requiresAuthoritativeConfirmation).toEqual([
      { commandType: 'resource.spend', targetId: 'resource-credits', value: 3 },
    ]);
    expect(failed.errors?.[0]?.code).toBe('INSUFFICIENT_RESOURCE');
    expect(failed.snapshot?.resources['resource-credits']).toBe(2);
    expect(accepted.snapshot?.resources['resource-credits']).toBe(1);
    expect(accepted.requiresAuthoritativeConfirmation).toEqual([]);
  });
});

function context(
  graph: Awaited<ReturnType<typeof createSimpleRuntime>>['graph'],
  stateDefinitions: ReadonlyMap<string, StateVariableConstraint>,
) {
  return {
    tenantId: studentScope.tenantId,
    projectId: graph.projectId,
    projectVersion: graph.projectVersion,
    scope: studentScope,
    definitions: graph,
    stateDefinitions,
    authorityMode: 'localMock' as const,
  };
}
