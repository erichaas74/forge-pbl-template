# UI_04_ACTIVITY_WORKSPACE.md

# Activity Workspace Design Specification

## Purpose

The Activity Workspace is where students **do the investigation**.

It is the place for:

- labs
- simulations
- interviews
- source investigations
- map investigations
- artifact examinations
- measurements
- observations
- model building
- data collection
- decision activities
- research stations

The Activity Workspace should not feel like a disconnected assignment page.

It should clearly connect:

```text
Working Theory / Question
        ↓
Investigation Choice
        ↓
Activity
        ↓
Result
        ↓
New Evidence
        ↓
Evidence + Analysis
```

The student should understand **why they are doing the activity**, what information they are trying to obtain, and how the result returns to the larger investigation.

---

# 1. Core Design Principle

An activity is not an isolated task.

Every Investigation activity should visibly connect to one or more of:

- a theory
- an uncertainty
- a student question
- an evidence gap
- a required investigation step
- a teacher-directed mission objective

The Activity Workspace should answer:

1. What am I trying to learn from this?
2. What am I allowed to change or test?
3. What evidence/data am I collecting?
4. When is the activity complete?
5. What did I learn?
6. Where does the result go next?

---

# 2. Two Activity Display Modes

Use two primary presentation modes.

## Mode A — Embedded Activity

For smaller activities that fit comfortably inside one Investigation panel.

Example:

```text
THEORY | ACTIVE TEST
```

The left panel keeps the Working Theory or current question visible.

The right panel becomes the active investigation.

Use for:

- short measurement task
- scripted interview
- source examination
- simple virtual lab
- one-variable test
- quick map investigation
- artifact inspection
- small decision activity

---

## Mode B — Expanded Activity Workspace

For larger simulations or tools that need most of the screen.

Example:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Return to Investigation      TEMPERATURE TEST                              │
│ Question: Why did the sample heat up?                         Lab Credit: 1  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         LARGE ACTIVITY SPACE                                 │
│                                                                              │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ DATA / OBSERVATIONS / RESULT                                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

Use for:

- complex simulation
- 3D activity
- large map
- detailed lab bench
- model builder
- multi-step workstation
- activity requiring significant visualization space

The student must still retain compact mission/question context.

---

# 3. Activity Launch From Theory → Investigate

The ideal launch starts in:

```text
Working Theory | Investigate
```

Example:

```text
┌────────────────────────────────────┬───────────────────────────────────────┐
│ WORKING THEORY                     │ INVESTIGATE                           │
│                                    │                                       │
│ Substance B                        │ Solubility Test                        │
│ Confidence: 72%                    │ Cost: 1 Lab Credit                    │
│                                    │                                       │
│ Open Question:                     │ May provide evidence about            │
│ How can I distinguish B from C?    │ how B and C behave in solution.       │
│                                    │                                       │
│                                    │ [Start Investigation]                 │
└────────────────────────────────────┴───────────────────────────────────────┘
```

Before launching, the student should understand:

- activity name
- purpose
- cost/resource requirement if any
- what kind of evidence it may provide
- whether it is required/optional
- whether it counts as an official attempt

Do not reveal the answer or guarantee that the activity will confirm the student's theory.

---

# 4. "Why Am I Doing This?" Link

Every activity should support a visible investigation reason.

Example:

```text
WHY THIS TEST?

You selected this test while trying to answer:

"Which property can distinguish Substance B from Substance C?"
```

For younger students, this can be explicit.

For older students, it may be a small expandable label.

The system should preserve the link between:

```text
question / uncertainty
        ↓
activity choice
```

---

# 5. Activity Header

Keep the activity header compact.

Recommended elements:

- activity name
- short purpose
- current question/theory connection
- resource cost
- attempt status
- team role if relevant
- reset/restart if allowed
- return control

Example:

```text
TEMPERATURE TEST

Question:
Does this sample release or absorb energy?

Lab Credits: 3 remaining
This test costs: 1

Attempt: Practice
```

---

# 6. Avoid Long Instructions at the Top

Do not place a full page of directions before the activity.

Instead use:

```text
Goal
1–2 sentence purpose

How to use
short steps

Start
```

Detailed procedures may be available through:

```text
[ Procedure ]
[ Safety ]
[ Help ]
```

as drawers/overlays.

---

# 7. Recommended Embedded Activity Layout

```text
┌────────────────────────────────────┬───────────────────────────────────────┐
│ WORKING THEORY                     │ TEMPERATURE TEST                      │
│                                    │                                       │
│ Current Identification             │ Sample: B                             │
│ Substance B                        │                                       │
│                                    │ [ interactive test area ]             │
│ Question                           │                                       │
│ Why did the sample heat up?        │                                       │
│                                    │ Reading: 21°C                         │
│ Evidence needed                    │                                       │
│ Energy-change evidence             │ [Begin Test]                          │
│                                    │                                       │
│                                    │ Observation                           │
│                                    │ [ student observation ]               │
└────────────────────────────────────┴───────────────────────────────────────┘
```

The Theory panel should remain readable but not compete with the activity.

Suggested proportion:

```text
Theory: 35–45%
Activity: 55–65%
```

---

# 8. Recommended Expanded Activity Layout

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Investigation      SOLUBILITY TEST                                        │
│ Question: Which result would distinguish B from C?          Cost: 1 credit   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                           MAIN INTERACTIVE AREA                              │
│                                                                              │
│                                                                              │
│                                                                              │
├──────────────────────────────────┬───────────────────────────────────────────┤
│ DATA                             │ OBSERVATIONS                              │
│ Trial 1                          │ What did you notice?                      │
│ ...                              │ [ response ]                              │
│                                  │                                           │
│                                  │ [Complete Test]                           │
└──────────────────────────────────┴───────────────────────────────────────────┘
```

The data/observation area should remain compact until needed.

---

# 9. Activity Types

The same Activity Workspace shell should support multiple activity families.

## Laboratory / Simulation

Examples:

- change variable
- run test
- measure output
- observe reaction
- compare trial results

## Interview

Examples:

- select question
- read/listen to response
- collect statement as evidence
- unlock follow-up question

## Source Investigation

Examples:

- inspect document
- highlight details
- answer source/context prompt
- collect source as evidence

## Map Investigation

Examples:

- inspect location
- switch layers
- measure distance
- identify pattern
- save map observation

## Artifact / Specimen

Examples:

- zoom
- rotate
- compare
- measure
- annotate
- record features

## Data Investigation

Examples:

- filter table
- inspect graph
- compare values
- calculate
- identify trend

## Decision Activity

Examples:

- choose action
- spend resource
- trigger consequence
- generate new evidence/state

The outer Activity Workspace remains consistent.

---

# 10. Activity State Model — Student View

Students should understand basic activity status.

Possible labels:

- Available
- Locked
- Ready
- In Progress
- Trial Complete
- Evidence Collected
- Needs Revision
- Official Attempt Used
- Complete

Do not show internal runtime terms.

---

# 11. Practice vs Official Attempts

Some activities may allow:

```text
Practice Trial
```

and:

```text
Official Trial
```

The visual difference must be obvious.

Example:

```text
PRACTICE
Unlimited / does not count toward official score
```

```text
OFFICIAL ATTEMPT
1 of 2 remaining
Result will be recorded
```

Do not accidentally consume an official attempt because a student clicked into an activity.

Require a clear explicit start/confirmation for high-stakes attempts.

---

# 12. Limited Resource Confirmation

Before spending a meaningful limited resource:

```text
RUN SOLUBILITY TEST?

Cost:
1 Lab Credit

Team has:
2 Lab Credits remaining

[Cancel]      [Use 1 Credit and Begin]
```

For low-cost/repeatable activities, this confirmation may be simplified.

Do not hide resource consequences.

---

# 13. Team Activity Mode

For team activities, clearly show:

- who is controlling the activity
- who can observe
- shared result
- team resource use
- current role

Example:

```text
TEAM TEST

Operator:
Maya — Lab Lead

Your role:
Data Recorder

You can:
Record observations
Review live results
```

Avoid multiple students fighting over the same controls without clear authority.

---

# 14. Team Control Options

Depending on project:

- one student controls
- any teammate can control
- role-based control
- teacher assigns control
- turn-based control

This is project configuration.

The UI should communicate the current rule clearly.

---

# 15. Observation Area

Students should have a small place to record what they notice during the activity.

Example:

```text
OBSERVATION

What changed?

[ The sample became cloudy and the temperature increased. ]
```

The observation may later become:

- student-created evidence
- part of the activity result
- a note connected to teacher evidence

Do not require long writing during every interactive step.

---

# 16. Live Data Display

Activities may display data such as:

- temperature
- time
- mass
- population
- distance
- pH
- speed
- score
- frequency
- percentage

Keep live data readable.

Do not overload the screen with unnecessary gauges.

Important values should visually relate to the student's manipulation.

---

# 17. Trial Data

For multi-trial activities:

```text
TRIALS

Trial 1     29°C
Trial 2     37°C
Trial 3     35°C
```

Students may:

- compare
- select best/official trial
- graph
- record observation

The activity determines whether each trial or a summary becomes evidence.

---

# 18. Activity Results Should Be Bounded

Do not create a separate evidence card for every minor slider movement or intermediate state.

Recommended outputs:

```text
Completed Trial
        ↓
Summary Result
        ↓
Evidence / Data
```

One meaningful completed result is usually better than dozens of tiny evidence items.

---

# 19. Success Is Not Always "Correct"

Activities should not automatically display:

```text
CORRECT!
```

unless the activity is genuinely a practice/mastery item.

Investigation activities may produce:

- useful evidence
- weak evidence
- ambiguous evidence
- unexpected result
- evidence that challenges the student's theory

The activity result should often say:

```text
RESULT RECORDED
```

rather than:

```text
YOU WON
```

---

# 20. Unexpected Results

Unexpected evidence can be one of the most interesting parts of the investigation.

Example:

```text
RESULT

This test did not match your prediction.

Temperature increased by only 1°C.

[Record Observation]
```

Then return the result to Evidence + Analysis.

Do not immediately explain why it contradicts the student's theory unless the project is highly guided.

---

# 21. Student Prediction

Some activities may ask for a prediction before testing.

Example:

```text
BEFORE YOU RUN THE TEST

What do you predict will happen?

[ Temperature will increase ]
[ Temperature will decrease ]
[ Little change ]
```

Afterward:

```text
PREDICTION
Temperature will increase

RESULT
Temperature decreased 8°C
```

This can become useful reasoning evidence.

Prediction should be optional/configurable.

---

# 22. Activity Completion

A test is complete when the configured completion rule is satisfied.

Possible requirements:

- trial completed
- observation recorded
- data table complete
- required question answered
- evidence captured
- file uploaded
- official attempt submitted

Do not use one universal "Complete" rule for every activity.

---

# 23. Completion Summary

When finished, show a short result summary.

Example:

```text
TEST COMPLETE

Temperature:
21°C → 37°C

Observation:
The container became warm.

NEW EVIDENCE:
Temperature Test Result

[Return to Evidence → Analyze]
```

This is the bridge back into reasoning.

---

# 24. Evidence Generated

If evidence is created:

- name it
- show evidence-type icon
- indicate whether it was auto-generated or student-created
- provide one clear next action

Example:

```text
NEW EVIDENCE

📊 Temperature Test Result

[Examine Evidence]
```

Clicking should return to Evidence + Analysis with that item selected.

---

# 25. No-Evidence Activity Result

Some activities may change state without producing a formal evidence card.

Example:

```text
ACTION COMPLETE

You searched the storage room.

A new interview option is now available.
```

Next action:

```text
[Return to Investigation]
```

The system may route to Theory + Investigate or another relevant pair.

---

# 26. Branching Activity Result

A student choice may change what becomes available.

Example:

```text
DECISION RECORDED

You sent the sample for advanced analysis.

New status:
Sample unavailable for 1 investigation step.

New evidence will arrive later.
```

The UI should make consequences understandable without exposing internal state variables.

---

# 27. NPC / Interview Workspace

Embedded interview example:

```text
┌────────────────────────────────────┬───────────────────────────────────────┐
│ WORKING THEORY                     │ DR. TORRES                            │
│                                    │ Lab Technician                        │
│ Question:                          │                                       │
│ Who handled Sample C?              │ [portrait]                            │
│                                    │                                       │
│                                    │ Ask:                                  │
│                                    │ [When did you notice the reaction?]   │
│                                    │ [Who used Sample C last?]             │
│                                    │ [Why was the cabinet open? 🔒]        │
└────────────────────────────────────┴───────────────────────────────────────┘
```

After asking:

```text
STATEMENT RECORDED

New Evidence:
Technician Statement
```

The interview itself should not become a generic chat box in V1.

---

# 28. Source Investigation Workspace

Example:

```text
CURRENT EXPLANATION | SOURCE FILE
```

Right panel may show:

- document
- source information
- highlighting tools
- notes
- "collect as evidence"

This fits historical/ELA investigations using the same Activity Workspace.

---

# 29. Map Investigation Workspace

A map activity may need expanded mode.

Keep compact context:

```text
Question:
Which route best explains where the material traveled?
```

Main area:

- map
- layers
- selected locations
- route tools

Output:

```text
Map Observation
```

or:

```text
Route Evidence
```

---

# 30. Artifact / Specimen Workspace

Example:

```text
Question:
What environment could this organism have lived in?
```

Tools:

- zoom
- rotate if 3D
- measure
- feature labels
- compare
- observation

Output:

```text
Specimen Observation
```

---

# 31. Help During an Activity

Use context-sensitive help.

Example:

```text
Need help?

1. Choose the sample.
2. Record the starting temperature.
3. Run the test.
4. Compare the final temperature.
```

For older students, help may be optional.

For younger students, key steps may remain visible.

---

# 32. Safety Information

Science/engineering activities may include:

```text
SAFETY
```

as a compact drawer or callout.

The simulation may be virtual, but if the activity mirrors real-world procedures, safety concepts may still matter educationally.

Do not overload every activity with irrelevant safety warnings.

---

# 33. Locked Activity

If an activity is locked, show why.

Example:

```text
ADVANCED ANALYSIS

Locked

To unlock:
✓ Collect 3 evidence items
○ Create a working theory
```

Do not simply disable the button without explanation.

---

# 34. Resource-Blocked Activity

Example:

```text
ADVANCED ANALYSIS

Cost: 3 Lab Credits

Your team has:
2 Lab Credits

Not enough credits.

Other available investigations:
[Solubility Test]
[Interview Technician]
```

This supports strategic decision-making.

---

# 35. Teacher-Released Activity

Example:

```text
NEW INVESTIGATION AVAILABLE

Your teacher opened:
Security Camera Review

[Begin]
```

This should appear contextually in Theory + Investigate.

---

# 36. Activity History

Students may need access to completed investigations.

Example:

```text
COMPLETED INVESTIGATIONS

✓ Temperature Test
✓ Solubility Test
✓ Technician Interview
○ Advanced Analysis
```

Clicking a completed activity should normally show result/history rather than rerun it unless revisits are allowed.

---

# 37. Retry / Revisit

Possible states:

```text
[Review Result]
```

```text
[Run Another Trial]
```

```text
[Retry After Revision]
```

```text
[Official Attempts Used]
```

The project defines retry behavior.

---

# 38. Activity Graphics Philosophy

Activities can be highly immersive.

This is where project-specific graphics may be strongest.

Examples:

### Mystery Substance
- lab bench
- test tubes
- instruments
- reaction animation
- sample containers

### Fossil Detectives
- dig site
- rock layers
- specimen table
- field map

### Historical Case
- archive table
- documents
- map layers
- source comparison

The Activity Workspace shell remains consistent around these visuals.

---

# 39. Shared Activity UI

These should remain consistent:

- Start
- Reset
- Submit Result
- Practice / Official indicator
- Resource cost
- Observation area
- Completion state
- Return to Investigation
- Help
- accessibility controls

Students should not relearn fundamental controls for each project.

---

# 40. Project-Specific Activity Graphics

May include:

- backgrounds
- instruments
- avatars
- specimen images
- maps
- animations
- simulation objects
- 3D models

These belong to activity plugins/project assets.

---

# 41. Theme Boundary

Theme may change:

- visual scene
- texture
- instrument artwork
- button accent treatment
- terminology

Theme must not change:

- completion logic
- resource spending
- evidence generation
- attempt counting
- permissions
- accessibility
- authoritative state behavior

---

# 42. Activity Loading State

If a large simulation/plugin takes time:

```text
Preparing Investigation...

Loading laboratory instruments
```

Keep the message project-themed but honest.

Do not show blank space.

---

# 43. Activity Error State

Recoverable failure:

```text
This investigation tool could not load.

Your work has not been lost.

[Try Again]
[Return to Investigation]
```

Do not reveal raw technical errors to students.

Teacher/preview mode may expose error code/details.

---

# 44. Connection Loss

Low-risk draft activity:

```text
Connection interrupted.

You can continue this practice trial.
Results will sync when connection returns.
```

High-stakes official activity:

```text
Connection required before starting an official attempt.
```

Do not allow uncertain official state.

---

# 45. Responsive Behavior

## Desktop / Chromebook

Primary target.

Use:

- embedded Theory + Activity when possible
- expanded workspace for large simulations

## Tablet Landscape

May preserve two-panel embedded mode.

## Narrow / Mobile

Activity becomes primary screen.

Keep a compact theory/question summary above or in a drawer.

Example:

```text
YOUR QUESTION
Why did the sample heat up?

[View Theory]
```

Do not squeeze Theory and a complex simulation side-by-side on a phone.

---

# 46. Accessibility

Activities must support:

- keyboard controls
- visible focus
- semantic buttons
- text alternatives
- non-drag alternatives
- captions/transcripts
- reduced motion
- appropriate labels for dynamic readings
- touch-friendly targets
- screen-reader-friendly result summaries

If a custom simulation interaction is not keyboard accessible, provide an alternate control method.

---

# 47. Motion

Use animation when it communicates scientific/project behavior.

Good:

- object movement
- reaction change
- data update
- new result
- evidence capture

Avoid:

- decorative motion
- constant background movement
- excessive transition effects

Respect reduced-motion preferences while preserving the educational information.

---

# 48. Activity Result to Evidence Transition

This is one of the most important visual transitions in the entire Investigation Template.

Recommended sequence:

```text
ACTIVITY COMPLETE
        ↓
RESULT SUMMARY
        ↓
NEW EVIDENCE CREATED
        ↓
RETURN TO EVIDENCE + ANALYSIS
        ↓
NEW EVIDENCE HIGHLIGHTED
```

Students should feel:

> I did something, learned something, and now I need to use it.

---

# 49. V1 Scope

Design/build first:

- embedded activity mode
- expanded activity mode
- compact question/theory context
- activity header
- resource cost
- practice/official state
- observation field
- trial/result summary
- locked activity explanation
- completion summary
- evidence-generation transition
- return to Evidence + Analysis
- scripted interview layout
- simple lab/simulation layout
- source investigation layout
- responsive behavior

---

# 50. V1.5 / Later

Potential later features:

- live collaborative simulation controls
- advanced role-based team operation
- experiment planning before launch
- richer trial comparison
- automatic graph generation
- activity replay
- teacher live intervention
- advanced 3D workstations
- external tool embedding
- AI-controlled NPC dialogue
- class challenge mode

Do not block V1 on these.

---

# 51. Final Design Principle

The Activity Workspace should never feel like:

```text
Go complete another assignment.
```

It should feel like:

```text
I have a question.
I chose an investigation.
I ran it.
I got a result.
Now I have new evidence.
```

The defining design rule is:

> **Every activity should visibly begin with a reason and end with evidence, state, or a meaningful consequence that returns to the investigation.**
