# Student simplicity audit and two-header redesign plan

This is the pre-rebuild audit. See [Student first steps: rebuild and review](STUDENT_FIRST_STEPS_REBUILD.md) for current implementation results.

September 5, 2026, America/Denver. Status: historical audit preceding the first-steps rebuild linked above.

## Decision

The current task must own the center of the screen. Put all navigation between projects, spaces, stages, and records in the LMS header and project header. Use the remaining screen for the student's actual work. Replace permanent instructional banners with visual affordances and clickable, contextual guides.

This is a structural redesign. Shorter paragraphs, smaller headings, and more “next task” banners will not resolve the underlying competition for attention.

**Learning correction from the follow-up audit:** the central task must be the educational operation itself. Students calculate, interpret evidence, test a claim, or revise their own work. Keep the source material and problem-solving step visible; only extra instructions and scaffolding belong in Help. A clickable scene that calculates or explains everything for the student does not satisfy this plan. See the [learning skills and showcase audit](LEARNING_SKILLS_AND_SHOWCASE_AUDIT.md), including the confirmed missing mathematics in Trading's opening.

## What was checked

Fresh browser inspection on localhost:4200 covered the catalog and a current workspace in each of the seven projects: Science scanner, Trading market, Museum hall, History network selection, Debate chamber, Journey sponsor choice, and Story setting/planning. Also inspected Trading's opening and revised launch, and Debate's completed example. Screenshots used the existing browser viewport, approximately 1905 × 904 screenshot pixels; these are not new 1366 × 768 measurements.

Read the shared host, launch, catalog, sample, and seven project shells, plus relevant task templates and styles. Later-stage recommendations below include source-based findings; they are not claims that every runtime state has been browser-tested. The implementation acceptance inventory explicitly includes the remaining states. No trade, assessment, student submission, or publication was completed during this audit. Opening navigation can update local demo resume state.

The earlier [navigation audit](PROJECT_NAVIGATION_LEARNING_AND_VIEWPORT_AUDIT.md) remains useful historical evidence. Its old page-height measurements must not be reported as current: the launch now places Start in the first-task section, project details collapse, and the teacher guide now uses a dialog. Journey and History have segmented task steps. This plan replaces the earlier recommendation to add a permanent task/purpose/readiness statement to every activity.

## Findings grounded in the current implementation

Severity describes task-discovery risk, not a measured student success rate.

| Surface | Current problem | Required change |
|---|---|---|
| Shared project frame — critical | `app.html` is only a router outlet. Every template supplies its own header, while `project-host.component.html:13` adds another launch/example bar. There is no consistent LMS/project navigation ownership. | Build one shared two-header frame. Merge the host's links into it and replace template-owned navigation chrome. Do not put two new headers above the existing headers. |
| Catalog — high | `project-home.component.html` repeats “Choose your next project,” “Student project library,” and “Project catalog.” Cards contain subtitle, description, goals, release status, type twice, and launch; Trading also offers Builder info. The art is largely an emblem in a tall column. | Put a short catalog label in the LMS header. Make the center a visual project selector: recognizable scene/product thumbnail, project name, concise subject/grade, and one open/continue affordance. Move learning-goal detail and builder information to the appropriate optional/adult view. |
| Launch/opening — high | `project-intro.component.html:7,48,94` links to the same finished example in three places. Headline, takeaway, role, hook, first-task copy, product format, and preview copy compete. The improved Start is visible, but the screen is still a landing page. | Put Example and Replay opening in the project header. Use one opening scene or product preview and one central Start/Resume task. Keep the real decision in an opening scene central; move extended story/dialogue into help or transcript. Returning students resume their work. |
| Science — high | `mystery-investigation.component.html:2–111` stacks case bar, specimen selector, equipment navigation, and next-step/checklist strip. The scanner also repeats observation directions, with an evidence browser permanently beside it. | Put stage/equipment navigation and evidence access in the project header. Keep the specimen itself and experiment controls in the central bench. Open evidence alongside the bench only when needed. Show the observation target and response together. |
| Trading — critical | `simulation-decision-shell.component.html` adds mission bar, left navigation, five HUD cards, context navigation, next-mission banner, then a workspace with another heading. The browser shows the shop scene starting below all these layers. Shopping-plan chrome competes before a shop has been selected. | Remove the rail, separate context row, and mission banner. Put spaces/tools in the project header. Show only decision-relevant cash/capacity near the trade; make score breakdown and ledger optional. Shop storefronts become the central choices; selecting one replaces the stage with that shop's work. |
| Museum — critical | `exhibit-hall-page.component.html` stacks topbar, hall status, curator banner, repeated project introduction, prototype process, statistics, gallery toolbar, then the corridor. “My exhibit,” “Continue/Start my draft,” and “Build final exhibit” compete. Unloaded models appear as large “360° / Load 3D object” placeholders. | Show the hall or the current artifact/editor as the main stage. Put Hall/My exhibit and view options in the project header. Remove duplicate entry buttons. Use artifact poster images while models load, retaining source attribution and explicit 3D activation. Maintain clear Example/My draft state. |
| History — high | `history-live-page.component.html` stacks host bar, newsroom header, demo banner, nine-stage navigation, rubric disclosure, and task heading. Network cards have strong pictures but substantial text overlays. `assignment-desk.component.html:76` adds another back button, header, standard statement, and pitch navigation. | Keep one current stage and its tasks in the project header; expose the full path there on demand. Center the two network choices, then the selected story or pitch task. Move rubric, reporting standards, and prototype explanation to Help/About. Preserve a compact truthful demo indicator. |
| Debate — critical | `debate-studio-page.component.html:130–146` literally tells students to open a glowing argument on a side rail. The browser shows a large central status statement, the actionable “Hear & mark” on the left, and an initial-opinion decision below. Two tasks compete. | If initial opinion is the current requirement, center that decision alone. When listening is current, center the speaker/play action and then the passage to mark. Move round/record/evidence navigation into the project header. Retain the chamber art as context. |
| Journey — critical | `journey-shell.html` gives most of the width to the map and puts the sponsor decision in a narrow right column. A left utility rail and bottom chapter rail add navigation/progress outside the headers. `journey-decision-panel.component.html` adds another task navigator and repeats route choices in a comparison section. | Center sponsor and provisioning choices. Let the map own the center when the task is geographic; place route alternatives directly on/with that map. For reading and explanation, the source/response workspace becomes central. Put chapters, log, replay, and utilities in the project header. Combine route choice and its comparison data. |
| Story — critical | `narrative-studio-page.component.html:27–59` stacks stage navigation, recommendation banner, and heading. The observed setting choice occupies a left panel while a large coach/chat input occupies the main area before a setting is chosen. Writing adds a scene rail and permanent craft prompt. | Begin with central illustrated setting choices. Only then show the current planning question. Put stage and scene selection in the project header. Give the current scene and its reader choices the main workspace; open the coach on request. Remove the recommendation banner. |
| Final examples — high | `project-final-example.component.html` wraps native presentations with its own nav, title, teacher CTA, restart, and exit footer. The Debate sample has Previous/Next in the programme and Prior/Next again below the presentation. | Use the same two-header frame, compact Example badge, and one presentation stage. Put project exits, chapter/slide selection, and example tools in the project header. Keep play/pause/record controls with the media. Teacher guidance remains on demand and visually secondary. |
| Generic investigation fallback — high, source-only | `investigation-shell.component.html` renders phases, case board, and final submission sequentially. It would perpetuate the same stack in newly configured projects. | Adopt the same shell and one active workspace for the generic template. Do not limit the redesign to the named demo projects. |

## The screen contract

### Two headers, with explicit ownership

**LMS header:** Projects/library, existing learner/class/account controls where supported, and accessibility/settings. Use the same placement in every project. Do not invent backend/account features as part of this UI change.

**Project header:** Project identity, current stage/task, a compact stage/tool picker, progress/save state, and Help. Opening, Example, records, replay, and full project path are reached here. Within a task, its substep replaces the relevant header controls rather than adding a third row. On narrow screens use labeled menus in these same headers; do not restore bottom navigation or sidebar navigation.

The catalog needs only the LMS header because no project is selected. Within a project there are exactly two persistent header bands. Fullscreen presentation is an intentional viewing mode, with one clear way to exit.

Navigation between pages/spaces belongs at the top. Controls that perform the actual work belong with the work: choose a vial, pick a route, inspect an artifact, enter an answer, run an experiment, record audio, confirm a trade, or submit the finished task. Do not move these central actions into distant headers under the label “navigation.” Pure Next/Back/page-jump controls belong in the project header. An action such as “Record this decision” remains next to the decision even if successful completion advances the workflow.

### One central task stage

Target ordinary laptop header heights of roughly 48px + 64px; account for their actual rendered height. At 1366 × 768 this leaves approximately 656px for the task. This is a starting layout budget, not a reason to clip text at zoom or small widths.

The primary task group is centered in the usable area below the headers and uses most of it. Center the entire decision/work group, not merely its heading. The active artifact, experiment, route, speaker, or editor supplies the page's visual identity.

- One short task heading, preferably an action/question of about 3–10 words.
- Default to no instructional paragraph. If essential, one brief line beside its control.
- Two to four visible choices for naturally small decisions. Preserve a genuine larger choice set using a central chooser; never delete curriculum options to satisfy a quota.
- Equal visual emphasis for open-ended alternatives. Highlight the next interaction, not a purported correct answer.
- One dominant commit action when the task requires confirmation. Selection, review, saving, and saved states must be visibly different.
- Put decision-relevant costs, units, source labels, and consequences directly with the choice. Essential information must not be hidden to make a screen look cleaner.
- After an action, reveal its result in the same stage. Move logical focus to that result; do not append an offscreen section and expect the student to find it.

Keep meaningful short text labels, accessible names, and source/reading material. “Visual first” does not mean unlabeled icons, tiny text, or removing the reading and reasoning students are learning to do.

### Clickable guides and future tutor

The project-header **Help** control opens help for the current task. Start with three concrete options when relevant: **Show me**, **See an example**, and **Word help**. Show one helpful item at a time.

“Show me” highlights the real target and gives one short instruction next to it. A guide never clicks or completes the student's work. An example illustrates the interaction or reasoning with clearly separate sample content. Word help opens the selected term. Keep longer instructions, rules, learning targets, rubrics, transcripts, and replayable demonstrations available here.

Use an anchored callout or a contained overlay that preserves the task's position. On narrow screens the guide can temporarily replace the stage and return to the same task/focus. Avoid permanent blank tutor panels and unsolicited chat prompts. Essential guidance must work with keyboard and touch, with a visible close action and focus restoration.

Implement working, configuration-driven help first. Later an AI tutor can consume the same student-safe task context and guide targets through an adapter. Do not add a provider SDK, speculative AI service, disabled tutor mock field, or answer-key data to this redesign. Students must be able to complete the work without AI.

## Implementation sequence

### 1. Shared frame and launch cleanup

Create a small shared presentation frame and typed UI descriptors for navigation, active task, optional help, and save/progress status. Existing template adapters supply their own descriptors and actions through the project context. The frame owns spacing, the two headers, focus behavior, and the main content slot; templates continue to own task content and runtime rules.

Update `runtime/project-launch/project-host.component.*` and the common launch/example components together. Remove `project-return-bar`; move its destinations into the new frame. Do not leave duplicate headers behind during migration. Update the catalog at the same time. Start/Resume should open the existing correct next task rather than another promotional page.

Acceptance: catalog, launch, activity, and example all have a clear, consistent exit path and no repeated destination buttons in the body/footer. There is no third navigation strip.

### 2. Prove the layout in Trading and Journey

These expose different problems: Trading's vertical stacks and Journey's misplaced decision column. Keep their strong scene/map assets. Remove the shell layers identified above; center the active task according to its state.

Trading sequence: shop selection → selected goods/calculation → transaction review → visible result. Route and cargo choices remain central workspaces. Costs/cash/capacity stay visible where they affect the decision; score, ledger, and full inventory are optional views.

Journey sequence: sponsor choice → source → response/citation → review/record. Keep existing required evidence and explanation validation. The follow-up learning audit found that prediction is displayed but is not required by the current response validator; add explicit before-consequence prediction sequencing where the learning task calls for it. When route choice is active, show the candidate routes and relevant data together on the central map. Save each draft across substep changes.

Acceptance: the shared frame handles both a visual simulation and a reading/writing decision without a project-name branch in shared code. No extra mission banner is needed to explain how to reach the task.

### 3. Apply to every other project workspace

| Project | States to redesign and verify | Central work |
|---|---|---|
| Science | Scanner, Properties Lab, Reaction Bench, Matter Tracker, Shelf Restoration, Bay 3 Response, evidence/comparison, explanation, final case | Active sample/experiment and observation; selected evidence with claim; final argument/review. Equipment selection at the top; the sample and instrument controls stay with the experiment. |
| Museum | Hall, wing/artifact inspection, each composer station, full visitor review | Artifact/collection first; selected artifact and current authoring field together. Station selection at the top. Composer becomes the project workspace instead of a second navigation system over the hall. |
| History | Opening, network, story, pitch subtasks, research, script, production, preview, student scheduling status, watch | Selected network/story, one pitch group, source-to-claim work, active script cue or recording scene. Producer-only operations stay in the adult experience. |
| Debate | Initial opinion, listen/mark, evidence, response preparation/recording, moderator question, crossfire, final opinion, premiere | One current speaker/argument/response. Past turns are accessible from the header. Approved classroom sequencing and record integrity remain enforced. |
| Story | Setting, planning questions, Story Memory, branch map, scene writer, reader-choice authoring, playtest, publish/review | Current choice or scene. Story Memory groups related fields; the branch map visibly connects scenes. Reading may scroll, while pending reader choices remain discoverable. |
| Generic investigation | Phase/task selection, registered activities, board, evidence, final sections | One active registered workspace. Verify with the existing second-project/fossil fixture, not only Mystery Substance. |

All later-state rows require browser verification during implementation; source review is insufficient to sign them off.

### 4. Completed work and all seven examples

Apply the same stage sizing and navigation ownership to each native final presentation. Remove duplicated sample titles/actions and footer exits. Teacher/builder guidance belongs under an appropriately labeled header control, not the primary student CTA. Keep one visible Example indicator, honest saving state, and required credits.

Reserve room for playback and task controls before sizing maps, models, video, or slides. Long transcripts and artifacts may scroll intentionally. Loading media should have a useful poster or accessible content alternative, rather than a wall of blank viewers.

### 5. Verify comprehension and regressions

For every state in the inventory, check fresh entry, resumed draft, selected choice, opened guide, validation failure, saved result, loading, unavailable media, and locked/waiting state where relevant. Include direct route entry and transitions between tasks.

At 1366 × 768, 1920 × 1080, tablet/narrow widths, and 200% zoom:

1. Navigation between spaces/stages exists only in the top two headers. Opening a picker does not create a permanent third toolbar.
2. The actual task/decision is visible on entry and dominates the central usable area. It is never pushed aside by a map that is not needed for that step, or down by an introduction.
3. The target and action/result are together. A student does not have to scroll past banners to find the first meaningful interaction.
4. Opening Help does not push the activity down the document. Closing it restores position and focus.
5. Selection is visible through more than color; controls have short visible labels, keyboard focus, and touch targets around 44px.
6. Longer reading and writing can scroll/reflow without clipping content or hiding required work in an unannounced second scrollbar. At zoom, allow more page height instead of shrinking text or cropping the task.
7. Errors identify the affected choice/field locally. A blocked action exposes the specific missing requirement, not a large general checklist or hover-only tooltip.
8. Existing rule gates, teacher permissions, autosave, draft restoration, recording, transaction review, revision history, and submission behavior still work.

Use meaningful integration/component tests for header registration/cleanup, guide focus and dismissal, task transitions preserving drafts, and unchanged runtime validation. Run `npm run build`, `npm test -- --watch=false`, and `npm run test:architecture` after implementation. Test the generic frame with at least two substantially different templates and the investigation reuse fixture. Do not substitute screenshot counts or keyword assertions for interaction checks.

Then observe students in the intended grades on short representative tasks. Before explaining anything, ask them to point to what they would do next. Record time to identify the target, wrong navigation attempts, scrolling/searching, and help use. A useful provisional target is finding the next interaction within five seconds without an adult reading directions aloud. This is a proposed product check, not a research-backed guarantee. Revise layouts that fail it.

## Architecture and specification alignment

Preserve configuration/runtime/persistence separation, registries, existing commands/events, and template-specific learning behavior. This work changes presentation ownership; it does not require a new rule engine, backend, AI integration, or breaking project schema. Reuse existing task/readiness state instead of maintaining a second UI completion model. Help and navigation descriptors should be optional, typed, and registered through template adapters.

The older Investigation shell specification explicitly enumerates a mission strip, phase navigator, workspace selector, and next-action strip. The Trading shell specification explicitly describes a left rail and persistent HUD. Those arrangements conflict with this requested two-header direction. During implementation, update those layout sections intentionally while preserving their purpose, state, and action contracts. Do not retain their obsolete layout merely because it is already documented, and do not alter curriculum requirements to accommodate the layout.

Relevant specifications: [Investigation shell](investgations/UI_01_INVESTIGATION_SHELL.md), [Trading shell](Simulation-Decision-template/UI_01_FRONTIER_TRADING_SHELL.md), [component contracts](build/04_COMPONENT_CONTRACTS.md), and [project launches](architecture/PROJECT_LAUNCHES.md).

## Deliverable record

- Added: this audit and implementation plan.
- Modified application files: none; existing working-tree changes preserved.
- Tests added/changed: none. Build/tests not run for this documentation-only task.
- Validation performed: fresh browser inspection of the listed surfaces and source/specification review.
- Architecture decision: shared ownership of two headers, one central task, optional contextual guides; template runtime behavior stays intact.
- Specification changes: planned layout updates identified above; none applied in this task.
- `TEMPLATE_CAPABILITY_GAP`: none established for the audited learning tasks. Shared presentation/help primitives are proposed UI work; future AI tutoring remains a separate integration.
- Next implementation phase: shared frame and launch cleanup, then Trading and Journey as the first complete task flows.
