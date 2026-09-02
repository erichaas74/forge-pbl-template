# Testing Requirements

## Purpose

Define the minimum testing strategy for the reusable PBL runtime and Investigation Template.

Testing is not an afterthought. The system will eventually support approximately:

- 500 students
- 2 active projects per student
- roughly 1,000 active student-project memberships
- team collaboration
- shared runtime state
- simulations
- evidence uploads
- LLM-generated project packages

The testing strategy must therefore cover:

- domain logic
- runtime behavior
- Angular components
- project-package validation
- reuse across projects
- concurrency-sensitive operations
- scale-sensitive patterns

---

# 1. Testing Principles

## 1.1 Test reusable behavior at the lowest useful layer

Examples:

- Rule logic should be tested without Angular UI.
- Evidence rendering resolution should be tested independently of a full project page.
- Case Board drag/drop behavior should be component tested.
- Project-package reachability should be validator tested.

Do not rely only on end-to-end browser tests.

---

## 1.2 Do not delete tests to make a refactor pass

When behavior intentionally changes:

1. update the documented contract,
2. update the implementation,
3. update the test to represent the new contract.

Do not weaken assertions simply to get green output.

---

## 1.3 Every reusable capability requires tests

When a new capability is registered, test:

- registration
- validation
- supported configuration
- runtime behavior
- failure behavior
- compatibility with existing project fixtures where relevant

---

# 2. Test Categories

Required categories:

1. domain/unit tests
2. runtime-engine tests
3. validator tests
4. Angular component tests
5. integration tests
6. project-package fixture tests
7. reuse tests
8. future backend/concurrency tests
9. future scale/performance tests

---

# 3. Domain / Unit Tests

## Registries

Test:

- register capability
- resolve capability
- duplicate ID handling
- version handling
- unknown ID
- optional capability missing
- required capability missing

Registries include:

- CapabilityRegistry
- EvidenceTypeRegistry
- ActivityTypeRegistry
- BoardSectionRegistry
- EventRegistry
- ConditionRegistry
- ActionRegistry
- RelationshipRegistry
- FinalSectionRegistry
- NPCTypeRegistry if used

---

# 4. Rule Engine Tests

Test:

- event type trigger
- event target trigger
- no trigger match
- rule enabled/disabled
- priority ordering
- deterministic tie-breaking
- repeatable rule
- non-repeatable rule
- rule firing history

Required logic tests:

- AND
- OR
- NOT
- X_OF
- nested groups

Example:

```text
WHEN activity.completed(act-test)
AND 3 of 5 required evidence items are collected
AND hypothesis exists
THEN open next phase
```

Test true and false cases.

---

# 5. Condition Evaluator Tests

Each condition evaluator must test:

- true result
- false result
- missing target
- invalid operator
- invalid value type
- unknown runtime state
- boundary values

Initial condition types include:

- activity.status
- evidence.status
- evidence.count
- evidence.classification
- evidence.relationship
- hypothesis.exists
- hypothesis.selected
- hypothesis.revised
- hypothesis.count
- hypothesis.confidence
- state.value
- resource.amount
- phase.status
- teacher.release

Future hooks should have placeholder tests when implemented.

---

# 6. Command / Action Tests

Each command handler must test:

- valid execution
- missing target
- invalid target type
- permission failure
- state constraints
- idempotency
- version changes

Initial action/command categories:

- evidence unlock/lock/hide/reveal/create
- activity unlock/lock
- lesson unlock
- phase unlock/complete
- state operations
- resource add/spend
- message show
- hypothesis requirement
- revision requirement
- final-submission open/close
- solution reveal
- teacher notify
- NPC dialogue unlock

---

# 7. State Tests

Test:

- initialize from definitions
- boolean
- number
- choice
- list
- status
- counter
- min/max
- allowed values
- immutable state
- namespaced IDs
- invalid mutation
- version increment
- student/team scope isolation

---

# 8. Resource Tests

Test:

- correct initial amount
- add
- spend
- set
- min boundary
- max boundary
- insufficient resource
- individual scope
- team scope
- repeated idempotent request

Future backend test:

Two teammates attempt to spend the final resource simultaneously.

Only one transaction succeeds.

---

# 9. Randomization Tests

Test:

- deterministic seed
- same seed -> same result
- different configured scope
- stored assignment reused
- no reroll on reload
- choice
- weighted choice
- numeric range
- dataset selection
- invalid configuration
- output-state compatibility

---

# 10. Evidence Tests

## EvidenceService

Test:

- definition lookup
- available evidence
- locked evidence
- hidden evidence
- teacher metadata filtering
- student-safe view model
- student-created evidence
- unknown renderer

## Evidence relationships

Test:

- create
- remove
- supported relationship
- unsupported relationship
- teacher-defined relationship
- student-created relationship

---

# 11. Hypothesis Tests

Test:

- student-created hypothesis
- predefined hypothesis
- mixed mode
- multiple hypothesis
- ranking
- elimination
- selection
- evidence attachment
- confidence
- revision
- history preservation

Critical:

A revision must append history.

The previous hypothesis statement must remain recoverable.

---

# 12. NPC Tests

Test:

- NPC loads
- initial dialogue available
- locked dialogue unavailable
- state-dependent dialogue
- question emits runtime event
- evidence output is handled through runtime/rules
- NPC does not directly mutate unrelated systems

---

# 13. Project Package Loader Tests

Use fixture packages.

Test:

- valid required files
- optional file missing
- unsupported schema version
- malformed JSON
- duplicate ID
- cached project/version
- graph indexes
- no runtime state included in configuration graph

---

# 14. Validator Tests

Create intentionally invalid fixture packages.

Required cases:

## Schema
- missing required field
- wrong type
- invalid enum

## References
- missing evidence
- missing rule
- missing phase
- missing state variable
- missing resource

## Capabilities
- unknown evidence renderer
- unknown activity plugin
- unknown rule condition
- unknown action
- unknown final section

## Logic
- circular gate dependency
- unreachable required evidence
- unreachable final submission
- required activity impossible
- impossible resource requirement
- rule with impossible trigger
- orphaned required content
- final requires more evidence than can be collected
- revision required but revisions disabled

Each fixture should assert expected issue codes.

---

# 15. Case Board Component Tests

Test:

- configured sections render
- section labels
- section order
- enabled/disabled section
- drag card
- drop emits one meaningful event
- no persistence during drag movement
- keyboard/non-drag move
- invalid drop rejected
- card reorder
- note creation
- question creation
- evidence classification
- confidence change
- accessibility labels
- teacher-only metadata absent

---

# 16. Evidence Component Tests

Test:

- renderer selected by type
- preview
- detail
- unknown renderer safe error
- runtime status
- collect action
- classify action
- relationship display
- student note
- asset reference
- lazy detail load when implemented

---

# 17. Final Investigation Tests

Test:

- configured sections render
- required section validation
- evidence picker
- minimum evidence count
- exact solution mode
- multiple-defensible mode
- ranked mode
- open-evidence-based mode
- teacher-controlled reveal
- no-reveal mode
- student/team/mixed submission mode

Do not force an exact answer in multiple-defensible/open modes.

---

# 18. Runtime Integration Test

This path is mandatory:

```text
component or test harness
        ↓
RuntimeEvent
        ↓
RuleEngine
        ↓
ConditionEvaluator
        ↓
RuntimeCommand
        ↓
CommandExecutor
        ↓
RuntimeState update
        ↓
subscriber / component view updates
```

Example:

1. Complete activity.
2. `activity.completed` emitted.
3. Rule matches.
4. `evidence.unlock` command created.
5. Runtime evidence state becomes available.
6. Case Board renders the evidence as available.

---

# 19. Branching Integration Test

Test two different student decisions.

Example:

Path A:

```text
search lab
→ state labSearched = true
→ evidence A unlocks
```

Path B:

```text
interview technician
→ resource spent
→ evidence B unlocks
```

Both must use the same shared runtime/rule/state engine.

---

# 20. Team Scope Tests

Test:

- team-shared evidence visible to both students
- student-private hypothesis remains private
- team resource is shared
- individual reflection not exposed to teammates
- team state changes do not leak to another team

Realtime can be mocked in V1.

---

# 21. Idempotency Tests

Required:

- same activity completion event twice
- same evidence-creation event twice
- same resource-spend request twice
- same official submission request twice

Result:

state-changing consequence applies once.

---

# 22. Reuse Tests

A reusable Investigation capability is not considered proven after one project.

Required projects:

## Project A
7th Grade Mystery Substance Outbreak Lab

## Project B
4th Grade Fossil Detectives

## Project C
4th Grade First Encounters Case File

They must use the same:

- Case Board
- EvidenceService
- HypothesisService
- RuleEngine
- state engine
- final-investigation framework

Project-specific configuration/content may differ.

Project C must use the same engine for historical primary/secondary sources,
perspective, bias, conflicting evidence, and multiple explanations. This is the
required non-science reuse proof.

---

# 23. Reuse Audit

After implementing Project B, report:

```text
Existing components reused unchanged:
...

Existing components extended:
...

New reusable capability:
...

Core contract changed:
yes/no

If yes, why:
...

Could this have been implemented as a plugin:
...
```

Large changes to core Investigation components are an architecture warning.

---

# 24. Existing Mystery Lab Regression Testing

The Mystery Substance lab may contain existing code before migration.

Before refactoring:

- identify working workflows
- identify simulations/labs
- identify existing student data models
- identify visual interactions
- identify expected results

Create regression tests for important existing behaviors before replacing internal architecture where practical.

Goal:

preserve working educational behavior while moving it into reusable contracts.

---

# 25. Browser / E2E Tests

V1 may keep browser E2E tests limited.

High-value scenarios:

1. open investigation
2. collect evidence
3. classify evidence
4. create hypothesis
5. complete activity
6. evidence unlocks
7. revise hypothesis
8. final submission opens
9. final report references evidence

Use a stable fixture project.

---

# 26. Accessibility Tests

At minimum:

- keyboard Case Board movement
- focus visibility
- button labels
- evidence detail accessible names
- no drag-only required workflow
- final submission keyboard operation

Use automated accessibility checks if already supported by the toolchain, but do not treat automation as a substitute for component-level accessibility review.

---

# 27. Performance-Oriented Tests

V1 domain tests should verify no obvious write explosion behavior.

Examples:

- drag emits only drop mutation
- text draft persistence is debounced
- simulation emits completed trial result
- evidence view event is not continuously repeated

---

# 28. Future Load Tests

Before production, simulate:

- 300 students opening the same project
- 100 teams updating shared boards
- 200 activity completions in a short burst
- 100 simulation trial submissions
- teacher loading a large class summary
- simultaneous team resource transactions
- evidence upload burst

These are future production tests, not V1 blockers.

---

# 29. Test Fixture Organization

Recommended:

```text
src/testing/
├── projects/
│   ├── valid-basic-investigation/
│   ├── valid-open-investigation/
│   ├── invalid-missing-reference/
│   ├── invalid-circular-gate/
│   └── ...
├── runtime/
└── helpers/
```

Keep fixture project packages readable.

They also serve as examples for future project generation.

---

# 30. Definition of Done

A phase is not complete until:

- strict TypeScript build passes
- Angular build passes
- relevant unit tests pass
- new reusable capability has tests
- no unrelated tests removed
- integration path still passes
- architecture specs remain satisfied

Codex must report test/build results at the end of each substantial implementation task.

---

# 31. Tenant, Authority, and Privacy Tests

Before production, add tests proving:

- identical IDs in two tenants cannot collide in persistence, realtime,
  idempotency, caches, assets, or analytics
- student clients cannot receive protected teacher metadata
- tenant/class/team enrollment and role are enforced server-side
- concurrent high-stakes team transactions cannot both commit
- optimistic low-risk mutations expose pending/rejected/conflict states
- official attempts, mastery, grading, final submissions, teacher actions,
  enrollment, and membership require authoritative confirmation
- completion does not imply mastery, approval, submission, or grade
- accessibility behavior meets the requirements in the UI specification
