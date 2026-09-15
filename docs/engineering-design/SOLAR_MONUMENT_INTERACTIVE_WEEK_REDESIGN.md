# Solar Monument interactive weeks

Scope: `calendar-monument` only. Read the agreed direction, implementation handoff, AGENTS.md and engineering specification 13 before implementation. The existing engineering page, final example and host already have unrelated changes; preserve those. No other catalog project uses this template. Use port 4326 and `solar-week` output prefixes.

## Map before implementation

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Daily sundial | Change post height, play a day, mark shadow tips | Calibrate morning/noon/afternoon marks and compare seasons | Editable sundial and time marks | Rotation; opposite Sun/shadow directions; fair comparisons | Height, fixed marks, saved times and shadows | Post height, clock, playback, date, location, camera | 60 cm vertical post; available in either session |
| 2 — Solstice windows | Move a misaligned summer window toward a fixed pillar mark | Compare June/December morning light and nearby dates | Two-window alignment build and seasonal trials | Tilt; azimuth; bore depth; limits of date precision | Window positions, pillar targets, light observations | Stone position, rotation, opening size/depth, morning time, date, ray guide | Three-stone solstice-window challenge |
| 3 — Colored-light sculpture | Change a filter and aim a beam at a sculpture | Compare colors and sculpture faces through the day | Colored window installation and light studies | Transmission, absorption, light direction, controlled changes | Filters, sculpture geometry, target colors, saved trials | Insert/color, opening size, sculpture, Sun time, camera | Three color windows and a porcelain crystal |
| 4 — Stone-circle calendar | Arrange gates and place seasonal markers | Run the final calendar through four dates and full days | Editable calendar monument and four-date test collection | Daily/yearly patterns; equinox ambiguity; model limits | Gate geometry, markers, seasonal records and replay | Gate placement, dates, site, targets, timeline, all view settings | Eight-gate stone circle, independent of prior progress |

Each week's two sessions share that week's editable design; four drafts are separate. Session-specific date/time starts apply once, and returning restores the latest recorded context. Empty drafts are valid and never reseeded. Existing assessed drafts and trials remain intact.

## Architecture and delivery

Use a validated optional `previewWeeks` configuration and bounded optional `previewDrafts` snapshot extension. A separate template workspace is selected only with configured weeks in a local preview session. Reuse the installed simulation registry, DesignEditor, measured block builder, and engineering persistence adapter. Preview records use a registered preview event, never `activity.completed`. The last 40 preview trials per week remain replayable; assessed notebook exhaustion does not block preview.

The solar renderer receives an optional weekly-controls input: a compact toolbar with visible day playback, speed, timeline, Sun path, From center and Earth & Sun view. Center-view full-day controls are a preview-only extension; recorded examples retain their original viewing and capture policy.

No core schema, shared navigation, global styles, dependencies, other project entries or assessed gates need changes. No required simulation capability gap; tutoring, assessment, collaboration and physical validation remain deferred.

## Verification record

- Targeted Angular suite: 4 files, 48 tests passed. Covers eight lesson mappings, four distinct starter geometries, planning content, empty drafts, persistence reload, direct final access with 40 assessed trials, immutable preview replay, bounded preview history, configuration rejection and assessed-session isolation. The pre-existing engineering and solar bridge/editor tests also pass. Final log: `output/solar-week-tests-final.log`; isolated test configuration: `output/solar-week-tsconfig.spec.json`. A parallel rerun hit nine five-second scheduling timeouts during concurrent builds; the final run passed all unchanged assertions with one worker and 30-second timeouts configured in `output/solar-week-vitest.config.mjs`.
- Solar scripts passed: scene/controller (including new center full-day playback, speed, overlay and legacy restriction checks), monument geometry, 2,394 independent optical ray comparisons, seasonal review, Sun-day plot, center sunrise, Earth exploration, calendar and sundial checks.
- Solar-only production build passed with a roughly 471 kB initial bundle, using the actual template, renderer, persistence adapter and retained final-demo component. Log: `output/solar-week-isolated-build.log`.
- The full application production build was attempted repeatedly during concurrent edits. The final captured error is an unclosed `else` block in Time Repair's `time-repair-page.component.html`; the build also reports warnings in other projects. Earlier failures in Mystery Substance and Narrative Studio were transient concurrent edits. No files in those projects were changed by this task. See `output/solar-week-build.log`.
- Architecture check reports existing/shared-work violations in `core/index.ts`, `projects/mystery-substance/lab-kit/render-quality.service.ts`, and the then-present `projects/mystery-substance/lab-week-workspace.component.ts`. No new violation is in the Solar/engineering files. See `output/solar-week-architecture.log`.
- Browser: integrated host route opened Lesson 8 directly, displaying its stone circle and correct products/tutor plan. Verified real build editor, ordinary day playback, center full-day playback, synchronized Sun-path overlay, speed/time controls, and Earth view with One day/One year controls. A navigation overlap found during testing was fixed by keeping the primary action row sticky below the host's existing `--project-navigation-height`.
- Stable production preview: opened all eight sessions with keyboard navigation. Changed the sundial to 85 cm, saved a test, switched weeks and returned with the height intact, and replayed the noon trial from the morning session. All three alternate Sun views remain discoverable. Laptop inspection used 1366 px; tablet 820 px; phone 390 px. Phone page width was 375 px and iframe content width 349 px with no horizontal overflow. Both planning panels collapsed through keyboard interaction.
- The read-only Solstice Windows example still opens through the existing final-demo component; its original viewing policy is retained. The weekly final is editable and allows full-day playback.
- After the browser checks, the in-app preview tab crashed and a replacement tab could not attach. The local preview server still returned HTTP 200 with the correct page title. The URL can be opened in an external browser; a final open in the in-app browser could not be verified.

## Files

Added implementation: `projects/calendar-monument/calendar-monument.weeks.ts`; `templates/engineering-design/domain/engineering-preview.models.ts`; and the template's `engineering-week-workspace.component.ts`, `.html`, `.scss`, `.spec.ts`.

Modified implementation: the calendar project config; only its entry in `projects/project-lesson-plans.json`; engineering configuration/snapshot models and runtime; the engineering launcher; solar renderer component TypeScript/template/styles; solar `game.js`/`style.css`; and `scripts/check-solar-scene.cjs`. All source paths are under `src/app` unless otherwise noted. Existing changes in the engineering legacy page, final demo and common host were preserved.

Added delivery assets under `output/solar-week-*`: logs, isolated test/build configs, a small local verification shell, generated production output and a local static server. These do not alter the application architecture. This project-specific document records the optional extension; specification 13 links it.

## Preview and limits

Stable preview: **http://127.0.0.1:4327/?lesson=8**. Its eight-session shell loads only Solar Monument, avoiding disruption from other projects' recompilation. It uses its own local verification attempt. The integrated application route is `/projects/calendar-monument/experience?lesson=8`; the configured launcher selects the same workspace when the whole app builds. Port 4326 was used for integrated verification; the isolated preview uses 4327.

To rebuild the isolated preview, use the command recorded in `output/solar-week-isolated-build.log`'s associated configuration: `node node_modules/@angular/cli/bin/ng.js build --configuration production --browser=output/solar-week-preview-main.ts --index=output/solar-week-preview-index.html --ts-config=output/solar-week-tsconfig.app.json --output-path=output/solar-week-isolated-build`. Serve with `node output/solar-week-server.cjs`. No deployment or publication was performed.

No required capability gap or assessed-schema migration. The optional extensions retain old snapshots and assessed events. Four weekly drafts remain separate from the legacy assessed design; each week's two sessions share its draft. Only the latest 40 preview trials per week are retained. The preview uses sample geometry, direct sunlight and the existing optical model; it does not certify a physical build's accuracy. AI tutoring, automatic review, standards approval, shared team work and completion are deferred.

Recommended next phase: validate these four builds with classroom use, then connect the tutor and shared/authoritative persistence through the existing adapters in a separately scoped task.
