import {
  createLeague
} from "./chunk-EMQ2ALBA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/live-strategy-league/domain/league-demo.ts
function requireLeagueDemo(value, config) {
  const demo = value;
  const scoresValid = (scores) => scores && Object.keys(scores).length === config.teams.length && config.teams.every((t) => Number.isFinite(scores[t.id]));
  if (!demo || typeof demo.openingCaption !== "string" || !Number.isInteger(demo.seconds) || demo.seconds < 1 || demo.seconds > 300 || !scoresValid(demo.openingScores) || !Array.isArray(demo.frames) || !demo.frames.length || demo.frames.some((frame, i) => !frame || !Number.isInteger(frame.at) || frame.at <= (demo.frames[i - 1]?.at ?? 0) || frame.at > demo.seconds || typeof frame.caption !== "string" || !scoresValid(frame.scores)) || demo.frames.at(-1)?.at !== demo.seconds)
    throw new Error("INVALID_LEAGUE_DEMO: Supply ordered score updates for every team ending at the demo deadline.");
  demo.frames.forEach((frame, index) => {
    const decision = frame.decision;
    if (decision === void 0) return;
    const previous = demo.frames[index - 1]?.scores ?? demo.openingScores;
    if (!decision || !config.teams.some((t) => t.id === decision.teamId) || typeof decision.question !== "string" || typeof decision.reasoning !== "string" || !Array.isArray(decision.options) || decision.options.length < 2 || decision.options.some((option) => typeof option !== "string") || !Number.isInteger(decision.selected) || decision.selected < 0 || decision.selected >= decision.options.length || !Number.isInteger(decision.units) || decision.units <= 0 || ![decision.unitPrice, decision.unitCost].every((value2) => Number.isFinite(value2) && value2 >= 0) || Math.abs(decision.units * (decision.unitPrice - decision.unitCost) - (frame.scores[decision.teamId] - previous[decision.teamId])) > 1e-3)
      throw new Error("INVALID_LEAGUE_DEMO: Each sample decision must identify a team, a choice and a trade profit matching its score update.");
  });
  return demo;
}
function leagueDemoSnapshot(config, demo, step) {
  const snapshot = createLeague(config);
  const frame = demo.frames[step - 1];
  const scores = frame?.scores ?? demo.openingScores;
  const previous = demo.frames[step - 2]?.scores ?? demo.openingScores;
  const previousOrder = [...config.teams].sort((a, b) => previous[b.id] - previous[a.id] || a.id.localeCompare(b.id));
  snapshot.round = config.rounds.length - 1;
  snapshot.phase = step === demo.frames.length ? "complete" : "decision-open";
  snapshot.revision = step;
  snapshot.teams = snapshot.teams.map((team) => __spreadProps(__spreadValues({}, team), {
    score: scores[team.id],
    delta: scores[team.id] - demo.openingScores[team.id],
    previousRank: previousOrder.findIndex((t) => t.id === team.id) + 1
  }));
  return snapshot;
}

export {
  requireLeagueDemo,
  leagueDemoSnapshot
};
//# debugId=0b360d9b-c5b8-58fe-a390-3908e5671755
//# sourceMappingURL=chunk-6ZWUSTOY.js.map
