import { acceptsOpticsCageUpgrade } from '../optics-cage/optics-cage.migration';
import { acceptsGearCageUpgrade } from '../../gear-lock/gear-cage/gear-cage.migration';
import { acceptsFractionCageUpgrade } from '../fraction-cage/fraction-cage.migration';
import { acceptsTimingCageUpgrade } from '../timing-cage/timing-cage.migration';
import { acceptsPistonUpgrade } from '../../balance-lock/balance-lock.migration';

type Row = Record<string, unknown>;
const row = (v: unknown): v is Row => !!v && typeof v === 'object' && !Array.isArray(v);
/** Adding an optional scene never invalidates a draft; changing the bridge mathematics still does. */
export function acceptsBridgeCageUpgrade(before: string, after: string): boolean {
  let changed = false;
  const normalize = (a: unknown, b: unknown): unknown => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row(a) || !row(b)) return b;
    const upgrade =
      Array.isArray(a['stages']) && Array.isArray(b['stages']) &&
      a['stages'].length === 2 && b['stages'].length === 2 &&
      row(b['stages'][0]) && b['stages'][0]['kind'] === 'coordinate' &&
      row(b['stages'][1]) && b['stages'][1]['kind'] === 'cable' &&
      a['presentation'] === undefined &&
      row(b['presentation']) &&
      b['presentation']['kind'] === 'bridge-cage';
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
        acceptsOpticsCageUpgrade(before, text) ||
        acceptsGearCageUpgrade(before, text) ||
        acceptsFractionCageUpgrade(before, text) ||
        acceptsTimingCageUpgrade(before, text) ||
        acceptsPistonUpgrade(before, text))
    );
  } catch {
    return false;
  }
}
