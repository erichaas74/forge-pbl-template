# History Live opening, presentation examples, and persistent research

Updated September 7, 2026.

## Student experience

The opening is an imagined Boston waterfront in December 1773, after the Tea Party. The generated scene shows a protester, a Loyalist civilian, a merchant, and waterfront workers. Students choose whom to question and write their own investigative question before the reveal. The illustration and confrontation are explicitly fictional. Intro and teaser versions are now 1.1.0; existing accepted opening records remain intact.

The three original MP4 demonstrations and the old opening montage now live in public/history-live/final-presentations and play on /projects/history-live-revolutionary-war/final-demo. Each has a direct video link. The montage retains its descriptive caption track. These clips demonstrate presentation formats and are separate from the fictional Riley Chen evidence package and its transcript. Original clips have no supplied speech transcripts; none have been invented.

My Work keeps a left source panel and a right event/interview panel mounted outside the changing work stage. Categories expand into lists with short factual descriptions. Records reveal attributed summaries, dates, source links, document image links where available, and pin controls. The left panel contains primary source documents and witness testimony. The right panel contains scripted interviews, dated event records under Live events, and pinned sources. Categories and expanded records survive step navigation; source pins use the existing persisted runtime. On smaller screens the two panels remain available above the workspace with bounded scrolling.

Enter the Moment is now a guide to observing creators, dates, places, words, and recorded actions. Its category buttons open and focus the corresponding side panel. It no longer presents disabled exploration tools. Source recommendations, interpretation paragraphs, and prescribed uses were removed from the source inspection view.

## Content and provenance

The research library contains four scripted Q&A records (Parker, Gage, Washington, and Abigail Adams), five dated event records, one witness deposition, and the project's primary source documents. Scripted answers are attributed summaries of the cited sources, not historical interview recordings. Live events currently contains written event records, not video footage. Secondary archival commentary is not relabeled as a primary document or witness testimony.

The artwork is an imagined composite, not a reconstruction of a documented waterfront riot. The [National Park Service chronology](https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm) describes disagreement about the destruction and the absence of disorder after the boarding parties dispersed. This guided the clear illustration label, intact ships, and omission of a street confrontation with British troops.

## Architecture

- Reused the registered decision-scene capability, intro persistence, History Live source records, source pin events/adapters, and native completed broadcast package.
- Added optional researchLibrary@1.0 configuration, validated references, and a typed research-item adapter. The project owns factual content; reusable template components own rendering.
- ResearchShelfState is scoped by the History Live page and stores only disclosure/focus state. No new learner snapshot fields or persistence vendor dependencies.
- SampleGuide.videos is an optional presentation field rendered by a shared video gallery. Other final presentation samples keep their existing behavior. Native controls support playback; starting one player pauses another.
- No core engine changes or breaking contracts. Library additions extend the existing draft curriculum without replacing learner answers or migrating their runtime records.

## Files

Added: public/history-live/boston-tea-party-aftermath-v1.png; this note; domain/history-live-research.ts and its spec; ui/research-panel.component.ts/html/scss and spec; ui/research-shelf-state.ts; projects/history-live-revolutionary-war/revolutionary-war.research.ts; shared/media/presentation-examples.component.ts and spec.

Updated: newsroom.teaser.ts; project-intros.ts; decision-scene HTML/SCSS and spec; project-final-example HTML/TypeScript; completed-sample-guide.ts; broadcast.sample-data.ts; History Live models and content validation; History Live page HTML/TypeScript/SCSS; Enter the Moment guide HTML/TypeScript/SCSS; source-wall HTML/TypeScript; related intro/runtime tests; local media-authoring paths and opening smoke-test choice count.

Moved: newsroom-report.mp4, competing-correspondents.mp4, social-report.mp4, presentation-reel.webm, presentation-reel.vtt into public/history-live/final-presentations. Video content is preserved; the descriptive VTT wording now identifies presentation demonstrations.

Also added explicit string types to existing generated-ID helper parameters in engineering-design.runtime.ts and block-builder.component.ts to resolve TypeScript build errors. These do not change runtime behavior. The isolated test scope is recorded in tsconfig.history-live-opening.spec.json.

## Verification

Tests cover source classification and references, neutral resource descriptions, an alternative project without the optional library, category expansion/focus, source pins across stages, panel identity across pitch/script navigation, the opening-to-question flow, and video playback coordination/error links.

- Production build passed: `npm run build -- --progress=false`. Nonblocking warnings remain, including the History Live stylesheet warning budget (15.52 kB against a 14 kB warning threshold).
- Focused checks passed: 42 tests across six files, using `npm test -- --watch=false --ts-config=tsconfig.history-live-opening.spec.json --include='src/app/templates/history-live/**/*.spec.ts' --include='src/app/plugins/intro-scenes/decision-scene.component.spec.ts' --include='src/app/shared/media/presentation-examples.component.spec.ts'`.
- Browser verified at localhost:4200: opening illustration and four viewpoints; both persistent panels; guide-to-category focus; an expanded witness record remaining open when moving to Question; all four final-video cards, loaded media and playback; the native completed broadcast below the gallery. Existing learner text was preserved.
- Scoped `git diff --check` passed. Responsive rules were reviewed; a narrow-screen browser pass was not performed.
- The broader project-intro suite still has four failures involving catalog/default-project and shared focus assumptions while other project work is changing concurrently. Its updated History Live headline assertion passes.
- Earlier broader completed-sample checks reported two Journey sample failures (`PLANNING_TARGET_REQUIRED`); the broadcast sample check passed.
- The architecture checker reports existing violations in core/index.ts (dependency on templates) and projects/mystery-substance/lab-kit/render-quality.service.ts (project-local service). These unrelated issues were not expanded into this task.

## Boundaries and next work

No unimplemented exploration tool is presented as working. Free-form AI character conversations and historical event video productions are not part of this implementation; the current available content is labeled scripted or written. No new required capability gaps or specification deviations. A future content pass can add further authentic witness records and captioned presentation footage through the same configuration.

## Image generation

Built-in image generation was used. Final workspace asset: public/history-live/boston-tea-party-aftermath-v1.png.

Final generation prompt:

Create one wide 16:9 cinematic historical illustration, high-resolution, for the opening of a middle-school interactive history reporting project called History Live. New image, no lettering or UI.

Subject: a chaotic, tense argument and protest on Boston's waterfront in the aftermath of the Boston Tea Party, December 1773. This is an imagined composite scene to provoke inquiry, not a literal reconstruction of a documented riot. Tea has already been destroyed. A continuous crowded harbor street and timber wharf, 1773 Boston architecture, three intact wooden merchant sailing ships with furled sails and intricate rigging beyond, loose tea and broken tea-chest pieces at the water's edge. Cold blue winter twilight, warm lantern light, damp cobbles, wind pulling coats, visible breath, dynamic overlapping crowd gestures.

Make FOUR distinct human stories legible across the foreground in a single coherent scene with no panels: a passionate colonial artisan protester in a worn wool coat gesturing toward the ships and defending resistance; a concerned Loyalist civilian in a neat Georgian coat holding folded official papers and arguing for lawful order with an open hand; a distressed merchant holding a ledger and pointing toward the ruined tea; and a working waterfront woman beside a Black dockworker, both looking between the arguing groups and the harbor with uncertainty about their livelihoods. Include more townspeople behind them, some cheering, others disagreeing or watching. People have complex, sympathetic expressions; no side is coded as wholly heroic or villainous. All faces are anonymous fictional adults, garments appropriate to 1773 Boston, natural human anatomy.

Composition: eye-level wide view as if the viewer just arrived and must decide whom to interview; readable faces and hand gestures, foreground subjects large enough to study, layered depth with harbor visible behind and gaps between clusters. Chaotic energy comes from movement, crowded disagreement, fluttering loose papers and contrasting expressions. Rich painterly realism with convincing material details, film-like light, sober documentary atmosphere suitable for ages 10-14. Keep all four perspectives inside the frame, generous edges for responsive display, no text space required.

Historical constraints: no street line of British redcoats (troops were not occupying Boston streets in December 1773), no active battle, no gunfire, no burning buildings or burning ships, no blood or injured people, no modern protest placards, no US stars-and-stripes flags, no contemporary clothes, no cameras, no microphones, no stereotyped Indigenous costume or headdresses. No readable text, titles, speech bubbles, captions, logos or watermarks.
