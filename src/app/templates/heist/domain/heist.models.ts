export interface Point { readonly x: number; readonly y: number }
export interface Location extends Point { readonly id: string; readonly name: string; readonly description: string }
export interface Challenge {
  readonly id: string; readonly type: 'DISTANCE_SCALE' | 'RATE_TIME_DISTANCE' | 'CAPACITY' | 'ELAPSED_TIME' | 'PERCENT_CHANGE';
  readonly title: string; readonly prompt: string; readonly answer: number; readonly tolerance: number;
  readonly unit: string; readonly hint: string;
}
export interface Patrol { readonly id: string; readonly name: string; readonly speed: number; readonly points: readonly (Point & { readonly wait: number })[]; readonly range: number; readonly angle: number }
/** Optional guided route selection; omitted missions retain free route planning. */
export interface HeistGuidance {
  readonly routes: readonly { readonly id: string; readonly label: string; readonly description: string; readonly nodes: readonly string[] }[];
}
/** Optional artwork only. World coordinates and gameplay remain in Mission. */
export interface HeistPresentation {
  readonly ground: string;
  readonly buildings: string;
  readonly characters: string;
  readonly props: string;
  readonly wallFrames: readonly number[];
  readonly buildingFrames: readonly { readonly x: number; readonly y: number; readonly width: number; readonly height: number }[];
  readonly groundSlices: readonly { readonly source: readonly [number, number, number, number]; readonly destination: readonly [number, number, number, number] }[];
  readonly landmarks?: readonly { readonly frame: number; readonly x: number; readonly y: number; readonly width: number; readonly height: number }[];
  readonly responseStyles: Readonly<Record<string, 'carry' | 'repair' | 'cart'>>;
}
export interface Mission {
  readonly schemaVersion: '1.0'; readonly projectId: string; readonly projectVersion: string;
  readonly template: { readonly id: 'heist'; readonly version: '1.0' };
  readonly title: string; readonly briefing: string; readonly history: string;
  readonly presentation?: HeistPresentation;
  readonly guidance?: HeistGuidance;
  readonly map: { readonly image: string; readonly width: number; readonly height: number; readonly pixelsPerCm: number; readonly metersPerCm: number };
  readonly locations: readonly Location[];
  readonly routes: readonly { readonly from: string; readonly to: string; readonly blocked?: boolean }[];
  readonly walls: readonly { readonly x: number; readonly y: number; readonly width: number; readonly height: number }[];
  readonly entry: string; readonly extraction: string;
  readonly target: { readonly location: string; readonly name: string; readonly mass: number; readonly capacity: number; readonly pickupSeconds: number; readonly loadedSpeed: number };
  readonly speed: number; readonly deadline: number; readonly detectionGrace: number;
  readonly guards: readonly Patrol[];
  readonly gate: { readonly location: string; readonly cycle: number; readonly openSeconds: number };
  readonly math: { readonly distanceTolerance: number; readonly timeTolerance: number; readonly routeChecks?: 'all' | 'first-leg'; readonly required: readonly Challenge[] };
  readonly crisis: { readonly title: string; readonly description: string; readonly challenge: Challenge; readonly choices: readonly { readonly id: string; readonly label: string; readonly capacity: number; readonly speedMultiplier: number; readonly delay: number }[] };
}
export interface MathAttempt { readonly answer: number; readonly unit: string; readonly correct: boolean }
export interface Plan { nodes: string[]; waits: Record<string, number>; pickup: boolean; answers: Record<string, MathAttempt[]> }
export interface Action { readonly id: string; readonly type: 'MOVE' | 'WAIT' | 'PICKUP'; readonly from: string; readonly to: string; readonly start: number; readonly end: number; readonly distance: number; readonly speed: number; readonly segment?: number }
export type Mode = 'RECON' | 'PLANNING' | 'EXECUTING' | 'CRISIS' | 'SUCCESS' | 'FAILURE';
export type EventType = 'PLAN_LOCKED' | 'MOVE_START' | 'MOVE_END' | 'WAIT' | 'MATH_CHECK' | 'TARGET_SECURED' | 'CRISIS' | 'CRISIS_RESOLVED' | 'NEAR_MISS' | 'DETECTED' | 'EXTRACTED' | 'FAILED';
export interface HeistEvent { readonly time: number; readonly type: EventType; readonly message: string; readonly actionId?: string }
export interface Measurement { readonly from: Point; readonly to: Point; readonly cm: number; readonly meters: number }
export type HeistCommand =
  | { type: 'plan' | 'undo' | 'reset' | 'lock' }
  | { type: 'node'; id: string }
  | { type: 'route'; id: string }
  | { type: 'measure'; from: Point; to: Point }
  | { type: 'wait'; index: number; seconds: number }
  | { type: 'pickup'; enabled: boolean }
  | { type: 'answer'; id: string; answer: number; unit: string }
  | { type: 'advance'; time: number }
  | { type: 'respond'; id: string };
