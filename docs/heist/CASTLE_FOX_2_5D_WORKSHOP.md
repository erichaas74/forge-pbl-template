# Castle Rescue — Clockwork fox workshop

15 September 2026. The user requested the next lock after Rabbit. This pass owns **Lesson 4, the clockwork fox gear workshop only**.

## Selected interaction

Fit two cogs to a compound drive using the configured tooth-count multipliers. The fixed drive meshes with cog A on the rear plane; A shares its axle with a smaller pinion on the front plane, which drives cog B. Sliding mounts preserve real tooth contact as sizes change. Select or drag a cog from the tray to A/B. Set the input-turn count and turn the physical crank (or its keyboard/tap equivalent). Rotation markers and the output counter show the two ratios multiplying.

The correct calibration and exact output travel automatically begin the existing release sequence: drum catch, rolling ball, hammer, released counterweight, dominoes, then cage latch. The view follows the connected mechanism and then four animated foxes leaving an open cage. Incorrect cogs or too few/many turns produce a visible drive trial and leave the cage shut. Pause, replay, reduced motion, reset, and three scene focus views remain available.

We considered a single ratio wheel and a decorative gear wall, but chose the actual compound train because the shared axle and two meshing pairs are the learning goal. The physical release sequence remains distinct from the fraction-sector Rabbit session.

```text
TEMPLATE_CAPABILITY_GAP
Requested: a 2.5D compound gear train connected to the configured release
chain, opening a cage with four articulated foxes.
Reason: the existing Phaser gear renderer has no 3D enclosure/animal system.
Reusable capability: optional GearLockDefinition.presentation.kind =
"gear-cage", with animal model/clip/credit settings and population count.
```

Preserve all mathematical settings, grade inventories, domain evaluation, rescue awards, and existing saved drafts. Reuse the installed Three.js and already attributed local fox model. Do not deploy or modify another project. Record implementation and verification below when complete.

## Implementation

- Enabled the optional `gear-cage` presentation on exactly the four Fox gear configurations (Grades 5–8). A normalized comparison with `output/castle-fox-baseline/project.json` confirms every other project value is unchanged.
- Built separate Three.js model, release assembly, timeline, animal loader, layout, and scene adapter files in `escape/gear-lock/gear-cage/`. `escape/locks/diorama-viewer.ts` owns the reusable camera, expanded dialog, lighting, resize, and disposal boundary. Earlier workshop renderers are unchanged.
- Gears use a common tooth pitch, two real meshing planes, a shared A/pinion shaft, sliding mounts, crank handle, rotation markers, and a belt-driven output drum. Cog tray drag, click/tap destinations, and keyboard controls all dispatch the existing bounded inventory commands.
- The existing drive → ball → hammer → weight → domino → gate sequence now uses physical 3D assemblies. Visible pulleys redirect the counterweight cord; the final cord releases the spring-loaded cage bolt. The hinged door clears before any fox travels. Incorrect calibrations and short/long crank trials keep all downstream modules still.
- Four independently cloned glTF skeletons share one asset load. Each fox changes from idle to walk/run and exits along a staggered route; all remain visible outside afterward. Reused `/art/patrol/fox.glb` and its existing credits without new assets or dependencies. Original model: PixelMannen; animation: tomkranis; conversions: Asobo Studio/scurest. The model/animation credits remain accessible in Options.
- Whole scene, Gears, Release, and Foxes focus controls; automatic camera follow during release; expanded view; pause, replay, reduced motion, sound toggle, and reset. Pointer cancellation and modal keyboard focus are explicitly handled. WebGL/asset failure retains the original mathematical fallback controls.
- Preview replay creates no extra trial or rescue award. The component still owns validation/awards; the renderer only reports input and animation completion. Saved-draft migration permits the new presentation while rejecting mathematical, inventory, or story changes, including saved assessed rescue histories.
- Narrow integration changes: gear domain, component/scene contracts, the weekly workspace's presentation opt-in/pause binding, preview persistence, and assessed persistence. Other projects, lesson plans, dependencies, global styling, and the shared launch registry were not edited.

## Verification

- **262 tests passed across 41 Heist/launcher suites.** Includes exact Grade 5–8 solutions, wrong ratios/turn counts, inventory conservation, tooth contact/shared planes, release ordering, pause/reduced motion, four unobstructed fox routes, one completion callback, replay without awards/trials, and presentation-only save migration. Log: `output/castle-fox-regression-retry.log`.
- The initial full production build passed. A later full-app build encountered concurrent Journey work errors in `journey-path.engine.ts` (`findLast`/implicit callback type) and `journey-path.validation.ts` (unknown object access). Those unrelated files were not modified.
- The final Castle-only production build passed using the existing `output/castle-week-bootstrap.ts` and strict scoped TypeScript configuration. `output/build-castle-fox.cjs` uses Angular Architect overrides; it does not edit `angular.json` or disable validation. Existing served assets are reused to avoid duplicating every project's public files. Log: `output/castle-fox-isolated-build.log`. The isolated initial bundle has a 35 kB warning above the 500 kB budget.
- The first regression attempt exhausted disk space. Removing this turn's generated Fox staging directory recovered enough room for the successful rerun. Automatic approval review rejected removal of older Castle staging folders as potentially concurrent work; those folders remain intact.
- Architecture audit still reports two existing unrelated violations: `core/index.ts` → `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts`. No new Fox violation was reported.
- Browser checks: Grade 5 short trial stays shut; three input turns give A two turns/output one turn and release four foxes; pause freezes the run at the same elapsed position; replay leaves trial count at two; Grade 8 nine turns give A six/output two and release all four; dragging on a 390×844 viewport and switching immediately to keyboard placement both work. Inspected normal desktop, phone, and tablet layouts, the open cage, and all four animals outside. Static material groups are batched, and the foxes share immutable asset resources.
- Final keyboard check: Escape closes the expanded dialog during a keyboard-started replay, and focus returns to Expand. Restored the default browser viewport. The Grade 5 Balance draft remains `1/2 + 1/4 = 3/4`, one of three pins aligned, with all **19 trials** retained. Rabbit remains one exact whole with all **six rabbits outside**. Returned to Lesson 4 with its saved Grade 5 solution and left the expanded whole scene available for review.

## Local preview and next step

`http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=4`

The existing local server serves `output/castle-week-production-build/browser`; its browser-code files and Castle config were refreshed from the isolated build. This is a Castle-only verification host while other projects are edited; it uses the real workspace, lesson navigation, persistence adapter, and final-example component. No deployment or commit was made.

**Fox is ready for review. Stop here.** Moon-tower optics is the next proposed workshop after the user requests it.
