# Castle Archive Rescue — visual upgrade

Implemented from `PHASER_VISUAL_VERTICAL_SLICE_UPGRADE.md`, September 11, 2026. Verification continued into September 12 UTC.

The subsequent grade-5 simplification is documented in `GRADE_5_HANDOFF.md`.
That pass verified the previously pending drawer resize: canvas and parent both
measured 1920 × 676 after the planning drawer closed in Chrome.

## Delivered

- Painted terrain, castle buildings and north tower; directional courier/watch walking atlas; empty, loaded and broken cart plus crate atlas. Four local PNGs total approximately 7.6 MiB. Transparent atlases retain alpha; the original SVG remains a fallback. See `ART_PROMPTS.md` for provenance and prompts.
- Optional typed `Mission.presentation` supplies paths, crop regions, wall frame choices, decorative landmarks and response appearances. No project-ID branches. Harbor remains valid without presentation configuration.
- `SceneArt`, `CharacterPresenter`, `CameraDirector`, `GameFX`, and pure presentation-state helpers separate artwork, exact engine positions, camera behavior and visual feedback. Mission time drives walking and effects; paused time freezes frames. Visual easing never changes mathematical positions.
- Map-first Angular workspace with compact objective and gate feedback, floating tools, a collapsible intelligence/planning/math/results drawer, keyboard location controls, and an actual timeline during execution/replay. Manual camera input takes priority. Math/drawer interaction stops automatic camera motion. A ResizeObserver handles drawer changes and disconnects on disposal.
- Event cursors distinguish crisis and response events at the same timestamp. Backward seeking reconstructs cargo and clears stale pulses. Replay exposure directs readers to the event history instead of showing final exposure as historical exposure.
- Gameplay fingerprints omit only presentation. Pre-upgrade saves match, while identity, version, rates, geometry, gate, target and crisis data remain checked. No save clearing or compatibility bypass.

## Verification

- **33 tests pass across six files**: engine, persistence, Angular controls, presentation/replay, catalog and registry. Includes original success/failure scenarios, Harbor, legacy fingerprints, malformed art, exact position sampling, paused frames, backward seeking, event deduplication, same-timestamp replay and the objective refresh regression caught during browser QA.
- **Production build passes.** Initial bundle approximately 288.64 kB; Phaser remains lazy. Existing stylesheet warnings concern other templates. No shared dependency upgrade or trading/robot implementation changes.
- **Chrome full success run:** entry → market (wait 8 s) → gate → hall → archive (pickup) → bridge → river. Verified all 14 calculations, executed, paused for crisis at 215 s, verified 63 kg, selected team carry, extracted at 407.8 s. Planned time 348.33 s; actual delay 59.5 s. The completed result and evidence event history restored after a clean reload.
- **Chrome replay/layout:** selected cracked-axle event at 215 s separately from response, observed broken-cart state and crisis callout, returned to the start, checked reduced motion and 1024 × 768 layout, and reset viewport. Inspected console error log was empty. A final dimension check caught stale parent sizing after drawer expansion. The observer now calls Phaser's `setParentSize` (verified against installed source/types); the post-fix browser reload timed out, so that last visual recheck remains pending.
- **In-app browser limitation:** shell, static assets and isolated Angular controls loaded, but repeated attempts stalled while importing Phaser, before the upgraded scene was constructed. Canvas selection did not resolve that import problem. Chrome was used for the successful full run; do not advertise in-app verification as passed.
- Failure outcomes pass domain tests; a new full failure play-through in the upgraded browser UI was not repeated. No physical Chromebook, sustained FPS/GPU benchmark, audio, deployment, or classroom multiplayer test was performed.

## Asset conventions and remaining polish

Logical map coordinates remain 1000 × 680. `groundSlices` maps source-pixel rectangles to logical destination rectangles, aligning the river crossing with the existing route. Buildings occupy existing blocking rectangles. The north tower is decoration outside the traversed route and adds no blocking geometry. Characters use a 4 × 4 atlas: east/south/west/north, two courier steps, then two watch steps. Props use a 2 × 2 atlas. Source crops are runtime texture metadata, not changed gameplay coordinates.

This pass uses two-step walking and prop/pose changes for pickup, damage, carrying, repair and extraction. Dedicated multi-frame hand/repair/pickup animations, ambient water/foliage layers, additional foreground props and optional audio remain art polish. Existing near-miss events describe spatial clearance in map pixels; no timing-based near-miss mechanic was introduced.

Local preview: `http://127.0.0.1:4216/projects/castle-archive-rescue`. Optional `?heistRenderer=canvas` selects the canvas renderer for diagnosis. `?heistDebug=true` retains the diagnostic readout. Temporary initialization bypasses were removed. Angular template hot replacement may detach the canvas; use a clean reload for verification.

## Reproduce

```powershell
$env:NG_BUILD_MAX_WORKERS='2'
node node_modules/@angular/cli/bin/ng.js test --watch=false --include='src/app/templates/heist/**/*.spec.ts' --include='src/app/projects/project-catalog.spec.ts' --include='src/app/runtime/local-template-registry.spec.ts'
node node_modules/@angular/cli/bin/ng.js build --output-path=.angular/heist-production
```

The working tree contains unrelated concurrent work. Do not stage the entire tree or generated `.angular` output as part of this upgrade.
