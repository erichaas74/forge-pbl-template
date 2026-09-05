# AGENTS.md

# PBL LMS Engineering Rules for Codex

This repository is building a reusable **Project-Based Learning LMS runtime** and a configurable **Investigation Project Template** in Angular 22.

These instructions are permanent engineering guardrails for Codex and human contributors.

The system is intended to support a real school environment with approximately:

- 500 students
- 2 active projects per student
- roughly 1,000 active student-project memberships
- several hundred simultaneous logged-in users
- team collaboration
- interactive simulations
- evidence uploads
- teacher monitoring
- future LLM-generated project packages

The system must therefore be designed as an extensible platform, not as a single-project prototype.

---

# 1. Technology

Use:

- **Angular 22**
- **TypeScript strict mode**
- standalone Angular components
- Angular dependency injection
- Angular signals for local and derived application/UI state where appropriate
- computed signals for derived state
- RxJS for asynchronous streams, realtime subscriptions, adapters, and integrations
- Angular CDK when appropriate, including accessible drag-and-drop
- semantic HTML
- accessible CSS and interaction patterns

Do not add another frontend framework.

Do not add a state-management framework unless there is a documented architectural need and the change is approved.

Do not introduce a backend vendor dependency directly into Investigation components.

---

# 2. Core Product Principle

## Projects are configuration, not custom application code.

A curriculum project should primarily consist of:

- versioned configuration
- content
- evidence definitions
- activities
- rules
- state definitions
- assessments
- final-submission requirements
- assets

Bad:

- `MysterySubstanceEvidenceService`
- `FossilCaseBoardComponent`
- `MysterySubstanceRuleEngine`
- `DragonGeneticsProjectModule`
- project-name checks inside reusable services
- custom Angular pages for every investigation

Good:

- `EvidenceService`
- `CaseBoardComponent`
- `RuleEngine`
- `InvestigationStateService`
- registered evidence renderers
- registered activity plugins
- configuration-driven project packages

If a project requires behavior that the current template cannot support, report:

```text
TEMPLATE_CAPABILITY_GAP

Requested:
...

Reason:
...

Suggested reusable capability:
...
```

Do not silently create a one-off workaround.

---

# 3. Extensibility Is a Hard Requirement

The system must be intentionally designed so future capabilities can be added without rewriting large portions of the existing codebase.

Prefer:

- interfaces
- registries
- adapters
- plugins
- composition
- dependency inversion
- runtime events
- versioned schemas
- capability contracts
- reusable domain services
- isolated renderers
- isolated condition evaluators
- isolated action handlers

Avoid:

- giant `switch` statements
- deeply nested project-specific `if` chains
- direct dependencies between unrelated components
- project-name checks
- hardcoded subject-specific behavior in generic engines
- giant monolithic services
- giant monolithic components
- duplicated engines for similar behaviors

Adding a new:

- evidence type
- activity type
- board section
- relationship type
- rule condition
- rule action
- final-submission section
- NPC type
- simulation plugin

should normally require:

1. implementing the capability,
2. registering it,
3. adding validation,
4. adding tests,
5. documenting it,

rather than rewriting the parent engine.

---

# 4. Keep These Concerns Separate

Never combine all of these into one giant project object or one giant service.

## 4.1 Curriculum configuration

Defines what the project is.

Examples:

- title
- mission
- evidence definitions
- activities
- phases
- rules
- board layout
- state-variable definitions
- final submission requirements

## 4.2 Runtime state

Defines what a student or team has actually done.

Examples:

- collected evidence
- current hypothesis
- hypothesis history
- current resource amount
- unlocked phase
- completed activities
- randomized case result
- Case Board card positions

## 4.3 Behavior

Defines how runtime events, rules, conditions, and actions change runtime state.

## 4.4 Presentation

Angular components render configuration + runtime state.

## 4.5 Persistence

Database, realtime, uploads, storage, and backend services must be accessed through adapters.

---

# 5. Dependency Direction

Use this dependency direction:

```text
Project configuration
        ↓
Template layer
        ↓
Shared LMS capabilities
        ↓
Core contracts and engines
        ↓
Infrastructure adapters
```

Core code must never import Investigation-specific code.

Allowed:

```text
Investigation Template -> Shared LMS -> Core
```

Not allowed:

```text
Core -> Investigation Template
```

Core systems must remain reusable for future templates such as:

- engineering challenge
- simulation mission
- debate
- design studio
- tournament
- case study
- research project
- decision simulation

---

# 6. Domain Logic vs Angular UI

Where practical, keep these as framework-independent TypeScript:

- schema interfaces
- domain models
- rule engine
- condition evaluation
- command definitions
- registry contracts
- validation logic
- randomization logic
- resource calculations
- project-package parsing

Angular components should focus on:

- rendering
- accessibility
- local interaction
- user input
- translating meaningful UI actions into runtime events

Do not place major Investigation logic directly inside Angular templates.

---

# 7. Composition Over Inheritance

Prefer capability composition.

Example:

```text
Investigation
├── Case Board
├── Evidence
├── Hypotheses
├── Activities
├── Rules
├── State
├── Resources
├── Randomization
├── NPCs
├── Teams
└── Final Submission
```

Avoid inheritance structures such as:

```text
ScienceInvestigation
    ↓
ChemistryInvestigation
    ↓
MysterySubstanceInvestigation
```

Project differences belong in configuration.

---

# 8. Registry Architecture

Use registries for extensible capabilities.

Expected registry concepts include:

- `CapabilityRegistry`
- `EvidenceTypeRegistry`
- `ActivityTypeRegistry`
- `BoardSectionRegistry`
- `EventRegistry`
- `ConditionRegistry`
- `ActionRegistry`
- `RelationshipRegistry`
- `FinalSectionRegistry`
- `NPCTypeRegistry`

Registrations should have stable IDs.

Unknown required capability IDs must produce structured errors rather than crashes or silent fallbacks.

---

# 9. Runtime Event Architecture

Interactive components communicate through registered runtime events.

Examples:

```text
activity.started
activity.completed

evidence.viewed
evidence.collected
evidence.classified
evidence.connected

hypothesis.created
hypothesis.revised
hypothesis.selected

resource.spendRequested

npc.questionAsked

phase.completed

finalSubmission.submitted
```

Components must not directly invoke unrelated components to change project state.

Bad:

```text
SimulationComponent
    -> CaseBoardComponent.unlockEvidence()
```

Good:

```text
SimulationComponent
    -> activity.completed
    -> RuleEngine
    -> evidence.unlock command
    -> RuntimeState update
    -> Case Board rerenders
```

---

# 10. Events vs Commands

An event describes something that happened or was requested.

Example:

```text
activity.completed
```

A command describes what the runtime should do.

Example:

```text
evidence.unlock
```

Rules convert events + runtime state into commands.

Do not merge event and command semantics casually.

---

# 11. Universal Runtime Event Envelope

Runtime events should use a shared structure conceptually equivalent to:

```ts
interface RuntimeEvent {
  id: string;
  eventType: string;
  timestamp: string;
  projectId: string;

  actor: {
    type: 'student' | 'team' | 'teacher' | 'system';
    id?: string;
  };

  sourceId?: string;
  payload?: Record<string, unknown>;
  clientEventId?: string;
}
```

Use registered event names.

Do not invent one-off event names inside projects.

---

# 12. Runtime Commands

Runtime commands should follow a shared structure conceptually equivalent to:

```ts
interface RuntimeCommand {
  commandType: string;
  targetId?: string;
  value?: unknown;
  params?: Record<string, unknown>;
}
```

Command handlers must be registered.

Angular components do not implement command semantics independently.

---

# 13. Rules and Branching

Use the same:

- events
- state
- rules
- conditions
- commands

for:

- gates
- branching
- consequences
- NPC dialogue availability
- evidence unlocking
- limited-resource use
- phase progression
- final-submission availability
- teacher overrides

Do not create a separate branching engine unless a later requirement proves the shared rule/state/event system is insufficient.

---

# 14. Rule Engine Requirements

The Rule Engine must be:

- deterministic
- UI-independent
- registry-driven
- testable
- reusable in a future server runtime
- capable of nested condition groups

Required logic:

- AND
- OR
- NOT
- X_OF

Do not rely on JSON file order for rule execution.

Use explicit priority + stable ID for deterministic ordering.

---

# 15. Project Configuration Is Read-Only at Runtime

Published project configuration must be treated as immutable.

Student actions must never modify:

- `project.json`
- `investigation.json`
- `case-board.json`
- `evidence.json`
- `activities.json`
- `rules.json`
- `state.json`
- `resources.json`
- other published project-definition files

Student/team changes belong in runtime state.

If curriculum changes meaningfully, create a new project version.

---

# 16. Project Versioning

Published projects should be addressed by:

```text
projectId + projectVersion
```

Example:

```text
mystery-substance-outbreak@1.2
```

Students enrolled in a live project should reference a specific version.

Do not unpredictably mutate live curriculum underneath active students.

---

# 17. Schema Versioning

Every generated project must identify:

- `schemaVersion`
- `template.id`
- `template.version`

Schema version and template version are separate.

## Minor versions

May add:

- optional fields
- optional registered capabilities
- backwards-compatible behavior

## Major versions

Required for breaking structural changes.

Breaking changes require:

- migration documentation
- migration code when appropriate
- tests against previous fixtures

---

# 18. Schema Change Policy

Before modifying a core schema, determine whether the requested behavior can instead use:

1. an existing field,
2. an extension namespace,
3. a registered capability/plugin,
4. a new optional backwards-compatible field.

Do not change core schemas because one project needs something unique.

When a schema change is necessary:

- preserve backwards compatibility when practical
- update schema version appropriately
- update documentation
- update validators
- update fixtures
- add tests
- add migration support for breaking changes

---

# 19. Capability Change Policy

When new functionality is required, first ask:

```text
Can this be represented by an existing capability?
```

If no, define a reusable capability.

A new capability should include, as applicable:

- stable capability ID
- configuration contract
- renderer/component
- emitted events
- rule conditions
- rule actions
- validation
- tests
- documentation

Do not hide a new capability inside a project-specific component.

---

# 20. Project-Specific Code Check

Before adding code containing a project/curriculum name, stop and determine whether the behavior belongs in configuration instead.

Names that should normally exist only in project content/configuration include:

- Mystery Substance
- Fossil Detectives
- Dragon Genetics
- Cell Crisis
- Lost Temple
- Medieval Siege

Project names in reusable runtime code are a likely architecture violation.

Test fixtures may use project names.

---

# 21. Project Package Architecture

Projects should load from modular packages.

Typical package:

```text
/project-id/
├── project.json
├── investigation.json
├── case-board.json
├── evidence.json
├── activities.json
├── lessons.json
├── rules.json
├── state.json
├── resources.json
├── randomization.json
├── npcs.json
├── teams.json
├── assessments.json
├── final-submission.json
├── content/
└── assets/
```

Optional capability files may be absent.

Do not require fake placeholder files.

---

# 22. Project Package Loader

The loader should:

1. load required files,
2. load optional files,
3. identify schema/template versions,
4. normalize references,
5. build ID indexes,
6. validate,
7. produce an in-memory Project Definition Graph,
8. cache immutable project definitions.

Components should query the resolved graph instead of repeatedly parsing JSON files.

---

# 23. Generated Projects

Curriculum LLMs generate:

- configuration
- content
- evidence
- rules
- activities
- state definitions
- resources
- NPC definitions
- assessments
- final-submission definitions

Curriculum LLMs do not generate project-specific Angular code.

Unsupported requirement:

```text
TEMPLATE_CAPABILITY_GAP
```

---

# 24. No Silent Fallbacks for Required Capabilities

If a required capability/plugin is unavailable:

Do not:

- silently omit it
- replace it with another activity
- mark it complete
- allow progression as though it worked

Return a structured error or capability gap.

Optional/decorative capabilities may degrade gracefully only if configuration explicitly allows it.

---

# 25. Validation Before Runtime

A generated project is not ready merely because JSON parses.

Validate:

1. package structure
2. schema
3. stable IDs
4. references
5. capabilities
6. conditions/actions
7. state/resource validity
8. randomization validity
9. reachability
10. final-submission feasibility

Projects with blocking errors must not be published to students.

---

# 26. Validation Must Be Extensible

Validators should use a common contract.

New plugins may register plugin-specific validators.

Do not place all subject-specific validation rules into the core validator.

---

# 27. Runtime State Separation

Keep runtime separated by scope.

Expected scopes:

- student-private
- team-shared
- class/project summary when explicitly required

Examples of student-private state:

- individual hypothesis
- mastery
- reflection
- private notes

Examples of team-shared state:

- shared Case Board
- team evidence
- team resources
- team hypothesis
- team final product

---

# 28. Runtime State Mutation

Persistent runtime state must change through:

- events
- rules
- commands
- runtime services
- adapters

Do not let components directly modify arbitrary backend data.

Low-risk purely visual state may remain local.

---

# 29. Runtime Versioning

Runtime snapshots should support a version or equivalent concurrency marker.

Example:

```ts
{
  version: 14,
  lastUpdated: '...'
}
```

Use this later for:

- optimistic concurrency
- team conflict handling
- retries
- debugging

---

# 30. Idempotency

Every state-changing request should support a unique client/event ID.

If the same request is retried, it must not create:

- duplicate evidence
- duplicate rewards
- duplicate unlocks
- double resource spending
- duplicate official attempts

V1 may use in-memory idempotency tracking.

Production must persist idempotency protection appropriately.

---

# 31. Limited Resources

Resources may represent:

- lab credits
- interviews
- time
- money
- attempts
- fuel
- supplies
- medicine
- clues
- investigation points

Production resource spending must be server-authoritative/transactional.

Example:

If a team has 1 Lab Credit and two teammates simultaneously request two tests, only one request may succeed.

---

# 32. Randomization

Randomized assignments must be reproducible.

Store:

- randomization definition ID
- scope
- seed
- assigned result
- project version
- assignment timestamp

Generate once.

Do not reroll on reload.

---

# 33. Hypothesis History

Never keep only the latest hypothesis.

Preserve:

```text
initial hypothesis
↓
revision
↓
revision
↓
final conclusion
```

Hypothesis revisions are academic evidence.

Do not overwrite earlier reasoning.

---

# 34. Evidence Metadata Security

Teacher-only metadata may include:

- correct solution relationships
- decoy status
- evidence strength
- hidden meaning
- teacher notes

Do not assume information is secure merely because Angular does not display it.

Production architecture should allow teacher-only metadata to be server-filtered or stored separately.

Do not unnecessarily deliver sensitive answer-key data to student clients.

---

# 35. Activity Plugins

Activities should resolve through a registry/plugin contract.

The Investigation Template should not directly import a specific simulation.

Good configuration:

```json
{
  "type": "simulation",
  "plugin": "mystery-substance-lab"
}
```

The Activity Host resolves the plugin.

---

# 36. Simulation Persistence

Simulation interaction remains local during a trial.

Do not persist:

- animation frames
- mouse movement
- continuous slider values

Persist a bounded `SimulationTrialResult` when a trial completes or reaches a meaningful checkpoint.

---

# 37. Angular Component Rules

Prefer:

- standalone components
- small focused components
- typed inputs/outputs
- signals for local/derived UI state
- services for domain behavior
- registered renderers/plugins
- lazy loading for large evidence/details where useful
- in-view disclosure: when an action opens, expands, or selects content, reveal that content inside the current view and move focus to its first meaningful container or control

Avoid:

- huge templates
- giant component classes
- project logic inside templates
- components that query the database independently per card/item
- components that contain backend vendor SDK calls

Interaction surfaces must not render newly opened controls far below the trigger or outside the
visible page without guidance. Prefer an adjacent panel, popover, dialog, drawer, or contained
workspace that keeps the trigger and result in the same view. When layout makes scrolling
unavoidable, wait for render, scroll the opened region with `block: 'nearest'`, respect reduced
motion, and then place logical focus without causing a second scroll. The student should never
need to hunt down the result of an action.

---

# 38. Component Performance

Assume several hundred students may use the system simultaneously.

For Angular UI:

- use stable identity/track functions for lists
- avoid unnecessary full-tree rerenders
- do not repeatedly parse project configuration
- cache Project Definition Graph by project version
- lazy-load large evidence assets when practical
- use one scoped runtime source feeding child view models
- avoid one realtime subscription per evidence card

---

# 39. Case Board Persistence

During drag:

- update locally

On completed drop:

- emit one meaningful runtime event/mutation

Do not write card position continuously during pointer movement.

Keyboard/non-drag movement must also be supported.

---

# 40. Text Autosave

Do not persist every keystroke.

Use:

- local draft state
- debounced autosave
- save on blur
- save on navigation
- explicit save where useful
- authoritative save on final submission

---

# 41. Realtime Scope

A student normally subscribes only to:

- their private runtime
- their team runtime
- relevant announcements

Do not subscribe students to raw project-wide runtime updates.

---

# 42. Teacher Dashboard Scale

Teacher dashboards must not open hundreds of detailed runtime subscriptions.

Production dashboards should use summaries such as:

- student progress summary
- team progress summary
- class/project summary
- grading queue
- mastery summary

Load detailed runtime only when the teacher opens a particular student/team.

---

# 43. File Uploads

Student images, videos, PDFs, and screenshots belong in object/file storage.

Runtime stores:

- asset ID
- storage reference
- metadata

Do not embed large binary data inside runtime documents.

---

# 44. Backend Adapter Boundary

Angular components and Investigation services must not directly call:

- Firebase
- Supabase
- another database SDK

Use:

- `RuntimePersistenceAdapter`
- `RealtimeAdapter`
- `AssetStorageAdapter`

Bad:

```text
CaseBoardComponent -> Firestore
```

Good:

```text
CaseBoardComponent
    -> RuntimeStateService
    -> RuntimePersistenceAdapter
```

This rule applies even during prototyping.

---

# 45. Client vs Server Authority

The client may be optimistic for low-risk interactions.

Examples:

- moving a card visually
- opening evidence
- editing a draft
- selecting a local UI tab

Production server authority is required for:

- resource spending
- randomized case assignment
- official simulation attempts
- mastery results
- final challenge scores
- final submission
- teacher overrides
- other high-stakes state changes

If client/server disagree, server state wins.

---

# 46. Offline/Retry Compatibility

Low-risk operations may eventually queue locally.

Examples:

- note
- board move
- hypothesis draft
- annotation

High-stakes operations require server confirmation.

Keep contracts compatible with retries and intermittent connections.

---

# 47. Permissions

Centralize permissions.

Do not scatter:

```ts
if (user.role === 'teacher')
```

through components.

Use permission concepts such as:

- `evidence.view`
- `evidence.release`
- `board.edit`
- `resource.spend`
- `activity.reset`
- `solution.reveal`
- `submission.grade`

---

# 48. Accessibility

All Investigation components must support:

- keyboard navigation
- visible focus
- semantic controls
- screen-reader labels
- meaningful text labels
- non-drag alternatives
- high contrast
- reduced motion
- captions/transcripts when applicable
- readable typography
- touch-friendly targets

Do not make hover the only way to discover essential controls.

---

# 49. Structured Errors

Use structured errors.

Examples:

```text
INSUFFICIENT_RESOURCE
RULE_REFERENCE_MISSING
ACTIVITY_PLUGIN_UNAVAILABLE
STATE_CONFLICT
PERMISSION_DENIED
CAPABILITY_NOT_INSTALLED
DUPLICATE_EVENT
INVALID_COMMAND
```

Recoverable errors must not crash the entire project view.

---

# 50. Logging and Debugging

Production server-side operations should be traceable using metadata such as:

- request ID
- event ID
- project ID
- project version
- student/team scope
- matched rule IDs
- command types
- error code

Avoid unnecessarily logging full student responses.

---

# 51. School Scale Requirement

Design for approximately:

- 500 enrolled students
- 2 active projects per student
- ~1,000 active student-project memberships
- several hundred concurrent sessions
- many teams
- bursts of activity submissions
- simulation trials
- evidence uploads
- teacher monitoring

Do not build architecture that assumes only one student or one classroom.

---

# 52. Project Definition Caching

Published project definitions should be:

- immutable
- versioned
- shared
- cacheable

Client cache key should conceptually use:

```text
projectId + projectVersion
```

Do not download every project JSON file again on every route change.

---

# 53. Avoid N+1 Backend Reads

Do not design each evidence card/activity component to independently query backend state.

The resolved Project Definition Graph plus scoped Runtime Snapshot should provide most view data.

---

# 54. Event Logging Discipline

Persist meaningful domain events.

Good:

- evidence collected
- evidence classified
- hypothesis revised
- activity completed
- official trial
- resource transaction
- phase completed
- final submission
- teacher override

Do not persist:

- hover
- mouse move
- animation frame
- every keystroke

---

# 55. Snapshot + Event History

Use:

```text
current snapshot
+
bounded/meaningful event history
```

Do not require replaying thousands of events just to load a project.

This is lightweight event history, not full event sourcing.

---

# 56. Specification Source of Truth

When implementing work, use this priority order:

1. `AGENTS.md`
2. numbered architecture/build specification files
3. current task prompt
4. existing implementation patterns that do not conflict with the above

Relevant specifications may include:

- `00_MASTER_BUILD_PLAN.md`
- `01_ARCHITECTURE_RULES.md`
- `02_INVESTIGATION_CAPABILITIES.md`
- `03_DATA_SCHEMAS.md`
- `04_COMPONENT_CONTRACTS.md`
- `05_PROJECT_PACKAGE_FORMAT.md`
- `06_CORE_RUNTIME_ENGINE.md`
- `07_INVESTIGATION_TEMPLATE_COMPONENTS.md`
- `08_RULE_STATE_EVENT_ENGINE.md`
- `09_VALIDATION_SYSTEM.md`
- `10_SCALE_AND_PERSISTENCE.md`
- later numbered specification files

Do not modify a specification simply because the current implementation does not match it.

If implementation and specification conflict, report the conflict before making a breaking architectural change.

---

# 57. Work Only on the Requested Phase

Before coding:

1. read `AGENTS.md`,
2. read the relevant numbered build specifications,
3. inspect the existing implementation,
4. identify reusable contracts/components,
5. implement the smallest architectural change that satisfies the requested phase.

Do not implement future phases merely because documentation describes them.

Example:

If asked to implement the Rule Engine, do not also build:

- the polished Case Board
- production Firebase
- teacher dashboard
- AI integration

unless the task requires them.

---

# 58. Definition of Done

A task is complete only when:

- implementation follows documented architecture
- TypeScript compiles under strict mode
- Angular build succeeds
- relevant tests pass
- new reusable behavior has tests
- unrelated tests were not deleted
- no project-specific workaround was introduced
- no unsupported capability was silently invented
- public contracts remain compatible unless a breaking change was explicitly approved

At the end of every substantial task report:

1. files added
2. files modified
3. tests added/changed
4. build/test results
5. architectural decisions
6. deviations from specification
7. `TEMPLATE_CAPABILITY_GAP` items
8. recommended next phase

---

# 59. Before Changing Existing Architecture

Before refactoring a core contract, answer:

1. What specific requirement cannot be met by the existing contract?
2. Can an adapter solve it?
3. Can an extension solve it?
4. Can a registered capability solve it?
5. Can an optional backwards-compatible field solve it?
6. Will current projects continue working?
7. What tests prove compatibility?

Do not make large refactors just because another design feels cleaner.

---

# 60. Reuse Audit

When a second project requires implementation changes, document:

- what existing code was reused unchanged
- what generic capability was extended
- what new plugin was added
- whether any core contract changed
- why the change was necessary

If a substantially different second project requires large modifications to core Investigation components, treat that as an architectural warning.

Review the abstraction before continuing.

---

# 61. Do Not Optimize by Breaking Extensibility

Performance improvements must preserve:

- registry-driven capabilities
- adapter boundaries
- versioned schemas
- event contracts
- runtime/configuration separation
- plugin architecture

Do not replace a reusable design with project-specific shortcuts merely for speed.

---

# 62. Documentation Synchronization

When intentionally changing a public contract or reusable capability:

- update the relevant specification documentation
- update schemas
- update validators
- update fixtures
- update tests

Do not let documented architecture and implementation drift silently.

---

# 63. Test Requirements

Minimum unit tests:

- registries
- event routing
- rule evaluation
- condition evaluation
- command execution
- state mutations
- resource calculations
- randomization
- validators
- idempotency

Minimum component tests:

- Case Board
- Evidence Card
- Evidence renderer resolution
- Hypothesis creation/revision/history
- NPC dialogue
- Final Investigation
- keyboard/non-drag Case Board movement

Required integration path:

```text
event
↓
rule
↓
condition evaluation
↓
commands
↓
runtime mutation
↓
UI update
```

A reusable capability is not considered proven generic until used by at least two substantially different Investigation projects.

---

# 64. Testing Discipline

Do not:

- delete tests because they fail after a change
- weaken assertions merely to get green output
- disable strict mode
- ignore TypeScript errors
- use `any` broadly to avoid modeling types
- suppress runtime validation without reason

Fix the implementation or document a deliberate contract change.

---

# 65. Unknown Capability Runtime Behavior

If a project requests an unsupported required capability:

Do not crash.

Do not silently continue.

Return a structured error such as:

```text
CAPABILITY_NOT_INSTALLED
```

and surface the issue appropriately in preview/teacher mode.

Students should not enter a broken path.

---

# 66. Teacher-Only Controls

Teacher actions should use the same RuntimeCommand architecture as automated rules.

Examples:

- release evidence
- add resource
- unlock activity
- open phase
- require revision
- reveal solution

Do not build a completely separate teacher mutation system.

High-impact teacher actions should eventually be audited.

---

# 67. External AI Integration

The Investigation Template must remain independent of a specific AI provider.

External AI may later integrate through states/events such as:

```text
reasoningCheck.requested
reasoningCheck.passed
reasoningCheck.needsRevision
defense.passed
```

Do not embed AI prompts, provider SDKs, or answer-key logic inside generic Investigation components unless an explicit integration phase requests it.

---

# 68. Scripted NPC vs AI NPC

V1 NPCs are scripted/configuration-driven.

They may:

- show predefined questions
- show scripted responses
- unlock evidence through events/rules
- depend on state/resources

AI NPC behavior is a future extension.

Do not block scripted NPC implementation on future AI integration.

---

# 69. Security Reminder

Client-side hiding is not authorization.

Production security must eventually enforce:

- role
- enrollment
- class membership
- team membership
- teacher/admin access
- student-safe vs teacher-only data
- authorized uploads
- authorized mutations

Components consume context/permissions.

They do not define the source of truth for authorization.

---

# 70. Final Engineering Rule

When uncertain between:

```text
a quick project-specific solution
```

and:

```text
a small reusable capability that preserves the architecture
```

prefer the reusable capability.

But do not overengineer speculative future behavior.

Build the smallest reusable abstraction that supports the documented requirement and keeps the system easy to extend.
