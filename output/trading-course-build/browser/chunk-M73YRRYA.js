import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/narrative-studio/core/narrative-branching.ts
function narrativeDraftConfig(config, state) {
  if (!state.nodes) return config;
  const byId = new Map(state.nodes.map((node) => [node.id, node]));
  const reached = /* @__PURE__ */ new Set();
  const pending = [config.startNodeId];
  while (pending.length) {
    const id = pending.shift();
    if (reached.has(id)) continue;
    reached.add(id);
    for (const choice of byId.get(id)?.choices ?? []) pending.push(choice.nextNodeId);
  }
  return __spreadProps(__spreadValues({}, config), { nodes: state.nodes.filter((node) => reached.has(node.id)) });
}
function changeNarrativeBranch(config, state, nodeId, action, branchId) {
  const nodes = state.nodes ?? config.nodes;
  const node = nodes.find((item) => item.id === nodeId);
  const scene = state.scenes[nodeId];
  if (!node || !scene || action === "branch" && node.choices.length) return state;
  if (action !== "branch") {
    if (nodeId === config.startNodeId) return state;
    return __spreadProps(__spreadValues({}, state), {
      playtests: [],
      nodes: nodes.map(
        (item) => item.id === nodeId ? __spreadProps(__spreadValues({}, item), {
          kind: "ending",
          endingOutcome: action === "end" ? "death" : "survival",
          choices: []
        }) : item
      ),
      scenes: __spreadProps(__spreadValues({}, state.scenes), {
        [nodeId]: __spreadProps(__spreadValues({}, scene), {
          parkedChoices: node.choices.length ? node.choices : scene.parkedChoices
        })
      })
    });
  }
  const restored = scene.parkedChoices?.length ? scene.parkedChoices : void 0;
  const choices = restored ?? [1, 2].map((index) => ({
    id: `${branchId}-choice-${index}`,
    nextNodeId: `${branchId}-${index}`,
    prompt: `Write choice ${index}`
  }));
  if (!restored && choices.some((choice) => nodes.some((item) => item.id === choice.nextNodeId)))
    return state;
  const children = restored ? [] : choices.map((choice, index) => ({
    id: choice.nextNodeId,
    kind: "scene",
    mapLabel: `Branch ${index + 1}`,
    suggestedTitle: `Untitled branch ${index + 1}`,
    purpose: "Tell what happens because of the reader\u2019s choice.",
    craftPrompt: "Show the consequence. Then decide whether this path ends or branches again.",
    choiceQuestion: "What happens next?",
    stormStageId: node.stormStageId,
    choices: []
  }));
  const scenes = __spreadProps(__spreadValues({}, state.scenes), {
    [nodeId]: __spreadProps(__spreadValues({}, scene), {
      parkedChoices: void 0,
      choiceLabels: __spreadValues(__spreadValues({}, scene.choiceLabels), Object.fromEntries(
        choices.map((choice) => [choice.id, scene.choiceLabels[choice.id] ?? ""])
      ))
    })
  });
  for (const child of children)
    scenes[child.id] = {
      nodeId: child.id,
      title: child.suggestedTitle,
      text: "",
      choiceLabels: {},
      revisions: []
    };
  return __spreadProps(__spreadValues({}, state), {
    playtests: [],
    scenes,
    nodes: [
      ...nodes.map(
        (item) => item.id === nodeId ? __spreadProps(__spreadValues({}, item), {
          kind: "scene",
          endingOutcome: void 0,
          choiceQuestion: "What happens next?",
          choices
        }) : item
      ),
      ...children
    ]
  });
}
function validNarrativePath(config, path) {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  return path[0] === config.startNodeId && byId.get(path.at(-1) ?? "")?.kind === "ending" && path.every(
    (id, index) => index === 0 || !!byId.get(path[index - 1])?.choices.some((choice) => choice.nextNodeId === id)
  );
}
function narrativeGraphIssues(config) {
  const issues = [];
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const visiting = /* @__PURE__ */ new Set();
  const visited = /* @__PURE__ */ new Set();
  const visit = (id) => {
    if (visiting.has(id)) {
      issues.push({
        code: "STORY_CYCLE",
        message: "A branch loops back without reaching an ending.",
        nodeId: id
      });
      return;
    }
    if (visited.has(id)) return;
    const node = byId.get(id);
    if (!node) {
      issues.push({ code: "BRANCH_MISSING", message: "A choice needs a connected scene." });
      return;
    }
    visiting.add(id);
    if (node.kind === "scene" && node.choices.length !== 2)
      issues.push({
        code: "BRANCH_UNDECIDED",
        message: `${node.mapLabel}: add two choices or mark this as an ending.`,
        nodeId: id
      });
    if (node.kind === "ending" && node.choices.length)
      issues.push({
        code: "ENDING_HAS_CHOICES",
        message: `${node.mapLabel}: endings cannot have outgoing choices.`,
        nodeId: id
      });
    if (new Set(node.choices.map((choice) => choice.id)).size !== node.choices.length)
      issues.push({
        code: "CHOICE_ID_REPEATED",
        message: `${node.mapLabel}: choice identifiers must be unique.`,
        nodeId: id
      });
    for (const choice of node.choices) visit(choice.nextNodeId);
    visiting.delete(id);
    visited.add(id);
  };
  visit(config.startNodeId);
  if (byId.size !== config.nodes.length)
    issues.push({ code: "SCENE_ID_REPEATED", message: "Scene identifiers must be unique." });
  if (config.nodes.filter((node) => visited.has(node.id) && node.kind === "ending").length < 2)
    issues.push({
      code: "ENDINGS_MISSING",
      message: "Give your readers at least two different endings."
    });
  return issues;
}

// src/app/templates/narrative-studio/core/narrative-studio-state.ts
var NARRATIVE_STAGES = [
  { id: "map", label: "Story Map", optional: false },
  { id: "write", label: "Scene Writer", optional: false },
  { id: "playtest", label: "Playtest", optional: false },
  { id: "publish", label: "Publish", optional: false },
  { id: "conversation", label: "Planning Guide", optional: true },
  { id: "bible", label: "Story Notes", optional: true }
];
function validateNarrativeConfig(config) {
  const ids = config.nodes.map((node) => node.id);
  if (config.template.id !== "narrative-studio" || !["1.0", "1.1", "1.2", "1.3"].includes(config.template.version) || !config.projectId || !config.projectVersion || !/^\/(?!\/)/.test(config.launchImage) || !config.launchImageAlt.trim() || config.historicalSettings.length < 3 || config.historicalSettings.length > 4 || new Set(config.historicalSettings.map((setting) => setting.id)).size !== config.historicalSettings.length || config.historicalSettings.some(
    (setting) => ![
      setting.id,
      setting.eraLabel,
      setting.title,
      setting.historicalEvent,
      setting.overview,
      setting.fictionalRole,
      setting.survivalPressure,
      setting.openingLine,
      setting.accuracyBoundary,
      setting.sourceLabel
    ].every((value) => value.trim()) || !/^https:\/\//.test(setting.sourceUrl)
  ) || config.planningQuestions.length !== 6 || new Set(config.planningQuestions.map((question) => question.id)).size !== 6 || new Set(config.planningQuestions.map((question) => question.bibleField)).size !== 6 || config.planningQuestions.some((question) => !question.id.trim() || !question.prompt.trim()) || ids.length < 6 || new Set(ids).size !== ids.length || !ids.includes(config.startNodeId)) {
    throw new Error("CONFIG_INVALID: Narrative Studio requires a unique, connected story graph.");
  }
  const stormIds = new Set(config.stormStages.map((stage) => stage.id));
  for (const node of config.nodes) {
    if (!stormIds.has(node.stormStageId)) {
      throw new Error(`CONFIG_INVALID: Scene "${node.id}" references an unknown storm stage.`);
    }
    if (node.kind === "ending" && node.choices.length > 0) {
      throw new Error(`CONFIG_INVALID: Ending "${node.id}" cannot lead to another scene.`);
    }
    if (node.kind === "scene" && (node.choices.length !== 2 || !node.choiceQuestion?.trim())) {
      throw new Error(
        `CONFIG_INVALID: Decision scene "${node.id}" needs one question and exactly two options.`
      );
    }
    for (const choice of node.choices) {
      if (!ids.includes(choice.nextNodeId)) {
        throw new Error(`CONFIG_INVALID: Choice "${choice.id}" has an unknown destination.`);
      }
    }
  }
  const reachable = reachableNodeIds(config);
  if (reachable.size !== ids.length || config.nodes.filter((node) => node.kind === "ending").length < 3) {
    throw new Error("CONFIG_INVALID: Every scene and at least three endings must be reachable.");
  }
}
function createInitialNarrativeState(config, timestamp = (/* @__PURE__ */ new Date()).toISOString(), historicalSettingId = "") {
  validateNarrativeConfig(config);
  const opening = config.nodes.find((node) => node.id === config.startNodeId);
  const nodes = config.authoringMode === "student-branches" ? [
    __spreadProps(__spreadValues({}, opening), {
      suggestedTitle: "My opening",
      choices: opening.choices.map((choice, index) => __spreadProps(__spreadValues({}, choice), {
        prompt: `Write choice ${index + 1}`
      }))
    }),
    ...opening.choices.map((choice, index) => __spreadProps(__spreadValues({}, config.nodes.find((node) => node.id === choice.nextNodeId)), {
      kind: "scene",
      mapLabel: `Branch ${index + 1}`,
      suggestedTitle: `Branch ${index + 1}`,
      purpose: "Tell what happens because of the reader\u2019s choice.",
      craftPrompt: "Show the consequence. Then decide whether this path ends or branches again.",
      choices: []
    }))
  ] : config.nodes;
  const scenes = Object.fromEntries(nodes.map((node) => [node.id, createScene(node)]));
  return __spreadProps(__spreadValues({
    schemaVersion: "1.0",
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    revision: 0,
    updatedAt: timestamp,
    stage: "map",
    selectedNodeId: config.startNodeId,
    storyTitle: "",
    historicalSettingId: config.historicalSettings.some(
      (setting) => setting.id === historicalSettingId
    ) ? historicalSettingId : "",
    bible: {
      protagonist: "",
      immediateGoal: "",
      innerFear: "",
      islandSecret: "",
      companion: "",
      importantObject: "",
      pointOfView: "third",
      tone: "adventure"
    },
    scenes
  }, config.authoringMode ? { nodes } : {}), {
    coachHistory: [],
    playtests: []
  });
}
function narrativeReadiness(config, state) {
  config = narrativeDraftConfig(config, state);
  const issues = [...narrativeGraphIssues(config)];
  if (!config.historicalSettings.some((setting) => setting.id === state.historicalSettingId)) {
    issues.push({
      code: "HISTORY_MISSING",
      message: "Choose the historical event that will anchor your story."
    });
  }
  if (state.storyTitle.trim().length < 3) {
    issues.push({ code: "TITLE_MISSING", message: "Give your story a title." });
  }
  for (const node of config.nodes) {
    const scene = state.scenes[node.id];
    if (!scene || scene.text.trim().split(/\s+/).filter(Boolean).length < 20) {
      issues.push({
        code: "SCENE_TOO_SHORT",
        message: `${node.mapLabel} needs at least 20 words.`,
        nodeId: node.id
      });
    }
    const labels = node.choices.map((choice) => scene?.choiceLabels[choice.id]?.trim() ?? "");
    if (labels.some((label) => label.length < 3)) {
      issues.push({
        code: "CHOICE_MISSING",
        message: `${node.mapLabel} needs clear reader-choice labels.`,
        nodeId: node.id
      });
    } else if (new Set(labels.map((label) => label.toLowerCase())).size !== labels.length) {
      issues.push({
        code: "CHOICES_REPEAT",
        message: `${node.mapLabel} needs choices that lead in meaningfully different directions.`,
        nodeId: node.id
      });
    }
  }
  if (new Set(
    state.playtests.filter((test) => validNarrativePath(config, test.path)).map((test) => test.endingNodeId)
  ).size < 2) {
    issues.push({
      code: "PLAYTEST_INCOMPLETE",
      message: "Playtest paths to at least two different endings."
    });
  }
  return issues;
}
function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
function createScene(node) {
  return {
    nodeId: node.id,
    title: node.suggestedTitle,
    text: "",
    choiceLabels: Object.fromEntries(node.choices.map((choice) => [choice.id, ""])),
    revisions: []
  };
}
function reachableNodeIds(config) {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const reached = /* @__PURE__ */ new Set();
  const pending = [config.startNodeId];
  while (pending.length) {
    const id = pending.pop();
    if (reached.has(id)) continue;
    reached.add(id);
    for (const choice of byId.get(id)?.choices ?? []) pending.push(choice.nextNodeId);
  }
  return reached;
}

export {
  narrativeDraftConfig,
  changeNarrativeBranch,
  validNarrativePath,
  narrativeGraphIssues,
  NARRATIVE_STAGES,
  validateNarrativeConfig,
  createInitialNarrativeState,
  narrativeReadiness,
  wordCount
};
//# debugId=a898b468-75b8-5335-a8e3-cb7bbfffde6a
//# sourceMappingURL=chunk-M73YRRYA.js.map
