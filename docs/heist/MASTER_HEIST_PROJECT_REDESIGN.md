# MASTER HEIST PROJECT TYPE DESIGN
## Phaser.js Academic Heist Engine + Math Mastery Locks + Age of Exploration History Art Heist

## Purpose of This Master Document

This document consolidates the full redesign of the **Heist Project Type** into one build reference.

It combines:

1. The reusable **Phaser.js Heist game engine**
2. The **Academic Lock System**
3. Visual/environmental lock interactions
4. Rotation-to-degree math mechanics
5. The strongest grade 4–8 math standards for a Heist environment
6. The rule that math answers must physically change the game world
7. The **Age of Exploration History Art Heist**
8. Historically grounded fraud-image rules
9. The branching gallery/maze system
10. Painting authentication challenges
11. Reusable data architecture
12. Suggested implementation phases for Codex

This should be treated as the **master source of truth** for the Heist project type. More focused documents can still be used during implementation, but changes to the overall design should be reflected here.

---

# A. PROJECT IDENTITY

## A1. What Makes the Heist Project Type Different

The Heist is not primarily an escape room, quiz, or free-roaming thief game.

It is an **academic planning and authentication game** in which knowledge controls physical mechanisms and determines which route through the environment is possible.

The defining experience is:

**RECON → INSPECT → LEARN → SOLVE → MANIPULATE → UNLOCK → CHOOSE ROUTE → EXECUTE → RESPOND → EXTRACT → REPLAY / DEFEND**

The project can be configured primarily for:

- Math
- Social Studies / History
- Hybrid Math + History

The core rule is:

> **Academic understanding must physically operate the world.**

Examples:

- an angle calculation rotates a lever
- a ratio determines when a guard clears a passage
- a scale drawing reveals the real distance to a hidden route
- an inequality determines whether cargo can cross a bridge
- a historical chronology opens the correct archive
- a historically authentic painting determines which gallery path opens
- identifying an anachronistic technology exposes a fraud
- a correct Columbian Exchange classification opens a trade gate

---

# B. CORE MASTERY MODEL

The Heist should use three levels of mastery whenever possible.

## Level 1 — Calculate / Determine

The student produces the academic result.

Examples:
- calculate 135°
- determine 30 m from a scale drawing
- identify 1492
- determine which crop originated in the Americas
- identify the correct historical group

## Level 2 — Manipulate

The student uses that result to physically operate the environment.

Examples:
- rotate a dial to 135°
- trace a 30 m route
- set a date cylinder to 1492
- place maize in the New World origin crate
- put the correct group on the correct map region

## Level 3 — Consequence

The game actually uses the student result.

Examples:
- the gate opens to the angle they set
- the operative follows the route they measured
- the guard timing succeeds or fails
- an overloaded bridge refuses passage
- the correct painting opens the real maze path
- the wrong historical image triggers a fraud-analysis lock

This third layer is essential.

> **A correct answer should not disappear after submission. It should rotate, move, load, align, time, position, classify, reveal, or otherwise change the game world.**

---

# C. BEST-FIT MATH STANDARDS FOR THE HEIST

The Heist should not attempt to force every math standard into one project. The following standards have the strongest natural fit because they can become visible game mechanics.

## C1. Angles and Rotation

### Best Mastery Interaction
Rotate:
- vault ring
- lever
- gear
- compass
- clock hand
- mirror
- map piece
- transformation object

### Example
`Rotate 3/8 of a full turn.`

Student determines:

`360 × 3/8 = 135°`

Then physically rotates the mechanism to 135°.

### Strong Concepts
- angle measure
- clockwise / counterclockwise rotation
- complementary angles
- supplementary angles
- fractions of a circle
- transformations
- bearings
- cardinal directions

---

## C2. Scale Drawings and Proportional Reasoning

### Best Mastery Interaction
Blueprint-to-environment measurement.

Example:
- scale = 1 cm : 4 m
- measured blueprint segment = 7.5 cm
- real distance = 30 m

The game then uses 30 m as the actual route distance.

### Strong Concepts
- scale factor
- proportions
- equivalent ratios
- measurement conversion
- map scale

---

## C3. Ratios, Unit Rates, and Rate-Time-Distance

### Best Mastery Interaction
Timed patrol crossing.

Example:
- guard travels 72 m in 48 s
- student determines speed
- predicts crossing window
- places WAIT command on timeline

Execution then tests the student's prediction.

---

## C4. Elapsed Time, Repeating Cycles, and LCM

### Best Mastery Interaction
Synchronize several moving systems.

Example:
- guard cycle = 6 min
- gate cycle = 8 min
- cart cycle = 12 min

Student finds when they align again:

`LCM = 24 min`

Then sets a clock/timeline mechanism to 24:00.

---

## C5. Fractions

### Best Mastery Interactions
- fraction wheel
- segmented dial
- gear sector
- liquid/container fill
- combine pieces to make a whole
- fraction of a rotation

Examples:
- equivalent fraction lock
- 3/4-turn rotation
- build 1 whole from several fraction pieces

---

## C6. Percent and Percent Change

### Best Mastery Interaction
Crisis recalculation.

Example:
- cart capacity = 240 kg
- damage reduces capacity by 25%
- new capacity = 180 kg

Student recalculates and then physically decides what can remain in the cart.

---

## C7. Equations

### Best Mastery Interaction
Balance mechanism.

Example:
`3x + 8 = 29`

Visual:
- 3 identical crates + 8 kg on one side
- 29 kg on the other

Student solves `x = 7`, and the balance physically levels.

---

## C8. Inequalities

### Best Mastery Interaction
Constraint loading panel.

Example:
`62 + 78 + 64 + x ≤ 240`

Student loads:
- person
- archive crate
- cart
- supplies

The bridge/load meter must remain inside the safe region.

---

## C9. Coordinate Plane

### Best Mastery Interaction
Grid navigation / hidden mechanism locator.

Student:
- plots coordinates
- moves tokens
- places markers
- determines displacement
- uses quadrants in upper grades

---

## C10. Pythagorean Theorem

### Best Mastery Interaction
Determine whether a diagonal shortcut is physically possible.

Example:
- horizontal = 24 m
- vertical = 18 m
- rope = 29 m

Student calculates diagonal = 30 m.

The rope visibly fails the requirement, forcing another route.

---

## C11. Transformations

### Best Mastery Interaction
Rotate / reflect / translate / dilate an environmental object.

Possible objects:
- map tile
- emblem
- door mechanism
- floor pattern
- route shape

---

## C12. Volume and Capacity

### Best Mastery Interaction
Physical cargo loading.

Students load objects into a constrained cart/container.

The game tracks:
- dimensions
- volume
- mass
- remaining capacity

Multiple valid solutions are encouraged.

---

## C13. Slope and Linear Relationships

### Best Mastery Interaction
Adjust:
- ramp
- route line
- trend line
- moving-rate control

Student manipulates rise/run until the required slope is reached.

---

## C14. Systems of Equations

### Best Mastery Interaction
Two-condition vault.

Two moving gauges or lines represent two equations.

The student adjusts the shared variable until both systems meet at the same point.

When they intersect correctly:
`SYSTEM BALANCED`

---

## C15. Statistics and Data

### Best Mastery Interaction
Intelligence dashboard.

Students:
- interpret data
- compare distributions
- calculate summary statistics
- identify outliers
- position trend lines
- make predictions

The selected plan changes based on their interpretation.

---

## C16. Probability

### Best Mastery Interaction
Risk planning.

Students use actual probability to compare:
- routes
- repeated events
- expected outcomes
- experimental vs theoretical results

Probability should inform strategy, not function as arbitrary random punishment.

---

## C17. Optimization

### Best Mastery Interaction
Build the best complete plan while satisfying:
- time
- distance
- load
- cost
- route
- risk

This is one of the strongest culminating Heist mechanics.

---

# D. GRADE 4–8 MATH FIT

## Grade 4
Best Heist standards:
- multi-digit operations
- rounding / estimation
- fractions
- measurement
- elapsed time
- angles
- area
- perimeter
- basic data

## Grade 5
Best:
- decimals
- fraction operations
- coordinate grid
- volume
- unit conversions
- patterns
- measurement
- time / rate previews

## Grade 6
Best:
- ratios
- unit rates
- rational numbers
- expressions
- equations
- inequalities
- coordinate plane
- area
- surface area
- volume

## Grade 7
Best:
- proportional relationships
- percent
- rational-number operations
- equations
- inequalities
- scale drawings
- probability
- geometry

## Grade 8
Best:
- slope
- linear equations
- functions
- systems
- transformations
- congruence
- similarity
- Pythagorean theorem
- coordinate distance
- scatterplots / trends

---

# E. AGE OF EXPLORATION HISTORY ART HEIST — DEFINING RULE

The history version uses a branching gallery maze.

At each major junction:

- 3 paintings are displayed
- 1 is historically accurate
- 2 are historically inaccurate frauds
- the authentic painting corresponds to the correct passage
- choosing a fraud forces the student to identify the specific historical impossibility

Allowed fraud categories are intentionally narrow and factual:

1. **Wrong Timeline**
2. **Wrong Animal / Plant / Food**
3. **Wrong Group of People**
4. **Wrong Technology**

This avoids subjective judgments about art style.

The student must be able to answer:

> **What concrete historical detail proves this image could not be authentic?**

---

# F. HISTORY HEIST MASTERY MODEL

For each image challenge:

## Step 1 — Inspect
Zoom into the three paintings.

## Step 2 — Notice
Identify suspicious:
- animals
- crops
- people
- clothing
- ships
- navigation devices
- flags
- buildings
- technologies

## Step 3 — Authenticate
Choose the historically accurate painting.

## Step 4 — Navigate
The chosen painting corresponds to a physical route through the maze.

## Step 5 — Correct Fraud
If wrong, identify:
- fraud category
- specific incorrect object/group/technology/timeline detail

## Step 6 — Lock
Complete a themed academic lock tied directly to that error.

## Step 7 — Continue
Return to junction or open the correct path.

---

# G. HISTORY HEIST FINAL PRODUCT

Generate a **Historical Authentication Dossier** containing:

- authentic images selected
- frauds identified
- fraud category for each
- concrete historical error
- timeline evidence
- people/culture evidence
- Columbian Exchange evidence
- technology evidence
- route evidence
- final master-vault result

Final defense prompts can include:

- Which clue was most useful?
- Which fraud was hardest to detect?
- What detail made the fake impossible?
- How can images create inaccurate historical impressions?

---

# H. IMPLEMENTATION PRIORITY

For the first production-quality Heist build:

1. Phaser environment shell
2. Painting gallery / maze path system
3. 3-image authentication challenge
4. Fraud hotspot inspection
5. Fraud classification panel
6. Combo dial
7. Rotation / degree lock
8. Lever lock
9. Timeline arranger
10. Map/route lock
11. Animal/plant sorter
12. People placement
13. Technology sorter
14. Evidence board
15. Measurement system
16. Constraint/cargo lock
17. Master vault
18. Notebook
19. Replay / mastery logging
20. LMS adapter

---


---

# PART I — PHASER.JS HEIST ENGINE BUILD PLAN

## Purpose

Build a reusable **Heist Project Type** for the PBL platform using **Phaser 4 + TypeScript**.

This is not a traditional player-controlled thief game. The core student experience is:

**RECON → MEASURE → CALCULATE → PLAN → LOCK PLAN → EXECUTE → RESPOND TO CRISIS → EXTRACT → REPLAY/DEFEND**

The project is primarily a **math learning experience**. Historical content supplies the world, constraints, architecture, technology, routes, schedules, objects, and story context. Student mathematics determines whether the operation works.

The defining rule is:

> **A Heist Project cannot be completed by finding clues alone. Every major operational decision must depend on student-generated mathematical evidence. Historical content creates the world and its constraints; mathematics determines whether the operation succeeds.**

The engine must be reusable across grade levels and historical settings.

Example settings:
- Ancient temple artifact rescue
- Medieval castle document recovery
- Revolutionary War intelligence extraction
- Silk Road courier operation
- Renaissance manuscript rescue
- Museum/cultural artifact recovery
- Historical archive evacuation
- Spy-message extraction

Do **not** build combat, weapons, fighting, takedowns, or realistic criminal instruction. The tone is historical adventure, recovery, rescue, protection, intelligence, logistics, and mathematical planning.

---

# 1. BUILD GOAL

Create a polished playable prototype that proves this loop:

1. Student enters a visually strong historical operation map.
2. Student investigates locations and intelligence.
3. Student measures distances and other map properties.
4. Student plans a route by placing waypoints.
5. Each route segment generates required math.
6. Student must enter/verify calculations before the route can be finalized.
7. Guards/NPCs follow visible patrol cycles.
8. Student can scrub a timeline to compare the planned route against patrol positions.
9. Student locks the plan.
10. The game automatically executes the route.
11. A crisis event interrupts the mission.
12. Student solves a new math problem and chooses a response.
13. Execution resumes.
14. The team reaches or fails to reach extraction.
15. The game creates a replay/event log showing the important mathematical decisions.

The first version must be fun and visually convincing before backend/LMS complexity is added.

---

# 2. TECHNOLOGY

## Required

- Phaser 4.x
- TypeScript
- HTML5 browser delivery
- Responsive desktop/laptop layout
- JSON-driven mission configuration
- Arcade Physics for basic top-down movement/collision where useful
- Phaser Cameras for pan/zoom/follow/cinematic transitions
- Phaser Graphics for overlays, routes, cones, measurement lines, zones, and debug tools
- Phaser Tweens/animations for feedback and cinematic events
- Local persistence for prototype state

Target the current stable Phaser 4 release available to the repository. If starting fresh, use Phaser 4.1.x or the current stable Phaser 4.x release.

## Recommended Development Setup

If this is a standalone prototype:
- Vite
- TypeScript
- Phaser
- ESLint
- Vitest or equivalent lightweight tests

If this is being added to the existing Angular PBL application:
- Keep Angular responsible for the surrounding LMS UI.
- Mount Phaser inside one dedicated game component/container.
- Do not rewrite normal LMS screens in Phaser.
- Keep a clean adapter between Angular/application state and the Phaser game.

## Do Not Use

- Three.js for this project
- Babylon.js for this project
- A full 3D engine
- Free-roaming first-person movement
- Complex rigid-body physics
- Multiplayer networking in the first build
- A backend as a prerequisite for prototype play

This is intentionally a **2D / 2.5D tactical game**.

---

# 3. VISUAL DIRECTION

The game should feel like:

- cinematic historical adventure
- tactical planning board
- animated strategy map
- heist-movie planning sequence
- historical cutaway map
- sports-broadcast-style execution replay

Avoid:
- generic dashboard appearance
- large walls of text
- hacker/neon cyberpunk style
- spreadsheet-first presentation
- tiny icons
- excessive menus
- visual clutter

## Recommended First Setting

Build the first demonstration as a **Medieval Castle Archive Rescue**.

Mission example:

> A treaty and archive ledger must be recovered from a fortified castle before an approaching army closes the roads. Your team must plan a mathematically valid entry, recovery route, and extraction before the castle goes into lockdown.

The mission is a recovery/rescue operation, not a realistic theft tutorial.

## World Style

Use one visually rich map:
- top-down or isometric-like 2.5D castle
- outer wall
- courtyard
- market/service area
- archive room
- tower
- stairs
- gate
- bridge
- extraction point
- optional hidden passage

For the first prototype, prioritize clarity over true isometric geometry.

Use:
- layered PNG/WebP background art OR
- Tiled JSON map + tileset

Phaser interaction layers should sit over the environment.

---

# 4. PRIMARY STUDENT MODES

The game has four major modes.

## MODE A — RECON

Purpose:
Understand the mission and inspect the environment.

Student can:
- pan map
- zoom
- click locations
- inspect guard routes
- open intelligence cards
- inspect target
- inspect entrances/exits
- reveal measurements that are allowed
- switch visual overlays

Student cannot execute the mission yet.

---

## MODE B — PLAN

Purpose:
Create a mathematically valid operation.

Student can:
- place route waypoints
- choose route segments
- add WAIT actions
- add PICKUP/CARRY actions
- select equipment if enabled
- measure distances
- calculate travel time
- calculate capacity
- compare alternate routes
- view patrol timeline
- build backup route
- validate route math

The plan remains editable until **LOCK PLAN**.

---

## MODE C — EXECUTION

Purpose:
Automatically run the student-created plan.

Student cannot freely steer the operative.

The engine:
- moves the operative along planned route
- runs patrol NPCs
- updates clock
- evaluates danger/detection states
- activates doors/zones
- triggers planned waits/actions
- fires crisis events
- records an event log
- uses cinematic camera behavior

Student interaction during normal execution should be limited.

---

## MODE D — REPLAY / DEFENSE

Purpose:
Review what happened and connect outcome to math.

Student can:
- scrub the mission timeline
- jump to important events
- view route calculation at that moment
- view original prediction vs actual result
- see crisis decision
- see success/failure reason
- select moments for final project evidence

---

# 5. GAME SCREEN LAYOUT

Use a single immersive screen. Avoid tab-heavy website design.

## Main Layout

### Center / Main Area
Large Phaser map.

### Top Bar
Show:
- mission title
- current mode
- operation clock
- target state
- alert/risk indicator
- plan validation status

Example:

`ARCHIVE RESCUE | PLAN MODE | 00:00 | TARGET: NOT SECURED | RISK: LOW`

### Left Tool Rail
Context-sensitive tools:
- Inspect
- Measure
- Route
- Wait
- Action
- Overlay
- Undo
- Clear segment

Use icons + text labels.

### Right Intelligence / Detail Panel
Slides in/out.

Used for:
- location details
- intelligence documents
- route segment math
- action configuration
- historical context
- crisis prompt

Do not permanently cover too much of the map.

### Bottom Timeline
One of the most important components.

Contains:
- operation time
- planned actions
- route segments
- guard patrol markers
- crisis/event markers
- extraction deadline

During execution it becomes a live progress timeline.

---

# 6. CORE INTERACTIONS

## 6.1 Inspect

Student clicks an interactive hotspot.

Show:
- name
- historical description
- known dimensions
- known restrictions
- relevant map data
- risk
- available actions

Example:

### WEST GATE
- Width: 3.2 m
- Guard rotation: 8 minutes
- Gate closes for 90 seconds each cycle
- Cart access: Yes
- Foot access: Yes

Some values should come directly from intelligence.
Some should require measurement or calculation.

---

## 6.2 Measure Tool

Student selects two points.

Render:
- start marker
- end marker
- measurement line
- map distance
- map scale reminder

Depending on mission settings, either:
- show raw map distance and require scale conversion, OR
- show world distance directly

Example:

`Map measurement = 7.5 cm`
`Scale = 1 cm : 12 m`
`Student answer = 90 m`

Store:
- measured pixel coordinates
- displayed/map distance
- student answer
- correct world distance
- tolerance
- attempt count

---

## 6.3 Route Tool

Student clicks to create ordered waypoints.

Render:
- numbered markers
- connecting path
- route direction arrows
- route segment labels

Example:

`ENTRY → MARKET → WEST STAIR → ARCHIVE → BRIDGE → EXTRACTION`

Each segment creates a `RouteSegment`.

Route segments cannot be fully verified until required calculations are complete.

### Route Visual States

- Gray dashed = uncalculated
- Amber dashed = calculation entered but not verified
- Solid = verified
- Red = invalid or blocked
- Pulsing = current execution segment

Do not rely on color alone; include icons/patterns/status text.

---

## 6.4 Route Segment Math

Clicking a segment opens its calculation panel.

Example:

### SEGMENT 3 — COURTYARD TO ARCHIVE

Known:
- distance = 84 m
- planned speed = 1.4 m/s

Required:
- travel time = ?

Student enters answer.

Engine validates with configurable tolerance.

When correct:
- segment becomes verified
- timeline updates automatically

When wrong:
- do not reveal answer immediately
- provide a brief hint
- allow retry
- log attempt

Math verification rules must come from mission JSON, not hard-coded screen logic.

---

## 6.5 Wait Action

Students can intentionally wait at a waypoint.

Example:
`WAIT 35 seconds`

This changes downstream arrival times and patrol alignment.

Render the wait on the timeline.

Waiting should be strategically useful.

---

## 6.6 Pickup / Carry Action

At a target point:

`SECURE ARCHIVE CRATE`

The action can modify:
- movement speed
- total mass
- route access
- risk
- carrying capacity
- required team members

This creates useful math/logistics problems.

---

# 7. OVERLAY SYSTEM

Provide fast toggles.

## Normal
Historical artwork only with basic interactive indicators.

## Route
Show current planned path.

## Measurement
Show:
- scale
- measured lines
- dimensions
- coordinate references when enabled

## Security
Show:
- guard paths
- vision cones
- restricted zones
- gate cycles
- alert zones

## Timeline
Show predicted positions based on selected operation time.

## Logistics
Show:
- bridge load limits
- door widths
- cart capacity
- artifact mass
- equipment constraints

Overlays can be project-configurable.

---

# 8. PATROL / NPC ENGINE

This is a critical reusable system.

## Guard/NPC Data

Each guard should be defined by JSON.

Example:

```json
{
  "id": "guard_north_01",
  "name": "North Tower Guard",
  "spriteKey": "guard",
  "start": { "x": 820, "y": 410 },
  "speed": 55,
  "patrol": [
    { "x": 820, "y": 410, "wait": 2 },
    { "x": 1010, "y": 410, "wait": 4 },
    { "x": 1010, "y": 600, "wait": 2 },
    { "x": 820, "y": 600, "wait": 3 }
  ],
  "vision": {
    "enabled": true,
    "range": 170,
    "angleDeg": 65
  },
  "behavior": "loop"
}
```

## Guard States

Keep the prototype state machine small:

- PATROL
- WAIT
- SUSPICIOUS
- ALERT
- RETURN

Do not build combat/chasing complexity unless required later.

## Vision

Render a translucent view cone in Security Overlay.

Detection should use:
- range
- facing direction
- cone angle
- line-of-sight against configured blocking geometry
- optional grace period

Prototype detection can be deterministic.

This is a math strategy game. Avoid random detection unless the mission explicitly uses probability.

---

# 9. TIMELINE ENGINE

The timeline is central to the game.

## Timeline Must Track

- mission start
- route segment start/end
- WAIT actions
- PICKUP action
- gate open/closed intervals
- patrol checkpoints
- crisis events
- target secured
- extraction
- mission deadline

## Timeline Scrubbing in Plan Mode

Student drags a timeline cursor.

The map should preview:
- operative predicted position
- guard predicted positions
- gate states
- known moving hazards

This lets students ask:

> "Where will the guard be when we reach the courtyard?"

This preview must use the same timing logic as final execution.

Do not make planning-preview math and execution math separate systems.

---

# 10. ACTION COMMAND MODEL

Treat the student plan as a sequence of commands.

Supported MVP commands:

```ts
type PlanAction =
  | MoveAction
  | WaitAction
  | InteractAction
  | PickupAction
  | DropAction
  | ChoiceAction;
```

Example:

```json
[
  {
    "type": "MOVE",
    "from": "entry",
    "to": "market",
    "routeId": "route_entry_market",
    "expectedSeconds": 78
  },
  {
    "type": "WAIT",
    "locationId": "market",
    "seconds": 24
  },
  {
    "type": "MOVE",
    "from": "market",
    "to": "archive",
    "routeId": "route_market_archive",
    "expectedSeconds": 92
  },
  {
    "type": "PICKUP",
    "targetId": "archive_crate"
  }
]
```

The execution engine reads these commands.

This is effectively students **programming an operation using mathematics**.

---

# 11. MATH CONSTRAINT ENGINE

Do not hard-code only distance/time.

Create reusable constraint types.

## MVP Constraint Types

### DISTANCE_SCALE
Map-to-real-world conversion.

### RATE_TIME_DISTANCE
`d = rt`

### CAPACITY
Mass, volume, carrying limit, cargo limit.

### ELAPSED_TIME
Arrival/departure windows.

### PERCENT_CHANGE
Crisis increases/decreases speed, load, time, or cost.

### RATIO_RATE
Route comparisons, travel speed, resource use.

### SIMPLE_EQUATION
Unknown value in operational constraint.

### GEOMETRY_DISTANCE
Coordinate or Pythagorean route calculation where grade-appropriate.

### BUDGET
Optional cost/resource allocation.

### PROBABILITY
Optional; do not use in first prototype unless necessary.

---

# 12. MATH CHALLENGE DATA MODEL

Example:

```json
{
  "id": "calc_route_market_archive",
  "type": "RATE_TIME_DISTANCE",
  "title": "Calculate Archive Arrival Time",
  "prompt": "The route is 126 meters. Your team will travel at 1.5 m/s. How many seconds will the segment take?",
  "inputs": {
    "distance": 126,
    "speed": 1.5
  },
  "answer": {
    "value": 84,
    "tolerance": 0.5,
    "unit": "s"
  },
  "hints": [
    "Use time = distance ÷ speed.",
    "Make sure your answer is in seconds."
  ],
  "skillTags": [
    "unit-rate",
    "rate-time-distance"
  ],
  "requiredForPlanLock": true
}
```

In production, answer keys may eventually move server-side. For prototype work, local mission JSON is acceptable.

---

# 13. HISTORICAL INTELLIGENCE SYSTEM

History provides meaningful constraints.

Intelligence cards can include:
- maps
- blueprints
- letters
- schedules
- artifact information
- architectural diagrams
- road conditions
- historical transport information
- political/military context
- historical technology limits
- primary/secondary source excerpts

Example:

```json
{
  "id": "intel_road_conditions",
  "title": "Market Road Report",
  "type": "document",
  "unlock": "start",
  "body": "Heavy rain has turned the western road muddy. Loaded carts are moving more slowly than normal.",
  "effects": [
    {
      "type": "MODIFY_ROUTE_SPEED",
      "routeId": "western_road",
      "multiplier": 0.7
    }
  ]
}
```

The student should use the history rather than simply read it.

---

# 14. PLAN VALIDATION

The **LOCK PLAN** button remains disabled until required conditions are met.

Example validation:

- entry selected
- target route exists
- extraction route exists
- required route math verified
- required capacity check verified
- all mission-critical actions present
- route does not cross a permanently blocked region
- target pickup included
- final extraction included

Show a concise readiness list:

### OPERATION READINESS
- ✓ Entry route
- ✓ Travel-time calculations
- ✓ Target pickup
- ✓ Extraction route
- ✕ Bridge capacity check
- ✓ Mission under 15:00

Do not hide why the plan cannot be locked.

---

# 15. EXECUTION ENGINE

When the student selects **LOCK PLAN**, save an immutable snapshot of the plan.

Then show:

`PLAN LOCKED`

Transition into Execution Mode.

## Start Sequence

- fade map
- cinematic camera pan to entry
- show mission title
- 3–2–1 countdown
- begin operation clock

## Execution Rules

- operative follows the route automatically
- actual movement derives from mission/game variables
- planned times remain visible for comparison
- guards follow their defined schedules
- doors/gates update
- the system evaluates detection/constraints
- event log records all significant events

## Schedule Indicator

Show:

- `ON SCHEDULE`
- `+00:08 LATE`
- `-00:05 AHEAD`

Use actual elapsed time vs planned elapsed time.

---

# 16. CINEMATIC CAMERA

Use Phaser Cameras to make execution feel dramatically different from planning.

Implement reusable camera commands:

- follow operative
- pan to threat
- zoom to location
- zoom out to tactical overview
- shake lightly on major event
- fade
- flash
- split-screen is NOT required for MVP

Example event:

1. Guard nears courtyard.
2. Camera zooms toward guard.
3. Risk UI pulses.
4. Camera returns to operative.

Keep camera movements brief and readable.

Planning mode should remain mostly stable.
Execution mode can be cinematic.

---

# 17. CRISIS EVENT ENGINE

At least one crisis must occur during the first mission.

Example:

## CART DAMAGE

Original carrying system:
- cart capacity: 90 kg

Crisis:
- usable capacity reduced by 30%

Artifact:
- 68 kg

Student must calculate new capacity and determine whether the cart still works.

### Crisis Behavior

1. Pause execution clock or enter explicit decision pause.
2. Cinematic camera focuses on problem.
3. Display `OPERATION INTERRUPTED`.
4. Open crisis panel.
5. Student completes math.
6. Student chooses from valid responses.
7. Validate.
8. Apply consequences.
9. Record decision.
10. Resume execution.

Example JSON:

```json
{
  "id": "crisis_cart_damage",
  "trigger": {
    "type": "REACH_LOCATION",
    "locationId": "archive_exit"
  },
  "title": "Cart Damage",
  "description": "The cart's carrying capacity has dropped by 30%. Recalculate before continuing.",
  "mathChallengeId": "calc_cart_reduced_capacity",
  "choices": [
    {
      "id": "use_cart",
      "label": "Continue with the cart",
      "condition": "math_supports_choice"
    },
    {
      "id": "carry_by_team",
      "label": "Carry the archive crate",
      "consequence": {
        "speedMultiplier": 0.65
      }
    }
  ]
}
```

---

# 18. FAILURE AND CONSEQUENCES

Failure must be informative and visually meaningful.

Do not display only:
`WRONG`

Possible outcomes:
- missed patrol window
- gate closes before arrival
- route becomes blocked
- crate does not fit
- bridge load exceeded
- deadline missed
- detection meter fills
- wrong extraction point reached

When possible, visually show the consequence.

Then identify the mathematical reason in replay.

Example:

### MISSION FAILED — WEST GATE CLOSED

Predicted arrival: 08:20  
Actual arrival: 09:04  
Gate closed: 08:45  

`Your route was 44 seconds later than the plan predicted.`

Provide a **REVIEW PLAN** option for normal practice mode.

Final challenge mode may restrict retries.

---

# 19. SUCCESS / EXTRACTION

When successful:

- target reaches extraction zone
- use a short camera sequence
- display `TARGET SECURED`
- display final operation summary
- do not immediately dump the student into a text report

Show:

### OPERATION COMPLETE
- Planned time
- Actual time
- Math checks correct
- Crisis response
- Detection events
- Resources remaining
- Route efficiency
- Historical intelligence used

Then allow:
`VIEW REPLAY`

---

# 20. REPLAY ENGINE

Do not attempt full video recording.

Build a deterministic **event-log replay**.

Save:
- plan snapshot
- seed if randomness is ever used
- every action
- action start/end
- calculated values
- actual values
- guard states
- crisis events
- student responses
- success/failure

Example:

```ts
interface ReplayEvent {
  id: string;
  timeMs: number;
  type:
    | 'MOVE_START'
    | 'MOVE_END'
    | 'WAIT'
    | 'NEAR_MISS'
    | 'DETECTED'
    | 'CRISIS'
    | 'MATH_CHECK'
    | 'TARGET_SECURED'
    | 'EXTRACTED'
    | 'FAILED';
  entityIds: string[];
  data: Record<string, unknown>;
}
```

Replay UI:
- play
- pause
- scrub
- jump to event
- speed 0.5x / 1x / 2x
- show calculation panel for selected event

Important events should appear as markers on the timeline.

This replay will later support the student's final presentation/defense.

---

# 21. SCORING

Winning should not equal grade.

The game can calculate a fun mission score from:

- mathematical accuracy
- successful extraction
- time efficiency
- route efficiency
- risk
- resources remaining
- crisis response
- number of revisions

Example game score:

```text
MISSION SUCCESS       1000
MATH ACCURACY          480
ROUTE EFFICIENCY       220
LOW RISK               180
CRISIS RESPONSE        250
TIME BONUS             110
--------------------------
TOTAL                  2240
```

Academic grading remains separate.

Expose useful evidence:
- calculations
- decisions
- results
- replay markers
- final plan

---

# 22. FIRST MISSION — MEDIEVAL CASTLE ARCHIVE RESCUE

Build enough content to prove the engine.

## Mission

Recover an archive crate containing a treaty and records before the castle enters lockdown.

## Map Nodes

Required:
- entry
- market courtyard
- west gate
- north tower
- inner hall
- archive room
- bridge
- river exit

## NPCs

At least:
- Guard A: courtyard loop
- Guard B: gate loop
- Guard C: archive hallway loop

## Target

`archive_crate`

Properties:
- mass
- dimensions
- pickup time
- carry-speed modifier

## Required Math

At least:
1. scale distance
2. rate/time/distance
3. elapsed time/patrol window
4. carrying capacity
5. crisis percent change

## Required History

At least:
- castle map/architecture context
- medieval transport/logistics fact
- gate/patrol context framed as fictionalized project intelligence
- archive/treaty context

Do not claim fictional mission details are real historical facts.
Clearly distinguish:
- historical context
- game scenario data

---

# 23. PROJECT DATA MODEL

Create reusable mission files.

Recommended directory:

```text
src/
  game/
    config/
    core/
    scenes/
    systems/
    entities/
    ui/
    adapters/
    types/
  missions/
    medieval-castle/
      mission.json
      locations.json
      routes.json
      guards.json
      math.json
      intelligence.json
      events.json
      theme.json
  assets/
    shared/
    medieval-castle/
```

## MissionConfig

```ts
interface MissionConfig {
  id: string;
  title: string;
  subtitle: string;
  gradeBand: string;
  primarySubject: 'math';
  supportingSubjects: string[];
  map: MapConfig;
  target: TargetConfig;
  entryLocationIds: string[];
  extractionLocationIds: string[];
  missionDeadlineSeconds: number;
  enabledOverlays: OverlayType[];
  requiredMathChallengeIds: string[];
  crisisEventIds: string[];
  scoring: ScoringConfig;
  theme: ThemeConfig;
}
```

Do not place mission-specific values deep inside Phaser scene code.

---

# 24. PHASER SCENE ARCHITECTURE

Recommended:

```text
BootScene
PreloadScene
MissionScene
ReplayScene
```

Do not create a separate Phaser Scene for every panel.

## BootScene
- initialize services
- parse URL/config
- establish game dimensions
- initialize state

## PreloadScene
- load shared assets
- load mission assets
- show real loading progress

## MissionScene
Contains:
- map
- entities
- patrols
- planning
- execution
- game overlays

Use systems/classes rather than one giant scene file.

## ReplayScene
Reconstructs mission from:
- plan snapshot
- mission config
- replay events

---

# 25. CORE SYSTEM CLASSES

Create focused systems.

Suggested:

```text
MissionManager
MapManager
LocationManager
RoutePlanner
MeasurementSystem
MathChallengeSystem
TimelineSystem
PatrolSystem
VisionSystem
PlanValidator
ExecutionController
CrisisEventSystem
ReplayRecorder
ReplayController
CameraDirector
OverlayManager
GameStateStore
AudioManager
```

Rules:
- avoid God classes
- systems communicate with typed events
- keep UI separate from simulation logic
- mission data remains declarative

---

# 26. GAME STATE MACHINE

Use a clear top-level state:

```ts
type MissionMode =
  | 'BRIEFING'
  | 'RECON'
  | 'PLANNING'
  | 'PLAN_LOCKED'
  | 'EXECUTING'
  | 'CRISIS'
  | 'SUCCESS'
  | 'FAILURE'
  | 'REPLAY';
```

Only allowed controls should work in each state.

Prevent accidental route editing during execution.

---

# 27. EVENT BUS

Use a typed event bus.

Example events:

```text
MISSION_LOADED
LOCATION_SELECTED
INTEL_OPENED
MEASUREMENT_CREATED
WAYPOINT_ADDED
ROUTE_UPDATED
MATH_ATTEMPTED
MATH_VERIFIED
PLAN_VALIDATION_CHANGED
PLAN_LOCKED
EXECUTION_STARTED
ACTION_STARTED
ACTION_COMPLETED
GUARD_STATE_CHANGED
DETECTION_CHANGED
CRISIS_TRIGGERED
CRISIS_RESOLVED
TARGET_SECURED
MISSION_SUCCESS
MISSION_FAILED
REPLAY_EVENT_SELECTED
```

Avoid direct cross-component mutation where possible.

---

# 28. UI IMPLEMENTATION RULE

Use Phaser for:
- map
- characters
- routes
- overlays
- world labels
- animated alerts
- camera effects
- execution visuals

Use HTML/CSS overlay UI when it is better for:
- math input fields
- longer intelligence text
- accessible forms
- buttons
- calculation panels
- detailed timeline controls
- keyboard navigation

Do not force all text/form UI into Phaser Canvas.

Create a clean bridge between HTML UI state and Phaser game state.

---

# 29. ACCESSIBILITY

Required:
- large readable text
- keyboard-accessible math inputs
- no essential information communicated only by color
- reduced-motion setting
- mute/audio setting
- pause available outside final locked challenge
- tooltips or labels on icons
- strong contrast
- clear focus states
- optional route labels
- optional security-cone opacity control

Student age range may include grades 4–8.

Keep instructions short and chunked.

---

# 30. RESPONSIVE TARGETS

Primary:
- Chromebook/laptop
- 1366×768
- 1440×900
- 1920×1080

Must remain usable at approximately 1024×700.

Tablet support is desirable but not MVP-critical.

Do not optimize for phone play in the first build.

Use Phaser scale manager appropriately.

---

# 31. PERFORMANCE

Target smooth play on average school Chromebooks.

Guidelines:
- use compressed WebP/AVIF where supported for large background art
- use sprite atlases for animated characters
- avoid dozens of huge transparent textures
- lazy-load mission-specific assets
- keep world object count reasonable
- avoid per-frame allocations in core update loops
- only render measurement/security overlays when enabled
- use object pooling for repeated effects if needed
- do not load assets for other missions

The Project Hub should not preload the Phaser game.
Load it only when student launches the activity.

---

# 32. SAVE / PERSISTENCE

Prototype:
- localStorage or IndexedDB

Save:
- mission ID
- unlocked intelligence
- current plan
- measurements
- verified math
- current planning state
- settings

Execution:
- create locked plan snapshot
- save replay log when mission ends

Later LMS integration should replace persistence through an adapter.

Do not couple game logic directly to Firebase or any one backend.

---

# 33. LMS ADAPTER

Create an interface now even if it initially uses mock/local data.

```ts
interface HeistLmsAdapter {
  loadMission(missionId: string): Promise<MissionConfig>;
  loadStudentState(): Promise<StudentHeistState | null>;
  saveStudentState(state: StudentHeistState): Promise<void>;
  recordMathEvidence(evidence: MathEvidence): Promise<void>;
  recordTrial(result: MissionTrialResult): Promise<void>;
  submitFinalEvidence(evidence: FinalHeistEvidence): Promise<void>;
}
```

Create:
- `LocalHeistAdapter` for prototype
- leave room for future `LmsHeistAdapter`

Do not build Firebase logic unless the surrounding repository already has an established adapter/service to use.

---

# 34. TEACHER CONTROL — PROTOTYPE

Do not build a full teacher dashboard yet.

Build a hidden/dev teacher drawer toggled with a configurable key or dev button.

Controls:
- pause/resume
- trigger crisis
- reveal intelligence card
- set timeline time in planning preview
- toggle guard routes
- toggle vision cones
- force success/failure for testing
- reset mission

This proves the control hooks required later.

Teacher control actions should go through the same event system as automatic events.

---

# 35. AUDIO

Optional but recommended for polish.

Use restrained:
- ambient castle sound
- soft planning music
- timeline clicks
- confirmation sound
- warning cue
- crisis sting
- extraction/success cue

Requirements:
- mute toggle
- default volume reasonable
- no autoplay problems
- no audio required to understand gameplay

---

# 36. VISUAL FEEDBACK

Important interactions should feel satisfying.

Examples:

### Correct Math
- small confirmation animation
- route segment becomes verified
- soft sound
- timeline recalculates

### Invalid Route
- segment shakes or pulses
- clear reason appears

### New Intelligence
- envelope/document animation
- brief camera/UI emphasis

### Crisis
- short screen vignette
- `OPERATION INTERRUPTED`
- camera pan
- no excessive flashing

### Near Miss
- slow camera zoom
- timeline emphasizes clearance window
- display calculated margin

Example:
`CLEARANCE: 4.8 s`

---

# 37. NEAR-MISS SYSTEM

Add a reusable near-miss detector.

A near miss occurs when the operative passes a dangerous patrol/window within a configurable time/distance threshold without being detected.

Example:
- operative clears corridor
- guard reaches same crossing 3.4 seconds later

Record:
- event time
- clearance
- location
- related route segment

Use in replay.

This makes correct timing math visibly exciting.

---

# 38. PRACTICE VS FINAL CHALLENGE MODE

Create config:

```ts
type ChallengeMode = 'practice' | 'final';
```

## Practice
- unlimited plan edits
- retry mission
- review failure
- hints available
- crisis can be retried

## Final
- plan locks
- configurable official attempt count
- hints reduced/disabled
- trial result saved
- replay evidence retained
- teacher may reset/authorize another attempt

Do not build grading logic into this mode.

---

# 39. THEME SYSTEM

The engine must support theme changes without rewriting systems.

Example:

```json
{
  "id": "medieval",
  "uiTexture": "parchment",
  "fontStyle": "historical-readable",
  "mapLighting": "warm",
  "routeStyle": "ink",
  "alertStyle": "wax-seal-red",
  "panelStyle": "wood-parchment"
}
```

Later themes:
- Ancient Egypt
- Revolutionary War
- Renaissance
- Silk Road
- WWII intelligence
- museum/archive

Do not bake medieval graphics into shared system code.

---

# 40. ASSET PLACEHOLDERS

If final art is unavailable:

Use clearly named placeholders and keep asset swapping easy.

Example:

```text
assets/medieval-castle/map/castle-map-placeholder.webp
assets/medieval-castle/characters/operative.png
assets/medieval-castle/characters/guard.png
assets/medieval-castle/objects/archive-crate.png
```

Do not spend excessive time drawing permanent art in code.

For prototype polish, simple stylized generated or licensed assets are acceptable if licensing permits deployment.

---

# 41. DEVELOPMENT PHASES

## PHASE 1 — CORE MAP PROTOTYPE

Build:
- Phaser boot
- map render
- pan/zoom
- hotspots
- one operative
- one guard
- one patrol
- security cone
- basic UI
- route drawing

Success test:
Student can inspect map, draw route, and see guard patrol.

---

## PHASE 2 — MATH PLANNING

Build:
- measurement tool
- route segments
- math challenges
- route verification states
- timeline generation
- wait actions
- plan validator

Success test:
Student cannot lock plan until required math validates.

---

## PHASE 3 — EXECUTION

Build:
- plan locking
- automatic movement
- patrol synchronization
- operation clock
- schedule comparison
- collision/detection
- success/failure
- camera director

Success test:
Same plan previewed in planning produces the same timing in execution.

---

## PHASE 4 — CRISIS + EXTRACTION

Build:
- crisis trigger
- crisis math
- response choice
- consequences
- target pickup
- extraction sequence

Success test:
Mission can be completed end-to-end.

---

## PHASE 5 — REPLAY

Build:
- ReplayRecorder
- event markers
- ReplayScene
- scrub/jump controls
- calculation evidence
- planned vs actual display

Success test:
Student can replay the important mathematical decisions.

---

## PHASE 6 — DATA DRIVEN / REUSABLE

Move all mission-specific content into mission files.

Success test:
Create a second tiny test mission with different map nodes/guards/math without changing engine code.

The second mission does not need polished art.

---

## PHASE 7 — POLISH

Add:
- animations
- audio
- near misses
- better transitions
- accessibility
- responsive fixes
- performance pass
- teacher dev controls

---

# 42. FILE STRUCTURE

Recommended:

```text
src/
  main.ts

  game/
    HeistGame.ts

    config/
      phaser.config.ts
      constants.ts

    scenes/
      BootScene.ts
      PreloadScene.ts
      MissionScene.ts
      ReplayScene.ts

    systems/
      MissionManager.ts
      MapManager.ts
      RoutePlanner.ts
      MeasurementSystem.ts
      MathChallengeSystem.ts
      TimelineSystem.ts
      PatrolSystem.ts
      VisionSystem.ts
      PlanValidator.ts
      ExecutionController.ts
      CrisisEventSystem.ts
      ReplayRecorder.ts
      ReplayController.ts
      CameraDirector.ts
      OverlayManager.ts
      AudioManager.ts

    entities/
      Operative.ts
      Guard.ts
      Target.ts
      InteractiveLocation.ts

    ui/
      GameHud.ts
      ToolRail.ts
      TimelineView.ts
      DetailPanel.ts
      MathPanel.ts
      CrisisPanel.ts
      ResultsPanel.ts

    adapters/
      HeistLmsAdapter.ts
      LocalHeistAdapter.ts

    state/
      GameStateStore.ts

    events/
      GameEventBus.ts
      event-types.ts

    types/
      mission.ts
      plan.ts
      math.ts
      replay.ts
      entities.ts

  missions/
    medieval-castle/
      mission.json
      locations.json
      routes.json
      guards.json
      math.json
      intelligence.json
      events.json
      theme.json

  assets/
    shared/
    medieval-castle/

  styles/
    heist.css

tests/
  route-planner.test.ts
  timeline.test.ts
  plan-validator.test.ts
  math-validation.test.ts
  replay.test.ts
```

Adjust to existing repository conventions rather than forcing this exact structure if equivalent organization already exists.

---

# 43. TESTS

Automated tests are especially important for calculation/timeline consistency.

Required unit tests:

## Timeline
- move duration calculated correctly
- waits shift later actions
- pickup modifier affects later movement
- crisis modifier affects later movement
- predicted total equals execution total when no crisis occurs

## Plan Validator
- missing extraction fails
- missing target pickup fails
- unverified required math fails
- valid plan passes

## Math
- tolerance works
- units handled correctly
- percent-change problem works
- rate/time/distance works

## Replay
- events sorted chronologically
- plan snapshot remains unchanged
- failure event recorded
- success event recorded

Do not attempt pixel-perfect rendering tests for MVP.

---

# 44. DEBUG MODE

Add URL or config debug mode.

Example:
`?heistDebug=true`

Debug overlay may show:
- FPS
- entity IDs
- guard facing
- vision bounds
- route node coordinates
- current mission mode
- timeline time
- current plan action
- collision geometry

Debug visuals must be off for normal students.

---

# 45. DEFINITION OF DONE — MVP

The MVP is complete when:

1. A student can open the Medieval Castle Archive Rescue.
2. The map looks like a game, not a form.
3. Student can pan/zoom and inspect locations.
4. Three guards patrol visibly.
5. Security overlay displays patrols and vision.
6. Student can measure at least one route.
7. Student can create a multi-segment route.
8. Route segments require math validation.
9. Timeline shows planned arrivals.
10. Student can add a strategic wait.
11. Timeline scrubbing previews patrol positions.
12. Plan cannot lock until required math is complete.
13. Locked plan executes automatically.
14. Operative and guards move in synchronization.
15. At least one near miss can occur.
16. At least one crisis interrupts execution.
17. Crisis requires math and a decision.
18. Student can secure the target.
19. Student can succeed or fail extraction.
20. Results show planned vs actual performance.
21. Replay can jump to major events.
22. Mission data is separate from engine code.
23. Core calculation/timeline tests pass.
24. No backend is required to test locally.
25. App runs smoothly on a typical Chromebook/laptop.

---

# 46. NON-GOALS FOR FIRST BUILD

Do not build yet:
- free-roaming player controls
- combat
- weapons
- inventory-grid system
- character customization
- procedural maps
- full multiplayer
- chat
- voice
- real-time team concurrency
- Firebase schema
- full teacher dashboard
- grading system
- AI tutor
- AI NPCs
- true 3D
- complex character skeletal animation
- full project authoring UI
- map editor

Build the game loop first.

---

# 47. CODEX WORKING RULES

Codex should:

1. Inspect the repository before modifying architecture.
2. Preserve existing working functionality.
3. Use TypeScript strictly.
4. Prefer small focused classes/functions.
5. Keep mission content data-driven.
6. Avoid giant scene files.
7. Do not hard-code DOM IDs throughout systems.
8. Use one source of truth for operation time.
9. Use one source of truth for route calculation.
10. Reuse the same simulation logic for planning preview and execution.
11. Keep game simulation deterministic unless mission config explicitly enables randomness.
12. Comment WHY when game/education logic is not obvious.
13. Do not use placeholder TODOs for core MVP behaviors.
14. Do not silently fake features described as working.
15. If an advanced visual effect blocks progress, implement a simpler correct version first.
16. Run tests/build after meaningful changes.
17. Fix TypeScript/build errors before moving to cosmetic polish.
18. Keep assets replaceable.
19. Keep backend integration behind adapters.
20. Optimize for a reusable educational engine, not a one-off castle demo.

---

# 48. FIRST CODEX IMPLEMENTATION ORDER

Codex should execute work in this order:

### Step 1
Inspect existing repository and document:
- framework
- build system
- Phaser version if present
- existing game/simulation architecture
- existing styling conventions
- existing storage/adapters

### Step 2
Install/add Phaser only if not already present.

### Step 3
Build minimal Phaser host and render the mission map.

### Step 4
Implement camera pan/zoom and interactive locations.

### Step 5
Implement Guard + PatrolSystem + Security Overlay.

### Step 6
Implement RoutePlanner.

### Step 7
Implement MeasurementSystem and first math challenge.

### Step 8
Implement TimelineSystem and plan preview.

### Step 9
Implement PlanValidator and LOCK PLAN.

### Step 10
Implement ExecutionController.

### Step 11
Add remaining guards, target, and extraction.

### Step 12
Implement crisis.

### Step 13
Implement results and ReplayRecorder.

### Step 14
Implement ReplayScene.

### Step 15
Move remaining hard-coded mission content into JSON/config.

### Step 16
Add tests, accessibility, responsive layout, and polish.

Do not jump to a full project builder before this sequence works.

---

# 49. DESIGN PRINCIPLE TO PROTECT

The most important design principle is:

> **The mathematics should control the choreography of the mission.**

Students should be able to visibly see that:
- a distance calculation changed arrival time
- a wait avoided a patrol
- a wrong rate caused a gate to close
- a capacity calculation changed transportation
- a percent change during a crisis forced a new decision
- a better mathematical model created a better operation

If the student can ignore the math and still complete the mission, the game design has failed.

---

# 50. FUTURE EXTENSIONS AFTER MVP

Only after the core engine works:

## Grade Variants

### Grade 4
- four operations
- elapsed time
- measurement
- fractions
- estimation

### Grade 5
- decimals
- coordinate grid
- volume/capacity
- unit conversion
- rates

### Grade 6
- ratios
- rational numbers
- equations
- area/volume
- inequalities

### Grade 7
- proportional relationships
- percent
- equations
- probability
- scale

### Grade 8
- linear relationships
- systems
- transformations
- Pythagorean theorem
- functions

## Historical Themes
Swap:
- map art
- NPC sprites
- intelligence
- historical facts
- route constraints
- target
- math configuration

Keep the engine.

## Team Mode
Later:
- students hold roles
- individual expert knowledge
- shared plan
- contribution log
- teacher-controlled crisis release

## Live Class Final
Later:
- teams execute simultaneously
- teacher event control
- class leaderboard
- projected mission map
- post-mission replay defense

---

# FINAL CODEX INSTRUCTION

Build the first version as a **working game prototype**, not a slideshow or wireframe.

The student must be able to actually:
- inspect
- measure
- calculate
- draw a route
- synchronize with guards
- lock the plan
- watch it execute
- solve a crisis
- extract the target
- replay the operation

Use polished placeholder assets when needed, but prioritize **working interaction + reusable architecture + clear game feel**.

The finished prototype should make a student feel:

> “We planned this operation, our math controlled what happened, and now we get to watch whether our plan actually works.”


---

# PART II — ACADEMIC LOCK SYSTEM AND VISUAL INTERACTIONS

## Purpose

Build a reusable **Academic Lock System** for the Phaser.js Heist Project.

The goal is to make academic work feel like manipulating the game world rather than answering a worksheet.

Students should interact with:
- dials
- levers
- gears
- blocks
- maps
- evidence boards
- gauges
- timelines
- cargo
- graphs
- pressure plates
- vault mechanisms

The same underlying lock engine must support both:
- Math-focused Heist projects
- Social Studies-focused Heist projects

The visual interaction should change while the academic logic remains reusable.

---

# 1. Core Design Rule

Every lock should require the student to do one or more of the following:

- **SET** a value
- **ROTATE** an object
- **ARRANGE** an order
- **PLACE** an object
- **CONNECT** evidence
- **MEASURE** something
- **CHOOSE** the best option
- **ASSEMBLE** a mechanism

Avoid defaulting to:

> read prompt → type answer → click submit

Typing may still be used when appropriate, but environmental manipulation should be preferred.

---

# 2. Top 10 Reusable Academic Lock Engines

Build these as the primary reusable lock types.

1. Numeric / Equation Lock
2. Sequence / Ordering Lock
3. Map / Position Lock
4. Match / Classification Lock
5. Evidence / Source Lock
6. Measurement / Scale Lock
7. Constraint / Optimization Lock
8. Graph / Data Lock
9. Cause / Decision Lock
10. Master Combination Lock

Each lock engine can have multiple **visual shells**.

---

# 3. Lock Engine 1 — Numeric / Equation Lock

## Core Academic Purpose

Student calculates or solves for a numeric value.

Can support:
- whole numbers
- decimals
- fractions
- percents
- ratios
- unit rates
- equations
- area
- perimeter
- volume
- elapsed time
- slope
- angle
- dates
- historical quantities

## Visual Variety A — Combo Dial

Student rotates numbered wheels.

Example:
- answer = 384
- student rotates three dials to 3–8–4

Possible skins:
- vault
- temple stone rings
- medieval iron lock
- ship wheel
- archive safe
- mechanical code cylinder

## Visual Variety B — Rotating Degree Dial

This should be a major math-learning interaction.

Student rotates a circular dial to a specific angle.

Examples:
- rotate to 45°
- rotate to 90°
- rotate to 135°
- rotate to 180°
- rotate to 270°

Use:
- geometry
- angles
- rotations
- bearings
- compass direction
- transformations
- fractions of a circle

### Visual Design

The dial should show:
- center pivot
- directional pointer
- degree ticks
- major labels every 30° or 45°
- optional minor ticks every 5° or 10°
- current rotation readout
- target indicator only when configured

### Student Interaction

- click/touch and drag around pivot
- dial rotates continuously
- release to snap when enabled
- current angle updates live

### Configurable Modes

#### Exact Angle Mode
Student must rotate to a specified angle.

Example:
`Set the dial to 120°.`

#### Solve Then Rotate Mode
Student solves:
`3 × 40° = ?`

Then rotates to 120°.

#### Fraction of Circle Mode
Prompt:
`Rotate the dial 3/4 of a full turn.`

Correct:
270°

#### Transformation Mode
Prompt:
`Rotate the shape 90° clockwise.`

Student physically rotates object.

#### Compass Bearing Mode
Prompt:
`Set the heading to 225°.`

Can support geography/history navigation.

## Rotation Math Rules

Phaser rotations are typically stored in radians.

Use:

```ts
degrees = radians * (180 / Math.PI)
```

and:

```ts
radians = degrees * (Math.PI / 180)
```

Normalize:

```ts
normalizedDegrees = ((degrees % 360) + 360) % 360
```

For clockwise/counterclockwise problems, do not rely only on raw Phaser angle sign.

Store explicit:
- startAngleDeg
- targetAngleDeg
- direction
- rotationAmountDeg

Example:

```ts
interface RotationLockConfig {
  startAngleDeg: number;
  targetAngleDeg: number;
  toleranceDeg: number;
  snapIncrementDeg?: number;
  direction?: 'clockwise' | 'counterclockwise' | 'either';
  showDegreeLabels: boolean;
  showLiveReadout: boolean;
}
```

## Angular Distance Validation

Use shortest angular difference.

Example:

```ts
function angularDifference(a: number, b: number): number {
  const diff = Math.abs(((a - b + 180) % 360) - 180);
  return Math.abs(diff);
}
```

Correct when:

```ts
angularDifference(current, target) <= tolerance
```

Do not compare raw values because 359° and 1° are only 2° apart.

## Visual Variety C — Lever Angle Lock

Instead of a circle, use a physical lever.

Student rotates lever to:
- 30°
- 45°
- 60°
- 90°
- etc.

Possible uses:
- raise portcullis
- align counterweight
- set navigation rudder
- control sluice gate
- align telescope

## Visual Variety D — Gear Rotation Lock

Student rotates one gear and predicts another gear's rotation.

Possible math:
- angle rotation
- ratio
- direction
- proportional reasoning

Example:
- gear A rotates 90°
- gear B is twice the size
- determine B's rotation

## Visual Variety E — Clock Face Lock

Student sets:
- time
- elapsed time
- fraction of circle
- angle between hands

Can support:
- math
- historical schedules
- patrol timing

## Visual Variety F — Gauge Lock

Student rotates needle to a computed value.

Examples:
- speed
- pressure
- percent
- probability
- capacity
- population level

---

# 4. Lock Engine 2 — Sequence / Ordering Lock

## Core Academic Purpose

Student places information in correct order.

Supports:
- chronology
- least to greatest
- greatest to least
- steps in a solution
- cause/effect chains
- historical events
- procedures
- stages in a process

## Visual Variety A — Timeline Rail

Drag event cards along a horizontal timeline.

Possible uses:
- historical chronology
- number ordering
- sequence of operations
- geologic eras
- project steps

## Visual Variety B — Rotating Cylinder Lock

Multiple cylinders rotate vertically or horizontally.

Each cylinder displays:
- event
- value
- symbol
- vocabulary word

Student rotates until correct sequence appears.

## Visual Variety C — Archive Shelf

Drag:
- scrolls
- books
- ledgers
- files

onto shelf in correct order.

Excellent for Social Studies.

## Visual Variety D — Floor Tile Sequence

Student presses or steps on tiles in order.

Can be used for:
- fractions
- numerical sequence
- chronological events
- operation sequence

## Visual Variety E — Gear Train Sequence

Student places gears in correct sequence.

Each gear can represent:
- number
- event
- operation
- step

When correct, machine turns.

## Visual Variety F — Cause Domino Chain

Place tiles so each cause leads to next consequence.

Excellent for history.

---

# 5. Lock Engine 3 — Map / Position Lock

## Core Academic Purpose

Student identifies or places a location.

Supports:
- coordinates
- map scale
- latitude/longitude
- compass direction
- routes
- historical regions
- trade networks
- geographic features

## Visual Variety A — Map Pin

Drag marker to correct location.

## Visual Variety B — Coordinate Grid

Move object to exact:
`(x, y)`

## Visual Variety C — Rotating Compass

Student rotates compass or arrow to:
- cardinal direction
- bearing
- degree heading

### Math Integration

Use rotation-to-degree logic.

Examples:
- East = 90°
- South = 180°
- West = 270°

Prompt:
`Rotate to 135°.`

or:

`Turn 90° clockwise from North.`

## Visual Variety D — Route Tracer

Student draws route through map.

Can validate:
- required checkpoints
- length
- restricted areas
- route order

## Visual Variety E — Sliding Map Tiles

Reassemble map.

Then use completed map to answer next task.

## Visual Variety F — Beacon Placement

Place signal points at correct coordinates or historical locations.

---

# 6. Lock Engine 4 — Match / Classification Lock

## Core Academic Purpose

Student matches or categorizes information.

Supports:
- graph ↔ equation
- artifact ↔ civilization
- person ↔ event
- cause ↔ effect
- term ↔ definition
- good ↔ trade region
- shape ↔ property

## Visual Variety A — Artifact Cases

Drag objects into correct display case.

## Visual Variety B — Wire Connector

Draw lines between matching nodes.

Examples:
- claim → evidence
- equation → graph
- person → event

## Visual Variety C — Trade Crate Sort

Sort goods into labeled destinations.

## Visual Variety D — Archive Drawer Sort

Place documents into correct drawers.

## Visual Variety E — Pedestal Match

Place object on correct pedestal.

When correct:
- pedestal lights
- mechanism activates

---

# 7. Lock Engine 5 — Evidence / Source Lock

## Core Academic Purpose

Student reasons from evidence.

Supports:
- primary vs secondary
- credibility
- corroboration
- contradiction
- bias
- perspective
- missing voice
- claim/evidence reasoning

## Visual Variety A — Evidence Board

Drag evidence cards.

Connect with string/lines.

Possible categories:
- SUPPORTS
- CONTRADICTS
- UNCERTAIN

## Visual Variety B — Credibility Stamp

Student stamps:
- PRIMARY
- SECONDARY
- RELIABLE
- QUESTIONABLE
- BIASED

## Visual Variety C — Corroboration Pair

Select two sources that independently support same conclusion.

## Visual Variety D — Source Ranking Shelf

Drag sources from:
strongest evidence → weakest evidence.

## Visual Variety E — Missing Perspective Seats

Show historical council/table.

Student selects which stakeholder or group is missing.

## Visual Variety F — Forgery / Anachronism Scanner

Inspect items and identify:
- anachronism
- suspicious claim
- inconsistent date
- unsupported evidence

---

# 8. Lock Engine 6 — Measurement / Scale Lock

## Core Academic Purpose

Student measures the environment itself.

Supports:
- length
- distance
- angle
- area
- perimeter
- scale
- proportion
- coordinate distance

## Visual Variety A — Drag Ruler

Move ruler over map/object.

## Visual Variety B — Tape Measure

Click start/end points.

## Visual Variety C — Protractor Lock

Student positions protractor and measures angle.

## Visual Variety D — Rotating Angle Arm

Two arms form an angle.

Student rotates one arm to:
- measured angle
- calculated angle
- complementary/supplementary target

### Example

Prompt:
`The gate must open 35° beyond a right angle.`

Student calculates:
`90° + 35° = 125°`

Then physically rotates arm to 125°.

This combines calculation + manipulation.

## Visual Variety E — Blueprint Scale Overlay

Measure drawing and convert scale.

## Visual Variety F — Shadow / Sun Angle Lock

Use shadow length or sun angle.

Student may:
- rotate sun direction
- measure shadow
- determine angle
- compare time/day positions

## Visual Variety G — Crate Fit

Measure:
- crate
- doorway

Determine if it fits.

---

# 9. Lock Engine 7 — Constraint / Optimization Lock

## Core Academic Purpose

Student creates a solution satisfying several conditions.

Supports:
- inequalities
- optimization
- budget
- weight
- capacity
- route efficiency
- trade
- resource allocation

## Visual Variety A — Cargo Packing

Drag items into cart/crate.

Live meters:
- mass
- volume
- value

## Visual Variety B — Bridge Load

Place items on bridge.

Must remain under load limit.

## Visual Variety C — Budget Board

Drag coins/tokens to purchases.

Must satisfy:
- budget
- required items
- resource constraints

## Visual Variety D — Route Optimization

Choose or construct route.

Metrics:
- time
- risk
- distance
- cost

## Visual Variety E — Multi-Lever Constraint Panel

Several levers control:
- speed
- load
- cost
- risk

Student must position all indicators inside valid ranges.

This can teach inequalities visually.

## Visual Variety F — Balance Machine

Adjust weights/levers until multiple conditions are satisfied.

---

# 10. Lock Engine 8 — Graph / Data Lock

## Core Academic Purpose

Student reads or manipulates data.

Supports:
- graphs
- tables
- mean
- median
- range
- scatterplots
- trends
- relative frequency
- predictions

## Visual Variety A — Point Plotter

Drag points to coordinates.

## Visual Variety B — Bar Height Controls

Raise/lower bars.

## Visual Variety C — Trend Line

Rotate and position line of best fit.

### Rotation Integration

Student rotates trend line to correct slope direction.

Can later calculate slope.

## Visual Variety D — Graph Match

Rotate selector or move lever to graph that matches scenario.

## Visual Variety E — Data Gauge

Set:
- mean
- median
- range

with dials.

## Visual Variety F — Missing Table Tiles

Drag correct data tiles into empty cells.

---

# 11. Lock Engine 9 — Cause / Decision Lock

## Core Academic Purpose

Student selects the best conclusion or action.

Supports:
- cause/effect
- stakeholder analysis
- policy
- historical decision-making
- evidence-based choice
- route choice

## Visual Variety A — Branching Doors

Each door represents a possible conclusion.

## Visual Variety B — Council Lever Panel

Pull lever for selected decision.

## Visual Variety C — Policy Seal

Stamp chosen policy or claim.

## Visual Variety D — Cause/Effect Gear Pair

Rotate gears until correct cause aligns with consequence.

## Visual Variety E — Risk/Reward Sliders

Move sliders to compare choices.

## Visual Variety F — Stakeholder Wheel

Rotate wheel to correct stakeholder/group.

Rotation mechanic can require exact sector or degree.

---

# 12. Lock Engine 10 — Master Combination Lock

## Core Academic Purpose

Use results collected from earlier locks.

This should be the signature final mechanism.

## Visual Variety A — Multi-Dial Vault

Four or more rotating dials.

Each value came from earlier work.

## Visual Variety B — Concentric Rotation Rings

Several rings rotate independently.

Each ring might represent:
- year
- direction
- angle
- number
- symbol
- location

Example:
- Outer ring = 180°
- Middle ring = symbol from evidence
- Inner ring = 45°
- Center = code 7

When all align:
vault opens.

## Visual Variety C — Artifact Socket Lock

Place collected pieces into correct positions.

## Visual Variety D — Clockwork Core

Insert gears, then rotate each to exact alignment.

## Visual Variety E — Multi-Stage Vault

Stage 1:
rotation angle

Stage 2:
sequence

Stage 3:
evidence selection

Stage 4:
numeric code

---

# 13. Rotation-to-Degree Learning System

Rotation should be treated as a reusable academic mechanic, not only a visual animation.

Create a shared:

`RotationInteractionSystem`

## Supported Rotation Objects

- dial
- lever
- gear
- compass
- clock hand
- map arrow
- shape
- trend line
- telescope
- bridge mechanism
- valve
- ring
- wheel

## Learning Modes

### Mode 1 — Direct Degree

Prompt:
`Rotate the lever to 60°.`

### Mode 2 — Solve Then Rotate

Prompt:
`A right angle plus 35° equals what angle?`

Student solves:
125°

Then rotates object to 125°.

### Mode 3 — Fraction of Full Rotation

Prompt:
`Rotate 3/8 of a full turn.`

Calculation:
360 × 3/8 = 135°

Then rotate to 135°.

### Mode 4 — Clockwise / Counterclockwise

Prompt:
`Rotate 120° counterclockwise from East.`

Student must reason:
- starting angle
- direction
- final angle

### Mode 5 — Complementary Angle

Prompt:
`The two levers must form a right angle. Lever A is at 32°. Set Lever B.`

### Mode 6 — Supplementary Angle

Prompt:
`The two gate arms must form a straight line. One is at 68°. Set the other.`

### Mode 7 — Transformation Rotation

Rotate:
- triangle
- map symbol
- tile
- shape

around a pivot.

Examples:
- 90° clockwise
- 180°
- 270° counterclockwise

### Mode 8 — Bearing

Use 0°/360° as North.

Typical navigation:
- North = 0°
- East = 90°
- South = 180°
- West = 270°

Supports:
- map skills
- geography
- route planning

### Mode 9 — Gear Ratio Rotation

Later extension.

Example:
- Gear A turns 120°
- Gear B has twice the radius
- determine Gear B movement

### Mode 10 — Unknown Rotation

Student compares start/end orientation and calculates how many degrees object moved.

---

# 14. Rotation UI Feedback

While dragging, optionally show:

`ANGLE: 127°`

or hide number for harder modes.

Config:

```ts
interface RotationInteractionConfig {
  startAngleDeg: number;
  targetAngleDeg?: number;
  toleranceDeg: number;

  directionMode:
    | 'either'
    | 'clockwise'
    | 'counterclockwise';

  snapIncrementDeg?: number;

  showTicks: boolean;
  tickIncrementDeg?: number;

  showMajorLabels: boolean;
  majorLabelIncrementDeg?: number;

  showCurrentAngle: boolean;
  showTargetAngle: boolean;

  limitRotation?: {
    minDeg: number;
    maxDeg: number;
  };
}
```

---

# 15. Rotation Difficulty Levels

## Beginner
- labels every 45°
- snap every 15°
- current angle visible
- ±5° tolerance

## Intermediate
- labels every 30°
- minor ticks every 10°
- current angle visible
- ±3° tolerance

## Advanced
- sparse labels
- no current angle
- student estimates/uses reasoning
- ±2° tolerance

## Transformation Mode
- exact common rotations:
  - 90°
  - 180°
  - 270°

---

# 16. Environmental Rotation Examples

## Medieval Castle
- rotate portcullis control lever
- align drawbridge gear
- rotate archive combination rings
- turn map compass
- align signal mirror

## Ancient Temple
- rotate stone rings
- align sun disk
- turn columns
- rotate symbol tiles
- align shadow marker

## Revolutionary War
- rotate compass bearing
- align signal flag dial
- set clock
- rotate map direction arrow

## Silk Road
- compass heading
- trade-route dial
- balance arm
- celestial navigation dial

---

# 17. Environmental Manipulation Library

The Academic Lock System should support reusable interaction shells.

Build these first:

1. Combo Dial
2. Rotation Dial
3. Lever
4. Gear
5. Clock Face
6. Compass
7. Drag-and-Drop Block
8. Timeline Rail
9. Map Pin
10. Route Tracer
11. Evidence Connector
12. Credibility Stamp
13. Ruler
14. Tape Measure
15. Protractor
16. Cargo Packing Grid
17. Pressure Plate
18. Balance Scale
19. Graph Plotter
20. Slider/Gauge
21. Archive Shelf
22. Artifact Pedestal
23. Branching Door
24. Master Vault

---

# 18. Lock Shell vs Academic Logic

Keep them separate.

Example:

`RotationDialShell`

should not know whether it is teaching:
- geometry
- compass bearings
- historical navigation
- clock timing

It should only know:
- current rotation
- drag behavior
- snapping
- limits
- validation callback
- visual state

Academic content provides the meaning.

---

# 19. Example Lock JSON

## Rotation Math Lock

```json
{
  "id": "west_gate_angle",
  "engine": "numeric-equation",
  "visualShell": "rotation-lever",
  "subject": "math",
  "prompt": "The gate arm is already 25° above horizontal. It must reach 90°. Rotate it through the remaining angle.",
  "interaction": {
    "startAngleDeg": 0,
    "targetAngleDeg": 65,
    "toleranceDeg": 3,
    "snapIncrementDeg": 5,
    "showTicks": true,
    "tickIncrementDeg": 5,
    "showMajorLabels": true,
    "majorLabelIncrementDeg": 30,
    "showCurrentAngle": true
  },
  "unlockTargetId": "west_gate",
  "attempts": {
    "max": 4,
    "penaltyType": "advance-patrol",
    "penaltyValue": 10
  }
}
```

---

# 20. Example Social Studies Lock JSON

```json
{
  "id": "silk_road_route_lock",
  "engine": "map-position",
  "visualShell": "map-route",
  "subject": "social-studies",
  "prompt": "Use the trade evidence to choose the route most likely to connect the merchant's silk shipment to the western market.",
  "requiredEvidenceIds": [
    "merchant_letter",
    "trade_map",
    "goods_record"
  ],
  "validation": {
    "type": "route",
    "correctRouteId": "route_b"
  },
  "unlockTargetId": "merchant_archive"
}
```

---

# 21. Failure / Attempt Rules

Lock feedback should be environmental.

Avoid:
`INCORRECT ANSWER`

Prefer:
- mechanism does not engage
- dial springs back
- lever shakes
- red indicator appears
- wrong archive drawer closes
- guard timeline advances
- lock emits soft warning
- one part of mechanism remains inactive

Configurable attempt penalties:
- none
- hint unlock
- patrol advances
- time penalty
- risk increase
- lock cooldown

Use mild penalties for younger students.

---

# 22. Hints

Hints should become more explicit by attempt.

Example:

Attempt 1:
`Check the total rotation of a full circle.`

Attempt 2:
`A full rotation is 360°.`

Attempt 3:
`Multiply 360° by the fraction of the turn.`

Do not reveal the answer immediately.

---

# 23. Success Feedback

When a lock is correct:

- mechanism should visibly respond
- gears turn
- bolts retract
- door shifts
- lights activate
- vault ring locks into position
- map section reveals
- evidence drawer opens

Academic success should have a satisfying physical consequence.

---

# 24. Top 12 Visual Shells to Build First

For the first production version, prioritize:

1. Combo Dial
2. Rotation Dial
3. Lever
4. Drag-and-Drop Sorter
5. Timeline Arranger
6. Map Pin / Route Trace
7. Evidence Board
8. Measurement Overlay
9. Cargo Packing Board
10. Graph Plotter
11. Pressure Plate / Placement Lock
12. Master Vault

These 12 shells can support almost all 10 academic lock engines.

---

# 25. Best Lock / Visual Pairings

| Academic Lock | Best Visual Shells |
|---|---|
| Numeric / Equation | Combo dial, degree dial, gauge, clock, balance |
| Sequence / Ordering | Timeline, archive shelf, rotating cylinders |
| Map / Position | Map pin, compass, route trace, coordinate grid |
| Match / Classification | Artifact cases, sorter, wire connector |
| Evidence / Source | Evidence board, stamp, source ranking |
| Measurement / Scale | Ruler, tape, protractor, blueprint |
| Constraint / Optimization | Cargo packing, bridge load, multi-lever panel |
| Graph / Data | Plotter, sliders, trend line, dials |
| Cause / Decision | Doors, levers, council panel |
| Master Combination | Vault dials, concentric rings, artifact sockets |

---

# 26. Academic Coverage

## Math

The lock system should be able to teach or assess:

- operations
- fractions
- decimals
- percent
- ratios
- rates
- proportions
- equations
- inequalities
- coordinates
- graphing
- geometry
- area
- perimeter
- volume
- scale
- transformations
- rotation
- angle measure
- complementary angles
- supplementary angles
- bearings
- slope
- statistics
- probability
- optimization

## Social Studies

The same system should support:

- chronology
- geography
- maps
- trade routes
- historical evidence
- primary/secondary sources
- bias
- perspective
- cause/effect
- government
- rights
- historical technology
- cultural diffusion
- stakeholder analysis
- economic choices
- civilization comparison

---

# 27. Final Design Principle

The student should feel:

> **I manipulated the environment because I understood the academic content.**

The lock system should make knowledge physically useful.

Math should:
- rotate mechanisms
- balance machines
- open gates
- align routes
- fit cargo
- set clocks
- calibrate systems

Social Studies should:
- reveal passages
- identify routes
- authenticate records
- sort evidence
- select historically plausible decisions
- reconstruct chronology

The final Heist should feel like a world where **academic understanding is the key that operates the machinery**.


---

# PART III — AGE OF EXPLORATION HISTORY ART HEIST MAZE
## Phaser.js Build Specification for Codex

# 1. Project Purpose

Build a reusable **History Art Heist** project type using Phaser.js.

The core experience is a visual maze / branching gallery where students advance by identifying the **historically accurate image** from a set of three paintings.

Each challenge contains:

- 1 historically accurate image
- 2 convincing fraud images
- a lock or manipulation challenge that forces students to explain why the frauds are wrong
- a branching maze decision where the correct image opens the correct route

The history content focuses on the **Age of Exploration / Early European Exploration of the Americas and global trade routes**.

The frauds should use only concrete, teachable historical errors.

Allowed fraud categories:

1. **Wrong Timeline**
2. **Wrong Animal / Plant / Food**
3. **Wrong Group of People**
4. **Wrong Technology**

Do not use subjective fraud categories such as:
- “style feels wrong”
- “painting quality is lower”
- “this looks less realistic”
- unsupported visual stereotypes

The student must be able to prove the fraud using historical knowledge or evidence.

---

# 2. Core Game Fantasy

Students are historical recovery investigators entering a hidden gallery controlled by a forgery network.

The gallery has been designed like a maze.

At each junction:

- three paintings are displayed
- only one is historically accurate
- each painting corresponds to a possible route
- choosing the authentic painting unlocks the correct passage
- choosing a fraudulent painting activates a lock challenge or penalty
- the student must identify the historical error before continuing

The project should feel like:

**museum vault + historical mystery + maze + academic lock puzzle**

Not:

**multiple-choice quiz with pictures**

---

# 3. Core Gameplay Loop

The repeating student loop is:

**ENTER GALLERY → INSPECT 3 PAINTINGS → FIND HISTORICAL CLUES → CHOOSE AUTHENTIC IMAGE → OPEN ROUTE → SOLVE LOCK → ENTER NEXT GALLERY**

A full mission should include 6–10 galleries.

At the end:

**MASTER VAULT → FINAL 3-PAINTING AUTHENTICATION → RECOVER THE AUTHENTIC RECORD**

---

# 4. Core Design Rule

The maze should be driven by historical knowledge.

At every major junction:

> The correct historical image determines the correct path.

The student should not be able to win by guessing randomly.

Each painting should contain visible clues tied to:

- date
- technology
- animals/plants/food
- people/cultures
- geography
- exploration routes
- trade
- contact
- navigation
- historical sequence

---

# 5. Historical Scope

The first version should focus on:

## Early European Exploration

Possible topics:
- Christopher Columbus
- Vasco da Gama
- Ferdinand Magellan
- John Cabot
- Jacques Cartier
- Henry Hudson
- Spanish exploration
- Portuguese exploration
- early Atlantic crossings
- Caribbean encounters
- Indigenous-European contact
- Columbian Exchange
- navigation technology
- trade motives
- global route expansion

The project can include Zheng He as a comparison figure if desired, but the main storyline should remain early European exploration and New World contact.

---

# 6. Fraud Categories

Each fake painting must have one or more historically verifiable errors.

## Fraud Type A — Wrong Timeline

The painting includes something from the wrong time period.

Examples:
- later national flag shown too early
- explorer shown with a ruler who lived later
- later colonial uniform in an early-contact scene
- city/building shown before it existed
- later treaty or symbol shown too early
- later political boundary shown on an early map

Validation question:

> Which detail proves this scene cannot belong to this year?

---

## Fraud Type B — Wrong Animal / Plant / Food

The painting includes an animal, crop, or food in the wrong place/time.

Examples:
- horses already established in the Americas before relevant European introduction
- cattle in an American settlement too early
- potatoes shown as a normal European staple too early
- tomatoes shown in Europe before arrival from the Americas
- maize/corn shown in Europe before Columbian Exchange
- American crops shown traveling the wrong direction
- Old World livestock shown as native to pre-contact American communities

Validation question:

> Which animal, plant, or food does not belong in this place and time?

---

## Fraud Type C — Wrong Group of People

The painting includes the wrong culture, nation, or population.

Examples:
- Aztec people shown in the Caribbean
- Inca people shown in eastern North America
- Plains clothing used in a Northeast coastal encounter
- Portuguese sailors shown as part of a Spanish expedition
- French explorers shown under English command
- Indigenous architecture from the wrong geographic region
- wrong European flag or national identity for the expedition

Validation question:

> Which group does not belong in this location or expedition?

---

## Fraud Type D — Wrong Technology

The painting includes tools, ships, weapons, or instruments from the wrong time.

Examples:
- sextant shown too early
- marine chronometer shown too early
- steamship in the 1500s
- later telescope technology
- firearm model from a later century
- railroad in early colonial scene
- modern navigation instrument
- wrong ship type for the expedition

Validation question:

> Which technology proves this painting is from the wrong period?

---

# 7. Three-Painting Challenge Structure

Every challenge uses:

## Painting A
Could be:
- authentic
- timeline fraud
- technology fraud
- wrong people fraud
- wrong exchange fraud

## Painting B
Same possibilities.

## Painting C
Same possibilities.

Do not make the correct image always occupy the same position.

The correct answer should rotate across:
- A
- B
- C

---

# 8. Painting Challenge Rules

Each painting set should include:

- scene title
- historical date
- geographic setting
- intended event
- three image variants
- one correct image
- fraud metadata for each fake
- clue list
- optional research/intelligence documents
- follow-up lock

Example data:

```json
{
  "id": "first_caribbean_contact",
  "title": "First Caribbean Encounter",
  "date": "1492",
  "location": "Caribbean",
  "correctPaintingId": "painting_b",
  "paintings": [
    {
      "id": "painting_a",
      "image": "caribbean_a.webp",
      "authentic": false,
      "fraudType": "wrong-animal",
      "fraudObject": "horse",
      "explanation": "The scene shows horses already established in the Indigenous settlement."
    },
    {
      "id": "painting_b",
      "image": "caribbean_b.webp",
      "authentic": true
    },
    {
      "id": "painting_c",
      "image": "caribbean_c.webp",
      "authentic": false,
      "fraudType": "wrong-people",
      "fraudObject": "regional_clothing",
      "explanation": "The clothing and architecture belong to a different Indigenous region."
    }
  ]
}
```

---

# 9. Maze Structure

The gallery itself acts as a branching maze.

Each chamber contains:
- 3 paintings
- 3 passageways
- each painting visually aligns with a passage
- the student chooses which painting is authentic
- that determines which door opens

Example:

```text
                  [ Painting A ]
                       |
                   Door A
                       |
        [ Painting B ] + [ Painting C ]
             Door B        Door C
```

The student does not directly click “A/B/C”.

They physically walk or select the passage under the painting.

The environment should make the decision feel spatial.

---

# 10. Correct Path Behavior

If the student chooses the authentic painting:

- frame glows or mechanism activates
- correct passage unlocks
- door opens
- mission notebook records the authentic clue
- student moves to next chamber

Optional reward:
- map fragment
- code fragment
- historical evidence card
- master vault symbol

---

# 11. Wrong Path Behavior

If the student chooses a fraud:

The door should NOT simply say:

> Wrong answer.

Instead:

1. fraud door partially opens
2. mechanism locks
3. painting zooms forward
4. student must identify what is historically wrong
5. a fraud lock appears

Example:

**FRAUD DETECTED**

Choose:
- Wrong Timeline
- Wrong Animal/Plant
- Wrong Group
- Wrong Technology

Then student must identify the specific offending detail.

After successful correction:
- route closes
- student returns to junction
- incorrect painting is marked as fraudulent
- student can try again

Optional mild penalty:
- time
- patrol advance
- clue reduction
- score reduction

Do not block learning permanently.

---

# 12. Academic Lock System

Combine the existing academic lock types with the painting maze.

The locks should not be random.

Each lock should directly test the historical clue needed to determine the image.

Use the following reusable lock types.

---

# 13. Lock Type 1 — Combination Dial

## Use

Best for:
- dates
- years
- sequence numbers
- route codes

Example:

Painting claims:
`This meeting occurred in 1607.`

Student finds evidence that event occurred in:
`1492`

They rotate:
1 - 4 - 9 - 2

to open lock.

---

# 14. Lock Type 2 — Rotation / Degree Lock

## Use

Best for:
- compass direction
- navigation
- angle learning
- bearings
- map orientation

Example:

Historical clue:
`The expedition sailed southwest from the island.`

Student rotates a compass arrow to:
`225°`

The mechanism clicks into place.

### Math Integration

Rotation should support:
- 45°
- 90°
- 135°
- 180°
- 225°
- 270°
- 315°
- full 360°

Can also support:
- quarter turn
- half turn
- three-quarter turn

---

# 15. Lock Type 3 — Lever Selection Lock

## Use

Student pulls one of several mechanical levers.

Possible labels:
- Spain
- Portugal
- France
- England

Example:

Prompt:
`Which nation sponsored this expedition?`

Correct lever opens mechanism.

Can also use:
- correct century
- correct motive
- correct explorer
- correct continent

---

# 16. Lock Type 4 — Timeline Arrangement Lock

## Use

Drag events into chronological order.

Example:
- Columbus reaches Caribbean
- da Gama reaches India
- Magellan expedition begins
- Cartier explores St. Lawrence

When correct:
- timeline gears engage
- next door unlocks

---

# 17. Lock Type 5 — Map / Route Lock

## Use

Student traces route on map.

Possible tasks:
- identify correct explorer route
- choose Atlantic crossing
- place correct destination
- connect Europe to trading region

Visual interaction:
- drag route line
- place map pins
- rotate compass
- select destination

---

# 18. Lock Type 6 — Animal / Plant Sorting Lock

## Use

This should be one of the signature Age of Exploration locks.

Two zones:

**OLD WORLD**
**NEW WORLD**

Student sorts:
- horse
- cattle
- wheat
- sugar
- potato
- maize
- tomato
- cacao

into correct origin/direction categories.

Possible versions:

### Origin Mode
Where did it originate?

### Exchange Direction Mode
Which direction did it move?

### Fraud Detection Mode
Which item does not belong in this scene?

When correct:
- trade crates roll into place
- gate opens

---

# 19. Lock Type 7 — People / Culture Placement Lock

## Use

Student places groups onto correct map region.

Possible groups:
- Aztec
- Inca
- Taíno
- English
- French
- Spanish
- Portuguese

Tasks:
- place group in correct location
- match group to explorer encounter
- match empire/nation to route
- identify wrong group in painting

Visual:
- map pedestals
- portrait tokens
- flag markers

---

# 20. Lock Type 8 — Technology Sorting Lock

## Use

Student determines which technology belongs in the time period.

Possible objects:
- compass
- astrolabe
- cross-staff
- portolan chart
- sextant
- chronometer
- steam engine
- telescope

Interaction:
drag objects into:

**AVAILABLE**
**NOT YET INVENTED**

or:

**BELONGS IN SCENE**
**ANACHRONISM**

---

# 21. Lock Type 9 — Evidence Board Lock

## Use

Student connects historical evidence to the authentic painting.

Evidence types:
- date
- map
- ship
- flag
- animal
- plant
- tool
- group
- route

Interaction:
draw line:
`Evidence Card → Painting`

or:

`Evidence → Fraud Type`

Example:
`Marine chronometer → Wrong Technology`

---

# 22. Lock Type 10 — Master Combination Vault

Final mission lock.

Student must use knowledge collected across earlier galleries.

Example:

Outer dial:
`1492`

Compass:
`270°`

Trade symbol:
`maize`

Nation lever:
`Spain`

All mechanisms must align.

Then final vault opens.

---

# 23. Gallery Chamber Types

Create several visual layouts so every challenge does not feel identical.

## Chamber A — Three-Wall Gallery

Paintings on:
- left wall
- center wall
- right wall

Doors beneath each.

---

## Chamber B — Circular Gallery

Three paintings around circular room.

Student rotates room/camera.

Correct painting activates hidden passage.

---

## Chamber C — Archive Hall

Paintings stored in pull-out racks.

Student slides racks forward to inspect.

---

## Chamber D — Map Room

Three giant maps/paintings hang above route doors.

---

## Chamber E — Ship Cargo Vault

Three large painted crates.

Each contains a possible historical scene.

---

## Chamber F — Temple-Like Mechanism Room

Three paintings embedded in rotating stone frames.

Correct frame rotation opens route.

---

# 24. Maze Navigation

The maze should remain understandable.

Use a small optional map.

Do not create a maze where students are lost because of navigation.

The challenge should be academic, not finding the hallway.

Suggested structure:

```text
START
  |
Gallery 1
  |
Gallery 2
 / \
A   B
 \ /
Gallery 3
  |
Gallery 4
 / | \
A  B  C
 \ | /
Gallery 5
  |
MASTER VAULT
```

Wrong branches can loop back after the fraud lock.

Correct choices advance.

---

# 25. Intelligence Notebook

Students collect information throughout the maze.

Notebook categories:

## Timeline
- 1492
- 1497
- 1498
- 1519
- etc.

## People
- explorer
- sponsor
- Indigenous group
- European nation

## Technology
- available navigation tools
- ship type
- tools not yet invented

## Exchange
- plants
- animals
- goods
- direction of movement

## Routes
- origin
- destination
- ocean
- key geographic locations

The notebook should automatically record confirmed facts.

---

# 26. Fraud Detection Overlay

When inspecting a painting, allow zoom.

Student can click suspect objects.

Possible hotspots:
- flag
- animal
- food
- person
- clothing
- ship
- tool
- map
- weapon
- building

If hotspot is relevant:
show:

`INSPECTED`

Do not immediately reveal whether it is correct.

The student must classify the issue.

---

# 27. Fraud Classification Panel

Four large physical-looking buttons:

- TIMELINE
- ANIMAL / PLANT
- PEOPLE
- TECHNOLOGY

The student selects one.

Then the system asks for the specific object/detail.

This creates two-level mastery:

1. find the suspicious detail
2. identify why it is historically impossible

---

# 28. Mastery Evidence

Each painting challenge should record:

- selected painting
- whether correct
- suspicious objects inspected
- fraud category selected
- specific error identified
- number of attempts
- evidence used
- time spent
- notebook clues referenced

The grade should not be based only on maze completion.

---

# 29. Suggested First Full Heist

## Shadow Gallery: The Cartographer's Vault

### Gallery 1 — 1492 Caribbean Landing

Frauds:
- wrong animal
- wrong Indigenous group

Lock:
animal / people classification

---

### Gallery 2 — Navigation Workshop

Frauds:
- sextant too early
- chronometer too early

Lock:
technology sorter + compass rotation

---

### Gallery 3 — European Port

Frauds:
- steam-powered ship
- later national flag

Lock:
timeline + technology

---

### Gallery 4 — Columbian Exchange Market

Frauds:
- potato moving wrong direction
- horse treated as native pre-contact animal

Lock:
Old World / New World sorting

---

### Gallery 5 — Explorer Route Hall

Frauds:
- wrong explorer route
- wrong nation sponsor

Lock:
route trace + nation lever

---

### Gallery 6 — Indigenous Encounter Archive

Frauds:
- wrong people for location
- wrong introduced animal

Lock:
map placement + group identification

---

### Gallery 7 — Treaty / Empire Room

Frauds:
- later boundary
- wrong European nation

Lock:
timeline + map

---

### Gallery 8 — Master Vault

Three composite paintings.

Each combines:
- people
- technology
- plants/animals
- timeline

Student must identify the only fully authentic scene.

Then complete master lock.

---

# 30. Final Master Vault Interaction

The master vault should combine earlier skills.

Example:

## Step 1 — Date Dial
Set:
`1492`

## Step 2 — Compass
Rotate to:
`270°`

## Step 3 — Exchange Crate
Place:
`maize`

into correct slot.

## Step 4 — Nation Lever
Pull:
`Spain`

## Step 5 — Authentic Painting
Select the correct final image.

When complete:

- gears engage
- concentric vault rings rotate
- bolts retract
- authentic painting lowers into recovery case
- fraud paintings receive a large visual `FRAUD` seal

---

# 31. Phaser System Architecture

Recommended reusable systems:

```text
GallerySceneManager
PaintingChallengeSystem
PaintingInspectionSystem
FraudClassificationSystem
MazeRouteSystem
AcademicLockManager
RotationInteractionSystem
TimelineLockSystem
MapRouteLockSystem
SortingLockSystem
EvidenceBoardSystem
MasterVaultSystem
StudentNotebookSystem
ChallengeStateStore
ReplayRecorder
```

---

# 32. Academic Lock Data Model

Example:

```ts
interface HistoryHeistLock {
  id: string;

  lockType:
    | 'combo'
    | 'rotation'
    | 'lever'
    | 'timeline'
    | 'map-route'
    | 'sorting'
    | 'people-placement'
    | 'technology-sort'
    | 'evidence-board'
    | 'master-vault';

  academicDomain:
    | 'timeline'
    | 'animals-plants'
    | 'people'
    | 'technology'
    | 'geography'
    | 'exploration-route';

  prompt: string;

  requiredEvidenceIds?: string[];

  validation: unknown;

  unlockTargetId: string;

  maxAttempts?: number;

  penalty?: {
    type: 'none' | 'time' | 'score' | 'hint';
    value?: number;
  };
}
```

---

# 33. Painting Data Model

```ts
interface HeistPainting {
  id: string;
  image: string;

  authentic: boolean;

  date: string;
  location: string;

  fraud?: {
    type:
      | 'timeline'
      | 'animal-plant'
      | 'people'
      | 'technology';

    hotspotId: string;
    explanation: string;
  };

  hotspots: PaintingHotspot[];
}
```

---

# 34. Painting Hotspots

Example:

```ts
interface PaintingHotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;

  category:
    | 'animal'
    | 'plant'
    | 'person'
    | 'technology'
    | 'flag'
    | 'ship'
    | 'building'
    | 'map';

  label: string;
}
```

Hotspots should be invisible until student enters inspection mode.

---

# 35. Difficulty Scaling

## Easier

- obvious visual difference
- notebook provides facts
- fraud category choices shown
- only one incorrect element per fake
- hints available

## Medium

- subtler differences
- some evidence must be collected
- two plausible fraud objects
- student must identify specific object

## Advanced

- both fake images mostly accurate
- errors are small but factual
- multiple evidence sources needed
- no immediate category hint
- student must justify in writing or orally

---

# 36. Visual Feedback

## Correct Painting

- frame glows
- lock mechanism activates
- door opens
- notebook adds confirmed fact

## Fraud Painting

- painting frame locks
- spotlight changes
- magnifier/inspection mode activates
- student must find error

## Correct Fraud Detection

- suspicious object highlights
- `ANACHRONISM CONFIRMED`
- explanation card becomes available
- route resets

Avoid aggressive failure feedback.

---

# 37. Final Student Product

After completing the maze, generate a:

## Historical Authentication Dossier

Include:

- authentic paintings selected
- frauds identified
- fraud categories
- timeline evidence
- exchange evidence
- people/culture evidence
- technology evidence
- route evidence
- final vault result

Students should complete a short final defense:

> Which clues were most useful for exposing the frauds?

> Which historical mistake was easiest to miss?

> How can visual sources misrepresent history?

---

# 38. Build Priority

## Phase 1

Build:
- one gallery
- 3 paintings
- painting zoom
- choose authentic painting
- one fraud hotspot
- one simple lock
- correct/wrong route behavior

## Phase 2

Add:
- maze navigation
- notebook
- timeline lock
- animal/plant sorter
- technology sorter
- map route lock

## Phase 3

Add:
- people placement
- rotation compass
- evidence board
- master vault

## Phase 4

Add:
- full 6–8 gallery mission
- polish
- transitions
- sound
- replay
- mastery logging

---

# 39. Design Principle

The History Art Heist should make students think:

> **This painting looks convincing, but does it actually fit the history?**

The maze should reinforce:

> **Historical knowledge determines the correct path.**

And the final vault should reinforce:

> **Authenticity requires evidence, not appearance.**
---

# MASTER PROJECT SUCCESS CRITERIA

The Heist redesign is successful when:

1. Students feel they are operating a game world, not completing a disguised worksheet.
2. Academic knowledge is necessary to move through the environment.
3. Correct academic answers create visible physical consequences.
4. Wrong historical images are fraudulent for concrete factual reasons.
5. Math interactions are manipulative and predictive whenever possible.
6. The same lock shells can support many standards.
7. The same Phaser engine can support different historical themes and grade levels.
8. Mission content is data-driven rather than hard-coded into scenes.
9. The final experience produces reusable mastery evidence for the LMS.
10. The Heist remains an academic project type rather than becoming a combat or crime simulation.

## Final Design Statement

> **The Heist is a reusable academic game engine where knowledge operates the machinery, historical accuracy determines the path, mathematics controls the physical plan, and student decisions are tested by the environment.**

