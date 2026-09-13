# Sundial to solar calendar walkthrough

The calendar-monument student experience now uses the existing five learning steps as an 18-task walkthrough. Each task has an instruction, a specific observation to look for, instrument settings, and only the actions needed at that point. The simulation opens at the specified date, clock time or solar-noon rule, and viewpoint. The header contains Project and Notebook; the five-step path and Back/Continue provide navigation. On narrow screens the scene appears between the instructions and the measurement/action panel.

1. Place a 60 cm post; measure and mark 9 a.m., solar noon, and 3 p.m.
2. Measure the same post at June and December solar noon, then compare.
3. Inspect the tilted Earth in June and December beside the corresponding shadow.
4. Place each equinox and solstice shadow-tip mark at solar noon. Placement is required before continuing.
5. Load the three-stone starter, move the summer window in 5 cm north/south increments, inspect the receiving pillar, check winter, and save the four-date comparison and explanation.

## Ownership and persistence

`calendar-monument.walkthrough.ts` owns the curriculum, site, dates, sample ID, target IDs, and permitted actions. The shared optional `DesignWalkthroughTask` contract contains bounded data only. The engineering template renders tasks, validates responses, persists `learningTaskId` and `walkthroughNotes`, and tags captures with their task. Existing snapshots and research answers remain valid. A final task can require real evidence from the current design before finishing; self-reported answers are observations, not automatic grades.

`DesignChrome.walkthrough` is an optional installed-renderer interface for live readings and actions. The solar adapter validates same-origin iframe replies and correlates readings and comparison replies to current requests. `guided-walkthrough.js` validates solar setup requests and calculates readings using the existing solar geometry/optics functions. New instrument tasks do not change the shared editor or embed astronomy in the template. North/south moves use shared edit history and affect only the configured window ID.

New investigations use Colorado Springs in 2026. Existing sundials retain their original marking site and year; their time-marking day is preserved. The project starter is loaded explicitly and preserves the previous monument as a backup. Practice and project designs remain separate. The final example has a compact June/December/inspect/whole-model/compare toolbar, with the 2D solar-day overlay, center sunrise view, ray guide and other dates available in Guide.

## Verification

- Template tests cover task validation, optional legacy snapshots, persisted answers and cursor, required marks, and evidence tagging/completion.
- Adapter tests reject foreign and stale readings and save only the requested validated comparison; existing optical/editor tests remain covered.
- `node scripts/check-solar-scene.cjs` exercises actual scene setup at 9 a.m. and noon, Earth visibility, invalid setup rejection, and the change from shadow to sunlight when the window aligns.
- Browser walkthrough exercised all five steps, three time marks, four date marks, northward adjustment, winter comparison and the saved 4/4 final check.

This remains a simulation of direct rays on level ground. A measured ring-center hit can also occur on nearby dates or with a small placement offset; the activity does not claim a unique-day or physical construction tolerance.
