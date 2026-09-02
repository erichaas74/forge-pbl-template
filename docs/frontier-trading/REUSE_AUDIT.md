# Simulation Decision Reuse Audit

## Existing code reused unchanged

- Angular 22 standalone/lazy-route application structure.
- Repository-level strict TypeScript, build budgets, and test runner.
- Core separation conventions for configuration, runtime state, behavior, presentation, and persistence.
- Existing Investigation project and its runtime remain independent and unchanged by the new template route.

## Generic capability added

`simulation-decision` is a new reusable template capability rather than a Frontier-specific page set. Its public configuration describes transports, goods, markets, routes, events, math challenges, evidence, and final report sections. Its framework-independent reducer owns all official state transitions.

The shared template supplies:

- integer-cent market and FIFO cost-basis calculations;
- budget, stock, cargo, terrain, and workflow validation;
- seeded event selection;
- append-only ledger entries and reconciliation;
- evidence references and report readiness;
- project/version-scoped persistence;
- student and local teacher workspaces.

## Project-specific surface

Frontier-specific names, prices, story text, market multipliers, map paths, and event choices exist only in `frontier-trading.config.ts`. The generic template does not import Frontier content. The composition route injects the project configuration through a typed token.

## Core contract impact

No existing core or Investigation contract was changed to make the simulation work. The app router gained one lazy route. The template uses its own versioned contract because a decision simulation has a materially different runtime state from an Investigation project.

## Architecture warning review

No project-named Angular component or service was introduced. The only project-named TypeScript modules are declarative configuration and the composition root. A future simulation project should be added by supplying another `SimulationDecisionConfig` and route provider, without editing the domain engine or pages.

Before production multi-user use, the browser persistence adapter and local teacher controls must be replaced at the adapter/authorization boundary. Client-side teacher UI is not security.
