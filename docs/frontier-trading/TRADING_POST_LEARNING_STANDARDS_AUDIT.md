# Trading Post learning, completion, and mathematics standards audit

> **Implementation update — version 1.3:** The game now requires two kinds of goods plus correct destination-sales and trip-profit forecasts before departure. It schedules one math event on every route, requires correct math before the trail choice can be recorded, compares forecast with actual trip profit, and scores **Trading 40 + Math 40 + Explanation 20**. Student navigation is reduced to **Plan Trip**, **Travel**, and **Finish**, and the final response is four focused questions with suggested game records. The detailed audit below documents the earlier baseline and remains useful as a record of the gaps that prompted these changes.

**Audit date:** September 3, 2026  
**Scope:** Frontier Trading Company student workflow, completion rules, recorded evidence, scoring, teacher visibility, and Grade 5 mathematics alignment.

## Executive finding

The Trading Post is a strong applied-mathematics simulation. It gives students meaningful quantities, visible units, constrained budgets, cargo limits, route tradeoffs, event consequences, an auditable ledger, and a final evidence-based report. Its strongest standards connections are decimal operations in context and the Mathematical Practices of quantitative reasoning and modeling.

It is not yet a reliable standards-based lesson or mastery system. The interface performs most calculations for the student, math events are not guaranteed, an incorrect math answer does not stop event completion, game scoring ignores math accuracy, and the season can be completed without buying or selling goods. Final-report readiness checks length, evidence count, and whether a calculation field is nonempty; it does not verify mathematical correctness or reasoning quality.

The current product should therefore be described as a **standards-connected practice and evidence environment**, not as proof that a student has mastered the listed standards.

## Standards baseline

The project identifies itself only as **Grade 5 Mathematics PBL**. It does not declare a jurisdiction, standards framework, standard IDs, learning targets, or mastery rules in configuration. This audit uses the Grade 5 Common Core State Standards as a baseline and should be crosswalked again if a district or state framework is selected.

Primary reference: [Common Core State Standards for Mathematics](https://corestandards.org/wp-content/uploads/2023/09/ADA-Compliant-Math-Standards.pdf).

Alignment ratings in this audit mean:

- **Direct:** the student must produce relevant mathematical work and the system can retain evidence of it.
- **Partial:** the interaction uses the mathematics, but the student work or assessment evidence is incomplete.
- **Exposure:** the interface shows the mathematics or performs it for the student.
- **Absent:** the current required path does not address the standard.

## How the current experience is completed

| Stage              | Student interaction                                                                         | What the system records                                                             | Current completion rule                                                                                                                | Mathematics actually produced by the student                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Company setup      | Name a company, select an emblem, compare four transports, and choose one                   | Company identity, transport purchase, starting-capital and transport ledger entries | A valid name, emblem, and transport starts the season                                                                                  | None required. Starting cash, transport cost, and remaining cash are calculated by the interface.                  |
| Market exploration | Visit storefronts, read verified prices and rumors, filter goods                            | Discovered stalls and automatically pinned merchant-intelligence evidence           | Optional; no number of shops must be explored                                                                                          | None required. Price comparison is left to the student but is not captured.                                        |
| Trade planning     | Select buy/sell, set whole-number quantities, build a multi-line draft, review totals       | Draft in planning state; committed trades become inventory lots and ledger entries  | Optional; the season can end with zero purchases and zero sales                                                                        | Quantity is entered. Subtotal, cash remaining, and cargo use are calculated and displayed automatically.           |
| Cargo              | Inspect physical cargo, sort inventory, plan a sale, save a snapshot                        | Optional inventory evidence                                                         | Optional                                                                                                                               | None required. Average cost, invested amount, market value, cargo use, and gain/loss are calculated automatically. |
| Route planning     | Compare distance, days, supply cost, risk, terrain, and expected arrival; write a rationale | Route snapshot, supply ledger entry, rationale, scheduled events                    | A route requires compatible transport, sufficient cash, an empty trade draft, and a rationale of at least 12 characters                | No calculation is required. The student chooses among displayed results.                                           |
| Journey            | Advance one or two days at a time and stop for events                                       | Official day and route progress                                                     | Required until arrival                                                                                                                 | Counting travel days is interactive, but no pace or elapsed-time work is required outside a possible event.        |
| Event decision     | Read facts, choose an option, enter a math answer when present, and write a rationale       | Choice, outcome, cash/cargo before and after, answer, `mathCorrect`, rationale      | A math field must contain an answer, but the answer does **not** have to be correct. Rationale needs at least 12 characters.           | One numeric answer if a math event was scheduled. Strategy or method is not captured.                              |
| Ledger             | Filter entries, inspect equations, annotate records, pin evidence                           | Optional notes and evidence references                                              | Optional                                                                                                                               | None required. Equations are generated from official entries.                                                      |
| Season completion  | Finish a route and click complete season                                                    | Completion timestamp and automatic results evidence                                 | At least one arrived route; no active travel or pending event                                                                          | No purchase, sale, correct math answer, ledger annotation, or reflection is required.                              |
| Results            | Review score, ending-cash equation, sales, timeline, and strongest/weakest sale             | Calculated results                                                                  | Available after season completion                                                                                                      | None required. The interface derives the analysis.                                                                 |
| Strategy report    | Complete ten prompts, attach evidence, add one calculation, and submit                      | Responses, evidence IDs, calculation text, submission timestamp                     | Every response has at least 12 characters; evidence counts are met; the one required calculation field is nonempty; season is complete | One free-text calculation is required, but its form and correctness are not evaluated.                             |

## What counts as a lesson today

There are no explicit lesson objects, learning targets, standard tags, prerequisite checks, or mastery checkpoints in the project configuration. The Help panel supplies a five-step decision cycle, and the workspaces form an implicit learning sequence:

1. compare a startup budget;
2. explore prices and build a trade plan;
3. compare route constraints;
4. respond to events;
5. use records in a final report.

This sequence works as a project structure, but the LMS cannot currently answer which lesson a student completed, which standard was assessed, whether the work was independent, or what misconception needs reteaching.

## Current mathematics tasks

Four of the twelve configured events contain an explicit answer field:

| Task              | Intended operation                              | Expected answer    | Evidence retained                    |
| ----------------- | ----------------------------------------------- | ------------------ | ------------------------------------ |
| `$18.00 ÷ 4`      | Divide a decimal money amount by a whole number | `$4.50` per bundle | Answer and correct/incorrect boolean |
| `$72.00 − $27.50` | Subtract decimals to hundredths                 | `$44.50`           | Answer and correct/incorrect boolean |
| `36 ÷ 12`         | Whole-number division with a rate context       | `3` days           | Answer and correct/incorrect boolean |
| `$3.25 − $2.10`   | Subtract decimals to determine unit profit      | `$1.15` per unit   | Answer and correct/incorrect boolean |

Each route schedules two events from the entire twelve-event pool. The selection is deterministic for a given attempt, but it does not guarantee a math event. A student can therefore finish the required route without seeing any explicit math question.

## Grade 5 standards crosswalk

| Standard                                                                                       | Current connection                                                                                                                               | Rating                                      | Audit judgment                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **5.NBT.A.3** Read, write, and compare decimals                                                | Students see many prices to hundredths and can compare buy/sell values across goods.                                                             | Exposure                                    | No required prompt asks students to compare two decimals or record a comparison using mathematical language or symbols.                                              |
| **5.NBT.A.4** Round decimals                                                                   | None                                                                                                                                             | Absent                                      | All currency remains exact to cents; no estimation or rounding task is present.                                                                                      |
| **5.NBT.B.5** Multiply multi-digit whole numbers                                               | Quantity, cargo, and cent totals use multiplication.                                                                                             | Exposure                                    | The application performs the products. Students do not demonstrate an algorithm, model, or explanation.                                                              |
| **5.NBT.B.6** Find whole-number quotients and explain the calculation                          | The distance-and-pace event asks `36 ÷ 12`.                                                                                                      | Partial                                     | The item is an exact fact-family calculation, may never appear, and captures neither a strategy nor an explanation. It is too narrow to establish the full standard. |
| **5.NBT.B.7** Add, subtract, multiply, and divide decimals to hundredths and explain reasoning | Money is central throughout; three configured event tasks use decimal subtraction or division, and trade/result screens show decimal operations. | Partial                                     | This is the strongest content alignment, but most work is computed by the UI. Event answers need not be correct, and no method is required.                          |
| **5.OA.A.1–2** Write, interpret, and evaluate numerical expressions                            | Trade subtotals, profit equations, and the ending-cash equation are displayed.                                                                   | Exposure                                    | Students read generated expressions. Only the final free-text calculation could contain a student-authored expression, and it is not validated.                      |
| **5.MD.A.1** Convert measurement units                                                         | Cargo uses abstract “spaces,” while distance uses miles and time uses days.                                                                      | Absent                                      | No conversion within a measurement system is required. Cargo capacity should not be claimed as evidence for this standard.                                           |
| **MP1** Make sense of problems and persevere                                                   | Students work within cash, stock, cargo, terrain, and time constraints.                                                                          | Partial                                     | The environment is strong, but a student can accept displayed totals without showing a solution process.                                                             |
| **MP2** Reason abstractly and quantitatively                                                   | Every major choice connects quantities to money, cargo, time, distance, and risk.                                                                | Direct for practice; partial for assessment | Quantities and units are consistently visible. The system records choices and outcomes but rarely records the student's quantitative reasoning.                      |
| **MP3** Construct viable arguments and critique reasoning                                      | Route/event rationales and the strategy report request explanations with evidence.                                                               | Partial                                     | Minimum character counts do not establish a mathematical claim, evidence, reasoning, or critique. There is no peer-critique interaction.                             |
| **MP4** Model with mathematics                                                                 | The company, market, route, cargo, and ledger form a coherent decision model.                                                                    | Direct for practice                         | This is the simulation's strongest alignment. Assessment still needs a student-produced model or explanation of assumptions.                                         |
| **MP5** Use appropriate tools strategically                                                    | Students use a route map, price cards, cargo view, ledger, and evidence library.                                                                 | Partial                                     | The tools are useful, but the game does not ask students to select a tool and justify why it helps.                                                                  |
| **MP6** Attend to precision                                                                    | Currency, quantities, cargo units, miles, days, and signed changes are labeled consistently.                                                     | Partial                                     | Interface precision is strong. Student precision is checked mainly through exact numeric input and nonempty text.                                                    |
| **MP7–8** Look for structure and repeated reasoning                                            | Repeated trade equations and the ending-cash structure are visible.                                                                              | Exposure                                    | One route and optional trading do not guarantee enough repeated student work to assess either practice.                                                              |

## High-priority audit findings

### 1. Incorrect math can still complete an event

The event screen blocks review only when the answer is missing. It displays whether the answer matches, but both the UI and reducer allow the student to confirm a decision with an incorrect answer. The answer and `mathCorrect` flag are retained, yet neither affects progress, score, completion, or submission.

**Effect:** the game can label the season complete while its only recorded math response is incorrect.

### 2. Explicit math is not guaranteed

Only four of twelve events contain math challenges, while a route receives two events without requiring one from the math group.

**Effect:** some students can finish without encountering an explicit calculation task, so attempts are not instructionally comparable.

### 3. Trading is optional

The season requires an arrived route but no purchase or sale. The setup transport purchase and route-supply cost are enough to create ledger activity.

**Effect:** a student can complete “Frontier Trading Company” without completing the market's core multiplication, capacity, cost-basis, or profit cycle.

### 4. The game score is not a math score

The 100-point result is calculated as:

- up to 60 points from net profit;
- up to 20 points from the number of pinned evidence items;
- up to 20 points from event decisions containing reasoning.

Math correctness, attempts, hint use, trade-calculation accuracy, and report-calculation accuracy contribute no points.

**Effect:** the score is useful as game feedback but must not be presented as standards mastery or a mathematics grade.

### 5. Most important mathematics is automated

The market shows `unit price × quantity`, cash remaining, and cargo after the plan. Cargo calculates average cost, investment, market value, and gain/loss. Results calculate the full cash equation and strongest sale.

**Effect:** these screens provide excellent feedback and support, but observing the result does not show that a student can perform or explain the operation independently.

### 6. Final-report completion checks form, not quality

All ten sections require a response of 12 characters; one section additionally requires any nonempty calculation. Evidence is checked by count, not relevance or source type, and the same evidence can be reused across sections.

**Effect:** “ready to submit” means fields are populated, not that the report contains correct mathematics or a defensible argument.

### 7. Standards and mastery are not first-class data

The project has a grade label but no standard IDs, learning-target IDs, task-to-standard mapping, attempt/support records, or mastery state. The teacher view reports attempt status, season progress, evidence count, and content counts rather than standard-level evidence.

**Effect:** the LMS cannot distinguish activity completion, math proficiency, submission, and teacher judgment.

## Recommended required learning path

Keep the open-world workspaces, but add a small set of required evidence checkpoints.

| Lesson              | Required student product                                                          | Suggested alignment        | Completion evidence                                                              |
| ------------------- | --------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| 1. Startup budget   | Calculate remaining cash for two transports and justify one choice                | 5.NBT.B.7, MP2, MP3        | Entered equation, answer, explanation, selected transport                        |
| 2. Market plan      | Calculate one subtotal and remaining cash before seeing the system result         | 5.NBT.B.5/7, MP1, MP6      | Attempt history, exact answer, quantity/unit labels, committed purchase          |
| 3. Cargo constraint | Determine whether a proposed multi-item load fits and show the cargo equation     | MP1, MP2, MP4              | Student equation, fit/does-not-fit decision, committed feasible plan             |
| 4. Route comparison | Compare two routes using cost and time and explain the chosen tradeoff            | 5.NBT.A.3, MP2, MP3, MP4   | Two-route comparison record, calculation or comparison statement, rationale      |
| 5. Journey math     | Complete one decimal-operation task and one whole-number division task            | 5.NBT.B.6/7, MP1, MP6      | Attempts, hint/support use, method, final correct response                       |
| 6. Sale and profit  | Complete at least one sale and calculate realized unit and total profit/loss      | 5.NBT.B.7, 5.OA.A.1–2, MP4 | Purchase lot, sale receipt, student calculation, ledger link                     |
| 7. Final argument   | Make a strategy claim supported by two relevant records and a checked calculation | MP3, MP4, MP6              | Claim-evidence-reasoning structure, relevant evidence IDs, validated calculation |

This sequence would make lesson completion comparable while preserving strategic freedom in which goods, transport, route, and event options students choose.

## Recommended completion and mastery model

Track these states separately:

```text
game progress != lesson completion != standards evidence != mastery != report submission != grade
```

### Game progress

- company created;
- at least one purchase committed;
- one route completed;
- at least one sale committed;
- season closed.

### Lesson completion

- each required checkpoint has a submitted response and durable evidence reference;
- supported completion remains completion.

### Standards evidence

- standard ID and learning target;
- task/version and values shown;
- student answer and mathematical representation;
- attempt count, hint/support use, and elapsed active time where appropriate;
- correctness result from a deterministic evaluator;
- related trade, route, event, ledger, or report record.

### Mastery

- determined per standard from multiple opportunities;
- does not depend on company profit;
- distinguishes independent, supported, and teacher-reviewed evidence;
- remains revisable after feedback.

## Implementation priorities

1. **Require correctness or an explicit support path for math-gated events.** Permit retries, record every attempt, and provide an equivalent fresh problem after a worked hint when independent evidence is required.
2. **Guarantee a balanced math set.** Assign required tasks before route play rather than relying on random event selection.
3. **Require one complete trade cycle.** At least one purchase and one sale should precede season completion unless the teacher selects an alternate pathway.
4. **Capture student work before revealing totals.** Use predict-then-reveal for one subtotal, cash-after, cargo-fit, route comparison, and profit task. Keep automatic totals for feedback and accessibility.
5. **Add standards metadata and evidence contracts.** Map every assessed task to versioned standard and learning-target IDs.
6. **Separate game score from mastery.** Keep the current score as a transparent strategy score and add a standards evidence view that never infers mastery from profit or evidence count.
7. **Validate the final calculation.** Use a structured calculation type or a deterministic problem evaluator; retain free text for explanation.
8. **Constrain report evidence by relevance.** Require a trade record for the trade section, a route record for route/risk, and a calculation result for math evidence. Allow teacher override with an audit note.
9. **Add a teacher standards matrix.** Show not started, attempted, correct with support, independently correct, and needs review for each learning target.
10. **Add a brief transfer task.** After the game, use fresh numbers so students demonstrate the mathematics beyond the exact scenario they practiced.

## Acceptance criteria for a standards-aligned revision

- Every standard claimed by the project maps to at least one required student-produced artifact.
- A student cannot complete a required math checkpoint with an incorrect final response unless the state is explicitly recorded as supported or teacher-completed.
- Every attempt receives the same required standard coverage regardless of event seed or route choice.
- Season completion requires a configured minimum trade cycle rather than route arrival alone.
- The system can show exactly which student input supports each standards claim.
- Game score, lesson completion, standards evidence, mastery, report submission, and grade remain separate fields.
- Automatic calculations remain available as feedback but are not counted as independent student work.
- Teacher views expose answer, method, attempts, hint use, and linked simulation evidence.
- Accessibility accommodations change presentation, timing, or support without silently changing the learning target.
- The final report cannot be marked mathematically ready from character count and nonempty fields alone.

## Files examined

- `src/app/projects/frontier-trading/frontier-trading.config.ts`
- `src/app/templates/simulation-decision/domain/simulation-decision.engine.ts`
- `src/app/templates/simulation-decision/domain/simulation-decision.models.ts`
- `src/app/templates/simulation-decision/ui/pages/company-setup.component.*`
- `src/app/templates/simulation-decision/ui/pages/market-view.component.*`
- `src/app/templates/simulation-decision/ui/pages/cargo-view.component.*`
- `src/app/templates/simulation-decision/ui/pages/route-map.component.*`
- `src/app/templates/simulation-decision/ui/pages/event-decision.component.*`
- `src/app/templates/simulation-decision/ui/pages/trade-ledger.component.*`
- `src/app/templates/simulation-decision/ui/pages/season-results.component.*`
- `src/app/templates/simulation-decision/ui/pages/strategy-report.component.*`
- `src/app/templates/simulation-decision/ui/pages/teacher-control.component.*`
- The running Trading Post at `/frontier-trading`, including Market, Route, and Help/Rules.
