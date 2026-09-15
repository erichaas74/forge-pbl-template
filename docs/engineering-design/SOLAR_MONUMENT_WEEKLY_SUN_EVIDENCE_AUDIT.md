# Solar Monument: weekly Sun-positioning evidence audit

Date: 14 September 2026. Scope: `calendar-monument` four-week preview (`calendar-monument.weeks.ts`), its starters, the learning walkthroughs, the week workspace and the solar capture record. Documentation only; no application code was changed.

Question audited: **in each week's build, how does a student show they know where the Sun is and how that position controls the build?**

## Main finding

Today, no week requires a student to show Sun-positioning knowledge. Each week records the *simulator's* knowledge instead.

- The week workspace (`engineering-week-workspace.component.html`) shows the week's questions under "AI Tutor · Disconnected" as planning text. There is no prediction, response, check or explanation field.
- A saved test stores the model's Sun altitude, Sun direction, shadow bearing and shadow reference (`public/simulations/solar-monument/game.js:1957-1965`). These values are computed, not student-produced.
- The walkthroughs that *do* collect responses (`calendar-monument.walkthrough.ts`) are not passed to the week workspace. Its `simulationInputs` has no `walkthrough` input.
- Builds can succeed by trial and error against a live light reading. Week 2 even tells students which direction to move the window.

A student can therefore finish all four builds with perfect-looking evidence and no demonstrated understanding of Sun altitude, azimuth or seasonal change.

## Week-by-week audit

| Week | What the build currently proves | Sun knowledge left unshown | Gap severity |
|---|---|---|---|
| 1 · Daily sundial | Student marked shadow tips at three times; model saved altitude and shadow length. | Why the shadow points opposite the Sun; that noon is the shortest, north-pointing shadow; how season changes noon altitude. | Medium. The learning walkthrough has good measurement tasks, but the week version has none. |
| 2 · Solstice windows | Light reaches the summer carving after the window moves. | That sunrise azimuth swings north in June and south in December; that low altitude sets carving height. The instruction says "move north", giving the answer away. | High. The key idea of the build is supplied, not demonstrated. |
| 3 · Colored-light sculpture | Colored patches land somewhere and faces light up. | Where a patch will land given the Sun's direction and height; which sculpture face faces the Sun at a given time. Questions are almost all about color. | High. Sun position is nearly absent from the week's goals. |
| 4 · Stone-circle calendar | Students place markers where light lands, then play four dates. | Placing markers *before* testing, from a known Sun altitude. Markers placed after seeing the light only record an observation. | High. The most powerful demonstration is available but unused. |

Additional issues that weaken evidence:

1. **Week 2's equinox check is trivial.** `solsticeGatesChecks` expects sunlight at the open center observer in March and September. Any unobstructed design passes, so it shows nothing about equinox Sun position.
2. **Week 4 starts with no checks or targets.** `solarCalendarStarter` has empty targets. `solarCalendarChecks` exists but is unused in the week, so there is no expected outcome to compare against.
3. **The sunrise horizon mismatch** noted in `LEARNING_AND_SUN_DEMONSTRATION_AUDIT.md` still matters for Week 2. The "morning light" rule is sunrise + 30 minutes, which avoids it, but any student prediction must use that rule, not "sunrise".
4. **Standards boundary.** NGSS 5-ESS1-2 assesses shadow and daylight patterns, not causes of seasons or trigonometry. The tasks below assess patterns and proportional reasoning; tilt stays as explanation.

## Design principle: predict, commit, build, test, explain

Each week should add one short **Sun check** with four parts:

1. **Predict** before playing time or opening the light reading. The prediction is locked once saved.
2. **Build or place** from the prediction, with the live light reading hidden.
3. **Test** in the model. The saved test stores the prediction next to the model's result.
4. **Explain** the gap in one or two sentences using a named Sun quantity: altitude, direction or time of day.

This separates "the model found the light" from "the student knew where the light would be".

## Checkable numbers from the bundled model

Colorado Springs (38.83° N, 104.82° W), 2026. Values come from the installed SunCalc model and the starter geometry, not outdoor measurement.

**Solar noon, shadow per unit height**

| Date | Sun altitude | Shadow ÷ height | 60 cm post shadow |
|---|---:|---:|---:|
| March 20 | 51.07° | 0.81 | 48.5 cm |
| June 21 | 74.61° | 0.28 | 16.5 cm |
| September 22 | 51.44° | 0.80 | 47.8 cm |
| December 21 | 27.73° | 1.90 | 114 cm |

**Sunrise + 30 minutes** (`solsticeGateSun`)

| Date | Sun direction | Sun altitude |
|---|---:|---:|
| June 21 | 63.3° (east-northeast) | 4.45° |
| December 21 | 124.9° (east-southeast) | 4.28° |

**Week 4 starter geometry already matches noon altitude.** Each jeweled lintel bore sits about 1.04 m high. The finished design's markers sit north of their gates by 1.04 × (shadow ÷ height): 0.29 m for June, 0.84 m for the equinoxes and 1.97 m for December. This matches `solarCalendarDesign` within 1 cm. Students can therefore place markers correctly from Week 1's measured ratios without trigonometry.

## Recommended Sun check for each week

### Week 1 · Daily sundial

- **Session 1 predict:** before playing the day, choose the direction the 9 AM, noon and 3 PM shadows will point, and which is shortest. Options: northwest / north / northeast; morning / noon / afternoon.
- **Session 1 evidence:** three marks with the student's entered lengths. Pass if the noon mark is shortest and marks go west to east of north.
- **Session 2 predict:** before switching to December, drag a "predicted noon tip" marker. Then switch the date and save.
- **Session 2 evidence:** predicted versus actual December tip. Pass if the prediction is farther north than the June mark. Accuracy is recorded, not graded.
- **Product the student keeps:** a four-row *shadow ratio table* (shadow ÷ post height) for March, June, September and December. Week 4 reuses it.
- **Explain prompt:** "The post stayed the same. What about the Sun changed between June and December noon?"

### Week 2 · Solstice windows

- **Remove the answer from the instruction.** Replace "Move the summer window north" with "Move the summer window until light reaches the summer carving."
- **Session 1 predict:** on a top-down compass, draw or choose the June morning Sun direction before building. Options: east-northeast / due east / east-southeast. Hide the live carving reading until the student has placed the window once.
- **Session 1 evidence:** predicted direction, first placement and final placement. Record how many nudges were needed. Fewer nudges from a correct prediction shows positioning knowledge.
- **Session 2 predict:** before testing December, say whether the winter beam comes from farther north or south than the summer beam, and roughly how far apart the two directions are. Correct: south, about 60°.
- **Session 2 evidence:** a nearby-date test at ±7 days, with the student's statement of how many days still align.
- **Fix the equinox check.** Either drop it from this week or replace it with a prediction: "At equinox, will morning light come through either window?" Correct: neither, because the Sun rises near due east, between the two windows.

### Week 3 · Colored-light sculpture

- **Add a Sun-position goal** to the week's questions: "Where will a colored patch land, and how does it move during the day?"
- **Session 1 predict:** at March noon, place a marker where the ruby patch will land before revealing the light. The expected patch lies north of the window by window height × 0.81.
- **Session 1 evidence:** predicted marker versus actual patch center, saved with the prediction.
- **Session 2 predict:** for December, choose which sculpture face lights first in the morning and which at noon. Also say whether the patch falls farther from or nearer to the window than in March. Correct: farther, because the Sun is lower.
- **Keep the controlled-variable question** but pair it with Sun position: "Change only the date. What moved, the color or the patch?"

### Week 4 · Stone-circle calendar

- **Session 1 place before testing.** With the light reading hidden, students place June, equinox and December markers using their Week 1 shadow ratio table and the lintel height. Then they play the four dates.
- **Session 1 evidence:** each marker's placed distance versus the actual light patch. Suggested tolerance: within the bore's patch radius, 9 to 16 cm. Save a revision when a marker misses.
- **Session 2 expected outcomes.** Load or author checks like `solarCalendarChecks` from the student's own markers. Run the four-date test, then a ±7 day nearby-date test.
- **Session 2 explain:** "Which marker can tell March from September? Which dates can your calendar *not* tell apart?" Correct: no marker separates the equinoxes.
- **Final artefact:** a one-page claim that states site, time rule, marker distances and the Sun altitude that each distance depends on.

## Implementation outline

All of this reuses existing contracts. No new simulation physics is required.

1. **Config.** Add an optional `sunCheck` to `EngineeringPreviewSession`. Reuse `DesignWalkthroughTask['response']` for choice and numeric answers, and `DesignCheck` for expected light outcomes. Extend `isEngineeringPreviewWeeks` validation with bounded limits.
2. **Workspace.** Render the prediction above the stage. Lock it on save, and store it in the capture's `settings` as `prediction` and `predictionAt`. Show the prediction beside the model's measurements in Saved tests.
3. **Hide-until-predicted.** Pass a `walkthrough` setup flag to the simulation that suppresses the live target reading and light patch until a prediction exists. The component already accepts `walkthrough`.
4. **Placement predictions.** Reuse learner-placed targets (`DesignTarget.settings`, `solarMarkerRecord`) with a new marker kind such as `prediction`. Compare it to the capture's shadow reference or patch center.
5. **Scoring stays descriptive.** Record "prediction matched", "direction correct, distance off" or "revised". Do not mark pass or fail until the tutor or teacher review is connected, as the workspace already states.
6. **Tests.** Add spec cases for locked predictions, hidden readings, capture settings round-trip and replay. Extend `check-solar-monument.cjs` to assert the Week 4 marker distances above.

## Priority

1. Week 2 instruction fix and equinox check fix. Small config edits with a large honesty gain.
2. Prediction field and locked capture in the week workspace. This unlocks every week.
3. Week 4 place-before-test using the Week 1 ratio table. This is the strongest single demonstration of Sun-positioning knowledge.
4. Week 3 Sun-position goal and face predictions.
5. Hide-until-predicted flag in the simulation.

## Implementation record · 14 September 2026

Every weekly session now has a **Sun check**: 26 checks across 8 sessions, 18 of them placement predictions on a compass dial.

| Week | Session 1 | Session 2 |
|---|---|---|
| 1 · Sundial | Sun at 9 AM; shadow tip at 9 AM, solar noon, 3 PM | December noon Sun; December noon and 9 AM shadow tips |
| 2 · Solstice windows | June morning Sun direction; pillar shadow direction; which way to move the window | December morning Sun direction; pillar shadow direction; equinox morning light |
| 3 · Colored light | March noon Sun; ruby patch at noon and 3 PM | Ruby patch at December noon and 10 AM; why the patch moved farther |
| 4 · Stone calendar | Blue, amber and ruby patch placement from jewel height; June 9 AM pillar shadow | September blue patch; 1 m pillar December shadow; which dates the marker cannot separate |

How it works:

- **Configuration.** `calendar-monument.sun-checks.ts` holds the checks; `calendar-monument.weeks.ts` attaches them to sessions. Week 2's instruction no longer says which way to move the window.
- **Domain.** `engineering-preview.models.ts` adds the optional `sunChecks` session field and draft record, validation, `isSunPrediction` and `gradeSunCheck`. Direction matches within 22.5°; distance within 20% or 10 cm. Outcomes are descriptive: match, right direction, right distance, or revise.
- **Runtime.** `lockSunCheck` stores a prediction once and ignores later changes. `explainSunCheck` saves the student's explanation after the model answer is revealed. Both use the existing preview event, never `activity.completed`.
- **Workspace.** `engineering-sun-checks.component.ts` renders the dial, direction and distance fields, and multiple-choice checks. The model is covered and made inert until every prediction for the session is locked. After locking, the dial shows the student's mark and the model's mark together.
- **Correction found during implementation.** On an equinox morning, direct sunlight passes between the two windows and reaches both carvings. The check teaches that this monument cannot mark an equinox; it does not claim "neither carving is lit". The June 9 AM amber patch falls inside the gate pillar's own shadow, so it became a Sun-position question instead of a placement.

Not changed: the assessed legacy `solsticeGatesChecks` equinox baseline, the simulation iframe, and tutor or teacher review. Predictions are hidden by covering the model, not by suppressing readings inside the simulation.

Verification:

- `node scripts/check-sun-checks.cjs`: every placement direction within 0.5° and distance within 1 cm of the solar model; every light-patch point traces to its stated colored light; every multiple-choice answer has a model proof.
- Existing `check-solar-monument`, `check-solar-calendar`, `check-season-review` and `check-sundial-lab` scripts pass.
- Isolated Angular suite (engineering-design and solar-monument specs): 4 files, 50 tests passed, including new tests for the covered model, immutable locks, grading, explanations, persistence reload and configuration rejection. Log: `output/solar-week-sun-checks-tests.log`.
- Architecture check reports only the two pre-existing violations in `core/index.ts` and `mystery-substance`.
- Not verified in a browser. The isolated production preview was not rebuilt.

## Update · 15 September 2026

At the project owner's request, questions, answers, hints and explanations are left to the separate AI tutor, and nothing may cover the 3D view.

- Removed the Sun check prediction panel, its 26 questions and explanations, the "Predict first" model cover, the related runtime methods, validation, tests and `check-sun-checks.cjs`.
- Weekly sessions now carry only level challenges: carved gems and grooves in the 3D scene, a measured win check, a reveal animation, and a short goal. Level data contains no stories, hints or explanatory reveal text.
- The level card is a small collapsible strip in the corner of the 3D view, and a win shows a small corner message with Replay, instead of a centered banner.
- Level progress is still reported to the host, so the tutor can ask questions and explain the Sun and Earth motion.
