import { RolePermissionService } from './role-permission.service';

describe('RolePermissionService', () => {
  it('denies teacher-only student actions and permits teacher/system actions', () => {
    const service = new RolePermissionService();

    expect(service.can({ type: 'student', id: 'student-a' }, 'teacher.command')).toBe(false);
    expect(service.can({ type: 'student', id: 'student-a' }, 'activity.start')).toBe(true);
    expect(service.can({ type: 'teacher', id: 'teacher-a' }, 'teacher.command')).toBe(true);
    expect(service.can({ type: 'system' }, 'solution.reveal')).toBe(true);
  });

  it('lets explicit policies override the defaults', () => {
    const service = new RolePermissionService(
      new Map([['custom.action', new Set(['team' as const])]]),
    );

    expect(service.can({ type: 'team', id: 'team-a' }, 'custom.action')).toBe(true);
    expect(service.can({ type: 'teacher', id: 'teacher-a' }, 'custom.action')).toBe(false);
  });
});
