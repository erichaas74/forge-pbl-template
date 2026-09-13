# Calendar Monument positioning and graphics audit

Audited 2026-09-12. Scope: the project opening, completed example, shared block editor and plan renderer, and the solar simulation's placement, camera, marker and light graphics. This is an audit; no implementation changes were made.

The monument reads well as a stone-circle exhibit. Its spatial calculations are consistent in the inspected paths, and its four example alignments pass the existing checks. The weaker part is explaining the placement: students must connect a small marker, an opening, a compass direction and numerical coordinates across several views with little visual assistance.

## Findings

### 1. P2 — Selecting a seasonal marker does not reliably reveal it

In the completed example, open **Markers** and select **Equinoxes · blue light**. The detail panel identifies the point and confirms the current light, but the opening camera angle makes the target and its short transmitted ray difficult to distinguish. **Tools → View from above** makes this alignment much clearer. However, the December target lies below the northeast gate's lintel and is obscured from above.

`focusMarker()` changes the ray selection and scales the floor ring by 1.2. It does not reposition the camera, expose an occluded target, or enlarge its number label. The labels have fixed world dimensions of 0.26 × 0.13 m at y=0.17 and remain subject to depth testing. Zooming out to include winter shadows makes them smaller still.

Evidence: `public/simulations/solar-monument/game.js:1197` and `:1616`; the northeast gate and December target in `src/app/projects/calendar-monument/calendar-monument.solar-calendar.ts:38` and `:116`. An additional calculation using the existing camera and analytic intersection routines confirms that the June number is occluded from the opening view and the December number is occluded from the overhead view. The latter target is within the overhead footprint of `northeast-gate-lintel`.

Recommendation: give the selected target a readable screen-space callout with a leader to its true position. When it is behind a stone, identify that occlusion and offer an explicit reveal view or cutaway. Highlight the corresponding opening and ray. Keep the measured point and physical occlusion unchanged.

### 2. P2 — Direction cues disappear in the views used to inspect placement

The compass sprites are placed 6.5 m from the origin. The camera fits the blocks, sculpture, targets and optional shadows, without including those sprites. In the inspected desktop opening view, East and South are outside the frame; North and West are faint white letters on pale paving. In the close overhead view, all four external compass sprites fall outside the frame. The engraved compass medallions can also be covered by stones or cropped with the court.

Evidence: `public/simulations/solar-monument/game.js:392`, `:424`; `public/simulations/solar-monument/monument-camera.js:15`. Camera projection at a representative 1474 × 740 canvas reproduced the missing directions. The hosted layout also hides the scene's orientation/scale caption via `public/simulations/solar-monument/style.css:761`.

Recommendation: add a high-contrast compass overlay that remains visible during orbit, zoom and fitting. Label the overhead view as north-up. Keep compass orientation independent of decorative floor carvings and camera framing.

### 3. P2 — The block editor does not identify the selected stone in the scene

The editor offers entries such as “Block 1 · base 0 m,” but selection is a private signal in the builder. Its parent receives only a changed design; the simulation receives no selected block ID. The renderer does not outline or label the block being edited. Clicking a block while sunlight is shown selects a ray for inspection, rather than selecting the matching editor entry.

This is especially difficult for the starter's 24 similar blocks and the completed example's 34 blocks: changing X, Z or rotation gives no advance visual confirmation of which stone the fields describe.

Evidence: `src/app/templates/engineering-design/ui/block-builder.component.ts:43` and `:157`; `engineering-design-page.component.html:65`; `public/simulations/solar-monument/game.js:1271`.

Recommendation: use a reusable selection contract between the editor, plan and simulation. Show an outline, block number, local axes and relevant dimensions for the selected block. Support selection from both the list and canvas, retaining the list as the keyboard alternative.

### 4. P2 — Numerical positions lack an obvious visual measurement reference

The builder correctly explains +X east, +Z south and +Y up, but the working canvas does not clearly label the coordinate origin or associate an edited block with dimension lines. The metre grid is initially off and reached through **Guide → Views & measurements**. Its scale caption remains hidden by the hosted layout's overlay rule even when extra tools are opened. The separate blueprint has a labelled 20 cm grid, but it is supporting exhibit content rather than an adjacent editing aid.

The UI also labels block orientation simply “Rotation (°).” The implementation uses Three.js Y-axis rotation, while nearby Sun readings use clockwise compass bearings. Neither the field nor a graphical axis indicates the block's zero orientation and positive turn direction.

Evidence: `src/app/templates/engineering-design/ui/block-builder.component.ts:16` and `:31`; `block-plan.component.ts:85`; `public/simulations/solar-monument/game.js:374` and `:1738`; `public/simulations/solar-monument/style.css:761`.

Recommendation: in building mode, expose a north-up measurement inset with a labelled origin, scale and selected-block coordinates. Show dimension lines and a rotation arc when a block is selected. Describe block rotation separately from solar bearing. An orthographic measurement inset can coexist with the perspective exhibit.

## Additional presentation observation

The turquoise/gold mosaic, rings, compass rose and carved stone surfaces establish a recognizable setting. They are fixed decoration, including on an empty starter without seasonal targets. The explanation that the rings are not calibrated seasonal markers is nested under **Guide → How to interpret the model**. A short nearby legend or measurement-mode option would help distinguish fixed floor decoration, recorded target colors and currently transmitted light. This is a usability risk, not evidence of an error in the optical solver.

The cover illustration is explicitly described as an illustration and documented as key art. It should continue to serve that purpose rather than be used to assess exact stone spacing or alignment.

## What is working

- Project data, the plan renderer, block transforms and shadow geometry use +X east, +Y up and +Z south consistently in the inspected paths. SVG rotations compensate for its downward screen axis.
- Orbiting the camera leaves the measured monument fixed. The overhead camera uses north-up orientation.
- Seasonal target checks use the full measured design, including apertures, other stones and sculpture occlusion.
- The completed example reproduces blue light for both equinoxes, amber for June, and red for December.
- **See shadows** exposes the winter shadow extent. Presentation framing supports comparison without moving the monument between dates.
- Marker details provide recorded site, date, time, solar bearing and ground coordinates, and distinguish recorded light from light at the current time.

## Verification and limits

Passed the existing scripts without modifying their assertions or regenerating reference observations:

- `node scripts/check-solar-monument.cjs`
- `node scripts/check-solar-calendar.cjs`
- `node scripts/check-solar-demonstration.cjs`
- `node scripts/check-solar-optics.cjs` — includes 2,394 independent mesh/ray comparisons.
- `node scripts/check-solar-scene.cjs`
- `node scripts/check-season-review.cjs`
- `node scripts/check-sundial-lab.cjs`

Additional read-only calculations checked compass projection and marker occlusion using the current example geometry. Browser inspection covered the opening page, completed example, marker selection, overhead view, December selection and shadow-side view. The builder-selection finding comes from tracing its component and simulation contracts, rather than editing a student's saved design.

The existing scripts validate geometry, data and renderer/controller behavior; their passing results do not establish label legibility or freedom from camera occlusion. No production build or new tests were needed for this documentation-only audit. No outdoor calibration, historical-site reconstruction claim or new astronomical accuracy assessment is included.

## Follow-up scope

Prioritize selected-marker visibility and a persistent compass, followed by linked block selection and measurement aids. Validate at desktop and narrow viewport sizes with the full 34-block example. A student should be able to identify the selected stone, point to the selected seasonal target, locate north and the origin, and explain which opening illuminates the target without hunting through unrelated controls.

Files added: this audit. Existing files modified: none. Tests added/changed: none. Architectural changes or specification deviations: none. No new required `TEMPLATE_CAPABILITY_GAP` was introduced by this audit. Linked editor/canvas selection would require a small reusable interaction-contract extension; it should not be implemented as a calendar-project name check.
