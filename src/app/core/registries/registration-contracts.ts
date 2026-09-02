import type { ActionHandler, ConditionEvaluator } from '../rules/rule-contracts';
import type { CommandHandler } from '../commands/command-handler-contracts';
import type { EventCommandProducer } from '../events/event-command-contracts';
import type { ValidationIssue, Validator } from '../validation/validation-contracts';
import type { RegistryEntry, RegistryView } from './registry-contracts';

export type CapabilityStatus = 'core' | 'optional' | 'extension' | 'future';

export interface VersionedRegistration extends RegistryEntry {
  readonly version: string;
  readonly status: CapabilityStatus;
}

export interface CapabilityRegistration extends VersionedRegistration {
  readonly schemaRefs?: readonly string[];
  readonly renderer?: string;
  readonly eventsProduced?: readonly string[];
  readonly conditionsSupported?: readonly string[];
  readonly actionsSupported?: readonly string[];
}

export type CapabilityRegistryView = RegistryView<CapabilityRegistration>;

export interface EventRegistration extends VersionedRegistration {
  readonly description?: string;
  readonly payloadSchemaRef?: string;
}

export interface ConditionRegistration<TState = unknown, TDefinitions = unknown>
  extends VersionedRegistration {
  readonly evaluator: ConditionEvaluator<TState, TDefinitions>;
}

export interface ActionRegistration<TState = unknown>
  extends VersionedRegistration {
  readonly handler: ActionHandler<TState>;
}

export interface CommandHandlerRegistration<
  TState = unknown,
  TDefinitions = unknown,
> extends VersionedRegistration {
  readonly handler: CommandHandler<TState, TDefinitions>;
  readonly authority: 'local' | 'serverRequired';
}

export interface EventCommandRegistration<
  TState = unknown,
  TDefinitions = unknown,
> extends VersionedRegistration {
  readonly producer: EventCommandProducer<TState, TDefinitions>;
}

export interface ComponentRendererRegistration<TRenderer = unknown>
  extends VersionedRegistration {
  readonly renderer: TRenderer;
  readonly supportedConfiguration?: Readonly<Record<string, unknown>>;
}

export interface ActivityTypeRegistration<TPlugin = unknown>
  extends VersionedRegistration {
  readonly plugin: TPlugin;
}

export interface RelationshipRegistration extends VersionedRegistration {
  readonly inverseId?: string;
  readonly directed?: boolean;
}

export interface NPCTypeRegistration<TImplementation = unknown>
  extends VersionedRegistration {
  readonly implementation: TImplementation;
}

export interface SchemaRegistration extends RegistryEntry {
  readonly version: string;
  readonly schema: unknown;
}

export interface ValidatorRegistration<T = unknown> extends RegistryEntry {
  readonly version: string;
  readonly validator: Validator<T>;
}

export interface CapabilityPlugin {
  readonly id: string;
  readonly version: string;
  readonly schemas?: readonly SchemaRegistration[];
  readonly renderers?: readonly ComponentRendererRegistration[];
  readonly eventTypes?: readonly EventRegistration[];
  readonly conditions?: readonly ConditionRegistration[];
  readonly actions?: readonly ActionRegistration[];
  readonly validators?: readonly ValidatorRegistration[];
}

export type PluginValidationHook<T = unknown> = (value: T) => ValidationIssue[];
