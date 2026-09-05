import { frontierTradingConfig as frontierTradingProjectConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { formatMoney } from './money';
import {
  cargoUsed,
  cashOnHand,
  createSimulationState,
  ledgerReconciles,
  marketStockRemaining,
  previewTrade,
  reduceSimulationDecision,
  reportMissingRequirements,
  routeIsCompatible,
  routeProfitForecast,
  seasonResults,
  tradeLineTotal,
} from './simulation-decision.engine';
import type {
  SimulationDecisionAction,
  SimulationDecisionState,
  TradeLineInput,
} from './simulation-decision.models';

const frontierTradingConfig = {
  ...frontierTradingProjectConfig,
  choiceProgression: undefined,
};

describe('simulation decision domain', () => {
  it('formats integer cents without floating-point accounting', () => {
    expect(formatMoney(12_345)).toBe('$123.45');
    expect(formatMoney(-450, true)).toBe('-$4.50');
    expect(formatMoney(450, true)).toBe('+$4.50');
  });

  it('starts with configuration separate from empty learner state', () => {
    const state = createSimulationState(frontierTradingConfig, 42);

    expect(state.status).toBe('not_started');
    expect(state.seed).toBe(42);
    expect(state.ledger).toEqual([]);
    expect(frontierTradingConfig.goods).toHaveLength(10);
    expect(frontierTradingConfig.events).toHaveLength(12);
    expect(frontierTradingConfig.world.locations).toHaveLength(
      frontierTradingConfig.locations.length,
    );
    expect(frontierTradingConfig.world.locations.every((scene) => scene.stalls.length >= 3)).toBe(
      true,
    );
  });

  it('records market exploration once and turns a merchant rumor into evidence', () => {
    const initial = started('prairie-wagon');
    const stall = frontierTradingConfig.world.locations.find(
      (scene) => scene.locationId === initial.currentLocationId,
    )!.stalls[0];

    const discovered = act(initial, { type: 'market.stallInspected', stallId: stall.id });
    const revisited = act(discovered, { type: 'market.stallInspected', stallId: stall.id });

    expect(discovered.marketDiscoveries[initial.currentLocationId]).toEqual([stall.id]);
    expect(discovered.evidence.at(-1)?.summary).toContain(stall.rumor);
    expect(revisited.evidence).toHaveLength(discovered.evidence.length);
  });

  it('records starting capital and transport as reconciling ledger entries', () => {
    const state = started('prairie-wagon');

    expect(state.ledger.map((entry) => entry.type)).toEqual(['startingCapital', 'transport']);
    expect(cashOnHand(state)).toBe(16_000);
    expect(state.ledger.at(-1)?.cashBalanceCents).toBe(16_000);
    expect(ledgerReconciles(state)).toBe(true);
  });

  it('previews budget and cargo limits before committing a trade', () => {
    const state = started('handcart');
    const overCapacity = previewTrade(frontierTradingConfig, state, [
      { goodId: 'iron-tools', direction: 'buy', quantity: 4 },
    ]);
    const overBudget = previewTrade(frontierTradingConfig, state, [
      { goodId: 'fur-pelts', direction: 'buy', quantity: 10 },
    ]);

    expect(overCapacity.valid).toBe(false);
    expect(overCapacity.errors.join(' ')).toContain('cargo spaces');
    expect(overBudget.valid).toBe(false);
    expect(overBudget.errors.join(' ')).toContain('cash');
  });

  it('commits a valid purchase to cash, cargo, lots, and the ledger together', () => {
    const before = started('prairie-wagon');
    const after = act(
      before,
      verifiedTrade(before, [{ goodId: 'flour', direction: 'buy', quantity: 3 }]),
    );

    expect(cashOnHand(after)).toBe(9_940);
    expect(cargoUsed(frontierTradingConfig, after)).toBe(6);
    expect(after.inventory[0]?.lots[0]?.unitCostCents).toBe(2_020);
    expect(after.ledger.at(-1)?.cashChangeCents).toBe(-6_060);
    expect(after.ledger.at(-1)?.details?.discountPercent).toBe(10);
    expect(ledgerReconciles(after)).toBe(true);
  });

  it('requires exact transaction math and applies the configured bulk tiers', () => {
    const state = started('prairie-wagon');
    const missing = reduceSimulationDecision(frontierTradingConfig, state, {
      type: 'trade.committed',
      lines: [{ goodId: 'flour', direction: 'buy', quantity: 3 }],
    });
    const wrong = reduceSimulationDecision(frontierTradingConfig, state, {
      type: 'trade.committed',
      lines: [{ goodId: 'flour', direction: 'buy', quantity: 3, studentTotalCents: 1 }],
    });

    expect(missing.state).toBe(state);
    expect(missing.errors.join(' ')).toContain('enter the exact transaction total');
    expect(wrong.state).toBe(state);
    expect(wrong.errors.join(' ')).toContain('does not match');
    expect(
      tradeLineTotal(frontierTradingConfig, state.currentLocationId, {
        goodId: 'flour',
        direction: 'buy',
        quantity: 2,
      }),
    ).toBe(4_488);
    expect(
      tradeLineTotal(frontierTradingConfig, state.currentLocationId, {
        goodId: 'flour',
        direction: 'buy',
        quantity: 6,
      }),
    ).toBe(12_120);
    expect(
      tradeLineTotal(frontierTradingConfig, state.currentLocationId, {
        goodId: 'flour',
        direction: 'buy',
        quantity: 7,
      }),
    ).toBe(13_510);
  });

  it('carries remaining market stock across separate trade commits', () => {
    const initial = started('prairie-wagon');
    const afterFirstPurchase = act(
      initial,
      verifiedTrade(initial, [{ goodId: 'fur-pelts', direction: 'buy', quantity: 1 }]),
    );
    const remaining = marketStockRemaining(
      frontierTradingConfig,
      afterFirstPurchase,
      'independence-post',
      'fur-pelts',
    );
    const preview = previewTrade(frontierTradingConfig, afterFirstPurchase, [
      { goodId: 'fur-pelts', direction: 'buy', quantity: remaining + 1 },
    ]);

    expect(remaining).toBe(frontierTradingConfig.markets[0]!.goods[0]!.availableQuantity - 1);
    expect(preview.errors).toContain(`Fur Pelts: only ${remaining} units are available.`);
  });

  it('enforces transport compatibility for rough routes', () => {
    const wagon = started('prairie-wagon');
    const mules = started('mule-train');
    const mountainRoute = frontierTradingConfig.routes.find(
      (route) => route.id === 'route-south-pass',
    )!;

    expect(routeIsCompatible(frontierTradingConfig, wagon, mountainRoute)).toBe(false);
    expect(routeIsCompatible(frontierTradingConfig, mules, mountainRoute)).toBe(true);
  });

  it('uses the same seed to produce the same route event schedule', () => {
    const readyA = readyToDepart(started('mule-train', 7_777));
    const readyB = readyToDepart(started('mule-train', 7_777));
    const a = act(readyA, routeCommit(readyA, 'route-river', 'The destination needs equipment.'));
    const b = act(
      readyB,
      routeCommit(
        readyB,
        'route-river',
        'A different written rationale does not change randomness.',
      ),
    );

    expect(a.activeTravel?.eventIds).toEqual(b.activeTravel?.eventIds);
  });

  it('records an accurate two-part route profit forecast before departure', () => {
    const state = readyToDepart(started('mule-train', 4_321));
    const inaccurate = reduceSimulationDecision(frontierTradingConfig, state, {
      type: 'route.committed',
      routeId: 'route-river',
      rationale: 'This route fits the goods and available travel money.',
      forecast: { salesRevenueCents: 1, tripProfitCents: 1 },
    });

    expect(inaccurate.errors).toContain(
      'Complete both profit forecast math checks before departing.',
    );
    const departed = act(
      state,
      routeCommit(state, 'route-river', 'This route fits the goods and available travel money.'),
    );
    expect(departed.routeHistory[0]?.forecast?.salesRevenueCorrect).toBe(true);
    expect(departed.routeHistory[0]?.forecast?.tripProfitCorrect).toBe(true);
  });

  it('records an inventory-loss event without creating a second cash charge', () => {
    let state = started('mule-train');
    state = act(state, verifiedTrade(state, [{ goodId: 'salt', direction: 'buy', quantity: 3 }]));
    state = act(state, { type: 'teacher.eventInjected', eventId: 'event-river-crossing' });
    const cashBefore = cashOnHand(state);
    state = act(state, {
      type: 'event.resolved',
      choiceId: 'detour',
      reasoning: 'The detour preserves more cash than the ferry.',
    });

    expect(state.inventory[0]?.quantity).toBe(2);
    expect(cashOnHand(state)).toBe(cashBefore - 1_200);
    expect(state.ledger.at(-1)?.cashChangeCents).toBe(-1_200);
    expect(ledgerReconciles(state)).toBe(true);
  });

  it('requires a correct math check before applying the configured decision effect', () => {
    let state = started('mule-train');
    state = act(state, { type: 'teacher.eventInjected', eventId: 'event-supply-bundle' });
    const incorrect = reduceSimulationDecision(frontierTradingConfig, state, {
      type: 'event.resolved',
      choiceId: 'pass-bundle',
      reasoning: 'Protect the reserve.',
      mathAnswer: 5,
    });
    expect(incorrect.errors).toContain(
      'Correct the math check before making the official trail choice.',
    );
    state = act(state, {
      type: 'event.resolved',
      choiceId: 'pass-bundle',
      reasoning: 'Protect the reserve.',
      mathAnswer: 4.5,
    });
    expect(state.eventHistory[0]?.mathCorrect).toBe(true);
    expect(state.eventHistory[0]?.cashAfterCents).toBe(state.eventHistory[0]?.cashBeforeCents);
  });

  it('completes a buy, travel, event, sale, and season flow with one canonical ledger', () => {
    let state = discoverStarterShops(started('mule-train', 9_001));
    state = act(
      state,
      verifiedTrade(state, [
        { goodId: 'fur-pelts', direction: 'buy', quantity: 2 },
        { goodId: 'salt', direction: 'buy', quantity: 1 },
      ]),
    );
    state = act(
      state,
      routeCommit(state, 'route-northern', 'The demand clue supports food and materials.'),
    );
    for (let step = 0; step < 12 && state.activeTravel !== undefined; step += 1) {
      if (state.pendingEventId !== undefined) {
        const event = frontierTradingConfig.events.find(
          (item) => item.id === state.pendingEventId,
        )!;
        const choice = [...event.choices]
          .reverse()
          .find((item) => cashOnHand(state) + item.cashChangeCents >= 0)!;
        state = act(state, {
          type: 'event.resolved',
          choiceId: choice.id,
          reasoning: 'This protects the company budget and keeps the plan moving.',
          mathAnswer: event.mathChallenge?.answer,
        });
      } else {
        state = act(state, { type: 'travel.advanced' });
      }
    }
    state = act(
      state,
      verifiedTrade(state, [
        { goodId: 'fur-pelts', direction: 'sell', quantity: 2 },
        { goodId: 'salt', direction: 'sell', quantity: 1 },
      ]),
    );
    state = act(state, { type: 'season.completed' });

    expect(state.status).toBe('season_complete');
    expect(state.currentLocationId).toBe('fort-bridger');
    expect(state.inventory).toHaveLength(0);
    expect(seasonResults(frontierTradingConfig, state).salesRevenueCents).toBe(15_315);
    expect(ledgerReconciles(state)).toBe(true);
    expect(state.evidence.some((item) => item.sourceType === 'result')).toBe(true);
  });

  it('requires complete explanations, evidence, and calculations before report submission', () => {
    let state = started('mule-train');
    state = act(state, {
      type: 'evidence.pinned',
      reference: {
        id: 'e-1',
        sourceType: 'notebook',
        sourceId: 'n-1',
        title: 'Plan',
        summary: 'Budget plan',
      },
    });
    state = act(state, {
      type: 'evidence.pinned',
      reference: {
        id: 'e-2',
        sourceType: 'notebook',
        sourceId: 'n-2',
        title: 'Math',
        summary: 'Profit math',
      },
    });
    for (const section of frontierTradingConfig.reportSections) {
      state = act(state, {
        type: 'report.sectionUpdated',
        sectionId: section.id,
        response: 'This explanation connects my choice to the company strategy.',
        evidenceIds:
          section.evidenceMinimum > 1
            ? ['e-1', 'e-2']
            : section.evidenceMinimum === 1
              ? ['e-1']
              : [],
        calculation: section.calculationRequired ? '$12.00 - $8.00 = $4.00 profit' : '',
      });
    }

    expect(reportMissingRequirements(frontierTradingConfig, state)).toEqual([]);
    expect(state.report.status).toBe('ready_to_submit');
    expect(
      reduceSimulationDecision(frontierTradingConfig, state, { type: 'report.submitted' }).errors,
    ).toContain('Complete the trading season before submitting the strategy report.');
  });

  it('restart clears attempt work while preserving teacher seed and difficulty', () => {
    let state = started('mule-train', 8_888);
    state = act(state, { type: 'teacher.difficultyChanged', difficulty: 'support' });
    state = act(state, { type: 'simulation.restarted' });

    expect(state.status).toBe('not_started');
    expect(state.ledger).toEqual([]);
    expect(state.seed).toBe(8_888);
    expect(state.difficulty).toBe('support');
  });
});

function started(transportId: string, seed = 2_026): SimulationDecisionState {
  return act(createSimulationState(frontierTradingConfig, seed), {
    type: 'company.started',
    companyName: 'Trail Math Company',
    emblemId: 'compass',
    transportId,
  });
}

function discoverStarterShops(state: SimulationDecisionState): SimulationDecisionState {
  const stalls = frontierTradingConfig.world.locations.find(
    (location) => location.locationId === state.currentLocationId,
  )!.stalls;
  return stalls
    .slice(0, 2)
    .reduce(
      (current, stall) => act(current, { type: 'market.stallInspected', stallId: stall.id }),
      state,
    );
}

function readyToDepart(state: SimulationDecisionState): SimulationDecisionState {
  const discovered = discoverStarterShops(state);
  return act(
    discovered,
    verifiedTrade(discovered, [
      { goodId: 'flour', direction: 'buy', quantity: 1 },
      { goodId: 'salt', direction: 'buy', quantity: 1 },
    ]),
  );
}

function verifiedTrade(
  state: SimulationDecisionState,
  lines: readonly Omit<TradeLineInput, 'studentTotalCents'>[],
): SimulationDecisionAction {
  return {
    type: 'trade.committed',
    lines: lines.map((line) => ({
      ...line,
      studentTotalCents: tradeLineTotal(frontierTradingConfig, state.currentLocationId, line),
    })),
  };
}

function routeCommit(
  state: SimulationDecisionState,
  routeId: string,
  rationale: string,
): SimulationDecisionAction {
  const route = frontierTradingConfig.routes.find((item) => item.id === routeId)!;
  const forecast = routeProfitForecast(frontierTradingConfig, state, route);
  return {
    type: 'route.committed',
    routeId,
    rationale,
    forecast: {
      salesRevenueCents: forecast.expectedSalesRevenueCents,
      tripProfitCents: forecast.expectedTripProfitCents,
    },
  };
}

function act(
  state: SimulationDecisionState,
  action: SimulationDecisionAction,
): SimulationDecisionState {
  const result = reduceSimulationDecision(frontierTradingConfig, state, action);
  expect(result.errors).toEqual([]);
  return result.state;
}
