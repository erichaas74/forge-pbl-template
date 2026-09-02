# UI_03_EVIDENCE_DETAIL.md

# Evidence Detail Design Specification

## Purpose

The Evidence Detail view lets students inspect one piece of evidence deeply **without losing the reasoning context around it**.

Evidence should never feel like opening a random attachment in an LMS.

The student should understand:

1. What is this evidence?
2. Where did it come from?
3. What do I notice?
4. What does it mean?
5. How does it connect to my analysis or theory?
6. What should I do with it next?

The Evidence Detail experience must work inside the two-panel Investigation Workspace described in `UI_02_CASE_BOARD.md`.

---

# 1. Core Design Rule

Evidence Detail should open **inside the current workspace relationship**, not as a disconnected full-page destination.

Examples:

```text
Evidence Detail | Analysis Corkboard
```

or:

```text
Analysis Corkboard | Evidence Detail
```

depending on which side the evidence belongs to.

The student should still be able to see the reasoning context while examining the evidence.

---

# 2. Primary Evidence Detail Layout

Recommended desktop layout:

```text
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ EVIDENCE DETAIL                      │ ANALYSIS CORKBOARD                   │
│                                      │                                      │
│ Temperature Test Result              │ SUPPORTS                             │
│ Lab Result                           │ [Color Change]                       │
│                                      │                                      │
│ ┌──────────────────────────────────┐ │ UNCERTAIN                            │
│ │                                  │ │ [Witness Statement]                 │
│ │       VISUAL / DATA AREA         │ │                                      │
│ │                                  │ │ CONTRADICTS                          │
│ └──────────────────────────────────┘ │ [Mass Result]                        │
│                                      │                                      │
│ What do you notice?                  │                                      │
│ [ student note ]                     │                                      │
│                                      │                                      │
│ Source / context                     │                                      │
│ ...                                  │                                      │
│                                      │                                      │
│ [Move to Supports]                   │                                      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

The right panel remains visible so the student can directly classify/connect the evidence.

---

# 3. Evidence Detail Structure

Recommended order:

## A. Evidence identity

Show:

- evidence title
- evidence type
- evidence source/context
- new/reviewed status
- evidence ID only in teacher/debug mode

Example:

```text
LAB RESULT

Temperature Test Result
Collected during Test #2
```

---

## B. Main evidence content

This should be the dominant area.

Examples:

- image
- graph
- data table
- document excerpt
- map
- artifact image
- lab result
- interview response
- simulation result
- measurement
- student upload

The UI should adapt to the evidence type.

---

## C. Student observation area

Prompt students to record what they notice before deciding what it means.

Examples:

```text
What do you notice?
```

```text
What changed?
```

```text
What pattern do you see?
```

```text
What stands out?
```

For younger students, this can be guided.

For older students, it can be more open.

---

## D. Source / context

Show enough context to interpret the evidence.

Examples:

- who produced it
- where it came from
- when it was collected
- which lab generated it
- source citation
- location
- measurement conditions

Do not expose teacher-only reliability/meaning metadata.

---

## E. Student action area

Possible actions:

- classify evidence
- attach to hypothesis
- add note
- annotate
- mark important
- cite in final claim
- compare with another evidence item
- create question
- close detail

Only show actions enabled by project configuration.

---

# 4. Evidence Type-Specific Layouts

The same Evidence Detail shell should support different inner content layouts.

---

# 5. Image Evidence

Recommended:

```text
┌─────────────────────────────────────┐
│ SAMPLE PHOTO                        │
│                                     │
│ [ large image ]                     │
│                                     │
│ Zoom / inspect                      │
│                                     │
│ What do you notice?                 │
│ [student response]                  │
└─────────────────────────────────────┘
```

Possible tools:

- zoom
- pan
- annotation markers
- labeled regions
- compare before/after

Do not require annotation for every image.

---

# 6. Data / Measurement Evidence

Recommended:

```text
TEMPERATURE TEST RESULT

Before: 21°C
After: 37°C

Change: +16°C

[ small chart or visual ]

What pattern do you notice?
[ response ]
```

Use clear units.

For younger students, display calculations visually.

For older students, allow more raw data.

---

# 7. Graph Evidence

Recommended:

```text
POPULATION DATA

[ graph ]

Focus tools:
- highlight point
- inspect value
- select trend

What pattern do you see?
[ response ]
```

If the graph is interactive, selection should remain local until the student explicitly saves a note/claim.

---

# 8. Document / Source Evidence

Recommended:

```text
SOURCE FILE

Colonial Newspaper Excerpt
1775

[ readable source excerpt ]

Source information:
Publisher:
Date:
Context:

Student tools:
[Highlight]
[Add Note]
[Mark Possible Bias]
```

Historical/source investigations may need:

- source type
- author
- date
- audience
- perspective
- credibility prompts

These should be configurable extensions, not separate evidence systems.

---

# 9. Interview / Witness Evidence

Recommended:

```text
WITNESS STATEMENT

Dr. Torres
Lab Technician

"The container became warm soon after..."

Context:
Interviewed during Phase 2

What information seems important?
[ response ]
```

If the evidence came from an NPC conversation, link back to the relevant dialogue/history when allowed.

---

# 10. Artifact / Fossil Evidence

Recommended:

```text
FOSSIL SPECIMEN

[ large specimen image ]

Observed features:
- shell shape
- ridge pattern
- size

Student observation:
[ response ]

Related site:
Field Site B
```

Possible future tools:

- rotate 3D model
- measure
- compare specimens
- inspect labeled regions

These should use registered evidence plugins.

---

# 11. Evidence Comparison Mode

Some projects should allow students to compare two pieces of evidence.

Example:

```text
┌──────────────────────────────┬──────────────────────────────┐
│ Evidence A                   │ Evidence B                   │
│ Temperature Result           │ Mass Result                  │
│                              │                              │
│ [data]                       │ [data]                       │
│                              │                              │
│ What matches?                │ What differs?                │
└──────────────────────────────┴──────────────────────────────┘
```

Then return to the active Analysis panel.

Comparison is optional, not required in V1.

---

# 12. Evidence Classification

Evidence Detail should make classification easy.

Example:

```text
What does this evidence do?

[ Supports ]
[ Uncertain ]
[ Contradicts ]
```

Project-specific labels may replace these.

Examples:

Fossil Detectives:

```text
Supports
Does Not Fit
Uncertain
```

Historical Case:

```text
Supports This Interpretation
Challenges This Interpretation
Needs More Context
```

The student is recording their interpretation, not answering an immediate correctness quiz.

---

# 13. Cross-Panel Classification

When the student selects a classification:

- the matching Analysis zone highlights
- the evidence card appears/moves there
- a temporary connector can show the relationship

Example:

```text
Temperature Result ──────────► Supports
```

This should make the classification action visually meaningful.

---

# 14. Evidence Notes

Student notes should be tied to the evidence item.

Possible prompts:

- What do you notice?
- Why is this important?
- What question does this raise?
- Does this support or challenge an idea?
- What should you investigate next?

Notes should be concise by default.

Avoid forcing a paragraph after every piece of evidence.

---

# 15. Annotation

Annotation may include:

- highlight region
- highlight source text
- add pin/comment
- circle feature
- mark data point

Annotation should be optional per evidence type/project.

V1 can support simple notes/highlights before advanced image annotation.

---

# 16. Evidence Importance

Students may optionally mark:

```text
★ Important Evidence
```

This is different from:

```text
Used in Final Claim
```

Important means:

> I think this matters.

Used in Final Claim means:

> I formally cited this evidence in my final reasoning.

---

# 17. Attach Evidence to Theory

In Analysis + Theory mode, opening Evidence Detail may allow:

```text
Connect to:
[ Substance B ]
Relationship:
[ Supports ]
```

or:

```text
Connect to:
[ Shallow Sea Reconstruction ]
Relationship:
[ Supports ]
```

This should use the generic evidence relationship system.

---

# 18. Evidence Detail and Working Theory

The full Working Theory should not automatically appear beside raw evidence when the student is in Evidence + Analysis mode.

However, in Analysis + Theory mode, evidence detail may appear as a focused overlay/card tied to the selected analysis item.

The design should preserve the current reasoning pair.

---

# 19. "Use in Final Claim"

Students may mark evidence for later use.

Example:

```text
[ Add to Final Evidence Set ]
```

This creates a reference, not a duplicate upload.

The final submission should later use the same evidence ID.

---

# 20. Evidence Source Reliability

Some projects need students to evaluate source quality.

Possible student-facing controls:

```text
How trustworthy is this source?

Low
Medium
High
```

or:

```text
Primary
Secondary
Unknown
```

or:

```text
Possible Bias
Missing Context
Reliable Measurement
```

These controls are project-configurable.

Do not automatically expose teacher ratings.

---

# 21. Student vs Teacher Evidence Metadata

Teacher mode may show a collapsible panel:

```text
TEACHER METADATA

Reliability: High
Relevance: 0.9
Supports: Hypothesis B
Contradicts: Hypothesis A
Decoy: No
Teacher meaning: ...
```

Student mode must not receive/display this unless intentionally authorized.

Production architecture should allow server filtering.

---

# 22. New Evidence Experience

When evidence is newly unlocked:

```text
NEW EVIDENCE

Temperature Test Result
```

Clicking it should open Evidence Detail immediately while keeping the Analysis panel visible.

The evidence should carry a visible `NEW` status until meaningfully viewed.

---

# 23. Locked Evidence Preview

Projects may choose one of two modes.

## Hidden

Student sees nothing until unlock.

## Teased / Locked

Student sees:

```text
LOCKED EVIDENCE

Advanced Spectroscopy Result

Requires:
Collect 4 evidence items
```

The project controls which mode is used.

---

# 24. Evidence Created by Students

Student-created evidence should use the same detail structure where possible.

Example:

```text
MY OBSERVATION

Sample B produced bubbles during the test.

Created by:
Eric
During:
Reaction Test

[Edit Note]
[Classify]
[Connect]
```

The system should clearly distinguish:

- teacher-provided evidence
- student-created evidence

without treating student evidence as less important visually.

---

# 25. Evidence From Simulations

A simulation result may include:

- inputs
- outputs
- graph
- score
- snapshot
- trial number
- timestamp

Only meaningful summary data should appear.

Do not expose raw internal simulation telemetry.

---

# 26. Multiple Trials

If the same activity produces multiple trials, Evidence Detail may show:

```text
TRIAL HISTORY

Trial 1
21°C → 29°C

Trial 2
21°C → 37°C

Official Trial
21°C → 35°C
```

Projects may decide whether:

- every trial becomes evidence
- only selected trial becomes evidence
- summary evidence is produced

Do not create hundreds of evidence cards from trivial trial data.

---

# 27. Evidence Status Indicators

Possible status indicators:

- New
- Reviewed
- Classified
- Annotated
- Important
- Used in Final Claim
- Teacher Released
- Student Created

Do not show every status simultaneously.

Prioritize the ones relevant to the current task.

---

# 28. Evidence Detail Navigation

When several evidence items are open/relevant, allow:

```text
← Previous Evidence
Next Evidence →
```

only when it supports the workflow.

Do not encourage students to click through evidence like a slideshow without analysis.

---

# 29. Return Behavior

Closing Evidence Detail should return the student to:

- same workspace pair
- same Analysis zone
- same selected evidence
- same scroll position where practical

Do not reset the Case Board.

---

# 30. Contextual Question Creation

Evidence Detail should allow:

```text
+ Ask a Question About This Evidence
```

Example:

```text
Why did the temperature rise so quickly?
```

That question can later appear in:

- Analysis Corkboard
- Theory panel
- Theory → Investigate linkage

This helps create continuity across reasoning stages.

---

# 31. Theory-to-Evidence Peek

In Theory mode, students may need to verify a specific evidence item.

Provide:

```text
Peek at Evidence
```

This opens a compact Evidence Detail overlay/panel without showing the full Evidence Locker.

The student keeps Theory context.

---

# 32. Evidence-to-Analysis Focus

In Evidence + Analysis mode, selecting/opening evidence should always make its Analysis state visible.

Examples:

- classification zone highlight
- existing notes highlight
- relationship indicator
- unclassified prompt

This is more important than decorative evidence animation.

---

# 33. Younger Student Evidence Detail

For younger students:

- larger imagery
- shorter text
- guided prompts
- fewer simultaneous actions
- clear buttons
- explicit step labels

Example:

```text
1. Look closely.
2. Write what you notice.
3. Decide where this clue belongs.
```

---

# 34. Older Student Evidence Detail

For older students:

- denser source/context information
- fewer prompts
- more annotation
- multiple evidence relationships
- source credibility analysis
- more open notes

Same Evidence Detail shell.

---

# 35. Mobile / Narrow Screen

On narrow screens:

- evidence detail occupies the screen
- paired Analysis/Theory context appears as a compact toggle or linked summary
- selected relationship should persist
- closing returns to same workspace state

Do not attempt to force two full columns into a narrow phone screen.

---

# 36. Tablet

Tablet landscape may preserve evidence detail + paired context side by side.

Portrait may use stacked/toggled views.

---

# 37. Chromebook / Laptop

Primary target.

Evidence Detail should make good use of width while preserving the paired reasoning panel.

Avoid unnecessarily large modal windows that leave little room for Analysis.

---

# 38. Graphics Needed — Shared

Reusable evidence UI assets:

- evidence type icons
- status badges
- source icon
- note icon
- annotation icon
- important/star
- final evidence marker
- connection arrow
- lock/new indicators

---

# 39. Graphics Needed — Project Specific

Evidence-specific assets may include:

- lab photos
- graphs
- maps
- documents
- fossil images
- sample images
- diagrams
- artifact images
- NPC portraits

These belong in project assets.

---

# 40. Theme Behavior

Theme may change:

- evidence-card styling
- panel surface
- category icons
- frame decoration
- typography accents
- imagery

Theme must not change:

- evidence status meaning
- accessibility
- evidence permissions
- teacher/student visibility
- evidence relationships
- runtime behavior

---

# 41. Animation

Appropriate:

- evidence detail expands
- new evidence card opens
- classification target highlights
- temporary relationship connector appears

Avoid:

- constant animated backgrounds
- distracting transitions
- long reveal animations
- effects that obscure evidence content

---

# 42. V1 Scope

Build/design first:

- evidence identity
- main evidence content
- source/context
- student note
- classification
- Analysis highlight
- mark important
- use in final claim
- create question
- student-created evidence
- teacher/student metadata separation
- responsive behavior

---

# 43. V1.5 / Later

Potential later features:

- side-by-side evidence comparison
- advanced image annotation
- map annotations
- document highlighting
- 3D artifact viewing
- trial comparison
- evidence-network visualization
- automated evidence summaries
- teacher annotation playback

Do not block V1 on these.

---

# 44. Final Design Principle

Evidence Detail should make a single clue feel **important enough to inspect carefully**, but never disconnect it from the student's reasoning process.

The defining interaction is:

```text
Inspect the evidence
        ↓
Record what you notice
        ↓
Decide what it means
        ↓
Connect it to analysis/theory
```

The student should always understand:

> **This is not just something I opened. This is something I need to use.**
