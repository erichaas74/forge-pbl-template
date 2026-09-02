# UI_05_HYPOTHESIS_VIEW.md

# Working Theory / Hypothesis View Design Specification

## Purpose

The Working Theory view is where students turn analyzed evidence into a current explanation.

Depending on the project, the same underlying component may be labeled:

- Working Theory
- Hypothesis
- Possible Substance
- Diagnosis
- Suspect
- Cause
- Explanation
- Reconstruction
- Proposed Solution
- Recommendation

The goal is not simply to ask students to type an answer.

The interface should help students:

1. state what they currently think,
2. connect evidence to that idea,
3. see evidence that challenges it,
4. compare competing explanations,
5. identify uncertainty,
6. revise their thinking over time,
7. decide what to investigate next.

The Working Theory view should normally appear beside the **Analysis Corkboard** or the **Investigate panel**, not by itself.

---

# 1. Core Design Principle

The Working Theory should feel temporary and revisable.

Avoid visual language that suggests:

```text
FINAL ANSWER
```

until the final investigation stage.

Prefer:

```text
WORKING THEORY
```

```text
CURRENT EXPLANATION
```

```text
CURRENT DIAGNOSIS
```

```text
POSSIBLE PAST ENVIRONMENT
```

The interface should communicate:

> This is your best explanation right now, based on the evidence you have.

---

# 2. Primary Pairing — Analysis + Theory

The main Working Theory environment should appear beside the Analysis Corkboard.

Recommended layout:

```text
┌────────────────────────────────────┬───────────────────────────────────────┐
│ ANALYSIS CORKBOARD                 │ WORKING THEORY                        │
│                                    │                                       │
│ SUPPORTS                           │ CURRENT IDENTIFICATION                │
│ [Temp Result]                      │                                       │
│ [Color Change]                     │        SUBSTANCE B                    │
│                                    │                                       │
│ UNCERTAIN                          │ Confidence                            │
│ [Witness Statement]                │ ███████░░░ 72%                        │
│                                    │                                       │
│ CONTRADICTS                        │ WHY THIS FITS                         │
│ [Mass Result]                      │ [Student reasoning...]                │
│                                    │                                       │
│ Questions                          │ Strongest Support                     │
│ ? Why did Sample C not react?      │ Temperature Result                   │
│                                    │                                       │
│                                    │ Biggest Problem                      │
│                                    │ Mass Result                          │
│                                    │                                       │
│                                    │ [Revise Theory]                       │
└────────────────────────────────────┴───────────────────────────────────────┘
```

The Analysis side provides the evidence organization.

The Theory side requires synthesis.

---

# 3. Theory View Should Not Be a Blank Essay

Do not begin with:

```text
Explain your hypothesis:
[ giant blank text box ]
```

Instead scaffold reasoning with structured sections.

Recommended theory structure:

## Current Theory

What do you think?

## Confidence

How certain are you?

## Strongest Support

Which evidence matters most?

## Biggest Challenge

What evidence does not fit?

## Reasoning

Why does the evidence support this idea?

## Remaining Question

What do you still need to know?

The exact sections may vary by grade/project.

---

# 4. Basic Theory Card

Example:

```text
┌───────────────────────────────────────┐
│ WORKING THEORY                        │
│                                       │
│ Substance B                           │
│                                       │
│ Confidence                            │
│ 72%                                   │
│                                       │
│ Evidence                              │
│ ✓ Temperature Result                  │
│ ✓ Color Change                        │
│ ? Witness Statement                   │
│ ✕ Mass Result                         │
│                                       │
│ Updated 18 minutes ago                │
│                                       │
│ [Revise]                              │
└───────────────────────────────────────┘
```

Use simple visual status markers.

Do not rely on color alone.

---

# 5. Theory Labels Are Project Configuration

Same component, different project terminology.

## Mystery Substance

```text
CURRENT IDENTIFICATION
Possible Substance
```

## Fossil Detectives

```text
CURRENT RECONSTRUCTION
Possible Past Environment
```

## Medical Investigation

```text
CURRENT DIAGNOSIS
```

## Historical Case

```text
CURRENT EXPLANATION
```

## Engineering Failure

```text
MOST LIKELY CAUSE
```

Do not create separate components for each wording.

---

# 6. Theory Creation

When no theory exists yet, show a meaningful empty state.

Example:

```text
BUILD YOUR FIRST THEORY

You have collected 4 pieces of evidence.

What explanation best fits what you know so far?

[Create Working Theory]
```

If the project requires a minimum evidence count:

```text
NOT READY YET

Before creating a theory:
✓ Review the incident
○ Collect 3 pieces of evidence
```

Explain why the theory step is locked.

---

# 7. Predefined vs Student-Generated Theory

Support three modes.

## Student Generated

Student writes their own theory.

Example:

```text
What do you think happened?

[ text / structured response ]
```

## Predefined

Student selects from configured possibilities.

Example:

```text
Possible Substance A
Possible Substance B
Possible Substance C
```

## Mixed

Students may select a candidate and add/modify their own explanation.

The UI should adapt without changing the underlying theory architecture.

---

# 8. Multiple Competing Theories

Older or more open investigations may allow several active theories.

Example:

```text
POSSIBLE EXPLANATIONS

1. Substance B
   Confidence: 72%
   Supports: 3
   Contradicts: 1

2. Substance C
   Confidence: 48%
   Supports: 2
   Contradicts: 2

3. Substance A
   Confidence: 16%
   Supports: 1
   Contradicts: 4
```

Students may:

- select current leader
- rank
- compare
- eliminate
- reactivate if permitted
- attach evidence
- revise confidence

---

# 9. Compare Theories View

Optional comparison mode:

```text
┌──────────────────────────────┬──────────────────────────────┐
│ SUBSTANCE B                  │ SUBSTANCE C                  │
│                              │                              │
│ Confidence: 72%              │ Confidence: 48%              │
│                              │                              │
│ Supports                     │ Supports                     │
│ Temp Result                  │ Witness Statement            │
│ Color Change                 │ Sample Photo                 │
│                              │                              │
│ Contradicts                  │ Contradicts                  │
│ Mass Result                  │ Temp Result                  │
│                              │                              │
│ Unanswered                   │ Unanswered                   │
│ Why mass changed?            │ Why color changed?           │
└──────────────────────────────┴──────────────────────────────┘
```

This should help students compare evidence quality rather than just count cards.

V1 may use a simpler summary.

---

# 10. Evidence Counts Should Not Equal Truth

Do not imply:

```text
3 supporting cards > 2 supporting cards = correct theory
```

The UI may show counts as orientation, but also highlight:

- evidence strength
- contradictory evidence
- uncertainty
- missing information

The theory system should encourage quality of evidence, not simple voting.

---

# 11. Attach Evidence to Theory

Students should be able to connect evidence from Analysis to the Working Theory.

Possible action:

```text
Use this evidence in my theory
```

Then choose relationship:

```text
Supports
Weakens
Rules Out
Related
```

Project may limit relationship types.

The corresponding evidence should highlight on the Analysis Corkboard.

---

# 12. Cross-Panel Highlighting — Analysis + Theory

Selecting evidence on the Analysis side should highlight its role in the Theory panel.

Example:

```text
[ Mass Result ]  ───────────────→  Biggest Challenge
```

Selecting "Strongest Support" in Theory should highlight the associated evidence on Analysis.

Example:

```text
Strongest Support  ◄──────────────  [ Temperature Result ]
```

This two-way interaction is important.

---

# 13. Strongest Support

The theory view should encourage students to identify their strongest evidence.

Example:

```text
STRONGEST SUPPORT

Temperature Test Result

Why is this strong evidence?
[ short reasoning response ]
```

This is more useful than automatically treating every supporting card equally.

---

# 14. Biggest Challenge / Contradicting Evidence

Every strong theory view should make contradictory evidence visible.

Example:

```text
BIGGEST CHALLENGE

Mass Result

This evidence does not fully fit your current theory.

How do you explain it?
[ response ]
```

Do not hide contradictory evidence because the student has selected a theory.

---

# 15. Remaining Uncertainty

Provide a distinct area:

```text
WHAT ARE YOU STILL UNSURE ABOUT?

[ Why did Sample C not react? ]
```

or:

```text
WHAT WOULD MAKE YOU MORE CONFIDENT?

[ another test / more source evidence / better measurement ]
```

This directly feeds the Theory → Investigate workspace.

---

# 16. Theory → Investigate Link

A selected uncertainty/question should become a connection point to the Investigate panel.

Example:

```text
Theory Question:
"Which result would separate B from C?"

                        ↓

Investigate:
Solubility Test
May provide evidence about this difference.
```

This is the bridge from explanation to next action.

---

# 17. Confidence

Confidence should be visible but not overemphasized.

Supported display modes:

- Low / Medium / High
- 1–5
- percentage

Example:

```text
Confidence
72%
```

Prompt:

```text
How confident are you right now?
```

Optional follow-up:

```text
What would make you more confident?
```

Confidence should be expected to change over time.

---

# 18. Confidence History

Later view:

```text
CONFIDENCE OVER TIME

Initial theory       35%
After Temp Test      68%
After Mass Result    52%
Current              72%
```

This can make revision visible.

V1 may simply show current + previous value.

---

# 19. Theory Revision

Revision should be an explicit academic action.

Recommended flow:

```text
[Revise Theory]
```

Then:

```text
WHAT CHANGED?

Previous:
Substance A

Current:
Substance B

Why did your thinking change?
[ response ]

Evidence that changed your mind:
[ Temperature Result ]
[ Color Change ]
```

Then:

```text
[Save Revision]
```

Do not overwrite the previous theory.

---

# 20. Theory History

Students should be able to see earlier thinking.

Example:

```text
THEORY HISTORY

Version 1
Substance A
Confidence 40%

Version 2
Substance C
Confidence 55%

Version 3 — Current
Substance B
Confidence 72%
```

Clicking a version can show:

- theory statement
- confidence
- evidence used
- reason for change

---

# 21. Revision Should Be Normal, Not Failure

Avoid labels such as:

```text
WRONG ANSWER
TRY AGAIN
```

Prefer:

```text
NEW EVIDENCE CHALLENGES YOUR THEORY
```

```text
YOUR THEORY MAY NEED REVISION
```

```text
RECONSIDER YOUR EXPLANATION
```

The Investigation experience should normalize changing one's mind when evidence changes.

---

# 22. Required Revision

Some projects may require at least one revision.

If required:

```text
REVISION CHECKPOINT

Before moving on, revisit your theory using the new evidence.

[Review Evidence]
[Revise Theory]
```

This should feel instructional, not arbitrary.

---

# 23. Eliminating a Theory

If multiple theories are enabled:

```text
ELIMINATE SUBSTANCE A?

Why does the evidence rule it out?
[ response ]

Evidence:
[ Mass Result ]
[ Solubility Result ]

[Eliminate]
```

The theory remains in history rather than disappearing.

---

# 24. Re-Opening an Eliminated Theory

If allowed:

```text
RECONSIDER SUBSTANCE A

New evidence may change your earlier decision.

[Reactivate Theory]
```

Useful in more sophisticated investigations.

---

# 25. Theory Quality Prompts

The system may use optional prompts such as:

```text
Does your theory explain all of your strongest evidence?
```

```text
Which evidence is hardest for your theory to explain?
```

```text
What evidence would rule your theory out?
```

```text
What alternative explanation is still possible?
```

These prompts may later connect to external AI.

V1 should support configured prompt blocks without requiring AI.

---

# 26. Younger Student Theory View

For younger students, simplify.

Example:

```text
WHAT DO YOU THINK?

I think the past environment was:

[ Shallow Sea ]

WHY?

My best clue:
[ Shell Fossil ]

One clue that does not fit:
[ Leaf Fossil ]

How sure are you?

Low   Medium   High

[Save My Idea]
```

Use:

- fewer fields
- larger controls
- shorter prompts
- more explicit sequencing

---

# 27. Older Student Theory View

For older students, support:

- multiple theories
- evidence relationships
- counterevidence
- ranking
- confidence
- uncertainty
- competing explanations
- stronger written reasoning
- optional formal claim language

Same core component system.

---

# 28. Theory Detail Should Stay Connected to Analysis

When a theory is being edited, the Analysis Corkboard remains visible.

The student should be able to:

- select supporting evidence
- select challenging evidence
- drag/attach evidence
- inspect evidence detail
- revise reasoning

Do not force them to memorize the entire evidence board before writing.

---

# 29. Theory and Evidence Detail

When the student opens an evidence detail from Analysis + Theory:

- evidence expands in context
- Theory remains visible where possible
- selected relationship highlights

Example:

```text
EVIDENCE DETAIL | WORKING THEORY
```

or temporary overlay inside Analysis side.

---

# 30. Theory Status

Possible student-facing status:

- Not Started
- Working Theory
- Revised
- Needs Review
- Ready for More Investigation
- Ready for Final Case

Avoid using "Correct" as the normal status.

---

# 31. Teacher-Required Revision

If teacher returns theory:

```text
REVIEW REQUESTED

Your teacher wants you to reconsider:

"How does the Mass Result fit your explanation?"

[Open Analyze → Theory]
```

Do not expose teacher grading controls inside the student Theory view.

---

# 32. Theory Locking

Some projects may prevent theory creation until evidence threshold is met.

Example:

```text
BUILD A THEORY

Locked

Before you begin:
✓ Review the incident
✓ Collect 2 evidence items
○ Complete Fossil Station 1
```

Explain the gate.

---

# 33. Theory Submission vs Final Submission

A Working Theory is not necessarily the final answer.

Keep distinction clear:

```text
Save Working Theory
```

versus:

```text
Submit Final Investigation
```

Students should feel safe revising the Working Theory.

---

# 34. Theory Draft Saving

Theory writing should:

- save locally while typing
- debounce persistence
- clearly show Saved / Saving / Pending Sync
- preserve draft when switching workspace pairs

Do not save every keystroke.

---

# 35. Theory Collaboration

For team projects, support configurable modes.

## Shared Team Theory

All teammates see/edit the same theory.

## Individual Theory

Each student creates private reasoning.

## Mixed

Team shares a theory but each student completes an individual reasoning checkpoint.

The Shell/Team indicator should make the mode clear.

---

# 36. Concurrent Team Editing

If shared:

- show who is editing
- avoid silent overwrites
- use runtime version/conflict handling
- allow low-risk text collaboration carefully

V1 may use one active editor or simple save locking rather than full Google Docs-style collaboration.

Do not overbuild live co-editing in V1.

---

# 37. Theory Citations

Evidence used in theory should appear as clickable references.

Example:

```text
Our theory is supported by the Temperature Test [1]
and Color Change observation [2].
```

Clicking `[1]` highlights or opens the corresponding evidence.

For younger students, use evidence chips instead of formal numeric citations.

---

# 38. Theory Evidence Chips

Example:

```text
EVIDENCE USED

[ Temperature Result ]
[ Color Change ]
[ Witness Statement ? ]
```

Icons/status can indicate:

- supports
- contradicts
- uncertain

These should remain linked to original evidence IDs.

---

# 39. Counterevidence

Counterevidence should have a dedicated area where appropriate.

Example:

```text
EVIDENCE THAT CHALLENGES MY THEORY

[ Mass Result ]

How do you account for this?
[ response ]
```

This prepares students for the final investigation.

---

# 40. Alternative Explanation

For older students:

```text
STRONGEST ALTERNATIVE

Substance C

Why is it still possible?
[ response ]

What evidence would distinguish it from your theory?
[ response ]
```

This should naturally connect to Investigate.

---

# 41. Theory Readiness

A theory may display a readiness summary.

Example:

```text
THEORY CHECK

✓ Current explanation selected
✓ 2 supporting evidence items
✓ 1 contradictory item considered
○ Remaining question identified
```

This does not mean the theory is "correct."

It means the reasoning package is sufficiently developed for the next step.

---

# 42. Final Investigation Transition

When the Working Theory meets final-readiness rules:

```text
YOUR THEORY IS READY FOR A FINAL CASE

You can still revise before submitting.

[Continue Investigating]
[Build Final Case]
```

Do not force final submission immediately.

---

# 43. Theme Treatment

Theory is part of the hybrid themed workspace.

Theme may change:

- panel surface
- labels
- subtle iconography
- candidate-card appearance
- confidence visual treatment

Examples:

### Mystery Substance
Digital analysis dossier

### Fossil Detectives
Field reconstruction board

### Historical Case
Interpretation dossier

### Medical
Diagnostic summary

The functional structure remains consistent.

---

# 44. Graphics Needed — Shared

Reusable UI assets:

- theory/hypothesis icon
- confidence indicator
- support marker
- contradiction marker
- uncertainty marker
- revision/history icon
- rank indicator
- eliminate/reactivate control
- evidence-link marker

---

# 45. Graphics Needed — Project Specific

Possible:

- candidate substance images
- organism/environment thumbnails
- suspect portraits
- medical condition icons
- reconstruction thumbnails

These belong in project assets.

---

# 46. Mobile / Narrow Layout

On narrow screens, Analysis and Theory may toggle rather than sit side by side.

Preserve:

- selected evidence
- attached relationships
- current draft
- confidence
- theory state

Example:

```text
ANALYZE → THEORY

[ Analysis ] [ Theory ]
```

Switching views must not lose context.

---

# 47. Tablet

Landscape may preserve the full two-panel layout.

Portrait may use a toggle.

---

# 48. Accessibility

Required:

- keyboard theory selection/ranking
- accessible confidence control
- evidence links with readable labels
- no color-only support/contradiction status
- accessible revision history
- clear form labels
- screen-reader-friendly status changes
- touch-friendly controls

---

# 49. Animation

Appropriate:

- theory revision transition
- evidence highlight connection
- rank change
- confidence change
- history opening

Avoid:

- dramatic "wrong theory" animations
- red flashing
- excessive scoring effects
- motion that implies failure

---

# 50. V1 Scope

Design/build first:

- current theory
- student-generated/predefined/mixed modes
- confidence
- evidence attachments
- strongest support
- contradictory evidence
- reasoning
- remaining question
- revision
- revision history
- cross-panel highlighting
- simple multiple-theory list
- theory readiness
- younger/older display configuration
- team/private mode awareness

---

# 51. V1.5 / Later

Potential later features:

- advanced theory comparison matrix
- confidence-over-time chart
- relationship network visualization
- richer ranking tools
- collaborative simultaneous editing
- AI Socratic reasoning prompts
- automated contradiction surfacing
- theory quality analytics
- teacher reasoning playback

Do not block V1 on these.

---

# 52. Final Design Principle

The Working Theory view should make it normal for students to say:

> **This is what I think right now, and this is why.**

Then, when new evidence appears:

> **My explanation needs to change.**

The defining reasoning loop is:

```text
ANALYZED EVIDENCE
        ↓
WORKING THEORY
        ↓
UNCERTAINTY
        ↓
NEXT INVESTIGATION
        ↓
NEW EVIDENCE
        ↓
REVISED THEORY
```

The UI should make revision feel like successful investigation, not like getting an answer wrong.
