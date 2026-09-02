import type { ProjectComponentContext } from '../../../core/context/project-component-context';
import type { BaseEntity } from '../../../core/models/base-entity';
import type { EvidenceRuntimeView } from '../evidence/evidence-component-contracts';
import type {
  BoardRuntimeState,
  HypothesisRuntimeState,
  RuntimeStateSnapshot,
} from '../domain/runtime-state';

export interface CaseBoardConfiguration extends BaseEntity {
  layoutMode: 'zones' | 'columns' | 'freeform' | 'hybrid';
  sections: CaseBoardSection[];
  interactions: {
    dragDrop: boolean;
    reorder: boolean;
    annotate: boolean;
    connectEvidence: boolean;
    createStudentEvidence: boolean;
    confidenceRating: boolean;
  };
}

export interface CaseBoardSection extends BaseEntity {
  type:
    | 'evidence'
    | 'hypothesis'
    | 'notes'
    | 'questions'
    | 'data'
    | 'confidence'
    | 'finalClaim'
    | 'custom';
  order: number;
  accepts?: string[];
  studentEditable?: boolean;
  required?: boolean;
}

export interface BoardPermissions {
  canMoveItems: boolean;
  canReorderItems: boolean;
  canCreateNotes: boolean;
  canCreateQuestions: boolean;
}

export interface CaseBoardInputs {
  config: CaseBoardConfiguration;
  runtimeState: BoardRuntimeState;
  evidence: EvidenceRuntimeView[];
  hypotheses: HypothesisRuntimeState[];
  permissions: BoardPermissions;
}

export interface BoardItem {
  id: string;
  itemType: string;
}

export interface BoardSectionViewModel {
  sectionId: string;
  itemIds: string[];
  metadata?: Record<string, unknown>;
}

export interface BoardSectionRenderer {
  sectionType: string;
  canAccept(item: BoardItem, section: CaseBoardSection): boolean;
  renderModel(
    section: CaseBoardSection,
    context: ProjectComponentContext<RuntimeStateSnapshot>,
  ): BoardSectionViewModel;
}

