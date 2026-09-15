import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import type { ProjectTemplateRuntime } from '../core/templates/template-contracts';
import { requireTimeRepairPackage, type TimeRepairPackage } from '../templates/time-repair/domain/time-repair.package';

export class LocalTimeRepairRuntime implements ProjectTemplateRuntime<TimeRepairPackage> {
  constructor(private readonly source: ProjectPackageSource) {}
  async loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<TimeRepairPackage>> {
    try {
      const graph = requireTimeRepairPackage(await this.source.read(location, 'project.json'));
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
