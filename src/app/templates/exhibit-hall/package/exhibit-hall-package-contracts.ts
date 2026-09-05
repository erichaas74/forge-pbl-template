import type { BaseEntity } from '../../../core/models/base-entity';
import type { ExhibitTemplateDefinition } from '../domain/exhibit-types';

export interface ExhibitHallProjectManifest extends BaseEntity {
  readonly title: string;
  readonly template: { readonly id: 'exhibit-hall'; readonly version: string };
  readonly projectType: 'exhibit-hall';
  readonly status: 'draft' | 'review' | 'published' | 'archived';
  readonly hallConfigRef: 'hall.json';
  readonly exhibitTemplateRef: 'exhibit-template.json';
  readonly capabilities: readonly string[];
}

export interface ExhibitHallPackageDefinition extends BaseEntity {
  readonly courseSectionId: string;
  readonly projectInstanceId: string;
  readonly locationOrder: readonly string[];
  readonly openingStartsAt?: string;
  readonly submissionLocksAt?: string;
  readonly peerResponsesCloseAt?: string;
}

export interface ExhibitHallDefinitionGraph {
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly manifest: Readonly<ExhibitHallProjectManifest>;
  readonly hall: Readonly<ExhibitHallPackageDefinition>;
  readonly exhibitTemplate: Readonly<ExhibitTemplateDefinition>;
  readonly capabilities: ReadonlySet<string>;
}
