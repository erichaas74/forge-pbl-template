# Castle Rescue — interactive weekly workspace

Plan written before implementation, September 14, 2026. Scope: `castle-archive-rescue` only. Read the repository engineering rules, interactive-week direction/handoff, component contracts, testing requirements, and existing math-workshop handoff. The current package is the 4.0.0 Midnight Menagerie expedition (not the superseded guided route game).

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Open the courtyard | Three balance mechanisms with fraction/decimal weights | Align the lookout's timing wheels | Weight arrangements; tested patrol timing | Equivalent quantities; equality; first common period | Pan placements, equations, selected timing and trials | Weights, fixed loads, wheel periods/phases, hints, grade | Supplied weight tray and zero-step clock; no earlier rescue needed |
| 2 — Repair the clockwork | Build a complete fraction cog without overlaps | Assemble and run the compound fox-pen gear train | Fraction-sector arrangement; calibrated drive train | Fractions of a whole; tooth ratios; input/output turns | Sector coverage, overlaps, cog selection and crank trials | Fraction inventory, tooth counts, crank target, hints, grade | Supplied sector/cog inventories; no animal release required |
| 3 — Build the way out | Aim the moon-tower mirror relay | Position bridge rails, then select a tension cable | Mirror relay; bridge alignment and cable design | Reflection; coordinates; distance and scale | Mirror angles/ray path, rail positions, cable choice and trials | Mirror positions/steps, obstacles, coordinate target, cable route/scale, grade | Prepared light source and bridge machinery; both bridge stages immediately accessible |
| 4 — Launch the riverboat | Raise the sluice float with measured pours | Mix the boat's fuel in the correct quantities | Sluice combination; tested riverboat recipe | Unit conversion; capacity; proportions and total quantities | Pours, overflow/underfill, pump quantities and trials | Vessel amounts, float target, capacity, recipe proportions, supply and grade | Prepared tank, vessels and ingredients; final mixer works with no rescue progress |

Each week has one individual and one group-activity session, but all work remains local to the tester. Eight distinct existing locations cover nine mathematical machine kinds/stages. Grade 5 is the default; grades 6–8 remain manually accessible, with separate drafts. Proposed tutoring includes revision and transfer questions rather than response forms.

## Implementation boundary and ownership

- The Heist template also contains Shadow Gallery. Its restoration/gallery implementation is separate. This task owns new expedition weekly files, optional preview inputs on the three existing machine renderers, the Castle package, and the Castle lesson entry. A narrow escape-branch launcher insertion selects the new workspace; other launcher branches remain untouched.
- Existing uncommitted changes were recorded before work. In particular the expedition runtime/component, escape models/engine, workshop styles, launcher, shared host and catalogs already contain changes. Preserve them; do not reset or regenerate shared files.
- Add optional, validated `previewWeeks` to the escape package. Select the workspace only for an explicitly local preview session after the existing final-example branch. The original engine, saves, release rules and recorded example remain available unchanged.
- Reuse balance, gear and machine renderers, deterministic evaluators, reductions, animation and keyboard controls. Extend their preview presentation with repeatable tests and direct stage selection. No project-name checks in generic code, no core LMS contract changes, no AI or shared-state implementation.
- A scoped preview snapshot adapter retains drafts and bounded trials separately from the assessed rescue command history. Existing command history cannot represent unsealed arbitrary-stage edits; a typed preview snapshot is necessary to avoid fabricated successes or altered rescue rules. Persist meaningful edits/trials rather than animation frames.
- Native prepared inventories are the clearly labeled sample starting content. Seed only missing drafts. An emptied tray or drained tank is an intentional draft, not a reason to reseed.
- Desktop layout targets 70/30 with collapsible products and AI Tutor panels; small screens stack readable controls. Run meaningful focused tests, architecture checks, isolated production build and browser checks. Use port 4326 and `output/castle-week-*` artifacts. Do not deploy.

## Capability assessment

No new mathematical capability is required. The existing tools cover the planned progression. Optional authoring-preview presentation and snapshot persistence extend this template without changing the assessed lifecycle. Connected tutoring/model control, collaboration and standards approval are deferred, visibly disconnected features, not claimed capabilities.

## Delivery record

Implemented the four-week/eight-session sequence above. The optional package extension is `EscapeMission.previewWeeks`; schema 1.3 and curriculum package 4.0.0 remain compatible because the assessed puzzles and rescue lifecycle are unchanged. The separate Castle lesson plan is now 1.1.0. Validation checks four ordered weeks, two distinct referenced workshops per week, substantive planning lists, and supported renderers (including each configured grade variant).

Added under `src/app/templates/heist/escape/weekly/`:

- `expedition-preview.models.ts`: preview content, drafts, bounded trial records, starting equipment, and validation.
- `expedition-preview.persistence.ts`: local actor/attempt-scoped snapshot adapter, isolated from escape command history.
- `expedition-preview.runtime.ts`: grade/workshop drafts, exact machine evaluation, retained trials, reset/restore, and storage feedback.
- `expedition-week-workspace.component.ts`, `.html`, `.scss`: lesson binding, 70/30 workspace, all-workshop and grade selectors, proposed products, disconnected tutor planning, and collapsible panels.
- `preview-machine.scss`: embedded responsive presentation for existing fullscreen renderers.
- `expedition-week-workspace.component.spec.ts`: 16 meaningful preview/configuration/launch/compatibility tests.

Modified:

- `public/projects/castle-archive-rescue/project.json`: the four authored weekly plans, products, questions, evidence, model controls, and sample descriptions.
- Only the Castle entry of `src/app/projects/project-lesson-plans.json`: all eight titles, outputs, focus targets, and local-preview wording. The file was read immediately before the narrow entry replacement; other entries were preserved.
- `escape/domain/escape.models.ts` and `escape.validation.ts`: the optional typed and validated extension.
- `escape/runtime/escape-runtime.ts`: exclude authoring-only `previewWeeks` from the existing rescue save fingerprint so older saves remain readable.
- `balance-lock/balance-lock.component.ts/.html`, `gear-lock/gear-lock.component.ts/.html`, and `locks/machine-workshop.component.ts/.html`: optional embedded preview inputs, repeatable trials without rescue awards, direct machine-stage access, and compact test controls above the canvas. Existing default behavior remains covered by the legacy tests.
- Only the escape branch of `runtime/project-launch/template-launchers/heist.launcher.ts`: after the existing final-example check, select the weekly workspace for configured local preview sessions. The original expedition remains the student-mode/default experience.
- `docs/heist/build-math-workshops.py`: preserve the independently authored `previewWeeks` overlay when regenerating Castle's existing math puzzles.

No global styles, dependency/lock files, shared navigation, common host, other project configurations, or other template families were edited by this task. Pre-existing escape engine, navigation, expedition UI, example-route and stylesheet changes were retained. The initial working tree already contained those changes; they are not part of this delivery's implementation.

### Verification record

- Heist regression suite and launcher: **29 files, 192 tests passed**, including the 15 preview tests. Log: `output/castle-week-focused-tests-final.log`. This verifies eight session mappings, direct later/final entry, distinct grade drafts, deliberately empty drafts, retained/reloaded trial history, real balance/gear/machine actions, unsealed retries, direct cable-stage entry, bounded history, validation, error handling, and preview/assessed/final-example routing.
- After the browser-driven UI corrections and rescue-save compatibility fix, the final focused rerun passed **16/16 tests**. Log: `output/castle-week-final-compatibility-tests.log`. This includes the displayed workshop/grade selection, restoration of the cable stage, and reading a rescue saved before `previewWeeks` existed. The broader 192-test run above predates those final corrections.
- The final production build of the real Castle workspace, shared lesson navigation, native example, and adapter in a temporary verification harness **passed**. Log: `output/castle-week-release-build.log`; initial bundle 506.00 kB produces a warning against the 500 kB warning threshold and stays below the 1 MB blocking threshold. It includes the final source changes and reactive final-example navigation in the temporary host.
- The final **full application production build passed**, including the production launcher and every template: `output/castle-week-production-final-build.log` (29 seconds, 293.98 kB initial bundle). Existing component-style budget warnings remain. An earlier build failed on Mystery Substance's `reaction-bench.component.scss`, 69 bytes over its 24 kB blocking budget; that concurrent-project issue no longer blocks the final build. This task did not modify those files or budgets.
- Final architecture audit reported two existing violations: `core/index.ts` importing `./templates`, and Mystery Substance's `lab-kit/render-quality.service.ts` declaring a project service. No Castle violation was reported. Log: `output/castle-week-architecture-final.log`. These files were not edited by this task.
- Scoped `git diff --check` passed. A dry run of `build-math-workshops.py`, intercepting writes, confirmed that it preserves `previewWeeks` and regenerates unchanged assessed puzzle steps.
- Browser verified the integrated desktop Castle workspace at 1366 × 900 with the real balance canvas and approximately 70/30 columns, the native lesson links, proposed-products and disconnected-tutor panels. The first pass revealed that the test action was below the initial viewport, prompting the compact top control.
- In the isolated browser, opened the final directly with no progress, pumped **1 L blue + 1.5 L amber**, observed the exact **2.5 L** composition, ran the real Phaser mixer and observed its release animation. Navigation reached the fraction cog, gear train, and mirror workshop. A direct-entry dropdown mismatch was corrected and covered by the new assertion.
- After Windows memory pressure subsided, browser verification resumed against the final build. **All eight session links opened their intended activities**, including immediate access to both bridge stages. The direct-entry selector matches the rendered workshop.
- Final layouts were checked at **1366 × 900**, **820 × 1180**, and **390 × 844**. Desktop activity/planning widths measured 893.45/382.91 pixels (70/30). Tablet and phone reflowed with readable controls and no horizontal overflow. The primary test action is above the canvas. Both planning panels collapsed through keyboard Enter actions.
- Keyboard-operated mirror controls changed the real machine; two failed trials showed the equation and adjustment feedback. Switching sessions, reloading, and restoring a trial retained the **45°/90°** setup and both records. The previously edited **1 L/1.5 L** final mixer setup also survived navigation.
- The native final example opened directly, selected stop 8 (Sanctuary landing), paused, and replayed from stop 1. Its read-only illustration and unchanged-rescue-progress message remain intact. Browser error-log inspection returned no errors.
- After the full application build passed, the server was switched from the temporary harness to that complete production build. Browser verified the real shared host at Lesson 1, its Final example link, and navigation back to Lesson 8 with the retained mixer setup. Temporary viewport overrides were reset successfully.

### Preview and reproducibility

The working local preview is **http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=1**. It serves this task's successful **full production build**, with the real shared host, project catalog, Heist launcher, and final-example route. The earlier dev server at port 4326 and isolated harness server were stopped; only this task's loopback production preview remains running. This is local verification, not deployment.

Temporary task-owned artifacts are in `output/castle-week-*`, including the harness, isolated TypeScript test/application entry lists, build directories, logs, and `castle-week-server.py`. Do not confuse the temporary harness with a new project-specific application component; production routing uses the existing shared host and Heist launcher.

Rebuild and serve the delivered preview with:

```powershell
$env:NG_BUILD_MAX_WORKERS='1'
node node_modules/@angular/cli/bin/ng.js build --configuration production --output-path output/castle-week-production-build
python output/castle-week-server.py
```

Run all Heist regressions without compiling unrelated in-progress test entry files:

```powershell
node node_modules/@angular/cli/bin/ng.js test --watch=false --ts-config output/castle-week-tsconfig.json --include 'src/app/templates/heist/**/*.spec.ts' --include 'src/app/runtime/project-launch/template-launchers/heist.launcher.spec.ts'
```

### Limits and next step

No new mathematical `TEMPLATE_CAPABILITY_GAP`. Full tutor/model-control integration, assessed completion, authenticated shared work, and deployment remain deferred. The snapshot adapter stores at most 30 trials per workshop and grade; it preserves malformed saved data and allows temporary in-memory testing with an explicit warning. Recorded settings can be restored and run again; this is not a frame-by-frame replay archive.

The Castle implementation and browser/build acceptance checks are complete. The repository architecture audit still needs its two unrelated violations resolved by their owners. The next Castle phase is tutor-guided review and supported model-control integration after those capabilities are commissioned; this preview makes no mastery or collaboration claims.

### Balance mechanism follow-up

The user subsequently requested a rebuilt hanging three-pin lock based on their HTML reference, with automatic release when all three scales balance. See [the balance lock rebuild record](CASTLE_BALANCE_LOCK_REBUILD.md) for the implementation, preserved preview boundary, and current verification results.
