import type { GearLockDefinition } from '../gear-lock/gear-lock.domain';
import type { BalanceLockDefinition } from '../balance-lock/balance-lock.domain';
import type { ExpeditionWorldDefinition } from './expedition.models';

export interface EscapeAnimal {
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly image: string;
  readonly pen: string;
}
export interface EscapeClue {
  readonly label: string;
  readonly value: string;
}
interface PuzzleBase {
  readonly prompt: string;
  readonly hint: string;
  readonly skill: string;
}
export interface NumberPuzzle extends PuzzleBase {
  readonly type: 'number';
  readonly answer: number;
  readonly unit: string;
  readonly max: number;
  readonly visual?: {
    readonly kind: 'groups' | 'length' | 'fraction' | 'capacity';
    readonly count: number;
    readonly amount: number;
  };
}
export interface CodePuzzle extends PuzzleBase {
  readonly type: 'code';
  readonly answer: string;
  readonly labels: readonly string[];
  readonly countAnimals?: boolean;
}
export interface TimingPuzzle extends PuzzleBase {
  readonly type: 'timing';
  readonly cycle: number;
  readonly safeStart: number;
  readonly safeEnd: number;
  readonly crossing: number;
}
export interface BalancePuzzle extends PuzzleBase {
  readonly type: 'balance';
  readonly target: number;
  readonly weights: readonly number[];
}
export interface BalanceLockPuzzle extends PuzzleBase {
  readonly type: 'balance-lock';
  readonly lock: BalanceLockDefinition;
}
export interface GearLockPuzzle extends PuzzleBase {
  readonly type: 'gear-lock';
  readonly lock: GearLockDefinition;
}
export type EscapePuzzle =
  NumberPuzzle | CodePuzzle | TimingPuzzle | BalancePuzzle | BalanceLockPuzzle | GearLockPuzzle;
export interface EscapeStep {
  readonly id: string;
  readonly title: string;
  readonly place: string;
  readonly story: string;
  readonly action: string;
  readonly success: string;
  readonly explanation: string;
  readonly x: number;
  readonly y: number;
  readonly icon: string;
  readonly clues: readonly EscapeClue[];
  readonly puzzle: EscapePuzzle;
  readonly release: readonly string[];
}
export interface EscapeMission {
  readonly schemaVersion: '1.2';
  readonly experience: 'escape';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly template: { readonly id: 'heist'; readonly version: '1.0' };
  readonly title: string;
  readonly subtitle: string;
  readonly briefing: string;
  readonly introductionTitle: string;
  readonly mapTitle: string;
  readonly setting: string;
  readonly environment: string;
  readonly finale: string;
  readonly animals: readonly EscapeAnimal[];
  readonly steps: readonly EscapeStep[];
  readonly world?: ExpeditionWorldDefinition;
}
export type EscapeAnswer = number | string | readonly number[];
export type EscapeCommand =
  | { readonly type: 'start' }
  | { readonly type: 'submit'; readonly stepId: string; readonly answer: EscapeAnswer }
  | { readonly type: 'continue'; readonly stepId: string };
export interface EscapeEnvelope {
  readonly id: string;
  readonly command: EscapeCommand;
}
export interface EscapeAttempt {
  readonly stepId: string;
  readonly answer: EscapeAnswer;
  readonly correct: boolean;
}
