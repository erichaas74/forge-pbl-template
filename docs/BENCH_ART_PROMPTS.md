# Reaction Bench — Art Generation Prompts

Six plates for the Mystery Substance reaction bench. Each is generated
separately, then cropped and converted. Slots are independent — ship any subset
and the rest keep their built-in SVG stand-in.

Wire a finished plate up by setting `src` in
`src/app/projects/mystery-substance/bench-art.config.ts`.

---

## Read this first — why the background is black

Glass cannot be cut out cleanly. Background-removal tools treat transparent
pixels as background and eat the vessel walls, leaving only the rim.

So **four of the six plates are generated on pure black and never cut out at
all.** They composite with CSS `mix-blend-mode: screen`, which drops pure black
to nothing and keeps every highlight. Glass is mostly specular highlight, so this
reproduces it almost perfectly over the bench's dark scene.

| Plate       | Background               | Composite | Cut out?              |
| ----------- | ------------------------ | --------- | --------------------- |
| `beaker`    | pure black `#000000`     | `screen`  | No                    |
| `vial`      | pure black `#000000`     | `screen`  | No                    |
| `tube`      | pure black `#000000`     | `screen`  | No                    |
| `reservoir` | pure black `#000000`     | `screen`  | No                    |
| `balance`   | pure white, then cut out | `normal`  | **Yes — needs alpha** |
| `valve`     | pure white, then cut out | `normal`  | **Yes — needs alpha** |

The two opaque metal parts are the only ones needing a real alpha cutout, and
they are easy cases — solid objects with hard edges.

## Shared preamble

Paste this in front of every prompt below.

```
Studio product photograph of a single laboratory object, shot straight on at
eye level with no perspective distortion. The object is centred and fills about
90% of the frame height with a small even margin. One soft key light from the
upper left, gentle fill from the right, no coloured gels. Sharp focus
throughout with no depth-of-field blur. Photorealistic, clean, scientific
supply-catalogue style. No table, floor line, surface, horizon, props, hands,
text, labels, watermarks or logos anywhere in the image.
```

---

## 1 · `beaker.webp` — 432 × 594 px

Aspect **8:11 portrait**. Background: **pure black**. Highest priority — it is
the focal object of the whole station.

```
A single empty borosilicate glass reaction vessel standing upright, with
straight cylindrical walls and a softly rounded base. A grey silicone stopper is
firmly seated in the mouth at the top, sealing it. The glass is noticeably thick
and heavy at the base, catching a bright band of light the way thick laboratory
glass does. Fine white graduation marks are etched into the left side of the
wall with the small numbers 2, 4 and 6 beside them.

The vessel is completely empty and bone dry — absolutely no liquid, no droplets,
no condensation, no powder, no colour of any kind inside it. Clean, unscratched,
laboratory-new.

Seamless pure black background (#000000). Aspect ratio 8:11, portrait.
```

**Must not contain:** any liquid or fill line, a pouring spout, a handle, a
cast shadow, a visible surface underneath.

---

## 2 · `vial.webp` — 120 × 288 px

Aspect **5:12, tall and narrow**. Background: **pure black**.

```
A single small cylindrical glass specimen vial standing upright, roughly 4 cm
tall and slender. It has a black screw cap on top and a short neck below it.
Around the middle of the vial is a blank white paper label band with no writing
on it whatsoever — completely blank.

The vial is completely empty and dry: no powder, no liquid, no residue, no
staining. The clear glass shows soft vertical highlights running down each side
that reveal its round cylindrical form.

Seamless pure black background (#000000). Aspect ratio 5:12, very tall and
narrow portrait.
```

**Must not contain:** powder or contents of any kind, writing on the label, a
cork, a dropper, a cast shadow.

The label band must stay blank — the specimen letter is drawn at runtime, and
each vial's powder is tinted per specimen.

---

## 3 · `tube.webp` — 64 × 256 px

Aspect **1:4, very tall and narrow**. Background: **pure black**.

```
A short straight segment of clear flexible laboratory tubing running perfectly
vertically down the centre of the frame. The tubing is completely uniform in
width along its entire length and runs off both the top and the bottom edge of
the frame, so no ends, cut edges, fittings, connectors or clamps are visible
anywhere.

The interior of the tube is empty and transparent. A soft vertical highlight
runs down the left side of the tube showing its round cross-section.

Seamless pure black background (#000000). Aspect ratio 1:4, extremely tall and
narrow.
```

**Must not contain:** bends or curves, fittings, clamps, liquid inside, visible
tube ends.

This plate is stretched vertically rather than tiled, so uniform width along its
length matters far more than seamlessness.

---

## 4 · `reservoir.webp` — 360 × 164 px

Aspect **2.2:1, wide landscape**. Background: **pure black**.

```
A wide squat laboratory solution reservoir made of clear glass with a stainless
steel rim, seen straight on from the front. It is a broad horizontal tank, about
twice as wide as it is tall, with a flat top and gently rounded lower corners. A
short stainless steel outlet port protrudes from the bottom centre, pointing
downward.

The reservoir is completely empty — no liquid, no colour, no fill line, no
droplets inside it.

Seamless pure black background (#000000). Aspect ratio 2.2:1, wide landscape.
```

**Must not contain:** liquid or a fill line, a tap or valve on the outlet, a
stand or frame, a cast shadow.

The liquid level is drawn and drops as solution is drawn off, so it must be
empty.

---

## 5 · `valve.webp` — 160 × 88 px

Aspect **16:9 landscape**. Background: **pure white**, then cut out to
transparent PNG.

This is the fiddliest prompt because a handle-less valve is an unusual object.
Expect to generate several and pick the best.

```
A polished chrome laboratory stopcock valve body, photographed straight on from
the front. It is a short horizontal chrome cylinder with a vertical bore running
through it, oriented so that flow would pass from top to bottom.

Critically: the operating handle has been removed. The top of the valve shows
only the bare splined metal spindle stub where a handle would attach. There is
no lever, no wheel, no knob, no T-bar and no tap handle anywhere in the image —
just the naked valve body and the short spindle stub.

Polished chrome with crisp specular highlights. Plain pure white background.
Aspect ratio 16:9 landscape.
```

**Must not contain:** a handle, lever, wheel, knob or T-bar of any kind. This is
the failure mode to watch for — image models add a handle by default.

The handle is drawn in the app so it can rotate 90° when the student turns it.
A baked-in handle would sit there frozen next to the moving one.

---

## 6 · `balance.webp` — 384 × 220 px

Aspect **16:9 landscape**. Background: **pure white**, then cut out to
transparent PNG.

```
A modern digital laboratory analytical balance seen from the front, at a very
slight downward angle. It has a low rectangular body in brushed dark grey and a
round stainless steel weighing pan sitting on top, which is completely empty.

The LCD display panel on the front face is present but switched off: a plain
dark grey blank rectangle with absolutely no numbers, digits, readout, text or
glow on it at all.

No draft shield or glass windbreak around the pan. Plain pure white background.
Aspect ratio 16:9 landscape.
```

**Must not contain:** any digits or text on the display, anything on the pan, a
draft shield, a power cable.

The reading is drawn live, so the display must be blank.

---

## Post-processing

Crop or resize each to its exact pixel size, then convert to WebP.

```bash
# black-background plates — no alpha needed
magick beaker.png    -resize 432x594!  -quality 90 beaker.webp
magick vial.png      -resize 120x288!  -quality 90 vial.webp
magick tube.png      -resize 64x256!   -quality 90 tube.webp
magick reservoir.png -resize 360x164!  -quality 90 reservoir.webp

# cut-out plates — keep alpha
magick balance.png -resize 384x220! -define webp:lossless=false -quality 92 balance.webp
magick valve.png   -resize 160x88!  -define webp:lossless=false -quality 92 valve.webp
```

Drop all six into `public/bench-art/`.

## Wiring a finished plate up

In `bench-art.config.ts`, set `src` on the slot:

```ts
beaker: {
  src: '/bench-art/beaker.webp',
  blend: 'screen',
  ...
}
```

The stand-in steps aside automatically and the dynamic layers — liquid,
meniscus, bubbles, grains, valve handle, balance readout — keep drawing on top.

One manual step remains per plate: `well` currently describes the SVG stand-in's
geometry. Once a plate exists, re-measure where its liquid chamber actually sits
in the image and update those four percentages, or the liquid will not line up
with the glass.

## If a plate comes out wrong

- **Handle appears on the valve** — regenerate; it is the most common failure.
  Try "valve body only, handle detached and absent".
- **Digits on the balance** — regenerate, or paint the display area flat grey.
- **Glass looks washed out in the app** — the background was not pure black.
  Levels-adjust the black point to 0 before converting.
- **A halo around a cut-out part** — the white background was not fully removed;
  re-cut with a tighter threshold.
