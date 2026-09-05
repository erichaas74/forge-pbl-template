# Firebase Backend Upgrade Plan

## Status

**Proposed implementation plan -- September 2026**

This plan applies the approved reusable live-activity architecture to Firebase. It
does not make Firebase part of a project template and does not change the current
browser-local Frontier Trading experience. It defines the target backend,
incremental delivery sequence, security model, data layout, and acceptance gates
for a production pilot.

The first production slice should prove one complete trade across two companies.
It should not attempt to migrate every capability at once.

## 1. Decision summary

Use:

- Firebase Authentication, upgraded to Identity Platform if true authentication
  tenants or school SAML/OIDC are required;
- Cloud Firestore in Native mode for memberships, attempts, accounts,
  transactions, events, projections, and idempotency records;
- Cloud Functions for Firebase 2nd gen for authenticated command endpoints,
  scheduled processing, and idempotent background projectors;
- Cloud Storage for Firebase for student uploads and immutable project-package
  payloads that are too large or unsuitable for Firestore documents;
- Firebase App Check as an additional anti-abuse control;
- Firebase Local Emulator Suite for integration, rules, and CI tests;
- separate Firebase projects for development, staging, and production.

Keep all Firebase imports in `src/app/infrastructure/firebase/` and backend
function packages. Core, shared capabilities, templates, and project
configuration continue to depend only on repository-owned contracts.

## 2. Why this fits the existing architecture

The repository already has the correct seams:

| Existing boundary             | Firebase implementation               | Responsibility                                                                       |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| `ProjectPackageSource`        | `FirebaseProjectPackageSource`        | Resolve immutable, versioned package files from Storage/CDN using Firestore metadata |
| `RuntimePersistenceAdapter`   | `FirestoreRuntimePersistenceAdapter`  | Load and save bounded low-risk snapshots with optimistic version checks              |
| `RealtimeAdapter`             | `FirestoreRealtimeAdapter`            | Subscribe to authorized, scoped projection documents and queries                     |
| `AssetStorageAdapter`         | `FirebaseAssetStorageAdapter`         | Upload validated files and return metadata references                                |
| `AuthoritativeCommandGateway` | `FirebaseAuthoritativeCommandGateway` | Call authenticated server functions and reconcile command results                    |
| `ProjectContextService`       | Firebase-backed context bootstrap     | Resolve tenant, class, team, actor, project version, and attempt                     |
| Capability registry           | No Firebase-specific registrations    | Continue advertising product capability availability independently of vendor         |

The `attemptId` that is now part of runtime scope is the database boundary for an
official run. Practice mode can continue without an attempt ID and can continue
to use browser persistence.

## 3. Non-negotiable boundaries

1. Project files remain configuration; they do not import Firebase SDKs.
2. Template and shared capability code depends on core interfaces, not Firestore
   references, snapshots, queries, timestamps, or errors.
3. The browser never decides an official trade, resource spend, award, phase
   transition, final submission, teacher override, or score.
4. The server derives actor identity from the verified authentication token. It
   does not trust actor, role, tenant, class, or team fields sent by the client.
5. Every persisted record is tenant-bound and, where applicable, attempt-bound.
6. Students subscribe only to sanitized projections they are permitted to read.
7. Local adapters remain available for demonstrations, authoring previews, and
   non-official practice.
8. A failed Firebase connection must never silently turn an official operation
   into a local success.

## 4. Target topology

```text
Angular application
  |
  |-- Firebase Auth + App Check
  |
  |-- read: package metadata, safe definitions, scoped projections
  |      through repository adapters
  |
  `-- command: AuthoritativeCommandGateway
          |
          v
     Cloud Functions 2nd gen
       - verify auth and App Check
       - resolve tenant/class/team membership
       - validate command and pinned package versions
       - run short Firestore transaction
       - write result + audit event + outbox atomically
          |
          v
     Firestore trigger workers / scheduled functions
       - consume outbox idempotently
       - update projections
       - process scheduled scenario events
       - emit awards and evidence references
          |
          v
     bounded Firestore projection documents
          |
          v
     FirestoreRealtimeAdapter -> Angular views
```

Static project packages and binary uploads live in Cloud Storage. Firestore stores
their versioned metadata and references, not their binary content.

## 5. Recommended Firestore model

Use a tenant-rooted hierarchy. Tenant IDs in paths are authorization boundaries,
not values accepted blindly from browser commands.

```text
tenants/{tenantId}
  members/{uid}
  classes/{classId}
    members/{uid}
    teams/{teamId}
      members/{uid}
  projectPackages/{projectId__version}
  sessionAttempts/{attemptId}
    participants/{uid}
    teams/{teamId}
    accounts/{accountId}
    quotes/{quoteId}
    offers/{offerId}
    commands/{idempotencyKey}
    operations/{operationId}
    transactions/{transactionId}
    challengeAttempts/{challengeAttemptId}
    scheduledEvents/{scheduledEventId}
    awards/{awardId}
    evidence/{evidenceId}
    auditEvents/{eventId}
    outbox/{outboxId}
    projections/{projectionId}
  assetMetadata/{assetId}
```

This is a logical starting schema. Validate every path against actual read/write
patterns before freezing it. Use Firestore-generated or otherwise scattered IDs
for high-volume records; sequential IDs create hotspot risk.

### 5.1 Record rules

- All records include `schemaVersion`, `tenantId`, `createdAt`, `updatedAt`, and
  the relevant project/version/attempt identity even when the path also conveys
  it. Redundancy supports auditing and validation.
- Money is stored as integer cents. Quantities use explicitly defined integer or
  decimal units; never binary floating-point currency.
- Official timestamps are server timestamps. Countdown state stores lifecycle
  anchors such as `startedAt`, `pausedAt`, and accumulated pause duration; it is
  not rewritten every second.
- Definitions and evaluators are pinned by immutable version or content hash when
  the session attempt is created.
- Transaction, evidence, and audit records are append-only to normal clients.
- Large reports, images, video, and package JSON bundles do not belong in a single
  Firestore document. Firestore documents have a 1 MiB maximum size.

### 5.2 Separate commands, canonical state, and projections

Do not use one giant runtime document.

| Category            | Examples                                               | Write owner                           |
| ------------------- | ------------------------------------------------------ | ------------------------------------- |
| Canonical state     | accounts, inventory, offers, quotes, session lifecycle | Authoritative functions               |
| Command result      | idempotency status, committed IDs, rejection details   | Authoritative functions               |
| Append-only history | transactions, audit events, challenge attempts         | Authoritative functions               |
| Projection          | team HUD, market board, scoreboard, teacher summary    | Projector workers                     |
| Low-risk draft      | notes, rationale drafts, uncommitted planning          | Authorized client adapter or function |
| Immutable content   | package versions and asset references                  | Publishing workflow                   |

The teacher dashboard reads summary projections. It does not open one listener per
student or expose private team records.

## 6. Authoritative trade transaction

The first vertical slice is `exchange.executeTrade` because it proves identity,
membership, transactions, idempotency, two-company accounting, auditing, and
realtime projection.

### 6.1 Request

The Angular gateway sends:

- `attemptId`;
- command name and typed payload;
- client-generated `idempotencyKey`;
- relevant expected versions;
- no trusted actor, role, tenant, score, price, or balance.

### 6.2 Server sequence

1. Verify Firebase ID token and App Check token.
2. Resolve the user's tenant and active memberships from server-owned data.
3. Resolve the attempt and confirm that it is active and pinned to compatible
   project, template, scenario, evaluator, and scoring versions.
4. Check that the actor may act for the source or destination company.
5. Begin a Firestore Admin SDK transaction.
6. Read the idempotency document, session, quote/offer, both relevant account
   records, inventory, and any challenge authorization before issuing writes.
7. If the same idempotency key is already committed, return the stored result.
   If it is reused with a different command hash, reject it.
8. Recompute price, inventory, capacity, balance, expiry, gate result, and limits
   from canonical records.
9. Write both sides of the transfer, transaction receipt, audit event, operation
   result, and an outbox entry in the same transaction.
10. Return accepted or rejected with stable operation and record IDs.

Firestore transactions may retry their function after concurrent edits, so the
transaction callback must have no external side effects and must not mutate
process or UI state. All reads occur before writes. Keep the transaction small and
co-locate Functions with Firestore to reduce latency and contention.

### 6.3 Projection and notification sequence

A Firestore trigger consumes the outbox record and updates bounded public/team
projections. Firebase documents that Firestore-triggered functions may be invoked
more than once and are not ordered. Therefore each worker must:

- use the outbox/event ID as its idempotency key;
- compare source sequence/version before updating a projection;
- tolerate replay and out-of-order arrival;
- mark processing status without assuming exactly-once delivery;
- send notifications only through a deduplicated delivery record.

The canonical transaction succeeds even if a projector is delayed. A repair job
can rebuild a projection from canonical records and bounded event history.

## 7. Runtime adapter behavior

### 7.1 `FirestoreRuntimePersistenceAdapter`

Implement the current `expectedVersion` contract with a Firestore transaction:

- load the bounded runtime record;
- reject a scope identity mismatch;
- compare its numeric version with `expectedVersion`;
- apply repository-owned mutations on the server or in a tightly authorized
  low-risk client path;
- write version + 1 and a server timestamp;
- map Firebase failures into stable `RuntimeError` codes.

This generic adapter is for drafts and normal runtime progress. It must reject
attempts to mutate authoritative collections or protected paths.

### 7.2 `FirestoreRealtimeAdapter`

Map repository `RuntimeChannel` values to an allowlisted channel resolver. Never
construct arbitrary Firestore paths from `topic`.

Recommended topics include:

- `team-dashboard`;
- `market-board`;
- `session-status`;
- `scoreboard-public`;
- `teacher-class-summary`.

Each subscription must be bounded by tenant, attempt, membership, and role. Use
one compact listener where a view needs one projection; do not subscribe to every
raw account or transaction document. Expose connectivity and freshness so UI can
show confirmed, stale, or reconnecting state.

### 7.3 `FirebaseProjectPackageSource`

Published packages remain immutable and versioned. Store a small manifest in
Firestore containing:

- tenant, project, and version;
- template ID/version;
- package schema version;
- status (`draft`, `published`, `retired`);
- content hash;
- student-safe package reference;
- protected teacher package reference;
- publish timestamp and publisher.

Store package payloads in Cloud Storage or a cacheable hosting/CDN path. The
adapter verifies expected hash/version before assembly. Do not deliver protected
teacher files to student clients and then rely on Angular to hide them.

### 7.4 `FirebaseAssetStorageAdapter`

Use tenant/attempt/user scoped object paths and a Firestore metadata record.
Enforce MIME allowlists, maximum size, ownership, and scope in both UI validation
and Storage Security Rules. Consider a post-upload validation/quarantine function
before marking an asset safe for classroom display.

## 8. Authentication and tenant isolation

### 8.1 Recommended identity model

Firebase Authentication identifies the person. Firestore membership records
authorize their current school, class, team, role, and project access.

If schools require separate identity-provider configurations or strong user-pool
separation, use Firebase Authentication with Identity Platform multi-tenancy. The
client must restore the selected auth tenant on reload because Identity Platform
does not persist the auth object's `tenantId` automatically.

Do not put rapidly changing class/team memberships only in custom claims. Tokens
are cached and may remain stale. Claims can carry coarse stable roles or a tenant
hint, while command functions resolve current membership from canonical records.

### 8.2 Security Rules posture

Start with default deny. Permit only explicit reads and the small set of low-risk
writes needed by the active phase.

| Data                                 | Student              | Teacher                 | Server          |
| ------------------------------------ | -------------------- | ----------------------- | --------------- |
| Student-safe published package       | Enrolled read        | Assigned read           | Publish/manage  |
| Teacher package metadata             | Deny                 | Assigned read           | Publish/manage  |
| Own/team projection                  | Scoped read          | Assigned read           | Write           |
| Public scoreboard projection         | Participant read     | Assigned read           | Write           |
| Draft notes/plans                    | Scoped read/write    | Policy-dependent read   | Moderate/manage |
| Accounts, quotes, trades, awards     | Projection read only | Authorized read         | Write           |
| Memberships and roles                | Minimum self read    | Assigned read           | Write           |
| Idempotency, outbox, audit internals | Deny                 | Curated audit view only | Read/write      |

Server SDKs bypass Firestore Security Rules, so Functions must enforce
authorization in application code and run with least-privilege IAM. Rules are not
a substitute for command authorization. Conversely, IAM does not protect direct
web SDK access; both layers are required.

Keep Rules lookups small. Firestore limits document access calls during rule
evaluation and bills reads made by `get()`, `exists()`, or `getAfter()`, including
rejected requests. Add emulator tests for every allow and deny path.

### 8.3 App Check

App Check supplements Authentication and Security Rules by attesting that a
request came from the intended app. It does not identify the user and cannot
replace authorization. Roll it out in metrics/monitoring mode first, then enforce
it for Firestore, Storage, and Functions after legitimate clients are verified.

## 9. Scheduled events, awards, and evidence

Persist a scheduled event record containing its due time, attempt, status,
definition version, and idempotency key. Use a 2nd gen scheduled function as a
dispatcher; it queries a bounded due window and claims each event transactionally.

Do not create a separate Cloud Scheduler job for every classroom event. Use a
small fixed number of dispatcher jobs and durable Firestore records. Processing
must tolerate retry and overlap.

Awards and evidence are consequences of accepted canonical events:

- evaluators run at pinned versions;
- award IDs derive from a deterministic uniqueness key when appropriate;
- evidence stores source transaction/event IDs and evaluator version;
- projection updates are asynchronous and repairable;
- manual teacher overrides create append-only audit records.

## 10. Environment and repository layout

Recommended additions when implementation begins:

```text
forge-pbl-template/
  firebase.json
  .firebaserc.example
  firestore.rules
  firestore.indexes.json
  storage.rules
  functions/
    src/
      commands/
      projectors/
      schedulers/
      authz/
      persistence/
  src/app/infrastructure/firebase/
    auth/
    commands/
    persistence/
    realtime/
    storage/
    packages/
```

Use separate Firebase/Google Cloud projects such as development, staging, and
production. Keep environment mappings explicit. Commit rules, index definitions,
emulator configuration, and non-secret client configuration. Store server secrets
in managed secrets; never commit service-account keys.

The frontend should select adapters through dependency injection or a runtime
environment composition root. Feature code must not branch on `firebase`.

## 11. Migration phases

### Phase 0 -- Architecture spike and cost gate

Deliver:

- Firebase development project and Emulator Suite configuration;
- region decision based on school users, Functions, and Firestore locality;
- initial cost model for reads, writes, listeners, Storage, Functions, Scheduler,
  Auth/Identity Platform, backups, logging, and egress;
- data classification, retention, FERPA/privacy, support, and procurement review;
- a written decision on base Firebase Auth versus Identity Platform multi-tenancy;
- proof that the Angular build can select local or Firebase adapters without a
  template import.

Exit gate: architecture/security review accepts the vendor and projected pilot
cost. No production student data is used.

### Phase 1 -- Identity, context, and rules foundation

Deliver:

- Firebase Auth sign-in;
- canonical tenant/class/team membership records;
- authenticated context bootstrap into `ProjectContextService`;
- deny-by-default Firestore and Storage Rules;
- App Check monitoring;
- local emulator seeds and positive/negative rules tests;
- separate student and teacher package authorization paths.

Exit gate: automated tests prove that a user cannot cross tenant, class, team, or
role boundaries by changing a path, query, payload, or token claim.

### Phase 2 -- Low-risk persistence

Deliver:

- `FirestoreRuntimePersistenceAdapter` for bounded draft/progress records;
- `FirebaseProjectPackageSource` for immutable published packages;
- version-conflict mapping and reconnect UX;
- migration/schema version fields and compatibility readers;
- optional import of explicitly chosen browser-local drafts.

Do not silently upload existing local data. Ask the signed-in user before importing
a compatible draft and never import local balances as official state.

Exit gate: local and Firebase adapters pass the same persistence contract suite.

### Phase 3 -- Realtime projections

Deliver:

- `FirestoreRealtimeAdapter` with allowlisted topics;
- session, team HUD, market board, public scoreboard, and teacher summary
  projections;
- idempotent projector and projection rebuild command;
- stale/reconnecting/confirmed UI states;
- listener-count and read-cost instrumentation.

Exit gate: a 300-user representative load test meets latency and cost budgets
without a raw per-student teacher listener fan-out.

### Phase 4 -- Authoritative two-company trade

Deliver:

- callable or HTTPS `executeTrade` and `reconcileOperation` endpoints;
- Firebase implementation of `AuthoritativeCommandGateway`;
- server-side membership, quote, balance, inventory, capacity, and gate checks;
- atomic double-entry trade, receipt, audit, idempotency, and outbox writes;
- deterministic conflict and duplicate-request tests;
- one Frontier Trading package configured to use the registered exchange,
  resource-account, gate, evidence, and projection contracts.

Exit gate: simultaneous buyers cannot overspend or oversell; retries return the
same result; disconnect/reconnect reconciles without duplicate effects.

### Phase 5 -- Session operations and scheduled consequences

Deliver:

- live session lifecycle and teacher controls;
- durable scenario scheduling and fixed dispatcher jobs;
- challenge gates, awards, evidence, score projections, and audited overrides;
- pause/resume behavior based on authoritative timestamps;
- duplicate and out-of-order trigger tests.

Exit gate: restarting or overlapping Functions cannot duplicate an event, award,
resource spend, or notification.

### Phase 6 -- Pilot, recovery, and production readiness

Deliver:

- staged classroom pilot and adapter feature flags;
- dashboards/alerts for command latency, rejection rate, transaction contention,
  projector lag, rule denials, listener reads, and function retries;
- scheduled backups and/or point-in-time recovery based on approved recovery
  objectives;
- restore drill, export/deletion workflow, retention jobs, and incident runbook;
- capacity and burst tests using representative records and indexes;
- App Check enforcement after monitoring is clean.

Exit gate: security, accessibility, performance, cost, privacy, support, backup,
and restore reviews are signed off before a broad rollout.

## 12. Test strategy

### Contract tests

Run the same adapter suite against in-memory, browser, and Firestore emulator
implementations:

- initialize/load/save;
- expected-version conflicts;
- attempt isolation;
- tenant isolation;
- subscription/unsubscription;
- stable error mapping;
- package hash and version checks.

### Emulator integration tests

Use demo-project IDs so an incomplete emulator setup cannot fall through to live
services. Cover:

- Firestore Rules allow/deny matrix;
- Storage type, size, ownership, and scope rules;
- Auth + Functions membership resolution;
- concurrent trade and resource-spend commands;
- repeated idempotency keys with same and different payload hashes;
- duplicate and reordered outbox delivery;
- scheduler overlap and crash recovery;
- projection rebuild equivalence;
- offline/reconnect reconciliation.

### Production-like tests

In staging, test at least the repository's target scenarios:

1. 300 students open the same immutable package.
2. 100 teams maintain scoped listeners.
3. 200 students submit within several minutes.
4. Two teammates contend for one resource.
5. Multiple companies trade against the same limited offer.
6. A teacher dashboard reads summaries for 150 students.
7. A burst of evidence uploads is validated and projected.

Record p50/p95/p99 latency, Firestore reads/writes, Function instances and retries,
contention failures, projector lag, listener reconnections, Storage traffic, and
estimated cost per class session.

## 13. Data migration and compatibility

The first Firebase release creates new official attempt records; it does not need
to rewrite existing browser-local practice attempts.

For data that is intentionally migrated:

1. export to a versioned neutral JSON format;
2. validate tenant/project/version ownership;
3. transform with a repeatable migration tool;
4. write using server bulk tooling, not the browser;
5. produce counts, checksums, rejects, and an audit record;
6. sample-read through production adapters;
7. keep the source export until acceptance and retention policy permit removal.

All readers support the current schema plus one planned transition version.
Writers emit only the newest version. Backfills are resumable and idempotent.

## 14. Rollout and rollback

Use tenant/class allowlists and adapter configuration, not project-specific forks.

- `local-practice`: browser persistence; no official live claims.
- `firebase-preview`: authenticated Firebase reads and low-risk drafts.
- `firebase-live`: authoritative commands and projections enabled for allowlisted
  classes.

Rollback disables new live session creation and puts active sessions into a clear
read-only/reconciliation state. It must not redirect official commands to local
adapters. Existing canonical records remain readable for recovery and audit.

Database schema deployments, Rules, indexes, Functions, and frontend releases
must be compatible during rolling deployment. Deploy additive changes first,
switch traffic second, and remove old fields only after the compatibility window.

## 15. Operational safeguards

- Avoid a single frequently updated class, market, or scoreboard document. Shard
  or split canonical state and publish bounded summaries.
- Do not index large maps, opaque payloads, report bodies, or timestamps that are
  not queried. Review index fanout before launch.
- Use Firestore-generated IDs for high-volume append-only collections.
- Set explicit query limits and pagination. Security Rules are not query filters.
- Keep Function transaction callbacks short and free of network calls.
- Use structured logs with tenant-safe IDs and no unnecessary student content.
- Alert on unusual rule denials, permission errors, cost/read spikes, repeated
  command retries, projector lag, and contention.
- Configure budgets and billing alerts before enabling a classroom pilot.
- Choose backup/PITR and retention settings explicitly; these features require
  billing and should be included in the cost gate.

## 16. Acceptance criteria

The Firebase upgrade is ready for production pilot only when:

1. no project, template, or shared capability imports a Firebase package;
2. local practice still works without Firebase;
3. every official attempt has a server-issued `attemptId` and pinned versions;
4. cross-tenant, cross-class, cross-team, and cross-role access tests fail closed;
5. high-stakes browser writes are denied by Rules;
6. command Functions re-resolve identity and membership server-side;
7. simultaneous trades preserve double-entry balance and inventory invariants;
8. idempotent retries never duplicate an effect;
9. duplicate or out-of-order background events cannot corrupt projections;
10. students receive only scoped, sanitized realtime projections;
11. teacher dashboards use summaries instead of hundreds of raw listeners;
12. package and database schema versions are explicit and migratable;
13. Rules, indexes, functions, and emulator tests run in CI;
14. monitoring, budgets, backups, restore drills, retention, export, and deletion
    procedures exist;
15. the measured pilot meets documented latency, contention, and per-session cost
    budgets.

## 17. Decisions required before Phase 1

These are product or governance choices, not implementation details:

1. Is one Firebase Auth user pool plus server-owned school membership sufficient,
   or is Identity Platform multi-tenancy required?
2. Which sign-in methods must schools support: Google, Microsoft/OIDC, SAML,
   email/password, or district-provided custom authentication?
3. What region or multi-region satisfies latency, availability, residency, and
   cost requirements?
4. What are retention, export, deletion, legal hold, RPO, and RTO requirements?
5. Can teachers inspect student-private drafts, and under what policy?
6. What are the maximum class, team, session, upload, and event volumes?
7. What is the acceptable backend cost per active class session?

## 18. Official references used for this plan

- [Firestore transactions and batched writes](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Firestore transaction contention and isolation](https://firebase.google.com/docs/firestore/transaction-data-contention)
- [Firestore best practices](https://firebase.google.com/docs/firestore/best-practices)
- [Firestore reads and writes at scale](https://firebase.google.com/docs/firestore/understand-reads-writes-scale)
- [Realtime queries at scale](https://firebase.google.com/docs/firestore/real-time_queries_at_scale)
- [Firestore Security Rules conditions and limits](https://firebase.google.com/docs/firestore/security/rules-conditions)
- [Cloud Firestore trigger delivery behavior](https://firebase.google.com/docs/functions/firestore-events)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Identity Platform multi-tenant authentication](https://docs.cloud.google.com/identity-platform/docs/multi-tenancy-authentication)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Scheduled functions](https://firebase.google.com/docs/functions/schedule-functions)
- [Firestore usage and limits](https://firebase.google.com/docs/firestore/quotas)
- [Firestore disaster recovery planning](https://firebase.google.com/docs/firestore/disaster-recovery)
- [Cloud Storage Security Rules](https://firebase.google.com/docs/storage/security/rules-conditions)

Firebase product behavior, quotas, pricing, and availability can change. Recheck
these primary sources during Phase 0 and again before each production launch.
