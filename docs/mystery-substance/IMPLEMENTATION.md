# Mystery Substance weekly workspace — delivery record

2026-09-14. Implements only Mystery Substance using the agreed interactive-week handoff. The four-week/eight-session map was written before implementation in [INTERACTIVE_WEEK_REDESIGN.md](INTERACTIVE_WEEK_REDESIGN.md).

## Preview

[Open Week 1](http://127.0.0.1:58875/projects/mystery-substance/lessons?lesson=1)

[Open the final shelf directly](http://127.0.0.1:58875/projects/mystery-substance/lessons?lesson=8)

[Open the recorded final example](http://127.0.0.1:58875/projects/mystery-substance/final-demo)

This is a static local production build, bound to loopback. It avoids build-error overlays caused by concurrent edits. It is not a deployment. To restart it from the repository root, run `node output/mystery-week/serve.cjs build/browser 58875`. The server and logs belong to this project; no other task's preview process was stopped.

## Implemented behavior

- Eight real session selections: optical magnifier, water trial, conductivity, reaction protocol, sealed chamber, open chamber, Bay 3 response, and editable final shelf.
- Approximately 70/30 activity/planning layout on desktop, with responsive stacking and two keyboard-operable collapsible planning panels. Run controls appear above the model in the weekly view.
- Proposed weekly products followed by an explicitly disconnected AI Tutor list with questions, evidence and future manual/model controls. Extra instrument exploration is identified beside the activity and in the tutor plan.
- No explanation, confidence, defense, checkpoint or submission forms in the weekly testing workspace. Shelf labels, locations and handling choices remain editable product controls.
- Session selection updates both the actual instrument and the host's lesson URL/header. Each visited session keeps its component instance, preserving partial measurement work while navigating. Inactive reaction sessions stop their tap/tipping controls.
- Reloads restore drafts through the existing adapter. Trial histories are bounded to 40 records per lab; Bay 3 retains up to 20 earlier attempts. Clearing the sample shelf placement remains cleared after reload.
- Bay 3 retains time costs and calibration dependencies. Its preview restart restores a 25-minute budget and archives the earlier attempt. Simulated response feedback does not complete or assess a lesson.
- Reaction vials have an explicit native Place Vial button as an alternative to dragging. Lab readout regions have distinct accessible names, avoiding duplicate heading IDs across retained sessions.
- Starting content is clearly labeled. The final shelf supplies one editable location only. Bay 3's supplied comparison records are identified as reference data. Chamber instructions compare each trial against its own starting mass; the two scenarios have different baselines.

## Architecture and scope

The existing Mystery Substance launcher branch selects the new feature only for `mode: preview`, `authorityMode: localDemo`, and a non-final-example view. Its assessed feature path and the generic investigation launcher branch retain their existing behavior. The completed-sample host still renders the recorded final example.

The new feature resolves the existing five lab renderers from a typed station map. Project content lives in `mystery-substance-weeks.ts`; `LabWeek`/`LabSession` provide typed configuration with validation for four weeks, two sessions, known stations/tests/chambers and planning content. No LMS core schema or simulation engine was changed.

`LAB_AUTHORING_PREVIEW` defaults to false. The preview uses the existing `WORKSPACE_DRAFTS` adapter behind a separate `lab-week-preview.v1:session-N:` namespace. It does not initialize the assessed investigation service or dispatch completion/submission events. Existing local simulation controls and deterministic outcomes are reused. This continues the existing science feature boundary; it does not claim the legacy science components are a fully generic curriculum engine.

The only shared-file changes are the existing Mystery Substance launcher branch and the Mystery Substance entry in `project-lesson-plans.json`. That entry was re-read immediately before a bounded replacement. Other entries were preserved as raw text. Existing working-tree changes were recorded before edits; the existing feature host TS/HTML and unrelated projects were not edited by this task.

## Files

Added:

- `src/app/features/mystery-investigation/lab-week-workspace.component.ts`, `.html`, `.scss`, `.spec.ts`
- `src/app/projects/mystery-substance/lab-week.models.ts`
- `src/app/projects/mystery-substance/mystery-substance-weeks.ts`
- `src/app/projects/mystery-substance/_lab-preview.scss`
- This record and the project-specific weekly map.

Modified:

- Properties Lab, Reaction Bench, Conservation Chamber and Emergency Response component TS/HTML/SCSS in `src/app/projects/mystery-substance/`.
- `src/app/projects/mystery-substance/station-workspaces.ts` and `.scss` for the editable shelf preview.
- `src/app/features/mystery-investigation/mystery-workbench.spec.ts`: changed the restoration lesson number and explicitly retained the assessed final-gate assertion.
- `src/app/runtime/project-launch/template-launchers/investigation.launcher.ts`: local preview selection in the existing project branch.
- `src/app/projects/project-lesson-plans.json`: only the assigned project's entry, plan version 1.1.0.

Project-specific build scripts, scoped test configs, logs and baseline copies are under `output/mystery-week/`.

## Validation

- Focused suite: **8 files, 66 tests passed**. Includes 16 weekly-preview cases, real station trials, direct later/final entry, empty draft retention, namespace persistence, exhausted incident restart, calibration feedback, partial reaction retention, non-drag placement, validation, and assessed/final-example boundary checks. Log: `output/mystery-week/verified-tests.log`.
- Production build: passed with the repository's existing size budgets. Final log: `output/mystery-week/verified-build.log`. Project station styles remain above the 14 kB warning threshold and below the 24 kB failure threshold; budgets were not changed.
- Shared lesson integration: **7 passed, 1 failed** across two files. The registry tests pass. The all-project navigation test first fails at `castle-archive-rescue` because it expects a standards-review panel for every Grade 4–6 project. That project's plan is now 1.1.0 while its review still declares 1.0.0; `findProjectStandardsReview` correctly rejects the version mismatch. Mystery Substance's revised plan also no longer matches its old 1.0.0 review. Its current tutoring concepts and evidence are in the weekly planning panel; the obsolete assessment review was not relabeled as current. The shared review/test contract needs coordinated follow-up for revised weekly previews. No shared assertion was weakened and no other project's review was changed. Log: `output/mystery-week/integration-tests.log`.
- Architecture check reports two existing violations: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` being a project service. The latter exactly matches the pre-task baseline hash. No new violation remains. Log: `output/mystery-week/architecture.log`.
- Scoped `git diff --check` found no whitespace errors. Existing line-ending notices are unchanged repository behavior.

Earlier runs encountered incomplete files in concurrently edited projects, test timeouts under resource contention, and one compiler process that ran out of memory. These runs are retained in the output logs. The passing focused run used one Vitest worker and one Angular build worker, with no assertion or test-timeout changes.

## Browser verification

- All eight selected activities displayed their intended models and no textarea/checkpoint forms. The host header and URL follow the session selector.
- Direct entry to later sessions and the final shelf worked without previous work. The recorded final example opened as “Case Closed: The Restored Shelf,” with its read-only presentation intact.
- Actual conductivity trial, open-chamber mass change to 123.5 g, shelf-label editing, cleared shelf persistence after reload, and Bay 3 test purchase/restart were exercised. Bay 3 deducted 2 minutes for the optical scan, then restored 25 minutes on restart while retaining the prior result.
- Desktop 1366 × 768: approximately 908 px activity / 389 px planning; Run control around 484 px from the top. Tablet 768 × 1024 and phone 390 × 844 reflowed without horizontal overflow. Phone page content width was 375 px including its scrollbar; activity width was 355 px.
- Keyboard activation and collapsible planning panels were checked. On the final production build, keyboard selection and the native Place Vial button enabled the solution controls; the keyboard-operated measurement nudge changed the vessel reading to 0.10 mL.
- Browser screenshot/mouse dispatch intermittently timed out during concurrent load; DOM geometry, accessibility snapshots and keyboard interactions provided the remaining verification. Temporary viewport overrides are reset at handoff.

## Limitations and next phase

No required `TEMPLATE_CAPABILITY_GAP` remains for this scope. Connected tutoring, automated model control, assessment/mastery, production authority and shared/team state are deferred exactly as requested. The next phase can connect the documented tutor evidence and controls through the existing runtime/adapters, without treating preview trials as completed lessons. The legacy project-code architecture warnings and shared standards-review version contract remain separate migration concerns.
