import type { ProjectPackageDescriptor, ProjectPackageLocation } from '../packages/project-package-contracts';
import type { ValidationIssue } from '../validation/validation-contracts';
import type { FinalProductAdapter } from '../submissions/final-product-contracts';

export interface TemplateProjectReference {
  readonly id: string;
  readonly version: string;
}

/**
 * Common lifecycle implemented by every reusable template. Domain state may
 * remain template-specific, but loading, validation and launch are uniform.
 */
export interface TemplateRuntimePlugin<TGraph = unknown, TState = unknown> {
  readonly id: string;
  readonly implementationVersion: string;
  readonly compatibleMajorVersions: readonly number[];
  readonly projectTypes: readonly string[];
  readonly packageDescriptor: ProjectPackageDescriptor;
  readonly finalProduct?: FinalProductAdapter<TState>;
  load(location: ProjectPackageLocation): Promise<{
    readonly graph?: TGraph;
    readonly issues: readonly ValidationIssue[];
  }>;
  initialize(graph: TGraph): TState | Promise<TState>;
}
