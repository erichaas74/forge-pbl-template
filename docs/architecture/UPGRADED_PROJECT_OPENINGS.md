# Five project openings: play, reveal, and a personal mission

Implemented September 5, 2026. Extends the earlier [project launches](PROJECT_LAUNCHES.md) and [Professor Pip opening](PROFESSOR_PIP_OPENING.md). All six built-in projects now have a scene before the existing reflection questions. Open `/projects` in the local preview to explore them.

## Student experience

These are short, self-paced practice openings designed around one choice and a reveal. The 2–3 minute target includes watching or listening, reading, choosing, and the mission handoff; students are not locked into a timer.

| Project | Opening | Reveal | Handoff |
| --- | --- | --- | --- |
| Frontier Trading Company | Hear or read returning trader Rowan’s tale of opportunities along the route, courage, and careful calculations. Continue to choose two supplies with 30 practice coins, then work out their cost. | The two configured market offers combine into total cost, sales, profit/loss, and remaining cash. | A company charter invites students to build a ledger and strategy defense. |
| Objects That Changed Us: Ancient Egypt | Choose an illustrated scribal palette or shabti and switch on its spotlight. | An object detail leads to a bigger historical question and a museum source. | An empty exhibit invites the student to curate a museum wing and lead a tour. |
| History Live | An imagined Boston waterfront after the Tea Party shows protesters, a Loyalist, a merchant, and workers. Choose a person and write an investigative question. | Each lead opens a historical question with a link to the source chronology. | A correspondent’s desk invites a researched, recorded special report. |
| The Fate of the Republic | Two illustrated, fictional senators make opposing claims, with optional voices and a brief gesture animation. | The challenged senator acknowledges the missing part of his argument. | The clerk offers the learner a seat and a source-based Senate address. |
| Race Around the World | The uploaded launch video plays without route overlays, then switches to a fictional chart with its own aligned route lines, departure, destination, and supply harbor. A chart shortcut supports skipping the video. | Separate outcome clips show headwinds or a supply harbor, with different time costs and next concerns. | A world chart invites a saved route replay with the captain’s explanations. |

Humor targets the situation and the overconfident guides: the mule eating paperwork, the merchant’s tiny “probably,” dramatic Senate gestures, and an ocean that did not read the chart. Outcomes are explicitly practice scenarios. They do not spend official money, preselect an expedition route, assign a news network, determine a debate position, or count as assessed activity completion.

The original reflection questions follow the scene. Teacher final-example links remain visible above and below the opening, and the existing final-demo walkthroughs remain read-only.

## Media and factual grounding

- New SVG illustrations include teaching objects, two senators, their reserved seat, and three sailing scenes. CSS/SVG animations support reduced motion.
- Five local WAV clips provide synthesized Senate dialogue, generated from the same JSON used for captions. Lucius uses Microsoft David Desktop; Cassius uses the same voice at a slower rate; the clerk uses Microsoft Zira Desktop. These are synthesized performances, not recorded actors.
- History Live now opens with `public/history-live/boston-tea-party-aftermath-v1.png`, an explicitly imagined illustration. The three original demonstration MP4s and the silent captioned montage have moved to `public/history-live/final-presentations` and are linked from the final-demo page. See [opening and research implementation](../history-live/OPENING_AND_RESEARCH_WORKSPACE.md).
- Three new voyage WebMs are rendered from the code-drawn ship, waves, clouds, and harbor illustrations. They are stylized animated scenes, not live-action or AI-generated cinematography.
- Four new videos total about 3.65 MB; five Senate narration clips total about 3.0 MB. Clips use `preload="none"`; sound and video begin only on request. Caption tracks and all scenario text remain available. Failed video has an explicitly configured illustration/transcript fallback; failed narration returns to the visible dialogue.
- The museum’s palette interpretation is grounded in [The Met’s scribal palette record](https://www.metmuseum.org/art/collection/search/560805). The shabti interpretation is grounded in [The Met’s shabti record](https://www.metmuseum.org/art/collection/search/329774). New object drawings are labeled teaching illustrations, and each reveal links to its museum record.

## Architecture and reuse audit

The original `illustrated-comparison` plugin remains unchanged. A new registered `decision-scene` plugin supports cargo, artifact, council, dispatch, and navigation presentations. Project names, dialogue, assets, prices, consequences, source links, and mission copy live in five versioned configuration files. The renderer has no project-ID branches.

`ProjectTeaserConfig` adds a union member, `DecisionSceneConfig`, with validated local media, choices, outcomes, optional narration, optional load/spotlight transitions, and a mission handoff. `OpeningMediaComponent` is a reusable request-to-play video/illustration renderer with cancellation and error handling. No core contract, template engine, official resource calculation, database adapter, or dependency was changed for these openings.

The existing registry, dynamic teaser host, intro runtime, save queue, scoped browser adapter, session context, and immutable accepted-response history are reused. The parent replay label now supports any registered scene instead of assuming a scientist character.

The optional `ProjectTeaserResult.choiceId` preserves compatibility with older comparison receipts. Completion or skip records the scene ID/version, time, selected choice when there is one, and only evidence already revealed. Skipping during the load/spotlight transition records the choice but no unshown outcome. Replay and destruction cancel transitions and narration. A completed handoff emits once.

The parent saves before advancing to reflection. Save failure keeps the existing retry flow. Reload offers a replay instead of forcing the scene again. Replaying another branch does not replace the previously saved receipt or accepted opening. The saved-opening history now also displays the scene choice and revealed evidence.

The receipt is ungraded preview evidence, suitable for a future tutor to interpret alongside the matching configuration and subsequent student reasoning. This does not implement an AI tutor, cloud synchronization, or teacher assessment integration.

## Files added

- `src/app/shared/project-intro/decision-scene.models.ts`
- `src/app/plugins/intro-scenes/decision-scene.component.ts`, `.html`, `.scss`, `.spec.ts`
- `src/app/plugins/intro-scenes/decision-scene-themes.scss`
- `src/app/plugins/intro-scenes/opening-media.component.ts`, `.spec.ts`
- `src/app/projects/intro-scenes/frontier.teaser.ts`, `museum.teaser.ts`, `newsroom.teaser.ts`, `senate.teaser.ts`, `voyage.teaser.ts`
- `src/app/projects/intro-scenes/senate.dialogue.json`
- 23 assets under `public/project-intros/objects/`, `senate/`, `newsroom/`, and `voyage/`
- `scripts/generate-opening-media.cjs`, `check-upgraded-launches.cjs`, `inspect-intro-media.cjs`
- This implementation report.

## Files modified

- `src/app/shared/project-intro/project-teaser.models.ts`: optional decision receipt and scene union dispatch.
- `src/app/runtime/project-launch/project-teaser.registry.ts` and `.spec.ts`: renderer registration and validation coverage.
- `src/app/projects/project-intros.ts`: attaches all five scene configurations.
- `src/app/features/project-intro/project-intro.component.ts`, `.html`, `.spec.ts`: generic replay labels, recorded scene display, persistence/replay coverage.
- `scripts/generate-intro-voices.ps1`: supports the Senate manifest and still supports Professor Pip.
- `docs/architecture/PROJECT_LAUNCHES.md` and `PROFESSOR_PIP_OPENING.md`: extension references.

The working tree contains unrelated work; this list identifies only this extension’s changes.

## Verification

- Production Angular build: **passed**. Initial bundle approximately 284 kB raw; media remains separate from JavaScript.
- Full Angular suite: **63 files, 286 tests passed**.
- New/updated tests cover all presentation types, validation, missing captions, duplicate choices, malformed receipts, branch-specific evidence, transition cancellation, skip before/after reveal, single completion, media playback/error fallback, audio cancellation, save/reload, and replay preservation.
- An isolated-browser audit exercised **all 11 branches**, keyboard activation, all four videos and their caption tracks, optional Senate voice activation, mission handoffs, saved receipts, reload, replay of a different branch, and read-only teacher demos. No page errors or broken opening images were found.
- All five openings passed a 390px phone-width overflow check with reduced motion enabled. Desktop and mobile screenshots were visually reviewed. Video controls and reveal banners were separated after the visual review identified a caption overlap.
- Reproducible browser results/screenshots are written to ignored `tmp/launch-audit/` by `scripts/check-upgraded-launches.cjs`.
- The same six pre-existing stylesheet-budget warnings remain outside the new scene files.
- The architecture checker still reports the same two findings outside this extension: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` residing in project content. No new launch file is flagged.

## Authoring

The browser authoring and audit scripts require Playwright. Set `PLAYWRIGHT_MODULE` to a local Playwright package path when it is supplied by a workspace runtime rather than installed in the project. They connect only to the local preview server and do not transmit media externally.

```powershell
node scripts/generate-opening-media.cjs --illustrations-only
node scripts/generate-opening-media.cjs
powershell.exe -NoProfile -NonInteractive -Sta -File scripts/generate-intro-voices.ps1 -Manifests senate
node scripts/check-upgraded-launches.cjs
```

The media script confines output to the workspace’s `public/project-intros` directory. The voice script confines output to `public`. Windows speech and headless Chromium required the approved local authoring commands to run outside the sandbox in this environment.

## Deviations, capability gaps, and next phase

No breaking schema change or missing capability for the requested five openings. The chosen video format is a classroom montage for History Live and code-drawn animation for the voyage. Actor-recorded voices and cinematic replacement clips can use the same media contract later.

Existing `TEMPLATE_CAPABILITY_GAP`: authenticated school-wide persistence and tutor/final-assessment consumers remain separate work, as documented in `PROJECT_LAUNCHES.md`. Opening receipts currently save on this browser.

Recommended next phase: observe a few students using the openings, check whether the decision/reveal fits their reading pace, and tune the scripts before recording professional voices or longer footage.

## Returning trader prologue · September 6, 2026

Frontier opening version 1.2.0 adds a story before cargo selection and arithmetic. Rowan returns from the route, describes different towns’ needs and a costly rain detour, and invites the student to start a company with courage and careful thinking. The generated illustration is `public/project-intros/frontier/returning-trader-v1.png`. Three local WAV clips are synthesized with Microsoft David Desktop from the same `frontier.dialogue.json` text displayed on screen; regenerate with `powershell.exe -NoProfile -NonInteractive -Sta -File scripts/generate-intro-voices.ps1 -Manifests frontier`.

The optional `DecisionSceneConfig.prologue` contains a title, setting, media, one to six caption-matched dialogue lines, and a continue label. The existing decision renderer and audio player are reused; other projects retain their current first choice. The story has no timer or autoplay requirement, and a narration failure leaves the complete text readable. Continue stops narration and focuses cargo selection. Restart returns to the story; skipping it records no trade evidence or invented math attempts. Validators and component tests cover the new optional field, sequencing, audio cancellation/failure, focus, replay, and existing calculation flow. No core runtime or receipt schema changes, architecture deviations, or new capability gaps. Next phase: classroom review of the story’s reading pace.

Files added for this change: `frontier.dialogue.json`, `returning-trader-v1.png`, and `returning-trader-1.wav` through `returning-trader-3.wav`. Files updated: `frontier.teaser.ts`, `decision-scene.models.ts`, the decision scene component’s TypeScript/HTML/SCSS and spec, the teaser registry spec, the project intro component spec, the narration generator, and this document. Production build and all 28 focused tests in four files passed. Prettier checks passed. Browser review verified the illustration, request-to-play narration, story-to-cargo handoff, a correct cost answer advancing to remaining cash, and restart. Existing stylesheet budget warnings and the two previously documented architecture checker findings remain outside this change.

## Budgeted cargo and video-to-chart extensions

DecisionSceneConfig now accepts optional cargo (startingCoins, capacity, vehicleImage, vehicleAlt), with typed name/cost/sale values on each choice. Validation rejects invalid prices, unsafe asset paths, and unreachable capacity. Existing single-choice scenes keep their original flow. CargoWagonComponent accepts only presentation inputs and reuses existing wagon and supply artwork without a simulation-runtime dependency. The pure cargoTotals/cargoOutcome helpers aggregate practice offers. Receipts retain the first choiceId for compatibility and preserve every traded item in observations; unloaded or skipped-before-market items produce no market evidence. These practice coins do not change official simulation resources.

Optional afterVideoMedia replaces the launch video after OpeningMediaComponent emits playbackEnded; replay restores the video. OpeningMedia.fit supports contain for a complete chart at any viewport. The practice-chart.svg owns both geography and route paths, so independent overlay coordinates cannot drift. Both project opening versions are 1.1.0; receipt/core schemas and other templates remain compatible. No capability gaps or architecture deviations.
