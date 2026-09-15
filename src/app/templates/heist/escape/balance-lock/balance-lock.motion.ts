import { balanceReading, type BalanceLockDefinition } from './balance-lock.domain';

/** Presentation displacement only. Exact rational equality remains the unlock authority. */
export function balancePinTargets(lock: BalanceLockDefinition, placements: readonly number[]) {
  return lock.scales.map((_, i) => {
    const reading = balanceReading(lock, i, placements);
    const ratio = reading.difference / Math.max(reading.left + reading.right, 0.001);
    return {
      aligned: reading.balanced,
      // A near miss must remain visibly outside the bolt's clearance band.
      offset: reading.balanced
        ? 0
        : Math.sign(ratio) * Math.max(19, Math.min(32, Math.abs(ratio) * 48)),
      reading,
    };
  });
}
