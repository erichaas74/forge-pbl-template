import {
  validatePreviewWeeks
} from "./chunk-FWZ6YNYR.js";
import {
  ExpeditionNavigation
} from "./chunk-GAXYVDGI.js";
import {
  escapePuzzleEvaluators
} from "./chunk-RRITUMP7.js";
import {
  validateBalanceLock
} from "./chunk-YQ5R4IZP.js";
import {
  validateGearLock
} from "./chunk-RAYONVPN.js";
import {
  cableLength,
  coordinateTarget,
  firstAlignment,
  machineRules,
  traceBeam
} from "./chunk-NRR2X4JL.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/locks/machine.validation.ts
var fail = (field) => {
  throw new Error(`INVALID_HEIST_ESCAPE: machine-lock.${field}`);
};
var int = (v, min, max) => typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
var number = (v, min, max) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
var text = (v) => typeof v === "string" && v.trim().length > 0 && v.length < 2e3;
var point = (p, min, max) => !!p && typeof p === "object" && "x" in p && "y" in p && number(p.x, min, max) && number(p.y, min, max);
function rows(v, min, max) {
  if (!Array.isArray(v) || v.length < min || v.length > max || v.some((p) => !p || typeof p !== "object"))
    fail("inventory");
}
function ids(values) {
  if (values.some((v) => typeof v.id !== "string" || !/^[a-z][a-z0-9-]{0,40}$/.test(v.id)) || new Set(values.map((v) => v.id)).size !== values.length)
    fail("unique ids");
}
var validators = {
  "fraction-gear": (d) => {
    if (d.kind !== "fraction-gear") return false;
    rows(d.pieces, 3, 8);
    ids(d.pieces);
    if (!int(d.slots, 8, 72) || !int(d.teeth, 8, 144) || d.teeth % d.slots !== 0 || d.pieces.some(
      (p) => !int(p.numerator, 1, 12) || !int(p.denominator, 2, 24) || p.numerator >= p.denominator || d.slots * p.numerator % p.denominator !== 0
    ))
      return false;
    const sums = /* @__PURE__ */ new Set([0]);
    for (const p of d.pieces)
      for (const n of [...sums]) sums.add(n + d.slots * p.numerator / p.denominator);
    return sums.has(d.slots);
  },
  volume: (d) => {
    if (d.kind !== "volume") return false;
    rows(d.vessels, 3, 6);
    ids(d.vessels);
    if (!int(d.capacity, 1, 1e5) || !int(d.target, 1, d.capacity) || !int(d.unitTicks, 1, 1e4) || d.targetLabel !== void 0 && !text(d.targetLabel) || !text(d.unit) || d.vessels.some((v) => !text(v.label) || !int(v.amount, 1, d.capacity) || !int(v.uses, 1, 12)))
      return false;
    let sums = /* @__PURE__ */ new Set([0]);
    for (const v of d.vessels) {
      const old = [...sums];
      for (let n = 1; n <= v.uses; n++)
        for (const s of old) if (s + n * v.amount <= d.target) sums.add(s + n * v.amount);
    }
    return sums.has(d.target);
  },
  "timing-wheels": (d) => d.kind === "timing-wheels" && Array.isArray(d.periods) && d.periods.length >= 2 && d.periods.length <= 4 && d.periods.every((p) => int(p, 2, 20)) && Array.isArray(d.phases) && d.phases.length === d.periods.length && d.phases.every((p, i) => int(p, 0, d.periods[i] - 1)) && int(d.maxSteps, 1, 240) && typeof d.firstAlignment === "boolean" && firstAlignment(d.periods, d.phases, d.maxSteps) > 0,
  coordinate: (d) => {
    if (d.kind !== "coordinate" || !int(d.min, -10, 0) || !int(d.max, 4, 12) || d.max - d.min > 20 || !d.goal || typeof d.goal !== "object")
      return false;
    const g = d.goal;
    if (g.mode === "point") {
      if (!point(g.point, d.min, d.max)) return false;
    } else if (g.mode === "transform") {
      if (!point(g.start, d.min, d.max) || !point(g.shift, -20, 20) || !number(g.scale, -3, 3))
        return false;
    } else if (g.mode === "intersection") {
      if (!Array.isArray(g.lines) || g.lines.length !== 2 || g.lines.some(
        (l) => !l || ![l.a, l.b, l.c].every((n) => int(n, -50, 50)) || l.a === 0 && l.b === 0
      ))
        return false;
    } else return false;
    const target = coordinateTarget(d);
    return int(target.x, d.min, d.max) && int(target.y, d.min, d.max);
  },
  reflection: (d) => {
    if (d.kind !== "reflection") return false;
    rows(d.mirrors, 1, 3);
    ids(d.mirrors);
    if (!point(d.emitter, 0.1, 9.9) || d.emitter.y >= 8 || !point(d.receiver, 0.1, 9.9) || d.receiver.y >= 8 || !number(d.radius, 0.1, 0.5) || !int(d.direction, 0, 359) || !int(d.bounceLimit, 1, 8) || !Array.isArray(d.obstacles) || d.obstacles.length > 8 || d.obstacles.some((s) => !s || !point(s.a, 0, 10) || !point(s.b, 0, 10)) || d.mirrors.some(
      (m) => !point(m.center, 0.5, 9.5) || m.center.y > 7.5 || !number(m.length, 0.5, 2) || ![15, 30, 45].includes(m.step) || !int(m.start, 0, 179) || m.start % m.step !== 0
    ))
      return false;
    const angles = [];
    let possible = false;
    const search = (i) => {
      if (possible) return;
      if (i === d.mirrors.length) {
        possible = traceBeam(d, angles).hit;
        return;
      }
      for (let a = 0; a < 180; a += d.mirrors[i].step) {
        angles[i] = a;
        search(i + 1);
      }
    };
    search(0);
    return possible;
  },
  mixing: (d) => {
    if (d.kind !== "mixing") return false;
    rows(d.ingredients, 2, 3);
    ids(d.ingredients);
    if (!int(d.capacity, 1, 1e5) || !int(d.unitTicks, 1, 1e4) || !text(d.unit) || d.total !== void 0 && !int(d.total, 1, d.capacity) || d.ingredients.some(
      (i) => !text(i.label) || !/^#[0-9a-f]{6}$/i.test(i.color) || !int(i.parts, 1, 20) || !int(i.measure, 1, d.capacity) || !int(i.supply, i.measure, 1e5) || i.supply / i.measure > 100
    ))
      return false;
    const first = d.ingredients[0];
    for (let n = 1; n <= first.supply / first.measure; n++) {
      const unit = n * first.measure / first.parts, amounts = d.ingredients.map((i) => unit * i.parts);
      if (amounts.every(
        (v, i) => Number.isInteger(v / d.ingredients[i].measure) && v <= d.ingredients[i].supply
      ) && amounts.reduce((s, v) => s + v, 0) <= d.capacity && (d.total === void 0 || amounts.reduce((s, v) => s + v, 0) === d.total))
        return true;
    }
    return false;
  },
  cable: (d) => {
    if (d.kind !== "cable" || !["route", "diagonal"].includes(d.mode) || !text(d.unit) || !number(d.scale, 0.1, 100))
      return false;
    rows(d.route, 2, 4);
    rows(d.cables, 3, 6);
    ids(d.cables);
    if (d.route.some((p) => !point(p, 0, 20)) || d.cables.some((c) => !text(c.label) || !number(c.length, 0.1, 1e3)) || d.mode === "diagonal" && d.route.length !== 2)
      return false;
    if (d.mode === "route" && d.route.slice(1).some((p, i) => p.x !== d.route[i].x && p.y !== d.route[i].y))
      return false;
    const length = cableLength(d);
    return length > 0 && d.cables.some((c) => Math.abs(c.length * c.length - length * length) < 1e-8);
  }
};
function validateMachine(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail("definition");
  const d = value;
  if (!text(d.title) || typeof d.backdrop !== "string" || !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(d.backdrop))
    fail("art/title");
  rows(d.stages, 1, 3);
  if (d.presentation !== void 0 && (d.presentation?.kind !== "bridge-cage" || !int(d.presentation.rabbits, 1, 6) || d.stages.length !== 2 || d.stages[0].kind !== "coordinate" || d.stages[1].kind !== "cable"))
    fail("bridge-cage presentation");
  ids(d.stages);
  for (const s of d.stages) {
    if (!Object.hasOwn(machineRules, s.kind)) fail("capability");
    for (const key of ["title", "instruction", "hint", "success"])
      if (!text(s[key])) fail(`stage.${key}`);
    if (!validators[s.kind](s)) fail(`${s.kind} configuration or reachability`);
    if (s.kind === "reflection" && s.presentation !== void 0 && (s.presentation?.kind !== "optics-cage" || !int(s.presentation.owls, 1, 2) || d.stages.length !== 1))
      fail("optics-cage presentation");
    if (s.kind === "fraction-gear" && s.presentation !== void 0 && (s.presentation?.kind !== "fraction-cage" || !int(s.presentation.rabbits, 1, 6) || d.stages.length !== 1))
      fail("fraction-cage presentation");
    if (s.kind === "timing-wheels" && s.presentation !== void 0) {
      const p = s.presentation, a = p?.animal;
      if (p?.kind !== "timing-cage" || !a || ![a.label, a.idle, a.walk, a.run].every(text) || !/^\/projects\/[a-zA-Z0-9/_-]+\.glb$/.test(a.model) || !/^\/projects\/[a-zA-Z0-9/_-]+\.html$/.test(a.credits) || d.stages.length !== 1)
        fail("timing-cage presentation");
    }
  }
}

// src/app/templates/heist/escape/domain/expedition.validation.ts
function validateExpeditionWorld(value, mission) {
  const fail3 = (path) => {
    throw new Error(`INVALID_HEIST_EXPEDITION: ${path}`);
  };
  const object = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : fail3("object required");
  const number2 = (v, min, max) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : fail3("numeric bounds");
  const array = (v, min, max) => Array.isArray(v) && v.length >= min && v.length <= max ? v : fail3("array bounds");
  const world = object(value), width = number2(world["width"], 600, 4096), height = number2(world["height"], 400, 4096);
  const point2 = (v) => {
    const p = object(v);
    number2(p["x"], 16, width - 16);
    number2(p["y"], 16, height - 16);
  };
  number2(world["speed"], 40, 400);
  number2(world["pathRadius"], 15, 100);
  number2(world["interactionRadius"], 20, 130);
  point2(world["spawn"]);
  for (const key of ["characters", "animalAtlas", "mechanismAtlas", ...world["boat"] !== void 0 ? ["boat"] : []])
    if (typeof world[key] !== "string" || !/^\/projects\/[a-zA-Z0-9/_-]+\.(webp|png)$/.test(world[key]))
      fail3(`asset ${key}`);
  const nodes = array(world["nodes"], 2, 80).map(object), ids2 = new Set(nodes.map((n) => n["id"]));
  if (ids2.size !== nodes.length || nodes.some((n) => typeof n["id"] !== "string" || !/^[a-z][a-z0-9-]{0,60}$/.test(n["id"])))
    fail3("unique node IDs");
  nodes.forEach(point2);
  for (const edge of array(world["paths"], 1, 120)) {
    const pair = array(edge, 2, 2);
    if (!pair.every((n) => ids2.has(n)) || pair[0] === pair[1]) fail3("path references");
  }
  if (world["pathLocks"] !== void 0)
    for (const value2 of array(world["pathLocks"], 1, 40)) {
      const lock = object(value2);
      if (!mission.steps.some((step) => step.id === lock["stepId"])) fail3("lock step reference");
      for (const edge of array(lock["paths"], 1, 120)) {
        const [a, b] = array(edge, 2, 2);
        if (!world["paths"].some(([x, y]) => x === a && y === b || x === b && y === a)) fail3("locked path reference");
      }
    }
  const animalRows = object(world["animalRows"]);
  for (const animal of mission.animals)
    if (!Number.isInteger(number2(animalRows[animal.id], 0, 2))) fail3("animal atlas row");
  if (world["animalFrames"] !== void 0)
    for (const frame of array(world["animalFrames"], 12, 12)) {
      const values = array(frame, 4, 4).map((v) => number2(v, 0, 1));
      if (values[2] <= 0 || values[3] <= 0 || values[0] + values[2] > 1.00001 || values[1] + values[3] > 1.00001)
        fail3("animal frame bounds");
    }
  for (const key of ["lanterns", "water", "patrol"]) array(world[key], 1, 40).forEach(point2);
  const definition = value;
  const navigation = new ExpeditionNavigation(definition);
  if (!navigation.walkable(definition.spawn)) fail3("spawn is outside navigation");
  const solved = /* @__PURE__ */ new Set();
  for (const step of mission.steps) {
    const position = { x: step.x / 100 * width, y: step.y / 100 * height };
    if (!navigation.navigate(position)) fail3(`unreachable mechanism: ${step.id}`);
    navigation.position = position;
    solved.add(step.id);
    navigation.setSolved(solved);
  }
}

// src/app/templates/heist/escape/domain/escape.validation.ts
var fail2 = (path) => {
  throw new Error(`INVALID_HEIST_ESCAPE: ${path}`);
};
var obj = (v, path) => v && typeof v === "object" && !Array.isArray(v) ? v : fail2(path);
var str = (v, path) => typeof v === "string" && v.trim().length > 0 && v.length <= 3e3 ? v : fail2(path);
var num = (v, path, min = 0, max = 1e4) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : fail2(path);
var integer = (v, path, min = 0, max = 1e4) => Number.isInteger(num(v, path, min, max)) ? v : fail2(path);
var list = (v, path, min = 1, max = 20) => Array.isArray(v) && v.length >= min && v.length <= max ? v : fail2(path);
var asset = (v, path) => {
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(svg|webp|png)$/.test(str(v, path))) fail2(path);
};
var rows2 = (v, path) => {
  const result = list(v, path).map((r) => obj(r, path));
  const ids2 = result.map((r) => str(r["id"], `${path}.id`));
  if (ids2.some((id) => !/^[a-z][a-z0-9-]{0,60}$/.test(id)) || new Set(ids2).size !== ids2.length)
    fail2(`${path}: invalid or duplicate IDs`);
  return result;
};
function requireEscapeMission(value) {
  const m = obj(value, "mission"), template = obj(m["template"], "template");
  if (!["1.2", "1.3"].includes(String(m["schemaVersion"])) || m["experience"] !== "escape" || template["id"] !== "heist" || template["version"] !== "1.0")
    fail2("unsupported schema/template");
  for (const key of [
    "projectId",
    "projectVersion",
    "title",
    "subtitle",
    "briefing",
    "introductionTitle",
    "mapTitle",
    "setting",
    "finale"
  ])
    str(m[key], key);
  asset(m["environment"], "environment");
  const animals = rows2(m["animals"], "animals"), animalIds = new Set(animals.map((a) => a["id"]));
  for (const a of animals) {
    str(a["name"], "animal.name");
    str(a["pen"], "animal.pen");
    integer(a["count"], "animal.count", 1, 12);
    asset(a["image"], "animal.image");
  }
  const released = /* @__PURE__ */ new Set();
  for (const s of rows2(m["steps"], "steps")) {
    for (const key of ["title", "place", "story", "action", "success", "explanation", "icon"])
      str(s[key], `step.${key}`);
    num(s["x"], "step.x", 5, 95);
    num(s["y"], "step.y", 5, 95);
    for (const c of list(s["clues"], "clues", 1, 6).map((c2) => obj(c2, "clue"))) {
      str(c["label"], "clue.label");
      str(c["value"], "clue.value");
    }
    for (const id of list(s["release"], "release", 0)) {
      if (!animalIds.has(id) || released.has(id)) fail2("release: missing or duplicate animal");
      released.add(id);
    }
    const p = obj(s["puzzle"], "puzzle"), type = str(p["type"], "puzzle.type");
    if (!Object.hasOwn(escapePuzzleEvaluators, type))
      throw new Error(`CAPABILITY_NOT_INSTALLED: heist.escape.${type}`);
    for (const key of ["prompt", "hint", "skill"]) str(p[key], `puzzle.${key}`);
    if (type === "machine-lock") {
      if (m["world"] === void 0) fail2("machine-lock requires expedition presentation");
      validateMachine(p["lock"]);
    }
    if (type === "gear-lock") {
      if (m["world"] === void 0) fail2("gear-lock requires expedition presentation");
      validateGearLock(p["lock"]);
    }
    if (type === "balance-lock") {
      if (m["world"] === void 0) fail2("balance-lock requires expedition presentation");
      validateBalanceLock(p["lock"]);
    }
    if (type === "number") {
      const max = num(p["max"], "number.max", 1);
      num(p["answer"], "number.answer", 0, max);
      str(p["unit"], "number.unit");
      if (p["visual"] !== void 0) {
        const visual = obj(p["visual"], "number.visual");
        if (!["groups", "length", "fraction", "capacity"].includes(String(visual["kind"])))
          fail2("number.visual.kind");
        integer(visual["count"], "number.visual.count", 1, 30);
        integer(visual["amount"], "number.visual.amount", 1, 1e3);
      }
    }
    if (type === "code") {
      if (p["countAnimals"] !== void 0 && typeof p["countAnimals"] !== "boolean")
        fail2("code.countAnimals");
      const answer = str(p["answer"], "code.answer");
      if (!/^\d{2,6}$/.test(answer)) fail2("code.answer");
      const labels = list(p["labels"], "code.labels", answer.length, answer.length);
      labels.forEach((l) => str(l, "code.label"));
    }
    if (type === "timing") {
      const cycle = integer(p["cycle"], "timing.cycle", 10, 120);
      const start = integer(p["safeStart"], "timing.safeStart", 0, cycle - 1);
      const end = integer(p["safeEnd"], "timing.safeEnd", start + 1, cycle);
      integer(p["crossing"], "timing.crossing", 1, end - start);
    }
    if (type === "balance") {
      const target = integer(p["target"], "balance.target", 1, 100);
      const weights = list(p["weights"], "balance.weights", 2, 10).map(
        (w) => integer(w, "weight", 1, 100)
      );
      const totals = weights.reduce(
        (sums, w) => /* @__PURE__ */ new Set([...sums, ...[...sums].map((n) => n + w)]),
        /* @__PURE__ */ new Set([0])
      );
      if (!totals.has(target)) fail2("balance has no solution");
    }
  }
  if (released.size !== animalIds.size) fail2("all animals must have a reachable release step");
  if (m["world"] !== void 0) validateExpeditionWorld(m["world"], value);
  if (m["mathGrades"] !== void 0) {
    const grades = list(m["mathGrades"], "mathGrades", 1, 4).map((g) => integer(g, "grade", 5, 8));
    if (new Set(grades).size !== grades.length || !grades.includes(5)) fail2("mathGrades");
    const steps = rows2(m["steps"], "steps");
    for (const step of steps)
      if (step["gradePuzzles"] !== void 0) {
        const variants = obj(step["gradePuzzles"], "gradePuzzles");
        if (Object.keys(variants).some((k) => !/^[5-8]$/.test(k) || !grades.includes(Number(k))))
          fail2("gradePuzzles grade");
      }
    for (const grade of grades)
      requireEscapeMission(__spreadProps(__spreadValues({}, m), {
        mathGrades: void 0,
        steps: steps.map((step) => {
          const variants = step["gradePuzzles"];
          return __spreadProps(__spreadValues({}, step), {
            gradePuzzles: void 0,
            puzzle: variants?.[String(grade)] ?? step["puzzle"]
          });
        })
      }));
  } else if (rows2(m["steps"], "steps").some((s) => s["gradePuzzles"] !== void 0))
    fail2("gradePuzzles requires mathGrades");
  if (m["previewWeeks"] !== void 0) {
    if (!m["world"]) fail2("previewWeeks requires expedition presentation");
    validatePreviewWeeks(m["previewWeeks"], value.steps);
  }
  return structuredClone(value);
}
export {
  requireEscapeMission
};
//# debugId=57f3869f-2d07-5c7e-8030-c773f0e32273
//# sourceMappingURL=chunk-BSYUIFJ7.js.map
