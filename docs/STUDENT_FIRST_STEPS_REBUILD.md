# Student first steps: rebuild and review

September 6, 2026. This implements the opening and early-workspace pass following the [simplicity audit](STUDENT_SIMPLICITY_AND_TWO_HEADER_PLAN.md) and [learning-skills audit](LEARNING_SKILLS_AND_SHOWCASE_AUDIT.md). Those documents describe the earlier state and the larger corrective plan.

The central screen now asks for the student's thinking. Project navigation belongs in the project header below the LMS header. Explanations, equipment, records, and reference material are available on demand. The finished product and later stages remain available without presenting the whole process at the start.

## What changed in each project

| Project | First student thinking | What the rebuilt interface makes visible |
|---|---|---|
| The Unlabeled Shelf | Predict → observe a test → compare the result | A prediction before the opening experiment, followed by the student's comparison. The workbench centers the specimen and observation response; evidence and comparison open from the header. |
| Frontier Trading Company | Choose cargo → calculate its cost → calculate money remaining | Visual cargo cards and blank answers, followed by separate sales and profit calculations. Wrong answers stay on the task with a hint. The main market centers the shops and opens the shopping panel when there is an actual trade to plan. |
| Objects That Changed Us | Examine an object → make an observation → find a connection | The opening requires the student's observation. The curator workspace puts a rotatable object beside the first idea, then exposes Labels and Sources before the rest of the studio. The composer uses the page instead of covering the LMS header with a full-screen dialog. |
| History Live | Choose a lead → ask a question → identify needed evidence | The opening requires a verification question. New pitches no longer supply the student's question, audience rationale, or evidence plan. The pitch separates question, evidence, perspective, prediction, audience, and review. Beats, pitch navigation, and work records are in the header. |
| The Fate of the Republic | Form an initial opinion → hear a claim → mark and answer it | The initial opinion occupies the center alone. Once it is recorded, the current listening or response action occupies that position. Docket, evidence, and the argument record open from the header. The opening itself asks for a question about the selected argument. |
| Race Around the World | Choose a goal → read evidence → predict | Sponsor choices are central visual cards. The atlas opens for route decisions or on request. Prediction has its own step before explanation; a new chapter cannot be recorded without it. Map, Guide, records, and chapter tasks are in the header. |
| Survival Island Story Lab | Choose a historical setting → imagine a fictional character → develop one idea | The opening requires an original scene idea. The studio starts with three setting choices, then presents one planning question at a time. Earlier ideas and coaching are optional. Later creation stages appear progressively. |

The project library now uses project artwork and short creative invitations, with one clickable card per project. Repeated titles, explanatory banners, navigation rails, and several footer exits were removed from the rebuilt surfaces.

## Learning evidence and continuity

- Trading's opening checks purchase cost, remaining money, actual sales, and profit. It does not disclose each target answer before the student attempts it. This is an integer warm-up; the main simulation retains its decimal transaction calculations and route forecasts.
- Opening records retain student answers and incorrect arithmetic/observation attempts. Choice alone does not create fabricated reasoning. Skipping an opening is recorded without invented work.
- Replaying practice preserves the original opening record and appends a bounded practice history. Failed saves retain the pending response for retry.
- Open responses are recorded, not automatically judged for reasoning quality. Existing teacher/producer review remains relevant.
- Older saved drafts remain readable. New Journey predictions are required for new chapter records; revising an older chapter does not manufacture a prediction made before its outcome.
- Museum models load in the opening and object-study views, retain attribution, and support keyboard rotation. The coffin's configured initial view exposes more of the object. Other viewer uses retain optional loading.
- These changes provide Guide access. They do not introduce a new AI tutor integration.

## Verification

- Production build: passed. Stylesheet warning thresholds are still exceeded in several existing large components; no build error threshold was raised.
- Angular/Vitest: 350 tests passed across 78 files. Coverage includes all configured openings, trading arithmetic and errors, prediction/observation gates, student evidence and responses, replay persistence, save failures, new reporting drafts, and Journey record/revision requirements.
- Browser: inspected the library and the early workspaces of all seven projects. Manually checked wrong and correct trading answers, Guide dismissal and focus return, object rotation and the inline curator workspace, story setting selection, and a newly claimed reporting story with a blank student question.
- Responsive checks included a 1366 × 768 viewport for Voyage and Debate, and a 390 × 844 viewport for Trading and History. The checked narrow layouts had no horizontal page overflow. This was not an exhaustive test of every later state on every device.
- Architecture check: still fails on two boundaries outside this rebuild: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` defining a service in a project package.

## Next review priorities

This is a substantial first-steps rebuild, not a claim that every later project screen is finished. The next pass should follow a student's actual work through each final showcase:

1. Put original work, evidence, feedback, and revision directly into the normal showcase sequence. In particular, Trading's generated final equations must not be mistaken for proof of a student's calculation process.
2. Check later source, route, experiment, label, publishing, and peer-review screens for competing tasks and remaining body navigation. Consolidate the remaining header implementations into one reusable frame without adding another header.
3. Replace any remaining generic artwork with visuals that distinguish the actual choice or evidence. Keep source identity, historical boundaries, uncertainty, and accessible alternatives available.
4. Test the first three thinking steps with young students before adding more stages. The criterion is whether they can find the work and explain the decision from the screen—not whether they can follow a longer paragraph.

For review, start at `/projects`, try Trading's opening with one wrong answer, then inspect the early workspace in each project. A fresh reporting story will now ask for the learner's own question and evidence plan; older saved pitches retain their existing text.
