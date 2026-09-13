# Castle Archive Rescue — Phaser 4 Visual Vertical Slice Upgrade

## Task

Upgrade the existing **Archive Rescue** mission at **`/projects/castle-archive-rescue`** into a polished, immersive Phaser 4 visual vertical slice.

This mission already works. Improve its game world, characters, animation, camera, visual feedback, and presentation while preserving its mathematical gameplay.

The selected vertical slice is the **complete existing castle mission**, from reconnaissance through extraction and replay. Do not choose another challenge, rebuild the application, or start a separate game project.

Establish a reusable visual system for the Heist template. Apply finished visual treatment to Castle Archive Rescue only. Use the existing harbor mission as a compatibility check, not a second art-production task.

**The student should feel: “We planned this operation, our math controls its timing, and we can see why it succeeds or fails.”**

## 1. Audit the existing implementation, then proceed

Work in the existing repository:

`C:/Users/erich/Desktop/pbl-lms/forge-pbl-template`

Read the applicable repository instructions and these existing documents:

- `AGENTS.md`
- `docs/build/01_ARCHITECTURE_RULES.md`
- `docs/build/12_PRODUCT_ARCHITECTURE_DECISIONS.md`
- `docs/heist/BUILD_PLAN.md`
- `docs/heist/VERIFICATION.md`

Inspect the current files before changing them:

| Area | Existing implementation |
|---|---|
| Castle content and gameplay configuration | `public/projects/castle-archive-rescue/project.json` |
| Current placeholder environment | `public/projects/castle-archive-rescue/castle-map.svg` |
| Phaser host and map rendering | `src/app/templates/heist/game/heist-map.ts` |
| Angular workspace | `src/app/templates/heist/ui/heist.component.ts`, `.html`, `.scss` |
| Domain models and package validation | `src/app/templates/heist/domain/heist.models.ts`, `heist.validation.ts` |
| Mission execution | `src/app/templates/heist/domain/heist.engine.ts` |
| Shared timing and mathematics | `src/app/templates/heist/domain/heist.timeline.ts` |
| Patrol and visibility calculations | `src/app/templates/heist/domain/heist.patrol.ts` |
| Runtime and persistence adapter | `src/app/templates/heist/runtime/` |
| Launch integration | `src/app/runtime/project-launch/template-launchers/heist.launcher.ts` |
| Reuse fixture | `public/projects/harbor-records-rescue/` |

The inspected baseline uses Angular 22 and a shared **Phaser 4.2.1** dependency. Recheck the installed version and preserve the repository's working Phaser 4 version. Trading and robot projects also use Phaser; do not change their implementations or upgrade the dependency as part of this task.

Audit the live scene, existing assets, current rendering boundaries, save behavior, and tests. Identify what to retain, what needs real artwork, and which small reusable presentation systems are justified. Give a short implementation plan, then carry out this visual upgrade.

Preserve unrelated and concurrent working-tree changes.

## 2. Preserve the gameplay definition

The gameplay remains:

**RECON → MEASURE → CALCULATE → PLAN → PREVIEW → LOCK → EXECUTE → RESOLVE CRISIS → EXTRACT → REPLAY / DEFEND**

Students inspect locations, measure distances, verify mathematics, choose connected route waypoints, schedule waits, and include target pickup. They scrub the timeline to compare their route with patrol positions and gate availability. Once locked, the team executes the plan automatically.

Retain the current scenario and configured constraints:

- South entry, market court, west gate, north tower, inner hall, archive room, river bridge, and river extraction.
- Three configured patrols and the gate cycle.
- Scale conversions, travel-time calculations, carrying capacity, and elapsed-time evidence.
- The 68 kg archive crate, 90 kg cart capacity, 12-second pickup, and configured loaded movement speed.
- The 420-second extraction deadline.
- The cracked-axle crisis, its percentage calculation, response eligibility, transfer/repair delays, and speed consequences.
- Informative detection, closed-gate, and missed-deadline failures.
- Local practice saving, original plan snapshot, mathematical attempts, event replay, and evidence export.

Read these values from mission configuration. The list above documents the baseline; it must not become a second set of hard-coded rules.

Do not introduce free steering during execution, combat, weapons, takedowns, realistic criminal instruction, random patrol behavior, new scoring rules, or new win conditions. The fictional recovery operation and historical context must remain clearly distinguished.

## 3. Keep the architecture boundaries explicit

| Layer | Responsibility |
|---|---|
| Mission JSON | Scenario data, routes, target, patrol definitions, mathematical requirements, and declarative visual configuration |
| Pure TypeScript engine | Plan validation, movement timing, gate state, detection, pickup, crisis consequences, success/failure, and event history |
| Angular | Application integration, accessible controls, math forms, detailed intelligence, plan editing, timeline interaction, results, and adapter-based saving |
| Phaser | Environment, characters, props, route and measurement overlays, visual feedback, presentation HUD, cameras, and animation |

**Phaser renders the mission engine's state. It does not decide the mission outcome.**

Preserve the lazy `HEIST_MAP_LOADER` boundary and the `mountHeistMap` adapter, extending them only where needed. Supply additional read-only presentation data through typed snapshots or events. Do not let the scene access storage, mutate plans, validate answers independently, or call unrelated Angular components.

Keep one timeline compiler and one operation clock. Do not create a second physics-driven movement or detection simulation inside Phaser. Visual callbacks must never grant pickup, complete a movement, spend time, or trigger success.

## 4. Make the castle dominate the screen

Design an immersive historical operation scene with a clear visual hierarchy:

**CASTLE WORLD → RECOVERY OBJECTIVE → TEAM → ROUTE / PATROLS → SUPPORTING CONTROLS**

The map should occupy the clear majority of the working viewport on normal laptops. Show the initial objective and map tools without requiring a scroll. Keep the timeline within easy reach.

Replace the permanently crowded panel layout with compact controls and an intentional, collapsible intelligence/planning drawer where useful. A math question may open in that drawer, but it must remain visible, readable, keyboard accessible, and logically focused.

During execution, give more space to the map. During a crisis, keep the incident visible while presenting the required calculation and response controls. In replay, pair the selected event with its visible location and mathematical evidence.

Retain access to pause, overview, settings, project navigation, and plan/results controls. Do not hide a critical control behind an unavailable planning mode.

Improve the world itself. Additional rounded cards, glass panels, excessive glow, gradients, floating boxes, CSS effects, or more text are not substitutes for better game artwork and animation.

## 5. Establish the castle art direction

Use a readable, illustrated historical adventure style: weathered stone, timber structures, parchment-toned markings, warm lamps, muted vegetation, and cool river water. Give the archive and extraction point distinct visual identities.

Use a consistent top-down or shallow three-quarter cutaway perspective. Maintain the existing map's navigational clarity. Roofs and foreground walls must not conceal the operative, route, or important interaction targets.

The existing map is **1000 × 680 logical world units**. Preserve that coordinate system and its gameplay geometry. Higher-resolution artwork can be displayed in those same logical bounds.

Artwork must align with the configured location anchors, route graph, blocking rectangles, gate, and bridge. Do not paint an impassable wall across a valid route or visually advertise a passage that the engine considers blocked. Preserve scale-based mathematics when swapping textures.

## 6. Compose the scene in deliberate layers

Use explicit depth ordering:

1. **Background:** distant landscape, river backdrop, restrained atmospheric treatment.
2. **Ground:** courtyard paving, paths, bridge deck, room floors, river surface.
3. **Architecture:** walls, tower bases, gate structure, archive cutaway, market stalls.
4. **Interactive props:** archive crate, cart, gate mechanism, landing and recovery markers.
5. **Characters:** recovery team and three patrol characters, with ground shadows.
6. **Foreground:** selected roof edges, foliage, wall tops, banners, bridge rails.
7. **Tactical overlays and effects:** route verification, measurements, selection, patrol paths, vision, and event emphasis.
8. **Compact gameplay HUD:** operation mode, time/deadline, target state, exposure, and current action.

Tactical overlays must remain readable above decorative layers. Fade or cut away foreground objects when they obstruct important gameplay. Decorative foreground overlap must not change line-of-sight calculations.

Create depth through composition, directional shading, contact shadows, and restrained overlap. Keep parallax limited to scenery that cannot misrepresent measurable map positions.

## 7. Replace the simple character markers

Replace the circular operative and patrol tokens with coherent illustrated sprites or small sprite sheets.

The recovery team should visibly support these states:

- Idle and waiting.
- Walking in the direction of travel.
- Moving with the empty cart.
- Securing the archive crate.
- Moving with loaded cargo.
- Responding to the damaged axle.
- Team carrying or repaired-cart travel after the selected response.
- Arrival and extraction.

Patrols should show direction, walking, waiting, and engine-reported warning/detection feedback. Distinguish them through silhouette and restrained clothing differences while keeping their existing schedules.

Anchor character feet and contact shadows to the exact engine-derived world position. Use body motion, limb cycles, wheel rotation, and local sprite transforms for animation. Do not ease the authoritative position in a way that visually places a character ahead of or behind its calculated route position.

Camera motion can ease. Mission time, waypoint arrivals, pickup completion, and detection must remain unchanged. At pause or crisis, movement animation should match the paused operation. At higher playback speed, animation should remain legible without moving independently of the timeline.

## 8. Make mathematics visible in the world

| Student action or mission event | Required visual response |
|---|---|
| Inspect a location | Highlight the actual location; open its relevant intelligence with accessible focus |
| Start a measurement | Show a clear anchored endpoint and the in-progress measuring line |
| Finish a measurement | Display endpoints, map distance, and scale; retain the student's required conversion |
| Add a waypoint | Place a numbered marker and animate a short path reveal |
| Enter unverified route math | Keep a clearly unfinished route pattern and textual status |
| Verify a segment | Change its pattern/status and give the segment a restrained confirmation effect |
| Enter an incorrect answer | Keep verification incomplete, show the existing hint, and mark the related calculation/segment clearly |
| Add a wait | Show a wait marker at the waypoint and the shifted downstream schedule |
| Scrub the timeline | Move team and patrols to exact sampled positions and show the corresponding gate state |
| Lock the plan | Briefly acknowledge the immutable plan and introduce execution |
| Secure the archive | Animate the pickup and show the crate's loaded state at the engine's pickup boundary |
| Encounter the crisis | Show axle damage at the archive, focus attention, and present the math/response controls |
| Reject an overloaded response | Show that the crate exceeds the chosen transport capacity without applying the response |
| Resolve the crisis | Show the selected carrying method and the revised remaining schedule |
| Record a near miss | Briefly emphasize the relevant patrol and recorded clearance |
| Fail or extract | Frame the actual location and show the engine-provided reason or successful recovery |

Retain patterns, labels, and icons alongside color. Do not reveal unearned answers through decorative labels or automatically solve the plan to show off the artwork.

The current near-miss evidence is spatial clearance. Do not label it as time until a patrol arrives unless that quantity is actually computed and recorded.

## 9. Add a restrained CameraDirector

Extract reusable camera behavior from the map renderer as needed. Suggested operations:

- `overview()` — stable tactical planning view.
- `focusLocation(id)` — brief inspection or objective emphasis.
- `followTeam()` — readable execution framing.
- `focusEvent(event)` — pickup, crisis, detection, or extraction.
- `returnToPreviousView()` — restore the student's tactical framing.
- `setReducedMotion(enabled)` — immediate framing without shakes or long pans.

Keep planning stable. Never take the camera away while a student is selecting measurement points, drawing a route, or entering an answer. Give manual camera interaction priority over decorative moves.

An opening sweep or plan-lock transition must not consume operation time. Either complete it before dispatching the existing lock command or run it without delaying or disguising the authoritative clock. Do not add a cinematic-only simulation clock.

## 10. Centralize effects and scene art

Introduce small reusable systems only when they serve the implemented scene:

- **SceneArtSystem:** load and compose scenery, props, shadows, foreground layers, and depth ordering.
- **CharacterPresenter:** select sprites and animation states from position, action, direction, and cargo state.
- **GameFXSystem:** selection, verification, waits, warnings, pickup, crisis, extraction, and failure emphasis.
- **CameraDirector:** contextual framing and motion preferences.
- **GameHUD:** compact presentation of the existing mission snapshot.

Equivalent names are acceptable. Avoid a large general-purpose graphics framework or a separate class for every tiny effect.

Suggested organization under `src/app/templates/heist/game/`:

```text
heist-map.ts
scene-art-system.ts
character-presenter.ts
game-fx-system.ts
camera-director.ts
game-hud.ts
heist-presentation.models.ts
```

Keep medieval asset names and castle-specific prop placement in mission presentation configuration. The reusable systems must also accept the harbor mission without project-ID conditionals.

## 11. Keep the HUD compact and accessible

Use the existing values: mode, operation time, deadline, target state, exposure, readiness, current action, and original/revised schedule where relevant. Do not invent scores, lives, attempts, or resources for visual decoration.

Phaser can draw compact world-attached labels and gameplay indicators. Angular retains semantic controls, math input, detailed text, evidence, and the interactive timeline. Canvas HUD text needs an accessible HTML equivalent; avoid competing duplicate controls.

Make the current action understandable: moving, waiting, pickup, decision pause, extraction, or failure. Show actual units in the educational interface. Hide debugging coordinates and renderer details outside debug mode unless the task explicitly needs them.

## 12. Use real, replaceable art assets

Use Phaser Graphics for dynamic routes, arrows, measurement lines, vision overlays, selection bounds, meters, and debug geometry.

Use PNG/WebP or appropriate SVG assets for the castle environment, major architecture, characters, cart, crate, bridge details, and important props. Do not replace the current SVG with an even more complicated permanent illustration made from Phaser primitives.

Create or obtain suitable artwork through available approved asset tools. Keep source/license information. If finished artwork is unavailable, use clearly named replaceable placeholders and report the limitation honestly; a folder of missing assets is not a completed visual slice.

Suggested castle asset folders:

```text
public/projects/castle-archive-rescue/art/
  environment/
  characters/
  props/
  effects/
  asset-manifest.json
```

The manifest and presentation configuration are proposed additions, not existing features. Add typed contracts and validation for the approach actually implemented. Support raster loading when adding PNG/WebP: the existing renderer currently calls `load.svg` for its map asset.

Use semantic asset keys such as `ENVIRONMENT_GROUND`, `RECOVERY_TEAM`, `PATROL_CHARACTER`, `ARCHIVE_CRATE`, `TRANSPORT_CART`, and `EXTRACTION_MARKER`. Keep file paths out of domain logic.

## 13. Prioritize the artwork that changes the experience

Use this starting production brief, refining dimensions after the visual audit:

| Priority / asset | Purpose | Approximate source size | Background / view | Style and animation |
|---|---|---|---|---|
| P0 — Castle ground and cutaway environment | Replace the flat prototype map while preserving geometry | Up to 2000 × 1360, displayed at 1000 × 680 logical units | Opaque; consistent top-down or shallow three-quarter view | Illustrated stone, timber and landscape; no baked labels, routes, characters, or UI |
| P0 — Recovery team | Readable primary character | About 96 × 128 per frame; tune to visible screen size | Transparent; matching directional view | Coherent historical travel clothing; idle and 6–8 walking frames for required directions |
| P0 — Patrol character | Replace all three watch markers | About 96 × 128 per frame | Transparent; same perspective and ground anchor | Walking/waiting frames; restrained variants; no combat animations |
| P0 — Cart and archive crate | Make pickup, load and crisis visually legible | Cart about 160 × 128; crate about 80 × 80 | Transparent; same perspective | Empty/loaded, intact/damaged cart states; small wheel cycle if useful |
| P1 — Gate and foreground architecture | Gate-state readability and depth | Modular pieces about 128–512 px across | Transparent; align to existing geometry | Open/closed gate states; cutaway or fade-ready wall/roof pieces |
| P1 — River landing / extraction props | Give the final objective a clear visual destination | About 256 × 256 | Transparent overlays over ground artwork | Dock or recovery marker; subtle completed state |
| P2 — Ambient props | Environmental life | About 64–256 px per item | Transparent | A few banner, lamp or water-loop frames; consistent lighting |

Keep the base image and each overlay aligned to the same origin. State sprite frame dimensions, pivots, facing conventions, animation names, and world display sizes in the manifest or documentation.

## 14. Add environmental life with restraint

Use a small number of context-appropriate ambient details: river movement, a fluttering banner, warm lamp variation, or moving foliage. Tie cart wheels and character locomotion to actual motion.

Ambient animation uses presentation time only. It must not move patrols, shift measurable locations, or affect gameplay. Pause expensive effects when hidden and reduce or disable decorative motion when requested. Audio is optional for this visual slice; if added, provide mute and require no sound to understand the mission.

## 15. Preserve replay and saved work

Use the existing original plan, actual timeline, and event history to render replay. Do not record video or run a new simulation with altered physics.

When scrubbing backward or jumping to an event:

- Reconstruct character, cargo, gate, and target states from the selected operation time.
- Cancel obsolete camera tweens and transient effects.
- Avoid replaying all prior particles, sounds, or notifications at once.
- Trigger event emphasis once per intentional event crossing/selection, with stable event identity.
- Preserve the original prediction and display the crisis-modified schedule accurately.

Keep presentation state separate from persisted learning evidence. Do not save frame updates, camera positions on every frame, particles, or idle animation progress.

Audit persistence before adding visual fields: the current launcher fingerprints `JSON.stringify(mission)`. An art-only edit must not unexpectedly discard a student's plan or replay. If separating gameplay and visual fingerprints is needed, preserve existing gameplay validation and implement an explicit compatible migration for the previous fingerprint. Never accept unrelated or corrupted saves, silently clear local storage, or bypass tenant/project/version/actor scoping to make a graphics change work.

## 16. Performance, lifecycle, and accessibility

Target a responsive experience on ordinary student laptops, including 1024 × 768 layouts. Measure on available hardware and report what was actually tested; do not claim Chromebook performance from a desktop screenshot.

- Keep Phaser lazy-loaded and reuse the installed dependency.
- Prefer bounded texture sizes, compressed art, pooled effects, and a small number of active animations.
- Avoid per-frame asset loading, text-object recreation, JSON parsing, or rebuilding unchanged plans.
- Do not introduce unnecessary physics bodies, heavy post-processing, or unbounded particles.
- Keep keyboard alternatives for map selection, measurement, route editing, zoom/pan, and timeline interaction.
- Retain focus management, visible focus, readable text, strong contrast, and non-color status cues.
- Preserve pause, reduced motion, loading/error feedback, and retry behavior.
- Clean up Phaser, observers, timers, listeners, and tweens on navigation or destruction, including pending lazy imports.
- Check reload, resize, leaving/re-entering the project, and restored crisis state. The current development note warns that Angular template hot replacement can detach the canvas; verify a clean mount and avoid accumulating orphaned games.

## 17. Implement in this order

1. Record baseline screenshots and verify the current mission still completes.
2. Establish castle composition, logical alignment, and the small asset/presentation contract.
3. Replace the environment and primary character/prop placeholders first.
4. Add depth ordering, shadows, foreground handling, directional movement and cargo states.
5. Add mathematical route feedback and clear gate/patrol/target presentation.
6. Integrate the restrained camera director, event effects, and compact HUD.
7. Rework the Angular layout only as necessary to give the world space and preserve accessible interaction.
8. Verify crisis, success/failure, replay, save compatibility, reduced motion, lifecycle, and performance.
9. Fix discovered issues and document the delivered slice and remaining art needs.

Do not stop after an audit, a mockup, color changes, or a list of desired assets. Deliver one working upgraded mission when this implementation prompt is executed.

## 18. Verification and acceptance criteria

Retain existing tests and add focused tests for new presentation behavior and any changed contracts. Use the injected map-loader boundary for Angular controls. DOM-only unit tests may mock the external Phaser package; verify actual rendering in a real browser.

Run the Heist domain/runtime/component suites, affected catalog/registry tests, strict Angular compilation, and a production build. Use an isolated build output folder where concurrent tasks share this repository. Report unrelated failures separately; do not remove tests or loosen checks.

The upgraded slice is complete when all of the following are demonstrated:

1. Castle Archive Rescue remains available through its existing catalog entry and route.
2. The castle world is visibly improved and dominates the working view.
3. Characters, cart, crate, gate, archive, and extraction are recognizable game objects.
4. Selection, measurement, route creation, verification, waits, pickup, and crisis have appropriate in-world feedback.
5. The same plan and answers produce the same arrival times and outcomes as the baseline; visual easing has not changed mission mathematics.
6. Three patrols, exposure, gate timing, and configured walls remain consistent with the engine.
7. Incorrect math still blocks progression; an overloaded crisis response is still rejected.
8. A complete browser run reaches pickup, crisis resolution, extraction, and event replay.
9. Browser checks also demonstrate a meaningful failure and its replay explanation.
10. Replay scrubbing reconstructs the right state without duplicate effects or stale camera motion.
11. Existing local practice and evidence remain restorable; visual asset replacement does not silently invalidate them.
12. Keyboard controls, reduced motion, pause, resize, reload, and scene disposal work.
13. The harbor fixture still runs through the shared Heist systems without requiring castle-specific code.
14. Tests/build results, actual performance observations, and known limitations are reported accurately.

Use the existing developer QA route in `docs/heist/BUILD_PLAN.md` as a regression path. Keep its answer values out of the normal student experience.

## 19. Deliverables

Provide the working upgraded Castle Archive Rescue mission and a concise handoff covering:

- Before/after screenshots at comparable viewport sizes and a short gameplay capture if available.
- Visual systems added or changed, with actual implementation paths.
- Assets used, their provenance, and any remaining placeholders.
- A prioritized art wishlist with purpose, dimensions, transparency, perspective, style, and frame requirements.
- Changes to the presentation contract and save-fingerprint handling, if any.
- Test/build results, browser success/failure/replay checks, and measured performance limits.
- Reuse demonstrated against the harbor fixture.
- Recommended next visual upgrade within the Heist template; do not apply it automatically to trading or robot projects.

Update the Heist documentation to reflect the delivered implementation. Preserve the local-practice authority boundary; official attempts, backend integration, multiplayer, grading, and deployment are outside this visual upgrade.

## Final visual quality check

Look at a screenshot and a short execution sequence. The castle, team, route, archive objective, and outcome should immediately read as a coherent historical adventure game.

If the scene still feels like a small map surrounded by forms, improve **world composition, artwork, character animation, and mathematical feedback**. Additional UI decoration does not meet this brief.
