import type { EncounterAction, EncounterDefinition, EncounterState } from '../../../../shared/encounters/encounter.models';

export type FraudCategory = 'timeline' | 'animal-plant' | 'people' | 'technology';
export type LockType = 'combo' | 'rotation' | 'lever' | 'timeline' | 'map-route' | 'sorting' | 'people-placement' | 'technology-sort' | 'evidence-board' | 'measurement' | 'cargo';
export interface LockItem { readonly id: string; readonly label: string; readonly x?: number; readonly y?: number; readonly mass?: number }
/** Shell and assessment are separate: the same matching evaluator powers three physical shells. */
export interface AcademicLock {
  readonly id: string; readonly type: LockType; readonly title: string; readonly prompt: string;
  readonly domain: 'math' | 'history'; readonly standard: string; readonly hint: string; readonly consequence: string;
  readonly evidenceIds: readonly string[];
  readonly target?: number; readonly tolerance?: number; readonly min?: number; readonly max?: number; readonly step?: number;
  readonly wrap?: boolean; readonly unit?: string; readonly digits?: number;
  readonly items?: readonly LockItem[]; readonly zones?: readonly LockItem[];
  readonly solution?: readonly string[]; readonly matches?: Readonly<Record<string, string>>;
  readonly capacity?: number; readonly requiredItems?: readonly string[];
}
export interface LockAnswer { readonly calculation?: number; readonly setting?: number; readonly order?: readonly string[]; readonly placements?: Readonly<Record<string, string>>; readonly selected?: readonly string[] }
export interface PaintingHotspot { readonly id: string; readonly label: string; readonly detail: string; readonly x: number; readonly y: number; readonly symbol: string }
export interface GalleryPainting {
  readonly id: string; readonly title: string; readonly caption: string; readonly image: string; readonly artFrame: number;
  readonly authentic: boolean; readonly hotspots: readonly PaintingHotspot[];
  readonly fraud?: { readonly category: FraudCategory; readonly hotspotId: string; readonly explanation: string; readonly recoveryLockId: string };
}
export interface GalleryChamber {
  readonly id: string; readonly title: string; readonly date: string; readonly location: string; readonly briefing: string;
  readonly layout: 'gallery' | 'workshop' | 'port' | 'cargo' | 'map' | 'archive' | 'treaty' | 'vault';
  readonly paintings: readonly GalleryPainting[]; readonly lockIds: readonly string[]; readonly next?: string;
  readonly factIds: readonly string[];
}
export interface GalleryEvidence { readonly id: string; readonly category: 'Timeline' | 'People' | 'Technology' | 'Exchange' | 'Routes' | 'Mathematics'; readonly title: string; readonly text: string; readonly sourceTitle: string; readonly sourceUrl: string }
export interface GalleryMission {
  readonly schemaVersion: '1.1' | '1.2'; readonly experience: 'gallery'; readonly projectId: string; readonly projectVersion: string;
  readonly template: { readonly id: 'heist'; readonly version: '1.0' };
  readonly title: string; readonly subtitle: string; readonly briefing: string; readonly subject: 'history' | 'math' | 'hybrid';
  readonly environment: string; readonly entry: string; readonly chambers: readonly GalleryChamber[];
  readonly locks: readonly AcademicLock[]; readonly evidence: readonly GalleryEvidence[]; readonly defensePrompts: readonly string[];
  readonly encounters?: readonly EncounterDefinition[];
}
export type GalleryPhase = 'recon' | 'fraud' | 'recovery' | 'mechanism' | 'unlocked' | 'extracted';
export type GalleryCommand =
  | { readonly type: 'encounter'; readonly encounterId: string; readonly action: EncounterAction }
  | { readonly type: 'inspect'; readonly paintingId: string; readonly hotspotId: string }
  | { readonly type: 'choose'; readonly paintingId: string }
  | { readonly type: 'classify'; readonly category: FraudCategory; readonly hotspotId: string }
  | { readonly type: 'operate'; readonly lockId: string; readonly answer: LockAnswer }
  | { readonly type: 'read'; readonly evidenceId: string }
  | { readonly type: 'continue' }
  | { readonly type: 'defend'; readonly responses: readonly string[] };
export interface GalleryCommandEnvelope { readonly id: string; readonly elapsed: number; readonly command: GalleryCommand }
export interface GallerySnapshot {
  readonly chamberId: string; readonly phase: GalleryPhase; readonly paintingId?: string;
  readonly cleared: readonly string[]; readonly frauds: readonly string[]; readonly solved: readonly string[];
  readonly mechanisms: Readonly<Record<string, LockAnswer>>;
  readonly encounters?: Readonly<Record<string, EncounterState>>; readonly activeEncounterId?: string;
}
export interface GalleryEvent {
  readonly id: string; readonly elapsed: number; readonly type: GalleryCommand['type']; readonly chamberId: string;
  readonly message: string; readonly correct?: boolean; readonly command: GalleryCommand; readonly snapshot: GallerySnapshot;
  readonly runtimeEventType?: string;
}
