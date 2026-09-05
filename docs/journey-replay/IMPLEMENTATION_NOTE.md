# Expedition / Journey Replay Implementation Note

## Delivered phases

This phase implements the defining Journey loop as a reusable Angular 22 template:

```text
step
→ choice
→ choice-specific academic question
→ student text or audio response
→ durable journey record
→ generated replay scene
→ replay timeline
```

The built-in `Race Around the World` configuration proves the loop across five Age of Exploration chapters. Curriculum content remains configuration. The runtime, package loader, map, replay player, and class-map comparison are project-neutral.

## Reusable capabilities

- `livingJourneyMap` uses one latitude/longitude coordinate system for active navigation, replay, and class comparison.
- `journeyChoices` records a selected branch without modifying published project configuration.
- `studentResponses` attaches text, transcript, and optional durable IndexedDB audio metadata to the correct step.
- `journeyReplay` reconstructs scenes from saved choices, evidence, responses, consequences, mastery-evidence tags, and route points.
- `classJourneyMap` draws multiple independent voyage layers over one geographic base.
- `voyageIntersections` detects shared location IDs without flattening team records.

## Runtime and assessment boundaries

Completion and mastery remain separate. Completing a step creates `evidence-collected` mastery records; it does not award a mastery level or grade. The demo stores low-risk draft state in browser storage and audio blobs in IndexedDB through adapters.

When the authenticated Worker API is available, student records are synchronized to D1 with optimistic concurrency and persistent idempotency. Browser storage remains an offline draft cache rather than the authoritative source. Audio is stored in R2 with ownership metadata in D1.

Submission and mastery remain separate from step completion. A completed journey may be submitted as an immutable review snapshot. Only a server-authorized teacher can approve it, request revision, or assign mastery levels. The teacher class map reads a bounded class-summary projection through one polling stream; students cannot request the projection or another student's record.

## Package contract

The `journey-replay` package descriptor requires:

- `project.json`
- `journey.json`
- `map.json`
- `replay.json`

Validation covers manifest/template identity, stable and duplicate IDs, coordinate route geometry, location/route/evidence references, and installed capabilities.

## Reuse audit

- Reused unchanged: shared template registry, project package loader, capability registry, validation service, asset storage contract, and IndexedDB asset adapter.
- Extended generically: local template composition with the `journey-replay` registration.
- Added trusted renderer: `living-journey-map-v1`.
- Core contract changes: none.
- Project-specific code: only the Age of Exploration configuration and catalog entry.

## Authoritative runtime capabilities

- `authoritativeJourneyPersistence` resolves actor identity from workspace-authenticated request headers and ignores client-supplied student identity.
- `journeySubmissionReview` stores immutable submission snapshots, teacher decisions, feedback, and mastery assessments.
- `liveClassJourneyProjection` returns the minimum teacher-facing voyage summary and refreshes every four seconds through one RxJS stream.
- `journeyMediaStorage` writes audio bytes to R2 and searchable ownership metadata to D1.

The first authenticated actor to open a new tenant/project/version/class key creates that class and becomes its teacher. Later authenticated actors join as students. Existing membership roles are never changed by the client. Deployments should retain a private or explicitly scoped Sites access policy.

## Remaining capability gaps

```text
TEMPLATE_CAPABILITY_GAP

Requested:
Provider-backed adaptive question generation and follow-up evaluation.

Reason:
The current LMS architecture explicitly keeps reusable templates independent of a specific AI provider and requires protected server-side mastery authority.

Suggested reusable capability:
An AI reasoning-check adapter that accepts the selected choice, available evidence IDs, grade band, and mastery target; returns a teacher-auditable prompt; and never rewrites the original student response.
```

```text
TEMPLATE_CAPABILITY_GAP

Requested:
Rendered MP4/WebM replay export.

Reason:
Secure class aggregation is now implemented. Video rendering still requires a bounded asynchronous media-rendering service beyond the canonical in-app playback timeline.

Suggested reusable capability:
An optional replay-render adapter operating on the same immutable replay timeline.
```

## Recommended next phase

Add school-managed roster provisioning and explicit class creation/join codes, then connect the existing AI reasoning-check contract and optional replay-render adapter. The live in-app replay remains the canonical playback implementation.
