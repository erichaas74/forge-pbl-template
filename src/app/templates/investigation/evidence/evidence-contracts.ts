import type { BaseEntity } from '../../../core/models/base-entity';
import type { AudienceAssignment } from '../domain/audience-team';

export interface EvidenceContent {
  text?: string;
  contentRef?: string;
  assetRefs?: string[];
  dataRef?: string;
  source?: {
    name?: string;
    citation?: string;
    url?: string;
  };
  extensions?: Record<string, unknown>;
}

export interface EvidenceAvailability {
  initialState: 'hidden' | 'locked' | 'available';
  availableFromPhaseId?: string;
  ruleIds?: string[];
}

export interface EvidenceInstructionalMetadata {
  reliability?: number;
  relevance?: number;
  strength?: number;
  directness?: 'direct' | 'circumstantial' | 'mixed';
  sourceClassification?: 'primary' | 'secondary' | 'other';
  bias?: number;
  misleading?: boolean;
  intentionallyIncomplete?: boolean;
  teacherMeaning?: string;
  supportsHypothesisIds?: string[];
  contradictsHypothesisIds?: string[];
  rulesOutHypothesisIds?: string[];
}

export interface EvidenceRelationship {
  targetId: string;
  relationshipType: string;
  teacherDefined?: boolean;
  strength?: number;
}

export interface EvidenceDefinition extends BaseEntity {
  evidenceType: string;
  content: EvidenceContent;
  availability: EvidenceAvailability;
  requirement: 'required' | 'optional' | 'extension' | 'conditional' | 'decoy';
  studentCapabilities?: {
    annotate?: boolean;
    classify?: boolean;
    connect?: boolean;
    cite?: boolean;
  };
  instructionalMetadata?: EvidenceInstructionalMetadata;
  relationships?: EvidenceRelationship[];
  unlockRuleIds?: string[];
  assignment?: AudienceAssignment;
}

