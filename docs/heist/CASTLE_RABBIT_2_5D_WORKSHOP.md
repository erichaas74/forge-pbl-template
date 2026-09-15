# Castle Rescue — Rabbit courtyard workshop

15 September 2026. Authorized scope: build the rabbit workshop, following review of the Patrol lock. Preserve the other locks and all existing drafts.

## Selected interaction

The approved fraction-sector cog is the primary object in a shallow Three.js courtyard. Learners select or drag labeled, thick metal sectors from a tray, rotate them by the configured notch, and seat them around one axle. A translucent preview shows the candidate position; intersecting sectors cannot seat. Gaps remain visible. The existing exact fraction evaluator determines whether a full cog has been assembled.

A complete cog engages an adjacent drive gear and turns a winch. A visible cable lifts the cage grille in its guides. Once the opening is clear, six articulated rabbits crouch, push off, hop, and land along staggered routes. The open cage and rabbits remain visible. The original rescue counts and authoring-preview boundary are preserved.

Alternatives considered were a sliding fraction strip and loose gear selection; the sector assembly was selected because its geometry directly exposes equivalent fractions, a whole, gaps, and overlap. This is Week 2's individual session; the later compound fox gear train remains unchanged.

## Capability and implementation boundary

```text
TEMPLATE_CAPABILITY_GAP — resolved
Requested: a fraction cog with physical placement, a linked lifting cage,
and articulated rabbit escape animation.
Reason: the existing fraction renderer cannot present that connected scene.
Reusable capability: optional FractionGear.presentation =
{ kind: "fraction-cage", rabbits: 6 }, validated and rendered in the template.
```

Use existing Three.js, shared materials, and mesh batching. Rabbits are original procedural articulated models with separate ear, head, body, and leg transforms; no external asset or new dependency is required. Keep presentation, exact rules, timeline, input, persistence, and authoring UI separate. Add a strict presentation-only draft migration. Enable the capability only in Castle's four rabbit grade configurations.

## Implemented behavior

The scene is implemented in `src/app/templates/heist/escape/locks/fraction-cage/`, separated into scene/input orchestration, geometry, articulated rabbit models, timeline/placement helpers, native control layout, draft migration, and tests. The shared `isCageDiorama` predicate enables the existing compact scene host and preview tools for either opted-in cage renderer. Other workshops retain their previous presentation.

The tray contains proportionate sector thumbnails with fraction labels. Pointer dragging and keyboard/tap controls both send existing `piece` inputs. A start-notch selector and single-notch rotation controls expose exact placement; lifting and emptying remain reversible. Green/red previews show valid/overlapping candidates. The metal sectors have actual axle cutouts and individual teeth; their fraction labels remain upright as sectors and the assembled cog rotate.

A complete whole engages the drive automatically after a short settling interval. The cog meshes with the small drive gear and winding drum, a continuous cable lifts the grille in tall guides, and all six rabbits leave after the opening is clear. The rabbits have individually moving heads, ears, and four legs, with breathing while waiting and crouch/takeoff/flight/landing during hops. Their departures are staggered, and their final positions are offset so all six remain visible. Replay, pause, reduced motion, whole-scene/cog/rabbit focus, and expanded mode are available. Expanded mode supports Escape and keyboard focus containment.

No external rabbit model, texture download, new package, or license dependency was added. The procedural models are original project assets expressed as geometry. Existing Three.js, shared metal materials, mesh batching, and synthesized sound helpers are reused. The observed completed scene uses 128 draw calls with six articulated models, a pixel-ratio cap of 1.35, and a 1024 shadow map. Geometry, materials, textures, environment, audio, listeners, observers, and renderer are released on scene teardown.

## Mathematics and saved work

Only the four optional `fraction-cage` presentation settings were added to Castle configuration. A structural comparison against `output/castle-rabbit-baseline/project.json` confirmed that removing those additions reproduces the complete baseline configuration exactly. Fractions, 24-notch rings, 48 teeth, grade inventories, success rules, rescue bindings, and all other project content are unchanged.

The original evaluator still determines a whole with no gaps or overlaps; the presentation helper only rejects attempted placements that collide. All four grade inventories retain a reachable solution. A strict migration accepts the added presentation without accepting changed fractions, inventory, other-workshop settings, or malformed data. It composes with older Patrol and piston migrations.

Direct-entry previews remain unrestricted for workshop testing and do not record assessment completion. Automatic release adds one preview trial; replay adds no further trial, seal, or rescue award. The rabbit group remains six, and the fox/owl rescue groups are unchanged.

## Verification

- **40 test files, 247 tests passed** in the complete Heist/Castle regression run: `output/castle-rabbit-regression.log`.
- **2 test files, 21 tests passed** after final animation/label refinements: `output/castle-rabbit-final-focused.log`.
- The final full application production build passed: `output/castle-rabbit-build.log`. Existing unrelated component style-budget warnings remain non-blocking.
- Geometry tests verify the actual axle aperture, moving cable attachment, articulated model count, final rabbit separation, and upright labels. Sequence tests cover gaps, overlaps, exact completion, settling, once-only engagement, paused time, reduced motion, saved solved poses, and replay.
- Browser verification covered initial closed cage, seating a half, rejecting an overlapping quarter, placing two quarters to complete the whole, automatic opening, and six rabbits ending outside the cage. A replay held at release time `0.22` while paused, then continued after Resume.
- At a **390 × 844** viewport, a half-sector was dragged directly from the tray onto notch zero. Native controls and reduced-motion completion also worked, and the cage focus clearly showed all six final rabbits. Grade 8 displayed its distinct `7/24`, `5/12`, and other fraction inventory correctly. Temporary viewport overrides were reset afterward.
- The solved rabbit arrangement survived reload. The existing Grade 5 balance draft still showed `1/2 + 1/4 = 3/4` with one aligned pin, two empty scales, and **19 prior trials**. No saved-preview conflict was shown.
- Scoped whitespace checks passed. Architecture audit still reports the two prior unrelated issues: `core/index.ts` importing templates and a service under `projects/mystery-substance/lab-kit`. This pass did not edit those files. Audio cues are wired but were not audibly reviewed.

## Review point

[Open Lesson 3](http://127.0.0.1:52102/projects/castle-archive-rescue/experience?lesson=3) to try the rabbit workshop. Review this lock before starting the **clockwork fox gear train**. The five later locks remain at their prior implementations; no deployment was made.
