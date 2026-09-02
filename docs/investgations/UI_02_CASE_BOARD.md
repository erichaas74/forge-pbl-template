# UI_02_CASE_BOARD.md

# Investigation Workspace / Case Board Design Specification

## Purpose

The Investigation Workspace is the central student reasoning environment for the Investigation Template.

It should not behave like a traditional LMS page with unrelated cards, assignments, and tabs.

The workspace should visually help students move through the investigation cycle:

EVIDENCE → ANALYZE → THEORY → INVESTIGATE → NEW EVIDENCE

The design must help students see how one stage of reasoning informs the next.

The Investigation Workspace should feel like a professional research, detective, laboratory, field, historical, or mission workspace rather than a digital worksheet.

---

# 1. Core Visual Rule

## Always Show Two Connected Panels on Desktop

The Investigation Workspace should display **exactly two major reasoning panels side by side** on desktop/laptop.

Do not show all four major work areas at once.

Do not show only one major work area by default.

The two visible panels should always represent an intellectual connection.

Supported primary pairings:

1. **Evidence → Analysis**
2. **Analysis → Theory**
3. **Theory → Investigate**

Optional temporary pairing:

4. **Theory → Active Investigation**

The reason for using two panels is not simply to fit more information on the screen.

The purpose is to help students visually connect:

what they have → what it means → what they think → what they should do next

---

# 2. Workspace Areas

## Evidence Locker
Contains collected evidence and student-created evidence.

Purpose: **What have I discovered?**

## Analysis Corkboard
Contains the student's interpretation and organization of evidence.

Purpose: **What does this evidence mean?**

## Working Theory
Contains the student's current explanation, identification, diagnosis, reconstruction, suspect, cause, or recommendation.

Purpose: **What do I think is happening now?**

## Investigate
Contains available next actions such as lab tests, simulations, interviews, source investigations, maps, artifact examinations, research stations, observations, and measurements.

Purpose: **What should I investigate next?**

---

# 3. Persistent Mission / Status Header

A compact mission/status strip remains visible in every workspace mode.

Example:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ MYSTERY SUBSTANCE OUTBREAK                                                 │
│ Mission: What substance caused the reaction?                               │
│ Phase 3: Test Samples       Evidence 6/10       Lab Credits: 3             │
└─────────────────────────────────────────────────────────────────────────────┘
```

The persistent header may contain:

- project name
- mission question
- current phase
- evidence count
- important limited resource count
- progress/status
- team name if relevant

Do not overload it with full rubric, detailed grades, long directions, or mastery questions.

---

# 4. Workspace Navigation

Navigation should represent the reasoning connection, not just generic tabs.

Recommended desktop navigation:

```text
[ Evidence → Analyze ]   [ Analyze → Theory ]   [ Theory → Investigate ]
```

The current pair should be visually dominant.

Alternative younger-student labels:

```text
1. What does the evidence mean?
2. What do you think?
3. What should you investigate next?
```

Older-student labels:

```text
EVIDENCE → ANALYZE
ANALYZE → THEORY
THEORY → INVESTIGATE
```

The same underlying workspace should support both through configuration.

---

# 5. Workspace Pair A — Evidence + Analysis

## Educational Purpose

Students inspect what they have collected and determine what each piece of evidence means.

The student's full Working Theory should not be visible in this workspace.

This reduces the tendency to interpret every new clue only through the current theory.

## Recommended Layout

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ MYSTERY SUBSTANCE OUTBREAK                Phase 3 • Evidence 6/10          │
├─────────────────────────────────┬──────────────────────────────────────────┤
│ EVIDENCE LOCKER                 │ ANALYSIS CORKBOARD                       │
│                                 │                                          │
│ [Temperature Result]            │ SUPPORTS                                 │
│ 21° → 37°                       │                                          │
│                                 │    [Color Change]                        │
│ [Sample Photo]                  │                                          │
│                                 │ UNCERTAIN                                │
│ [Mass Data]                     │                                          │
│                                 │    [Witness Statement]                   │
│ [Witness Statement]             │                                          │
│                                 │ CONTRADICTS                              │
│ [Color Change]                  │                                          │
│                                 │    [Mass Data]                           │
│ + Add My Evidence               │                                          │
│                                 │ Questions                                │
│                                 │ ? Why did the sample heat up?            │
└─────────────────────────────────┴──────────────────────────────────────────┘
```

Suggested proportion:

- Evidence Locker: 42%
- Analysis Corkboard: 58%

---

# 6. Evidence Locker

The Evidence Locker contains all evidence the student/team currently possesses.

Possible evidence types:

- image
- lab result
- measurement
- graph
- data table
- interview
- document
- map
- artifact
- observation
- simulation result
- student-created evidence

Example evidence card:

```text
┌───────────────────────────┐
│ 📊 LAB RESULT             │
│                           │
│ Temperature Test          │
│                           │
│ 21°C → 37°C               │
│                           │
│ Collected during Test #2  │
│                           │
│ ● Reviewed                │
└───────────────────────────┘
```

Evidence type should be obvious through **icon + category label + card layout**. Do not rely only on color.

---

# 7. Evidence Card States

## Locked

```text
┌─────────────────────────┐
│ 🔒 LOCKED EVIDENCE      │
│                         │
│ Complete Reaction Test  │
│ to unlock this evidence │
└─────────────────────────┘
```

The project may alternatively keep evidence fully hidden until unlocked.

## New

```text
┌─────────────────────────┐
│ NEW                     │
│                         │
│ Temperature Test Result │
│                         │
│ View Evidence →         │
└─────────────────────────┘
```

## Reviewed

`✓ Reviewed`

## Used in Final Claim

`★ Used in Final Claim`

---

# 8. Analysis Corkboard

Recommended default evidence zones:

- Supports
- Uncertain
- Contradicts

Projects may rename them.

Examples:

### Fossil Detectives
- Supports
- Does Not Fit
- Uncertain

### Historical Investigation
- Supports This Interpretation
- Challenges This Interpretation
- Unclear / Missing Context

---

# 9. Moving Evidence to Analysis

Students may:

- drag evidence from the Evidence Locker
- use keyboard movement
- use a "Move Evidence" menu

When dragging, valid targets should become visually clear.

Accessible non-drag option:

```text
Move Evidence...

○ Supports
○ Contradicts
○ Uncertain
○ Evidence Locker
```

The board should record the student's interpretation rather than immediately marking classifications right/wrong.

---

# 10. Cross-Panel Highlighting — Evidence + Analysis

When a student selects an evidence card in the Evidence Locker:

- that card highlights
- its current Analysis location highlights
- a temporary visual connection may appear

Example:

```text
[ Temperature Result ]  ───────────────→  [ SUPPORTS ]
```

Connections should be temporary and subtle in V1.

---

# 11. Evidence Detail Within the Two-Panel Model

Opening evidence should not take the student away from the reasoning context.

The evidence item may expand inside or over most of the Evidence panel while the Analysis Corkboard remains visible.

```text
┌─────────────────────────────────┬────────────────────────────────────┐
│ TEMPERATURE RESULT              │ ANALYSIS CORKBOARD                 │
│                                 │                                    │
│ Test procedure                  │ SUPPORTS                           │
│ Graph                           │ [Color]                            │
│ 21°C → 37°C                     │                                    │
│ Student Notes                   │ UNCERTAIN                          │
│ ...                             │ [Witness]                          │
│                                 │                                    │
│ [Close Detail]                  │ CONTRADICTS                        │
│                                 │ [Mass]                             │
└─────────────────────────────────┴────────────────────────────────────┘
```

---

# 12. Workspace Pair B — Analysis + Theory

## Educational Purpose

Students use their organized evidence interpretation to build or revise an explanation.

The raw Evidence Locker is not visible.

## Recommended Layout

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ MYSTERY SUBSTANCE OUTBREAK                   Build Your Explanation         │
├────────────────────────────────────┬───────────────────────────────────────┤
│ ANALYSIS CORKBOARD                 │ WORKING THEORY                        │
│                                    │                                       │
│ SUPPORTS                           │ CURRENT IDENTIFICATION                │
│ [Temp Result]                      │        SUBSTANCE B                    │
│ [Color Change]                     │                                       │
│                                    │ Confidence                            │
│ UNCERTAIN                          │ ███████░░░ 72%                        │
│ [Witness]                          │                                       │
│                                    │ WHY?                                  │
│ CONTRADICTS                        │ [Student reasoning...]                │
│ [Mass Result]                      │                                       │
│                                    │ Evidence being used                  │
│ Questions                          │ 3 supporting                         │
│ ? Why didn't C react?              │ 1 contradicting                      │
│                                    │ [Revise Theory]                       │
└────────────────────────────────────┴───────────────────────────────────────┘
```

Suggested proportion:

- Analysis: 50%
- Theory: 50%

---

# 13. Working Theory

Student-facing labels may include:

- Working Theory
- Possible Substance
- Current Diagnosis
- Current Reconstruction
- Current Suspect
- Current Cause
- Current Explanation
- Current Recommendation

The project configuration controls terminology.

The Theory panel may contain:

- current theory
- alternate explanations
- confidence
- evidence counts
- reasoning response
- strongest support
- strongest contradiction
- unresolved question
- revision action
- history access

---

# 14. Multiple Theory Mode

Older/open investigations may support several competing explanations.

```text
POSSIBLE EXPLANATIONS

1. Substance B       72%
   Evidence: 3 supports / 1 contradicts

2. Substance C       48%
   Evidence: 2 supports / 2 contradicts

3. Substance A       16%
   Evidence: 1 supports / 4 contradicts

[Compare Explanations]
```

Students may rank, eliminate, select, attach evidence, and revise.

---

# 15. Cross-Panel Highlighting — Analysis + Theory

Selecting an Analysis evidence card should highlight the theory element affected by it.

Example:

```text
[ Mass Result ]  ───────────────→  [ Weakens Substance B ]
```

The system should visually show:

**This piece of analyzed evidence affects this part of your explanation.**

---

# 16. Theory Editing

When the student selects **Revise Theory**:

- Theory panel becomes editable
- Analysis Corkboard remains visible
- evidence can be attached directly to the revised theory

Do not navigate to a disconnected blank essay page.

---

# 17. Workspace Pair C — Theory + Investigate

## Educational Purpose

Students use their current explanation, uncertainty, and questions to decide what to investigate next.

```text
what I think
        ↓
what evidence I still need
        ↓
what I should do next
```

## Recommended Layout

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ MYSTERY SUBSTANCE OUTBREAK                     Choose Your Next Move        │
├────────────────────────────────────┬───────────────────────────────────────┤
│ WORKING THEORY                     │ INVESTIGATE                           │
│                                    │                                       │
│ Current Identification             │ AVAILABLE TESTS                       │
│        SUBSTANCE B                 │                                       │
│ Confidence: 72%                    │ ┌───────────────────────┐             │
│                                    │ │ Solubility Test       │             │
│ Weakest Point                      │ │ Cost: 1 credit        │             │
│ Mass evidence contradicts B        │ │ Helps compare B vs C  │             │
│                                    │ │ [Run Test]            │             │
│ Questions                          │ └───────────────────────┘             │
│ Why did the mass result differ?    │                                       │
│                                    │ ┌───────────────────────┐             │
│ Need evidence that can:            │ │ Advanced Analysis     │             │
│ • separate B from C                │ │ Cost: 3 credits       │             │
│ • explain mass result              │ │ May resolve mass data │             │
│                                    │ │ [Run Test]            │             │
│                                    │ └───────────────────────┘             │
└────────────────────────────────────┴───────────────────────────────────────┘
```

Suggested proportion:

- Theory: 45%
- Investigate: 55%

---

# 18. Investigate Panel

The panel may show:

- available tests
- locked tests
- resource cost
- expected information type
- interviews
- source searches
- field stations
- maps
- simulations
- research actions
- optional extensions

It may tell students what kind of information a test provides, but should not automatically label the "correct test" unless a guided project explicitly requires that scaffold.

---

# 19. Cross-Panel Highlighting — Theory + Investigate

When the student selects an unresolved theory question, relevant investigation options may highlight.

Example:

```text
Question:
"Which test could distinguish B and C?"

                    ↓

Solubility Test
May provide evidence about differences between B and C.
```

The purpose is to make visible:

**uncertainty → investigation choice**

without giving away the answer.

---

# 20. Optional Temporary Pair — Theory + Active Investigation

Simple activities may run inside the right panel.

```text
┌──────────────────────────────┬──────────────────────────────────────┐
│ WORKING THEORY               │ ACTIVE TEST                          │
│ Substance B                  │ Temperature Test                     │
│ Question:                    │ [ interactive activity ]             │
│ Why did the sample heat up?  │ [Record Result]                      │
└──────────────────────────────┴──────────────────────────────────────┘
```

Large simulations may use the separate Activity Workspace.

---

# 21. After an Investigation Activity

When an activity produces new evidence:

1. activity completes
2. evidence is generated/unlocked
3. workspace returns to **Evidence + Analysis**
4. new evidence is highlighted
5. optional subtle animation shows the evidence entering the locker

Example:

```text
NEW EVIDENCE COLLECTED

Temperature Test Result
```

---

# 22. Investigation Reasoning Cycle

The workspace reinforces:

```text
EVIDENCE + ANALYSIS
        ↓
ANALYSIS + THEORY
        ↓
THEORY + INVESTIGATE
        ↓
new evidence
        ↓
EVIDENCE + ANALYSIS
```

This is a defining instructional feature of the Investigation Template.

---

# 23. Student Questions

Students may create unanswered questions such as:

- Why did Sample C not react?
- What evidence would eliminate Substance A?
- Why does this fossil not match the rock layer?

Questions may later connect to investigation options.

---

# 24. Student-Created Evidence

The Evidence panel should include:

`+ Add My Evidence`

Possible types:

- Observation
- Measurement
- Photo
- Screenshot
- Data
- Graph
- Note
- Upload

After creation, it appears in the Evidence Locker.

---

# 25. Center Divider as Connection Space

The divider between panels may temporarily show a relationship.

Examples:

```text
Temperature Result  ───────────►  Supports
```

```text
Mass Result  ──────────────────►  Weakens Substance B
```

```text
Need to distinguish B/C ───────►  Solubility Test
```

Avoid permanent line clutter in V1.

---

# 26. Theme Independence

The reasoning layout and behavior are reusable.

Project themes may change:

- backgrounds
- panel skins
- icons
- terminology
- evidence card treatment
- section labels
- activity visuals

Theme must not alter the reasoning architecture.

---

# 27. Mystery Substance Theme Example

Possible terms:

- Evidence Locker
- Analysis Board
- Possible Substance
- Lab Tests
- Final Identification

Visual direction:

- digital laboratory workspace
- clean hazard/research visuals
- sample tags
- instrument graphics
- lab data cards

---

# 28. Fossil Detectives Theme Example

Workspace pairs:

```text
FIELD EVIDENCE | ANALYSIS CORKBOARD
```

```text
ANALYSIS CORKBOARD | LANDSCAPE RECONSTRUCTION
```

```text
RECONSTRUCTION | RESEARCH STATIONS
```

Possible evidence:

- shell fossil
- leaf fossil
- rock layer
- site map

Same components, different configuration/theme.

---

# 29. Historical Investigation Example

Workspace pairs:

```text
SOURCE FILES | SOURCE ANALYSIS
```

```text
SOURCE ANALYSIS | CURRENT EXPLANATION
```

```text
CURRENT EXPLANATION | INVESTIGATE MORE SOURCES
```

This is an important proof that the UI is not science-specific.

---

# 30. Younger Student Guidance

For younger students, add guided directions.

Example:

```text
STEP 1

Look at the evidence.

What does each clue tell you?
```

Then:

```text
STEP 2

Use your evidence groups to build an explanation.
```

Then:

```text
STEP 3

What should you investigate next?
```

Guidance is configuration/presentation, not a separate engine.

---

# 31. Older Student Mode

For older students:

- less instruction
- more open movement
- more hypotheses
- more optional evidence
- more investigation choices
- less automatic highlighting

The two-panel reasoning model remains.

---

# 32. Mobile / Narrow Layout

Desktop/laptop is the primary target.

On narrow screens, do not squeeze both panels into unreadable columns.

Recommended fallback:

- preserve the paired-workspace concept
- show one of the two panels at a time
- provide a clear toggle between them
- preserve the current selection/connection across the toggle

Example:

```text
EVIDENCE → ANALYSIS

[ Evidence ] [ Analysis ]
```

If Temperature Result is selected in Evidence, switching to Analysis should retain the linked target highlight.

Tablet landscape may show both panels.

---

# 33. Chromebook Requirements

The workspace must work with:

- mouse
- trackpad
- keyboard
- touch when available

Do not require precise dragging.

Cards need large enough targets.

---

# 34. Shared Graphics Needed

Reusable Investigation graphics/icons:

- evidence type
- lock
- new evidence
- reviewed
- used in final claim
- question
- confidence
- theory
- resource
- phase status
- add evidence
- relationship markers

These should remain consistent across projects.

---

# 35. Project-Specific Graphics Needed

Project theme may supply:

- mission banner
- workspace background
- panel surface treatments
- NPC portraits
- evidence-specific images
- instruments
- maps
- specimens
- artifacts
- decorative scene elements

These belong in project assets/theme configuration.

---

# 36. Animation

Use restrained, meaningful animation.

Good:

- new evidence entering the locker
- selected connection briefly appearing across divider
- new phase becoming available
- locked activity becoming available
- smooth transition between workspace pairs

Avoid:

- constant background motion
- excessive glows
- celebration effects for every action
- animation that interferes with reading

Respect reduced-motion settings.

---

# 37. What Does Not Belong Here

Do not crowd the Investigation Workspace with:

- full rubric
- long lessons
- detailed gradebook
- teacher feedback history
- resource library
- unrelated assignments
- long project directions
- full mastery assessments

The workspace should answer:

- What evidence do I have?
- What does it mean?
- What do I think?
- What should I investigate next?

---

# 38. Desktop Success Criteria

A student should be able to:

1. inspect evidence,
2. immediately connect evidence to analysis,
3. use analysis to revise theory,
4. use theory/questions to choose the next investigation,
5. return from an activity and immediately see new evidence,
6. understand the reasoning cycle without reading a long tutorial.

---

# 39. Instructional Design Principle

The Investigation Workspace must not simply display information side by side.

The two-panel design should deliberately make the relationship between stages visible.

The defining UI principle is:

> **Always show the student the thing they are working with and the thing they need to connect it to.**

That means:

- Evidence + Analysis
- Analysis + Theory
- Theory + Investigation

Use:

- selection
- highlighting
- counts
- temporary connectors
- linked questions
- linked evidence
- linked investigation options

to make investigative reasoning visible.

---

# 40. V1 Scope

Build first:

- persistent mission/status strip
- workspace pair navigation
- Evidence + Analysis
- Analysis + Theory
- Theory + Investigate
- evidence cards
- Supports / Uncertain / Contradicts
- current theory
- confidence
- student questions
- add student evidence
- contextual investigation options
- cross-panel highlighting
- non-drag evidence movement
- post-activity new-evidence transition

---

# 41. V1.5 / Later

Later additions may include:

- visible evidence-to-theory connection lines
- advanced corkboard layouts
- freeform evidence clustering
- analysis timeline/replay
- automatic layout
- stronger theme variants
- teacher playback of reasoning history
- advanced evidence networks

Do not block V1 on these.

---

# 42. Final Design Goal

The Investigation Workspace should feel like:

```text
a detective evidence board
+
a professional research workstation
+
a science notebook
+
a game mission interface
```

without becoming visually chaotic.

Students should feel that they are **conducting an investigation**, not filling out another LMS worksheet.
