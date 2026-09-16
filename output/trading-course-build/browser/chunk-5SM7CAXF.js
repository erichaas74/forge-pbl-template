import {
  HEIST_MISSION,
  HEIST_PERSISTENCE,
  HeistRuntime,
  LocalHeistAdapter
} from "./chunk-4M73LSEV.js";
import {
  blockedSight
} from "./chunk-MCTIEJ4Y.js";
import "./chunk-E2VJWGUE.js";
import {
  __objRest
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/domain/heist.validation.ts
function requireMission(value) {
  const fail = (message) => {
    throw new Error(`INVALID_HEIST_CONFIG: ${message}`);
  };
  const record = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
  const positive = (v) => typeof v === "number" && Number.isFinite(v) && v > 0;
  const nonnegative = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0;
  const text = (v) => typeof v === "string" && v.trim().length > 0;
  if (!record(value)) fail("Expected a mission object.");
  const c = value;
  if (c.schemaVersion !== "1.0" || c.template?.id !== "heist" || c.template.version !== "1.0" || !text(c.projectId) || !text(c.projectVersion)) fail("Unsupported schema or template version.");
  if (![c.title, c.briefing, c.history].every(text)) fail("Mission text is required.");
  if (!c.map || ![c.map.width, c.map.height, c.map.pixelsPerCm, c.map.metersPerCm, c.speed, c.deadline, c.detectionGrace].every(positive)) fail("Map, rates, deadline, and detection grace must be positive.");
  if (!text(c.map.image) || !/^\/(?!\/)[\w/.-]+\.(svg|png|webp)$/.test(c.map.image)) fail("Use a local map asset.");
  if (c.presentation !== void 0) {
    const art = c.presentation;
    const asset = (path) => typeof path === "string" && /^\/(?!\/)[\w/.-]+\.(png|webp)$/.test(path) && !path.includes("..");
    if (!record(art) || ![art.ground, art.buildings, art.characters, art.props].every(asset) || !Array.isArray(art.wallFrames) || !art.wallFrames.every((n) => Number.isInteger(n) && n >= 0 && n < 4) || !record(art.responseStyles) || !Object.values(art.responseStyles).every((s) => ["carry", "repair", "cart"].includes(s))) fail("Invalid presentation manifest.");
    const rect = (r) => Array.isArray(r) && r.length === 4 && r.every(nonnegative) && r[2] > 0 && r[3] > 0;
    if (!Array.isArray(art.buildingFrames) || art.buildingFrames.length !== 4 || !art.buildingFrames.every((r) => r && rect([r.x, r.y, r.width, r.height])) || !Array.isArray(art.groundSlices) || !art.groundSlices.length || !art.groundSlices.every((r) => r && rect(r.source) && rect(r.destination))) fail("Invalid artwork regions.");
    if (art.landmarks !== void 0 && (!Array.isArray(art.landmarks) || !art.landmarks.every((r) => r && rect([r.x, r.y, r.width, r.height]) && Number.isInteger(r.frame) && r.frame >= 0 && r.frame < 4 && r.x + r.width <= c.map.width && r.y + r.height <= c.map.height))) fail("Invalid artwork landmarks.");
  }
  const point = (p) => record(p) && nonnegative(p["x"]) && nonnegative(p["y"]) && Number(p["x"]) <= c.map.width && Number(p["y"]) <= c.map.height;
  if (!Array.isArray(c.locations) || c.locations.length < 3 || !c.locations.every((n) => n && text(n.id) && text(n.name) && text(n.description) && point(n))) fail("Locations need IDs, text, and map coordinates.");
  const ids = new Set(c.locations.map((n) => n.id));
  if (ids.size !== c.locations.length || !ids.has(c.entry) || !ids.has(c.extraction) || c.entry === c.extraction) fail("Duplicate locations or invalid entry/extraction.");
  if (!c.target || !ids.has(c.target.location) || c.target.location === c.entry || c.target.location === c.extraction || !text(c.target.name) || ![c.target.mass, c.target.capacity, c.target.pickupSeconds, c.target.loadedSpeed].every(positive)) fail("Invalid target.");
  if (!Array.isArray(c.walls) || !c.walls.every((w) => point(w) && positive(w.width) && positive(w.height))) fail("Invalid blocking geometry.");
  if (!Array.isArray(c.routes) || !c.routes.every((r) => r && ids.has(r.from) && ids.has(r.to) && r.from !== r.to && (r.blocked === void 0 || typeof r.blocked === "boolean"))) fail("Routes must reference distinct locations.");
  for (const route of c.routes.filter((r) => !r.blocked)) {
    if (blockedSight(c.locations.find((n) => n.id === route.from), c.locations.find((n) => n.id === route.to), c.walls)) fail("An open route crosses blocking geometry.");
  }
  const reachable = /* @__PURE__ */ new Set([c.entry]);
  for (let i = 0; i < c.locations.length; i++) for (const r of c.routes.filter((r2) => !r2.blocked)) {
    if (reachable.has(r.from)) reachable.add(r.to);
    if (reachable.has(r.to)) reachable.add(r.from);
  }
  if (!reachable.has(c.extraction) || !reachable.has(c.target.location)) fail("Target and extraction must be reachable.");
  if (c.guidance !== void 0) {
    const routes = c.guidance?.routes;
    if (!record(c.guidance) || !Array.isArray(routes) || routes.length < 1 || routes.length > 3 || !routes.every((r) => r && text(r.id) && text(r.label) && text(r.description) && Array.isArray(r.nodes) && r.nodes.length >= 3 && r.nodes.length <= 30 && r.nodes[0] === c.entry && r.nodes.at(-1) === c.extraction && r.nodes.includes(c.target.location) && r.nodes.every((id) => ids.has(id)) && r.nodes.slice(1).every((id, i) => c.routes.some((edge) => !edge.blocked && (edge.from === r.nodes[i] && edge.to === id || edge.to === r.nodes[i] && edge.from === id)))) || new Set(routes.map((r) => r.id)).size !== routes.length) fail("Guided paths need unique IDs and connected routes through the target to extraction.");
  }
  if (!Array.isArray(c.guards) || !c.guards.every((g) => g && text(g.id) && text(g.name) && [g.speed, g.range, g.angle].every(positive) && g.angle <= 360 && Array.isArray(g.points) && g.points.length >= 2 && g.points.every((p) => point(p) && nonnegative(p.wait)))) fail("Invalid guard patrol.");
  if (new Set(c.guards.map((g) => g.id)).size !== c.guards.length) fail("Duplicate guard IDs.");
  if (!c.gate || !ids.has(c.gate.location) || !positive(c.gate.cycle) || !positive(c.gate.openSeconds) || c.gate.openSeconds > c.gate.cycle) fail("Invalid gate cycle.");
  if (!c.math || !nonnegative(c.math.distanceTolerance) || !nonnegative(c.math.timeTolerance) || !Array.isArray(c.math.required) || !c.crisis || !text(c.crisis.title) || !text(c.crisis.description)) fail("Math and crisis configuration required.");
  if (c.math.routeChecks !== void 0 && !["all", "first-leg"].includes(c.math.routeChecks)) fail("Invalid route math selection.");
  const challenges = [...c.math.required, c.crisis.challenge];
  if (!challenges.every((q) => q && text(q.id) && !/^(distance|time)-/.test(q.id) && ["DISTANCE_SCALE", "RATE_TIME_DISTANCE", "CAPACITY", "ELAPSED_TIME", "PERCENT_CHANGE"].includes(q.type) && text(q.title) && text(q.prompt) && text(q.hint) && text(q.unit) && Number.isFinite(q.answer) && nonnegative(q.tolerance)) || new Set(challenges.map((q) => q.id)).size !== challenges.length) fail("Invalid or duplicate math challenges.");
  if (!Array.isArray(c.crisis.choices) || !c.crisis.choices.length || !c.crisis.choices.every((o) => o && text(o.id) && text(o.label) && positive(o.capacity) && positive(o.speedMultiplier) && nonnegative(o.delay)) || !c.crisis.choices.some((o) => o.capacity >= c.target.mass)) fail("Crisis needs a feasible response.");
  if (new Set(c.crisis.choices.map((o) => o.id)).size !== c.crisis.choices.length) fail("Duplicate response IDs.");
  return freeze(structuredClone(c));
}
function freeze(value) {
  if (value && typeof value === "object") {
    Object.freeze(value);
    Object.values(value).forEach(freeze);
  }
  return value;
}

// src/app/templates/heist/domain/heist.fingerprint.ts
function gameplayFingerprint(mission) {
  const _a = mission, { presentation: _artwork } = _a, gameplay = __objRest(_a, ["presentation"]);
  return JSON.stringify(gameplay);
}

// src/app/runtime/project-launch/template-launchers/heist.launcher.ts
var heistLauncher = {
  templateId: "heist",
  async load(request) {
    if (request.session.authorityMode !== "localDemo") throw new Error("CAPABILITY_NOT_INSTALLED: Heist currently supports local practice. Official shared attempts require an authoritative Heist adapter.");
    if (request.projectDefinition && typeof request.projectDefinition === "object" && "experience" in request.projectDefinition && request.projectDefinition.experience === "restoration") {
      const { requireRestorationMission } = await import("./chunk-F2V56SLO.js");
      const { RESTORATION_MISSION, RESTORATION_PERSISTENCE, RestorationCollectionRuntime, LocalRestorationAdapter } = await import("./chunk-EOXOUVKX.js");
      const mission2 = requireRestorationMission(request.projectDefinition);
      if (mission2.projectId !== request.project.id || mission2.projectVersion !== request.project.projectVersion) throw new Error("PROJECT_ID_MISMATCH: Restoration package does not match this project.");
      if (mission2.previewWeeks && request.session.mode === "preview" && request.view !== "final-demo") {
        const { RestorationWeekWorkspaceComponent } = await import("./chunk-XLJ3ID2W.js");
        const { RestorationPreviewRuntime } = await import("./chunk-YYWSLGTF.js");
        const { RESTORATION_PREVIEW_SESSION, RESTORATION_PREVIEW_PERSISTENCE, LocalRestorationPreviewAdapter } = await import("./chunk-4B5YNUK3.js");
        return { component: RestorationWeekWorkspaceComponent, integratedHeader: true, providers: [
          { provide: RESTORATION_MISSION, useValue: mission2 },
          { provide: RESTORATION_PREVIEW_SESSION, useValue: request.session },
          { provide: RESTORATION_PREVIEW_PERSISTENCE, useFactory: () => new LocalRestorationPreviewAdapter(request.session, mission2) },
          RestorationPreviewRuntime
        ] };
      }
      const { RestorationCollectionComponent } = await import("./chunk-CA7JHGKB.js");
      return { component: RestorationCollectionComponent, integratedHeader: true, providers: [
        { provide: RESTORATION_MISSION, useValue: mission2 },
        { provide: RESTORATION_PERSISTENCE, useFactory: () => new LocalRestorationAdapter(request.session, mission2) },
        RestorationCollectionRuntime
      ] };
    }
    if (request.projectDefinition && typeof request.projectDefinition === "object" && "experience" in request.projectDefinition && request.projectDefinition.experience === "escape") {
      const { requireEscapeMission } = await import("./chunk-BSYUIFJ7.js");
      const { ESCAPE_MISSION, ESCAPE_PERSISTENCE, EscapeRuntime, LocalEscapeAdapter } = await import("./chunk-GFDCKMOB.js");
      const mission2 = requireEscapeMission(request.projectDefinition);
      if (mission2.projectId !== request.project.id || mission2.projectVersion !== request.project.projectVersion) throw new Error("PROJECT_ID_MISMATCH: Escape package does not match this project.");
      if (request.view === "final-demo" && mission2.world) {
        const { ExpeditionExampleComponent } = await import("./chunk-UJIPMYAC.js");
        return { component: ExpeditionExampleComponent, integratedHeader: true, providers: [
          { provide: ESCAPE_MISSION, useValue: mission2 }
        ] };
      }
      if (mission2.world && mission2.previewWeeks && request.session.mode === "preview") {
        const { ExpeditionWeekWorkspaceComponent } = await import("./chunk-RM6MHHCN.js");
        const { ExpeditionPreviewRuntime } = await import("./chunk-2L5ALUU3.js");
        const { EXPEDITION_PREVIEW_SESSION, EXPEDITION_PREVIEW_PERSISTENCE, LocalExpeditionPreviewAdapter } = await import("./chunk-FCGYJDBZ.js");
        return { component: ExpeditionWeekWorkspaceComponent, integratedHeader: true, providers: [
          { provide: ESCAPE_MISSION, useValue: mission2 },
          { provide: EXPEDITION_PREVIEW_SESSION, useValue: request.session },
          { provide: EXPEDITION_PREVIEW_PERSISTENCE, useFactory: () => new LocalExpeditionPreviewAdapter(request.session, mission2) },
          ExpeditionPreviewRuntime
        ] };
      }
      if (mission2.world) {
        const { ExpeditionComponent } = await import("./chunk-ZIG7JBVR.js");
        const { ExpeditionRuntime, EXPEDITION_PLAYER } = await import("./chunk-YGPVO46J.js");
        return { component: ExpeditionComponent, integratedHeader: true, providers: [
          { provide: ESCAPE_MISSION, useValue: mission2 },
          { provide: ESCAPE_PERSISTENCE, useFactory: () => new LocalEscapeAdapter(request.session, mission2) },
          { provide: EXPEDITION_PLAYER, useValue: { id: request.session.actorId, name: "You", color: 8578770 } },
          EscapeRuntime,
          ExpeditionRuntime
        ] };
      }
      const { EscapeComponent } = await import("./chunk-UNED6M7X.js");
      return { component: EscapeComponent, integratedHeader: true, providers: [
        { provide: ESCAPE_MISSION, useValue: mission2 },
        { provide: ESCAPE_PERSISTENCE, useFactory: () => new LocalEscapeAdapter(request.session, mission2) },
        EscapeRuntime
      ] };
    }
    if (request.projectDefinition && typeof request.projectDefinition === "object" && "experience" in request.projectDefinition && request.projectDefinition.experience === "gallery") {
      const { requireGalleryMission } = await import("./chunk-CFY5QQIM.js");
      const { GALLERY_MISSION, GALLERY_PERSISTENCE, GalleryRuntime, LocalGalleryAdapter } = await import("./chunk-BVP4XSJ4.js");
      const mission2 = requireGalleryMission(request.projectDefinition);
      if (mission2.projectId !== request.project.id || mission2.projectVersion !== request.project.projectVersion) throw new Error("PROJECT_ID_MISMATCH: Heist gallery package does not match this project.");
      const { GalleryComponent } = await import("./chunk-MZOHNKPS.js");
      return { component: GalleryComponent, integratedHeader: true, providers: [
        { provide: GALLERY_MISSION, useValue: mission2 },
        { provide: GALLERY_PERSISTENCE, useFactory: () => new LocalGalleryAdapter(request.session, mission2) },
        GalleryRuntime
      ] };
    }
    const mission = requireMission(request.projectDefinition);
    if (mission.projectId !== request.project.id || mission.projectVersion !== request.project.projectVersion) throw new Error("PROJECT_ID_MISMATCH: Heist package does not match this project.");
    const { HeistComponent } = await import("./chunk-5RDYS34J.js");
    return { component: HeistComponent, integratedHeader: true, providers: [
      { provide: HEIST_MISSION, useValue: mission },
      { provide: HEIST_PERSISTENCE, useFactory: () => new LocalHeistAdapter(request.session, gameplayFingerprint(mission)) },
      HeistRuntime
    ] };
  }
};
export {
  heistLauncher
};
//# debugId=51bf6286-bc8a-5f60-8f12-ab989dbc8233
//# sourceMappingURL=chunk-5SM7CAXF.js.map
