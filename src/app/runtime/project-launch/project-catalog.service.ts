import { Injectable, signal } from '@angular/core';

import {
  projectCatalog as builtInProjectCatalog,
  type ProjectCatalogEntry,
} from '../../projects/project-catalog';

@Injectable({ providedIn: 'root' })
export class ProjectCatalogService {
  readonly projects = signal<readonly ProjectCatalogEntry[]>(builtInProjectCatalog);
  private loading?: Promise<void>;

  load(): Promise<void> {
    this.loading ??= this.loadExternalCatalog();
    return this.loading;
  }

  find(projectId: string | null): ProjectCatalogEntry | undefined {
    return this.projects().find((project) => project.id === projectId);
  }

  private async loadExternalCatalog(): Promise<void> {
    try {
      const response = await fetch('/project-catalog.json', {
        headers: { accept: 'application/json' },
      });
      if (!response.ok) return;
      const value: unknown = await response.json();
      if (!Array.isArray(value)) throw new Error('The project catalog must be an array.');
      const external = value.map(parseCatalogEntry);
      if (new Set(external.map((entry) => entry.id)).size !== external.length) {
        throw new Error('External project catalog IDs must be unique.');
      }
      const merged = new Map(builtInProjectCatalog.map((entry) => [entry.id, entry]));
      for (const entry of external) merged.set(entry.id, entry);
      this.projects.set(Object.freeze([...merged.values()]));
    } catch (error: unknown) {
      console.warn('External project catalog could not be loaded; using built-in projects.', error);
    }
  }
}

function parseCatalogEntry(value: unknown): ProjectCatalogEntry {
  if (!isRecord(value) || !isRecord(value['template'])) {
    throw new Error('Every catalog entry must be an object with a template.');
  }
  const strings = [
    'id', 'route', 'projectVersion', 'packageReference', 'title', 'subtitle', 'grade', 'subject',
    'projectType', 'description', 'symbol', 'theme', 'status',
  ] as const;
  if (strings.some((key) => typeof value[key] !== 'string')) {
    throw new Error('A project catalog entry is missing required string metadata.');
  }
  if (
    typeof value['template']['id'] !== 'string' ||
    typeof value['template']['version'] !== 'string' ||
    !Array.isArray(value['legacyRoutes']) ||
    !Array.isArray(value['capabilityIds']) ||
    !Array.isArray(value['learningGoals'])
  ) {
    throw new Error(`Project "${String(value['id'])}" has invalid template or list metadata.`);
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(value['id'] as string)) {
    throw new Error('Project IDs must use lowercase letters, numbers, and hyphens.');
  }
  if (value['route'] !== `/projects/${value['id']}`) {
    throw new Error(`Project "${value['id']}" must use its canonical project route.`);
  }
  if (!['Preview', 'Pilot', 'Classroom ready', 'Updating'].includes(value['status'] as string)) {
    throw new Error(`Project "${value['id']}" has an unsupported catalog status.`);
  }
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/.test(value['projectVersion'] as string)) {
    throw new Error(`Project "${value['id']}" has an invalid semantic version.`);
  }
  if (!/^[a-z0-9][a-z0-9/_-]*$/.test(value['packageReference'] as string)) {
    throw new Error(`Project "${value['id']}" has an unsafe package reference.`);
  }
  if (!/^[a-z0-9][a-z0-9.-]*$/.test(value['template']['id'] as string)) {
    throw new Error(`Project "${value['id']}" has an invalid template ID.`);
  }
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/.test(value['template']['version'] as string)) {
    throw new Error(`Project "${value['id']}" has an invalid template version.`);
  }
  if (value['builderRoute'] !== undefined && typeof value['builderRoute'] !== 'string') {
    throw new Error(`Project "${value['id']}" has an invalid builder route.`);
  }
  for (const key of ['legacyRoutes', 'capabilityIds', 'learningGoals'] as const) {
    if (!(value[key] as unknown[]).every((item) => typeof item === 'string' && item.trim().length > 0)) {
      throw new Error(`Project "${value['id']}" has a non-string value in ${key}.`);
    }
  }
  if (!(value['legacyRoutes'] as string[]).every((route) => route.startsWith('/'))) {
    throw new Error(`Project "${value['id']}" has an invalid legacy route.`);
  }
  return value as unknown as ProjectCatalogEntry;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
