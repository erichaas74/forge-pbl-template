# Phaser trade world and map workspace

Frontier Trading Company 1.15.0 uses simulation schema 1.11 and template contract
1.6. The map occupies 70% of the desktop workspace; the remaining 30% is a
scrollable supplies, market and profit panel. Phones stack the map and panel.

## Player experience

- One integrated project header replaces the launch bar, company bar, next-step
  bar, world-news bar and map title/tools strip. Map, Shop, Project, Map tools,
  World and the current next action share that header. Opening, final example,
  saved records, help and teacher controls remain available through Project.
- The side panel shows cash, realized profit on sold goods, cargo and capacity,
  net profit with costs, stock and live buy/sell prices. A town selector supports
  market comparison. It does not reveal answers to the required trip forecast.
- The route planner, checkpoint controls and journey records use the same right
  panel. Arrival switches planning to the new town without recreating the scene.
- The network contains 24 directed routes, including returns and connections
  between markets. The season allows 30 travel days. Existing transport,
  discovery, goods, calculation and departure requirements remain enforced.
- Phaser owns town artwork, covered wagons, draft teams, rotating wheels, dust,
  clouds, snow, floodwater and warning overlays. Towns use distinct fort,
  trading-post, bridge and camp artwork. Landscape, weather visibility, motion,
  scouting and the basic map are controlled from the header.
- Four configured freight caravans travel back and forth. Each confirmed arrival
  replenishes the listed stock and temporarily lowers prices at that market.
- Prices stay fixed while choosing routes, shopping, doing math, and making
  checkpoint decisions. “Confirm supplies & depart” pays for departure supplies
  and runs the first world turn; the player wagon is ready at the starting town.
  Each “Travel next day” moves the player one day and runs one more world turn.
  A rejected action never advances the world. The first turn introduces an
  event; another arrives every three turns. Seeded cycles include
  winter storms, flooding and a fictional dispute over passage. The conflict
  concerns a particular war party rather than depicting all Native people as
  enemies; a peaceful Native Trade Caravan also participates in the economy.
- The World menu shows the turn number, freight progress and market news. There
  is no timer or independent advance/pause control in this mode. World effects
  expire in turns. Opening pages, reloading, waiting and resolving a checkpoint
  never consume an extra turn, even when a checkpoint adds calendar days.
  Confirmed motion plays for up to 2.2 seconds, with reduced-motion support.

## Runtime authority and compatibility

`tradeWorld` is an optional configuration and snapshot extension. Configurations
without it retain static markets. Package assembly validates its shape, timing,
price bounds and identifiers, then validates references to routes, locations and
goods. The small package fixture exercises it outside Frontier's content.

Optional `tradeWorld.timing` selects `turn-based` or `real-time`; omission retains
the original real-time behavior for older packages. The interval field remains
required for compatibility but is unused in turn-based mode. Validators reject
unknown timing modes. Packages without `tradeWorld` still use static prices.

In turn-based mode, the reducer settles freight and markets atomically with each
accepted `route.committed` or `travel.advanced` command. Route forecasts are
validated and recorded against the pre-turn quote before the market changes.
`world.pulsed` and `world.pauseToggled` cannot bypass that sequencing. The runtime
does not create an interval. In real-time mode, `world.pulsed` still includes the
expected tick; duplicate or out-of-order pulses return unchanged state.
The reducer owns event selection, effect expiry, freight
progress, delivery, stock and price modifiers. Snapshots persist all world state,
including pause, with a bounded 30-entry event history. Restoring a game does not
reroll events or replay shipments. The existing version-scoped adapter preserves
older release saves separately; this release uses the 1.15.0 save scope.

Map quotes, shop math, trade preview, executed ledger entries, cargo resale and
forecasts use the same runtime price function. Active modifiers add in basis
points, bounded to 50–200% of the published price. Delivery relief expires like
other effects; delivered stock remains until purchased. Receipts retain their
executed amounts and cannot be repriced by later news. The reducer rejects an
explicit quote that no longer matches the current market.

Phaser receives public positions, location kinds, route geometry, weather kinds
and confirmed milestones. It receives no pricing formulas, event choices or
simulation commands. Its animations only interpolate recorded progress; neither
arrival callbacks nor visibility toggles can mutate outcomes. Scene objects are
retained across price updates and disposed when definitions or the scene change.

The SVG layer retains keyboard interaction, labels, focus, route inspection,
checkpoints and basic-map wagons. Animated town icons are hidden only after
Phaser reports ready. Failed rendering restores the SVG artwork. Reduced motion
keeps static positions, weather and milestone feedback. Native HTML panels expose
all economic changes without relying on animation or color.

## Engineering report

Added domain files: `trade-world.models.ts`, `trade-world.engine.ts`,
`trade-world.validation.ts`, `trade-world.spec.ts`, `trade-world-turns.spec.ts`.

Added project data: `frontier-trade-network.ts`, `frontier-trade-world.ts`.

Added UI/runtime files: `trade-world-runtime.spec.ts`, `trade-world-ui.spec.ts`,
`trade-world.presentation.ts`, `trade-world-panel.component.ts/.scss`,
`route-economy-panel.component.ts/.scss`, `route-canvas-art.ts`,
`route-workspace.scss`, `simulation-project-header.scss`.

Modified the simulation models/reducer/runtime/tokens; package contracts,
assembler and validators; shell, route atlas, Phaser renderer and route page;
market and cargo pricing/receipts; progression/planning/student-flow tests;
Frontier configuration, catalog and builder information; and the existing
simulation launcher to use the host's integrated-header contract.

Added `scripts/check-trade-world.cjs` and extended the existing Phaser atlas,
renderer and route-gameplay browser checks. The report and route-map specification
document the changed optional contracts and presentation.

Validation: **136 simulation tests pass across 16 files**, and the production
build passes. Follow-up checks cover timing validation, the turn controls and
route selection. The full journey and turn-based trade-world Chromium checks
pass without page errors. The latter follows the normal shopping and forecast
flow, verifies no change over a visible 21-second wait, and checks seven explicit
turns, shipment stock/price relief, a return trip, reload and SVG fallback.
Checkpoint events are exercised in the separate full-journey browser check;
the world check uses quiet-leg fixtures after confirming departure to isolate
freight timing. The previous slice also verified the standalone Phaser renderer
and atlas controls.

Desktop and phone screenshots were inspected, including a measured 70/30 split,
one header, turn numbers, weather and menu placement. The active trip appears
before the economy details in the side panel, keeping the next-day action visible
on phones. Route-cost controls now render after all road paths so crossing and
return routes cannot intercept their mouse/touch clicks.

Coverage includes deterministic timing, effect expiry, quote consistency,
delivery idempotency, stock, return journeys, saved state, clock disposal,
calculation holds, unchanged legacy behavior, package validation, header controls,
sidebar economics, artwork lifecycle, reduced motion and SVG fallback. Browser
checks use disposable profiles and save screenshots under ignored
`tmp/trade-world-audit/` and `tmp/route-gameplay-audit/`.

The production build retains stylesheet budget warnings. The architecture audit
reports two existing unrelated violations: `core/index.ts` importing templates
and the mystery-substance project-local render-quality service. No changed
simulation file is flagged. No core platform contract changed, no specification
deviation was introduced, and there are no new `TEMPLATE_CAPABILITY_GAP` items.
Freight is configured simulation activity; classroom multiplayer still requires
the separately planned authority and synchronization adapter.

Recommended next phase: a student playtest of multi-stop trading, with attention
to the pace of price changes and the visibility of route planning in the panel.

```text
npm test -- --watch=false --include="src/app/templates/simulation-decision/**/*.spec.ts" --ts-config=tsconfig.simulation-canvas.spec.json --runner-config=vitest.serial.config.mjs
npm run build
node scripts/check-route-renderer.cjs
node scripts/check-phaser-atlas.cjs
node scripts/check-route-gameplay.cjs
node scripts/check-trade-world.cjs
```

Set `PLAYWRIGHT_MODULE` if Playwright is installed outside this repository, and
`PHASER_TEST_URL` to the local preview for the full-app checks.
