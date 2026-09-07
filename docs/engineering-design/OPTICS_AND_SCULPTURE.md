# Light windows and sculpture — implementation and classroom check

## What students can do

The 3D canvas remains the main lab and the final demonstration. In **Blocks & targets → Shape the light**, students can add a supported window or cut one centered cylindrical bore through any block’s local X, Y or Z axis. They set its measured diameter and rotate the block in degrees. The bore leaves at least a 5% rim on each side. A block retains its opening when it is resized, stacked, saved or replayed; a resize that removes the rim is rejected.

An opening can be empty or contain a flat glass or jewel window. Clear, ruby red, amber, emerald green, sapphire blue and amethyst violet inserts are available. The visible glass and decorative jewel facets are in the bore. Direct light is colored only where a ray clears the entire tunnel. A second block or the sculpture can intercept it. Sequential filters multiply their RGB transmission and are reported as “mixed filters,” not additive colored spotlights.

The central 3D object can be a round sculpture (sphere or ellipsoid), faceted crystal (octahedron), or obelisk (square frustum). Students control width, height, position, rotation, and limestone, porcelain or bronze finish. **Inspect sculpture** moves the camera around that object without moving the design. Its surface normals and material determine the response to the actual calculated directional sunlight. It can receive colored light, receive block shadows and cast its own shadow.

The final four-date comparison accepts shadow, unfiltered sunlight, individual colored light and multiple-filter expectations. Each trial also records representative sculpture face-centre readings. The canvas shows the complete illuminated surface; those sparse samples are not a percentage of total illuminated area. Exported plans include openings, inserts and sculpture dimensions. Earlier evidence remains immutable.

## Reusable contracts and ownership

- Shared `DesignBlock.aperture?: DesignAperture` and `BlockDesign.displayObject?: DesignDisplayObject` are additive optional extensions. The existing configuration/snapshot envelope remains 1.0 and old designs with no optical fields remain valid. Captures identify the changed physical calculation as `modelVersion: solar-optics-2.0` (previously `solar-geometric-1.1`). No core contracts or backend dependencies changed.
- The reusable engineering template owns the measured optical editor and construction plan. `DesignOpticsBuilderComponent` emits a full proposed design through the existing validated `engineering.designSaved` runtime path; it does not persist directly.
- Installed `simulation.solar-monument` owns `optics.js` (deterministic tracing, object samples and iframe validation), `optics-renderer.js` (Three adapter), date evaluation and evidence capture. Project files contain only curriculum content. Unknown model/insert IDs and malformed dimensions fail validation.
- TS and iframe boundaries both enforce bounded coordinates, dimensions, ID uniqueness, 100 blocks / 12 targets, bore clearance and solid overlap. A sculpture reserves its rotated rectangular envelope; fitting another solid inside a hole or inside a sculpture’s empty bounding space is intentionally unsupported.
- Runtime persistence still occurs only on meaningful edits/captures, scoped to the existing tenant/project/version/learner/attempt. No per-frame writes, new services, uploads or dependencies were added. A selected model’s full description travels with every saved trial and final comparison.

## Rendering and calculation

Each ray is transformed to a block’s local coordinates. A slab intersection gives entry and exit points in the rectangular solid. Both must lie inside the cylindrical cross-section; because the cylinder is convex, that establishes clearance through the full depth. Any intercepted opaque solid removes direct sunlight. Otherwise each encountered insert multiplies its transmission into the ray.

The renderer uses actual extruded geometry with circular holes, rather than drawing circles on opaque boxes. A bounded float data texture holds block solids and filter coefficients. The corresponding analytic visibility function runs in the material shader before Three’s direct-light BRDF, so the ground, blocks and sculpture use the same sunlight direction, depth, occlusion and filter rules as CPU evidence. Ground shadow polygons were replaced, since opaque silhouettes cannot represent transmitted light. Sphere/ellipsoid intersections and convex planes handle the sculpture. The sphere mesh has finite tessellation; crystal and obelisk planes match their mesh faces. Rendering runs on scene changes, camera movement and time changes rather than continuously while idle.

Three r160 remains locally vendored. See [extruded geometry](https://threejs.org/docs/pages/ExtrudeGeometry.html) and [material shader customization](https://threejs.org/docs/pages/Material.html). The student color research source is the Exploratorium’s [Color Removal exhibit](https://annex.exploratorium.edu/xref/exhibits/color_removal.html), which demonstrates selective absorption by filters.

## Physical limits

This is a parallel-ray, point-Sun, level-ground model. RGB values are illustrative transmission factors, not measured spectra or calibrated brightness. Inserts act as flat filters: curved-lens focusing, Snell refraction, dispersion, caustics, internal jewel reflections and rainbows are **not implemented**. Jewel facet lines describe the appearance of the insert, not a different optical path. Ambient illumination is a visual fill, not a sky irradiance simulation. Finite Sun-disk penumbra, atmosphere, clouds, terrain, structural stability and material heating are outside this model. The primary outcome is a reproducible geometric design, followed by measured outdoor comparison.

The object library currently contains three built-in shapes. Arbitrary GLB/OBJ upload and imported-mesh shadow/evidence evaluation are not implemented. A next optics phase would require an independently verified refractive solver, declared material properties, receiver sampling/energy conservation, deterministic capture semantics and a bounded imported-mesh contract. Do not represent decorative glow or a spotlight as lens focusing.

## Verification

- `node scripts/check-solar-optics.cjs`: 2,394 independent Three mesh-ray comparisons across aperture axes, rotations and sculpture shapes; tunnel-depth blocking, open/colored/stacked filters, opaque interception, night, sculpture lighting and shader bindings.
- `node scripts/check-season-review.cjs`: existing seasonal/date/hemisphere cases plus a colored equinox match, solstice misses and a solid-window negative control.
- `node scripts/check-solar-scene.cjs`: controller and real CPU Three geometry, fixed design orientation, independent camera, shared Sun direction, night, four-date replay and guide controls.
- `node scripts/check-solar-monument.cjs`: astronomical and geometric regression checks.
- Angular engineering and solar plugin suites: 17 tests, including invalid optical configurations, old-design compatibility, persistence/replay, dimension changes, stacking, supported window construction and colored expectations.
- Browser: verified narrow and desktop layouts, no WebGL shader errors, a colored patch on the ground and sculpture, the four seasonal predictions below, a recorded batch of four, and reload persistence.

Reproduce the browser investigation at Colorado Springs (38.83, −104.82), year 2026:

1. Keep the starter tower and add one supported light window (at X 1.2, Z 0). Its top block is 0.8 × 0.8 × 0.06 m, base Y 0.6 m, with a 0.48 m Z-axis red glass opening.
2. Add the default limestone crystal at X 1.2, Z −0.7, base Y 0, width 0.4 m, height 0.65 m.
3. Add a target at X 1.4, Z −0.8. Predict red light in March and September, unfiltered sunlight in June and December.
4. Final demonstration gives 4/4 matches at local solar noon. Record the comparison, reload, and verify four saved trials and the same design/checks. Use Inspect sculpture and orbit the camera to compare the colored surface.

These are simulated outcomes, not outdoor calibration measurements. The preview project remains unpublished; no production deployment was performed.

## Change report

Added `public/simulations/solar-monument/optics.js`, `optics-renderer.js`, `src/app/templates/engineering-design/ui/design-optics-builder.component.ts`, `scripts/check-solar-optics.cjs`, and this document. Modified shared block-design contracts/validators; the reusable block editor, plan, exhibit and engineering tests; the solar plugin controls; the static lab controller, HTML/CSS and seasonal evaluator; existing scene/season checks; calendar-monument learning content; and the engineering documentation.

Architecture decisions: extend the existing registered simulation and generic engineering editor, preserve old snapshots and runtime persistence, use measured geometry and deterministic tracing for both rendering and evidence, and avoid new dependencies or project-specific code. Four optical Angular cases and the independent optics script were added; seasonal and scene fixtures were updated. Build, 17 Angular tests and all four Node scripts passed; browser verification includes reload and the 4/4 color demonstration. Existing unrelated SCSS size warnings remain.

Specification boundary: glass/jewel inserts are flat color filters. `TEMPLATE_CAPABILITY_GAP` for a future requirement of physically focusing/refracting lenses: this release has no refractive solver or calibrated material spectra. There is no unresolved gap for measured cylindrical bores, colored transmission, built-in central objects or seasonal comparison. Recommended next phase: calibrate a physical classroom build, then define and verify the refractive optics/imported-model extension if needed.
