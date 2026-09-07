# Learning and Sun demonstration audit

Date: 7 September 2026. Scope: current student lab, curriculum, solar/optical code and the proposed **Build → Show Sun** experience.

## Main finding

The project has a useful working model of **what a changing Sun angle does to a monument**. It still needs a visible connection to **why that angle changes**. Earth's tilt is already included in the solar calculations (`vendor/suncalc.js:36`, obliquity 23.4397°), but the globe currently only selects the observing location (`game.js:260`, `game.js:423`). It does not show the tilted axis, the orbit, date-dependent sunlight on Earth or the selected site's relationship to the local horizon.

The next investment should be the demonstration and explanation controls. The stone court and sample models already provide enough visual interest to support them.

## What to keep

- The main 3D canvas, fixed measured geometry and independent camera.
- Sunlight and rendered shadows using the same calculated direction, with full-depth holes and colored filters.
- Sample previews that preserve students' saved work.
- Research prompts, predictions, immutable trial records, revision and physical construction plans.
- Four seasonal dates and tests of a named target, with clear outcome text.
- The nearby-date and outdoor comparisons already requested in the learning guides.

These are strong foundations. Their existence does not, by itself, demonstrate that a student understands rotation or tilt, or that an alignment identifies a particular day.

## Prioritized findings

| Priority | Finding and evidence | Learning consequence | Recommended change |
|---|---|---|---|
| First | No **Show Sun** action. Sun controls are spread across Place & time, Sun path guide, Sky guide and camera views. `index.html`; `game.js:1257`. | Students can observe an effect without following the path from incoming light to the shadow. | Make Show Sun a primary action beside Build. Keep the monument prominent and reveal a small set of parallel arrows, their intersections and the selected day's Sun angle. |
| First | The only 3D ray is a line from the illustrative Sun marker to the ground origin. It does not intersect the selected stone, hole or target. `sky-model.js:16,87`. Sky guide changes the camera distance. | The displayed guide does not explain why a specific target lights up or why a deep hole blocks light. A close Sun marker could also suggest rays should fan outward. | Draw parallel rays from an upstream plane, aligned with the existing solar direction. Trace one selected ray through the actual design. Stop it at opaque stone, continue through a clear hole, and tint the transmitted segment after glass. Clearly describe arrows as explanatory guides. |
| First | Earth tilt exists in the calculations but has no visual explanation. `vendor/suncalc.js:36`; `game.js:260`. | The local demonstration shows seasonal patterns but leaves the causal connection to the child's imagination. | Add a synchronized **Why this angle?** inset: tilted Earth, axis, Sun, selected site and local tangent plane. Link the site's incoming-light angle to the same angle arc beside the monument. |
| First | Seasonal shortcuts retain the previous clock time; students must press Solar Noon again. Final review always uses solar noon. `game.js:183,232`; `season-review.js:17`. | A casual June/December comparison can mix changes of season with changes of solar time. A morning/evening design cannot be proved by the final review. | Add an explicit observation rule: **Solar noon / Clock time / Solar event**. Default seasonal comparisons to solar noon and retain that rule when dates change. Later allow each final scenario to save its chosen rule and event offset. |
| Next | A passing final check means the target centre has the expected light state. There is no required nearby-date comparison. `season-review.js:26–28`. | A large wall could shade one marker on all four dates and earn four matches while revealing little about the calendar. | Keep the current match result, but pair it with a discrimination test: event date versus nearby dates, and a student explanation of what changes. Describe a range of matching days honestly. |
| Next | Predictions are tucked inside the builder; the result is already visible. Evidence is mainly text and a table. `engineering-design-page.component.html:89,130`. | The interface encourages exploring and recording more readily than predicting, measuring and finding a pattern. | Put a short prediction beside Show Sun, then expose an on-canvas ruler/trace and a simple graph from saved observations. Keep writing short and tied to the observation. |
| Next | Block creation and target placement rely on numeric coordinates; dimensions use cm while positions use m. `block-builder.component.ts:16,61`. | Coordinate entry and unit conversion can consume the lesson before the astronomy becomes visible. | Add block selection on the canvas, a selected-block outline, snap placement, keyboard nudges and click-to-place targets. Use a consistent classroom unit display, backed by the existing metre-based data. |
| Later | Holes are centred along a local X/Y/Z axis; blocks rotate only about vertical Y. `block-design.ts:2–24`. | Students cannot deliberately aim a narrow tunnel upward at an arbitrary Sun altitude. | After the core demonstration works, add a measured bore elevation/aiming capability and its visible acceptance cone, with matching geometry, validation and optical tests. |

## The proposed Show Sun experience

Keep the main canvas in place throughout this sequence:

1. **Build.** Students arrange stone and glass under clearly labelled build lighting. Show dimensions and true north. An optional one-line prediction asks where light will land.
2. **Show Sun.** Reveal the chosen date, location and observation time directly above the canvas. Apply the calculated sunlight and show a few parallel ray arrows. An edge-of-canvas Sun-direction indicator remains visible when the Sun itself is outside the frame; it must not pretend to be a nearby lamp.
3. **Follow a ray.** Selecting a target, aperture or stone shows one annotated path: incoming sunlight → opening/filter/obstruction → lit surface or blocked ray. Include the Sun's angle above a visible local horizon and a shadow-length construction for a selected reference point.
4. **Play this day.** A visible timeline offers pause, adjustable speed and small time steps. Offer stops at useful daylight moments and the student's alignment; avoid racing through narrow light windows. Night explicitly has no direct solar rays.
5. **Compare seasons.** March, June, September and December sit beside the timeline. Keep the same design, site, camera and observation rule. Offer labelled ghost outlines or equal-scale comparison cards so students do not have to remember the previous shadow. The two equinoxes should be compared as similar, not forced to be identical.
6. **Explain the angle.** Open a modest Earth inset while retaining the monument. A date change moves Earth around the Sun; its axis keeps its orientation in space over the year. A time change rotates Earth about that axis. The selected site and its local horizon connect the global model to the monument.
7. **Record and present.** Save the student's prediction, result, date/time/site, design and comparison. The final Show Sun sequence walks through the student's configured alignment tests and their nearby-date evidence.

The local rays must be parallel. The illustrative Sun icon, orbital distances and Earth/local-scene sizes can be enlarged for legibility, with a concise scale note. Light directions and the axis angle must agree with the calculation. Do not animate Earth rocking its axis back and forth to manufacture the seasons: the annual relationship follows the tilted axis as Earth changes its position around the Sun. [NASA's seasons explanation](https://spaceplace.nasa.gov/seasons/en/).

An optional later **What if Earth had no tilt?** comparison would strengthen causal reasoning. It requires a separate, explicitly hypothetical calculation; merely rotating a globe graphic while keeping the current fixed-tilt SunCalc results would be misleading.

## Learning progression

Use one stick or simple gate before asking students to interpret several colored openings:

| Investigation | Change | Keep fixed | Evidence of understanding |
|---|---|---|---|
| One day | Time | Place, date, monument | Predict and explain changing shadow direction and length using Earth's rotation. |
| One year | Seasonal date | Place, monument, solar-noon rule | Compare Sun heights and shadow lengths; connect the difference to the Earth inset. |
| Two hemispheres | Latitude/site | Design and comparison rule | Recognize that June and December patterns reverse between hemispheres. |
| Shape the light | Hole depth, orientation or filter | Place, date and time | Explain why a ray clears or hits a tunnel wall, and where filtered light lands. |
| Prove the monument | Event date and nearby dates | The final design and test rule | Use evidence to state what the monument can identify and its limits. |

Grade 5's NGSS 5-ESS1-2 emphasizes graphical representations of observable patterns, including shadows; causes of seasons are outside that performance expectation's assessment boundary. Keep the tilt explanation as accessible enrichment aligned with this project's vision, while assessing predictions, observations and graphical comparisons as the core. Avoid making trigonometry a requirement. [NGSS 5-ESS1-2](https://www.nextgenscience.org/pe/5-ess1-2-earths-place-universe).

Retain the Moon research as a separate investigation so its monthly pattern does not compete with the first Sun-shadow explanation. The stone rings are decorative and the compass is directional; the student's placed markers should be visually distinct from the court ornament.

## Specific correctness and clarity issues to address

1. **Sunrise/horizon mismatch.** SunCalc's sunrise event uses an apparent-horizon convention, while the renderer turns direct sunlight off at geometric altitude ≤0. A calculation at Colorado Springs for the four 2026 event dates returned geometric altitudes around −0.6° to −0.7° at the library's sunrise instants. Thus Sunrise can legitimately lead to a hidden Sun/no direct modeled shadow, but the UI does not explain the mismatch at that action. For the first lesson use a clearly named low-Sun daylight stop; separately explain apparent sunrise, or implement and validate a consistent horizon model. Do not clamp negative altitude into an invented positive Sun angle. Atmospheric effects especially matter near the horizon. [NOAA calculation details](https://gml.noaa.gov/grad/solcalc/calcdetails.html).
2. **Solar-noon precision differs.** The normal Solar Noon button discards seconds (`game.js:232`); the final review retains them (`season-review.js:19`). Share one exact observation resolver so a narrow-hole test can be reproduced in both places.
3. **Rotated face names are misleading.** Sculpture sample positions and normals rotate, but labels remain East/South/West/North (`optics.js:74`). At 90° rotation those names no longer describe their world direction. Use stable, visibly labelled face IDs or recalculate the directional labels. Very small positive dot products also classify effectively edge-on faces as sunlit; distinguish negligible incidence from meaningful direct illumination.
4. **Camera framing needs to follow the experiment.** The normal camera focuses on the origin (`game.js:1224`) even though valid designs and targets can be placed metres away. Add Fit monument + shadow and a reset view, without moving the actual design. For low Sun, explain when a shadow is outside the visible floor.
5. **Appearance is not a measurement.** The bright stone, ambient sky light and glass reflections improve readability, but a shiny face is not necessarily in direct Sun. Show direct-ray status and a small legend beside the relevant highlighted point. Keep the current distinction between a height-only reference and the full shadow footprint. True lens focusing, atmospheric refraction and soft shadow edges remain outside the current optical model.

## Checkable reference example

Using the installed SunCalc model at Colorado Springs (38.83° N, 104.82° W), at local solar noon in 2026:

| Date | Sun altitude | Shadow reference for a 1 m vertical height |
|---|---:|---:|
| March 20 | 51.07° | 0.808 m |
| June 21 | 74.61° | 0.275 m |
| September 22 | 51.44° | 0.797 m |
| December 21 | 27.73° | 1.902 m |

These are outputs of the existing approximate model, not independently certified outdoor measurements. They provide a useful demonstration target: the same reference height, much higher June Sun, much shorter June shadow, and two similar equinox results. A measured block has width/depth, so the full footprint need not end at this height-only reference.

## Recommended implementation order and acceptance checks

**First delivery:** Show Sun, visible parallel rays, selected-ray inspection, an angle arc, a persistent day timeline, solar-noon lock and camera fit. Extend the existing simulation plugin and reuse its solar direction and ray/solid math. Do not create a second visual ray system with different intersection rules.

**Second delivery:** synchronized Earth/axis/site inset and fixed-camera seasonal comparisons. Prove the global-to-local transformation at equatorial, northern and southern sites, and across day/night and the four dates.

**Third delivery:** configurable final test times, nearby-date evidence, shadow graphs, classroom placement tools and outdoor comparison records. Additional saved scenario options need backwards-compatible defaults, validation and replay tests through the engineering runtime; animation and camera state can remain local.

Acceptance checks should establish that:

- Show Sun leaves every block transform unchanged and works with mouse, keyboard and reduced-motion preferences.
- Every displayed ray has the same direction as the solar light and stops/transmits at the same solids as the evidence calculation.
- Date/time changes update Sun position, ray intersections, shadows, angle labels and the Earth inset together.
- The comparison retains site, camera, design and time rule; replay reproduces the exact UTC instant.
- A blocked window, a transmitting window and a nearby-date miss are all understandable on the canvas without reading a long paragraph.
- A student can explain which control represents Earth's daily rotation and which represents its annual orbit.

## Audit record

- Added this audit document. No application implementation was changed during the audit.
- Inspected the running localhost lab and its sky-guide interaction, curriculum, builder, snapshot contracts, seasonal review, solar calculations and optical renderer.
- Re-ran `check-solar-optics.cjs`: 2,394 independent mesh/ray comparisons plus optical/material checks passed. Re-ran `check-season-review.cjs`: seasonal review checks passed.
- Ran read-only numerical probes for the four noon angles, sunrise convention and rotated sculpture labels. The passing suites do not establish an outdoor accuracy tolerance or validate an Earth-tilt visualization that has not yet been built.
- No new tests or production build were needed for this documentation-only audit. No specification was rewritten.
- `TEMPLATE_CAPABILITY_GAP` items identified for the requested experience: visible parallel-ray inspection; synchronized Earth-tilt/site visualization; final scenarios with selectable observation times; graphical shadow evidence. These are proposed extensions to the existing reusable simulation/engineering capabilities, not implemented features.
- Recommended next phase: the first delivery above, followed by the Earth-tilt inset. This order makes the user's Build → Show Sun interaction useful immediately and then connects the local evidence to its planetary cause.
