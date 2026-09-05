export type ExhibitUserRole = 'student' | 'teacher' | 'family';

export interface ExhibitActor {
  readonly id: string;
  readonly role: ExhibitUserRole;
  readonly courseSectionIds: readonly string[];
  readonly teamIds: readonly string[];
}

export interface ArtifactValidationResult {
  readonly valid: boolean;
  readonly errors: readonly {
    readonly fieldId: string;
    readonly message: string;
    readonly focusTarget?: string;
  }[];
  readonly warnings: readonly {
    readonly fieldId?: string;
    readonly message: string;
  }[];
}

export interface DefensePrompt {
  readonly id: string;
  readonly label: string;
  readonly guidance?: string;
}

export interface ExhibitRequirement {
  readonly fieldId: string;
  readonly required: boolean;
  readonly minItems?: number;
  readonly maxItems?: number;
  readonly maxWords?: number;
}

export interface ExhibitTemplateDefinition {
  readonly templateId: string;
  readonly version: number;
  readonly rendererType: string;
  readonly vocabulary: {
    readonly artifactSingular: string;
    readonly artifactPlural: string;
    readonly composeAction: string;
    readonly publishAction: string;
    readonly publishedState: string;
    readonly hallName: string;
    readonly peerResponseName: string;
    readonly presenterName: string;
  };
  readonly sourceAdapter: {
    readonly type: string;
    readonly allowedSlotIds: readonly string[];
  };
  readonly requirements: readonly ExhibitRequirement[];
  readonly peerResponse: {
    readonly enabled: boolean;
    readonly prompt: string;
    readonly maxWords: number;
    readonly maxPerArtifact: number;
    readonly minimumVisits: number;
    readonly minimumResponses: number;
  };
  readonly defense: {
    readonly required: boolean;
    readonly individual: boolean;
    readonly prompts: readonly DefensePrompt[];
    readonly fallbackChallenge?: string;
  };
  readonly publication: {
    readonly rehangLimit: number;
    readonly preventRehangAfterResponse: boolean;
    readonly allowFamilyView: boolean;
  };
  readonly theme: {
    readonly themeId: string;
    readonly corridorStyle: string;
    readonly frameStyle: string;
    readonly emptyLocationLabel: string;
  };
}

export interface MuseumBoardObject {
  readonly id: string;
  readonly title: string;
  readonly imageAssetId?: string;
  readonly imageAlt?: string;
  readonly description: string;
  readonly evidenceConnection: string;
  readonly sourceIds: readonly string[];
}

export interface MuseumBoardSource {
  readonly id: string;
  readonly citation: string;
  readonly url?: string;
}

export interface ImmersiveGalleryEmbed {
  readonly provider: 'metasteps';
  readonly title: string;
  readonly embedUrl: string;
}

export interface ExhibitVideoPresentation {
  readonly title: string;
  readonly videoUrl?: string;
  readonly prototype?: boolean;
  readonly presenterLabel?: string;
}

export interface ExhibitCorridorPreview {
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly walkUpAvailable: boolean;
}

export interface MuseumBoardSnapshotData {
  readonly title: string;
  readonly centralClaim: string;
  readonly objects: readonly MuseumBoardObject[];
  readonly sources: readonly MuseumBoardSource[];
  readonly immersiveGallery?: ImmersiveGalleryEmbed;
  readonly videoPresentation?: ExhibitVideoPresentation;
  readonly teamCredit: {
    readonly displayName: string;
    readonly memberDisplayNames?: readonly string[];
  };
  readonly themeVariant?: string;
}

export interface AccessibleExhibitSection {
  readonly heading: string;
  readonly body: string;
  readonly sourceLinks?: readonly { readonly label: string; readonly url: string }[];
}

export interface AccessibleExhibit {
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly AccessibleExhibitSection[];
}

export interface ExhibitRenderResult {
  readonly title: string;
  readonly summary: string;
  readonly itemCount: number;
  readonly readingTimeMinutes: number;
}

export interface PrintRenderResult {
  readonly title: string;
  readonly accessible: AccessibleExhibit;
}

export interface ExhibitRenderer {
  readonly type: string;
  readonly version: number;
  renderPreview(data: unknown): ExhibitRenderResult;
  renderWalkUp(data: unknown): ExhibitRenderResult;
  renderThumbnail(data: unknown): ExhibitRenderResult;
  renderAccessible(data: unknown): AccessibleExhibit;
  renderPrint?(data: unknown): PrintRenderResult;
}

export interface NotebookArtifactSource {
  readonly projectInstanceId: string;
  readonly teamId: string;
  readonly slots: Readonly<Record<string, unknown>>;
}

export interface ArtifactComposerResult<TData> {
  readonly data?: TData;
  readonly validation: ArtifactValidationResult;
  readonly omittedSlotIds: readonly string[];
}

export interface ArtifactComposerAdapter<TData> {
  readonly type: string;
  readonly allowedSlotIds: readonly string[];
  compose(source: NotebookArtifactSource): ArtifactComposerResult<TData>;
}

export interface ExhibitArtifact {
  readonly id: string;
  readonly projectInstanceId: string;
  readonly ownerType: 'team' | 'student';
  readonly ownerId: string;
  readonly templateId: string;
  readonly rendererType: string;
  readonly sourceAdapterType: string;
  readonly status: 'draft' | 'ready' | 'published' | 'locked';
  readonly currentSnapshotId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ExhibitSnapshot {
  readonly id: string;
  readonly artifactId: string;
  readonly version: number;
  readonly rendererType: string;
  readonly rendererVersion: number;
  readonly visitorSafeData: unknown;
  readonly accessibleData: AccessibleExhibit;
  readonly corridorPreview?: ExhibitCorridorPreview;
  readonly createdBy: string;
  readonly createdAt: string;
}

export interface HallHanging {
  readonly id: string;
  readonly hallId: string;
  readonly locationId: string;
  readonly artifactId: string;
  readonly currentSnapshotId: string;
  readonly publishedBy: string;
  readonly publishedAt: string;
  readonly lockedAt?: string;
}

export interface PeerResponse {
  readonly id: string;
  readonly hangingId: string;
  readonly snapshotId: string;
  readonly authorId: string;
  readonly authorDisplayName: string;
  readonly body: string;
  readonly status: 'draft' | 'posted' | 'hidden' | 'deleted';
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DefenseResponse {
  readonly id: string;
  readonly hangingId: string;
  readonly snapshotId: string;
  readonly studentId: string;
  readonly completionMode: 'live' | 'makeup';
  readonly answers: Readonly<Record<string, string>>;
  readonly status: 'draft' | 'submitted' | 'returned';
  readonly submittedAt?: string;
}

export interface OpeningSession {
  readonly id: string;
  readonly hallId: string;
  readonly phase: 'walk' | 'standing' | 'closed';
  readonly currentHangingId?: string;
  readonly revision: number;
  readonly navigationMode: 'independent' | 'teacher_follow';
  readonly peerResponsesEnabled: boolean;
  readonly docentStudentIds: readonly string[];
  readonly openedAt: string;
  readonly closedAt?: string;
}

export interface HallControls {
  readonly submissionLocked: boolean;
  readonly peerResponsesEnabled: boolean;
  readonly navigationMode: 'independent' | 'teacher_follow';
  readonly familyViewEnabled: boolean;
}

export interface HallTemplateInstance {
  readonly id: string;
  readonly courseSectionId: string;
  readonly projectInstanceId: string;
  readonly templateId: string;
  readonly templateVersion: number;
  readonly openingStartsAt?: string;
  readonly submissionLocksAt?: string;
  readonly peerResponsesCloseAt?: string;
  readonly familyViewExpiresAt?: string;
  readonly controls: HallControls;
  readonly locationOrder: readonly string[];
}

export interface ExhibitTeam {
  readonly id: string;
  readonly displayName: string;
  readonly memberIds: readonly string[];
  readonly memberDisplayNames: readonly string[];
  readonly locationId: string;
}

export interface LmsEvidenceEvent {
  readonly id: string;
  readonly idempotencyKey: string;
  readonly type: 'team_artifact_submitted' | 'peer_response_completed' | 'defense_completed';
  readonly projectInstanceId: string;
  readonly teamId?: string;
  readonly studentId?: string;
  readonly snapshotId: string;
  readonly occurredAt: string;
}

export type HallPhase = 'dark' | 'async_walk' | 'live_opening' | 'closed_readable';

export interface ExhibitHallState {
  readonly schemaVersion: '1.0';
  readonly revision: number;
  readonly sequence: number;
  readonly hall: HallTemplateInstance;
  readonly hallPhase: HallPhase;
  readonly artifacts: readonly ExhibitArtifact[];
  readonly snapshots: readonly ExhibitSnapshot[];
  readonly hangings: readonly HallHanging[];
  readonly peerResponses: readonly PeerResponse[];
  readonly defenses: readonly DefenseResponse[];
  readonly openingSession: OpeningSession;
  readonly lmsEvents: readonly LmsEvidenceEvent[];
  readonly completedOperations: Readonly<Record<string, string>>;
}

export interface HallLocationView {
  readonly locationId: string;
  readonly position: number;
  readonly team: ExhibitTeam;
  readonly hanging?: HallHanging;
  readonly snapshot?: ExhibitSnapshot;
}

export interface ExhibitSeedBoard {
  readonly teamId: string;
  readonly published: boolean;
  readonly corridorPreview?: ExhibitCorridorPreview;
  readonly data: MuseumBoardSnapshotData;
}

export interface ExhibitProjectConfig {
  readonly schemaVersion: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly projectInstanceId: string;
  readonly courseSectionId: string;
  readonly classLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly openingLabel: string;
  readonly creatorMode: 'individual_or_group';
  readonly template: ExhibitTemplateDefinition;
  readonly teams: readonly ExhibitTeam[];
  readonly seedBoards: readonly ExhibitSeedBoard[];
  readonly viewer: {
    readonly studentId: string;
    readonly studentDisplayName: string;
    readonly teamId: string;
    readonly teacherId: string;
    readonly teacherDisplayName: string;
  };
}

export interface ExhibitMutationResult {
  readonly ok: boolean;
  readonly state: ExhibitHallState;
  readonly error?: string;
  readonly entityId?: string;
  readonly duplicate?: boolean;
  readonly announcement?: string;
}
