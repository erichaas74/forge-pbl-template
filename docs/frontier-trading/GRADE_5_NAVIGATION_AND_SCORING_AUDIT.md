# Grade 5 navigation and scoring audit

> **Implementation update — version 1.3:** The high-priority findings in this audit have been addressed. The student game now presents one mission at a time, groups play into **Plan Trip**, **Travel**, and **Finish**, sends mission buttons to the exact next control, requires two shop visits and two kinds of goods before departure, then adds two profit-forecast math checks. Every route guarantees a math event and the game shows a live **Trading 40 + Math 40 + Explanation 20** score. Results compare forecast with actual trip profit, and the final reflection has four questions with automatically suggested game records. The detailed findings below preserve the pre-change audit for comparison.

**Audit date:** September 3, 2026  
**Scope:** Current local Frontier Trading Company implementation after the visual and game-feel upgrades. This audit asks whether a first-time fifth-grade student could independently find the required actions, finish the experience, and intentionally earn a strong game score.

## Verdict

**A fifth grader could begin and complete most individual interactions, but could not reliably navigate the full experience or intentionally score well without teacher coaching.**

The opening and first market mission are unusually clear. Numbered setup steps, default selections, a single charter button, mission text, storefront targets, progress counts, immediate feedback, and reversible trade planning all support a young learner.

The experience becomes unreliable at three transition points:

1. the mission button that should move the student from market exploration to buying supplies appears to do nothing;
2. the game asks for a starter manifest but does not enforce it before departure;
3. after the sale, the mission system points toward the journal instead of showing how to close the season.

Scoring is a larger problem. The score rewards profit, evidence count, and the presence of event reasoning. It does not reward math accuracy or final-report quality. The profitable pattern is also hidden and conflicts with the beginner goods highlighted by the interface. A student can follow every visible recommendation, make reasonable choices, and still receive the lowest performance label.

**Readiness judgment:** appropriate for a teacher-facilitated pilot; not ready for independent Grade 5 use or use as a mathematics grade.

## Navigation findings

| Stage | Can a first-time fifth grader proceed? | Audit evidence |
| --- | --- | --- |
| Company charter | **Yes, with minor risk** | The page has two numbered steps and defaults an emblem and transport. Only the company name is missing. The charter button remains enabled with an empty name, so the student learns about the requirement only after an error. |
| First market mission | **Yes** | The mission says “Meet two merchants,” shows `0 of 2`, and marks the General Store as the next target. Each visit updates the count and marks another storefront. |
| Unlocking supplies | **Yes** | The first three storefront visits form a clear, staged sequence. Outfitter rank and unlock requirements update immediately. |
| Moving from exploration to buying | **No, independently** | The mission changes to “Build your starter manifest,” but **Choose Supplies** merely navigates to the market that is already open. It does not select the relevant shop, scroll, or focus the goods. In the audited viewport, the goods board began about 1,268 pixels below the desktop viewport and 1,454 pixels below the phone viewport. |
| Choosing profitable goods | **Not reliably** | The interface highlights Flour and Salt first, but it does not explain expected margin, profit per cargo space, or the amount of fixed transport and route cost that the cargo must recover. Exact destination prices remain unknown until arrival. |
| Route selection | **Mostly** | Map nodes have keyboard focus, useful accessible names, days, risk, cost, terrain, expected arrival, destination reports, and a required rationale. “Review departure” is enabled before a rationale is entered and produces an error only after activation. |
| Following the staged sequence | **No** | After the game says to load two goods, the student can open the route map and depart with no cargo. Guidance and completion rules therefore disagree. |
| Journey and events | **Mostly** | The journey has one clear Advance button, stops at events, displays known effects, and requires a short reason. Speed and pause controls add choices that are not needed for the learning task but are understandable. |
| Math events | **Mechanically yes; instructionally weak** | A numeric answer is required, but an incorrect answer can still complete the event. The default attempt schedules one math event and one decision event. |
| Selling at the destination | **Mostly** | The mission points to the destination market, the inventory is visible, and sale totals are previewed. A student still needs to rediscover the trade-builder workflow used for buying. |
| Closing the season | **No clear path** | After a sale, the next mission points to the Company Journal. Season Results remain locked. The **Close trading season** action exists only on the empty Journey screen after arrival, so the student must leave the suggested journal path and revisit Journey without an active journey. |
| Final report | **Possible with substantial stamina or support** | The report has ten sections, evidence attachment, filters, one calculation field, and submission readiness. The interaction is navigable, but vocabulary such as *ledger*, *reconciles*, *cost basis*, *manifest*, *reserve*, and *strategy claim* raises the reading and concept load. |

## What the score actually measures

The current 100-point score is calculated as:

- **up to 60 points:** net profit compared with the `$50.00` profit target;
- **up to 20 points:** four points for each evidence item, capped at five items;
- **up to 20 points:** five points for each event decision containing any reasoning text.

The current game has one route and schedules at most two events. A normal student attempt can therefore earn only **10 of the advertised 20 reasoning points**. The practical one-route ceiling is 90 even before considering whether the economy permits the full profit score.

The score does **not** use:

- whether a math answer is correct;
- the number of math attempts or hint use;
- whether the student calculated a subtotal or profit independently;
- whether evidence supports the report claim;
- whether the final calculation is correct;
- the quality of any report response;
- completion or submission of the final report.

The score is a strategy-game result. It cannot be treated as a mathematics score or standards-mastery result.

## Can a student following the tutorial score well?

No.

The interface initially highlights **Flour** and **Salt**. With the default Prairie Wagon and the low-risk Northern Fort Road, even the best affordable two-good mix using only those highlighted goods remains slightly unprofitable after transport and route costs:

```text
5 Flour + 2 Salt
ending cash: $198.30
net result: -$1.70
financial score: 0 of 60
```

With five evidence items and reasoning on both scheduled events, that careful tutorial-following student reaches only about **30/100**, labeled **Learning the Trail**.

A high score requires a much less obvious pattern. With the current default prices and zero-cost choices at the two default events, an optimized path is approximately:

```text
Handcart Company
Northern Fort Road
1 Lantern Oil + 8 Dried Beans
ending cash: $249.54
net profit: $49.54
financial score: 59 of 60
maximum default total: about 89/100
```

The student is not shown the destination prices needed to derive this result. The early mission highlighting also directs attention toward Flour and Salt instead. A strong score therefore depends on prior knowledge of the game economy, experimentation across attempts, or teacher-provided strategy. It does not emerge from the onboarding path.

## Grade 5 comprehension load

The interface is visually structured, but several instructions combine unfamiliar business vocabulary with multiple ideas in one sentence. Likely support terms include:

- manifest;
- outfitter;
- reserve;
- cost basis;
- reconcile;
- ledger;
- cargo capacity;
- net profit;
- market evidence;
- strategy claim.

The game does define some ideas through repeated use, but it has no persistent Grade 5 glossary, hover definitions, worked example, or “show me” tutorial. The Help drawer explains the overall decision cycle but does not explain how to recover fixed costs, how the score is weighted, or where to close the season.

## Highest-priority fixes

1. **Make every mission action perform a visible action.** When the relevant view is already open, scroll and focus the exact target. “Choose Supplies” should open the General Store or all discovered goods, focus the first recommended good, and announce the move.
2. **Add an explicit end-of-season mission.** After arrival and a sale, show “Close the season” with a button that performs or navigates directly to that action. Do not point to the journal while Results are still locked.
3. **Align gates with the stated tutorial.** If the mission requires two goods, departure should either require that manifest or explicitly offer a confirmed “depart without cargo” alternate strategy.
4. **Show the score model before decisions.** Display the `60 profit / 20 evidence / 20 reasoning` breakdown and explain that only two events are available in the current season.
5. **Make the guided path capable of success.** A reasonable beginner manifest should be able to reach at least the middle performance band. Tutorial highlights should reflect profit after transport and route costs, not merely the first goods in a configuration list.
6. **Separate strategy score from mathematics evidence.** Correct required math checkpoints, student calculations, and standards evidence should have their own completion and teacher-review status.
7. **Reduce or scaffold the ten-section report.** Combine overlapping prompts into four or five chapters, provide sentence frames, and define business terms in place.

## Minimum support needed if used as is

For a teacher-facilitated pilot, provide students with:

1. a two-minute demonstration showing that the page continues below the illustrated market;
2. a visible reminder to explore three merchants, buy two goods, and reserve route cash;
3. a score card explaining the three score components;
4. a reminder to save evidence after trades, routes, and events;
5. a final direction to return to Journey and close the season;
6. a vocabulary reference for the business terms;
7. teacher review of math work independent of the game score.

These supports can make the current build usable for a facilitated class session, but they do not resolve the underlying scoring fairness or mastery-validity issues.
