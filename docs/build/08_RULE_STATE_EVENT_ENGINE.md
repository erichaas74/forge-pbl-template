# Rule, State, and Event Engine Specification

## Purpose

Define the behavioral engine shared by Investigation capabilities.

The same engine must power:

- progression
- gates
- branching
- consequences
- resource logic
- NPC dialogue availability
- evidence unlocking
- phase unlocks
- final submission
- teacher overrides

---

# 1. Core Runtime Pipeline

```text
User/System Action
        ↓
RuntimeEvent
        ↓
Rule selection
        ↓
Condition evaluation
        ↓
Matched rules
        ↓
RuleActions
        ↓
RuntimeCommands
        ↓
Command execution
        ↓
Runtime mutation
        ↓
Updated snapshot
        ↓
UI/realtime subscribers
```

---

# 2. Event Registry

All event types must be registered.

Initial V1 event types:

## Activity
- `activity.started`
- `activity.completed`
- `activity.resultSubmitted`

## Evidence
- `evidence.viewed`
- `evidence.collected`
- `evidence.classified`
- `evidence.annotationAdded`
- `evidence.connected`
- `evidence.disconnected`
- `evidence.studentCreated`
- `evidence.usedInClaim`

## Hypothesis
- `hypothesis.created`
- `hypothesis.revised`
- `hypothesis.selected`
- `hypothesis.rankChanged`
- `hypothesis.eliminated`
- `hypothesis.evidenceAttached`

## Confidence
- `confidence.changed`

## Resource
- `resource.spendRequested`
- `resource.addRequested`

## NPC
- `npc.questionAsked`
- `npc.dialogueCompleted`

## Phase
- `phase.openRequested`
- `phase.completed`

## Teacher
- `teacher.commandRequested`
- `teacher.releaseTriggered`

## Final
- `finalSubmission.openRequested`
- `finalSubmission.submitted`

## Future hooks
- `mastery.met`
- `reasoningCheck.requested`
- `reasoningCheck.passed`
- `reasoningCheck.needsRevision`
- `defense.passed`

---

# 3. Event Semantics

Events describe facts/requests.

Examples:

Good:

`activity.completed`

Good:

`evidence.classified`

Avoid using event names that encode a project-specific outcome:

Bad:

`mysterySubstanceTemperatureProvesChemicalB`

---

# 4. Rule Trigger Index

For performance, maintain indexes such as:

```text
eventType -> candidate rule IDs
eventType + targetId -> candidate rule IDs
```

Do not evaluate every rule on every event if avoidable.

---

# 5. Rule Ordering

When multiple rules match the same event:

1. higher/lower priority according to one documented convention
2. stable rule ID as deterministic tie breaker

Document the chosen priority convention in code/tests.

Do not rely on JSON file order.

---

# 6. Condition Group Logic

Support:

- `AND`
- `OR`
- `NOT`
- `X_OF`

Nested groups are allowed.

Example:

```json
{
  "operator": "AND",
  "conditions": [
    {
      "type": "hypothesis.exists",
      "operator": "equals",
      "value": true
    },
    {
      "operator": "X_OF",
      "requiredCount": 3,
      "conditions": [
        {
          "type": "evidence.status",
          "targetId": "ev-a",
          "operator": "equals",
          "value": "collected"
        },
        {
          "type": "evidence.status",
          "targetId": "ev-b",
          "operator": "equals",
          "value": "collected"
        },
        {
          "type": "evidence.status",
          "targetId": "ev-c",
          "operator": "equals",
          "value": "collected"
        },
        {
          "type": "evidence.status",
          "targetId": "ev-d",
          "operator": "equals",
          "value": "collected"
        }
      ]
    }
  ]
}
```

---

# 7. Initial Condition Pack

Register at least:

## `activity.status`

Inputs:

- targetId
- operator
- value

Reads ActivityRuntimeState.

## `evidence.status`

Reads EvidenceRuntimeState.

## `evidence.count`

Counts evidence matching optional filters.

Possible params:

- status
- requirement
- type
- phase

## `evidence.classification`

Checks student's classification.

## `evidence.relationship`

Checks relationship existence/type.

## `hypothesis.exists`

Checks count/existence.

## `hypothesis.selected`

Checks selected hypothesis ID/status.

## `hypothesis.revised`

Checks revision count.

## `hypothesis.count`

Checks number of active/student hypotheses.

## `hypothesis.confidence`

Checks configured confidence value.

## `state.value`

Reads namespaced state variable.

## `resource.amount`

Checks current runtime resource amount.

## `phase.status`

Checks phase runtime status.

## `team.taskStatus`

Hook for shared LMS team tasks.

## `teacher.release`

Checks teacher-release runtime flag/state.

---

# 8. Future Condition Hooks

Reserve IDs but implementation may defer:

- `mastery.level`
- `reasoningCheck.status`
- date/time condition
- simulation-specific registered conditions

---

# 9. Comparison Operators

Define a shared operator registry/helper for common comparisons:

- `equals`
- `notEquals`
- `greaterThan`
- `greaterThanOrEqual`
- `lessThan`
- `lessThanOrEqual`
- `contains`
- `notContains`
- `in`
- `notIn`
- `exists`

Avoid each evaluator inventing inconsistent comparison semantics.

---

# 10. Initial Action Pack

Register handlers for:

## Evidence
- `evidence.unlock`
- `evidence.lock`
- `evidence.hide`
- `evidence.reveal`
- `evidence.create`

## Activity
- `activity.unlock`
- `activity.lock`

## Lesson
- `lesson.unlock`

## Phase
- `phase.unlock`
- `phase.complete`

## State
- `state.set`
- `state.increment`
- `state.decrement`
- `state.toggle`
- `state.addToList`
- `state.removeFromList`

## Resource
- `resource.add`
- `resource.spend`

## Messaging
- `message.show`

## Hypothesis
- `hypothesis.require`
- `revision.require`

## Final
- `finalSubmission.open`
- `finalSubmission.close`
- `solution.reveal`

## Teacher
- `teacher.notify`

## NPC
- `npc.unlockDialogue`

---

# 11. Action Validation

Before execution:

- action type registered
- target exists when required
- value type valid
- resource/state constraints valid
- permissions/authority valid
- capability installed

Invalid actions return structured error.

---

# 12. Non-Repeatable Rules

For `repeatable: false`, store a runtime record that the rule has fired for the relevant scope.

Example runtime concept:

```ts
firedRuleIds: string[]
```

or a bounded map with timestamps/results.

Repeated qualifying events must not reapply the same non-repeatable rule.

---

# 13. Repeatable Rules

Repeatable rules may execute multiple times.

Use caution for actions such as resource rewards.

Project validators should warn about dangerous repeatable rules that can create unbounded resource/evidence creation loops.

---

# 14. Derived Events and Rule Loops

Some commands may produce meaningful follow-up events.

Example:

`evidence.unlock` may optionally lead to `evidence.available`.

Avoid unrestricted recursive event chains.

Implement:

- max derived-event depth
- cycle detection or bounded processing
- structured error if loop threshold exceeded

---

# 15. Rule Transaction Boundary

A single event may produce multiple commands.

Prefer atomic application where possible for logically related state changes.

Example:

```text
resource.spend 1
state.set testPerformed=true
evidence.unlock ev-result
```

Production high-stakes execution should eventually be server transactional.

---

# 16. State Namespace Rules

State IDs should be semantic and stable.

Examples:

- `case.unknownSubstance`
- `sample.b.condition`
- `patient.vitals.temperature`
- `location.storageRoom.searched`

Avoid dynamically inventing arbitrary state keys at runtime unless a registered extension explicitly supports them.

---

# 17. State Type Enforcement

Use StateVariableDefinition to validate mutations.

Examples:

- number increment only on numeric/counter state
- choice value must be allowed
- immutable variable cannot be changed
- min/max honored
- list operation requires list type

Invalid mutation -> structured error.

---

# 18. Resource Enforcement

Runtime resource amount must respect:

- min
- max if set
- scope
- integer/decimal policy if defined later

Spend below minimum must fail.

Client display should not optimistically commit high-stakes spend without future authoritative confirmation.

---

# 19. Randomization Integration

Randomization may run:

- runtime initialization
- explicit rule action if later supported

Assigned random result should be written to a defined state variable.

If assignment already exists for the scope/project version, reuse it.

---

# 20. NPC Integration

NPC dialogue availability may depend on rules/state.

`npc.questionAsked` may trigger:

- resource spend
- evidence creation
- state change
- dialogue unlock
- message

NPC component does not directly apply these consequences.

---

# 21. Teacher Controls

Teacher controls create the same RuntimeCommands.

Example:

Teacher clicks "Release Evidence".

Command:

```json
{
  "commandType": "evidence.unlock",
  "targetId": "ev-hidden-clue"
}
```

Teacher override is recorded separately for audit.

---

# 22. Idempotency

Use `clientEventId`.

If duplicate:

- do not double-apply
- return duplicate/no-op result
- preserve previous accepted outcome

High-stakes production persistence should store idempotency keys with an appropriate retention strategy.

---

# 23. Offline/Retry Compatibility

Low-risk events may queue client-side.

Examples:

- note created
- board moved
- hypothesis draft/revision

High-stakes actions should require server confirmation in production.

The V1 local engine should preserve the same event/command interfaces.

---

# 24. Runtime State Updates

Do not replace the entire runtime snapshot for every small change.

Use scoped mutations.

This reduces future database conflicts/write volume.

---

# 25. Event Log vs Snapshot

Maintain:

- current snapshot for fast load
- bounded/meaningful event log for history/debugging

Do not require replaying thousands of events to reconstruct state on every load.

This is lightweight event history, not full event sourcing.

---

# 26. Hypothesis History

Hypothesis revisions are first-class records.

A revision event should append a HypothesisRevision.

Do not overwrite earlier revisions.

---

# 27. Evidence Classification

Classification should be student/team runtime state.

Teacher-defined meaning remains in configuration metadata.

Do not automatically force a student's classification to match teacher metadata.

---

# 28. Evidence Connection

Relationships created by students should remain separate from teacher-defined evidence relationships when needed.

Consider runtime relationship records with:

- source
- target
- type
- actor
- timestamp

Teacher-defined metadata should remain distinguishable.

---

# 29. Testing Matrix

## Condition tests
Each evaluator:
- true case
- false case
- missing target
- invalid operator
- invalid value type

## Action tests
Each handler:
- valid target
- missing target
- invalid state type
- constraints
- idempotency where applicable

## Rule tests
- trigger match
- target match
- AND
- OR
- NOT
- X_OF
- nested groups
- priority
- repeatable
- non-repeatable

## Integration
- activity completion unlocks evidence
- evidence count opens phase
- hypothesis revision enables final
- insufficient resource prevents action
- teacher command updates runtime
- duplicate event applies once

---

# 30. Acceptance Criteria

The behavioral engine is ready when a fixture project can demonstrate:

1. locked evidence,
2. activity completion event,
3. rule match,
4. evidence unlock,
5. hypothesis creation,
6. evidence classification,
7. limited-resource spend,
8. branching state change,
9. NPC question creating new path,
10. final submission opening after conditions,
11. duplicate event not double-applying,
12. all behavior occurs without project-specific code.

---

# 31. Authority Classification

Commands/events must carry enough tenant, actor, scope, version, request, and
idempotency context for an authoritative adapter to decide whether to commit.

Server authority is required for limited resources, generated-once assignment,
official attempts, mastery, grades, final submissions, teacher actions,
enrollment, membership, and constrained shared-team transactions. Rule matching
on the client does not grant authority to commit these outcomes.

---

# 32. Educational State Transitions

Rules may depend independently on completion, mastery, submission, approval,
rubric results, and grade. A command that marks an activity complete must not
also mark mastery, approval, or grading unless separate explicit commands and
authoritative results require those transitions.
