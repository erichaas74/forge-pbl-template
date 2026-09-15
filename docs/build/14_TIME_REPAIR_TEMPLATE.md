# Time Repair template contract — 1.0 and 1.1

The current catalog project uses the **1.1 invention-rescue variant** described
below. The 1.0 contract remains for existing packages and saved work. Its older
presentation and authoring sections do not override the standing
[Project activity rules](../PROJECT_ACTIVITY_RULES.md).

## Invention-rescue capability — 1.1, 2026-09-15

The current project, **Time Repair: The Press That Never Printed**, is project
version `2.1.0`. Its package is
`public/projects/exploration-time-repair/versions/2.1.0/project.json`.
The original `project.json` and an archived 1.0 lesson plan remain available;
previous assessed and preview records are not migrated into invention practice.

Version 2.1 adds six registered `invention-knowledge.*` capabilities through
validated `mode: knowledge` session configurations (extension version `1.0`).
They model reconstruction, assembly, diagram testing, apprentice demonstrations,
distribution, and access. Their event replay, scoped persistence, renderer registry,
Phaser/SVG responsibilities, and verification are described in
[the knowledge build contract](../time-repair/KNOWLEDGE_BUILD.md).
The 2.0 package and archived lesson plan remain available. All testing navigation
stays open, including travel to the final courtyard before repair.

`requireTimeRepairPackage` dispatches between validated package variants.
`inventionRescue.version: 1.0` requires template `time-repair:1.1` and installed
capability `invention-repair.printing-press`. The canonical models, validation,
pure engine, persistence interface, scoped browser adapter, and UI are in
`src/app/templates/time-repair/invention/`. Unknown capabilities, unsolvable
setups, unsupported modes, malformed values, and broken source references fail
validation. Validated content is cloned and deeply frozen.

Configuration owns historical notes, fictional premise, sources, ink properties,
four weekly goals, eight session tasks/modes, initial faults, specimen words, and
required batch sizes. The engine models mirrored type order, material adhesion,
pressure, regional packing, proof quality, and a small production chain. Its
coefficients and turn counts are explicitly qualitative teaching models. This
capability models a printing press; another invention requires its own registered
mechanism rather than reskinning the press or introducing project-ID branches.

Registered extension events are `inventionRepair.pressPrepared`,
`inventionRepair.proofPulled`, `inventionRepair.materialTested`, and
`inventionRepair.productionAdvanced`. The reference mode requires ink and paper
preparation. A sheet without ink prints blank. Other diagnostic modes prepare the
press automatically so learners can concentrate on the selected fault. Proofs
retain the exact settings used; failed proofs reset the consecutive good batch.
The return scene can supply each usable proof only once. Binding and delivery
consume available work, preventing duplicate output.

Session state is isolated by tenant, project/version, class, actor, team, attempt,
and session. The browser adapter uses `ScopedBrowserStore` under
`invention-repair.v1`, validates reloads by event replay, limits each session to
400 events, and retains bounded proof/sample history. In-memory session visits
preserve practice when storage is unavailable. Settings save after discrete
changes. Example mode starts from configured prepared work and never reads or
writes learner notebooks. This is local practice, with no grading, shared team
authority, or connected AI Tutor.

The opt-in shared `activity-first` lesson presentation supplies one compact
header/nav and a tiny expandable curriculum row. No Grade 7 standards mapping is
claimed without a supplied crosswalk. The main activity contains one illustrated
scene with semantic object controls, keyboard type swaps, a modal proof lens,
and reduced-motion support. Weekly task and disconnected tutor disclosures stay
together in the side column, in that order at every breakpoint. Notes, sources,
travel, and exports live there. No text-entry fields or extra content bands are
added to the activity.

See [the eight-session audit and implementation handoff](../time-repair/INVENTION_RESCUE_AUDIT.md)
for changes, verification, limits, and review priorities.

## Legacy 1.0 contract

Time Repair is a registered, configuration-driven template for evidence-backed
historical or literary sequence repair. The initial requested scope is one
complete investigation/defense/scene/repair/ripple/verification loop.

## Package and version contract

- Template ID: `time-repair`; template version: `1.0`; schema version: `1.0`.
- Required package file: `project.json`. No placeholder capability files.
- Published identity: `projectId` + `projectVersion`.
- Canonical interfaces: `src/app/templates/time-repair/domain/time-repair.models.ts`.
- Boundary validation: `requireTimeRepairConfig`. Invalid packages return
  structured `INVALID_TIME_REPAIR_PACKAGE` issues from the package adapter.
- The validated configuration is cloned and deeply frozen.

The optional-template registration is additive. No existing project manifest,
RuntimeEvent, ProjectSessionContext, or package-source contract changes.

## Configuration/runtime separation

Configuration supplies ordered event nodes, source cards, missions, fixed-camera
scene views/hotspots, repair options, prerequisites, evidence requirements,
defense prompts, downstream ripple pairs and settings. History and literature
use these identical structures. Installed repair IDs are `replace-object` and
`restore-sequence`; unknown required IDs are rejected, never substituted.

Runtime state stores collected source IDs, student-created evidence links,
defense revisions, authorization, scene entry, inspections, repair attempts,
source-cited verification, a version counter and bounded meaningful event history.
Stability and remaining charges are derived, not separately mutable counters.

## Events and transitions

The EventRegistry installs:

- `timeRepair.evidenceCollected`
- `timeRepair.evidenceConnected`
- `timeRepair.defenseRequested`
- `timeRepair.jumpRequested`
- `timeRepair.objectInspected`
- `timeRepair.repairRequested`
- `timeRepair.verificationSubmitted`

Capability action handlers reject out-of-order actions. A defense requires
collected/connected sources, configured classification and source conclusion,
and complete writing fields. Repair additionally requires authorization, scene
entry, target inspection and an available charge. Wrong interventions consume a
charge and lower stability; duplicate client event IDs never spend twice. A
successful repair updates downstream node presentation. Verification is a
separate, evidence-cited explanation and does not automatically award mastery.

Prerequisites are acyclic and ripple edges point forward. Shared downstream
nodes remain affected until all their originating repairs are applied.

## Persistence and authority

The Angular runtime depends on a TimeRepairPersistence interface. The local
browser adapter reuses ScopedBrowserStore with tenant, project/version, class,
actor, team and attempt scope; version conflicts prevent stale local-tab writes.
Its saved state is validated by replaying at most 1,000 actions against the same
definition. This is a prototype adapter, not a cross-tab transactional backend.

The local launcher and runtime reject server-authoritative sessions. Classroom
authority, shared team synchronization, teacher permissions, answer-key filtering,
AI reasoning review, official grading and final-competition transactions require
adapters before classroom release. A local evidence checkpoint is not AI grading.

## Student presentation

The timeline is the hub. Source investigation, a compact evidence board, scene
inspection and ripple verification appear within the current workspace. New
regions receive logical focus. Timeline and inspection controls are semantic
buttons, camera views have pressed state, forms have labels, and reduced motion
is respected. Color supplements explicit status text. The scene has a numbered
non-spatial inspection list and requires no dragging.

Implementation details, file inventory, tests, sources, deviations and next phase
are recorded in [the implementation note](../time-repair/IMPLEMENTATION.md).

## Optional weekly authoring capability — 2026-09-14

`time-repair.week-workspace` is configured by the optional `previewWeeks` object
(extension version `1.0`). Its canonical contracts and reference validation are
`time-repair-preview.models.ts` and `time-repair-preview.validation.ts`.
It requires four weeks of two sessions, known session renderer modes, valid
mission/node/source references, local illustrations, and editable sample exhibit
panels. Absence preserves the existing assessed presentation. Unknown modes or
invalid references fail package validation.

Only configured `mode: preview`, `authorityMode: localDemo` sessions use the new
workspace. Inspect, repair, sequence, sources, ripple, compare, exhibit, and tour
modes reuse the template's content and repair evaluator. Pure ordering and
chronology functions provide mechanical model feedback. Preview trials and
authoring drafts use a separate scoped persistence adapter and a bounded history
of 30 trials per session. Text updates remain local until blur, navigation, or
export. Untouched sessions get sample content; empty edited captions remain empty.
Preview actions never emit assessed events, authorize a jump, spend assessed
charges, or submit verification. Authoring configuration is excluded from the
assessed persistence fingerprint so previous records remain readable.

`final-demo` supplies a read-only example token and always reads sample
configuration rather than saved user drafts. The lesson host stays unchanged.
Connected tutoring, model control integration, review, and shared editing remain
future capabilities. See [the weekly handoff](../time-repair/INTERACTIVE_WEEK_REDESIGN.md).
