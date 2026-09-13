# Living scenes: enter the painting, meet people, hear their stories

Design extension · 2026-09-13 · `/projects/shadow-gallery`

This extension makes immersive encounters a central part of the [capstone game-flow plan](CAPSTONE_GAME_FLOW_PLAN.md). The first coastal encounter is now implemented: controlled viewpoints, three narrated museum chapters, five scripted questions, a canoe study, and a sourced insight returned to the audit. See [implementation, attribution, contracts, and verification](LIVING_SCENES_IMPLEMENTATION.md). The remaining scenes, simulations, and contributor performances below are proposals, not delivered behavior.

## 1. What the student experiences

**Updated activity goal:** [Restore each assigned forgery into a supported historical reconstruction](FORGERY_RESTORATION_GAME_FLOW.md). Encounters become research destinations for a selected painting detail; students return to that detail, edit it, and support the repair with evidence. The original passage-selection flow below is retained as earlier design context.

Next navigation iteration: [Story portal concepts and the exact click path](STORY_PORTAL_FLOW_IDEAS.md) proposes an obvious doorway, suggested next actions, in-scene targets, and a clear return to the painting audit. These are design proposals, not changes to the current implementation.

An **Enter the scene** control appears beside a painting’s inspection controls. The frame expands, the gallery recedes, and the student arrives at eye level inside a reconstruction of the setting. The interface becomes quiet: a location/date marker, a return control and nearby things to investigate. Sound begins only after the student chooses to enter with audio enabled.

The student is a visiting observer. They can look around, move between a few locations, approach someone, sit and listen, ask questions, watch an event and try an activity. Their perspective gives the scene immediacy without claiming that the student has assumed another person’s lived identity.

The core loop is:

**Inspect painting → enter setting → observe → meet someone → listen or ask → try an activity → save a supported insight → return to the painting → test its claim.**

Different paintings about the same setting can enter the same encounter. The choice of portal must not announce which painting is compatible. Claims from the disputed frame stay visibly separate from the source-supported reconstruction. Do not automatically animate a fraudulent claim as if it happened.

**First-person feel:** close, eye-level views; characters facing the visitor; environmental movement; voices located near their speakers; a camera that settles when the visitor sits; objects that can be brought into a close view; visible reactions to selections. Choose three to five reachable viewpoints per environment for the first release. The existing Phaser approach can support this through layered illustrations, short clips and controlled camera movement. Full free-roaming 3D is a later option if classroom testing establishes a need.

## 2. Five interactions the game should support

| Interaction | Student experience | Educational purpose | What returns to the case |
| --- | --- | --- | --- |
| Look and notice | Turn toward a garden, canoe, instrument, document or landscape; inspect a meaningful detail | Observe before accepting the frame’s interpretation | A labelled observation, clearly distinguished from source evidence |
| Sit and listen | Choose a seat and hear a short account while the scene remains visible | Follow a person’s experience and perspective across a connected story | A selected idea and its narrator/source attribution |
| Ask and follow up | Speak with a character or recorded narrator through question choices; show a relevant object or claim | Ask a question that clarifies rather than merely guesses an answer | Question/response pair and a relevant source link |
| Watch a moment | See a short event reconstruction from a fixed viewpoint; pause, replay or switch to another documented perspective | Notice sequence, circumstances and differences between accounts | Event/source relationship and a stated uncertainty |
| Try something | Manipulate a navigation tool, cargo plan, route or labelled object in a bounded simulation | Apply a familiar idea in an environment with a visible consequence | Attempt, result and explanation or revision |

A person should have a purpose in the scene beyond handing out a code. Give them work, interests and relationships supported by the authored context. Let students ask about those things even when they are not necessary for opening the next gate.

## 3. Two uses across the unit

**Explore the collection:** available during the preceding lessons. Students can spend 5–10 minutes in an environment, hear a full account, explore extra questions and replay a demonstration without heist pressure. This is where the longer teaching experiences belong.

**Final heist:** students revisit a familiar setting or hear a brief encounter that helps them apply learning. Give them a clear choice between the relevant moment, a full revisit and a transcript. Retain the requirement to evaluate the painting’s claim; watching a video does not itself solve a lock.

The 100-minute capstone budget remains a target. Replace some existing reference-reading and text-only NPC time with an approximately two-minute shore encounter, one-minute port interview and two-minute archive encounter. The remaining extended scenes are available during the unit and as optional revisits. Playtest these substitutions; do not add seven compulsory ten-minute films to the existing schedule.

Prior exploration may make a source available in the student’s reference collection. It does not automatically complete a new heist assessment. A future persistence design must explicitly distinguish durable learning references from attempt-specific decisions.

## 4. First encounter storyboard: entering the Caribbean setting

**Setting under development:** the first gallery’s Hispaniola/Caribbean context around the arrival date 1492. Exact environment, community description, clothing, built structures, spoken content and roles require source-led authoring. Use the current maize/canoe and community/place references as starting points, not a complete visual or oral-history specification.

| Beat | Experience | Student action | Learning connection |
| --- | --- | --- | --- |
| 1 · At the frame | A caption identifies the claim being tested. **Enter the scene** sits beside **Inspect details**. | Choose entry; enable voice or use captions/text | Establish the scene’s date, place and reconstruction status |
| 2 · On the shore | The viewpoint settles near the water; a few environmental details are visible | Look left/right or select a named viewpoint | Establish spatial context before receiving an interpretation |
| 3 · An invitation | A source-reviewed fictional host or an attributed contemporary guide invites the visitor to look around | Approach the work area or choose the listening place | Establish a particular speaker and their role |
| 4 · Sit and listen | The camera lowers to a seated view; a 60–90 second account plays without quiz interruptions | Listen, pause or use the complete transcript | Follow a connected account of place and community life |
| 5 · Follow a question | Two or three questions appear after a natural pause | Ask about a mentioned object, a place reference or a disputed frame label | Connect the story to a testable claim |
| 6 · Look more closely | The relevant object or source comparison opens within the scene | Inspect the maize/canoe detail or compare the catalogue label with a reference | Separate observation, interpretation and evidence |
| 7 · Save an insight | A small field card asks what changed in the student’s understanding | Select the relevant claim, source and relationship | Earn evidence through reasoning, not elapsed playback time |
| 8 · Return | The gallery frame reappears with the insight attached | Correct or defend a painting’s label | Apply the encounter to the heist |

**Example visitor questions:**

- “What would you like a visitor to notice about this place?”
- “Can you tell me more about the object you mentioned?”
- “This frame calls the community Inca. What reference can help me check that label?”
- “What does the 1492 date describe, and what does it leave out?”
- “Which part of this scene comes from a historical source, and which part was reconstructed?”

A period character answers only within the scope of the authored role and time. Questions about later history, contemporary identity or how the reconstruction was made route to the modern guide/source view. Do not make a character in 1492 narrate future events as personal knowledge.

**Draft interaction line, original interface fiction:** “You can look around first, or sit here and listen.” This is an example of tone, not a historical quotation or a proposed Indigenous oral tradition. The historical account itself must be selected or authored with appropriate contributors before performance production.

**Evidence check on return:** “The painting claims European horse herds were established before contact. Which reference can test that timing?” The expected reference remains `exchange-origins`. The student must not receive credit for reasoning that horses were absent from our animation, therefore absent from history. Similarly, the presence of a canoe in a reconstruction is not an independent source corroborating the same reconstruction.

## 5. Story time is a distinct mode

The listening place should feel different from inspection. Show a welcoming seat or position appropriate to the specific authored environment; settle the camera, reduce the interface and let an account unfold. Do not make a fire circle the default for every community or treat a staged story space as a documented custom.

**Story structure:**

1. A brief introduction identifies the speaker, setting and kind of account.
2. A 60–120 second chapter follows one connected experience or idea.
3. At a natural pause, the student can continue, ask about something mentioned, or revisit an object.
4. The closing prompt asks what the account helps establish and what further evidence would be needed.

Use different account types with visible attribution:

| Account type | Presentation | Example use |
| --- | --- | --- |
| Recorded contemporary account | Named speaker, community/affiliation as self-described, recording date and source | A contributor discusses heritage, interpretation or a continuing relationship to place |
| Documented historical account | Identified author/speaker, date, context and any translation/adaptation | Students hear an attributed account of a voyage or event and consider that observer’s perspective |
| Historical reconstruction | Explicit reconstruction label and sources; character identified as fictional/composite | A bounded encounter explains a sourced object or practice through authored dialogue |

A documentary retelling can present an event that occurred without pretending that we possess a recording or verbatim dialogue from that moment. If multiple accounts exist, make their perspectives available as separate attributed chapters. If a viewpoint is missing from the surviving evidence, say so instead of manufacturing testimony to fill the gap.

Useful story-time questions include:

- “What mattered to the speaker in this account?”
- “Which detail changed how you understood the painting?”
- “What did the speaker witness or know directly?”
- “Which question would this account be unable to answer?”
- “What would you ask next?”

Do not interrupt every few seconds to check recall. Let the account function as a story. Pause/skip-to-transcript controls remain available, and there is no reward for leaving audio playing while disengaged.

## 6. Interviews that feel like conversations

The visitor approaches a person and starts with an invitation such as **Ask about the voyage**. The character turns toward the visitor, responds, and gives a small reaction when shown a relevant record. The transcript stays available in a compact expandable panel.

**Conversation pattern:** opening question → authored response → two relevant follow-ups → optional “show a record” action → clarification → saved insight. Branches can merge after the clarification so the writing remains manageable and the player can explore without being trapped.

For the first release, use authored questions and responses. Later, a typed or spoken question can match a supported topic and disclose the topic it selected. Speech input is optional. An unsupported question receives an honest response and nearby topic choices. Do not fill historical gaps with unconstrained generated testimony.

**Example: Lisbon departure interview, 1497**

| Visitor question/action | Authored response purpose | Source relationship |
| --- | --- | --- |
| “Where is this expedition setting out from?” | Identify Lisbon as the departure point | `port-voyage` |
| “Which crown sponsors the voyage?” | Identify Portugal | `port-voyage` |
| Show the 1607 departure label | Let the student compare its date with the expedition reference and current scene context | Contradiction concerning the same departure event |
| “When will the expedition arrive in India?” | A period character can state an intention or uncertainty, not a known future outcome | A later archive chapter supplies the documented 1498 arrival |
| “How can I connect this register to the map?” | Invite the student to compare place, sponsor and event fields | Supports the expedition-atlas assembly |

These are authoring purposes, not finished historical quotations. The clerk is a fictional role unless a suitable documented individual/account is selected. Different characters need not agree or possess identical knowledge, but their disagreements must follow the source/fiction boundary.

## 7. Environments and encounters across the game

| Gallery | Enterable environment | Encounter or story | Activity inside the scene | What it contributes |
| --- | --- | --- | --- | --- |
| First encounter | Source-reviewed Caribbean coastal setting associated with the first-room claim | Local-life account, visitor questions, contemporary interpretation chapter | Inspect an object and compare a frame claim with its reference | Coastal context and the distinction between arrival and the beginning of history |
| Navigator’s workshop | Portuguese navigation workspace around 1500 | A fictional craftsperson/guide explains the instrument display | Handle a compass model, inspect an astrolabe, compare labelled development periods | Technology-period evidence and a physical sense of the instruments |
| Departure port | Lisbon quay/register station in the 1497 departure context | Interview a source-bounded clerk or hear an attributed expedition account | Assemble the departure record while observing preparations | Date, sponsor and distinction between departure and later arrival |
| Cargo market | Clearly labelled interpretive exchange display, with time/place specified for each vignette | Short accounts about an object’s route and how a label can misstate its origin | Place goods, trace an origin/destination arrow and test the recovery cart | Origin versus later distribution; the load plan |
| Route hall | Voyage-map viewpoint and a separate fictional museum-crossing station | Hear an attributed journey account if one is selected; observe a schematic voyage sequence | Plot waypoints and operate a bearing/scale model | Connection among map, chronology and practical mathematics |
| Community archive | Source-reviewed Andean landscape and object context, distinct from the Caribbean setting | A particular contributor/guide discusses place, interpretation and continuity | Inspect terrain/object labels and repair a misplaced community caption | Regional evidence and the limits of identifying people from appearances |
| Treaty room | Reconstructed document room and a separate contemporary interpretation station | Document account explaining the agreement’s participants and claims | Compare seals, date and interpretive labels | Agreement between crowns versus claims about others’ consent |

The Inca/Andean and Taíno/Caribbean content needs separate source packages and voices. A generic “Indigenous village” or a single interchangeable narrator would undermine the purpose of this layer. Select exact community descriptions from the chosen sources and contributors. Contemporary speakers are introduced in the present rather than disguised as ancient witnesses.

Do not supply exact ceremony, sacred-story, language, daily-life or environmental details simply because they seem plausible. The content brief for each scene must identify what is documented, what is a teaching simplification and what remains to be authored. The broad sources below guide the approach; they do not authenticate every proposed scene detail.

## 8. Small simulations within the encounter

Keep simulations bounded and understandable. The visitor needs to see what they changed and what happened.

- **Compass demonstration:** rotate the arm; compare a fraction of a circle with degrees; see a gate or model route align. The final heist later applies the rule to a new bearing.
- **Cargo preparation:** place objects, see mass totals change, and choose an equipment load that fits the stated capacity. The cart is a fictional recovery device, not a claim about historical transport engineering.
- **Route comparison:** select waypoints and watch a schematic route illuminate; explain which expedition record fits. Mark the map as schematic when distances are not to scale.
- **Object investigation:** rotate or enlarge a sourced object depiction, inspect labelled features and ask what the object can establish. The model is an interpretation unless its source documents otherwise.
- **Event sequence:** watch two short source-attributed moments, then connect them on a timeline. Present arrival and departure as different events even when a dramatic scene makes them feel close together.

Avoid turning uncertain historical outcomes into falsely precise simulation results. A classroom “what if” activity carries its own label and assumptions, separate from the event reconstruction. Student choices can change the demonstration or their investigation path; they do not silently rewrite the historical record.

## 9. How encounters feed the heist

The notebook gains **Encounter cards** alongside the running fraud-clue list. A card records:

- Scene, place, time context and encounter ID.
- Speaker or narrator, role, account type and attribution.
- A bookmarked moment or selected response, linked to its transcript section.
- The underlying source and the precise claim it helps test.
- The student’s relationship selection: supports, contradicts or does not establish.
- An insight or revision, and the final record set it contributes to.

Keep **visited**, **account accessed**, **insight recorded** and **reasoning checked** separate. Media completion is not proof of understanding. Repeat visits do not generate extra evidence rewards or duplicated log entries; meaningful new questions and revisions may extend the record.

In the final vault, the student can reopen the relevant story moment beside a record. A wrong label can be traced back to the question or source that resolves it. A person’s voice should remain attached to their contribution, rather than being reduced to an anonymous clue number.

## 10. Sources and voices

The source approach follows the emphasis on distinct Native perspectives and living communities in the Smithsonian National Museum of the American Indian’s [Native Knowledge 360° Essential Understandings](https://americanindian.si.edu/nk360/about/essential-understandings). That framework supports the design direction; it is not a script or a license for a character performance.

The Smithsonian’s [Taíno: Native Heritage and Identity in the Caribbean](https://www.si.edu/exhibitions/taino-native-heritage-and-identity-caribbean-event-exhib-6313) also provides a useful starting point for contemporary Taíno perspectives and continuity. Treat the linked page as an exhibition record, not an assertion that the exhibition is currently on view. Specific oral accounts, images and performances still need their own attribution and permitted use.

For each finished encounter, commission or select the actual account and narrator, develop the historical script with relevant expertise, and establish how that contribution may be recorded and used. A generic synthetic voice should not be presented as a real community member or a recorded historical witness. Do not imitate a living contributor’s voice without their authorization. Generic prototype guide lines can use a clearly identified fictional narrator.

The interface should make attribution easy to inspect with a small **About this account** control. Show the brief reconstruction/account label on entry; keep longer production details in that expandable view. This lets the encounter stay immersive while giving students the context needed to interpret it.

## 11. Authoring packet for each scene

Before generating production art or recording a historical performance, assemble:

| Item | Required detail |
| --- | --- |
| Scene brief | Location, period, learning purpose, three to five viewpoints and spatial layout |
| Source map | Each important historical statement/visual detail, supporting source and limits |
| Speaker brief | Identity/role, contemporary or period context, documented or fictional status, knowledge boundaries |
| Story script | Opening, connected chapter, natural pauses and closing question; quotations separated from adaptations |
| Interview graph | Questions, responses, follow-ups, merged branches, unsupported-question response |
| Activity specification | Inputs, visible effects, valid outcomes, hint/recovery path and evidence output |
| Media packet | Environment layers, character motion/clip, ambient sound, voice, captions, transcript and description |
| Attribution record | Creator/contributor, source and allowed uses for each performance or asset |
| Assessment link | Which source-backed relationship the encounter helps test and how the student demonstrates it |

A missing historical account is an authoring task, not a reason to invent a fake quotation. The prototype can demonstrate timing, camera, controls and interaction with clearly fictional guide dialogue while the historical performance is developed.

## 12. Reuse and implementation boundaries

The gallery already has a lazy Phaser scene, painting inspection, a notebook, locks, local practice, replay and an audit projection. Relevant adjacent contracts exist:

- `src/app/shared/project-intro/decision-scene.models.ts` describes media, voiced dialogue, prologues, choices and consequences. These are useful patterns; the opening contract is not already an explorable encounter runtime.
- `src/app/templates/investigation/npc/npc-contracts.ts` describes scripted questions, responses and evidence output. Inspect registry/runtime integration before promising drop-in reuse in the gallery.
- `src/app/templates/history-live/ui/evidence-scene.component.ts` presents sources with attribution. It provides a source-presentation pattern, not a first-person environment.

The earlier master design excludes free-roaming first-person movement and a full 3D engine. This extension introduces a first-person-style encounter experience through controlled viewpoints and 2D/2.5D presentation, which fits the existing rendering direction. The user’s latest design requirement establishes immersive encounters as part of the scope. If free roaming later becomes a requirement, evaluate that change explicitly rather than silently replacing the renderer.

```text
TEMPLATE_CAPABILITY_GAP

Requested: Enter a painting, navigate authored viewpoints, meet a speaker, listen to a chapter,
ask follow-up questions, play an activity and return evidence to the gallery.

Reason: The current gallery has no encounter-session model, scene/dialogue coordinator,
attributed story chapters or event path from an encounter into the evidence record.

Suggested reusable capability: A registered historical-encounter activity with interchangeable
scene, story, dialogue and simulation presenters. Configuration supplies places, voices,
chapters, questions, source mappings, objectives and return destinations. Runtime events
record meaningful questions, bookmarks, activity results and evidence links through existing
adapters. Keep curriculum names out of generic services.
```

Only the runtime can grant evidence or complete an assessment; the camera and media player cannot. Use existing event/command conventions and inspect the registry before selecting public IDs. Domain logic stays independent of Angular, Phaser and the speech/video provider.

Save entry/return points, chapter checkpoints, accepted questions, meaningful activity attempts and earned insights. Keep gaze movement, animation frames and playback position changes local; an explicit pause/exit may save one playback checkpoint. Leaving a scene pauses its audio and simulation. Restoring a save must not replay rewards or unexpectedly start sound.

Use the current scoped local-practice adapter for the first pilot. Separate durable reference access from attempt-specific outcomes before carrying earlier lesson encounters into a heist attempt. Shared multi-device encounters or official grades continue to need authenticated, authoritative adapters.

## 13. Delivery sequence and checks

1. **One reusable encounter shell:** enter/return transition, eye-level viewpoints, one speaker position, seat/listen mode, captions/transcript and simple question branches. Use clearly labelled prototype content.
2. **First complete coastal encounter:** approved source map, finished story/voice, one observed object, two follow-ups and an insight that changes the first painting analysis. Make the full loop work before building seven environments.
3. **Port interview and workshop demonstration:** prove the same shell supports a conversation and a manipulable activity with different content.
4. **Andean and treaty perspectives:** add separately authored source/voice packages, a supported limitation question and source-attributed event playback.
5. **Unit exploration and heist revisits:** expose the extended library, introduce short heist entry points and integrate encounter cards with the final vault.

Acceptance checks:

- Students can enter, look around, sit, listen/read, ask, interact, save an insight and return using keyboard or touch.
- Character responses follow the speaker’s authored knowledge and time context; period characters do not know later outcomes as personal experience.
- Reconstruction, documented account and contemporary commentary have accurate, visible attribution.
- A simulated sight or invented line never becomes independent historical proof in the evidence engine.
- No required clue exists only in audio; captions, complete transcripts and necessary visual descriptions convey equivalent information.
- Reading or assisted access satisfies the same encounter-access requirement; watching time alone never demonstrates learning.
- Audio pauses on exit; speech does not overlap accidentally; replay, reload and repeated questions cannot duplicate rewards.
- Required missing content is reported rather than silently treated as complete. Explicitly authored equivalent text/visual presentations can substitute for optional media.
- Controlled camera movement supports reduced motion and stationary viewing. A seated moment remains usable on a phone without hidden controls.
- Every required encounter supports a known capstone question or evidence relationship; optional exploration has a clear return path.
- Test the encounter capability with substantially different content, such as the port interview and instrument workshop, without project-specific runtime branches.
- Observe whether students recall the person’s perspective as well as the puzzle answer. Verify that longer exploration does not consume the final debrief time.

**Planning changes in this task:** added this interaction-layer design and linked it from the capstone plan and Heist handoff. No game implementation or recorded performance was added. Next work is the reusable encounter shell and a source-reviewed first coastal encounter.
