import {
  validateBroadcast
} from "./chunk-IIEET437.js";
import {
  Injectable,
  InjectionToken,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/domain/competition.validation.ts
function requireValid(condition, message) {
  if (!condition) throw new Error(`INVALID_COMPETITION: ${message}`);
}
function validateTeams(teams) {
  requireValid(Array.isArray(teams) && teams.length >= 2 && teams.length <= 16, "Use 2\u201316 teams.");
  requireValid(teams.every((t) => t && typeof t.id === "string" && /^[a-z0-9][a-z0-9-]*$/.test(t.id) && typeof t.name === "string" && t.name.trim().length > 0 && t.name.length <= 60 && Number.isFinite(t.qualificationPoints) && t.qualificationPoints >= 0), "Check team names and qualification points.");
  requireValid(new Set(teams.map((t) => t.id)).size === teams.length, "Team IDs must be unique.");
}
function validateMode(mode) {
  requireValid(["tournament", "game-show", "hybrid"].includes(mode), "Choose a supported final format.");
}
function requireCompetitionConfig(value) {
  const c = value;
  requireValid(c && c.schemaVersion === "1.0" && c.template?.id === "competition-show" && c.template.version === "1.0", "Unsupported competition package version.");
  requireValid(typeof c.projectId === "string" && c.projectId.length > 0 && typeof c.projectVersion === "string" && typeof c.title === "string" && typeof c.description === "string", "Project identity and title are required.");
  validateTeams(c.teams);
  validateMode(c.defaultMode);
  if (c.broadcast !== void 0) validateBroadcast(c.broadcast);
  requireValid(Array.isArray(c.rounds) && c.rounds.length > 0 && c.rounds.length <= 20, "Provide 1\u201320 championship rounds.");
  requireValid(
    c.rounds.every((r) => r && typeof r.id === "string" && r.id.length > 0 && typeof r.title === "string" && typeof r.prompt === "string" && r.prompt.trim().length > 0 && ["simultaneous", "buzzer", "wager"].includes(r.kind) && Number.isInteger(r.seconds) && r.seconds >= 10 && r.seconds <= 3600 && Number.isInteger(r.maxPoints) && r.maxPoints > 0 && r.maxPoints <= 1e4 && Array.isArray(r.standards) && r.standards.length > 0 && r.standards.every((s) => typeof s === "string" && s.trim().length > 0)),
    "Each round needs a supported type, prompt, timer, point limit, and standards."
  );
  requireValid(new Set(c.rounds.map((r) => r.id)).size === c.rounds.length, "Round IDs must be unique.");
  return c;
}

// src/app/templates/competition-show/runtime/competition.persistence.ts
var COMPETITION_PERSISTENCE = new InjectionToken("Competition persistence");
var BrowserCompetitionPersistence = class {
  constructor(session, fingerprint) {
    this.fingerprint = fingerprint;
    this.key = "forge:competition:1:" + JSON.stringify([
      session.tenantId,
      session.classId,
      session.projectId,
      session.projectVersion,
      session.actorId,
      session.attemptId
    ]);
  }
  fingerprint;
  key;
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw) return [];
    const saved = JSON.parse(raw);
    if (!saved || saved.fingerprint !== this.fingerprint || !Array.isArray(saved.events) || saved.events.length > 2e3)
      throw new Error("SAVED_COMPETITION_INVALID: Saved rehearsal does not match this package.");
    return saved.events;
  }
  append(request, expectedRevision) {
    const events = this.load();
    if (events.some((e) => e.id === request.id)) return;
    if (events.length !== expectedRevision) throw new Error("STATE_CONFLICT: This rehearsal changed in another tab. Reload to continue.");
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, events: [...events, request] }));
  }
};

// src/app/templates/competition-show/domain/competition-bracket.ts
function seedTeams(teams) {
  return [...teams].sort((a, b) => b.qualificationPoints - a.qualificationPoints || a.id.localeCompare(b.id));
}
function createBracket(teams, hybrid) {
  const seeded = seedTeams(teams);
  const size = 2 ** Math.ceil(Math.log2(teams.length));
  let order = [1, 2];
  for (let n = 4; n <= size; n *= 2) order = order.flatMap((seed) => [seed, n + 1 - seed]);
  const rounds = hybrid ? Math.max(0, Math.log2(size) - 2) : Math.log2(size);
  const matches = [];
  for (let round = 0; round < rounds; round++) {
    for (let position = 0; position < size / 2 ** (round + 1); position++) {
      matches.push({
        id: `r${round + 1}-m${position + 1}`,
        round,
        position,
        teamIds: round === 0 ? order.slice(position * 2, position * 2 + 2).flatMap((seed) => seeded[seed - 1] ? [seeded[seed - 1].id] : []) : [],
        sources: round === 0 ? [] : [`r${round}-m${position * 2 + 1}`, `r${round}-m${position * 2 + 2}`],
        status: "waiting",
        winnerId: null,
        scores: {},
        bye: false
      });
    }
  }
  advanceBracket(matches);
  return matches;
}
function advanceBracket(matches) {
  for (const match of matches) {
    if (match.status !== "waiting") continue;
    if (match.sources.length) {
      const sources = match.sources.map((id) => matches.find((m) => m.id === id));
      if (sources.some((source) => source.status !== "complete")) continue;
      match.teamIds = sources.flatMap((source) => source.winnerId ? [source.winnerId] : []);
    }
    if (match.teamIds.length <= 1) {
      match.status = "complete";
      match.bye = true;
      match.winnerId = match.teamIds[0] ?? null;
    } else match.status = "ready";
  }
}

// src/app/templates/competition-show/domain/competition-engine.ts
function createCompetition(config) {
  requireCompetitionConfig(config);
  return {
    revision: 0,
    appliedIds: [],
    mode: config.defaultMode,
    teams: structuredClone(config.teams),
    phase: "setup",
    matches: [],
    contestId: null,
    participants: [],
    roundIndex: 0,
    scores: {},
    responses: [],
    wagers: {},
    buzzes: [],
    deadline: null,
    remainingSeconds: 0,
    evidence: [],
    championId: null,
    finalists: [],
    results: []
  };
}
function phase(s, ...allowed) {
  requireValid(allowed.includes(s.phase), "That control is not available at this point in the show.");
}
function participant(s, id) {
  requireValid(s.participants.includes(id), "Team is not in this contest.");
}
function prepareRound(s, config) {
  s.phase = "ready";
  s.responses = [];
  s.wagers = {};
  s.buzzes = [];
  s.deadline = null;
  s.remainingSeconds = config.rounds[s.roundIndex].seconds;
}
function lock(s) {
  s.phase = "locked";
  s.deadline = null;
  s.remainingSeconds = 0;
}
function finalTeams(s) {
  if (s.mode === "game-show" || s.matches.length === 0) return seedTeams(s.teams).map((t) => t.id);
  if (s.matches.some((m) => m.status !== "complete")) return [];
  const last = Math.max(...s.matches.map((m) => m.round));
  return s.matches.filter((m) => m.round === last).flatMap((m) => m.winnerId ? [m.winnerId] : []);
}
function leaders(s) {
  const high = Math.max(...s.participants.map((id) => s.scores[id]));
  return s.participants.filter((id) => s.scores[id] === high);
}
var handlers = {
  configure(s, c) {
    if (c.type !== "configure") return;
    phase(s, "setup");
    validateMode(c.mode);
    validateTeams(c.teams);
    s.mode = c.mode;
    s.teams = structuredClone(c.teams);
  },
  seed(s) {
    phase(s, "setup");
    s.teams = seedTeams(s.teams);
    s.matches = s.mode === "game-show" ? [] : createBracket(s.teams, s.mode === "hybrid");
    s.phase = "bracket";
  },
  start(s, c, config) {
    if (c.type !== "start") return;
    phase(s, "bracket");
    if (c.matchId) {
      const match = s.matches.find((m) => m.id === c.matchId);
      requireValid(match?.status === "ready", "Match is not ready.");
      match.status = "live";
      s.contestId = match.id;
      s.participants = [...match.teamIds];
    } else {
      requireValid(s.mode !== "tournament", "Select the next bracket match.");
      const finalists = finalTeams(s);
      requireValid(finalists.length >= 2, "Finish the bracket before the final show.");
      s.finalists = finalists;
      s.participants = [...finalists];
      s.contestId = "championship-show";
    }
    s.scores = Object.fromEntries(s.participants.map((id) => [id, 0]));
    s.roundIndex = 0;
    prepareRound(s, config);
  },
  wager(s, c, config) {
    if (c.type !== "wager") return;
    phase(s, "ready");
    participant(s, c.teamId);
    requireValid(config.rounds[s.roundIndex].kind === "wager", "This is not a wager round.");
    requireValid(s.wagers[c.teamId] === void 0, "Wager is already locked.");
    requireValid(Number.isInteger(c.points) && c.points >= 0 && c.points <= s.scores[c.teamId], "Wager must be between zero and the team score.");
    s.wagers[c.teamId] = c.points;
  },
  open(s, _c, config, request) {
    phase(s, "ready");
    requireValid(config.rounds[s.roundIndex].kind !== "wager" || s.participants.every((id) => s.wagers[id] !== void 0), "Lock every team wager first.");
    s.phase = "open";
    s.deadline = request.at + s.remainingSeconds * 1e3;
  },
  pause(s, _c, _config, request) {
    phase(s, "open");
    requireValid(s.deadline !== null && request.at < s.deadline, "Answer time has ended. Lock the round.");
    s.remainingSeconds = Math.ceil((s.deadline - request.at) / 1e3);
    s.deadline = null;
    s.phase = "paused";
  },
  resume(s, _c, _config, request) {
    phase(s, "paused");
    s.phase = "open";
    s.deadline = request.at + s.remainingSeconds * 1e3;
  },
  lock(s) {
    phase(s, "open", "paused");
    lock(s);
  },
  buzz(s, c, config, request) {
    if (c.type !== "buzz") return;
    phase(s, "open");
    participant(s, c.teamId);
    requireValid(s.deadline !== null && request.at < s.deadline, "Answer time has ended.");
    requireValid(config.rounds[s.roundIndex].kind === "buzzer" && !s.buzzes.includes(c.teamId), "Buzz is unavailable.");
    s.buzzes.push(c.teamId);
  },
  answer(s, c, config, request) {
    if (c.type !== "answer") return;
    phase(s, "open");
    participant(s, c.teamId);
    requireValid(s.deadline !== null && request.at < s.deadline, "Answer time has ended.");
    requireValid(!s.responses.some((r) => r.teamId === c.teamId), "This answer is already locked.");
    requireValid(typeof c.text === "string" && c.text.trim().length > 0 && c.text.length <= 6e3, "Enter a response of 1\u20136,000 characters.");
    const round = config.rounds[s.roundIndex];
    requireValid(round.kind !== "buzzer" || s.buzzes[0] === c.teamId, "The first team to buzz answers.");
    s.responses.push({ teamId: c.teamId, text: c.text.trim(), points: null });
    s.evidence.push({
      id: request.id,
      projectId: config.projectId,
      projectVersion: config.projectVersion,
      contestId: s.contestId,
      roundId: round.id,
      teamId: c.teamId,
      prompt: round.prompt,
      response: c.text.trim(),
      standards: [...round.standards],
      timestamp: request.at
    });
  },
  score(s, c, config) {
    if (c.type !== "score") return;
    phase(s, "locked");
    participant(s, c.teamId);
    const response = s.responses.find((r) => r.teamId === c.teamId);
    requireValid(response, "Only a submitted response can be scored.");
    const round = config.rounds[s.roundIndex];
    requireValid(Number.isInteger(c.points) && (round.kind === "wager" ? Math.abs(c.points) === s.wagers[c.teamId] : c.points >= 0 && c.points <= round.maxPoints), "Points are outside this round\u2019s rules.");
    response.points = c.points;
  },
  reveal(s, _c, config) {
    phase(s, "locked");
    requireValid(s.responses.every((r) => r.points !== null), "Score each submitted response before revealing.");
    for (const id of s.participants) {
      const response = s.responses.find((r) => r.teamId === id);
      s.scores[id] += response?.points ?? (config.rounds[s.roundIndex].kind === "wager" ? -(s.wagers[id] ?? 0) : 0);
    }
    s.phase = "revealed";
  },
  next(s, _c, config) {
    phase(s, "revealed");
    if (s.roundIndex + 1 === config.rounds.length) s.phase = "results";
    else {
      s.roundIndex++;
      prepareRound(s, config);
    }
  },
  finish(s, c) {
    if (c.type !== "finish") return;
    phase(s, "results");
    const tied = leaders(s);
    requireValid(tied.includes(c.winnerId), "The winner must have the highest score.");
    requireValid(typeof c.reason === "string" && (tied.length === 1 || c.reason.trim().length >= 5), "Record how the tiebreak was decided.");
    s.results.push({ contestId: s.contestId, scores: __spreadValues({}, s.scores), winnerId: c.winnerId, reason: c.reason.trim() });
    if (s.contestId === "championship-show") {
      s.championId = c.winnerId;
      s.phase = "champion";
      return;
    }
    const match = s.matches.find((m) => m.id === s.contestId);
    match.status = "complete";
    match.winnerId = c.winnerId;
    match.scores = __spreadValues({}, s.scores);
    advanceBracket(s.matches);
    if (s.mode === "tournament" && s.matches.every((m) => m.status === "complete")) {
      s.championId = c.winnerId;
      s.phase = "champion";
    } else s.phase = "bracket";
  }
};
function applyCompetitionRequest(config, state, request) {
  requireValid(request && typeof request.id === "string" && request.id.length > 0 && Number.isFinite(request.at), "Invalid request envelope.");
  if (state.appliedIds.includes(request.id)) return state;
  requireValid(state.revision < 2e3, "This rehearsal has reached its event limit. Export the record before starting another attempt.");
  const handler = request.command && Object.hasOwn(handlers, request.command.type) ? handlers[request.command.type] : void 0;
  requireValid(handler, "Unsupported competition command.");
  const next = structuredClone(state);
  handler(next, request.command, config, request);
  next.revision++;
  next.appliedIds.push(request.id);
  return next;
}

// src/app/templates/competition-show/runtime/competition-runtime.service.ts
var COMPETITION_CONFIG = new InjectionToken("Competition configuration");
var CompetitionRuntimeService = class _CompetitionRuntimeService {
  config = inject(COMPETITION_CONFIG);
  persistence = inject(COMPETITION_PERSISTENCE);
  state = signal(
    createCompetition(this.config),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    "",
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  blocked = signal(
    false,
    ...ngDevMode ? [{ debugName: "blocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  now = signal(
    Date.now(),
    ...ngDevMode ? [{ debugName: "now" }] : (
      /* istanbul ignore next */
      []
    )
  );
  round = computed(
    () => this.config.rounds[this.state().roundIndex],
    ...ngDevMode ? [{ debugName: "round" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalists = computed(
    () => finalTeams(this.state()),
    ...ngDevMode ? [{ debugName: "finalists" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leaders = computed(
    () => leaders(this.state()),
    ...ngDevMode ? [{ debugName: "leaders" }] : (
      /* istanbul ignore next */
      []
    )
  );
  seconds = computed(
    () => this.state().deadline === null ? this.state().remainingSeconds : Math.max(0, Math.ceil((this.state().deadline - this.now()) / 1e3)),
    ...ngDevMode ? [{ debugName: "seconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ranking = computed(
    () => [...this.state().participants].sort((a, b) => this.state().scores[b] - this.state().scores[a] || a.localeCompare(b)),
    ...ngDevMode ? [{ debugName: "ranking" }] : (
      /* istanbul ignore next */
      []
    )
  );
  interval;
  constructor() {
    try {
      let restored = this.state();
      for (const request of this.persistence.load())
        restored = applyCompetitionRequest(this.config, restored, request);
      this.state.set(restored);
    } catch (error) {
      this.fail(error);
      this.blocked.set(true);
    }
    this.interval = setInterval(() => {
      this.now.set(Date.now());
      if (!this.blocked() && this.state().phase === "open" && this.seconds() === 0)
        this.command({ type: "lock" });
    }, 250);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  command(command) {
    if (this.blocked())
      return false;
    try {
      const request = { id: crypto.randomUUID(), at: Date.now(), command };
      const previous = this.state();
      const next = applyCompetitionRequest(this.config, previous, request);
      try {
        this.persistence.append(request, previous.revision);
      } catch (error) {
        this.blocked.set(true);
        throw error;
      }
      this.state.set(next);
      this.now.set(request.at);
      this.error.set("");
      return true;
    } catch (error) {
      this.fail(error);
      return false;
    }
  }
  name(id) {
    return this.state().teams.find((t) => t.id === id)?.name ?? id;
  }
  fail(error) {
    this.error.set(error instanceof Error ? error.message : "Competition could not be saved.");
  }
  static \u0275fac = function CompetitionRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompetitionRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CompetitionRuntimeService, factory: _CompetitionRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompetitionRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  requireValid,
  requireCompetitionConfig,
  createCompetition,
  leaders,
  applyCompetitionRequest,
  COMPETITION_PERSISTENCE,
  BrowserCompetitionPersistence,
  COMPETITION_CONFIG,
  CompetitionRuntimeService
};
//# debugId=207c36ed-1bce-5493-9670-c7b31244f19d
//# sourceMappingURL=chunk-2T3THWAB.js.map
