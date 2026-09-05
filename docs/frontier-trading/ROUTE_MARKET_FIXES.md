# Route and market fixes — September 3, 2026

Implemented the fixes and visual improvements from [the audit](ROUTE_MARKET_UX_AUDIT.md).

## Result

- Trade drafts, merchant selection, filters, selected goods, quantities, route selections, comparison choices, and route-specific reasoning survive workspace changes within an attempt.
- Additions accumulate; editing a draft explicitly replaces its quantity. Candidate previews validate the complete plan, including cash, cargo, stock, whole-number input, and read-only states.
- Proposed cargo is labeled and opens purchase editing; owned cargo opens a sale. Cargo handoffs retain the chosen good and reject storefronts that do not trade it.
- Market goods use readable cards with direct buy/sell actions and an all-discovered-goods view. A selected purchase brings the editor into view, including on phones.
- Compact company context leaves more space for the market and map. Merchant scenes include distinctive shop details, restrained motion, and visible rumor/source cues. Local market information uses demand descriptions rather than implying price history.
- Route destinations have illustrated, keyboard-operable markers. A compact comparison table aligns route facts, supports up to three selected routes, and retains blocked routes for inspection.
- The trip card exposes time, supply cost, risk, distance, estimated arrival, cash after the trade draft and supplies, and destination reports. Unconfirmed trade drafts must be reviewed or cleared before departure.
- Departure does not increment an artificial day counter or animate the whole journey. Map and Journey markers use official travel progress. Arrival is identified at the destination market.
- Trade and departure reviews contain keyboard focus, support Escape, restore focus on close, and guard against duplicate or invalid confirmation.
- Confirmed trades have a persistent on-page receipt while the market is open, including all line calculations. Ledger records remain the durable transaction history.

## Architecture and scope

Planning uses `SimulationPlanning`, owned by the existing route-scoped runtime. It is separate from official ledger/inventory state and uses no additional backend or state-management framework. Plans are scoped by location and reset on restart/clear. Official actions still go through the existing runtime and domain reducer.

Uncommitted planning is retained in memory across simulation workspaces, not across browser reloads or leaving the project. Committed work retains the existing persistence adapter. No published project data, core schema, prices, event outcomes, or season rules were changed. The reusable templates consume existing location kinds, merchant categories, transport icons, terrain, and demand reports.

No new `TEMPLATE_CAPABILITY_GAP` items or breaking contract changes. Existing optional reference-spec capabilities such as price-history charts and map pan/zoom were not introduced by this audit fix.

## Files

Added:

- `src/app/templates/simulation-decision/runtime/simulation-planning.ts`
- `src/app/templates/simulation-decision/ui/review-dialog.directive.ts`
- `src/app/templates/simulation-decision/ui/simulation-planning.spec.ts`
- `vitest.serial.config.mjs` — optional one-worker test configuration for environments where parallel workers exit unexpectedly.
- This completion report.

Modified:

- Market and route map component TypeScript, HTML, and SCSS.
- Simulation shell TypeScript, HTML, and SCSS.
- Runtime service (planning lifecycle), domain engine (read-only preview validation).
- Journey template/styles (marker tied to official progress).
- UI 02 / UI 03 implementation notes and the project README.

The original audit document is retained as the pre-change record. Development-server logs may update while the local preview rebuilds.

## Validation

- Production Angular build passes. Existing unrelated Mystery Investigation component stylesheet warning remains (17.60 kB against a 14 kB warning budget).
- Full test suite: **23 files, 114 tests passed**, including **21 new regression cases**.
- Command: `npm test -- --watch=false --runner-config=vitest.serial.config.mjs`.
- The initial default parallel-worker run exited unexpectedly before producing results. The optional single-worker configuration completed the full suite successfully without disabling tests.
- Browser: complete-plan math ($104.24 after one flour and one coffee), retained draft after visiting Route, route budget ($86.24 after $18 supplies), selected-route explanation, review dialog focus containment/Escape/focus restoration, and phone layout with no page overflow.
- Domain/component tests also cover repeated drops, explicit quantity editing, invalid inputs, combined overspending, proposed cargo, sell handoffs, incompatible merchants, discovered categories, duplicate confirmation, location isolation, restart, departure preflight, official progress, and read-only states.

Recommended next review: a short student usability session focusing on selecting a destination, comparing two routes, and explaining one purchase with its receipt.

