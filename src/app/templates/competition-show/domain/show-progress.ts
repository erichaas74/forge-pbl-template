import type { CompetitionState } from './competition.models';

/** Student-facing progress. Engine phase names never reach the interface. */
export type RailStopId = 'line-up' | 'get-ready' | 'answer' | 'scores' | 'result';
export interface RailStop { id: RailStopId; label: string; }
export interface RailState { stops: RailStop[]; index: number; detail: string; waiting: boolean; }

export const railStops: RailStop[] = [
  { id: 'line-up', label: 'Line-up' }, { id: 'get-ready', label: 'Get ready' },
  { id: 'answer', label: 'Answer now' }, { id: 'scores', label: 'Scores' }, { id: 'result', label: 'Result' },
];
const stopByPhase: Record<CompetitionState['phase'], RailStopId> = {
  setup: 'line-up', bracket: 'line-up', ready: 'get-ready', open: 'answer', paused: 'answer',
  locked: 'scores', revealed: 'scores', results: 'result', champion: 'result',
};
export function railIndex(phase: CompetitionState['phase']): number {
  return railStops.findIndex(stop => stop.id === stopByPhase[phase]);
}
/** `paused` and `locked` are states of a stop, not stops of their own. */
export function railWaiting(phase: CompetitionState['phase']): boolean {
  return phase === 'paused' || phase === 'locked';
}
export function railDetail(phase: CompetitionState['phase'], roundTitle: string, roundIndex: number, roundCount: number): string {
  if (phase === 'setup') return 'Seeds are set. Nobody has played yet.';
  if (phase === 'bracket') return 'The bracket is drawn.';
  if (phase === 'champion') return 'The championship is decided.';
  if (phase === 'results') return 'The contest is over.';
  return `${roundTitle} · round ${roundIndex + 1} of ${roundCount}`;
}
