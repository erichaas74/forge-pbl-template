# Archaeological monument graphics

The solar-monument renderer now presents the student's measured design on a pale, carved stone court. The floor has concentric engraved rings, a compass rose, cardinal medallions, Sun rosettes, a diamond border, worn fissures and surrounding flagstones. The broad centre stays relatively quiet to make projected shadows and colored light easy to compare.

Blocks have limestone grain, small surface pits, worn edges and deterministic variation between stones. Glass inserts use a physical surface material with clearcoat, sky reflections and transparent color; jewel inserts have faceted normals. Limestone sculptures use the same stone finish, while porcelain and bronze retain their selected finishes and receive reflections. The notebook, gallery and canvas controls use a coordinated limestone and aged bronze palette. Target labels are smaller, and an optional **Metre grid** restores the measurement overlay.

## Architecture and scientific limits

- `monument-surfaces.js` owns procedural textures and composes surface shading with the existing optical renderer. It is reusable within the simulation plugin and contains no curriculum/project-name branches.
- The existing analytic direct-light visibility still drives the ground, stone and sculpture. Bump shading changes surface normals without displacing vertices: the measured floor remains at y=0, block silhouettes and bore dimensions are unchanged, and the existing CPU evidence calculations remain authoritative for target classification.
- The engraved design is original decoration, not a reconstruction of a historical site or a calibrated seasonal calendar. The UI explains that students must place and test their own targets.
- Glass still models RGB filtering of parallel sunlight. The upgraded finish does not add focusing, refraction, prism splitting or physical caustics. Its reflected environment is a diffuse illustrative sky/ground gradient with no additional direct Sun; it dims at night.
- Shared grain, carving and reflection textures are created once per renderer and disposed by that renderer. Replacing a sample disposes its geometry/materials without disposing textures still used elsewhere. All assets are generated locally; no new packages or external asset requests are required.
- Visual options remain local UI state. Existing project configuration, runtime persistence, saved designs and trial contracts are compatible.

Visual checking also exposed a previous refresh bug: when the sky guide was closed, a new design/date could change the readouts without scheduling a canvas render. The scene now refreshes its camera and frame on every Sun/design update in all camera modes. This also updates sculpture framing when a different sample is selected.

## Files added

- `public/simulations/solar-monument/monument-surfaces.js`
- This report, `docs/engineering-design/MONUMENT_GRAPHICS.md`

## Files modified for this upgrade

- `public/simulations/solar-monument/optics-renderer.js` — material composition, glass and sculpture surfaces, shared surface lifecycle.
- `public/simulations/solar-monument/game.js` — textured court/blocks, lighting, optional grid, label size and reliable frame refresh.
- `public/simulations/solar-monument/index.html`, `style.css` — surface module, grid control and canvas styling.
- `src/app/plugins/simulations/solar-monument/solar-monument.component.html`, `.scss` — appearance explanation and lab chrome.
- `src/app/templates/engineering-design/ui/engineering-design-page.component.scss` — notebook palette.
- `src/app/templates/engineering-design/ui/design-sample-gallery.component.ts`, `design-thumbnail.component.ts` — stone thumbnails and glass highlights.
- `scripts/check-solar-optics.cjs`, `scripts/check-solar-scene.cjs` — load the surface module and extend rendering regressions.
- `docs/engineering-design/README.md` — link to this report.

## Validation

- Angular production build passes. Existing stylesheet budget warnings remain in unrelated templates.
- Both focused Angular suites pass: 20 tests for the engineering template and solar plugin.
- Optical checks pass 2,394 independent mesh/ray comparisons plus all axes, rotations, bore depths, filters, occlusion, night and sculpture illumination.
- New material checks verify that surface shading keeps the analytic light hook, shared textures survive block replacement, renderer disposal releases those textures, jewel normals preserve the planar aperture, and reflection brightness falls at night.
- Scene checks verify the unchanged y=0 floor, optional grid and immediate render after selecting a new sample or date with the sky guide closed. Existing fixed geometry, independent camera, seasonal review/replay and guide controls pass.
- Seasonal review and solar geometry/astronomy script suites pass.
- Browser inspection in the running localhost lab covers textured stone, the circular carvings, glass windows, colored patches and a stone crown/sphere. The crown appears immediately when selected without a camera adjustment. No WebGL shader errors were reported.

## Scope, gaps and next phase

No schema changes, new runtime capabilities or deviations from the requested graphics scope. `TEMPLATE_CAPABILITY_GAP`: none for this upgrade. The existing limitations around true lens optics remain as documented in `OPTICS_AND_SCULPTURE.md`.

Recommended next phase: have students compare photographed outdoor block builds with the same saved date, location and dimensions, using the existing seasonal demonstration to discuss alignment tolerances.
