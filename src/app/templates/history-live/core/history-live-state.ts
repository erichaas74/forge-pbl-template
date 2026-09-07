import { stageIssues } from './history-live-quality';
import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';
import type {
  BroadcastSegment,
  HistoryLivePitch,
  HistoryLiveProjectConfig,
  HistoryLiveRuntimeState,
  HistoryLiveSide,
  HistoryLiveStage,
} from '../domain/history-live.models';

export const HISTORY_LIVE_STAGES: readonly {
  readonly id: HistoryLiveStage;
  readonly label: string;
  readonly shortLabel: string;
}[] = [
  { id: 'opening', label: 'History Live', shortLabel: 'Open' },
  { id: 'side', label: 'Choose Network', shortLabel: 'Network' },
  { id: 'assignment', label: 'Assignment Desk', shortLabel: 'Story' },
  { id: 'pitch', label: 'Story Pitch', shortLabel: 'Pitch' },
  { id: 'sources', label: 'Source Wall', shortLabel: 'Research' },
  { id: 'script', label: 'Script Desk', shortLabel: 'Script' },
  { id: 'production', label: 'Production Studio', shortLabel: 'Produce' },
  { id: 'broadcast', label: 'Broadcast Preview', shortLabel: 'Preview' },
  { id: 'schedule', label: 'Producer Schedule', shortLabel: 'Schedule' },
  { id: 'showcase', label: 'Special Report', shortLabel: 'Watch' },
] as const;

export const EMPTY_PITCH: HistoryLivePitch = {
  beatId: '',
  headline: '',
  storyQuestion: '',
  whyAirtime: '',
  reportFormat: 'Field Report',
  evidenceNeeded: '',
  initialPrediction: '',
  opposingChallenge: '',
  asOfDate: '',
  reportingMode: 'contemporary',
  status: 'draft',
};

export function createInitialHistoryLiveState(
  config: HistoryLiveProjectConfig,
  runtimeScope?: RuntimeScope,
): HistoryLiveRuntimeState {
  return {
    runtimeScope,
    schemaVersion: '1.0',
    revision: 1,
    stage: 'opening',
    role: 'student',
    sideLocked: false,
    pitch: EMPTY_PITCH,
    savedSourceIds: [],
    claims: [],
    scriptBlocks: [
      {
        id: 'script-open',
        type: 'ON CAMERA',
        text: '',
      },
      {
        id: 'script-evidence',
        type: 'SHOW SOURCE',
        text: '',
      },
      {
        id: 'script-close',
        type: 'REPORTER CLOSE',
        text: '',
      },
    ],
    visualSequence: [
      {
        id: 'scene-open',
        camera: 'studio-wide',
        mediaType: 'timeline',
        label: 'Opening headline',
      },
      {
        id: 'scene-report',
        camera: 'reporter',
        mediaType: 'quote',
        label: 'Reporter on camera',
      },
      {
        id: 'scene-evidence',
        camera: 'media-wall',
        mediaType: 'quote',
        label: 'Primary-source evidence',
      },
    ],
    studentSegmentReady: false,
    schedule: [],
    packageStatus: 'draft',
    reflection: '',
    transcript: '',
    reflectionHistory: [],
    pitchHistory: [],
    reviewHistory: [],
    activeSegmentIndex: 0,
    showStatus: 'ready',
    audienceReactions: {},
    eventHistory: [],
  };
}

export function pitchMissingRequirements(pitch: HistoryLivePitch): readonly string[] {
  const fields = [
    ['News beat', pitch.beatId, 1],
    ['Working headline', pitch.headline, 8],
    ['Story question', pitch.storyQuestion, 12],
    ['Why this deserves airtime', pitch.whyAirtime, 12],
    ['Evidence you need', pitch.evidenceNeeded, 8],
    ['Initial prediction', pitch.initialPrediction, 12],
    ['Opposing-network check', pitch.opposingChallenge, 12],
  ] as const;
  const missing = fields
    .filter(([, value, minimum]) => value.trim().length < minimum)
    .map(
      ([label, , minimum]) =>
        `${label}: ${minimum === 1 ? 'choose a beat' : `at least ${minimum} characters`}`,
    );
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pitch.asOfDate ?? ''))
    missing.push('Report as of: choose a date');
  return missing;
}

export function isPitchReady(pitch: HistoryLivePitch): boolean {
  return pitchMissingRequirements(pitch).length === 0;
}

export function canOpenStage(state: HistoryLiveRuntimeState, stage: HistoryLiveStage): boolean {
  return stageIssues(state, stage).length === 0;
}

export function interleaveBroadcastSegments(
  segments: readonly BroadcastSegment[],
): readonly BroadcastSegment[] {
  const patriot = segments.filter((segment) => segment.side === 'patriot');
  const british = segments.filter((segment) => segment.side === 'british');
  const firstSide: HistoryLiveSide =
    (segments[0]?.side ?? 'patriot') === 'patriot' ? 'patriot' : 'british';
  const queues: Record<HistoryLiveSide, BroadcastSegment[]> = {
    patriot: [...patriot],
    british: [...british],
  };
  const result: BroadcastSegment[] = [];
  let side = firstSide;
  while (queues.patriot.length > 0 || queues.british.length > 0) {
    const next = queues[side].shift() ?? queues[side === 'patriot' ? 'british' : 'patriot'].shift();
    if (next !== undefined) result.push(next);
    side = side === 'patriot' ? 'british' : 'patriot';
  }
  return result;
}

export function formatBroadcastTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function validateHistoryLiveVisualConfig(
  config: HistoryLiveProjectConfig,
): readonly string[] {
  const errors: string[] = [];
  for (const network of config.networks) {
    if (network.deskImageUrl.trim().length === 0) {
      errors.push(`Network ${network.id} is missing a project-specific desk image.`);
    }
    if (network.deskImageAlt.trim().length === 0) {
      errors.push(`Network ${network.id} is missing desk image alt text.`);
    }
  }
  for (const side of ['patriot', 'british'] as const) {
    const scene = config.assignmentScenes.find((item) => item.side === side);
    if (scene === undefined) {
      errors.push(`Side ${side} is missing an assignment scene.`);
      continue;
    }
    const leads = config.storyLeads.filter((lead) => lead.side === side);
    for (const lead of leads) {
      const matches = scene.advocates.filter((advocate) => advocate.leadId === lead.id);
      if (matches.length !== 1) {
        errors.push(`Lead ${lead.id} must map to exactly one visible assignment advocate.`);
      }
    }
    for (const advocate of scene.advocates) {
      const values = [
        advocate.leftPercent,
        advocate.topPercent,
        advocate.widthPercent,
        advocate.heightPercent,
      ];
      const inBounds =
        values.every((value) => Number.isFinite(value) && value >= 0 && value <= 100) &&
        advocate.leftPercent + advocate.widthPercent <= 100 &&
        advocate.topPercent + advocate.heightPercent <= 100;
      if (!inBounds) errors.push(`Advocate surface for ${advocate.leadId} is outside the scene.`);
    }
  }
  return errors;
}
