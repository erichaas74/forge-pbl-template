import type { CapabilityRegistryView } from '../../../core/registries/registration-contracts';
import type {
  ProjectValidator,
  ValidationIssue,
} from '../../../core/validation/validation-contracts';
import type { SimulationDecisionDefinitionGraph } from './simulation-decision-package-contracts';

const requiredSimulationCapabilities = [
  'simulationDecision',
  'markets',
  'routes',
  'scenarioEvents',
  'strategyReport',
] as const;

const capabilityFileChecks: Readonly<
  Record<string, (graph: SimulationDecisionDefinitionGraph) => boolean>
> = {
  liveSession: (graph) => graph.liveSession !== undefined,
  resourceAccounts: (graph) => graph.resourceAccounts !== undefined,
  multiPartyExchange: (graph) => graph.exchange !== undefined,
  challengeGates: (graph) => graph.challengeGates !== undefined,
  awardLedger: (graph) => graph.scoring !== undefined,
  activityEvidenceBridge: (graph) => graph.evidenceMappings !== undefined,
};

export class SimulationDecisionCapabilityValidator implements ProjectValidator<
  SimulationDecisionDefinitionGraph,
  CapabilityRegistryView
> {
  readonly id = 'simulation-decision-capabilities';

  validate(
    graph: SimulationDecisionDefinitionGraph,
    registry: CapabilityRegistryView,
  ): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    for (const capabilityId of requiredSimulationCapabilities) {
      if (!graph.capabilities.has(capabilityId)) {
        issues.push({
          code: 'REQUIRED_CAPABILITY_MISSING',
          severity: 'error',
          entityId: graph.manifest.id,
          capabilityId,
          message: `simulation-decision requires capability "${capabilityId}".`,
        });
      }
    }
    for (const capabilityId of graph.capabilities) {
      const registration = registry.get(capabilityId);
      if (registration === undefined) {
        issues.push({
          code: 'CAPABILITY_NOT_INSTALLED',
          severity: 'error',
          entityId: graph.manifest.id,
          capabilityId,
          message: `Required capability "${capabilityId}" is not registered.`,
        });
      } else if (registration.status === 'future') {
        issues.push({
          code: 'CAPABILITY_NOT_AVAILABLE',
          severity: 'error',
          entityId: graph.manifest.id,
          capabilityId,
          message: `Capability "${capabilityId}" has a registered contract but no installed runtime implementation.`,
        });
      }

      const hasRequiredFile = capabilityFileChecks[capabilityId];
      if (hasRequiredFile !== undefined && !hasRequiredFile(graph)) {
        issues.push({
          code: 'CAPABILITY_FILE_MISSING',
          severity: 'error',
          entityId: graph.manifest.id,
          capabilityId,
          message: `Capability "${capabilityId}" requires its corresponding package file.`,
        });
      }
    }
    return issues;
  }
}

export class SimulationDecisionReferenceValidator implements ProjectValidator<
  SimulationDecisionDefinitionGraph,
  CapabilityRegistryView
> {
  readonly id = 'simulation-decision-references';

  validate(graph: SimulationDecisionDefinitionGraph): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const locationIds = new Set(graph.simulation.locations.map((location) => location.id));
    const goodIds = new Set(graph.simulation.goods.map((good) => good.id));
    const routeIds = new Set(graph.routesById.keys());
    const accountIds = new Set(graph.resourceAccounts?.accounts.map((account) => account.id) ?? []);
    const unitIds = new Set(graph.resourceAccounts?.units.map((unit) => unit.id) ?? []);
    const challengeGateIds = new Set(graph.challengeGates?.items.map((gate) => gate.id) ?? []);
    const awardCategoryIds = new Set(
      graph.scoring?.categories.map((category) => category.id) ?? [],
    );

    requireReference(
      locationIds.has(graph.simulation.startingLocationId),
      graph.simulation.id,
      graph.simulation.startingLocationId,
      'starting location',
      issues,
    );

    for (const market of graph.marketsById.values()) {
      requireReference(
        locationIds.has(market.locationId),
        market.id,
        market.locationId,
        'location',
        issues,
      );
      for (const item of market.goods) {
        requireReference(goodIds.has(item.goodId), market.id, item.goodId, 'good', issues);
      }
    }

    for (const route of graph.routesById.values()) {
      requireReference(
        locationIds.has(route.fromLocationId),
        route.id,
        route.fromLocationId,
        'origin',
        issues,
      );
      requireReference(
        locationIds.has(route.toLocationId),
        route.id,
        route.toLocationId,
        'destination',
        issues,
      );
    }

    const progressionStages = graph.simulation.choiceProgression?.stages ?? [];
    for (const [index, stage] of progressionStages.entries()) {
      for (const goodId of stage.availableGoodIds) {
        requireReference(goodIds.has(goodId), stage.id, goodId, 'progression good', issues);
      }
      for (const routeId of stage.availableRouteIds) {
        requireReference(routeIds.has(routeId), stage.id, routeId, 'progression route', issues);
      }
      if (index > 0 && !hasPositiveRequirement(stage.requirements)) {
        issues.push({
          code: 'PROGRESSION_REQUIREMENT_MISSING',
          severity: 'error',
          entityId: stage.id,
          message: `Progression stage "${stage.id}" must define a positive unlock requirement.`,
        });
      }
      const prior = progressionStages[index - 1];
      if (
        prior !== undefined &&
        (!isSuperset(stage.availableGoodIds, prior.availableGoodIds) ||
          !isSuperset(stage.availableRouteIds, prior.availableRouteIds))
      ) {
        issues.push({
          code: 'PROGRESSION_CHOICES_REGRESS',
          severity: 'error',
          entityId: stage.id,
          relatedEntityIds: [prior.id],
          message: `Progression stage "${stage.id}" must retain every choice from "${prior.id}".`,
        });
      }
    }

    for (const scene of graph.simulation.world.locations) {
      requireReference(
        locationIds.has(scene.locationId),
        graph.simulation.id,
        scene.locationId,
        'world location',
        issues,
      );
    }

    for (const account of graph.resourceAccounts?.accounts ?? []) {
      requireReference(
        unitIds.has(account.unitId),
        account.id,
        account.unitId,
        'resource unit',
        issues,
      );
    }

    if (graph.exchange !== undefined) {
      for (const accountId of graph.exchange.accountDefinitionIds) {
        requireReference(
          accountIds.has(accountId),
          graph.exchange.id,
          accountId,
          'account definition',
          issues,
        );
      }
      for (const gateId of graph.exchange.challengeGateDefinitionIds ?? []) {
        requireReference(
          challengeGateIds.has(gateId),
          graph.exchange.id,
          gateId,
          'challenge gate',
          issues,
        );
      }
    }

    for (const slot of graph.scoring?.slots ?? []) {
      requireReference(
        awardCategoryIds.has(slot.categoryId),
        slot.id,
        slot.categoryId,
        'award category',
        issues,
      );
    }

    collectDuplicateIds(
      [
        ...(graph.liveSession?.stages ?? []),
        ...(graph.resourceAccounts?.units ?? []),
        ...(graph.resourceAccounts?.accounts ?? []),
        ...(graph.challengeGates?.items ?? []),
        ...(graph.scoring?.categories ?? []),
        ...(graph.scoring?.slots ?? []),
        ...(graph.evidenceMappings?.items ?? []),
        ...progressionStages,
      ],
      issues,
    );

    return issues;
  }
}

function hasPositiveRequirement(
  requirements:
    | {
        minimumDiscoveredStalls?: number;
        minimumPurchasedGoodTypes?: number;
      }
    | undefined,
): boolean {
  return (
    (requirements?.minimumDiscoveredStalls ?? 0) > 0 ||
    (requirements?.minimumPurchasedGoodTypes ?? 0) > 0
  );
}

function isSuperset(current: readonly string[], prior: readonly string[]): boolean {
  const available = new Set(current);
  return prior.every((id) => available.has(id));
}

function requireReference(
  exists: boolean,
  sourceId: string,
  targetId: string,
  relation: string,
  issues: ValidationIssue[],
): void {
  if (!exists) {
    issues.push({
      code: 'REFERENCE_NOT_FOUND',
      severity: 'error',
      entityId: sourceId,
      relatedEntityIds: [targetId],
      message: `${sourceId} references missing ${relation} "${targetId}".`,
    });
  }
}

function collectDuplicateIds(
  entities: readonly { readonly id: string }[],
  issues: ValidationIssue[],
): void {
  const seen = new Set<string>();
  for (const entity of entities) {
    if (seen.has(entity.id)) {
      issues.push({
        code: 'DUPLICATE_ID',
        severity: 'error',
        entityId: entity.id,
        message: `ID "${entity.id}" is duplicated across live capability definitions.`,
      });
    }
    seen.add(entity.id);
  }
}
