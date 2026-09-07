import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';
import type { HistoryLiveResearchLibrary } from './history-live-research';
import type { StoryReportingConfig, StoryReportingState } from '../reporting/story-reporting.models';

export type HistoryLiveSide = 'patriot' | 'british';

export type HistoryLiveRole = 'student' | 'producer';

export type HistoryLiveStage =
  | 'opening'
  | 'side'
  | 'assignment'
  | 'pitch'
  | 'sources'
  | 'script'
  | 'production'
  | 'broadcast'
  | 'schedule'
  | 'showcase';

export type StoryPitchStatus = 'draft' | 'submitted' | 'approved' | 'revise';

export type ReportFormat =
  | 'Breaking News'
  | 'Field Report'
  | 'Investigative Report'
  | 'Fact Check'
  | 'Human-Interest Story'
  | 'Military Analysis'
  | 'Political Analysis'
  | 'Historical Explainer';

export type SourcePerspective = HistoryLiveSide | 'international' | 'multiple';

export type ClaimStatus =
  'verified' | 'strongly-supported' | 'partially-supported' | 'uncertain' | 'disputed';

export type ScriptBlockType =
  | 'ON CAMERA'
  | 'VOICEOVER'
  | 'SHOW MAP'
  | 'SHOW SOURCE'
  | 'SHOW QUOTE'
  | 'TRANSITION'
  | 'LOWER THIRD'
  | 'REPORTER CLOSE';

export type CameraState = 'studio-wide' | 'reporter' | 'media-wall';

export type MediaType = 'image' | 'historical-map' | 'quote' | 'timeline' | 'simple-chart';

export interface HistoryLiveNetwork {
  readonly monogram?: string;
  readonly communities?: readonly string[];
  readonly id: string;
  readonly side: HistoryLiveSide;
  readonly name: string;
  readonly shortName: string;
  readonly deskLabel: string;
  readonly perspective: string;
  readonly accent: string;
  readonly deskImageUrl: string;
  readonly deskImageAlt: string;
  readonly deskLocationLabel: string;
}

export interface HistoryLiveAssignmentAdvocate {
  readonly leadId: string;
  readonly advocateLabel: string;
  readonly leftPercent: number;
  readonly topPercent: number;
  readonly widthPercent: number;
  readonly heightPercent: number;
}

export interface HistoryLiveAssignmentScene {
  readonly side: HistoryLiveSide;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly locationLabel: string;
  readonly advocates: readonly HistoryLiveAssignmentAdvocate[];
}

export interface HistoryLiveBeat {
  readonly id: string;
  readonly label: string;
  readonly glyph: string;
  readonly prompt: string;
}

export interface HistoryLiveStoryLead {
  readonly asOfDate?: string;
  readonly sourceIds?: readonly string[];
  readonly id: string;
  readonly side: HistoryLiveSide;
  readonly beatId: string;
  readonly headline: string;
  readonly question: string;
  readonly format: ReportFormat;
  readonly location: string;
  readonly whyNow: string;
}

export interface HistoryLiveSource {
  readonly availableOn?: string;
  readonly primary?: boolean;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly excerptKind?: 'summary' | 'quotation';
  readonly id: string;
  readonly title: string;
  readonly creator: string;
  readonly dateLabel: string;
  readonly sourceType: string;
  readonly perspective: SourcePerspective;
  readonly excerpt: string;
  readonly context: string;
  readonly citation: string;
  readonly url?: string;
  readonly tags: readonly string[];
}

export interface HistoryLiveClaim {
  readonly evidence?: readonly HistoryLiveEvidenceLink[];
  readonly reasoning?: string;
  readonly uncertainty?: string;
  readonly id: string;
  readonly text: string;
  readonly status: ClaimStatus;
  readonly supportingSourceIds: readonly string[];
}

export interface HistoryLiveScriptBlock {
  readonly claimId?: string;
  readonly id: string;
  readonly type: ScriptBlockType;
  readonly text: string;
  readonly sourceId?: string;
}

export interface HistoryLiveVisualScene {
  readonly caption?: string;
  readonly id: string;
  readonly camera: CameraState;
  readonly mediaType: MediaType;
  readonly label: string;
  readonly sourceId?: string;
}

export interface HistoryLivePitch {
  readonly asOfDate?: string;
  readonly reportingMode?: 'contemporary' | 'retrospective';
  readonly feedback?: string;
  readonly leadId?: string;
  readonly beatId: string;
  readonly headline: string;
  readonly storyQuestion: string;
  readonly whyAirtime: string;
  readonly reportFormat: ReportFormat;
  readonly evidenceNeeded: string;
  readonly initialPrediction: string;
  readonly opposingChallenge: string;
  readonly status: StoryPitchStatus;
}

export interface BroadcastSegment {
  readonly script?: readonly HistoryLiveScriptBlock[];
  readonly scenes?: readonly HistoryLiveVisualScene[];
  readonly recordingAssetId?: string;
  readonly recordingPoster?: {
    readonly src: string;
    readonly alt: string;
  };
  readonly transcript?: string;
  readonly sample?: boolean;
  readonly id: string;
  readonly reporter: string;
  readonly side: HistoryLiveSide;
  readonly networkName: string;
  readonly headline: string;
  readonly desk: string;
  readonly durationSeconds: number;
  readonly startLabel: string;
  readonly ready: boolean;
  readonly visualLabel: string;
}

export interface HistoryLiveViewer {
  readonly studentId: string;
  readonly studentDisplayName: string;
  readonly teacherDisplayName: string;
  readonly classLabel: string;
}

export interface HistoryLiveProjectConfig {
  readonly researchLibrary?: HistoryLiveResearchLibrary;
  readonly reporting?: StoryReportingConfig;
  readonly schemaVersion: '1.0';
  readonly template: {
    readonly id: 'history-live-broadcast';
    readonly version: '1.0' | '1.1';
  };
  readonly projectId: string;
  readonly projectVersion: string;
  readonly title: string;
  readonly event: string;
  readonly seasonLabel: string;
  readonly historicalWindow: string;
  readonly drivingQuestion: string;
  readonly broadcastDateLabel: string;
  readonly networks: readonly HistoryLiveNetwork[];
  readonly beats: readonly HistoryLiveBeat[];
  readonly storyLeads: readonly HistoryLiveStoryLead[];
  readonly assignmentScenes: readonly HistoryLiveAssignmentScene[];
  readonly sources: readonly HistoryLiveSource[];
  readonly seedSegments: readonly BroadcastSegment[];
  readonly reportFormats: readonly ReportFormat[];
  /** Legacy preview metadata; real identity is injected through enrollment context. */
  readonly viewer?: HistoryLiveViewer;
  readonly rubric?: readonly {
    readonly id: string;
    readonly label: string;
    readonly expectation: string;
  }[];
  readonly reflectionPrompt?: string;
  readonly broadcastStartMinutes?: number;
}

export interface HistoryLiveRuntimeState {
  readonly reporting?: StoryReportingState;
  readonly runtimeScope?: RuntimeScope;
  readonly packageStatus?: StoryPitchStatus;
  readonly packageFeedback?: string;
  readonly recordingAssetId?: string;
  readonly transcript?: string;
  readonly reflection?: string;
  readonly reflectionHistory?: readonly { readonly text: string; readonly timestamp: string }[];
  readonly pitchHistory?: readonly {
    readonly pitch: HistoryLivePitch;
    readonly timestamp: string;
  }[];
  readonly reviewHistory?: readonly {
    readonly target: 'pitch' | 'package';
    readonly decision: string;
    readonly feedback: string;
    readonly timestamp: string;
  }[];
  readonly claimDraft?: {
    readonly text: string;
    readonly reasoning: string;
    readonly uncertainty: string;
    readonly status: ClaimStatus;
    readonly evidence: readonly HistoryLiveEvidenceLink[];
  };
  readonly schemaVersion: '1.0';
  readonly revision: number;
  readonly stage: HistoryLiveStage;
  readonly role: HistoryLiveRole;
  readonly selectedSide?: HistoryLiveSide;
  readonly sideLocked: boolean;
  readonly pitch: HistoryLivePitch;
  readonly savedSourceIds: readonly string[];
  readonly selectedSourceId?: string;
  readonly claims: readonly HistoryLiveClaim[];
  readonly scriptBlocks: readonly HistoryLiveScriptBlock[];
  readonly visualSequence: readonly HistoryLiveVisualScene[];
  readonly studentSegmentReady: boolean;
  readonly schedule: readonly BroadcastSegment[];
  readonly activeSegmentIndex: number;
  readonly showStatus: 'ready' | 'live' | 'held' | 'ended';
  readonly audienceReactions: Readonly<Record<string, number>>;
  readonly eventHistory: readonly HistoryLiveRuntimeEvent[];
}

export interface HistoryLiveRuntimeEvent {
  readonly tenantId?: string;
  readonly projectVersion?: string;
  readonly classId?: string;
  readonly id: string;
  readonly eventType: string;
  readonly timestamp: string;
  readonly projectId: string;
  readonly actor: {
    readonly type: 'student' | 'teacher' | 'system';
    readonly id: string;
  };
  readonly payload?: Readonly<Record<string, unknown>>;
  readonly clientEventId: string;
}

export interface HistoryLiveEvidenceLink {
  readonly sourceId: string;
  readonly passage: string;
  readonly relationship: 'supports' | 'challenges';
}

export interface HistoryLiveEnrollment extends HistoryLiveViewer {
  readonly tenantId: string;
  readonly classId: string;
  readonly mode: 'demo' | 'classroom';
  readonly role: HistoryLiveRole;
  readonly permissions: readonly string[];
}
