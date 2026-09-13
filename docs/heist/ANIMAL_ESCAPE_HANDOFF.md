# The Midnight Menagerie — animal rescue escape

The project at `/projects/castle-archive-rescue` is now **The Midnight Menagerie**,
project version **2.0.0**. A fictional collector, Baron Bramble, has stolen six
rabbits, four foxes, and two owls. Students operate eight mathematical mechanisms
to free the animals and take them back to a sanctuary. Every step requires a
correct answer; the previous automatic route-planning sequence has been replaced
for this package as requested.

## Playable sequence and answer key

| Step | Mechanism | Mathematics | Outcome |
| --- | --- | --- | --- |
| Secret gate | Three combination dials and tappable animal census | Count 6 rabbits, 4 foxes, 2 owls: **642** | Enter the castle |
| Watchtower passage | Adjustable patrol clock and safe-time strip | Latest departure: 35 − 10 = **25 seconds** | Cross while the lookout faces away |
| Carrot courtyard | Feeder quantity control | 6 × 2 = **12 carrots** | Free six rabbits |
| Bramble den | Two combination dials | 4, 8, 12, **16** | Free four foxes |
| Moon tower | Single-use selectable counterweights and balance | (2 × 3) + 4 = **10 kg**; select **4 + 6** | Free two owls |
| Moonlit moat | Winch length control | 6 × 50 cm = 300 cm = **3 m** | Lower a bridge plank |
| Reed hideout | Water-bowl quantity control | ¼ of 12 = **3 bowls** | Prepare for the last crossing |
| Sanctuary landing | Boat-trip quantity control | 12 ÷ 5 requires **3 outward trips** | Bring all 12 animals home |

The first animal totals are concealed in the roster until the census is solved.
Pens appear on the map and in the roster; solving the relevant mechanism removes
the animals from the pen and adds them to the following group. A distinct final
state places everyone home safely. Completed map markers and trail buttons open
a read-only explanation of the math used at that step.

Thinking time is unlimited. The patrol mechanism is a deliberate simulated
departure setting, with exact interval feedback; it does not require a reflex
click or a running wall-clock timer. Wrong answers preserve progress and provide
actionable hints. Controls support keyboard operation, visible focus, direct
numeric entry, and non-drag weight selection. Transitions focus the puzzle panel
and scroll only as needed. Motion respects the reduced-motion preference.

## Reuse and package contract

The old route planner and gallery mechanisms do not represent sequential animal
release, clock-window selection, and equality-based counterweights together.
The resolved capability gap is the reusable **`heist.escape`** experience with
registered evaluators `heist.escape.code`, `heist.escape.timing`,
`heist.escape.balance`, and `heist.escape.number`.

- A package selects `experience: "escape"`, schema `1.2`, template `heist@1.0`.
  It declares story text, local SVG/WebP/PNG assets, animal groups, ordered steps,
  clues, mathematical mechanisms, release references, and success explanations.
- The pure TypeScript engine owns attempts, answer evaluation, release totals,
  progression, and idempotent command processing. Angular renders state and sends
  `start`, `submit`, and `continue` commands through an injected runtime facade.
  No project-ID checks or project-specific Angular pages were added.
- Validation rejects unknown mechanisms, malformed content and assets, duplicate
  IDs, missing or duplicate releases, unreachable balance totals, impossible
  timing windows, and unreachable input values before mounting the experience.
- The existing Heist launcher and local-session authority boundary are reused.
  The launcher chooses an experience by capability configuration. Existing
  route-planning and gallery definitions retain their implementations.
- The local persistence adapter scopes command checkpoints by tenant, class,
  project, version, actor, team, and attempt. Exact configuration fingerprints
  prevent old progress from being replayed against changed puzzles. Failed loads
  preserve the unreadable save until an explicit fresh start; failed writes show
  an in-page warning. Version 1.1.0 saves are untouched by version 2.0.0.
- No core LMS contracts, backend dependencies, or package installations changed.
  A second harbor-shelter configuration exercises all four evaluators with
  different animals, answers, timing bounds, weights, and release order in tests.

## Files

Added:

- `src/app/templates/heist/escape/domain/`: models, evaluator registry, engine,
  validation, and engine/validation tests.
- `src/app/templates/heist/escape/runtime/`: injected runtime, scoped local adapter,
  and persistence tests.
- `src/app/templates/heist/escape/ui/`: escape component, responsive template,
  workspace/mechanism styles, and control/complete-playthrough tests.
- `src/app/templates/heist/testing/castle-guided.fixture.json`: preserves the
  previous grade-5 package so its compatibility tests remain meaningful.
- `public/projects/castle-archive-rescue/{rescue-castle,rabbit,fox,owl}.svg`:
  authored vector castle and animal artwork.
- This handoff.

Modified:

- Castle `project.json`, its catalog entry, and the Heist launcher and launcher tests.
- Three existing guided engine/runtime/UI test imports now point at the preserved
  guided fixture instead of the remade public package. Their assertions remain.
- `docs/heist/BUILD_PLAN.md` now identifies the current package and handoff.

## Validation and boundaries

- All **82 tests across 13 files** pass: every Heist engine, runtime, component,
  presentation, launcher, and catalog test in the selected suite.
- Production Angular build succeeds with strict TypeScript/template checking.
  Existing stylesheet-budget warnings are confined to other templates.
- After the final restart-panel adjustment, the two component tests and production
  build passed again. The restart question now replaces the content inside the
  focused game panel; cancel preserves the completed rescue.
- Chrome: completed the eight-step rescue; verified a wrong code remains locked,
  correct dial interaction, patrol timing, reload restoration, release counts,
  counterweight controls, and all 12 animals home. Browser error log was empty.
- A 390 × 844 viewport check showed the bridge puzzle and controls fitting without
  horizontal overflow (375 px layout viewport and 375 px document width).
- The architecture script reports two previously documented findings outside this
  work: `core/index.ts` importing `./templates`, and
  `projects/mystery-substance/lab-kit/render-quality.service.ts` living under project
  content. It reports no escape/Heist violation.

The prior castle gameplay and Phaser visual brief are deliberately superseded for
this package by the user's request for an animal escape. The existing Phaser
planner remains available to other mission configurations; this experience uses
accessible DOM/SVG mechanisms. No unresolved capability gap blocks local play.
Official graded/shared attempts still require an authoritative persistence adapter,
as enforced by the existing launcher. No deployment was performed.

Recommended next phase: observe a fifth grader solve the full escape and tune
the clue difficulty from that playtest.

Local preview: `http://127.0.0.1:4218/projects/castle-archive-rescue`.
