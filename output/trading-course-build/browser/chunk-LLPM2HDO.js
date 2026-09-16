import {
  initialEncounterState,
  transitionEncounter
} from "./chunk-JAVOWGH2.js";
import {
  evaluateLock
} from "./chunk-AVOS3LLT.js";
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

// src/app/templates/heist/gallery/domain/gallery-audit.ts
var categories = {
  timeline: "Wrong timeline",
  "animal-plant": "Wrong animal / plant",
  people: "Wrong group of people",
  technology: "Wrong technology"
};
function buildGalleryAudit(engine) {
  const { mission, chamber } = engine;
  const authenticated = new Set(engine.events.filter((e) => e.type === "choose" && e.correct).map((e) => e.snapshot.paintingId));
  const identified = new Set(engine.events.filter((e) => e.type === "classify" && e.correct).map((e) => e.snapshot.paintingId));
  const inspectedIds = [...new Set(engine.events.flatMap((e) => e.command.type === "inspect" ? [e.command.paintingId] : []))];
  const clues = inspectedIds.flatMap((id) => mission.chambers.flatMap((room) => room.paintings.filter((p) => p.id === id).map((p) => {
    const fraudKnown = identified.has(p.id) || engine.frauds.includes(p.id);
    const recovery = fraudKnown ? mission.locks.find((l) => l.id === p.fraud?.recoveryLockId) : void 0;
    const evidenceIds = /* @__PURE__ */ new Set([...room.factIds, ...recovery?.evidenceIds ?? []]);
    return {
      paintingId: p.id,
      chamberId: room.id,
      chamber: room.title,
      title: p.title,
      passage: ["I", "II", "III"][room.paintings.indexOf(p)],
      caption: p.caption,
      details: p.hotspots.filter((h) => engine.inspections[p.id]?.includes(h.id)).map((h) => ({ id: h.id, label: h.label, detail: h.detail })),
      status: engine.frauds.includes(p.id) ? "Fraud sealed" : fraudKnown ? "Fraud identified \xB7 repair pending" : authenticated.has(p.id) ? "Scene authenticated" : engine.paintingId === p.id && engine.phase === "fraud" ? "Analysis needed" : "Inspected \xB7 unverified",
      category: fraudKnown && p.fraud ? categories[p.fraud.category] : void 0,
      explanation: fraudKnown ? p.fraud?.explanation : void 0,
      recovery: recovery ? { title: recovery.title, complete: engine.solved.includes(recovery.id) } : void 0,
      evidence: mission.evidence.filter((e) => evidenceIds.has(e.id))
    };
  })));
  const sceneAuthenticated = chamber.paintings.some((p) => authenticated.has(p.id));
  const inspected = chamber.paintings.some((p) => !!engine.inspections[p.id]?.length);
  const locks = chamber.lockIds.map((id) => mission.locks.find((l) => l.id === id)).map((l) => ({ id: l.id, title: l.title, prompt: l.prompt, complete: engine.solved.includes(l.id), current: engine.activeLocks[0]?.id === l.id }));
  const steps = [
    { title: "Inspect a marked detail", detail: "Compare the detail and setting inscription with the field notes.", complete: inspected },
    { title: "Authenticate a scene", detail: "Choose its passage. If it catches, identify the fraud and repair its lock, then compare the remaining paintings.", complete: sceneAuthenticated },
    { title: "Operate the passage mechanisms", detail: "Complete each mechanism below. For numeric locks, both the calculation and the physical setting must agree.", complete: locks.every((l) => l.complete) },
    { title: chamber.next ? "Enter the next gallery" : "Recover the collection", detail: "Use the open passage to record this gallery as cleared.", complete: engine.cleared.includes(chamber.id) }
  ];
  return {
    chamberId: chamber.id,
    chamber: chamber.title,
    date: chamber.date,
    location: chamber.location,
    phase: engine.phase,
    complete: engine.phase === "extracted",
    steps,
    currentStep: steps.findIndex((s) => !s.complete),
    locks,
    activeLock: engine.activeLocks[0] ? { title: engine.activeLocks[0].title, prompt: engine.activeLocks[0].prompt } : void 0,
    evidence: mission.evidence.filter((e) => chamber.factIds.includes(e.id)),
    clues,
    fraudCount: clues.filter((c) => !!c.explanation).length,
    sealedCount: engine.frauds.length,
    encounters: engine.encounterRecords(),
    route: mission.chambers.map((c) => ({ id: c.id, title: c.title, complete: engine.cleared.includes(c.id), current: c.id === chamber.id && engine.phase !== "extracted" }))
  };
}

// src/app/templates/heist/gallery/domain/gallery.engine.ts
var GalleryEngine = class {
  constructor(mission) {
    this.mission = mission;
    this.chamberId = mission.entry;
  }
  mission;
  chamberId;
  phase = "recon";
  paintingId;
  cleared = [];
  frauds = [];
  solved = [];
  inspections = {};
  evidenceRead = [];
  facts = [];
  mechanisms = {};
  events = [];
  encounters = {};
  activeEncounterId;
  defense = [];
  seen = /* @__PURE__ */ new Set();
  get chamber() {
    return this.mission.chambers.find((chamber) => chamber.id === this.chamberId);
  }
  get painting() {
    return this.chamber.paintings.find((painting) => painting.id === this.paintingId);
  }
  get activeLocks() {
    const ids = this.phase === "recovery" ? [this.painting?.fraud?.recoveryLockId] : this.phase === "mechanism" ? this.chamber.lockIds : [];
    return ids.filter((id) => !!id && !this.solved.includes(id)).map((id) => this.mission.locks.find((lock) => lock.id === id));
  }
  snapshot() {
    return structuredClone(__spreadValues({ chamberId: this.chamberId, phase: this.phase, paintingId: this.paintingId, cleared: this.cleared, frauds: this.frauds, solved: this.solved, mechanisms: this.mechanisms }, this.mission.encounters ? { encounters: this.encounters, activeEncounterId: this.activeEncounterId } : {}));
  }
  dispatch(envelope) {
    if (!envelope || typeof envelope.id !== "string" || !envelope.id || this.seen.has(envelope.id) || !Number.isFinite(envelope.elapsed) || envelope.elapsed < 0 || envelope.elapsed < (this.events.at(-1)?.elapsed ?? 0) || this.events.length >= 1800) return false;
    const c = envelope.command;
    if (!c || typeof c !== "object") return false;
    const chamberId = this.chamberId;
    let message = "", correct, runtimeEventType;
    if (this.activeEncounterId && c.type !== "encounter" && c.type !== "read") return false;
    if (c.type === "encounter") {
      const definition = this.mission.encounters?.find((e) => e.id === c.encounterId);
      if (!definition || !c.action || typeof c.action !== "object") return false;
      if (c.action.type === "enter") {
        if (this.activeEncounterId || !definition.chamberIds.some((id) => id === this.chamberId || this.cleared.includes(id))) return false;
      } else if (this.activeEncounterId !== definition.id) return false;
      const previous = this.encounters[definition.id] ?? initialEncounterState(definition);
      const result = transitionEncounter(definition, previous, c.action);
      if (!result) return false;
      this.encounters[definition.id] = result.state;
      if (c.action.type === "enter") this.activeEncounterId = definition.id;
      if (c.action.type === "exit") this.activeEncounterId = void 0;
      if (result.correct && !previous.insightEarned) this.addFacts([definition.insight.answerEvidenceId]);
      message = result.message;
      correct = result.correct;
      runtimeEventType = result.eventType;
    } else if (c.type === "inspect") {
      const painting = this.chamber.paintings.find((p) => p.id === c.paintingId);
      const hotspot = painting?.hotspots.find((h) => h.id === c.hotspotId);
      if (!hotspot || this.phase === "extracted") return false;
      const seen = this.inspections[c.paintingId] ??= [];
      if (seen.includes(c.hotspotId)) return false;
      seen.push(c.hotspotId);
      message = `Inspected ${hotspot.label}.`;
    } else if (c.type === "choose") {
      const painting = this.chamber.paintings.find((p) => p.id === c.paintingId);
      if (this.phase !== "recon" || !painting || this.frauds.includes(painting.id)) return false;
      if (!this.inspections[painting.id]?.length) return false;
      this.paintingId = painting.id;
      correct = painting.authentic;
      this.phase = correct ? "mechanism" : "fraud";
      if (correct) this.addFacts(this.chamber.factIds);
      message = correct ? "Painting authenticated. Operate the passage mechanism." : "The passage catches. Inspect the detail and explain the historical impossibility.";
    } else if (c.type === "classify") {
      const fraud = this.painting?.fraud;
      if (this.phase !== "fraud" || !fraud || !this.inspections[this.paintingId]?.includes(c.hotspotId)) return false;
      correct = fraud.category === c.category && fraud.hotspotId === c.hotspotId;
      if (correct) this.phase = "recovery";
      message = correct ? `${fraud.explanation} Repair the related mechanism to return to the junction.` : "That category and detail do not establish the fraud. Consult the field notes and inspect again.";
    } else if (c.type === "operate") {
      const lock = this.activeLocks.find((l) => l.id === c.lockId);
      if (!lock || !c.answer || typeof c.answer !== "object" || !this.validAnswer(c.answer)) return false;
      correct = evaluateLock(lock, c.answer);
      this.mechanisms[lock.id] = structuredClone(c.answer);
      message = correct ? lock.consequence : "The mechanism moved to your setting, but it does not align. Recheck the evidence and try again.";
      if (correct) {
        this.solved.push(lock.id);
        this.addFacts(lock.evidenceIds);
        if (this.phase === "recovery") {
          this.frauds.push(this.paintingId);
          this.paintingId = void 0;
          this.phase = "recon";
          message += " Fraud sealed; return to the three passages.";
        } else if (!this.activeLocks.length) {
          this.phase = "unlocked";
          message += " The authenticated passage is open.";
        }
      }
    } else if (c.type === "continue") {
      if (this.phase !== "unlocked") return false;
      this.cleared.push(this.chamberId);
      const next = this.chamber.next;
      if (next) {
        this.chamberId = next;
        this.phase = "recon";
        this.paintingId = void 0;
        message = `Entered ${this.chamber.title}.`;
      } else {
        this.phase = "extracted";
        message = "The collection is safe. Historical Authentication Dossier ready.";
      }
    } else if (c.type === "read") {
      const evidence = this.mission.evidence.find((e) => e.id === c.evidenceId);
      if (!evidence || this.evidenceRead.includes(evidence.id)) return false;
      this.evidenceRead.push(evidence.id);
      message = `Consulted ${evidence.title}.`;
    } else if (c.type === "defend") {
      if (this.phase !== "extracted" || !Array.isArray(c.responses) || c.responses.length !== this.mission.defensePrompts.length || c.responses.some((r) => typeof r !== "string" || r.length > 4e3)) return false;
      this.defense = [...c.responses];
      message = "Defense saved in the authentication dossier.";
    } else return false;
    this.seen.add(envelope.id);
    this.events.push(__spreadValues(__spreadProps(__spreadValues({}, envelope), { chamberId, type: c.type, command: structuredClone(c), message, correct, snapshot: this.snapshot() }), runtimeEventType ? { runtimeEventType } : {}));
    return true;
  }
  addFacts(ids) {
    for (const id of ids) if (!this.facts.includes(id)) this.facts.push(id);
  }
  validAnswer(answer) {
    return (answer.calculation === void 0 || Number.isFinite(answer.calculation)) && (answer.setting === void 0 || Number.isFinite(answer.setting)) && [answer.order, answer.selected].every((list) => list === void 0 || Array.isArray(list) && list.length <= 30 && list.every((id) => typeof id === "string")) && (answer.placements === void 0 || !!answer.placements && typeof answer.placements === "object" && !Array.isArray(answer.placements) && Object.keys(answer.placements).length <= 30 && Object.values(answer.placements).every((id) => typeof id === "string"));
  }
  encounterRecords() {
    return (this.mission.encounters ?? []).filter((e) => this.encounters[e.id]).map((e) => ({
      encounterId: e.id,
      title: e.title,
      location: e.location,
      attribution: e.attribution,
      state: structuredClone(this.encounters[e.id]),
      chapters: e.chapters.filter((c) => this.encounters[e.id].chapters.includes(c.id)),
      questions: e.questions.filter((q) => this.encounters[e.id].questions.includes(q.id)),
      observations: e.object.features.filter((f) => this.encounters[e.id].features.includes(f.id)),
      insight: this.encounters[e.id].insightEarned ? { claim: e.insight.claim, relationship: e.insight.relationship, explanation: e.insight.explanation, source: this.mission.evidence.find((s) => s.id === e.insight.answerEvidenceId) } : void 0
    }));
  }
  dossier() {
    const audit = buildGalleryAudit(this);
    return {
      title: "Historical Authentication Dossier",
      projectId: this.mission.projectId,
      projectVersion: this.mission.projectVersion,
      authority: "local-practice",
      complete: this.phase === "extracted",
      route: [...this.cleared],
      authenticPaintings: this.events.filter((e) => e.type === "choose" && e.correct).map((e) => ({ chamberId: e.chamberId, painting: this.mission.chambers.find((c) => c.id === e.chamberId).paintings.find((p) => p.id === e.snapshot.paintingId) })),
      frauds: this.mission.chambers.flatMap((c) => c.paintings.filter((p) => this.frauds.includes(p.id)).map((p) => __spreadValues({ paintingId: p.id, title: p.title }, p.fraud))),
      inspections: structuredClone(this.inspections),
      evidenceConsulted: this.mission.evidence.filter((e) => this.evidenceRead.includes(e.id)),
      clueLog: audit.clues,
      vaultAudit: { chamberId: audit.chamberId, steps: audit.steps, locks: audit.locks, route: audit.route },
      encounterRecords: this.encounterRecords(),
      confirmedEvidence: this.mission.evidence.filter((e) => this.facts.includes(e.id)),
      attempts: this.events.filter((e) => ["choose", "classify", "operate"].includes(e.type)),
      elapsedSeconds: this.events.at(-1)?.elapsed ?? 0,
      finalVault: this.cleared.includes(this.mission.chambers.find((c) => !c.next).id),
      defense: this.mission.defensePrompts.map((prompt, i) => ({ prompt, response: this.defense[i] ?? "" })),
      events: this.events
    };
  }
};

// src/app/templates/heist/gallery/runtime/gallery-runtime.ts
var GALLERY_MISSION = new InjectionToken("GALLERY_MISSION");
var GALLERY_PERSISTENCE = new InjectionToken("GALLERY_PERSISTENCE");
var LocalGalleryAdapter = class {
  key;
  fingerprint;
  constructor(session, mission) {
    this.key = "forge:heist:gallery:1:" + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
    this.fingerprint = JSON.stringify(mission);
  }
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw)
      return [];
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !("fingerprint" in saved) || saved.fingerprint !== this.fingerprint || !("history" in saved) || !Array.isArray(saved.history) || saved.history.length > 1800)
      throw new Error("Saved practice does not match this mission version. Start a new practice to replace it.");
    return saved.history;
  }
  save(history) {
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, history }));
  }
};
var GalleryRuntime = class _GalleryRuntime {
  mission = inject(GALLERY_MISSION);
  persistence = inject(GALLERY_PERSISTENCE);
  engine = new GalleryEngine(this.mission);
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
  epoch = Date.now();
  constructor() {
    try {
      const history = this.persistence.load();
      for (const envelope of history)
        if (!this.engine.dispatch(envelope))
          throw new Error("Saved practice contains an invalid checkpoint.");
      this.history = [...history];
      this.epoch -= (history.at(-1)?.elapsed ?? 0) * 1e3;
    } catch (error) {
      this.engine = new GalleryEngine(this.mission);
      this.restoreBlocked.set(true);
      this.warning.set(error instanceof Error ? error.message : "Saved practice could not load.");
    }
  }
  send(command) {
    if (this.restoreBlocked())
      return false;
    const envelope = { id: crypto.randomUUID(), elapsed: Math.max(this.history.at(-1)?.elapsed ?? 0, (Date.now() - this.epoch) / 1e3), command };
    if (!this.engine.dispatch(envelope))
      return false;
    this.history.push(envelope);
    this.revision.update((n) => n + 1);
    this.save();
    return true;
  }
  reset() {
    this.engine = new GalleryEngine(this.mission);
    this.history = [];
    this.epoch = Date.now();
    this.restoreBlocked.set(false);
    this.revision.update((n) => n + 1);
    this.save();
  }
  retrySave() {
    if (!this.restoreBlocked())
      this.save();
  }
  save() {
    try {
      this.persistence.save(this.history);
      this.warning.set("");
    } catch {
      this.warning.set("Browser storage is unavailable. Your work is still here; export the dossier before leaving.");
    }
  }
  static \u0275fac = function GalleryRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleryRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GalleryRuntime, factory: _GalleryRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleryRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  buildGalleryAudit,
  GALLERY_MISSION,
  GALLERY_PERSISTENCE,
  LocalGalleryAdapter,
  GalleryRuntime
};
//# debugId=ac111191-924e-54a5-a449-b30458633b23
//# sourceMappingURL=chunk-LLPM2HDO.js.map
