import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeScope } from '../state/runtime-state-contracts';

export interface AuthoritativeCommandRequest {
  readonly attemptId: string;
  readonly scope: RuntimeScope;
  readonly command: RuntimeCommand;
  readonly idempotencyKey: string;
  readonly expectedVersions?: Readonly<Record<string, number>>;
}

export interface AuthoritativeCommandResult {
  readonly operationId: string;
  readonly status: 'accepted' | 'rejected' | 'pending';
  readonly committedEventIds?: readonly string[];
  readonly affectedVersions?: Readonly<Record<string, number>>;
  readonly errors?: readonly RuntimeError[];
}

/**
 * Boundary for commands whose result must be decided by authenticated,
 * server-authoritative infrastructure. Implementations resolve actor identity
 * from the authenticated request context rather than trusting client fields.
 */
export interface AuthoritativeCommandGateway {
  execute(request: AuthoritativeCommandRequest): Promise<AuthoritativeCommandResult>;
  reconcile(operationId: string): Promise<AuthoritativeCommandResult>;
}
