# Frontier Trading Company

Frontier Trading Company is a Grade 5 mathematics project-based learning simulation built with the reusable `simulation-decision` template. It is available at `/frontier-trading`.

## Learning experience

Students create a company, choose one of four transportation options, compare ten goods across six markets, commit a route, resolve deterministic trail events, and use their ledger as evidence in a ten-section strategy report.

The project emphasizes:

- whole-number quantities and decimal money;
- multiplication, division, subtraction, unit price, cost basis, and profit;
- cash, cargo-capacity, route, time, and risk trade-offs;
- review-before-commit decision making;
- claims supported by calculations and records from the simulation.

## Page alignment

| Guide | Implemented workspace                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------------------- |
| UI 01 | Persistent mission bar, five live HUD metrics, desktop rail, mobile navigation, save and lock states           |
| UI 02 | Searchable market, responsive goods cards/table, trade builder, draft, validation, review, receipt evidence    |
| UI 03 | Accessible SVG route map plus equivalent route cards, three-route comparison, compatibility, rationale, review |
| UI 04 | Cargo meter, illustrative wagon, canonical inventory table, current-value calculations, evidence snapshot      |
| UI 05 | Priority event decision, known effects, math check, rationale, confirmation, travel controls, outcome evidence |
| UI 06 | Immutable derived ledger, filters, expansion, calculations, annotations, reconciliation, evidence tray         |
| UI 07 | Transparent cash equation, results metrics, trade analysis, cash timeline, reflection/report actions           |
| UI 08 | Ten report sections, debounced autosave, evidence library, calculations, rubric readiness, final submission    |
| UI 09 | Local teacher overview, seed/difficulty, pause, inject/skip, restart/clear confirmations, print support        |

The reference screenshots guided visual hierarchy, parchment reading surfaces, dark wood framing, teal actions, serif headings, dense data cards, and review dialogs. The UI is implemented with semantic HTML, CSS, and inline SVG so the reusable template does not depend on project-specific screenshot assets.

## Deliberate guide adaptations

- The current repository has no authenticated classroom backend, so teacher controls are explicitly local to the current browser instead of presenting fabricated roster or realtime class data.
- Student progress is stored through a project-and-version keyed persistence adapter. The boundary can be replaced by a server adapter without changing page components.
- Unsold cargo is displayed separately from cash and does not silently inflate the score.
- Event randomness is seeded and reproducible. Refreshing does not reroll an active attempt.
- All official money uses integer cents. UI formatting never serves as the accounting source of truth.

## Structure

- Project curriculum configuration: `src/app/projects/frontier-trading/frontier-trading.config.ts`
- Generic domain and reducer: `src/app/templates/simulation-decision/domain/`
- Runtime and persistence boundary: `src/app/templates/simulation-decision/runtime/`
- Reusable shell and pages: `src/app/templates/simulation-decision/ui/`
- Route composition: `src/app/features/frontier-trading/frontier-trading.routes.ts`
