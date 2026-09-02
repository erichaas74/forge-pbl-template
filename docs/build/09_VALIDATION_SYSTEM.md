# Investigation Project Validation System

## Purpose

Validate LLM-generated and human-authored project packages before students use them.

Validation is a required part of V1.

The validator must identify problems, not silently invent fixes.

---

# 1. Validation Pipeline

Run in this order:

1. package/file validation
2. schema validation
3. ID/index validation
4. reference validation
5. capability validation
6. semantic/value validation
7. logic/reachability validation
8. publication-readiness validation

---

# 2. Validation Output

Use structured issues.

```ts
interface ValidationIssue {
  code: string;
  severity: 'warning' | 'error';
  entityId?: string;
  file?: string;
  message: string;
  suggestion?: string;
}
```

Optional additions:

- path
- relatedEntityIds
- capabilityId
- phaseId

---

# 3. Severity

## Error

Blocks publication/student use.

Examples:

- missing required file
- invalid schema
- duplicate ID
- missing referenced evidence
- unknown rule condition
- impossible required evidence path

## Warning

Allows preview/publish depending on policy.

Examples:

- unused optional evidence
- no decoys even though capability enabled
- overly broad open project
- orphaned optional lesson
- suspicious repeatable reward rule

---

# 4. Package Validation

Check:

- required files present
- JSON parseable
- supported schema version
- template ID/version recognized
- optional files valid if present
- referenced content/assets resolve in package or approved external reference format

---

# 5. Schema Validation

Validate each entity against its schema.

Examples:

- required field missing
- invalid enum
- wrong value type
- malformed array
- invalid number range
- invalid ID format if enforced

Do not allow unknown breaking fields outside `extensions` unless schema explicitly allows them.

---

# 6. Duplicate ID Validation

Build a package-wide ID registry.

Detect duplicates that would make references ambiguous.

At minimum within each entity class.

Prefer globally stable uniqueness unless namespaced IDs are deliberately allowed.

---

# 7. Reference Validation

Check all references exist.

Examples:

- phase references activity
- activity references evidence
- rule references evidence
- evidence references hypothesis
- NPC references evidence
- final submission references rubric
- randomization writes to state variable
- rule targets resource/state/phase

Error example:

```text
REFERENCE_NOT_FOUND

rule-unlock-result references:
ev-temperature-result

but ev-temperature-result does not exist.
```

---

# 8. Capability Validation

Check every configured capability exists in the active registry.

Validate:

- evidence type
- activity type/plugin
- board section type
- condition type
- action type
- relationship type
- final section type
- NPC type if registry-driven
- theme/plugin if required

Unknown required capability -> error.

Unknown optional extension may be warning/error based on whether project can safely degrade.

Student runtime should never silently skip required unsupported behavior.

---

# 9. State Validation

Check:

- unique state IDs
- initial value matches type
- choice initial value is allowed
- min/max valid
- mutable rules valid
- actions target existing state
- operation compatible with type

Examples:

- increment string -> error
- set invalid choice -> error
- modify immutable state -> error

---

# 10. Resource Validation

Check:

- initial >= min
- initial <= max when set
- min <= max
- resource cost references existing resource
- negative spend amounts invalid
- action does not use unknown resource

Warn if:

- required activity costs more than maximum obtainable amount

This may become logic error if project becomes impossible.

---

# 11. Randomization Validation

Check:

- output state exists
- output state type compatible
- strategy required fields exist
- weightedChoice weights valid
- numericRange has valid bounds
- fixed seed present when required
- option values compatible with output state

Warn/error if randomization can generate a case with no valid completion path.

---

# 12. NPC Validation

Check:

- unique dialogue IDs
- evidence references exist
- availability rules exist
- action IDs/command definitions valid
- dialogue graph has at least one reachable starting question if NPC required
- locked required dialogue can become reachable

---

# 13. Phase Validation

Check:

- phase IDs unique
- order values valid
- required project has starting phase
- phase references valid activities/lessons/rules
- at least one path from start to final phase if final phase required

---

# 14. Case Board Validation

Check:

- section IDs unique
- order valid
- required section types registered
- accepted item types valid
- final configuration has usable board when capability enabled

Warn if:

- all student-editable sections disabled
- evidence exists but no evidence-capable section exists
- hypothesis required but no hypothesis view/entry path exists

---

# 15. Evidence Validation

Check:

- evidence type registered
- availability state valid
- referenced rules/phases exist
- requirement consistent
- teacher hypothesis metadata references existing hypotheses
- assets/content references resolve

Warn if:

- evidence is never referenced/reachable
- decoy metadata conflicts with exact solution metadata
- teacher meaning omitted for high-stakes evidence, if policy requires it

---

# 16. Hypothesis Validation

Check:

- predefined hypothesis IDs unique
- evidence references exist
- exact solution IDs exist
- ranked solution has ranking criteria
- multiple-defensible mode has acceptable evaluation structure
- hypothesis requirements can be satisfied

---

# 17. Final Submission Validation

Check:

- required section type registered
- min evidence count <= possible collectible evidence count
- exact solution configuration available when required
- team mode compatible with project/team configuration
- final availability rules exist
- final can become reachable

---

# 18. Logic Graph

Build a simplified dependency graph.

Nodes may include:

- phases
- evidence
- activities
- lessons
- rules
- required hypotheses
- state gates
- resources
- final submission

Edges represent dependencies/unlocks.

The goal is not to perfectly simulate every path but to detect obvious impossibility/cycles.

---

# 19. Circular Dependency Detection

Example invalid cycle:

```text
Activity C requires Evidence D
Evidence D unlocks only after Activity C
```

Return:

```text
CIRCULAR_GATE_DEPENDENCY
```

Include involved entity IDs.

---

# 20. Unreachable Required Content

Error when a required item has no possible path from initial state.

Examples:

- required evidence permanently locked
- final phase entry rule can never be satisfied
- required NPC dialogue never unlocks
- required activity depends on impossible resource amount

---

# 21. Orphaned Content

Warn when:

- evidence is never referenced and never initially available
- lesson not linked to phase/rule/resource library
- activity never linked/reachable
- rule trigger cannot occur
- rule has no actions
- NPC exists but is never reachable
- custom board section accepts nothing and has no purpose

Optional orphan may be warning, required orphan error.

---

# 22. Impossible Final Requirements

Examples:

- final requires 5 evidence items but only 4 can ever be collected
- final requires revision but hypothesis revision disabled
- final requires team submission but project is individual-only
- final requires counterevidence but no evidence can be classified/selected as counterevidence and no manual entry allowed

---

# 23. Dangerous Repeatable Rules

Warn when repeatable rule can:

- create unlimited evidence
- add unlimited resources
- recursively trigger itself
- continuously open/close state
- create unbounded event chain

Use static analysis where practical.

---

# 24. Event/Rule Reachability

Check rule trigger event types are registered.

Warn/error if a rule listens for an event no configured component can produce.

Example:

`sequence.mutationFound` but genetics plugin not installed.

---

# 25. Capability Gap Reporting

If unsupported capability originates from the authoring brief/generation process, produce clear output.

Example:

```text
TEMPLATE_CAPABILITY_GAP

Requested:
Live voice interrogation.

Missing:
voice.interrogation

Existing capabilities:
scripted NPC dialogue

Recommendation:
Use scripted dialogue or add a reusable voice-interaction plugin.
```

The validation system can emit a machine-readable capability issue plus a human-readable report.

---

# 26. Validation Report Summary

Recommended report:

```text
Project: Mystery Substance Outbreak Lab
Schema: 1.0
Template: investigation@1.0

Errors: 0
Warnings: 3

Capabilities:
Supported: 18
Missing: 0

Reachability:
Final reachable: yes
Required evidence reachable: 12/12
Required activities reachable: 6/6
```

---

# 27. Validator Architecture

Prefer separate validators implementing a shared interface.

```ts
interface ProjectValidator {
  id: string;

  validate(
    graph: ProjectDefinitionGraph,
    registry: CapabilityRegistryView
  ): ValidationIssue[];
}
```

Examples:

- `SchemaValidator`
- `ReferenceValidator`
- `CapabilityValidator`
- `StateValidator`
- `ResourceValidator`
- `LogicValidator`
- `PublicationValidator`

ValidationService aggregates results.

---

# 28. Validators Are Extensible

A new plugin may register additional validators.

Example:

Genetics plugin validates DNA sequence configuration.

Do not place every subject-specific validation rule into the core validator.

---

# 29. Preview Behavior

Preview mode may render projects with warnings.

Preview with errors should:

- display validation panel
- avoid executing invalid capability paths
- never pretend invalid content is working

Student/published mode should block on publication-level errors.

---

# 30. LLM Workflow Integration

Generation pipeline:

```text
Designer Brief
↓
LLM
↓
Project Package
↓
Validation Pipeline
↓
Validation Report
↓
Revision/Regeneration
↓
Preview
```

LLM should not be considered the validator.

---

# 31. Automated Test Fixtures

Create fixture projects for:

## Valid
- simple linear investigation
- open investigation
- random/team investigation
- multiple-defensible final

## Invalid
- missing reference
- duplicate ID
- unsupported evidence type
- circular gate
- unreachable evidence
- impossible resource requirement
- invalid randomization
- impossible final evidence count
- unknown rule action

Each fixture should assert exact expected issue codes.

---

# 32. Acceptance Criteria

The validation system is ready when:

1. valid fixture passes,
2. malformed entity is identified,
3. missing reference is identified,
4. unknown capability is identified,
5. circular gate is identified,
6. unreachable required evidence is identified,
7. impossible resource path is identified,
8. impossible final requirement is identified,
9. validators are registerable/extensible,
10. errors block publish mode.

---

# 33. Security and Delivery Validation

Validation must reject executable project-package content and unknown/untrusted
plugin references. Publication validation must also classify student-safe and
teacher-only data so deployment can filter or separate correct answers, evidence
meaning, decoy status, hidden solution relationships, and grading keys.

Preview convenience must not weaken production authorization. Client-side
visibility flags are presentation metadata, not security controls.

---

# 34. Required Architecture Fixtures

Validation and reuse fixtures must cover all three stress-test projects:

1. Mystery Substance Outbreak Lab
2. Fossil Detectives: Rebuild the Lost Landscape
3. First Encounters Case File

Together they must exercise exact and multiple-defensible solutions, optional
resources, science and historical evidence, perspective/bias, branching,
randomization, younger-learner constraints, and clean capability omission.
