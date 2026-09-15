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
    selectedSide: config.fieldStudio?.networkSide,
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
  const keys = [...new Set(segments.map(s => s.side))];
  const queues = keys.map(key => segments.filter(s => s.side === key));
  const result: BroadcastSegment[] = [];
  while (queues.some(q => q.length)) for (const queue of queues) { const next = queue.shift(); if (next) result.push(next); }
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
  const sides = config.networks.map(n => n.side);
  if (!sides.length || new Set(sides).size !== sides.length || sides.some(id => typeof id !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(id))) errors.push('Network keys must be unique stable IDs.');
  if (config.storyLeads.some(l => !sides.includes(l.side))) errors.push('Story references an unknown network.');
  for (const network of config.networks) {
    if (network.deskImageUrl.trim().length === 0) {
      errors.push(`Network ${network.id} is missing a project-specific desk image.`);
    }
    if (network.deskImageAlt.trim().length === 0) {
      errors.push(`Network ${network.id} is missing desk image alt text.`);
    }
  }
  for (const side of new Set([...sides, ...config.storyLeads.map(l => l.side), ...config.assignmentScenes.map(s => s.side)].filter(id => typeof id === 'string'))) {
    const scene = config.assignmentScenes.find((item) => item.side === side);
    if (scene === undefined && config.fieldStudio) continue;
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
