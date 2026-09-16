import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
  SIMULATION_DECISION_SESSION_CONTEXT,
  cargoCapacity,
  cargoUsed,
  cashOnHand,
  createSimulationState,
  formatMoney,
  initialTradeWorld,
  inventoryValueAtCurrentMarket,
  ledgerReconciles,
  marketAt,
  reduceSimulationDecision,
  reportMissingRequirements,
  seasonResults
} from "./chunk-OGBAME5W.js";
import {
  projectSessionRuntimeScope
} from "./chunk-G626JLCU.js";
import {
  DestroyRef,
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

// src/app/templates/simulation-decision/runtime/simulation-planning.ts
function createLocationPlan() {
  return {
    draft: signal([]),
    goodId: signal(""),
    direction: signal("buy"),
    quantity: signal(1),
    editing: signal(false),
    filter: signal(""),
    stallId: signal(void 0),
    showAll: signal(false),
    routeId: signal(""),
    compareIds: signal([]),
    rationales: signal({}),
    forecastSalesRevenueCents: signal({}),
    forecastTripProfitCents: signal({})
  };
}
var SimulationPlanning = class {
  locations = /* @__PURE__ */ new Map();
  at(locationId) {
    let plan = this.locations.get(locationId);
    if (!plan) {
      plan = createLocationPlan();
      this.locations.set(locationId, plan);
    }
    return plan;
  }
  clear() {
    this.locations.clear();
  }
};
function changeTradePlan(draft, line, replace = false) {
  const previous = draft.find(
    (item) => item.goodId === line.goodId && item.direction === line.direction
  );
  const validQuantity = Number.isSafeInteger(line.quantity) && line.quantity > 0;
  const next = __spreadProps(__spreadValues({}, line), {
    quantity: line.quantity + (replace || !validQuantity ? 0 : previous?.quantity ?? 0)
  });
  return [
    ...draft.filter((item) => item.goodId !== line.goodId || item.direction !== line.direction),
    next
  ];
}

// src/app/templates/simulation-decision/runtime/simulation-decision-runtime.service.ts
var SimulationDecisionRuntimeService = class _SimulationDecisionRuntimeService {
  planning = new SimulationPlanning();
  config = inject(SIMULATION_DECISION_CONFIG);
  session = inject(SIMULATION_DECISION_SESSION_CONTEXT, { optional: true });
  persistence = inject(SIMULATION_DECISION_PERSISTENCE);
  runtimeScope = this.session === null ? void 0 : projectSessionRuntimeScope(this.session, "student");
  state = signal(
    createSimulationState(this.config, 20260902, this.runtimeScope),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  errors = signal(
    [],
    ...ngDevMode ? [{ debugName: "errors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  marketIntent = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "marketIntent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  worldHolds = signal(
    [],
    ...ngDevMode ? [{ debugName: "worldHolds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  world = computed(
    () => this.state().tradeWorld,
    ...ngDevMode ? [{ debugName: "world" }] : (
      /* istanbul ignore next */
      []
    )
  );
  turnBasedWorld = this.config.tradeWorld?.timing === "turn-based";
  worldStepName = this.turnBasedWorld ? "Turn" : "Pulse";
  worldRunning = computed(
    () => !!this.config.tradeWorld && !this.turnBasedWorld && !this.world()?.paused && this.worldHolds().length === 0 && ["planning", "active"].includes(this.state().status) && !this.state().pendingEventId && this.saveState() !== "save_failed",
    ...ngDevMode ? [{ debugName: "worldRunning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // A committed turn can animate while the automatic clock remains disabled.
  worldMotionAllowed = computed(
    () => this.turnBasedWorld ? ["planning", "active", "event_pending"].includes(this.state().status) && this.saveState() !== "save_failed" : this.worldRunning(),
    ...ngDevMode ? [{ debugName: "worldMotionAllowed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  worldStatus = computed(
    () => this.turnBasedWorld ? this.state().pendingEventId ? "Prices held \xB7 resolve your checkpoint" : "Prices held until your next travel turn" : this.world()?.paused ? "World paused" : this.worldHolds().length ? "Prices held while you plan" : this.worldRunning() ? "Trade world running" : "World waiting",
    ...ngDevMode ? [{ debugName: "worldStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cash = computed(
    () => cashOnHand(this.state()),
    ...ngDevMode ? [{ debugName: "cash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  capacity = computed(
    () => cargoCapacity(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "capacity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  usedCargo = computed(
    () => cargoUsed(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "usedCargo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cargoValue = computed(
    () => inventoryValueAtCurrentMarket(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "cargoValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentLocation = computed(
    () => this.config.locations.find((location) => location.id === this.state().currentLocationId),
    ...ngDevMode ? [{ debugName: "currentLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentMarket = computed(
    () => marketAt(this.config, this.state().currentLocationId),
    ...ngDevMode ? [{ debugName: "currentMarket" }] : (
      /* istanbul ignore next */
      []
    )
  );
  transport = computed(
    () => this.config.transports.find((transport) => transport.id === this.state().transportId),
    ...ngDevMode ? [{ debugName: "transport" }] : (
      /* istanbul ignore next */
      []
    )
  );
  results = computed(
    () => seasonResults(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "results" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reportMissing = computed(
    () => reportMissingRequirements(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "reportMissing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reconciled = computed(
    () => ledgerReconciles(this.state()),
    ...ngDevMode ? [{ debugName: "reconciled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  profit = computed(
    () => this.cash() - this.config.startingCashCents,
    ...ngDevMode ? [{ debugName: "profit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    const saved = this.persistence.load(this.config.projectId, this.config.projectVersion);
    if (saved !== void 0) {
      this.state.set(__spreadValues(__spreadProps(__spreadValues({}, saved), {
        runtimeScope: this.runtimeScope ?? saved.runtimeScope,
        marketDiscoveries: saved.marketDiscoveries ?? {}
      }), this.config.tradeWorld ? { tradeWorld: saved.tradeWorld ?? initialTradeWorld(this.config.tradeWorld) } : {}));
    }
    if (this.config.tradeWorld && !this.turnBasedWorld && typeof document !== "undefined") {
      const timer = setInterval(() => {
        if (!document.hidden && this.worldRunning())
          this.pulseWorld();
      }, this.config.tradeWorld.tickIntervalMs);
      inject(DestroyRef).onDestroy(() => clearInterval(timer));
    }
  }
  holdWorld(reason, hold) {
    this.worldHolds.update((reasons) => hold ? [.../* @__PURE__ */ new Set([...reasons, reason])] : reasons.filter((item) => item !== reason));
  }
  pulseWorld() {
    if (!this.worldRunning())
      return false;
    return this.apply({ type: "world.pulsed", expectedTick: this.world()?.tick ?? 0 }, true);
  }
  toggleWorldPause() {
    this.apply({ type: "world.pauseToggled" });
  }
  navigate(view) {
    const state = this.state();
    if (state.status === "event_pending" && view !== "events" && view !== "ledger" && view !== "teacher") {
      this.errors.set(["Resolve the current event before returning to trading or travel."]);
      return;
    }
    if ((view === "results" || view === "showcase") && state.status !== "season_complete" && state.status !== "submitted") {
      this.errors.set(["Results and the showcase unlock when the trading season is complete."]);
      return;
    }
    if (view === "setup" && state.status !== "not_started") {
      view = "market";
    }
    this.apply({ type: "view.changed", view });
  }
  startCompany(companyName, emblemId, transportId) {
    const changed = this.apply({ type: "company.started", companyName, emblemId, transportId });
    if (changed) {
      this.navigate("route");
    }
    return changed;
  }
  commitTrade(lines) {
    return this.apply({ type: "trade.committed", lines });
  }
  inspectMarketStall(stallId) {
    return this.apply({ type: "market.stallInspected", stallId });
  }
  commitRoute(routeId, rationale, forecast) {
    return this.apply({ type: "route.committed", routeId, rationale, forecast });
  }
  planMarketTrade(goodId, direction) {
    this.marketIntent.set({ goodId, direction });
    this.navigate("market");
  }
  takeMarketIntent() {
    const intent = this.marketIntent();
    this.marketIntent.set(void 0);
    return intent;
  }
  advanceTravel(returnView = "events") {
    const changed = this.apply({ type: "travel.advanced" });
    if (changed) {
      const state = this.state();
      this.navigate(state.pendingEventId !== void 0 ? "events" : returnView === "route" ? "route" : state.activeTravel !== void 0 ? "events" : "market");
    }
    return changed;
  }
  resolveEvent(choiceId, reasoning, mathAnswer) {
    return this.apply({ type: "event.resolved", choiceId, reasoning, mathAnswer });
  }
  completeSeason() {
    const changed = this.apply({ type: "season.completed" });
    if (changed) {
      this.navigate("results");
    }
    return changed;
  }
  pinEvidence(reference) {
    return this.apply({ type: "evidence.pinned", reference });
  }
  unpinEvidence(evidenceId) {
    return this.apply({ type: "evidence.unpinned", evidenceId });
  }
  annotateLedger(ledgerEntryId, note) {
    return this.apply({ type: "ledger.annotated", ledgerEntryId, note });
  }
  updateReportSection(sectionId, response, evidenceIds, calculation) {
    return this.apply({
      type: "report.sectionUpdated",
      sectionId,
      response,
      evidenceIds,
      calculation
    });
  }
  submitReport() {
    return this.apply({ type: "report.submitted" });
  }
  teacherPauseToggle() {
    return this.apply({ type: "teacher.pauseToggled" });
  }
  teacherInjectEvent(eventId) {
    const changed = this.apply({ type: "teacher.eventInjected", eventId });
    if (changed) {
      this.navigate("events");
    }
    return changed;
  }
  teacherSkipEvent() {
    return this.apply({ type: "teacher.eventSkipped" });
  }
  teacherSetSeed(seed) {
    return this.apply({ type: "teacher.seedChanged", seed });
  }
  teacherSetDifficulty(difficulty) {
    return this.apply({ type: "teacher.difficultyChanged", difficulty });
  }
  restart() {
    const changed = this.apply({ type: "simulation.restarted" });
    if (changed) {
      this.planning.clear();
      this.navigate("setup");
    }
    return changed;
  }
  clearSavedData() {
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    this.planning.clear();
    this.state.set(createSimulationState(this.config, this.state().seed));
    this.errors.set([]);
    this.saveState.set("saved");
  }
  dismissErrors() {
    this.errors.set([]);
  }
  money(cents, showPlus = false) {
    return formatMoney(cents, showPlus);
  }
  actOnExpedition(cycleId, expectedRevision, action) {
    return this.apply({ type: "expedition.action", cycleId, expectedRevision, action });
  }
  apply(action, background = false) {
    if (!background)
      this.errors.set([]);
    const result = reduceSimulationDecision(this.config, this.state(), action);
    if (result.errors.length > 0) {
      this.errors.set(result.errors);
      return false;
    }
    if (result.state === this.state())
      return false;
    this.state.set(result.state);
    this.persist(result.state);
    return true;
  }
  persist(state) {
    this.saveState.set(typeof navigator !== "undefined" && !navigator.onLine ? "offline_local" : "saving");
    try {
      this.persistence.save(state);
      this.saveState.set(typeof navigator !== "undefined" && !navigator.onLine ? "offline_local" : "saved");
    } catch {
      this.saveState.set("save_failed");
      this.errors.update((errors) => [...errors, "This device could not save the latest change."]);
    }
  }
  static \u0275fac = function SimulationDecisionRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SimulationDecisionRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SimulationDecisionRuntimeService, factory: _SimulationDecisionRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimulationDecisionRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  changeTradePlan,
  SimulationDecisionRuntimeService
};
//# debugId=1167613b-04db-55d9-b5db-a452eb03476c
//# sourceMappingURL=chunk-F6SP4N5W.js.map
