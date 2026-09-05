import type {
  ProjectPackageLoadResult,
  ProjectPackageLocation,
  ProjectPackageSource,
} from '../core/packages/project-package-contracts';
import { ProjectPackageLoaderService } from '../core/packages/project-package-loader.service';
import { CapabilityRegistry } from '../core/registries/specialized-registries';
import { ValidationService } from '../core/validation/validation.service';
import { registerLiveActivityCapabilityContracts } from '../shared/live-activity-capability-pack';
import type { SimulationDecisionDefinitionGraph } from '../templates/simulation-decision/package/simulation-decision-package-contracts';
import {
  SimulationDecisionProjectPackageAssembler,
  simulationDecisionProjectPackageDescriptor,
} from '../templates/simulation-decision/package/simulation-decision-project-package-assembler';
import {
  SimulationDecisionCapabilityValidator,
  SimulationDecisionReferenceValidator,
} from '../templates/simulation-decision/package/simulation-decision-runtime-validators';
import { registerSimulationDecisionCapabilities } from '../templates/simulation-decision/runtime/simulation-decision-capability-pack';

/** Package-loading composition for simulation-decision projects. */
export class LocalSimulationDecisionRuntime {
  readonly capabilities = new CapabilityRegistry();
  readonly validation = new ValidationService<
    SimulationDecisionDefinitionGraph,
    typeof this.capabilities
  >();
  readonly loader: ProjectPackageLoaderService<
    SimulationDecisionDefinitionGraph,
    typeof this.capabilities
  >;

  constructor(source: ProjectPackageSource) {
    registerSimulationDecisionCapabilities(this.capabilities);
    registerLiveActivityCapabilityContracts(this.capabilities);
    this.validation.register(new SimulationDecisionCapabilityValidator());
    this.validation.register(new SimulationDecisionReferenceValidator());
    this.loader = new ProjectPackageLoaderService(
      source,
      new SimulationDecisionProjectPackageAssembler(),
      simulationDecisionProjectPackageDescriptor,
      this.validation,
      this.capabilities,
    );
  }

  loadProject(
    location: ProjectPackageLocation,
  ): Promise<ProjectPackageLoadResult<SimulationDecisionDefinitionGraph>> {
    return this.loader.load(location);
  }
}
