# Route gameplay slice

The existing Phaser 4.2.1 atlas now makes selected routes, departure, confirmed
travel days, trail decisions, and arrival visible throughout the journey.

## Behavior

- Selecting an available trail shows its name, distance and planned days on the
  board, with a destination beacon. The existing inspection, shopping, forecast,
  rationale and departure review gates still apply.
- A successful departure raises a departure pennant and a short ring of sparks
  at the origin. The wagon does not advance until the runtime confirms a day.
- Confirmed travel rolls the wagon's wheels and adds a small bounce and trailing
  dust. Checkpoint numbers become check marks. A milestone pennant and brief
  burst appear after the visual wagon reaches the confirmed checkpoint.
- A parchment journey panel lists Start, each day and Arrival, with text and
  current-step semantics. The mobile panel keeps the next-day action visible.
- A pending event still hands off immediately to the existing decision screen.
  That screen names the stopped checkpoint. Event consequence effects now run
  **after** the runtime accepts the choice, using recorded cash, cargo and
  outcome fields. Rejected choices do not produce success effects. The review
  uses the existing keyboard containment and focus restoration directive.
- Returning from a decision shows its recorded outcome in the journey panel.
  Final-day event resolution shows arrival and its outcome on the event screen.
  Map arrival and its market action restore from the actual journey history,
  including the recorded arrival day, when the map is reopened or reloaded.

## Authority and accessibility

`route-journey.presentation.ts` is a pure projection of configuration and the
runtime snapshot. Phaser receives only a public milestone ID, journey ID, route
ID, label, kind and confirmed progress. It receives no choice definitions,
answers, prices, event probabilities or runtime commands. Animation completion
only updates scene objects. Restoring a snapshot does not replay celebrations;
different journey identities cannot share an in-flight travel interpolation.
Teacher pause, save failure, motion-off and reduced motion stop animated effects.

Angular continues to own route selection, departure, advance and event commands.
No domain formula, curriculum configuration, dependency version, backend or core
schema changed. The existing local persistence adapter remains in use.

The SVG/basic map retains keyboard destinations, route inspection, the route
journal, progress and the same journey controls. Static transforms now position
its wagon and checkpoints without relying on SMIL animation. Check marks and
text distinguish completed checkpoints independently of color. Renderer loading
failure and context-loss fallback remain covered by existing lifecycle tests.

## Files in this slice

Added:

- `src/app/templates/simulation-decision/ui/map/route-journey.presentation.ts`
- `src/app/templates/simulation-decision/ui/map/route-journey.spec.ts`
- `scripts/check-route-gameplay.cjs`
- this report.

Modified under `src/app/templates/simulation-decision/ui/`:

- `map/route-canvas.models.ts`, `map/route-canvas.spec.ts`,
  `map/phaser-route-renderer.ts`
- `map/route-atlas.component.ts`, `.html`, `.scss`
- `pages/route-map.component.ts`, `.html`, `.scss`
- `pages/event-decision.component.ts`, `.html`

Also extended `scripts/check-route-renderer.cjs`, the trading README and the
route-map UI specification. Existing shared-worktree changes were retained.

## Verification

Final result: **110 tests pass across 12 simulation test files**, the full
production build passes, and all three Chromium harnesses pass with no page
errors. Desktop, mobile checkpoint, event, and restored-arrival screenshots were
inspected. The mobile next-day button is verified inside the visible sheet.

The simulation suite covers selection/departure isolation, checkpoint history,
restored arrival, pending final-day events, teacher pause, failed persistence,
accepted/rejected decisions, final-event arrival and journey identity changes.
The real Phaser harness covers cue sequencing and confirms that tween completion
cannot alter its input snapshot, alongside existing geometry, resizing, reduced
motion, asset-race and disposal regressions.

The full-app browser harness uses a disposable browser context and a saved
journey fixture. It verifies departure, a confirmed checkpoint, mobile action
visibility, event handoff, recorded consequences, return to the map, basic-map
arrival under reduced motion, and arrival after reload. It does not modify the
user's browser profile or replace tests of curriculum gates. Screenshots are
written under ignored `tmp/route-gameplay-audit/`.

```text
npm test -- --watch=false --include="src/app/templates/simulation-decision/**/*.spec.ts" --ts-config=tsconfig.simulation-canvas.spec.json --runner-config=vitest.serial.config.mjs
npm run build
node scripts/check-route-renderer.cjs
node scripts/check-phaser-atlas.cjs
node scripts/check-route-gameplay.cjs
```

Set `PLAYWRIGHT_MODULE` when Playwright is installed outside the repository.
Set `PHASER_TEST_URL` to a running local production preview for the app checks.

The production build reports stylesheet budget warnings, including the extended
atlas and route-page stylesheets. The architecture audit reports the previously documented
violations in `core/index.ts` and the mystery-substance render-quality service;
no changed gameplay file is flagged.

There are no specification deviations or new `TEMPLATE_CAPABILITY_GAP` items.
A useful next phase is a second configured route network to exercise the same
presentation with longer trails and multiple successive journeys. Live classroom
competition remains a separately scoped backend capability.
