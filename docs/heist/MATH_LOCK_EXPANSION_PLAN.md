# Physical math locks: original integration plan

**Implemented in castle 4.0.0.** The final grades 5-8 scope, capability names and verification are documented in [MATH_WORKSHOPS_HANDOFF.md](MATH_WORKSHOPS_HANDOFF.md). The proposal below is retained as the pre-implementation design record.

Status: implementation authorized September 13, 2026. After reviewing the plan, the user explicitly requested all seven locks with math levels for grades 5 through 8.

Implementation steering: all seven mechanisms will be available in the castle. The bridge will have coordinate and cable stages in one focused workshop. Grade 5 cables use measured length/composed spans, progressing to Pythagorean distance for grade 8. Students select their math level before starting; the selected level is saved with the rescue. The proposal below records the original plan; this paragraph supersedes its fifth-grade-only and advanced-package deferrals.

## Request and source material

The user asked to review these documents and plan their implementation into the existing game:

- `C:/Users/erich/Downloads/HEIST_MATH_LOCKS_VOLUME_COORDINATE_PROPORTION.md`
- `C:/Users/erich/Downloads/HEIST_MATH_LOCKS_LASER_CABLE_LCM_FRACTION_GEAR.md`

Their imperative language is design input, not an instruction to implement every feature now. This plan preserves the user's existing constraints: fifth-grade castle rescue, independent focused Phaser scenes, strong graphics, mathematical manipulation, and single-player with room for later multiplayer. No networking, deployment, or game-code changes are part of this planning turn.

## Recommended direction

Build a family of independent machine workshops around the working balance and compound-gear scenes. Each lock must have its own mathematical model; share the workshop shell, exact arithmetic, interaction conventions, and release effects. Keep the eight-location castle structure and replace the remaining simple controls gradually. Reserve Pythagorean cables and algebraic rail intersections for an advanced package.

The student loop remains: walk to a mechanism -> Solve lock -> enter its full-screen workshop -> manipulate the machine -> inspect physical feedback -> engage a mathematically valid mechanism -> watch its release -> return to the same map. The player begins outside the locked entrance. Success opens only the configured passage or animal pen.

## What exists today

| Existing code | Reuse | Actual limit to address |
| --- | --- | --- |
| `escape/balance-lock/` | Exact rational calculations, finite piece inventory, selection/drop commands, full-screen workshop, keyboard controls, material skins | Arithmetic helpers are private to the balance domain. Current rules represent positive masses, not arbitrary symbolic equations or ratios. |
| `escape/gear-lock/` | True compound gearing, proportional cog radii, tooth textures, independent scene, test/replay lifecycle | This repairs two complete cogs. It cannot assemble fraction sectors. |
| `gear-release.scene.ts` and `releaseFrame` | Paced motion, ball, hammer, weight, domino and gate beats | The renderer has fixed anchors; validation accepts one exact six-module order. It is not yet a general contraption composer. |
| `escape-puzzles.ts` | Registered pure evaluators | Validation, input handling and presentation still contain per-type branches. Seven additions warrant a small lock registry. |
| `ExpeditionRuntime` and `EscapeEngine` | Proximity checks, sequential objectives, command IDs, solved/released state, map navigation | `EscapeAnswer` is a number, numeric string or integer array. New structured drafts should not be squeezed into opaque arrays. |
| `LocalEscapeAdapter` | Session/version-scoped history and exact package fingerprint | It saves commands, not arbitrary workshop checkpoints. Unsubmitted drafts and balance seal progress do not generally survive reload. |
| Expedition Angular shell | Pause, sound, reduced motion, map visibility, focus handling | Balance and gear hosts are separately wired. Extract common hosting gradually; retain specialized accessible controls. |

The preceding gear work passed the 115-test heist suite and a later 12-test focused run, with desktop entry, drag, failed trial and successful release observed. Its last source-only resize adjustment still needs a fresh build/browser check; mobile and replay/pause visual verification remain phase-zero work. Those checks are not claimed complete by this plan.

## Proposed castle sequence

This is the eventual content map, not a change to the current package. Existing step IDs, animal releases and navigable locations can remain stable within the new version.

| Location / step | Proposed mechanism | Fifth-grade task and physical payoff |
| --- | --- | --- |
| Outer gate / `census` | Existing balance lock | Keep fraction, decimal and mixed-number seals. Equal mass opens the entrance. |
| Watchtower / `lookout` | Timing wheels | Find the first positive alignment of 4- and 6-step wheels. Set a 12-step crank run; the rod passes through their openings and secures the passage. Present through repeated multiples, with LCM terminology as a lesson setting. |
| Rabbit courtyard / `rabbits` | Fraction circle gear | Rebuild a whole wheel using unlike denominators and limited pieces. The joined wheel drives the rabbit-pen latch. This replaces the current 6 x 2 feeder question. |
| Fox den / `foxes` | Existing compound gear lock | Keep fractional tooth-count clues and crank calculation. The repaired train triggers the fox-gate machine. |
| Owl tower / `owls` | Light reflection | Redirect moonlight with two marked mirrors to the owl-door receiver. Begin with measured quarter-turn/45-degree relationships; label mirror rotation separately from beam deflection. |
| Bridge / `bridge` | Coordinate rail | Use a first-quadrant maintenance chart: from (2,1), move four columns east and three rows north. Position the head at (6,4), seat the pin, and lower the bridge. |
| Waterworks / `water` | Volume chamber | Construct 2.5 L from finite containers carrying fractions, decimals and mL labels. A float aligns with the latch and powers the waterwheel. |
| Boathouse / `boat` | Mixture sensor | Make pump coolant with 2/5 amber and 3/5 blue, with a required 2.5 L total. The correct composition and quantity power the escape-boat lift. Formal ratio notation is an optional later presentation. |

Keep the existing boat-capacity question as a reusable alternative package activity. Do not quietly add a ninth required challenge. The Pythagorean cable can replace the bridge activity in an advanced version, or become a later linked workshop; it should not be a required fifth-grade gate.

## Seven capability designs

### 1. Fraction circle gear — `fraction-gear-lock`

Start here: it makes strong use of existing art and arithmetic while introducing a substantially different interaction.

Students drag physical sectors onto an assembly ring, rotate them with a handle or keyboard increments, and snap them onto angular marks. Example inventory: 1/2, 1/3, 1/4, 1/4, 1/6, 1/8. Both 1/2 + 1/4 + 1/4 and 1/2 + 1/3 + 1/6 work. An optional challenge asks for another decomposition after success without blocking rescue progression.

Each sector's angle is exactly `360 * value`. Derive an integer angular lattice from the denominators: these examples fit a 24-slot ring. Outer tooth count must be a compatible multiple so sector joins produce a continuous tooth pattern. Use stable IDs for duplicate pieces.

Accept only exact total one, complete ring coverage and no overlapping intervals. A total of one with overlapping placements is not complete. Missing area leaves a visible gap; an overlap lifts the unseated sector above its neighbors. On success, clamps bridge the seams, the wheel seats on its axle, and adjacent cogs engage.

Configuration: target whole, individually identified fractions, allowed rotations, compatible tooth count, skin, release connection. Initial scope: one wheel, rational positive sectors, finite inventory. Mixed-number assemblies require multiple rings later. Broken-tooth decoys should wait until their rule is explicitly taught; do not make correct fraction reasoning fail on a hidden cosmetic property.

### 2. Volume chamber — `volume-lock`

Drag a measured vessel to an inlet, tilt/pour it, and watch the stream, fill level and float move continuously. Keyboard selection plus Pour must perform the same action. Initial pours transfer one complete fixed measure; no speed or reflex accuracy is required.

Store exact quantities in a canonical unit with authored unit labels and conversions. For example, 1 L, 3/4 L, 0.5 L and 250 mL can construct 2.5 L; add plausible decoys and explicitly configure how many of each vessel are available. Refillable and single-use containers are different modes, not an implicit infinite supply.

The evaluator checks conserved transferred quantity, capacity, available uses and exact target. Animation interpolates between exact states; displayed fluid height never decides correctness. Underfill leaves the float short. Overfill moves it beyond the notch into a catch basin; it must not briefly award success while passing the target during a larger pour. Test only after transfer settles. A drain resets the attempt and its authored inventory consistently.

Configuration: capacity, target, unit system, containers/uses, fixed-measure interaction, overflow policy, trigger and material skin. First release: water, full pours, drain-and-retry. Later: partial transfer, vessel-to-vessel pouring, percent-of-capacity lessons, and alternative materials. Visible level must follow volume/geometry; equal-mass coins or sand are not automatically interchangeable with liters.

### 3. Timing wheels — `timing-wheel-lock`

Render two offset wheels with visible openings along a shared rod channel, timing markings and one common crank. A scrubber or step control changes one shared integer step count. Students can examine cycles slowly, then wind the selected count and test the rod. There is no requirement to click during a small real-time window.

For periods 4 and 6 starting at their marks, the first positive alignment is 12. The initial alignment at zero is excluded. Twenty-four also aligns physically, so an earliest-cycle task needs a physical first-cycle stop/available run range and explicit instructions; the evaluator should not call visible alignment a collision. Separate `first-positive` and `any-alignment` goal modes.

Use integer modular arithmetic. With offsets, solve simultaneous phase conditions and check reachability; this is not always ordinary LCM. Defer arbitrary offsets until that validator and teaching mode exist. A blocked rod stops at the first obstructing wheel and retracts. On success it clears every opening, releases a weight and completes the passage mechanism.

Configuration: periods, initial phases, notch positions, step bounds, goal mode, rod geometry, skin. First release: two wheels, zero offsets, manual and predetermined runs. Later: three/four wheels and compatible nonzero phases. Do not reuse the current patrol evaluator, which only checks a latest departure in a safe interval.

### 4. Coordinate rail — `coordinate-rail-lock`

Build a brass drafting table with evenly spaced axes, a moving X carriage, a Y carriage and a descending pin. Drag handles snap to grid units; arrow buttons operate each axis independently. Use multiple identical possible sockets plus clues so a glowing destination does not supply the answer.

First release: first-quadrant ordered pairs and translation instructions. Keep mathematical Y increasing upward even though canvas Y increases downward. Store coordinate values independently of viewport pixels and derive the carriage position from the grid transform. Accept the authored coordinate exactly at the configured grid resolution. A misplaced pin visibly lands beside the intended receiver; snap assistance should help operating the handle, not select the correct answer.

Configuration: bounds, origin, grid step, labels, starting head position, clue/goal, obstacles if needed, skin. Later modes: negative coordinates, transformations, then line configuration and intersections. Parallel/coincident rails, vertical lines, off-board intersections and unsolvable targets need explicit validation. Slope, systems, midpoint and Pythagorean extensions are advanced variants, not features implied by the first-quadrant implementation.

### 5. Laser/light reflection — `reflection-lock`

Use an illuminated emitter, two visually distinct mounted mirrors, obstacles and a receiver. Angle rings and handles stay legible over a painted tower interior. Dragging rotates a mirror; fine/coarse angle buttons provide touch and keyboard alternatives. The beam updates from the actual mirror geometry, with a bright contact point and a restrained glow.

Implement a pure bounded ray tracer using closest positive ray/segment intersections and reflection `r = d - 2(d dot n)n`. Compute incidence/reflection relative to the surface normal. A mirror rotating 45 degrees does not generally rotate the outgoing ray only 45 degrees. Keep those two readouts distinct.

Acceptance comes from the final receiver being hit along a valid path, with blockers and bounce limits respected. Choose receiver geometry and discrete angle increments that give a reliable reachable solution. Prevent self-intersection loops with a small numerical offset; separate that numerical tolerance from gameplay target size. Cosmetic charging can last briefly after a settled valid setting, but must not introduce a reflex requirement.

Configuration: emitter, mirror segments/pivots and angle steps, blockers, required receiver, bounce limit, measurement aids, skin. First release: static geometry, one beam, two mirrors. Later: extra mirrors, false receivers, timed shutters and split beams. Receiver -> relay -> magnet releases ball -> owl gate.

### 6. Proportion mixing — `mixing-lock`

Keep this evaluator separate from total volume. Share reservoirs, exact quantities, pour effects and a vessel renderer with the volume lock. Use two labeled ingredients with patterns/icons as well as color. A stirrer combines the contents; a separate sensor reads composition.

Ratio-only mode accepts any positive equivalent mixture within capacity and supply limits: 2:3 and 4:6 work; 0:0 does not. A quantity-constrained mode checks both ratio and total independently. The fifth-grade boathouse example uses fraction language: 2/5 amber and 3/5 blue of 2.5 L, so 1 L and 1.5 L. A ratio sensor may pass while a separate operating-level gauge remains low.

Compare exact cross-products, not rendered RGB values. Show which component dominates and how to correct the mixture through dispensing; over-capacity requires draining/resetting. The display is a calibrated fictional composition sensor. Do not imply that all real liquids have linearly mixed density, color or chemical behavior.

Configuration: two ingredient IDs, measures and finite supply, target parts, optional total, capacity, sensor presentation, skin. First release: fixed measures and a composition gauge. Later: three/four ingredients, percent concentration, unit-rate recipes and continuous metering. Success sends the sample through a sensor tube, opens the outlet and extends the lift piston.

### 7. Pythagorean cable — `cable-lock`

Plan and register this as an advanced capability after coordinate rails. Students identify horizontal/vertical spans, then drag a cable between two anchors. Use marked cable reels with visible, consistent length differences. A 6-by-8 span needs a 10-unit cable.

For exact rational lengths, compare squared quantities: `length^2 = dx^2 + dy^2`. First release should use authored Pythagorean triples. Square-root/rounded answers require an explicit measurement precision policy later. A short cable extends along the intended route but cannot reach; a long cable attaches with visible slack. Calculate sag from available length rather than arbitrarily stretching the cable to fit.

A taut line alone does not supply force. Include a calibrated spring-loaded take-up carriage so matching cable length transfers a known pulling motion to the latch. The game illustrates a mechanism, not a full rope/materials simulator. Correct tension pulls a lever, releases a weight and raises the advanced bridge.

Configuration: anchors, units/scale, measured legs or coordinate clues, cable inventory, preload/visual tension model, measurement tolerance, skin. Defer cutting, splicing, obstacles, multiple cables and realistic elasticity.

## Shared implementation work

### Workshop host and capability registration

Add a small `escape/locks/` boundary rather than seven more component branches. Register each capability's definition validator, initial state, typed input reducer, answer validator/evaluator, checkpoint codec and lazy workshop loader. The generic host handles heading, focus, pause, map visibility, loading/error, help, reduced motion and return actions. Each lock owns its specialized Phaser scene and non-drag controls.

Adapt balance and compound gear incrementally. Preserve their existing public configurations and saved answers. Unknown required types must continue to show a capability error rather than falling back to a number input. Heavy Phaser assets load when entering the relevant workshop; only the active workshop advances, and closing it releases textures/listeners/observers.

### Domain and answer contracts

Extract exact rational operations into a small framework-independent `escape/math/` module when the fraction gear creates the second arithmetic consumer. Keep BigInt internal and serialize numerator/denominator pairs. Validate finite values, safe bounds, reduced denominators and explicit units.

Retain legacy answer shapes and add a discriminated answer family for new locks. Examples: fraction piece IDs plus slot offsets; container pour counts; shared timing step; rail coordinate pair; mirror angle steps; ingredient totals; selected cable ID. Use typed mapped contracts, not arbitrary dictionaries or untyped evaluator code. Move raw-answer shape checks out of the current generic integer-array guard into each registered capability.

Each solver returns exact academic success plus diagnostic measurements. The Phaser scene draws from those measurements and emits intents. It cannot release animals itself. Pure evaluation can later run behind an authoritative server adapter; no multiplayer service is built now.

### Release modules and completion

Extract a release runner only when the timing/fraction scene needs the existing gear effects. Give modules named attachment points and explicit input/output connections: rotating axle, released ball, pulled cord, opened valve, electrical relay. Begin with short validated linear chains, not a general node editor. Separate mathematical state from the decorative run timeline.

Standardize successful-test handling across balance, gear and new locks: validate and record success once, play the release while progression controls are held, then enable Return; Skip reaches the same terminal scene. Reload can reconstruct a solved tableau without replaying rewards. Pause freezes mechanics; reduced motion gives an ordered captioned explanation. Save retries must retry persistence rather than resubmitting an already-solved answer.

### Checkpoints and compatibility

Introduce a versioned optional checkpoint store alongside existing command history. Save a bounded validated snapshot after a completed manipulation, settled pour, seal or stage; coalesce writes and flush on workshop exit. Never save animation frames or partially interpolated quantities. Restore inventory conservation and settled state, with an explicit recovery error for incompatible data.

Preserve schema 1.2 readers and fixtures. A new minor escape-package schema is appropriate when typed lock sequences/checkpoint-related declarations are introduced; define its exact fields and compatibility tests in phase one rather than silently changing the current schema meaning. Publish curriculum changes under a new project version and retain earlier fixture behavior. The current fingerprint guard is not a save migration system: retention/migration of previous published packages must be explicit before classroom rollout.

### Connecting multiple academic locks

Do not count a decorative chain reaction as several solved math activities. Initially use one academic lock per existing map step. Later add a `lock-sequence` container with ordered, independently validated stage definitions and checkpoints. A scene transition then follows a solved stage: mixing -> volume -> coordinate, or fraction gear -> timing -> advanced cable -> reflection. Animals/paths release only at the configured final stage. Revisiting or replaying a stage cannot repeat a reward.

## Build order and exit criteria

| Phase | Deliverable | Exit condition |
| --- | --- | --- |
| 0 | Finish existing gear verification | Rebuild the pending resize adjustment; test controls expanding/collapsing, phone layout, pause, replay, reload and return to map. Preserve the balance entrance. |
| 1 | Shared host, registration and typed checkpoints; fraction gear vertical slice | One polished reusable sector workshop, exact alternate solutions, overlap handling, keyboard parity and reload. Existing balance/gear and legacy fixtures pass. |
| 2 | Volume and timing wheels | Measured pours conserve volume; overflow never awards a crossing of the target; rod alignment obeys modular arithmetic; first-positive behavior is physically honest. |
| 3 | Coordinate rail and reflection | Correct mathematical-to-canvas coordinates at every viewport; reachable mirror geometry; no answer revealed by auto-snapping; beam never passes blockers. |
| 4 | Mixing and castle content update | Composition and quantity checked independently; all eight objectives playable with twelve animals released exactly once. New curriculum version and answer key. |
| 5 | Advanced cable and linked workshops | Separate advanced package; cable math/visual slack verified; sequence checkpoints and final release validated. |

For each phase: pure model tests, invalid/unreachable configuration tests, component input tests, an actual Phaser browser playthrough, and production Angular build. Prove each new engine with a second substantially different authored configuration; a second skin alone does not establish academic reuse. Do not spend the first phase building all seven unpolished scenes.

## Visual and interaction acceptance

Use the established painted moonlit castle, brass/wood/stone material language, dimensional highlights and shadows, and focused workbench composition. Generate environment/prop art when entering the relevant build phase. Draw mathematical marks, sector boundaries, grid spacing and gear teeth deterministically so art cannot contradict values.

Every workshop needs readable values, clear drop targets, direct manipulation, undo/remove/reset, keyboard/tap equivalents, focus return, explanatory physical failure, pause, reduced motion, and an explicit exit. Keep the full equation/measurement explanation available after success. Do not rely on color or sound alone. Verify at desktop and 390 x 844, including expanded help/controls and no horizontal overflow. Decorative camera shake must never obscure the measurement during manipulation.

## Capability gaps and concrete change inventory

All seven proposed lock IDs are currently uninstalled capabilities. Shared gaps are the host registry, typed answer/checkpoint codecs, reusable release attachments, and optional academic-stage sequencing. These belong in the heist template, not project-specific Angular pages or the core LMS engine. There is no requirement to replace Angular, Phaser, the navigation engine or the persistence adapter boundary.

During implementation, expected additions are `escape/locks/`, shared rational/unit helpers, seven lock module directories with validators/scenes/controls/tests, and project-owned art/configuration. Expected modifications are the escape puzzle model/evaluator/validator, expedition input/host/runtime, save/checkpoint adapter, versioned castle package/catalog, answer key and regression fixtures. The first phase touches only the shared boundary and fraction-gear slice; subsequent phases add their own modules.

Planning-turn changes: this document plus a link from `BUILD_PLAN.md`. No game code, assets, project versions or tests were changed for this request. No build/test rerun was needed for documentation. The known architecture-audit violations in `core/index.ts` and the mystery-substance render-quality service remain outside this work.

Recommended next implementation task: finish phase zero, then build the fraction-circle gear as one complete independent workshop, including the smallest shared infrastructure it actually requires.
