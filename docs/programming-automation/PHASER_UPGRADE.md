# Robot course presentation — Phaser 4

## Graphics and click-to-add follow-up

Latest implementation and verification: [Precision Parking visual slice](VISUAL_VERTICAL_SLICE.md).
Its report supersedes the deferred-test status below for the robot suite and documents the
single image-backed course, reusable systems, asset wishlist, and remaining limitations.

The code editor now includes a right-side block library grouped into Motion, Turning, Cargo, and Control. Category filters and block colors match the program editor. Only the current mission's allowed commands appear. Clicking a card calls the existing runtime `addCommand` operation, selects the inserted block, reveals it, and focuses its editable value. The add dropdowns were replaced with library actions. “Add inside loop” directs subsequent library clicks to that Repeat block; “Use program end” restores root insertion. Missing/deleted loop targets and mission changes resolve back to the program end. Replay and locked programs disable additions.

The desktop workspace gives the course and the program/library two columns, with the math workbench below. The library stays on the right of the program at wider sizes; at narrow sizes it becomes a contained panel above the program and closes after insertion to reveal the new block. Existing drag/keyboard reorder and loop collapse are retained.

Graphics now include a raised hangar border, overhead light pools, perimeter LEDs, rotating parking rings, dock beacons, rack warning lights, hovering pickup chevrons, a bounded set of atmospheric particles, and recorded pickup/delivery bursts. Package labels disappear when collected. The new effects class owns cosmetic layers and reuses course coordinates and recorded events. Idle ambience updates only the lightweight effects layers at at most 30 fps; recorded runs use replay time, including pause and scrubbing. Reduced motion disables moving rings, motes, and burst particles. No simulation, score, collision, or persistence behavior changes.

Added files for this follow-up: `ui/command-catalog.ts`, `ui/command-palette.component.{ts,html,css}`, `ui/command-palette.component.spec.ts`, and `ui/robot-course-engine/robot-course-effects.ts`. Modified: command editor TS/HTML/CSS, lab CSS, course CSS, Phaser renderer, and this documentation. Catalog exports from the existing editor are preserved for current consumers. Palette specifications cover allowed commands, categories, insertion output, category changes across missions, and read-only behavior; they have not been run. No new capability gaps or public schema changes. Build/test/browser verification remains deferred under the user's earlier instruction; the next step is combined verification after the concurrent upgrades settle.

## Scope and existing architecture

This implements the Robot Code project type's Phaser graphics integration using the existing installed Phaser 4.2.1 dependency. The supplied upgrade plan is design context; its embedded audit-only prompt and future phases are not separate tasks. Validation and repository-wide build/test runs were excluded at the user's request because other Phaser upgrades are in progress.

The audit found an already separated system:

| Concern | Existing authority |
| --- | --- |
| Curriculum, robot settings, course geometry | `projects/robot-delivery/robot-delivery.config.ts` and `CourseDefinition` |
| Blocks, variables, expressions, program checks | `core/automation-compiler.ts` and command editor |
| Mathematics and deterministic execution | `core/automation-math.ts`, `core/robot-execution.ts` |
| Drafts, scores, trials, locking, rehearsal queue | `runtime/automation-runtime.service.ts` |
| Saved snapshots and backend boundary | `persistence/automation.persistence.ts` |
| Recorded runs and playback clock | `runtime/robot-replay.service.ts` |
| Previous rendering | `ui/robot-course.component.*` SVG |

These course and execution contracts remain compatible. No compiler, validation, scoring, curriculum, official attempt policy, or persistence changes are required. The renderer has no backend access. No shared package or lockfile edits were made for this integration.

## Presentation boundary

`RobotCourseView` is a read-only-by-convention view snapshot of course, recorded pose/path/events, and local camera preferences. `PhaserRobotCourseComponent` lazy-loads the renderer after browser rendering and runs Phaser outside Angular's zone. `ROBOT_COURSE_RENDERER` permits replacement or isolated host tests without loading Phaser.

The renderer has a boot scene and a reusable course scene, with separate floor, route, objects, feedback, and robot layers. The same scene presents practice and saved championship rehearsal runs. There is no duplicate command execution or Arcade Physics authority: existing deterministic collision results drive the visual markers and sparks.

Course projection is centralized at two world pixels per centimeter; the camera applies a uniform scale. Coordinates remain north-zero and clockwise. The existing configured targets, tolerance, shelves, packages, delivery zones, checkpoints, and start location build the warehouse. Shelves have raised faces, shadows, crates, and hazard edges; the robot has treads, scanner, lights, shadow, and cargo. All graphics are generated locally with Phaser drawing primitives; no remote assets or artwork dependencies are needed.

The workspace now offers game/map selection, overview, zoom, robot following, and accessible textual course geometry. Context loss, initialization failure, or a startup timeout explicitly selects the retained SVG map. Resize observation handles mobile pane changes. Component destruction removes observers/listeners and destroys the game. Reduced motion disables cosmetic scanner movement and collision effects; the existing replay service still controls autoplay policy.

`core/robot-replay.ts` interpolates displayed position, heading, and battery between stored samples. It does not rewrite a sample, score, or saved result; package ownership and command IDs switch at recorded timestamps. Exact endpoints retain the recorded pose. Replay stepping uses recorded completion events so repeated commands inside loops have distinct boundaries, with a sample-boundary fallback for older recordings. Backward stepping is available beside the existing replay controls.

## Delivery record

Added: `core/robot-replay.ts`, its focused specification, the three files in `ui/robot-course-engine/`, and this note. Modified: course host TS/HTML/CSS, lab HTML/CSS, replay service, implementation note, and art direction note.

Focused specifications cover interpolation, angle wrap, discrete cargo timing, duplicate timestamps, non-mutation, and centimeter projection. They were authored but not executed. Build, type-check, test, and browser validation results are **not available** for this change, as requested.

## Deliberate limits and next phase

This is the graphics/replay upgrade, not all future phases in the supplied plan. The existing local championship rehearsal, comparison UI, and educational sequence are retained. Server-authoritative competition, multi-team broadcast lanes, a new medical-delivery curriculum course, advanced differential-wheel commands, predictive route solving, and a visual course builder are not introduced.

There is no new `TEMPLATE_CAPABILITY_GAP` for rendering existing courses. The existing shared-class championship/backend limitation remains: a real multi-device official competition needs its own authoritative adapter and broadcast implementation. The next integration step is focused browser/build verification after the concurrent Phaser work settles; a future competition phase can reuse this presentation bridge.
