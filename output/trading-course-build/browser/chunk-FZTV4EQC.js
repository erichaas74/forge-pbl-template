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

// src/app/templates/crisis-operations/domain/crisis.models.ts
var CRISIS_EVENTS = {
  advance: "crisis.bulletin.received",
  read: "crisis.evidence.viewed",
  share: "crisis.evidence.shared",
  unshare: "crisis.evidence.unpinned",
  role: "crisis.station.selected",
  decide: "crisis.decision.committed"
};

// src/app/templates/crisis-operations/domain/crisis-engine.ts
function initialCrisisState(config) {
  return {
    version: 0,
    stage: 0,
    roleId: config.roles[0].id,
    sharedEvidenceIds: [],
    readEvidenceIds: [],
    decisions: [],
    events: []
  };
}
function visibleEvidence(config, state) {
  const ordered = new Set(state.decisions.map((d) => d.actionId));
  return config.evidence.filter(
    (e) => e.stage <= state.stage && (!e.requiresActionId || ordered.has(e.requiresActionId)) && (!e.excludesActionId || !ordered.has(e.excludesActionId)) && (!e.roleIds.length || e.roleIds.includes(state.roleId) || state.sharedEvidenceIds.includes(e.id))
  );
}
function availableCrews(config, state) {
  return config.crews - state.decisions.reduce(
    (sum, decision) => sum + (config.actions.find((a) => a.id === decision.actionId)?.crews ?? 0),
    0
  );
}
function actionBlockedReason(config, state, action) {
  if (state.decisions.some((d) => d.actionId === action.id)) return "Order already dispatched";
  if (action.minStage > state.stage) return "Awaiting field assessment";
  if (action.expiresAtStage !== void 0 && state.stage >= action.expiresAtStage)
    return "Response window has closed";
  if (availableCrews(config, state) < action.crews) return "Not enough available crews";
  return void 0;
}
var handlers = {
  [CRISIS_EVENTS.advance]: (config, state) => __spreadProps(__spreadValues({}, state), {
    stage: Math.min(state.stage + 1, config.bulletins.length - 1)
  }),
  [CRISIS_EVENTS.role]: (config, state, event) => {
    const roleId = String(event.payload?.["roleId"]);
    if (!config.roles.some((role) => role.id === roleId))
      throw new Error("INVALID_ROLE: Unknown specialist station.");
    return __spreadProps(__spreadValues({}, state), { roleId });
  },
  [CRISIS_EVENTS.read]: (config, state, event) => {
    const id = requireEvidence(config, state, event);
    return __spreadProps(__spreadValues({}, state), { readEvidenceIds: [.../* @__PURE__ */ new Set([...state.readEvidenceIds, id])] });
  },
  [CRISIS_EVENTS.share]: (config, state, event) => {
    const id = requireEvidence(config, state, event);
    if (!state.readEvidenceIds.includes(id))
      throw new Error("EVIDENCE_NOT_REVIEWED: Open the report before pinning it.");
    if (state.sharedEvidenceIds.includes(id)) return state;
    if (state.sharedEvidenceIds.length >= config.evidenceLimit)
      throw new Error("BRIEFING_FULL: Unpin a report to make room on the situation table.");
    return __spreadProps(__spreadValues({}, state), { sharedEvidenceIds: [...state.sharedEvidenceIds, id] });
  },
  [CRISIS_EVENTS.unshare]: (_config, state, event) => __spreadProps(__spreadValues({}, state), {
    sharedEvidenceIds: state.sharedEvidenceIds.filter((id) => id !== event.payload?.["evidenceId"])
  }),
  [CRISIS_EVENTS.decide]: (config, state, event) => {
    const action = config.actions.find((a) => a.id === event.payload?.["actionId"]);
    if (!action) throw new Error("INVALID_COMMAND: Unknown response order.");
    const reason = actionBlockedReason(config, state, action);
    if (reason) throw new Error(`ORDER_UNAVAILABLE: ${reason}.`);
    const ids = event.payload?.["evidenceIds"];
    if (!Array.isArray(ids) || !ids.length || !ids.every((id) => typeof id === "string" && state.sharedEvidenceIds.includes(id))) {
      throw new Error("EVIDENCE_REQUIRED: Attach a report from the situation table.");
    }
    return __spreadProps(__spreadValues({}, state), {
      decisions: [
        ...state.decisions,
        {
          actionId: action.id,
          evidenceIds: [...new Set(ids)],
          minute: config.bulletins[state.stage].minute,
          stage: state.stage
        }
      ]
    });
  }
};
function reduceCrisisEvent(config, state, event) {
  if (event.projectId !== config.projectId)
    throw new Error("PROJECT_ID_MISMATCH: Event belongs to a different exercise.");
  if (state.events.some(
    (e) => e.id === event.id || !!event.clientEventId && e.clientEventId === event.clientEventId
  ))
    return state;
  const handler = handlers[event.eventType];
  if (!handler) throw new Error("CAPABILITY_NOT_INSTALLED: Unregistered crisis event.");
  const next = handler(config, state, event);
  if (next === state) return state;
  return __spreadProps(__spreadValues({}, next), { version: state.version + 1, events: [...state.events, event].slice(-300) });
}
function requireEvidence(config, state, event) {
  const id = String(event.payload?.["evidenceId"]);
  if (!visibleEvidence(config, state).some((e) => e.id === id))
    throw new Error("EVIDENCE_UNAVAILABLE: Report has not reached this station.");
  return id;
}
function crisisForecast(config, state) {
  const bulletin = config.bulletins[state.stage];
  const actions = state.decisions.map((d) => config.actions.find((a) => a.id === d.actionId));
  return {
    risk: Math.max(5, bulletin.risk - actions.reduce((sum, a) => sum + a.riskReduction, 0)),
    protected: actions.reduce((sum, a) => sum + a.protects, 0),
    affected: bulletin.affected
  };
}

// src/app/templates/crisis-operations/runtime/crisis-runtime.service.ts
var CRISIS_CONFIG = new InjectionToken("CRISIS_CONFIG");
var CRISIS_SESSION = new InjectionToken("CRISIS_SESSION");
var CRISIS_PERSISTENCE = new InjectionToken("CRISIS_PERSISTENCE");
var CrisisRuntimeService = class _CrisisRuntimeService {
  config = inject(CRISIS_CONFIG);
  session = inject(CRISIS_SESSION);
  persistence = inject(CRISIS_PERSISTENCE);
  state = signal(
    initialCrisisState(this.config),
    ...ngDevMode ? [{ debugName: "state" }] : (
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
  storageNotice = signal(
    "",
    ...ngDevMode ? [{ debugName: "storageNotice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bulletin = computed(
    () => this.config.bulletins[this.state().stage],
    ...ngDevMode ? [{ debugName: "bulletin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reports = computed(
    () => [...visibleEvidence(this.config, this.state())].sort((a, b) => b.minute - a.minute),
    ...ngDevMode ? [{ debugName: "reports" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shared = computed(
    () => this.state().sharedEvidenceIds.map((id) => this.config.evidence.find((e) => e.id === id)),
    ...ngDevMode ? [{ debugName: "shared" }] : (
      /* istanbul ignore next */
      []
    )
  );
  crews = computed(
    () => availableCrews(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "crews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  forecast = computed(
    () => crisisForecast(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "forecast" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finished = computed(
    () => this.state().stage === this.config.bulletins.length - 1,
    ...ngDevMode ? [{ debugName: "finished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  role = computed(
    () => this.config.roles.find((r) => r.id === this.state().roleId),
    ...ngDevMode ? [{ debugName: "role" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unread = computed(
    () => this.reports().filter((e) => !this.state().readEvidenceIds.includes(e.id)).length,
    ...ngDevMode ? [{ debugName: "unread" }] : (
      /* istanbul ignore next */
      []
    )
  );
  orders = computed(
    () => this.state().decisions.map((d) => __spreadProps(__spreadValues({}, d), {
      action: this.config.actions.find((a) => a.id === d.actionId)
    })).reverse(),
    ...ngDevMode ? [{ debugName: "orders" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    try {
      this.state.set(this.persistence.load() ?? initialCrisisState(this.config));
    } catch {
      this.storageNotice.set("Previous exercise could not be restored.");
    }
    if (!this.persistence.available)
      this.storageNotice.set("Storage unavailable \xB7 changes last for this visit.");
  }
  time(minute = this.bulletin().minute) {
    return `${String((this.config.startHour + Math.floor(minute / 60)) % 24).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
  }
  blocked(action) {
    return actionBlockedReason(this.config, this.state(), action);
  }
  advance() {
    if (this.finished())
      return false;
    return this.dispatch(CRISIS_EVENTS.advance, {});
  }
  read(evidenceId) {
    if (!this.state().readEvidenceIds.includes(evidenceId))
      this.dispatch(CRISIS_EVENTS.read, { evidenceId });
  }
  share(evidenceId) {
    return this.dispatch(CRISIS_EVENTS.share, { evidenceId });
  }
  unshare(evidenceId) {
    this.dispatch(CRISIS_EVENTS.unshare, { evidenceId });
  }
  selectRole(roleId) {
    this.dispatch(CRISIS_EVENTS.role, { roleId });
  }
  commit(actionId, evidenceIds) {
    return this.dispatch(CRISIS_EVENTS.decide, { actionId, evidenceIds });
  }
  reset() {
    this.state.set(initialCrisisState(this.config));
    this.message.set("Exercise reset. All crews are ready.");
    this.save();
  }
  dispatch(eventType, payload) {
    const id = crypto.randomUUID();
    const event = {
      id,
      clientEventId: id,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      tenantId: this.session.tenantId,
      projectId: this.config.projectId,
      actor: { type: "student", id: this.session.actorId },
      payload
    };
    try {
      this.state.set(reduceCrisisEvent(this.config, this.state(), event));
      this.message.set("");
      this.save();
      return true;
    } catch (error) {
      this.message.set(error instanceof Error ? error.message.split(": ").slice(1).join(": ") : "Unable to apply this order.");
      return false;
    }
  }
  save() {
    try {
      this.persistence.save(this.state());
    } catch {
      this.storageNotice.set("Save unavailable \xB7 keep this room open to preserve the current response.");
    }
  }
  static \u0275fac = function CrisisRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CrisisRuntimeService, factory: _CrisisRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  visibleEvidence,
  availableCrews,
  actionBlockedReason,
  crisisForecast,
  CRISIS_CONFIG,
  CRISIS_SESSION,
  CRISIS_PERSISTENCE,
  CrisisRuntimeService
};
//# debugId=d6b1a47c-73bb-5fb2-847f-2cd32901fb36
//# sourceMappingURL=chunk-FZTV4EQC.js.map
