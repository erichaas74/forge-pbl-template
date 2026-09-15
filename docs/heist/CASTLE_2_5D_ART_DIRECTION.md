# Castle Rescue: 2.5D art and animal escape proposal

Research date: 15 September 2026. The user subsequently authorized building one lock at a time. The [Patrol workshop](CASTLE_PATROL_2_5D_WORKSHOP.md) and [Rabbit workshop](CASTLE_RABBIT_2_5D_WORKSHOP.md) are implemented and verified; the other five redesigns remain queued for review. This document records the researched direction and extends [the remaining lock concepts](CASTLE_REMAINING_LOCK_CONCEPTS.md).

The Patrol build uses the installed Three.js runtime and the Khronos glTF Sample Assets fox, with its original CC0 model and CC BY 4.0 animation/conversion attribution included beside the asset. Quaternius, Blender, and Krita below remain researched options; none was installed or added as a runtime dependency for Patrol.

## Recommended approach

Use the existing Three.js renderer for a stylized castle diorama: real depth, a fixed slightly elevated camera, readable mechanisms, and animated animals in the same scene. The current balance renderer already uses an orthographic camera, soft shadows, environment lighting, and tone mapping. It has the technical foundation for this direction. The next investment should be cohesive models, materials, animation, and composition.

Keep the mechanism nearly front-facing so alignment slots, gear teeth, fractions, and mirror angles remain legible. Use a shallow angle for the floor, cage, and surrounding architecture. An exaggerated isometric view would make the mathematics and precise placement harder to read.

## Libraries and free tools reviewed

| Tool | Verified capability | Proposed use |
| --- | --- | --- |
| [Three.js](https://threejs.org/docs/pages/OrthographicCamera.html) | Orthographic projection; [glTF loading](https://threejs.org/docs/pages/GLTFLoader.html); [animation playback](https://threejs.org/docs/pages/AnimationMixer.html); [MIT license](https://github.com/mrdoob/three.js/blob/dev/LICENSE). | Keep as the scene renderer. Already present in the repository and used by the first lock. |
| [Blender](https://www.blender.org/features/) | Free, open source modeling, rigging, animation, and rendering software. Its [glTF exporter](https://docs.blender.org/manual/en/dev/addons/scene_gltf2.html) supports animated assets. | Author or refine cages, stonework, mechanical parts, and animal rigs. Export named animation clips with the models. Check export options against the installed Blender version. |
| [Krita](https://krita.org/en/features/) | Free painting, seamless texture tools, and frame animation with image export. | Paint distant castle scenery and a consistent material palette; create small illustrated effects where appropriate. Optional alongside Blender. |
| [Quaternius Ultimate Animated Animal Pack](https://quaternius.com/packs/ultimateanimatedanimals.html) | CC0 pack with 12 animals and more than 12 animations per animal, supplied in formats including glTF and Blend. The [creator's catalog](https://quaternius.com/) lists a fox for this pack. | Evaluate the fox as an animation starting point. Rabbit and owl coverage has not been established; do not assume this pack supplies the complete cast. Inspect actual clips and visual fit before adoption. |
| [Phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser) | Free, open source web game framework focused on 2D; supports [frame animation](https://docs.phaser.io/phaser/concepts/animations). | Strong alternative for a fully illustrated sprite approach. Already present in the repository, but changing the current mechanical renderer would introduce avoidable rework for the proposed diorama. |
| [PixiJS](https://pixijs.com/8.x/guides/getting-started/intro) | GPU-powered 2D rendering library. | Alternative for layered illustrated scenes. Not needed in addition to Three.js for the recommended direction. |

These are production tools and asset starting points. Installing another engine alone will not create a consistent art style or convincing animal movement. No new paid tool or runtime library is required for the proposed first prototype.

## Composition and visual standard

- One spacious room with the active mechanism as the largest object. The cage sits alongside it, with the entire connecting cable or rod visible. Reserve an unobstructed route for the animals to leave.
- Keep the equipment tray outside the scene along the bottom. Put short labels close to the parts they explain. On narrow displays, use deliberate focus views instead of shrinking the whole room and its controls.
- Use three depths: distant painted castle scenery; the interactive machine, cage, and animals; a restrained foreground stone ledge or foliage. Foreground decoration must not cover controls.
- Establish one palette: cool moonlit stone, warm brass, dark iron, and soft animal colors. Use rounded edges, consistent texture detail, and shadows where feet and machinery contact the floor.
- Add restrained life: breathing animals, ear turns, a small torch flicker, occasional dust, and rope settling. These should reinforce the scene without competing with the puzzle.
- Keep the puzzle camera steady during interaction. After success, a small camera move can reveal the cage opening while retaining the mechanical connection in view.

## Animal animation

Use articulated animal models with distinct idle, alert, exit, and celebration behavior. A walk or hop cycle must accompany travel along the escape route, with correct foot contact, direction, and changing occlusion behind cage bars. Simply sliding an animal picture out of the cage is insufficient for the intended quality.

| Animal | Waiting | Reaction and escape |
| --- | --- | --- |
| Rabbits | Breathing, nose movement, occasional ear turn. | Ears lift at the click; crouch, push off, hop, land, and hop again. Stagger the six departures so they do not overlap or move in perfect sync. |
| Foxes | Tail movement, a head turn, occasional sniff. | Look toward the released latch, approach cautiously, then trot through the open door. One may glance back before joining the others. |
| Owls | Blink, head turn, slight feather movement. | Notice the grille lifting, unfold wings, push off the perch, then flap and glide along a clear exit arc. |

Keep the configured animal counts. Patrol and route cages follow the staging constraints in the existing concept document and must not award duplicate rescues.

## Proposed success sequence

These timings are initial art targets, to be tuned in the prototype:

1. **0–0.4 seconds:** the correct arrangement settles; a clear mechanical click confirms alignment.
2. **0.4–1.2 seconds:** the connected rod or cable moves and withdraws the cage latch.
3. **1.2–2.2 seconds:** the door opens with appropriate hinge or pulley movement. Animals react while waiting for clearance.
4. **2.2–6 seconds:** animals leave in a staggered sequence with footsteps, hops, or wingbeats; the final escape can extend this timing for larger groups.
5. **Afterward:** the open cage and animals in their safe destination remain visible. A short rescue message appears; the student controls when to continue.

The route must be ready before animals enter it. Pause freezes the sequence; reduced motion presents readable key states and a clear final rescue state. Provide mute and replay controls. Replaying the animation must not record another completion.

## Implementation proposal after confirmation

Start with one complete Patrol synchronizer scene: one readable lock, its visible linkage, one cage, and the full escape sequence. Confirm its staged animal assignment before asset selection. Review actual art and animation quality before applying the same approach to the other workshops.

Keep mathematical evaluation authoritative and independent from decorative motion. Animate mechanisms from the evaluated state so visual physics cannot accidentally change exact answers. Load animal assets and their named clips through the existing Three.js stack. Build a small reusable sequence for latch release, door clearance, animal exit, and the final state, driven by workshop configuration.

Performance targets are smooth interaction on a typical school laptop, with measured frame time and loading size during the prototype. Reuse models and textures, load only the active workshop's assets, limit dynamic shadows, pause offscreen animation, and provide lower-detail settings where measurement justifies them. Do not add heavyweight postprocessing before the scene's core art and animation are convincing.

## Review criteria

- The selected mechanism and labels are immediately readable.
- The entire cause-and-effect chain from correct answer to open cage can be followed visually.
- Animals have believable poses and movement, clear the doorway, and reach a visible safe destination.
- Cage bars correctly obscure animals while they are inside, and shadows ground them as they leave.
- Composition remains usable on a narrow screen and with keyboard/tap controls.
- Pause, reduced motion, mute, replay, and saved progress behave predictably.
- Only Castle Rescue configuration and its scoped presentation are changed during implementation.

No game code, dependencies, animal assets, or installed software were changed in this research pass.
