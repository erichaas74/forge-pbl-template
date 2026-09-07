import type {
  JourneyProjectConfig,
  JourneyResponseDraft,
  StudentJourneyRecord,
} from '../domain/journey-replay.models';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  selectJourneyChoice,
  updateJourneyResponseDraft,
} from './journey-replay.engine';

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function string(value: unknown, max = 20000): value is string {
  return typeof value === 'string' && value.length <= max;
}
function fail(): never {
  throw new Error('INVALID_JOURNEY_RECORD');
}

export function isJourneyDraft(value: unknown): value is JourneyResponseDraft {
  if (
    !object(value) ||
    !['text', 'audio'].includes(String(value['responseMode'])) ||
    !string(value['text']) ||
    !string(value['transcript'])
  )
    return false;
  if (
    value['mediaAssetId'] !== undefined &&
    (!string(value['mediaAssetId'], 180) || !/^[a-zA-Z0-9:_-]+$/.test(value['mediaAssetId']))
  )
    return false;
  if (value['prediction'] !== undefined && !string(value['prediction'])) return false;
  if (value['planningTargetId'] !== undefined && !string(value['planningTargetId'], 120))
    return false;
  if (value['planningText'] !== undefined && !string(value['planningText'])) return false;
  if (value['planningSubmitted'] !== undefined && typeof value['planningSubmitted'] !== 'boolean')
    return false;
  if (
    value['citations'] !== undefined &&
    (!Array.isArray(value['citations']) ||
      value['citations'].length > 20 ||
      !value['citations'].every(
        (c) =>
          object(c) &&
          string(c['evidenceId'], 120) &&
          string(c['paragraphId'], 120) &&
          string(c['explanation']),
      ))
  )
    return false;
  if (
    value['evidenceViewed'] !== undefined &&
    (!Array.isArray(value['evidenceViewed']) ||
      !value['evidenceViewed'].every((id) => string(id, 120)))
  )
    return false;
  if (
    value['tutorTurns'] !== undefined &&
    (!Array.isArray(value['tutorTurns']) ||
      value['tutorTurns'].length > 20 ||
      !value['tutorTurns'].every(
        (t) =>
          object(t) &&
          [
            'id',
            'stepId',
            'choiceId',
            'criterionId',
            'responseFingerprint',
            'question',
            'createdAt',
          ].every((k) => string(t[k])) &&
          ['scaffold', 'tutor'].includes(String(t['source'])) &&
          (t['answer'] === undefined || string(t['answer'])) &&
          (t['explanation'] === undefined || string(t['explanation'])),
      ))
  )
    return false;
  return true;
}

export function responseDraft(response: Record<string, unknown>): JourneyResponseDraft {
  const draft = {
    ...response,
    text: response['text'] ?? '',
    transcript: response['transcript'] ?? '',
  };
  if (!isJourneyDraft(draft)) fail();
  return draft;
}

/** Validate untrusted imports/HTTP writes and reconstruct derived geography and consequences. */
export function validateJourneyRecord(
  config: JourneyProjectConfig,
  value: unknown,
  previous?: StudentJourneyRecord,
): StudentJourneyRecord {
  if (
    !object(value) ||
    JSON.stringify(value).length > 2_000_000 ||
    value['schemaVersion'] !== '1.0' ||
    value['projectId'] !== config.projectId ||
    value['projectVersion'] !== config.projectVersion ||
    !string(value['studentId'], 180) ||
    !string(value['voyageId'], 250) ||
    !Number.isInteger(value['revision']) ||
    Number(value['revision']) < 0 ||
    !isJourneyDraft(value['responseDraft'])
  )
    fail();
  if (
    !Array.isArray(value['completedSteps']) ||
    value['completedSteps'].length > config.steps.length ||
    !Array.isArray(value['route']) ||
    !Array.isArray(value['replayTimeline']) ||
    !Array.isArray(value['mastery']) ||
    !Array.isArray(value['eventHistory']) ||
    value['eventHistory'].length > 100 ||
    !object(value['resources'])
  )
    fail();
  if (
    value['currentStepIndex'] !== value['completedSteps'].length ||
    value['completionStatus'] !==
      (value['completedSteps'].length === config.steps.length ? 'complete' : 'in-progress')
  )
    fail();
  if (
    value['selectedChoiceId'] !== undefined &&
    !config.steps[value['completedSteps'].length]?.choices.some(
      (c) => c.id === value['selectedChoiceId'],
    )
  )
    fail();
  if (
    value['choiceDrafts'] !== undefined &&
    (!object(value['choiceDrafts']) ||
      Object.entries(value['choiceDrafts']).some(
        ([key, draft]) =>
          !config.steps.some((s) => s.choices.some((c) => `${s.id}:${c.id}` === key)) ||
          !isJourneyDraft(draft),
      ))
  )
    fail();
  let canonical = createInitialJourneyRecord(config, value['studentId']);
  for (const [index, completed] of value['completedSteps'].entries()) {
    const definition = config.steps[index];
    if (
      !object(completed) ||
      completed['stepId'] !== definition.id ||
      !string(completed['choiceId'], 120) ||
      !object(completed['studentResponse']) ||
      !string(completed['completedAt'], 80) ||
      !Number.isFinite(Date.parse(completed['completedAt']))
    )
      fail();
    const choice = definition.choices.find((c) => c.id === completed['choiceId']);
    if (!choice || completed['studentResponse']['questionText'] !== choice.question) fail();
    const draft = responseDraft(completed['studentResponse']);
    if (
      draft.tutorTurns?.some(
        (t) =>
          t.stepId !== definition.id ||
          t.choiceId !== choice.id ||
          !config.learning?.criteria.some((c) => c.id === t.criterionId),
      )
    )
      fail();
    if (
      completed['responseRevisions'] !== undefined &&
      (!Array.isArray(completed['responseRevisions']) ||
        completed['responseRevisions'].length > 100 ||
        !completed['responseRevisions'].every(
          (r) =>
            object(r) &&
            object(r['response']) &&
            isJourneyDraft({
              ...r['response'],
              text: r['response']['text'] ?? '',
              transcript: r['response']['transcript'] ?? '',
            }) &&
            string(r['reason']) &&
            string(r['revisedAt']),
        ))
    )
      fail();
    const prior = previous?.completedSteps[index];
    if (prior) {
      if (prior.choiceId !== choice.id) throw new Error('RECORDED_CHOICE_IMMUTABLE');
      if (
        JSON.stringify(prior.studentResponse) !== JSON.stringify(completed['studentResponse']) &&
        !(completed['responseRevisions'] as { response: unknown }[] | undefined)?.some(
          (r) => JSON.stringify(r.response) === JSON.stringify(prior.studentResponse),
        )
      )
        throw new Error('RESPONSE_HISTORY_REQUIRED');
    }
    canonical = completeJourneyStep(
      config,
      updateJourneyResponseDraft(selectJourneyChoice(config, canonical, choice.id), draft),
      completed['completedAt'],
    );
  }
  if (previous && previous.completedSteps.length > canonical.completedSteps.length)
    throw new Error('RECORDED_HISTORY_REQUIRED');
  if (
    value['route'].length !== canonical.route.length ||
    value['replayTimeline'].length !== canonical.replayTimeline.length
  )
    fail();
  value['route'].forEach((point, index) => {
    if (
      !object(point) ||
      point['latitude'] !== canonical.route[index].latitude ||
      point['longitude'] !== canonical.route[index].longitude ||
      point['sequence'] !== index
    )
      fail();
  });
  value['replayTimeline'].forEach((scene, index) => {
    if (
      !object(scene) ||
      scene['id'] !== canonical.replayTimeline[index].id ||
      scene['routePointSequenceEnd'] !== canonical.replayTimeline[index].routePointSequenceEnd ||
      typeof scene['hidden'] !== 'boolean'
    )
      fail();
  });
  // Spread only validated record fields; derived content comes from trusted configuration.
  const record = value as unknown as StudentJourneyRecord;
  return {
    ...canonical,
    revision: record.revision,
    selectedChoiceId: record.selectedChoiceId,
    responseDraft: record.responseDraft,
    choiceDrafts: record.choiceDrafts ?? {},
    eventHistory: record.eventHistory.filter(
      (event) =>
        object(event) &&
        string(event['eventType']) &&
        string(event['timestamp']) &&
        object(event['actor']),
    ),
    route: canonical.route.map((point, index) => ({
      ...point,
      timestamp: record.route[index].timestamp || point.timestamp,
    })),
    completedSteps: canonical.completedSteps.map((step, index) => ({
      ...step,
      studentResponse: record.completedSteps[index].studentResponse,
      responseRevisions: record.completedSteps[index].responseRevisions ?? [],
    })),
    replayTimeline: canonical.replayTimeline.map((scene, index) => ({
      ...scene,
      hidden: config.replay.allowStudentSceneHiding && record.replayTimeline[index].hidden,
    })),
  };
}
