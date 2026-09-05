import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import { ProjectPackageLoaderService } from '../core/packages/project-package-loader.service';
import { CapabilityRegistry } from '../core/registries/specialized-registries';
import { ValidationService } from '../core/validation/validation.service';
import type { JourneyReplayDefinitionGraph } from '../templates/journey-replay/package/journey-replay-package-contracts';
import {
  JourneyReplayProjectPackageAssembler,
  journeyReplayProjectPackageDescriptor,
} from '../templates/journey-replay/package/journey-replay-project-package-assembler';
import { JourneyReplayCapabilityValidator } from '../templates/journey-replay/package/journey-replay-runtime-validators';
import { registerJourneyReplayCapabilities } from '../templates/journey-replay/runtime/journey-replay-capability-pack';

export class LocalJourneyReplayRuntime {
  readonly capabilities = new CapabilityRegistry();
  readonly validation = new ValidationService<
    JourneyReplayDefinitionGraph,
    typeof this.capabilities
  >();
  readonly loader: ProjectPackageLoaderService<
    JourneyReplayDefinitionGraph,
    typeof this.capabilities
  >;

  constructor(source: ProjectPackageSource) {
    registerJourneyReplayCapabilities(this.capabilities);
    this.validation.register(new JourneyReplayCapabilityValidator());
    this.loader = new ProjectPackageLoaderService(
      source,
      new JourneyReplayProjectPackageAssembler(),
      journeyReplayProjectPackageDescriptor,
      this.validation,
      this.capabilities,
    );
  }

  loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<JourneyReplayDefinitionGraph>> {
    return this.loader.load(location);
  }
}
