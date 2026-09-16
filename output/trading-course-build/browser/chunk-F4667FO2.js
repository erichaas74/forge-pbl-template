import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import {
  EventRegistry
} from "./chunk-2WXJ5NX3.js";
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

// src/app/templates/time-repair/domain/time-repair.models.ts
var TIME_REPAIR_EVENTS = {
  collect: "timeRepair.evidenceCollected",
  link: "timeRepair.evidenceConnected",
  defend: "timeRepair.defenseRequested",
  jump: "timeRepair.jumpRequested",
  inspect: "timeRepair.objectInspected",
  repair: "timeRepair.repairRequested",
  verify: "timeRepair.verificationSubmitted"
};

// src/app/templates/time-repair/domain/time-repair.engine.ts
var events = new EventRegistry();
for (const id of Object.values(TIME_REPAIR_EVENTS))
  events.register({ id, version: "1.0.0", status: "extension" });
var repairCapabilities = Object.freeze({
  "replace-object": (mission, optionId) => mission.evaluation.repairOptionId === optionId,
  "restore-sequence": (mission, optionId) => mission.evaluation.repairOptionId === optionId
});
function initialTimeRepairState(config) {
  return {
    version: 0,
    collectedIds: [],
    events: [],
    missions: Object.fromEntries(
      config.missions.map((m) => [
        m.id,
        {
          links: [],
          defenses: [],
          authorized: false,
          jumped: false,
          inspectedIds: [],
          attempts: [],
          repaired: false
        }
      ])
    )
  };
}
function chargesRemaining(config, state) {
  return config.settings.repairCharges - Object.values(state.missions).reduce((sum, m) => sum + m.attempts.length, 0);
}
function timelineStability(config, state) {
  const gain = config.missions.reduce(
    (sum, m) => sum + (state.missions[m.id].repaired ? m.stabilityValue * (state.missions[m.id].verification ? 1 : 0.7) : 0),
    0
  );
  const errors = Object.values(state.missions).flatMap((m) => m.attempts).filter((a) => !a.correct).length;
  return Math.round(
    Math.max(
      0,
      Math.min(
        100,
        config.settings.initialStability + gain - errors * config.settings.wrongRepairPenalty
      )
    )
  );
}
function nodeStatus(config, state, nodeId) {
  const mission = config.missions.find((m) => m.nodeId === nodeId);
  if (mission)
    return state.missions[mission.id].verification ? "restored" : state.missions[mission.id].repaired ? "verify" : "anomaly";
  const causes = config.missions.filter((m) => m.ripples.some((r) => r.nodeId === nodeId));
  if (causes.length)
    return causes.every((m) => state.missions[m.id].repaired) ? "restored" : "ripple";
  return config.nodes.find((n) => n.id === nodeId)?.initialStatus ?? "missing";
}
function requireThat(condition, message) {
  if (!condition) throw new Error(message);
}
var writing = (value, min = 20) => typeof value === "string" && value.trim().length >= min && value.length <= 4e3;
function missionContext(config, state, id) {
  const mission = config.missions.find((m) => m.id === id);
  requireThat(
    mission && Object.hasOwn(state.missions, id),
    "REFERENCE_NOT_FOUND: This repair mission is unavailable."
  );
  return [mission, state.missions[id]];
}
function update(state, id, progress, message) {
  return { state: __spreadProps(__spreadValues({}, state), { missions: __spreadProps(__spreadValues({}, state.missions), { [id]: progress }) }), message };
}
var handlers = {
  collect(config, state, action) {
    requireThat(
      config.evidence.some((e) => e.id === action.evidenceId),
      "REFERENCE_NOT_FOUND: Choose a source from the archive."
    );
    return {
      state: state.collectedIds.includes(action.evidenceId) ? state : __spreadProps(__spreadValues({}, state), { collectedIds: [...state.collectedIds, action.evidenceId] }),
      message: "Evidence card saved. Connect it to your claim."
    };
  },
  link(config, state, action) {
    const [, progress] = missionContext(config, state, action.missionId);
    requireThat(!progress.authorized, "MISSION_LOCKED: This defense is already authorized.");
    requireThat(
      state.collectedIds.includes(action.link.evidenceId),
      "EVIDENCE_REQUIRED: Collect this source first."
    );
    requireThat(
      ["supports", "contradicts", "uncertain"].includes(action.link.relationship) && ["developing", "confident"].includes(action.link.confidence) && writing(action.link.note),
      "REASONING_REQUIRED: Explain what this source proves in at least 20 characters."
    );
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), {
        links: [
          ...progress.links.filter((l) => l.evidenceId !== action.link.evidenceId),
          __spreadProps(__spreadValues({}, action.link), { note: action.link.note.trim() })
        ]
      }),
      "Evidence connected to the reported anomaly."
    );
  },
  defend(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(!progress.authorized, "MISSION_LOCKED: Your time jump is already authorized.");
    requireThat(
      mission.prerequisiteMissionIds.every((id) => !!state.missions[id].verification),
      "PREREQUISITE_REQUIRED: Verify the preceding repair first."
    );
    const d = action.defense;
    requireThat(
      mission.categories.includes(d.category) && mission.defense.options.some((o) => o.id === d.answerId),
      "DEFENSE_INCOMPLETE: Classify the signal and answer the archive challenge."
    );
    requireThat(
      [d.claim, d.consequence, d.explanation].every(
        (s) => writing(s, config.settings.minReasoningLength)
      ),
      `REASONING_REQUIRED: Complete each defense field with at least ${config.settings.minReasoningLength} characters.`
    );
    const enoughEvidence = mission.evidenceRequired.every(
      (id) => progress.links.some((l) => l.evidenceId === id && l.relationship === "contradicts")
    );
    const accepted = enoughEvidence && d.category === mission.evaluation.category && d.answerId === mission.evaluation.defenseOptionId;
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), { authorized: accepted, defenses: [...progress.defenses, __spreadProps(__spreadValues({}, d), { accepted })] }),
      accepted ? "System checkpoint passed. Your evidence connections and defense are complete. Time jump authorized; written reasoning remains available for teacher review." : "Revision needed. Check the source dates, what each source contradicts, and whether your conclusion follows from the archive. Your draft has been saved."
    );
  },
  jump(config, state, action) {
    const [, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.authorized && !progress.repaired,
      "DEFENSE_REQUIRED: Complete your evidence defense before entering the scene."
    );
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), { jumped: true }),
      "Jump complete. Inspect the scene before intervening."
    );
  },
  inspect(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(progress.jumped, "JUMP_REQUIRED: Enter this scene first.");
    requireThat(
      config.scenes.find((s) => s.id === mission.sceneId)?.hotspots.some((h) => h.id === action.hotspotId),
      "REFERENCE_NOT_FOUND: This object is not in the scene."
    );
    if (progress.inspectedIds.includes(action.hotspotId)) return { state, message: "" };
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), { inspectedIds: [...progress.inspectedIds, action.hotspotId] }),
      "Inspection recorded."
    );
  },
  repair(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.authorized && progress.jumped && progress.inspectedIds.includes(mission.repair.targetHotspotId),
      "INSPECTION_REQUIRED: Defend the claim, jump, and inspect the affected object first."
    );
    requireThat(!progress.repaired, "ALREADY_REPAIRED: This event is ready for verification.");
    requireThat(
      chargesRemaining(config, state) > 0,
      "INSUFFICIENT_RESOURCE: No repair charges remain. Export your repair log for a debrief."
    );
    requireThat(
      mission.repair.options.some((o) => o.id === action.optionId),
      "INVALID_COMMAND: Select an available repair."
    );
    const correct = repairCapabilities[mission.repair.capability](mission, action.optionId);
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), {
        repaired: correct,
        attempts: [...progress.attempts, { optionId: action.optionId, correct }]
      }),
      correct ? "Repair applied. The downstream branches have changed. Verify why the new sequence is supported." : "That intervention destabilized the timeline. One charge was used. Revisit your sources before another attempt."
    );
  },
  verify(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.repaired && !progress.verification,
      "REPAIR_REQUIRED: Apply a repair before submitting its verification."
    );
    requireThat(
      mission.evidenceRequired.includes(action.evidenceId) && progress.links.some((l) => l.evidenceId === action.evidenceId),
      "EVIDENCE_REQUIRED: Cite a connected source that supports the restored sequence."
    );
    requireThat(
      writing(action.explanation, config.settings.minReasoningLength),
      `REASONING_REQUIRED: Explain the ripple using at least ${config.settings.minReasoningLength} characters.`
    );
    return update(
      state,
      action.missionId,
      __spreadProps(__spreadValues({}, progress), {
        verification: { evidenceId: action.evidenceId, explanation: action.explanation.trim() }
      }),
      "Verification recorded. This timeline repair is complete."
    );
  }
};
function applyTimeRepairAction(config, state, action, event) {
  requireThat(
    Object.hasOwn(handlers, action.type) && event.eventType === TIME_REPAIR_EVENTS[action.type] && event.projectId === config.projectId && !!event.clientEventId,
    "INVALID_EVENT: The repair request does not match this project."
  );
  if (state.events.some((e) => e.clientEventId === event.clientEventId))
    return { state, message: "This request has already been recorded." };
  requireThat(
    state.events.length < 1e3,
    "HISTORY_LIMIT: Export your case file; this pilot has reached its record limit."
  );
  const handler = handlers[action.type];
  const result = handler(config, state, action);
  if (result.state === state) return result;
  return __spreadProps(__spreadValues({}, result), {
    state: __spreadProps(__spreadValues({}, result.state), {
      version: state.version + 1,
      events: [...state.events, __spreadProps(__spreadValues({}, event), { payload: { action: structuredClone(action) } })]
    })
  });
}

// src/app/templates/time-repair/runtime/time-repair.runtime.ts
var TIME_REPAIR_CONFIG = new InjectionToken("TIME_REPAIR_CONFIG");
var TIME_REPAIR_SESSION = new InjectionToken("TIME_REPAIR_SESSION");
var TIME_REPAIR_PERSISTENCE = new InjectionToken("TIME_REPAIR_PERSISTENCE");
var TimeRepairRuntime = class _TimeRepairRuntime {
  config = inject(TIME_REPAIR_CONFIG);
  session = inject(TIME_REPAIR_SESSION);
  persistence = inject(TIME_REPAIR_PERSISTENCE);
  current = signal(
    initialTimeRepairState(this.config),
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  savedVersion = 0;
  state = this.current.asReadonly();
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storageNotice = signal(
    "Progress saved on this device",
    ...ngDevMode ? [{ debugName: "storageNotice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stability = computed(
    () => timelineStability(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "stability" }] : (
      /* istanbul ignore next */
      []
    )
  );
  charges = computed(
    () => chargesRemaining(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "charges" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = computed(
    () => this.config.missions.every((m) => !!this.state().missions[m.id].verification),
    ...ngDevMode ? [{ debugName: "completed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.session.authorityMode !== "localDemo")
      throw new Error("CAPABILITY_NOT_INSTALLED: Time Repair requires a classroom authority adapter for shared or graded sessions.");
    try {
      this.current.set(this.persistence.load() ?? initialTimeRepairState(this.config));
      this.savedVersion = this.current().version;
    } catch {
      this.storageNotice.set("Saved progress could not be read. Keep this page open and export your case file.");
    }
    if (!this.persistence.available)
      this.storageNotice.set("Storage unavailable \xB7 progress lasts for this visit");
  }
  dispatch(action, requestId = crypto.randomUUID()) {
    const previous = this.state();
    try {
      const result = applyTimeRepairAction(this.config, previous, action, {
        id: requestId,
        clientEventId: requestId,
        eventType: TIME_REPAIR_EVENTS[action.type],
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        tenantId: this.session.tenantId,
        projectId: this.config.projectId,
        attemptId: this.session.attemptId,
        actor: { type: "student", id: this.session.actorId }
      });
      if (result.state !== previous) {
        try {
          this.persistence.save(result.state, this.savedVersion);
          this.savedVersion = result.state.version;
          if (this.persistence.available)
            this.storageNotice.set("Progress saved on this device");
        } catch (error) {
          if (error instanceof Error && error.message.startsWith("STATE_CONFLICT")) {
            if (previous.version !== this.savedVersion) {
              throw new Error("STATE_CONFLICT: Another tab changed this exercise. Your unsaved local work is still here. Export your case file before reloading.");
            }
            this.current.set(this.persistence.load() ?? previous);
            this.savedVersion = this.current().version;
            throw error;
          }
          this.storageNotice.set("Save failed \xB7 keep this page open and export your case file");
        }
        this.current.set(result.state);
      }
      this.message.set(result.message);
      return true;
    } catch (error) {
      this.message.set(error instanceof Error ? error.message : "The repair request could not be recorded.");
      return false;
    }
  }
  caseFile() {
    return JSON.stringify({
      title: this.config.title,
      projectId: this.config.projectId,
      projectVersion: this.config.projectVersion,
      mode: "local pilot; written reasoning requires teacher review",
      stability: this.stability(),
      remainingCharges: this.charges(),
      evidence: this.config.evidence.filter((e) => this.state().collectedIds.includes(e.id)),
      repairLog: this.state().missions,
      history: this.state().events
    }, null, 2);
  }
  static \u0275fac = function TimeRepairRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimeRepairRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TimeRepairRuntime, factory: _TimeRepairRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeRepairRuntime, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/time-repair/domain/time-repair-preview.validation.ts
function validateRepairPreview(value, config) {
  const fail = (path) => {
    throw new Error(`INVALID_TIME_REPAIR_PACKAGE: previewWeeks.${path}`);
  };
  const obj = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : fail("object");
  const list = (v) => Array.isArray(v) && v.length > 0 && v.length <= 30 ? v : fail("list");
  const text = (v) => typeof v === "string" && v.trim().length > 0 && v.length <= 8e3;
  const texts = (v) => {
    if (!list(v).every(text)) fail("text");
  };
  const refs = (v, ids2) => {
    const items = list(v);
    if (new Set(items).size !== items.length || !items.every((id) => typeof id === "string" && ids2.includes(id)))
      fail("references");
  };
  const p = obj(value);
  if (p["version"] !== "1.0") fail("version");
  const images = list(p["illustrations"]).map(obj);
  for (const i of images) {
    if (!["id", "title", "src", "alt", "caption"].every((key) => text(i[key])))
      fail("illustration");
    if (!/^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(String(i["src"])))
      fail("local image");
  }
  if (new Set(images.map((i) => i["id"])).size !== images.length) fail("duplicate image");
  const panels = list(p["sampleExhibit"]).map(obj);
  for (const panel of panels) {
    if (!["id", "title", "caption"].every((key) => text(panel[key]))) fail("panel text");
    if (!images.some((i) => i["id"] === panel["imageId"]) || !config.evidence.some((e) => e.id === panel["evidenceId"]))
      fail("panel reference");
  }
  if (new Set(panels.map((panel) => panel["id"])).size !== panels.length) fail("duplicate panel");
  const weeks = list(p["weeks"]).map(obj);
  if (weeks.length !== 4) fail("four weeks required");
  const ids = /* @__PURE__ */ new Set();
  weeks.forEach((w, index) => {
    if (w["week"] !== index + 1 || !text(w["title"])) fail("week");
    ["questions", "evidence", "controls"].forEach((key) => texts(w[key]));
    const sessions = list(w["sessions"]).map(obj);
    if (sessions.length !== 2) fail("two sessions required");
    for (const s of sessions) {
      if (!["id", "title", "action", "change", "check", "product"].every((key) => text(s[key])))
        fail("session text");
      if (ids.has(String(s["id"]))) fail("duplicate session");
      ids.add(String(s["id"]));
      if (![
        "inspect",
        "repair",
        "sequence",
        "sources",
        "ripple",
        "compare",
        "exhibit",
        "tour"
      ].includes(String(s["mode"])))
        fail("CAPABILITY_NOT_INSTALLED: mode");
      if (!config.missions.some((m) => m.id === s["missionId"])) fail("mission reference");
      if (s["imageId"] !== void 0 && !images.some((image) => image["id"] === s["imageId"]))
        fail("session image reference");
      refs(
        s["nodeIds"],
        config.nodes.map((n) => n.id)
      );
      refs(
        s["evidenceIds"],
        config.evidence.map((e) => e.id)
      );
    }
  });
}
function validRepairPreviewDraft(value, config, sessionId) {
  if (!value || typeof value !== "object") return false;
  const d = value;
  const s = config.previewWeeks?.weeks.flatMap((w) => w.sessions).find((s2) => s2.id === sessionId);
  const m = config.missions.find((m2) => m2.id === s?.missionId);
  const scene = config.scenes.find((scene2) => scene2.id === m?.sceneId);
  const unique = (items) => Array.isArray(items) && items.every((i) => typeof i === "string") && new Set(items).size === items.length;
  const short = (v) => typeof v === "string" && v.length <= 8e3;
  if (!s || !m || !scene || !unique(d.inspectedIds) || !d.inspectedIds.every((id) => scene.hotspots.some((h) => h.id === id)))
    return false;
  if (!unique(d.nodeIds) || d.nodeIds.length !== s.nodeIds.length || !d.nodeIds.every((id) => s.nodeIds.includes(id)))
    return false;
  if (!d.links || typeof d.links !== "object" || Array.isArray(d.links) || !Object.entries(d.links).every(
    ([id, source]) => s.nodeIds.includes(id) && (source === "" || s.evidenceIds.includes(source))
  ))
    return false;
  if (d.optionId !== "" && !m.repair.options.some((o) => o.id === d.optionId)) return false;
  if (!Array.isArray(d.trials) || d.trials.length > 30 || !d.trials.every(
    (t) => t && Number.isInteger(t.id) && t.id > 0 && m.repair.options.some((o) => o.id === t.optionId) && t.supported === (t.optionId === m.evaluation.repairOptionId)
  ))
    return false;
  const sample = config.previewWeeks.sampleExhibit;
  return Array.isArray(d.panels) && d.panels.length === sample.length && new Set(d.panels.map((p) => p?.id)).size === sample.length && d.panels.every(
    (p) => p && sample.some((item) => item.id === p.id) && short(p.title) && short(p.caption) && config.previewWeeks.illustrations.some((i) => i.id === p.imageId) && (p.evidenceId === "" || config.evidence.some((e) => e.id === p.evidenceId))
  );
}

// src/app/templates/time-repair/runtime/time-repair-preview.persistence.ts
var BrowserRepairPreviewPersistence = class {
  constructor(config, session, storage = safeBrowserStorage()) {
    this.config = config;
    this.session = session;
    this.storage = storage;
    this.available = !!storage;
  }
  config;
  session;
  storage;
  available;
  store(id) {
    return new ScopedBrowserStore(
      "time-repair.weeks.v1",
      this.storage,
      (value) => validRepairPreviewDraft(value, this.config, id)
    );
  }
  load(id) {
    return this.store(id).load(__spreadProps(__spreadValues({}, this.session), { sessionId: id }));
  }
  save(id, draft) {
    this.store(id).save(__spreadProps(__spreadValues({}, this.session), { sessionId: id }), draft);
  }
};

// src/app/templates/time-repair/domain/time-repair-preview.models.ts
function createRepairPreviewDraft(config, session) {
  return {
    inspectedIds: [],
    nodeIds: [...session.nodeIds],
    links: {},
    optionId: "",
    trials: [],
    panels: structuredClone(config.previewWeeks?.sampleExhibit ?? [])
  };
}
function moveRepairItem(items, index, offset) {
  const target = index + offset;
  if (!Number.isInteger(index) || !Number.isInteger(target) || index < 0 || index >= items.length || target < 0 || target >= items.length)
    return items;
  const copy = [...items];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}
function chronologyConflicts(config, ids) {
  const order = new Map(config.nodes.map((node) => [node.id, node]));
  return ids.slice(1).flatMap((id, index) => {
    const previous = order.get(ids[index]);
    const current = order.get(id);
    return previous && current && previous.order > current.order ? [`${previous.dateLabel} comes after ${current.dateLabel}. Move \u201C${current.title}\u201D earlier.`] : [];
  });
}

// src/app/templates/time-repair/runtime/time-repair-preview.runtime.ts
var TIME_REPAIR_FINAL_EXAMPLE = new InjectionToken("TIME_REPAIR_FINAL_EXAMPLE");
var REPAIR_PREVIEW_PERSISTENCE = new InjectionToken("REPAIR_PREVIEW_PERSISTENCE", {
  factory: () => new BrowserRepairPreviewPersistence(inject(TIME_REPAIR_CONFIG), inject(TIME_REPAIR_SESSION))
});
var RepairPreviewRuntime = class _RepairPreviewRuntime {
  config = inject(TIME_REPAIR_CONFIG);
  example = inject(TIME_REPAIR_FINAL_EXAMPLE, { optional: true }) ?? false;
  context = inject(TIME_REPAIR_SESSION);
  persistence = inject(REPAIR_PREVIEW_PERSISTENCE);
  weeks = this.config.previewWeeks.weeks;
  lesson = signal(
    this.example ? 8 : 1,
    ...ngDevMode ? [{ debugName: "lesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => this.weeks[Math.floor((this.lesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.week().sessions[(this.lesson() - 1) % 2],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mission = computed(
    () => this.config.missions.find((m) => m.id === this.session().missionId),
    ...ngDevMode ? [{ debugName: "mission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = computed(
    () => this.config.scenes.find((s) => s.id === this.mission().sceneId),
    ...ngDevMode ? [{ debugName: "scene" }] : (
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
  draft = computed(
    () => this.drafts()[this.session().id],
    ...ngDevMode ? [{ debugName: "draft" }] : (
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
  saveStatus = signal(
    "",
    ...ngDevMode ? [{ debugName: "saveStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeHotspot = signal(
    "",
    ...ngDevMode ? [{ debugName: "activeHotspot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "sourceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rippleIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "rippleIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panelIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "panelIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "replayId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trial = computed(
    () => this.draft()?.trials.find((t) => t.id === this.replayId()) ?? this.draft()?.trials.at(-1),
    ...ngDevMode ? [{ debugName: "trial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSource = computed(
    () => this.config.evidence.find((e) => e.id === this.sourceId()),
    ...ngDevMode ? [{ debugName: "selectedSource" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePanel = computed(
    () => this.draft().panels[this.panelIndex()],
    ...ngDevMode ? [{ debugName: "activePanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  illustration = computed(
    () => this.config.previewWeeks.illustrations.find((i) => i.id === this.session().imageId) ?? this.config.previewWeeks.illustrations[0],
    ...ngDevMode ? [{ debugName: "illustration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.context.mode !== "preview" || this.context.authorityMode !== "localDemo" || !this.config.previewWeeks)
      throw new Error("CAPABILITY_NOT_INSTALLED: Weekly authoring requires a configured local preview.");
    this.open(this.lesson());
  }
  open(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8 || this.example && number !== 8)
      return;
    if (this.draft())
      this.save();
    this.lesson.set(number);
    const id = this.session().id;
    if (!this.drafts()[id]) {
      let saved;
      try {
        if (!this.example)
          saved = this.persistence.load(id);
      } catch {
        this.saveStatus.set("Saved draft unavailable; changes stay in this visit.");
      }
      this.drafts.update((d) => __spreadProps(__spreadValues({}, d), {
        [id]: saved ?? createRepairPreviewDraft(this.config, this.session())
      }));
    }
    this.activeHotspot.set("");
    this.sourceId.set("");
    this.rippleIndex.set(0);
    this.panelIndex.set(0);
    this.replayId.set(void 0);
    this.message.set("");
  }
  ngOnDestroy() {
    this.save();
  }
  patch(patch, persist = true) {
    if (this.example)
      return;
    this.drafts.update((d) => __spreadProps(__spreadValues({}, d), { [this.session().id]: __spreadValues(__spreadValues({}, this.draft()), patch) }));
    if (persist)
      this.save();
  }
  save() {
    if (this.example || !this.draft())
      return;
    try {
      this.persistence.save(this.session().id, this.draft());
      this.saveStatus.set(this.persistence.available ? "Draft saved on this device" : "Storage unavailable \xB7 draft lasts for this visit");
    } catch {
      this.saveStatus.set("Could not save \xB7 keep this page open or download the exhibit");
    }
  }
  inspect(id) {
    if (!this.scene().hotspots.some((h) => h.id === id))
      return;
    this.activeHotspot.set(id);
    if (!this.draft().inspectedIds.includes(id))
      this.patch({ inspectedIds: [...this.draft().inspectedIds, id] });
  }
  selectOption(id) {
    if (id !== "" && !this.mission().repair.options.some((o) => o.id === id))
      return;
    this.patch({ optionId: id });
    this.replayId.set(void 0);
    this.message.set(id ? "Choice ready. Run the repair test to see its effect." : "Choose an intervention before running the repair test.");
  }
  run() {
    const option = this.mission().repair.options.find((o) => o.id === this.draft().optionId);
    if (!option) {
      this.message.set("Choose an intervention before running the repair test.");
      return;
    }
    const supported = repairCapabilities[this.mission().repair.capability](this.mission(), option.id);
    const id = (this.draft().trials.at(-1)?.id ?? 0) + 1;
    this.patch({
      trials: [...this.draft().trials, { id, optionId: option.id, supported }].slice(-30)
    });
    this.replayId.set(id);
    this.message.set(supported ? "Repair applied in this trial. Replay it or choose another intervention to compare." : "This choice leaves a conflict with the source-based repair. Compare the source evidence, then try another choice.");
  }
  moveNode(index, offset) {
    this.patch({ nodeIds: moveRepairItem(this.draft().nodeIds, index, offset) });
    this.message.set("Order changed. Check the sequence again to refresh the date feedback.");
  }
  checkSequence() {
    const conflicts = chronologyConflicts(this.config, this.draft().nodeIds);
    this.message.set(conflicts.length ? conflicts.join(" ") : "The dates run from earlier to later. This checks order only; sources are still needed to support each claim.");
  }
  link(nodeId, evidenceId) {
    if (!this.session().nodeIds.includes(nodeId) || evidenceId !== "" && !this.session().evidenceIds.includes(evidenceId))
      return;
    this.patch({ links: __spreadProps(__spreadValues({}, this.draft().links), { [nodeId]: evidenceId }) });
    this.sourceId.set(evidenceId);
    this.message.set(evidenceId ? "Source attached. Read its limits beside the timeline; a link does not automatically prove a claim." : "Source link removed.");
  }
  editPanel(patch) {
    this.patch({
      panels: this.draft().panels.map((panel, i) => i === this.panelIndex() ? __spreadValues(__spreadValues({}, panel), patch) : panel)
    }, false);
  }
  movePanel(offset) {
    const index = this.panelIndex();
    const panels = moveRepairItem(this.draft().panels, index, offset);
    if (panels === this.draft().panels)
      return;
    this.patch({ panels });
    this.panelIndex.set(index + offset);
  }
  download() {
    this.save();
    const data = {
      title: this.config.title,
      label: "Local exhibit draft; no assessment or completion recorded",
      panels: this.draft().panels,
      illustrations: this.config.previewWeeks.illustrations,
      sources: this.config.evidence
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.config.projectId}-exhibit-draft.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function RepairPreviewRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairPreviewRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RepairPreviewRuntime, factory: _RepairPreviewRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairPreviewRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  repairCapabilities,
  initialTimeRepairState,
  nodeStatus,
  applyTimeRepairAction,
  validateRepairPreview,
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_SESSION,
  TIME_REPAIR_PERSISTENCE,
  TimeRepairRuntime,
  BrowserRepairPreviewPersistence,
  TIME_REPAIR_FINAL_EXAMPLE,
  REPAIR_PREVIEW_PERSISTENCE,
  RepairPreviewRuntime
};
//# debugId=c476982c-2d35-503c-84a8-cc549ff391a5
//# sourceMappingURL=chunk-F4667FO2.js.map
