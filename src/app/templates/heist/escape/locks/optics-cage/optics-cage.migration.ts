import { acceptsGearCageUpgrade } from '../../gear-lock/gear-cage/gear-cage.migration';
import { acceptsFractionCageUpgrade } from '../fraction-cage/fraction-cage.migration';
import { acceptsTimingCageUpgrade } from '../timing-cage/timing-cage.migration';
import { acceptsPistonUpgrade } from '../../balance-lock/balance-lock.migration';

type Row = Record<string, unknown>;
const row = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);
/** Adding an optional scene never invalidates a draft; changing the optics still does. */
export function acceptsOpticsCageUpgrade(before: string, after: string): boolean {
  let changed = false;
  const normalize = (a: unknown, b: unknown): unknown => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row(a) || !row(b)) return b;
    const upgrade =
      a['kind'] === 'reflection' &&
      b['kind'] === 'reflection' &&
      a['presentation'] === undefined &&
      row(b['presentation']) &&
      b['presentation']['kind'] === 'optics-cage';
    return Object.fromEntries(
      Object.keys(b)
        .filter((key) => {
          if (upgrade && key === 'presentation') {
            changed = true;
            return false;
          }
          return true;
        })
        .map((key) => [key, normalize(a[key], b[key])]),
    );
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
        acceptsGearCageUpgrade(before, text) ||
        acceptsFractionCageUpgrade(before, text) ||
        acceptsTimingCageUpgrade(before, text) ||
        acceptsPistonUpgrade(before, text))
    );
  } catch {
    return false;
  }
}
