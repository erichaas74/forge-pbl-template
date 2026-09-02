# UI_01_INVESTIGATION_SHELL.md

# Investigation Shell Design Specification

## Purpose

The Investigation Shell is the persistent frame around every Investigation project.

Its job is to keep students oriented while leaving the majority of screen space available for the active two-panel Investigation Workspace.

The Shell should answer four questions at all times:

1. **What am I trying to solve?**
2. **Where am I in the investigation?**
3. **What kind of thinking am I doing right now?**
4. **Is there anything important I need to notice or do next?**

The Shell should be visually consistent across projects while allowing the project-specific workspace inside it to feel immersive.

---

# 1. Hybrid Design Principle

Use a **hybrid visual system**.

## Consistent Digital Outer Shell

The following remain visually and behaviorally consistent across projects:

- mission strip
- phase navigator
- workspace-pair selector
- next-action/status strip
- utility controls
- save/sync status
- team indicator
- global Investigation status patterns
- accessibility behavior

Students should learn these controls once and recognize them in every project.

---

## Project-Themed Inner Workspace

The two active Investigation panels carry most of the project-specific visual identity.

Examples:

### Mystery Substance
- digital laboratory panels
- specimen/sample tags
- instrument graphics
- hazard/research styling

### Fossil Detectives
- field notebook surfaces
- specimen cards
- excavation-map textures
- rock/fossil imagery

### Historical Case
- archive folders
- source documents
- dossier styling
- map/source analysis visuals

### Medical Investigation
- clinical diagnostic panels
- patient charts
- test results
- hospital/research visuals

The project theme may strongly change the appearance inside the workspace while the outer Shell remains familiar.

---

# 2. Recommended Visual Balance

Target approximately:

```text
80% consistent structure
20% project-specific shell skinning
```

This does not mean only 20% of the screen is themed.

The two inner work panels may be highly themed.

It means navigation and functional structure should remain mostly consistent.

---

# 3. Shell Layout

Recommended desktop/laptop structure:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ MISSION / PROJECT STRIP                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ INVESTIGATION PHASE TRACK                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ WORKSPACE PAIR SELECTOR                                                      │
├───────────────────────────────────────┬──────────────────────────────────────┤
│                                       │                                      │
│ PROJECT-THEMED LEFT PANEL             │ PROJECT-THEMED RIGHT PANEL           │
│                                       │                                      │
│                                       │                                      │
│                                       │                                      │
│                                       │                                      │
├───────────────────────────────────────┴──────────────────────────────────────┤
│ NEXT ACTION / STATUS / UTILITIES                                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

The Shell should consume as little vertical space as practical.

The Investigation Workspace is the visual priority.

---

# 4. Example Full Shell

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ MYSTERY SUBSTANCE OUTBREAK                            TEAM: RAVENS           │
│ What substance caused the reaction?        Evidence 6/10   Lab Credits ●●● │
├──────────────────────────────────────────────────────────────────────────────┤
│ ✓ INCIDENT ─── ✓ EVIDENCE ─── ● TESTING ─── ○ THEORY ─── 🔒 FINAL        │
├──────────────────────────────────────────────────────────────────────────────┤
│ [ EVIDENCE → ANALYZE ]  [ ANALYZE → THEORY ]  [ THEORY → INVESTIGATE ]     │
├───────────────────────────────────────┬──────────────────────────────────────┤
│                                       │                                      │
│ PROJECT-THEMED LEFT PANEL             │ PROJECT-THEMED RIGHT PANEL           │
│                                       │                                      │
│                                       │                                      │
│                                       │                                      │
├───────────────────────────────────────┴──────────────────────────────────────┤
│ NEXT: Examine the new Temperature Result       Notebook  Resources  Help     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

# 5. Mission / Project Strip

The Mission Strip is the highest-level orientation layer.

It should contain only essential context.

Recommended content:

- project title
- short mission question
- team name when relevant
- evidence count when relevant
- limited resource count when relevant
- current phase summary
- project-specific status when genuinely useful

Example:

```text
MYSTERY SUBSTANCE OUTBREAK

What substance caused the reaction?

Team: Ravens

Evidence 6/10
Lab Credits: 3
Phase 3/5
```

---

# 6. Mission Strip Must Stay Compact

Avoid oversized hero headers inside the active investigation.

Do not place:

- giant project artwork
- large decorative title blocks
- long mission narrative
- full story introduction
- large teacher directions

inside the persistent working Shell.

Large immersive artwork belongs on:

- Project Hub
- mission launch
- phase introduction
- optional story/event moments

Once students are working, the Shell should collapse into a compact mission interface.

---

# 7. Expandable Mission Brief

Students should be able to reopen the full mission without leaving their current Investigation state.

Example:

```text
MISSION
What substance caused the reaction?

[ View Mission Brief ]
```

Mission Brief may include:

- student role
- situation
- stakes
- main goal
- final mission
- important rules
- project-specific story content

Closing the Mission Brief should return the student to exactly the same workspace state and selection.

---

# 8. Phase Navigator

The Phase Navigator shows **where the student is in the overall investigation**.

Example:

```text
✓ INCIDENT ─── ✓ INITIAL EVIDENCE ─── ● TESTING ─── ○ THEORY ─── 🔒 FINAL
```

Recommended statuses:

- `✓` Complete
- `●` Current
- `○` Available
- `🔒` Locked
- `↻` Needs Revision

Students may revisit completed/available phases when project configuration allows it.

---

# 9. Phase Is Not the Same as Workspace Mode

This distinction must remain explicit.

## Phase

Represents **where the student is in the overall project sequence**.

Example:

```text
Phase:
Test the Samples
```

## Workspace Pair

Represents **what kind of thinking the student is doing right now**.

Example:

```text
Workspace:
Theory → Investigate
```

A single phase may involve several passes through the Investigation Workspace cycle.

Do not equate:

```text
Phase 1 = Evidence
Phase 2 = Analysis
Phase 3 = Theory
```

unless a specific project explicitly configures that structure.

---

# 10. Workspace Pair Selector

The workspace selector is a major Shell control.

Primary options:

```text
[ Evidence → Analyze ]
[ Analyze → Theory ]
[ Theory → Investigate ]
```

These should feel like connected reasoning stages rather than generic tabs.

The active pair should be visually dominant.

---

# 11. Younger Student Labels

For grades such as 4th–5th, display labels may be more explicit.

Example:

```text
[ What Do the Clues Mean? ]
[ What Do You Think? ]
[ What Should You Do Next? ]
```

The underlying workspace mode remains the same.

Do not create separate younger-student Shell architecture.

---

# 12. Older Student Labels

For older/more independent students:

```text
EVIDENCE → ANALYZE
ANALYZE → THEORY
THEORY → INVESTIGATE
```

Less explanatory text may be shown.

---

# 13. Workspace Switching

Switching workspace pairs should:

- preserve runtime state
- preserve evidence classification
- preserve theory
- preserve selected questions
- preserve project phase
- preserve unsaved drafts where appropriate
- update the visible panels only

Do not reload the entire project.

---

# 14. Guided Workspace Transitions

At meaningful moments, the Shell may briefly explain why the student is moving.

Examples:

```text
You collected new evidence.

Now decide what it means.
```

Then open:

```text
Evidence → Analyze
```

Another:

```text
Your evidence is organized.

Now compare it with your explanation.
```

Then open:

```text
Analyze → Theory
```

These transitions should be used sparingly.

They are most useful:

- the first time a mode is introduced
- for younger students
- when a major phase changes
- after significant new evidence
- after a teacher-triggered case event

---

# 15. Activity Launch Behavior

The Shell needs a consistent pattern for opening Investigation activities.

There are two activity launch modes.

---

## Small / Embedded Activity

A smaller activity may replace the Investigate panel temporarily.

Example:

Before:

```text
Theory | Investigate
```

During:

```text
Theory | Active Test
```

The Shell remains fully visible.

This is preferred when the activity can function in roughly half the workspace.

---

## Large Activity Workspace

A large simulation may temporarily occupy most of the content area.

Recommended structure:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ ← Return to Investigation        Temperature Test                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    LARGE ACTIVITY WORKSPACE                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

The Shell should preserve a compact amount of mission/phase context so students understand they are still inside the same project.

---

# 16. Return From Activity

Returning from an activity should be purposeful.

Do not simply return to the previous generic page.

If the activity produced evidence:

```text
TEST COMPLETE

New evidence collected:
Temperature Result

[ Return to Evidence → Analyze ]
```

The Shell should return the student to the place where the new result becomes meaningful.

Recommended default after new evidence:

```text
Evidence + Analysis
```

with the new evidence selected/highlighted.

---

# 17. Contextual Investigation Alerts

Avoid relying primarily on a generic LMS notification bell.

The Shell should surface small contextual Investigation alerts.

Examples:

```text
NEW EVIDENCE
Temperature Test Result
```

```text
NEW QUESTION AVAILABLE
Ask Dr. Chen about Sample C
```

```text
PHASE UNLOCKED
Build Your Explanation
```

```text
TEACHER RELEASED NEW EVIDENCE
Security Log
```

Clicking the alert should move the student directly to the relevant workspace pair/content.

---

# 18. Teacher-Triggered Case Update

Major teacher-controlled events may temporarily use a stronger Shell message.

Example:

```text
⚠ CASE UPDATE

A second sample has been discovered.

New evidence is available.

[ Examine New Evidence ]
```

This can make live Investigation projects feel dynamic without creating a separate notification system.

---

# 19. Next Action Strip

The bottom Shell strip may show one contextual "next" cue.

Examples:

```text
NEXT: Examine the new Temperature Result
```

```text
NEXT: Revise your current explanation
```

```text
NEXT: Choose another investigation
```

For an open investigation:

```text
NEXT DECISION: Yours
```

The level of guidance should be configurable.

---

# 20. Next Action Philosophy

The Shell should help with navigation without solving the investigation.

Good:

```text
Next: Review the new evidence
```

Good:

```text
Next: Decide what evidence you still need
```

Avoid:

```text
Next: Run the Solubility Test because it proves Substance B
```

unless a highly guided younger-student project explicitly requires that instruction.

---

# 21. Progress Without Grade Emphasis

The Investigation Shell should communicate progress toward solving the mission.

Possible indicators:

- evidence collected
- required activities complete
- current phase
- resource availability
- final readiness

Example:

```text
Evidence 6/10
Required Tests 3/5
Phase 3/5
```

Do not make current numeric course grade the center of the Investigation Shell.

Grades/mastery belong in dedicated LMS areas.

---

# 22. Limited Resource Display

When a project uses limited resources, important resources may remain visible in the Shell.

Examples:

```text
LAB CREDITS
● ● ● ○ ○
3 remaining
```

```text
INTERVIEWS
2 remaining
```

```text
TIME UNITS
12 remaining
```

If the project has no limited resources, no empty resource panel should appear.

---

# 23. Team Indicator

For team investigations, show a compact team indicator.

Example:

```text
TEAM: RAVENS
```

Optional expanded view:

```text
Eric      ● online
Maya      ● online
Jordan    ○ away
```

The persistent Shell should not become a full team-management dashboard.

Clicking the team indicator may open:

- member list
- team roles
- current shared task
- recent important team changes

---

# 24. Team Activity Cues

Subtle temporary messages may show important shared changes.

Examples:

```text
Maya added evidence.
```

```text
Jordan revised the team theory.
```

Avoid a constant noisy activity feed.

The goal is awareness, not social-media-style distraction.

---

# 25. Locked Phase Feedback

Clicking a locked phase should explain the gate.

Example:

```text
FINAL EXPLANATION

Not ready yet.

Before this opens:

✓ Collect 4 pieces of evidence
✓ Create a working theory
○ Revise your theory once
```

Avoid:

```text
Locked
```

with no explanation.

Students should understand what remains to be done.

---

# 26. Needs Revision State

If a teacher/system requires revision, the Shell should make it clear without making the entire project feel like failure.

Example:

```text
REVISION NEEDED

Your working explanation needs another look.

[ Return to Analyze → Theory ]
```

The relevant phase may display:

```text
↻ Needs Revision
```

---

# 27. Final Investigation Ready

When final requirements are satisfied:

```text
FINAL INVESTIGATION READY

Your evidence and theory are ready for the final case.

[ Build Final Case ]
```

Students may still revisit prior Investigation work if permitted.

---

# 28. Completed Investigation State

After completion:

```text
INVESTIGATION COMPLETE

Your final conclusion:
Substance B

[ Review Case Board ]
[ View Final Report ]
[ Reflection ]
```

Do not replace the student's work with a full-screen celebration that disconnects them from the investigation record.

Subtle completion recognition is appropriate.

---

# 29. Offline / Sync Status

Temporary connectivity issues should be handled calmly.

Example:

```text
Connection interrupted.

Your draft is saved on this device and will sync when connected.
```

High-stakes operations may display:

```text
Connection required to submit.
```

Sync status should remain compact unless action is required.

---

# 30. Save Status

Possible subtle states:

```text
Saved
Saving...
Pending sync
Connection required
```

Do not continuously animate or distract students when everything is functioning normally.

---

# 31. Help / Utility Strip

Secondary tools may live in a compact lower utility area.

Possible controls:

```text
Notebook
Resources
Vocabulary
Help
```

These should usually open drawers/overlays and preserve the Investigation Workspace underneath.

Do not turn utility controls into competing primary navigation.

---

# 32. Context-Sensitive Help

Help should respond to the current workspace pair.

Examples:

## Evidence → Analyze

```text
Start by opening a piece of evidence.

Then decide what it tells you.
```

## Analyze → Theory

```text
Look for evidence that supports and challenges your explanation.
```

## Theory → Investigate

```text
Look at what your theory cannot explain yet.

Choose an investigation that may provide useful evidence.
```

This Help area can later connect to an external AI support tool.

---

# 33. Mission Timer / Countdown

Only display a timer when the project genuinely uses time as a meaningful constraint.

Possible uses:

- teacher-controlled event
- challenge countdown
- timed investigation phase
- simulation event

Do not put a countdown timer into every project by default.

---

# 34. Hybrid Theme Rules

The Shell may adopt subtle project-theme styling, but must preserve:

- layout
- control placement
- semantics
- accessibility
- status meaning
- navigation behavior

Project-specific Shell styling may influence:

- background texture
- border treatment
- small icon motifs
- phase-track decoration
- panel frame decoration
- mission-strip accent artwork

Do not substantially change the Shell interaction model per project.

---

# 35. Theme Example — Mystery Substance

Outer Shell:

- clean digital research console
- subtle hazard/lab accents
- neutral professional controls

Inner panels:

- lab specimen cards
- instrument graphics
- digital analysis corkboard
- test/workstation visuals

---

# 36. Theme Example — Fossil Detectives

Outer Shell:

- same structural placement
- slightly field-research-inspired accents
- specimen/stratigraphy phase markers

Inner panels:

- field journal
- excavation surfaces
- fossil specimen tags
- site maps
- rock-layer visuals

---

# 37. Theme Example — Historical Case

Outer Shell:

- same structure
- archive/dossier accent styling

Inner panels:

- source folders
- historical maps
- document cards
- evidence annotations

---

# 38. Strong Theming Boundary

Do not allow theme configuration to:

- change whether a phase is locked
- change rule behavior
- alter evidence meaning
- change permissions
- change runtime state
- change final requirements
- change accessibility requirements

Theme controls appearance and terminology only.

---

# 39. Desktop / Chromebook Priority

Primary design target:

- Chromebook
- laptop
- desktop browser

The Shell should avoid excessive vertical height.

Persistent controls should remain compact enough that the two-panel workspace has substantial room.

---

# 40. Tablet

Tablet landscape may preserve the desktop two-panel structure.

Tablet portrait may use a compact pair switcher while preserving the same Shell hierarchy.

---

# 41. Mobile / Narrow Screen

On narrow screens:

- mission strip compresses
- phase track may become horizontally scrollable or condensed
- workspace-pair selector remains clear
- only one panel of the active pair may be visible at a time
- paired relationship state must remain preserved

Do not squeeze the two Investigation panels into unusably narrow columns.

---

# 42. Accessibility

The Shell must support:

- keyboard navigation
- logical tab order
- visible focus
- screen-reader labels
- no status communicated by color alone
- readable text
- touch-friendly controls
- reduced motion
- accessible phase status
- accessible locked-state explanations

---

# 43. Animation

Use restrained Shell animation.

Appropriate:

- current phase indicator changes
- new phase unlock
- workspace-pair transition
- contextual alert
- new evidence notification

Avoid:

- constant moving backgrounds
- large glowing effects
- decorative animation that competes with content
- repeated celebration effects

Respect reduced-motion preferences.

---

# 44. Shell States to Mock Before Final Design

Create visual mockups for at least:

1. brand-new investigation
2. normal active investigation
3. new evidence received
4. locked phase clicked
5. phase complete
6. new phase unlocked
7. activity launching
8. activity complete
9. teacher surprise event
10. team-member update
11. needs revision
12. offline/pending sync
13. final investigation ready
14. investigation complete

---

# 45. Brand-New Investigation State

Example:

```text
MISSION ACTIVE

Begin by examining the incident report.

[ Open First Evidence ]
```

Phase track should show the starting phase clearly.

The Shell should not appear empty or confusing before evidence exists.

---

# 46. Normal Active State

Example:

```text
MYSTERY SUBSTANCE OUTBREAK

Evidence 6/10
Lab Credits 3
Testing

[ Evidence → Analyze ] [ Analyze → Theory ] [ Theory → Investigate ]

NEXT: Review Temperature Result
```

This should be the quiet default state.

---

# 47. Activity Launch State

Shell should clearly indicate:

```text
CURRENT ACTIVITY
Temperature Test
```

with:

```text
← Return to Investigation
```

where appropriate.

Students should understand that the activity is part of the same project.

---

# 48. Activity Complete State

Example:

```text
TEST COMPLETE

New Evidence:
Temperature Result

[ Return to Evidence → Analyze ]
```

The result should become the next reasoning object.

---

# 49. Teacher Update State

Example:

```text
CASE UPDATE

Your teacher released new evidence.

Security Log

[ Examine Evidence ]
```

This may temporarily take visual priority over the normal next-action strip.

---

# 50. Final Ready State

Example:

```text
FINAL INVESTIGATION READY

You have enough evidence to build your final case.

[ Build Final Investigation ]
```

Avoid automatically forcing submission if revision/review is still allowed.

---

# 51. Project Completion State

Example:

```text
INVESTIGATION COMPLETE

Final Conclusion:
Substance B

[ Review Investigation ]
[ View Final Submission ]
```

Preserve access to the reasoning record.

---

# 52. What Does Not Belong in the Shell

Do not permanently display:

- full rubric
- full gradebook
- long lessons
- full teacher comments
- all project resources
- long mission text
- detailed team chat
- every notification
- all mastery results
- large project artwork

The Shell exists to orient the student and protect workspace focus.

---

# 53. V1 Scope

Build first:

- compact Mission Strip
- expandable Mission Brief
- phase navigator
- workspace-pair selector
- two-panel workspace frame
- next-action/status strip
- limited resource indicator
- basic team indicator
- contextual alert pattern
- activity launch/return pattern
- locked-phase explanation
- needs-revision state
- final-ready state
- basic sync status

---

# 54. V1.5 / Later

Potential later additions:

- richer team-presence indicators
- advanced real-time collaboration cues
- stronger theme variants
- teacher-triggered cinematic case events
- class challenge/leaderboard summary
- adaptive help
- AI support entry point
- phase-transition story moments

Do not block V1 on these.

---

# 55. Final Design Principle

The Investigation Shell should feel like a **stable mission-control frame around a changing project world**.

Students should always recognize:

```text
where they are
what they are solving
what phase they are in
what reasoning connection they are working on
what they should notice next
```

The Shell should never compete with the Investigation Workspace for attention.

The guiding visual rule is:

> **Keep the navigation and status familiar; let the project world live inside the workspace.**
