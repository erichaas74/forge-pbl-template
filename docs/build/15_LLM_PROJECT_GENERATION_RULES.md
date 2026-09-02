# LLM Investigation Project Generation Rules

## Purpose

Define how a curriculum-generation LLM converts a completed `DESIGNER_PROJECT_BRIEF.md` into a valid Investigation project package.

This document is for **curriculum project generation**, not Angular software development.

The LLM generates project configuration/content.

It does not build the Investigation engine.

---

# 1. Required Inputs

Before generating a project, read:

1. completed `DESIGNER_PROJECT_BRIEF.md`
2. `02_INVESTIGATION_CAPABILITIES.md`
3. `03_DATA_SCHEMAS.md`
4. `05_PROJECT_PACKAGE_FORMAT.md`
5. capability/registry export from the actual application when available
6. `12_PRODUCT_ARCHITECTURE_DECISIONS.md`
7. any project-specific source documents explicitly supplied by the designer

If an existing project/codebase is being migrated, the software audit should be provided separately.

Do not assume access to code you have not been given.

The generated project package is declarative and untrusted. Never place
JavaScript, TypeScript, executable HTML, WebAssembly, remote script loaders, or
other executable project code in it. A requested interactive capability must
reference a platform-installed, trusted, versioned plugin ID or be reported as a
capability gap.

---

# 2. Source Priority

Use this priority:

1. designer brief
2. explicit source curriculum documents
3. registered template capabilities
4. existing project data supplied for migration
5. conservative inference only when allowed

Do not replace designer decisions with generic educational assumptions.

---

# 3. Do Not Guess Critical Curriculum Decisions

Do not silently guess:

- correct solution
- standards
- required evidence
- scientific/historical claims
- required mastery skills
- final grading expectations
- which evidence is decoy
- teacher-only relationships
- required phase gates
- whether multiple answers are valid

If critical information is missing, report:

```text
PROJECT_BRIEF_INCOMPLETE

Missing:
...

Why required:
...

Suggested question for designer:
...
```

---

# 4. Allowed LLM Output

The LLM may generate:

- `project.json`
- `investigation.json`
- `case-board.json`
- `evidence.json`
- `activities.json`
- `lessons.json`
- `rules.json`
- `state.json`
- `resources.json`
- `randomization.json`
- `npcs.json`
- `teams.json`
- `assessments.json`
- `final-submission.json`
- Markdown content files
- asset manifest entries
- generation report
- teacher-facing generation notes

---

# 5. Prohibited LLM Output

The curriculum-generation LLM must not generate:

- Angular components
- Angular services
- database code
- custom RuleEngine
- project-specific runtime engine
- project-specific EvidenceService
- project-specific Case Board
- backend functions
- authentication code

If configuration cannot represent a requirement, report a capability gap.

---

# 6. Capability Gap

Use:

```text
TEMPLATE_CAPABILITY_GAP

Requested behavior:
...

Closest existing capabilities:
...

Why they are insufficient:
...

Suggested reusable capability:
...

Which other project types could benefit:
...
```

Do not invent unsupported:

- evidence types
- activity types
- conditions
- actions
- board sections
- final section types

unless the capability registry explicitly allows custom/extension values.

---

# 7. Stable IDs

Generate predictable stable IDs.

Examples:

```text
project-mystery-substance
phase-testing
board-supports
ev-temperature-result
act-heat-test
rule-unlock-temperature
state-sample-b-condition
resource-lab-credits
random-unknown-substance
npc-lab-technician
hyp-substance-a
final-evidence
```

IDs:

- lowercase
- kebab-case where appropriate
- semantic
- unique
- independent of display-title changes

Do not use:

- `item1`
- `thing2`
- random UUIDs as human-authored entity IDs unless required by system

---

# 8. Schema Version

Every configuration entity/file must use the current supported `schemaVersion`.

Project manifest must also identify:

```json
{
  "template": {
    "id": "investigation",
    "version": "..."
  }
}
```

Do not invent schema/template versions.

Use the provided current versions.

---

# 9. Capabilities List

`project.json` must list capabilities actually used.

Do not list every possible template capability.

Example:

```json
{
  "capabilities": [
    "caseBoard",
    "evidence",
    "hypotheses",
    "rules",
    "state"
  ]
}
```

If project has no NPC, do not list NPC capability and do not create `npcs.json`.

---

# 10. Optional Files

Do not create placeholder optional files unnecessarily.

No NPC:

omit `npcs.json`.

No randomization:

omit `randomization.json`.

No limited resources:

omit `resources.json`.

The package should be minimal but complete.

---

# 11. Content vs Configuration

Use JSON for:

- structure
- IDs
- references
- rules
- metadata
- settings

Use Markdown/content files for:

- mission narrative
- lesson text
- source text
- longer directions
- teacher explanation

Avoid embedding large walls of text in JSON when a content reference is appropriate.

---

# 12. Teacher-Only Data

Clearly identify teacher-only content.

Examples:

- exact solution
- evidence strength
- evidence meaning
- decoy status
- hypothesis support/contradiction metadata
- expected reasoning

Do not accidentally copy teacher-only content into student-facing Markdown.

When production architecture separates teacher/student packages, preserve that separation.

---

# 13. Evidence Generation

For each evidence item determine:

- stable ID
- type
- student title
- content/reference
- availability
- requirement
- student actions
- teacher metadata
- hypothesis relationships
- unlock rules
- audience

Do not make all evidence required by default.

Respect the designer brief.

---

# 14. Evidence Types

Use registered evidence types.

Examples may include:

- text
- image
- document
- observation
- measurement
- lab result
- data table
- graph
- map
- interview
- artifact
- student upload

If a requested evidence type is not registered, use capability-gap procedure.

---

# 15. Evidence Relationships

Teacher metadata can specify:

- supports
- contradicts
- rules out
- related to
- consistent with
- weakens

Do not overstate ambiguous evidence.

If source information does not establish a relationship, leave it unset or identify uncertainty.

---

# 16. Case Board Generation

Build Case Board from designer choices.

Use generic sections.

Rename through configuration.

Example:

```text
Hypothesis -> Possible Substance
```

Do not create new software section types solely because wording differs.

---

# 17. Investigation Phases

Generate phases from the brief.

Each phase may reference:

- activities
- lessons
- rules
- completion requirements

Do not force 3 weeks or 3 phases.

Do not force generic phase names.

---

# 18. Activity Generation

Activities reference registered shared activity types/plugins.

For each activity identify:

- ID
- title
- type
- required status
- purpose
- Investigation extensions
- evidence produced
- state implications
- resource costs
- rules

If the designer says an existing coded simulation must be used, reference the known registered/adapted plugin ID.

Do not fabricate a plugin ID.

If plugin does not yet exist:

`TEMPLATE_CAPABILITY_GAP`.

---

# 19. Rule Generation

Convert plain-English gates into structured RuleDefinitions.

Prefer small clear rules.

Avoid one giant rule when several meaningful rules are easier to debug.

Every rule should have:

- stable ID
- trigger
- conditions if needed
- actions
- repeatable setting
- priority
- enabled state

---

# 20. Rule Safety

Before outputting rules, check for obvious:

- self-trigger loops
- infinite resource rewards
- circular unlocks
- impossible conditions
- missing targets
- non-repeatable actions marked repeatable accidentally

Formal validator runs after generation, but the LLM should avoid obvious defects.

---

# 21. State Generation

Only create state variables needed by project behavior.

State IDs should be semantic.

Examples:

```text
case.unknownSubstance
site.fossilsReviewed
patient.condition
```

Do not create dozens of unused state variables.

---

# 22. Resource Generation

Only create resources when designer requested limited resources.

Each resource must include:

- stable ID
- initial amount
- min/max if relevant
- unit label
- visibility
- sharing scope

Activities/rules reference the resource by ID.

---

# 23. Randomization Generation

Only create if requested.

Define:

- scope
- strategy
- options
- seed strategy
- output state

Randomization must be reproducible.

Do not randomize content that would invalidate the standards/assessment unless the brief explicitly supports equivalent variants.

---

# 24. NPC Generation

Only create if requested.

Use scripted NPCs.

Each NPC may include:

- identity
- role
- bio
- dialogue
- locked dialogue
- evidence outputs
- availability rules

Do not create AI prompts/providers.

---

# 25. Hypothesis Generation

Respect the configured mode:

- studentGenerated
- predefined
- mixed

If predefined, create only hypotheses supported by the designer/source material.

Do not invent scientifically/historically incorrect decoys unless the designer explicitly requests misconceptions/decoys and their role is clear.

---

# 26. Final Submission

Generate sections based on the brief.

Possible:

- identification
- diagnosis
- claim
- evidence
- reasoning
- counterevidence
- alternative explanation
- confidence
- uncertainty
- recommendation
- reflection
- individual contribution

Do not force all sections into every project.

---

# 27. Exact Solution Mode

When `exact`:

- define correct solution ID(s)
- preserve teacher explanation
- ensure evidence path can support the answer
- avoid revealing solution in student content

---

# 28. Multiple-Defensible Mode

When `multipleDefensible`:

Do not create a fake exact answer.

Define evaluation around:

- evidence
- reasoning
- constraints
- handling contradictory evidence
- uncertainty

If acceptable solution IDs are defined, they are not necessarily exhaustive unless the designer says so.

---

# 29. Ranked Mode

When `ranked`:

Provide:

- ranking criteria
- constraints
- evidence expectations

Do not assume rank solely from one numeric score unless specified.

---

# 30. Open Evidence-Based Mode

When `openEvidenceBased`:

No exact solution is required.

Ensure final submission emphasizes:

- claim
- evidence
- reasoning
- uncertainty
- limitations

---

# 31. Teams

Respect:

- individual
- team
- mixed

Specify:

- board mode
- roles
- evidence distribution
- shared/private work

Do not make all reasoning team-shared if the designer wants individual accountability.

---

# 32. Existing Project Migration

If the brief indicates existing code:

Do not generate replacement software architecture.

Generate configuration that can reference/adapt existing registered activities/plugins.

Include migration notes in `generation-report.json`:

- existing behavior expected
- adapter/plugin dependency
- unresolved capability gaps

The software-development Codex handles code migration separately.

---

# 33. Validation Handoff

After generation, the project must pass:

1. package validation
2. schema validation
3. reference validation
4. capability validation
5. logic validation

The LLM should not claim the project is production-ready before validator results are available.

---

# 34. Generation Report

Produce:

`metadata/generation-report.json`

or equivalent human-readable report including:

- project ID
- schema/template versions
- files generated
- capabilities used
- fields inferred
- unresolved questions
- warnings
- capability gaps
- validation status if validator output provided

---

# 35. Inference Policy

Allowed inference:

- stable IDs
- obvious file names
- formatting
- generic descriptive text consistent with the brief
- safe defaults explicitly defined by template documentation

Do not infer:

- correct answer
- factual evidence
- standards
- grading criteria
- hidden solution relationships
- critical gating
- safety/scientific claims

without source support.

---

# 36. Missing Information

If noncritical information is missing and a documented safe default exists, use the default and report it.

Example:

```text
Inferred:
confidenceMode = lowMediumHigh

Reason:
Designer requested confidence but did not specify scale.
Template default used.
```

If critical, stop and request clarification.

---

# 37. No Silent Curriculum Correction

If designer/source materials conflict:

Report:

```text
SOURCE_CONFLICT

Item:
...

Designer brief says:
...

Source document says:
...

Resolution needed:
...
```

Do not silently choose one unless source-priority rules clearly resolve it.

---

# 38. Output Quality

Student content should be:

- grade appropriate
- clear
- concise enough for online use
- mission connected
- evidence based
- not unnecessarily text heavy

Teacher content may be more detailed.

Do not sacrifice curriculum precision for theme.

---

# 39. Accessibility Authoring

Generated content should include:

- alt-text requirements for meaningful images
- captions/transcript requirement for video/audio
- readable headings
- chunked directions
- non-drag alternative requirements for activities that depend on movement

---

# 40. Final Generation Checklist

Before returning a package, verify:

- [ ] Project ID stable
- [ ] Schema/template versions supplied
- [ ] Only used capabilities listed
- [ ] Required files exist
- [ ] Optional unused files omitted
- [ ] IDs unique
- [ ] References appear valid
- [ ] Teacher-only content separated
- [ ] Evidence paths make sense
- [ ] Activities reference registered types
- [ ] Rules reference existing entities
- [ ] State variables are necessary
- [ ] Resources valid
- [ ] Randomization reproducible
- [ ] NPCs scripted only
- [ ] Final mode matches solution model
- [ ] Existing-code dependencies identified
- [ ] Capability gaps reported
- [ ] Critical missing information reported
- [ ] Generation report produced
