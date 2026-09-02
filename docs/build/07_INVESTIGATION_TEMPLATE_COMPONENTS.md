# Investigation Template Components

## Purpose

Define the actual reusable Angular 22 components/services that make up the Investigation Template.

The template must remain configuration-driven.

---

# 1. Investigation Shell

## `InvestigationShellComponent`

Responsibilities:

- receive resolved Investigation project graph
- resolve current runtime scope/context
- render mission/current phase
- render Case Board
- host activity/phase navigation
- expose final-investigation entry point
- display recoverable template/runtime errors

Must not:

- hardcode project content
- evaluate rules itself
- mutate evidence directly
- contain evidence-type-specific rendering
- know individual simulation implementations

---

# 2. Phase Navigation

## `InvestigationPhaseNavigationComponent`

Inputs:

- phase definitions
- phase runtime statuses
- current phase
- permissions

Displays project-specific names such as:

- Examine the Incident
- Gather Evidence
- Test the Samples
- Evaluate Explanations
- Final Identification

Not hardcoded Week 1/2/3.

Events:

- `phase.openRequested`
- possibly navigation-only local event

Actual unlock/completion state comes from runtime.

---

# 3. Case Board System

## `CaseBoardComponent`

Inputs:

- `CaseBoardConfiguration`
- board runtime
- available evidence
- hypothesis runtime
- permissions

Responsibilities:

- layout
- section hosting
- card routing
- drag/drop
- keyboard movement alternative
- board-local selection state
- meaningful runtime events

---

# 4. `BoardSectionHostComponent`

Resolves section renderer/component by registered section type.

Must not contain one giant `switch` if registry/factory can be used.

Initial section renderers:

- evidence
- notes
- questions
- hypothesis
- data
- confidence
- final claim
- custom placeholder/extension

---

# 5. Board Interaction V1

Implement:

- drag/drop on enabled boards
- save on drop, not pointer movement
- reorder
- card pinning if configured
- add note
- add question
- classify evidence
- select hypothesis
- set confidence
- keyboard/non-drag movement option

Do not implement freeform canvas/corkboard geometry in V1.

---

# 6. Board Accessibility

Required:

- all cards focusable
- move-card action available without dragging
- section labels announced
- status/classification not conveyed by color alone
- clear focus state
- buttons at usable target size
- logical reading/tab order

---

# 7. Evidence System

## `EvidenceService`

Responsibilities:

- retrieve definition
- combine definition + runtime into safe student/teacher view model
- filter teacher-only metadata based on permissions
- return available evidence
- create student evidence through registered creator plugins
- emit evidence events

Must not:

- directly fire unrelated unlock logic
- know every renderer implementation
- expose hidden teacher metadata to students

---

# 8. `EvidenceCardComponent`

Common card wrapper.

Displays:

- title
- evidence-type indicator
- runtime status
- optional small preview
- selected/classified state
- configured actions

Uses registered EvidenceRenderer for content-specific preview/detail.

---

# 9. `EvidenceDetailComponent`

Expanded view.

Potential capabilities:

- content
- source
- image/data/graph view
- notes
- annotation
- classification
- evidence relationships
- cite/use-in-final controls

Teacher mode may expose instructional metadata.

Student mode must not.

---

# 10. Initial Evidence Renderers

V1 should include generic renderers for:

- text
- image
- document/source
- observation
- lab result
- measurement
- data table
- graph/image-based chart
- student note
- uploaded asset reference

Video/audio/map/3D can be later plugins.

---

# 11. Student Evidence Creator

## `StudentEvidenceCreatorComponent`

Uses registered creator plugins.

V1 creator types:

- note
- observation
- measurement
- upload reference
- screenshot/image reference
- data result reference

Configurable required fields:

- title
- description
- source
- unit
- evidence relevance
- connected hypothesis

---

# 12. Evidence Runtime Events

Initial events:

- `evidence.viewed`
- `evidence.collected`
- `evidence.classified`
- `evidence.annotationAdded`
- `evidence.connected`
- `evidence.disconnected`
- `evidence.studentCreated`
- `evidence.usedInClaim`

Avoid logging meaningless repeated viewer events.

---

# 13. Evidence Relationships

## `EvidenceRelationshipService`

Responsibilities:

- create/remove relationship runtime records
- validate registered relationship type
- expose relationships by source/target
- emit relationship events

V1 display:

- relationship list/chips in detail views

V1.5:

- visual connecting lines on Case Board

---

# 14. Hypothesis System

## `HypothesisService`

Responsibilities:

- create hypothesis
- append revision
- attach/detach evidence
- rank
- eliminate/reactivate if allowed
- select current hypothesis
- confidence
- expose history

---

# 15. `HypothesisPanelComponent`

Displays available hypotheses/current hypothesis.

Supports configured mode:

- student-generated
- predefined
- mixed

Supports configured labels:

- Hypothesis
- Diagnosis
- Suspect
- Explanation
- Cause
- Possible Substance
- Proposed Solution

---

# 16. `HypothesisCardComponent`

Displays:

- statement/label
- selected state
- confidence
- evidence count
- rank
- eliminated state
- revision indicator

Emits shared runtime events.

---

# 17. `HypothesisHistoryComponent`

Shows revision timeline.

Example:

```text
Initial hypothesis
↓
Evidence collected
↓
Revision
↓
Additional evidence
↓
Final conclusion
```

Must use stored revision history.

Do not fabricate causal links unless runtime/event data supports them.

---

# 18. Confidence Control

Reusable `ConfidenceControlComponent`.

Modes:

- low/medium/high
- 1–5
- percentage

May apply to:

- evidence
- hypotheses
- final conclusion

---

# 19. Investigation State Service

## `InvestigationStateService`

Thin Investigation-specific facade over core runtime state.

Provides convenient definition/runtime lookup.

It should not create a second state store.

Operations ultimately become shared RuntimeEvents/Commands.

---

# 20. Resource System

## `InvestigationResourceService`

Responsibilities:

- read configured resource definitions
- read runtime amount
- request spend/add/set operations
- expose transactional-authority requirement

## `ResourceMeterComponent`

Displays:

- label
- amount
- unit
- shared mode
- optional warning threshold

Examples:

- Lab Credits
- Interviews Remaining
- Time Units
- Budget

---

# 21. Randomization Service

## `RandomizationService`

Responsibilities:

- accept RandomizationDefinition + RuntimeScope
- calculate deterministic seed
- generate result
- return/store assignment request
- detect existing assignment and reuse it

Do not reroll on reload.

---

# 22. Scripted NPC System

## `NpcService`

Responsibilities:

- load NPC definitions
- determine dialogue availability through rules/runtime
- return dialogue runtime state
- create NPC interaction events

NPC does not directly create state/evidence; it emits events or defined outputs that are handled by runtime/rules.

---

# 23. `NpcDialogueComponent`

V1 UI:

- avatar/image if configured
- name/role
- available student questions
- locked questions with appropriate accessible state
- scripted response
- evidence gained indicator if runtime confirms it

No AI text generation in V1.

---

# 24. Activity Integration

## Shared `ActivityHostComponent`

Investigation uses the shared activity host.

## `InvestigationActivityAdapter`

Responsibilities:

- receive ActivityResult
- translate meaningful results into RuntimeEvents
- associate evidence/state/resource output metadata
- avoid direct component-to-component mutations

---

# 25. Initial Investigation-Compatible Activity Plugins

V1 can include generic/simple examples:

- choice/decision
- observation
- measurement
- data entry
- source analysis
- scripted interview
- upload
- simple local simulation fixture

Do not build a large chemistry simulation until core template behavior is proven.

---

# 26. Final Investigation

## `FinalInvestigationComponent`

Reads `FinalSubmissionDefinition`.

Renders registered final-section components.

Possible initial section renderers:

- identification
- claim
- evidence
- reasoning
- counterevidence
- alternative explanation
- confidence
- uncertainty
- recommendation
- reflection
- individual contribution

---

# 27. `EvidencePickerComponent`

Inputs:

- collected/eligible evidence
- selected evidence IDs
- minimum/maximum rules
- permissions

Output:

- selected evidence IDs

Do not duplicate evidence content into final submission if stable references are sufficient.

---

# 28. `SolutionRevealComponent`

Supports configured modes:

- after individual submission
- after team submission
- teacher-controlled
- after-defense hook
- none

Do not assume every project has a single exact answer.

---

# 29. Team Investigation Adapter

## `TeamInvestigationService`

Coordinates:

- shared team board scope
- private student reasoning scope
- evidence distribution
- role-specific configuration
- team hypothesis/final claim when configured

Do not duplicate the entire Investigation runtime for team mode.

Use scope-aware shared services.

---

# 30. Teacher Control Service

## `TeacherInvestigationService`

Creates RuntimeCommands using the same command system.

Initial V1 test controls may include:

- release evidence
- hide evidence
- unlock activity
- override gate
- set state
- add/remove resource
- open phase
- require revision
- open final submission
- reveal solution

V1 UI may be intentionally plain.

Behavior matters before polish.

---

# 31. Teacher Inspection View V1

Optional/basic:

- current phase
- evidence statuses
- current hypothesis
- resource amounts
- rule/gate state
- runtime errors

Do not build class-scale teacher dashboard yet.

---

# 32. Component Registry

Template should register:

- board section components
- evidence renderers
- evidence creator plugins
- final-section components
- activity plugins
- NPC renderer/type if needed

The Investigation shell should resolve through registries.

---

# 33. Performance Requirements

Case Board:

- drag updates locally
- persist once on drop
- do not re-render entire board unnecessarily
- use stable track/identity keys

Text editing:

- local state
- debounce save
- explicit submission path

Evidence:

- lazy-load detail content/assets when practical
- do not load all large evidence assets immediately

---

# 34. Component Testing

Required tests include:

## Case Board
- configured sections render
- drag/move event
- keyboard move
- forbidden section rejection
- teacher-only data not displayed

## Evidence
- renderer resolution
- unknown renderer safe failure
- runtime status display
- student evidence creation

## Hypothesis
- create
- revise
- history preserved
- attach evidence
- rank/eliminate

## Resource
- amount rendering
- insufficient spend request

## NPC
- available dialogue
- locked dialogue
- question emits event

## Final Investigation
- correct configured sections
- evidence picker
- multiple-defensible mode does not require exact answer

---

# 35. Reuse Requirement

No Investigation component may contain:

- `MysterySubstance`
- `FossilDetectives`
- project title checks
- chemistry-only assumptions
- history-only assumptions

Those belong in configuration/plugins.

---

# 36. Acceptance Criteria

The Investigation Template component phase passes when:

1. a fixture Investigation renders from configuration,
2. sections are registry-resolved,
3. evidence is renderer-resolved,
4. student can classify evidence,
5. student can create/revise hypothesis,
6. history persists in runtime,
7. limited resource can be displayed/used through runtime,
8. scripted NPC emits runtime events,
9. final Investigation references collected evidence,
10. no project-specific component is required.

---

# 37. Student Device and Age Requirements

Student UI targets browser-based Chromebooks, Windows/Mac laptops, and modern
tablets where practical. Initial learners are approximately grades 4–8, ages
9–14. Use readable typography, touch-friendly targets, chunked instructions,
progressive disclosure, and avoid unnecessarily text-heavy pages.

Target WCAG 2.2 AA where practical. Keyboard operation, visible focus,
screen-reader names, semantic controls, captions/transcripts, alt text,
sufficient contrast, reduced-motion support, and a non-drag Case Board workflow
are required behaviors rather than optional polish.

---

# 38. Pending and Authoritative UI State

Temporary connection loss must not silently convert optimistic state into
confirmed state. Components should distinguish local draft, queued/pending,
confirmed, rejected, and conflict states where applicable.

High-stakes resource, attempt, mastery, grading, final-submission, and teacher
operations must wait for authoritative confirmation. Low-risk drafts and board
organization may use optimistic behavior and predictable last-valid-write
conflict resolution.
