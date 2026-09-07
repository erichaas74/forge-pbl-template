import { frontierTradingConfig as config } from '../frontier-trading/frontier-trading.config';
import {
  createSimulationState,
  reduceSimulationDecision,
  routeProfitForecast,
  seasonResults,
  tradeLineTotal,
} from '../../templates/simulation-decision/domain/simulation-decision.engine';
import { deterministicSample } from '../../templates/simulation-decision/domain/seeded-random';
import type {
  SimulationDecisionAction,
  SimulationDecisionState,
  TradeLineInput,
} from '../../templates/simulation-decision/domain/simulation-decision.models';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

const date = '2026-04-16T14:00:00.000Z';
const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100);
export function createSimulationSample(): SimulationDecisionState {
  // Use the actual seeded event selection and actual transaction/forecast rules.
  const math = config.events.filter((event) => event.mathChallenge);
  const decisions = config.events.filter((event) => !event.mathChallenge);
  let seed = 1;
  while (
    seed < 10000 &&
    !(
      deterministicSample(math, seed, 1)[0]?.id === 'event-supply-bundle' &&
      deterministicSample(decisions, seed + 31, 1)[0]?.id === 'event-river-crossing'
    )
  )
    seed++;
  if (seed === 10000) throw new Error('Completed sample event seed was not found.');
  let state = createSimulationState(config, seed);
  const act = (action: SimulationDecisionAction) => {
    const result = reduceSimulationDecision(config, state, action);
    if (result.errors.length) throw new Error(result.errors.join(' '));
    state = result.state;
  };
  act({
    type: 'company.started',
    companyName: 'Juniper Trail Company',
    emblemId: 'compass',
    transportId: 'prairie-wagon',
  });
  for (const stall of config.world.locations.find(
    (location) => location.locationId === state.currentLocationId,
  )!.stalls)
    act({ type: 'market.stallInspected', stallId: stall.id });
  const trade = (direction: 'buy' | 'sell', goodId: string, quantity: number) => {
    const line: TradeLineInput = { direction, goodId, quantity };
    act({
      type: 'trade.committed',
      lines: [
        { ...line, studentTotalCents: tradeLineTotal(config, state.currentLocationId, line) },
      ],
    });
  };
  trade('buy', 'flour', 2);
  trade('buy', 'salt', 4);
  const route = config.routes.find((route) => route.id === 'route-river')!;
  const forecast = routeProfitForecast(config, state, route);
  act({
    type: 'route.committed',
    routeId: route.id,
    rationale:
      'We chose Green River Trail because preserved food may sell well there. The wagon can use the river terrain. We reserved cash for delays instead of filling every cargo space.',
    forecast: {
      salesRevenueCents: forecast.expectedSalesRevenueCents,
      tripProfitCents: forecast.expectedTripProfitCents,
    },
  });
  for (let step = 0; step < 20 && state.activeTravel; step++) {
    if (state.pendingEventId) {
      const event = config.events.find((item) => item.id === state.pendingEventId)!;
      act({
        type: 'event.resolved',
        choiceId: event.id === 'event-river-crossing' ? 'wait' : 'buy-bundle',
        reasoning:
          event.id === 'event-river-crossing'
            ? 'Waiting costs $5 and one day; the ferry costs $24. We have enough season days left, so waiting protects the cargo and saves $19.'
            : 'One bundle costs $18 ÷ 4 = $4.50. Buying it uses reserve cash to prevent a later delay.',
        mathAnswer: event.mathChallenge?.answer,
      });
    } else act({ type: 'travel.advanced' });
  }
  if (state.activeTravel) throw new Error('Sample journey did not arrive.');
  trade('sell', 'flour', 2);
  trade('sell', 'salt', 4);
  act({ type: 'season.completed' });
  const results = seasonResults(config, state);
  const actual =
    results.salesRevenueCents -
    results.goodsPurchasedCents -
    results.supplyCostsCents -
    results.eventExpensesCents +
    results.eventIncomeCents;
  for (const entry of state.ledger.filter((item) => item.type === 'sale'))
    act({
      type: 'evidence.pinned',
      reference: {
        id: 'proof-' + entry.id,
        sourceType: 'ledger',
        sourceId: entry.id,
        title: entry.description,
        summary:
          money(entry.cashChangeCents) +
          ' revenue, ' +
          money(entry.details?.costBasisCents ?? 0) +
          ' purchase cost.',
      },
    });
  act({
    type: 'evidence.pinned',
    reference: {
      id: 'proof-route',
      sourceType: 'route',
      sourceId: state.routeHistory[0].id,
      title: 'Forecast before departure',
      summary: 'Expected trip profit ' + money(forecast.expectedTripProfitCents),
    },
  });
  const sections: Record<string, { response: string; calculation: string }> = {
    'my-plan': {
      response:
        'Our first plan was to fill the wagon. Comparing prices showed we also needed cash for supplies and surprises. We carried two flour sacks and four salt sacks, kept a reserve, and chose Green River Trail for its food demand.',
      calculation: '',
    },
    'best-trade-math': {
      response:
        'We forecast ' +
        money(forecast.expectedTripProfitCents) +
        ' trip profit. Actual trip profit was ' +
        money(actual) +
        '. The ' +
        money(results.eventExpensesCents) +
        ' in unplanned event costs explains the difference. Including the wagon, the full season net result was ' +
        money(results.netProfitCents) +
        '. Trip profit and season profit answer different questions.',
      calculation:
        money(results.salesRevenueCents) +
        ' sales − ' +
        money(results.goodsPurchasedCents) +
        ' goods − ' +
        money(results.supplyCostsCents) +
        ' travel − ' +
        money(results.eventExpensesCents) +
        ' events = ' +
        money(actual) +
        ' trip profit; ' +
        money(actual) +
        ' − ' +
        money(results.transportCostCents) +
        ' wagon = ' +
        money(results.netProfitCents) +
        ' season net.',
    },
    'route-choice': {
      response:
        'At the flooded crossing we waited one day for $5 instead of paying $24 for the ferry. Both protected the cargo; waiting preserved $19 because our schedule had room. A tighter deadline could have changed our choice.',
      calculation: '$24.00 − $5.00 = $19.00 preserved; $18.00 ÷ 4 = $4.50 per repair bundle.',
    },
    'next-season': {
      response:
        'Our first claim was “we made money because we sold above purchase price.” The ledger showed that this left out the wagon, supplies, and events. We revised our defense to separate trade margin, trip profit, and full-season net. Next time we would compare a less expensive transport and forecast an emergency allowance.',
      calculation:
        money(results.endingCashCents) +
        ' ending cash − ' +
        money(results.startingCashCents) +
        ' starting cash = ' +
        money(results.netProfitCents) +
        ' season net.',
    },
  };
  for (const section of config.reportSections)
    act({
      type: 'report.sectionUpdated',
      sectionId: section.id,
      ...sections[section.id],
      evidenceIds: state.evidence.map((item) => item.id),
    });
  act({ type: 'report.submitted' });
  // The engine's timestamps are normalized only in this fictional fixture, preserving deterministic playback.
  return JSON.parse(
    JSON.stringify(
      {
        ...state,
        simulationId: 'completed-sample-trading',
        lastView: 'showcase',
        report: { ...state.report, revisionNumber: 2 },
      },
      (key, value) =>
        ['createdAt', 'pinnedAt', 'lastSavedAt', 'completedAt', 'submittedAt'].includes(key)
          ? date
          : value,
    ),
  ) as SimulationDecisionState;
}
export function simulationSampleGuide(state: SimulationDecisionState): SampleGuide {
  const results = seasonResults(config, state);
  return {
    title: 'The Company Defense',
    subtitle:
      'One season on the trail, presented through the company’s own route, ledger, forecast, and revised strategy. Follow the five-part defense.',
    audience: 'Mathematics · Grades 5–6',
    duration: 'Five slides · 2–3 minutes',
    trail: [
      {
        label: 'Plan',
        title: 'Keep cash for the unknown.',
        text: state.report.sections['my-plan'].response,
        evidence: 'Plan slide: original route, opening cargo, and purchase costs.',
      },
      {
        label: 'Consequence',
        title: 'Fast water changes the forecast.',
        text: state.eventHistory.find((event) => event.eventId === 'event-river-crossing')!
          .reasoning,
        evidence: 'Revise slide: saved choice, before/after cash, and outcome.',
      },
      {
        label: 'Audit',
        title: 'A sale is not the whole season.',
        text:
          'The ledger ends at ' +
          money(results.endingCashCents) +
          '. Every purchase, supply cost, event, and sale contributes to the result.',
        evidence: 'Math slide: the native engine’s reconciled totals.',
      },
      {
        label: 'Revision',
        title: 'Defend the result, including the loss.',
        text: state.report.sections['next-season'].response,
        evidence: 'Defend slide: prepared claims and peer questions.',
      },
    ],
    review: {
      strength:
        'The company distinguishes sales revenue, trip profit, and the full-season result, and explains a decision using its saved ledger.',
      question:
        'Which decision protected profit, and which numbers prove it? Would that decision still make sense with one day left?',
      revision:
        '“Selling for more means success” becomes a defense that includes the cost of the wagon and unplanned events.',
      assessment:
        'Assess the arithmetic and reasoning separately from how profitable the simulated company was. A negative season result can still support strong mathematical learning.',
    },
  };
}
