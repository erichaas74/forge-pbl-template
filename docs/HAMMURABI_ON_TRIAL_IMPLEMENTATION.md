# Hammurabi on Trial — implementation

Built 2026-09-14 as a local pilot at `/projects/hammurabi-on-trial`.

The new Grade 6 project uses the reusable Debate Studio template. Its learning workspace opens inside an illustrated Old Babylonian courtyard. Students read one source beside their own response, use the existing eight-lesson picker, save an individual portfolio, and enter the hearing after the final readiness review.

## What is implemented

- Four weeks, with one instructional/individual lesson and one group lesson per week. Each lesson supplies sources, work fields, an individual checkpoint, a retry, practice help, an optional side quest, teacher/tutor tasks, and a workload guide.
- Nine source cards with source type, dates, origin, attribution, context, perspective, and direct reference links. Adaptations are labeled; the brief Gilgamesh quotation is identified separately.
- Eleven individual targets: source inquiry (FF.G6.SS.01), critical source analysis (.02), evidence-based civic argument (.04), and **eight separate** components of .10: monarchy, empire, hierarchy, polytheism, cuneiform, monumental architecture, epic literature, and Hammurabi’s Code.
- H-A after Lesson 2, H-B after Lesson 4, and H-C after Lesson 7. Reading and help remain accessible when a dependent task is held. A saved response cannot unlock a gate by itself. A new unreviewed attempt invalidates readiness based on an older attempt, including dependent gates.
- Private drafts, independent responses, revision attempts, and a review history. Drafts autosave after a pause and on blur/navigation. Clearing a debate-turn draft preserves the inquiry portfolio. Storage failures retain work in memory and show an unsaved state.
- Teacher **demo** review with evidence feedback; all eight civilization concepts must be separately reviewed before the demonstration labels the whole standard ready. Gates and votes do not confer standards completion.
- Portfolio download in Markdown, including draft brief, revision, personal verdict, context notes, side quests, independent attempts, review history, and source references.
- Reused hearing rounds, two assigned cases, real entered opponent contributions, transcript/recording preparation, and four personal verdict choices. No fabricated student speeches are seeded in this project.
- Responsive HTML controls, visible keyboard focus, 48px controls, source attribution disclosure, no drag requirement, and reduced-motion support. The artwork is a background, never a source or a set of clickable image labels.

## Four-week curriculum

| Week | Instructional / individual | Group session |
|---|---|---|
| 1 | Meet Babylon: prerequisite geography, monarchy, empire, hierarchy, source origin. | Plan the case: polytheism, architecture, roles, personal authority/hierarchy explanation; **H-A**. |
| 2 | Read evidence: cuneiform, epic literature, Code, purpose/viewpoint/inference. | Build a cited claim, explanation and opposing interpretation; **H-B**. |
| 3 | Revise and predict: correct a claim; propose a hypothetical law change and effects on two groups. | Rehearse: listen to an actual classmate, answer with evidence, defend a revision. |
| 4 | Defend a fresh case and review the personal portfolio; **H-C**, with unfinished targets still open. | Final hearing, individual brief, personal verdict and defense; targeted reassessment. |

Budget approximately 45–60 minutes per session. A brief is roughly 250–400 words and a team hearing roughly 8–12 minutes; these are planning guides, not automatic assessment thresholds. Individual evidence is required during group sessions, including from learners serving as clerks or judges. The supplied Forge framework remains a draft for school review.

## Reuse and files

Added curriculum files:

- `src/app/projects/hammurabi-on-trial/hammurabi-on-trial.config.ts`
- `src/app/projects/hammurabi-on-trial/hammurabi-on-trial.inquiry.ts`
- The project’s eight-lesson entry in `src/app/projects/project-lesson-plans.json`.

Added reusable capability:

- `templates/debate-studio/domain/debate-inquiry.models.ts` defines `debate.inquiry-portfolio@1.0`, its validator, independent attempts, demo review records, and pure gate/target evaluation.
- `templates/debate-studio/ui/debate-inquiry.component.*` renders configuration without project-name checks.
- Optional `presentation`, `inquiry`, and source URL fields extend the existing 2.0-compatible package. Template implementation version is now 2.1.0. Existing Roman packages retain their defaults.
- The Debate Studio launcher validates inquiry references and sequencing before displaying the project. The catalog and existing local definition loader register this project.

Reused the lesson focus token/picker, scoped browser persistence, debate runtime, session/media adapters, opponent thread, response composer and final showcase. No core engine schema, provider SDK, or new project-specific component/service was introduced. Generic hearing titles and moderator questions replace the remaining Roman-specific assumptions in the shared hearing path. The Roman example walkthrough remains its own existing example.

Modified integration files: `projects/project-catalog.ts`, `runtime/project-launch/local-project-definition.source.ts`, `runtime/project-launch/template-launchers/debate-studio.launcher.ts`, and `runtime/local-template-registry.ts`. Modified template files: `debate-studio.models.ts`, `debate-studio-state.ts`, `debate-studio-runtime.service.ts`, `debate-studio.persistence.ts`, the debate page TS/HTML/SCSS, and faction-rail/showcase/workbench HTML. Existing concurrent edits in the catalog and debate page were retained. New tests are `debate-inquiry.models.spec.ts` and `debate-inquiry.component.spec.ts`.

## Artwork and historical basis

The illustration is an **imagined educational setting**, not a reconstruction of a documented Hammurabi courtroom. Mud brick, earthen plaster, reeds, timber, palms and clay tablets set the regional context. The decorative law stele and distant buildings are not artifact photographs. No blue Ishtar Gate, Roman Senate, modern gavel, or Assyrian guardian figures are used.

Saved asset: `public/debate-studio/babylon-hearing-v1.png` (2,646,022 bytes). The same asset appears on the catalog card, the learning workspace, and the hearing. Generated with the built-in Imagegen tool. Original retained in the Codex generated-images directory.

Reference checks:

- [Louvre — The Code of Hammurabi](https://www.louvre.fr/en/the-code-of-hammurabi): date, monument, royal judgments, and why “code” should not imply a modern statute book.
- [Yale Avalon — Code of Hammurabi](https://avalon.law.yale.edu/ancient/hamcode.asp): prologue and §§48, 55, 215–217, from L. W. King’s historical translation. Classroom paraphrases avoid treating older English social labels as precise modern classes.
- [Met — Inscribed brick, 41.160.188](https://www.metmuseum.org/art/collection/search/323756): an earlier Old Babylonian object from Eshnunna, explicitly distinguished from Hammurabi’s monument.
- [Met — Ur: The Ziggurat](https://www.metmuseum.org/essays/ur-the-ziggurat): regional architecture context, explicitly distinguished from Babylon and the illustrated hearing.
- [Oxford ETCSL — Gilgamesh and Huwawa, version A](https://etcsl.orinst.ox.ac.uk/section1/tr1815.htm): brief translation excerpt from lines 21–33, treated as literature rather than an eyewitness record.

The source map and standards basis remain in [the build plan](./HAMMURABI_ON_TRIAL_BUILD_PLAN.md). This project intentionally covers a selected standards set, not the entire Grade 6 year.

## TEMPLATE_CAPABILITY_GAP — Live school assessment and collaboration

**Requested:** live student AI testing, official teacher confirmation, shared group state, and durable class recordings/submission.

**Current boundary:** the existing Debate Studio launcher explicitly rejects sessions other than `localDemo` and installs memory session/media adapters. This project preserves that boundary. A browser “teacher preview” is not school authorization. Its reviews are always tagged `authority: demo` and cannot issue official mastery. Shared hearing activity in this launcher is a temporary demonstration; local portfolio drafts are separate.

**Implemented now:** source-grounded scripted practice/checkpoint questions, teacher/tutor curriculum instructions, independent evidence capture, local demonstration review, prerequisite enforcement within that demonstration, and honest local-save/export messaging. No AI-generated grade or simulated live student is represented as real.

**Required next integration:** connect the school’s authenticated assessment/gate gateway, roster and shared case workspace, scoped private persistence, and durable session/media adapters. AI should recommend readiness from individual evidence and record support used; teacher/server decisions must enforce the same gates at official filing. Review the full source packet and age-appropriate translations with the teacher before a classroom pilot. No deployment or backend permissions were changed in this task.

## Verification

Final validation: **production build passed; 30 targeted tests passed across 9 files**. Automated checks cover malformed inquiry references, ordered lessons, all eight civilization targets, gate dependencies and invalidation, separate review authority, preserved attempts/drafts, failed saves, neutral setting labels, and existing debate compatibility. Browser checks passed for save/resume; H-A, H-B, and H-C review/unlock; blocked dependent work; independent mode; the concept record; entering the hearing and returning to lessons; and a 390px phone layout with no horizontal overflow. No page errors were observed. Screenshots are in `output/hammurabi-on-trial/`. The final UI check waits for Angular to render the independent-response screen before asserting that practice hints are closed.

Architecture audit still reports two pre-existing violations outside this work: `core/index.ts -> ./templates` and `projects/mystery-substance/lab-kit/render-quality.service.ts`. Build style-budget warnings include several existing components; the debate page is slightly over the warning threshold but below its error threshold.

## Final image prompt

```text
Use case: historical-scene. Asset type: polished wide illustrated background for a grade 6 educational debate workspace, landscape 16:9. Primary request: Hammurabi on Trial, an imagined Old Babylonian hearing courtyard in Babylon, southern Mesopotamia (present-day Iraq), circa 1750 BCE. Warm mud-brick and pale earthen plaster courtyard walls with recessed buttresses, flat-roofed buildings, timber lintels and woven reed shade canopies. Two simple low benches facing across an open courtyard, pottery and clay writing tablets with reed styluses near the lower corners, a discreet small dark rounded stone law stele at far left as an interpretive decorative prop. Palm fronds beyond the walls, hazy Euphrates plain atmosphere. Broad calm open central floor and generous uncluttered center for a readable HTML learning card; architecture and texture richest at sides and top. Eye-level welcoming composition, softly painted realistic children's museum illustration, warm amber daylight, earth and terracotta colors with restrained indigo textiles. This is an explicitly imagined educational reconstruction, not an archaeological reconstruction of a documented courtroom. No people, no violence, no text or UI, no legible invented cuneiform, no modern court furniture, no gavel, no Greek or Roman columns, no marble Senate, no togas, no pyramids, no Assyrian winged bulls, no blue Ishtar Gate or Neo-Babylonian decoration, no fantasy castle, no watermark.
```
