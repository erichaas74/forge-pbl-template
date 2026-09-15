# Cinematic Book Repair: Restore the Story

**A new, separate project. History Time Repair remains unchanged.**

Design write-up • 2026-09-14 • No book selected • No app implementation requested

Students watch a cinematic scene in which something happens differently from the book they are reading. They enter the same world, explore a small area, interview its characters, and discover why the scene changed. After making an evidence-based repair, they return to watch the original event unfold correctly.

The experience should feel like stepping into a film and becoming part of its investigation. The video and interactive world share a consistent visual identity. The student's decisions change a visible event, and the novel supplies the evidence for what belongs in that event.

This document defines the cinematic 3D setup without assigning a novel, chapter, location, or cast. Book Repair has its own future project ID, route, curriculum, media, and saved work. It does not replace, rename, or modify the existing History project.

## The central experience

**Watch what went wrong → step into the scene → interview and investigate → repair the cause → return to watch the restored event.**

The student is a reader investigating a damaged version of a story. They must establish both what the book says and what interference made the scene diverge. Knowing the correct plot is useful, but it does not by itself reveal how to fix this particular mystery.

Each case contains one clear divergence. The cause could be a displaced object, an intercepted message, a conversation attributed to the wrong person, a missing event, or information delivered at the wrong moment. These are configurable possibilities, not a selected sample story. The author of each case must show how its interference causes the changed behavior.

The repair restores the original narrative. It does not automatically give the characters a happier ending, erase a difficult choice, or declare one interpretation of an ambiguous passage correct.

## 1. The opening film

The main workspace opens on a short cinematic, provisionally around 20–40 seconds for the first visual trial. It establishes the location, characters, and a consequential event that conflicts with the assigned reading.

The film should dramatize the error. Students should see the wrong action or hear the changed statement, rather than read an explanation on a title card. Camera framing and performance should direct attention without revealing the entire solution.

Students can pause, replay, use captions, and pin a moment to their case journal. A chapter reference identifies the relevant reading boundary. The opening does not require a quiz or written reflection before entry.

The last shot is deliberately composed as the entrance to the interactive environment. It may hold on a doorway, a table, a character, or another meaningful position chosen when the case is authored. That shot must be reproducible by the 3D scene's camera.

## 2. Entering the same world

When the student selects **Enter the scene**, the viewpoint moves from the final film shot into the interactive set. The same surroundings remain visible. The sound of the environment continues. The characters retain the same faces, clothing, scale, and positions.

The player should not see the film disappear and an unrelated game screen load in its place. The transition is a designed shot with a matching camera, visual composition, light, and sound.

The investigation may begin just before the changed event. If so, show a simple temporal cue such as **A few minutes earlier**. This explains why the student can still intervene after having seen the outcome.

The world must be actual 3D: perspective changes as the camera moves, objects occupy space, and characters belong to the environment. A zooming illustration, panorama, or prerecorded background loop does not satisfy this requirement. Those may serve as separate planning or accessibility aids, but they must not be described as the finished navigable world.

If the environment is still loading, hold the intended film frame and show a clear preparation state. Do not expose empty space or unfinished geometry during the handoff.

## 3. A small world with cinematic detail

The first complete case should use one carefully finished environment with four to six investigation positions, two characters to interview, and three to five meaningful clue objects. Additional cases can connect a few nearby spaces.

Students choose where to go among the available positions. The camera travels along authored paths and allows a bounded look-around at each destination. This gives them spatial agency while allowing every view to be lit, composed, and finished deliberately.

Movement should feel calm and intentional. The default is a first-person viewpoint without a visible player avatar. Avoid requiring jumping, precise walking controls, reflexes, or collision puzzles to reach a reading clue.

At each position, students can do something meaningful:

- Approach and speak to a character.
- Pick up, turn, open, or closely inspect an object when the clue requires it.
- Notice a detail that changes their interpretation of a witness's account.
- Present a collected item or passage reference.
- Perform the chosen repair.
- Return to a previous location without losing discoveries.

Restrictions belong to the scene's logic. Students can explore freely within the case area, while a specific follow-up or intervention may require evidence. An unavailable action explains what is missing without giving away the answer. Interviews and revisits have no artificial token cost.

The interface stays restrained: a small current-task cue, context-sensitive interaction labels, and an accessible journal. The student's view of the world should remain the dominant part of the screen.

## 4. Characters who know different parts of the truth

Interviews are central to the mystery. One character may have witnessed the action; another may know what happened immediately before it. Their accounts may conflict because of limited knowledge, a mistaken belief, or deliberate concealment supported by the authored story.

Each character has a defined knowledge boundary. They cannot explain an event they did not observe merely because the player asks. Their dialogue stays within the chapters the student has reached.

Approaching a character moves the camera into a carefully framed conversation. The first implementation uses prepared dialogue performances rendered with the same character model, costume, set, and lighting as the surrounding world. Matching idle poses and camera angles allow the performance to start and finish naturally.

The student can ask an opening question, follow up on a statement, present evidence, and challenge a contradiction. Discovering an object may unlock a specific new question. A response can point them toward a second witness or a previously overlooked detail.

Every required interview must contribute a necessary piece of the explanation. Clicking through all dialogue is not, by itself, proof that the student has solved the case.

The journal saves the testimony and its speaker. Newly written dialogue is identified as part of the activity's mystery; it must not be presented as a quotation from the novel. Captions and transcripts accompany the performances. Live AI conversation is outside this initial setup.

## 5. Discovering why the scene changed

The student works with two linked bodies of evidence:

| Evidence | Purpose |
| --- | --- |
| Passages or accurately cited paraphrases from the book | Establish the original event, character motives, and supported sequence |
| Observations and interviews in the altered world | Establish what interference occurred and how it changed the event |

The case journal supports a small causal explanation:

**Someone or something interfered → a character received different information or encountered a changed situation → the character acted differently → the scene diverged.**

A good case includes a plausible alternative explanation. Students should be able to distinguish it using specific evidence. If the task asks who introduced the interference, the evidence must establish that identity; discovering that a message is false does not automatically prove who wrote it.

The player can collect useful evidence, link accounts, compare them with the reading, and return to ask a better question. The journal and cause board are products of the investigation, not a stack of mandatory reflection forms.

The scene should remember what the student has inspected, heard, and changed. Reloading or changing sessions should not erase those discoveries or overwrite edited work with a sample.

## 6. Repairing the cause inside the scene

Once the evidence supports an intervention, the student returns to the relevant object or character. The action takes place in the world: return an item, restore the intended message, put an event back in sequence, or present evidence that corrects a mistaken belief.

The available actions are authored for the case. The system does not invite unlimited rewriting of the novel. It checks whether the target, action, and supporting evidence match a supported repair path.

The repair must have a visible effect. A changed object appears in its correct state; a character acknowledges the newly established fact; an interrupted action can continue. A green checkmark is not enough to convey that something in the world has been fixed.

An unsupported repair can leave the contradiction unresolved or reveal a prepared consequence that explains the mismatch. The student can return to the evidence and try again. Mechanical feedback must not claim that the system has graded the student's reading or awarded mastery.

## 7. Returning to the restored film

The student selects **Return and watch the scene**. The camera returns to the authored viewing position, and the corrected film begins.

The opening and corrected films share comparable shots. The same character approaches the same object or faces the same decision, but the event now follows the book. This lets students recognize the consequence of their repair through action and performance.

In the initial design, the ending is rendered ahead of time and linked to the applicable repair. The 3D environment renders the immediate intervention live; the prepared film dramatizes its narrative result. No new movie is generated while the student waits.

Afterward, students can compare the relevant shots and inspect the passage supporting the correction. A short exhibit can retain the changed moment, witness evidence, explanation of the cause, repair, and corrected result.

If the student revises the intervention, the prior ending remains available as a replay of that earlier trial. It cannot be presented as the result of the new action.

## 8. The graphics standard

The visual target is a polished cinematic 3D scene with convincing materials, light, character performance, and camera direction. It should remain visually coherent with its opening and ending videos.

| Area | Required quality |
| --- | --- |
| Environment | Believable scale, detailed visible surfaces, purposeful props, and enough depth to support the authored camera moves |
| Materials | Wood, stone, fabric, metal, glass, and other selected surfaces respond convincingly to the scene's light |
| Characters | Consistent faces and costumes; credible poses, eye contact, expressions, and relevant gestures |
| Lighting | A deliberate cinematic scheme maintained between offline films and the interactive export |
| Camera | Smooth, readable movement; composed investigation positions; matching entry and exit shots |
| Sound | Continuous atmosphere, intelligible dialogue, restrained transitions, captions, and independent audio controls |
| Repair | A visible, specific world change that is also reflected in the corrected film |

Basic shapes, crude character stand-ins, unrelated stock portraits, mismatched AI-generated faces, and flat scenes with decorative effects are not acceptable as the finished result. Engineering placeholders may be used to test behavior, but they must remain explicitly labeled and cannot pass the visual review.

The first art test should include a close-up conversation and a handoff from film to world. Those reveal whether facial quality, lighting, and visual continuity meet the intended standard. A beautiful empty room alone does not prove the whole experience.

## 9. Build the set before the final videos

The reliable production order is:

1. Establish a visual direction and the required shots for the future case.
2. Build the master 3D environment, characters, props, lighting, and scene variants.
3. Define the bounded player camera positions and transitions.
4. Render the opening, interview performances, and corrected ending from that same asset family.
5. Export optimized versions of the environment and necessary character assets for interactive use.
6. Compare the interactive views with the film frames and correct differences in color, scale, light, poses, or composition.
7. Test the full loop on the intended student hardware.

Image or video generation can support concept development. An independently generated clip does not automatically supply a matching 3D set, rigged characters, or editable camera paths. The production plan must explicitly provide those assets.

For browser delivery, the existing app can retain Angular for its interface and use its installed Three.js renderer for the set. This is a genuine 3D rendering task; selecting a renderer alone does not create the necessary art or guarantee film-quality results. The supporting [implementation specification](IMPLEMENTATION_SPECIFICATION.md) defines the renderer boundary, asset contracts, and performance tests.

If the accepted look cannot run adequately on the intended devices, that is a delivery decision to resolve before expanding production. Remote rendering is a possible later option, with its own infrastructure requirements. It is not silently assumed in this setup.

## 10. How it fits the learning workspace

Book Repair is a new English Language Arts project type. The future application entry is **Cinematic Book Repair: Restore the Story**, using project ID `book-repair` and route `/projects/book-repair`. History Time Repair keeps its existing entry and route.

The normal desktop layout keeps the cinematic activity at approximately 70% width, with proposed products and a disconnected AI Tutor planning panel in the remaining column. Students can expand the scene for investigation and restore the normal layout without losing their place. On smaller screens the activity and planning sections stack.

The setup supports four weeks and eight distinct sessions:

| Week | Individual session | Group activity session | Potential work produced |
| --- | --- | --- | --- |
| 1 | Observe a changed scene, enter the world, and interview a witness | Compare accounts and use evidence in follow-up questions | Observation journal and interview trail |
| 2 | Investigate competing explanations in another case | Establish the cause and test an in-world repair | Cause board and repair trial |
| 3 | Resolve a fresh case with less prompting | Compare changed/restored films and supported consequences | Scene comparison and revised explanation |
| 4 | Compose a case exhibit from passages, testimony, and cinematic evidence | Rehearse the exhibit and develop another case outline | Illustrated or narrated Book Repair exhibit |

Later sessions must open directly with clearly labeled starting material. The final example is separate from saved student work. Group sessions are local activities in the initial build; shared editing and connected tutoring are later work.

The complete course needs multiple distinct cases. One finished scene proves the cinematic approach; it does not fulfill all eight sessions on its own.

## 11. The first proof to build later

Once a book and case are selected separately, the first production-quality proof should contain:

- One short wrong-event film.
- One matching, finished 3D set with bounded movement.
- Two interviewable characters and several useful clues.
- One discoverable cause, supported by interviews and the assigned reading.
- One visible repair.
- One matching corrected film.

Acceptance means a student can complete the investigation, understand what their action changed, and experience convincing continuity from film to world and back. Review that actual loop at normal viewing size on target hardware. Do not certify it from concept images alone.

Before a book is chosen, engineers may build and test the reusable setup with clearly labeled original test data. No test cast or setting becomes the selected curriculum by default.

## Supporting documents and current scope

- [Implementation specification](IMPLEMENTATION_SPECIFICATION.md): state, configuration, reusable capabilities, separate-project registration, all eight sessions, build stages, and acceptance checks.
- [Blank case authoring template](CASE_AUTHORING_TEMPLATE.md): a reusable form for a future book's source evidence, mystery, interviews, set, shots, repairs, and media.

This delivery is the cinematic 3D write-up and setup specification only. No book is selected. No application code, project catalog, cinematic assets, or History Time Repair content is changed.
