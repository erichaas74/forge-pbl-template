import type { BaseEntity } from '../../core/models/base-entity';

export interface ActivityEvidenceMappingDefinition extends BaseEntity {
  readonly sourceType: string;
  readonly evidenceType: string;
  readonly titleTemplate: string;
  readonly summaryFieldPaths: readonly string[];
}

export interface ActivityEvidenceReference extends BaseEntity {
  readonly attemptId: string;
  readonly sourceType: string;
  readonly sourceId: string;
  readonly sourceVersion: number;
  readonly mappingDefinitionId: string;
}
