import {
  createDemoJourneyClassSummary
} from "./chunk-WXT6AGWE.js";
import {
  JourneyReplayRuntimeService,
  journeyAuthorityLocator
} from "./chunk-EHZR63UE.js";
import {
  IndexedDbAssetStorageAdapter
} from "./chunk-UMZJFDZE.js";
import {
  BrowserJourneyPathPersistence,
  JOURNEY_PATH_PERSISTENCE
} from "./chunk-Q7O3ZRXD.js";
import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE
} from "./chunk-Q2RH2RH4.js";
import {
  distinctUntilChanged,
  from,
  shareReplay,
  switchMap,
  timer
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/infrastructure/journey-replay/http-journey-replay.adapters.ts
var JourneyAuthorityHttpError = class extends Error {
  constructor(status, message, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
  status;
  body;
};
var HttpJourneyReplayAuthorityAdapter = class {
  constructor(baseUrl = "/api/journey", fetcher = fetch, pollIntervalMs = 4e3) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher;
    this.pollIntervalMs = pollIntervalMs;
  }
  baseUrl;
  fetcher;
  pollIntervalMs;
  openSession(locator, enrollmentHint) {
    return this.request("/session", {
      method: "POST",
      body: JSON.stringify({ locator, studentDisplayName: enrollmentHint.studentDisplayName })
    });
  }
  async loadRecord(locator) {
    try {
      return await this.request(`/record${locatorQuery(locator)}`);
    } catch (error) {
      if (error instanceof JourneyAuthorityHttpError && error.status === 404) return void 0;
      throw error;
    }
  }
  saveRecord(request) {
    return this.request("/record", {
      method: "PUT",
      body: JSON.stringify(request)
    });
  }
  async loadSubmission(locator) {
    try {
      return await this.request(`/submission${locatorQuery(locator)}`);
    } catch (error) {
      if (error instanceof JourneyAuthorityHttpError && error.status === 404) return void 0;
      throw error;
    }
  }
  submitJourney(request) {
    return this.request("/submission", {
      method: "POST",
      body: JSON.stringify(request)
    });
  }
  reviewSubmission(request) {
    return this.request(`/submissions/${encodeURIComponent(request.submissionId)}/review`, {
      method: "POST",
      body: JSON.stringify(request)
    });
  }
  classSummary(locator) {
    return timer(0, this.pollIntervalMs).pipe(
      switchMap(() => from(this.request(`/class-summary${locatorQuery(locator)}`))),
      distinctUntilChanged((previous, next) => previous.revision === next.revision),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
  async request(path, init = {}) {
    const headers = new Headers(init.headers);
    if (init.body !== void 0 && !(init.body instanceof FormData)) headers.set("content-type", "application/json");
    headers.set("accept", "application/json");
    const response = await this.fetcher(`${this.baseUrl}${path}`, __spreadProps(__spreadValues({}, init), {
      headers,
      credentials: "same-origin"
    }));
    const body = await responseBody(response);
    if (!response.ok) {
      const message = isErrorBody(body) ? body.error : `JOURNEY_AUTHORITY_HTTP_${response.status}`;
      throw new JourneyAuthorityHttpError(response.status, message, body);
    }
    return body;
  }
};
var HttpJourneyReplayMediaAdapter = class {
  constructor(locator, fallback, baseUrl = "/api/journey", fetcher = fetch) {
    this.locator = locator;
    this.fallback = fallback;
    this.baseUrl = baseUrl;
    this.fetcher = fetcher;
  }
  locator;
  fallback;
  baseUrl;
  fetcher;
  async upload(input) {
    const data = new FormData();
    data.set("file", input.file, input.fileName);
    data.set("locator", JSON.stringify(this.locator));
    data.set("metadata", JSON.stringify(input.metadata ?? {}));
    try {
      const response = await this.fetcher(`${this.baseUrl}/media`, {
        method: "POST",
        body: data,
        credentials: "same-origin",
        headers: { accept: "application/json" }
      });
      const body = await responseBody(response);
      if (!response.ok) {
        const message = isErrorBody(body) ? body.error : `JOURNEY_MEDIA_HTTP_${response.status}`;
        throw new JourneyAuthorityHttpError(response.status, message, body);
      }
      return body;
    } catch (error) {
      if (this.fallback !== void 0 && isLocalApiUnavailable(error)) {
        const asset = await this.fallback.upload(input);
        return __spreadProps(__spreadValues({}, asset), { id: `local:${asset.id}` });
      }
      throw error;
    }
  }
  async getReference(assetId) {
    if (assetId.startsWith("local:") && this.fallback !== void 0) {
      return this.fallback.getReference(assetId.slice(6));
    }
    if (this.fallback) {
      try {
        return await this.fallback.getReference(assetId);
      } catch {
      }
    }
    return {
      id: assetId,
      reference: `${this.baseUrl}/media/${encodeURIComponent(assetId)}`
    };
  }
  async promoteLocalAsset(assetId) {
    if (!assetId.startsWith("local:") || !this.fallback) return this.getReference(assetId);
    const local = await this.fallback.getReference(assetId.slice(6));
    try {
      const blob = await (await fetch(local.reference)).blob();
      const data = new FormData();
      data.set("file", blob, local.fileName ?? "response.webm");
      data.set("locator", JSON.stringify(this.locator));
      data.set("metadata", JSON.stringify(local.metadata ?? {}));
      const response = await this.fetcher(`${this.baseUrl}/media`, { method: "POST", body: data, credentials: "same-origin", headers: { accept: "application/json" } });
      const body = await responseBody(response);
      if (!response.ok) throw new JourneyAuthorityHttpError(response.status, isErrorBody(body) ? body.error : "AUDIO_SYNC_FAILED");
      return body;
    } finally {
      if (local.reference.startsWith("blob:")) URL.revokeObjectURL(local.reference);
    }
  }
};
function locatorQuery(locator) {
  const params = new URLSearchParams({
    tenantId: locator.tenantId,
    classId: locator.classId,
    classLabel: locator.classLabel,
    projectId: locator.projectId,
    projectVersion: locator.projectVersion
  });
  return `?${params.toString()}`;
}
async function responseBody(response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return void 0;
  return response.json();
}
function isErrorBody(value) {
  return typeof value === "object" && value !== null && "error" in value && typeof value.error === "string";
}
function isLocalApiUnavailable(error) {
  return error instanceof TypeError || error instanceof JourneyAuthorityHttpError && (error.status === 404 || error.status === 405);
}

// src/app/templates/journey-replay/persistence/journey-replay.persistence.ts
var BrowserJourneyReplayPersistenceAdapter = class {
  constructor(storage = safeStorage(), scope = { tenantId: "legacy", classId: "legacy" }) {
    this.storage = storage;
    this.scope = scope;
  }
  storage;
  scope;
  key(projectId, version, studentId) {
    return `forge:journey-replay:v2:${JSON.stringify([this.scope.tenantId, this.scope.classId, projectId, version, studentId])}`;
  }
  read(projectId, version, studentId) {
    const value = this.storage?.getItem(this.key(projectId, version, studentId));
    if (!value) return void 0;
    try {
      const parsed = JSON.parse(value);
      if (!isStudentJourneyRecord(parsed.record) || !Number.isInteger(parsed.checkpoint?.acknowledgedRevision)) throw new Error();
      return parsed;
    } catch {
      throw new Error("JOURNEY_CACHE_DAMAGED");
    }
  }
  load(projectId, projectVersion, studentId) {
    return this.read(projectId, projectVersion, studentId)?.record;
  }
  save(record2) {
    this.saveCheckpoint(record2, { acknowledgedRevision: 0, pendingId: crypto.randomUUID() });
  }
  loadCheckpoint(projectId, version, studentId) {
    return this.read(projectId, version, studentId)?.checkpoint;
  }
  saveCheckpoint(record2, checkpoint) {
    if (!this.storage) throw new Error("JOURNEY_STORAGE_UNAVAILABLE");
    this.storage.setItem(this.key(record2.projectId, record2.projectVersion, record2.studentId), JSON.stringify({ record: record2, checkpoint }));
  }
  clear(projectId, projectVersion, studentId) {
    this.storage?.removeItem(this.key(projectId, projectVersion, studentId));
  }
};
function safeStorage() {
  try {
    return typeof localStorage === "undefined" ? void 0 : localStorage;
  } catch {
    return void 0;
  }
}
function isStudentJourneyRecord(value) {
  return typeof value === "object" && value !== null && "schemaVersion" in value && value.schemaVersion === "1.0" && "completedSteps" in value && Array.isArray(value.completedSteps) && "route" in value && Array.isArray(value.route) && "replayTimeline" in value && Array.isArray(value.replayTimeline);
}

// src/app/templates/journey-replay/package/journey-path.validation.ts
var record = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var strings = (value) => Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0);
var text = (value) => typeof value === "string" && value.trim().length > 0;
var validObject = (value) => record(value) && ["x", "y"].every(
  (key) => typeof value[key] === "number" && Number(value[key]) >= 0 && Number(value[key]) <= 100
) && ["compass", "cargo", "sail", "shore", "log"].includes(String(value["icon"]));
function validateJourneyPaths(value, map, resources, evidence) {
  if (value === void 0) return [];
  const issues = [];
  const error = (message) => issues.push({ code: "JOURNEY_PATH_INVALID", severity: "error", file: "journey.json", message });
  if (!record(value) || value["schemaVersion"] !== "1.0" || value["capability"] !== "branchingJourney" || !text(value["startNodeId"]) || !Array.isArray(value["nodes"]) || value["nodes"].length === 0 || value["nodes"].length > 100) {
    error("Branching journey requires a versioned node graph.");
    return issues;
  }
  const ids = /* @__PURE__ */ new Set();
  const choiceIds = /* @__PURE__ */ new Set();
  const validResources = new Set(resources.map((item) => item.id));
  const validEvidence = new Set(evidence.map((item) => item.id));
  const validLocations = new Set(map.locations.map((item) => item.id));
  for (const node of value["nodes"]) {
    if (!record(node) || !["id", "title", "locationId", "product", "learning"].every((key) => text(node[key])) || !Number.isInteger(node["session"]) || Number(node["session"]) < 1 || Number(node["session"]) > 8 || !["map", "location"].includes(String(node["kind"])) || !strings(node["tasks"]) || !node["tasks"].length || !Array.isArray(node["choices"]) || !Array.isArray(node["events"])) {
      error("Every node needs a session, task, product and typed activities.");
      continue;
    }
    if (ids.has(String(node["id"]))) error(`Duplicate node ${node["id"]}.`);
    ids.add(String(node["id"]));
    if (node["sceneArt"] !== void 0 && (!record(node["sceneArt"]) || !["backdrop", "ship"].every((key) => {
      const art = node["sceneArt"];
      return typeof art[key] === "string" && /^\/[a-zA-Z0-9/_.-]+\.(webp|png|jpg)$/.test(String(art[key]));
    })))
      error(`Invalid local scene artwork in ${node["id"]}.`);
    if (!validLocations.has(String(node["locationId"])))
      error(`Unknown location in ${node["id"]}.`);
    if (Number(node["session"]) % 2 === 1 !== (node["kind"] === "map"))
      error(`Sessions must alternate map and location: ${node["id"]}.`);
    if (node["kind"] === "map" ? node["choices"].length < 1 || node["events"].length !== 0 : node["events"].length < 1 || node["choices"].length !== 0 || !["island", "harbor", "storm", "river", "cape", "home"].includes(String(node["scene"])))
      error(`Unsupported activity or scene in ${node["id"]}.`);
    const eventIds = /* @__PURE__ */ new Set();
    for (const event of node["events"]) {
      if (!record(event) || !["id", "label", "observation", "question"].every((key) => text(event[key])) || !strings(event["evidenceIds"]) || !event["evidenceIds"].every((id) => validEvidence.has(id)) || !validObject(event["object"]) || !Array.isArray(event["choices"]) || event["choices"].length < 2) {
        error(`Malformed location event in ${node["id"]}.`);
        continue;
      }
      if (eventIds.has(String(event["id"]))) error(`Duplicate event in ${node["id"]}.`);
      eventIds.add(String(event["id"]));
    }
    const choices = [
      ...node["choices"],
      ...node["events"].flatMap(
        (event) => record(event) && Array.isArray(event["choices"]) ? event["choices"] : []
      )
    ];
    for (const choice of choices) {
      if (!record(choice) || !["id", "label", "summary", "consequence", "nextTask", "learning"].every(
        (key) => text(choice[key])
      )) {
        error(`Malformed choice in ${node["id"]}.`);
        continue;
      }
      if (choiceIds.has(String(choice["id"]))) error(`Duplicate choice ${choice["id"]}.`);
      choiceIds.add(String(choice["id"]));
      for (const key of ["grants", "requiresAny"])
        if (choice[key] !== void 0 && !strings(choice[key]))
          error(`Invalid tags in ${choice["id"]}.`);
      if (choice["effect"] !== void 0 && !["water", "repair", "charts", "rest", "exchange", "sail"].includes(
        String(choice["effect"])
      ))
        error(`Unknown scene effect in ${choice["id"]}.`);
      const changes = choice["resourceChanges"];
      if (changes !== void 0 && (!record(changes) || Object.entries(changes).some(
        ([id, amount]) => !validResources.has(id) || typeof amount !== "number" || !Number.isFinite(amount)
      )))
        error(`Invalid resources in ${choice["id"]}.`);
      if (choice["consequenceModifiers"] !== void 0 && (!Array.isArray(choice["consequenceModifiers"]) || choice["consequenceModifiers"].some(
        (modifier) => !record(modifier) || !text(modifier["afterChoiceId"]) || !text(modifier["narrative"]) || !record(modifier["resourceChanges"]) || Object.entries(modifier["resourceChanges"]).some(
          ([id, amount]) => !validResources.has(id) || typeof amount !== "number" || !Number.isFinite(amount)
        )
      )))
        error(`Invalid carried consequences in ${choice["id"]}.`);
    }
  }
  if (issues.length) return issues;
  const definition = value;
  const nodes = new Map(definition.nodes.map((node) => [node.id, node]));
  const start = nodes.get(definition.startNodeId);
  if (start?.session !== 1) error("Starting node must be session 1.");
  const granted = new Set(
    definition.nodes.flatMap((node) => [...node.choices, ...node.events.flatMap((event) => event.choices)]).flatMap((choice) => choice.grants ?? [])
  );
  for (const node of definition.nodes) {
    const choices = [...node.choices, ...node.events.flatMap((event) => event.choices)];
    if (node.session < 8 && !node.defaultNextId)
      error(`Missing practice continuation in ${node.id}.`);
    for (const next of [node.defaultNextId, ...choices.map((choice) => choice.nextNodeId)].filter(
      (id) => !!id
    ))
      if (nodes.get(next)?.session !== node.session + 1)
        error(`Broken or nonsequential edge ${node.id} -> ${next}.`);
    for (const choice of choices) {
      if (choice.requiresAny?.some((tag) => !granted.has(tag)))
        error(`Unobtainable discovery in ${choice.id}.`);
      if (choice.consequenceModifiers?.some((modifier) => !choiceIds.has(modifier.afterChoiceId)))
        error(`Unknown earlier choice in ${choice.id}.`);
      if (node.kind === "map") {
        const route = map.routes.find((route2) => route2.id === choice.routeId);
        if (!choice.nextNodeId || !route || route.fromLocationId !== node.locationId || route.toLocationId !== nodes.get(choice.nextNodeId)?.locationId)
          error(`Route must connect the chosen locations in ${choice.id}.`);
      }
    }
  }
  const reached = /* @__PURE__ */ new Set();
  const visit = (id) => {
    if (reached.has(id)) return;
    reached.add(id);
    const node = nodes.get(id);
    if (!node) return;
    for (const next of [
      node.defaultNextId,
      ...node.choices.map((choice) => choice.nextNodeId),
      ...node.events.flatMap((event) => event.choices.map((choice) => choice.nextNodeId))
    ])
      if (next) visit(next);
  };
  visit(definition.startNodeId);
  if (reached.size !== nodes.size) error("Every configured scene must be reachable.");
  if (new Set(definition.nodes.map((node) => node.session)).size !== 8)
    error("Eight freely accessible sessions are required.");
  return issues;
}

// src/app/runtime/project-launch/template-launchers/journey-replay.launcher.ts
var journeyReplayLauncher = {
  templateId: "journey-replay",
  async load(request) {
    const value = request.projectDefinition;
    if (!value || typeof value !== "object" || !("projectId" in value) || value.projectId !== request.project.id || !("steps" in value) || !Array.isArray(value.steps))
      throw new Error("This journey definition is invalid.");
    const config = value;
    if (!request.session.classId) throw new Error("A journey session requires a class.");
    const enrollment = {
      tenantId: request.session.tenantId,
      classId: request.session.classId,
      studentId: request.session.studentId ?? request.session.actorId,
      studentDisplayName: request.session.actorDisplayName,
      classLabel: request.session.mode === "preview" ? "Local demonstration" : request.session.classId,
      mode: request.session.mode === "preview" ? "demo" : request.session.mode
    };
    if (config.experience) {
      const issues = validateJourneyPaths(config.experience, config.map, config.resources, config.evidence);
      if (issues.length) throw new Error(issues.map((issue) => `${issue.code}: ${issue.message}`).join("\n"));
      const module2 = await import("./chunk-HA74I6MB.js");
      return {
        component: module2.JourneyPathWorkspaceComponent,
        providers: [
          { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
          { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: enrollment },
          { provide: JOURNEY_PATH_PERSISTENCE, useFactory: () => new BrowserJourneyPathPersistence() }
        ]
      };
    }
    const module = await import("./chunk-QA2YYO42.js");
    return {
      component: module.JourneyReplayPageComponent,
      providers: [
        { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
        { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: enrollment },
        ...request.session.mode === "preview" ? [
          {
            provide: JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
            useValue: createDemoJourneyClassSummary(config)
          }
        ] : [],
        {
          provide: JOURNEY_REPLAY_PERSISTENCE,
          useFactory: () => new BrowserJourneyReplayPersistenceAdapter(void 0, {
            tenantId: enrollment.tenantId,
            classId: enrollment.classId
          })
        },
        {
          provide: JOURNEY_REPLAY_AUTHORITY,
          useFactory: () => new HttpJourneyReplayAuthorityAdapter()
        },
        {
          provide: JOURNEY_REPLAY_MEDIA,
          useFactory: () => new HttpJourneyReplayMediaAdapter(
            journeyAuthorityLocator(enrollment, config.projectId, config.projectVersion),
            new IndexedDbAssetStorageAdapter(
              JSON.stringify([
                enrollment.tenantId,
                enrollment.classId,
                enrollment.studentId,
                config.projectId,
                config.projectVersion
              ])
            )
          )
        },
        JourneyReplayRuntimeService
      ]
    };
  }
};
export {
  journeyReplayLauncher
};
//# debugId=eb78511e-ba35-5abf-a0f8-e6c7a81bca4b
//# sourceMappingURL=chunk-5ZYDVRXK.js.map
