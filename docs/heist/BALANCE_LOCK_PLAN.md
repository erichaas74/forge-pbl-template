# Balance Lock: plan and reusable contract

## Experience

The outside entrance opens a dedicated Phaser chamber, replacing the map while solving. Three connected seals use fractions, decimals and mixed numbers. The owl mechanism reuses the same component with a different material and target. Drag finite pieces between tray and both pans; fixed pieces cannot move. Keyboard/tap selection exposes identical commands. A tilted scale provides directional feedback, never an incorrect-answer banner. Exact equilibrium aligns a pin, engages chains, and releases the vault after every seal is balanced.

## Implementation order

1. Pure exact rational arithmetic, finite-piece placements and configuration validation.
2. Additive `balance-lock` puzzle evaluator and draft commands through the existing expedition runtime and save adapter.
3. Standalone Angular focus workspace hosting a dedicated Phaser scene: painted chamber, dimensional material blocks, suspended pans, damped beam, mechanical release and reduced-motion behavior.
4. Configure the entrance and owl rescue; preserve earlier fixture compatibility and version saves.
5. Exercise fractions, decimal equivalence, multiple scales, invalid/duplicate placements, reset/restore and accessible controls; production build and browser playthrough.

## Contract and limits

`BalanceLockDefinition` supplies local backdrop, skin, exact rational tolerance, and one to three scales. Each scale defines fixed left/right loads, individually identified available pieces and display notation. Each piece has one location: tray (0), left (1), right (2). Flattened placement arrays are bounded serializable answer payloads. Values are positive rational quantities; visible block face area is proportional to value within each scale. Decorative labels never determine correctness. Rational comparisons use BigInt cross-products, with zero tolerance for these fraction lessons.

Whole numbers, fractions, decimals, mixed numbers and calibrated numeric area/volume quantities share the engine. Symbolic algebra transformations, signed-force models, and ratio constraints need explicit additional rule modes; they must not be simulated by assigning arbitrary weights to unknown variables. No expression eval, networking or room service is introduced. A future authoritative adapter can consume the same placement answer; rendering never awards mission progress.

## Art

Built-in imagegen produced `public/projects/castle-archive-rescue/art/v3/balance-chamber.png`. Prompt: a polished landscape 2.5D moonlit castle vault workshop, aged brass machinery in deep teal stone, amber lamps, a large closed round bronze vault door centered on the back wall, broad empty walnut workbench in the foreground, clear central space for a separate animated scale, rich tactile materials and atmospheric light; no scale, blocks, characters, text, numbers, logos or UI.

Built-in imagegen also produced `public/projects/castle-archive-rescue/art/v3/balance-blocks.png`: transparent three-cell horizontal atlas of matching rectangular weight blocks, brass ingot / carved blue-gray stone / teal laboratory mass; frontal blank numeric faces, narrow top and side bevels, painted tactile detail, consistent silhouette, no text or numbers. Both images are stored in the project. The optional atlas uses three equal cells with a standardized inner content crop; the procedural material renderer remains available to other configurations.

An unrelated compile error in `exhibit-draft-validation.ts` was repaired by capturing the already-validated object array before a callback, preserving TypeScript narrowing and existing validation behavior.

## Verification and handoff

Production Angular build passed. All 104 scoped tests passed across 19 files, covering heist compatibility, rational arithmetic, alternate solutions, finite-piece validation, multiple scales, runtime proximity, released-answer restore/reset, input controls, and the exhibit validation narrowing fix. Test concurrency was limited to two workers using `output/balance-vitest.config.mjs` to avoid resource-contention timeouts.

Browser playtest: entered the chamber from Solve lock; dragged 1/2 and 1/8 to the right pan and confirmed the seal remained closed; returned the eighth to the tray and substituted 1/4; released the fraction, decimal, and mixed-number seals; observed the vault opening; returned to the map and walked to the watchtower mechanism. Pause exposed an inert modal over the chamber. The compact viewport check motivated a closer 1000-unit camera frame and automatically visible tap controls.

Architecture audit still reports the two pre-existing violations (`core/index.ts` importing `./templates`, and the mystery-substance render-quality service inside project content). No new architecture violation was introduced. No backend or multiplayer capability was installed. Symbolic transformation rules are the next separate math-mode extension; this implementation supports positive rational mass construction.

The final phone playtest at 390 x 844 confirmed a 390-pixel document with no horizontal overflow, automatically visible controls, and a successful half-weight drag onto the right pan. The viewport was restored to 1920 x 911, and the preview was left at a fresh unsolved entrance lock. Final visual refinement magnifies small imbalances and waits for beam alignment before animating the pin and vault leaves.

## Change inventory

Added: `escape/balance-lock/` contains the pure domain model/validator, Phaser scene, Angular component/template/styles, and two test suites. Added the two PNG art assets and this plan. Updated the Castle package/catalog to 3.2.0, the escape puzzle model/evaluator/validator and answer bounds, expedition placement input/runtime/restore, expedition presentation and compatibility UI, runtime/component tests, and the heist handoff/build-plan documents. The legacy balance and prior guided/escape fixtures remain supported. Changes outside heist and its catalog are the two-line exhibit validation narrowing repair and a newly encountered exhibit-room test fixture update that replaces a readonly-property assignment with an immutable copy. No core contract or backend service was replaced.

Final focused verification after the camera/layout refinements: 20 tests passed across five files (balance domain/component, expedition runtime/presentation, and the exhibit-room regression suite). The unrelated exhibit fixture now flushes the runtime's debounced save on destruction before modifying the recovered immutable snapshot; all eight tests in that file pass.
