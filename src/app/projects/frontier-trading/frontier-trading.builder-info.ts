import type { SimulationDecisionBuilderInfoDefinition } from '../../templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.models';

export const frontierTradingBuilderInfo: SimulationDecisionBuilderInfoDefinition = {
  projectLabel: 'Frontier Trading Company / HBC Builder Brief',
  snapshotVersion: '1.13.0',
  updatedAt: 'September 4, 2026',
  updatedBy: 'Builder documentation snapshot',
  currentMode: 'Individual browser-local practice simulation',
  statusSummary:
    'The guided Grade 5 practice loop and read-only final showcase are implemented. The historically grounded HBC route network and server-authoritative class competition remain planned work.',
  studentPath: [
    'Create a company and choose transportation.',
    'Visit two shops to reveal focused goods and route choices.',
    'Choose a route before buying the final load.',
    'Buy two kinds of route-matched goods while protecting travel money.',
    'Calculate destination sales and forecast trip profit.',
    'Travel, complete a guaranteed math event, and explain trail choices.',
    'Sell at the destination and compare forecast with actual trip profit.',
    'Review the 40 Trading + 40 Math + 20 Explain score and answer four reflections.',
    'Present the five-part company showcase and answer a question from another group.',
  ],
  paths: [
    {
      label: 'Project library',
      path: '/projects',
      purpose: 'Student and builder front page.',
      kind: 'app',
    },
    {
      label: 'Student game',
      path: '/frontier-trading',
      purpose: 'Current individual practice experience.',
      kind: 'app',
    },
    {
      label: 'Builder brief',
      path: '/frontier-trading/builder-info',
      purpose: 'This current-state and roadmap page.',
      kind: 'app',
    },
    {
      label: 'Project configuration',
      path: 'src/app/projects/frontier-trading/frontier-trading.config.ts',
      purpose:
        'Published goods, markets, routes, progression, forecast, events, and report settings.',
      kind: 'source',
    },
    {
      label: 'Builder snapshot',
      path: 'src/app/projects/frontier-trading/frontier-trading.builder-info.ts',
      purpose: 'HBC status, release notes, paths, guardrails, and roadmap shown on this page.',
      kind: 'source',
    },
    {
      label: 'Feature routes',
      path: 'src/app/features/frontier-trading/frontier-trading.routes.ts',
      purpose: 'Student and builder-info Angular route composition.',
      kind: 'source',
    },
    {
      label: 'Simulation domain engine',
      path: 'src/app/templates/simulation-decision/domain/simulation-decision.engine.ts',
      purpose: 'Money, trade, route, forecast, event, scoring, and completion rules.',
      kind: 'source',
    },
    {
      label: 'Student mission shell',
      path: 'src/app/templates/simulation-decision/ui/simulation-decision-shell.component.ts',
      purpose: 'Plan Trip, Travel, Finish navigation and next-mission scaffolding.',
      kind: 'source',
    },
    {
      label: 'Route and forecast UI',
      path: 'src/app/templates/simulation-decision/ui/pages/route-map.component.ts',
      purpose: 'Route comparison, profit forecast, departure gates, and route records.',
      kind: 'source',
    },
    {
      label: 'Final showcase UI',
      path: 'src/app/templates/simulation-decision/ui/pages/final-showcase.component.ts',
      purpose:
        'Read-only presentation stages, game-record summaries, pitch timer, and peer-question protocol.',
      kind: 'source',
    },
    {
      label: 'Reusable realistic wagon layer',
      path: 'src/app/templates/simulation-decision/ui/art/illustrated-wagon.component.html',
      purpose:
        'Transparent photographic wagon base with replaceable cargo and lightweight movement layers shared across game screens.',
      kind: 'source',
    },
    {
      label: 'Realistic wagon asset',
      path: 'public/frontier-trading/vehicle-scenes/trade-wagon-realistic.webp',
      purpose: 'Optimized transparent wagon reconstruction used beneath dynamic cargo overlays.',
      kind: 'source',
    },
    {
      label: 'Realistic cargo assets',
      path: 'public/frontier-trading/cargo-scenes',
      purpose:
        'Transparent sack, crate, wrapped-bale, and rope-coil sprites stacked from live inventory quantities.',
      kind: 'source',
    },
    {
      label: 'Wagon cargo art system',
      path: 'docs/frontier-trading/WAGON_CARGO_ART_SYSTEM.md',
      purpose:
        'Package mapping, quantity levels, label rules, accessibility contract, and asset replacement guidance.',
      kind: 'document',
    },
    {
      label: 'Pre-rendered shop scenes',
      path: 'public/frontier-trading/shop-scenes',
      purpose:
        'Optimized exterior town and four shop-interior backgrounds used under live HTML controls.',
      kind: 'source',
    },
    {
      label: 'Pre-rendered route map',
      path: 'public/frontier-trading/map-scenes',
      purpose:
        'Painted frontier terrain used beneath live SVG routes, checkpoints, destinations, and journey progress.',
      kind: 'source',
    },
    {
      label: 'Pre-rendered opening scene',
      path: 'public/frontier-trading/setup-scenes',
      purpose:
        'Painted company-charter background displayed beneath the live transport and setup controls.',
      kind: 'source',
    },
    {
      label: 'Shop scene art system',
      path: 'docs/frontier-trading/SHOP_SCENE_ART_SYSTEM.md',
      purpose: 'Asset inventory, overlay contract, prompt direction, and replacement rules.',
      kind: 'document',
    },
    {
      label: 'Map scene art system',
      path: 'docs/frontier-trading/MAP_SCENE_ART_SYSTEM.md',
      purpose:
        'Map asset, coordinate alignment, route-overlay contract, prompt direction, and replacement rules.',
      kind: 'document',
    },
    {
      label: 'Opening scene art system',
      path: 'docs/frontier-trading/SETUP_SCENE_ART_SYSTEM.md',
      purpose: 'Opening asset, live-overlay contract, prompt direction, and replacement rules.',
      kind: 'document',
    },
    {
      label: 'Frontier overview',
      path: 'docs/frontier-trading/README.md',
      purpose: 'Documentation index and current experience summary.',
      kind: 'document',
    },
    {
      label: 'HBC route optimization design',
      path: 'docs/frontier-trading/HBC_ROUTE_OPTIMIZATION_GAME_DESIGN.md',
      purpose: 'Historical chapters, route/load model, sources, and representation requirements.',
      kind: 'document',
    },
    {
      label: 'Final competition plan',
      path: 'docs/frontier-trading/FINAL_PROJECT_COMPETITION_PLAN.md',
      purpose: '55-minute final, roles, scoring, traps, audit, and implementation sequence.',
      kind: 'document',
    },
    {
      label: 'Final showcase implementation',
      path: 'docs/frontier-trading/FINAL_SHOWCASE_IMPLEMENTATION.md',
      purpose:
        'Implemented presentation flow, evidence sources, peer protocol, controls, and live-system boundary.',
      kind: 'document',
    },
    {
      label: 'Live trading system design',
      path: 'docs/frontier-trading/LIVE_TRADING_FINAL_DESIGN.md',
      purpose:
        'Authoritative sessions, reservations, atomic exchanges, live updates, and recovery.',
      kind: 'document',
    },
  ],
  changes: [
    {
      version: '1.13.0',
      date: 'September 4, 2026',
      title: 'Quantity-driven realistic wagon cargo',
      changes: [
        'Replaced abstract cargo blocks with transparent realistic sacks, wooden crates, wrapped trade bales, and rope coils.',
        'Mapped each configured good to an appropriate package family instead of identifying materials by color alone.',
        'Changed visible stacks at 1, 2–3, 4–6, and 7+ units while keeping an exact live quantity tag on every material group.',
        'Used the same live cargo groups in the market wagon, outfitting yard, trail journey, and event scenes.',
      ],
    },
    {
      version: '1.12.0',
      date: 'September 4, 2026',
      title: 'Calculation-gated purchases and sales',
      changes: [
        'Required an exact student-entered total for every purchase and sale line before the transaction can settle.',
        'Added purchase discounts of 10% for 3–6 units and 14% for 7 or more units; sales continue to use the posted sell price.',
        'Stopped showing cash change and remaining cash until all transaction calculations are correct.',
        'Recorded the posted price, effective discounted price, discount, quantity, and student answer in the canonical ledger for audit.',
        'Published the reusable transaction-math package contract in simulation schema 1.9 and template 1.4.',
      ],
    },
    {
      version: '1.11.0',
      date: 'September 4, 2026',
      title: 'Decorative motion and legacy drawing cleanup',
      changes: [
        'Removed the animated yard worker and stopped ambient cloud movement in the cargo scene.',
        'Deleted the old hand-drawn map landscape, wildlife, smoke, wagon-bed, wheel, storefront-character, and unused animation code replaced by rendered assets.',
        'Kept movement only where it communicates route selection, travel, cargo feedback, or a completed transaction.',
      ],
    },
    {
      version: '1.10.0',
      date: 'September 4, 2026',
      title: 'Realistic wagon and map-line routes',
      changes: [
        'Replaced the CSS/SVG wagon drawing with a transparent, realistic historical freight-wagon asset shared across setup, market, cargo, and journey scenes.',
        'Separated cargo from the wagon image so the open bed can display the goods currently being hauled.',
        'Changed map routes from broad glowing bands to thin survey-style lines while retaining a large invisible interaction target.',
        'Matched the final showcase route to the same understated map-line treatment.',
      ],
    },
    {
      version: '1.9.0',
      date: 'September 4, 2026',
      title: 'Five-part final company showcase',
      changes: [
        'Added a read-only Showcase tool to the Finish workspace after the money record, score, and reflection.',
        'Built guided slides for the season result, route and original load, forecast and audit mathematics, event revision, and final company defense.',
        'Added a three-minute pitch timer, presentation mode, keyboard slide controls, current-slide printing, and configurable questions for another group.',
        'Derived every showcased number from saved routes, ledger entries, events, results, and reflection records without changing the official score.',
      ],
    },
    {
      version: '1.8.0',
      date: 'September 4, 2026',
      title: 'Clearer shop floor and detailed live wagon',
      changes: [
        'Expanded each shop interior to fill the scene instead of nesting it inside a large inset panel.',
        'Replaced tall blocking merchandise overlays with a shallow price shelf, compact action cards, a small merchant bubble, and a collapsed route tip.',
        'Added a three-step shop instruction and clearer Buy each, Sell each, wagon-space, stock, Buy, and Sell labels.',
        'Upgraded the reusable wagon with canvas texture, seams, rope, wood grain, braces, iron fittings, detailed wheels, harness lines, and a live lantern.',
      ],
    },
    {
      version: '1.7.0',
      date: 'September 4, 2026',
      title: 'Game-world company charter and fast test start',
      changes: [
        'Replaced the flat setup illustration with a painted frontier prologue that matches the town and route map.',
        'Kept the selected transport as a live illustrated overlay above the scene.',
        'Prefilled an editable animal trading-company name and added a one-click new-animal control for fast classroom and builder testing.',
      ],
    },
    {
      version: '1.6.0',
      date: 'September 4, 2026',
      title: 'Painted route world with live trail overlays',
      changes: [
        'Replaced the flat map surface with a pre-rendered frontier landscape that matches the connected-town shop art.',
        'Kept routes, destinations, checkpoints, lock states, travel progress, and route facts as live SVG and HTML overlays.',
        'Strengthened available, compared, selected, completed, blocked, and traveling trail highlights against the detailed terrain.',
      ],
    },
    {
      version: '1.5.0',
      date: 'September 4, 2026',
      title: 'Pre-rendered town and live shop interiors',
      changes: [
        'Replaced repeated storefront drawings with one detailed connected-town background and transparent, accessible shop hotspots.',
        'Added a matching pre-rendered interior for the mercantile, forge, freight depot, and notice office.',
        'Kept prices, stock, trends, rumors, route clues, and trade controls as dynamic HTML overlays so game state remains readable and auditable.',
      ],
    },
    {
      version: '1.4.0',
      date: 'September 4, 2026',
      title: 'Connected in-view town market',
      changes: [
        'Rebuilt the market as one connected old-town street with distinct mercantile, forge, freight, and notice-office fronts.',
        'Moved the selected merchant, rumor, prices, and goods into a contained shop counter beside the street.',
        'Added the repository rule that newly opened content must remain in view and receive logical focus.',
      ],
    },
    {
      version: '1.3.0',
      date: 'September 4, 2026',
      title: 'Harder math after the guided base',
      changes: [
        'Added destination-sales and trip-profit forecasts before departure.',
        'Added forecast-versus-actual profit review at season results.',
        'Added the final class competition plan and reusable forecast package validation.',
      ],
    },
    {
      version: '1.2.0',
      date: 'September 3, 2026',
      title: 'Grade 5 navigation and scoring simplification',
      changes: [
        'Reduced student navigation to Plan Trip, Travel, and Finish.',
        'Added one exact Next Mission action, route-first buying, and protected travel money.',
        'Changed scoring to Trading 40 + Math 40 + Explain 20 and reduced reflection to four prompts.',
      ],
    },
    {
      version: '1.1.0',
      date: 'September 3, 2026',
      title: 'Map, market, and visual game layer',
      changes: [
        'Added the illustrated route atlas, market scenes, journey movement, and feedback animation.',
        'Added staged goods/routes and persistent uncommitted planning between tools.',
      ],
    },
  ],
  historicalDirection: [
    'The current Independence-to-frontier-post practice map is not presented as an early HBC map.',
    'The HBC build should use a new versioned scenario with period-correct ships, canoes, sledges, or York boats.',
    'The recommended first final is the later York boat outfit because whole packs support visible capacity optimization.',
    'Earlier HBC chapters must use matching transport, geography, dates, records, and source cards.',
    'Cree and Assiniboine traders, First Nations route knowledge and commercial agency, and Métis freight labor must be represented as historical actors, not game modifiers.',
    'Historical content requires social studies and Indigenous review before classroom publication.',
  ],
  guardrails: [
    'Keep project content and settings in versioned configuration; keep reusable behavior in the simulation-decision template.',
    'Keep every newly opened or expanded interaction in the current view; reveal and focus it without making students hunt down the page.',
    'Pre-rendered scene art is atmosphere only; prices, quantities, math inputs, state changes, focus, and controls remain semantic HTML overlays.',
    'Map backgrounds never contain route lines, labels, checkpoints, math, locks, or game state; those remain live SVG and HTML overlays aligned to the 100 × 80 map coordinates.',
    'Visible route strokes stay thin and cartographic; accessibility comes from a separate wide transparent hit target instead of a road-sized visible band.',
    'Vehicle art and cargo are separate layers so the realistic wagon remains stable while the hauled goods change with inventory.',
    'Cargo shape communicates package type, a restrained tag names the material, and × quantity communicates the exact amount; color alone never carries meaning.',
    'Large quantities use representative stacks plus exact quantity tags instead of shrinking every owned unit into an unreadable icon.',
    'Do not add decorative people or ambient character animation unless the character has a clear instructional or interactive role.',
    'Do not bake readable prices or assessed answers into shop artwork because the runtime must be able to change and audit them.',
    'Every purchase and sale line must pass the transaction math gate; the interface cannot reveal the exact line total before the student answers correctly.',
    'Purchase discount tiers come from versioned configuration, while the engine and interface share the same integer-cent pricing functions.',
    'Do not silently change a live project version underneath saved student attempts.',
    'All official money stays in integer cents and all random events remain seeded and reproducible.',
    'A price trap must expose every number needed to detect it before commitment.',
    'The trading story motivates the work, but students must produce the assessed route, load, transaction, revision, and audit mathematics before the interface reveals or animates the result.',
    'Every student owns at least one scored calculation and verifies another; the designated math checker cannot do the company mathematics for the group.',
    'The browser-local practice state is not trusted as an official multiplayer competition balance.',
    'The first live-system slice is two companies completing one accurate, atomic, retry-safe trade.',
    'Game profit, math mastery, historical reasoning, individual contribution, and teacher grade remain distinct records.',
    'The local showcase is a presentation of saved practice evidence; it does not claim to be the server-authoritative multiplayer final or class leaderboard.',
  ],
  roadmap: [
    {
      phase: '1 · Guided practice bridge',
      status: 'current',
      outcome:
        'One-action scaffolding, profit forecast, trail math, selling, score, and reflection.',
    },
    {
      phase: '2 · Reviewed HBC scenario package',
      status: 'next',
      outcome:
        'Period-correct route network, pack loads, source cards, requirements, traps, and answer keys.',
      dependsOn: 'Social studies and Indigenous content review.',
    },
    {
      phase: '3 · Two-company live trade',
      status: 'planned',
      outcome:
        'Authenticated session, reservation, math gate, two approvals, atomic settlement, and shared receipt.',
      dependsOn: 'Reusable live-session and resource-exchange capabilities.',
    },
    {
      phase: '4 · Timed four-company final',
      status: 'planned',
      outcome:
        'Authoritative clock, disruptions, deliveries, score projections, audit, and final evidence.',
      dependsOn: 'Two-company retry, conflict, privacy, and reconnect checks passing.',
    },
    {
      phase: '5 · Classroom release',
      status: 'blocked',
      outcome:
        'Accessible, balanced, historically reviewed, load-tested final project competition.',
      dependsOn: 'Teacher rehearsal, content review, recovery drill, and four-company pilot.',
    },
  ],
};
