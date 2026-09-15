# Expedition News Network — local pilot implementation

The Grade 5 ELA project is available at `/projects/expedition-news-network`. Its first assignment is a present-day classroom report about Shackleton’s **Endurance party, 1914–1916**. The Antarctic newsroom is an imagined modern learning space. It is not presented as a historical photograph or as the interior of Endurance.

## Four weeks, eight lessons

Each session is planned for 45–60 minutes. Work estimates guide planning, not automatic pass thresholds. The final report is approximately 250–400 words per learner; the team broadcast is approximately 3–5 minutes. Every learner writes, presents, listens, and defends their own work.

| Week | Instructional / individual lesson | Group lesson | Required progress checkpoint |
|---|---|---|---|
| 1 | **1: Meet the expedition.** Read the anchor, identify two central ideas, summarize, quote accurately, explain a relationship, and start a source note. E12, E22. | **2: Plan the newsroom.** Agree on audience, question, roles, and order. Each person explains a source detail, contributes, and responds to a peer. E22, E21, E16. | **E-A:** personally explain an accurate source detail and its relevance before dependent drafting. |
| 2 | **3: Gather evidence.** Categorize notes from at least two sources and write an informative paragraph. E12, E22, E19. | **4: Build the first report.** Each learner writes a full report; the group creates a running order and evaluates peer reasoning. E19, E21, E22, E16. | **E-B:** supported first report, credits, and individual explanation before recording or rehearsal. |
| 3 | **5: Revise.** Preserve the first draft, improve meaning or organization, edit, and write a before/after revision memo. E19, E21. This remains available while repairing E-B. | **6: Rehearse.** Every person presents, explains a purposeful visual, evaluates a peer’s evidence, and revises. E16, E17, E21. | Recording desk requires E-B. Teacher observes actual speaking and listening. |
| 4 | **7: Defend.** Use a separate reading passage for two central ideas and a relationship; defend sources and assemble the final report and revision trail. E12, E19, E21, E22. | **8: Share.** Present a team broadcast, answer a personal question, and reflect on contribution and evidence. E16, E17; review the whole portfolio. | **E-C:** independent reading/source defense and supported final portfolio before final section preparation. |

Curriculum was designed backward from the six standards and final evidence. The gates represent prerequisites, not arbitrary completion counts. Reading and support stay available; only dependent work is blocked. Retrying keeps earlier attempts and reviews. Changing a gate lesson’s reviewed artifacts requires a fresh response. A side quest appears after a reviewed response and adds depth without replacing core evidence.

## Standards and assessment

The source is the user-supplied **Forge School Master Standards Framework, Grades 4–6, ELA 4–6.csv**. These rows are labeled **Draft—Head of School Review**. This project addresses six selected Grade 5 ELA standards; it does not claim to cover the entire grade’s standards.

| Standard | Evidence checked across the project |
|---|---|
| **FF.G5.ELA.12** | Accurate quotation, at least two central ideas, summary, and relationships among people/events/ideas/concepts. Baseline reading and a separate passage at lesson 7. |
| **FF.G5.ELA.19** | Full informative report with facts, definitions, quotations, examples, precise language, transitions, formatting, and conclusion. |
| **FF.G5.ELA.21** | Task, purpose, audience, plan, feedback, substantive revision, editing, and digital production. Preserve first draft, revised draft, final report, and revision memo. |
| **FF.G5.ELA.22** | Multiple-source research, categorized notes, source credits, source selection reasoning, and text evidence in the report. |
| **FF.G5.ELA.16** | Preparation, norms, building on peers’ ideas, summarizing spoken information, and evaluating reasons/evidence. Personal notes plus observed discussion. |
| **FF.G5.ELA.17** | Logical presentation, purposeful media, and speech adapted to context. Actual presentation or a teacher-approved equivalent demonstrating the same skills. |

The learning record has an independent check for each standard. A teacher preview must enter feedback, and E16/E17 additionally require an observation or recording reference before their demo checkmark can be set. Reading an article, saving a draft, recording audio, or preparing a team product never automatically completes a standard.

**Teacher and tutor responsibilities are included in each lesson.** In live instructional sessions the intended tutor prompts individual explanations after teacher modeling. During group work it checks every learner’s contribution, source reasoning, and response to peers. Practice scaffolds chunk reading, distinguish idea/detail or quotation/paraphrase, and organize paragraphs. Independent mode closes practice hints and records a personal response; fresh retries use a different prompt or example. Advanced side quests compare source limitations, alternative visuals, or audiences. Teachers can supply another vetted assessment passage after repeated practice.

The current tutor is **scripted**, not a connected language model. Demo reviews have `authority: 'demo'`. They cannot issue official grades. Teachers review the full portfolio and actual performances, rather than treating a single short answer as sufficient evidence for a composite standard.

## What works

- Eight lessons in the shared lesson selector, with four weeks of individual/group work and explicit dependent gates.
- A narrated 55-second sample news piece at launch (lesson 1) and a 3:32 model final broadcast in lesson 8 (week 4). Both have captions, a readable transcript, source credits, chapter links, and a download. Models stay viewable before gates are reviewed, are hidden during independent checks, and never populate learner drafts or award progress.
- Readable source packet with provenance, contextual cautions, linked originals, a credited schematic route visual, and an independent reading passage.
- Individual drafts saved on debounce and blur/navigation, local checkpoint attempts with captured work, preserved review history, Markdown portfolio export, and JSON work backup.
- A simple recording desk: headline, transcript, running order, purposeful visual, microphone-only recording, audio/video upload, playback, recording download, and a planned live-presentation/equivalent path.
- E-B enforcement at recording methods and E-C enforcement at final preparation; final preparation is idempotent and edits return the prepared section to draft.
- Browser-local scoped storage for work and IndexedDB for recording assets, with honest save-failure messages and student separation.
- Existing Hammurabi inquiry UI now uses the same template-neutral workspace, through a compatibility adapter.

Recordings replace the current take; students can download the old take first. The local running order is one learner’s copy. Groups present together in class. The pilot does not synchronize peers’ devices, assemble classmates’ private recordings, or publish a class broadcast.

## Architecture and changed files

- **Project package:** `src/app/projects/expedition-news-network/` contains only versioned configuration, curriculum, and source content.
- **Shared capability:** `src/app/shared/inquiry/` holds the port, models/validation, learning record, source reader, and lesson workspace. The legacy `hearingGateId` wire field remains for debate 1.0 compatibility; the field studio also declares explicit `recordingGateId` and `finalGateId`.
- **Template extension:** `src/app/templates/history-live/ui/field-newsroom.component.*` supplies the configurable field reporting profile; runtime events, validation, persistence shape, and media gates remain in the existing template layers.
- **Compatibility:** network keys and interleaving support arbitrary configured networks. Revolutionary War retains its existing editorial workflow. Debate keeps its component selector/output and model exports through compatibility wrappers.
- **Registration:** project catalog, local definition source, lesson-plan JSON, and launcher register the new project. Broadcast implementation version is **1.3.1**, compatible with the **1.1** project contract. Optional capability IDs are `learning.inquiry-portfolio@1.0`, `learning.worked-example@1.0`, and `history-live.field-studio@1.0`. The worked-example capability has no assessment events or commands.
- **Assets:** `public/history-live/expedition-newsroom-v1.png` and `public/history-live/expedition-route.svg`.
- **Worked examples:** the optional validated inquiry example schema and player live in `shared/inquiry/inquiry-example.*`. The project owns `expedition-examples.json` (narration, source references, visuals), `expedition-examples.timing.json` (chapter timing), and the MP4/poster/VTT assets in `public/history-live/expedition-examples/`.

No project-name branches or project-specific UI services were introduced. No external application, deployment, account setting, or official student record was changed.

## Source and artwork basis

- [Ernest Shackleton, South (1919), Project Gutenberg](https://www.gutenberg.org/files/5199/5199-h/5199-h.htm): primary memoir, short exact quotation, and basis for original classroom prose.
- [Scott Polar Research Institute, The Imperial Trans-Antarctic Expedition](https://www.spri.cam.ac.uk/museum/exhibitions/endurance/essay.pdf): historical cross-check for the plan, changing conditions, and rescue.
- [Royal Museums Greenwich, Antarctic explorer chronology](https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers): chronology and destination check.
- [Royal Museums Greenwich, Hurley photograph catalog](https://www.rmg.co.uk/collections/objects/rmgc-object-538261): linked photographic evidence; the museum image has not been copied into the app.

The short quote is distinguished from original classroom syntheses. The route graphic is an original schematic, labeled not to scale. The rescue statement refers specifically to the 28-person Endurance party; it does not erase the Ross Sea party’s losses.

**Artwork:** generated with the built-in image-generation tool, new-image mode, no references. Original: `C:/Users/erich/.codex/generated_images/01a0a067-9d95-7223-9e38-4eeef0954162/exec-ef031ae2-538f-4cd3-bf89-7b8cf8296527.png`. Copied to the public asset path; original retained.

Prompt:

> Use case: illustration-story. Asset type: wide 16:9 illustrated background for a grade 5 educational expedition news reporting workspace. Create a warm, inviting modern children's field newsroom at an Antarctic research station: broad wooden reporting desk in the lower foreground, understated microphone and headphones at the far sides, folded paper expedition charts, pencils and a closed notebook, large panoramic window behind with distant sea ice, blue water and low snowy mountains under pale polar daylight. Rich wooden trim and dark teal instrument shelves at left and right, amber desk lamps, a few neat analog navigation instruments as educational props. The central two thirds of the image should be calm uncluttered visual space, reserved for a large HTML article and report card. Polished painterly museum illustration, credible materials, warm interior against cool blue landscape, sophisticated but friendly for ages 9–11. This is a contemporary learning studio imagining how we can report on Shackleton's expedition, not a historical photograph or reconstruction of Endurance's interior. No people, no writing, no fake legible chart labels, no UI or buttons baked in, no logos, no war imagery, no patriotic flags, no floating graphics, no watermark.

## Validation and remaining integration

### Model video production

The header's **Final example** link opens `/projects/expedition-news-network/final-demo` and plays the same 3:32 MP4 used in lesson 8. It uses the existing catalog `finalExampleMode: 'template'` option. The broadcast launcher selects the configured last-lesson model and supplies only content to the shared `InquiryExamplePageComponent`; it does not create a learner runtime, persistence adapter, or recording adapter. Week navigation returns to the saved lesson workspace. No core contract or curriculum schema changed.

The examples use original HTML/CSS graphics over the existing newsroom illustration, two labeled synthetic Windows voices, and H.264/AAC encoding at 1280×720. They are classroom demonstration broadcasts, not archival footage or student submissions. The final model demonstrates the broadcast portion; learners must also provide their own report, source log, revision memo, and observed individual performances.

Both models use the vetted source packet above. The full broadcast includes anchor/reporting handoffs, two central ideas, an accurately attributed memoir quotation, a schematic route, source limitations, and a conclusion. It identifies the survival outcome specifically as the Endurance party, while acknowledging losses in the separate Ross Sea party.

To regenerate on Windows, run `powershell.exe -NoProfile -File scripts/generate-example-narration.ps1 -Manifest src/app/projects/expedition-news-network/expedition-examples.json -OutputDirectory tmp/expedition-example-media`, then `node scripts/render-news-examples.mjs`. The authoring script uses `ffmpeg-static` and Playwright (installed locally, provided through `PLAYWRIGHT_MODULE`, or in the bundled Codex runtime). Microsoft David Desktop and Microsoft Zira Desktop must be installed. Sentence audio determines caption timing; captions are burned into the picture and also provided as VTT. These tools are only used during authoring; playback requires no speech service or API key.

Serve `.mp4` as `video/mp4` and `.vtt` as `text/vtt`, with byte-range support for reliable seeking. The local video preview helper is `tmp/expedition-video-preview.mjs` on port 4206.

**68 tests across 11 files passed.** This includes worked-example validation and playback-failure fallback, examples hidden during independent checks, seeking without changing learner state, final-model access while E-C is locked, the field-studio suite, existing broadcast workflow/source tests, Hammurabi inquiry model and component regressions, catalog registration, and the complete eight-lesson registry. Angular compilation and Vitest used one worker to fit available memory. The serial run completed without test errors.

Reproduce the focused checks with `NG_BUILD_MAX_WORKERS=1` and `npm test -- --watch=false --runner-config=tmp/expedition-vitest.config.mjs`, including the history-live specs, shared inquiry-example specs, debate-inquiry model/component specs, catalog spec, and project-lesson.registry spec. The runner config only limits worker concurrency.

**Browser checks passed** at 1440×1000 and 390×844: initial rendering, save/reload, E-A/B/C blocks and reviews, practice hints closed during independent checks, microphone recording using a simulated input, IndexedDB recording restore and successful playback after reload, idempotent final preparation, invalidation after a transcript edit, no horizontal mobile overflow, and no page errors. Screenshots and the repeatable smoke script are in `output/expedition-news-network/` and `tmp/check-expedition-ui.mjs`.

**Example-video checks passed** using `tmp/check-expedition-examples.mjs`: both MP4s load and play with their expected durations; final-model chapter seeking and replay work; caption resources and byte-range requests succeed; the final model is accessible with E-C locked; student storage is identical before and after viewing; independent checks remove the example; mobile has no horizontal overflow; and no page errors occur. Both complete MP4s decoded without media errors. Extracted quotation, route, and closing frames were visually reviewed for caption and source-credit legibility. The production build passed with the pre-existing stylesheet budget warnings.

Production builds passed. Existing stylesheet budget warnings remain outside the new components. The architecture checker still reports two existing violations, neither introduced by this change: `core/index.ts` importing `./templates`, and the project-specific `projects/mystery-substance/lab-kit/render-quality.service.ts`. An earlier broad selection also caught an unrelated in-progress standards-review component test; that component was being edited separately and is not part of the 57-test result above.

**TEMPLATE_CAPABILITY_GAP resolved locally:** the existing broadcast template lacked the eight-lesson individual inquiry portfolio and a simple, gated field recording workspace. Those are now reusable optional capabilities, not copied project engines.

**TEMPLATE_CAPABILITY_GAP remaining for a classroom pilot:** authenticated teacher review, server-authoritative mastery/gates, a connected AI tutor with individual evidence evaluation, shared team synchronization, and school submission. The launcher rejects live inquiry sessions without this gateway. The next phase is to implement these capabilities behind the existing authority and persistence interfaces, then run a teacher-reviewed accessibility and curriculum pilot. Current browser checks cannot substitute for observed classroom learning outcomes.
