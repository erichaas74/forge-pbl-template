# Frontier Trading shop scene art system

**Release:** 1.8.0  
**Purpose:** combine detailed pre-rendered environments with live, accessible, auditable game controls.

## Layer contract

The raster image supplies atmosphere, architecture, merchandise, lighting, and texture. It is never the source of truth for a price, quantity, trend, route fact, assessed answer, or action.

The Angular layer supplies:

- four full-size storefront hotspots over the town image;
- visible focus and hover frames;
- store names, merchant names, categories, discovery state, and mission state;
- a shallow price shelf that leaves most of the shop interior visible;
- compact Buy each, Sell each, market trend, stock, cargo space, and owned-quantity cards;
- buy, sell, route, search, and return-to-street controls;
- focus movement and reduced-motion behavior.

The project configuration supplies `streetSceneAsset` for the current location and `interiorSceneAsset` for each stall. Other simulation projects can omit the fields and keep the template fallback surface.

## Production assets

| Asset                         | Scene                                                       |
| ----------------------------- | ----------------------------------------------------------- |
| `town-street.webp`            | Four connected facades and one boardwalk                    |
| `general-store-interior.webp` | Food, textiles, practical supplies, and counter             |
| `blacksmith-interior.webp`    | Tools, repair hardware, lanterns, and workbench             |
| `freight-depot-interior.webp` | Pelts, raw materials, crates, barrels, and scale            |
| `notice-office-interior.webp` | Route table, blank notices, schedule board, and source desk |

All assets are 1536 × 1024 WebP files. The town loads first; only the selected interior is requested afterward.

## Prompt set

All five images use the `historical-scene` image-generation use case and the same premium semi-realistic, hand-painted educational adventure-game direction. The shared constraints are:

- straight-on, eye-level, landscape 3:2 composition;
- stable merchandise or facade zones for HTML overlays;
- natural timber, iron, canvas, stone, parchment, and period lighting;
- no readable writing, numbers, price tags, logos, watermark, UI, modern objects, or people blocking controls.

The exterior prompt requests exactly four connected storefronts in this order: mercantile, forge, freight depot, and notice office. Each interior prompt matches its exterior building and requests four visually separated merchandise or information zones with open space for dynamic HTML price plaques.

## Replacement rule

New art may replace one file without changing trade behavior as long as it preserves the 3:2 framing and the same broad interaction zones. If a new composition moves a shop or merchandise cluster substantially, update and keyboard-check the overlay layout in `market-view.component.scss` before publishing it.

The interior interaction layer should reserve most of the middle of the scene for the artwork. Keep the merchant message small, collapse optional route information, and place price cards in the bottom shelf. Quantity, totals, cash remaining, capacity validation, and confirmation belong in the separate wagon planner rather than on top of the merchandise scene.
