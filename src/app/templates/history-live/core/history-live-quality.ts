import type {
  HistoryLiveProjectConfig,
  HistoryLiveRuntimeState,
  HistoryLiveStage,
  HistoryLiveSource,
} from '../domain/history-live.models';
import { validateResearchLibrary } from '../domain/history-live-research';

export function sourceUsable(source: HistoryLiveSource, state: HistoryLiveRuntimeState): boolean {
  return (
    state.pitch.reportingMode === 'retrospective' ||
    (!!source.availableOn && !!state.pitch.asOfDate && source.availableOn <= state.pitch.asOfDate)
  );
}

/** Checkpoints are cumulative and independent of the last visited screen. */
export function stageIssues(
  state: HistoryLiveRuntimeState,
  stage: HistoryLiveStage,
  config?: HistoryLiveProjectConfig,
): readonly string[] {
  if (stage === 'opening' || stage === 'side') return [];
  const issues: string[] = [];
  if (!state.selectedSide) issues.push('Choose a reporting network.');
  if (stage === 'assignment') return issues;
  if (!state.pitch.beatId) issues.push('Choose a story or news beat.');
  if (stage === 'pitch') return issues;
  if (state.pitch.status !== 'approved')
    issues.push('Submit your pitch and obtain producer approval.');
  if (stage === 'sources') return issues;
  if (state.savedSourceIds.length < 2) issues.push('Pin at least two sources.');
  if (
    config &&
    !config.sources.some(
      (source) =>
        state.savedSourceIds.includes(source.id) && source.primary && sourceUsable(source, state),
    )
  )
    issues.push('Include a primary source available for your reporting date.');
  if (
    config &&
    state.savedSourceIds.some(
      (id) => !config.sources.some((source) => source.id === id && sourceUsable(source, state)),
    )
  )
    issues.push('Remove later sources or explicitly choose retrospective reporting.');
  const completeClaims = state.claims.filter(
    (claim) =>
      (claim.reasoning?.trim().length ?? 0) >= 12 &&
      claim.evidence?.some(
        (link) =>
          link.relationship === 'supports' &&
          link.passage.trim().length >= 8 &&
          state.savedSourceIds.includes(link.sourceId),
      ) &&
      claim.evidence.every(
        (link) => link.passage.trim().length >= 8 && state.savedSourceIds.includes(link.sourceId),
      ) &&
      (!['uncertain', 'disputed', 'partially-supported'].includes(claim.status) ||
        (claim.uncertainty?.trim().length ?? 0) >= 12),
  );
  if (!completeClaims.length || completeClaims.length !== state.claims.length)
    issues.push(
      'Add a claim with a specific supporting passage and reasoning; explain any uncertainty.',
    );
  if (stage === 'script') return issues;
  if (
    state.scriptBlocks.length < 3 ||
    state.scriptBlocks.some((block) => block.text.trim().length < 12)
  )
    issues.push('Write at least three complete script cues, including an opening and closing.');
  if (
    !state.scriptBlocks.some((block) => block.type === 'ON CAMERA') ||
    !state.scriptBlocks.some((block) => block.type === 'REPORTER CLOSE')
  )
    issues.push('Include ON CAMERA and REPORTER CLOSE cues.');
  if (state.claims.some((claim) => !state.scriptBlocks.some((block) => block.claimId === claim.id)))
    issues.push('Link each checked claim to a script cue.');
  if (
    state.scriptBlocks.some(
      (block) => block.claimId && !state.claims.some((claim) => claim.id === block.claimId),
    )
  )
    issues.push('Repair script links to removed claims.');
  if (stage === 'production') return issues;
  if (
    config &&
    state.visualSequence.some(
      (scene) =>
        (scene.mediaType === 'image' || scene.mediaType === 'historical-map') &&
        !config.sources.find((source) => source.id === scene.sourceId)?.imageUrl,
    )
  ) {
    issues.push(
      'Choose an evidence caption or timeline for sources without an embedded image. Open the cited original to inspect a map.',
    );
  }
  if (state.visualSequence.some((scene) => scene.mediaType === 'simple-chart'))
    issues.push('Chart rendering is unavailable. Choose a supported scene format.');
  if (
    state.visualSequence.length < 3 ||
    state.visualSequence.some(
      (scene) =>
        !scene.sourceId ||
        !state.savedSourceIds.includes(scene.sourceId) ||
        (scene.caption?.trim().length ?? 0) < 8,
    )
  )
    issues.push('Assign a pinned source and evidence caption to each of three scenes.');
  if (stage === 'broadcast') return issues;
  if (!state.studentSegmentReady || state.packageStatus !== 'approved')
    issues.push('Submit the package and obtain producer clearance.');
  return issues;
}

export function validateHistoryLiveContent(config: HistoryLiveProjectConfig): readonly string[] {
  const issues: string[] = [...validateResearchLibrary(config)];
  for (const collection of [config.sources, config.storyLeads, config.beats, config.networks]) {
    if (new Set(collection.map((item) => item.id)).size !== collection.length)
      issues.push('DUPLICATE_ID: Content IDs must be unique.');
  }
  for (const source of config.sources) {
    if (!source.url || !/^https:\/\//.test(source.url))
      issues.push(`SOURCE_URL_MISSING: ${source.id}`);
    if (!source.availableOn || !/^\d{4}-\d{2}-\d{2}$/.test(source.availableOn))
      issues.push(`SOURCE_DATE_MISSING: ${source.id}`);
  }
  for (const lead of config.storyLeads) {
    const packet =
      lead.sourceIds?.map((id) => config.sources.find((source) => source.id === id)) ?? [];
    if (!config.beats.some((beat) => beat.id === lead.beatId))
      issues.push(`BEAT_REFERENCE_MISSING: ${lead.id}`);
    if (packet.length < 2 || packet.some((source) => !source))
      issues.push(`SOURCE_PACKET_INCOMPLETE: ${lead.id}`);
    if (!packet.some((source) => source?.primary))
      issues.push(`PRIMARY_SOURCE_MISSING: ${lead.id}`);
    if (
      !lead.asOfDate ||
      packet.some((source) => source?.availableOn && source.availableOn > lead.asOfDate!)
    )
      issues.push(`SOURCE_PACKET_DATE_CONFLICT: ${lead.id}`);
  }
  return issues;
}
