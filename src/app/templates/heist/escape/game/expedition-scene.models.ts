import type { EscapeMission } from '../domain/escape.models';
import type {
  ExpeditionDraft,
  ExpeditionInput,
  ExpeditionPlayer,
  WorldPoint,
} from '../domain/expedition.models';
import type { ExpeditionPhase } from '../runtime/expedition-runtime';

export interface ExpeditionSceneSnapshot {
  readonly phase: ExpeditionPhase;
  readonly players: readonly ExpeditionPlayer[];
  readonly localPlayerId: string;
  readonly currentIndex: number;
  readonly solved: ReadonlySet<string>;
  readonly released: ReadonlySet<string>;
  readonly draft: ExpeditionDraft;
  readonly reducedMotion: boolean;
  readonly paused: boolean;
  readonly route: readonly WorldPoint[];
  readonly celebration: number;
}
export interface ExpeditionSceneCallbacks {
  readonly input: (input: ExpeditionInput) => void;
  readonly frame: (seconds: number, direction: WorldPoint) => void;
  readonly interact: () => void;
  readonly ready: () => void;
  readonly failed: (message: string) => void;
}
export interface ExpeditionSceneHandle {
  destroy(): void;
  overview(): void;
  follow(): void;
  focus(): void;
}
export type MountExpeditionScene = (
  parent: HTMLElement,
  mission: EscapeMission,
  snapshot: () => ExpeditionSceneSnapshot,
  callbacks: ExpeditionSceneCallbacks,
) => ExpeditionSceneHandle;
