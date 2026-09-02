import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from '../events/runtime-event';
import type { StateMutation } from '../state/persistence-contracts';
import type {
  CommandExecutionContext,
  RuntimeCommand,
} from './runtime-command';

export interface CommandHandlingResult {
  mutations: StateMutation[];
  derivedEvents?: RuntimeEvent[];
  errors?: RuntimeError[];
}

export interface CommandHandler<TState = unknown, TDefinitions = unknown> {
  commandType: string;
  execute(
    command: RuntimeCommand,
    state: Readonly<TState>,
    context: CommandExecutionContext<TDefinitions>,
  ): CommandHandlingResult;
}

export interface CommandAuthorization<TState = unknown, TDefinitions = unknown> {
  authorize(
    command: RuntimeCommand,
    state: Readonly<TState>,
    context: CommandExecutionContext<TDefinitions>,
  ): RuntimeError | undefined;
}

