import type { BalanceLockDefinition, BalanceSide } from './balance-lock.domain';
export interface BalanceView {
  readonly active: number;
  readonly placements: readonly number[];
  readonly selected: number | null;
  readonly sealed: readonly number[];
  readonly completed: boolean;
  readonly reducedMotion: boolean;
  readonly paused: boolean;
  readonly attempt: number;
}
export interface BalanceSceneCallbacks {
  select(index: number): void;
  place(index: number, side: BalanceSide): void;
  ready(): void;
  failed(): void;
  focus?(index: number): void;
}
export interface BalanceSceneHandle {
  destroy(): void;
}
export type MountBalanceScene = (
  parent: HTMLElement,
  lock: BalanceLockDefinition,
  snapshot: () => BalanceView,
  callbacks: BalanceSceneCallbacks,
) => BalanceSceneHandle;
