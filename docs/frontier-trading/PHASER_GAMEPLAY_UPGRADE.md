# Phaser 4 gameplay upgrade

## Scope and implementation plan

Status: implemented, with Phaser pinned to 4.2.1.

Upgrade the reusable simulation-decision route atlas with a lazy-loaded Phaser 4
scene. The practice simulation remains the preparation for a live competition
on the final project day. This change implements the canvas gameplay layer;
the final-day multiplayer service is a separate planned capability.

1. Retain the existing route graph, planning panels, market labels, keyboard
   targets, math gates, and runtime command boundary.
2. Render the configured landscape, state-specific trails, travel checkpoints,
   a company wagon, and ambient effects in Phaser. Sample the existing SVG paths
   so canvas routes and accessible controls share exactly the same geometry.
3. Add a route scouting animation, clearly labeled as a preview, which shows
   the length and daily checkpoints of a chosen route without spending money,
   advancing time, revealing hidden information, or recording a journey.
4. Interpolate wagon movement only between received travel snapshots. Animate
   arrival only when the runtime reports the destination. Reopening the map
   starts at the current saved position. Map controls synchronize both layers.
5. Support reduced motion, a motion toggle, resize, tab visibility, clean scene
   disposal, and an explicit basic-map fallback if the canvas cannot load.
6. Verify geometry, preview isolation, state transitions, lifecycle, keyboard
   behavior, existing simulation tests, production build, and browser rendering.

## Boundaries

Phaser receives a presentation snapshot and produces local visual feedback.
Angular owns accessible interactions and translates decisions through the
existing runtime. Neither frame updates nor tween completion mutates the domain.
Phaser is dynamically imported only by the map renderer. No project-name checks,
backend SDK calls, additional UI framework, or core schema changes are needed.

The original SVG is retained as the semantic interaction layer and explicit
fallback. Once Phaser is ready, its duplicate landscape, trail strokes, and
wagon are visually suppressed. Destination controls, route-cost controls,
prices, and focus targets stay visible and aligned above the canvas.

## Final-day multiplayer plan

The current final showcase is a read-only presentation of one saved season.
Live multiplayer belongs only to a teacher-opened final-day session. Earlier
project work uses the practice experience.

The next implementation should follow `LIVE_TRADING_FINAL_DESIGN.md` and
`FIREBASE_DATABASE_UPGRADE_PLAN.md`: authenticated company membership, one
authorized team snapshot plus a public class summary, server-validated commands,
idempotent transactions, a server clock, teacher pause, and reconnect recovery.
The same scene can consume public company positions and confirmed public events
from that adapter. It must never subscribe to other teams' private drafts or
answers. Visual arrival must not decide trades, rank, or score.

Use the configured competition rules for starting resources and scoring. Carry
forward students' strategy and evidence; do not silently carry practice wealth
into the competition or introduce new scoring weights.

TEMPLATE_CAPABILITY_GAP: synchronized final-day competition requires the reusable
live-session/exchange backend described in those plans. A Phaser canvas alone
does not provide multiplayer. No simulated opponents or fabricated live data are
introduced by this upgrade.

## Validation and handoff

Files added:

- `src/app/templates/simulation-decision/ui/map/route-canvas.models.ts`
- `src/app/templates/simulation-decision/ui/map/phaser-route-renderer.ts`
- `src/app/templates/simulation-decision/ui/map/phaser-route-canvas.component.ts`
- `src/app/templates/simulation-decision/ui/map/route-canvas.spec.ts`
- `src/app/templates/simulation-decision/ui/map/phaser-route-canvas.spec.ts`
- `scripts/check-phaser-atlas.cjs`
- `tsconfig.simulation-canvas.spec.json`
- this plan and implementation report.

Files modified: `package.json` and lockfile; the atlas component's TypeScript,
HTML, SCSS and tests; the route page's TypeScript, HTML and SCSS;
`event-decision.component.html`; `simulation-decision-runtime.service.ts`;
`simulation-planning.spec.ts`; `choice-progression-ui.spec.ts`; the trading
README and `UI_03_ROUTE_MAP.md`. Temporary preview builds and screenshots live
under ignored `tmp/`, not in project curriculum assets.

Added the lazy Phaser renderer, Angular canvas host, presentation contracts and
geometry helpers, projection/lifecycle tests, a focused simulation test config,
and `scripts/check-phaser-atlas.cjs`. Updated the atlas, route page, journey
controls, runtime travel navigation, existing UI tests, package dependency,
README, and route-map guide.

The map now offers Scout trail, Motion, and Basic map controls. Scouting fits the
selected open route and sends a translucent wagon along its planned day markers.
Its explicit preview label and unchanged saved state distinguish it from travel.
The renderer draws the landscape, trails, checkpoints, wagon, directional pulses,
and quiet wind/dust effects. Semantic SVG destination/cost targets and HTML
market cards stay above it. Asset/context failures restore the basic map and
dispose the renderer. Device reduced-motion changes are observed live.

After a reviewed departure, the student stays on the map. Travel next day calls
the existing runtime travel command with an optional `returnView: 'route'`.
Pending events still navigate to the decision screen. Safe days and confirmed
arrival remain on the map, with a Visit the market action after arrival.
Journey details has a Continue on the map action. The default `advanceTravel()`
navigation remains compatible. No travel/scoring formulas changed.

89 simulation tests pass across ten files, including original trading/planning
regressions and new projection, lifecycle, preview isolation, pause, event
handoff, arrival focus, and stalled-download recovery checks. The jsdom UI suites mock Phaser's browser graphics
module; the canvas itself is exercised in Chromium.

Browser verification covers actual Phaser rendering, keyboard route selection,
scouting without persistence writes, motion toggle, renderer removal/remount,
map/canvas size matching, zoom/pan, 390px mobile resize, device reduced motion,
and a saved-journey fixture advanced through confirmed arrival. Screenshots are
written to `tmp/phaser-atlas-audit/`. This is visual and command-path testing,
not a classroom concurrency test.

The same browser checks pass through the normal project launch against the full
production build, with zero page errors. The temporary local production preview
is served at `http://127.0.0.1:4206/projects/frontier-trading-company` for review.

The full Angular production build passes, with existing component-stylesheet
budget warnings. Phaser is outside the initial bundle. An isolated Angular
preview under `tmp/` also allowed verification while unrelated features in the
shared worktree were unfinished. Those files were preserved.

The architecture audit still reports two pre-existing violations in unchanged
files: `core/index.ts` (forbidden `./templates` dependency) and
`projects/mystery-substance/lab-kit/render-quality.service.ts` (service in a
project package). No trading or Phaser file is flagged by that audit.

Focused checks:

```text
npm test -- --watch=false --include="src/app/templates/simulation-decision/**/*.spec.ts" --ts-config=tsconfig.simulation-canvas.spec.json --runner-config=vitest.serial.config.mjs
node scripts/check-phaser-atlas.cjs
```

Set `PLAYWRIGHT_MODULE` if Playwright is installed outside this repository.
`PHASER_TEST_URL` selects the development server. The optional `PHASER_ISOLATED=1`
mode expects an already-started development preview; only this mode uses Angular
debug access to seed a disposable saved-journey fixture. Normal mode walks the
project launch and creates a test company in a fresh browser context.

No core schema changes or accounting/scoring deviations. The basic map is an
explicit presentation fallback, with the same required decision information.
The next phase is the final-day live-session and exchange backend, followed by
public company-position projections into the scene. Do not advertise live
multiplayer until that separate capability is built and verified.

Reference: https://phaser.io/download/release/v4.2.1

## Selective review of the full live-map guide

The supplied full-upgrade guide was treated as recommendations. Phaser 4.2.1,
the illustrated map, route-state rendering, a presentation adapter, keyboard
controls, reduced motion, and a basic-map fallback were already implemented.
This pass fixes observed reliability and interaction gaps in those systems.

- Added pointer-anchored wheel zoom using the existing bounded camera, with
  browser zoom shortcuts preserved and no runtime writes.
- Company focus now uses the shared saved-position projection and works when
  SVG path measurement is unavailable.
- Late route geometry updates the company marker even if official travel
  progress has not changed. Empty paths cannot initiate travel animation.
- Rapid confirmed travel updates continue from the visible tween position;
  disabling motion immediately places the marker at confirmed progress.
- Route sampling depends on immutable geometry, rather than status changes.
  Scenery, motion, preview, and company-only updates retain static route labels.
- Background request listeners are removed when superseded or completed.
  An obsolete image failure cannot disable the current map; removing a pending
  background releases the loading state.

No dependency update, backend change, curriculum change, or new scene hierarchy
was needed. The existing Angular/Phaser presentation boundary remains intact.
There are no new schema changes, architectural deviations, or capability gaps.
The previously documented live-session backend gap remains: merged class
positions, teacher spotlights, synchronized weather/markets, and competition
rankings should follow authenticated public summaries and confirmed events.
Those features, fog of war, and an asset replacement campaign were not added
solely to match the guide. The recommended next phase remains the separately
scoped final-day live-session backend.

Files added in this review: `scripts/check-route-renderer.cjs`, a disposable
browser regression harness that bundles the actual Phaser renderer and requires
no backend. It inspects scene objects only inside the test bundle and adds no
production debug globals.

Files modified in this review: `map-viewport.ts`, `route-atlas.component.ts`,
`route-atlas.component.html`, `route-canvas.models.ts`,
`phaser-route-renderer.ts`, `route-atlas.spec.ts`, and `route-canvas.spec.ts`
under `src/app/templates/simulation-decision/ui/map/`;
`scripts/check-phaser-atlas.cjs`; `UI_03_ROUTE_MAP.md`; and this report. Existing
working-tree changes, including the prior Phaser integration, were preserved.

Validation: all 95 simulation tests pass (six added regressions); the full
production build passes with existing stylesheet-budget warnings. Both browser
checks pass with zero page errors. The renderer harness covers late geometry,
rapid updates, reduced motion, object retention, resize, confirmed arrival,
background request races, and disposal. The full production project-launch
check covers accessible route selection, scouting without persistence writes,
fallback/remount, wheel zoom, preserved camera on 1366×768 resize, 390px mobile
layout, and device reduced motion. Desktop/mobile screenshots were inspected.
The architecture audit still reports only the two previously documented,
unrelated violations in `core/index.ts` and the mystery-substance render-quality
service.

Run the new real-renderer check with:

```text
node scripts/check-route-renderer.cjs
```

Set `PLAYWRIGHT_MODULE` if Playwright is installed outside this repository.
