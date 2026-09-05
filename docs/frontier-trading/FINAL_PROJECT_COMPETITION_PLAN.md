# Frontier Trading final project competition plan

**Planning date:** September 3, 2026  
**Recommended format:** four-person companies, one 55-minute final, followed by an individual reflection  
**Winner:** highest verified score among teams with a feasible load and a correct final audit

## Design decision

Keep the current game as the individual practice base. It teaches the controls and first decisions in a fixed order:

1. visit two shops;
2. choose a route;
3. buy two kinds of goods while protecting travel money;
4. calculate destination sales and forecast trip profit;
5. travel, solve a math event, sell, and compare forecast with actual profit.

The final should reuse that language and scoring model while increasing the number of variables, the time pressure, and the need to coordinate. It should not make winning depend on clicking quickly or discovering a hidden rule.

## Difficulty ladder

| Level                 | Student work                                                                                 | Status                                               |
| --------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1. Guided trader      | Follow one mission at a time, buy two goods, protect route money                             | Implemented in individual practice                   |
| 2. Profit forecaster  | Calculate total destination sales, then subtract goods and travel costs                      | Implemented as two required route checks             |
| 3. Load optimizer     | Rank goods by profit per pack or cargo space and build the best feasible load                | Add as the first competition planning round          |
| 4. Price-trap analyst | Reject a high sale price when acquisition, freight, capacity, or time makes net profit worse | Add through visible offer cards with all needed data |
| 5. Route reviser      | Recalculate after a weather, price, capacity, or provision change                            | Add as the timed disruption round                    |
| 6. Company auditor    | Reconcile forecast, actual receipts, remaining goods, and final profit                       | Add as the closing competition gate                  |

Each level uses the result of the prior level. Students do not receive the optimizer, traps, and disruptions during their first minutes in the game.

## Historically grounded final scenario

The production final should be a new, versioned HBC scenario rather than a renamed prairie-wagon map. Use the sequence and source requirements in [HBC Route Optimization Game Design](HBC_ROUTE_OPTIMIZATION_GAME_DESIGN.md).

The recommended first final is the later York boat outfit chapter because whole packs make the capacity problem visible. The scenario should clearly state that classroom credits and returns are instructional values. Historical source cards must represent Cree and Assiniboine traders, First Nations route knowledge and commercial agency, and Métis freight labor in the periods where each is appropriate. A social studies teacher and an Indigenous reviewer should review the published source set.

For an earlier period, use canoe routes and the matching transport constraints. Do not show a York boat, covered wagon, or later freight system in a chapter where it does not belong.

## Student-facing challenge

> Your company has one season to move required supplies through the network and return the greatest verified profit. Every load must fit, every route must finish before the seasonal deadline, and every transaction must pass a math check. A profitable plan that cannot be audited is not eligible to win.

All companies receive equivalent starting value, required deliveries, and mathematical demand. They may receive different goods or post needs only after a feasibility check proves that each assignment has a competitive path.

## Math-first design rule

The trading story supplies a reason to calculate. It must never replace the calculation. Every consequential action begins with visible numerical inputs, requires student-produced mathematics, and ends with a record of the method and result.

| Game decision         | Mathematics students produce                                          | What the answer unlocks                             |
| --------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| Choose a route        | Total days, provisions, fixed costs, and time remaining               | Lock a route that fits the season                   |
| Build the load        | Total pack weight, capacity remaining, and required-delivery minimums | Place the proposed packs on the boat                |
| Compare goods         | Unit price, expected margin, and profit per pack                      | Add an optional trade good                          |
| Accept a trade        | Quantity × unit price, fees, cash after trade, and cargo after trade  | Send the terms for both-company approval            |
| Lock the forecast     | Expected sales − goods costs − route costs                            | Depart with a recorded profit forecast              |
| Respond to disruption | Changed cost or time and a complete revised forecast                  | Choose the revised route or load                    |
| Complete delivery     | Delivered quantity, payment, and remaining inventory                  | Receive the delivery receipt                        |
| Close the season      | Actual revenue, total costs, actual profit, and forecast error        | Submit the company audit and become eligible to win |

Assessment mode shows all facts needed to solve a problem but withholds the assessed total until the student submits an answer. After checking, the interface may reveal the complete equation, explain an error, and save the work as evidence. Animations visualize a verified result; they do not calculate for the student.

Trading volume earns no points by itself. A company that makes fewer well-calculated trades can defeat a company that makes many weak trades. Math earns 40 direct points and controls access to most trading points because an unverified route, load, transaction, revision, or audit cannot be committed.

## Team roles and individual accountability

Teams have four roles:

- **Route keeper:** produces the route-time and route-cost calculation.
- **Load manager:** produces the capacity and profit-per-pack comparison.
- **Math checker:** produces the forecast and final profit reconciliation, then coordinates verification.
- **Source historian and negotiator:** produces the unit-price or transaction-total calculation and connects the decision to source evidence.

Roles rotate after the disruption round. Every student owns at least one scored calculation, verifies one teammate's calculation, and submits one source observation. The math checker cannot complete the team's mathematics for everyone. The team score does not replace individual mathematics evidence.

## Fifty-five-minute final

|      Time | Stage                          | Required output                                                      | Gate                                                         |
| --------: | ------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------ |
|   0–6 min | Source and commission briefing | Required deliveries, seasonal limit, two source observations         | Team identifies every non-negotiable constraint              |
|  6–16 min | Route and load plan            | Connected route, reserved provisions, cargo quantities               | Cash, pack weight, route time, and delivery minimums all fit |
| 16–23 min | Locked forecast                | Sales total, goods cost, route cost, forecast profit                 | Two students verify the same calculation                     |
| 23–31 min | Trading round 1                | Accepted or rejected offers with receipts                            | Quote math and both teams' approvals match                   |
| 31–38 min | Shared disruption              | Revised route/load and changed forecast                              | Team explains which number changed and why                   |
| 38–46 min | Trading round 2 and delivery   | Final exchanges and required post delivery                           | No overselling, double spending, or overload                 |
| 46–52 min | Company audit                  | Actual profit, forecast difference, remaining resources              | Money and goods reconcile to official receipts               |
| 52–55 min | Math-first defense             | Strongest equation, revision, forecast error, and route/source claim | All four students have a recorded calculation                |

The session clock pauses for teacher intervention or connectivity problems. Speed can create another opportunity to trade, but speed is never a tiebreaker and never bypasses math or approval gates.

## Competition score: 100 points

Use the same three headings students already know.

### Trading — 40 points

- 20: verified net profit relative to the published target;
- 10: all required post deliveries completed;
- 10: feasible ending state with no negative cash, overload, or missed seasonal deadline.

### Math — 40 points

- 10: initial sales and profit forecast;
- 10: transaction and unit-price checks;
- 10: disruption revision and new forecast;
- 10: final receipt, inventory, and profit audit.

The saved math record identifies the assigned student, numerical inputs, submitted answer, method or equation, attempts, support used, verification partner, and the exact route, quote, event, or receipt it controlled. Automatically displayed totals are not accepted as student mathematics evidence.

### Explain — 20 points

- 10: route and load claim supported by historical source evidence;
- 10: oral defense and individual explanation of a revision or price trap.

The final defense opens with mathematics: students display one equation, explain what each number represents, show how a disruption changed it, and compare forecast profit with actual profit. The route animation, cargo scene, and receipts serve as evidence for that explanation.

A team is **eligible to win** only when its final audit reconciles and required deliveries are complete. Among eligible teams, highest score wins. Ties are broken by the smallest absolute forecast error, then the strongest source-supported explanation. Speed is not a tiebreaker.

Also recognize category accomplishments such as Best Forecast, Strongest Audit, Best Source Reasoning, and Most Effective Revision so the final does not communicate that profit is the only valuable outcome.

## Price traps

Every trap must be visible in the data before commitment:

- a high sale price attached to a heavy good with weak profit per pack;
- a cheap good whose portage or freight cost removes its margin;
- a distant post whose higher return is erased by provisions and time;
- a bundle price that appears lower until students calculate the unit price;
- a demand statement expressed as a range rather than a guaranteed price;
- a fast route that leaves too little capacity for required deliveries.

The interface should ask students to compare **net profit**, **profit per pack**, and **time remaining**. It should never punish students with an undisclosed modifier.

## Live LMS system

The current local simulation is appropriate for practice, not an official multiplayer score. The competitive final needs the reusable live-session and exchange capabilities described in [Live Trading Final Design](LIVE_TRADING_FINAL_DESIGN.md).

The first production slice should support two companies completing one trade:

1. seller creates a structured offer;
2. server reserves the exact goods and buyer cash for a short active-time window;
3. assigned students complete quote-bound math;
4. buyer and seller approve the same version of the terms;
5. one server-authoritative transaction transfers money and goods;
6. both teams receive receipts with one transaction ID;
7. retries return the original result instead of posting twice.

After that slice is proven, add four-team sessions, scheduled disruptions, deliveries, live score projections, the audit phase, and final evidence transfer. Public live updates should show company stage, delivered orders, route position, and category scores. Private balances, answers, accommodations, and uncommitted offers remain scoped to the team and teacher.

## Teacher controls

Before launch, the teacher confirms:

- roster, teams, role assignments, and accommodations;
- scenario/version, seed, starting allocations, and event deck;
- timer profile and authorized extensions;
- score visibility and category caps;
- feasibility of every company's required deliveries;
- readiness of the live transaction service.

During play, the dashboard distinguishes working on math, waiting for another company, needing help, and reconnecting. Teacher corrections create linked adjustment records with a reason; they do not erase the original receipt.

## Implementation sequence

1. **Practice bridge:** retain the new two-part route forecast and forecast-versus-actual result view.
2. **Scenario package:** publish one reviewed York boat final with sources, routes, pack limits, required deliveries, price-trap offers, worked answer keys, and score caps.
3. **Two-company vertical slice:** implement authenticated session membership, reservation, math gate, approvals, atomic settlement, receipts, and retry protection.
4. **Timed class loop:** add the authoritative clock, pause/resume, scheduled disruption, route revision, delivery gate, and category projections.
5. **Audit and final product:** feed selected receipts, rejected traps, forecast revisions, and individual contributions into the four-question reflection.
6. **Rehearsal and pilot:** run a teacher-recorded paper rehearsal, then a four-company device rehearsal, accessibility review, recovery drill, and school-scale load test.

## Release checks

The final is classroom-ready only when:

- every starting allocation has at least one feasible winning path;
- every route changes a number students use;
- every official trade is atomic, idempotent, and visible on both teams' receipts;
- changing quote terms invalidates prior approvals and math checks;
- reconnecting converges to the official server snapshot;
- all cash, goods, fees, deliveries, and score awards reconcile;
- no student can view another team's private answers or uncommitted balance;
- keyboard, screen-reader, reduced-motion, and extended-time paths complete the full final;
- each student produces an individual calculation and source observation;
- profit, game score, historical reasoning, and teacher-assigned mastery remain distinct records.
