export const KNOWLEDGE_KINDS = [
  'reconstruction',
  'assembly',
  'diagram',
  'distribution',
  'access',
  'apprentice',
  'circulation',
] as const;
export type KnowledgeKind = (typeof KNOWLEDGE_KINDS)[number];
export interface Fragment {
  readonly id: string;
  readonly cell: number;
  readonly turn: number;
  readonly copy: number;
}
export interface TownPlace {
  readonly id: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly links: readonly string[];
  readonly need: number;
}
export interface Reader {
  readonly id: string;
  readonly name: string;
  readonly barrier: 'cost' | 'language' | 'reading';
}
export interface KnowledgeDefinition {
  readonly version: '1.0';
  readonly kind: KnowledgeKind;
  readonly fragments?: readonly Fragment[];
  readonly parts?: readonly string[];
  readonly axles?: readonly number[];
  readonly gearRadii?: readonly number[];
  readonly places?: readonly TownPlace[];
  readonly stock?: number;
  readonly readers?: readonly Reader[];
  readonly cases?: readonly string[];
  readonly circulation?: {
    readonly document: string;
    readonly mark: string;
    readonly author: string;
    readonly origin: string;
    readonly date: string;
    readonly trace: string;
    readonly destinations: readonly { readonly id: string; readonly name: string }[];
  };
}
/** Discrete physical operations only. Animation and the pointer are never persisted. */
export interface KnowledgeAction {
  readonly type: string;
  readonly target?: string;
  readonly item?: string;
  readonly value?: number;
}
export interface KnowledgeTrial {
  readonly id: number;
  readonly outcome: string;
  readonly success: boolean;
  readonly evidence: string;
}
export interface KnowledgeState {
  readonly selected: string;
  readonly placements: Readonly<Record<string, string>>;
  readonly values: Readonly<Record<string, number>>;
  readonly trials: readonly KnowledgeTrial[];
  readonly message: string;
  readonly sequence: number;
}
export interface KnowledgeActivity {
  readonly initial: (config: KnowledgeDefinition) => KnowledgeState;
  readonly reduce: (
    config: KnowledgeDefinition,
    state: KnowledgeState,
    action: KnowledgeAction,
  ) => KnowledgeState;
  readonly validate: (config: KnowledgeDefinition) => boolean;
}
export function emptyKnowledge(): KnowledgeState {
  return { selected: '', placements: {}, values: {}, trials: [], message: '', sequence: 0 };
}
export function result(
  state: KnowledgeState,
  outcome: string,
  success: boolean,
  evidence: string,
): KnowledgeState {
  const id = state.sequence + 1;
  return {
    ...state,
    sequence: id,
    message: outcome,
    trials: [...state.trials, { id, outcome, success, evidence }].slice(-40),
  };
}
export function uniqueStrings(value: unknown, length: number): value is string[] {
  return (
    Array.isArray(value) &&
    value.length === length &&
    value.every((v) => typeof v === 'string' && /^[a-z][a-z0-9-]{0,40}$/.test(v)) &&
    new Set(value).size === length
  );
}
