# Earth motion and measured construction

Implemented the workspace improvements from [the assessment](MOTION_AND_BUILDING_RECOMMENDATIONS.md), followed by the requested [Solstice Windows final example](SOLSTICE_GATES.md).

## Using the workspace

- **Explore Earth** shows rotation and orbit beside the monument. One day includes night; One year samples each day at solar noon or ten minutes after sunrise. Pause, step, scrub or choose a seasonal stop. The year slider includes leap day.
- **From center** keeps the observer at the origin. In Explore it uses sunrise samples with a fixed heading and adjustable eye height/time offset. The monthly sunrise trail stays on the horizon; the live Sun follows the actual preview time. Portrait layouts stack Earth below the monument and let the observer turn in place.
- **Compare June / December** creates two pictures from the same design and camera. Closing Explore restores the recorded test time. Previews cannot record evidence or place markers.
- **Build** docks the inspector beside a plain measured floor. Scene, plan and inspector share selection. Drag a stone or assembly; the plan has a rotation handle. Arrow keys move 1 cm, Shift moves 5 cm. In 3D, Q/E turns 15°. Grid steps are Free, 1, 5 or 10 cm; Alt bypasses snapping. Rotation gestures resolve to whole degrees.
- Add a pillar, lintel, gate or jewel gate. Gate sizes describe the clear opening. Whole-gate selection, duplication, grouping and ungrouping preserve measured pieces. Positions/dimensions use centimetres. **Snap to another stone** aligns court-axis edges or centers the selection on a top face. Rotated pieces align their outer bounds, not arbitrary mating faces.
- Invalid previews retain the existing design and name overlapping stones when possible. Undo/redo keeps up to forty local edits across inspector closure. External replacement, sample adoption and practice/project scope changes reset that history. The existing sample recovery checkpoint remains separate.
- **Ray guide** exposes measured optical paths and identifies the blocking stone. A selected block becomes the ray reference. **Year trail** in ordinary view shows monthly solar-noon projections of a block’s top center, labeled as reference points rather than complete shadows.
- **Piece sizes & classroom kit** controls new part dimensions. **Parts list** groups matching sizes. **Start from a sample model** offers the simple Sun gate and three-stone solstice alignment challenge through the existing preview/adoption flow.

## Architecture and compatibility

The optional `DESIGN_EDITOR` token supplies shared selection, previews, atomic transformations and local history. Commits use the existing engineering runtime and scoped persistence. The reusable plan/builder use it; the solar plugin bridges it to Three.js. No curriculum-name branches were added to the editor or runtime.

`DesignBlock.label` and `assemblyId` are optional bounded strings, checked by TypeScript and optical validators. Existing 1.0 designs remain readable and keep their coordinates. Group metadata persists; local undo history does not. Block angles accept [0, 360), including fractional existing angles. No new required schema, core engine, backend or package dependency was introduced.

The bridge checks channel, exact source/origin, editable/active mode, selected IDs, finite bounded transforms and the expected current design. The host recalculates and validates geometry. Drafts never become saved optical geometry until accepted. The latest design is sent before its selected IDs, including when a new gate is selected.

`solar-explorer.js` owns a separate preview date. `SolarDay` resolves the observation feeding Earth, Sun, lighting and the 2D overlay. Daily playback uses actual local-day length across DST. Yearly playback declares its sampling rule and falls back to noon when sunrise does not occur. `solar-trails.js` draws reference geometry only. Seasonal playback preserves the camera and measured blocks.

## Validation and limits

Automated checks cover atomic movement/history, invalid/stale placement, grouping/duplication, keyboard plan controls, read-only/foreign bridge messages, legacy metadata, DST, leap dates, polar fallback, annual references, unchanged evidence timestamps, fixed cameras/geometry and comparison pictures. Browser checks covered gate creation, the docked inspector, desktop and 390 px center views, annual playback and actual WebGL seasonal pictures. A mobile comparison scroll problem led to moving the hosted picture dialog into the parent page; its final rendering/validation is covered by a UI test. The browser connection disconnected before that final visual recheck and before the temporary viewport override could be cleared.

The editor checks intersections, not structural stability. Top placement and classroom dimensions require physical support checks. Trails omit below-horizon samples and points beyond the 24 m display limit. Sunrise events use the apparent horizon while direct rays use the geometric Sun center. Existing terrain, refraction and optics limitations remain. Student usability testing is still future work; no classroom outcomes are claimed.

The shared-selection, assembly and annual-playback capability gaps are resolved through optional engineering and solar-plugin extensions. Continuous arbitrary-face magnetic snapping and distances to arbitrary colored-patch boundaries are not implemented; explicit edge/top alignment and exact point classification are available.

## Final change report · September 12, 2026

- Added shared `design-editor.ts` and its tests; added the solar editor bridge test, `monument-editor.js`, `solar-explorer.js`, `solar-trails.js` and two new calculation checks.
- Added the Solstice Windows geometry, exhibit, generated observations, verification script and vector cover. Updated the gallery, intro and completed-example registration.
- Modified reusable plan/builder/workspace components, optional block validation, the solar component/controller/HTML/styles and the scene regression checks. Updated this guide, the Solstice Windows construction notes, the engineering README, sample-gallery guide and template specification.
- **48 Angular tests passed** across four focused suites. **Ten solar/geometry scripts passed**, including 2,394 independent mesh-ray optical comparisons. The scene check also verifies that the practice sundial’s live tip disappears at preview midnight without changing its recorded clock.
- **Production build passed**. Existing style-budget warnings remain in unrelated components. Scoped `git diff --check` passed.
- Optional engineering/plugin capabilities resolve the relevant architecture gaps; no new core engine, required schema migration, backend or external dependency was added. Physical stability and classroom usability are not claimed as tested.


### Horizontal-window revision

The follow-up replaces the roof-hole example with a three-stone starter and solved solstice exhibit. See [Solstice Windows](SOLSTICE_GATES.md) for surface-target contracts, the fixed-mark challenge, construction and ray controls. This revision passed 50 focused Angular tests, the scene/optics/legacy-calendar/center-view checks and the new bore-to-pillar checks. Production build passed with the existing unrelated style-budget warnings. In-app browser inspection verified June and December light opposite pillar carvings from the same close-up.
