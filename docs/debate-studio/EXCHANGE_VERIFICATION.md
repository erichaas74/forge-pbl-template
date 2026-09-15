# Debate exchange verification

Checked 2026-09-15 for The Fate of the Republic 3.0.0 and Hammurabi on Trial 2.0.0, lesson plans 2.0.0. The active experience follows the [shared build guide](../build/16_DEBATE_STUDIO_TEMPLATE.md).

## Passing checks

- Both the full application development build (`ng build --configuration development`) and the scoped debate build pass. The scoped build compiles the production debate components, project configuration, lesson navigation and compact standards surface.
- All **32 debate tests in 8 files pass**. The final run used one worker and a 30-second timeout after concurrent compilation/test load caused five 5-second timeouts. No assertions were removed. The new recording tests check one-time blob loading, cleanup, explicit review after playback and unavailable-media fallback.
- Standards validation: all 42 standard definitions match the source CSVs; 123 lesson evidence checks pass.
- Both projects: direct entry to all eight sessions on desktop and at 390×844 phone viewport; correct session tasks, no horizontal page overflow, no main-panel text-entry fields, and tasks above the explicitly disconnected tutor. The compact standards row measures 40 pixels.
- Roman browser flow: opening and sources; response linked to an opponent; same-side critique of another author; revision that preserves the original and cites received feedback; ranked performer ballot. Submitted history and ranking survive reload.
- Hammurabi browser flow: all context targets available, private context answer survives reload, opposing response submitted, ranked performer ballot visible. A local one-second diagnostic audio file was attached, played to its end, explicitly reviewed, submitted with a transcript and reopened after reload with a playable stored blob. This is a technical playback fixture, not student or historical speech media.
- Unit checks cover invalid/self/opposing-side critique, exact cited moment, response/revision references, recording review requirement, scoped drafts and practice separation, import/export replay and conflicts, ranking ties and latest-ballot behavior, launcher compatibility, and persistence failure retaining exportable in-memory work.

## Limits and wider workspace checks

- Browser tests used a separate audit tenant and fictional practice participants. They do not prove live delivery between authenticated classmates. Exchange files currently carry submitted text/history, not another browser's recording blobs. See the build guide's production gateway gap.
- Microphone hardware capture was not exercised. Actual local audio attachment, playback and persistence were exercised. No new archival speech videos or primary-document excerpts were embedded by the resource brainstorm; the [document shortlist](STUDENT_RESOURCES.md) records proposed sources and passage selections.
- Earlier full-app builds encountered missing files in unrelated heist/journey work under concurrent development; after those files appeared, the final full development build passed. A wider shared-component test run had two failures in other project fixtures/version mappings; the debate regression suite passes separately.
- The earlier architecture check reported existing core-to-template and mystery-substance package dependency violations; those are outside the debate changes.

Local verification harness, runner configuration and screenshots are under `output/debate-activity-audit/`. The harness uses the actual shared UI and domain components, with a distinct storage scope.
