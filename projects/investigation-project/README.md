# Incoming Investigation Project

Upload the Investigation project package into this folder. The folder is a
staging name; after `project.json` is available, rename this directory to the
manifest's stable project ID and place versioned releases beneath it when
appropriate.

Expected package files:

```text
project.json
investigation.json
case-board.json
evidence.json
activities.json
rules.json
state.json
final-submission.json
lessons.json             # optional
resources.json           # optional
randomization.json       # optional
npcs.json                # optional
teams.json               # optional
assessments.json         # optional
content/                 # Markdown/content
assets/                  # asset manifest and referenced files
metadata/                # generation/audit report
```

The package must remain declarative. Do not place executable JavaScript,
TypeScript, WebAssembly, or project-specific Angular code here. Interactive
features reference trusted, platform-installed capability plugin IDs.

