import type { RuntimeScope } from '../state/runtime-state-contracts';

export type ProjectExperienceMode = 'student' | 'teacher' | 'preview';
export type ProjectAuthorityMode = 'localDemo' | 'serverAuthoritative';

/**
 * Authenticated, enrollment-specific data supplied by the application host.
 * Project packages must never contain this information.
 */
export interface ProjectSessionContext {
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly actorId: string;
  readonly actorDisplayName: string;
  readonly role: string;
  readonly permissions: readonly string[];
  readonly mode: ProjectExperienceMode;
  readonly authorityMode: ProjectAuthorityMode;
  readonly attemptId?: string;
  readonly classId?: string;
  readonly studentId?: string;
  readonly teamId?: string;
}

export function projectSessionRuntimeScope(
  context: ProjectSessionContext,
  scopeType: RuntimeScope['scopeType'],
): RuntimeScope {
  return {
    tenantId: context.tenantId,
    projectId: context.projectId,
    projectVersion: context.projectVersion,
    attemptId: context.attemptId,
    classId: context.classId,
    studentId: scopeType === 'student' ? context.studentId ?? context.actorId : undefined,
    teamId: scopeType === 'team' ? context.teamId : undefined,
    scopeType,
  };
}

export function createLocalPreviewSession(
  projectId: string,
  projectVersion: string,
  overrides: Partial<ProjectSessionContext> = {},
): ProjectSessionContext {
  return Object.freeze({
    tenantId: 'local-preview',
    projectId,
    projectVersion,
    actorId: 'local-preview-actor',
    actorDisplayName: 'Preview learner',
    studentId: 'local-preview-actor',
    classId: 'local-preview-class',
    role: 'student',
    permissions: Object.freeze([]),
    mode: 'preview',
    authorityMode: 'localDemo',
    ...overrides,
  });
}
