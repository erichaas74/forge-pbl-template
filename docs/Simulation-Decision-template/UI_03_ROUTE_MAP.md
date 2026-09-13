# UI 03 — Route Map

## September 2026 gameplay feedback slice

The Phaser atlas adds a selected-trail banner, destination beacon, departure
pennant, rolling wagon, reached checkpoint marks and confirmed milestone bursts.
A textual checkpoint list and compact mobile journey panel share the runtime's
progress. Pending events retain their immediate decision-screen handoff;
consequence effects now follow accepted runtime decisions and use recorded
outcomes. Arrival restores from actual history on map reload, including after a
final-day event. The basic-map wagon and checkpoints use static SVG transforms.
See [the gameplay slice report](../frontier-trading/ROUTE_GAMEPLAY_SLICE.md).

## Page Purpose

The Route Map lets students compare travel options between trading locations using distance, terrain, travel time, and risk information. It should make route choice a mathematical/evidence decision, not a hidden random click.

## Curriculum / Product Alignment

This page belongs to the **Frontier Trading Simulation** project type. The curriculum foundation is a trading-company challenge built around limited money, cargo capacity, changing prices, budgeting, unit price, profit, and defending trade decisions. The social-studies extension adds route choice, maps, terrain, supplies, risk events, consequences, and multiple perspectives.

**Source-supported learning priorities**

- Decimal and money calculations.
- Budgeting and unit-price comparisons.
- Profit / loss reasoning.
- Cargo-capacity constraints and measurement conversion.
- Route choice using map, distance, terrain, and risk evidence.
- Evidence-based explanation of decisions.
- Simulation evidence that can be saved into the project notebook and final submission.

**Design decisions introduced by this UI spec**

- A turn/stop-based trading season.
- Student-facing market, route, cargo, event, ledger, and season-results views.
- Persistent simulation state that carries across all page views.
- Teacher-configurable market/event presets and final-challenge rules.
- No single “correct” route; students are expected to justify tradeoffs with evidence.

## Layout

### Desktop Layout

**Center Map Canvas (65–70%)**

- Stylized regional map with nodes for forts, settlements, river crossings, passes, and trading posts.
- Current location clearly marked.
- Available route segments highlighted.
- Completed route segments shown but de-emphasized.
- Locked/unavailable routes visually distinct.

**Right Route Comparison Panel (30–35%)**
When a student selects a destination/route:

- distance,
- estimated travel steps/days,
- terrain tags,
- known risk rating or qualitative description,
- expected supply/cost impact if configured,
- market knowledge at destination only if revealed,
- route prerequisites,
- evidence prompt.
- `Select Route`.

**Commit Travel Review**
Full-width modal/drawer:

- current → destination,
- distance,
- estimated days,
- route risk,
- what will change immediately,
- what is uncertain,
- `Commit Travel`.

### Route Comparison Mode

Students can pin up to 3 reachable routes. A comparison table should align:

- distance,
- travel time,
- terrain,
- known costs,
- risk,
- destination market knowledge.
  The UI must not automatically label one route as “best.”

## Student Actions

Students can:

- Pan/zoom the map.
- Select reachable destinations.
- Inspect route details.
- Compare up to three routes.
- Pin map/route evidence to notebook.
- Choose a route.
- Review and commit travel.
- Reopen previous route history.
- Open help for map scale, distance, or route-risk reasoning.
- If configured, answer a short prediction before travel: “Why are you taking this route?”

## Component States

### Map / Route States

- `current_location`
- `reachable`
- `visited`
- `unvisited`
- `locked`
- `blocked_by_event`
- `future_route`
- `selected`
- `comparison_pinned`
- `travel_committed`
- `season_complete_readonly`

### Travel Transition

1. Student commits route.
2. Route record is saved.
3. Travel animation begins.
4. If an event triggers, open Event Decision View before arrival if configured.
5. On successful arrival:
   - current location changes,
   - day/travel step advances,
   - destination market snapshot loads,
   - ledger receives travel entry if costs apply.

### Failure / Edge States

- save failed before travel: do not animate/advance.
- destination data unavailable: keep student at original location and show retry.
- route becomes teacher-blocked while student is reviewing: confirmation invalidates and reloads route state.

## Mobile Behavior

- Map fills most of the screen.
- Current cash/cargo HUD becomes minimal overlay.
- Selecting a route opens a bottom sheet with details.
- Route comparison becomes a separate swipeable card screen rather than simultaneous side panel.
- `Commit Travel` is sticky at bottom only after a valid route is selected.
- Provide `Center on me` and `Fit reachable routes` controls with large targets.

## Graphics / Assets Needed

- Regional frontier route map base.
- Location node icons: trading post, fort, town, river crossing, mountain pass, camp.
- Terrain overlays: plains, river, forest, mountain/pass.
- Route line styles for available, completed, blocked, selected.
- Compass and scale bar.
- Small travel animation asset: wagon marker moving along route.
- Optional map-layer legend.

Historical map styling should remain readable and should not obscure labels.

## LMS / Data Requirements

### Route Data

```ts
Route {
  routeId
  fromLocationId
  toLocationId
  distance
  estimatedDays
  terrain[]
  riskProfileId
  travelCosts?
  prerequisites?
  statusRules?
}

RouteChoice {
  routeChoiceId
  simulationId
  routeId
  dayStarted
  studentRationale?
  knownInfoSnapshot
  eventIdsTriggered[]
  arrivedAt?
}
```

### LMS / Notebook

- Store rationale response if required.
- Route selections can satisfy completion checkpoints.
- Mastery tags may include measurement-conversion, distance-reasoning, evidence-based-decision.
- Route evidence link should preserve the information visible **at decision time**, preventing hindsight from changing the student’s evidence.
- Teacher can configure fixed route graph, blocked paths, event probabilities/sequence, and official challenge rules.

## Accessibility / Student Support

- Map has non-map alternative: a structured “Reachable Routes List” with all information needed to make the same decision.
- Route lines use patterns + labels, not color alone.
- Keyboard users can move through locations and routes.
- Provide text description of terrain/risk.
- Avoid tiny map labels; support zoom to 200% without losing controls.

## Acceptance Criteria

- Student can compare routes before committing.
- The map never reveals destination information the project has configured as unknown.
- Committed travel produces an immutable route-history record.
- Route evidence can be cited in the final report.
- A student using the accessible route list can complete the same learning task as a student using the visual map.

## Implemented planning profile — September 2026

Keyboard-operable illustrated destination markers pair with an aligned route comparison table. Up to three selected routes can be isolated for comparison. The trip card shows the destination report, distance, time, supplies, risk, expected arrival, and the remaining cash after the trade draft and supplies. Unconfirmed trades must be reviewed or cleared before departure. Reasoning is retained separately for each selected route across workspace changes.

Departure records the route and buys supplies; its brief transition does not advance the displayed day or imply arrival. The map marker and Journey marker derive their positions from official progress. An arrival message appears only when route history contains an actual arrival. Review dialogs support keyboard containment, Escape, and focus restoration. No route receives a "best" label and the configured single-route season remains intact.

## Implemented atlas interaction profile — September 2026

The map now supports bounded 100–300% zoom, pointer dragging while zoomed, keyboard/button panning, full-map reset, company recentering, and fitting the selected trail. Destinations reached by keyboard focus are brought into view. Trail clicks and settlement buttons share the same route inspection behavior, with a persistent selection summary and a direct detail-focus action on small screens.

Scenery and ambient motion have independent controls; reduced-motion preferences remain respected. Comparison highlights, unavailable trails, committed progress, and completed history use distinct presentation states. During travel, the origin is labeled as the departure point, and unrelated trails become inactive. A collapsible journey record uses the immutable departure snapshot and can save separate departure/arrival evidence for the existing report.

These interactions extend the existing simulation presentation; they do not add live classroom transactions, new journey rules, or backend dependencies. See [the map upgrade report](../frontier-trading/MAP_EXPERIENCE_UPGRADE.md) for implementation and validation details.

## Implemented game-board presentation profile — September 2026

Route mode gives the illustrated world nearly the entire play surface and moves its objective, cash, cargo, and day readouts onto the map. The map uses a dark wood frame, stronger terrain depth, a compass, wildlife, smoke, moving water, and a vignette while keeping the text and route states readable. Selecting a route adds a directional glow and one numbered checkpoint per intermediate travel day.

The route plan appears as a parchment drawer on desktop and a bottom sheet above the mobile navigation. Closing it returns focus to the selected map stop. The panel becomes inert while closed so its fields and actions cannot receive accidental keyboard focus. Exact route data remains available through the collapsed Route Journal below the board.

This profile changes composition and feedback only. Cash, cargo, travel, evidence, and route history continue to come from the existing runtime state and command path.

## Implemented choice progression profile — September 2026

Route uses the same optional progression rank as Market. Open routes remain selectable and comparable; future current-location routes stay visible as muted, labeled, noninteractive trails so students can see the network grow. The rank panel states the route count and next requirements. The domain route command independently rejects a locked route. Active and completed journeys remain visible from their official records even if a project version changes its progression configuration.

## Implemented Phaser gameplay profile — September 2026

A lazy-loaded Phaser 4.2.1 canvas renders the configured landscape, trails,
checkpoints, and wagons. Its geometry is sampled from the same paths as the
accessible SVG controls. The atlas provides a labeled Scout trail preview,
motion control, live reduced-motion support, and explicit basic-map fallback.
Scouting has no runtime or accounting effects. Confirmed travel snapshots drive
wagon motion; tween completion does not advance simulation state.

Reviewed departure stays on the map. Travel next day uses the existing travel
command, hands pending events to the decision screen, and shows a market action
after confirmed arrival. All existing route/forecast/math gates remain enforced.
See [the implementation report](../frontier-trading/PHASER_GAMEPLAY_UPGRADE.md).
The multiplayer showcase is reserved for the final project day and remains
dependent on the planned live-session backend.

### Focused map reliability improvements

Wheel zoom uses the pointer's world position as its anchor and shares the
100–300% camera bounds with keyboard controls. Ctrl/Command-wheel stays
available for browser zoom. Resizing preserves the current view. Company focus
uses the same saved-position projection as the renderer, including the fallback
when SVG path measurement is unavailable.

Immutable route geometry is sampled only when its definitions or locations
change. Unrelated scenery, motion, and preview updates retain route labels.
Late geometry refreshes the saved company position; a newer travel snapshot
continues from the displayed position while still ending at confirmed progress.
Background load errors apply only to the currently requested image.

## Fifth-grade student flow

The primary game pages are Map and Shop. Wagon, trip records, other saved
work, help and teacher controls are grouped under Project in one integrated
header. A concise next-action button follows actual route, shopping, math, and
travel state; its trip action opens the saved planner before moving focus.

Price overlays start closed and open with Show prices. Camera previews,
scouting, motion, and fallback controls are grouped under Map tools. Town
inspection emphasizes destination, travel cost, days, and a short description
of possible problems. Longer reports remain available in disclosure controls.

Zoom buttons and the percentage display are removed. The existing outer frame
keeps its size while the complete map fits inside it with equal horizontal and
vertical scale. Space around the centered map accommodates different screen
shapes. Phaser artwork, SVG destinations, and HTML overlay anchors all preserve
the same proportions; the basic map uses the same fit.

Choosing a town saves the plan and directs students to finish shopping. Trip
math waits until shopping is complete and presents sales and profit as two
separate questions. The Next math question action moves focus to the second
answer; explaining the route and checking departure follow correct answers.
Existing accounting, progression, forecast, and departure validation still
apply. The full-screen page-change curtain has been removed.

## Trade-world workspace (schema 1.10, template 1.5)

The desktop workspace uses 70% of its width for the proportional map and 30%
for a scrollable economy/trip panel; narrow screens stack them. Map controls are
declared by the atlas and projected into the integrated header. The map has no
additional heading or toolbar strip. The side panel exposes supplies, stock,
live buy/sell prices and recorded profit/cost figures without revealing required
forecast answers.

Optional `tradeWorld` configuration defines bounded pulse timing, seeded events,
price effects and freight routes. The runtime reducer alone advances pulses,
expires effects, confirms deliveries, adds stock and changes market quotes.
`world.pulsed` carries an expected tick for idempotency; `world.pauseToggled`
persists the player's pause. Price calculations accept an optional snapshot;
legacy configurations remain static. Package validators check shape and all
route/location/good references. History is bounded and no offline catch-up occurs.

Phaser town and wagon artwork is scene-owned and retained across updates. Weather
visibility, landscape and motion are presentation controls. SVG labels and input
targets remain above the canvas, with basic artwork restored when Phaser is
unavailable. The same confirmed freight positions appear in the basic map.
All price/news information is also available in HTML. See the
[implementation and verification report](../frontier-trading/TRADE_WORLD_WORKSPACE.md).

## Turn-based world timing (schema 1.11, template 1.6)

Optional `tradeWorld.timing: 'turn-based'` disables the interval and independent
world pulse/pause controls. Omission or `'real-time'` preserves previous behavior.
After validation, `route.committed` and `travel.advanced` each settle exactly one
world turn in the same reducer result as the player's action. Forecast validation
uses pre-departure prices. Browsing, purchases, rejected actions, checkpoint
resolution and reloading never advance the world. Event delays may add calendar
days without extra world turns. A departure turn leaves player travel progress at
zero; each subsequent travel turn spends one travel day.

The header and market report expose the turn number. Departure confirmation
explains when quotes will change. Phaser interpolates confirmed freight positions
even though the automatic clock is disabled. UI motion never decides, advances,
or retries a turn. SVG and reduced-motion views show the same confirmed state.
