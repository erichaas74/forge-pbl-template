# The Fate of the Republic — activity rules audit

Date: 2026-09-15. Project `the-fate-of-the-republic@2.0.0`; lesson plan `1.0.0`; Debate Studio `2.0`.

**Result: does not meet the project activity rules.** All eight session entries were inspected. The current page is principally an opinion prompt, transcript archive, and response editor. Selecting a session changes the navigation and standards, but does not supply that session's learning activity.

Scope: first of the two registered Debate Studio projects. **Hammurabi on Trial is pending review of this project**, following [rule 8](../PROJECT_ACTIVITY_RULES.md). This is an audit and proposed repair design; no application code, curriculum configuration, or existing student work was changed.

**Subsequent user direction:** keep the ongoing debate as the main viewport, alternate group exchanges with individual instruction/revision, and produce an opening on day one. The [continuing debate flow](REPUBLIC_DEBATE_FLOW_DESIGN.md) supersedes this audit's proposed claim-map main workspace. A persistent debate screen is intentional; the remaining defect is the absence of the required session-specific exchange and revision behavior.

## Findings, ordered by priority

### 1. P1 — Eight sessions open the same activity

Rules 1 and 8. Direct entry to lessons 1–8 always opens **“What do you think?”**. After selecting “Unsure,” every entry opens **Round II · The First Exchange · Evidence Senator**, with the same three seeded arguments. No new source, construction problem, rebuttal constraint, rehearsal challenge, or final proceeding is selected by the lesson.

The Roman lesson definitions have no `focusTarget`. The page's lesson binding only reopens an optional inquiry component; the Roman configuration has no inquiry. The current round comes from runtime turn state, independently of the selected lesson. Merely setting `focusTarget` would therefore not fix the Roman sequence.

Evidence: [lesson definitions](../../src/app/projects/project-lesson-plans.json), [page binding](../../src/app/templates/debate-studio/ui/debate-studio-page.component.ts), [runtime round selection](../../src/app/templates/debate-studio/runtime/debate-studio-runtime.service.ts).

Repair: add a reusable, configuration-driven session activity selection. Select the task, evidence and constraints without advancing official rounds or marking prerequisites complete. A later-session URL must show that session's activity and preserve saved work; missing prerequisites need an adjacent, explicit recovery action.

### 2. P1 — Written answers occupy the main activity; task/tutor column is absent

Rules 1, 2, 4 and 5. The entry screen is an opinion question over chamber artwork. The next screen is a transcript thread plus a response builder. Its Plan tab contains a task list and repeated question; its Write tab contains **Speech draft** and **Explain your reasoning**. These fields are initially disabled, then become editable after the listening/moderator steps. The final voting view also contains a reflection textarea. Filing requires a 120-character draft and 30-character reasoning contribution.

There is no weekly tasks/intended products box and no clearly labeled, disconnected AI Tutor planning box in any of the eight initial views. Moving instructions into another central card would preserve the violation.

Evidence: [page layout](../../src/app/templates/debate-studio/ui/debate-studio-page.component.html), [active composer](../../src/app/templates/debate-studio/ui/debate-composer-dock.component.html), [reflection](../../src/app/templates/debate-studio/ui/debate-showcase.component.html), [filing requirements](../../src/app/templates/debate-studio/core/debate-studio-state.ts).

Repair: give the main panel a claim/evidence investigation, with tasks immediately above the disconnected tutor plan in a collapsible side column. Keep that order on phones. Preserve existing drafts and filing requirements while resolving authoring placement; do not remove writing requirements and still claim the address is complete.

**Placement decision for review:** rule 4 explicitly says an intended text product's placement must be resolved with the user. Proposed placement is a manual authoring surface opened from the tutor area, clearly distinguished from the disconnected tutor plan. No tutoring, grading or adaptation would be implied. This audit does not implement that decision.

### 3. P1 — First-session source controls do nothing before the opinion

Rules 1 and 8. Fresh lesson 1 → **Historical sources** produces no visible change, no focus change to an opened surface, and no feedback. The same applies to all fresh session entries. The handler calls `this.debateComposer?.open(...)`, but the composer is not created until a pre-opinion exists. “Find in thread” has the analogous dependency on a thread that is absent before the opinion.

This blocks the lesson's intended initial claim/source investigation and asks the learner to choose an opinion before they can open the evidence table.

Evidence: [conditional child creation](../../src/app/templates/debate-studio/ui/debate-studio-page.component.html), [optional child handlers](../../src/app/templates/debate-studio/ui/debate-studio-page.component.ts).

Repair: allow source inspection and argument investigation immediately. Route these actions to the existing main activity surface independently of opinion collection.

### 4. P1 — New recordings cannot be reviewed in the active composer

Rules 7 and 8. The active Record & file tab offers rehearsal, video/audio/transcript selection, retake, and filing. It never renders `recordingPreviewUrl`, a video element or an audio element. Yet `finishRecording()` sets `recordingReady: true`, and Feedback labels this state **“Reviewed a recording or transcript.”**

The older workbench has playback markup, but the current page renders `DebateComposerDockComponent`, not that workbench. Existing playback of already-filed turns does not provide pre-filing review of a new recording.

Evidence: [active recording panel](../../src/app/templates/debate-studio/ui/debate-composer-dock.component.html), [finishRecording](../../src/app/templates/debate-studio/runtime/debate-studio-runtime.service.ts), [older workbench](../../src/app/templates/debate-studio/ui/debate-workbench.component.html).

Repair: put real playback and retake next to the recording controls; distinguish recorded, played/reviewed, and filed state. Verify an actual playable asset before claiming recording review works. Camera/microphone access and end-to-end recording were not exercised in this audit; this finding is based on the active rendered controls and their implementation.

### 5. P2 — Standards consume the opening view; shared identity is missing

Rules 2 and 3. The Roman plan uses the older navigation header: Return, weeks and Final example, without the shared project title/ID. Project identity is instead inside Activity tools. Below the header, standards render two lesson cards, standard titles and an “Evidence reviewed” counter.

At a 1440 × 900 viewport the standards section measured roughly **289–318 px**. At 390 × 844 it measured **482–532 px**, after a **250 px** navigation header. The first opinion controls began **1,060–1,110 px** down the document.

The mapping itself matches project version `2.0.0`, plan version `1.0.0` and Grade 6. All referenced standard text matched the repository's source CSVs. The existing full-breakdown dialog opens correctly; Escape closes it and restores focus. Those are useful pieces to retain. Accurate IDs do not establish that the missing activities assess the mapped skills.

Evidence: [standards template](../../src/app/shared/project-lessons/standards-review.component.html), [standards sizing](../../src/app/shared/project-lessons/standards-review.component.scss), [navigation](../../src/app/shared/project-lessons/project-lesson-nav.component.html), [versioned mapping](../../src/app/projects/project-lesson-standards.ts).

Repair: use the shared compact identity header and a very small expandable standards row. Retain the detailed standards, scope limits and curriculum connections inside the accessible dialog. Scope shared-shell changes so other projects are not silently declared audited.

### 6. P2 — Phone source actions open content outside the visible area

Rule 1 accessibility and rule 8 responsive verification; engineering rule 37.

At 390 × 844, the center comes before both faction rails. Scroll to **Historical sources** and activate it: the evidence builder opens above the viewport, while focus stays on the source button. The measured builder bounds were **−433 to −157 px**, with its trigger at **780 px**. The learner sees no opened evidence. The responsive chamber also reserves a full-viewport center row, followed by both archives; expanded tabs require horizontal scrolling.

Evidence: [responsive grid](../../src/app/templates/debate-studio/ui/debate-studio-page.component.scss), [composer open method](../../src/app/templates/debate-studio/ui/debate-composer-dock.component.ts).

Repair: provide an in-view evidence inspector or dialog; focus its first useful element and return focus on close. Keep non-drag and keyboard alternatives for the redesigned interaction. A passing page-width check alone is insufficient: there was no document-level horizontal overflow, but important controls still opened out of view.

### 7. P2 — The active evidence panel hides provenance needed for source defense

Rules 1 and 3. The six sources can be classified and pinned; pinning updates the count. However, the active composer only renders date, type, title and excerpt. It drops each source's `citation`, `context` and `perspective`. The older workbench displayed those fields. Lesson 7 maps to examining purpose, viewpoint and limits, but has neither a fresh source detail nor this provenance available in its source panel.

Repair: expose citation, perspective and context on demand next to each source; configure genuinely new lesson-7 evidence. Existing broad citations such as “Late Republican reform record” also need a curriculum sourcing pass before claiming traceable primary-source investigation. Historical source accuracy was not independently researched in this audit.

### 8. P2 — Local demo is labeled as a live shared record

Rules 4 and 8, and truthful capability presentation. The current launcher only accepts `localDemo` and injects memory session/media adapters. Successful initialization nevertheless sets connection state to `shared`; Activity tools says **“Shared Senate live”**, and the draft thread says **LIVE**. Memory media uses a browser object URL, not durable upload storage.

Repair: communicate local practice accurately, including whether recordings survive reload. Preserve the adapter boundary. A real class exchange requires an authoritative session/media gateway; do not imply that it, an external AI moderator, or automated assessment is connected. Older implementation notes describe Firebase wiring that is not the active launcher path.

## Every week and session

All eight initial entries and all eight post-opinion states were checked in the browser. Every post-opinion state was the same Round II activity. The table records the additional learning gap against each current lesson, rather than treating navigation labels as activities.

| Week / session | Current intended work | Missing experience | Proposed meaningful interaction |
| --- | --- | --- | --- |
| 1 / 1 | Initial position + source note | Evidence inspection is unavailable before the opinion. | Compare two claims; inspect sources and connect a relevant passage to a claim. Show which claim has no evidence and allow uncertainty. |
| 1 / 2 | Shared case, roles, sources | No shared claim board or role-assignment activity. | Build a faction claim map with limited source slots; place role tokens and expose uncovered arguments. |
| 2 / 3 | Listen, gather evidence, reason | Listening controls exist but are buried in the common builder. | Select an exact opponent passage and connect evidence to the claim it supports or challenges. Show unmatched responses. |
| 2 / 4 | Draft address + rebuttal | Main-panel editor substitutes for an activity. | Arrange claim/reason/evidence units into an oral sequence; reveal where a rebuttal does not target the selected claim. Drafting placement remains a user decision. |
| 3 / 5 | Strengthen the rebuttal | No session-specific revision challenge. | Narrow an opponent claim and require the learner to repair affected evidence links; preserve before/after versions. |
| 3 / 6 | Rehearse exchange | Same response round; pre-filing playback missing. | Run a timed exchange using chosen evidence cues, listen to the actual recording, then revise cue order and timing. |
| 4 / 7 | Independently defend a source | No fresh detail or source-provenance inspection. | Reveal a new source detail; inspect author/purpose/context and revise the affected claim links under a fixed evidence limit. |
| 4 / 8 | Final proceeding + reflection | Direct entry still starts the initial opinion and Round II. | Navigate the learner's available proceeding, compare opposing evidence chains, and inspect what supports the verdict; respect incomplete-round gates. Reflection belongs in the tutor area. |

## Interaction design for review

Three candidates were considered:

1. **Claim and evidence map:** passage objects, claim nodes and labeled links. Best fit for citation, accurate rebuttal and visible revision; extends the current evidence and annotation data.
2. **Timed crossfire stage:** source cues and playable contributions, with turn/time constraints. Strong for oral rehearsal; depends on fixing recording review.
3. **Institution decision table:** arrange institutional constraints and compare consequences of policy choices. Promising for Roman government, but needs new sourced curriculum and a model the current engine does not have.

Recommended core: **the claim and evidence map**, changing its evidence and constraints across the eight sessions as above, with the crossfire stage for rehearsal. Students choose a passage and a destination using clicks or keyboard controls; drag is optional. Connections visibly change the map, missing support and unanswered claims. Feedback reports structural facts such as “this source has no claim link,” not an invented automated judgment that one historical position is correct. Detailed evidence opens next to its object. Tasks and tutor planning occupy the side column; no extra bands surround the activity.

### Reusable capabilities and placement decisions

`TEMPLATE_CAPABILITY_GAP`: the current template lacks a versioned claim/evidence relationship board, per-session challenge configuration and preserved rebuttal-revision comparisons. Add this as a reusable Debate Studio capability with validation, runtime events and persisted state. Do not introduce Roman-name conditions in shared components.

Reuse factions, evidence IDs, exact-passage annotations, turn gates, event/idempotency handling, standards data, native dialogs and media adapters. Real class collaboration additionally requires the session/media gateway currently rejected by the local-demo launcher. No core contract was changed during this audit.

Before implementation, resolve the manual speech-authoring placement described in finding 2. Then fix and verify this project before beginning Hammurabi's audit. This report is not a claim that the proposed interaction has been implemented or validated with learners.

## Verification and artifacts

- Browser: all eight direct entries at 1440 × 900 and 390 × 844; all eight desktop post-opinion states; source action before the opinion; evidence pinning; passage marking and listening acknowledgment; moderator acknowledgment; writing gate; recording control inspection; standards dialog/Escape/focus restoration; out-of-view phone source action.
- Scoped Angular build: **passed**, using current production debate/shared-shell components in an isolated harness.
- Existing Debate Studio tests: **19 passed in 6 files**, using a scoped TypeScript configuration. Tests were not changed or weakened. These tests do not prove compliance with the activity rules.
- Standards source check: **passed** — 42 IDs/grades/titles/descriptions match the source CSVs, across 120 configured lesson checks.
- Normal application preview and normal test compilation: **blocked** by unrelated missing `src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.scene` imported at `machine.scene.ts:13`.
- Repository architecture check: **failed** on pre-existing `core/index.ts → ./templates` and the project-level `projects/mystery-substance/lab-kit/render-quality.service.ts`.
- Limitations: the full project host could not run because of that heist import. The harness reproduces its navigation, standards, activity container and stylesheet, and uses the active launcher's memory adapters. It disables private draft persistence to protect existing work. Authenticated classroom exchange, reload persistence, full-class completion, microphone/video capture and the separate Final example route were not end-to-end verified.

Files added: this report and the local [audit harness](../../output/debate-activity-audit/main.ts), [build configuration](../../output/debate-activity-audit/tsconfig.json), [test configuration](../../output/debate-activity-audit/tsconfig.spec.json), and [preview server](../../output/debate-activity-audit/serve.mjs), with generated build artifacts. No application files or tests modified.

Browser evidence: [eight-session observations](../../output/debate-activity-audit/browser-observations.json), [phone opening](../../output/debate-activity-audit/mobile-opening.png), [phone source action](../../output/debate-activity-audit/mobile-source-action.png), [desktop session 8](../../output/debate-activity-audit/desktop-session-8.png). The first desktop entry retained a previous scroll position; use standards height or later fresh-entry positions for opening-layout measurements.

Reproduce from the repository root:

```powershell
node node_modules/@angular/cli/bin/ng.js build --configuration development --browser output/debate-activity-audit/main.ts --ts-config output/debate-activity-audit/tsconfig.json --output-path output/debate-activity-audit/build
node output/debate-activity-audit/serve.mjs
node node_modules/@angular/cli/bin/ng.js test --watch=false --ts-config=output/debate-activity-audit/tsconfig.spec.json --include='src/app/templates/debate-studio/**/*.spec.ts'
node scripts/check-lesson-standards.mjs
```

Preview route: `http://127.0.0.1:4317/projects/the-fate-of-the-republic/lessons?lesson=1` (substitute session 1–8). This is an audit harness, not a production launch or a finished redesign.
