# Project launches and final-example walkthroughs

**Current flow:** The choice-card and written-response screens described below have been replaced with a visual final-product page and an inactive “Future chatbot link” panel across all seven launches. See [the current launch implementation](PROJECT_GOAL_LAUNCH.md). The earlier persistence contracts remain compatible with existing records.

Implemented September 5, 2026. Scope: the six project openings, saved starting thoughts, activity navigation, and illustrative teacher walkthroughs. This change does not implement the earlier full-project audit or connect an AI tutor.

The Unlabeled Shelf now also includes the approved Professor Pip cartoon opening with optional voices, a student-triggered test, and a comic reveal. See [Professor Pip implementation](PROFESSOR_PIP_OPENING.md) for the extension, saved practice receipt, and current validation results.

The other five projects now also have tailored interactive openings, including cargo loading, artifact spotlights, a newsroom montage, voiced senators, and animated voyage outcomes. See [upgraded project openings](UPGRADED_PROJECT_OPENINGS.md) for their media, saved choices, reuse audit, and latest verification.

## Student experience

Every built-in project opens at `/projects/:projectId`. The invitation uses the project's existing artwork, a role, a driving question, and a three-part mission. Students complete an ungraded practice challenge, choose a starting direction, explain their reason, ask a question, and record confidence. Feedback is scripted curriculum content. It does not grade the learner or claim to be AI.

| Project | First challenge | Mission button | Final format previewed |
| --- | --- | --- | --- |
| The Unlabeled Shelf | Observation, inference, and prediction | Open the Evidence Locker | Case file and scientific defense |
| Frontier Trading Company | Compare possible profit, cargo space, and uncertainty | Open the Trading Post | Season ledger and strategy defense |
| Objects That Changed Us: Ancient Egypt | Connect an object label to an inquiry and avoid overclaims | Unlock My Museum Wing | Museum board and curator-tour transcript |
| History Live: The Revolutionary War | Treat a claim as unconfirmed until verified | Enter the Newsroom | News package and source notes |
| The Fate of the Republic | Answer an argument with an evidence-seeking rebuttal | Take My Seat in the Senate | Senate address, rebuttal, and reflection |
| Race Around the World | Weigh route distance against winds and resupply information | Set Sail from Lisbon | Guided expedition replay and explanations |

Starting preferences are reflective responses. They do not spend resources, assign a team/network, preselect an official mission, or modify an existing activity attempt. Actual activity choices remain in each workspace.

After acceptance, the primary button becomes **Continue my project**. Students can revisit the opening, read the original response, and save later revisions. Activities include a common return link to the launch and opening record.

## Teacher examples

`/projects/:projectId/final-demo` now opens a completed fictional artifact in the project's native presentation view: a lab case, five-slide company defense, four-wing museum, broadcast package, Senate premiere/verdict, or five-chapter journey replay. Each includes an optional teacher guide tracing evidence, decisions, feedback, and revision. The completed lab example includes its sample identifications. See [completed project showcases](COMPLETED_PROJECT_SHOWCASES.md) for the current implementation and validation.

The demo does not resolve an authenticated enrollment or write a learner record. Native runtimes are composed with isolated fictional data and disposable adapters. Returning to the launch preserves the student's opening.

## Architecture and reuse audit

- New optional capability: `project.intro`, schema `1.0`, curriculum version `1.0.0` for each opening.
- Curriculum lives in `src/app/projects/project-intros.ts`; the runtime composition root registers it through `ProjectIntroRegistry`.
- Contracts, validation, response history, and save orchestration live in `shared/project-intro`. Generic UI lives in `features/project-intro`. Browser persistence lives in `infrastructure/persistence`.
- Existing project catalog, session context, template launcher contracts, template components, activity state, and artwork are reused.
- The journey now uses the same project host and activity route convention as the other five templates. Its compatibility session adapter preserves the existing per-tab demo learner identity, tenant, and class. Existing journey records are not moved or reset.
- All six activity destinations are `/projects/:projectId/experience`. The existing trading builder-info route remains available. Legacy aliases lead to the corresponding launch, including `/journey-replay`.
- No core schema, runtime engine, resource calculation, grade, official submission, dependency, or backend vendor was changed by this feature.
- External catalog projects without this optional opening capability retain the existing direct-host behavior. Requesting an unconfigured final demo reports `CAPABILITY_NOT_INSTALLED`.

## Saved evidence and future tutor integration

`IntroResponse` contains the practice choice ID, starting direction ID, reason, question, and confidence. `IntroSnapshot` includes schema version, revision, updated timestamp, current draft, and accepted response history. The first history entry is preserved; later accepted entries use `projectIntro.revised`. Accepted requests carry a client event ID for idempotency.

The persistence contract takes a session scope and intro version. Browser keys separate tenant, class, student/actor, team context, attempt, project ID, project version, and opening version. Records are personal even when a team context is present.

Text is saved after a 700 ms pause, on blur, and before internal navigation. Entering an activity waits for a successful acceptance save. Save failures retain the text and block the attempted departure, with visible error focus and retry. A stale-tab revision conflict does not overwrite the other tab. Unreadable stored data is retained for recovery. Browser unload warns when a dirty draft remains.

`PROJECT_INTRO_PERSISTENCE` allows a school host to supply an authenticated cloud adapter without changing the forms. The current default says **Saved on this browser**. It is local draft storage, not school-wide synchronization or an authoritative assessment record. Shared-device previews use the existing local preview identities; they are not a login system.

A future tutor can read the scoped snapshot and the matching versioned configuration to compare the initial reason, question, confidence, and later revisions. Tutor feedback, additional questioning, consent/retention policy, authenticated cloud persistence, and official assessment integration remain separate work. Opening responses currently become revisitable through the common launch link; they are not automatically inserted into each template's final submission.

## Accessibility

Native radio buttons, labeled text areas, keyboard controls, visible focus, live save/feedback status, and non-timed progression are used throughout. Step changes and opened response records receive focus and scroll into the nearest view. CSS supports small screens and reduced motion. There is no automatic sound, video, or countdown.

## Files added

- `src/app/shared/project-intro/project-intro.models.ts`
- `src/app/shared/project-intro/project-intro.runtime.ts`
- `src/app/shared/project-intro/project-intro.runtime.spec.ts`
- `src/app/infrastructure/persistence/browser-project-intro.adapter.ts`
- `src/app/projects/project-intros.ts`
- `src/app/runtime/project-launch/project-intro.registry.ts`
- `src/app/runtime/project-launch/project-intro.registry.spec.ts`
- `src/app/runtime/project-launch/local-project-session.ts`
- `src/app/runtime/project-launch/template-launchers/journey-replay.launcher.ts`
- `src/app/runtime/project-launch/template-launchers/journey-replay.preview.ts`
- `src/app/features/project-intro/project-intro.component.ts`, `.html`, `.scss`, `.spec.ts`
- `src/app/features/project-intro/project-final-example.component.ts`, `.html`, `.scss`
- This implementation report.

## Existing files modified for this feature

- `src/app/app.routes.ts`
- `src/app/projects/project-catalog.ts` and `project-catalog.spec.ts`
- `src/app/features/project-home/project-home.component.html` and `.spec.ts`
- `src/app/runtime/project-launch/project-host.component.ts`, `.html`, `.scss`
- `src/app/runtime/project-launch/local-project-definition.source.ts`
- `src/app/runtime/project-launch/template-launcher.registry.ts`
- `src/app/features/journey-replay/journey-replay.routes.ts`

The workspace contains substantial unrelated changes from other work. This list identifies this feature's edits rather than attributing the full working-tree diff to the launch work.

## Validation

- `npm run build`: passed. Six existing component-style size warnings remain outside the launch styles. Initial bundle approximately 284 kB raw.
- `npm test -- --watch=false`: **58 files, 262 tests passed**.
- New tests cover six distinct configurations and example links, validation errors, all six activity targets, preserved journey preview identity, draft/acceptance history, idempotency, incomplete/unknown choices, scope isolation, stale writes, recovery after storage failure, navigation blocking, and read-only example traversal.
- Browser verification at localhost: science invitation artwork, expedition invitation/challenge/mission, restored challenge after reload, successful saved response and activity entry, return/resume, timestamped opening record, teacher walkthrough, and catalog links.
- `git diff --check`: passed; Git printed existing Windows line-ending notices.
- `npm run test:architecture`: reports two issues outside this feature: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` residing under project content. No new launch file is reported. The first finding appears to treat the core's own `templates` folder as the forbidden top-level template layer; verify that checker separately before changing the export.

## Deviations and next phase

No breaking core-contract deviation. The later [completed showcase implementation](COMPLETED_PROJECT_SHOWCASES.md) supersedes the original guided text previews with populated native presentations. Opening preference capture remains separate from official activity choices.

`TEMPLATE_CAPABILITY_GAP`: authenticated, synchronized storage for opening records and a cross-template tutor/final-submission consumer are not yet supplied. The reusable adapter and versioned response contracts are in place. Recommended next phase: wire the authenticated persistence adapter and tutor context consumer, then validate student/teacher permissions and final-reflection comparisons using classroom test accounts.
