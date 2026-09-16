import type { SimulationDecisionConfig } from './simulation-decision.models';
import type {
  ExpeditionAction,
  ExpeditionCycle,
  ExpeditionReceipt,
  ExpeditionState,
  ReceiptBin,
} from './expedition-course.models';
import { applyBasisPoints } from './money';

export function createExpedition(
  config: SimulationDecisionConfig,
  cycle: ExpeditionCycle,
): ExpeditionState {
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
    reflection: '',
    feedback: 'Visit the shops, load your wagon, then select a road.',
  };
}
export function receiptBin(receipt: ExpeditionReceipt): ReceiptBin {
  return receipt.cashDeltaCents > 0 ? 'income' : receipt.cashDeltaCents < 0 ? 'expense' : 'noncash';
}
export function expeditionTotals(cycle: ExpeditionCycle, state: ExpeditionState) {
  const income = state.receipts.reduce((n, r) => n + Math.max(0, r.cashDeltaCents), 0);
  const expenses = state.receipts.reduce((n, r) => n - Math.min(0, r.cashDeltaCents), 0);
  const stock = Object.values(state.inventory).reduce((n, item) => n + item.costCents, 0);
  const filedCash =
    cycle.budgetCents +
    state.receipts.reduce(
      (n, r) =>
        n +
        (state.bins[r.id] === 'income'
          ? r.amountCents
          : state.bins[r.id] === 'expense'
            ? -r.amountCents
            : 0),
      0,
    );
  return {
    income,
    expenses,
    stock,
    profit: state.cashCents + stock - cycle.budgetCents,
    filedCash,
    difference: filedCash - state.cashCents,
  };
}
export function expeditionPrice(
  config: SimulationDecisionConfig,
  state: ExpeditionState,
  goodId: string,
  direction: 'buy' | 'sell',
): number {
  const good = config.goods.find((g) => g.id === goodId);
  const price = config.markets
    .find((m) => m.locationId === state.locationId)
    ?.goods.find((g) => g.goodId === goodId);
  if (!good || !price) return 0;
  const sell = applyBasisPoints(good.baseBuyPriceCents, price.sellMultiplierBps);
  // A shop's retail price must exceed its offer to buy: profit requires travelling.
  return direction === 'sell'
    ? sell
    : Math.max(
        applyBasisPoints(good.baseBuyPriceCents, price.buyMultiplierBps),
        applyBasisPoints(sell, 11000),
      );
}
export function expeditionCargo(config: SimulationDecisionConfig, state: ExpeditionState): number {
  return Object.entries(state.inventory).reduce(
    (n, [id, item]) =>
      n + item.quantity * (config.goods.find((good) => good.id === id)?.unitCargo ?? 0),
    0,
  );
}

/** Pure, deterministic reducer. Rendering/animation never spends money or advances a day. */
export function reduceExpedition(
  config: SimulationDecisionConfig,
  cycle: ExpeditionCycle,
  state: ExpeditionState,
  action: ExpeditionAction,
): { state: ExpeditionState; error?: string } {
  const fail = (error: string) => ({ state, error });
  const update = (patch: Partial<ExpeditionState>) => ({
    state: { ...state, ...patch, revision: state.revision + 1 },
  });
  const receipt = (
    kind: ExpeditionReceipt['kind'],
    label: string,
    delta: number,
    amount = Math.abs(delta),
  ): ExpeditionReceipt => ({
    id: `${cycle.id}-${state.receipts.length + 1}`,
    day: state.day,
    kind,
    label,
    cashDeltaCents: delta,
    amountCents: amount,
  });
  if (action.type === 'reflect') return update({ reflection: action.text.slice(0, 5000) });
  if (action.type === 'file') {
    if (!state.receipts.some((r) => r.id === action.receiptId))
      return fail('Choose a receipt first.');
    return update({
      bins: { ...state.bins, [action.receiptId]: action.bin },
      balanced: false,
      feedback: 'Receipt filed. Compare the reconstructed cash with the cash box.',
    });
  }
  if (action.type === 'balance') {
    if (!state.returned) return fail('Complete the out-and-back journey before closing its books.');
    const wrong = state.receipts.filter((r) => state.bins[r.id] !== receiptBin(r));
    if (wrong.length)
      return fail(
        `${wrong.length} receipt${wrong.length === 1 ? '' : 's'} still need the correct column. Purchases and travel spend cash; cargo damage changes stock.`,
      );
    if (expeditionTotals(cycle, state).difference !== 0)
      return fail('The reconstructed cash does not match the cash box.');
    return update({
      balanced: true,
      feedback: 'Books balanced. Opening cash + money in − money out = closing cash.',
    });
  }
  if (state.pendingHazardId && action.type !== 'resolve')
    return fail('Choose how to handle the trail hazard first.');
  if (action.type === 'trade') {
    if (state.travel) return fail('Arrive at a town before trading.');
    if (!Number.isSafeInteger(action.quantity) || action.quantity < 1 || action.quantity > 99)
      return fail('Choose 1–99 units.');
    if (!cycle.goodIds.includes(action.goodId))
      return fail('That good is not part of this expedition.');
    const good = config.goods.find((g) => g.id === action.goodId)!;
    const each = expeditionPrice(config, state, good.id, action.direction);
    if (each <= 0) return fail('This market does not trade that good.');
    const old = state.inventory[good.id] ?? { quantity: 0, costCents: 0 };
    const total = each * action.quantity;
    if (action.direction === 'buy' && state.returned)
      return fail('This journey has returned. Sell remaining cargo and close its ledger.');
    if (action.direction === 'buy' && total > state.cashCents)
      return fail('The purchase exceeds your cash. Reduce the load.');
    if (
      action.direction === 'buy' &&
      expeditionCargo(config, state) + action.quantity * good.unitCargo > cycle.capacity
    )
      return fail('The wagon is full. Reduce the load.');
    if (action.direction === 'sell' && action.quantity > old.quantity)
      return fail('There are not that many units in your wagon.');
    const buying = action.direction === 'buy';
    const quantity = old.quantity + (buying ? action.quantity : -action.quantity);
    const costCents = buying
      ? old.costCents + total
      : old.costCents - Math.round((old.costCents * action.quantity) / old.quantity);
    const delta = buying ? -total : total;
    return update({
      cashCents: state.cashCents + delta,
      inventory: { ...state.inventory, [good.id]: { quantity, costCents } },
      balanced: false,
      receipts: [
        ...state.receipts,
        receipt(
          buying ? 'purchase' : 'sale',
          `${buying ? 'Bought' : 'Sold'} ${action.quantity} ${good.name}`,
          delta,
        ),
      ],
      feedback: `${action.quantity} ${good.name} ${buying ? 'loaded into' : 'sold from'} your wagon.`,
    });
  }
  if (action.type === 'depart') {
    if (state.travel || state.returned)
      return fail('This wagon is already travelling or has finished its journey.');
    const leg = cycle.legs.find((l) => l.routeId === action.routeId);
    const road = config.routes.find((r) => r.id === action.routeId);
    if (!leg || !road || road.fromLocationId !== state.locationId)
      return fail('Choose a road from your current town.');
    if (state.cashCents < leg.costCents)
      return fail('Keep enough cash for this road. Sell cargo at the local shop.');
    return update({
      cashCents: state.cashCents - leg.costCents,
      travel: { routeId: road.id, elapsed: 0, days: leg.days },
      balanced: false,
      receipts: [...state.receipts, receipt('travel', road.name, -leg.costCents)],
      feedback: `On the road. ${leg.days} travel days ahead.`,
    });
  }
  if (action.type === 'advance') {
    const travel = state.travel;
    if (!travel) return fail('Select a road before advancing a day.');
    const elapsed = travel.elapsed + 1;
    const hazard = cycle.hazards.find(
      (h) =>
        !state.resolvedHazards.includes(h.id) &&
        h.afterLeg === state.completedRoutes.length &&
        h.day === elapsed,
    );
    if (hazard)
      return update({
        day: state.day + 1,
        travel: { ...travel, elapsed },
        pendingHazardId: hazard.id,
        feedback: hazard.title,
      });
    return update(arriveOrContinue(config, cycle, state, { ...travel, elapsed }, state.day + 1));
  }
  if (action.type === 'resolve') {
    const hazard = cycle.hazards.find((h) => h.id === state.pendingHazardId);
    const choice = hazard?.choices.find((c) => c.id === action.choiceId);
    if (!hazard || !choice || !state.travel) return fail('Choose an available trail response.');
    if (choice.costCents > state.cashCents)
      return fail('That response costs more cash than you have.');
    let inventory = { ...state.inventory };
    let remaining = choice.lossUnits;
    let lostValue = 0;
    for (const id of cycle.goodIds) {
      const item = inventory[id];
      if (!item || remaining === 0 || !item.quantity) continue;
      const lost = Math.min(remaining, item.quantity);
      const value = Math.round((item.costCents * lost) / item.quantity);
      inventory[id] = { quantity: item.quantity - lost, costCents: item.costCents - value };
      remaining -= lost;
      lostValue += value;
    }
    const cashReceipt = receipt('risk', `${hazard.title}: ${choice.label}`, -choice.costCents);
    const receipts = [...state.receipts, ...(choice.costCents ? [cashReceipt] : [])];
    if (lostValue)
      receipts.push({
        ...receipt('loss', `${hazard.title}: cargo lost`, 0, lostValue),
        id: `${cycle.id}-${receipts.length + 1}`,
      });
    const travel = { ...state.travel, days: state.travel.days + choice.delayDays };
    return update({
      ...arriveOrContinue(config, cycle, state, travel, state.day),
      inventory,
      cashCents: state.cashCents - choice.costCents,
      receipts,
      pendingHazardId: undefined,
      resolvedHazards: [...state.resolvedHazards, hazard.id],
      decisions: [
        ...(state.decisions ?? []),
        {
          label: `${hazard.title}: ${choice.label}`,
          day: state.day,
          costCents: choice.costCents,
          delayDays: choice.delayDays,
          lostUnits: choice.lossUnits - remaining,
        },
      ],
      feedback: `${choice.label}. ${choice.delayDays} extra day(s); ${choice.lossUnits - remaining} cargo unit(s) lost. Receipt added.`,
    });
  }
  return fail('Unknown expedition action.');
}

function arriveOrContinue(
  config: SimulationDecisionConfig,
  cycle: ExpeditionCycle,
  state: ExpeditionState,
  travel: NonNullable<ExpeditionState['travel']>,
  day: number,
): Partial<ExpeditionState> {
  if (travel.elapsed < travel.days)
    return { day, travel, feedback: `Travel day ${travel.elapsed} of ${travel.days}.` };
  const route = config.routes.find((r) => r.id === travel.routeId)!;
  const visited = [...new Set([...state.visited, route.toLocationId])];
  const returned =
    route.toLocationId === config.startingLocationId &&
    cycle.requiredLocationIds.every((id) => visited.includes(id));
  return {
    day,
    travel: undefined,
    locationId: route.toLocationId,
    visited,
    completedRoutes: [...state.completedRoutes, route.id],
    returned,
    feedback: returned
      ? 'Home again. Sell any remaining cargo, then balance the journey ledger.'
      : `Arrived at ${config.locations.find((l) => l.id === route.toLocationId)?.shortName}. Shops are open.`,
  };
}
