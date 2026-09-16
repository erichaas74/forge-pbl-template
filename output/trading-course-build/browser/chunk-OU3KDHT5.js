import {
  emptyInquiryState,
  inquiryGateReady,
  isInquiryState
} from "./chunk-H7BIYLRY.js";
import {
  CapabilityRegistry,
  EventRegistry,
  Registry
} from "./chunk-2WXJ5NX3.js";
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

// src/app/templates/history-live/domain/history-live-research.ts
function researchItems(config) {
  const witnesses = new Set(config.researchLibrary?.witnessSourceIds ?? []);
  return [
    ...config.researchLibrary?.entries ?? [],
    ...config.sources.filter((source) => source.primary).map((source) => ({
      id: source.id,
      category: witnesses.has(source.id) ? "witnesses" : "documents",
      title: source.title,
      description: `${source.sourceType} \xB7 ${source.creator} \xB7 ${source.dateLabel}`,
      sourceIds: [source.id],
      sections: [
        {
          label: source.excerptKind === "quotation" ? "Excerpt" : "Document summary",
          text: source.excerpt
        }
      ]
    }))
  ];
}
function validateResearchLibrary(config) {
  const library = config.researchLibrary;
  if (!library) return [];
  const issues = [];
  const sources = new Set(config.sources.map((source) => source.id));
  const ids = new Set(sources);
  if (library.version !== "1.0") issues.push("RESEARCH_VERSION_INVALID");
  if (new Set(library.witnessSourceIds).size !== library.witnessSourceIds.length || library.witnessSourceIds.some(
    (id) => !config.sources.some((source) => source.id === id && source.primary)
  ))
    issues.push("RESEARCH_WITNESS_REFERENCE_INVALID");
  for (const entry of library.entries) {
    if (!entry.id.trim() || ids.has(entry.id)) issues.push(`RESEARCH_ID_INVALID: ${entry.id}`);
    ids.add(entry.id);
    if (!["interviews", "events"].includes(entry.category) || !entry.title.trim() || !entry.description.trim() || !entry.sections.length || entry.sections.some((section) => !section.label.trim() || !section.text.trim()))
      issues.push(`RESEARCH_CONTENT_INVALID: ${entry.id}`);
    if (!entry.sourceIds.length || entry.sourceIds.some((id) => !sources.has(id)))
      issues.push(`RESEARCH_SOURCE_REFERENCE_INVALID: ${entry.id}`);
  }
  return issues;
}

// src/app/templates/history-live/core/history-live-quality.ts
function sourceUsable(source, state) {
  return state.pitch.reportingMode === "retrospective" || !!source.availableOn && !!state.pitch.asOfDate && source.availableOn <= state.pitch.asOfDate;
}
function stageIssues(state, stage, config) {
  if (stage === "opening" || stage === "side") return [];
  const issues = [];
  if (!state.selectedSide) issues.push("Choose a reporting network.");
  if (stage === "assignment") return issues;
  if (!state.pitch.beatId) issues.push("Choose a story or news beat.");
  if (stage === "pitch") return issues;
  if (state.pitch.status !== "approved")
    issues.push("Submit your pitch and obtain producer approval.");
  if (stage === "sources") return issues;
  if (state.savedSourceIds.length < 2) issues.push("Pin at least two sources.");
  if (config && !config.sources.some(
    (source) => state.savedSourceIds.includes(source.id) && source.primary && sourceUsable(source, state)
  ))
    issues.push("Include a primary source available for your reporting date.");
  if (config && state.savedSourceIds.some(
    (id) => !config.sources.some((source) => source.id === id && sourceUsable(source, state))
  ))
    issues.push("Remove later sources or explicitly choose retrospective reporting.");
  const completeClaims = state.claims.filter(
    (claim) => (claim.reasoning?.trim().length ?? 0) >= 12 && claim.evidence?.some(
      (link) => link.relationship === "supports" && link.passage.trim().length >= 8 && state.savedSourceIds.includes(link.sourceId)
    ) && claim.evidence.every(
      (link) => link.passage.trim().length >= 8 && state.savedSourceIds.includes(link.sourceId)
    ) && (!["uncertain", "disputed", "partially-supported"].includes(claim.status) || (claim.uncertainty?.trim().length ?? 0) >= 12)
  );
  if (!completeClaims.length || completeClaims.length !== state.claims.length)
    issues.push(
      "Add a claim with a specific supporting passage and reasoning; explain any uncertainty."
    );
  if (stage === "script") return issues;
  if (state.scriptBlocks.length < 3 || state.scriptBlocks.some((block) => block.text.trim().length < 12))
    issues.push("Write at least three complete script cues, including an opening and closing.");
  if (!state.scriptBlocks.some((block) => block.type === "ON CAMERA") || !state.scriptBlocks.some((block) => block.type === "REPORTER CLOSE"))
    issues.push("Include ON CAMERA and REPORTER CLOSE cues.");
  if (state.claims.some((claim) => !state.scriptBlocks.some((block) => block.claimId === claim.id)))
    issues.push("Link each checked claim to a script cue.");
  if (state.scriptBlocks.some(
    (block) => block.claimId && !state.claims.some((claim) => claim.id === block.claimId)
  ))
    issues.push("Repair script links to removed claims.");
  if (stage === "production") return issues;
  if (config && state.visualSequence.some(
    (scene) => (scene.mediaType === "image" || scene.mediaType === "historical-map") && !config.sources.find((source) => source.id === scene.sourceId)?.imageUrl
  )) {
    issues.push(
      "Choose an evidence caption or timeline for sources without an embedded image. Open the cited original to inspect a map."
    );
  }
  if (state.visualSequence.some((scene) => scene.mediaType === "simple-chart"))
    issues.push("Chart rendering is unavailable. Choose a supported scene format.");
  if (state.visualSequence.length < 3 || state.visualSequence.some(
    (scene) => !scene.sourceId || !state.savedSourceIds.includes(scene.sourceId) || (scene.caption?.trim().length ?? 0) < 8
  ))
    issues.push("Assign a pinned source and evidence caption to each of three scenes.");
  if (stage === "broadcast") return issues;
  if (!state.studentSegmentReady || state.packageStatus !== "approved")
    issues.push("Submit the package and obtain producer clearance.");
  return issues;
}
function validateHistoryLiveContent(config) {
  const issues = [...validateResearchLibrary(config)];
  for (const collection of [config.sources, config.storyLeads, config.beats, config.networks]) {
    if (new Set(collection.map((item) => item.id)).size !== collection.length)
      issues.push("DUPLICATE_ID: Content IDs must be unique.");
  }
  for (const source of config.sources) {
    if (!source.url || !/^https:\/\//.test(source.url))
      issues.push(`SOURCE_URL_MISSING: ${source.id}`);
    if (!config.fieldStudio && (!source.availableOn || !/^\d{4}-\d{2}-\d{2}$/.test(source.availableOn)))
      issues.push(`SOURCE_DATE_MISSING: ${source.id}`);
  }
  for (const lead of config.storyLeads) {
    const packet = lead.sourceIds?.map((id) => config.sources.find((source) => source.id === id)) ?? [];
    if (!config.beats.some((beat) => beat.id === lead.beatId))
      issues.push(`BEAT_REFERENCE_MISSING: ${lead.id}`);
    if (packet.length < 2 || packet.some((source) => !source))
      issues.push(`SOURCE_PACKET_INCOMPLETE: ${lead.id}`);
    if (!packet.some((source) => source?.primary))
      issues.push(`PRIMARY_SOURCE_MISSING: ${lead.id}`);
    if (!config.fieldStudio && (!lead.asOfDate || packet.some((source) => source?.availableOn && source.availableOn > lead.asOfDate)))
      issues.push(`SOURCE_PACKET_DATE_CONFLICT: ${lead.id}`);
  }
  return issues;
}

// src/app/templates/history-live/core/history-live-state.ts
var HISTORY_LIVE_STAGES = [
  { id: "opening", label: "History Live", shortLabel: "Open" },
  { id: "side", label: "Choose Network", shortLabel: "Network" },
  { id: "assignment", label: "Assignment Desk", shortLabel: "Story" },
  { id: "pitch", label: "Story Pitch", shortLabel: "Pitch" },
  { id: "sources", label: "Source Wall", shortLabel: "Research" },
  { id: "script", label: "Script Desk", shortLabel: "Script" },
  { id: "production", label: "Production Studio", shortLabel: "Produce" },
  { id: "broadcast", label: "Broadcast Preview", shortLabel: "Preview" },
  { id: "schedule", label: "Producer Schedule", shortLabel: "Schedule" },
  { id: "showcase", label: "Special Report", shortLabel: "Watch" }
];
var EMPTY_PITCH = {
  beatId: "",
  headline: "",
  storyQuestion: "",
  whyAirtime: "",
  reportFormat: "Field Report",
  evidenceNeeded: "",
  initialPrediction: "",
  opposingChallenge: "",
  asOfDate: "",
  reportingMode: "contemporary",
  status: "draft"
};
function createInitialHistoryLiveState(config, runtimeScope) {
  return {
    runtimeScope,
    schemaVersion: "1.0",
    revision: 1,
    stage: "opening",
    selectedSide: config.fieldStudio?.networkSide,
    role: "student",
    sideLocked: false,
    pitch: EMPTY_PITCH,
    savedSourceIds: [],
    claims: [],
    scriptBlocks: [
      {
        id: "script-open",
        type: "ON CAMERA",
        text: ""
      },
      {
        id: "script-evidence",
        type: "SHOW SOURCE",
        text: ""
      },
      {
        id: "script-close",
        type: "REPORTER CLOSE",
        text: ""
      }
    ],
    visualSequence: [
      {
        id: "scene-open",
        camera: "studio-wide",
        mediaType: "timeline",
        label: "Opening headline"
      },
      {
        id: "scene-report",
        camera: "reporter",
        mediaType: "quote",
        label: "Reporter on camera"
      },
      {
        id: "scene-evidence",
        camera: "media-wall",
        mediaType: "quote",
        label: "Primary-source evidence"
      }
    ],
    studentSegmentReady: false,
    schedule: [],
    packageStatus: "draft",
    reflection: "",
    transcript: "",
    reflectionHistory: [],
    pitchHistory: [],
    reviewHistory: [],
    activeSegmentIndex: 0,
    showStatus: "ready",
    audienceReactions: {},
    eventHistory: []
  };
}
function pitchMissingRequirements(pitch2) {
  const fields = [
    ["News beat", pitch2.beatId, 1],
    ["Working headline", pitch2.headline, 8],
    ["Story question", pitch2.storyQuestion, 12],
    ["Why this deserves airtime", pitch2.whyAirtime, 12],
    ["Evidence you need", pitch2.evidenceNeeded, 8],
    ["Initial prediction", pitch2.initialPrediction, 12],
    ["Opposing-network check", pitch2.opposingChallenge, 12]
  ];
  const missing = fields.filter(([, value, minimum]) => value.trim().length < minimum).map(
    ([label, , minimum]) => `${label}: ${minimum === 1 ? "choose a beat" : `at least ${minimum} characters`}`
  );
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pitch2.asOfDate ?? ""))
    missing.push("Report as of: choose a date");
  return missing;
}
function isPitchReady(pitch2) {
  return pitchMissingRequirements(pitch2).length === 0;
}
function interleaveBroadcastSegments(segments) {
  const keys = [...new Set(segments.map((s) => s.side))];
  const queues = keys.map((key) => segments.filter((s) => s.side === key));
  const result = [];
  while (queues.some((q) => q.length)) for (const queue of queues) {
    const next = queue.shift();
    if (next) result.push(next);
  }
  return result;
}
function formatBroadcastTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function validateHistoryLiveVisualConfig(config) {
  const errors = [];
  const sides = config.networks.map((n) => n.side);
  if (!sides.length || new Set(sides).size !== sides.length || sides.some((id) => typeof id !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(id))) errors.push("Network keys must be unique stable IDs.");
  if (config.storyLeads.some((l) => !sides.includes(l.side))) errors.push("Story references an unknown network.");
  for (const network of config.networks) {
    if (network.deskImageUrl.trim().length === 0) {
      errors.push(`Network ${network.id} is missing a project-specific desk image.`);
    }
    if (network.deskImageAlt.trim().length === 0) {
      errors.push(`Network ${network.id} is missing desk image alt text.`);
    }
  }
  for (const side of new Set([...sides, ...config.storyLeads.map((l) => l.side), ...config.assignmentScenes.map((s) => s.side)].filter((id) => typeof id === "string"))) {
    const scene = config.assignmentScenes.find((item) => item.side === side);
    if (scene === void 0 && config.fieldStudio) continue;
    if (scene === void 0) {
      errors.push(`Side ${side} is missing an assignment scene.`);
      continue;
    }
    const leads = config.storyLeads.filter((lead) => lead.side === side);
    for (const lead of leads) {
      const matches = scene.advocates.filter((advocate) => advocate.leadId === lead.id);
      if (matches.length !== 1) {
        errors.push(`Lead ${lead.id} must map to exactly one visible assignment advocate.`);
      }
    }
    for (const advocate of scene.advocates) {
      const values = [
        advocate.leftPercent,
        advocate.topPercent,
        advocate.widthPercent,
        advocate.heightPercent
      ];
      const inBounds = values.every((value) => Number.isFinite(value) && value >= 0 && value <= 100) && advocate.leftPercent + advocate.widthPercent <= 100 && advocate.topPercent + advocate.heightPercent <= 100;
      if (!inBounds) errors.push(`Advocate surface for ${advocate.leadId} is outside the scene.`);
    }
  }
  return errors;
}

// src/app/templates/history-live/reporting/story-reporting.models.ts
var REPORTING_STEPS = ["story", "gather", "build", "format", "create"];
var PRESENTATION_FORMATS = ["broadcast", "reaction", "social", "animation"];
var BOARD_FIELDS = ["question", "facts", "opposing", "context", "unknowns", "lead"];

// src/app/templates/history-live/reporting/story-reporting.validation.ts
var record = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text = (v) => typeof v === "string" && v.length <= 6e3;
var strings = (v, max = 100) => Array.isArray(v) && v.length <= max && v.every(text);
var format = (v) => PRESENTATION_FORMATS.includes(v);
var formats = (v) => Array.isArray(v) && v.length > 0 && v.length <= 4 && v.every(format) && new Set(v).size === v.length;
function isStoryReportingSnapshot(v) {
  if (!record(v) || v["version"] !== "1.0" || !REPORTING_STEPS.includes(v["step"]) || v["activeStoryId"] !== void 0 && !text(v["activeStoryId"]) || v["allowedFormats"] !== void 0 && !formats(v["allowedFormats"]) || !Array.isArray(v["workspaces"]) || v["workspaces"].length > 30) return false;
  const ids = /* @__PURE__ */ new Set();
  for (const w of v["workspaces"]) {
    if (!record(w) || !text(w["storyId"]) || ids.has(w["storyId"]) || !strings(w["asked"]) || !strings(w["checks"], 3) || !record(w["noteDrafts"]) || Object.keys(w["noteDrafts"]).length > 60 || !Object.values(w["noteDrafts"]).every(text) || !Array.isArray(w["notes"]) || w["notes"].length > 60 || !record(w["board"]) || !record(w["presentations"]) || w["format"] !== void 0 && !format(w["format"])) return false;
    ids.add(w["storyId"]);
    const noteIds = /* @__PURE__ */ new Set();
    for (const n of w["notes"]) {
      if (!record(n) || !["id", "originId", "title", "text", "originalText"].every((key) => text(n[key])) || !["interview", "scene", "document"].includes(String(n["kind"])) || !strings(n["sourceIds"]) || !strings(n["previous"], 5) || noteIds.has(String(n["id"]))) return false;
      noteIds.add(String(n["id"]));
    }
    for (const field of BOARD_FIELDS) {
      const b = w["board"][field];
      if (!record(b) || !text(b["text"]) || !strings(b["noteIds"], 60) || b["noteIds"].some((id) => !noteIds.has(id))) return false;
    }
    for (const [key, draft] of Object.entries(w["presentations"])) {
      if (!format(key) || !record(draft) || !text(draft["title"]) || !strings(draft["parts"], 4) || draft["parts"].length !== 4 || draft["savedRevision"] !== void 0 && (!Number.isSafeInteger(draft["savedRevision"]) || Number(draft["savedRevision"]) < 1)) return false;
    }
    if (w["format"] && !w["presentations"][String(w["format"])]) return false;
  }
  return v["activeStoryId"] === void 0 ? v["step"] === "story" : ids.has(String(v["activeStoryId"]));
}

// src/app/templates/history-live/core/history-live-snapshot.ts
var record2 = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var strings2 = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
var text2 = (value, keys) => keys.every((key) => typeof value[key] === "string");
var list = (value, check) => Array.isArray(value) && value.every((item) => record2(item) && check(item));
var optionalText = (value, keys) => keys.every((key) => value[key] === void 0 || typeof value[key] === "string");
var evidence = (value) => list(
  value,
  (item) => text2(item, ["sourceId", "passage"]) && ["supports", "challenges"].includes(String(item["relationship"]))
);
var blocks = (value) => list(
  value,
  (item) => text2(item, ["id", "text"]) && [
    "ON CAMERA",
    "VOICEOVER",
    "SHOW MAP",
    "SHOW SOURCE",
    "SHOW_QUOTE",
    "SHOW QUOTE",
    "TRANSITION",
    "LOWER THIRD",
    "REPORTER CLOSE"
  ].includes(String(item["type"])) && optionalText(item, ["sourceId", "claimId"])
);
var scenes = (value) => list(
  value,
  (item) => text2(item, ["id", "label"]) && ["studio-wide", "reporter", "media-wall"].includes(String(item["camera"])) && ["image", "historical-map", "quote", "timeline", "simple-chart"].includes(
    String(item["mediaType"])
  ) && optionalText(item, ["sourceId", "caption"])
);
var pitch = (value) => record2(value) && text2(value, [
  "beatId",
  "headline",
  "storyQuestion",
  "whyAirtime",
  "reportFormat",
  "evidenceNeeded",
  "initialPrediction",
  "opposingChallenge"
]) && ["draft", "submitted", "approved", "revise"].includes(String(value["status"])) && optionalText(value, ["asOfDate", "reportingMode", "feedback", "leadId"]);
function isHistoryLiveSnapshot(value) {
  if (!record2(value) || value["schemaVersion"] !== "1.0" || !Number.isSafeInteger(value["revision"]) || Number(value["revision"]) < 1)
    return false;
  if (![
    "opening",
    "side",
    "assignment",
    "pitch",
    "sources",
    "script",
    "production",
    "broadcast",
    "schedule",
    "showcase"
  ].includes(String(value["stage"])))
    return false;
  if (!["student", "producer"].includes(String(value["role"])) || !(value["selectedSide"] === void 0 || typeof value["selectedSide"] === "string" && /^[a-z0-9][a-z0-9-]*$/.test(value["selectedSide"])))
    return false;
  if (typeof value["sideLocked"] !== "boolean" || typeof value["studentSegmentReady"] !== "boolean" || !pitch(value["pitch"]))
    return false;
  if (!strings2(value["savedSourceIds"]) || !blocks(value["scriptBlocks"]) || !scenes(value["visualSequence"]))
    return false;
  if (!list(
    value["claims"],
    (item) => text2(item, ["id", "text"]) && ["verified", "strongly-supported", "partially-supported", "uncertain", "disputed"].includes(
      String(item["status"])
    ) && strings2(item["supportingSourceIds"]) && (item["evidence"] === void 0 || evidence(item["evidence"])) && optionalText(item, ["reasoning", "uncertainty"])
  ))
    return false;
  if (!list(
    value["schedule"],
    (item) => text2(item, [
      "id",
      "reporter",
      "networkName",
      "headline",
      "desk",
      "startLabel",
      "visualLabel"
    ]) && typeof item["side"] === "string" && /^[a-z0-9][a-z0-9-]*$/.test(item["side"]) && typeof item["ready"] === "boolean" && Number.isFinite(item["durationSeconds"]) && Number(item["durationSeconds"]) >= 0 && (item["script"] === void 0 || blocks(item["script"])) && (item["scenes"] === void 0 || scenes(item["scenes"])) && optionalText(item, ["recordingAssetId", "transcript"])
  ))
    return false;
  if (!Number.isSafeInteger(value["activeSegmentIndex"]) || Number(value["activeSegmentIndex"]) < 0 || Number(value["activeSegmentIndex"]) >= Math.max(1, value["schedule"].length))
    return false;
  if (!["ready", "live", "held", "ended"].includes(String(value["showStatus"])) || !record2(value["audienceReactions"]) || !Object.values(value["audienceReactions"]).every(
    (count) => Number.isSafeInteger(count) && Number(count) >= 0
  ))
    return false;
  if (!list(
    value["eventHistory"],
    (event) => text2(event, ["id", "eventType", "timestamp", "projectId", "clientEventId"]) && record2(event["actor"]) && text2(event["actor"], ["type", "id"])
  ))
    return false;
  if (!optionalText(value, [
    "packageStatus",
    "packageFeedback",
    "recordingAssetId",
    "transcript",
    "reflection",
    "selectedSourceId"
  ]))
    return false;
  if (value["reflectionHistory"] !== void 0 && !list(value["reflectionHistory"], (item) => text2(item, ["text", "timestamp"])))
    return false;
  if (value["pitchHistory"] !== void 0 && !list(value["pitchHistory"], (item) => pitch(item["pitch"]) && text2(item, ["timestamp"])))
    return false;
  if (value["reviewHistory"] !== void 0 && !list(
    value["reviewHistory"],
    (item) => text2(item, ["target", "decision", "feedback", "timestamp"])
  ))
    return false;
  const draft = value["claimDraft"];
  if (draft !== void 0 && (!record2(draft) || !text2(draft, ["text", "reasoning", "uncertainty", "status"]) || !evidence(draft["evidence"])))
    return false;
  if (value["inquiry"] !== void 0 && !isInquiryState(value["inquiry"])) return false;
  return value["reporting"] === void 0 || isStoryReportingSnapshot(value["reporting"]);
}

// src/app/templates/history-live/persistence/history-live.persistence.ts
var BrowserHistoryLivePersistenceAdapter = class {
  constructor(scope) {
    this.scope = scope;
  }
  scope;
  revisions = /* @__PURE__ */ new Map();
  load(projectId, projectVersion) {
    const raw = localStorage.getItem(this.key(projectId, projectVersion));
    if (raw === null) {
      this.revisions.set(this.key(projectId, projectVersion), 0);
      return void 0;
    }
    try {
      const value = JSON.parse(raw);
      if (!isHistoryLiveSnapshot(value)) throw new Error("Invalid snapshot");
      this.revisions.set(this.key(projectId, projectVersion), value.revision);
      return value;
    } catch {
      throw new Error(
        "SNAPSHOT_INVALID: Saved data has an unsupported structure. Export it before resetting."
      );
    }
  }
  save(projectId, projectVersion, state) {
    const key = this.key(projectId, projectVersion);
    const raw = localStorage.getItem(key);
    const current = raw === null ? void 0 : JSON.parse(raw);
    if (current !== void 0 && !isHistoryLiveSnapshot(current))
      throw new Error("SNAPSHOT_INVALID");
    const revision = current?.revision ?? 0;
    if (revision !== (this.revisions.get(key) ?? 0))
      throw new Error(
        "STATE_CONFLICT: Another tab saved this workspace. Export your draft before reloading."
      );
    localStorage.setItem(key, JSON.stringify(state));
    this.revisions.set(key, state.revision);
  }
  clear(projectId, projectVersion) {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(this.key(projectId, projectVersion));
    this.revisions.set(this.key(projectId, projectVersion), 0);
  }
  key(projectId, projectVersion) {
    return `forge:history-live:scoped:${[this.scope.tenantId, this.scope.classId, this.scope.studentId, projectId, projectVersion].map(encodeURIComponent).join(":")}`;
  }
};
var HISTORY_LIVE_PERSISTENCE = new InjectionToken(
  "HISTORY_LIVE_PERSISTENCE"
);

// src/app/templates/history-live/runtime/history-live.tokens.ts
var HISTORY_LIVE_CONFIG = new InjectionToken(
  "HISTORY_LIVE_CONFIG"
);
var HISTORY_LIVE_ENROLLMENT = new InjectionToken(
  "HISTORY_LIVE_ENROLLMENT"
);
var HISTORY_LIVE_AUTHORITY = new InjectionToken(
  "HISTORY_LIVE_AUTHORITY"
);
var HISTORY_LIVE_MEDIA = new InjectionToken("HISTORY_LIVE_MEDIA");

// src/app/templates/history-live/runtime/history-live-capabilities.ts
var historyLiveEventIds = [
  "inquiry.draftChanged",
  "inquiry.attemptSubmitted",
  "inquiry.reviewed",
  "inquiry.segmentPrepared",
  "reporting.storySelected",
  "reporting.stepOpened",
  "reporting.questionAsked",
  "reporting.noteDraftChanged",
  "reporting.noteSaved",
  "reporting.boardChanged",
  "reporting.noteLinked",
  "reporting.checkChanged",
  "reporting.formatSelected",
  "reporting.presentationChanged",
  "reporting.presentationSaved",
  "reporting.formatsConfigured",
  "audience.reacted",
  "broadcast.ended",
  "broadcast.held",
  "broadcast.nextTaken",
  "broadcast.previousTaken",
  "broadcast.started",
  "claim.created",
  "claim.draftChanged",
  "claim.removed",
  "network.selected",
  "package.reviewed",
  "package.submitted",
  "pitch.draftChanged",
  "pitch.formatChanged",
  "pitch.reopened",
  "pitch.reviewed",
  "pitch.submitted",
  "production.sceneChanged",
  "recording.saved",
  "reflection.draftChanged",
  "reflection.revised",
  "schedule.reordered",
  "script.blockAdded",
  "script.blockRemoved",
  "script.blockTypeChanged",
  "script.claimLinked",
  "script.draftChanged",
  "source.closed",
  "source.opened",
  "source.removed",
  "source.saved",
  "story.claimed",
  "story.customPitchStarted",
  "transcript.draftChanged",
  "viewer.roleChanged",
  "workflow.stageOpened"
];
var historyLiveEvents = new EventRegistry();
historyLiveEvents.registerAll(
  historyLiveEventIds.map((id) => ({ id, version: "1.1", status: "extension" }))
);
var historyLiveCommands = new Registry(
  "history-live-commands"
);
historyLiveCommands.registerAll([
  { id: "reporting.configureFormats", producerOnly: true },
  { id: "broadcast.end", producerOnly: true },
  { id: "broadcast.hold", producerOnly: true },
  { id: "broadcast.next", producerOnly: true },
  { id: "broadcast.previous", producerOnly: true },
  { id: "broadcast.start", producerOnly: true },
  { id: "package.review", producerOnly: true },
  { id: "package.submit", producerOnly: false },
  { id: "pitch.reopen", producerOnly: true },
  { id: "pitch.review", producerOnly: true },
  { id: "pitch.submit", producerOnly: false },
  { id: "schedule.reorder", producerOnly: true }
]);
var historyLiveCapabilities = new CapabilityRegistry();
historyLiveCapabilities.register({
  id: "learning.worked-example",
  version: "1.0",
  status: "extension",
  eventsProduced: [],
  actionsSupported: []
});
historyLiveCapabilities.register({
  id: "history-live.story-reporting",
  version: "1.0",
  status: "extension",
  eventsProduced: historyLiveEventIds.filter((id) => id.startsWith("reporting.")),
  actionsSupported: ["history-live.reporting.configureFormats"]
});
historyLiveCapabilities.register({
  id: "history-live.editorial-workflow",
  version: "1.1",
  status: "extension",
  eventsProduced: historyLiveEventIds,
  actionsSupported: historyLiveCommands.list().map((command) => `history-live.${command.id}`)
});
historyLiveCapabilities.register({
  id: "learning.inquiry-portfolio",
  version: "1.0",
  status: "extension",
  eventsProduced: historyLiveEventIds.filter((id) => id.startsWith("inquiry.")),
  actionsSupported: []
});
historyLiveCapabilities.register({
  id: "history-live.field-studio",
  version: "1.0",
  status: "extension",
  eventsProduced: ["inquiry.segmentPrepared", "recording.saved"],
  actionsSupported: []
});

// src/app/templates/history-live/reporting/story-reporting.engine.ts
var EDITOR_CHECKS = ["Sources checked", "Views represented fairly", "Uncertainty is clear"];
var EMPTY_REPORTING = { version: "1.0", step: "story", workspaces: [] };
function emptyReportingWorkspace(storyId) {
  return {
    storyId,
    notes: [],
    noteDrafts: {},
    asked: [],
    checks: [],
    presentations: {},
    board: Object.fromEntries(BOARD_FIELDS.map((key) => [key, { text: "", noteIds: [] }]))
  };
}
function reportingOrigin(story, originId) {
  const interview = story.interviews.find((person) => person.id === originId);
  if (interview) return { kind: "interview", title: interview.name, sourceIds: interview.sourceIds };
  if (originId === "scene") return { kind: "scene", title: `${story.location} \xB7 scene notes`, sourceIds: [...new Set(story.dispatches.flatMap((item) => item.sourceIds))] };
  if (story.sourceIds.includes(originId)) return { kind: "document", title: "", sourceIds: [originId] };
  throw new Error("This evidence is not part of the selected story.");
}
function boardIssues(work) {
  if (!work) return ["Pick a story."];
  const issues = [];
  if (!work.board.question.text.trim()) issues.push("Your story question");
  if (!work.board.facts.text.trim()) issues.push("Facts in your own words");
  const notes = work.notes.filter((note) => work.board.facts.noteIds.includes(note.id));
  if (new Set(notes.flatMap((note) => note.sourceIds)).size < 2) issues.push("Facts linked to two sources");
  if (!notes.some((note) => note.kind === "document")) issues.push("A document note linked to your facts");
  if (!work.board.opposing.text.trim() || !work.board.opposing.noteIds.length) issues.push("Another view with a linked note");
  if (!work.board.context.text.trim()) issues.push("Who, where, and when");
  if (!work.board.unknowns.text.trim()) issues.push("What is still uncertain");
  if (!work.board.lead.text.trim()) issues.push("Your opening sentence");
  if (EDITOR_CHECKS.some((check) => !work.checks.includes(check))) issues.push("Your three editor checks");
  return issues;
}
function reportingStepIssues(state, step) {
  const work = state.workspaces.find((item) => item.storyId === state.activeStoryId);
  if (step === "story") return [];
  if (!work) return ["Pick a story first."];
  if (step === "build") return work.notes.length ? [] : ["Save your first reporting note."];
  if (step === "format" || step === "create") {
    const issues = boardIssues(work);
    if (step === "create" && !work.format) issues.push("Choose a presentation.");
    return issues;
  }
  return [];
}
function reduceReporting(state, action, config) {
  const reporting = config.reporting;
  if (!reporting) throw new Error("Story reporting is not configured.");
  if (action.type === "reporting.storySelected") {
    if (!reporting.stories.some((item) => item.id === action.storyId)) throw new Error("Unknown story.");
    return __spreadProps(__spreadValues({}, state), { activeStoryId: action.storyId, step: "gather", workspaces: state.workspaces.some((item) => item.storyId === action.storyId) ? state.workspaces : [...state.workspaces, emptyReportingWorkspace(action.storyId)] });
  }
  if (action.type === "reporting.stepOpened") {
    const issues = reportingStepIssues(state, action.step);
    if (issues.length) throw new Error(issues.join(" \xB7 "));
    return __spreadProps(__spreadValues({}, state), { step: action.step });
  }
  const work = state.workspaces.find((item) => item.storyId === state.activeStoryId);
  const story = reporting.stories.find((item) => item.id === state.activeStoryId);
  if (!work || !story) throw new Error("Pick a story first.");
  let next = work;
  let step = state.step;
  const clipped = (text3) => text3.slice(0, 6e3);
  switch (action.type) {
    case "reporting.questionAsked": {
      const person = story.interviews.find((item) => item.id === action.interviewId);
      if (!person?.questions.some((item) => item.id === action.questionId)) throw new Error("Unknown interview question.");
      next = __spreadProps(__spreadValues({}, work), { asked: [.../* @__PURE__ */ new Set([...work.asked, `${action.interviewId}:${action.questionId}`])] });
      break;
    }
    case "reporting.noteDraftChanged":
      reportingOrigin(story, action.originId);
      next = __spreadProps(__spreadValues({}, work), { noteDrafts: __spreadProps(__spreadValues({}, work.noteDrafts), { [action.originId]: clipped(action.text) }) });
      break;
    case "reporting.noteSaved": {
      const origin = reportingOrigin(story, action.originId);
      const text3 = work.noteDrafts[action.originId]?.trim();
      if (!text3) throw new Error("Write a note in your own words.");
      if (origin.kind === "interview" && !work.asked.some((key) => key.startsWith(`${action.originId}:`))) throw new Error("Ask this person a question first.");
      const existing = work.notes.find((item) => item.originId === action.originId);
      const title = origin.title || config.sources.find((item) => item.id === action.originId).title;
      const note = __spreadProps(__spreadValues({}, origin), { title, id: existing?.id ?? `note:${action.originId}`, originId: action.originId, text: text3, originalText: existing?.originalText ?? text3, previous: existing && existing.text !== text3 ? [...existing.previous.slice(-4), existing.text] : existing?.previous ?? [] });
      next = __spreadProps(__spreadValues({}, work), { checks: [], notes: [...work.notes.filter((item) => item.id !== note.id), note] });
      break;
    }
    case "reporting.boardChanged":
      next = __spreadProps(__spreadValues({}, work), { checks: [], board: __spreadProps(__spreadValues({}, work.board), { [action.field]: __spreadProps(__spreadValues({}, work.board[action.field]), { text: clipped(action.text) }) }) });
      break;
    case "reporting.noteLinked": {
      if (!work.notes.some((item) => item.id === action.noteId)) throw new Error("This note belongs to another story.");
      const entry = work.board[action.field];
      next = __spreadProps(__spreadValues({}, work), { checks: [], board: __spreadProps(__spreadValues({}, work.board), { [action.field]: __spreadProps(__spreadValues({}, entry), { noteIds: entry.noteIds.includes(action.noteId) ? entry.noteIds.filter((id) => id !== action.noteId) : [...entry.noteIds, action.noteId] }) }) });
      break;
    }
    case "reporting.checkChanged":
      if (!EDITOR_CHECKS.includes(action.check)) throw new Error("Unknown editor check.");
      next = __spreadProps(__spreadValues({}, work), { checks: work.checks.includes(action.check) ? work.checks.filter((item) => item !== action.check) : [...work.checks, action.check] });
      break;
    case "reporting.formatSelected": {
      const issues = boardIssues(work);
      if (issues.length) throw new Error(issues.join(" \xB7 "));
      if (!(state.allowedFormats ?? reporting.allowedFormats).includes(action.format)) throw new Error("This format is not available for this assignment.");
      next = __spreadProps(__spreadValues({}, work), { format: action.format, presentations: __spreadProps(__spreadValues({}, work.presentations), { [action.format]: work.presentations[action.format] ?? { title: "", parts: ["", "", "", ""] } }) });
      step = "create";
      break;
    }
    case "reporting.presentationChanged": {
      if (!work.format || !(state.allowedFormats ?? reporting.allowedFormats).includes(work.format)) throw new Error("Choose an available format.");
      const draft = work.presentations[work.format];
      if (action.index !== void 0 && (!Number.isInteger(action.index) || action.index < 0 || action.index > 3)) throw new Error("Unknown presentation part.");
      next = __spreadProps(__spreadValues({}, work), { presentations: __spreadProps(__spreadValues({}, work.presentations), { [work.format]: __spreadProps(__spreadValues({}, draft), { savedRevision: void 0, title: action.title === void 0 ? draft.title : clipped(action.title), parts: draft.parts.map((text3, index) => index === action.index ? clipped(action.text ?? "") : text3) }) }) });
      break;
    }
    case "reporting.presentationSaved": {
      const issues = boardIssues(work);
      const draft = work.format && work.presentations[work.format];
      if (issues.length || !draft?.title.trim() || draft.parts.some((text3) => !text3.trim())) throw new Error("Finish the story board, headline, and four report parts.");
      if (!work.format || !(state.allowedFormats ?? reporting.allowedFormats).includes(work.format)) throw new Error("This format is no longer available.");
      next = __spreadProps(__spreadValues({}, work), { presentations: __spreadProps(__spreadValues({}, work.presentations), { [work.format]: __spreadProps(__spreadValues({}, draft), { savedRevision: (draft.savedRevision ?? 0) + 1 }) }) });
      break;
    }
  }
  if (["reporting.noteSaved", "reporting.boardChanged", "reporting.noteLinked", "reporting.checkChanged"].includes(action.type)) {
    next = __spreadProps(__spreadValues({}, next), { presentations: Object.fromEntries(Object.entries(next.presentations).map(([key, value]) => [key, __spreadProps(__spreadValues({}, value), { savedRevision: void 0 })])) });
  }
  return __spreadProps(__spreadValues({}, state), { step, workspaces: state.workspaces.map((item) => item.storyId === work.storyId ? next : item) });
}
function validateReportingConfig(config) {
  const reporting = config.reporting;
  if (!reporting) return [];
  const errors = [];
  if (reporting.version !== "1.0" || !reporting.stories.length || reporting.stories.length > 30) errors.push("Invalid reporting configuration.");
  if (!reporting.allowedFormats.length || new Set(reporting.allowedFormats).size !== reporting.allowedFormats.length || reporting.allowedFormats.some((format2) => !PRESENTATION_FORMATS.includes(format2))) errors.push("Invalid presentation formats.");
  if (new Set(reporting.stories.map((story) => story.id)).size !== reporting.stories.length) errors.push("Duplicate reporting story.");
  for (const story of reporting.stories) {
    if (!config.storyLeads.some((lead) => lead.id === story.leadId)) errors.push(`Missing lead: ${story.id}`);
    if (story.sourceIds.length < 2 || story.interviews.length < 2 || !story.dispatches.length) errors.push(`Incomplete reporting packet: ${story.id}`);
    if (new Set(story.interviews.map((person) => person.id)).size !== story.interviews.length) errors.push(`Duplicate interview: ${story.id}`);
    const references = [...story.sourceIds, ...story.interviews.flatMap((person) => person.sourceIds), ...story.dispatches.flatMap((scene) => scene.sourceIds)];
    for (const id of references) {
      const source = config.sources.find((item) => item.id === id);
      if (!source || !story.sourceIds.includes(id) || !source.availableOn || source.availableOn > story.date) errors.push(`Unavailable source ${id}: ${story.id}`);
    }
    if (!story.sourceIds.some((id) => config.sources.find((source) => source.id === id)?.primary)) errors.push(`Missing primary document: ${story.id}`);
    for (const person of story.interviews) if (!person.questions.length || !person.sourceIds.length || new Set(person.questions.map((question) => question.id)).size !== person.questions.length) errors.push(`Incomplete interview: ${person.id}`);
  }
  return errors;
}

// src/app/templates/history-live/runtime/history-live-runtime.service.ts
var HistoryLiveRuntimeService = class _HistoryLiveRuntimeService {
  config = inject(HISTORY_LIVE_CONFIG);
  viewer = inject(HISTORY_LIVE_ENROLLMENT);
  authority = inject(HISTORY_LIVE_AUTHORITY, { optional: true });
  media = inject(HISTORY_LIVE_MEDIA, { optional: true });
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadError;
  saveTimer;
  disposed = false;
  recordingGeneration = 0;
  flushListener = () => this.flushDrafts();
  persistence = inject(HISTORY_LIVE_PERSISTENCE);
  runtimeScope = {
    tenantId: this.viewer.tenantId,
    projectId: this.config.projectId,
    projectVersion: this.config.projectVersion,
    classId: this.viewer.classId,
    studentId: this.viewer.studentId,
    scopeType: "student"
  };
  initial = createInitialHistoryLiveState(this.config, this.runtimeScope);
  state = signal(
    this.load(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notification = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "notification" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    this.loadError,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    this.loadError ? "error" : "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordingState = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "recordingState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordingUrl = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "recordingUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedNetwork = computed(
    () => this.config.networks.find((network) => network.side === this.state().selectedSide),
    ...ngDevMode ? [{ debugName: "selectedNetwork" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableLeads = computed(
    () => this.config.storyLeads.filter((lead) => lead.side === this.state().selectedSide),
    ...ngDevMode ? [{ debugName: "availableLeads" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assignmentScene = computed(
    () => this.config.assignmentScenes.find((scene) => scene.side === this.state().selectedSide),
    ...ngDevMode ? [{ debugName: "assignmentScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pitchReady = computed(
    () => isPitchReady(this.state().pitch),
    ...ngDevMode ? [{ debugName: "pitchReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  savedSources = computed(
    () => this.config.sources.filter((source) => this.state().savedSourceIds.includes(source.id)),
    ...ngDevMode ? [{ debugName: "savedSources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSource = computed(
    () => this.config.sources.find((source) => source.id === this.state().selectedSourceId),
    ...ngDevMode ? [{ debugName: "selectedSource" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeSegment = computed(
    () => this.state().schedule[this.state().activeSegmentIndex],
    ...ngDevMode ? [{ debugName: "activeSegment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completion = computed(
    () => [
      "assignment",
      "pitch",
      "sources",
      "script",
      "production",
      "broadcast",
      "schedule",
      "showcase"
    ].filter((stage) => stageIssues(this.state(), stage, this.config).length === 0).length,
    ...ngDevMode ? [{ debugName: "completion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  configurationErrors = [
    ...validateReportingConfig(this.config),
    ...validateHistoryLiveVisualConfig(this.config),
    ...validateHistoryLiveContent(this.config)
  ];
  isDemo = this.viewer.mode === "demo";
  canProduce = computed(
    () => this.isDemo ? this.state().role === "producer" : this.viewer.role === "producer" && this.viewer.permissions.includes("history-live.produce"),
    ...ngDevMode ? [{ debugName: "canProduce" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readiness = computed(
    () => stageIssues(this.state(), "broadcast", this.config),
    ...ngDevMode ? [{ debugName: "readiness" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentStudentSegmentId = `segment-${this.viewer.studentId}`;
  eventSequence = 0;
  mediaRecorder;
  mediaStream;
  mediaChunks = [];
  constructor() {
    if (this.configurationErrors.length)
      this.error.set(this.configurationErrors.join(" "));
    if (typeof window !== "undefined") {
      window.addEventListener("pagehide", this.flushListener);
      window.addEventListener("beforeunload", this.flushListener);
    }
    if (this.state().recordingAssetId)
      void this.restoreRecording(this.state().recordingAssetId);
  }
  ngOnDestroy() {
    this.flushDrafts();
    this.disposed = true;
    this.recordingGeneration++;
    this.stopMediaTracks();
    if (this.recordingUrl()?.startsWith("blob:"))
      URL.revokeObjectURL(this.recordingUrl());
    if (typeof window !== "undefined") {
      window.removeEventListener("pagehide", this.flushListener);
      window.removeEventListener("beforeunload", this.flushListener);
    }
  }
  flushDrafts() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = void 0;
    }
    if (this.saveState() === "unsaved" || this.saveState() === "error")
      this.save(this.state());
  }
  stageIssues(stage) {
    return stageIssues(this.state(), stage, this.config);
  }
  sourceUsable(sourceId) {
    const source = this.config.sources.find((item) => item.id === sourceId);
    return !!source && sourceUsable(source, this.state());
  }
  setRole(role) {
    if (!this.isDemo) {
      this.error.set("PERMISSION_DENIED: Your classroom role is assigned by your school.");
      return;
    }
    this.commit("viewer.roleChanged", (state) => __spreadProps(__spreadValues({}, state), {
      role,
      stage: role === "producer" ? "schedule" : state.pitch.beatId ? "pitch" : "side"
    }), role === "producer" ? "teacher" : "student");
    this.notification.set(role === "producer" ? `Producer console opened for ${this.viewer.teacherDisplayName}.` : `Reporter workspace opened for ${this.viewer.studentDisplayName}.`);
  }
  goTo(stage) {
    if (!this.canOpen(stage)) {
      this.error.set(this.stageIssues(stage).join(" "));
      return;
    }
    this.commit("workflow.stageOpened", (current) => __spreadProps(__spreadValues({}, current), { stage }), "student", {
      stage
    });
    this.error.set(void 0);
  }
  canOpen(stage) {
    return !this.configurationErrors.length && (this.canProduce() || this.stageIssues(stage).length === 0);
  }
  chooseSide(side) {
    if (this.state().sideLocked) {
      this.error.set("Your network is locked after pitch approval. Ask the producer to reopen it.");
      return;
    }
    this.commit("network.selected", (state) => __spreadProps(__spreadValues(__spreadValues({}, state), createInitialHistoryLiveState(this.config, this.runtimeScope)), {
      role: state.role,
      selectedSide: side,
      pitch: __spreadValues({}, EMPTY_PITCH),
      savedSourceIds: [],
      claims: [],
      stage: "assignment"
    }));
    this.notification.set(`${this.networkName(side)} newsroom credentials activated.`);
  }
  claimStory(lead) {
    if (lead.side !== this.state().selectedSide || this.state().sideLocked) {
      this.error.set("Reopen your approved pitch before changing stories.");
      return;
    }
    const pitch2 = {
      leadId: lead.id,
      asOfDate: lead.asOfDate ?? "",
      reportingMode: "contemporary",
      beatId: lead.beatId,
      headline: lead.headline,
      storyQuestion: "",
      whyAirtime: "",
      reportFormat: lead.format,
      evidenceNeeded: "",
      initialPrediction: "",
      opposingChallenge: "",
      status: "draft"
    };
    this.commit("story.claimed", (state) => __spreadProps(__spreadValues({}, state), { pitch: pitch2, stage: "pitch" }), "student", {
      leadId: lead.id
    });
  }
  pitchOwnStory(beatId = this.config.beats[0]?.id ?? "breaking") {
    if (this.state().sideLocked) {
      this.error.set("Reopen your approved pitch before changing stories.");
      return;
    }
    this.commit("story.customPitchStarted", (state) => __spreadProps(__spreadValues({}, state), {
      pitch: __spreadProps(__spreadValues({}, EMPTY_PITCH), { beatId }),
      stage: "pitch"
    }));
  }
  updatePitch(field, value) {
    this.commit("pitch.draftChanged", (state) => __spreadProps(__spreadValues({}, state), {
      pitch: __spreadProps(__spreadValues({}, state.pitch), { [field]: value, status: "draft" })
    }), "student", void 0, false);
  }
  setReportFormat(reportFormat) {
    this.commit("pitch.formatChanged", (state) => __spreadProps(__spreadValues({}, state), {
      pitch: __spreadProps(__spreadValues({}, state.pitch), { reportFormat, status: "draft" })
    }), "student", void 0, false);
  }
  async submitPitch() {
    if (!this.pitchReady()) {
      this.error.set("Complete the pitch, reporting date, initial prediction, and opposing challenge.");
      return;
    }
    if (this.state().pitch.status === "submitted" || this.state().pitch.status === "approved")
      return;
    await this.authorized("pitch.submit", false, () => this.commit("pitch.submitted", (state) => __spreadProps(__spreadValues({}, state), {
      pitch: __spreadProps(__spreadValues({}, state.pitch), { status: "submitted" }),
      pitchHistory: [
        ...state.pitchHistory ?? [],
        { pitch: structuredClone(state.pitch), timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      ]
    })));
    if (!this.error())
      this.notification.set(this.isDemo ? "Demo pitch submitted. Switch to Demo producer to review it." : "Pitch submitted for producer review.");
  }
  async reviewPitch(decision, feedback) {
    if (this.state().pitch.status !== "submitted")
      return;
    if (decision === "revise" && feedback.trim().length < 8) {
      this.error.set("Explain what the reporter should revise.");
      return;
    }
    await this.authorized("pitch.review", true, () => this.commit("pitch.reviewed", (state) => __spreadProps(__spreadValues({}, state), {
      sideLocked: decision === "approved",
      pitch: __spreadProps(__spreadValues({}, state.pitch), { status: decision, feedback }),
      reviewHistory: [
        ...state.reviewHistory ?? [],
        { target: "pitch", decision, feedback, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      ]
    }), "teacher"), { decision, feedback });
  }
  async reopenPitch() {
    await this.authorized("pitch.reopen", true, () => this.commit("pitch.reopened", (state) => __spreadProps(__spreadValues({}, state), {
      sideLocked: false,
      pitch: __spreadProps(__spreadValues({}, state.pitch), { status: "revise" }),
      studentSegmentReady: false,
      packageStatus: "draft"
    }), "teacher"));
  }
  selectSource(sourceId) {
    this.commit("source.opened", (state) => __spreadProps(__spreadValues({}, state), { selectedSourceId: sourceId }), "student", {
      sourceId
    }, false);
  }
  closeSource() {
    this.commit("source.closed", (state) => __spreadProps(__spreadValues({}, state), { selectedSourceId: void 0 }), "student", void 0, false);
  }
  toggleSource(sourceId) {
    if (!this.config.sources.some((source) => source.id === sourceId))
      return;
    const saved = this.state().savedSourceIds.includes(sourceId);
    this.commit(saved ? "source.removed" : "source.saved", (state) => __spreadProps(__spreadValues({}, state), {
      savedSourceIds: saved ? state.savedSourceIds.filter((id) => id !== sourceId) : [...state.savedSourceIds, sourceId]
    }), "student", { sourceId });
    this.notification.set(saved ? "Source removed from your story." : "Source pinned to your story.");
  }
  updateClaimDraft(draft) {
    this.commit("claim.draftChanged", (state) => __spreadProps(__spreadValues({}, state), { claimDraft: draft }), "student", void 0, false);
  }
  addClaim(text3, status, evidence2 = [], reasoning = "", uncertainty = "") {
    if (text3.trim().length < 12 || reasoning.trim().length < 12 || !evidence2.some((link) => link.relationship === "supports") || evidence2.some((link) => link.passage.trim().length < 8 || !this.state().savedSourceIds.includes(link.sourceId))) {
      this.error.set("Write a complete claim, select a supporting passage, and explain your reasoning.");
      return;
    }
    if (["uncertain", "disputed", "partially-supported"].includes(status) && uncertainty.trim().length < 12) {
      this.error.set("Explain the limits or uncertainty viewers need to hear.");
      return;
    }
    const id = crypto.randomUUID();
    this.commit("claim.created", (state) => __spreadProps(__spreadValues({}, state), {
      claimDraft: void 0,
      claims: [
        ...state.claims,
        {
          id,
          text: text3.trim(),
          status,
          evidence: evidence2,
          reasoning,
          uncertainty,
          supportingSourceIds: evidence2.filter((link) => link.relationship === "supports").map((link) => link.sourceId)
        }
      ]
    }), "student", { claimId: id });
    this.error.set(void 0);
    this.notification.set("Claim and specific evidence added.");
  }
  removeClaim(claimId) {
    this.commit("claim.removed", (state) => __spreadProps(__spreadValues({}, state), {
      claims: state.claims.filter((claim) => claim.id !== claimId)
    }), "student", { claimId });
  }
  updateScriptBlock(blockId, text3) {
    this.commit("script.draftChanged", (state) => __spreadProps(__spreadValues({}, state), {
      scriptBlocks: state.scriptBlocks.map((block) => block.id === blockId ? __spreadProps(__spreadValues({}, block), { text: text3 }) : block)
    }), "student", void 0, false);
  }
  setScriptBlockType(blockId, type) {
    this.commit("script.blockTypeChanged", (state) => __spreadProps(__spreadValues({}, state), {
      scriptBlocks: state.scriptBlocks.map((block) => block.id === blockId ? __spreadProps(__spreadValues({}, block), { type }) : block)
    }), "student", void 0, false);
  }
  addScriptBlock(type) {
    this.commit("script.blockAdded", (state) => __spreadProps(__spreadValues({}, state), {
      scriptBlocks: [
        ...state.scriptBlocks,
        { id: `script-${state.revision + 1}`, type, text: "" }
      ]
    }), "student", { type });
  }
  removeScriptBlock(blockId) {
    if (this.state().scriptBlocks.length <= 1)
      return;
    this.commit("script.blockRemoved", (state) => __spreadProps(__spreadValues({}, state), {
      scriptBlocks: state.scriptBlocks.filter((block) => block.id !== blockId)
    }), "student", { blockId });
  }
  updateScene(sceneId, field, value) {
    this.commit("production.sceneChanged", (state) => __spreadProps(__spreadValues({}, state), {
      visualSequence: state.visualSequence.map((scene) => scene.id === sceneId ? __spreadProps(__spreadValues({}, scene), { [field]: value }) : scene)
    }), "student", void 0, false);
  }
  linkScriptClaim(blockId, claimId) {
    this.commit("script.claimLinked", (state) => __spreadProps(__spreadValues({}, state), {
      scriptBlocks: state.scriptBlocks.map((block) => block.id === blockId ? __spreadProps(__spreadValues({}, block), { claimId: claimId || void 0 }) : block)
    }));
  }
  async markReadyToAir() {
    const issues = this.readiness();
    if (issues.length) {
      this.error.set(issues.join(" "));
      return;
    }
    if (this.recordingState() === "recording" || this.recordingState() === "requesting") {
      this.error.set("Finish saving your recording before submitting.");
      return;
    }
    if (this.state().recordingAssetId && !this.recordingUrl()) {
      this.error.set("Restore the missing recording before submitting.");
      return;
    }
    if (this.state().recordingAssetId && (this.state().transcript?.trim().length ?? 0) < 20) {
      this.error.set("Add an accurate transcript for the recording.");
      return;
    }
    if (this.state().packageStatus === "submitted" || this.state().packageStatus === "approved")
      return;
    await this.authorized("package.submit", false, () => this.commit("package.submitted", (state) => __spreadProps(__spreadValues({}, state), {
      packageStatus: "submitted",
      stage: "broadcast"
    })));
    if (!this.error())
      this.notification.set(this.isDemo ? "Demo package submitted. Switch to Demo producer to review it." : "Package submitted for producer clearance.");
  }
  async reviewPackage(decision, feedback) {
    if (this.state().packageStatus !== "submitted")
      return;
    if (decision === "approved" && this.readiness().length) {
      this.error.set(this.readiness().join(" "));
      return;
    }
    if (decision === "revise" && feedback.trim().length < 8) {
      this.error.set("Explain what needs revision.");
      return;
    }
    await this.authorized("package.review", true, () => this.commit("package.reviewed", (state) => {
      const network = this.selectedNetwork();
      const script = structuredClone(state.scriptBlocks);
      const segment = {
        id: this.currentStudentSegmentId,
        reporter: this.viewer.studentDisplayName,
        side: network.side,
        networkName: network.name,
        headline: state.pitch.headline,
        desk: this.beatLabel(state.pitch.beatId),
        durationSeconds: Math.max(1, Math.round(script.map((block) => block.text).join(" ").split(/\s+/).length / 130 * 60)),
        startLabel: "",
        ready: true,
        visualLabel: this.savedSources()[0]?.title ?? "",
        script,
        scenes: structuredClone(state.visualSequence),
        recordingAssetId: state.recordingAssetId,
        transcript: state.transcript || script.map((block) => block.text).join("\n")
      };
      return __spreadProps(__spreadValues({}, state), {
        packageStatus: decision,
        packageFeedback: feedback,
        studentSegmentReady: decision === "approved",
        schedule: this.timedSchedule(interleaveBroadcastSegments([
          ...state.schedule.filter((item) => item.id !== segment.id),
          ...decision === "approved" ? [segment] : []
        ])),
        reviewHistory: [
          ...state.reviewHistory ?? [],
          { target: "package", decision, feedback, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
        ]
      });
    }, "teacher"), { decision, feedback });
  }
  timedSchedule(schedule) {
    let seconds = (this.config.broadcastStartMinutes ?? 13 * 60 + 15) * 60;
    return schedule.map((segment) => {
      const hours = Math.floor(seconds / 3600) % 24;
      const minutes = Math.floor(seconds / 60) % 60;
      const result = __spreadProps(__spreadValues({}, segment), {
        startLabel: `${hours % 12 || 12}:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`
      });
      seconds += segment.durationSeconds;
      return result;
    });
  }
  inquiryState = computed(
    () => this.state().inquiry ?? emptyInquiryState(),
    ...ngDevMode ? [{ debugName: "inquiryState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inquiryGate(id) {
    return !!this.config.inquiry && inquiryGateReady(this.config.inquiry, this.inquiryState(), id);
  }
  updateInquiryDraft(key, value) {
    if (!this.config.inquiry || !this.isDemo || this.inquiryState().drafts[key] === value)
      return;
    this.commit("inquiry.draftChanged", (state) => __spreadProps(__spreadValues({}, state), { inquiry: __spreadProps(__spreadValues({}, this.inquiryState()), {
      drafts: __spreadProps(__spreadValues({}, this.inquiryState().drafts), { [key]: value })
    }) }), "student", void 0, false);
  }
  submitInquiryAttempt(lesson, prompt, response, targetId) {
    const def = this.config.inquiry?.lessons.find((l) => l.number === lesson);
    if (!this.isDemo || this.busy() || !def || !prompt.trim() || !response.trim() || def.requiresGate && !this.inquiryGate(def.requiresGate))
      return false;
    if (targetId && !this.config.inquiry?.targets.some((t) => t.id === targetId))
      return false;
    if (!targetId && def.fields.some((f) => !this.inquiryState().drafts[`lesson-${lesson}-${f.id}`]?.trim())) {
      this.error.set("Save each part of today\u2019s work before sending your independent check for review.");
      return false;
    }
    const attempt = { id: crypto.randomUUID(), lesson, prompt, response: response.trim(), mode: "independent", targetId, createdAt: (/* @__PURE__ */ new Date()).toISOString(), evidenceDrafts: __spreadValues({}, this.inquiryState().drafts) };
    this.error.set(void 0);
    this.commit("inquiry.attemptSubmitted", (state) => __spreadProps(__spreadValues({}, state), { inquiry: __spreadProps(__spreadValues({}, this.inquiryState()), {
      attempts: [...this.inquiryState().attempts, attempt]
    }) }));
    return true;
  }
  reviewInquiryAttempt(id, decision, feedback, performanceEvidence) {
    const attempt = this.inquiryState().attempts.find((a) => a.id === id);
    if (!this.isDemo || !this.canProduce() || !attempt || !feedback.trim())
      return;
    const target = this.config.inquiry?.targets.find((t) => t.id === attempt.targetId);
    if (decision === "ready" && target?.requiresPerformanceEvidence && !performanceEvidence?.trim()) {
      this.error.set("Record observed speaking or listening evidence before reviewing this target as ready.");
      return;
    }
    const review = { attemptId: id, decision, feedback: feedback.trim(), performanceEvidence: performanceEvidence?.trim(), reviewerId: this.viewer.teacherDisplayName, createdAt: (/* @__PURE__ */ new Date()).toISOString(), authority: "demo" };
    this.error.set(void 0);
    this.commit("inquiry.reviewed", (state) => __spreadProps(__spreadValues({}, state), { inquiry: __spreadProps(__spreadValues({}, this.inquiryState()), {
      reviews: __spreadProps(__spreadValues({}, this.inquiryState().reviews), { [id]: review }),
      reviewHistory: [...this.inquiryState().reviewHistory ?? [], review]
    }) }), "teacher");
  }
  canRecordInquiry() {
    const studio = this.config.fieldStudio;
    if (studio && (!this.isDemo || !this.inquiryGate(studio.recordingGateId))) {
      this.error.set("Complete the individual source-supported report checkpoint before recording.");
      return false;
    }
    return true;
  }
  prepareInquirySegment() {
    const studio = this.config.fieldStudio;
    const drafts = this.inquiryState().drafts;
    const visual = this.config.sources.find((s) => s.id === drafts["studio-visual"]);
    if (!studio || !this.isDemo || this.busy() || !this.inquiryGate(studio.finalGateId)) {
      this.error.set("The final individual checkpoint needs teacher review first.");
      return false;
    }
    if (!this.state().transcript?.trim() || !drafts["studio-headline"]?.trim() || !drafts["studio-media-reason"]?.trim() || !visual || !studio.visualSourceIds.includes(visual.id)) {
      this.error.set("Add a headline, transcript, and credited visual with an explanation of its purpose.");
      return false;
    }
    if (!this.state().recordingAssetId && !drafts["studio-performance"]?.trim()) {
      this.error.set("Add a recording or describe the planned live presentation or teacher-approved equivalent. A script alone does not demonstrate speaking.");
      return false;
    }
    this.flushDrafts();
    if (this.saveState() === "error")
      return false;
    const network = this.config.networks.find((n) => n.side === studio.networkSide);
    const transcript = this.state().transcript;
    const segment = {
      id: this.currentStudentSegmentId,
      reporter: this.viewer.studentDisplayName,
      side: network.side,
      networkName: network.name,
      headline: drafts["studio-headline"],
      desk: network.deskLabel,
      durationSeconds: Math.max(1, Math.round(transcript.trim().split(/\s+/).length / 130 * 60)),
      startLabel: "My section \xB7 estimated time",
      ready: true,
      visualLabel: visual.title,
      transcript,
      recordingAssetId: this.state().recordingAssetId,
      script: [{ id: "field-report", type: "VOICEOVER", text: transcript, sourceId: visual.id }],
      scenes: [{ id: "field-visual", camera: "media-wall", mediaType: visual.imageUrl ? "historical-map" : "quote", label: visual.title, sourceId: visual.id, caption: visual.citation }]
    };
    const previous = this.state().schedule.find((s) => s.id === segment.id);
    if (previous && JSON.stringify(previous) === JSON.stringify(segment))
      return true;
    this.error.set(void 0);
    this.commit("inquiry.segmentPrepared", (state) => __spreadProps(__spreadValues({}, state), { studentSegmentReady: true, schedule: [...state.schedule.filter((s) => s.id !== segment.id), segment] }));
    this.notification.set(this.saveState() === "error" ? "Preview is on this page but could not be saved. Download a backup." : "Your section is prepared on this device. Present with your team in class; no school submission or standard completion was recorded.");
    return this.saveState() !== "error";
  }
  updateTranscript(text3) {
    this.commit("transcript.draftChanged", (state) => __spreadProps(__spreadValues({}, state), { transcript: text3 }), "student", void 0, false);
  }
  updateReflection(text3) {
    this.commit("reflection.draftChanged", (state) => __spreadProps(__spreadValues({}, state), { reflection: text3 }), "student", void 0, false);
  }
  saveReflection() {
    const text3 = this.state().reflection?.trim() ?? "";
    if (text3.length < 30) {
      this.error.set("Explain which claim changed and identify the evidence that changed it.");
      return;
    }
    if (this.state().reflectionHistory?.at(-1)?.text === text3)
      return;
    this.commit("reflection.revised", (state) => __spreadProps(__spreadValues({}, state), {
      reflectionHistory: [
        ...state.reflectionHistory ?? [],
        { text: text3, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      ]
    }));
    this.error.set(void 0);
    this.notification.set("Reflection revision saved.");
  }
  exportWork() {
    this.flushDrafts();
    const blob = new Blob([
      JSON.stringify({
        projectId: this.config.projectId,
        projectVersion: this.config.projectVersion,
        state: this.state()
      }, null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "history-live-work.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  async moveSegment(index, direction) {
    const target = index + direction;
    const schedule = [...this.state().schedule];
    if (!Number.isInteger(index) || index < 0 || index >= schedule.length || target < 0 || target >= schedule.length)
      return;
    [schedule[index], schedule[target]] = [schedule[target], schedule[index]];
    await this.authorized("schedule.reorder", true, () => this.commit("schedule.reordered", (state) => __spreadProps(__spreadValues({}, state), { schedule: this.timedSchedule(schedule) }), "teacher", {
      index,
      target
    }), { index, target });
  }
  async startShow() {
    if (!this.state().schedule.length || this.state().schedule.some((item) => !item.ready)) {
      this.error.set("Clear every scheduled package before starting the show.");
      return;
    }
    await this.authorized("broadcast.start", true, () => this.commit("broadcast.started", (state) => __spreadProps(__spreadValues({}, state), {
      showStatus: "live",
      activeSegmentIndex: 0,
      stage: "showcase"
    }), "teacher"));
  }
  async holdShow() {
    await this.authorized("broadcast.hold", true, () => this.commit("broadcast.held", (state) => __spreadProps(__spreadValues({}, state), {
      showStatus: state.showStatus === "held" ? "live" : "held"
    }), "teacher"));
  }
  async nextSegment() {
    if (!this.state().schedule.length)
      return;
    await this.authorized("broadcast.next", true, () => this.commit("broadcast.nextTaken", (state) => __spreadProps(__spreadValues({}, state), {
      activeSegmentIndex: Math.min(state.activeSegmentIndex + 1, state.schedule.length - 1),
      showStatus: "live"
    }), "teacher"));
  }
  async previousSegment() {
    await this.authorized("broadcast.previous", true, () => this.commit("broadcast.previousTaken", (state) => __spreadProps(__spreadValues({}, state), {
      activeSegmentIndex: Math.max(state.activeSegmentIndex - 1, 0),
      showStatus: "live"
    }), "teacher"));
  }
  async endShow() {
    await this.authorized("broadcast.end", true, () => this.commit("broadcast.ended", (state) => __spreadProps(__spreadValues({}, state), { showStatus: "ended" }), "teacher"));
  }
  react(reaction) {
    reaction = `${this.activeSegment()?.id ?? "preview"}:${reaction}`;
    this.commit("audience.reacted", (state) => __spreadProps(__spreadValues({}, state), {
      audienceReactions: __spreadProps(__spreadValues({}, state.audienceReactions), {
        [reaction]: (state.audienceReactions[reaction] ?? 0) + 1
      })
    }), "student", { reaction });
    this.notification.set(`${reaction} reaction sent.`);
  }
  async startRecording(kind = "video") {
    if (!this.canRecordInquiry())
      return;
    if (this.recordingState() === "recording" || this.recordingState() === "requesting")
      return;
    if (!this.media || typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      this.error.set("RECORDING_UNAVAILABLE: Use a script-based package or upload a recording.");
      return;
    }
    const generation = ++this.recordingGeneration;
    this.recordingState.set("requesting");
    this.error.set(void 0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: kind === "video", audio: true });
      if (this.disposed || generation !== this.recordingGeneration) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.mediaStream = stream;
      this.mediaChunks = [];
      const recorder = new MediaRecorder(stream);
      this.mediaRecorder = recorder;
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size)
          this.mediaChunks.push(event.data);
      });
      recorder.addEventListener("error", () => {
        this.stopMediaTracks();
        this.recordingState.set("idle");
        this.error.set("RECORDING_FAILED: Try another recording or upload.");
      });
      recorder.addEventListener("stop", () => {
        const blob = new Blob(this.mediaChunks, {
          type: recorder.mimeType || this.mediaChunks[0]?.type || "video/webm"
        });
        this.stopMediaTracks();
        if (this.disposed || generation !== this.recordingGeneration)
          return;
        void this.storeRecording(blob);
      });
      recorder.start(1e3);
      this.recordingState.set("recording");
    } catch {
      this.stopMediaTracks();
      this.recordingState.set("idle");
      this.error.set("Camera or microphone unavailable. Upload a recording or continue with a script-based package.");
    }
  }
  stopRecording() {
    if (this.mediaRecorder?.state === "recording")
      this.mediaRecorder.stop();
    else if (this.recordingState() === "requesting") {
      this.recordingGeneration += 1;
      this.stopMediaTracks();
      this.recordingState.set(this.recordingUrl() ? "ready" : "idle");
    }
  }
  async storeRecording(blob) {
    if (!this.canRecordInquiry()) {
      this.stopMediaTracks();
      this.recordingState.set("idle");
      return;
    }
    if (this.config.fieldStudio && (!/^(audio|video)\//.test(blob.type) || blob.size === 0 || blob.size > 100 * 1024 * 1024)) {
      this.error.set("Choose a nonempty audio or video file smaller than 100 MB.");
      return;
    }
    if (!this.media) {
      this.error.set("CAPABILITY_NOT_INSTALLED: Media storage is unavailable.");
      return;
    }
    const generation = this.recordingGeneration;
    this.recordingState.set("requesting");
    try {
      const asset = await this.media.upload({
        file: blob,
        fileName: "report-recording",
        contentType: blob.type,
        metadata: {
          tenantId: this.viewer.tenantId,
          classId: this.viewer.classId,
          studentId: this.viewer.studentId,
          projectId: this.config.projectId,
          projectVersion: this.config.projectVersion
        }
      });
      if (this.disposed || generation !== this.recordingGeneration)
        return;
      this.commit("recording.saved", (state) => __spreadProps(__spreadValues({}, state), { recordingAssetId: asset.id }));
      await this.restoreRecording(asset.id);
      this.notification.set(this.saveState() === "error" ? "Recording exists on this page, but its workspace reference could not be saved. Download the recording before leaving." : this.isDemo ? "Recording saved on this device. Download a backup before clearing browser data." : "Recording uploaded. Add an accurate transcript before submitting.");
    } catch (error) {
      this.recordingState.set("idle");
      this.error.set(error instanceof Error ? error.message : "MEDIA_SAVE_FAILED");
    }
  }
  async restoreRecording(assetId) {
    if (!this.media)
      return;
    try {
      const asset = await this.media.getReference(assetId);
      if (this.disposed) {
        if (asset.reference.startsWith("blob:"))
          URL.revokeObjectURL(asset.reference);
        return;
      }
      const previous = this.recordingUrl();
      if (previous?.startsWith("blob:"))
        URL.revokeObjectURL(previous);
      this.recordingUrl.set(asset.reference);
      this.recordingState.set("ready");
    } catch {
      this.error.set("ASSET_NOT_FOUND: The saved recording could not be loaded. Upload it again before submitting.");
    }
  }
  clearNotice() {
    this.notification.set(void 0);
    this.error.set(void 0);
  }
  resetDemo() {
    if (!this.isDemo || !this.canProduce()) {
      this.error.set("PERMISSION_DENIED");
      return;
    }
    if (this.saveTimer)
      clearTimeout(this.saveTimer);
    this.recordingGeneration++;
    this.stopMediaTracks();
    const url = this.recordingUrl();
    if (url !== void 0)
      URL.revokeObjectURL(url);
    this.recordingUrl.set(void 0);
    this.recordingState.set("idle");
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    this.state.set(createInitialHistoryLiveState(this.config, this.runtimeScope));
    this.loadError = void 0;
    this.saveState.set("saved");
    this.error.set(void 0);
    this.notification.set("History Live demo reset.");
  }
  networkName(side) {
    return this.config.networks.find((network) => network.side === side)?.name ?? "History Live";
  }
  beatLabel(beatId) {
    return this.config.beats.find((beat) => beat.id === beatId)?.label ?? "Assignment Desk";
  }
  stopMediaTracks() {
    if (this.mediaRecorder?.state === "recording")
      this.mediaRecorder.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = void 0;
    this.mediaRecorder = void 0;
  }
  dispatchReporting(action) {
    if (this.configurationErrors.length) {
      this.error.set(this.configurationErrors.join(" \xB7 "));
      return;
    }
    try {
      const reporting = reduceReporting(this.state().reporting ?? EMPTY_REPORTING, action, this.config);
      const draft = ["reporting.noteDraftChanged", "reporting.boardChanged", "reporting.presentationChanged"].includes(action.type);
      this.error.set(void 0);
      this.commit(action.type, (state) => __spreadProps(__spreadValues({}, state), { reporting }), "student", { storyId: reporting.activeStoryId }, !draft);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : "REPORTING_ACTION_FAILED");
    }
  }
  async configureReportingFormats(formats2) {
    if (!this.config.reporting || !formats2.length || new Set(formats2).size !== formats2.length || formats2.some((format2) => !this.config.reporting.allowedFormats.includes(format2))) {
      this.error.set("Select at least one configured presentation format.");
      return;
    }
    await this.authorized("reporting.configureFormats", true, () => {
      this.commit("reporting.formatsConfigured", (state) => {
        const reporting = state.reporting ?? EMPTY_REPORTING;
        const active = reporting.workspaces.find((work) => work.storyId === reporting.activeStoryId);
        return __spreadProps(__spreadValues({}, state), { reporting: __spreadProps(__spreadValues({}, reporting), { allowedFormats: [...formats2], step: reporting.step === "create" && active?.format && !formats2.includes(active.format) ? "format" : reporting.step }) });
      }, "teacher", { formats: formats2 });
    }, { formats: formats2 });
  }
  commit(eventType, reducer, actorType = "student", payload, persist = true) {
    if (!historyLiveEvents.has(eventType)) {
      this.error.set("EVENT_NOT_REGISTERED");
      return;
    }
    if (this.busy()) {
      this.error.set("Wait for the current submission or review to finish.");
      return;
    }
    const current = this.state();
    const reduced = reducer(current);
    const draft = !persist;
    const affectsPackage = /^(pitch\.(draft|format)|source\.(saved|removed)|claim\.(created|removed)|script\.|inquiry\.(draftChanged|attemptSubmitted|reviewed)|production\.|recording\.saved|transcript\.)/.test(eventType);
    const invalidate = affectsPackage && (current.packageStatus === "approved" || current.packageStatus === "submitted" || !!this.config.fieldStudio && current.studentSegmentReady);
    const next = __spreadProps(__spreadValues(__spreadValues({}, reduced), invalidate ? {
      packageStatus: "draft",
      studentSegmentReady: false,
      schedule: reduced.schedule.filter((segment) => segment.id !== this.currentStudentSegmentId)
    } : {}), {
      activeSegmentIndex: Math.min(reduced.activeSegmentIndex, Math.max(0, (invalidate ? reduced.schedule.filter((segment) => segment.id !== this.currentStudentSegmentId) : reduced.schedule).length - 1)),
      revision: current.revision + 1,
      eventHistory: draft ? current.eventHistory : [...current.eventHistory.slice(-99), this.event(eventType, actorType, payload)]
    });
    this.state.set(next);
    if (this.saveTimer)
      clearTimeout(this.saveTimer);
    if (persist)
      this.save(next);
    else {
      this.saveState.set("unsaved");
      this.saveTimer = setTimeout(() => this.flushDrafts(), 700);
    }
  }
  async authorized(commandType, producer, apply, params = {}) {
    if (this.busy())
      return;
    const command = historyLiveCommands.get(commandType);
    if (!command || command.producerOnly !== producer) {
      this.error.set("COMMAND_NOT_REGISTERED");
      return;
    }
    if (command.producerOnly && !this.canProduce()) {
      this.error.set("PERMISSION_DENIED: Only the producer can perform this action.");
      return;
    }
    this.flushDrafts();
    if (this.saveState() === "error")
      return;
    this.error.set(void 0);
    if (this.isDemo) {
      apply();
      return;
    }
    if (!this.authority) {
      this.error.set("CAPABILITY_NOT_INSTALLED: Authenticated classroom review is not connected. No approval or submission was recorded.");
      return;
    }
    this.busy.set(true);
    try {
      const state = this.state();
      const result = await this.authority.execute({
        attemptId: `${this.config.projectId}@${this.config.projectVersion}`,
        scope: {
          tenantId: this.viewer.tenantId,
          projectId: this.config.projectId,
          projectVersion: this.config.projectVersion,
          classId: this.viewer.classId,
          studentId: this.viewer.studentId,
          scopeType: "student"
        },
        command: {
          commandType: `history-live.${commandType}`,
          params: __spreadProps(__spreadValues({}, params), { snapshot: state })
        },
        idempotencyKey: `history-live:${this.viewer.studentId}:${commandType}:${state.revision}`,
        expectedVersions: { workspace: state.revision }
      });
      if (result.status !== "accepted") {
        this.error.set(`SUBMISSION_${result.status.toUpperCase()}: No change confirmed. Retry after reviewing the classroom connection.`);
        return;
      }
      this.busy.set(false);
      apply();
    } catch {
      this.error.set("AUTHORITY_UNAVAILABLE: Nothing was confirmed. Retry to reconcile this request.");
    } finally {
      this.busy.set(false);
    }
  }
  event(eventType, actorType, payload) {
    this.eventSequence += 1;
    const clientEventId = `history-live-${Date.now()}-${this.eventSequence}`;
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      projectId: this.config.projectId,
      projectVersion: this.config.projectVersion,
      tenantId: this.viewer.tenantId,
      classId: this.viewer.classId,
      actor: {
        type: actorType,
        id: actorType === "teacher" ? this.viewer.teacherDisplayName : this.viewer.studentId
      },
      payload
    };
  }
  save(state) {
    this.saveState.set("saving");
    try {
      if (this.loadError)
        throw new Error(this.loadError);
      this.persistence.save(this.config.projectId, this.config.projectVersion, state);
      this.saveState.set("saved");
    } catch (error) {
      this.saveState.set("error");
      this.error.set(error instanceof Error ? error.message : "SAVE_FAILED: Export a backup of your draft.");
    }
  }
  load() {
    try {
      const loaded = this.persistence.load(this.config.projectId, this.config.projectVersion);
      if (!loaded)
        return this.initial;
      const sides = this.config.networks.map((n) => n.side);
      if (loaded.selectedSide && !sides.includes(loaded.selectedSide) || loaded.schedule.some((s) => !sides.includes(s.side)))
        throw new Error("SAVE_INVALID: Unknown reporting network. Export or restore a valid workspace.");
      return __spreadProps(__spreadValues(__spreadValues({}, this.initial), loaded), {
        runtimeScope: this.runtimeScope,
        role: this.viewer.mode === "demo" ? loaded.role : this.viewer.role
      });
    } catch (error) {
      this.loadError = error instanceof Error ? error.message : "SAVE_UNAVAILABLE";
      return this.initial;
    }
  }
  static \u0275fac = function HistoryLiveRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HistoryLiveRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HistoryLiveRuntimeService, factory: _HistoryLiveRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryLiveRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  researchItems,
  validateHistoryLiveContent,
  HISTORY_LIVE_STAGES,
  createInitialHistoryLiveState,
  pitchMissingRequirements,
  formatBroadcastTime,
  validateHistoryLiveVisualConfig,
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_PERSISTENCE,
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_AUTHORITY,
  HISTORY_LIVE_MEDIA,
  HistoryLiveRuntimeService
};
//# debugId=385cf331-3ccc-5b26-acc5-065fc1b8c627
//# sourceMappingURL=chunk-OU3KDHT5.js.map
