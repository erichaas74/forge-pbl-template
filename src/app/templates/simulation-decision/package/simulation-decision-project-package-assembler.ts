import { ImmutableMap, ImmutableSet } from '../../../core/collections/immutable-collections';
import type { BaseEntity } from '../../../core/models/base-entity';
import type {
  ProjectPackageAssembler,
  ProjectPackageAssemblyResult,
  ProjectPackageDescriptor,
  ProjectPackageFiles,
  ProjectPackageLocation,
} from '../../../core/packages/project-package-contracts';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type {
  MarketDefinition,
  ReportSectionDefinition,
  RouteDefinition,
  SimulationDecisionConfig,
  SimulationEventDefinition,
} from '../domain/simulation-decision.models';
import type {
  ChallengeGatesPackage,
  EvidenceMappingsPackage,
  ResourceAccountsPackage,
  ScoringPackage,
  SimulationDecisionDefinition,
  SimulationDecisionDefinitionGraph,
  SimulationDecisionProjectManifest,
  VersionedEntity,
} from './simulation-decision-package-contracts';
import type { ExchangeDefinition, LiveSessionDefinition } from '../../../shared';

export const simulationDecisionProjectPackageDescriptor: ProjectPackageDescriptor = {
  requiredFiles: [
    'project.json',
    'simulation.json',
    'markets.json',
    'routes.json',
    'events.json',
    'reports.json',
  ],
  optionalFiles: [
    'live-session.json',
    'accounts.json',
    'exchange.json',
    'challenge-gates.json',
    'scoring.json',
    'evidence-mappings.json',
  ],
};

export class SimulationDecisionProjectPackageAssembler implements ProjectPackageAssembler<SimulationDecisionDefinitionGraph> {
  assemble(
    location: ProjectPackageLocation,
    files: ProjectPackageFiles,
  ): ProjectPackageAssemblyResult<SimulationDecisionDefinitionGraph> {
    const issues: ValidationIssue[] = [];
    const manifest = manifestEntity(files['project.json'], 'project.json', issues);
    const simulation = simulationEntity(files['simulation.json'], 'simulation.json', issues);
    if (manifest === undefined || simulation === undefined) {
      return { issues };
    }

    validateManifest(location, manifest, issues);
    const seen = new Set<string>();
    trackEntity(manifest, 'project.json', seen, issues);
    trackEntity(simulation, 'simulation.json', seen, issues);
    for (const item of [...simulation.transports, ...simulation.goods, ...simulation.locations]) {
      trackEntity(item, 'simulation.json', seen, issues);
    }

    const marketsById = collection<MarketDefinition>(
      files['markets.json'],
      'markets.json',
      seen,
      issues,
      (item) => typeof item['locationId'] === 'string' && Array.isArray(item['goods']),
    );
    const routesById = collection<RouteDefinition>(
      files['routes.json'],
      'routes.json',
      seen,
      issues,
      (item) =>
        typeof item['fromLocationId'] === 'string' &&
        typeof item['toLocationId'] === 'string' &&
        Array.isArray(item['terrain']),
    );
    const eventsById = collection<SimulationEventDefinition>(
      files['events.json'],
      'events.json',
      seen,
      issues,
      (item) => Array.isArray(item['facts']) && Array.isArray(item['choices']),
    );
    const reportSectionsById = collection<ReportSectionDefinition>(
      files['reports.json'],
      'reports.json',
      seen,
      issues,
      (item) => typeof item['prompt'] === 'string' && typeof item['evidenceMinimum'] === 'number',
    );

    const liveSession = optionalEntity<LiveSessionDefinition>(
      files['live-session.json'],
      'live-session.json',
      seen,
      issues,
      (item) => Array.isArray(item['stages']),
    );
    const resourceAccounts = optionalEntity<ResourceAccountsPackage>(
      files['accounts.json'],
      'accounts.json',
      seen,
      issues,
      (item) => Array.isArray(item['units']) && Array.isArray(item['accounts']),
    );
    const exchange = optionalEntity<ExchangeDefinition>(
      files['exchange.json'],
      'exchange.json',
      seen,
      issues,
      (item) => Array.isArray(item['accountDefinitionIds']),
    );
    const challengeGates = optionalEntity<ChallengeGatesPackage>(
      files['challenge-gates.json'],
      'challenge-gates.json',
      seen,
      issues,
      (item) => Array.isArray(item['items']),
    );
    const scoring = optionalEntity<ScoringPackage>(
      files['scoring.json'],
      'scoring.json',
      seen,
      issues,
      (item) => Array.isArray(item['categories']) && Array.isArray(item['slots']),
    );
    const evidenceMappings = optionalEntity<EvidenceMappingsPackage>(
      files['evidence-mappings.json'],
      'evidence-mappings.json',
      seen,
      issues,
      (item) => Array.isArray(item['items']),
    );

    if (issues.some((issue) => issue.severity === 'error')) {
      return { issues };
    }

    const config = assembleConfig(
      location,
      manifest,
      simulation,
      marketsById,
      routesById,
      eventsById,
      reportSectionsById,
    );

    return {
      graph: {
        tenantId: location.tenantId,
        projectId: location.projectId,
        projectVersion: location.projectVersion,
        manifest: freeze(manifest),
        simulation: freeze(simulation),
        config: freeze(config),
        marketsById,
        routesById,
        eventsById,
        reportSectionsById,
        capabilities: new ImmutableSet(manifest.capabilities),
        liveSession: freezeOptional(liveSession),
        resourceAccounts: freezeOptional(resourceAccounts),
        exchange: freezeOptional(exchange),
        challengeGates: freezeOptional(challengeGates),
        scoring: freezeOptional(scoring),
        evidenceMappings: freezeOptional(evidenceMappings),
      },
      issues,
    };
  }
}

function assembleConfig(
  location: ProjectPackageLocation,
  manifest: SimulationDecisionProjectManifest,
  simulation: SimulationDecisionDefinition,
  markets: ReadonlyMap<string, Readonly<VersionedEntity<MarketDefinition>>>,
  routes: ReadonlyMap<string, Readonly<VersionedEntity<RouteDefinition>>>,
  events: ReadonlyMap<string, Readonly<VersionedEntity<SimulationEventDefinition>>>,
  reports: ReadonlyMap<string, Readonly<VersionedEntity<ReportSectionDefinition>>>,
): SimulationDecisionConfig {
  return {
    schemaVersion: simulation.schemaVersion,
    template: { id: 'simulation-decision', version: manifest.template.version },
    projectId: location.projectId,
    projectVersion: location.projectVersion,
    title: simulation.title,
    subtitle: simulation.subtitle,
    gradeLabel: simulation.gradeLabel,
    mission: simulation.mission,
    startingCashCents: simulation.startingCashCents,
    reserveTargetCents: simulation.reserveTargetCents,
    profitTargetCents: simulation.profitTargetCents,
    startingLocationId: simulation.startingLocationId,
    maxSeasonDays: simulation.maxSeasonDays,
    choiceProgression: simulation.choiceProgression,
    routeForecastChallenge: simulation.routeForecastChallenge,
    transactionMath: simulation.transactionMath,
    emblems: simulation.emblems,
    transports: simulation.transports,
    goods: simulation.goods,
    locations: simulation.locations,
    world: simulation.world,
    markets: [...markets.values()],
    routes: [...routes.values()],
    events: [...events.values()],
    reportSections: [...reports.values()],
  };
}

function validateManifest(
  location: ProjectPackageLocation,
  manifest: SimulationDecisionProjectManifest,
  issues: ValidationIssue[],
): void {
  if (manifest.id !== location.projectId) {
    issues.push({
      code: 'PROJECT_ID_MISMATCH',
      severity: 'error',
      file: 'project.json',
      entityId: manifest.id,
      message: `Manifest ID "${manifest.id}" does not match requested project "${location.projectId}".`,
    });
  }
  if (manifest.template?.id !== 'simulation-decision') {
    issues.push({
      code: 'TEMPLATE_NOT_SUPPORTED',
      severity: 'error',
      file: 'project.json',
      entityId: manifest.id,
      message: 'Project package does not declare the simulation-decision template.',
    });
  }
  if (manifest.projectType !== 'simulation-decision') {
    issues.push({
      code: 'PROJECT_TYPE_UNSUPPORTED',
      severity: 'error',
      file: 'project.json',
      entityId: manifest.id,
      message: 'simulation-decision packages must use projectType "simulation-decision".',
    });
  }
  if (manifest.schemaVersion.split('.')[0] !== '1') {
    issues.push({
      code: 'SCHEMA_VERSION_UNSUPPORTED',
      severity: 'error',
      file: 'project.json',
      entityId: manifest.id,
      message: `Schema version "${manifest.schemaVersion}" is not supported by this loader.`,
    });
  }
}

function collection<T extends { id: string }>(
  value: unknown,
  file: string,
  seen: Set<string>,
  issues: ValidationIssue[],
  isValid: (item: Record<string, unknown>) => boolean,
): ReadonlyMap<string, Readonly<VersionedEntity<T>>> {
  if (
    !isRecord(value) ||
    typeof value['schemaVersion'] !== 'string' ||
    !Array.isArray(value['items'])
  ) {
    issues.push({
      code: 'INVALID_FILE_SHAPE',
      severity: 'error',
      file,
      message: `Project file "${file}" must contain schemaVersion and an items array.`,
    });
    return new ImmutableMap();
  }
  const entries: Array<readonly [string, Readonly<VersionedEntity<T>>]> = [];
  for (const item of value['items']) {
    if (!isEntity(item) || !isValid(item)) {
      issues.push({
        code: 'INVALID_ENTITY',
        severity: 'error',
        file,
        message: `Project file "${file}" contains an entity without stable id/schemaVersion.`,
      });
      continue;
    }
    trackEntity(item, file, seen, issues);
    entries.push([item.id, freeze(item as VersionedEntity<T>)]);
  }
  return new ImmutableMap(entries);
}

function optionalEntity<T extends BaseEntity>(
  value: unknown,
  file: string,
  seen: Set<string>,
  issues: ValidationIssue[],
  isValid: (item: Record<string, unknown>) => boolean,
): T | undefined {
  if (value === undefined) {
    return undefined;
  }
  const result = entity<T>(value, file, issues);
  if (result !== undefined && !isValid(result as unknown as Record<string, unknown>)) {
    issues.push({
      code: 'INVALID_FILE_SHAPE',
      severity: 'error',
      file,
      entityId: result.id,
      message: `Project file "${file}" does not match its capability contract.`,
    });
    return undefined;
  }
  if (result !== undefined) {
    trackEntity(result, file, seen, issues);
  }
  return result;
}

function entity<T extends BaseEntity>(
  value: unknown,
  file: string,
  issues: ValidationIssue[],
): T | undefined {
  if (!isEntity(value)) {
    issues.push({
      code: 'INVALID_ENTITY',
      severity: 'error',
      file,
      message: `Project file "${file}" must contain an entity with id and schemaVersion.`,
    });
    return undefined;
  }
  return value as T;
}

function manifestEntity(
  value: unknown,
  file: string,
  issues: ValidationIssue[],
): SimulationDecisionProjectManifest | undefined {
  const result = entity<SimulationDecisionProjectManifest>(value, file, issues);
  if (
    result !== undefined &&
    (!Array.isArray(result.capabilities) ||
      result.capabilities.some((capability) => typeof capability !== 'string'))
  ) {
    issues.push({
      code: 'INVALID_FILE_SHAPE',
      severity: 'error',
      file,
      entityId: result.id,
      message: 'project.json capabilities must be an array of registered capability IDs.',
    });
    return undefined;
  }
  return result;
}

function simulationEntity(
  value: unknown,
  file: string,
  issues: ValidationIssue[],
): SimulationDecisionDefinition | undefined {
  const result = entity<SimulationDecisionDefinition>(value, file, issues);
  if (
    result !== undefined &&
    (!Array.isArray(result.emblems) ||
      !Array.isArray(result.transports) ||
      !Array.isArray(result.goods) ||
      !Array.isArray(result.locations) ||
      !isRecord(result.world) ||
      !Array.isArray(result.world.locations) ||
      (result.choiceProgression !== undefined &&
        !isChoiceProgressionShape(result.choiceProgression)) ||
      (result.routeForecastChallenge !== undefined &&
        !isRouteForecastChallengeShape(result.routeForecastChallenge)) ||
      (result.transactionMath !== undefined && !isTransactionMathShape(result.transactionMath)))
  ) {
    issues.push({
      code: 'INVALID_FILE_SHAPE',
      severity: 'error',
      file,
      entityId: result.id,
      message:
        'simulation.json must define emblems, transports, goods, locations, world locations, and valid optional progression, route forecast, and transaction math settings.',
    });
    return undefined;
  }
  return result;
}

function trackEntity(
  value: BaseEntity,
  file: string,
  seen: Set<string>,
  issues: ValidationIssue[],
): void {
  if (seen.has(value.id)) {
    issues.push({
      code: 'DUPLICATE_ID',
      severity: 'error',
      file,
      entityId: value.id,
      message: `ID "${value.id}" is duplicated across the project package.`,
    });
  }
  seen.add(value.id);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isChoiceProgressionShape(value: unknown): boolean {
  if (!isRecord(value) || !Array.isArray(value['stages']) || value['stages'].length === 0) {
    return false;
  }
  return value['stages'].every((stage) => {
    if (
      !isRecord(stage) ||
      typeof stage['id'] !== 'string' ||
      typeof stage['title'] !== 'string' ||
      typeof stage['description'] !== 'string' ||
      !isStringArray(stage['availableGoodIds']) ||
      !isStringArray(stage['availableRouteIds'])
    ) {
      return false;
    }
    const requirements = stage['requirements'];
    return (
      requirements === undefined ||
      (isRecord(requirements) &&
        isOptionalCount(requirements['minimumDiscoveredStalls']) &&
        isOptionalCount(requirements['minimumPurchasedGoodTypes']))
    );
  });
}

function isRouteForecastChallengeShape(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value['requiredBeforeDeparture'] === 'boolean' &&
    Number.isInteger(value['toleranceCents']) &&
    (value['toleranceCents'] as number) >= 0
  );
}

function isTransactionMathShape(value: unknown): boolean {
  if (
    !isRecord(value) ||
    typeof value['answerRequired'] !== 'boolean' ||
    !Array.isArray(value['purchaseDiscountTiers'])
  ) {
    return false;
  }
  const minimums = new Set<number>();
  return value['purchaseDiscountTiers'].every((tier) => {
    if (
      !isRecord(tier) ||
      !Number.isInteger(tier['minimumQuantity']) ||
      (tier['minimumQuantity'] as number) < 1 ||
      typeof tier['discountPercent'] !== 'number' ||
      !Number.isFinite(tier['discountPercent']) ||
      (tier['discountPercent'] as number) <= 0 ||
      (tier['discountPercent'] as number) >= 100 ||
      minimums.has(tier['minimumQuantity'] as number)
    ) {
      return false;
    }
    minimums.add(tier['minimumQuantity'] as number);
    return true;
  });
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isOptionalCount(value: unknown): boolean {
  return value === undefined || (Number.isInteger(value) && (value as number) >= 0);
}

function isEntity(value: unknown): value is BaseEntity & Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    value['id'].length > 0 &&
    typeof value['schemaVersion'] === 'string'
  );
}

function freezeOptional<T>(value: T | undefined): Readonly<T> | undefined {
  return value === undefined ? undefined : freeze(value);
}

function freeze<T>(value: T): Readonly<T> {
  return deepFreeze(structuredClone(value));
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== 'object' || value === null || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const nested of Object.values(value as Record<string, unknown>)) {
    deepFreeze(nested);
  }
  return value;
}
