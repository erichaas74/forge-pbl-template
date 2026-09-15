# Project activity rules

Standing user requirements, recorded 2026-09-15. Applies to **every existing
project being fixed and every new project build**, across all weeks and sessions.
Read this before designing or implementing a student workspace. It supersedes
conflicting presentation guidance in older redesign plans and handoffs.

## 1. The main panel is the activity

Open directly into a carefully designed, programmed visual experience. The
learner needs something meaningful to investigate, analyze, manipulate, compare,
test, construct, or solve. A puzzle, experiment, simulation, or investigation must
have real interactions and understandable consequences.

Do not use paragraphs, task lists, worksheets, decorative pictures, or generic
cards as a substitute for designing an activity. A different heading, background,
or introductory paragraph does not make a repeated activity a new weekly
experience. Weekly differences must affect the challenge or investigation.

Keep visible words to short labels and essential interaction cues. Preserve
accessible names, keyboard operation, focus indicators, and alternatives to drag
gestures; visual simplicity must not make the activity inaccessible.

## 2. Add nothing above or below the main activity panel

Do not add project-specific content bands above or below the main panel: no extra
headers, footers, introductions, navigation bars, instructions, completion cards,
status essays, or settings sections. Do not insert these inside the panel either.
The main activity should receive the space and careful design work.

The existing shared project header, ID, navigation, and compact standards row
belong to the common page shell. Do not duplicate them in the activity column.
Keep only controls that operate the activity within that panel. Put advanced
settings and secondary tools in a separate, on-demand surface; show immediate
interaction feedback next to the relevant object or control.

## 3. Standards are compact and expandable

Show a very small standards row directly below the shared project header and ID.
Expand it on request into an accessible dialog or contained detail view. Full
standard descriptions, evidence breakdowns, and curriculum connections must not
consume the initial activity view. Check that mappings match the current project
and lesson-plan versions; do not silently lose the standards or reuse stale
alignment claims.

## 4. Text entry and question answering belong in the AI Tutor area

Do not put written responses, explanations, reflections, checkpoint forms, or
question-answer fields in the main activity panel. The AI Tutor area owns that
work. The current tutor remains a clearly labeled, disconnected planning list
describing questions, evidence it will inspect, and future model controls. Do
not imply that tutoring, assessment, or automatic adaptation is connected.

Earlier plans allowed text-based product editors in the main view. That is not
an automatic exception to this rule. If a project's intended product requires
text authoring, resolve its placement with the user instead of silently turning
the main activity into an editor or form.

## 5. Weekly tasks go directly above the tutor

Use the side column in this order:

1. The current week's tasks and intended products.
2. The AI Tutor box.

Keep task descriptions and tutor planning in these boxes. Preserve this order
when the layout reflows on small screens, and allow the planning boxes to
collapse. Do not create extra boxes above or below the activity column.

## 6. Design the interaction before coding

For a new activity or substantial redesign:

- Brainstorm several concrete interaction ideas that serve the learning goal.
- Choose based on what the learner will actually do and discover, not how quickly
  a text-heavy page can be assembled.
- Define the visible objects or evidence, available actions, puzzle constraints,
  model responses, meaningful feedback, and what changes between sessions.
- Check feasibility against the existing engines, assets, and available tools.
- Share a concise activity concept that the user can assess. Explain the actual
  interaction rather than supplying promotional descriptions.

Before treating the implementation as ready, ask: Does this give the learner an
interesting problem to work on? Do actions visibly change something meaningful?
Can the intended experience work without added explanatory filler? Is the
activity itself occupying the main panel?

If the intended interaction cannot be implemented, report the specific
capability gap and discuss a concrete alternative before substituting another
experience. Do not quietly fall back to generic forms, text, or placeholder
content and call the project complete.

## 7. Only make videos when the requested result can actually be produced

Do not promise or add a video when the available tools cannot create the
requested result. A claimed video deliverable must be a real, playable file that
has been inspected and verified. Do not pass off a placeholder player, slideshow,
or narrated still image as the requested video. Discuss a useful alternative
when video production is unavailable. Media must support the activity rather
than replace the missing interaction design.

## 8. Audit, fix, and review one project at a time

For the selected project:

1. Inspect every week and session against these rules.
2. Identify specific problems and design the necessary fixes.
3. Implement the fixes within the existing reusable architecture.
4. Verify the real layout and interactions, including direct entry to later
   sessions and responsive behavior. Run relevant build and code checks.
5. Report what changed, what was verified, and any remaining limitations.
6. Review the result with the user before moving to another project.

Do not claim all projects comply after checking a shared component or a few
representative pages. Keep the current audit scoped to the selected project.

## 9. No gating during testing

User clarification, 2026-09-15: all weeks and sessions stay freely accessible
during the testing phase. Do not make completion, evidence collection, tutor
approval, scores, or earlier lessons prerequisites for testing access. Scenes
and examples must also be inspectable without completing the preceding work.
Free testing navigation is intentional and must not be reported as a defect.

The activity may still model physical cause and effect, such as a press needing
ink and paper to produce an impression. That is distinct from locking access to
the experience. Any testing access controls belong in the existing shared shell
or side area and must not add content bands to the main panel.
