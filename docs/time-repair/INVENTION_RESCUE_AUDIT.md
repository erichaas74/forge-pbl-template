# Time Repair — invention-rescue audit

**Current follow-up:** the catalog now uses version 2.3.0. See
[the four-week history restructure](FOUR_WEEK_HISTORY_RESTRUCTURE.md) and
[the Reformation opening and knowledge-experience build](KNOWLEDGE_BUILD.md) for the changed lessons,
visual development, interaction checks, and remaining limits. The audit below
records the earlier 2.0 build.

Date: 2026-09-15. Scope: Time Repair only, all four weeks/eight sessions and its
final example. The earlier package below is historical audit context; the current
package is `exploration-time-repair@2.3.0`, template
`time-repair@1.1`. This includes the authorized rebuild and fixes found while
auditing it against [the standing activity rules](../PROJECT_ACTIVITY_RULES.md).

## Outcome

**Follow-up clarification:** This audit established working controls and layout,
not eight sufficiently developed learning experiences. Sessions 3/4 repeat one
puzzle; several tasks allow shallow trial and error; identical repeat pulls do
not test changed conditions. See [the next activity brainstorm](KNOWLEDGE_EXPERIENCE_IDEAS.md).
The user requires free testing access. Lesson navigation intentionally stays
open, and the final courtyard can now be visited before repair. Repair changes
the available printed supply rather than granting access to the scene.

The rebuilt local experience meets the main-panel and placement rules. It uses
an operable printing workshop and a changing bookseller's courtyard. Historical
explanation, tasks, sources, tutor prompts, and notebook export are in the side
column. The learner diagnoses physical symptoms and changes the machine rather
than filling out a worksheet. Two release gaps remain explicit: verified Grade 7
standards alignment and a connected AI Tutor.

## Rules checked

| Requirement | Finding |
| --- | --- |
| Tiny standards row directly below header/id | Pass for layout: 34px desktop, 36px mobile; accessible modal opens full goals. Formal alignment remains pending. |
| Main view is an activity | Pass: every session renders one operable visual scene. |
| No main-view writing or question answering | Pass: all eight actual launcher pages have zero input, textarea, select, or form elements in the activity. Tutor prompts remain in the side box. |
| No additional header/footer/nav/settings bands | Pass: all eight activity regions have zero header, footer, nav, or heading elements and exactly one scene child. Controls manipulate scene objects. |
| Weekly task directly above AI Tutor | Pass on desktop and stacked mobile layout; both boxes collapse. |
| Meaningful changes between weeks | Pass: production bottleneck and press operation; reusable mirrored type; material/pressure/packing diagnosis; reliable batch and local consequences. |
| Real media and immersion | Native SVG workshop/courtyard, moving press components and production objects, inspectable proof history; no video promises or placeholders. |
| Honest tutor status | Pass: explicitly “Not connected,” with questions and planned evidence checks. No fake assessment or automatic mastery. |

At the tested 1280×720 desktop viewport, each main scene occupied 618px in height
and began immediately below the shared shell. The sidebar scrolls independently
when its content is longer. Mobile uses a 440px scene followed by task then tutor.
Small labels are supplemented by accessible names and the proof magnifier.

## Session-by-session audit

| Week / session | What the learner actually does | Discovery / history goal | Verified behavior |
| --- | --- | --- | --- |
| 1 / 1 — The book that never arrived | Operate scribe, binder, messenger; inspect the waiting reader | A fictional local shortage depends on production and access; manuscripts still exist | Binder cannot invent missing sheets; scribe work supplies a sheet; binding and delivery consume it |
| 1 / 2 — Discover the machine | Ink raised type, place paper, pull three impressions | One reusable forme can make repeated impressions | Missing paper blocks a pull; uninked paper makes a blank; each clean impression needs preparation |
| 2 / 3 — A page written backward | Exchange metal blocks, print, inspect the mirrored result | Composition and reversal turn type into a repeatable page | Keyboard and pointer swaps work; only the correct arrangement prints LIBER |
| 2 / 4 — A second page, the same tools | Recompose a different specimen and print twice | Reusable pieces can be rearranged for another page | LUMEN requires a different arrangement; proof settings remain attached to old sheets |
| 3 / 5 — The ink that would not hold | Test inks on paper and metal; compare impressions and pressure changes | Material compatibility matters; changing pressure cannot cure poor adhesion | Paper/metal responses differ; high pressure fails to rescue manuscript ink; suitable ink works |
| 3 / 6 — A different kind of failure | Compare regional print coverage and change packing beneath the forme | Uneven support can imitate an ink problem; test competing explanations | Left-side underpacking causes a local fault; correcting it yields two clean proofs |
| 4 / 7 — Make it work every time | Resolve combined type, pressure, and packing faults | A dependable system requires interacting parts and repeated evidence | Each repair exposes the remaining fault; three consecutive usable proofs establish a batch |
| 4 / 8 — The messenger returns | Rescue a fresh ink setup, return to the courtyard, finish and deliver printed samples | A repair changes near-term production; expense and literacy still limit access | Testing travel is always available; a clean batch supplies printed pages once; binding/delivery change the scene; patron inspection identifies remaining exclusion |

## Findings fixed during the audit

- The project failed to open because a root-scoped persistence factory could not
  resolve the project injector. Persistence now belongs to the launched workspace
  and receives the correct project/session scope.
- Session 2 initially allowed success through repeated press clicks. It now
  models ink and paper preparation, blank sheets, and a reset after each pull.
- Narrow layouts could separate the task and tutor into adjacent columns. They
  now remain vertically ordered, and the desktop sidebar has its own scrolling.
- Cropped background geometry could misalign object controls. The scene art and
  object positions now scale together; background figures were grounded properly.
- The mobile session menu lacked the final example. It now exposes the same
  destination as desktop.
- Local setting changes now save immediately; unavailable storage keeps session
  visits in memory and reports the condition in the notebook disclosure.
- Press animation returns to rest on each pull. Blank-proof art and its accessible
  name now match the actual result.

## Historical boundaries

The failed ink delivery, time travel, particular waiting customers, and alternate
1460 courtyard are declared fiction. They are a bounded local scenario, not a
prediction that the entire world loses printing. Manuscript work, other printing
traditions, collaboration, finishing, and unequal access remain visible in the
lesson's interpretation.

Technical context is sourced to [the Morgan Library's printing account](https://www.themorgan.org/collections/works/gutenberg/invention-of-printing).
The [Library of Congress Gutenberg guide](https://guides.loc.gov/gutenberg)
supports the mid-fifteenth-century Mainz context. Earlier movable metal type is
acknowledged through [UNESCO's Jikji record](https://www.unesco.org/en/memory-world/baegun-hwasang-chorok-buljo-jikji-simche-yojeol-volii-second-volume-anthology-great-buddhist-priests?hub=915).
The ink coefficients are teaching approximations, not recovered recipes. The
courtyard tokens represent sample pages/commissions, not whole Bibles; its turns
are not a measurement of historical copying speed.

## Verification

- Production Angular build: passed, 2026-09-15. Unrelated components produced
  existing stylesheet-size warnings; no Time Repair budget warning.
- Targeted Angular/Vitest run: **46 tests passed across seven files**, including
  the legacy Time Repair tests, invention engine/persistence/component tests,
  lesson registry, and compact curriculum disclosure.
- All eight activities exercised through their actual UI controls. Tested failure
  paths as well as successful completion: absent paper, blank uninked sheet,
  unsuitable ink, wrong type, regional packing, insufficient material, and batch
  reset behavior.
- Real app launcher: all eight session links load with the intended scene and
  sidebar. Desktop DOM audit confirms no extra main-panel bands/forms.
- Production preview: a saved proof and selected ink survive a browser reload;
  using the prepared final example does not change the learner's session. Its
  binder and messenger operate on the example's independent supply.
- Mobile check at 390×844: combined-fault controls can be operated, ink/paper
  preparation works, session navigation closes after selection, standards modal
  opens and closes with Escape, task precedes tutor.
- Proof lens opens by semantic button and closes with Escape; type swapping works
  by keyboard. Reduced-motion styles disable scene animation.
- Repository-wide architecture check remains non-green for two findings outside
  this change: `core/index.ts` reports a forbidden `./templates` dependency, and
  `projects/mystery-substance/lab-kit/render-quality.service.ts` violates its
  project-service rule. This audit does not claim those checks passed.

## Implementation handoff

- Package/content: `public/projects/exploration-time-repair/versions/2.0.0/`,
  `scripts/configure-invention-rescue.mjs`, matching catalog/lesson-plan entries.
- Reusable mechanism: `src/app/templates/time-repair/invention/` contains the
  models, validator, pure engine, runtime, persistence, workshop, courtyard, proof
  renderer, and tests. No project-ID conditionals in the mechanism.
- Launch boundary: `domain/time-repair.package.ts`, local package adapter, and
  `runtime/project-launch/template-launchers/time-repair.launcher.ts` choose the
  validated package variant; old packages and save namespaces remain separate.
- Shared shell: optional activity-first lesson presentation and compact curriculum
  disclosure. Existing projects retain their current presentation unless opted in.
- Contracts: [template contract](../build/14_TIME_REPAIR_TEMPLATE.md) and the
  standing activity rules document define future authoring requirements.

## Remaining review priorities

1. Obtain and map the actual Grade 7 standards framework. Current learning goals
   are deliberately not presented as verified standards.
2. Connect the AI Tutor and its evidence review in its designated box when that
   feature is authorized. No written response collection or grading is currently
   implemented.
3. The eight sessions have distinct tasks but share one invention and two scene
   settings. A classroom playtest must establish pacing and whether the challenges
   sustain the intended session lengths; a UI audit cannot establish engagement.
4. Storage and collaboration remain local prototype capabilities. Group labels
   describe classroom organization and do not imply networked team synchronization.

Review this project with the user before auditing or rebuilding another project.
