# The Fate of the Republic — continuing debate flow

User direction recorded 2026-09-15. Scope: the Roman debate project first.

## Product direction

The main viewport is the ongoing debate. Students repeatedly exchange arguments, learn a specific way to critique or strengthen them, and produce the next response. The teaching sequence changes the work within that debate; it does not replace the debate with separate weekly games.

This supersedes the claim-map-as-main-workspace recommendation in the earlier activity audit. Keep the audit's observed defects, including dead source controls, hidden provenance, missing playback, oversized standards and absent task/tutor boxes. The interaction redesign now follows the user's exchange-and-revision cycle.

Confirmed by the user's description:

- First individual lesson: hear the prompt, choose a side, form points and produce an opening argument.
- Group lessons: exchange arguments with another group or individual, develop a rebuttal, and submit it by the end of class.
- Following individual lessons: review the received arguments, learn an argument/critique technique, and produce a refined argument.
- Continue that pattern through the four weeks.
- The ongoing debate remains the main screen.
- Students review and judge other students' contributions on their own side, providing peer critique that helps improve the next argument.
- The ending includes ranking the best individual debate performers.

The follow-up resolves the unfinished ranking sentence: same-side peer critique during the project, then a final ranking of debate performers. Speech examples remain optional. Manual speech-authoring placement still needs resolution under activity rule 4.

## Eight-session sequence

Skill topics below are proposed curriculum choices. The individual/group cadence and class-end argument products follow the user's direction.

| Week | Individual lesson | Group project lesson |
| --- | --- | --- |
| 1 | **1. Open the debate.** Hear the shared prompt, inspect the initial evidence, choose a side, build two or three supported points, and produce an individual opening argument. | **2. First exchange.** Briefly review a same-side peer's opening, then receive an opposing opening from a paired group or individual. Identify its claims, discuss which can be challenged, and submit a supported rebuttal before class ends. |
| 2 | **3. Examine the reasoning.** Review the received rebuttal. Learn to distinguish a claim, its evidence, and the reasoning connecting them. Apply that criterion to another same-side student's contribution; use peer critique received on your own work to submit a refined individual argument. | **4. Second exchange.** Exchange the refined arguments, select the opponent's strongest point, and formulate and submit the next response. |
| 3 | **5. Strengthen the rebuttal.** Learn fair representation of an opposing claim, source credibility and the difference between answering a claim and attacking its speaker. Critique a same-side peer's rebuttal, then use the technique and received feedback to submit a revised argument. | **6. Third exchange.** Exchange revised arguments. Test the opposing evidence and reasoning, acknowledge a valid point where appropriate, and submit a focused response by the end of class. |
| 4 | **7. Prepare the closing case.** Review the full exchange. Learn synthesis, concession and clear oral delivery. Review a same-side peer's performance and use received critique to produce an individual final argument that answers the strongest remaining objection. | **8. Final exchange and judging.** Deliver closing cases, inspect the complete debate, and rank the best individual debate performers using the taught criteria. Submit the final group response/closing; individual reflection stays in the tutor area. |

Each session has an explicit class-end product. “Reviewed,” “drafted,” “submitted,” “delivered” and “assessed” must remain separate states. The lesson selector never creates a submission or unlocks an official exchange.

## Main viewport interaction

Use one persistent, two-sided debate record. Group or individual names identify authors; faction color provides a secondary cue. Compact round markers organize the chronology. Submitted speeches retain their exact text, sources, media and author; revisions are additional versions, not replacements.

Selecting a contribution opens its playable speech and transcript in the active debate area. The learner can:

- hear/read the debate prompt and choose a side on day one;
- hear/read the received argument;
- select the exact claim they intend to answer;
- mark a claim, source or reasoning link for critique;
- inspect an attached source's citation, context and perspective;
- attach evidence to the next response;
- compare an original argument and its revised version;
- open an assigned same-side peer contribution and attach criterion-based critique to an exact passage or playback moment;
- inspect peer feedback on their own contribution before revising;
- record, replay and retake their speech;
- submit the response, which appears linked to the argument it answers once confirmed;
- review individual performers' contributions and submit a final ranked ballot.

The newest received contribution and current response should be visible together. A reply link allows the learner to follow the exchange backwards. Reopening an old session shows the historical record and its revisions without overwriting current drafts.

The first screen contains the prompt, side selection and opening workspace. It must not begin with fictional class submissions already filed into Round II. Demonstration material belongs in a clearly labeled example surface.

### Learning within the same screen

On individual days, a short lesson or example opens on demand within the debate stage. The student applies the day's criterion to another student's actual contribution on the same side, gives peer critique, and uses received critique to improve their own next argument. An optional example can model the method first. The selected claim and draft survive transitions between reviewing a peer, answering an opponent and revising one's own work.

On group days, the latest received submission is the starting object. The group identifies a target claim and constructs the response. No invented opponent contribution appears when a real submission is missing: the screen identifies the missing exchange and preserves preparation work.

Immediate feedback should describe observable actions: a passage is marked, a source is attached, a response targets a particular claim, a new version exists, a recording has been replayed, or delivery is confirmed. Those states do not imply that AI has evaluated the quality of the argument.

### Same-side peer critique

Assign each learner another author's contribution on their own side. The review target is a specific submitted version, with the author, source evidence and playable performance available together. Reviewers identify a strength and a concrete improvement using the day's criterion. Proposed criteria are evidence, reasoning, directness/fairness of rebuttal and delivery. Marking a passage or playback moment anchors the critique; any written explanation belongs in the tutor-side authoring area.

The author sees the critique attached to the reviewed version, can return to its cited moment, and produces a new version preserving the original. The record should show which feedback informed that revision. Peer review does not replace the opposing-side exchange, and an ally's critique must not be displayed as an opponent's rebuttal. Exclude self-review from peer assignments and retain the reviewer and target version for traceability.

### Final performer ranking

The ending ranks **individual debate performers**. The ballot shows each eligible performer's contributions so students can replay and compare their performances against the criteria practiced during peer review. Proposed scope is performers from both sides; the result identifies peer-selected performers, with the voting scope and aggregation method visible.

Use keyboard-accessible rank controls, with no duplicate performer in a ballot. Ranking depth and aggregation belong in configuration rather than being invented inside the UI. Ballots can be revised until the configured close; confirmed results are derived from submitted ballots. Keep individual performer attribution even when the submitted argument was produced by a group. Peer critique, final ranking, teacher assessment and automated mastery remain distinct; the disconnected AI Tutor does not judge the performances.

### Optional speech examples

Possible speech-study actions: compare two excerpts, identify a taught technique, mark the moment that demonstrates it, and revisit the choice after discussion. These examples support the student's peer-review skill; they do not replace reviewing actual classmates or the final performer ballot.

No authentic famous-speech clips have been selected or verified for this design. Existing ten-second fictional senator videos are introductions, not examples of historically authentic great speeches. Any included clip needs verified playback and an accessible transcript/caption path; no placeholder player or generated still sequence should be presented as the requested video.

## Shared shell and side area

- Shared project title/ID and week/session navigation.
- One compact standards row with the full mapping in an accessible dialog.
- Main column: the debate itself and controls operating it.
- Side column, in order: current tasks/intended product; AI Tutor planning box.
- Both side boxes collapse; preserve their order on small screens.
- AI Tutor remains explicitly disconnected. No active tutoring, scoring or adaptation claims.
- Advanced tools open on demand. Every opened surface appears in view and receives appropriate focus.

Proposed authoring placement, awaiting the user: a manual draft surface opened from the tutor side area, with speech playback and recording in the debate stage. Preserve argument points, prose, sources and revision history. Do not disable written products or delete saved drafts to make the layout appear compliant. If the user explicitly chooses main-screen drafting, record that scoped exception and follow it.

## Feasibility and reusable architecture

### Reuse

Reuse Debate Studio's configuration-driven factions and sources, exact-passage annotations, private draft persistence boundary, media adapter, recorded contribution metadata, runtime event envelope, idempotency pattern, native dialogs and versioned lesson/standards registry.

### Required extension: repeated individual/group exchanges

`TEMPLATE_CAPABILITY_GAP`

Requested: every individual can submit an opening/revision, groups can receive an assigned argument and send a rebuttal, and each subsequent session continues that chain.

Current constraint: the existing turn plan creates one turn per faction per round. A faction's current turn advances from filed turns, not from the eight-lesson teaching sequence. It has no pairing record for multiple groups or individual recipients, and no explicit revision-to-prior-submission relationship.

Suggested reusable capability: a versioned debate exchange cycle with:

- a participant reference of either student or team, supplied by authenticated runtime context;
- teacher-assigned pairings and a scoped conversation/exchange ID;
- lesson number and individual/group activity type;
- immutable submitted argument versions;
- an explicit `replyToSubmissionId` for rebuttals;
- an explicit `revisesSubmissionId` for refinements;
- source/passage references and recording asset metadata;
- separate private drafts and confirmed shared submissions;
- class-end due time/release configuration and pending/delivered status;
- same-side peer-review assignments excluding the reviewer, with critique records tied to a submitted version and passage/playback moment;
- final ranked ballots referencing individual performer IDs, separate from faction verdicts and formative peer critique;
- configured ballot eligibility, ranking depth, close state and aggregation, retaining individual attribution for group contributions.

Use an optional capability configuration and validate its references. Register commands/events and keep domain transitions in framework-independent TypeScript. Do not put Roman project-name conditions into the runtime. Preserve existing debate and inquiry packages while introducing the cycle, and publish the materially changed Roman curriculum as a new project/lesson-plan version rather than mutating enrolled work in place.

### Required connection: real participant delivery

`TEMPLATE_CAPABILITY_GAP`

The active debate launcher rejects server-authoritative sessions and injects memory adapters. The older Firebase adapter also guards client demo mutations; it does not provide verified classroom pairing and delivery authorization.

Real exchange therefore requires an authoritative gateway using the host's tenant, class, student/team membership and permissions. Confirmed submissions should be immutable, retry-safe and scoped to their intended participants. Durable media uses the storage adapter. Local memory fixtures may exercise this flow in tests and an explicitly labeled preview, but are not delivery to another learner.

## Implementation order once placement is resolved

1. Add the exchange-cycle contract, validator and pure transition tests: opening, delivery, reply, refinement, immutable history, duplicate submission and wrong-recipient rejection. Add same-side review eligibility, no self-review, stable critique targets, unique ranked candidates and ballot-close checks.
2. Configure the eight Roman lessons and aligned skill targets; separate teaching-session selection from submission/release state.
3. Replace the Roman entry path with the continuing debate view. Keep the main activity readable and interactive on laptop and phone; add the required compact shell and task/tutor side area.
4. Connect authoring in the agreed location, source inspection and real recording/review. Preserve prior versions and drafts.
5. Connect real pair delivery through the authoritative adapter; make pending and confirmed delivery distinct. Verify with two participant contexts before calling exchange complete.
6. Add same-side peer critique and the final individual-performer ballot. Add speech-study examples only when real accessible media is selected and verified. Keep peer judgments distinct from teacher grades and AI assessment.
7. Check direct entry to all eight sessions, reload persistence, keyboard use, 390px layout, playback/retake, all eight class-end products, critique-to-revision history, individual attribution in group performances, final ballot results, and existing Debate Studio compatibility tests.
8. Review this project with the user before moving to Hammurabi on Trial.

## Work completed in this design turn

Recorded the user's cadence, replaced the earlier proposed main-workspace concept, mapped all eight sessions, and inspected the current turn, persistence, session-context and media boundaries. The follow-up adds confirmed same-side peer critique and final individual-performer rankings, replacing the earlier tentative ranking interpretation. Application code, lesson mappings and tests were not changed; no new build/test run was needed for documentation-only changes. Manual authoring placement remains open; speech examples are optional.
