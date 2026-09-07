import type { ProjectSessionContext } from '../../core/context/project-session-context';

export interface ProjectPermissionRequirement {
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly requireAllPermissions?: boolean;
}

export function canPerformProjectAction(
  context: ProjectSessionContext,
  requirement: ProjectPermissionRequirement,
): boolean {
  if (requirement.roles !== undefined && !requirement.roles.includes(context.role)) return false;
  const required = requirement.permissions ?? [];
  return requirement.requireAllPermissions === false
    ? required.length === 0 || required.some((permission) => context.permissions.includes(permission))
    : required.every((permission) => context.permissions.includes(permission));
}
