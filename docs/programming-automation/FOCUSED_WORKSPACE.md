# Robot Delivery focused workspace — 2026-09-14

This pass cleans up Robot Delivery Code Lab only. It retains the existing robot scenes, animation, accessible map, curriculum requirements, command engine, saved versions, and eight-lesson picker.

The working view pairs the course with a short task and the program. The initial Precision Parking prompt is “What number parks your robot on the target?” There is no persistent project header or footer. Map/camera settings, target selection, replay telemetry, command events, optional variables, and saved references open through compact disclosures. Run is beside the editable program. On narrow screens the course and task stack without hiding either behind a separate pane selector.

The block library opens in the program's place after Add block, including inside a Repeat. Adding a block closes the library and focuses its editable value; Back and Escape return to the opener. Block illustrations, allowed commands, inline number slots, drag/reorder controls, variables, and nested commands remain available. Required calculation status remains on each block; duplicate calculation reminder text is removed. Compilation and readiness checks still enforce the evidence requirement.

Watching a run leads to one primary explanation action. The stopped robot and recorded path remain visible when reasoning opens. Observation, calculation, and explanation now appear one at a time, with Back/Continue preserving the values. Opening reasoning still requires an observed trial. Completing a run never completes a mission or confirms academic mastery. Existing calculation checks, evidence linking, mission readiness, and final lock controls retain their behavior.

The workspace stays mounted when viewing evidence or the championship, preserving unfinished math and code. Replay pauses when leaving the workspace. Comparison shows the current response alongside trial evidence; older observations and trial history remain available on demand. Championship rehearsal controls and queue/results are collapsed initially. The later pass described below also simplifies prediction entry and final review while retaining the existing lock and readiness rules.

## Changed files

No new application files or dependencies. Updated the lab shell (TS/HTML/CSS), command editor (TS/HTML/CSS), command palette template, robot course template, math workbench, evidence panel, championship panel, and the Precision Parking mission text in `robot-delivery.config.ts`. The lab component test adds focused checks for palette disclosure, nested insertion/focus, reasoning gates, sequential questions, and draft retention. Existing robot execution, replay, runtime, graphics fallback, and immutable example tests are retained.

Added this note and a local diagnostic `output/robot-cleanup/tsconfig.spec.json` for compiling the robot tests independently of concurrent project work. Curriculum stays in the project configuration; presentation stays in the reusable programming template. No runtime/schema changes, specification exceptions, or new `TEMPLATE_CAPABILITY_GAP` items. Shared classroom authority remains the existing separate host-adapter gap.

## Verification

- Final robot tests: **9 suites / 67 tests passed**, including the two added interaction tests. Both the ordinary robot test selection and the final focused TypeScript test selection passed.
- Final production build: **passed**. Existing stylesheet budget warnings elsewhere remain.
- `git diff --check` passed for the changed project/template/docs paths.
- The first test compilation was interrupted by a concurrent move of a debate stylesheet. Another project's temporary type error also briefly interrupted the development preview. Both recovered without changing those projects here.

Logs live in `../output/lesson-schedule/robot-cleanup-tests-final.log` and `robot-cleanup-build-final.log`.

Browser checks cover the initial desktop view, on-demand block library, actual starter run and result, the observation screen, and narrow layout at a 390px viewport. One local preview trial was recorded; no code answer, calculation, mission completion, or final lock was submitted during browser verification. The browser is returned to the robot workspace and the viewport override is reset.

Next useful step: a student walkthrough of this focused guessing/testing/reasoning cycle, then apply the same depth of cleanup to one more project. The changes here do not claim that all projects have been redesigned.


## Remaining screens cleanup — standards overlay retained

Trial review and the final defense now pair one response with a recorded robot course. The trial comparison starts with three useful measurements; additional metrics, earlier observations, history, and collected portfolio evidence remain in disclosures. Mission completion is a separate review action with the original readiness check. The portfolio has a direct entry in Activity tools, removing the additional evidence navigation strip. Its download still exports the existing complete JSON payload.

Championship preparation shows the course only after its existing reveal gate; while hidden, it labels the student's current practice course. Students enter the planned route and four predictions one question at a time, resuming at the first unfinished question when returning. The review retains all evidence requirements and the explicit native confirmation dialog. Opening that dialog does not lock anything. A recorded final run is shown as recorded, with replay available; finished examples retain their read-only state. Teacher setup, queue, rerun, unlock, and finalization controls remain available under disclosures.

Calibration now presents distance per rotation, turn rate, and measurement explanation separately. Back/Continue preserves each saved value. These controls do not create calculation evidence, grade work, or complete a mission.

The newly added standards overlay, standards sources, annotations, host integration, and review behavior were left untouched. Browser verification on the grade 5 investigation confirmed the overlay still opens with Week 3, source descriptions, and individual lesson checkboxes. No checkboxes were changed. Robot Delivery remains governed by the overlay's existing grade-based coverage policy.

Added application files: `automation-evidence.component.html` and `championship-panel.component.html` (extracted from the existing inline templates), plus `automation-review.component.spec.ts`. Modified the corresponding two component classes, their existing shared `automation-panels.css`, the lab shell TS/HTML/CSS, and the math workbench. Five new component tests cover recorded evidence, explicit mission review, read-only examples, reveal/teacher permissions, guided predictions with separate lock confirmation, and calibration retention. The existing runtime/engine and standards tests remain in place. No runtime, persistence schema, lesson mapping, shared overlay files, dependency, or capability changes.

Validation: **12 suites / 77 tests passed** (72 robot tests and five standards checks). The ordinary robot regression suites are included. Final production build passed; existing stylesheet budget warnings remain. Browser checks cover trial review, the final defense, an unrevealed championship, the recorded championship sample, preserved overlay, and a 390px viewport with equal content/client widths (375px excluding the scrollbar). No student answers, predictions, completion, locking, or additional trials were submitted during this pass. Temporary browser tab and viewport override are cleaned up.

Logs: `../output/lesson-schedule/robot-remaining-tests.log` and `robot-remaining-build-final.log`. This pass is scoped to Robot Delivery's remaining student screens; it does not claim a full redesign of other projects or the shared completed-example wrapper. No specification deviations or new `TEMPLATE_CAPABILITY_GAP` items. Next: classroom testing of the full workflow and a separate focused pass on another project.
