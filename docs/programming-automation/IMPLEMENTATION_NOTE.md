# Robot Delivery Code Lab — Programming & Automation 1.0

The supplied `ROBOT_DELIVERY_CODE_LAB_BUILD_GUIDE.md` is the product specification for this integrated LMS project. It is installed as a local preview, with a reusable template and separate curriculum configuration.

## Open the project

- Opening: `/projects/robot-delivery-code-lab`
- Student lab: `/projects/robot-delivery-code-lab/activity`
- Finished example: `/projects/robot-delivery-code-lab/final-demo`

A fresh learner starts in Precision Parking with a blank program. Training includes Calibration Garage, Precision Parking, Turn Training, Coordinate Courier, Variable Upgrade, Warehouse Pattern, Battery Emergency, and Cargo Delivery. A ninth mission is the Robot Command Championship.

## Implemented experience

The course, code, and math workbench share one workspace. Students add movement, rotation, turning, wait, pickup, delivery, and repeat commands. Named variables live above the program; expressions support arithmetic, decimal values, fractions, and mixed numbers. Commands can be reordered by dragging or keyboard buttons, duplicated, disabled, removed, and nested inside collapsible loops. The runtime retains command errors and highlights the source block during replay.

Students enter a calculation answer and explanation before checking it. Checked and revised calculations are preserved. Links validate the command value, unit, and recomputed mathematics. Practice permits missing math links with warnings; mission completion and championship locking require the relevant correct evidence and a successful test of the current program version. The notebook supports measured wheel travel and turn rate, a debugging explanation, trial comparison, and an engineering defense.

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

## Release boundary

This release is a **local classroom rehearsal**, explicitly labeled in the championship panel and catalog. Shared multi-student queues, authenticated teacher authority, durable classroom submission storage, and server-authoritative scoring require a host adapter. The launcher rejects `serverAuthoritative` sessions instead of substituting browser authority. There is no physical robot integration, full physics engine, or networked live leaderboard. Portfolio download is JSON; it does not claim to be a PDF or submitted classroom grade.

## Validation

Tests cover all example routes, deterministic execution, thin-obstacle collisions, fractions, variables, bounded loops, math readiness, battery exhaustion, cargo reset, student storage isolation, tab conflicts, immutable locks, technical reruns, teacher permissions, finalization, sample isolation, dropdown state, keyboard ordering, and catalog/intro registration. Browser verification exercises calculation → evidence link → parking run and inspects the completed two-delivery replay. Production build passes; existing style-budget warnings remain in other templates. The architecture checker reports its two pre-existing violations in `core/index.ts` and the Mystery Substance render-quality service.
