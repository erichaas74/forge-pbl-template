import type { EvidenceRelationship } from '../encounters/encounter.models';

export interface PaintingMedia { readonly src: string; readonly frame: number; readonly grid: number }
export interface RepairOption {
  readonly id: string; readonly label: string; readonly tool: 'keep' | 'remove' | 'replace' | 'relabel';
  readonly description: string; readonly image?: string; readonly text?: string;
}
export interface RepairRegion {
  readonly id: string; readonly title: string; readonly claim: string; readonly instruction: string;
  readonly x: number; readonly y: number; readonly width: number; readonly height: number;
  readonly originalOptionId: string; readonly options: readonly RepairOption[];
  readonly evidenceIds: readonly string[]; readonly hint: string;
  readonly answers: readonly { readonly optionId: string; readonly evidenceId: string; readonly relationship: EvidenceRelationship }[];
}
export interface RestorationDefinition {
  readonly id: string; readonly type: 'layered-painting'; readonly title: string; readonly collection: string;
  readonly date: string; readonly location: string; readonly commission: string; readonly attribution: string;
  readonly image: PaintingMedia; readonly imageAlt: string; readonly regions: readonly RepairRegion[];
}
export interface RepairNote { readonly evidenceId: string; readonly relationship: EvidenceRelationship | ''; readonly explanation: string }
export interface RestorationState {
  readonly selectedRegionId?: string; readonly inspected: readonly string[];
  readonly choices: Readonly<Record<string, string>>; readonly notes: Readonly<Record<string, RepairNote>>;
  readonly undo: readonly { readonly regionId: string; readonly previousOptionId: string; readonly previousNote?: RepairNote }[];
  readonly verified: boolean; readonly submissions: number;
  readonly feedback: string; readonly issues: readonly string[];
}
export type RestorationAction =
  | { readonly type: 'inspect'; readonly regionId: string }
  | { readonly type: 'edit'; readonly regionId: string; readonly optionId: string }
  | { readonly type: 'justify'; readonly regionId: string; readonly note: RepairNote }
  | { readonly type: 'undo' }
  | { readonly type: 'submit' };
export interface RestorationTransition { readonly state: RestorationState; readonly eventType: 'evidence.viewed' | 'evidence.annotationAdded' | 'evidence.usedInClaim' | 'activity.resultSubmitted'; readonly message: string }
