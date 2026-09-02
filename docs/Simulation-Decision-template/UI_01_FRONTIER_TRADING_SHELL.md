# UI 01 — Frontier Trading Shell

## Page Purpose
The persistent application shell for the entire simulation. It keeps the student oriented inside the trading season, exposes the essential status information without overwhelming the work area, and provides navigation between Market, Route Map, Wagon/Cargo, Event Decisions, Ledger, Results, and Final Strategy Report.

The shell should feel like a **frontier trading company command desk**, not a generic LMS page. The LMS/project navigation exists, but the central viewport is devoted to the simulation.

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
### Desktop / Tablet Landscape
Use a three-zone structure:

1. **Top Mission Bar — 72–88 px**
   - Project title: `Frontier Trading Simulation`.
   - Current season / round label.
   - Current location.
   - Day or travel-step count.
   - Save status.
   - Project/LMS back button.
   - Compact help / rules button.

2. **Persistent Trading HUD — 88–112 px**
   - Cash on hand.
   - Cargo used / cargo capacity.
   - Current cargo value at local market prices.
   - Season profit / loss to date.
   - Required reserve or mission target if configured.
   - Status chips use labels + icons; never color alone.

3. **Main Simulation Workspace**
   - Left vertical navigation rail on wide screens:
     `Market`, `Route`, `Cargo`, `Events`, `Ledger`.
   - Center page viewport for the active view.
   - Right contextual panel used only when the active page needs it:
     - local market summary,
     - route summary,
     - decision preview,
     - notebook evidence prompt.
   - `Results` remains locked until the season closes.
   - `Strategy Report` remains available as a draft but cannot be finally submitted until required evidence exists.

### Focus Rule
Only one primary simulation task should dominate the center viewport. The shell can show **summary state**, but it must not duplicate the full content of other views. Example: the Market page may show cargo totals in the HUD, but not the entire wagon inventory table.

### Navigation Guardrails
- Students can freely inspect Market, Route, Cargo, and Ledger before committing a move.
- An unresolved Event Decision can temporarily lock route travel and market transactions.
- A “Commit Travel” or “Confirm Trade” action always uses a review step before changing persistent state.
- Browser refresh must restore the latest saved state.

## Student Actions
Students can:
- Move between the major simulation views without losing work.
- Open project rules, vocabulary, mini-lessons, and rubric from a slide-over resource panel.
- Open the Project Notebook / evidence panel.
- View current mission target and required end-of-season evidence.
- Resume the next required task from an LMS-provided “Continue” button.
- Inspect save status and manually retry a failed save.
- Exit back to the Project Hub without ending the simulation.

## Component States
### Global Simulation States
- `not_started` — mission launch visible; simulation controls disabled until student begins.
- `planning` — full inspection allowed; no official transaction committed yet.
- `active` — normal trading / travel workflow.
- `event_pending` — Event view highlighted; travel and trading actions disabled until decision is resolved.
- `checkpoint_due` — student may continue inspecting, but a required reflection/mastery checkpoint is surfaced.
- `season_complete` — trading/travel locked; Results and Final Strategy Report unlocked.
- `submitted` — simulation remains viewable read-only except revisions allowed by teacher.
- `paused_by_teacher` — all commit actions disabled; explanatory banner shown.
- `needs_revision` — final report or evidence requires revision; simulation data remains immutable unless teacher reopens the season.

### Save States
- `saved`
- `saving`
- `offline_local`
- `save_failed`
- `conflict_detected` — requires reload/merge rule; never silently overwrite.

### Navigation States
Each nav item can be:
- available,
- active,
- locked,
- attention-needed,
- complete.

## Mobile Behavior
### Tablet Portrait
- Top Mission Bar collapses into two rows.
- HUD becomes a horizontally scrollable strip of 4–5 metric cards.
- Navigation rail becomes a fixed bottom tab bar with `Market`, `Route`, `Cargo`, `Ledger`, and `More`.
- `Events`, `Results`, and `Report` move under `More` unless currently required.

### Phone
- Preserve **one task per screen**.
- No three-column layout.
- Context panel becomes a bottom sheet.
- HUD reduces to Cash, Cargo, Profit, and current Location; tapping expands full status.
- Use sticky bottom action area for `Review Trade`, `Commit Travel`, `Confirm Decision`, etc.
- Tables convert to stacked cards with explicit labels.
- Map remains pannable/zoomable; route comparison opens as a separate sheet rather than side-by-side.

## Graphics / Assets Needed
Required visual system:
- Frontier trading-post / wagon-company visual identity.
- Project banner / mission art.
- Navigation icons: market stall, map/compass, wagon/crate, event card, ledger/book, trophy/results, report.
- Cash, cargo, distance, terrain, and profit icons.
- Reusable status badges.
- Subtle parchment/wood texture only as background framing; reading surfaces remain clean and high contrast.
- Loading, save, warning, locked, and completed icon states.

Avoid:
- decorative textures behind long text,
- hard-to-read script fonts,
- excessive Western stereotypes or caricatures,
- graphics that imply a historically neutral “empty frontier.”

## LMS / Data Requirements
### Required Persistent Simulation Object
```ts
FrontierSimulationState {
  simulationId
  projectId
  studentId
  teamId?
  seasonId
  status
  currentLocationId
  currentDay
  cash
  startingCash
  cargoCapacity
  cargoUsed
  inventory[]
  routeHistory[]
  transactions[]
  eventHistory[]
  marketSnapshots[]
  profitToDate
  requiredEvidence[]
  startedAt
  lastSavedAt
  completedAt?
}
```

### LMS Integration
- Activity status maps to LMS statuses: Locked, Not Started, In Progress, Submitted, Complete, Needs Revision, Missing, Excused.
- Every major commit logs timestamp, inputs, outputs, and simulation result data.
- Completion remains separate from mastery.
- Notebook evidence links can reference transaction IDs, event-decision IDs, route choices, and results.
- Teacher feedback and revision flags attach to the Final Strategy Report, not to raw historical simulation records.
- Project Hub receives overall progress, current task, mastery alerts, and final-readiness status.
- Support resume-from-last-view.
- Final challenge mode can lock rules and limit official attempts.

## Accessibility / Student Support
- Minimum 16 px body text; key money values 20–28 px.
- Icons always paired with text labels or accessible names.
- Keyboard traversal for nav, dialogs, and transaction controls.
- Do not encode profit/loss, locked/unlocked, or risk with color alone.
- All state-changing actions require a clear confirmation summary.
- Optional read-aloud/audio for mission and event text.
- Provide plain-language tooltips for `unit price`, `revenue`, `cost`, `profit`, `capacity`, and `risk`.
- Keep numeric alignment consistent and use tabular numerals when possible.

## Acceptance Criteria
- Student always knows current location, cash, cargo use, profit/loss, and next available action.
- Changing pages never resets transaction drafts or simulation state.
- Pending events prevent contradictory actions.
- Season-complete state automatically unlocks Results and final submission workflow.
- The shell can load from configuration data; page content is not hard-coded for one project.
- All major state changes are auditable in the LMS/simulation log.
