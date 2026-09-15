# Debate Studio implementation note

## Scope

This revision changes the reusable Debate Studio from a ceremonial single-student sequence into
one asynchronous, faction-versus-faction proceeding. The Roman project is the first configured
use: **The Fate of the Republic**.

The primary loop is now:

```text
hear the last real opponent contribution
-> mark the argument
-> receive the moderator question
-> prepare and rehearse
-> record and review
-> file into the shared record
-> release the next faction turn
```

The chamber presentation now uses two permanent faction rails instead of a collection of floating
navigation buttons. Filed student arguments remain visible as stacked parchment entries on their
faction's side. A newly filed opponent entry opens into the chamber center for playback and
argument marking; the moderator decree then occupies that same center before the student's own
response tablet expands inward from their rail. Evidence remains a secondary drawer, the docket is
a compact expandable marker, and the final filing action seals and sends the contribution directly
across the chamber without a separate scribe destination.

## Reuse audit

- Reused unchanged: standalone routing, route-scoped dependency injection, signal-based UI state,
  the shared Firebase application provider, and the project catalog.
- Extended reusable capability: versioned `DebateSession` state, faction turn dependencies,
  opponent annotations, moderator review/release, recording metadata, broadcast assembly, private
  pre/post opinion, category voting, reflection, persuasion shift, and bounded event history.
- Added infrastructure adapters: Firebase Realtime Database for the authoritative shared session,
  Firebase Storage for audio/video, browser storage for temporary private drafts, and memory
  adapters for deterministic tests.
- Added Roman configuration: question, factions, roles, rounds, evidence, moderator priorities,
  opinion choices, voting categories, faction rail labels, and preview seed contributions. No
  Roman-specific branching exists in the reusable engine or components.
- Added reusable presentation capability: a config-driven faction rail component, left/right rail
  placement, incoming-message state, rail-local replay, current-response state, central decree,
  expandable docket, and an in-chamber scroll-and-seal filing transition.
- Core contract change: Debate Studio schema moved from the local prototype to schema `2.0`. Old
  browser snapshots are intentionally ignored because they cannot be safely interpreted as one
  shared debate.

## Runtime and authority separation

Published debate configuration is read-only. Private draft, rehearsal, and recording-preview state
is saved locally with a key scoped by project, version, session, and student. It is never used as the
authoritative Senate Record.

Shared state lives at:

```text
debateSessions/{projectId}/{projectVersion}/{classId}/{sessionId}
```

All shared mutations pass through `DebateSessionAdapter.mutate`, use a client event ID, execute in a
Realtime Database transaction, and update a revision marker. Media blobs go to Firebase Storage;
only their asset metadata and download reference enter the session. Components never import a
Firebase SDK.

If Firebase cannot authenticate, read the session, commit a transaction, or upload media, the
student is told that official filing is paused. The app keeps the unfiled draft and recording for a
retry. It does not silently substitute a local shared record.

## Current Firebase project state

Read-only verification on 2026-09-04 found:

- Firebase project `livelessondemogames` is active.
- Anonymous Authentication succeeds.
- Existing Realtime Database rules deny the new `debateSessions` namespace, including to an
  authenticated anonymous user.
- The configured `livelessondemogames.firebasestorage.app` bucket does not currently exist.
- Existing database rules protect other live classroom-game namespaces and must be preserved.

The code is wired for Firebase, but real class recording/file exchange will remain paused until the
project receives compatible additive database rules and a Storage bucket/ruleset.

## TEMPLATE_CAPABILITY_GAP

### Faction case building and roster administration

Requested: a Week 1 faction case record with claims, evidence links, anticipated opposing claims,
and student speaking-role assignments.

Gap: this revision concentrates on the requested debate-building page and final showcase. The
configuration defines the five rotating faction roles and the evidence table supports sorting and
pinning, but there is not yet a shared claim board or teacher roster/role-assignment surface.

Recommended reusable capability: add a versioned faction case board and a class roster adapter,
then use assigned roles when authorizing each `DebateTurn` filing.

### Multi-pair teacher orchestration

Requested in the redesign direction: pairing controls and a teacher view capable of supervising
multiple simultaneous faction exchanges.

Gap: this pass applies the requested two-rail chamber to one shared debate session. It does not add
new pairing data, a multi-pair session topology, or a teacher dashboard because those are functional
and authority changes rather than visual substitutions.

Recommended reusable capability: add a teacher-controlled matchup collection whose entries point
to independently versioned `DebateSession` records, with per-pair readiness, stalled-turn alerts,
moderator queues, and explicit reassignment commands.

### Trusted identity and authorization

Requested: enrolled students share one class debate, while only a teacher may approve/release
moderator questions and convene the official premiere.

Gap: Anonymous Authentication supplies a durable device identity but not verified enrollment,
faction assignment, or teacher claims. A broad client-write rule would make the demo work but would
not be appropriate production authorization.

Recommended reusable capability: add an LMS/class-membership identity adapter and a callable
server command gateway. Validate class membership, faction, current-turn ownership, teacher role,
idempotency, and state transition on the server before mutating the shared snapshot.

### Firebase Storage provisioning

Requested: durable student audio/video files.

Gap: the configured project has no Storage bucket. Bucket creation requires an explicit location
and may require a Firebase billing-plan decision. Once provisioned, rules should restrict writes to
the authenticated actor's recording path, require audio/video content types, and cap file size.

### External moderator intelligence

Requested: an AI-proposed question based on the actual debate, with teacher approval.

Implemented now: a deterministic transcript-driven moderator draft that quotes the latest filed
claim, rotates configured clash priorities, explains why it selected the question, and requires
teacher approval/release.

Gap: no external AI provider or teacher-safe server prompt service is installed. The deterministic
draft is dynamic, but it is not represented as an external AI result.

Recommended reusable capability: add a provider-neutral `ModeratorDraftAdapter` behind a trusted
server endpoint, with structured output, transcript minimization, retry handling, and the current
deterministic generator as an explicitly labeled fallback.

### Transcript production and mastery scoring

Requested: recordings save transcripts and later receive teacher/mastery metadata.

Gap: typed turn fields for teacher feedback, argument mastery, historical accuracy, rebuttal quality,
and communication rubric exist, but no speech-to-text or grading service has been installed. The
student-prepared transcript is currently filed with the recording.

Recommended reusable capability: asynchronous transcript and rubric jobs that write only through
the same trusted command boundary and preserve the original student media.

## Recommended next phase

Choose one Firebase operating level before deployment:

1. Classroom prototype: preserve existing rules, add a narrowly scoped authenticated
   `debateSessions` rule, provision Storage, and use teacher preview controls with the documented
   trust limitation.
2. Production classroom: add verified class identity and server-authoritative debate commands first,
   then deploy least-privilege database and storage rules.
