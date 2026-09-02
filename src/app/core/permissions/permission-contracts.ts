import type { RuntimeActor } from '../events/runtime-event';

export interface PermissionSet {
  readonly granted: ReadonlySet<string>;
}

export interface PermissionService {
  can(actor: RuntimeActor, action: string, target?: string): boolean;
}

