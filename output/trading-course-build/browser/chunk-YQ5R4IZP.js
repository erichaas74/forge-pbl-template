// src/app/templates/heist/escape/balance-lock/balance-lock.domain.ts
var gcd = (a, b) => b ? gcd(b, a % b) : a < 0n ? -a : a;
function exact(n, d) {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
var value = (r) => exact(BigInt(r.numerator), BigInt(r.denominator));
var add = (a, b) => exact(a.n * b.d + b.n * a.d, a.d * b.d);
var subtract = (a, b) => add(a, { n: -b.n, d: b.d });
var key = (a) => `${a.n}/${a.d}`;
var magnitude = (a) => Number(a.n) / Number(a.d);
var sum = (pieces) => pieces.reduce((a, p) => add(a, value(p.value)), { n: 0n, d: 1n });
var allBalancePieces = (lock) => lock.scales.flatMap((s) => s.pieces);
var emptyBalance = (lock) => allBalancePieces(lock).map(() => 0);
var scaleOffset = (lock, index) => lock.scales.slice(0, index).reduce((n, s) => n + s.pieces.length, 0);
var usesPiston = (lock) => lock.mechanism === "piston-counterweight";
function balancePlacements(lock, placements) {
  return usesPiston(lock) && placements.includes(1) ? placements.map((side) => side === 1 ? 0 : side) : placements;
}
var canPlaceBalanceWeight = (lock, side) => side === 0 || side === 2 || side === 1 && !usesPiston(lock);
var pistonMassLabel = (lock, index) => lock.scales[index].left.map(formatPiece).join(" + ");
function validPlacements(lock, placements) {
  return placements.length === allBalancePieces(lock).length && placements.every((n) => n === 0 || n === 1 || n === 2);
}
function formatPiece(piece) {
  const { numerator: n, denominator: d } = piece.value;
  if (piece.notation === "decimal") return String(n / d);
  if (piece.notation === "whole") return String(n);
  if (piece.notation === "mixed" && n >= d)
    return n % d ? `${Math.floor(n / d)} ${n % d}/${d}` : String(n / d);
  return `${n}/${d}`;
}
function formatExact(a) {
  return a.d === 1n ? String(a.n) : `${a.n}/${a.d}`;
}
function balanceReading(lock, index, placements) {
  const scale = lock.scales[index], offset = scaleOffset(lock, index), positions = balancePlacements(lock, placements), piston = usesPiston(lock);
  const fixedSide = [...scale.left, ...scale.pieces.filter((_, i) => positions[offset + i] === 1)];
  const adjustableSide = [
    ...scale.right,
    ...scale.pieces.filter((_, i) => positions[offset + i] === 2)
  ];
  const leftPieces = piston ? adjustableSide : fixedSide, rightPieces = piston ? fixedSide : adjustableSide;
  const left = sum(leftPieces), right = sum(rightPieces), difference = subtract(right, left), tolerance = value(lock.tolerance);
  const balanced = (difference.n < 0n ? -difference.n : difference.n) * tolerance.d <= tolerance.n * difference.d;
  const phrase = (pieces) => pieces.length ? pieces.map(formatPiece).join(" + ") : "0";
  return {
    balanced,
    left: magnitude(left),
    right: magnitude(right),
    difference: magnitude(difference),
    leftText: phrase(leftPieces),
    rightText: phrase(rightPieces),
    equation: `${phrase(leftPieces)} ${balanced ? "=" : difference.n > 0n ? "<" : ">"} ${phrase(rightPieces)}`,
    totals: `${formatExact(left)} : ${formatExact(right)}`,
    feedback: balanced ? "Equal loads. The release pin is aligned." : piston ? difference.n > 0n ? "The piston is heavier. Add weight to the pan to lift its cutout." : "The pan is heavier. Remove weight to lower the piston cutout." : difference.n > 0n ? "The right pan is heavier. Move or remove weight to level the beam." : "The left pan is heavier. Add weight to the right, or adjust the left."
  };
}
function evaluateBalanceLock(lock, placements) {
  return validPlacements(lock, placements) && lock.scales.every((_, i) => balanceReading(lock, i, placements).balanced);
}
function validateBalanceLock(input) {
  const fail = (detail) => {
    throw new Error(`INVALID_BALANCE_LOCK: ${detail}`);
  };
  const row = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : fail("object");
  const text = (v, max = 200) => typeof v === "string" && v.trim() && v.length <= max ? v : fail("text");
  const rational = (v, zero = false) => {
    const r = row(v), n = r["numerator"], d = r["denominator"];
    if (typeof n !== "number" || !Number.isInteger(n) || n < (zero ? 0 : 1) || n > 1e3 || typeof d !== "number" || !Number.isInteger(d) || d < 1 || d > 1e3 || n / d > 100)
      fail("rational bounds");
    return v;
  };
  const array = (v, min, max) => Array.isArray(v) && v.length >= min && v.length <= max ? v : fail("array bounds");
  const lock = row(input);
  if (lock["mechanism"] !== void 0 && !["two-pan", "piston-counterweight"].includes(String(lock["mechanism"])))
    fail("mechanism");
  const piston = lock["mechanism"] === "piston-counterweight";
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(text(lock["backdrop"])))
    fail("local backdrop");
  if (lock["blockAtlas"] !== void 0 && !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(text(lock["blockAtlas"])))
    fail("local block atlas");
  if (!["brass", "stone", "laboratory"].includes(String(lock["skin"]))) fail("skin");
  const tolerance = rational(lock["tolerance"], true);
  if (tolerance.numerator / tolerance.denominator > 0.01) fail("tolerance");
  const scaleIds = /* @__PURE__ */ new Set();
  for (const v of array(lock["scales"], 1, 3)) {
    const s = row(v), id = text(s["id"], 60), ids = /* @__PURE__ */ new Set();
    if (scaleIds.has(id)) fail("duplicate scale");
    scaleIds.add(id);
    text(s["title"], 50);
    text(s["instruction"]);
    text(s["unit"], 24);
    for (const list of [array(s["left"], 0, 2), array(s["right"], 0, 2), array(s["pieces"], 2, 8)])
      for (const raw of list) {
        const p = row(raw), pieceId = text(p["id"], 60), r = rational(p["value"]);
        if (ids.has(pieceId)) fail("duplicate piece");
        ids.add(pieceId);
        if (!["whole", "fraction", "decimal", "mixed"].includes(String(p["notation"])))
          fail("notation");
        if (p["notation"] === "whole" && r.denominator !== 1) fail("whole notation");
        if (p["notation"] === "decimal" && !Number.isInteger(r.numerator * 1e3 / r.denominator))
          fail("decimal must terminate within three places");
      }
    const scale = v;
    if (!scale.left.length && !scale.right.length) fail("fixed load required");
    if (piston && (!scale.left.length || scale.right.length))
      fail("piston requires a fixed counterweight and empty pan");
    let reachable = /* @__PURE__ */ new Map([["0/1", { n: 0n, d: 1n }]]);
    for (const p of scale.pieces) {
      const next = new Map(reachable);
      for (const a of reachable.values())
        for (const b of piston ? [add(a, value(p.value))] : [add(a, value(p.value)), subtract(a, value(p.value))])
          next.set(key(b), b);
      reachable = next;
    }
    const target = subtract(sum(scale.left), sum(scale.right)), tol = value(tolerance);
    if (target.n === 0n) fail("already balanced");
    if (![...reachable.values()].some((r) => {
      const diff = subtract(r, target);
      return (diff.n < 0n ? -diff.n : diff.n) * tol.d <= tol.n * diff.d;
    }))
      fail("no solution");
  }
}

export {
  allBalancePieces,
  emptyBalance,
  scaleOffset,
  usesPiston,
  balancePlacements,
  canPlaceBalanceWeight,
  pistonMassLabel,
  validPlacements,
  formatPiece,
  balanceReading,
  evaluateBalanceLock,
  validateBalanceLock
};
//# debugId=3e21bf8d-e0f6-599d-b843-712f6c8fe30e
//# sourceMappingURL=chunk-YQ5R4IZP.js.map
