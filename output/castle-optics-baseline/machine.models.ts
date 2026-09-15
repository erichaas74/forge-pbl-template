export type MathGrade = 5 | 6 | 7 | 8;
export interface Point {
  readonly x: number;
  readonly y: number;
}
export interface Segment {
  readonly a: Point;
  readonly b: Point;
}
interface ChallengeBase {
  readonly id: string;
  readonly title: string;
  readonly instruction: string;
  readonly hint: string;
  readonly success: string;
}
export interface FractionGear extends ChallengeBase {
  readonly kind: 'fraction-gear';
  readonly presentation?: { readonly kind: 'fraction-cage'; readonly rabbits: number };
  readonly slots: number;
  readonly teeth: number;
  readonly pieces: readonly {
    readonly id: string;
    readonly numerator: number;
    readonly denominator: number;
  }[];
}
export interface Volume extends ChallengeBase {
  readonly kind: 'volume';
  readonly targetLabel?: string;
  readonly capacity: number;
  readonly target: number;
  readonly unitTicks: number;
  readonly unit: string;
  readonly vessels: readonly {
    readonly id: string;
    readonly label: string;
    readonly amount: number;
    readonly uses: number;
  }[];
}
export interface TimingWheels extends ChallengeBase {
  readonly kind: 'timing-wheels';
  readonly presentation?: TimingCagePresentation;
  readonly periods: readonly number[];
  readonly phases: readonly number[];
  readonly maxSteps: number;
  readonly firstAlignment: boolean;
}
export interface TimingCagePresentation {
  readonly kind: 'timing-cage';
  readonly animal: {
    readonly label: string;
    readonly model: string;
    readonly idle: string;
    readonly walk: string;
    readonly run: string;
    readonly credits: string;
  };
}
export interface Coordinate extends ChallengeBase {
  readonly kind: 'coordinate';
  readonly min: number;
  readonly max: number;
  readonly goal:
    | { readonly mode: 'point'; readonly point: Point }
    | {
        readonly mode: 'transform';
        readonly start: Point;
        readonly scale: number;
        readonly shift: Point;
      }
    | {
        readonly mode: 'intersection';
        readonly lines: readonly [
          { readonly a: number; readonly b: number; readonly c: number },
          { readonly a: number; readonly b: number; readonly c: number },
        ];
      };
}
export interface Reflection extends ChallengeBase {
  readonly kind: 'reflection';
  readonly emitter: Point;
  readonly direction: number;
  readonly mirrors: readonly {
    readonly id: string;
    readonly center: Point;
    readonly length: number;
    readonly start: number;
    readonly step: number;
  }[];
  readonly receiver: Point;
  readonly radius: number;
  readonly obstacles: readonly Segment[];
  readonly bounceLimit: number;
}
export interface Mixing extends ChallengeBase {
  readonly kind: 'mixing';
  readonly capacity: number;
  readonly total?: number;
  readonly unitTicks: number;
  readonly unit: string;
  readonly ingredients: readonly {
    readonly id: string;
    readonly label: string;
    readonly color: string;
    readonly parts: number;
    readonly measure: number;
    readonly supply: number;
  }[];
}
export interface Cable extends ChallengeBase {
  readonly kind: 'cable';
  readonly route: readonly Point[];
  readonly mode: 'route' | 'diagonal';
  readonly unit: string;
  readonly scale: number;
  readonly cables: readonly {
    readonly id: string;
    readonly label: string;
    readonly length: number;
  }[];
}
export type MachineChallenge =
  FractionGear | Volume | TimingWheels | Coordinate | Reflection | Mixing | Cable;
export type MachineKind = MachineChallenge['kind'];
export interface MachineDefinition {
  readonly title: string;
  readonly backdrop: string;
  readonly stages: readonly MachineChallenge[];
}
export type StageAnswer =
  | { readonly kind: 'fraction-gear'; readonly offsets: readonly number[] }
  | { readonly kind: 'volume'; readonly pours: readonly number[] }
  | { readonly kind: 'timing-wheels'; readonly steps: number }
  | { readonly kind: 'coordinate'; readonly x: number; readonly y: number }
  | { readonly kind: 'reflection'; readonly angles: readonly number[] }
  | { readonly kind: 'mixing'; readonly measures: readonly number[] }
  | { readonly kind: 'cable'; readonly cable: number };
export interface MachineAnswer {
  readonly type: 'machine-lock';
  readonly stages: readonly StageAnswer[];
  readonly seals: readonly string[];
}
export interface MachineReading {
  readonly solved: boolean;
  readonly feedback: string;
  readonly equation: string;
}
export type MachineInput =
  | { readonly type: 'piece'; readonly index: number; readonly offset: number }
  | { readonly type: 'pour'; readonly index: number; readonly delta: 1 | -1 }
  | { readonly type: 'steps'; readonly value: number }
  | { readonly type: 'point'; readonly x: number; readonly y: number }
  | { readonly type: 'mirror'; readonly index: number; readonly angle: number }
  | { readonly type: 'measure'; readonly index: number; readonly delta: 1 | -1 }
  | { readonly type: 'cable'; readonly index: number }
  | { readonly type: 'reset' };
