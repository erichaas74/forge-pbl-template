# Time Repair: the missing Reformation opening, version 2.3.0

Scope: Time Repair only. The four-week history restructure now starts with Martin Luther's
1517 Ninety-five Theses and the printed controversy that helped the Protestant
Reformation begin. The student sees a fictional missing event: Luther's idea is
written and can travel by hand, but failed print circulation keeps the wider
debate from reaching other towns. The student then follows the ink clue back to
the earlier Mainz workshop and repairs the European press model. This is a local
testing build. Every lesson, the final example, and both final-session scenes
remain freely accessible; there is no completion gate. The complete arc is
documented in [the four-week restructure](FOUR_WEEK_HISTORY_RESTRUCTURE.md).

## What the student actually does

| Lesson | Main-panel interaction | Visible consequence / learning evidence |
| --- | --- | --- |
| 1. Find the missing event | Inspect a wall of five fictional newspaper headlines, place a candidate event in the gap, and test it against every record. | The student infers that the manuscript exists while reliable printed circulation is missing. |
| 2. Hear the quiet debate | Hear a bookseller, student, and church visitor from the alternate timeline; inspect each object and weigh the three accounts. | Independent viewpoints confirm the social symptom without becoming fake primary sources. |
| 3. Read the alternate newspapers | Open three fictional issues and inspect two columns in each before tracing the press trail. | Repeated reports connect local debate and thin supply to a physical printing failure. |
| 4. Interview the failed workshop | Hear an ink mixer, type setter, and courier; inspect their physical clues and weigh a testable cause. | Ink adhesion, a holding frame, and travel emerge as linked conditions to test. |
| 5. Test the failed press | Test inks on paper and metal, change pressure one variable at a time, and pull clean proofs. | Controlled trials identify the physical failure without turning it into a single-cause history claim. |
| 6. Build the Gutenberg system | Fit and operate the frame, mold, ink ball, and screw, then test the assembled system. | The repair week shows that repeatable printing depends on linked crafts. |
| 7. Read the history that happened | Inspect the surviving-edition cards for Leipzig, Nuremberg, and Basel and trace the documented print trail. | Real evidence shows printing widened the debate while leaving other causes visible. |
| 8. Compare the repaired timeline | Inspect documented events, switch between repaired and real records, place the best explanation, and test it. | The final account distinguishes evidence, model results, and counterfactual inference. |

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
- Existing press/courtyard artwork and behavior remain for the Week 3 repair
  workbench; investigation scenes use the dedicated timeline, newspaper, and
  interview compositions.
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

- Package and lesson plan: `exploration-time-repair@2.3.0`.
- Template: additive `time-repair@1.1`, `inventionRescue.version: 1.0`.
- A session with `mode: knowledge` must declare a valid `knowledge` configuration,
  extension version `1.0`. Other modes cannot carry this configuration.
- Ten registered capabilities: `invention-knowledge.{timeline,newspaper,interview,
  circulation,reconstruction,assembly,diagram,apprentice,distribution,access}`.
  The current four-week package uses the three investigation kinds plus assembly;
  the earlier knowledge scenes remain reusable capabilities. Renderer and behavior registries
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
- Versions 1.0, 2.0, and 2.3 and their saved work remain separate. No record migration,
  grades, team publication, or server-authoritative writes were added.

## Verification and limits

Final checks on 2026-09-15:

- Production Angular build passed, output `output/time-repair-week-build`.
  Existing stylesheet budget warnings concern other project components.
- Targeted Time Repair/catalog/lesson/registry run: 70 passed across 11 test files.
  The broader standards suite still has one pre-existing assertion concerning
  `castle-archive-rescue`, whose review mapping is absent for its current version;
  it is outside this project's changes.
- Architecture check reports the same two existing violations:
  `core/index.ts` importing `./templates`, and the Mystery Substance
  `lab-kit/render-quality.service.ts` location. No Time Repair violation reported.
- Browser review covered the current eight lesson routes and operation of the
  timeline, newspaper, interview, assembly, and press scenes, including the
  Week 1 missing-event investigation.
  Reviewed at 1280×720, 1024×768, and 390×844; confirmed horizontal scene panning,
  no page-wide overflow, and task-before-tutor order on the narrow layout.
- Corrected code and finished lesson content are served at the original local
  preview port, 4324. Version 2.3 uses a separate save scope from earlier
  packages.

The browser pass operated all eight lesson routes and the timeline, newspaper,
interview, press repair, and assembly interactions. Automated checks cover the
four-week mapping, domain outcomes, malformed configuration/events, duplicate
replay, actor/version isolation, keyboard operation, session switching, and the
activity-only shell. Testing remains ungated so every lesson is directly
reachable during review.

The AI Tutor remains explicitly disconnected. Grade 7 standards alignment remains
pending a verified crosswalk. These qualitative models have been functionally
tested; classroom pacing, independent discoverability, and learning effectiveness
still need teacher/student review. Review this project before moving to another.

Recommended next review: observe whether students can separate the missing-event
inference, the physical cause, the Week 3 repair evidence, and the documented
historical record. Use that evidence to refine difficulty and pacing within the
four-week arc.
