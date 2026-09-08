# Swappable championship broadcast system

## Boundaries

- `domain/`: bracket and game rules; unchanged by camera or artwork choices.
- `runtime/`: command execution and local rehearsal persistence.
- `broadcast/studio-projection.ts`: public visual data; never passes team answers or unrevealed points to the renderer.
- `broadcast/broadcast-director.service.ts`: cancelable timed cues; completion callbacks execute the host's authorized commands exactly once. Skip finishes; cancel/manual camera changes abort the pending callback. Component destruction clears pending work.
- `broadcast/studio-scene.ts`: lazily loaded Three.js renderer, actual 3D camera dolly and target interpolation, materials, reflections, lighting, screens, curtain geometry, and GPU lifecycle. Rendering is capped at 30 fps and suspended offscreen; pixel ratio is capped at 2. Antialiased postprocessing and 2048-pixel question textures support a television-style display. WebGL availability and device performance still determine the final rendering quality; the photographic opening image is concept artwork, not a captured 3D frame.
- `showcase/`: fictional snapshots and timed presentation; no runtime/persistence dependency. Audience games cannot change scores.

## Per-project art package

Add a `broadcast` object to the project JSON. Start with the sample object in `public/projects/championship-show/project.json` or `midnightBroadcast` in `broadcast.models.ts`.

| Slot | Suggested asset | Rendering role |
| --- | --- | --- |
| `assets.backdrop` | 16:9 image, at least 1920 px wide | Physical studio LED wall |
| `assets.floor` | Seamless square texture | Tiled physical floor; replaces mirror finish |
| `assets.podium` | Square material texture | Podium shell |
| `assets.questionScreen` | Quiet 16:7 texture | Background below live question text |
| `assets.bracketBackdrop` | Wide banner | Bracket heading |
| `assets.winnerBackdrop` | Celebration background | Physical winner screen |
| `assets.showLogo` | Transparent PNG | Broadcast corner identity |
| `teamEmblems[teamId]` | Transparent square PNG | Podium face; monogram fallback |
| `sounds.entrance/question/score/champion` | Short locally supplied audio | Opt-in cue replacement |
| `sounds.musicBed` | Seamlessly looping quiet audio | Opt-in final-wager tension |

Paths must be same-origin absolute project asset paths. Palettes use six-digit hex colors. Camera movement/reveal timings and material values are validated. Meaningful names, questions, scores, timers, bracket links, and team identities remain live content; do not bake them into replacement backgrounds. Keep question backgrounds dark and low contrast. Team close-ups target station geometry and continue working when graphics change.

This version uses a fixed reusable stage arrangement with 2–16 podium positions; swapping art does not require remodeling. Project-specific 3D geometry, live video at team stations, and bespoke camera shot authoring would be additional capabilities.

## Fictional final and video handoff

`final-demo.json` is separate from the ordinary rehearsal. Its `highlights[].points` sum into the seeds: 124, 116, 109, 101, 96, 92, 88, 82. Invented quarterfinals advance Nova, Falcons, Atlas, and Comets. The scripted final ends Nova 200, Comets 180, Falcons 140, Atlas 0. Twenty-nine invented team responses are retained within the isolated in-memory sample; none become grades or real student records.

The storyboard presents three recap cards over 33 seconds. It is a pitch preview of the longer 75-second video in `mock-recap-script.md`. Supply the MP4 and enable `recapVideo`/`recapCaptions` as documented in that script to replace the storyboard. Video duration controls the handoff; the show does not assume the upload is exactly 75 seconds. Clips should revisit first attempts, evidence, and corrections, then show qualification seeds and end with a clean transition into the bracket. There is no automatic video editing or classroom-record import in this build.

## Generated asset provenance and prompts

Generated September 8, 2026 with the built-in ImageGen tool. These images are invented concept art and contain no real student likenesses. The final files are versioned under `public/projects/championship-show/art/`; keep that naming pattern for replacements. Summarized production prompts below retain the art direction and constraints used in generation.

1. **`midnight-studio-wall-v1.png`** — Flat premium LED-wall artwork for an HD championship show. Midnight navy and champagne gold; brushed metallic elliptical arcs, subtle blue accents, dimensional material detail, restrained highlights, dark central negative space. Artwork only, no photographed room, people, text, logos, holograms, or excessive neon. Wide 16:9 composition.
2. **`final-opening-v1.png`** — Cinematic opening frame for a fictional middle-school championship. Photoreal expensive primetime HD studio with four realistic sculptural podiums in a shallow arc, brushed black metal and glass, thin blue/gold/violet/mint LED details, tangible shadows and reflective floor. Midnight navy/champagne-gold elliptical architecture and visible dark overhead rigging, controlled key lighting, no people. Main screen reads “THREE WEEKS.” and “ONE FINAL.” with small “THE CHAMPIONSHIP SHOW.” Lower quarter clear for video overlay; small gold trophy in the foreground. Premium television, no futuristic holograms or excessive neon.
3. **`mystery-duck-v1.png`** — Photoreal high-quality studio product frame, wide 16:9, centered yellow rubber duck wearing tiny black aviator sunglasses, orange beak and realistic rubber texture, fully visible on a dark plinth. Dark navy background, soft blue and gold edge lighting, generous negative space, controlled softbox highlights. No people, text, or watermark. The app will crop into the beak and zoom out for a silly mystery-object game.

Only the opening concept contains intentional title text. The studio wall and mystery object are reusable raster assets; all gameplay overlays are rendered live.
