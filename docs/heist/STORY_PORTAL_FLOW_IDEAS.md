# Story portals and a clearer immersion flow

Brainstorm / proposed next iteration. The current coastal encounter remains implemented as described in LIVING_SCENES_IMPLEMENTATION.md; the entrance treatments and guided flow below are not yet built.

**Updated mission:** [Restore the forged paintings](FORGERY_RESTORATION_GAME_FLOW.md). These portal ideas now support a restoration studio: select a questionable detail, research through its portal, then **Return to my painting** to repair that same part with evidence. The earlier references to comparing three passages below describe the prior activity; restoration becomes the primary learning objective.

## Design direction

Give the student one unmistakable entrance into a story, a suggested next action inside it, and a visible reason to bring their insight back. The current main view offers painting inspection, the clue audit, and scene entry together; the encounter then offers several equally weighted choices. The proposed change makes that sequence visible while preserving exploration.

Recommended treatment: a **Story Portal** beside each supported gallery's painting junction. It looks like an illuminated doorway with the destination visible through it, framed in the gallery's existing brass and dark green materials. One click crosses the threshold directly into the encounter. Avoid an extra lobby with another entry confirmation.

## Three entrance concepts

| Concept | What the student clicks | Experience | Tradeoff |
| --- | --- | --- | --- |
| Story Portal — recommended | A large framed doorway labeled “Enter story portal” | The gallery recedes and the destination fills the screen | Strong visual distinction from the three passage choices; existing encounter can be reused |
| Living painting | A visible “Enter this setting” plaque on a painting | The image expands beyond its frame into the scene | Strong art connection, but portal availability must not reveal the authentic painting |
| Immersion chamber | A gallery side door labeled “Story chamber” | A small projection room offers destination windows or a listening seat | Useful future hub for several stories; adds navigation that the first single-scene release does not need |

Later optional tool: a carried **story compass** points toward available portals and offers “Resume your story.” It should support the main entrance, never be required to discover it.

## Make the entrance explain the purpose

Place the portal in the gallery's visual space and provide the same entrance as a keyboard-accessible button outside the canvas. Keep it distinct from the three painting passages. Suggested copy:

> STORY PORTAL · THE CARIBBEAN SHORE
>
> Before you judge the paintings, visit their world.
>
> Meet a host, explore a story, and bring back an insight.
>
> **Enter story portal →**

Show a compact path near the entrance: **Visit the story → Gather observations → Compare the paintings**. Do not use several competing primary buttons in that area. Keep the audit and reference notebook accessible as supporting tools.

The doorway can show a still destination preview. A short threshold transition can expand it to fill the screen; reduced motion uses an immediate transition. Audio begins through an explicit playback choice. Essential labels remain visible without hover.

## The click path inside

| Moment | Visible invitation | What to click | What happens next |
| --- | --- | --- | --- |
| Arrive | “There is a place to sit. Start here, or look around.” | A clearly labeled seat: **Sit & listen** | The view settles and the first chapter opens |
| Explore the story | A chapter title, speaker, transcript, and playback control | **Play story** or read; then **Ask a question** | The conversation opens at a relevant first question |
| Follow a question | “What would you like to understand?” | A question, with an optional follow-up | A specific person or museum narrator answers; sources remain available |
| Investigate | “Take a closer look at the canoe.” | **Examine the canoe** | The object view opens; a selected detail records an observation |
| Reflect | “What can you bring back to the gallery?” | **Record an insight** | Compare the claim with a reference and choose their relationship |
| Return | “Your insight is in your notebook.” | **Return to the paintings** | Restore the gallery context and point to comparing the three claims |

Provide one prominent suggested next action at each stage. Other viewpoints stay available through a smaller “Explore freely” control or the existing navigation. The route is a guide, not a rigid sequence: students may ask first, reread, skip audio, revisit details, or leave at any time.

Use in-scene targets students can understand: the offered seat for listening, the host for conversation, the canoe for inspection, and a journal for recording an insight. Pair each target with a visible verb. Keep equivalent text controls; avoid requiring pixel hunting or a tutorial about keyboard shortcuts before entry.

## Progress students can understand

Keep a small trail visible: **Story → Conversation → Observation → Insight**. Mark access honestly as a chapter opened, a question asked, or a detail observed. Opening content does not prove listening or understanding. Only the existing source/claim assessment earns the insight.

Portal labels reflect saved progress:

- **Enter story portal** — no encounter started.
- **Continue your story** — a visit has unfinished activities; name the next suggested action.
- **Insight recorded · revisit** — the assessment is complete, but the scene remains available.

On return, show: **“Insight saved: use your field notebook to compare the three paintings.”** A brief visual connection to the notebook helps explain where the learning went. The fraud list remains a separate record of claims actually inspected and investigated. Returning with an insight does not mark a painting correct or open its mechanism.

## Small touches that add immersion

- Let the host gesture toward the listening place as an invitation.
- Show a clearly labeled empty seat with **Sit here**, rather than asking students to infer that a person is the playback control.
- Use a few restrained environmental changes when moving viewpoints; preserve the full transcript and reduced-motion path.
- Give questions a conversational progression: notice something, ask about it, follow up, then examine the relevant object.
- Let an observation appear briefly as a note in the student's journal before it joins the encounter record.
- Preserve the student's position when revisiting, with a visible **Continue where you left off** action.
- Present narrator identity where the account starts. The current host remains fictional and the museum narration remains identified; future contributor recordings keep their attribution.

## Keep the final heist at the end

At project level, show the longer learning route: **Explore the stories → Practice evaluating claims → Prepare your evidence → Final heist**. Full story experiences belong in the earlier stages. During the final heist, familiar portals can offer a quick revisit or reference lookup while the student applies their learning.

A story destination must be available independently of which painting is authentic. The three paintings can share one setting; a glowing frame must not secretly identify the correct passage. A fraudulent claim must not be reenacted as established fact. Only show working destinations; the current build has one coastal encounter, not seven additional available portals.

## Suggested implementation order

1. Replace the current coastal invitation banner with a clearly labeled visual portal and a three-part explanation of the return loop. Reuse the existing encounter and its saved state.
2. Add a suggested-next-action control, compact progress trail, and an in-scene seat target. Keep free exploration and existing accessible controls.
3. Add a return message tied to the saved insight, plus “Continue your story” and “Revisit” entrance states.
4. Playtest whether students can find the entrance, identify their next action, return to the same painting activity, and locate their saved insight without teacher explanation.
5. Author the next encounter. Add an immersion-chamber hub only when several destinations make that extra space useful.

No runtime, package version, media, assessment rule, or student save is changed by this design note.
