# Castle Rescue — Patrol 2.5D workshop

Implemented 15 September 2026 following the user's instruction to build one lock at a time. This pass implements **Patrol synchronizer only**, the first remaining lock after the balance/piston workshop. The other six locks await review and their own implementation passes.

Local preview: http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=2

## Visible result

One Three.js courtyard diorama contains overlapping metallic timing discs on the left and a fox holding cage on the right. Each disc has a real cutout. A shared horizontal spring pin, drawbar, lever, cable, pulley, and latch visibly connect alignment to the cage opening. The cage bars occlude the fox correctly, and the door rotates about its hinge.

Turn the crank or use **Crank +1**. Wheel periods, starting offsets, and remaining ticks update alongside the actual movement. At the first positive common opening, the discs settle, the pin passes through their holes, the latch withdraws, and the door swings clear. The fox looks around while waiting, then walks and runs through the doorway onto the foreground path. The open cage and escaped fox remain visible afterward.

Whole-scene, lock, and cage camera focus controls preserve readable scale. An expanded workshop supports Escape and keyboard focus containment. Narrow screens start focused on the lock and move focus to the cage during release. Options contain hint, rewind, reduced motion, sound, and asset credits. Pause freezes the release; replay repeats the escape without adding a trial or completion. Warm lamps, moonlit stone, contact shadows, foliage, and subtle flame movement establish the scene's materials and depth.

The main activity no longer has redundant machine instructions or trial panels surrounding the opted-in scene. Saved setups and secondary authoring tools remain available on demand; genuine persistence errors stay visible. Weekly products and the disconnected AI Tutor planning panel remain in the right column.

## Reusable capability

```text
TEMPLATE_CAPABILITY_GAP — resolved
Requested: timing-wheel alignment must drive a connected 2.5D cage release
and an articulated animal escape.
Reason: the existing timing renderer provided wheel controls and readings,
but no linked enclosure or animated animal presentation.
Reusable capability: optional typed TimingWheels.presentation.kind =
"timing-cage", with local animal asset, animation clip, and credits settings.
```

The capability is implemented under `src/app/templates/heist/escape/locks/timing-cage/`. Scene orchestration, mechanical geometry, static mesh batching, animation loading, timeline, sound, controls, validation, and draft migration are separated. `mountMachineScene` selects it by the optional presentation contract. Other timing configurations retain their existing renderer; there is no project-name branch.

Castle's four grade configurations opt in through `public/projects/castle-archive-rescue/project.json`. Existing Three.js and balance material helpers are reused. No package or lockfile changes and no new runtime dependency were required.

The existing `machineReading` evaluator remains authoritative. Periods, phases, first-opening rules, inventories, other locks, assessment boundaries, and rescue counts are unchanged:

| Grade | Periods | Starting offsets | First valid tick |
| --- | --- | --- | --- |
| 5 | 4, 6 | 0, 0 | 12 |
| 6 | 6, 8 | 0, 0 | 24 |
| 7 | 4, 6, 9 | 0, 0, 0 | 36 |
| 8 | 6, 8 | 1, 1 | 23 |

Zero does not unlock. Rapid forward input cannot skip the first valid opening. The Patrol fox is a holding-enclosure staging action; Patrol's rescue release binding remains empty. The configured six rabbits, four foxes, and two owls are preserved. Authoring previews do not record lesson completion.

## Saved setups

The preview fingerprint includes complete mission steps. The presentation upgrade adds asset settings and updates both the timing stage's and its containing step's success descriptions. A narrowly checked compatibility migration accepts those changes while requiring all mathematical settings and other steps to match. It also composes with the prior piston migration. Regression tests reject unrelated rule changes.

Browser verification confirmed that a changed Patrol crank setting survives reload and the original Grade 5 balance draft still contains `1/2 + 1/4 = 3/4`, with the other two scales empty and all 19 existing balance trials retained.

## Asset and performance

The unmodified [Khronos glTF Sample Assets Fox](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox) is stored at `public/projects/castle-archive-rescue/art/patrol/fox.glb` (162,852 bytes). It supplies `Survey`, `Walk`, and `Run` skeletal clips. Attribution is included in `FOX-LICENSE.md` and the user-accessible `credits.html`: PixelMannen's model is CC0; tomkranis's rigging/animation and the AsoboStudio/scurest glTF conversion are CC BY 4.0. Runtime scaling, orientation, and clip blending leave the binary unchanged.

Static geometry is merged by material, while wheels, pin, cable, latch, door, and animal remain independently animated. The Grade 5 scene was observed at 48 draw calls after batching. Pixel ratio is capped at 1.35 and the shadow map at 1024. Rendering pauses while hidden; listeners, observers, animation resources, meshes, materials, textures, audio, and renderer are disposed on teardown. These are practical optimizations, not a device performance guarantee.

## Verification

- Full Heist/Castle regression suite: **39 files, 236 tests passed**. Log: `output/castle-patrol-final-tests.log`.
- Final focused Patrol and machine-component suite: **5 files, 24 tests passed**. Log: `output/castle-patrol-final-focused-tests.log`.
- Full application production build passed. Log: `output/castle-patrol-final-build.log`. Final assets were copied from the successful stage build into the running Castle preview, with `index.html` last.
- Geometry tests raycast through the actual aligned apertures for the two- and three-disc configurations. Timeline tests cover ordered release, pause, reduced motion, first-opening clamping, and replay behavior.
- Browser checks covered a clockwise pointer drag advancing the physical crank from tick 0 to 1, native crank controls, Grade 5 tick zero and partial alignment staying locked, automatic release at 12, the fox walking/running outside, pause/resume during door opening, reduced-motion replay, unchanged trial count after replay, Grade 7 three-disc layout, and Grade 8 offset release at 23.
- At a 390-pixel phone viewport, controls remained readable with no horizontal overflow and focus moved to the escaping fox. Escape closes expanded mode. The final full build restored the saved balance arrangement and the Patrol draft without a migration warning.
- Scoped diff whitespace check passed. Architecture audit still reports two existing unrelated violations: `core/index.ts` importing templates and a service under `projects/mystery-substance/lab-kit`. Those files were not changed by this pass. Existing component style-budget warnings are non-blocking.

Synthesized sound cues are wired but were not audibly reviewed. No deployment, new assessment behavior, AI integration, or collaborative editing was added.

## Next review

Review the Patrol scene in Lesson 2 before proceeding to the **Rabbit courtyard workshop**. Its proposed next step is a substantial fraction-sector cog that meshes when complete and winds the cage door upward, followed by staggered rabbit hops. That workshop and its assets have not been implemented in this pass.
