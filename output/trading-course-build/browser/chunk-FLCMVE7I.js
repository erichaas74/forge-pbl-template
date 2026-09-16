import {
  EXPEDITION_PREVIEW_PERSISTENCE,
  EXPEDITION_PREVIEW_SESSION
} from "./chunk-DCCGK2JP.js";
import {
  initialPreviewAnswer,
  validPreviewAnswer
} from "./chunk-FWZ6YNYR.js";
import {
  ESCAPE_MISSION,
  stepForGrade
} from "./chunk-RWLVM3VX.js";
import {
  balancePlacements,
  balanceReading,
  canPlaceBalanceWeight
} from "./chunk-YQ5R4IZP.js";
import {
  evaluateGearLock,
  gearFeedback,
  gearMotion
} from "./chunk-RAYONVPN.js";
import {
  machineReading,
  validMachineAnswer
} from "./chunk-NRR2X4JL.js";
import {
  Injectable,
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

// src/app/templates/heist/escape/weekly/expedition-preview.runtime.ts
var ExpeditionPreviewRuntime = class _ExpeditionPreviewRuntime {
  mission = inject(ESCAPE_MISSION);
  session = inject(EXPEDITION_PREVIEW_SESSION);
  persistence = inject(EXPEDITION_PREVIEW_PERSISTENCE);
  grade = signal(
    5,
    ...ngDevMode ? [{ debugName: "grade" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    this.mission.previewWeeks[0].sessions[0].stepId,
    ...ngDevMode ? [{ debugName: "selected" }] : (
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
  warning = signal(
    "",
    ...ngDevMode ? [{ debugName: "warning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restoreFailed = false;
  step = computed(
    () => stepForGrade(this.mission.steps.find((s) => s.id === this.selected()), this.grade()),
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  key = computed(
    () => `${this.grade()}:${this.selected()}`,
    ...ngDevMode ? [{ debugName: "key" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = computed(
    () => this.drafts()[this.key()] ?? { answer: initialPreviewAnswer(this.step()), trials: [] },
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = signal(
    "Sample setup \u2014 editable starting equipment.",
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.session.mode !== "preview" || this.session.authorityMode !== "localDemo" || !this.mission.previewWeeks)
      throw new Error("PERMISSION_DENIED: configured local authoring preview required");
    try {
      const saved = this.persistence.load();
      if (saved !== void 0)
        this.restore(saved);
    } catch (error) {
      console.warn("Expedition preview restore:", error instanceof Error ? error.message : "INVALID_SNAPSHOT");
      this.restoreFailed = true;
      this.warning.set("Saved preview could not be read. Your saved copy is retained; changes work in this visit only.");
    }
  }
  choose(id) {
    if (!this.mission.steps.some((s) => s.id === id))
      return;
    this.selected.set(id);
    this.source.set(this.drafts()[this.key()] ? "Your saved setup \u2014 edits retained." : "Sample setup \u2014 editable starting equipment.");
  }
  setGrade(grade) {
    if (!(this.mission.mathGrades ?? [5]).includes(grade))
      return;
    this.grade.set(grade);
    this.choose(this.selected());
    this.save();
  }
  change(answer) {
    if (!validPreviewAnswer(this.step(), answer)) {
      this.warning.set("INVALID_COMMAND: those settings do not fit this mechanism.");
      return;
    }
    const puzzle = this.step().puzzle;
    if (puzzle.type === "balance-lock" && Array.isArray(answer))
      answer = [...balancePlacements(puzzle.lock, answer)];
    this.drafts.update((all) => __spreadProps(__spreadValues({}, all), {
      [this.key()]: __spreadProps(__spreadValues({}, this.draft()), { answer: structuredClone(answer) })
    }));
    this.source.set("Your setup \u2014 edits retained.");
    this.save();
  }
  moveWeight(index, side) {
    const answer = this.draft().answer, puzzle = this.step().puzzle;
    if (puzzle.type === "balance-lock" && !canPlaceBalanceWeight(puzzle.lock, side))
      return;
    if (Array.isArray(answer))
      this.change(answer.map((v, i) => i === index ? side : v));
  }
  trial(stage = 0) {
    const p = this.step().puzzle, answer = this.draft().answer;
    let reading;
    if (!Number.isInteger(stage) || stage < 0)
      return;
    if (p.type === "machine-lock" && validMachineAnswer(p.lock, answer) && p.lock.stages[stage]) {
      const value = machineReading(p.lock.stages[stage], answer.stages[stage]);
      reading = { success: value.solved, equation: value.equation, feedback: value.feedback };
    } else if (p.type === "balance-lock" && Array.isArray(answer) && p.lock.scales[stage]) {
      const value = balanceReading(p.lock, stage, answer);
      reading = { success: value.balanced, equation: value.equation, feedback: value.feedback };
    } else if (p.type === "gear-lock" && Array.isArray(answer) && stage === 0) {
      const motion = gearMotion(p.lock, answer, answer[2]);
      reading = {
        success: evaluateGearLock(p.lock, answer),
        equation: `${answer[2]} input turns \xB7 ${motion.output} output turns`,
        feedback: gearFeedback(p.lock, answer)
      };
    } else
      return;
    const trial = __spreadValues({ id: crypto.randomUUID(), answer: structuredClone(answer), stage }, reading);
    this.drafts.update((all) => __spreadProps(__spreadValues({}, all), {
      [this.key()]: __spreadProps(__spreadValues({}, this.draft()), { trials: [...this.draft().trials, trial].slice(-30) })
    }));
    this.save();
  }
  restoreTrial(id) {
    const trial = this.draft().trials.find((t) => t.id === id);
    if (trial)
      this.change(trial.answer);
  }
  reset() {
    this.change(initialPreviewAnswer(this.step()));
  }
  retrySave() {
    this.save();
  }
  save() {
    if (this.restoreFailed)
      return;
    try {
      this.persistence.save({ version: 1, grade: this.grade(), drafts: this.drafts() });
      this.warning.set("");
    } catch {
      this.warning.set("This browser could not save your preview. Keep this page open; your edits are still here.");
    }
  }
  restore(value) {
    const fail = () => {
      throw new Error("INVALID_SNAPSHOT");
    };
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 || !("grade" in value) || !(this.mission.mathGrades ?? [5]).includes(value.grade) || !("drafts" in value) || !value.drafts || typeof value.drafts !== "object" || Array.isArray(value.drafts))
      return fail();
    const snapshot = value;
    if (Object.keys(snapshot.drafts).length > this.mission.steps.length * 4)
      return fail();
    for (const [key, draft] of Object.entries(snapshot.drafts)) {
      const [grade, id] = key.split(":");
      const base = this.mission.steps.find((s) => s.id === id);
      if (!base || !(this.mission.mathGrades ?? [5]).includes(Number(grade)))
        return fail();
      const step = stepForGrade(base, Number(grade));
      if (!draft || !validPreviewAnswer(step, draft.answer) || !Array.isArray(draft.trials) || draft.trials.length > 30)
        return fail();
      for (const t of draft.trials) {
        const count = step.puzzle.type === "machine-lock" ? step.puzzle.lock.stages.length : step.puzzle.type === "balance-lock" ? step.puzzle.lock.scales.length : 1;
        if (!t || typeof t.id !== "string" || !validPreviewAnswer(step, t.answer) || !Number.isInteger(t.stage) || t.stage < 0 || t.stage >= count || typeof t.success !== "boolean" || typeof t.equation !== "string" || typeof t.feedback !== "string")
          return fail();
      }
    }
    this.grade.set(snapshot.grade);
    this.drafts.set(structuredClone(snapshot.drafts));
  }
  static \u0275fac = function ExpeditionPreviewRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpeditionPreviewRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExpeditionPreviewRuntime, factory: _ExpeditionPreviewRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpeditionPreviewRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  ExpeditionPreviewRuntime
};
//# debugId=2ec627f4-e469-5050-8128-344d7506cc57
//# sourceMappingURL=chunk-FLCMVE7I.js.map
