# Time Repair pilot

The project catalog now includes **Time Repair: Restore the Timeline** at
`/projects/exploration-time-repair`. It opens directly into a Timeline Control
Room. This phase proves one complete playable event, following the user's
pasted request. `TIME_REPAIR_PROJECT_TYPE.md` supplied design context; its full
classroom feature list is not represented as completed work.

## Implemented experience

- Seven selectable timeline nodes, explicit corruption/ripple/stable states,
  a stability meter, and three local repair charges.
- Four cited archive cards, source-perspective notes, collection, and saved
  evidence-to-anomaly relationships with confidence and student reasoning.
- A defense checkpoint requiring the configured evidence connections,
  classification, a source-based conclusion, and written explanations. Rejected
  defenses remain in the log. This is a deterministic **system checkpoint**, not
  AI evaluation or a grade of the writing.
- One illustrated harbor scene with two camera views, four keyboard-accessible
  inspection points, and a cargo-removal repair that visibly empties the crate.
  The optional initial/restored object images are content assets. The inspection buttons below
  the scene provide a non-spatial alternative to its hotspots.
- Three before/after ripple branches. Repair changes downstream node states;
  source-cited verification is a separate final action.
- A review dialog and downloadable JSON case file with source metadata,
  evidence connections, defenses, attempts, verification, and event history.
- Scoped browser persistence, reload restoration, duplicate-request protection,
  a bounded history, stale-tab write detection, and explicit save-failure messages.
- A three-week roadmap clearly distinguishing this playable pilot from future
  curriculum phases.

## Files and architecture

Added `src/app/templates/time-repair/` with framework-independent models,
validation, registered capability action handlers, runtime/persistence adapters,
and three standalone Angular components (control room, investigation, scene).
Added a validated package runtime and lazy launcher at the composition boundary,
plus `public/projects/exploration-time-repair/project.json` and `harbor.png`.
The code-native `cargo.svg` / `cargo-restored.svg` overlays provide visible object
replacement without baking answer or interaction state into the scene backdrop.

Modified the template registry, launcher registry, project catalog, and their
relevant catalog/registry tests. Existing route and core runtime contracts are
unchanged. Added isolated test/build configurations and browser-check scripts
so work on unrelated templates cannot prevent verification of this capability.

Reuse: the shared RuntimeEvent envelope, EventRegistry, ProjectSessionContext,
ScopedBrowserStore, package-source/load contracts, template registry, catalog,
and project launcher are reused. Project-specific facts and repair choices live
in JSON. The same domain loop is exercised with an original literary
scene-sequence fixture using `restore-sequence`, alongside the historical
`replace-object` fixture. No AI provider or database vendor is imported.

The capability action handlers enforce evidence gates, prerequisites, inspection,
attempt limits and verification invariants. They emit registered `timeRepair.*`
events and derived UI state through the runtime service; the UI does not award
completion or spend resources directly. This adds a template capability rather
than a second general rule/branching engine.

## Local authority boundary and remaining work

`TEMPLATE_CAPABILITY_GAP: time-repair.classroom-authority`

Shared team sessions, transactional official charges, teacher review/overrides,
individual mastery, grades, official submissions, and final competition scores
need an authoritative adapter and classroom integration. The launcher rejects
`serverAuthoritative` sessions before loading local evaluation metadata. The
prototype package includes evaluation keys for local use; a production content
projection must retain those keys on the server.

`TEMPLATE_CAPABILITY_GAP: time-repair.reasoning-review`

Live AI defense is not connected. The checkpoint evaluates configured evidence
relationships and structured source conclusions, and checks that writing is
present. It does not infer the quality or truth of arbitrary prose. Written
reasoning is retained for review; no mastery is awarded automatically.

The remaining content phase includes the additional time-jump scenes, decoy
anomalies, richer manipulatives, a shared evidence board, teacher configuration
UI, and the timed final-collapse competition. JSON currently configures evidence,
scenes, thresholds, charges, penalties, prerequisites, and ripple relationships.
These limits are stated in the UI and are not hidden behind placeholder buttons.

Recommended next phase: review the first loop with students, then connect
classroom authority and reasoning review before adding the final competition.

## Validation

The package validator checks schema/template versions, required content,
duplicate IDs/orders, capability IDs, references, safe asset paths and source
URLs, forward ripple edges, prerequisite cycles, charge feasibility and stability
totals. Persistence replays bounded actions and compares the resulting state
before accepting a saved snapshot; a forged unlock alone is rejected.

Focused tests cover evidence gating, revision history, the complete loop,
idempotency, resource exhaustion, premature/repeated actions, literary reuse,
malformed packages, identity mismatch, persistence isolation/tampering/conflicts,
keyboard focus, the rendered student journey, and authoritative-session rejection.

Run the focused suite:

```powershell
npm test -- --watch=false --ts-config=tsconfig.time-repair.spec.json --include=src/app/templates/time-repair/**/*.spec.ts --include=src/app/projects/project-catalog.spec.ts --include=src/app/features/project-home/project-home.component.spec.ts
```

Build and serve the isolated preview:

```powershell
npm run build -- --browser=scripts/time-repair-preview.ts --ts-config=tsconfig.time-repair-preview.json --output-path=dist/time-repair-preview
node scripts/serve-time-repair-preview.mjs
```

Open `http://127.0.0.1:4202/projects/exploration-time-repair`. The isolated entry
uses the same components and domain implementation as the registered launcher.
Production entry remains the normal app and its project catalog.

`scripts/time-repair-browser-check.cjs` runs the browser journey with an installed
Playwright package (`PLAYWRIGHT_MODULE`) and optional Chromium executable
(`TIME_REPAIR_CHROMIUM`). It verifies desktop completion, export contents, reload,
mobile widths and browser errors; screenshots/results go to ignored
`tmp/time-repair-browser/`.

The architecture command reports two existing baseline violations, confirmed in
HEAD: `core/index.ts` exporting `./templates`, and the project-local
`projects/mystery-substance/lab-kit/render-quality.service.ts`. Neither was added
or edited here. Concurrent Heist edits initially blocked compilation, then the
full production build passed after those changes were corrected. Those unrelated
changes are preserved.

### Final verification — September 13, 2026

- **Full app production build passed**, with existing style-budget warnings in
  other templates. Time Repair adds no style-budget warning.
- **27 tests passed across five suites**, covering Time Repair, catalog/home and
  template registration. All new save-recovery regressions passed.
- An additional existing `project-host.component.spec.ts` suite could not start:
  Phaser initializes a canvas during module loading, but jsdom lacks `getContext`.
  This is recorded as an unresolved test-environment failure, not a passing suite.
- **Real-browser check against the full production app passed**: catalog entry,
  registered launcher, evidence/defense/repair/verification, visible cargo
  replacement, case-file download, reload restoration, mobile widths and no
  browser page errors. Desktop and mobile screenshots were visually inspected.
- The separate isolated production preview also builds successfully.
- Architecture check retains the two baseline violations listed above; the new
  template uses the documented dependency boundaries.

For the complete app preview after `npm run build`, run:

```powershell
node scripts/serve-time-repair-preview.mjs --app
```

The complete app is served at `http://127.0.0.1:4203/projects/exploration-time-repair`.
Set `TIME_REPAIR_PREVIEW_URL=http://127.0.0.1:4203` to run the browser-check script
against it. The final live preview uses this full-app route.

## Content provenance

Archive content is short adapted prose, not invented primary-source quotations:

- Smithsonian National Museum of the American Indian, [Food Diversification](https://americanindian.si.edu/nk360/inka-water/food-diversification/food).
- Smithsonian Libraries, [Celebrate the Potato](https://blog.library.si.edu/blog/2016/09/12/celebrate-the-potato/).
- Library of Congress, [Columbus and the Taíno](https://www.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino.html).

The 1565 trace is not asserted to be an exact first-arrival date. Indigenous
agricultural knowledge precedes the European encounter. Ripple descriptions
model interpretive consequences, not deterministic alternate-history predictions.
Scene dialogue and art are explicitly labeled reconstructions.

The scene art was created using the **built-in imagegen tool** and saved to
`public/projects/exploration-time-repair/harbor.png`. The final prompt was:

> Use case: historical-scene. Asset type: wide fixed-camera background for an educational time-repair investigation game. Create a richly atmospheric illustrated European Atlantic harbor market circa 1490, painterly premium adventure-game concept art, widescreen 16:9. A wooden sailing caravel is moored in the middle distance at left, late-medieval stone waterfront buildings in the distance right, warm morning sun across cool teal sea, foreground wooden dock with a simple market counter and closed cargo crates at right, a folded parchment and coiled rope at left foreground, a few small period-dressed merchants in the distance. Composition: readable, distinct inspection areas and generous clear central space; horizon in upper third. Natural historically plausible materials, sails and hand tools. No potatoes or maize shown; those will be separate interactive UI objects. No steam, engines, machinery, modern buildings, UI, text, labels, letters, logos or watermark. This is an imagined teaching illustration, not a primary historical source.

The source image remains at its generated-images location; the app references
only the copied workspace asset. Inspection coordinates and gameplay are
separate from the artwork.
