import type { ValidationIssue } from '../validation/validation-contracts';

export interface ProjectPackageLocation {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  reference: string;
}

export interface ProjectPackageSource {
  read(
    location: ProjectPackageLocation,
    fileName: string,
  ): Promise<unknown | undefined>;
}

export type ProjectPackageFiles = Readonly<Record<string, unknown>>;

export interface ProjectPackageAssemblyResult<TGraph> {
  graph?: TGraph;
  issues: ValidationIssue[];
}

export interface ProjectPackageAssembler<TGraph> {
  assemble(
    location: ProjectPackageLocation,
    files: ProjectPackageFiles,
  ): ProjectPackageAssemblyResult<TGraph>;
}

export interface ProjectPackageDescriptor {
  requiredFiles: readonly string[];
  optionalFiles: readonly string[];
}

export interface ProjectPackageLoadResult<TGraph> {
  graph?: TGraph;
  issues: ValidationIssue[];
  fromCache: boolean;
}
