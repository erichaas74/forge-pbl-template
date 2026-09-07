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
}
export interface DesignTarget {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly z: number;
}
export interface BlockDesign {
  readonly blocks: readonly DesignBlock[];
  readonly targets: readonly DesignTarget[];
}
export interface DesignCapture {
  readonly id: string;
  readonly pluginId: string;
  readonly capturedAt: string;
  readonly design: BlockDesign;
  readonly settings: Readonly<Record<string, string | number>>;
  readonly measurements: readonly { readonly label: string; readonly value: string }[];
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
        finite(b['rotation'], 0, 359),
    ) &&
    targets.every(
      (t: unknown) =>
        record(t) &&
        text(t['id']) &&
        text(t['label'], 80) &&
        finite(t['x'], -12, 12) &&
        finite(t['z'], -12, 12),
    ) &&
    new Set(blocks.map((b: DesignBlock) => b.id)).size === blocks.length &&
    new Set(targets.map((t: DesignTarget) => t.id)).size === targets.length &&
    !blocks.some((a: DesignBlock, i: number) =>
      blocks.slice(i + 1).some((b: DesignBlock) => blocksOverlap(a, b)),
    )
  );
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
