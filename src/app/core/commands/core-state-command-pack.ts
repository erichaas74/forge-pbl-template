import type { ActionHandler, RuleAction } from '../rules/rule-contracts';
import type {
  ActionRegistry,
  CommandHandlerRegistry,
} from '../registries/specialized-registries';
import type { RuntimeError } from '../errors/runtime-error';
import { runtimeError } from '../errors/runtime-error-factory';
import type {
  CoreRuntimeState,
  StateVariableConstraint,
} from '../state/core-runtime-state';
import { pointer } from '../state/state-mutation-applier';
import type { CommandHandlingResult } from './command-handler-contracts';
import type {
  CommandExecutionContext,
  RuntimeCommand,
} from './runtime-command';

export const coreStateCommandTypes = [
  'state.set',
  'state.increment',
  'state.decrement',
  'state.toggle',
  'state.addToList',
  'state.removeFromList',
] as const;

export function registerCoreStateCommandPack<
  TState extends CoreRuntimeState,
  TDefinitions = unknown,
>(
  actions: ActionRegistry<TState>,
  commands: CommandHandlerRegistry<TState, TDefinitions>,
): void {
  for (const commandType of coreStateCommandTypes) {
    actions.register({
      id: commandType,
      version: '1.0.0',
      status: 'core',
      handler: passthroughAction(commandType),
    });
    commands.register({
      id: commandType,
      version: '1.0.0',
      status: 'core',
      authority: 'local',
      handler: {
        commandType,
        execute: (command, state, context) =>
          handleStateCommand(command, state, context),
      },
    });
  }

  commands.register({
    id: 'runtime.markRuleFired',
    version: '1.0.0',
    status: 'core',
    authority: 'local',
    handler: {
      commandType: 'runtime.markRuleFired',
      execute: (command) =>
        command.targetId === undefined
          ? failure('INVALID_COMMAND', 'runtime.markRuleFired requires targetId.')
          : {
              mutations: [
                {
                  operation: 'add',
                  path: '/firedRuleIds',
                  value: command.targetId,
                },
              ],
            },
    },
  });
}

export function passthroughAction<TState>(
  type: string,
): ActionHandler<TState> {
  return {
    type,
    createCommands: (action: RuleAction): RuntimeCommand[] => [
      {
        commandType: type,
        targetId: action.targetId,
        value: action.value,
        params: action.params,
      },
    ],
  };
}

function handleStateCommand<TState extends CoreRuntimeState, TDefinitions>(
  command: RuntimeCommand,
  state: Readonly<TState>,
  context: CommandExecutionContext<TDefinitions>,
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined) {
    return failure('INVALID_COMMAND', `${command.commandType} requires targetId.`);
  }
  const definition = context.stateDefinitions?.get(id);
  if (definition === undefined) {
    return failure(
      'STATE_VARIABLE_NOT_FOUND',
      `State variable "${id}" is not declared.`,
      id,
    );
  }
  if (definition.mutable === false) {
    return failure('STATE_VARIABLE_IMMUTABLE', `State variable "${id}" is immutable.`, id);
  }

  const current = state.stateValues[id];
  let next: unknown;
  switch (command.commandType) {
    case 'state.set':
      next = command.value;
      break;
    case 'state.increment':
    case 'state.decrement': {
      if (typeof current !== 'number' || typeof command.value !== 'number') {
        return failure(
          'INVALID_STATE_OPERATION',
          `${command.commandType} requires numeric state and value.`,
          id,
        );
      }
      next =
        command.commandType === 'state.increment'
          ? current + command.value
          : current - command.value;
      break;
    }
    case 'state.toggle':
      if (typeof current !== 'boolean') {
        return failure('INVALID_STATE_OPERATION', 'state.toggle requires boolean state.', id);
      }
      next = !current;
      break;
    case 'state.addToList':
      if (!Array.isArray(current)) {
        return failure('INVALID_STATE_OPERATION', 'state.addToList requires list state.', id);
      }
      next = current.some((value) => Object.is(value, command.value))
        ? [...current]
        : [...current, command.value];
      break;
    case 'state.removeFromList':
      if (!Array.isArray(current)) {
        return failure(
          'INVALID_STATE_OPERATION',
          'state.removeFromList requires list state.',
          id,
        );
      }
      next = current.filter((value) => !Object.is(value, command.value));
      break;
    default:
      return failure('INVALID_COMMAND', `Unsupported state command "${command.commandType}".`, id);
  }

  const validationError = validateStateValue(definition, next);
  if (validationError !== undefined) {
    return { mutations: [], errors: [validationError] };
  }

  return {
    mutations: [{ operation: 'set', path: pointer('stateValues', id), value: next }],
  };
}

function validateStateValue(
  definition: StateVariableConstraint,
  value: unknown,
): RuntimeError | undefined {
  const typeValid =
    (definition.stateType === 'boolean' && typeof value === 'boolean') ||
    ((definition.stateType === 'number' || definition.stateType === 'counter') &&
      typeof value === 'number' &&
      Number.isFinite(value)) ||
    ((definition.stateType === 'string' ||
      definition.stateType === 'choice' ||
      definition.stateType === 'status') &&
      typeof value === 'string') ||
    (definition.stateType === 'list' && Array.isArray(value));
  if (!typeValid) {
    return runtimeError(
      'INVALID_STATE_VALUE',
      `Value for state "${definition.id}" does not match type "${definition.stateType}".`,
      { sourceId: definition.id },
    );
  }
  if (
    definition.allowedValues !== undefined &&
    definition.stateType !== 'list' &&
    !definition.allowedValues.some((allowed) => Object.is(allowed, value))
  ) {
    return runtimeError(
      'INVALID_STATE_VALUE',
      `Value for state "${definition.id}" is not allowed.`,
      { sourceId: definition.id },
    );
  }
  if (typeof value === 'number') {
    if (definition.min !== undefined && value < definition.min) {
      return runtimeError('STATE_MIN_EXCEEDED', `State "${definition.id}" is below minimum.`, {
        sourceId: definition.id,
      });
    }
    if (definition.max !== undefined && value > definition.max) {
      return runtimeError('STATE_MAX_EXCEEDED', `State "${definition.id}" exceeds maximum.`, {
        sourceId: definition.id,
      });
    }
  }
  return undefined;
}

function failure(code: string, message: string, sourceId?: string): CommandHandlingResult {
  return {
    mutations: [],
    errors: [runtimeError(code, message, { sourceId })],
  };
}
