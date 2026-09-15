# Debate Studio build guide

Current design: 2026-09-15. Applies to **The Fate of the Republic 3.0.0** and **Hammurabi on Trial 2.0.0**.
Both use lesson plan 2.0.0 and the optional `debate.exchange-cycle` capability in template implementation 2.2.0.

Read [Project activity rules](../PROJECT_ACTIVITY_RULES.md) first. The user's explicit request applies this design to both debate projects.

## 1. The activity is one continuing debate

Students build an opening, exchange with an opposing group or individual, critique and revise, then exchange again. Keep the argument history in the main viewport throughout the project.

Visible objects: the motion, two sides, ordered debate points, source records, submitted speeches, linked replies, earlier versions, exact moments selected for critique, individual performers and ranking positions.

Meaningful actions: choose a side; arrange points using keyboard-accessible buttons; inspect and connect evidence; select an opposing submission to answer; compare an earlier version; critique another speaker on the same side; revise with received feedback; review and rank individual performances.

Do not replace this with weekly worksheets, opinion surveys, repeated opening screens after every submission, disconnected games, or a decorative courtroom.

## 2. Required eight-session cadence

| Week | Individual / instructional session | Group project session |
| --- | --- | --- |
| 1 | **1 — Opening:** hear/read the motion, choose a side, form the first points, connect evidence and produce an individual opening argument. | **2 — Exchange 1:** exchange openings with an opposing group or individual; formulate and submit a rebuttal by class end. |
| 2 | **3 — Source clinic:** review the exchanged arguments, learn source critique, critique another same-side author and submit an independent revision. | **4 — Exchange 2:** exchange refined arguments, identify the strongest objection and submit the next supported response by class end. |
| 3 | **5 — Reasoning clinic:** learn to connect evidence and claims, represent an opponent fairly and use peer feedback to strengthen the next argument. | **6 — Exchange 3:** exchange revisions, answer the strongest opposing case and submit a response with evidence and a fair concession by class end. |
| 4 | **7 — Closing clinic:** review the debate, weigh evidence, critique a same-side performance and refine/rehearse the closing case. | **8 — Final exchange:** present closings, review individual performances from both sides, submit justified rankings and inspect the results. |

Class-end submission is a teaching expectation. The current local adapter does not enforce a class clock or release schedule.

All sessions and examples stay freely accessible during testing. An invalid submission may identify a missing linked argument or source; that must not lock navigation, sources, skill examples or judging inspection.

## 3. Screen contract

- Shared shell: project title, ID and eight-session navigation; directly below, a very small expandable standards row.
- Main panel: the debate history and active performance, case arrangement, same-side review or judging. Only controls operating this activity belong here.
- Side column, in order: current session tasks/product; then the AI Tutor box.
- Tutor is explicitly **Disconnected**. Its planning list describes future questions, evidence inspection and model controls.
- Manual speech authoring, written peer feedback, judgment reasons and independent context answers open from tutor-owned dialogs. Do not put input fields in the main debate viewport.
- Keep sources, skill examples, exchange tools and longer rubric descriptions on demand.
- Preserve task/tutor order when stacked on phones. Use native dialogs, visible focus and buttons as alternatives to dragging.

## 4. Exchange and authorship

Every contribution keeps an immutable ID, performer identity, side, session, speech, ordered points, sources and timestamp. Group submissions also carry a group label, but retain an individual performer so the ending can rank people.

A response/closing names the exact opposing contribution it answers. A revision names the author's earlier contribution, explains the change and can identify the peer critiques used. Never overwrite the earlier speech.

Choose a side before submitting. A performer's submitted side remains consistent within the debate. Do not use a mutable faction selection to rewrite existing work.

Separate:
- private drafts and context explanations;
- submitted classroom contributions, critiques and ballots;
- explicitly fictional practice examples;
- teacher assessment and official mastery.

## 5. Same-side peer critique

The review queue contains other authors who share the learner's side. It excludes the learner's own work and the opposition. Responding to an opponent remains a separate debate action.

For each critique, select an exact speech moment and provide:
1. a specific strength;
2. one actionable improvement;
3. evidence, reasoning and response ratings from 1 to 4.

The receiving author sees the review on the exact version and in Feedback received. A revision can link the reviews used and explain the resulting change. Revision is evidence of work, not automatic evidence of mastery.

## 6. Final performer rankings

Review individual performances from both sides. Each ballot ranks up to three distinct performers, excluding the voter, with a reviewed contribution, three criterion ratings and a written reason.

Criterion anchors:
- **Evidence:** unsupported → named source → relevant evidence explained → evidence weighed with limitations.
- **Reasoning:** assertion → partial connection → clear claim/evidence link → coherent case with limitations.
- **Response:** no response → mentions objection → answers it fairly → answers the strongest objection with evidence.

First receives 3 points, second 2, third 1. The latest ballot per voter counts. Equal totals share the same place. These rules must be visible to learners.

Agreement with a side, popularity, speed and team victory are not rating criteria. Delivery may be discussed when observed, but a transcript cannot establish oral performance. Public performance rankings do not confirm standards mastery.

## 7. Project-specific curriculum

### The Fate of the Republic

Motion: Was Julius Caesar a leader Rome needed, or a threat to the Roman Republic?

Keep Roman institutions, political participation, reform, source perspective and concentration of authority central. The source clinic compares what Cicero's viewpoint can show with claims about other groups. Closing preparation includes a teacher-selected fresh source detail.

Preserve the mapped SS.20, SS.04, SS.02 and ELA argument/revision/speaking evidence. A confident speech or a high ranking cannot establish historical accuracy.

### Hammurabi on Trial

Motion: Did Hammurabi's Code create order, fairness, both, or neither?

Distinguish a legal rule or royal promise from proof of daily enforcement. Retain source inquiry (SS.01), source analysis (SS.02), argument (SS.04), and every SS.10 component:
**monarchy, empire, hierarchy, polytheism, cuneiform, monumental architecture, epic literature and law**.

The independent context defense lives in the tutor side area. Include a hypothetical law change and effects on two groups, the crop-failure/canal-negligence comparison, and limits of the architectural and literary sources. All components require teacher review. Legacy H-A/H-B/H-C gates do not govern this testing experience.

## 8. Resources and media

Use a small, task-related resource shelf: historical evidence, argument technique, selected speech models and peer-review exemplars. Candidate sources and concrete student actions are in [Student resource ideas](../debate-studio/STUDENT_RESOURCES.md).

An example should teach an observable move: find a claim, select evidence, identify a missing link, compare two rebuttals, or justify a judgment. Keep examples separate from actual classmates' work.

Speech videos are optional. Add only real playable media with provenance, captions/transcript and a defined critique task. Verify playback and accessibility before putting a player in the project. Do not present a narrated still, empty player or fictional speech as archival evidence. The current build uses authored interactive skill comparisons; it does not contain a new great-speeches video collection.

Student recording supports microphone capture or audio/video attachment, local blob storage, playback, retake/removal and explicit review after playback finishes. A transcript remains required. Saving a recording does not mark it reviewed.

## 9. Implementation and extension points

| Concern | Location |
| --- | --- |
| Config contract, commands, validation, ranking | `templates/debate-studio/exchange/debate-exchange.models.ts` |
| Reusable cadence | `debate-exchange.curriculum.ts` |
| Signals, private drafts, submission actions | `debate-exchange-runtime.service.ts` |
| Storage and exchange-file boundary | `debate-exchange.persistence.ts` |
| Main interaction | `debate-exchange.component.*` |
| Tutor-owned authoring and actual media | `debate-author.component.ts`, `debate-recording.component.ts` |
| Project teaching examples | each project's `*.exchange.ts` |
| Launch and adapter composition | `runtime/project-launch/template-launchers/debate-studio.launcher.ts` |
| Versioned lessons and standards | `projects/project-lesson-plans.json`, `project-lesson-standards.ts` |

Stable commands are `debate.exchange.submit`, `debate.exchange.critique` and `debate.exchange.rank`. Each submitted item has a unique ID; replaying the same ID/content is idempotent, while conflicting content is rejected.

The optional config field is `DebateStudioProjectConfig.exchange`, with schema 1.0 inside the existing 2.0 debate package. Validate eight ordered lesson modes, skill choices and source references before launch. Older packages without the field use the legacy renderer.

No curriculum-name branches belong in this runtime. Add a project by supplying its configuration, examples, sources, lesson plan, standards review and catalog metadata.

## 10. Current persistence and classroom boundary

The active launcher supports **localDemo** only. It rejects server-authoritative launches without a gateway.

The local adapter stores submitted history and private drafts separately, scoped by tenant, project, version, class, actor and attempt. Practice uses a separate namespace. Recordings are actual blobs in IndexedDB; URLs are recreated when opened and revoked on cleanup.

Class exchange files contain submitted arguments, critiques and ballots. They omit private drafts/context answers and do not include media blobs. Students exchange the files through their class's existing channel and import replies. Import checks project/version, immutable IDs, references, same-side critique rules and valid ballots before committing. Reimport does not duplicate work.

Files are **not authenticated delivery**. The app does not infer roster membership, enforce pair release times or claim that another student received a file. Imported recording references cannot retrieve another person's local blob; the transcript remains available.

**TEMPLATE_CAPABILITY_GAP — Live class exchange:** a production deployment still needs authenticated class/team membership, teacher pairing and moderation, an authorized command gateway, concurrency-safe delivery/retry receipts and durable shared media. Implement these behind adapters, then verify with distinct participant contexts. Do not enable broad client database writes to simulate authority.

## 11. Versioning and verification

Both projects and their lesson/standards mappings were versioned for the changed curriculum. Old legacy browser data stays in its existing namespace; there is no automatic conversion into a new debate history.

Verify:
- all eight direct session entries for each project, desktop and phone;
- actual opening → opposing reply → same-side critique → feedback-linked revision → closing → justified ranking;
- source provenance, keyboard ordering and modal focus;
- no main-panel text inputs or added bands;
- no navigation gates;
- original versions survive edits; private drafts stay out of exchange files;
- project/tenant/actor/attempt/practice isolation, import conflicts, duplicate imports and malformed files;
- recording review, retake, playback after reload and failed-storage feedback;
- same-side/self-review exclusions, ballot replacement and ties;
- matching catalog, plan and standards versions;
- compatibility of legacy packages without the new capability.

Run the debate tests and standards checker, plus relevant shared shell tests. Inspect the actual UI; a passing unit test does not establish a readable phone layout.
