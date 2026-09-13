# Precision Parking visual vertical slice

Superseded for current courses by the [code-drawn tabletop arena](TABLETOP_ARENA.md).
This document records the legacy workshop renderer, still available for saved trial snapshots.

Current wall treatment: the workshop's machinery perimeter has been replaced with plain
blue, coral, yellow, and purple walls. Only the floor region of the environment texture is
shown; the former foreground machinery crops and pulsing service indicator are removed.
The earlier art inventory and validation below describe the original visual slice.

## Scope and audit

One challenge, Precision Parking, opts into `CourseDefinition.visualTheme: 'workshop'`.
It is the project's initial challenge, has several selectable distances, and exercises
guessing, running, incorrect arrival, successful parking, and recorded replay. Its simple
geometry makes measurement accuracy and visual feedback straightforward to verify.

Before this change, Phaser 4.2.1 already displayed every course through a lazy Angular
host and a presentation-only replay bridge. The robot, racks, floor, and packages were
drawn from Graphics primitives. HTML surrounded the canvas with target distance,
telemetry, directions, camera controls, and a large code library. The course occupied
less than half of the desktop workspace. The SVG map was an accessible fallback.

Preserved: deterministic `robot-execution`, compiler, mathematics, scoring, trial
snapshots, student code, discovery progression, persistence adapters, authentication,
teacher controls, existing replay sampling, and all other challenge rendering.
The map, command editor, guide, keyboard controls, and reduced-motion preference remain.
Prior uncommitted work in the repository was retained.

Implementation: opt-in theme; image-backed workshop and robot; uniform measurement
surface; reusable camera, art, feedback, and HUD systems; larger game area and compact
editor; focused regression tests and browser verification.

## Visual systems and reuse

| System | Responsibility | Reuse |
| --- | --- | --- |
| `SceneArtSystem` | Background, grid, lane, ruler, start/target states, robot/shadow, wheel detail, service indicator, foreground occlusion | Asset composition and robot layers reusable; additional object renderers needed for obstacle/cargo courses |
| `CameraDirector` | Smooth framing, selected objective, full overview, following, zoom, temporary completion focus, restrained impact shake | Reusable now; default bounds currently come from the parking frame helper |
| `GameFXSystem` | Bounded selection, success, failure, and collision response | Reusable now; one Graphics layer, at most eight transient rays |
| `GameHUD` | Objective, recorded-run status, position, heading, time, target distance, final score | Reusable with different objective copy; independent of world-camera movement |
| `GAME_ASSETS` / `SCENE_DEPTH` | Semantic image keys and ordered visual layers | Reusable now |
| `workshopStatus` / `workshopFrame` | Pure presentation functions for result visibility and framing | Independently tested; no simulation writes |

The main camera renders distant scenery; the world camera renders the uniformly scaled
course; a screen-space camera renders foreground crops and HUD. Foreground strips reuse
the environment texture and occlude grid lines behind perimeter machinery. Artwork uses
aspect-preserving cover on narrow screens. Scenery is decorative, not collision geometry.

Robot position and heading use existing recorded interpolation, with exact endpoints.
Wheel marks, chassis motion, camera easing, and bounded arrival effects are cosmetic.
The simulation's constant speeds are preserved rather than visually changing the distance
or duration. Reduced motion disables tread motion, body motion, camera easing/shake,
animated indicator pulses, and traveling effect rays. Pause/seek/reset preserve exact
recorded positions; result visibility follows the final path-sample timestamp.

Success is never inferred from proximity. The scene shows completion and score only at
the recorded endpoint, using `completedMission` and `score` from the saved result.
Backward seeks clear completion; large seeks do not replay camera shakes or bursts.
Failure leaves a distance marker to the selected goal. No decorative effect spends
resources, awards points, or changes student state.

## Assets used

| Semantic asset | Runtime file | Format and dimensions | Status |
| --- | --- | --- | --- |
| `WORKSHOP` | `public/assets/game/environment/workshop-panorama-v1.png` | Opaque PNG, 2048 × 768, about 2.69 MB | Generated panoramic workshop artwork |
| `ROBOT_PLAYER` | `public/assets/game/robot/courier-v1.png` | Transparent PNG, 1280 × 1280, about 1.46 MB | Generated courier sprite |
| Foreground machinery | Cropped regions of `WORKSHOP` | Same texture, no extra download | Reused scene artwork |
| Robot shadow, lane paint, grid, ruler, target, trace, FX | Phaser shapes/text | Dynamic vector geometry | Intentional procedural gameplay graphics |

Both images were created using built-in imagegen. Exact prompts and saved paths are in
`VISUAL_SLICE_ASSET_PROMPTS.md`. No remote assets are loaded at runtime. No major placeholder
illustrations remain in this slice. Procedural moving tread lines are an interim animation
technique; a dedicated sprite atlas is the first art refinement. Existing primitive art
remains in the other challenges and the retained map.

Two image textures, shared foreground crops, bounded Graphics effects, and no physics
bodies or post-processing keep the scene modest. A WebP export and a smaller robot atlas
would further reduce the approximately 4.15 MB of current PNG transfers. Hardware FPS on
actual school Chromebooks has not been benchmarked.

## Prioritized art wishlist

All assets should match the current painted ivory/teal machinery, charcoal rubber/steel,
amber markings, soft bevels, subtle wear, and restrained lighting.

| Priority / asset | Purpose | Dimensions | Background | View | Frames |
| --- | --- | --- | --- | --- | --- |
| P1 `courier-motion-atlas` | Replace tread-line approximation with wheels, braking, arrival and idle animation | 256 × 256 per frame, atlas no larger than 2048 × 2048 | Transparent | Strict top-down, front north | 8 drive, 4 idle, 3 brake, 4 arrival |
| P2 `workshop-modular-props` | Independent service benches, chargers, pipes, foreground beam pieces; stronger depth across aspect ratios | 256 × 256 props; 512 × 128 rails | Transparent | Top-down with shallow painted bevels | Static; optional 4 indicator states |
| P3 `vent-fan` | Subtle equipment motion anchored to machinery | 128 × 128 per frame | Transparent | Top-down | 8 rotation frames |
| P4 `barrier-storage-rack` | Enable Turn Training art while preserving exact rectangular obstacle bounds | 256 × 512, separate shadow | Transparent | Top-down | Static, 2 warning-light states |
| P5 `parcel-and-dock` | Future delivery interaction, pickup and delivered states | Parcel 128 × 128; dock 256 × 256 | Transparent | Top-down | 1 parcel, 3 dock states, optional 4 transfer frames |

## Configuration and limitations

`visualTheme` is an optional, backward-compatible cosmetic field. Omission preserves the
previous renderer. Unknown themes fail validation. The workshop theme currently accepts
straight parking lanes with targets on the start's X coordinate and matching heading;
courses with obstacles, cargo, zones, or checkpoints are rejected so required gameplay
objects cannot silently disappear. Published mathematical requirements are unchanged;
there is no curriculum-version change.

Saved historical course snapshots that omit the theme retain their previous presentation.
New runs capture the opted-in course. Other missions, final-example championship rendering,
and the SVG map use the existing renderer. Unavailable image/canvas/WebGL initialization
selects the explicit map fallback through the existing host status mechanism.

This slice does not implement new checkpoint/cargo effects or an all-purpose prop editor.
There are no new TEMPLATE_CAPABILITY_GAP items for the requested parking challenge.
The pre-existing shared-class competition/backend limitation is unchanged.

## Validation

- Production Angular build passed; unrelated existing component-style budget warnings remain.
- `npm test -- --watch=false --include='src/app/templates/programming-automation/**/*.spec.ts'`: 6 suites, 37 tests passed.
- New tests cover theme scope, unchanged success/failure execution, endpoint-only scores,
  backward seek, rounded elapsed time, all target frames, overview bounds, legacy courses,
  unknown themes, and rejection of unsupported course objects.
- Component tests isolate Phaser's browser canvas probes and supply jsdom's missing
  `scrollIntoView`; the existing SVG assertion now explicitly selects Map view.
- Browser: real Phaser artwork loaded; target switch, failed 120 cm trial (72 cm travel,
  48 cm error), successful 72 cm trial (zero error), recorded HUD score, and replay reset
  checked. Laptop (1366 × 768) and narrow (390 × 844) layouts inspected; no narrow-page
  horizontal overflow. The map and mobile Course/Code switching also worked. A stale
  dev-server chunk fetch occurred during a live rebuild and cleared after reopening
  the route; no Phaser gameplay errors were observed. Browser checks added two local
  practice trials, then restored the 120 cm target and original three-rotation program.
- Repository architecture check is blocked by two unrelated pre-existing violations:
  `core/index.ts` imports `./templates`; `projects/mystery-substance/lab-kit/render-quality.service.ts`
  defines a service within a project package. Neither file was modified by this task.

## Change inventory

Added under `ui/robot-course-engine/`: `camera-director.ts`, `game-fx-system.ts`,
`game-hud.ts`, `scene-art-system.ts`, `scene-assets.ts`, `workshop-renderer.ts`,
`workshop-presentation.ts`, `workshop-presentation.spec.ts`. Added the two runtime PNGs
and this document plus `VISUAL_SLICE_ASSET_PROMPTS.md`.

Modified: `robot-delivery.config.ts`; `domain/automation.models.ts`;
`core/automation-state.ts`; `ui/automation-lab.component.{html,css,spec.ts}`;
`ui/command-editor.component.ts`; `ui/robot-course.component.{ts,html,css}`;
`ui/robot-course-engine/{robot-course-view.ts,phaser-robot-course.component.ts,phaser-robot-course-renderer.ts}`.
Added current-report links to `ART_DIRECTION.md` and `PHASER_UPGRADE.md`.
No dependency or lockfile changes were made for this slice.

Next upgrade: **Turn Training**, after adding a rack image renderer and turning atlas.
It adds one obstacle and meaningful heading feedback while reusing the camera, HUD,
art keys, robot, and effects. Keep its current presentation until that work is complete.
