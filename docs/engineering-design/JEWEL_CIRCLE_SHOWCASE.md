# Brighter Jewel Circle showcase

The live monument uses warmer sandstone with larger mineral grain, engraved sun rosettes, chiseled borders and stronger relief. The pale central court retains space for shadows and colored light. A turquoise-and-gold mosaic band, interlaced petals and varied surrounding flagstones frame the experiment. Colored inlay is fixed floor decoration; a saved marker still records the calculated incoming light, independently of the floor's pigment.

Brighter daylight, a cyan sky, more saturated jewel surfaces and bronze reflections make the materials easier to read. Tone mapping retains bright highlights. The sole directional light still follows the calculated Sun, direct sunlight turns off below the horizon, and decorative reflections dim at night. Surface detail perturbs shading without changing measured block edges, circular bores or the y=0 ground. RGB filtering, target classification and scientific model limits are unchanged.

The completed example now contains 34 measured blocks: eight original gates, four pierced standing stones on feet and a two-step pedestal. A faceted bronze crystal rises from the pedestal. Emerald and violet outer windows join the original amber, blue and ruby roof jewels; two outer bores remain open. The four seasonal targets still match using the complete geometry, including the new sculpture and its shadows. The sample's reference measurements were regenerated with the actual evaluator, including the new height reference and sculpture-face readings.

Final presentation opens on a closer, fixed view of the monument. **Fit all** expands to include all four seasonal shadow extents; **See shadows** also chooses a view from the shadow side. Both close and expanded presentations retain one camera frame when the date changes. Existing student designs and the simpler 24-block starter are preserved.

## Artwork and files

Added `public/simulations/solar-monument/jewel-circle-cover.png`, using the built-in imagegen tool. The project catalog and project preview consume this local asset. The original tower diagram remains with the practice prediction about shadow length. The new image is illustrative key art, not a screenshot or measured blueprint. The exact [generation prompt and saved path](JEWEL_CIRCLE_IMAGE_PROMPT.md) are recorded separately.

Modified files:

- Simulation `monument-surfaces.js`, `optics-renderer.js`, `game.js`, `monument-camera.js`, `index.html` and `style.css`: materials, carving, lighting and framing.
- Curriculum `calendar-monument.solar-calendar.ts`, `calendar-monument.sample.ts`, `calendar-monument.sample-observations.ts`, `calendar-monument.intro.ts`, `projects/project-catalog.ts` and `runtime/project-showcase/engineering.sample.ts`: complete exhibit, generated reference observations, artwork and matching descriptions.
- `scripts/check-solar-calendar.cjs`: updated geometry checks and explicit `--write-references` regeneration command; normal runs require the saved evidence to match the evaluator exactly.
- `scripts/check-solar-scene.cjs`: close-versus-expanded final framing and stable camera checks, alongside the marker checks.
- Engineering README, final-calendar report, this report and image-prompt report.

## Validation and scope

The geometry, scene and optics checks pass, including 2,394 independent mesh/ray comparisons. The calendar check verifies all four matches, nearby-date limits, missing jewels, sealed holes, shifted markers and changed location. The focused Angular checks pass: 35 tests across engineering design, solar plugin and catalog, plus nine opening-page tests. Browser inspection verifies the new court, carved blocks, open bores, jewels and bronze crystal, all four live seasonal matches, the changing sculpture-face illumination and the project-preview artwork.

The production build and whitespace check pass. The existing unrelated stylesheet-budget warnings and two repository architecture findings remain documented in the engineering README. Browser verification also confirms that Fit all reveals December's longer shadows.

This update uses existing simulation and curriculum contracts. No new dependencies, persistence fields, schema migration, core behavior, specification deviations or unresolved `TEMPLATE_CAPABILITY_GAP` items were introduced. The new graphics are presentation; simulated trial evidence still comes from the existing astronomy and analytic optics.

Recommended next phase: classroom usability and physical calibration. Check how easily students can distinguish fixed mosaic colors from transmitted jewel light, then compare a physical build at matching dimensions, true north, site and time. No refraction, focusing, weather or outdoor accuracy tolerance is claimed.
