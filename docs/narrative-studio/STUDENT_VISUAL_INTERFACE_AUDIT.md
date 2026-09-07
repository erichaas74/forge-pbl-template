# Survival Island Story Lab: student visual interface audit

Earlier interface audit, September 6, 2026. Superseded for branching layout by the 1.3 update below. Audited from the implemented Angular route at 1366 × 768 and 390 × 844. This describes the local student preview, not a future classroom host.

## Student journey and page purpose

| Surface                   | What the student sees                                                                                                                                              | What the student does                                                                                        | Visual role                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Project opening           | One cinematic island image, three illustrated historical moments, and a short first-idea prompt                                                                    | Chooses a real historical setting, writes one fictional story spark, and confirms it                         | Establishes the story world before the editor appears. The setting images are choices, not decoration.                    |
| Story Map                 | A top-to-bottom family-tree diagram with nine scene nodes, colored and numbered decision lines, three endings, save state, and one highlighted “Write next” branch | Begins here, chooses the highlighted branch or any open node, and sees where every option leads              | Is the permanent workspace background. Every decision scene shows “What do you do next?” and exactly two options.         |
| Scene Writer              | A paper-like writing overlay above the still-visible map, with prose tools and two reader-decision fields                                                          | Writes one scene and its two decisions, saves in that node, closes the overlay, then chooses the next branch | Keeps story structure and current position visible behind the work. On narrow screens, the editor becomes a bottom sheet. |
| Playtest                  | A reader-style overlay with historical setting, scene prose, the decision question, and two numbered choice buttons                                                | Reads their own story as a player and tries routes to different endings                                      | Changes from authoring to reading without removing the structural map behind the work.                                    |
| Publish                   | A readiness-and-rubric overlay above the story map                                                                                                                 | Opens incomplete scenes, completes at least two ending paths, then publishes an immutable playable snapshot  | Keeps readiness connected to the branches it evaluates.                                                                   |
| Planning Guide (optional) | A guided conversation overlay above the story map                                                                                                                  | Can answer six planning questions in their own words, or return to the map without doing so                  | Supports students who want prompts without replacing the branching story as the main interface.                           |
| Story Notes (optional)    | An editable notes overlay above the story map                                                                                                                      | Can review or revise protagonist, goal, fear, mystery, relationship, object, point of view, tone, and title  | Works as an optional reference, not a publication requirement.                                                            |
| Completed example         | A clearly labeled fictional Grade 5 story in the same playable format                                                                                              | Reads and chooses through an exemplar; may open historical/source context                                    | Provides a model without presenting sample work as the student's draft.                                                   |

## Visual system

- The light LMS bar owns Projects, Opening, and Example.
- The dark Story Lab header owns project identity, save status, four core stages, two clearly labeled optional supports, and the contextual Guide.
- Pale sea-glass backgrounds identify author workspaces; warm paper cards identify writing, reading, and readiness artifacts.
- Teal marks structure and navigation, coral marks the active/committed path, gold marks guidance or the recommended next stage.
- Georgia is reserved for story titles and reading content; the sans-serif face handles controls, status, and instructions.

## Findings and first-pass corrections

1. **Stage changes removed orientation.** The previous focus routine scrolled the new heading to viewport y=0, hiding both navigation bands. Stage changes now reset the document to the top, keep both headers visible, focus the new page heading without a second scroll, and center the active item inside the stage scroller.
2. **The project header expanded too far on narrow screens.** The six stages previously wrapped. They now remain a single horizontal sequence beneath a compact identity/save/Guide row on narrow screens and share one row on laptop layouts.
3. **The next useful stage was difficult to distinguish.** A small gold marker and accessible label now identify the runtime's recommended stage without locking exploration.
4. **Planning used more vertical space than the task required.** The selected historical boundary and conversation controls are tighter, while the fact boundary and source stay visible.
5. **The old Branch Map showed cards without structural connections.** It is now a family-tree-style diagram. Every decision node contains “What do you do next?” and two options; curved connection lines use the same option numbers and colors.
6. **The writer hid story structure behind a separate page and scene list.** The live diagram is now the permanent background. Writing, planning, notes, playtesting, and publishing open as overlays; the working node remains highlighted behind them.
7. **Playtest and Publish retain intentional reading scroll.** Playtest keeps readable prose and choice targets. Publish may scroll because the checklist is meaningful content, but project-stage navigation remains available while the student works through it.
8. **Guided planning behaved like a prerequisite.** Story Map is now the default first surface. Planning Guide and Story Notes open as optional overlays and no longer block publication when blank.

## Remaining product decisions

- The local preview truthfully says “Saved locally.” Authenticated classroom persistence, teacher review, and authoritative publication remain host integrations.
- Validate the revised hierarchy with Grades 5–8 students: ask them to write two decisions, trace each numbered line, save the scene, close the overlay, and choose the highlighted next branch without adult explanation.

## 1.3 branching update

The editor now starts with one opening, two blank decisions, and two unwritten branches. The map occupies half the desktop page and the selected scene occupies the other half. Each choice opens its destination directly. Students can add two further choices, write a fatal dead end, or finish with a survival ending. Ending a branch preserves later drafts for restoration. The map uses readable cards and a scrollable canvas, with distinct death and survival labels.

The completed example has eleven scenes, two deaths and three survival endings. Reader choices and map selection update the story on the other half of the page. The old overlay workflow and nine-node starter described above are historical findings, not current requirements.
