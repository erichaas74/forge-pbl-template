# Rotatable exhibit objects

The exhibit serves the four supplied GLBs from `public/exhibit-hall/models/` through Angular's standard public asset pipeline. These are byte-for-byte copies of the originals in this directory; no geometry or textures were generated or edited. The public URL remains `/exhibit-hall/models/`. The ZIP, USDZ, and original GLBs remain source files here. No additional asset mapping is needed. Restart a stale development server once after this change so its asset inventory includes the new directory.

## Format and size recommendation

Use **glTF 2.0 binary (`.glb`)** for this browser exhibit: one file contains the geometry, materials, and textures. Keep USDZ only as an optional future iPhone/iPad AR asset; it is not a browser-viewer replacement for GLB. See the [model-viewer format documentation](https://modelviewer.dev/examples/loading/).

For this school application, aim for **2–5 MB per model**, approximately **50,000–100,000 triangles**, and **1024–2048 pixel textures**. These are practical budgets, not format limits. Up to 10 MB is reasonable for a detailed object loaded on request. Measure on the actual student Chromebooks before adopting a larger budget. Dimensions in meters do not materially determine download size; mesh density and textures do.

| Supplied model | File size (decimal MB) | Triangles | Recommendation |
| --- | ---: | ---: | --- |
| Temple of Horus | 3.93 | 31,255 | Good download size; 200 meshes may benefit from fewer draw calls. |
| Nefertiti’s bust | 7.19 | 100,000 | Usable on request; optimize textures toward 5 MB. |
| Coffin of Ankh-Khonsu | 8.29 | 121,386 | Usable on request; aim for 5 MB and simplify if needed. |
| Mummy cartonnage and coffin | 26.34 | 634,144 | Highest priority for a smaller web export; aim for 5–10 MB and 100,000–150,000 triangles while inspecting detail loss. |

All four supplied files are self-contained glTF 2.0 binaries, about 45.75 MB combined. The viewer library and each model load only after a visitor selects **Load 3D object**. The library is a separate lazy chunk (about 236 KB estimated compressed transfer in the initial production build). Rotation does not auto-play. Camera state stays local and is never written to student records. Asset loads are shared through the viewer/browser caches.

For future optimized exports, remove unused data, reduce oversized textures, and simplify meshes with a visual comparison to the originals. Draco geometry and KTX2 textures are supported by model-viewer, but introduce decoder requirements; benchmark and self-host decoders if offline operation is required. Current files do not require those decoders. Keep the supplied originals intact. Do not export OBJ/STL for this textured browser workflow.

## Integration and content

`MuseumBoardObject.model` is an optional backwards-compatible extension to the existing museum-board renderer. It includes a GLB URL, accessible description, byte size, creator, source URL, and license. The notebook adapter preserves it, validation rejects malformed model metadata, and legacy image boards continue to render. Project content advances to `2.2.0`; previously published snapshots are not rewritten.

Four wings compare thematic pairs from the four supplied models (eight labels total). The corridor and walk-up views use the same reusable model component. Generated artifact pictures are no longer referenced by these exhibit collections. Source credits come from each GLB’s embedded `asset.extras`; all four declare CC BY 4.0. The temple is explicitly described as a game-ready reconstruction. The model records are linked rather than presenting invented archaeological provenance.

The viewer supports drag/touch, keyboard orbit controls, left/right buttons, reset, loading feedback, and retry. Descriptions and sources remain readable when WebGL or an asset fails. Tests cover opt-in loading, input changes during loading, errors/retry, metadata preservation, validation, all four supplied assets, and legacy compatibility.

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
