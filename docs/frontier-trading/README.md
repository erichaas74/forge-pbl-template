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

| Guide | Implemented workspace                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------- |
| UI 01 | Persistent mission bar, five live HUD metrics, desktop rail, mobile navigation, save and lock states                  |
| UI 02 | Living location scenes, explorable NPC stalls, rumor evidence, drag-to-load/sell, trade feedback, accessible controls |
| UI 03 | Glowing SVG trails, terrain/weather previews, uncertain rumors, route comparison, rationale, animated wagon departure |
| UI 04 | Unit-by-unit physical cargo, weighted suspension, drag-to-sell handoff, profit tooltips, canonical inventory table    |
| UI 05 | Weather-driven event scenes, staggered choices, math check, rationale, confirmation, animated consequence reveal      |
| UI 06 | Animated journal entries, expandable calculations, annotations, reconciliation, stamped evidence tray                 |
| UI 07 | Transparent cash equation, results metrics, trade analysis, cash timeline, reflection/report actions                  |
| UI 08 | Ten report sections, debounced autosave, evidence library, calculations, rubric readiness, final submission           |
| UI 09 | Local teacher overview, seed/difficulty, pause, inject/skip, restart/clear confirmations, print support               |

The reference screenshots guided visual hierarchy, parchment reading surfaces, dark wood framing, teal actions, serif headings, dense data cards, and review dialogs. The UI is implemented with semantic HTML, CSS, and inline SVG so the reusable template does not depend on project-specific screenshot assets.

The interaction layer makes each animation explain state rather than decorate it: cargo visibly enters or leaves the wagon, an overloaded draft makes the wagon reject the load, route motion represents committed travel, price tags reflect trends, and event effects reveal the recorded cost, delay, and risk. All drag interactions retain equivalent buttons, review dialogs, and structured data views. Reduced-motion preferences collapse the journey and suppress repeated animation.

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
