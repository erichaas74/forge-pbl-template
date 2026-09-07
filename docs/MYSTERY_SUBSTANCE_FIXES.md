# Mystery Substance — Audit Findings and Fix Plan

## Catalog launch repair — 2026-09-05

The `/projects/mystery-substance/experience` launch requested `mystery-substance`
but received a manifest declaring `mystery-substance-outbreak`, so package
validation stopped the investigation before initialization.

- Modified `mystery-substance.package.ts` to export a catalog package with the
  `mystery-substance` manifest ID, sharing the existing content without changing
  the original package export or its legacy identity.
- Modified `local-project-definition.source.ts` to select that catalog export.
  Package validation, session scopes, persistence keys, and runtime contracts
  remain unchanged. No saved records are deleted or migrated.
- Expanded `mystery-investigation.service.spec.ts` with the actual catalog-source
  and injected-session launch path, event dispatch and save/reopen checks, legacy
  save preservation, and rejection of an unrelated manifest ID. Tests use an
  isolated in-memory browser storage stub.
- No files added. Ten tests pass across the service, runtime, and project-reuse
  suites. Production Angular build passes with existing stylesheet budget warnings.
  Browser verification on localhost:4200 shows the experience lab bench and its
  station controls instead of the unavailable message.
- No core schema change, specification deviation, new template capability gap,
  or deployment. Next user check: refresh the existing investigation preview.

**Project:** `projects/mystery-substance-outbreak` — "The Unlabeled Shelf"
**Audited:** 2026-09-03
**Goal being measured against:** an escape-room style investigation game, not a
course website.

---

## 0. Summary

The **puzzle content is excellent and should not be rebuilt.** The deduction
chain in `mystery-science.config.ts` is airtight, and every vial has a unique
fingerprint. Everything wrong with this project is in the shell around the
puzzle: the app tracks activity completion like an LMS rather than gating
progress like a game.

The fixes below are ordered by how much they change the _feel_ per line of code
changed. Sections 1 and 5 are done. Sections 2, 3, 4 and 6 are not.

### The puzzle logic (verified sound — leave it alone)

| Test              | A           | B           | C                            | D                    |
| ----------------- | ----------- | ----------- | ---------------------------- | -------------------- |
| Conductivity (mS) | **8.7**     | 0.1         | **6.4**                      | 0.1                  |
| Solution A (acid) | —           | —           | **bubbles 18 s, 22 → 19 °C** | —                    |
| Indicator B       | amber       | golden tan  | light tan                    | **blue-black**       |
| Water             | clears 14 s | clears 19 s | cloudy → clear               | **suspension holds** |
| **Identity**      | Table Salt  | Sugar       | Baking Soda                  | Cornstarch           |

Conductivity splits `{A,C}` from `{B,D}`. Acid separates A from C. Iodine
separates D from B. Four tests, four unique identities, no ambiguity. The
endothermic 22 → 19 °C on the bicarbonate is a genuinely nice authenticity
touch.

---

## 1. DONE — Labs and evidence are now the main page

**Problem.** The student landed on a panel pair of _Evidence + Analysis_. The
labs — the only place anything actually happens — were three clicks deep, buried
behind an abstract "Workspace pair 3 · Investigate → Theory" selector. Above the
content sat five stacked chrome layers (mission strip, 7-step phase track,
workspace selector, context alert, utility strip) consuming roughly 14.5 rem of
vertical space before a student saw a single vial.

**Changed:**

- **`mystery-investigation.component.html`**
  - Replaced `mission-strip` + `phase-track` + `workspace-selector` (three
    layers, ~11 rem) with `case-bar` + `bench-rail` (two layers, ~7.4 rem).
  - **`bench-rail`** is the new primary navigation: one click to any of the five
    lab stations, the Evidence Locker, Case Notes, or the Final Case, from
    anywhere in the app. Each station shows `done/total` and a live trial count.
    The Evidence Locker carries an unopened-record badge.
  - Added the **`bench`** landing view — a full-bleed lab scene with five large
    station cards (art, instrument, purpose, progress meter, "Enter station →" /
    "Run another trial →") above an **evidence shelf**: a horizontal filmstrip of
    every record collected, with `New` markers, clicking straight through to the
    detail view.
  - The 7-step phase list moved into the mission drawer, where a syllabus
    belongs. It is still fully navigable and still shows lock state.
  - The footer lost its duplicate save indicator (now a dot in the case bar).

- **`mystery-investigation.component.ts`**
  - Added `LabStation` + `stationCatalogue`, and the `labStations` computed that
    merges the four vial scans into one "Specimen Scanner" station and reports
    real trial counts from `resultHistory`.
  - Added `benchEvidence`, `newEvidenceCount`, `phasesComplete` computeds and
    `openBench()` / `launchStation()`.
  - Default workspace changed from `'evidence-analysis'` to `'bench'`.
  - **Students are no longer ejected from a lab after every trial.**
    `returnWithEvidence()` (which reset `activeActivityId`, jumped to the
    evidence panel and reset the mobile panel) is replaced by `noteEvidence()`,
    which fires the context alert and _leaves the student at the bench_. This was
    the single worst game-feel bug: filling the 4 × 4 property grid previously
    required re-entering the station and being thrown out sixteen times.
  - `returnFromActivity()` now returns to the bench rather than to the abstract
    `theory-investigate` pair.
  - Removed the now-unused `phaseDefinitions` member.

- **`mystery-investigation.component.scss`** — new `case-bar`, `bench-rail`,
  `bench`, `station-cards`, `evidence-shelf`, `evidence-strip`, and `phase-list`
  sections; stale `mission-strip` / `phase-track` / `workspace-selector` /
  `save-indicator` rules and their responsive overrides removed; station art is
  driven by `[data-station]` background rules rather than style bindings (avoids
  the Angular style sanitizer). Workspace min-heights reclaim the 3 rem freed by
  the removed chrome.

- **`templates/investigation/ui/investigation-ui.models.ts`** — added `'bench'`
  to `InvestigationWorkspacePair`.

**Verified:** `ng build` clean, `ng test` 27 files / 130 tests passing,
`prettier --write` applied. Not yet verified in a browser.

---

## 2. TODO (P0) — There is no lock, so there is no escape

`mystery-substance.package.ts` declares:

```ts
solution: { mode: 'exact', exactSolutionIds: ['solution-shelf-restored'] }
```

**`solution-shelf-restored` is defined nowhere in the repository.** That string
appears exactly once — in the declaration itself. There is no `solutions.json`,
and `investigation-runtime-validators.ts` never checks the reference. The correct
answer is not encoded in the system anywhere.

The consequence: `RestorationWorkspaceComponent.saveCase()` accepts Cornstarch →
Vial A → Retest tray at 0 % confidence and reports success. Every path through
this experience is a winning path. Nothing ever resists the student.

**Fix:**

1. Add `solutions.json` to the package with the verified A/B/C/D mapping from
   §0, plus the required shelf zones.
2. Add a `solution.check` action + condition to the investigation action pack,
   and validate the `exactSolutionIds` reference in
   `investigation-runtime-validators.ts` so a dangling solution id fails the
   package load instead of silently passing.
3. Make the Shelf Restoration bench the final lock: submitting four labels
   returns a per-vial verdict — _"three of four positions hold; one contradicts
   your own conductivity record."_ Name the contradicting evidence, never the
   right answer.
4. Reconsider `reveal: { mode: 'teacherControlled' }`. Deferring all judgment to
   an adult later is exactly what makes this read as coursework.

## 3. TODO (P0) — Completion is decoupled from deduction

`MysteryInvestigationService.captureActivity()` dispatches `activity.completed`
on **every** capture. One trial on one vial marks the entire four-vial Properties
Lab complete — 1 of 16 possible data points. `evidenceResultMatrix()` in the host
component is clearly built to accumulate a 4 × 4 grid, and nothing requires the
student to fill it.

**Fix:** gate completion on the _discriminating_ cells, not on a button press:
conductivity on at least two vials, the acid test on the bicarbonate candidate,
the iodine test on the starch candidate. Fire `activity.completed` only when the
collected results can actually separate all four.

## 4. TODO (P1) — Nothing is ever locked

- `activityViews` hardcodes `locked: false`. The `lockReason` / 🔒 branch in
  `investigate-panel.component.html` is unreachable dead markup.
- `openness` sets `evidenceOrder`, `activityOrder`, and `lessonOrder` all to
  `'open'`.
- All 14 rules in `rules.json` are the same shape: _complete activity X → unlock
  the evidence X itself just produced._ That is a receipt, not a lock. **No rule
  gates an activity, a station, a tool, or a reagent behind a discovery.**

The rules engine already supports `evidence.unlock`, `evidence.reveal`, and
`solution.reveal`. It is running at roughly 5 % of capacity. Gate the acid
reagent behind reading the probe calibration record; gate the Reaction Bench
behind a filled property grid. Earning tools is most of what makes a room feel
like a room.

## 5. PARTLY DONE — Interaction verbs are form verbs

Every station reduced to _pick from a list → press the button → read the
paragraph_. Nothing was dragged, poured, weighed, combined, or opened. Vial C's
dramatic moment was delivered as the string `'rapid bubbles for 18 s'` rendered
into a `<strong>` — the theatre was _described_ rather than _staged_.

| Station        | Interaction                                            | State       |
| -------------- | ------------------------------------------------------ | ----------- |
| Reaction Bench | Drag specimens and reagent into a sealed rig; watch it | **Rebuilt** |
| Optical scan   | Click chip, toggle 4 tags, type in a `<textarea>`      | TODO        |
| Properties Lab | Click tab, click vial, click Run, read key/value text  | TODO        |
| Conservation   | Click toggle, click Run, read two numbers              | TODO        |
| Restoration    | Four tabs of button grids + a range slider             | TODO        |

### DONE — Reaction Bench rebuilt as a hands-on protocol

Upgraded first because it holds the most dramatic moment in the puzzle and had
the worst interaction in the app: two `<select>` dropdowns.

New files: `reaction-bench.component.ts` / `.html` / `.scss` / `.spec.ts`.
`ReactionWorkspaceComponent` and its dropdowns were deleted from
`station-workspaces.ts`; the host `@switch` renders `<app-reaction-bench>`.

**One vial, one sealed vessel, four steps the student performs by hand.** The
old bench compared two vessels at once and claimed "equal conditions" in prose.
The rebuilt bench makes the student _achieve_ those conditions:

1. **Draw 5 mL from the tun.** Open the tap and the beaker fills in real time;
   close it inside a ±0.25 mL band marked on the glass. Overshoot and the only
   way forward is to drain and pour again. A `+0.1 mL` nudge allows a fine
   top-up. The balance stays locked until the pour is inside the band.
2. **Weigh 2 g on the digital balance.** Trickle specimen onto the pan, watch the
   readout climb, and stop inside ±0.05 g — take a pinch back off with `−0.1 g`
   if it goes over. The balance reports `measuring…` while material is moving
   and `stable` only once the student stops, and the transfer is refused until
   the reading is both stable and in band.
3. **Transfer into the sealed vessel.** The weighed powder animates into the
   beaker, the Solution A stage plays: the liquid transitions from `colorBefore`
   to `colorAfter`, bubbles rise **only if** the outcome table reports gas, and
   the thermometer tweens with a cubic ease while a rig clock counts out the 18
   simulated seconds. Vial C visibly fizzes and falls 22 → 19 °C; Vial D turns
   the solution cloudy.
4. **Add three drops of Indicator B.** Each drop animates in; on the third the
   liquid takes the indicator's amber and then develops to its final colour.
   Vial D goes blue-black. The bench stops accepting drops at three.

Targets come straight from the reagent cards already in
`mystery-science.config.ts` — "Add 5 mL to equal 2 g samples" and "Add three
drops" — so the protocol is the data, not a new invention.

- **Technique is recorded, not just the result.** The achieved volume and mass
  are latched when each step is locked in, and draining the beaker or emptying
  the pan counts as a reset. `tightRun()` asks the harder question — did they
  land inside _half_ a tolerance, first attempt? — and the record card and
  procedure log report the real numbers either way.
- **The student names what they saw.** The bench will not file evidence until
  the observation field has content, inverting the old behaviour where the app
  printed a conclusion and the student transcribed it.
- **Accumulation is visible.** The procedure log lists each screening with a
  generated headline and the conditions used; vials carry a ✓ once screened.
- **Keyboard and touch throughout.** Every control is a real `<button>` with an
  `aria-label`; the tap and the trickle are toggles rather than press-and-hold,
  so pointer and keyboard behave identically. Readouts are `aria-live`.
  `prefers-reduced-motion` drops the stream, bubbles and transitions.
- **Data contract widened, not broken.** Still driven by
  `DeterministicSimulationAdapter` over `reactionOutcomeTable`. One screening now
  files both stages for one vial as
  `{ vialId, procedure, stages: [{ reagent, vialId, output }] }`;
  `evidenceResultMatrix()` in the host reads that shape and still falls back to
  the older `{ reagent, comparisons }` records, so nothing already captured is
  lost.

**Verified:** 9 tests in `reaction-bench.component.spec.ts` (141 total passing)
cover the volume gate, the mass-and-stability gate, taking mass back off an
overloaded pan, draining an overfilled beaker, the full two-stage run on the
bicarbonate landing at 19 °C with bubbles on then off, the starch vessel
reaching blue-black, the observation-before-evidence gate and reset-for-next-
vial, reset bookkeeping marking a run untidy, and drops stopping at three.
Not yet verified in a browser.

> Note: `ng test` also reports 7 unhandled errors from
> `simulation-planning.spec.ts` / `route-atlas.spec.ts`. These are pre-existing
> and unrelated — a floating `queueMicrotask(() => this.atlas()?.focusRoute())`
> at `route-map.component.ts:147` in the frontier-trading feature. They occur
> with the mystery-substance specs removed.

### DONE — Graphics rebuilt as layered SVG with art slots

The bench previously drew every vessel as CSS `<div>`s with gradients and
`border-radius`. That has a hard ceiling: divs cannot express glass thickness,
refraction, or a meniscus, which is what made the rig read as a diagram.

Rebuilt as **layered SVG sized for a photoreal plate to drop in behind it**
(`bench-art.config.ts`). Each apparatus part renders an optional `src` plate and
an SVG stand-in; the dynamic layers always draw on top. `well` is the contract
between the two — the box the dynamic layer fills, in percent of the part — so a
rendered plate lines up with the liquid as long as its glass sits in the same
place. `apparatusArt` carries the aspect ratio, display size, and a note on what
each plate should show. **Nothing else has to change when the art arrives:** set
`src` and the stand-in steps aside.

What the stand-in now does that the divs could not:

- **Glass as a material** — a fill gradient across the barrel, a separate stroked
  edge, a thick base band, a blown specular highlight and an opposing rim light.
- **Refraction.** `feTurbulence` + `feDisplacementMap` on the back wall and
  graduations, applied only where liquid covers them, so what is behind the
  liquid bends and swims. This is the single strongest glass cue.
- **A meniscus** — a concave ellipse at the liquid surface with a bright rim,
  replacing the flat top edge.
- **Depth-graded liquid.** A Beer–Lambert overlay: lighter at the surface,
  deeper at the base, instead of one flat `rgba`.
- **Seated in the scene** — a blurred contact shadow, plus a caustic tinted to
  the liquid colour that only appears once the vessel holds something.
- **Cylindrical vial shading**, a label band, and a powder column tinted per
  specimen.
- **Bubbles with physics** — they accelerate, drift laterally, and grow as
  pressure drops, rather than rising linearly.

**Particle profiles double as evidence.** `grainProfiles` gives each specimen its
own pour: A is 11 coarse sparkling grains, B 14 smaller sparkling ones, C 20 fine
grains with dust, D 26 very fine clumping grains with a heavy dust cloud. Particle
size is one of the four discriminating observations in this investigation, so
every vial pouring identically was throwing away a real evidence channel.
Scatter is index-derived, not random, so a specimen pours the same way every
time — the bench is a measuring instrument, not a lava lamp.

**Performance.** `RenderQualityService` starts at high quality and samples frame
times across the first animated stretch; if the mean frame exceeds 22 ms it drops
the filters permanently for the session. It never climbs back — flipping the
glass between two looks mid-investigation is worse than picking the cheaper one
and staying there. `prefers-reduced-motion` starts in the cheap path directly.

#### Art plates — all six delivered and live

All six plates are rendered, measured and wired up in `bench-art.config.ts`.
Glass plates (beaker, vial, tube, reservoir) sit on pure black and composite with
`mix-blend-mode: screen`; the two opaque metal parts (balance, valve) are real
alpha cutouts and composite normally.

The vessel bore was measured off the beaker plate rather than estimated —
interior 25.8%/26.4% left/right, 26.9%/18.8% top/bottom — and the SVG bore was
retuned from x 14-114 to x 33-94, y 30-160 to y 47-143 so the drawn liquid sits
inside the photographed glass.

`beakerCapacityMl` is 7, not 8. That is a calibration, not a guess: it places a
5 mL fill at y=622px on the plate, and the midpoint of the plate's etched 4 and
6 marks is y=620px. The plate's own tick spacing is slightly non-uniform (a
render artifact — 158 px/mL between 4 and 6, 134 px/mL between 2 and 4), so
alignment is exact at the 5 mL target and drifts a little at the extremes. The
target band and digital readout the app draws remain authoritative.

When a plate is present the stand-in stops drawing the parts the photo carries —
glass body, stopper, graduations, vial cap and label — so nothing doubles up.

### Still TODO

1. **Apply the same treatment to the other three stations.** The Properties Lab
   is the highest-value next target: light the conductivity lamp and move the
   needle rather than printing `'Probe bar rises and lamp glows'`, and let the
   student drag a vial into the water cup.
2. **Add a cost to being wrong.** Nothing is consumed, no test is limited, no
   clock runs, and repeated trials are free. Even a gentle cost works — log
   rejected shelf submissions in the audit and surface the attempt count in the
   final case file. Escape rooms work because failure is visible and recoverable;
   here failure is impossible, which is precisely why it reads as a website.

## 6. TODO (P2) — Smaller items

- **Dead component.** `ShowcaseWorkspaceComponent` (`station-workspaces.ts`
  ~lines 669–745) is never rendered. Nothing references
  `<app-showcase-workspace>`; phase 07 routes to `app-investigation-final-case`
  instead. Delete it or wire it up.
- **Duplicated puzzle step.** The Properties Lab `appearance` test returns the
  same strings as the phase-1 optical scan, so students redo work they already
  did. Either drop it or make it add magnification detail the scan lacked.
- **Oversized art.** `conservation-test-scenes-v2.png` (2.4 MB),
  `week2-test-scenes-v2.png` (1.9 MB), `week4-test-scenes-v2.png` (1.8 MB) —
  7.9 MB of sprite sheets shipped as PNG while the evidence artwork is correctly
  `.webp`. Convert. These now also load as bench card and rail thumbnails, so the
  cost is paid on first paint.
- **Decorative instrument metadata.** `PhysicalTestDefinition.instrument`
  (`'6× magnifier'`, `'Calibrated probe'`) is a label only. Instruments are not
  objects a student picks up, owns, or can lose access to.

---

## Language audit

The vocabulary is a reliable tell for whether this reads as a room or a site.
Section 1 fixed the navigation labels; the panel internals still need a pass.

| Currently says                            | Should say                                         |
| ----------------------------------------- | -------------------------------------------------- |
| ~~Workspace pair~~                        | Lab Bench _(done)_                                 |
| ~~Clues → Meaning / Evidence + Analysis~~ | Evidence Locker _(done)_                           |
| ~~Investigate → Theory~~                  | the station's own name _(done)_                    |
| Analysis Panel                            | the corkboard                                      |
| Working Theory                            | case notes                                         |
| Practice investigation                    | _(delete — students are not practising)_           |
| Run equal-condition test                  | pour / add / measure                               |
| Helps you learn                           | _(delete — do not narrate pedagogy to the player)_ |
