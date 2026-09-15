# Castle Rescue — hanging three-pin balance lock

The user subsequently requested a better graphics system and a less crowded composition. The [focused Three.js workshop revision](CASTLE_BALANCE_3D_WORKSHOP.md) supersedes this document's SVG presentation; the mathematical and preview boundaries described here remain applicable.

This is the first mechanism revision following the [weekly workspace implementation](CASTLE_INTERACTIVE_WEEK_REDESIGN.md). Scope is Castle's balance vault and its grade pathways. The other Castle mechanisms and other projects are unchanged by this revision.

## Requested behavior and reference

The user supplied `C:\Users\erich\Downloads\realistic_3_pin_lock_mechanism.html` as the visual reference and requested automatic unlocking when all three scales balance. Its brushed steel housing, recessed tracks, hanging brass pins with middle cutouts, braided ropes, horizontal bolt, and right latch informed the rebuilt artwork. The reference was read as design material; its direct pin dragging and pixel-tolerance unlocking were not adopted as game rules.

Three independent scales remain visible above the master lock. Selecting a scale or pin focuses its larger working view. Moving weights tilts the scale and raises or lowers the corresponding rope-suspended pin. All three cutouts must align simultaneously before the horizontal steel bolt retracts out of the latch. No engage/unlock button is required. A secondary **Record this setup** action records an optional workshop trial.

The existing exact rational evaluator determines alignment. Display offsets keep near misses visibly outside the slot, and animation cannot authorize an incorrect mathematical solution. Pins settle before the bolt slides; reduced motion snaps directly to the result. Pause freezes animation and blocks placement. In the authoring preview, changing a weight can close the lock again; other scales retain their arrangements. Automatic release records the three scale trials after edits, without recording lesson completion. Restoring an already balanced draft does not manufacture new trials.

## Implementation and compatibility

- `balance-lock.component.ts` / `.html`: derived live pin alignment, automatic release, focused scale navigation, explicit rope/cutout explanation, optional trial recording, and existing keyboard controls.
- `balance-lock.rebuild.scss`: scoped responsive layout for the balance workshop.
- `balance-lock.scene.ts`: preserves the lazy scene-loader contract and exports the new renderer.
- `balance-lock.hanging-scene.ts`: native SVG scene, drag/tap placement intents, all-scale overview, animation, resize and lifecycle cleanup.
- `balance-lock.art.ts`: layered SVG materials and geometry for brushed steel, brass, ropes, scales, weights, tracks, cutouts, and bolt.
- `balance-lock.motion.ts`: presentation offsets derived from domain readings.
- Component and renderer specifications cover automatic release, preview isolation, exact near misses, direction, paused/restored state, drop events, and cleanup.

These files are under `src/app/templates/heist/escape/balance-lock/`. The existing balance domain, project mathematics, identifiers, package version, and persistence formats are unchanged. The rendering uses configuration and existing component outputs; it adds no project-name branches, dependencies, external graphics requests, assessment system, tutor integration, or shared state. The former Phaser balance renderer is replaced with crisp code-native SVG while the other machines continue using their existing renderers.

The initial dirty-tree inventory and balance file copies are under `output/castle-pin-rebuild-initial-status.txt` and `output/castle-pin-baseline/`. In particular, the pre-existing `balance-lock.component.scss` change was preserved and was not edited in this revision.

## Verification

- Focused balance and weekly tests: **4 files, 27 tests passed** (`output/castle-pin-tests.log`).
- Final Heist and launcher regressions: **33 files, 212 tests passed** (`output/castle-pin-regression-tests.log`).
- Final full application production build **passed**, including the rope-continuity and weight-spacing refinements (`output/castle-pin-production-final.log`). Existing component-style budget warnings remain; no build budget was changed.
- Scoped `git diff --check` passed.
- The architecture audit reports two existing violations outside this change: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a project service (`output/castle-pin-architecture.log`). No Castle violation was reported.
- Browser verification exercised a real drag, tap placement, keyboard Enter placement, all three scale selections, one/two aligned pins remaining locked, and automatic release after the third scale balanced. Resetting one scale closed the bolt while preserving the other two arrangements.
- Desktop, 820 × 1180 tablet, and 390 × 844 phone layouts were inspected. The phone scene stacks its two panels with readable weights and pins; tablet and phone reported no horizontal overflow. Grade 6 loaded its distinct weight inventory, and pause exposed the disabled controls.
- The final build was reloaded and restored the two aligned scale arrangements and three recorded trials. Its continuous rope connections and separated weight labels were inspected visually. Completing the third scale with reduced motion enabled showed **MASTER BOLT OPEN** automatically. Browser error logs were empty. Reduced motion and temporary viewport overrides were restored afterward, and this verification's workshop settings were reset to the starting tray for the user's next trial.

## Local preview

The preview serves the full application from this task's build output:

http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=1

```powershell
$env:NG_BUILD_MAX_WORKERS='1'
node node_modules/@angular/cli/bin/ng.js build --configuration production --output-path output/castle-week-production-build
python output/castle-week-server.py
```

This is local verification only. No deployment or publication was performed.
