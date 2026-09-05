# Wagon Cargo Art System

## Design decision

Cargo should not use one identical bag with color as the only difference. Fifth graders need to recognize both the kind of package and the exact quantity quickly. The implemented system combines three signals:

1. **Shape:** canvas sack, wooden crate, wrapped bale, or rope coil.
2. **Live label:** the material name appears in an HTML tag.
3. **Exact quantity:** every tag includes `× quantity`.

Color is a secondary decorative cue only. This keeps the load readable for color-blind students and prevents similar brown historical materials from becoming ambiguous.

## Package mapping

| Goods                                   | Package family | Visual reason                                                         |
| --------------------------------------- | -------------- | --------------------------------------------------------------------- |
| Flour, coffee, salt, sugar, dried beans | Canvas sack    | Dry provisions were commonly moved in tied sacks.                     |
| Iron tools, lantern oil                 | Wooden crate   | Rigid packaging communicates heavy or protected equipment.            |
| Fur pelts, cloth                        | Wrapped bale   | Compressing and tying flexible material creates a distinct low shape. |
| Rope                                    | Rope coil      | The material itself already has a recognizable transport form.        |

The mapping is stored on each `GoodDefinition` as `cargoPackage`. Future project packages may choose any supported family without adding project-name checks to the wagon component.

## Quantity levels

The artwork is representative while the tag is exact:

| Owned or planned quantity | Visible package pieces |
| ------------------------- | ---------------------- |
| 1                         | 1                      |
| 2–3                       | 2                      |
| 4–6                       | 3                      |
| 7 or more                 | 4                      |

Rendering every unit makes large loads turn into tiny unreadable tokens. The four visual levels let the wagon look fuller immediately, while `×14`, for example, remains the authoritative visual quantity. Cargo-space and inventory tables remain the authoritative numerical records.

## Layer contract

- `trade-wagon-realistic.webp` is the stable vehicle layer.
- Transparent PNG sprites in `public/frontier-trading/cargo-scenes` are the cargo layer.
- `IllustratedWagonComponent` builds stacks from live inventory or the current trade draft.
- Material names and quantities remain HTML generated from configuration and state.
- Labels, quantities, selection, planned/owned status, prices, and calculations must never be baked into raster art.
- The market keeps compact interactive cargo tags below the wagon so graphics do not block controls.

## Asset replacement rules

Replacement sprites must show one isolated object on a genuine transparent background, use a three-quarter view from slightly above, share warm upper-left lighting, contain no text, and remain recognizable at small sizes. Keep each optimized source at 512 × 512 pixels unless a future display needs more resolution.

Current generated asset prompts used the built-in ImageGen tool and requested realistic nineteenth-century cargo with no logos, labels, scenery, people, or wagon. The final assets are:

- `provisions-sack.png`
- `trade-crate.png`
- `wrapped-bale.png`
- `rope-coil.png`
