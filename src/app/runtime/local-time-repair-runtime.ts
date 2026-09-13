import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import type { ProjectTemplateRuntime } from '../core/templates/template-contracts';
import type { TimeRepairConfig } from '../templates/time-repair/domain/time-repair.models';
import { requireTimeRepairConfig } from '../templates/time-repair/domain/time-repair.validation';

export class LocalTimeRepairRuntime implements ProjectTemplateRuntime<TimeRepairConfig> {
  constructor(private readonly source: ProjectPackageSource) {}
  async loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<TimeRepairConfig>> {
    try {
      const graph = requireTimeRepairConfig(await this.source.read(location, 'project.json'));
      if (
        graph.projectId !== location.projectId ||
        graph.projectVersion !== location.projectVersion
      )
        throw new Error(
          'PROJECT_ID_MISMATCH: The Time Repair package does not match the requested version.',
        );
      return { graph, issues: [], fromCache: false };
    } catch (error) {
      return {
        issues: [
          {
            code: 'INVALID_TIME_REPAIR_PACKAGE',
            severity: 'error',
            file: 'project.json',
            message:
              error instanceof Error ? error.message : 'Time Repair package could not be loaded.',
          },
        ],
        fromCache: false,
      };
    }
  }
}
