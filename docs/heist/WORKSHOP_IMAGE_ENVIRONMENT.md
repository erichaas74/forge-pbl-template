# Canoe workshop image environment

The canoe workshop uses the field's existing optional image environment capability. A spherical shoreline backdrop surrounds the inspectable 3D canoe, rim and stone tool. A three-metre repeating sand and wood-shaving texture covers ENV_ground. Ground radius extends to 80 metres, past the camera's far plane, to avoid a visible platform edge. No shared runtime changes were needed.

## Assets and provenance

Built-in image-generation mode, using `public/projects/shadow-gallery/coastal-360-v1/canoe.png` as the inspected reference. Final assets are saved in the project:

- `public/projects/shadow-gallery/coastal-3d-v1/workshop-background-v1.png`
- `public/projects/shadow-gallery/coastal-3d-v1/workshop-ground-v1.png`

AI-generated illustrative reconstructions, not archaeological photographs. The background removes foreground people and canoe so they do not duplicate the inspectable geometry. Images were inspected individually. Exact spherical seam quality and the combined 3D scene still need browser visual review; computer-control runtime could not initialize in this environment.

## Final prompts

Background:

> Use case: precise-object-edit. Asset type: seamless 2:1 equirectangular 360-degree background for a Three.js canoe inspection scene. Input image is the edit target and painting style reference. Preserve its warm realistic painted Caribbean shore, blue sea, distant green mountains, thatched wooden shelters, native palms, daylight and horizon at the vertical midpoint. Remove ALL people, canoes, paddles, foreground stumps, foreground baskets and foreground tools. Clear a broad sandy workshop space in the foreground; the application supplies the actual 3D canoe and tools. Set shelters back from this empty space. Replace banana plants with low native-looking tropical shrubs. The historical setting is Hispaniola before European arrival in early 1492. No metal objects, nails, screws, horses, wheat, modern objects, text or watermarks. Full spherical projection with sky zenith, ground nadir and matching left/right seam, not an ordinary flat wide-angle photo. Fine natural painted detail.

Ground:

> Use case: historical-scene. Asset type: seamless square repeating ground albedo texture for a Three.js canoe workshop. Reference image supplies only painting style and warm sandy earth color. Generate an orthographic straight-down view of dry beige sandy compacted soil with a modest irregular scatter of small pale wood chips, curled wood shavings, tiny stones and occasional dry leaf fragments. Natural variation, no obvious repeating motif or central feature. Uniform soft neutral lighting; no baked shadows, no horizon, no perspective, no vignette. Seamless on all four edges. No people, canoe, tools, metal, footprints, text or watermark. Detailed realistic painted surface matching the reference, usable as a three-metre square ground tile.

## Verification

30 tests across 7 spatial-inspection and panorama files passed. Isolated production preview build passed. Logs: `output/spatial-foundation/workshop-images-tests.log` and `workshop-images-build.log`. Preview bootstrap starts in the canoe workshop at `http://127.0.0.1:4369/projects/shadow-gallery/experience?lesson=1`; this is the isolated real-component preview, not the full weekly application shell. No deployment or other project's source changes.
