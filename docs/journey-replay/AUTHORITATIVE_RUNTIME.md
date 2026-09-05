# Journey Replay Authoritative Runtime

## Trust boundary

All `/api/journey/*` routes require `oai-authenticated-user-id` and `oai-authenticated-user-email`. The Worker derives the actor from those headers; it does not trust a student ID, role, reviewer ID, or display name supplied by Angular.

The first authenticated actor for a new class scope becomes its teacher. Subsequent actors become students. Teacher-only checks protect class summaries and review commands on the server.

## Data ownership

- D1 stores classes, memberships, current journey records, immutable submission snapshots, mastery assessments, idempotency results, and media metadata.
- R2 stores audio bytes.
- Browser storage stores an offline draft cache only.
- Published project configuration remains immutable and outside runtime tables.

## Concurrency and idempotency

Journey record writes send an expected server revision. The D1 update includes that revision in its predicate and returns `JOURNEY_RECORD_CONFLICT` when another session has already committed a newer version.

Every save, submit, and review command carries an idempotency key. Completed operation results are stored in `journey_operations`, so retrying the same command returns the original result rather than duplicating a write or assessment.

## Submission and mastery

Step completion only collects mastery evidence. Submission requires an authoritative complete record with the configured number of steps. It stores a snapshot and creates a review queue item.

Only teachers may approve or request revision. Mastery tags are constrained to tags present in the submitted snapshot, and mastery levels are limited to `developing`, `proficient`, or `advanced`.

## Class projection

Teachers receive a bounded summary containing route geometry, progress counts, completion/submission status, a short response preview, and assessed mastery. The Angular class map uses one RxJS polling stream per active class view, not one subscription per student or map marker.

## Storage bindings

The Sites manifest declares `DB` for D1 and `MEDIA` for R2. The generated Drizzle migration is packaged with the Worker build. No database IDs, bucket IDs, or credentials are committed to the repository.
