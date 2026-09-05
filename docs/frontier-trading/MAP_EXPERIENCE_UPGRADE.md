# Route map experience upgrade

September 3, 2026. Scope: the existing route map only. The live trading final remains a separate design proposal.

## Student-facing changes

- The route workspace now opens as a map-first game board. Its mission, cash, cargo, and day readouts sit inside the illustrated world while the shell removes duplicate status cards and unused page padding.
- An illustrated atlas adds mountains, trees, meadow contours, clouds, a river, wildlife, camp smoke, a compass, map shading, and distinct settlement landmarks. Location names and route facts remain separate from scenery.
- Zoom from 100% to 300%, drag to pan when zoomed, or use accessible pan buttons. Keyboard users can focus the map and use arrows, +/−, and Home.
- **Center on me** finds the current settlement or the wagon's recorded position during travel. **Fit all routes** restores the whole map. **Focus route** fits the selected trail's actual curve bounds.
- Click a destination or the trail itself to inspect it. The chosen trail glows, its animated line shows direction, and numbered day checkpoints make duration visible on the map.
- Route details open in a parchment planner drawer over the board on desktop and as a bottom sheet on mobile. Closing it returns keyboard focus to the selected destination, while the closed panel is removed from keyboard navigation.
- Keyboard focus brings an off-screen destination back into the zoomed viewport. Incompatible destinations remain inspectable and explain why departure is unavailable.
- Comparison selections also receive a map highlight. The complete route table remains available in a collapsed **Route Journal**, keeping the board readable while preserving an exact-number alternative.
- Scenery and motion can be switched off independently. System reduced-motion preferences still apply.
- Active travel marks the departure point correctly, highlights committed progress, and shows a journey progress card. Other trails become inactive while traveling. Viewing the map never advances a day or moves cargo/cash.
- Completed trails remain visible. A collapsible journey record shows the departure-time route snapshot, planned versus actual travel time, supplies, and the student's rationale.
- Journey evidence can be saved for the report, with visible confirmation. Departure and arrival use separate immutable evidence references; repeat clicks cannot duplicate either snapshot.

## Implementation boundary

The new `RouteAtlasComponent` is a presentation component receiving locations, trail states, the selected route, and recorded travel progress. It emits inspection/detail requests. It does not inject persistence, execute simulation commands, or contain project-ID branches. Viewport calculations are small framework-independent helpers.

The route page derives map states from existing configuration and runtime records and continues using the existing runtime for departure and evidence actions. It retains the current budget, comparison, rationale, and departure review behavior. The shell's route mode changes presentation only. The existing one-route season, market, simulation engine, scoring, persistence contracts, and project configuration are unchanged by this upgrade.

No dependencies, backend services, schema changes, or new registered platform capabilities were required. `TEMPLATE_CAPABILITY_GAP`: none for this map presentation scope. The live-session work documented in the final-activity proposal is outside this upgrade.

## Files

Added:

- `src/app/templates/simulation-decision/ui/map/route-atlas.component.ts`
- `src/app/templates/simulation-decision/ui/map/route-atlas.component.html`
- `src/app/templates/simulation-decision/ui/map/route-atlas.component.scss`
- `src/app/templates/simulation-decision/ui/map/map-viewport.ts`
- `src/app/templates/simulation-decision/ui/map/route-atlas.spec.ts`
- This completion report.

Modified:

- The route-map page's TypeScript, template, and stylesheet.
- The simulation shell template and stylesheet for route-only map mode.
- The component-style production ceiling in `angular.json` was raised from 18 kB to 24 kB to accommodate the existing 22.95 kB Mystery Investigation stylesheet; the 14 kB warning remains active.
- The Frontier Trading documentation index.

The reusable atlas replaces the route page's inline SVG rather than duplicating it. Existing working changes from earlier tasks were preserved.

## Validation

- The final production Angular build completed. It retains a warning for the existing 22.95 kB Mystery Investigation stylesheet, which is above the 14 kB warning threshold but below the adjusted 24 kB error ceiling.
- The complete suite passed all 141 tests across 29 files. The map-focused suite passed all nine tests under the normal project configuration.
- Tests cover bounded zoom/pan, curve fitting, keyboard inspection of unavailable routes, focus recovery for off-screen destinations, scenery/motion isolation from runtime state, active-travel labels, completed history, immutable evidence snapshots, and duplicate prevention.
- Browser verification covers destination selection, unavailable labels, zoom, pan buttons, actual pointer dragging, route fitting, company recentering, keyboard reset, numbered checkpoints, the desktop planner drawer, and the mobile bottom sheet.
- At a 390 × 844 viewport, the game board reflows to a single column, the planner stays above the mobile navigation, and closing it returns focus to the selected map stop. The viewport override was reset afterward.
- No student purchases, departures, or resets were performed in the browser during this task; journey lifecycle behavior was checked using isolated test state.

The map is schematic, not geographically to scale. Distances and costs come from the existing configuration. Full assistive-technology testing and a classroom usability pilot remain useful follow-up work; no multiplayer activity is represented as live.
