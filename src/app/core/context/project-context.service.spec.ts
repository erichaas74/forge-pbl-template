import { ProjectContextService } from './project-context.service';

describe('ProjectContextService', () => {
  it('derives isolated student, team, and class runtime scopes', () => {
    const service = new ProjectContextService({
      tenantId: 'tenant-school-a',
      projectId: 'project-a',
      projectVersion: '1.2.3',
      classId: 'class-a',
      studentId: 'student-a',
      teamId: 'team-a',
      mode: 'student',
    });

    expect(service.toRuntimeScope('student')).toEqual({
      tenantId: 'tenant-school-a',
      projectId: 'project-a',
      projectVersion: '1.2.3',
      classId: 'class-a',
      studentId: 'student-a',
      teamId: undefined,
      scopeType: 'student',
    });
    expect(service.toRuntimeScope('team')).toMatchObject({
      teamId: 'team-a',
      studentId: undefined,
      scopeType: 'team',
    });
    expect(service.toRuntimeScope('class')).toMatchObject({
      studentId: undefined,
      teamId: undefined,
      scopeType: 'class',
    });
  });
});
