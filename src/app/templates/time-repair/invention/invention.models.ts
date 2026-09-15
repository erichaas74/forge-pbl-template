import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { KnowledgeDefinition } from './knowledge/knowledge.models';

export type InventionMode =
  | 'courtyard'
  | 'reference'
  | 'compose'
  | 'recompose'
  | 'ink'
  | 'packing'
  | 'production'
  | 'return'
  | 'knowledge';
export interface PressSettings {
  readonly type: readonly string[];
  readonly ink: string;
  readonly pressure: number;
  readonly packing: readonly number[];
}
export interface InkDefinition {
  readonly id: string;
  readonly mark: string;
  readonly name: string;
  readonly color: string;
  readonly adhesion: number;
  readonly spread: number;
  readonly paperAdhesion: number;
}
export interface InventionSession {
  readonly knowledge?: KnowledgeDefinition;
  readonly id: string;
  readonly number: number;
  readonly mode: InventionMode;
  readonly title: string;
  readonly location: string;
  readonly date: string;
  readonly task: string;
  readonly goal: string;
  readonly product: string;
  readonly historicalNote: string;
  readonly question: string;
  readonly sourceIds: readonly string[];
  readonly target: string;
  readonly initial: PressSettings;
  readonly batchSize: number;
}
export interface InventionProject {
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly template: { readonly id: 'time-repair'; readonly version: '1.1' };
  readonly title: string;
  readonly subtitle: string;
  readonly inventionRescue: {
    readonly version: '1.0';
    readonly capability: 'invention-repair.printing-press';
    readonly fiction: string;
    readonly modelNote: string;
    readonly inks: readonly InkDefinition[];
    readonly sources: readonly {
      readonly id: string;
      readonly title: string;
      readonly detail: string;
      readonly url: string;
    }[];
    readonly weeks: readonly {
      readonly title: string;
      readonly goal: string;
      readonly evidence: readonly string[];
    }[];
    readonly sessions: readonly InventionSession[];
  };
}
export interface PressProof {
  readonly id: number;
  readonly settings: PressSettings;
  readonly text: string;
  readonly coverage: readonly number[];
  readonly spread: number;
  readonly usable: boolean;
  readonly fault: 'type' | 'ink' | 'pressure' | 'packing' | 'none';
}
export interface MaterialSample {
  readonly ink: string;
  readonly surface: 'paper' | 'metal';
  readonly adhesion: number;
  readonly spread: number;
}
export type WorkshopStation = 'scribe' | 'binder' | 'courier' | 'patron';
export interface ProductionFlow {
  readonly strokes: number;
  readonly sheets: number;
  readonly finished: number;
  readonly delivered: number;
  readonly inspected: readonly WorkshopStation[];
  readonly supplied: number;
}
export interface InventionState {
  readonly version: number;
  readonly trials: readonly PressProof[];
  readonly samples: readonly MaterialSample[];
  readonly preparation: { readonly inked: boolean; readonly paperLoaded: boolean };
  readonly flow: ProductionFlow;
  readonly events: readonly RuntimeEvent[];
}
export type InventionAction =
  | { readonly type: 'prepare'; readonly part: 'ink' | 'paper' }
  | { readonly type: 'proof'; readonly settings: PressSettings }
  | { readonly type: 'sample'; readonly ink: string; readonly surface: 'paper' | 'metal' }
  | { readonly type: 'flow'; readonly station: WorkshopStation };

export const INVENTION_EVENTS = {
  prepare: 'inventionRepair.pressPrepared',
  proof: 'inventionRepair.proofPulled',
  sample: 'inventionRepair.materialTested',
  flow: 'inventionRepair.productionAdvanced',
} as const;
