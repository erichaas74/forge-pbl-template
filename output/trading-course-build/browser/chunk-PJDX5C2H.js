import {
  changeNarrativeBranch,
  createInitialNarrativeState,
  narrativeDraftConfig,
  narrativeReadiness,
  validNarrativePath,
  wordCount
} from "./chunk-M73YRRYA.js";
import {
  projectSessionRuntimeScope
} from "./chunk-G626JLCU.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
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

// src/app/templates/narrative-studio/persistence/narrative-studio.persistence.ts
var BrowserNarrativeStudioPersistenceAdapter = class {
  constructor(storage = safeBrowserStorage(), session) {
    this.session = session;
    this.store = new ScopedBrowserStore("narrative-studio", storage, isNarrativeStudioState);
  }
  session;
  store;
  load(projectId, projectVersion) {
    const value = this.store.load(this.scope(projectId, projectVersion));
    return value?.projectId === projectId && value.projectVersion === projectVersion ? value : void 0;
  }
  save(state) {
    this.store.save(
      this.scope(state.projectId, state.projectVersion),
      state
    );
  }
  clear(projectId, projectVersion) {
    this.store.clear(this.scope(projectId, projectVersion));
  }
  scope(projectId, projectVersion) {
    return {
      tenantId: this.session?.tenantId ?? "local-preview",
      projectId,
      projectVersion,
      classId: this.session?.classId,
      actorId: this.session?.actorId,
      attemptId: this.session?.attemptId
    };
  }
};
var MemoryNarrativeStudioPersistenceAdapter = class {
  snapshot;
  load(projectId, projectVersion) {
    return this.snapshot?.projectId === projectId && this.snapshot.projectVersion === projectVersion ? structuredClone(this.snapshot) : void 0;
  }
  save(state) {
    this.snapshot = structuredClone(state);
  }
  clear() {
    this.snapshot = void 0;
  }
};
function isNarrativeStudioState(value) {
  if (!value || typeof value !== "object") return false;
  const item = value;
  return item["schemaVersion"] === "1.0" && typeof item["projectId"] === "string" && typeof item["projectVersion"] === "string" && Number.isInteger(item["revision"]) && typeof item["selectedNodeId"] === "string" && typeof item["historicalSettingId"] === "string" && !!item["bible"] && typeof item["bible"] === "object" && !!item["scenes"] && typeof item["scenes"] === "object" && Array.isArray(item["coachHistory"]) && Array.isArray(item["playtests"]) && (item["nodes"] === void 0 || isStoredGraph(item["nodes"], item["scenes"], item["selectedNodeId"]));
}
function isStoredGraph(value, scenes, selectedNodeId) {
  if (!Array.isArray(value) || !value.length) return false;
  const ids = /* @__PURE__ */ new Set();
  for (const node of value) {
    if (!node || typeof node !== "object" || typeof node.id !== "string" || !["scene", "ending"].includes(node.kind) || !Array.isArray(node.choices) || !["mapLabel", "suggestedTitle", "purpose", "craftPrompt", "stormStageId"].every(
      (key) => typeof node[key] === "string"
    ) || node.endingOutcome !== void 0 && !["death", "survival"].includes(node.endingOutcome) || !(node.id in scenes) || ids.has(node.id))
      return false;
    ids.add(node.id);
  }
  return typeof selectedNodeId === "string" && ids.has(selectedNodeId) && value.every(
    (node) => node.choices.every((choice) => {
      if (!choice || typeof choice !== "object") return false;
      const item = choice;
      return typeof item["id"] === "string" && typeof item["prompt"] === "string" && typeof item["nextNodeId"] === "string" && ids.has(item["nextNodeId"]);
    })
  );
}
var NARRATIVE_STUDIO_PERSISTENCE = new InjectionToken(
  "NARRATIVE_STUDIO_PERSISTENCE"
);

// src/app/templates/narrative-studio/runtime/narrative-studio.tokens.ts
var NARRATIVE_STUDIO_CONFIG = new InjectionToken(
  "NARRATIVE_STUDIO_CONFIG"
);
var NARRATIVE_STUDIO_SESSION = new InjectionToken(
  "NARRATIVE_STUDIO_SESSION"
);
var NARRATIVE_STUDIO_COACH = new InjectionToken(
  "NARRATIVE_STUDIO_COACH"
);
var NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID = new InjectionToken(
  "NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID"
);

// src/app/templates/narrative-studio/runtime/narrative-studio-runtime.service.ts
var NarrativeStudioRuntimeService = class _NarrativeStudioRuntimeService {
  config = inject(NARRATIVE_STUDIO_CONFIG);
  session = inject(NARRATIVE_STUDIO_SESSION);
  persistence = inject(NARRATIVE_STUDIO_PERSISTENCE);
  coach = inject(NARRATIVE_STUDIO_COACH);
  initialHistorySettingId = inject(NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID, { optional: true }) ?? "";
  saveTimer;
  state = signal(
    this.load(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storyConfig = computed(
    () => narrativeDraftConfig(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "storyConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveStatus = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  coachBusy = signal(
    false,
    ...ngDevMode ? [{ debugName: "coachBusy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedNode = computed(
    () => this.storyConfig().nodes.find((node) => node.id === this.state().selectedNodeId),
    ...ngDevMode ? [{ debugName: "selectedNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedScene = computed(
    () => this.state().scenes[this.state().selectedNodeId],
    ...ngDevMode ? [{ debugName: "selectedScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedStorm = computed(
    () => this.config.stormStages.find((stage) => stage.id === this.selectedNode().stormStageId),
    ...ngDevMode ? [{ debugName: "selectedStorm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedHistoricalSetting = computed(
    () => this.config.historicalSettings.find((setting) => setting.id === this.state().historicalSettingId),
    ...ngDevMode ? [{ debugName: "selectedHistoricalSetting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readiness = computed(
    () => narrativeReadiness(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "readiness" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalWords = computed(
    () => this.storyConfig().nodes.reduce((total, node) => total + wordCount(this.state().scenes[node.id]?.text ?? ""), 0),
    ...ngDevMode ? [{ debugName: "totalWords" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedSceneCount = computed(
    () => this.storyConfig().nodes.filter((node) => wordCount(this.state().scenes[node.id]?.text ?? "") >= 20).length,
    ...ngDevMode ? [{ debugName: "completedSceneCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningTurns = computed(
    () => this.state().coachHistory.filter((turn) => turn.context === "planning"),
    ...ngDevMode ? [{ debugName: "planningTurns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningAnswerCount = computed(
    () => this.planningTurns().filter((turn) => turn.role === "student").length,
    ...ngDevMode ? [{ debugName: "planningAnswerCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextPlanningQuestion = computed(
    () => this.config.planningQuestions[this.planningAnswerCount()],
    ...ngDevMode ? [{ debugName: "nextPlanningQuestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningComplete = computed(
    () => this.planningAnswerCount() >= this.config.planningQuestions.length,
    ...ngDevMode ? [{ debugName: "planningComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setStage(stage) {
    this.checkpointScene();
    this.patch({ stage });
    this.flushSave();
  }
  selectNode(nodeId) {
    if (!this.storyConfig().nodes.some((node) => node.id === nodeId))
      return;
    this.checkpointScene();
    this.patch({ selectedNodeId: nodeId, stage: "write" });
    this.flushSave();
  }
  changeBranch(action) {
    this.checkpointScene();
    const current = this.state();
    const next = changeNarrativeBranch(this.config, current, current.selectedNodeId, action, crypto.randomUUID());
    if (next === current)
      return;
    this.patch(next);
    this.flushSave();
  }
  updateStoryTitle(storyTitle) {
    this.patch({ storyTitle });
  }
  selectHistoricalSetting(historicalSettingId) {
    if (!this.config.historicalSettings.some((setting) => setting.id === historicalSettingId))
      return;
    this.patch({ historicalSettingId });
  }
  updateBible(key, value) {
    this.patch({ bible: __spreadProps(__spreadValues({}, this.state().bible), { [key]: value }) });
  }
  async answerPlanningQuestion(message) {
    const answer = message.trim();
    const question = this.nextPlanningQuestion();
    if (!answer || !question || this.coachBusy())
      return;
    this.updateBible(question.bibleField, answer);
    await this.askCoach("reply", answer);
  }
  updateSceneTitle(title) {
    this.updateSelectedScene({ title });
  }
  updateSceneText(text) {
    if (text === this.selectedScene().text)
      return;
    this.patch({ playtests: [] });
    this.updateSelectedScene({ text });
  }
  updateChoice(choiceId, label) {
    if (!this.selectedNode().choices.some((choice) => choice.id === choiceId))
      return;
    const scene = this.selectedScene();
    if (scene.choiceLabels[choiceId] === label)
      return;
    this.patch({ playtests: [] });
    this.updateSelectedScene({ choiceLabels: __spreadProps(__spreadValues({}, scene.choiceLabels), { [choiceId]: label }) });
  }
  checkpointScene() {
    const scene = this.selectedScene();
    const previous = scene.revisions.at(-1);
    if (previous?.title === scene.title && previous.text === scene.text && JSON.stringify(previous.choiceLabels) === JSON.stringify(scene.choiceLabels))
      return;
    this.updateSelectedScene({
      revisions: [
        ...scene.revisions,
        {
          id: crypto.randomUUID(),
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          title: scene.title,
          text: scene.text,
          choiceLabels: structuredClone(scene.choiceLabels)
        }
      ]
    });
    this.flushSave();
  }
  async askCoach(tool, message) {
    if (this.coachBusy())
      return;
    const trimmed = message?.trim();
    if (tool === "reply" && !trimmed)
      return;
    if (trimmed)
      this.addCoachTurn("student", tool, trimmed);
    this.coachBusy.set(true);
    try {
      const response = await this.coach.respond({
        tool,
        stage: this.state().stage,
        message: trimmed,
        node: this.selectedNode(),
        scene: this.selectedScene(),
        bible: this.state().bible,
        historicalSetting: this.selectedHistoricalSetting(),
        storm: this.selectedStorm(),
        priorTurns: this.state().coachHistory,
        nextPlanningQuestion: this.state().stage === "conversation" ? this.nextPlanningQuestion() : void 0
      });
      this.addCoachTurn("coach", tool, response.text);
    } finally {
      this.coachBusy.set(false);
    }
  }
  recordPlaytest(path) {
    if (!validNarrativePath(this.storyConfig(), path))
      return;
    const endingNodeId = path.at(-1);
    if (endingNodeId === void 0)
      return;
    const ending = this.storyConfig().nodes.find((node) => node.id === endingNodeId);
    if (!ending || ending.kind !== "ending")
      return;
    if (this.state().playtests.some((test) => test.path.join("|") === path.join("|")))
      return;
    this.patch({
      playtests: [
        ...this.state().playtests,
        { id: crypto.randomUUID(), timestamp: (/* @__PURE__ */ new Date()).toISOString(), path, endingNodeId }
      ]
    });
    this.flushSave();
  }
  publish() {
    if (this.readiness().length)
      return false;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.patch({
      published: {
        nodes: structuredClone(this.storyConfig().nodes),
        id: crypto.randomUUID(),
        publishedAt: now,
        title: this.state().storyTitle.trim(),
        authorDisplayName: this.session.actorDisplayName,
        historicalSettingId: this.state().historicalSettingId,
        bible: structuredClone(this.state().bible),
        scenes: structuredClone(this.state().scenes)
      }
    });
    this.flushSave();
    return true;
  }
  flushSave() {
    if (this.saveTimer !== void 0)
      clearTimeout(this.saveTimer);
    const current = this.state();
    const next = __spreadProps(__spreadValues({}, current), {
      revision: current.revision + 1,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    this.state.set(next);
    try {
      this.persistence.save(next);
      this.saveStatus.set("saved");
    } catch {
      this.saveStatus.set("error");
    }
  }
  destroy() {
    this.flushSave();
  }
  load() {
    const saved = this.persistence.load(this.config.projectId, this.config.projectVersion);
    if (saved && !saved.nodes && this.config.authoringMode && !saved.published && Object.values(saved.scenes).every((scene) => !scene.text.trim() && !scene.revisions.length && scene.title === this.config.nodes.find((node) => node.id === scene.nodeId)?.suggestedTitle && Object.values(scene.choiceLabels).every((label) => !label.trim()))) {
      const fresh = createInitialNarrativeState(this.config);
      return __spreadProps(__spreadValues({}, saved), {
        nodes: fresh.nodes,
        scenes: fresh.scenes,
        selectedNodeId: this.config.startNodeId
      });
    }
    return saved ?? __spreadProps(__spreadValues({}, createInitialNarrativeState(this.config, (/* @__PURE__ */ new Date()).toISOString(), this.initialHistorySettingId)), {
      runtimeScope: projectSessionRuntimeScope(this.session, "student")
    });
  }
  patch(patch) {
    this.state.update((state) => __spreadProps(__spreadValues(__spreadValues({}, state), patch), { updatedAt: (/* @__PURE__ */ new Date()).toISOString() }));
    this.scheduleSave();
  }
  updateSelectedScene(patch) {
    const state = this.state();
    const nodeId = state.selectedNodeId;
    this.patch({ scenes: __spreadProps(__spreadValues({}, state.scenes), { [nodeId]: __spreadValues(__spreadValues({}, state.scenes[nodeId]), patch) }) });
  }
  addCoachTurn(role, tool, text) {
    this.patch({
      coachHistory: [
        ...this.state().coachHistory,
        {
          id: crypto.randomUUID(),
          role,
          tool,
          text,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          nodeId: this.state().selectedNodeId,
          context: this.state().stage === "conversation" ? "planning" : "scene"
        }
      ]
    });
  }
  scheduleSave() {
    this.saveStatus.set("saving");
    if (this.saveTimer !== void 0)
      clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushSave(), 700);
  }
  static \u0275fac = function NarrativeStudioRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeStudioRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NarrativeStudioRuntimeService, factory: _NarrativeStudioRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeStudioRuntimeService, [{
    type: Injectable
  }], null, null);
})();

export {
  BrowserNarrativeStudioPersistenceAdapter,
  MemoryNarrativeStudioPersistenceAdapter,
  NARRATIVE_STUDIO_PERSISTENCE,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_SESSION,
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
  NarrativeStudioRuntimeService
};
//# debugId=0fe5a158-9bbc-545a-bfbc-b4f0049a55b6
//# sourceMappingURL=chunk-PJDX5C2H.js.map
