import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE,
  JOURNEY_TUTOR,
  resolveJourneyOutcome
} from "./chunk-Q2RH2RH4.js";
import {
  Injectable,
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

// src/app/templates/journey-replay/persistence/journey-replay.authority.ts
function journeyAuthorityLocator(enrollment, projectId, projectVersion) {
  return {
    tenantId: enrollment.tenantId,
    classId: enrollment.classId,
    classLabel: enrollment.classLabel,
    projectId,
    projectVersion
  };
}

// src/app/templates/journey-replay/core/journey-replay.engine.ts
var EMPTY_DRAFT = {
  responseMode: "text",
  text: "",
  transcript: ""
};
function createInitialJourneyRecord(config, studentId, now = (/* @__PURE__ */ new Date()).toISOString()) {
  const start = locationOrThrow(config, config.map.startLocationId);
  const voyageId = `${config.projectId}-${studentId}`;
  return {
    schemaVersion: "1.0",
    studentId,
    voyageId,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    currentStepIndex: 0,
    responseDraft: EMPTY_DRAFT,
    completedSteps: [],
    route: [
      {
        voyageId,
        pointId: "departure",
        sequence: 0,
        legId: "departure",
        timestamp: now,
        locationId: start.id,
        latitude: start.latitude,
        longitude: start.longitude
      }
    ],
    mastery: [],
    replayTimeline: [],
    resources: Object.fromEntries(
      config.resources.map((resource) => [resource.id, resource.startingValue])
    ),
    completionStatus: "in-progress",
    revision: 0,
    eventHistory: []
  };
}
function selectJourneyChoice(config, record, choiceId) {
  const step = currentStep(config, record);
  if (step === void 0 || !step.choices.some((choice) => choice.id === choiceId)) {
    throw new Error("CHOICE_NOT_AVAILABLE");
  }
  if (record.selectedChoiceId === choiceId) return record;
  const drafts = __spreadValues({}, record.choiceDrafts);
  if (record.selectedChoiceId)
    drafts[`${step.id}:${record.selectedChoiceId}`] = record.responseDraft;
  return __spreadProps(__spreadValues({}, record), {
    selectedChoiceId: choiceId,
    choiceDrafts: drafts,
    responseDraft: drafts[`${step.id}:${choiceId}`] ?? EMPTY_DRAFT
  });
}
function updateJourneyResponseDraft(record, update) {
  return __spreadProps(__spreadValues({}, record), { responseDraft: __spreadValues(__spreadValues({}, record.responseDraft), update) });
}
function completeJourneyStep(config, record, now = (/* @__PURE__ */ new Date()).toISOString()) {
  const step = currentStep(config, record);
  if (step === void 0) throw new Error("JOURNEY_ALREADY_COMPLETE");
  const choice = step.choices.find((candidate) => candidate.id === record.selectedChoiceId);
  if (choice === void 0) throw new Error("CHOICE_REQUIRED");
  assertResponse(config, choice, record.responseDraft);
  const responseId = `response-${step.id}`;
  const sceneId = `scene-${step.id}`;
  const route = appendRoute(config, record, choice, step.id, now);
  const { resources, consequence } = resolveJourneyOutcome(config, record, choice);
  const stepRecord = {
    stepId: step.id,
    choiceId: choice.id,
    evidenceSelected: [
      ...new Set(record.responseDraft.citations?.map((citation) => citation.evidenceId) ?? [])
    ],
    evidenceOffered: [...choice.evidenceIds],
    evidenceViewed: [...record.responseDraft.evidenceViewed ?? []],
    resourceBefore: __spreadValues({}, record.resources),
    resourceAfter: __spreadValues({}, resources),
    responseRevisions: [],
    studentResponse: {
      id: responseId,
      questionText: choice.question,
      responseMode: record.responseDraft.responseMode,
      text: record.responseDraft.text.trim() || void 0,
      transcript: record.responseDraft.transcript.trim() || void 0,
      mediaAssetId: record.responseDraft.mediaAssetId,
      masteryTags: [...step.masteryTags],
      useInReplay: true,
      citations: record.responseDraft.citations ?? [],
      prediction: record.responseDraft.prediction,
      tutorTurns: record.responseDraft.tutorTurns ?? [],
      planningTargetId: record.responseDraft.planningTargetId,
      planningText: record.responseDraft.planningText?.trim() || void 0,
      planningSubmitted: record.responseDraft.planningSubmitted
    },
    consequence,
    masteryResults: step.masteryTags.map((masteryTag) => ({
      masteryTag,
      status: "evidence-collected"
    })),
    sceneId,
    completedAt: now
  };
  const scene = {
    id: sceneId,
    stepId: step.id,
    type: step.sceneType,
    durationSeconds: config.replay.sceneDurationSeconds,
    routePointSequenceEnd: route.at(-1)?.sequence ?? 0,
    title: choice.sceneTitle,
    locationId: config.map.routes.find((item) => item.id === choice.routeId)?.toLocationId ?? route.at(-1)?.locationId ?? step.positionLocationId,
    systemNarration: consequence,
    studentResponseId: responseId,
    evidenceIds: [...choice.evidenceIds],
    masteryHighlights: [...step.masteryTags],
    order: record.replayTimeline.length,
    hidden: false
  };
  const nextIndex = record.currentStepIndex + 1;
  return __spreadProps(__spreadValues({}, record), {
    currentStepIndex: nextIndex,
    selectedChoiceId: void 0,
    responseDraft: EMPTY_DRAFT,
    completedSteps: [...record.completedSteps, stepRecord],
    route,
    mastery: [
      ...record.mastery,
      ...step.masteryTags.map((masteryTag) => ({
        masteryTag,
        stepId: step.id,
        status: "evidence-collected"
      }))
    ],
    replayTimeline: [...record.replayTimeline, scene],
    resources,
    completionStatus: nextIndex >= config.steps.length ? "complete" : "in-progress"
  });
}
function currentStep(config, record) {
  return config.steps[record.currentStepIndex];
}
function selectedChoice(config, record) {
  return currentStep(config, record)?.choices.find(
    (choice) => choice.id === record.selectedChoiceId
  );
}
function routeForScene(record, scene) {
  if (scene === void 0) return record.route.slice(0, 1);
  return record.route.filter((point) => point.sequence <= scene.routePointSequenceEnd);
}
function setReplaySceneHidden(record, sceneId, hidden) {
  if (!record.replayTimeline.some((scene) => scene.id === sceneId)) {
    throw new Error("REPLAY_SCENE_NOT_FOUND");
  }
  return __spreadProps(__spreadValues({}, record), {
    replayTimeline: record.replayTimeline.map(
      (scene) => scene.id === sceneId ? __spreadProps(__spreadValues({}, scene), { hidden }) : scene
    )
  });
}
function detectVoyageIntersections(voyages) {
  const byLocation = /* @__PURE__ */ new Map();
  for (const voyage of voyages) {
    for (const point of voyage.route) {
      if (point.locationId === void 0) continue;
      const existing = byLocation.get(point.locationId) ?? {
        voyageIds: /* @__PURE__ */ new Set(),
        eventLabels: /* @__PURE__ */ new Set()
      };
      existing.voyageIds.add(voyage.voyageId);
      if (point.eventLabel !== void 0) existing.eventLabels.add(point.eventLabel);
      byLocation.set(point.locationId, existing);
    }
  }
  return [...byLocation.entries()].filter(([, entry]) => entry.voyageIds.size > 1).map(([locationId, entry]) => ({
    locationId,
    voyageIds: [...entry.voyageIds],
    eventLabels: [...entry.eventLabels],
    comparisonAvailable: true
  }));
}
function appendRoute(config, record, choice, stepId, now) {
  if (choice.routeId === void 0) return record.route;
  const route = config.map.routes.find((candidate) => candidate.id === choice.routeId);
  if (route === void 0) throw new Error("ROUTE_NOT_FOUND");
  const destination = locationOrThrow(config, route.toLocationId);
  const startSequence = record.route.length;
  return [
    ...record.route,
    ...route.coordinates.slice(1).map((point, index) => ({
      voyageId: record.voyageId,
      pointId: `${stepId}-${index + 1}`,
      sequence: startSequence + index,
      legId: route.id,
      timestamp: now,
      locationId: index === route.coordinates.length - 2 ? destination.id : config.map.locations.find(
        (location) => Math.abs(location.latitude - point.latitude) < 1e-3 && Math.abs(location.longitude - point.longitude) < 1e-3
      )?.id,
      latitude: point.latitude,
      longitude: point.longitude,
      eventId: index === route.coordinates.length - 2 ? `event-${stepId}` : void 0,
      decisionId: choice.id,
      stateSnapshotId: `decision-${stepId}`
    }))
  ];
}
function hasResponse(draft) {
  return isResponseText(draft.text) || isResponseText(draft.transcript) || Boolean(draft.mediaAssetId?.trim());
}
function isResponseText(text) {
  return text.trim().length >= 12 && new Set(text.toLowerCase().replace(/\s/g, "")).size >= 4 && text.trim().split(/\s+/).length >= 3;
}
function assertResponse(config, choice, draft, phase = "planning") {
  if (phase === "planning" && choice.planning) {
    const target = choice.planning.targets.find(
      (candidate) => candidate.id === draft.planningTargetId
    );
    if (!target) throw new Error("PLANNING_TARGET_REQUIRED");
    if (choice.planning.planPrompt && !isResponseText(draft.planningText ?? ""))
      throw new Error("PLANNING_TEXT_REQUIRED");
    if (!draft.planningSubmitted) throw new Error("PLANNING_SUBMISSION_REQUIRED");
  }
  if (!hasResponse(draft)) throw new Error("RESPONSE_REQUIRED");
  if (phase === "planning" && config.learning?.requirePrediction && !isResponseText(draft.prediction ?? ""))
    throw new Error("PREDICTION_REQUIRED");
  const citations = draft.citations ?? [];
  if (config.learning?.requireCitation && citations.length === 0)
    throw new Error("CITATION_REQUIRED");
  for (const citation of citations) {
    const source = config.evidence.find((item) => item.id === citation.evidenceId);
    if (!choice.evidenceIds.includes(citation.evidenceId) || !source?.paragraphs?.some((p) => p.id === citation.paragraphId) || !isResponseText(citation.explanation)) {
      throw new Error("CITATION_INVALID");
    }
  }
}
function reviseJourneyResponse(config, record, stepId, draft, reason, now = (/* @__PURE__ */ new Date()).toISOString()) {
  const completed = record.completedSteps.find((item) => item.stepId === stepId);
  const choice = config.steps.find((item) => item.id === stepId)?.choices.find((item) => item.id === completed?.choiceId);
  if (!completed || !choice) throw new Error("RECORDED_STEP_REQUIRED");
  if (reason.trim().length < 3) throw new Error("REVISION_REASON_REQUIRED");
  assertResponse(config, choice, draft, "revision");
  const response = __spreadProps(__spreadValues({}, completed.studentResponse), {
    responseMode: draft.responseMode,
    text: draft.text.trim() || void 0,
    transcript: draft.transcript.trim() || void 0,
    mediaAssetId: draft.mediaAssetId,
    citations: draft.citations ?? [],
    prediction: draft.prediction,
    tutorTurns: draft.tutorTurns ?? [],
    planningTargetId: draft.planningTargetId,
    planningText: draft.planningText?.trim() || void 0,
    planningSubmitted: draft.planningSubmitted
  });
  return __spreadProps(__spreadValues({}, record), {
    completedSteps: record.completedSteps.map(
      (item) => item.stepId !== stepId ? item : __spreadProps(__spreadValues({}, item), {
        studentResponse: response,
        evidenceSelected: [...new Set(response.citations?.map((c) => c.evidenceId) ?? [])],
        responseRevisions: [
          ...item.responseRevisions ?? [],
          { response: item.studentResponse, revisedAt: now, reason: reason.trim() }
        ]
      })
    )
  });
}
function locationOrThrow(config, locationId) {
  const location = config.map.locations.find((candidate) => candidate.id === locationId);
  if (location === void 0) throw new Error("LOCATION_NOT_FOUND");
  return location;
}

// src/app/templates/journey-replay/core/journey-record-validation.ts
function object(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function string(value, max = 2e4) {
  return typeof value === "string" && value.length <= max;
}
function fail() {
  throw new Error("INVALID_JOURNEY_RECORD");
}
function isJourneyDraft(value) {
  if (!object(value) || !["text", "audio"].includes(String(value["responseMode"])) || !string(value["text"]) || !string(value["transcript"]))
    return false;
  if (value["mediaAssetId"] !== void 0 && (!string(value["mediaAssetId"], 180) || !/^[a-zA-Z0-9:_-]+$/.test(value["mediaAssetId"])))
    return false;
  if (value["prediction"] !== void 0 && !string(value["prediction"])) return false;
  if (value["planningTargetId"] !== void 0 && !string(value["planningTargetId"], 120))
    return false;
  if (value["planningText"] !== void 0 && !string(value["planningText"])) return false;
  if (value["planningSubmitted"] !== void 0 && typeof value["planningSubmitted"] !== "boolean")
    return false;
  if (value["citations"] !== void 0 && (!Array.isArray(value["citations"]) || value["citations"].length > 20 || !value["citations"].every(
    (c) => object(c) && string(c["evidenceId"], 120) && string(c["paragraphId"], 120) && string(c["explanation"])
  )))
    return false;
  if (value["evidenceViewed"] !== void 0 && (!Array.isArray(value["evidenceViewed"]) || !value["evidenceViewed"].every((id) => string(id, 120))))
    return false;
  if (value["tutorTurns"] !== void 0 && (!Array.isArray(value["tutorTurns"]) || value["tutorTurns"].length > 20 || !value["tutorTurns"].every(
    (t) => object(t) && [
      "id",
      "stepId",
      "choiceId",
      "criterionId",
      "responseFingerprint",
      "question",
      "createdAt"
    ].every((k) => string(t[k])) && ["scaffold", "tutor"].includes(String(t["source"])) && (t["answer"] === void 0 || string(t["answer"])) && (t["explanation"] === void 0 || string(t["explanation"]))
  )))
    return false;
  return true;
}
function responseDraft(response) {
  const draft = __spreadProps(__spreadValues({}, response), {
    text: response["text"] ?? "",
    transcript: response["transcript"] ?? ""
  });
  if (!isJourneyDraft(draft)) fail();
  return draft;
}
function validateJourneyRecord(config, value, previous) {
  if (!object(value) || JSON.stringify(value).length > 2e6 || value["schemaVersion"] !== "1.0" || value["projectId"] !== config.projectId || value["projectVersion"] !== config.projectVersion || !string(value["studentId"], 180) || !string(value["voyageId"], 250) || !Number.isInteger(value["revision"]) || Number(value["revision"]) < 0 || !isJourneyDraft(value["responseDraft"]))
    fail();
  if (!Array.isArray(value["completedSteps"]) || value["completedSteps"].length > config.steps.length || !Array.isArray(value["route"]) || !Array.isArray(value["replayTimeline"]) || !Array.isArray(value["mastery"]) || !Array.isArray(value["eventHistory"]) || value["eventHistory"].length > 100 || !object(value["resources"]))
    fail();
  if (value["currentStepIndex"] !== value["completedSteps"].length || value["completionStatus"] !== (value["completedSteps"].length === config.steps.length ? "complete" : "in-progress"))
    fail();
  if (value["selectedChoiceId"] !== void 0 && !config.steps[value["completedSteps"].length]?.choices.some(
    (c) => c.id === value["selectedChoiceId"]
  ))
    fail();
  if (value["choiceDrafts"] !== void 0 && (!object(value["choiceDrafts"]) || Object.entries(value["choiceDrafts"]).some(
    ([key, draft]) => !config.steps.some((s) => s.choices.some((c) => `${s.id}:${c.id}` === key)) || !isJourneyDraft(draft)
  )))
    fail();
  let canonical = createInitialJourneyRecord(config, value["studentId"]);
  for (const [index, completed] of value["completedSteps"].entries()) {
    const definition = config.steps[index];
    if (!object(completed) || completed["stepId"] !== definition.id || !string(completed["choiceId"], 120) || !object(completed["studentResponse"]) || !string(completed["completedAt"], 80) || !Number.isFinite(Date.parse(completed["completedAt"])))
      fail();
    const choice = definition.choices.find((c) => c.id === completed["choiceId"]);
    if (!choice || completed["studentResponse"]["questionText"] !== choice.question) fail();
    const draft = responseDraft(completed["studentResponse"]);
    if (draft.tutorTurns?.some(
      (t) => t.stepId !== definition.id || t.choiceId !== choice.id || !config.learning?.criteria.some((c) => c.id === t.criterionId)
    ))
      fail();
    if (completed["responseRevisions"] !== void 0 && (!Array.isArray(completed["responseRevisions"]) || completed["responseRevisions"].length > 100 || !completed["responseRevisions"].every(
      (r) => object(r) && object(r["response"]) && isJourneyDraft(__spreadProps(__spreadValues({}, r["response"]), {
        text: r["response"]["text"] ?? "",
        transcript: r["response"]["transcript"] ?? ""
      })) && string(r["reason"]) && string(r["revisedAt"])
    )))
      fail();
    const prior = previous?.completedSteps[index];
    if (prior) {
      if (prior.choiceId !== choice.id) throw new Error("RECORDED_CHOICE_IMMUTABLE");
      if (JSON.stringify(prior.studentResponse) !== JSON.stringify(completed["studentResponse"]) && !completed["responseRevisions"]?.some(
        (r) => JSON.stringify(r.response) === JSON.stringify(prior.studentResponse)
      ))
        throw new Error("RESPONSE_HISTORY_REQUIRED");
    }
    canonical = completeJourneyStep(
      config,
      updateJourneyResponseDraft(selectJourneyChoice(config, canonical, choice.id), draft),
      completed["completedAt"]
    );
  }
  if (previous && previous.completedSteps.length > canonical.completedSteps.length)
    throw new Error("RECORDED_HISTORY_REQUIRED");
  if (value["route"].length !== canonical.route.length || value["replayTimeline"].length !== canonical.replayTimeline.length)
    fail();
  value["route"].forEach((point, index) => {
    if (!object(point) || point["latitude"] !== canonical.route[index].latitude || point["longitude"] !== canonical.route[index].longitude || point["sequence"] !== index)
      fail();
  });
  value["replayTimeline"].forEach((scene, index) => {
    if (!object(scene) || scene["id"] !== canonical.replayTimeline[index].id || scene["routePointSequenceEnd"] !== canonical.replayTimeline[index].routePointSequenceEnd || typeof scene["hidden"] !== "boolean")
      fail();
  });
  const record = value;
  return __spreadProps(__spreadValues({}, canonical), {
    revision: record.revision,
    selectedChoiceId: record.selectedChoiceId,
    responseDraft: record.responseDraft,
    choiceDrafts: record.choiceDrafts ?? {},
    eventHistory: record.eventHistory.filter(
      (event) => object(event) && string(event["eventType"]) && string(event["timestamp"]) && object(event["actor"])
    ),
    route: canonical.route.map((point, index) => __spreadProps(__spreadValues({}, point), {
      timestamp: record.route[index].timestamp || point.timestamp
    })),
    completedSteps: canonical.completedSteps.map((step, index) => __spreadProps(__spreadValues({}, step), {
      studentResponse: record.completedSteps[index].studentResponse,
      responseRevisions: record.completedSteps[index].responseRevisions ?? []
    })),
    replayTimeline: canonical.replayTimeline.map((scene, index) => __spreadProps(__spreadValues({}, scene), {
      hidden: config.replay.allowStudentSceneHiding && record.replayTimeline[index].hidden
    }))
  });
}

// src/app/templates/journey-replay/domain/journey-tutor.contracts.ts
function responseFingerprint(draft) {
  return JSON.stringify([draft.text, draft.transcript, draft.mediaAssetId, draft.prediction, draft.citations, draft.tutorTurns?.map((t) => [t.id, t.answer])]);
}

// src/app/templates/journey-replay/runtime/journey-replay-runtime.service.ts
var JourneyReplayRuntimeService = class _JourneyReplayRuntimeService {
  config = inject(JOURNEY_REPLAY_CONFIG);
  enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
  persistence = inject(JOURNEY_REPLAY_PERSISTENCE);
  media = inject(JOURNEY_REPLAY_MEDIA, { optional: true });
  authority = inject(JOURNEY_REPLAY_AUTHORITY, { optional: true });
  tutor = inject(JOURNEY_TUTOR, { optional: true });
  checkpoint = { acknowledgedRevision: 0 };
  syncing = false;
  loadFailure;
  tutorAbort;
  previewSequence = 0;
  reconnect = () => {
    if (this.session())
      void this.retrySave();
    else if (this.enrollment.mode !== "demo")
      void this.initializeAuthority();
  };
  pageHide = () => this.flushDraft();
  eventSequence = 0;
  saveTimer;
  serverRevision = 0;
  state = signal(
    this.load(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = computed(
    () => currentStep(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  choice = computed(
    () => selectedChoice(this.config, this.state()),
    ...ngDevMode ? [{ debugName: "choice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progressPercent = computed(
    () => Math.round(this.state().completedSteps.length / this.config.steps.length * 100),
    ...ngDevMode ? [{ debugName: "progressPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canComplete = computed(
    () => {
      if (!this.ready() || this.mediaBusy() || !this.choice())
        return false;
      try {
        assertResponse(this.config, this.choice(), this.state().responseDraft);
        return true;
      } catch {
        return false;
      }
    },
    ...ngDevMode ? [{ debugName: "canComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = signal(
    this.enrollment.mode === "demo",
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tutorBusy = signal(
    false,
    ...ngDevMode ? [{ debugName: "tutorBusy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tutorAvailable = this.tutor !== null;
  recording = signal(
    false,
    ...ngDevMode ? [{ debugName: "recording" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mediaBusy = computed(
    () => this.recording() || this.mediaState() === "uploading",
    ...ngDevMode ? [{ debugName: "mediaBusy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  conflictRecord = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "conflictRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revisionStepId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "revisionStepId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revisionDraft = signal(
    {
      responseMode: "text",
      text: "",
      transcript: ""
    },
    ...ngDevMode ? [{ debugName: "revisionDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveLabel = computed(
    () => this.saveState() === "error" ? "Not saved \u2014 retry or download a backup" : this.saveState() === "saving" ? "Saving on this device\u2026" : this.authorityState() === "synced" ? "Synced to your class" : this.authorityState() === "conflict" ? "Two saved copies need review" : "Saved on this device",
    ...ngDevMode ? [{ debugName: "saveLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submission = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "submission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  classSummary = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "classSummary" }] : (
      /* istanbul ignore next */
      []
    )
  );
  authorityState = signal(
    this.enrollment.mode === "demo" ? "local" : "connecting",
    ...ngDevMode ? [{ debugName: "authorityState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isTeacher = computed(
    () => this.session()?.role === "teacher",
    ...ngDevMode ? [{ debugName: "isTeacher" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actorDisplayName = computed(
    () => this.session()?.actor.displayName ?? this.enrollment.studentDisplayName,
    ...ngDevMode ? [{ debugName: "actorDisplayName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canSubmit = computed(
    () => this.session() !== void 0 && this.state().completionStatus === "complete" && this.submission()?.status !== "approved",
    ...ngDevMode ? [{ debugName: "canSubmit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mediaState = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "mediaState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mediaPreviewUrl = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "mediaPreviewUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.loadFailure)
      this.error.set(this.loadFailure);
    if (this.authority !== null && this.enrollment.mode !== "demo")
      void this.initializeAuthority();
    if (typeof window !== "undefined") {
      window.addEventListener("online", this.reconnect);
      window.addEventListener("pagehide", this.pageHide);
    }
  }
  ngOnDestroy() {
    this.flushDraft();
    this.tutorAbort?.abort();
    this.clearMediaPreview();
    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.reconnect);
      window.removeEventListener("pagehide", this.pageHide);
    }
  }
  selectChoice(choiceId) {
    if (!this.ready() || this.mediaBusy() || choiceId === this.state().selectedChoiceId)
      return;
    try {
      this.tutorAbort?.abort();
      this.tutorBusy.set(false);
      this.commit("journey.choice.selected", selectJourneyChoice(this.config, this.state(), choiceId), { stepId: this.step()?.id, choiceId });
      this.clearMediaPreview();
      this.mediaState.set("idle");
      if (this.state().responseDraft.mediaAssetId)
        void this.loadMediaPreview(this.state().responseDraft.mediaAssetId);
      this.notice.set(this.choice()?.planning ? "Goal selected. Explore the highlighted map options to build the mission." : "Decision marked. Explain why before the voyage continues.");
    } catch (error) {
      this.setError(error);
    }
  }
  setResponseMode(responseMode) {
    this.updateDraft({ responseMode });
  }
  setResponseText(text) {
    this.updateDraft({ text });
  }
  setTranscript(transcript) {
    this.updateDraft({ transcript });
  }
  async attachAudio(file, fileName = "journey-response.webm") {
    const stepId = this.step()?.id;
    const choiceId = this.choice()?.id;
    if (!stepId || !choiceId)
      return;
    if (this.media === null) {
      this.error.set("CAPABILITY_NOT_INSTALLED: Audio storage is unavailable. Use a text response.");
      return;
    }
    this.mediaState.set("uploading");
    this.error.set(void 0);
    try {
      const asset = await this.media.upload({
        file,
        fileName,
        contentType: file.type || "audio/webm",
        metadata: {
          projectId: this.config.projectId,
          studentId: this.state().studentId,
          stepId,
          choiceId
        }
      });
      if (this.step()?.id !== stepId || this.choice()?.id !== choiceId) {
        this.mediaState.set("idle");
        return;
      }
      this.updateDraft({ responseMode: "audio", mediaAssetId: asset.id });
      if (!this.flushDraft())
        return;
      await this.loadMediaPreview(asset.id);
      this.mediaState.set("ready");
      this.notice.set("Audio answer attached to this journey step.");
    } catch (error) {
      this.mediaState.set("error");
      this.setError(error);
    }
  }
  async loadMediaPreview(assetId) {
    if (this.media === null)
      return;
    const request = ++this.previewSequence;
    this.clearMediaPreview(false);
    try {
      const asset = await this.media.getReference(assetId);
      if (request !== this.previewSequence) {
        if (asset.reference.startsWith("blob:"))
          URL.revokeObjectURL(asset.reference);
        return;
      }
      this.mediaPreviewUrl.set(asset.reference);
    } catch (error) {
      this.setError(error);
    }
  }
  completeCurrentStep() {
    if (!this.canComplete())
      return false;
    try {
      this.flushDraft();
      const step = this.step();
      const choice = this.choice();
      const completed = completeJourneyStep(this.config, this.state());
      this.commit("journey.step.completed", completed, { stepId: step?.id, choiceId: choice?.id });
      this.clearMediaPreview();
      this.mediaState.set("idle");
      this.notice.set(completed.completionStatus === "complete" ? "Journey recorded. Your replay is ready." : `Chapter recorded. ${this.step()?.title ?? "The next chapter"} is ready.`);
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }
  async submitJourney() {
    if (this.authority === null) {
      this.error.set("Sign-in and the authoritative journey service are required to submit.");
      return false;
    }
    if (this.state().completionStatus !== "complete") {
      this.error.set("Complete every journey chapter before submitting for review.");
      return false;
    }
    if (!this.flushDraft())
      return false;
    await this.syncPending();
    if (this.checkpoint.pendingId || this.syncing || this.saveState() === "error") {
      this.error.set("Sync your saved work before submitting.");
      return false;
    }
    this.authorityState.set("connecting");
    try {
      const submission = await this.authority.submitJourney({
        locator: this.locator(),
        record: this.state(),
        totalStepCount: this.config.steps.length,
        idempotencyKey: this.nextClientEventId("submission")
      });
      this.submission.set(submission);
      this.authorityState.set("synced");
      this.notice.set("Journey submitted for teacher review. Your recorded voyage is locked to this submission.");
      return true;
    } catch (error) {
      this.authorityState.set("error");
      this.setError(error);
      return false;
    }
  }
  connectClassSummary() {
    if (this.authority === null || !this.isTeacher())
      return void 0;
    return this.authority.classSummary(this.locator()).subscribe({
      next: (summary) => {
        this.classSummary.set(summary);
        this.authorityState.set("synced");
      },
      error: (error) => {
        this.authorityState.set("error");
        this.setError(error);
      }
    });
  }
  async reviewSubmission(submissionId, decision, teacherFeedback, mastery) {
    if (this.authority === null || !this.isTeacher()) {
      this.error.set("Teacher authorization is required to review a journey.");
      return false;
    }
    try {
      const reviewed = await this.authority.reviewSubmission({
        locator: this.locator(),
        submissionId,
        decision,
        teacherFeedback,
        mastery,
        idempotencyKey: this.nextClientEventId(`review-${submissionId}`)
      });
      this.classSummary.update((summary) => summary === void 0 ? summary : __spreadProps(__spreadValues({}, summary), {
        members: summary.members.map((member) => member.submission?.id === reviewed.id ? __spreadProps(__spreadValues({}, member), { submission: reviewed }) : member)
      }));
      this.notice.set(decision === "approved" ? "Journey approved and mastery recorded." : "Revision request sent to the student.");
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }
  setSceneHidden(sceneId, hidden) {
    try {
      this.commit("journey.replay.scene.updated", setReplaySceneHidden(this.state(), sceneId, hidden), { sceneId, hidden });
    } catch (error) {
      this.setError(error);
    }
  }
  reset() {
    if (this.saveTimer !== void 0)
      clearTimeout(this.saveTimer);
    this.persistence.clear(this.config.projectId, this.config.projectVersion, this.state().studentId);
    const initial = createInitialJourneyRecord(this.config, this.state().studentId);
    this.commit("journey.reset", initial, void 0, "system");
    this.clearMediaPreview();
    this.notice.set("Journey reset to Lisbon.");
  }
  clearMessages() {
    this.notice.set(void 0);
    this.error.set(void 0);
  }
  flushDraft() {
    if (this.saveTimer !== void 0)
      clearTimeout(this.saveTimer);
    this.saveTimer = void 0;
    if (!this.ready() || this.loadFailure)
      return false;
    try {
      this.save(this.state());
      return true;
    } catch {
      return false;
    }
  }
  updateDraft(update) {
    if (!this.ready())
      return;
    this.state.update((record) => updateJourneyResponseDraft(record, update));
    this.saveState.set("saving");
    if (this.saveTimer !== void 0)
      clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushDraft(), 700);
  }
  commit(eventType, next, payload, actor = "student") {
    const event = this.event(eventType, payload, actor);
    const committed = __spreadProps(__spreadValues({}, next), {
      revision: this.state().revision + 1,
      eventHistory: [...this.state().eventHistory.slice(-99), event]
    });
    this.save(committed, event.clientEventId);
    this.state.set(committed);
    this.error.set(void 0);
  }
  event(eventType, payload, actor = "student") {
    const clientEventId = this.nextClientEventId("event");
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      projectId: this.config.projectId,
      actor: { type: actor, id: actor === "student" ? this.state().studentId : "journey-runtime" },
      payload
    };
  }
  load() {
    if (this.enrollment.mode !== "demo")
      return createInitialJourneyRecord(this.config, this.enrollment.studentId);
    try {
      const loaded = this.persistence.load(this.config.projectId, this.config.projectVersion, this.enrollment.studentId);
      this.checkpoint = this.persistence.loadCheckpoint?.(this.config.projectId, this.config.projectVersion, this.enrollment.studentId) ?? { acknowledgedRevision: 0 };
      return loaded?.projectVersion === this.config.projectVersion ? validateJourneyRecord(this.config, loaded) : createInitialJourneyRecord(this.config, this.enrollment.studentId);
    } catch {
      this.loadFailure = "Saved data could not be read. Keep this browser data and recover from an exported backup.";
      return createInitialJourneyRecord(this.config, this.enrollment.studentId);
    }
  }
  save(record, idempotencyKey = this.nextClientEventId("draft")) {
    this.saveState.set("saving");
    try {
      const checkpoint = __spreadProps(__spreadValues({}, this.checkpoint), { pendingId: idempotencyKey });
      this.persist(record, checkpoint);
      this.checkpoint = checkpoint;
      this.saveState.set("saved");
      queueMicrotask(() => {
        void this.syncPending();
      });
    } catch (error) {
      this.saveState.set("error");
      this.setError(error);
      throw error;
    }
  }
  persist(record, checkpoint) {
    if (this.persistence.saveCheckpoint)
      this.persistence.saveCheckpoint(record, checkpoint);
    else
      this.persistence.save(record);
  }
  async initializeAuthority() {
    if (!this.authority || this.enrollment.mode === "demo")
      return;
    this.authorityState.set("connecting");
    try {
      const session = await this.authority.openSession(this.locator(), this.enrollment);
      this.session.set(session);
      const local = this.persistence.load(this.config.projectId, this.config.projectVersion, session.actor.id);
      this.checkpoint = this.persistence.loadCheckpoint?.(this.config.projectId, this.config.projectVersion, session.actor.id) ?? {
        acknowledgedRevision: 0,
        pendingId: local ? this.nextClientEventId("recover") : void 0
      };
      if (local)
        this.state.set(validateJourneyRecord(this.config, local));
      else
        this.state.set(createInitialJourneyRecord(this.config, session.actor.id));
      this.ready.set(true);
      const remote = await this.authority.loadRecord(this.locator());
      if (this.checkpoint.pendingId && local) {
        if (remote)
          this.conflictRecord.set(remote.record);
      } else if (remote) {
        const record = validateJourneyRecord(this.config, remote.record);
        this.checkpoint = {
          acknowledgedRevision: remote.serverRevision,
          acknowledgedRecord: record
        };
        this.persist(record, this.checkpoint);
        this.state.set(record);
      } else {
        this.save(this.state());
      }
      this.submission.set(await this.authority.loadSubmission(this.locator()));
      await this.syncPending();
      if (!this.checkpoint.pendingId)
        this.authorityState.set("synced");
    } catch (error) {
      this.authorityState.set(isAuthenticationError(error) ? "error" : "offline");
      this.setError(error);
    }
  }
  async retrySave() {
    if (this.saveState() === "error" && !this.flushDraft())
      return;
    if (!this.session() && this.enrollment.mode !== "demo") {
      await this.initializeAuthority();
      return;
    }
    await this.syncPending();
  }
  async syncPending() {
    if (!this.authority || !this.session() || this.syncing || this.authorityState() === "conflict")
      return;
    this.syncing = true;
    try {
      while (this.checkpoint.pendingId) {
        const id = this.checkpoint.pendingId;
        let record = this.state();
        const localIds = [...new Set(JSON.stringify(record).match(/local:[a-zA-Z0-9_-]+/g) ?? [])];
        if (localIds.length && this.media && "promoteLocalAsset" in this.media && typeof this.media.promoteLocalAsset === "function") {
          for (const assetId of localIds) {
            const promoted = await this.media.promoteLocalAsset(assetId);
            const latest = JSON.stringify(this.state()).split(JSON.stringify(assetId)).join(JSON.stringify(promoted.id));
            this.state.set(JSON.parse(latest));
          }
          record = this.state();
          this.persist(record, this.checkpoint);
        }
        this.authorityState.set("connecting");
        const saved = await this.authority.saveRecord({
          locator: this.locator(),
          record,
          expectedServerRevision: this.checkpoint.acknowledgedRevision,
          idempotencyKey: id,
          totalStepCount: this.config.steps.length
        });
        const pendingId = this.checkpoint.pendingId === id ? void 0 : this.checkpoint.pendingId;
        const checkpoint = __spreadProps(__spreadValues({}, this.checkpoint), {
          acknowledgedRevision: saved.serverRevision,
          acknowledgedRecord: saved.record,
          pendingId
        });
        this.persist(this.state(), checkpoint);
        this.checkpoint = checkpoint;
        this.conflictRecord.set(void 0);
        this.authorityState.set("synced");
      }
    } catch (error) {
      this.authorityState.set(isConflictError(error) ? "conflict" : "offline");
      this.setError(error);
      if (isConflictError(error)) {
        try {
          const remote = await this.authority.loadRecord(this.locator());
          if (remote) {
            this.conflictRecord.set(remote.record);
            this.serverRevision = remote.serverRevision;
          }
        } catch {
        }
      }
    } finally {
      this.syncing = false;
    }
  }
  resolveConflict(use) {
    const remote = this.conflictRecord();
    if (!remote)
      return;
    const selected = use === "device" ? this.state() : remote;
    try {
      if (use === "device")
        validateJourneyRecord(this.config, selected, remote);
      const checkpoint = {
        acknowledgedRevision: this.serverRevision,
        acknowledgedRecord: remote,
        pendingId: use === "device" ? this.nextClientEventId("resolve") : void 0,
        recoveryRecords: [
          ...(this.checkpoint.recoveryRecords ?? []).slice(-4),
          use === "device" ? remote : this.state()
        ]
      };
      this.persist(selected, checkpoint);
      this.checkpoint = checkpoint;
      this.state.set(selected);
      this.conflictRecord.set(void 0);
      this.authorityState.set("local");
      this.error.set(void 0);
      void this.syncPending();
    } catch {
      this.error.set("These copies contain different recorded decisions. Download both copies before choosing the class copy; the device copy will also remain in recovery history.");
    }
  }
  setPrediction(prediction) {
    this.updateDraft({ prediction });
  }
  setPlanningTarget(planningTargetId) {
    if (this.state().responseDraft.planningTargetId === planningTargetId)
      return;
    this.updateDraft({ planningTargetId, planningText: "", planningSubmitted: false });
  }
  setPlanningText(planningText) {
    this.updateDraft({ planningText, planningSubmitted: false });
  }
  submitPlanning() {
    this.updateDraft({ planningSubmitted: true });
    this.flushDraft();
  }
  markEvidenceViewed(evidenceId) {
    if (!this.choice()?.evidenceIds.includes(evidenceId))
      return;
    this.updateDraft({
      evidenceViewed: [
        .../* @__PURE__ */ new Set([...this.state().responseDraft.evidenceViewed ?? [], evidenceId])
      ]
    });
  }
  setCitations(citations) {
    this.updateDraft({ citations });
  }
  async askTutor() {
    const step = this.step();
    const choice = this.choice();
    const draft = this.state().responseDraft;
    if (!step || !choice || this.tutorBusy() || (draft.tutorTurns?.length ?? 0) >= 20)
      return;
    const fingerprint = responseFingerprint(draft);
    const requestId = this.nextClientEventId("tutor");
    const criteria = this.config.learning?.criteria ?? [];
    const criterion = criteria[(draft.tutorTurns?.length ?? 0) % Math.max(1, criteria.length)];
    if (!criterion)
      return;
    this.tutorBusy.set(true);
    this.tutorAbort?.abort();
    const abort = new AbortController();
    this.tutorAbort = abort;
    try {
      const result = this.tutor ? await this.tutor.question({
        requestId,
        projectId: this.config.projectId,
        projectVersion: this.config.projectVersion,
        stepId: step.id,
        choice,
        alternatives: step.choices,
        sources: this.config.evidence.filter((s) => choice.evidenceIds.includes(s.id)),
        response: draft,
        responseFingerprint: fingerprint,
        previousDecisions: this.state().completedSteps,
        criteria
      }, abort.signal) : {
        requestId,
        responseFingerprint: fingerprint,
        criterionId: criterion.id,
        question: criterion.question,
        explanation: criterion.proficient
      };
      if (abort.signal.aborted || this.step()?.id !== step.id || this.choice()?.id !== choice.id || responseFingerprint(this.state().responseDraft) !== fingerprint)
        return;
      if (result.requestId !== requestId || result.responseFingerprint !== fingerprint || !criteria.some((c) => c.id === result.criterionId) || typeof result.question !== "string" || result.question.length > 4e3 || !result.question.trim() || result.explanation !== void 0 && (typeof result.explanation !== "string" || result.explanation.length > 6e3))
        throw new Error("TUTOR_RESPONSE_INVALID");
      const turn = __spreadProps(__spreadValues({}, result), {
        id: requestId,
        stepId: step.id,
        choiceId: choice.id,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        source: this.tutor ? "tutor" : "scaffold"
      });
      this.updateDraft({ tutorTurns: [...draft.tutorTurns ?? [], turn] });
      this.flushDraft();
    } catch (error) {
      if (!abort.signal.aborted)
        this.setError(error);
    } finally {
      if (this.tutorAbort === abort)
        this.tutorBusy.set(false);
    }
  }
  answerTutor(id, answer) {
    this.updateDraft({
      tutorTurns: this.state().responseDraft.tutorTurns?.map((turn) => turn.id === id ? __spreadProps(__spreadValues({}, turn), { answer }) : turn)
    });
  }
  openRevision(stepId) {
    const record = this.state().completedSteps.find((item) => item.stepId === stepId);
    if (!record || this.submission()?.status === "approved")
      return;
    this.revisionStepId.set(stepId);
    this.revisionDraft.set(__spreadProps(__spreadValues({}, record.studentResponse), {
      text: record.studentResponse.text ?? "",
      transcript: record.studentResponse.transcript ?? ""
    }));
  }
  saveRevision(reason) {
    const stepId = this.revisionStepId();
    if (!stepId)
      return false;
    try {
      this.commit("journey.response.revised", reviseJourneyResponse(this.config, this.state(), stepId, this.revisionDraft(), reason), { stepId });
      this.revisionStepId.set(void 0);
      this.notice.set("Revision saved. Your earlier explanation remains in the record.");
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }
  exportRecord(which = "device") {
    return JSON.stringify({
      format: "journey-backup",
      version: 1,
      scope: this.locator(),
      record: which === "class" ? this.conflictRecord() : this.state(),
      recoveryRecords: this.checkpoint.recoveryRecords ?? [],
      audioNote: "Local audio stays on this device. Audio assets require separate storage backup."
    }, null, 2);
  }
  importRecord(json) {
    try {
      const backup = JSON.parse(json);
      if (backup.format !== "journey-backup" || backup.scope?.tenantId !== this.enrollment.tenantId || backup.scope?.classId !== this.enrollment.classId)
        throw new Error("BACKUP_SCOPE_MISMATCH");
      const record = validateJourneyRecord(this.config, backup.record);
      if (record.studentId !== this.state().studentId && this.enrollment.mode !== "demo")
        throw new Error("BACKUP_OWNER_MISMATCH");
      const restored = validateJourneyRecord(this.config, __spreadProps(__spreadValues({}, record), {
        studentId: this.state().studentId
      }));
      this.checkpoint = __spreadProps(__spreadValues({}, this.checkpoint), {
        recoveryRecords: [...(this.checkpoint.recoveryRecords ?? []).slice(-4), this.state()]
      });
      this.save(restored);
      this.state.set(restored);
      this.notice.set("Backup restored. The previous device copy is retained in recovery history.");
    } catch (error) {
      this.setError(error);
    }
  }
  locator() {
    return journeyAuthorityLocator(this.enrollment, this.config.projectId, this.config.projectVersion);
  }
  nextClientEventId(kind) {
    this.eventSequence += 1;
    const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${this.eventSequence}`;
    return `journey-${kind}-${random}`;
  }
  clearMediaPreview(invalidate = true) {
    if (invalidate)
      this.previewSequence++;
    const previous = this.mediaPreviewUrl();
    if (previous?.startsWith("blob:"))
      URL.revokeObjectURL(previous);
    this.mediaPreviewUrl.set(void 0);
  }
  setError(error) {
    const message = error instanceof Error ? error.message : "JOURNEY_RUNTIME_ERROR";
    const friendly = {
      CHOICE_REQUIRED: "Choose a course before continuing.",
      RESPONSE_REQUIRED: "Add at least one complete sentence or an audio answer before continuing.",
      ASSET_NOT_FOUND: "The saved audio could not be loaded. Attach it again or use text.",
      AUTHENTICATION_REQUIRED: "Sign in to save and submit an authoritative journey.",
      JOURNEY_RECORD_CONFLICT: "This journey changed in another session. Both copies are preserved. Review them before continuing.",
      CITATION_REQUIRED: "Choose a source paragraph and explain how it supports your decision.",
      CITATION_INVALID: "Check the source paragraph and add a sentence explaining why it matters.",
      JOURNEY_STORAGE_UNAVAILABLE: "This device cannot save right now. Download a backup and retry.",
      TEACHER_AUTHORIZATION_REQUIRED: "Only the class teacher can review submissions and open the live class summary."
    };
    this.error.set(friendly[message] ?? message);
  }
  static \u0275fac = function JourneyReplayRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyReplayRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _JourneyReplayRuntimeService, factory: _JourneyReplayRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyReplayRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();
function isConflictError(error) {
  return error instanceof Error && error.message === "JOURNEY_RECORD_CONFLICT";
}
function isAuthenticationError(error) {
  return error instanceof Error && error.message === "AUTHENTICATION_REQUIRED";
}

export {
  journeyAuthorityLocator,
  createInitialJourneyRecord,
  selectJourneyChoice,
  updateJourneyResponseDraft,
  completeJourneyStep,
  routeForScene,
  detectVoyageIntersections,
  hasResponse,
  assertResponse,
  reviseJourneyResponse,
  responseFingerprint,
  JourneyReplayRuntimeService
};
//# debugId=74cb6f1a-49d9-5c5a-9928-f807ee0b4600
//# sourceMappingURL=chunk-EHZR63UE.js.map
