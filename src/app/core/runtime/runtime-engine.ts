import type { CommandExecutor } from '../commands/runtime-command';
import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import { runtimeError } from '../errors/runtime-error-factory';
import type { EventCommandRegistry } from '../registries/specialized-registries';
import type { RuleDefinition, RuleEngine } from '../rules/rule-contracts';
import type { CoreRuntimeState, StateVariableConstraint } from '../state/core-runtime-state';
import type { EventResult, RuntimeScope } from '../state/runtime-state-contracts';
import type { RuntimeStateService } from '../state/runtime-state.service';
import type { RuntimeTracer } from '../tracing/runtime-tracer';
import { NoopRuntimeTracer } from '../tracing/runtime-tracer';
import type { RuntimeEvent } from '../events/runtime-event';
import type { IdempotencyStore } from '../events/idempotency-store';
import { InMemoryIdempotencyStore } from '../events/idempotency-store';
import type { RuntimeEventLog } from '../events/runtime-event-log';
import { RuntimeEventLog as BoundedRuntimeEventLog } from '../events/runtime-event-log';
import type { RuntimeEventBus } from '../events/runtime-event-bus';
import { runtimeScopeKey } from '../state/runtime-scope';

export interface RuntimeEngineDefinitionAdapter<TDefinitions> {
  tenantId(definitions: TDefinitions): string;
  rules(definitions: TDefinitions): RuleDefinition[];
  stateDefinitions(
    definitions: TDefinitions,
  ): ReadonlyMap<string, StateVariableConstraint>;
}

export interface RuntimeAuthorityPolicy {
  readonly mode: 'localMock' | 'serverConfirmed';
  readonly allowLocalAuthorityBypass?: boolean;
}

export class RuntimeEngine<
  TState extends CoreRuntimeState,
  TDefinitions = unknown,
> {
  private readonly inFlight = new Map<string, Promise<EventResult<TState>>>();

  constructor(
    private readonly eventBus: RuntimeEventBus,
    private readonly state: RuntimeStateService<TState>,
    private readonly ruleEngine: RuleEngine<TState, TDefinitions>,
    private readonly commandExecutor: CommandExecutor<TState, TDefinitions>,
    private readonly eventCommands: EventCommandRegistry<TState, TDefinitions>,
    private readonly definitionAdapter: RuntimeEngineDefinitionAdapter<TDefinitions>,
    private readonly idempotency: IdempotencyStore<TState> = new InMemoryIdempotencyStore(),
    private readonly eventLog: RuntimeEventLog = new BoundedRuntimeEventLog(),
    private readonly tracer: RuntimeTracer = new NoopRuntimeTracer(),
    private readonly maximumDerivedEventDepth = 8,
    private readonly authorityPolicy: RuntimeAuthorityPolicy = { mode: 'localMock' },
  ) {}

  async dispatch(
    scope: RuntimeScope,
    event: RuntimeEvent,
    definitions: TDefinitions,
  ): Promise<EventResult<TState>> {
    const idempotencyKey = event.clientEventId ?? event.id;
    const inFlightKey = `${runtimeScopeKey(scope)}::${idempotencyKey}`;
    const pending = this.inFlight.get(inFlightKey);
    if (pending !== undefined) {
      return this.duplicateResult(await pending, event, idempotencyKey);
    }

    const operation = this.process(scope, event, definitions, 0);
    this.inFlight.set(inFlightKey, operation);
    try {
      return await operation;
    } finally {
      this.inFlight.delete(inFlightKey);
    }
  }

  private async process(
    scope: RuntimeScope,
    event: RuntimeEvent,
    definitions: TDefinitions,
    depth: number,
  ): Promise<EventResult<TState>> {
    if (depth > this.maximumDerivedEventDepth) {
      return {
        event,
        errors: [
          runtimeError(
            'DERIVED_EVENT_DEPTH_EXCEEDED',
            `Derived event processing exceeded depth ${this.maximumDerivedEventDepth}.`,
            { sourceId: event.id },
          ),
        ],
      };
    }

    const idempotencyKey = event.clientEventId ?? event.id;
    const previous = this.idempotency.get(scope, idempotencyKey);
    if (previous !== undefined) {
      return this.duplicateResult(previous, event, idempotencyKey);
    }

    const snapshot = this.state.getSnapshot(scope);
    if (snapshot === undefined) {
      return {
        event,
        errors: [
          runtimeError('RUNTIME_NOT_FOUND', 'Runtime scope must be initialized before dispatch.'),
        ],
      };
    }
    if (
      snapshot.tenantId !== event.tenantId ||
      snapshot.tenantId !== scope.tenantId ||
      snapshot.tenantId !== this.definitionAdapter.tenantId(definitions) ||
      snapshot.projectId !== event.projectId ||
      snapshot.projectId !== scope.projectId ||
      snapshot.projectVersion !== scope.projectVersion ||
      event.attemptId !== scope.attemptId
    ) {
      return {
        event,
        snapshot,
        errors: [
          runtimeError(
            'EVENT_SCOPE_MISMATCH',
            'Event, runtime snapshot, and scope do not identify the same project version.',
            { sourceId: event.id },
          ),
        ],
      };
    }

    const published = this.eventBus.publish(scope, event);
    if (!published.accepted) {
      return { event, snapshot, errors: published.errors };
    }
    this.eventLog.append(scope, event);

    const errors: RuntimeError[] = [];
    const producer = this.eventCommands.get(event.eventType)?.producer;
    let direct: { commands: RuntimeCommand[]; errors?: RuntimeError[] } = {
      commands: [],
    };
    try {
      direct = producer?.createCommands(event, snapshot, {
        tenantId: snapshot.tenantId,
        projectId: snapshot.projectId,
        projectVersion: snapshot.projectVersion,
        definitions,
      }) ?? { commands: [] };
    } catch {
      direct = {
        commands: [],
        errors: [
          runtimeError(
            'EVENT_COMMAND_PRODUCER_FAILED',
            `Event command producer for "${event.eventType}" failed safely.`,
            { sourceId: event.id },
          ),
        ],
      };
    }
    errors.push(...(direct.errors ?? []));

    const executionContext = {
      tenantId: snapshot.tenantId,
      projectId: snapshot.projectId,
      projectVersion: snapshot.projectVersion,
      requestId: event.id,
      eventTimestamp: event.timestamp,
      actor: event.actor,
      scope,
      definitions,
      stateDefinitions: this.definitionAdapter.stateDefinitions(definitions),
      authorityMode: this.authorityPolicy.mode,
      allowLocalAuthorityBypass: this.authorityPolicy.allowLocalAuthorityBypass,
    };
    const directPreview = await this.commandExecutor.execute(
      direct.commands,
      snapshot,
      executionContext,
    );
    errors.push(...(directPreview.errors ?? []));
    const ruleState = directPreview.success
      ? (directPreview.snapshot ?? snapshot)
      : snapshot;

    const rules = this.ruleEngine.evaluateEvent(
      event,
      ruleState,
      this.definitionAdapter.rules(definitions),
      definitions,
    );
    errors.push(...(rules.errors ?? []));

    if (errors.some((error) => error.severity === 'error' || error.severity === 'fatal')) {
      const result: EventResult<TState> = {
        event,
        matchedRuleIds: rules.matchedRules,
        commands: [],
        snapshot,
        errors,
      };
      this.finish(scope, event, result);
      return result;
    }

    const commands: RuntimeCommand[] = [
      ...direct.commands,
      ...rules.commands,
      ...(rules.ruleIdsToMarkFired ?? []).map((ruleId) => ({
        commandType: 'runtime.markRuleFired',
        targetId: ruleId,
      })),
    ];
    const execution = await this.commandExecutor.execute(
      commands,
      snapshot,
      executionContext,
    );
    errors.push(...(execution.errors ?? []));
    if (!execution.success) {
      const result: EventResult<TState> = {
        event,
        matchedRuleIds: rules.matchedRules,
        commands,
        snapshot,
        errors,
      };
      this.finish(scope, event, result);
      return result;
    }

    let acceptedSnapshot = snapshot;
    if (execution.mutations.length > 0) {
      const persistence = await this.state.applyMutations(
        scope,
        execution.mutations,
        snapshot.version,
      );
      errors.push(...(persistence.errors ?? []));
      if (!persistence.success || persistence.snapshot === undefined) {
        const result: EventResult<TState> = {
          event,
          matchedRuleIds: rules.matchedRules,
          commands,
          snapshot,
          errors,
        };
        this.finish(scope, event, result);
        return result;
      }
      acceptedSnapshot = persistence.snapshot;
    }

    for (const derivedEvent of execution.derivedEvents ?? []) {
      const derivedResult = await this.process(
        scope,
        derivedEvent,
        definitions,
        depth + 1,
      );
      errors.push(...(derivedResult.errors ?? []));
      acceptedSnapshot = derivedResult.snapshot ?? acceptedSnapshot;
    }

    const result: EventResult<TState> = {
      event,
      matchedRuleIds: rules.matchedRules,
      commands,
      snapshot: acceptedSnapshot,
      errors: errors.length === 0 ? undefined : errors,
    };
    this.finish(scope, event, result);
    return result;
  }

  private finish(
    scope: RuntimeScope,
    event: RuntimeEvent,
    result: EventResult<TState>,
  ): void {
    this.idempotency.record(scope, event.clientEventId ?? event.id, result);
    this.tracer.trace({
      timestamp: new Date().toISOString(),
      eventId: event.id,
      eventType: event.eventType,
      matchedRuleIds: result.matchedRuleIds,
      commandTypes: result.commands?.map((command) => command.commandType),
      stateVersion: result.snapshot?.version,
      attemptId: scope.attemptId,
      errors: result.errors,
    });
  }

  private duplicateResult(
    previous: EventResult<TState>,
    event: RuntimeEvent,
    idempotencyKey: string,
  ): EventResult<TState> {
    return {
      ...previous,
      event,
      duplicate: true,
      errors: [
        ...(previous.errors ?? []),
        runtimeError(
          'DUPLICATE_EVENT',
          `Event "${idempotencyKey}" has already been processed for this scope.`,
          { severity: 'info', sourceId: event.id },
        ),
      ],
    };
  }
}
