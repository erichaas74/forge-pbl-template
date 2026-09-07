import type {
  ProjectPackageLocation,
  ProjectPackageSource,
  ProjectPackageLoadResult,
} from '../core/packages/project-package-contracts';
import type { ProjectTemplateRuntime } from '../core/templates/template-contracts';
import {
  requireEngineeringConfig,
  type EngineeringDesignConfig,
} from '../templates/engineering-design/domain/engineering-design.models';
import { LocalProjectConfigRuntime } from './local-project-config-runtime';
/** Adds template validation to the shared immutable configuration loader. */
export class LocalEngineeringDesignRuntime implements ProjectTemplateRuntime<EngineeringDesignConfig> {
  private readonly loader: LocalProjectConfigRuntime<EngineeringDesignConfig>;
  constructor(source: ProjectPackageSource) {
    this.loader = new LocalProjectConfigRuntime(source, 'engineering-design');
  }
  async loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<EngineeringDesignConfig>> {
    const result = await this.loader.loadProject(location);
    if (!result.graph) return result;
    try {
      requireEngineeringConfig(result.graph, location.projectId);
      return result;
    } catch (error) {
      return {
        fromCache: false,
        issues: [
          {
            code: 'CONFIG_INVALID',
            severity: 'error',
            file: 'project.json',
            message: error instanceof Error ? error.message : 'Invalid engineering design package.',
          },
        ],
      };
    }
  }
}
