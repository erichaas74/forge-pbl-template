import { InjectionToken } from '@angular/core';

import type { ProjectSessionContext } from '../../core/context/project-session-context';
import type { ProjectCatalogEntry } from '../../projects/project-catalog';

export const PROJECT_CATALOG_ENTRY = new InjectionToken<ProjectCatalogEntry>(
  'PROJECT_CATALOG_ENTRY',
);
export const PROJECT_SESSION_CONTEXT = new InjectionToken<ProjectSessionContext>(
  'PROJECT_SESSION_CONTEXT',
);
export const PROJECT_DEFINITION = new InjectionToken<unknown>('PROJECT_DEFINITION');

export interface ProjectSessionResolver {
  resolve(project: ProjectCatalogEntry): ProjectSessionContext | Promise<ProjectSessionContext>;
}

export const PROJECT_SESSION_RESOLVER = new InjectionToken<ProjectSessionResolver>(
  'PROJECT_SESSION_RESOLVER',
);
