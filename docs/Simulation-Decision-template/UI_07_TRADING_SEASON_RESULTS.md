# UI 07 — Trading Season Results

## Page Purpose
The Trading Season Results page closes the simulation loop. It summarizes financial performance, route/trade decisions, evidence of improvement, and mission completion without treating “most profit” as the only measure of success.

## Curriculum / Product Alignment
This page belongs to the **Frontier Trading Simulation** project type. The curriculum foundation is a trading-company challenge built around limited money, cargo capacity, changing prices, budgeting, unit price, profit, and defending trade decisions. The social-studies extension adds route choice, maps, terrain, supplies, risk events, consequences, and multiple perspectives.

**Source-supported learning priorities**
- Decimal and money calculations.
- Budgeting and unit-price comparisons.
- Profit / loss reasoning.
- Cargo-capacity constraints and measurement conversion.
- Route choice using map, distance, terrain, and risk evidence.
- Evidence-based explanation of decisions.
- Simulation evidence that can be saved into the project notebook and final submission.

**Design decisions introduced by this UI spec**
- A turn/stop-based trading season.
- Student-facing market, route, cargo, event, ledger, and season-results views.
- Persistent simulation state that carries across all page views.
- Teacher-configurable market/event presets and final-challenge rules.
- No single “correct” route; students are expected to justify tradeoffs with evidence.

## Layout
### Results Hero
- `Trading Season Complete`.
- Final cash.
- Realized profit/loss.
- Unsold cargo + its treatment in scoring.
- Mission target status.
- Optional team/class comparison only if teacher enables it.

### Performance Dashboard
Cards/charts:
1. **Money**
   - starting cash,
   - ending cash,
   - total revenue,
   - realized profit/loss.
2. **Cargo Efficiency**
   - average cargo utilization,
   - highest utilization,
   - unused capacity moments.
3. **Trade Decisions**
   - number of buys/sells,
   - strongest realized trade by configured metric,
   - weakest realized trade / loss.
4. **Route Decisions**
   - distance traveled,
   - route count,
   - event exposure.
5. **Evidence / Learning**
   - required evidence completed,
   - mastery checks,
   - reflections still missing.

### Season Timeline
Horizontal/vertical summary of major stops and turning points.

### Next Action Panel
- `Build Final Strategy Report`.
- `Review Ledger`.
- `Complete Missing Mastery`.
- `Revise Evidence Notes`.

## Student Actions
Students can:
- Review final numbers.
- Inspect how the system calculated profit/loss.
- View strongest/weakest trade based on transparent rules.
- Revisit key ledger entries in read-only mode.
- Compare planned strategy vs actual results if an initial strategy was recorded.
- Select which result charts/metrics to cite in final report.
- Complete a short end-of-season reflection.
- Continue to Final Strategy Report.

## Component States
### Results States
- `locked` — season still active.
- `calculating`
- `complete`
- `evidence_missing`
- `mastery_missing`
- `ready_for_report`
- `report_submitted`

### Comparison / Leaderboard States
- disabled,
- private personal results only,
- team comparison,
- class leaderboard,
- anonymized leaderboard.

If enabled, leaderboard is secondary and must not imply grade = rank.

## Mobile Behavior
- Results cards stack vertically.
- Charts use simple single-variable views with text summaries.
- Season timeline becomes vertical.
- Sticky bottom action: `Build Strategy Report`.
- Detailed calculation breakdowns open in bottom sheets.

## Graphics / Assets Needed
- Results banner / trading-company seal.
- Money, cargo, route, evidence icons.
- Simple charts for cash over time / cumulative profit (generated from data).
- Timeline node graphics.
- Optional badges: strongest evidence, most improved, efficient cargo use; all teacher-configurable.

Avoid “winner” visuals as the dominant message.

## LMS / Data Requirements
### Derived Results
```ts
TradingSeasonResults {
  simulationId
  startingCash
  endingCash
  realizedRevenue
  realizedCostBasis
  realizedProfit
  unsoldInventoryValue
  finalScoreInputs?
  distanceTraveled
  cargoUtilizationStats
  bestTradeId?
  weakestTradeId?
  keyEventIds[]
  evidenceCompletion
  masteryCompletion
  completedAt
}
```

### Final Score Rules
Teacher/project config must explicitly define:
- whether unsold inventory counts,
- whether travel costs count,
- whether event losses count,
- whether a profit target exists,
- leaderboard metric if any.

### LMS
- Results become simulation evidence.
- `season_complete` updates the Project Hub and unlocks final-report submission.
- Missing mastery/reteach tasks remain visible.
- Raw results do not automatically become the student's grade.
- Results can feed rubric criteria for data use, reasoning, improvement, and final explanation.

## Accessibility / Student Support
- Every chart has text summary + data table alternative.
- Profit/loss calculations are viewable step-by-step.
- Badges are supplemental.
- Leaderboard can be hidden for students with teacher-configured settings.
- Use plain language: `You earned more than you spent` alongside formal `profit` terminology when appropriate.

## Acceptance Criteria
- Results cannot appear before official season completion.
- Every summary metric traces to canonical ledger/simulation data.
- Students can clearly distinguish realized profit from unsold inventory value.
- Page directs students toward evidence and explanation, not only score.
- Teacher can disable all competitive comparison without breaking the page.
