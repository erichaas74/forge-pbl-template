import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/journey-replay/core/journey-consequences.ts
function resolveJourneyOutcome(config, record, choice) {
  const priorChoices = new Set(record.completedSteps.map((step) => step.choiceId));
  const modifiers = (choice.consequenceModifiers ?? []).filter(
    (modifier) => priorChoices.has(modifier.afterChoiceId)
  );
  const changes = __spreadValues({}, choice.resourceChanges);
  for (const modifier of modifiers) {
    for (const [id, amount] of Object.entries(modifier.resourceChanges)) {
      changes[id] = (changes[id] ?? 0) + amount;
    }
  }
  const resources = __spreadValues({}, record.resources);
  for (const [id, amount] of Object.entries(changes)) {
    const definition = config.resources.find((resource) => resource.id === id);
    if (!definition) throw new Error("RESOURCE_NOT_FOUND");
    if (!Number.isFinite(amount)) throw new Error("RESOURCE_CHANGE_INVALID");
    resources[id] = Math.max(
      definition.minimum,
      Math.min(definition.maximum, resources[id] + amount)
    );
  }
  return {
    resources,
    consequence: [choice.consequence, ...modifiers.map((modifier) => modifier.narrative)].join(" "),
    carriedForward: modifiers.map((modifier) => modifier.narrative),
    changes: config.resources.flatMap((resource) => {
      const before = record.resources[resource.id];
      const after = resources[resource.id];
      return after === before ? [] : [__spreadProps(__spreadValues({}, resource), { before, after, delta: after - before })];
    })
  };
}

// src/app/templates/journey-replay/runtime/journey-replay.tokens.ts
var JOURNEY_TUTOR = new InjectionToken("JOURNEY_TUTOR");
var JOURNEY_REPLAY_DEMO_CLASS_SUMMARY = new InjectionToken(
  "JOURNEY_REPLAY_DEMO_CLASS_SUMMARY"
);
var JOURNEY_REPLAY_CONFIG = new InjectionToken(
  "JOURNEY_REPLAY_CONFIG"
);
var JOURNEY_REPLAY_ENROLLMENT = new InjectionToken(
  "JOURNEY_REPLAY_ENROLLMENT"
);
var JOURNEY_REPLAY_PERSISTENCE = new InjectionToken(
  "JOURNEY_REPLAY_PERSISTENCE"
);
var JOURNEY_REPLAY_MEDIA = new InjectionToken("JOURNEY_REPLAY_MEDIA");
var JOURNEY_REPLAY_AUTHORITY = new InjectionToken(
  "JOURNEY_REPLAY_AUTHORITY"
);

export {
  resolveJourneyOutcome,
  JOURNEY_TUTOR,
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_PERSISTENCE,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_AUTHORITY
};
//# debugId=ca55298a-4474-5dd2-a7a3-7b5e7f258a08
//# sourceMappingURL=chunk-Q2RH2RH4.js.map
