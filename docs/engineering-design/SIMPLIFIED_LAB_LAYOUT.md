# One header, canvas first

All five learning steps, the student's final demonstration, and the completed monument example now use one compact header. The project title banner, large lesson card, separate workspace navigation, simulation introduction and embedded day-control header no longer stack above the scene.

- The step picker, Guide, workspace menu, build controls, Sun, Play day, mark action, events/date/time, saved-test action and tool menu share the header. A thin daylight scrubber is part of the same header. Controls adapt to the current lesson and read-only state.
- Guide opens a floating panel with the current investigation, explanation, saved response and optional model guidance. It leaves the canvas geometry and camera unchanged. Earth’s tilt and advanced measurements open when requested. Learning navigation stays in the header.
- Sample models, evidence, explanations, export, project links and final demonstration are available from the workspace menu. Preview adoption still preserves the previous design. Existing drafts, notes and trials retain their persistence contracts.
- Final-date navigation and nearby-day comparisons are in the header. Compare opens target expectations and results; the full table stays hidden by default. The completed example retains its teacher guide, fictional/read-only label and blueprint/evidence access.
- The iframe shows the large scene, Sun-angle badge, measured mark legend and camera handles. Routine directions and redundant status headings are hidden; action errors and saved-test receipts remain visible.

## Composition and contracts

`DESIGN_CHROME` is an optional local callback through which an installed renderer contributes toolbar and guide templates. The generic engineering page and final demo place those templates in their own header/panel. The solar plugin continues to own all astronomy, event semantics, marking and graphics; no project-name condition was added to the template or core.

`ProjectLaunchTarget.integratedHeader` is an optional presentation hint. The host suppresses its outer return bar for launchers that provide navigation themselves. Other launchers keep their prior behavior. `CompletedSample.integratedHeader` similarly allows a native sample to supply its header while retaining access to the host's teacher guide through a local callback.

The parent/iframe connection adds `hosted-chrome`, validated `toolbar-state`, and allowlisted `toolbar-action` messages. Exact origin/source/channel checks remain in force. The header forwards to the existing controls and shared calculations; it does not contain a second Sun model. Out-of-range times, edits in read-only mode, and manual time changes during final presentation are rejected. The date picker uses Angular's forms binding so its displayed selection stays correct when dynamic seasonal options appear. Each iframe reconnection resends the header mode, current design, lesson and presentation state, keeping an asset reload from restoring duplicate controls or the wrong scene.

Changed areas: shared simulation composition contract; generic engineering page/guide/final view; launcher and sample presentation hints; the installed solar component and iframe controller/styles; lesson instructions; focused bridge/controller tests. No new package, storage schema, geometry rule, curriculum version or deployment was introduced. No unresolved template capability gap is needed for this layout.

## Verification

Browser checks cover the compact main header, Guide opening, morning event selection, final June/nearby-date replay, access to the teacher guide, returning from final presentation to Play day, and restoring the lesson and compact controls after an actual iframe asset reload. The solar scene/controller check passes and covers hosted commands, playback state, exact solar-noon selection, mark requests, deferred Earth reveal, bounded inputs and read-only/final safeguards. All 31 focused Angular tests pass, including toolbar/guide composition, incoming-state validation, dynamic final-date selection and iframe reconnection. `git diff --check` passes with only Windows line-ending notices.

The final production build passes, with existing stylesheet budget warnings in other project templates. A broad completed-samples run also exposed existing failures outside these changes: the registry test still expects eight projects rather than nine; the voyage fixture lacks a required planning target (two tests); and the robot sample exposes three editable inputs. The monument sample render passed. The architecture check still reports the existing core barrel dependency and mystery-substance render-quality service findings. A concurrent build/test attempt exhausted machine memory; final checks ran sequentially with bounded workers.

Next phase: classroom usability feedback on the reduced controls. The physics and outdoor-calibration limits remain those described in the existing Sun-model documentation.
