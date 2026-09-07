# Final Project Showcase Build Plan

## Purpose and non-negotiable demo boundary

This work is a **read-only final-product demonstration for teachers and builders**. Its purpose is to show what an excellent completed student project could look like and to give adults a concrete guide for improving content, assessment, and presentation later.

It does **not** redesign how students complete any project. The normal student experience must continue to use the same:

- project introduction and sequence;
- activities, choices, tests, and evidence;
- progression gates and completion rules;
- calculations, consequences, and scoring;
- team and individual responsibilities;
- submission and approval behavior;
- permissions and privacy rules;
- persistence and classroom records.

The completed samples live in a separate demo context. Opening, exploring, restarting, or leaving a sample must never dispatch events into a student's runtime, change browser-saved work, submit an artifact, cast a real vote, create feedback, or affect a class record.

Any enhancement described in this document is one of two things:

1. **Demo content:** fictional completed data loaded into an existing final surface; or
2. **Builder guidance:** a clearly labeled explanation of what could make a future version stronger.

Builder guidance is not part of the live project until it is separately designed, approved, implemented, and tested. The demo may illustrate a proposed feedback result, but it must not silently add that feedback workflow to the student project.

## Showcase format shared by all six projects

Each final project should open its existing final experience with a finished fictional student record already loaded. Projects that already have a presentation player use it for a 60–90 second teacher/builder demo. The Unlabeled Shelf uses its existing completed final-case page as the demo rather than adding a player. None of these entry points replace or alter the normal student launch.

Every showcase should include:

- a deterministic, completed sample record that is isolated from real learner work and resets cleanly;
- a strong opening image or live project surface in the first viewport;
- one unmistakable student decision and the evidence behind it;
- one moment where the learner revised, adapted, or answered a challenge;
- a final product rendered by the existing project surface from the fictional saved record;
- the existing teacher, rubric, transcript, keyboard, and reduced-motion views where the project already supplies them;
- a visible **Demo record** label wherever the example could otherwise be mistaken for live student work.

Keep each project's current presentation controls and vocabulary. Add only a consistent **Completed sample** label, restart action, and exit back to the normal project. Sound should never begin without the viewer choosing play.

## Reuse-first audit

The first plan introduced more new showcase machinery than the current goal needs. The repository already has a strong final surface for every project except that The Unlabeled Shelf is presented as a completed case form rather than a separate performance mode. The showcase pass should therefore seed finished fictional records into the existing final experiences instead of building six parallel presentation systems.

| Project | Existing surface to reuse | What the sample adds | Do not build in this pass |
| --- | --- | --- | --- |
| The Unlabeled Shelf | Final Investigation page, Restored Shelf Case File, Investigation Record sidebar, evidence filters and previews, theory history, final check, submitted confirmation | One complete fictional case with all fields, evidence states, theory, uncertainty, reflection, and contribution filled in | A second case-report UI, oral-defense recorder, or new teacher workflow |
| Frontier Trading Company | Existing five-part Final Strategy Showcase, presentation mode, timer, math slide, event revision, peer question, and print view | One coherent completed season record from setup through reflection | A replacement slide system or duplicated showcase-only math |
| Objects That Changed Us | Existing museum corridor, walk-up board, accessible list, family preview, teacher preview, MetaSteps embed, and video/transcript station | Four finished fictional wings, with one selected as the guided example | A second museum renderer or a separate family site |
| History Live | Existing broadcast player, evidence scenes, lower thirds, transcript, producer rundown, feedback, and reflection history | One approved fictional student package with a visible revision chain | A second video player or separate control-room application |
| The Fate of the Republic | Existing debate premiere, faction rails, evidence projection, moderator segment, ballot, verdict, and reflection | One completed fictional Senate session followed by a class persuasion vote and constructive feedback for both factions | A second Senate presentation, public student ranking, or winner-take-all result |
| Race Around the World | Existing animated replay, Captain's Log, decision records, citations, tutor turns, consequences, and teacher review | One completed fictional five-chapter expedition with a revision | A separately rendered movie or duplicate map timeline |

### Highest-impact work by project

| Project | The part that creates excitement | Most important work to complete |
| --- | --- | --- |
| The Unlabeled Shelf | Look-alike substances are separated by decisive controlled tests | Populate a complete case and make existing evidence previews show the saved measurements and matrices behind the conclusion |
| Frontier Trading Company | A good forecast is disrupted, the team adapts, and the ledger proves the outcome | Seed one mathematically coherent season with a consequential event, reconciled ledger, complete five-slide defense, and individual math ownership |
| Objects That Changed Us | Visitors walk into a student-built historical argument | Make all four current corridor frames openable and fill every wing with three sourced artifacts and a curator transcript |
| History Live | A television report freezes into an inspectable source trail | Seed one approved three-scene package with claim-to-source links, a clear producer revision, balanced rundown, and final reflection |
| The Fate of the Republic | The student audience decides which case was most persuasive and explains what both sides did well and should improve | Seed a balanced debate and display a fictional private-vote summary plus constructive feedback for both factions without changing the live voting flow |
| Race Around the World | A storm visibly rewrites the route and the student's reasoning | Seed a coherent five-chapter record and surface prediction, consequence, exact citation, resource change, and revision within the existing replay |

### Sample-data rule

Each showcase uses one deterministic fictional record loaded only for preview. It must be labeled **Completed sample · Teacher and builder guide** and must never overwrite a learner's real draft. All visible totals, claims, citations, media labels, decisions, and rubric evidence come from that one sample record. The sample should be resettable and should open directly at the existing final surface through a demo-only entry point.

### Demo implementation guardrails

- Load completed examples from dedicated fixture data, never by completing activities inside a real student session.
- Use a preview-only identity and isolated in-memory or no-write state.
- Allow presentation navigation, media playback, filtering, expanding evidence, and switching approved preview views.
- Disable or replace save, submit, publish, vote, comment, moderate, grade, and revision actions with read-only sample results.
- Do not change project packages, activity requirements, rule conditions, scoring, mastery authority, or normal launch destinations merely to make the sample look complete.
- Keep teacher/builder notes visually separate from the student artifact so they cannot be mistaken for student-facing instructions.
- Exit directly to the existing project home or normal project launch without carrying any sample state.
- Test the normal student path before and after the demo work to confirm identical behavior.

## Final-project tension and mastery-learning model

The final showcase should not make success look effortless. It should reveal the difficult point in the project: evidence conflicts, resources run short, a public claim must be defended, an opposing argument must be answered, or a consequence forces revision. That productive tension is what makes the final product feel earned.

Do not create pressure through hidden criteria, surprise penalties, public embarrassment, or an unforgiving timer. Students should see the goal, criteria, constraints, and available evidence before committing. Presentation timers are pacing tools, not mastery scores.

### Thinking trail every sample should preserve

Each fictional completed record should make this sequence inspectable:

1. **The challenge:** What problem, uncertainty, or constraint made the decision difficult?
2. **The first idea:** What did the student initially think or plan?
3. **The evidence considered:** Which records, sources, measurements, calculations, or perspectives mattered?
4. **The alternatives:** What other choices were possible, and what tradeoff did each carry?
5. **The decision:** What did the student choose?
6. **The reasoning:** Why did the evidence support that decision?
7. **The consequence or challenge:** What happened, or what question did an audience or teacher raise?
8. **The feedback:** What was strong, what was incomplete, and what specific next move was recommended?
9. **The revision:** What changed in the student's work because of that feedback?
10. **The mastery evidence:** Which final artifact and process records demonstrate the learning target?

### Mastery feedback format

The demo's example of strong mastery feedback should be criterion-specific and revision-ready. This is a read-only model for teachers and builders, not a change to the active grading workflow. Every example criterion should show:

- **Current evidence:** the exact sentence, calculation, citation, decision, media segment, or response being assessed;
- **What is working:** one specific strength tied to the criterion;
- **Next improvement:** one concrete change the student can make;
- **Mastery state:** **Not yet**, **Developing**, **Mastered**, or **Transfer**;
- **Revision link:** the new version that responds to the feedback;
- **Teacher confirmation:** the final mastery decision, kept separate from automatic completion and peer voting.

Peer feedback can identify clarity, persuasiveness, questions, strengths, and next steps. It should inform revision but should not award mastery by itself. When the current project does not yet capture that feedback, the demo may show a clearly labeled **Builder guidance example** beside the fictional final product; it must not write new feedback into the live runtime. Personal written feedback, rubric decisions, and revision history remain private.

### How the showcase should display the pressure point

At the most difficult moment, briefly expose five pieces of the saved record together:

- **What we knew** — the strongest available evidence at that moment;
- **What was uncertain** — the missing, conflicting, or limited information;
- **What was at stake** — safety, money, credibility, the public claim, the Senate's judgment, or expedition resources;
- **What we chose and why** — the student's decision and reasoning;
- **What changed next** — consequence, challenge, feedback, or revision.

This can be expressed through each project's existing vocabulary and components. It should not become a generic dashboard placed over every project.

### Cross-project mastery map

| Project | Productive tension | Thinking that must be visible | Mastery feedback should focus on |
| --- | --- | --- | --- |
| The Unlabeled Shelf | Four substances look alike, but an incorrect label creates a safety risk | Compare tests, eliminate alternatives, address weak evidence, calibrate confidence, recommend safe action | Controlled investigation, claim-evidence-reasoning, conservation of matter, uncertainty, safety |
| Frontier Trading Company | Cash, cargo, time, distance, demand, and an unexpected event compete | Forecast, calculate, compare routes and goods, adapt after new information, reconcile the ledger | Quantitative reasoning, strategic planning, revision, evidence from the ledger, individual explanation |
| Objects That Changed Us | Three artifacts must support one defensible public claim | Select representative objects, distinguish description from interpretation, connect evidence, cite sources, answer visitors | Historical claim, artifact interpretation, synthesis, sourcing, public communication, individual defense |
| History Live | A reporter must publish under deadline without turning perspective into unsupported fact | Corroborate sources, identify limits, compare networks, revise the script, justify scene choices | Source analysis, historical accuracy, perspective, claim support, production clarity, revision |
| The Fate of the Republic | A student must answer a real opponent before the judging Senate votes | Listen fairly, mark the claim, choose evidence, rebut reasoning, acknowledge tradeoffs, respond to peer feedback | Listening, evidence, rebuttal, historical reasoning, speaking, constructive response to feedback |
| Race Around the World | Incomplete information and limited resources make every route choice consequential | Compare routes, cite exact evidence, predict outcomes, weigh costs, interpret perspectives, revise after consequences | Geographic reasoning, cause and consequence, citation, source perspective, ethical reasoning, revision |

---

## 1. The Unlabeled Shelf

### Showcase title

**Case Closed: The Restored Shelf**

### Excitement audit

**What already works**

The project feels like a real scientific mystery because four ordinary white substances look deceptively similar. The student does not win by guessing; the result emerges from controlled comparisons, conflicting clues, a revised theory, and a safety decision. The existing final page already brings the theory, strongest support, biggest challenge, evidence picker, reasoning, uncertainty, reflection, and restoration recommendation into one place.

**Center the showcase on**

The most exciting moment is the separation of the two look-alike pairs. Appearance groups A with B and C with D, but conductivity separates salt from sugar and the reaction plus Indicator B separates baking soda from cornstarch. The final showcase should make that reasoning turn unmistakable.

**Must be populated for the sample**

- all four vial identifications and shelf zones;
- the full physical-property and reaction result records, not only generic evidence titles;
- at least six selected evidence records with believable classifications and notes;
- an initial theory, revised theory, confidence change, and reason for revision;
- scientific reasoning that cites exact observations and measurements;
- a real challenge or weak clue in Counterevidence;
- uncertainty, safety recommendation, reflection, and individual contribution.

**Build emphasis for a stronger final**

- Make the existing evidence Preview reveal the useful saved result—matrix, measurement, observation, or note—rather than stopping at a one-line evidence summary.
- Arrange the completed sample so Strongest support and Biggest challenge are both populated in the current sidebar.
- Keep the four-vial answer visible while viewers inspect evidence so the reasoning never feels detached from the conclusion.
- Use the existing Bay 3 incident and shelf-restoration records to reinforce that the conclusion controls a safety decision.
- Make the read-only sample visually obvious and give it one clean exit back to the learner's untouched investigation.

**Defer**

A separate oral-defense mode, cinematic vial animation, new scoring engine, and new teacher application are not required to make the first completed sample compelling.

### Decision-making and mastery detail

**Pressure point:** The shelf cannot safely reopen until all four labels are defensible. Visual similarity creates uncertainty, and one weak clue can support several answers.

**Successful thinking path:**

1. Group A and B as crystals and C and D as powders without treating appearance as proof.
2. Use conductivity to separate the conducting pair from the nonconducting pair.
3. Use Solution A, temperature change, and Indicator B to distinguish C from D.
4. Cross-check the remaining labels and solubility results to distinguish A from B.
5. Explain why gas in the closed chamber does not mean matter disappeared.
6. Preserve the witness note as uncertain evidence rather than deleting it.
7. Set confidence below 100% and recommend teacher verification before reopening the shelf.

**Sample feedback and revision:**

- What is working: “You used conductivity and Indicator B to distinguish substances that looked alike.”
- Next improvement: “Connect the closed-chamber mass result directly to your explanation of Vial C's bubbling.”
- Revision shown: the student adds the sentence explaining that total mass remained constant when the gas stayed inside the measured system.
- Mastery evidence: final identification, selected test records, counterevidence, confidence statement, and safety recommendation.

### Finished sample

The completed case identifies:

- Vial A as table salt;
- Vial B as sugar;
- Vial C as baking soda;
- Vial D as cornstarch.

The report cites the conductivity results, solubility patterns, Solution A reaction, Indicator B results, optical observations, and recovered-label list. It also retains the weaker appearance-only clue as counterevidence and explains why that clue was not decisive.

### Fictional completed lab record to load

Use **Maya Ortiz · Team Catalyst** as the clearly fictional sample author. Load the final as a complete, read-only draft so the existing form remains visible with all five sections filled. Do not set the runtime to the current submitted-success state until after the viewer has inspected the report, because that state intentionally replaces the form with the recorded-case confirmation.

**Saved theory history**

- Initial theory · 55%: “A and B are the crystal materials, while C and D are the powders. Appearance alone cannot tell me which crystal is salt or sugar or which powder is baking soda or cornstarch.”
- Final theory · 90%: “A is table salt, B is sugar, C is baking soda, and D is cornstarch. The physical-property and reaction patterns distinguish each material when the tests are considered together.”
- Reason for revision: “The conductivity and Indicator B results separated pairs that looked alike.”

**Final identification field**

> Vial A is table salt and belongs on the verified crystal shelf. Vial B is sugar and also belongs on the crystal shelf. Vial C is baking soda and belongs on the verified powder shelf. Vial D is cornstarch and belongs on the powder shelf. Every container should receive a new printed label, date, and handling note before the shelf returns to use.

**Selected evidence records**

- Four-vial physical-property trials · supports · important;
- Controlled chemical-screening trials · supports · important;
- Mass and particle-tracking trials · supports;
- Recovered Label List · supports;
- Indicator B Color Key · supports · important;
- Shelf Monitor Note · uncertain and used as the challenge to the claim.

**Scientific reasoning field**

> Vials A and C conducted electricity in water, while B and D stayed near the probe baseline. That separates salt and baking soda from sugar and cornstarch. Vial C also produced rapid bubbles for 18 seconds with Solution A and cooled from 22°C to 19°C, which matches the baking-soda evidence. Vial D kept a cloudy suspension and changed Indicator B to dark blue-black, which supports cornstarch. A dissolved into a conducting clear solution, supporting salt, while B dissolved into a clear solution without conducting, supporting sugar. The closed-chamber model kept the same total mass even when gas formed, so the bubbles did not mean matter disappeared.

**Counterevidence field**

> The shelf monitor remembered two crystals and two powders, and our optical scans agreed, but that clue could not identify the materials by itself. A and B both looked crystalline, while C and D both looked like white powders. The witness note is useful as a starting point but weaker than the controlled conductivity, reaction, and indicator results.

**Shelf restoration recommendation field**

> Keep all four vials sealed until a teacher verifies the new labels against this case record. Place A and B in the crystal zone and C and D in the powder zone. Add material name, date, and handling guidance to every label. Do not taste or directly touch any sample, and do not return a container to use if its identity or seal is uncertain.

**Uncertainty field**

> Confidence is high but not absolute because these were virtual screening tests rather than a second independent laboratory confirmation. A teacher should repeat one decisive test for each vial before reopening the shelf.

**Confidence**

> 90%

**Individual reflection field**

> I first trusted appearance too much. My conclusion became stronger when I used tests that could separate materials that looked alike and when I kept the weak clue as counterevidence instead of ignoring it.

**Your contribution field**

> I ran and recorded the conductivity comparison, checked the Indicator B result against the reference key, and wrote the safety recommendation. My partner checked the solubility and Solution A records before we agreed on the final labels.

### Guided 75-second walkthrough of the existing final page

**0–8 seconds — Open the completed sample**  
Open directly on the existing **Final Investigation** page. Add a clear **Completed sample · Teacher and builder guide** label above the current Restored Shelf Case File. The existing progress indicator reads **5 of 5 required sections complete**.

**8–20 seconds — Read the investigation record**  
Use the existing left sidebar to show the saved final theory, confidence, number of collected records, strongest support, and biggest challenge. No new summary panel is needed.

**20–34 seconds — Show the four identifications**  
The existing Final identification field is already filled with Vial A as salt, Vial B as sugar, Vial C as baking soda, and Vial D as cornstarch, including their shelf positions.

**34–49 seconds — Inspect the saved evidence**  
Use the existing evidence filters and checkboxes. Six records are already selected. Open the current evidence preview for the controlled chemical-screening trials and then the shelf-monitor note. The viewer stays on the final page.

**49–64 seconds — Read the reasoning and challenge**  
Scroll through the already filled Scientific reasoning and Counterevidence fields. The fictional student explains why controlled tests outweigh appearance and why the similar powders were initially difficult to distinguish.

**64–75 seconds — Close on uncertainty and safety**  
Show the current confidence slider at 90%, the filled uncertainty response, individual reflection, contribution statement, and shelf-restoration recommendation. End on the existing completed final check.

### Explore mode

Explore mode is the existing Final Investigation page with its current sections:

1. Final identification;
2. Show your best clues;
3. Scientific reasoning;
4. Counterevidence;
5. Shelf restoration recommendation;
6. the current optional uncertainty, confidence, reflection, and contribution fields.

The existing evidence Preview buttons should remain the connection between the report and the saved lab record. The sample is read-only; returning to the learner's own investigation restores the learner's untouched state.

### Review presentation in this pass

Do not add a new teacher-review application for this first sample. Present the completed case using the review information already visible in the final page:

- current theory and confidence;
- collected and selected evidence counts;
- strongest support and biggest challenge;
- all five completed report sections;
- uncertainty, reflection, and individual contribution;
- the completed final check and read-only sample state.

A scored rubric, feedback, and revision request remain a later review-capability phase.

### Signature moment

The strongest moment is opening an evidence preview from the existing final report and seeing that the fictional conclusion is supported by work already recorded in the lab.

### Build requirements

- Reuse `InvestigationFinalCaseComponent` and the current Final Investigation route unchanged in structure.
- Create one complete, scientifically consistent fictional runtime snapshot and final-case draft.
- Fill the existing identification, evidence selection, reasoning, counterevidence, recommendation, uncertainty, confidence, reflection, and contribution fields.
- Mark the relevant existing evidence records as collected, classified, important, or used in the final claim so the current sidebar and filters look complete.
- Include a saved theory and theory revision in the sample runtime so the Investigation Record is populated.
- Open the sample in read-only preview state and label it **Completed sample · Teacher and builder guide**.
- Keep the fictional snapshot separate from browser persistence used by the learner's actual investigation.

### Acceptance check

A viewer can understand all four identifications, inspect the selected evidence, read the reasoning and counterevidence, see the uncertainty and reflection, and reach the safety recommendation on the existing final page. Leaving the sample returns to the learner's unchanged work.

---

## 2. Frontier Trading Company

### Showcase title

**The Company Defense: One Season on the Trail**

### Excitement audit

**What already works**

The existing five-slide showcase converts an entire playable trading season into a defense. Its strongest quality is authenticity: the route, cargo, forecast, ledger, event, profit, score, and reflection are calculated from the team's saved decisions. Presentation mode, the three-minute timer, keyboard controls, a peer question, and print support are already present.

**Center the showcase on**

The dramatic turn is the difference between the original forecast and what actually happened after the trail event. The team should appear to have a reasonable plan, absorb a meaningful setback or opportunity, adapt, and then prove the final result with the ledger.

**Must be populated for the sample**

- a memorable fictional company name;
- one complete route with a visible map path, distance, days, and supply cost;
- a cargo load that uses capacity intentionally and contains several goods;
- a forecast that is plausible but not perfectly accurate;
- multiple purchase and sale ledger entries;
- one visually meaningful event with cash, cargo, time, or risk consequences;
- a strongest sale, reconciled final cash, actual profit, and score;
- all reflection sections, including the required calculation and peer-defense answer.

**Build emphasis for a stronger final**

- Choose sample numbers that create a story: a forecasted win, an interruption, a changed choice, and an earned final result.
- Use the current full-screen presentation mode as the default sample view.
- Make the Math Proof slide the payoff by ensuring every displayed equation is complete, labeled, and reconciled.
- Make the Adaptation slide show a clear before-and-after change rather than an event with negligible impact.
- Seed a peer question that forces the company to connect strategy to one exact calculation or ledger result.
- Give the featured student ownership of one calculation and the final defense response in the sample record.

**Defer**

A new slide engine, decorative wagon movie, multiplayer leaderboard, and duplicate showcase ledger are unnecessary for the sample pass.

### Decision-making and mastery detail

**Pressure point:** The company cannot maximize every advantage. A larger potential profit may require heavier cargo, more expensive supplies, a longer route, or greater exposure to trail events.

**Successful thinking path:**

1. Compare unit purchase prices, selling estimates, cargo space, route distance, supply cost, and available cash.
2. Build a load that fits both the budget and wagon capacity.
3. Calculate expected revenue, costs, and forecast profit before departure.
4. State the risk accepted by choosing the route and cargo.
5. Recalculate after the event changes cash, cargo, time, or demand.
6. Decide whether to preserve the original plan or revise it.
7. Reconcile the final ledger and explain the difference between forecast and actual profit.

**Sample feedback and revision:**

- What is working: “Your forecast uses the correct purchase cost, expected sales revenue, and route supply cost.”
- Next improvement: “Your first explanation says the ferry was safer, but it does not show whether its cost was smaller than the cargo value it protected.”
- Revision shown: the student adds a comparison between the ferry fee and the cost basis of the protected cargo.
- Mastery evidence: route/load plan, labeled calculation, event decision, reconciled ledger, forecast error explanation, and individual defense answer.

### Finished sample

Use a completed seeded trading season containing a company identity, starting cash, original cargo, route forecast, market purchases, trail event, revised decision, destination sales, ledger, actual profit, and reflection. Every number shown in the showcase must come from this single saved season record.

### Guided 90-second preview

**0–10 seconds — Arrival**  
Open as the wagon reaches the destination. The route line completes behind it, the ledger closes, and the season result counts from starting cash to final company value.

**10–25 seconds — The plan**  
Slide into the existing Route and Load presentation. Trace the selected route across the map while cargo cards stack into the wagon by weight. Show forecast demand and the team's original profit goal.

**25–43 seconds — Math proof**  
Transform the ledger into a clean equation. Highlight quantity × unit cost for purchases, quantity × selling price for revenue, event costs, and the final profit calculation. Let the audience inspect the exact ledger row behind any number.

**43–59 seconds — The season changed**  
Freeze at the trail event. Place the original plan on the left and the revised choice on the right. Animate only the changed values—cash, time, cargo, or risk—then play the student's saved reasoning for adapting.

**59–73 seconds — Defend the strategy**  
Enter the full-screen five-slide company defense with the three-minute presentation timer condensed for the preview. Draw a peer question: **“Which decision protected your profit most, and what evidence proves it?”** Reveal the team's answer only after the audience has a beat to consider it.

**73–90 seconds — Review the record**  
Zoom out from the presentation into the teacher review. Show the validated math proof, individual calculation ownership, decision evidence, peer-question response, and rubric marks beside the original season timeline.

### Explore mode

Keep the existing five-part presentation structure:

1. Season Result;
2. Route and Load;
3. Math Proof;
4. Adaptation;
5. Team Defense.

Add a discreet **Show the record** control on every slide. It should open the related source entries—route choice, cargo purchase, forecast, ledger transaction, event response, or reflection—without changing the official attempt.

### Teacher review reveal

The teacher view should include:

- forecast versus actual profit;
- a step-validated, labeled calculation;
- the decision timeline before and after the event;
- each student's owned calculation or defense response;
- the peer question and answer;
- rubric rows for planning, quantitative reasoning, adaptation, evidence, and communication.

### Signature moment

The route, cargo, and ledger collapse into one final profit equation, making the full season visibly traceable to the team's choices.

### Build requirements

- Reuse the existing Final Strategy Showcase, its five slides, presentation mode, timer, math proof, event comparison, peer question, keyboard controls, and print view.
- Seed one fictional completed season containing every record the existing slides already read.
- Make the sample company's route, load, forecast, ledger, event response, result, and reflection internally consistent.
- Open directly on slide one with a **Completed sample** label and keep the sample read-only.
- Use the existing free navigation for the live demo; a guided autoplay timeline is optional later.

### Acceptance check

Every showcased number can be traced to the official ledger, the event revision is visible, one peer question is answered, and the teacher can assess both the team result and individual reasoning.

---

## 3. Objects That Changed Us: Ancient Egypt

### Showcase title

**Museum After Hours: Life Along the Nile**

### Excitement audit

**What already works**

This is the only project whose final product is already designed as a place that classmates and families visit. The existing corridor, walk-up dialog, museum board renderer, artifact records, citations, MetaSteps embed, curator station, peer questions, accessible list, family preview, and teacher desk create a genuine exhibition rather than a submitted assignment.

**Center the showcase on**

The essential moment is walking from the corridor into a finished wing and discovering that three objects form one argument. In **Life Along the Nile**, the storage jar, linen fragment, and sickle should progressively reveal how farming, skilled craft, and the river shaped daily life.

**Must be populated for the sample**

- all four fictional teams and published snapshots;
- a working walk-up for all four corridor locations;
- one central claim, three artifacts, evidence connections, and citations per wing;
- distinct corridor preview art and complete alternative text;
- one working MetaSteps destination or the existing full-screen fallback per wing;
- a short curator transcript for every wing, even when sample video is absent;
- sample visitor questions, one individual defense, and teacher moderation state;
- a family-safe view containing no private classroom data.

**Build emphasis for a stronger final**

- Remove the current “coming soon” feeling by making every visible frame openable.
- Open the sample in the corridor, then feature the Nile wing as the clearest guided path.
- In the walk-up, keep the central claim visible while the visitor examines each object and its citation.
- Use curator transcripts as the reliable completed content; playable sample video can enhance them but should not be required.
- Demonstrate the same published wing once in corridor view and once in the accessible list to show they are equivalent paths.
- End with a thoughtful visitor question or individual defense, because that turns browsing into historical interpretation.

**Defer**

A second 3D engine, a redesigned museum builder, spatial audio, and a separate family website are outside the completed-sample showcase.

### Decision-making and mastery detail

**Pressure point:** A beautiful collection is not automatically a historical argument. The team must choose three objects that work together, avoid claims the objects cannot support, and communicate clearly to visitors who were not part of the research.

**Successful thinking path:**

1. Draft a central claim that is specific enough to test.
2. Compare possible artifacts and choose three that contribute different evidence.
3. Separate what is directly observable from what historians infer.
4. Explain how each artifact supports, complicates, or limits the central claim.
5. Cite the source used for every important interpretation.
6. Organize the wing so visitors encounter the evidence in a meaningful sequence.
7. Answer a visitor question and defend the claim individually.

**Sample feedback and revision:**

- What is working: “The jar, linen, and sickle show connected parts of daily life rather than repeating the same kind of evidence.”
- Next improvement: “The linen label describes the object, but it needs a clearer link to specialized labor and the central claim.”
- Revision shown: the curators add a sentence connecting flax agriculture, weaving skill, and household production.
- Mastery evidence: published claim, three artifact connections, citations, curator transcript, visitor response, and individual defense.

### Finished sample

Use the completed **Life Along the Nile** wing by the Nile Life Curators. The central claim connects farming, skilled craft, and the Nile to everyday Egyptian life. The three spotlight artifacts are the painted storage jar, linen textile fragment, and harvesting sickle, with their existing evidence connections and museum citations.

### Guided 90-second preview

**0–12 seconds — The museum opens**  
Open directly in the finished corridor. Museum lights rise in sequence and the four published wings become visible. The camera moves toward **Life Along the Nile** while the accessible list announces the same location and exhibit title.

**12–28 seconds — Enter the sample wing**  
Walk into the Nile wing. The central claim appears first, not the team biography. Three artifacts become active in the order needed to tell one connected story: storing food, producing linen, and harvesting crops.

**28–48 seconds — Follow the evidence**  
Select the sickle. A fine line connects the object to the claim while its interpretation and citation open together. Repeat quickly for the linen fragment, showing that two different sources support the connection. Clearly separate object description from curator interpretation.

**48–63 seconds — Meet the curators**  
The curator video begins in a picture-in-picture museum frame with captions. While the student explains how the objects work together, the relevant artifact receives a gentle spotlight. A transcript remains available beside the video.

**63–75 seconds — Ask the exhibit**  
Reveal a family visitor question: **“What can these objects tell us that a royal monument cannot?”** Show one student's individual defense response and link it back to an artifact and source.

**75–90 seconds — Change perspective**  
Move through three quick, real interface states: accessible list, family view, and teacher review. End on the complete museum corridor with all four wings available to enter.

### Explore mode

The visitor should be able to:

- walk the corridor and enter every completed sample wing;
- open an artifact, its evidence connection, and its citations together;
- launch the MetaSteps wing in the embedded viewer or full-screen fallback;
- watch or read the curator presentation;
- switch to the equivalent accessible list;
- leave a moderated question in student mode;
- view a privacy-safe version in family mode.

### Teacher review reveal

The teacher view should show:

- the published snapshot beside the current team draft;
- the central claim and three claim-to-artifact evidence connections;
- source completeness and citation checks;
- curator video or transcript completion;
- visitor questions and moderation state;
- each student's individual defense and contribution record;
- rubric rows for claim, object interpretation, evidence connection, sourcing, curation, and defense.

### Signature moment

One central claim becomes a visible network connecting three artifacts across the room. The audience sees the museum wing as an argument assembled in space.

### Build requirements

- Reuse the existing corridor, museum boards, MetaSteps embed, video/transcript station, accessible list, student preview, family preview, and teacher preview.
- Treat the existing four seeded boards as the fictional completed class exhibit and label them **Completed samples**.
- Complete the missing sample content needed for every current board to open in the existing walk-up view.
- Add sample transcript text where a prototype video has no playable media; do not build a new media system.
- Open on the corridor and use the current navigation for the demo; a guided camera path is optional later.

### Acceptance check

The showcase opens in the corridor, every sample wing can be visited, the selected wing communicates one claim through three sourced artifacts, and the same content is complete in student, family, accessible-list, and teacher-review views.

---

## 4. History Live: The Revolutionary War

### Showcase title

**History Live Special Report: Two Networks, One Revolution**

### Excitement audit

**What already works**

The existing player already looks and behaves like a broadcast: evidence scenes, network identity, live indicator, clock, lower third, ticker, transcript, package status, producer hold, take-next controls, audience reactions, and a post-show reflection. The producer console adds rundown order, perspective balance, readiness, evidence links, feedback, approval, and review history.

**Center the showcase on**

The strongest moment is a polished student claim freezing on screen while the viewer can inspect the historical evidence and its limits. The show should feel live, but the sourcing should remain more important than the television effects.

**Must be populated for the sample**

- an approved pitch with date, reporting mode, prediction, and opposing challenge;
- one featured student package with a strong headline and complete transcript;
- exactly three meaningful evidence scenes that progress with the report;
- explicit links from claims to sources and passages;
- one producer revision request, the resulting revision, and final approval;
- a balanced rundown containing both Continental and Crown perspectives;
- an audience response and a revised post-broadcast reflection;
- clear labels separating fictional seed segments from the featured completed student sample.

**Build emphasis for a stronger final**

- Start directly on the featured report in the existing broadcast player rather than at network selection or authoring.
- Give the three evidence scenes a purposeful order: establish the event, test the claim, then introduce the competing perspective.
- Keep captions and the full transcript visible even if the sample uses video.
- Make the producer feedback specific enough that the before-and-after change is obvious in review history.
- Use Hold and Take next once during the demo so the existing control-room experience feels active.
- End by revealing how hearing the other network changed or strengthened the student's claim.

**Defer**

A new broadcast renderer, live streaming system, synthetic anchor, and separate producer application are unnecessary for this showcase.

### Decision-making and mastery detail

**Pressure point:** The report must be clear and timely, but speed cannot justify an unsupported claim. Network perspective affects emphasis, while the reporter remains responsible for accuracy, corroboration, and the limits of the evidence.

**Successful thinking path:**

1. Turn a broad event into one reportable historical question.
2. Identify what the first source claims, who created it, and what it cannot establish alone.
3. Check a second or opposing source before treating the claim as confirmed.
4. Distinguish verified fact, reported claim, context, and interpretation in the script.
5. Choose three scenes because each supports a specific part of the report.
6. Respond to producer feedback without erasing the first submitted version.
7. After the broadcast, explain how another perspective changed or strengthened the story.

**Sample feedback and revision:**

- What is working: “Your opening distinguishes Parker's account from confirmed battlefield facts.”
- Next improvement: “The second paragraph presents the Patriot interpretation as settled. Attribute it and include the limit raised by Gage's account.”
- Revision shown: the student changes the line to attribute the interpretation, adds the opposing evidence scene, and narrows the conclusion.
- Mastery evidence: source annotations, claim links, original and revised script blocks, three-scene package, producer approval, and reflection revision.

### Finished sample

Use an approved student package with a saved pitch, annotated sources from more than one perspective, a sourced script, three evidence scenes, a captioned recording or complete transcript, producer feedback, and a revised reflection. Place it inside the existing class rundown between clearly labeled sample segments.

### Guided 85-second preview

**0–8 seconds — Stand by**  
Open on the producer countdown: 3, 2, 1. A network stinger resolves into the live desk, broadcast date, program title, and captions-on status.

**8–35 seconds — Take the student package**  
Play a condensed television-style report. Cycle through three evidence scenes while the reporter's sourced lines appear in captions. Use a lower third for reporter, network, place, and date; use the ticker only for verified context.

**35–49 seconds — Test the story**  
Pause on the strongest claim. Split the media wall into the two sources the student compared. Mark what each source can support, what it cannot support, and the exact script sentence that was revised after the opposing-network check.

**49–62 seconds — Producer review**  
Rewind into the submitted package. Show one concise producer note, the student's revision, and the approval stamp. The earlier script wording remains visible as a struck, preserved version rather than disappearing.

**62–73 seconds — Control room**  
Show the segment inside the class rundown with duration, readiness, next story, hold, resume, and take-next controls. Seed segments and student packages must carry visibly different labels.

**73–85 seconds — Reflection**  
Close with the student's post-broadcast reflection: one perspective that changed or strengthened the report. Transition into the teacher's source-and-rubric view.

### Explore mode

The viewer should be able to:

- play, pause, caption, and scrub the approved package;
- inspect each scene's source and the script line it supports;
- switch between video/audio and the complete transcript;
- view the pitch, script, revision history, producer feedback, and reflection;
- inspect the full producer rundown without acquiring producer permissions.

### Teacher review reveal

The teacher view should include:

- pitch and approval history;
- saved source annotations and perspective comparison;
- claim-to-source links for the script;
- the original and revised script blocks;
- all three evidence scenes;
- media and transcript status;
- producer notes and student response;
- reflection revision;
- rubric rows for historical accuracy, sourcing, perspective, script reasoning, production, and reflection.

### Signature moment

The broadcast freezes on a student's claim and the studio screen opens into the exact historical sources beneath it. The polished report and the research record become one surface.

### Build requirements

- Reuse the existing broadcast player, evidence scenes, lower thirds, ticker, transcript, producer console, feedback history, and reflection view.
- Seed one fictional approved student package with a complete pitch, sources, script, three scenes, transcript, producer note, revision, and reflection.
- Put the sample package into the existing rundown and label fictional seed segments separately from the featured completed sample.
- Open directly on the featured segment and use the existing producer controls for the demo.
- Use transcript playback if a sample recording is not already available; do not build a second player.

### Acceptance check

The audience watches a coherent report, verifies one claim against its sources, sees a meaningful revision, understands where the package sits in the rundown, and can read the entire experience without audio or video.

---

## 5. The Fate of the Republic

### Showcase title

**The Senate Responds: Judgment and Feedback**

### Excitement audit

**What already works**

The Senate showcase already has a strong theatrical structure: faction rails, a broadcast docket, chamber imagery, ceremonial titles, student speeches, evidence projection, moderator interventions, timed segments, private ballots, sealed-urn language, category results, and a before-and-after persuasion shift. It also preserves the student's opponent annotation, filed response, transcript or recording, and reflection. Most importantly, the other students are not passive viewers: they become the judging Senate.

**Center the showcase on**

The defining moment is the class response after hearing both sides. Students privately vote for the case that was most persuasive **in this debate**, then identify one strength and one useful next step for each faction. The reveal should answer three questions: Which case persuaded more students today? What did each side do well? What should each side improve next?

**Must be populated for the sample**

- balanced fictional contributions from the Caesarian Reformers and Republic Defenders;
- a featured opponent claim and the student's saved annotation of it;
- one featured rebuttal with cited evidence, reasoning, and transcript;
- an approved moderator question and saved response;
- enough program segments for the broadcast docket to feel like a proceeding without becoming slow;
- complete private sample choices for all five ballot categories;
- one structured positive-feedback selection for each faction;
- one structured improvement selection for each faction;
- short moderated feedback comments that refer to arguments and evidence rather than personalities;
- aggregate tallies that create a meaningful result rather than a sweep in every category;
- pre- and post-debate positions plus an individual reflection.

**Build emphasis for a stronger final**

- Open the sample near the featured opposing argument, not at the beginning of a long full session.
- Keep the marked opponent claim visible when the featured student's rebuttal begins.
- Project no more than two decisive evidence records during the featured exchange so the reasoning remains legible.
- Use the existing segment timer and moderator interruption to create tension without adding new effects.
- Keep the current private class vote, but label its result **Most persuasive case today** rather than an absolute winner.
- In the demo result, show a clearly labeled builder-guidance example after the current vote: **What this side did well** and **What would make this side stronger** for both factions.
- Let different factions lead different categories so the result recognizes multiple strengths.
- Reveal the persuasion vote, strengths, and improvement goals together. Do not show a faction as simply winning or losing.
- Never rank individual students publicly. Speaker-specific feedback belongs privately in the student's review record.

**Defer**

A second chamber experience, live multiplayer orchestration, external AI moderator, public student leaderboard, and unrestricted public comments are not necessary for the fictional completed session.

### Decision-making and mastery detail

**Pressure point:** The student cannot deliver a prepared speech without listening. The response must fairly represent the opponent, answer the actual claim, select relevant historical evidence, explain the tradeoff, and withstand the judging Senate's questions.

**Successful thinking path:**

1. Listen to the complete opposing contribution.
2. Mark the exact claim and summarize it fairly before disagreeing.
3. Decide whether the disagreement is about evidence, interpretation, consequence, or values.
4. Select the most relevant source instead of the largest number of sources.
5. Build the rebuttal as opponent claim → response → evidence → reasoning → consequence for the Republic.
6. Answer the moderator's question directly and acknowledge a real tradeoff.
7. Read the class's strength and improvement feedback, then revise the reflection or a later-round response.

**Mastery feedback structure:**

- Peer vote: “Which case was most persuasive today?” This measures audience judgment, not mastery by itself.
- Peer strength: “The Republic Defenders connected the Rubicon evidence clearly to limits on military power.”
- Peer next step: “Acknowledge the danger of continued gridlock before arguing that Caesar's solution was worse.”
- Teacher feedback: “Your rebuttal is historically supported and directly answers the claim. To reach Transfer, apply the same rule-of-law reasoning to the dictator-in-perpetuity evidence.”
- Revision shown: the student reflection identifies the overlooked tradeoff and explains how the next response would address it.
- Mastery evidence: opponent annotation, cited rebuttal, moderator answer, recording or transcript, peer-feedback response, and individual reflection.

### Finished sample

Use one condensed, completed session between the Caesarian Reformers and Republic Defenders. The featured student is an Evidence Senator whose filed rebuttal cites the Rubicon and the long-term crisis of the Republic, answers a preserved opposing claim, and responds to an approved moderator question. The session ends with private class ballots, constructive feedback for both factions, and an aggregate class judgment.

The fictional result should be close enough to feel authentic. For example:

- **Most persuasive case today:** Republic Defenders 58%, Caesarian Reformers 42%;
- **Caesarian Reformers did well:** connected Caesar's reforms to Rome's long-running crisis;
- **Caesarian Reformers could improve:** answer the rule-of-law concern more directly;
- **Republic Defenders did well:** connected the Rubicon evidence to republican limits;
- **Republic Defenders could improve:** acknowledge more clearly the risks of government inaction;
- **Class opinion shift:** show how positions moved before and after the debate without declaring one view permanently correct.

### Guided 90-second preview

**0–12 seconds — Convene the Senate**  
The chamber doors open, faction rails illuminate, and the presiding consul calls the proceeding to order. Show the driving question and the class position before debate.

**12–29 seconds — Hear the opposition**  
Play a short opposing argument from the filed record. As it ends, preserve the exact claim the featured student marked. The Rubicon evidence card moves to the central projection table.

**29–47 seconds — The student address**  
Play or reveal the featured rebuttal. Highlight the fair summary of the opponent, cited evidence, reasoning, and consequence for the Republic as four distinct beats. Keep the speaker's transcript available throughout.

**47–60 seconds — The moderator interrupts**  
The consul asks: **“If Rome was already in crisis, when does emergency leadership become a threat to republican government?”** Pause the clock, then play the student's saved answer and show the second supporting source.

**60–70 seconds — The judging Senate votes**  
Move to the completed fictional ballot summary. Explain that in the normal project the other students privately vote for the most persuasive case today, best use of evidence, strongest rebuttal, persuasive speaker, and most important argument. In the teacher/builder demo, the ballots are already complete and read-only, and individual selections remain hidden.

**70–81 seconds — Show useful feedback**  
Reveal fictional completed feedback for both factions: **What this side did well** and **What would make this side stronger**. Use structured tags such as clear claim, strong evidence, direct rebuttal, explained reasoning, acknowledge the tradeoff, answer the opposing claim, or connect evidence to the conclusion. Label this panel **Builder guidance example** because the normal project does not yet collect this additional feedback.

**81–90 seconds — Reveal the class judgment**  
Reveal the persuasion vote, category results, the leading strength for each faction, and one aggregated improvement goal for each faction. Finish on the before-and-after opinion shift. The language is **more persuasive today**, **recognized strengths**, and **next improvements**—never complete winner and loser.

### Explore mode

The viewer should be able to:

- move through the condensed proceeding by segment;
- replay the opposing argument and student response;
- open projected evidence with citation and context;
- read every transcript;
- inspect the approved moderator question and response;
- preview the private ballot without exposing individual votes;
- inspect the fictional strength and improvement example for both factions;
- reveal the aggregate persuasion vote, recognized strengths, and next improvements in sequence;
- inspect the student's individual reflection.

### Teacher review reveal

The teacher view should show:

- what opposing contribution the student heard and marked;
- the filed opening or rebuttal with immutable version and timestamp;
- cited evidence and the reasoning contribution;
- rehearsal and reviewed recording or transcript;
- moderator prompt and response;
- final private position without exposing it to peers;
- a builder-guidance example of feedback the student could receive, separated into recognized strengths and next improvements;
- teacher moderation state for optional written peer comments;
- individual reflection;
- rubric rows for listening, claim, evidence, rebuttal, historical reasoning, speaking, and reflection.

### Signature moment

The seals break to reveal not only which case persuaded more students today, but also what the audience valued in both cases and what each faction should improve. Every side leaves with evidence of success and a clear next step while individual ballots remain private.

### Build requirements

- Reuse the existing debate premiere, two faction rails, evidence projection, moderator segments, recording/transcript display, private ballot, verdict steps, and reflection.
- Seed one compact fictional completed session with balanced contributions and every ballot category populated.
- Center the sample on one featured student whose opponent claim, annotation, evidence, response, and moderator answer are all present in the existing record.
- Open the existing premiere at the featured exchange and let the presenter advance with current controls.
- Keep individual ballots private and use the existing aggregate verdict reveal for the persuasion result.
- Do not extend the current live ballot for this demo. Place a read-only builder-guidance feedback example beside the existing fictional aggregate result.
- Show structured strength and improvement feedback for both factions only inside the isolated completed sample.
- If this feedback workflow is later approved for production, aggregate tags for the public reveal and route speaker-specific or optional written comments only to private teacher/student review.
- Replace winner/loser language with **Most persuasive case today**, **What worked**, and **Next improvement**.

### Acceptance check

The teacher or builder sees both sides, follows one evidence-based rebuttal, sees a moderator challenge, reviews fictional aggregate votes, and inspects example positive and improvement feedback for both factions. The read-only reveal shows judgment and learning-focused next steps without exposing private records, changing the live ballot, or labeling any student as a loser.

---

## 6. Race Around the World

### Showcase title

**The Voyage We Chose: Five Decisions Across the Atlantic**

### Excitement audit

**What already works**

The current replay automatically turns saved choices into scenes on an animated map. It already provides play, pause, previous, next, scene selection, scene inclusion, narration, student reasoning, audio or transcript, mastery-evidence tags, and a Captain's Log. The underlying record is unusually rich: citations, predictions, resources, consequences, tutor turns, and response revisions all belong to exact chapters.

**Center the showcase on**

The storm is the natural centerpiece. The audience first understands the expedition's purpose and intended route, then watches the storm force a decision that bends the route and changes supplies, crew, time, and the later encounter. The map becomes the consequence of the student's reasoning.

**Must be populated for the sample**

- all five completed chapters in the existing replay timeline;
- a coherent purpose, supply choice, route choice, storm response, and encounter decision;
- one exact paragraph citation and explanation per chapter where required;
- a prediction before the consequence is revealed;
- meaningful resource values before and after the storm;
- one tutor question tied to the exact response version;
- one visible original response and revision;
- text or transcript for every scene so the replay never depends on sample audio.

**Build emphasis for a stronger final**

- Choose a sample path with a clear narrative arc rather than five independent “best” answers.
- Seed the system narration so every current scene explains both the choice and its consequence.
- Make the storm scene's route line and resource change visually obvious using the existing map and scene card.
- Surface the cited paragraph, prediction, and revision near the current scene when the existing replay can support it; these are stronger than adding decorative animation.
- Keep all five scenes short enough that the existing seven-second timing produces a concise replay.
- End on the two-account encounter because it adds perspective and ethical reasoning to the geographic journey.

**Defer**

A rendered MP4, a new world map, additional chapters, and a separate replay editor are outside the completed-sample showcase.

### Decision-making and mastery detail

**Pressure point:** The shortest route is not automatically the strongest choice. Students work with incomplete geographic knowledge, limited supplies and time, changing winds, risk to the crew, and accounts written from different perspectives.

**Successful thinking path:**

1. Choose an expedition purpose and identify who benefits from it.
2. Prioritize supplies by connecting the cargo choice to a specific voyage risk.
3. Compare route distance, winds, resupply, and uncertainty rather than selecting from distance alone.
4. Make and record a prediction before seeing the consequence.
5. Respond to the storm by deciding which original goal or resource can be sacrificed.
6. Compare the ship's account with the community account at the encounter.
7. Use tutor or teacher feedback to revise an explanation while preserving the original.
8. Judge the voyage using both its intended goal and its human consequences.

**Sample feedback and revision:**

- What is working: “You used the wind chart to explain why the direct route could save time.”
- Next improvement: “Your first response names speed but does not account for the lack of a planned resupply point.”
- Tutor prompt: “Which piece of evidence shows what your route gives up in exchange for speed?”
- Revision shown: the student cites the portolan paragraph about known ports and explains that the route accepts a larger supply risk.
- Mastery evidence: route comparison, exact citation, prediction, consequence, resource changes, preserved tutor exchange, revised response, and final encounter reasoning.

### Finished sample

Use a completed five-chapter expedition whose record includes a purpose, ship preparation, route choice, storm response, first-encounter decision, exact paragraph citations, predictions, tutor exchanges, consequences, resource changes, revised reasoning, and route history. The fixture should tell one coherent story rather than selecting the safest or highest-scoring choice in every chapter.

### Guided 90-second preview

**0–10 seconds — Unroll the chart**  
Open on the Atlantic map as a captain's log stamp appears: five chapters recorded. The ship leaves Lisbon and the route begins drawing in real time.

**10–28 seconds — Decisions become the route**  
Move quickly through the sponsor, supplies, and route chapters. At each waypoint, show choice, one cited source fragment, prediction, and the immediate resource tradeoff. Keep each beat visually consistent so the audience learns how to read the record.

**28–48 seconds — The storm changes everything**  
Darken the map at Cape Verde. Display the pre-storm plan, then bend the animated route toward the student's new decision. Animate only the changed supplies, crew, and time values. Play the student's reasoning, then reveal the actual consequence.

**48–63 seconds — Reasoning revised**  
Open the saved tutor exchange. Show one question that caused the student to reconsider a claim, the before-and-after response, and the unchanged original version. The tutor does not award a grade.

**63–76 seconds — Two accounts, one encounter**  
Show the official ship account and community account side by side. The student's final decision cites both, identifies who benefits and who bears the cost, and states remaining uncertainty.

**76–90 seconds — The complete expedition record**  
Pull back to the full route history and five-scene replay timeline. Then open the teacher's complete decision record and rubric, with every chapter's choice, evidence, prediction, consequence, revision, and resource change aligned.

### Explore mode

The viewer should be able to:

- play or scrub the five-scene animated voyage;
- pause at any waypoint and open the chapter record;
- compare prediction with actual consequence;
- inspect the exact cited paragraph and the student's explanation of its use;
- read tutor turns attached to the exact response version;
- compare original and revised reasoning;
- hear student audio or read its transcript;
- inspect the complete Captain's Log and route history.

### Teacher review reveal

The teacher view should include one row per chapter with:

- selected choice and route point;
- offered and viewed evidence;
- exact citation plus explanation;
- prediction and consequence;
- resources before and after;
- original and revised response;
- tutor exchange tied to the response fingerprint;
- mastery-evidence tags without an automatic mastery award;
- rubric rows for evidence, geographic reasoning, cause and consequence, source perspective, ethical reasoning, and revision.

### Signature moment

At the storm, the intended route visibly breaks and redraws from the student's decision. The map becomes a living record of reasoning and consequence.

### Build requirements

- Reuse the existing replay player, animated map, Captain's Log, citations, tutor exchange, consequences, route history, and current teacher review.
- Seed one fictional completed five-chapter record containing exact citations, predictions, tutor turns, consequences, and at least one revision.
- Open directly in the existing replay and let its current scene timing provide the 60–90 second demo.
- Make every map point and resource change come from the fictional journey record already consumed by the replay.
- Use the existing text and transcript alternatives; do not create a separately rendered voyage movie.

### Acceptance check

The audience can follow the complete route, identify all five decisions, inspect at least one exact citation, see prediction versus consequence, understand one revision, and review the full decision history without replaying the student workflow.

---

## Reuse-first implementation sequence

### Phase 1 — Inventory the existing final surfaces

- Confirm the exact existing route and runtime record used by each final presentation.
- List every field that must be filled for that existing surface to look complete.
- List any sample media or transcript already present and identify only true content gaps.
- Do not introduce a shared showcase schema until the six existing runtimes prove that one is necessary.

### Phase 2 — Build fictional completed records

- Create one deterministic completed fixture for each project using its current runtime shape.
- Keep claims, totals, routes, citations, choices, revisions, and outcomes internally consistent.
- Add a **Completed sample · Teacher and builder guide** label.
- Load the fixture only in sample preview so it cannot replace real learner work.

### Phase 3 — Fill only the missing sample content

- Add the completed lab text and evidence classifications.
- Add the trading season numbers and reflection.
- Add missing museum wing walk-up content and curator transcripts.
- Add the approved news package and producer revision.
- Populate the isolated Senate sample with a balanced exchange, fictional private-vote totals, and a clearly labeled builder-guidance example of strengths-and-improvements feedback.
- Add the five-chapter expedition, tutor exchange, and revision.

### Phase 4 — Open each existing final directly

- Add a sample-preview entry point for each project.
- Start at the strongest existing final screen rather than the student authoring flow.
- Use current presentation controls and navigation.
- Provide a clear exit back to the normal project without changing its saved state.

### Phase 5 — Showcase QA

- Verify every display against its completed fixture and immutable saved record.
- Test keyboard-only use, screen-reader order, captions/transcripts, 200% text enlargement, narrow screens, reduced motion, and no-audio completion.
- Verify that teacher-only, family-safe, aggregate, and private information remain separated in every preview state.
- Confirm that restarting a showcase returns to the same completed example and never mutates its official record.
- Re-run each normal student launch and completion path and confirm the demo work changed no activity, gate, rule, score, submission, permission, or persistence behavior.

## Definition of done for the showcase collection

The collection is complete when each project:

1. opens directly into its existing final surface with a credible fictional completed record;
2. can be presented coherently in 60–90 seconds using current navigation and controls;
3. allows free exploration of the same sample record;
4. makes evidence, decision, revision, and final product visibly connected;
5. does not require a duplicate showcase interface;
6. offers the current keyboard, transcript, and reduced-motion alternatives wherever available;
7. uses a resettable sample that cannot be confused with or overwrite live student work;
8. leaves the normal project sequence and runtime behavior unchanged;
9. presents mastery feedback as a teacher/builder example unless that feedback already exists in the project.
