import type { InvestigationActivityResult } from './activity-extension';
import type { CoreRuntimeState } from '../../../core/state/core-runtime-state';
import type { RuntimeActor } from '../../../core/events/runtime-event';

export type EvidenceRuntimeStatus =
  | 'hidden'
  | 'locked'
  | 'available'
  | 'unopened'
  | 'viewed'
  | 'collected'
  | 'classified'
  | 'annotated'
  | 'usedInClaim'
  | 'archived';

export interface EvidenceRuntimeState {
  status: EvidenceRuntimeStatus;
  classification?: string;
  notes?: string[];
  important?: boolean;
  relationshipIds?: string[];
  updatedAt?: string;
}

export interface ActivityRuntimeState {
  status:
    | 'locked'
    | 'notStarted'
    | 'inProgress'
    | 'submitted'
    | 'complete'
    | 'needsRevision'
    | 'missing'
    | 'excused';
  attempts?: number;
  lastResult?: InvestigationActivityResult;
  completionStatus: 'notStarted' | 'inProgress' | 'complete';
  submissionStatus: 'notRequired' | 'draft' | 'submitted' | 'returned';
  masteryStatus: 'notMeasured' | 'notMet' | 'met';
  approvalStatus: 'notRequired' | 'pending' | 'approved' | 'changesRequested';
  gradeStatus: 'ungraded' | 'graded';
  score?: number;
  rubricResultId?: string;
}

export interface HypothesisRevision {
  revisionId: string;
  hypothesisId: string;
  timestamp: string;
  statement: string;
  confidence?: number;
  evidenceIds?: string[];
  reasonForChange?: string;
  reasoning?: string;
  remainingQuestion?: string;
}

export interface HypothesisRuntimeState {
  id: string;
  label?: string;
  statement: string;
  selected?: boolean;
  eliminated?: boolean;
  ranking?: number;
  confidence?: number;
  revisions: HypothesisRevision[];
  evidenceIds?: string[];
  reasoning?: string;
  remainingQuestion?: string;
}

export interface BoardNote {
  id: string;
  text: string;
  createdAt: string;
  authorId?: string;
}

export interface BoardQuestion {
  id: string;
  text: string;
  status?: 'open' | 'answered' | 'archived';
  sourceEvidenceId?: string;
  createdAt?: string;
  authorId?: string;
}

export interface BoardRuntimeState {
  itemLocations: Record<string, string>;
  itemOrder?: Record<string, string[]>;
  notes?: BoardNote[];
  questions?: BoardQuestion[];
}

export interface PhaseRuntimeState {
  status: 'locked' | 'available' | 'inProgress' | 'complete';
}

export interface LessonRuntimeState {
  status: 'locked' | 'available' | 'inProgress' | 'complete';
}

export interface MasteryRuntimeState {
  level?: number;
  status?: string;
}

export interface RandomizationRuntimeState {
  seed: string;
  value: unknown;
  assignedAt: string;
}

export interface NPCRuntimeState {
  dialogueCompletedIds?: string[];
  unlockedDialogueIds?: string[];
  state?: Record<string, unknown>;
}

export interface RuntimeEvidenceRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  relationshipType: string;
  actor: RuntimeActor;
  createdAt: string;
}

export interface ArtifactVersionRuntimeRecord {
  version: number;
  savedAt: string;
  actor: RuntimeActor;
  content: unknown;
  evidenceIds?: string[];
  sourceActivityId?: string;
}

export interface VersionedArtifactRuntimeState {
  artifactId: string;
  latestVersion: number;
  versions: ArtifactVersionRuntimeRecord[];
}

export interface StudentEvidenceRuntimeRecord {
  id: string;
  evidenceType: string;
  title: string;
  content: unknown;
  createdAt: string;
  actor: RuntimeActor;
  sourceActivityId?: string;
  metadata?: Record<string, unknown>;
  classification?: string;
  notes?: string[];
  important?: boolean;
  usedInFinalClaim?: boolean;
}

export interface RuntimeMessage {
  id: string;
  message: string;
  level: 'info' | 'warning';
  createdAt: string;
}

export interface RuntimeRequirementState {
  hypothesisRequired: boolean;
  revisionRequired: boolean;
}

export interface FinalSubmissionRuntimeState {
  status: 'closed' | 'open' | 'submitted';
  availabilityStatus: 'closed' | 'open';
  submissionStatus: 'notSubmitted' | 'submitted' | 'returned';
  approvalStatus: 'notRequired' | 'pending' | 'approved' | 'changesRequested';
  gradeStatus: 'ungraded' | 'graded';
  argumentDraft: StructuredArgumentPackage;
  artifactIds: string[];
  submittedAt?: string;
  score?: number;
  rubricResultId?: string;
}

export interface StructuredArgumentPackage {
  claim?: string;
  identification?: string;
  diagnosis?: string;
  cause?: string;
  recommendation?: string;
  evidenceIds: string[];
  reasoning?: string;
  counterevidence?: string;
  alternativeExplanation?: string;
  confidence?: number;
  uncertainty?: string;
  nextTest?: string;
  safetyRecommendation?: string;
  reflection?: string;
  individualContribution?: string;
}

export interface RuntimeStateSnapshot extends CoreRuntimeState {
  evidence: Record<string, EvidenceRuntimeState>;
  studentEvidence: Record<string, StudentEvidenceRuntimeRecord>;
  evidenceRelationships: RuntimeEvidenceRelationship[];
  artifacts: Record<string, VersionedArtifactRuntimeState>;
  activities: Record<string, ActivityRuntimeState>;
  hypotheses: HypothesisRuntimeState[];
  resources: Record<string, number>;
  board: BoardRuntimeState;
  phases: Record<string, PhaseRuntimeState>;
  lessons: Record<string, LessonRuntimeState>;
  requirements: RuntimeRequirementState;
  finalSubmission: FinalSubmissionRuntimeState;
  solutionRevealed: boolean;
  messages: RuntimeMessage[];
  teacherNotifications: RuntimeMessage[];
  teacherReleases: Record<string, boolean>;
  teamTasks: Record<string, string>;
  mastery?: Record<string, MasteryRuntimeState>;
  randomization?: Record<string, RandomizationRuntimeState>;
  npc?: Record<string, NPCRuntimeState>;
}
