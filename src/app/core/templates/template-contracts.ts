import type {
  ProjectPackageDescriptor,
  ProjectPackageLoadResult,
  ProjectPackageLocation,
} from '../packages/project-package-contracts';

export interface ProjectTemplateRuntime<TGraph = unknown> {
  loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<TGraph>>;
}

export interface ProjectTemplateRegistration<
  TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime,
> {
  readonly id: string;
  readonly version: string;
  readonly compatibleTemplateMajorVersions: readonly number[];
  readonly projectTypes: readonly string[];
  readonly packageDescriptor: ProjectPackageDescriptor;
  readonly createRuntime: () => TRuntime;
}

export type TemplateRegistryErrorCode =
  | 'INVALID_TEMPLATE_ID'
  | 'INVALID_TEMPLATE_VERSION'
  | 'INVALID_TEMPLATE_COMPATIBILITY'
  | 'DUPLICATE_TEMPLATE_REGISTRATION'
  | 'TEMPLATE_NOT_FOUND'
  | 'TEMPLATE_VERSION_UNSUPPORTED'
  | 'INVALID_PROJECT_TEMPLATE_MANIFEST'
  | 'PROJECT_TYPE_UNSUPPORTED'
  | 'TEMPLATE_RUNTIME_CREATION_FAILED';

export interface TemplateRegistryError {
  readonly code: TemplateRegistryErrorCode;
  readonly templateId: string;
  readonly requestedVersion?: string;
  readonly message: string;
}

export type TemplateRegistryResult<
  TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime,
> =
  | {
      readonly ok: true;
      readonly value: Readonly<ProjectTemplateRegistration<TRuntime>>;
    }
  | { readonly ok: false; readonly error: TemplateRegistryError };

export interface ResolvedProjectTemplate<
  TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime,
> {
  readonly registration: Readonly<ProjectTemplateRegistration<TRuntime>>;
  readonly runtime: TRuntime;
}

export type ProjectTemplateResolutionResult<
  TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime,
> =
  | { readonly ok: true; readonly value: ResolvedProjectTemplate<TRuntime> }
  | { readonly ok: false; readonly error: TemplateRegistryError };

