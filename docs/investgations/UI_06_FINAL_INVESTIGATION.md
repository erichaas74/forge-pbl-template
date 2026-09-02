# UI_06_FINAL_INVESTIGATION.md

# Final Investigation Design Specification

## Purpose

The Final Investigation is where students turn their evolving Case Board, analyzed evidence, and Working Theory into a complete evidence-based conclusion.

It should not feel like:

```text
Now leave the investigation and write an essay.
```

It should feel like:

```text
You have investigated the case.
Now build and defend your final case using the work you already created.
```

The Final Investigation should reuse the student's existing:

- evidence
- classifications
- theory
- revisions
- questions
- data
- observations
- activity results
- confidence
- counterevidence

Students should not need to recreate or re-upload work that already exists in the Investigation Workspace.

---

# 1. Core Design Principle

The Final Investigation should be a **structured evidence-based case builder**, not primarily a blank document upload.

The canonical final product should contain configurable sections such as:

- Claim / Identification / Diagnosis / Reconstruction
- Selected Evidence
- Reasoning
- Counterevidence
- Alternative Explanation
- Confidence
- Uncertainty
- Recommendation
- Next Test
- Safety Recommendation
- Action Plan
- Reflection
- Individual Contribution
- Visual / Model
- Attachments

Projects select only the sections they need.

---

# 2. Transition Into Final Investigation

When the final requirements are satisfied, the Investigation Shell may show:

```text
FINAL INVESTIGATION READY

You have enough evidence to build your final case.

[ Continue Investigating ]
[ Build Final Case ]
```

Students should not be forced to submit immediately.

If revisiting is allowed, they may continue investigating before finalizing.

---

# 3. Final Readiness Screen

Before opening the final case builder, show a concise readiness summary.

Example:

```text
FINAL CASE READINESS

✓ Required evidence collected
✓ Working theory created
✓ Theory revised
✓ Required tests complete
✓ Counterevidence identified
○ Individual reflection not started

You are ready to begin your final case.

[ Build Final Case ]
```

This is a readiness check, not a grade.

---

# 4. Main Final Investigation Layout

Recommended desktop layout:

```text
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ YOUR INVESTIGATION                   │ FINAL CASE                           │
│                                      │                                      │
│ Current Theory                       │ FINAL IDENTIFICATION                 │
│ Substance B                          │ [ Substance B ]                      │
│                                      │                                      │
│ Evidence Collected                   │ EVIDENCE USED                        │
│ 8                                    │ [Temp Result] [Color Change]         │
│                                      │                                      │
│ Strongest Support                    │ REASONING                            │
│ Temperature Result                   │ [Student response...]                │
│                                      │                                      │
│ Biggest Challenge                    │ COUNTEREVIDENCE                      │
│ Mass Result                          │ [Mass Result]                        │
│                                      │                                      │
│ Confidence                           │ CONFIDENCE                           │
│ 72%                                  │ [ 80% ]                              │
│                                      │                                      │
│ [Review Case Board]                  │ [Save Draft]                         │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

The left side provides Investigation context.

The right side is the structured final case.

---

# 5. Preserve the Two-Panel Reasoning Model

The Final Investigation should continue the visual logic established earlier.

Recommended pairing:

```text
Investigation Record | Final Case
```

The student sees:

```text
what I discovered and thought
        ↓
what I am formally claiming
```

Do not disconnect the final product from the evidence trail.

---

# 6. Investigation Record Panel

The left/reference panel may include:

- current Working Theory
- theory history
- strongest supporting evidence
- strongest contradictory evidence
- evidence count
- current confidence
- unanswered questions
- key data
- final activity results

It should not display every piece of information simultaneously.

Use collapsible/reference groups.

---

# 7. Evidence Picker

Students should select evidence already collected.

Example:

```text
SELECT EVIDENCE FOR YOUR FINAL CASE

☑ Temperature Test Result
☑ Color Change Observation
☐ Witness Statement
☑ Mass Result
☐ Sample Photo

Selected: 3 of minimum 3
```

Selected evidence remains linked by evidence ID.

Do not duplicate evidence content into a new upload.

---

# 8. Evidence Picker With Categories

Students may filter:

```text
All
Supports
Contradicts
Uncertain
Important
Student-Created
```

This helps students make intentional evidence choices.

Do not automatically choose all supporting evidence for them.

---

# 9. Evidence Preview While Writing

Selecting a final evidence chip/card should open a compact preview.

Example:

```text
Temperature Test Result

21°C → 37°C

Your Analysis:
Supports Current Theory

Your Note:
"The sample released energy."
```

The student can close the preview and continue writing without losing their draft.

---

# 10. Final Claim Section

The first section should use project-specific terminology.

Examples:

## Mystery Substance

```text
FINAL IDENTIFICATION
```

## Fossil Detectives

```text
FINAL LANDSCAPE RECONSTRUCTION
```

## Medical Investigation

```text
FINAL DIAGNOSIS
```

## Historical Investigation

```text
FINAL EXPLANATION
```

## Engineering Failure

```text
MOST LIKELY CAUSE
```

Same underlying final-section capability.

---

# 11. Exact Solution Mode

For an exact-solution investigation:

```text
FINAL IDENTIFICATION

[ Substance B ]
```

The student should still be required to support the answer with evidence/reasoning.

Do not reduce the final experience to:

```text
Correct / Incorrect
```

The quality of reasoning remains educationally important.

---

# 12. Multiple Defensible Solutions

For projects such as Fossil Detectives:

```text
FINAL RECONSTRUCTION

[ Shallow Coastal Environment ]
```

The system should evaluate:

- evidence use
- scientific/historical reasoning
- counterevidence
- coherence
- uncertainty

Do not require one hidden exact solution when the project allows multiple defensible conclusions.

---

# 13. Ranked Solution Mode

For projects where several solutions work but one may be stronger:

```text
RECOMMENDED SOLUTION

1. Plan B
2. Plan A
3. Plan C

Why is Plan B strongest?
[ reasoning ]
```

The student should explain ranking criteria.

---

# 14. Open Evidence-Based Mode

For an open investigation:

```text
YOUR FINAL CLAIM

[ student-generated claim ]

What evidence supports it?
...

What uncertainty remains?
...
```

No exact-answer comparison is required.

---

# 15. Reasoning Section

Avoid a completely blank essay whenever possible.

Use structured prompts.

Example:

```text
WHY DOES THIS EVIDENCE SUPPORT YOUR IDENTIFICATION?

Evidence 1:
Temperature Test Result

This matters because:
[ response ]

Evidence 2:
Color Change

This matters because:
[ response ]
```

Then optionally:

```text
Put the evidence together.

[ synthesis response ]
```

This is especially helpful for grades 4–8.

---

# 16. Evidence → Reasoning Connections

When a student selects an evidence item in the final case:

- corresponding reasoning section highlights
- evidence preview becomes available
- original Analysis classification can be shown

Example:

```text
Temperature Result ───────────► Reasoning Paragraph 1
```

The visual relationship should reinforce citation and reasoning.

---

# 17. Counterevidence Section

A strong final Investigation should support:

```text
EVIDENCE THAT CHALLENGES MY CLAIM
```

Example:

```text
Mass Result

Why does this evidence challenge your explanation?
[ response ]

Why do you still think your conclusion is strongest?
[ response ]
```

This should be required only when appropriate.

---

# 18. Alternative Explanation

For older/open investigations:

```text
STRONGEST ALTERNATIVE

Substance C

Why was this explanation possible?
[ response ]

What evidence made you choose your final explanation instead?
[ response ]
```

This builds directly from the earlier multiple-theory work.

---

# 19. Eliminated Hypotheses

Optional:

```text
WHAT DID YOU RULE OUT?

Substance A
Ruled out because:
[ Solubility Result ]

Substance C
Ruled out because:
[ Temperature Result ]
```

Use hypothesis history rather than asking students to recreate earlier thinking.

---

# 20. Confidence

Show:

```text
FINAL CONFIDENCE
80%
```

Optional comparison:

```text
Initial Confidence: 40%
Final Confidence: 80%
```

Prompt:

```text
Why did your confidence change?
```

This makes the reasoning journey visible.

---

# 21. Uncertainty

Students should be allowed to acknowledge uncertainty.

Example:

```text
WHAT ARE YOU STILL NOT CERTAIN ABOUT?

[ response ]
```

or:

```text
What evidence would make your conclusion stronger?
```

A scientifically responsible final answer does not need to pretend that all uncertainty disappeared.

---

# 22. Next Test

Optional section:

```text
IF YOU COULD RUN ONE MORE INVESTIGATION...

What would you test?

Why?

What result would help you?
```

This is particularly valuable in open-ended investigations.

---

# 23. Recommendation

Some investigations end with an action rather than only an explanation.

Example:

```text
RECOMMENDATION

What should the lab do next?

[ response ]

Evidence supporting this recommendation:
[Select Evidence]
```

---

# 24. Safety Recommendation

For science/engineering investigations:

```text
SAFETY RECOMMENDATION

What should be done with the substance?

[ response ]

Why?
[ evidence/reasoning ]
```

This can connect content to authentic decision-making.

---

# 25. Visual / Model Section

Some final products require a visual.

Examples:

- fossil landscape reconstruction
- particle model
- map
- annotated image
- engineering plan
- timeline
- graph
- model screenshot

The student may:

- select an existing project visual
- create/upload a new one
- use a shared model-builder result

Do not require upload if a project tool already generated the visual.

---

# 26. Attachments

Projects may optionally allow:

- presentation
- PDF
- image
- video
- model file/reference

Attachments supplement the structured Investigation record.

They should not replace the structured evidence/reasoning package unless explicitly configured.

---

# 27. Final Product Formats

Supported project outputs may include:

- guided case file
- Investigation Report
- lab report
- presentation
- poster
- video
- oral defense
- recommendation brief
- digital evidence board
- mixed package

The structured final-case data should remain available underneath these presentation formats.

---

# 28. Team + Individual Final Submission

For mixed team projects, divide clearly.

Example:

```text
TEAM FINAL CASE

✓ Final identification
✓ Shared evidence
✓ Shared data
✓ Team recommendation
```

Then:

```text
YOUR INDIVIDUAL SECTION

○ Explain the strongest evidence
○ Reflect on your contribution
○ State your confidence
```

Do not let one teammate's work replace all individual accountability.

---

# 29. Team Submission Roles

If roles matter:

```text
FINAL CASE CONTRIBUTORS

Maya — Evidence Lead
Jordan — Data Lead
Eric — Explanation Lead
```

Students may confirm their contribution.

Do not turn this into a complicated project-management system inside the final page.

---

# 30. Draft Saving

The final case should:

- save locally while typing
- debounce persistence
- preserve work when opening evidence
- preserve work when returning to Case Board
- show Saved / Saving / Pending Sync
- not save every keystroke

---

# 31. Revisit Investigation

Students should be able to:

```text
[Review Case Board]
```

or:

```text
[Continue Investigating]
```

when the project permits it.

Returning should preserve the final draft.

New evidence may then be added to the final case.

---

# 32. Final Readiness Changes After Revisit

If students collect new evidence after starting the final:

```text
NEW EVIDENCE AVAILABLE

Your final case may need an update.

[Review New Evidence]
```

Do not silently submit outdated reasoning.

---

# 33. Final Validation Before Submit

Before authoritative submission:

```text
FINAL CHECK

✓ Final claim complete
✓ 3 evidence items selected
✓ Reasoning complete
✓ Counterevidence addressed
✓ Confidence entered
○ Individual reflection incomplete
```

Missing required sections should be easy to locate.

---

# 34. Submit Confirmation

For final submission:

```text
SUBMIT FINAL INVESTIGATION?

You can no longer change the official submission unless your teacher returns it for revision.

[Keep Editing]
[Submit Final Investigation]
```

Submission must be server-authoritative in production.

---

# 35. Submission Success

After confirmation:

```text
FINAL INVESTIGATION SUBMITTED

Your case has been recorded.

[Review Submission]
```

Do not immediately reveal the official answer unless the project reveal settings say to.

---

# 36. Reveal Modes

Support:

- after individual submission
- after team submission
- after defense
- teacher controlled
- scheduled
- no formal reveal

The UI should clearly reflect the project mode.

---

# 37. Exact-Solution Reveal

Example:

```text
CASE REVEAL

The mystery substance was:
SUBSTANCE B

Your Identification:
SUBSTANCE B
```

Then focus on reasoning:

```text
Compare your evidence path with the case evidence.
```

Avoid reducing the entire project to a green checkmark.

---

# 38. Incorrect Exact Identification

If student's exact answer differs:

Avoid:

```text
WRONG!
```

Prefer:

```text
CASE REVEAL

Official Identification:
Substance B

Your Identification:
Substance C

Review the evidence that most strongly distinguishes B from C.
```

The teacher may require revision depending on grading settings.

---

# 39. Multiple-Defensible Reveal

Do not display a fake correct answer.

Example:

```text
INVESTIGATION COMPLETE

Your Reconstruction:
Shallow Coastal Environment

Your evidence-based case is ready for teacher review.
```

Teacher/rubric evaluation handles quality.

---

# 40. Teacher-Controlled Reveal

After submission:

```text
FINAL CASE SUBMITTED

The official case reveal will be released by your teacher.
```

No answer-key data should be exposed to the student client unnecessarily.

---

# 41. Defense Integration

If a defense is required:

```text
FINAL CASE COMPLETE

NEXT:
Defend Your Conclusion

[Prepare for Defense]
```

Defense may be:

- teacher
- peer
- written
- future external AI

The Final Investigation should package evidence/reasoning so the defense tool can reference it.

---

# 42. Revision After Teacher Review

If returned:

```text
REVISION REQUESTED

Teacher Question:
"How does the Mass Result fit your conclusion?"

[Open Final Case]
[Review Evidence]
```

The existing submission should remain available as prior history.

Do not overwrite the only copy.

---

# 43. Final Submission History

If revision cycles are allowed:

```text
SUBMISSION HISTORY

Version 1
Submitted Sept. 18
Returned for revision

Version 2
Current Draft
```

This supports mastery-oriented revision.

---

# 44. Teacher Feedback Placement

Teacher comments should appear near the relevant final section when possible.

Example:

```text
REASONING

Teacher Comment:
"Explain why the temperature change is stronger evidence than the color change."
```

Do not force students to hunt through a separate feedback page.

---

# 45. Rubric Access

The final page may include:

```text
[View Rubric]
```

as a drawer/overlay.

Do not permanently display the full rubric beside the writing workspace.

Keep focus on building the case.

---

# 46. Final Progress Indicator

A compact indicator can show:

```text
FINAL CASE
4 of 6 required sections complete
```

Do not turn it into a numerical grade.

---

# 47. Younger Student Final View

For younger students, use clear chunks.

Example:

```text
1. WHAT DO YOU THINK?

I think the past environment was:
[ Shallow Sea ]

2. SHOW YOUR BEST CLUES

[ Shell Fossil ]
[ Rock Layer ]

3. WHY DO THESE CLUES MATTER?

[ short response ]

4. ONE CLUE THAT DID NOT FIT

[ Leaf Fossil ]

5. HOW SURE ARE YOU?

Low   Medium   High
```

Avoid requiring a long blank essay.

---

# 48. Older Student Final View

For older students, support:

- formal claim
- multiple evidence citations
- counterevidence
- alternative explanation
- uncertainty
- stronger reasoning
- source credibility
- recommendation
- defense preparation

Same underlying final-section system.

---

# 49. Final Investigation Theme

The hybrid theme may style the final case.

Examples:

### Mystery Substance
Laboratory case report / incident dossier

### Fossil Detectives
Field reconstruction report

### Historical Case
Evidence brief / archive case file

### Medical Investigation
Diagnostic case summary

The structural controls remain consistent.

---

# 50. Shared Graphics Needed

Reusable final UI assets:

- evidence selected marker
- final claim icon
- confidence icon
- counterevidence marker
- uncertainty icon
- revision indicator
- submitted state
- teacher feedback marker
- attachment icon
- final-ready status

---

# 51. Project-Specific Graphics

May include:

- final report cover art
- reconstruction images
- selected specimen visuals
- maps
- charts
- simulation screenshots
- diagrams
- project-specific report branding

These should remain secondary to readable reasoning.

---

# 52. Mobile / Narrow Layout

On narrow screens:

- reference panel becomes a drawer/toggle
- final form is primary
- evidence picker uses compact cards
- drafts remain preserved
- evidence preview can temporarily overlay
- required-section navigation remains accessible

Do not squeeze full reference + final form into tiny columns.

---

# 53. Tablet

Landscape may preserve two panels.

Portrait may use:

```text
[ Investigation Record ] [ Final Case ]
```

with state preserved across switching.

---

# 54. Chromebook / Laptop

Primary target.

The student should be able to write while keeping evidence/reference context visible.

Avoid making students constantly open/close separate browser-like pages.

---

# 55. Accessibility

Required:

- semantic form labels
- keyboard evidence selection
- accessible evidence chips
- clear required-field indicators
- no color-only status
- readable teacher feedback
- accessible confidence control
- screen-reader submission status
- touch-friendly controls
- logical section navigation
- reduced motion

---

# 56. Offline / Connection Interruption

Drafting may continue locally when practical.

Example:

```text
Connection interrupted.

Your final draft is saved on this device.
```

But final authoritative submission should require confirmed connectivity.

Example:

```text
Connection required to submit the official final investigation.
```

---

# 57. Privacy / Teacher-Only Data

The final student screen must not receive:

- exact hidden answer metadata
- teacher evidence ratings
- hidden decoy labels
- rubric answer keys

unless intentionally authorized.

Reveal data should be delivered according to reveal rules.

---

# 58. Animation

Use restrained transitions.

Appropriate:

- evidence added to final set
- final section completed
- final-ready state
- submission confirmation
- reveal opening

Avoid:

- large confetti
- flashing correctness
- dramatic failure effects
- animations that distract from reflection

---

# 59. What Does Not Belong Here

Avoid turning Final Investigation into:

- gradebook page
- giant rubric page
- complete project timeline
- full resource library
- lesson page
- activity launcher
- teacher dashboard

The final view exists to build, submit, and review the student's final evidence-based case.

---

# 60. V1 Scope

Design/build first:

- final readiness screen
- Investigation Record + Final Case two-panel layout
- configurable final sections
- final claim
- Evidence Picker
- evidence preview
- structured reasoning
- counterevidence
- confidence
- uncertainty
- recommendation
- team + individual sections
- save draft
- final validation
- submit confirmation
- reveal modes
- teacher-returned revision state
- younger/older configurations
- responsive behavior

---

# 61. V1.5 / Later

Potential later features:

- oral defense workspace
- AI defense integration
- rich presentation builder
- automated visual case summary
- evidence citation formatter
- advanced rubric-side feedback
- peer defense
- portfolio export
- public showcase mode
- final project presentation recording

Do not block V1 on these.

---

# 62. Final Design Principle

The Final Investigation should answer:

```text
What is your conclusion?

What evidence supports it?

What evidence challenges it?

Why is your explanation stronger?

How certain are you?

What remains unknown?

What should happen next?
```

The final design should make the student's investigative journey visible.

The defining rule is:

> **Do not ask students to start over at the end. Build the final case from the evidence, analysis, and theory they already created.**
