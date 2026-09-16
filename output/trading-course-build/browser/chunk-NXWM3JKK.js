import {
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_FINAL_EXAMPLE,
  TIME_REPAIR_PERSISTENCE,
  TIME_REPAIR_SESSION,
  TimeRepairRuntime,
  applyTimeRepairAction,
  initialTimeRepairState,
  repairCapabilities,
  validateRepairPreview
} from "./chunk-F4667FO2.js";
import {
  INVENTION_CONTEXT,
  INVENTION_EXAMPLE,
  INVENTION_PROJECT,
  inventionCapabilities,
  pullProof,
  validKnowledgeDefinition,
  validPressSettings
} from "./chunk-KCORHQSX.js";
import "./chunk-RTVK2FN5.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import "./chunk-2WXJ5NX3.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/time-repair/domain/time-repair.validation.ts
function check(condition, path) {
  if (!condition) throw new Error(`INVALID_TIME_REPAIR_PACKAGE: ${path}`);
}
function record(value, path) {
  check(value && typeof value === "object" && !Array.isArray(value), path);
  return value;
}
function text(value, path) {
  check(typeof value === "string" && value.trim().length > 0 && value.length <= 8e3, path);
}
function list(value, path, min = 1) {
  check(Array.isArray(value) && value.length >= min && value.length <= 100, path);
  return value;
}
function strings(value, path, min = 1) {
  const values = list(value, path, min);
  values.forEach((v) => text(v, path));
  check(new Set(values).size === values.length, `${path}: duplicate value`);
  return values;
}
function number(value, path, min, max) {
  check(typeof value === "number" && Number.isFinite(value) && value >= min && value <= max, path);
}
function entities(value, path) {
  const items = list(value, path).map((v) => record(v, path));
  for (const item of items)
    check(
      typeof item["id"] === "string" && /^[a-z][a-z0-9-]{0,79}$/.test(item["id"]),
      `${path}.id`
    );
  check(new Set(items.map((i) => i["id"])).size === items.length, `${path}: duplicate ID`);
  return items;
}
function freeze(value) {
  if (value && typeof value === "object") {
    Object.freeze(value);
    Object.values(value).forEach(freeze);
  }
  return value;
}
function requireTimeRepairConfig(value) {
  const c = record(value, "project");
  const template = record(c["template"], "template");
  check(
    c["schemaVersion"] === "1.0" && template["id"] === "time-repair" && template["version"] === "1.0",
    "schema/template version"
  );
  for (const key of ["projectId", "projectVersion", "title", "subtitle", "briefing"])
    text(c[key], key);
  check(["history", "literature"].includes(String(c["subject"])), "subject");
  const settings = record(c["settings"], "settings");
  number(settings["repairCharges"], "repairCharges", 1, 30);
  check(Number.isInteger(settings["repairCharges"]), "repairCharges must be an integer");
  number(settings["initialStability"], "initialStability", 0, 99);
  number(settings["wrongRepairPenalty"], "wrongRepairPenalty", 1, 100);
  number(settings["minReasoningLength"], "minReasoningLength", 20, 500);
  for (const stage of list(c["stages"], "stages")) {
    const s = record(stage, "stage");
    text(s["title"], "stage.title");
    text(s["description"], "stage.description");
  }
  const nodes = entities(c["nodes"], "nodes");
  for (const node of nodes) {
    for (const key of ["title", "dateLabel", "summary"]) text(node[key], `node.${key}`);
    number(node["order"], "node.order", 0, 1e3);
    check(
      ["stable", "uncertain", "missing"].includes(String(node["initialStatus"])),
      "node.initialStatus"
    );
  }
  check(new Set(nodes.map((n) => n["order"])).size === nodes.length, "node orders must be unique");
  const evidence = entities(c["evidence"], "evidence");
  for (const e of evidence) {
    for (const key of ["title", "content", "citation", "perspective"])
      text(e[key], `evidence.${key}`);
    check(
      ["primary", "secondary", "quotation", "map"].includes(String(e["kind"])),
      "evidence.kind"
    );
    if (e["url"] !== void 0) {
      text(e["url"], "evidence.url");
      check(/^https:\/\/[^\s]+$/.test(e["url"]), "evidence URL must use HTTPS");
    }
  }
  const scenes = entities(c["scenes"], "scenes");
  for (const scene of scenes) {
    for (const key of ["title", "image", "imageAlt"]) text(scene[key], `scene.${key}`);
    check(
      /^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(String(scene["image"])),
      "scene image must be a local asset"
    );
    const views = entities(scene["views"], "views");
    check(views.length <= 4, "at most four views");
    for (const view of views) {
      text(view["label"], "view.label");
      check(/^\d{1,3}% \d{1,3}%$/.test(String(view["position"])), "view.position");
    }
    for (const hotspot of entities(scene["hotspots"], "hotspots")) {
      text(hotspot["label"], "hotspot.label");
      text(hotspot["description"], "hotspot.description");
      for (const key of ["objectImage", "restoredObjectImage"]) {
        if (hotspot[key] !== void 0)
          check(
            typeof hotspot[key] === "string" && /^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(hotspot[key]),
            `hotspot.${key} must be a local asset`
          );
      }
      if (hotspot["restoredObjectImage"] !== void 0)
        text(hotspot["objectImage"], "restored object requires an initial image");
      number(hotspot["x"], "hotspot.x", 5, 95);
      number(hotspot["y"], "hotspot.y", 5, 90);
    }
  }
  const missions = entities(c["missions"], "missions");
  check(
    new Set(missions.map((m) => m["nodeId"])).size === missions.length,
    "one repair mission per node"
  );
  const reference = (items, id, path) => check(
    items.some((i) => i["id"] === id),
    `REFERENCE_NOT_FOUND: ${path}`
  );
  for (const m of missions) {
    reference(nodes, m["nodeId"], "mission.nodeId");
    reference(scenes, m["sceneId"], "mission.sceneId");
    for (const key of ["signal", "canonicalSummary", "verificationPrompt"])
      text(m[key], `mission.${key}`);
    strings(m["prerequisiteMissionIds"], "prerequisites", 0).forEach(
      (id) => reference(missions, id, "prerequisite")
    );
    strings(m["evidenceRequired"], "evidenceRequired").forEach(
      (id) => reference(evidence, id, "required evidence")
    );
    const categories = strings(m["categories"], "categories");
    const defense = record(m["defense"], "defense");
    text(defense["prompt"], "defense.prompt");
    const answers = entities(defense["options"], "defense.options");
    answers.forEach((o) => text(o["label"], "answer.label"));
    const repair = record(m["repair"], "repair");
    check(
      typeof repair["capability"] === "string" && Object.hasOwn(repairCapabilities, repair["capability"]),
      `CAPABILITY_NOT_INSTALLED: ${String(repair["capability"])}`
    );
    const scene = scenes.find((s) => s["id"] === m["sceneId"]);
    reference(entities(scene["hotspots"], "hotspots"), repair["targetHotspotId"], "repair target");
    const options = entities(repair["options"], "repair.options");
    for (const o of options)
      for (const key of ["label", "description", "objectLabel"]) text(o[key], `option.${key}`);
    const evaluation = record(m["evaluation"], "evaluation");
    check(categories.includes(String(evaluation["category"])), "evaluation.category");
    reference(answers, evaluation["defenseOptionId"], "defense answer");
    reference(options, evaluation["repairOptionId"], "repair answer");
    const rippleNodes = [];
    for (const item of list(m["ripples"], "ripples")) {
      const r = record(item, "ripple");
      reference(nodes, r["nodeId"], "ripple.nodeId");
      text(r["before"], "ripple.before");
      text(r["after"], "ripple.after");
      check(
        Number(nodes.find((n) => n["id"] === r["nodeId"])["order"]) > Number(nodes.find((n) => n["id"] === m["nodeId"])["order"]),
        "ripples must point forward"
      );
      rippleNodes.push(r["nodeId"]);
    }
    check(new Set(rippleNodes).size === rippleNodes.length, "duplicate ripple node");
    number(m["stabilityValue"], "stabilityValue", 1, 100);
  }
  const config = structuredClone(value);
  const visit = (id, path) => {
    check(!path.includes(id), "cyclic prerequisites");
    config.missions.find((m) => m.id === id).prerequisiteMissionIds.forEach((p) => visit(p, [...path, id]));
  };
  config.missions.forEach((m) => visit(m.id, []));
  check(
    config.settings.repairCharges >= missions.length,
    "insufficient charges to complete all missions"
  );
  check(
    config.settings.initialStability + config.missions.reduce((sum, m) => sum + m.stabilityValue, 0) === 100,
    "stability values must total 100"
  );
  if (config.previewWeeks !== void 0) validateRepairPreview(config.previewWeeks, config);
  return freeze(config);
}

// src/app/templates/time-repair/invention/invention.validation.ts
function check2(value, path) {
  if (!value) throw new Error(`INVALID_INVENTION_PACKAGE: ${path}`);
}
function object(value) {
  check2(value && typeof value === "object" && !Array.isArray(value), "expected object");
  return value;
}
function text2(value) {
  return typeof value === "string" && value.trim().length > 0 && value.length < 4e3;
}
function rows(value, min, max = min) {
  check2(Array.isArray(value) && value.length >= min && value.length <= max, "array length");
  return value.map(object);
}
function deepFreeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
function requireInventionProject(value) {
  const p = object(value), template = object(p["template"]), c = object(p["inventionRescue"]);
  check2(
    p["schemaVersion"] === "1.0" && template["id"] === "time-repair" && template["version"] === "1.1",
    "schema/template version"
  );
  check2(typeof p["projectId"] === "string" && /^[a-z0-9-]+$/.test(p["projectId"]), "projectId");
  check2(
    typeof p["projectVersion"] === "string" && /^\d+\.\d+\.\d+$/.test(p["projectVersion"]),
    "projectVersion"
  );
  check2(text2(p["title"]) && text2(p["subtitle"]), "title/subtitle");
  check2(c["version"] === "1.0", "extension version");
  check2(
    typeof c["capability"] === "string" && inventionCapabilities.has(c["capability"]),
    `CAPABILITY_NOT_INSTALLED: ${String(c["capability"])}`
  );
  check2(text2(c["fiction"]) && text2(c["modelNote"]), "scenario context");
  const inks = rows(c["inks"], 3, 3);
  for (const ink of inks) {
    check2(
      ["id", "mark", "name"].every((k) => text2(ink[k])),
      "ink identity"
    );
    check2(typeof ink["color"] === "string" && /^#[0-9a-f]{6}$/i.test(ink["color"]), "ink color");
    for (const k of ["adhesion", "spread", "paperAdhesion"])
      check2(
        typeof ink[k] === "number" && Number.isFinite(ink[k]) && ink[k] >= 0 && ink[k] <= 1,
        `ink.${k}`
      );
  }
  check2(new Set(inks.map((i) => i["id"])).size === inks.length, "duplicate ink");
  const sources = rows(c["sources"], 1, 12);
  for (const s of sources)
    check2(
      ["id", "title", "detail"].every((k) => text2(s[k])) && typeof s["url"] === "string" && /^https:\/\/[^\s]+$/.test(s["url"]),
      "source"
    );
  check2(new Set(sources.map((s) => s["id"])).size === sources.length, "duplicate source");
  for (const w of rows(c["weeks"], 4))
    check2(
      text2(w["title"]) && text2(w["goal"]) && Array.isArray(w["evidence"]) && w["evidence"].length > 0 && w["evidence"].every(text2),
      "week"
    );
  const sessions = rows(c["sessions"], 8);
  const modes = [
    "courtyard",
    "reference",
    "compose",
    "recompose",
    "ink",
    "packing",
    "production",
    "return",
    "knowledge"
  ];
  check2(new Set(sessions.map((s) => s["id"])).size === 8, "duplicate session");
  const project = structuredClone(value);
  for (const [i, s] of sessions.entries()) {
    check2(s["number"] === i + 1 && modes.includes(String(s["mode"])), "session number/mode");
    check2(
      [
        "id",
        "title",
        "location",
        "date",
        "task",
        "goal",
        "product",
        "historicalNote",
        "question"
      ].every((k) => text2(s[k])),
      "session content"
    );
    check2(
      typeof s["target"] === "string" && /^[A-Z]{5}$/.test(s["target"]),
      "five letter specimen"
    );
    check2(
      Array.isArray(s["sourceIds"]) && s["sourceIds"].length > 0 && s["sourceIds"].every((id) => sources.some((source) => source["id"] === id)),
      "source reference"
    );
    check2(
      Number.isInteger(s["batchSize"]) && Number(s["batchSize"]) >= 1 && Number(s["batchSize"]) <= 5,
      "batch size"
    );
    const session = project.inventionRescue.sessions[i];
    check2(
      s["mode"] === "knowledge" ? validKnowledgeDefinition(s["knowledge"]) : s["knowledge"] === void 0,
      "knowledge capability configuration"
    );
    check2(validPressSettings(session.initial, project, session), "initial settings");
    check2(
      inks.some(
        (ink) => pullProof(
          project,
          session,
          {
            type: [...session.target].reverse(),
            ink: String(ink["id"]),
            pressure: 1,
            packing: [1, 1, 1]
          },
          1
        ).usable
      ),
      "no feasible repair"
    );
  }
  return deepFreeze(project);
}

// src/app/templates/time-repair/domain/time-repair.package.ts
function isInventionProject(value) {
  return "inventionRescue" in value;
}
function requireTimeRepairPackage(value) {
  return value && typeof value === "object" && "inventionRescue" in value ? requireInventionProject(value) : requireTimeRepairConfig(value);
}

// src/app/templates/time-repair/runtime/time-repair.persistence.ts
var BrowserTimeRepairPersistence = class {
  constructor(config, session, storage = safeBrowserStorage()) {
    this.config = config;
    this.session = session;
    this.available = storage !== void 0;
    this.definition = JSON.stringify(Object.fromEntries(Object.entries(config).filter(([key]) => key !== "previewWeeks")));
    this.store = new ScopedBrowserStore(
      "time-repair.v1",
      storage,
      (value) => {
        try {
          if (!value || typeof value !== "object") return false;
          const saved = value;
          if (saved.definition !== this.definition || !Array.isArray(saved.state?.events) || saved.state.events.length > 1e3)
            return false;
          let replay = initialTimeRepairState(config);
          for (const event of saved.state.events) {
            if (event.tenantId !== session.tenantId || event.actor?.id !== session.actorId || event.attemptId !== session.attemptId || typeof event.timestamp !== "string")
              return false;
            const action = event.payload?.["action"];
            replay = applyTimeRepairAction(config, replay, action, event).state;
          }
          return JSON.stringify(replay) === JSON.stringify(saved.state);
        } catch {
          return false;
        }
      }
    );
  }
  config;
  session;
  store;
  available;
  definition;
  load() {
    return this.store.load(this.session)?.state;
  }
  save(state, expectedVersion) {
    if (this.available && (this.load()?.version ?? 0) !== expectedVersion)
      throw new Error(
        "STATE_CONFLICT: Another tab changed this exercise. The latest saved progress has been loaded; review it before trying again."
      );
    this.store.save(this.session, { definition: this.definition, state });
  }
};

// src/app/runtime/project-launch/template-launchers/time-repair.launcher.ts
var timeRepairLauncher = {
  templateId: "time-repair",
  async load(request) {
    if (request.session.authorityMode !== "localDemo")
      throw new Error(
        "CAPABILITY_NOT_INSTALLED: Shared Time Repair sessions require a classroom authority and synchronization adapter. This pilot supports local exercises."
      );
    const config = requireTimeRepairPackage(request.projectDefinition);
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion || config.projectId !== request.session.projectId || config.projectVersion !== request.session.projectVersion)
      throw new Error(
        "PROJECT_ID_MISMATCH: Time Repair package and session must match the selected project version."
      );
    if (isInventionProject(config)) {
      const { InventionWorkspaceComponent } = await import("./chunk-RXOBA23M.js");
      return {
        component: InventionWorkspaceComponent,
        integratedHeader: true,
        providers: [
          { provide: INVENTION_PROJECT, useValue: config },
          { provide: INVENTION_CONTEXT, useValue: request.session },
          { provide: INVENTION_EXAMPLE, useValue: request.view === "final-demo" }
        ]
      };
    }
    const { TimeRepairPageComponent } = await import("./chunk-2EP3J7B2.js");
    return {
      component: TimeRepairPageComponent,
      integratedHeader: true,
      providers: [
        { provide: TIME_REPAIR_FINAL_EXAMPLE, useValue: request.view === "final-demo" },
        { provide: TIME_REPAIR_CONFIG, useValue: config },
        { provide: TIME_REPAIR_SESSION, useValue: request.session },
        {
          provide: TIME_REPAIR_PERSISTENCE,
          useFactory: () => new BrowserTimeRepairPersistence(config, request.session)
        },
        TimeRepairRuntime
      ]
    };
  }
};
export {
  timeRepairLauncher
};
//# debugId=02c06ff7-0d5e-5027-a9b7-fd0065e77b3c
//# sourceMappingURL=chunk-NXWM3JKK.js.map
