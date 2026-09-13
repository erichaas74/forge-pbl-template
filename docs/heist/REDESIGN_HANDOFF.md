# Academic Heist redesign

**Current catalog activity: restoration project 2.0.0.** The [restoration implementation](RESTORATION_IMPLEMENTATION.md) delivers all 16 forged studies as editable commissions, a coastal story portal, evidence-backed repairs, a living ledger, before/after and exhibition downloads, and a five-mechanism final heist. The gallery implementation below documents the preserved 1.0.0/1.1.0 experiences. See the new implementation note for current files, tests and remaining limitations.

The flagship Heist is **The Cartographer’s Vault**, available at `/projects/shadow-gallery` and in the project catalog. This implements the supplied master document’s history-art-heist loop with applied math mechanisms. The existing Castle Archive Rescue and harbor practice packages continue to use their original planning, patrol, crisis, and replay engine.

Planned next experience: [Capstone game flow, detailed student questions and challenges](CAPSTONE_GAME_FLOW_PLAN.md). This design draft covers a two-session mission, evidence-based decisions, character exchanges, load/route consequences, an integrated final vault, extraction and debrief. Its features are proposals, not delivered behavior; the plan identifies the reusable capability gaps and implementation stages.

**Current activity goal:** [Restore each forged painting](FORGERY_RESTORATION_GAME_FLOW.md) through visible, source-supported edits. Students research, remove or replace incompatible objects, correct inscriptions, preserve justified details, and produce before/after reconstructions. This now supersedes passage selection in catalog version 2.0.0. The earlier two-session estimate must be revisited for the expanded restoration sequence.

The first [living-scene encounter](LIVING_SCENES_IMPLEMENTATION.md) is delivered in the coastal gallery: four viewpoints, seated story time with three synthetic museum narrations, five scripted questions, an inspectable canoe, and a source/claim comparison saved to the audit and dossier. The host is an explicitly fictional reconstruction. The [larger interaction plan](LIVING_SCENES_INTERACTION_PLAN.md) still includes future environments, contributor performances, animated events, and simulations.

## Delivered behavior

- Eight galleries, each with three spatially aligned paintings/passages: one authentic reconstruction and two factual frauds. Authentic positions vary across all three passages.
- Painting zoom, visible detail studies, inspectable hotspots, and source-linked field notes. Students inspect before choosing a passage. Visual variants include introduced horses, misplaced Andean/Caribbean settings, sextants, and marine timekeepers; other frauds concern the dated captions and national attributions.
- Four fraud categories. Both the category and the inspected offending detail must match; a related academic recovery lock must then be operated before returning to the junction. No permanent learning lockout.
- Eleven reusable physical shells: date cylinders, compass rotation, levers, chronological rails, plotted routes, exchange crates, community placement, technology drawers, evidence links, measured passages, and cargo loading. There are **33 configured locks: 17 passage/vault locks plus 16 optional fraud-recovery locks**.
- The calculation and the mechanism setting are independently checked. Actual settings appear in the environment and replay, including unsuccessful settings. An authenticated passage opens only after all required mechanisms have been operated.
- A cart-damage crisis applies a 25% capacity reduction and tests the selected load. More than one load is valid.
- A final composite authentication and four-part master vault, followed by collection recovery.
- Confirmed notebook facts, inspected details, source references, failed and successful attempts, route checkpoints, elapsed timestamps, final-vault status, and written defense. Downloadable Markdown dossier and JSON evidence export.
- Scoped local practice saves, deterministic restoration through validated commands, duplicate-event protection, corrupted-save recovery, save-failure warnings and export. Replay uses immutable decision snapshots without modifying the live practice.
- Keyboard alternatives for every required canvas/drag interaction, native dialog focus containment, visible focus, reduced motion, and responsive layouts. Phaser input is disabled while a dialog is open so clicks on a lock cannot activate a painting behind it.

## Files and contracts

Added:

- `src/app/templates/heist/gallery/domain/`: `gallery.models.ts`, `academic-locks.ts`, `gallery.validation.ts`, `gallery.engine.ts`, and domain/validation tests.
- `src/app/templates/heist/gallery/runtime/`: Angular runtime facade, `GalleryPersistence` adapter boundary, local adapter, and save/resume tests.
- `src/app/templates/heist/gallery/game/gallery-scene.ts`: lazy Phaser 4.2.1 scene driven by validated presentation snapshots.
- `src/app/templates/heist/gallery/ui/`: gallery workspace, academic-lock component, accessible templates/styles and component tests.
- `public/projects/shadow-gallery/`: versioned mission JSON and three generated raster assets.
- `scripts/check-heist-gallery.cjs`: disposable browser playthrough and screenshots, written to the workspace’s `../output/heist-gallery/`.
- `docs/heist/build-shadow-gallery.mjs`: reproducible content authoring source; run `node docs/heist/build-shadow-gallery.mjs` to rebuild the JSON package.
- `docs/heist/MASTER_HEIST_PROJECT_REDESIGN.md`: copy of the supplied design reference.
- `docs/heist/GALLERY_ART_PROMPTS.md`: exact built-in imagegen prompts and saved asset paths.

Modified:

- The Heist lazy launcher dispatches the optional `experience: "gallery"` package shape after validation; schema 1.0 castle packages retain their launch path. Launcher tests cover both and reject identity/authority mismatches.
- Project catalog, catalog tests and project-home tests add the new activity entry.

The original gallery package has schema `1.1`, template `heist@1.0`, and project version `1.0.0`. The current encounter-enabled catalog version is described under Verification below. Packages contain immutable content and lock definitions. Student work is stored separately. The exact package signature and tenant/class/project/version/actor/team/attempt scope protect local saves from accidental reuse.

Capability IDs are `heist.gallery`, `heist.academic-locks`, `heist.authentication`, and `heist.replay`. Lock evaluators resolve through the `lockEvaluators` registry. Unsupported lock types return `CAPABILITY_NOT_INSTALLED`; malformed references, impossible cargo, unreachable rooms, cycles and invalid control bounds are rejected before rendering. No core LMS schema or backend dependency was added.

The second-configuration test changes the mission identity, chamber path and curriculum without changing runtime code. Existing castle and harbor tests remain compatibility coverage. Domain rules remain independent of Angular and Phaser; the scene cannot award mastery or open a gate on its own.

## Verification

### First coastal living scene · 2026-09-13

The catalog selects project **1.1.0**, gallery schema **1.2**, at `public/projects/shadow-gallery/versions/1.1.0/project.json`. The original **1.0.0** package remains intact for its separate saved-practice scope. `heist.encounters` adds a typed, configuration-driven shared presenter and transition registry; core LMS schemas and authority rules are unchanged. See [the implementation note](LIVING_SCENES_IMPLEMENTATION.md) for files, contracts, source attribution, asset-generation prompt, compatibility, and remaining capabilities.

**Final verification: PASS, 2026-09-13.** The focused regression suite passed **115 tests across 23 files**; after separating visit exit from activity completion in event metadata, all **49 affected tests across 8 files** passed again. The final production build passed. The gallery stylesheet is 632 bytes above the 14 kB warning budget; existing unrelated style warnings also remain.

The final Chromium encounter check passed real audio playback/pause, follow-up prerequisites, keyboard lens input, incorrect/correct insight attempts, reload without autoplay, painting/audit return contexts, 390px phone fit, and sourced JSON/Markdown exports with no page errors. All eight audio tracks decoded successfully. Desktop/story-time/insight/phone screenshots were visually inspected. The separate full playthrough passed all eight galleries, seventeen passage mechanisms, fraud correction and recovery, the final vault, extraction, defense export, restoration, replay, and mobile fit. The local preview runs at `http://127.0.0.1:4300/projects/shadow-gallery` using `scripts/serve-heist-preview.cjs`.

The architecture check still reports its two existing violations in `core/index.ts` and the mystery-substance render-quality service; no encounter/gallery violation is reported. One `override` modifier was added to the parallel Castle Archive gear-lock scene to resolve its strict-TypeScript build error. That change does not alter its behavior. Touched tracked files pass `git diff --check`.

### Clue log and vault audit follow-up

The gallery now exposes **How clues work & vault audit** from the main view, with links from mechanisms, the notebook, and the dossier. The audit explains the inspection → comparison → passage choice → fraud analysis → recovery loop; shows the current gallery's four checkpoints and ordered passage mechanisms; and retains a running list in discovery order. Entries distinguish inspected/unverified claims, analysis needed, identified frauds awaiting repair, sealed frauds, and authenticated scenes. Only inspected detail text is included; fraud categories and explanations appear after successful analysis. A gallery can be cleared without visiting its optional fraud branches.

`domain/gallery-audit.ts` is a read-only projection of existing mission configuration and accepted runtime events. `ui/gallery-audit.component.*` renders it with semantic lists, current-step labels, reference notes and a resume action. The package, persistence signature, event schema and core contracts are unchanged. `GalleryEngine.dossier()` adds the backwards-compatible `clueLog` and `vaultAudit` export fields; Markdown exports include both. This extends the existing authentication/dossier presentation and adds no capability ID, validator requirement or project-specific runtime branch. Existing notebook, academic locks, persistence and replay are reused. Unsubmitted lock controls survive audit navigation within the current page session.

Added: `domain/gallery-audit.ts`, `domain/gallery-audit.spec.ts`, `ui/gallery-audit.component.ts/.html/.scss`, and [CLUE_AND_VAULT_AUDIT.md](CLUE_AND_VAULT_AUDIT.md). The reference document contains opening-room explanations, all 16 fraud solutions, the eight-gallery checklist and the four final-vault answers; it is an author reference, not a student discovery record.

Modified: `gallery.engine.ts` (additive export fields), `gallery.component.ts/.html/.scss` (audit navigation and exports), `gallery.component.spec.ts` (UI flow and draft retention), `scripts/check-heist-gallery.cjs` (browser audit, mobile fit, final step sequence and export assertions), and this handoff. Domain coverage checks unrevealed clues, incorrect analysis, pending recovery, separate passage locks, discovery order, restoration, all final mechanisms, extraction and changed configuration. No specification deviation or new `TEMPLATE_CAPABILITY_GAP` was introduced. The existing local-practice authority limitation below still applies. Next phase remains classroom playtesting, including missed optional fraud branches.

**Follow-up verification: PASS, 2026-09-13.** The focused Heist/launcher suite passed **95 tests across 16 files**. The final production build passed with existing unrelated stylesheet budget warnings. The updated Chromium playthrough passed all eight galleries, seventeen passage mechanisms, fraud analysis and recovery, the four final-vault audit states, JSON clue/audit export, restoration, replay, and 390px mobile overflow checks. The quick-jump control moved keyboard focus to the clue list. Desktop, phone, and final-vault audit screenshots were visually inspected; outputs are in `../output/heist-gallery/vault-audit-*.png`. Initial sandbox runs could not spawn esbuild; approved runs outside the sandbox completed successfully.

### Original verification baseline

The focused Angular suite passes **72 tests across 11 files**, including every fraud/recovery route, every required lock, full deterministic restoration, malformed content, duplicate events, session isolation, keyboard controls, dialog/canvas input isolation, notebook draft retention, and old/new launch compatibility. Catalog and project-home tests pass. The production build succeeds with the repository’s existing unrelated style-budget warnings.

The real-browser test uses an isolated production build, avoiding hot reloads from unrelated workspace edits:

```text
npm run build -- --output-path=../output/heist-review-build
npm test -- --watch=false --include=src/app/templates/heist/**/*.spec.ts --include=src/app/projects/project-catalog.spec.ts --include=src/app/features/project-home/project-home.component.spec.ts --include=src/app/runtime/project-launch/template-launchers/heist.launcher.spec.ts
node scripts/check-heist-gallery.cjs
```

The browser script accepts `PLAYWRIGHT_MODULE` for an already-installed Playwright package. It runs all eight galleries and seventeen main locks, corrects a fraud after an intentionally wrong classification and reload, downloads and checks the completed dossier/defense, scrubs replay, restores the completed practice, and checks a 390px mobile viewport. `HEIST_MOBILE_ONLY=1` runs the focused phone-layout/inspection check. No backend or user account is required.

**Final browser result: PASS** on 2026-09-12. The full production playthrough completes all eight galleries, recovery, extraction, defense export, replay and mobile overflow checks with no page errors. The separate mobile inspection test also passes. Screenshots and the test-generated completed dossier are in `../output/heist-gallery/`; these contain disposable QA work, not student submissions. The local development preview is `http://127.0.0.1:4300/projects/shadow-gallery`.

The repository-wide architecture script currently reports unrelated findings in `core/index.ts` (`./templates` export) and `projects/mystery-substance/lab-kit/render-quality.service.ts`; no Heist boundary violation is reported. The normal `git diff --check` on modified catalog/home files passes.

## Scope decisions and remaining capabilities

### First-lock usability follow-up · 2026-09-12

The exchange lock sorts every object into an origin destination; object selection order has no effect on its answer. Wheat and horse go in Old World; maize and potato go in Americas. The user confirmed the lock operated. Review also found that incomplete placements could be submitted and that opening the field notebook destroyed unsubmitted lock controls.

The matching shells now show each destination, an explicit placed count, the selected object's next action, and instructions for moving an object. Operating the mechanism requires every object to have a destination. Placement status does not indicate correctness; the existing domain evaluator still checks the complete answer. Notebook navigation retains draft controls for every shell in the current practice, including independent calculation and dial settings. Submitting a lock or starting a new practice clears the corresponding drafts. Drafts are local UI state; submitted attempts retain the existing persistence and replay behavior.

Files modified in this follow-up: `academic-lock.component.ts/.html/.scss`, `gallery.component.ts/.html`, `gallery.component.spec.ts`, `scripts/check-heist-gallery.cjs`, and this handoff. No files or domain contracts were added. Regression coverage uses actual object/destination buttons, incomplete selections, an incorrect destination followed by correction, notebook evidence reading, dial retention, and practice reset. `HEIST_FIRST_LOCK_ONLY=1` runs the focused browser path through sorting, notebook navigation, the compass, and the first open passage, including a phone viewport.

Follow-up verification passed: 72 tests across 11 files, production build, and the focused Chromium browser path with no page errors. Desktop and 390px phone screenshots were visually inspected; controls remain legible and fit the scrollable workspace. Screenshots are `../output/heist-gallery/sorting-lock-ready.png` and `sorting-lock-mobile.png`. Existing unrelated stylesheet budget warnings remain.

The visual implementation uses Angular HTML/CSS for crates, object controls, and levers; SVG for the compass, route, and ruler; and Phaser for the illustrated gallery, painting inspection targets, mechanism previews, and opening passage. Individual crate objects are labeled controls, not illustrated or animated sprites. No answer key, project package version, or saved-practice signature changed in this follow-up. No new specification deviation or `TEMPLATE_CAPABILITY_GAP` was introduced. Next step: continue classroom playtesting of the existing shells.

The supplied document is a multi-phase design reference. This build completes the eight-gallery local practice route with the priority lock shells and evidence output. It does not silently relabel unsupported advanced mechanisms as completed work.

- One reusable gallery scene and backdrop is used across the eight content chambers; paintings, source claims and mechanisms change. Separate circular rooms, pull-out racks, a dedicated cinematic master-vault art scene, and sound are further visual work.
- The master vault composes four ordinary lock definitions; it is not a second assessment engine. Map and evidence interactions use keyboard-accessible pins and placement controls instead of requiring freehand drag gestures.
- The existing castle continues to supply automatic route execution, patrol windows and tactical replay. These systems are not artificially added to the gallery’s spatial authentication loop.
- The wider catalog of equation, slope, graph, probability, transformation and optimization engines remains future reusable capability work. The new gallery does not claim to implement every grade 4–8 standard in the reference.
- **TEMPLATE_CAPABILITY_GAP:** official graded/shared attempts, authoritative mastery submissions, teacher overrides and multiplayer still require an authenticated server adapter. The launcher explicitly supports local practice only. No student grade is submitted by this implementation.

Recommended next phase: classroom playtesting and content review, followed by the authoritative assessment adapter and additional configurable math shells. Historical illustrations are reconstructions for evidence testing, not original period documents; each claim is tied to field notes instead of aesthetic judgment.
