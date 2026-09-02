# Fossil Detectives — Investigation Reuse Test

## Purpose

Use the 4th Grade **Fossil Detectives: Rebuild the Lost Landscape** project as the second Investigation Template implementation.

This is an architectural stress test.

The first pilot, Mystery Substance, is a 7th-grade chemistry investigation.

Fossil Detectives is intentionally different:

- younger students
- Earth science
- fossils
- rock layers
- landforms
- maps
- weathering/erosion
- reconstruction of a past environment
- more teacher-controlled progression

If the Investigation Template is truly reusable, Fossil Detectives should run through the same core systems without creating Fossil-specific replacements.

---

# 1. Educational Goal

Students use fossil and Earth-history evidence to reconstruct a mystery region's past environment and explain how Earth processes changed the landscape.

Main science ideas:

- fossil evidence
- rock layers
- past environments
- erosion
- weathering
- landforms
- Earth-history evidence
- evidence-based claims

Final product:

A Lost Landscape Reconstruction Board with:

- fossil clues
- map evidence
- rock-layer model
- explanation of landscape change

---

# 2. Investigation Goals

Primary:

`determineCause` or `evaluateExplanations`

Supporting:

`solveMystery`

Interpretation:

Students are solving:

```text
What was this environment like in the past,
and what evidence supports that reconstruction?
```

They may also determine:

```text
What Earth processes changed the landscape?
```

---

# 3. Solution Model

Recommended:

`multipleDefensible`

or:

`ranked`

depending on curriculum configuration.

Different reconstructions may be acceptable if:

- evidence is used accurately
- incompatible evidence is addressed
- landscape interpretation is scientifically reasonable

Do not force an artificial exact answer merely because Mystery Substance used one.

This is a critical reuse test.

---

# 4. Grade-Level Control

This project should be more teacher-controlled than the 7th-grade pilot.

Suggested:

```text
Evidence order:
fixed or partiallyOpen

Activity order:
fixed or partiallyOpen

Lesson order:
fixed

Decoys:
few or none initially

Optional evidence:
limited

Revisit:
yes

Multiple hypotheses:
limited or supported

Revision:
guided

Teacher override:
yes
```

This demonstrates that openness is granular configuration, not a separate 4th-grade engine.

---

# 5. Investigation Phases

Suggested:

## Phase 1 — Discover the Site

Mission and initial landscape clues.

## Phase 2 — Examine Fossils

Students identify what fossil evidence suggests.

## Phase 3 — Read the Rocks

Students examine rock-layer evidence.

## Phase 4 — Study the Landscape

Students use landform/map evidence.

## Phase 5 — Build a Reconstruction

Students create a supported explanation of the past environment.

## Phase 6 — Explain What Changed

Students explain weathering/erosion/landscape change.

Exact names remain configuration.

---

# 6. Case Board

Suggested board sections:

- Mission Question
- What We Know
- Questions
- Fossil Evidence
- Rock Evidence
- Map / Landscape Evidence
- Supports
- Does Not Fit
- Possible Past Environments
- Current Reconstruction
- Confidence
- Final Landscape Claim

These are configured using generic CaseBoard sections.

Do not create `FossilCaseBoardComponent`.

---

# 7. Evidence Types

The project should exercise different evidence renderers than Mystery Substance.

Potential evidence:

- fossil image
- fossil description
- rock-layer diagram
- sediment/rock description
- landform map
- erosion image
- weathering image
- timeline/relative-age clue
- field note
- measurement
- student drawing/model
- student-created observation

Use generic renderers or a reusable Earth-science plugin if genuinely necessary.

---

# 8. Hypothesis Label

Instead of "Possible Substance," use:

- `Possible Past Environment`
- `Reconstruction`
- `Explanation`

This must use the same Hypothesis system.

The label is configuration.

---

# 9. Hypothesis / Reconstruction Behavior

Students may:

- consider multiple past-environment explanations
- connect fossils to environments
- compare rock-layer evidence
- identify evidence that does not fit
- revise reconstruction
- set confidence

The system should preserve revisions.

---

# 10. Guided Evidence Progression

For 4th grade, evidence may unlock in a teacher-designed sequence.

Example:

```text
Fossil Set 1
↓
guided question
↓
rock-layer evidence
↓
map evidence
↓
reconstruction checkpoint
```

This uses the same RuleEngine as Mystery Substance.

---

# 11. Activities

Potential generic activities:

- fossil observation
- drag/classify environment clues
- rock-layer ordering
- map observation
- weathering/erosion mini-model
- student reconstruction drawing/upload

If an activity requires a new renderer/plugin, first determine whether it is reusable beyond Fossil Detectives.

---

# 12. State

Possible state examples:

```text
site.fossilsReviewed
site.rockLayersReviewed
site.mapReviewed
reconstruction.submitted
landscape.changeExplanationComplete
```

Use generic state definitions.

---

# 13. Rules

The project should demonstrate:

- fixed/guided evidence unlocks
- phase progression
- required evidence collection
- reconstruction checkpoint
- revision requirement if configured
- final submission opening

---

# 14. No Limited Resources Required

Limited resources are not mandatory merely because the template supports them.

This reuse test should prove that capabilities can be omitted cleanly.

`resources.json` may be absent.

No placeholder resource should be created.

---

# 15. NPC Optional

No NPC is required.

If the curriculum does not need a character, `npcs.json` may be absent.

This tests optional capability handling.

---

# 16. Randomization Optional

Randomization is not required.

If used, possible variations:

- different fossil sets
- different mystery sites
- different rock-layer evidence

But do not introduce randomization merely for demonstration.

---

# 17. Final Investigation

Suggested sections:

- Past Environment Claim
- Fossil Evidence
- Rock Evidence
- Map / Landscape Evidence
- Reasoning
- Evidence That Did Not Fit
- Confidence
- Landscape Change Explanation
- Reconstruction Visual
- Reflection

Use the same FinalInvestigation system.

---

# 18. Multiple-Defensible Evaluation

The final system must support evaluation based on:

- evidence quality
- correct evidence use
- scientific reasoning
- coherence
- handling contradictory evidence
- uncertainty

Do not auto-grade purely against one solution ID.

This is a key difference from Mystery Substance.

---

# 19. Required Reuse

The following should be reused unchanged or configuration-driven:

- ProjectPackageLoader
- RuntimeEventBus
- RuntimeStateService
- RuleEngine
- CommandExecutor
- CaseBoardComponent
- BoardSectionHost
- EvidenceService
- HypothesisService
- HypothesisHistory
- InvestigationStateService
- FinalInvestigationComponent
- validation system

---

# 20. Prohibited Fossil-Specific Replacements

Do not create:

- FossilEvidenceService
- FossilRuleEngine
- FossilRuntimeService
- FossilCaseBoardComponent
- FossilHypothesisService
- FossilFinalSubmissionEngine

A reusable Earth-science evidence renderer/plugin is allowed only when existing generic renderers are insufficient.

---

# 21. Reuse Audit

After implementation, Codex must produce:

```text
FOSSIL DETECTIVES REUSE AUDIT

Core services reused unchanged:
...

Investigation components reused unchanged:
...

Configuration differences:
...

New generic capability added:
...

New plugin added:
...

Core contract changes:
...

Why changes were necessary:
...

Could the change have been a plugin:
...

Architecture concerns:
...
```

---

# 22. Failure Signal

If Fossil Detectives requires major changes to:

- Case Board architecture
- EvidenceService
- HypothesisService
- RuleEngine
- runtime state model

stop and review the abstraction.

Do not keep patching until the project works.

The purpose of this project is to expose architectural weaknesses.

---

# 23. Success Criteria

The reuse test passes when:

1. project uses same Investigation engine,
2. project is more guided through configuration,
3. different evidence types work,
4. multiple-defensible solution mode works,
5. optional resources/NPC/randomization can be omitted,
6. final product differs without new final engine,
7. no Fossil-specific core services exist,
8. validation passes,
9. build/tests pass,
10. reuse audit shows minimal or no core changes.
