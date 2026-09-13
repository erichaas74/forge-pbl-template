# Castle Archive Rescue: grade 5

The user requested simpler gameplay for a fifth grader. Castle package **1.1.0**
replaces the catalog's 1.0.0 practice activity. This intentionally changes the
earlier plan's difficulty; it is not just a visual upgrade.

## Student experience

1. Choose the shorter courtyard path or a tower path that takes one extra minute.
   The complete path includes automatic pickup and delivery to the boat.
2. Solve three questions, one at a time: 9 × 10 = 90 meters; 90 ÷ 2 = 45 seconds;
   80 − 60 = 20 kilograms of spare carrying capacity. Wrong answers offer a hint.
3. Start the rescue. The team follows the path automatically. At pickup, the game
   pauses: a broken wheel lowers the cart's limit from 80 kg by 30 kg. After solving
   80 − 30 = 50 kg, choose to carry the 60 kg box together or fix the wheel.
4. Reach the boat, explain the choice, and optionally watch the replay or play again.

The gate remains open. There is one courtyard guard, a smaller sight range, and
five seconds of detection grace. No manual waits or precision patrol timing are
needed for either supplied path. The deadline is 10 game minutes; thinking time
does not consume it. Normal playback runs four game seconds per real second.
Both cargo speeds and all required math answers use whole numbers. Carrying
together is slower; repairing takes longer to prepare but finishes sooner.

| Path | Carry together | Fix the wheel |
| --- | ---: | ---: |
| Courtyard | 6:55 | 5:35 |
| Tower | 7:55 | 6:35 |

The interface uses larger text and buttons, three progress steps, friendly labels,
and a single next action. Measuring, manual waits, pickup checkboxes, exposure
readouts, percentage calculations, and the full planning timeline are absent from
the guided interface. Extra map controls, replay details and evidence export are
available through disclosures. A solved wheel question is replaced by the choices
so children do not have to scroll past the old question to find the next action.

## Reusable implementation and files

- Optional `Mission.guidance.routes` defines one to three named complete paths.
  Validation checks unique IDs, node references, open connections, pickup visit,
  entry, extraction and route length. The new `route` command selects a validated
  path, removes manual waits and includes pickup through the domain engine.
- Optional `math.routeChecks: 'first-leg'` asks scale and travel time for the first
  move. The default remains `all`. Readiness and UI use the same question generator;
  selecting a short question set does not leave hidden per-leg math requirements.
- Angular owns the guided interface, hints, focus, accessible controls and runtime
  commands. The pure TypeScript engine retains timeline, capacity, patrol and
  outcome authority. Phaser still presents the same engine positions and events.
- Modified mission JSON, catalog entry, domain models/validator/timeline/engine,
  Angular component/template, and Phaser gate/character labels. Added
  `ui/heist-guided.scss`, `domain/heist-guided.spec.ts` and
  `testing/castle-advanced.fixture.json`. Existing engine, UI, persistence and
  presentation tests retain the original full-math fixture; new tests cover the
  grade-5 package and guided controls.
- No core LMS contract, shared dependency, trading implementation or backend change.
  No unresolved template capability gap. Schema/template 1.0 remains compatible:
  the added fields and command are optional; Harbor and the older full-math mission
  retain their planning and math rules.

## Saves and verification

Project version **1.1.0** creates a separate local save scope. Existing 1.0.0 saves
are left untouched and are not replayed against changed difficulty. Guided path
commands, attempts, paused crises and outcomes use the existing persistence adapter.

- 43 tests across seven files passed, including all four path/response combinations,
  old mission failures and Harbor, malformed guided configuration, automatic pickup,
  step progression, hidden-until-solved choices, partial save restoration and replay.
- Production build passed with the existing stylesheet budget warnings in other
  templates. Phaser remains lazy and its version is unchanged.
- Chrome: verified wrong-answer hints, the three-question flow, restoration of the
  selected path and partial answers, paused wheel problem and restored crisis answer.
  Confirmed both response buttons fit at 1024 × 768. The full-width canvas tracks its
  parent correctly after the drawer closes. Completed the courtyard path with wheel
  repair at **5:35**, then opened the replay at its beginning. The browser error log
  was empty. A final label adjustment keeps the map status on “Replay” while seeking
  instead of showing the completed outcome at the start of the replay.

Local preview: `http://127.0.0.1:4216/projects/castle-archive-rescue`.
No deployment, physical Chromebook test or student usability session was performed.
The previous in-app Phaser import limitation was not re-investigated in this pass.

Recommended next step: observe a fifth grader complete one rescue and adjust the
wording or pace using that feedback.
