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
  private readonly cache = new Map<string, TGraph>();

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
      return { graph: cached, issues: [], fromCache: true };
    }

    const files: Record<string, unknown> = {};
    const issues: ValidationIssue[] = [];
    for (const fileName of this.descriptor.requiredFiles) {
      const value = await this.source.read(location, fileName);
      if (value === undefined) {
        issues.push({
          code: 'REQUIRED_FILE_MISSING',
          severity: 'error',
          file: fileName,
          message: `Required project package file "${fileName}" is missing.`,
        });
      } else {
        files[fileName] = value;
      }
    }
    for (const fileName of this.descriptor.optionalFiles) {
      const value = await this.source.read(location, fileName);
      if (value !== undefined) {
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
    this.cache.set(cacheKey, graph);
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
    return `${location.tenantId}::${location.projectId}@${location.projectVersion}`;
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
