# Investigation Component Contracts

## Purpose

Define the contracts between Angular components, reusable services, runtime engines, and future backend adapters.

The main architectural goal is to keep components replaceable/extensible and prevent direct coupling between unrelated systems.

---

# 1. Universal Project Component Context

Every reusable project-facing component should be able to receive or resolve a common context.

```ts
export interface ProjectComponentContext {
  tenantId: string;
  projectId: string;
  projectVersion: string;

  studentId?: string;
  teamId?: string;
  classId?: string;

  mode: 'student' | 'teacher' | 'preview';

  permissions: PermissionSet;

  runtime: RuntimeStateSnapshot;

  capabilities: CapabilityRegistryView;

  locale?: string;

  accessibility?: AccessibilitySettings;
}
```

The component should not care:

- how login occurred
- which database vendor is used
- where project configuration was stored
- how realtime is implemented

---

# 2. Runtime Event Contract

Components emit shared RuntimeEvents.

```ts
export interface RuntimeEvent {
  id: string;
  tenantId: string;
  projectId: string;
  eventType: string;
  timestamp: string;

  actor: {
    type: 'student' | 'team' | 'teacher' | 'system';
    id?: string;
  };

  sourceId?: string;
  payload?: Record<string, unknown>;
  clientEventId?: string;
}
```

Event names must come from the Event Registry.

---

# 3. Runtime Command Contract

Rules/teacher controls create commands.

```ts
export interface RuntimeCommand {
  commandType: string;
  targetId?: string;
  value?: unknown;
  params?: Record<string, unknown>;
}
```

Commands describe desired state change.

They do not contain Angular UI implementation logic.

---

# 4. Runtime State Store

```ts
export interface RuntimeStateStore {
  getSnapshot(): RuntimeStateSnapshot;

  getStateValue(id: string): unknown;

  dispatch(event: RuntimeEvent): Promise<EventResult>;

  subscribe(
    scope: RuntimeScope,
    callback: RuntimeStateListener
  ): Unsubscribe;
}
```

Components should not directly write arbitrary persistent fields.

---

# 5. Rule Engine

```ts
export interface RuleEngine {
  evaluateEvent(
    event: RuntimeEvent,
    state: RuntimeStateSnapshot,
    rules: RuleDefinition[]
  ): RuleEvaluationResult;
}
```

The Rule Engine is:

- deterministic
- UI-independent
- registry-driven
- testable

It must not contain Angular rendering code.

---

# 6. Condition Evaluator

```ts
export interface ConditionEvaluator {
  type: string;

  evaluate(
    condition: RuleCondition,
    state: RuntimeStateSnapshot,
    context: RuleEvaluationContext
  ): boolean;
}
```

New condition type:

1. implement evaluator
2. register evaluator
3. add tests/validation

Do not rewrite RuleEngine.

---

# 7. Action Handler

```ts
export interface ActionHandler {
  type: string;

  createCommands(
    action: RuleAction,
    state: RuntimeStateSnapshot,
    context: RuleEvaluationContext
  ): RuntimeCommand[];
}
```

Or, if implementation treats RuleAction itself as a RuntimeCommand, preserve the same registry-driven separation.

---

# 8. Command Executor

```ts
export interface CommandExecutor {
  execute(
    commands: RuntimeCommand[],
    state: RuntimeStateSnapshot,
    context: CommandExecutionContext
  ): Promise<CommandExecutionResult>;
}
```

High-stakes commands must be designed so an authoritative server implementation can replace/confirm the local execution later.

---

# 9. Case Board Inputs

```ts
export interface CaseBoardInputs {
  config: CaseBoardConfiguration;

  runtimeState: BoardRuntimeState;

  evidence: EvidenceRuntimeView[];

  hypotheses: HypothesisRuntimeState[];

  permissions: BoardPermissions;
}
```

---

# 10. Case Board Responsibilities

Case Board may:

- render configured sections
- render cards/items
- allow configured movement/reordering
- allow notes/questions
- emit board/evidence/hypothesis events
- show runtime state

Case Board must not decide:

- whether evidence should unlock
- whether hypothesis is correct
- whether mastery is met
- whether a final submission should open
- whether a teacher rule should fire

Those belong in other engines/services.

---

# 11. Case Board Events

Initial examples:

```text
board.cardMoved
board.sectionUpdated
board.noteCreated
board.questionCreated

evidence.classified
evidence.connected
evidence.disconnected

hypothesis.selected

confidence.changed
```

---

# 12. Board Section Renderer

```ts
export interface BoardSectionRenderer {
  sectionType: string;

  canAccept(
    item: BoardItem,
    section: CaseBoardSection
  ): boolean;

  renderModel(
    section: CaseBoardSection,
    context: ProjectComponentContext
  ): BoardSectionViewModel;
}
```

Angular implementation may use components/factories rather than a literal `renderModel`, but preserve the conceptual contract:

- section type is registered
- host resolves correct renderer/component
- CaseBoard does not know every section implementation

---

# 13. Evidence Renderer

```ts
export interface EvidenceRenderer {
  evidenceType: string;

  createPreview(
    evidence: EvidenceDefinition,
    context: ProjectComponentContext
  ): EvidencePreview;

  createDetail(
    evidence: EvidenceDefinition,
    context: ProjectComponentContext
  ): EvidenceDetail;

  supportedActions(): EvidenceAction[];
}
```

A new evidence type should not require edits to `EvidenceService`.

---

# 14. Evidence Service

```ts
export interface EvidenceServiceContract {
  getEvidence(id: string): EvidenceDefinition | undefined;

  getAvailableEvidence(
    runtime: RuntimeStateSnapshot
  ): EvidenceDefinition[];

  createStudentEvidence(
    input: StudentEvidenceInput
  ): Promise<EvidenceRecord>;

  dispatchEvidenceEvent(
    event: RuntimeEvent
  ): Promise<EventResult>;
}
```

Evidence consequences still run through the shared event/rule/command pipeline.

---

# 15. Student Evidence Creator Plugin

```ts
export interface StudentEvidenceCreatorPlugin {
  evidenceType: string;

  createForm(
    config: EvidenceCreationConfig
  ): EvidenceCreationFormModel;

  validate(
    value: unknown
  ): ValidationResult;

  produceEvidence(
    value: unknown
  ): StudentEvidenceInput;
}
```

Initial creator types may include:

- note
- observation
- measurement
- upload
- screenshot/image reference
- data/graph reference

---

# 16. Hypothesis Panel Inputs

```ts
export interface HypothesisPanelInputs {
  settings: HypothesisSettings;

  hypotheses: HypothesisRuntimeState[];

  availableEvidence: EvidenceRuntimeView[];

  permissions: HypothesisPermissions;
}
```

---

# 17. Hypothesis Events

```text
hypothesis.created
hypothesis.revised
hypothesis.rankChanged
hypothesis.selected
hypothesis.eliminated
hypothesis.evidenceAttached
confidence.changed
```

Hypothesis component does not grade the hypothesis.

---

# 18. Hypothesis History

Revisions are append-only records.

```ts
export interface HypothesisRevision {
  revisionId: string;
  hypothesisId: string;
  timestamp: string;
  statement: string;
  confidence?: number;
  evidenceIds?: string[];
  reasonForChange?: string;
}
```

Do not overwrite the only copy of prior thinking.

---

# 19. Activity Plugin

```ts
export interface ActivityPlugin {
  type: string;

  initialize(
    definition: ActivityDefinition,
    context: ProjectComponentContext
  ): void;

  getState(): ActivityPluginState;

  validateCompletion(): ValidationResult;

  produceResult(): ActivityResult;
}
```

The Activity Host resolves the implementation through a registry.

---

# 20. Activity Result

```ts
export interface ActivityResult {
  activityId: string;

  completed: boolean;

  score?: number;

  outputs?: Record<string, unknown>;

  evidenceProduced?: EvidenceOutput[];

  stateChanges?: StateChangeRequest[];

  resourceChanges?: ResourceChangeRequest[];

  attachments?: string[];

  metadata?: Record<string, unknown>;
}
```

The Investigation engine should not care whether this result came from:

- a source analysis
- a Canvas activity
- an SVG tool
- a Three.js lab
- a scripted interview

---

# 21. Simulation Adapter

```ts
export interface SimulationAdapter {
  initialize(config: SimulationConfig): void;

  beginTrial(): void;

  endTrial(): SimulationTrialResult;

  resetTrial(): void;
}

export interface SimulationTrialResult {
  trialId: string;

  inputs: Record<string, unknown>;

  outputs: Record<string, unknown>;

  score?: number;

  evidence?: EvidenceOutput[];

  stateChanges?: StateChangeRequest[];
}
```

Persistence rule:

save completed trials, not continuous simulation frames.

---

# 22. Investigation State Service

```ts
export interface InvestigationStateServiceContract {
  get(id: string): unknown;

  createEventForSet(
    id: string,
    value: unknown
  ): RuntimeEvent;

  createEventForOperation(
    id: string,
    operation: string,
    value?: unknown
  ): RuntimeEvent;
}
```

Actual mutations still pass through shared runtime/command infrastructure.

---

# 23. Resource Service

```ts
export interface ResourceServiceContract {
  getAmount(
    resourceId: string,
    scope: RuntimeScope
  ): number;

  canSpend(
    resourceId: string,
    amount: number,
    scope: RuntimeScope
  ): boolean;

  requestSpend(
    resourceId: string,
    amount: number,
    reason: string,
    scope: RuntimeScope
  ): Promise<ResourceTransactionRequest>;
}
```

Production implementation must support transactional/server-authoritative spending.

---

# 24. Randomization Service

```ts
export interface RandomizationServiceContract {
  generate(
    definition: RandomizationDefinition,
    scope: RuntimeScope
  ): RandomizationResult;
}
```

Once assigned, store the seed/result.

Do not silently reroll.

---

# 25. Scripted NPC Contract

```ts
export interface ScriptedNPCContract {
  npcId: string;

  getAvailableDialogue(
    runtime: RuntimeStateSnapshot
  ): DialogueNode[];

  selectDialogue(
    dialogueId: string
  ): RuntimeEvent;
}
```

NPC emits events.

Rules determine consequences.

---

# 26. Final Submission Component Contract

```ts
export interface FinalSubmissionComponentContract {
  load(
    definition: FinalSubmissionDefinition,
    runtime: RuntimeStateSnapshot
  ): void;

  validate(): SubmissionValidationResult;

  saveDraft(): Promise<void>;

  submit(): Promise<SubmissionResult>;
}
```

The final submission should reference already-collected evidence instead of forcing duplicate uploads.

---

# 27. Evidence Picker

The Evidence Picker receives available/collected evidence and returns evidence IDs selected for the final reasoning package.

It should not duplicate evidence content into the submission unnecessarily.

---

# 28. Teacher Controls

Teacher actions should create the same RuntimeCommands used by rules.

Examples:

- evidence unlock
- resource add
- phase unlock
- revision requirement
- solution reveal

Do not build a separate teacher mutation architecture.

---

# 29. Teacher Override Record

```ts
export interface TeacherOverrideRecord {
  id: string;

  teacherId: string;

  projectId: string;

  targetScope: RuntimeScope;

  command: RuntimeCommand;

  timestamp: string;

  reason?: string;
}
```

Production should audit high-impact teacher changes.

---

# 30. Capability Plugin Contract

```ts
export interface CapabilityPlugin {
  id: string;
  version: string;

  schemas?: SchemaRegistration[];

  renderers?: RendererRegistration[];

  eventTypes?: EventRegistration[];

  conditions?: ConditionRegistration[];

  actions?: ActionRegistration[];

  validators?: ValidatorRegistration[];
}
```

This contract can be implemented as multiple narrower interfaces if that better fits Angular/TypeScript design, but preserve the modular extension model.

---

# 31. Capability Registration Example

A future genetics plugin could register:

```text
evidence type:
dnaSequence

activity:
sequenceComparison

event:
sequence.mutationFound

condition:
sequence.matchPercent

renderer:
DNASequenceEvidenceRenderer
```

without editing the core Investigation Template.

---

# 32. Project Package Loader Contract

```ts
export interface ProjectPackageLoader {
  load(
    location: ProjectPackageLocation
  ): Promise<ProjectDefinitionGraph>;
}
```

Responsibilities:

- required file loading
- optional file loading
- schema version recognition
- reference resolution/normalization
- project graph creation
- validation handoff
- caching

It should not load student runtime state.

---

# 33. Runtime Persistence Adapter

```ts
export interface RuntimePersistenceAdapter {
  loadRuntime(
    scope: RuntimeScope
  ): Promise<RuntimeStateSnapshot>;

  saveRuntime(
    scope: RuntimeScope,
    mutations: StateMutation[],
    expectedVersion: number
  ): Promise<StateMutationResult>;
}
```

Implement a local/in-memory mock first.

---

# 34. Realtime Adapter

```ts
export interface RealtimeAdapter {
  subscribe(
    channel: RuntimeChannel,
    listener: RealtimeListener
  ): Unsubscribe;
}
```

Production subscription boundaries:

- student-private
- team-shared
- class announcements
- teacher detail

Do not make project-global raw realtime state the default.

---

# 35. Asset Storage Adapter

```ts
export interface AssetStorageAdapter {
  upload(
    input: AssetUploadInput
  ): Promise<StoredAsset>;

  getReference(
    assetId: string
  ): Promise<StoredAsset>;
}
```

Large files must stay outside runtime state.

---

# 36. Permission Service

```ts
export interface PermissionService {
  can(
    actor: RuntimeActor,
    action: string,
    target?: string
  ): boolean;
}
```

Components ask this service rather than implementing ad hoc role checks.

---

# 37. Error Contract

```ts
export interface RuntimeError {
  code: string;

  severity:
    | 'info'
    | 'warning'
    | 'error'
    | 'fatal';

  message: string;

  sourceId?: string;

  recoverable: boolean;
}
```

Initial error codes should include concepts such as:

- insufficient resource
- missing rule reference
- unavailable activity plugin
- state conflict
- permission denied
- capability not installed
- duplicate event/idempotency conflict

---

# 38. Component Lifecycle

Recommended conceptual lifecycle:

```text
REGISTER
↓
LOAD CONFIG
↓
VALIDATE CAPABILITY
↓
LOAD RUNTIME STATE
↓
RENDER
↓
USER INTERACTION
↓
EMIT EVENT
↓
RULE EVALUATION
↓
COMMANDS
↓
STATE UPDATE
↓
RENDER UPDATE
```

Components should not bypass this architecture without a documented reason.

---

# 39. Scale Contract

The component/service design must remain compatible with approximately:

- 500 students
- 2 active projects each
- several hundred simultaneous sessions

Therefore:

- immutable project definitions are cached
- board drag saves on drop, not movement
- text uses local draft + debounced save
- simulations save trials, not frames
- realtime is student/team scoped
- teacher dashboards use summaries
- high-stakes mutations are designed for server authority
- event processing supports idempotency

---

# 40. Platform Adapter Boundary

The single project runtime is hosted by the PBL LMS and may later be exposed to
external LMS environments through adapters. Core/template components depend on
contracts for:

- authentication and authorized identity context
- runtime persistence
- realtime
- asset storage
- analytics/event export
- external LMS launch, roster/context exchange, and result reporting

Adapter requests and responses must carry tenant identity. LTI, xAPI, and cmi5
support, if added, belong behind integration adapters rather than inside the
Investigation Template.

---

# 41. Trusted Capability Boundary

Project configuration may select a capability by registered ID and provide
validated declarative settings. It may not provide executable code.

Capability plugin contracts must expose version, supported configuration,
validation, permissions, authority requirements, and structured failure
behavior. Only platform-controlled deployments may install executable plugins.

---

# 42. Educational Status Contract

Activity and final-product APIs must expose completion, mastery, submission,
approval, and grade separately. Components may present a combined progress view,
but must not persist a combined status that destroys those distinctions.

---

# 43. Authoritative Command Gateway

Commands registered as `serverRequired` cross an explicit
`AuthoritativeCommandGateway` boundary in official mode. The request carries an
attempt-aware scope, registered command, idempotency key, and optional expected
versions. The result is accepted, rejected, or pending and returns structured
errors plus committed event/version references.

Authenticated infrastructure resolves the actor and verifies tenant,
enrollment, class, team, project, and attempt membership. Client-supplied scope
or role fields never grant authority. The ordinary `RuntimeEngine` remains the
processor for one scoped snapshot; capability-owned authoritative handlers may
coordinate multiple bounded records transactionally behind the gateway.

Local/practice implementations may provide a clearly identified mock gateway.
Official UI must not display a server-required command as confirmed before an
accepted authoritative result or matching confirmed projection is received.

---

# 44. Reusable Live Activity Capabilities

The approved live activity contract set is:

- `liveSession`
- `resourceAccounts`
- `multiPartyExchange`
- `challengeGates`
- `scenarioScheduler`
- `awardLedger`
- `activityEvidenceBridge`
- `summaryProjection`

These are independently versioned shared capabilities, not parts of a
Frontier-specific runtime. A contract may be registered with `status: future`
for discovery and schema work, but project validation must reject that status
until an actual runtime implementation and required handlers/adapters are
installed.

Official live attempts use an attempt-aware runtime scope. Practice runtimes may
omit `attemptId`; official live runtimes require a server-issued value. Scope,
persistence, realtime, idempotency, event, cache, and trace identities must not
collide across attempts.
