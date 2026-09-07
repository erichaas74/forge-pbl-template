# Robot Delivery Code Lab — Programming & Automation 1.0

The supplied `ROBOT_DELIVERY_CODE_LAB_BUILD_GUIDE.md` is the product specification for this integrated LMS project. It is installed as a local preview, with a reusable template and separate curriculum configuration.

## Open the project

- Opening: `/projects/robot-delivery-code-lab`
- Student lab: `/projects/robot-delivery-code-lab/activity`
- Finished example: `/projects/robot-delivery-code-lab/final-demo`

A fresh learner starts in Precision Parking with a runnable, deliberately incorrect rotation guess. The first four missions (Calibration Garage, Precision Parking, Turn Training, Coordinate Courier) supply starter blocks and highlight one number to guess. Variable Upgrade, Warehouse Pattern, Battery Emergency, Cargo Delivery, and the Robot Command Championship start blank so students build their own programs using the command reference.

## Implemented experience

The course, code, and math workbench share one workspace. Students add movement, rotation, turning, wait, pickup, delivery, and repeat commands. Named variables live above the program; expressions support arithmetic, decimal values, fractions, and mixed numbers. Commands can be reordered by dragging or keyboard buttons, duplicated, disabled, removed, and nested inside collapsible loops. The runtime retains command errors and highlights the source block during replay.

Each challenge follows guess → run and watch → open reasoning → revise. The workspace initially shows course and code; math, formulas, and math-link reminders remain hidden until a recorded practice run is viewed to its end (playback, stepping, or scrubbing). Students then explicitly open reasoning. A successful first guess also unlocks explanation, so students never need to fail deliberately. Replay controls support reduced motion, and saved unobserved trials can be reopened. Completed or locked legacy work and the finished sample retain math access.

Reasoning starts with observation questions and blank calculation fields. Formulas are tucked inside an optional hint; checking a wrong calculation gives revision guidance without printing the expected answer. Checked and revised calculations are preserved. Links validate the command value, unit, and recomputed mathematics. Practice permits missing math links, with reminders shown after reasoning opens; mission completion and championship locking still require the relevant correct evidence and a successful test of the current program version. The notebook supports measured wheel travel and turn rate, a debugging explanation, trial comparison, and an engineering defense.

The simulator uses centimeters and a north-zero clockwise heading system. One-centimeter movement steps prevent crossing thin obstacles. Battery use, loaded speed, package ownership, delivery zones, checkpoints, parking error, and heading requirements are deterministic. Runs stop at a collision, exhausted battery, or the 600-second simulation limit. Compilation limits programs to 100 blocks, four nested loop levels, 20 repeats per loop, and 500 expanded commands. No arbitrary JavaScript or Python is evaluated.

Each trial captures code, variables, math, predictions, robot measurements, course geometry, result metrics, and compact timed path samples. Replays have play, pause, reset, speed, step, and scrubbing controls. Reduced-motion preference prevents automatic playback. Replay code is read-only and cannot silently change the current draft through a math link. Changing missions in the finished example selects that mission's recorded successful run.

The championship includes course reveal, practice limits, route and numerical predictions, confirmed immutable locking, a launch queue, pause/resume, standings, reasoned unlocks, technical reruns, finalization, and an audit history. A rerun preserves the original result and uses the same locked version. An unlocked version leaves standings without deleting its evidence. Finalized results cannot be reopened. Performance weights are 35 delivery / 20 navigation / 20 efficiency / 15 reliability / 10 prediction. Prediction considers distance, total turn angle, time, and battery. Individual mathematics evidence remains separate from competition points.

The portfolio view and downloadable JSON are generated from the learner's existing records. The completed example contains successful evidence for all eight training missions and the championship, plus a failed championship trial. The final route travels 800 cm, delivers both packages, and returns with zero parking error and zero collisions. The original return variable produces a 20 cm error; the revised version corrects it.

## Architecture and storage

- `templates/programming-automation/domain`: contracts only.
- `templates/programming-automation/core`: pure math, compilation, validation, and deterministic execution.
- `templates/programming-automation/runtime`: state mutations, readiness, competition policy, replay clock.
- `templates/programming-automation/persistence`: validated, scoped browser records and concurrent-tab conflict detection.
- `templates/programming-automation/ui`: course, command editor, math, trials/portfolio, championship, and composition shell.
- `projects/robot-delivery`: curriculum, opening, course data, and fictional sample content.
- Runtime registries lazy-load the definition, template, and finished sample through the existing host.

Browser storage is scoped by tenant, project, version, class, actor, team, and attempt. Save failures remain visible, and conflicting edits from another tab cannot silently overwrite the notebook. Finished samples use disposable in-memory providers and never read or write student storage.

The optional challenge `discovery` configuration holds starter commands, the focus command ID, introductory instructions, a reasoning prompt, and the suggested math tool. Validation requires runnable code and a valid focus command. Drafts optionally persist `observedTrialId` and `reasoningOpened`; schema 1.0 remains compatible. Loading old untouched blank drafts seeds cloned starter blocks, while edited programs, trials, predictions, and reflections are preserved. Curriculum remains in the project package; disclosure and observation behavior belong to the reusable template. No new dependencies or template capability gaps were introduced.

## Release boundary

This release is a **local classroom rehearsal**, explicitly labeled in the championship panel and catalog. Shared multi-student queues, authenticated teacher authority, durable classroom submission storage, and server-authoritative scoring require a host adapter. The launcher rejects `serverAuthoritative` sessions instead of substituting browser authority. There is no physical robot integration, full physics engine, or networked live leaderboard. Portfolio download is JSON; it does not claim to be a PDF or submitted classroom grade.

## Validation

The guess-first update changes the project curriculum config and the template's domain, initialization/validation, persistence, runtime, lab shell, command editor, and math workbench; no new files or dependencies were needed for this update. Three existing test files were extended. All 22 robot-template tests pass, including all example routes, four unsuccessful runnable starters, later blank programs, invalid discovery configuration, per-challenge observation gating, successful first guesses, legacy draft preservation, math feedback, immutable evidence, and the completed sample. Browser checks verify immediate starter execution, the hidden math panel, opening guidance with blank answers, focus and scrolling to the robot and reasoning, preserved saved work, and no horizontal overflow. Production build passes with existing style-budget warnings in other templates.

This is an optional extension to schema 1.0, with no breaking architectural changes or specification deviations beyond replacing the original math-first sequence as explicitly requested. No new `TEMPLATE_CAPABILITY_GAP` items were identified. The next useful step is a classroom trial of the guess-and-revise sequence; shared classroom authority remains the separate host-adapter phase described above. The architecture checker previously reported two unrelated violations in `core/index.ts` and the Mystery Substance render-quality service.
