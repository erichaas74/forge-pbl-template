import {
  requireGalleryMission
} from "./chunk-P2W4FZSC.js";
import "./chunk-AVOS3LLT.js";
import {
  requireRestorationPreview
} from "./chunk-VU6DZYCP.js";
import "./chunk-7PDR3NVC.js";
import "./chunk-GOMI4DH3.js";

// src/app/shared/restoration/restoration.validation.ts
var fail = (p) => {
  throw new Error(`INVALID_RESTORATION: ${p}`);
};
var row = (v, p) => v && typeof v === "object" && !Array.isArray(v) ? v : fail(p);
var str = (v, p) => typeof v === "string" && v.trim().length && v.length <= 5e3 ? v : fail(p);
var id = (v) => typeof v === "string" && /^[a-z][a-z0-9-]{0,79}$/.test(v) && !["constructor", "prototype"].includes(v) ? v : fail("id");
var items = (v, p) => Array.isArray(v) && v.length > 0 && v.length <= 50 ? v : fail(p);
var rows = (v, p) => {
  const r = items(v, p).map((x) => row(x, p));
  if (new Set(r.map((x) => id(x["id"]))).size !== r.length) fail(`${p} duplicate id`);
  return r;
};
var n = (v, min, max) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : fail("bounds");
var asset = (v) => {
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp|jpg)$/.test(str(v, "asset"))) fail("asset");
};
function layered(d, sources) {
  for (const key of ["title", "collection", "date", "location", "commission", "attribution", "imageAlt"]) str(d[key], key);
  const media = row(d["image"], "image");
  asset(media["src"]);
  const grid = n(media["grid"], 1, 8), frame = n(media["frame"], 0, grid * grid - 1);
  if (!Number.isInteger(grid) || !Number.isInteger(frame)) fail("image grid");
  for (const r of rows(d["regions"], "regions")) {
    for (const key of ["title", "claim", "instruction", "hint"]) str(r[key], key);
    const x = n(r["x"], 0, 100), y = n(r["y"], 0, 100);
    n(r["width"], 5, 100 - x);
    n(r["height"], 5, 100 - y);
    const options = rows(r["options"], "options"), optionIds = new Set(options.map((o) => o["id"]));
    if (!optionIds.has(r["originalOptionId"])) fail("original option");
    for (const o of options) {
      str(o["label"], "option.label");
      str(o["description"], "option.description");
      if (!["keep", "remove", "replace", "relabel"].includes(String(o["tool"]))) fail("option tool");
      if (o["image"] !== void 0) asset(o["image"]);
      if (o["text"] !== void 0) str(o["text"], "option.text");
      if (o["tool"] !== "remove" && o["image"] === void 0 && o["text"] === void 0) fail("invisible option");
      if (o["tool"] === "remove" && (o["image"] !== void 0 || o["text"] !== void 0)) fail("remove option has content");
    }
    const evidenceIds = items(r["evidenceIds"], "evidenceIds").map(id);
    if (new Set(evidenceIds).size !== evidenceIds.length || evidenceIds.some((e) => !sources.has(e))) fail("source reference");
    for (const value of items(r["answers"], "answers")) {
      const a = row(value, "answer");
      if (!optionIds.has(a["optionId"]) || !evidenceIds.includes(String(a["evidenceId"])) || !["supports", "contradicts", "does-not-establish"].includes(String(a["relationship"]))) fail("unreachable answer");
    }
  }
}
var restorationKinds = { "layered-painting": layered };
function requireRestorations(value, sources) {
  for (const d of rows(value, "works")) {
    if (d["type"] !== "layered-painting") throw new Error(`CAPABILITY_NOT_INSTALLED: restoration.${String(d["type"])}`);
    restorationKinds[d["type"]](d, sources);
  }
  return value;
}

// src/app/templates/heist/restoration/restoration-collection.validation.ts
function requireRestorationMission(value) {
  const fail2 = (message) => {
    throw new Error(`INVALID_RESTORATION_COLLECTION: ${message}`);
  };
  if (!value || typeof value !== "object" || Array.isArray(value)) fail2("mission");
  const m = value, template = m["template"];
  if (m["schemaVersion"] !== "1.0" || m["experience"] !== "restoration" || template?.["id"] !== "heist" || template?.["version"] !== "1.0") fail2("schema/template");
  for (const k of ["projectId", "projectVersion", "title", "subtitle", "briefing", "heistBriefing"]) if (typeof m[k] !== "string" || !m[k].trim() || m[k].length > 5e3) fail2(k);
  const gallery = requireGalleryMission(m["sourceGallery"]);
  if (m["projectId"] !== gallery.projectId) fail2("source collection identity");
  requireRestorations(m["works"], new Set(gallery.evidence.map((e) => e.id)));
  const mission = value, seen = /* @__PURE__ */ new Set();
  for (const work of mission.works) {
    const chamber = gallery.chambers.find((c) => c.id === work.chamberId), painting = chamber?.paintings.find((p) => p.id === work.paintingId && !p.authentic);
    if (!painting || seen.has(work.paintingId)) fail2("commission painting reference");
    seen.add(work.paintingId);
    if (work.encounterId && !gallery.encounters?.some((e) => e.id === work.encounterId && e.chamberIds.includes(work.chamberId))) fail2("encounter reference");
  }
  if (!Array.isArray(mission.finalLockIds) || !mission.finalLockIds.length || mission.finalLockIds.length > 10 || new Set(mission.finalLockIds).size !== mission.finalLockIds.length || mission.finalLockIds.some((id2) => !gallery.locks.some((l) => l.id === id2))) fail2("final locks");
  if (mission.previewWeeks !== void 0) requireRestorationPreview(mission.previewWeeks, mission);
  return mission;
}
export {
  requireRestorationMission
};
//# debugId=4e403df7-f299-5621-b813-1467722ab765
//# sourceMappingURL=chunk-F2V56SLO.js.map
