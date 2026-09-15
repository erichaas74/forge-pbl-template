# Voyage: branching expedition and visual experience

Updated 2026-09-15. Current project: `race-around-the-world@1.4.0`.

## Student experience

The shared eight-session navigation opens each activity directly. Odd sessions show the interactive Atlantic chart; even sessions enter the selected location. Destination and event options live in the disconnected **AI Tutor** column, directly below collapsible tasks and products. The main panel remains the map or location.

Every decision supplies a consequence, resource changes, learning focus and next investigation. Earlier observations reveal survey routes; shelter decisions reveal return routes. Packing repair timber at the first landing reduces a later patch from eight to four supply points. Choosing a different early route archives the previous decisions and recomputes the reachable journey.

| Sessions | Map decision | Location investigation |
| --- | --- | --- |
| 1–2 | Azores or Cape Verde | Bearings, local knowledge and the last cargo berth |
| 3–4 | Weather, exchange or refuge | Torn canvas, shore accounts and observations |
| 5–6 | Atlantic crossing, southern passage or return | River exchange, exposed cape or home harbor |
| 7–8 | Final port or further observations | Assemble and question route and encounter evidence |

Twenty configured scenes include 26 passage choices and 22 location events. **Explore paths & records** exposes all alternate scenes for isolated testing. Direct access never awards fictitious completion. Preview choices and resources stay separate from the saved path.

## Framework

- Content and paths: `projects/age-of-exploration-journey/voyage-experience.ts`.
- Typed definition and decision state: `templates/journey-replay/domain/journey-path.models.ts`.
- Pure progression, revision, resource and recovery logic: `core/journey-path.engine.ts`. Discovery conditions use the shared deterministic rule engine through `core/journey-path.rules.ts`.
- Graph validation runs during package assembly and launch. The `branchingJourney` capability declares support.
- `JourneyPathRuntime` accepts registered activity events and persists through an adapter scoped by tenant, class, student, project and version. Unreadable cached data is preserved. Save failures retain the in-memory path for retry.
- Project version 1.3.0 retains its original definition and launch behavior. Its drafts and historical saved responses are not migrated or overwritten. The existing class replay remains available through the showcase.
- `JourneyPathWorkspaceComponent` coordinates the map, location, sidebar and shared lesson navigation. It does not own progression rules.

## Graphics passes

The review prioritized flat scenery, a schematic ship, weak visual consequences, crowded map labels and phone composition. The world was improved before the surrounding controls.

Five finished painted environments cover island anchorage, storm coast, river mouth, coastal exchange and home harbor. A transparent ship sprite carries separate procedural sails, cargo, repair stores and navigation evidence. The lazy-loaded Phaser renderer projects decisions without changing their meaning: damaged canvas tears, a patch appears, reefing shortens sails, barrels arrive and survey lines connect observations. Water highlights, wake, rain, distant birds and gentle camera movement add depth. Motion can be paused and respects reduced-motion preferences.

The existing geographic map remains reusable. Voyage enables animated gold passage routes, quieter unrelated labels, a painted ship marker, wind streaks and pointer dragging; keyboard pan and zoom remain available. Destinations continue to open their choices in AI Tutor.

Assets are under `public/journey-replay/voyage-v2/`; see [asset briefs and provenance](../../../public/journey-replay/voyage-v2/README.md). Six WebP assets total approximately 2.4 MB. Scenes load one backdrop plus the reused ship. The renderer is a separate lazy chunk and is destroyed when leaving a location.

## Validation and limits

The Voyage regression suite passes **54 tests across 14 files**, including all eight session entries, alternate previews, route-to-location-to-map transitions, consequence carryover, discovery rules, revision history, malformed persistence, save recovery and legacy journey behavior. The renderer is substituted in DOM unit tests; actual art and effects are reviewed in the browser.

The focused development build and full Angular template/type compilation (`ngc --noEmit`) pass. All 20 scenes were exercised at 1366 × 768 and 390 × 844: no horizontal overflow or scene errors, one canvas per location and none on maps. Torn, patched and reefed sails were inspected visually; source-dialog Escape and focus restoration were checked. The source check passes 42 standards and 123 lesson evidence checks. Two existing repository architecture violations remain outside Voyage (`core/index.ts` and the mystery-substance render-quality service). A full bundled application build ended without completion; only the focused bundle and full compiler checks are claimed here.

The new version replaces outdated route-duration and storm notes with evidence for its current rules. The historical 1.3.0 evidence stays unchanged.

This remains **local practice**, with no classroom submission or grade. AI is explicitly disconnected. Grade 7 standards alignment is pending an authoritative mapping; the compact standards row states that limitation. Illustrations are fictional scene reconstructions, not historical source evidence; source evidence remains separately inspectable.

Future work: direct manipulation of cargo and navigation instruments can extend the current options-based event interface. That extension must retain the same decision contracts and resource rules.
