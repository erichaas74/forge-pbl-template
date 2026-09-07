import type {
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../../core/packages/project-package-contracts';

export class HttpProjectPackageSource implements ProjectPackageSource {
  async read(location: ProjectPackageLocation, fileName: string): Promise<unknown | undefined> {
    const reference = location.reference.replace(/^\/+/, '').replace(/\/+$/, '');
    const response = await fetch(`/${reference}/${encodeURIComponent(fileName)}`, {
      headers: { accept: 'application/json' },
    });
    if (response.status === 404) return undefined;
    if (!response.ok) {
      throw new Error(`Project package file "${fileName}" could not be loaded (${response.status}).`);
    }
    return response.json() as Promise<unknown>;
  }
}
