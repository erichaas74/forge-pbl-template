/** Metres throughout. X points east, Y up, Z south; rotation is degrees about Y. */
export interface DesignBlock {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly rotation: number;
  readonly aperture?: DesignAperture;
}
/** One centred cylindrical bore through the chosen local block axis. */
export interface DesignAperture {
  readonly axis: 'x' | 'y' | 'z';
  readonly diameter: number;
  readonly insert: 'open' | 'glass' | 'jewel';
  readonly color: 'clear' | 'red' | 'amber' | 'green' | 'blue' | 'violet';
}
export interface DesignDisplayObject {
  readonly model: 'sphere' | 'crystal' | 'obelisk';
  readonly material: 'limestone' | 'bronze' | 'porcelain';
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly width: number;
  readonly height: number;
  readonly rotation: number;
}
export interface DesignTarget {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly z: number;
  /** Optional observation context for a learner-placed reference mark. */
  readonly settings?: Readonly<Record<string, string | number>>;
}
export interface BlockDesign {
  readonly blocks: readonly DesignBlock[];
  readonly targets: readonly DesignTarget[];
  readonly displayObject?: DesignDisplayObject;
}
export interface DesignCapture {
  readonly id: string;
  readonly pluginId: string;
  readonly capturedAt: string;
  readonly design: BlockDesign;
  readonly settings: Readonly<Record<string, string | number>>;
  readonly measurements: readonly { readonly label: string; readonly value: string }[];
}
/** Learner-authored expectations; installed simulations define scenario/value semantics. */
export interface DesignCheck {
  readonly scenarioId: string;
  readonly targetId: string;
  readonly expectedValue: string;
  /** Optional bounded parameters whose meaning is owned by the installed simulation. */
  readonly settings?: Readonly<Record<string, string | number>>;
}
export function isDesignChecks(value: unknown): value is readonly DesignCheck[] {
  return (
    Array.isArray(value) &&
    value.length <= 20 &&
    value.every(
      (entry: unknown) =>
        record(entry) &&
        text(entry['scenarioId'], 80) &&
        text(entry['targetId']) &&
        text(entry['expectedValue'], 80) &&
        (entry['settings'] === undefined ||
          (record(entry['settings']) &&
            Object.entries(entry['settings']).length <= 4 &&
            Object.entries(entry['settings']).every(
              ([key, value]) =>
                text(key, 40) && (text(value, 80) || finite(value, -100000, 100000)),
            ))),
    ) &&
    new Set(value.map((entry: DesignCheck) => entry.scenarioId)).size === value.length
  );
}
export const EMPTY_BLOCK_DESIGN: BlockDesign = { blocks: [], targets: [] };
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const finite = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
const text = (v: unknown, max = 200): v is string =>
  typeof v === 'string' && v.length > 0 && v.length <= max;
export function isBlockDesign(v: unknown): v is BlockDesign {
  if (!record(v) || !Array.isArray(v['blocks']) || !Array.isArray(v['targets'])) return false;
  const blocks = v['blocks'],
    targets = v['targets'];
  return (
    blocks.length <= 100 &&
    targets.length <= 12 &&
    blocks.every(
      (b: unknown) =>
        record(b) &&
        text(b['id']) &&
        finite(b['x'], -12, 12) &&
        finite(b['z'], -12, 12) &&
        finite(b['y'], 0, 10) &&
        finite(b['width'], 0.01, 5) &&
        finite(b['height'], 0.01, 5) &&
        finite(b['depth'], 0.01, 5) &&
        finite(b['rotation'], 0, 359) &&
        (b['aperture'] === undefined || isDesignAperture(b['aperture'], b)),
    ) &&
    targets.every(
      (t: unknown) =>
        record(t) &&
        text(t['id']) &&
        text(t['label'], 80) &&
        finite(t['x'], -12, 12) &&
        finite(t['z'], -12, 12) &&
        (t['settings'] === undefined ||
          (record(t['settings']) &&
            Object.entries(t['settings']).length <= 8 &&
            Object.entries(t['settings']).every(
              ([k, v]) => text(k, 40) && (text(v, 80) || finite(v, -100000, 100000)),
            ))),
    ) &&
    new Set(blocks.map((b: DesignBlock) => b.id)).size === blocks.length &&
    new Set(targets.map((t: DesignTarget) => t.id)).size === targets.length &&
    !blocks.some((a: DesignBlock, i: number) =>
      blocks.slice(i + 1).some((b: DesignBlock) => blocksOverlap(a, b)),
    ) &&
    (v['displayObject'] === undefined ||
      (isDesignDisplayObject(v['displayObject']) &&
        !blocks.some((b: DesignBlock) =>
          blocksOverlap(b, displayObjectEnvelope(v['displayObject'] as DesignDisplayObject)),
        )))
  );
}
export function isDesignAperture(a: unknown, b: Record<string, unknown>): a is DesignAperture {
  if (!record(a) || !['x', 'y', 'z'].includes(String(a['axis']))) return false;
  const cross =
    a['axis'] === 'x'
      ? [b['height'], b['depth']]
      : a['axis'] === 'y'
        ? [b['width'], b['depth']]
        : [b['width'], b['height']];
  return (
    finite(a['diameter'], 0.005, Math.min(...cross.map(Number)) * 0.9) &&
    ['open', 'glass', 'jewel'].includes(String(a['insert'])) &&
    ['clear', 'red', 'amber', 'green', 'blue', 'violet'].includes(String(a['color']))
  );
}
export function isDesignDisplayObject(v: unknown): v is DesignDisplayObject {
  return (
    record(v) &&
    ['sphere', 'crystal', 'obelisk'].includes(String(v['model'])) &&
    ['limestone', 'bronze', 'porcelain'].includes(String(v['material'])) &&
    finite(v['x'], -12, 12) &&
    finite(v['z'], -12, 12) &&
    finite(v['y'], 0, 10) &&
    finite(v['width'], 0.05, 5) &&
    finite(v['height'], 0.05, 5) &&
    finite(v['rotation'], 0, 359)
  );
}
export function displayObjectEnvelope(v: DesignDisplayObject): DesignBlock {
  return { ...v, id: 'display-object-envelope', depth: v.width };
}
/** Separating-axis test for two rotated rectangular solids. Touching faces are allowed. */
export function blocksOverlap(a: DesignBlock, b: DesignBlock): boolean {
  if (a.y + a.height <= b.y + 1e-8 || b.y + b.height <= a.y + 1e-8) return false;
  const axes = (block: DesignBlock) => {
    const r = (block.rotation * Math.PI) / 180;
    return [
      [Math.cos(r), -Math.sin(r)],
      [Math.sin(r), Math.cos(r)],
    ];
  };
  const aa = axes(a),
    bb = axes(b);
  const dot = (u: number[], v: number[]) => u[0] * v[0] + u[1] * v[1];
  return [...aa, ...bb].every((axis) => {
    const radiusA =
      (a.width / 2) * Math.abs(dot(axis, aa[0])) + (a.depth / 2) * Math.abs(dot(axis, aa[1]));
    const radiusB =
      (b.width / 2) * Math.abs(dot(axis, bb[0])) + (b.depth / 2) * Math.abs(dot(axis, bb[1]));
    return Math.abs(dot([b.x - a.x, b.z - a.z], axis)) < radiusA + radiusB - 1e-8;
  });
}
export function isDesignCapture(v: unknown): v is DesignCapture {
  return (
    record(v) &&
    text(v['id']) &&
    text(v['pluginId']) &&
    text(v['capturedAt']) &&
    Number.isFinite(Date.parse(v['capturedAt'])) &&
    isBlockDesign(v['design']) &&
    record(v['settings']) &&
    Object.keys(v['settings']).length <= 20 &&
    Object.values(v['settings']).every((n) => text(n) || finite(n, -1e6, 1e6)) &&
    Array.isArray(v['measurements']) &&
    v['measurements'].length <= 30 &&
    v['measurements'].every((m: unknown) => record(m) && text(m['label']) && text(m['value'], 500))
  );
}
