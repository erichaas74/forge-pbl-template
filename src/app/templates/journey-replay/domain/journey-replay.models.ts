export type JourneyResponseMode = 'text' | 'audio';

export type JourneySceneType =
  | 'mission-brief'
  | 'departure'
  | 'map-travel'
  | 'decision'
  | 'crisis'
  | 'consequence'
  | 'encounter'
  | 'turning-point'
  | 'reflection';

export type JourneyMapLens = 'navigation' | 'weather' | 'trade' | 'risk' | 'evidence';

export interface GeoPoint {
  readonly latitude: number;
  readonly longitude: number;
}

export interface MapLocation extends GeoPoint {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly regionId: string;
  readonly type: 'port' | 'city' | 'region' | 'encounter' | 'waypoint';
  readonly description: string;
}

export interface JourneyRouteDefinition {
  readonly id: string;
  readonly fromLocationId: string;
  readonly toLocationId: string;
  readonly coordinates: readonly GeoPoint[];
  readonly distanceLabel: string;
  readonly risk: 'low' | 'moderate' | 'high';
  readonly windLabel: string;
}

export interface JourneyEvidenceDefinition {
  readonly id: string;
  readonly title: string;
  readonly sourceLabel: string;
  readonly summary: string;
}

export interface JourneyChoiceDefinition {
  readonly id: string;
  readonly label: string;
  readonly summary: string;
  readonly rationaleHint: string;
  readonly question: string;
  readonly consequence: string;
  readonly sceneTitle: string;
  readonly routeId?: string;
  readonly evidenceIds: readonly string[];
  readonly resourceChanges?: Readonly<Record<string, number>>;
}

export interface JourneyStepDefinition {
  readonly id: string;
  readonly chapter: number;
  readonly title: string;
  readonly kicker: string;
  readonly mission: string;
  readonly choicePrompt: string;
  readonly positionLocationId: string;
  readonly topicTags: readonly string[];
  readonly masteryTags: readonly string[];
  readonly sceneType: JourneySceneType;
  readonly choices: readonly JourneyChoiceDefinition[];
}

export interface JourneyResourceDefinition {
  readonly id: string;
  readonly label: string;
  readonly startingValue: number;
  readonly minimum: number;
  readonly maximum: number;
  readonly unit: string;
}

export interface JourneyTeamIdentity {
  readonly name: string;
  readonly emblem: string;
  readonly color: string;
  readonly linePattern: 'solid' | 'long-dash' | 'short-dash' | 'dot-dash' | 'double';
}

export interface JourneyMapConfig {
  readonly id: string;
  readonly schemaVersion: '1.0';
  readonly title: string;
  readonly startLocationId: string;
  readonly regionalCover: {
    readonly id: string;
    readonly label: string;
    readonly regionId: string;
    readonly bounds: {
      readonly west: number;
      readonly east: number;
      readonly north: number;
      readonly south: number;
    };
  };
  readonly locations: readonly MapLocation[];
  readonly routes: readonly JourneyRouteDefinition[];
  readonly lenses: readonly JourneyMapLens[];
}

export interface JourneyReplaySettings {
  readonly id: string;
  readonly schemaVersion: '1.0';
  readonly title: string;
  readonly closingTitle: string;
  readonly sceneDurationSeconds: number;
  readonly allowStudentSceneHiding: boolean;
  readonly maxRuntimeMinutes: number;
}

export interface ClassVoyageRoutePoint extends GeoPoint {
  readonly locationId?: string;
  readonly eventType?: 'storm' | 'decision' | 'trade' | 'conflict' | 'discovery' | 'resupply' | 'evidence' | 'encounter';
  readonly eventLabel?: string;
}

export interface ClassVoyageRecord {
  readonly voyageId: string;
  readonly team: JourneyTeamIdentity;
  readonly route: readonly ClassVoyageRoutePoint[];
  readonly outcome: string;
}

export interface JourneyProjectConfig {
  readonly schemaVersion: '1.0';
  readonly template: { readonly id: 'journey-replay'; readonly version: '1.0' };
  readonly projectId: string;
  readonly projectVersion: string;
  readonly title: string;
  readonly subtitle: string;
  readonly gradeBand: string;
  readonly subject: string;
  readonly drivingQuestion: string;
  readonly team: JourneyTeamIdentity;
  readonly roles: readonly string[];
  readonly steps: readonly JourneyStepDefinition[];
  readonly evidence: readonly JourneyEvidenceDefinition[];
  readonly resources: readonly JourneyResourceDefinition[];
  readonly map: JourneyMapConfig;
  readonly replay: JourneyReplaySettings;
  readonly classVoyages: readonly ClassVoyageRecord[];
}

export interface JourneyEnrollment {
  readonly tenantId: string;
  readonly classId: string;
  readonly studentId: string;
  readonly studentDisplayName: string;
  readonly classLabel: string;
  readonly mode: 'demo' | 'student' | 'teacher';
}

export interface JourneyStudentResponse {
  readonly id: string;
  readonly questionText: string;
  readonly responseMode: JourneyResponseMode;
  readonly text?: string;
  readonly transcript?: string;
  readonly mediaAssetId?: string;
  readonly masteryTags: readonly string[];
  readonly useInReplay: boolean;
}

export interface VoyageRoutePoint extends GeoPoint {
  readonly voyageId: string;
  readonly pointId: string;
  readonly sequence: number;
  readonly legId: string;
  readonly timestamp: string;
  readonly voyageDate?: string;
  readonly locationId?: string;
  readonly eventId?: string;
  readonly decisionId?: string;
  readonly stateSnapshotId?: string;
}

export interface JourneyStepRecord {
  readonly stepId: string;
  readonly choiceId: string;
  readonly evidenceSelected: readonly string[];
  readonly studentResponse: JourneyStudentResponse;
  readonly consequence: string;
  readonly masteryResults: readonly {
    readonly masteryTag: string;
    readonly status: 'evidence-collected';
  }[];
  readonly sceneId: string;
  readonly completedAt: string;
}

export interface ReplayScene {
  readonly id: string;
  readonly stepId: string;
  readonly type: JourneySceneType;
  readonly durationSeconds: number;
  readonly routePointSequenceEnd: number;
  readonly title: string;
  readonly locationId: string;
  readonly systemNarration: string;
  readonly studentResponseId: string;
  readonly evidenceIds: readonly string[];
  readonly masteryHighlights: readonly string[];
  readonly order: number;
  readonly hidden: boolean;
}

export interface JourneyResponseDraft {
  readonly responseMode: JourneyResponseMode;
  readonly text: string;
  readonly transcript: string;
  readonly mediaAssetId?: string;
}

export interface JourneyRuntimeEvent {
  readonly id: string;
  readonly clientEventId: string;
  readonly eventType:
    | 'journey.choice.selected'
    | 'journey.step.completed'
    | 'journey.replay.scene.updated'
    | 'journey.reset';
  readonly timestamp: string;
  readonly projectId: string;
  readonly actor: { readonly type: 'student' | 'system'; readonly id: string };
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface StudentJourneyRecord {
  readonly schemaVersion: '1.0';
  readonly studentId: string;
  readonly voyageId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly currentStepIndex: number;
  readonly selectedChoiceId?: string;
  readonly responseDraft: JourneyResponseDraft;
  readonly completedSteps: readonly JourneyStepRecord[];
  readonly route: readonly VoyageRoutePoint[];
  readonly mastery: readonly {
    readonly masteryTag: string;
    readonly stepId: string;
    readonly status: 'evidence-collected';
  }[];
  readonly replayTimeline: readonly ReplayScene[];
  readonly resources: Readonly<Record<string, number>>;
  readonly completionStatus: 'in-progress' | 'complete';
  readonly revision: number;
  readonly eventHistory: readonly JourneyRuntimeEvent[];
}

export type ClassMapDisplayMode = 'all' | 'single' | 'compare' | 'classReplay';

export interface VoyageIntersection {
  readonly locationId: string;
  readonly voyageIds: readonly string[];
  readonly eventLabels: readonly string[];
  readonly comparisonAvailable: boolean;
}

export type JourneyMembershipRole = 'student' | 'teacher';

export interface JourneyAuthenticatedActor {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
}

export interface JourneyAuthoritySession {
  readonly authenticated: true;
  readonly actor: JourneyAuthenticatedActor;
  readonly role: JourneyMembershipRole;
  readonly classId: string;
  readonly classLabel: string;
}

export type JourneyMasteryLevel = 'developing' | 'proficient' | 'advanced';
export type JourneySubmissionStatus = 'submitted' | 'approved' | 'revision-requested';

export interface JourneyMasteryAssessment {
  readonly masteryTag: string;
  readonly level: JourneyMasteryLevel;
  readonly feedback?: string;
}

export interface JourneySubmission {
  readonly id: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly classId: string;
  readonly studentId: string;
  readonly studentDisplayName: string;
  readonly voyageId: string;
  readonly status: JourneySubmissionStatus;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewerDisplayName?: string;
  readonly teacherFeedback?: string;
  readonly mastery: readonly JourneyMasteryAssessment[];
  readonly revision: number;
}

export interface JourneyClassMemberSummary {
  readonly studentId: string;
  readonly studentDisplayName: string;
  readonly voyageId: string;
  readonly team: JourneyTeamIdentity;
  readonly route: readonly ClassVoyageRoutePoint[];
  readonly outcome: string;
  readonly completedStepCount: number;
  readonly totalStepCount: number;
  readonly completionStatus: StudentJourneyRecord['completionStatus'];
  readonly submission?: JourneySubmission;
  readonly responsePreview?: string;
  readonly updatedAt: string;
}

export interface JourneyClassSummary {
  readonly classId: string;
  readonly classLabel: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly generatedAt: string;
  readonly revision: number;
  readonly members: readonly JourneyClassMemberSummary[];
}
