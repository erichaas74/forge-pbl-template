# Heist verification — 2026-09-11

The sections below record the original prototype. For the subsequent raster-art upgrade, 33-test result, Chrome success/replay verification, and in-app browser limitation, see [VISUAL_UPGRADE_HANDOFF.md](VISUAL_UPGRADE_HANDOFF.md).

## Passed

- **26 tests across 5 files**: Heist domain (15), persistence/runtime (4),
  component controls (2), project catalog (1), template registry (4).
- Production Angular build with strict template checking, using
  `node node_modules/@angular/cli/bin/ng.js build --output-path=.angular/heist-production`.
  A separate output folder avoids interference from concurrent project builds.
- The production entry bundle remains approximately 289 kB; Phaser is a shared
  lazy chunk. Other project styles still produce existing budget warnings.
- Browser end-to-end mission in the local preview at port 4215:
  - map artwork, three guards, patrol previews and overlays render;
  - keyboard-accessible location controls measure a 9 cm / 90 m segment;
  - field measurement and all route/capacity/gate calculations verify;
  - the plan remains locked out while required evidence is incomplete;
  - an 8-second market wait appears on the timeline;
  - automatic execution reaches pickup and pauses at 215 seconds;
  - incorrect crisis answer produces a hint and leaves responses unavailable;
  - correct 63 kg answer still rejects the overloaded damaged cart;
  - team carrying changes the revised schedule and reaches extraction at 407.8 s;
  - original prediction is 348.33 s, with a 59.5 s actual difference displayed;
  - replay jumps to the crisis at the archive, uses the revised route afterward,
    and resets the target indicator correctly when rewound before pickup;
  - a clean reload restores the completed run and mathematical attempts;
  - the map renders at 1024 × 768; viewport restored afterward;
  - the QA run was reset to leave the prototype ready for a fresh plan.

Focused test command:

```powershell
$env:NG_BUILD_MAX_WORKERS='2'
node node_modules/@angular/cli/bin/ng.js test --watch=false --include='src/app/templates/heist/**/*.spec.ts' --include='src/app/projects/project-catalog.spec.ts' --include='src/app/runtime/local-template-registry.spec.ts'
```

The component tests inject a map loader and mock the external `phaser` package:
Angular's unit-test bundler flattens lazy imports, while jsdom does not implement
canvas. Actual Phaser rendering and interactions were checked in the browser.

## Broader repository checks and limits

- Adding `src/app/runtime/project-launch/project-host.component.spec.ts` to the
  broader run fails before its tests execute: Phaser probes canvas during import,
  but jsdom's `HTMLCanvasElement.getContext()` returns null. Its test environment
  needs the same canvas-dependency isolation. The 24 domain/runtime/catalog/registry
  tests in that run still passed. No host tests were removed or weakened.
- `npm run test:architecture` reports two violations outside this change:
  `core/index.ts` importing `./templates`, and
  `projects/mystery-substance/lab-kit/render-quality.service.ts` as project-specific
  service code. Heist adds no listed boundary violation.
- An initial production build into the default shared `dist` directory compiled
  successfully but failed while copying a history-live image. Building into the
  isolated `.angular/heist-production` directory resolved the output collision.
- No deployment, official-attempt backend, classroom multiplayer, grading, audio,
  or physical Chromebook performance benchmark was performed. The current release
  is explicitly local practice with replaceable vector prototype art.
- During development, Angular template hot replacement can remove Phaser's canvas;
  a clean page reload remounts it and restores the saved practice. Normal application
  navigation destroys and recreates the renderer through the component lifecycle.

## File summary

Added: reusable `src/app/templates/heist/` engine/runtime/renderer/UI and three test
files; Heist launcher; two JSON mission packages and SVG maps; build/handoff docs.

Modified: project catalog and catalog test; template registry and registry test;
lazy launcher registry. Concurrent edits to these shared files were preserved.
No core contracts changed, and Heist did not change the Phaser dependency version
or any trading simulation implementation files.

See `BUILD_PLAN.md` for architecture, prototype deviations, the official-attempt
capability gap, and the recommended next phase.
