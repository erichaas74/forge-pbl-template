# Atlantic adventures and consequential choices

The current 1.3.0 framing is specified in [History and player agency](HISTORY_AND_PLAYER_AGENCY.md): players choose their personal participation while documented history stays fixed. The 1.2.0 notes below describe the underlying adventure/resource mechanics retained by that update.

Race Around the World curriculum **1.2.0**. This is a five-chapter fictional Atlantic expedition, not a literal circumnavigation. Costs and events are classroom simulation rules. The previous 1.0.0 and 1.1.0 configuration exports remain intact; browser saves are keyed by project version. No existing student record is migrated or reset.

## The playable plan

| Adventure | Choices and their weight | What learners need to understand | Evidence of success |
| --- | --- | --- | --- |
| Lisbon: the tide waits | Trade brings backing but takes a week; mapping brings chart detail but weaker backing; strong patronage occupies provision space and makes a later detour harder to justify. Destination pins in this chapter represent proposals. | Revenue versus profit, sponsor perspective, limits of a chart. | Explain a sponsor’s motive and identify a cost or a voice absent from the ledger. |
| One berth in the hold | Extra water adds a reserve now; instruments help the direct crossing later; timber and canvas make a southern storm repair cheaper. Only one load fits. | Opportunity cost, navigation instruments, preparing for a particular failure. | Use a source paragraph to match cargo to a route and name what must stay ashore. |
| Lisbon → Cape Verde | Coastal ports conserve supplies; the Azores cost six weeks but restore health and add chart detail; a direct three-week crossing exposes the crew but benefits from instruments. | Wind, direction, waypoints, distance, resource budgeting. | Compare two routes using the map and calculate what will remain, rather than choosing the shortest line automatically. |
| Cape Verde storm → Brazil or the Cape | West costs fewer resources and adds observations, but may disappoint a sponsor. South preserves sponsor expectations; packed repair materials reduce its cost from 25 to 13 supply points, 12 to 4 health points, and seven to five weeks. A mapping mission gains additional knowledge from the western detour. | Updating a plan using damage reports and actual preparation; sunk effort is not evidence that a plan is still suitable. | Defend changing or preserving the route and explain how an earlier choice changes the comparison. |
| Landfall: an agreement to make | Full negotiation brings more supplies and knowledge after two weeks. A smaller explicitly agreed exchange saves time but gives less. Offshore surveying consumes reserves while restoring health and adding limited observations. | Consent, competing needs, translation, source perspective, uncertainty. | Cite a detail from each reconstructed account; acknowledge household reserves and what the expedition still cannot know. |

There is no combined victory score. Sponsor backing and chart detail represent two limited expedition concerns, not human worth or ethical correctness. Students should explain whom their decisions helped, what they sacrificed, and how the result compares with their prediction. Teachers assess reasoning separately from chapter completion.

## Presentation

- Desktop uses an exact 30% left decision rail and 70% map workspace. Tools reuse the rail; map expansion and replay preserve the mounted map.
- At 760px and below, map and choices stack into separate, scrollable regions. Neither obscures the other.
- The map has a persistent five-resource strip. A deck dispatch pairs place labels and story text with lightweight SVG harbor, ocean, storm, and landfall scenes. Ships rock, water moves, and storm rain/lightning animate. Every scene offers pause and honors reduced motion.
- Each chapter has a learn-to-succeed briefing, tradeoff description, and Choose → Read → Predict → Explain → Record navigation. Text/audio explanations, predictions, citations, and revision history use existing runtime services.
- Before recording, learners see projected resources using their actual earlier choices. After recording, an adjacent consequence report shows the narrative and before/after values. Those same resolved consequences enter the saved log and replay. Focus follows the new report.

## Reuse audit and contracts

Reused the journey engine, map, evidence reader, citation workflow, runtime completion event, persistence adapters, replay, and resource bounds. Curriculum content resides in `atlantic-adventures.ts`; there are no project-name checks in the template.

Two optional backwards-compatible fields extend the existing journey choices capability:

1. `step.adventure`: title, narrative, one of four atmospheres, learning goals, and stakes.
2. `choice.consequenceModifiers[]`: an `afterChoiceId` referencing a recorded choice in an earlier chapter, additive resource changes, and narration. Each earlier-choice reference may occur only once within a choice.

`resolveJourneyOutcome` is the single pure calculation for preview, completion, import reconstruction, and replay narration. It sums matching modifiers with base costs, then clamps once to the configured bounds. It uses recorded decisions rather than transient selected choices, has no randomness, and never mutates the package. Existing choices without modifiers retain their original outcomes. Package validation rejects future/missing references, duplicate modifiers, unknown resources, non-finite amounts, and malformed adventure content.

The template and record schema remain 1.0 because the additions are optional and existing configurations remain valid. Curriculum advances to 1.2.0; catalog and server choice policies are synchronized, with prior policies retained. No separate branching engine or new provider dependency was added. No requested TEMPLATE_CAPABILITY_GAP remains.

## Implementation inventory and verification

Added: adventure curriculum; reusable SVG scene component/template/styles; pure consequence resolver and its regression suite; adventure package validator; this design plan.

Modified: current curriculum export and catalog version; journey model optional fields; completion calculation; package assembler; decision and map shell UI/styles/tests; mobile map minimum height; server version policies. The existing world-atlas WebP change was preserved. One unrelated existing Phaser `Scene.update` declaration received the required `override` keyword so the full application builds.

Verification covers all 162 configured choice combinations; benefits that apply only to the matching recorded loadout; exact preview/record/replay agreement; canonical reconstruction after serialization; bounds; old 1.1.0 outcomes; invalid configuration; sidebar presence; learning objectives; and rendered resource consequences. Browser geometry at 1280px: rail 384px, map workspace 896px, zero gap/overlap. At 390×844: map and rail are each 390px wide, in separate rows, with no horizontal document overflow.

Next useful phase: a short classroom playtest in which teams choose different cargo and defend different storm responses using the same evidence. Collect which tradeoffs students can explain before adding more destinations. AI tutoring, video export, and production school enrollment are outside this change.

### Final check results

- Journey, component, persistence, and catalog suite: **35 tests passed across 11 files**.
- Journey server policy suite: **4 tests passed**.
- Full Angular development build passed. A subsequent production build was blocked by the independently edited castle component referencing a missing `src/app/templates/heist/escape/expedition/expedition.component.scss`. This stylesheet was still absent at final review; no placeholder stylesheet was added to conceal the incomplete castle work.
- The architecture checker reports two existing violations outside this change: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a service in a project package.
- Browser layout and learning-brief checks succeeded. Further interactive browser verification was interrupted by the unrelated compile overlay and a browser-tool timeout. The final consequence flow is covered by the passing component and domain tests; a complete manual browser playthrough was not finished.
- `git diff --check` passed for the changed journey/content/policy/documentation paths.
