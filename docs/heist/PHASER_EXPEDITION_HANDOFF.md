# The Midnight Menagerie — Phaser expedition, version 3

`/projects/castle-archive-rescue` now launches a playable Phaser 4.2.1 animal-rescue
expedition. The player walks a painted castle, operates mathematical mechanisms,
opens cages, and leads the rescued animals to the river. This replaces the version
2 SVG/CSS map for the current package. Angular supplies the accessible controls,
HUD, journal, settings, and opening/ending; Phaser renders the world, characters,
animals, lights, particles, water, camera movement, and mechanism close-ups.

The user's final scope is **single-player now, with design that accommodates
multiplayer later**. There is no online co-op, room UI, socket service, backend
deployment, or networking dependency in this change.

## Play

Use WASD or arrow keys to walk along courtyard paths. Click/tap a path to navigate,
select a numbered world beacon, or choose **Walk to clue** to approach the current
mechanism. Press E or choose Inspect when nearby. Path finding routes around
non-walkable areas. Only the current mathematical mechanism can advance progress.
Solving a mechanism reveals its explanation; Continue returns to exploration.

| Step | Math | Answer and effect |
| --- | --- | --- |
| Gate | Connected fraction, decimal and mixed-number scales | 3/4 = 1/2 + 1/4; 1.5 = 0.75 + 0.5 + 0.25; 2 1/2 = 1 3/4 + 3/4. Alternative exact balances also work. |
| Lookout | Elapsed time and subtraction | Latest start **25 s**; 25 + 10 = 35 |
| Rabbit feeder | Equal groups | 6 × 2 = **12 carrots**; release six rabbits |
| Fox lock | Fraction multiplication and compound gear motion | A = **36 teeth**, B = **24 teeth**, crank = **3 turns**. Starts a six-module release run and frees four foxes. |
| Owl lift | Equivalent fractions on the stone scale | **5/6 = 1/2 + 1/3**; release two owls. |
| Bridge | Length and unit conversion | 6 × 50 cm = **3 m** |
| Water | Fractions of a quantity | One quarter of 12 = **3 bowls** |
| Boat | Division and capacity | 12 passengers / 5 spaces needs **3 outward trips** |

The patrol clock lets the student choose a simulated departure time; it is not a
reflex timer. The moving lookout supplies atmosphere. Wrong answers keep the
mechanism locked and provide a clue without losing rescued animals. All math
controls support keyboard operation and do not require dragging. The narrow
layout uses a scrolling bottom panel with the world still visible above it.
Sound and reduced-motion controls are available in Pause. Pause mutes audio,
freezes world movement, isolates the dialog with `inert`, and traps keyboard focus.

## Reusable capability and boundaries

The new reusable capability is **`heist.expedition`**, selected by an optional
`world` field on an existing `experience: "escape"` package. This resolves the
capability gap between a step-based escape UI and walking, path navigation,
multiple actor presentation, and animal following. Project names, story, math,
map geometry, assets, and release points remain in versioned JSON configuration.

- `escape/domain/expedition.models.ts`: world, player presence, draft, and input
  contracts. `animalFrames` optionally supplies normalized painted sprite crops.
- `expedition.navigation.ts`: framework-independent path finding, frame bounds,
  normalized keyboard movement, and walkability. It does not depend on Phaser.
- `expedition.validation.ts`: asset rules, geometry bounds, node references,
  crop bounds, spawn walkability, and reachability of every mechanism.
- Existing `EscapeEngine` and registered evaluators remain the source of truth
  for mathematical answers, attempted answers, releases, and progression.
- `runtime/expedition-runtime.ts`: local player identity, navigation, proximity
  checks, phase transitions, and translation of inputs into engine commands.
- `game/expedition-scene*.ts`: lazy Phaser renderer with separate world and unzoomed
  close-up scenes behind snapshot/callback
  contracts. `expedition-actors.ts`, `expedition-mechanisms.ts`, and
  `expedition-audio.ts` isolate actor, mechanism, and sound presentation.
- `expedition/expedition.component.*`: accessible Angular shell; injected scene
  loader permits UI tests without importing a real WebGL renderer into jsdom.
- `runtime/project-launch/template-launchers/heist.launcher.ts`: configuration
  routing and session-scoped dependency composition.

Future multiplayer can supply a collection of identified players to the scene.
`receivePresence` accepts bounded presentation snapshots and cannot grant answers
or releases. An intent contract includes player ID, request ID, and expected
revision. Existing idempotent engine envelopes and persistence adapters remain
separate from player presence. A later multiplayer implementation must add an
authenticated authority/transport adapter, revision conflict handling, reconnect
behavior, and server-side outcome validation. These services are deliberately
outside this single-player implementation. Official server-authoritative launches
continue to report `CAPABILITY_NOT_INSTALLED` instead of pretending to be shared.

## Saves and compatibility

Local checkpoints record engine commands using the existing injected persistence
adapter. Keys include tenant, class, actor, team, attempt, project, and version;
the exact package fingerprint rejects incompatible histories. Reload returns the
rescuer to the current mechanism's checkpoint, preserving solved math and animal
releases. Walking position and unfinished control drafts are transient. An
unreadable save is preserved until an explicit fresh start. Storage failures show
a warning and do not silently claim that progress was saved.

The project version is **3.2.0**. Schema 1.2 and template heist@1.0 remain compatible
because world geometry and number visualizations are optional additions.
`castle-escape-v2.fixture.json` preserves the complete version 2 package for
regression tests; non-world escape packages still use the old escape component.
The guided 1.1.0 fixture, planner, and gallery remain available. No core LMS schema
or unrelated project code was changed for this expedition.

## Artwork and provenance

Four new images were generated with the built-in image generation tool and
copied into the project as optimized WebP assets. No image-generation CLI or
external stock-art download was used. Source PNG files remain under
`C:/Users/erich/.codex/generated_images/01a09829-4287-7680-9344-d0ad615c288e/`.
Pillow performed format encoding; alpha is preserved. Sprite crop rectangles are
authored render metadata in the project package, not runtime bitmap edits.

| Project asset | Source PNG | Generation brief |
| --- | --- | --- |
| `public/projects/castle-archive-rescue/art/v3/castle-world.webp` | `exec-919c953a-b3f7-4c7a-9f08-df1e6fb91fe8.png` | Detailed painted fantasy castle courtyard at moonlight, overhead three-quarter game camera, cobbled walkways, rabbit courtyard, fox den, owl tower, central fountain, moat, wooden bridge and river boat; warm lanterns, cool teal shadows; no interface, labels, or characters. |
| `public/projects/castle-archive-rescue/art/v3/animals.webp` | `exec-04310a60-21ba-4c70-bbbb-7510c8deed3d.png` | Transparent game sprite sheet, four poses per animal in three rows: rabbits, foxes, owls; right-facing and front-facing idle/moving poses; charming detailed painted bodies, matching castle lighting. |
| `public/projects/castle-archive-rescue/art/v3/mechanisms.webp` | `exec-cc2ac22a-3b4b-49a5-a72a-9c3975c87029.png` | Transparent 2 × 2 painted prop atlas: brass/oak three-window combination lock, ornate clock without hands/numerals, closed animal cage, matching open cage; consistent perspective and materials. |

| `public/projects/castle-archive-rescue/art/v3/boat.webp` | `exec-bccdabca-5836-4cbe-a027-021686bb65a1.png` | Empty weathered wooden rowboat, transparent alpha, high overhead three-quarter perspective, bow left, warm oak gunwales and walnut planks, brass fittings, moonlight with warm lantern bounce; no water, dock, text, or passengers. |

The existing `art/characters.webp` supplies directional rescuer and lookout
frames. Synthesized footsteps, mechanism chimes, and quiet wind are original
Web Audio effects, started after the player's initial gesture. Decorative
particles, balance beams, counters, and boat motion are drawn by Phaser.

## Verification

- Production Angular/TypeScript build passes. Existing stylesheet-budget warnings
  remain in other templates; the new expedition stylesheet is within budget.
- Complete Heist suite: **89 tests pass across 15 files**. Coverage includes walking every route, math at all eight
  steps, proximity/phase/pause checks, duplicate handling, releases, saved
  checkpoints, malformed world data, peer presentation isolation, renderer
  failure UI, focus/pause isolation, and older package routing.
- Browser playthrough completed all eight mechanisms and reached **12 / 12 HOME SAFE**.
  Verified incorrect timing (26 s) and insufficient boat capacity (2 trips),
  painted world and opening cages, walking animal followers, saved checkpoint
  restoration, laptop layout at 1365 ? 900, and phone controls/pause at 390 ? 844.
  After isolating the close-up camera, clicking the painted dial changed the
  corresponding HTML value and clicking a painted rabbit marked its matching
  accessible counting control. A courtyard click moved the rescuer away from
  the gate and changed the proximity prompt. The final browser console was clear.
  The final rendering/asset changes were rechecked with the focused escape and
  launcher suite: **22 tests across 7 files passed**. A fresh opening screen is
  left in the deliverable tab.
- `npm run test:architecture` still reports two pre-existing findings:
  `core/index.ts -> ./templates`, and the project-local
  `projects/mystery-substance/lab-kit/render-quality.service.ts`. Neither belongs
  to this change; no new expedition finding is reported.

Local stable production preview: `http://localhost:4219/projects/castle-archive-rescue`.
Build output is `../output/animal-rescue-build`; the loopback-only preview helper
is `../output/rescue-preview.py`. The shared development server can continue
serving the route normally. No deployment was performed.

Phaser camera/container behavior was checked against the installed 4.2.1 source
and the [official container documentation](https://docs.phaser.io/api-documentation/class/gameobjects-container).

## Grade-five entrance correction (3.1.0)

The first mechanism uses three supply-ledger calculations rather than animal counting. The rescuer starts on the exterior approach at (155, 945), with the lock outside at (215, 885). Optional `world.pathLocks` references existing navigation edges and a mission step; unsolved edges are excluded from mouse routing and keyboard walkability. Solving the step opens the passage, restore reapplies solved locks, and reset closes it again. Validation checks references and sequential reachability. Older definitions without locks retain their navigation behavior. No networking or new service is introduced.

Validation for 3.1.0: production build passed (existing unrelated stylesheet budget warnings); all 90 scoped heist tests passed across 15 files. Browser confirmed the rescuer on the exterior gate approach and the new three-part ledger puzzle. No new files or capability gaps; configuration, optional world contract, navigation/runtime, three test files, and this handoff were updated.

## Balance workshop (3.2.0)

See `BALANCE_LOCK_PLAN.md`. The entrance and owl mechanisms now use the registered `balance-lock` evaluator and dedicated Phaser workshop. Exact rational values, finite placements, local art, skins and one to three linked seals are package data. Previously released locks restore their answer placements; unfinished draft moves persist while leaving/reopening the chamber within the current runtime, and are intentionally not written on every drag. Progress is saved through the existing authoritative outcome boundary only after every seal balances. Version 3.1.0 saves remain isolated. No online room service is installed.

## Version 3.3.0: independent gear restoration workshop

See [GEAR_LOCK_PLAN.md](GEAR_LOCK_PLAN.md) for the design, reusable contract, artwork and verification. The fox-den Solve lock action now opens a full-screen Phaser scene. The map stays mounted and hidden. Fractional tooth-count clues select two missing cogs, and a whole-number crank setting controls exact compound gearing. Correct math powers the ball, hammer, counterweight, domino and gate sequence. Drag/drop, tap and keyboard controls emit the same bounded runtime intent. Pause, reduced motion, replay, return-to-map and restored successful answers are supported.
