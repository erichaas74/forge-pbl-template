# History picture forgery — interactive week redesign

Assigned project: `shadow-gallery` / The Cartographer’s Vault, restoration package 2.0.0. Read the agreed direction, implementation handoff, AGENTS.md, architecture and testing specifications, and restoration implementation before coding. 2026-09-14.

## Plan recorded before implementation

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Look inside the picture | Inspect shore image hotspots; play/pause a scene film and jump from a film clue to the matching image detail; remove the horse layer | Investigate the island inscription, compare place references, relabel the image and keep supported context | Annotated shore image and corrected island picture | Observation versus inference; time/place; whose perspective is missing? | Selected details, pinned sources, visible edits | Hotspot cues, selected scene, source set, film cue | Original teaching reconstructions, no prior progress |
| 2 — The time detective’s workshop | Compare sextant and compass image layers on a navigator’s desk; use a before/after wipe | Investigate the marine clock, try repairs, undo, and replay saved versions | Instrument comparison and a sequence of restoration trials | Anachronism; source relevance; object availability versus appearance | Object choices, source cards, trial images | Object options, guides, source set, comparison and replay | Original instrument layers ready to edit |
| 3 — Repair the historical record | Inspect the departure register within the harbor image; repair its date inscription | Investigate cargo origins in the market; revise labels and compare the complete image | Corrected voyage record and cargo label | Chronology; origin versus destination; claims versus evidence | Inscription versions, source selections, preserved context | Work selection, evidence, image layers, film cues | Original harbor/market records ready to edit |
| 4 — Curate the recovered gallery | Restore a new coastal clock scene and save a comparison for exhibition | Arrange restored pictures into a visual exhibition, edit real museum captions, preview and download | Before/after collection and illustrated exhibition | Explain change and continuity; qualify uncertainty; limits of reconstruction | Image sequence, captions, sources, trial history | Exhibit sequence, paintings, sample selection, manual model controls | Explicitly labeled sample exhibition; no completion or historical-authentication claim |

All sixteen commissions remain available in an extra-work selector. Selected lessons determine their actual initial painting and activity. Each lesson has three short action directions adjacent to the image. Media are animated classroom illustrations, not archival footage or historical proof. Text is retained for captions, directions, sources, and accessible equivalents; the primary actions operate on images and film cues.

## Capability and ownership audit

`TEMPLATE_CAPABILITY_GAP`: the assessed restoration editor couples image repairs to explanation/submission forms and locked recovery. It has no weekly film-cue inspection, image wipe, version replay, or freely editable exhibition preview. Add a reusable optional `restoration.preview-weeks.v1` capability in the Heist restoration family, with typed configuration/validation, a local preview runtime and scoped persistence adapter, and a reusable weekly component. Reuse the existing layered painting renderer, restoration edit/undo transitions and export renderer unchanged. Do not add project-name branches or modify core contracts.

The shared Heist launcher also serves Castle and other missions; add only the restoration branch dispatch, immediately re-reading the file before patching. Do not edit escape, gallery, generic Heist, shared painting/encounter components, global styles, dependencies or navigation. Existing dirty restoration collection UI files belong to earlier navigation work and will stay untouched. The lesson-plan catalog receives only the shadow-gallery entry update.

Baseline: repository has many concurrent tracked/untracked changes, including host/navigation, escape, restoration collection UI, robot, debate, news, exhibit, time repair and other project files. No reset or reformat is authorized. Task output prefix: `shadow-week`; preview port: **4367** (4327 was already occupied by another task). No publishing or deployment.

The local preview gets separate saved drafts; old assessed locked/exhausted history is retained and cannot gate it. Samples initialize only absent state. Empty captions and empty exhibition selections are meaningful saved edits. Assessment submit/justify actions are not exposed or accepted in the preview. AI Tutor remains an explicitly disconnected planning list. Group sessions are a classroom activity framing, with no shared-state implementation.

## Delivery and verification

Delivered and verified locally, 2026-09-14.

### What changed

- Eight sessions select their actual painting and tool mode from lesson number. All sixteen commissions remain accessible. Three concise directions sit beside the activity tools.
- Image hotspots open a focused repair panel. Keep, remove, replace and relabel actions change the real image composition. Zoom, guide outlines, original/reconstruction wipe, undo, saved image versions and comparison PNG export work.
- Eight local 720 × 720, 12-second MP4 inspection films use the existing illustrated atlas and object layers. They include camera movement, timed detail outlines, WebVTT captions, full on-page transcripts, native playback/seek controls and inspection buttons that open the matching picture region. They are explicitly classroom reconstructions, not archival footage. The 16 media files total approximately 3.94 MB. Caption size leaves the picture visible. Films have no audio track.
- The exhibition supports image selection, keyboard-accessible ordering, real museum captions, presentation mode and standalone illustrated HTML download. Originals and reconstructions appear together. Sample captions are seeded only with their matching untouched sample images, never attached automatically to a different prior edit.
- Separate local preview persistence retains images, deliberately empty captions, empty exhibitions, selected extra commissions, pinned sources, bounded image-version history and film positions. Bad existing saves are preserved with an explicit temporary-work message; storage errors leave the in-memory draft downloadable.
- No explanation/defense/checkpoint forms, submit actions, mastery, locks, completion or fake shared editing are exposed in the preview. Proposed products and the disconnected AI Tutor box vary by week and both collapse on small screens.
- Session changes reveal and focus the new heading below the sticky navigation. Laptop, tablet and phone controls reflow without scaling down the desktop interface.

### Files and ownership

Added:

- This project-specific plan/handoff.
- `docs/heist/configure-shadow-weeks.mjs` — reproducible project content and a narrow replacement of only the shadow-gallery lesson entry.
- `docs/heist/render-shadow-week-films.mjs` — local FFmpeg media composition using existing assets; temporary files stay under `output/shadow-week-media`.
- `docs/heist/preview-shadow-weeks.mjs` — localhost-only static preview with video range support.
- `public/projects/shadow-gallery/weekly/scene-1` through `scene-8`, each `.mp4` and `.vtt`.
- `src/app/templates/heist/restoration/weekly/`: preview models, validation, persistence adapter, runtime, film component, weekly component (`.ts`, `.html`, `.scss`), plus validation, workspace and launcher-boundary test files.

Modified:

- `public/projects/shadow-gallery/versions/2.0.0/project.json`: optional preview configuration only; the original sixteen commissions and assessed rules remain intact.
- `src/app/templates/heist/restoration/restoration-collection.models.ts` and `.validation.ts`: optional typed capability and validation hook.
- `src/app/templates/heist/restoration/restoration-collection.runtime.ts`: exclude optional preview content from the assessed-save signature so adding this workspace does not invalidate earlier assessed saves.
- `src/app/runtime/project-launch/template-launchers/heist.launcher.ts`: only the eleven-line restoration preview dispatch. Concurrent Castle/escape edits were preserved.
- `src/app/projects/project-lesson-plans.json`: only this project's entry. Legacy `focusTarget` values remain recognized by the assessed UI; the new workspace maps the actual painting/activity by lesson number.

Existing restoration collection UI, shared painting renderer, restoration transition engine/export renderer, encounters, escape components, host, navigation, global styles, dependencies, lockfile and other project entries were not edited by this task.

### Capability contract and reuse

`RestorationMission.previewWeeks` optionally declares `restoration.preview-weeks.v1`: exactly four ordered weeks, two sessions per week, valid work/region references, a supported activity mode, three-step content, local film/caption assets with ordered cues, tutor planning lists, and validated sample image choices. Unsupported capability IDs or malformed references produce `INVALID_RESTORATION_PREVIEW` before launch. The Heist launcher's restoration branch registers the renderer for configured local preview sessions; both launcher authority checks and the preview runtime enforce the boundary.

The new runtime composes the existing framework-independent inspect/edit/undo transitions and layered painting renderer. It rejects assessment actions. Published configuration remains immutable; drafts live behind a scoped adapter, with separate keys from assessed records. Saves occur for meaningful actions, caption blur/navigation and film pause/navigation, not video frames or every text keystroke. No core LMS schema changed. The capability gap reported in the plan is resolved by this reusable optional extension, with no project-name branch in the runtime.

### Verification results

- Restoration, renderer and launcher suite: **8 files, 33 tests passed** (`output/shadow-week-tests.log`). Covers all eight mappings, image-layer changes, wipe/replay state, direct final entry with an old locked/exhausted save, empty-draft reload, sample safeguards, extra-painting selection, source pins, exhibition ordering, invalid configuration/saves, authority isolation and legacy routing.
- Focused save-compatibility check: **2 files, 8 tests passed** (`output/shadow-week-save-compatibility-tests.log`). Includes an assessed save written before preview configuration and read afterward without reset.
- Final UI regression check after film repair controls were made to reveal the changed picture: **1 file, 7 tests passed** (`output/shadow-week-final-ui-tests.log`). These are reruns of tests included in the full suite, not extra unique tests.
- Final strict Angular production build **passed** into `output/shadow-week-build` (`output/shadow-week-build.log`). No new component-style warning for this workspace; existing style-budget warnings remain in other components.
- Build environment recovery: the initial sandbox blocked Angular/FFmpeg subprocesses with `spawn EPERM`; approved process execution resolved that. A concurrent production build then hit system memory limits. Serial builds with `NG_BUILD_MAX_WORKERS=1`, `GOMAXPROCS=2` and a 2048 MB Node heap completed. No tests or budgets were weakened.
- Architecture check still reports the existing `core/index.ts -> ./templates` dependency and `projects/mystery-substance/lab-kit/render-quality.service.ts` project-service violation. Both are outside this task and untouched (`output/shadow-week-architecture.log`).
- Browser verification used Chrome after the in-app browser could not attach. All eight session activities opened. Verified a visible horse-layer removal, before/after control, version save, 12-second film playback (720p, caption track loaded), seek to six seconds, film-to-picture region selection, gallery reordering, deliberately empty caption retained via keyboard and session return, presentation mode, and successful illustrated exhibition download. No console errors in the final preview.
- Layouts inspected at **1366 × 768**, **768 × 1024** and **390 × 844**, with no horizontal overflow. Phone activity buttons measured 48 px tall; both planning boxes collapsed. Final-build session focus verified on laptop (heading at 130 px below the top) and phone (260 px, clear of the taller navigation). Temporary viewport override was reset.
- Final diff check found no whitespace errors in the scoped changes. Existing parallel work was retained. No deployment/publishing occurred.

### Preview and remaining boundaries

Working local preview: **http://127.0.0.1:4367/projects/shadow-gallery/experience?lesson=1**. Direct final session: **http://127.0.0.1:4367/projects/shadow-gallery/experience?lesson=8**.

To restart the preview, run `node docs/heist/preview-shadow-weeks.mjs` from the repository root after building to `output/shadow-week-build`. It binds only to 127.0.0.1 and serves this task's separate production output.

The catalog's separate **Final example** button was already disabled for this project; no recorded final-example configuration was invented. Existing legacy/final-demo template dispatch is preserved and tested. The usable final product in this redesign is the directly accessible Week 4 exhibition.

The films animate teaching illustrations; they are not newly filmed historical scenes or new character-driven 3D environments. Connected tutoring, automatic adaptation, standards approval, assessed completion and shared editing remain future work. A later phase can connect the tutor to the declared controls and inspect the retained image/source/caption evidence.

## Coastal scene extension
The first commission now has a separate panorama investigation with three repairs. See [the coastal implementation record](COASTAL_PANORAMA_IMPLEMENTATION.md) for the current preview on port 4369, 37 passing tests, media provenance, and the explicit pending video/live-AI capabilities. The older port 4367 build predates this extension.

