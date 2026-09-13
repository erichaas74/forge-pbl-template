# Forgery restoration implementation

Delivered at `/projects/shadow-gallery` as project **2.0.0**, `experience: restoration`, schema **1.0**, template **heist@1.0**. This replaces passage selection as the catalog activity’s primary objective. The 1.0.0 gallery and 1.1.0 encounter packages retain their separate launch and save scopes.

## Student experience

All **16 forgeries** are restoration commissions. Each has a fixed place and time, one disputed detail, and one supported detail to preserve. The student inspects a numbered region, researches its original claim, changes or keeps the image layer, attaches a reference and relationship, and writes an explanation. The whole work must pass the configured evidence check before it counts toward recovery.

The first coastal commissions offer a conspicuous **Enter story portal** button. The existing four-view coastal encounter includes a fictional host, scripted questions, synthetic museum narration with full transcripts, and an inspectable canoe. Leaving the scene or reloading returns to the same painting and saved draft. Other commissions use the research desk; additional story environments are not represented as built.

The studio supports remove, replace, relabel, keep, undo, detail outlines, side-by-side comparison, and a live mobile preview. Choosing a repair actually changes the rendered painting. The originals remain available. Layered studies reuse the clean atlas backgrounds with newly composed objects and inscriptions; they are classroom reconstructions, not edited scans of surviving historical paintings.

The **living restoration ledger** records all 16 original claims, image decisions, references, relationships and written explanations. Students can revisit any painting, download a JSON ledger, download a painting’s before/after PNG, and download a standalone illustrated HTML exhibition containing 32 embedded images and the saved reasoning. The museum-label prompt asks students to explain a repair, a preserved detail, unresolved questions, and whose perspective they would seek next.

The final heist remains locked until all 16 works pass. Starting it seals the checked reconstructions. Students consult their ledger and references while completing five reused mechanisms in order: date cylinders, compass bearing, exchange sorting, treaty crown, and damaged-cart capacity. Successful extraction completes the local recovery record.

The automated check validates configured image choice + source + relationship and requires a nonempty substantive-length explanation. It **does not semantically grade writing**, verify a teacher’s approval, or establish official mastery. The UI and exports explicitly identify written responses as saved for teacher review.

## Files and architecture

Added shared capability files under `src/app/shared/restoration/`:

- `restoration.models.ts`, `restoration.engine.ts`, `restoration.validation.ts`: immutable contracts, action registry, evidence checks, and configuration validation.
- `painting-canvas.component.*`: atlas-backed image composition and keyboard-accessible region buttons.
- `restoration-editor.component.*`: reusable source-backed repair desk, controlled drafts, failure feedback, and before/after presentation.
- `restoration-export.ts`: browser canvas PNG composition and download helpers.
- `restoration.engine.spec.ts`, `restoration-editor.component.spec.ts`: pure and rendered interaction coverage, including a separate pond food-web configuration.

Added Heist composition files under `src/app/templates/heist/restoration/`:

- `restoration-collection.models.ts`, `.engine.ts`, `.validation.ts`, `.runtime.ts`: versioned collection contract, command registry, references and reachability validation, scoped adapter, runtime facade and dossier.
- `restoration-collection.component.*`: collection, studio, research/story dialogs, ledger and final recovery presentation.
- Engine and runtime specs cover all 16 works, gate ordering, deterministic command restoration, duplicate requests, encounter context, scope isolation, invalid saves and storage failures.

Added content and tooling:

- `public/projects/shadow-gallery/versions/2.0.0/project.json`: 16 commissions, 32 regions, old reference/encounter/lock library, five final lock IDs.
- `public/projects/shadow-gallery/restoration/*-v1.png`: four generated transparent object layers. See [exact prompts and asset record](RESTORATION_ART_PROMPTS.md).
- `docs/heist/build-restoration-collection.mjs`: reproduces the package from the immutable 1.1.0 library. Run from the repository root with `node docs/heist/build-restoration-collection.mjs`.
- `scripts/check-heist-restoration.cjs`: isolated production-build browser walkthrough, screenshots and export checks.
- `scripts/tsconfig.restoration-tests.json`: focused test compilation while unrelated workspace activities are being edited; it does not remove or weaken the normal test suite.
- `scripts/restoration-preview/`: isolated Angular bootstrap, HTML host and TypeScript configuration for the actual restoration renderer. Production routing still uses the Heist launcher. `scripts/serve-heist-preview.cjs` now accepts `HEIST_PREVIEW_ROOT` for this optional preview build.

Modified catalog and Heist lazy launcher to select and validate restoration version 2.0.0. Modified launcher tests to retain legacy gallery launch coverage and add restoration routing/identity checks. Added an optional `returnLabel` input to the shared encounter presenter; its existing default remains compatible. Updated restoration design/handoff documentation.

`heist.restoration` is a reusable capability composed by the Heist launcher. `restorationKinds` and `restorationActions` resolve shared behavior; `collectionActions` coordinates the collection. Curriculum names appear in content, authoring scripts and tests, not reusable runtime decisions. No core LMS contract, database vendor, AI provider or frontend framework changed. The existing academic-lock evaluator/presenter and encounter engine/presenter are reused.

The source gallery is an immutable reference library nested in this compatibility package. It deliberately retains its own schema/version. Unsupported required repair kinds, bad asset paths, out-of-bounds regions, invalid references, impossible answer mappings, unavailable encounters and final locks are rejected before mounting.

## Persistence and practical limits

The adapter key scopes tenant/class/project/version/actor/team/attempt. Changes are meaningful commands; pointer positions, animation frames and individual keystrokes are not persisted. Explanation drafts save on blur, explicit save, task navigation and checking. Invalid stored content is preserved and blocks mutation until a deliberate new practice; save failures retain in-memory work and offer export.

This local-practice composition follows the existing Gallery command-journal adapter and writes a current snapshot alongside the bounded history. **Specification deviation:** restoration currently revalidates its bounded command history on resume instead of hydrating a validated snapshot directly. The browser’s complete QA run required 161 commands. The journal is bounded at 2,400 commands; the next persistence phase should add validated snapshot hydration and journal compaction before longer or shared classroom deployments. No server-authoritative scoring is claimed.

`TEMPLATE_CAPABILITY_GAP`: official multi-student progress, teacher review/submission and authoritative recovery scoring require a production persistence/authority adapter. The launcher rejects official authority mode. This is the inherited local-practice boundary, not an implemented classroom grading workflow.

## Verification

- The integrated production Angular build passed before subsequent concurrent Castle edits, with existing unrelated stylesheet budget warnings. A later full rebuild was blocked by the Castle machine workshop’s missing scene/types and number-puzzle narrowing errors. The **final isolated restoration production build passed** without warnings, including the mobile live preview. This is the real restoration renderer and package, with a minimal bootstrap that excludes unrelated activities.
- Focused restoration, encounter and gallery suite: **61 tests across 11 files passed**, including renderer controls, source/relationship checks, undo, note preservation, missing-image handling, all 16 repair paths and all five recovery locks.
- Chromium production walkthrough passed the full 16-work / 32-region / five-lock sequence, wrong evidence feedback, visible removal and undo, portal return, reload, JSON export, before/after PNG export, and standalone exhibition with **32 embedded PNGs**. No page errors. Responsive overflow checked at 390px and 1440px; screenshots visually inspected.
- Art alpha channels were inspected and preserved; composed collection, portal, studio, before/after and recovery screenshots were visually inspected.
- The initial broad test attempt, including the launcher, was blocked by concurrent Castle machine-lock TypeScript errors outside this change. Focused compilation avoids those unrelated files without deleting tests.
- `npm run test:architecture` reports the two existing violations: `core/index.ts` imports `./templates`, and the Mystery Substance `render-quality.service.ts` resides in the project package boundary. This implementation does not add a reported boundary violation.

Verification artifacts are in `../output/heist-restoration/`, including `verification.json`, screenshots, the completed ledger and illustrated exhibition. The generated files contain synthetic QA explanations, not student work.

To reproduce the isolated preview build:

```powershell
npm run build -- --browser=scripts/restoration-preview/main.ts --ts-config=scripts/restoration-preview/tsconfig.json --index=scripts/restoration-preview/index.html --output-path=../output/heist-restoration-preview
$env:HEIST_PREVIEW_ROOT='C:/Users/erich/Desktop/pbl-lms/output/heist-restoration-preview/browser'
node scripts/serve-heist-preview.cjs
```

The current task’s preview is served on port **4310** at `http://127.0.0.1:4310/projects/shadow-gallery`.

Recommended next phase: classroom playtesting for pacing and readability; then source/contributor-reviewed story environments for the workshop, port and Andes, and the production teacher/persistence adapter. The separate food-web fixture checks configurability; deployment in a second substantially different project is still needed to prove cross-project reuse in practice.
