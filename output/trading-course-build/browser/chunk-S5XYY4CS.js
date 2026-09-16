import {
  RESTORATION_MISSION,
  initialRestoration,
  transitionRestoration
} from "./chunk-YYZUZM6Q.js";
import {
  RESTORATION_PREVIEW_PERSISTENCE,
  RESTORATION_PREVIEW_SESSION
} from "./chunk-4FYN5UCY.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/restoration/weekly/restoration-preview.models.ts
var initialPreviewState = () => ({ schemaVersion: 1, version: 0, works: {}, selectedByLesson: {}, sources: {}, trials: {}, filmTimes: {}, captions: {}, sampleWorkIds: [] });

// src/app/shared/panorama/panorama.models.ts
var initialPanoramaState = () => ({ heading: 50, visited: [], collected: [], conversations: {}, repairs: {}, undo: [] });

// src/app/shared/panorama/panorama.engine.ts
function matchTopic(person, question) {
  const words = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z]+/g) ?? [];
  return person.topics.map((topic) => ({ topic, score: topic.question.toLowerCase() === question.toLowerCase().trim() ? 100 : topic.keywords.filter((k) => words.includes(k)).length })).filter((row) => row.score > 0).sort((a, b) => b.score - a.score)[0]?.topic;
}
function transitionPanorama(d, s, a) {
  switch (a.type) {
    case "spherical-view":
      return d.viewpoints?.some((v) => v.id === a.view.viewpointId) && [a.view.yaw, a.view.pitch, a.view.fov].every(Number.isFinite) && a.view.yaw >= -180 && a.view.yaw < 180 && Math.abs(a.view.pitch) <= 89.9 && a.view.fov >= 35 && a.view.fov <= 100 ? __spreadProps(__spreadValues({}, s), { sphericalView: a.view }) : void 0;
    case "view":
      return Number.isFinite(a.heading) && a.heading >= 0 && a.heading <= 100 ? __spreadProps(__spreadValues({}, s), { heading: a.heading }) : void 0;
    case "visit":
      return d.people.some((p) => p.id === a.personId) ? __spreadProps(__spreadValues({}, s), { selectedPersonId: a.personId, visited: [.../* @__PURE__ */ new Set([...s.visited, a.personId])] }) : void 0;
    case "collect":
      return d.sources.some((e) => e.id === a.sourceId) ? __spreadProps(__spreadValues({}, s), { collected: s.collected.includes(a.sourceId) ? s.collected.filter((id) => id !== a.sourceId) : [...s.collected, a.sourceId] }) : void 0;
    case "conversation": {
      if (!d.people.some((p) => p.id === a.personId) || !a.question.trim() || a.question.length > 600 || a.answer.role !== "character" || !a.answer.text.trim() || a.answer.text.length > 2500 || a.answer.sourceIds.some((id) => !d.sources.some((e) => e.id === id))) return void 0;
      const messages = [...s.conversations[a.personId] ?? [], { role: "student", text: a.question, sourceIds: [] }, a.answer].slice(-60);
      return __spreadProps(__spreadValues({}, s), { conversations: __spreadProps(__spreadValues({}, s.conversations), { [a.personId]: messages }) });
    }
    case "repair": {
      if (!d.repairs.some((r) => r.id === a.repairId) || !!s.repairs[a.repairId] === a.applied) return void 0;
      return __spreadProps(__spreadValues({}, s), { repairs: __spreadProps(__spreadValues({}, s.repairs), { [a.repairId]: a.applied }), undo: [...s.undo, { id: a.repairId, previous: !!s.repairs[a.repairId] }].slice(-60) });
    }
    case "undo": {
      const last = s.undo.at(-1);
      return last ? __spreadProps(__spreadValues({}, s), { repairs: __spreadProps(__spreadValues({}, s.repairs), { [last.id]: last.previous }), undo: s.undo.slice(0, -1) }) : void 0;
    }
  }
}

// src/app/templates/heist/restoration/weekly/restoration-preview.runtime.ts
var RestorationPreviewRuntime = class _RestorationPreviewRuntime {
  mission = inject(RESTORATION_MISSION);
  config = this.mission.previewWeeks;
  session = inject(RESTORATION_PREVIEW_SESSION);
  persistence = inject(RESTORATION_PREVIEW_PERSISTENCE);
  state = signal(
    initialPreviewState(),
    ...ngDevMode ? [{ debugName: "state" }] : (
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
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preserveInvalidSave = false;
  constructor() {
    if (!this.config || this.session.mode !== "preview" || this.session.authorityMode !== "localDemo")
      throw new Error("PERMISSION_DENIED: weekly restoration tools require local authoring preview.");
    try {
      const saved = this.persistence.load();
      if (saved)
        this.state.set(saved);
    } catch {
      this.preserveInvalidSave = true;
      this.warning.set("The existing preview save could not load and has been preserved. These new edits are temporary; download your draft before leaving.");
    }
  }
  image(id) {
    return this.state().works[id] ?? initialRestoration();
  }
  sceneState(id) {
    return this.state().scenes?.[id] ?? initialPanoramaState();
  }
  sceneAction(id, action) {
    const definition = this.config.scenes?.find((s) => s.id === id);
    if (!definition)
      return;
    const next = transitionPanorama(definition, this.sceneState(id), action);
    if (next)
      this.commit(__spreadProps(__spreadValues({}, this.state()), { scenes: __spreadProps(__spreadValues({}, this.state().scenes), { [id]: next }) }));
  }
  select(lesson, workId) {
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > 8 || !this.mission.works.some((w) => w.id === workId))
      return;
    this.commit(__spreadProps(__spreadValues({}, this.state()), { selectedByLesson: __spreadProps(__spreadValues({}, this.state().selectedByLesson), { [lesson]: workId }) }));
  }
  repair(id, action) {
    if (!["inspect", "edit", "undo"].includes(action.type)) {
      this.feedback.set("Only picture inspection, edits and undo are available in this preview.");
      return false;
    }
    const work = this.mission.works.find((w) => w.id === id);
    if (!work)
      return false;
    const result = transitionRestoration(work, this.image(id), action);
    if (!result) {
      this.feedback.set("The picture is unchanged. Select a different layer to try another version, or keep the current choice.");
      return false;
    }
    this.commit(__spreadProps(__spreadValues({}, this.state()), { works: __spreadProps(__spreadValues({}, this.state().works), { [id]: __spreadProps(__spreadValues({}, result.state), { feedback: "", issues: [] }) }) }));
    this.feedback.set(result.message);
    return true;
  }
  pinSource(workId, sourceId) {
    const work = this.mission.works.find((w) => w.id === workId);
    if (!work?.regions.some((r) => r.evidenceIds.includes(sourceId)))
      return;
    const current = this.state().sources[workId] ?? [];
    this.commit(__spreadProps(__spreadValues({}, this.state()), { sources: __spreadProps(__spreadValues({}, this.state().sources), { [workId]: current.includes(sourceId) ? current.filter((id) => id !== sourceId) : [...current, sourceId] }) }));
  }
  saveTrial(workId) {
    if (!this.mission.works.some((w) => w.id === workId))
      return;
    const trials = this.state().trials[workId] ?? [];
    this.commit(__spreadProps(__spreadValues({}, this.state()), { trials: __spreadProps(__spreadValues({}, this.state().trials), { [workId]: [...trials, { id: crypto.randomUUID(), state: structuredClone(this.image(workId)) }].slice(-20) }) }));
    this.feedback.set("Picture version saved. Use Replay versions to compare your trials.");
  }
  saveFilmTime(lesson, time) {
    if (lesson < 1 || lesson > 8 || !Number.isFinite(time) || time < 0 || time > 3600)
      return;
    this.commit(__spreadProps(__spreadValues({}, this.state()), { filmTimes: __spreadProps(__spreadValues({}, this.state().filmTimes), { [lesson]: time }) }));
  }
  ensureExhibit() {
    if (this.state().exhibit !== void 0)
      return;
    const works = __spreadValues({}, this.state().works), captions = __spreadValues({}, this.state().captions), samples = [];
    for (const sample of this.config.sampleExhibit) {
      const untouched = !Object.hasOwn(works, sample.workId);
      const panorama = this.config.scenes?.some((s) => s.workId === sample.workId);
      if (untouched) {
        works[sample.workId] = __spreadProps(__spreadValues({}, initialRestoration()), { choices: __spreadValues({}, sample.choices) });
        if (!panorama)
          samples.push(sample.workId);
      }
      if (!Object.hasOwn(captions, sample.workId))
        captions[sample.workId] = untouched && !panorama ? sample.caption : "";
    }
    this.commit(__spreadProps(__spreadValues({}, this.state()), { works, captions, sampleWorkIds: samples, exhibit: this.config.sampleExhibit.map((s) => s.workId) }));
  }
  caption(id, text) {
    if (!this.mission.works.some((w) => w.id === id) || text.length > 1500)
      return;
    this.commit(__spreadProps(__spreadValues({}, this.state()), { captions: __spreadProps(__spreadValues({}, this.state().captions), { [id]: text }) }));
  }
  toggleExhibit(id) {
    if (!this.mission.works.some((w) => w.id === id))
      return;
    const exhibit = this.state().exhibit ?? [];
    this.commit(__spreadProps(__spreadValues({}, this.state()), { exhibit: exhibit.includes(id) ? exhibit.filter((w) => w !== id) : [...exhibit, id] }));
  }
  move(id, delta) {
    const exhibit = [...this.state().exhibit ?? []], from = exhibit.indexOf(id), to = from + delta;
    if (from < 0 || to < 0 || to >= exhibit.length)
      return;
    [exhibit[from], exhibit[to]] = [exhibit[to], exhibit[from]];
    this.commit(__spreadProps(__spreadValues({}, this.state()), { exhibit }));
  }
  commit(state) {
    const next = __spreadProps(__spreadValues({}, state), { version: this.state().version + 1 });
    this.state.set(next);
    if (this.preserveInvalidSave)
      return;
    try {
      this.persistence.save(next);
      this.warning.set("");
    } catch {
      this.warning.set("Browser storage is unavailable. Your edits remain here; download your draft before leaving.");
    }
  }
  static \u0275fac = function RestorationPreviewRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationPreviewRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RestorationPreviewRuntime, factory: _RestorationPreviewRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationPreviewRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  matchTopic,
  RestorationPreviewRuntime
};
//# debugId=f3ad1f7d-641d-58af-90e7-ee3f8dec311a
//# sourceMappingURL=chunk-S5XYY4CS.js.map
