import type { BaseEntity } from '../../../core/models/base-entity';

export type InvestigationGoal =
  | 'identifyUnknown'
  | 'diagnoseProblem'
  | 'solveMystery'
  | 'determineCause'
  | 'evaluateExplanations'
  | 'recommendSolution';

export type SolutionMode =
  | 'exact'
  | 'multipleDefensible'
  | 'ranked'
  | 'openEvidenceBased';

export interface InvestigationPhase extends BaseEntity {
  order: number;
  optional?: boolean;
  activityIds?: string[];
  lessonIds?: string[];
  entryRuleIds?: string[];
  completionRuleIds?: string[];
}

export interface InvestigationControlSettings {
  evidenceOrder: 'fixed' | 'partiallyOpen' | 'open';
  activityOrder: 'fixed' | 'partiallyOpen' | 'open';
  lessonOrder: 'fixed' | 'partiallyOpen' | 'open';
  allowDecoys: boolean;
  allowOptionalEvidence: boolean;
  allowRevisit: boolean;
  allowHypothesisRevision: boolean;
  requireHypothesisRevision?: boolean;
  allowMultipleHypotheses?: boolean;
  teacherOverrideAllowed: boolean;
}

export interface SolutionDefinition {
  mode: SolutionMode;
  exactSolutionIds?: string[];
  acceptableSolutionIds?: string[];
  rankingCriteria?: string[];
  teacherExplanation?: string;
  requireEvidenceSupport?: boolean;
}

export interface RevealSettings {
  mode:
    | 'afterIndividualSubmission'
    | 'afterTeamSubmission'
    | 'afterDefense'
    | 'teacherControlled'
    | 'scheduled'
    | 'none';
  scheduledAt?: string;
}

export interface HypothesisSettings {
  mode: 'studentGenerated' | 'predefined' | 'mixed';
  minimumEvidenceBeforeCreation?: number;
  allowMultiple?: boolean;
  requireRanking?: boolean;
  requireRevision?: boolean;
  trackHistory?: boolean;
  confidenceMode?: 'none' | 'lowMediumHigh' | 'oneToFive' | 'percentage';
}

export interface InvestigationConfiguration extends BaseEntity {
  goals: InvestigationGoal[];
  solutionModel: SolutionMode;
  mission?: {
    role?: string;
    situation?: string;
    drivingQuestion?: string;
    goal?: string;
    stakes?: string;
    missionContentRef?: string;
  };
  phases: InvestigationPhase[];
  openness: InvestigationControlSettings;
  hypotheses?: HypothesisSettings;
  solution?: SolutionDefinition;
  reveal?: RevealSettings;
}

