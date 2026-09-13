# Solstice Windows

The final example at `/projects/calendar-monument/final-demo` uses three stones. Horizontal empty bores in the summer and winter window stones project sunlight onto two fixed marks on the east face of a central pillar. The original Jewel Circle fixture and saved learner records remain unchanged.

## Try the finished design

1. Choose **June solstice → Inspect pillar**. Sunlight reaches the summer ring; the winter ring is shaded.
2. Choose **December solstice** with the same camera. The illuminated patch moves to the winter ring.
3. **Ray guide** toggles the measured ray overlay. With it off, the rendered patch still appears. **Fit all** returns to the whole monument.
4. **Markers** shows the selected carving’s recorded observation, live sunlight/shadow reading and actual target height. **Compare** contains all four computed records. Equinoxes are open-center baselines.

All alignment tests use **30 minutes after sunrise**, Colorado Springs (38.83, −104.82), 2026. Morning bearings are 63.288° in June and 124.911° in December; these differ from the exact sunrise-event bearings. The Sun elevations are 4.452° and 4.284°.

## Starting challenge

New project drafts start with **Align the solstice window**; existing drafts can adopt it through Sample models and restore their previous design. Only the summer window is deliberately shifted 40 cm south. The winter alignment works.

Choose June, Test sunlight and **Morning light**. Keep the pillar and its carvings fixed. Move the summer window north in small steps, inspect the pillar, and stop when its bright patch reaches the summer mark. Check December and nearby dates. Record before/after evidence. The sample supplies editable morning expectations, not fabricated successful trials.

## Construction

| Part | Count | Width × height × depth |
| --- | --- | --- |
| Upright window stone | 2 | 140 × 160 × 25 cm; horizontal local-Z bore Ø18 cm, centered 80 cm above base |
| Central receiving pillar | 1 | 30 × 120 × 80 cm |

Each hole center stands 3 m horizontally from its matching carving. The receiving east face is X −35 cm; summer Z −20 cm and Y 56.64 cm; winter Z +20 cm and Y 57.53 cm. Use the generated blueprint for full positions and Y-axis rotations. The Sun rays slope downward through level bores; the target is lower by `distance × tan(solar altitude)`. Hole thickness and diameter limit which directions pass.

At one tenth scale, use two 14 × 16 × 2.5 cm screens with Ø1.8 cm holes and a 3 × 12 × 8 cm receiving pillar. Scale all distances and marks together. A punched card is useful for the first alignment experiment. Physical support and outdoor accuracy require actual testing.

## Reusable capability

`DesignTarget` adds optional `y` (0–15 m, default ground) and an outward unit-vector `normal` (default up). The shared validator and standalone solar validator enforce the same bounds. Surface marks stay on the supplied plane; their guides never block or generate light. CPU evidence traces from the actual height and rejects back-facing surfaces. GPU lighting already resolves transmission at every solid surface. No project-name branches were added to the runtime.

The shared engineering config and sample contracts add optional `starterChecks` / `checks`. They load editable expectations atomically with geometry, back up the prior checks, and leave loaded snapshots and evidence intact. Existing packages without these fields keep their prior behavior. These are additive fields under the current 1.0 contracts; no saved-data migration is needed.

The solar plugin supplies Morning light, Inspect pillar, elevated ray endpoints, and a genuinely optional guide overlay. The generic builder supplies target height / face controls and an upright horizontal-hole preset. Curriculum geometry, starter offset and solved exhibit remain in the calendar project data.

## Verification

`node scripts/check-solstice-gates.cjs` checks both validators, precise Sun angles, full-bore transmission, exact pillar hits, sealed-hole / vertical-hole / shifted-window / opposite-solstice controls, bounded light patches, surface-mark orientation, elevated guide endpoints, a missed starter summer alignment and four reproducible observations. Regenerate references only after geometry changes:

```
node scripts/check-solstice-gates.cjs --write-references
```

The optical regression suite compares 2,394 independent mesh rays. Shared editor/template/solar bridge tests cover new presets, sample expectations, restore behavior, saved records and input validation. Browser inspection confirms June and December illuminate opposite carvings in the same close-up. These are computed examples using a level-horizon, parallel-ray model, not outdoor measurements. Nearby dates can also align near a solstice.
