# Frontier Trading Company

Frontier Trading Company is a Grade 5 mathematics project-based learning simulation built with the reusable `simulation-decision` template. It is available at `/frontier-trading`.

Builders can open `/frontier-trading/builder-info` from the Frontier card on the project library. The page reads current settings, stages, routes, and report structure directly from the live configuration, then combines them with the version-matched HBC status, source paths, change log, guardrails, and competition roadmap in `frontier-trading.builder-info.ts`.

## Company charter opening

The opening now uses a painted frontier prologue matching the town and route map. The selected transport remains a live illustrated overlay, while the editable company-name field starts with a randomly selected animal trading-company name. Students and builders can accept it immediately or choose another animal name with one click. See [the setup scene art system](SETUP_SCENE_ART_SYSTEM.md) for the background and overlay contract.

## Route-first planning workspace

The map is the full-width planning workspace. Each unlocked, transport-compatible destination has a readable market-price placard beside its fort showing projected selling prices per unit for currently available goods. Labels move with zoom/pan, stay inside the map frame, and use nearby candidate positions to avoid crowding. A dotted connection identifies the matching town. Long lists scroll within the placard; no separate market sidebar or mobile tray is needed.

Each open route displays its own configuration-derived travel cost halfway along its path. Clicking that marker, its fort, or its placard toggles a prediction anchored to the same path midpoint, not to a fixed sidebar. Only one route prediction is open at a time: selecting another route switches its content and location; selecting the same route or pressing Escape closes it. Hover/focus alone does not open or switch the prediction. The card follows map pan/zoom and is clamped inside the map frame; a leader identifies its route anchor. It shows time, travel cost, distance, terrain, weather, and risk without repeating prices or calculated margins. Previewing does not change the saved route, spend cash, or record a domain event. “Use this route” opens the existing forecast/rationale planner and preserves all departure checks.

Starting a company and returning to Plan Trip opens Choose Route. The map stays mounted behind overlays; mission progress and route/journey journals remain available in the bottom toolbar. Predictions remain route-anchored on narrow screens; the longer trip planner uses a bounded sheet.

The atlas's optional `destinationMarkets` input accepts formatted, configuration-derived price rows; optional trail `costLabel` fields carry formatted route costs. Its optional `predictionRouteId` input positions projected prediction content using the rendered SVG path's arc-length midpoint (endpoint fallback for non-SVG test environments). Existing atlas hosts retain their default behavior. The pure `map-market-layout.ts` helper and its tests were added in the map-pricing work; this refinement modifies route page, atlas, `map-viewport.ts`, regression tests, and this documentation without adding files. No core or persistence schema changes, architecture deviations, or template capability gaps were introduced.

Verification covers reachable versus locked markets, prices on-map but not in predictions, route-specific midpoint costs, wide/narrow label bounds, zoom/pan tracking, keyboard preview/selection, and unchanged departure gates. Next: student walkthrough of comparing destination prices against travel costs before choosing cargo.

## Connected town market

The market now uses a pre-rendered connected-town background with four transparent, accessible storefront hotspots. Opening a shop replaces the street in the same game frame with a matching pre-rendered interior. The full interior remains visible behind a shallow price shelf instead of being covered by tall product panels. Compact cards show Buy each, Sell each, wagon space, stock, and direct Buy or Sell actions; quantity and full trade math open in the wagon planner. A small merchant bubble and collapsed route tip keep helpful context available without covering the room. The art never contains authoritative prices or assessed answers. Opening a storefront scrolls only as far as needed and moves focus to the in-view shop counter. The repository interaction rule in `AGENTS.md` applies this same behavior to future drawers, dialogs, expanded cards, and selected-item controls.

Every purchase and sale line now requires the student to enter the exact transaction total. Purchases of 3–6 units receive a 10% bulk discount and purchases of 7 or more receive 14%; sales use the posted sell price. The game withholds net cash change and remaining cash until every line is correct, then records the posted price, discounted unit price, discount, quantity, student answer, and settled amount in the ledger. The domain engine rejects missing and incorrect answers even if a caller bypasses the screen.

The reusable live wagon uses a realistic transparent wagon beneath quantity-driven cargo groups. Food and provisions appear as canvas sacks, tools and oil as wooden crates, fur and cloth as wrapped bales, and rope as coils. A stack changes at 1, 2–3, 4–6, and 7+ units; an HTML tag always shows the material name and exact `× quantity`. Shape and label carry meaning so students never have to identify cargo by color alone. The same live load appears in the market, outfitting yard, journey, and event scenes. See [the wagon cargo art system](WAGON_CARGO_ART_SYSTEM.md).

## Painted route world

The route atlas uses a matching pre-rendered frontier landscape beneath the existing live SVG game layer. Trail lines, availability, selected and compared states, checkpoints, destinations, labels, wagon progress, and keyboard controls remain generated from configuration and runtime state. The background adds rivers, forests, mountains, forts, and atmosphere without containing route lines or answers. See [the map scene art system](MAP_SCENE_ART_SYSTEM.md) for the coordinate and overlay contract.

## Learning experience

Students create a company, visit two shops, choose a route, buy two kinds of goods while protecting travel money, solve a guaranteed math challenge, sell at the destination, and answer four short reflection questions using automatically saved game records.

The project emphasizes:

- whole-number quantities and decimal money;
- multiplication, division, subtraction, unit price, cost basis, and profit;
- cash, cargo-capacity, route, time, and risk trade-offs;
- review-before-commit decision making;
- claims supported by calculations and records from the simulation.

## Page alignment

| Guide | Implemented workspace                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------ |
| UI 01 | Plan Trip, Travel, and Finish spaces; one-action Next Mission guide; live score; save and lock states              |
| UI 02 | Living market, staged supply unlocks, NPC stalls, rumor evidence, drag-to-load/sell, trade feedback                |
| UI 03 | Map-first board, staged route unlocks, checkpoint trails, planner drawer, route journal, wagon progress            |
| UI 04 | Unit-by-unit physical cargo, weighted suspension, drag-to-sell handoff, profit tooltips, canonical inventory table |
| UI 05 | Weather-driven event scenes, staggered choices, math check, rationale, confirmation, animated consequence reveal   |
| UI 06 | Money records, expandable calculations, annotations, automatic verification, and saved reflection records          |
| UI 07 | Transparent cash equation, results metrics, trade analysis, cash timeline, reflection/report actions               |
| UI 08 | Four reflection questions, autosave, suggested game records, one calculation, readiness, final submission          |
| UI 09 | Local teacher overview, seed/difficulty, pause, inject/skip, restart/clear confirmations, print support            |

The reference screenshots guided visual hierarchy, parchment reading surfaces, dark wood framing, teal actions, serif headings, dense data cards, and review dialogs. Semantic HTML and live SVG controls remain authoritative above optional, configuration-driven scene art so the reusable template still works when a project does not supply raster assets.

The interaction layer makes each animation explain state rather than decorate it: cargo visibly enters or leaves the wagon, an overloaded draft makes the wagon reject the load, route motion represents committed travel, price tags reflect trends, and event effects reveal the recorded cost, delay, and risk. All drag interactions retain equivalent buttons, review dialogs, and structured data views. Reduced-motion preferences collapse the journey and suppress repeated animation.

## Deliberate guide adaptations

- The current repository has no authenticated classroom backend, so teacher controls are explicitly local to the current browser instead of presenting fabricated roster or realtime class data.
- Student progress is stored through a project-and-version keyed persistence adapter. The boundary can be replaced by a server adapter without changing page components.
- Unsold cargo is displayed separately from cash and does not silently inflate the score.
- Event randomness is seeded and reproducible. Refreshing does not reroll an active attempt.
- All official money uses integer cents. UI formatting never serves as the accounting source of truth.

## Structure

- Project curriculum configuration: `src/app/projects/frontier-trading/frontier-trading.config.ts`
- Generic domain and reducer: `src/app/templates/simulation-decision/domain/`
- Runtime and persistence boundary: `src/app/templates/simulation-decision/runtime/`
- Reusable shell and pages: `src/app/templates/simulation-decision/ui/`
- Route composition: `src/app/runtime/project-launch/template-launchers/simulation-decision.launcher.ts`

## September 2026 route and market update

The route and market now share uncommitted planning state across workspaces, use complete-plan previews, and distinguish adding from editing quantities. Readable goods cards, merchant source cues, illustrated destination controls, aligned route comparisons, trip budgets, accessible review dialogs, and official-progress markers replace the earlier dense layouts and synthetic departure clock. See [the completion report](ROUTE_MARKET_FIXES.md) for scope, files, and validation. Uncommitted plans survive workspace changes in memory; browser reload restores committed state through the existing adapter.

## Map experience upgrade

The separate [map experience upgrade](MAP_EXPERIENCE_UPGRADE.md) turns Route into a map-first game board with zoom/pan controls, animated checkpoint trails, an overlaid planner, a compact route journal, clearer journey states, and saved journey evidence using the existing local simulation. Release 1.6 adds the painted map background and higher-contrast route glow without changing the route or scoring rules.

## SVG scene and animation plan

The [SVG scene and animation plan](SVG_SCENE_AND_ANIMATION_PLAN.md) defines and records the implemented illustrated-board-game system for Company Setup, Market, Wagon Load, Route Atlas, Journey, and Trail Events. Layered SVG environments, a shared wagon/cargo language, meaningful state motion, reduced-motion behavior, and stable HTML calculations replace the earlier CSS and glyph placeholders.

## Choice progression scaffold

The [choice progression scaffold](CHOICE_PROGRESSION_SCAFFOLD.md) opens the simulation with three staple supplies and two routes, then expands to the full catalog and network through market exploration and an accurate multi-line manifest. Market and Route share live rank guidance, future routes appear locked on the atlas, and the domain prevents locked choices from bypassing the UI.

The student navigation is consolidated into **Plan Trip**, **Travel**, and **Finish**. Shops, routes, and wagon checks appear as numbered planning tools; the money record, score, and reflection appear together at the end. A persistent Next Mission card gives one concrete action, opens the right tool, scrolls to the exact control, and shows progress toward the current goal.

The live game score is intentionally transparent: **40 points for trading results, 40 for correct math, and 20 for explaining trail choices**. After the guided route and load choices, students complete two harder forecast checks and later compare forecast with actual trip profit. This game score remains separate from a teacher's review of the final reflection.

## Final project competition

The [final project competition plan](FINAL_PROJECT_COMPETITION_PLAN.md) carries the individual practice language into a 55-minute four-company final. Student-produced route totals, capacity calculations, unit-price comparisons, forecasts, revisions, and profit audits unlock the game actions; the interface withholds assessed totals until students respond. The plan also defines the difficulty ladder, HBC scenario requirements, rotating math ownership, 40/40/20 score, visible price traps, server-authoritative trade sequence, teacher controls, implementation phases, and classroom release checks.

## Current-fort map prices

The route workspace places a **Buy here** price card beside the current fort, using existing market buying prices and unlocked goods. Destination cards remain **Sell here**. Buying prices follow arrival and hide during travel. Card placement avoids route-cost controls where space permits. The workspace legend and Scenery/Motion controls are removed; artwork, navigation, and reduced-motion support remain. This extends the reusable atlas with an optional current-market input, without changing domain or persistence contracts. Tests cover price accuracy, arrival updates, starter goods, travel visibility, control removal, and map placement.

Verification: 76 simulation tests passed across eight files, production build passed with existing stylesheet-budget warnings, and the live browser showed buying/selling cards with route buttons clear. Modified the route page, atlas, market-layout helper, their tests, and this document; no files added, specification deviations, or new capability gaps. Next recommended check: classroom-sized screens with the fully unlocked goods catalog.

## Final company showcase

The Finish workspace now includes a five-part [final showcase](FINAL_SHOWCASE_IMPLEMENTATION.md). It turns the saved route, original load, forecast, ledger, event revision, score, and reflection into a presentation surface with a three-minute timer and questions drawn for another group. Showcase controls are read-only and do not change the official attempt. The synchronized class exchange and leaderboard remain part of the planned live-system build.

## Learning and standards audit

The [Trading Post learning, completion, and mathematics standards audit](TRADING_POST_LEARNING_STANDARDS_AUDIT.md) traces every student workspace from setup through submission, distinguishes interface-generated calculations from student-produced evidence, crosswalks the experience to Grade 5 Common Core mathematics, and defines the changes needed before the LMS can make standards-mastery claims.

## Historical route optimization redesign

The [Hudson's Bay Company route and cargo optimization design](HBC_ROUTE_OPTIMIZATION_GAME_DESIGN.md) reframes the game as a historically grounded annual-outfit challenge. Teams plan connected water routes, load weight-limited manifests, calculate forecast and actual profit, analyze HBC records alongside Indigenous perspectives, and compete for the highest verified net profit among feasible plans.

## Proposed live trading final

[The Great Trading Company Exchange design](LIVE_TRADING_FINAL_DESIGN.md) develops a living market and route map into a timed, collaborative final with math-gated trades, price traps, shared events, auditable transactions, and live scores. It proposes a reusable Live Classroom Session capability, a balanced four-company pilot, and a phased implementation path. This is a design proposal; the current simulation remains browser-local.

[The reusable live activity architecture proposal](REUSABLE_LIVE_ACTIVITY_ARCHITECTURE_PROPOSAL.md) maps that experience onto the current template registry, core runtime, package format, and adapter boundaries. It separates session coordination, resource accounts, exchange, challenge gates, scheduling, awards, evidence, and projections so the same capabilities can support other templates and projects.

[The Firebase backend upgrade plan](FIREBASE_DATABASE_UPGRADE_PLAN.md) turns the approved architecture into a staged production path. It keeps Firebase behind repository adapters, defines tenant-scoped Firestore records and authoritative command processing, and sequences identity, low-risk persistence, realtime projections, two-company trading, scheduling, and production readiness.
