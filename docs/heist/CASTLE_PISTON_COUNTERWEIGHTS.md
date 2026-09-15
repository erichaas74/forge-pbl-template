# Castle balance lock: piston counterweights

The user's `C:\Users\erich\Downloads\balance_puzzle.html` contributes the labeled counterweight idea. The existing Three.js workshop contributes its shared housing, real geometry, materials, lighting, rope detail, and automatic bolt release. Each scale now has a single left weight pan and a piston hanging directly from the opposite beam end. The piston is the counterweight, with its target mass printed on the moving cylinder.

An empty or light pan lets the piston drop below the bolt. Adding mass lowers the pan and raises the piston. Excess mass raises the cutout above the bolt; removing mass lowers it. Exact equality aligns each cutout, and all three must align before the single bolt retracts. The short sliding clevis at the beam tip keeps the rope on the piston's vertical guide axis.

The reference is design input. Its independent numeric game, external styling dependency, and manual PULL button were not imported. The user's existing automatic-unlock requirement remains authoritative. The finite fraction, decimal, and mixed-number inventories across grades 5–8 remain in Castle's project package.

## Reusable capability and state

`TEMPLATE_CAPABILITY_GAP` (resolved): the two-pan balance capability did not model a fixed piston as the opposite arm's load. The optional typed `mechanism: "piston-counterweight"` setting adds that behavior without project-name checks. Omitted settings retain the existing two-pan behavior. Validation requires a fixed counterweight, an initially empty pan, and an inventory that can solve the puzzle using only the adjustable pan.

The configured legacy `left` load supplies the piston mass. Saved location 2 remains the adjustable pan, now drawn on the left. Location 1 additions from the former fixed-load pan return to the tray; the component explains this when such a save is loaded. New placement commands accept the weight pan or tray only. The exact rational evaluator, animated targets, visible equation, directional guidance, pointer placement, keyboard controls, preview trials, and assessed command validation use the same interpretation.

The preview persistence adapter accepts the specific two-pan-to-piston presentation upgrade. It still compares every load, inventory, tolerance, identifier, grade variant, and other machine. Revised balance hints and clues may accompany this upgrade. Different math or other machine changes continue to produce a state conflict. Existing snapshot contents are validated by the runtime; the next edit writes normalized locations and the current fingerprint. Trial history is preserved. No assessment completion or shared work is introduced into the weekly preview.

## Changed files

- `public/projects/castle-archive-rescue/project.json`: enables piston mode for the four balance pathways and updates the balance clue/hint.
- `balance-lock.domain.ts`: optional mode, exact reading orientation, allowed placements, legacy location normalization, and one-pan solvability validation.
- `balance-lock.3d-model.ts`: one pan per beam, direct piston suspension, sliding clevis, and mass plates.
- `balance-lock.3d-scene.ts`: one-pan hit testing and controls, correct placement labels, and piston feedback.
- `balance-lock.component.ts` / `.html`: accessible one-pan controls, piston instructions, and migration notice.
- `balance-lock.migration.ts`: targeted preview fingerprint compatibility.
- Castle's `expedition-preview.runtime.ts`, `expedition-preview.persistence.ts`, and `expedition-runtime.ts`: placement validation and saved-preview compatibility.
- Domain, component, 3D, migration, and weekly integration specifications cover the changed behavior.

The earlier files and the supplied reference are backed up in `output/castle-piston-baseline/`. Changes are confined to the Castle balance capability and its existing runtime integration. Other projects, the remaining Castle locks, dependencies, and global styles are untouched.

## Verification

The initial browser build passed, and a real drag onto the left pan raised the piston. The browser also exposed the old full-package fingerprint conflict; the targeted migration above resolves that compatibility issue.

- **35 test files / 221 tests passed** (`output/castle-piston-migration-tests.log`). Coverage includes direct rope-to-beam attachment, opposite pan/piston motion, exact balance, fixed-side command rejection, legacy placement normalization, actual adapter loading/saving across the fingerprint upgrade, and rejection of changed math or other machines.
- The architecture audit reports the same two unrelated violations in `core/index.ts` and `projects/mystery-substance/lab-kit/render-quality.service.ts`; no new Castle violation was reported (`output/castle-piston-architecture.log`).
- Scoped whitespace/diff checks passed. The final production build log is `output/castle-piston-final-build.log`.
- Final production build passed in 32.8 seconds. The refreshed browser restored the saved first-scale balance and trial history without a persistence warning. Adding an extra 1/8 lifted its piston above the bolt; returning that weight aligned it again. Balancing the remaining two pans produced **MASTER BOLT OPEN**, with all three level beams and piston cutouts visible in the same 3D casing.
- Verification additions were removed afterward, preserving the previously saved first-scale balance. The expanded first scale is left open. Remaining lock redesigns are in the brainstorming/confirmation phase, recorded in [Remaining lock concepts](CASTLE_REMAINING_LOCK_CONCEPTS.md).

Local preview: `http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=1`.

No publication or deployment was performed.
