# Field image environment

The field now uses a spherical image backdrop and a tiled soil image on the floor and planting mounds. 3D crops remain directly inspectable. The field opts into the optional `SpatialInspectionDefinition.environment` configuration; the canoe now uses the same capability with its own workshop images (see `WORKSHOP_IMAGE_ENVIRONMENT.md`). Ground geometry extends past the viewable area so the previous circular platform edge does not bound the crops.

Final project assets:
- `public/projects/shadow-gallery/coastal-3d-v1/field-background-v1.png`
- `public/projects/shadow-gallery/coastal-3d-v1/field-soil-v1.png`

Both were generated with the built-in image-generation tool, using `coastal-360-v1/harvest.png` as the reference, and inspected as images. Originals remain in the generated-images directory. Neither is an archaeological photograph. Browser visual acceptance of the combined 3D scene remains pending because the computer-control runtime still fails to initialize.

## Final prompts

Background:

> Edit this image into the backdrop for a 3D historical crop inspection. Keep its painted-realistic style, warm soil palette, distant Taíno village, green hills, blue Caribbean sea and sky. Preserve full 360x180 equirectangular projection, 2:1 aspect ratio, horizon at halfway and matching left/right wrap. Remove the large foreground woman, baskets, foreground crops and fences from the central clearing, leaving uninterrupted earth in the immediate foreground for separately rendered 3D crops. Distant maize gardens and simple thatched houses may remain. No close people or objects. No wheat, no modern equipment, no text. Natural Caribbean native palms and vegetation; no banana plants. Scene early 1492 Hispaniola, illustrative reconstruction. Output one clean spherical background image.

Soil:

> Use this reference ONLY for its warm painterly-realistic soil colors and texture. Generate a new square seamless tileable ground albedo image for a 3D Caribbean crop field. Camera is perfectly straight down, orthographic, entire frame is warm brown cultivated earth with fine soil clods, tiny pebbles, a few sparse dry leaves and plant fragments. Subtle natural variation, no prominent objects, no crops or plants, no people, no basket, no tools, no horizon, no text, no baked directional shadows, no vignette. Soil should look like the ground in the reference painting, with dark brown earth and warm sandy patches. Seamless all four edges. It will be repeated on the floor beneath separately rendered maize and sweet potato plants.

## Engineering checks

Optional environment validation restricts image paths to project assets and requires a declared environment-node binding. The loader uses sRGB color textures, equirectangular background mapping, repeat wrapping, and planar ground UVs with a three-metre repeat. Existing ground material maps/colors are restored on cleanup; both generated textures are disposed. Partial failures and late cancellation dispose completed loads.

The isolated production preview build passed in 7.195 seconds (`output/spatial-foundation/field-images-build.log`). Relevant test results are recorded in `field-images-tests.log`. No full application build or classroom visual approval is claimed in this update.
