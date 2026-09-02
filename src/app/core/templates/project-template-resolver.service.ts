import type {
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../packages/project-package-contracts';
import type {
  ProjectTemplateResolutionResult,
  ProjectTemplateRuntime,
  TemplateRegistryError,
} from './template-contracts';
import { TemplateRegistry } from './template-registry';

export class ProjectTemplateResolverService {
  constructor(
    private readonly source: ProjectPackageSource,
    private readonly registry: TemplateRegistry,
  ) {}

  async resolve<TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime>(
    location: ProjectPackageLocation,
  ): Promise<ProjectTemplateResolutionResult<TRuntime>> {
    const manifest = await this.source.read(location, 'project.json');
    if (!isRecord(manifest) || !isRecord(manifest['template'])) {
      return this.failure(
        'INVALID_PROJECT_TEMPLATE_MANIFEST',
        '',
        undefined,
        'project.json must declare a template object with id and semantic version.',
      );
    }

    const templateId = manifest['template']['id'];
    const templateVersion = manifest['template']['version'];
    if (typeof templateId !== 'string' || typeof templateVersion !== 'string') {
      return this.failure(
        'INVALID_PROJECT_TEMPLATE_MANIFEST',
        typeof templateId === 'string' ? templateId : '',
        typeof templateVersion === 'string' ? templateVersion : undefined,
        'project.json template.id and template.version must be strings.',
      );
    }

    const resolved = this.registry.resolve<TRuntime>(templateId, templateVersion);
    if (!resolved.ok) {
      return resolved;
    }

    const projectType = manifest['projectType'];
    if (
      typeof projectType !== 'string' ||
      !resolved.value.projectTypes.includes(projectType)
    ) {
      return this.failure(
        'PROJECT_TYPE_UNSUPPORTED',
        templateId,
        templateVersion,
        `Template "${templateId}" does not support project type "${String(projectType)}".`,
      );
    }

    try {
      return {
        ok: true,
        value: {
          registration: resolved.value,
          runtime: resolved.value.createRuntime(),
        },
      };
    } catch {
      return this.failure(
        'TEMPLATE_RUNTIME_CREATION_FAILED',
        templateId,
        templateVersion,
        `Template "${templateId}" runtime creation failed safely.`,
      );
    }
  }

  private failure<TRuntime extends ProjectTemplateRuntime>(
    code: TemplateRegistryError['code'],
    templateId: string,
    requestedVersion: string | undefined,
    message: string,
  ): ProjectTemplateResolutionResult<TRuntime> {
    return {
      ok: false,
      error: Object.freeze({ code, templateId, requestedVersion, message }),
    };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

