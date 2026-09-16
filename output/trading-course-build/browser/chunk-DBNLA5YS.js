import {
  DEBATE_STUDIO_CONFIG
} from "./chunk-GNKRFT3D.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
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

// src/app/templates/debate-studio/exchange/debate-exchange.models.ts
var debateCriteria = ["evidence", "reasoning", "response"];
function emptyExchange() {
  return { schemaVersion: "1.0", revision: 0, contributions: [], critiques: [], ballots: [] };
}
function emptyDraft(side = "") {
  return { side, points: [], speech: "", evidenceIds: [], reviewIds: [], changeNote: "", group: "" };
}
var nonempty = (value) => value.trim().length > 0;
var unique = (values) => new Set(values).size === values.length;
var requireThat = (condition, message) => {
  if (!condition) throw new Error(message);
};
function validRatings(ratings) {
  return debateCriteria.every((key) => Number.isInteger(ratings[key]) && ratings[key] >= 1 && ratings[key] <= 4);
}
function applyExchangeCommand(state, command, config) {
  const item = command.value;
  const collection = command.type === "debate.exchange.submit" ? state.contributions : command.type === "debate.exchange.critique" ? state.critiques : state.ballots;
  const existing = collection.find((entry) => entry.id === item.id);
  if (existing) {
    requireThat(JSON.stringify(existing) === JSON.stringify(item), "This exchange ID already contains different work.");
    return state;
  }
  requireThat(nonempty(item.id) && nonempty(item.actorId) && !Number.isNaN(Date.parse(item.createdAt)), "The exchange identity or date is invalid.");
  if (command.type === "debate.exchange.submit") {
    const entry = command.value;
    requireThat(config.factions.some((faction) => faction.id === entry.side), "Choose a debate side.");
    requireThat(Number.isInteger(entry.lesson) && entry.lesson >= 1 && entry.lesson <= 8, "Choose a session from 1 to 8.");
    requireThat(nonempty(entry.name) && nonempty(entry.speech) && entry.points.length > 0 && entry.points.every(nonempty), "Add an opening point and a speech before submitting.");
    requireThat(entry.evidenceIds.length > 0 && unique(entry.evidenceIds) && entry.evidenceIds.every((id) => config.evidence.some((source) => source.id === id)), "Attach at least one project source.");
    requireThat(!entry.mediaId || !!entry.mediaReviewed, "Play and review the recording before submitting.");
    requireThat(!state.contributions.some((prior) => prior.actorId === entry.actorId && prior.side !== entry.side), "Keep your submitted side for this debate.");
    const opposing = state.contributions.find((prior) => prior.id === entry.replyTo);
    const original = state.contributions.find((prior) => prior.id === entry.revises);
    const mode = config.exchange?.lessons[entry.lesson - 1].mode;
    requireThat(entry.kind === (mode === "opening" ? "opening" : mode === "refine" ? "revision" : mode === "final" ? "closing" : "response"), "Submission type must match the selected session.");
    if (entry.kind === "response" || entry.kind === "closing" || entry.replyTo) {
      requireThat(!!opposing && opposing.side !== entry.side, "Select an opposing argument to answer.");
    }
    if (entry.kind === "revision" || entry.revises) {
      requireThat(!!original && original.actorId === entry.actorId && original.side === entry.side, "Select your earlier argument to revise.");
      requireThat(nonempty(entry.changeNote), "Explain what changed in this revision.");
    }
    requireThat(unique(entry.reviewIds) && entry.reviewIds.every((id) => state.critiques.some((review) => review.id === id && review.contributionId === entry.revises)), "Feedback must refer to the argument being revised.");
    return __spreadProps(__spreadValues({}, state), { revision: state.revision + 1, contributions: [...state.contributions, entry] });
  }
  if (command.type === "debate.exchange.critique") {
    const review = command.value;
    const target = state.contributions.find((entry) => entry.id === review.contributionId);
    const reviewer = state.contributions.find((entry) => entry.actorId === review.actorId);
    requireThat(!!target && !!reviewer && target.side === reviewer.side && target.actorId !== review.actorId, "Critique another author who shares your submitted side.");
    requireThat(nonempty(review.moment) && !!target?.speech.includes(review.moment), "Choose an exact moment from this speech.");
    requireThat(nonempty(review.name) && nonempty(review.strength) && nonempty(review.suggestion) && validRatings(review.ratings), "Give a strength, a useful improvement, and three criterion ratings.");
    return __spreadProps(__spreadValues({}, state), { revision: state.revision + 1, critiques: [...state.critiques, review] });
  }
  const ballot = command.value;
  requireThat(ballot.judgments.length > 0 && ballot.judgments.length <= 3 && unique(ballot.judgments.map((judgment) => judgment.performerId)), "Rank up to three performers, each only once.");
  requireThat(ballot.judgments.every((judgment) => judgment.performerId !== ballot.actorId && state.contributions.some((entry) => entry.actorId === judgment.performerId && entry.id === judgment.contributionId) && validRatings(judgment.ratings) && nonempty(judgment.reason)), "Support each ranking with a reviewed performance, ratings, and a reason; do not rank yourself.");
  return __spreadProps(__spreadValues({}, state), { revision: state.revision + 1, ballots: [...state.ballots, ballot] });
}
function rankDebatePerformers(state) {
  const latest = /* @__PURE__ */ new Map();
  for (const ballot of [...state.ballots].sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id))) latest.set(ballot.actorId, ballot);
  const scores = /* @__PURE__ */ new Map();
  for (const ballot of latest.values()) for (const [index, judgment] of ballot.judgments.entries()) {
    const performer = state.contributions.find((entry) => entry.actorId === judgment.performerId);
    const score = scores.get(performer.actorId) ?? { id: performer.actorId, name: performer.name, points: 0, ballots: 0 };
    scores.set(score.id, __spreadProps(__spreadValues({}, score), { points: score.points + Math.max(0, 3 - index), ballots: score.ballots + 1 }));
  }
  const sorted = [...scores.values()].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  return sorted.map((score) => __spreadProps(__spreadValues({}, score), { place: sorted.findIndex((other) => other.points === score.points) + 1 }));
}
function validateExchangeConfig(config) {
  const exchange = config.exchange;
  requireThat(exchange?.schemaVersion === "1.0" && exchange.lessons.length === 8, "DEBATE_EXCHANGE_INVALID: eight sessions are required.");
  const modes = ["opening", "exchange", "refine", "exchange", "refine", "exchange", "refine", "final"];
  exchange.lessons.forEach((lesson, index) => {
    requireThat(lesson.number === index + 1 && lesson.mode === modes[index] && nonempty(lesson.title) && nonempty(lesson.product) && lesson.tasks.length > 0, "DEBATE_EXCHANGE_INVALID: incorrect session cycle.");
    requireThat(lesson.skill.choices.length >= 2 && lesson.skill.choices.every((choice) => nonempty(choice.text) && nonempty(choice.feedback)) && Number.isInteger(lesson.skill.strongest) && lesson.skill.strongest >= 0 && lesson.skill.strongest < lesson.skill.choices.length, "DEBATE_EXCHANGE_INVALID: a skill example needs choices and feedback.");
    requireThat([...lesson.sourceIds, ...lesson.skill.sourceIds].every((id) => config.evidence.some((source) => source.id === id)), "DEBATE_EXCHANGE_INVALID: unknown source.");
  });
  requireThat(exchange.examples.every((example) => config.factions.some((faction) => faction.id === example.side) && example.evidenceIds.length > 0 && example.evidenceIds.every((id) => config.evidence.some((source) => source.id === id))), "DEBATE_EXCHANGE_INVALID: invalid practice example.");
}

// src/app/templates/debate-studio/exchange/debate-exchange.persistence.ts
var DEBATE_EXCHANGE_PORT = new InjectionToken("DEBATE_EXCHANGE_PORT");
var record = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function mergeExchange(current, value, config) {
  if (!record(value) || value["schemaVersion"] !== "1.0" || !["contributions", "critiques", "ballots"].every((key) => Array.isArray(value[key]) && value[key].length <= 1e3)) throw new Error("Invalid debate exchange file.");
  const incoming = value;
  let pending = [
    ...incoming.contributions.map((entry) => ({ type: "debate.exchange.submit", value: entry })),
    ...incoming.critiques.map((entry) => ({ type: "debate.exchange.critique", value: entry })),
    ...incoming.ballots.map((entry) => ({ type: "debate.exchange.rank", value: entry }))
  ];
  let next = current;
  while (pending.length) {
    const retry = [];
    let reason = "Missing argument or feedback reference.";
    for (const command of pending) {
      try {
        next = applyExchangeCommand(next, command, config);
      } catch (error) {
        retry.push(command);
        reason = error instanceof Error ? error.message : reason;
      }
    }
    if (retry.length === pending.length) throw new Error(`Exchange could not be imported: ${reason}`);
    pending = retry;
  }
  return next;
}
var BrowserDebateExchangeAdapter = class {
  constructor(config, scope, storage = safeBrowserStorage()) {
    this.config = config;
    this.scope = scope;
    this.storage = storage;
    this.history = new ScopedBrowserStore("debate-exchange-v1", storage, (_value) => true);
    this.drafts = new ScopedBrowserStore("debate-exchange-drafts-v1", storage, (value) => record(value) && Object.values(value).every((draft) => record(draft) && typeof draft["side"] === "string" && typeof draft["speech"] === "string" && Array.isArray(draft["points"]) && draft["points"].every((point) => typeof point === "string") && Array.isArray(draft["evidenceIds"]) && draft["evidenceIds"].every((id) => typeof id === "string") && Array.isArray(draft["reviewIds"]) && typeof draft["group"] === "string" && typeof draft["changeNote"] === "string"));
  }
  config;
  scope;
  storage;
  history;
  drafts;
  scoped(practice) {
    return __spreadProps(__spreadValues({}, this.scope), { sessionId: practice ? "practice" : "classroom" });
  }
  load(practice) {
    const value = this.history.load(this.scoped(practice));
    return value === void 0 ? emptyExchange() : mergeExchange(emptyExchange(), value, this.config);
  }
  save(state, practice) {
    if (!this.storage) throw new Error("Browser storage is unavailable. Export your debate before leaving.");
    this.history.save(this.scoped(practice), state);
  }
  loadDrafts(practice) {
    return this.drafts.load(this.scoped(practice)) ?? {};
  }
  saveDrafts(value, practice) {
    if (!this.storage) throw new Error("Draft is in memory only; browser storage is unavailable.");
    this.drafts.save(this.scoped(practice), value);
  }
  async database() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("forge-debate-recordings-v1", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("recordings");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error("Recording storage is unavailable. Keep your original media file."));
    });
  }
  mediaKey(id) {
    return [this.scope.tenantId, this.scope.projectId, this.scope.projectVersion, this.scope.classId, this.scope.actorId, this.scope.attemptId, id].map((value) => encodeURIComponent(value ?? "")).join(":");
  }
  async saveMedia(blob) {
    const id = crypto.randomUUID();
    const db = await this.database();
    try {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction("recordings", "readwrite");
        transaction.objectStore("recordings").put(blob, this.mediaKey(id));
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(new Error("Recording could not be saved. Keep your original file."));
        transaction.onabort = () => reject(new Error("Recording save was interrupted."));
      });
      return id;
    } finally {
      db.close();
    }
  }
  async loadMedia(id) {
    const db = await this.database();
    try {
      return await new Promise((resolve, reject) => {
        const request = db.transaction("recordings").objectStore("recordings").get(this.mediaKey(id));
        request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : void 0);
        request.onerror = () => reject(new Error("Recording could not be loaded."));
      });
    } finally {
      db.close();
    }
  }
};
function exchangeFile(config, state) {
  return JSON.stringify({ format: "forge-debate-exchange", projectId: config.projectId, projectVersion: config.projectVersion, state }, null, 2);
}
function importExchangeFile(config, current, raw) {
  if (raw.length > 4e6) throw new Error("Exchange files must be smaller than 4 MB.");
  const packet = JSON.parse(raw);
  if (!record(packet) || packet["format"] !== "forge-debate-exchange" || packet["projectId"] !== config.projectId || packet["projectVersion"] !== config.projectVersion) throw new Error("Choose an exchange file for this project and version.");
  return mergeExchange(current, packet["state"], config);
}

// src/app/templates/debate-studio/exchange/debate-exchange-runtime.service.ts
var DEBATE_EXCHANGE_EXAMPLE = new InjectionToken("DEBATE_EXCHANGE_EXAMPLE", { factory: () => false });
var DebateExchangeRuntime = class _DebateExchangeRuntime {
  config = inject(DEBATE_STUDIO_CONFIG);
  port = inject(DEBATE_EXCHANGE_PORT);
  focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  example = inject(DEBATE_EXCHANGE_EXAMPLE);
  practice = signal(
    false,
    ...ngDevMode ? [{ debugName: "practice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = signal(
    emptyExchange(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drafts = signal(
    {},
    ...ngDevMode ? [{ debugName: "drafts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lesson = computed(
    () => this.config.exchange.lessons[(this.focus?.()?.number ?? (this.example ? 8 : 1)) - 1],
    ...ngDevMode ? [{ debugName: "lesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actorId = this.config.viewer.studentId;
  own = computed(
    () => this.state().contributions.filter((entry) => entry.actorId === this.actorId),
    ...ngDevMode ? [{ debugName: "own" }] : (
      /* istanbul ignore next */
      []
    )
  );
  side = computed(
    () => this.own()[0]?.side ?? this.drafts()["identity"]?.side ?? "",
    ...ngDevMode ? [{ debugName: "side" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = computed(
    () => this.drafts()[String(this.lesson().number)] ?? emptyDraft(this.side()),
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ranks = computed(
    () => rankDebatePerformers(this.state()),
    ...ngDevMode ? [{ debugName: "ranks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  latestBallot = computed(
    () => this.state().ballots.filter((ballot) => ballot.actorId === this.actorId).sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id)).at(-1),
    ...ngDevMode ? [{ debugName: "latestBallot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  peers = computed(
    () => this.state().contributions.filter((entry) => entry.side === this.side() && entry.actorId !== this.actorId),
    ...ngDevMode ? [{ debugName: "peers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opponents = computed(
    () => this.state().contributions.filter((entry) => entry.side !== this.side()),
    ...ngDevMode ? [{ debugName: "opponents" }] : (
      /* istanbul ignore next */
      []
    )
  );
  received = computed(
    () => this.state().critiques.filter((review) => this.own().some((entry) => entry.id === review.contributionId)),
    ...ngDevMode ? [{ debugName: "received" }] : (
      /* istanbul ignore next */
      []
    )
  );
  performers = computed(
    () => [...new Map(this.state().contributions.filter((entry) => entry.actorId !== this.actorId).map((entry) => [entry.actorId, entry])).values()],
    ...ngDevMode ? [{ debugName: "performers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    validateExchangeConfig(this.config);
    this.restore(false);
    if (this.example)
      this.openPractice();
  }
  restore(practice) {
    try {
      const state = this.port.load(practice);
      const drafts = this.port.loadDrafts(practice);
      this.state.set(state);
      this.drafts.set(drafts);
      this.practice.set(practice);
      this.message.set("");
    } catch (error) {
      this.report(error);
    }
  }
  report(error) {
    this.message.set(error instanceof Error ? error.message : "The action could not be completed.");
  }
  updateDraft(change) {
    const drafts = __spreadProps(__spreadValues({}, this.drafts()), { [this.lesson().number]: __spreadValues(__spreadValues({}, this.draft()), change) });
    this.drafts.set(drafts);
    try {
      this.port.saveDrafts(drafts, this.practice());
      this.message.set("Draft saved in this browser.");
    } catch (error) {
      this.report(error);
    }
  }
  saveContext(key, speech) {
    const drafts = __spreadProps(__spreadValues({}, this.drafts()), { [key]: __spreadProps(__spreadValues({}, emptyDraft(this.side())), { speech }) });
    this.drafts.set(drafts);
    try {
      this.port.saveDrafts(drafts, this.practice());
      this.message.set("Context response saved privately in this browser. Teacher review required.");
    } catch (error) {
      this.report(error);
    }
  }
  chooseSide(side) {
    if (this.own().length) {
      this.message.set("Your submitted side stays with this debate.");
      return;
    }
    this.drafts.update((drafts) => Object.fromEntries([...Object.entries(drafts).map(([key, draft]) => [key, __spreadProps(__spreadValues({}, draft), { side })]), ["identity", emptyDraft(side)]]));
    this.updateDraft({ side });
  }
  toggleSource(id) {
    const ids = this.draft().evidenceIds;
    this.updateDraft({ evidenceIds: ids.includes(id) ? ids.filter((source) => source !== id) : [...ids, id] });
  }
  movePoint(index, direction) {
    const points = [...this.draft().points];
    const target = index + direction;
    if (target < 0 || target >= points.length)
      return;
    [points[index], points[target]] = [points[target], points[index]];
    this.updateDraft({ points });
  }
  revise(entry) {
    if (entry.actorId !== this.actorId)
      return;
    this.updateDraft(__spreadProps(__spreadValues({}, entry), { revises: entry.id, reviewIds: [], changeNote: "", mediaId: void 0, mediaType: void 0, mediaReviewed: false }));
  }
  dispatch(command) {
    try {
      const next = applyExchangeCommand(this.state(), command, this.config);
      this.state.set(next);
      try {
        this.port.save(next, this.practice());
        this.message.set(this.practice() ? "Saved in the practice debate." : "Saved locally. Export the exchange to share it with your class.");
      } catch {
        this.message.set("Submitted in memory only. Browser save failed; export your exchange before leaving.");
      }
      return true;
    } catch (error) {
      this.report(error);
      return false;
    }
  }
  submit() {
    const mode = this.lesson().mode;
    const draft = this.draft();
    const contribution = __spreadProps(__spreadValues({}, draft), {
      side: this.side(),
      id: crypto.randomUUID(),
      actorId: this.actorId,
      name: this.config.viewer.studentDisplayName,
      lesson: this.lesson().number,
      kind: mode === "opening" ? "opening" : mode === "refine" ? "revision" : mode === "final" ? "closing" : "response",
      group: this.lesson().number % 2 === 0 ? draft.group : "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return this.dispatch({ type: "debate.exchange.submit", value: contribution });
  }
  critique(value) {
    return this.dispatch({ type: "debate.exchange.critique", value: __spreadProps(__spreadValues({}, value), { id: crypto.randomUUID(), actorId: this.actorId, name: this.config.viewer.studentDisplayName, createdAt: (/* @__PURE__ */ new Date()).toISOString() }) });
  }
  rank(judgments) {
    return this.dispatch({ type: "debate.exchange.rank", value: { id: crypto.randomUUID(), actorId: this.actorId, judgments, createdAt: (/* @__PURE__ */ new Date()).toISOString() } });
  }
  exportFile() {
    return exchangeFile(this.config, this.state());
  }
  importFile(raw) {
    try {
      if (this.practice())
        throw new Error("Return to your classroom workspace before importing a class exchange.");
      const next = importExchangeFile(this.config, this.state(), raw);
      this.state.set(next);
      this.port.save(next, false);
      this.message.set("Exchange imported. Arguments and feedback are ready to review.");
    } catch (error) {
      this.report(error);
    }
  }
  openPractice() {
    this.restore(true);
    if (!this.practice() || this.state().contributions.length)
      return;
    let state = emptyExchange();
    const date = (/* @__PURE__ */ new Date()).toISOString();
    this.config.exchange.examples.forEach((example2, index) => {
      state = applyExchangeCommand(state, { type: "debate.exchange.submit", value: __spreadProps(__spreadValues(__spreadValues({}, emptyDraft(example2.side)), example2), { id: `example-${index}`, actorId: `example-speaker-${index}`, lesson: 1, kind: "opening", createdAt: date }) }, this.config);
    });
    const example = this.config.exchange.examples[0];
    const own = __spreadProps(__spreadValues(__spreadValues({}, emptyDraft(example.side)), example), { id: "example-own", actorId: this.actorId, name: `${this.config.viewer.studentDisplayName} \xB7 practice`, lesson: 1, kind: "opening", createdAt: date });
    state = applyExchangeCommand(state, { type: "debate.exchange.submit", value: own }, this.config);
    state = applyExchangeCommand(state, { type: "debate.exchange.critique", value: { id: "example-feedback", actorId: "example-speaker-0", name: example.name, contributionId: own.id, moment: own.speech, strength: "Your claim stays close to a named source.", suggestion: "Answer the opposing side\u2019s strongest point and explain what this source cannot prove.", ratings: { evidence: 3, reasoning: 3, response: 1 }, createdAt: date } }, this.config);
    this.state.set(state);
    try {
      this.port.save(state, true);
      this.message.set("Fictional practice debate opened. Classroom work is separate.");
    } catch (error) {
      this.report(error);
    }
  }
  closePractice() {
    this.restore(false);
  }
  static \u0275fac = function DebateExchangeRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateExchangeRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DebateExchangeRuntime, factory: _DebateExchangeRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateExchangeRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  debateCriteria,
  validateExchangeConfig,
  DEBATE_EXCHANGE_PORT,
  BrowserDebateExchangeAdapter,
  DEBATE_EXCHANGE_EXAMPLE,
  DebateExchangeRuntime
};
//# debugId=c63e1473-3a8d-5d05-828e-6e533660f293
//# sourceMappingURL=chunk-DBNLA5YS.js.map
