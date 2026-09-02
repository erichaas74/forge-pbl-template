import type {
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../../core/packages/project-package-contracts';

export class InMemoryProjectPackageSource implements ProjectPackageSource {
  constructor(
    private readonly packages: Readonly<
      Record<string, Readonly<Record<string, unknown>>>
    >,
  ) {}

  async read(
    location: ProjectPackageLocation,
    fileName: string,
  ): Promise<unknown | undefined> {
    const packageFiles = this.packages[location.reference];
    const value = packageFiles?.[fileName];
    return value === undefined ? undefined : structuredClone(value);
  }
}

