import { acceptsPistonUpgrade } from '../../balance-lock/balance-lock.migration';
type Row = Record<string, unknown>;
const row = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);
const cageStep = (value: Row): boolean => {
  const puzzle = value['puzzle'];
  if (!row(puzzle) || puzzle['type'] !== 'machine-lock' || !row(puzzle['lock'])) return false;
  const stages = puzzle['lock']['stages'];
  return (
    Array.isArray(stages) &&
    stages.length === 1 &&
    row(stages[0]) &&
    stages[0]['kind'] === 'timing-wheels' &&
    row(stages[0]['presentation']) &&
    stages[0]['presentation']['kind'] === 'timing-cage'
  );
};

/** Accept presentation-only upgrades, including drafts predating the piston renderer.
 * Timing periods, offsets, answer rules, inventories and all other content must match. */
export function acceptsTimingCageUpgrade(before: string, after: string): boolean {
  let upgraded = false;
  const normalize = (a: unknown, b: unknown): unknown => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row(a) || !row(b)) return b;
    const result: Row = {};
    const step = cageStep(b) && row(a['puzzle']) && a['puzzle']['type'] === 'machine-lock';
    const timing =
      a['kind'] === 'timing-wheels' &&
      b['kind'] === 'timing-wheels' &&
      a['presentation'] === undefined &&
      row(b['presentation']) &&
      b['presentation']['kind'] === 'timing-cage';
    if (timing) upgraded = true;
    for (const key of Object.keys(b)) {
      if (timing && key === 'presentation') continue;
      result[key] = (timing || step) && key === 'success' ? a[key] : normalize(a[key], b[key]);
    }
    return result;
  };
  try {
    const old = JSON.parse(before),
      normalized = JSON.stringify(normalize(old, JSON.parse(after)));
    const canonical = (value: unknown): string =>
      JSON.stringify(value, (_key, item) =>
        row(item)
          ? Object.fromEntries(
              Object.keys(item)
                .sort()
                .map((key) => [key, item[key]]),
            )
          : item,
      );
    return (
      upgraded &&
      (canonical(old) === canonical(JSON.parse(normalized)) ||
        acceptsPistonUpgrade(before, normalized))
    );
  } catch {
    return false;
  }
}
