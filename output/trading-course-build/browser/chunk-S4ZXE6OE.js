import {
  isBlockDesign,
  isDesignCapture,
  isDesignChecks
} from "./chunk-T7GOLBBA.js";
import {
  EventRegistry
} from "./chunk-2WXJ5NX3.js";
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

// src/app/templates/engineering-design/domain/engineering-preview.models.ts
var record = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text = (v) => typeof v === "string" && !!v.trim() && v.length <= 2e3;
var questId = (v) => typeof v === "string" && /^[a-z0-9-]{1,60}$/.test(v);
function isEngineeringSessionQuest(v) {
  if (!record(v) || !questId(v["id"])) return false;
  const title = v["title"];
  if (!text(title) || title.length > 80) return false;
  try {
    const json = JSON.stringify(v);
    return json.length <= 12e3 && JSON.stringify(JSON.parse(json)) === json;
  } catch {
    return false;
  }
}
function isEngineeringPreviewWeeks(v) {
  return Array.isArray(v) && v.length === 4 && v.every(
    (w) => record(w) && ["id", "title", "buildType"].every((k) => text(w[k])) && isBlockDesign(w["starter"]) && ["products", "questions", "evidence", "controls"].every(
      (k) => Array.isArray(w[k]) && w[k].length > 0 && w[k].length <= 12 && w[k].every(text)
    ) && Array.isArray(w["sessions"]) && w["sessions"].length === 2 && w["sessions"].every(
      (s) => record(s) && ["title", "instruction", "activity"].every((k) => text(s[k])) && record(s["settings"]) && Object.keys(s["settings"]).length <= 8 && Object.values(s["settings"]).every(
        (v2) => text(v2) || typeof v2 === "number" && Number.isFinite(v2)
      ) && (s["quest"] === void 0 || isEngineeringSessionQuest(s["quest"]))
    )
  ) && new Set(v.map((w) => w.id)).size === 4 && new Set(v.map((w) => w.buildType)).size === 4 && (() => {
    const ids = v.flatMap(
      (w) => w.sessions.flatMap((s) => s.quest ? [s.quest.id] : [])
    );
    return new Set(ids).size === ids.length;
  })();
}
function isEngineeringPreviewDrafts(v) {
  return record(v) && Object.keys(v).length <= 4 && Object.entries(v).every(
    ([id, d]) => text(id) && record(d) && isBlockDesign(d["design"]) && Array.isArray(d["trials"]) && d["trials"].length <= 40 && d["trials"].every(isDesignCapture) && (d["quests"] === void 0 || record(d["quests"]) && Object.keys(d["quests"]).length <= 16 && Object.entries(d["quests"]).every(
      ([key, result]) => questId(key) && record(result) && Object.keys(result).length === 1 && text(result["completedAt"])
    ))
  );
}

// src/app/shared/engineering/design-walkthrough.ts
var record2 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text2 = (v) => typeof v === "string" && !!v.trim() && v.length <= 2e3;
function isWalkthroughSetup(v) {
  return record2(v) && Object.keys(v).length <= 16 && Object.entries(v).every(
    ([k, x]) => k.length <= 80 && (typeof x === "boolean" || typeof x === "number" && Number.isFinite(x) || typeof x === "string" && x.length <= 200)
  );
}
function isWalkthroughTask(v) {
  if (!record2(v) || !["id", "title", "instruction", "lookFor"].every((k) => text2(v[k])) || !isWalkthroughSetup(v["setup"]))
    return false;
  const actions = v["actions"], response = v["response"];
  return (v["sampleId"] === void 0 || text2(v["sampleId"])) && (v["requiredEvidenceCount"] === void 0 || Number.isInteger(v["requiredEvidenceCount"]) && Number(v["requiredEvidenceCount"]) >= 1 && Number(v["requiredEvidenceCount"]) <= 20) && (v["requiredTargetId"] === void 0 || text2(v["requiredTargetId"])) && (actions === void 0 || Array.isArray(actions) && actions.length <= 6 && actions.every(
    (a) => record2(a) && text2(a["label"]) && text2(a["command"]) && (a["value"] === void 0 || text2(a["value"]) || typeof a["value"] === "number" && Number.isFinite(a["value"]))
  )) && (response === void 0 || record2(response) && text2(response["label"]) && (response["saveAs"] === void 0 || response["saveAs"] === "exhibit") && (response["unit"] === void 0 || text2(response["unit"])) && (response["options"] === void 0 || Array.isArray(response["options"]) && response["options"].length >= 2 && response["options"].length <= 6 && response["options"].every(text2)));
}

// src/app/templates/engineering-design/domain/engineering-design.models.ts
var record3 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text3 = (v) => typeof v === "string" && !!v.trim() && v.length <= 1e4;
function requireEngineeringConfig(v, projectId) {
  if (!record3(v) || v["schemaVersion"] !== "1.0" || v["projectId"] !== projectId || !text3(v["version"]) || !/^\d+\.\d+\.\d+$/.test(v["version"]) || !record3(v["template"]) || v["template"]["id"] !== "engineering-design" || v["template"]["version"] !== "1.0" || !["title", "mission", "simulationId", "designBrief"].every((k) => text3(v[k])) || !isBlockDesign(v["starterDesign"]) || v["starterChecks"] !== void 0 && !isDesignChecks(v["starterChecks"]) || !Array.isArray(v["research"]) || !v["research"].length || v["research"].some(
    (r) => !record3(r) || !["id", "title", "prompt", "explanation"].every((k) => text3(r[k])) || !record3(r["source"]) || !text3(r["source"]["label"]) || !text3(r["source"]["url"]) || !r["source"]["url"].startsWith("https://")
  ) || !["testInstructions", "exhibitPrompts"].every(
    (k) => Array.isArray(v[k]) && v[k].length > 0 && v[k].every(text3)
  )) {
    throw new Error("CONFIG_INVALID: The engineering design package is incomplete or unsupported.");
  }
  const config = v;
  if (config.previewWeeks !== void 0 && !isEngineeringPreviewWeeks(config.previewWeeks))
    throw new Error("CONFIG_INVALID: Invalid engineering preview weeks.");
  if (config.designSamples !== void 0 && (!Array.isArray(config.designSamples) || config.designSamples.length > 12 || config.designSamples.some(
    (s) => !record3(s) || !text3(s["id"]) || !text3(s["title"]) || !text3(s["description"]) || !isBlockDesign(s["design"]) || s["checks"] !== void 0 && !isDesignChecks(s["checks"])
  ) || new Set(config.designSamples.map((s) => s.id)).size !== config.designSamples.length))
    throw new Error("CONFIG_INVALID: Invalid sample design library.");
  if (new Set(config.research.map((r) => r.id)).size !== config.research.length)
    throw new Error("CONFIG_INVALID: Research IDs must be unique.");
  const validStep = (step) => {
    if (!record3(step)) return false;
    const question = step["question"];
    return ["id", "title", "introduction", "activity"].every((k) => text3(step[k])) && ["practice", "project"].includes(String(step["workspace"])) && Array.isArray(step["instructions"]) && step["instructions"].length > 0 && step["instructions"].length <= 8 && step["instructions"].every(text3) && (step["explanation"] === void 0 || text3(step["explanation"])) && (step["showGuides"] === void 0 || typeof step["showGuides"] === "boolean") && (step["tasks"] === void 0 || Array.isArray(step["tasks"]) && step["tasks"].length > 0 && step["tasks"].length <= 12 && step["tasks"].every(isWalkthroughTask) && new Set(step["tasks"].map((t) => t.id)).size === step["tasks"].length && step["tasks"].every(
      (t) => !t.sampleId || config.designSamples?.some((s) => s.id === t.sampleId)
    )) && (question === void 0 || record3(question) && text3(question["prompt"]) && config.research.some((r) => r.id === question["researchId"]));
  };
  const sequence = config.learningSequence;
  if (sequence !== void 0 && (!record3(sequence) || !isBlockDesign(sequence.practiceDesign) || !Array.isArray(sequence.steps) || !sequence.steps.length || sequence.steps.length > 10 || !sequence.steps.every(validStep) || new Set(sequence.steps.map((step) => step.id)).size !== sequence.steps.length || sequence.steps[sequence.steps.length - 1].workspace !== "project"))
    throw new Error("CONFIG_INVALID: Invalid engineering learning sequence.");
  return config;
}
function isEngineeringSnapshot(v) {
  return record3(v) && (v["previewDrafts"] === void 0 || isEngineeringPreviewDrafts(v["previewDrafts"])) && v["schemaVersion"] === "1.0" && Number.isInteger(v["revision"]) && v["revision"] >= 0 && (v["learningStepId"] === void 0 || text3(v["learningStepId"])) && (v["learningTaskId"] === void 0 || text3(v["learningTaskId"])) && (v["walkthroughNotes"] === void 0 || record3(v["walkthroughNotes"]) && Object.keys(v["walkthroughNotes"]).length <= 120 && Object.entries(v["walkthroughNotes"]).every(
    ([k, n]) => k.length <= 250 && typeof n === "string" && n.length <= 2e3
  )) && (v["practiceDesign"] === void 0 || isBlockDesign(v["practiceDesign"])) && isBlockDesign(v["design"]) && record3(v["research"]) && Object.keys(v["research"]).length <= 30 && Object.values(v["research"]).every((t) => typeof t === "string" && t.length <= 1e4) && typeof v["prediction"] === "string" && v["prediction"].length <= 1e4 && typeof v["exhibit"] === "string" && v["exhibit"].length <= 1e4 && (v["checks"] === void 0 || isDesignChecks(v["checks"])) && (v["designBackup"] === void 0 || record3(v["designBackup"]) && isBlockDesign(v["designBackup"]["design"]) && isDesignChecks(v["designBackup"]["checks"])) && Array.isArray(v["trials"]) && v["trials"].length <= 40 && v["trials"].every(
    (t) => isDesignCapture(t) && "prediction" in t && typeof t.prediction === "string" && t.prediction.length <= 1e4
  ) && Array.isArray(v["events"]) && v["events"].length <= 200 && v["events"].every(
    (e) => record3(e) && text3(e["id"]) && text3(e["eventType"]) && text3(e["timestamp"])
  );
}

// src/app/templates/engineering-design/runtime/engineering-design.runtime.ts
var ENGINEERING_CONFIG = new InjectionToken("ENGINEERING_CONFIG");
var ENGINEERING_SESSION = new InjectionToken("ENGINEERING_SESSION");
var ENGINEERING_PERSISTENCE = new InjectionToken("ENGINEERING_PERSISTENCE");
var engineeringEvents = {
  preview: "engineering.previewSaved",
  design: "engineering.designSaved",
  research: "engineering.researchSaved",
  prediction: "engineering.predictionSaved",
  exhibit: "engineering.exhibitSaved",
  trial: "activity.completed",
  checks: "engineering.checksSaved",
  step: "engineering.learningStepSelected",
  walkthrough: "engineering.walkthroughSaved"
};
var EngineeringDesignRuntime = class _EngineeringDesignRuntime {
  config = inject(ENGINEERING_CONFIG);
  persistence = inject(ENGINEERING_PERSISTENCE);
  session = inject(ENGINEERING_SESSION);
  events = new EventRegistry();
  authoringPreview = this.session.mode === "preview" && this.session.authorityMode === "localDemo" && !!this.config.previewWeeks;
  saveStatus = signal(
    this.persistence.location,
    ...ngDevMode ? [{ debugName: "saveStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = signal(
    {
      schemaVersion: "1.0",
      revision: 0,
      design: structuredClone(this.config.starterDesign),
      checks: structuredClone(this.config.starterChecks ?? []),
      research: {},
      prediction: "",
      exhibit: "",
      trials: [],
      events: []
    },
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    for (const id of Object.values(engineeringEvents))
      this.events.register({ id, version: "1.0.0", status: "extension" });
    try {
      const saved = this.persistence.load();
      if (saved && isEngineeringSnapshot(saved))
        this.snapshot.set(saved);
    } catch {
      this.saveStatus.set("Could not read the saved draft. Keep this page open and export your work.");
    }
  }
  previewWeek(id) {
    const week = this.config.previewWeeks?.find((w) => w.id === id);
    if (!this.authoringPreview || !week)
      throw new Error("STATE_INVALID: Weekly authoring requires a configured local preview.");
    return week;
  }
  openPreviewWeek(id) {
    const week = this.previewWeek(id);
    if (Object.hasOwn(this.snapshot().previewDrafts ?? {}, id))
      return;
    this.commit(engineeringEvents.preview, {
      previewDrafts: __spreadProps(__spreadValues({}, this.snapshot().previewDrafts), {
        [id]: { design: week.starter, trials: [] }
      })
    });
  }
  savePreviewDesign(id, design) {
    this.previewWeek(id);
    if (!isBlockDesign(design))
      throw new Error("STATE_INVALID: Check block dimensions and positions.");
    this.openPreviewWeek(id);
    this.commit(engineeringEvents.preview, {
      previewDrafts: __spreadProps(__spreadValues({}, this.snapshot().previewDrafts), {
        [id]: __spreadProps(__spreadValues({}, this.snapshot().previewDrafts[id]), { design })
      })
    });
  }
  capturePreview(id, capture) {
    this.previewWeek(id);
    if (!isDesignCapture(capture) || capture.pluginId !== this.config.simulationId)
      throw new Error("STATE_INVALID: Invalid preview trial.");
    this.openPreviewWeek(id);
    const draft = this.snapshot().previewDrafts[id];
    if (draft.trials.some((t) => t.id === capture.id))
      return;
    this.commit(engineeringEvents.preview, {
      previewDrafts: __spreadProps(__spreadValues({}, this.snapshot().previewDrafts), {
        [id]: __spreadProps(__spreadValues({}, draft), { trials: [...draft.trials, capture].slice(-40) })
      })
    });
  }
  /** Records a level win once. The simulation measures success; the runtime only keeps the result. */
  completeQuest(id, questId2) {
    const week = this.previewWeek(id);
    if (!week.sessions.some((s) => s.quest?.id === questId2))
      throw new Error("STATE_INVALID: Unknown level challenge.");
    this.openPreviewWeek(id);
    const draft = this.snapshot().previewDrafts[id];
    if (draft.quests?.[questId2])
      return;
    this.commit(engineeringEvents.preview, {
      previewDrafts: __spreadProps(__spreadValues({}, this.snapshot().previewDrafts), {
        [id]: __spreadProps(__spreadValues({}, draft), {
          quests: __spreadProps(__spreadValues({}, draft.quests), { [questId2]: { completedAt: (/* @__PURE__ */ new Date()).toISOString() } })
        })
      })
    });
  }
  saveDesign(design, workspace = "project") {
    if (!isBlockDesign(design))
      throw new Error("STATE_INVALID: Check block dimensions and positions.");
    if (workspace === "practice" && !this.config.learningSequence)
      throw new Error("STATE_INVALID: This project has no practice workspace.");
    this.commit(engineeringEvents.design, workspace === "practice" ? { practiceDesign: design } : { design });
  }
  selectLearningStep(id) {
    if (!this.config.learningSequence?.steps.some((step) => step.id === id))
      throw new Error("STATE_INVALID: Unknown learning step.");
    if (this.snapshot().learningStepId !== id)
      this.commit(engineeringEvents.step, { learningStepId: id });
  }
  useDesignSample(id) {
    const sample = this.config.designSamples?.find((s) => s.id === id);
    if (!sample || !isBlockDesign(sample.design))
      throw new Error("STATE_INVALID: Unknown or invalid sample design.");
    const current = this.snapshot();
    this.commit(engineeringEvents.design, {
      design: sample.design,
      checks: sample.checks ?? [],
      designBackup: { design: current.design, checks: current.checks ?? [] }
    });
  }
  selectLearningTask(stepId, taskId) {
    if (!this.config.learningSequence?.steps.some((s) => s.id === stepId && s.tasks?.some((t) => t.id === taskId)))
      throw new Error("STATE_INVALID: Unknown walkthrough task.");
    this.commit(engineeringEvents.walkthrough, { learningStepId: stepId, learningTaskId: taskId });
  }
  saveWalkthroughNote(stepId, taskId, answer) {
    const task = this.config.learningSequence?.steps.find((s) => s.id === stepId)?.tasks?.find((t) => t.id === taskId);
    if (!task?.response || task.response.options && !task.response.options.includes(answer) && answer !== "")
      throw new Error("STATE_INVALID: Unknown walkthrough response.");
    this.commit(engineeringEvents.walkthrough, {
      walkthroughNotes: __spreadProps(__spreadValues({}, this.snapshot().walkthroughNotes), {
        [stepId + "/" + taskId]: answer.slice(0, 2e3)
      })
    });
  }
  restoreDesignBackup() {
    const backup = this.snapshot().designBackup;
    if (backup)
      this.commit(engineeringEvents.design, __spreadProps(__spreadValues({}, backup), { designBackup: void 0 }));
  }
  saveResearch(id, answer) {
    if (!this.config.research.some((r) => r.id === id))
      throw new Error("STATE_INVALID: Unknown research question.");
    this.commit(engineeringEvents.research, {
      research: __spreadProps(__spreadValues({}, this.snapshot().research), { [id]: answer.slice(0, 1e4) })
    });
  }
  saveText(field, value) {
    this.commit(engineeringEvents[field], { [field]: value.slice(0, 1e4) });
  }
  capture(capture) {
    this.captureBatch([capture]);
  }
  saveChecks(checks) {
    if (!isDesignChecks(checks))
      throw new Error("STATE_INVALID: Invalid design checks.");
    this.commit(engineeringEvents.checks, { checks });
  }
  captureBatch(captures) {
    if (!Array.isArray(captures) || !captures.length || captures.length > 20 || captures.some((capture) => !isDesignCapture(capture) || capture.pluginId !== this.config.simulationId) || new Set(captures.map((c) => c.id)).size !== captures.length)
      throw new Error("STATE_INVALID: The simulation returned an invalid trial.");
    const state = this.snapshot();
    const fresh = captures.filter((capture) => !state.trials.some((trial) => trial.id === capture.id));
    if (!fresh.length)
      return;
    if (state.trials.length + fresh.length > 40)
      throw new Error("TRIAL_LIMIT: Export this notebook before starting another project attempt.");
    this.commit(engineeringEvents.trial, {
      trials: [
        ...state.trials,
        ...fresh.map((capture) => __spreadProps(__spreadValues({}, structuredClone(capture)), {
          prediction: capture.settings["workspace"] === "practice" ? "" : state.prediction
        }))
      ]
    }, fresh[0].id);
  }
  commit(eventType, changes, id = crypto.randomUUID()) {
    if (!this.events.has(eventType))
      throw new Error("UNKNOWN_EVENT_TYPE: This action is not registered.");
    const current = this.snapshot();
    const event = {
      id,
      clientEventId: id,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      tenantId: this.session.tenantId,
      projectId: this.session.projectId,
      attemptId: this.session.attemptId,
      actor: { type: "student", id: this.session.actorId },
      sourceId: eventType === engineeringEvents.trial ? this.config.simulationId : "engineering-design"
    };
    const next = __spreadProps(__spreadValues(__spreadValues({}, current), structuredClone(changes)), {
      revision: current.revision + 1,
      events: [...current.events, event].slice(-200)
    });
    if (!isEngineeringSnapshot(next))
      throw new Error("STATE_INVALID: The notebook could not be saved.");
    this.snapshot.set(next);
    try {
      this.persistence.save(next);
      this.saveStatus.set(this.persistence.location);
    } catch {
      this.saveStatus.set("Save failed. Your work is still on this page; export it before leaving.");
    }
  }
  static \u0275fac = function EngineeringDesignRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringDesignRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EngineeringDesignRuntime, factory: _EngineeringDesignRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringDesignRuntime, [{
    type: Injectable
  }], () => [], null);
})();

export {
  requireEngineeringConfig,
  isEngineeringSnapshot,
  ENGINEERING_CONFIG,
  ENGINEERING_SESSION,
  ENGINEERING_PERSISTENCE,
  EngineeringDesignRuntime
};
//# debugId=75bdbad9-5d63-58a9-b301-89412dc341d4
//# sourceMappingURL=chunk-S4ZXE6OE.js.map
