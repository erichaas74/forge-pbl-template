# Single-page project invitations

September 8, 2026. This supersedes the launch flow in PROJECT_GOAL_LAUNCH.md and PROJECT_LAUNCHES.md, following the request for a game-style pitch as the first page of every project.

## Student flow

The canonical `/projects/:projectId` route opens a single invitation with the project title, story, artwork or opening media, role, grade/subject, experience highlights, learning goals, and one **Start Project** button. The button opens the existing `/projects/:projectId/experience` route. There is no mandatory teaser activity, practice question, goal form, or second introduction screen.

The voyage film plays inline with its existing captioned media renderer. The Senate retains both voiced opening clips with native video controls and an adjacent clip selector; switching clips replaces the old player. The museum retains its interactive 3D object. The Unlabeled Shelf embeds Professor Pip's illustrated story, with optional voices, the test and POOF, the mystery-vial reveal, and replay; its story presentation requires no practice answers or saved receipts. Pip's narration uses a quicker, more excited script and regenerated audio; see [the Pip implementation report](PROFESSOR_PIP_OPENING.md). Playback is optional and never starts the project or changes the page. Other projects use their existing artwork and written story. Completed-project links remain secondary and only appear when a final-example configuration exists.

All ten built-in projects use the invitation, including Cascade Bay Crisis Center. Its catalog entry now selects `opening`; its operations room remains at `/experience`. The existing optional catalog `entryMode` capability remains available to hosts.

The page is responsive, uses semantic headings/lists, offers keyboard focus styles, and respects reduced motion. Navigation failure leaves the button available and announces a retry message.

## Architecture and reuse

- `ProjectIntroComponent` is a read-only presentation of injected catalog metadata plus optional `ProjectIntroConfig`. Projects without legacy intro configuration use their real catalog description, learning goals, and cover image; missing artwork has a symbolic fallback.
- Existing introduction content, mission lists, catalog learning goals, local assets, media renderer, 3D viewer, route convention, template launchers, and final-example capability are reused.
- The project host resolves the invitation before loading the activity package. The host explicitly rejects an unavailable final example and avoids advertising its link.
- No new core schema, template-specific page, persistence adapter, dependency, runtime event, or assessment behavior was introduced. The concurrent catalog entry-mode contract is preserved.
- The invitation does not load or write opening records, accept responses, simulate completion, or clear student history. Existing persistence/runtime contracts and legacy scene plugins remain intact for other consumers.
- Deliberate behavior change: the earlier multi-step teaser and product-page handoff are no longer mounted by the launch. Story and media are presented alongside the pitch instead.

## Files

Added:

- `src/app/runtime/project-launch/project-host.component.spec.ts`
- This report.

Modified:

- `src/app/features/project-intro/project-intro.component.ts`, `.html`, `.scss`, `.spec.ts`
- `src/app/runtime/project-launch/project-host.component.ts`, `.html`
- `src/app/runtime/project-launch/project-intro.registry.spec.ts`
- `src/app/projects/project-catalog.ts`, `.spec.ts` (only the Crisis Center entry-mode choice/assertion)
- `docs/architecture/PROJECT_GOAL_LAUNCH.md`, `PROJECT_LAUNCHES.md`
- `docs/crisis-operations/README.md` (launch route description)

The workspace includes other ongoing edits; this list attributes only this task's changes.

## Verification

Component tests exercise all ten configurations, one-click activity navigation, a catalog-only project without artwork, optional media, clip switching and failure, model rendering, navigation failure/cancellation/retry, duplicate-click protection, preserved legacy records, and read-only completed examples. Host tests exercise all ten templates without loading their activity packages and explicit rejection of missing final examples. Registration tests validate optional legacy intro configuration and exercise every existing activity launcher with a local transport for static JSON packages.

Initial full-suite run: 466 passed, 8 failed, across 94 files. Two launch-registration expectations were subsequently updated for optional intro content and static JSON transport. The other failures are in untouched project-library and completed-example tests: a stale library project list, a stale completed-sample count, editable controls in the robot sample, and three voyage sample failures reporting `PLANNING_TARGET_REQUIRED`.

The architecture checker still reports its two existing findings in `core/index.ts` and `projects/mystery-substance/lab-kit/render-quality.service.ts`; neither is part of this change.

Final production build: passed, with existing stylesheet-budget warnings outside the launch page. Focused verification: **6 files, 35 tests passed**, covering the component, project host, intro registry/activity launchers, persistence runtime, media player, and catalog.

Browser verification: all ten project invitations render at 390px without horizontal overflow, with three real learning goals and one Start Project button. Desktop and mobile layouts were visually inspected. The robot and crisis buttons open their existing workspaces directly; the voyage clip plays inline while Start Project stays available; switching Senate clips updates the player and summary on the same page. No broken cover images were detected in the nine configured-story launches. Temporary viewport overrides were reset. `git diff --check` passes for this task's tracked changes.

## Scope and next phase

No new `TEMPLATE_CAPABILITY_GAP` or breaking schema deviation. No deployment. Recommended next step is review of the local visual preview; further activity or showcase work is separate.

## Frontier film and optional first trade

The September 8 Frontier follow-up adds its supplied voiced launch film and an optional cargo-practice dialog using the existing decision-scene configuration. Start Project still enters the workspace directly. See [the implementation and verification report](../frontier-trading/LAUNCH_VIDEO.md).