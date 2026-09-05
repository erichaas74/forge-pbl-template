import type { RuntimeScope } from './runtime-state-contracts';

export function runtimeScopeKey(scope: RuntimeScope): string {
  return [
    scope.tenantId,
    scope.projectId,
    scope.projectVersion,
    scope.attemptId ?? '',
    scope.scopeType,
    scope.classId ?? '',
    scope.studentId ?? '',
    scope.teamId ?? '',
  ].join('::');
}

export function sameRuntimeScope(left: RuntimeScope, right: RuntimeScope): boolean {
  return runtimeScopeKey(left) === runtimeScopeKey(right);
}
