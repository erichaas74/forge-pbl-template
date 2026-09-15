type Row = Record<string, unknown>;
const row = (value: unknown): value is Row =>
  !!value && typeof value === 'object' && !Array.isArray(value);

function pistonUpgrade(before: unknown, after: unknown): boolean {
  return (
    row(before) &&
    row(after) &&
    before['type'] === 'balance-lock' &&
    after['type'] === 'balance-lock' &&
    row(before['lock']) &&
    row(after['lock']) &&
    [undefined, 'two-pan'].includes(before['lock']['mechanism'] as 'two-pan' | undefined) &&
    after['lock']['mechanism'] === 'piston-counterweight'
  );
}

/** Only the counterweight presentation upgrade may cross the preview fingerprint boundary.
 * All loads, inventories, IDs, tolerances, other machines and grade variants must still match. */
export function acceptsPistonUpgrade(beforeFingerprint: string, afterFingerprint: string): boolean {
  let upgraded = false;
  const same = (before: unknown, after: unknown): boolean => {
    if (before === after) return true;
    if (Array.isArray(before) && Array.isArray(after))
      return before.length === after.length && before.every((value, i) => same(value, after[i]));
    if (!row(before) || !row(after)) return false;
    const puzzleUpgrade = pistonUpgrade(before, after);
    if (puzzleUpgrade) upgraded = true;
    const stepUpgrade = pistonUpgrade(before['puzzle'], after['puzzle']);
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
    return [...keys].every((key) => {
      // Descriptive hints/clues change from two pans to a pan and piston.
      if ((puzzleUpgrade && key === 'hint') || (stepUpgrade && key === 'clues')) return true;
      if (puzzleUpgrade && key === 'lock') {
        const oldLock = { ...(before[key] as Row) },
          newLock = { ...(after[key] as Row) };
        delete oldLock['mechanism'];
        delete newLock['mechanism'];
        return same(oldLock, newLock);
      }
      return (
        Object.hasOwn(before, key) && Object.hasOwn(after, key) && same(before[key], after[key])
      );
    });
  };
  try {
    return same(JSON.parse(beforeFingerprint), JSON.parse(afterFingerprint)) && upgraded;
  } catch {
    return false;
  }
}
