# Science Stations — Upgrade Plan

Bringing the remaining stations up to the standard set by the rebuilt Reaction
Bench, and deciding where 3D actually earns its place.

**Status:** Reaction Bench, Properties Lab and Conservation rebuilt. Restoration
and Scanner specced below, not yet built. Art prompts for all new plates are in
`STATION_ART_PROMPTS.md`; every slot has a working SVG stand-in meanwhile.

---

## What "the same way" means

The Reaction Bench rebuild established five things every station should do. This
is the checklist each upgrade is measured against.

1. **A procedure the student performs, not a form they fill.** Equal conditions
   are something they achieve by hand — measuring, weighing, timing — rather
   than something the prompt claims on their behalf.
2. **Results are staged, not printed.** The instrument shows the change. The app
   never hands over a pre-verbalised conclusion like `'Probe bar rises and lamp
glows'` for the student to transcribe.
3. **The student names what they saw.** Evidence will not file until the
   observation field has content.
4. **Technique is recorded.** Achieved values are latched, resets are counted,
   and the record says how tightly conditions were held.
5. **Layered art slots.** A rendered plate behind, dynamic layers on top, a
   measured `well` contract between them, and an SVG stand-in that works when no
   plate exists.

Plus the constants: full keyboard path alongside any drag, `aria-live` readouts,
`prefers-reduced-motion` handling, and deterministic per-vial material
behaviour driven by `grainProfiles`.

## Shared lab kit

Rather than copy the bench's machinery four times, the reusable parts move to
`projects/mystery-substance/lab-kit/`:

| Module                      | What it carries                                                 |
| --------------------------- | --------------------------------------------------------------- |
| `art-slot.ts`               | The `ArtSlot` contract, `well` geometry, blend modes            |
| `render-quality.service.ts` | Frame-rate probe, filter degradation, reduced motion            |
| `grain-profiles.ts`         | Per-specimen particle behaviour and deterministic scatter       |
| `precision.ts`              | Target/tolerance bands, latched achieved values, reset counting |

`precision.ts` is the piece that generalises the bench's best idea. Pouring
5 mL ±0.25 and weighing 2 g ±0.05 are the same mechanic; so is stirring for
60 s ±3, and so is dipping a probe to a fixed depth. One primitive covers all of
them.

---

## Station 1 · Properties Lab — **highest value, doing now**

This station carries more deductive weight than any other. **Conductivity alone
splits the four specimens into two pairs** — it is the single most informative
measurement in the whole investigation — and the station owns the 4 × 4 matrix
the case file renders.

Today it is four tabs, a vial row, and a button that prints a sentence.

**Rebuild:**

- **A shared sample-prep step.** Measure water, weigh specimen, combine — the
  same precision mechanic as the bench, so equal conditions are earned once and
  reused across the water and probe trials. This also fixes a real science bug:
  the config says _"Measure only after the same water trial"_ but nothing
  currently enforces it.
- **Conductivity** — the probe descends into the solution, a lamp brightens in
  proportion to the reading, and an analogue needle sweeps and settles with
  overshoot. Calibration first: the `evidence-probe-calibration` record exists
  and should gate the instrument.
- **Solubility** — stir for a timed interval, then watch. Vial A and B clear;
  C goes cloudy then mostly clears; D holds a suspension and starts to settle a
  thin layer at 60 s. That is four visibly different behaviours, currently four
  strings.
- **Appearance and texture** — a magnifier with a zoom control and a **light
  angle** control. Swinging the light is what separates sparkling crystals from
  dull powder, which is exactly the observation the puzzle needs.
- **Per-specimen particles** already exist in `grainProfiles` and should drive
  every one of these.

**3D?** No. Every observation here is a surface or a bulk-liquid behaviour that
reads correctly in 2D. See the light-angle note under Production Pipeline.

## Station 2 · Conservation / Matter Tracker

Today: a closed/open toggle, a run button, two numbers.

The concept is that mass appears to change in an open system because gas leaves
the measured boundary. The current UI states that conclusion in prose
(`'Gas particles move beyond the measured container.'`) — the exact failure mode
the bench rebuild removed.

**Rebuild:**

- **A real particle simulation.** 24 individually tracked particles, countable
  on screen. In the sealed chamber they bounce off the boundary; in the open one,
  five escape past it and the counter falls 24 → 19 to match the existing data.
  The student watches conservation happen rather than reading that it did.
- **The balance is the drama.** Mass ticks down in real time _as particles
  leave_, tying the two representations together. That causal link is the entire
  learning objective and it is currently invisible.
- **A drawn system boundary** the student can toggle, so "the system" becomes a
  thing they define rather than a word.
- Weigh the chamber before and after using the shared precision mechanic.

**3D?** No — and deliberately. Particle models in science education are
conventionally 2D cross-sections because occlusion in 3D actively hides the
particles you are asking students to count. 3D would make this station worse.

## Station 3 · Shelf Restoration

Today: four tabs of button grids and a confidence slider.

This is a decision task, not a measurement task, so it upgrades differently.

**Rebuild:**

- **Drag each vial onto a physical shelf zone** rather than picking a zone from
  a list. The shelf is the interface.
- **Labels are physical too** — drag a recovered label onto a vial and it sticks
  to the blank band on the vial plate. The `vial.webp` label band is already
  blank for exactly this.
- **Constraint feedback in place.** One label per vial is already enforced in
  data; it should be visible — a label already used should visibly resist.
- This is also where the **missing solution check** lands (see
  `MYSTERY_SUBSTANCE_FIXES.md` §2). Submitting should return a per-vial verdict
  naming the contradicting evidence, never the right answer.

**3D?** No. Rotating a shelf adds nothing to the reasoning and costs a great
deal.

## Station 4 · Specimen Scanner

Today: a static macro image, four tag toggles, a textarea.

**Rebuild:**

- **Deep zoom** on the existing macro plates, so particle size becomes something
  the student resolves rather than reads.
- **A light-angle control.** This is the important one: crystals flash as the
  light sweeps, powders stay dull. It converts "sparkling" from a word in a tag
  list into an observation the student makes.
- A **scale bar** in the field of view, so particle size is measurable rather
  than adjectival — feeding the same discrimination the texture test wants.

**3D?** Not real-time 3D — but this station wants **multi-angle stills**, which
is the closest thing to a genuine 3D need in the project. See below.

---

## The 3D question

**None of the four stations needs a real-time 3D engine.** I want to be plain
about that rather than invent a reason to reach for one.

Every observation the puzzle depends on — particle size, sparkle, dissolving,
suspension, conductivity, gas release, temperature, colour change, particle
count — is either a surface property or a bulk behaviour that reads _better_ in
a controlled 2D view. Adding WebGL would cost a heavy dependency, a 3D asset
pipeline, and the accessibility story, and would buy occlusion problems in the
one place (particle counting) where clarity matters most.

**Where 3D genuinely pays off is the production pipeline, not the runtime.**

The current plates come from an image generator. That got us a long way, but it
has two structural limits already visible: the beaker's etched scale came back
non-linear, and the light direction has to be requested rather than specified.
Both are solved by moving plate production to **Blender**:

| Gain                                 | Why it matters here                                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact geometry                       | A bore that matches its own graduations, so `well` and the volume calibration are derived rather than measured back                               |
| Exact light direction                | One key light shared by every plate and matched to the bench photograph — the thing that most makes composited art look pasted on                 |
| **Turntable and light-angle frames** | 8–16 frames per specimen sweeping the light, cross-faded at runtime, gives the Scanner its sparkle and the Properties Lab its light-angle control |
| Deterministic re-renders             | Change one dimension and re-export all six plates consistently                                                                                    |

So the 3D recommendation is: **model the apparatus once in Blender, render
stills and short frame sequences from it, keep the runtime 2D.** That gets the
benefit of 3D — correct geometry, controllable light, multi-angle — without any
of its runtime cost.

The one place a frame sequence is worth the bytes is the specimen macro sweep,
because sparkle-under-moving-light is a discriminating observation the puzzle
actually uses. Budget: 4 specimens × 12 frames at ~20 KB = under 1 MB, which is
less than a single one of the current scene PNGs.

---

## Sequence

1. **Shared lab kit extraction** — everything below depends on it.
2. **Properties Lab** — most deductive weight, owns the 4 × 4 matrix.
3. **Conservation** — the particle simulation is the biggest single teaching win.
4. **Shelf Restoration** — pairs naturally with adding the missing solution check.
5. **Scanner** — cheapest, and best done once a Blender pipeline can supply the
   light-angle frames.

Convert the three remaining scene PNGs (7.9 MB) to WebP at any point; it is
independent of all of the above.
