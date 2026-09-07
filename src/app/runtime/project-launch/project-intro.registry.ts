import { projectIntros } from '../../projects/project-intros';
import {
  IntroError,
  validateIntroConfig,
  type ProjectIntroConfig,
} from '../../shared/project-intro/project-intro.models';

export class ProjectIntroRegistry {
  private readonly entries = new Map<string, ProjectIntroConfig>();
  constructor(configs: readonly ProjectIntroConfig[]) {
    for (const config of configs) {
      validateIntroConfig(config);
      if (this.entries.has(config.projectId))
        throw new IntroError('CONFIG_INVALID', 'Duplicate project opening registration.');
      this.entries.set(config.projectId, config);
    }
  }
  find(projectId: string): ProjectIntroConfig | undefined {
    return this.entries.get(projectId);
  }
}

export const projectIntroRegistry = new ProjectIntroRegistry(projectIntros);
