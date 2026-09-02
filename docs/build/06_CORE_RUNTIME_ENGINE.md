# Core Runtime Engine Build Specification

## Purpose

Define the core reusable runtime that powers Investigation and future project templates.

This phase is primarily domain/runtime code, not polished UI.

---

# 1. Build Objective

Create a reusable pipeline:

```text
Project Configuration
        ↓
Project Context
        ↓
Runtime Event
        ↓
Rule Engine
        ↓
Runtime Commands
        ↓
Runtime State Mutation
        ↓
Subscribers/UI update
```

The runtime must be usable by Investigation without containing Investigation-specific assumptions.

---

# 2. Required V1 Core Services

Implement:

- `ProjectContextService`
- `ProjectPackageLoaderService`
- `RuntimeStateService`
- `RuntimeEventBus`
- `RuleEngine`
- `CommandExecutor`
- `CapabilityRegistry`
- `EventRegistry`
- `ConditionRegistry`
- `ActionRegistry`
- `ComponentRegistry` or equivalent renderer registry
- `PermissionService`
- `ValidationService` facade
- mock/local `RuntimePersistenceAdapter`
- mock/local `RealtimeAdapter`
- mock/local `AssetStorageAdapter`

---

# 3. ProjectContextService

## Responsibility

Expose immutable current project/session context.

Conceptual API:

```ts
interface ProjectContext {
  tenantId: string;
  projectId: string;
  projectVersion: string;

  classId?: string;
  studentId?: string;
  teamId?: string;

  mode: 'student' | 'teacher' | 'preview';
}
```

Requirements:

- no database-vendor logic
- no project-specific behavior
- read-only from most consumers
- easy to mock in tests

---

# 4. ProjectPackageLoaderService

## Responsibility

Load and assemble a project package.

Input:

- local fixture path in development
- future remote package reference through an adapter

Output:

- normalized `ProjectDefinitionGraph`

Responsibilities:

1. load required files
2. load optional files
3. validate schema-version compatibility
4. index entities by stable ID
5. detect duplicate IDs
6. normalize cross references
7. invoke validation pipeline
8. cache immutable project definitions

The loader must not load runtime student/team state.

---

# 5. ProjectDefinitionGraph

Recommended concept:

```ts
interface ProjectDefinitionGraph {
  manifest: ProjectManifest;
  investigation: InvestigationConfiguration;

  caseBoard: CaseBoardConfiguration;

  evidenceById: ReadonlyMap<string, EvidenceDefinition>;
  activitiesById: ReadonlyMap<string, ActivityDefinition>;
  lessonsById: ReadonlyMap<string, LessonDefinition>;
  rulesById: ReadonlyMap<string, RuleDefinition>;
  stateById: ReadonlyMap<string, StateVariableDefinition>;
  resourcesById: ReadonlyMap<string, InvestigationResource>;
  randomizationsById: ReadonlyMap<string, RandomizationDefinition>;
  npcsById: ReadonlyMap<string, NPCDefinition>;

  teams?: InvestigationTeamSettings;
  finalSubmission: FinalSubmissionDefinition;

  capabilities: ReadonlySet<string>;
}
```

Use Angular-friendly immutable/read-only patterns.

---

# 6. RuntimeEventBus

## Responsibility

Allow components/services to emit registered runtime events.

Requirements:

- events use the common RuntimeEvent envelope
- unknown event types are rejected or warned according to mode
- event IDs/client event IDs support idempotency
- subscriptions are scoped
- should be easy to test

Angular implementation may use RxJS or signals/observable bridging.

Avoid making the EventBus a global dumping ground for arbitrary UI events.

Only meaningful project-runtime events belong here.

---

# 7. RuntimeStateService

## Responsibility

Maintain current runtime snapshot for the active scope.

V1 may use an in-memory/local adapter.

Must support:

- initial state creation from project definitions
- load snapshot
- apply approved mutations
- version increment
- subscribe/read state
- student/team/class scopes
- reset for preview/testing

Runtime must not mutate published project configuration.

---

# 8. Initial Runtime State Creation

When a runtime is first created:

- initialize declared state variables
- initialize evidence runtime statuses from evidence availability
- initialize activities
- initialize phases
- initialize resources
- initialize randomization assignments when required
- initialize NPC runtime
- initialize empty hypotheses/board state

Use project version in the runtime header.

---

# 9. Runtime Snapshot Header

Include:

```ts
interface RuntimeSnapshotHeader {
  version: number;
  tenantId: string;
  projectId: string;
  projectVersion: string;
  lastUpdated: string;
}
```

Use version for future optimistic concurrency.

---

# 10. RuleEngine

## Responsibility

Evaluate relevant rules against:

- incoming event
- current runtime snapshot
- project definition
- registered condition evaluators

Output:

- matched rule IDs
- commands
- structured errors

The RuleEngine must not directly mutate runtime state.

---

# 11. Rule Selection

On an event:

1. locate rules matching trigger event type
2. optionally match trigger target ID
3. sort deterministically by priority + stable ID
4. evaluate conditions
5. produce command list
6. enforce repeatable/non-repeatable rule behavior

Do not scan every project rule unnecessarily if an event index can be used.

---

# 12. ConditionRegistry

Registry maps:

`condition.type -> ConditionEvaluator`

Example types:

- `activity.status`
- `evidence.status`
- `state.value`
- `resource.amount`

If an unknown condition is encountered:

- validator should flag it before runtime
- runtime should still fail safely with structured error

---

# 13. ActionRegistry

Registry maps:

`action.type -> handler/command creator`

Examples:

- `evidence.unlock`
- `state.set`
- `resource.add`

Actions should create RuntimeCommands, not directly mutate Angular component state.

---

# 14. CommandExecutor

## Responsibility

Apply RuntimeCommands through controlled mutation handlers.

Requirements:

- deterministic ordering
- idempotency support
- permission/authority hooks
- state version update
- structured result
- future server-authoritative adapter compatibility

CommandExecutor may dispatch follow-up domain events only through an explicitly defined mechanism to avoid accidental loops.

---

# 15. Initial Core Runtime Commands

The executor architecture must support registered handlers.

Initial generic handlers should include:

- `state.set`
- `state.increment`
- `state.decrement`
- `state.toggle`
- `state.addToList`
- `state.removeFromList`

Investigation-specific handlers may be registered from the Investigation template module/package.

---

# 16. Idempotency

Maintain a bounded record or adapter hook for processed `clientEventId` values.

If the same state-changing event is submitted twice:

- return the previous/accepted result or no-op safely
- do not double-apply commands

The V1 mock implementation may use an in-memory set/map.

Design the interface for production persistence later.

---

# 17. PermissionService

Centralize permission checks.

Conceptual API:

```ts
can(actor, action, target?): boolean
```

V1 can use simple role/mode-based policy.

Do not place teacher/student `if` logic in every component.

---

# 18. PersistenceAdapter

## V1

Implement an in-memory/local mock adapter.

Must follow production-compatible interface:

```ts
loadRuntime(scope)
saveRuntime(scope, mutations, expectedVersion)
```

Do not use browser localStorage as the architectural contract.

A dev adapter may optionally use local storage behind the same interface, but the default design must remain replaceable.

---

# 19. RealtimeAdapter

V1 can be no-op or in-memory pub/sub.

Contract must support scope/channel subscription.

Future production adapter will support:

- student-private channel
- team-shared channel
- class announcements
- teacher detail channel

---

# 20. AssetStorageAdapter

V1 may return mock/local asset references.

Do not build production file storage in this phase.

Ensure Evidence/Upload components do not depend on a specific storage vendor.

---

# 21. Runtime Mutation Types

Prefer explicit mutations.

Example conceptual type:

```ts
interface StateMutation {
  path: string;
  operation:
    | 'set'
    | 'increment'
    | 'decrement'
    | 'add'
    | 'remove'
    | 'append';

  value?: unknown;
}
```

Do not expose unrestricted arbitrary object replacement if avoidable.

---

# 22. Runtime Mutation Result

```ts
interface StateMutationResult {
  success: boolean;
  previousVersion: number;
  newVersion?: number;
  snapshot?: RuntimeStateSnapshot;
  errors?: RuntimeError[];
}
```

---

# 23. Scope Separation

Support distinct runtime stores or namespaces for:

- student-private state
- team-shared state
- class-level shared values when explicitly required

Do not merge every project action into one global runtime object.

Every scope key begins with `tenantId`. Tenant identity also travels through
events, command/authority contexts, subscriptions, persistence, idempotency,
assets, and analytics. Identical project/class/user IDs in different tenants
must resolve to different data.

---

# 24. Local Optimistic UI

Low-risk interactions may update client UI immediately.

Examples:

- card visual movement
- expanding panels
- draft text
- temporary evidence selection

Persistent authoritative runtime should still use the state pipeline.

---

# 25. High-Stakes Hooks

Do not implement production backend yet, but mark operations requiring future authority:

- resource spend
- official attempt
- random assignment
- mastery result
- final submission
- final score
- teacher override
- graded assessment submission
- teacher release/grading/rubric score
- project enrollment
- team membership change
- constrained shared-team transaction

The local/mock executor may identify these operations, but production must not
commit or display them as confirmed without an authoritative adapter response.

The interface should allow CommandExecutor to delegate these to an authoritative adapter later.

---

# 26. Error Handling

Use structured errors.

Examples:

- `CAPABILITY_NOT_INSTALLED`
- `UNKNOWN_EVENT_TYPE`
- `UNKNOWN_CONDITION_TYPE`
- `UNKNOWN_ACTION_TYPE`
- `STATE_VARIABLE_NOT_FOUND`
- `STATE_CONFLICT`
- `PERMISSION_DENIED`
- `DUPLICATE_EVENT`
- `INVALID_COMMAND`

No raw uncaught error should break the entire student project view for a recoverable issue.

---

# 27. Logging

Provide a development tracing interface.

Trace meaningful information:

- event ID/type
- matched rule IDs
- command types
- state version
- validation/runtime errors

Do not dump entire student responses unnecessarily.

---

# 28. Testing Requirements

At minimum:

## Registries
- registration
- duplicate registration
- lookup
- unknown lookup behavior

## EventBus
- registered event
- unknown event
- subscriber receives event
- scoped subscription

## RuntimeState
- initialization
- mutation
- version increment
- scope separation

## RuleEngine
- trigger match
- condition match/fail
- deterministic priority
- repeatable false
- nested logic

## CommandExecutor
- registered command
- unknown command
- idempotency
- state mutation

## End-to-end runtime test
- emit event
- match rule
- create command
- mutate state
- subscriber sees updated snapshot

---

# 29. Acceptance Criteria for This Phase

Do not move on to Investigation UI until:

1. fixture project loads,
2. runtime state initializes,
3. event can be emitted,
4. rule can match,
5. condition can evaluate,
6. command can execute,
7. snapshot version increments,
8. state subscriber receives the update,
9. invalid references/capabilities return structured issues,
10. tests/build pass.

---

# 30. Explicit Non-Goals

Do not implement in this phase:

- polished Case Board
- production Firebase/Supabase
- teacher dashboard
- full authentication
- actual AI integration
- project-specific simulation
- mastery/reteach
- analytics dashboard
