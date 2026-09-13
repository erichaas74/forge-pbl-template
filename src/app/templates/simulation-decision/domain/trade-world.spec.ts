import { describe, expect, it } from 'vitest';
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { initialTradeWorld, advanceTradeWorld, tradeWorldPriceBps } from './trade-world.engine';
import { isTradeWorldShape, validateTradeWorld } from './trade-world.validation';
import {
  createSimulationState,
  reduceSimulationDecision,
  marketPrice,
  tradeLineTotal,
  previewTrade,
  marketStockRemaining,
  ledgerReconciles,
  routeProfitForecast,
} from './simulation-decision.engine';
import type { SimulationDecisionState } from './simulation-decision.models';

const config = {
  ...frontierTradingConfig,
  tradeWorld: { ...frontierTradingConfig.tradeWorld!, timing: undefined },
  choiceProgression: undefined,
  routeForecastChallenge: undefined,
  transactionMath: undefined,
};
function started() {
  return reduceSimulationDecision(config, createSimulationState(config, 42), {
    type: 'company.started',
    companyName: 'World traders',
    emblemId: 'compass',
    transportId: 'prairie-wagon',
  }).state;
}
function pulse(state: SimulationDecisionState) {
  const result = reduceSimulationDecision(config, state, {
    type: 'world.pulsed',
    expectedTick: state.tradeWorld!.tick,
  });
  expect(result.errors).toEqual([]);
  return result.state;
}

describe('trade world domain', () => {
  it('validates all configured identifiers and requires bounded timing and price effects', () => {
    expect(validateTradeWorld(config)).toEqual([]);
    expect(isTradeWorldShape({ ...config.tradeWorld, tickIntervalMs: 0 })).toBe(false);
    expect(isTradeWorldShape({ ...config.tradeWorld, eventEveryTicks: NaN })).toBe(false);
    expect(
      validateTradeWorld({
        ...config,
        tradeWorld: {
          ...config.tradeWorld!,
          shipments: [{ ...config.tradeWorld!.shipments[0]!, routeId: 'missing' }],
        },
      }),
    ).toContain('valley-freight: unknown shipment route.');
    expect(
      isTradeWorldShape({
        ...config.tradeWorld,
        events: [config.tradeWorld!.events[0], config.tradeWorld!.events[0]],
      }),
    ).toBe(false);
  });

  it('keeps legacy configurations static and permits legacy saves without world state', () => {
    const legacy = { ...config, tradeWorld: undefined };
    const state = createSimulationState(legacy);
    expect(state.tradeWorld).toBeUndefined();
    expect(
      reduceSimulationDecision(legacy, state, { type: 'world.pulsed', expectedTick: 0 }).state,
    ).toBe(state);
    expect(marketPrice(config, 'fort-laramie', 'rope', 'buy')).toBe(
      marketPrice(legacy, 'fort-laramie', 'rope', 'buy', state),
    );
    const next = reduceSimulationDecision(
      config,
      { ...started(), tradeWorld: undefined },
      { type: 'world.pulsed', expectedTick: 0 },
    ).state;
    expect(next.tradeWorld?.tick).toBe(1);
  });

  it('is deterministic, leaves its input unchanged, and rejects duplicate or out-of-order pulses', () => {
    const initial = initialTradeWorld(config.tradeWorld!);
    const saved = structuredClone(initial);
    const first = advanceTradeWorld(config, initial, 0, 42);
    expect(first).toEqual(advanceTradeWorld(config, structuredClone(initial), 0, 42));
    expect(initial).toEqual(saved);
    expect(advanceTradeWorld(config, first, 0, 42)).toBe(first);
    expect(advanceTradeWorld(config, first, 4, 42)).toBe(first);
  });

  it('periodically rotates storms, floods and conflict and expires their effects', () => {
    let state = started();
    for (let i = 0; i < 10; i++) state = pulse(state);
    const kinds = state
      .tradeWorld!.history.filter((item) => item.kind !== 'shipment')
      .map((item) => item.kind);
    expect(new Set(kinds)).toEqual(new Set(['winter-storm', 'flood', 'conflict']));
    expect(
      state.tradeWorld!.effects.every((item) => item.expiresTick > state.tradeWorld!.tick),
    ).toBe(true);
    expect(state.tradeWorld!.history[0]?.startedTick).toBe(1);
  });

  it('delivers once at a confirmed arrival, adds stock, lowers prices, and then returns', () => {
    let state = pulse(pulse(started()));
    const beforePrice = marketPrice(config, 'fort-laramie', 'rope', 'buy', state)!;
    const beforeStock = marketStockRemaining(config, state, 'fort-laramie', 'rope');
    state = pulse(state);
    const shipment = state.tradeWorld!.shipments[0]!;
    expect(shipment).toMatchObject({ direction: 'return', progressTicks: 0, deliveries: 1 });
    expect(marketStockRemaining(config, state, 'fort-laramie', 'rope')).toBe(beforeStock + 6);
    expect(marketPrice(config, 'fort-laramie', 'rope', 'buy', state)!).toBeLessThan(beforePrice);
    for (let i = 0; i < 3; i++) state = pulse(state);
    expect(state.tradeWorld!.shipments[0]).toMatchObject({ direction: 'outbound', deliveries: 2 });
    expect(state.tradeWorld!.deliveredStock['river-crossing']?.['rope']).toBe(6);
  });

  it('keeps player travel, cash, cargo and days independent of world pulses', () => {
    const before = started();
    let state = before;
    for (let i = 0; i < 20; i++) state = pulse(state);
    expect(state.currentDay).toBe(before.currentDay);
    expect(state.currentLocationId).toBe(before.currentLocationId);
    expect(state.inventory).toEqual(before.inventory);
    expect(state.ledger).toEqual(before.ledger);
    expect(state.routeHistory).toEqual(before.routeHistory);
    expect(state.tradeWorld!.history.length).toBeLessThanOrEqual(30);
  });

  it('uses live quotes consistently in trade previews, ledger execution and route forecasts', () => {
    let state = pulse(pulse(pulse(started())));
    state = { ...state, currentLocationId: 'fort-laramie' };
    const price = marketPrice(config, state.currentLocationId, 'rope', 'buy', state)!;
    const line = {
      goodId: 'rope',
      direction: 'buy' as const,
      quantity: 1,
      quotedUnitPriceCents: price,
      studentTotalCents: price,
    };
    expect(tradeLineTotal(config, state.currentLocationId, line, state)).toBe(price);
    const preview = previewTrade(config, state, [line]);
    const result = reduceSimulationDecision(config, state, {
      type: 'trade.committed',
      lines: [line],
    });
    expect(result.errors).toEqual([]);
    expect(result.state.ledger.at(-1)?.cashChangeCents).toBe(-price);
    expect(result.state.ledger.at(-1)?.cashBalanceCents).toBe(preview.cashAfterCents);
    expect(ledgerReconciles(result.state)).toBe(true);
    const route = config.routes.find((item) => item.id === 'route-river-laramie-return')!;
    expect(routeProfitForecast(config, result.state, route).expectedSalesRevenueCents).toBe(
      marketPrice(config, route.toLocationId, 'rope', 'sell', result.state),
    );
    const rejected = reduceSimulationDecision(config, state, {
      type: 'trade.committed',
      lines: [{ ...line, quotedUnitPriceCents: price + 1 }],
    });
    expect(rejected.state).toBe(state);
    expect(rejected.errors.join(' ')).toContain('market price changed');
  });

  it('honors world pause, teacher pause, pending decisions and completed seasons', () => {
    const state = started();
    const paused = reduceSimulationDecision(config, state, { type: 'world.pauseToggled' }).state;
    expect(pulse(paused)).toBe(paused);
    for (const status of ['season_complete', 'event_pending', 'not_started'] as const) {
      const stopped = { ...state, status };
      expect(pulse(stopped)).toBe(stopped);
    }
    expect(
      reduceSimulationDecision(
        config,
        { ...state, status: 'paused_by_teacher' },
        { type: 'world.pulsed', expectedTick: 0 },
      ).errors,
    ).not.toHaveLength(0);
  });

  it('bounds aggregate price changes without modifying the published market', () => {
    const initial = initialTradeWorld(config.tradeWorld!);
    const effect = {
      ...config.tradeWorld!.events[0]!,
      id: 'test',
      sourceId: 'storm',
      startedTick: 0,
      expiresTick: 20,
      locationIds: ['fort-laramie'],
      goodIds: ['rope'],
    };
    expect(
      tradeWorldPriceBps(
        { ...initial, effects: Array.from({ length: 8 }, () => effect) },
        'fort-laramie',
        'rope',
      ),
    ).toBe(20000);
    expect(
      tradeWorldPriceBps(
        { ...initial, effects: [{ ...effect, priceChangeBps: -99000 }] },
        'fort-laramie',
        'rope',
      ),
    ).toBe(5000);
    expect(tradeWorldPriceBps(initial, 'fort-laramie', 'rope')).toBe(10000);
  });

  it('provides valid connected routes and return paths at every town', () => {
    expect(config.routes).toHaveLength(24);
    for (const location of config.locations)
      expect(
        config.routes.filter((route) => route.fromLocationId === location.id).length,
      ).toBeGreaterThanOrEqual(2);
    for (const route of config.routes) {
      const numbers = route.path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      const from = config.locations.find((item) => item.id === route.fromLocationId)!;
      const to = config.locations.find((item) => item.id === route.toLocationId)!;
      expect(numbers.slice(0, 2)).toEqual([from.mapX, from.mapY]);
      expect(numbers.slice(-2)).toEqual([to.mapX, to.mapY]);
      expect(
        config.routes.some(
          (back) => back.fromLocationId === to.id && back.toLocationId === from.id,
        ),
      ).toBe(true);
    }
  });
});
