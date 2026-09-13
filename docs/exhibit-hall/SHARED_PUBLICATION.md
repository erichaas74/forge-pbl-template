# Shared museum publication

This build adds the server publication path for assigned student rooms. The existing localhost project remains a local preview. A host-provided `serverAuthoritative` session now selects an HTTP publication adapter and waits for the server to confirm the student's assignment before rendering the room.

## Student behavior

Students retain the same fixed room, approved artifacts, label fields, preview, and submit button. During submission, editing and repeated clicks are disabled. A successful server receipt makes the room read-only. A failed request preserves the editable draft; the next attempt first checks whether the previous submission actually succeeded. Opening the room on another device restores the submitted snapshot from the server.

Drafts still save on the student's device. This phase shares **submitted rooms**, not unfinished drafts or live co-editing. A confirmed server submission remains submitted even if caching it on the device fails.

The final visitor loads a class's published room collection only when the student enters the museum. Refresh retrieves newly published rooms; there is no class-wide subscription while editing. Only the active room's 3D scene is instantiated. An empty shared collection stays empty and never falls back to the completed sample rooms. The teacher-controlled `collection_open` record gates the final museum; changing this record belongs to the administrative host, not a new designer UI.

## Contracts and endpoints

`MuseumPublicationAdapter` is a template-owned contract. `HttpMuseumPublicationAdapter` is its infrastructure implementation; Angular components contain no vendor SDK calls. The `sharedMuseumPublication` capability is registered in the existing Exhibit Hall capability pack.

The scope is the tuple `tenantId, classId, projectId, projectVersion, museumId`, encoded without delimiter collisions. `museumId` comes from the class-wide project instance. A student's private attempt ID still scopes the local draft, but does not split the shared museum.

| Endpoint                       | Behavior                                                                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/museum/session`      | Requires existing membership and returns the actor's assigned room, current lock, and their submitted snapshot if present.                                                                   |
| `POST /api/museum/submissions` | Validates bounded label content and approved display/object references, then atomically checks the current assignment, student role, and submission lock while inserting the immutable room. |
| `GET /api/museum/collection`   | Requires membership and an open class museum; returns only submitted room snapshots, capped at 500.                                                                                          |

GET requests use the scope as query parameters. POST accepts `{ scope, operationId, content }`. Content contains room/layout IDs, title, introduction, and up to three display records with object ID and label text. It does not accept actor identity, role, source credit, model URLs, room geometry, or curator identity as authority. Those are resolved from server-owned membership, assignment, and versioned catalog records.

The server records submission time. The room row stores the operation ID, content hash, actor audit ID, and immutable receipt together. A retry returns the original receipt when its key and canonical contents match; changed contents or a competing submission conflict. There is no separate idempotency claim that could be left incomplete by a crash. Private actor audit IDs are omitted from the visitor response. Publication does not claim to deliver a gradebook result.

## Database and setup boundary

The additive migration is `drizzle/0001_skinny_doctor_octopus.sql`; its Drizzle source is `db/museum.schema.ts`. It adds four bounded tables: museum classes, assignments, memberships, and publications. Existing Journey tables are unchanged.

`museumProvisioningStatements(plan)` creates parameterized statements for a trusted administrative host. Its input is a class scope plus room assignments, each with a stable team ID, curator display name, and authenticated actor IDs. It rejects duplicate rooms, teams, and actors. Apply the returned statements as one transaction when provisioning a **new** class museum. The statements deliberately fail on existing records rather than overwriting enrollments or published rooms. New museums start closed to visitors. Individual work uses a one-member team. Room IDs and layout IDs must match the versioned server policy; the browser host's team ID must match the provisioned membership.

The existing Worker entry point routes the new API alongside Journey. The route fails closed unless `MUSEUM_AUTH_MODE` is explicitly set to `trusted-ingress`. Enable that only behind an ingress that authenticates the user and strips/replaces caller-supplied `oai-authenticated-user-*` headers. The flag itself is **not** authentication. The Worker's origin must not be reachable through an unverified alternative path.

No production schema, enrollment records, access rules, or deployment settings were changed remotely. The repository's Firebase App Hosting configuration does not automatically deploy this Worker or route its API. The deployment host must supply the existing `DB` binding, apply the migration, route `/api/museum`, establish trusted identity, provision the roster, and supply matching authenticated `ProjectSessionContext` values. The local preview does not silently turn into a network classroom or create enrollments.

## Changes and reuse

Added:

- `rooms/museum-publication.ts` and `museum-publication.service.ts`: bounded public contracts and network coordination.
- `infrastructure/exhibit-hall/`: HTTP adapter and contract/launch tests.
- `server/museum/`: policy normalization, atomic SQL repository, HTTP handler, provisioning helper, and SQLite integration tests.
- `server/config/museum-project-policies.ts`: versioned curriculum registration outside the generic handler.
- `db/museum.schema.ts` and generated migration/snapshot metadata.

Modified:

- Exhibit runtime: pending-publication edit lock and acceptance of validated server receipts.
- Student workspace and walkthrough: connection/retry/submission states and shared collection input.
- Exhibit launcher, tokens and capability registration: host-selected HTTP integration and shared class identity.
- Worker route and database schema entry points; assigned-room and persistence documentation.

The existing draft store, fixed-room contracts, native renderer, GLB assets, and local submission path remain in use. No core schema changed. There is no new framework, runtime dependency, room layout choice, or walkthrough designer. The repository's existing SQLite-compatible Worker boundary was extended; this does not select a new backend vendor for the entire LMS.

## Verification and remaining integration

Tests exercise two independent HTTP clients, SQLite persistence across a restart, retries, simultaneous same-room and different-room submissions, lock/assignment/membership changes at commit, failed writes, class isolation, untrusted actor input, malformed/oversized requests, canonical credit preservation, closed museums, scope validation, lost acknowledgment recovery, and local-cache failure after server success. Component tests check that unconfirmed assignments render no room and empty shared collections render no sample rooms.

The next phase is deployment into a verified school session/roster environment and a two-device acceptance test. Authentication ingress and enrollment provisioning must be verified there. Cloud draft synchronization, live teammate editing, teacher design tools, resubmission/review workflows, and real LMS gradebook delivery remain outside this phase.

```text
TEMPLATE_CAPABILITY_GAP
Requested: Enable the shared museum for real school accounts and multiple devices.
Reason: The local app has no provisioned school sessions/roster or deployed museum API binding.
Suggested integration: Bind the existing ProjectSessionContext and MuseumPublicationAdapter
to the verified host identity and the provisioned class scope, then deploy and exercise the API.
```

There are no intentional deviations from the adapter, immutable-publication, or configuration/runtime separation requirements. Live deployment was not part of this build step.

Final checks on 2026-09-13:

- **60 focused Angular tests passed** across 17 files, including the unchanged local-room tests, HTTP adapter contracts, class-shared launch scope, publication coordinator, and component lifecycle behavior.
- **21 backend tests passed** across 3 files: 15 museum API/SQLite integration tests, 2 roster provisioning tests, and 4 existing Journey policy tests. Museum tests use temporary SQLite files and also reopen the database to verify durable retry recovery.
- Production Angular build and strict Worker TypeScript check passed. Production output is in `../output/shared-museum-production`. Existing stylesheet budget warnings remain in other/legacy components.
- Scoped `git diff --check` passed. The browser retained the editable student draft; visitor preview rendered one canvas with no editor fields and no captured console errors.
- The architecture checker still reports the same two existing violations outside this work: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` defining a project service.

Repeat with:

```powershell
node node_modules/@angular/cli/bin/ng.js test --watch=false --include='src/app/templates/exhibit-hall/**/*.spec.ts' --include='src/app/infrastructure/exhibit-hall/*.spec.ts' --include='src/app/runtime/exhibit-hall-registration.spec.ts'
node node_modules/vitest/vitest.mjs run server/museum server/journey-policy.spec.ts
node node_modules/typescript/bin/tsc --project tsconfig.worker.json --noEmit
node node_modules/@angular/cli/bin/ng.js build --configuration production
```
