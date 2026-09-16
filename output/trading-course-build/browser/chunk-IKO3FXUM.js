import {
  applyLeagueCommand,
  availableBudget,
  createLeague,
  decisionCost,
  decisionError,
  standings
} from "./chunk-EMQ2ALBA.js";
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
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/live-strategy-league/runtime/league.persistence.ts
var LEAGUE_PERSISTENCE = new InjectionToken("League practice persistence");
var BrowserLeaguePersistence = class {
  key;
  constructor(session) {
    this.key = "forge:league:1:" + JSON.stringify([
      session.tenantId,
      session.classId,
      session.projectId,
      session.projectVersion,
      session.actorId,
      session.attemptId
    ]);
  }
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state.schemaVersion !== 1 || !Number.isInteger(state.revision) || !Array.isArray(state.teams) || !Array.isArray(state.history))
      throw new Error("Saved practice could not be read.");
    return state;
  }
  save(snapshot, expectedRevision) {
    const current = this.load();
    if (current && current.revision !== expectedRevision)
      throw new Error("Practice changed in another tab. Reload to continue.");
    localStorage.setItem(this.key, JSON.stringify(snapshot));
  }
};

// src/app/templates/live-strategy-league/runtime/league-runtime.service.ts
var LEAGUE_CONFIG = new InjectionToken("League configuration");
var LeagueRuntimeService = class _LeagueRuntimeService {
  config = inject(LEAGUE_CONFIG);
  persistence = inject(LEAGUE_PERSISTENCE);
  state = signal(
    createLeague(this.config),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = signal(
    structuredClone(this.state().teams[0].decision),
    ...ngDevMode ? [{ debugName: "draft" }] : (
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
    () => this.config.rounds[this.state().round],
    ...ngDevMode ? [{ debugName: "round" }] : (
      /* istanbul ignore next */
      []
    )
  );
  team = computed(
    () => this.state().teams[0],
    ...ngDevMode ? [{ debugName: "team" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ranking = computed(
    () => standings(this.state().teams),
    ...ngDevMode ? [{ debugName: "ranking" }] : (
      /* istanbul ignore next */
      []
    )
  );
  validation = computed(
    () => decisionError(this.config, this.state(), this.draft()),
    ...ngDevMode ? [{ debugName: "validation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cost = computed(
    () => decisionCost(this.config.modelId, this.draft().values, this.round().world),
    ...ngDevMode ? [{ debugName: "cost" }] : (
      /* istanbul ignore next */
      []
    )
  );
  budget = computed(
    () => availableBudget(this.config.modelId, this.team().state),
    ...ngDevMode ? [{ debugName: "budget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editable = computed(
    () => this.state().phase === "decision-open" && this.team().decision.lockedAt === void 0 && this.state().deadline !== null && !this.blocked(),
    ...ngDevMode ? [{ debugName: "editable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  seconds = computed(
    () => this.state().pausedSeconds ?? (this.state().deadline === null ? this.state().phase === "preview" ? this.round().seconds : 0 : Math.max(0, Math.ceil((this.state().deadline - this.now()) / 1e3))),
    ...ngDevMode ? [{ debugName: "seconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer = computed(
    () => `${Math.floor(this.seconds() / 60).toString().padStart(2, "0")}:${(this.seconds() % 60).toString().padStart(2, "0")}`,
    ...ngDevMode ? [{ debugName: "timer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  interval;
  constructor() {
    try {
      const saved = this.persistence.load();
      if (saved) {
        if (saved.round < 0 || saved.round >= this.config.rounds.length || saved.teams.length !== this.config.teams.length || saved.teams.some((t, i) => t.id !== this.config.teams[i].id) || !["preview", "decision-open", "decision-locked", "revealing", "results", "complete"].includes(saved.phase))
          throw new Error("Saved practice does not match this project.");
        this.state.set(saved);
        this.draft.set(structuredClone(saved.teams[0].decision));
      }
    } catch (error) {
      this.fail(error);
      this.blocked.set(true);
    }
    this.interval = setInterval(() => {
      this.now.set(Date.now());
      if (!this.blocked() && this.state().phase === "decision-open" && this.state().deadline !== null && this.seconds() === 0)
        this.command({ type: "close" });
    }, 500);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  updateValue(id, value) {
    this.draft.update((d) => __spreadProps(__spreadValues({}, d), { values: __spreadProps(__spreadValues({}, d.values), { [id]: value }) }));
  }
  updateNote(reasoning) {
    this.draft.update((d) => __spreadProps(__spreadValues({}, d), { reasoning }));
  }
  updatePrediction(prediction) {
    this.draft.update((d) => __spreadProps(__spreadValues({}, d), { prediction }));
  }
  saveDraft() {
    if (this.editable() && !this.validation())
      this.command({ type: "draft", decision: this.draft() });
  }
  lock() {
    this.command({ type: "lock", decision: this.draft() });
  }
  command(command) {
    if (this.blocked())
      return;
    try {
      this.now.set(Date.now());
      const next = applyLeagueCommand(this.config, this.state(), command, this.now());
      this.persistence.save(next, this.state().revision);
      this.state.set(next);
      if (command.type !== "draft")
        this.draft.set(structuredClone(next.teams[0].decision));
      this.error.set("");
    } catch (error) {
      this.fail(error);
      if (command.type === "close")
        this.blocked.set(true);
    }
  }
  fail(error) {
    this.error.set(error instanceof Error ? error.message : "Practice could not be saved.");
  }
  static \u0275fac = function LeagueRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeagueRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LeagueRuntimeService, factory: _LeagueRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeagueRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  LEAGUE_PERSISTENCE,
  BrowserLeaguePersistence,
  LEAGUE_CONFIG,
  LeagueRuntimeService
};
//# debugId=5297f830-4a2b-5139-b21d-7eda72b7d932
//# sourceMappingURL=chunk-IKO3FXUM.js.map
