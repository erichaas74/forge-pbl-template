# Earth motion and easier monument construction

Assessment: 2026-09-12. “Motion of the each” is interpreted as Earth's rotation and orbit, and their connection to the apparent Sun path and monument shadows. This is a recommendation report, not an implementation change.

The strongest next release would connect the existing models into **Explore Earth → Build → Test**. The project already has useful astronomy, a measured monument, daily playback, an Earth schematic, an observer at the center, seasonal tests, a sample gallery, and optical rays. The main gaps are seeing the relationships together and manipulating the model directly.

## What the current experience reveals

| Observed behavior | Implication |
| --- | --- |
| Earth’s tilt opens through Guide and appears below the large monument canvas. In the inspected desktop layout, most of that explanation was below the viewport. | The cause and its visible effect are difficult to watch together. |
| Play day exists; annual exploration uses calendar/season jumps. From center adds a morning offset, not year playback. | Students can compare seasonal endpoints but cannot yet watch sunrise bearings migrate through a year. |
| The builder opens with seven numeric fields, dimensions in cm and positions in m. | Building requires coordinate and unit translation before a student can place a stone. |
| Selecting “Block 3 · base 1 m” changes its fields but does not highlight its mesh. The inspected starter has 24 blocks. | The student must infer which visually similar stone is being edited. |
| A supported light-window command and Stack a copy already exist, but there is no gate-group selection or transform tool. | Students still move a multi-block structure one part at a time. |
| Undo stores one previous design inside the builder component; the gallery has a separate previous-design checkpoint. | Experimentation lacks a unified sequence of undo/redo operations. Closing the builder also destroys its local undo state. |
| The north-up blueprint is an SVG image outside the editing panel. The 3D grid is optional and compass labels can leave the camera frame. | Coordinates, orientation, selection, and dimensions lack a persistent visual reference. |

These are observations from current source and browser inspection, not findings from a classroom usability trial. See also the [positioning audit](POSITIONING_GRAPHICS_AUDIT.md).

## 1. Put Earth and the monument in one synchronized explanation

Create an **Explore Earth** mode with the Earth schematic beside the monument. Within the Earth pane, offer a readable rotation close-up and an orbit overview. Keep the selected site, date and instant shared with the local sky, Sun-day graph, lighting and shadows. Use consistent labels and colors for the site, Sun direction and measured shadow.

Add two explicit playback choices:

- **One day:** advance the actual time on one date. Show the marked site rotating through the illuminated and dark halves of Earth while the local Sun and shadow move. Include night in this Earth explanation, alongside the existing sunrise-to-sunset lab playback.
- **One year:** advance the calendar one day at a time using a visible observation rule: **At solar noon** or **10 minutes after sunrise**. Show the orbital position, the nearly fixed axis direction and the changing local result. Label this as daily sampling so the animation does not imply that Earth makes only one rotation per year.

Keep the camera orientation fixed during comparisons. Add a date slider, month ticks, four seasonal stops, pause and single-step controls. In portrait layouts, switch between the synchronized panes while retaining the same state; avoid reducing three canvases to unreadable thumbnails.

The scientific explanation should connect rotation to day/night and the tilted axis plus orbital position to seasonal sunlight. Make the lit/dark boundary and site marker legible, and preserve the axis direction around the orbit. NASA's [seasons explanation](https://spaceplace.nasa.gov/seasons/en/) provides the relevant conceptual baseline.

Reuse `earth-explanation.js`, `SolarDay.earth()`, `updateAll()`, the Sun-day overlay and the center observer. Extend playback and presentation; retain the shared astronomical model.

## 2. Let students build by selecting and placing visible objects

Start with a linked selection across **3D scene, plan and inspector**. Clicking a stone should outline it, show its name/number and load its measurements. Selecting the list item must produce the same result. Clicking a ray remains an explicit Test-mode operation rather than competing with Build selection.

Then add:

- A north-up plan inset with origin, scale, grid and selected footprint. Use it for initial floor placement; retain the 3D view for height and clearance.
- Drag-to-move, a rotation handle, keyboard nudges and measured numeric alternatives.
- Configurable grid and face snapping, including stacking on an existing top face. Show a placement ghost before committing.
- A clear valid/invalid placement cue plus specific text such as “Overlaps the east pillar.” Keep the last valid model until the placement is accepted.
- Consistent centimetres in the student-facing builder, with explicit unit controls where needed. Internal measured coordinates can remain in metres.
- Undo/redo across the editing session, including after closing and reopening the inspector. Commit one drag, group move or placement as one operation.

This sequence addresses the selection ambiguity before adding more controls. PhET's [interface-design research](https://phet.colorado.edu/publications/archive/PhET%20Interview%20Paper%20Part%20II.htm) supports intuitive manipulation and consistent representations; the particular controls above are recommendations for this project and need student testing.

## 3. Add reusable construction pieces and a simpler starting task

Promote the existing supported-window command into a small visual parts tray: **pillar, lintel, gate, window, target**. A gate should move, rotate and duplicate as one assembly, with an option to edit its individual blocks. Let the student specify opening width and height rather than solving three separate positions.

Offer an initial **one-gate alignment challenge**, then let students expand into a circle. The existing Sun gate sample supplies a starting point. Keep the full stone circle as an available option, and preserve existing drafts. Use optional labels such as “East gate · lintel” instead of relying on block numbers alone.

For physical construction, add a classroom-block kit with measured dimensions and a parts list. Scale an adopted design explicitly and uniformly if needed; do not silently alter an existing model or its saved evidence. Geometric support hints should be labeled as hints, since the current solver is not a structural-stability simulation.

## 4. Make seasonal motion leave visible evidence

Extend **From center** with the year slider and a fading or optional monthly sunrise trail. Keep the present hollow seasonal pins and distinguish them from the live Sun. The exact sunrise-bearing trail belongs on the horizon; a Sun displayed 10 minutes after sunrise belongs at its calculated altitude and bearing.

In plan view, draw an optional shadow-tip trail for a selected post or an identified tracked point. For seasonal comparisons, sample the same declared observation rule. Let students freeze June and December for a side-by-side comparison with the same camera and scale.

Add an optional alignment guide: select a target date and opening, show the Sun direction and the measured ray through that opening, and identify the obstruction if it misses. For the simple post, show distance from the shadow tip to the target. For an arbitrary light patch, do not invent a distance from the current point-classification solver; a patch boundary would need its own calculation.

Sunrise, solar-noon light patches and afternoon shadows are different design goals. Keep the observation rule visible when moving from exploration to testing. Preview playback must not rewrite recorded trials. The current model's terrain/refraction limits remain especially relevant at sunrise.

## 5. Simplify controls by task

| Mode | Primary workspace | Controls shown first |
| --- | --- | --- |
| Explore Earth | Earth and local sky/monument together | Day / year, play, date, observation rule, viewpoint |
| Build | Large monument plus plan inset and short inspector | Parts, select, move, rotate, snap, duplicate, undo/redo |
| Test | Monument with selected alignment and readable target | Date/time rule, compare, ray/marker reveal, save evidence |

Keep a compact compass and selected-object label visible. In Build mode, offer a plain measurement floor so mosaic decoration does not compete with the grid, selection and live light. Use the current textured court for the exhibit view. Treat these as workspace modes within the existing learning sequence, not replacements for its five curriculum steps.

## Recommended implementation order

1. **Selection and orientation:** linked mesh/list/plan selection, persistent compass, origin, readable target callouts and consistent units. This is the first construction milestone.
2. **Earth motion:** visible synchronized Earth/local views, Day/Year controls and year scrubbing in the center view. This is the first science-presentation milestone.
3. **Construction tools:** placement preview, snapping, rotation, keyboard alternatives, undo/redo, and gate assemblies.
4. **Alignment and exhibit:** trails, fixed-view seasonal comparison, obstruction explanations, parts list and a short guided demonstration.

The first two milestones address both user goals before spending effort on extra decorative detail. Relative scope: selection/orientation is a smaller extension; playback/layout is moderate; robust manipulation, assemblies and history are the largest part. These are relative estimates, not delivery commitments.

## Reusable capabilities and implementation gaps

Keep astronomy and sunrise behavior in the solar plugin; put selection, plan manipulation, snapping, assemblies and history in reusable engineering tools. The parent already provides design-change and capture callbacks, but does not provide shared selected-block state.

Potential `TEMPLATE_CAPABILITY_GAP` items for a future implementation:

- **Shared design selection/manipulation:** an optional validated interaction contract connecting editor, plan and installed renderer.
- **Compound construction pieces:** atomic multi-block operations; persistent group labels would require backward-compatible metadata if groups must survive reload.
- **Annual exploration playback:** plugin-owned date progression and a declared observation rule, with one computed observation feeding all views.

Preserve existing measured blocks, optical validation, read-only examples, immutable trial history and scoped persistence. Reuse existing sample-preview/adoption behavior and its explicit recovery path. Resolve these gaps as optional extensions rather than project-name branches or a new core engine.

## How to validate the improvement

Proposed classroom tasks, not completed test results:

1. Identify a selected stone in the list, plan and 3D view without help.
2. Place and rotate one gate, recover an incorrect move, and explain its opening direction.
3. Play a day and explain why the site alternates between daylight and darkness.
4. Play a year at a fixed observation rule and explain why the sunrise bearing or noon shadow changes.
5. Compare June and December without inadvertently moving the monument or changing the observation rule.

Record completion, help requests, placement errors, and the student's explanation. Test keyboard-only operation, touch placement and narrow screens. Automated checks should cover camera/geometry invariance, consistent timestamps across panes, unit conversions, atomic group validation, undo/redo, blocked placements, polar conditions, DST, leap years, and saved-evidence isolation.

## Change report

Added this report and linked it from the engineering README. No application code, project configuration, schemas or student designs were changed. No tests were added or rerun for this documentation-only assessment. Evidence comes from current-source inspection, the existing positioning audit, and browser inspection of block selection and the Earth explanation. No new architectural changes or specification deviations were made. The capability gaps above are proposed implementation work, not blockers to this assessment. Recommended next phase: the selection/orientation milestone followed by the synchronized Day/Year view.
