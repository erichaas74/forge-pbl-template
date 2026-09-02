# Investigation Template Master Build Plan

## Purpose

Build the reusable runtime foundation for a Project-Based Learning LMS and the first configurable **Investigation Template** in Angular 22.

The primary product is a secure, tenant-aware PBL LMS. It contains one portable,
configuration-driven runtime surrounded by interchangeable identity,
persistence, realtime, storage, analytics, and future external-LMS adapters.
Do not build a separate portable player. The accepted product decisions in
`12_PRODUCT_ARCHITECTURE_DECISIONS.md` govern this plan.

The target is not a single chemistry project. The target is a reusable engine capable of powering projects such as:

- Mystery Substance Outbreak Lab
- Fossil Detectives
- medical diagnosis investigations
- historical evidence investigations
- archaeological mysteries
- source credibility investigations
- cause investigations
- multiple-explanation investigations
- evidence-based recommendation projects

Projects must be created primarily as configuration/content packages, not custom Angular applications.

---

# 1. Product Layers

The application has three major layers.

## 1.1 Reusable PBL runtime

Provides generic behavior shared across project templates:

- project loading
- context
- runtime state
- events
- rules
- commands
- permissions
- capability registries
- validation
- persistence adapters
- realtime adapters
- storage adapters

## 1.2 Investigation Template

Adds Investigation-specific capabilities:

- Case Board
- evidence
- student-created evidence
- hypotheses
- hypothesis revision history
- investigation phases
- investigation state
- branching
- rules/gates
- limited resources
- randomization
- scripted NPCs
- teams/private vs shared layers
- final investigation
- solution/reveal modes

## 1.3 Individual curriculum projects

Contain configuration and content only whenever possible.

Example project package:

```text
mystery-substance-outbreak/
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

---

# 2. V1 Build Sequence

Do not implement later phases prematurely.

## Phase 1 — Angular 22 application foundation

Create:

- Angular 22 application
- strict TypeScript
- repository folders
- test setup
- placeholder routes/shell only if required
- domain folder structure

No Investigation UI yet.

Acceptance:

- application builds
- tests run
- folder/dependency boundaries are established

---

## Phase 2 — Core domain contracts and registries

Implement:

- domain interfaces from `03_DATA_SCHEMAS.md`
- capability registry
- event registry
- condition registry
- action registry
- component/renderer registry contracts
- validation issue contracts

Acceptance:

- domain code has no Angular UI dependencies where avoidable
- registries support registration and lookup
- duplicate registrations are handled predictably
- tests cover registry behavior

---

## Phase 3 — Project package loader

Implement:

- versioned modular project package loading
- optional file handling
- reference normalization
- in-memory Project Definition Graph
- fixture project packages

Acceptance:

- a project package can be loaded
- missing optional files do not fail the project
- invalid required files produce structured errors
- no student runtime state is mixed into project configuration

---

## Phase 4 — Runtime state and event system

Implement:

- project context
- runtime state snapshot
- runtime state service/store
- runtime event bus
- event envelope
- local/mock persistence adapter
- student/team/runtime scopes

Acceptance:

- component/service can emit event
- runtime state can be read
- runtime state can be mutated only through approved pathways
- state snapshots carry a version
- tests verify scope separation

---

## Phase 5 — Rule and command engine

Implement:

- deterministic RuleEngine
- condition groups
- AND / OR / NOT / X_OF
- condition registry/evaluators
- runtime commands
- command executor
- action registry/handlers
- idempotency hooks

Initial conditions/actions are defined in the Investigation capability specs.

Acceptance:

`event -> rule evaluation -> commands -> runtime mutation`

works without Investigation UI.

---

## Phase 6 — Case Board

Implement:

- CaseBoardComponent
- BoardSectionHost
- registered board sections
- drag/drop
- keyboard move alternative
- card reordering
- notes/questions
- evidence classification
- configurable section titles/order

Acceptance:

- board renders entirely from configuration
- no project-name logic
- board events use the shared event contract
- runtime board state is separate from board configuration

---

## Phase 7 — Evidence system

Implement:

- EvidenceService
- EvidenceCard
- EvidenceDetail
- EvidenceRenderer registry
- initial evidence renderers
- StudentEvidenceCreator
- evidence runtime statuses
- evidence relationships stored in runtime

Acceptance:

- new evidence renderer can be registered without editing EvidenceService
- teacher-only evidence metadata is never shown by default
- student-created evidence uses the same evidence model where appropriate

---

## Phase 8 — Hypothesis system

Implement:

- HypothesisService
- HypothesisCard
- HypothesisPanel
- HypothesisHistory
- confidence handling
- evidence links
- multiple hypotheses
- ranking/elimination where configured

Acceptance:

- revisions are append-only history, not overwrite-only
- labels are configurable (hypothesis, diagnosis, suspect, etc.)

---

## Phase 9 — Investigation state, resources, and randomization

Implement:

- InvestigationStateService
- state actions
- InvestigationResourceService
- ResourceMeter
- RandomizationService
- seeded/reproducible assignment model

Acceptance:

- random result is generated once per configured scope and stored
- resource operations are abstracted for later server-authoritative transactions
- state IDs support namespacing

---

## Phase 10 — Scripted NPC and branching behavior

Implement:

- basic NPCService
- NpcDialogueComponent
- dialogue availability rules
- events for questions/dialogue
- evidence/state effects through rules

Do not create a separate branching engine.

Acceptance:

- branching is achieved using events + state + rules
- NPC does not directly mutate unrelated systems

---

## Phase 11 — Final Investigation

Implement:

- FinalInvestigationComponent
- configurable final sections
- EvidencePicker
- claim/diagnosis/recommendation labels
- counterevidence
- confidence
- uncertainty
- final reveal modes

Acceptance:

- exact and multiple-defensible solution modes both work
- collected evidence can be referenced without re-uploading

---

## Phase 12 — Validation

Implement four validators:

1. schema validation
2. reference validation
3. capability validation
4. investigation logic validation

Logic validation should detect at minimum:

- missing references
- unsupported capabilities
- orphaned content
- unreachable required evidence
- circular gate dependencies
- impossible final requirements
- invalid resource requirements

Acceptance:

- invalid fixture projects return structured ValidationIssue results
- validator never silently repairs project data

---

## Phase 13 — Mystery Substance pilot

Build the project as configuration/content only.

Allowed:

- reusable plugin if genuinely needed
- new registered capability only after explicit gap identification

Not allowed:

- project-specific rule engine
- project-specific evidence service
- project-specific Case Board
- project-specific runtime

Acceptance:

- project runs through the Investigation engine
- capability gaps are reported explicitly

---

## Phase 14 — Fossil Detectives reuse test

Create a substantially different 4th-grade Investigation project using the same engine.

Requirements:

- more teacher-controlled evidence flow
- fossil/rock/map evidence
- past-environment hypotheses
- landscape reconstruction/final claim
- same generic Case Board/evidence/hypothesis/rule systems

Acceptance:

- no Fossil-specific replacement services/components
- document any new reusable capability required
- perform a reuse audit

---

# 3. V1 Scope

V1 must prove the architecture, not complete the entire LMS.

## Required in V1

### Core
- project loader
- context
- registries
- runtime state
- events
- rules
- commands
- local/mock persistence
- validation

### Investigation
- Case Board
- evidence
- student evidence
- hypotheses
- history
- state
- phases
- resources
- randomization
- basic NPC
- final investigation
- exact/multiple-defensible solution support

### Shared
- mission content
- basic activity host
- simple content renderer
- upload contract/mock
- team/private runtime scopes

### Authoring artifacts
- Designer Project Brief
- LLM project-generation contract
- schema documentation
- capability documentation

---

# 4. V1.5 / Later

Do not block V1 on:

- polished teacher dashboard
- production backend
- live team synchronization
- visible corkboard connector lines
- mastery/reteach implementation
- advanced graphs
- advanced NPC behaviors
- external AI integration
- AI NPCs
- 3D plugins
- analytics dashboards
- parent features
- notifications

Design extension points now, but do not implement prematurely.

---

# 5. School Scale

All school-scale identity and data access is tenant-bound. `tenantId` must be
part of runtime scopes, authoritative requests, subscriptions, persistence
namespaces, caches, idempotency records, and operational projections. A
single-school deployment must not erase this boundary.

Production target:

- approximately 500 students
- two active projects per student
- roughly 1,000 active student-project memberships
- several hundred concurrent sessions

Architecture must therefore support:

- immutable/cacheable project definitions
- scoped realtime
- team/private state separation
- debounced/batched writes
- trial-level simulation persistence
- object storage for uploads
- aggregate teacher summaries
- idempotent high-stakes operations
- server-authoritative transactions later

See architecture specifications for details.

---

# 6. Reuse Test

A capability is not considered proven generic because one project uses it.

The Investigation Template passes its first architectural test only if:

```text
Mystery Substance
        ↓
Investigation Engine
        ↓
works

AND

Fossil Detectives
        ↓
same Investigation Engine
        ↓
works
```

without creating project-specific replacements for generic systems.

The engine is not considered generically proven until a third stress test,
**4th Grade First Encounters Case File**, also uses the same runtime. That
project is the required proof that Investigation is not science-specific.

---

# 7. Codex Work Rule

For each implementation task:

1. implement only the requested phase,
2. preserve existing public contracts,
3. run tests/build,
4. summarize changes,
5. report capability gaps,
6. do not solve future phases opportunistically.
