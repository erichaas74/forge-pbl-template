import {
  Subject
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/core/state/runtime-scope.ts
function runtimeScopeKey(scope) {
  return [
    scope.tenantId,
    scope.projectId,
    scope.projectVersion,
    scope.attemptId ?? "",
    scope.scopeType,
    scope.classId ?? "",
    scope.studentId ?? "",
    scope.teamId ?? ""
  ].join("::");
}

// src/app/core/errors/runtime-error-factory.ts
function runtimeError(code, message, options = {}) {
  return {
    code,
    severity: options.severity ?? "error",
    message,
    sourceId: options.sourceId,
    recoverable: options.recoverable ?? true
  };
}

// src/app/core/events/runtime-event-bus.ts
var RuntimeEventBus = class {
  constructor(registry) {
    this.registry = registry;
  }
  registry;
  subjects = /* @__PURE__ */ new Map();
  publish(scope, event) {
    if (event.tenantId !== scope.tenantId || event.projectId !== scope.projectId) {
      return {
        accepted: false,
        errors: [
          runtimeError(
            "EVENT_SCOPE_MISMATCH",
            "Event tenant/project identity does not match the runtime scope.",
            { sourceId: event.id }
          )
        ]
      };
    }
    if (!this.registry.has(event.eventType)) {
      return {
        accepted: false,
        errors: [
          runtimeError(
            "UNKNOWN_EVENT_TYPE",
            `Event type "${event.eventType}" is not registered.`,
            { sourceId: event.id }
          )
        ]
      };
    }
    this.subjectFor(scope).next(Object.freeze(__spreadValues({}, event)));
    return { accepted: true };
  }
  subscribe(scope, listener) {
    const subscription = this.subjectFor(scope).subscribe(listener);
    return () => subscription.unsubscribe();
  }
  subjectFor(scope) {
    const key = runtimeScopeKey(scope);
    let subject = this.subjects.get(key);
    if (subject === void 0) {
      subject = new Subject();
      this.subjects.set(key, subject);
    }
    return subject;
  }
};

// src/app/core/rules/deterministic-rule-engine.ts
var DeterministicRuleEngine = class {
  constructor(conditions, actions) {
    this.conditions = conditions;
    this.actions = actions;
  }
  conditions;
  actions;
  indexCache = /* @__PURE__ */ new WeakMap();
  evaluateEvent(event, state, rules, definitions) {
    const context = {
      event,
      tenantId: state.tenantId,
      projectId: state.projectId,
      projectVersion: state.projectVersion,
      definitions
    };
    const errors = [];
    const matchedRules = [];
    const ruleIdsToMarkFired = [];
    const commands = [];
    for (const rule of this.candidates(event, rules)) {
      if (!rule.enabled || !rule.repeatable && state.firedRuleIds.includes(rule.id)) {
        continue;
      }
      const conditionResult = rule.conditions === void 0 ? { matched: true, errors: [] } : this.evaluateGroup(rule.conditions, state, context);
      errors.push(...conditionResult.errors);
      if (!conditionResult.matched || conditionResult.errors.length > 0) {
        continue;
      }
      const ruleCommands = [];
      let actionFailed = false;
      for (const action of rule.actions) {
        const registration = this.actions.get(action.type);
        if (registration === void 0) {
          errors.push(
            runtimeError(
              "UNKNOWN_ACTION_TYPE",
              `Rule "${rule.id}" uses unregistered action type "${action.type}".`,
              { sourceId: rule.id }
            )
          );
          actionFailed = true;
          break;
        }
        try {
          ruleCommands.push(
            ...registration.handler.createCommands(action, state, context)
          );
        } catch {
          errors.push(
            runtimeError(
              "ACTION_HANDLER_FAILED",
              `Action handler "${action.type}" failed safely for rule "${rule.id}".`,
              { sourceId: rule.id }
            )
          );
          actionFailed = true;
          break;
        }
      }
      if (actionFailed) {
        continue;
      }
      matchedRules.push(rule.id);
      commands.push(...ruleCommands);
      if (!rule.repeatable) {
        ruleIdsToMarkFired.push(rule.id);
      }
    }
    return {
      matchedRules,
      commands,
      ruleIdsToMarkFired,
      errors: errors.length === 0 ? void 0 : errors
    };
  }
  candidates(event, rules) {
    let index = this.indexCache.get(rules);
    if (index === void 0) {
      index = this.buildIndex(rules);
      this.indexCache.set(rules, index);
    }
    const candidates = /* @__PURE__ */ new Map();
    for (const rule of index.withoutTrigger) {
      candidates.set(rule.id, rule);
    }
    for (const rule of index.byEvent.get(event.eventType) ?? []) {
      candidates.set(rule.id, rule);
    }
    if (event.sourceId !== void 0) {
      for (const rule of index.byEventAndTarget.get(this.triggerKey(event.eventType, event.sourceId)) ?? []) {
        candidates.set(rule.id, rule);
      }
    }
    return [...candidates.values()].sort(
      (left, right) => (right.priority ?? 0) - (left.priority ?? 0) || left.id.localeCompare(right.id)
    );
  }
  buildIndex(rules) {
    const byEvent = /* @__PURE__ */ new Map();
    const byEventAndTarget = /* @__PURE__ */ new Map();
    const withoutTrigger = [];
    for (const rule of rules) {
      if (rule.trigger === void 0) {
        withoutTrigger.push(rule);
      } else if (rule.trigger.targetId === void 0) {
        this.addToIndex(byEvent, rule.trigger.eventType, rule);
      } else {
        this.addToIndex(
          byEventAndTarget,
          this.triggerKey(rule.trigger.eventType, rule.trigger.targetId),
          rule
        );
      }
    }
    return { byEvent, byEventAndTarget, withoutTrigger };
  }
  addToIndex(index, key, rule) {
    const entries = index.get(key) ?? [];
    entries.push(rule);
    index.set(key, entries);
  }
  triggerKey(eventType, targetId) {
    return `${eventType}::${targetId}`;
  }
  evaluateGroup(group, state, context) {
    if (group.operator === "NOT" && group.conditions.length !== 1) {
      return {
        matched: false,
        errors: [
          runtimeError(
            "INVALID_CONDITION_GROUP",
            "NOT condition groups must contain exactly one child."
          )
        ]
      };
    }
    if (group.operator === "X_OF" && (!Number.isInteger(group.requiredCount) || (group.requiredCount ?? -1) < 0 || (group.requiredCount ?? 0) > group.conditions.length)) {
      return {
        matched: false,
        errors: [
          runtimeError(
            "INVALID_CONDITION_GROUP",
            "X_OF condition groups require a valid requiredCount."
          )
        ]
      };
    }
    const results = group.conditions.map(
      (condition) => this.isGroup(condition) ? this.evaluateGroup(condition, state, context) : this.evaluateCondition(condition, state, context)
    );
    const errors = results.flatMap((result) => result.errors);
    if (errors.length > 0) {
      return { matched: false, errors };
    }
    const matches = results.filter((result) => result.matched).length;
    switch (group.operator) {
      case "AND":
        return { matched: matches === results.length, errors };
      case "OR":
        return { matched: matches > 0, errors };
      case "NOT":
        return { matched: matches === 0, errors };
      case "X_OF":
        return { matched: matches >= (group.requiredCount ?? 0), errors };
    }
  }
  evaluateCondition(condition, state, context) {
    const registration = this.conditions.get(condition.type);
    if (registration === void 0) {
      return {
        matched: false,
        errors: [
          runtimeError(
            "UNKNOWN_CONDITION_TYPE",
            `Condition type "${condition.type}" is not registered.`,
            { sourceId: condition.targetId }
          )
        ]
      };
    }
    try {
      return this.normalize(
        registration.evaluator.evaluate(condition, state, context)
      );
    } catch {
      return {
        matched: false,
        errors: [
          runtimeError(
            "CONDITION_EVALUATOR_FAILED",
            `Condition evaluator "${condition.type}" failed safely.`,
            { sourceId: condition.targetId }
          )
        ]
      };
    }
  }
  normalize(evaluation) {
    return typeof evaluation === "boolean" ? { matched: evaluation, errors: [] } : { matched: evaluation.matched, errors: evaluation.errors ?? [] };
  }
  isGroup(value) {
    return "conditions" in value && Array.isArray(value.conditions);
  }
};

export {
  runtimeError,
  runtimeScopeKey,
  RuntimeEventBus,
  DeterministicRuleEngine
};
//# debugId=bfc70389-ef80-51c1-b622-a235c9a17fe1
//# sourceMappingURL=chunk-PJ67YSEX.js.map
