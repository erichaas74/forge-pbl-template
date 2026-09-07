import type { OpeningChoice } from './decision-scene.models';
import { cargoTotals } from './cargo-selection';

export type CargoMathStep = 'cost' | 'remaining' | 'sale' | 'profit';
export const cargoMathSteps: readonly CargoMathStep[] = ['cost', 'remaining', 'sale', 'profit'];

/** Used for feedback only: answers remain blank until the student enters them. */
export function checkCargoAnswer(
  start: number,
  items: readonly OpeningChoice[],
  step: CargoMathStep,
  answer: string,
): boolean {
  if (!/^-?\d+(?:\.0+)?$/.test(answer.trim())) return false;
  return Number(answer) === cargoTotals(start, items)[step];
}
