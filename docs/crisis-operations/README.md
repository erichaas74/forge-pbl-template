# Crisis Operations · First room

The crisis-operations@1.0 room runs at /projects/cascade-bay-crisis/experience; the project root uses the shared project invitation. This template contains the operations room and news → evidence → map → analysis → response loop. No lesson sets, final submission, or showcase was added to the room.

The left desk now opens an animated radar/satellite weather channel, and the right desk opens a familiar conference screen. See [Station screens](STATION_SCREENS.md) for behavior, project configuration, validation, generated assets and prompts, and the future live-meeting connection point.

Both stations now use larger, vertically centered targets and consoles built into the room artwork. See [Integrated workstations](INTEGRATED_WORKSTATIONS.md) for responsive layout, artwork alignment, validation, and the saved image prompt.

## Implemented experience

- Cinematic prerendered 3D room with live HTML/SVG monitor and table surfaces, six controlled views, keyboard shortcuts 1–6, Escape to return, optional alert tones, full screen, and reduced-motion support.
- The monitor camera pushes into the same four mounted screens visible in the room: telemetry with reading history, an inspectable field-camera still, a report wire with evidence pinning, and response capacity with a command link. The selected report or resource screen gains more space on the wall. Camera inspection survives moving away and returning.
- The situation table uses one persistent SVG surface. The room tilts while the table rises into an angled projection; river currents, the forecast boundary, location pulses, and assigned-order beacons animate in place. Motion illustrates scenario state and never advances time or claims that a dispatched action is complete. Surrounding controls select layers, zoom toward the selected location, inspect reports, and manage the shared briefing.
- Replaceable room and camera images. Camera imagery is explicitly an exercise still, with a fixed capture timestamp; timestamped reports supply current conditions.
- Three map layers: hazard, population, and response resources. Markers expose elevation, context, reports, and dispatched actions. The forecast footprint expands as bulletins arrive; it is a scenario visualization, not a hydrological model.
- Four configurable specialist stations. Reports are filtered by release stage and role. Read reports can be pinned to a bounded three-item briefing and shared between local station views.
- A confirmed road report, an unverified bridge-collapse rumor, telemetry, weather projections, bridge inspection, hospital logistics, and conditional response updates.
- Configured response orders with resource costs, time estimates, availability windows, explanatory tradeoffs, evidence attachments, and an operations log. Crews stay assigned for the exercise. Duplicate and unaffordable orders cannot spend again.
- ARGUS displays a scenario-authored assessment, uncertainty, response comparison, and a modeled risk adjustment. It does not call an LLM or claim to predict real emergencies.
- Four paced bulletins, manual advance, and opt-in automatic progression. A dispatched evacuation produces a different later field report from waiting.
- Device-local persistence with tenant, project, version, actor, and attempt scope. Reload restores the exercise. Reset has a dedicated confirmation dialog.

## Architecture and files

Scenario content lives in public/projects/cascade-bay-crisis/project.json, with versioned schema, room assets, monitor metadata, roles, evidence, action conditions, decisions, bulletins, and geographic paths. The package is validated and deeply frozen before use. All scenario names and wording belong in configuration.

The new src/app/templates/crisis-operations/ directory separates domain contracts, validation, event handlers, persistence, runtime signals, room graphics, the situation map, icons, and the focused consoles. Browser persistence implements an injected interface and reuses ScopedBrowserStore. Events reuse the core RuntimeEvent envelope and registered crisis.* handlers. Snapshots include a revision and a bounded 300-event audit trail; costs and decisions are in the snapshot, not reconstructed from that bounded log.

Registration uses both the existing template launcher registry and the generic local template registry. LocalCrisisOperationsRuntime adapts package validation to the existing ProjectTemplateRuntime contract. Core contracts and existing templates are unchanged. The catalog adds one direct entry and does not register a project intro.

Capability IDs: crisis.situation-map, crisis.evidence, crisis.decisions, crisis.analysis. Event IDs: crisis.bulletin.received, crisis.evidence.viewed, crisis.evidence.shared, crisis.evidence.unpinned, crisis.station.selected, crisis.decision.committed.

Existing files modified: projects/project-catalog.ts and its test, runtime/local-template-registry.ts and its test, runtime/project-launch/template-launcher.registry.ts. Added integration: runtime/local-crisis-operations-runtime.ts and runtime/project-launch/template-launchers/crisis-operations.launcher.ts. Other additions: the scenario package, public/crisis-center artwork, scripts/crisis-operations.spec.ts, and scripts/serve-crisis-preview.mjs. Pre-existing solar monument and host-header edits were preserved.

## Scope and capability gaps

The room uses a prerendered 3D image with perspective map surfaces and camera-like transitions (2.5D), not a Babylon/WebGL scene. There is no freely moving camera, skeletal character animation, video playback, teacher director, or networked team synchronization. ARGUS uses a transparent character sprite with bounded roaming and contextual interaction. Those are later phases from the rough guide and were not required for this first page. The initial map shell supports a coastal/watercourse scenario; its paths, labels, locations, roles, metrics, decisions, reports, and visuals are configurable.

There are no blocking TEMPLATE_CAPABILITY_GAP items for this local-room phase. Server-authoritative sessions fail explicitly with CAPABILITY_NOT_INSTALLED until shared persistence and transaction authority adapters exist. Switching local specialist stations demonstrates information distribution; it is not secure multi-user role assignment. Risk reductions are authored scenario estimates, not measured protection or completed rescue counts.

Recommended next phase: test the room with students, refine spatial placement and report readability, then add synchronized team sessions if requested. No later lesson or final-product workflow is implied.

## Validation

Run:

```powershell
npm run build
npx vitest run scripts/crisis-operations.spec.ts src/app/projects/project-catalog.spec.ts src/app/runtime/local-template-registry.spec.ts --config vitest.serial.config.mjs --globals
node scripts/serve-crisis-preview.mjs
npm test -- --watch=false --include=src/app/templates/crisis-operations/ui/crisis-surfaces.spec.ts
```

The focused suite has 22 tests across the scenario engine, generic package adapter, catalog, and existing registry compatibility. It covers validation, immutability, role and stage visibility, bounded evidence sharing, evidence-required orders, resource limits, idempotency, response windows, conditional later reports, scenario reuse, persistence validation, and scope isolation.

Three Angular surface regressions verify screen/map identity across camera moves, retained image inspection, evidence and crew updates across the instruments, projected-marker selection, and focus safety when a camera transition is interrupted. These run against a separate small scenario fixture to check template reuse.

Browser checks cover all six consoles, report review and pinning, evidence attachment and dispatch, changing crew inventory and map orders, conditional updates, restored state after reload, compact 390×844 layout, focus behavior, and accessible map markers.

The global architecture script reports two existing issues, both present in HEAD: core/index.ts exporting ./templates is matched by its broad path rule, and projects/mystery-substance/lab-kit/render-quality.service.ts is outside the script's allowlist. Neither file was changed. Production emits style-budget warnings (including the room shell under the existing 24 kB error threshold); do not increase the shared budgets to hide these.

## Artwork provenance

Both assets were created with the built-in imagegen tool and copied into the project. No remote runtime image dependency or API key is required.

- public/crisis-center/operations-room.png
- public/crisis-center/river-camera.png

Room prompt:

> Use case: stylized-concept. Asset type: full-screen background environment for an interactive emergency operations simulation, NOT a website or UI mockup. Create a spectacular, photorealistic AAA game environment of a compact contemporary emergency command center at blue hour. Wide landscape 16:9, perfectly symmetrical central camera, looking slightly downward from standing height. Sophisticated grounded NASA control room meets architectural visualization, dark graphite metal, charcoal acoustic wall panels, polished black floor with subtle reflections, atmospheric cyan light strips, restrained warm amber emergency lights. Back wall has three large widescreen monitors: dominant center monitor x36%-64%, y20%-42%; two smaller side monitors x15%-34% and x66%-85%, y24%-42%. The monitors display dark blue subdued abstract satellite terrain imagery WITHOUT any letters, numbers or interface. In the foreground, an imposing central rectangular holographic map table with a thin glowing cyan perimeter, heavy sculpted graphite chassis, the horizontal glass tabletop visible as a perspective trapezoid spanning roughly x29%-71% at y55%, expanding to x18%-82% at y81%. Tabletop is dark, subtle terrain contours and faint cyan grid only; it will receive an interactive map overlay. Two specialist desks and chairs in the far left and far right peripheral foreground, modest illuminated instruments. Small sleek white-and-dark analysis robot beside the table at the right, a compact head with cyan visor. Very subtle silhouettes of 2 operators at far peripheral back desks, no foreground people. Visible ceiling ribs and suspended lights frame the room; server racks on side walls. Balanced readable exposure, blue charcoal shadows with visible materials, realistic physically based reflections and depth, intricate expensive industrial design, cinematic volumetric illumination, luminous edges, crisp fine details. No text, logos, words, watermarks, HUD, floating panels, banners, website elements. This is a real spatial room viewed from inside, not a concept board, not a top-down diagram. Output 2048x1152 landscape.

Camera still prompt:

> Use case: photorealistic-natural. Asset type: fictional emergency exercise aerial camera still for in-world news monitor. Photorealistic cinematic helicopter view across a fictional Pacific Northwest river town after days of heavy rain, a wide swollen muddy river bending through evergreen foothills to a dark coastal bay, low slate storm clouds and rain haze, a concrete two-lane bridge crossing the river in the middle of the frame, orange emergency vehicles at the near bridge approach, flooded riverside park and low road, buildings safely standing on higher ground, some lights illuminated. Powerful documentary news helicopter photography, realistic detailed terrain and architecture, muted desaturated teal and blue-gray palette, amber lights, dramatic atmosphere but no injuries or casualties. Geographic clarity and believable scale, 16:9 landscape, 1536x864. No text, logos, overlays, HUD, watermark, borders or website interface. This depicts a fictional flood simulation.

## Direct room surfaces

### Project-specific workstations

The overview now has two physical foreground desks. Cascade Bay assigns River & weather to the left (Earth systems and Geography) and Field operations to the right (Operations and Command). Their monitor previews show current telemetry or free crews, plus unread signals. Selecting a desk opens its report workspace with only its assigned specialties. Reports in the dock still provides access to every role. Hover and keyboard focus light the desk bezel; Escape and Return to room restore the originating desk's focus. Desks become inert during other room views. Foreground desk layering keeps their names and click targets clear as ARGUS passes behind them.

An optional `workstations` array in `project.json` defines each desk's stable ID, name, description, side, role IDs, and instrument. For example:

```json
{
  "workstations": [
    {
      "id": "river-weather",
      "name": "River & weather",
      "description": "Track the river, forecast, and exposed routes.",
      "side": "left",
      "roleIds": ["earth", "geography"],
      "instrument": "telemetry"
    },
    {
      "id": "field-operations",
      "name": "Field operations",
      "description": "Coordinate field reports, crews, and critical services.",
      "side": "right",
      "roleIds": ["operations", "command"],
      "instrument": "resources"
    }
  ]
}
```

Up to two desks are supported, with unique IDs and sides (`left` / `right`), nonempty text, and a nonempty unique list of existing role IDs. Instrument choices are `telemetry`, `resources`, and `reports`; project-specific content and role definitions stay in the package. Omitted or empty workstations preserve the original station entry. This optional template field is backward compatible with existing 1.0 packages and snapshots; no core contracts or persistent-state schema change. Desk selection reuses the registered `crisis.station.selected` event. Preview counts combine released evidence from the desk's specialties and intentionally shared sources, respect conditional releases, and never change role, time, resources, or orders by themselves.

Added files: `domain/crisis-workstations.ts`, `ui/crisis-workstations.component.{ts,html,scss}`, and `scripts/crisis-workstations.spec.ts`. Modified files: crisis models/validation, center and console TS/templates, Cascade Bay's package, surface tests, and this document. The separate display component uses CSS perspective and live scenario readings; no generated bitmap controls or project-name branches. Five domain tests cover compatibility, validation, visibility, conditional/shared reports, and an alternate scenario configuration. Three Angular regressions cover both desks, scoped specialty selection, correct native selector values with dynamic options, shared evidence, unchanged resources/time, fallback navigation, and keyboard return (14 surface tests total).

Validation for this change: production build passed with existing stylesheet budget warnings; 32 domain/integration tests and 14 Angular surface tests passed. Browser checks cover desktop and phone sizing, both desk entries, hover/focus styling, and report access. No specification deviations or blocking `TEMPLATE_CAPABILITY_GAP` items. The next project can provide its own desk names, specialties, and instruments; substantively different new instruments should extend the reusable display capability with validation and tests.

```powershell
npx vitest run scripts/crisis-workstations.spec.ts scripts/crisis-companion.spec.ts scripts/crisis-operations.spec.ts src/app/projects/project-catalog.spec.ts src/app/runtime/local-template-registry.spec.ts --config vitest.serial.config.mjs --globals
npm test -- --watch=false --include=src/app/templates/crisis-operations/ui/crisis-surfaces.spec.ts
```

### Simplified layouts

Command now shows one task at a time: response list, response review, or dispatched orders. A small crew count remains visible, future orders are collapsed under awaiting updates, and the review keeps resource cost, tradeoff, evidence selection, and one dispatch action together. Empty review columns and repeated hero headings are removed. The command panel is a separate reusable component; persistent mutations still go through CrisisRuntimeService. It retains the selected response while the operator visits their station to find a report. Evidence remains explicitly selected and validated before dispatch.

The station uses the same list-to-detail flow, with an All reports control to return. Room chrome uses a smaller dock and fewer repeated labels, leaving the physical table, monitors, and companion prominent. Shared evidence and location panels retain their underlying capabilities. Two additional Angular regressions cover the simplified dispatch/evidence path and report navigation with response retention (11 surface tests total). No project schema or runtime event changes are required.

The catalog now uses `entryMode: opening`, following the September 8 request for a single launch page across all templates. Its root URL shows the shared project invitation; **Start Project** opens the operations room at `/projects/cascade-bay-crisis/experience`. The room’s own overview and instrument navigation are unchanged.

The physical tabletop and complete monitor array are native button entry points in the overview. Hover or keyboard focus illuminates the projected table rim or all four monitor bezels. These hit areas move with the room artwork; entering keeps the same map and four screens mounted. A separate full-room button behind the instruments returns to the overview when the surrounding room is clicked. Because it is a sibling behind the instruments, table markers, source text, evidence controls, and screen interactions cannot accidentally trigger click-away. Escape and the visible return controls remain available, and keyboard focus returns to the originating surface. Camera transitions and highlights respect reduced motion. Three additional Angular regressions cover direct entry/return, instrument interaction isolation, and restored surface focus (9 Angular surface tests total).

## ARGUS companion update

ARGUS is now a persistent, independently animated room character. Its configured route follows adjacent aisle points around the table, with variable travel and pause durations. It stops for pointer/keyboard attention, while the document is hidden, and when reduced motion or Hold position is active. It rolls and sways gently, blinks, shows a status light, and approaches a briefing position when called. A compact route keeps it within the phone viewport. Movement never changes scenario time or dispatches an order.

The character uses its own room-coordinate layer so room hotspots cannot intercept clicks. Selecting ARGUS opens a contextual projection with three direct intents: Brief me, Show a report, and Work the data. The projection retains its current intent, source, and comparison when closed. It surfaces the current bulletin, unread signals, credibility checks, observed sensor history, evidence counts, and reversible crew/risk comparisons. Take this to command opens the selected order for normal review and evidence attachment; it does not dispatch it. Sources continue to respect the active role and bulletin stage.

Character name, sprite path, and aisle points are optional configuration under companion. Coordinates and scale are validated. Generic movement, signal selection, and comparison helpers live in domain/crisis-companion.ts; the character and its projection are separate UI components. The original room artwork remains available unchanged.

Saved project assets (built-in image_gen):

- public/crisis-center/operations-room-roaming.png — room clean plate, 1672 × 941.
- public/crisis-center/argus-rover.png — final character, 1024 × 1536; verified 32-bit ARGB with zero-alpha background pixels. Alpha is preserved in the project copy.

Clean-plate prompt:

> Use case: precise-object-edit. Asset type: clean background plate for the existing interactive crisis operations room. Input image is the edit target. Remove ONLY the small white and black robot beside the right side of the central table (near 75% across, 61% down). Seamlessly reconstruct the floor, desk edge, and dark background behind it. Keep the rest of the image unchanged: identical camera perspective, framing, 16:9 aspect ratio, architecture, table corners and glowing border, wall screens, monitors, chairs, people, lights and colors. No other changes, no new objects, no robot anywhere. Match the original resolution and composition precisely. This clean plate will have an independently animated robot added in code.

Initial character prompt (the first result was a visual reference with an opaque background):

> Use case: background-extraction. Asset type: transparent full-body robot sprite for the attached crisis operations room. Use the small white graphite and black robot at the right of the table in the reference as the character identity and visual design reference. Create a crisp, high-quality photorealistic 3D render of that same friendly compact emergency-assistant robot, isolated on a genuinely transparent alpha background. Reconstruct its full body down to a compact rounded wheeled mobile base (it rolls naturally on the command-room floor). White ceramic shell, dark graphite articulated shoulders and arms, small round black glossy visor head with two expressive cyan luminous eyes, subtle cyan status light, premium detailed materials. Slight three-quarter view facing toward the viewer and slightly left, both arms resting comfortably at its sides, the camera a little above eye level as in the room. Rounded wheeled base underneath, NOT bipedal legs, no levitation, no floor, no cast ground shadow (added in code). Keep the character centered with 6% transparent padding, entire body visible. Portrait 2:3 composition, about 1024px tall. No text, logos, framing, checkerboard pattern or other objects. Lighting must match cool cyan overhead architectural lighting of the room, with readable white materials and soft shadows on the body.

Final character extraction prompt:

> Use case: background-extraction. Edit target: the supplied robot render. Preserve the robot exactly. Remove the entire white and grey checkerboard background and all empty surroundings. Output a PNG with a REAL transparent alpha channel: background pixels must have alpha 0. Do not draw a checkerboard, white canvas, black canvas, backdrop, floor, or simulated transparency. Keep robot pixels, colors, character, full wheeled base, pose and lighting unchanged. Tight composition with only 4% transparent padding around the whole robot. This is a transparent sprite asset that will be composited over a dark room. Actual background transparency is essential.

Companion validation adds five domain tests for bounded aisle movement, rejected invalid geometry, visible-source filtering, reversible comparison, and already-dispatched actions. Three additional Angular tests cover retained intent and command handoff without dispatch, interaction/hold stopping movement, and reduced-motion stillness. Together with the existing checks there are 27 domain/integration tests and 6 Angular surface tests.

```powershell
npx vitest run scripts/crisis-companion.spec.ts scripts/crisis-operations.spec.ts src/app/projects/project-catalog.spec.ts src/app/runtime/local-template-registry.spec.ts --config vitest.serial.config.mjs --globals
npm test -- --watch=false --include=src/app/templates/crisis-operations/ui/crisis-surfaces.spec.ts
```


