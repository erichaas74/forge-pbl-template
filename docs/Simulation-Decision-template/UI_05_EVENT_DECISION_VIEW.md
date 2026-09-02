# UI 05 — Event Decision View

## Page Purpose
The Event Decision View handles risk cards and changing conditions. It interrupts normal travel/trading only when necessary, gives students the information they are allowed to know, and records both the decision and its consequences for later evidence-based reflection.

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
### Modal-to-Full-Page Priority View
When an event is required, the Event View becomes the primary workspace and normal commit actions elsewhere are locked.

**Header**
- Event title.
- Location / route context.
- “Decision required” status.
- Optional countdown only if pedagogically justified; default is no timer.

**Left / Top: Event Story**
- 80–180 words max for core event.
- Illustration.
- “What changed?” fact box.
- Known consequences or constraints.

**Right / Bottom: Decision Cards**
2–4 choices, each with:
- action label,
- known immediate cost/benefit,
- unknown/risk indicator,
- any math students need to calculate,
- optional “show calculation workspace.”

**Decision Workspace**
- Numeric scratch fields / calculator where relevant.
- Short reasoning prompt configurable as:
  - optional,
  - required before choice,
  - required after outcome.

**Outcome State**
After commit, replace options with:
- selected choice,
- actual outcome,
- changes to cash/cargo/day/market/route state,
- short consequence explanation,
- `Add Event to Ledger`,
- `Use as Evidence`,
- `Continue`.

## Student Actions
Students can:
- Read/listen to event.
- Inspect known effects of each choice.
- Run permitted calculations.
- Select a tentative choice.
- Review before confirming.
- Submit reasoning.
- Confirm one decision.
- View the revealed outcome.
- Attach the event decision to notebook evidence.
- Continue to destination/market after the event resolves.

Students cannot:
- undo an official event decision unless teacher explicitly resets/reopens,
- preview random outcomes by refreshing,
- trade/travel around a pending required event.

## Component States
### Event States
- `unread`
- `read`
- `choice_draft`
- `reasoning_required`
- `ready_to_confirm`
- `resolving`
- `outcome_revealed`
- `complete`
- `teacher_paused`
- `read_only_history`

### Choice States
- available,
- selected,
- unavailable due to cash/cargo/prerequisite,
- insufficient information,
- locked until calculation/check completed.

### Outcome Types
Configurable effects can modify:
- cash,
- inventory quantity,
- cargo availability,
- travel day/time,
- market prices/availability,
- route availability,
- mission score/indicator.

Outcomes must be deterministic from the saved seed/config or server-resolved; never reroll because the client reloads.

## Mobile Behavior
- Event is full-screen.
- Story, facts, then choice cards in one vertical flow.
- Sticky bottom `Review Choice`.
- Calculation workspace opens inline below selected option.
- Outcome uses large before/after chips for affected values.
- Long historical context or perspective notes move to expandable “More context” sections.

## Graphics / Assets Needed
- Event-card frame.
- Flexible illustration slots for weather, trail blockage, market shortage, damaged goods, unexpected demand, river crossing, price surge, etc.
- Choice icons.
- Risk/unknown icon.
- Before/after consequence indicators.
- Optional audio narration.

Events involving historical groups should use respectful, contextualized language and avoid reducing Indigenous peoples or other communities to generic “hazards.”

## LMS / Data Requirements
### Event Schema
```ts
SimulationEvent {
  eventId
  eventType
  triggerRule
  context
  prompt
  choices[]
  perspectiveContext?
  randomSeedPolicy?
}

EventChoice {
  choiceId
  label
  knownEffects[]
  hiddenOutcomeRule?
  prerequisites?
  calculationPrompt?
}

EventDecision {
  eventDecisionId
  simulationId
  eventId
  routeId?
  locationId?
  day
  choiceId
  reasoning?
  stateBefore
  outcome
  stateAfter
  timestamp
}
```

### LMS / Evidence
- Every official decision is logged as simulation evidence.
- A configured event can be a completion checkpoint.
- Reasoning can be scored with rubric/manual feedback without altering the event outcome.
- Mastery tags may include decimal-operations, multi-step-problem, cause-effect-reasoning, evidence-based-claim.
- Teacher controls event pool, trigger sequence/probability, and whether events are common across class or seeded per team.
- Event outcome record must be replayable/auditable.

## Accessibility / Student Support
- Event text supports text-to-speech/audio.
- Choice cards are fully keyboard accessible.
- Unknown outcomes are labeled `Unknown`, not only represented by `?`.
- Effects use text like `Cash: -$12.50`, `Travel: +1 day`.
- No timer by default; if enabled, teacher can provide accommodation override.
- Outcome animation can be reduced/disabled with reduced-motion preference.

## Acceptance Criteria
- A pending required event blocks contradictory simulation actions.
- Student sees all known choice information before confirming.
- An event resolves exactly once.
- Refreshing cannot reroll outcome.
- Event history preserves choice, rationale, before state, and after state for final reflection.
