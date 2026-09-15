# Castle balance lock — integrated Three.js mechanism

The latest revision makes each piston the counterweight opposite a single pan. See [Piston counterweights](CASTLE_PISTON_COUNTERWEIGHTS.md) for the current design, saved-state migration, and verification. The record below describes the preceding integrated two-pan design.

The balance workshop uses Three.js to render three independently operated scales connected to one lock housing and one sliding bolt. The latest user direction was to put everything into one lock mechanism. This version supersedes both the initial SVG presentation in [the first balance rebuild](CASTLE_BALANCE_LOCK_REBUILD.md) and the intermediate Three.js version with separate working and inspection views.

## Scene and interaction

- **One assembly:** all three scale uprights mount directly onto a continuous metal casing. Each right pan suspends a notched vertical pin on a braided rope. A common horizontal bolt passes through all three cutouts and retracts automatically when they align.
- **Active scale:** selecting a scale tab or clicking another scale in the model changes the highlighted pivot and its weight tray. Every scale and its placed weights stay in the same visible scene. A weight dropped onto another scale leaves the arrangement unchanged.
- **Weight tray:** a dedicated row below the canvas with readable mass labels. Weights can be dragged onto a 3D pan, selected with the keyboard, or placed with the native pan buttons. Placed weights appear as labeled 3D brass masses.
- **Expand workshop:** gives the scene the viewport width. Escape returns to the embedded workspace; keyboard focus stays within the expanded dialog. Pause/resume remains available inside the expanded preview.
- **Narrow screens:** the complete assembly scrolls horizontally at a readable size. Changing the active scale brings its part of the mechanism into view. The live reading, bolt status, and native placement controls remain available outside the scrolling canvas.

Graphics use beveled geometry, brass and brushed steel materials, environment reflections, directional lighting, shadows, actual recessed channels and cutouts, and braided rope geometry. The installed Three.js package and its bundled environment/geometry helpers provide the rendering system. No new dependency, remote asset, generated-image service, or deployment was added.

The exact rational balance evaluator and authoring-preview boundary are unchanged. All three simultaneous balances are necessary for automatic release. Pins settle before the bolt retracts. Reduced motion snaps to the result; pause freezes movement and disables placement. Resetting or moving a weight can relock the preview without clearing the other arrangements or recording assessment completion.

## Implementation boundaries

Files are in `src/app/templates/heist/escape/balance-lock/`:

- `balance-lock.3d-scene.ts`: rendering lifecycle, whole-mechanism camera fitting, scale selection, native tray interactions, animation, and WebGL failure handling.
- `balance-lock.3d-model.ts`: one housing/bolt and independently movable scales, pins, ropes, and weights.
- `balance-lock.3d-materials.ts`: materials, local textures/labels, geometry ownership, and resource disposal.
- `balance-lock.3d-layout.ts`: scoped scene/tray styling and semantic controls.
- `balance-lock.scene-contract.ts` and `balance-lock.scene.ts`: retain the existing lazy renderer interface.
- Component TypeScript/template and `balance-lock.rebuild.scss`: expanded-view controls, Escape/focus handling, and scoped layout.
- New model and renderer specifications plus the expanded component specification.

The earlier SVG art/renderer and their renderer test were removed after their replacements were added. Copies are preserved under `output/castle-3d-baseline/`. The earlier `balance-lock.component.scss` remains untouched. One binding was added to Castle's existing weekly workspace template to connect the expanded view's pause button. Other projects, curriculum packages, persistence schemas, and other Castle machines are unchanged by this revision.

The renderer creates each scale's weight meshes once, updates placement state only on completed actions, renders changes on demand, caps pixel ratio, and disposes geometry/materials/textures and the WebGL context on teardown. A lost/unavailable graphics context exposes the existing accessible control fallback and stops rendering; it does not pretend a successful 3D load occurred. The intermediate Three.js files are backed up under `output/castle-unified-lock-baseline/`.

## Integrated mechanism verification

- Focused balance and weekly tests: **5 files, 30 tests passed** (`output/castle-unified-lock-tests.log`). Geometry checks confirm that every rope stays vertically attached to its own right pan and pin, and that the mechanism has one shared bolt.
- Final Heist and launcher regressions: **34 files, 215 tests passed** (`output/castle-unified-lock-regression-tests.log`). This includes all placed weights remaining visible when the active scale changes, narrow-screen active-scale scrolling, exact near-miss rejection, paused release, slow-frame animation, keyboard placement, preview boundaries, and resource cleanup.
- Production build and real-browser checks use the same local preview URL below. The final build log is `output/castle-unified-lock-final-build.log`.
- Browser checks: dropping a weight onto another scale leaves it in the tray; dragging it onto the active pan works; balancing the first two scales retains all visible weights; balancing the third aligns all cutouts and produces **MASTER BOLT OPEN** with the single bolt clear of its latch.
- The final production build passed in 28.3 seconds. A 390-pixel browser check confirmed that selecting scale 3 brings its scale and pin into view while the equation, status, and tray remain readable. The temporary viewport override was reset. After recovering a browser connection timeout, the three test arrangements were reset and the expanded first scale was left open. The final screenshot confirmed all three scales, their pins, and the shared closed bolt together.
- Changes in this revision are limited to the balance renderer/model/layout, their two specifications, and this Castle handoff. No other Castle machine or concurrent project is edited.

## Earlier Three.js verification record

The following records the intermediate workshop before the integrated assembly superseded its separate views.

- Focused balance and weekly tests: **5 files, 30 tests passed**, including model/rope alignment, exact near misses, separate views, keyboard placement, the pointer-down layout regression, paused release, resource cleanup, expanded-view Escape, and preview compatibility. Log: `output/castle-3d-tests.log`.
- Heist and launcher regressions: **34 files, 215 tests passed** (`output/castle-3d-regression-tests.log`). This includes a slow-frame animation check: the bolt uses elapsed time instead of requiring dozens of background frames.
- Full application production builds passed after correcting the new scene's scope attribute. The final build log is `output/castle-3d-final-build.log`; existing unrelated style-budget warnings remain and no budgets were changed.
- Browser checks: real drag from the separate tray to a 3D pan; keyboard selection/placement; all three stations retaining their arrangements; automatic bolt release; a full-size **All pins** inspection; expanded pause/resume; Escape to the embedded workspace; and removing one weight relocking the mechanism while the other two pins remain aligned.
- The browser pass caught a pointer-down layout shift in the new tray. Selection now waits for pointer-up, and the regression test verifies that pointer-down emits neither a selection nor a placement. The complete three-scale sequence was repeated successfully after that correction.
- The 390 × 844 phone layout showed both camera views and a readable three-column weight tray, with no horizontal overflow. The temporary viewport override is reset before handoff.
- Final build verification: production build passed in 28.3 seconds; the refreshed 820 × 1180 tablet preview restored the two balanced stations and partial third station. Placing the last mass produced **MASTER BOLT OPEN** promptly. Tablet width was 805/805 pixels (viewport/content), and no browser errors occurred after the final build. Old logs from the initial, corrected scope-attribute error were distinguished by timestamp. The verification arrangement was reset and the default viewport restored; the expanded first station is left open for the user.
- Scoped `git diff --check` passed. The architecture audit still reports the same two issues outside Castle: `core/index.ts` importing `./templates` and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a project service (`output/castle-3d-architecture.log`). No Castle violation was introduced.
- The local preview uses the existing full-app build and server at `http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=1`.

Only local development and verification were performed. No publication or deployment is authorized or performed.
