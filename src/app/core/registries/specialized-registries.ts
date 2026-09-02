import { Registry } from './registry';
import type {
  ActionRegistration,
  ActivityTypeRegistration,
  CapabilityRegistration,
  ComponentRendererRegistration,
  ConditionRegistration,
  CommandHandlerRegistration,
  EventCommandRegistration,
  EventRegistration,
  NPCTypeRegistration,
  RelationshipRegistration,
} from './registration-contracts';

export class CapabilityRegistry extends Registry<CapabilityRegistration> {
  constructor() {
    super('capabilities');
  }
}

export class EventRegistry extends Registry<EventRegistration> {
  constructor() {
    super('events');
  }
}

export class ConditionRegistry<TState = unknown, TDefinitions = unknown> extends Registry<
  ConditionRegistration<TState, TDefinitions>
> {
  constructor() {
    super('conditions');
  }
}

export class CommandHandlerRegistry<
  TState = unknown,
  TDefinitions = unknown,
> extends Registry<CommandHandlerRegistration<TState, TDefinitions>> {
  constructor() {
    super('command-handlers');
  }
}

export class EventCommandRegistry<
  TState = unknown,
  TDefinitions = unknown,
> extends Registry<EventCommandRegistration<TState, TDefinitions>> {
  constructor() {
    super('event-command-producers');
  }
}

export class ActionRegistry<TState = unknown> extends Registry<
  ActionRegistration<TState>
> {
  constructor() {
    super('actions');
  }
}

export class EvidenceTypeRegistry<TRenderer = unknown> extends Registry<
  ComponentRendererRegistration<TRenderer>
> {
  constructor() {
    super('evidence-types');
  }
}

export class ActivityTypeRegistry<TPlugin = unknown> extends Registry<
  ActivityTypeRegistration<TPlugin>
> {
  constructor() {
    super('activity-types');
  }
}

export class BoardSectionRegistry<TRenderer = unknown> extends Registry<
  ComponentRendererRegistration<TRenderer>
> {
  constructor() {
    super('board-sections');
  }
}

export class RelationshipRegistry extends Registry<RelationshipRegistration> {
  constructor() {
    super('relationships');
  }
}

export class FinalSectionRegistry<TRenderer = unknown> extends Registry<
  ComponentRendererRegistration<TRenderer>
> {
  constructor() {
    super('final-sections');
  }
}

export class NPCTypeRegistry<TImplementation = unknown> extends Registry<
  NPCTypeRegistration<TImplementation>
> {
  constructor() {
    super('npc-types');
  }
}
