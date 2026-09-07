import type { EnvironmentProviders, Provider, Type } from '@angular/core';

import type { ProjectSessionContext } from '../../core/context/project-session-context';
import type { ProjectCatalogEntry } from '../../projects/project-catalog';

export interface ProjectLaunchRequest {
  readonly project: ProjectCatalogEntry;
  readonly projectDefinition: unknown;
  readonly session: ProjectSessionContext;
  readonly view?: string;
}

export interface ProjectLaunchTarget {
  readonly component: Type<unknown>;
  readonly providers: readonly (Provider | EnvironmentProviders)[];
}

export interface TemplateLauncher {
  readonly templateId: string;
  load(request: ProjectLaunchRequest): Promise<ProjectLaunchTarget>;
}

export interface ProjectDefinitionSource {
  load(project: ProjectCatalogEntry): Promise<unknown>;
}
