import { applyBasisPoints, sumCents } from './money';
import { deterministicSample } from './seeded-random';
import type {
  AcquisitionLot,
  EvidenceReference,
  InventoryItem,
  LedgerEntry,
  MarketDefinition,
  ReportSectionState,
  RouteDefinition,
  SimulationDecisionAction,
  SimulationDecisionConfig,
  SimulationDecisionResult,
  SimulationDecisionState,
  TradeLineInput,
  TradePreview,
  TradingSeasonResults,
} from './simulation-decision.models';

export function createSimulationState(
  config: SimulationDecisionConfig,
  seed = 20_260_902,
): SimulationDecisionState {
  const timestamp = new Date().toISOString();
  return {
    simulationId: `${config.projectId}-local-attempt-1`,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    version: 0,
    seed,
    difficulty: 'standard',
    status: 'not_started',
    lastView: 'setup',
    companyName: '',
    emblemId: config.emblems[0]?.id ?? '',
    currentLocationId: config.startingLocationId,
    currentDay: 1,
    ledger: [],
    inventory: [],
    routeHistory: [],
    eventHistory: [],
    evidence: [],
    ledgerAnnotations: {},
    marketDiscoveries: {},
    report: {
      status: 'draft',
      revisionNumber: 1,
      sections: Object.fromEntries(
        config.reportSections.map((section) => [
          section.id,
          { response: '', evidenceIds: [], calculation: '' } satisfies ReportSectionState,
        ]),
      ),
    },
    lastSavedAt: timestamp,
  };
}

export function reduceSimulationDecision(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  action: SimulationDecisionAction,
): SimulationDecisionResult {
  if (
    state.status === 'paused_by_teacher' &&
    !action.type.startsWith('teacher.') &&
    action.type !== 'view.changed' &&
    action.type !== 'simulation.restarted'
  ) {
    return failure(state, 'The trading season is paused by your teacher.');
  }
  if (
    state.status === 'submitted' &&
    !action.type.startsWith('teacher.') &&
    action.type !== 'view.changed' &&
    action.type !== 'simulation.restarted'
  ) {
    return failure(state, 'This official attempt is read-only after submission.');
  }

  switch (action.type) {
    case 'view.changed':
      return success(state, { lastView: action.view });
    case 'company.started':
      return startCompany(config, state, action);
    case 'trade.committed':
      return commitTrade(config, state, action.lines);
    case 'market.stallInspected':
      return inspectMarketStall(config, state, action.stallId);
    case 'route.committed':
      return commitRoute(config, state, action.routeId, action.rationale);
    case 'travel.advanced':
      return advanceTravel(config, state);
    case 'event.resolved':
      return resolveEvent(config, state, action.choiceId, action.reasoning, action.mathAnswer);
    case 'season.completed':
      return completeSeason(config, state);
    case 'evidence.pinned':
      return pinEvidence(state, action.reference);
    case 'evidence.unpinned':
      return success(state, {
        evidence: state.evidence.filter((item) => item.id !== action.evidenceId),
      });
    case 'ledger.annotated':
      return annotateLedger(state, action.ledgerEntryId, action.note);
    case 'report.sectionUpdated':
      return updateReportSection(config, state, action);
    case 'report.submitted':
      return submitReport(config, state);
    case 'teacher.pauseToggled':
      return togglePause(state);
    case 'teacher.eventInjected':
      return injectEvent(config, state, action.eventId);
    case 'teacher.eventSkipped':
      return skipEvent(config, state);
    case 'teacher.seedChanged':
      return changeSeed(state, action.seed);
    case 'teacher.difficultyChanged':
      return success(state, { difficulty: action.difficulty });
    case 'simulation.restarted': {
      const restarted = createSimulationState(config, state.seed);
      return {
        state: { ...restarted, difficulty: state.difficulty, version: state.version + 1 },
        errors: [],
      };
    }
  }
}

export function cashOnHand(state: Readonly<SimulationDecisionState>): number {
  return sumCents(state.ledger.map((entry) => entry.cashChangeCents));
}

export function cargoUsed(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): number {
  return state.inventory.reduce((total, item) => {
    const good = config.goods.find((definition) => definition.id === item.goodId);
    return total + item.quantity * (good?.unitCargo ?? 0);
  }, 0);
}

export function cargoCapacity(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): number {
  return (
    config.transports.find((transport) => transport.id === state.transportId)?.cargoCapacity ?? 0
  );
}

export function marketAt(
  config: SimulationDecisionConfig,
  locationId: string,
): MarketDefinition | undefined {
  return config.markets.find((market) => market.locationId === locationId);
}

export function marketPrice(
  config: SimulationDecisionConfig,
  locationId: string,
  goodId: string,
  direction: 'buy' | 'sell',
): number | undefined {
  const good = config.goods.find((item) => item.id === goodId);
  const marketGood = marketAt(config, locationId)?.goods.find((item) => item.goodId === goodId);
  if (good === undefined || marketGood === undefined) {
    return undefined;
  }
  return applyBasisPoints(
    good.baseBuyPriceCents,
    direction === 'buy' ? marketGood.buyMultiplierBps : marketGood.sellMultiplierBps,
  );
}

export function marketStockRemaining(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  locationId: string,
  goodId: string,
): number {
  const configured = marketAt(config, locationId)?.goods.find((item) => item.goodId === goodId);
  if (configured === undefined) {
    return 0;
  }
  const netPurchased = state.ledger
    .filter(
      (entry) =>
        entry.locationId === locationId &&
        entry.details?.goodId === goodId &&
        (entry.type === 'purchase' || entry.type === 'sale'),
    )
    .reduce(
      (total, entry) =>
        total + (entry.type === 'purchase' ? 1 : -1) * (entry.details?.quantity ?? 0),
      0,
    );
  return Math.max(0, configured.availableQuantity - netPurchased);
}

export function inventoryAverageCost(item: InventoryItem): number {
  const quantity = item.lots.reduce((total, lot) => total + lot.quantity, 0);
  if (quantity === 0) {
    return 0;
  }
  return Math.round(
    item.lots.reduce((total, lot) => total + lot.quantity * lot.unitCostCents, 0) / quantity,
  );
}

export function inventoryValueAtCurrentMarket(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): number {
  return state.inventory.reduce((total, item) => {
    const price = marketPrice(config, state.currentLocationId, item.goodId, 'sell') ?? 0;
    return total + price * item.quantity;
  }, 0);
}

export function previewTrade(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  lines: readonly TradeLineInput[],
): TradePreview {
  const errors: string[] = [];
  if (state.pendingEventId !== undefined || state.status === 'event_pending') {
    errors.push('Resolve the current event before trading.');
  }
  if (state.activeTravel !== undefined) {
    errors.push('Trading is unavailable while your company is traveling.');
  }
  if (state.status === 'season_complete') {
    errors.push('The completed season is read-only.');
  }
  if (lines.length === 0) {
    errors.push('Add at least one good to the trade.');
  }
  let cash = cashOnHand(state);
  let cargo = cargoUsed(config, state);
  const capacity = cargoCapacity(config, state);
  const quantities = new Map(state.inventory.map((item) => [item.goodId, item.quantity]));
  const purchased = new Map<string, number>();

  for (const line of lines) {
    const good = config.goods.find((item) => item.id === line.goodId);
    const marketGood = marketAt(config, state.currentLocationId)?.goods.find(
      (item) => item.goodId === line.goodId,
    );
    if (good === undefined || marketGood === undefined) {
      errors.push('That good is not traded at this location.');
      continue;
    }
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      errors.push(`${good.name}: enter a whole-number quantity above zero.`);
      continue;
    }
    const price = marketPrice(config, state.currentLocationId, line.goodId, line.direction) ?? 0;
    if (line.direction === 'buy') {
      const nextPurchased = (purchased.get(line.goodId) ?? 0) + line.quantity;
      purchased.set(line.goodId, nextPurchased);
      const remainingStock = marketStockRemaining(
        config,
        state,
        state.currentLocationId,
        line.goodId,
      );
      if (nextPurchased > remainingStock) {
        errors.push(`${good.name}: only ${remainingStock} units are available.`);
      }
      cash -= price * line.quantity;
      cargo += good.unitCargo * line.quantity;
      quantities.set(line.goodId, (quantities.get(line.goodId) ?? 0) + line.quantity);
    } else {
      const owned = quantities.get(line.goodId) ?? 0;
      if (line.quantity > owned) {
        errors.push(`${good.name}: you only own ${owned} units.`);
      } else {
        quantities.set(line.goodId, owned - line.quantity);
        cash += price * line.quantity;
        cargo -= good.unitCargo * line.quantity;
      }
    }
  }
  if (cash < 0) {
    errors.push('This trade costs more cash than you have available.');
  }
  if (cargo > capacity) {
    errors.push(`This trade needs ${cargo} cargo spaces, but your limit is ${capacity}.`);
  }
  return {
    valid: errors.length === 0,
    errors: [...new Set(errors)],
    cashBeforeCents: cashOnHand(state),
    cashAfterCents: cash,
    cargoBefore: cargoUsed(config, state),
    cargoAfter: cargo,
    netCashChangeCents: cash - cashOnHand(state),
  };
}

export function routeIsCompatible(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  route: RouteDefinition,
): boolean {
  const transport = config.transports.find((item) => item.id === state.transportId);
  return (
    transport !== undefined &&
    route.terrain.every((terrain) => transport.compatibleTerrain.includes(terrain))
  );
}

export function ledgerReconciles(state: Readonly<SimulationDecisionState>): boolean {
  let running = 0;
  return state.ledger.every((entry) => {
    running += entry.cashChangeCents;
    return running === entry.cashBalanceCents;
  });
}

export function reportMissingRequirements(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): string[] {
  const missing: string[] = [];
  for (const definition of config.reportSections) {
    const section = state.report.sections[definition.id];
    if ((section?.response.trim().length ?? 0) < 12) {
      missing.push(`${definition.title}: add your explanation`);
    }
    if ((section?.evidenceIds.length ?? 0) < definition.evidenceMinimum) {
      missing.push(`${definition.title}: add ${definition.evidenceMinimum} evidence item(s)`);
    }
    if (definition.calculationRequired && (section?.calculation.trim().length ?? 0) === 0) {
      missing.push(`${definition.title}: show a calculation`);
    }
  }
  return missing;
}

export function seasonResults(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): TradingSeasonResults {
  const byType = (type: LedgerEntry['type']) =>
    state.ledger
      .filter((entry) => entry.type === type)
      .reduce((sum, entry) => sum + entry.cashChangeCents, 0);
  const sales = byType('sale');
  const realizedCostBasis = state.ledger
    .filter((entry) => entry.type === 'sale')
    .reduce((total, entry) => total + (entry.details?.costBasisCents ?? 0), 0);
  const routeIds = new Set(state.routeHistory.map((entry) => entry.routeId));
  const distance = config.routes
    .filter((route) => routeIds.has(route.id))
    .reduce((total, route) => total + route.distanceMiles, 0);
  const ending = cashOnHand(state);
  const netProfit = ending - config.startingCashCents;
  const profitProgress = Math.max(
    0,
    Math.min(60, Math.round((netProfit / config.profitTargetCents) * 60)),
  );
  const evidenceProgress = Math.min(20, state.evidence.length * 4);
  const reasoningProgress = Math.min(
    20,
    state.eventHistory.filter((item) => item.reasoning.trim().length > 0).length * 5,
  );
  const score = Math.max(0, Math.min(100, profitProgress + evidenceProgress + reasoningProgress));
  return {
    startingCashCents: config.startingCashCents,
    endingCashCents: ending,
    transportCostCents: -byType('transport'),
    goodsPurchasedCents: -byType('purchase'),
    supplyCostsCents: -byType('travel'),
    eventIncomeCents: byType('eventIncome'),
    eventExpensesCents: -byType('eventExpense'),
    salesRevenueCents: sales,
    realizedCostBasisCents: realizedCostBasis,
    realizedTradeProfitCents: sales - realizedCostBasis,
    netProfitCents: netProfit,
    unsoldInventoryValueCents: inventoryValueAtCurrentMarket(config, state),
    distanceTraveled: distance,
    tradeCount: state.ledger.filter((entry) => entry.type === 'purchase' || entry.type === 'sale')
      .length,
    score,
    performanceLabel:
      score >= 80
        ? 'Strategic Trailblazer'
        : score >= 60
          ? 'Resourceful Trader'
          : score >= 40
            ? 'Growing Merchant'
            : 'Learning the Trail',
  };
}

function startCompany(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  action: Extract<SimulationDecisionAction, { type: 'company.started' }>,
): SimulationDecisionResult {
  if (state.status !== 'not_started') {
    return failure(state, 'This company has already started its season.');
  }
  const transport = config.transports.find((item) => item.id === action.transportId);
  if (transport === undefined) {
    return failure(state, 'Choose an available transportation option.');
  }
  if (action.companyName.trim().length < 2) {
    return failure(state, 'Enter a company name with at least two letters.');
  }
  if (!config.emblems.some((emblem) => emblem.id === action.emblemId)) {
    return failure(state, 'Choose an available company emblem.');
  }
  if (transport.costCents > config.startingCashCents) {
    return failure(state, 'That transportation option costs more than the starting budget.');
  }
  const timestamp = new Date().toISOString();
  const capital: LedgerEntry = {
    id: 'ledger-starting-capital',
    day: 1,
    locationId: config.startingLocationId,
    type: 'startingCapital',
    description: 'Starting company capital',
    cashChangeCents: config.startingCashCents,
    cashBalanceCents: config.startingCashCents,
    cargoDelta: 0,
    createdAt: timestamp,
  };
  const purchase: LedgerEntry = {
    id: 'ledger-transport-purchase',
    day: 1,
    locationId: config.startingLocationId,
    type: 'transport',
    description: `Purchased ${transport.name}`,
    cashChangeCents: -transport.costCents,
    cashBalanceCents: config.startingCashCents - transport.costCents,
    cargoDelta: 0,
    createdAt: timestamp,
  };
  return success(state, {
    status: 'planning',
    companyName: action.companyName.trim(),
    emblemId: action.emblemId,
    transportId: transport.id,
    ledger: [capital, purchase],
  });
}

function commitTrade(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  lines: readonly TradeLineInput[],
): SimulationDecisionResult {
  const preview = previewTrade(config, state, lines);
  if (!preview.valid) {
    return { state: state as SimulationDecisionState, errors: preview.errors };
  }
  let inventory = [...state.inventory];
  let ledger = [...state.ledger];
  for (const line of lines) {
    const good = config.goods.find((item) => item.id === line.goodId);
    const unitPrice = marketPrice(config, state.currentLocationId, line.goodId, line.direction);
    if (good === undefined || unitPrice === undefined) {
      return failure(state, 'A trade item is no longer available at this market.');
    }
    const entryId = `ledger-${state.version + 1}-${ledger.length + 1}`;
    let costBasisCents: number | undefined;
    if (line.direction === 'buy') {
      const existing = inventory.find((item) => item.goodId === line.goodId);
      const lot: AcquisitionLot = {
        ledgerEntryId: entryId,
        locationId: state.currentLocationId,
        day: state.currentDay,
        quantity: line.quantity,
        unitCostCents: unitPrice,
      };
      inventory =
        existing === undefined
          ? [...inventory, { goodId: line.goodId, quantity: line.quantity, lots: [lot] }]
          : inventory.map((item) =>
              item.goodId === line.goodId
                ? { ...item, quantity: item.quantity + line.quantity, lots: [...item.lots, lot] }
                : item,
            );
    } else {
      const sold = removeInventory(inventory, line.goodId, line.quantity);
      inventory = sold.inventory;
      costBasisCents = sold.costBasisCents;
    }
    const cashChange = unitPrice * line.quantity * (line.direction === 'buy' ? -1 : 1);
    const cargoDelta = good.unitCargo * line.quantity * (line.direction === 'buy' ? 1 : -1);
    ledger = appendLedger(ledger, {
      id: entryId,
      day: state.currentDay,
      locationId: state.currentLocationId,
      type: line.direction === 'buy' ? 'purchase' : 'sale',
      description: `${line.direction === 'buy' ? 'Bought' : 'Sold'} ${line.quantity} ${good.name}`,
      cashChangeCents: cashChange,
      cargoDelta,
      details: {
        goodId: good.id,
        quantity: line.quantity,
        unitPriceCents: unitPrice,
        costBasisCents,
      },
      createdAt: new Date().toISOString(),
    });
  }
  return success(state, {
    inventory,
    ledger,
    status: state.status === 'planning' ? 'active' : state.status,
  });
}

function inspectMarketStall(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  stallId: string,
): SimulationDecisionResult {
  const scene = config.world.locations.find(
    (location) => location.locationId === state.currentLocationId,
  );
  const stall = scene?.stalls.find((item) => item.id === stallId);
  if (stall === undefined) {
    return failure(state, 'That market stop is not available at this location.');
  }
  const current = state.marketDiscoveries[state.currentLocationId] ?? [];
  if (current.includes(stall.id)) {
    return success(state, {});
  }
  const evidenceId = `evidence-market-${state.currentLocationId}-${stall.id}`;
  const evidence = state.evidence.some((item) => item.id === evidenceId)
    ? state.evidence
    : [
        ...state.evidence,
        {
          id: evidenceId,
          sourceType: 'notebook' as const,
          sourceId: stall.id,
          title: `${stall.name} intelligence · Day ${state.currentDay}`,
          summary: `${stall.merchantName}: ${stall.rumor} Reliability cue: ${stall.trustCue}`,
          pinnedAt: new Date().toISOString(),
        },
      ];
  return success(state, {
    marketDiscoveries: {
      ...state.marketDiscoveries,
      [state.currentLocationId]: [...current, stall.id],
    },
    evidence,
  });
}

function commitRoute(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  routeId: string,
  rationale: string,
): SimulationDecisionResult {
  if (state.pendingEventId !== undefined || state.activeTravel !== undefined) {
    return failure(state, 'Finish the current journey before choosing another route.');
  }
  if (rationale.trim().length < 12) {
    return failure(state, 'Explain your route choice with at least one complete reason.');
  }
  const route = config.routes.find((item) => item.id === routeId);
  if (route === undefined || route.fromLocationId !== state.currentLocationId) {
    return failure(state, 'Choose a route that begins at your current location.');
  }
  if (!routeIsCompatible(config, state, route)) {
    return failure(state, 'Your transportation is not compatible with this route terrain.');
  }
  if (cashOnHand(state) < route.supplyCostCents) {
    return failure(state, 'You do not have enough cash for route supplies.');
  }
  const eventCount = Math.min(2, Math.max(1, route.estimatedDays - 1));
  const eventIds = deterministicSample(
    config.events,
    state.seed + state.routeHistory.length * 97,
    eventCount,
  ).map((event) => event.id);
  const historyId = `route-choice-${state.routeHistory.length + 1}`;
  const ledger = appendLedger(state.ledger, {
    id: `ledger-route-${state.routeHistory.length + 1}`,
    day: state.currentDay,
    locationId: state.currentLocationId,
    type: 'travel',
    description: `Purchased supplies for ${route.name}`,
    cashChangeCents: -route.supplyCostCents,
    cargoDelta: 0,
    createdAt: new Date().toISOString(),
  });
  return success(state, {
    status: 'active',
    ledger,
    routeHistory: [
      ...state.routeHistory,
      {
        id: historyId,
        routeId: route.id,
        dayStarted: state.currentDay,
        rationale: rationale.trim(),
        knownInfoSnapshot: structuredClone(route),
        eventIdsTriggered: eventIds,
      },
    ],
    activeTravel: { routeId: route.id, progressDays: 0, eventIds, resolvedEventIds: [] },
  });
}

function advanceTravel(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): SimulationDecisionResult {
  if (state.pendingEventId !== undefined) {
    return failure(state, 'Resolve the pending event before continuing travel.');
  }
  const travel = state.activeTravel;
  const route = config.routes.find((item) => item.id === travel?.routeId);
  if (travel === undefined || route === undefined) {
    return failure(state, 'Choose and commit a route before advancing travel.');
  }
  const progressDays = travel.progressDays + 1;
  const eventId = travel.eventIds[progressDays - 1];
  const next: SimulationDecisionState = {
    ...state,
    currentDay: state.currentDay + 1,
    activeTravel: { ...travel, progressDays },
  };
  if (eventId !== undefined && !travel.resolvedEventIds.includes(eventId)) {
    return success(state, { ...next, status: 'event_pending', pendingEventId: eventId });
  }
  return progressDays >= route.estimatedDays
    ? arrive(config, state, next, route)
    : success(state, next);
}

function resolveEvent(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  choiceId: string,
  reasoning: string,
  mathAnswer?: number,
): SimulationDecisionResult {
  const event = config.events.find((item) => item.id === state.pendingEventId);
  const choice = event?.choices.find((item) => item.id === choiceId);
  if (event === undefined || choice === undefined) {
    return failure(state, 'Select an available event choice.');
  }
  if (reasoning.trim().length < 12) {
    return failure(state, 'Explain why this event choice fits your strategy.');
  }
  if (cashOnHand(state) + choice.cashChangeCents < 0) {
    return failure(state, 'You do not have enough cash for that choice.');
  }
  const cashBefore = cashOnHand(state);
  const cargoBefore = cargoUsed(config, state);
  let inventory = [...state.inventory];
  if ((choice.inventoryLossQuantity ?? 0) > 0) {
    const target = inventory.find((item) => item.quantity > 0);
    if (target !== undefined) {
      inventory = removeInventory(
        inventory,
        target.goodId,
        Math.min(target.quantity, choice.inventoryLossQuantity ?? 0),
      ).inventory;
    }
  }
  let ledger = [...state.ledger];
  if (choice.cashChangeCents !== 0) {
    ledger = appendLedger(ledger, {
      id: `ledger-event-${state.eventHistory.length + 1}`,
      day: state.currentDay,
      locationId: state.currentLocationId,
      type: choice.cashChangeCents > 0 ? 'eventIncome' : 'eventExpense',
      description: `${event.title}: ${choice.label}`,
      cashChangeCents: choice.cashChangeCents,
      cargoDelta: 0,
      createdAt: new Date().toISOString(),
    });
  }
  const travel = state.activeTravel;
  const next: SimulationDecisionState = {
    ...state,
    ledger,
    inventory,
    currentDay: state.currentDay + choice.dayChange,
    pendingEventId: undefined,
    status: 'active',
    activeTravel:
      travel === undefined
        ? undefined
        : { ...travel, resolvedEventIds: [...travel.resolvedEventIds, event.id] },
    eventHistory: [
      ...state.eventHistory,
      {
        id: `event-decision-${state.eventHistory.length + 1}`,
        eventId: event.id,
        routeId: travel?.routeId,
        locationId: state.currentLocationId,
        day: state.currentDay,
        choiceId: choice.id,
        reasoning: reasoning.trim(),
        mathAnswer,
        mathCorrect:
          event.mathChallenge === undefined ? undefined : mathAnswer === event.mathChallenge.answer,
        cashBeforeCents: cashBefore,
        cashAfterCents: cashBefore + choice.cashChangeCents,
        cargoBefore,
        cargoAfter: cargoUsed(config, { ...state, inventory }),
        outcome: choice.outcome,
      },
    ],
  };
  const route = config.routes.find((item) => item.id === travel?.routeId);
  return route !== undefined && (travel?.progressDays ?? 0) >= route.estimatedDays
    ? arrive(config, state, next, route)
    : success(state, next);
}

function completeSeason(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): SimulationDecisionResult {
  if (state.activeTravel !== undefined || state.pendingEventId !== undefined) {
    return failure(state, 'Finish the current journey before closing the season.');
  }
  if (state.routeHistory.every((route) => route.dayArrived === undefined)) {
    return failure(state, 'Complete at least one route before closing the season.');
  }
  const completedAt = new Date().toISOString();
  const next = success(state, { status: 'season_complete', completedAt });
  const results = seasonResults(config, next.state);
  return pinEvidence(next.state, {
    id: 'evidence-season-results',
    sourceType: 'result',
    sourceId: 'season-results',
    title: 'Trading Season Results',
    summary: `Ending cash ${results.endingCashCents}; net profit ${results.netProfitCents}; score ${results.score}`,
  });
}

function pinEvidence(
  state: Readonly<SimulationDecisionState>,
  reference: Omit<EvidenceReference, 'pinnedAt'>,
): SimulationDecisionResult {
  if (state.evidence.some((item) => item.id === reference.id)) {
    return { state: state as SimulationDecisionState, errors: [] };
  }
  return success(state, {
    evidence: [...state.evidence, { ...reference, pinnedAt: new Date().toISOString() }],
  });
}

function annotateLedger(
  state: Readonly<SimulationDecisionState>,
  ledgerEntryId: string,
  note: string,
): SimulationDecisionResult {
  if (!state.ledger.some((entry) => entry.id === ledgerEntryId)) {
    return failure(state, 'That ledger entry could not be found.');
  }
  return success(state, {
    ledgerAnnotations: { ...state.ledgerAnnotations, [ledgerEntryId]: note.trim() },
  });
}

function updateReportSection(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  action: Extract<SimulationDecisionAction, { type: 'report.sectionUpdated' }>,
): SimulationDecisionResult {
  if (!config.reportSections.some((section) => section.id === action.sectionId)) {
    return failure(state, 'That report section is not part of this project.');
  }
  const validEvidenceIds = action.evidenceIds.filter((id) =>
    state.evidence.some((item) => item.id === id),
  );
  const sections = {
    ...state.report.sections,
    [action.sectionId]: {
      response: action.response,
      evidenceIds: [...new Set(validEvidenceIds)],
      calculation: action.calculation,
    },
  };
  const preview = { ...state, report: { ...state.report, sections } };
  const ready = reportMissingRequirements(config, preview).length === 0;
  return success(state, {
    report: { ...state.report, sections, status: ready ? 'ready_to_submit' : 'draft' },
  });
}

function submitReport(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): SimulationDecisionResult {
  if (state.status !== 'season_complete' && state.status !== 'needs_revision') {
    return failure(state, 'Complete the trading season before submitting the strategy report.');
  }
  const missing = reportMissingRequirements(config, state);
  if (missing.length > 0) {
    return { state: state as SimulationDecisionState, errors: missing };
  }
  return success(state, {
    status: 'submitted',
    report: { ...state.report, status: 'submitted', submittedAt: new Date().toISOString() },
  });
}

function togglePause(state: Readonly<SimulationDecisionState>): SimulationDecisionResult {
  return state.status === 'paused_by_teacher'
    ? success(state, { status: state.pausedFromStatus ?? 'active', pausedFromStatus: undefined })
    : success(state, { status: 'paused_by_teacher', pausedFromStatus: state.status });
}

function injectEvent(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  eventId: string,
): SimulationDecisionResult {
  if (!config.events.some((event) => event.id === eventId)) {
    return failure(state, 'Choose an event from the configured event pool.');
  }
  const effectiveStatus =
    state.status === 'paused_by_teacher' ? state.pausedFromStatus : state.status;
  if (
    state.pendingEventId !== undefined ||
    effectiveStatus === 'not_started' ||
    effectiveStatus === 'season_complete' ||
    effectiveStatus === 'submitted'
  ) {
    return failure(state, 'An event cannot be injected in the current state.');
  }
  return success(state, { pendingEventId: eventId, status: 'event_pending' });
}

function skipEvent(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): SimulationDecisionResult {
  const event = config.events.find((item) => item.id === state.pendingEventId);
  if (event === undefined) {
    return failure(state, 'There is no pending event to skip.');
  }
  const travel = state.activeTravel;
  const next: SimulationDecisionState = {
    ...state,
    pendingEventId: undefined,
    status: 'active',
    activeTravel:
      travel === undefined
        ? undefined
        : { ...travel, resolvedEventIds: [...travel.resolvedEventIds, event.id] },
    eventHistory: [
      ...state.eventHistory,
      {
        id: `event-decision-${state.eventHistory.length + 1}`,
        eventId: event.id,
        routeId: travel?.routeId,
        locationId: state.currentLocationId,
        day: state.currentDay,
        choiceId: 'teacher-skip',
        reasoning: 'Skipped by teacher control',
        cashBeforeCents: cashOnHand(state),
        cashAfterCents: cashOnHand(state),
        cargoBefore: cargoUsed(config, state),
        cargoAfter: cargoUsed(config, state),
        outcome: 'The teacher skipped this event; no simulation values changed.',
      },
    ],
  };
  const route = config.routes.find((item) => item.id === travel?.routeId);
  return route !== undefined && (travel?.progressDays ?? 0) >= route.estimatedDays
    ? arrive(config, state, next, route)
    : success(state, next);
}

function changeSeed(
  state: Readonly<SimulationDecisionState>,
  seed: number,
): SimulationDecisionResult {
  if (!Number.isInteger(seed) || seed <= 0) {
    return failure(state, 'Scenario seed must be a positive whole number.');
  }
  if (state.routeHistory.length > 0) {
    return failure(state, 'Restart the attempt before changing a seed already used for travel.');
  }
  return success(state, { seed });
}

function arrive(
  config: SimulationDecisionConfig,
  original: Readonly<SimulationDecisionState>,
  next: SimulationDecisionState,
  route: RouteDefinition,
): SimulationDecisionResult {
  return success(original, {
    ...next,
    currentLocationId: route.toLocationId,
    activeTravel: undefined,
    status: 'active',
    routeHistory: next.routeHistory.map((entry) =>
      entry.routeId === route.id && entry.dayArrived === undefined
        ? { ...entry, dayArrived: next.currentDay }
        : entry,
    ),
  });
}

function appendLedger(
  ledger: readonly LedgerEntry[],
  entry: Omit<LedgerEntry, 'cashBalanceCents'>,
): LedgerEntry[] {
  const priorBalance = ledger.at(-1)?.cashBalanceCents ?? 0;
  return [...ledger, { ...entry, cashBalanceCents: priorBalance + entry.cashChangeCents }];
}

function removeInventory(
  inventory: readonly InventoryItem[],
  goodId: string,
  quantity: number,
): { inventory: InventoryItem[]; costBasisCents: number } {
  const current = inventory.find((item) => item.goodId === goodId);
  if (current === undefined) {
    return { inventory: [...inventory], costBasisCents: 0 };
  }
  let remaining = quantity;
  let costBasisCents = 0;
  const lots: AcquisitionLot[] = [];
  for (const lot of current.lots) {
    const removed = Math.min(remaining, lot.quantity);
    remaining -= removed;
    costBasisCents += removed * lot.unitCostCents;
    if (removed < lot.quantity) {
      lots.push({ ...lot, quantity: lot.quantity - removed });
    }
  }
  const nextQuantity = current.quantity - quantity;
  return {
    inventory:
      nextQuantity === 0
        ? inventory.filter((item) => item.goodId !== goodId)
        : inventory.map((item) =>
            item.goodId === goodId ? { ...item, quantity: nextQuantity, lots } : item,
          ),
    costBasisCents,
  };
}

function success(
  state: Readonly<SimulationDecisionState>,
  changes: Partial<SimulationDecisionState>,
): SimulationDecisionResult {
  return {
    state: {
      ...state,
      ...changes,
      version: state.version + 1,
      lastSavedAt: new Date().toISOString(),
    },
    errors: [],
  };
}

function failure(
  state: Readonly<SimulationDecisionState>,
  message: string,
): SimulationDecisionResult {
  return { state: state as SimulationDecisionState, errors: [message] };
}
