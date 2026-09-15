# Shared project navigation

Every current catalog project uses the shared `ProjectLessonNavComponent` supplied by `ProjectHostComponent`. Each Week 1–4 control contains two links: Individual on the left and Group on the right. Each link displays its lesson number, and the configured title is available in its accessible label and tooltip. The active week has a highlighted label and Selected text; its active lesson has a contrasting fill, underline, checkmark, Selected text and `aria-current`.

Each half directly selects its lesson through query parameters on the mounted workspace route, preserving unsaved drafts. Final-example behavior and availability are unchanged. No extra lesson row or dropdown is needed.

The host exposes `--project-navigation-height`: 112px on wide screens, 152px up to 1100px, and 250px up to 600px. On narrow phones the four week controls form a two-by-two grid so labels and touch targets stay readable. Activity controls clear the header.

The standards summary is always visible in normal document flow and follows the selected week. Its optional dialog shows the full evidence breakdown and all configured exact-standard connections to other curriculum lessons. No core schema, runtime or persistence changes are required.

## Change record

- Added: the shared header's HTML and SCSS files and this navigation document.
- Modified: the shared navigation component, project host (TypeScript, template, styles), activity-tools positioning, focused evidence positioning, engineering support/example panel positioning, and the standards-review navigation documentation.
- Tests updated: `project-lessons.spec.ts` and `project-host.component.spec.ts`. The focused run also includes the standards component and registry suites: 14 tests passed across four files.
- Production build passed on 2026-09-14; existing project stylesheet budget warnings remain. The compiled production app was checked in the browser at desktop width and 360px: four visible weeks, both lesson links, unobstructed Final example, activity controls below the header, standards review following the selected week, and navigation from the sample back into Week 2. The final CSS correction was rebuilt and visually verified.
- Architecture: one configuration-driven header in the existing runtime host; no project-name checks or changes to student persistence.
- Specification deviations and `TEMPLATE_CAPABILITY_GAP` items: none. Missing final-example configurations stay explicit through the disabled button.
- Next content work, if requested: supply final-example configurations for projects that currently lack them.

## Split week navigation and inline standards verification (2026-09-14)

- Modified: shared navigation TS/HTML/SCSS; standards review TS/HTML/SCSS and models; project host TS/HTML/SCSS; standards registry; navigation and standards documentation.
- Tests updated: project-lessons.spec.ts, project-host.component.spec.ts and standards-review.component.spec.ts. All 15 tests across these suites and project-standards.registry.spec.ts passed.
- Production build passed. Existing stylesheet size warnings remain in unrelated activity components. The source checker confirms all 42 copied standards match their CSVs, across 120 lesson evidence checks.
- Browser verification: selecting Week 2 Group opens Lesson 4 and shows only Week 2 standards; opening the native dialog focuses Close; Escape closes it and restores focus. Desktop and 360px phone layouts were visually inspected. On phones all four split week controls remain visible in two rows.
- Added production files: none. A local preview helper and build were generated under output/.
- Architecture: shared configuration-driven components and a registry-derived exact-standard connection list. Existing lesson and student runtime contracts remain unchanged.
- Specification deviations and TEMPLATE_CAPABILITY_GAP items: none. Connections are limited to configured curriculum mappings; absent mappings have an explicit empty state.
- Next phase: none required for this request.
