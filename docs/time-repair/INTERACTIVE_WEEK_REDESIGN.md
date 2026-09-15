# History Time Repair — interactive week redesign

Scope: only `exploration-time-repair` and its Time Repair template. No deployment.

## Map recorded before implementation

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — The impossible cargo | Inspect numbered harbor objects and open the dated sources beside the scene | Choose and test a cargo intervention; compare the changed object and source-based feedback | An inspected scene; a repair trial | Why is this cargo too early? What does a scene prop establish? | Inspections, source cards, intervention history | Scene, hotspot hints, repair choices, retry conditions | Harbor scene with the suspicious cargo, all sources available |
| 2 — Rebuild the record | Move dated event cards into order using buttons and check adjacent chronology | Attach source cards to timeline events; inspect source limits | A chronological sequence; a source-linked timeline | Does 1565 mean the first arrival? Whose knowledge starts the story? | Ordered cards, source links, chronology checks | Event set/order, visible dates, source availability | Scrambled sequence; ordered event cards and all source choices |
| 3 — Follow the consequences | Step through damaged/repaired downstream interpretations | Compare interventions and their downstream changes side by side; replay trials | A ripple comparison; a comparison of repair trials | Which consequences follow? Why does arrival not imply instant adoption? | Chosen intervention, before/after interpretations, source references | Intervention, ripple position, comparison baseline | All three downstream nodes and repair options, no previous authorization needed |
| 4 — Tell the repaired story | Edit illustrated exhibit captions and source credits with a live card preview | Reorder the sample exhibit, edit it, and rehearse a full-screen-in-workspace tour | An illustrated exhibit draft; a local exhibit walkthrough | What can the source support? What remains unknown? | Exhibit revisions, selected sources, panel sequence | Starting exhibit, panel order, image/source selection, tour step | Fully labeled editable sample exhibit with Andean and harbor images |

Every session will state **Do this now**, **What will change**, and **How to check**. Feedback reports observable model behavior, never mastery. Four weeks use scene inspection, sequence/source construction, consequence comparison, and exhibit composition respectively. Group sessions are locally operated prototypes; no shared state is claimed.

## Architecture and working-tree baseline

Read `AGENTS.md`, both interactive-week documents, `docs/build/14_TIME_REPAIR_TEMPLATE.md`, the Robot Delivery reference, existing package/runtime/persistence, lesson entry, and scene/assessment UI. The existing runtime supports one gated repair loop, not unrestricted weekly composition. Add an optional validated `previewWeeks`/exhibit configuration and a separate scoped local preview draft adapter. Reuse existing scenes, hotspots, evidence, mission repair options, ordered nodes, and ripple pairs. Do not bypass or mutate the assessed engine's authorization, charges, verification, or events.

Capability extension: `time-repair.week-workspace` (optional local authoring presentation), with typed session modes, pure sequence/intervention operations, bounded draft/trial state, validated references, renderer components, and tests. No LMS core contract or new backend is needed. Connected tutoring, model adaptation, collaboration, and assessed completion remain deferred.

Baseline already has many concurrent edits. Within this template, `time-repair-page.component.ts` and `.html` already contain lesson-focus and workspace-tools integration; preserve those. The shared lesson registry and lesson-plan JSON are already modified/untracked. Only the assigned lesson-plan object will be replaced after rereading it immediately before writing. No other project configuration, common host, global style, dependency, or lockfile changes are planned.

## Delivery record

Implemented all eight session modes. Desktop uses a 70/30 activity/planning grid. At 980px and below, the activity fills the row; phone controls wrap, and both planning cards collapse with the keyboard. The current action and **How to check** remain visible, with extra change details in a disclosure. Repair controls sit beside the scene so the primary action is visible on a normal laptop.

### Added files

- `src/app/templates/time-repair/domain/time-repair-preview.models.ts` and `.validation.ts`: typed optional authoring configuration, chronology/order operations, reference checks, stored draft validation.
- `src/app/templates/time-repair/runtime/time-repair-preview.runtime.ts` and `.persistence.ts`: isolated local draft state, source links, capped repair replays, editable exhibit, and save/export operations.
- `src/app/templates/time-repair/ui/time-repair-week-workspace.component.{ts,html,scss,spec.ts}`: lesson binding, planning panels, and boundary/regression tests.
- `time-repair-week-scene.component.{ts,html}`, `time-repair-week-timeline.component.ts`, `time-repair-week-ripple.component.{ts,html}`, `time-repair-week-exhibit.component.{ts,html}`, `time-repair-week-source.component.ts`, and `time-repair-week-activity.scss` in the same UI folder: four activity workbenches and focused source disclosure.
- `public/projects/exploration-time-repair/andean-terraces-v1.png` and `archive-desk-v1.png`: generated artwork used with the existing harbor illustration. See [the full prompts and inspection notes](WEEK_IMAGE_PROMPTS.md).
- `scripts/serve-time-repair-weeks.mjs` and `scripts/time-repair-vitest.config.ts`: dedicated port/output and a single-worker test runner to avoid contention with concurrent project builds.
- This project-specific handoff and `WEEK_IMAGE_PROMPTS.md`.

### Modified files

- The assigned `public/projects/exploration-time-repair/project.json`: optional four-week content, sample exhibit, illustration metadata, and per-session image references. Published assessed mission content and project version remain unchanged.
- Time Repair models/validator: optional extension only; missing configuration retains the original engine and UI.
- Time Repair page TypeScript/template: render the new workspace for configured local previews, preserving prior lesson-focus/workspace-tools changes and the legacy assessment UI.
- Time Repair persistence: exclude optional authoring configuration from the assessed definition fingerprint so existing saved records remain valid.
- Time Repair legacy component/engine tests: explicitly omit history preview content in the independent legacy and literary fixtures. No assertions or tests were removed.
- The Time Repair launcher: provide the read-only final-example boundary.
- Only the Time Repair entries in `project-catalog.ts` (sample route and description) and `project-lesson-plans.json` (eight session titles/focus, plan version 1.1.0).
- `docs/build/14_TIME_REPAIR_TEMPLATE.md`: optional authoring contract and persistence boundary.

### Verification

- **Time Repair: 3 files, 29 tests passed.** Covers all eight lesson bindings, correct workbench selection, source links, inspections, repeated trials, replay, direct final access, an actual exhausted assessed record, legacy persistence compatibility, independent literary use, scope isolation, local-only access, invalid configurations, real editor updates, read-only samples, and retained empty captions/order after navigation and reload.
- **Production build passed**, using the dedicated `output/time-repair-week-build` directory. Warnings are in other templates/styles; none originate in the added weekly workspace.
- **Shared integration: 8 passed, 1 failed.** Catalog and lesson registry suites pass. The navigation suite fails on `castle-archive-rescue`: its lesson plan is 1.1.0, but its standards review still targets 1.0.0, so the existing host intentionally hides the mismatched review. This task did not edit Castle content, standards, the shared host, or that test.
- **Architecture check:** two existing violations remain: `core/index.ts` imports `./templates`; `projects/mystery-substance/lab-kit/render-quality.service.ts` declares a project service. Neither file was changed here.
- Initial sandbox checks could not spawn esbuild (`EPERM`); permitted local reruns succeeded. One parallel Vitest run exhausted memory; the dedicated one-worker run completed normally. These were infrastructure failures, not hidden test exclusions.
- Browser checked all eight sessions through the real host, direct read-only final example, scene object inspection/focus, cargo intervention and changed overlay, chronology reordering and feedback, source attachment and focus, ripple toggle/stepping, intervention trial comparison, exhibit editing/reordering/rehearsal, and deliberately empty caption restoration. Browser test edits to the exhibit were restored afterward.
- Responsive checks: 1366×768 laptop (repair button at approximately y=632 before selecting an intervention), 820×1180 tablet (activity width 777px), and 390×844 phone (page width 375px, no horizontal overflow). Both planning panels collapse with Enter. Temporary viewport override is reset after verification. No browser console errors were observed.
- Logs: `output/time-repair-week-tests.log`, `time-repair-week-build.log`, `time-repair-week-integration.log`, and `time-repair-week-architecture.log`.

### Local preview and limits

Run `node scripts/serve-time-repair-weeks.mjs` after the production build if the preview process has stopped.

- [Open Week 1](http://127.0.0.1:4324/projects/exploration-time-repair/lessons?lesson=1)
- [Open the final session directly](http://127.0.0.1:4324/projects/exploration-time-repair/lessons?lesson=8)
- [Open the illustrated read-only sample](http://127.0.0.1:4324/projects/exploration-time-repair/final-demo)

No deployment or publication was performed. The existing template content is reused through optional typed configuration, with no core LMS contract change or project-name branches in generic logic. This is a local authoring preview; the consequence panels are authored interpretations, not a simulation of alternate world history. Browser storage is device-local, not shared or transactional. Tutor questions/evidence/controls are planning content only. No AI review, model adaptation, mastery, completion, or collaboration is implemented.

No new required `TEMPLATE_CAPABILITY_GAP` blocks this preview. Existing classroom-authority and reasoning-review gaps remain deferred. The recommended next phase is review of these actual products and evidence against the intended standards, followed by separately scoped tutor and authoritative persistence integration.
