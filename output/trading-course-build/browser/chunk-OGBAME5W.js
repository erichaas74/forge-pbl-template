import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/simulation-decision/domain/choice-progression.ts
function choiceProgression(config, state) {
  const configuredStages = config.choiceProgression?.stages ?? [];
  const stages = configuredStages.length > 0 ? configuredStages : [fallbackStage(config)];
  const metrics = progressionMetrics(state);
  let currentStageIndex = 0;
  for (let index = 1; index < stages.length; index += 1) {
    if (!requirementsMet(stages[index]?.requirements, metrics)) break;
    currentStageIndex = index;
  }
  const currentStage = stages[currentStageIndex];
  const nextStage = stages[currentStageIndex + 1];
  return {
    enabled: configuredStages.length > 0,
    currentStage,
    currentStageIndex,
    stageCount: stages.length,
    nextStage,
    nextRequirements: requirementProgress(nextStage?.requirements, metrics)
  };
}
function goodIsUnlocked(config, state, goodId) {
  return choiceProgression(config, state).currentStage.availableGoodIds.includes(goodId);
}
function routeIsUnlocked(config, state, routeId) {
  return choiceProgression(config, state).currentStage.availableRouteIds.includes(routeId);
}
function progressionMetrics(state) {
  const discoveredStalls = Object.entries(state.marketDiscoveries).reduce(
    (total, [, stallIds]) => total + new Set(stallIds).size,
    0
  );
  return {
    discoveredStalls,
    purchasedGoodTypes: new Set(
      state.ledger.filter((entry) => entry.type === "purchase").map((entry) => entry.details?.goodId).filter((goodId) => goodId !== void 0)
    ).size
  };
}
function requirementsMet(requirements, metrics) {
  return requirementProgress(requirements, metrics).every((metric) => metric.complete);
}
function requirementProgress(requirements, metrics) {
  const result = [];
  if ((requirements?.minimumDiscoveredStalls ?? 0) > 0) {
    const target = requirements.minimumDiscoveredStalls;
    result.push({
      key: "minimumDiscoveredStalls",
      label: "Explore market stalls",
      current: Math.min(metrics.discoveredStalls, target),
      target,
      complete: metrics.discoveredStalls >= target
    });
  }
  if ((requirements?.minimumPurchasedGoodTypes ?? 0) > 0) {
    const target = requirements.minimumPurchasedGoodTypes;
    result.push({
      key: "minimumPurchasedGoodTypes",
      label: "Load different supplies",
      current: Math.min(metrics.purchasedGoodTypes, target),
      target,
      complete: metrics.purchasedGoodTypes >= target
    });
  }
  return result;
}
function fallbackStage(config) {
  return {
    id: "all-choices",
    title: "All choices available",
    description: "Every configured supply and route is available.",
    availableGoodIds: config.goods.map((good) => good.id),
    availableRouteIds: config.routes.map((route) => route.id)
  };
}

// src/app/templates/simulation-decision/domain/money.ts
function formatMoney(cents, showPlus = false) {
  const prefix = cents < 0 ? "-" : showPlus && cents > 0 ? "+" : "";
  const absolute = Math.abs(cents);
  return `${prefix}$${(absolute / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
function applyBasisPoints(cents, basisPoints) {
  return Math.round(cents * basisPoints / 1e4);
}
function sumCents(values) {
  return values.reduce((total, value) => total + value, 0);
}

// src/app/templates/simulation-decision/domain/expedition-course.engine.ts
function createExpedition(config, cycle) {
  return {
    revision: 0,
    cashCents: cycle.budgetCents,
    locationId: config.startingLocationId,
    day: 1,
    inventory: {},
    receipts: [],
    visited: [config.startingLocationId],
    completedRoutes: [],
    resolvedHazards: [],
    returned: false,
    bins: {},
    balanced: false,
    reflection: "",
    feedback: "Visit the shops, load your wagon, then select a road."
  };
}
function receiptBin(receipt) {
  return receipt.cashDeltaCents > 0 ? "income" : receipt.cashDeltaCents < 0 ? "expense" : "noncash";
}
function expeditionTotals(cycle, state) {
  const income = state.receipts.reduce((n, r) => n + Math.max(0, r.cashDeltaCents), 0);
  const expenses = state.receipts.reduce((n, r) => n - Math.min(0, r.cashDeltaCents), 0);
  const stock = Object.values(state.inventory).reduce((n, item) => n + item.costCents, 0);
  const filedCash = cycle.budgetCents + state.receipts.reduce((n, r) => n + (state.bins[r.id] === "income" ? r.amountCents : state.bins[r.id] === "expense" ? -r.amountCents : 0), 0);
  return {
    income,
    expenses,
    stock,
    profit: state.cashCents + stock - cycle.budgetCents,
    filedCash,
    difference: filedCash - state.cashCents
  };
}
function expeditionPrice(config, state, goodId, direction) {
  const good = config.goods.find((g) => g.id === goodId);
  const price = config.markets.find((m) => m.locationId === state.locationId)?.goods.find((g) => g.goodId === goodId);
  return good && price ? applyBasisPoints(good.baseBuyPriceCents, direction === "buy" ? price.buyMultiplierBps : price.sellMultiplierBps) : 0;
}
function expeditionCargo(config, state) {
  return Object.entries(state.inventory).reduce((n, [id, item]) => n + item.quantity * (config.goods.find((good) => good.id === id)?.unitCargo ?? 0), 0);
}
function reduceExpedition(config, cycle, state, action) {
  const fail = (error) => ({ state, error });
  const update = (patch) => ({ state: __spreadProps(__spreadValues(__spreadValues({}, state), patch), { revision: state.revision + 1 }) });
  const receipt = (kind, label, delta, amount = Math.abs(delta)) => ({ id: `${cycle.id}-${state.receipts.length + 1}`, day: state.day, kind, label, cashDeltaCents: delta, amountCents: amount });
  if (action.type === "reflect") return update({ reflection: action.text.slice(0, 5e3) });
  if (action.type === "file") {
    if (!state.receipts.some((r) => r.id === action.receiptId)) return fail("Choose a receipt first.");
    return update({ bins: __spreadProps(__spreadValues({}, state.bins), { [action.receiptId]: action.bin }), balanced: false, feedback: "Receipt filed. Compare the reconstructed cash with the cash box." });
  }
  if (action.type === "balance") {
    if (!state.returned) return fail("Complete the out-and-back journey before closing its books.");
    const wrong = state.receipts.filter((r) => state.bins[r.id] !== receiptBin(r));
    if (wrong.length) return fail(`${wrong.length} receipt${wrong.length === 1 ? "" : "s"} still need the correct column. Purchases and travel spend cash; cargo damage changes stock.`);
    if (expeditionTotals(cycle, state).difference !== 0) return fail("The reconstructed cash does not match the cash box.");
    return update({ balanced: true, feedback: "Books balanced. Opening cash + money in \u2212 money out = closing cash." });
  }
  if (state.pendingHazardId && action.type !== "resolve") return fail("Choose how to handle the trail hazard first.");
  if (action.type === "trade") {
    if (state.travel) return fail("Arrive at a town before trading.");
    if (!Number.isSafeInteger(action.quantity) || action.quantity < 1 || action.quantity > 99) return fail("Choose 1\u201399 units.");
    if (!cycle.goodIds.includes(action.goodId)) return fail("That good is not part of this expedition.");
    const good = config.goods.find((g) => g.id === action.goodId);
    const each = expeditionPrice(config, state, good.id, action.direction);
    if (each <= 0) return fail("This market does not trade that good.");
    const old = state.inventory[good.id] ?? { quantity: 0, costCents: 0 };
    const total = each * action.quantity;
    if (action.direction === "buy" && state.returned) return fail("This journey has returned. Sell remaining cargo and close its ledger.");
    if (action.direction === "buy" && total > state.cashCents) return fail("The purchase exceeds your cash. Reduce the load.");
    if (action.direction === "buy" && expeditionCargo(config, state) + action.quantity * good.unitCargo > cycle.capacity) return fail("The wagon is full. Reduce the load.");
    if (action.direction === "sell" && action.quantity > old.quantity) return fail("There are not that many units in your wagon.");
    const buying = action.direction === "buy";
    const quantity = old.quantity + (buying ? action.quantity : -action.quantity);
    const costCents = buying ? old.costCents + total : old.costCents - Math.round(old.costCents * action.quantity / old.quantity);
    const delta = buying ? -total : total;
    return update({
      cashCents: state.cashCents + delta,
      inventory: __spreadProps(__spreadValues({}, state.inventory), { [good.id]: { quantity, costCents } }),
      balanced: false,
      receipts: [...state.receipts, receipt(buying ? "purchase" : "sale", `${buying ? "Bought" : "Sold"} ${action.quantity} ${good.name}`, delta)],
      feedback: `${action.quantity} ${good.name} ${buying ? "loaded into" : "sold from"} your wagon.`
    });
  }
  if (action.type === "depart") {
    if (state.travel || state.returned) return fail("This wagon is already travelling or has finished its journey.");
    const leg = cycle.legs.find((l) => l.routeId === action.routeId);
    const road = config.routes.find((r) => r.id === action.routeId);
    if (!leg || !road || road.fromLocationId !== state.locationId) return fail("Choose a road from your current town.");
    if (state.cashCents < leg.costCents) return fail("Keep enough cash for this road. Sell cargo at the local shop.");
    return update({
      cashCents: state.cashCents - leg.costCents,
      travel: { routeId: road.id, elapsed: 0, days: leg.days },
      balanced: false,
      receipts: [...state.receipts, receipt("travel", road.name, -leg.costCents)],
      feedback: `On the road. ${leg.days} travel days ahead.`
    });
  }
  if (action.type === "advance") {
    const travel = state.travel;
    if (!travel) return fail("Select a road before advancing a day.");
    const elapsed = travel.elapsed + 1;
    const hazard = cycle.hazards.find((h) => !state.resolvedHazards.includes(h.id) && h.afterLeg === state.completedRoutes.length && h.day === elapsed);
    if (hazard) return update({ day: state.day + 1, travel: __spreadProps(__spreadValues({}, travel), { elapsed }), pendingHazardId: hazard.id, feedback: hazard.title });
    return update(arriveOrContinue(config, cycle, state, __spreadProps(__spreadValues({}, travel), { elapsed }), state.day + 1));
  }
  if (action.type === "resolve") {
    const hazard = cycle.hazards.find((h) => h.id === state.pendingHazardId);
    const choice = hazard?.choices.find((c) => c.id === action.choiceId);
    if (!hazard || !choice || !state.travel) return fail("Choose an available trail response.");
    if (choice.costCents > state.cashCents) return fail("That response costs more cash than you have.");
    let inventory = __spreadValues({}, state.inventory);
    let remaining = choice.lossUnits;
    let lostValue = 0;
    for (const id of cycle.goodIds) {
      const item = inventory[id];
      if (!item || remaining === 0 || !item.quantity) continue;
      const lost = Math.min(remaining, item.quantity);
      const value = Math.round(item.costCents * lost / item.quantity);
      inventory[id] = { quantity: item.quantity - lost, costCents: item.costCents - value };
      remaining -= lost;
      lostValue += value;
    }
    const cashReceipt = receipt("risk", `${hazard.title}: ${choice.label}`, -choice.costCents);
    const receipts = [...state.receipts, ...choice.costCents ? [cashReceipt] : []];
    if (lostValue) receipts.push(__spreadProps(__spreadValues({}, receipt("loss", `${hazard.title}: cargo lost`, 0, lostValue)), { id: `${cycle.id}-${receipts.length + 1}` }));
    const travel = __spreadProps(__spreadValues({}, state.travel), { days: state.travel.days + choice.delayDays });
    return update(__spreadProps(__spreadValues({}, arriveOrContinue(config, cycle, state, travel, state.day)), {
      inventory,
      cashCents: state.cashCents - choice.costCents,
      receipts,
      pendingHazardId: void 0,
      resolvedHazards: [...state.resolvedHazards, hazard.id],
      feedback: `${choice.label}. ${choice.delayDays} extra day(s); ${choice.lossUnits - remaining} cargo unit(s) lost. Receipt added.`
    }));
  }
  return fail("Unknown expedition action.");
}
function arriveOrContinue(config, cycle, state, travel, day) {
  if (travel.elapsed < travel.days) return { day, travel, feedback: `Travel day ${travel.elapsed} of ${travel.days}.` };
  const route = config.routes.find((r) => r.id === travel.routeId);
  const visited = [.../* @__PURE__ */ new Set([...state.visited, route.toLocationId])];
  const returned = route.toLocationId === config.startingLocationId && cycle.requiredLocationIds.every((id) => visited.includes(id));
  return {
    day,
    travel: void 0,
    locationId: route.toLocationId,
    visited,
    completedRoutes: [...state.completedRoutes, route.id],
    returned,
    feedback: returned ? "Home again. Sell any remaining cargo, then balance the journey ledger." : `Arrived at ${config.locations.find((l) => l.id === route.toLocationId)?.shortName}. Shops are open.`
  };
}

// src/app/templates/simulation-decision/domain/seeded-random.ts
function seededSequence(seed, count) {
  let state = normalizeSeed(seed);
  const values = [];
  for (let index = 0; index < count; index += 1) {
    state = Math.imul(state, 1664525) + 1013904223 >>> 0;
    values.push(state / 4294967296);
  }
  return values;
}
function deterministicSample(items, seed, count) {
  const available = [...items];
  const random = seededSequence(seed, Math.min(count, available.length));
  const selected = [];
  for (const value of random) {
    const index = Math.floor(value * available.length);
    const [item] = available.splice(index, 1);
    if (item !== void 0) {
      selected.push(item);
    }
  }
  return selected;
}
function normalizeSeed(seed) {
  return Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) || 1 : 1;
}

// src/app/templates/simulation-decision/domain/trade-world.engine.ts
function initialTradeWorld(definition) {
  return {
    tick: 0,
    paused: false,
    effects: [],
    history: [],
    deliveredStock: {},
    shipments: definition.shipments.map((shipment) => ({
      id: shipment.id,
      routeId: shipment.routeId,
      direction: "outbound",
      progressTicks: -shipment.startOffset,
      deliveries: 0
    }))
  };
}
function advanceTradeWorld(config, previous, expectedTick, seed) {
  const definition = config.tradeWorld;
  if (!definition || previous.paused || expectedTick !== previous.tick) return previous;
  const tick = previous.tick + 1;
  const effects = previous.effects.filter((effect) => effect.expiresTick > tick);
  const added = [];
  const deliveredStock = __spreadValues({}, previous.deliveredStock);
  if ((tick - 1) % definition.eventEveryTicks === 0) {
    const cycle = Math.floor((tick - 1) / definition.eventEveryTicks);
    const order = deterministicSample(definition.events, seed, definition.events.length);
    const event = order[cycle % order.length];
    if (event)
      added.push(__spreadProps(__spreadValues({}, event), {
        id: `world-event-${tick}`,
        sourceId: event.id,
        startedTick: tick,
        expiresTick: tick + event.durationTicks
      }));
  }
  const shipments = previous.shipments.map((shipment) => {
    const spec = definition.shipments.find((item) => item.id === shipment.id);
    const route = config.routes.find((item) => item.id === shipment.routeId);
    if (!spec || !route) return shipment;
    const progressTicks = shipment.progressTicks + 1;
    if (progressTicks < spec.travelTicks) return __spreadProps(__spreadValues({}, shipment), { progressTicks });
    const destination = shipment.direction === "outbound" ? route.toLocationId : route.fromLocationId;
    const stock = __spreadValues({}, deliveredStock[destination]);
    for (const goodId of spec.goodIds) stock[goodId] = (stock[goodId] ?? 0) + spec.quantity;
    deliveredStock[destination] = stock;
    const deliveries = shipment.deliveries + 1;
    added.push({
      id: `shipment-${shipment.id}-${deliveries}`,
      sourceId: shipment.id,
      kind: "shipment",
      title: `${spec.name} arrived`,
      description: `${spec.quantity} units of each listed good delivered. Extra supply lowers prices temporarily.`,
      locationIds: [destination],
      goodIds: spec.goodIds,
      priceChangeBps: -spec.priceDropBps,
      startedTick: tick,
      expiresTick: tick + spec.reliefTicks
    });
    return __spreadProps(__spreadValues({}, shipment), {
      progressTicks: 0,
      deliveries,
      direction: shipment.direction === "outbound" ? "return" : "outbound"
    });
  });
  return __spreadProps(__spreadValues({}, previous), {
    tick,
    shipments,
    deliveredStock,
    effects: [...effects, ...added],
    history: [...previous.history, ...added].slice(-30)
  });
}
function tradeWorldPriceBps(world, locationId, goodId) {
  const change = (world?.effects ?? []).filter((effect) => effect.locationIds.includes(locationId) && effect.goodIds.includes(goodId)).reduce((sum, effect) => sum + effect.priceChangeBps, 0);
  return Math.max(5e3, Math.min(2e4, 1e4 + change));
}

// src/app/templates/simulation-decision/domain/simulation-decision.engine.ts
function createSimulationState(config, seed = 20260902, runtimeScope) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return __spreadProps(__spreadValues({
    simulationId: `${config.projectId}-local-attempt-1`,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    runtimeScope,
    version: 0,
    seed,
    difficulty: "standard",
    status: "not_started",
    lastView: "setup",
    companyName: "",
    emblemId: config.emblems[0]?.id ?? "",
    currentLocationId: config.startingLocationId,
    currentDay: 1
  }, config.tradeWorld ? { tradeWorld: initialTradeWorld(config.tradeWorld) } : {}), {
    ledger: [],
    inventory: [],
    routeHistory: [],
    eventHistory: [],
    evidence: [],
    ledgerAnnotations: {},
    marketDiscoveries: {},
    report: {
      status: "draft",
      revisionNumber: 1,
      sections: Object.fromEntries(
        config.reportSections.map((section) => [
          section.id,
          { response: "", evidenceIds: [], calculation: "" }
        ])
      )
    },
    lastSavedAt: timestamp
  });
}
function reduceSimulationDecision(config, state, action) {
  if (state.status === "paused_by_teacher" && !action.type.startsWith("teacher.") && action.type !== "view.changed" && action.type !== "simulation.restarted") {
    return failure(state, "The trading season is paused by your teacher.");
  }
  if (state.status === "submitted" && !action.type.startsWith("teacher.") && action.type !== "view.changed" && action.type !== "simulation.restarted") {
    return failure(state, "This official attempt is read-only after submission.");
  }
  switch (action.type) {
    case "expedition.action": {
      const cycle = config.expeditionCourse?.cycles.find((c) => c.id === action.cycleId);
      if (!cycle) return failure(state, "EXPEDITION_NOT_CONFIGURED");
      const before = state.expeditions?.[cycle.id] ?? createExpedition(config, cycle);
      if (action.expectedRevision !== before.revision) return failure(state, "STATE_CONFLICT: This expedition action was already applied or is stale.");
      const result = reduceExpedition(config, cycle, before, action.action);
      return result.error ? failure(state, result.error) : success(state, {
        expeditions: __spreadProps(__spreadValues({}, state.expeditions), { [cycle.id]: result.state })
      });
    }
    case "world.pulsed": {
      if (!config.tradeWorld || config.tradeWorld.timing === "turn-based" || !["planning", "active"].includes(state.status) || state.pendingEventId)
        return { state, errors: [] };
      const before = state.tradeWorld ?? initialTradeWorld(config.tradeWorld);
      const next = advanceTradeWorld(config, before, action.expectedTick, state.seed);
      return next === before ? { state, errors: [] } : success(state, { tradeWorld: next });
    }
    case "world.pauseToggled": {
      if (!config.tradeWorld || config.tradeWorld.timing === "turn-based" || !["planning", "active", "event_pending"].includes(state.status))
        return { state, errors: [] };
      const world = state.tradeWorld ?? initialTradeWorld(config.tradeWorld);
      return success(state, { tradeWorld: __spreadProps(__spreadValues({}, world), { paused: !world.paused }) });
    }
    case "view.changed":
      return success(state, { lastView: action.view });
    case "company.started":
      return startCompany(config, state, action);
    case "trade.committed":
      return commitTrade(config, state, action.lines);
    case "market.stallInspected":
      return inspectMarketStall(config, state, action.stallId);
    case "route.committed":
      return commitRoute(config, state, action.routeId, action.rationale, action.forecast);
    case "travel.advanced":
      return advanceTravel(config, state);
    case "event.resolved":
      return resolveEvent(config, state, action.choiceId, action.reasoning, action.mathAnswer);
    case "season.completed":
      return completeSeason(config, state);
    case "evidence.pinned":
      return pinEvidence(state, action.reference);
    case "evidence.unpinned":
      return success(state, {
        evidence: state.evidence.filter((item) => item.id !== action.evidenceId)
      });
    case "ledger.annotated":
      return annotateLedger(state, action.ledgerEntryId, action.note);
    case "report.sectionUpdated":
      return updateReportSection(config, state, action);
    case "report.submitted":
      return submitReport(config, state);
    case "teacher.pauseToggled":
      return togglePause(state);
    case "teacher.eventInjected":
      return injectEvent(config, state, action.eventId);
    case "teacher.eventSkipped":
      return skipEvent(config, state);
    case "teacher.seedChanged":
      return changeSeed(state, action.seed);
    case "teacher.difficultyChanged":
      return success(state, { difficulty: action.difficulty });
    case "simulation.restarted": {
      const restarted = createSimulationState(config, state.seed);
      return {
        state: __spreadProps(__spreadValues({}, restarted), { difficulty: state.difficulty, version: state.version + 1 }),
        errors: []
      };
    }
  }
}
function cashOnHand(state) {
  return sumCents(state.ledger.map((entry) => entry.cashChangeCents));
}
function cargoUsed(config, state) {
  return state.inventory.reduce((total, item) => {
    const good = config.goods.find((definition) => definition.id === item.goodId);
    return total + item.quantity * (good?.unitCargo ?? 0);
  }, 0);
}
function cargoCapacity(config, state) {
  return config.transports.find((transport) => transport.id === state.transportId)?.cargoCapacity ?? 0;
}
function marketAt(config, locationId) {
  return config.markets.find((market) => market.locationId === locationId);
}
function marketPrice(config, locationId, goodId, direction, state) {
  const good = config.goods.find((item) => item.id === goodId);
  const marketGood = marketAt(config, locationId)?.goods.find((item) => item.goodId === goodId);
  if (good === void 0 || marketGood === void 0) {
    return void 0;
  }
  const base = applyBasisPoints(
    good.baseBuyPriceCents,
    direction === "buy" ? marketGood.buyMultiplierBps : marketGood.sellMultiplierBps
  );
  return applyBasisPoints(base, tradeWorldPriceBps(state?.tradeWorld, locationId, goodId));
}
function purchaseDiscountPercent(config, direction, quantity) {
  if (direction !== "buy") return 0;
  return [...config.transactionMath?.purchaseDiscountTiers ?? []].sort((left, right) => right.minimumQuantity - left.minimumQuantity).find((tier) => quantity >= tier.minimumQuantity)?.discountPercent ?? 0;
}
function effectiveTradeUnitPrice(config, locationId, line, state) {
  const postedPrice = marketPrice(config, locationId, line.goodId, line.direction, state) ?? 0;
  const discountPercent = purchaseDiscountPercent(config, line.direction, line.quantity);
  return Math.round(postedPrice * (100 - discountPercent) / 100);
}
function tradeLineTotal(config, locationId, line, state) {
  return effectiveTradeUnitPrice(config, locationId, line, state) * line.quantity;
}
function marketStockRemaining(config, state, locationId, goodId) {
  const configured = marketAt(config, locationId)?.goods.find((item) => item.goodId === goodId);
  if (configured === void 0) {
    return 0;
  }
  const netPurchased = state.ledger.filter(
    (entry) => entry.locationId === locationId && entry.details?.goodId === goodId && (entry.type === "purchase" || entry.type === "sale")
  ).reduce(
    (total, entry) => total + (entry.type === "purchase" ? 1 : -1) * (entry.details?.quantity ?? 0),
    0
  );
  return Math.max(
    0,
    configured.availableQuantity + (state.tradeWorld?.deliveredStock[locationId]?.[goodId] ?? 0) - netPurchased
  );
}
function inventoryAverageCost(item) {
  const quantity = item.lots.reduce((total, lot) => total + lot.quantity, 0);
  if (quantity === 0) {
    return 0;
  }
  return Math.round(
    item.lots.reduce((total, lot) => total + lot.quantity * lot.unitCostCents, 0) / quantity
  );
}
function inventoryValueAtCurrentMarket(config, state) {
  return state.inventory.reduce((total, item) => {
    const price = marketPrice(config, state.currentLocationId, item.goodId, "sell", state) ?? 0;
    return total + price * item.quantity;
  }, 0);
}
function previewTrade(config, state, lines) {
  const errors = [];
  if (["not_started", "paused_by_teacher", "submitted"].includes(state.status)) {
    errors.push("Trading is unavailable while this attempt is read-only.");
  }
  if (state.pendingEventId !== void 0 || state.status === "event_pending") {
    errors.push("Resolve the current event before trading.");
  }
  if (state.activeTravel !== void 0) {
    errors.push("Trading is unavailable while your company is traveling.");
  }
  if (state.status === "season_complete") {
    errors.push("The completed season is read-only.");
  }
  if (lines.length === 0) {
    errors.push("Add at least one good to the trade.");
  }
  let cash = cashOnHand(state);
  let cargo = cargoUsed(config, state);
  const capacity = cargoCapacity(config, state);
  const quantities = new Map(state.inventory.map((item) => [item.goodId, item.quantity]));
  const purchased = /* @__PURE__ */ new Map();
  for (const line of lines) {
    const good = config.goods.find((item) => item.id === line.goodId);
    const marketGood = marketAt(config, state.currentLocationId)?.goods.find(
      (item) => item.goodId === line.goodId
    );
    if (good === void 0 || marketGood === void 0) {
      errors.push("That good is not traded at this location.");
      continue;
    }
    if (!goodIsUnlocked(config, state, line.goodId)) {
      errors.push(`${good.name}: finish the current trading mission to unlock this good.`);
      continue;
    }
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      errors.push(`${good.name}: enter a whole-number quantity above zero.`);
      continue;
    }
    if (line.quotedUnitPriceCents !== void 0 && line.quotedUnitPriceCents !== marketPrice(config, state.currentLocationId, line.goodId, line.direction, state)) {
      errors.push(`${good.name}: the market price changed. Review the new price before trading.`);
    }
    const lineTotal = tradeLineTotal(config, state.currentLocationId, line, state);
    if (line.direction === "buy") {
      const nextPurchased = (purchased.get(line.goodId) ?? 0) + line.quantity;
      purchased.set(line.goodId, nextPurchased);
      const remainingStock = marketStockRemaining(
        config,
        state,
        state.currentLocationId,
        line.goodId
      );
      if (nextPurchased > remainingStock) {
        errors.push(`${good.name}: only ${remainingStock} units are available.`);
      }
      cash -= lineTotal;
      cargo += good.unitCargo * line.quantity;
      quantities.set(line.goodId, (quantities.get(line.goodId) ?? 0) + line.quantity);
    } else {
      const owned = quantities.get(line.goodId) ?? 0;
      if (line.quantity > owned) {
        errors.push(`${good.name}: you only own ${owned} units.`);
      } else {
        quantities.set(line.goodId, owned - line.quantity);
        cash += lineTotal;
        cargo -= good.unitCargo * line.quantity;
      }
    }
  }
  if (cash < 0) {
    errors.push("This trade costs more cash than you have available.");
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
    netCashChangeCents: cash - cashOnHand(state)
  };
}
function routeIsCompatible(config, state, route) {
  const transport = config.transports.find((item) => item.id === state.transportId);
  return transport !== void 0 && route.terrain.every((terrain) => transport.compatibleTerrain.includes(terrain));
}
function routeProfitForecast(config, state, route) {
  const expectedSalesRevenueCents = state.inventory.reduce((total, item) => {
    const destinationPrice = marketPrice(config, route.toLocationId, item.goodId, "sell", state) ?? 0;
    return total + destinationPrice * item.quantity;
  }, 0);
  const goodsCostCents = state.inventory.reduce(
    (total, item) => total + item.lots.reduce((lotTotal, lot) => lotTotal + lot.quantity * lot.unitCostCents, 0),
    0
  );
  return {
    expectedSalesRevenueCents,
    goodsCostCents,
    travelCostCents: route.supplyCostCents,
    expectedTripProfitCents: expectedSalesRevenueCents - goodsCostCents - route.supplyCostCents
  };
}
function ledgerReconciles(state) {
  let running = 0;
  return state.ledger.every((entry) => {
    running += entry.cashChangeCents;
    return running === entry.cashBalanceCents;
  });
}
function reportMissingRequirements(config, state) {
  const missing = [];
  for (const definition of config.reportSections) {
    const section = state.report.sections[definition.id];
    if ((section?.response.trim().length ?? 0) < 12) {
      missing.push(`${definition.title}: add your explanation`);
    }
    if ((section?.evidenceIds.length ?? 0) < definition.evidenceMinimum) {
      missing.push(`${definition.title}: add ${definition.evidenceMinimum} game record(s)`);
    }
    if (definition.calculationRequired && (section?.calculation.trim().length ?? 0) === 0) {
      missing.push(`${definition.title}: show a calculation`);
    }
  }
  return missing;
}
function seasonResults(config, state) {
  const byType = (type) => state.ledger.filter((entry) => entry.type === type).reduce((sum, entry) => sum + entry.cashChangeCents, 0);
  const sales = byType("sale");
  const realizedCostBasis = state.ledger.filter((entry) => entry.type === "sale").reduce((total, entry) => total + (entry.details?.costBasisCents ?? 0), 0);
  const routeIds = new Set(state.routeHistory.map((entry) => entry.routeId));
  const distance = config.routes.filter((route) => routeIds.has(route.id)).reduce((total, route) => total + route.distanceMiles, 0);
  const ending = cashOnHand(state);
  const netProfit = ending - config.startingCashCents;
  const tradingScore = Math.max(
    0,
    Math.min(40, Math.round(netProfit / config.profitTargetCents * 40))
  );
  const mathChecks = [
    ...state.routeHistory.flatMap(
      (route) => route.forecast === void 0 ? [] : [route.forecast.salesRevenueCorrect, route.forecast.tripProfitCorrect]
    ),
    ...state.eventHistory.flatMap(
      (item) => item.mathCorrect === void 0 ? [] : [item.mathCorrect]
    )
  ];
  const mathScore = mathChecks.length === 0 ? 0 : Math.round(mathChecks.filter(Boolean).length / mathChecks.length * 40);
  const explanationScore = Math.min(
    20,
    state.eventHistory.filter((item) => item.reasoning.trim().length >= 12).length * 10
  );
  const score = Math.max(0, Math.min(100, tradingScore + mathScore + explanationScore));
  return {
    startingCashCents: config.startingCashCents,
    endingCashCents: ending,
    transportCostCents: -byType("transport"),
    goodsPurchasedCents: -byType("purchase"),
    supplyCostsCents: -byType("travel"),
    eventIncomeCents: byType("eventIncome"),
    eventExpensesCents: -byType("eventExpense"),
    salesRevenueCents: sales,
    realizedCostBasisCents: realizedCostBasis,
    realizedTradeProfitCents: sales - realizedCostBasis,
    netProfitCents: netProfit,
    unsoldInventoryValueCents: inventoryValueAtCurrentMarket(config, state),
    distanceTraveled: distance,
    tradeCount: state.ledger.filter((entry) => entry.type === "purchase" || entry.type === "sale").length,
    tradingScore,
    mathScore,
    explanationScore,
    score,
    performanceLabel: score >= 80 ? "Strategic Trailblazer" : score >= 60 ? "Resourceful Trader" : score >= 40 ? "Growing Merchant" : "Learning the Trail"
  };
}
function startCompany(config, state, action) {
  if (state.status !== "not_started") {
    return failure(state, "This company has already started its season.");
  }
  const transport = config.transports.find((item) => item.id === action.transportId);
  if (transport === void 0) {
    return failure(state, "Choose an available transportation option.");
  }
  if (action.companyName.trim().length < 2) {
    return failure(state, "Enter a company name with at least two letters.");
  }
  if (!config.emblems.some((emblem) => emblem.id === action.emblemId)) {
    return failure(state, "Choose an available company emblem.");
  }
  if (transport.costCents > config.startingCashCents) {
    return failure(state, "That transportation option costs more than the starting budget.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const capital = {
    id: "ledger-starting-capital",
    day: 1,
    locationId: config.startingLocationId,
    type: "startingCapital",
    description: "Starting company capital",
    cashChangeCents: config.startingCashCents,
    cashBalanceCents: config.startingCashCents,
    cargoDelta: 0,
    createdAt: timestamp
  };
  const purchase = {
    id: "ledger-transport-purchase",
    day: 1,
    locationId: config.startingLocationId,
    type: "transport",
    description: `Purchased ${transport.name}`,
    cashChangeCents: -transport.costCents,
    cashBalanceCents: config.startingCashCents - transport.costCents,
    cargoDelta: 0,
    createdAt: timestamp
  };
  return success(state, {
    status: "planning",
    companyName: action.companyName.trim(),
    emblemId: action.emblemId,
    transportId: transport.id,
    ledger: [capital, purchase]
  });
}
function commitTrade(config, state, lines) {
  const preview = previewTrade(config, state, lines);
  if (!preview.valid) {
    return { state, errors: preview.errors };
  }
  let inventory = [...state.inventory];
  let ledger = [...state.ledger];
  for (const line of lines) {
    const good = config.goods.find((item) => item.id === line.goodId);
    const postedUnitPrice = marketPrice(
      config,
      state.currentLocationId,
      line.goodId,
      line.direction,
      state
    );
    if (good === void 0 || postedUnitPrice === void 0) {
      return failure(state, "A trade item is no longer available at this market.");
    }
    const discountPercent = purchaseDiscountPercent(config, line.direction, line.quantity);
    const unitPrice = effectiveTradeUnitPrice(config, state.currentLocationId, line, state);
    const lineTotal = unitPrice * line.quantity;
    if (config.transactionMath?.answerRequired && line.studentTotalCents === void 0) {
      return failure(
        state,
        `${good.name}: enter the exact transaction total before completing the trade.`
      );
    }
    if (line.studentTotalCents !== void 0 && line.studentTotalCents !== lineTotal) {
      return failure(
        state,
        `${good.name}: the transaction total does not match the price calculation.`
      );
    }
    const entryId = `ledger-${state.version + 1}-${ledger.length + 1}`;
    let costBasisCents;
    if (line.direction === "buy") {
      const existing = inventory.find((item) => item.goodId === line.goodId);
      const lot = {
        ledgerEntryId: entryId,
        locationId: state.currentLocationId,
        day: state.currentDay,
        quantity: line.quantity,
        unitCostCents: unitPrice
      };
      inventory = existing === void 0 ? [...inventory, { goodId: line.goodId, quantity: line.quantity, lots: [lot] }] : inventory.map(
        (item) => item.goodId === line.goodId ? __spreadProps(__spreadValues({}, item), { quantity: item.quantity + line.quantity, lots: [...item.lots, lot] }) : item
      );
    } else {
      const sold = removeInventory(inventory, line.goodId, line.quantity);
      inventory = sold.inventory;
      costBasisCents = sold.costBasisCents;
    }
    const cashChange = lineTotal * (line.direction === "buy" ? -1 : 1);
    const cargoDelta = good.unitCargo * line.quantity * (line.direction === "buy" ? 1 : -1);
    ledger = appendLedger(ledger, {
      id: entryId,
      day: state.currentDay,
      locationId: state.currentLocationId,
      type: line.direction === "buy" ? "purchase" : "sale",
      description: `${line.direction === "buy" ? "Bought" : "Sold"} ${line.quantity} ${good.name}`,
      cashChangeCents: cashChange,
      cargoDelta,
      details: {
        goodId: good.id,
        quantity: line.quantity,
        unitPriceCents: unitPrice,
        postedUnitPriceCents: postedUnitPrice,
        discountPercent,
        studentTotalCents: line.studentTotalCents,
        costBasisCents
      },
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return success(state, {
    inventory,
    ledger,
    status: state.status === "planning" ? "active" : state.status
  });
}
function inspectMarketStall(config, state, stallId) {
  const scene = config.world.locations.find(
    (location) => location.locationId === state.currentLocationId
  );
  const stall = scene?.stalls.find((item) => item.id === stallId);
  if (stall === void 0) {
    return failure(state, "That market stop is not available at this location.");
  }
  const current = state.marketDiscoveries[state.currentLocationId] ?? [];
  if (current.includes(stall.id)) {
    return success(state, {});
  }
  const evidenceId = `evidence-market-${state.currentLocationId}-${stall.id}`;
  const evidence = state.evidence.some((item) => item.id === evidenceId) ? state.evidence : [
    ...state.evidence,
    {
      id: evidenceId,
      sourceType: "notebook",
      sourceId: stall.id,
      title: `${stall.name} intelligence \xB7 Day ${state.currentDay}`,
      summary: `${stall.merchantName}: ${stall.rumor} Reliability cue: ${stall.trustCue}`,
      pinnedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  return success(state, {
    marketDiscoveries: __spreadProps(__spreadValues({}, state.marketDiscoveries), {
      [state.currentLocationId]: [...current, stall.id]
    }),
    evidence
  });
}
function commitRoute(config, state, routeId, rationale, forecastAnswer) {
  if (state.pendingEventId !== void 0 || state.activeTravel !== void 0) {
    return failure(state, "Finish the current journey before choosing another route.");
  }
  if (rationale.trim().length < 12) {
    return failure(state, "Explain your route choice with at least one complete reason.");
  }
  const route = config.routes.find((item) => item.id === routeId);
  if (route === void 0 || route.fromLocationId !== state.currentLocationId) {
    return failure(state, "Choose a route that begins at your current location.");
  }
  if (!routeIsUnlocked(config, state, route.id)) {
    return failure(state, "Finish the current trading mission to unlock this route.");
  }
  const progression = choiceProgression(config, state);
  if (progression.enabled && progression.currentStageIndex < progression.stageCount - 1) {
    return failure(state, "Buy two kinds of goods before departing.");
  }
  if (!routeIsCompatible(config, state, route)) {
    return failure(state, "Your transportation is not compatible with this route terrain.");
  }
  if (cashOnHand(state) < route.supplyCostCents) {
    return failure(state, "You do not have enough cash for route supplies.");
  }
  const forecast = routeProfitForecast(config, state, route);
  const forecastRule = config.routeForecastChallenge;
  const salesRevenueCorrect = forecastAnswer !== void 0 && Math.abs(forecastAnswer.salesRevenueCents - forecast.expectedSalesRevenueCents) <= (forecastRule?.toleranceCents ?? 0);
  const tripProfitCorrect = forecastAnswer !== void 0 && Math.abs(forecastAnswer.tripProfitCents - forecast.expectedTripProfitCents) <= (forecastRule?.toleranceCents ?? 0);
  if (forecastRule?.requiredBeforeDeparture && (!salesRevenueCorrect || !tripProfitCorrect)) {
    return failure(state, "Complete both profit forecast math checks before departing.");
  }
  const eventCount = Math.min(2, Math.max(1, route.estimatedDays - 1));
  const eventSeed = state.seed + state.routeHistory.length * 97;
  const mathEvents = config.events.filter((event) => event.mathChallenge !== void 0);
  const decisionEvents = config.events.filter((event) => event.mathChallenge === void 0);
  const guaranteedMath = deterministicSample(mathEvents, eventSeed, Math.min(1, eventCount));
  const remainingEvents = deterministicSample(
    decisionEvents.length > 0 ? decisionEvents : config.events,
    eventSeed + 31,
    eventCount - guaranteedMath.length
  );
  const eventIds = [...guaranteedMath, ...remainingEvents].map((event) => event.id);
  const historyId = `route-choice-${state.routeHistory.length + 1}`;
  const ledger = appendLedger(state.ledger, {
    id: `ledger-route-${state.routeHistory.length + 1}`,
    day: state.currentDay,
    locationId: state.currentLocationId,
    type: "travel",
    description: `Purchased supplies for ${route.name}`,
    cashChangeCents: -route.supplyCostCents,
    cargoDelta: 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return success(state, __spreadValues({
    status: "active",
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
        forecast: forecastAnswer === void 0 ? void 0 : {
          expectedSalesRevenueCents: forecast.expectedSalesRevenueCents,
          expectedTripProfitCents: forecast.expectedTripProfitCents,
          goodsCostCents: forecast.goodsCostCents,
          studentSalesRevenueCents: forecastAnswer.salesRevenueCents,
          studentTripProfitCents: forecastAnswer.tripProfitCents,
          salesRevenueCorrect,
          tripProfitCorrect
        }
      }
    ],
    activeTravel: { routeId: route.id, progressDays: 0, eventIds, resolvedEventIds: [] }
  }, worldAfterTravelTurn(config, state)));
}
function advanceTravel(config, state) {
  if (state.pendingEventId !== void 0) {
    return failure(state, "Resolve the pending event before continuing travel.");
  }
  const travel = state.activeTravel;
  const route = config.routes.find((item) => item.id === travel?.routeId);
  if (travel === void 0 || route === void 0) {
    return failure(state, "Choose and commit a route before advancing travel.");
  }
  const progressDays = travel.progressDays + 1;
  const eventId = travel.eventIds[progressDays - 1];
  const next = __spreadValues(__spreadProps(__spreadValues({}, state), {
    currentDay: state.currentDay + 1,
    activeTravel: __spreadProps(__spreadValues({}, travel), { progressDays })
  }), worldAfterTravelTurn(config, state));
  if (eventId !== void 0 && !travel.resolvedEventIds.includes(eventId)) {
    return success(state, __spreadProps(__spreadValues({}, next), { status: "event_pending", pendingEventId: eventId }));
  }
  return progressDays >= route.estimatedDays ? arrive(config, state, next, route) : success(state, next);
}
function worldAfterTravelTurn(config, state) {
  if (config.tradeWorld?.timing !== "turn-based") return {};
  const world = state.tradeWorld ?? initialTradeWorld(config.tradeWorld);
  return {
    tradeWorld: advanceTradeWorld(config, __spreadProps(__spreadValues({}, world), { paused: false }), world.tick, state.seed)
  };
}
function resolveEvent(config, state, choiceId, reasoning, mathAnswer) {
  const event = config.events.find((item) => item.id === state.pendingEventId);
  const choice = event?.choices.find((item) => item.id === choiceId);
  if (event === void 0 || choice === void 0) {
    return failure(state, "Select an available event choice.");
  }
  if (reasoning.trim().length < 12) {
    return failure(state, "Explain why this event choice fits your strategy.");
  }
  if (event.mathChallenge !== void 0 && mathAnswer !== event.mathChallenge.answer) {
    return failure(state, "Correct the math check before making the official trail choice.");
  }
  if (cashOnHand(state) + choice.cashChangeCents < 0) {
    return failure(state, "You do not have enough cash for that choice.");
  }
  const cashBefore = cashOnHand(state);
  const cargoBefore = cargoUsed(config, state);
  let inventory = [...state.inventory];
  if ((choice.inventoryLossQuantity ?? 0) > 0) {
    const target = inventory.find((item) => item.quantity > 0);
    if (target !== void 0) {
      inventory = removeInventory(
        inventory,
        target.goodId,
        Math.min(target.quantity, choice.inventoryLossQuantity ?? 0)
      ).inventory;
    }
  }
  let ledger = [...state.ledger];
  if (choice.cashChangeCents !== 0) {
    ledger = appendLedger(ledger, {
      id: `ledger-event-${state.eventHistory.length + 1}`,
      day: state.currentDay,
      locationId: state.currentLocationId,
      type: choice.cashChangeCents > 0 ? "eventIncome" : "eventExpense",
      description: `${event.title}: ${choice.label}`,
      cashChangeCents: choice.cashChangeCents,
      cargoDelta: 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  const travel = state.activeTravel;
  const next = __spreadProps(__spreadValues({}, state), {
    ledger,
    inventory,
    currentDay: state.currentDay + choice.dayChange,
    pendingEventId: void 0,
    status: "active",
    activeTravel: travel === void 0 ? void 0 : __spreadProps(__spreadValues({}, travel), { resolvedEventIds: [...travel.resolvedEventIds, event.id] }),
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
        mathCorrect: event.mathChallenge === void 0 ? void 0 : mathAnswer === event.mathChallenge.answer,
        cashBeforeCents: cashBefore,
        cashAfterCents: cashBefore + choice.cashChangeCents,
        cargoBefore,
        cargoAfter: cargoUsed(config, __spreadProps(__spreadValues({}, state), { inventory })),
        outcome: choice.outcome
      }
    ]
  });
  const route = config.routes.find((item) => item.id === travel?.routeId);
  return route !== void 0 && (travel?.progressDays ?? 0) >= route.estimatedDays ? arrive(config, state, next, route) : success(state, next);
}
function completeSeason(config, state) {
  if (state.activeTravel !== void 0 || state.pendingEventId !== void 0) {
    return failure(state, "Finish the current journey before closing the season.");
  }
  if (state.routeHistory.every((route) => route.dayArrived === void 0)) {
    return failure(state, "Complete at least one route before closing the season.");
  }
  const completedAt = (/* @__PURE__ */ new Date()).toISOString();
  const next = success(state, { status: "season_complete", completedAt });
  const results = seasonResults(config, next.state);
  return pinEvidence(next.state, {
    id: "evidence-season-results",
    sourceType: "result",
    sourceId: "season-results",
    title: "Trading Season Results",
    summary: `Ending cash ${results.endingCashCents}; net profit ${results.netProfitCents}; score ${results.score}`
  });
}
function pinEvidence(state, reference) {
  if (state.evidence.some((item) => item.id === reference.id)) {
    return { state, errors: [] };
  }
  return success(state, {
    evidence: [...state.evidence, __spreadProps(__spreadValues({}, reference), { pinnedAt: (/* @__PURE__ */ new Date()).toISOString() })]
  });
}
function annotateLedger(state, ledgerEntryId, note) {
  if (!state.ledger.some((entry) => entry.id === ledgerEntryId)) {
    return failure(state, "That ledger entry could not be found.");
  }
  return success(state, {
    ledgerAnnotations: __spreadProps(__spreadValues({}, state.ledgerAnnotations), { [ledgerEntryId]: note.trim() })
  });
}
function updateReportSection(config, state, action) {
  if (!config.reportSections.some((section) => section.id === action.sectionId)) {
    return failure(state, "That report section is not part of this project.");
  }
  const validEvidenceIds = action.evidenceIds.filter(
    (id) => state.evidence.some((item) => item.id === id)
  );
  const sections = __spreadProps(__spreadValues({}, state.report.sections), {
    [action.sectionId]: {
      response: action.response,
      evidenceIds: [...new Set(validEvidenceIds)],
      calculation: action.calculation
    }
  });
  const preview = __spreadProps(__spreadValues({}, state), { report: __spreadProps(__spreadValues({}, state.report), { sections }) });
  const ready = reportMissingRequirements(config, preview).length === 0;
  return success(state, {
    report: __spreadProps(__spreadValues({}, state.report), { sections, status: ready ? "ready_to_submit" : "draft" })
  });
}
function submitReport(config, state) {
  if (state.status !== "season_complete" && state.status !== "needs_revision") {
    return failure(state, "Complete the trading season before submitting the strategy report.");
  }
  const missing = reportMissingRequirements(config, state);
  if (missing.length > 0) {
    return { state, errors: missing };
  }
  return success(state, {
    status: "submitted",
    report: __spreadProps(__spreadValues({}, state.report), { status: "submitted", submittedAt: (/* @__PURE__ */ new Date()).toISOString() })
  });
}
function togglePause(state) {
  return state.status === "paused_by_teacher" ? success(state, { status: state.pausedFromStatus ?? "active", pausedFromStatus: void 0 }) : success(state, { status: "paused_by_teacher", pausedFromStatus: state.status });
}
function injectEvent(config, state, eventId) {
  if (!config.events.some((event) => event.id === eventId)) {
    return failure(state, "Choose an event from the configured event pool.");
  }
  const effectiveStatus = state.status === "paused_by_teacher" ? state.pausedFromStatus : state.status;
  if (state.pendingEventId !== void 0 || effectiveStatus === "not_started" || effectiveStatus === "season_complete" || effectiveStatus === "submitted") {
    return failure(state, "An event cannot be injected in the current state.");
  }
  return success(state, { pendingEventId: eventId, status: "event_pending" });
}
function skipEvent(config, state) {
  const event = config.events.find((item) => item.id === state.pendingEventId);
  if (event === void 0) {
    return failure(state, "There is no pending event to skip.");
  }
  const travel = state.activeTravel;
  const next = __spreadProps(__spreadValues({}, state), {
    pendingEventId: void 0,
    status: "active",
    activeTravel: travel === void 0 ? void 0 : __spreadProps(__spreadValues({}, travel), { resolvedEventIds: [...travel.resolvedEventIds, event.id] }),
    eventHistory: [
      ...state.eventHistory,
      {
        id: `event-decision-${state.eventHistory.length + 1}`,
        eventId: event.id,
        routeId: travel?.routeId,
        locationId: state.currentLocationId,
        day: state.currentDay,
        choiceId: "teacher-skip",
        reasoning: "Skipped by teacher control",
        cashBeforeCents: cashOnHand(state),
        cashAfterCents: cashOnHand(state),
        cargoBefore: cargoUsed(config, state),
        cargoAfter: cargoUsed(config, state),
        outcome: "The teacher skipped this event; no simulation values changed."
      }
    ]
  });
  const route = config.routes.find((item) => item.id === travel?.routeId);
  return route !== void 0 && (travel?.progressDays ?? 0) >= route.estimatedDays ? arrive(config, state, next, route) : success(state, next);
}
function changeSeed(state, seed) {
  if (!Number.isInteger(seed) || seed <= 0) {
    return failure(state, "Scenario seed must be a positive whole number.");
  }
  if (state.routeHistory.length > 0) {
    return failure(state, "Restart the attempt before changing a seed already used for travel.");
  }
  return success(state, { seed });
}
function arrive(config, original, next, route) {
  return success(original, __spreadProps(__spreadValues({}, next), {
    currentLocationId: route.toLocationId,
    activeTravel: void 0,
    status: "active",
    routeHistory: next.routeHistory.map(
      (entry) => entry.routeId === route.id && entry.dayArrived === void 0 ? __spreadProps(__spreadValues({}, entry), { dayArrived: next.currentDay }) : entry
    )
  }));
}
function appendLedger(ledger, entry) {
  const priorBalance = ledger.at(-1)?.cashBalanceCents ?? 0;
  return [...ledger, __spreadProps(__spreadValues({}, entry), { cashBalanceCents: priorBalance + entry.cashChangeCents })];
}
function removeInventory(inventory, goodId, quantity) {
  const current = inventory.find((item) => item.goodId === goodId);
  if (current === void 0) {
    return { inventory: [...inventory], costBasisCents: 0 };
  }
  let remaining = quantity;
  let costBasisCents = 0;
  const lots = [];
  for (const lot of current.lots) {
    const removed = Math.min(remaining, lot.quantity);
    remaining -= removed;
    costBasisCents += removed * lot.unitCostCents;
    if (removed < lot.quantity) {
      lots.push(__spreadProps(__spreadValues({}, lot), { quantity: lot.quantity - removed }));
    }
  }
  const nextQuantity = current.quantity - quantity;
  return {
    inventory: nextQuantity === 0 ? inventory.filter((item) => item.goodId !== goodId) : inventory.map(
      (item) => item.goodId === goodId ? __spreadProps(__spreadValues({}, item), { quantity: nextQuantity, lots }) : item
    ),
    costBasisCents
  };
}
function success(state, changes) {
  return {
    state: __spreadProps(__spreadValues(__spreadValues({}, state), changes), {
      version: state.version + 1,
      lastSavedAt: (/* @__PURE__ */ new Date()).toISOString()
    }),
    errors: []
  };
}
function failure(state, message) {
  return { state, errors: [message] };
}

// src/app/templates/simulation-decision/runtime/simulation-decision.tokens.ts
var SIMULATION_DECISION_CONFIG = new InjectionToken(
  "SIMULATION_DECISION_CONFIG"
);
var SIMULATION_DECISION_PERSISTENCE = new InjectionToken("SIMULATION_DECISION_PERSISTENCE");
var SIMULATION_DECISION_BUILDER_INFO = new InjectionToken("SIMULATION_DECISION_BUILDER_INFO");
var SIMULATION_DECISION_PROJECT_ROUTE = new InjectionToken(
  "SIMULATION_DECISION_PROJECT_ROUTE"
);
var SIMULATION_DECISION_FINAL_EXAMPLE_ROUTE = new InjectionToken(
  "SIMULATION_DECISION_FINAL_EXAMPLE_ROUTE"
);
var SIMULATION_DECISION_SESSION_CONTEXT = new InjectionToken(
  "SIMULATION_DECISION_SESSION_CONTEXT"
);

export {
  formatMoney,
  createExpedition,
  expeditionTotals,
  expeditionPrice,
  expeditionCargo,
  reduceExpedition,
  deterministicSample,
  choiceProgression,
  goodIsUnlocked,
  routeIsUnlocked,
  initialTradeWorld,
  tradeWorldPriceBps,
  createSimulationState,
  reduceSimulationDecision,
  cashOnHand,
  cargoUsed,
  cargoCapacity,
  marketAt,
  marketPrice,
  purchaseDiscountPercent,
  effectiveTradeUnitPrice,
  tradeLineTotal,
  marketStockRemaining,
  inventoryAverageCost,
  inventoryValueAtCurrentMarket,
  previewTrade,
  routeIsCompatible,
  routeProfitForecast,
  ledgerReconciles,
  reportMissingRequirements,
  seasonResults,
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
  SIMULATION_DECISION_BUILDER_INFO,
  SIMULATION_DECISION_PROJECT_ROUTE,
  SIMULATION_DECISION_FINAL_EXAMPLE_ROUTE,
  SIMULATION_DECISION_SESSION_CONTEXT
};
//# debugId=ed71c7d4-5a4d-576e-8160-5a85b87e3800
//# sourceMappingURL=chunk-OGBAME5W.js.map
