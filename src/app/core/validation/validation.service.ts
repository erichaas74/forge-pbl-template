import type { RegistryResult } from '../registries/registry-contracts';
import { Registry } from '../registries/registry';
import type {
  ProjectValidator,
  ValidationIssue,
} from './validation-contracts';

interface ProjectValidatorEntry<TGraph, TRegistryView> {
  id: string;
  validator: ProjectValidator<TGraph, TRegistryView>;
}

export class ValidationService<TGraph, TRegistryView> {
  private readonly validators = new Registry<
    ProjectValidatorEntry<TGraph, TRegistryView>
  >('project-validators');

  register(
    validator: ProjectValidator<TGraph, TRegistryView>,
  ): RegistryResult<ProjectValidatorEntry<TGraph, TRegistryView>> {
    return this.validators.register({ id: validator.id, validator });
  }

  validate(graph: TGraph, registry: TRegistryView): ValidationIssue[] {
    return this.validators
      .list()
      .flatMap((entry) => entry.validator.validate(graph, registry));
  }
}

