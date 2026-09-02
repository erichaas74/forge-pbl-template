# Scale and Persistence Architecture

## Purpose

Define production-oriented runtime constraints for a school using the LMS at approximately:

- 500 students
- 2 active projects per student
- roughly 1,000 active student-project memberships
- several hundred concurrent sessions

V1 may use mock/local adapters, but all contracts and data boundaries must support this production scale without a fundamental rewrite.

The production posture is cloud-first and browser-based, with tolerance for
temporary connection loss. Full offline operation and school-hosted deployment
are not V1 goals. Backend vendor selection remains intentionally deferred.

---

# 1. Main Scale Principle

The expensive part is not the number of project definitions.

The expensive parts are:

- runtime writes
- realtime subscriptions
- file uploads
- simulation trials
- teacher dashboards
- team concurrency

Design these intentionally from the beginning.

---

# 2. One Project Definition, Many Runtimes

Do not copy project configuration for every student.

Use:

```text
1 immutable project definition/version
        ↓
many student/team runtime records
```

Example:

`mystery-substance@1.2`

is loaded/cached once per client/session as needed.

Students store only runtime state referencing that project/version.

---

# 3. Project Definitions

Published project definitions should be:

- immutable
- versioned
- cacheable
- read-heavy
- rarely changed
- CDN/static-storage friendly

Do not store live student progress inside project package files.

---

# 4. Runtime Data Categories

Separate runtime concerns.

Recommended logical records:

- enrollment/project assignment
- student-private runtime
- team-shared runtime
- activity/submission runtime
- simulation trials
- teacher overrides
- file/asset references
- event/audit records
- aggregate summaries

Avoid one enormous student-project document containing everything.

---

# 5. Why Not One Giant Runtime Record

A giant record creates:

- unnecessary large reads
- write conflicts
- team concurrency problems
- difficult realtime subscriptions
- high write amplification
- harder migrations
- harder partial updates

Use bounded records with clear ownership/scopes.

---

# 6. Runtime Scope

Recommended scopes:

## Student-private
Examples:

- private hypothesis
- personal reflection
- mastery
- personal notes
- individual contribution

## Team-shared
Examples:

- shared Case Board
- team evidence
- team resources
- shared hypothesis
- team final product

## Class/project summary
Examples:

- teacher announcements
- leaderboard summary
- class progress aggregates

---

# 7. Realtime Subscription Boundaries

Student normally subscribes to:

- their private runtime
- their current team's shared runtime
- relevant announcements

Do not subscribe a student to all 500 students in a project.

---

# 8. Teacher Realtime

Teacher class dashboard should not open hundreds of raw runtime subscriptions.

Instead use aggregate/projection records:

- student progress summary
- team progress summary
- project/class summary
- grading queue
- mastery summary

Detailed student/team runtime loads when teacher opens that record.

---

# 9. Summary Projector

Production backend should update small summary records from meaningful events.

Examples:

```text
activity.completed
→ student progress summary

finalSubmission.submitted
→ grading queue

mastery.met
→ mastery summary

team resource reaches zero
→ team status summary
```

Dashboard reads summaries.

---

# 10. Write Amplification Rules

Do not persist every UI movement.

## Drag/drop

Bad:

write every pointer position.

Good:

move locally, save once when dropped.

## Text

Bad:

save each keystroke.

Good:

local draft + debounce + blur/navigation/manual save.

## Simulation

Bad:

save every frame/slider movement.

Good:

save completed TrialResult.

## Evidence viewer

Bad:

write every second.

Good:

write first meaningful view/collection/classification event.

---

# 11. Autosave Strategy

Recommended conceptual behavior:

- immediate local UI update
- debounce persistent text save by a few seconds
- save on blur
- save on route/navigation change
- explicit Save where useful
- final submit always authoritative

Exact debounce duration may be tuned after testing.

---

# 12. Simulation Trial Storage

Store bounded trial records:

```ts
interface SimulationTrialRecord {
  projectId: string;
  projectVersion: string;
  activityId: string;
  studentId?: string;
  teamId?: string;
  trialId: string;
  startedAt?: string;
  completedAt: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  score?: number;
  official?: boolean;
}
```

Do not store animation frames unless a specific simulation requires replay and a specialized compressed format is intentionally designed.

---

# 13. Official Attempts

Official/final attempts require server-authoritative handling.

Need protection against:

- double-click
- retry
- race condition
- offline duplicate
- two teammates submitting simultaneously

Use:

- idempotency key
- transaction
- attempt counter
- server timestamp
- project version

---

# 14. Limited Resources

Team resource spending must be transactional.

Example:

Team has 1 Lab Credit.

Two teammates simultaneously request separate tests.

Only one spend should succeed.

The second receives:

`INSUFFICIENT_RESOURCE` or conflict result.

Do not trust client amount alone.

---

# 15. Random Assignment

Randomized case assignment should be authoritative and persistent.

Store:

- definition ID
- scope
- seed
- result
- project version
- assigned timestamp

Reload reuses assignment.

---

# 16. Runtime Versioning

Each runtime snapshot/aggregate record should support versioning or equivalent concurrency metadata.

Example:

```ts
{
  "version": 14,
  "lastUpdated": "..."
}
```

Client sends expected version for mutation when appropriate.

Conflict strategy:

- low-risk state can merge/retry
- high-stakes transaction re-evaluates server-side
- server state wins

---

# 17. Idempotency Storage

Production persistence should retain processed idempotency keys long enough to protect retry windows.

Key includes context such as:

- user/team
- project/version
- clientEventId

Duplicate request should not double-apply.

---

# 18. File Uploads

Do not store image/video/PDF binary data inside runtime database records.

Use object/file storage.

Database/runtime stores:

- asset ID
- storage path/reference
- MIME/type
- size
- owner/scope
- project/activity reference
- created timestamp
- optional thumbnail/reference

---

# 19. Upload Limits

Production should define configurable:

- maximum file size
- allowed file types
- image/video limits
- per-project quotas if needed

Validation should happen client-side for UX and server-side for authority.

---

# 20. Project Content Assets

Static project assets can be stored separately from student uploads.

Prefer CDN/cacheable delivery.

Examples:

- banners
- evidence images
- diagrams
- lesson videos
- icons

---

# 21. Project Definition Cache

Client cache key:

`tenantId + projectId + projectVersion`

An explicitly public/global immutable content cache may deduplicate payloads
internally, but authorization and tenant-visible references still remain
tenant-bound.

Do not refetch all project JSON files on every route change.

Loader should produce a cached in-memory graph for active project.

Future browser cache/Service Worker strategy may be added later.

---

# 22. Offline/Connection Interruptions

Online school students may have unstable connections.

Low-risk operations can queue locally:

- note draft
- board movement
- draft hypothesis
- non-graded annotation

High-stakes operations require server confirmation:

- official attempt
- resource spend
- final submission
- mastery result
- teacher override

UI should clearly distinguish pending vs confirmed state when offline support is implemented.

---

# 23. Event Log

Store meaningful events for:

- debugging
- student thinking history
- teacher inspection
- summary projections

Do not log every UI event.

Examples worth logging:

- evidence collected
- evidence classified
- hypothesis created/revised
- activity completed
- official trial
- resource transaction
- phase completed
- final submission
- teacher override

---

# 24. Snapshot + Event History

Use:

```text
current snapshot
+
bounded/important event history
```

Do not require full replay of all historical events for every load.

---

# 25. Hypothesis History Storage

Hypothesis revisions are meaningful academic evidence and should be persisted.

Store append-only revision records or an equivalent bounded structure.

Do not lose earlier reasoning.

---

# 26. Team Board Synchronization

Realtime team updates should transmit compact mutations/deltas.

Examples:

- card moved to section
- note added
- evidence classified
- shared hypothesis updated

Do not rebroadcast entire Case Board state for every small change if backend supports patch/delta semantics.

---

# 27. Teacher Override Audit

Teacher override record should include:

- teacher ID
- project/version
- target scope
- command
- timestamp
- reason if supplied

This supports debugging and accountability.

---

# 28. Backend Adapter Boundary

Investigation/core code should only depend on interfaces.

Future implementations may include:

- Firebase adapter
- Supabase adapter
- custom API adapter

Do not couple template services to vendor-specific query types.

---

# 29. Production Persistence Concerns

The eventual backend evaluation should consider:

- transaction support
- realtime subscriptions
- auth integration
- object storage
- query/index limits
- per-operation pricing
- server functions/workers
- backups
- FERPA/security requirements
- observability

This specification intentionally does not force the vendor choice yet.

---

# 30. Data Access Patterns to Optimize

Main read patterns:

## Student
- active project manifest
- project definition graph
- private runtime
- team runtime
- current activities/evidence
- returned feedback

## Teacher
- class summary
- team summaries
- grading queue
- selected student runtime
- selected team runtime

Design indexes/queries around these patterns later.

---

# 31. Avoid N+1 Reads

Do not design components that individually query backend for every evidence card/activity.

The project definition graph and runtime snapshot should supply most view data in bounded reads.

---

# 32. Batching

Where backend supports it, batch compatible low-risk writes.

Examples:

- several board changes after short debounce
- grouped summary updates
- evidence annotation + status update

Do not batch high-stakes operations in a way that hides transactional semantics.

---

# 33. Security/Authority Model

Production must enforce authorization server-side.

Client-hidden teacher metadata is not secure merely because Angular does not display it.

Sensitive teacher-only project metadata should be delivered through appropriate protected paths or filtered server-side if necessary.

Design project packaging with this future distinction in mind.

---

# 34. Teacher-Only Data Caution

Evidence teacher metadata may include solution clues.

For a prototype, one combined package may be acceptable.

For production, consider separating:

- student-safe project definition
- teacher/admin metadata

or server-side filtering.

Do not assume client-side hiding prevents a motivated student from inspecting network payloads.

---

# 35. Authentication Scope

Not implemented in V1 engine phase.

Future auth must resolve:

- tenant/school membership
- user
- role
- class membership
- team membership
- project enrollment
- curriculum/admin permissions

Project components consume context/permissions, not authentication vendor APIs.

---

# 36. Estimated Concurrent Use

Design comfortably for:

- several hundred concurrent logged-in users
- dozens to hundreds of teams
- bursts when classes start/submit simultaneously
- repeated simulation trials
- evidence uploads

Do not use project-global broadcast state by default.

---

# 37. Performance Test Scenarios Later

Create load/performance scenarios such as:

1. 300 students opening same project definition.
2. 100 teams updating Case Boards.
3. 200 students submitting an activity within several minutes.
4. 100 simulation trials completing in a short burst.
5. teacher loading class summary for 150 students.
6. team resource transaction conflict.
7. large evidence image/upload burst.

---

# 38. Production Monitoring

Track operational metrics such as:

- request latency
- failed runtime mutations
- transaction conflicts
- upload failures
- realtime connection count
- duplicate/idempotent retries
- rule evaluation errors
- unsupported capability errors

Avoid storing unnecessary student content in infrastructure logs.

---

# 39. Data Retention

Define later with school policy:

- runtime retention
- event history retention
- student uploads
- submitted final products
- teacher feedback
- archived project versions

Architecture should allow archival without deleting shared project definitions unexpectedly.

---

# 40. Acceptance Criteria for Architecture

Before selecting/implementing production backend, verify:

1. all persistence is behind adapters,
2. project definitions are separate from runtime,
3. student/team scope separation exists,
4. high-stakes operations are identifiable,
5. idempotency is part of contracts,
6. simulation persistence is trial-level,
7. teacher dashboard can rely on summaries,
8. file uploads use asset references,
9. project definitions are versioned/cacheable,
10. no Investigation component directly imports backend vendor APIs.

---

# 41. Tenant Isolation Acceptance Criteria

Before production backend selection, also verify:

1. every runtime, event, mutation, subscription, idempotency record, asset, and
   analytics record is tenant-keyed,
2. authorization checks tenant, enrollment, class/team membership, and role,
3. cross-tenant cache and realtime collisions have tests,
4. students cannot query raw whole-class runtime state,
5. protected teacher/admin project data is server-filtered or separately
   delivered,
6. operational logs minimize student content and include tenant-safe metadata,
7. retention/export/deletion can be governed by school policy.
