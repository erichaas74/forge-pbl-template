# Sample monument gallery

Open **••• → Sample models** in the final project workspace. Seven geometric thumbnails identify the models before loading. The solar-calendar circle is the first option, including for students with existing saved drafts:

| Model | Geometry and investigation |
| --- | --- |
| Solar calendar circle | Eight stone gates; three lintels have amber, blue and ruby jeweled roof openings. Students locate and test their own seasonal markers. |
| Sun gate | Two pillars and a lintel; compare the bright gap with the gate-shaped shadow. |
| Round portal | A thin wall with a real 80 cm cylindrical hole; inspect its projected sunlight patch. |
| Three color windows | Supported red, blue and amber windows; a porcelain crystal catches the central beam. |
| Pierced pyramid | Four terraces with an aligned vertical bore; test whether a high Sun reaches the base. |
| Shadow crown | Eight alternating pillars, four bored through, surrounding a round sculpture. |
| Twin tunnels | Equal 32 cm openings through 10 cm and 65 cm walls; investigate angular clearance. |

Click a card to preview its actual geometry in the same simulation. Site and time stay fixed when changing samples, making comparisons useful. The preview permits date, time and camera controls. It does not write to the notebook, replace the learner's saved design, or record trial evidence. **My design** exits the preview. **Use model** adopts the model, opens the builder, clears expectations tied to the old target IDs and saves one previous-design checkpoint. Notes and recorded trials stay intact. **Restore previous design** restores that design and its checks, including after a reload. This is one checkpoint, not unlimited design history.

## Architecture and compatibility

Optional `EngineeringDesignConfig.designSamples` supplies up to 12 uniquely named, validated model definitions (`id`, `title`, `description`, `design`). The calendar-monument file supplies data only; the gallery, thumbnail rendering and preview/adoption behavior are reusable template capabilities. Unknown or malformed samples fail `CONFIG_INVALID` / `STATE_INVALID`.

`EngineeringSnapshot.designBackup` is an optional validated design/checks pair. Old 1.0 configs and snapshots remain readable. Sample adoption and checkpoint restoration use the existing `engineering.designSaved` event, runtime validation, scoped persistence and a single commit. There are no new core contracts, packages, backend services or simulation-specific branches in the template. Gallery thumbnails are illustrative isometric geometry, while physical shadows and colored transmission come from the existing installed simulation.

## Change report and verification

- Added: `calendar-monument.design-samples.ts` in the project content package; reusable `design-sample-gallery.component.ts` and `design-thumbnail.component.ts`; this report.
- Modified: the calendar configuration, engineering config/snapshot validators, engineering runtime, workspace TS/HTML/SCSS and engineering tests.
- Added three tests covering all six model geometries and invalid libraries, nonpersistent preview/return, and atomic adoption with restored checks and preserved research/evidence after reload.
- Production build passed with existing unrelated SCSS budget warnings. Both focused Angular suites passed: **20 tests**.
- Browser checks exercised all six samples in the canvas, verified trial counts remain unchanged during preview, and adopted/restored a sample across reload. The gallery was verified at **localhost:4200**, not only the isolated development port. At March equinox solar noon in Colorado Springs, the three-window sample reports red and amber light at its two ground targets and blue light on the crystal's sampled faces. No browser rendering errors were reported.
- No specification deviations or `TEMPLATE_CAPABILITY_GAP` items for sample monuments. Existing optical limitations remain as documented in [the optics model](OPTICS_AND_SCULPTURE.md).
- Recommended next step: have students choose a sample, predict its seasonal changes, then revise its dimensions or openings and compare with measured physical blocks.
