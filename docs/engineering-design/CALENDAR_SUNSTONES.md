# Calendar sunstones

Students can now carve fixed observation markers into the monument court. **Markers → Place on the floor** starts a cursor on the 3D canvas. Click a shadow, a patch of colored light or clear sunlight, name the observation, and choose **Carve marker**. A preview does not change the saved design. Directions remain in the floating Markers panel, with one new button in the compact toolbar.

Each sunstone is a numbered medallion with twelve engraved ticks, a rim colored for the recorded light and an arrow pointing toward the recorded Sun. Its open center leaves the test point visible. These are floor annotations: the decorative rings do not intercept light or alter the monument's optical calculations.

## Build and compare

- Place a stone with a floor click or measured east/west and south/north coordinates in centimetres. In placement mode, arrow keys move the cursor 5 cm, Shift moves it 1 cm, Enter selects the point and Escape cancels. Camera dragging remains available.
- Carving saves the fixed ground coordinates, name, exact UTC instant, time zone, latitude/longitude, Sun altitude/azimuth and calculated light. The observation comes from the existing Sun and optical models.
- Click a saved sunstone or choose it from the numbered list to see its record and the light reaching that same point now. **Show recorded Sun** restores the observation's place and exact time while retaining the current monument and marker positions. Changing a monument does not rewrite its earlier observations.
- A stone recorded on a local equinox or solstice date offers **Use for [event]**. This configures the existing final test with that marker, recorded light and precise local clock time. The other seasonal tests remain independently configurable.
- Rename, remove and undo a removal from the panel. Undo merges the removed stone into the current design rather than restoring an older monument.
- The final example includes records for its amber June, blue equinox and ruby December markers. During final presentation, the event selector controls the Sun; the panel compares recorded and current light without changing the selected test.

The twelve-marker limit matches the existing design contract. The marking court spans 24 m; below-horizon observations and positions under ground-level stones or the central sculpture are rejected. Placement cancels when the date, design, lesson or editable context changes. Practice-sundial marking keeps its existing workflow. Read-only examples permit inspection, with no design changes.

## Contracts and files

This is installed simulation behavior using existing `DesignTarget.settings`, `DESIGN_CHANGE` and `DESIGN_CHECKS_CHANGE` contracts. Eight observation settings fit the current limit: `markerKind`, `utcInstant`, `zone`, `latitude`, `longitude`, `sunAltitude`, `sunAzimuth`, `light`. Existing targets without records remain readable and show that no Sun observation was recorded. The runtime still owns validation, revisions and persistence; hover and preview messages are not saved.

Added:

- `public/simulations/solar-monument/calendar-markers.js`: observation validation, optical measurement and carved marker geometry.
- `src/app/plugins/simulations/solar-monument/solar-marker-record.ts`: typed host validation and exact local clock conversion.
- This report.

Modified:

- The simulation's `index.html`, `game.js` and `style.css`: module loading, floor ray picking, keyboard cursor, focus/revisit messages and marker rendering.
- The solar component's TypeScript, HTML, SCSS and spec: compact marker panel, preview/save/rename/remove/undo, live comparison and seasonal test setup. Final clock inputs retain recorded seconds and milliseconds.
- Calendar monument configuration, lesson content and sample: concise directions and observation records for the three completed-example markers.
- `scripts/check-solar-scene.cjs`, the engineering README and template specification.

Same-origin/source validation, request nonces and editable-context checks protect the message boundary. No package, core contract, schema migration or additional storage mechanism was introduced. There are no specification deviations or unresolved `TEMPLATE_CAPABILITY_GAP` items.

## Verification

- The scene/controller check covers measured placement, actual saved light, preview without persistence, medallion rendering, current-light comparison, exact-instant replay and immutable observations. It rejects out-of-court, covered, read-only, practice and final-presentation placement.
- New Angular checks cover stale/foreign/invalid responses, explicit saving, seasonal test configuration, millisecond clock round trips, invalid clock input, live readings, removal/undo and cancellation when context changes.
- Browser verification used a separate local origin: clicked a visible shadow on the floor, carved a named stone, reloaded, returned to its exact recorded Sun, removed it and restored it with Undo. The temporary test marker was then removed and the original practice step restored. The existing build remained intact.
- The final example displays all three saved records and correctly distinguishes their recorded light from the current season's light.
- Production build passes, with existing stylesheet-budget warnings in other templates. All 34 focused Angular tests pass. The scene/controller and solar-calendar reference checks also pass.

Repository-wide architecture checking still reports the existing `core/index.ts` barrel dependency and the mystery-substance render-quality service finding. Neither is introduced by this feature.

Recommended next phase: a classroom usability and calibration session. Have students place a stone on a colored patch, predict a different season, and compare nearby dates before claiming that their monument identifies one exact day. Match a physical model's dimensions, site, clock and true-north orientation. This work retains the existing geometric sunlight and colored-filter assumptions; the markers do not add lens refraction or weather effects.
