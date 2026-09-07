import type {
  ProjectPackageDescriptor,
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import type { ProjectTemplateRuntime } from '../core/templates/template-contracts';
import type { ValidationIssue } from '../core/validation/validation-contracts';

export const singleProjectConfigPackageDescriptor: ProjectPackageDescriptor = {
  requiredFiles: ['project.json'],
  optionalFiles: ['assets.json', 'theme.json', 'assessment.json'],
};

/** Compatibility runtime for templates still authored as one configuration object. */
export class LocalProjectConfigRuntime<TConfig extends object = Record<string, unknown>>
  implements ProjectTemplateRuntime<TConfig>
{
  constructor(
    private readonly source: ProjectPackageSource,
    private readonly templateId: string,
  ) {}

  async loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<TConfig>> {
    const value = await this.source.read(location, 'project.json');
    if (!isRecord(value)) {
      return {
        issues: [
          {
            code: 'INVALID_PROJECT_CONFIG',
            severity: 'error',
            file: 'project.json',
            message: 'project.json must contain a project configuration object.',
          },
        ],
        fromCache: false,
      };
    }
    const template = value['template'];
    const projectId = value['projectId'] ?? value['id'];
    const issues: ValidationIssue[] = [];
    if (projectId !== location.projectId) {
      issues.push({
        code: 'PROJECT_ID_MISMATCH',
        severity: 'error' as const,
        file: 'project.json',
        message: `Project configuration does not match "${location.projectId}".`,
      });
    }
    if (!isRecord(template) || template['id'] !== this.templateId) {
      issues.push({
        code: 'TEMPLATE_NOT_SUPPORTED',
        severity: 'error' as const,
        file: 'project.json',
        message: `Project configuration must declare template "${this.templateId}".`,
      });
    }
    if (issues.length > 0) return { issues, fromCache: false };
    return {
      graph: deepFreeze(structuredClone(value)) as unknown as TConfig,
      issues,
      fromCache: false,
    };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== 'object' || value === null || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const nested of Object.values(value as Record<string, unknown>)) deepFreeze(nested);
  return value;
}
