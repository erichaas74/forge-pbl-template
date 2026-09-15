# Eight-lesson project audit and testing guide

Audited September 14, 2026. The revised presentation specifies **four weeks, eight lessons**, with one live/individual lesson followed by one group lesson each week. Each lesson lasts an estimated 45–60 minutes, produces one main output, and includes an independent checkpoint for every student. Group evidence never stands in for an individual response.

## Source and scope

Primary schedule: [AI Tutor Weekly Plan Revised](../../output/ai-tutor-presentation/deliverables/AI_Tutor_Weekly_Plan_Revised.pptx), especially slides 5–9 and 10–16. The existing [four-week project map](AI_TUTOR_FOUR_WEEK_LESSON_PLAN.md) supplied the initial outputs; this implementation adds the revised independent probes, criteria, prerequisite guidance, and current-workspace audit.

Audited all 16 registered catalog projects against the catalog, TypeScript project configurations, current public project packages, template launchers, and their workspaces. The current Shadow Gallery package is version 2.0.0, not the older gallery package. Harbor Records Rescue is an unregistered legacy package, so it has no catalog lesson tabs. The race-car engineering and research-symposium homepage concepts are unbuilt and remain outside the runnable catalog.

| Week | Individual lesson | Group lesson |
| --- | --- | --- |
| 1 | 1. Launch: model a skill, make an attempt, check prerequisites | 2. Plan: agree on scope and roles; each person explains a contribution |
| 2 | 3. Evidence: learn a method and answer a fresh example | 4. First version: combine work and test a changed condition |
| 3 | 5. Revise: preserve earlier work, correct it, independently recheck | 6. Rehearse: defend a change with feedback and consider a limitation |
| 4 | 7. Defend: complete an individual transfer task | 8. Final: present the product, answer a personal defense, reflect |

## Test the focused workspaces

Run `npm start` in `forge-pbl-template`. The visual activity is the lesson screen. A small **1 / 8** picker opens the same eight lesson choices; **•••** holds secondary project navigation and tools. There is no added lesson-plan page, project header, or footer over the activity.

- `/projects/mystery-substance/experience?lesson=6` opens Shelf Restoration: one vial, one question, four possible labels. Continue proceeds to position, handling, and evidence reasoning; Back preserves previous answers.
- `/projects/:projectId/lessons?lesson=N` now mounts the real workspace using its reviewed activity route. Unlike the earlier planner implementation, runtime projects resolve their student session. The Community Story Network remains a static concept preview and never resolves a student session.
- The picker changes only the query, retaining the mounted workspace. Optional native view bindings open the relevant workspace without completing learning, submitting work, spending resources, or advancing a simulation's round/day/mission.
- Normal activity links without a lesson query resume their existing native view. Final-example links remain examples and do not receive a student lesson focus.
- Existing gates still apply: Time Repair requires an earned jump; the investigation requires final readiness; news production and the trading showcase enforce their original prerequisites. Selecting lesson 8 cannot fabricate a completed product.
- Unknown numbers use lesson 1. An unreviewed project version cannot borrow the current schedule.

### Native focus coverage

| Project | Native view behavior when selecting lessons |
| --- | --- |
| The Unlabeled Shelf | Scanner → sequential theory questions → properties → reactions → matter tracker → sequential restoration → Bay 3 → existing final-readiness gate |
| Frontier Trading Company | Market / route / events / ledger / report / showcase; session setup, pending events, and final gates remain authoritative |
| Objects That Changed Us | Edit the existing assigned room; lessons 6 and 8 preview the student's own room; no automatic submission |
| History Live | Network / pitch / sources / script / production / broadcast through existing workflow checks |
| Survival Island Story Lab | Writer / map / writer / playtest / writer / playtest / writer / publish review; the same story drafts remain available |
| Calendar Monument | Existing five learning steps distributed across lessons 1–6, then explanation and presentation; no answers or checks supplied |
| Robot Delivery Code Lab | Workspace / evidence review / championship panel; native mission selection and championship reveal remain under existing controls |
| The Cartographer's Vault | Resume the active/next painting for workshop lessons, ledger for review, existing heist gate for the final; no automatic restoration |
| Time Repair | Control / evidence archive / ripple review; the student still earns and initiates a jump |
| Race Around the World | Continue current voyage decision; lesson 7 opens the log, lesson 8 opens an existing replay or resumes an unfinished voyage |
| Cascade Bay Crisis Center | Room / map / station / command / news; preserves current exercise time, role, resources, and developments |
| Live Strategy League, Championship Show, Midnight Menagerie, Fate of the Republic | The lesson picker identifies the teaching lesson while the native game/session remains at its earned round, rescue, or speaking turn; no forced advancement |
| Community Story Network | Classroom lesson sequence and existing static visual concept; a reporting/publishing runtime is still unavailable |

Secondary headers are collapsed in all runnable template workspaces. The gallery now puts the painting beside a single repair question; source selection, source relationship, and explanation appear in sequence. Story portals and reference material remain available, and comparison/export controls are secondary. Primary trade instruments and the current league action remain on the activity. Native help/settings stay accessible inside the tools disclosure; Escape and outside clicks dismiss it. Save errors remain visible for the story and museum when their normal save badges are collapsed.

## Assessment and current limits

Each lesson has a project-specific personal probe. The plan includes the teacher action and evidence bundle required by the revised deck. Check explanations against the listed evidence criteria and the course's selected standards. The criteria are learning targets, not a claim of complete coverage of grade/state standard codes. A teacher should select the precise codes and fresh examples for their course before assessing mastery.

The lesson navigator does not implement the future cross-project AI assessor, eight saved checkpoint bundles per learner, standards confirmations, or new gate enforcement. Keep checkpoint evidence in the project's existing saved work or a teacher evidence folder during testing. Future gates must name a prerequisite, its pass evidence, and the exact action released; keep unrelated work open during a 5–10 minute explanation/practice/fresh-recheck cycle. Teacher review remains necessary for final confirmation.

## Project-by-project arrangement

### The Unlabeled Shelf · project 1.0.0

**Final:** restored-shelf case file and scientific defense.

**Audit and pacing:** Use the scanner, Properties Lab, Reaction Bench, Matter Tracker, Shelf Restoration, and Bay 3 in that order. Keep checkpoint explanations with the case evidence.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Observe the shelf. Scanner and inventory | Inventory observations and an initial prediction about the substances. | Which detail did you observe, and which part of your identification is still an inference? |
| W1 / L2 · Plan | Plan the investigation. Case notes and Properties Lab | Case-file notes, a shared working theory, and a test plan. | Which test will you contribute, and how could its result distinguish two possible substances? |
| W2 / L3 · Evidence | Compare properties. Properties Lab: water, conductivity, texture | Property-comparison record and an explanation of a useful difference. | A fresh sample dissolves in water. Is that enough to identify it? Explain the next useful comparison. |
| W2 / L4 · First version | Build substance profiles. Reaction Bench and comparison evidence | Reaction-test evidence and updated substance profiles. | If two samples react similarly, what other evidence would you need before choosing a label? |
| W3 / L5 · Revise | Account for the matter. Matter Tracker: open and closed chamber | Conservation explanation supported by a model or test. | Explain an earlier mass-change error. Predict what a new closed-chamber trial should show and why. |
| W3 / L6 · Rehearse | Rehearse the restoration. Shelf Restoration and evidence review | Proposed shelf restoration, evidence links, and a remaining uncertainty. | Defend one revised label using a test result. What result would make you reconsider it? |
| W4 / L7 · Defend | Respond to Bay 3. Bay 3 emergency response | Bay 3 emergency-response reasoning showing transfer of learning. | Use the available observations to justify a response to a new unknown and explain what remains uncertain. |
| W4 / L8 · Final | Present the case. Final case file and shelf defense | Final case file, evidence-based defense, and individual reflection. | Defend one label using your own evidence. Explain a revision and what you would test next. |

### Frontier Trading Company · project 1.15.0

**Final:** trading record and strategy showcase.

**Audit and pacing:** Continue the same saved trading season across lessons. Shopping, travel, and showcase readiness keep their existing rules; lesson selection does not execute a trade or advance a day.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Forecast a trade. Opening practice and market prices | A unit-price or profit calculation and starting strategy. | How did you calculate profit per unit? Recalculate it when the purchase price increases. |
| W1 / L2 · Plan | Plan the company. Company setup, cargo, and route map | Company plan, initial cargo choices, and route forecast. | Explain your cargo contribution. What must change if its capacity requirement doubles? |
| W2 / L3 · Evidence | Compare the options. Market, cargo, and route calculations | Cost, capacity, or distance comparison with reasoning. | Compare two purchases at fresh prices. Show total cost and whether each fits the available capacity. |
| W2 / L4 · First version | Test the trading plan. Trading post, travel events, and ledger | Trading results, ledger evidence, and an event-response decision. | Compare a forecast with a completed trade. Would the decision still work with a higher travel cost? |
| W3 / L5 · Revise | Correct the forecast. Ledger and strategy report | Forecast-versus-result explanation and corrected math. | Identify one forecast error, correct the calculation, and apply the corrected method to a new quantity. |
| W3 / L6 · Rehearse | Rehearse the pitch. Company Strategy Showcase draft | Revised strategy, selected trade evidence, and a practice pitch. | Defend a strategy revision with ledger evidence. Under what market condition would it fail? |
| W4 / L7 · Defend | Defend a new trade. Trade calculations and selected ledger proof | Individual calculation and defense of a strategic choice. | Evaluate a new price or cargo limit independently and defend the resulting recommendation. |
| W4 / L8 · Final | Show the strategy. Company Strategy Showcase | Final strategy showcase, trading evidence, and reflection. | Explain your best-supported decision, show its math, and reflect on what your contribution changed. |

### Objects That Changed Us: Ancient Egypt · project 2.3.0

**Final:** curated room in the class museum.

**Audit and pacing:** Use the assigned-room museum composer and visitor review. Keep individual research and curator defenses alongside the room; publishing follows the existing submission workflow.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Read an artifact. Museum room and artifact research | Artifact observation, research question, and initial source note. | What can you observe directly about this artifact, and which interpretation needs a source? |
| W1 / L2 · Plan | Plan the room. Assigned room, theme, and artifact shortlist | Room theme, proposed claim, and artifact shortlist. | Explain your selected artifact and how it supports the room claim. What could a visitor misunderstand? |
| W2 / L3 · Evidence | Write a sourced label. Composer: artifact labels and sources | Draft artifact label supported by a source. | Use a fresh source passage to support a label claim. Identify the source and one limit of the evidence. |
| W2 / L4 · First version | Build the first room. Room layout and label composer | First room layout with artifacts, labels, and evidence connections. | Explain an artifact-label connection. How would the claim change if that artifact were removed? |
| W3 / L5 · Revise | Revise an interpretation. Label editor and source review | Revised label or interpretation with a reason for the change. | Show an overclaim you corrected, then write a more precise claim for another artifact. |
| W3 / L6 · Rehearse | Walk through the museum. Visitor preview and peer critique | Peer museum walkthrough, feedback, and room improvements. | Defend a room change using visitor feedback. What question does the current layout still leave open? |
| W4 / L7 · Defend | Practice the curator defense. Curator notes and final source check | Individual curator explanation and final evidence check. | Interpret a new artifact detail independently and connect it to an identified source. |
| W4 / L8 · Final | Open the exhibition. Room submission and class museum | Class exhibition, completed room, and responses to visitor questions. | Answer a visitor question about your contribution, cite its evidence, and reflect on a revision. |

### History Live: The Revolutionary War · project 1.1.0

**Final:** sourced news package in a class broadcast.

**Audit and pacing:** Use network selection, assignment pitch, Source Wall, script, production, and broadcast review. Historical date and producer approval rules remain in force.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Find the story angle. Network choice and Source Wall | Source-perspective notes and a possible story angle. | Identify a source and its perspective. Which part of your proposed story does it actually support? |
| W1 / L2 · Plan | Pitch the news package. Assignment desk and story pitch | Story pitch, reporting roles, and research plan. | Explain your reporting role and source choice. Whose perspective is still missing from the plan? |
| W2 / L3 · Evidence | Verify a claim. Source Wall and research notes | Verified claim linked to a source passage. | Use a fresh passage to support a claim and explain what the passage cannot establish. |
| W2 / L4 · First version | Draft the broadcast. Script and visual rundown | First sourced script and visual rundown. | Defend a line in the script. How would you rewrite it if its only source were unconfirmed? |
| W3 / L5 · Revise | Revise the reporting. Script revision and source comparison | Revised script contribution addressing perspective or uncertainty. | Explain a perspective or date error you corrected, then assess a new claim for the same problem. |
| W3 / L6 · Rehearse | Rehearse the segment. Production recording and preview | Rehearsal or rough recording and editorial feedback. | Use editorial feedback to defend a revision. What uncertainty must remain explicit on air? |
| W4 / L7 · Defend | Defend the sources. Final script and source evidence | Individual source defense and final segment revision. | Evaluate a new source passage and explain whether it changes your report before the reporting deadline. |
| W4 / L8 · Final | Go live. Approved news package and class broadcast | Class broadcast, final package, and reflection on another perspective. | Defend your bylined contribution with a source passage and reflect on another network’s perspective. |

### The Fate of the Republic · project 2.0.0

**Final:** Senate address, rebuttal, and class proceeding.

**Audit and pacing:** Use the existing Senate rounds and recordings. Groups plan and critique together, while each senator retains an individual argument and defense. Moderator and round gates still apply.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Form an initial position. Initial opinion and Senate evidence | Initial position and a historical evidence note. | Identify your initial claim and one source supporting it. What does that source leave uncertain? |
| W1 / L2 · Plan | Build the case. Faction planning and evidence selection | Shared case outline, roles, and supporting sources. | Explain your contribution to the shared case and why its source supports that particular claim. |
| W2 / L3 · Evidence | Listen and gather evidence. Listening marks and response notes | Claim-evidence-reasoning paragraph and notes on an opposing argument. | Summarize a fresh opposing claim fairly, then choose relevant evidence for a response. |
| W2 / L4 · First version | Draft the address. Opening and response preparation | Draft address and evidence-based rebuttal. | Explain your rebuttal. How would you change it if the opponent narrowed the claim? |
| W3 / L5 · Revise | Strengthen the rebuttal. Rebuttal round preparation | Revised rebuttal that answers the opposing case. | Show a weak response you corrected, then answer a new counterargument without hints. |
| W3 / L6 · Rehearse | Rehearse the exchange. Practice recordings and crossfire preparation | Practice debate, feedback, and revised speaking plan. | Defend a speaking-plan revision using feedback. Which counterargument still challenges your case? |
| W4 / L7 · Defend | Defend a source. Individual rehearsal and moderator question | Individual rehearsal and explanation of a key source. | Use a new source detail to defend or revise your position and explain its limitation. |
| W4 / L8 · Final | Hold the proceeding. Final addresses, premiere, and verdict | Senate proceeding, filed address/rebuttal, and individual reflection. | Explain your strongest evidence, answer a personal challenge, and reflect on whether your position changed. |

### Race Around the World · project 1.3.0

**Final:** expedition replay and Captain's Log.

**Audit and pacing:** Spread the five existing voyage decisions across the cycle. Use Captain’s Log and the recorded replay. Retain prediction, citation, resource, and decision prerequisites.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Choose a purpose. Mission opening and Atlantic map | Mission preference, geographic reasoning, and a prediction. | What geographic information supports your mission preference, and what consequence do you predict? |
| W1 / L2 · Plan | Provision the voyage. Choose the Mission and Prepare the Ship | Mission and provisioning decisions with initial log entries. | Explain your supply contribution. What would you change if the journey took longer? |
| W2 / L3 · Evidence | Compare routes. Route map and Atlantic Wind Notes | Route comparison supported by a source citation. | Compare a fresh route condition with the chart and explain how it changes your recommendation. |
| W2 / L4 · First version | Record the first passage. Choose the Route and Captain’s Log | Recorded route decision, prediction, and consequence. | Compare the recorded consequence with your prediction. Would another wind condition change your choice? |
| W3 / L5 · Revise | Respond to the storm. The First Crisis and Storm-Damaged Ship Log | Storm-response explanation using evidence and resource tradeoffs. | Correct one resource assumption, then justify a response to a new storm condition. |
| W3 / L6 · Rehearse | Complete the encounters. First Encounter and log revision | Remaining voyage/encounter decisions and a revised log entry. | Defend a revised encounter decision using evidence. Whose perspective limits your account? |
| W4 / L7 · Defend | Defend a decision. Captain’s Log and replay review | Individual explanation of one decision and its consequence. | Apply your decision method to a new resource or source condition and explain the likely consequence. |
| W4 / L8 · Final | Replay the expedition. Our Expedition Record and team defense | Expedition replay, selected log evidence, and team defense. | Explain your own decision, show its recorded evidence and consequence, and reflect on an alternative. |

### Survival Island Story Lab · project 1.2.0

**Final:** each student's playable branching story; groups act as writing and playtesting circles.

**Audit and pacing:** Each student keeps their own playable story. Group lessons are writing circles and peer playtests, not a merged class story. Use the existing scene editor, branch map, playtest, and publish review.

**Grouping:** Each student authors a separate story. Group lessons are writing circles and peer playtests.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Write the opening. Historical setting and opening scene | Story premise, historical setting, and opening scene attempt. | Which detail establishes the character’s goal, and how does it fit the chosen setting? |
| W1 / L2 · Plan | Plan the reader choices. Story Memory and branch map | Peer discussion of each story's direction and initial reader choices. | Explain a choice in your own story. How do its consequences differ from the other option? |
| W2 / L3 · Evidence | Draft connected scenes. Scene writer and reader choices | Draft scenes showing character goals and consequences. | Write a fresh consequence for a changed character choice and explain how continuity is preserved. |
| W2 / L4 · First version | Run the first playtest. Playable story and peer notes | First peer playtest and notes on unclear or weak choices. | Explain a reader’s result. What changes if the reader takes the other branch? |
| W3 / L5 · Revise | Repair a weak branch. Scene and choice revision | Revised scenes or branches with an explanation of changes. | Show a continuity problem you fixed, then predict the effect of a new edit on a later scene. |
| W3 / L6 · Rehearse | Test every ending. Branch map, path testing, and peer feedback | Further path testing, ending feedback, and revision priorities. | Defend a revision using a reader’s feedback. Which untested path could still break the story? |
| W4 / L7 · Defend | Defend the craft. Final story and author’s evidence | Completed individual story and explanation of a writing decision. | Given a new character constraint, explain how you would adapt a scene without breaking its consequences. |
| W4 / L8 · Final | Share playable stories. Publish review and story showcase | Playable-story showcase, reader responses, and author reflection. | Explain your own writing decision, show a revision, and reflect on a reader’s response. |

### From Sundial to Sun Monument · project 1.0.0

**Final:** tested solar monument and design explanation.

**Audit and pacing:** Use the existing sundial and season investigations before monument construction. Keep trial-notebook evidence and use the actual design exhibit for the final.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Follow a shadow. The sundial surprise and daily Sun | Sundial attempt and observations across a day. | What changed during the day, and which observation supports your prediction for a later hour? |
| W1 / L2 · Plan | Compare the seasons. The angle of a season | Shared seasonal comparison and an initial explanation of changing shadows. | Explain your seasonal comparison. What must stay the same for the comparison to be fair? |
| W2 / L3 · Evidence | Explain Earth’s tilt. Season investigation and notebook | Revised explanation connecting shadow patterns to Earth's tilt. | Predict a fresh seasonal shadow observation and explain it using Earth’s tilt. |
| W2 / L4 · First version | Mark the solar calendar. Equinox and solstice marks | Equinox/solstice marks and a first solar-calendar design. | Defend an alignment measurement. How would it change at another latitude? |
| W3 / L5 · Revise | Test an alignment. Measurement trials and notebook | Measurement or alignment test with an interpretation. | Correct an alignment assumption, then predict the result of a new trial before testing. |
| W3 / L6 · Rehearse | Build the monument. Block builder and comparison trials | Monument prototype, comparison trials, and a design revision. | Defend a design revision using measured trial evidence. When would the alignment be unreliable? |
| W4 / L7 · Defend | Defend the design. Selected trials and design explanation | Individual explanation of an alignment and its limits. | Explain how a new date or location affects the design and identify a limit of your evidence. |
| W4 / L8 · Final | Demonstrate the monument. Solar monument exhibit | Monument demonstration, trial evidence, and design defense. | Demonstrate your contribution, support it with a trial, and reflect on the design’s limits. |

### Robot Delivery Code Lab · project 1.0.0

**Final:** Robot Command Championship and code/design defense.

**Audit and pacing:** Use calibration and basic deliveries before variables, loops, and multi-step missions. Rehearse in practice before the championship. Keep code versions, math evidence, and trial results.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Calibrate the robot. Calibration mission and math workbench | Robot calibration or movement calculation and a test record. | Explain the distance-to-rotation calculation. Predict the motion for a new distance. |
| W1 / L2 · Plan | Plan a delivery. Basic delivery course and command editor | Basic delivery program, route plan, and observed results. | Explain your route or command contribution. What changes if the delivery point moves? |
| W2 / L3 · Evidence | Use variables and loops. Variable and repeat-loop missions | Variable or repeat-loop practice with supporting math. | Predict a fresh loop’s total motion and show the calculation before running it. |
| W2 / L4 · First version | Test a delivery program. Multi-step delivery and trial replay | Multi-step delivery program and debugging notes. | Explain a trial result. What would happen if one distance or turn command changed? |
| W3 / L5 · Revise | Debug with evidence. Command editor and saved trials | Individual code revision explained through test evidence. | Identify the cause of a failed run, justify the edit, and predict a new trial without hints. |
| W3 / L6 · Rehearse | Rehearse reliably. Practice missions and championship preparation | Championship rehearsal, reliability results, and improvement plan. | Defend a code change with trial evidence. Which course condition still threatens reliability? |
| W4 / L7 · Defend | Defend the program. Math evidence and final code review | Individual prediction and explanation of part of the program. | Predict the result of a new command or obstacle condition independently and explain your reasoning. |
| W4 / L8 · Final | Run the championship. Robot Command Championship | Championship run, final code, trial evidence, and defense. | Explain your code contribution, show a supporting trial, and reflect on the final run. |

### The Cartographer’s Vault · project 2.0.0

**Final:** restored historical works and vault-recovery defense.

**Audit and pacing:** The current version requires sixteen restorations before final recovery. Batch them through lessons 2–6, retaining one ledger bundle per lesson. Pilot the workload; unfinished required restorations need workshop time before the final vault.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Inspect a suspicious work. Shore portal and source gallery | Suspicious-detail observation and a source-authentication note. | Which detail is suspicious, and what dated source would establish whether it belongs? |
| W1 / L2 · Plan | Plan the restoration. Two shore restorations and ledger | Shared restoration plan and first supported correction. | Explain your correction or preserved detail and the source supporting that choice. |
| W2 / L3 · Evidence | Authenticate the records. Workshop and port restorations | Historical or mathematical evidence supporting an interpretation. | Use a fresh source detail to assess an instrument or inscription. What date matters to the claim? |
| W2 / L4 · First version | Build the restored collection. Market and voyage restorations | Further restored works with reasons recorded in the ledger. | Defend a restored detail. How would a different date or origin change the judgment? |
| W3 / L5 · Revise | Reconsider an interpretation. Archive restorations and earlier ledger entries | Revised judgment about an inscription, anachronism, or preserved detail. | Explain a correction to an earlier judgment, then authenticate a new detail without hints. |
| W3 / L6 · Rehearse | Review the full collection. Treaty and vault paintings; sixteen-work ledger review | Review of the restoration ledger and preparation for the final vault. | Defend one revision and one preserved detail. What uncertainty remains in the source record? |
| W4 / L7 · Defend | Defend a restoration. Source gallery and final recovery preparation | Individual defense of one restoration using sources. | Evaluate a new source or mathematical condition and defend the resulting recovery choice. |
| W4 / L8 · Final | Recover the vault. Final vault recovery and restoration ledger | Final vault recovery, restoration evidence, and reflection. | Defend your restoration using a source, explain the final lock reasoning, and reflect on a changed judgment. |

### The Midnight Menagerie · project 4.0.0

**Final:** animal rescue and explanation of mathematical solutions.

**Audit and pacing:** Use the selected grade’s existing math machines. Pace the eight rescue locations over the lessons; retain rescue and lock prerequisites. Save worked explanations separately when the game only records a result.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Balance the first vault. The balance vault | Grade-appropriate number or balance reasoning and a worked attempt. | Show the equality behind your balance solution. How would a new weight change it? |
| W1 / L2 · Plan | Coordinate a rescue. Patrol synchronizer and rabbit courtyard | First rescue challenges, shared solutions, and math notes. | Explain your timing or fraction contribution and how the team checked it before the rescue. |
| W2 / L3 · Evidence | Reason about the machines. Clockwork fox rescue | Fraction, ratio, or timing practice connected to a lock. | Apply the fraction, ratio, or timing method to a fresh machine setting and explain the result. |
| W2 / L4 · First version | Test the optics. Moon-tower optics and rescue record | Further rescues with calculations and explanations of successful attempts. | Explain your geometry solution. How would changing one angle affect the rescue? |
| W3 / L5 · Revise | Engineer the crossing. Bridge engineering workshop | Geometry, mechanism, or measurement reasoning for a harder challenge. | Correct a scale or distance error and apply the method to a fresh crossing measurement. |
| W3 / L6 · Rehearse | Prepare the riverboat. Sluice workshop and remaining rescues | Remaining workshop progress, revised solutions, and boat preparation. | Defend a revised volume or mechanism solution. What capacity limit must the team still check? |
| W4 / L7 · Defend | Check the final solution. Riverboat calculations and selected math proof | Independent explanation of one solution and how it was checked. | Solve a changed boat or load condition independently and explain how you verified it. |
| W4 / L8 · Final | Complete the rescue. Riverboat workshop and rescue finale | Final rescue/boat challenge, selected math evidence, and reflection. | Defend your mathematical contribution, show a check, and reflect on the final rescue. |

### The Championship Show · project 1.0.0

**Final:** championship performance and reasoning record.

**Audit and pacing:** The package has four show rounds, not eight lessons. Lessons 1–7 prepare and rehearse those rounds; lesson 8 is the complete final show. Keep independent answer defenses alongside local match results.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Explain the opening move. Opening Move practice | Initial mathematical practice and explanation of an answer. | Show how you reached an answer, then solve a fresh problem using the same method. |
| W1 / L2 · Plan | Plan the team roles. Team setup and practice roles | Team practice, roles, and starting strategy. | Explain your role and a strategy choice. How does it help the team show reasoning? |
| W2 / L3 · Evidence | Practice under a change. Beat the Buzzer practice | Targeted practice responding to early difficulties. | Solve a changed version of an earlier problem and explain the method before considering speed. |
| W2 / L4 · First version | Defend practice answers. Practice matches and Make Your Case | Practice matches and a record of defended answers. | Defend a result. If one number changes, which reasoning step must change? |
| W3 / L5 · Revise | Correct a reasoning error. Answer review and targeted practice | Corrected reasoning and an explanation of a previous error. | Explain a previous error and solve a fresh equivalent problem without hints. |
| W3 / L6 · Rehearse | Rehearse the championship. Show rehearsal and Final Wager practice | Championship rehearsal and revised team strategy. | Defend a revised team strategy using practice evidence. What risk could still make it fail? |
| W4 / L7 · Defend | Make an independent case. Individual defense-round rehearsal | Individual reasoning check and preparation for a defense round. | Solve a fresh problem and defend every required step independently. |
| W4 / L8 · Final | Run the final show. Complete championship and reasoning review | Championship show, selected answer defenses, and reflection. | Explain your own answer defense, respond to a changed condition, and reflect on the team’s result. |

### Live Strategy League · project 1.0.0

**Final:** league competition and strategy explanation.

**Audit and pacing:** Pace the four configured markets across group lessons 2, 4, 6, and 8, with individual analysis before each. Lesson 8 resolves The final call and reviews cumulative results; it does not reset the saved season.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Predict a market result. League launch and cost/profit practice | Cost/profit practice and an initial prediction. | Show a production-cost and profit calculation. How does a changed selling price affect the forecast? |
| W1 / L2 · Plan | Find your footing. Market 1: Find your footing | Team strategy and a first practice-round decision record. | Explain your price, production, or marketing contribution and how it fits the team’s cash limit. |
| W2 / L3 · Evidence | Read changing demand. Market 2 preview and round history | Explanation of how changing conditions affect a decision. | How should a fresh demand change affect production? Explain the assumption behind your forecast. |
| W2 / L4 · First version | Adjust to the shift. Market 2: Read the shift | Further practice results and an adjusted strategy. | Compare forecast and actual results. Would your decision still work with less demand? |
| W3 / L5 · Revise | Analyze cost pressure. Market 3 preview and profit history | Comparison of predicted and actual outcomes. | Correct a cost assumption, then calculate a fresh case with higher input costs. |
| W3 / L6 · Rehearse | Rehearse under pressure. Market 3: Under pressure | Market 3 decision/results record and a revised final-round plan supported by round history. | Defend your revision with round history. What happens if production exceeds demand? |
| W4 / L7 · Defend | Defend the final call. Market 4 preview and strategy evidence | Individual defense of a proposed strategy. | Independently evaluate a new price or cost condition and defend your recommendation for the final round. |
| W4 / L8 · Final | Finish the league. Market 4: The final call and standings | Final market result, cumulative league record, each student’s strategy defense, and reflection. | Explain your contribution using the final and cumulative results, then reflect on a forecast that changed. |

### Cascade Bay Crisis Center · project 1.0.0

**Final:** response simulation and evidence-based debrief.

**Audit and pacing:** The playable response loop has four situation stages. Use lesson checkpoints to review reports and decisions between exercises. A teacher collects the final debrief and individual defenses; a dedicated final submission/showcase is not implemented.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Read the situation. Situation map and opening reports | Situation-map observation and report-reliability note. | Which observation is verified, and which report needs corroboration before action? |
| W1 / L2 · Plan | Set response priorities. Roles, situation summary, and crew resources | Shared situation summary, response roles, and initial priorities. | Explain your proposed priority and supporting report. What would change if fewer crews were available? |
| W2 / L3 · Evidence | Connect the Earth systems. River/weather workstation and incoming data | Earth-system connection supported by incoming data. | Use fresh gauge or rainfall data to explain a cause-and-consequence link. |
| W2 / L4 · First version | Coordinate the first response. Field operations and decision evidence | First coordinated response, cited reports, and resource decisions. | Defend a resource decision. How would a changed route report alter the response? |
| W3 / L5 · Revise | Reassess conflicting reports. Updated bulletins and analysis | Revised recommendation based on new or conflicting evidence. | Explain a recommendation you revised, then assess a fresh conflicting report without hints. |
| W3 / L6 · Rehearse | Test the next response. Further developments and consequence review | Response to further developments and comparison of consequences. | Defend a revision with report evidence. Which location or service still faces a tradeoff? |
| W4 / L7 · Defend | Defend a response. Decision evidence and individual briefing | Individual justification of one response and its tradeoff. | Use a new resource or flood condition to justify a response independently. |
| W4 / L8 · Final | Deliver the debrief. Response exercise and teacher-collected debrief | Final response exercise, decision record, and team debrief. | Defend your own response using a report, explain its consequence, and reflect on a remaining uncertainty. |

### Time Repair: Restore the Timeline · project 1.0.0

**Final:** repaired timeline and explanation of consequences.

**Audit and pacing:** Use the one available early-cargo mission throughout all eight lessons. Later repair and collapse stages are planned content. The final is a walkthrough of the existing repaired timeline and exported case file, not additional missions.

**Grouping:** Teams build a shared product; each student explains and defends their own contribution.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Notice the breach. Timeline control and harbor node | Chronology notes and an initial suspected inconsistency. | Which date or detail appears inconsistent, and what evidence would establish the baseline? |
| W1 / L2 · Plan | Build the baseline. Timeline nodes and team investigation notes | Shared baseline timeline and investigation questions. | Explain your baseline contribution and why its source matters to the chronology. |
| W2 / L3 · Evidence | Compare the sources. Evidence archive for early-cargo | Source comparison supporting or challenging a suspected breach. | Use a fresh passage to support or challenge the suspected breach and identify its limit. |
| W2 / L4 · First version | Propose the repair. Evidence connections and defense | Evidence connections and a proposed repair. | Defend the proposed repair. Would it still be supported if one source had a different date? |
| W3 / L5 · Revise | Predict the ripple. Cause-and-consequence explanation | Cause-and-consequence explanation, including uncertainty. | Correct a causal assumption and predict a fresh consequence, distinguishing certainty from inference. |
| W3 / L6 · Rehearse | Attempt the repair. Earned time jump and harbor repair scene | Attempt the available repair and record the resulting changes. | Compare the observed change with your prediction. What consequence remains uncertain? |
| W4 / L7 · Defend | Verify the consequences. Ripple review and verification evidence | Individual revision of the explanation using observed consequences. | Use an additional source detail to revise or defend your explanation independently. |
| W4 / L8 · Final | Present the timeline. Case-file export and repaired-timeline walkthrough | Repaired-timeline walkthrough, evidence defense, and reflection. | Explain your repair contribution, cite its evidence, and reflect on the observed ripple and its limits. |

### Community Story Network · project 1.0.0

**Final:** edited multimedia story and Publish Day.

**Audit and pacing:** This project has an introduction and a mock showcase only. Reporting, drafting, evidence collection, and publication use teacher-arranged tools outside this preview. The lesson tabs provide a classroom plan; they do not publish stories.

**Grouping:** An editorial team reviews stories while students retain individual bylines and reporting evidence.

| Week / lesson | Focus and existing workspace | Main output | Independent checkpoint |
| --- | --- | --- | --- |
| W1 / L1 · Launch | Find a community story. Launch preview; classroom research notebook | Story idea, background research, and initial interview questions. | Which fact supports your story idea, and which question still needs reporting? |
| W1 / L2 · Plan | Pitch and plan reporting. Classroom editorial meeting and teacher-arranged contacts | Editorial pitch, reporting plan, and teacher-supported contact arrangements. | Explain your reporting contribution and how your questions could produce verifiable evidence. |
| W2 / L3 · Evidence | Gather the reporting. Classroom interview and source records | Interview/reporting notes and a verified fact or quotation. | Verify a fresh fact or quotation against its source and explain what remains unconfirmed. |
| W2 / L4 · First version | Build a rough story. Classroom story draft and source log | First story structure or rough multimedia draft with source records. | Defend a draft claim. How would it change if the source could not confirm a key detail? |
| W3 / L5 · Revise | Revise the story. Classroom editing and fact checks | Revised story contribution supported by reporting evidence. | Show an unsupported statement you corrected, then assess a fresh statement using the same check. |
| W3 / L6 · Rehearse | Review the production. Classroom editorial review and near-final draft | Editorial review, fact checks, and a near-final production. | Defend a revision using reporting evidence. Which perspective or verification gap remains? |
| W4 / L7 · Defend | Defend the reporting. Individual byline and source defense | Final bylined contribution and explanation of a reporting choice. | Evaluate a new conflicting account and explain how it affects your final contribution. |
| W4 / L8 · Final | Hold Publish Day. Teacher-approved external publication; mock showcase for reference | Teacher-approved publication, launch discussion, and reporter reflection. | Defend your bylined contribution with reporting evidence and reflect on what the community audience learned. |

## Architecture and implementation record

Curriculum content is in `src/app/projects/project-lesson-plans.json`. The versioned registry validates eight ordered lessons and safe optional `focusTarget` keys. Shared lesson focus is an injected signal; each owning template interprets its own native view keys. Generic UI has no project-name branching, runtime mutations, or assessment logic.

Added: lesson configuration, models/validator, compact picker, optional focus binding, reusable tools disclosure, registry, routing tests, and this audit. Removed the intermediate lesson-page component. Updated the project host, native workspace headers, and native view bindings. Investigation changes additionally reveal observation forms after experiments, ask theory questions sequentially, and present restoration as one decision at a time. The shared painting editor also sequences its existing repair and evidence fields without changing its evidence-check engine. The shared tools component keeps settings/help controls usable when they expand inside the menu.

Existing source images, paintings, maps, scene renderers, robot courses, instruments, and game engines are retained. No new bitmap artwork or external dependencies were needed. Existing drafts and readiness/submission mechanisms are reused. The same four-week/eight-lesson sequence continues to apply to all 16 catalog projects.

`TEMPLATE_CAPABILITY_GAP`: a cross-template AI checkpoint assessor, scoped checkpoint persistence, and teacher standards review remain future work. Cascade Bay's final is teacher-collected. Community Story Network still lacks a reporting/publishing runtime. Round-based or rescue-based games preserve earned state when a lesson is selected; the picker is not a command to jump to a later round. Classroom timing still needs piloting, particularly the sixteen required gallery restorations.

Unrelated grade alignment, sample, home-page, and debate-runtime edits appeared concurrently in the shared workspace and were preserved; they are not part of this UI change.

## Verification

- Final production build: **passed**, with component stylesheet budget warnings. No build error remains.
- Focused host/navigation, science, tools, league, trading, and map checks: **9 files / 58 tests passed**. These cover all 128 versioned lesson links with a stub workspace, real native league draft retention, real science station selection, restoration draft retention, final readiness, query normalization, preview isolation, and primary controls outside the tools menu.
- Gallery editor and restoration runtime/engine checks: **4 files / 16 tests passed** after the sequential editor change. This includes keyboard-accessible painting repair/undo/comparison, draft reasoning preserved across research and detail changes, focus on the next question, and required-artwork failure blocking submission.
- Total focused checks: **13 files / 74 tests passed**. The 128-link sweep checks routing/composition; it does not play through 128 classroom activities.
- Full-suite diagnostic run before the final targeted corrections: **156 files passed / 7 failed; 888 tests passed / 5 failed**. Three assertions still expected the previous header/no-session behavior; those were corrected and pass in the focused run. A route-atlas timeout also passed on its focused rerun. The remaining known unrelated failures are the old unversioned package-URL assertion in `project-intro.registry.spec.ts` and Phaser canvas initialization in `project-intro.component.spec.ts` / `completed-samples.spec.ts`. A final all-files rerun was not performed after the gallery change.
- Architecture audit: the same two existing findings in `core/index.ts` (`./templates`) and `projects/mystery-substance/lab-kit/render-quality.service.ts`; no new lesson or UI file is reported.
- Browser: visually verified the lab restoration at desktop and 390px widths, with no horizontal overflow; verified that Lesson 3 opens the actual experiment; verified the league action on the decision canvas; verified the gallery painting, source/story access, and a single selected repair question. Returned the browser to `/projects/mystery-substance/experience?lesson=6` and reset the temporary viewport override.
- `git diff --check`: passed. No source media files were deleted or replaced. This verifies representative UI behavior, not every game branch or classroom pacing.

Logs are in `../output/lesson-schedule/`: `focused-build.log`, `focused-tests.log`, `focused-gallery-tests.log`, `focused-full-tests.log`, and `focused-architecture.log`.


## Subsequent project cleanup: Robot Delivery

Robot Delivery received its own focused workspace pass after the shared navigation cleanup. It now keeps the robot/course visual beside the current coding task, opens the block library on demand, and separates observation, calculation, and explanation. The eight-lesson mapping is unchanged; mission selection, observed-trial requirements, evidence checks, and championship reveal/locking keep their native gates. See [the Robot Delivery cleanup record](programming-automation/FOCUSED_WORKSPACE.md) for changed files, verification, and the remaining scope. This update does not extend the deeper cleanup to the other projects.


Robot Delivery's subsequent remaining-screen pass also simplifies trial review, final defense, calibration, and championship predictions/review. The newly added standards overlay and its grade/version coverage are preserved without changes. The details and validation are recorded in the [Robot Delivery workspace note](programming-automation/FOCUSED_WORKSPACE.md#remaining-screens-cleanup--standards-overlay-retained).
