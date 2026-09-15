# Castle Rescue — Bridge engineering workshop

15 September 2026. User authorized building and polishing the next level after Owl. Scope: Lesson 6 only. Read project activity rules, design guidance, graphics workflow, implementation handoff, and engineering rules. Inspected the running Grade 5 bridge before changes.

## Selected interaction and visual passes

Considered a freeform bridge builder, a top-down route map, and a connected anchor/cable machine. The connected machine preserves the authored two-stage mathematics: position an X/Y carriage using the coordinate clue, then fit the correct cable to a marked route. Both stages remain directly accessible in testing. Correct parts engage automatically, but the physical crossing requires both. Short cables stop before the final hook; long cables sag. The working bridge lowers fully before a linked gate lifts and the existing six-rabbit rescue group crosses from its holding enclosure. This passage adds no rescue award.

Ranked weaknesses in the old live scene: (1) repeated headings/controls crowd out the activity, (2) no actual bridge or river, (3) separate generic release diagram, (4) small flat handles and measurements, (5) no visible animals or safe crossing. Passes: compose the river, bridge and holding cage; build the two-stage control station; connect and animate the release; refine materials/lighting; inspect and correct desktop/mobile interaction and framing.

```text
TEMPLATE_CAPABILITY_GAP
Requested: connected two-stage 2.5D bridge and holding-enclosure crossing.
Reason: existing spatial renderers show isolated flat diagrams and a generic latch.
Reusable extension: optional MachineDefinition.presentation.kind = "bridge-cage"
for a coordinate + cable pair. Expose all stage answers read-only to the renderer,
and route native stage selection through the existing component boundary.
```

Reuse Three.js diorama viewing, material ownership, procedural surfaces, articulated rabbit rigs, exact coordinate/cable evaluators, bounded input and trial ownership. Preserve authored goals, routes, inventories, grade pathways, saved drafts, seals, and fallback controls. No new dependencies, downloads, deployment, or edits to other projects.

## Implemented capability and assets

- `src/app/templates/heist/escape/locks/bridge-cage/` contains the motion/controller, original scene geometry, native in-scene controls, scoped host sizing, migration, and focused tests. The scene includes two riverbanks, wooded ridges, textured paving and wood, a hinged plank bridge, hoist drum, safety rails, a joined corner grille, bolt, pulley, and counterweight.
- `src/app/templates/heist/escape/locks/diorama-label.ts` adds aspect-correct world labels. Reuses `diorama-surfaces.ts`, `DioramaViewer`, `BalanceMetalwork`, and `createRabbit` unchanged. No raster/model downloads or additional dependencies.
- `MachineDefinition.presentation` optionally selects `bridge-cage` with 1–6 rabbits and requires exactly a coordinate/cable stage pair. `MachineView` optionally supplies all stage answers and preview stage access; an optional stage callback uses the existing component transition guards. Existing scene contracts remain compatible. No LMS core contract changed.
- Narrow integration changes cover scene dispatch, component/scoped styles, compact weekly presentation, validators, and preview/assessed-save migration. Castle JSON adds only four optional presentation objects; authored mathematics and inventories remain unchanged.

## Behavior and polish passes

The carriage follows native canvas drags locally and commits one snapped integer point on release. X/Y step buttons, native selectors, and canvas arrow keys offer equivalent operation. Cable reels display exact route geometry and proportional shortfall; excess cable bows visibly. Neither control reveals the hidden coordinate target. Grade 5 uses translation and summed lengths; Grade 6 uses negative coordinates and map scale; Grade 7 uses transformation and a scaled pulley route; Grade 8 uses line intersection and a diagonal.

A new correct arrangement settles before automatically engaging its stage. A cable can be tested first in preview, but the bridge stays raised until both arrangements are correct. The bridge takes its load on the far bank before the bolt withdraws and the counterweight lifts the joined front/side grille. Six articulated rabbits leave in staggered hops and occupy distinct positions on the far bank. This is a holding-enclosure crossing for an existing rescue group; it adds no rescue award. Replay does not create extra trials, seals, or completion. Saved solved states restore the final scene. Pause and reduced motion remain supported.

Visual iteration corrected tiny/distorted rail numbers with aspect-correct canvas labels, removed competing grid shadows, replaced rough cone scenery with layered wooded ridges, enlarged the visible opening with a joined corner grille, added the gate's pulley/counterweight, separated all six landing positions, and centered the X/Y controls. Desktop offers whole-scene/mechanism/crossing views. Phones retain full-size controls and a focused board; during the crossing the camera follows the rabbit group and ends on the landing.

## Verification — 15 September 2026

- Strict Castle production build passes; initial bundle 546.42 kB gives the existing 500 kB soft-budget warning, below the error threshold. TypeScript strict compilation passes. Logs: `output/castle-bridge-build.log`.
- Full Heist/launcher regression suite: **280 tests pass across 43 files**. Final focused rerun: **8 Bridge tests pass** after geometry/landing refinements. Tests cover all four math pathways, coordinate mapping/bounds, short/slack/taut paths, both interlocks, dwell, direct stage access, saved poses, pause/reduced motion, cage/bridge clearance, separate landings, disposal, validation, persistence, and trial/award ownership.
- Browser checks used 1280 × 720, 820 × 900, and 390 × 844. Confirmed native X/Y operation, short/slack cable states, direct access to the cable stage, and a correct cable leaving the bridge raised while the coordinate was wrong. A native drag to Grade 8's intersection (2, 5) triggered the combined release. Inspected the raised gate, lowered deck, staggered crossing, six distinct landings, and pause/resume. The phone camera followed the moving group at a readable size. Canvas arrow keys moved the Grade 6 carriage and returned it to its original position. Both stages survive reload and grade switching.
- Reduced-motion replay showed the open bridge/gate and all six landings immediately. Replays retained exactly two Grade 8 preview trials, one per solved stage, and recorded no lesson completion. The final browser console had no errors. Viewport testing overrides were reset, and Grade 5 Bridge was left open for review.
- Architecture audit still reports two existing violations: `core/index.ts` imports `./templates`, and Mystery Substance's render-quality service resides in a project package. Those files are untouched. No claim is made that this scope repaired the full repository.

## Remaining weaknesses and next pass

The river and trees are stylized procedural scenery; they are not fluid or vegetation simulations. The dense whole-scene view is necessarily small on phones, so mechanism focus and the following camera carry the detailed interaction. The highest-value future visual pass would refine the same scene's terrain/material transitions while retaining the now-readable mechanics. Review Bridge before starting Sluice.
