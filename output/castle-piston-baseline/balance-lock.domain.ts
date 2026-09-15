export interface Rational {
  readonly numerator: number;
  readonly denominator: number;
}
export type BalanceSide = 0 | 1 | 2;
export type BalanceNotation = 'whole' | 'fraction' | 'decimal' | 'mixed';
export interface BalancePiece {
  readonly id: string;
  readonly value: Rational;
  readonly notation: BalanceNotation;
}
export interface BalanceScale {
  readonly id: string;
  readonly title: string;
  readonly instruction: string;
  readonly unit: string;
  readonly left: readonly BalancePiece[];
  readonly right: readonly BalancePiece[];
  readonly pieces: readonly BalancePiece[];
}
export interface BalanceLockDefinition {
  readonly backdrop: string;
  /** Three equal horizontal cells: brass, stone, laboratory. */
  readonly blockAtlas?: string;
  readonly skin: 'brass' | 'stone' | 'laboratory';
  readonly tolerance: Rational;
  readonly scales: readonly BalanceScale[];
}
interface Exact {
  n: bigint;
  d: bigint;
}
const gcd = (a: bigint, b: bigint): bigint => (b ? gcd(b, a % b) : a < 0n ? -a : a);
function exact(n: bigint, d: bigint): Exact {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
const value = (r: Rational): Exact => exact(BigInt(r.numerator), BigInt(r.denominator));
const add = (a: Exact, b: Exact): Exact => exact(a.n * b.d + b.n * a.d, a.d * b.d);
const subtract = (a: Exact, b: Exact): Exact => add(a, { n: -b.n, d: b.d });
const key = (a: Exact): string => `${a.n}/${a.d}`;
const magnitude = (a: Exact): number => Number(a.n) / Number(a.d);
const sum = (pieces: readonly BalancePiece[]): Exact =>
  pieces.reduce((a, p) => add(a, value(p.value)), { n: 0n, d: 1n });
export const pieceMass = (p: BalancePiece): number => p.value.numerator / p.value.denominator;
export const allBalancePieces = (lock: BalanceLockDefinition): readonly BalancePiece[] =>
  lock.scales.flatMap((s) => s.pieces);
export const emptyBalance = (lock: BalanceLockDefinition): BalanceSide[] =>
  allBalancePieces(lock).map(() => 0);
export const scaleOffset = (lock: BalanceLockDefinition, index: number): number =>
  lock.scales.slice(0, index).reduce((n, s) => n + s.pieces.length, 0);
export function validPlacements(
  lock: BalanceLockDefinition,
  placements: readonly number[],
): boolean {
  return (
    placements.length === allBalancePieces(lock).length &&
    placements.every((n) => n === 0 || n === 1 || n === 2)
  );
}
export function formatPiece(piece: BalancePiece): string {
  const { numerator: n, denominator: d } = piece.value;
  if (piece.notation === 'decimal') return String(n / d);
  if (piece.notation === 'whole') return String(n);
  if (piece.notation === 'mixed' && n >= d)
    return n % d ? `${Math.floor(n / d)} ${n % d}/${d}` : String(n / d);
  return `${n}/${d}`;
}
function formatExact(a: Exact): string {
  return a.d === 1n ? String(a.n) : `${a.n}/${a.d}`;
}
export function balanceReading(
  lock: BalanceLockDefinition,
  index: number,
  placements: readonly number[],
) {
  const scale = lock.scales[index],
    offset = scaleOffset(lock, index);
  const leftPieces = [
    ...scale.left,
    ...scale.pieces.filter((_, i) => placements[offset + i] === 1),
  ];
  const rightPieces = [
    ...scale.right,
    ...scale.pieces.filter((_, i) => placements[offset + i] === 2),
  ];
  const left = sum(leftPieces),
    right = sum(rightPieces),
    difference = subtract(right, left),
    tolerance = value(lock.tolerance);
  const balanced =
    (difference.n < 0n ? -difference.n : difference.n) * tolerance.d <= tolerance.n * difference.d;
  const phrase = (pieces: readonly BalancePiece[]): string =>
    pieces.length ? pieces.map(formatPiece).join(' + ') : '0';
  return {
    balanced,
    left: magnitude(left),
    right: magnitude(right),
    difference: magnitude(difference),
    leftText: phrase(leftPieces),
    rightText: phrase(rightPieces),
    equation: `${phrase(leftPieces)} ${balanced ? '=' : difference.n > 0n ? '<' : '>'} ${phrase(rightPieces)}`,
    totals: `${formatExact(left)} : ${formatExact(right)}`,
    feedback: balanced
      ? 'Equal loads. The release pin is aligned.'
      : difference.n > 0n
        ? 'The right pan is heavier. Move or remove weight to level the beam.'
        : 'The left pan is heavier. Add weight to the right, or adjust the left.',
  };
}
export function evaluateBalanceLock(
  lock: BalanceLockDefinition,
  placements: readonly number[],
): boolean {
  return (
    validPlacements(lock, placements) &&
    lock.scales.every((_, i) => balanceReading(lock, i, placements).balanced)
  );
}

/** Validate content before exact arithmetic or rendering. No executable expressions in packages. */
export function validateBalanceLock(input: unknown): asserts input is BalanceLockDefinition {
  const fail = (detail: string): never => {
    throw new Error(`INVALID_BALANCE_LOCK: ${detail}`);
  };
  const row = (v: unknown): Record<string, unknown> =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : fail('object');
  const text = (v: unknown, max = 200): string =>
    typeof v === 'string' && v.trim() && v.length <= max ? v : fail('text');
  const rational = (v: unknown, zero = false): Rational => {
    const r = row(v),
      n = r['numerator'],
      d = r['denominator'];
    if (
      typeof n !== 'number' ||
      !Number.isInteger(n) ||
      n < (zero ? 0 : 1) ||
      n > 1000 ||
      typeof d !== 'number' ||
      !Number.isInteger(d) ||
      d < 1 ||
      d > 1000 ||
      n / d > 100
    )
      fail('rational bounds');
    return v as Rational;
  };
  const array = (v: unknown, min: number, max: number): unknown[] =>
    Array.isArray(v) && v.length >= min && v.length <= max ? v : fail('array bounds');
  const lock = row(input);
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(text(lock['backdrop'])))
    fail('local backdrop');
  if (
    lock['blockAtlas'] !== undefined &&
    !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(text(lock['blockAtlas']))
  )
    fail('local block atlas');
  if (!['brass', 'stone', 'laboratory'].includes(String(lock['skin']))) fail('skin');
  const tolerance = rational(lock['tolerance'], true);
  if (tolerance.numerator / tolerance.denominator > 0.01) fail('tolerance');
  const scaleIds = new Set<string>();
  for (const v of array(lock['scales'], 1, 3)) {
    const s = row(v),
      id = text(s['id'], 60),
      ids = new Set<string>();
    if (scaleIds.has(id)) fail('duplicate scale');
    scaleIds.add(id);
    text(s['title'], 50);
    text(s['instruction']);
    text(s['unit'], 24);
    for (const list of [array(s['left'], 0, 2), array(s['right'], 0, 2), array(s['pieces'], 2, 8)])
      for (const raw of list) {
        const p = row(raw),
          pieceId = text(p['id'], 60),
          r = rational(p['value']);
        if (ids.has(pieceId)) fail('duplicate piece');
        ids.add(pieceId);
        if (!['whole', 'fraction', 'decimal', 'mixed'].includes(String(p['notation'])))
          fail('notation');
        if (p['notation'] === 'whole' && r.denominator !== 1) fail('whole notation');
        if (p['notation'] === 'decimal' && !Number.isInteger((r.numerator * 1000) / r.denominator))
          fail('decimal must terminate within three places');
      }
    const scale = v as BalanceScale;
    if (!scale.left.length && !scale.right.length) fail('fixed load required');
    // Every piece has one of three locations, including unused. Validate a nontrivial solution.
    let reachable = new Map<string, Exact>([['0/1', { n: 0n, d: 1n }]]);
    for (const p of scale.pieces) {
      const next = new Map(reachable);
      for (const a of reachable.values())
        for (const b of [add(a, value(p.value)), subtract(a, value(p.value))]) next.set(key(b), b);
      reachable = next;
    }
    const target = subtract(sum(scale.left), sum(scale.right)),
      tol = value(tolerance);
    if (target.n === 0n) fail('already balanced');
    if (
      ![...reachable.values()].some((r) => {
        const diff = subtract(r, target);
        return (diff.n < 0n ? -diff.n : diff.n) * tol.d <= tol.n * diff.d;
      })
    )
      fail('no solution');
  }
}
