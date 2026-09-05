import type { BaseEntity } from '../../../core/models/base-entity';
import type {
  ClassVoyageRecord,
  JourneyEvidenceDefinition,
  JourneyMapConfig,
  JourneyReplaySettings,
  JourneyResourceDefinition,
  JourneyStepDefinition,
  JourneyTeamIdentity,
} from '../domain/journey-replay.models';

export interface JourneyReplayProjectManifest extends BaseEntity {
  readonly title: string;
  readonly template: { readonly id: 'journey-replay'; readonly version: string };
  readonly projectType: 'journey-replay';
  readonly status: 'draft' | 'review' | 'published' | 'archived';
  readonly journeyConfigRef: 'journey.json';
  readonly mapConfigRef: 'map.json';
  readonly replayConfigRef: 'replay.json';
  readonly capabilities: readonly string[];
}

export interface JourneyPackageDefinition extends BaseEntity {
  readonly subtitle: string;
  readonly gradeBand: string;
  readonly subject: string;
  readonly drivingQuestion: string;
  readonly team: JourneyTeamIdentity;
  readonly roles: readonly string[];
  readonly steps: readonly JourneyStepDefinition[];
  readonly evidence: readonly JourneyEvidenceDefinition[];
  readonly resources: readonly JourneyResourceDefinition[];
}

export interface JourneyReplayPackageDefinition extends JourneyReplaySettings {
  readonly classVoyages: readonly ClassVoyageRecord[];
}

export interface JourneyReplayDefinitionGraph {
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly manifest: Readonly<JourneyReplayProjectManifest>;
  readonly journey: Readonly<JourneyPackageDefinition>;
  readonly map: Readonly<JourneyMapConfig>;
  readonly replay: Readonly<JourneyReplayPackageDefinition>;
  readonly capabilities: ReadonlySet<string>;
}
