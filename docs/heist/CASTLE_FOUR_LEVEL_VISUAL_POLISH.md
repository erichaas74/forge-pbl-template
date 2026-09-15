# Castle Rescue: first four levels, iterative graphics pass

15 September 2026. User requested a recursive visual polish pass after supplying `docs/design.md` and `docs/GRAPHICS_AGENT.md`. Read both and the project activity rules. Inspected live, expanded Balance, Patrol, Rabbit and Fox scenes before changing those scenes. Owl construction was already in progress and remains included in this turn; Bridge is not included.

## Ranked observations and focused passes

1. Balance has an isolated mechanism surrounded by repeated headings and controls; too little usable scene area. Add a stone workshop niche, compact the existing controls, and use the existing on-demand saved setups surface. Highest impact.
2. Wall and floor blocks across the scenes read as plain geometry. Add small reusable stone and wood surface maps, preserving each scene's palette and existing geometry.
3. Patrol and Rabbit show coarse shadow edges, with uniformly lit metal faces. Refine their shadow resolution and lighting; keep strong legibility of holes, fraction boundaries and labels.
4. Courtyard/window openings lack architectural depth. Add recessed stone arch details behind existing cages and restrained garden details outside the escape routes.
5. Gear mechanisms need clear working surfaces and rotation detail at laptop scale. Inspect focus views, adjust framing/labels if needed, and verify the whole escape sequence after the material pass.

Asset classification: retain the authored 3D mechanisms, original articulated rabbits, and existing licensed fox models. Add original procedural stone/wood textures and structural details. No new libraries or downloaded asset packs. Mathematical dimensions, trial/award ownership, commands, saved drafts and grade pathways remain unchanged.

## Completed passes

1. **World and materials.** Added a recessed stone niche and wooden workbench behind Balance, procedural grain and surface variation to all four workshops, stone arches for Patrol and Rabbit, restrained courtyard flowers, and concentric machined details on Fox's cogs. All additions stay clear of controls and animal routes.
2. **Lighting and composition.** Raised Balance, Patrol, and Rabbit shadow maps to 2048; refined Rabbit's environmental lighting. Compacted Balance's existing header, seal selectors, and weight tray, and reused the optional Saved setups surface. The expanded scene now has room for the entire mechanism and tray.
3. **Reinspect and repair.** Desktop review caught a moon overlapping Patrol's arch; moved it into the opening. The first mobile pass exposed inherited vertical Balance header styling and a fixed-height viewport. Corrected both and rechecked the full five-weight tray at 390 × 844. Expanded Balance now prevents background page scrolling. Tap placement returns keyboard focus to the selected weight.
4. **Interaction regression review.** Balance weights still move the corresponding pistons; a temporary decimal weight was returned to the tray. Patrol's crank advanced and rewound to its saved tick. Rabbit and Fox replays completed with six and four animals outside respectively, preserving their saved arrangements and trial counts. All four expanded mobile layouts were visually inspected.

## Assets and systems modified

- Original procedural stone/wood maps: `src/app/templates/heist/escape/locks/diorama-surfaces.ts`. Two small 128 × 128 maps per viewer; no remote requests. The same module builds the stone arches.
- Balance environment: `src/app/templates/heist/escape/balance-lock/balance-lock.environment.ts`. Its scene, layout, component template, and scoped styles handle lighting, framing, focus, and expanded sizing.
- Patrol and Rabbit model/scene files handle surface and shadow improvements. Fox's model file adds surfaces and machined cog details; existing licensed fox models and animation clips are retained.
- The week workspace's existing compact presentation now also accepts the optional piston renderer. It has no Castle-specific project-name condition.

## Validation and limits

The final strict Castle production build passes. **270 tests across 42 files pass**, covering the Heist workshops, runtime, launcher, persistence, and new Owl work. Browser review covered expanded desktop and narrow-screen views, saved setups, mechanical feedback, and escape replays. No authored math, required awards, rescue counts, or grade pathways changed. No other project was edited.

The full app build remains blocked by unrelated concurrent Time Repair errors; the repository architecture audit also has two existing violations outside this work. Castle's initial production bundle gives a 544.45 kB soft-budget warning. Build/test logs are in `output/castle-optics-build.log`, `output/castle-optics-all-tests.log`, and `output/castle-optics-full-build.log`.

## Remaining weaknesses and recommended next pass

The scenes now have stronger depth, surfaces, and working-space hierarchy, but asset detail varies between procedural rabbits/owls and the existing fox pack. At phone width, dense machines still depend on focused camera views or horizontal exploration. The next highest-value visual pass is consistent animal silhouettes and material treatment across the implemented scenes. Review these four polished levels and the completed Owl workshop before authorizing another workshop.
