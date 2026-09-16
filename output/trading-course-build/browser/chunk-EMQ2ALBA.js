import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/live-strategy-league/domain/league-calculations.ts
var money = (value) => Math.round(value * 100) / 100;
var market = {
  id: "market-v1",
  cost: (d, world) => money(d["production"] * world["cost"] + d["marketing"]),
  budget: (state) => state["cash"],
  validate: (c) => ["price", "production", "marketing"].every((id) => c.decisions.some((d) => d.id === id)) && ["cash", "sold", "profit"].every((id) => Number.isFinite(c.initialState[id])) && c.decisions.every((d) => d.min >= 0) && c.rounds.every((r) => r.world["demand"] > 0 && r.world["cost"] >= 0),
  calculate(state, d, world) {
    const demand = Math.max(0, world["demand"] - d["price"] * 12 + d["marketing"] / 8);
    const sold = Math.floor(Math.min(d["production"], demand));
    const profit = money(sold * d["price"] - d["production"] * world["cost"] - d["marketing"]);
    return {
      state: { cash: money(state["cash"] + profit), sold, profit },
      scoreDelta: profit,
      explanation: `${sold} sold \xD7 $${d["price"]} \u2212 ${d["production"]} produced \xD7 $${world["cost"]} \u2212 $${d["marketing"]} marketing = $${profit} profit.`
    };
  }
};
var resource = {
  id: "resource-v1",
  cost: (d) => d["water"] + d["food"] + d["shelter"],
  budget: (state) => state["reserve"],
  validate: (c) => ["water", "food", "shelter"].every((id) => c.decisions.some((d) => d.id === id)) && ["reserve", "wellbeing", "protected"].every((id) => Number.isFinite(c.initialState[id])) && c.decisions.every((d) => d.min >= 0) && c.rounds.every((r) => r.world["rainfall"] >= 0 && r.world["exposure"] >= 0),
  calculate(state, d, world) {
    const protectedCount = Math.min(100, d["shelter"] * 5);
    const wellbeing = Math.round(Math.max(0, Math.min(
      100,
      Math.min(d["water"] * world["rainfall"], d["food"]) * 4 - world["exposure"] * (1 - protectedCount / 100)
    )));
    const reserve = state["reserve"] - d["water"] - d["food"] - d["shelter"];
    return {
      state: { reserve, wellbeing, protected: protectedCount },
      scoreDelta: wellbeing,
      explanation: `Wellbeing ${wellbeing}: food and rain-adjusted water support the community; shelter reduces exposure. ${reserve} supplies remain.`
    };
  }
};
var models = new Map([market, resource].map((model) => [model.id, model]));
function requireLeagueModel(id) {
  const model = models.get(id);
  if (!model) throw new Error(`CAPABILITY_NOT_INSTALLED: Calculation model ${id}.`);
  return model;
}
function decisionCost(modelId, d, world) {
  return requireLeagueModel(modelId).cost(d, world);
}
function availableBudget(modelId, state) {
  return requireLeagueModel(modelId).budget(state);
}

// src/app/templates/live-strategy-league/domain/league-engine.ts
function requireLeagueConfig(value) {
  const c = value;
  if (!c || c.schemaVersion !== "1.0" || c.template?.id !== "live-strategy-league" || c.template.version !== "1.0" || typeof c.projectId !== "string" || typeof c.projectVersion !== "string" || typeof c.title !== "string" || typeof c.description !== "string" || typeof c.explanation !== "string" || !Array.isArray(c.teams) || c.teams.length < 2 || !Array.isArray(c.rounds) || !c.rounds.length || !Array.isArray(c.decisions) || !c.decisions.length || !Array.isArray(c.metrics) || !c.metrics.length || !c.initialState || c.teams.some((t) => !t || typeof t.id !== "string" || typeof t.name !== "string" || !/^#[0-9a-f]{6}$/i.test(t.color) || t.imageUrl !== void 0 && (typeof t.imageUrl !== "string" || !/^\/(?!\/)[a-zA-Z0-9/_\.\-]+$/.test(t.imageUrl))) || new Set(c.teams.map((t) => t.id)).size !== c.teams.length || c.decisions.some((d) => !d || !d.id || ![d.min, d.max, d.step, d.initial].every(Number.isFinite) || typeof d.label !== "string" || typeof d.unit !== "string" || d.min > d.max || d.step <= 0 || d.initial < d.min || d.initial > d.max) || new Set(c.decisions.map((d) => d.id)).size !== c.decisions.length || c.metrics.some((m) => !m || typeof m.label !== "string" || typeof m.unit !== "string" || !Number.isFinite(c.initialState[m.id])) || c.rounds.some((r) => !r || !Number.isFinite(r.seconds) || r.seconds <= 0 || typeof r.title !== "string" || typeof r.headline !== "string" || typeof r.description !== "string" || !r.world || !Object.values(r.world).every(Number.isFinite)))
    throw new Error("INVALID_LEAGUE_CONFIG: Check the project, teams, decisions, metrics, and rounds.");
  if (!requireLeagueModel(c.modelId).validate(c)) throw new Error("INVALID_LEAGUE_MODEL_CONFIG: Model inputs are missing.");
  if (c.launch && [c.launch.headline, c.launch.highlight, c.launch.invitation, c.launch.mission, c.launch.winCondition].some((value2) => typeof value2 !== "string" || !value2.trim()))
    throw new Error("INVALID_LEAGUE_CONFIG: Launch copy must contain a headline, invitation, mission and win condition.");
  const minimum = Object.fromEntries(c.decisions.map((d) => [d.id, d.min]));
  if (c.rounds.some((r) => decisionCost(c.modelId, minimum, r.world) !== 0))
    throw new Error("INVALID_LEAGUE_CONFIG: Practice models must allow a zero-cost decision for depleted teams.");
  return c;
}
function freshDecision(c) {
  return { values: Object.fromEntries(c.decisions.map((d) => [d.id, d.initial])), prediction: null, reasoning: "" };
}
function createLeague(c) {
  return {
    schemaVersion: 1,
    revision: 0,
    round: 0,
    phase: "preview",
    deadline: null,
    pausedSeconds: null,
    teams: c.teams.map((t, i) => ({
      id: t.id,
      score: 0,
      delta: 0,
      previousRank: i + 1,
      state: __spreadValues({}, c.initialState),
      decision: freshDecision(c)
    })),
    history: [],
    pending: null
  };
}
function standings(teams) {
  return [...teams].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}
function decisionError(c, s, decision, team = s.teams[0]) {
  for (const d of c.decisions) {
    const n = decision.values[d.id];
    if (!Number.isFinite(n) || n < d.min || n > d.max || Math.abs((n - d.min) / d.step - Math.round((n - d.min) / d.step)) > 1e-5)
      return `${d.label} must be ${d.min}\u2013${d.max} in steps of ${d.step}.`;
  }
  if (decision.prediction !== null && !Number.isFinite(decision.prediction)) return "Enter a valid prediction.";
  if (typeof decision.reasoning !== "string" || decision.reasoning.length > 1e3) return "Keep reasoning under 1,000 characters.";
  if (decisionCost(c.modelId, decision.values, c.rounds[s.round].world) > availableBudget(c.modelId, team.state))
    return "Your decisions exceed your available resources.";
  return null;
}
function demoDecision(c, s, team, i) {
  const decision = freshDecision(c);
  for (const [j, d] of c.decisions.entries()) {
    const fraction = 0.2 + (i * 2 + s.round * 3 + j * 5) % 7 * 0.1;
    decision.values[d.id] = d.min + Math.floor((d.max - d.min) * fraction / d.step) * d.step;
  }
  while (decisionError(c, s, decision, team)) {
    const reducible = c.decisions.filter((d) => decision.values[d.id] > d.min);
    if (!reducible.length) throw new Error("NO_FEASIBLE_DECISION: Check configured minimum costs.");
    for (const d of reducible) decision.values[d.id] = Math.max(d.min, decision.values[d.id] - d.step);
  }
  decision.reasoning = "Simulated practice team decision.";
  return decision;
}
function applyLeagueCommand(c, previous, command, now) {
  const s = structuredClone(previous);
  const assert = (condition, message = "That action is unavailable in this phase.") => {
    if (!condition) throw new Error(message);
  };
  const close = () => {
    s.teams.forEach((team, i) => {
      if (team.decision.lockedAt !== void 0) return;
      if (i > 0 || decisionError(c, s, team.decision, team)) team.decision = demoDecision(c, s, team, i);
      team.decision.lockedAt = now;
    });
    s.phase = "decision-locked";
    s.deadline = null;
    s.pausedSeconds = null;
  };
  switch (command.type) {
    case "start":
      assert(s.phase === "preview");
      s.phase = "decision-open";
      s.deadline = now + c.rounds[s.round].seconds * 1e3;
      break;
    case "draft":
    case "lock": {
      assert(s.phase === "decision-open" && s.teams[0].decision.lockedAt === void 0);
      assert(s.deadline !== null && now < s.deadline, "The timer is paused or the deadline has passed.");
      const error = decisionError(c, s, command.decision);
      assert(!error, error ?? "Invalid decision.");
      s.teams[0].decision = { values: __spreadValues({}, command.decision.values), prediction: command.decision.prediction, reasoning: command.decision.reasoning };
      if (command.type === "lock") {
        s.teams[0].decision.lockedAt = now;
        close();
      }
      break;
    }
    case "close":
      assert(s.phase === "decision-open");
      close();
      break;
    case "calculate": {
      assert(s.phase === "decision-locked");
      const model = requireLeagueModel(c.modelId);
      const rows = s.teams.map((t) => ({
        id: t.id,
        rank: 0,
        score: t.score,
        before: __spreadValues({}, t.state),
        decision: structuredClone(t.decision),
        result: model.calculate(t.state, t.decision.values, c.rounds[s.round].world)
      }));
      rows.forEach((row) => row.score = Math.round((row.score + row.result.scoreDelta) * 100) / 100);
      rows.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
      rows.forEach((row, i) => row.rank = i + 1);
      s.pending = { round: s.round, calculatedAt: now, teams: rows };
      s.phase = "revealing";
      break;
    }
    case "reveal":
      assert(s.phase === "revealing" && s.pending !== null);
      s.teams.forEach((t) => {
        const result = s.pending.teams.find((row) => row.id === t.id);
        t.previousRank = standings(previous.teams).findIndex((row) => row.id === t.id) + 1;
        t.score = result.score;
        t.delta = result.result.scoreDelta;
        t.state = __spreadValues({}, result.result.state);
      });
      s.history.push(s.pending);
      s.pending = null;
      s.phase = s.round === c.rounds.length - 1 ? "complete" : "results";
      break;
    case "next":
      assert(s.phase === "results");
      s.round++;
      s.phase = "preview";
      s.teams.forEach((t) => t.decision = { values: __spreadValues({}, t.decision.values), reasoning: "", prediction: null });
      break;
    case "restart":
      assert(s.phase === "complete");
      return __spreadProps(__spreadValues({}, createLeague(c)), { revision: s.revision + 1 });
    case "pause":
      assert(s.phase === "decision-open" && s.deadline !== null);
      s.pausedSeconds = Math.max(0, Math.ceil((s.deadline - now) / 1e3));
      s.deadline = null;
      break;
    case "resume":
      assert(s.phase === "decision-open" && s.pausedSeconds !== null);
      s.deadline = now + s.pausedSeconds * 1e3;
      s.pausedSeconds = null;
      break;
    case "extend":
      assert(s.phase === "decision-open");
      if (s.deadline !== null) s.deadline += 6e4;
      else s.pausedSeconds = (s.pausedSeconds ?? 0) + 60;
      break;
  }
  s.revision++;
  return s;
}

export {
  decisionCost,
  availableBudget,
  requireLeagueConfig,
  createLeague,
  standings,
  decisionError,
  applyLeagueCommand
};
//# debugId=53506c18-797f-547e-9129-bc3daa02bcff
//# sourceMappingURL=chunk-EMQ2ALBA.js.map
