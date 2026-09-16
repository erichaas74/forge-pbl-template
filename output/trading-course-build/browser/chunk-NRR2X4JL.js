import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/locks/machine.geometry.ts
var cross = (a, b) => a.x * b.y - a.y * b.x;
var sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
function coordinateTarget(d) {
  const g = d.goal;
  if (g.mode === "point") return g.point;
  if (g.mode === "transform")
    return { x: g.start.x * g.scale + g.shift.x, y: g.start.y * g.scale + g.shift.y };
  const [a, b] = g.lines, determinant = a.a * b.b - b.a * a.b;
  return { x: (a.c * b.b - b.c * a.b) / determinant, y: (a.a * b.c - b.a * a.c) / determinant };
}
function cableLength(d) {
  if (d.mode === "diagonal")
    return Math.hypot(d.route[1].x - d.route[0].x, d.route[1].y - d.route[0].y) * d.scale;
  return d.route.slice(1).reduce((sum, p, i) => sum + Math.hypot(p.x - d.route[i].x, p.y - d.route[i].y) * d.scale, 0);
}
function mirrorSegment(d, index, angle) {
  const m = d.mirrors[index], a = angle * Math.PI / 180, dx = Math.cos(a) * m.length / 2, dy = Math.sin(a) * m.length / 2;
  return {
    a: { x: m.center.x - dx, y: m.center.y - dy },
    b: { x: m.center.x + dx, y: m.center.y + dy }
  };
}
function raySegment(origin, direction, segment) {
  const v = sub(segment.b, segment.a), w = sub(segment.a, origin), den = cross(direction, v);
  if (Math.abs(den) < 1e-9) return null;
  const t = cross(w, v) / den, u = cross(w, direction) / den;
  return t > 1e-6 && u >= 0 && u <= 1 ? t : null;
}
function traceBeam(d, angles) {
  let origin = __spreadValues({}, d.emitter), dir = {
    x: Math.cos(d.direction * Math.PI / 180),
    y: Math.sin(d.direction * Math.PI / 180)
  };
  const points = [origin];
  const walls = [
    { a: { x: 0, y: 0 }, b: { x: 10, y: 0 } },
    { a: { x: 10, y: 0 }, b: { x: 10, y: 8 } },
    { a: { x: 10, y: 8 }, b: { x: 0, y: 8 } },
    { a: { x: 0, y: 8 }, b: { x: 0, y: 0 } }
  ];
  for (let bounce = 0; bounce <= d.bounceLimit; bounce++) {
    let distance = 100, mirror = -1, blocked = false;
    [...walls, ...d.obstacles].forEach((s, i) => {
      const t = raySegment(origin, dir, s);
      if (t !== null && t < distance) {
        distance = t;
        mirror = -1;
        blocked = i >= walls.length;
      }
    });
    d.mirrors.forEach((_, i) => {
      const t = raySegment(origin, dir, mirrorSegment(d, i, angles[i]));
      if (t !== null && t < distance) {
        distance = t;
        mirror = i;
        blocked = false;
      }
    });
    const to = sub(d.receiver, origin), projection = to.x * dir.x + to.y * dir.y, perpendicular = to.x * to.x + to.y * to.y - projection * projection;
    if (projection > 0 && perpendicular <= d.radius * d.radius) {
      const entry = projection - Math.sqrt(Math.max(0, d.radius * d.radius - perpendicular));
      if (entry > 0 && entry < distance) {
        points.push({ x: origin.x + dir.x * entry, y: origin.y + dir.y * entry });
        return { points, hit: true, reason: "receiver" };
      }
    }
    const contact = { x: origin.x + dir.x * distance, y: origin.y + dir.y * distance };
    points.push(contact);
    if (mirror < 0) return { points, hit: false, reason: blocked ? "blocked" : "miss" };
    if (bounce === d.bounceLimit) return { points, hit: false, reason: "bounce-limit" };
    const a = angles[mirror] * Math.PI / 180, n = { x: -Math.sin(a), y: Math.cos(a) }, dot = dir.x * n.x + dir.y * n.y;
    dir = { x: dir.x - 2 * dot * n.x, y: dir.y - 2 * dot * n.y };
    origin = { x: contact.x + dir.x * 1e-5, y: contact.y + dir.y * 1e-5 };
  }
  return { points, hit: false, reason: "bounce-limit" };
}

// src/app/templates/heist/escape/locks/machine.rules.ts
var integers = (a, length, min, max) => Array.isArray(a) && a.length === length && a.every((n) => Number.isInteger(n) && n >= min && n <= max);
var result = (solved, feedback, equation) => ({
  solved,
  feedback,
  equation
});
var firstAlignment = (periods, phases, max) => {
  for (let t = 1; t <= max; t++) if (periods.every((p, i) => (t + phases[i]) % p === 0)) return t;
  return -1;
};
var machineRules = {
  "fraction-gear": {
    initial: (d) => ({
      kind: "fraction-gear",
      offsets: d.kind === "fraction-gear" ? d.pieces.map(() => -1) : []
    }),
    valid: (d, a) => d.kind === "fraction-gear" && a.kind === "fraction-gear" && integers(a.offsets, d.pieces.length, -1, d.slots - 1),
    read: (d, a) => {
      if (d.kind !== "fraction-gear" || a.kind !== "fraction-gear")
        return result(false, "Wrong mechanism.", "");
      const filled = /* @__PURE__ */ new Set();
      let overlap = false, total = 0;
      const parts = [];
      d.pieces.forEach((p, i) => {
        if (a.offsets[i] >= 0) {
          const size = d.slots * p.numerator / p.denominator;
          total += size;
          parts.push(`${p.numerator}/${p.denominator}`);
          for (let j = 0; j < size; j++) {
            const slot = (a.offsets[i] + j) % d.slots;
            if (filled.has(slot)) overlap = true;
            filled.add(slot);
          }
        }
      });
      const solved = total === d.slots && !overlap && filled.size === d.slots;
      return result(
        solved,
        solved ? d.success : overlap ? "Two sectors overlap. Lift or rotate a piece until each tooth has its own space." : `The wheel still has ${d.slots - filled.size} of ${d.slots} rim marks uncovered.`,
        `${parts.join(" + ") || "0"} ${total === d.slots ? "=" : "\u2260"} 1 whole`
      );
    }
  },
  volume: {
    initial: (d) => ({ kind: "volume", pours: d.kind === "volume" ? d.vessels.map(() => 0) : [] }),
    valid: (d, a) => d.kind === "volume" && a.kind === "volume" && integers(a.pours, d.vessels.length, 0, 30) && a.pours.every((n, i) => n <= d.vessels[i].uses),
    read: (d, a) => {
      if (d.kind !== "volume" || a.kind !== "volume") return result(false, "Wrong mechanism.", "");
      const total = a.pours.reduce((s, n, i) => s + n * d.vessels[i].amount, 0), solved = total === d.target;
      return result(
        solved,
        solved ? d.success : total > d.capacity ? "The overflow basin catches the excess. Drain the chamber and try a smaller combination." : total > d.target ? "The float is above the release notch. Remove a measured pour or drain and rebuild." : "The float sits below the release notch. More liquid is needed.",
        d.targetLabel ? `${total / d.unitTicks} ${d.unit} in a ${d.capacity / d.unitTicks} ${d.unit} chamber` : `${total / d.unitTicks} ${total === d.target ? "=" : total < d.target ? "<" : ">"} ${d.target / d.unitTicks} ${d.unit}`
      );
    }
  },
  "timing-wheels": {
    initial: () => ({ kind: "timing-wheels", steps: 0 }),
    valid: (d, a) => d.kind === "timing-wheels" && a.kind === "timing-wheels" && Number.isInteger(a.steps) && a.steps >= 0 && a.steps <= d.maxSteps,
    read: (d, a) => {
      if (d.kind !== "timing-wheels" || a.kind !== "timing-wheels")
        return result(false, "Wrong mechanism.", "");
      const aligned = d.periods.every((p, i) => (a.steps + d.phases[i]) % p === 0), first = firstAlignment(d.periods, d.phases, d.maxSteps), solved = a.steps > 0 && aligned && (!d.firstAlignment || a.steps === first);
      return result(
        solved,
        solved ? d.success : a.steps === 0 ? "The starting position does not count. Find the next shared opening." : aligned ? "The holes align, but the first shared opening was earlier. Rewind to catch the first release." : "The rod meets a closed wheel. Compare each wheel\u2019s remainder.",
        d.periods.map(
          (p, i) => `Wheel ${i + 1}: (${a.steps} + ${d.phases[i]}) \xF7 ${p}, remainder ${(a.steps + d.phases[i]) % p}`
        ).join("  \xB7  ")
      );
    }
  },
  coordinate: {
    initial: (d) => ({
      kind: "coordinate",
      x: d.kind === "coordinate" ? Math.max(0, d.min) : 0,
      y: d.kind === "coordinate" ? Math.max(0, d.min) : 0
    }),
    valid: (d, a) => d.kind === "coordinate" && a.kind === "coordinate" && [a.x, a.y].every((n) => Number.isInteger(n) && n >= d.min && n <= d.max),
    read: (d, a) => {
      if (d.kind !== "coordinate" || a.kind !== "coordinate")
        return result(false, "Wrong mechanism.", "");
      const t = coordinateTarget(d), solved = a.x === t.x && a.y === t.y;
      return result(
        solved,
        solved ? d.success : "The pin is over a different grid socket. Use the chart to set horizontal x first, then vertical y.",
        `Carriage (${a.x}, ${a.y})${solved ? " \u2014 release socket aligned" : ""}`
      );
    }
  },
  reflection: {
    initial: (d) => ({
      kind: "reflection",
      angles: d.kind === "reflection" ? d.mirrors.map((m) => m.start) : []
    }),
    valid: (d, a) => d.kind === "reflection" && a.kind === "reflection" && integers(a.angles, d.mirrors.length, 0, 179) && a.angles.every((n, i) => n % d.mirrors[i].step === 0),
    read: (d, a) => {
      if (d.kind !== "reflection" || a.kind !== "reflection")
        return result(false, "Wrong mechanism.", "");
      const beam = traceBeam(d, a.angles);
      return result(
        beam.hit,
        beam.hit ? d.success : beam.reason === "blocked" ? "The beam strikes an obstacle. Turn a mirror to route the light around it." : "The receiver is dark. Adjust the mirrors and follow the reflected beam.",
        a.angles.map((n, i) => `Mirror ${i + 1}: ${n}\xB0`).join("  \xB7  ")
      );
    }
  },
  mixing: {
    initial: (d) => ({
      kind: "mixing",
      measures: d.kind === "mixing" ? d.ingredients.map(() => 0) : []
    }),
    valid: (d, a) => d.kind === "mixing" && a.kind === "mixing" && integers(a.measures, d.ingredients.length, 0, 100) && a.measures.every((n, i) => n * d.ingredients[i].measure <= d.ingredients[i].supply),
    read: (d, a) => {
      if (d.kind !== "mixing" || a.kind !== "mixing") return result(false, "Wrong mechanism.", "");
      const amounts = a.measures.map((n, i) => n * d.ingredients[i].measure), total = amounts.reduce((s, n) => s + n, 0), ratio = total > 0 && amounts.every(
        (n, i) => n * d.ingredients[0].parts === amounts[0] * d.ingredients[i].parts
      ), solved = ratio && total <= d.capacity && (d.total === void 0 || total === d.total);
      return result(
        solved,
        solved ? d.success : total > d.capacity ? "The mixing chamber is overloaded. Drain or remove measured ingredients." : ratio ? "The composition sensor passes. Adjust the total to the operating line." : total === 0 ? "Dispense each ingredient to create a sample." : "The composition sensor is off its mark. Adjust the relationship between the ingredients.",
        `${amounts.map((n) => n / d.unitTicks).join(" : ")}  \xB7  Total ${total / d.unitTicks} ${d.unit}${ratio ? "  \xB7  Composition aligned" : ""}`
      );
    }
  },
  cable: {
    initial: () => ({ kind: "cable", cable: -1 }),
    valid: (d, a) => d.kind === "cable" && a.kind === "cable" && Number.isInteger(a.cable) && a.cable >= -1 && a.cable < d.cables.length,
    read: (d, a) => {
      if (d.kind !== "cable" || a.kind !== "cable") return result(false, "Wrong mechanism.", "");
      const chosen = d.cables[a.cable];
      if (!chosen)
        return result(false, "Select a cable, then hook it onto the anchors.", "No cable attached");
      const required = cableLength(d), solved = Math.abs(chosen.length * chosen.length - required * required) < 1e-8;
      return result(
        solved,
        solved ? d.success : chosen.length < required ? "The hook stops short. This cable cannot reach the second anchor." : "The cable sags. The spring carriage cannot pull the latch with this much slack.",
        `${chosen.label} attached${solved ? " \u2014 spring tension aligned" : ""}`
      );
    }
  }
};
function initialMachine(d) {
  return {
    type: "machine-lock",
    stages: d.stages.map((s) => machineRules[s.kind].initial(s)),
    seals: []
  };
}
function validMachineAnswer(d, value) {
  if (!value || typeof value !== "object" || !("type" in value) || value.type !== "machine-lock" || !("stages" in value) || !Array.isArray(value.stages) || value.stages.length !== d.stages.length)
    return false;
  if (!("seals" in value) || !Array.isArray(value.seals) || value.seals.length > d.stages.length || !value.seals.every((id, i) => id === d.stages[i].id))
    return false;
  return value.stages.every(
    (a, i) => a && typeof a === "object" && machineRules[d.stages[i].kind].valid(d.stages[i], a)
  ) && value.seals.every(
    (_, i) => machineReading(d.stages[i], value.stages[i]).solved
  );
}
function machineReading(d, a) {
  return machineRules[d.kind].valid(d, a) ? machineRules[d.kind].read(d, a) : result(false, "The mechanism settings could not be read. Reset this stage.", "");
}
function evaluateMachine(d, a) {
  return validMachineAnswer(d, a) && d.stages.every((s, i) => machineReading(s, a.stages[i]).solved);
}
function reduceMachine(d, a, input) {
  if (input.type === "reset") return machineRules[d.kind].initial(d);
  let next = a;
  if (a.kind === "fraction-gear" && input.type === "piece")
    next = __spreadProps(__spreadValues({}, a), { offsets: a.offsets.map((n, i) => i === input.index ? input.offset : n) });
  if (a.kind === "volume" && input.type === "pour")
    next = __spreadProps(__spreadValues({}, a), { pours: a.pours.map((n, i) => i === input.index ? n + input.delta : n) });
  if (a.kind === "timing-wheels" && input.type === "steps") next = __spreadProps(__spreadValues({}, a), { steps: input.value });
  if (a.kind === "coordinate" && input.type === "point") next = __spreadProps(__spreadValues({}, a), { x: input.x, y: input.y });
  if (a.kind === "reflection" && input.type === "mirror")
    next = __spreadProps(__spreadValues({}, a), { angles: a.angles.map((n, i) => i === input.index ? input.angle : n) });
  if (a.kind === "mixing" && input.type === "measure")
    next = __spreadProps(__spreadValues({}, a), { measures: a.measures.map((n, i) => i === input.index ? n + input.delta : n) });
  if (a.kind === "cable" && input.type === "cable") next = __spreadProps(__spreadValues({}, a), { cable: input.index });
  return machineRules[d.kind].valid(d, next) ? next : a;
}

export {
  coordinateTarget,
  cableLength,
  mirrorSegment,
  traceBeam,
  firstAlignment,
  machineRules,
  initialMachine,
  validMachineAnswer,
  machineReading,
  evaluateMachine,
  reduceMachine
};
//# debugId=a70574d8-d9a2-5018-b975-9e31ea585189
//# sourceMappingURL=chunk-NRR2X4JL.js.map
