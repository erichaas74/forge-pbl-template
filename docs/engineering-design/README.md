# Build a Calendar Monument

Open `/projects/calendar-monument` for the student launch, `/projects/calendar-monument/experience` for the workspace, or `/projects/calendar-monument/final-demo` for the fictional example.

The Grade 5 project asks students to research Sun and Moon patterns, compare seasonal Sun angles, construct matching physical/digital block monuments, test equinoxes and solstices, revise, and explain the evidence. Plan approximately 10–12 lessons: observe; research; compare; design; construct; test; revise; exhibit. Extend Moon observations across about a month.

The first challenge is a tower with three seasonal ground markers. In Colorado Springs, solar-noon shadows are short near June solstice, intermediate near either equinox, and long near December solstice. Students investigate why both equinoxes share an approximate alignment. A lintel opening is an extension. Test nearby dates to discover how precisely a monument identifies an event.

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

- Angular production build passed. Existing SCSS budget warnings remain in other projects.
- 33 selected tests passed across 7 files: engineering template, project catalog, local template registration, opening registry, teaser registry, project-home component and project-intro component.
- Standalone geometric-shadow and seasonal-date checks passed.
- Browser checks confirmed trial capture, saved prediction/design evidence, June sunlit versus December shaded target, and the completed example. The browser tool subsequently timed out opening the launch page; launch registration and opening behavior are also covered by the passing tests.
- Repository-wide architecture check still reports two findings outside this change: `core/index.ts` imports its own `./templates` barrel (the checker matches the segment name), and `projects/mystery-substance/lab-kit/render-quality.service.ts` is project-specific service code. No engineering-design boundary violation was reported. These findings were left outside this project's scope.
