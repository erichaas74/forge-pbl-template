# Voyage — project activity rules audit

Date: 2026-09-15. Project: **Race Around the World** (`race-around-the-world@1.3.0`), lesson plan `1.0.0`, Journey Replay template `1.0`.

**Result: does not meet the project activity rules.** All eight session entries were checked at desktop and phone widths. All five underlying chapters and the completed replay were also inspected using explicitly synthetic prior-decision fixtures.

This report completes the requested audit and supplies a repair design. Application code, curriculum and existing student work were not changed. The writing-placement decision and missing standards source described below must be resolved before treating a redesign as complete. Scope remains Voyage only, under [Project activity rules](../PROJECT_ACTIVITY_RULES.md).

## Findings

### 1. P1 — Session selection does not select that session’s investigation

**Rules 1 and 8.** Fresh direct entry to sessions **1–6 and 8** opens **Chapter 1 · Choose Your Company**. Session **7** opens **Captain’s log: 0 chapters recorded**. The navigation highlights the requested lesson correctly, but the lesson does not select a different problem, evidence set or constraint.

The [lesson plan](../../src/app/projects/project-lesson-plans.json) sets `focusTarget: journey` for sessions 1–6, `log` for 7 and `replay` for 8. The [lesson binding](../../src/app/templates/journey-replay/ui/journey-shell.component.ts) only opens those surfaces; an empty replay returns to the current chapter. The current chapter comes from saved voyage progress. This also means revisiting an earlier lesson after progressing does not restore its learning activity.

**Repair:** add configuration-driven session challenges that select the evidence, available actions and constraints independently of official completion. Later entries need a usable investigation or an explicit prerequisite recovery action within the activity. Do not create fake completed chapters to make a later URL work. The audit fixture mechanism is strictly a test aid, not a proposed production implementation.

### 2. P1 — Most of the learning workflow is a repeated answer form

**Rules 1, 4 and 5.** Every chapter uses **Choose → Read → Predict → Explain → Record**. The [decision panel](../../src/app/templates/journey-replay/ui/journey-decision-panel.component.html) places a sponsor proposal, prediction, explanation, transcript and citation explanation in the same map-and-decisions workspace. The [log revision editor](../../src/app/templates/journey-replay/ui/journey-shell.html) also sits there. The required weekly tasks/products box followed by a collapsible AI Tutor planning box is absent.

This is not a wholly noninteractive page: route choices, map inspection and resource forecasts work. However, provisioning is a three-button choice, the storm is a two-button choice, and the encounter is a three-button choice, followed by the same form. There is no cargo manipulation, changing wind investigation, damage experiment or visual source comparison. Changing the surrounding narrative and weather animation does not supply those activities.

**Repair:** retain the existing decision and consequence engine beneath a visual chart, cargo and source investigation. Put weekly tasks and intended products directly above the AI Tutor box. Put written responses in a manual authoring surface reached from that area, subject to the placement decision below. Preserve existing response drafts, citations, revision history and completion requirements.

**Required placement decision:** rule 4 states, “If a project's intended product requires text authoring, resolve its placement with the user.” Captain’s Log is an intended product. Proposed placement: a manual **Captain’s Log** drawer opened from the tutor side column, clearly separate from the disconnected AI planning list. This proposal has not been implemented or approved; relocating a full editor into the main activity would not resolve the finding.

### 3. P1 — The tutor is a functioning scripted question tool, not the required disconnected plan

**Rule 4.** The Record tab contains an optional **Reasoning coach**, an **Ask for a reasoning question** button and a **Your reply** textarea. In the audit, the button returned a configured question and guidance despite no AI adapter being supplied. The interface correctly calls this a **Built-in question**; the finding is not that it secretly calls an AI model.

The [runtime’s `askTutor`](../../src/app/templates/journey-replay/runtime/journey-replay-runtime.service.ts) uses configured criterion text when `JOURNEY_TUTOR` is absent and appends the turn to the response draft. This differs from the required clearly labeled, disconnected planning list describing questions, evidence to inspect and future model controls.

**Repair:** present **AI Tutor — not connected** with that planning content, below weekly tasks. Preserve previously saved scripted exchanges as historical response data. Do not imply automated assessment or adaptation. Completing a chapter records `evidence-collected`, not a mastery judgment; retain that distinction.

### 4. P2 — Content bands and repeated framing compete with the activity

**Rules 1 and 2.** The [map canvas](../../src/app/templates/journey-replay/ui/journey-shell.html) is three rows: resource strip, map, and an **Adventure dispatch** containing a decorative ship scene, heading and narrative. The [scene’s only control](../../src/app/templates/journey-replay/ui/journey-adventure-scene.component.html) pauses its animation. The decision pane adds a historical introduction, chapter heading, task navigation, briefing and, after a recorded step, a substantial consequence report. The replay adds another header, map heading, legend and overlay controls.

Detailed history and its source labels are valuable, but the repeated introductory paragraph and deck dispatch are not activity controls. The common header lacks visible project identity because Voyage has no `presentation` configuration; its title is inside **Activity tools** instead.

**Repair:** use the existing compact shared title/ID/navigation shell. Let the chart or cargo/source investigation occupy the activity panel. Show resource changes beside the selected cargo or route; open history and source details on demand beside the inspected object. Remove the deck narrative band and duplicated chapter framing. Retain the distinction between fictional scenarios and documented history in short labels and accessible source details.

### 5. P2 — Standards are entirely absent, with no verified Grade 7 mapping

**Rule 3.** None of the eight entries has a standards row or expansion control. Voyage is [cataloged as Grade 7](../../src/app/projects/project-catalog.ts), but it has no entry in [project lesson standards](../../src/app/projects/project-lesson-standards.ts). The review contract currently limits project mappings to grades 4, 5 and 6. The [host](../../src/app/runtime/project-launch/project-host.component.html) displays a review only when one resolves, and its alternate curriculum disclosure requires `plan.presentation`, which Voyage also lacks.

The catalog, active project and lesson plan all identify version **1.3.0**; this is not a version mismatch. The earlier Grade 6 readiness document explicitly treats its literacy/inquiry targets as recommendations, not verified content-standard alignment. The repository’s standards-source check passes for its existing mappings, but includes no Voyage mapping.

**Repair:** confirm Voyage’s target grade and authoritative standards source. Map the current lesson evidence to those standards, then expose a very small expandable row directly under the shared identity. If Grade 7 remains the target, extend the reusable review contract and validation to support it. Do not relabel Grade 6 standards as Grade 7 or invent alignment claims.

### 6. P2 — Phone layout and disclosure force students to search below the visible area

**Rules 1, 5 and 8; engineering rules 37 and 48.** At **390 × 844**, the initial shared navigation occupies about 250 pixels. The map is about **225 pixels high**, followed by a **91-pixel dispatch**; the chapter pane starts around **y=613**. The first task body starts around **y=1152**, beyond the initial screen. There is no horizontal document overflow, but multiple nested scrolling regions and the framing consume the working space.

Reproduction: session 3 with prior chapters supplied → activate **Sail by the Azores** on the map with Enter. Focus moves to the route report’s Close button, but **Choose Sail by the Azores** starts around **y=1166**, below the 844-pixel viewport, with page scroll still zero. The student sees only the report’s opening portion and must find the action by scrolling. In the phone replay, transport controls begin around **y=1290**.

The [shell styles](../../src/app/templates/journey-replay/ui/journey-shell.scss) allocate `100dvh` beneath the shared navigation and split the phone map/decision rows 43%/57%. The [disclosure helper](../../src/app/templates/journey-replay/ui/journey-shell.component.ts) focuses Close with `preventScroll: true` without revealing the meaningful selection control.

**Repair:** size the workspace against the space remaining below the compact common shell. Keep essential route/cargo controls in view, collapse the task/tutor column in order, and open mobile details in a contained surface with the selection action visible. Move focus to meaningful opened content and restore it to the triggering object on close. Verify touch and keyboard paths.

## Every week and session: repair design

The fresh-entry result below was confirmed at both 1440 × 900 and 390 × 844. Later chapter fixtures were separately inspected at both sizes; they do not change the fresh-entry findings.

| Week / session | Intended product | Actual fresh entry | Proposed concrete interaction |
| --- | --- | --- | --- |
| 1 / 1 | Mission preference, geographic reasoning and prediction | Chapter 1 | Inspect destination pins and patron obligations; select a mission and see which resources and route commitments it changes. |
| 1 / 2 | Provisioning decision and initial log | Chapter 1 | Place one of three cargo loads into the last hold berth. Swap water, instruments and repair stores; the hold and current/later resource effects change together. |
| 2 / 3 | Source-supported route comparison | Chapter 1 | Overlay coastal, island and direct routes; compare waypoints and resource traces. Introduce a specified changed condition that can alter the comparison. |
| 2 / 4 | Recorded first passage and consequence | Chapter 1 | Commit the chosen passage, follow its waypoints and inspect the resource change at each modeled event. Compare the resulting trace with the planning trial. |
| 3 / 5 | Storm response using actual resources | Chapter 1 | Inspect sail damage and available cargo. Apply the carried repair load or choose a diversion; compare reachable destinations and the resulting reserve. |
| 3 / 6 | Encounter decision and revised log | Chapter 1 | Compare passage objects from the two fictional accounts. Connect each claim to its speaker/evidence, inspect disagreement and missing information, then select an exchange approach. |
| 4 / 7 | Individual defense of a decision | Empty log | Select a recorded decision and compare one hypothetical alternative under a changed resource or source condition. Preserve the original voyage and label the trial separately. |
| 4 / 8 | Replay, selected evidence and team defense | Chapter 1 | Scrub the available recorded route; select an event to inspect its evidence and before/after resources. Expose incomplete records and a recovery path. Written defense stays in the tutor-side authoring surface. |

### Interaction options considered

1. **Chart investigation:** strongest reuse of map routes, source IDs and the consequence resolver; best foundation for navigation, passage, storm and replay sessions.
2. **Cargo berth experiment:** makes preparation tangible and gives the learner a constraint to manipulate; uses the existing one-load choice and later-choice modifiers.
3. **Source relationship board:** makes conflicting accounts inspectable; useful for encounter and defense, but needs new relationship-state support.

Recommended: the chart investigation as the main reusable workspace, with cargo and source activities in their relevant sessions. All essential operations must support click/select and keyboard input; dragging is optional. Feedback should show modeled resources, route geometry and evidence relationships. It should not invent an ethical score or claim historical validation.

### Reuse and capability gaps

Reuse the existing living map, route definitions, evidence paragraphs, pure `resolveJourneyOutcome`, prior-choice modifiers, runtime completion events, draft/revision storage, persistence adapters and replay timeline. Do not add Voyage-name conditions to shared services.

`TEMPLATE_CAPABILITY_GAP`: the template lacks versioned per-session challenge selection, editable trial conditions with before/after comparison, and persisted source/claim relationships. Add the smallest reusable capabilities with configuration validation, registered events and tests. A visual cargo selector can translate to the existing choice contract. Trial state must remain separate from official records, and later entry must never award prerequisite completion.

The missing Grade 7 mapping is both a curriculum-source gap and a limitation of the current review contract. Captain’s Log placement is a user decision explicitly required by rule 4. Neither gap is solved by adding explanatory text to the activity.

## What already works

- Enter activates map route inspection; desktop details receive focus and show the selected route’s distance, risk and conditions.
- Choosing the Azores with the synthetic water-load history changes the forecast from supplies **95 → 79**, health **92 → 100**, time **2 → 8 weeks**, and chart detail **10 → 25**.
- Cargo, storm and encounter choices produce different resource forecasts. The existing resolver carries earlier preparation into later outcomes; its regressions cover that behavior.
- The encounter evidence explicitly labels its two perspectives as fictional reconstructions, with a third paragraph explaining their limits.
- The completed synthetic voyage opens five replay scenes. Next changes the scene; Play/Pause controls work. This is an interactive map replay, not a verified exported video.
- Draft/record state and immutable curriculum remain separated by the existing engine and adapter architecture.

## Verification, artifacts and limits

- **Scoped Angular development build: passed.** Uses current production Voyage components, configuration, shared lesson navigation and host styles.
- **Existing Voyage tests: 36 passed across 11 files.** Includes domain, package, persistence, map, decision/history/shell, demo and completed-sample coverage. No tests changed or weakened.
- **Standards-source check: passed** for 42 existing standard IDs and 120 lesson evidence checks. This does not establish Voyage alignment.
- **Normal application build: blocked.** The initial attempt exhausted memory. A retry with one compiler worker reached an unrelated missing `./gear-cage/gear-cage.scene` import in `src/app/templates/heist/escape/gear-lock/gear-lock.scene.ts:10`.
- **Architecture check: failed** on existing `core/index.ts → ./templates` and the project-level `projects/mystery-substance/lab-kit/render-quality.service.ts`.
- Browser checks: all eight fresh entries at desktop/phone sizes; all five chapter layouts; synthetic completed replay; keyboard route inspection; resource previews; prediction/explanation/citation placement; configured reasoning-coach behavior; encounter source expansion; phone route disclosure; replay Next and Play/Pause. Temporary viewport override was reset.
- The isolated preview uses memory persistence and no authority, media or AI services. Synthetic prior decisions are generated through the domain engine and labeled audit fixtures. No existing student records were read, edited or submitted.
- Not verified end to end: the full application host, separate project invitation/Final example routes, real classroom collaboration, authenticated submission, microphone recording, durable media or reload persistence. No video was generated or claimed.

Files added: this report and [audit preview entry](../../output/voyage-activity-audit/main.ts), [build configuration](../../output/voyage-activity-audit/tsconfig.json), [test configuration](../../output/voyage-activity-audit/tsconfig.spec.json), [local server](../../output/voyage-activity-audit/serve.mjs), plus generated audit build artifacts. Application files modified: none. Tests added/changed: none. Core contracts changed: none. Existing working-tree changes were preserved.

Reproduce from the repository root:

```powershell
$env:NG_BUILD_MAX_WORKERS='1'
node node_modules/@angular/cli/bin/ng.js build --configuration development --browser output/voyage-activity-audit/main.ts --ts-config output/voyage-activity-audit/tsconfig.json --output-path output/voyage-activity-audit/build
node output/voyage-activity-audit/serve.mjs build/browser
node node_modules/@angular/cli/bin/ng.js test --watch=false --ts-config=output/voyage-activity-audit/tsconfig.spec.json --include='src/app/templates/journey-replay/**/*.spec.ts' --include='src/app/runtime/project-showcase/journey.sample.spec.ts'
node scripts/check-lesson-standards.mjs
```

Preview: `http://127.0.0.1:4319/projects/race-around-the-world/lessons?lesson=1`. Change `lesson` to 1–8 for fresh entries; add `chapter=2` through `chapter=6` only to inspect synthetic prior-progress fixtures. This is an audit harness, not a repaired student experience.

**Next phase:** review this Voyage design, settle the Captain’s Log placement and grade/standards source, then implement and verify Voyage before auditing another project.
