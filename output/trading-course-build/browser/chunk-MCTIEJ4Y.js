import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/domain/heist.timeline.ts
var distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
var location = (m, id) => m.locations.find((n) => n.id === id);
var measure = (m, from, to) => ({ from, to, cm: distance(from, to) / m.map.pixelsPerCm, meters: distance(from, to) / m.map.pixelsPerCm * m.map.metersPerCm });
function timeline(m, plan, response) {
  const actions = [];
  let time = 0, loaded = false;
  const choice = m.crisis.choices.find((c) => c.id === response);
  const add = (type, from, to, duration, meters = 0, speed = 0, segment) => {
    actions.push({ id: `${type}-${actions.length}`, type, from, to, start: time, end: time + duration, distance: meters, speed, segment });
    time += duration;
  };
  plan.nodes.forEach((id, i) => {
    if (i > 0) {
      const from = plan.nodes[i - 1];
      const meters = measure(m, location(m, from), location(m, id)).meters;
      const speed = loaded ? m.target.loadedSpeed * (choice?.speedMultiplier ?? 1) : m.speed;
      add("MOVE", from, id, meters / speed, meters, speed, i - 1);
    }
    if (plan.waits[String(i)] > 0) add("WAIT", id, id, plan.waits[String(i)]);
    if (id === m.target.location && plan.pickup && !loaded) {
      add("PICKUP", id, id, m.target.pickupSeconds);
      loaded = true;
      if (choice?.delay) add("WAIT", id, id, choice.delay);
    }
  });
  return actions;
}
function position(m, actions, time) {
  const action = actions.find((a2) => time < a2.end) ?? actions.at(-1);
  if (!action) return location(m, m.entry);
  const a = location(m, action.from), b = location(m, action.to);
  const fraction = Math.max(0, Math.min(1, (time - action.start) / (action.end - action.start)));
  return { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction };
}
function routeChallenges(m, plan) {
  const moves = timeline(m, plan).filter((a) => a.type === "MOVE");
  return (m.math.routeChecks === "first-leg" ? moves.slice(0, 1) : moves).flatMap((a) => [
    { id: `distance-${a.segment}`, type: "DISTANCE_SCALE", title: m.math.routeChecks === "first-leg" ? "How far is the first walk?" : `${a.segment + 1}. Scale distance`, prompt: `${location(m, a.from).name} to ${location(m, a.to).name} is ${Number((a.distance / m.map.metersPerCm).toFixed(2))} cm on the map. Each cm stands for ${m.map.metersPerCm} meters. How many meters will your team walk?`, answer: a.distance, tolerance: m.math.distanceTolerance, unit: "m", hint: `Multiply the number of centimeters by ${m.map.metersPerCm}.` },
    { id: `time-${a.segment}`, type: "RATE_TIME_DISTANCE", title: m.math.routeChecks === "first-leg" ? "How long will the walk take?" : `${a.segment + 1}. Travel time`, prompt: `Your team walks ${Number(a.distance.toFixed(2))} meters. They move ${a.speed} meters each second. How many seconds will the walk take?`, answer: a.end - a.start, tolerance: m.math.timeTolerance, unit: "s", hint: `Divide ${Number(a.distance.toFixed(2))} by ${a.speed}. You can count in groups of ${a.speed}.` }
  ]);
}
var correct = (c, answer, unit) => Number.isFinite(answer) && unit.trim() === c.unit && Math.abs(answer - c.answer) <= c.tolerance + 1e-8;
var verified = (c, p) => {
  const a = p.answers[c.id]?.at(-1);
  return !!a && correct(c, a.answer, a.unit);
};
function readiness(m, p) {
  const problems = [];
  if (p.nodes[0] !== m.entry) problems.push("Start at the entry.");
  if (!p.nodes.includes(m.target.location) || !p.pickup) problems.push("Visit the archive and include target pickup.");
  if (p.nodes.at(-1) !== m.extraction) problems.push("Finish at extraction.");
  if (p.nodes.length < 2 || p.nodes.slice(1).some((id, i) => !m.routes.some((r) => !r.blocked && (r.from === p.nodes[i] && r.to === id || r.to === p.nodes[i] && r.from === id)))) problems.push("Use connected, open routes.");
  const pending = [...routeChallenges(m, p), ...m.math.required].filter((c) => !verified(c, p));
  if (pending.length) problems.push(`Verify ${pending.length} required calculations.`);
  if (m.target.mass > m.target.capacity) problems.push("The target exceeds carrying capacity.");
  if ((timeline(m, p).at(-1)?.end ?? 0) > m.deadline) problems.push("The plan exceeds the extraction deadline.");
  return problems;
}

// src/app/templates/heist/domain/heist.patrol.ts
function patrolPosition(guard, seconds) {
  const duration = guard.points.reduce((total, a, i) => total + a.wait + distance(a, guard.points[(i + 1) % guard.points.length]) / guard.speed, 0);
  let t = (seconds % duration + duration) % duration;
  for (let i = 0; i < guard.points.length; i++) {
    const a = guard.points[i], b = guard.points[(i + 1) % guard.points.length];
    const facing = Math.atan2(b.y - a.y, b.x - a.x);
    if (t < a.wait) return { x: a.x, y: a.y, facing, waiting: true };
    t -= a.wait;
    const travel = distance(a, b) / guard.speed;
    if (t < travel) return { x: a.x + (b.x - a.x) * t / travel, y: a.y + (b.y - a.y) * t / travel, facing, waiting: false };
    t -= travel;
  }
  return __spreadProps(__spreadValues({}, guard.points[0]), { facing: 0, waiting: true });
}
function blockedSight(a, b, walls) {
  return walls.some((w) => {
    let low = 0, high = 1;
    for (const [start, delta, min, max] of [[a.x, b.x - a.x, w.x, w.x + w.width], [a.y, b.y - a.y, w.y, w.y + w.height]]) {
      if (Math.abs(delta) < 1e-10) {
        if (start < min || start > max) return false;
      } else {
        const p = (min - start) / delta, q = (max - start) / delta;
        low = Math.max(low, Math.min(p, q));
        high = Math.min(high, Math.max(p, q));
        if (low > high) return false;
      }
    }
    return true;
  });
}
function sees(m, guard, target, time) {
  const p = patrolPosition(guard, time);
  const angle = Math.atan2(target.y - p.y, target.x - p.x) - p.facing;
  return distance(p, target) <= guard.range && Math.abs(Math.atan2(Math.sin(angle), Math.cos(angle))) <= guard.angle * Math.PI / 360 && !blockedSight(p, target, m.walls);
}

export {
  distance,
  location,
  measure,
  timeline,
  position,
  routeChallenges,
  correct,
  verified,
  readiness,
  patrolPosition,
  blockedSight,
  sees
};
//# debugId=712919af-3899-5cc4-9a57-6e7ab385cc6e
//# sourceMappingURL=chunk-MCTIEJ4Y.js.map
