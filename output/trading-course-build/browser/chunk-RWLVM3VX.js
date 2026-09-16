import {
  acceptsBridgeCageUpgrade,
  acceptsGearCageUpgrade,
  acceptsOpticsCageUpgrade
} from "./chunk-7HMNGV54.js";
import {
  evaluateEscapePuzzle
} from "./chunk-RRITUMP7.js";
import {
  validMachineAnswer
} from "./chunk-NRR2X4JL.js";
import {
  Injectable,
  InjectionToken,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/domain/escape.models.ts
function stepForGrade(step, grade) {
  return step?.gradePuzzles?.[grade] ? __spreadProps(__spreadValues({}, step), { puzzle: step.gradePuzzles[grade] }) : step;
}

// src/app/templates/heist/escape/domain/escape.engine.ts
var EscapeEngine = class {
  constructor(mission) {
    this.mission = mission;
  }
  mission;
  started = false;
  index = 0;
  grade = 5;
  checkpoints = /* @__PURE__ */ new Map();
  solved = /* @__PURE__ */ new Set();
  attempts = [];
  processed = /* @__PURE__ */ new Set();
  get current() {
    return stepForGrade(this.mission.steps[this.index], this.grade);
  }
  get complete() {
    return this.index === this.mission.steps.length;
  }
  get released() {
    return new Set(
      this.mission.steps.filter((s) => this.solved.has(s.id)).flatMap((s) => s.release)
    );
  }
  get rescued() {
    return this.mission.animals.filter((a) => this.released.has(a.id)).reduce((n, a) => n + a.count, 0);
  }
  dispatch(value) {
    if (!value || typeof value !== "object" || !("id" in value) || typeof value.id !== "string" || !value.id || value.id.length > 100 || !("command" in value))
      return false;
    if (this.processed.has(value.id)) return true;
    const c = value.command;
    if (!c || typeof c !== "object" || !("type" in c)) return false;
    if (c.type === "select-grade") {
      if (this.started || !("grade" in c) || !this.mission.mathGrades?.includes(c.grade))
        return false;
      this.grade = c.grade;
    } else if (c.type === "start") {
      if (this.started) return false;
      this.started = true;
    } else if (c.type === "visit") {
      if (!this.started || this.complete || !this.mission.world || !("stepId" in c)) return false;
      const index = this.mission.steps.findIndex((step) => step.id === c.stepId);
      if (index < 0) return false;
      this.index = index;
    } else {
      if (!this.started || this.complete || !("stepId" in c) || c.stepId !== this.current.id)
        return false;
      if (c.type === "checkpoint") {
        const p = this.current.puzzle;
        if (p.type !== "machine-lock" || this.solved.has(this.current.id) || !("answer" in c) || !validMachineAnswer(p.lock, c.answer))
          return false;
        const previous = this.checkpoints.get(this.current.id);
        if (previous && (c.answer.seals.length < previous.seals.length || previous.seals.some(
          (_, i) => JSON.stringify(previous.stages[i]) !== JSON.stringify(c.answer.stages[i])
        )))
          return false;
        this.checkpoints.set(this.current.id, structuredClone(c.answer));
      } else if (c.type === "continue") {
        if (!this.solved.has(this.current.id)) return false;
        if (this.solved.size === this.mission.steps.length) this.index = this.mission.steps.length;
        else {
          const next = this.mission.steps.findIndex(
            (step, i) => i > this.index && !this.solved.has(step.id)
          );
          this.index = next >= 0 ? next : this.mission.steps.findIndex((step) => !this.solved.has(step.id));
        }
      } else if (c.type === "submit") {
        if (this.solved.has(this.current.id) || !("answer" in c) || this.attempts.length >= 1500)
          return false;
        const a = c.answer;
        if (!(this.current.puzzle.type === "machine-lock" && validMachineAnswer(this.current.puzzle.lock, a) || typeof a === "number" && Number.isFinite(a) || typeof a === "string" && /^\d{1,6}$/.test(a) || Array.isArray(a) && a.length <= (this.current.puzzle.type === "balance-lock" ? 24 : 12) && a.every((i) => typeof i === "number" && Number.isInteger(i))))
          return false;
        const answer = a;
        const correct = evaluateEscapePuzzle(this.current.puzzle, answer);
        this.attempts.push({ stepId: this.current.id, answer: structuredClone(answer), correct });
        if (correct) this.solved.add(this.current.id);
      } else return false;
    }
    this.processed.add(value.id);
    return true;
  }
};

// src/app/templates/heist/escape/runtime/escape-runtime.ts
var ESCAPE_MISSION = new InjectionToken("ESCAPE_MISSION");
var ESCAPE_PERSISTENCE = new InjectionToken("ESCAPE_PERSISTENCE");
var LocalEscapeAdapter = class {
  key;
  fingerprint;
  constructor(session, mission) {
    this.key = "forge:heist:escape:1:" + JSON.stringify([
      session.tenantId,
      session.classId,
      session.projectId,
      session.projectVersion,
      session.actorId,
      session.teamId,
      session.attemptId
    ]);
    this.fingerprint = JSON.stringify(__spreadProps(__spreadValues({}, mission), { previewWeeks: void 0 }));
  }
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw)
      return [];
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !("fingerprint" in saved) || typeof saved.fingerprint !== "string" || saved.fingerprint !== this.fingerprint && !acceptsGearCageUpgrade(saved.fingerprint, this.fingerprint) && !acceptsOpticsCageUpgrade(saved.fingerprint, this.fingerprint) && !acceptsBridgeCageUpgrade(saved.fingerprint, this.fingerprint) || !("history" in saved) || !Array.isArray(saved.history) || saved.history.length > 1600)
      throw new Error("This saved game could not be restored. Start a new rescue to continue.");
    return saved.history;
  }
  save(history) {
    if (history.length > 1600)
      throw new Error("Practice history is full.");
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, history }));
  }
};
var EscapeRuntime = class _EscapeRuntime {
  mission = inject(ESCAPE_MISSION);
  persistence = inject(ESCAPE_PERSISTENCE);
  engine = new EscapeEngine(this.mission);
  revision = signal(
    0,
    ...ngDevMode ? [{ debugName: "revision" }] : (
      /* istanbul ignore next */
      []
    )
  );
  warning = signal(
    "",
    ...ngDevMode ? [{ debugName: "warning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restoreBlocked = signal(
    false,
    ...ngDevMode ? [{ debugName: "restoreBlocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = [];
  constructor() {
    try {
      const saved = this.persistence.load();
      if (saved.length > 1600)
        throw new Error("Saved game is too large.");
      for (const envelope of saved)
        if (!this.engine.dispatch(envelope))
          throw new Error("Saved game contains an invalid step. Start a new rescue to continue.");
      this.history = [...saved];
    } catch (e) {
      this.engine = new EscapeEngine(this.mission);
      this.restoreBlocked.set(true);
      this.warning.set(e instanceof Error ? e.message : "Saved game could not be restored.");
    }
  }
  send(command) {
    if (this.restoreBlocked())
      return false;
    const envelope = { id: crypto.randomUUID(), command };
    if (!this.engine.dispatch(envelope))
      return false;
    this.history.push(envelope);
    this.revision.update((n) => n + 1);
    this.save();
    return true;
  }
  reset() {
    this.engine = new EscapeEngine(this.mission);
    this.history = [];
    this.restoreBlocked.set(false);
    this.revision.update((n) => n + 1);
    this.save();
  }
  retrySave() {
    this.save();
  }
  save() {
    try {
      this.persistence.save(this.history);
      this.warning.set("");
    } catch {
      this.warning.set("Your game is still here, but this browser could not save it. Keep this page open to finish.");
    }
  }
  static \u0275fac = function EscapeRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EscapeRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EscapeRuntime, factory: _EscapeRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EscapeRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  stepForGrade,
  ESCAPE_MISSION,
  ESCAPE_PERSISTENCE,
  LocalEscapeAdapter,
  EscapeRuntime
};
//# debugId=e12427e5-ac4f-5116-b339-921d5bbedbf6
//# sourceMappingURL=chunk-RWLVM3VX.js.map
