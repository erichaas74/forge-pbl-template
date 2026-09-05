import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { choiceProgression, goodIsUnlocked, routeIsUnlocked } from './choice-progression';
import {
  createSimulationState,
  previewTrade,
  reduceSimulationDecision,
} from './simulation-decision.engine';
import type {
  SimulationDecisionAction,
  SimulationDecisionState,
} from './simulation-decision.models';

describe('choice progression', () => {
  it('starts with a focused set and unlocks the full network from one accurate starter manifest', () => {
    let state = started();
    let view = choiceProgression(frontierTradingConfig, state);

    expect(view.currentStage.id).toBe('starter-outfitter');
    expect(view.currentStage.availableGoodIds).toHaveLength(3);
    expect(view.currentStage.availableRouteIds).toHaveLength(2);
    expect(goodIsUnlocked(frontierTradingConfig, state, 'coffee')).toBe(false);
    expect(routeIsUnlocked(frontierTradingConfig, state, 'route-miners')).toBe(false);

    const scene = frontierTradingConfig.world.locations.find(
      (item) => item.locationId === state.currentLocationId,
    )!;
    for (const stall of scene.stalls.slice(0, 3)) {
      state = act(state, { type: 'market.stallInspected', stallId: stall.id });
    }
    state = act(state, {
      type: 'trade.committed',
      lines: [
        { goodId: 'flour', direction: 'buy', quantity: 1, studentTotalCents: 2_244 },
        { goodId: 'salt', direction: 'buy', quantity: 1, studentTotalCents: 1_425 },
      ],
    });

    view = choiceProgression(frontierTradingConfig, state);
    expect(view.currentStage.id).toBe('master-outfitter');
    expect(view.currentStage.availableGoodIds).toHaveLength(frontierTradingConfig.goods.length);
    expect(routeIsUnlocked(frontierTradingConfig, state, 'route-miners')).toBe(true);
  });

  it('rejects locked supplies and routes at the domain boundary', () => {
    const state = started();

    expect(
      previewTrade(frontierTradingConfig, state, [
        { goodId: 'coffee', direction: 'buy', quantity: 1 },
      ]).errors,
    ).toContain('Coffee: finish the current trading mission to unlock this good.');
    expect(
      reduceSimulationDecision(frontierTradingConfig, state, {
        type: 'route.committed',
        routeId: 'route-miners',
        rationale: 'This route has the strongest expected demand.',
      }).errors,
    ).toContain('Finish the current trading mission to unlock this route.');
  });

  it('keeps every choice available when a project does not configure progression', () => {
    const config = { ...frontierTradingConfig, choiceProgression: undefined };
    const view = choiceProgression(config, createSimulationState(config));

    expect(view.enabled).toBe(false);
    expect(view.currentStage.availableGoodIds).toHaveLength(config.goods.length);
    expect(view.currentStage.availableRouteIds).toHaveLength(config.routes.length);
  });
});

function started(): SimulationDecisionState {
  return act(createSimulationState(frontierTradingConfig, 42), {
    type: 'company.started',
    companyName: 'Progress Traders',
    emblemId: 'compass',
    transportId: 'mule-train',
  });
}

function act(
  state: Readonly<SimulationDecisionState>,
  action: SimulationDecisionAction,
): SimulationDecisionState {
  const result = reduceSimulationDecision(frontierTradingConfig, state, action);
  expect(result.errors).toEqual([]);
  return result.state;
}
