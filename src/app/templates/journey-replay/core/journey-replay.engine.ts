import type {
  ClassVoyageRecord,
  JourneyChoiceDefinition,
  JourneyProjectConfig,
  JourneyResponseDraft,
  JourneyStepDefinition,
  ReplayScene,
  StudentJourneyRecord,
  JourneyStudentResponse,
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
  if (record.selectedChoiceId === choiceId) return record;
  const drafts = { ...record.choiceDrafts };
  if (record.selectedChoiceId)
    drafts[`${step.id}:${record.selectedChoiceId}`] = record.responseDraft;
  return {
    ...record,
    selectedChoiceId: choiceId,
    choiceDrafts: drafts,
    responseDraft: drafts[`${step.id}:${choiceId}`] ?? EMPTY_DRAFT,
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
  assertResponse(config, choice, record.responseDraft);

  const responseId = `response-${step.id}`;
  const sceneId = `scene-${step.id}`;
  const route = appendRoute(config, record, choice, step.id, now);
  const resources = applyResourceChanges(config, record.resources, choice);
  const stepRecord = {
    stepId: step.id,
    choiceId: choice.id,
    evidenceSelected: [
      ...new Set(record.responseDraft.citations?.map((citation) => citation.evidenceId) ?? []),
    ],
    evidenceOffered: [...choice.evidenceIds],
    evidenceViewed: [...(record.responseDraft.evidenceViewed ?? [])],
    resourceBefore: { ...record.resources },
    resourceAfter: { ...resources },
    responseRevisions: [],
    studentResponse: {
      id: responseId,
      questionText: choice.question,
      responseMode: record.responseDraft.responseMode,
      text: record.responseDraft.text.trim() || undefined,
      transcript: record.responseDraft.transcript.trim() || undefined,
      mediaAssetId: record.responseDraft.mediaAssetId,
      masteryTags: [...step.masteryTags],
      useInReplay: true,
      citations: record.responseDraft.citations ?? [],
      prediction: record.responseDraft.prediction,
      tutorTurns: record.responseDraft.tutorTurns ?? [],
      planningTargetId: record.responseDraft.planningTargetId,
      planningText: record.responseDraft.planningText?.trim() || undefined,
      planningSubmitted: record.responseDraft.planningSubmitted,
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
  return currentStep(config, record)?.choices.find(
    (choice) => choice.id === record.selectedChoiceId,
  );
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
      locationId:
        index === route.coordinates.length - 2
          ? destination.id
          : config.map.locations.find(
              (location) =>
                Math.abs(location.latitude - point.latitude) < 0.001 &&
                Math.abs(location.longitude - point.longitude) < 0.001,
            )?.id,
      latitude: point.latitude,
      longitude: point.longitude,
      eventId: index === route.coordinates.length - 2 ? `event-${stepId}` : undefined,
      decisionId: choice.id,
      stateSnapshotId: `decision-${stepId}`,
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

export function hasResponse(draft: JourneyResponseDraft): boolean {
  return (
    isResponseText(draft.text) ||
    isResponseText(draft.transcript) ||
    Boolean(draft.mediaAssetId?.trim())
  );
}

function isResponseText(text: string): boolean {
  // Presence/structure only. Tutor and teacher evaluate the reasoning itself.
  return (
    text.trim().length >= 12 &&
    new Set(text.toLowerCase().replace(/\s/g, '')).size >= 4 &&
    text.trim().split(/\s+/).length >= 3
  );
}

export function assertResponse(
  config: JourneyProjectConfig,
  choice: JourneyChoiceDefinition,
  draft: JourneyResponseDraft,
  phase: 'planning' | 'revision' = 'planning',
): void {
  if (phase === 'planning' && choice.planning) {
    const target = choice.planning.targets.find(
      (candidate) => candidate.id === draft.planningTargetId,
    );
    if (!target) throw new Error('PLANNING_TARGET_REQUIRED');
    if (choice.planning.planPrompt && !isResponseText(draft.planningText ?? ''))
      throw new Error('PLANNING_TEXT_REQUIRED');
    if (!draft.planningSubmitted) throw new Error('PLANNING_SUBMISSION_REQUIRED');
  }
  if (!hasResponse(draft)) throw new Error('RESPONSE_REQUIRED');
  if (
    phase === 'planning' &&
    config.learning?.requirePrediction &&
    !isResponseText(draft.prediction ?? '')
  )
    throw new Error('PREDICTION_REQUIRED');
  const citations = draft.citations ?? [];
  if (config.learning?.requireCitation && citations.length === 0)
    throw new Error('CITATION_REQUIRED');
  for (const citation of citations) {
    const source = config.evidence.find((item) => item.id === citation.evidenceId);
    if (
      !choice.evidenceIds.includes(citation.evidenceId) ||
      !source?.paragraphs?.some((p) => p.id === citation.paragraphId) ||
      !isResponseText(citation.explanation)
    ) {
      throw new Error('CITATION_INVALID');
    }
  }
}

/** Revise reasoning without rewriting the already experienced route or original answer. */
export function reviseJourneyResponse(
  config: JourneyProjectConfig,
  record: StudentJourneyRecord,
  stepId: string,
  draft: JourneyResponseDraft,
  reason: string,
  now = new Date().toISOString(),
): StudentJourneyRecord {
  const completed = record.completedSteps.find((item) => item.stepId === stepId);
  const choice = config.steps
    .find((item) => item.id === stepId)
    ?.choices.find((item) => item.id === completed?.choiceId);
  if (!completed || !choice) throw new Error('RECORDED_STEP_REQUIRED');
  if (reason.trim().length < 3) throw new Error('REVISION_REASON_REQUIRED');
  assertResponse(config, choice, draft, 'revision');
  const response: JourneyStudentResponse = {
    ...completed.studentResponse,
    responseMode: draft.responseMode,
    text: draft.text.trim() || undefined,
    transcript: draft.transcript.trim() || undefined,
    mediaAssetId: draft.mediaAssetId,
    citations: draft.citations ?? [],
    prediction: draft.prediction,
    tutorTurns: draft.tutorTurns ?? [],
    planningTargetId: draft.planningTargetId,
    planningText: draft.planningText?.trim() || undefined,
    planningSubmitted: draft.planningSubmitted,
  };
  return {
    ...record,
    completedSteps: record.completedSteps.map((item) =>
      item.stepId !== stepId
        ? item
        : {
            ...item,
            studentResponse: response,
            evidenceSelected: [...new Set(response.citations?.map((c) => c.evidenceId) ?? [])],
            responseRevisions: [
              ...(item.responseRevisions ?? []),
              { response: item.studentResponse, revisedAt: now, reason: reason.trim() },
            ],
          },
    ),
  };
}

function locationOrThrow(config: JourneyProjectConfig, locationId: string) {
  const location = config.map.locations.find((candidate) => candidate.id === locationId);
  if (location === undefined) throw new Error('LOCATION_NOT_FOUND');
  return location;
}
