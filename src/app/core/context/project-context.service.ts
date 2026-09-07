import type { RuntimeScope } from '../state/runtime-state-contracts';

/** @deprecated Prefer ProjectSessionContext for new integrations. */
export interface ProjectContext {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  attemptId?: string;
  classId?: string;
  studentId?: string;
  teamId?: string;
  mode: 'student' | 'teacher' | 'preview';
}

export class ProjectContextService {
  readonly context: Readonly<ProjectContext>;

  constructor(context: ProjectContext) {
    this.context = Object.freeze({ ...context });
  }

  toRuntimeScope(scopeType: RuntimeScope['scopeType']): RuntimeScope {
    return {
      tenantId: this.context.tenantId,
      projectId: this.context.projectId,
      projectVersion: this.context.projectVersion,
      attemptId: this.context.attemptId,
      classId: this.context.classId,
      studentId: scopeType === 'student' ? this.context.studentId : undefined,
      teamId: scopeType === 'team' ? this.context.teamId : undefined,
      scopeType,
    };
  }
}
