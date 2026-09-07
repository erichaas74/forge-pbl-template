import type {
  ProjectPackageAssembler,
  ProjectPackageAssemblyResult,
  ProjectPackageDescriptor,
  ProjectPackageFiles,
  ProjectPackageLocation,
} from '../../../core/packages/project-package-contracts';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { JourneyMapConfig } from '../domain/journey-replay.models';
import type {
  JourneyPackageDefinition,
  JourneyReplayDefinitionGraph,
  JourneyReplayPackageDefinition,
  JourneyReplayProjectManifest,
} from './journey-replay-package-contracts';

export const journeyReplayProjectPackageDescriptor: ProjectPackageDescriptor = {
  requiredFiles: ['project.json', 'journey.json', 'map.json', 'replay.json'],
  optionalFiles: ['assessments.json', 'teams.json', 'assets/asset-manifest.json'],
};

export class JourneyReplayProjectPackageAssembler implements ProjectPackageAssembler<JourneyReplayDefinitionGraph> {
  assemble(
    location: ProjectPackageLocation,
    files: ProjectPackageFiles,
  ): ProjectPackageAssemblyResult<JourneyReplayDefinitionGraph> {
    const issues: ValidationIssue[] = [];
    const manifest = readManifest(files['project.json'], issues);
    const journey = readJourney(files['journey.json'], issues);
    const map = readMap(files['map.json'], issues);
    const replay = readReplay(files['replay.json'], issues);
    if (
      manifest === undefined ||
      journey === undefined ||
      map === undefined ||
      replay === undefined
    ) {
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
    validateStableIds(journey, map, replay, issues);
    validateReferences(journey, map, replay, issues);
    if (issues.some((issue) => issue.severity === 'error')) return { issues };

    return {
      graph: {
        tenantId: location.tenantId,
        projectId: location.projectId,
        projectVersion: location.projectVersion,
        manifest,
        journey,
        map,
        replay,
        capabilities: new Set(manifest.capabilities),
      },
      issues,
    };
  }
}

function readManifest(
  value: unknown,
  issues: ValidationIssue[],
): JourneyReplayProjectManifest | undefined {
  if (
    !isEntity(value) ||
    typeof value['title'] !== 'string' ||
    !isRecord(value['template']) ||
    value['template']['id'] !== 'journey-replay' ||
    typeof value['template']['version'] !== 'string' ||
    value['projectType'] !== 'journey-replay' ||
    value['journeyConfigRef'] !== 'journey.json' ||
    value['mapConfigRef'] !== 'map.json' ||
    value['replayConfigRef'] !== 'replay.json' ||
    !Array.isArray(value['capabilities'])
  ) {
    invalid(issues, 'project.json', 'Project manifest is not a valid journey-replay manifest.');
    return undefined;
  }
  return value as unknown as JourneyReplayProjectManifest;
}

function readJourney(
  value: unknown,
  issues: ValidationIssue[],
): JourneyPackageDefinition | undefined {
  if (
    !isEntity(value) ||
    typeof value['subtitle'] !== 'string' ||
    typeof value['drivingQuestion'] !== 'string' ||
    !isRecord(value['team']) ||
    !Array.isArray(value['roles']) ||
    !Array.isArray(value['steps']) ||
    value['steps'].length === 0 ||
    !Array.isArray(value['evidence']) ||
    !Array.isArray(value['resources'])
  ) {
    invalid(
      issues,
      'journey.json',
      'Journey configuration requires identity, steps, evidence, and resources.',
    );
    return undefined;
  }
  return value as unknown as JourneyPackageDefinition;
}

function readMap(value: unknown, issues: ValidationIssue[]): JourneyMapConfig | undefined {
  if (
    !isEntity(value) ||
    typeof value['startLocationId'] !== 'string' ||
    !isRecord(value['regionalCover']) ||
    !Array.isArray(value['locations']) ||
    value['locations'].length === 0 ||
    !Array.isArray(value['routes']) ||
    !Array.isArray(value['lenses'])
  ) {
    invalid(
      issues,
      'map.json',
      'Map configuration requires coordinates, locations, routes, and lenses.',
    );
    return undefined;
  }
  return value as unknown as JourneyMapConfig;
}

function readReplay(
  value: unknown,
  issues: ValidationIssue[],
): JourneyReplayPackageDefinition | undefined {
  if (
    !isEntity(value) ||
    typeof value['sceneDurationSeconds'] !== 'number' ||
    typeof value['maxRuntimeMinutes'] !== 'number' ||
    !Array.isArray(value['classVoyages'])
  ) {
    invalid(
      issues,
      'replay.json',
      'Replay configuration requires timing and separate class voyages.',
    );
    return undefined;
  }
  return value as unknown as JourneyReplayPackageDefinition;
}

function validateStableIds(
  journey: JourneyPackageDefinition,
  map: JourneyMapConfig,
  replay: JourneyReplayPackageDefinition,
  issues: ValidationIssue[],
): void {
  duplicateIds(
    'journey.json',
    'step',
    journey.steps.map((item) => item.id),
    issues,
  );
  duplicateIds(
    'journey.json',
    'choice',
    journey.steps.flatMap((step) => step.choices.map((choice) => choice.id)),
    issues,
  );
  duplicateIds(
    'journey.json',
    'planning target',
    journey.steps.flatMap((step) =>
      step.choices.flatMap((choice) => choice.planning?.targets.map((target) => target.id) ?? []),
    ),
    issues,
  );
  duplicateIds(
    'journey.json',
    'evidence',
    journey.evidence.map((item) => item.id),
    issues,
  );
  duplicateIds(
    'map.json',
    'location',
    map.locations.map((item) => item.id),
    issues,
  );
  duplicateIds(
    'map.json',
    'route',
    map.routes.map((item) => item.id),
    issues,
  );
  duplicateIds(
    'replay.json',
    'voyage',
    replay.classVoyages.map((item) => item.voyageId),
    issues,
  );
}

function validateReferences(
  journey: JourneyPackageDefinition,
  map: JourneyMapConfig,
  replay: JourneyReplayPackageDefinition,
  issues: ValidationIssue[],
): void {
  const locations = new Set(map.locations.map((item) => item.id));
  const routes = new Set(map.routes.map((item) => item.id));
  const evidence = new Set(journey.evidence.map((item) => item.id));
  if (!locations.has(map.startLocationId)) {
    missingReference(issues, 'map.json', map.startLocationId, 'start location');
  }
  for (const route of map.routes) {
    if (!locations.has(route.fromLocationId))
      missingReference(issues, 'map.json', route.fromLocationId, `route ${route.id} origin`);
    if (!locations.has(route.toLocationId))
      missingReference(issues, 'map.json', route.toLocationId, `route ${route.id} destination`);
    if (route.coordinates.length < 2) {
      issues.push({
        code: 'ROUTE_GEOMETRY_INVALID',
        severity: 'error',
        file: 'map.json',
        entityId: route.id,
        message: `Route "${route.id}" needs at least two geographic points.`,
      });
    }
  }
  for (const step of journey.steps) {
    if (!locations.has(step.positionLocationId))
      missingReference(issues, 'journey.json', step.positionLocationId, `step ${step.id} position`);
    if (step.choices.length === 0) {
      issues.push({
        code: 'CHOICE_REQUIRED',
        severity: 'error',
        file: 'journey.json',
        entityId: step.id,
        message: `Step "${step.id}" needs at least one choice.`,
      });
    }
    for (const choice of step.choices) {
      if (choice.routeId !== undefined && !routes.has(choice.routeId))
        missingReference(issues, 'journey.json', choice.routeId, `choice ${choice.id} route`);
      for (const evidenceId of choice.evidenceIds) {
        if (!evidence.has(evidenceId))
          missingReference(issues, 'journey.json', evidenceId, `choice ${choice.id} evidence`);
      }
      for (const target of choice.planning?.targets ?? []) {
        if (!locations.has(target.locationId))
          missingReference(
            issues,
            'journey.json',
            target.locationId,
            `planning target ${target.id} location`,
          );
        if (target.routeId !== undefined && !routes.has(target.routeId))
          missingReference(
            issues,
            'journey.json',
            target.routeId,
            `planning target ${target.id} route`,
          );
      }
      const focus = choice.planning?.mapFocus;
      if (focus?.bounds) {
        const { west, east, north, south } = focus.bounds;
        if (
          ![west, east, north, south].every(Number.isFinite) ||
          west < -180 ||
          east > 180 ||
          south < -90 ||
          north > 90 ||
          west >= east ||
          south >= north
        ) {
          issues.push({
            code: 'MAP_FOCUS_INVALID',
            severity: 'error',
            file: 'journey.json',
            entityId: choice.id,
            message: `Choice "${choice.id}" has invalid map focus bounds.`,
          });
        }
      }
    }
  }
  for (const voyage of replay.classVoyages) {
    for (const point of voyage.route) {
      if (point.locationId !== undefined && !locations.has(point.locationId))
        missingReference(
          issues,
          'replay.json',
          point.locationId,
          `voyage ${voyage.voyageId} location`,
        );
    }
  }
}

function duplicateIds(
  file: string,
  kind: string,
  ids: readonly string[],
  issues: ValidationIssue[],
): void {
  const seen = new Set<string>();
  for (const id of ids) {
    if (id.trim().length === 0 || seen.has(id)) {
      issues.push({
        code: id.trim().length === 0 ? 'STABLE_ID_REQUIRED' : 'DUPLICATE_ID',
        severity: 'error',
        file,
        entityId: id || undefined,
        message: id ? `Duplicate ${kind} ID "${id}".` : `Every ${kind} needs a stable ID.`,
      });
    }
    seen.add(id);
  }
}

function missingReference(
  issues: ValidationIssue[],
  file: string,
  id: string,
  context: string,
): void {
  issues.push({
    code: 'REFERENCE_MISSING',
    severity: 'error',
    file,
    entityId: id,
    message: `Missing ${context} reference "${id}".`,
  });
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
