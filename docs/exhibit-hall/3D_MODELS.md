# Rotatable exhibit objects

The exhibit serves the three supplied GLBs from `public/exhibit-hall/models/` through Angular's standard public asset pipeline. These are byte-for-byte copies of the originals in this directory; no geometry or textures were generated or edited. The public URL remains `/exhibit-hall/models/`. The ZIP, USDZ, and original GLBs remain source files here. No additional asset mapping is needed. Restart a stale development server once after this change so its asset inventory includes the new directory.

## Format and size recommendation

Use **glTF 2.0 binary (`.glb`)** for this browser exhibit: one file contains the geometry, materials, and textures. Keep USDZ only as an optional future iPhone/iPad AR asset; it is not a browser-viewer replacement for GLB. See the [model-viewer format documentation](https://modelviewer.dev/examples/loading/).

For this school application, aim for **2–5 MB per model**, approximately **50,000–100,000 triangles**, and **1024–2048 pixel textures**. These are practical budgets, not format limits. Up to 10 MB is reasonable for a detailed object loaded on request. Measure on the actual student Chromebooks before adopting a larger budget. Dimensions in meters do not materially determine download size; mesh density and textures do.

| Supplied model | File size (decimal MB) | Triangles | Recommendation |
| --- | ---: | ---: | --- |
| Temple of Horus | 1.23 | 31,255 | Optimized from 3.93 MB. 200 meshes may still benefit from fewer draw calls. |
| Nefertiti’s bust | 3.27 | 100,000 | Optimized from 7.19 MB, within the 2–5 MB budget. |
| Coffin of Ankh-Khonsu | 2.90 | 121,386 | Optimized from 8.29 MB, within the 2–5 MB budget. |

The mummy cartonnage and coffin model (26.34 MB, 634,144 triangles) was removed from the exhibit and is no longer deployed; it exceeded the App Hosting source-bundle budget and no optimized export was available. The wings that used it now show the Coffin of Ankh-Khonsu. The original source GLB remains in this directory as an unshipped reference for a future optimized export.

All three files are self-contained glTF 2.0 binaries, about 7.39 MB combined (19.41 MB before optimization). The viewer library and each model load only after a visitor selects **Load 3D object**. The library is a separate lazy chunk (about 236 KB estimated compressed transfer in the initial production build). Rotation does not auto-play. Camera state stays local and is never written to student records. Asset loads are shared through the viewer/browser caches.

These files are optimized exports, reproduced from the Sketchfab originals with:

```
npx @gltf-transform/cli optimize <in>.glb <out>.glb \n  --compress quantize --texture-compress webp --texture-size 1024 --simplify false
```

Geometry is untouched — vertex counts are identical to the originals (364,158 / 300,000 / 93,765 rendered vertices); the savings come from vertex quantization and WebP texture encoding. `--simplify false` is deliberate: mesh decimation trades away surface detail that visitors are asked to inspect closely.

The exports declare `KHR_mesh_quantization` and `EXT_texture_webp` in `extensionsRequired`. Both are handled natively by three.js/model-viewer with **no external decoder to fetch or self-host**, so offline operation is unaffected. This is why quantization was chosen over Draco or Meshopt, which are smaller still but pull in a decoder. Keep the supplied originals intact. Do not export OBJ/STL for this textured browser workflow.

## Integration and content

`MuseumBoardObject.model` is an optional backwards-compatible extension to the existing museum-board renderer. It includes a GLB URL, accessible description, byte size, creator, source URL, and license. The notebook adapter preserves it, validation rejects malformed model metadata, and legacy image boards continue to render. Project content advances to `2.2.0`; previously published snapshots are not rewritten.

Four wings draw on the three supplied models: three compare a thematic pair and the afterlife wing presents the coffin on its own (seven labels total). The corridor and walk-up views use the same reusable model component. Generated artifact pictures are no longer referenced by these exhibit collections. Source credits come from each GLB’s embedded `asset.extras`; all three declare CC BY 4.0. The temple is explicitly described as a game-ready reconstruction. The model records are linked rather than presenting invented archaeological provenance.

The viewer supports drag/touch, keyboard orbit controls, left/right buttons, reset, loading feedback, and retry. Descriptions and sources remain readable when WebGL or an asset fails. Tests cover opt-in loading, input changes during loading, errors/retry, metadata preservation, validation, all three supplied assets, and legacy compatibility.

The opening spotlight now compares Nefertiti’s bust with the Coffin of Ankh-Khonsu, and its mission view uses the temple model. Introduction media supports optional models alongside existing image/video content. The shared viewer and validated model contract live in `src/app/shared/media`, so opening plugins do not depend on the exhibit template. Intro content advances to `1.1.0` and the spotlight content to `2.0.0`. Existing introduction records and published snapshots remain intact.

No new runtime registry entry is needed: this is optional media in the registered museum-board renderer, not a separate project-specific renderer. No schema migration or new template capability gap is required. Recommended next step: produce and compare an optimized export of the 26.34 MB model on a representative student device.

## Change and verification record

- Added: shared model contract, shared viewer component and its four behavior tests; Egyptian model catalog; two museum model contract tests; this guide.
- Modified: Angular asset configuration and model-viewer dependency; museum object contract, adapter, validator, corridor, board, and composer hint; project version, model collections, completed-sample labels and curator records; introduction model contracts, shared opening media, decision scene, project opening, and museum spotlight content. Updated existing component and sample tests for the new collections.
- Production Angular build passes, including strict template/type compilation. Existing stylesheet budget warnings remain.
- 63 tests pass across 15 files covering exhibit, shared media, introduction runtime, opening scenes, and completed samples.
- Browser verification: all four GLBs rendered; rotation controls changed the viewing angle; wing changes displayed the correct collections; the opening scene displayed model choices without generated artifact pictures.
- The repository-wide architecture check still reports two unrelated existing violations: `core/index.ts` imports `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` is a service in project content. No violation was introduced by the model integration.
- No original GLB, USDZ, or ZIP was modified. No deployment was performed. The fresh local preview runs on port 4201; an older server on port 4200 must be restarted to read the new asset mapping.

### Loading repair (2026-09-05)

- Reproduced a 404 and the viewer's recoverable error using the smallest supplied object, Temple of Horus (3,925,980 bytes), on `localhost:4200`. The preview on port 52818 also returned 404; ports 4201 and 4202 already served the model.
- Added four unchanged GLB copies under `public/exhibit-hall/models/`, removed the separate GLB mapping from `angular.json`, and updated the catalog comment and this guide. Existing model URLs and shared viewer behavior remain compatible; originals remain intact.
- Restarted the two stale preview processes on their existing ports. All four model URLs now return HTTP 200 with the expected byte lengths on ports 4200, 4201, 4202, and 52818.
- Verified the temple visibly renders in the completed sample and loads in the Student experience on port 4201; it remains loaded when switching to Family and Teacher previews. Verified all public and production-build GLBs match the original SHA-256 hashes. Production Angular build passes with existing stylesheet budget warnings; six existing viewer and model-contract tests pass. No tests or runtime contracts changed, no specification deviation or new capability gap was introduced, and no deployment was performed.
- Next check: refresh the open previews and inspect the larger models on the target student device.
