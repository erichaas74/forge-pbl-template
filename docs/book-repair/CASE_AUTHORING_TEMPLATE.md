# Book Repair — case setup template

Companion to [the cinematic 3D project write-up](CINEMATIC_BOOK_REPAIR.md) and [implementation specification](IMPLEMENTATION_SPECIFICATION.md).

Status: blank authoring setup for a NEW project, separate from History Time Repair. No book or case has been selected. Completing this document does not itself produce a runnable package or cinematic assets.

## 1. Identity and reading scope

| Field | Authoring entry |
| --- | --- |
| Case ID / revision | Unassigned |
| Case title | Unassigned |
| Book / author | Unassigned |
| Edition / language | Unassigned |
| Intended grade/readership | Unassigned |
| Chapters already read | Unassigned |
| Maximum spoiler boundary | Unassigned |
| Session(s) using this case | Unassigned |
| Setting and investigation moment | Unassigned |

Choose an authentic scene that supports the project goals and a compact cinematic set. Check whether a popular adaptation would undermine the desired independent visual identity. Keep the distinction between a whole-book project and a case's limited chapter scope explicit.

## 2. What changed

| Required statement | Authoring entry |
| --- | --- |
| Original event, in one precise sentence | |
| Chapter/edition locator and supporting passage or accurate paraphrase | |
| Altered event shown in the opening film | |
| Why the alteration contradicts the text rather than an interpretation | |
| Immediate visible difference | |
| Later consequence supported within the reading boundary | |
| Authentic surprising detail that must remain unchanged, if used | |

## 3. Hidden cause

| Required statement | Authoring entry |
| --- | --- |
| Exact interference | |
| When it happened relative to the film and investigation | |
| Person/mechanism responsible, if the case requires attribution | |
| Motive or causal explanation | |
| How the interference changes a belief/object/event | |
| How that produces the changed action | |
| Plausible alternative explanation | |
| Evidence that distinguishes the explanations | |
| Smallest repair that removes the interference | |

Write the complete solution privately before writing clues. Do not make the culprit identifiable only through the final reveal. Do not invent an explanation that erases the original character's agency or established motivation.

## 4. Character knowledge and interviews

Complete one row for each witness. Begin with two for the visual trial.

| Character ID | What they witnessed | What they believe | What they want | What they do not know | Information their interview uniquely supplies |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |

For each dialogue node:

| Field | Authoring entry |
| --- | --- |
| Node ID / speaker | |
| Student question | |
| Availability condition IDs | |
| Required presented evidence, if any | |
| Exact authored response | |
| Book basis versus invented mystery content | |
| Newly produced evidence | |
| Follow-up node(s) | |
| Caption/transcript / performance clip / matching idle pose | |
| Unavailable-question explanation | |

At least one necessary causal fact must come through interviewing. Responses stay consistent when replayed and do not disclose later chapters. Presenting unrelated evidence must not unlock the correct branch.

## 5. Evidence and causal proof

| Evidence ID | Origin: book / observation / testimony / inference | Content and locator | Where obtained | What it supports | What it does not establish | Required follow-up or repair use |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |
| | | | | | | |
| | | | | | | |

Map the proof explicitly:

| Causal link | Supporting evidence IDs | Necessary interview node | Alternative ruled out |
| --- | --- | --- | --- |
| Original event → identified contradiction | | | |
| Interference → changed information/object | | | |
| Changed information/object → changed action | | | |
| Repair → restored action | | | |
| Restored action → supported consequence | | | |

If multiple evidence combinations are valid, list each accepted combination or a clear reusable condition. Do not use a required text-length count as a substitute for that condition.

## 6. Scene and movement

| Field | Authoring entry |
| --- | --- |
| Master scene build ID | |
| Environment asset / optimized glTF export | |
| Character asset/performance identities | |
| Changed variant / restored variant | |
| Entry camera / ending camera | |
| Investigation time and any rewind explanation | |
| Lighting/environment/audio identity | |

| Position ID | Student-facing destination | Camera transform / look limits | Available objects/characters | Reachable next positions | Boundary explanation |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

Keep the set compact and detailed. A digital room with placeholder geometry can test navigation but is not a finished visual sample.

## 7. Film and transition plan

| Clip ID / role | Action visible | Duration target | Scene build / variant | Entry / exit camera | Dialogue/captions | Transition requirement |
| --- | --- | --- | --- | --- | --- | --- |
| Opening: changed event | | | | | | |
| Interview close-up(s) | | | | | | |
| Ending: restored event | | | | | | |
| Optional unsuccessful outcome | | | | | | |

Opening and restored films should share comparable shots. Record the exact action that differs. Identify which frame hands control to the world and which camera returns to the film. Produce all clips from the same master asset family.

No generated film at lesson runtime is assumed. The package selects prepared media linked to the current repair trial. Captions, transcripts, and retry behavior accompany every essential clip.

## 8. Interventions and outcomes

| Repair ID | Installed operation | Target | Prerequisites | Immediate visible effect | Resulting variant / film | Why supported or unresolved |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |
| | | | | | | |

Define how replay, reset, and a revised repair affect the currently available ending. Preserve prior trials without presenting a prior success as the new result.

## 9. Session setup and products

| Field | Authoring entry |
| --- | --- |
| Immediate student action | |
| What visibly changes | |
| How the student checks the interaction result | |
| Proposed product | |
| Tutor questions, not connected | |
| Evidence the future tutor will inspect | |
| Future supported controls | |
| Direct-entry sample state and its visible label | |
| Read-only final-example material | |

Keep the proposed product distinct from a completion gate. Preserve intentionally empty edits. Do not claim that a configured repair result proves mastery of the reading objective.

## 10. Case readiness record

| Check | Evidence / result |
| --- | --- |
| Source and chapter fidelity reviewed | |
| Added mystery distinguished from book content | |
| Every causal link supported | |
| Required interviews meaningful and reachable | |
| Alternate explanation can be ruled out | |
| Correct repair and authentic unchanged detail verified | |
| Opening / world / interview / ending visually consistent | |
| Actual 3D perspective and meaningful object interaction demonstrated | |
| Character faces/performance meet the chosen quality target | |
| Target-device load and frame-time measurements recorded | |
| Keyboard, captions, reduced motion, touch, and recovery tested | |
| Direct entry, reset, replay, revisions, and saved drafts tested | |
| Missing assets/capabilities explicitly listed | |

Do not mark this case runnable or finished until the referenced assets and implemented capabilities exist and these checks have real evidence.
