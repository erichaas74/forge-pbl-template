# Journey atlas artwork

The journey map follows Frontier Trading's illustrated-background approach. The new artwork is shared by active voyages, replay, and class comparison through `LivingJourneyMapComponent`. Routes, ports, labels, ship positions, zoom, and inspection remain live SVG/Angular controls. No runtime, persistence, curriculum, or schema contracts changed.

## Assets and provenance

- `public/journey-replay/world-atlas-v1.png`: built-in ImageGen artwork; equirectangular 2:1 world chart with painted terrain and teal oceans. Terrain is decorative, not an elevation dataset.
- `public/journey-replay/world-coastlines.svg`: lightweight vector underlay, visible if the decorative image fails to load. Generated from [Natural Earth 110m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), [public domain](https://www.naturalearthdata.com/about/terms-of-use/).

Both assets fill the existing 1000 × 500 longitude/latitude coordinate system. The coastline SVG was rasterized as the reference for ImageGen. Regenerations should preserve its bounds and projection. Never paint labels or runtime route state into the image.

## Final prompt (built-in ImageGen)

Use case: style-transfer. Asset type: a detailed illustrated world map background for an interactive Age of Exploration educational game. Edit target: supplied world-reference.png is the EXACT equirectangular coastline geometry. Preserve ALL continent silhouettes and locations, scale, projection, full edge-to-edge 2:1 framing exactly. Upgrade flat colors into premium realistic painted atlas artwork, like richly rendered historical strategy game scenery: deep petrol teal ocean with delicate engraved wave texture, turquoise shallow-water coastline edging, warm ochre and moss-green land, finely painted mountain relief, desert dunes in Sahara and Arabia, green river valleys and forests, snowy northern regions. Subtle parchment patina, warm natural light, intricate fine detail, sophisticated muted earth tones. Overhead flat map, NOT a globe or tilted perspective. Maintain readable uncluttered ocean negative space for live routes. No labels, words, lettering, symbols, routes, dots, ships, compass, border, frame, UI, or watermark. Keep precise coastline positions identical to reference; no rearranged geography. Output 2000 by 1000 or equivalent 2:1 high resolution.

## Implementation and validation

Modified the map template, styles, and label placement; added the two assets and a map component spec. Nearby ports receive opposite label anchors; navigation now toggles grid and geographic lettering. Ports remain keyboard operable, with visible focus, and map animation respects reduced motion. No new capability, specification deviation, or TEMPLATE_CAPABILITY_GAP was introduced.

Validation: production Angular build and scoped journey tests; browser review of regional/world charts, zoom, port inspection, and overlays. Existing unrelated component-style budget warnings remain. Further art work can use this same layered renderer without changing the journey engine.
