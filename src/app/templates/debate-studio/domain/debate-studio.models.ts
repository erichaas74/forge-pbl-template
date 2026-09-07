export type DebateRoom = 'chamber' | 'premiere' | 'ballot' | 'verdict';

export type DebateStation = 'opponent' | 'moderator' | 'evidence' | 'lectern' | 'premiere';

export type DebateSessionStatus =
  | 'case-building'
  | 'openings'
  | 'exchange'
  | 'crossfire'
  | 'closings'
  | 'premiere-ready'
  | 'premiere'
  | 'voting'
  | 'complete';

export type DebateRoundType = 'opening' | 'response' | 'rebuttal' | 'crossfire' | 'closing';
export type DebateRoundMode = 'parallel' | 'alternating';
export type DebateTurnStatus = 'locked' | 'available' | 'drafting' | 'filed';
export type ModeratorPromptStatus = 'proposed' | 'approved' | 'released' | 'superseded';
export type DebateRecordingKind = 'video' | 'audio' | 'transcript';
export type DebateConnectionState = 'connecting' | 'shared' | 'error';

export type ArgumentMarker =
  | 'answer-this'
  | 'challenge-this'
  | 'strong-evidence'
  | 'weak-evidence'
  | 'needs-context'
  | 'save-for-closing';

export type EvidenceMark = 'support' | 'challenge' | 'context' | 'closing' | 'fact-check';

export interface DebateFactionRole {
  readonly id: string;
  readonly label: string;
  readonly roundTypes: readonly DebateRoundType[];
}

export interface DebateFaction {
  readonly id: string;
  readonly name: string;
  readonly railLabel?: string;
  readonly shortName: string;
  readonly position: string;
  readonly accent: string;
  readonly emblem: string;
  readonly roles: readonly DebateFactionRole[];
}

export interface DebateEvidence {
  readonly id: string;
  readonly title: string;
  readonly dateLabel: string;
  readonly sourceType: string;
  readonly excerpt: string;
  readonly context: string;
  readonly citation: string;
  readonly perspective: string;
}

export interface DebateRoundDefinition {
  readonly id: string;
  readonly type: DebateRoundType;
  readonly label: string;
  readonly mode: DebateRoundMode;
  readonly moderatorBeforeTurn: boolean;
  readonly speakerOrder?: readonly [string, string];
  readonly timeLimitSeconds: number;
  readonly minimumSeconds: number;
  readonly minimumEvidence: number;
  readonly allowNewEvidence: boolean;
  readonly preparationPrompts: readonly string[];
}

export interface DebateModeratorConfig {
  readonly title: string;
  readonly displayName: string;
  readonly initials: string;
  readonly mode: 'teacher-written' | 'ai-draft-teacher-approve' | 'automatic';
  readonly requiredConcepts: readonly string[];
  readonly promptPriorities: readonly string[];
}

export interface DebateVoteCategory {
  readonly id: string;
  readonly label: string;
  readonly prompt: string;
  readonly optionSource: 'factions' | 'speakers' | 'turns';
}

export interface DebateOpinionOption {
  readonly id: string;
  readonly label: string;
  readonly factionId?: string;
}

export interface DebateViewer {
  readonly studentId: string;
  readonly studentDisplayName: string;
  readonly classLabel: string;
  readonly classId: string;
  readonly teacherDisplayName: string;
  readonly factionId: string;
  readonly roleLabel: string;
  readonly mode: 'student' | 'teacher' | 'preview';
  readonly allowTeacherPreview: boolean;
}

export interface SeedDebateTurn {
  readonly turnId: string;
  readonly speakerId: string;
  readonly speakerDisplayName: string;
  readonly transcript: string;
  readonly evidenceIds: readonly string[];
  readonly reasoningContribution: string;
  readonly durationSeconds: number;
  readonly filedAt: string;
}

export interface SeedModeratorPrompt {
  readonly id: string;
  readonly targetTurnId: string;
  readonly question: string;
  readonly reason: string;
  readonly triggerTurnIds: readonly string[];
  readonly status: 'approved' | 'released';
}

export interface DebateStudioProjectConfig {
  readonly schemaVersion: '2.0';
  readonly template: {
    readonly id: 'debate-studio';
    readonly version: '2.0';
  };
  readonly projectId: string;
  readonly projectVersion: string;
  /** @deprecated Supplied by ProjectSessionContext at launch; retained for package compatibility. */
  readonly sessionId: string;
  readonly title: string;
  readonly subtitle: string;
  readonly historicalSetting: string;
  readonly sessionDateLabel: string;
  readonly centralQuestion: string;
  readonly chamberImageUrl: string;
  readonly chamberImageAlt: string;
  readonly factions: readonly [DebateFaction, DebateFaction];
  readonly rounds: readonly DebateRoundDefinition[];
  readonly evidence: readonly DebateEvidence[];
  readonly moderator: DebateModeratorConfig;
  readonly opinionOptions: readonly DebateOpinionOption[];
  readonly voteCategories: readonly DebateVoteCategory[];
  /** @deprecated Supplied by ProjectSessionContext at launch; retained for package compatibility. */
  readonly viewer: DebateViewer;
  readonly seedTurns: readonly SeedDebateTurn[];
  readonly seedModeratorPrompts: readonly SeedModeratorPrompt[];
}

export interface DebateMember {
  readonly id: string;
  readonly displayName: string;
  readonly factionId: string;
  readonly role: 'student' | 'teacher';
  readonly joinedAt: string;
}

export interface DebateRecording {
  readonly assetId: string;
  readonly storagePath: string;
  readonly downloadUrl: string;
  readonly kind: DebateRecordingKind;
  readonly contentType: string;
  readonly durationSeconds: number;
  readonly uploadedAt: string;
}

export interface DebateArgumentAnnotation {
  readonly id: string;
  readonly studentId: string;
  readonly sourceTurnId: string;
  readonly excerpt: string;
  readonly marker: ArgumentMarker;
  readonly createdAt: string;
}

export interface DebateTurn {
  readonly id: string;
  readonly roundId: string;
  readonly roundType: DebateRoundType;
  readonly roundLabel: string;
  readonly order: number;
  readonly factionId: string;
  readonly assignedRoleId: string;
  readonly dependsOnTurnIds: readonly string[];
  readonly moderatorRequired: boolean;
  readonly status: DebateTurnStatus;
  readonly speakerId?: string;
  readonly speakerDisplayName?: string;
  readonly transcript?: string;
  readonly evidenceIds: readonly string[];
  readonly opponentAnnotations: readonly DebateArgumentAnnotation[];
  readonly reasoningContribution?: string;
  readonly recording?: DebateRecording;
  readonly durationSeconds?: number;
  readonly filedAt?: string;
  readonly teacherFeedback?: string;
  readonly argumentMasteryTags: readonly string[];
  readonly historicalAccuracyTags: readonly string[];
  readonly rebuttalQuality?: number;
  readonly communicationRubric?: number;
}

export interface ModeratorPrompt {
  readonly id: string;
  readonly targetTurnId: string;
  readonly question: string;
  readonly reason: string;
  readonly triggerTurnIds: readonly string[];
  readonly priority: string;
  readonly status: ModeratorPromptStatus;
  readonly createdAt: string;
  readonly approvedBy?: string;
  readonly approvedAt?: string;
  readonly releasedAt?: string;
  readonly generation: number;
}

export interface DebateBroadcastSegment {
  readonly id: string;
  readonly kind: 'ceremony' | 'round-title' | 'moderator' | 'student' | 'decision';
  readonly title: string;
  readonly roundLabel: string;
  readonly transcript: string;
  readonly factionId?: string;
  readonly speakerDisplayName?: string;
  readonly turnId?: string;
  readonly promptId?: string;
  readonly evidenceIds: readonly string[];
  readonly recording?: DebateRecording;
  readonly durationSeconds: number;
}

export interface DebateVote {
  readonly studentId: string;
  readonly choiceId: string;
  readonly castAt: string;
}

export interface DebateReflection {
  readonly studentId: string;
  readonly text: string;
  readonly submittedAt: string;
}

export interface DebateSession {
  readonly schemaVersion: '2.0';
  readonly id: string;
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly classId: string;
  readonly status: DebateSessionStatus;
  readonly revision: number;
  readonly currentTurnId: string | null;
  readonly currentRound: number;
  readonly members: Readonly<Record<string, DebateMember>>;
  readonly turns: readonly DebateTurn[];
  readonly moderatorQueue: readonly ModeratorPrompt[];
  readonly broadcastTimeline: readonly DebateBroadcastSegment[];
  readonly preVotes: Readonly<Record<string, DebateVote>>;
  readonly postVotes: Readonly<Record<string, DebateVote>>;
  readonly categoryVotes: Readonly<Record<string, Readonly<Record<string, DebateVote>>>>;
  readonly reflections: Readonly<Record<string, DebateReflection>>;
  readonly premiereCompletedAt?: string;
  readonly eventHistory: readonly DebateRuntimeEvent[];
  readonly processedEventIds: readonly string[];
  readonly updatedAt: string;
}

export interface DebateTurnFiling {
  readonly speakerId: string;
  readonly speakerDisplayName: string;
  readonly transcript: string;
  readonly evidenceIds: readonly string[];
  readonly opponentAnnotations: readonly DebateArgumentAnnotation[];
  readonly reasoningContribution: string;
  readonly recording?: DebateRecording;
  readonly durationSeconds: number;
  readonly filedAt: string;
}

export interface DebateWorkspaceState {
  readonly schemaVersion: '2.0';
  readonly room: DebateRoom;
  readonly activeStation?: DebateStation;
  readonly activeTurnId?: string;
  readonly opponentPlaybackCompleteTurnId?: string;
  readonly opponentHeardTurnId?: string;
  readonly moderatorHeardPromptId?: string;
  readonly annotations: readonly DebateArgumentAnnotation[];
  readonly evidenceMarks: Readonly<Partial<Record<string, EvidenceMark>>>;
  readonly selectedEvidenceIds: readonly string[];
  readonly draft: string;
  readonly reasoningContribution: string;
  readonly rehearsalSeconds: number;
  readonly rehearsed: boolean;
  readonly recordingReady: boolean;
  readonly recordingKind?: DebateRecordingKind;
  readonly recordingDurationSeconds: number;
  readonly reflection: string;
  readonly categorySelections: Readonly<Record<string, string>>;
  readonly activeSegmentIndex: number;
  readonly premierePlaying: boolean;
  readonly verdictStep: number;
}

export interface DebateRuntimeEvent {
  readonly id: string;
  readonly clientEventId: string;
  readonly eventType: string;
  readonly timestamp: string;
  readonly projectId: string;
  readonly actor: {
    readonly type: 'student' | 'teacher' | 'system';
    readonly id: string;
  };
  readonly payload?: Readonly<Record<string, unknown>>;
}
