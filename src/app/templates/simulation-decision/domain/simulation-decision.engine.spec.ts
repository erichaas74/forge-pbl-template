import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
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
  seasonResults,
} from './simulation-decision.engine';
import type {
  SimulationDecisionAction,
  SimulationDecisionState,
} from './simulation-decision.models';

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
    const after = act(before, {
      type: 'trade.committed',
      lines: [{ goodId: 'flour', direction: 'buy', quantity: 3 }],
    });

    expect(cashOnHand(after)).toBe(9_268);
    expect(cargoUsed(frontierTradingConfig, after)).toBe(6);
    expect(after.inventory[0]?.lots[0]?.unitCostCents).toBe(2_244);
    expect(after.ledger.at(-1)?.cashChangeCents).toBe(-6_732);
    expect(ledgerReconciles(after)).toBe(true);
  });

  it('carries remaining market stock across separate trade commits', () => {
    const afterFirstPurchase = act(started('prairie-wagon'), {
      type: 'trade.committed',
      lines: [{ goodId: 'fur-pelts', direction: 'buy', quantity: 1 }],
    });
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
    const a = act(started('mule-train', 7_777), {
      type: 'route.committed',
      routeId: 'route-river',
      rationale: 'The destination needs equipment.',
    });
    const b = act(started('mule-train', 7_777), {
      type: 'route.committed',
      routeId: 'route-river',
      rationale: 'A different written rationale does not change randomness.',
    });

    expect(a.activeTravel?.eventIds).toEqual(b.activeTravel?.eventIds);
  });

  it('records an inventory-loss event without creating a second cash charge', () => {
    let state = act(started('mule-train'), {
      type: 'trade.committed',
      lines: [{ goodId: 'salt', direction: 'buy', quantity: 3 }],
    });
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

  it('tracks math-check accuracy without changing the configured decision effect', () => {
    let state = started('mule-train');
    state = act(state, { type: 'teacher.eventInjected', eventId: 'event-supply-bundle' });
    state = act(state, {
      type: 'event.resolved',
      choiceId: 'pass-bundle',
      reasoning: 'Protect the reserve.',
      mathAnswer: 5,
    });

    expect(state.eventHistory[0]?.mathCorrect).toBe(false);
    expect(state.eventHistory[0]?.cashAfterCents).toBe(state.eventHistory[0]?.cashBeforeCents);
  });

  it('completes a buy, travel, event, sale, and season flow with one canonical ledger', () => {
    let state = act(started('mule-train', 9_001), {
      type: 'trade.committed',
      lines: [{ goodId: 'fur-pelts', direction: 'buy', quantity: 2 }],
    });
    state = act(state, {
      type: 'route.committed',
      routeId: 'route-northern',
      rationale: 'The demand clue supports food and materials.',
    });
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
    state = act(state, {
      type: 'trade.committed',
      lines: [{ goodId: 'fur-pelts', direction: 'sell', quantity: 2 }],
    });
    state = act(state, { type: 'season.completed' });

    expect(state.status).toBe('season_complete');
    expect(state.currentLocationId).toBe('fort-bridger');
    expect(state.inventory).toHaveLength(0);
    expect(seasonResults(frontierTradingConfig, state).salesRevenueCents).toBe(13_440);
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

function act(
  state: SimulationDecisionState,
  action: SimulationDecisionAction,
): SimulationDecisionState {
  const result = reduceSimulationDecision(frontierTradingConfig, state, action);
  expect(result.errors).toEqual([]);
  return result.state;
}
