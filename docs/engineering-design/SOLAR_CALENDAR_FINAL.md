# Build a solar calendar

The final project is a solar-calendar monument, following the four practice-sundial lessons. Step 4 is now **Mark the sundial’s year**; step 5 is **Build a solar calendar**. Directions stay in Guide. Students arrange standing stones and lintels, experiment with cylindrical openings and colored glass/jewels, place labeled seasonal targets, choose observation times, and compare both equinoxes and both solstices on the same fixed model. Nearby-date tests and revision remain part of the final demonstration.

New project designs and the first gallery model supply a circle of eight stone gates (24 blocks). Three lintels have vertical bores filled with amber, blue and ruby jewels. This starter has no targets or supplied expectations: students must locate their own marks for their chosen site. Existing tower designs remain intact; a student may preview/adopt Solar calendar circle through the gallery and restore the previous design afterward.

The completed example is **The Jewel Circle Solar Calendar**. At Colorado Springs (38.83° N, 104.82° W), local solar noon in 2026 produces:

The subsequent [graphics and showcase upgrade](JEWEL_CIRCLE_SHOWCASE.md) expands the completed example to 34 blocks and a bronze crystal, with four pierced outer stones. The 24-block learner starter remains the same. Reference records were regenerated for the expanded monument; all four target alignments below still hold.

| Date | Fixed target | Expected and calculated result |
| --- | --- | --- |
| March equinox | Equinoxes | Blue light |
| June solstice | June | Amber light |
| September equinox | Equinoxes | Blue light |
| December solstice | December | Ruby-red light |

Reference records come from the bundled SunCalc, seasonal event table, solar-day resolver and analytic optics evaluator. They include exact UTC instants, local observations and nearby-date results. The live final example recalculates them; no pass result is forced. Each stored record retains the complete matching monument, rather than the previous tower geometry.

The 18 cm blue bore distinguishes the tested week-before/week-after equinox dates while admitting both equinox rays. The 32 cm amber/ruby bores still admit light at the solstice markers a week before and after. The fictional exhibit explains this limitation: a matching target is evidence of a seasonal alignment, not proof of one exact day. March and September share an approximate alignment. The jewels act as colored filters, without refraction or focusing, under the existing model assumptions.

## Historical inspiration

This is an original classroom design, not a reconstruction. Stonehenge’s documented solstice alignments frame summer sunrise and winter sunset; these jeweled roof openings instead use solar noon at Colorado Springs. The historical comparison follows [English Heritage’s Stonehenge solstice guidance](https://www.english-heritage.org.uk/visit/places/stonehenge/things-to-do/solstice) and [the British Museum’s explanation of its solar alignments](https://www.britishmuseum.org/blog/here-comes-sun-stonehenge-and-summer-solstice). No outdoor experiment or historical jeweled installation is claimed.

## Implementation and verification

- Added curriculum-only `calendar-monument.solar-calendar.ts` geometry/checks/site and `calendar-monument.sample-observations.ts` reference observations, plus `scripts/check-solar-calendar.cjs` and this report.
- Updated the project configuration, lesson content, introduction, gallery, sample snapshot, completed-sample metadata and documentation. The engineering test suite now uses an explicit legacy tower fixture for generic stacking/collision tests rather than depending on changing curriculum defaults.
- The new optical check validates legal geometry, all four colored-light matches, exact reference evidence, nearby-date behavior, and failures when holes are sealed, jewels removed, markers moved or location changed. It also verifies targets distinguish other seasonal tests. The existing seasonal-review check passes.
- All 41 focused Angular tests pass across the engineering template, solar component and project-introduction suites. Added a compatibility check proving an existing tower survives entry to step 5, explicit circle adoption, and restoration. Immutable evidence assertions now compare the complete saved monument.
- Browser verification confirms the circle, visible jewel openings and projected colors, the four matching seasonal comparisons, and the changed December Sun angle and shadows on the same geometry.
- The production build passes, with existing stylesheet-budget warnings in other templates. The whitespace check passes with Windows line-ending notices only.
- Architecture checking reports only the previously known core barrel dependency and mystery-substance render-quality service findings. No new capability, core contract, package, physics implementation or persistence mechanism was introduced. No specification deviation or unresolved `TEMPLATE_CAPABILITY_GAP` applies.

Recommended next phase: have students build a scaled physical version and calibrate markers for their actual site, observing a matching available day before claiming physical calendar accuracy.
