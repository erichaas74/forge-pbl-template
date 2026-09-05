import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import { ProjectPackageLoaderService } from '../core/packages/project-package-loader.service';
import { CapabilityRegistry } from '../core/registries/specialized-registries';
import { ValidationService } from '../core/validation/validation.service';
import type { ExhibitHallDefinitionGraph } from '../templates/exhibit-hall/package/exhibit-hall-package-contracts';
import {
  ExhibitHallProjectPackageAssembler,
  exhibitHallProjectPackageDescriptor,
} from '../templates/exhibit-hall/package/exhibit-hall-project-package-assembler';
import { ExhibitHallCapabilityValidator } from '../templates/exhibit-hall/package/exhibit-hall-runtime-validators';
import { registerExhibitHallCapabilities } from '../templates/exhibit-hall/runtime/exhibit-hall-capability-pack';

export class LocalExhibitHallRuntime {
  readonly capabilities = new CapabilityRegistry();
  readonly validation = new ValidationService<
    ExhibitHallDefinitionGraph,
    typeof this.capabilities
  >();
  readonly loader: ProjectPackageLoaderService<
    ExhibitHallDefinitionGraph,
    typeof this.capabilities
  >;

  constructor(source: ProjectPackageSource) {
    registerExhibitHallCapabilities(this.capabilities);
    this.validation.register(new ExhibitHallCapabilityValidator());
    this.loader = new ProjectPackageLoaderService(
      source,
      new ExhibitHallProjectPackageAssembler(),
      exhibitHallProjectPackageDescriptor,
      this.validation,
      this.capabilities,
    );
  }

  loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<ExhibitHallDefinitionGraph>> {
    return this.loader.load(location);
  }
}
