# History Live 1.1: audit repairs

## Implemented behavior

- The Revolutionary War package is version 1.1.0 and uses template 1.1. The four supplied WebP scenes total 482,944 bytes, versus 8,929,616 bytes for their PNG predecessors. The original files remain available.
- Curriculum identity is separate from injected enrollment context. The default route explicitly identifies itself as a local demonstration. It does not impersonate a school teacher or automatically approve a student submission.
- Draft changes save after a 700 ms debounce, on focus leaving a control, on page hide, and on service teardown. Draft keystrokes do not fill the academic event history. Failed writes show an error and leave an exportable in-memory draft.
- Browser persistence is scoped by tenant, class, student, project, and version. Snapshot parsing checks nested structures before rendering. Revision checks detect another tab's intervening write; localStorage is still not a transactional multi-user database.
- Checkpoints are cumulative and report missing prerequisites. Default script cues are empty. Source, claim, script, and scene changes invalidate package clearance and remove the stale student segment from the rundown.
- Pitch and package submission are separate from producer review. Revision feedback, pitch submissions, review decisions, and reflection revisions are retained. Registered command policies guard teacher actions; classroom mode requires the shared authoritative command gateway to confirm them.
- Claims explicitly attach supporting or challenging passages, reasoning, and uncertainty. Each claim must appear in a linked script cue. Students can retain disputed claims when their uncertainty is explained.
- All ten story leads have dated source packets with at least two references and at least one primary source. The wall has 19 sources, including women's correspondence, Black petitioners, a Lenape treaty, and a specific Loyalist archival case study. Paraphrases are labeled editorial summaries, not quotations.
- Contemporary reports reject later evidence. Retrospective reporting is explicit. `availableOn` is a conservative document date boundary, not proof that a reporter in every location had access. The pitch instructs students to discuss access and circulation. Unknown day/month dates use the end of the documented period. Modern archival interpretation is separately dated and retrospective.
- Scene previews render selected evidence, captions, and dates. Embedded source images render when supplied; a missing image is reported and cannot satisfy readiness as an image scene. Unsupported chart scenes cannot silently clear. Source originals remain linked.
- Recording and file upload use the shared AssetStorageAdapter contract. The demo route uses IndexedDB object storage, separate from the JSON runtime snapshot. References survive reload. Upload errors, missing assets, recorder cleanup, stale upload completion, downloads, and recording transcripts are handled. The limit is 100 MB. Browser storage can be cleared or evicted; the UI provides recording and work downloads.
- Package clearance snapshots script, scenes, transcript, and media reference into the rundown. The class player uses the active segment; the personal preview uses the current draft. Segment times are recalculated after ordering. Audience reactions are scoped to a segment. Hold/end pauses the visible recording.
- Rubric expectations and post-broadcast reflection are configurable. Reflection revision history is visible.
- Script fields have accessible labels. Stage navigation and source inspection manage focus. Beat controls stay within the project. Dynamic select options display their actual saved values. Small text and control sizes have been increased; responsive layouts and reduced-motion styling remain.

## Boundaries and compatibility

No core schema or backend vendor API was added to a template component. Existing EventRegistry, CapabilityRegistry, Registry, AuthoritativeCommandGateway, and AssetStorageAdapter contracts are reused. Template model additions are optional for source compatibility; stricter 1.1 publication validation requires dated source packets. Existing v1.0 demo data is not silently imported into a student-scoped record because its owner cannot be established. Old version keys are retained, and no existing recordings or original artwork are deleted.

The default route supplies a fixed, clearly labeled demo identity. It is not a login mechanism and must not be reused for enrolled learners. `seedSegments` remain illustrative configuration and are not counted as submitted student work.

The generic runtime still uses its existing reducer-based local state model. Registered event and command policy contracts have been added at the boundary; this change does not migrate History Live wholesale to the Investigation rule engine. That broader integration is outside this repair.

## Authenticated classroom integration: remaining deployment work

`TEMPLATE_CAPABILITY_GAP`

Requested: authenticated multi-user teacher review, a shared class rundown, and cloud-backed final submissions.

Reason: the repository's History Live route has no authenticated enrollment provider, History Live shared-state adapter, or server implementation of the authoritative commands. Existing Firebase debate adapters use a different session contract and anonymous identity; treating them as trusted school-role authentication would be incorrect.

The host must provide:

1. `HISTORY_LIVE_ENROLLMENT` from trusted school login/enrollment, including tenant, class, learner, role, and granted permissions. Query parameters and editable role controls must not supply classroom authority.
2. `HISTORY_LIVE_PERSISTENCE` for that learner's workspace, and shared class rundown/teacher queue synchronization. The current interface is synchronous and is suitable for a host-managed local cache; a cloud host must hydrate it before creating the runtime and reconcile authoritative projections.
3. `HISTORY_LIVE_AUTHORITY`, implementing AuthoritativeCommandGateway. Register `history-live.*` commands listed in `history-live-capabilities.ts`. The server must validate authenticated actor membership, target learner, evidence/readiness, expected version, and idempotency; persist submission/review decisions and publish scoped summaries. Never trust the submitted snapshot as an approval decision.
4. `HISTORY_LIVE_MEDIA`, a tenant-scoped cloud AssetStorageAdapter with server-validated ownership, content type, and limits.

Until these are connected, the demo remains explicitly local. Classroom-mode submissions and producer actions fail closed without an authoritative adapter. No server or rules deployment was performed as part of this change. Fully synchronized multi-user classroom operation is not claimed.

## Validation

Final verification on September 4, 2026: 23 tests passed across two History Live spec files. The production Angular build passed with existing style-budget warnings in unrelated features. A parallel test/build attempt exhausted system memory; after stopping the temporary development server, the final test run passed with one build worker and the existing serial Vitest configuration.

Run the focused suite without changing the unrelated application-wide test configuration:

```powershell
npm.cmd test -- --watch=false --ts-config=tsconfig.history-live.spec.json --include=src/app/templates/history-live/**/*.spec.ts
npm.cmd run build
```

The dedicated tsconfig retains strict settings and isolates this feature from the pre-existing `simulation-planning.spec.ts` references to the nonexistent `crate.proposed` property. No unrelated assertions were removed or weakened.

Browser checks covered network/story selection, explicit submission and producer approval, correct saved dropdown values, source inspection focus, narrow-screen layout, and uploading an existing demo MP4 to IndexedDB. After page reload, the recording returned through a new object URL with no console error.

## Files

Added: `history-live-quality.ts`, `history-live-snapshot.ts`, `history-live-capabilities.ts`, `history-live-runtime.service.spec.ts`, `evidence-scene.component.ts`, `indexeddb-asset-storage.adapter.ts`, `revolutionary-war.sources.ts`, `tsconfig.history-live.spec.json`, and this document.

Modified: the Revolutionary War configuration, History Live route, domain models, state helpers and tests, tokens, runtime, persistence adapter, and the seven existing UI components' templates/styles/controllers as needed.

Recommended next phase: connect and test authenticated classroom adapters against the school's enrollment service, including two students and one producer on separate devices. The local workflow and authority-denial tests are not a substitute for that integration test.
