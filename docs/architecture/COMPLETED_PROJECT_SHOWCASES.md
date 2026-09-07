# Completed project showcases

Implemented September 5, 2026. The user’s FINAL_PROJECT_SHOWCASE_BUILD_PLAN.md was used as guidance. The former three-chapter text demo is replaced at the existing /projects/:projectId/final-demo routes.

## What teachers see

| Project | Finished presentation | Work available to inspect |
| --- | --- | --- |
| The Unlabeled Shelf | Case Closed: The Restored Shelf | Native completed case form; seven selected clues; physical, chemical, and mass comparison tables; contrary and uncertain evidence; 55% → 90% theory revision; recommendation and individual reflection |
| Frontier Trading Company | The Company Defense | Native Result / Plan / Math / Revise / Defend slides; real-engine forecast, transactions, route, river delay, repair purchase, sales, reconciled cash, and revised report |
| Objects That Changed Us | The Museum Is Open | Native corridor and museum boards; four open wings; twelve representative object illustrations; object-to-source links; four complete curator transcripts; family and teacher presentation views |
| History Live | The Finished Special Report | Native broadcast stage, three cited evidence scenes, optional scene playback, complete report transcript, producer rundown, claim-source links, review history, revised reflection |
| The Fate of the Republic | The Senate Has Spoken | Native premiere, complete arguments from both factions, moderator interruptions, evidence cards, selectable program entries, all five aggregate judgment categories, before/after opinion totals |
| Race Around the World | The Voyage We Can Defend | Native map/replay with all five chapters; exact source paragraphs; prediction/consequence; resources before/after; original and revised storm reasoning; bound scripted scaffold question; two encounter perspectives |

Every sample has a common fictional-work label, restart, project-launch exit, and “See the learning behind it” teacher guide. The guide separates first idea, evidence, consequence, feedback, revision, and teacher assessment. Builder feedback examples are labeled; they are not live grades or AI evaluations.

The trading record intentionally ends with $170.38 cash and a $29.62 full-season loss. Its $10.38 trip profit excludes the $40 wagon. A $9.50 forecast difference comes from the $4.50 repair bundle and $5 river wait. Waiting instead of taking the $24 ferry preserves $19. All displayed calculations come from the existing engine, ledger, and showcase computations. This models a mathematically defensible presentation even when the simulated company loses money.

## Architecture and reuse

History Live also offers optional presentation demonstration videos above its native sample. The reusable `SampleGuide.videos` field contains local video URLs, titles, descriptions, and optional caption tracks. The gallery never substitutes those clips for the fictional student's transcript or evidence record. See [History Live opening and research](../history-live/OPENING_AND_RESEARCH_WORKSPACE.md).

- The feature-level ProjectFinalExampleComponent is a presentation frame, not a new universal artifact renderer.
- A lazy registry in runtime/project-showcase composes six existing native capabilities. Each registration installs a disposable child environment injector, a native component, its input data, and isolated adapters.
- Curriculum records and teacher-guide content live in projects/completed-samples as typed data factories. No Angular components or services were added under project content.
- Simulation and journey samples use the actual pure engines. The simulation normalizes engine timestamps only in the fictional fixture. The journey passes the existing complete-record validator.
- Investigation receives the existing RuntimeStateSnapshot and InvestigationEvidenceItem contracts directly.
- Museum uses existing HallLocationView, ExhibitSnapshot, MuseumBoardSnapshotData, HallCorridorComponent, and MuseumBoardComponent. The new reusable ExhibitCollectionPresentationComponent composes these views; it does not render a second museum.
- Broadcast and debate retain their actual runtime services, with fixture-backed adapters. The debate composition initializes the presentation state after the runtime’s normal workspace restoration, without changing normal restoration behavior.
- Native presentation components gained optional readOnly inputs, defaulting to false. Normal student entry points preserve their existing controls and behavior. Journey readOnly mode also embeds the normally fullscreen player so the sample’s navigation remains reachable.
- ExhibitCuratorRecord is a presentation-only domain contract containing transcript and revision fields. It does not change publication snapshots or persistence formats.
- Investigation previews now render the existing optional resultMatrix and provenance/notes. Museum boards show the supporting sources attached to each object.
- Manual slide/scene/wing/evidence selection reveals and focuses the newly selected content after rendering. Automated playback does not move keyboard focus.
- No core runtime contract, scoring formula, curriculum completion gate, backend adapter, or database schema changed.

### Second-project reuse audit

The common frame and disposable-preview contract are shared across all six different templates. Investigation, simulation, broadcast, debate, exhibit, and journey remain distinct native records. Template behavior is extended through backwards-compatible inputs and one reusable exhibit composition, not project-name conditionals. No new core plugin or alternate game/replay engine was needed.

### Storage and authority isolation

The final-demo route already uses a local preview context instead of resolving an authenticated student session. It now also omits the browser opening-persistence provider entirely.

Sample persistence returns structured clones and ignores saves/clears. Restart destroys the preview and creates fresh sample data; it never clears browser storage. Optional authority, media, tutor, and simulation-session dependencies are explicitly shadowed with null where applicable. The debate session adapter rejects mutations and media uploads. No Firebase session adapter, shared browser adapter, BroadcastChannel, upload service, or AI provider is installed for these samples.

Read-only UI hides submission, editing, scene-inclusion, voting, reflection-save, audience-reaction, and teacher-authority actions. Local playback, chapter selection, print, evidence inspection, and aggregate-result reveals remain interactive. The Senate ballot is unreachable in the sample; ending playback redirects to aggregate results. Fictional raw ballot identifiers are never rendered as individual votes.

## Intentional adaptations to the guide

- The common entry immediately displays the finished native artifact. The teacher thinking trail is an optional adjacent guide rather than a compulsory new presentation player.
- Existing controls provide self-paced exploration; the newsroom has an optional ten-second scene sequence, the journey retains its configured playback, and the Senate retains its existing proceeding playback.
- Completed speech is supplied as full fictional transcripts. No fake recording URLs, unavailable videos, or “playing” placeholder videos are shown. The actual players still support recordings when a project has real media.
- The museum uses the existing illustrated corridor and four local native boards. It does not depend on the prototype remote MetaSteps iframe. Twelve new code-native SVGs depict representative object types, not claimed photographs of specific excavated artifacts.
- The lab’s completed draft remains in the native open inspection state; the submitted-success state would hide its work. Its label makes clear that it is completed sample content, not an actual submitted student record.
- Class persuasion and simulation scores are distinguished from teacher mastery judgments. The Senate shows 7/12 (58%) versus 5/12 (42%) for “most persuasive today,” without a student winner/loser leaderboard.

## Files added

- src/app/shared/project-intro/completed-sample-guide.ts
- src/app/runtime/project-showcase/completed-sample.ts
- src/app/runtime/project-showcase/completed-sample.registry.ts
- src/app/runtime/project-showcase/{investigation,simulation,exhibit,broadcast,debate,journey}.sample.ts
- src/app/runtime/project-showcase/completed-samples.spec.ts
- src/app/projects/completed-samples/{investigation,simulation,exhibit,broadcast,debate,journey}.sample-data.ts
- src/app/templates/exhibit-hall/ui/exhibit-collection-presentation.component.ts
- public/exhibit-hall/sample-objects/*.svg (12 representative object illustrations)
- scripts/check-final-showcases.cjs
- This report

## Files modified

- features/project-intro/project-final-example.component.{ts,html,scss}: replaced generic text chapters with the native preview frame.
- features/project-intro/project-intro.component.spec.ts: replaced the old chapter assertion with native-sample inspection, restart, and storage isolation.
- runtime/project-launch/project-host.component.ts: excludes opening persistence from final-demo providers.
- templates/investigation/ui/final-investigation.component.{ts,html,scss}: optional read-only mode, data-rich evidence previews, focus, and standalone sample contrast.
- templates/simulation-decision/ui/pages/final-showcase.component.{ts,html}: optional read-only sample wording and focus after slide changes.
- templates/exhibit-hall/domain/exhibit-types.ts: typed curator presentation record.
- templates/exhibit-hall/ui/museum-board.component.{html,scss}: per-object supporting sources.
- templates/history-live/ui/broadcast-player.component.{ts,html,scss}: optional read-only mode, local scene playback, completed-package inspector, and responsive evidence display.
- templates/debate-studio/ui/debate-showcase.component.{ts,html,scss}: optional read-only mode, selectable entries/evidence, aggregate-result path, and mobile source visibility.
- templates/journey-replay/ui/journey-replay-player.component.{ts,html,scss}: optional embedded read-only mode, manual focus, and the completed Captain’s Log inspector.
- docs/architecture/PROJECT_LAUNCHES.md and docs/build/04_COMPONENT_CONTRACTS.md: synchronized presentation capability documentation.

The repository contains substantial pre-existing changes. This list identifies this showcase work, not the entire working tree.

## Validation

- npm test -- --watch=false: **64 files, 300 tests passed**.
- Fourteen new tests cover registry failure, complete evidence, deterministic ledger/forecast reconciliation, all museum sources/tours, broadcast provenance and revision, all Senate turns/categories, canonical journey validation and question binding, clone isolation, and all six native components with zero browser-persistence calls.
- The launch integration test now checks native sample rendering, teacher-guide disclosure, fresh injector on restart, and preserved storage.
- npm run build: passed. Initial bundle remains approximately **284 kB raw**; native sample registrations are lazy loaded.
- Browser audit: all six native views at 1440px and 390px, no page overflow, no broken images, no browser exceptions, no mutating network requests, and unchanged localStorage/sessionStorage through exploration and restart. Tested evidence filters/tables, every trading slide, all four museum wings, teacher mode, newsroom scenes, Senate judgment reveals, and the revised storm/encounter log.
- Browser evidence: tmp/showcase-audit/results.json and twelve desktop/mobile screenshots (ignored generated outputs).
- Architecture check reports the same two pre-existing findings: core/index.ts → ./templates and projects/mystery-substance/lab-kit/render-quality.service.ts. No showcase file is reported.
- Existing build warnings remain for six unrelated oversized component styles: reaction bench, mystery investigation, simulation shell, market, event decision, artifact composer.

## Capability gaps and next phase

No blocking TEMPLATE_CAPABILITY_GAP for the local completed-sample showcase. The adapters and native renderers support this scope.

Actual student recordings, authenticated teacher evaluation, classroom assignment/publishing, and live AI tutoring are separate integrations. The scripted journey question explicitly demonstrates the response-bound advisory contract without pretending a tutor is connected. The museum uses representative types and source reading links; a classroom-specific curatorial package can replace these with precise accession records and approved recording assets.

Recommended next phase: teachers review the sample rubric evidence, then supply approved audio/video or real anonymized exemplars and connect the existing authoritative assessment/tutor adapters. Do not promote fictional demo records into real student submissions.

## Museum reading links

The sample uses the existing curriculum’s object interpretations and gives visitors supporting reading from [The Met’s educator resource](https://resources.metmuseum.org/resources/metpublications/pdf/The_Art_of_Ancient_Egypt_A_Resource_for_Educators.pdf), [The Met’s Daily Life bulletin](https://resources.metmuseum.org/resources/metpublications/pdf/The_Daily_Life_of_the_Ancient_Egyptians_The_Metropolitan_Museum_of_Art_Bulletin_v_31_no_3_Spring_1973.pdf), the [Australian Museum’s afterlife overview](https://australian.museum/learn/cultures/international-collection/ancient-egyptian/the-underworld-and-the-afterlife-in-ancient-egypt/), and [UCL’s stoneworking reference](https://www.ucl.ac.uk/museums-static/digitalegypt/stone/working.html). The illustrations are not evidence of a particular excavation or shared provenance.

