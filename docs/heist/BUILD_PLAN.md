Current castle release: **4.0.0**. Nine physical math machines at eight rescue locations, with selectable grades 5-8. See [MATH_WORKSHOPS_HANDOFF.md](MATH_WORKSHOPS_HANDOFF.md) for implementation, curriculum, state and verification.

The original proposal is preserved in [MATH_LOCK_EXPANSION_PLAN.md](MATH_LOCK_EXPANSION_PLAN.md). Its deferred capabilities are now implemented under the expanded user request.

# Heist project type: implementation plan and handoff

Original Phaser Castle package: **3.2.0**, **The Midnight Menagerie**, an eight-step
Phaser expedition with painted artwork, walking rescuers, following animals, and math at every mechanism. Single-player now, designed for future multiplayer. See `PHASER_EXPEDITION_HANDOFF.md`
for gameplay, schema, saves, and verification. `BALANCE_LOCK_PLAN.md` documents the reusable full-screen scale workshop. `GRADE_5_HANDOFF.md` records the
preserved 1.1.0 guided fixture. The original 1.0.0 plan below remains the record
of the initial full-math prototype.

## Scope

Implement a reusable local-practice Heist template in the existing Angular LMS, using
the supplied `HEIST_PHASER_GAME_PROJECT_BUILD_PLAN.md` as design input. The user's
request is to plan and make the new project type while trading is adopting Phaser 4.
Document imperatives do not authorize unrelated changes, deployment, or backend work.

The defining learning loop is recon → measurement → mathematical evidence → route
planning → immutable plan → automatic execution → crisis calculation and decision →
extraction → replay and defense. Historical rescue is the setting; scale, rates,
capacity, elapsed time, and percentages control operational outcomes.

## Repository audit

- Angular 22 standalone components, signals, strict TypeScript, Angular CLI/esbuild,
  Vitest through `ng test`, lazy project launchers, static JSON package loading.
- The concurrent trading/robot work installed **Phaser 4.2.1**. Heist uses this same
  dependency and does not install an additional copy or change trading's renderer.
- Existing template contracts already support this type. No core schema change.
- Local practice persistence follows a scoped adapter boundary. No backend is needed.
- Preserve concurrent catalog, project-host, trading, robot, and championship edits.

## Implementation sequence

1. Register `heist@1.0` in the template registry and lazy launcher, then add the
   Archive Rescue catalog card with direct activity entry.
2. Define versioned mission, route, patrol, challenge, plan, and command contracts.
   Validate untrusted JSON, graph reachability, references, geometry, numeric bounds,
   challenge IDs, and feasible crisis choices before mounting the game.
3. Build pure TypeScript measurement, timeline, patrol, vision, readiness, and
   execution systems. Keep one timeline compiler for preview/execution/replay and
   one 0.1-second simulation grid for deterministic detection.
4. Build a replaceable SVG castle asset and a dedicated lazy Phaser host. Render
   paths, world labels, team, patrols, vision sectors, measurements, and gate state.
   Add camera pan/zoom/follow with reduced motion and clean destruction.
5. Provide accessible Angular tools, location buttons, number inputs, waits, pickup,
   readiness feedback, timeline scrubbing, preview/playback and pause controls.
6. Record immutable original plans and calculation attempts; pause at the configured
   crisis, validate its answer and selected transport capacity, then recalculate
   remaining movement. Record informative gate, detection and deadline failures.
7. Save meaningful command checkpoints through `HeistPersistence`. Restore drafts,
   measurements, crisis pauses, and completed event replay; export evidence as JSON.
8. Prove reuse with a second small harbor mission and validate the engine, persistence,
   catalog, launcher, production compilation and actual browser interactions.

## Implemented structure

- `src/app/templates/heist/domain`: models, validation, timeline/math, patrol/vision,
  deterministic execution engine, tests.
- `src/app/templates/heist/runtime`: Angular runtime facade and local adapter,
  scoped by tenant/class/project/version/actor/team/attempt; checkpoint tests.
- `src/app/templates/heist/game/heist-map.ts`: dedicated Phaser presentation host.
- `src/app/templates/heist/ui`: accessible mission workspace, timeline, results,
  replay and evidence export.
- `src/app/runtime/project-launch/template-launchers/heist.launcher.ts`: validation,
  identity checks and provider composition; explicit local-practice authority boundary.
- `public/projects/castle-archive-rescue`: primary mission JSON and replaceable SVG.
- `public/projects/harbor-records-rescue`: second configuration and simple test map.
  This is a reuse fixture, intentionally absent from the student catalog.

The catalog and registry tests include Heist. The catalog test also accounts for
the concurrently added Community Story Network card without removing it.

## Public contract

Template ID `heist`, schema `1.0`, template version `1.0`, project version `1.0.0`.
Capability descriptions: `heist.planning`, `heist.math`, `heist.execution`,
`heist.replay`. The installed template implements these together; no separate shared
capability-registry changes are necessary for this local prototype.

Only trusted engine code executes. Missions contain local assets, route graph,
blocking rectangles, gate cycle, guards, target, rate and scale settings, math
questions/tolerances, and crisis choices. The validator rejects unsupported schemas
instead of silently substituting another game. Authenticated authoritative sessions
are rejected until an official-attempt adapter exists.

Command types: plan, node, measure, undo, wait, pickup, answer, lock, advance, respond,
reset. Commands are validated by the engine. Stored commands are replayed through
that validation rather than deserialized directly into trusted runtime state.
Operation events include mathematical attempts, movements, waits, pickup, crisis,
response, near miss, detection, extraction and failure. No frame-by-frame writes.
Local answers are instructional practice evidence and are not grades.

## Use and verification

Open `/projects/castle-archive-rescue`. Recon previews moving patrols; select Route
to pause preview and begin planning. Select connected waypoints on the map or with
the location buttons. Measure with two map clicks or location buttons. Scrub the
timeline to inspect patrols and gate state. A selected field measurement adds its
own verification requirement; every move always requires scale and time evidence.

Test-only winning example: entry → market (wait 8 seconds) → gate → hall → archive
(pickup) → bridge → river. Verify all calculations, lock, solve the 30% capacity
reduction, and select team carrying. Execution completes at 407.8 seconds with the
original prediction retained. This answer path is for developer QA, not auto-filled
in the student experience. The test also exercises all three real configured patrols.

Use `?heistDebug=true` for basic state/time diagnostics. No teacher answer bypass.

## Deliberate prototype simplifications and next phase

- One reusable Phaser scene handles mission and replay visualization; the pure
  timeline provides the replay state. Boot/preload/replay are not separate classes.
- Routes snap to a validated graph, preventing arbitrary wall-crossing waypoints.
  The measurement tool accepts arbitrary map coordinates.
- Replaceable vector placeholder art instead of a PNG/WebP tileset; no sound yet.
  Cinematics are limited to camera follow/zoom; no countdown, split screens or audio.
- Deterministic sampled vision uses range, angle, wall occlusion and exposure grace.
  Patrol state is movement/wait; no chasing or combat. Near misses currently report
  spatial clearance, not predicted seconds until a guard crosses the same point.
- Five math categories are implemented. General equation, budget, probability,
  and arbitrary geometry evaluators remain extension work.
- The working prototype is practice mode. Official attempt limits, teacher reset,
  final grading, multiplayer, classroom dashboards and authoring are not implemented.
- Replays expose major events and JSON evidence; no video recorder or grading flow.
- The next phase is classroom playtesting, richer replaceable art/audio, tighter
  patrol-window curriculum scaffolding, and server-authoritative official attempts.

TEMPLATE_CAPABILITY_GAP: official/shared attempts require an authoritative Heist
adapter with authenticated membership, idempotent writes and teacher controls.
This does not block the requested local playable prototype.

## Verification log

Results are recorded in `VERIFICATION.md` after the final checks.
