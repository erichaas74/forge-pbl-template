# Visual Design System for Interactive Learning Projects

## 1. Purpose

This document defines the visual standards for all interactive educational projects.

The goal is to create experiences that feel like:

- simulations
- games
- laboratories
- command centers
- historical environments
- interactive worlds

They should NOT feel like:

- LMS pages
- standard educational websites
- dashboards full of cards
- worksheets placed on a screen
- generic Bootstrap applications

The environment itself should communicate what students are doing.

---

# 2. Core Visual Principle

## Build the world, not the webpage.

When improving graphics, prioritize the interactive environment before adding decorative webpage elements.

Preferred hierarchy:

**Environment → Interactive Objects → Feedback → Information → Controls**

The student should notice the activity before noticing the interface.

---

# 3. Technology Responsibilities

## Angular

Angular should primarily handle:

- application shell
- navigation
- menus
- authentication
- student/team state
- teacher controls
- instructions
- dialogs
- persistent data
- accessibility
- activity loading

Angular should NOT be used to fake a game environment with dozens of positioned HTML elements when Phaser is better suited for the task.

## Phaser 4

Phaser should handle graphical interactive experiences including:

- game scenes
- maps
- laboratories
- arenas
- environmental objects
- sprites
- movement
- cameras
- particles
- animation
- visual effects
- object interaction
- world-space indicators
- interactive mechanisms

Use Phaser when the student is interacting with a **world** rather than a webpage.

---

# 4. Scene Composition

Every major scene should have intentional visual layers.

Recommended structure:

### Background Layer

Examples:

- sky
- distant terrain
- room walls
- historical map
- laboratory background
- distant buildings
- atmospheric scenery

### Environment Layer

Examples:

- floors
- roads
- tables
- docks
- laboratory benches
- shelves
- machinery
- geographic features

### Interaction Layer

Examples:

- robots
- ships
- equipment
- locks
- specimens
- trading goods
- draggable objects
- targets
- controls

### Effects Layer

Examples:

- shadows
- particles
- route trails
- highlights
- dust
- smoke
- sparks
- water
- glow
- success effects

### Interface Layer

Examples:

- score
- resources
- objective
- timer
- status
- compact controls

Do not flatten all of these into one visual plane.

---

# 5. Depth

Scenes should have visible depth even when primarily 2D.

Use:

- object overlap
- different object scales
- foreground elements
- background elements
- shadows
- atmospheric layers
- parallax
- subtle perspective
- environmental framing

Avoid scenes where every object appears pasted onto the same flat background.

---

# 6. Environment First

Before polishing buttons or panels, improve the environment.

Ask:

> If all text disappeared, would a student have some idea where they are and what they are supposed to interact with?

If not, improve the environment.

Examples:

Robot Coding:

The student should immediately recognize an arena/course.

Trading:

The student should immediately recognize a geographic trading world.

Genetics:

The student should immediately recognize a laboratory, organism, cell, chromosome, or biological scale.

Heist:

The student should immediately recognize a physical mechanism, vault, gallery, archaeological site, or historical environment.

---

# 7. Interactive Objects

Interactive objects should look interactive.

Use appropriate visual affordances:

- hover response
- outlines
- highlights
- handles
- switches
- indicators
- animation
- movement
- cursor changes
- mechanical response
- selection states

Avoid making students guess whether scenery is interactive.

---

# 8. Physical Interaction

Whenever possible, convert abstract UI interactions into manipulation of the environment.

Prefer:

**Turn dial**

over

**Enter number into textbox**

Prefer:

**Move robot**

over

**Select coordinate from dropdown**

Prefer:

**Pour liquid**

over

**Choose volume from menu**

Prefer:

**Arrange blocks**

over

**Multiple-choice question**

Prefer:

**Plot route**

over

**Select destination**

The physical interaction should reinforce the academic concept.

---

# 9. UI Panels

UI should support the world rather than cover it.

Prefer:

- compact HUDs
- side drawers
- contextual panels
- floating labels
- expandable information
- small status displays

Avoid:

- giant cards
- excessive modal dialogs
- grids of rectangular panels
- large instruction boxes permanently covering the scene

Students should have maximum usable space for the activity.

---

# 10. Typography

Use clear hierarchy.

### Major
Scene/location/activity title

### Secondary
Current objective

### Functional
Controls and object labels

### Supporting
Hints, descriptions, evidence

Avoid excessive text inside the primary graphical environment.

Longer information should appear through expandable or contextual UI.

---

# 11. Animation

Animation should communicate something.

Good animation communicates:

- movement
- cause and effect
- success
- failure
- state change
- danger
- attention
- physical response

Examples:

Robot turns → wheels visibly rotate.

Trade completed → cargo transfers.

Correct lock → mechanism physically releases.

Incorrect mixture → sensor reacts.

Generator spins → electricity indicator activates.

Avoid constant decorative motion that competes with learning.

---

# 12. Feedback

Every significant student action should have immediate feedback.

Use combinations of:

- movement
- animation
- sound where appropriate
- particles
- highlight
- status change
- object reaction
- score/resource change

Avoid relying only on toast messages such as:

"Correct!"

Show the result in the environment whenever possible.

---

# 13. Educational Readability

Visual quality must never reduce academic readability.

Important academic information should have:

- strong contrast
- sufficient size
- uncluttered surroundings
- clear labels
- consistent symbols

Visual complexity should support comprehension rather than compete with it.

---

# 14. Classroom and Zoom Requirement

Projects must remain readable when:

- displayed on student laptops
- screen-shared through Zoom
- projected
- viewed at reduced browser size

Important objects should not depend on tiny visual details.

Test common laptop viewport sizes.

---

# 15. Asset Quality

Avoid using simple geometric placeholders in the finished experience unless the visual style intentionally calls for them.

Temporary:

- colored rectangles
- circles
- placeholder icons

are acceptable during development.

Before visual completion, determine whether important objects need:

- SVG artwork
- sprites
- generated artwork
- textures
- animation frames
- 3D assets
- procedural Phaser graphics

Do not keep placeholders merely because they technically work.

---

# 16. Consistency

Assets within a scene should appear to belong to the same visual world.

Avoid mixing:

- realistic artwork
- flat cartoon icons
- emoji
- clip art
- unrelated icon sets
- drastically different perspective styles

Choose a visual language and maintain it.

---

# 17. Performance

Visual upgrades must preserve classroom performance.

Prefer:

- reusable textures
- sprite atlases
- optimized image sizes
- reasonable particle counts
- limited expensive effects
- lazy loading where appropriate

Do not sacrifice smooth interaction for unnecessary visual effects.

Target stable performance on typical student laptops.

---

# 18. Visual Completion Test

A scene is NOT visually complete merely because:

- the code compiles
- tests pass
- Phaser renders
- CSS exists
- assets load

It must be visually inspected.

Ask:

1. Does the environment immediately communicate the activity?
2. Is there obvious visual hierarchy?
3. Does the scene have depth?
4. Are interactive objects obvious?
5. Does interaction produce visible feedback?
6. Are graphics stylistically consistent?
7. Is academic information readable?
8. Does the UI stay out of the way?
9. Does it look intentional rather than generated from generic components?
10. Would the experience still be understandable with most instructional text hidden?

If several answers are no, continue the visual-development cycle.