# Math workshops: castle release 4.0.0

The user authorized implementation of the seven supplied lock concepts and expanded the math range to grades 5–8. The two supplied Markdown documents were treated as design references. The earlier plan's fifth-grade-only and deferred-cable recommendations are superseded by that explicit request.

## Play and curriculum

Open `/projects/castle-archive-rescue`, choose a grade before starting, and walk to the current beacon. **Solve lock** opens an independent Phaser workshop. The map waits while students manipulate the mechanism. Returning preserves the position and current workshop settings. The initial spawn remains outside the locked entrance.

| Location | Mechanism | Grade progression |
| --- | --- | --- |
| Outer gate | Existing three-seal balance | Equivalent fractions, decimals and mixed numbers; larger rational quantities at higher levels |
| Lookout | Timing wheels | Two common periods → three periods → nonzero starting phases; first positive alignment |
| Rabbit courtyard | Fraction circle gear | Finite fraction sectors → compound twenty-fourths; exact whole, coverage and no overlaps |
| Fox pen | Existing compound gear train | Fractional tooth multipliers and one output turn → varied drives and two output turns |
| Owl tower | Mirror relay | Two reflections with 45° increments → 15° controls → three reflections around a baffle |
| Bridge, stage 1 | Coordinate rails | First-quadrant translation → signed coordinates → dilation/reflection/translation → linear-system intersection |
| Bridge, stage 2 | Cable tension | Decimal span sums → map scale → fractional map scale → Pythagorean distance |
| Sluice | Volume chamber | Litres/millilitres and finite pours → percent and fraction of capacity |
| Riverboat | Proportion mixer | Fractional recipe → two-part ratios → scaled quantities → three-part recipe |

There are eight rescue locations, nine machines, and twelve animals. Grade 5 is the default. The grade is saved and cannot change after the rescue starts. Start a new rescue to select another level. These are authored difficulty progressions, not a claim of complete standards coverage or formal adaptive assessment.

## Reusable implementation

`escape/locks/` contains the `machine-lock` capability with seven registered kinds: `fraction-gear`, `volume`, `timing-wheels`, `coordinate`, `reflection`, `mixing`, and `cable`.

- `machine.models.ts`: immutable definitions, grade type, answer state and meaningful inputs.
- `machine.rules.ts`: deterministic evaluation and bounded state reduction.
- `machine.geometry.ts`: coordinate transforms/intersections, scaled cable length and geometric ray reflection.
- `machine.validation.ts`: configuration bounds, stable inventory IDs and bounded solution searches. The witness helper is for authoring and tests; student UI does not request it.
- `machine-workshop.component.*`: independent scene host, instructions, keyboard alternatives, pause, reset, replay, hints and save feedback.
- `machine.scene.ts`, `machine-surface.ts`, `render-*.ts`: lazy Phaser rendering, interactive zones, drag feedback, liquid settling, physical machine states and the downstream pin/counterweight/grille sequence.

The painterly castle workshop backdrop is combined with Phaser brass sectors, glass tanks, liquid surfaces, calibrated wheels, mechanical rails, traced light and cable geometry. Angular handles the accessible shell and controls. No new graphics library or backend dependency was added.

Definitions contain one to three linked stages. Adding another machine family requires its model, rules, validator, renderer registration and tests. Project-specific numbers, instructions, materials and stage placement remain in the project package, not in reusable engine conditionals.

## Mathematical behavior

Fraction pieces occupy exact integer angular slots. Their area and tooth share correspond to their printed value. A sum of one with overlapping pieces still displays a mathematically correct equality, while physical coverage feedback identifies the jam. Duplicate fractions have distinct IDs.

Volume and mixture quantities are integer canonical units. Floats interpolate those quantities; passing a target during animation never awards success. Volume tests wait for settling. Excess remains accounted for in the catch-basin model. Mixtures require a positive exact proportional composition, capacity compliance, and the separately configured total. Color is visual feedback, not the answer evaluator.

Wheels share one student-controlled integer time. Zero is excluded; first-positive and any-positive alignment are distinct rules. Late common alignments are acknowledged as aligned, with feedback that the first opportunity was earlier. There is no reflex timer.

Coordinates use actual signed X/Y positions. Grade 8 derives the target from two linear equations. Mirrors reflect traced rays using the surface normal; walls and baffles stop the ray. Normals and measured incident/reflected angles support the geometry lesson. Receiver radius is a physical target size, not a tolerance that accepts an unrelated configuration.

Cables follow the configured route or diagonal. Short cables stop early; longer ones sag along a curve whose sampled arc length follows the selected length. Scale drawings display drawing-unit measurements separately from actual cable lengths. Equality uses a small numerical precision allowance, not a broad gameplay tolerance.

## State, compatibility and future multiplayer

Escape schema **1.3** adds optional `mathGrades`, per-step `gradePuzzles`, and the registered `machine-lock` puzzle. Schema 1.2, guided packages and prior escape fixtures remain supported. Published castle curriculum is version **4.0.0**, with the catalog matched to that version. The 3.3 package is preserved as `testing/castle-escape-v3.3.fixture.json`; this change does not migrate previous rescue progress into different problems.

`select-grade` and `checkpoint` use the existing command envelope and persistence adapter. Checkpoints contain placements/settings and a validated prefix of sealed stages. Sealed-stage math cannot be rewritten by a later checkpoint. Reloading restores intermediate bridge progress. A saved final seal can finish its pending submit on remount. Submission remains the engine's responsibility; replay does not submit another award.

Scene animation frames, pointer positions, fluid interpolation and particles are presentation state. They are not persisted or networked. Existing actor-scoped persistence, command IDs and player collection provide extension boundaries for later authenticated co-op. Room codes, online sessions and shared authority are intentionally outside the requested build.

## Authoring and checks

`python docs/heist/build-math-workshops.py` reproducibly writes the grade variants from the preserved 3.3 baseline. The Angular catalog's version must match the resulting package. All seven mathematical families have positive and negative tests; all four grades have complete rescue/replay tests. Workshop component tests cover keyboard alternatives, shared drag commands, settling, pause, stage seals, replay, fallback controls and teardown.

Browser visual inspection is a separate check from the component tests, which replace the Phaser mounting function with a test double.

## Verification — September 13, 2026

- Final production build passed: `npm run build -- --output-path ../output/animal-rescue-build`. Existing stylesheet budget warnings in other experiences remain.
- Final focused workshop run passed **50 tests in 3 files**. This includes all 28 grade/family combinations, negative mathematical cases, complete rescue/replay at all four grades, saved bridge progress and independent component controls.
- The broader heist regression run passed **163 tests in 26 files**. Its additional workshop component file initially required the same Phaser mock used by the existing scene tests; after that correction its nine tests passed in the focused run above. There are **172 passing tests across the combined runs**, not 213 (the focused run overlaps the regression run).
- All referenced project assets exist. The package is 4.0.0, schema 1.3, and the Angular catalog matches. Whitespace checks passed for the changed escape files.
- Architecture audit still reports the two pre-existing violations: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts`. This work did not add another reported violation.
- Visual desktop/mobile playtesting remains **unverified**. Both available browser JavaScript tool entry points failed before startup with `failed to write kernel assets: The system cannot find the path specified (os error 3)`, including after reset. Do not treat the component tests as screenshot or drag/touch playtest coverage.

Local production preview: `http://127.0.0.1:4219/projects/castle-archive-rescue`. The loopback-only helper is `../output/rescue-preview.py`; no deployment was performed.
