# Narrative Studio 1.3

## What this template adds

`narrative-studio` is a reusable individual creative-writing template. Survival Island Story Lab is
its first configuration package; no Survival Island behavior is embedded in the template runtime.

The learner experience begins with one opening and two blank choices leading to unwritten scenes. The map stays in the left half of the workspace while writing, planning, playtesting, and publishing use the right half. Narrow screens stack the map above the story and reveal the selected editor. Guided
planning is available when a student wants it, but it is not required before drafting or publishing.

The learner experience includes:

- optional Story Notes that hold student-approved canon when the student wants that support;
- an optional planning conversation that asks one question at a time and saves each answer in the
  student’s own words;
- a configuration-driven historical launch with sourced event choices, fictional-role prompts, and
  explicit boundaries around facts the student must preserve;
- a configuration-driven story graph rendered as a family-tree diagram where every non-ending scene
  asks one decision question, exposes exactly two options, and draws numbered, color-matched
  connections to their destinations;
- scene drafting beside the live map, direct choice-to-scene navigation, explicit save-and-choose-next checkpoints,
  debounced browser persistence, and revision history;
- a replaceable writing-coach adapter that can question, suggest possibilities, add pressure, and
  check craft without writing into the student's draft;
- a storm-pressure mechanic supplied entirely by project configuration;
- playable path testing with distinct ending records; and
- a publication gate and immutable playable-story snapshot.

## AI boundary

The local preview uses `LocalNarrativeCoachAdapter`, a deterministic fake-chat demonstration of the
coach contract. It never writes scene prose or chooses a plot event. During planning, six
configuration-driven questions collect the student’s character, goal, fear, relationship, object,
and mystery ideas. Each answer is saved verbatim into Story Notes. During drafting, the coach asks
contextual follow-up questions based on the selected scene and current word count.

A classroom host can later provide a moderated LLM-backed
`NarrativeCoachAdapter`; the model receives the selected scene, story bible, requested coaching
tool, stage, historical boundary, next planning question, and recent conversation, then returns one
question or piece of advice. Student text remains the only source of story canon and prose.

The selected historical setting is also included in the coach request. The coach can use its event,
survival pressure, and accuracy boundary to ask historically aware questions without impersonating a
real person or silently rewriting established facts.

Do not give an AI adapter direct access to persistence or runtime mutation. Production adapters
should also apply school policy, age-appropriate content controls, rate limits, prompt-injection
defenses, and auditable request metadata at the server boundary.

## Package reuse

New branching-writing projects can reuse the template by supplying a project config with story-bible
prompts, storm or pressure stages, node blueprints, choice destinations, coach language, and rubric
criteria. A package can also supply three or four historical launch settings with source links,
fictional roles, dramatic opening lines, and accuracy boundaries. Publication validation rejects a
missing historical anchor, unknown destinations, unreachable scenes, ending nodes with outgoing
choices, repeated choice labels, incomplete scenes, and insufficient playtesting. Blank optional
planning answers and Story Notes do not block publication.

## Current boundary

The built-in launcher is a local preview and persists a student-scoped draft in browser storage. It
does not claim authenticated classroom storage or a live generative-AI connection. Those adapters
belong at the host boundary and should use the existing project session context.

In the local preview, a completed decision-scene opening hands its selected history ID to the studio.
Direct links remain safe: the student can start writing from the Story Map and make or change the
historical selection later in the optional Planning Guide before publishing.

## Student branching contract (1.3)

`authoringMode: 'student-branches'` opts new drafts into the small starter. The configured graph remains the legacy blueprint; projectVersion stays at 1.2.0 to keep the existing student storage scope. Curriculum history and rubric are unchanged. Template/catalog metadata advances to 1.3. Legacy drafts without `nodes` retain the configured graph; only untouched legacy scaffolds receive the smaller starter.

Optional state `nodes` stores the authored graph. A scene without choices is unfinished until the writer adds two choices, selects “Dead end · Character dies”, or selects “Survival ending”. `endingOutcome` distinguishes death from survival. Death endings are terminal and refer to the fictional protagonist. The opening always retains its initial decision.

Ending an existing branch parks its choices in the scene’s optional `parkedChoices`; descendants, prose, labels and revisions remain saved. Restoring the continuation reconnects them. Only reachable scenes appear in the map, word totals, readiness and published graph. The existing scoped persistence adapter saves structural edits immediately; ordinary typing remains debounced. Publication snapshots include optional `nodes`, so later edits cannot change a published route. Older publications still use the configured graph.

The existing runtime service owns mutations; pure branching helpers contain no Angular or backend dependencies. Readiness detects missing destinations, cycles, incomplete branch decisions, repeated choice IDs, insufficient endings and invalid playtest paths. Text, choice and graph changes invalidate prior draft playtests. Storage validates optional graph shapes. No core runtime or backend contract changed.

The completed example supplies its own eleven-scene graph: two fatal dead ends and three survival endings, with short and longer routes. Its map and story are side by side. Author commentary belongs in publication content, not in the reusable player.

### Verification and change record

Added: `core/narrative-branching.ts`, its unit tests, and a runtime persistence/publication test. Modified: state/model/persistence contracts, runtime service, map layout/component, studio page, example player and content, catalog/launch descriptions, state/layout/sample tests, and these docs. Browser checks cover writing choices, following branches, fatal endings, adding continuations, reload persistence, and reading the sample beside its map.

The wider architecture check currently reports unrelated violations in `core/index.ts` and `projects/mystery-substance/lab-kit/render-quality.service.ts`. The wider completed-samples suite has two unrelated Journey Replay failures (`PLANNING_TARGET_REQUIRED`). No specification deviations or unresolved template capability gaps were introduced. Next phase: classroom usability review; no further implementation phase is required for this change.

Final targeted verification: all 18 Narrative Studio tests pass; the production Angular build passes. The wider completed-sample run passed its narrative content/render checks (31 passed overall, two unrelated Journey Replay failures). Browser route checks reached a fatal ending in three scenes and a survival ending in five scenes; reload preserved the edited graph and prose. The browser viewport override did not change its reported width, so the narrow-screen layout was inspected in source but not visually verified in this session.
