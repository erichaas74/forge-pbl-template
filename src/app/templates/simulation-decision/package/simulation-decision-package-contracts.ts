import type { BaseEntity } from '../../../core/models/base-entity';
import type {
  ActivityEvidenceMappingDefinition,
  AwardCategoryDefinition,
  AwardSlotDefinition,
  ChallengeGateDefinition,
  ExchangeDefinition,
  LiveSessionDefinition,
  ResourceAccountDefinition,
  ResourceUnitDefinition,
} from '../../../shared';
import type {
  GoodDefinition,
  LocationDefinition,
  MarketDefinition,
  ReportSectionDefinition,
  RouteDefinition,
  SimulationDecisionConfig,
  SimulationEventDefinition,
  SimulationWorldDefinition,
  TransportDefinition,
} from '../domain/simulation-decision.models';

export interface SimulationDecisionProjectManifest extends BaseEntity {
  readonly title: string;
  readonly template: {
    readonly id: 'simulation-decision';
    readonly version: string;
  };
  readonly projectType: 'simulation-decision';
  readonly status: 'draft' | 'review' | 'published' | 'archived';
  readonly simulationConfigRef: 'simulation.json';
  readonly capabilities: readonly string[];
}

export interface SimulationDecisionDefinition extends BaseEntity {
  readonly title: string;
  readonly subtitle: string;
  readonly gradeLabel: string;
  readonly mission: string;
  readonly startingCashCents: number;
  readonly reserveTargetCents: number;
  readonly profitTargetCents: number;
  readonly startingLocationId: string;
  readonly maxSeasonDays: number;
  readonly choiceProgression?: SimulationDecisionConfig['choiceProgression'];
  readonly routeForecastChallenge?: SimulationDecisionConfig['routeForecastChallenge'];
  readonly transactionMath?: SimulationDecisionConfig['transactionMath'];
  readonly emblems: SimulationDecisionConfig['emblems'];
  readonly transports: readonly VersionedEntity<TransportDefinition>[];
  readonly goods: readonly VersionedEntity<GoodDefinition>[];
  readonly locations: readonly VersionedEntity<LocationDefinition>[];
  readonly world: SimulationWorldDefinition;
}

export type VersionedEntity<T> = T & BaseEntity;

export interface VersionedEntityCollection<T> {
  readonly schemaVersion: string;
  readonly items: readonly VersionedEntity<T>[];
}

export interface ResourceAccountsPackage extends BaseEntity {
  readonly units: readonly ResourceUnitDefinition[];
  readonly accounts: readonly ResourceAccountDefinition[];
}

export interface ChallengeGatesPackage extends BaseEntity {
  readonly items: readonly ChallengeGateDefinition[];
}

export interface ScoringPackage extends BaseEntity {
  readonly categories: readonly AwardCategoryDefinition[];
  readonly slots: readonly AwardSlotDefinition[];
}

export interface EvidenceMappingsPackage extends BaseEntity {
  readonly items: readonly ActivityEvidenceMappingDefinition[];
}

export interface SimulationDecisionDefinitionGraph {
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly manifest: Readonly<SimulationDecisionProjectManifest>;
  readonly simulation: Readonly<SimulationDecisionDefinition>;
  readonly config: Readonly<SimulationDecisionConfig>;
  readonly marketsById: ReadonlyMap<string, Readonly<VersionedEntity<MarketDefinition>>>;
  readonly routesById: ReadonlyMap<string, Readonly<VersionedEntity<RouteDefinition>>>;
  readonly eventsById: ReadonlyMap<string, Readonly<VersionedEntity<SimulationEventDefinition>>>;
  readonly reportSectionsById: ReadonlyMap<
    string,
    Readonly<VersionedEntity<ReportSectionDefinition>>
  >;
  readonly capabilities: ReadonlySet<string>;
  readonly liveSession?: Readonly<LiveSessionDefinition>;
  readonly resourceAccounts?: Readonly<ResourceAccountsPackage>;
  readonly exchange?: Readonly<ExchangeDefinition>;
  readonly challengeGates?: Readonly<ChallengeGatesPackage>;
  readonly scoring?: Readonly<ScoringPackage>;
  readonly evidenceMappings?: Readonly<EvidenceMappingsPackage>;
}
