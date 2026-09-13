import type { EscapeAnswer } from './escape.models';
import type { MachineAnswer } from '../locks/machine.models';

export interface WorldPoint {
  readonly x: number;
  readonly y: number;
}
export interface WorldNode extends WorldPoint {
  readonly id: string;
}
export interface ExpeditionWorldDefinition {
  readonly width: number;
  readonly height: number;
  readonly speed: number;
  readonly spawn: WorldPoint;
  readonly pathRadius: number;
  readonly interactionRadius: number;
  readonly nodes: readonly WorldNode[];
  readonly paths: readonly (readonly [string, string])[];
  /** Closed passages become walkable after their configured puzzle is solved. */
  readonly pathLocks?: readonly {
    readonly stepId: string;
    readonly paths: readonly (readonly [string, string])[];
  }[];
  readonly characters: string;
  readonly animalAtlas: string;
  readonly mechanismAtlas: string;
  readonly boat?: string;
  readonly animalRows: Readonly<Record<string, number>>;
  /** Normalized crop rectangles keep painted sprite poses clear of neighboring cells. */
  readonly animalFrames?: readonly (readonly [number, number, number, number])[];
  readonly lanterns: readonly WorldPoint[];
  readonly water: readonly WorldPoint[];
  readonly patrol: readonly WorldPoint[];
}
/** Player presence is intentionally separate from shared puzzle/release state. */
export interface ExpeditionPlayer {
  readonly id: string;
  readonly name: string;
  readonly color: number;
  readonly position: WorldPoint;
  readonly facing: number;
  readonly moving: boolean;
}
export interface ExpeditionDraft {
  readonly digits: readonly number[];
  readonly quantity: number | null;
  readonly departure: number;
  readonly weights: readonly number[];
  readonly counted: readonly string[];
  readonly placements?: readonly number[];
  readonly machine?: MachineAnswer;
}
export type ExpeditionInput =
  | { readonly type: 'machine-change'; readonly answer: MachineAnswer }
  | { readonly type: 'gear-change'; readonly answer: readonly number[] }
  | { readonly type: 'balance-place'; readonly index: number; readonly side: 0 | 1 | 2 }
  | { readonly type: 'walk'; readonly destination: WorldPoint }
  | { readonly type: 'interact'; readonly stepId: string }
  | { readonly type: 'dial'; readonly index: number; readonly change: number }
  | { readonly type: 'weight'; readonly index: number }
  | { readonly type: 'count'; readonly id: string };
/** Transport-facing intent envelope for a later authenticated room adapter.
 * No sockets, room codes, or network service are installed for single-player play. */
export interface ExpeditionIntent {
  readonly id: string;
  readonly playerId: string;
  readonly expectedRevision: number;
  readonly command: {
    readonly type: 'answer';
    readonly stepId: string;
    readonly answer: EscapeAnswer;
  };
}
