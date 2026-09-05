import type {
  ChoiceProgressionRequirement,
  ChoiceProgressionStageDefinition,
  SimulationDecisionConfig,
  SimulationDecisionState,
} from './simulation-decision.models';

export interface ChoiceProgressMetric {
  key: keyof ChoiceProgressionRequirement;
  label: string;
  current: number;
  target: number;
  complete: boolean;
}

export interface ChoiceProgressionView {
  enabled: boolean;
  currentStage: ChoiceProgressionStageDefinition;
  currentStageIndex: number;
  stageCount: number;
  nextStage?: ChoiceProgressionStageDefinition;
  nextRequirements: readonly ChoiceProgressMetric[];
}

export function choiceProgression(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
): ChoiceProgressionView {
  const configuredStages = config.choiceProgression?.stages ?? [];
  const stages = configuredStages.length > 0 ? configuredStages : [fallbackStage(config)];
  const metrics = progressionMetrics(state);
  let currentStageIndex = 0;

  for (let index = 1; index < stages.length; index += 1) {
    if (!requirementsMet(stages[index]?.requirements, metrics)) break;
    currentStageIndex = index;
  }

  const currentStage = stages[currentStageIndex]!;
  const nextStage = stages[currentStageIndex + 1];
  return {
    enabled: configuredStages.length > 0,
    currentStage,
    currentStageIndex,
    stageCount: stages.length,
    nextStage,
    nextRequirements: requirementProgress(nextStage?.requirements, metrics),
  };
}

export function goodIsUnlocked(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  goodId: string,
): boolean {
  return choiceProgression(config, state).currentStage.availableGoodIds.includes(goodId);
}

export function routeIsUnlocked(
  config: SimulationDecisionConfig,
  state: Readonly<SimulationDecisionState>,
  routeId: string,
): boolean {
  return choiceProgression(config, state).currentStage.availableRouteIds.includes(routeId);
}

function progressionMetrics(state: Readonly<SimulationDecisionState>): {
  discoveredStalls: number;
  purchasedGoodTypes: number;
} {
  const discoveredStalls = Object.entries(state.marketDiscoveries).reduce(
    (total, [, stallIds]) => total + new Set(stallIds).size,
    0,
  );
  return {
    discoveredStalls,
    purchasedGoodTypes: new Set(
      state.ledger
        .filter((entry) => entry.type === 'purchase')
        .map((entry) => entry.details?.goodId)
        .filter((goodId): goodId is string => goodId !== undefined),
    ).size,
  };
}

function requirementsMet(
  requirements: ChoiceProgressionRequirement | undefined,
  metrics: ReturnType<typeof progressionMetrics>,
): boolean {
  return requirementProgress(requirements, metrics).every((metric) => metric.complete);
}

function requirementProgress(
  requirements: ChoiceProgressionRequirement | undefined,
  metrics: ReturnType<typeof progressionMetrics>,
): ChoiceProgressMetric[] {
  const result: ChoiceProgressMetric[] = [];
  if ((requirements?.minimumDiscoveredStalls ?? 0) > 0) {
    const target = requirements!.minimumDiscoveredStalls!;
    result.push({
      key: 'minimumDiscoveredStalls',
      label: 'Explore market stalls',
      current: Math.min(metrics.discoveredStalls, target),
      target,
      complete: metrics.discoveredStalls >= target,
    });
  }
  if ((requirements?.minimumPurchasedGoodTypes ?? 0) > 0) {
    const target = requirements!.minimumPurchasedGoodTypes!;
    result.push({
      key: 'minimumPurchasedGoodTypes',
      label: 'Load different supplies',
      current: Math.min(metrics.purchasedGoodTypes, target),
      target,
      complete: metrics.purchasedGoodTypes >= target,
    });
  }
  return result;
}

function fallbackStage(config: SimulationDecisionConfig): ChoiceProgressionStageDefinition {
  return {
    id: 'all-choices',
    title: 'All choices available',
    description: 'Every configured supply and route is available.',
    availableGoodIds: config.goods.map((good) => good.id),
    availableRouteIds: config.routes.map((route) => route.id),
  };
}
