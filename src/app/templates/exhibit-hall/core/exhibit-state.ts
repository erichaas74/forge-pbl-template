import type { ExhibitHallState } from '../domain/exhibit-types';

export function cloneHallState(state: ExhibitHallState): ExhibitHallState {
  return structuredClone(state);
}

export function withRevision(state: ExhibitHallState): ExhibitHallState {
  return { ...state, revision: state.revision + 1 };
}

export function entityId(state: ExhibitHallState, prefix: string): string {
  return `${prefix}-${state.sequence + 1}`;
}
