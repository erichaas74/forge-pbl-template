import { describe, expect, it } from 'vitest';
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import {
  createSimulationState,
  reduceSimulationDecision,
  marketPrice,
  marketStockRemaining,
  routeProfitForecast,
  cashOnHand,
} from './simulation-decision.engine';
import { isTradeWorldShape } from './trade-world.validation';
import type {
  SimulationDecisionAction,
  SimulationDecisionState,
} from './simulation-decision.models';

const config = {
  ...frontierTradingConfig,
  choiceProgression: undefined,
  transactionMath: undefined,
  routeForecastChallenge: undefined,
  events: [],
};
const reason = 'A shorter road leaves money for our supplies.';
function act(state: SimulationDecisionState, action: SimulationDecisionAction) {
  const result = reduceSimulationDecision(config, state, action);
  expect(result.errors).toEqual([]);
  return result.state;
}
function prepared() {
  const started = act(createSimulationState(config, 42), {
    type: 'company.started',
    companyName: 'Turn traders',
    emblemId: 'compass',
    transportId: 'prairie-wagon',
  });
  return act(started, {
    type: 'trade.committed',
    lines: [
      { goodId: 'flour', direction: 'buy', quantity: 2 },
      { goodId: 'salt', direction: 'buy', quantity: 2 },
    ],
  });
}

describe('turn-based trade world', () => {
  it('validates optional timing modes and retains the real-time default for older packages', () => {
    expect(isTradeWorldShape(config.tradeWorld)).toBe(true);
    expect(isTradeWorldShape({ ...config.tradeWorld, timing: undefined })).toBe(true);
    expect(isTradeWorldShape({ ...config.tradeWorld, timing: 'real-time' })).toBe(true);
    expect(isTradeWorldShape({ ...config.tradeWorld, timing: 'every-frame' })).toBe(false);
    expect(isTradeWorldShape({ ...config.tradeWorld, timing: ['turn-based'] })).toBe(false);
  });

  it('keeps planning and supplies stable, then settles departure and each travel day atomically', () => {
    const state = prepared();
    const before = structuredClone(state);
    expect(state.tradeWorld?.tick).toBe(0);
    const route = config.routes.find((route) => route.id === 'route-northern')!;
    const depart = act(state, { type: 'route.committed', routeId: route.id, rationale: reason });
    expect(state).toEqual(before);
    expect(depart.version).toBe(state.version + 1);
    expect(depart.tradeWorld?.tick).toBe(1);
    expect(depart.tradeWorld?.history).toHaveLength(1);
    expect(depart.activeTravel?.progressDays).toBe(0);
    expect(depart.currentDay).toBe(state.currentDay);
    expect(depart.inventory).toEqual(state.inventory);
    expect(cashOnHand(depart)).toBe(cashOnHand(state) - route.supplyCostCents);
    const dayOne = act(depart, { type: 'travel.advanced' });
    const price = marketPrice(config, 'fort-laramie', 'rope', 'buy', dayOne)!;
    const stock = marketStockRemaining(config, dayOne, 'fort-laramie', 'rope');
    const dayTwo = act(dayOne, { type: 'travel.advanced' });
    expect(dayTwo.version).toBe(dayOne.version + 1);
    expect(dayTwo.tradeWorld?.tick).toBe(3);
    expect(dayTwo.tradeWorld?.shipments[0]?.deliveries).toBe(1);
    expect(marketStockRemaining(config, dayTwo, 'fort-laramie', 'rope')).toBe(stock + 6);
    expect(marketPrice(config, 'fort-laramie', 'rope', 'buy', dayTwo)!).toBeLessThan(price);
    const arrived = act(dayTwo, { type: 'travel.advanced' });
    expect(arrived.tradeWorld?.tick).toBe(4);
    expect(arrived.currentLocationId).toBe(route.toLocationId);
    expect(arrived.activeTravel).toBeUndefined();
    expect(arrived.currentDay).toBe(state.currentDay + 3);
    expect(reduceSimulationDecision(config, arrived, { type: 'travel.advanced' }).state).toBe(
      arrived,
    );
  });

  it('does not run turns for rejected commands, duplicate departure, inspection, pulses or pause controls', () => {
    const state = prepared();
    for (const action of [
      { type: 'world.pulsed', expectedTick: 0 },
      { type: 'world.pauseToggled' },
      { type: 'route.committed', routeId: 'missing', rationale: reason },
      { type: 'route.committed', routeId: 'route-northern', rationale: '' },
      { type: 'travel.advanced' },
    ] satisfies SimulationDecisionAction[]) {
      expect(reduceSimulationDecision(config, state, action).state).toBe(state);
    }
    const viewed = act(state, { type: 'view.changed', view: 'market' });
    expect(viewed.tradeWorld).toBe(state.tradeWorld);
    const command = {
      type: 'route.committed',
      routeId: 'route-northern',
      rationale: reason,
    } as const;
    const depart = act(state, command);
    expect(reduceSimulationDecision(config, depart, command).state).toBe(depart);
    const paused = { ...depart, status: 'paused_by_teacher' as const };
    expect(reduceSimulationDecision(config, paused, { type: 'travel.advanced' }).state).toBe(
      paused,
    );
  });

  it('validates and records the pre-departure forecast before adjusting prices', () => {
    const definition = {
      ...config,
      routeForecastChallenge: frontierTradingConfig.routeForecastChallenge,
    };
    const state = prepared();
    const route = config.routes.find((route) => route.id === 'route-northern')!;
    const forecast = routeProfitForecast(definition, state, route);
    const command = { type: 'route.committed', routeId: route.id, rationale: reason } as const;
    expect(reduceSimulationDecision(definition, state, command).state).toBe(state);
    const result = reduceSimulationDecision(definition, state, {
      ...command,
      forecast: {
        salesRevenueCents: forecast.expectedSalesRevenueCents,
        tripProfitCents: forecast.expectedTripProfitCents,
      },
    });
    expect(result.errors).toEqual([]);
    expect(result.state.tradeWorld?.tick).toBe(1);
    expect(result.state.routeHistory[0]?.forecast?.expectedSalesRevenueCents).toBe(
      forecast.expectedSalesRevenueCents,
    );
  });

  it('settles a checkpoint turn once and holds the world while resolving its decision', () => {
    const definition = { ...config, events: frontierTradingConfig.events };
    let state = reduceSimulationDecision(definition, prepared(), {
      type: 'route.committed',
      routeId: 'route-northern',
      rationale: reason,
    }).state;
    state = reduceSimulationDecision(definition, state, { type: 'travel.advanced' }).state;
    expect(state.pendingEventId).toBeDefined();
    expect(state.tradeWorld?.tick).toBe(2);
    expect(reduceSimulationDecision(definition, state, { type: 'travel.advanced' }).state).toBe(
      state,
    );
    const event = definition.events.find((event) => event.id === state.pendingEventId)!;
    const choice = event.choices.find((choice) => cashOnHand(state) + choice.cashChangeCents >= 0)!;
    const result = reduceSimulationDecision(definition, state, {
      type: 'event.resolved',
      choiceId: choice.id,
      reasoning: reason,
      mathAnswer: event.mathChallenge?.answer,
    });
    expect(result.errors).toEqual([]);
    expect(result.state.pendingEventId).toBeUndefined();
    expect(result.state.tradeWorld).toBe(state.tradeWorld);
  });
});
