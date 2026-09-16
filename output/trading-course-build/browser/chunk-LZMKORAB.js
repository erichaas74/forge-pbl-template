import {
  ExpeditionNavigation,
  worldDistance
} from "./chunk-GAXYVDGI.js";
import {
  EscapeRuntime,
  stepForGrade
} from "./chunk-RWLVM3VX.js";
import {
  allBalancePieces,
  balancePlacements,
  canPlaceBalanceWeight,
  emptyBalance
} from "./chunk-YQ5R4IZP.js";
import {
  emptyGears,
  validGearDraft
} from "./chunk-RAYONVPN.js";
import {
  initialMachine,
  validMachineAnswer
} from "./chunk-NRR2X4JL.js";
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

// src/app/templates/heist/escape/runtime/expedition-runtime.ts
var EXPEDITION_PLAYER = new InjectionToken("EXPEDITION_PLAYER", {
  factory: () => ({ id: "local-rescuer", name: "You", color: 8578770 })
});
var blankDraft = () => ({
  digits: [0, 0, 0, 0, 0, 0],
  quantity: null,
  departure: 0,
  weights: [],
  counted: []
});
var ExpeditionRuntime = class _ExpeditionRuntime {
  progress = inject(EscapeRuntime);
  mission = this.progress.mission;
  localIdentity = inject(EXPEDITION_PLAYER);
  definition = this.mission.world;
  navigation = new ExpeditionNavigation(this.definition, this.definition.spawn, true);
  engine = computed(() => {
    this.progress.revision();
    return this.progress.engine;
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "engine" } : (
    /* istanbul ignore next */
    {}
  )), { equal: () => false }));
  current = computed(
    () => stepForGrade(this.mission.steps[Math.min(this.engine().index, this.mission.steps.length - 1)], this.engine().grade),
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phase = signal(
    "opening",
    ...ngDevMode ? [{ debugName: "phase" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = signal(
    blankDraft(),
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nearby = signal(
    false,
    ...ngDevMode ? [{ debugName: "nearby" }] : (
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
  hint = signal(
    false,
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = signal(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioEnabled = signal(
    true,
    ...ngDevMode ? [{ debugName: "audioEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalAnimals = this.mission.animals.reduce((sum, a) => sum + a.count, 0);
  celebration = signal(
    0,
    ...ngDevMode ? [{ debugName: "celebration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Only this collection crosses the presentation boundary; the scene is not tied to a single avatar. */
  remotePresence = [];
  pendingInteraction = null;
  walkingTo = false;
  drafts = /* @__PURE__ */ new Map();
  constructor() {
    this.navigation.setSolved(this.engine().solved);
    this.restoreDraft();
    if (this.engine().started) {
      this.navigation.position = this.point(this.current());
      this.nearby.set(true);
    }
  }
  restoreDraft() {
    const step = this.current();
    const saved = this.drafts.get(step.id);
    this.draft.set(saved ? structuredClone(saved) : blankDraft());
    const answer = this.engine().attempts.slice().reverse().find((attempt) => attempt.stepId === step.id && attempt.correct)?.answer;
    if (["balance-lock", "gear-lock"].includes(step.puzzle.type) && Array.isArray(answer))
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), { placements: answer }));
    if (step.puzzle.type === "machine-lock") {
      const checkpoint = answer ?? this.engine().checkpoints.get(step.id);
      if (validMachineAnswer(step.puzzle.lock, checkpoint))
        this.draft.update((d) => __spreadProps(__spreadValues({}, d), { machine: structuredClone(checkpoint) }));
    }
  }
  /** Visit without recording an answer, a rescue, or completion. */
  visitLock(index, open = true) {
    if (this.paused() || !this.engine().started || !Number.isInteger(index) || index < 0 || index >= this.mission.steps.length)
      return false;
    const oldId = this.current().id;
    const draft = structuredClone(this.draft());
    if (!this.progress.send({ type: "visit", stepId: this.mission.steps[index].id }))
      return false;
    this.drafts.set(oldId, draft);
    this.restoreDraft();
    this.navigation.stop();
    this.pendingInteraction = null;
    this.walkingTo = false;
    this.hint.set(false);
    this.message.set("");
    if (open)
      this.navigation.position = this.point(this.current());
    this.nearby.set(worldDistance(this.navigation.position, this.point(this.current())) <= this.definition.interactionRadius);
    this.phase.set(open ? this.engine().solved.has(this.current().id) ? "celebrate" : "puzzle" : "explore");
    return true;
  }
  get players() {
    return [
      __spreadProps(__spreadValues({}, this.localIdentity), {
        position: this.navigation.position,
        facing: this.navigation.facing,
        moving: this.navigation.moving
      }),
      ...this.remotePresence
    ];
  }
  /** A future authenticated presence adapter may feed peer snapshots here, never answer outcomes. */
  receivePresence(players) {
    const ids = /* @__PURE__ */ new Set([this.localIdentity.id]);
    this.remotePresence = players.filter((p) => {
      if (ids.has(p.id) || !p.id || !this.navigation.walkable(p.position) || !Number.isFinite(p.facing))
        return false;
      ids.add(p.id);
      return true;
    }).slice(0, 3).map((p) => __spreadProps(__spreadValues({}, p), { name: p.name.slice(0, 24), position: __spreadValues({}, p.position) }));
  }
  start() {
    if (this.progress.restoreBlocked())
      return false;
    if (!this.engine().started && !this.progress.send({ type: "start" }))
      return false;
    this.phase.set(this.engine().complete ? "complete" : this.engine().solved.has(this.current().id) ? "celebrate" : "explore");
    this.message.set("Follow the gold beacon. Click to walk, or use WASD / arrow keys.");
    return true;
  }
  setGrade(grade) {
    if (this.phase() === "opening" && !this.engine().started && [5, 6, 7, 8].includes(grade))
      this.progress.send({ type: "select-grade", grade });
  }
  point(step) {
    return {
      x: step.x / 100 * this.definition.width,
      y: step.y / 100 * this.definition.height
    };
  }
  tick(dt, direction) {
    if (this.phase() !== "explore" || this.paused()) {
      this.navigation.moving = false;
      return;
    }
    if (direction.x || direction.y)
      this.pendingInteraction = null;
    this.navigation.tick(dt, direction);
    const near = worldDistance(this.navigation.position, this.point(this.current())) <= this.definition.interactionRadius;
    if (near !== this.nearby())
      this.nearby.set(near);
    if (this.pendingInteraction === this.current().id && near) {
      this.navigation.stop();
      this.pendingInteraction = null;
      this.openPuzzle();
    }
    if (this.walkingTo && !this.navigation.route.length) {
      this.walkingTo = false;
      if (this.phase() === "explore")
        this.message.set(near ? "You found the mechanism. Press E to inspect it." : "Explore the courtyard, or follow the gold beacon.");
    }
  }
  input(input) {
    if (this.paused())
      return;
    if (input.type === "walk" && this.phase() === "explore") {
      this.pendingInteraction = null;
      this.walkingTo = this.navigation.navigate(input.destination);
      if (!this.walkingTo)
        this.message.set("Stay on the courtyard paths.");
    }
    if (input.type === "interact" && this.phase() === "explore") {
      if (input.stepId !== this.current().id) {
        const index = this.mission.steps.findIndex((step) => step.id === input.stepId);
        if (!this.visitLock(index, false))
          return;
      }
      if (this.nearby())
        this.openPuzzle();
      else {
        this.pendingInteraction = input.stepId;
        this.walkingTo = this.navigation.navigate(this.point(this.current()));
        this.message.set(`Walking to ${this.current().place}\u2026`);
      }
    }
    if (this.phase() !== "puzzle")
      return;
    const p = this.current().puzzle;
    if (input.type === "machine-change" && p.type === "machine-lock" && validMachineAnswer(p.lock, input.answer)) {
      if (this.progress.send({ type: "checkpoint", stepId: this.current().id, answer: input.answer }))
        this.draft.update((d) => __spreadProps(__spreadValues({}, d), { machine: structuredClone(input.answer) }));
      this.message.set("");
    }
    if (input.type === "gear-change" && p.type === "gear-lock" && validGearDraft(p.lock, input.answer)) {
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), { placements: [...input.answer] }));
      this.message.set("");
    }
    if (input.type === "balance-place" && p.type === "balance-lock" && Number.isInteger(input.index) && input.index >= 0 && input.index < allBalancePieces(p.lock).length && canPlaceBalanceWeight(p.lock, input.side)) {
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), {
        placements: balancePlacements(p.lock, d.placements ?? emptyBalance(p.lock)).map((side, i) => i === input.index ? input.side : side)
      }));
      this.message.set("");
    }
    if (input.type === "dial" && p.type === "code" && Number.isInteger(input.index) && input.index >= 0 && input.index < p.labels.length && [-1, 1].includes(input.change)) {
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), {
        digits: d.digits.map((n, i) => i === input.index ? (n + input.change + 10) % 10 : n)
      }));
      this.message.set("");
    }
    if (input.type === "weight" && p.type === "balance" && Number.isInteger(input.index) && input.index >= 0 && input.index < p.weights.length) {
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), {
        weights: d.weights.includes(input.index) ? d.weights.filter((i) => i !== input.index) : [...d.weights, input.index]
      }));
      this.message.set("");
    }
    if (input.type === "count")
      this.draft.update((d) => __spreadProps(__spreadValues({}, d), {
        counted: d.counted.includes(input.id) ? d.counted.filter((id) => id !== input.id) : [...d.counted, input.id]
      }));
  }
  setNumber(value) {
    this.draft.update((d) => __spreadProps(__spreadValues({}, d), { quantity: value }));
    this.message.set("");
  }
  setDeparture(value) {
    this.draft.update((d) => __spreadProps(__spreadValues({}, d), { departure: value }));
    this.message.set("");
  }
  inspect() {
    this.input({ type: "interact", stepId: this.current().id });
  }
  openPuzzle() {
    this.phase.set(this.engine().solved.has(this.current().id) ? "celebrate" : "puzzle");
    this.message.set("");
    this.navigation.stop();
  }
  closePuzzle() {
    this.phase.set("explore");
    this.message.set("Your settings are kept. Come back when you are ready.");
  }
  submit() {
    if (this.phase() !== "puzzle" || this.paused() || worldDistance(this.navigation.position, this.point(this.current())) > this.definition.interactionRadius)
      return "invalid";
    const p = this.current().puzzle, d = this.draft();
    let answer;
    if (p.type === "code")
      answer = p.labels.map((_, i) => d.digits[i]).join("");
    else if (p.type === "timing")
      answer = d.departure;
    else if (p.type === "balance")
      answer = d.weights;
    else if (p.type === "machine-lock")
      answer = d.machine ?? initialMachine(p.lock);
    else if (p.type === "gear-lock")
      answer = d.placements ?? emptyGears();
    else if (p.type === "balance-lock")
      answer = d.placements ?? emptyBalance(p.lock);
    else {
      if (d.quantity === null || !Number.isFinite(d.quantity) || d.quantity < 0 || d.quantity > p.max) {
        this.message.set(`Choose a number from 0 to ${p.max}.`);
        return "invalid";
      }
      answer = d.quantity;
    }
    if (!this.progress.send({ type: "submit", stepId: this.current().id, answer })) {
      this.message.set("The attempt could not be saved. Check the save message before continuing.");
      return "invalid";
    }
    if (this.engine().solved.has(this.current().id)) {
      this.navigation.setSolved(this.engine().solved);
      this.phase.set("celebrate");
      this.celebration.update((n) => n + 1);
      this.message.set("");
      return "correct";
    }
    const timing = p.type === "timing" ? d.departure < p.safeStart || d.departure + p.crossing > p.safeEnd ? `You would cross from ${d.departure} to ${d.departure + p.crossing} seconds, while the lookout is watching. ` : "Safe, but there is a later departure. " : "";
    this.message.set(`${timing}${p.hint}`);
    return "incorrect";
  }
  next() {
    if (this.paused() || this.phase() !== "celebrate")
      return;
    const oldId = this.current().id;
    const draft = structuredClone(this.draft());
    if (!this.progress.send({ type: "continue", stepId: oldId }))
      return;
    this.drafts.set(oldId, draft);
    this.restoreDraft();
    this.hint.set(false);
    this.nearby.set(false);
    this.navigation.stop();
    this.phase.set(this.engine().complete ? "complete" : "explore");
    this.message.set(this.engine().complete ? "Every animal is home." : `Next: ${this.current().place}. Follow the beacon.`);
  }
  openJournal() {
    this.navigation.stop();
    this.phase.set("journal");
  }
  closeJournal() {
    this.phase.set(this.engine().complete ? "complete" : this.engine().solved.has(this.current().id) ? "celebrate" : "explore");
  }
  reset() {
    this.progress.reset();
    this.drafts.clear();
    this.navigation.setSolved(this.engine().solved);
    this.navigation.position = __spreadValues({}, this.definition.spawn);
    this.navigation.stop();
    this.draft.set(blankDraft());
    this.hint.set(false);
    this.nearby.set(false);
    this.message.set("");
    this.phase.set("opening");
    this.pendingInteraction = null;
    this.remotePresence = [];
    this.celebration.set(0);
  }
  static \u0275fac = function ExpeditionRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpeditionRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExpeditionRuntime, factory: _ExpeditionRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpeditionRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  EXPEDITION_PLAYER,
  ExpeditionRuntime
};
//# debugId=0da56087-93dd-5bdf-80a5-6e6423dd06bf
//# sourceMappingURL=chunk-LZMKORAB.js.map
