import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import type { ProjectTemplateRuntime } from '../core/templates/template-contracts';
import type { CrisisConfig } from '../templates/crisis-operations/domain/crisis.models';
import { requireCrisisConfig } from '../templates/crisis-operations/domain/crisis-validation';

/** Package adapter; the same validator is used by the direct room host. */
export class LocalCrisisOperationsRuntime implements ProjectTemplateRuntime<CrisisConfig> {
  constructor(private readonly source: ProjectPackageSource) {}
  async loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<CrisisConfig>> {
    try {
      const graph = requireCrisisConfig(await this.source.read(location, 'project.json'));
      if (
        graph.projectId !== location.projectId ||
        graph.projectVersion !== location.projectVersion
      )
        throw new Error(
          'PROJECT_ID_MISMATCH: Crisis package identity does not match its location.',
        );
      return { graph, issues: [], fromCache: false };
    } catch (error) {
      return {
        issues: [
          {
            code: 'INVALID_CRISIS_PACKAGE',
            severity: 'error',
            file: 'project.json',
            message: error instanceof Error ? error.message : 'Crisis package could not be loaded.',
          },
        ],
        fromCache: false,
      };
    }
  }
}
