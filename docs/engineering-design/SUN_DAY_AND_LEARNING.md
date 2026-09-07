# Build, Show Sun, and a complete day

The monument canvas is the main work surface. **Build** opens the reusable block tools with neutral construction lighting; **Show Sun** closes those tools and reveals the calculated illumination. Students can make a prediction in a short disclosure before testing. Research, numerical measurements, Moon paths and extra camera views remain optional.

## What changed

- **Play day** starts at the selected location/date's sunrise, pauses and resumes, and stops at sunset. It has slow, normal and fast speeds, a scrubber, sunrise/sunset endpoints and solar noon. The normal cycle takes about 45 seconds while active. Dates with sunset after midnight retain the next day's time instead of reversing the slider. Polar daylight/night has explicit behavior.
- Visible **parallel ray arrows** share the analytical optical geometry used for target evidence. A selected ray stops at the first solid surface, passes through an open bore, or changes color at a glass/jewel insert. Students can choose a block/target or click a stone. A gold Sun-angle arc and dashed height-only shadow reference explain the geometry. The ruler is explicitly separate from the monument's full footprint.
- Camera framing uses measured rotated geometry, sculpture bounds, target positions and shadow projections. Scroll, +/- and drag/keyboard orbit work around the scene centre, including off-centre and wide designs. **Fit all** resets zoom; **See shadows** turns the camera toward the shadow side. Camera position stays steady during day playback and the four-date final comparison.
- **Why seasons?** opens a synchronized Earth close-up, orbit diagram and four-season solar-noon reference graph. Earth rotates with the selected time and moves around the Sun with the date. Its 23.4397-degree axis keeps the same direction in orbital coordinates. The local site's horizon angle agrees with the same SunCalc direction that lights the monument. Sizes and distances are schematic.
- Final tests support solar noon (default), 30 minutes after sunrise, 30 minutes before sunset, or a chosen local clock time. Each test also computes the target result seven days before and after using that same rule. Nearby dates can be replayed without changing the recorded seasonal result. The canvas displays the actual current date/time during the demonstration.

## Architecture and compatibility

There are no project-name branches, new packages, backend dependencies or persistence shortcuts. The registered `simulation.solar-monument` owns astronomy and rendering. The generic engineering page owns tool-panel navigation. `DESIGN_VIEW_REQUEST` is an optional local UI callback; it never persists work. The iframe reports bounded content height so optional explanations expand naturally. Messages require the expected channel, exact frame and same origin.

`DesignCheck.settings` is an optional generic dictionary, limited to four short string/finite-number parameters. The solar plugin owns `observationRule` and `minutes` semantics; unsupported values fail review rather than silently selecting a different time. Old checks default to solar noon. Runtime events, scoped persistence, immutable trial designs/predictions and atomic four-record capture are reused. Added capture metadata remains inside the existing bounded settings contract; old records remain readable. Preview samples and completed examples remain protected from persistence.

New modules: `solar-day.js` (shared time/Earth math), `monument-camera.js` (projection-aware framing), `sun-demonstration.js` (visible optical paths), and `earth-explanation.js` (schematic rendering), all under `public/simulations/solar-monument/`. Updated files include that directory's controller, HTML, CSS, optical trace and seasonal evaluator; the Angular solar component and specs; shared design/callback contracts; engineering page and runtime tests; and curriculum instructions. `scripts/check-solar-demonstration.cjs` is new; scene, optics and seasonal tests were extended.

## Verification

- Production Angular build passes. Existing style-budget warnings in other templates remain.
- 23 focused Angular engineering/plugin tests pass, including stored time rules, bounded iframe sizing, same-origin navigation and read-only preview protection.
- Five Node suites pass: basic geometry/date integration, real scene/controller with a stub GPU, independent optical geometry comparisons, seasonal/nearby-date evaluation, and new Sun-day/Earth/camera invariants. Tests cover 2,394 independent triangle-ray comparisons in both incoming and outgoing directions, 120 Earth/local angle comparisons, DST, after-midnight sunset, polar conditions, exact noon replay, full playback with a deterministic clock, stable comparison framing and portrait/landscape projection bounds.
- Browser checks cover real WebGL stone/glass shadows, day playback/pause, the shadow-facing camera, Build/Show Sun panel navigation, the enlarged Earth view, a 430px-wide viewport, saved target selection, and a final comparison replayed one week after the event. No renderer errors were observed. Student designs and notebooks were preserved during preview checks.
- The repository architecture check still reports its two existing findings: `core/index.ts` importing `./templates`, and the mystery-substance `render-quality.service.ts`. Neither is introduced by this work.

## Physical limits and next phase

The floor stays level; carving and stone grain affect surface appearance. Sunlight is parallel and geometric. Sunrise/sunset labels include the apparent-horizon convention, while direct rays appear only with the Sun's centre above the geometric horizon. Camera fitting bounds very long shadows for readability; the light solver does not shorten them, and the UI reports when they extend beyond view.

Glass/jewels filter illustrative RGB light. Focusing lenses, refraction, caustics, soft shadow edges, terrain and structural stability are outside this model. The Earth panel is a schematic, not a scaled solar system. A matching target centre on a seasonal date does not by itself establish a unique calendar marker; the nearby-date tests make this visible.

The requested additions are covered with compatible template/plugin extensions. No unresolved capability gap or specification deviation was needed. Next phase: compare a measured classroom build with outdoor shadows and agree on practical tolerances before making physical accuracy claims.
