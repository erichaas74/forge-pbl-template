# Case Board Art — Generation Prompt

One plate: the wall the reasoning workspace hangs on. Companion to
`STATION_ART_PROMPTS.md` and `BENCH_ART_PROMPTS.md`.

**Nothing here is blocking.** The workspace already renders on
`week1-incident-room-v1.webp` as a stand-in. When the plate below is generated,
save it as `public/case-board-room.webp` and it takes over automatically — the
CSS stacks it above the stand-in and needs no code change. To go back, delete
the file.

---

## What it has to do

This plate is a **background**, not a subject. It sits behind two translucent
panes carrying small text, at roughly 42% brightness with a vignette and a warm
lamp gradient over it. So the brief is the opposite of the station plates:

| Station plates                | This plate                             |
| ----------------------------- | -------------------------------------- |
| One object, centred, sharp    | A room, off-centre interest, soft      |
| Fills 90% of frame            | Nothing important in the middle third  |
| Even light, no mood           | One warm lamp, deep falloff to corners |
| Pure white or black backdrop  | Full scene, edge to edge               |

**The centre of the image is covered by UI.** Put the detail — the pinned wall,
the lamp, the desk edge — in the outer thirds and the top, and keep the middle
quiet. Anything with legible text or a strong focal point in the centre will
fight the panes and lose.

## Size and format

`case-board-room.webp` — **2400 × 1350 px**, 16:9, WebP, quality ~78. Target
under 250 KB; it is a dimmed backdrop, so it does not need to be crisp. Match
`lab-investigation-room-v2.webp` (181 KB) rather than the 2 MB PNG scenes.

## The prompt

```
A dim school science-department incident room photographed straight on from
across the room, wide angle, at standing eye level. The far wall is a large
cork evidence board covered with pinned material: photographs of glass vials,
typed report pages, index cards, a hand-drawn shelf diagram, and short lengths
of red thread running between some of the pins. The pinned papers are turned
slightly at different angles and are visibly paper, not screens.

A single warm desk lamp sits at the upper left, just out of frame, throwing a
soft pool of amber light across the top left of the board. The light falls away
steeply — the lower right of the room is deep shadow. No other light source, no
window, no overhead fluorescents, no coloured gels.

Along the bottom edge, the front of a dark laboratory bench crosses the frame,
slightly out of focus, with the blurred shapes of a beaker and a closed notebook
resting on it.

The middle of the image is deliberately empty wall — plain cork with nothing
pinned to it — so the centre stays quiet and uncluttered.

Photorealistic, cinematic, muted warm palette of browns, ambers and deep
shadow. Shallow depth of field on the foreground bench, the board itself in
reasonable focus. No people, no hands, no readable text, no logos, no
watermarks. 16:9 aspect ratio.
```

**Must not contain:** readable text on any pinned page (it will be dimmed to
noise and any legible word reads as a bug), a person, a bright centre, cool
blue or cyan lighting, a modern screen or monitor, a window.

## Checking it

Drop the file in `public/`, reload, and look at the workspace:

1. **Can you read a spine title over every part of the plate?** The panes carry
   `backdrop-filter: blur(7px)` and a 72%-opaque ground, so this should hold —
   but a bright hotspot behind a pane will still hurt. If one does, dim the
   plate rather than thickening the panes.
2. **Is the centre quiet?** Squint. If a pinned photograph is visible through
   the gap between the panes and pulls the eye, regenerate with more empty wall.
3. **Does the lamp land upper left?** The workspace paints its own warm
   gradient from the same corner. A plate lit from the right will fight it.

## Optional second plate

If the first one works, a **`case-board-room-night.webp`** with the lamp off and
only corridor light through a doorway would give the Bay 3 emergency phase its
own after-hours version of the same room. Nice, not needed — the emergency
station carries its own scene already.
