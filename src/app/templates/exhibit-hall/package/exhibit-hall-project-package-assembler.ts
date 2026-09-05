import type {
  ProjectPackageAssembler,
  ProjectPackageAssemblyResult,
  ProjectPackageDescriptor,
  ProjectPackageFiles,
  ProjectPackageLocation,
} from '../../../core/packages/project-package-contracts';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { ExhibitTemplateDefinition } from '../domain/exhibit-types';
import type {
  ExhibitHallDefinitionGraph,
  ExhibitHallPackageDefinition,
  ExhibitHallProjectManifest,
} from './exhibit-hall-package-contracts';

export const exhibitHallProjectPackageDescriptor: ProjectPackageDescriptor = {
  requiredFiles: ['project.json', 'hall.json', 'exhibit-template.json'],
  optionalFiles: ['exhibits.json'],
};

export class ExhibitHallProjectPackageAssembler implements ProjectPackageAssembler<ExhibitHallDefinitionGraph> {
  assemble(
    location: ProjectPackageLocation,
    files: ProjectPackageFiles,
  ): ProjectPackageAssemblyResult<ExhibitHallDefinitionGraph> {
    const issues: ValidationIssue[] = [];
    const manifest = readManifest(files['project.json'], issues);
    const hall = readHall(files['hall.json'], issues);
    const exhibitTemplate = readTemplate(files['exhibit-template.json'], issues);
    if (manifest === undefined || hall === undefined || exhibitTemplate === undefined) {
      return { issues };
    }
    if (manifest.id !== location.projectId) {
      issues.push({
        code: 'PROJECT_ID_MISMATCH',
        severity: 'error',
        file: 'project.json',
        message: `Manifest ID "${manifest.id}" does not match requested project "${location.projectId}".`,
      });
    }
    if (manifest.template.id !== 'exhibit-hall' || manifest.projectType !== 'exhibit-hall') {
      issues.push({
        code: 'TEMPLATE_NOT_SUPPORTED',
        severity: 'error',
        file: 'project.json',
        message: 'This package must declare the exhibit-hall template and project type.',
      });
    }
    if (exhibitTemplate.templateId.length === 0 || exhibitTemplate.rendererType.length === 0) {
      issues.push({
        code: 'INVALID_EXHIBIT_TEMPLATE',
        severity: 'error',
        file: 'exhibit-template.json',
        message: 'An exhibit template requires stable templateId and rendererType values.',
      });
    }
    if (issues.some((issue) => issue.severity === 'error')) return { issues };
    return {
      graph: {
        tenantId: location.tenantId,
        projectId: location.projectId,
        projectVersion: location.projectVersion,
        manifest,
        hall,
        exhibitTemplate,
        capabilities: new Set(manifest.capabilities),
      },
      issues,
    };
  }
}

function readManifest(
  value: unknown,
  issues: ValidationIssue[],
): ExhibitHallProjectManifest | undefined {
  if (
    !isEntity(value) ||
    typeof value['title'] !== 'string' ||
    !isRecord(value['template']) ||
    value['template']['id'] !== 'exhibit-hall' ||
    typeof value['template']['version'] !== 'string' ||
    value['projectType'] !== 'exhibit-hall' ||
    !Array.isArray(value['capabilities'])
  ) {
    invalid(issues, 'project.json', 'Project manifest is not a valid exhibit-hall manifest.');
    return undefined;
  }
  return value as unknown as ExhibitHallProjectManifest;
}

function readHall(
  value: unknown,
  issues: ValidationIssue[],
): ExhibitHallPackageDefinition | undefined {
  if (
    !isEntity(value) ||
    typeof value['courseSectionId'] !== 'string' ||
    typeof value['projectInstanceId'] !== 'string' ||
    !Array.isArray(value['locationOrder'])
  ) {
    invalid(issues, 'hall.json', 'Hall configuration requires section, instance, and locations.');
    return undefined;
  }
  return value as unknown as ExhibitHallPackageDefinition;
}

function readTemplate(
  value: unknown,
  issues: ValidationIssue[],
): ExhibitTemplateDefinition | undefined {
  if (
    !isRecord(value) ||
    typeof value['templateId'] !== 'string' ||
    typeof value['version'] !== 'number' ||
    typeof value['rendererType'] !== 'string' ||
    !isRecord(value['vocabulary']) ||
    !isRecord(value['sourceAdapter']) ||
    !Array.isArray(value['requirements']) ||
    !isRecord(value['peerResponse']) ||
    !isRecord(value['defense']) ||
    !isRecord(value['publication']) ||
    !isRecord(value['theme'])
  ) {
    invalid(issues, 'exhibit-template.json', 'Exhibit template configuration is incomplete.');
    return undefined;
  }
  return value as unknown as ExhibitTemplateDefinition;
}

function invalid(issues: ValidationIssue[], file: string, message: string): void {
  issues.push({ code: 'INVALID_FILE_SHAPE', severity: 'error', file, message });
}

function isEntity(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) && typeof value['id'] === 'string' && typeof value['schemaVersion'] === 'string'
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
