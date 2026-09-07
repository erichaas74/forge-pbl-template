import type { ValidationIssue } from '../validation/validation-contracts';
import type { ValidationService } from '../validation/validation.service';
import type {
  ProjectPackageAssembler,
  ProjectPackageDescriptor,
  ProjectPackageFiles,
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from './project-package-contracts';

export class ProjectPackageLoaderService<TGraph, TRegistryView> {
  private readonly cache = new Map<
    string,
    { readonly graph: TGraph; readonly issues: readonly ValidationIssue[] }
  >();

  constructor(
    private readonly source: ProjectPackageSource,
    private readonly assembler: ProjectPackageAssembler<TGraph>,
    private readonly descriptor: ProjectPackageDescriptor,
    private readonly validation: ValidationService<TGraph, TRegistryView>,
    private readonly registryView: TRegistryView,
  ) {}

  async load(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<TGraph>> {
    const cacheKey = this.cacheKey(location);
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      return { graph: cached.graph, issues: [...cached.issues], fromCache: true };
    }

    const files: Record<string, unknown> = {};
    const issues: ValidationIssue[] = [];
    const required = [...new Set(this.descriptor.requiredFiles)];
    const optional = [...new Set(this.descriptor.optionalFiles)].filter(
      (fileName) => !required.includes(fileName),
    );
    const entries = await Promise.all(
      [...required, ...optional].map(async (fileName) => {
        try {
          return {
            fileName,
            value: await this.source.read(location, fileName),
            required: required.includes(fileName),
            error: undefined,
          };
        } catch (error: unknown) {
          return {
            fileName,
            value: undefined,
            required: required.includes(fileName),
            error,
          };
        }
      }),
    );
    for (const { fileName, value, required: isRequired, error } of entries) {
      if (error !== undefined) {
        issues.push({
          code: 'PACKAGE_FILE_READ_FAILED',
          severity: 'error',
          file: fileName,
          message: `Project package file "${fileName}" could not be read.`,
        });
        continue;
      }
      if (value === undefined) {
        if (isRequired) {
          issues.push({
            code: 'REQUIRED_FILE_MISSING',
            severity: 'error',
            file: fileName,
            message: `Required project package file "${fileName}" is missing.`,
          });
        }
      } else {
        files[fileName] = value;
      }
    }

    if (issues.length > 0) {
      return { issues, fromCache: false };
    }

    const assembled = this.assembler.assemble(
      location,
      Object.freeze(files) as ProjectPackageFiles,
    );
    issues.push(...assembled.issues);
    if (assembled.graph === undefined) {
      return { issues, fromCache: false };
    }

    issues.push(...this.validation.validate(assembled.graph, this.registryView));
    if (issues.some((issue) => issue.severity === 'error')) {
      return { graph: assembled.graph, issues, fromCache: false };
    }

    const graph = deepFreeze(assembled.graph);
    this.cache.set(cacheKey, { graph, issues: Object.freeze([...issues]) });
    return { graph, issues, fromCache: false };
  }

  clearCache(location?: ProjectPackageLocation): void {
    if (location === undefined) {
      this.cache.clear();
    } else {
      this.cache.delete(this.cacheKey(location));
    }
  }

  private cacheKey(location: ProjectPackageLocation): string {
    return [
      location.tenantId,
      `${location.projectId}@${location.projectVersion}`,
      location.reference,
    ].join('::');
  }
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
