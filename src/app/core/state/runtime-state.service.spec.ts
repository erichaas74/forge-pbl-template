import { pointer } from './state-mutation-applier';
import {
  createSimpleRuntime,
  secondStudentScope,
  studentScope,
} from '../../testing/runtime-test-helpers';

describe('RuntimeStateService', () => {
  it('initializes configuration-derived state without mutating the project graph', async () => {
    const { platform, graph } = await createSimpleRuntime();

    const snapshot = platform.state.getSnapshot(studentScope);

    expect(snapshot).toMatchObject({
      version: 0,
      tenantId: studentScope.tenantId,
      projectId: graph.projectId,
      projectVersion: graph.projectVersion,
      resources: { 'resource-credits': 2 },
      finalSubmission: { status: 'closed' },
    });
    expect(snapshot?.evidence['ev-result']?.status).toBe('locked');
    expect(snapshot?.activities['act-test']?.status).toBe('notStarted');
    expect(snapshot?.phases['phase-start']?.status).toBe('available');
    expect(snapshot?.stateValues['case.variant']).toMatch(/^[ab]$/);
    expect(graph.stateById.get('case.path')?.initialValue).toBe('default');
  });

  it('applies explicit mutations and increments the snapshot version once', async () => {
    const { platform } = await createSimpleRuntime();
    const result = await platform.state.applyMutations(
      studentScope,
      [
        {
          operation: 'set',
          path: pointer('stateValues', 'case.path'),
          value: 'npc',
        },
      ],
      0,
    );

    expect(result).toMatchObject({ success: true, previousVersion: 0, newVersion: 1 });
    expect(result.snapshot?.stateValues['case.path']).toBe('npc');
  });

  it('returns STATE_CONFLICT when optimistic version does not match', async () => {
    const { platform } = await createSimpleRuntime();

    const result = await platform.state.applyMutations(
      studentScope,
      [{ operation: 'set', path: pointer('stateValues', 'case.path'), value: 'npc' }],
      4,
    );

    expect(result).toMatchObject({
      success: false,
      conflict: true,
      errors: [{ code: 'STATE_CONFLICT' }],
    });
  });

  it('keeps separate snapshots for separate student scopes', async () => {
    const { platform, graph } = await createSimpleRuntime();
    await platform.initializeScope(graph, secondStudentScope, true);

    await platform.state.applyMutations(
      studentScope,
      [{ operation: 'set', path: pointer('stateValues', 'case.path'), value: 'npc' }],
      0,
    );

    expect(platform.state.getStateValue(studentScope, 'case.path')).toBe('npc');
    expect(platform.state.getStateValue(secondStudentScope, 'case.path')).toBe('default');
  });

  it('isolates identical project and user IDs across tenants', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const otherTenantScope = { ...studentScope, tenantId: 'tenant-school-2' };
    const otherTenantGraph = { ...graph, tenantId: otherTenantScope.tenantId };
    await platform.initializeScope(otherTenantGraph, otherTenantScope, true);

    await platform.state.applyMutations(
      studentScope,
      [{ operation: 'set', path: pointer('stateValues', 'case.path'), value: 'npc' }],
      0,
    );

    expect(platform.state.getStateValue(studentScope, 'case.path')).toBe('npc');
    expect(platform.state.getStateValue(otherTenantScope, 'case.path')).toBe('default');
  });

  it('notifies state and realtime subscribers only after an accepted mutation', async () => {
    const { platform } = await createSimpleRuntime();
    const stateVersions: number[] = [];
    const realtimeVersions: number[] = [];
    platform.state.subscribe(studentScope, (snapshot) => stateVersions.push(snapshot.version));
    platform.realtime.subscribe(
      { scope: studentScope, topic: 'runtime' },
      (snapshot) => realtimeVersions.push(snapshot.version),
    );

    await platform.state.applyMutations(
      studentScope,
      [{ operation: 'set', path: pointer('stateValues', 'case.path'), value: 'npc' }],
      0,
    );

    expect(stateVersions).toEqual([0, 1]);
    expect(realtimeVersions).toEqual([1]);
  });
});
