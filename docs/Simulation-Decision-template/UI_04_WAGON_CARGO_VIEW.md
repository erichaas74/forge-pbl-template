# UI 04 — Wagon / Cargo View

## Page Purpose
The Wagon/Cargo View makes capacity constraints concrete. Students can see exactly what they own, how much cargo space each good uses, how much of the wagon is occupied, and which items are tying up money or space.

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
**Top Capacity Meter**
- `Cargo Used / Total Capacity`.
- Large segmented bar.
- Remaining capacity displayed numerically.
- Optional unit conversion helper if project uses pounds/crates/slots.

**Left: Wagon Visualization (45%)**
- Simplified top/side wagon diagram.
- Cargo represented as labeled crates/sacks/barrels.
- Visual packing is illustrative, not a spatial Tetris puzzle unless explicitly enabled by project configuration.
- Hover/select highlights corresponding inventory row.

**Right: Inventory Table (55%)**
Columns:
- good,
- quantity,
- unit cargo,
- total cargo,
- average acquisition cost,
- total invested cost,
- current local sell value,
- unrealized gain/loss at current market,
- evidence/action menu.

**Bottom Insight Strip**
- Most cargo space used by…
- Most cash invested in…
- Highest current gain…
- Highest current loss…
These are descriptive calculations, not recommendations.

## Student Actions
Students can:
- Inspect all owned goods.
- Sort by quantity, cargo use, invested cost, current value, or gain/loss.
- Select an item to see acquisition history.
- Open the current market’s sell action for that good.
- Pin an inventory snapshot to notebook evidence.
- Use a “What if I sold…” calculator that previews cash/cargo without committing.
- View unit conversion help where configured.
- Inspect empty capacity before making a market purchase.

## Component States
### Inventory States
- `empty_wagon`
- `partial`
- `near_capacity` — threshold configurable, informational only.
- `full`
- `over_capacity_error` — should never persist; only appears when validating an invalid draft.
- `item_selected`
- `current_market_has_no_buyer`
- `season_complete_readonly`

### Item Value States
- current sell price above acquisition average,
- below acquisition average,
- equal,
- no current sell price available.

Always show the actual numbers; gain/loss color is secondary.

## Mobile Behavior
- Replace wagon + full table with:
  1. capacity meter,
  2. scrollable inventory cards.
- Each card shows quantity, cargo use, invested cost, current sell value, and gain/loss.
- Wagon visualization becomes an optional collapsible illustration.
- Sorting opens a bottom sheet.
- “What if I sold…” opens a dedicated calculator sheet.

## Graphics / Assets Needed
- Wagon interior/side illustration.
- Reusable cargo icons matching Market View.
- Capacity/crate icon.
- Empty wagon state.
- Packed wagon state can be programmatic based on inventory count/weight rather than requiring many bespoke images.
- Small acquisition-history timeline visual.

## LMS / Data Requirements
### Inventory Record
```ts
InventoryItem {
  goodId
  quantity
  unitCargo
  totalCargo
  acquisitionLots[]
  averageAcquisitionCost
  totalInvestedCost
}

AcquisitionLot {
  transactionId
  locationId
  day
  quantity
  unitCost
}
```

### Derived Values
Do not persist unless needed for audit:
- cargo used,
- remaining capacity,
- current local sell value,
- unrealized gain/loss.

Derive from inventory + current market snapshot.

### LMS
- Inventory snapshots can be stored as notebook evidence references.
- Capacity-related mastery prompts may be attached here.
- The view must read from the same inventory object updated by Market transactions.
- No independent “wagon state” that can drift from transaction history.

## Accessibility / Student Support
- Capacity meter includes exact text value.
- Wagon picture is supplemental; all inventory information exists in structured text/table/card form.
- Gain/loss announced with words and signed currency values.
- Acquisition-history chart has a list alternative.
- Keep column headers sticky and allow horizontal table scroll on tablet without hiding row labels.

## Acceptance Criteria
- Inventory totals always reconcile with the transaction ledger.
- Cargo-used total equals the sum of inventory quantity × unit cargo.
- Student can identify what occupies their wagon without relying on the wagon graphic.
- Current local value updates when the student changes location/market, while acquisition cost remains unchanged.
