# Cinematic Book Repair — standalone implementation specification

Date: 2026-09-14  
Status: specification only; no application, asset, or catalog changes are included.  
Scope: a NEW, separate Cinematic Book Repair project and reusable project type. History Time Repair remains a separate, unchanged project.  
Book selection: deliberately unassigned. The user requested the setup only. No novel, character cast, or sample chapter is approved.

Start with [the cinematic 3D project write-up](CINEMATIC_BOOK_REPAIR.md). This document provides the supporting engineering and acceptance specification. The user's latest direction supersedes the earlier idea of converting the History project: do not rename it, replace it, redirect it, or migrate its records.

## 1. Product decision

**Book Repair: Restore the Story** is a literature investigation in which students watch a scene that differs from the assigned book, enter a matching cinematic 3D environment, interview characters, discover what caused the change, perform a precise repair, and return to watch the restored scene.

The central loop is:

**Watch the changed scene → enter its world → investigate and interview → establish the cause → repair it → watch the restored scene → trace the consequence.**

The mystery has two distinct questions:

1. What does the original book establish, and how does this scene contradict it?
2. What interference caused this version to change, and what action would remove that interference?

The first question requires reading evidence. The second requires evidence from the authored mystery. A character's newly written interview response is not a quotation from the novel. The student's repair must account for both questions.

This is a separate literature project type. Its main workspace is a cinematic case and an explorable scene. A sequence of events remains available as an investigation tool. The existing History Time Repair project continues to serve its own purpose.

### Settled requirements

- Cinematic 3D appearance close to the opening and ending videos, with consistent characters, location, lighting, props, and camera language.
- A small, deliberately bounded world with meaningful exploration and character interviews.
- A discoverable reason for the scene's divergence from the book.
- A physical or conversational repair whose effect is visible.
- A rendered correct outcome that faithfully represents the book's event.
- Four weeks, two sessions per week: individual investigation, then group activity. Group activities are local prototypes until shared state is separately implemented.
- Approximately 70% activity and 30% proposed products / disconnected AI Tutor planning on desktop; responsive and collapsible planning panels.
- All eight sessions and the final example directly testable, with labeled starting material when needed.
- Keep product creation tools; do not reintroduce assessment, explanation, reflection, or checkpoint forms into the testing workspace.
- No connected AI, automatic mastery, classroom-authoritative assessment, shared editing, publication, or deployment in this build.
- Work on this project only. Other projects and their concurrent changes remain outside the scope.

### Content boundaries

No book is selected for this specification. Earlier title suggestions do not constitute accepted content. In particular, neither Narnia nor Charlotte Doyle is the sample project. Future title selection should favor assigned middle-school reading and avoid a popular screen adaptation that already dominates students' visual expectations.

The setup must accept later book packages without novel-specific application code. An original, explicitly non-curricular test fixture may exercise the engine, but it must not be presented as a selected book or a finished cinematic sample.

## 2. New identity and catalog copy

Use these values when the new project is implemented:

| Field | Target |
| --- | --- |
| Project type shown to students | Book Repair |
| Project title | Cinematic Book Repair: Restore the Story |
| Subtitle | Enter the scene. Find what changed. Restore the story. |
| Primary subject | English Language Arts |
| Initial grade placement | Grade 7; each future book package declares its own suitable grade/readership |
| Invitation | Open a case |
| Description | Watch a changed scene, enter its world, interview characters, and use evidence from the book to discover the interference and restore the story. |
| Learning goals | Close reading; character motivation and perspective; evidence and inference; narrative cause and effect; discussion and explanation through a case exhibit |
| Student-facing canonical route | `/projects/book-repair` |
| New independent project ID | `book-repair` |
| Initial curriculum version | `1.0.0` |
| New template | `book-repair`, version `1.0` |
| New template schema | `1.0`, independent of the historical template schema |
| Release status during development | Updating or Preview, according to actual availability |

Add a separate catalog project with its own identity, package, route, and saved state. Keep `exploration-time-repair` and its route unchanged. There is no alias between the two projects and no record migration.

Book Repair has its own cinematic art, book evidence, interviews, repairs, and exhibit. The harbor/cargo imagery, historical dates, potato investigation, charges, stability meter, and history exhibit remain in the separate History project; do not edit them as part of this work.

The project's home card must use the Book Repair overview. Changing only its catalog title is insufficient because `createProjectHomeCards` also reads `project-type-overviews.ts` by template ID.

## 3. Student experience

### 3.1 Case arrival

Open the selected session directly into its activity. A case identity strip contains the book title once configured, chapter boundary, scene title, and the immediate task. Do not require a separate briefing form before the activity.

For a new case, the main activity is a playable opening cinematic. The student deliberately starts playback; provide captions, pause, replay, and a text description. The video establishes the wrong event without explaining the culprit or correct repair.

Present one immediate action and one observable result, for example:

- **Do now:** Watch the conversation and select the moment that conflicts with the chapter.
- **What changes:** The selected moment is pinned in your case journal.
- **How to check:** The journal contains that moment and its video time.

This feedback reports an interaction, not reading mastery.

### 3.2 Entering the world

The final shot of the opening video is authored to match the entry camera in the interactive scene. Preload the first visible environment while the film plays. Preserve framing and sound across the handoff; reveal exploration controls once the environment is ready.

If loading is unfinished, hold the intended handoff frame with a clear preparation indicator and retry option. Never transition to an empty canvas, a different room, or rough temporary geometry while presenting it as the finished experience.

Entering may rewind to a precisely labeled moment before the changed event. Each case specifies that time and what every character knows then. The student must understand why an event they just watched can still be prevented.

### 3.3 Mildly restricted exploration

For the first production-quality case, target one compact environment with four to six authored investigation positions and two interviewable characters. A later case may connect two or three nearby spaces.

- Students may choose which available person or object to approach first.
- Click/tap a destination or use its keyboard-accessible equivalent.
- Move the camera along defined paths; allow a bounded look-around range at each destination.
- Offer inspect, talk, present evidence, move to another position, journal, and return actions.
- Allow repeat visits and repeat interviews without resource penalties.
- Make important interactions discoverable without pixel hunting or hover-only cues.
- Describe inaccessible destinations naturally and, where relevant, name the missing information.
- Keep location boundaries spatially believable. Do not offer doors that imply an explorable area and then do nothing.

This is an actual small 3D set. A panorama or layered still is not an equivalent completion of the required world. Such a representation may be a separately labeled design aid or accessibility alternative.

### 3.4 Character interviews

Conversations are authored and configuration-driven in the first release. Each character has a limited knowledge set, beliefs, goals, and a defined relationship to the changed event.

The student can:

1. Ask an opening question.
2. Follow up on a particular statement.
3. Present a collected clue or passage reference.
4. Ask about a contradiction between accounts.
5. Return after another discovery and unlock a specific new response.

New responses must depend on the meaning of the presented evidence, not simply on the number of buttons clicked. Every mandatory interview contributes information needed to resolve the mystery; do not make interviews decorative gates around an otherwise obvious repair.

Provide visible reasons for unavailable questions, such as “Inspect the envelope before asking about its delivery.” Do not reveal the answer in that reason.

Each response supplies captions/transcript, speaker identity, relevant evidence references, and optional cinematic media. A response is replayable. The journal retains the exact response the student encountered, with its knowledge/scene revision, rather than replacing it later with a revised response without explanation.

For cinematic interviews, transition to prepared close-up shots of the same character model in the same set. Render them in advance with consistent costume, voice, light, eyeline, and expression. Use a matching idle pose before and after the clip. Do not substitute a visibly unrelated portrait or floating video rectangle in the finished world.

Typed free conversation and generated voices/responses during a session are outside this build.

### 3.5 Evidence journal and cause board

The journal opens beside the active investigation or as an accessible overlay. Returning restores the same camera and conversation context.

Evidence has explicit provenance:

| Evidence origin | What it can establish |
| --- | --- |
| Book passage or accurate cited paraphrase | What the original narrative states; chapter/edition references identify the source |
| Observation in the changed scene | What is happening in this altered version |
| Authored character testimony | What this character reports or believes within the mystery |
| Inference | A student's or author's interpretation, with supporting references and stated uncertainty |

Allow students to attach passages to claims and connect evidence to a small cause chain: **interference → changed belief/object/event → changed action → consequence**. Accept multiple supported evidence combinations where authored. Supply at least one plausible alternative explanation that evidence can rule out.

Do not treat the absence of an event in a single short excerpt as proof that it never occurs anywhere in the book. Do not treat an ambiguous ending or a defensible interpretation as a factual corruption. A surprising authentic event may be a deliberate “keep this” decision.

The case board and final exhibit are real products. A mandatory paragraph field that exists only to unlock a repair is an assessment form and does not belong in this preview.

### 3.6 Repair

Students return to the affected object or character and select an available, authored intervention. Supported repair families include restoring a message, replacing an object, reconnecting an event sequence, correcting a speaker attribution, or presenting evidence that changes a character's mistaken belief.

These are reusable capability IDs with handlers and validation, not arbitrary scripts inside book packages. Only implemented families may be declared available.

The runtime checks the exact target, the proposed intervention, and the required evidence/interview conditions. It may report “This leaves the contradiction unresolved” or show an authored unsuccessful branch. It must not deduct reading points, claim to grade reasoning, or silently reveal the solution.

The action visibly changes the scene: an object returns to its authored location, a false instruction is removed, a character responds differently, or a route is restored. A success banner alone does not fulfill this requirement.

Selecting a different theory or revising the repair invalidates any ending derived from the previous repair. Bind outcomes to a specific immutable repair trial and scene revision.

### 3.7 Corrected film and comparison

After a supported repair, the student returns to the viewing position and plays the corresponding restored cinematic. Use the same shots as the opening where possible so the behavioral difference is easy to recognize.

The initial system selects from prepared outcome films; it does not generate a new movie during the lesson. The interactive set renders the immediate repair in real time. The ending film shows the authored narrative consequence.

“Return to watch” is enabled only for the current applicable repair, except in the explicitly labeled authoring preview and read-only sample viewer. Skipping/seeking a movie must not mutate evidence, interview, repair, or mastery state.

Let students switch between damaged and restored shots, review the linked passage, and inspect the cause chain. Keep any broader consequence limited to what the assigned reading establishes.

## 4. Visual quality and production pipeline

### 4.1 Required appearance

Target a believable cinematic adaptation with carefully composed spaces, detailed materials, expressive characters, and restrained interface overlays. Stylization may be chosen later, but the same style must apply throughout the video/world/video loop.

The following do not count as the finished visual result:

- Primitive boxes/cylinders representing the main environment or characters.
- Flat icons standing in for characters during an interview.
- A high-quality film followed by visibly unrelated textures, proportions, lighting, or faces.
- Still-image zooms presented as navigable 3D.
- A slide sequence labeled as a rendered dramatic scene.
- Generic animation that does not show the specific event changing.

Technical wireframes may exist for engineering tests and must be identified as such. They do not satisfy the visual acceptance criteria.

### 4.2 Shared source assets

Build a master scene before producing final films. It defines:

- World scale, room dimensions, props, and object positions.
- Character models, rigs, costumes, expressions, and proportions.
- Material/texture sets and lighting intentions.
- Camera transforms, lenses, paths, and interview eyelines.
- Changed/restored scene variants and the transitions between them.
- Ambient sound, dialogue performances, captions, and shot timing.

Render the opening, interview shots, and endings from these assets. Export optimized versions of the same environment and necessary characters for the web. Compare the exports with the rendered shots; shared model identity alone does not guarantee matching color, shadow, or facial quality.

AI-created concept art or video may inform visual development. A generated video is not automatically an editable 3D set. Do not promise automatic video-to-world conversion or generate unrelated assets independently and assume they will match.

### 4.3 Rendering choice

Use the existing Angular application for navigation, controls, planning panels, accessible dialogue, and evidence tools. Prefer the already installed Three.js dependency for the actual 3D scene through an isolated renderer adapter.

Three.js supports imported glTF models and physically based materials. Those are relevant building blocks; art production, lighting, animation, export quality, and device testing determine whether this project meets its visual target. See [model loading](https://threejs.org/docs/pages/GLTFLoader.html) and [physically based materials](https://threejs.org/docs/pages/MeshStandardMaterial.html).

The first renderer needs camera paths, object selection, scene variants, animation playback, lighting, and clean resource disposal. It does not require a full physics system, combat, unrestricted locomotion, or an additional frontend framework.

If the required appearance cannot run acceptably on the intended student hardware, record that result before changing delivery architecture. Unreal Pixel Streaming is a possible separately scoped alternative: it renders remotely and streams interactive frames to browsers, adding GPU hosting, networking, and concurrent-session capacity requirements. It is not included in this implementation plan. See [Epic's overview](https://dev.epicgames.com/documentation/unreal-engine/overview-of-pixel-streaming-in-unreal-engine).

### 4.4 Media handoff contract

Each cinematic declares its scene build ID, variant ID, entry/exit camera ID, duration, caption/transcript references, media renditions, and audio continuity group. Model units and camera transforms use one documented coordinate convention.

At the video-to-world boundary:

1. Resolve and validate the matching scene/variant/camera references.
2. Load enough assets for the actual first interactive view.
3. Place all visible props and characters in matching poses.
4. Compare framing, lighting, and audio with the prepared boundary frame.
5. Transfer controls only when ready.

At the world-to-interview and world-to-ending boundaries, apply the same discipline. Avoid overlapping dialogue audio or a second ambient loop. Cancel stale playback requests when the student changes case, session, or conversation.

### 4.5 Asset delivery checklist

For one finished case, plan for:

- One master environment and optimized interactive export.
- Two characters with performance-ready faces, costumes, and relevant animations.
- Four to six usable camera positions and their movement paths.
- Three to five meaningful clue objects and close-up views.
- Opening film, restored film, and any explicitly supported alternate outcome clips.
- Authored interview clips, matching idle states, captions, transcripts, and audio.
- Changed/restored object variants, handoff frames, cover image, and comparison stills.
- A manifest identifying source build, revisions, asset origin, and delivery status.

Actual counts may change with the later case brief. Missing essential media must be reported as missing. No placeholder filename or empty file may be treated as a completed asset.

### 4.6 Device and quality test

Choose and record the actual target school laptop, browser, and tablet before certifying performance. Provisional engineering targets are at least 30 fps during navigation on that laptop and no perceptible input lock during interviews; these are targets to measure, not claims about the existing application.

Record cold-load size/time, film-start delay, video/world handoff delay, navigation frame times, and memory across repeated entries. Set final asset budgets from that measurement. Preload the entry region, load other regions on demand, and stop rendering/audio when a scene is hidden.

Optimize material count, texture size, geometry, lighting, and animation to preserve the accepted look. If optimization destroys that look, the case fails visual acceptance rather than silently becoming a low-quality fallback.

## 5. Mystery and reading design

Every future case is authored with the companion [case setup template](CASE_AUTHORING_TEMPLATE.md). Its private solution record must identify:

1. The original event and the passage(s) establishing it.
2. The altered event visible in the opening video.
3. The exact interference and when it occurred.
4. Who or what introduced it, if attribution is part of the mystery, and why.
5. What each character knew, believed, witnessed, or misunderstood.
6. Which observation, passage, and interview response establishes each required causal link.
7. A plausible alternative cause and the evidence that distinguishes it.
8. The smallest supported repair and its visible effect.
9. The corrected cinematic and the limits of its downstream claims.

A mystery cannot depend on information that is unavailable until after the repair. At least one mandatory interview must contribute a necessary causal fact; at least one book reference must support the original event. If a culprit is required, the clues must support that identity rather than only demonstrate that interference occurred.

The mystery author may add an explicit interference layer to the fictional world. It must not be passed off as part of the original novel or replace a character's established motives with an arbitrary explanation. The player resolves the added interference while restoring the original narrative choice, including choices that remain morally complicated or unhappy.

Each case declares an assigned reading boundary. Dialogue, evidence titles, thumbnails, metadata exposed to students, and ending options must respect that boundary. Future classroom enforcement belongs in the authoritative content-delivery adapter. The local builder can inspect later cases through clearly separate preview controls.

## 6. Four-week, eight-session map

The complete course uses at least three distinct cases from the eventual configured book or book collection. The one-case visual trial is a milestone, not completion of all eight sessions. Do not repeat one scene under eight headings.

| Week | Session 1: individual experience | Session 2: group activity, locally operated | Proposed products | Tutor questions / concepts | Evidence for future review | Future model controls | Direct-entry starting material |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Notice and investigate | Case A: watch the changed event, enter its set, inspect clues, and conduct an opening interview | Case A: compare two accounts, present an object in a follow-up interview, and expose one contradiction | Scene observation journal; linked interview trail | What differs from the passage? What does this witness actually know? | Film moment pins, source references, inspected objects, response IDs, evidence presentation history | Visible clues, camera positions, interview availability, reading boundary, hint level | Case A opening available immediately; session 2 can use labeled sample observations without marking session 1 complete |
| 2 — Find the cause and intervene | Case B: explore a different setting or substantial scene configuration; investigate two plausible causes | Case B: assemble the causal explanation, choose an in-world intervention, and test its visible effect | Cause board; repair trial record | Which evidence distinguishes the causes? Why should this change restore the original action? | Source-to-claim links, alternative cause selection, witness contradictions, intervention target and result | Active interference, clue placement, distractors, repair options, replay baseline | Case B available directly; session 2 starts with a labeled sample evidence set and no earned assessment state |
| 3 — Restore and compare | Case C: complete a fresh video/interview/repair loop with less prompting and one authentic detail that must be kept | Case C: compare damaged and restored shots, test a different proposed repair, and identify supported consequences | Shot comparison; revised causal explanation with retained authentic details | Does every surprising event need fixing? Which consequence is stated and which is inferred? | Keep/change choices, repair revisions, clip/shot comparisons, cited passages | Hint level, accepted evidence combinations, scene variants, comparison shots, consequence scope | Case C and its first interview open directly; comparison session provides labeled prepared trials that remain separate from the student's trials |
| 4 — Build and present the case | Compose a Book Repair exhibit using case shots, original-event evidence, interviews, cause chains, and repairs | Rehearse the exhibit, play its selected outcome films, and test a peer-authored case outline using supported setup controls | Illustrated or narrated case exhibit; optional new case design using the template | Can a reader follow the evidence to the repair? Does the ending remain faithful to the source? | Exhibit versions, captions, source labels, presentation order, case design relationships | Sample content, media selection, exhibit sequence, rehearsal controls, case configuration preview | Editable labeled sample exhibit and direct read-only final example; deliberate empty edits are retained |

The book and chapter assignments remain configuration, not claims in this unassigned setup. Match later standards references to the selected grade, project version, and lesson-plan version. Do not carry forward the historical chronology standards as evidence of ELA alignment.

## 7. Layout and action clarity

The common project host remains responsible for navigation and lesson selection. The Book Repair template supplies the activity and its contextual controls.

Desktop:

- Main area: cinematic player / 3D world / current product tool, about 70% of the available width.
- Right column: proposed weekly products, then **AI Tutor — Not connected** with questions, evidence, and future controls.
- A compact action strip shows the next available step and where its result will appear.
- Journal, conversation, and clue inspection appear adjacent to their triggers or in a focused overlay within the scene.

An explicit “Expand scene” mode may temporarily enlarge the visual workspace. Closing it restores the planning layout, camera position, and focus. No essential action is available only in fullscreen.

On tablet/phone, stack the activity and collapsible planning panels. Maintain legible dialogue and touch targets. Do not shrink a desktop control board to fit. Keyboard users must be able to choose destinations, inspect every clue, present evidence, choose a repair, and replay outcomes. Respect reduced motion through cuts/short transitions; supply subtitles, transcripts, and a non-spatial action list.

Example mechanical feedback:

| Action | Visible result | Honest feedback |
| --- | --- | --- |
| Ask about a discovered clue | New authored response plays and is added to the journal | Response saved; a named follow-up is now available |
| Attach a passage to a scene moment | Evidence connection appears in the case board | Passage linked to this claim |
| Try an unsupported intervention | Target remains altered or an authored failed consequence is shown | This action does not resolve the identified contradiction |
| Apply a supported intervention | Correct object/character variant appears | This trial restores the configured event; watch its outcome |
| Revise an earlier repair | The prior ending is retained as a replay, not the current result | Your previous result belongs to an earlier trial |

## 8. Architecture and reuse audit

### Existing repository capabilities inspected

- `src/app/templates/time-repair/`: configuration-driven evidence, mission choices, fixed-image hotspots, authored consequences, and local state.
- `time-repair-preview.*`: isolated weekly drafts, trials, source links, editable exhibit, and directly accessible preview sessions.
- `src/app/shared/encounters/`: a guided scene with one host, authored questions, a preceding-question dependency, object features, and evidence relationships.
- `src/app/templates/investigation/npc/npc-contracts.ts`: dialogue contracts with availability rules, actions, and produced evidence.
- `src/app/shared/panorama/`: another project's concurrent panorama work. It is not a substitute for this project's required 3D set and is not owned by this build.
- `src/app/core/`: runtime events, deterministic rules, conditions, command handlers, registries, and idempotency contracts.
- `src/app/shared/project-lessons/` and the project launcher: lesson focus, integrated header, and planning/workspace navigation.
- `package.json`: Angular and Three.js already installed. No new frontend framework is necessary.

### New template boundary

Register a new `book-repair` template for the new project. The existing `time-repair` template continues to run the active History project unchanged. The inspection of that code above is a reuse audit, not authorization to convert or retire it.

Reuse the existing core event/rule/command pipeline and scoped persistence abstractions. Reuse simple ordering and exhibit concepts where they remain useful; avoid copying historical labels, timeline-charge logic, or assessed form gates. Extract common UI/domain helpers only where actual reuse justifies it and where the owner of the affected shared files can integrate the change safely.

Do not import an Investigation-specific NPC runtime into LMS core. Compose compatible shared contracts through an adapter or an installed capability. Book names, chapter facts, interview scripts, clue positions, and repair answers belong in the package.

### Proposed capabilities — not installed yet

| Proposed capability ID | Responsibility | Existing gap |
| --- | --- | --- |
| `book-repair.cinematic-loop` | Opening/world/interview/outcome transitions bound to media and scene revisions | Current Time Repair has no such continuity contract |
| `scene.cinematic-3d` | Actual 3D set, camera nodes/paths, selected objects, variants, resource lifecycle | Current Time Repair renders a single image with hotspots |
| `book-repair.character-interviews` | Multiple characters, evidence-specific follow-ups, knowledge boundaries, response history | Existing encounter supports a single host and simple preceding-question requirements |
| `book-repair.cause-board` | Connect book facts, altered observations, testimony, and interference to a repair | Current source links do not model the full causal explanation |
| `book-repair.scene-interventions` | Registered repair operations and visible scene changes with deterministic feedback | Existing operations are only object replacement and sequence restoration |
| `book-repair.outcome-comparison` | Repair-bound films, paired shots, supported consequence inspection | Current ripples are text, not rendered events |
| `book-repair.case-exhibit` | Compose/rehearse a source-labeled evidence and media exhibit | Existing exhibit is image/caption/source oriented and needs case/media references |

Each capability needs a contract, renderer/adapter where applicable, registered actions/events, validation, tests, and documentation. The list is a build plan, not a declaration that these capabilities already work.

### Explicit capability gap

```text
TEMPLATE_CAPABILITY_GAP
Requested: Cinematic video-to-3D-to-video Book Repair with evidence-dependent
character interviews, a discoverable interference, visible repairs, and
repair-bound rendered outcomes.
Reason: Current Time Repair offers image hotspots, fixed repair choices,
text consequences, and an image exhibit. Existing shared encounters do not
cover multiple witnesses, evidence-specific dialogue branches, or 3D/media continuity.
Suggested reusable capability: Register Book Repair as an additive template
composing the capabilities above through the existing event/rule/command system.
```

The main scene must not silently fall back to an image or unrelated simulation if a required capability is absent. Report `CAPABILITY_NOT_INSTALLED` or an explicit media/configuration error in preview.

## 9. Configuration, state, and validation contracts

This is a semantic contract for the new schema. Implementation must publish exact TypeScript types and validators; the headings below are not files that exist already.

### Package definition

The static package source currently loads `${packageReference}/project.json`. The new template may begin with one validated modular definition graph in that file, containing separate `book`, `cases`, `scenes`, `characters`, `evidence`, `media`, `rules`, `weeks`, and `sampleExhibit` sections. If sections are split into referenced JSON files, extend the template's package adapter/descriptor and test its loading before using those references. Do not assume the current loader follows them automatically.

Required definition concepts:

| Definition | Required concepts |
| --- | --- |
| Book | Stable ID, title/author when selected, edition/language, grade/readership, chapter locators, permitted reading boundaries |
| Case | Stable ID/revision, book and chapter scope, original/changed events, investigation time, scene/media references, initial state, allowed repairs, private solution record |
| Scene | Build ID, glTF asset references, camera nodes/paths, interaction targets, character placement, lighting/environment, changed/restored variants |
| Character | ID, model/media identity, case-specific knowledge and beliefs, dialogue nodes, evidence rules, transcript references |
| Dialogue node | Speaker, prompt, authored response, availability condition IDs, optional presented-evidence requirement, response media, produced evidence IDs, next-node relationships |
| Evidence | ID, origin class, content, source/edition/chapter or observation/response locator, provenance, scene/reading availability, supported relationships |
| Repair | ID, registered operation, target, parameter references, prerequisites, resulting scene variant, outcome ID, visible feedback, trial-reset behavior |
| Outcome | ID, matching repair/case revision, film/renditions, shot pairs, transcript/captions, supported consequence references |
| Weekly session | Stable ID, lesson number, case/activity mode, immediate action/change/check, proposed products, tutor planning, direct-entry starting material |
| Asset | ID, type, source build/revision, URLs/renditions, expected file metadata, content origin, accessibility companions, status |

No executable project scripts, arbitrary function expressions, or remote code appear in a book package. Use installed capability and condition IDs.

### Runtime state

Separate immutable content from mutable state. Scope saves by project ID, project version, actor/class/team context, attempt, case ID, and case revision.

Persist bounded meaningful state:

- Current case/session and resume position.
- Collected evidence IDs and inspected target IDs.
- Interview response history and the evidence presented for each meaningful response.
- Cause-board links and theory revisions.
- Repair trials: ID, case revision, intervention/target, evidence snapshot, resulting variant, outcome ID, timestamp, and sample/user origin.
- Editable exhibit and its revision history where needed.
- Labeled sample initialization markers so deliberately empty work stays empty.

Do not persist animation frames, mouse motion, every camera tick, or each keystroke. Save camera destination at meaningful navigation/resume points; save product edits on blur/navigation/debounce through the adapter.

Use a dedicated Book Repair persistence namespace. Old cargo repairs, charges, source IDs, and exhibits are not valid Book Repair records and must never be treated as prior progress.

### Event and command discipline

Use existing events where their semantics fit: `activity.started`, `evidence.viewed`, `evidence.collected`, `evidence.connected`, `npc.questionAsked`, and hypothesis revision events. Register additional generic events when necessary, such as a scene repair request or cinematic handoff. Proposed names must be installed and validated before use.

One runtime service translates interactions into events; rules/commands apply meaningful state changes. Renderer components consume state and report actions. They do not award evidence, branch interviews, or select correct outcomes independently.

Repair retries and question replays must be idempotent where they would otherwise duplicate evidence or effects. Persist trial snapshots independently of playback. Media playback and seek events never act as proof that an investigation was completed.

### Validation before preview

Reject definitions with:

- Unknown required capabilities, operations, conditions, or renderers.
- Duplicate IDs, dangling references, mismatched project/version identity.
- Unreachable required evidence, dialogue cycles with no reachable start, or circular repair prerequisites.
- A required causal fact that can only be obtained after applying the repair it unlocks.
- An ending with no supported repair or a repair with no visible effect/outcome.
- Missing book/edition/chapter references in a purported canonical evidence record.
- Future-chapter content in a scene constrained to an earlier reading boundary.
- Mismatched video and environment build IDs or missing camera handoff references.
- Missing essential media or inaccessible caption/transcript references.
- An incorrect number of weekly sessions or a session without an actual activity binding.

A draft authoring brief may have an unassigned book and missing media. It remains a draft specification, not a runnable student package. Do not fill those gaps with fabricated book facts or fake assets.

## 10. Preview, final example, and future authority

Preserve the existing explicit local authoring boundary. Within it, every session can be opened directly and any film/branch can be inspected through preview controls. A direct-entry sample is separate from earned state and is labeled accordingly.

Within a chosen case trial, retain its real mechanics: evidence-specific follow-ups and repair prerequisites still behave as designed. Provide explicit seed/reset controls to test later stages instead of globally disabling those mechanics.

The final example reads an immutable sample exhibit/record and never loads or overwrites a student's saved drafts. Starting the final session independently must work, as must returning to intentionally emptied exhibit fields.

Do not implement or claim automatic reasoning review, standards mastery, assessment completion, authoritative classroom permissions, or team synchronization. The AI Tutor panel remains a builder-facing planning list. Any later tutor must operate through the same supported controls and state contracts.

Keep private solution metadata separable from student content. The local authoring preview may hold answer metadata, but client-side hiding is not production authorization. A later authoritative adapter must filter protected content and enforce chapter availability.

## 11. Separate-project integration and file ownership plan

This section describes future code changes. None are performed by writing this specification.

### Additive registration

1. Create a new `book-repair@1.0.0` package under `public/projects/book-repair/versions/1.0.0/` when runnable content is ready.
2. Register and validate the additive `book-repair` template and launcher.
3. Add one new catalog entry with the Book Repair title, subject, type, invitation, goals, cover, and accurate availability status.
4. Use `/projects/book-repair` and its own lesson/final routes. Inspect the current route machinery before implementation; do not redirect any History route.
5. Add a new Book Repair lesson-plan entry with eight activities and matching project/plan versions.
6. Add its ELA standards review only after validating the selected grade and actual authored learning evidence. Do not repurpose the History review.
7. Add the Book Repair project-type overview so the homepage presents it independently.
8. Use new saved-state scopes. Do not copy or reinterpret History records or membership data.
9. Test that the catalog gains exactly one project, that History still appears and opens normally, and that all existing project routes and records remain intact.

There is no historical package conversion, old-version retirement, route alias, or curriculum-record migration in this project.

### Planned ownership

| Area | Intended changes |
| --- | --- |
| `src/app/templates/book-repair/` | New reusable domain, validation, runtime/persistence adapters, cinematic workspace, interviews, repair, comparison, and exhibit components |
| `public/projects/book-repair/versions/1.0.0/` | New independent content/configuration and media references once a case is authored |
| Project-owned asset directory | Scene exports, film renditions, captions, portraits/performances, and manifest |
| `src/app/runtime/project-launch/template-launchers/` | Add Book Repair launcher; register it through the existing launcher mechanism |
| `src/app/runtime/local-template-registry.ts` | Add the new template registration; existing registrations remain intact |
| `src/app/projects/project-catalog.ts` | Add the new Book Repair entry; do not replace the History entry |
| `src/app/projects/project-type-overviews.ts` | Add Book Repair overview; existing type overviews remain intact |
| `src/app/projects/project-lesson-plans.json` | Add the independent Book Repair lesson plan |
| `src/app/projects/project-lesson-standards.ts` or its configured source | Add the matching Book Repair review record after inspecting the current representation |
| Shared rules, registries, scene/dialogue helpers | Reuse unchanged where possible; narrowly add a reusable capability only after checking current ownership and compatibility |
| `docs/book-repair/` | Current specification, case setup template, later implementation and media verification record |

Re-read shared files immediately before editing. Do not reformat shared catalogs, replace entire arrays, reset concurrent work, or edit other projects' panorama/cinematic implementations. Use a dedicated preview port and build/log prefix. No dependency changes are expected for the first renderer; any new dependency requires a concrete need.

## 12. Build sequence and deliverables

### Stage A — reusable setup

Define and validate the Book Repair template, package contracts, state, events, branch conditions, renderer adapter, and media handoff contract. Exercise them with two small original fixtures that differ in setting and repair family. They are engineering fixtures, not chosen books or polished samples.

Deliver the new template registration, scoped saves, direct-entry preview controls, and meaningful domain tests. Do not mark the cinematic experience finished at this stage.

### Stage B — visual proof

After a book/case is separately chosen, produce one matched opening film, one finished interactive set, one character interview, one visible repair, and one corrected film. Demonstrate the whole loop on target hardware.

The loop must prove consistent faces, materials, light, cameras, and performance. Resolve visual failures before replicating the scene system across multiple cases. A storyboard or placeholder scene is a planning artifact, not this deliverable.

### Stage C — complete first mystery

Add the second witness, evidence-dependent follow-ups, all necessary causal clues, one distinguishable alternative explanation, book evidence, repair variants, replay behavior, and the case exhibit. Run the full investigation without consulting the solution key.

### Stage D — full eight-session project

Author Cases B and C, their distinct environments/configurations and films, all eight activity bindings, proposed products, tutor planning, direct-entry samples, and read-only final example. Register the separate project with a status that accurately represents readiness.

### Stage E — acceptance record

Document actual files, asset builds, test results, measured graphics performance, browser checks, limitations, and unresolved capability gaps. Do not deploy. Preserve the distinction between completed functionality and future AI/authority/team work.

## 13. Acceptance tests

### Domain and configuration

- Two substantially different fixtures run without project-name checks or copied engines.
- Unknown capabilities and missing required assets fail explicitly.
- Every required clue and interview is reachable without a solution dependency cycle.
- Presenting the correct evidence unlocks the intended follow-up; unrelated evidence does not.
- A supported alternate evidence combination works where authored.
- Duplicate actions do not duplicate evidence or repairs.
- A character never reveals information outside their case/reading knowledge boundary.
- Wrong repairs leave the contradiction unresolved or select only their authored result.
- Revising a repair invalidates its previous current ending while preserving replay history.
- A corrected film is selected by the actual current trial, not by a global success flag.

### Cinematic and graphical

- Opening, world, interviews, and ending use the matching scene build and character identities.
- Camera handoffs match position, scale, framing, and intended light closely enough to feel continuous.
- The set is genuinely 3D, and navigation produces the correct change of perspective.
- The repair is visible in the set and dramatized in the ending.
- No essential environment/character is placeholder geometry in the accepted visual proof.
- A reviewer can identify the changed action by comparing the two films without reading a success message.
- Target-device load/frame-time/memory measurements are recorded.
- Hidden/destroyed scenes release renderers, textures, geometries, media listeners, and audio.
- Failed media, unavailable graphics, or context loss produce a recoverable, explicit state, not false completion.

### Student flow and preview

- Each of the eight lessons selects its actual intended activity.
- Later lessons and the final example open with no prior progress.
- Sample seed data is visibly distinguished and never marks earlier lessons complete.
- Interviews, journal links, trials, and empty product edits survive navigation and reload correctly.
- The final example is read-only and does not access or overwrite user drafts.
- Opening a clue or response keeps it in view and moves logical focus.
- Keyboard/touch alternatives cover all essential interactions; captions and reduced-motion behavior work.
- Laptop, tablet, and phone layouts preserve readable controls without horizontal overflow.
- The 70/30 workspace and both planning boxes follow the agreed layout; tutor remains disconnected.
- No assessment forms, mastery claims, completion submission, or shared-editing claims are introduced.

### Separate-project integration

- A new project card and type overview say Book Repair and use ELA copy.
- Book Repair URLs reach its own views and preserve lesson/final context.
- History remains a separate active catalog project using its existing package/template and routes.
- History saved records remain unchanged and are never replayed as Book Repair events.
- Catalog, lesson plan, standards review, session, and package versions match.
- Other projects retain their catalog entries, routes, templates, and shared capability behavior.
- Relevant unit/component/integration checks and production build pass with isolated output paths.
- Any failing shared check is investigated against the current tree and reported; prior failures are not assumed to remain unrelated.

## 14. Outstanding inputs and current delivery status

This specification completes the requested setup design. It does not require choosing a book now.

Later production inputs are a selected book/edition/chapter range, a validated case script, a visual direction with finished asset production, and target-device measurements. Those inputs are necessary for the cinematic sample, not for writing this reusable setup.

Current deliverables: the cinematic 3D project write-up, this supporting implementation specification, and the accompanying blank case setup template. History Time Repair remains a separate unchanged project. No Book Repair runtime, graphics, videos, tests, deployment, or classroom capability is claimed as delivered by these documents.

## 15. Implementation handoff prompt

> Implement Cinematic Book Repair as a NEW, separate project using the cinematic write-up, this specification, and the case setup template. Use project ID book-repair, initial version 1.0.0, route /projects/book-repair, and the new reusable book-repair template. History Time Repair is a different active project: do not rename, replace, redirect, migrate, or remove it. Read AGENTS.md, the interactive-week handoff, and the relevant build contracts first. Re-inspect the current working tree and identify shared ownership before editing. Follow the cinematic video → matching 3D world → character interviews → causal repair → corrected video design. Do not substitute image hotspots, low-quality placeholder graphics, or assessment forms for the required experience. Use the existing event/rule/command and persistence boundaries. Keep eight directly testable sessions, proposed products, and the disconnected tutor plan. No novel is selected; build only the reusable setup until a case is separately selected and authored. Clearly label generic test fixtures, and report missing case/media production inputs honestly. Verify real interactions, separate-project registration, accessibility, target-device graphics, relevant tests, and build. Return a local preview and project-specific delivery record. Do not publish or deploy.
