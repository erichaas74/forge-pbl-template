import type { RuntimeEvent } from '../../../core/events/runtime-event';

export type CrisisView = 'room' | 'map' | 'news' | 'station' | 'argus' | 'command';
export type MapLayer = 'hazard' | 'people' | 'resources';
export interface CrisisWorkstation {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly side: 'left' | 'right';
  readonly roleIds: readonly string[];
  readonly instrument: 'telemetry' | 'resources' | 'reports';
  readonly conference?: CrisisConference;
  readonly weather?: CrisisWeather;
  readonly roomSurface?: CrisisRoomSurface;
}
/** Percent coordinates in the room artwork; screen corners run clockwise from top left. */
export interface CrisisRoomSurface {
  readonly bounds: readonly [number, number, number, number];
  readonly screen: readonly [
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
  ];
}
export interface CrisisConference {
  readonly title: string;
  readonly meetingUrl?: string;
  readonly participants: readonly {
    readonly id: string;
    readonly name: string;
    readonly role: string;
    readonly locationId: string;
    readonly portrait: string;
    readonly evidenceIds: readonly string[];
  }[];
}
export interface CrisisRadarFrame {
  readonly stage: number;
  readonly minute: number;
  readonly x: number;
  readonly y: number;
  readonly intensity: number;
}
export interface CrisisWeather {
  readonly title: string;
  readonly network: string;
  readonly satelliteImage: string;
  readonly frames: readonly CrisisRadarFrame[];
}
export interface CrisisRoamPoint {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
}
export interface CrisisLocation {
  readonly id: string;
  readonly name: string;
  readonly kind: 'community' | 'bridge' | 'hospital' | 'shelter' | 'sensor';
  readonly x: number;
  readonly y: number;
  readonly population: number;
  readonly elevation: number;
  readonly detail: string;
}
export interface CrisisEvidence {
  readonly id: string;
  readonly title: string;
  readonly source: string;
  readonly channel: string;
  readonly body: string;
  readonly confidence: 'Confirmed' | 'Forecast' | 'Unverified';
  readonly minute: number;
  readonly stage: number;
  readonly locationId: string;
  readonly roleIds: readonly string[];
  readonly requiresActionId?: string;
  readonly excludesActionId?: string;
  readonly reading?: {
    readonly value: string;
    readonly label: string;
    readonly trend: readonly number[];
    readonly unit: string;
  };
}
export interface CrisisAction {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly locationId: string;
  readonly crews: number;
  readonly duration: number;
  readonly tradeoff: string;
  readonly outcome: string;
  readonly mapLabel: string;
  readonly minStage: number;
  readonly expiresAtStage?: number;
  readonly riskReduction: number;
  readonly protects: number;
}
export interface CrisisBulletin {
  readonly minute: number;
  readonly title: string;
  readonly summary: string;
  readonly alert: 'Watch' | 'Emergency' | 'Critical' | 'Stabilizing';
  readonly metricValue: number;
  readonly risk: number;
  readonly affected: number;
  readonly forecast: string;
  readonly uncertainty: string;
}
export interface CrisisConfig {
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly template: { readonly id: 'crisis-operations'; readonly version: '1.0' };
  readonly title: string;
  readonly region: string;
  readonly operationCode: string;
  readonly roomImage: string;
  readonly newsImage: string;
  readonly workstations?: readonly CrisisWorkstation[];
  readonly companion?: {
    readonly name: string;
    readonly sprite: string;
    readonly roamPoints: readonly CrisisRoamPoint[];
  };
  readonly roomTagline: readonly [string, string];
  readonly analysisHeadline: readonly [string, string];
  readonly systemChain: readonly string[];
  readonly primaryMetric: {
    readonly label: string;
    readonly unit: string;
    readonly caption: string;
    readonly initialTrend: readonly number[];
  };
  readonly newsCamera: {
    readonly label: string;
    readonly network: string;
    readonly locationId: string;
    readonly minute: number;
    readonly description: string;
  };
  readonly startHour: number;
  readonly crews: number;
  readonly evidenceLimit: number;
  readonly bulletinIntervalSeconds: number;
  readonly roles: readonly {
    readonly id: string;
    readonly name: string;
    readonly shortName: string;
    readonly focus: string;
  }[];
  readonly locations: readonly CrisisLocation[];
  readonly evidence: readonly CrisisEvidence[];
  readonly actions: readonly CrisisAction[];
  readonly bulletins: readonly CrisisBulletin[];
  readonly map: {
    readonly coast: string;
    readonly river: string;
    readonly roads: readonly string[];
    readonly contours: readonly string[];
    readonly hazard: string;
    readonly labels: readonly {
      readonly text: string;
      readonly x: number;
      readonly y: number;
      readonly rotation: number;
      readonly kind: 'water' | 'land';
    }[];
  };
}
export interface CrisisDecision {
  readonly actionId: string;
  readonly evidenceIds: readonly string[];
  readonly minute: number;
  readonly stage: number;
}
export interface CrisisState {
  readonly version: number;
  readonly stage: number;
  readonly roleId: string;
  readonly sharedEvidenceIds: readonly string[];
  readonly readEvidenceIds: readonly string[];
  readonly decisions: readonly CrisisDecision[];
  readonly events: readonly RuntimeEvent[];
}

export const CRISIS_EVENTS = {
  advance: 'crisis.bulletin.received',
  read: 'crisis.evidence.viewed',
  share: 'crisis.evidence.shared',
  unshare: 'crisis.evidence.unpinned',
  role: 'crisis.station.selected',
  decide: 'crisis.decision.committed',
} as const;
