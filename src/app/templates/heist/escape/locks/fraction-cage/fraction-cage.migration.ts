import { acceptsTimingCageUpgrade } from '../timing-cage/timing-cage.migration';
import { acceptsPistonUpgrade } from '../../balance-lock/balance-lock.migration';

type Row = Record<string, unknown>;
const row = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);

/** Only the optional presentation may differ. Inventories, fractions and other content stay exact. */
export function acceptsFractionCageUpgrade(before: string, after: string): boolean {
  let changed = false;
  const normalize = (a: unknown, b: unknown): unknown => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row(a) || !row(b)) return b;
    const result: Row = {};
    const upgrade =
      a['kind'] === 'fraction-gear' &&
      b['kind'] === 'fraction-gear' &&
      a['presentation'] === undefined &&
      row(b['presentation']) &&
      b['presentation']['kind'] === 'fraction-cage';
    for (const key of Object.keys(b)) {
      if (upgrade && key === 'presentation') {
        changed = true;
        continue;
      }
      result[key] = normalize(a[key], b[key]);
    }
    return result;
  };
  const canonical = (v: unknown): string =>
    JSON.stringify(v, (_k, value) =>
      row(value)
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((k) => [k, value[k]]),
          )
        : value,
    );
  try {
    const old: unknown = JSON.parse(before),
      next = normalize(old, JSON.parse(after));
    const normalized = JSON.stringify(next);
    return (
      changed &&
      (canonical(old) === canonical(next) ||
        acceptsTimingCageUpgrade(before, normalized) ||
        acceptsPistonUpgrade(before, normalized))
    );
  } catch {
    return false;
  }
}
