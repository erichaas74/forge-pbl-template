# PBL LMS Architecture Rules

## Purpose

Define the engineering architecture for the reusable PBL runtime and Investigation Template.

This document expands the permanent repository rules in `AGENTS.md`.

---

# 1. Architectural Goal

Build a **configuration-driven project runtime** rather than a collection of individually coded curriculum applications.

The runtime is a subsystem of the primary product: a secure, tenant-aware PBL
LMS. There is one runtime, not separate LMS and portable-player engines.
Portability comes from adapter boundaries. See
`12_PRODUCT_ARCHITECTURE_DECISIONS.md` for the governing product decisions.

A project definition describes:

- content
- capabilities
- phases
- activities
- evidence
- rules
- state definitions
- assessment/final requirements

The Angular application renders and executes those definitions using reusable engines.

---

# 2. Required Layers

Recommended Angular source structure:

```text
src/app/
├── core/
│   ├── context/
│   ├── events/
│   ├── state/
│   ├── rules/
│   ├── commands/
│   ├── permissions/
│   ├── validation/
│   └── registries/
│
├── shared/
│   ├── activities/
│   ├── content/
│   ├── uploads/
│   ├── teams/
│   ├── assessment/
│   └── submissions/
│
├── templates/
│   └── investigation/
│       ├── shell/
│       ├── case-board/
│       ├── evidence/
│       ├── hypothesis/
│       ├── phases/
│       ├── resources/
│       ├── randomization/
│       ├── npc/
│       └── final-investigation/
│
├── plugins/
│   ├── evidence/
│   ├── activities/
│   ├── simulations/
│   └── visualizations/
│
└── infrastructure/
    ├── persistence/
    ├── realtime/
    ├── storage/
    └── analytics/
```

---

# 3. Dependency Direction

Allowed direction:

```text
Project configuration
        ↓
Template layer
        ↓
Shared LMS capabilities
        ↓
Core contracts/engines
        ↓
Infrastructure adapters
```

Core code must not import Investigation-specific code.

Infrastructure implements contracts defined above it; the Investigation Template must not depend on a specific database vendor.

---

# 4. Domain Code vs Angular UI

Where practical, the following should be framework-agnostic TypeScript:

- schema/domain interfaces
- rule engine
- condition evaluation
- command definitions
- registry contracts
- validation logic
- randomization logic
- resource calculations
- project package parsing

Angular components/services may adapt these contracts for UI/runtime.

This allows deterministic logic to be testable and potentially shared with a server runtime later.

---

# 5. Composition Over Inheritance

Prefer composition of capabilities.

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
├── NPCs
└── Final Submission
```

Avoid giant inheritance trees such as:

`ScienceInvestigation -> ChemistryInvestigation -> MysterySubstanceInvestigation`

Project differences belong in configuration.

---

# 6. Registry Pattern

`TemplateRegistry` resolves `project.json` template ID and semantic version to
one registered template runtime composition. Multiple implementation versions
of a template may coexist, and compatibility is explicit by template major
version. Unknown templates or unsupported versions return structured errors.

Template registration belongs in a composition root. Core must not import a
specific template, and individual project packages must not register code.

Use registries for extensible capability classes.

Required registry concepts:

- CapabilityRegistry
- EvidenceTypeRegistry
- ActivityTypeRegistry
- BoardSectionRegistry
- EventRegistry
- ConditionRegistry
- ActionRegistry
- RelationshipRegistry
- FinalSectionRegistry
- NPCTypeRegistry or equivalent

A registry entry should normally include:

- ID
- version
- status
- implementation/factory/renderer reference
- supported configuration
- validation hooks if needed

Unknown registration IDs must create structured errors rather than crashes.

---

# 7. Runtime Event Architecture

Components emit events describing what happened.

Example:

```text
activity.completed
evidence.collected
evidence.classified
hypothesis.revised
resource.spendRequested
npc.questionAsked
finalSubmission.submitted
```

An event does not directly specify every consequence.

The rule engine evaluates the event against current runtime state and configuration.

---

# 8. Event Envelope

All runtime events should use one common envelope.

Required concepts:

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

Additional fields may be added compatibly later.

---

# 9. Commands

A RuntimeCommand describes a requested state-changing action.

Example command types:

- `evidence.unlock`
- `evidence.create`
- `state.set`
- `resource.add`
- `resource.spend`
- `phase.unlock`
- `finalSubmission.open`
- `solution.reveal`

Components should not manually reproduce command semantics.

Command handlers are registered.

---

# 10. State Mutation

State changes should occur through shared runtime services/command handlers.

Avoid direct arbitrary mutation from components.

Low-risk local UI state is allowed inside components.

Persistent curriculum/runtime state must use the defined runtime pathway.

---

# 11. Configuration vs Runtime

Project configuration is immutable for a published/versioned project.

Runtime state changes per student/team.

Example:

Configuration:

```json
{
  "id": "state-sample-b-condition",
  "initialValue": "untested"
}
```

Runtime:

```json
{
  "stateValues": {
    "sample.b.condition": "heated"
  }
}
```

Do not rewrite `state.json` because a student performed a test.

---

# 12. Project Versions

Published project definitions should be addressed by project ID + project version.

Example:

`mystery-substance-outbreak@1.2`

Students reference a version.

A meaningful curriculum update should create another version rather than unpredictably changing the project underneath active students.

---

# 13. Project Package Loading

Project files are modular.

The loader should:

1. load required files,
2. load optional files when present,
3. normalize references,
4. validate basic structure,
5. produce an in-memory Project Definition Graph,
6. cache immutable project definitions,
7. avoid rereading individual files during every component interaction.

---

# 14. Optional Capability Files

A project may omit files it does not use.

Examples:

- no NPC file
- no randomization file
- no limited resources file

Missing optional capability files must not require placeholder objects.

---

# 15. Activity Plugins

Activities should implement a general contract.

The Investigation Template should not import individual simulation implementations.

Example configuration:

```json
{
  "id": "act-heat-sample",
  "type": "simulation",
  "plugin": "mystery-substance-lab"
}
```

The Activity/Plugin registry resolves the implementation.

Capability plugins are platform-owned, trusted, and versioned. Project packages
may reference registered plugin IDs but must never supply executable JavaScript
or TypeScript. Plugin installation is a platform administration/deployment
operation, not a project-package capability.

---

# 16. Simulation Data

Simulation internal interaction remains local during a trial.

Do not persist:

- animation frames
- pointer movement
- continuous slider updates

Persist a bounded TrialResult when a trial ends or meaningful checkpoint occurs.

---

# 17. Branching

Branching is represented through:

`events + state + rules`

Do not create a separate graph/branch engine in V1.

Example:

```text
student selects action
↓
event
↓
state changes
↓
rule becomes true
↓
different evidence/phase/NPC content unlocks
```

---

# 18. Rule Engine

The Rule Engine must be:

- deterministic
- UI-independent
- registry-driven
- testable
- capable of nested condition groups

Required logical forms:

- AND
- OR
- NOT
- X_OF

Rules produce RuntimeCommands.

---

# 19. Client vs Server Authority

Design the contracts so the same deterministic rule library can eventually run both client-side and server-side.

Client may predict low-risk outcomes for responsiveness.

Server will be authoritative for high-stakes changes in production.

If client/server disagree, server state wins.

High-stakes operations must not be reported as confirmed from client prediction.
Resource transactions, generated-once assignments, official attempts, mastery,
grades, final submissions, teacher actions, enrollment, team membership, and
official progress require authoritative handling.

---

# 20. Persistence Adapters

Define contracts such as:

- RuntimePersistenceAdapter
- RealtimeAdapter
- AssetStorageAdapter

The Investigation Template must not directly import Firebase/Supabase APIs.

Production implementations can be added later.

---

# 21. Realtime Boundaries

Scopes should include:

- student-private
- team-shared
- class/project announcements
- teacher-detail view

Avoid project-global raw realtime state.

Every channel is tenant-bound. Students must not subscribe to raw runtime state
for an entire class; use authorized student/team scopes and summary projections.

---

# 22. Teacher Dashboard Scale

Do not compute teacher dashboards by loading every student's full Investigation runtime.

Production should maintain summary projections such as:

- student progress summary
- team progress summary
- class project summary
- mastery summary
- grading queue

Detailed runtime is loaded on demand.

---

# 23. File Uploads

Files belong in object/file storage.

Runtime records store:

- asset ID
- storage reference
- metadata

Do not embed large binary payloads inside runtime state documents.

---

# 24. Autosave

Use local draft state and debounced persistence.

Recommended meaningful save events:

- several seconds after stopped typing
- blur
- navigation
- explicit save
- submission

Do not write every keystroke.

---

# 25. Concurrency

Team runtime may be edited by multiple students.

Use snapshot versions or equivalent optimistic concurrency support.

For high-stakes operations use transactional/authoritative operations.

Example:

A team with one remaining Lab Credit must not be able to purchase two simultaneous tests.

---

# 26. Idempotency

Runtime mutations must support idempotency.

State-changing requests should have a client/event ID.

Repeated delivery of the same mutation must not double-apply.

---

# 27. Randomization

Randomized project elements must be reproducible.

Store:

- seed
- result
- scope
- project version

Generate once per configured assignment scope.

Do not reroll on page reload.

---

# 28. Permissions

Centralize permissions.

Authorization includes tenant membership, enrollment, class/team membership,
and role. Client-side hiding is not authorization, and student clients must not
receive teacher-only answers, grading keys, decoy metadata, or hidden solution
relationships.

Do not spread:

```ts
if (user.role === 'teacher')
```

across components.

Use permission concepts such as:

- `evidence.view`
- `evidence.release`
- `board.edit`
- `resource.spend`
- `activity.reset`
- `solution.reveal`
- `submission.grade`

---

# 29. Structured Errors

Use structured runtime/validation errors.

Suggested shape:

```ts
interface RuntimeError {
  code: string;
  severity: 'info' | 'warning' | 'error' | 'fatal';
  message: string;
  sourceId?: string;
  recoverable: boolean;
}
```

Do not expose raw stack traces to students.

---

# 30. Validation

Generated projects must pass:

1. schema validation
2. reference validation
3. capability validation
4. logic validation

Validators report issues; they do not silently invent missing curriculum decisions.

---

# 31. Extensions

Major schema entities may support:

```ts
extensions?: Record<string, unknown>
```

Extension namespaces should be explicit.

Example:

```json
{
  "extensions": {
    "forensics": {
      "chainOfCustody": true
    }
  }
}
```

Extensions may add capability-specific data but must not override core semantics.

---

# 32. Compatibility

Minor schema/template versions may add optional fields/capabilities.

Breaking changes require:

- major version
- documented migration
- tests against older project fixtures

---

# 33. Accessibility

Case Board drag-and-drop must have a keyboard/non-drag equivalent.

Evidence detail content must be semantic and screen-reader usable.

Do not make hover-only controls essential.

Target WCAG 2.2 AA where practical for learners approximately ages 9–14. Also
require visible focus, semantic controls, screen-reader labels, captions or
transcripts, alt text, contrast, touch-friendly targets, reduced-motion support,
readable typography, and chunked instructions.

---

# 34. Logging and Debugging

Production server-side operations should be traceable with metadata such as:

- request ID
- event ID
- project ID/version
- student/team scope
- matched rule IDs
- command types
- error code

Avoid placing unnecessary student response contents in operational logs.

---

# 35. Architectural Reuse Audit

When a second project requires code changes, ask:

1. Is the new behavior truly generic?
2. Can it be a registered plugin/capability?
3. Can existing contracts represent it?
4. Is the core being modified because the original abstraction is too narrow?
5. Are we accidentally creating project-specific code?

Prefer an intentional reusable capability over a project-specific shortcut.
