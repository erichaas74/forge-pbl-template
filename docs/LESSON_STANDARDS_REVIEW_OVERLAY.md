# Lesson standards review panel

The standards review is available in production for testing, per the user's follow-up. It accompanies the existing four-week/eight-lesson plans without changing student activity rules or grading.

## Coverage

All 12 current projects assigned to grades 4–6 have eight annotated lessons (96 lessons total, 120 evidence checks). There are currently no grade 4 projects. Included grade 5 projects: Unlabeled Shelf, Midnight Menagerie, Survival Island, Sun Monument, and Expedition News Network. Included grade 6 projects: Frontier Trading, Ancient Egypt Museum, Fate of the Republic, Championship Show, Cascade Bay, Community Story Network, and Hammurabi on Trial. Grade 7–8 projects do not show the review.

`src/app/projects/project-lesson-standards.ts` contains versioned companion annotations for every lesson: exact Forge ID, how the project work addresses the target, the individual evidence to check, and any required additional instruction. `forge-review-standards.json` preserves the exact title, full description, grade and source CSV filename for the 42 referenced standards. The source is the supplied `docs/Forge_School_Master_Standards_Frameworks/` folder; no source CSV was edited. Run `node scripts/check-lesson-standards.mjs` to compare every ID, grade, title and description to its source. The optional `--refresh` flag regenerates only the copied JSON for the IDs referenced by the annotations.

## Use

The standards summary is always visible above the project workspace. It shows only the two lessons in the selected navigation week, with standard IDs and titles and a clear selected-lesson marker. Its evidence-review counter is scoped to that week. There is no independent standards week picker.

Select **Full breakdown & curriculum connections** to open a native modal dialog. It shows the selected week's full standard wording, evidence, missing instruction and lesson checkpoints. Connections list every other configured curriculum lesson sharing an exact standard ID with the selected week, including project and lesson titles and the existing explanation of how it addresses that standard. Unmapped connections are not inferred; an empty state explains when none are configured.

A checkbox means the tester reviewed one standard's evidence in one lesson. The counter counts these lesson checks, including repeat opportunities for a standard across lessons. Checkboxes start unchecked, can be reversed, and are only in memory. Reset project checks clears this project's review. Reloading or leaving the host can reset them. These checks do not write student data, issue grades, unlock activities, or confirm mastery. An amber **Added check needed** note remains visible even if the tester checks its box.

## Navigation and architecture

The main summary occupies normal document flow beneath the shared header and evidence/activity controls. Only the optional breakdown uses an overlay. The native dialog places focus on Close, traps focus, supports Escape, and returns focus to the opening button. Both the summary and dialog follow navigation selection. On phones the lesson columns stack.

The existing project host mounts one shared review component. A small registry matches the project ID, project version, plan version and assigned grade. Curriculum annotations live in project configuration; student state and the existing lesson-plan contract are unchanged. No new template capability or schema migration is required. To remove the testing panel later, remove the host import, computed lookup and component element; the companion review files can remain as curriculum documentation.

## Interpretation

These are planned lesson-level evidence checks, not claims that every bundled standard is fully taught. Added checks explicitly identify gaps such as Cascade Bay's water-cycle/air-mass models, Egypt–Nubia comparison, and the grade 5 rescue optics coordinate sketch. The grade 5 rescue annotations apply to its grade 5 pathway only. State/source wording remains distinguishable from instructional guidance, including the scientifically correct daily rotation explanation for sundials.

Tests cover grade and version selection, complete eight-lesson mappings, same-grade source IDs, independent week browsing, checkbox/reset behavior, Escape focus, and absence of storage mutations. Production and browser verification are recorded in the task result. No architecture deviations or TEMPLATE_CAPABILITY_GAP items. The next curriculum phase is implementing the clearly marked added instruction, then checking each student's actual evidence with the teacher.

Verified 2026-09-14: all 9 focused tests passed across 3 files, including every current catalog lesson route. All 42 copied source records matched their original CSVs exactly, and all 120 lesson evidence checks reference that set. The production build passed and its emitted JavaScript includes the Standards checked panel. Stylesheet budget warnings remain in other project views. A narrow browser preview confirmed the reserved strip clears the lesson, evidence and tools controls; checkbox toggling, independent week review, Escape closing and lesson navigation worked. Initial concurrent verification exhausted workstation memory; final verification passed with `NG_BUILD_MAX_WORKERS=1`, `NG_BUILD_PARALLEL_TS=0`, and the local single-worker Vitest configuration in `output/lesson-standards-review-vitest.config.mts`.
