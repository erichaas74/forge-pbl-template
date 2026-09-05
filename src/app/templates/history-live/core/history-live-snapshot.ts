import type { HistoryLiveRuntimeState } from '../domain/history-live.models';

const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');
const text = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => typeof value[key] === 'string');
const list = (value: unknown, check: (item: Record<string, unknown>) => boolean) =>
  Array.isArray(value) && value.every((item) => record(item) && check(item));
const optionalText = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => value[key] === undefined || typeof value[key] === 'string');
const evidence = (value: unknown) =>
  list(
    value,
    (item) =>
      text(item, ['sourceId', 'passage']) &&
      ['supports', 'challenges'].includes(String(item['relationship'])),
  );
const blocks = (value: unknown) =>
  list(
    value,
    (item) =>
      text(item, ['id', 'text']) &&
      [
        'ON CAMERA',
        'VOICEOVER',
        'SHOW MAP',
        'SHOW SOURCE',
        'SHOW_QUOTE',
        'SHOW QUOTE',
        'TRANSITION',
        'LOWER THIRD',
        'REPORTER CLOSE',
      ].includes(String(item['type'])) &&
      optionalText(item, ['sourceId', 'claimId']),
  );
const scenes = (value: unknown) =>
  list(
    value,
    (item) =>
      text(item, ['id', 'label']) &&
      ['studio-wide', 'reporter', 'media-wall'].includes(String(item['camera'])) &&
      ['image', 'historical-map', 'quote', 'timeline', 'simple-chart'].includes(
        String(item['mediaType']),
      ) &&
      optionalText(item, ['sourceId', 'caption']),
  );
const pitch = (value: unknown) =>
  record(value) &&
  text(value, [
    'beatId',
    'headline',
    'storyQuestion',
    'whyAirtime',
    'reportFormat',
    'evidenceNeeded',
    'initialPrediction',
    'opposingChallenge',
  ]) &&
  ['draft', 'submitted', 'approved', 'revise'].includes(String(value['status'])) &&
  optionalText(value, ['asOfDate', 'reportingMode', 'feedback', 'leadId']);

/** Treat storage as untrusted input; reject malformed collections before rendering. */
export function isHistoryLiveSnapshot(value: unknown): value is HistoryLiveRuntimeState {
  if (
    !record(value) ||
    value['schemaVersion'] !== '1.0' ||
    !Number.isSafeInteger(value['revision']) ||
    Number(value['revision']) < 1
  )
    return false;
  if (
    ![
      'opening',
      'side',
      'assignment',
      'pitch',
      'sources',
      'script',
      'production',
      'broadcast',
      'schedule',
      'showcase',
    ].includes(String(value['stage']))
  )
    return false;
  if (
    !['student', 'producer'].includes(String(value['role'])) ||
    ![undefined, 'patriot', 'british'].includes(value['selectedSide'] as string | undefined)
  )
    return false;
  if (
    typeof value['sideLocked'] !== 'boolean' ||
    typeof value['studentSegmentReady'] !== 'boolean' ||
    !pitch(value['pitch'])
  )
    return false;
  if (
    !strings(value['savedSourceIds']) ||
    !blocks(value['scriptBlocks']) ||
    !scenes(value['visualSequence'])
  )
    return false;
  if (
    !list(
      value['claims'],
      (item) =>
        text(item, ['id', 'text']) &&
        ['verified', 'strongly-supported', 'partially-supported', 'uncertain', 'disputed'].includes(
          String(item['status']),
        ) &&
        strings(item['supportingSourceIds']) &&
        (item['evidence'] === undefined || evidence(item['evidence'])) &&
        optionalText(item, ['reasoning', 'uncertainty']),
    )
  )
    return false;
  if (
    !list(
      value['schedule'],
      (item) =>
        text(item, [
          'id',
          'reporter',
          'networkName',
          'headline',
          'desk',
          'startLabel',
          'visualLabel',
        ]) &&
        ['patriot', 'british'].includes(String(item['side'])) &&
        typeof item['ready'] === 'boolean' &&
        Number.isFinite(item['durationSeconds']) &&
        Number(item['durationSeconds']) >= 0 &&
        (item['script'] === undefined || blocks(item['script'])) &&
        (item['scenes'] === undefined || scenes(item['scenes'])) &&
        optionalText(item, ['recordingAssetId', 'transcript']),
    )
  )
    return false;
  if (
    !Number.isSafeInteger(value['activeSegmentIndex']) ||
    Number(value['activeSegmentIndex']) < 0 ||
    Number(value['activeSegmentIndex']) >= Math.max(1, (value['schedule'] as unknown[]).length)
  )
    return false;
  if (
    !['ready', 'live', 'held', 'ended'].includes(String(value['showStatus'])) ||
    !record(value['audienceReactions']) ||
    !Object.values(value['audienceReactions']).every(
      (count) => Number.isSafeInteger(count) && Number(count) >= 0,
    )
  )
    return false;
  if (
    !list(
      value['eventHistory'],
      (event) =>
        text(event, ['id', 'eventType', 'timestamp', 'projectId', 'clientEventId']) &&
        record(event['actor']) &&
        text(event['actor'], ['type', 'id']),
    )
  )
    return false;
  if (
    !optionalText(value, [
      'packageStatus',
      'packageFeedback',
      'recordingAssetId',
      'transcript',
      'reflection',
      'selectedSourceId',
    ])
  )
    return false;
  if (
    value['reflectionHistory'] !== undefined &&
    !list(value['reflectionHistory'], (item) => text(item, ['text', 'timestamp']))
  )
    return false;
  if (
    value['pitchHistory'] !== undefined &&
    !list(value['pitchHistory'], (item) => pitch(item['pitch']) && text(item, ['timestamp']))
  )
    return false;
  if (
    value['reviewHistory'] !== undefined &&
    !list(value['reviewHistory'], (item) =>
      text(item, ['target', 'decision', 'feedback', 'timestamp']),
    )
  )
    return false;
  const draft = value['claimDraft'];
  if (
    draft !== undefined &&
    (!record(draft) ||
      !text(draft, ['text', 'reasoning', 'uncertainty', 'status']) ||
      !evidence(draft['evidence']))
  )
    return false;
  return true;
}
