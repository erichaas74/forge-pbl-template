import {
  isAllowedMediaSrc
} from "./chunk-ZTDR7NN6.js";
import {
  isExhibitObjectModel
} from "./chunk-MNKXLJET.js";

// src/app/shared/project-intro/decision-scene.models.ts
var local = (value) => typeof value === "string" && /^\/(?!\/)/.test(value);
var nonempty = (value) => typeof value === "string" && !!value.trim();
var mediaValid = (media) => !!media && (media.model ? isExhibitObjectModel(media.model) : local(media.image)) && nonempty(media.alt) && (media.fit === void 0 || ["cover", "contain"].includes(media.fit)) && (!media.video || isAllowedMediaSrc(media.video) && local(media.captions) && media.videoFallback === "illustration-and-transcript");
var linesValid = (lines) => Array.isArray(lines) && lines.every((line) => nonempty(line.speaker) && nonempty(line.text) && local(line.audioUrl));
function validateDecisionScene(config) {
  if (!["cargo", "artifact", "council", "dispatch", "navigation"].includes(config.interaction) || ![
    config.replayLabel,
    config.kicker,
    config.invitation,
    config.sceneLabel,
    config.sceneCaption,
    config.prompt,
    config.revealButton
  ].every(nonempty) || !mediaValid(config.media) || config.prologue !== void 0 && (![config.prologue.title, config.prologue.setting, config.prologue.continueLabel].every(
    nonempty
  ) || !mediaValid(config.prologue.media) || !linesValid(config.prologue.dialogue) || config.prologue.dialogue.length < 1 || config.prologue.dialogue.length > 6) || config.afterVideoMedia !== void 0 && (!config.media.video || !mediaValid(config.afterVideoMedia) || !!config.afterVideoMedia.video || !!config.afterVideoMedia.model) || config.cargo !== void 0 && (config.interaction !== "cargo" || !Number.isSafeInteger(config.cargo.startingCoins) || config.cargo.startingCoins < 0 || !Number.isSafeInteger(config.cargo.capacity) || config.cargo.capacity < 1 || config.cargo.capacity > config.choices.length || !local(config.cargo.vehicleImage) || !nonempty(config.cargo.vehicleAlt) || config.choices.some(
    (choice) => !choice.cargo || !nonempty(choice.cargo.name) || !local(choice.image) || !Number.isSafeInteger(choice.cargo.cost) || choice.cargo.cost < 0 || !Number.isSafeInteger(choice.cargo.sale) || choice.cargo.sale < 0
  ) || [...config.choices].sort((a, b) => (a.cargo?.cost ?? 0) - (b.cargo?.cost ?? 0)).slice(0, config.cargo.capacity).reduce((sum, item) => sum + (item.cargo?.cost ?? 0), 0) > config.cargo.startingCoins) || config.speeches !== void 0 && (!Array.isArray(config.speeches) || config.speeches.length < 1 || config.speeches.length > 4 || new Set(config.speeches.map((speech) => speech.id)).size !== config.speeches.length || config.speeches.some(
    (speech) => ![speech.id, speech.speaker, speech.title, speech.summary].every(nonempty) || !isAllowedMediaSrc(speech.video) || speech.captions !== void 0 && !local(speech.captions)
  )) || config.sceneBadge && (!nonempty(config.sceneBadge.primary) || !nonempty(config.sceneBadge.secondary)) || config.transition && (!["load", "spotlight"].includes(config.transition.style) || !nonempty(config.transition.label)) || !linesValid(config.dialogue) || !Array.isArray(config.choices) || config.choices.length < 2 || config.choices.length > 4 || new Set(config.choices.map((choice) => choice.id)).size !== config.choices.length || config.choices.some(
    (choice) => ![
      choice.id,
      choice.label,
      choice.detail,
      choice.imageAlt,
      choice.badge,
      choice.result?.title,
      choice.result?.text,
      choice.result?.evidence,
      choice.result?.surprise
    ].every(nonempty) || !(choice.model ? isExhibitObjectModel(choice.model) : local(choice.image) || !!config.speeches?.length) || !mediaValid(choice.result.media) || choice.thinking && (![choice.thinking.prompt, choice.thinking.starter, choice.thinking.guide].every(
      nonempty
    ) || choice.thinking.evidence !== void 0 && (choice.thinking.evidence.length < 2 || choice.thinking.evidence.length > 4 || new Set(choice.thinking.evidence.map((item) => item.id)).size !== choice.thinking.evidence.length || choice.thinking.evidence.some(
      (item) => !nonempty(item.id) || !nonempty(item.text)
    ))) || choice.result.dialogue && !linesValid(choice.result.dialogue) || choice.result.metrics && (!choice.result.metrics.length || choice.result.metrics.length > 4 || choice.result.metrics.some(
      (metric) => !nonempty(metric.label) || !nonempty(metric.value)
    )) || choice.result.source && (!nonempty(choice.result.source.label) || !/^https:\/\//.test(choice.result.source.url))
  ) || !config.mission || ![
    config.mission.title,
    config.mission.invitation,
    config.mission.imageAlt,
    config.mission.deliverable,
    config.mission.finishButton
  ].every(nonempty) || !(config.mission.model ? isExhibitObjectModel(config.mission.model) : local(config.mission.image)) || config.mission.steps.length !== 3 || !config.mission.steps.every(nonempty) || config.mission.dialogue && !linesValid(config.mission.dialogue))
    throw new Error("CONFIG_INVALID: The decision opening scene is incomplete.");
}

// src/app/shared/project-intro/project-teaser.models.ts
function validateTeaser(config) {
  if (!config || !config.id || !/^\d+\.\d+\.\d+$/.test(config.version) || !config.headline)
    throw new Error("CONFIG_INVALID: The opening scene identity is incomplete.");
  if (config.type === "decision-scene") return validateDecisionScene(config);
  const localAsset = (value) => value.startsWith("/") && !value.startsWith("//");
  if (config.type !== "illustrated-comparison" || !config.id || !/^\d+\.\d+\.\d+$/.test(config.version) || !config.headline || !config.testButton || !config.finishButton || !config.comedyNote || !config.evidenceNote || config.samples.length !== 2 || new Set(config.samples.map((sample) => sample.id)).size !== 2 || config.samples.some(
    (sample) => !sample.label || !sample.result || !/^#[\da-f]{6}$/i.test(sample.color)
  ) || ["welcome", "testing", "reveal", "handoff"].some((beat) => {
    const lines = config.dialogue[beat];
    return !lines?.length || lines.some(
      (line) => !["scientist", "robot"].includes(line.speaker) || !line.text || !localAsset(line.audioUrl)
    );
  }))
    throw new Error("CONFIG_INVALID: The illustrated opening scene is incomplete.");
}
function isTeaserResult(value) {
  if (!value || typeof value !== "object") return false;
  const result = value;
  return ["projectIntro.teaserCompleted", "projectIntro.teaserSkipped"].includes(
    result["eventType"]
  ) && typeof result["teaserId"] === "string" && typeof result["teaserVersion"] === "string" && typeof result["timestamp"] === "string" && (result["choiceId"] === void 0 || typeof result["choiceId"] === "string" && result["choiceId"].length > 0 && result["choiceId"].length <= 100) && Number.isFinite(Date.parse(result["timestamp"])) && (result["thinking"] === void 0 || Array.isArray(result["thinking"]) && result["thinking"].length <= 40 && result["thinking"].every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const attempt = entry;
    return typeof attempt["step"] === "string" && attempt["step"].length <= 100 && typeof attempt["answer"] === "string" && attempt["answer"].length <= 1e3 && (attempt["evidenceId"] === void 0 || typeof attempt["evidenceId"] === "string" && attempt["evidenceId"].length <= 100) && (attempt["correct"] === void 0 || typeof attempt["correct"] === "boolean");
  })) && Array.isArray(result["observations"]) && result["observations"].length <= 10 && result["observations"].every(
    (item) => !!item && typeof item === "object" && "sampleId" in item && typeof item.sampleId === "string" && "result" in item && typeof item.result === "string"
  );
}

// src/app/shared/project-intro/project-intro.models.ts
var introEvents = {
  teaserCompleted: "projectIntro.teaserCompleted",
  teaserSkipped: "projectIntro.teaserSkipped",
  draftSaved: "projectIntro.draftSaved",
  accepted: "projectIntro.accepted",
  revised: "projectIntro.revised"
};
var EMPTY_INTRO_RESPONSE = Object.freeze({
  challengeChoiceId: "",
  choiceId: "",
  reason: "",
  question: "",
  confidence: "exploring"
});
var IntroError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
  code;
};
function validateIntroConfig(config) {
  if (config.teaser) validateTeaser(config.teaser);
  const unique = (items) => items.length >= 2 && new Set(items.map((item) => item.id)).size === items.length && items.every((item) => item.id.trim() && item.label.trim() && item.detail.trim());
  if (config.capabilityId !== "project.intro" || config.schemaVersion !== "1.0" || !config.projectId || !/^\d+\.\d+\.\d+$/.test(config.version) || !(config.model ? isExhibitObjectModel(config.model) : config.image?.startsWith("/") && !config.image.startsWith("//")) || !config.headline.trim() || !config.hook.trim() || !config.action.trim() || !unique(config.challenge.options) || !unique(config.decision.options) || config.challenge.options.some((option) => !option.feedback.trim()) || config.mission.length !== 3 || config.finalExample.chapters.length < 3) {
    throw new IntroError("CONFIG_INVALID", "This project opening has missing or invalid content.");
  }
}
function isIntroResponse(value) {
  if (!value || typeof value !== "object") return false;
  const item = value;
  return ["challengeChoiceId", "choiceId", "reason", "question"].every(
    (key) => typeof item[key] === "string" && item[key].length <= 2e3
  ) && ["exploring", "developing", "confident"].includes(item["confidence"]) && (item["teaser"] === void 0 || isTeaserResult(item["teaser"])) && (item["practiceReplays"] === void 0 || Array.isArray(item["practiceReplays"]) && item["practiceReplays"].length <= 10 && item["practiceReplays"].every(isTeaserResult));
}
function isIntroSnapshot(value) {
  if (!value || typeof value !== "object") return false;
  const item = value;
  return item["schemaVersion"] === "1.0" && Number.isInteger(item["revision"]) && item["revision"] > 0 && typeof item["updatedAt"] === "string" && isIntroResponse(item["draft"]) && Array.isArray(item["history"]) && item["history"].every((record) => {
    if (!record || typeof record !== "object") return false;
    const entry = record;
    return typeof entry["clientEventId"] === "string" && typeof entry["timestamp"] === "string" && [introEvents.accepted, introEvents.revised].includes(
      entry["eventType"]
    ) && isIntroResponse(entry["response"]);
  });
}
function responseReady(config, response) {
  return config.challenge.options.some((option) => option.id === response.challengeChoiceId) && config.decision.options.some((option) => option.id === response.choiceId) && response.reason.trim().length > 0 && response.question.trim().length > 0 && isIntroResponse(response);
}

export {
  validateTeaser,
  introEvents,
  EMPTY_INTRO_RESPONSE,
  IntroError,
  validateIntroConfig,
  isIntroSnapshot,
  responseReady
};
//# debugId=cac7c254-f12b-5e19-9fee-48ca7c131d23
//# sourceMappingURL=chunk-5A6GBRKO.js.map
