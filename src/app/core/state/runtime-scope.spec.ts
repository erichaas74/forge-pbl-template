import { runtimeScopeKey, sameRuntimeScope } from './runtime-scope';
import type { RuntimeScope } from './runtime-state-contracts';

const baseScope: RuntimeScope = {
  tenantId: 'tenant-1',
  projectId: 'project-1',
  projectVersion: '1.0.0',
  classId: 'class-1',
  teamId: 'team-1',
  scopeType: 'team',
};

describe('attempt-aware runtime scopes', () => {
  it('keeps practice scopes backwards compatible when attemptId is absent', () => {
    expect(runtimeScopeKey(baseScope)).toContain('project-1::1.0.0::::team');
  });

  it('isolates two official attempts of the same project and team', () => {
    const first = { ...baseScope, attemptId: 'attempt-1' };
    const second = { ...baseScope, attemptId: 'attempt-2' };

    expect(runtimeScopeKey(first)).not.toBe(runtimeScopeKey(second));
    expect(sameRuntimeScope(first, second)).toBe(false);
  });
});
