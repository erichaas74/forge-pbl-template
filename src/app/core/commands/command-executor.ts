import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from '../events/runtime-event';
import { runtimeError } from '../errors/runtime-error-factory';
import type { CommandHandlerRegistry } from '../registries/specialized-registries';
import type { CoreRuntimeState } from '../state/core-runtime-state';
import { applyStateMutations } from '../state/state-mutation-applier';
import type { StateMutation } from '../state/persistence-contracts';
import type { Clock } from '../time/clock';
import { SystemClock } from '../time/clock';
import type { CommandAuthorization } from './command-handler-contracts';
import type {
  CommandExecutionContext,
  CommandExecutionResult,
  CommandExecutor,
  RuntimeCommand,
} from './runtime-command';

export class RegisteredCommandExecutor<
  TState extends CoreRuntimeState,
  TDefinitions = unknown,
> implements CommandExecutor<TState, TDefinitions>
{
  constructor(
    private readonly handlers: CommandHandlerRegistry<TState, TDefinitions>,
    private readonly authorization?: CommandAuthorization<TState, TDefinitions>,
    private readonly clock: Clock = new SystemClock(),
  ) {}

  async execute(
    commands: RuntimeCommand[],
    state: TState,
    context: CommandExecutionContext<TDefinitions>,
  ): Promise<CommandExecutionResult<TState>> {
    let working = structuredClone(state);
    const mutations: StateMutation[] = [];
    const derivedEvents: RuntimeEvent[] = [];
    const executedCommands: RuntimeCommand[] = [];
    const requiresAuthoritativeConfirmation: RuntimeCommand[] = [];
    const errors: RuntimeError[] = [];

    for (const command of commands) {
      const registration = this.handlers.get(command.commandType);
      if (registration === undefined) {
        errors.push(
          runtimeError(
            'INVALID_COMMAND',
            `Command type "${command.commandType}" has no registered handler.`,
            { sourceId: command.targetId },
          ),
        );
        break;
      }

      const authorizationError = this.authorization?.authorize(
        command,
        working,
        context,
      );
      if (authorizationError !== undefined) {
        errors.push(authorizationError);
        break;
      }

      if (
        registration.authority === 'serverRequired' &&
        context.authorityMode !== 'serverConfirmed'
      ) {
        requiresAuthoritativeConfirmation.push(command);
        if (context.allowLocalAuthorityBypass !== true) {
          errors.push(
            runtimeError(
              'AUTHORITATIVE_CONFIRMATION_REQUIRED',
              `Command "${command.commandType}" must be confirmed by the authoritative server.`,
              { sourceId: command.targetId },
            ),
          );
          break;
        }
      }

      let handled;
      try {
        handled = registration.handler.execute(command, working, context);
      } catch {
        errors.push(
          runtimeError(
            'COMMAND_HANDLER_FAILED',
            `Command handler "${command.commandType}" failed safely.`,
            { sourceId: command.targetId },
          ),
        );
        break;
      }

      if (handled.errors !== undefined && handled.errors.length > 0) {
        errors.push(...handled.errors);
        break;
      }

      const applied = applyStateMutations<TState>(working, handled.mutations);
      if (!applied.success) {
        errors.push(...(applied.errors ?? []));
        break;
      }

      working = applied.state;
      mutations.push(...handled.mutations);
      derivedEvents.push(...(handled.derivedEvents ?? []));
      executedCommands.push(command);
    }

    if (errors.length > 0) {
      return {
        success: false,
        snapshot: structuredClone(state),
        executedCommands: [],
        mutations: [],
        requiresAuthoritativeConfirmation:
          requiresAuthoritativeConfirmation.length > 0
            ? requiresAuthoritativeConfirmation
            : undefined,
        errors,
      };
    }

    if (mutations.length > 0) {
      working.version = state.version + 1;
      working.lastUpdated = this.clock.now();
    }

    return {
      success: true,
      snapshot: working,
      executedCommands,
      mutations,
      derivedEvents,
      requiresAuthoritativeConfirmation,
    };
  }
}
