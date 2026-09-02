# UI 06 — Trade Ledger

## Page Purpose
The Trade Ledger is the student's evidence record of the season. It turns raw simulation activity into a readable financial and decision history that supports profit calculations, reflection, and the final strategy report.

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
### Desktop Layout
**Top Summary**
- Starting cash.
- Current cash.
- Total spent.
- Total revenue.
- Realized profit/loss.
- Current inventory value (clearly labeled as current market value, not realized profit).
- Number of trades.
- Distance/travel steps.

**Filter / View Controls**
- All entries.
- Trades.
- Travel.
- Events.
- Checkpoints.
- Evidence pinned.
- Location filter.
- Day range.

**Main Ledger Table**
Columns:
- day,
- location,
- entry type,
- description,
- cash change,
- cash balance,
- cargo change,
- evidence flag.

Rows can expand to show:
- transaction line items,
- route choice,
- event choice/outcome,
- calculation detail,
- attached student note.

**Evidence Tray**
A right-side or bottom panel lists items the student has marked for use in the final strategy report.

## Student Actions
Students can:
- Review the chronological season record.
- Filter and sort entries.
- Expand a trade to see unit price × quantity and totals.
- Add a short annotation explaining why a trade mattered.
- Pin/unpin eligible entries as evidence.
- Export or open a teacher-provided printable ledger view if configured.
- Compare starting vs current cash.
- Open a profit calculation explainer.
- Jump from an entry back to historical Market/Route/Event detail in read-only mode.

## Component States
### Ledger States
- `empty` — before first official action.
- `active`
- `filtered_no_results`
- `entry_expanded`
- `evidence_selected`
- `season_complete`
- `submitted_readonly`

### Reconciliation Warnings
Visible to teacher by default; student may see friendly notice:
- transaction mismatch,
- missing balance,
- derived totals out of sync,
- save conflict.

The ledger itself should never let the student edit official cash/inventory history. Student annotations are editable separately.

## Mobile Behavior
- Summary metrics become 2-column cards.
- Ledger table becomes chronological timeline cards.
- Each card shows day/location/type/cash change; expand for detail.
- Filter controls use a full-width sheet.
- Evidence tray becomes a `Selected Evidence (n)` drawer.

## Graphics / Assets Needed
- Ledger/book visual motif used lightly.
- Entry-type icons for Buy, Sell, Travel, Event, Checkpoint.
- Evidence pin/bookmark icon.
- Profit/loss calculator illustration or mini-diagram.
- Print-friendly stylesheet if export is supported.

## LMS / Data Requirements
### Ledger Model
The ledger should be **derived from canonical logs**, not independently authored:
- `transactions[]`
- `routeHistory[]`
- `eventHistory[]`
- LMS checkpoint records

```ts
LedgerAnnotation {
  annotationId
  studentId
  simulationId
  sourceType
  sourceId
  note
  pinnedAsEvidence
  createdAt
  updatedAt
}
```

### Financial Calculations
Store calculation rules in project config:
- realized revenue,
- realized cost basis,
- realized profit/loss,
- starting vs ending cash,
- current inventory value.

Define whether unsold inventory counts in the final season score; do not leave this ambiguous.

### LMS
- Ledger evidence references should be embeddable in Final Strategy Report fields.
- Teacher sees immutable source log plus student annotations.
- Completion tasks can require `pin at least 3 evidence items` or `annotate one strong and one weak decision`.
- Gradebook receives scores from explicit mastery/rubric activities, not from raw profit alone.

## Accessibility / Student Support
- Table has proper row/column headers.
- Signed amounts include +/− and words where needed.
- Timeline/card version contains all information from desktop table.
- Filters have active-state text labels.
- Exported/print ledger includes textual descriptions, not icon-only data.

## Acceptance Criteria
- Ledger totals reconcile with cash/inventory history.
- Students cannot edit official financial records.
- Student annotations and evidence pins persist separately.
- At least one-click access exists from ledger evidence to the corresponding final-report citation/control.
- Teacher can audit how a final claim maps back to simulation records.
