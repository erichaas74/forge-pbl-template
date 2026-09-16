# Trading company: eight weekly journeys and ledger lessons

Project version **1.16.0**, lesson plan **2.0.0**, simulation schema **1.12**.

## Activity design and audit

The previous sequence opened with company forms, scattered map controls and a
large standards block; later lessons reused forecast/report pages. The redesign
uses the existing Phaser map as the main activity and switches that same panel
between the map, town shops and an interactive ledger desk. No content bands were
added above or below the activity. The shared header and compact standards row
remain outside it. Weekly tasks precede the disconnected AI Tutor planning box;
student reflections are written and saved only in that side area.

Interaction alternatives considered: a fixed automatic caravan, route selection
on the existing map, and a shop-only trading round. Route selection was chosen
because it preserves spatial decisions, a visible return journey, route costs,
and progressively harder travel. Shopping uses a goods shelf and quantity
controls. Accounting uses movable receipts with keyboard/click placement.

| Week | Main activity | New challenge |
| --- | --- | --- |
| 1 | Map → shops → Fort Bridger → home | One outbound day and one return day; $200 starting cash |
| 2 | First journey ledger | Sort receipts, reconcile cash, write an improvement plan |
| 3 | Longer Fort Laramie journey | Multiple roads, $300 budget, storm and protection/delay/loss choices |
| 4 | Weather ledger | Compare protection costs, time and damaged cargo |
| 5 | Mining-camp journey | Longer mountain roads, alternative route, $400 budget, storm and raiders |
| 6 | High-country ledger | Separate inventory loss from cash expense; justify a better strategy |
| 7 | Multi-stop company journey | Fort Laramie and mining camp, $500 budget, weather, raiders and flood |
| 8 | Final budget and reflection | Reconcile the last journey and compare strategies across records |

Each pair uses one saved expedition. Each expedition has its own configured
opening budget; increased capital is not counted as trading profit. Navigation
never spends money, advances a day, or requires an earlier lesson. Practice
ledgers are explicitly labelled, generated through the same domain reducer,
and isolated from actual journeys. The final example uses fictional reconciled
journeys without reading or writing student storage.

## Reusable capability

`roundTripTrading` is an optional simulation capability, not a project-name branch.
`expeditionCourse` config supplies goods, budgets, capacity, required destinations,
road durations/costs and deterministic hazard choices. The domain reducer handles
trading, travel, inventory cost, noncash damage, filing, balance checks and reflection.
Angular owns presentation; Phaser consumes map presentation snapshots.

Meaningful actions use the existing simulation runtime and persistence adapter
through `expedition.action`, carrying a cycle ID and expected revision. Stale
retries fail without a duplicate purchase or expense. The parent runtime version
and timestamp update at each checkpoint. Teacher pause still uses the shared
runtime guard. Animation never changes the accounting.

Shape and reference validation check the optional package configuration, goods,
roads, return reachability, integer costs and zero-cash hazard responses. Packages
without the capability retain the original season workflow and its regression tests.
Optional `ProjectLesson.week` supports the eight weekly sessions while omitted
values preserve the existing two-session-per-week layout in other projects.

### Accounting

- Opening cash + sales − cash spending = cash on hand.
- Inventory tracks quantity and acquisition cost; partial sales remove proportional cost.
- Cargo loss reduces inventory cost and has a zero cash delta. Filing it as a cash
  expense fails reconciliation instead of charging the same loss twice.
- Profit/loss = closing cash + remaining inventory at cost − opening capital.
- Shop buying prices are at least 10% above their local offer to buy goods back,
  preventing a profitable buy/sell loop in the same shop.
- Every leg charges its configured travel cost. Delays require additional travel
  turns; hazard decisions preserve their cost, delay and actual lost quantity.

## Files and assets

Added:

- `src/app/projects/frontier-trading/frontier-expeditions.ts`: course content.
- `src/app/templates/simulation-decision/domain/expedition-course.*`: contracts,
  reducer, validation, practice examples and accounting tests.
- `src/app/templates/simulation-decision/ui/expedition/*`: workspace, shop, ledger,
  side area and integration tests.
- `src/app/shared/project-lessons/project-lesson-week.spec.ts`: schedule compatibility.

Modified the simulation shell/runtime/package boundary, route-atlas embedded
presentation, weekly navigation/standards grouping, project versions and lesson
mapping, and the completed-sample renderer. The old student-flow fixture opts out
of the new capability so the legacy season remains covered.

No new bitmap/media assets. Reused the existing frontier map, shop street, wagon,
sack, crate, bale and coil artwork and Phaser weather/conflict/flood effects.

## Verification

- Production build passed after the final layout changes. The existing component
  stylesheet budget warnings remain; there are no build errors.
- Focused regression run: **20 test files, 149 tests passed** (simulation domain,
  runtime, UI, package validation, weekly schedule compatibility and lesson registry).
  Used one Vitest worker because the broad parallel run exceeded available memory.
- Browser: first trip bought six Flour for $134.64, sold them for $191.40, paid
  $6 in each direction, and returned with $244.76. Week 2 showed the same four
  receipts, reconciled to zero difference, and restored the balance and written
  reflection after reload.
- Browser: Week 7 entered storm, raider and flood decisions on successive roads;
  paid responses changed cash and continued the route. All three map effects
  were visually inspected.
- Domain tests exercise all four full return journeys, hazards, costs, duplicate
  commands, persistence, overspending/capacity/quantity guards and invalid configs.
- UI tests visit all eight lesson contexts, check the main panel has no writing
  fields, check tasks precede the tutor, and verify practice isolation and paired saves.
- Browser: inspected the shops, weather practice ledger and fictional final example;
  the example balances to zero difference and its teaching guide opens correctly.
- Browser: opened each week directly and checked the local teacher pause/resume
  control. Journey weeks open the map; ledger weeks open the paired accounts.
- Responsive ledger check at 390 × 844: no horizontal page overflow; receipts,
  all three filing columns and reconciliation controls remain reachable.
- Responsive map check at 390 × 844: route selection, map controls, cash/cargo,
  and the shop entry remain visible. Desktop map uses the full activity height
  with compact controls overlaid inside the scene.

The current production preview is served locally at
`http://127.0.0.1:4337/projects/frontier-trading-company/lessons?lesson=1`.

Broader existing check limitations observed during development: the pending
curriculum disclosure test requests an absent Time Repair version `2.0.0`; its
non-writable dialog mock also affects a standards-review test. The architecture
script reports existing `core/index.ts -> ./templates` and a project-local Mystery
Substance service. These unrelated project files were not changed for this audit.

## Remaining scope

The tutor is explicitly disconnected. Persistence remains the existing scoped
browser adapter; this work does not add server-authoritative accounting or a live
AI assessment. The map remains a stylized, non-scale educational setting. Review
this trading project with the user before auditing another project. The next useful
pass is a classroom playtest of quantities, reserves and route difficulty.

No unresolved `TEMPLATE_CAPABILITY_GAP`: the necessary optional capability was
implemented and validated within the reusable simulation template.
