# Survival Island Story Lab — interactive weeks

## Scope and testing boundary

Assigned project: `survival-island-story-lab`, Narrative Studio. Read the master handoff, agreed direction, AGENTS.md, component contracts and persistence specification. No other catalog project currently uses this template. Existing modified Narrative Studio page files belong to earlier work and will be left intact. This change adds a separate configured preview workspace and a narrow launcher selection.

User clarification: this is testing only; nothing should actually be recorded. Drafts and test paths are temporary in memory while this page is open. Switching weeks retains them; reload starts fresh samples. The workspace never reads or writes browser student storage, submits work, publishes, runs the coach, or marks completion. Existing assessed and final-example routes retain their implementation.

## Four-week / eight-session map

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — A voice on the shore | Write a sensory opening in a fictional island landing | Writing circle: edit dialogue and reader choices at a shelter | Opening scene; character dialogue and two decisions | Whose perspective? What does the character want? What does dialogue reveal? | Prose, choice labels, contrasting voices | Scene focus, viewpoint, tone, character pressure, starter detail | Short shore/shelter story, with a small playable graph |
| 2 — The price of a choice | Build a branch map around a washed-out crossing; add or restore continuations | Play competing routes and rewrite the cost of rescue | Consequence map; two distinct playable outcomes | What changes because of this choice? What is gained or risked? | Graph connections, branch prose, route outcomes | Branch structure, destination, supplies, dilemma, starting node | River route with a rescue decision and alternate endings |
| 3 — The missing lantern | Compare a flawed scene with its editable draft and repair continuity | Play every ending; revise details that fail on another path | Revised scene pair; tested endings | Where did the object go? Does a shared scene work after both routes? | Earlier sample versus current prose, path traces, choice text | Continuity fault, converging routes, reveal order, pacing | A lantern continuity puzzle with a deliberately contradictory merge |
| 4 — The last signal | Edit the climax and add/change endings in a longer story | Read and share a playable preview, return to writing at any scene | Final branching story; local reader demonstration | Which earlier detail earns the ending? How do choices reveal change? | Complete graph, revised climax, alternate endings | Full graph, ending stakes, tone, reading route, narrative pressure | Complete fictional signal-rescue story; no earlier work needed |

The group sessions are activities for a future writing circle; this build is a single-user local test. Products remain proposals. Both planning boxes follow the chosen week; manually selecting another tool is labeled as an extra tool for that week. Historical facts and source material in the existing launch are unchanged. The weekly samples are explicitly fictional and make no new historical claims.

## Architecture and capability review

Reuse `NarrativeStudioRuntimeService`, its branch engine, scene mutation methods, word count, map renderer, and memory adapter. Compose one memory-backed runtime per week using dependency injection; retain it while the workspace remains open. No assessed state is loaded. Optional typed `previewWeeks` supplies scenarios, tools, two-session mappings, samples, products, questions, evidence, and future controls. Validate this extension before launch. The existing schema remains backward compatible; no LMS core contract changes.

No required capability gap: editing, branching, and reading already exist. A reusable weekly presentation and configuration extension supplies session selection and direct samples. Connected tutoring, persistent work, shared editing, assessment, and publication are intentionally outside this test build.

## Verification / delivery

Preview/build/log prefix: `story-writing-week`. Port 4326 was occupied; the dedicated static preview uses **4399**:

http://127.0.0.1:4399/projects/survival-island-story-lab/lessons?lesson=1

The server serves the production bundle from `output/story-writing-week-build/browser`. It is local only; nothing was published or deployed.

### Files

Added:

- This project-specific plan and delivery record.
- `src/app/projects/survival-island-story-lab/survival-island.weeks.ts`: four fictional sample scenarios, eight session targets, proposed products, and tutor planning.
- `src/app/templates/narrative-studio/domain/narrative-preview.models.ts`: typed optional weekly configuration.
- `src/app/templates/narrative-studio/core/narrative-preview.ts`: preview access predicate, scenario configuration, and validation.
- `src/app/templates/narrative-studio/runtime/narrative-week-runtime.service.ts`: composes one existing Narrative Studio runtime per week with its own memory adapter.
- `src/app/templates/narrative-studio/ui/narrative-week-workspace.component.ts`, `.html`, `.scss`, and `.spec.ts`: writer, map, revision comparison, reader, temporary path replays, and responsive planning panels.

Modified:

- `src/app/projects/survival-island-story-lab/survival-island.config.ts`: opts this project into the extension.
- `src/app/templates/narrative-studio/domain/narrative-studio.models.ts`: optional `previewWeeks` field.
- `src/app/runtime/project-launch/template-launchers/narrative-studio.launcher.ts`: selects the weekly workspace only for a configured `preview` / `localDemo` session, before any browser-storage provider or intro load is created.
- Only the `survival-island-story-lab` object in `src/app/projects/project-lesson-plans.json`: eight labels, products, and focus targets. The file was re-read immediately before this object was replaced; other objects were not reformatted.

Existing modified `narrative-studio-page.component.ts` and `.html` were left untouched. No shared host, navigation, standards-review, global styles, packages, lockfiles, or other project source was edited by this task. The workspace scrolls itself below the existing navigation instead of changing the common header.

### Validation

- Narrative Studio: **6 test files, 27 tests passed**, including nine new weekly-preview tests. The new assertions cover all eight targets and visible scene selection, direct Weeks 2–4/final access, no student-storage reads/writes or coach calls, edited and deliberately empty drafts, fresh-page sample reset, retained temporary replays after revisions/branch changes, reversible branches, and invalid preview configurations. Existing assessed publication/branching tests also pass unchanged.
- TypeScript application check: passed.
- Production Angular build: passed. Existing component-style budget warnings remain, including the unchanged legacy Narrative Studio page; no new weekly-workspace style-budget warning. Other builds in this shared directory may report their own current warnings.
- Architecture checker: still fails on `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a project service. Both findings were inspected and neither file was edited here. Log: `output/story-writing-week-architecture.log`.
- Scoped `git diff --check`: passed. Final diff review confirms the three existing tracked source files contain only the intended additions; the lesson entry change is isolated and the pre-existing Narrative Studio page changes remain intact.

Browser checks use an isolated headless Chrome profile against the actual production preview after the desktop browser automation connection repeatedly timed out. They cover every direct session URL, real lesson navigation, an intentionally emptied scene retained across session changes, reset on reload, a completed final path, keyboard operation of the collapsible products panel, and the existing read-only final example. Browser localStorage remained empty in all eight sessions, and no runtime exceptions occurred. Laptop (1366), tablet (820), and phone (390) layouts reflow without page-level horizontal overflow. Screenshots were visually inspected; fixes made from inspection include the visible scene selector, normal-weight prose, initial activity positioning, and space below the taller tablet/phone navigation.

Artifacts: `output/story-writing-week-tests.log`, `output/story-writing-week-build.log`, `output/story-writing-week-types.log`, `output/story-writing-week-browser/report.json`, and PNG screenshots in the same browser-artifact folder. The output folder also contains the focused test configuration, local static-server script, and repeatable browser-check script. These are project-specific verification artifacts, not student records.

### Decisions, deviations, and limitations

The user's test-only clarification supersedes the handoff's persistent draft/reload checks: temporary drafts and at most 20 temporary reading versions per week survive session switching only while this workspace is open. Reload or leaving the workspace resets the samples. Older saved/published student state cannot lock the preview because the preview never loads it. No completion, assessment path, publication, or tutor conversation is generated. The final example continues to use the separate existing reader.

The optional extension is backward compatible and limited to local authoring preview. Existing assessed runtime, browser persistence, branch helpers, map renderer, and publication contracts remain unchanged. No LMS core schema or vendor dependency changed. No required `TEMPLATE_CAPABILITY_GAP` was introduced. Connected tutoring, model adaptation, persistent student work, collaboration, and assessment remain deferred.

Next phase: review these temporary writing activities and tutor plans with the user. Any persistence or connected tutor implementation needs its own requested phase.
