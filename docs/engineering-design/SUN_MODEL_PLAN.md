# Use the globe lab as the monument's measuring instrument

Reviewed source: `C:/Users/erich/Desktop/grade-5/Globe-Sun-Shadow`, including `index.html`, `game.js`, `style.css`, and the `Globe-Sun.html` redirect. The working LMS adaptation is `public/simulations/solar-monument/`. Changes below apply to that adaptation.

Updated direction: the monument-and-shadow canvas is the centre of both the lab and final demonstration. Students enter the canvas immediately and open supporting learning panels as needed. The final demonstration now steps through the four seasonal dates with target expectations and calculated comparisons. Earth/sky teaching views remain supporting guides.

## What the starting model provides

The original combines a clickable Globe.gl Earth, SunCalc 1.9.0 astronomy, Luxon local dates/times, a Sun/Moon path chart, and a Three.js object scene. Its useful connection is **place + instant → Sun altitude and compass bearing → light direction → shadow**. This can drive a measured physical/digital design comparison.

The globe is a location selector. It does not currently display Earth's orbit, axial tilt, an astronomically timed rotation, or the day/night boundary. The original object scene also slowly rotates its object independently of the calculation. That is unsuitable for testing an asymmetric monument that must keep its orientation.

## Improvements now in the LMS

- The monument stays fixed to its measured coordinates and true north. Camera controls change the viewpoint without moving the blocks.
- A **3D sky** view places calculated Sun and Moon directions above the actual block model. Selected-day and seasonal paths use the same astronomy functions as the measurements. Night portions are clipped without drawing a connecting line across the sky.
- The Sun marker, directional lighting, and exact geometric ground-shadow projections use the same east/up/south direction conversion. Marker size and sky distance are labelled as illustrative.
- **Close-up** and **Plan view** retain the measurement view. The path chart remains available with those views. Below Horizon applies to that chart; the 3D sky shows the visible hemisphere.
- A first-investigation guide introduces a fixed tower, a fixed location, and June/December solar-noon comparisons. It lives with the optional guides around the main canvas.
- Captured trials include the UTC instant and `solar-geometric-1.1` model identifier alongside existing local time, location, design, prediction, and measurements. Existing receipts still load.

The previously integrated improvements remain: dimensioned cuboids and targets, exact projected ground polygons including elevated lintels, no direct solar illumination at night, actual local equinox/solstice dates for 2025–2030, immutable trial history, and exported notebook/blueprint.

## A stronger opening and learning sequence

The project landing page still has an illustrated prediction activity. Entering the workspace goes directly to the live monument. A future interactive opening should remain brief and preserve the student's initial prediction; it should not displace the canvas with a separate sequence of lesson pages.

| Stage | Student action | Evidence to keep |
| --- | --- | --- |
| Notice | At the school location, inspect a familiar block tower and today's simulated shadow. Compare a real shadow when possible. | A labelled sketch: Sun direction, north, tower height, shadow. |
| Predict | Hold the tower fixed. Predict how its solar-noon shadow changes between June and December, before revealing the second date. | Original prediction and reason. |
| Explain | Connect daily apparent motion to rotation, then connect seasonal paths to Earth's tilted axis as Earth orbits the Sun. Compare a location in the other hemisphere. | A causal explanation supported by observations and research. |
| Research the Moon | Observe four dates about a week apart, recording time, phase, illumination and sky position. | A separate Moon record; students distinguish a monthly pattern from the Sun's yearly pattern. |
| Design | Choose a shadow marker or a sunlight opening. Measure classroom blocks and build matching physical/digital arrangements. | Dimensions, coordinates, orientation, intended event and observation time. |
| Test and revise | Record all four seasonal dates at solar noon, nearby dates, and an outdoor comparison. Adjust the design and retain earlier results. | Predicted/measured outcomes, revisions, and uncertainty. |
| Exhibit | Demonstrate an alignment and explain how another team could reproduce it. | Physical monument, blueprint and evidence notebook. |

Both equinoxes can share an approximate alignment. A solstice marker generally identifies a window of dates because the seasonal Sun angle changes slowly near its extreme. These are useful discoveries, not failed designs.

## Next visual capability: connect Earth to the local sky

Add an astronomy-plugin view with a tilted Earth, a visible axis, parallel sunlight, an observer marker and local horizon plane. Show the four seasonal positions with the axis maintaining its direction in space. Selecting a position should update the same observation date used by the local sky and monument. Clearly label orbit distance, Sun size and Earth size as illustrative.

Provide a transition from **Earth view → observer's sky → measured monument**. Keep calculated local Sun directions authoritative: a decorative orbit animation must not become a second, inconsistent shadow calculation. Test matching local solar altitude and day/night state at multiple latitudes and in opposite hemispheres before introducing a terminator/lighting overlay.

[NASA's explanation of seasons](https://spaceplace.nasa.gov/seasons/en/) supports this causal sequence: rotation explains daily change, while the tilted axis keeps its direction as Earth travels around the Sun. The curriculum should keep these two changes distinct.

Architecture: implement the view inside the installed astronomy plugin. If it also becomes an opening activity, add a validated, registered intro-scene contract and renderer. Keep curriculum text and settings in project configuration; keep animation and calculations out of the project folder. No core schema change is needed for the lab view. A live opening is a future capability extension, not part of this update.

## Establish practical accuracy before setting a classroom tolerance

Use a level base, a vertical reference block/tower, known dimensions, true-north orientation, the actual location, and the exact local date/time. An ordinary compass points to magnetic north; account for that difference when aligning the base. Begin with the Sun comfortably above the horizon.

Measure a reproducible feature, such as the shadow of a selected top corner, or the illuminated/shaded status of a target centre. The displayed `height / tan(altitude)` is a reference for a vertical height; it is not the full outline or furthest edge of every block arrangement. Compare the physical result with Plan view and record the difference in centimetres and direction. Repeat at several times, with an asymmetric design and with a lintel opening. Agree on an acceptable tolerance from those measurements, then document it for students.

Keep a record of block measurement error, base slope, north alignment, timing, and the fuzzy edge of a real shadow. Do not promise centimetre accuracy from the current simulation without those tests. [SunCalc 1.9.0](https://github.com/mourner/suncalc/tree/v1.9.0) supplies astronomical positions; exact geometric projection does not eliminate astronomical or field-measurement uncertainty. [NOAA's calculation notes](https://gml.noaa.gov/grad/solcalc/calcdetails.html) explain atmospheric effects and why observed near-horizon results can differ. NOAA's web calculator is no longer actively maintained, so it should not be treated as certification of this model.

The current solar model uses a point source at the geometric solar centre, parallel rays and level ground. It does not model refraction, the finite Sun disk/penumbra, obstructions, terrain slope or structural stability. Moon markers locate the Moon; the phase readout supplies illumination information. Moon shadows are not simulated. Later add a measured horizon profile or atmospheric options only when the learning activity and validation require them.

## Implementation and verification record

Added `public/simulations/solar-monument/sky-model.js` and `scripts/check-solar-scene.cjs`. Modified the lab HTML/CSS/controller/geometry, the existing geometry check, the astronomy host's guidance, the generic Research entry button, and the calendar project's test instructions. Updated this plan, the implementation notes and the numbered template specification.

Architecture remains the registered engineering-design template plus astronomy plugin, with bounded trial persistence. Camera and path changes are local visual state. No breaking contracts or specification deviations; no additional template capability is required for the implemented lab view. The future live opening and Earth-tilt view are explicitly pending.

Validation results are recorded in [README.md](README.md). Recommended next phase: outdoor calibration and a linked Earth-tilt teaching view, followed by the live opening activity.
