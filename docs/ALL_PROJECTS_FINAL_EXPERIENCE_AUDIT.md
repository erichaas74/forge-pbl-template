# All-project culminating experience audit

Audited: September 5, 2026

## Scope and rating method

This audit covers the six projects in the current project catalog. It follows the implemented student interface, configuration, runtime state, persistence boundary, and final submission or showcase. Planning documents are not counted as implemented behavior.

The release labels in this report mean:

- **Demonstration:** useful for previewing the idea, but student identity, durable class records, or authoritative review are absent.
- **Strong prototype:** the teaching and presentation flow are substantial, but the catalog launch still uses a local demonstration session.
- **Blocked:** a normal student cannot complete the required flow through the current interface.

## Final project and presentation inventory

| Project | Intended grades | Final student product | How the final is presented | Current release finding |
| --- | --- | --- | --- | --- |
| **The Unlabeled Shelf** | Grade 5 | **Restored Shelf Case File:** identification of four vials, at least four evidence records, scientific reasoning, counterevidence, and a shelf-restoration recommendation | A structured laboratory report in the app. After submission, students see a recorded-case confirmation. There is no implemented oral, slide, or public showcase view. | **Demonstration.** The catalog launch uses an in-memory runtime, so refresh or a new browser session does not preserve the official record. “Online” is treated as sufficient for submission even though no classroom authority is connected. |
| **Frontier Trading Company** | Grade 5 | **My Season Reflection** plus the **Final Strategy Showcase:** route/load plan, forecast and actual profit math, adaptation to an event, and a defended strategy | A five-part, full-screen company pitch: Season Result, Route and Load, Math Proof, Adaptation, and Team Defense. It includes a three-minute timer, keyboard slide controls, an audience question, and print-current-slide support. | **Strong prototype.** The experience is polished and uses the student’s saved game record, but completion and “teacher review” remain browser-local rather than an authoritative class submission. |
| **Objects That Changed Us: Ancient Egypt** | Grade 5 | **Published Museum Wing:** central claim, three artifact records, evidence connections, citations, a MetaSteps gallery link, curator video, and an individual defense | A shared museum corridor with walk-up exhibit boards, an accessible list view, peer question cards, teacher-led navigation, and a restricted family view. | **Demonstration.** Four polished boards are seeded examples. Only the Nile wing is currently open for a full walk-up, and configured videos are labeled prototypes. Publishing and role switching are browser-local. |
| **History Live: The Revolutionary War** | Grades 5–8 | **Historical News Package:** approved pitch, sourced script, three-scene visual rundown, recording or accessible transcript, and a post-broadcast reflection revision | A modern television-style class special report. Approved packages enter a producer rundown and play as evidence scenes, lower thirds, recording/transcript, ticker, and live producer controls. | **Strong prototype.** The project has the clearest source-analysis rubric and revision history, but the catalog explicitly launches it in local-demo mode. Producer approvals are simulated in the same browser. |
| **The Fate of the Republic** | Grades 6–8 | **Filed Senate Address and Rebuttal:** listened-to opponent record, cited evidence, reasoning contribution, rehearsal, reviewed audio/video or transcript, plus private votes and an individual reflection | Student entries assemble into a full Senate broadcast with round titles, moderator prompts, recorded speeches, evidence projection, timed playback, private ballot, and a staged class-verdict reveal. | **Strong prototype.** The learning performance is compelling, but the catalog launch creates a preview identity and local-demo session. Teacher authority and a durable multi-user class record are not established by the project host. |
| **Race Around the World** | Grades 5–7 | **Our Expedition Record:** five ordered decisions, source citations, predictions, explanations or audio, consequences, route history, revisions, and teacher submission | An animated Atlantic map and scene-by-scene voyage replay. The Captain’s Log shows each explanation, and the final screen offers replay plus submission for teacher review. | **Strong prototype.** The repaired 1.1 learner flow now exposes route comparison, paragraph evidence, explained citations, predictions, and a provider-neutral reasoning coach. A session-scoped demo identity preserves the path after reload; authoritative class submission still requires authenticated enrollment. |

## 1. The Unlabeled Shelf

### Teaching sequence

Students inventory four vials, run properties and reaction tests, reason about conservation of matter, maintain a working theory, and respond to an emergency transfer scenario. The strongest part of the design is that the final case reuses evidence and theory records already produced during the investigation.

### Recorded student decisions and evidence

The runtime records lab results, collected and classified evidence, hypothesis history, the selected theory, activity completion, and the final case-file artifact. The final form also captures uncertainty, confidence, reflection, and individual contribution as optional fields.

### Final project presentation

The final product is an app-based scientific case report. Five visible requirements guide the learner:

1. final identification;
2. at least four evidence items;
3. scientific reasoning;
4. counterevidence;
5. shelf-restoration recommendation.

The published project definition lists four formal sections and does not list counterevidence as its own section. The UI therefore presents a different assessment structure from the configuration.

### Audit finding

The form is clear for a fifth- or sixth-grade learner, but its completion gate checks presence rather than quality. A one-character claim or reasoning response satisfies several required sections. The service uses an in-memory runtime and labels the result saved whenever the browser reports an internet connection. The interface promises an authoritative submission and possible teacher revision without a connected authority or teacher-review workflow.

## 2. Frontier Trading Company

### Teaching sequence

Students form a company, buy goods, compare unit prices and cargo limits, forecast a route, respond to trail events, sell at a destination, reconcile the ledger, and reflect on strategy. The final experience uses the actual route, purchases, sales, event decisions, forecast, and score.

### Recorded student decisions and evidence

The browser record preserves company setup, inventory, market transactions, route history, forecast, trail-event choices and reasoning, ledger entries, evidence snapshots, score, and four report responses. Browser storage is scoped by preview session and project version.

### Final project presentation

Students first complete **My Season Reflection**:

- My Plan;
- My Forecast and Trade Math;
- Why I Chose My Route;
- What I Would Do Next.

They then present a five-slide **Final Strategy Showcase** with a three-minute pitch and a peer question. The showcase is read-only and derived from recorded gameplay, which protects the original evidence.

### Audit finding

This is the strongest ready-to-present individual simulation product. The math slide calculates and displays equations for students, while the submitted report requires only one free-text calculation. The system records that a calculation exists but does not validate the operation, labels, or answer. Submission locks the local attempt, but no authoritative submission history, teacher rubric, or revision cycle is connected in the catalog launch.

## 3. Objects That Changed Us: Ancient Egypt

### Teaching sequence

Students research an artifact group, write a central claim, explain three objects, connect evidence to the claim, cite sources, build a MetaSteps wing, attach a curator video, publish, visit peers, ask questions, and complete an individual defense.

### Recorded student decisions and evidence

The model supports versioned exhibit snapshots, peer-response drafts and posts, moderation state, individual defense responses, visits, teacher focus, hall controls, and LMS evidence events. It is the only project whose final product is designed for student and family visitors as well as a teacher.

### Final project presentation

The final is a public-facing digital museum exhibition. Visitors can use an immersive corridor or an accessible list, open a team’s museum board, inspect its artifact claim and sources, follow a MetaSteps link, view a curator presentation, and leave a question. A teacher can guide the class through exhibits; a family view hides private classroom information.

### Audit finding

The presentation architecture is strong, but the current content describes itself as a prototype. All four boards arrive pre-published, only one walk-up is active, and the seeded curator videos do not contain actual video URLs. The role selector allows anyone in the preview to become teacher or family. Publication and family-release controls are presentation state, not server authorization.

## 4. History Live: The Revolutionary War

### Teaching sequence

Students choose a reporting network, pitch a story, investigate primary and secondary sources, distinguish fact from interpretation, write a sourced broadcast script, build three evidence scenes, rehearse or upload a recording, submit for producer review, and revise. After the class broadcast, each student records how another perspective changed or strengthened a claim.

### Recorded student decisions and evidence

The workspace records the selected network, pitch history, saved sources and annotations, script blocks, visual scenes, recording reference, transcript, package status, producer feedback, review history, schedule state, audience reactions, reflection, and reflection history. This is the most complete revision trail in the catalog.

### Final project presentation

The final is a class news broadcast. Each student’s package can include video or audio, but a written script with evidence scenes is explicitly accepted as a complete accessible presentation format. The producer assembles approved packages into a timed rundown and controls hold, resume, and take-next actions during the show.

### Audit finding

The final product, source rubric, alternate presentation format, and reflection revision are well aligned. The project must still distinguish seed segments from student work in every teacher view. The current catalog launcher forces demo mode, keeps media in the browser, and lets the learner switch to a simulated producer. A real class needs authenticated producer approval, shared scheduling, durable media storage, and immutable submitted versions.

## 5. The Fate of the Republic

### Teaching sequence

Students take an initial position, listen to the opposing argument, mark what they heard, select evidence, explain their reasoning, rehearse, record or use a transcript, file a response, answer moderator questions, and participate in later rounds. After the assembled debate, they vote and write an individual reflection.

### Recorded student decisions and evidence

The design preserves pre- and post-debate opinion, filed turns, evidence IDs, reasoning contributions, recordings or transcripts, moderator prompts and decisions, category votes, reflection, and session progression. The final verdict can show whether the class changed its position rather than only naming a winner.

### Final project presentation

The final is a full-class Roman Senate proceeding. Filed student speeches play in a broadcast sequence with projected evidence and timed segments. The class then completes private judgments for the final verdict, best evidence, strongest rebuttal, persuasive speaker, and important argument. Results are revealed ceremonially, including the before-and-after opinion shift.

### Audit finding

This is the strongest sixth-grade performance model because speaking, listening, rebuttal, evidence, and reflection remain distinct records. The local catalog session still uses preview identities and a demo shared-session adapter. A classroom release needs server-enforced membership, teacher-controlled moderator and premiere actions, durable media ownership, locked filed versions, and individual rubric review.

## 6. Race Around the World

### Teaching sequence

Students choose an expedition purpose, prepare the ship, compare routes, respond to a storm, and evaluate an encounter from two reconstructed perspectives. Version 1.1 adds sixth-grade learning targets, a glossary, paragraph-level evidence, a response frame, predictions, citations, revisions, and a provider-neutral tutor contract.

### Recorded student decisions and evidence

The domain record can preserve the selected choice, choice-specific drafts, cited paragraph and explanation, offered and viewed evidence, prediction, text or audio response, tutor turns tied to an exact response fingerprint, resource values before and after, route points, consequences, mastery evidence, replay scenes, and response revisions.

### Final project presentation

The final is **Our Expedition Record**, an animated voyage replay. Each chapter becomes a scene containing the route, consequence, student explanation or audio, and collected mastery tags. Students can include or hide individual scenes and submit an immutable journey snapshot for teacher review when an authoritative session exists.

### Audit finding

The title says “around the world,” while the implemented five-chapter experience is an Atlantic expedition that ends at the first encounter. The scope note now states that limit, and the catalog and runtime both advertise version 1.1. The learner interface now renders the required paragraph citation and explanation, route comparisons, a prediction prompt, learning targets, glossary support, and the reasoning-coach conversation. The built-in coach follows the same bounded adapter contract intended for the future AI tutor and cannot award mastery. The remaining release gap is authenticated enrollment, authoritative class saving, teacher review detail, and visible revision controls for completed chapters.

## Cross-project findings

### 1. “Available” does not describe classroom readiness

Every catalog entry is labeled **Available**, although every project host session is created by `createLocalPreviewSession`. History Live declares itself a local demonstration, Exhibit Hall exposes preview role switching, Frontier uses browser-only state, Mystery uses memory-only state, Debate uses demo shared-session behavior, and Journey uses a fixed demo learner. The catalog needs separate statuses such as `Preview`, `Pilot`, and `Classroom ready` backed by release checks.

### 2. Final-product language is inconsistent

The application currently uses “final investigation,” “finish reflection,” “publish,” “submit package,” “file into the record,” and “submit journey.” These are valid project-specific metaphors, but the platform has no shared final-product state visible across projects. A reusable submission contract should preserve draft, submitted snapshot, feedback, revision request, resubmission, approval, rubric results, and submission history while allowing each template to choose its student-facing language.

### 3. Recorded work is richer than assessment

Most projects capture useful process evidence. Teacher assessment is much thinner. History Live preserves reviews, and Journey defines per-criterion feedback types, but the catalog does not provide a consistent teacher view of the student’s full process, final snapshot, prior versions, cited evidence, media, and rubric decisions.

### 4. Group products need individual evidence

Exhibit Hall, History Live, Debate Studio, and Frontier’s showcase all contain group-facing presentation modes. Exhibit Hall and Debate explicitly add individual defenses or reflections; History adds an individual reflection revision. Frontier should make individual ownership of the required calculation and defense response explicit in the saved record.

### 5. Accessible alternatives are uneven

History Live and Debate accept transcripts in place of recordings. Exhibit Hall offers an accessible list view. Journey supports text in place of audio. Frontier’s final showcase works as an on-screen presentation and printable slide. Mystery has a readable report form but no separate presentation mode. These alternatives should be declared in project configuration and surfaced in teacher review rather than inferred from template behavior.

## Recommended release order

1. **Introduce one reusable final-submission and review capability.** Connect immutable versions, teacher feedback, rubric decisions, revision requests, and resubmission history across templates.
2. **Replace local preview sessions with authenticated enrollment context.** Enforce tenant, class, team, student, teacher, and media ownership on the server.
3. **Correct catalog status language.** Keep demonstration projects discoverable, but do not present them as classroom-ready releases.
4. **Finish each project’s final presentation gap:** add a presentation/defense option for Mystery, validate student math in Frontier, open and populate real Exhibit wings and videos, connect authoritative History producer review, connect an authoritative Debate session, and expose Journey’s completed-chapter revision workflow.

## Verification

- Angular production build: passed.
- Automated tests: 55 files passed, 247 tests passed.
- Browser walkthrough: a Journey learner selected a mission, wrote a prediction and explanation, added an exact paragraph citation, opened a reasoning-coach question, recorded Chapter 1, advanced to Chapter 2, and retained the recorded path after reload.
- Build warnings: six component style sheets exceed their configured 14 kB warning budget; no production build error remains.
