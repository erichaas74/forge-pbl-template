import {
  lockEvaluators
} from "./chunk-AVOS3LLT.js";

// src/app/shared/encounters/encounter.validation.ts
var fail = (p) => {
  throw new Error(`INVALID_ENCOUNTER: ${p}`);
};
var row = (v, p) => v && typeof v === "object" && !Array.isArray(v) ? v : fail(p);
var text = (v, p) => typeof v === "string" && !!v.trim() && v.length <= 5e3 ? v : fail(p);
var id = (v, p) => {
  const s = text(v, p);
  return /^[a-z][a-z0-9-]{0,79}$/.test(s) && !["constructor", "prototype"].includes(s) ? s : fail(p);
};
var list = (v, p) => Array.isArray(v) && v.length > 0 && v.length <= 30 ? v : fail(p);
var rows = (v, p) => {
  const r = list(v, p).map((x) => row(x, p));
  const ids2 = r.map((x) => id(x["id"], p));
  if (new Set(ids2).size !== ids2.length) fail(`${p} duplicate id`);
  return r;
};
var refs = (v, allowed, p) => {
  const r = list(v, p).map((x) => id(x, p));
  if (new Set(r).size !== r.length || r.some((x) => !allowed.has(x))) fail(`${p} reference`);
  return r;
};
var number = (v, min, max, p) => {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max) fail(p);
};
var asset = (v, extensions, p) => {
  if (!new RegExp(`^/projects/[a-zA-Z0-9/_-]+\\.(${extensions})$`).test(text(v, p))) fail(p);
};
var encounterKinds = { "guided-scene": validateGuidedScene };
function validateGuidedScene(d, evidenceIds, chamberIds) {
  id(d["id"], "id");
  for (const key of ["version", "title", "location", "date", "invitation", "imageAlt", "attribution"]) text(d[key], key);
  refs(d["chamberIds"], chamberIds, "chamberIds");
  asset(d["image"], "webp|png|jpg", "image");
  const host = row(d["host"], "host");
  for (const key of ["name", "role", "greeting"]) text(host[key], `host.${key}`);
  const views = rows(d["views"], "views");
  for (const view of views) {
    text(view["label"], "view.label");
    text(view["description"], "view.description");
    number(view["position"], 0, 100, "view.position");
    number(view["zoom"], 1, 2.5, "view.zoom");
    if (!["observe", "listen", "talk", "object"].includes(String(view["mode"]))) fail("view.mode");
  }
  if (!views.some((v) => v["id"] === d["entryViewId"])) fail("entryViewId");
  for (const mode of ["observe", "listen", "talk", "object"]) if (!views.some((v) => v["mode"] === mode)) fail(`unreachable ${mode} interaction`);
  const chapters = rows(d["chapters"], "chapters"), questions = rows(d["questions"], "questions");
  for (const speech of [...chapters, ...questions]) {
    for (const key of ["title", "speaker", "text"]) text(speech[key], `speech.${key}`);
    asset(speech["audioSrc"], "m4a|mp3|wav", "speech.audioSrc");
    refs(speech["evidenceIds"], evidenceIds, "speech.evidenceIds");
  }
  const questionIds = new Set(questions.map((q) => String(q["id"])));
  for (const question of questions) {
    const visited = /* @__PURE__ */ new Set([question["id"]]);
    let dependency = question["requiresQuestionId"];
    while (dependency !== void 0) {
      if (!questionIds.has(String(dependency)) || visited.has(dependency)) fail("question dependency missing or cyclic");
      visited.add(dependency);
      dependency = questions.find((q) => q["id"] === dependency)["requiresQuestionId"];
    }
  }
  const object = row(d["object"], "object");
  id(object["id"], "object.id");
  text(object["title"], "object.title");
  text(object["description"], "object.description");
  number(object["position"], 0, 100, "object.position");
  refs(object["evidenceIds"], evidenceIds, "object.evidenceIds");
  for (const feature of rows(object["features"], "object.features")) {
    text(feature["label"], "feature.label");
    text(feature["text"], "feature.text");
  }
  const insight = row(d["insight"], "insight");
  for (const key of ["title", "claim", "explanation", "hint"]) text(insight[key], `insight.${key}`);
  const offered = refs(insight["evidenceIds"], evidenceIds, "insight.evidenceIds");
  if (!offered.includes(String(insight["answerEvidenceId"]))) fail("insight answer unavailable");
  if (!["supports", "contradicts", "does-not-establish"].includes(String(insight["relationship"]))) fail("insight.relationship");
}
function requireEncounters(value, evidenceIds, chamberIds) {
  const definitions = rows(value, "encounters");
  for (const definition of definitions) {
    if (definition["type"] !== "guided-scene") throw new Error(`CAPABILITY_NOT_INSTALLED: encounter.${String(definition["type"])}`);
    encounterKinds[definition["type"]](definition, evidenceIds, chamberIds);
  }
  return value;
}

// src/app/templates/heist/gallery/domain/gallery.validation.ts
var fail2 = (path) => {
  throw new Error(`INVALID_HEIST_GALLERY: ${path}`);
};
var obj = (value, path) => value && typeof value === "object" && !Array.isArray(value) ? value : fail2(path);
var str = (value, path) => typeof value === "string" && value.trim().length > 0 && value.length <= 5e3 ? value : fail2(path);
var num = (value, path, min = -1e4, max = 1e4) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : fail2(path);
var list2 = (value, path, min = 1, max = 100) => Array.isArray(value) && value.length >= min && value.length <= max ? value : fail2(path);
var id2 = (value, path) => {
  const result = str(value, path);
  return /^[a-z][a-z0-9-]{0,79}$/.test(result) && !["constructor", "prototype"].includes(result) ? result : fail2(path);
};
var ids = (value, path, min = 1) => {
  const result = list2(value, path, min).map((v) => id2(v, path));
  return new Set(result).size === result.length ? result : fail2(`${path}: duplicate ID`);
};
var rows2 = (value, path) => {
  const result = list2(value, path).map((v) => obj(v, path));
  ids(result.map((v) => v["id"]), `${path}.id`);
  return result;
};
var localAsset = (value, path) => {
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(str(value, path))) fail2(path);
};
function requireGalleryMission(value) {
  const m = obj(value, "mission"), template = obj(m["template"], "template");
  if (!["1.1", "1.2"].includes(String(m["schemaVersion"])) || m["experience"] !== "gallery" || template["id"] !== "heist" || template["version"] !== "1.0") fail2("Unsupported gallery schema/template");
  id2(m["projectId"], "projectId");
  str(m["projectVersion"], "projectVersion");
  for (const key of ["title", "subtitle", "briefing"]) str(m[key], key);
  if (!["math", "history", "hybrid"].includes(String(m["subject"]))) fail2("subject");
  localAsset(m["environment"], "environment");
  list2(m["defensePrompts"], "defensePrompts", 1, 6).forEach((v) => str(v, "defense prompt"));
  const evidence = rows2(m["evidence"], "evidence");
  const evidenceIds = new Set(evidence.map((e) => e["id"]));
  for (const e of evidence) {
    for (const key of ["title", "text", "sourceTitle"]) str(e[key], `evidence.${key}`);
    if (!["Timeline", "People", "Technology", "Exchange", "Routes", "Mathematics"].includes(String(e["category"]))) fail2("evidence.category");
    if (!/^https:\/\//.test(str(e["sourceUrl"], "sourceUrl"))) fail2("sourceUrl");
  }
  const refs2 = (value2, allowed, path, min = 1) => {
    const result = ids(value2, path, min);
    if (result.some((v) => !allowed.has(v))) fail2(`${path}: missing reference`);
    return result;
  };
  const locks = rows2(m["locks"], "locks"), lockIds = new Set(locks.map((l) => l["id"]));
  for (const l of locks) {
    const type = str(l["type"], "lock.type");
    if (!Object.hasOwn(lockEvaluators, type)) throw new Error(`CAPABILITY_NOT_INSTALLED: heist.lock.${type}`);
    for (const key of ["title", "prompt", "standard", "hint", "consequence"]) str(l[key], `lock.${key}`);
    if (!["math", "history"].includes(String(l["domain"]))) fail2("lock.domain");
    refs2(l["evidenceIds"], evidenceIds, "lock.evidenceIds", 0);
    if (["combo", "rotation", "measurement"].includes(type)) {
      const min = num(l["min"], "lock.min"), max = num(l["max"], "lock.max", min + 1), target = num(l["target"], "lock.target", min, max);
      const step = num(l["step"], "lock.step", 0.01, max - min);
      const tolerance = num(l["tolerance"], "lock.tolerance", 0, (max - min) / 10);
      if (Math.abs(Math.round((target - min) / step) * step + min - target) > tolerance + 1e-8) fail2("lock.target cannot be reached by the control");
      str(l["unit"], "lock.unit");
      if (l["wrap"] !== void 0 && typeof l["wrap"] !== "boolean") fail2("lock.wrap");
      if (type === "combo") {
        const digits = num(l["digits"], "lock.digits", 1, 6);
        if (!Number.isInteger(digits) || max >= 10 ** digits || min < 0 || step !== 1) fail2("combo bounds");
      }
    } else {
      const items = rows2(l["items"], "lock.items"), itemIds = new Set(items.map((i) => i["id"]));
      items.forEach((i) => str(i["label"], "item.label"));
      if (["timeline", "map-route", "lever"].includes(type)) {
        const solution = refs2(l["solution"], itemIds, "lock.solution");
        if (type === "timeline" && solution.length !== items.length || type === "lever" && solution.length !== 1) fail2("lock.solution length");
        if (type === "map-route") for (const item of items) {
          num(item["x"], "map.x", 5, 95);
          num(item["y"], "map.y", 5, 95);
        }
      } else if (type === "cargo") {
        const capacity = num(l["capacity"], "capacity", 1);
        items.forEach((i) => num(i["mass"], "item.mass", 0));
        const required = refs2(l["requiredItems"], itemIds, "requiredItems");
        if (items.filter((i) => required.includes(String(i["id"]))).reduce((sum, i) => sum + Number(i["mass"]), 0) > capacity) fail2("cargo has no feasible recovery");
      } else {
        const zones = rows2(l["zones"], "lock.zones"), zoneIds = new Set(zones.map((z) => z["id"]));
        zones.forEach((z) => str(z["label"], "zone.label"));
        const matches = obj(l["matches"], "lock.matches");
        if (Object.keys(matches).length !== items.length || items.some((i) => !zoneIds.has(matches[String(i["id"])]))) fail2("lock.matches");
      }
    }
  }
  const chambers = rows2(m["chambers"], "chambers"), chamberIds = new Set(chambers.map((c) => c["id"]));
  const paintingIds = /* @__PURE__ */ new Set();
  const recoveryIds = /* @__PURE__ */ new Set();
  const mainLockIds = /* @__PURE__ */ new Set();
  for (const c of chambers) {
    for (const key of ["title", "date", "location", "briefing"]) str(c[key], `chamber.${key}`);
    if (!["gallery", "workshop", "port", "cargo", "map", "archive", "treaty", "vault"].includes(String(c["layout"]))) fail2("chamber.layout");
    refs2(c["factIds"], evidenceIds, "chamber.factIds");
    refs2(c["lockIds"], lockIds, "chamber.lockIds").forEach((lockId) => {
      if (mainLockIds.has(lockId)) fail2("main locks must have unique IDs per chamber");
      mainLockIds.add(lockId);
    });
    if (c["next"] !== void 0 && !chamberIds.has(c["next"])) fail2("chamber.next");
    const paintings = rows2(c["paintings"], "paintings");
    if (paintings.length !== 3 || paintings.filter((p) => p["authentic"] === true).length !== 1) fail2("Each gallery requires three paintings and exactly one authentic painting");
    for (const p of paintings) {
      const paintingId = id2(p["id"], "painting.id");
      if (paintingIds.has(paintingId)) fail2("duplicate painting ID");
      paintingIds.add(paintingId);
      for (const key of ["title", "caption"]) str(p[key], `painting.${key}`);
      localAsset(p["image"], "painting.image");
      if (!Number.isInteger(num(p["artFrame"], "painting.artFrame", 0, 8))) fail2("painting.artFrame");
      const hotspots = rows2(p["hotspots"], "hotspots");
      for (const h of hotspots) {
        for (const key of ["label", "detail", "symbol"]) str(h[key], `hotspot.${key}`);
        num(h["x"], "hotspot.x", 5, 95);
        num(h["y"], "hotspot.y", 5, 95);
      }
      if (typeof p["authentic"] !== "boolean") fail2("painting.authentic");
      if (!p["authentic"]) {
        const fraud = obj(p["fraud"], "painting.fraud");
        if (!["timeline", "animal-plant", "people", "technology"].includes(String(fraud["category"]))) fail2("fraud.category");
        if (!hotspots.some((h) => h["id"] === fraud["hotspotId"])) fail2("fraud.hotspotId");
        str(fraud["explanation"], "fraud.explanation");
        const recovery = id2(fraud["recoveryLockId"], "fraud.recoveryLockId");
        if (!lockIds.has(recovery) || recoveryIds.has(recovery)) fail2("fraud requires a unique recovery lock");
        recoveryIds.add(recovery);
      } else if (p["fraud"] !== void 0) fail2("authentic painting has fraud metadata");
    }
  }
  if ([...recoveryIds].some((id3) => mainLockIds.has(id3))) fail2("recovery locks must be separate from passage locks");
  const visited = /* @__PURE__ */ new Set();
  let next = m["entry"];
  if (!chamberIds.has(next)) fail2("entry");
  while (next !== void 0) {
    if (visited.has(next)) fail2("correct route contains a cycle");
    visited.add(next);
    next = chambers.find((c) => c["id"] === next)["next"];
  }
  if (visited.size !== chambers.length) fail2("unreachable chamber");
  if (m["encounters"] !== void 0) {
    if (m["schemaVersion"] !== "1.2") fail2("encounters require schema 1.2");
    requireEncounters(m["encounters"], new Set(evidence.map((e) => String(e["id"]))), new Set(chambers.map((c) => String(c["id"]))));
  }
  return value;
}

export {
  requireGalleryMission
};
//# debugId=e12c87a5-fc2e-5eb5-b8a3-b1828846d592
//# sourceMappingURL=chunk-P2W4FZSC.js.map
