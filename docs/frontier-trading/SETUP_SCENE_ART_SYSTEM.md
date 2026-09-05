# Frontier Trading setup scene art system

**Release:** 1.7.0  
**Purpose:** make company setup feel like the opening screen of the same game world as the market and route map.

## Layer contract

The raster background supplies the sunrise, trading settlement, river, forest, mountains, trail, lighting, and atmosphere. It does not contain company names, transport choices, prices, instructions, or other game state.

The Angular layer supplies:

- the currently selected live wagon or transport illustration;
- the editable, randomly prefilled animal company name;
- the new-animal-name control;
- emblem and transport selection states;
- starting cash, transport cost, remaining money, focus, validation, and start action.

`SimulationWorldDefinition.setupSceneAsset` and `SimulationDecisionConfig.companyNameSuggestions` are optional. Projects without them retain the reusable SVG setup background and an empty company-name field.

## Production asset

| Asset                  | Use                                                     |
| ---------------------- | ------------------------------------------------------- |
| `company-charter.webp` | Full-bleed 5:4 prologue beneath the live setup overlays |

The optimized WebP is stored in `public/frontier-trading/setup-scenes/`. The original ImageGen output remains in the Codex generated-images directory.

## Prompt set

The image was generated with built-in ImageGen using the existing town and route-map artwork as references. The prompt requested:

- a landscape 5:4, semi-realistic hand-painted historical adventure-game scene;
- dawn outside a timber frontier trading settlement, with a river, forest, distant mountains, and a trail leading into the game world;
- open lower-right foreground for the live wagon overlay and clear lower-left contrast for the live badge;
- no wagon, people, animals, text, letters, numbers, signs, logos, watermark, UI, prices, routes, destination pins, compass, or baked gameplay state.

## Random company names

Animal names live in project configuration. One suggestion is selected when the setup component is created. The name remains ordinary editable input and passes through the existing domain validation when the student starts the company. The refresh control only changes the draft field; it does not start or save a company.

## Replacement rule

A replacement background should keep the 5:4 framing and the open lower-right overlay zone. Keep all instructions and game data out of the image. Verify the live transport remains readable on desktop and mobile, then keyboard-check the name, emblem, transport, and start controls before publishing a new project version.
