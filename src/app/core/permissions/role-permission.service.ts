import type { RuntimeActor } from '../events/runtime-event';
import type { PermissionService } from './permission-contracts';

const studentDeniedActions = new Set([
  'activity.reset',
  'evidence.release',
  'solution.reveal',
  'submission.grade',
  'teacher.command',
  'teacher.override',
]);

export class RolePermissionService implements PermissionService {
  constructor(
    private readonly additionalPolicies: ReadonlyMap<
      string,
      ReadonlySet<RuntimeActor['type']>
    > = new Map(),
  ) {}

  can(actor: RuntimeActor, action: string, _target?: string): boolean {
    const policy = this.additionalPolicies.get(action);
    if (policy !== undefined) {
      return policy.has(actor.type);
    }

    if (actor.type === 'system' || actor.type === 'teacher') {
      return true;
    }

    return !studentDeniedActions.has(action) && !action.startsWith('teacher.');
  }
}

