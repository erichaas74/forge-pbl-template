import type { SimulationDecisionConfig } from './simulation-decision.models';
import type { TradeWorldDefinition, TradeWorldEffect, TradeWorldState } from './trade-world.models';
import { deterministicSample } from './seeded-random';

export function initialTradeWorld(definition: TradeWorldDefinition): TradeWorldState {
  return {
    tick: 0,
    paused: false,
    effects: [],
    history: [],
    deliveredStock: {},
    shipments: definition.shipments.map((shipment) => ({
      id: shipment.id,
      routeId: shipment.routeId,
      direction: 'outbound',
      progressTicks: -shipment.startOffset,
      deliveries: 0,
    })),
  };
}

/** Exactly one confirmed pulse; duplicate/out-of-order pulses cannot deliver goods twice. */
export function advanceTradeWorld(
  config: SimulationDecisionConfig,
  previous: TradeWorldState,
  expectedTick: number,
  seed: number,
): TradeWorldState {
  const definition = config.tradeWorld;
  if (!definition || previous.paused || expectedTick !== previous.tick) return previous;
  const tick = previous.tick + 1;
  const effects = previous.effects.filter((effect) => effect.expiresTick > tick);
  const added: TradeWorldEffect[] = [];
  const deliveredStock = { ...previous.deliveredStock };
  if ((tick - 1) % definition.eventEveryTicks === 0) {
    const cycle = Math.floor((tick - 1) / definition.eventEveryTicks);
    // A seeded shuffled cycle gives varied events without rerolling on reload.
    const order = deterministicSample(definition.events, seed, definition.events.length);
    const event = order[cycle % order.length];
    if (event)
      added.push({
        ...event,
        id: `world-event-${tick}`,
        sourceId: event.id,
        startedTick: tick,
        expiresTick: tick + event.durationTicks,
      });
  }
  const shipments = previous.shipments.map((shipment) => {
    const spec = definition.shipments.find((item) => item.id === shipment.id);
    const route = config.routes.find((item) => item.id === shipment.routeId);
    if (!spec || !route) return shipment;
    const progressTicks = shipment.progressTicks + 1;
    if (progressTicks < spec.travelTicks) return { ...shipment, progressTicks };
    const destination =
      shipment.direction === 'outbound' ? route.toLocationId : route.fromLocationId;
    const stock = { ...deliveredStock[destination] };
    for (const goodId of spec.goodIds) stock[goodId] = (stock[goodId] ?? 0) + spec.quantity;
    deliveredStock[destination] = stock;
    const deliveries = shipment.deliveries + 1;
    added.push({
      id: `shipment-${shipment.id}-${deliveries}`,
      sourceId: shipment.id,
      kind: 'shipment',
      title: `${spec.name} arrived`,
      description: `${spec.quantity} units of each listed good delivered. Extra supply lowers prices temporarily.`,
      locationIds: [destination],
      goodIds: spec.goodIds,
      priceChangeBps: -spec.priceDropBps,
      startedTick: tick,
      expiresTick: tick + spec.reliefTicks,
    });
    return {
      ...shipment,
      progressTicks: 0,
      deliveries,
      direction: shipment.direction === 'outbound' ? ('return' as const) : ('outbound' as const),
    };
  });
  return {
    ...previous,
    tick,
    shipments,
    deliveredStock,
    effects: [...effects, ...added],
    history: [...previous.history, ...added].slice(-30),
  };
}

/** Shared by map quotes, trade math, ledger execution, forecasts and cargo valuations. */
export function tradeWorldPriceBps(
  world: TradeWorldState | undefined,
  locationId: string,
  goodId: string,
): number {
  const change = (world?.effects ?? [])
    .filter((effect) => effect.locationIds.includes(locationId) && effect.goodIds.includes(goodId))
    .reduce((sum, effect) => sum + effect.priceChangeBps, 0);
  return Math.max(5000, Math.min(20000, 10000 + change));
}
