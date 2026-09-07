# Mystery Substance: one-workbench usability review

Reviewed September 5, 2026. Scope: student navigation, equipment discovery, evidence lookup, continuity, and clarity. This is a recommendation, not an implemented redesign.

## Recommendation

Make the four vials the organizing center of one persistent workbench. Keep the chosen vial, equipment, current experiment, relevant references, and saved results together. Change the tool on the bench instead of taking the student to another room to read or write.

Retain the useful simulations, instrument interactions, evidence provenance, and reasoning requirements. Reduce the interface work needed to use them. A single long page containing every station would still be difficult to use; show one active experiment with its supporting information.

## Method and limits

I inspected the live experience on the local preview, including the entry screen, Properties Lab, evidence list, equipment record, and return to the lab. I also reviewed the host, station, evidence, theory, and runtime code. Browser findings below were observed directly; draft and lifecycle risks are identified from code. This was an expert walkthrough, not a student usability study or a complete scientific-content audit. No learning gains or measured student completion times are claimed.

The older `MYSTERY_SUBSTANCE_FIXES.md` contains useful history but some descriptions are stale. This review uses the current implementation. In particular, captured results already leave the student in the station; the problem now is leaving the station to inspect supporting information.

## Findings, in priority order

| Priority | Current behavior | Why it is confusing | Recommendation |
| --- | --- | --- | --- |
| First | Properties Lab → select Water trial → Evidence Locker → return to Properties Lab resets the selection to Optical scan. | A routine lookup interrupts the experiment and requires setup again. | Open references beside the active experiment; preserve vial, tool, draft, and stable trial state across view changes. |
| First | Opening Virtual Test Kit changed the header from 0/07 to 1/07 phases and changed “Next” to writing a working theory. | Reading an equipment card looks like substantive investigation progress. The next instruction arrives before the student has compared substances. | Separate reading status, recorded trials, and learning milestones; calculate the next suggestion from actual evidence and an explicit prerequisite model. |
| First | Virtual Test Kit is an equipment record with “Supports / Uncertain / Contradicts,” but no direct equipment action. | A student looking for a tool gets a reasoning form. There is no visible claim that the equipment could support. | Equipment cards explain purpose and offer “Use on this vial”; procedure/reference cards provide instructions; evidence records offer claim-based reasoning. |
| First | The comparison matrix is inside a result's evidence detail, outside the active lab. | Comparison—the main intellectual task—requires leaving the experiment and remembering a record title. | Keep an expandable results table immediately below the experiment, linked to original saved trials. |
| Next | Ten main destinations appear in the rail: bench, six stations, evidence, notes, final. The station cards repeat the choices. | The opening looks like a menu of applications. A horizontal rail also makes later destinations easy to overlook. | Replace the rail with a compact tool tray and three broad stages: Investigate, Explain, Share. Keep case overview secondary. |
| Next | The evidence list contains 20 entries, mixing case documents, equipment, references, results, and locked future records. Opening a record replaces the list. | Students must scan a long list and repeatedly close details to compare records. | Default to records relevant to the chosen vial/tool. Keep the list available alongside one detail. Add an obvious “All records” scope, simple category chips, and search. |
| Next | “Specimen Scanner,” “Optical scan,” “Surface scan,” “Probe trial,” and “Calibrated probe” compete as names. | Students have to translate between rooms, instruments, and scientific purposes. | Lead with the question the tool answers, with the scientific name beneath it. Consolidate overlapping observation entry points. |
| Next | Station logs and coverage are local signals; the host creates station components without saved-result inputs. Selecting another tool/vial resets a local observation. | A saved trial can exist in the runtime while a reopened station looks empty. Unfiled text is vulnerable during ordinary navigation. | Rehydrate trial history from runtime results and store drafts by session + activity + vial + test. Never use a visual empty log to imply no work exists. |
| Next | Header, station coverage, phases, final prerequisites, and footer guidance use different progress calculations. | “Done” has different meanings in different places. | Use one task-status model to drive the checklist, next action, and final readiness. Reading a card and gathering enough evidence must remain distinct. |
| Later | Notes, questions, theory slips, evidence notes, and final explanation each create another writing surface. | Students may not know which writing belongs where or whether they must copy it again. | One “My explanation” area with linked evidence; preserve scientific observations as their own records and reuse them in the explanation and final presentation. |

## Proposed student workspace

### Top: orientation and vial selection

Use a short mission such as “Identify the four vials and explain your evidence.” Keep Vial A, B, C, D, and Compare together. The selected vial persists when changing tools or opening a record. Show a compact current task and save indicator. Put the full mission and complete checklist behind clearly labeled controls.

Keep familiar lab imagery in the experiment, while making controls and text easy to read. Avoid multiple large activity headings and instructional blocks above the equipment. At 1366 × 768, the selected vial, selected tool, primary experiment action, and a way to open related evidence should be visible together. This is a design target to verify, not a claim about the present layout.

### Left: equipment with purpose

Provide a small visible tray of tools grouped by observation, physical tests, and reaction tests. Each has a stable name, recognizable image, and short purpose:

- Look closely — magnifier: inspect grain shape.
- Test in water — water cup: compare dissolving and settling.
- Measure conductivity — probe: compare the electrical readings of prepared samples.
- Compare texture — surface scanner: examine particle size without touching the sample.
- Test a reaction — reaction rig: compare changes under the specified conditions.

Put the procedure and applicable reference next to the selected tool. For example, the water test opens its equal-mass/equal-water instructions in place. A reference lookup must not replace the active lab. Show a specific prerequisite beside a disabled action and provide the action needed to resolve it. Do not gate tools behind unrelated evidence-card visits merely to create an escape-room feeling.

The separate scanner and the optical tool overlap. Reuse the initial observation in later comparisons, or clearly distinguish what additional information the second scan supplies; do not require identical observations twice simply because there are two interfaces.

### Center: one active experiment

Selecting equipment swaps only the experiment surface. Preserve the interactive measuring, pouring, and observing where those actions serve the learning objective. Keep the current step and one main action nearby. Provide keyboard and click alternatives to dragging. A short first-use demonstration can teach the apparatus using a separate practice specimen without revealing the mystery identities.

Make “Run completed,” “Observation draft,” and “Evidence recorded” visibly different. Consider automatically saving a completed trial as provisional measured data while asking the student to add an observation before using it as evidence. Never auto-complete an entire learning activity merely because data was logged. Store bounded trials and meaningful checkpoints, not animation frames.

### Right: relevant evidence, available immediately

Default the tray to “For this vial and tool” with a visible “All records” option so relevance filtering does not hide potentially contradictory evidence. Show relevant procedure/reference cards and the student's own saved results. Search should match titles, descriptions, equipment aliases, vial labels, and unlocked content. A query for “water,” “probe,” or “color” should produce a direct usable result.

Selecting a record opens its details within the tray, with the active experiment still present. Label unproduced results “Not tested yet” with the corresponding tool action instead of a generic locked panel. Keep future assessed/challenge content distinct where curriculum progression requires it.

Separate three meanings that are currently mixed:

- **Case clues:** found documents or observations to interpret.
- **Tool guides:** instructions and references to consult.
- **My results:** measurements and observations the student generated.

For supports/contradicts, display the actual selected claim: “Does this result support your idea that Vial A is …?” Allow “Not sure yet.” Store the relationship to the claim and its revision if this becomes a durable assessment feature; do not make one global classification stand for every future theory.

### Below the experiment: comparison and explanation

Show a compact A–D results table with rows for the tests. Only display data the student has obtained. A “Not tested” cell can select that vial/tool on the same bench. Keep every cell linked to its original trial and conditions. Do not silently combine unlike conditions or discard repeat trials.

Put “My explanation” beside or immediately after that table. Selecting “Use this result” adds a linked citation rather than requiring the student to retype a reading. Keep separate fields for observation and interpretation. When the student reaches Share, reuse the saved claims and selected evidence with an explicit review step; do not manufacture a new empty final form.

### Small screens

At narrow widths, keep the same selected vial and experiment, use a compact tool chooser, and open evidence in an adjacent expandable section or accessible sheet with a clear return action. Do not squeeze three desktop columns into a phone. Avoid several competing horizontal rails and nested scroll regions. Preserve focus and drafts when opening and closing supporting information.

## A concrete journey to improve

Today, a student on Water trial has to leave for Evidence Locker, scan a mixed list, open a reference, return to Properties Lab, and restore the test selection. The selected test reset was observed directly.

Proposed: choose Water → open “Water guide” beside the beaker → close the guide → continue the same trial. There are no changes of workspace, and the selected vial, conditions, and notes remain. After recording a result, it appears in the table and evidence tray without another navigation step.

Do not remove the work of deciding which test is useful. Remove the work of locating and reopening it.

## Delivery order

1. **Continuity and honest guidance:** protect drafts, retain tool/vial selection, hydrate saved logs, and fix misleading completion/next-action behavior. Agree curriculum completion rules before changing assessment gates.
2. **One-place evidence access:** embed the shared evidence detail beside the active station, add direct tool/reference links, and expose the existing result matrix in the bench. This is the most useful first redesign slice; start with Properties Lab.
3. **Simplify the shell:** replace duplicate station navigation, unify names, add contextual/all-record lookup, and make comparison and explanation persistent.
4. **Refine progression:** revisit duplicate scanning, add an apparatus demonstration, and consider moving Bay 3 into a clearly labeled later transfer challenge. Whether it is required is a curriculum choice, not an automatic UX change.

## Implementation boundaries

Reuse the existing station simulations, evidence detail, result-history records, and runtime persistence adapters. Extend the reusable Investigation workspace with configurable tool/reference relationships and a shared evidence dock. Keep curriculum labels and relationships in project configuration. Preserve project identities, saved scopes, previous observations, and hypothesis revisions.

The current `activeActivityId`-based rendering removes the station when evidence is opened; separating supporting-record visibility from active-experiment selection is the key UI change. Draft persistence should use existing adapter boundaries. If adding tool-to-reference metadata or claim-specific evidence links requires new fields, use validated optional extensions and compatibility tests rather than project-name checks in shared components.

No new backend, framework, or AI tutor is needed for the first slice. Search indexes must respect unlocked/authorized content; do not index hidden solutions into the student UI.

## Acceptance checks

These are proposed targets for validation, not measured outcomes:

- On a 1366 × 768 student device, choose a vial and tool without navigating away from the bench.
- Open a related reference in one action; the current tool, vial, and draft remain when it closes.
- Start a water observation, look up a reference, and return with every typed character intact.
- Record a trial, leave/reopen or reload, and see the same saved trial and coverage in the lab and comparison table.
- Opening a tool guide does not claim that the investigation or a scientific comparison is complete.
- Every “Next” instruction has a relevant action and agrees with the final-readiness checklist.
- “Use this result” links the existing record to the explanation without copying its data.
- Keyboard and touch users can choose a tool, read its guide, record a result, and return to the experiment.
- Test with 5–6 representative students: find the water test, retrieve an earlier observation, compare two vials, and cite a result. Note hesitation, wrong turns, help requests, and lost context; revise before expanding to every station.

## Evidence and source map

Local implementation references:

- `src/app/features/mystery-investigation/mystery-investigation.component.html`: rail at line 34; mutually exclusive activity view at line 169; station output-only binding at line 276; separate reasoning workspace at line 431; footer guidance at line 516.
- `src/app/features/mystery-investigation/mystery-investigation.component.ts`: next-action logic at line 453; workspace change clears activity at line 495; scanner selection resets observation/tags at line 631.
- `src/app/projects/mystery-substance/properties-lab.component.ts`: local selection, draft, logs, and coverage at lines 50–57; reset and local record behavior at lines 223–259.
- `src/app/projects/mystery-substance/mystery-investigation.service.ts`: opening one record completes the locker activity at line 98; capturing a station result completes its activity at line 260.
- `src/app/templates/investigation/ui/evidence-locker.component.html`: one detail replaces the unfiltered list.
- `src/app/templates/investigation/ui/evidence-detail.component.html`: generic lock message, hidden-in-detail result matrix, source link, and claim classification form.

External grounding: W3C's [cognitive accessibility guidance on finding information](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o2-find/) supports clear structure, prominent tasks, and findable content. It is supplemental guidance, not a claim that this review establishes WCAG conformance. NSW CESE's [cognitive load practice guide](https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory-practice-guide.pdf) discusses split attention and bringing related information together. Applying those principles to a persistent lab/evidence workspace is my design recommendation; the sources do not test this application.

Review deliverables: this report and an illustrative interactive workbench concept. No application code or curriculum requirements were changed during this review. No new automated tests were added or build run because the deliverables are recommendations; the earlier bug-fix validation is separate.

## Subsequent implementation

The user approved building the workbench while preserving the graphics. See [the implementation and validation notes](MYSTERY_SUBSTANCE_WORKBENCH_IMPLEMENTATION.md) for delivered behavior, persistence boundaries, retained artwork, and checks. The findings and line references above describe the pre-redesign baseline.
