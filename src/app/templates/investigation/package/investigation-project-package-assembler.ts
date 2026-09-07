import { ImmutableMap, ImmutableSet } from '../../../core/collections/immutable-collections';
import type {
  ProjectPackageAssembler,
  ProjectPackageAssemblyResult,
  ProjectPackageDescriptor,
  ProjectPackageFiles,
  ProjectPackageLocation,
} from '../../../core/packages/project-package-contracts';
import type { BaseEntity } from '../../../core/models/base-entity';
import type { RuleDefinition } from '../../../core/rules/rule-contracts';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { ActivityDefinition } from '../../../shared/activities/activity-contracts';
import type { LessonDefinition } from '../../../shared/content/lesson-contracts';
import type { CaseBoardConfiguration } from '../case-board/case-board-contracts';
import type {
  InvestigationConfiguration,
  InvestigationTeamSettings,
  ProjectManifest,
  StateVariableDefinition,
} from '../domain';
import type { EvidenceDefinition } from '../evidence/evidence-contracts';
import type { FinalSubmissionDefinition } from '../final-investigation/final-submission-contracts';
import type { NPCDefinition } from '../npc/npc-contracts';
import type { RandomizationDefinition } from '../randomization/randomization-contracts';
import type { InvestigationResource } from '../resources/resource-contracts';
import type { ProjectDefinitionGraph } from './project-definition-graph';

export const investigationProjectPackageDescriptor: ProjectPackageDescriptor = {
  requiredFiles: [
    'project.json',
    'investigation.json',
    'case-board.json',
    'evidence.json',
    'activities.json',
    'rules.json',
    'state.json',
    'final-submission.json',
  ],
  optionalFiles: [
    'lessons.json',
    'resources.json',
    'randomization.json',
    'npcs.json',
    'teams.json',
    'assessments.json',
  ],
};

export class InvestigationProjectPackageAssembler
  implements ProjectPackageAssembler<ProjectDefinitionGraph>
{
  assemble(
    location: ProjectPackageLocation,
    files: ProjectPackageFiles,
  ): ProjectPackageAssemblyResult<ProjectDefinitionGraph> {
    const issues: ValidationIssue[] = [];
    const manifest = this.entity<ProjectManifest>(files['project.json'], 'project.json', issues);
    const investigation = this.entity<InvestigationConfiguration>(
      files['investigation.json'],
      'investigation.json',
      issues,
    );
    const caseBoard = this.entity<CaseBoardConfiguration>(
      files['case-board.json'],
      'case-board.json',
      issues,
    );
    const finalSubmission = this.entity<FinalSubmissionDefinition>(
      files['final-submission.json'],
      'final-submission.json',
      issues,
    );
    if (
      manifest === undefined ||
      investigation === undefined ||
      caseBoard === undefined ||
      finalSubmission === undefined
    ) {
      return { issues };
    }

    if (manifest.id !== location.projectId) {
      issues.push({
        code: 'PROJECT_ID_MISMATCH',
        severity: 'error',
        file: 'project.json',
        entityId: manifest.id,
        message: `Manifest ID "${manifest.id}" does not match requested project "${location.projectId}".`,
      });
    }
    if (manifest.template?.id !== 'investigation') {
      issues.push({
        code: 'TEMPLATE_NOT_SUPPORTED',
        severity: 'error',
        file: 'project.json',
        entityId: manifest.id,
        message: 'Project package does not declare the Investigation template.',
      });
    }
    if (!this.supportsSchema(manifest.schemaVersion)) {
      issues.push({
        code: 'SCHEMA_VERSION_UNSUPPORTED',
        severity: 'error',
        file: 'project.json',
        entityId: manifest.id,
        message: `Schema version "${manifest.schemaVersion}" is not supported by this V1 loader.`,
      });
    }

    const globallySeen = new Set<string>();
    for (const entity of [manifest, investigation, caseBoard, finalSubmission]) {
      this.trackId(entity.id, 'project package', globallySeen, issues);
    }
    for (const section of caseBoard.sections ?? []) {
      this.trackId(section.id, 'case-board.json', globallySeen, issues);
    }

    const evidenceById = this.index<EvidenceDefinition>(
      files['evidence.json'],
      'evidence.json',
      globallySeen,
      issues,
    );
    const activitiesById = this.index<ActivityDefinition>(
      files['activities.json'],
      'activities.json',
      globallySeen,
      issues,
    );
    const lessonsById = this.index<LessonDefinition>(
      files['lessons.json'],
      'lessons.json',
      globallySeen,
      issues,
      true,
    );
    const rulesById = this.index<RuleDefinition>(
      files['rules.json'],
      'rules.json',
      globallySeen,
      issues,
    );
    const stateById = this.index<StateVariableDefinition>(
      files['state.json'],
      'state.json',
      globallySeen,
      issues,
    );
    const resourcesById = this.index<InvestigationResource>(
      files['resources.json'],
      'resources.json',
      globallySeen,
      issues,
      true,
    );
    const randomizationsById = this.index<RandomizationDefinition>(
      files['randomization.json'],
      'randomization.json',
      globallySeen,
      issues,
      true,
    );
    const npcsById = this.index<NPCDefinition>(
      files['npcs.json'],
      'npcs.json',
      globallySeen,
      issues,
      true,
    );
    const teams =
      files['teams.json'] === undefined
        ? undefined
        : this.record<InvestigationTeamSettings>(files['teams.json'], 'teams.json', issues);

    if (issues.some((issue) => issue.severity === 'error')) {
      return { issues };
    }

    return {
      graph: {
        tenantId: location.tenantId,
        projectId: location.projectId,
        projectVersion: location.projectVersion,
        manifest: freeze(manifest),
        investigation: freeze(investigation),
        caseBoard: freeze(caseBoard),
        evidenceById,
        activitiesById,
        lessonsById,
        rulesById,
        stateById,
        resourcesById,
        randomizationsById,
        npcsById,
        teams: teams === undefined ? undefined : freeze(teams),
        finalSubmission: freeze(finalSubmission),
        capabilities: new ImmutableSet(manifest.capabilities),
      },
      issues,
    };
  }

  private index<T extends BaseEntity>(
    value: unknown,
    file: string,
    globallySeen: Set<string>,
    issues: ValidationIssue[],
    optional = false,
  ): ReadonlyMap<string, Readonly<T>> {
    if (value === undefined && optional) {
      return new ImmutableMap();
    }
    if (!isRecord(value) || !Array.isArray(value['items'])) {
      issues.push({
        code: 'INVALID_FILE_SHAPE',
        severity: 'error',
        file,
        message: `Project file "${file}" must contain an items array.`,
      });
      return new ImmutableMap();
    }

    const entries: Array<readonly [string, Readonly<T>]> = [];
    const fileSeen = new Set<string>();
    for (const item of value['items']) {
      if (!isEntity(item)) {
        issues.push({
          code: 'INVALID_ENTITY',
          severity: 'error',
          file,
          message: `Project file "${file}" contains an entity without stable id/schemaVersion.`,
        });
        continue;
      }
      if (fileSeen.has(item.id)) {
        issues.push({
          code: 'DUPLICATE_ID',
          severity: 'error',
          file,
          entityId: item.id,
          message: `ID "${item.id}" is duplicated in "${file}".`,
        });
        continue;
      }
      fileSeen.add(item.id);
      this.trackId(item.id, file, globallySeen, issues);
      entries.push([item.id, freeze(item as unknown as T)]);
    }
    return new ImmutableMap(entries);
  }

  private entity<T extends BaseEntity>(
    value: unknown,
    file: string,
    issues: ValidationIssue[],
  ): T | undefined {
    if (!isEntity(value)) {
      issues.push({
        code: 'INVALID_ENTITY',
        severity: 'error',
        file,
        message: `Project file "${file}" must contain an entity with id and schemaVersion.`,
      });
      return undefined;
    }
    return value as unknown as T;
  }

  private record<T>(
    value: unknown,
    file: string,
    issues: ValidationIssue[],
  ): T | undefined {
    if (!isRecord(value)) {
      issues.push({
        code: 'INVALID_FILE_SHAPE',
        severity: 'error',
        file,
        message: `Project file "${file}" must contain an object.`,
      });
      return undefined;
    }
    return value as T;
  }

  private trackId(
    id: string,
    file: string,
    seen: Set<string>,
    issues: ValidationIssue[],
  ): void {
    if (seen.has(id)) {
      issues.push({
        code: 'DUPLICATE_ID',
        severity: 'error',
        file,
        entityId: id,
        message: `ID "${id}" is duplicated across the project package.`,
      });
    }
    seen.add(id);
  }

  private supportsSchema(version: string): boolean {
    return version.split('.')[0] === '1';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isEntity(value: unknown): value is BaseEntity {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    value['id'].trim() === value['id'] &&
    /^[a-z0-9][a-z0-9._-]*$/i.test(value['id']) &&
    typeof value['schemaVersion'] === 'string' &&
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/.test(value['schemaVersion'])
  );
}

function freeze<T>(value: T): Readonly<T> {
  const copy = structuredClone(value);
  return deepFreeze(copy);
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== 'object' || value === null || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const nested of Object.values(value as Record<string, unknown>)) {
    deepFreeze(nested);
  }
  return value;
}
