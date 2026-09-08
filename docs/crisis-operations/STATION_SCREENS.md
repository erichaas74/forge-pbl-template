# Crisis workstation screens

The physical desks now open distinct experiences. River & weather opens a weather broadcast; Field operations opens a conferencing interface. The same preview content appears on their small room monitors. No project-name checks or changes to shared LMS contracts are used.

## Field conference

The dark call window follows familiar video-meeting conventions: selected speaker, gallery view, participant strip, local camera-off tile, participant list, field-update captions, reports sidebar, green presentation control, and red Leave button. The photo tiles are fictional participant stills, visibly labeled. No remote call, microphone, camera, recording, or actual screen capture starts. Media controls remain disabled until a future live integration; the local presentation control shows the scenario bulletin, crew count, and deliberately pinned reports inside the exercise.

Field captions use only currently visible evidence associated with the selected participant. Future and unavailable reports remain hidden. Opening the report drawer reuses the existing report console, including specialist selection, read/share events, source credibility, and the situation-table handoff. Gallery, selected participant, captions, and presentation state are local UI state; they do not dispatch crews or advance bulletins. Leave and Escape return to the room. On narrow screens the participant/report drawer fills the call body and moves focus to its heading; the obscured stage becomes inert while the drawer is open.

Each workstation can provide optional `conference` content:

```json
{
  "conference": {
    "title": "Field operations",
    "participants": [{
      "id": "field-lead",
      "name": "Maya Chen",
      "role": "Field coordinator · Pine Valley",
      "locationId": "pine",
      "portrait": "/crisis-center/field-coordinator.png",
      "evidenceIds": ["field-01", "response-03", "waiting-03"]
    }]
  }
}
```

One to six unique participants are supported. Names/roles must be nonempty, locations and report IDs must resolve, and portraits use local absolute asset paths. An optional `conference.meetingUrl` accepts an HTTPS meeting link without embedded credentials. When supplied, the screen shows **Join live meeting**, opening that destination in a separate tab with `noopener noreferrer`. No meeting link is configured in Cascade Bay. This is a future connection point for a project-authored meeting URL, not an embedded Zoom/FaceTime SDK integration. Actual live media would require a provider adapter and session authorization in a later phase.

## Weather broadcast

The weather monitor uses a generated satellite basemap, the scenario's configured coast, river, roads and locations, and layered Doppler-style precipitation bands. Satellite mode replaces precipitation colors with animated cloud cover. A timestamped loop moves through authored frames for the current bulletin only. The broadcast adds a precipitation/cloud legend, pause/play, frame scrubber, location selection and zoom, the current alert headline, river reading, forecast confidence, and direct access to weather reports or the situation table.

The radar and satellite imagery are illustrative exercise data, not live meteorological observations or quantitative forecasting. The generated terrain is a visual backdrop; the existing scenario geometry supplies location coordinates. Playback is local to the display, pauses while hidden/inactive, and starts paused for reduced-motion preferences. Manual playback is still available. Each miniature/expanded display uses the same renderer and authored frame set; their playback cursors are independent. The small display pauses while another room view is active. Changing the frame never changes exercise time, reports, or orders.

A workstation may provide optional `weather` content:

```json
{
  "weather": {
    "title": "Cascade Bay weather",
    "network": "CASCADE WEATHER",
    "satelliteImage": "/crisis-center/watershed-satellite.png",
    "frames": [
      { "stage": 0, "minute": 22, "x": 400, "y": 250, "intensity": 0.45 },
      { "stage": 0, "minute": 27, "x": 470, "y": 265, "intensity": 0.55 },
      { "stage": 0, "minute": 32, "x": 535, "y": 280, "intensity": 0.64 }
    ]
  }
}
```

Every bulletin stage must have at least one frame. There may be up to 120 frames total. Minutes must increase within each stage and cannot exceed that stage's bulletin time. Coordinates use the existing 1000 × 600 map; intensity is a bounded 0–1 visual parameter. A desk can define either conference or weather, not both. Omitted fields preserve report-based station behavior. Existing schema 1.0 packages and persisted exercise snapshots remain compatible.

## Implementation and validation

Added: `domain/crisis-station-validation.ts`, `ui/crisis-conference.component.{ts,html,scss}`, `ui/crisis-weather-screen.component.{ts,html,scss}`, `ui/crisis-station-shell.scss`, this note, and four image assets. Modified: crisis models/validation, center TS/template, workstation preview TS/template/styles, icon paths, Cascade Bay project configuration, `scripts/crisis-workstations.spec.ts`, and `ui/crisis-surfaces.spec.ts`.

Four new domain tests cover optional conference validation, safe meeting-link configuration, invalid participants/source references, weather timing/bounds and conflicting experiences. Four Angular regressions cover call entry/gallery/source filtering, in-call evidence presentation without resource spend, playback/pause/scrubbing without scenario progression, reduced motion, and access to specialist reports. Current targeted totals: **36 domain/integration tests and 18 Angular surface tests pass**. Production build passes with pre-existing stylesheet budget warnings. Browser checks cover the room previews, enlarged conference, radar/satellite layers, and 390-pixel phone layouts.

No blocking `TEMPLATE_CAPABILITY_GAP` items for these exercise views. Scope boundary: a familiar conference appearance with simulated participants is complete; embedded live conferencing and real weather feeds are separate future integrations. Recommended next phase: configure a meeting link for a project when one is available, or add an authorized live provider adapter if embedded media is required.

## Generated assets and prompts

All four images use the built-in image_gen tool. They are copied into `public/crisis-center/`; original generated files remain in the Codex generated-images folder. No stock portrait identities are used. Names and roles are fictional scenario configuration.

### field-coordinator.png

Saved: `public/crisis-center/field-coordinator.png` (1536 × 1024).

> Use case: photorealistic-natural. Asset type: fictional participant still for a crisis simulation video-conference screen. Create a realistic laptop webcam view of a fictional Asian American woman in her early 40s, dark hair loosely tied back, wearing a dark navy waterproof jacket with a subtle reflective shoulder seam and a single-ear radio headset. She is a calm attentive field coordinator, looking into the webcam, lips naturally closed between sentences. Chest-up, face near the center with generous space around shoulders and above head, warm realistic skin and subtle eye detail. She sits inside a mobile emergency response van; behind her are softly blurred rain-streaked windows showing Pacific Northwest evergreen hills, a muted amber cabin light and a mounted radio. Cool overcast daylight with warm practical light. Credible candid video-conference frame, unglamorous, detailed natural skin, professional documentary photography. Landscape 1536x1024. No text, no logos, no screen graphics, no watermarks, no split layout.

### logistics-coordinator.png

Saved: `public/crisis-center/logistics-coordinator.png` (1536 × 1024).

> Use case: photorealistic-natural. Asset type: fictional participant still for a crisis simulation video-conference screen. Create a realistic laptop webcam view of a fictional Black woman in her late 30s, short natural curls, clear thin-frame eyeglasses, muted forest-green fleece and dark headset. She is an attentive logistics coordinator looking directly into the camera, lips naturally closed between sentences. Chest-up, face near the center with generous space around shoulders and above head. Background softly blurred emergency shelter reception in a school gym, folding tables and stacked supply boxes, warm ceiling lights. Credible candid video-conference frame, realistic skin, professional documentary photography. Landscape 1536x1024. No text, no logos, no screen graphics, no watermarks, no split layout.

### infrastructure-engineer.png

Saved: `public/crisis-center/infrastructure-engineer.png` (1536 × 1024).

> Use case: photorealistic-natural. Asset type: fictional participant still for a crisis simulation video-conference screen. Create a realistic laptop webcam view of a fictional white man in his early 50s, short salt-and-pepper hair and trimmed beard, navy work jacket with orange high-visibility vest and a single-ear radio headset. He is a calm infrastructure engineer looking into the camera, lips naturally closed between sentences. Chest-up, face near the center with generous space around shoulders and above head. Inside a parked field truck, softly blurred rainy side window with a steel river bridge and evergreen trees outside. Cool natural daylight, grounded attentive expression, realistic skin, professional documentary photography. Landscape 1536x1024. No text, no logos, no screen graphics, no watermarks, no split layout.

### watershed-satellite.png

Saved: `public/crisis-center/watershed-satellite.png`.

> Use case: photorealistic-natural. Asset type: fictional satellite basemap for a crisis simulation weather monitor, flat overhead orthographic satellite imagery, wide landscape 5:3 ratio. Pacific Northwest coastal watershed. Dark deep blue ocean occupies LEFT THIRD of frame. Jagged mainland coastline runs roughly from x37% at the top down to x27% at the bottom. Dense green forest covers the eastern two thirds; steep mountain ridges along the far right edge. A single silver-blue meandering river enters at x73% along top edge, bends through x69% y22%, x59% y37%, x52% y54%, x46% y65%, x40% y73%, and empties into the bay at x30% y83%. A modest town beside this river at center (x58% y41%), a road bridge at x52% y56%, a small waterfront district x38% y73%, and sparse upland settlements in eastern forests. Realistic multispectral natural color satellite texture, clearly visible rugged terrain and tiny roads. No clouds; cloud cover will be animated as a separate layer. Even overcast daylight. Fine earth-observation detail, credible satellite orthophoto. No text, no logos, no map markers, no interface, no borders, no watermarks. 2000x1200.

