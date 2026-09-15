import type { NarrativeNodeBlueprint } from './narrative-studio.models';

export type NarrativePreviewTool = 'write' | 'map' | 'revise' | 'read';

export interface NarrativePreviewSession {
  readonly title: string;
  readonly tool: NarrativePreviewTool;
  readonly nodeId: string;
  readonly mission: string;
  readonly product: string;
}

export interface NarrativePreviewWeek {
  readonly id: string;
  readonly week: number;
  readonly title: string;
  readonly setting: string;
  readonly startNodeId: string;
  readonly scenes: readonly (NarrativeNodeBlueprint & { readonly starterText: string })[];
  readonly sessions: readonly [NarrativePreviewSession, NarrativePreviewSession];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}
