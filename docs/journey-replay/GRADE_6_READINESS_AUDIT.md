# Race Around the World: sixth-grade teaching and saved-decision audit

Audited September 5, 2026. Scope: current local Angular application, curriculum configuration, decision engine, browser persistence, HTTP adapters, replay, teacher review UI, and checked-in server policy. This is an audit, not an implementation of the fixes below.

**Verdict: useful teacher-led demonstration; not yet ready for independent, graded classroom use.** The choice → explanation → consequence → saved route → replay structure works. Reliable individual ownership, recovery from failed saves, usable historical evidence, and a complete teacher feedback/revision loop need attention first.

No particular state curriculum was specified. The teaching recommendations use grades 6–8 history literacy and inquiry expectations; they are not a claim of alignment to a district's sixth-grade content sequence.

## What was verified

- Completed five chapters in an isolated `http://localhost:4200` demo, separate from the user's `127.0.0.1` browser origin. Reloaded at 60%: chapter 4, the preceding decisions, and the voyage route returned. Completed the remaining chapters and inspected the final replay: the written explanation and seven-point Lisbon → Azores → Cape Verde → Brazil geometry were present.
- Exercised all **162** configured choice combinations in the real engine: each reached completion with five replay scenes. This establishes reachability, not instructional quality or cloud-save reliability.
- Round-tripped a five-chapter record through the memory persistence adapter after each chapter and reconstructed its final replay route exactly.
- Current test suites: **16 journey tests passed across 7 files; 4 server-policy tests passed**. The first sandboxed server test attempt could not launch its worker; the unrestricted rerun passed. These suites do not cover the failures reproduced below.
- Ran an audit-only Node probe against the actual TypeScript modules and Angular runtime with controlled adapters. Results and reproduction code are in `docs/journey-replay/audit/`. Run from the repository root: `node docs/journey-replay/audit/reproduce.cjs`. Its assertions deliberately confirm the current behaviors; it is not a regression suite asserting that those behaviors are acceptable.
- No live school account, real student record, deployed D1/R2 service, roster, cross-device recovery, or microphone recording was tested. Audio fallback was reproduced with mock storage and a recreated real HTTP adapter. Current local UI explicitly reports **offline** and cannot submit to a teacher.

## Priority findings

P1 = address before relying on this for independent student work or grading. P2 = address before treating this as a complete sixth-grade learning activity.

### 1. P1 — Older server data overwrites newer local work

`initializeAuthority()` assigns the server record to both live state and browser storage without comparing it with pending local work. Reproduction: local cache contains a completed first chapter; server returns the earlier zero-chapter record; both live state and cache end with zero completed chapters. Failed server saves are caught but not retained as a durable retry queue. The conflict message tells students to reload, which can discard their local work through this same path.

Location: `src/app/templates/journey-replay/runtime/journey-replay-runtime.service.ts`, `initializeAuthority()` and `enqueueAuthoritySave()`.

Required result: retain an acknowledged server revision plus pending local changes; recover or reconcile without overwriting either copy. Display distinct “saved on this device,” “synced,” and “needs attention” states. An offline completed chapter must survive reload and later reconnect exactly once.

### 2. P1 — A failed browser save still reports a recorded chapter

Reproduced a storage adapter throwing `QuotaExceededError`: `completeCurrentStep()` returned true and advanced to chapter 2. `saveState` became `error`, but `commit()` cleared the error and the UI received the normal success notice. The decision panel never renders `saveState`. Separately, unavailable browser storage can make the adapter's optional `setItem` call a silent no-op.

Locations: runtime `save()`, `commit()`, and `completeCurrentStep()`; `persistence/journey-replay.persistence.ts`; `ui/journey-decision-panel.component.html`.

Required result: a failed durable write must remain visible and recoverable. Keep the answer in memory, provide retry/export recovery, and do not claim the chapter was saved until a storage destination has acknowledged it.

### 3. P1 — The current enrollment is a shared demo, and teacher assignment is unsafe for a class rollout

The route injects `tenantId: demo`, `classId: local-preview`, and `studentId: demo-navigator` for everyone before an authority session opens. Students sharing an unauthenticated browser profile therefore share one draft. Browser cache keys omit tenant and class, so the same student/project/version in two classes also collides locally.

The server derives actor identity from trusted gateway headers, which is a useful boundary **when that gateway is actually deployed**, but automatically makes the first authenticated visitor to a new class its teacher. Class membership is auto-created from a client-supplied class locator. A student opening first is not a sound teacher-provisioning rule. The checked-in server requires a Worker, D1, R2, and gateway authentication; the current Firebase App Hosting configuration does not by itself establish that those dependencies are wired up. Deployment functionality was not certified by this audit.

Locations: `src/app/features/journey-replay/journey-replay.routes.ts:31`; `persistence/journey-replay.persistence.ts:67`; `server/index.ts:501` and `:657`.

Required result: teacher-created classes, verified roster/join authorization, authenticated per-student enrollment, tenant/class-scoped device caches, and an explicit school deployment check. Demo voyages must be clearly identified as examples, not classmates' saved work.

### 4. P1 — Re-selecting a choice erases the student's explanation

`selectJourneyChoice()` replaces `responseDraft` with an empty draft for every selection, including the already-selected choice. Reproduced with a filled response and a second click on the same choice. Switching choices also loses the previous draft and audio reference. The event history remembers selection IDs, not the discarded reasoning.

Location: `core/journey-replay.engine.ts:57`.

Required result: repeated selection is a no-op; switching choices preserves a draft per choice or explicitly offers to keep/revise the current explanation. Preserve original and revised reasoning when a student changes their mind.

### 5. P1 — Locally recorded audio cannot reliably be found after reload

The fallback audio bytes can persist in IndexedDB, but `HttpJourneyReplayMediaAdapter` tracks their IDs only in an in-memory `Set`. Recreating the adapter changes the reference from the local blob to `/api/journey/media/<id>`, where the local file does not exist. This failure was reproduced without using the microphone.

Audio also has lifecycle risks by inspection: the recording component has no destruction cleanup, and a delayed upload attaches to whichever draft is current when it finishes. A student can change choices or continue using a typed response while recording/uploading. Replay advances every seven seconds independently of recording length and does not automatically load the first scene's audio on entry.

Locations: `infrastructure/journey-replay/http-journey-replay.adapters.ts:112`; `ui/journey-decision-panel.component.ts`; runtime `attachAudio()`; `ui/journey-replay-player.component.ts`.

Required result: persist asset location and ownership; bind pending recordings to a stable step/choice; recover local audio after restart; stop recording on navigation; let narration finish or use manual pacing. Test this on the school's actual devices and browsers before offering audio as an equivalent assessment option.

### 6. P1 — Teacher grading and student revision are incomplete

The review queue offers approve/revise controls but shows only up to 240 characters of the **latest** response. There is no teacher-facing action to open all five submitted answers, question prompts, evidence, route decisions, or audio. The summary uses current record data rather than displaying the complete submitted snapshot. One selected mastery level is applied to every mastery tag, which prevents skill-by-skill evaluation.

Students can see “Revision requested” and “Resubmit journey,” but cannot reopen or revise a completed chapter. The log is read-only. Resubmission updates the same server submission row, replaces its snapshot, and deletes the prior mastery assessments, so the implementation does not retain the promised immutable submission history across revisions.

Locations: `ui/class-journey-map.component.html:104`; `ui/class-journey-map.component.ts:107`; `server/journey-policy.ts:78`; `ui/journey-shell.html:82`; `server/index.ts:316`.

Required result: teacher detail view of the exact submitted version; assessment per criterion; actionable feedback; student revision of the requested response; separate submission versions preserving original answers and teacher feedback.

### 7. P1 — Completion validation does not guarantee an assessable journey exists

The client gate accepts any 12 characters, including `aaaaaaaaaaaa`. This is a presence check, not evidence that a sentence, explanation, or citation was supplied. Keeping completion separate from mastery is correct; the problem is presenting this gate as adequate reasoning.

More seriously, the server policy accepts the correct chapter/choice IDs and mastery tags even when student answers are removed and the route/replay arrays are empty. The audit probe reproduced that acceptance. Server save validates this policy and stores client-supplied route state rather than reconstructing it from approved decisions. This is a code-level finding, not a test against a deployed school API.

Locations: `core/journey-replay.engine.ts:269`; `server/journey-policy.ts:46`; `server/index.ts:190`.

Required result: validate response/media structure and ownership, ordered legal transitions, valid route geometry, replay linkage, and consistent progress. Derive authoritative route/consequences from decisions. Evaluate quality using teacher-visible criteria; do not substitute a longer character count or an opaque automatic score for assessment.

### 8. P1 for source-based assessment — Students are asked to analyze evidence they are not given

The six evidence cards contain brief authored summaries and generic source labels, without actual chart/ledger excerpts, credited authors, source links, or clear “fictional classroom reconstruction” labels. In chapter 5, “Two Accounts of First Contact” opens to one sentence saying the accounts differ. It supplies neither account, although the question and hint ask students to compare them. This was confirmed in the browser.

`evidenceSelected` is automatically copied from the chosen option's configured evidence IDs. It does not mean the student opened, selected, quoted, or used that evidence. The replay's claim that both accounts were preserved therefore overstates what the record contains.

Locations: `projects/age-of-exploration-journey/age-of-exploration-journey.config.ts:31` and `:194`; `core/journey-replay.engine.ts:99`; `ui/journey-decision-panel.component.html`.

Required result: provide short, attributed and contextualized excerpts or clearly labeled reconstructions; display both accounts; let students cite a specific detail and explain its relevance. Distinguish evidence offered, viewed, and actually cited in stored records.

### 9. P2 — The map records geometry, but under-supports geographic reasoning and path reuse

The active project contains only two traveling decisions: Lisbon → Cape Verde and then Brazil or the Cape of Good Hope. It ends at first encounter. There is no circumnavigation, shared finish condition, or race outcome; the title sets a broader expectation than the activity delivers. Prefer an Atlantic expedition title unless more journey stages are deliberately added.

Route distance, risk, and wind fields exist in configuration but are not shown as a route comparison in the student decision panel. Available routes look alike on the map. Weather/trade/risk graphics use fixed coordinates rather than the selected itinerary, and the evidence overlay has no corresponding rendering logic. Geographic illustration is decorative, not a historical source or navigational dataset.

Intermediate waypoints retain coordinates but not location IDs. Reproduced: the Azores coordinate is in the saved island route, but no route point has `locationId: azores`. Class intersection analysis therefore misses that visit. The current UI has no JSON, printable decision journal, or route export/import; replay is only in-app.

Locations: project config `map.routes` and `steps`; `ui/map/living-journey-map.component.html`; `core/journey-replay.engine.ts:242`; `detectVoyageIntersections()`.

Required result: show labeled route options, distance/time/wind evidence, and explicit tradeoffs; save intermediate stop identities and route/decision linkage; offer a readable journal and portable route export. Keep routes in longitude/latitude so future artwork changes do not move the student's path.

## What is already useful for sixth graders

- Five manageable decision stages and a question tied to each choice.
- A visible, replayable link between geographic choices and consequences.
- Prompts addressing evidence, resource tradeoffs, perspective, and harm rather than merely rewarding a fast voyage.
- Written responses and the intended option of oral responses.
- Completed response text, exact question, choice ID, consequence, timestamps, route sequence, and scene linkage are stored separately; mastery is labeled evidence-collected rather than automatically proficient.
- Configurable content and a shared renderer allow improvements without building another project-specific runtime.

## Recommended sixth-grade teaching design

Treat this as a historical decision inquiry. Do not grade students on choosing the “winning” route or reward seizing supplies through a speed leaderboard. Explicitly discuss why a numerical benefit to a ship does not measure harm to a community. Frame geographic uncertainty as what these navigators knew; avoid implying inhabited places were unknown to everyone. Include named communities and their knowledge, interests, and agency when the sources support them.

Suggested learning targets:

1. Use a map and a specific source detail to justify a route.
2. Explain a benefit, cost, and uncertainty in a decision.
3. Compare two accounts using each author's position and evidence.
4. Revise an explanation after seeing consequences or new evidence.

These targets are informed by [Common Core history/social-studies literacy grades 6–8](https://www.thecorestandards.org/ELA-Literacy/RH/6-8/) and the [C3 Framework](https://www.socialstudies.org/sites/default/files/c3/c3-framework-for-social-studies-rev0617.pdf), especially source analysis and claims supported by evidence. Their use here is a teaching recommendation, not a verified content-standard alignment.

Suggested three-period sequence, adjustable to reading support needs:

| Period | Activity | Evidence of learning |
| --- | --- | --- |
| 1, about 45–50 minutes | Locate ports; explain the simulation and its limits; teach motive, navigation, and source vocabulary; model one evidence-based answer; complete chapters 1–2. | One claim tied to a named source detail; one explained resource tradeoff. |
| 2, about 45–50 minutes | Compare route cards before choosing; complete chapters 3–4; pause to compare predictions and consequences with a partner. | Annotated route, comparison with an alternative, and a revised explanation. |
| 3, about 45–50 minutes | Read two actual accounts or explicitly labeled reconstructions; complete chapter 5; replay, discuss, and revise a final reflection. | Two-perspective comparison and an explanation of how evidence changed the student's thinking. |

Provide a short glossary for terms such as astrolabe, portolan, resupply, strategic, influence, and tradeoff. Keep both source excerpts beside the question; supply paragraph numbers and optional read-aloud support. Offer the frame: “I chose __. Source __ says/shows __. This matters because __. Compared with __, my choice risks __.” Permit an equivalent spoken explanation with a transcript or accessible text alternative. These are proposed supports, not current features.

Suggested rubric (score each dimension separately):

| Criterion | Developing | Proficient | Advanced |
| --- | --- | --- | --- |
| Evidence | General opinion or vague source reference. | Uses an accurate, specific source detail. | Corroborates with another source and acknowledges a limitation. |
| Geography | Names a route without explaining it. | Connects location, wind, distance, or resupply to the choice. | Compares plausible alternatives and uncertainty. |
| Cause and consequence | Lists an outcome. | Explains the tradeoff and why the outcome followed. | Evaluates the outcome and revises the original reasoning. |
| Perspective | Describes only the expedition's interests. | Uses evidence to explain two perspectives and possible harm. | Explains disagreement, source limitations, and what remains unknown. |

## Saved-record target and acceptance checklist

Retain the existing versioned project and geographic route structure. Extend it through reusable contracts with compatibility tests where needed. Recommended additions are scoped enrollment, a persistent save queue, per-choice drafts, cited-evidence references, response revision history, intermediate waypoint IDs, media storage metadata, and separate submission versions.

Each completed decision should retain the student/class/project scope; original question and choice; actual evidence citation; original response and later revisions; predicted and realized consequences; affected route segment; resource changes; timestamps; and acknowledged save state. A claimed snapshot ID should resolve to a retained snapshot; the current route's `stateSnapshotId` is only a revision string, not proof that historical resource snapshots exist.

Before classroom launch, verify:

1. Two students on one shared computer see only their own journeys; the same student in two classes has distinct records.
2. Teacher/student roles come from roster authorization, regardless of who opens first.
3. Close/reopen after each chapter and mid-draft; record and audio recover.
4. Disconnect, finish work, reload, reconnect: no missing or duplicate chapters and no silent overwrites.
5. Simulate full storage, unavailable storage, lost acknowledgments, and conflicting sessions: clear recovery without false “recorded” notices.
6. Re-select a choice and change to another choice: existing reasoning remains recoverable.
7. Save every legitimate itinerary, including intermediate stops; replay and export/import reproduce the same ordered path.
8. Teachers can inspect the full submitted answers, sources, audio, and route; feedback produces a revisable student task; both submission versions remain available.
9. Malformed completion records, unsupported routes, and missing/unowned audio references are rejected by the server.
10. Run a small supervised pilot on school devices, with keyboard-only and reading-support users, before relying on this for grades.

## Deliverables and next work

Added this report and the audit reproduction script/results. No production code, curriculum, existing tests, public contracts, or deployment settings were modified during this audit. No new capability was implemented. Recommended next phase: fix saving/identity/draft/audio failures first; add the teacher review/revision loop and usable sources next; then improve route comparison and run the supervised sixth-grade pilot. Those fixes should use the existing adapter and configuration boundaries.
