# Coastal scene: spherical viewer upgrade

Next build direction: [Coastal 3D build rulebook](COASTAL_3D_BUILD_RULEBOOK.md). Its first implementation step adds asset-loading contracts and tests without replacing this panorama experience.

## Clickable places follow-up

The village now contains two angularly anchored place buttons: canoe workshop (-108°, -9°) and harvest garden (108°, -9°). Each opens the existing, separately generated detailed spherical image. Both detailed views contain a return-to-village marker. Markers are projected through the current camera and hidden behind the camera/outside its view; dragging does not activate them. Keyboard users can activate the markers or use the persistent viewpoint navigation. No interviews were added.

Validation rejects missing/self destinations and invalid angular positions. Twelve panorama tests in three files passed using the isolated test configuration (`output/shadow-places-isolated-tests.log`). The isolated Angular component build passed. Browser checks traversed both outbound and return routes and verified a phone-sized marker click with no horizontal overflow.

The full application build/test attempt was blocked by concurrent unrelated errors: missing `calendar-monument.quests`, and `focus` not present in `BalanceSceneCallbacks`. These files were not modified. Consequently port 4369 currently serves a standalone preview of the actual spherical component rather than the full weekly workspace. Temporary entry/config files are in `output/place-preview/`; build with `ng build --browser output/place-preview/main.ts --ts-config output/place-preview/tsconfig.json --output-path output/shadow-coastal-build`. The changes are also wired into the real project's scene configuration for the next successful full build.

This supersedes the horizontal panorama and scene question UI described in COASTAL_PANORAMA_IMPLEMENTATION.md. Only shadow-gallery enables the new optional configuration. No deployment or dependency changes.

## Implemented

Three connected viewpoints: village clearing, canoe workshop, harvest garden. An inward-facing Three.js sphere renders 2:1 equirectangular textures with full horizontal rotation, vertical viewing, zoom, keyboard controls, and a fullscreen request. Rendering is on demand. Textures and WebGL resources are disposed on exit. Failed image loads have a flat-image fallback; denied fullscreen leaves the spherical scene active.

Clicking a visible person uses raycast texture coordinates to select that person for the AI Tutor box. Accessible person buttons offer the same action. Viewpoint, yaw, pitch, zoom and selected person persist in the existing scoped draft. Scene question buttons and chat forms are hidden by `questionOwner: 'tutor'`. The AI Tutor remains explicitly disconnected: no interview or video generation is claimed. The painting retains its three independent repairs and source/exhibition tools.

## Online implementation references

- [Three.js inward sphere example source](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_panorama_equirectangular.html): technique used in the independently authored Angular viewer.
- [Photo Sphere Viewer virtual tours](https://photo-sphere-viewer.js.org/plugins/virtual-tour.html): linked panorama nodes and angular positions.
- [Pannellum tour example](https://pannellum.org/documentation/examples/tour/): alternative connected-scene implementation.

Three.js was already installed. Skybox AI's generation UI required account signup, so no account or purchase was created. The built-in image generator produced these assets instead.

## Generated assets and prompt record

Final files in `public/projects/shadow-gallery/coastal-360-v1/`: `village.png` (2,979,674 bytes), `canoe.png` (3,263,965 bytes), `harvest.png` (3,243,564 bytes).

Prompt specification: full 360-by-180-degree equirectangular panorama, 2:1 aspect ratio, matching left/right edges, complete sky and ground, eye-level viewpoint, realistic painted historical reconstruction of Hispaniola in early 1492 before European arrival. No text, UI, modern equipment or intended forgery details. Village: coastal clearing with sea, homes, canoe work to the left and harvest activity to the right. Canoe: adult builder shaping a hollowed single-log canoe with stone/shell tools, natural materials, shore nearby. Harvest: adult grower sorting manioc roots and maize beside cultivated gardens. No horses, wheat, iron fasteners, or motor in the historical world.

These generated images are review assets, not historically verified source evidence. Browser inspection found softness at zoom and pinching near sky/ground poles. Botanical details and continuity between independently generated viewpoints still need art/historical review before classroom release. The viewpoints are spherical photographs/illustrations, not traversable 3D geometry.

## Verification

- Focused suite: 41 tests in 10 files passed (`output/shadow-360-tests.log`). Includes state/config validation, spherical direction math, no scene question controls, and prior restoration/exhibition regressions.
- Production build passed (`output/shadow-360-build.log`), including a subsequent fullscreen fallback fix. Existing unrelated style-budget warnings remain.
- Chrome: inspected rear seam, sky and ground; all three textures rendered; direct body clicks selected both characters; zoom and selected-person/viewpoint persisted through reload; no question form appeared in the scene. Fullscreen was denied in this environment and verified to leave rotation usable after the fix.
- Phone 390×844 and tablet 768×1024 had no horizontal document overflow. Viewport override reset. Scoped diff whitespace check passed.

Local preview: http://127.0.0.1:4369/projects/shadow-gallery/experience?lesson=1

Serve with `node docs/heist/preview-coastal-scene.mjs` after building to `output/shadow-coastal-build`. Content is reproducible with `node docs/heist/configure-coastal-panorama.mjs`.
