# Frontier Trading map scene art system

**Release:** 1.6.0  
**Purpose:** make the route board feel like the same game world as the town while keeping every route and calculation live.

## Layer contract

The raster background supplies terrain, weather, settlements, lighting, depth, and historical atmosphere. It is decorative context and never determines whether a route is available or what a route costs.

The SVG and HTML layers supply:

- route geometry from the configured `path` value;
- available, blocked, locked, compared, selected, completed, and traveling states;
- route hit targets, keyboard destination controls, and visible focus;
- checkpoint counts and current wagon progress;
- place names, status labels, distance, days, risk, supplies, and forecasts;
- zoom, pan, layer controls, planner actions, and screen-reader descriptions.

`SimulationWorldDefinition.mapSceneAsset` is optional. Projects that omit it continue to receive the reusable vector terrain fallback.

## Production asset

| Asset                     | Use                                                                 |
| ------------------------- | ------------------------------------------------------------------- |
| `frontier-route-map.webp` | Full-bleed 5:4 terrain beneath the 100 × 80 live SVG coordinate map |

The optimized WebP is stored in `public/frontier-trading/map-scenes/`. The original ImageGen output remains in the Codex generated-images directory.

## Coordinate alignment

The image fills the same logical `0 0 100 80` viewport as the route overlay. The major visual zones correspond to the configured map points:

| Zone                 | Approximate coordinate |
| -------------------- | ---------------------- |
| Starting settlement  | 14, 62                 |
| Wooded northern fort | 38, 30                 |
| River crossing       | 47, 69                 |
| Mountain pass        | 68, 39                 |
| Plains fort          | 80, 68                 |
| High-country camp    | 89, 25                 |

Routes and destinations are never painted into the asset. This lets builders change route states, checkpoint counts, prices, progress, and labels without regenerating the scene.

## Prompt set

The background was generated with the built-in ImageGen `historical-scene` use case, using the town exterior as a visual reference. The prompt requested:

- a landscape 5:4 oblique top-down frontier game world;
- the same premium semi-realistic, hand-painted adventure-game direction as the shops;
- plains, river, forests, foothills, mountains, and six clear destination zones aligned to the configured coordinates;
- moderately open corridors between destinations for strong SVG route overlays;
- no route lines, roads, labels, place names, letters, numbers, signs, icons, compass, border, UI, prices, wagons, or baked gameplay state.

## Replacement rule

A replacement image must preserve the 5:4 framing, open route corridors, and major destination zones. Keep all assessed facts and interaction states out of the raster. After replacement, inspect all route states at full-map and zoomed views, verify every destination by keyboard, and check the mobile 5:4 layout before publishing a new project version.
