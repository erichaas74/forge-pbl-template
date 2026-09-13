# Living scenes · first coastal encounter

Implemented 2026-09-13 at `/projects/shadow-gallery`. The first gallery now includes **Step into the scene**; painting inspection includes **Enter the scene**. This delivers the first complete coastal encounter from the interaction plan. Other settings, animated historical events, and the larger capstone redesign remain planned work.

## Student experience

The visitor enters an illustrated Caribbean shore at eye level. Four named viewpoints offer an arrival view, a seated listening place, a conversation, and a canoe inspection. Controlled zoom and framing convey moving closer; this is a guided illustrated environment rather than a freely navigable 3D world.

- **Sit & listen:** three complete narrated chapters, individual playback controls, readable transcripts, and expandable source notes. Nothing autoplays. Playback stops when changing activities, returning, or destroying the encounter.
- **Ask a question:** five authored choices with identified speakers. The question about whether an illustration proves historical absence unlocks after the question about introduced horses.
- **Explore the canoe:** a keyboard-operable inspection lens and three details to observe. Moving the lens is temporary presentation state; selecting a detail records an observation.
- **Keep an insight:** after opening a chapter, asking a question, and observing a detail, compare a stated claim with a selected reference. Choose whether the reference supports, contradicts, or does not establish the claim. Incorrect answers give a retry hint. A correct source and relationship record one insight.
- **Return:** retain the encounter record in the field notebook, clue audit, JSON export, and Markdown dossier. Revisit from the notebook or audit. Returning from painting inspection preserves its selected painting and detail. A mechanism draft survives a notebook encounter within the same page session.

Opening content is recorded as access, not proof of having heard every word or understood it. Insight credit is separate from access. Exiting records the end of a visit, not activity mastery. The encounter does not classify a painting, solve a mechanism, or unlock the vault. Students return to the gallery to apply the reference to a specific inspected clue. Teaching can therefore precede the final challenge.

## Authorship and attribution

The host, image, and brief invitation dialogue are fictional. Historical explanations use an explicitly labeled **Museum audio guide** with the gallery's existing source notes. The image is generated artwork; its scenery, clothing, and objects are illustrative. It is not documentary evidence. The interface identifies the host as a fictional character in a Taíno-associated reconstruction and distinguishes this from recorded Indigenous oral history.

Eight bundled audio tracks use local Microsoft Zira Desktop speech synthesis. No cloned voice, purported eyewitness recording, external AI chat, or contributor interview is included. This first release offers an illustrated encounter and an authored museum account. Community-authored stories, recordings, and performances remain a content-production step for the next iteration. The interface already exposes speaker attribution, transcript, and reference fields to accommodate that content.

Source-linked claims use `first-contact`, `island-people`, `andean-people`, and `exchange-origins`. The earned insight tests the claim that European horse herds were established on Hispaniola before European contact; `exchange-origins` contradicts that timing. Absence from the generated illustration is explicitly rejected as independent proof.

## Reusable contracts

`src/app/shared/encounters/` owns the framework-independent definition, state, validation, and transition contracts plus the Angular presenter. The presenter receives `definition`, `state`, `sources`, and `reducedMotion`; it emits typed `action` or `leave` outputs. It has no project-ID checks and cannot award gallery progress directly.

`EncounterDefinition` includes a registered kind and version, eligible chamber IDs, setting and attribution, four viewpoint modes, narrated chapters, prerequisite-linked questions, object features, and a claim/source/relationship assessment. Curriculum text and media paths are package data. Executable callbacks are not allowed in content. `encounterKinds` currently installs `guided-scene`; other kinds fail before rendering with `CAPABILITY_NOT_INSTALLED`.

The typed `encounterActions` registry implements seven actions:

| Action | Persisted consequence | Event metadata |
| --- | --- | --- |
| `enter` | Activate an eligible encounter; retain prior visit | `activity.started` |
| `exit` | Clear active encounter; retain its record | `encounter.exited` |
| `view` | Set viewpoint; record visited viewpoint | `evidence.viewed` |
| `chapter` | Set and record an opened story chapter | `evidence.viewed` |
| `question` | Set and record a permitted question | `npc.questionAsked` |
| `feature` | Record an observed object detail once | `evidence.viewed` |
| `insight` | Record an assessed attempt; award a correct insight once | `activity.resultSubmitted` |

These tags are metadata on the gallery-owned accepted event, not direct dispatch into the core LMS Rule Engine. `encounter.exited` is explicitly owned by this extension. Existing core event schemas and authority contracts are unchanged.

The gallery wraps actions in `{ type: 'encounter', encounterId, action }`, validates current/cleared-room eligibility, blocks underlying gallery mutations while an encounter is active, and sends accepted commands through the existing scoped persistence adapter. Snapshot fields `encounters` and `activeEncounterId` are optional; legacy snapshots retain their shape. The read-only `encounterRecords()` projection feeds the audit and dossier.

Validation rejects missing sources, unsafe local asset paths, unsupported kinds, duplicate IDs, invalid framing bounds, missing viewpoints, inaccessible interaction modes, missing or cyclic question prerequisites, and assessment answers absent from the offered references. Repeated content access does not duplicate collected IDs; repeated earned insights are rejected. No playback ticks, pointer motion, or lens slider changes are persisted.

## Package compatibility

The catalog now selects `projects/shadow-gallery/versions/1.1.0`, project version **1.1.0**, gallery schema **1.2**, and capability ID `heist.encounters`. `GalleryMission.encounters` is an optional schema-1.2 extension. The original schema-1.1/project-1.0.0 file remains at `public/projects/shadow-gallery/project.json` unchanged, preserving its exact save fingerprint.

New practices use the new version's separate local-storage scope. Old work is not migrated or erased. The legacy package can still launch with its matching version/session; it has no encounter fields. Neither version supplies server-authoritative grading. Existing castle experiences keep their separate launcher paths.

## Files

Added:

- `src/app/shared/encounters/encounter.models.ts`, `encounter.engine.ts`, `encounter.validation.ts`, `encounter.component.ts/.html/.scss`, and `encounter.spec.ts`.
- `src/app/templates/heist/gallery/domain/gallery-encounter.spec.ts` and `ui/gallery-encounter.component.spec.ts`.
- `public/projects/shadow-gallery/versions/1.1.0/project.json`.
- `public/projects/shadow-gallery/encounters/coastal-v1.png` and eight `coast-*.m4a` narration files.
- `docs/heist/build-living-encounter.mjs`, `scripts/generate-encounter-audio.ps1`, `scripts/check-heist-encounter.cjs`, `scripts/serve-heist-preview.cjs`, and this note.

Modified:

- Gallery mission/command/snapshot/event models, validation, engine, and audit projection.
- Gallery component and audit component presentation, encounter navigation, draft retention integration, and dossier export.
- The Shadow Gallery catalog entry and Heist launcher compatibility test.
- `scripts/check-heist-gallery.cjs` for versioned content, audio MIME, and the encounter browser path.
- Component/package contract documentation, redesign handoff, and interaction-plan status.
- One build-unblocking modifier in `src/app/templates/heist/escape/gear-lock/gear-lock.scene.ts`: the newly added parallel Castle Archive component's `update` method needed `override` under strict TypeScript. No gear-lock behavior was changed.

No core runtime, production persistence adapter, backend, package dependency, or executable project script was added.

## Verification

The implementation adds domain, configuration, component, and browser coverage. Domain checks distinguish access, attempts, and earned insight; enforce prerequisites; exercise malformed content; and restore records through accepted commands. Component checks operate story/question/detail controls, audio failure fallback, Escape/return context, and an unfinished sorting lock's notebook round trip. Launcher coverage includes both gallery package versions. Browser checks use real Chromium audio playback and verify pause, reload without autoplay, keyboard lens controls, incorrect/correct evidence comparisons, audit revisit, sourced JSON export, and 390px phone layout.

Commands, from the repository root:

```powershell
node docs/heist/build-living-encounter.mjs
powershell.exe -NoProfile -File scripts/generate-encounter-audio.ps1
npm test -- --watch=false --include=src/app/shared/encounters/**/*.spec.ts --include=src/app/templates/heist/**/*.spec.ts --include=src/app/runtime/project-launch/template-launchers/heist.launcher.spec.ts --include=src/app/projects/project-catalog.spec.ts --include=src/app/features/project-home/project-home.component.spec.ts
npm run build -- --output-path=../output/heist-review-build
$env:HEIST_ENCOUNTER_ONLY='1'
node scripts/check-heist-gallery.cjs
Remove-Item Env:HEIST_ENCOUNTER_ONLY
node scripts/check-heist-gallery.cjs
node scripts/serve-heist-preview.cjs
```

Set `PLAYWRIGHT_MODULE` to an installed Playwright module if it is outside this repository. The last command keeps a local production preview running at `http://127.0.0.1:4300/projects/shadow-gallery`; stop it with Ctrl+C. Audio generation requires Windows System.Speech, the named installed voice, and the existing `ffmpeg-static` dependency. Generation scripts are author tools; students do not need those dependencies.

Final verification passed: 115 focused regression tests, followed by 49 affected tests after the final event-metadata adjustment; production build; the complete encounter browser path with JSON and Markdown exports; and the original eight-gallery/seventeen-lock vault playthrough with recovery, extraction, defense, replay, and mobile checks. Both browser runs reported no page errors. The gallery stylesheet has a 632-byte warning-budget overage, alongside the existing unrelated style warnings. Detailed results are recorded in the handoff. Browser screenshots and disposable QA dossier exports live in `../output/heist-gallery/encounter-*`. They contain test progress, not student records.

All eight bundled narration tracks were independently decoded with FFmpeg successfully. The architecture check continues to report the existing `core/index.ts` forbidden `./templates` dependency and `projects/mystery-substance/lab-kit/render-quality.service.ts` package-boundary violation; it reports no encounter/gallery violation. Touched tracked files pass `git diff --check`.

## Scope and next phase

There is no specification deviation requiring a core contract change. This is a versioned, optional Heist extension with an explicit local-practice authority limit. A second instrument-workshop configuration test exercises different questions, observations, reference, and assessment relationship through unchanged domain code. It is not a delivered second project and does not by itself satisfy the architecture's two-project reuse milestone.

Remaining `TEMPLATE_CAPABILITY_GAP` items: externally authored contributor recordings and their content management; multiple linked animated scenes; environmental simulations with causal state; and official assessment/reporting integration. Free movement, a live conversational AI, ambient sound, and video reenactments are not part of this first encounter.

Recommended next phase: classroom playtest this encounter, refine the questions and pacing with appropriate contributors, then author the navigator's workshop as the second substantially different encounter. Use the same source/claim record in a later final heist; preserve the student's earlier insights for that application.

## Generated artwork record

Final asset: `public/projects/shadow-gallery/encounters/coastal-v1.png` (1536 × 1024). Generated with the built-in image tool, inspected, then copied into the project. Original generation: `C:/Users/erich/.codex/generated_images/01a09b39-6e10-74a2-8bbd-37aa9e6188cd/exec-3960f797-9d06-4969-bfa1-815034177950.png`.

Exact prompt:

> Use case: historical-scene. Asset type: wide immersive educational adventure game environment, 1536x1024 landscape. Create a polished painterly, naturalistic Caribbean coastal scene used as an explicitly fictional museum reconstruction of a Taíno-associated setting on Hispaniola around 1492. Eye-level first-person visitor viewpoint, welcoming quiet morning, turquoise sheltered water at left, a clearly recognizable simple hollowed-log dugout canoe drawn onto the sand in lower left center, small modest maize planting area in the middle ground, green coastal hillside. On the right half, one fictional adult Indigenous Caribbean host, seated comfortably near a low plain wooden seat for a visitor, calmly facing toward the viewer with open welcoming posture. Simple unadorned woven cotton clothing, ordinary appearance, no stereotyped costume, no feather headdress, no ceremonial objects, no weapons. No horses, no European ships, no modern equipment. People and surroundings should feel natural and lived-in, not a fantasy tribe. The host is a fictional illustrative character, not a representation of a named historical person. Leave foreground ground space and upper sky readable for minimal game controls. Warm light, rich green and brass-adjacent earth colors consistent with an atmospheric museum adventure. Cohesive single panorama without panels or borders, no text, no watermark. Detailed craft and environmental textures, dignified human depiction. Compose important canoe around x=30% y=65%, host around x=70% y=55%, open listening spot foreground right. This illustration must look like a scene the player can step into, not a framed painting or UI mockup.
