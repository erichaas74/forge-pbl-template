import { acceptsFractionCageUpgrade } from '../../locks/fraction-cage/fraction-cage.migration';
import { acceptsTimingCageUpgrade } from '../../locks/timing-cage/timing-cage.migration';
import { acceptsPistonUpgrade } from '../../balance-lock/balance-lock.migration';
type Row = Record<string, unknown>;
const row = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);
export function acceptsGearCageUpgrade(before: string, after: string): boolean {
  let changed = false;
  const normalize = (a: unknown, b: unknown): unknown => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row(a) || !row(b)) return b;
    const upgrade =
      Array.isArray(a['gears']) &&
      Array.isArray(b['gears']) &&
      a['driverTeeth'] !== undefined &&
      a['presentation'] === undefined &&
      row(b['presentation']) &&
      b['presentation']['kind'] === 'gear-cage';
    const value: Row = {};
    for (const key of Object.keys(b)) {
      if (upgrade && key === 'presentation') {
        changed = true;
        continue;
      }
      value[key] = normalize(a[key], b[key]);
    }
    return value;
  };
  const canonical = (v: unknown) =>
    JSON.stringify(v, (_key, value) =>
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
      next = normalize(old, JSON.parse(after)),
      text = JSON.stringify(next);
    return (
      changed &&
      (canonical(old) === canonical(next) ||
        acceptsFractionCageUpgrade(before, text) ||
        acceptsTimingCageUpgrade(before, text) ||
        acceptsPistonUpgrade(before, text))
    );
  } catch {
    return false;
  }
}
