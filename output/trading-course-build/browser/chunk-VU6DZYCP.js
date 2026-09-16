import {
  requireSpatialManifest
} from "./chunk-7PDR3NVC.js";

// src/app/shared/spatial-inspection/spatial-inspection.definition.ts
function requireSpatialInspection(value) {
  const d = value;
  if (!d || !Array.isArray(d.targets) || !d.targets.length || d.targets.length > 12) throw new Error("INVALID_SPATIAL_INSPECTION");
  for (const label of [d.title, d.overviewLabel]) if (label !== void 0 && (typeof label !== "string" || !label.trim() || label.length > 80)) throw new Error("INVALID_SPATIAL_INSPECTION");
  const asset2 = requireSpatialManifest(d.asset);
  if (d.environment !== void 0) {
    const e = d.environment, image = (v) => typeof v === "string" && /^\/projects\/(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_-]+\.(png|jpg|webp)$/.test(v);
    if (!e || !image(e.background) || !image(e.ground) || !asset2.nodes.some((n) => n.name === e.groundNode && n.kind === "environment") || !Number.isFinite(e.tileSize) || e.tileSize < 0.25 || e.tileSize > 30) throw new Error("INVALID_SPATIAL_ENVIRONMENT");
  }
  const names = /* @__PURE__ */ new Set();
  for (const t of d.targets) {
    if (!t || typeof t.label !== "string" || !t.label.trim() || t.label.length > 80 || !asset2.nodes.some((n) => n.name === t.name && n.kind === "target") || names.has(t.name) || !Array.isArray(t.focus) || t.focus.length !== 3 || !t.focus.every((v) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) < 100) || !Number.isFinite(t.distance) || t.distance < 1 || t.distance > 20) throw new Error("INVALID_SPATIAL_INSPECTION");
    names.add(t.name);
  }
  return d;
}

// src/app/shared/panorama/panorama.validation.ts
var fail = (part) => {
  throw new Error(`INVALID_PANORAMA: ${part}`);
};
var object = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text = (v) => typeof v === "string" && v.trim().length > 0 && v.length <= 2500;
var id = (v) => typeof v === "string" && /^[a-z][a-z0-9-]{0,79}$/.test(v) && !["constructor", "prototype"].includes(v);
var list = (v, max = 20) => Array.isArray(v) && v.length > 0 && v.length <= max;
var unique = (values) => values.every((v) => v && id(v.id)) && new Set(values.map((v) => v.id)).size === values.length;
var asset = (v, extensions = "png|webp|jpg") => typeof v === "string" && new RegExp(`^/projects/[a-zA-Z0-9/_-]+\\.(${extensions})$`).test(v);
var rect = (r) => r && [r.x, r.y, r.width, r.height].every(Number.isFinite) && r.x >= 0 && r.y >= 0 && r.width > 0 && r.height > 0 && r.x + r.width <= 100 && r.y + r.height <= 100;
function requirePanorama(value) {
  const d = value;
  if (!object(value) || d.capability !== "panorama.encounter.v1") throw new Error("CAPABILITY_NOT_INSTALLED: panorama");
  if (d.version !== 1 || !id(d.id) || !id(d.workId) || ![d.title, d.setting, d.invitation, d.imageAlt, d.attribution].every(text) || !asset(d.panorama) || !asset(d.forgery)) fail("scene");
  if (d.questionOwner !== void 0 && !["scene", "tutor"].includes(d.questionOwner)) fail("question owner");
  if (!list(d.sources) || !unique(d.sources) || !list(d.people, 8) || !unique(d.people) || !list(d.repairs, 8) || !unique(d.repairs)) fail("collections");
  const references = (v) => list(v) && new Set(v).size === v.length && v.every((id2) => d.sources.some((s) => s.id === id2));
  for (const s of d.sources) if (![s.title, s.text, s.provenance].every(text) || typeof s.url !== "string" || !/^https:\/\/[^\s]+$/.test(s.url) || s.rect && !rect(s.rect)) fail("source");
  for (const p of d.people) {
    if (![p.name, p.activity, p.welcome].every(text) || !rect(p.rect) || !list(p.topics, 12) || !unique(p.topics)) fail("person");
    for (const t of p.topics) if (![t.question, t.reply].every(text) || !list(t.keywords) || !t.keywords.every(text) || !references(t.sourceIds)) fail("topic");
    if (p.approach && (!asset(p.approach.src, "mp4|webm") || !asset(p.approach.captions, "vtt") || !text(p.approach.transcript))) fail("approach");
  }
  for (const r of d.repairs) if (![r.title, r.action].every(text) || !rect(r.rect) || !references(r.sourceIds)) fail("repair");
  if (d.interviews !== void 0) {
    if (!list(d.interviews, 8) || !unique(d.interviews)) fail("interviews");
    for (const interview of d.interviews) {
      if (!text(interview.title) || !asset(interview.poster) || interview.video && (!asset(interview.video.src, "mp4|webm") || !asset(interview.video.captions, "vtt"))) fail("interview media");
    }
  }
  if (d.viewpoints !== void 0) {
    if (!list(d.viewpoints, 8) || !unique(d.viewpoints)) fail("viewpoints");
    for (const v of d.viewpoints) {
      if (v.inspection !== void 0) requireSpatialInspection(v.inspection);
      if (!text(v.title) || !asset(v.image) || !Number.isFinite(v.yaw) || v.yaw < -180 || v.yaw >= 180 || !Number.isFinite(v.pitch) || Math.abs(v.pitch) > 89.9 || !Array.isArray(v.people)) fail("viewpoint");
      if (new Set(v.people.map((p) => p.personId)).size !== v.people.length || v.people.some((p) => !p || !d.people.some((person) => person.id === p.personId) || !rect(p.rect))) fail("viewpoint people");
      if (v.places !== void 0 && (!Array.isArray(v.places) || v.places.length > 8 || v.places.some((p) => !p || !text(p.label) || p.targetId === v.id || !d.viewpoints.some((target) => target.id === p.targetId) || !Number.isFinite(p.yaw) || p.yaw < -180 || p.yaw >= 180 || !Number.isFinite(p.pitch) || Math.abs(p.pitch) > 89.9))) fail("viewpoint places");
    }
  }
  return d;
}
function requirePanoramaState(value, d) {
  const s = value;
  if (!object(value) || !Number.isFinite(s.heading) || s.heading < 0 || s.heading > 100 || !object(s.conversations) || !object(s.repairs) || !Array.isArray(s.undo) || s.undo.length > 60) fail("saved scene");
  const refs = (v, allowed) => Array.isArray(v) && v.length <= allowed.length && new Set(v).size === v.length && v.every((x) => allowed.includes(x));
  if (!refs(s.visited, d.people.map((p) => p.id)) || !refs(s.collected, d.sources.map((e) => e.id))) fail("saved references");
  if (s.selectedPersonId !== void 0 && !d.people.some((p) => p.id === s.selectedPersonId)) fail("saved person");
  if (s.sphericalView !== void 0) {
    const v = s.sphericalView;
    if (!v || !d.viewpoints?.some((p) => p.id === v.viewpointId) || ![v.yaw, v.pitch, v.fov].every(Number.isFinite) || v.yaw < -180 || v.yaw >= 180 || Math.abs(v.pitch) > 89.9 || v.fov < 35 || v.fov > 100) fail("saved spherical view");
  }
  for (const [person, messages] of Object.entries(s.conversations)) {
    if (!d.people.some((p) => p.id === person) || !Array.isArray(messages) || messages.length > 60) fail("saved interview");
    for (const m of messages) if (!m || !["student", "character"].includes(m.role) || !text(m.text) || !refs(m.sourceIds, d.sources.map((e) => e.id))) fail("saved message");
  }
  for (const [repair, applied] of Object.entries(s.repairs)) if (!d.repairs.some((r) => r.id === repair) || typeof applied !== "boolean") fail("saved repair");
  for (const u of s.undo) if (!u || !d.repairs.some((r) => r.id === u.id) || typeof u.previous !== "boolean") fail("saved undo");
  return s;
}

// src/app/templates/heist/restoration/weekly/restoration-preview.validation.ts
var fail2 = (part) => {
  throw new Error(`INVALID_RESTORATION_PREVIEW: ${part}`);
};
var record = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var strings = (v) => Array.isArray(v) && v.length > 0 && v.length <= 12 && v.every((s) => typeof s === "string" && s.trim().length > 0 && s.length <= 1500);
function requireRestorationPreview(value, mission) {
  if (!record(value) || value["capability"] !== "restoration.preview-weeks.v1") fail2("capability");
  const config = value;
  if (config.scenes !== void 0) {
    if (!Array.isArray(config.scenes) || config.scenes.length > 16 || new Set(config.scenes.map((s) => s?.id)).size !== config.scenes.length || new Set(config.scenes.map((s) => s?.workId)).size !== config.scenes.length) fail2("panorama scenes");
    for (const scene of config.scenes) {
      requirePanorama(scene);
      if (!mission.works.some((w) => w.id === scene.workId)) fail2("panorama work");
    }
  }
  if (!Array.isArray(config.weeks) || config.weeks.length !== 4) fail2("four weeks required");
  config.weeks.forEach((week, i) => {
    if (!week || week.week !== i + 1 || !strings([week.title, week.setting]) || !strings(week.questions) || !strings(week.evidence) || !strings(week.controls)) fail2("week planning");
    if (!Array.isArray(week.sessions) || week.sessions.length !== 2) fail2("two sessions required");
    for (const session of week.sessions) {
      const work = mission.works.find((w) => w.id === session?.workId);
      if (!work || !strings([session.title, session.product]) || !strings(session.steps) || !["inspect", "compare", "restore", "exhibit"].includes(session.activity)) fail2("session/work reference");
      const film = session.film;
      if (!film || !/^\/[\w/.-]+\.mp4$/.test(film.src) || !/^\/[\w/.-]+\.vtt$/.test(film.captions) || !Array.isArray(film.cues) || !film.cues.length || film.cues.length > 10) fail2("film media");
      let last = -1;
      for (const cue of film.cues) {
        if (!cue || !Number.isFinite(cue.at) || cue.at < 0 || cue.at <= last || !work.regions.some((r) => r.id === cue.regionId) || !strings([cue.label, cue.transcript])) fail2("film cue");
        last = cue.at;
      }
    }
  });
  if (!Array.isArray(config.sampleExhibit) || !config.sampleExhibit.length || config.sampleExhibit.length > mission.works.length) fail2("sample exhibit");
  const seen = /* @__PURE__ */ new Set();
  for (const sample of config.sampleExhibit) {
    const work = mission.works.find((w) => w.id === sample?.workId);
    if (!work || seen.has(sample.workId) || !strings([sample.caption]) || !record(sample.choices)) fail2("sample");
    seen.add(sample.workId);
    for (const [id2, choice] of Object.entries(sample.choices)) if (!work.regions.some((r) => r.id === id2 && r.options.some((o) => o.id === choice))) fail2("sample choice");
  }
  return config;
}
function requirePreviewState(value, mission) {
  const s = value;
  if (!record(value) || s.schemaVersion !== 1 || !Number.isInteger(s.version) || s.version < 0 || !record(s.works) || !record(s.selectedByLesson) || !record(s.sources) || !record(s.trials) || !record(s.captions) || !record(s.filmTimes) || !Array.isArray(s.sampleWorkIds)) fail2("saved state");
  const workExists = (id2) => mission.works.some((w) => w.id === id2);
  if (s.scenes !== void 0) {
    if (!record(s.scenes)) fail2("saved panoramas");
    for (const [id2, sceneState] of Object.entries(s.scenes)) {
      const scene = mission.previewWeeks?.scenes?.find((d) => d.id === id2);
      if (!scene) fail2("saved panorama reference");
      requirePanoramaState(sceneState, scene);
    }
  }
  const validIds = (v) => Array.isArray(v) && v.length <= mission.works.length && new Set(v).size === v.length && v.every((id2) => typeof id2 === "string" && workExists(id2));
  if (s.exhibit !== void 0 && !validIds(s.exhibit) || !validIds(s.sampleWorkIds)) fail2("saved exhibit");
  for (const [lesson, workId] of Object.entries(s.selectedByLesson)) if (!/^[1-8]$/.test(lesson) || !workExists(workId)) fail2("saved selection");
  for (const [lesson, time] of Object.entries(s.filmTimes)) if (!/^[1-8]$/.test(lesson) || !Number.isFinite(time) || time < 0 || time > 3600) fail2("saved film time");
  for (const [id2, caption] of Object.entries(s.captions)) if (!workExists(id2) || typeof caption !== "string" || caption.length > 1500) fail2("saved caption");
  for (const [id2, sources] of Object.entries(s.sources)) if (!workExists(id2) || !Array.isArray(sources) || sources.length > mission.sourceGallery.evidence.length || sources.some((source) => !mission.sourceGallery.evidence.some((e) => e.id === source))) fail2("saved sources");
  const validateImage = (id2, image) => {
    const work = mission.works.find((w) => w.id === id2), state = image;
    if (!work || !record(image) || !record(state.choices) || !Array.isArray(state.inspected) || !Array.isArray(state.undo) || state.undo.length > 100 || !record(state.notes) || state.verified !== false || state.submissions !== 0) fail2("saved image");
    for (const [region, choice] of Object.entries(state.choices)) if (!work.regions.some((r) => r.id === region && r.options.some((o) => o.id === choice))) fail2("saved layer");
    if (state.inspected.some((id3) => !work.regions.some((r) => r.id === id3)) || state.selectedRegionId && !work.regions.some((r) => r.id === state.selectedRegionId)) fail2("saved region");
    for (const undo of state.undo) if (!undo || !work.regions.some((r) => r.id === undo.regionId && r.options.some((o) => o.id === undo.previousOptionId))) fail2("saved undo");
  };
  for (const [id2, state] of Object.entries(s.works)) validateImage(id2, state);
  for (const [id2, trials] of Object.entries(s.trials)) {
    if (!workExists(id2) || !Array.isArray(trials) || trials.length > 20) fail2("saved trials");
    for (const trial of trials) {
      if (!trial || typeof trial.id !== "string") fail2("saved trial");
      validateImage(id2, trial.state);
    }
  }
  return s;
}

export {
  requireSpatialInspection,
  requireRestorationPreview,
  requirePreviewState
};
//# debugId=02806eb5-9efa-51e0-85b1-88a786e9a840
//# sourceMappingURL=chunk-VU6DZYCP.js.map
