import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import {
  CapabilityRegistry,
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

// src/app/templates/time-repair/invention/invention.models.ts
var INVENTION_EVENTS = {
  prepare: "inventionRepair.pressPrepared",
  proof: "inventionRepair.proofPulled",
  sample: "inventionRepair.materialTested",
  flow: "inventionRepair.productionAdvanced"
};

// src/app/templates/time-repair/invention/printing-press.engine.ts
var inventionEvents = new EventRegistry();
for (const id of Object.values(INVENTION_EVENTS))
  inventionEvents.register({ id, version: "1.0.0", status: "extension" });
var inventionCapabilities = new CapabilityRegistry();
inventionCapabilities.register({
  id: "invention-repair.printing-press",
  version: "1.0.0",
  status: "extension",
  renderer: "invention-workspace",
  eventsProduced: Object.values(INVENTION_EVENTS)
});
function initialInventionState() {
  return {
    version: 0,
    trials: [],
    samples: [],
    preparation: { inked: false, paperLoaded: false },
    flow: { strokes: 0, sheets: 0, finished: 0, delivered: 0, inspected: [], supplied: 0 },
    events: []
  };
}
function validPressSettings(value, project, session) {
  if (!value || typeof value !== "object") return false;
  const s = value;
  return Array.isArray(s.type) && s.type.length === session.target.length && [...s.type].sort().join("") === [...session.target].sort().join("") && project.inventionRescue.inks.some((i) => i.id === s.ink) && Number.isInteger(s.pressure) && s.pressure >= 0 && s.pressure <= 2 && Array.isArray(s.packing) && s.packing.length === 3 && s.packing.every((n) => Number.isInteger(n) && n >= 0 && n <= 2);
}
function pullProof(project, session, settings, id) {
  const ink = project.inventionRescue.inks.find((i) => i.id === settings.ink);
  const pressure = [0.38, 1, 1.08][settings.pressure];
  const coverage = settings.packing.map(
    (p) => Math.min(1, ink.adhesion * pressure * [0.32, 1, 0.7][p])
  );
  const spread = Math.min(
    1,
    ink.spread + (settings.pressure === 2 ? 0.42 : 0) + (settings.packing.includes(2) ? 0.25 : 0)
  );
  const text = [...settings.type].reverse().join("");
  const fault = text !== session.target ? "type" : ink.adhesion < 0.8 || ink.spread > 0.2 ? "ink" : settings.pressure !== 1 ? "pressure" : settings.packing.some((p) => p !== 1) ? "packing" : "none";
  return {
    id,
    settings: structuredClone(settings),
    text,
    coverage,
    spread,
    usable: fault === "none",
    fault
  };
}
function consecutiveGoodProofs(state) {
  let count = 0;
  for (let i = state.trials.length - 1; i >= 0 && state.trials[i].usable; i--) count++;
  return count;
}
function batchReady(state, session) {
  return consecutiveGoodProofs(state) >= session.batchSize;
}
function applyInventionAction(project, session, state, action, event) {
  const unchanged = (message2) => ({ state, message: message2 });
  if (state.events.some(
    (e) => e.id === event.id || !!event.clientEventId && e.clientEventId === event.clientEventId
  ))
    return unchanged("This action is already in the notebook.");
  if (!inventionEvents.has(event.eventType) || event.eventType !== INVENTION_EVENTS[action.type] || event.projectId !== project.projectId || event.sourceId !== session.id)
    return unchanged("INVALID_INVENTION_EVENT");
  if (state.events.length >= 400)
    return unchanged(
      "This session\u2019s notebook is full. Export it from the task box before starting a fresh attempt."
    );
  let next = state;
  let message = "";
  if (action.type === "prepare") {
    if (session.mode !== "reference" || !["ink", "paper"].includes(action.part))
      return unchanged("PREPARATION_UNAVAILABLE");
    if (action.part === "ink" && state.preparation.paperLoaded)
      return unchanged("The sheet covers the type. Lift it before applying ink.");
    next = __spreadProps(__spreadValues({}, state), {
      preparation: action.part === "ink" ? __spreadProps(__spreadValues({}, state.preparation), { inked: true }) : __spreadProps(__spreadValues({}, state.preparation), { paperLoaded: !state.preparation.paperLoaded })
    });
    message = action.part === "ink" ? "Ink now coats the raised type. Place a sheet over it." : next.preparation.paperLoaded ? "Paper is in place. Pull the press to test the impression." : "The sheet is lifted. The type is exposed again.";
  } else if (action.type === "proof") {
    if (session.mode === "courtyard" || !validPressSettings(action.settings, project, session))
      return unchanged("INVALID_PRESS_SETTINGS");
    if (session.mode === "reference" && !state.preparation.paperLoaded)
      return unchanged("The press bed has no sheet. Ink the type and place paper over it.");
    const uninked = session.mode === "reference" && !state.preparation.inked;
    const trial = pullProof(project, session, action.settings, (state.trials.at(-1)?.id ?? 0) + 1);
    const proof = uninked ? __spreadProps(__spreadValues({}, trial), { coverage: [0, 0, 0], usable: false, fault: "ink" }) : trial;
    next = __spreadProps(__spreadValues({}, state), {
      preparation: { inked: false, paperLoaded: false },
      trials: [...state.trials, proof].slice(-60)
    });
    message = uninked ? "A blank sheet. Pressure cannot print letters without ink on the type." : proof.usable ? "Clean impression. Compare it with your earlier sheets." : {
      type: "The impression differs from the reference. Inspect the order of the type.",
      ink: "The ink leaves an uneven or spreading impression. Compare your material tests.",
      pressure: "The impression is too faint or spreads under pressure.",
      packing: "One region prints differently. Inspect support beneath the forme.",
      none: ""
    }[proof.fault];
  } else if (action.type === "sample") {
    if (session.mode !== "ink") return unchanged("MATERIAL_TEST_UNAVAILABLE");
    const ink = project.inventionRescue.inks.find((i) => i.id === action.ink);
    if (!ink || !["paper", "metal"].includes(action.surface))
      return unchanged("INVALID_MATERIAL_SAMPLE");
    const sample = {
      ink: ink.id,
      surface: action.surface,
      adhesion: action.surface === "metal" ? ink.adhesion : ink.paperAdhesion,
      spread: ink.spread
    };
    next = __spreadProps(__spreadValues({}, state), { samples: [...state.samples, sample].slice(-18) });
    message = `${ink.name} on ${action.surface}: ${sample.adhesion < 0.5 ? "broken coverage" : sample.spread > 0.2 ? "spreading edges" : "even coverage"}.`;
  } else if (action.type === "flow") {
    if (!["courtyard", "return"].includes(session.mode) || !["scribe", "binder", "courier", "patron"].includes(action.station))
      return unchanged("INVALID_WORKSHOP_STATION");
    let flow = __spreadProps(__spreadValues({}, state.flow), {
      inspected: [.../* @__PURE__ */ new Set([...state.flow.inspected, action.station])]
    });
    const available = session.mode === "return" && batchReady(state, session) ? state.trials.filter((t) => t.usable).length : 0;
    if (available > flow.supplied)
      flow = __spreadProps(__spreadValues({}, flow), { sheets: flow.sheets + available - flow.supplied, supplied: available });
    if (action.station === "scribe") {
      const strokes = flow.strokes + 1;
      flow = __spreadProps(__spreadValues({}, flow), { strokes, sheets: flow.sheets + (strokes % 3 === 0 ? 1 : 0) });
      message = strokes % 3 === 0 ? "A hand-copied sample is ready for the binder." : "The scribe is still copying. Watch the page fill.";
    } else if (action.station === "binder") {
      if (flow.sheets > 0) {
        flow = __spreadProps(__spreadValues({}, flow), { sheets: flow.sheets - 1, finished: flow.finished + 1 });
        message = "A sample copy is finished and ready to send.";
      } else message = "The binder has covers, but no pages. Follow the missing supply.";
    } else if (action.station === "courier") {
      if (flow.finished > 0) {
        flow = __spreadProps(__spreadValues({}, flow), { finished: flow.finished - 1, delivered: flow.delivered + 1 });
        message = "The messenger leaves with a copy. Another commission still waits.";
      } else message = "The messenger cannot leave with an unfinished copy.";
    } else
      message = "This patron can pay for a copy. The waiting reader still cannot. Printing alone does not remove that barrier.";
    next = __spreadProps(__spreadValues({}, state), { flow });
  }
  return {
    state: __spreadProps(__spreadValues({}, next), { version: state.version + 1, events: [...state.events, event] }),
    message
  };
}

// src/app/templates/time-repair/invention/invention.persistence.ts
function restoreInventionState(project, session, events) {
  let state = initialInventionState();
  try {
    for (const event of events) {
      if (!event || typeof event.id !== "string" || typeof event.timestamp !== "string" || !event.actor || !event.payload?.["action"])
        return void 0;
      const result2 = applyInventionAction(
        project,
        session,
        state,
        event.payload["action"],
        event
      );
      if (result2.state === state) return void 0;
      state = result2.state;
    }
  } catch {
    return void 0;
  }
  return state;
}
var BrowserInventionPersistence = class {
  constructor(project, context, storage = safeBrowserStorage()) {
    this.project = project;
    this.context = context;
    this.storage = storage;
    this.available = !!storage;
  }
  project;
  context;
  storage;
  available;
  store(session) {
    return new ScopedBrowserStore(
      "invention-repair.v1",
      this.storage,
      (value) => {
        if (!value || typeof value !== "object") return false;
        const save = value;
        return validPressSettings(save.settings, this.project, session) && Array.isArray(save.events) && save.events.length <= 400 && save.events.every(
          (e) => e?.tenantId === this.context.tenantId && e?.actor?.id === this.context.actorId
        ) && restoreInventionState(this.project, session, save.events) !== void 0;
      }
    );
  }
  load(session) {
    return this.store(session).load(__spreadProps(__spreadValues({}, this.context), { sessionId: session.id }));
  }
  save(session, save) {
    this.store(session).save(__spreadProps(__spreadValues({}, this.context), { sessionId: session.id }), save);
  }
};

// src/app/templates/time-repair/invention/invention.runtime.ts
var INVENTION_PROJECT = new InjectionToken("INVENTION_PROJECT");
var INVENTION_CONTEXT = new InjectionToken("INVENTION_CONTEXT");
var INVENTION_EXAMPLE = new InjectionToken("INVENTION_EXAMPLE");
var INVENTION_PERSISTENCE = new InjectionToken("INVENTION_PERSISTENCE");
var InventionRuntime = class _InventionRuntime {
  project = inject(INVENTION_PROJECT);
  context = inject(INVENTION_CONTEXT);
  persistence = inject(INVENTION_PERSISTENCE);
  visits = /* @__PURE__ */ new Map();
  example = inject(INVENTION_EXAMPLE, { optional: true }) ?? false;
  content = this.project.inventionRescue;
  number = signal(
    this.example ? 8 : 1,
    ...ngDevMode ? [{ debugName: "number" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.content.sessions[this.number() - 1],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => Math.ceil(this.number() / 2),
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weekContent = computed(
    () => this.content.weeks[this.week() - 1],
    ...ngDevMode ? [{ debugName: "weekContent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = signal(
    initialInventionState(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settings = signal(
    structuredClone(this.session().initial),
    ...ngDevMode ? [{ debugName: "settings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedType = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedType" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedProof = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedProof" }] : (
      /* istanbul ignore next */
      []
    )
  );
  proof = computed(
    () => this.state().trials.find((t) => t.id === this.selectedProof()) ?? this.state().trials.at(-1),
    ...ngDevMode ? [{ debugName: "proof" }] : (
      /* istanbul ignore next */
      []
    )
  );
  goodCount = computed(
    () => consecutiveGoodProofs(this.state()),
    ...ngDevMode ? [{ debugName: "goodCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  repaired = computed(
    () => batchReady(this.state(), this.session()),
    ...ngDevMode ? [{ debugName: "repaired" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = signal(
    "courtyard",
    ...ngDevMode ? [{ debugName: "scene" }] : (
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
  storageMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "storageMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  materialSurface = signal(
    "metal",
    ...ngDevMode ? [{ debugName: "materialSurface" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceIds = computed(
    () => this.content.sources.filter((s) => this.session().sourceIds.includes(s.id)),
    ...ngDevMode ? [{ debugName: "sourceIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.context.authorityMode !== "localDemo")
      throw new Error("CAPABILITY_NOT_INSTALLED: Invention Repair requires a classroom authority adapter for shared sessions.");
    this.load();
  }
  open(number) {
    if (this.example || !Number.isInteger(number) || number < 1 || number > 8 || number === this.number())
      return;
    this.save();
    this.number.set(number);
    this.load();
  }
  load() {
    let saved = this.example ? void 0 : this.visits.get(this.session().id);
    try {
      if (!this.example && !saved)
        saved = this.persistence.load(this.session());
    } catch {
      this.storageMessage.set("Saved work could not be read. This attempt stays in this visit.");
    }
    this.state.set(saved ? restoreInventionState(this.project, this.session(), saved.events) ?? initialInventionState() : initialInventionState());
    this.settings.set(structuredClone(saved?.settings ?? this.session().initial));
    this.scene.set(this.session().mode === "courtyard" ? "courtyard" : "press");
    this.selectedType.set(null);
    this.selectedProof.set(null);
    this.message.set("");
    if (this.example) {
      const ink = this.content.inks.find((i) => i.adhesion >= 0.8 && i.spread <= 0.2);
      this.settings.set({
        type: [...this.session().target].reverse(),
        ink: ink.id,
        pressure: 1,
        packing: [1, 1, 1]
      });
      for (let i = 0; i < this.session().batchSize; i++)
        this.dispatch({ type: "proof", settings: this.settings() });
      this.scene.set("courtyard");
      this.message.set("Example repair. Explore how printed sheets move through the workshop.");
    }
  }
  ngOnDestroy() {
    this.save();
  }
  save() {
    if (this.example)
      return;
    const save = { settings: structuredClone(this.settings()), events: this.state().events };
    this.visits.set(this.session().id, save);
    try {
      this.persistence.save(this.session(), save);
      this.storageMessage.set(this.persistence.available ? "Saved on this device" : "Storage unavailable \xB7 keep this visit open");
    } catch {
      this.storageMessage.set("Could not save. Download the trial notebook before leaving.");
    }
  }
  dispatch(action) {
    const id = crypto.randomUUID();
    const result2 = applyInventionAction(this.project, this.session(), this.state(), action, {
      id,
      clientEventId: id,
      eventType: INVENTION_EVENTS[action.type],
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      tenantId: this.context.tenantId,
      projectId: this.project.projectId,
      attemptId: this.context.attemptId,
      sourceId: this.session().id,
      actor: { type: "student", id: this.context.actorId },
      payload: { action }
    });
    this.state.set(result2.state);
    this.message.set(result2.message);
    this.save();
  }
  configure(patch) {
    const next = __spreadValues(__spreadValues({}, this.settings()), patch);
    if (validPressSettings(next, this.project, this.session())) {
      this.settings.set(next);
      this.message.set("Setup changed. Pull a new proof to test it.");
      this.save();
    }
  }
  swapType(index) {
    if (index < 0 || index >= this.settings().type.length)
      return;
    const first = this.selectedType();
    if (first === null) {
      this.selectedType.set(index);
      return;
    }
    const type = [...this.settings().type];
    [type[first], type[index]] = [type[index], type[first]];
    this.configure({ type });
    this.selectedType.set(null);
  }
  cyclePacking(index) {
    const packing = this.settings().packing.map((v, i) => i === index ? (v + 1) % 3 : v);
    this.configure({ packing });
  }
  pull() {
    this.selectedProof.set(null);
    this.dispatch({ type: "proof", settings: this.settings() });
  }
  prepare(part) {
    this.dispatch({ type: "prepare", part });
  }
  sample() {
    this.dispatch({ type: "sample", ink: this.settings().ink, surface: this.materialSurface() });
  }
  flow(station) {
    this.dispatch({ type: "flow", station });
  }
  travel() {
    if (this.session().mode !== "return")
      return;
    this.scene.update((s) => s === "press" ? "courtyard" : "press");
    this.message.set(this.scene() === "courtyard" ? this.repaired() ? "Same courtyard. Inspect what your repaired production changes." : "Same courtyard. The failed setup has supplied no printed sheets." : "Your workshop and proofs are still here.");
  }
  exportNotebook() {
    const blob = new Blob([
      JSON.stringify({
        projectId: this.project.projectId,
        projectVersion: this.project.projectVersion,
        session: this.session().id,
        label: "Local model evidence, not assessment",
        state: this.state()
      }, null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url;
    link.download = `${this.session().id}-notebook.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function InventionRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventionRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventionRuntime, factory: _InventionRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventionRuntime, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/time-repair/invention/knowledge/knowledge.models.ts
var KNOWLEDGE_KINDS = [
  "reconstruction",
  "assembly",
  "diagram",
  "distribution",
  "access",
  "apprentice",
  "circulation",
  "timeline",
  "newspaper",
  "interview"
];
function emptyKnowledge() {
  return { selected: "", placements: {}, values: {}, trials: [], message: "", sequence: 0 };
}
function result(state, outcome, success, evidence) {
  const id = state.sequence + 1;
  return __spreadProps(__spreadValues({}, state), {
    sequence: id,
    message: outcome,
    trials: [...state.trials, { id, outcome, success, evidence }].slice(-40)
  });
}
function uniqueStrings(value, length) {
  return Array.isArray(value) && value.length === length && value.every((v) => typeof v === "string" && /^[a-z][a-z0-9-]{0,40}$/.test(v)) && new Set(value).size === length;
}

// src/app/templates/time-repair/invention/knowledge/object.activities.ts
function restoredCells(c, s) {
  return (c.fragments ?? []).filter(
    (f) => s.placements[String(f.cell)] === f.id && (s.values[f.id] ?? f.turn) % 4 === 0
  ).length;
}
var reconstructionActivity = {
  validate: (c) => Array.isArray(c.fragments) && c.fragments.length === 6 && new Set(c.fragments.map((f) => f.id)).size === 6 && new Set(c.fragments.map((f) => f.cell)).size === 6 && c.fragments.every(
    (f) => typeof f.id === "string" && /^[a-z0-9-]{1,40}$/.test(f.id) && Number.isInteger(f.cell) && f.cell >= 0 && f.cell < 6 && Number.isInteger(f.turn) && f.turn >= 0 && f.turn < 4 && [0, 1].includes(f.copy)
  ) && c.fragments.some((f) => f.copy === 0) && c.fragments.some((f) => f.copy === 1),
  initial: (c) => __spreadProps(__spreadValues({}, emptyKnowledge()), {
    values: Object.fromEntries(c.fragments.map((f) => [f.id, f.turn]))
  }),
  reduce(c, s, a) {
    if (a.type === "select" && c.fragments.some((f) => f.id === a.item))
      return __spreadProps(__spreadValues({}, s), {
        selected: a.item,
        message: "A surviving fragment is lifted. Turn it or fit it into the damaged page."
      });
    if (a.type === "turn" && s.selected)
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { [s.selected]: ((s.values[s.selected] ?? 0) + 1) % 4 }),
        message: "The fragment turns. Follow the lines across its edges."
      });
    if (a.type === "place" && s.selected && /^[0-5]$/.test(a.target ?? "")) {
      const placements = __spreadValues({}, s.placements);
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target] = s.selected;
      return __spreadProps(__spreadValues({}, s), {
        placements,
        message: "The fragment rests on the page. Inspect its joins before sealing."
      });
    }
    if (a.type === "lift" && a.target && s.placements[a.target]) {
      const placements = __spreadValues({}, s.placements);
      const selected = placements[a.target];
      delete placements[a.target];
      return __spreadProps(__spreadValues({}, s), { selected, placements, message: "The fragment is lifted again." });
    }
    if (a.type === "inspect") {
      const count = restoredCells(c, s);
      return result(
        s,
        count === 6 ? "The whole drawing connects. Neither surviving copy held all six parts; together they preserve it." : `${count} of six sections connect in their original orientation. Compare the broken joins with the surviving copies.`,
        count === 6,
        JSON.stringify({ placements: s.placements, turns: s.values })
      );
    }
    return s;
  }
};
var ASSEMBLY_ROLES = ["frame", "mold", "ink", "screw"];
function assemblyFault(s) {
  if (ASSEMBLY_ROLES.some((p) => s.placements[p] !== p)) return "connection";
  if (!s.values["frame"]) return "loose";
  if ((s.values["mold"] ?? 0) < 4) return "type";
  if ((s.values["ink"] ?? 0) < 2) return "ink";
  if (s.values["screw"] !== 2) return "pressure";
  return "none";
}
var assemblyActivity = {
  validate: (c) => uniqueStrings(c.parts, 4) && ASSEMBLY_ROLES.every((p) => c.parts.includes(p)),
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    if (a.type === "select" && c.parts.includes(a.item))
      return __spreadProps(__spreadValues({}, s), {
        selected: a.item,
        message: "Fit this craft\u2019s mechanism into a socket. Then operate it."
      });
    if (a.type === "fit" && s.selected && c.parts.includes(a.target)) {
      const placements = __spreadValues({}, s.placements);
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target] = s.selected;
      return __spreadProps(__spreadValues({}, s), {
        placements,
        values: __spreadProps(__spreadValues({}, s.values), { [a.target]: 0 }),
        message: "The mechanism is fitted. Its shape and connection determine what it can do."
      });
    }
    if (a.type === "operate" && c.parts.includes(a.target) && s.placements[a.target] === a.target) {
      const key = a.target;
      const max = key === "mold" ? 4 : key === "frame" ? 1 : 3;
      const value = ((s.values[key] ?? 0) + 1) % (max + 1);
      const messages = {
        frame: value ? "The frame grips the type. The pieces stay together." : "The frame is open; loose pieces can shift.",
        mold: `${value} matching pieces have been cast in this teaching model.`,
        ink: "The ink coating changes. Too little leaves bare areas.",
        screw: "The screw converts turning into downward travel. Watch the platen meet the type."
      };
      return __spreadProps(__spreadValues({}, s), { values: __spreadProps(__spreadValues({}, s.values), { [key]: value }), message: messages[key] });
    }
    if (a.type === "test") {
      const fault = assemblyFault(s);
      const messages = {
        connection: "A mechanism is missing or fitted to the wrong connection.",
        loose: "The unheld type shifts under the platen.",
        type: "The mold has not yet supplied the full set of four matching pieces.",
        ink: "Bare regions of the type leave a faint impression.",
        pressure: "The platen is not making the intended contact. Try another screw position.",
        none: "A repeated impression: casting, holding, coating, and pressure now work as a system."
      };
      return result(
        s,
        messages[fault],
        fault === "none",
        JSON.stringify({ placements: s.placements, controls: s.values, fault })
      );
    }
    return s;
  }
};
function gearContact(c, s) {
  const x = [c.axles[0], s.values["middle"] ?? c.axles[1], c.axles[2]];
  return [0, 1].every(
    (i) => Math.abs(x[i + 1] - x[i] - c.gearRadii[i] - c.gearRadii[i + 1]) <= 2
  );
}
var diagramActivity = {
  validate: (c) => Array.isArray(c.axles) && c.axles.length === 3 && c.axles.every((v) => Number.isFinite(v) && v >= 200 && v <= 800) && Array.isArray(c.gearRadii) && c.gearRadii.length === 3 && c.gearRadii.every((v) => Number.isFinite(v) && v >= 30 && v <= 80) && [0, 1].every(
    (i) => Math.abs(c.axles[i + 1] - c.axles[i] - c.gearRadii[i] - c.gearRadii[i + 1]) <= 2
  ),
  initial: (c) => __spreadProps(__spreadValues({}, emptyKnowledge()), {
    values: { middle: c.axles[1] + 48, blueprint: 0, rotation: 0 }
  }),
  reduce(c, s, a) {
    if (a.type === "blueprint" && [0, 1].includes(a.value))
      return __spreadProps(__spreadValues({}, s), {
        placements: {},
        values: __spreadProps(__spreadValues({}, s.values), {
          blueprint: a.value,
          middle: c.axles[1] + (a.value === 0 ? 48 : 0),
          running: 0
        }),
        message: "A printed diagram sets the axle positions. Build it and test the claim."
      });
    if (a.type === "select" && ["0", "1", "2"].includes(a.item))
      return __spreadProps(__spreadValues({}, s), { selected: a.item });
    if (a.type === "fit" && ["0", "1", "2"].includes(s.selected) && ["0", "1", "2"].includes(a.target)) {
      const placements = __spreadValues({}, s.placements);
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target] = s.selected;
      return __spreadProps(__spreadValues({}, s), {
        placements,
        values: __spreadProps(__spreadValues({}, s.values), { running: 0 }),
        message: "The wheel sits on its axle. Check the teeth against its neighbor."
      });
    }
    if (a.type === "shift" && [-1, 1].includes(a.value))
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), {
          middle: Math.max(
            c.axles[1],
            Math.min(c.axles[1] + 48, s.values["middle"] + a.value * 24)
          ),
          running: 0
        }),
        message: "The middle axle moves to the next mounting hole. The printed diagram has not changed yet."
      });
    if (a.type === "crank") {
      const placed = [0, 1, 2].every(
        (i) => s.placements[String(i)] !== void 0 && c.gearRadii[Number(s.placements[String(i)])] === c.gearRadii[i]
      );
      const ok = placed && gearContact(c, s);
      return result(
        __spreadProps(__spreadValues({}, s), {
          values: __spreadProps(__spreadValues({}, s.values), { rotation: (s.values["rotation"] ?? 0) + 1, running: ok ? 1 : 0 })
        }),
        !placed ? "The wheels are not assembled as the drawing specifies." : ok ? "All three wheels transmit the turn. The output spindle moves." : "The input turns, but the teeth gap or collide. A printed diagram can still be wrong.",
        ok,
        JSON.stringify({ middle: s.values["middle"], placements: s.placements })
      );
    }
    if (a.type === "print") {
      const ok = gearContact(c, s) && s.values["running"] === 1;
      return result(
        __spreadProps(__spreadValues({}, s), {
          values: __spreadProps(__spreadValues({}, s.values), {
            printed: s.values["middle"],
            revision: (s.values["revision"] ?? 0) + 1
          })
        }),
        ok ? "The revised page records a mechanism you actually tested." : "The page reproduces your present arrangement, including any untested error.",
        ok,
        `Printed axle ${s.values["middle"]}`
      );
    }
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/people.activities.ts
var distributionActivity = {
  validate: (c) => Array.isArray(c.places) && c.places.length >= 4 && c.places.length <= 6 && new Set(c.places.map((p) => p.id)).size === c.places.length && c.places[0].id === "workshop" && c.places.every(
    (p) => typeof p.id === "string" && /^[a-z-]{1,40}$/.test(p.id) && typeof p.name === "string" && p.name.length > 0 && p.name.length < 80 && Number.isFinite(p.x) && p.x >= 80 && p.x <= 920 && Number.isFinite(p.y) && p.y >= 100 && p.y <= 500 && Number.isInteger(p.need) && p.need >= 0 && p.need <= 3 && Array.isArray(p.links) && p.links.every(
      (l) => l !== p.id && c.places.some((q) => q.id === l && q.links.includes(p.id))
    )
  ) && Number.isInteger(c.stock) && c.stock >= c.places.reduce((n, p) => n + p.need, 0) && c.stock <= 12 && (() => {
    const seen = /* @__PURE__ */ new Set(["workshop"]);
    for (let i = 0; i < c.places.length; i++)
      for (const p of c.places) if (seen.has(p.id)) p.links.forEach((l) => seen.add(l));
    return seen.size === c.places.length;
  })(),
  initial: (c) => __spreadProps(__spreadValues({}, emptyKnowledge()), {
    selected: "workshop",
    values: { stock: c.stock, bag: 0, trips: 0, "visited-workshop": 1 }
  }),
  reduce(c, s, a) {
    if (a.type === "load" && s.selected === "workshop" && s.values["stock"] > 0 && s.values["bag"] < 2)
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { stock: s.values["stock"] - 1, bag: s.values["bag"] + 1 }),
        message: "A real copy moves from the workshop pile into the messenger\u2019s bag."
      });
    if (a.type === "move") {
      const from = c.places.find((p) => p.id === s.selected);
      const to = c.places.find((p) => p.id === a.target);
      if (!to || !from.links.includes(to.id))
        return __spreadProps(__spreadValues({}, s), {
          message: "Follow a connected street or bridge. The messenger cannot cross buildings or the river."
        });
      return __spreadProps(__spreadValues({}, s), {
        selected: to.id,
        placements: __spreadProps(__spreadValues({}, s.placements), { previous: from.id }),
        values: __spreadProps(__spreadValues({}, s.values), { trips: s.values["trips"] + 1, ["visited-" + to.id]: 1 }),
        message: to.need ? `${to.name}: look through the open room to see what is waiting for a copy.` : to.id === "workshop" ? "The messenger has reached the workshop. Refill the bag from the remaining pile." : "The messenger crosses the bridge. Follow a street into the other district."
      });
    }
    if (a.type === "deliver") {
      const place = c.places.find((p) => p.id === s.selected);
      const delivered = s.values["delivered-" + place.id] ?? 0;
      if (!place.need)
        return __spreadProps(__spreadValues({}, s), {
          message: place.id === "workshop" ? "Load copies here; the destinations are across the town." : "This bridge connects destinations. Carry the copies on to a reader."
        });
      if (!s.values["bag"])
        return __spreadProps(__spreadValues({}, s), { message: "The bag is empty. The waiting room still has no new copy." });
      if (delivered >= place.need)
        return __spreadProps(__spreadValues({}, s), {
          message: "This destination already has its requested copies. Other readers are still waiting."
        });
      const values = __spreadProps(__spreadValues({}, s.values), {
        bag: s.values["bag"] - 1,
        ["delivered-" + place.id]: delivered + 1
      });
      const done = c.places.every((p) => (values["delivered-" + p.id] ?? 0) >= p.need);
      return result(
        __spreadProps(__spreadValues({}, s), { values }),
        done ? "The copies are in use throughout the town. Printing supplied them; routes and people made them available." : `${place.name} receives a copy. Its room changes as people start using the page.`,
        true,
        `Delivered to ${place.id}; carried ${values["bag"]}; stock ${values["stock"]}`
      );
    }
    return s;
  }
};
var ACCESS_TOOLS = ["copy", "loan", "translation", "reading"];
var accessActivity = {
  validate: (c) => Array.isArray(c.readers) && c.readers.length === 3 && new Set(c.readers.map((p) => p.id)).size === 3 && c.readers.every(
    (p) => typeof p.id === "string" && /^[a-z-]{1,40}$/.test(p.id) && typeof p.name === "string" && p.name.length > 0 && p.name.length < 80 && ["cost", "language", "reading"].includes(p.barrier)
  ),
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    if (a.type === "select" && ACCESS_TOOLS.includes(a.item))
      return __spreadProps(__spreadValues({}, s), { selected: a.item });
    if (a.type === "offer") {
      const reader = c.readers.find((p) => p.id === a.target);
      if (!reader || !s.selected) return s;
      const id = reader.id;
      const values = __spreadValues({}, s.values);
      const placements = __spreadValues({}, s.placements);
      if (s.selected === "copy" || s.selected === "loan") values["copy-" + id] = 1;
      if (s.selected !== "copy") placements[id] = s.selected;
      const helper = placements[id];
      const hasCopy = !!values["copy-" + id];
      const help = reader.barrier === "cost" ? helper === "loan" : reader.barrier === "language" ? helper === "translation" : helper === "reading";
      const usable = hasCopy && help;
      values["using-" + id] = usable ? 1 : 0;
      const blocked = {
        cost: "The price still prevents ownership. A loan could make a shared copy available.",
        language: "The reader can read, but the language on this page is unfamiliar.",
        reading: "This person can understand the spoken explanation, but cannot independently read this page."
      };
      return result(
        __spreadProps(__spreadValues({}, s), { placements, values }),
        usable ? `${reader.name} can now use the diagram. Watch the construction on the table change.` : !hasCopy ? "The assistance has arrived, but it needs a copy of the information to work with." : blocked[reader.barrier],
        usable,
        `${id}: copy=${hasCopy}; help=${helper ?? "none"}; barrier=${reader.barrier}`
      );
    }
    return s;
  }
};
var TEACHING_CASES = ["ink", "packing", "type"];
var apprenticeActivity = {
  validate: (c) => uniqueStrings(c.cases, 3) && TEACHING_CASES.every((x) => c.cases.includes(x)),
  initial: () => __spreadProps(__spreadValues({}, emptyKnowledge()), { values: { case: 0, expert: 1 } }),
  reduce(c, s, a) {
    if (a.type === "case" && Number.isInteger(a.value) && a.value >= 0 && a.value < c.cases.length)
      return __spreadProps(__spreadValues({}, s), {
        selected: "",
        placements: {},
        values: __spreadProps(__spreadValues({}, s.values), { case: a.value, running: 0 }),
        message: "A different failure reaches the bench. Inspect the new impression before choosing an example."
      });
    if (a.type === "expert")
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { expert: s.values["expert"] ? 0 : 1 }),
        message: s.values["expert"] ? "The expert leaves. The apprentice can use the physical examples you have taught." : "The expert returns and places a failed sheet beside the machine."
      });
    if (a.type === "select" && /^(before|fault|repair|after)-(ink|packing|type)$/.test(a.item ?? ""))
      return __spreadProps(__spreadValues({}, s), { selected: a.item });
    if (a.type === "place" && s.selected && /^[0-3]$/.test(a.target ?? "")) {
      const placements = __spreadValues({}, s.placements);
      for (const k of Object.keys(placements))
        if (placements[k] === s.selected) delete placements[k];
      placements[a.target] = s.selected;
      return __spreadProps(__spreadValues({}, s), {
        placements,
        message: "The object is on the teaching bench. Show the chain from failed impression to cause, repair, and successful impression."
      });
    }
    if (a.type === "teach") {
      const fault = c.cases[s.values["case"]];
      const order = ["before", "fault", "repair", "after"].map((p) => `${p}-${fault}`);
      const ok = order.every(
        (p, i) => i === 3 ? s.placements[String(i)]?.startsWith("after-") : s.placements[String(i)] === p
      );
      return result(
        __spreadProps(__spreadValues({}, s), {
          values: __spreadProps(__spreadValues({}, s.values), {
            ["learned-" + fault]: ok ? 1 : s.values["learned-" + fault] ?? 0,
            demonstration: ok ? 1 : 0
          })
        }),
        ok ? `The apprentice follows the ${fault} example: symptom, cause, changed part, and a clean proof. The example stays available after the expert leaves.` : "The apprentice follows the objects but cannot connect the failure to this repair. Inspect the order and whether all four belong to the same failure.",
        ok,
        JSON.stringify({ fault, sequence: s.placements })
      );
    }
    if (a.type === "run") {
      const fault = c.cases[s.values["case"]];
      const ok = !!s.values["learned-" + fault];
      return result(
        __spreadProps(__spreadValues({}, s), {
          values: __spreadProps(__spreadValues({}, s.values), {
            running: ok ? 1 : -1,
            output: (s.values["output"] ?? 0) + (ok ? 1 : 0)
          })
        }),
        ok ? `The apprentice recognizes the ${fault} symptom and uses the demonstrated repair without the expert\u2019s help.` : "The apprentice produces another failed sheet. A finished book alone did not explain how to diagnose this fault.",
        ok,
        `Independent ${fault} repair; trained=${ok}; expert=${s.values["expert"]}`
      );
    }
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/circulation.activity.ts
function circulationValue(s, key) {
  return s.values[`${s.values["reference"] ? "reference" : "altered"}-${key}`] ?? 0;
}
var circulationActivity = {
  validate: (c) => {
    const d = c.circulation;
    return !!d && [d.document, d.mark, d.author, d.origin, d.date, d.trace].every(
      (v) => typeof v === "string" && v.trim().length > 0 && v.length <= 90
    ) && d.mark.length <= 4 && Array.isArray(d.destinations) && uniqueStrings(
      d.destinations.map((p) => p.id),
      3
    ) && d.destinations.every(
      (p) => typeof p.name === "string" && p.name.length > 0 && p.name.length <= 25
    );
  },
  initial: () => __spreadProps(__spreadValues({}, emptyKnowledge()), { values: { "altered-stock": 1, "reference-stock": 1 } }),
  reduce: (c, s, a) => {
    const d = c.circulation;
    if (a.type === "compare" && (a.value === 0 || a.value === 1))
      return result(
        __spreadProps(__spreadValues({}, s), { values: __spreadProps(__spreadValues({}, s.values), { reference: a.value }) }),
        a.value ? "Archive comparison: try the same actions with working presses. Your broken-timeline evidence is kept separately." : "Broken timeline: the manuscript and travel routes still exist. Investigate where copying fails.",
        true,
        `Comparison position: ${a.value ? "working reference" : "fictional failure"}. This does not repair the timeline.`
      );
    const reference = !!s.values["reference"];
    const prefix = reference ? "reference" : "altered";
    const n = (key) => circulationValue(s, key);
    const next = (changes) => __spreadProps(__spreadValues({}, s), {
      values: __spreadValues(__spreadValues({}, s.values), Object.fromEntries(
        Object.entries(changes).map(([key, value]) => [`${prefix}-${key}`, value])
      ))
    });
    if (a.type === "copy") {
      if (n("stock") >= 6)
        return result(
          s,
          "The dispatch tray is full. Send a copy before making another.",
          false,
          "Six-copy model capacity reached."
        );
      const stroke = (n("stroke") + 1) % 4;
      return result(
        next({ stroke, stock: n("stock") + (stroke === 0 ? 1 : 0) }),
        stroke === 0 ? "A handwritten copy is ready to travel. The original remains here." : "The scribe is still copying. Follow the ink appearing on the page.",
        stroke === 0,
        `Hand-copy stage ${stroke || 4}/4; dispatch copies ${n("stock") + (stroke === 0 ? 1 : 0)}. Turns are not historical timings.`
      );
    }
    const place = d.destinations.find((p) => p.id === a.target);
    if (!place) return s;
    const id = place.id;
    if (a.type === "send") {
      if (n(`copies-${id}`) >= 6)
        return result(
          s,
          `${place.name}'s rack is full. Share a copy before sending another.`,
          false,
          "No additional copy spent."
        );
      if (!n("stock"))
        return result(
          s,
          "The dispatch tray is empty. Make another handwritten copy.",
          false,
          "No copy available to send."
        );
      return result(
        next({ stock: n("stock") - 1, [`seed-${id}`]: 1, [`copies-${id}`]: n(`copies-${id}`) + 1 }),
        `A manuscript reached ${place.name}. Travel works; can this workshop multiply it?`,
        true,
        `One copy transferred to ${place.name}; source retained there for reprinting.`
      );
    }
    if (a.type === "print") {
      if (!n(`seed-${id}`))
        return result(
          s,
          "The workshop has no source to set in type. Send it a manuscript.",
          false,
          "No source at this press."
        );
      const copies = n(`copies-${id}`);
      if (reference && copies >= 6)
        return result(
          s,
          "The drying rack is full. Share a copy before printing again.",
          false,
          "Six-copy model capacity reached."
        );
      return result(
        next({
          [`proof-${id}`]: reference ? 2 : 1,
          [`copies-${id}`]: reference ? Math.min(6, copies + 3) : copies,
          [`pull-${id}`]: n(`pull-${id}`) + 1
        }),
        reference ? `Usable copies are drying in ${place.name}. People still need someone to carry and explain them.` : `The letters barely transfer in ${place.name}. The manuscript arrived, but the press made no usable new copies. Inspect the failed sheet.`,
        reference,
        `${place.name}: ${reference ? "working reference produced a model batch of up to three" : "failed ink transfer produced zero usable copies"}.`
      );
    }
    if (a.type === "share") {
      if (n(`readers-${id}`) >= 3)
        return result(
          s,
          "All three discussion tables here have a copy.",
          true,
          "Local tabletop capacity reached; this is not a measure of historical readership."
        );
      if (!n(`copies-${id}`))
        return result(
          s,
          "There is no copy to share. The press needs to produce another.",
          false,
          "Empty local supply."
        );
      return result(
        next({
          [`copies-${id}`]: n(`copies-${id}`) - 1,
          [`readers-${id}`]: n(`readers-${id}`) + 1
        }),
        "A copy starts a discussion. Readers can question or disagree with it; receiving a page does not mean accepting its ideas.",
        true,
        `${place.name}: one copy moved to a discussion table. Public discussion, not religious conversion, is represented.`
      );
    }
    if (a.type === "inspect")
      return result(
        next({ [`inspected-${id}`]: 1 }),
        reference ? "The reference impression carries the marks clearly. Compare it with the faint sheet in the broken timeline." : `The ink stays readable on paper but beads on metal type. The fictional fault trail leads back to ${d.trace}.`,
        true,
        `${place.name}: ${reference ? "reference impression examined" : "paper/metal ink comparison; earlier workshop trace examined"}.`
      );
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/timeline.activity.ts
function timelineValue(state, key) {
  return state.values[key] ?? 0;
}
function validText(value, max = 180) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
var timelineActivity = {
  validate: (c) => {
    const d = c.timeline;
    return !!d && validText(d.title, 100) && validText(d.era, 80) && validText(d.answer, 60) && Array.isArray(d.nodes) && d.nodes.length >= 4 && d.nodes.length <= 6 && new Set(d.nodes.map((n) => n.id)).size === d.nodes.length && d.nodes.every((n) => validText(n.id, 40) && /^[a-z][a-z0-9-]*$/.test(n.id) && validText(n.label, 90) && validText(n.date, 40) && ["before", "gap", "after", "documented"].includes(n.lane) && validText(n.detail, 240) && validText(n.signal, 160)) && Array.isArray(d.candidates) && d.candidates.length >= 2 && d.candidates.length <= 4 && new Set(d.candidates.map((n) => n.id)).size === d.candidates.length && d.candidates.every((n) => validText(n.id, 40) && /^[a-z][a-z0-9-]*$/.test(n.id) && validText(n.label, 90) && validText(n.detail, 180)) && d.candidates.some((n) => n.id === d.answer);
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.timeline;
    if (a.type === "inspect" && d.nodes.some((n) => n.id === a.target)) {
      const node = d.nodes.find((n) => n.id === a.target);
      return result(
        __spreadProps(__spreadValues({}, s), { values: __spreadProps(__spreadValues({}, s.values), { [`inspected-${node.id}`]: 1 }) }),
        `${node.label}: ${node.detail}`,
        true,
        JSON.stringify({ node: node.id, lane: node.lane, signal: node.signal })
      );
    }
    if (a.type === "candidate" && d.candidates.some((n) => n.id === a.target)) {
      const candidate = d.candidates.find((n) => n.id === a.target);
      return __spreadProps(__spreadValues({}, s), {
        selected: candidate.id,
        message: `Candidate placed in the gap: ${candidate.label}. Check it against every clue before testing.`
      });
    }
    if (a.type === "view" && (a.value === 0 || a.value === 1))
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { view: a.value }),
        message: a.value ? "Repaired record: the printed debate can travel beyond Wittenberg." : "Broken record: handwriting and local speech remain, but the printed debate is absent."
      });
    if (a.type === "test") {
      const inspected = d.nodes.filter((n) => timelineValue(s, `inspected-${n.id}`)).length;
      const complete = inspected === d.nodes.length;
      const correct = s.selected === d.answer;
      return result(
        s,
        !complete ? `The timeline still has ${d.nodes.length - inspected} clue${d.nodes.length - inspected === 1 ? "" : "s"} to inspect.` : correct ? "The gap closes: your candidate explains the missing event without pretending one broken machine controls every later choice." : "That candidate leaves a clue unexplained. Return to the timeline and test another possibility.",
        complete && correct,
        JSON.stringify({ inspected, candidate: s.selected ?? "", answer: d.answer })
      );
    }
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/newspaper.activity.ts
function newspaperValue(state, key) {
  return state.values[key] ?? 0;
}
function validText2(value, max = 180) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
var newspaperActivity = {
  validate: (c) => {
    const d = c.newspaper;
    return !!d && validText2(d.title, 100) && validText2(d.era, 80) && validText2(d.answer, 300) && Array.isArray(d.editions) && d.editions.length >= 2 && d.editions.length <= 4 && new Set(d.editions.map((e) => e.id)).size === d.editions.length && d.editions.every((e) => validText2(e.id, 40) && /^[a-z][a-z0-9-]*$/.test(e.id) && validText2(e.masthead, 50) && validText2(e.date, 40) && validText2(e.headline, 100) && validText2(e.subhead, 140) && Array.isArray(e.columns) && e.columns.length >= 2 && e.columns.length <= 4 && e.columns.every((column) => validText2(column, 180)) && validText2(e.signal, 160) && ["alternate", "historical"].includes(e.kind));
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.newspaper;
    if (a.type === "open" && d.editions.some((e) => e.id === a.target)) {
      const edition = d.editions.find((e) => e.id === a.target);
      return __spreadProps(__spreadValues({}, s), {
        selected: edition.id,
        values: __spreadProps(__spreadValues({}, s.values), { [`opened-${edition.id}`]: 1 }),
        message: `${edition.masthead}, ${edition.date}: ${edition.signal}`
      });
    }
    if (a.type === "inspect" && typeof a.target === "string") {
      const [editionId, column] = a.target.split(":");
      const edition = d.editions.find((e) => e.id === editionId);
      const index = Number(column);
      if (!edition || !Number.isInteger(index) || !edition.columns[index]) return s;
      return result(
        __spreadProps(__spreadValues({}, s), { values: __spreadProps(__spreadValues({}, s.values), { [`clue-${edition.id}-${index}`]: 1, [`opened-${edition.id}`]: 1 }) }),
        `${edition.masthead}: ${edition.columns[index]}`,
        true,
        JSON.stringify({ edition: edition.id, column: index, kind: edition.kind })
      );
    }
    if (a.type === "compare" && (a.value === 0 || a.value === 1))
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { view: a.value }),
        message: a.value ? "Lay the documented issues beside the alternate record. Look for what changed and what remained." : "Read the alternate issues as evidence of a world where the printed debate does not arrive."
      });
    if (a.type === "trace") {
      const opened = d.editions.filter((e) => newspaperValue(s, `opened-${e.id}`)).length;
      const clues = Object.keys(s.values).filter((key) => key.startsWith("clue-")).length;
      const complete = opened === d.editions.length && clues >= d.editions.length * 2;
      return result(
        s,
        complete ? `Your press trail reads: ${d.answer}` : `Keep investigating: open every issue and inspect at least two columns in each.`,
        complete,
        JSON.stringify({ opened, clues, interpretation: d.answer })
      );
    }
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/interview.activity.ts
function interviewValue(state, key) {
  return state.values[key] ?? 0;
}
function validText3(value, max = 220) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
var interviewActivity = {
  validate: (c) => {
    const d = c.interview;
    return !!d && validText3(d.title, 100) && validText3(d.era, 80) && validText3(d.answer, 300) && Array.isArray(d.witnesses) && d.witnesses.length >= 3 && d.witnesses.length <= 5 && new Set(d.witnesses.map((w) => w.id)).size === d.witnesses.length && d.witnesses.every((w) => validText3(w.id, 40) && /^[a-z][a-z0-9-]*$/.test(w.id) && validText3(w.name, 60) && validText3(w.role, 80) && validText3(w.date, 40) && validText3(w.statement, 260) && validText3(w.artifact, 100) && validText3(w.clue, 160));
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.interview;
    if (a.type === "hear" && d.witnesses.some((w) => w.id === a.target)) {
      const witness = d.witnesses.find((w) => w.id === a.target);
      return __spreadProps(__spreadValues({}, s), {
        selected: witness.id,
        values: __spreadProps(__spreadValues({}, s.values), { [`heard-${witness.id}`]: 1 }),
        message: `${witness.name}, ${witness.role}: \u201C${witness.statement}\u201D`
      });
    }
    if (a.type === "inspect" && d.witnesses.some((w) => w.id === a.target)) {
      const witness = d.witnesses.find((w) => w.id === a.target);
      return result(
        __spreadProps(__spreadValues({}, s), { values: __spreadProps(__spreadValues({}, s.values), { [`artifact-${witness.id}`]: 1, [`heard-${witness.id}`]: 1 }) }),
        `${witness.artifact}: ${witness.clue}`,
        true,
        JSON.stringify({ witness: witness.id, artifact: witness.artifact })
      );
    }
    if (a.type === "compare" && (a.value === 0 || a.value === 1))
      return __spreadProps(__spreadValues({}, s), {
        values: __spreadProps(__spreadValues({}, s.values), { view: a.value }),
        message: a.value ? "Historical record selected. Compare testimony with the surviving printed evidence." : "Alternate record selected. Compare what each witness could see without a working print network."
      });
    if (a.type === "weigh") {
      const heard = d.witnesses.filter((w) => interviewValue(s, `heard-${w.id}`)).length;
      const artifacts = d.witnesses.filter((w) => interviewValue(s, `artifact-${w.id}`)).length;
      const complete = heard === d.witnesses.length && artifacts === d.witnesses.length;
      return result(
        s,
        complete ? `The interviews agree on a bounded explanation: ${d.answer}` : "The board is missing a voice or its physical evidence. Hear and inspect every witness before weighing the account.",
        complete,
        JSON.stringify({ heard, artifacts, interpretation: d.answer })
      );
    }
    return s;
  }
};

// src/app/templates/time-repair/invention/knowledge/knowledge.engine.ts
var knowledgeActivities = {
  reconstruction: reconstructionActivity,
  assembly: assemblyActivity,
  diagram: diagramActivity,
  distribution: distributionActivity,
  access: accessActivity,
  apprentice: apprenticeActivity,
  circulation: circulationActivity,
  timeline: timelineActivity,
  newspaper: newspaperActivity,
  interview: interviewActivity
};
var knowledgeCapabilities = new CapabilityRegistry();
var knowledgeEvents = new EventRegistry();
for (const kind of KNOWLEDGE_KINDS) {
  const event = `inventionKnowledge.${kind}Operated`;
  knowledgeEvents.register({ id: event, version: "1.0.0", status: "extension" });
  knowledgeCapabilities.register({
    id: `invention-knowledge.${kind}`,
    version: "1.0.0",
    status: "extension",
    renderer: `knowledge-${kind}`,
    eventsProduced: [event]
  });
}
function validKnowledgeDefinition(value) {
  try {
    if (!value || typeof value !== "object") return false;
    const c = value;
    return c.version === "1.0" && KNOWLEDGE_KINDS.includes(c.kind) && knowledgeActivities[c.kind].validate(c);
  } catch {
    return false;
  }
}
function applyKnowledgeEvent(c, s, e, projectId, sessionId) {
  if (!e || e.eventType !== `inventionKnowledge.${c.kind}Operated` || !knowledgeEvents.has(e.eventType) || e.projectId !== projectId || e.sourceId !== sessionId)
    return s;
  const a = e.payload?.["action"];
  if (!a || typeof a.type !== "string" || a.type.length > 40 || a.target !== void 0 && typeof a.target !== "string" || a.item !== void 0 && typeof a.item !== "string" || a.value !== void 0 && !Number.isFinite(a.value))
    return s;
  return knowledgeActivities[c.kind].reduce(c, s, a);
}
function replayKnowledge(c, events, projectId, sessionId) {
  if (!Array.isArray(events) || events.length > 800) return void 0;
  let state = knowledgeActivities[c.kind].initial(c);
  const ids = /* @__PURE__ */ new Set();
  try {
    for (const e of events) {
      if (typeof e?.id !== "string" || !e.id || ids.has(e.id) || e.clientEventId && ids.has(e.clientEventId) || typeof e.timestamp !== "string" || !e.actor)
        return void 0;
      const next = applyKnowledgeEvent(c, state, e, projectId, sessionId);
      if (next === state) return void 0;
      ids.add(e.id);
      if (e.clientEventId) ids.add(e.clientEventId);
      state = next;
    }
    return state;
  } catch {
    return void 0;
  }
}

export {
  inventionCapabilities,
  validPressSettings,
  pullProof,
  emptyKnowledge,
  ASSEMBLY_ROLES,
  assemblyFault,
  ACCESS_TOOLS,
  circulationValue,
  timelineValue,
  newspaperValue,
  interviewValue,
  knowledgeActivities,
  validKnowledgeDefinition,
  applyKnowledgeEvent,
  replayKnowledge,
  BrowserInventionPersistence,
  INVENTION_PROJECT,
  INVENTION_CONTEXT,
  INVENTION_EXAMPLE,
  INVENTION_PERSISTENCE,
  InventionRuntime
};
//# debugId=e257d2f3-9d24-5e0d-8858-f437c238d42a
//# sourceMappingURL=chunk-KCORHQSX.js.map
