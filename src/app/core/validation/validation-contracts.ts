export type ValidationIssueSeverity = 'warning' | 'error';

export interface ValidationIssue {
  code: string;
  severity: ValidationIssueSeverity;
  entityId?: string;
  message: string;
  suggestion?: string;
  file?: string;
  path?: string;
  relatedEntityIds?: string[];
  capabilityId?: string;
  phaseId?: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface Validator<T = unknown> {
  validate(value: T): ValidationIssue[];
}

export interface ProjectValidator<TGraph = unknown, TRegistryView = unknown> {
  id: string;
  validate(graph: TGraph, registry: TRegistryView): ValidationIssue[];
}
