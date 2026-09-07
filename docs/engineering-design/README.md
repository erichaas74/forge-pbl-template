# Build a Calendar Monument

The lab now includes a visible [six-model sample gallery](SAMPLE_MODELS.md): gates, round openings, colored windows, a pierced pyramid, a shadow crown and twin tunnels. Preview without changing saved work, or adopt a sample and retain a restorable previous design.

Open `/projects/calendar-monument` for the student launch, `/projects/calendar-monument/experience` for the workspace, or `/projects/calendar-monument/final-demo` for the fictional example.

The Grade 5 project asks students to research Sun and Moon patterns, compare seasonal Sun angles, construct matching physical/digital block monuments, test equinoxes and solstices, revise, and explain the evidence. Plan approximately 10–12 lessons: observe; research; compare; design; construct; test; revise; exhibit. Extend Moon observations across about a month.

The first challenge is a tower with three seasonal ground markers. In Colorado Springs, solar-noon shadows are short near June solstice, intermediate near either equinox, and long near December solstice. Students investigate why both equinoxes share an approximate alignment. A lintel opening is an extension. Test nearby dates to discover how precisely a monument identifies an event.

The [Sun-model integration plan](SUN_MODEL_PLAN.md) records the source inspection and outdoor calibration procedure. The lab now opens directly on the **3D monument and shadow canvas**. Block tools, research, and evidence open in supporting panels. Place/time and sky paths are optional guides. The camera moves around a fixed monument.

Choose **Final demonstration** to walk through both equinoxes and both solstices on that same canvas. Define a target and expected shadow, sunlight or colored light for each date. The live comparison shows what matches and what needs revision; recording it saves all four tests together. The fictional final example demonstrates this same interactive final product. Target-centre checks do not establish a unique event date: test nearby dates and compare a physical build too. The new [optical design extension](OPTICS_AND_SCULPTURE.md) adds cylindrical holes, glass/jewel filters and a central sculpture with changing surface illumination.

## Implementation map

Added:

- `src/app/projects/calendar-monument/`: curriculum configuration, introduction, and fictional sample.
- `src/app/templates/engineering-design/`: validated configuration and snapshot contracts, runtime, research/design/testing UI, block editor, plan view, exhibit, and tests.
- `src/app/shared/engineering/`: block geometry/capture contracts, overlap checks, renderer registry and capture boundary.
- `src/app/plugins/simulations/solar-monument/`: Angular lab host.
- `public/simulations/solar-monument/`: adapted original lab, projection geometry, verified seasonal data, cover diagram, local dependency libraries/licenses and Earth textures.
- `src/app/infrastructure/persistence/browser-engineering-design.adapter.ts`.
- `src/app/runtime/local-engineering-design-runtime.ts`, `project-launch/template-launchers/engineering-design.launcher.ts`, and `project-showcase/engineering.sample.ts`.
- `scripts/check-solar-monument.cjs` and [the template specification](../build/13_ENGINEERING_DESIGN_TEMPLATE.md).

Integrated through existing catalog, intro list, definition source, lazy template launcher, local template registry, completed-sample registry, and shared launch tests. New intros are appended to preserve existing fixture order. The shared opening now focuses the product heading when the optional teaser is absent. Two strict type annotations/guards were corrected in the neighboring automation validator to unblock the shared Angular compiler; its behavior was otherwise preserved. The original `grade-5/Globe-Sun-Shadow` folder was not modified.

## Research and calculation sources

- [NASA: What causes the seasons?](https://spaceplace.nasa.gov/seasons/en/)
- [NASA: Moon phases](https://science.nasa.gov/moon/moon-phases/)
- [NOAA: solar terminology](https://www.gml.noaa.gov/grad/solcalc/glossary.html)
- [English Heritage: Stonehenge and the solstice](https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/stonehenge-and-solstice/)
- [US Naval Observatory: seasons API](https://aa.usno.navy.mil/data/api) — bundled event instants retrieved 2026-09-07, years 2025–2030.
- [SunCalc 1.9.0](https://github.com/mourner/suncalc/tree/v1.9.0) — Sun/Moon positions and phases.

Preview scope and model limits are documented in the specification. The next classroom step is an outdoor comparison at matching location, date, time, dimensions, and true-north orientation.

## Verification results (2026-09-07)

Canvas and final-demonstration update:

- Production build passed; only existing style-budget warnings remain elsewhere.
- 19 Angular tests passed across the engineering runtime, solar demonstration bridge and teaser registry.
- Three simulation scripts passed: geometric shadows, scene/controller integration, and the new four-season evaluator.
- Browser verification in a separate preview origin confirmed full-width canvas, supporting block tools, target creation, seasonal replay, a visible June miss among three matches, atomic recording of four tests, reload persistence, and a read-only example with four calculated comparisons. Test data was kept separate from the user's existing localhost draft.
- The two existing architecture findings listed below remain; no new engineering boundary finding. `git diff --check` passed.

Added in this update: `season-review.js`, `check-season-review.cjs`, the solar component HTML/SCSS/spec, and `engineering-final-demo.component.ts`. Modified the shared design-check and callback contracts, engineering snapshot/runtime/launcher, workspace layout, astronomy frame/controller, sample renderer/content and regression checks. All behavior remains behind the installed simulation and generic engineering template. No breaking schema changes, specification deviations or unresolved capability gaps for this request. Next phase: outdoor calibration and stronger precision criteria for calendar alignments.

Latest 3D sky update:

- Production build passed; existing style-budget warnings remain elsewhere.
- 14 Angular tests passed across the engineering-design and teaser-registry suites.
- Both `check-solar-monument.cjs` and the new `check-solar-scene.cjs` passed. The latter uses the actual controller and CPU Three.js scene with a stub GPU; it checks fixed transforms over 120 frames, camera independence, view switching, capture metadata, shared light direction and night behavior.
- Chrome checks confirmed the Research entry button, visible seasonal arcs and Sun marker, June/December solar-noon readouts (approximately 0.28 m / 1.90 m for the 1 m reference), keyboard camera rotation, and Plan view. No student trials or research notes were changed during these checks.
- `git diff --check` passed. The same two repository-wide architecture findings listed below remain outside the astronomy changes.

Initial integration:

- Angular production build passed. Existing SCSS budget warnings remain in other projects.
- 33 selected tests passed across 7 files: engineering template, project catalog, local template registration, opening registry, teaser registry, project-home component and project-intro component.
- Standalone geometric-shadow and seasonal-date checks passed.
- Browser checks confirmed trial capture, saved prediction/design evidence, June sunlit versus December shaded target, and the completed example. The browser tool subsequently timed out opening the launch page; launch registration and opening behavior are also covered by the passing tests.
- Repository-wide architecture check still reports two findings outside this change: `core/index.ts` imports its own `./templates` barrel (the checker matches the segment name), and `projects/mystery-substance/lab-kit/render-quality.service.ts` is project-specific service code. No engineering-design boundary violation was reported. These findings were left outside this project's scope.
# Optical windows and central sculpture (2026-09-07)

Added measured cylindrical openings, colored glass/jewel inserts, a central sculpture library with real directional/material lighting, colored target expectations and face samples in final seasonal evidence. The 3D canvas remains the main workspace. See [contracts, physics, validation, classroom reproduction and remaining optics scope](OPTICS_AND_SCULPTURE.md).

Validation: production build; 17 Angular engineering/plugin tests; four Node geometry/scene/season/optics scripts, including 2,394 independent mesh-ray comparisons; browser four-season color comparison and reload. Existing unrelated SCSS budget warnings remain. No new package, backend, deployment or project-specific behavior was introduced. Three built-in sculpture models are available; refracting/focusing lenses and arbitrary imported models remain a documented future capability.

# Monument appearance

See [Monument graphics](MONUMENT_GRAPHICS.md) for the carved stone court, stone/glass finishes, scientific boundaries and validation of the graphics upgrade.

# Build, Show Sun, and Play day

The canvas now includes traced sunlight, improved shadow-side framing and zoom, a sunrise-to-sunset cycle, optional Earth tilt/orbit explanation, configurable final observation times and nearby-date checks. See [implementation, contracts, validation and remaining physical limits](SUN_DAY_AND_LEARNING.md).

# Start with a sundial

The learning sequence now begins with a student-built vertical-post dial and Play day. Fixed time marks reveal a seasonal surprise before the Earth-tilt explanation; students then mark both equinoxes and solstices on their dial. The creative Sun monument is the final challenge. Practice and final designs save separately. See [the five lessons, scientific basis, compatible contracts and passing checks](SUNDIAL_LEARNING_SEQUENCE.md).

The follow-up [compact layout](SIMPLIFIED_LAB_LAYOUT.md) puts navigation and Sun events in one header, with clickable Guide, samples, notebook and comparison panels. It replaces the earlier stacked headings throughout the lab and final example.
