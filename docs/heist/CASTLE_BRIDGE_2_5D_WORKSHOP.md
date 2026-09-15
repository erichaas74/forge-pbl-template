# Castle Rescue — Bridge engineering workshop

15 September 2026. User authorized building and polishing the next level after Owl. Scope: Lesson 6 only. Read project activity rules, design guidance, graphics workflow, implementation handoff, and engineering rules. Inspected the running Grade 5 bridge before changes.

## Selected interaction and visual passes

Considered a freeform bridge builder, a top-down route map, and a connected anchor/cable machine. The connected machine preserves the authored two-stage mathematics: position an X/Y carriage using the coordinate clue, then fit the correct cable to a marked route. Both stages remain directly accessible in testing. Correct parts engage automatically, but the physical crossing requires both. Short cables stop before the final hook; long cables sag. The working bridge lowers fully before a linked gate lifts and the existing six-rabbit rescue group crosses from its holding enclosure. This passage adds no rescue award.

Ranked weaknesses in the old live scene: (1) repeated headings/controls crowd out the activity, (2) no actual bridge or river, (3) separate generic release diagram, (4) small flat handles and measurements, (5) no visible animals or safe crossing. Passes: compose the river, bridge and holding cage; build the two-stage control station; connect and animate the release; refine materials/lighting; inspect and correct desktop/mobile interaction and framing.

```text
TEMPLATE_CAPABILITY_GAP
Requested: connected two-stage 2.5D bridge and holding-enclosure crossing.
Reason: existing spatial renderers show isolated flat diagrams and a generic latch.
Reusable extension: optional MachineDefinition.presentation.kind = "bridge-cage"
for a coordinate + cable pair. Expose all stage answers read-only to the renderer,
and route native stage selection through the existing component boundary.
```

Reuse Three.js diorama viewing, material ownership, procedural surfaces, articulated rabbit rigs, exact coordinate/cable evaluators, bounded input and trial ownership. Preserve authored goals, routes, inventories, grade pathways, saved drafts, seals, and fallback controls. No new dependencies, downloads, deployment, or edits to other projects.
