# History Live Template Directions

Runtime, source packet, review, media, and compatibility requirements for template 1.1 are documented in [History Live 1.1 implementation](HISTORY_LIVE_1_1_IMPLEMENTATION.md). Keep these behavior contracts alongside the visual requirements below.

## Visual principle

Every History Live project must look as though a serious news organization has opened a
temporary bureau **inside the event's actual time and place**. The broadcast language may be
modern, but the surrounding architecture, clothing, tools, documents, geography, light sources,
and public concerns must be specific to the configured historical event.

Generic television studios and generic contemporary newsroom crowds are not valid final assets.

## Network desk scenes

Each configured perspective or network must provide:

- a project-specific pre-rendered desk image;
- an explicit historical location and date label;
- alt text naming the location and meaningful period details;
- a blank screen or safe visual area for live HTML graphics;
- equivalent production quality, dignity, and visual complexity across perspectives.

The desk should retain the History Live signature contrast: a polished modern broadcast surface
embedded in a historically grounded location. Background activity may use period printers,
messengers, clerks, maps, records, workshops, assemblies, or other event-specific work. Do not
use generic modern monitors or a placeless office behind the desk.

Network distinction should come from relevant materials, editorial location, and restrained color
direction. Avoid flags, hero/villain coding, stereotypes, triumphal symbols, or weapon-focused art.

## Assignment-room scene

Each available side must provide its own period- and location-specific assignment-room image.
The scene is a human story-selection interface, not decorative background art.

For every visible story lead:

1. Include exactly one identifiable advocate with a historically plausible reason to care about
   that story.
2. Make the person's clothing, role, nearby tools, and setting support that connection.
3. Show the advocate urgently trying to win the reporter's attention: leaning forward, intense
   eye contact, open mouth as if calling out, and a clear active gesture.
4. Place the blank newspaper or assignment card at shoulder, face, or overhead height—not
   passively at the waist.
5. Keep the advocate's face visible and the blank surface front-facing, fully separated from other
   cards, and large enough for an HTML headline.

Urgency should feel loud, crowded, and passionate without becoming violent or unsafe. No weapon
may be aimed or brandished. Both networks receive equal dignity.

The advocate represents a relevant voice, not every member of a broad group. When a lead concerns
excluded or underrepresented people, name the specific voice shown and do not imply that one
person represents all affected communities.

## Image and interface separation

Do not render final headlines, controls, logos, or instructional copy into the raster image.
Newspapers and cards stay blank. Angular renders the live story data over each surface so that:

- titles remain sharp and editable;
- translated or revised projects do not require new artwork;
- buttons remain keyboard, touch, and screen-reader accessible;
- a small-screen layout can reflow the same leads into a readable list.

Each `HistoryLiveAssignmentAdvocate` maps one stable `leadId` to an `advocateLabel` and percentage
rectangle (`leftPercent`, `topPercent`, `widthPercent`, `heightPercent`). Every lead for the side
must have exactly one in-bounds mapping. Validation blocks an incomplete mapping.

## Revolutionary War implementation

### Continental News Network

- Desk bureau: Philadelphia near the Pennsylvania State House, July 1776.
- Environmental cues: assembly-and-print room, hand press, type cases, quills, broadsides,
  messengers, colonial street, thirteen-colony maps, walnut, parchment, and Continental blue.
- Assignment advocates: Massachusetts militia courier; Philadelphia printer; Continental soldier;
  free Black petitioner; Continental alliance liaison.

### Crown News Network

- Desk bureau: Westminster, London during the American war, centered on 1777.
- Environmental cues: parliamentary press room, Georgian oak paneling, rain-darkened Westminster,
  hand press, dispatch boxes, Atlantic charts, clerks, couriers, wax seals, navy, and oxblood.
- Assignment advocates: parliamentary revenue clerk; British campaign clerk; Royal Navy chart
  officer; Loyalist refugee; British field correspondent.

## Generation prompt checklist

- [ ] Name the exact project, year or date range, and location.
- [ ] Name every advocate in story-lead order and explain why that role cares.
- [ ] Require open-mouth urgency, direct attention, active gesture, and raised papers.
- [ ] Require exactly one person and one blank surface per available lead.
- [ ] Specify the intended interactive layout and safe headline areas.
- [ ] Ban fake text, logos, flags, watermarks, stereotypes, and generic modern backgrounds.
- [ ] Preserve equal visual quality across opposing perspectives.
- [ ] Write location-specific, meaningful alt text after reviewing the final render.
