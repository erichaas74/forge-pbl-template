# Interactive week redesign — agreed direction

**2026-09-15 update:** Read [Project activity rules](PROJECT_ACTIVITY_RULES.md)
first. They apply to existing fixes and new builds and supersede conflicting
guidance below, including main-panel text editors and parallel project rollout.
This document retains the earlier implementation record.

2026-09-14. Scope: all 18 current projects, with one project assigned to each implementation task. The user has since authorized separate tasks to work on different projects in parallel. The unbuilt race-car and research-symposium concepts remain outside this work.

For instructions to give another task, use [the implementation handoff](INTERACTIVE_WEEK_IMPLEMENTATION_HANDOFF.md). This document is the agreed product direction and robot delivery record.

Every project keeps four weeks with two sessions each. The interactive experience opens immediately and receives roughly 70% of desktop width. The right column contains proposed weekly products first, followed by an AI Tutor planning panel. The proportions adapt to smaller screens, and both planning sections can collapse.

The tutor is not connected. Show proposed questions, evidence to inspect, and future model adjustments. Remove explanation, reflection, and checkpoint forms from the testing experience. Keep actual product-authoring tools. Products are listed as potential work; no completion, standards approval, or mastery is recorded. The future tutor will guide and review products for standards alignment, use the relevant evidence, and have full control of the interactive model through its supported controls. Shared/team work is a separate build.

All weeks, sessions, and challenges must be directly testable, including finals. Provide clearly identified sample starting code/content where needed. Preserve tester edits between sessions. Actual simulation outcomes and trial replay are useful test feedback, not lesson completion.

Different weeks need materially different challenges, geometry, routes, tools, or scenarios. Reusing a simulation engine is appropriate; repeating the same activity with a new heading is insufficient. Novel routes and adventure settings should serve the activity without adding confusing navigation. Standards may be revised; much of the eventual learning and checking will occur through the future tutor.

This direction supersedes the checkpoint-first and optional-tutor presentation in earlier plans. Existing assessed runtime contracts remain available outside the authoring preview. No AI integration, shared work, or production deployment is included.

## First project: Robot Delivery Code Lab

| Week | Individual session | Group activity session | Proposed products |
| --- | --- | --- | --- |
| 1 — Precision driving | Precision parking with selectable distances | L-shaped route around a barrier | Parking program and cornering program |
| 2 — Warehouse automation | Resize a route with SIDE | Loop around checkpoint stations | Parameterized route and repeat-loop patrol |
| 3 — Cross the moving city | Time a scout crossing | Cross the scout and sliding gate | Two timed navigation programs |
| 4 — Delivery finals | Heavy cargo delivery | Two-parcel delivery circuit and return | Cargo program and final autonomous program |

Each session loads a distinct existing course, with consistent code controls and week-specific visual accents. Extra calibration, coordinate, and battery challenges remain available in the challenge selector. When an extra challenge is selected, the weekly planning panel retains its week and explicitly identifies the extra challenge focus.

Tutor planning includes wheel travel, proportional distance, turns, variables, loops, checkpoint evidence, distance/speed/time, collision diagnosis, cargo effects, and route tradeoffs. Revisions and final defenses appear as questions rather than forms. Future model control lists are planning content, not implemented automation.

## Implementation boundary

`AutomationProjectConfig.previewWeeks` is an optional, validated template extension with four weeks, two sessions per week, optional runnable sample code, proposed products, tutor questions, evidence, and model adjustments. It reuses existing course definitions, the command editor, execution engine, replay, lesson context, and persistence adapter. No core LMS contract changes or project-name branches were added to shared engines.

Full-access behavior requires a local preview session and this configuration; finished samples and assessed sessions retain their existing lifecycle. Preview code can be edited and run even if an old saved championship state was finalized or locked. Preview trials do not unlock, submit, or complete anything. Compiler errors still identify invalid code.

The command editor's optional `assessmentLinks` input hides links to retired assessment forms in this workspace. Defaults preserve existing clients. Current robot lesson labels and focus targets match the eight course entries. Drafts and trial history are retained through session changes.

## Verification

Tests cover all eight session-to-course transitions, runnable starters, draft retention (including intentionally empty programs), direct final access with saved locks, repeat trials without completion, preserved assessed-session gates, and invalid preview configuration. Existing assessed-workspace tests run without the optional preview extension and retain their assertions.

Robot is the first completed implementation. Other tasks may now implement separately assigned projects using the handoff. No other project workspace was changed by the robot implementation.

## Delivery record

Added: this plan; `projects/robot-delivery/robot-delivery-weeks.ts`; and the template's `automation-week-workspace.component.ts`, `.html`, `.css`, and `.spec.ts`.

Modified: robot project configuration; the robot entry in `project-lesson-plans.json`; automation domain models, configuration validation, runtime access handling, and runtime tests; the automation lab host/template and legacy tests; and the command editor's TypeScript/template assessment-link input. Existing unrelated working-tree changes were retained.

Validation results:

- Production build passed. Existing component-style budget warnings remain outside the new workspace.
- Robot suite: 11 test files and 77 tests passed, including the five new preview tests.
- Full suite: 168 test files passed, six failed; 939 tests passed and 12 failed. The failures concern an old 16-project homepage expectation, a static-package mock rejecting the versioned Shadow Gallery URL, missing jsdom canvas support in two sample/opening suites, and broadcast media-query mocks missing `addEventListener`. These areas were not changed in this implementation. Full log: `output/robot-week-full-tests.log`.
- Architecture check still reports `core/index.ts` importing `./templates` and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a project service. Both files are unchanged by this task.
- Browser verification: real Phaser course rendering, week-specific course changes, editable sample code, trial replay, direct final access/run, 1366px laptop layout, and 390px phone reflow without horizontal overflow. Run control verified at approximately 488px from the viewport top at 1366 × 768. Temporary viewport override was reset.
- No new required simulation capability gap. Connected tutoring, full model-control integration, assessed completion, and shared work remain explicitly deferred, rather than simulated.

The former assessment-form layout is deliberately replaced only in the configured local authoring preview. Optional extension defaults preserve the assessed lifecycle and recorded final example. This is the first project in the agreed sequence, not completion of the full catalog redesign.
