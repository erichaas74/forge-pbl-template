import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeActor, RuntimeEvent } from '../events/runtime-event';
import type { StateMutation } from '../state/persistence-contracts';
import type { RuntimeScope } from '../state/runtime-state-contracts';
import type { StateVariableConstraint } from '../state/core-runtime-state';

export interface RuntimeCommand {
  commandType: string;
  targetId?: string;
  value?: unknown;
  params?: Record<string, unknown>;
}

export interface CommandExecutionContext<TDefinitions = unknown> {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  requestId?: string;
  eventTimestamp?: string;
  actor?: RuntimeActor;
  scope?: RuntimeScope;
  definitions?: TDefinitions;
  stateDefinitions?: ReadonlyMap<string, StateVariableConstraint>;
  authorityMode?: 'localMock' | 'serverConfirmed';
  /** Explicitly enabled only by local/demo composition roots. */
  allowLocalAuthorityBypass?: boolean;
}

export interface CommandExecutionResult<TSnapshot = unknown> {
  success: boolean;
  snapshot?: TSnapshot;
  executedCommands: RuntimeCommand[];
  mutations: StateMutation[];
  derivedEvents?: RuntimeEvent[];
  requiresAuthoritativeConfirmation?: RuntimeCommand[];
  errors?: RuntimeError[];
}

export interface CommandExecutor<TSnapshot = unknown, TDefinitions = unknown> {
  execute(
    commands: RuntimeCommand[],
    state: TSnapshot,
    context: CommandExecutionContext<TDefinitions>,
  ): Promise<CommandExecutionResult<TSnapshot>>;
}
