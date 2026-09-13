# Sunrise and sunset overlay

The **Sunrise & sunset** toolbar button opens a small 2D picture above the existing monument canvas. It shows the selected day's solar-height arc, sunrise and sunset times and bearings, solar noon, and the current Sun position. The monument remains available behind it. Close the panel using its close button, Escape, or the toolbar toggle.

The SVG's horizontal axis follows elapsed time from sunrise to sunset; the vertical axis is calculated Sun altitude. The directional labels show actual compass bearings rather than assuming that the Sun always rises due east. Playback, seasonal dates, location changes and restored observations feed the same time into both views. Before/after daylight the panel identifies the Sun as below the horizon rather than pinning it to a false rise/set position. Polar day and night use the full local day and explicitly report absent sunrise/sunset events. Below-range portions of the path are clipped by the SVG viewport, without flattening the calculated altitude.

The panel reuses `SolarDay` and the installed SunCalc/Luxon dependencies. Its renderer samples the curve only when date, place or time zone changes; playback updates the current marker and readout. The drawing is SVG with an accessible description and HTML event readings. Narrow layouts keep the close control visible and allow panel scrolling. There is no independent clock or new astronomical solver, no runtime persistence, and no change to the measured monument, optical rays, saved comparisons or camera.

The toolbar bridge accepts an optional boolean `sunDay`, preserving older state messages. Opening focuses the panel's close button; closing returns focus to the originating host control. Read-only final presentations support the overlay without enabling day/time mutations.

## Files and verification

Added:

- `public/simulations/solar-monument/sun-day-view.js`: cached day model and SVG renderer.
- `scripts/check-sun-day-view.cjs`: solar-height/direction, current-position, hemisphere, DST, date-line and polar tests.
- This document.

Modified:

- Simulation `index.html`, `style.css`, `game.js`: overlay markup, styling, toggle, state and live refresh.
- Solar host `solar-monument.component.html`, `.ts`, `.spec.ts`: toolbar integration, validated state and focus restoration.
- `scripts/check-solar-scene.cjs`: synchronized marker/date updates, camera/design preservation, Escape and presentation coverage.
- Engineering README and template specification.

Validation: the new day-view script, scene integration script and calendar reference checks pass. All 35 focused Angular tests pass across the solar plugin and engineering template. The production build passes with existing stylesheet-budget warnings in other templates. Browser inspection confirms the opening view, March-to-June updates, the overlay at a 390 px viewport and its close control.

Architecture: presentation stays inside the reusable solar plugin; project configuration and core contracts remain unchanged. No specification deviations or unresolved `TEMPLATE_CAPABILITY_GAP` items. Recommended next step: use the overlay with **Play day** to compare the Sun's height against the changing monument shadows.
