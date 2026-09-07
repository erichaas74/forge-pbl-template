# Project navigation, learning clarity, and screen-height audit

Audited September 5, 2026 · localhost:4200 · seven projects

## Overall finding

The projects have recognizable learning goals and several strong instructional prompts. The recurring weakness is getting students from the invitation to the actual work, and keeping the next required action visible once they arrive. Large titles, media, repeated introductions, and long forms frequently push essential controls below the screen. Some workspaces add a second scrollbar inside the page, making the remaining work particularly easy to miss.

**Fix the shared launch pages first, then the required-work panels in Journey, Trading, Museum, and Story Lab.** History needs a shorter pitch workflow and reliable heading positioning. Debate needs a more manageable listening panel. Science has the clearest immediate task guidance in the sampled activity, although its opening still hides its first consequential action.

This is an expert walkthrough, not a student usability study. Ratings below describe the clarity of the inspected interface; they do not establish learning effectiveness, standards alignment, or assessment validity.

## Scope and method

- Primary browser viewport: **1366 × 768 CSS pixels**, representing a constrained laptop workspace. Secondary checks: **1920 × 1080** on Trading, Journey, and Story final examples, plus Story's launch. These are content viewport dimensions; browser chrome and display scaling can leave less usable room on a physical monitor.
- Inspected the catalogue, all seven opening scenes, all seven shared goal/start pages, representative active workspaces in every project, and all seven completed examples.
- Active paths: Science scanner and properties lab; Trading setup and merchant editor; Museum hall and composer Story/Labels stations; History network selection, assignment desk, and pitch; Debate chamber and listening panel; Journey first decision and citation form; Story planning, setting selection, branch map, and scene writer.
- Read relevant local templates and styles to trace layout causes. Navigation changed local demo selections; no student work was submitted or published. Later research, production, full project completion, grading, and persistence across devices were not tested.
- Measurements were taken after the page or panel rendered. Positions are approximate and specific to the sampled state. **Document y** means distance from the page top. **Viewport y** means distance from the visible screen top after the observed automatic scrolling. At a 768px viewport, a control starting at y=799 is wholly below the screen. A control beginning at y=725 may be only partly visible.
- Nested-panel measurements distinguish the panel's visible height from its full scrollable content. A short document can still hide substantial required work inside a panel. Geometry alone does not establish visibility beneath sticky headers; the heading-overlap findings also came from visual inspection.

Long reading, transcripts, and printable evidence can reasonably scroll. The higher-priority defects are hidden workflow controls, unclear remaining work, and excessive scrolling before students can make a meaningful choice.

## Project-by-project assessment

All projects inherit the shared launch problem described below. These ratings primarily concern the sampled active workspaces.

| Project and intended grades | What is being taught | Next-step clarity | Main obstacle |
|---|---|---|---|
| The Unlabeled Shelf · Grade 5 | Properties of matter; comparing controlled tests; using evidence to revise and defend an identification | **Strong in the workbench** | Opening action is offscreen; many tools and vials compete after entry |
| Frontier Trading Company · Grade 5 | Decimal money, unit price × quantity, cash/capacity constraints, and defending a trading strategy | **Strong mission, mixed execution** | Merchant calculation and confirmation extend below a separate panel scrollbar |
| Objects That Changed Us: Ancient Egypt · Grade 5 | Inferring from artifacts, researching sources, writing exhibit explanations, and presenting to visitors | **Needs clarification at entry** | Populated showcase/readiness looks like completed student work; composer Next is below the screen |
| History Live: The Revolutionary War · Grades 5–8 | Historical evidence, perspective, reporting within a historical date, and writing a defensible broadcast | **Mixed** | Repeated entry steps, large pitch form, and headings obscured after navigation |
| The Fate of the Republic · Grades 6–8 | Accurate listening, evaluating claims, historical evidence, and rebuttal | **Clear sequence, crowded task panel** | Listening/marking controls and completion require internal scrolling |
| Race Around the World · Grades 5–7 | Geographic constraints, predictions, source perspective, and evidence-based decisions | **Clear choice, difficult follow-through** | Explanation, citation, and record action are buried in a narrow scrolling column |
| Survival Island Story Lab · Grades 5–8 | Narrative craft, character growth, consequential choices, and revision through playtesting | **Good prompts, weak prioritization** | Multiple available stages; writing area pushes choice-writing and save below the screen |

### 1. The Unlabeled Shelf

**What works:** The workbench's “Next useful step” tells students to describe visible features of each sealed vial and record observations before comparing tests. This connects the immediate action to a scientific purpose. The Investigate → My explanation → Final case stages give a useful overall structure. The opening also challenges identification by appearance alone.

**Where students may stall:** “TEST THAT THEORY” begins at document y=848 on a 1129px opening page. The invitation refers to an important button that is not initially visible. Inside the workbench, six tools and four vials create competing choices, although the next-step sentence helps considerably. The evidence list has a modest internal scroll area: 240px visible / 334px content.

**Recommended change:** Keep the opening question and response button with the media. Preserve the existing next-step guidance, add a persistent current-vial label, and show a short evidence checklist tied to the explanation. Do not replace the investigation with an answer-revealing checklist. In the sampled properties-lab transition, automatic scrolling successfully brought the trial action into view; retain that benefit while preserving orientation.

### 2. Frontier Trading Company

**What works:** “Mission 1: Visit two shops” and “Show next shop” are concrete and visible. The merchant sequence—pick a price card, set quantity, calculate every line—makes the mathematics part of the decision. Cash, capacity, and strategy offer reasons for doing the calculation.

**Where students may stall:** Opening choices begin at y=577 and y=673, but provisions begins at y=769 and “Head to market” at y=907. The layout gives the earlier choices more exposure. In the market, tall storefronts delay the actual trade area. Once the merchant editor is open, its panel shows 652px of 871px content, and “Add to trade draft” begins at viewport y=799. Students can see the shop and still miss the action needed to use it. “Show next shop” focuses a storefront; a further action opens the shop.

**Recommended change:** Retain the visible mission and make the highlighted storefront's opening action explicit. Keep quantity, line calculation, available cash/capacity, and confirmation together, with a persistent editor footer. Label the transition from the opening's 30 practice coins to the company's $200 starting account so it reads as a new simulation stage.

### 3. Objects That Changed Us: Ancient Egypt

**What works:** The composer has named stations, word limits, a curator test, and a preview. Those support moving from artifact detail to an explanation for an audience, rather than merely collecting pictures.

**Where students may stall:** The hall landed partway down the page, with its heading and some navigation above the viewport. It presents four populated wings. The composer initially reports “5 of 5 ready,” which can make a worked example look like the learner's own finished work. In the Story station, “Next station” begins at viewport y=821. Visual inspection showed the composer extending beyond the screen, with both overlay and underlying-page scroll affordances.

**Recommended change:** Distinguish “Explore a completed example” from “Build your exhibit.” Give a new learner a clear first research/claim task and label any starter content. Make readiness refer to that learner's draft. Keep Back/Next and the station name in a visible composer footer; scroll the active station's content within the remaining space.

### 4. History Live: The Revolutionary War

**What works:** “Evidence first,” fact versus interpretation, and challenging one's own side are meaningful editorial principles. Reporting as of a historical date and considering an opposing view make the intended historical reasoning tangible.

**Where students may stall:** Students pass the opening, shared goal page, another newsroom entry screen, network selection, story selection, and then pitch. Network Join buttons begin at viewport y=833. After claiming a story, the stage heading was obscured by the sticky header. The pitch page is 1549px tall; its initial-prediction section starts at viewport y=845 and “Send to producer” at y=1089. “Complete required editorial fields” does not provide a concise, visible list of what remains.

**Recommended change:** Remove duplicate entry gates, keep the current assignment/date visible, and split the pitch into a few short steps: story angle, evidence/perspective, prediction/review. Show exact missing requirements beside the next action. Correct focus/scroll positioning against the actual sticky-header height. Bring the relevant rubric criterion into each task; leave the full rubric available for reference.

### 5. The Fate of the Republic

**What works:** The chamber offers a relatively compact starting point. Listening before answering is clear, and the transcript provides an alternative to audio. The task supports claim analysis and responding to an opponent rather than delivering an unrelated speech.

**Where students may stall:** The opening challenge choices begin at y=1260 on a 1585px page. The active listening panel then fits 870px of content into 456px. Three passages each offer six marking categories. Its read/mark completion action begins at viewport y=958. Students face both a large classification task and an easy-to-miss finish control. Labels including “Reformers,” “Caesarian Reformers,” and “Defenders of Caesar” make role tracking harder than necessary.

**Recommended change:** Show one passage and its marking choices at a time, define the categories beside the task, and keep completion/progress visible. Use a consistent faction name across the chamber and workbench. Preserve the transcript and evidence requirement.

### 6. Race Around the World

**What works:** The first chapter and its choices are visible. The explanation scaffold connects a decision, a source paragraph, its relevance, alternatives, and risks. This clearly supports geographic and historical reasoning.

**Where students may stall:** After selecting “Map the unknown,” a 664px decision column contains 1752px of material. Citation fields begin around viewport y=788, “Add source” at y=955, and “Record chapter & continue” at y=1174. The surrounding document is only 897px tall, so scrolling the page is not enough to reveal everything. The selected choice can also move out of sight inside that column. Learning targets, vocabulary, and source materials add further layers of disclosure.

**Recommended change:** Use a short, explicit sequence: **Choose → Read a source → Explain and cite → Record**. Keep the selected choice, current requirement, and next control visible. Place the relevant source beside the explanation when space permits. Present map tools as supporting tools. Clarify that success means a defensible voyage, not simply racing quickly through choices.

### 7. Survival Island Story Lab

**What works:** Planning asks one question at a time and tracks six ideas. Historical boundaries help distinguish researched setting from invented narrative. Scene-specific craft prompts and choice-cost hints tell students what kind of writing to practice.

**Where students may stall:** On planning entry, sticky navigation obscured the heading and part of the guide. All stages can be opened before planning is complete, without a strong recommendation for what this learner should do next. The Branch Map presents scene cards and counts of outgoing trails, but the inspected view does not visually connect those cards to their destinations. In Scene Writer, the text area occupies about 497px; reader-choice fields begin at viewport y=954 and y=1037, and “Save checkpoint” at y=1116. The coach's send action appears earlier than the main writing/save action.

**Recommended change:** Keep a recommended next stage and completion criterion beside the stage navigation. Show branch connections or explicit destination summaries. Size the prose editor to the available height, keep save status/actions visible, and make “write the scene” and “write its consequential choices” equally discoverable. Explain how local saving differs from a checkpoint.

## Shared launch pages: highest-leverage fix

Every project places the actual start action after a large project/product introduction and a disabled future chatbot preview. The preview explicitly says it is not functional, but still occupies substantial space in the main student route.

| Goal/start page | Full page height | Actual start button, document y |
|---|---:|---:|
| Science | 1767px | 1605px |
| Trading | 1787px | 1626px |
| Museum | 1839px | 1678px |
| History | 1797px | 1636px |
| Debate | 1792px | 1631px |
| Journey | 1787px | 1626px |
| Story | 1852px | 1690px |

These pages are approximately **2.3–2.4 laptop viewport heights**. Automatic focus after the opening scrolls slightly into them, but the actual start action remains below the visible screen. The disabled goal field suggests meaningful preparation that cannot currently be completed. Meanwhile, “See what you could create” is available earlier and leads to a completed example with teacher/builder framing.

**Recommended structure:** project title, one learning sentence, one finished-product preview, and a prominent start action in the first viewport. Keep a brief “Your first task” directly beside that action. Move the nonfunctional chatbot preview out of the required student path. Offer the example and fuller project explanation as secondary options. A student should be able to state what they will practice, what they will produce, and what to do first without scrolling past a feature preview.

## Completed examples and presentation height

Completed examples are valuable teaching references, but several behave like long landing pages rather than interactive presentations.

| Example at 1366 × 768 | Page height | Relevant observation |
|---|---:|---|
| Science | 1842px | Long case file and evidence previews; reasonable reading content, but evidence controls extend below the fold |
| Trading | 1394px | Previous/Next at document y=1199; slide tabs are available higher up |
| Museum | 2446px | Hall and selected exhibit board stack; Walk up at y=929, wing selectors at y=1052, board models at y=1414 |
| History | 2165px | Broadcast, transcript, reflection, and completed-package explanation stack vertically |
| Debate | 1367px | Long internally scrolling programme playlist; later entries require that separate scroll |
| Journey | 1727px | Previous/Play/Next at y=1088; chapter choices at y=1151 |
| Story | 1969px | Start over at y=841; first reader choices at y=1591 |

At **1920 × 1080**, Trading's Next still begins at y=1205, Journey's replay controls at y=1375, and Story's reader choices at y=1597. The Journey chart grows with the available width, pushing its controls farther down. A larger monitor alone does not resolve these cases.

Trading's **Present mode** also needs correction: at 1366 × 768 its presentation container has 852px of content inside 768px, with Previous/Next beginning at viewport y=794. Visible slide tabs and keyboard navigation provide alternatives, but the primary sequential controls remain hidden.

Opening “See the learning behind it” in the Trading example inserts the teacher guide above the presentation, increasing the page from 1394px to 2254px and moving Next to y=2059. Keep this useful adult guidance in a separate tab, drawer, or dedicated view so it does not displace the example.

**Recommended treatment:** constrain the presentation stage to the usable viewport, reserve room for controls, and put transcript/evidence/detail reading in clearly labeled optional regions. For Story, preserve readable prose and intentional reading scroll, but make the impending choice and path progress clear. For Museum, open the selected wing as the main view instead of stacking a whole second exhibition beneath the corridor.

## Implementation locations

These references identify existing structure to review, not changes made by this audit.

| Concern | Source evidence |
|---|---|
| Shared start follows disabled goal preview | [project-intro.component.html:63](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/features/project-intro/project-intro.component.html:63); start section at line 118 |
| Large launch typography and spacing | [project-intro.component.scss:130](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/features/project-intro/project-intro.component.scss:130) |
| Additional navigation above activity shells | [project-host.component.html:13](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/runtime/project-launch/project-host.component.html:13) and [project-host.component.scss:22](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/runtime/project-launch/project-host.component.scss:22); account for this bar when sizing a full-height child workspace |
| Journey nested required-work column | [journey-shell.scss:25](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/journey-replay/ui/journey-shell.scss:25): viewport-based maximum height and vertical overflow |
| Trading sticky scrolling editor | [market-view.component.scss:305](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/simulation-decision/ui/pages/market-view.component.scss:305) |
| Museum fullscreen scrolling host and nonsticky station footer | [artifact-composer.component.scss:10](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/artifact-composer.component.scss:10), [footer at line 881](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/artifact-composer.component.scss:881) |
| History heading scrolling and sticky header interaction | [history-live-page.component.ts:43](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/history-live/ui/history-live-page.component.ts:43), [assignment-desk.component.ts:39](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/history-live/ui/assignment-desk.component.ts:39); existing h1 scroll margin does not prevent the observed overlap |
| Debate constrained workbench with its own scrollbar | [debate-workbench.component.scss:1](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/debate-studio/ui/debate-workbench.component.scss:1) |
| Story prose editor before reader choices | [narrative-studio-page.component.scss:525](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/narrative-studio/ui/narrative-studio-page.component.scss:525): 24rem minimum textarea height; actual rendered height was larger |
| Teacher guide inserted before native presentation | [project-final-example.component.html:34](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/features/project-intro/project-final-example.component.html:34), presentation starts at line 81 |
| Intended grades and broad learning goals | [project-catalog.ts:28](C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/projects/project-catalog.ts:28) |

## Recommended order and acceptance checks

**Priority 1 — students can find and complete the current task:**

1. Shorten the shared launch and expose its start action immediately. This benefits all seven projects.
2. Restructure Journey's choose/cite/record flow and keep its action visible.
3. Keep Trading confirmation, Museum station navigation, and Story save/choice-writing discoverable within their editors.
4. Fit Trading and Journey presentation controls into the visible presentation stage, including Trading Present mode.

**Priority 2 — students understand their progress and purpose:**

5. Reduce History's repeated entry and pitch burden; correct History and Story heading overlap.
6. Shorten Debate's opening and segment the listening/marking work.
7. Separate Museum example content from learner progress, standardize Debate role names, and recommend Story's next stage.
8. Give every activity a compact statement of **current task, why it matters, and what counts as ready**. Use task-specific criteria, not just a global subject label.

Recheck each corrected route at 1366 × 768 and 1920 × 1080, then at browser zoom and narrower layouts. At entry and after each stage transition, the current task heading must remain visible below sticky navigation. The primary next action should either remain visible or have an unmistakable persistent progress/action area; required fields must not hide in an unannounced second scrollbar. Disabled actions should state the exact missing requirement. Optional teacher guidance must not push the student task away. Presentation controls must fit with the stage rather than following an unconstrained image/map.

Finally, validate the revised flow with students at the stated grade levels: ask them to show their next action, explain what they are practicing, and identify what they must produce to finish. Record hesitation and missed controls. This audit identifies likely friction; that short observational check is needed to establish whether the changes actually resolve it.

No application code was changed as part of this audit.
