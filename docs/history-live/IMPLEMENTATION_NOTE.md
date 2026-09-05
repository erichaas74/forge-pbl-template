# History Live Broadcast MVP

## Scope

This phase implements the first reusable `history-live-broadcast@1.0` experience and the
`history-live-revolutionary-war@1.0.0` configuration described in the supplied project brief.

The implemented path is:

`Opening → Network → Assignment Desk → Pitch → Source Wall → Script Desk → Production → Broadcast Preview → Producer Schedule → Showcase`

## Reuse audit

- Reused unchanged: Angular route/provider composition, standalone component conventions, browser-local persistence pattern, project catalog, and project configuration/runtime separation.
- New reusable capability: the `templates/history-live` domain, runtime service, persistence adapter, state helpers, and UI stations.
- New project configuration: Revolutionary War networks, beats, story leads, balanced source wall, network graphics, and sample class rundown.
- Core contracts changed: none.
- Existing project templates changed: none.

## MVP boundaries

- Camera states are limited to Studio Wide, Reporter, and Media Wall.
- Media types are limited to image, historical map, quote, timeline, and simple chart.
- Recording uses the browser `MediaRecorder` API and remains in-memory for the current session.
- Teacher approval is represented by an explicit preview approval event so the standalone demo can complete end-to-end.
- State persists locally through an adapter boundary. Realtime class synchronization, durable uploads, captions, and authenticated permissions remain later production phases.

## Pre-rendered scene system

- `continental-news-desk-v2.png` places the Continental bureau in a July 1776 Philadelphia
  press-and-assembly room; `crown-news-desk-v2.png` places the Crown bureau in a 1777 Westminster
  parliamentary press room. Names, descriptions, and controls remain accessible HTML.
- `patriot-assignment-newsroom.png` and `british-assignment-newsroom.png` use different
  period-specific advocates. Each person's role is mapped to the lead they are urgently asking the
  student to cover.
- At narrow widths, the scene becomes a decorative establishing image and the same five story
  buttons reflow into a readable stacked newswire, preserving keyboard and touch access.
- Reusable authoring requirements live in `HISTORY_LIVE_TEMPLATE_DIRECTIONS.md`.

## Source alignment

The source wall uses or cites primary/archival material from the U.S. National Archives,
UK Parliament, Founders Online, Library of Congress, Library and Archives Canada, and the
Avalon Project. Source cards distinguish document claims from reporter context and require an
opposing-network check before production.

## Capability gaps deferred from the brief

### TEMPLATE_CAPABILITY_GAP: production media storage

Requested behavior: durable student video upload, captions, and playback across devices.

MVP limitation: the browser recording is an object URL and is intentionally not serialized into
runtime state.

Suggested reusable capability: an asset-storage-backed recording adapter with upload progress,
caption/transcript metadata, and retry-safe submission events.

### TEMPLATE_CAPABILITY_GAP: synchronized live broadcast

Requested behavior: one teacher-controlled live state reflected to a class audience in realtime.

MVP limitation: producer actions are stored on one browser only.

Suggested reusable capability: a server-authoritative live-session adapter using revision checks,
scoped audience subscriptions, and audited producer commands.

### TEMPLATE_CAPABILITY_GAP: teacher project builder

Requested behavior: edit event scope, network identities, sources, formats, deadlines, and rubric.

MVP limitation: these values live in the versioned Revolutionary War configuration.

Suggested reusable capability: validated History Live authoring forms that publish immutable,
versioned project configurations.
