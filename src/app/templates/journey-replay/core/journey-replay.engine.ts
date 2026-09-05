import type {
  ClassVoyageRecord,
  JourneyChoiceDefinition,
  JourneyProjectConfig,
  JourneyResponseDraft,
  JourneyStepDefinition,
  ReplayScene,
  StudentJourneyRecord,
  VoyageIntersection,
  VoyageRoutePoint,
} from '../domain/journey-replay.models';

const EMPTY_DRAFT: JourneyResponseDraft = {
  responseMode: 'text',
  text: '',
  transcript: '',
};

export function createInitialJourneyRecord(
  config: JourneyProjectConfig,
  studentId: string,
  now = new Date().toISOString(),
): StudentJourneyRecord {
  const start = locationOrThrow(config, config.map.startLocationId);
  const voyageId = `${config.projectId}-${studentId}`;
  return {
    schemaVersion: '1.0',
    studentId,
    voyageId,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    currentStepIndex: 0,
    responseDraft: EMPTY_DRAFT,
    completedSteps: [],
    route: [
      {
        voyageId,
        pointId: 'departure',
        sequence: 0,
        legId: 'departure',
        timestamp: now,
        locationId: start.id,
        latitude: start.latitude,
        longitude: start.longitude,
      },
    ],
    mastery: [],
    replayTimeline: [],
    resources: Object.fromEntries(
      config.resources.map((resource) => [resource.id, resource.startingValue]),
    ),
    completionStatus: 'in-progress',
    revision: 0,
    eventHistory: [],
  };
}

export function selectJourneyChoice(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
  choiceId: string,
): StudentJourneyRecord {
  const step = currentStep(config, record);
  if (step === undefined || !step.choices.some((choice) => choice.id === choiceId)) {
    throw new Error('CHOICE_NOT_AVAILABLE');
  }
  return {
    ...record,
    selectedChoiceId: choiceId,
    responseDraft: EMPTY_DRAFT,
  };
}

export function updateJourneyResponseDraft(
  record: StudentJourneyRecord,
  update: Partial<JourneyResponseDraft>,
): StudentJourneyRecord {
  return { ...record, responseDraft: { ...record.responseDraft, ...update } };
}

export function completeJourneyStep(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
  now = new Date().toISOString(),
): StudentJourneyRecord {
  const step = currentStep(config, record);
  if (step === undefined) throw new Error('JOURNEY_ALREADY_COMPLETE');
  const choice = step.choices.find((candidate) => candidate.id === record.selectedChoiceId);
  if (choice === undefined) throw new Error('CHOICE_REQUIRED');
  if (!hasResponse(record.responseDraft)) throw new Error('RESPONSE_REQUIRED');

  const responseId = `response-${step.id}`;
  const sceneId = `scene-${step.id}`;
  const route = appendRoute(config, record, choice, step.id, now);
  const resources = applyResourceChanges(config, record.resources, choice);
  const stepRecord = {
    stepId: step.id,
    choiceId: choice.id,
    evidenceSelected: [...choice.evidenceIds],
    studentResponse: {
      id: responseId,
      questionText: choice.question,
      responseMode: record.responseDraft.responseMode,
      text: record.responseDraft.text.trim() || undefined,
      transcript: record.responseDraft.transcript.trim() || undefined,
      mediaAssetId: record.responseDraft.mediaAssetId,
      masteryTags: [...step.masteryTags],
      useInReplay: true,
    },
    consequence: choice.consequence,
    masteryResults: step.masteryTags.map((masteryTag) => ({
      masteryTag,
      status: 'evidence-collected' as const,
    })),
    sceneId,
    completedAt: now,
  };
  const scene: ReplayScene = {
    id: sceneId,
    stepId: step.id,
    type: step.sceneType,
    durationSeconds: config.replay.sceneDurationSeconds,
    routePointSequenceEnd: route.at(-1)?.sequence ?? 0,
    title: choice.sceneTitle,
    locationId:
      config.map.routes.find((item) => item.id === choice.routeId)?.toLocationId ??
      route.at(-1)?.locationId ??
      step.positionLocationId,
    systemNarration: choice.consequence,
    studentResponseId: responseId,
    evidenceIds: [...choice.evidenceIds],
    masteryHighlights: [...step.masteryTags],
    order: record.replayTimeline.length,
    hidden: false,
  };
  const nextIndex = record.currentStepIndex + 1;
  return {
    ...record,
    currentStepIndex: nextIndex,
    selectedChoiceId: undefined,
    responseDraft: EMPTY_DRAFT,
    completedSteps: [...record.completedSteps, stepRecord],
    route,
    mastery: [
      ...record.mastery,
      ...step.masteryTags.map((masteryTag) => ({
        masteryTag,
        stepId: step.id,
        status: 'evidence-collected' as const,
      })),
    ],
    replayTimeline: [...record.replayTimeline, scene],
    resources,
    completionStatus: nextIndex >= config.steps.length ? 'complete' : 'in-progress',
  };
}

export function currentStep(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
): JourneyStepDefinition | undefined {
  return config.steps[record.currentStepIndex];
}

export function selectedChoice(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
): JourneyChoiceDefinition | undefined {
  return currentStep(config, record)?.choices.find((choice) => choice.id === record.selectedChoiceId);
}

export function routeForScene(
  record: StudentJourneyRecord,
  scene: ReplayScene | undefined,
): readonly VoyageRoutePoint[] {
  if (scene === undefined) return record.route.slice(0, 1);
  return record.route.filter((point) => point.sequence <= scene.routePointSequenceEnd);
}

export function setReplaySceneHidden(
  record: StudentJourneyRecord,
  sceneId: string,
  hidden: boolean,
): StudentJourneyRecord {
  if (!record.replayTimeline.some((scene) => scene.id === sceneId)) {
    throw new Error('REPLAY_SCENE_NOT_FOUND');
  }
  return {
    ...record,
    replayTimeline: record.replayTimeline.map((scene) =>
      scene.id === sceneId ? { ...scene, hidden } : scene,
    ),
  };
}

export function detectVoyageIntersections(
  voyages: readonly ClassVoyageRecord[],
): readonly VoyageIntersection[] {
  const byLocation = new Map<string, { voyageIds: Set<string>; eventLabels: Set<string> }>();
  for (const voyage of voyages) {
    for (const point of voyage.route) {
      if (point.locationId === undefined) continue;
      const existing = byLocation.get(point.locationId) ?? {
        voyageIds: new Set<string>(),
        eventLabels: new Set<string>(),
      };
      existing.voyageIds.add(voyage.voyageId);
      if (point.eventLabel !== undefined) existing.eventLabels.add(point.eventLabel);
      byLocation.set(point.locationId, existing);
    }
  }
  return [...byLocation.entries()]
    .filter(([, entry]) => entry.voyageIds.size > 1)
    .map(([locationId, entry]) => ({
      locationId,
      voyageIds: [...entry.voyageIds],
      eventLabels: [...entry.eventLabels],
      comparisonAvailable: true,
    }));
}

function appendRoute(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
  choice: JourneyChoiceDefinition,
  stepId: string,
  now: string,
): readonly VoyageRoutePoint[] {
  if (choice.routeId === undefined) return record.route;
  const route = config.map.routes.find((candidate) => candidate.id === choice.routeId);
  if (route === undefined) throw new Error('ROUTE_NOT_FOUND');
  const destination = locationOrThrow(config, route.toLocationId);
  const startSequence = record.route.length;
  return [
    ...record.route,
    ...route.coordinates.slice(1).map((point, index) => ({
      voyageId: record.voyageId,
      pointId: `${stepId}-${index + 1}`,
      sequence: startSequence + index,
      legId: route.id,
      timestamp: now,
      locationId: index === route.coordinates.length - 2 ? destination.id : undefined,
      latitude: point.latitude,
      longitude: point.longitude,
      eventId: index === route.coordinates.length - 2 ? `event-${stepId}` : undefined,
      decisionId: choice.id,
      stateSnapshotId: `revision-${record.revision + 1}`,
    })),
  ];
}

function applyResourceChanges(
  config: JourneyProjectConfig,
  resources: Readonly<Record<string, number>>,
  choice: JourneyChoiceDefinition,
): Readonly<Record<string, number>> {
  const next = { ...resources };
  for (const [resourceId, change] of Object.entries(choice.resourceChanges ?? {})) {
    const definition = config.resources.find((item) => item.id === resourceId);
    if (definition === undefined) throw new Error('RESOURCE_NOT_FOUND');
    next[resourceId] = Math.min(
      definition.maximum,
      Math.max(definition.minimum, (next[resourceId] ?? 0) + change),
    );
  }
  return next;
}

function hasResponse(draft: JourneyResponseDraft): boolean {
  return (
    draft.text.trim().length >= 12 ||
    draft.transcript.trim().length >= 12 ||
    draft.mediaAssetId !== undefined
  );
}

function locationOrThrow(config: JourneyProjectConfig, locationId: string) {
  const location = config.map.locations.find((candidate) => candidate.id === locationId);
  if (location === undefined) throw new Error('LOCATION_NOT_FOUND');
  return location;
}
