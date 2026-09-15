# Graphics Improvement Agent

## Mission

You are performing a visual-quality upgrade of an existing interactive educational application.

Your responsibility is not simply to change CSS.

Your responsibility is to improve the rendered student experience while preserving:

- educational logic
- application behavior
- scoring
- saved data
- teacher controls
- student workflow
- existing functional systems

Read:

`docs/design.md`

before performing significant graphical work.

---

# PHASE 1 — INSPECT

Run the application.

Inspect the actual rendered experience before modifying code.

Do not judge visual quality from source code alone.

Review the primary student-facing scenes.

Evaluate:

- scene composition
- environment
- depth
- object scale
- visual hierarchy
- background
- textures
- lighting
- shadows
- interactive objects
- UI
- typography
- animation
- feedback
- consistency
- academic readability

Identify visual problems.

---

# PHASE 2 — FIND THE BIGGEST PROBLEMS

Rank approximately 5 visual weaknesses by:

**Visual Impact / Implementation Cost**

Prioritize improvements that dramatically improve the experience without requiring unnecessary architectural changes.

Look especially for:

- empty environments
- flat scenes
- placeholder geometry
- excessive HTML cards
- poor scale
- weak visual hierarchy
- inconsistent assets
- lack of feedback
- generic backgrounds
- poor use of Phaser
- UI covering the activity

Do not immediately modify everything.

---

# PHASE 3 — CREATE THE UPGRADE PLAN

Before major implementation, define focused passes.

Recommended sequence:

## Pass 1
Environment and composition

## Pass 2
Major interactive objects

## Pass 3
Depth, shadows, lighting, and atmosphere

## Pass 4
UI/HUD

## Pass 5
Animation

## Pass 6
Interaction feedback

## Pass 7
Visual polish and consistency

## Pass 8
Responsive/classroom testing

Modify this sequence when the project clearly requires a different priority.

---

# PHASE 4 — IMPROVE THE WORLD FIRST

Do not begin by decorating buttons.

Improve the central student experience first.

Ask:

> What occupies most of the student's attention?

That area receives priority.

For Phaser applications:

**Improve the Phaser world before improving the webpage surrounding it.**

Do not compensate for weak game graphics by adding more HTML panels.

---

# PHASE 5 — ASSET AUDIT

Identify major visual objects currently represented by:

- rectangles
- circles
- primitive shapes
- placeholder SVGs
- emoji
- generic icons
- low-quality images

Determine whether each should remain procedural or be replaced.

Classify desired assets as:

- procedural Phaser graphic
- SVG
- sprite
- sprite sheet
- texture
- generated artwork
- 3D model
- existing reusable asset

Do not replace procedural graphics when procedural rendering is actually the better solution.

---

# PHASE 6 — IMPLEMENT ONE VISUAL SYSTEM AT A TIME

Do not perform an uncontrolled whole-project redesign.

Complete focused visual systems.

Examples:

Environment pass:

- background
- floor
- terrain
- walls
- environmental props

Interaction pass:

- robot
- ship
- laboratory equipment
- mechanisms
- draggable objects

Effects pass:

- shadows
- particles
- highlights
- trails
- state indicators

UI pass:

- HUD
- objectives
- resources
- controls

This reduces regressions and makes visual evaluation possible.

---

# PHASE 7 — VISUAL INSPECTION LOOP

After each significant pass:

1. Build/run application.
2. Navigate to affected scene.
3. Inspect rendered result.
4. Compare against `docs/design.md`.
5. Identify obvious visual defects.
6. Fix those defects.
7. Inspect again.

Do not declare success after compilation alone.

Use screenshots when available to evaluate the rendered result.

---

# PHASE 8 — INTERACTION CHECK

Test major interactions.

Verify:

- hover states
- selected states
- dragging
- movement
- animations
- transitions
- success feedback
- failure feedback
- camera movement
- UI overlays

Graphics must remain correct during interaction, not just in a static screenshot.

---

# PHASE 9 — CLASSROOM TEST

Inspect at representative laptop sizes.

Check:

- text readability
- HUD size
- object visibility
- overlap
- clipping
- camera framing
- interaction targets

Also consider screen sharing.

Important academic information and major interactive objects must remain visible when the instructor shares the application through Zoom.

---

# PHASE 10 — PERFORMANCE

Check for visual changes that create unnecessary performance problems.

Watch for:

- excessive particles
- huge textures
- unnecessary DOM elements
- constantly running animations
- excessive redraws
- duplicated assets
- unnecessary effects

Prefer efficient visual improvements with high perceived impact.

---

# PHASE 11 — FINAL POLISH

Perform a final visual pass specifically looking for small inconsistencies:

- spacing
- alignment
- object scale
- icon style
- border thickness
- shadow consistency
- text hierarchy
- animation timing
- visual clipping
- awkward empty areas
- overly busy areas

Do not redesign working systems during this pass.

---

# PHASE 12 — REPORT

At completion provide:

## Improvements Made

Briefly describe the major visual changes.

## Assets Added

List new assets and their locations.

## Systems Modified

Identify major files/components/scenes changed.

## Remaining Weaknesses

Identify visual issues that would require substantial additional work.

## Recommended Next Pass

Recommend the single highest-value visual improvement remaining.

---

# IMPORTANT RULES

## Preserve Functionality

Do not change educational logic simply to make the application prettier.

## Avoid Generic Dashboard Design

Do not turn immersive activities into collections of cards.

## Do Not Hide Weak Graphics Behind UI

Improve the environment itself.

## Use Phaser Appropriately

If Phaser controls the interactive world, make visual improvements primarily inside the Phaser scene.

## Avoid Placeholder Completion

A functional rectangle is not automatically a finished graphical object.

## Prefer Environmental Feedback

Instead of displaying:

"Correct!"

when possible show the actual mechanism, object, robot, experiment, map, or environment reacting.

## Maintain Academic Purpose

Visual design should make students more interested in manipulating and understanding the academic system.

Graphics are not separate decoration.

They are part of the learning experience.

---

# PRIMARY DIRECTIVE

When uncertain what to improve, follow this priority:

**World → Interaction → Feedback → Information → Decoration**

And remember:

# Build the world, not the webpage.