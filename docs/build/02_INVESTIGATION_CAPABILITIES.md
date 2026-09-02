# Investigation Template Capability Inventory

## Purpose

This document defines the capabilities the Investigation Template may expose to project configuration.

Individual projects select/configure these capabilities.

The list is intentionally broader than the first pilot project so the engine can support science, social studies, ELA, and other investigation-style work.

Capability IDs should remain stable once published.

---

# Capability Status

Each capability should eventually be classified as:

- **CORE** — expected in the base Investigation engine
- **OPTIONAL** — built into the template but enabled only when requested
- **EXTENSION** — supplied by another shared/plugin capability
- **FUTURE** — contract/hook reserved but implementation deferred

---

# INV-01 Investigation Goals — CORE

Supported goals:

- `identifyUnknown`
- `diagnoseProblem`
- `solveMystery`
- `determineCause`
- `evaluateExplanations`
- `recommendSolution`

A project may select more than one.

Example:

`determineCause + recommendSolution`

---

# INV-02 Solution Models — CORE

Support:

- `exact`
- `multipleDefensible`
- `ranked`
- `openEvidenceBased`

Meaning:

### exact
A teacher-defined correct identification/diagnosis/conclusion exists.

### multipleDefensible
Several conclusions may be acceptable if supported by evidence/reasoning.

### ranked
Several solutions may work, but some meet evidence/constraints better.

### openEvidenceBased
No single teacher-defined final answer is required; evaluation focuses on evidence and reasoning.

---

# INV-03 Granular Investigation Control — CORE

Do not use one grade-level openness slider as the only control.

Designer can independently configure:

- evidence order
- activity order
- lesson order
- required evidence
- optional evidence
- hidden evidence
- decoys
- hypothesis timing
- revision requirements
- revisit behavior
- final reveal
- teacher overrides

This enables highly controlled 4th-grade investigations and more open 8th-grade investigations using the same template.

---

# INV-04 Investigation Phases — CORE

Default conceptual phases may include:

1. mission launch
2. initial observations
3. evidence gathering
4. initial hypothesis
5. testing
6. additional evidence
7. hypothesis revision
8. final investigation
9. defense
10. reveal/reflection

Projects can:

- rename
- remove
- add
- reorder
- repeat phases

Do not hardcode "Week 1 / Week 2 / Week 3" into the Investigation engine.

---

# INV-05 Case Board Sections — CORE

Built-in section types should support configuration such as:

- Mission Question
- What We Know
- What We Think We Know
- Questions
- Evidence Locker
- Observations
- Data
- Supports
- Contradicts
- Uncertain
- Possible Explanations
- Hypotheses
- Current Hypothesis
- Alternative Hypotheses
- Suspects
- Causes
- Diagnoses
- Possible Solutions
- Constraints
- Confidence
- Remaining Uncertainty
- Final Claim
- Recommendation
- custom section

Designer can:

- enable/disable
- rename
- reorder
- configure accepted item types
- add custom sections

---

# INV-06 Case Board Interactions — CORE

Students may be allowed to:

- drag cards between sections
- use keyboard/non-drag movement
- reorder cards
- pin evidence
- mark evidence reviewed
- add notes
- annotate evidence
- classify evidence
- create evidence
- connect evidence to hypotheses
- revise classifications
- record confidence
- create questions
- flag contradictions

Visible line-based relationship visualization can be V1.5, but relationship data should be supported in V1.

---

# INV-07 Evidence Relationships — CORE

Relationship types should be registry-driven.

Initial types:

- `supports`
- `contradicts`
- `relatedTo`
- `causedBy`
- `possiblyCausedBy`
- `rulesOut`
- `consistentWith`
- `inconsistentWith`
- `dependsOn`
- `cameFrom`
- `confirms`
- `weakens`

Allow additional registered relationship types.

---

# INV-08 Evidence Types — CORE + EXTENSIONS

Initial generic evidence types:

- text
- image
- diagram
- document
- historical source
- scientific source
- interview
- witness statement
- expert statement
- artifact
- photograph
- map
- timeline
- lab result
- observation
- measurement
- data table
- graph
- chart
- model
- simulation result
- screenshot
- student note
- student upload

V1.5 / extensions:

- video
- audio
- interactive map
- 3D artifact/model
- subject-specific renderers such as DNA sequence or microscope slide

Do not hardcode all types into EvidenceService. Use a renderer/type registry.

---

# INV-09 Evidence Runtime Status — CORE

Possible runtime states:

- hidden
- locked
- available
- unopened
- viewed
- collected
- classified
- annotated
- usedInClaim
- archived

Configuration state and runtime status must remain separate.

---

# INV-10 Evidence Requirement — CORE

Evidence can be:

- required
- optional
- extension
- hidden
- decoy
- conditional
- teacher released

---

# INV-11 Teacher-Only Evidence Metadata — CORE

Possible metadata:

- reliability
- relevance
- strength
- accuracy
- bias
- uncertainty
- direct/circumstantial
- primary/secondary
- qualitative/quantitative
- valid/invalid
- misleading
- decoy
- intentionally incomplete
- teacher meaning
- supports hypotheses
- contradicts hypotheses
- rules out hypotheses

Teacher-only metadata must never be student-visible by default.

---

# INV-12 Evidence Meaning — CORE

Evidence may:

- support one hypothesis
- weaken another
- contradict one
- rule one out
- support several
- be neutral
- remain ambiguous

This metadata can later support grading, analytics, validation, or external AI reasoning tools.

---

# INV-13 Student-Created Evidence — CORE

Students can create:

- observation
- measurement
- note
- photo
- screenshot
- graph
- data table
- calculation
- lab result
- drawing/model
- file
- video
- interview note
- source note

V1 may initially support a subset, but the creator must be plugin-driven.

---

# INV-14 Student Evidence Requirements — CORE

Designer can require fields such as:

- title
- description
- source
- units
- timestamp
- originating activity
- relevance explanation
- classification
- connected hypothesis

---

# INV-15 Hypothesis Labels — CORE

The same underlying object may be presented as:

- hypothesis
- suspect
- diagnosis
- explanation
- cause
- identification
- proposed solution
- theory

Labels are project configuration, not separate services/components.

---

# INV-16 Hypothesis Rules — CORE

Designer may configure whether students:

- form one immediately
- collect evidence first
- must form one by a checkpoint
- maintain multiple hypotheses
- rank hypotheses
- eliminate alternatives
- revise at least once
- may submit without revision

---

# INV-17 Hypothesis History — CORE

Never overwrite previous reasoning as the only record.

Preserve:

`initial -> revision -> later revision -> final`

History may include:

- statement
- timestamp
- confidence
- evidence links
- reason for change

---

# INV-18 Confidence — CORE

Confidence may apply to:

- evidence
- hypotheses
- final conclusion

Modes:

- none
- low/medium/high
- 1–5
- percentage
- registered custom labels

---

# INV-19 Investigation Activity Types — EXTENSION/SHARED

Use the shared LMS Activity Host.

Investigation-compatible types can include:

- interactive lab
- simulation
- virtual workstation
- physical/offline lab
- data analysis
- source investigation
- interview
- document analysis
- map investigation
- artifact examination
- observation station
- measurement station
- comparison tool
- model builder
- decision simulation
- field investigation
- research activity

---

# INV-20 Activity Outputs — CORE CONTRACT

An activity may produce:

- completion status
- evidence
- data
- observation
- score
- state changes
- questions
- unlock-related events
- resource changes
- attachments
- metadata

Use a general ActivityResult contract.

---

# INV-21 Investigation State Variables — CORE

Projects can define state variables such as:

- `patient.condition`
- `sample.b.temperature`
- `suspect.interviewed`
- `location.searched`
- `reaction.occurred`
- `population.health`

Use namespaced stable IDs.

---

# INV-22 State Types — CORE

Support:

- boolean
- number
- string/text
- choice
- list
- status
- counter

---

# INV-23 State Operations — CORE

Initial actions:

- set
- increment
- decrement
- toggle
- addToList
- removeFromList

---

# INV-24 Rule Conditions — CORE

Initial condition types should include:

- project/phase state
- lesson status
- activity status
- activity score/result
- simulation completion/result
- evidence availability/status
- evidence count
- evidence classification
- evidence relationship
- specific evidence combination
- hypothesis exists
- hypothesis revised
- hypothesis selected
- hypothesis count
- hypothesis confidence
- board section completion
- mastery level hook
- team task status
- student/team role
- investigation state value
- resource amount
- teacher release
- teacher override
- date/time hook
- external reasoning-check state hook

Conditions must be registry-driven.

---

# INV-25 Rule Actions — CORE

Initial action types:

- unlock evidence
- lock evidence
- reveal evidence
- hide evidence
- create evidence
- unlock activity
- lock activity
- unlock lesson
- unlock phase
- complete phase
- show message
- show warning
- set state
- increment/decrement state
- add/spend resource
- require hypothesis
- require revision
- create question/event
- enable final submission
- disable final submission
- reveal solution
- open defense hook
- notify teacher
- unlock NPC dialogue

Actions must be registry-driven.

---

# INV-26 Rule Logic — CORE

Support:

- AND
- OR
- NOT
- X_OF
- threshold/comparison through condition evaluators
- nested condition groups

---

# INV-27 Investigation Events — CORE

Events may be:

- student-triggered
- activity-triggered
- teacher-triggered
- state-triggered
- scheduled
- random

Use the common RuntimeEvent envelope.

---

# INV-28 Event Outcomes — CORE

Events/rules may:

- create evidence
- change state
- alter available choices
- unlock/hide content
- change NPC dialogue availability
- create complications
- change final challenge availability

---

# INV-29 Investigation Mode — CORE

Support:

- individual
- team
- mixed

---

# INV-30 Audience / Visibility — CORE

Items may be targeted to:

- individual student
- team
- class
- role
- teacher only

Use a reusable AudienceAssignment contract.

---

# INV-31 Evidence Distribution — OPTIONAL

Support:

- same evidence for all
- evidence by student
- evidence by role
- evidence by team
- randomized evidence
- teacher-selected evidence
- evidence earned through activity

---

# INV-32 Team Collaboration — OPTIONAL

Students may:

- share evidence
- move shared evidence
- create team notes
- propose team hypotheses
- vote/rank
- combine evidence
- assign investigation tasks
- create shared final claims

Maintain an individual layer for mastery/reflection/reasoning when configured.

---

# INV-33 Investigation-Linked Lessons — SHARED/EXTENSION

Lessons can be:

- required before an activity
- required after evidence
- triggered by state
- optional reference
- reteach
- extension

---

# INV-34 Resource Library — SHARED

Resources may include:

- vocabulary
- reference guide
- procedures
- safety rules
- data help
- graphing help
- source-analysis guide
- evidence guide
- exemplar
- rubric
- hints

---

# INV-35 Mastery Hooks — FUTURE/SHARED

Mastery checks may occur:

- before investigation
- during phases
- after evidence
- after lessons
- before important activities
- before final submission

Initial V1 should reserve rule hooks even if full mastery implementation comes later.

---

# INV-36 Mastery Effects — FUTURE/SHARED

Possible effects:

- allow progression
- recommend reteach
- require reteach
- unlock retake
- do not gate investigation

---

# INV-37 Reteach — FUTURE/SHARED

Reteach may provide:

- short lesson
- worked example
- alternate evidence
- practice
- correction
- retry
- alternate mastery check

---

# INV-38 Final Response Types — CORE

Support investigation outcomes such as:

- identification
- diagnosis
- mystery conclusion
- cause
- strongest explanation
- recommendation

---

# INV-39 Final Reasoning Components — CORE

Configurable sections:

- claim
- identification
- diagnosis
- explanation
- recommendation
- evidence
- data
- reasoning
- counterevidence
- alternative explanations
- eliminated hypotheses
- confidence
- limitations
- uncertainty
- next test
- safety recommendation
- action plan
- reflection
- individual contribution

Use a FinalSection registry.

---

# INV-40 Final Product Formats — SHARED/EXTENSION

Possible formats:

- guided form
- case file
- investigation report
- lab report
- presentation
- poster
- video
- oral defense
- debate/hearing
- recommendation brief
- digital evidence board
- mixed package

V1 can focus on structured guided submission while keeping extension hooks.

---

# INV-41 Final Reveal — CORE

Modes:

- after individual submission
- after team submission
- after defense hook
- teacher controlled
- scheduled hook
- no formal reveal

---

# INV-42 Defense — FUTURE/SHARED

Possible:

- none
- written defense
- teacher defense
- peer defense
- external AI defense
- combination

External AI is not implemented in the Investigation builder/runtime in V1; reserve state/event hooks.

---

# INV-43 Teacher Live Controls — OPTIONAL/V1 BASIC

Teacher should eventually be able to:

- release evidence
- remove/hide evidence
- add surprise evidence
- send evidence to student/team/class
- unlock/lock/skip activity
- override gate
- change state
- reset activity/state
- extend attempts
- add hint
- open phase
- require revision
- open final submission
- reveal solution
- open defense

Teacher commands should use the same RuntimeCommand system.

---

# INV-44 Teacher Visibility — OPTIONAL

Teacher can inspect:

- student board
- team board
- evidence collected
- classifications
- hypotheses
- hypothesis history
- confidence changes
- path/progression
- activities
- gate states
- final reasoning

Use summaries for class-level dashboards at production scale.

---

# INV-45 Assessment Dimensions — SHARED

Possible criteria:

- content mastery
- evidence selection
- evidence quality evaluation
- data interpretation
- hypothesis quality
- revision
- reasoning
- counterevidence handling
- final conclusion
- uncertainty
- collaboration
- communication
- reflection

---

# INV-46 Automatically Captured Evidence — CORE

The runtime may automatically retain:

- path
- activities completed
- evidence collected
- classifications
- hypotheses
- revisions
- data/results
- final answer

Avoid asking students to manually resubmit evidence already stored in the project.

---

# INV-47 Visual Investigation Shells — OPTIONAL/THEME

Examples:

- detective case
- laboratory
- medical emergency
- archaeological investigation
- historical case
- disaster command center
- research station
- field investigation
- legal investigation
- intelligence/spy investigation
- generic investigation

Theme must not alter core behavior.

---

# INV-48 Interactive Presentation Plugins — EXTENSION

Potential presentation capabilities:

- card boards
- maps
- timelines
- workstations
- file folders
- evidence lockers
- specimen viewers
- instruments
- dashboards
- SVG tools
- Canvas tools
- Three.js/3D tools

---

# INV-49 Accessibility — CORE

Plan support for:

- keyboard operation
- non-drag alternative
- screen-reader labels
- readable typography
- captions
- transcripts
- alt text
- high contrast
- reduced motion
- audio support
- chunked directions

---

# INV-50 External AI Hooks — FUTURE

Reserve states/events such as:

- `reasoningCheck.requested`
- `reasoningCheck.passed`
- `reasoningCheck.needsRevision`
- `defense.passed`

The Investigation Template should not depend on a specific AI provider.

---

# INV-51 Simulation Integration — EXTENSION

External simulation adapters should be able to return:

- completion
- inputs
- outputs
- score
- evidence produced
- state changes
- resource changes
- attachments

---

# INV-52 LMS Integration — SHARED

Expose/consume shared LMS concepts:

- completion
- mastery
- grade
- submission
- team
- progress
- teacher feedback

---

# INV-53 Allowed Capability Registry — CORE

The LLM project generator receives a registry/list of supported capabilities.

It may only use registered capabilities.

---

# INV-54 Capability Gap — CORE AUTHORING RULE

If a project asks for unsupported behavior, produce:

```text
TEMPLATE_CAPABILITY_GAP

Requested:
...

Reason:
...

Suggested reusable capability:
...
```

Do not silently invent project-specific application code.

---

# INV-55 Branching Investigation — CORE

Different choices may cause different events/endings.

Possible triggers:

- choice
- evidence selection
- hypothesis
- test
- resource use
- state
- NPC interaction
- team decision
- random event

Possible effects:

- evidence
- story events
- NPC availability
- state
- activities
- consequences
- final challenge
- ending/reveal

Use Rules + State + Events.

---

# INV-56 Randomization — CORE

Randomizable elements may include:

- unknown
- suspect
- culprit
- disease
- sample identity
- evidence values
- measurements
- NPC information
- evidence location/order
- available resources
- starting state
- decoys

Scopes:

- class/project
- team
- student

Use deterministic seeds and store the assigned result.

---

# INV-57 Limited Resources — CORE

Generic resources may represent:

- money
- time
- investigation points
- test credits
- interviews
- energy
- equipment
- samples
- personnel
- attempts
- clues
- fuel
- medicine

Operations:

- get
- require
- spend
- add
- set

Production high-stakes resource mutations must be server-authoritative/transactional.

---

# INV-58 Scripted NPCs — CORE BASIC / OPTIONAL

Characters may be:

- witnesses
- scientists
- patients
- suspects
- historical figures
- villagers
- experts
- officers
- researchers
- guides
- merchants
- commanders

NPC configuration may include:

- identity
- avatar
- role
- student bio
- teacher notes
- dialogue nodes
- hidden information
- evidence owned/produced
- rules controlling dialogue
- initial state

NPC consequences occur through shared events/rules/commands.

Do not create a second rules engine for NPCs.

---

# Capability Expansion Rule

When adding a new capability:

1. define a stable capability ID,
2. define configuration schema,
3. define runtime events/conditions/actions if needed,
4. implement behind interfaces/registries,
5. add validation,
6. add tests,
7. document compatibility,
8. verify existing projects still work.
