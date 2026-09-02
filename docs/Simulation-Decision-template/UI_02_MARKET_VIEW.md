# UI 02 — Market View

## Page Purpose
The Market View is the primary buy/sell workspace. Students compare changing local prices, calculate unit cost and expected profit, and decide what inventory to buy or sell while staying inside cash and cargo constraints.

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
### Main Desktop Layout
**Left: Market Board (55–60%)**
- Current trading-post header with location name and short economic context.
- Goods table/cards with:
  - good name + icon,
  - buy price per unit,
  - sell price per unit,
  - local price trend indicator,
  - available quantity,
  - unit size / cargo space,
  - optional market note.
- Sort/filter by price, category, cargo efficiency, or owned/not owned.

**Right: Trade Builder (40–45%)**
- Selected good.
- Current inventory of that good.
- Quantity stepper / direct numeric input.
- Unit price.
- Subtotal.
- Cargo change.
- Cash after trade.
- Optional calculated margin compared with a known previous/other-market price only when that information has been legitimately revealed to the student.
- `Add to Trade Draft`.

**Bottom / Sticky Review Drawer**
- Multi-item draft transaction.
- Total cost or revenue.
- Cash after transaction.
- Cargo after transaction.
- Warnings.
- `Confirm Trade`.

### Instructional Micro-Prompts
Use short expandable prompts rather than worksheet clutter:
- “Which price gives you more value per cargo unit?”
- “Can you afford this and still keep enough cash for later?”
- “What evidence makes this trade worth the risk?”

These can be configured as required evidence checkpoints.

## Student Actions
Students can:
- Inspect local prices and quantities.
- Select a good and calculate the cost/revenue for different quantities before committing.
- Buy and sell multiple goods in one transaction draft.
- Compare unit price and cargo use.
- Remove or edit items in the draft.
- Confirm the trade after reviewing totals.
- Open a mini-lesson for decimal operations, unit price, or profit.
- Pin one market price to the notebook as evidence.
- View previous prices already encountered in the season through a small “price history” drawer.
- Cancel a draft without affecting saved inventory or cash.

## Component States
### Market States
- `open` — normal trade.
- `limited_stock` — selected good has a maximum available quantity.
- `sold_out` — buy control disabled, sell may remain available.
- `buy_only` / `sell_only` — configured special market.
- `market_closed_event` — page readable but transactions disabled.
- `event_pending` — trade builder disabled until event resolved.
- `season_complete` — historical read-only view.
- `teacher_paused` — read-only with banner.

### Trade Draft Validation
Show specific inline states:
- insufficient cash,
- cargo capacity exceeded,
- quantity above stock,
- quantity above inventory for sale,
- zero quantity,
- decimal/number input invalid,
- trade allowed.

### Confirmation
Before commit show:
`You spend $___, use ___ cargo spaces, and will have $___ remaining.`

After commit:
- animate cash and cargo totals changing,
- append ledger entry,
- show a compact receipt,
- offer `Save this trade as evidence`.

## Mobile Behavior
- Goods become stacked cards with buy/sell prices in large numerals.
- Tapping a good opens Trade Builder as full-height bottom sheet.
- Draft basket is a sticky button: `Trade Draft (3) • $42.75`.
- Confirmation is a full-screen review step so students do not accidentally commit.
- Price-history chart becomes a simple list/sparkline with accessible text summary.
- No dense spreadsheet table on phone.

## Graphics / Assets Needed
- 10–20 reusable trade-good illustrations or clean icons.
- Trading post / market header art per location.
- Price up/down/steady indicator icons with labels.
- Crate/cargo-space icon.
- Receipt graphic treatment.
- Empty/sold-out states.
- Optional coin/cash-count animation kept subtle and fast.

All goods should also have text labels; never require image recognition.

## LMS / Data Requirements
### Market Configuration
```ts
Market {
  marketId
  locationId
  name
  goods: MarketGood[]
  opensOnDay?
  closesOnDay?
  modifiers[]
}

MarketGood {
  goodId
  buyPrice
  sellPrice
  availableQty
  unitCargo
  tags[]
  revealedInfo[]
}
```

### Transaction Log
Each confirmed trade records:
```ts
Transaction {
  transactionId
  simulationId
  locationId
  day
  lineItems[]
  cashBefore
  cashAfter
  cargoBefore
  cargoAfter
  totalCost
  totalRevenue
  netCashChange
  timestamp
}
```

### LMS Evidence
- Allow transaction to be attached to Notebook.
- Auto-calculate completion for configured tasks such as “complete first trade.”
- Record math checkpoints separately from trade success.
- Optional mastery tags: decimal-operations, money, unit-price, profit-reasoning, capacity.
- Teacher can inspect transaction history without changing it.
- Market prices used in an official challenge must come from the server/configured simulation seed so every student/team uses the intended rule set.

## Accessibility / Student Support
- Prices displayed as currency with consistent decimal places.
- Quantity controls have keyboard buttons plus direct numeric entry.
- Trade validation messages are written in plain language.
- Trend arrows include `higher`, `lower`, or `same` text.
- Screen-reader summary announces the effect of the proposed trade before confirmation.
- Prevent rapid double-submit on Confirm Trade.

## Acceptance Criteria
- Student can model a trade before committing it.
- No trade can create negative cash, negative inventory, or cargo above capacity.
- Confirmed transactions immediately update Shell, Cargo View, and Ledger.
- Market changes never rewrite earlier market snapshots or transaction history.
- Students can use a completed trade as evidence in the final strategy report.
