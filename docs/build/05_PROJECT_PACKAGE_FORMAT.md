# Project Package Format

## Purpose

Define the file/package structure generated for each Investigation project.

The project package is **curriculum configuration and content**, not Angular application code.

The Investigation runtime must be able to load a valid project package without project-specific TypeScript components or services.

---

# 1. Core Rule

A project package answers:

- What is this project?
- What content does it contain?
- What Investigation capabilities does it use?
- What evidence exists?
- What activities exist?
- What rules control progression?
- What state variables/resources/randomization are defined?
- What final submission is required?

It does **not** contain:

- student runtime state
- team runtime state
- teacher overrides
- live database records
- project-specific Angular components
- backend implementation code
- executable JavaScript, TypeScript, WebAssembly, or remotely loaded executable
  project code

Packages may reference only platform-installed, trusted, versioned capability
plugin IDs. Package assets and Markdown are content and must be handled as
untrusted input; they do not gain code execution privileges.

---

# 2. Canonical Folder Structure

Source-controlled incoming and authored packages live under `projects/`, one
folder per stable project ID. The temporary
`projects/investigation-project/` folder is reserved for the next uploaded
Investigation package and should be renamed to the manifest ID after intake.

Production publication may move immutable versioned packages to cloud object
storage; the same folder/file contract remains behind the package-source
adapter.

Recommended structure:

```text
/project-id/
│
├── project.json
├── investigation.json
├── case-board.json
├── evidence.json
├── activities.json
├── lessons.json
├── rules.json
├── state.json
├── resources.json
├── randomization.json
├── npcs.json
├── teams.json
├── assessments.json
├── final-submission.json
│
├── content/
│   ├── mission.md
│   ├── lesson-01.md
│   ├── lesson-02.md
│   └── ...
│
├── assets/
│   ├── asset-manifest.json
│   └── ...
│
└── metadata/
    └── generation-report.json
```

Not every project requires every optional file.

---

# 3. Required Files

Every Investigation project must include:

- `project.json`
- `investigation.json`
- `case-board.json`
- `evidence.json`
- `activities.json`
- `rules.json`
- `state.json`
- `final-submission.json`

The following may be optional depending on project capabilities:

- `lessons.json`
- `resources.json`
- `randomization.json`
- `npcs.json`
- `teams.json`
- `assessments.json`
- `asset-manifest.json`

---

# 4. `project.json`

## Purpose

High-level manifest for the project package.

Required concepts:

- stable project ID
- schema version
- project title
- template ID/version
- grade level(s)
- primary/supporting subjects
- duration
- status
- capability list
- references to major project files
- optional standards/mastery metadata

Example:

```json
{
  "id": "project-mystery-substance",
  "schemaVersion": "1.0",
  "title": "Mystery Substance Outbreak Lab",

  "template": {
    "id": "investigation",
    "version": "1.0"
  },

  "projectType": "investigation",

  "gradeLevels": [7],

  "subjects": {
    "primary": "science",
    "supporting": ["ela"]
  },

  "duration": {
    "value": 3,
    "unit": "weeks"
  },

  "status": "draft",

  "investigationConfigRef": "investigation.json",

  "capabilities": [
    "caseBoard",
    "evidence",
    "studentEvidence",
    "hypotheses",
    "rules",
    "state",
    "limitedResources",
    "randomization"
  ]
}
```

---

# 5. `investigation.json`

## Purpose

Defines the Investigation-specific structure.

Contains:

- goal(s)
- solution model
- mission
- phases
- openness/control settings
- hypothesis settings
- solution definition
- reveal behavior

Example outline:

```json
{
  "id": "investigation-main",
  "schemaVersion": "1.0",

  "goals": [
    "identifyUnknown"
  ],

  "solutionModel": "exact",

  "mission": {
    "role": "Lab Investigation Team",
    "drivingQuestion": "What substance caused the outbreak?"
  },

  "phases": [
    {
      "id": "phase-incident",
      "title": "Examine the Incident",
      "order": 1
    },
    {
      "id": "phase-testing",
      "title": "Test the Samples",
      "order": 2
    }
  ],

  "openness": {
    "evidenceOrder": "partiallyOpen",
    "activityOrder": "partiallyOpen",
    "lessonOrder": "fixed",
    "allowDecoys": true,
    "allowOptionalEvidence": true,
    "allowRevisit": true,
    "allowHypothesisRevision": true,
    "requireHypothesisRevision": true,
    "allowMultipleHypotheses": true,
    "teacherOverrideAllowed": true
  }
}
```

---

# 6. `case-board.json`

## Purpose

Defines the student-facing Case Board layout and interaction capabilities.

Contains:

- layout mode
- board sections
- section order
- section labels
- allowed card types
- interactions

Example:

```json
{
  "id": "case-board-main",
  "schemaVersion": "1.0",

  "layoutMode": "zones",

  "interactions": {
    "dragDrop": true,
    "reorder": true,
    "annotate": true,
    "connectEvidence": true,
    "createStudentEvidence": true,
    "confidenceRating": true
  },

  "sections": [
    {
      "id": "board-evidence-locker",
      "schemaVersion": "1.0",
      "type": "evidence",
      "title": "Evidence Locker",
      "order": 1,
      "studentEditable": true
    },
    {
      "id": "board-supports",
      "schemaVersion": "1.0",
      "type": "evidence",
      "title": "Supports",
      "order": 2,
      "studentEditable": true
    }
  ]
}
```

---

# 7. `evidence.json`

## Purpose

Defines teacher/designer-authored evidence.

Recommended file shape:

```json
{
  "schemaVersion": "1.0",
  "items": []
}
```

Each evidence item follows `EvidenceDefinition`.

Evidence can reference:

- Markdown content
- assets
- tables/data
- other evidence
- rules
- hypothesis relationships

Do not embed large binary payloads.

---

# 8. Evidence File Example

```json
{
  "schemaVersion": "1.0",

  "items": [
    {
      "id": "ev-temperature-result",
      "schemaVersion": "1.0",
      "title": "Temperature Test Result",

      "evidenceType": "measurement",

      "content": {
        "text": "The sample increased from 21 C to 37 C during the test."
      },

      "availability": {
        "initialState": "locked",
        "ruleIds": [
          "rule-unlock-temperature-result"
        ]
      },

      "requirement": "required",

      "studentCapabilities": {
        "annotate": true,
        "classify": true,
        "connect": true,
        "cite": true
      },

      "instructionalMetadata": {
        "reliability": 0.95,
        "relevance": 0.9,
        "strength": 0.8,
        "teacherMeaning": "Supports an exothermic reaction interpretation."
      }
    }
  ]
}
```

Teacher-only metadata must be filtered from student payload/view models.

---

# 9. `activities.json`

## Purpose

Defines project activities using the shared LMS Activity contract.

Recommended shape:

```json
{
  "schemaVersion": "1.0",
  "items": []
}
```

Investigation-specific behavior belongs inside the Investigation extension namespace.

Example:

```json
{
  "id": "act-heat-sample",
  "schemaVersion": "1.0",
  "title": "Heat the Sample",
  "type": "simulation",
  "required": true,

  "extensions": {
    "investigation": {
      "evidenceProducedIds": [
        "ev-temperature-result"
      ],

      "resourceCosts": [
        {
          "resourceId": "resource-lab-credits",
          "amount": 1
        }
      ],

      "ruleIds": [
        "rule-unlock-temperature-result"
      ]
    }
  }
}
```

The activity type/plugin must already be registered.

If not, validation returns an unsupported-capability issue.

---

# 10. `lessons.json`

## Purpose

Defines project-linked lessons using shared LMS content/lesson capability.

Recommended shape:

```json
{
  "schemaVersion": "1.0",
  "items": [
    {
      "id": "lesson-chemical-change",
      "title": "Evidence of Chemical Change",
      "contentRef": "content/lesson-chemical-change.md",
      "required": true
    }
  ]
}
```

Detailed lesson content should normally live in Markdown/content blocks instead of large JSON strings.

---

# 11. `rules.json`

## Purpose

Defines gates, branching, state consequences, unlocks, teacher-triggerable flows, and final availability.

Recommended shape:

```json
{
  "schemaVersion": "1.0",
  "items": []
}
```

Example:

```json
{
  "id": "rule-unlock-temperature-result",
  "schemaVersion": "1.0",

  "trigger": {
    "eventType": "activity.completed",
    "targetId": "act-heat-sample"
  },

  "conditions": {
    "operator": "AND",
    "conditions": []
  },

  "actions": [
    {
      "type": "evidence.unlock",
      "targetId": "ev-temperature-result"
    }
  ],

  "repeatable": false,
  "priority": 100,
  "enabled": true
}
```

---

# 12. `state.json`

## Purpose

Defines available project state variables and their initial values.

Recommended shape:

```json
{
  "schemaVersion": "1.0",
  "items": []
}
```

Example:

```json
{
  "id": "state-sample-b-condition",
  "schemaVersion": "1.0",
  "title": "Sample B Condition",

  "stateType": "choice",

  "initialValue": "untested",

  "allowedValues": [
    "untested",
    "heated",
    "reacted",
    "identified"
  ],

  "studentVisible": false,
  "mutable": true
}
```

Actual student/team state is never stored here.

---

# 13. `resources.json`

## Purpose

Defines limited Investigation resources.

Example:

```json
{
  "schemaVersion": "1.0",

  "items": [
    {
      "id": "resource-lab-credits",
      "schemaVersion": "1.0",
      "title": "Lab Credits",
      "resourceType": "points",
      "initialAmount": 5,
      "min": 0,
      "unitLabel": "credits",
      "studentVisible": true,
      "sharedMode": "team"
    }
  ]
}
```

If the project does not use limited resources, this file may be absent.

---

# 14. `randomization.json`

## Purpose

Defines reproducible randomization assignments.

Example:

```json
{
  "schemaVersion": "1.0",

  "items": [
    {
      "id": "random-unknown-substance",
      "schemaVersion": "1.0",

      "scope": "team",
      "strategy": "choice",
      "seedStrategy": "team",

      "options": [
        { "value": "substance-a" },
        { "value": "substance-b" },
        { "value": "substance-c" }
      ],

      "outputStateId": "case.unknownSubstance"
    }
  ]
}
```

The assigned result is stored in runtime, not rewritten into this file.

---

# 15. `npcs.json`

## Purpose

Defines scripted non-AI characters.

Example:

```json
{
  "schemaVersion": "1.0",

  "items": [
    {
      "id": "npc-lab-tech",
      "schemaVersion": "1.0",
      "title": "Lab Technician",
      "characterType": "witness",
      "role": "Technician",

      "studentVisibleBio": "The technician was working in the lab when the incident happened.",

      "dialogueNodes": [
        {
          "id": "dialogue-first-observation",
          "studentPrompt": "What did you notice first?",
          "response": "The container became warm shortly after the samples were mixed.",
          "evidenceProducedIds": [
            "ev-witness-warm-container"
          ]
        }
      ]
    }
  ]
}
```

AI integration is not part of this file in V1.

---

# 16. `teams.json`

## Purpose

Defines Investigation-specific team configuration.

Example:

```json
{
  "schemaVersion": "1.0",

  "mode": "mixed",

  "boardMode": "sharedWithPrivateLayer",

  "roles": [
    {
      "id": "role-lab-lead",
      "title": "Lab Lead",
      "responsibilities": [
        "Run tests",
        "Record observations"
      ]
    }
  ]
}
```

If the investigation is individual only, this file may be absent or minimal.

---

# 17. `assessments.json`

## Purpose

References/defines shared LMS assessments attached to the Investigation.

Use the shared assessment schema.

Investigation-specific criteria may reference:

- evidence selection
- evidence evaluation
- reasoning
- hypothesis revision
- counterevidence
- conclusion quality
- uncertainty

Do not create a parallel Investigation-only assessment engine.

---

# 18. `final-submission.json`

## Purpose

Defines the final Investigation package.

Example:

```json
{
  "id": "final-investigation-report",
  "schemaVersion": "1.0",
  "title": "Final Investigation Report",
  "submissionType": "investigationReport",

  "teamMode": "mixed",

  "sections": [
    {
      "id": "final-identification",
      "schemaVersion": "1.0",
      "type": "identification",
      "title": "Final Identification",
      "required": true
    },
    {
      "id": "final-evidence",
      "schemaVersion": "1.0",
      "type": "evidence",
      "title": "Evidence",
      "required": true,
      "evidenceRequired": true,
      "minEvidenceCount": 3
    },
    {
      "id": "final-reasoning",
      "schemaVersion": "1.0",
      "type": "reasoning",
      "title": "Reasoning",
      "required": true
    }
  ]
}
```

---

# 19. `content/`

## Purpose

Stores human-readable content separate from structural JSON.

Examples:

- mission narrative
- lesson text
- evidence source text
- teacher directions
- hint content
- final-reveal explanation

Prefer Markdown for text-heavy content.

---

# 20. `assets/asset-manifest.json`

## Purpose

Maps stable asset IDs to asset metadata/references.

Example conceptual structure:

```json
{
  "schemaVersion": "1.0",

  "assets": [
    {
      "id": "asset-lab-photo-01",
      "type": "image",
      "path": "assets/lab-photo-01.png",
      "alt": "Photo of the laboratory workbench after the incident."
    }
  ]
}
```

Production file storage may replace local paths with external asset references.

Project configuration should reference stable asset IDs when possible.

---

# 21. `metadata/generation-report.json`

## Purpose

Optional report produced by an LLM authoring pipeline.

May contain:

- generator version
- source brief version
- generation timestamp
- inferred fields
- warnings
- capability gaps
- unresolved questions
- validation summary

This file is designer/admin metadata and is not required for student runtime.

---

# 22. Internal References

All cross-file references use stable IDs.

Good:

```json
{
  "targetId": "ev-temperature-result"
}
```

Bad:

```json
{
  "targetTitle": "Temperature Test Result"
}
```

Titles are display content, not identifiers.

---

# 23. Optional File Rules

A missing optional file must mean:

`capability not configured`

not:

`broken project`

Examples:

No `npcs.json` -> no scripted NPCs.

No `randomization.json` -> deterministic same case configuration.

No `resources.json` -> no limited resources.

---

# 24. Project Definition Graph

The ProjectPackageLoader should convert modular files into an in-memory graph/index.

Recommended lookup indexes:

- project
- phases by ID
- evidence by ID
- activities by ID
- lessons by ID
- rules by ID
- state variables by ID
- resources by ID
- NPCs by ID
- randomizations by ID
- final sections by ID

Components/services query this graph rather than repeatedly parsing files.

---

# 25. Validation Order

Before a project is rendered:

1. recognize schema/template versions
2. validate required file structure
3. schema validate entities
4. build ID indexes
5. validate cross references
6. validate capabilities
7. validate logic/reachability
8. produce project graph
9. allow preview/runtime if no blocking errors

---

# 26. Publication Rule

A project with blocking validation errors cannot be published.

Preview mode may optionally allow certain warnings.

Never silently omit required invalid content in production student mode.

---

# 27. LLM Authoring Rule

The LLM should generate this package structure.

It should not generate Angular code unless explicitly operating as a software developer extending the engine.

Curriculum generation and engine development are separate workflows.

The V1 authoring path is Designer Project Brief -> Curriculum LLM -> declarative
package -> schema/reference/capability/logic validation -> preview -> designer
revision -> publish. Human designers should not normally edit raw JSON. A
readable generation report and migration/audit output accompany the package.
