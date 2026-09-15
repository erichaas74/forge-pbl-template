# Coastal historical investigation — Three.js + glTF build rules

Step 2 update: [Canoe workshop inspection build](COASTAL_WORKSHOP_INSPECTION.md) now records the authored GLB, actual geometry inspection and bounded camera movement. Browser visual acceptance remains pending because computer-control tools cannot initialize.

Status: step 1 engineering foundation. This replaces the supplied generic optimization rulebook for this build. Follow PROJECT_ACTIVITY_RULES.md and repository engineering rules. Scope: shadow-gallery, first coastal scene only. Do not replace other projects or enable an unfinished student scene.

## Experience and first visual milestone

Keep the forged painting as the investigation's starting/return object. It has three deliberate inconsistencies: horses, iron nails/screws repairing the canoe, and wheat in the harvest. The historical world represents Hispaniola before European arrival in early 1492 and contains none of those intentional errors. Generated or modeled scenery is a reconstruction, never primary evidence; source inspection must remain available.

Options considered: an entirely walkable village, a panorama with 3D close-up stations, or a single detailed 3D workshop. Start with the workshop; it proves object inspection and camera movement before multiplying asset work. A surrounding panorama may remain as distant scenery, but nearby inspectable objects must have actual geometry.

First visual milestone: click the canoe workshop, approach along a bounded camera path, orbit the dugout, select a stone/shell tool and rotate it, then return. Show construction details that let learners compare the painting with evidence; selecting an object does not automatically reveal a forgery answer or count as mastery. Brief labels identify objects and controls. Inspection should expose another angle or construction detail, not open an essay. No free walking/collision system is needed initially.

Later milestone: a historically reviewed, rigged adult builder performs a carving action, pauses and turns toward the learner. Interviews stay in the separate AI Tutor area and remain disconnected until explicitly implemented. No fake video player, idle mannequin, or unverified animation is a finished media deliverable.

The main panel is the scene, with only operating controls. Tasks/products go above the tutor in the side column. No extra title/instruction/status bands above or below the activity. Preserve shared shell/standards. All weeks and scenes remain directly accessible during testing. Keyboard target selection, orbit buttons, focus indicators, touch targets and reduced-motion camera movement are required.

## Asset and configuration contract

- Runtime capability target: `spatial.inspection.v1`. Step 1 implements its asset foundation only; host registration and scene UI follow when a suitable asset passes review.
- Use a versioned manifest for local asset paths, required semantic bindings and animation roles. Project names and historical content belong in configuration, never generic loader branches. Reject malformed paths, missing/duplicate names, incorrect node types and absent clips before mounting.
- Authored semantic objects use ENV_ (surroundings), INT_ (inspectable mesh/group), RIG_ (animation root), SOCKET_ (empty camera/placement anchor). Internal exporter children/bones need not be renamed if they are not public bindings. Required names must be unique within the selected scene. Targets must actually contain geometry; sockets must be empty leaf objects.
- Units are meters, Y is up; validate bounds/origin and facing during asset review. Preserve imported local transforms and animation bindings. Move a wrapper pivot for placement; moving the camera is allowed. Do not reparent bones or mutate animated roots to compensate for bad export data.
- Require asset provenance, license, revision and historical review before visual release. Never reuse another project's artifact merely because it loads. Reviewed canoe geometry and a suitable builder are currently missing.

## Loading and ownership

Use GLTFLoader for glTF/GLB assets. Draco and KTX2 are optional, enabled only for assets that use them with configured local decoders. KTX2 support must be detected against the active renderer. Do not download decoder code from an arbitrary CDN. Step 1 supports uncompressed GLB; compressed files are deferred until decoder assets and tests exist.

Trust GLTFLoader's glTF material/color handling. For separately authored textures, base color/emissive are sRGB; normal/roughness/metalness data are NoColorSpace. Do not blanket-change every texture or overwrite a shared texture's color space.

One mounted asset owns its scene resources. Deduplicate shared geometry, material, texture and skeleton disposal. Stop/uncache mixers before releasing resources; close owned ImageBitmaps. Abort/stale loads must dispose their late results. A logical abort does not promise cancellation of GLTFLoader's underlying request. Renderer, render targets, workers, observers and controls have separate host ownership. Future shared caches need reference counting, not unconditional recursive disposal.

## Animation behavior

Keep camera travel and character animation as separate state machines. Character states will be working, attending, returning; interviews do not drive arbitrary clip names. Configure named clips to AnimationActions with validated transitions. Use LoopOnce and clamping only when a completed pose should remain. Working loops repeat. Cross-fade compatible poses; test the final pose, tool contact, feet and transitions visually. Cross-fades cannot fix mismatched rigs, root motion or clipping.

Do not rely on undocumented mixer.stats or claim automated metrics prove zero clipping. Do not stop a causally significant action merely because the character is offscreen. Decorative animation may pause if its resume policy is defined. Reduced motion skips camera travel without changing the investigation's state.

## Performance and bounded optimization

Initial engineering budgets: target <=50 draw calls, ceiling 60; <=150,000 rendered triangles; <=1 shadow-casting light initially (2 maximum). Measure renderer.info in the real scene, including shadow/multipass overhead; file mesh count is not a draw-call measurement. These limits are targets to verify, not results already achieved.

Profile a repeatable 30-second inspection route after loading/warmup on named school hardware and mobile viewport. Record p50/p95/p99 frame interval in milliseconds, viewport, device pixel ratio, renderer/version and quality tier. Aim for 60 fps on the reference desktop and stable 30 fps on lower-end devices; 16.7 ms cannot be a universal browser guarantee. Exclude hidden-tab and loading samples. JS frame interval is not GPU execution time. Optional GPU timers need support/disjoint checks.

Measure curated interaction-target raycasts separately; target p95 <=4 ms on reference hardware. Preserve mesh-to-evidence identity. No invented batching percentage. Release requires both measured performance and human visual review.

Runtime adjustment may lower pixel ratio or optional shadows after sustained poor performance, with hysteresis and a fixed number of quality tiers. Never continually rewrite geometry/materials at runtime. Merge/instance compatible static assets offline only after preserving transforms, interaction identity, materials and culling. Do not hide evidence or change learning state for performance. Pause rendering when hidden; render on demand when no animation is active.

## Build sequence and acceptance

1. Implement and test manifest validation, GLB hydration, semantic binding and resource ownership. No student route replacement. **This task.**
2. Acquire/author the canoe workshop assets with provenance; validate real bounds, textures and close-up detail. Build the reusable inspection renderer and configuration-selected host. Review this first scene with the user.
3. Add camera approach/return, direct object selection and keyboard inspection; test meaningful visible consequences and scoped saved state. No per-frame persistence.
4. Add reviewed character rigs/clips and visually verify activity-to-greeting transitions. Interviews remain deferred.
5. Profile and optimize on actual reference devices; then review before extending to the garden or another project.

Each step reports what exists and what remains. Automated tests establish contracts, not artistic quality. Do not mark missing models, unfinished video, unmeasured performance or a working loader as a complete 3D experience.

## Step 1 implementation record

Added `src/app/shared/spatial-inspection/spatial-asset.contract.ts`, `spatial-asset.ts`, `spatial-asset.loader.ts`, and `spatial-asset.spec.ts`. The versioned manifest validator, lazy GLTFLoader transport, semantic binder, placement wrapper and exclusive resource owner are implemented. Seven tests pass, including an actual GLTFLoader parse of test-only geometry, malformed paths/names, geometry/socket/clip rejection, duplicate bindings, shared-resource disposal and late cancellation. Strict TypeScript compilation passes. This test geometry is never mounted in the student application.

No existing scene, project configuration, package dependency or shared host was changed in step 1. No browser visual acceptance or performance result is claimed for a scene that is not built yet. Clips are validated and exposed as asset data only; a future animation controller will own AnimationActions and mixer lifecycle. Asset requests use logical cancellation with disposal on late arrival, not physical network abort.

TEMPLATE_CAPABILITY_GAP: the current panorama renderer cannot provide real geometry inspection or rigged animation. The planned reusable `spatial.inspection.v1` host/renderer will compose this foundation; it is not registered or advertised as installed yet. A reviewed canoe workshop GLB and animated builder are missing. Next phase is the first actual workshop asset and inspectable geometry, followed by user visual review. No placeholder character or unrelated existing GLB is substituted.

Verification logs: `output/spatial-foundation/tests.log` and `build.log`. Temporary isolated TypeScript/test configurations are under the same output directory. Tests do not establish historical accuracy, model quality, animation quality or device performance.

Full Angular production build also passed, with unrelated existing style-budget warnings. Build output is isolated at `output/spatial-foundation/app-build`; the previous preview output was not replaced.
