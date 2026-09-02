import { RegisteredCommandExecutor } from '../core/commands/command-executor';
import { registerCoreStateCommandPack } from '../core/commands/core-state-command-pack';
import type { RuntimeEvent } from '../core/events/runtime-event';
import { RuntimeEventBus } from '../core/events/runtime-event-bus';
import { InMemoryIdempotencyStore } from '../core/events/idempotency-store';
import { RuntimeEventLog } from '../core/events/runtime-event-log';
import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import { ProjectPackageLoaderService } from '../core/packages/project-package-loader.service';
import {
  ActionRegistry,
  CapabilityRegistry,
  CommandHandlerRegistry,
  ConditionRegistry,
  EventCommandRegistry,
  EventRegistry,
} from '../core/registries/specialized-registries';
import { RuntimeEngine } from '../core/runtime/runtime-engine';
import type { RuntimeEngineDefinitionAdapter } from '../core/runtime/runtime-engine';
import { DeterministicRuleEngine } from '../core/rules/deterministic-rule-engine';
import type { RuleDefinition } from '../core/rules/rule-contracts';
import type { StateVariableConstraint } from '../core/state/core-runtime-state';
import { RuntimeStateService } from '../core/state/runtime-state.service';
import type { EventResult, RuntimeScope } from '../core/state/runtime-state-contracts';
import type { Clock } from '../core/time/clock';
import { SystemClock } from '../core/time/clock';
import { MemoryRuntimeTracer } from '../core/tracing/runtime-tracer';
import { ValidationService } from '../core/validation/validation.service';
import { InMemoryRuntimePersistenceAdapter } from '../infrastructure/persistence/in-memory-runtime-persistence.adapter';
import { InMemoryRealtimeAdapter } from '../infrastructure/realtime/in-memory-realtime.adapter';
import { InMemoryAssetStorageAdapter } from '../infrastructure/storage/in-memory-asset-storage.adapter';
import type { RuntimeStateSnapshot } from '../templates/investigation/domain/runtime-state';
import { registerInvestigationActionPack } from '../templates/investigation/runtime/investigation-action-pack';
import { registerInvestigationCapabilities } from '../templates/investigation/runtime/investigation-capability-pack';
import { registerInvestigationConditionPack } from '../templates/investigation/runtime/investigation-condition-pack';
import { registerInvestigationEventPack } from '../templates/investigation/runtime/investigation-event-pack';
import { InvestigationRuntimeInitializer } from '../templates/investigation/runtime/investigation-runtime-initializer';
import {
  InvestigationCoreReferenceValidator,
  RegisteredProjectCapabilityValidator,
} from '../templates/investigation/package/investigation-runtime-validators';
import {
  InvestigationProjectPackageAssembler,
  investigationProjectPackageDescriptor,
} from '../templates/investigation/package/investigation-project-package-assembler';
import type { ProjectDefinitionGraph } from '../templates/investigation/package/project-definition-graph';

const definitionAdapter: RuntimeEngineDefinitionAdapter<ProjectDefinitionGraph> = {
  tenantId: (definitions) => definitions.tenantId,
  rules: (definitions) => [...definitions.rulesById.values()] as RuleDefinition[],
  stateDefinitions: (definitions) =>
    definitions.stateById as ReadonlyMap<string, StateVariableConstraint>,
};

export class LocalInvestigationRuntime {
  readonly capabilities = new CapabilityRegistry();
  readonly events = new EventRegistry();
  readonly conditions = new ConditionRegistry<
    RuntimeStateSnapshot,
    ProjectDefinitionGraph
  >();
  readonly actions = new ActionRegistry<RuntimeStateSnapshot>();
  readonly commandHandlers = new CommandHandlerRegistry<
    RuntimeStateSnapshot,
    ProjectDefinitionGraph
  >();
  readonly eventCommands = new EventCommandRegistry<
    RuntimeStateSnapshot,
    ProjectDefinitionGraph
  >();
  readonly validation = new ValidationService<
    ProjectDefinitionGraph,
    typeof this.capabilities
  >();
  readonly persistence: InMemoryRuntimePersistenceAdapter<RuntimeStateSnapshot>;
  readonly realtime = new InMemoryRealtimeAdapter<RuntimeStateSnapshot>();
  readonly assets = new InMemoryAssetStorageAdapter();
  readonly state: RuntimeStateService<RuntimeStateSnapshot>;
  readonly eventBus: RuntimeEventBus;
  readonly tracer = new MemoryRuntimeTracer();
  readonly idempotency = new InMemoryIdempotencyStore<RuntimeStateSnapshot>();
  readonly eventLog = new RuntimeEventLog();
  readonly initializer: InvestigationRuntimeInitializer;
  readonly loader: ProjectPackageLoaderService<
    ProjectDefinitionGraph,
    typeof this.capabilities
  >;
  readonly engine: RuntimeEngine<RuntimeStateSnapshot, ProjectDefinitionGraph>;

  constructor(source: ProjectPackageSource, clock: Clock = new SystemClock()) {
    registerInvestigationCapabilities(this.capabilities);
    registerInvestigationEventPack(this.events, this.eventCommands);
    registerInvestigationConditionPack(this.conditions);
    registerCoreStateCommandPack(this.actions, this.commandHandlers);
    registerInvestigationActionPack(this.actions, this.commandHandlers);
    this.validation.register(new RegisteredProjectCapabilityValidator());
    this.validation.register(new InvestigationCoreReferenceValidator());

    this.persistence = new InMemoryRuntimePersistenceAdapter(clock);
    this.state = new RuntimeStateService(this.persistence, this.realtime);
    this.eventBus = new RuntimeEventBus(this.events);
    this.initializer = new InvestigationRuntimeInitializer(clock);
    this.loader = new ProjectPackageLoaderService(
      source,
      new InvestigationProjectPackageAssembler(),
      investigationProjectPackageDescriptor,
      this.validation,
      this.capabilities,
    );
    this.engine = new RuntimeEngine(
      this.eventBus,
      this.state,
      new DeterministicRuleEngine(this.conditions, this.actions),
      new RegisteredCommandExecutor(this.commandHandlers, undefined, clock),
      this.eventCommands,
      definitionAdapter,
      this.idempotency,
      this.eventLog,
      this.tracer,
    );
  }

  loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<ProjectDefinitionGraph>> {
    return this.loader.load(location);
  }

  async initializeScope(
    graph: ProjectDefinitionGraph,
    scope: RuntimeScope,
    overwrite = false,
  ): Promise<{ snapshot: RuntimeStateSnapshot; errors?: import('../core/errors/runtime-error').RuntimeError[] }> {
    const initialized = this.initializer.create(graph, scope);
    if (initialized.errors?.some((error) => error.severity === 'error' || error.severity === 'fatal')) {
      return initialized;
    }
    const persisted = await this.state.initialize(scope, initialized.snapshot, overwrite);
    return {
      snapshot: persisted.snapshot ?? initialized.snapshot,
      errors: [...(initialized.errors ?? []), ...(persisted.errors ?? [])],
    };
  }

  dispatch(
    scope: RuntimeScope,
    event: RuntimeEvent,
    graph: ProjectDefinitionGraph,
  ): Promise<EventResult<RuntimeStateSnapshot>> {
    return this.engine.dispatch(scope, event, graph);
  }
}
