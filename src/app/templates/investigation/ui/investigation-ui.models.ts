import type { ActivityRuntimeState, EvidenceRuntimeStatus } from '../domain/runtime-state';

export type InvestigationWorkspacePair =
  'evidence-analysis' | 'analysis-theory' | 'theory-investigate' | 'final-investigation';

export type AnalysisClassification = 'supports' | 'uncertain' | 'contradicts';

export interface InvestigationEvidenceResultMatrix {
  title: string;
  columnLabels: readonly string[];
  rows: readonly {
    id: string;
    label: string;
    cells: readonly (string | undefined)[];
  }[];
}

export interface InvestigationEvidenceItem {
  id: string;
  title: string;
  type: string;
  summary: string;
  source: string;
  asset?: string;
  file?: string;
  status: EvidenceRuntimeStatus | 'studentCreated';
  classification?: AnalysisClassification;
  notes: readonly string[];
  important: boolean;
  studentCreated: boolean;
  resultMatrix?: InvestigationEvidenceResultMatrix;
}

export interface EvidenceClassificationChange {
  evidenceId: string;
  classification: AnalysisClassification;
}

export interface StudentEvidenceDraft {
  title: string;
  observation: string;
}

export interface InvestigationQuestionItem {
  id: string;
  text: string;
  sourceEvidenceId?: string;
  status: 'open' | 'answered' | 'archived';
}

export interface InvestigationActivityOption {
  id: string;
  title: string;
  typeLabel: string;
  purpose: string;
  helpsWith: string;
  phaseId: string;
  evidenceId?: string;
  required: boolean;
  displayMode: 'embedded' | 'expanded';
}

export interface InvestigationActivityView extends InvestigationActivityOption {
  runtime?: ActivityRuntimeState;
  locked: boolean;
  lockReason?: string;
}

export interface InvestigationPhaseItem {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  instruction: string;
  activityIds: readonly string[];
}

export type InvestigationPhaseStatus =
  'complete' | 'current' | 'available' | 'locked' | 'needsRevision';

export interface InvestigationPhaseView extends InvestigationPhaseItem {
  status: InvestigationPhaseStatus;
}

export interface TheoryDraft {
  statement: string;
  confidence: number;
  reasoning: string;
  remainingQuestion: string;
  evidenceIds: readonly string[];
  reasonForChange?: string;
  createNew?: boolean;
}

export interface FinalCaseDraft {
  identification: string;
  evidenceIds: readonly string[];
  reasoning: string;
  counterevidence: string;
  uncertainty: string;
  recommendation: string;
  confidence: number;
  reflection: string;
  individualContribution: string;
}
