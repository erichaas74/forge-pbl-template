// src/app/templates/heist/escape/gear-lock/gear-lock.domain.ts
var emptyGears = () => [-1, -1, 1];
function validGearDraft(d, a) {
  return a.length === 3 && a.every(Number.isInteger) && a[0] >= -1 && a[0] < d.gears.length && a[1] >= -1 && a[1] < d.gears.length && (a[0] === -1 || a[0] !== a[1]) && a[2] >= 1 && a[2] <= d.maxCrank;
}
function moveGear(d, a, index, socket) {
  if (!validGearDraft(d, a) || !Number.isInteger(index) || !d.gears[index] || ![-1, 0, 1].includes(socket))
    return a;
  const next = [...a];
  for (let i = 0; i < 2; i++) if (next[i] === index) next[i] = -1;
  if (socket !== -1) next[socket] = index;
  return next;
}
function gearMotion(d, a, crank) {
  const first = d.gears[a[0]], second = d.gears[a[1]];
  const axle = first ? -crank * d.driverTeeth / first.teeth : 0;
  return {
    drive: crank,
    axle,
    output: first && second ? -axle * d.pinionTeeth / second.teeth : 0
  };
}
function evaluateGearLock(d, a) {
  if (!validGearDraft(d, a) || a[0] < 0 || a[1] < 0) return false;
  const first = d.gears[a[0]].teeth, second = d.gears[a[1]].teeth;
  return first * d.firstMultiplier.denominator === d.driverTeeth * d.firstMultiplier.numerator && second * d.secondMultiplier.denominator === d.pinionTeeth * d.secondMultiplier.numerator && a[2] * d.driverTeeth * d.pinionTeeth * d.outputTurns.denominator === first * second * d.outputTurns.numerator;
}
var fractionLabel = (v) => v.denominator === 1 ? `${v.numerator}` : `${v.numerator}/${v.denominator}`;
function gearFeedback(d, a) {
  if (!validGearDraft(d, a) || a[0] < 0 || a[1] < 0)
    return "The drive train has a gap. Fit a cog on both axles.";
  const first = d.gears[a[0]].teeth, second = d.gears[a[1]].teeth;
  if (first * d.firstMultiplier.denominator !== d.driverTeeth * d.firstMultiplier.numerator)
    return `Axle A misses its calibration mark. Its tooth count must be ${fractionLabel(d.firstMultiplier)} times ${d.driverTeeth}.`;
  if (second * d.secondMultiplier.denominator !== d.pinionTeeth * d.secondMultiplier.numerator)
    return `Axle B misses its calibration mark. Its tooth count must be ${fractionLabel(d.secondMultiplier)} times ${d.pinionTeeth}.`;
  const turns = gearMotion(d, a, a[2]).output, target = d.outputTurns.numerator / d.outputTurns.denominator;
  if (!evaluateGearLock(d, a))
    return turns < target ? "The drum stops short of its release mark. Keep the cogs; try more crank turns." : "The drum passes its release mark. Keep the cogs; try fewer crank turns.";
  return d.success;
}
var RELEASE_SECONDS = {
  drive: 3.2,
  ball: 1.5,
  hammer: 0.8,
  weight: 2.2,
  domino: 1.1,
  gate: 2.4
};
function releaseFrame(sequence, elapsed) {
  let start = 0;
  const progress = { drive: 0, ball: 0, hammer: 0, weight: 0, domino: 0, gate: 0 };
  let active = sequence[sequence.length - 1];
  for (const module of sequence) {
    progress[module] = Math.max(0, Math.min(1, (elapsed - start) / RELEASE_SECONDS[module]));
    if (elapsed >= start && elapsed < start + RELEASE_SECONDS[module]) active = module;
    start += RELEASE_SECONDS[module];
  }
  return { progress, active, complete: elapsed >= start, total: start };
}
function validateGearLock(value) {
  const fail = (field) => {
    throw new Error(`INVALID_HEIST_ESCAPE: gear-lock.${field}`);
  };
  if (!value || typeof value !== "object" || Array.isArray(value)) fail("definition");
  const d = value;
  if (d.presentation !== void 0) {
    const p = d.presentation, a = p?.animal;
    if (p?.kind !== "gear-cage" || !Number.isInteger(p.foxes) || p.foxes < 1 || p.foxes > 4 || !a || !/^\/projects\/[a-zA-Z0-9/_-]+\.glb$/.test(a.model) || !/^\/projects\/[a-zA-Z0-9/_-]+\.html$/.test(a.credits) || ![a.idle, a.walk, a.run].every((s) => typeof s === "string" && s.trim().length > 0 && s.length < 80))
      fail("gear-cage presentation");
  }
  for (const key of ["title", "instruction", "success"])
    if (typeof d[key] !== "string" || !d[key].trim() || d[key].length > 1e3) fail(key);
  if (typeof d.backdrop !== "string" || !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(d.backdrop))
    fail("backdrop");
  const teeth = (n) => Number.isInteger(n) && n >= 8 && n <= 48;
  if (!teeth(d.driverTeeth) || !teeth(d.pinionTeeth)) fail("fixed teeth");
  if (!Number.isInteger(d.maxCrank) || d.maxCrank < 1 || d.maxCrank > 12) fail("maxCrank");
  for (const key of ["firstMultiplier", "secondMultiplier", "outputTurns"]) {
    const f = d[key];
    if (!f || !Number.isInteger(f.numerator) || !Number.isInteger(f.denominator) || f.numerator < 1 || f.numerator > 12 || f.denominator < 1 || f.denominator > 12)
      fail(key);
  }
  if (!Array.isArray(d.gears) || d.gears.length < 3 || d.gears.length > 6) fail("gears");
  const ids = /* @__PURE__ */ new Set();
  for (const g of d.gears) {
    if (!g || typeof g.id !== "string" || !/^[a-z][a-z0-9-]{0,40}$/.test(g.id) || ids.has(g.id) || !teeth(g.teeth))
      fail("gear");
    ids.add(g.id);
  }
  if (JSON.stringify(d.release) !== JSON.stringify(["drive", "ball", "hammer", "weight", "domino", "gate"]))
    fail("release connectors");
  let possible = false;
  for (let a = 0; a < d.gears.length; a++)
    for (let b = 0; b < d.gears.length; b++)
      for (let turns = 1; turns <= d.maxCrank; turns++)
        if (evaluateGearLock(d, [a, b, turns])) possible = true;
  if (!possible) fail("no reachable calibration");
}

export {
  emptyGears,
  validGearDraft,
  moveGear,
  gearMotion,
  evaluateGearLock,
  fractionLabel,
  gearFeedback,
  releaseFrame,
  validateGearLock
};
//# debugId=7f4786e9-e4e3-5c68-a4ca-8143634bd2de
//# sourceMappingURL=chunk-RAYONVPN.js.map
