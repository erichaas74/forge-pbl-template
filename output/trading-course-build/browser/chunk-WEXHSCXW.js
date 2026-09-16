import {
  CRISIS_CONFIG,
  CRISIS_PERSISTENCE,
  CRISIS_SESSION,
  CrisisRuntimeService,
  availableCrews
} from "./chunk-FZTV4EQC.js";
import "./chunk-RTVK2FN5.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/crisis-operations/domain/crisis-station-validation.ts
function validateStationExperiences(config) {
  const fail = (message) => {
    throw new Error(`INVALID_CRISIS_PACKAGE: ${message}`);
  };
  const record = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  const text = (value) => typeof value === "string" && value.trim().length > 0;
  const asset = (value) => text(value) && typeof value === "string" && /^\/(?!\/)[^\s\\]+$/.test(value);
  for (const station of config.workstations ?? []) {
    if (station.roomSurface !== void 0) {
      const surface = station.roomSurface;
      if (!record(surface) || !Array.isArray(surface.bounds) || surface.bounds.length !== 4 || !surface.bounds.every((value) => typeof value === "number" && Number.isFinite(value)))
        fail("Invalid workstation room bounds.");
      const [x, y, width, height] = surface.bounds;
      if (x < 0 || y < 0 || width <= 0 || height <= 0 || x + width > 100 || y + height > 100)
        fail("Workstation room bounds must fit inside the artwork.");
      if (!Array.isArray(surface.screen) || surface.screen.length !== 4 || !surface.screen.every(
        (point) => Array.isArray(point) && point.length === 2 && point.every((value) => typeof value === "number" && Number.isFinite(value)) && point[0] >= x && point[0] <= x + width && point[1] >= y && point[1] <= y + height
      ))
        fail("Workstation screen must fit inside its room bounds.");
      for (let index = 0; index < 4; index++) {
        const a = surface.screen[index], b = surface.screen[(index + 1) % 4], c = surface.screen[(index + 2) % 4];
        if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) <= 0)
          fail("Workstation screen corners must form a clockwise convex surface.");
      }
    }
    if (station.conference !== void 0 && station.weather !== void 0)
      fail("A workstation can open only one specialized experience.");
    if (station.conference !== void 0) {
      const call = station.conference;
      if (!record(call) || !text(call.title) || !Array.isArray(call.participants) || call.participants.length < 1 || call.participants.length > 6)
        fail("Invalid conference definition.");
      const ids = /* @__PURE__ */ new Set();
      for (const person of call.participants) {
        if (!record(person) || !text(person.id) || !text(person.name) || !text(person.role) || !asset(person.portrait) || ids.has(person.id) || !config.locations.some((location) => location.id === person.locationId))
          fail("Invalid conference participant.");
        ids.add(person.id);
        if (!Array.isArray(person.evidenceIds) || new Set(person.evidenceIds).size !== person.evidenceIds.length || person.evidenceIds.some(
          (id) => !config.evidence.some((report) => report.id === id)
        ))
          fail("Invalid conference report reference.");
      }
      if (call.meetingUrl !== void 0) {
        try {
          if (typeof call.meetingUrl !== "string") fail("Invalid meeting URL.");
          const url = new URL(call.meetingUrl);
          if (url.protocol !== "https:" || url.username || url.password)
            fail("Meeting links must use HTTPS without embedded credentials.");
        } catch {
          fail("Invalid meeting URL.");
        }
      }
    }
    if (station.weather !== void 0) {
      const weather = station.weather;
      if (!record(weather) || !text(weather.title) || !text(weather.network) || !asset(weather.satelliteImage) || !Array.isArray(weather.frames) || !weather.frames.length || weather.frames.length > 120)
        fail("Invalid weather monitor definition.");
      const previous = /* @__PURE__ */ new Map();
      for (const frame of weather.frames) {
        if (!record(frame) || !Number.isInteger(frame.stage) || frame.stage < 0 || frame.stage >= config.bulletins.length || ![frame.minute, frame.x, frame.y, frame.intensity].every(
          (value) => typeof value === "number" && Number.isFinite(value) && value >= 0
        ) || frame.x > 1e3 || frame.y > 600 || frame.intensity > 1 || frame.minute > config.bulletins[frame.stage].minute || frame.minute <= (previous.get(frame.stage) ?? -1))
          fail("Invalid or future weather frame.");
        previous.set(frame.stage, frame.minute);
      }
      for (let stage = 0; stage < config.bulletins.length; stage++)
        if (!previous.has(stage)) fail("Every bulletin needs a weather sequence.");
    }
  }
}

// src/app/templates/crisis-operations/domain/crisis-validation.ts
function requireCrisisConfig(value) {
  const fail = (message) => {
    throw new Error(`INVALID_CRISIS_PACKAGE: ${message}`);
  };
  const record = (item) => typeof item === "object" && item !== null && !Array.isArray(item);
  if (!record(value)) return fail("Expected a configuration object.");
  if (value["schemaVersion"] !== "1.0" || !record(value["template"]) || value["template"]["id"] !== "crisis-operations" || value["template"]["version"] !== "1.0")
    return fail("Unsupported schema or template version.");
  for (const key of [
    "projectId",
    "projectVersion",
    "title",
    "region",
    "operationCode",
    "roomImage",
    "newsImage"
  ]) {
    if (typeof value[key] !== "string" || !value[key].trim()) fail(`Missing ${key}.`);
  }
  for (const key of ["crews", "evidenceLimit", "bulletinIntervalSeconds", "startHour"]) {
    if (!Number.isInteger(value[key]) || Number(value[key]) < 0) fail(`Invalid ${key}.`);
  }
  if (Number(value["evidenceLimit"]) < 1 || Number(value["bulletinIntervalSeconds"]) < 10 || Number(value["startHour"]) > 23)
    fail("Invalid timing or briefing capacity.");
  for (const key of ["roles", "locations", "evidence", "actions", "bulletins"]) {
    if (!Array.isArray(value[key]) || !value[key].length || !value[key].every(record))
      fail(`Missing ${key}.`);
  }
  const config = value;
  const unique = (items, name) => {
    if (items.some((i) => typeof i.id !== "string" || !i.id) || new Set(items.map((i) => i.id)).size !== items.length)
      fail(`Duplicate or missing ${name} ID.`);
  };
  unique(config.roles, "role");
  unique(config.locations, "location");
  unique(config.evidence, "evidence");
  unique(config.actions, "action");
  const textFields = (item, fields) => {
    for (const key of fields)
      if (typeof item[key] !== "string")
        fail(`Missing text field ${key}.`);
  };
  const finite = (n) => typeof n === "number" && Number.isFinite(n) && n >= 0;
  if (config.companion) {
    if (!record(config.companion) || typeof config.companion.name !== "string" || !config.companion.name.trim() || typeof config.companion.sprite !== "string" || !config.companion.sprite.trim() || !Array.isArray(config.companion.roamPoints) || config.companion.roamPoints.length < 2 || config.companion.roamPoints.length > 16)
      fail("Invalid companion configuration.");
    for (const point of config.companion.roamPoints)
      if (!record(point) || ![point.x, point.y, point.scale].every(finite) || point.x > 100 || point.y > 100 || point.scale < 0.4 || point.scale > 2)
        fail("Invalid companion roam point.");
  }
  for (const role of config.roles) textFields(role, ["name", "shortName", "focus"]);
  if (config.workstations !== void 0) {
    if (!Array.isArray(config.workstations) || config.workstations.length > 2 || !config.workstations.every(record))
      fail("Expected up to two workstations.");
    unique(config.workstations, "workstation");
    const sides = /* @__PURE__ */ new Set();
    for (const station of config.workstations) {
      if (typeof station.name !== "string" || !station.name.trim() || typeof station.description !== "string" || !station.description.trim())
        fail("Missing workstation name or description.");
      if (!["left", "right"].includes(station.side) || sides.has(station.side))
        fail("Each workstation must occupy a distinct left or right position.");
      sides.add(station.side);
      if (!Array.isArray(station.roleIds) || !station.roleIds.length || new Set(station.roleIds).size !== station.roleIds.length || station.roleIds.some(
        (id) => typeof id !== "string" || !config.roles.some((role) => role.id === id)
      ))
        fail("Invalid workstation role reference.");
      if (!["telemetry", "resources", "reports"].includes(station.instrument))
        fail("Unsupported workstation instrument.");
    }
  }
  for (const l of config.locations) {
    textFields(l, ["name", "detail"]);
    if (![l.x, l.y, l.population, l.elevation].every(finite) || l.x > 1e3 || l.y > 600 || !["community", "bridge", "hospital", "shelter", "sensor"].includes(l.kind))
      fail("Invalid map location.");
  }
  for (const e of config.evidence) {
    textFields(e, ["title", "source", "channel", "body"]);
    if (!config.locations.some((l) => l.id === e.locationId) || !Number.isInteger(e.stage) || e.stage < 0 || e.stage >= config.bulletins.length || !finite(e.minute))
      fail("Invalid evidence reference or release stage.");
    if (!Array.isArray(e.roleIds) || e.roleIds.some((id) => !config.roles.some((r) => r.id === id)))
      fail("Invalid evidence visibility.");
    if (!["Confirmed", "Forecast", "Unverified"].includes(e.confidence))
      fail("Invalid evidence confidence.");
    for (const id of [e.requiresActionId, e.excludesActionId])
      if (id !== void 0 && !config.actions.some((a) => a.id === id))
        fail("Unknown conditional report action.");
    if (e.requiresActionId && e.requiresActionId === e.excludesActionId)
      fail("Unreachable conditional report.");
    if (e.reading && (typeof e.reading.value !== "string" || typeof e.reading.label !== "string" || typeof e.reading.unit !== "string" || !Array.isArray(e.reading.trend) || e.reading.trend.length < 2 || !e.reading.trend.every(finite)))
      fail("Invalid sensor reading.");
  }
  for (const a of config.actions) {
    textFields(a, ["title", "description", "tradeoff", "outcome", "mapLabel"]);
    if (!config.locations.some((l) => l.id === a.locationId) || ![a.crews, a.duration, a.riskReduction, a.protects, a.minStage].every(finite) || !Number.isInteger(a.crews) || !Number.isInteger(a.minStage) || a.minStage >= config.bulletins.length || a.riskReduction > 100)
      fail("Invalid action cost or reference.");
    if (a.expiresAtStage !== void 0 && (!Number.isInteger(a.expiresAtStage) || a.expiresAtStage <= a.minStage || a.expiresAtStage > config.bulletins.length))
      fail("Invalid response window.");
  }
  for (const [index, b] of config.bulletins.entries()) {
    textFields(b, ["title", "summary", "forecast", "uncertainty"]);
    if (![b.minute, b.metricValue, b.risk, b.affected].every(finite) || b.risk > 100 || index > 0 && b.minute <= config.bulletins[index - 1].minute || !["Watch", "Emergency", "Critical", "Stabilizing"].includes(b.alert))
      fail("Invalid bulletin sequence.");
  }
  if (!record(config.map) || typeof config.map.coast !== "string" || typeof config.map.river !== "string" || typeof config.map.hazard !== "string" || !Array.isArray(config.map.roads) || !Array.isArray(config.map.contours) || ![...config.map.roads, ...config.map.contours].every((p) => typeof p === "string"))
    fail("Invalid map geometry.");
  for (const pair of [config.roomTagline, config.analysisHeadline])
    if (!Array.isArray(pair) || pair.length !== 2 || !pair.every((s) => typeof s === "string"))
      fail("Invalid room text.");
  if (!Array.isArray(config.systemChain) || !config.systemChain.every((s) => typeof s === "string"))
    fail("Invalid system connection labels.");
  if (!record(config.primaryMetric) || !record(config.newsCamera))
    fail("Missing monitor configuration.");
  textFields(config.primaryMetric, ["label", "unit", "caption"]);
  textFields(config.newsCamera, ["label", "network", "locationId", "description"]);
  if (!Array.isArray(config.primaryMetric.initialTrend) || config.primaryMetric.initialTrend.length < 2 || !config.primaryMetric.initialTrend.every(finite))
    fail("Invalid monitor trend.");
  if (!finite(config.newsCamera.minute) || !config.locations.some((l) => l.id === config.newsCamera.locationId))
    fail("Invalid camera reference.");
  if (!Array.isArray(config.map.labels) || !config.map.labels.every(
    (l) => record(l) && typeof l["text"] === "string" && finite(l["x"]) && finite(l["y"]) && typeof l["rotation"] === "number" && Number.isFinite(l["rotation"]) && ["water", "land"].includes(String(l["kind"]))
  ))
    fail("Invalid map labels.");
  validateStationExperiences(config);
  return freezeConfig(structuredClone(config));
}
function freezeConfig(value) {
  if (typeof value === "object" && value !== null) {
    Object.freeze(value);
    for (const nested of Object.values(value)) freezeConfig(nested);
  }
  return value;
}

// src/app/templates/crisis-operations/runtime/crisis.persistence.ts
var BrowserCrisisPersistence = class {
  constructor(config, session, storage = safeBrowserStorage()) {
    this.session = session;
    this.available = storage !== void 0;
    this.store = new ScopedBrowserStore(
      "crisis-operations.v1",
      storage,
      (value) => isCrisisState(config, value)
    );
  }
  session;
  store;
  available;
  load() {
    return this.store.load(this.session);
  }
  save(state) {
    this.store.save(this.session, state);
  }
};
function isCrisisState(config, value) {
  if (typeof value !== "object" || value === null) return false;
  const s = value;
  if (!Number.isInteger(s.version) || s.version < 0 || !Number.isInteger(s.stage) || s.stage < 0 || s.stage >= config.bulletins.length || !config.roles.some((r) => r.id === s.roleId))
    return false;
  if (![s.sharedEvidenceIds, s.readEvidenceIds, s.decisions, s.events].every(Array.isArray))
    return false;
  if (s.sharedEvidenceIds.length > config.evidenceLimit || s.events.length > 300) return false;
  for (const ids of [s.sharedEvidenceIds, s.readEvidenceIds]) {
    if (new Set(ids).size !== ids.length || ids.some((id) => !config.evidence.some((e) => e.id === id && e.stage <= s.stage)))
      return false;
  }
  if (s.sharedEvidenceIds.some((id) => !s.readEvidenceIds.includes(id))) return false;
  if (s.decisions.some(
    (d) => !d || typeof d !== "object" || !config.actions.some(
      (a) => a.id === d.actionId && d.stage >= a.minStage && (a.expiresAtStage === void 0 || d.stage < a.expiresAtStage)
    ) || !Number.isInteger(d.stage) || d.stage < 0 || d.stage > s.stage || d.minute !== config.bulletins[d.stage].minute || !Array.isArray(d.evidenceIds) || !d.evidenceIds.length || d.evidenceIds.some((id) => !config.evidence.some((e) => e.id === id && e.stage <= d.stage))
  ))
    return false;
  if (new Set(s.decisions.map((d) => d.actionId)).size !== s.decisions.length || availableCrews(config, s) < 0)
    return false;
  return s.events.every(
    (e) => !!e && typeof e === "object" && typeof e.id === "string" && typeof e.eventType === "string" && e.projectId === config.projectId
  );
}

// src/app/runtime/project-launch/template-launchers/crisis-operations.launcher.ts
var crisisOperationsLauncher = {
  templateId: "crisis-operations",
  async load(request) {
    if (request.session.authorityMode !== "localDemo") {
      throw new Error(
        "CAPABILITY_NOT_INSTALLED: Shared crisis sessions require a classroom authority and synchronization adapter. This operations room supports local exercises."
      );
    }
    const config = requireCrisisConfig(request.projectDefinition);
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion)
      throw new Error(
        "PROJECT_ID_MISMATCH: Crisis package does not match the selected project version."
      );
    const { CrisisCenterComponent } = await import("./chunk-NMWYD2ZM.js");
    return {
      component: CrisisCenterComponent,
      integratedHeader: true,
      providers: [
        { provide: CRISIS_CONFIG, useValue: config },
        { provide: CRISIS_SESSION, useValue: request.session },
        {
          provide: CRISIS_PERSISTENCE,
          useFactory: () => new BrowserCrisisPersistence(config, request.session)
        },
        CrisisRuntimeService
      ]
    };
  }
};
export {
  crisisOperationsLauncher
};
//# debugId=8dff2c9b-3d82-5651-9e2f-1963893afd0a
//# sourceMappingURL=chunk-WEXHSCXW.js.map
