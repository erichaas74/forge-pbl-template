import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { RepairPreviewConfig } from './time-repair-preview.models';

export interface TimeRepairEvidence {
  readonly id: string;
  readonly title: string;
  readonly kind: 'secondary' | 'primary' | 'quotation' | 'map';
  readonly content: string;
  readonly citation: string;
  readonly url?: string;
  readonly perspective: string;
}
export interface TimeRepairNode {
  readonly id: string;
  readonly title: string;
  readonly dateLabel: string;
  readonly order: number;
  readonly summary: string;
  readonly initialStatus: 'stable' | 'uncertain' | 'missing';
}
export interface RepairOption {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly objectLabel: string;
}
export interface TimeRepairScene {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly views: readonly {
    readonly id: string;
    readonly label: string;
    readonly position: string;
  }[];
  readonly hotspots: readonly {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly objectImage?: string;
    readonly restoredObjectImage?: string;
    readonly x: number;
    readonly y: number;
  }[];
}
export interface TimeRepairMission {
  readonly id: string;
  readonly nodeId: string;
  readonly sceneId: string;
  readonly signal: string;
  readonly canonicalSummary: string;
  readonly prerequisiteMissionIds: readonly string[];
  readonly evidenceRequired: readonly string[];
  readonly categories: readonly string[];
  readonly defense: {
    readonly prompt: string;
    readonly options: readonly { readonly id: string; readonly label: string }[];
  };
  readonly repair: {
    readonly capability: 'replace-object' | 'restore-sequence';
    readonly targetHotspotId: string;
    readonly options: readonly RepairOption[];
  };
  readonly ripples: readonly {
    readonly nodeId: string;
    readonly before: string;
    readonly after: string;
  }[];
  readonly verificationPrompt: string;
  readonly stabilityValue: number;
  /** Local-pilot evaluator metadata. An authoritative adapter must keep this server-side. */
  readonly evaluation: {
    readonly category: string;
    readonly defenseOptionId: string;
    readonly repairOptionId: string;
  };
}
export interface TimeRepairConfig {
  /** Optional local authoring capability; never grants assessed runtime authorization. */
  readonly previewWeeks?: RepairPreviewConfig;
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly template: { readonly id: 'time-repair'; readonly version: '1.0' };
  readonly title: string;
  readonly subtitle: string;
  readonly subject: 'history' | 'literature';
  readonly briefing: string;
  readonly stages: readonly { readonly title: string; readonly description: string }[];
  readonly settings: {
    readonly repairCharges: number;
    readonly initialStability: number;
    readonly wrongRepairPenalty: number;
    readonly minReasoningLength: number;
  };
  readonly nodes: readonly TimeRepairNode[];
  readonly evidence: readonly TimeRepairEvidence[];
  readonly scenes: readonly TimeRepairScene[];
  readonly missions: readonly TimeRepairMission[];
}
export interface EvidenceLink {
  readonly evidenceId: string;
  readonly relationship: 'supports' | 'contradicts' | 'uncertain';
  readonly note: string;
  readonly confidence: 'developing' | 'confident';
}
export interface RepairDefense {
  readonly category: string;
  readonly claim: string;
  readonly consequence: string;
  readonly answerId: string;
  readonly explanation: string;
}
export interface MissionProgress {
  readonly links: readonly EvidenceLink[];
  readonly defenses: readonly (RepairDefense & { readonly accepted: boolean })[];
  readonly authorized: boolean;
  readonly jumped: boolean;
  readonly inspectedIds: readonly string[];
  readonly attempts: readonly { readonly optionId: string; readonly correct: boolean }[];
  readonly repaired: boolean;
  readonly verification?: { readonly evidenceId: string; readonly explanation: string };
}
export interface TimeRepairState {
  readonly version: number;
  readonly collectedIds: readonly string[];
  readonly missions: Readonly<Record<string, MissionProgress>>;
  readonly events: readonly RuntimeEvent[];
}

export const TIME_REPAIR_EVENTS = {
  collect: 'timeRepair.evidenceCollected',
  link: 'timeRepair.evidenceConnected',
  defend: 'timeRepair.defenseRequested',
  jump: 'timeRepair.jumpRequested',
  inspect: 'timeRepair.objectInspected',
  repair: 'timeRepair.repairRequested',
  verify: 'timeRepair.verificationSubmitted',
} as const;

export type TimeRepairAction =
  | { readonly type: 'collect'; readonly evidenceId: string }
  | { readonly type: 'link'; readonly missionId: string; readonly link: EvidenceLink }
  | { readonly type: 'defend'; readonly missionId: string; readonly defense: RepairDefense }
  | { readonly type: 'jump'; readonly missionId: string }
  | { readonly type: 'inspect'; readonly missionId: string; readonly hotspotId: string }
  | { readonly type: 'repair'; readonly missionId: string; readonly optionId: string }
  | {
      readonly type: 'verify';
      readonly missionId: string;
      readonly evidenceId: string;
      readonly explanation: string;
    };
