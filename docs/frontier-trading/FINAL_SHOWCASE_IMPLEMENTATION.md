# Frontier Trading final showcase implementation

**Release:** 1.9.0  
**Status:** implemented for the individual browser-local practice simulation.

## Student flow

Showcase appears as the fourth tool in **Finish** after Money Record, My Score, and My Reflection. It unlocks when the trading season is complete and remains available after reflection submission.

The presentation contains five guided parts:

1. **Season result:** company name, route endpoints, verified game score, final cash, and net profit or loss.
2. **Route and load:** the selected route highlighted over the painted map and the original pre-departure purchases summarized by quantity, cargo spaces, and cost.
3. **Math proof:** the departure forecast, actual trip-profit calculation, final-cash audit, reconciliation status, and forecast error.
4. **Adaptation:** the recorded event with the largest cash or cargo effect, its before-and-after values, the student's reasoning, and a revision sentence frame.
5. **Team defense:** strongest sale or audited result, 40/40/20 score categories, prepared reflection claims, and a question from another group.

## Presentation controls

- a configurable three-minute pitch timer with pause and reset;
- presentation mode that expands the showcase over the application shell;
- Previous and Next buttons plus Left Arrow, Right Arrow, Page Up, Page Down, Home, End, and Escape;
- current-slide printing;
- a configurable peer-question deck and one-click question draw.

## Other-group protocol

On the final slide, another group asks the displayed question. Presenters must answer with one number and one saved game record. The questioning group then identifies one clear strength and asks one follow-up. This supplies a concrete inter-group final activity without pretending the browser-local practice runtime is a synchronized classroom session.

## Data and authority

The showcase is a read-only projection. It derives content from:

- route history and its immutable route snapshot;
- pre-travel purchase ledger entries;
- saved forecast values;
- official sales, expenses, income, and ending cash;
- event history and recorded reasoning;
- 40 Trading + 40 Math + 20 Explain results;
- final reflection responses and calculations.

Timer state, slide position, presentation mode, and question position stay local to the component. They do not write runtime events, alter balances, award points, or change the submitted report.

## Live-final boundary

This completes the presentation layer for individual practice. It does not implement authenticated teams, shared offers, atomic inter-company transactions, the authoritative class clock, synchronized disruptions, required deliveries, a class leaderboard, or official winner eligibility. Those remain sequenced in `LIVE_TRADING_FINAL_DESIGN.md` and require the live-session and exchange capabilities before classroom release.
