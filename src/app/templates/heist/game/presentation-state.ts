import type { Action, HeistEvent, Measurement, Mission, Mode, Plan, Point } from '../domain/heist.models';
import { location, position } from '../domain/heist.timeline';

export interface MapSnapshot {
  revision: number;
  time: number; actions: readonly Action[]; plan: Plan; events: readonly HeistEvent[];
  mode: Mode; response?: string; security: boolean; tool: string; selected: string;
  measurement?: Measurement; measureStart?: Point; executing: boolean;
  reducedMotion: boolean; cameraLocked: boolean; replay: boolean;
}
export type CargoPose = 'empty' | 'pickup' | 'loaded' | 'broken' | 'carry' | 'repair' | 'extracted';
export function teamPresentation(mission: Mission, s: Pick<MapSnapshot, 'time' | 'actions' | 'events' | 'response'>): { point: Point; facing: number; moving: boolean; pose: CargoPose } {
  const active = s.actions.find(a => a.start <= s.time && s.time < a.end);
  const previous = s.actions.filter(a => a.type === 'MOVE' && a.start <= s.time).at(-1);
  const move = active?.type === 'MOVE' ? active : previous;
  const a = location(mission, move?.from ?? mission.entry), b = location(mission, move?.to ?? mission.entry);
  const occurred = (type: HeistEvent['type']) => s.events.some(e => e.type === type && e.time <= s.time);
  const pickup = s.actions.find(a => a.type === 'PICKUP');
  const loaded = occurred('TARGET_SECURED') || (pickup !== undefined && s.time >= pickup.end);
  const response = occurred('CRISIS_RESOLVED') ? mission.presentation?.responseStyles[s.response ?? ''] : undefined;
  let pose: CargoPose = active?.type === 'PICKUP' ? 'pickup' : loaded ? 'loaded' : 'empty';
  if (occurred('CRISIS') && !occurred('CRISIS_RESOLVED')) pose = 'broken';
  if (loaded && response === 'carry') pose = 'carry';
  if (loaded && response === 'repair' && active?.type === 'WAIT') pose = 'repair';
  if (occurred('EXTRACTED')) pose = 'extracted';
  return { point: position(mission, s.actions, s.time), facing: Math.atan2(b.y - a.y, b.x - a.x), moving: active?.type === 'MOVE', pose };
}

/** Mission time is also the animation clock: pausing and scrubbing freeze/reset poses. */
export function spriteFrame(facing: number, moving: boolean, time: number, guard = false): number {
  const direction = ((Math.round(facing / (Math.PI / 2)) % 4) + 4) % 4;
  return (guard ? 8 : 0) + direction + (moving && Math.floor(time * 5) % 2 ? 4 : 0);
}

/** Reconstruct persistent state at any cursor; only short forward steps emit transients. */
export class PresentationEvents {
  private time?: number;
  private identities = new Set<string>();
  consume(time: number, events: readonly HeistEvent[]): readonly HeistEvent[] {
    const keys = events.map((e, index) => `${index}:${e.time}:${e.type}:${e.actionId ?? ''}:${e.message}`);
    const seeking = this.time === undefined || time < this.time || time - this.time > 1.1;
    const fresh = seeking ? [] : events.filter((e, i) => e.time <= time && e.time >= this.time! && !this.identities.has(keys[i]));
    this.identities = new Set(keys.filter((_, i) => events[i].time <= time));
    this.time = time;
    return fresh;
  }
}
