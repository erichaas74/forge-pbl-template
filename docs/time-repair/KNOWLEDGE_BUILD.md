# Time Repair: knowledge experiences, version 2.1.0

Scope: Time Repair only. Implements the six additional knowledge-sharing ideas
approved with “implement them all,” alongside the existing ink investigation and
return to the changed courtyard. This is a local testing build. Every lesson,
the final example, and both final-session scenes remain freely accessible.

## What the student actually does

| Lesson | Main-panel interaction | Visible consequence / learning evidence |
| --- | --- | --- |
| 1. Reconstruct the lost book | Lift six surviving fragments from two damaged copies, rotate them, and fit the missing drawing together. | Wrong orientations break the geometry. The completed drawing connects across all six joins; neither donor preserves the whole page. |
| 2. Build from other people’s knowledge | Fit a frame, mold, ink ball, and screw, then operate the four contributions. | Cast pieces accumulate, the frame holds them, ink changes their surface, and the screw lowers the platen. Matching parts alone cannot produce a clean impression. |
| 3. Rescue the failed demonstration | Run the existing ink tests and printing press, inspect proofs, and compare pressure with ink changes. | Incompatible ink remains poor despite added pressure. Proofs retain their tested settings. |
| 4. Which diagram can you trust? | Assemble both printed gear diagrams, crank them, move the central axle, and stamp a revision. | The faulty layout has a gap and collision. A working train transmits movement. Printing can preserve an untested mistake; a successful revision records a tested arrangement. |
| 5. Keep the workshop running | Arrange failed proof → faulty part → repair → clean proof, demonstrate the sequence, and send the expert away. | An untrained apprentice produces a failed sheet. A taught repair works independently. Ink, packing, and type require separate examples. |
| 6. Follow a page through town | Load a two-copy bag, walk connected streets and a bridge, deliver, and return for more. | Copies move with the messenger and leave the bag on delivery. The bookseller gains stock, a learning room constructs a model, and a private collection gains comparison material. |
| 7. More books, different barriers | Offer copies, loans, translations, and shared reading to three people. | Copies alone leave cost, language, or reading barriers. Suitable support plus information lets each person construct the object on their table. |
| 8. Return to the repaired future | Repair the press, compare the courtyard before/after supply, finish sheets, and deliver them. | Existing production logic ties physical supply to usable impressions. Visiting either scene never requires completion. |

The geometric pages, diagrams, town, people, and apprentice episodes are fictional
teaching props. They do not claim to be Gutenberg publications or measured
historical outcomes. The source notes retain the distinction between Gutenberg's
European printing system and earlier Asian printing traditions. More copies are
not presented as instant literacy or universal access.

## Visual-development review

Read `docs/design.md`, `docs/GRAPHICS_AGENT.md`, and the standing activity rules.
Inspected the running 2.0 workshop before the new visual pass.

Priority order identified from that inspection:

1. Repeated press composition concealed different learning purposes — high impact.
2. Knowledge transfer needed visible people and destinations — high impact.
3. State changes needed to alter objects, not only side-column feedback — high impact.
4. Parts and paper required reliable, non-overlapping interaction targets — high impact.
5. Consistent scale, depth, and narrow-screen access — medium impact.

Built dedicated compositions and object responses before changing any surrounding
UI. The shared header, compact expandable standards row, task/tutor placement, and
existing project navigation remain the shell. No instructions, forms, score cards,
headers, footers, settings, or navigation bands were added to the main activity.

### Assets and rendering

- `scene-tools.ts`: original reusable SVG timber room, leaded window, light,
  wood grain, books, ink ball, mold, screw, packing, metal type, people, and drawing.
- Paper investigations use SVG because sharp diagrams, physical examples, and
  exact joins remain legible when scaled. Controls support pointer and keyboard.
- `distribution.scene.ts`: lazy Phaser town with layered terrain/river, streets,
  timber buildings, open rooms, object shadows, finite piles, messenger movement,
  carried books, and destination changes. Angular owns configuration and saving.
- Existing press/courtyard artwork and behavior remain for lessons 3 and 8.
- No raster placeholders, fake videos, media uploads, or external asset downloads.
- Motion follows operations and respects reduced-motion preferences. On phones,
  the scene can pan horizontally to preserve object size; planning boxes stack
  beneath in task-then-tutor order.

Browser review caught and fixed overlapping SVG fragment hit regions, an axle hit
region that covered its neighbor, disconnected drawing joins, invisible socket
borders, live changes to already printed assembly evidence, and books that briefly
appeared at a destination before their messenger. Apprentice parts now differ
physically; identical clean proofs are interchangeable.

## Reusable engineering contract

- Package and lesson plan: `exploration-time-repair@2.1.0`.
- Template: additive `time-repair@1.1`, `inventionRescue.version: 1.0`.
- A session with `mode: knowledge` must declare a valid `knowledge` configuration,
  extension version `1.0`. Other modes cannot carry this configuration.
- Six registered capabilities: `invention-knowledge.{reconstruction,assembly,
  diagram,apprentice,distribution,access}`. Renderer and behavior registries
  dispatch by capability kind; no project-ID branches were added.
- Registered events: `inventionKnowledge.<kind>Operated`. Each event has the
  normal runtime envelope and a validated operation payload.
- Domain functions model constraints and record trial evidence independently of
  presentation. Configuration validates fragment references, mechanism roles,
  solvable axle geometry, connected route graphs, supply, readers, and case IDs.
- `KnowledgeRuntime` is scoped to the workspace, with a persistence interface
  and a browser adapter. Saved events replay against the current session.
- Storage namespace: `invention-knowledge.v1`, scoped by tenant, project/version,
  class, actor, team, attempt, and session through `ScopedBrowserStore`.
- Up to 800 operations and 40 trial summaries per session. Exports contain the
  operation evidence and current state. Reset and export live in the task box.
- A destroyed town cancels its scene; Phaser is imported only when the town mounts.
  A loader token permits component tests without loading a graphics driver.
- Versions 1.0 and 2.0 and their saved work remain separate. No record migration,
  grades, team publication, or server-authoritative writes were added.

## Verification and limits

Final checks on 2026-09-15:

- Production Angular build passed, output `output/time-repair-week-build`.
  Existing stylesheet budget warnings concern other project components.
- Combined Time Repair/catalog/lesson/standards run: 61 passed, one failed.
  All seven Time Repair test files passed. The failed broader standards assertion
  concerns `castle-archive-rescue`, whose review mapping is absent for its current
  version; it is outside this project's changes.
- Architecture check reports the same two existing violations:
  `core/index.ts` importing `./templates`, and the Mystery Substance
  `lab-kit/render-quality.service.ts` location. No Time Repair violation reported.
- Browser review covered all eight lessons and operation of all six new scenes.
  Reviewed at 1280×720, 1024×768, and 390×844; confirmed horizontal scene panning,
  no page-wide overflow, and task-before-tutor order on the narrow layout.
- Corrected code and finished lesson content are served at the original local
  preview port, 4324. Version 2.1 uses a separate save scope from 2.0.

The browser pass operated all six new activities, including a failed trial and
successful correction where applicable, pointer/keyboard town delivery, and
restored session work. Automated checks cover domain outcomes, conservation,
malformed configuration/events, duplicate replay, actor/version isolation,
keyboard operation, session switching, and the activity-only shell.

The AI Tutor remains explicitly disconnected. Grade 7 standards alignment remains
pending a verified crosswalk. These qualitative models have been functionally
tested; classroom pacing, independent discoverability, and learning effectiveness
still need teacher/student review. Review this project before moving to another.

Recommended next review: observe students explaining why the printed diagram can
be wrong, and whether they can distinguish distributing copies from making them
usable. Use that evidence to refine difficulty and pacing within these scenes.
