// src/app/shared/inquiry/inquiry-example.models.ts
function validateInquiryExamples(examples, evidenceIds) {
  const fail = () => {
    throw new Error(
      "INQUIRY_EXAMPLE_INVALID: Check the lesson, media, captions, transcript, and source references."
    );
  };
  const safeAsset = (value) => typeof value === "string" && /^\/(?!\/)[a-zA-Z0-9/_\-.]+$/.test(value) && !value.split("/").includes("..");
  if (new Set(examples.map((e) => e.id)).size !== examples.length) fail();
  for (const example of examples) {
    if (example.capabilityId !== "learning.worked-example" || example.version !== "1.0" || !/^[a-z0-9][a-z0-9-]*$/.test(example.id) || !Number.isInteger(example.lesson) || example.lesson < 1 || example.lesson > 8 || ![example.title, example.summary, example.attribution].every(
      (v) => typeof v === "string" && v.trim()
    ) || ![example.videoUrl, example.posterUrl, example.captionsUrl].every(safeAsset) || !Number.isFinite(example.durationSeconds) || example.durationSeconds <= 0 || !example.sourceIds.length || example.sourceIds.some((id) => !evidenceIds.includes(id)) || !example.lookFors.length || example.lookFors.some((v) => !v.trim()) || !example.chapters.length)
      fail();
    for (const [i, chapter] of example.chapters.entries()) {
      if (!chapter.label.trim() || !chapter.text.trim() || !Number.isFinite(chapter.startSeconds) || chapter.startSeconds < 0 || chapter.startSeconds >= example.durationSeconds || i === 0 && chapter.startSeconds !== 0 || i > 0 && chapter.startSeconds <= example.chapters[i - 1].startSeconds)
        fail();
    }
  }
}

// src/app/shared/inquiry/inquiry.models.ts
var emptyInquiryState = () => ({
  drafts: {},
  attempts: [],
  reviews: {}
});
function latestInquiryAttempt(state, lesson, targetId) {
  return [...state.attempts].reverse().find((a) => a.lesson === lesson && a.targetId === targetId);
}
function inquiryGateReady(config, state, gateId) {
  const gate = config.gates.find((g) => g.id === gateId);
  if (!gate) return false;
  const lesson = config.lessons.find((l) => l.number === gate.afterLesson);
  if (lesson?.requiresGate && !inquiryGateReady(config, state, lesson.requiresGate)) return false;
  const attempt = latestInquiryAttempt(state, gate.afterLesson);
  if (attempt?.evidenceDrafts && lesson?.fields.some((field) => {
    const key = `lesson-${lesson.number}-${field.id}`;
    return (state.drafts[key] ?? "") !== (attempt.evidenceDrafts[key] ?? "");
  }))
    return false;
  return !!attempt && state.reviews[attempt.id]?.decision === "ready";
}
function inquiryTargetReady(state, targetId) {
  const attempt = [...state.attempts].reverse().find((a) => a.targetId === targetId);
  return !!attempt && state.reviews[attempt.id]?.decision === "ready";
}
function validateInquiry(config, evidenceIds) {
  if (config.examples) validateInquiryExamples(config.examples, evidenceIds);
  const fail = (message) => {
    throw new Error(`DEBATE_INQUIRY_INVALID: ${message}`);
  };
  if (!["debate.inquiry-portfolio", "learning.inquiry-portfolio"].includes(config.capabilityId) || config.version !== "1.0")
    fail("Unsupported capability version.");
  if (config.lessons.length !== 8 || !config.targets.length)
    fail("Eight lessons and learning targets are required.");
  if (config.studioFromLesson !== void 0 && (!Number.isInteger(config.studioFromLesson) || config.studioFromLesson < 1 || config.studioFromLesson > 8))
    fail("Invalid final workspace entry lesson.");
  const unique = (ids) => new Set(ids).size === ids.length && ids.every((id) => /^[a-z0-9][a-z0-9-]*$/.test(id));
  if (!unique(config.targets.map((t) => t.id)) || !unique(config.gates.map((g) => g.id)))
    fail("Duplicate or invalid IDs.");
  if (!config.gates.some((g) => g.id === config.hearingGateId)) fail("Unknown hearing gate.");
  for (const target of config.targets) {
    if (!target.label.trim() || !target.prompt.trim() || !target.standardId.trim())
      fail("Incomplete target.");
    if (!target.sourceIds.length || target.sourceIds.some((id) => !evidenceIds.includes(id)))
      fail("Unknown target source.");
  }
  for (const [i, lesson] of config.lessons.entries()) {
    if (lesson.number !== i + 1 || !lesson.fields.length || !unique(lesson.fields.map((f) => f.id)))
      fail("Invalid lesson sequence or fields.");
    if (lesson.sourceIds.some((id) => !evidenceIds.includes(id)) || lesson.targetIds.some((id) => !config.targets.some((t) => t.id === id)))
      fail("Unknown lesson reference.");
    if (lesson.requiresGate) {
      const gate = config.gates.find((g) => g.id === lesson.requiresGate);
      if (!gate || gate.afterLesson >= lesson.number)
        fail("Gate must reference an earlier lesson.");
    }
    if ([
      lesson.title,
      lesson.task,
      lesson.check,
      lesson.retry,
      lesson.help,
      lesson.sideQuest,
      lesson.teacher,
      lesson.tutor,
      lesson.workload,
      ...lesson.fields.flatMap((f) => [f.label, f.prompt])
    ].some((v) => !v?.trim()))
      fail("Empty lesson content.");
  }
  for (const gate of config.gates) {
    if (!Number.isInteger(gate.afterLesson) || gate.afterLesson < 1 || gate.afterLesson > 7 || !gate.criteria.trim())
      fail("Invalid gate.");
  }
}
function isInquiryState(value) {
  const obj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
  const texts = (v, keys) => keys.every((k) => typeof v[k] === "string");
  if (!obj(value) || !obj(value["drafts"]) || !Object.values(value["drafts"]).every((v) => typeof v === "string") || !Array.isArray(value["attempts"]) || !obj(value["reviews"]))
    return false;
  const ids = /* @__PURE__ */ new Set();
  for (const a of value["attempts"]) {
    if (!obj(a) || !texts(a, ["id", "prompt", "response", "createdAt"]) || a["mode"] !== "independent" || !Number.isInteger(a["lesson"]) || Number(a["lesson"]) < 1 || Number(a["lesson"]) > 8 || a["targetId"] !== void 0 && typeof a["targetId"] !== "string" || ids.has(String(a["id"])))
      return false;
    if (a["evidenceDrafts"] !== void 0 && (!obj(a["evidenceDrafts"]) || !Object.values(a["evidenceDrafts"]).every((v) => typeof v === "string")))
      return false;
    ids.add(String(a["id"]));
  }
  const review = (r) => obj(r) && texts(r, ["attemptId", "feedback", "reviewerId", "createdAt"]) && ids.has(String(r["attemptId"])) && ["ready", "revise"].includes(String(r["decision"])) && r["authority"] === "demo" && (r["performanceEvidence"] === void 0 || typeof r["performanceEvidence"] === "string");
  return Object.entries(value["reviews"]).every(
    ([id, r]) => review(r) && r["attemptId"] === id
  ) && (value["reviewHistory"] === void 0 || Array.isArray(value["reviewHistory"]) && value["reviewHistory"].every(review));
}

export {
  emptyInquiryState,
  latestInquiryAttempt,
  inquiryGateReady,
  inquiryTargetReady,
  validateInquiry,
  isInquiryState
};
//# debugId=c629d6a2-c2db-580b-b730-1c220ce46ab4
//# sourceMappingURL=chunk-H7BIYLRY.js.map
