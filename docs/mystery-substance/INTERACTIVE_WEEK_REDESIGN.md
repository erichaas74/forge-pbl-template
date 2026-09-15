# Mystery Substance — interactive weeks

2026-09-14. This task owns only Mystery Substance and its existing science lab plugin. Read the master handoff, agreed direction, AGENTS.md, and investigation component/testing contracts before implementation.

## Session map (written before implementation)

| Week | Session 1 interactive experience | Session 2 interactive experience | Proposed products | Tutor questions/concepts | Evidence | Future model controls | Direct-entry sample |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Look, then dissolve | Optical magnifier: vary light and zoom; compare four vials | Water trials: compare dissolving and suspension under equal conditions | Optical scan set; water comparison log | Observation versus inference; what dissolving can rule out | Instrument readings, selected specimens, trial history | Specimen, light angle, zoom, instrument, rerun | Four existing vials and calibrated instruments, no completed trials |
| 2 — Build a substance profile | Conductivity probe: compare solutions and meter readings | Reaction bench: measure solution, weigh specimen, transfer, add indicator | Conductivity comparison; two-stage reaction profile | Why equal quantities matter; physical property versus evidence of reaction | Conductivity readings; measured mass/volume, retries, gas, temperature and color | Specimen, test, solution volume, specimen mass, indicator drops, reset | Fresh instruments and full specimen rack; manual measurements remain real |
| 3 — Track matter across a boundary | Sealed chamber: run particle and mass model | Open chamber: compare escaped particles with falling measured mass | Sealed-system trial; open/closed comparison | What the balance measures; where unmeasured matter went | Before/after particles and mass; retained trial log | Chamber boundary, boundary overlay, rerun/reset | Existing deterministic closed/open scenarios |
| 4 — Apply and assemble | Bay 3: buy diagnostic tests with 25 simulated minutes, try a response | Final shelf: edit labels, shelf positions and handling plans | Incident test/response record; editable shelf plan | Discriminating evidence; uncertainty; which result could change a label | Costs, test outcomes and decisions; shelf assignments | Test sequence, restart budget, response choice, shelf labels/zones/handling | Clearly labeled supplied comparison records; editable sample shelf placement, never a completed case |

Every session and all extra tools are available in the local authoring preview. Session selection sets the actual instrument/chamber. Both planning panels follow the selected week and identify an extra tool when opened. Group sessions are planning labels; shared state is deferred.

## Architecture and overlap

The catalog selects template `investigation`, but Mystery Substance already uses a dedicated science plugin/legacy feature path. Other investigation projects use the generic investigation shell. Reuse the existing properties, reaction, conservation, emergency and restoration controls; no new simulation engine or LMS core contract is required. Add a typed, validated lab-week configuration and local preview presentation boundary. Restrict the launcher edit to its existing Mystery Substance branch. Preserve the generic branch and final-example route.

The preview uses the existing workspace draft adapter with a separate key namespace, retains bounded trial histories and intentionally empty edits, and never calls assessed completion or submission methods. Existing gates and assessed components remain available outside local preview. Explanation and confidence forms become tutor planning content; shelf composition remains an actual creation tool.

Pre-existing modifications were recorded in `output/mystery-week/baseline-status.txt`; project files and the launcher were copied to `output/mystery-week/baseline` for comparison. Shared catalog, styles, host, dependencies and other project files are outside this task. The lesson entry will be edited narrowly after re-reading it.

No required simulation capability gap identified. Connected tutoring, automatic model control, assessment and collaboration remain future work.

## Verification and delivery

Implemented. See [the delivery record](IMPLEMENTATION.md) for files, validation, browser results and limitations. Artifacts use `output/mystery-week`. The stable production preview uses the automatically assigned free port 58875; the original development watcher on 4326 was stopped to avoid repeated rebuilds while other tasks edited their projects.
