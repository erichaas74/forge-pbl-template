# Interactive weekly project redesign — implementation handoff

**2026-09-15 update:** Read [Project activity rules](PROJECT_ACTIVITY_RULES.md)
before using this handoff. They apply to existing fixes and new builds and
supersede conflicting instructions below, including main-panel text editors and
parallel assignments. Work on one selected project, fix and verify it, and review
the result with the user before starting another.

Use this document to assign one existing project to another implementation task. Different projects may proceed in parallel. Read [the agreed direction](INTERACTIVE_WEEK_REDESIGN.md) first; its product decisions are already settled.

## Copy-and-paste task prompt

Replace `[PROJECT NAME]` with one existing project.

```text
Redesign [PROJECT NAME] in C:\Users\erich\Desktop\pbl-lms\forge-pbl-template.

Read AGENTS.md, docs/INTERACTIVE_WEEK_REDESIGN.md, and
docs/INTERACTIVE_WEEK_IMPLEMENTATION_HANDOFF.md before making changes.
Use Robot Delivery Code Lab as the implemented layout/behavior reference.

Own this one project. Other tasks are working on other projects in parallel.
Inspect the current implementation and write a four-week/eight-session map
before coding. Each week must open its own meaningful interactive experience.
Preserve the agreed roughly 70/30 activity and planning layout, the proposed
weekly-products box, and the disconnected AI Tutor planning list. Replace
explanation/reflection/checkpoint forms with tutor planning content. Keep real
product creation tools. Make every week and challenge directly testable,
including later/final activities, with sample starting content when needed.
Do not implement assessment completion, AI integration, or shared work.

Do not ask me to repeat decisions already recorded in the documents. Ask only
about unresolved project-specific choices that materially affect the design.
Otherwise proceed through implementation, tests, and browser verification.
Preserve existing work, keep shared-file changes narrow, and identify any
template overlap before editing files owned by another task. Return a working
local preview and a project-specific handoff with the changes and test results.
Do not publish or deploy.
```

## Settled requirements

- Four weeks, two sessions per week: individual learning, then group activity. Shared-state/collaboration implementation is deferred.
- Interactive activity opens immediately on the week/session page. It dominates the screen. Desktop proportions are approximately 70% activity and 30% right column, not fixed dimensions.
- Right column: proposed weekly products/activities at the top, then a box explicitly labeled **AI Tutor**.
- The tutor box is a builder-facing planning list, not a working student tutor. Include questions, evidence it will inspect, and model settings it will eventually control. Clearly identify it as disconnected.
- Remove explanation, reflection, defense, and checkpoint forms from the testing workspace. Move their learning intent into the tutor list. Retain code editors, story writing, exhibit composition, recording, and other actual product-creation tools.
- Weekly products are potential deliverables. No completion checkbox, required submission, mastery approval, or finalization is needed now. The future tutor will guide/review work for standards alignment before completion is recorded.
- The future tutor has full model control. For this build, describe those settings and preserve useful manual controls; do not pretend automatic adaptation is working.
- Every week, session, tool, and challenge is accessible in the testing experience. Jumping to a final must work with no earlier progress. Provide clearly identified sample starting content where dependencies require it, without falsely marking earlier work complete.
- Change the activity meaningfully across weeks: routes, environments, problems, tools, evidence, or scenarios. A different title or color on the same repeated activity is insufficient. Reuse engines where appropriate.
- Standards and learning objectives may be revised thoughtfully. Identify the concepts and evidence intended for future tutoring without claiming that the current prototype teaches or assesses them already.
- Small screens must reflow, preserve readable controls, and allow the two planning boxes to collapse. Do not shrink the whole desktop interface to fit.
- All 18 current projects are in scope overall. Unbuilt race-car engineering and research symposium concepts are excluded. Each task implements only its assigned project.

## Inspect and map before coding

1. Read repository instructions and the relevant numbered build specifications. Inspect the assigned project's configuration, template, lesson-plan entry, assets, runtime gates, and final-example route.
2. Record existing working-tree changes. Do not reset, overwrite, or reformat other tasks' work.
3. Write `docs/<project-or-template>/INTERACTIVE_WEEK_REDESIGN.md`, using a project-specific filename if that folder serves several projects. Include this matrix:

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |

4. Check whether the existing engine can provide the proposed interactions. Report a `TEMPLATE_CAPABILITY_GAP` for missing required behavior and describe a reusable capability; do not silently substitute a form or create project-name branches in a generic engine.
5. Explain the proposed weekly progression in a concise update. Ask only about genuinely unresolved project-specific decisions; otherwise continue. The accepted global direction does not require another permission round.

## Implementation pattern and reference files

All paths below are relative to the repository root.

| Reference | Purpose |
| --- | --- |
| `src/app/projects/robot-delivery/robot-delivery-weeks.ts` | Four weeks of project-specific content, two session mappings per week, tutor planning, and editable starting code. |
| `src/app/templates/programming-automation/ui/automation-week-workspace.component.ts` | Lesson-to-challenge selection, draft preservation, sample initialization, and replay handling. |
| `src/app/templates/programming-automation/ui/automation-week-workspace.component.html` | Activity-first layout, product list, tutor list, and real program controls. |
| `src/app/templates/programming-automation/ui/automation-week-workspace.component.css` | Responsive proportions, week accents, and collapsible planning panels. |
| `src/app/templates/programming-automation/ui/automation-week-workspace.component.spec.ts` | Direct entry, session switching, retained drafts, unlocked preview, and validation tests. |
| `src/app/shared/project-lessons/project-lesson-focus.ts` | Existing lesson context supplied by the host. |
| `src/app/projects/project-lesson-plans.json` | Shared lesson titles and focus targets. Change only the assigned project's entry. |
| `src/app/runtime/project-launch/project-host.component.*` | Existing common host and navigation. Usually no change is needed. |

The robot implementation is a reference, not a universal engine. Do not import robot runtime classes into other templates or copy robot-specific models into the LMS core. Reuse the assigned template's existing configuration, activity renderers, authoring controls, and persistence adapters. Extend it with optional typed configuration and validation where necessary.

Bind the selected lesson number to the intended session activity. Merely updating a heading while leaving the old activity selected does not meet the requirement. Preserve drafts when switching sessions. Initialize sample content only for untouched work; do not recreate it after a tester intentionally empties or changes a draft.

Use an explicit local authoring-preview boundary for unrestricted access, as the robot does. Do not satisfy testing access by falsely passing assessments or deleting authorization rules. Valid game mechanics such as collisions and resource consequences still work; testers can revisit/retry activities. Keep real invalid-command/input feedback near the affected control.

Keep final-example routes functioning. The robot's recorded example retains its original read-only presentation; rebuilding every final example is not required to implement a weekly testing workspace.

## Parallel work: avoid shared-file conflicts

- Assign projects from different template families first. Two project names do not necessarily mean independent code: the two news projects share History Live, and the two debate projects share Debate Studio. Check the catalog's `template.id` and actual imports before assuming separation.
- When two assigned projects share a template, give one task ownership of the shared template change. The other can prepare project content and its weekly map, then integrate against that change. Do not make competing edits to the same template component.
- Keep each task's notes and artifacts in a project-specific location. Treat this master handoff and the agreed-direction document as shared references; write project progress in the assigned project's own document.
- Make narrow edits to the assigned entry in `project-lesson-plans.json`, and re-read it immediately before writing. Do not regenerate or format the whole catalog/lesson file while another task is editing it. If simultaneous edits are unavoidable, prepare the new entry in a project-specific file and nominate one task to integrate the entries.
- Avoid unrelated changes to global styles, the common host, package dependencies, lockfiles, and shared navigation. If a common change is required, identify it explicitly and coordinate one owner. Do not block independent project work while waiting for that integration.
- Use a different local preview port and output/log prefix per task. Port 4315 is used by the robot preview. Avoid concurrent builds writing the same output directory; use separate build-output paths or serialize final builds.
- If work is isolated in a separate checkout, verify that it actually contains these documents and the robot reference files before starting. They may be uncommitted in the shared working folder; a checkout from the last commit alone may omit them. Do not silently implement against an older baseline.
- Before finishing, inspect the final diff to ensure only intended project/template changes were introduced. Preserve unrelated existing changes.

## Acceptance and verification

Verify these behaviors with meaningful tests and browser inspection:

1. Each of the eight sessions opens its intended activity. Weeks have visible, substantive differences.
2. Open Weeks 2–4 and the final directly with no prior work. Repeat with a previously locked/exhausted saved testing state where that template supports it.
3. Switching sessions and returning restores edits, trial history, and deliberately empty drafts. Sample data does not overwrite user work.
4. Actual creation and interaction work: run the model, change a setting, edit a product, replay a result, or perform the equivalent core action. Controls must not be decorative.
5. No assessment forms or required completion workflow remain in the testing workspace. Both planning lists match the selected week, with clear context if an extra activity is selected.
6. The tutor is clearly disconnected. No automatic review, adaptation, collaboration, or mastery is claimed.
7. Check normal laptop, tablet, and phone layouts. Keep the main action discoverable, use readable labels, avoid horizontal overflow, and verify keyboard access and collapsible panels.
8. Run the relevant tests and production build. Run shared integration/architecture checks where applicable. Distinguish failures introduced by this work from unrelated repository failures; never weaken tests to hide regressions.

The robot delivery record lists the repository failures observed during its build. Those are historical findings, not permission to assume a new failure is unrelated. Inspect current failures and report their causes.

Finish with a project-specific record of files added/modified, tests, build results, browser checks, architecture choices, any capability gaps, and remaining limitations. Return a working local preview URL. Do not deploy or publish unless separately requested.
