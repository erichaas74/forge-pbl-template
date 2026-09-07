# Engineering Design template 1.0

The reusable `engineering-design` template supports research, a measured block design, bounded simulation trials, and an evidence exhibit. Its first curriculum package is `calendar-monument@1.0.0` (Grade 5, Preview).

## Contract and composition

- `EngineeringDesignConfig` declares `schemaVersion: 1.0`, independent project version, `template: { id: engineering-design, version: 1.0 }`, mission, research questions and HTTPS sources, design brief, test instructions, exhibit prompts, starter design, and installed simulation ID.
- Curriculum contains content and configuration only. Angular components live under `templates/engineering-design`; the astronomy renderer lives under `plugins/simulations/solar-monument`. No core schema changed.
- The common project host, lazy launcher registry, template registry, immutable configuration loader, opening system, completed-sample host, and scoped browser-store contract are reused.
- `LocalEngineeringDesignRuntime` validates packages through the shared immutable configuration loader. The launcher validates project identity/version and resolves the simulation before opening the workspace. `CONFIG_INVALID` and `CAPABILITY_NOT_INSTALLED` stop an invalid launch.
- `DesignSimulationRegistry` resolves platform-installed renderer IDs. This release registers `simulation.solar-monument`. Packages cannot supply executable iframe URLs.
- The common catalog exposes `design.block-builder`, `engineering.trial-notebook`, and `showcase.design-exhibit` as template capabilities.

## Design and trial records

`BlockDesign` is a list of up to 100 cuboids and 12 labelled point targets. Units are metres. +X is east, +Y is up, +Z is south. Y is the block base, not its centre. Rotation follows the Three.js Y-axis convention. The UI offers quarter turns, positions, dimensions in centimetres, stacking, selection, removal, and undo. Validation rejects non-finite dimensions, duplicate IDs, out-of-range fields, and overlapping solids. Touching faces are allowed. Structural stability/gravity is not modelled.

`DesignCapture` carries a stable receipt ID, plugin ID, timestamp, immutable design, bounded settings, and labelled measurements. Every saved trial adds the student's prediction at capture time. Subsequent edits leave those records intact. The template caps trials at 40 and event receipts at 200, supports replay from a saved design/settings pair, and exports the complete notebook and blueprint as JSON. The exhibit includes a scaled plan view, dimensions, target coordinates, and measurement cards.

Registered events are `engineering.designSaved`, `engineering.researchSaved`, `engineering.predictionSaved`, `engineering.exhibitSaved`, and `activity.completed` for a recorded simulation trial. The runtime owns mutation and persistence, appends tenant/project/actor/attempt event metadata, increments revision, and deduplicates repeated trial IDs. Text saves on change/blur; slider movement and animation frames are not persisted. Hidden simulations pause animation/playback.

`BrowserEngineeringDesignAdapter` implements the persistence boundary through `ScopedBrowserStore`, scoped by tenant, project, version, learner, class, team and attempt. Save failures remain visible, with the in-session draft retained for export. This is a local draft preview, not an authoritative submission, grade, shared team record, or server-confirmed completion. The fictional final example has no persistence providers.

## Solar monument plugin

The trusted same-origin iframe is adapted from the user's `grade-5/Globe-Sun-Shadow` source. Messages require the expected frame/parent window, exact origin and channel. Incoming capture shape, expected receipt ID and plugin ID are validated by the host. Student project configuration never selects remote scripts.

The copied lab retains globe location selection, local time zones, Sun and Moon paths, Moon illumination and phases, daily readouts, and seasonal comparisons. Pinned dependencies and Earth textures are bundled in `public/simulations/solar-monument`; it does not need CDN requests during a lesson.

Solar angles come from SunCalc 1.9.0. The exact geometric ground shadow of each cuboid is the convex hull of its eight corners projected along parallel solar rays onto the horizontal ground. A target centre is shaded if it lies inside any projected polygon. This handles elevated lintels and openings, rotated blocks, scale, and overlapping *shadows*. It is independent of the WebGL shadow map. WebGL still shades block surfaces. No solar ground shadow is drawn at or below zero geometric altitude. Very long shadows may extend outside the chosen camera view; target calculations are not clipped by the camera.

The display explicitly distinguishes `height / tan(altitude)` (a vertical-height reference) from the full monument shadow footprint. Light-vector clamps and night-time directional sunlight from the original were removed. Plan and perspective cameras have adjustable view size.

Season buttons use US Naval Observatory event instants for **2025–2030**, converted to the selected location's local date. Date inputs are bounded to that range. Choosing an event date does not change the observation time: students select Solar Noon for each seasonal trial. The globe is a location selector, not an Earth-orbit/axial-tilt animation.

Model assumptions: level ground, true north, matched dimensions/place/time, direct geometric sunlight, no terrain/trees/clouds, no atmospheric refraction of solar rays, no finite solar disk/penumbra and no structural physics. Near-horizon alignments are especially sensitive to these assumptions. Moon information supports research; the monument casts solar shadows only. Classroom outdoor validation remains necessary before claiming a physical accuracy tolerance.

## Verification

- `node scripts/check-solar-monument.cjs`: cardinal bearings, 45-degree shadow length, overhead/low/night Sun, rotated footprints, lintel gaps, scale invariance, seasonal altitude checks, Denver/London seasonal calendar dates, complete event tables and JS syntax.
- `src/app/templates/engineering-design/engineering-design.spec.ts`: package validation, collision detection, immutable trial history, retry idempotency, reload, failed saves, learner/version/attempt isolation, plugin resolution, and measured stacking/undo.
- Shared catalog, template registration, opening/teaser and project-home tests cover launch integration. Shared teaser validation respects its already-optional contract; every supplied teaser is still validated.
- Browser verification: capture a June solar-noon trial (1 m tower reference approximately 0.275 m); a target at X=0, Z=-1 is sunlit in June and shaded in December (reference approximately 1.902 m). Check the evidence record and completed example.

## Scope and next phase

Resolved `TEMPLATE_CAPABILITY_GAP`: installed a reusable measured block builder, design-simulation host, trial notebook and exhibit instead of a project-specific Angular page. Core contracts and other template behavior remain compatible.

This release is Preview. Next phase: calibrate with classroom blocks and outdoor observations, agree on measurement tolerances, then connect shared team persistence and authoritative final submission using the LMS adapters. Optional later additions include photographs, shadow-tip traces, an axial-tilt visualization and terrain horizons. These are not claimed as implemented.
