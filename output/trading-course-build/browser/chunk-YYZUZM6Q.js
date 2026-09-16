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
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/restoration/restoration.engine.ts
var initialRestoration = () => ({ inspected: [], choices: {}, notes: {}, undo: [], verified: false, submissions: 0, feedback: "", issues: [] });
function selectedRepair(region, state) {
  return region.options.find((o) => o.id === (state.choices[region.id] ?? region.originalOptionId));
}
function restorationIssues(d, s) {
  return d.regions.flatMap((region) => {
    const note = s.notes[region.id];
    if (!s.inspected.includes(region.id)) return [`${region.title}: inspect this detail first.`];
    if (!note?.evidenceId || !note.relationship || note.explanation.trim().length < 20) return [`${region.title}: attach a reference, choose its relationship to the original claim, and explain your decision in at least 20 characters.`];
    if (!region.answers.some((a) => a.optionId === selectedRepair(region, s).id && a.evidenceId === note.evidenceId && a.relationship === note.relationship)) return [`${region.title}: ${region.hint}`];
    return [];
  });
}
var updated = (s, message, eventType) => ({ state: s, message, eventType });
var restorationActions = {
  inspect: (d, s, a) => {
    const region = d.regions.find((r) => r.id === a.regionId);
    if (!region || s.selectedRegionId === a.regionId && s.inspected.includes(a.regionId)) return;
    return updated(__spreadProps(__spreadValues({}, s), { selectedRegionId: a.regionId, inspected: [.../* @__PURE__ */ new Set([...s.inspected, a.regionId])] }), `Inspected ${region.title}.`, "evidence.viewed");
  },
  edit: (d, s, a) => {
    const region = d.regions.find((r) => r.id === a.regionId), option = region?.options.find((o) => o.id === a.optionId);
    if (!region || !option || !s.inspected.includes(a.regionId) || selectedRepair(region, s).id === option.id) return;
    const notes = __spreadValues({}, s.notes);
    delete notes[a.regionId];
    return updated(__spreadProps(__spreadValues({}, s), { choices: __spreadProps(__spreadValues({}, s.choices), { [region.id]: option.id }), notes, verified: false, issues: [], feedback: "Draft changed. Attach evidence for this choice.", undo: [...s.undo, { regionId: region.id, previousOptionId: selectedRepair(region, s).id, previousNote: s.notes[region.id] }].slice(-100) }), `Changed ${region.title}: ${option.label}.`, "evidence.annotationAdded");
  },
  justify: (d, s, a) => {
    const region = d.regions.find((r) => r.id === a.regionId), note = a.note;
    if (!region || !s.inspected.includes(a.regionId) || !note || typeof note !== "object" || typeof note.explanation !== "string" || note.explanation.length > 1500 || !["", "supports", "contradicts", "does-not-establish"].includes(note.relationship) || !(note.evidenceId === "" || region.evidenceIds.includes(note.evidenceId))) return;
    if (JSON.stringify(s.notes[a.regionId]) === JSON.stringify(note)) return;
    return updated(__spreadProps(__spreadValues({}, s), { notes: __spreadProps(__spreadValues({}, s.notes), { [a.regionId]: __spreadValues({}, note) }), verified: false, issues: [], feedback: "Explanation saved. Check the whole reconstruction when both details are ready." }), `Saved evidence and explanation for ${region.title}.`, "evidence.usedInClaim");
  },
  undo: (_d, s) => {
    const last = s.undo.at(-1);
    if (!last) return;
    const notes = __spreadValues({}, s.notes);
    if (last.previousNote) notes[last.regionId] = last.previousNote;
    else delete notes[last.regionId];
    return updated(__spreadProps(__spreadValues({}, s), { choices: __spreadProps(__spreadValues({}, s.choices), { [last.regionId]: last.previousOptionId }), notes, undo: s.undo.slice(0, -1), verified: false, issues: [], feedback: "Previous image choice restored. Review its explanation." }), "Undid the last image edit.", "evidence.annotationAdded");
  },
  submit: (d, s) => {
    if (s.verified) return;
    const issues = restorationIssues(d, s), verified = issues.length === 0;
    const feedback = verified ? "Evidence check passed. Your reconstruction and reflection are saved for review." : "This reconstruction needs another look. Use the detail feedback to revise.";
    return updated(__spreadProps(__spreadValues({}, s), { verified, issues, feedback, submissions: s.submissions + 1 }), feedback, "activity.resultSubmitted");
  }
};
function transitionRestoration(d, s, a) {
  if (!a || typeof a !== "object" || !Object.hasOwn(restorationActions, a.type)) return;
  const handler = restorationActions[a.type];
  return handler(d, s, a);
}

// src/app/templates/heist/restoration/restoration-collection.engine.ts
var initial = () => ({ works: {}, encounters: {}, sourcesRead: [], heistStarted: false, solvedLocks: [], answers: {}, extracted: false, museumLabel: "" });
var collectionReady = (m, s) => m.works.every((w) => s.works[w.id]?.verified);
function validAnswer(a) {
  return !!a && typeof a === "object" && (a.calculation === void 0 || Number.isFinite(a.calculation)) && (a.setting === void 0 || Number.isFinite(a.setting)) && [a.order, a.selected].every((x) => x === void 0 || Array.isArray(x) && x.length <= 30 && x.every((id) => typeof id === "string")) && (a.placements === void 0 || !!a.placements && typeof a.placements === "object" && !Array.isArray(a.placements) && Object.keys(a.placements).length <= 30 && Object.values(a.placements).every((id) => typeof id === "string"));
}
var collectionActions = {
  open: (m, s, c) => {
    if (!m.works.some((w) => w.id === c.workId) || s.workId === c.workId) return;
    return { state: __spreadProps(__spreadValues({}, s), { workId: c.workId, works: __spreadProps(__spreadValues({}, s.works), { [c.workId]: s.works[c.workId] ?? initialRestoration() }) }), message: "Opened restoration commission.", eventType: "activity.started" };
  },
  repair: (m, s, c) => {
    const work = m.works.find((w) => w.id === c.workId);
    if (!work || s.workId !== work.id || s.heistStarted) return;
    const result = transitionRestoration(work, s.works[work.id] ?? initialRestoration(), c.action);
    if (!result) return;
    return __spreadProps(__spreadValues({}, result), { state: __spreadProps(__spreadValues({}, s), { works: __spreadProps(__spreadValues({}, s.works), { [work.id]: result.state }) }) });
  },
  read: (m, s, c) => {
    if (s.sourcesRead.includes(c.evidenceId) || !m.sourceGallery.evidence.some((e) => e.id === c.evidenceId)) return;
    return { state: __spreadProps(__spreadValues({}, s), { sourcesRead: [...s.sourcesRead, c.evidenceId] }), message: "Consulted a reference.", eventType: "evidence.viewed" };
  },
  encounter: (m, s, c) => {
    const d = m.sourceGallery.encounters?.find((e) => e.id === c.encounterId), work = m.works.find((w) => w.id === s.workId);
    if (!d || !c.action || typeof c.action !== "object") return;
    if (c.action.type === "enter" ? s.activeEncounterId || work?.encounterId !== d.id : s.activeEncounterId !== d.id) return;
    const result = transitionEncounter(d, s.encounters[d.id] ?? initialEncounterState(d), c.action);
    if (!result) return;
    return __spreadProps(__spreadValues({}, result), { state: __spreadProps(__spreadValues({}, s), { encounters: __spreadProps(__spreadValues({}, s.encounters), { [d.id]: result.state }), activeEncounterId: c.action.type === "exit" ? void 0 : d.id }) });
  },
  "start-heist": (m, s) => {
    if (s.heistStarted || !collectionReady(m, s)) return;
    return { state: __spreadProps(__spreadValues({}, s), { heistStarted: true }), message: "The restoration ledger is ready. Use it to recover the collection.", eventType: "phase.completed" };
  },
  operate: (m, s, c) => {
    const id = m.finalLockIds.find((id2) => !s.solvedLocks.includes(id2)), lock = m.sourceGallery.locks.find((l) => l.id === id);
    if (!s.heistStarted || s.extracted || !collectionReady(m, s) || c.lockId !== id || !lock || !validAnswer(c.answer)) return;
    const correct = evaluateLock(lock, c.answer);
    return { state: __spreadProps(__spreadValues({}, s), { answers: __spreadProps(__spreadValues({}, s.answers), { [id]: structuredClone(c.answer) }), solvedLocks: correct ? [...s.solvedLocks, id] : s.solvedLocks }), message: correct ? lock.consequence : "The mechanism needs another adjustment. Consult your references and try again.", eventType: "activity.resultSubmitted" };
  },
  extract: (m, s) => {
    if (!s.heistStarted || s.extracted || !collectionReady(m, s) || !m.finalLockIds.every((id) => s.solvedLocks.includes(id))) return;
    return { state: __spreadProps(__spreadValues({}, s), { extracted: true }), message: "Collection recovered. Your reconstructions and evidence tell its story.", eventType: "finalSubmission.submitted" };
  },
  "museum-label": (_m, s, c) => {
    if (typeof c.text !== "string" || c.text.length > 4e3 || c.text === s.museumLabel) return;
    return { state: __spreadProps(__spreadValues({}, s), { museumLabel: c.text }), message: "Museum label saved.", eventType: "evidence.annotationAdded" };
  }
};
var RestorationCollectionEngine = class {
  constructor(mission) {
    this.mission = mission;
  }
  mission;
  state = initial();
  events = [];
  seen = /* @__PURE__ */ new Set();
  dispatch(e) {
    if (!e || typeof e.id !== "string" || !e.id || this.seen.has(e.id) || !Number.isFinite(e.elapsed) || e.elapsed < (this.events.at(-1)?.elapsed ?? 0) || this.events.length >= 2400 || !e.command || typeof e.command !== "object" || !Object.hasOwn(collectionActions, e.command.type)) return false;
    if (this.state.activeEncounterId && !["encounter", "read"].includes(e.command.type)) return false;
    const handler = collectionActions[e.command.type];
    const result = handler(this.mission, this.state, e.command);
    if (!result) return false;
    this.state = result.state;
    this.seen.add(e.id);
    this.events.push(__spreadProps(__spreadValues({}, structuredClone(e)), { message: result.message, eventType: result.eventType }));
    return true;
  }
  dossier() {
    return {
      projectId: this.mission.projectId,
      projectVersion: this.mission.projectVersion,
      title: this.mission.title,
      authority: "local-practice",
      complete: this.state.extracted,
      restorationComplete: collectionReady(this.mission, this.state),
      museumLabel: this.state.museumLabel,
      works: this.mission.works.map((work) => {
        const state = this.state.works[work.id] ?? initialRestoration();
        return {
          id: work.id,
          title: work.title,
          date: work.date,
          location: work.location,
          image: work.image,
          attribution: work.attribution,
          verified: state.verified,
          reflectionReview: "Teacher review not recorded",
          submissions: state.submissions,
          repairs: work.regions.map((region) => ({ regionId: region.id, title: region.title, originalClaim: region.claim, original: region.options.find((o) => o.id === region.originalOptionId), restored: selectedRepair(region, state), note: state.notes[region.id], source: this.mission.sourceGallery.evidence.find((e) => e.id === state.notes[region.id]?.evidenceId) }))
        };
      }),
      encounters: (this.mission.sourceGallery.encounters ?? []).filter((d) => this.state.encounters[d.id]).map((d) => ({ id: d.id, title: d.title, attribution: d.attribution, state: this.state.encounters[d.id], chapters: d.chapters.filter((c) => this.state.encounters[d.id].chapters.includes(c.id)), questions: d.questions.filter((q) => this.state.encounters[d.id].questions.includes(q.id)), insight: this.state.encounters[d.id].insightEarned ? d.insight : void 0 })),
      finalHeist: { started: this.state.heistStarted, solvedLocks: this.state.solvedLocks, answers: this.state.answers, extracted: this.state.extracted },
      events: this.events
    };
  }
};

// src/app/templates/heist/restoration/restoration-collection.runtime.ts
var RESTORATION_MISSION = new InjectionToken("RESTORATION_MISSION");
var RESTORATION_PERSISTENCE = new InjectionToken("RESTORATION_PERSISTENCE");
var LocalRestorationAdapter = class {
  key;
  signature;
  constructor(session, mission) {
    this.key = "forge:heist:restoration:1:" + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
    const _a = mission, { previewWeeks: _preview } = _a, assessedMission = __objRest(_a, ["previewWeeks"]);
    this.signature = JSON.stringify(assessedMission);
  }
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw)
      return [];
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !("signature" in saved) || saved.signature !== this.signature || !("history" in saved) || !Array.isArray(saved.history) || saved.history.length > 2400)
      throw new Error("Saved restoration does not match this collection. Export existing work before starting another practice.");
    return saved.history;
  }
  save(history, snapshot) {
    localStorage.setItem(this.key, JSON.stringify({ signature: this.signature, history, snapshot }));
  }
};
var RestorationCollectionRuntime = class _RestorationCollectionRuntime {
  mission = inject(RESTORATION_MISSION);
  persistence = inject(RESTORATION_PERSISTENCE);
  engine = new RestorationCollectionEngine(this.mission);
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
  blocked = signal(
    false,
    ...ngDevMode ? [{ debugName: "blocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = [];
  epoch = Date.now();
  constructor() {
    try {
      const history = this.persistence.load();
      for (const e of history)
        if (!this.engine.dispatch(e))
          throw new Error("Saved restoration contains an invalid action. Start another practice to replace it.");
      this.history = [...history];
      this.epoch -= (history.at(-1)?.elapsed ?? 0) * 1e3;
    } catch (e) {
      this.engine = new RestorationCollectionEngine(this.mission);
      this.blocked.set(true);
      this.warning.set(e instanceof Error ? e.message : "Saved restoration could not load.");
    }
  }
  send(command) {
    if (this.blocked())
      return false;
    if (this.history.length >= 2400) {
      this.warning.set("This local practice has reached its saved-action limit. Download your ledger and exhibition before starting another practice.");
      return false;
    }
    const e = { id: crypto.randomUUID(), elapsed: Math.max(this.history.at(-1)?.elapsed ?? 0, (Date.now() - this.epoch) / 1e3), command };
    if (!this.engine.dispatch(e))
      return false;
    this.history.push(e);
    this.revision.update((n) => n + 1);
    this.retrySave();
    return true;
  }
  retrySave() {
    if (this.blocked())
      return;
    try {
      this.persistence.save(this.history, this.engine.state);
      this.warning.set("");
    } catch {
      this.warning.set("Browser storage is unavailable. Your changes are here; download the ledger before leaving.");
    }
  }
  reset() {
    this.engine = new RestorationCollectionEngine(this.mission);
    this.history = [];
    this.epoch = Date.now();
    this.blocked.set(false);
    this.revision.update((n) => n + 1);
    this.retrySave();
  }
  static \u0275fac = function RestorationCollectionRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationCollectionRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RestorationCollectionRuntime, factory: _RestorationCollectionRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationCollectionRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  initialRestoration,
  selectedRepair,
  transitionRestoration,
  collectionReady,
  RESTORATION_MISSION,
  RESTORATION_PERSISTENCE,
  LocalRestorationAdapter,
  RestorationCollectionRuntime
};
//# debugId=8586ec76-3ffe-508f-a596-b0dd0f51022b
//# sourceMappingURL=chunk-YYZUZM6Q.js.map
