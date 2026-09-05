# Station Art — Generation Prompts

Nine plates for the Properties Lab, Conservation and Restoration stations.
Companion to `BENCH_ART_PROMPTS.md`, which covers the Reaction Bench.

Every slot has a working SVG stand-in already, so **nothing here is blocking** —
ship any subset, in any order. Wire a finished plate up by setting `src` in
`src/app/projects/mystery-substance/station-art.config.ts`.

---

## Background rule (same as the bench)

Glass cannot be cut out cleanly — background removers eat the vessel walls and
leave a floating rim. So glassware is generated on **pure black** and composited
with `mix-blend-mode: screen`, which drops black to nothing and keeps the
highlights. Opaque objects get a real alpha cutout.

| Plate        | Background           | Composite | Cut out? |
| ------------ | -------------------- | --------- | -------- |
| `waterCup`   | pure black `#000000` | `screen`  | No       |
| `chamber`    | pure black `#000000` | `screen`  | No       |
| `magnifier`  | pure white           | `normal`  | **Yes**  |
| `probe`      | pure white           | `normal`  | **Yes**  |
| `lamp`       | pure white           | `normal`  | **Yes**  |
| `scanBed`    | pure white           | `normal`  | **Yes**  |
| `padBalance` | pure white           | `normal`  | **Yes**  |
| `shelf`      | pure white           | `normal`  | **Yes**  |
| `labelSheet` | pure white           | `normal`  | **Yes**  |

## Shared preamble

Paste in front of every prompt below.

```
Studio product photograph of a single laboratory object, shot straight on at
eye level with no perspective distortion. The object is centred and fills about
90% of the frame with a small even margin. One soft key light from the upper
left, gentle fill from the right, no coloured gels. Sharp focus throughout with
no depth-of-field blur. Photorealistic, clean, scientific supply-catalogue
style. No table, floor line, surface, horizon, props, hands, text, labels,
watermarks or logos anywhere in the image.
```

**The key light must come from the upper left in all nine**, matching the bench
plates. Consistent light direction across every object is what stops composited
art looking pasted on — it matters more than render quality.

---

## Properties Lab

### 1 · `magnifier.webp` — 528 × 528 px

Square. White background, cut out. The specimen field is drawn _inside_ the
lens, so the glass must be empty and clear.

```
A round bench magnifier viewed straight down from directly above, so it reads as
a perfect circle. A brushed chrome ring holds a clean, completely clear lens.
The lens is empty — nothing under it, nothing reflected in it, no scratches, no
dust, no colour tint. Only the ring and the empty glass.

No handle, no arm, no stand, no mount. Plain pure white background. Square 1:1
aspect ratio.
```

**Must not contain:** anything visible through the lens, a handle or arm, a
reflection of a room or photographer.

### 2 · `waterCup.webp` — 396 × 483 px

Aspect 0.82. **Pure black background**, no cutout.

```
An empty straight-sided glass laboratory beaker standing upright, plain and
unmarked. Smooth cylindrical walls, a slightly thickened base, a plain rim with
no pouring spout. The beaker is completely empty and dry — no water, no liquid,
no droplets, no condensation.

No graduation marks, no numbers, no printed scale of any kind on the glass. No
stopper or lid.

Seamless pure black background (#000000). Aspect ratio 0.82, slightly taller
than wide.
```

**Must not contain:** graduations or numbers (this cup is deliberately unmarked
— the bench beaker is the one with a scale), liquid, a spout, a lid.

### 3 · `probe.webp` — 132 × 440 px

Aspect 0.30, tall and narrow. White background, cut out.

```
A handheld conductivity probe held vertically, tip pointing down. It has a matte
black cylindrical handle in the upper two thirds, and below it two parallel
polished stainless steel electrodes running down to the tip, separated by a
small even gap.

The probe is clean and dry. No cable, no lead, no connector, no display, no
markings on the handle.

Plain pure white background. Aspect ratio 0.30, very tall and narrow.
```

**Must not contain:** a cable or lead, a digital readout, a single electrode
(there must be exactly two, parallel).

### 4 · `lamp.webp` — 174 × 242 px

Aspect 0.72. White background, cut out. The glow is drawn, so it must be off.

```
A small clear indicator bulb seated in a brass holder, seen from the front. The
glass envelope is clear and the tungsten filament inside is clearly visible.

The bulb is switched OFF — dark, cold, unlit, with no glow, no halo, no light
spill and no bloom of any kind. The filament is a dull grey wire, not glowing.

No wires, no socket base beyond the brass holder, no switch. Plain pure white
background. Aspect ratio 0.72.
```

**Must not contain:** any glow, halo or emitted light — this is the most common
failure; models light bulbs by default.

### 5 · `scanBed.webp` — 624 × 390 px

Aspect 1.6, landscape. White background, cut out. Particles are drawn in the
recessed well.

```
A non-contact surface scanner bed seen from slightly above: a flat dark matte
grey tray with a shallow rectangular recessed sample well in the centre. The
well is completely empty — no sample, no powder, no residue.

The tray has clean machined edges and a low profile. No scanning head, no arm,
no gantry above it, no cables, no buttons, no display.

Plain pure white background. Aspect ratio 1.6, landscape.
```

**Must not contain:** anything in the well, a scanning head or arm, cables.

---

## Conservation

### 6 · `chamber.webp` — 630 × 600 px

Aspect 1.05, nearly square. **Pure black background**, no cutout. Particles and
the measured boundary are drawn inside it.

```
A square glass reaction chamber seen straight on from the front, like a small
aquarium. Four clear glass walls with slim stainless steel corner posts, and a
flat glass lid resting on top.

The chamber is completely empty — no contents, no liquid, no gas, no smoke, no
condensation, nothing inside it at all. Clean, clear, unscratched glass.

Seamless pure black background (#000000). Aspect ratio 1.05, very slightly wider
than tall.
```

**Must not contain:** anything inside the chamber, a hose or valve, a stand.

If you can generate a **second variant with the lid tilted open** at one corner,
save it as `chamber-open.webp` — the station shows sealed and open systems, and
a visibly open lid makes the difference immediate. Optional; the drawn lid
handles it otherwise.

### 7 · `padBalance.webp` — 570 × 300 px

Aspect 1.9, landscape. White background, cut out. The reading is drawn.

```
A flat platform balance seen from the front: a low, wide, slim body with a large
flat rectangular weighing pan on top spanning most of its width. The pan is
completely empty.

The display panel on the front is present but switched off — a plain dark grey
blank rectangle with absolutely no numbers, digits, readout, text or glow.

Lower and wider than a typical analytical balance, with no draft shield. No
cables, no buttons with writing. Plain pure white background. Aspect ratio 1.9.
```

**Must not contain:** digits or text on the display, anything on the pan, a
draft shield.

This is deliberately a _different_ balance from the bench's `balance.webp` — flat
and wide rather than tall and boxy, so the two stations read as different
apparatus.

---

## Restoration

### 8 · `shelf.webp` — 1440 × 600 px

Aspect 2.4, wide landscape. White background, cut out. Vials are drawn into the
bays.

```
An empty laboratory storage shelf unit seen straight on from the front. It is a
single horizontal run divided into four equal open bays by three vertical
dividers, with a solid base shelf and a top rail.

Pale birch plywood with clean edges, or brushed steel — one material throughout.
Every bay is completely empty: no bottles, no jars, no containers, no labels, no
contents of any kind.

Plain pure white background. Aspect ratio 2.4, wide landscape.
```

**Must not contain:** any bottles or containers in the bays, labels or signage,
a back panel with visible contents, more or fewer than four bays.

### 9 · `labelSheet.webp` — 390 × 150 px

Aspect 2.6, landscape. White background, cut out.

```
A single blank white adhesive label lying flat, seen straight down from above.
It is a plain rectangle with slightly rounded corners and one corner lifted and
curled very slightly upward, catching a small shadow underneath.

The label is completely blank — no writing, no text, no printed lines, no
borders, no barcode, no logo. Just clean white paper stock with a subtle paper
texture.

Plain pure white background, so the label reads against it by its shadow and
curl. Aspect ratio 2.6, landscape.
```

**Must not contain:** any writing or printed lines, a backing sheet with
multiple labels, a pen.

The label text is drawn at runtime — a recovered label name gets typed onto this
when the student drags it onto a vial.

---

## Post-processing

```bash
# black-background plates — no alpha needed
magick waterCup.png -resize 396x483! -quality 90 waterCup.webp
magick chamber.png  -resize 630x600! -quality 90 chamber.webp

# cut-out plates — keep alpha
magick magnifier.png  -resize 528x528!  -quality 92 magnifier.webp
magick probe.png      -resize 132x440!  -quality 92 probe.webp
magick lamp.png       -resize 174x242!  -quality 92 lamp.webp
magick scanBed.png    -resize 624x390!  -quality 92 scanBed.webp
magick padBalance.png -resize 570x300!  -quality 92 padBalance.webp
magick shelf.png      -resize 1440x600! -quality 92 shelf.webp
magick labelSheet.png -resize 390x150!  -quality 92 labelSheet.webp
```

Drop them into `public/station-art/`, then set `src` in
`station-art.config.ts`, e.g.:

```ts
magnifier: {
  src: '/station-art/magnifier.webp',
  blend: 'normal',
  ...
}
```

## After a plate lands

Two of the nine have a `well` — the box the dynamic layer fills, in percent of
the plate. Those need re-measuring against the real image, exactly as the bench
beaker did, or the drawn content will not sit inside the photographed apparatus:

- **`waterCup`** — the water level and cloudiness fill this
- **`chamber`** — the particles and the measured boundary live in this
- **`magnifier`** — the specimen field is drawn inside the lens circle
- **`scanBed`** — particles are drawn in the recessed well

Send the plates over and I will measure and set them.

## Common failures

- **A lit bulb** — regenerate with "unlit, cold, no glow". The single most
  likely failure in this set.
- **Graduations on the water cup** — it must be unmarked; the bench beaker is
  the one with a scale.
- **Digits on the balance display** — regenerate or paint the panel flat grey.
- **Bottles on the shelf** — regenerate with "every bay completely empty".
- **One electrode on the probe** — there must be exactly two, parallel.
- **A halo around a cut-out** — the white background was not fully removed;
  re-cut with a tighter threshold.
