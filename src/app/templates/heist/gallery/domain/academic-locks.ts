import type { AcademicLock, LockAnswer, LockType } from './gallery.models';

export interface LockEvaluator { evaluate(lock: AcademicLock, answer: LockAnswer): boolean }
export const angularDistance = (a: number, b: number): number => Math.abs(((a - b + 180) % 360 + 360) % 360 - 180);
const numeric: LockEvaluator = { evaluate: (lock, answer) => {
  const { calculation, setting } = answer;
  if (!Number.isFinite(calculation) || !Number.isFinite(setting) || setting! < lock.min! || setting! > lock.max!) return false;
  const tolerance = lock.tolerance ?? 0;
  const delta = lock.type === 'rotation' && lock.wrap ? angularDistance(setting!, lock.target!) : Math.abs(setting! - lock.target!);
  return Math.abs(calculation! - lock.target!) <= tolerance && delta <= tolerance;
} };
const ordered: LockEvaluator = { evaluate: (lock, answer) => !!answer.order && answer.order.length === lock.solution!.length && answer.order.every((id, i) => id === lock.solution![i]) };
const matching: LockEvaluator = { evaluate: (lock, answer) => !!answer.placements && Object.keys(answer.placements).length === lock.items!.length && lock.items!.every(item => answer.placements![item.id] === lock.matches![item.id]) };
const selection: LockEvaluator = { evaluate: (lock, answer) => answer.selected?.length === 1 && answer.selected[0] === lock.solution![0] };
const cargo: LockEvaluator = { evaluate: (lock, answer) => {
  const selected = answer.selected;
  if (!selected || new Set(selected).size !== selected.length || selected.some(id => !lock.items!.some(item => item.id === id))) return false;
  const mass = cargoMass(lock, selected);
  return answer.calculation === lock.capacity && mass <= lock.capacity! && lock.requiredItems!.every(id => selected.includes(id));
} };
export const cargoMass = (lock: AcademicLock, selected: readonly string[]): number => lock.items?.filter(item => selected.includes(item.id)).reduce((sum, item) => sum + (item.mass ?? 0), 0) ?? 0;
export const lockEvaluators: Readonly<Record<LockType, LockEvaluator>> = {
  combo: numeric, rotation: numeric, measurement: numeric, lever: selection, timeline: ordered, 'map-route': ordered,
  sorting: matching, 'people-placement': matching, 'technology-sort': matching, 'evidence-board': matching, cargo,
};
export function evaluateLock(lock: AcademicLock, answer: LockAnswer): boolean { return lockEvaluators[lock.type].evaluate(lock, answer); }
