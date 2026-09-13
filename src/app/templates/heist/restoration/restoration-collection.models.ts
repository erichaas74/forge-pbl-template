import type { RestorationAction, RestorationDefinition, RestorationState } from '../../../shared/restoration/restoration.models';
import type { EncounterAction, EncounterState } from '../../../shared/encounters/encounter.models';
import type { GalleryMission, LockAnswer } from '../gallery/domain/gallery.models';
export interface RestorationCommission extends RestorationDefinition { readonly paintingId: string; readonly chamberId: string; readonly encounterId?: string }
export interface RestorationMission {
  readonly schemaVersion: '1.0'; readonly experience: 'restoration'; readonly projectId: string; readonly projectVersion: string;
  readonly template: { readonly id: 'heist'; readonly version: '1.0' };
  readonly title: string; readonly subtitle: string; readonly briefing: string; readonly heistBriefing: string;
  readonly sourceGallery: GalleryMission; readonly works: readonly RestorationCommission[]; readonly finalLockIds: readonly string[];
}
export interface CollectionState {
  readonly workId?: string; readonly works: Readonly<Record<string, RestorationState>>;
  readonly encounters: Readonly<Record<string, EncounterState>>; readonly activeEncounterId?: string;
  readonly sourcesRead: readonly string[]; readonly heistStarted: boolean; readonly solvedLocks: readonly string[];
  readonly answers: Readonly<Record<string, LockAnswer>>; readonly extracted: boolean; readonly museumLabel: string;
}
export type CollectionCommand =
  | { readonly type: 'open'; readonly workId: string }
  | { readonly type: 'repair'; readonly workId: string; readonly action: RestorationAction }
  | { readonly type: 'encounter'; readonly encounterId: string; readonly action: EncounterAction }
  | { readonly type: 'read'; readonly evidenceId: string }
  | { readonly type: 'start-heist' }
  | { readonly type: 'operate'; readonly lockId: string; readonly answer: LockAnswer }
  | { readonly type: 'extract' }
  | { readonly type: 'museum-label'; readonly text: string };
export interface CollectionEnvelope { readonly id: string; readonly elapsed: number; readonly command: CollectionCommand }
export interface CollectionEvent extends CollectionEnvelope { readonly message: string; readonly eventType: string }
