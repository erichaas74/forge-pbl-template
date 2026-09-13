# Time Repair template contract — 1.0

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
