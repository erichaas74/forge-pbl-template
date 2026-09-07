# Story investigation preview

The existing Assignment Desk now opens a claimed or custom story with **Enter the Moment**, the
first local pitch task. Its sequence is Explore Sources → Witness the Event → Interview Historical
Characters → Gather Evidence → Build Your Story. The preview uses the current project's event and
selected headline, with the existing navy, gold, serif headings, and newsroom card styling.

Primary-source examples cover photographs, posters, letters, diaries, newspaper articles, maps,
government documents, speeches, and eyewitness accounts. They are explicitly examples that vary
by time period. The event panel describes historical video, archival footage, eyewitness recordings,
and reconstructed scenes. The AI interview panel explains the future conversation and includes all
five example questions from the request. The evidence panel connects observations and perspectives
to the story students will construct.

All four exploration buttons are native disabled controls labeled Coming soon. The preview does
not collect evidence, generate answers, play video, unlock workflow stages, or change runtime state.
Build My Story opens the existing headline/question task and focuses its headline field after render.
The original evidence, perspective, prediction, audience, and review tasks follow it, with their
existing draft and submission behavior. The header navigation also allows returning to the preview.

## Files

Added:

- `src/app/templates/history-live/ui/story-investigation-preview.component.ts`
- `src/app/templates/history-live/ui/story-investigation-preview.component.html`
- `src/app/templates/history-live/ui/story-investigation-preview.component.scss`
- `docs/history-live/STORY_INVESTIGATION_PREVIEW.md`

Modified:

- `src/app/templates/history-live/ui/assignment-desk.component.ts`
- `src/app/templates/history-live/ui/assignment-desk.component.html`
- `src/app/templates/history-live/runtime/history-live-runtime.service.spec.ts`

The existing component integration test was extended for the disabled previews, the transition and
focus into the existing form, retained student answers, returning to the preview, and the shifted
review step. No test files were added.

## Verification — September 6, 2026

- Focused History Live suite: **25 tests passed across 2 files**, using the existing feature tsconfig.
- Production Angular build: **passed**, with style-budget warnings in existing, unmodified stylesheets.
- Browser: verified network/story selection, preview rendering, mobile card reflow, the Build My
  Story transition, headline focus, and returning to Enter the Moment. At a 390px phone viewport,
  page and preview width both matched the 375px content viewport without horizontal overflow.
  No browser console errors were reported during these checks.
- The repository architecture check reports existing violations in `src/app/core/index.ts`
  (dependency on `./templates`) and
  `src/app/projects/mystery-substance/lab-kit/render-quality.service.ts`
  (service inside a project package). Neither file was changed for this work.

## Architecture and scope

The new component is presentation only, with typed inputs and a local navigation output. It is
embedded in the existing pitch experience; no separate route, runtime stage, backend, provider SDK,
schema, or persistence contract was introduced. Existing workflow gates still apply.

Specification deviations: none. New `TEMPLATE_CAPABILITY_GAP` items: none for this showcase scope.
Functional source exploration, video, AI interviews, and story generation remain intentionally
unimplemented in these previews, as requested.

Recommended next phase: review the showcase with students before separately scoping functional
investigation tools through the existing runtime and adapter boundaries.
