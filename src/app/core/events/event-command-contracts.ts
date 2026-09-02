import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from './runtime-event';

export interface EventCommandContext<TDefinitions = unknown> {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  definitions?: TDefinitions;
}

export interface EventCommandResult {
  commands: RuntimeCommand[];
  errors?: RuntimeError[];
}

export interface EventCommandProducer<TState = unknown, TDefinitions = unknown> {
  eventType: string;
  createCommands(
    event: RuntimeEvent,
    state: Readonly<TState>,
    context: EventCommandContext<TDefinitions>,
  ): EventCommandResult;
}
