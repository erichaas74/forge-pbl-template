import { frontierTradingConfig as config } from '../../../projects/frontier-trading/frontier-trading.config';
import {
  createExpedition,
  reduceExpedition,
  expeditionTotals,
  expeditionPrice,
  receiptBin,
} from './expedition-course.engine';
import { exampleExpedition } from './expedition-course.example';
import { isExpeditionCourse, validateExpeditionCourse } from './expedition-course.validation';
import { createSimulationState, reduceSimulationDecision } from './simulation-decision.engine';
import type { ExpeditionAction, ExpeditionCycle } from './expedition-course.models';
import { MemorySimulationDecisionPersistenceAdapter } from '../runtime/simulation-decision.persistence';

const course = config.expeditionCourse!;
function journey(cycle: ExpeditionCycle = course.cycles[0]!) {
  let state = createExpedition(config, cycle);
  return {
    get state() {
      return state;
    },
    act(action: ExpeditionAction) {
      const result = reduceExpedition(config, cycle, state, action);
      state = result.state;
      return result;
    },
  };
}
describe('round-trip trading course', () => {
  it('records both travel legs and reconciles a first journey to the cent', () => {
    const run = journey();
    run.act({ type: 'trade', goodId: 'flour', direction: 'buy', quantity: 6 });
    expect(run.state.cashCents).toBe(6536);
    run.act({ type: 'depart', routeId: 'route-northern' });
    expect(run.state.travel?.elapsed).toBe(0);
    run.act({ type: 'advance' });
    expect(run.state.locationId).toBe('fort-bridger');
    expect(run.state.returned).toBe(false);
    run.act({ type: 'trade', goodId: 'flour', direction: 'sell', quantity: 6 });
    run.act({ type: 'depart', routeId: 'route-northern-return' });
    run.act({ type: 'advance' });
    expect(run.state.returned).toBe(true);
    expect(
      run.state.receipts.filter((r) => r.kind === 'travel').map((r) => r.cashDeltaCents),
    ).toEqual([-600, -600]);
    expect(run.state.cashCents).toBe(
      20000 + run.state.receipts.reduce((s, r) => s + r.cashDeltaCents, 0),
    );
    expect(run.act({ type: 'balance' }).error).toBeDefined();
    for (const r of run.state.receipts)
      run.act({ type: 'file', receiptId: r.id, bin: receiptBin(r) });
    expect(run.act({ type: 'balance' }).error).toBeUndefined();
    expect(run.state.balanced).toBe(true);
    expect(expeditionTotals(course.cycles[0]!, run.state).difference).toBe(0);
  });
  it('rejects overspending, excess cargo, overselling and nonlocal departures without mutations', () => {
    const run = journey();
    for (const action of [
      { type: 'trade', goodId: 'flour', direction: 'buy', quantity: 99 },
      { type: 'trade', goodId: 'salt', direction: 'sell', quantity: 1 },
      { type: 'depart', routeId: 'route-northern-return' },
      { type: 'trade', goodId: 'flour', direction: 'buy', quantity: 1.5 },
    ] as const) {
      expect(run.act(action).error).toBeDefined();
      expect(run.state.revision).toBe(0);
    }
    const small = journey({ ...course.cycles[0]!, capacity: 1 });
    expect(
      small.act({ type: 'trade', goodId: 'flour', direction: 'buy', quantity: 1 }).error,
    ).toContain('full');
  });
  it('requires travel for trading profit instead of profitable same-shop buy/sell loops', () => {
    const state = createExpedition(config, course.cycles[0]!);
    for (const location of config.locations)
      for (const good of config.goods) {
        expect(
          expeditionPrice(config, { ...state, locationId: location.id }, good.id, 'buy'),
        ).toBeGreaterThanOrEqual(
          expeditionPrice(config, { ...state, locationId: location.id }, good.id, 'sell'),
        );
      }
  });
  it('makes weather choices change travel time, cash, and inventory independently', () => {
    for (const choice of course.cycles[1]!.hazards[0]!.choices) {
      const run = journey(course.cycles[1]);
      run.act({ type: 'trade', goodId: 'flour', direction: 'buy', quantity: 4 });
      run.act({ type: 'depart', routeId: 'route-northern' });
      run.act({ type: 'advance' });
      expect(run.state.pendingHazardId).toBe('weather');
      const before = run.state;
      expect(run.act({ type: 'advance' }).error).toBeDefined();
      run.act({ type: 'resolve', choiceId: choice.id });
      expect(run.state.cashCents).toBe(before.cashCents - choice.costCents);
      expect(run.state.travel?.days).toBe(before.travel!.days + choice.delayDays);
      expect(run.state.inventory['flour']!.quantity).toBe(4 - choice.lossUnits);
      if (choice.lossUnits) {
        const loss = run.state.receipts.find((r) => r.kind === 'loss')!;
        expect(loss.cashDeltaCents).toBe(0);
        expect(loss.amountCents).toBe(4488);
        expect(receiptBin(loss)).toBe('noncash');
      }
      expect(run.act({ type: 'resolve', choiceId: choice.id }).error).toBeDefined();
    }
  });
  it('provides reachable practice journeys for every later week without prior completion', () => {
    for (const cycle of course.cycles) {
      const sample = exampleExpedition(config, cycle);
      expect(sample.returned, cycle.id).toBe(true);
      expect(sample.locationId).toBe(config.startingLocationId);
      expect(sample.cashCents).toBeGreaterThanOrEqual(0);
      expect(sample.resolvedHazards).toHaveLength(cycle.hazards.length);
      expect(new Set(sample.receipts.map((r) => r.id)).size).toBe(sample.receipts.length);
      expect(sample.cashCents).toBe(
        cycle.budgetCents + sample.receipts.reduce((n, r) => n + r.cashDeltaCents, 0),
      );
    }
  });
  it('persists separate cycle checkpoints and rejects retried actions', () => {
    const cycle = course.cycles[0]!;
    const action = {
      type: 'expedition.action',
      cycleId: cycle.id,
      expectedRevision: 0,
      action: { type: 'trade', goodId: 'salt', direction: 'buy', quantity: 1 },
    } as const;
    const result = reduceSimulationDecision(config, createSimulationState(config), action);
    expect(result.errors).toEqual([]);
    const retry = reduceSimulationDecision(config, result.state, action);
    expect(retry.state).toBe(result.state);
    expect(retry.errors[0]).toContain('STATE_CONFLICT');
    const adapter = new MemorySimulationDecisionPersistenceAdapter();
    adapter.save(result.state);
    expect(adapter.load(config.projectId, config.projectVersion)?.expeditions?.[cycle.id]).toEqual(
      result.state.expeditions?.[cycle.id],
    );
    expect(result.state.expeditions?.[course.cycles[1]!.id]).toBeUndefined();
    const paused = reduceSimulationDecision(
      config,
      { ...result.state, status: 'paused_by_teacher' },
      { ...action, expectedRevision: 1 },
    );
    expect(paused.state.expeditions).toEqual(result.state.expeditions);
  });
  it('validates the reusable contract and rejects missing roads and no-return networks', () => {
    expect(isExpeditionCourse(course)).toBe(true);
    expect(isExpeditionCourse({ cycles: [] })).toBe(false);
    expect(validateExpeditionCourse(config)).toEqual([]);
    expect(validateExpeditionCourse({ ...config, routes: [] })).not.toEqual([]);
    expect(
      validateExpeditionCourse({
        ...config,
        expeditionCourse: {
          ...course,
          cycles: course.cycles.map((c) => ({
            ...c,
            legs: c.legs.filter((l) => !l.routeId.endsWith('return')),
          })),
        },
      }),
    ).not.toEqual([]);
  });
});
