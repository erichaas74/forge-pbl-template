import {
  toSignal
} from "./chunk-5UKO2VQ2.js";
import {
  JourneyHistoryContextComponent
} from "./chunk-U6GFPECO.js";
import {
  LivingJourneyMapComponent
} from "./chunk-G7WLRBLS.js";
import {
  JOURNEY_PATH_PERSISTENCE
} from "./chunk-Q7O3ZRXD.js";
import {
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  resolveJourneyOutcome
} from "./chunk-Q2RH2RH4.js";
import {
  DeterministicRuleEngine,
  RuntimeEventBus
} from "./chunk-PJ67YSEX.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  ActionRegistry,
  ConditionRegistry,
  EventRegistry
} from "./chunk-2WXJ5NX3.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/journey-replay/core/journey-path.rules.ts
var conditions = new ConditionRegistry();
conditions.register({
  id: "journey.discoveryPresent",
  version: "1.0.0",
  status: "core",
  evaluator: {
    type: "journey.discoveryPresent",
    evaluate: (condition, state) => state.stateValues[condition.targetId ?? ""] === true
  }
});
var engine = new DeterministicRuleEngine(conditions, new ActionRegistry());
var cache = /* @__PURE__ */ new WeakMap();
function revealedJourneyChoices(node, tags) {
  let rules = cache.get(node);
  if (!rules) {
    rules = node.choices.map((choice) => __spreadValues({
      id: choice.id,
      schemaVersion: "1.0",
      enabled: true,
      repeatable: true,
      priority: 0,
      actions: []
    }, choice.requiresAny?.length ? {
      conditions: {
        operator: "OR",
        conditions: choice.requiresAny.map((tag) => ({
          type: "journey.discoveryPresent",
          targetId: tag
        }))
      }
    } : {}));
    cache.set(node, rules);
  }
  const scope = {
    tenantId: "projection",
    projectId: "journey-path-query",
    projectVersion: "1.0",
    scopeType: "student"
  };
  const state = __spreadProps(__spreadValues({}, scope), {
    scope,
    version: 0,
    lastUpdated: "",
    stateValues: Object.fromEntries([...tags].map((tag) => [tag, true])),
    firedRuleIds: []
  });
  const result = engine.evaluateEvent(
    {
      id: "availability-query",
      eventType: "activity.completed",
      timestamp: "",
      tenantId: scope.tenantId,
      projectId: scope.projectId,
      actor: { type: "system" }
    },
    state,
    rules
  );
  if (result.errors?.length) throw new Error("JOURNEY_PATH_RULE_INVALID");
  return new Set(result.matchedRules);
}

// src/app/templates/journey-replay/core/journey-path.engine.ts
function emptyJourneyPath(projectVersion) {
  return {
    schemaVersion: "1.0",
    projectVersion,
    revision: 0,
    decisions: [],
    history: [],
    previousPaths: []
  };
}
function pathChoices(node, eventId) {
  return eventId === "route" ? node.choices : node.events.find((event) => event.id === eventId)?.choices ?? [];
}
function selectedPathChoice(node, decisions, eventId) {
  const decision = decisions.find((item) => item.nodeId === node.id && item.eventId === eventId);
  return pathChoices(node, eventId).find((choice) => choice.id === decision?.choiceId);
}
function resolveJourneyPath(definition, state) {
  const path = [];
  let node = definition.nodes.find((item) => item.id === definition.startNodeId);
  let provisional = false;
  while (node && path.length < 8) {
    const current = node;
    const keys = current.kind === "map" ? ["route"] : current.events.map((event) => event.id);
    const choices = keys.flatMap((key) => {
      const choice = selectedPathChoice(current, state.decisions, key);
      return choice ? [choice] : [];
    });
    path.push({ node: current, provisional, choices });
    provisional ||= choices.length < keys.length;
    const nextId = [...choices].reverse().find((choice) => choice.nextNodeId)?.nextNodeId ?? current.defaultNextId;
    node = definition.nodes.find((item) => item.id === nextId);
  }
  return path;
}
function projectJourneyResources(config, state, beforeSession = 9) {
  const choices = resolveJourneyPath(config.experience, state).filter((entry) => entry.node.session < beforeSession).flatMap((entry) => entry.choices);
  return projectPathChoices(config, choices);
}
function projectPathChoices(config, choices) {
  let resources = Object.fromEntries(
    config.resources.map((resource) => [resource.id, resource.startingValue])
  );
  const completedSteps = [];
  for (const choice of choices) {
    resources = resolveJourneyOutcome(config, { resources, completedSteps }, choice).resources;
    completedSteps.push({ choiceId: choice.id });
  }
  return {
    resources,
    completedSteps,
    choices,
    tags: new Set(choices.flatMap((choice) => choice.grants ?? []))
  };
}
function availablePathChoices(node, tags) {
  const revealed = revealedJourneyChoices(node, tags);
  return node.choices.filter((choice) => revealed.has(choice.id));
}
function applyJourneyPathEvent(config, state, event) {
  if (event.eventType !== "activity.completed" || event.projectId !== config.projectId || event.payload?.["projectVersion"] !== config.projectVersion)
    throw new Error("JOURNEY_PATH_EVENT_INVALID");
  if (state.history.some(
    (item) => item.id === event.id || event.clientEventId && item.clientEventId === event.clientEventId
  ))
    return state;
  const node = config.experience?.nodes.find((item) => item.id === event.sourceId);
  const eventId = String(event.payload["eventId"]);
  const choice = node && pathChoices(node, eventId).find((item) => item.id === event.payload?.["choiceId"]);
  if (!node || !choice) throw new Error("JOURNEY_PATH_CHOICE_INVALID");
  const currentPath = resolveJourneyPath(config.experience, state);
  if (!currentPath.some((entry) => entry.node.id === node.id))
    throw new Error("JOURNEY_PATH_PREVIEW_ONLY");
  if (node.kind === "map" && !availablePathChoices(node, projectJourneyResources(config, state, node.session).tags).some(
    (item) => item.id === choice.id
  ))
    throw new Error("JOURNEY_PATH_NOT_REVEALED");
  if (selectedPathChoice(node, state.decisions, eventId)?.id === choice.id) return state;
  const retained = state.decisions.filter((item) => {
    const entry = config.experience.nodes.find((candidate) => candidate.id === item.nodeId);
    return entry && entry.session <= node.session && !(item.nodeId === node.id && item.eventId === eventId);
  });
  return __spreadProps(__spreadValues({}, state), {
    revision: state.revision + 1,
    decisions: [...retained, { nodeId: node.id, eventId, choiceId: choice.id }],
    history: [...state.history, event].slice(-200),
    previousPaths: state.decisions.some((item) => !retained.includes(item)) ? [...state.previousPaths, state.decisions].slice(-20) : state.previousPaths
  });
}
function restoreJourneyPath(config, value) {
  const record = value;
  if (!record || record.schemaVersion !== "1.0" || record.projectVersion !== config.projectVersion || !Number.isSafeInteger(record.revision) || record.revision < 0 || !Array.isArray(record.decisions) || record.decisions.length > 32 || !Array.isArray(record.history) || record.history.length > 200 || !Array.isArray(record.previousPaths) || record.previousPaths.length > 20)
    throw new Error("JOURNEY_PATH_CACHE_INVALID");
  const validDecisions = (decisions) => Array.isArray(decisions) && decisions.length <= 32 && decisions.every((decision) => {
    if (!decision || typeof decision !== "object") return false;
    const node = config.experience.nodes.find((item) => item.id === decision.nodeId);
    return node && pathChoices(node, decision.eventId).some((choice) => choice.id === decision.choiceId);
  }) && new Set(decisions.map((item) => `${item.nodeId}:${item.eventId}`)).size === decisions.length;
  if (!validDecisions(record.decisions) || !record.previousPaths.every(validDecisions) || !record.history.every(
    (event) => event && typeof event.id === "string" && event.eventType === "activity.completed" && event.projectId === config.projectId && typeof event.timestamp === "string"
  ))
    throw new Error("JOURNEY_PATH_CACHE_INVALID");
  const state = record;
  const path = resolveJourneyPath(config.experience, state);
  if (state.decisions.some((decision) => !path.some((entry) => entry.node.id === decision.nodeId)) || path.some(
    (entry) => entry.node.kind === "map" && entry.choices.some(
      (choice) => !availablePathChoices(
        entry.node,
        projectJourneyResources(config, state, entry.node.session).tags
      ).includes(choice)
    )
  ))
    throw new Error("JOURNEY_PATH_CACHE_INVALID");
  return structuredClone(state);
}

// src/app/templates/journey-replay/runtime/journey-path.runtime.ts
var JourneyPathRuntime = class _JourneyPathRuntime {
  config = inject(JOURNEY_REPLAY_CONFIG);
  enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
  persistence = inject(JOURNEY_PATH_PERSISTENCE);
  scope = {
    tenantId: this.enrollment.tenantId,
    classId: this.enrollment.classId,
    studentId: this.enrollment.studentId,
    projectId: this.config.projectId,
    projectVersion: this.config.projectVersion
  };
  error = signal(
    "",
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saved = signal(
    true,
    ...ngDevMode ? [{ debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadFailed = false;
  state = signal(
    this.load(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  path = computed(
    () => resolveJourneyPath(this.config.experience, this.state()),
    ...ngDevMode ? [{ debugName: "path" }] : (
      /* istanbul ignore next */
      []
    )
  );
  registry = new EventRegistry();
  bus = new RuntimeEventBus(this.registry);
  constructor() {
    this.registry.register({ id: "activity.completed", version: "1.0.0", status: "core" });
  }
  choose(nodeId, eventId, choiceId) {
    const event = {
      id: crypto.randomUUID(),
      clientEventId: crypto.randomUUID(),
      eventType: "activity.completed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      tenantId: this.scope.tenantId,
      projectId: this.scope.projectId,
      actor: { type: "student", id: this.scope.studentId },
      sourceId: nodeId,
      payload: {
        capability: "branchingJourney",
        projectVersion: this.scope.projectVersion,
        eventId,
        choiceId,
        practice: true
      }
    };
    try {
      const state = applyJourneyPathEvent(this.config, this.state(), event);
      const result = this.bus.publish(__spreadProps(__spreadValues({}, this.scope), { scopeType: "student" }), event);
      if (!result.accepted)
        throw new Error("JOURNEY_PATH_EVENT_REJECTED");
      this.state.set(state);
      this.save();
      return true;
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : "JOURNEY_PATH_FAILED");
      return false;
    }
  }
  retrySave() {
    this.save();
  }
  load() {
    try {
      const value = this.persistence.load(this.scope);
      return value ? restoreJourneyPath(this.config, value) : emptyJourneyPath(this.config.projectVersion);
    } catch {
      this.loadFailed = true;
      this.error.set("Saved practice could not be read. It has been left intact. New choices stay in this session; reload to retry reading the saved record.");
      this.saved.set(false);
      return emptyJourneyPath(this.config.projectVersion);
    }
  }
  save() {
    if (this.loadFailed)
      return;
    try {
      this.persistence.save(this.scope, this.state());
      this.saved.set(true);
      this.error.set("");
    } catch {
      this.saved.set(false);
      this.error.set("This choice is only in memory. Retry saving before leaving.");
    }
  }
  static \u0275fac = function JourneyPathRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyPathRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _JourneyPathRuntime, factory: _JourneyPathRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyPathRuntime, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/journey-replay/ui/game/journey-world.tokens.ts
var JOURNEY_WORLD_LOADER = new InjectionToken(
  "JOURNEY_WORLD_LOADER",
  {
    providedIn: "root",
    factory: () => () => import("./chunk-ACWGFNTC.js").then((module) => module.mountJourneyLocationWorld)
  }
);

// src/app/templates/journey-replay/ui/journey-location-scene.component.ts
var _c0 = ["worldHost"];
var _forTrack0 = ($index, $item) => $item.id;
function JourneyLocationSceneComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275text(1, " The interactive artwork could not load. ");
    \u0275\u0275domElementStart(2, "button", 10);
    \u0275\u0275domListener("click", function JourneyLocationSceneComponent_Conditional_1_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275text(3, "Reload scene");
    \u0275\u0275domElementEnd()();
  }
}
function JourneyLocationSceneComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 7, 0)(2, "div", 8);
    \u0275\u0275conditionalCreate(3, JourneyLocationSceneComponent_Conditional_1_Conditional_3_Template, 4, 0, "div", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", "url(" + ctx.backdrop + ")");
    \u0275\u0275attribute("data-renderer-status", ctx_r1.worldStatus())("aria-label", ctx_r1.node().title + ". Interactive ship and shore. Use the marked objects to inspect events.");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.worldStatus() === "error" ? 3 : -1);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 71)(1, "path", 72)(2, "path", 73)(3, "path", 74)(4, "path", 75);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 76)(1, "path", 77)(2, "path", 78)(3, "path", 79);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 80)(1, "path", 81);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_31_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "path", 87)(2, "path", 88)(3, "path", 89);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const building_r3 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(" + (505 + building_r3 * 66) + " " + (251 + building_r3 % 3 * 9) + ")");
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275repeaterCreate(1, JourneyLocationSceneComponent_Conditional_2_Conditional_31_For_2_Template, 4, 1, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElement(3, "path", 82)(4, "path", 83)(5, "path", 84)(6, "path", 85)(7, "path", 86);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.buildings);
  }
}
function JourneyLocationSceneComponent_Conditional_2_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 39);
  }
  if (rf & 2) {
    const wave_r4 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(" + wave_r4 % 2 * -55 + " " + wave_r4 * 56 + ")");
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 60);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 90)(1, "path", 91);
  }
}
function JourneyLocationSceneComponent_Conditional_2_For_60_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "path", 92)(2, "path", 93)(3, "ellipse", 94);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const barrel_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("transform", "translate(" + (305 + barrel_r5 * 34) + " 514)");
  }
}
function JourneyLocationSceneComponent_Conditional_2_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyLocationSceneComponent_Conditional_2_For_60_Conditional_0_Template, 4, 1, ":svg:g");
  }
  if (rf & 2) {
    const barrel_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(barrel_r5 < 1 || ctx_r1.effects().has("water") || ctx_r1.effects().has("exchange") ? 0 : -1);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 63);
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 66);
    \u0275\u0275domElement(1, "path", 95)(2, "circle", 96)(3, "circle", 97)(4, "circle", 98);
    \u0275\u0275domElementEnd();
  }
}
function JourneyLocationSceneComponent_Conditional_2_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 99);
    \u0275\u0275domElementStart(1, "g", 100);
    \u0275\u0275domElement(2, "path", 101);
    \u0275\u0275domElementEnd();
  }
}
function JourneyLocationSceneComponent_Conditional_2_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 68);
  }
  if (rf & 2) {
    const bird_r6 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(" + (130 + bird_r6 * 48) + " " + (160 + bird_r6 * 16) + ")");
  }
}
function JourneyLocationSceneComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 2)(1, "defs")(2, "linearGradient", 11);
    \u0275\u0275domElement(3, "stop", 12)(4, "stop", 13)(5, "stop", 14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "linearGradient", 15);
    \u0275\u0275domElement(7, "stop", 16)(8, "stop", 17)(9, "stop", 18);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "linearGradient", 19);
    \u0275\u0275domElement(11, "stop", 20)(12, "stop", 21)(13, "stop", 22);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "linearGradient", 23);
    \u0275\u0275domElement(15, "stop", 24)(16, "stop", 25)(17, "stop", 26);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "pattern", 27);
    \u0275\u0275domElement(19, "path", 28);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "pattern", 29);
    \u0275\u0275domElement(21, "path", 30);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(22, "rect", 31)(23, "circle", 32);
    \u0275\u0275domElementStart(24, "g", 33);
    \u0275\u0275domElement(25, "path", 34)(26, "path", 35);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(27, "path", 36);
    \u0275\u0275conditionalCreate(28, JourneyLocationSceneComponent_Conditional_2_Conditional_28_Template, 5, 0)(29, JourneyLocationSceneComponent_Conditional_2_Conditional_29_Template, 4, 0)(30, JourneyLocationSceneComponent_Conditional_2_Conditional_30_Template, 2, 0);
    \u0275\u0275conditionalCreate(31, JourneyLocationSceneComponent_Conditional_2_Conditional_31_Template, 8, 0, ":svg:g");
    \u0275\u0275domElement(32, "rect", 37);
    \u0275\u0275domElementStart(33, "g", 38);
    \u0275\u0275repeaterCreate(34, JourneyLocationSceneComponent_Conditional_2_For_35_Template, 1, 1, ":svg:path", 39, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "g", 40);
    \u0275\u0275domElement(37, "path", 41)(38, "path", 42)(39, "circle", 43)(40, "circle", 44)(41, "path", 45);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(42, "g", 46);
    \u0275\u0275domElement(43, "ellipse", 47)(44, "path", 48)(45, "path", 49)(46, "path", 50)(47, "path", 51)(48, "path", 52)(49, "path", 53)(50, "path", 54);
    \u0275\u0275domElementStart(51, "g", 55);
    \u0275\u0275domElement(52, "path", 56)(53, "path", 57)(54, "path", 58)(55, "path", 59);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(56, JourneyLocationSceneComponent_Conditional_2_Conditional_56_Template, 1, 0, ":svg:path", 60);
    \u0275\u0275conditionalCreate(57, JourneyLocationSceneComponent_Conditional_2_Conditional_57_Template, 2, 0);
    \u0275\u0275domElement(58, "path", 61);
    \u0275\u0275repeaterCreate(59, JourneyLocationSceneComponent_Conditional_2_For_60_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElement(61, "path", 62);
    \u0275\u0275conditionalCreate(62, JourneyLocationSceneComponent_Conditional_2_Conditional_62_Template, 1, 0, ":svg:path", 63);
    \u0275\u0275domElement(63, "circle", 64)(64, "circle", 65);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(65, JourneyLocationSceneComponent_Conditional_2_Conditional_65_Template, 5, 0, ":svg:g", 66);
    \u0275\u0275conditionalCreate(66, JourneyLocationSceneComponent_Conditional_2_Conditional_66_Template, 3, 0);
    \u0275\u0275domElementStart(67, "g", 67);
    \u0275\u0275repeaterCreate(68, JourneyLocationSceneComponent_Conditional_2_For_69_Template, 1, 1, ":svg:path", 68, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(70, "path", 69)(71, "path", 70);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.node().title + ". Inspect the marked objects; event options change the ship and shore.");
    \u0275\u0275advance(28);
    \u0275\u0275conditional(ctx_r1.node().scene === "island" || ctx_r1.node().scene === "cape" ? 28 : ctx_r1.node().scene === "river" ? 29 : 30);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.town() ? 31 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.waves);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("exchanged", ctx_r1.effects().has("exchange") || ctx_r1.effects().has("water"));
    \u0275\u0275advance(20);
    \u0275\u0275conditional(ctx_r1.damagedSail() && !ctx_r1.effects().has("repair") && !ctx_r1.effects().has("rest") ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.effects().has("repair") ? 57 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.barrels);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.effects().has("charts") ? 62 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.effects().has("charts") ? 65 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.storm() ? 66 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.skyBirds);
  }
}
function JourneyLocationSceneComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 102);
    \u0275\u0275domListener("click", function JourneyLocationSceneComponent_For_8_Template_button_click_0_listener() {
      const event_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspected.emit(event_r8.id));
    });
    \u0275\u0275domElementStart(1, "span", 103);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "b");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const event_r8 = ctx.$implicit;
    const \u0275$index_228_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", event_r8.object.x, "%")("top", event_r8.object.y, "%");
    \u0275\u0275classProp("active", ctx_r1.activeEventId() === event_r8.id)("resolved", ctx_r1.resolved(event_r8.id));
    \u0275\u0275attribute("aria-label", "Inspect " + event_r8.label)("aria-pressed", ctx_r1.activeEventId() === event_r8.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.resolved(event_r8.id) ? "\u2713" : "0" + (\u0275$index_228_r9 + 1));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r8.label);
  }
}
function JourneyLocationSceneComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const event_r10 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2316 ", event_r10.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", event_r10.observation, " ");
  }
}
var JourneyLocationSceneComponent = class _JourneyLocationSceneComponent {
  loader = inject(JOURNEY_WORLD_LOADER);
  injector = inject(Injector);
  worldHost = viewChild(
    "worldHost",
    ...ngDevMode ? [{ debugName: "worldHost" }] : (
      /* istanbul ignore next */
      []
    )
  );
  worldStatus = signal(
    "loading",
    ...ngDevMode ? [{ debugName: "worldStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attempt = signal(
    0,
    ...ngDevMode ? [{ debugName: "attempt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  node = input.required(
    ...ngDevMode ? [{ debugName: "node" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selections = input(
    [],
    ...ngDevMode ? [{ debugName: "selections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeEventId = input(
    ...ngDevMode ? [void 0, { debugName: "activeEventId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspected = output();
  paused = signal(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  effects = computed(
    () => new Set(this.selections().map((choice) => choice.effect)),
    ...ngDevMode ? [{ debugName: "effects" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storm = computed(
    () => this.node().scene === "storm" || this.node().scene === "cape",
    ...ngDevMode ? [{ debugName: "storm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  damagedSail = computed(
    () => this.node().events.some((event) => event.object.icon === "sail"),
    ...ngDevMode ? [{ debugName: "damagedSail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  town = computed(
    () => ["harbor", "home"].includes(this.node().scene ?? ""),
    ...ngDevMode ? [{ debugName: "town" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedEvent = computed(
    () => this.node().events.find((event) => event.id === this.activeEventId()),
    ...ngDevMode ? [{ debugName: "inspectedEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  skyBirds = [0, 1, 2];
  waves = [0, 1, 2, 3, 4, 5];
  buildings = [0, 1, 2, 3, 4, 5, 6];
  barrels = [0, 1, 2, 3];
  reload() {
    this.attempt.update((value) => value + 1);
  }
  resolved(eventId) {
    return this.node().events.find((event) => event.id === eventId)?.choices.some((choice) => this.selections().some((selected) => selected.id === choice.id)) ?? false;
  }
  constructor() {
    effect((onCleanup) => {
      const node = this.node();
      this.attempt();
      if (!node.sceneArt)
        return;
      this.worldStatus.set("loading");
      let disposed = false, handle;
      const scheduled = untracked(() => afterNextRender(() => {
        const parent = this.worldHost()?.nativeElement;
        if (!parent)
          return;
        void this.loader().then((mount) => {
          if (disposed)
            return;
          handle = mount(parent, node, () => ({
            effects: this.effects(),
            paused: this.paused(),
            reducedMotion: this.reducedMotion(),
            activeEventId: this.activeEventId()
          }), {
            ready: () => this.worldStatus.set("ready"),
            failed: () => this.worldStatus.set("error"),
            inspect: (id) => this.inspected.emit(id)
          });
        }).catch(() => {
          if (!disposed)
            this.worldStatus.set("error");
        });
      }, { injector: this.injector }));
      onCleanup(() => {
        disposed = true;
        scheduled.destroy();
        handle?.destroy();
      });
    });
  }
  symbol(icon) {
    return { compass: "\u2316", cargo: "\u25A5", sail: "\u2691", shore: "\u21C4", log: "\u25A4" }[icon] ?? "\u2022";
  }
  static \u0275fac = function JourneyLocationSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyLocationSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyLocationSceneComponent, selectors: [["app-journey-location-scene"]], viewQuery: function JourneyLocationSceneComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.worldHost, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { node: [1, "node"], selections: [1, "selections"], activeEventId: [1, "activeEventId"] }, outputs: { inspected: "inspected" }, decls: 12, vars: 13, consts: [["worldHost", ""], [1, "location-scene"], ["viewBox", "0 0 1000 760", "preserveAspectRatio", "xMidYMid slice", "role", "img", 1, "scene-art"], [1, "place-label"], ["type", "button", 1, "object-marker", 3, "active", "resolved", "left", "top"], ["role", "status", 1, "observation"], ["type", "button", 1, "motion-control", 3, "click"], ["role", "img", 1, "phaser-world"], ["aria-hidden", "true", 1, "scene-vignette"], ["role", "alert", 1, "world-error"], ["type", "button", 3, "click"], ["id", "location-sky", "x2", "0", "y2", "1"], ["stop-color", "#769eab"], ["offset", ".68", "stop-color", "#d4ceaf"], ["offset", "1", "stop-color", "#edddad"], ["id", "location-ocean", "x2", "0.2", "y2", "1"], ["stop-color", "#427f88"], ["offset", ".5", "stop-color", "#286570"], ["offset", "1", "stop-color", "#143943"], ["id", "location-sail", "x2", "1", "y2", ".5"], ["stop-color", "#fbefc3"], ["offset", ".55", "stop-color", "#d5be87"], ["offset", "1", "stop-color", "#f2dfae"], ["id", "location-hull", "x2", "0", "y2", "1"], ["stop-color", "#b87942"], ["offset", ".45", "stop-color", "#6f472f"], ["offset", "1", "stop-color", "#302c27"], ["id", "location-water", "width", "100", "height", "36", "patternUnits", "userSpaceOnUse"], ["d", "M2 17q16-5 32 0m26 8q12-4 25 0", "stroke", "#d4e5d0", "stroke-width", "1", "opacity", ".16"], ["id", "location-wood", "width", "70", "height", "18", "patternUnits", "userSpaceOnUse"], ["d", "M0 17H70M35 0v17", "stroke", "#1f302a", "opacity", ".3"], ["width", "1000", "height", "760", "fill", "url(#location-sky)"], ["cx", "746", "cy", "139", "r", "58", "fill", "#f3df9e", "opacity", ".75"], ["fill", "#f2ecda", "opacity", ".45", 1, "clouds"], ["d", "M-55 140q65-68 133-19 66-81 140-22 77-27 125 46z"], ["d", "M597 78q38-40 73-12 35-50 88-11 57-14 92 29z"], ["d", "M0 290Q125 260 235 296T520 280T800 289T1000 274V760H0Z", "fill", "url(#location-ocean)"], ["y", "385", "width", "1000", "height", "375", "fill", "url(#location-water)"], ["fill", "none", "stroke", "#bdd8c9", "stroke-width", "2", "opacity", ".35", 1, "sea-lines"], ["d", "M-80 406q65-13 127 0t126 0m105 10q68-14 135 0t135 0m100-15q70-13 140 0t140 0"], [1, "small-boat"], ["d", "M717 478q55 15 111-4l-17 25-72 1z", "fill", "#5d4431"], ["d", "M754 459v24m38-27v25", "stroke", "#374939", "stroke-width", "9"], ["cx", "754", "cy", "452", "r", "7", "fill", "#9c7653"], ["cx", "792", "cy", "449", "r", "7", "fill", "#9c7653"], ["d", "M777 470l48 41", "stroke", "#d1ad73", "stroke-width", "4"], [1, "ship"], ["cx", "400", "cy", "614", "rx", "225", "ry", "21", "fill", "#102f36", "opacity", ".35"], ["d", "M204 523q185 46 400-22l-41 97q-43 45-248 10z", "fill", "url(#location-hull)"], ["d", "M204 523q185 46 400-22l-8 24q-200 61-377 21z", "fill", "#dfba79"], ["d", "M222 550q170 52 367-17M242 576q155 44 335-17M270 598q140 31 293-16", "fill", "none", "stroke", "#d3a365", "stroke-width", "4", "opacity", ".5"], ["d", "M510 486h83v41l-80 21zM222 506h74v47l-74-16z", "fill", "#a88251"], ["d", "M516 491v-21m20 18v-22m20 17v-22m20 13v-19M518 474l64-21", "fill", "none", "stroke", "#d3c092", "stroke-width", "4"], ["d", "M385 212v345m-94-211v202m195-210v204", "stroke", "#5d513b", "stroke-width", "10"], ["d", "M207 525l177-309 220 287M293 352l-79 173m273-185 96 174", "fill", "none", "stroke", "#544e3c", "stroke-width", "2"], [1, "canvas"], ["d", "M394 237q96 15 159 196-85-15-159-4z", "fill", "url(#location-sail)"], ["d", "M374 246q-95 55-104 191 44-30 104-12z", "fill", "url(#location-sail)"], ["d", "M482 351q57 37 78 131l-78-18zM283 361q-59 43-64 101l64-7z", "fill", "#dbcd9f"], ["d", "M414 246q17 87 4 180m39-159q9 96 5 159M309 315q17 30 3 111", "fill", "none", "stroke", "#9d966f", "stroke-width", "2", "opacity", ".6"], ["d", "M452 322l-22 21 25 10-31 38 47-31-20-13 20-33z", "fill", "#3b6268", 1, "sail-tear"], ["d", "M385 213l54 11-54 20z", "fill", "#b66c4d"], ["d", "M447 510l42-9 18 22-50 11z", "fill", "#eee2b5", "stroke", "#76694c"], ["d", "M455 514l18 3 9-10 15 12", "fill", "none", "stroke", "#347d80", "stroke-width", "2"], ["cx", "538", "cy", "531", "r", "10", "fill", "#273e38"], ["cx", "281", "cy", "551", "r", "8", "fill", "#263f3a"], ["fill", "none", "stroke", "#f1d188", "stroke-width", "2", "stroke-dasharray", "7 8", 1, "bearings"], ["fill", "none", "stroke", "#3d5f5e", "stroke-width", "3", "opacity", ".8"], ["d", "M0 0q10-10 22 1 10-11 21-1"], ["d", "M0 718q94-38 178-14 61-30 136 1l49 55H0", "fill", "#253f39"], ["d", "M0 718q71-16 123 2l32 40H0", "fill", "#526451"], ["d", "M540 300l81-69 28-73 49-86 44 71 29 80 66-35 65 69 98 27v87z", "fill", "#60705c"], ["d", "M564 307l93-63 40-99 17 73 50 45 64-39 68 67 104 21v66z", "fill", "#80936b"], ["d", "M616 288l55-78 21 18 8-80 26 80 35 36-60-14z", "fill", "#a0a075"], ["d", "M580 326q130-22 210 0t210 4v41q-143-25-207-19t-213-26", "fill", "#d7c69c"], ["d", "M870 338l37-20 29 11 16-21 48 38v42z", "fill", "#374d49"], ["d", "M410 296q75-102 170-25 68-108 157-43 117-43 263 41v125L667 363z", "fill", "#426854"], ["d", "M568 314q89-63 157-3l275-14v68l-313 5z", "fill", "#779365"], ["d", "M680 334q83-16 161 14t159-1v38q-71 21-191-18t-137-2", "fill", "#d2bd86"], ["d", "M902 240q-31 67-21 102m9-77q-43-25-59 7m61-9q30-35 53-19m-55 15q-1-45-26-44", "fill", "none", "stroke", "#304e3c", "stroke-width", "10"], ["d", "M430 299q85-56 166-18 91-55 197-12l207 7v96H450z", "fill", "#768875"], ["d", "M427 335q168-10 263 17l310-29v45l-310 13z", "fill", "#d1bd89"], ["d", "M842 224v104h36V224l-18-32z", "fill", "#b7b395"], ["d", "M854 245h12v28h-12", "fill", "#3d5654"], ["d", "M698 366l198 0-86 66-210-8z", "fill", "#9c865b"], ["d", "M695 376l200-2m-222 12h205m-224 12h201m-227 12h207", "stroke", "#5c6451", "stroke-width", "3"], ["d", "M650 411v53m65-42v52m73-51v40m79-68v41", "stroke", "#605443", "stroke-width", "12"], ["d", "M0 20h53v56H0z", "fill", "#d4c5a3"], ["d", "M-5 22L25 0l34 22z", "fill", "#a16d4c"], ["d", "M9 38h8v12H9m25-12h8v12h-8M23 58h10v18H23", "fill", "#3c5652"], ["d", "M422 320l47-5 18 63-54 5z", "fill", "#eee0b5", "stroke", "#816943", "stroke-width", "2", "stroke-dasharray", "4 5"], ["d", "M429 328l43 43m-35 4 32-51", "stroke", "#b39d6d"], ["d", "M-12 0q-5 18 0 35h22q5-18 0-35z", "fill", "#bd965c", "stroke", "#5d573e", "stroke-width", "2"], ["d", "M-12 8h22m-22 18h22", "stroke", "#54625a", "stroke-width", "4"], ["cx", "-1", "cy", "0", "rx", "11", "ry", "4", "fill", "#d3b882"], ["d", "M473 508L660 239M473 508L850 314"], ["cx", "660", "cy", "239", "r", "18"], ["cx", "850", "cy", "314", "r", "18"], ["cx", "473", "cy", "508", "r", "23"], ["d", "M-20 25q103-58 194 8 56-38 118 5 102-46 188 25 112-29 165 31 97-33 174 18 92-36 181 4v-116H0", "fill", "#344e55", "opacity", ".7"], ["stroke", "#c7dfd8", "stroke-width", "2", "opacity", ".35", 1, "rain"], ["d", "M90 120l-35 120m140-82-35 120m250-125-35 120m275-130-35 120m240-60-35 120M155 375l-35 120m150-61-35 120m422-80-35 120m215-7-35 120"], ["type", "button", 1, "object-marker", 3, "click"], ["aria-hidden", "true"]], template: function JourneyLocationSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, JourneyLocationSceneComponent_Conditional_1_Template, 4, 5)(2, JourneyLocationSceneComponent_Conditional_2_Template, 72, 10, ":svg:svg", 2);
      \u0275\u0275domElementStart(3, "span", 3);
      \u0275\u0275text(4);
      \u0275\u0275domElementStart(5, "small");
      \u0275\u0275text(6, "Fictional voyage \xB7 1501");
      \u0275\u0275domElementEnd()();
      \u0275\u0275repeaterCreate(7, JourneyLocationSceneComponent_For_8_Template, 5, 12, "button", 4, _forTrack0);
      \u0275\u0275conditionalCreate(9, JourneyLocationSceneComponent_Conditional_9_Template, 4, 2, "div", 5);
      \u0275\u0275domElementStart(10, "button", 6);
      \u0275\u0275domListener("click", function JourneyLocationSceneComponent_Template_button_click_10_listener() {
        return ctx.paused.set(!ctx.paused());
      });
      \u0275\u0275text(11);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_7_0;
      \u0275\u0275classProp("storm", ctx.storm())("paused", ctx.paused())("resting", ctx.effects().has("rest"));
      \u0275\u0275attribute("data-scene", ctx.node().scene);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_4_0 = ctx.node().sceneArt) ? 1 : 2, tmp_4_0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.node().title, " ");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.node().events);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_7_0 = ctx.inspectedEvent()) ? 9 : -1, tmp_7_0);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.paused())("aria-label", ctx.paused() ? "Resume scene motion" : "Pause scene motion");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.paused() ? "\u25B7" : "\u2161", " ");
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.location-scene[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 390px;\n  position: relative;\n  overflow: hidden;\n  background: #356b72;\n  isolation: isolate;\n}\n.scene-art[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.phaser-world[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-size: cover;\n  background-position: center;\n}\n.phaser-world[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  display: block;\n}\n.scene-vignette[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 100px rgba(2, 22, 35, 0.4392156863);\n  background:\n    linear-gradient(\n      rgba(6, 34, 44, 0.5490196078),\n      transparent 24%,\n      transparent 78%,\n      rgba(3, 28, 40, 0.4));\n}\n.world-error[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  left: 20px;\n  top: 50%;\n  padding: 16px;\n  max-width: 280px;\n  color: #ffedce;\n  background: #17333b;\n  border: 1px solid #b89e67;\n  font: 13px Arial, sans-serif;\n}\n.world-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  padding: 10px;\n  margin-top: 10px;\n}\n.storm[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n  filter: saturate(0.8) brightness(0.85);\n}\n.place-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 26px;\n  left: 28px;\n  max-width: calc(100% - 100px);\n  color: #fff0c5;\n  font: 500 clamp(18px, 2.1vw, 29px)/1.25 Georgia, serif;\n  text-shadow: 0 2px 10px rgba(2, 21, 30, 0.8784313725);\n}\n.place-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  font: 10px/1.3 Arial, sans-serif;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.storm[_ngcontent-%COMP%]   .place-label[_ngcontent-%COMP%] {\n  color: #f4e5bd;\n}\n.object-marker[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  transform: translate(-50%, -50%);\n  border: 1px solid #e9d293;\n  border-radius: 24px;\n  min-width: 46px;\n  min-height: 46px;\n  padding: 7px;\n  background: rgba(20, 47, 54, 0.9294117647);\n  color: #f4e3b9;\n  box-shadow: 0 5px 16px rgba(5, 40, 48, 0.3137254902);\n  cursor: pointer;\n  font: 12px/1.2 Arial, sans-serif;\n}\n.object-marker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  font: 600 12px Georgia, serif;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      145deg,\n      #d9ba74,\n      #8d7040);\n  color: #132d35;\n  border: 1px solid #f2df9c;\n  box-shadow: 0 0 0 5px rgba(192, 166, 108, 0.0980392157);\n}\n.object-marker.resolved[_ngcontent-%COMP%] {\n  border-color: #b6d5af;\n}\n.object-marker.resolved[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #b7d1a2;\n}\n.object-marker[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(100% + 7px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: max-content;\n  max-width: 125px;\n  padding: 5px 8px;\n  border-radius: 4px;\n  background: rgba(22, 52, 59, 0.9333333333);\n  color: #f4e3b9;\n  text-align: center;\n}\n.object-marker[_ngcontent-%COMP%]:hover, \n.object-marker.active[_ngcontent-%COMP%] {\n  background: #e8c580;\n  color: #173436;\n}\n.object-marker.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #f3deaf;\n}\n.observation[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  right: 22px;\n  width: min(300px, 48%);\n  padding: 14px 17px;\n  background: rgba(20, 46, 53, 0.9215686275);\n  color: #eff0dc;\n  border-left: 2px solid #e8c580;\n  border-radius: 3px;\n  font: 12px/1.55 Arial, sans-serif;\n}\n.observation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #e8c580;\n  margin-bottom: 6px;\n  font-weight: 700;\n}\n.motion-control[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 18px;\n  top: 18px;\n  width: 44px;\n  height: 44px;\n  border: 1px solid #b8ccc2;\n  border-radius: 50%;\n  background: rgba(24, 60, 66, 0.7803921569);\n  color: #fff0c7;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f4e5ad;\n  outline-offset: 4px;\n}\n.ship[_ngcontent-%COMP%] {\n  transform-origin: 400px 565px;\n  animation: _ngcontent-%COMP%_vessel 8s ease-in-out infinite alternate;\n}\n.small-boat[_ngcontent-%COMP%] {\n  transition: transform 1.4s ease;\n}\n.small-boat.exchanged[_ngcontent-%COMP%] {\n  transform: translate(-117px, 47px);\n}\n.resting[_ngcontent-%COMP%]   .canvas[_ngcontent-%COMP%] {\n  transform: scaleY(0.62);\n  transform-origin: 385px 429px;\n}\n.canvas[_ngcontent-%COMP%] {\n  transition: transform 1s;\n}\n.sea-lines[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_water 11s ease-in-out infinite alternate;\n}\n.rain[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_rainfall 1.7s linear infinite;\n}\n.paused[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  animation-play-state: paused !important;\n}\n@keyframes _ngcontent-%COMP%_vessel {\n  from {\n    transform: rotate(-0.8deg) translateY(-3px);\n  }\n  to {\n    transform: rotate(0.8deg) translateY(4px);\n  }\n}\n@keyframes _ngcontent-%COMP%_water {\n  to {\n    transform: translateX(32px);\n  }\n}\n@keyframes _ngcontent-%COMP%_rainfall {\n  to {\n    transform: translate(-20px, 35px);\n  }\n}\n@media (max-width: 700px) {\n  .place-label[_ngcontent-%COMP%] {\n    top: 18px;\n    left: 18px;\n    font-size: 19px;\n  }\n  .place-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .object-marker[_ngcontent-%COMP%] {\n    padding: 4px;\n  }\n  .object-marker[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    position: absolute;\n    bottom: calc(100% + 7px);\n    left: 50%;\n    transform: translateX(-50%);\n    width: 110px;\n    padding: 5px;\n    border-radius: 4px;\n    background: rgba(22, 52, 59, 0.9333333333);\n    color: #f4e3b9;\n    font-size: 10px;\n    text-align: center;\n  }\n  .observation[_ngcontent-%COMP%] {\n    right: 12px;\n    bottom: 12px;\n    width: 56%;\n    font-size: 10px;\n    padding: 9px 11px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=journey-location-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyLocationSceneComponent, [{
    type: Component,
    args: [{ selector: "app-journey-location-scene", changeDetection: ChangeDetectionStrategy.OnPush, template: `<div
  class="location-scene"
  [class.storm]="storm()"
  [class.paused]="paused()"
  [class.resting]="effects().has('rest')"
  [attr.data-scene]="node().scene"
>
  @if (node().sceneArt; as art) {
    <div
      #worldHost
      class="phaser-world"
      [style.background-image]="'url(' + art.backdrop + ')'"
      [attr.data-renderer-status]="worldStatus()"
      role="img"
      [attr.aria-label]="
        node().title + '. Interactive ship and shore. Use the marked objects to inspect events.'
      "
    ></div>
    <div class="scene-vignette" aria-hidden="true"></div>
    @if (worldStatus() === 'error') {
      <div class="world-error" role="alert">
        The interactive artwork could not load.
        <button type="button" (click)="reload()">Reload scene</button>
      </div>
    }
  } @else {
    <svg
      class="scene-art"
      viewBox="0 0 1000 760"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      [attr.aria-label]="
        node().title + '. Inspect the marked objects; event options change the ship and shore.'
      "
    >
      <defs>
        <linearGradient id="location-sky" x2="0" y2="1">
          <stop stop-color="#769eab" />
          <stop offset=".68" stop-color="#d4ceaf" />
          <stop offset="1" stop-color="#edddad" />
        </linearGradient>
        <linearGradient id="location-ocean" x2="0.2" y2="1">
          <stop stop-color="#427f88" />
          <stop offset=".5" stop-color="#286570" />
          <stop offset="1" stop-color="#143943" />
        </linearGradient>
        <linearGradient id="location-sail" x2="1" y2=".5">
          <stop stop-color="#fbefc3" />
          <stop offset=".55" stop-color="#d5be87" />
          <stop offset="1" stop-color="#f2dfae" />
        </linearGradient>
        <linearGradient id="location-hull" x2="0" y2="1">
          <stop stop-color="#b87942" />
          <stop offset=".45" stop-color="#6f472f" />
          <stop offset="1" stop-color="#302c27" />
        </linearGradient>
        <pattern id="location-water" width="100" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M2 17q16-5 32 0m26 8q12-4 25 0"
            stroke="#d4e5d0"
            stroke-width="1"
            opacity=".16"
          />
        </pattern>
        <pattern id="location-wood" width="70" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 17H70M35 0v17" stroke="#1f302a" opacity=".3" />
        </pattern>
      </defs>
      <rect width="1000" height="760" fill="url(#location-sky)" />
      <circle cx="746" cy="139" r="58" fill="#f3df9e" opacity=".75" />
      <g class="clouds" fill="#f2ecda" opacity=".45">
        <path d="M-55 140q65-68 133-19 66-81 140-22 77-27 125 46z" />
        <path d="M597 78q38-40 73-12 35-50 88-11 57-14 92 29z" />
      </g>
      <path
        d="M0 290Q125 260 235 296T520 280T800 289T1000 274V760H0Z"
        fill="url(#location-ocean)"
      />
      @if (node().scene === 'island' || node().scene === 'cape') {
        <path d="M540 300l81-69 28-73 49-86 44 71 29 80 66-35 65 69 98 27v87z" fill="#60705c" />
        <path d="M564 307l93-63 40-99 17 73 50 45 64-39 68 67 104 21v66z" fill="#80936b" />
        <path d="M616 288l55-78 21 18 8-80 26 80 35 36-60-14z" fill="#a0a075" />
        <path d="M580 326q130-22 210 0t210 4v41q-143-25-207-19t-213-26" fill="#d7c69c" />
        <path d="M870 338l37-20 29 11 16-21 48 38v42z" fill="#374d49" />
      } @else if (node().scene === 'river') {
        <path d="M410 296q75-102 170-25 68-108 157-43 117-43 263 41v125L667 363z" fill="#426854" />
        <path d="M568 314q89-63 157-3l275-14v68l-313 5z" fill="#779365" />
        <path d="M680 334q83-16 161 14t159-1v38q-71 21-191-18t-137-2" fill="#d2bd86" />
        <path
          d="M902 240q-31 67-21 102m9-77q-43-25-59 7m61-9q30-35 53-19m-55 15q-1-45-26-44"
          fill="none"
          stroke="#304e3c"
          stroke-width="10"
        />
      } @else {
        <path d="M430 299q85-56 166-18 91-55 197-12l207 7v96H450z" fill="#768875" />
        <path d="M427 335q168-10 263 17l310-29v45l-310 13z" fill="#d1bd89" />
      }
      @if (town()) {
        <g>
          @for (building of buildings; track building) {
            <g
              [attr.transform]="
                'translate(' + (505 + building * 66) + ' ' + (251 + (building % 3) * 9) + ')'
              "
            >
              <path d="M0 20h53v56H0z" fill="#d4c5a3" />
              <path d="M-5 22L25 0l34 22z" fill="#a16d4c" />
              <path d="M9 38h8v12H9m25-12h8v12h-8M23 58h10v18H23" fill="#3c5652" />
            </g>
          }
          <path d="M842 224v104h36V224l-18-32z" fill="#b7b395" />
          <path d="M854 245h12v28h-12" fill="#3d5654" />
          <path d="M698 366l198 0-86 66-210-8z" fill="#9c865b" />
          <path
            d="M695 376l200-2m-222 12h205m-224 12h201m-227 12h207"
            stroke="#5c6451"
            stroke-width="3"
          />
          <path d="M650 411v53m65-42v52m73-51v40m79-68v41" stroke="#605443" stroke-width="12" />
        </g>
      }
      <rect y="385" width="1000" height="375" fill="url(#location-water)" />
      <g class="sea-lines" fill="none" stroke="#bdd8c9" stroke-width="2" opacity=".35">
        @for (wave of waves; track wave) {
          <path
            [attr.transform]="'translate(' + (wave % 2) * -55 + ' ' + wave * 56 + ')'"
            d="M-80 406q65-13 127 0t126 0m105 10q68-14 135 0t135 0m100-15q70-13 140 0t140 0"
          />
        }
      </g>
      <g class="small-boat" [class.exchanged]="effects().has('exchange') || effects().has('water')">
        <path d="M717 478q55 15 111-4l-17 25-72 1z" fill="#5d4431" />
        <path d="M754 459v24m38-27v25" stroke="#374939" stroke-width="9" />
        <circle cx="754" cy="452" r="7" fill="#9c7653" />
        <circle cx="792" cy="449" r="7" fill="#9c7653" />
        <path d="M777 470l48 41" stroke="#d1ad73" stroke-width="4" />
      </g>
      <g class="ship">
        <ellipse cx="400" cy="614" rx="225" ry="21" fill="#102f36" opacity=".35" />
        <path d="M204 523q185 46 400-22l-41 97q-43 45-248 10z" fill="url(#location-hull)" />
        <path d="M204 523q185 46 400-22l-8 24q-200 61-377 21z" fill="#dfba79" />
        <path
          d="M222 550q170 52 367-17M242 576q155 44 335-17M270 598q140 31 293-16"
          fill="none"
          stroke="#d3a365"
          stroke-width="4"
          opacity=".5"
        />
        <path d="M510 486h83v41l-80 21zM222 506h74v47l-74-16z" fill="#a88251" />
        <path
          d="M516 491v-21m20 18v-22m20 17v-22m20 13v-19M518 474l64-21"
          fill="none"
          stroke="#d3c092"
          stroke-width="4"
        />
        <path d="M385 212v345m-94-211v202m195-210v204" stroke="#5d513b" stroke-width="10" />
        <path
          d="M207 525l177-309 220 287M293 352l-79 173m273-185 96 174"
          fill="none"
          stroke="#544e3c"
          stroke-width="2"
        />
        <g class="canvas">
          <path d="M394 237q96 15 159 196-85-15-159-4z" fill="url(#location-sail)" />
          <path d="M374 246q-95 55-104 191 44-30 104-12z" fill="url(#location-sail)" />
          <path d="M482 351q57 37 78 131l-78-18zM283 361q-59 43-64 101l64-7z" fill="#dbcd9f" />
          <path
            d="M414 246q17 87 4 180m39-159q9 96 5 159M309 315q17 30 3 111"
            fill="none"
            stroke="#9d966f"
            stroke-width="2"
            opacity=".6"
          />
        </g>
        @if (damagedSail() && !effects().has('repair') && !effects().has('rest')) {
          <path
            class="sail-tear"
            d="M452 322l-22 21 25 10-31 38 47-31-20-13 20-33z"
            fill="#3b6268"
          />
        }
        @if (effects().has('repair')) {
          <path
            d="M422 320l47-5 18 63-54 5z"
            fill="#eee0b5"
            stroke="#816943"
            stroke-width="2"
            stroke-dasharray="4 5"
          />
          <path d="M429 328l43 43m-35 4 32-51" stroke="#b39d6d" />
        }
        <path d="M385 213l54 11-54 20z" fill="#b66c4d" />
        @for (barrel of barrels; track barrel) {
          @if (barrel < 1 || effects().has('water') || effects().has('exchange')) {
            <g [attr.transform]="'translate(' + (305 + barrel * 34) + ' 514)'">
              <path
                d="M-12 0q-5 18 0 35h22q5-18 0-35z"
                fill="#bd965c"
                stroke="#5d573e"
                stroke-width="2"
              />
              <path d="M-12 8h22m-22 18h22" stroke="#54625a" stroke-width="4" />
              <ellipse cx="-1" cy="0" rx="11" ry="4" fill="#d3b882" />
            </g>
          }
        }
        <path d="M447 510l42-9 18 22-50 11z" fill="#eee2b5" stroke="#76694c" />
        @if (effects().has('charts')) {
          <path d="M455 514l18 3 9-10 15 12" fill="none" stroke="#347d80" stroke-width="2" />
        }
        <circle cx="538" cy="531" r="10" fill="#273e38" />
        <circle cx="281" cy="551" r="8" fill="#263f3a" />
      </g>
      @if (effects().has('charts')) {
        <g class="bearings" fill="none" stroke="#f1d188" stroke-width="2" stroke-dasharray="7 8">
          <path d="M473 508L660 239M473 508L850 314" />
          <circle cx="660" cy="239" r="18" />
          <circle cx="850" cy="314" r="18" />
          <circle cx="473" cy="508" r="23" />
        </g>
      }
      @if (storm()) {
        <path
          d="M-20 25q103-58 194 8 56-38 118 5 102-46 188 25 112-29 165 31 97-33 174 18 92-36 181 4v-116H0"
          fill="#344e55"
          opacity=".7"
        />
        <g class="rain" stroke="#c7dfd8" stroke-width="2" opacity=".35">
          <path
            d="M90 120l-35 120m140-82-35 120m250-125-35 120m275-130-35 120m240-60-35 120M155 375l-35 120m150-61-35 120m422-80-35 120m215-7-35 120"
          />
        </g>
      }
      <g fill="none" stroke="#3d5f5e" stroke-width="3" opacity=".8">
        @for (bird of skyBirds; track bird) {
          <path
            [attr.transform]="'translate(' + (130 + bird * 48) + ' ' + (160 + bird * 16) + ')'"
            d="M0 0q10-10 22 1 10-11 21-1"
          />
        }
      </g>
      <path d="M0 718q94-38 178-14 61-30 136 1l49 55H0" fill="#253f39" />
      <path d="M0 718q71-16 123 2l32 40H0" fill="#526451" />
    </svg>
  }
  <span class="place-label">{{ node().title }} <small>Fictional voyage \xB7 1501</small></span>
  @for (event of node().events; track event.id; let index = $index) {
    <button
      type="button"
      class="object-marker"
      [class.active]="activeEventId() === event.id"
      [class.resolved]="resolved(event.id)"
      [style.left.%]="event.object.x"
      [style.top.%]="event.object.y"
      [attr.aria-label]="'Inspect ' + event.label"
      [attr.aria-pressed]="activeEventId() === event.id"
      (click)="inspected.emit(event.id)"
    >
      <span aria-hidden="true">{{ resolved(event.id) ? '\u2713' : '0' + (index + 1) }}</span
      ><b>{{ event.label }}</b>
    </button>
  }
  @if (inspectedEvent(); as event) {
    <div class="observation" role="status">
      <span>\u2316 {{ event.label }}</span
      >{{ event.observation }}
    </div>
  }
  <button
    class="motion-control"
    type="button"
    [attr.aria-pressed]="paused()"
    [attr.aria-label]="paused() ? 'Resume scene motion' : 'Pause scene motion'"
    (click)="paused.set(!paused())"
  >
    {{ paused() ? '\u25B7' : '\u2161' }}
  </button>
</div>
`, styles: ["/* src/app/templates/journey-replay/ui/journey-location-scene.component.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n* {\n  box-sizing: border-box;\n}\n.location-scene {\n  height: 100%;\n  min-height: 390px;\n  position: relative;\n  overflow: hidden;\n  background: #356b72;\n  isolation: isolate;\n}\n.scene-art {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.phaser-world {\n  position: absolute;\n  inset: 0;\n  background-size: cover;\n  background-position: center;\n}\n.phaser-world canvas {\n  display: block;\n}\n.scene-vignette {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 100px rgba(2, 22, 35, 0.4392156863);\n  background:\n    linear-gradient(\n      rgba(6, 34, 44, 0.5490196078),\n      transparent 24%,\n      transparent 78%,\n      rgba(3, 28, 40, 0.4));\n}\n.world-error {\n  position: absolute;\n  z-index: 5;\n  left: 20px;\n  top: 50%;\n  padding: 16px;\n  max-width: 280px;\n  color: #ffedce;\n  background: #17333b;\n  border: 1px solid #b89e67;\n  font: 13px Arial, sans-serif;\n}\n.world-error button {\n  display: block;\n  padding: 10px;\n  margin-top: 10px;\n}\n.storm .scene-art {\n  filter: saturate(0.8) brightness(0.85);\n}\n.place-label {\n  position: absolute;\n  top: 26px;\n  left: 28px;\n  max-width: calc(100% - 100px);\n  color: #fff0c5;\n  font: 500 clamp(18px, 2.1vw, 29px)/1.25 Georgia, serif;\n  text-shadow: 0 2px 10px rgba(2, 21, 30, 0.8784313725);\n}\n.place-label small {\n  display: block;\n  margin-top: 8px;\n  font: 10px/1.3 Arial, sans-serif;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.storm .place-label {\n  color: #f4e5bd;\n}\n.object-marker {\n  position: absolute;\n  z-index: 3;\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  transform: translate(-50%, -50%);\n  border: 1px solid #e9d293;\n  border-radius: 24px;\n  min-width: 46px;\n  min-height: 46px;\n  padding: 7px;\n  background: rgba(20, 47, 54, 0.9294117647);\n  color: #f4e3b9;\n  box-shadow: 0 5px 16px rgba(5, 40, 48, 0.3137254902);\n  cursor: pointer;\n  font: 12px/1.2 Arial, sans-serif;\n}\n.object-marker span {\n  display: grid;\n  place-items: center;\n  font: 600 12px Georgia, serif;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      145deg,\n      #d9ba74,\n      #8d7040);\n  color: #132d35;\n  border: 1px solid #f2df9c;\n  box-shadow: 0 0 0 5px rgba(192, 166, 108, 0.0980392157);\n}\n.object-marker.resolved {\n  border-color: #b6d5af;\n}\n.object-marker.resolved span {\n  background: #b7d1a2;\n}\n.object-marker b {\n  position: absolute;\n  bottom: calc(100% + 7px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: max-content;\n  max-width: 125px;\n  padding: 5px 8px;\n  border-radius: 4px;\n  background: rgba(22, 52, 59, 0.9333333333);\n  color: #f4e3b9;\n  text-align: center;\n}\n.object-marker:hover,\n.object-marker.active {\n  background: #e8c580;\n  color: #173436;\n}\n.object-marker.active span {\n  background: #f3deaf;\n}\n.observation {\n  position: absolute;\n  bottom: 22px;\n  right: 22px;\n  width: min(300px, 48%);\n  padding: 14px 17px;\n  background: rgba(20, 46, 53, 0.9215686275);\n  color: #eff0dc;\n  border-left: 2px solid #e8c580;\n  border-radius: 3px;\n  font: 12px/1.55 Arial, sans-serif;\n}\n.observation span {\n  display: block;\n  color: #e8c580;\n  margin-bottom: 6px;\n  font-weight: 700;\n}\n.motion-control {\n  position: absolute;\n  right: 18px;\n  top: 18px;\n  width: 44px;\n  height: 44px;\n  border: 1px solid #b8ccc2;\n  border-radius: 50%;\n  background: rgba(24, 60, 66, 0.7803921569);\n  color: #fff0c7;\n  cursor: pointer;\n}\nbutton:focus-visible {\n  outline: 3px solid #f4e5ad;\n  outline-offset: 4px;\n}\n.ship {\n  transform-origin: 400px 565px;\n  animation: vessel 8s ease-in-out infinite alternate;\n}\n.small-boat {\n  transition: transform 1.4s ease;\n}\n.small-boat.exchanged {\n  transform: translate(-117px, 47px);\n}\n.resting .canvas {\n  transform: scaleY(0.62);\n  transform-origin: 385px 429px;\n}\n.canvas {\n  transition: transform 1s;\n}\n.sea-lines {\n  animation: water 11s ease-in-out infinite alternate;\n}\n.rain {\n  animation: rainfall 1.7s linear infinite;\n}\n.paused * {\n  animation-play-state: paused !important;\n}\n@keyframes vessel {\n  from {\n    transform: rotate(-0.8deg) translateY(-3px);\n  }\n  to {\n    transform: rotate(0.8deg) translateY(4px);\n  }\n}\n@keyframes water {\n  to {\n    transform: translateX(32px);\n  }\n}\n@keyframes rainfall {\n  to {\n    transform: translate(-20px, 35px);\n  }\n}\n@media (max-width: 700px) {\n  .place-label {\n    top: 18px;\n    left: 18px;\n    font-size: 19px;\n  }\n  .place-label small {\n    font-size: 9px;\n  }\n  .object-marker {\n    padding: 4px;\n  }\n  .object-marker b {\n    position: absolute;\n    bottom: calc(100% + 7px);\n    left: 50%;\n    transform: translateX(-50%);\n    width: 110px;\n    padding: 5px;\n    border-radius: 4px;\n    background: rgba(22, 52, 59, 0.9333333333);\n    color: #f4e3b9;\n    font-size: 10px;\n    text-align: center;\n  }\n  .observation {\n    right: 12px;\n    bottom: 12px;\n    width: 56%;\n    font-size: 10px;\n    padding: 9px 11px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=journey-location-scene.component.css.map */\n"] }]
  }], () => [], { worldHost: [{ type: ViewChild, args: ["worldHost", { isSignal: true }] }], node: [{ type: Input, args: [{ isSignal: true, alias: "node", required: true }] }], selections: [{ type: Input, args: [{ isSignal: true, alias: "selections", required: false }] }], activeEventId: [{ type: Input, args: [{ isSignal: true, alias: "activeEventId", required: false }] }], inspected: [{ type: Output, args: ["inspected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyLocationSceneComponent, { className: "JourneyLocationSceneComponent", filePath: "src/app/templates/journey-replay/ui/journey-location-scene.component.ts", lineNumber: 26 });
})();

// src/app/templates/journey-replay/ui/journey-path-workspace.component.ts
var _c02 = ["tutor"];
var _c1 = ["sources"];
var _c2 = ["sourceTrigger"];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.node.id;
var _forTrack2 = ($index, $item) => $item.nodeId + $item.eventId;
function JourneyPathWorkspaceComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-living-journey-map", 30);
    \u0275\u0275listener("routeInspected", function JourneyPathWorkspaceComponent_Conditional_2_Template_app_living_journey_map_routeInspected_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspectRoute($event));
    })("locationInspected", function JourneyPathWorkspaceComponent_Conditional_2_Template_app_living_journey_map_locationInspected_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspectPlace($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "details", 31)(2, "summary", 32);
    \u0275\u0275text(3, "\u2316");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "button", 33);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.map()?.zoomBy(0.25));
    });
    \u0275\u0275text(6, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.map()?.zoomBy(-0.25));
    });
    \u0275\u0275text(8, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 35);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.map()?.resetView());
    });
    \u0275\u0275text(10, "Fit chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 35);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.map()?.toggleLens("weather"));
    });
    \u0275\u0275text(12, " Wind ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("map", ctx_r2.runtime.config.map)("team", ctx_r2.runtime.config.team)("route", ctx_r2.routeTrace())("candidateRouteIds", ctx_r2.routeIds())("candidateRouteLabels", ctx_r2.routeLabels())("selectedRouteId", ctx_r2.selectedRoute()?.routeId)("activeLocationId", ctx_r2.node().locationId)("immersive", true)("showRouteLabels", false)("expeditionStyle", true)("vesselArt", ctx_r2.vesselArt);
    \u0275\u0275advance(11);
    \u0275\u0275attribute("aria-pressed", ctx_r2.map()?.lensOn("weather"));
  }
}
function JourneyPathWorkspaceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-journey-location-scene", 36);
    \u0275\u0275listener("inspected", function JourneyPathWorkspaceComponent_Conditional_3_Template_app_journey_location_scene_inspected_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspectEvent($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("node", ctx_r2.node())("selections", ctx_r2.currentChoices())("activeEventId", ctx_r2.activeEventId());
  }
}
function JourneyPathWorkspaceComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r5);
  }
}
function JourneyPathWorkspaceComponent_Conditional_19_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r6.nextTask);
  }
}
function JourneyPathWorkspaceComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span");
    \u0275\u0275text(2, "From your choices");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, JourneyPathWorkspaceComponent_Conditional_19_For_4_Template, 2, 1, "p", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.incoming());
  }
}
function JourneyPathWorkspaceComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " Scene preview \xB7 changes stay in this preview. ");
    \u0275\u0275elementStart(2, "button", 37);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_36_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.backToPath());
    });
    \u0275\u0275text(3, "Return to your path");
    \u0275\u0275elementEnd()();
  }
}
function JourneyPathWorkspaceComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Practice entry \xB7 earlier choices have not been recorded.");
    \u0275\u0275elementEnd();
  }
}
function JourneyPathWorkspaceComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "meter", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const resource_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(resource_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.resources()[resource_r8.id]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(resource_r8.unit);
    \u0275\u0275advance();
    \u0275\u0275property("min", resource_r8.minimum)("max", resource_r8.maximum)("value", ctx_r2.resources()[resource_r8.id]);
    \u0275\u0275attribute("aria-label", resource_r8.label);
  }
}
function JourneyPathWorkspaceComponent_Conditional_41_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "em");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.previewing() ? "Alternate path" : "Revealed by earlier choices");
  }
}
function JourneyPathWorkspaceComponent_Conditional_41_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_41_For_4_Template_button_click_0_listener() {
      const choice_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectRoute(choice_r10.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, JourneyPathWorkspaceComponent_Conditional_41_For_4_Conditional_5_Template, 2, 1, "em");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.selectedRoute()?.id === choice_r10.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r10.summary);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r10.requiresAny?.length ? 5 : -1);
  }
}
function JourneyPathWorkspaceComponent_Conditional_41_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 44);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_41_Conditional_5_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.enterLocation());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r12 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r12.nextTask);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.effectLabel(choice_r12));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Enter location \xB7 Session ", ctx_r2.session() + 1, " \u2192 ");
  }
}
function JourneyPathWorkspaceComponent_Conditional_41_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 41)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const place_r13 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r13.description);
  }
}
function JourneyPathWorkspaceComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 39)(1, "h3");
    \u0275\u0275text(2, "Choose where to explore");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, JourneyPathWorkspaceComponent_Conditional_41_For_4_Template, 6, 4, "button", 40, _forTrack02);
    \u0275\u0275conditionalCreate(5, JourneyPathWorkspaceComponent_Conditional_41_Conditional_5_Template, 7, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, JourneyPathWorkspaceComponent_Conditional_41_Conditional_6_Template, 5, 2, "section", 41);
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.availableRoutes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.selectedRoute()) ? 5 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.inspectedPlace()) ? 6 : -1, tmp_5_0);
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_42_For_2_Template_button_click_0_listener() {
      const event_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.inspectEvent(event_r15.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r15 = ctx.$implicit;
    const \u0275$index_160_r16 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.activeEvent()?.id === event_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275$index_160_r16 + 1, " \xB7 ", event_r15.label, " ");
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_For_9_Template_button_click_0_listener() {
      const choice_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const event_r20 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.choose(event_r20.id, choice_r19));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "em");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r19 = ctx.$implicit;
    const event_r20 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.selected(event_r20.id, choice_r19.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r19.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.effectLabel(choice_r19));
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small")(4, "b");
    \u0275\u0275text(5, "Next investigation");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 51);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Conditional_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.showScene());
    });
    \u0275\u0275text(8, " See ship & shore \u2191 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r22 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.preview(choice_r22).consequence);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", choice_r22.nextTask);
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 47)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 49);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50, 2);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openSources());
    });
    \u0275\u0275text(7, " Inspect source evidence \u2197 ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_For_9_Template, 7, 4, "button", 40, _forTrack02);
    \u0275\u0275conditionalCreate(10, JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Conditional_10_Template, 9, 2, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    const event_r20 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", event_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r20.observation);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(event_r20.choices);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_10_0 = ctx_r2.eventSelected()) ? 10 : -1, tmp_10_0);
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_42_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.next());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Next map \xB7 Session ", ctx_r2.session() + 1, " \u2192 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.completedEvents(), " / ", ctx_r2.node().events.length, " event choices \xB7 all sessions remain open. ");
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1, " Your route and event choices remain available to inspect or revise. ");
    \u0275\u0275elementEnd();
  }
}
function JourneyPathWorkspaceComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 45);
    \u0275\u0275repeaterCreate(1, JourneyPathWorkspaceComponent_Conditional_42_For_2_Template, 2, 3, "button", 46, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, JourneyPathWorkspaceComponent_Conditional_42_Conditional_3_Template, 11, 4, "section", 47);
    \u0275\u0275conditionalCreate(4, JourneyPathWorkspaceComponent_Conditional_42_Conditional_4_Template, 4, 3)(5, JourneyPathWorkspaceComponent_Conditional_42_Conditional_5_Template, 2, 0, "p", 48);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.node().events);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.activeEvent()) ? 3 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.nextNode() ? 4 : 5);
  }
}
function JourneyPathWorkspaceComponent_For_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r24.learning);
  }
}
function JourneyPathWorkspaceComponent_Conditional_50_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r25 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.sourceText(id_r25), ". ");
  }
}
function JourneyPathWorkspaceComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2, "Question");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p")(5, "b");
    \u0275\u0275text(6, "Evidence to inspect");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, JourneyPathWorkspaceComponent_Conditional_50_For_8_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", event_r26.question);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(event_r26.evidenceIds);
  }
}
function JourneyPathWorkspaceComponent_For_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scene_r27 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", scene_r27.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", scene_r27.session, " \xB7 ", scene_r27.kind === "map" ? "Map" : "Location", " \xB7 ", ctx_r2.placeName(scene_r27.locationId), " \xB7 ", scene_r27.title, " ");
  }
}
function JourneyPathWorkspaceComponent_For_67_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r28.label);
  }
}
function JourneyPathWorkspaceComponent_For_67_ForEmpty_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "No choice recorded");
    \u0275\u0275elementEnd();
  }
}
function JourneyPathWorkspaceComponent_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, JourneyPathWorkspaceComponent_For_67_For_4_Template, 2, 1, "span", null, _forTrack02, false, JourneyPathWorkspaceComponent_For_67_ForEmpty_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r29 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", entry_r29.node.session, " \xB7 ", entry_r29.node.title);
    \u0275\u0275advance();
    \u0275\u0275repeater(entry_r29.choices);
  }
}
function JourneyPathWorkspaceComponent_For_72_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const decision_r30 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.decisionLabel(decision_r30), " \xB7 ");
  }
}
function JourneyPathWorkspaceComponent_For_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, JourneyPathWorkspaceComponent_For_72_For_4_Template, 2, 1, "span", null, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r31 = ctx.$implicit;
    const $index_r32 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Revision ", $index_r32 + 1);
    \u0275\u0275advance();
    \u0275\u0275repeater(branch_r31);
  }
}
function JourneyPathWorkspaceComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-journey-history-context", 25);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("history", ctx)("includeEpilogue", ctx_r2.session() === 8);
  }
}
function JourneyPathWorkspaceComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 37);
    \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Conditional_76_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.retrySave());
    });
    \u0275\u0275text(3, "Retry save");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.error(), " ");
  }
}
function JourneyPathWorkspaceComponent_For_85_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const paragraph_r35 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(paragraph_r35.perspective);
  }
}
function JourneyPathWorkspaceComponent_For_85_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "blockquote");
    \u0275\u0275conditionalCreate(1, JourneyPathWorkspaceComponent_For_85_For_6_Conditional_1_Template, 2, 1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const paragraph_r35 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(paragraph_r35.perspective ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", paragraph_r35.text, " ");
  }
}
function JourneyPathWorkspaceComponent_For_85_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", source_r36.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r36.attribution ?? source_r36.sourceLabel, " \u2197");
  }
}
function JourneyPathWorkspaceComponent_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, JourneyPathWorkspaceComponent_For_85_For_6_Template, 3, 2, "blockquote", null, _forTrack02);
    \u0275\u0275conditionalCreate(7, JourneyPathWorkspaceComponent_For_85_Conditional_7_Template, 2, 2, "a", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r36 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r36.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r36.sourceLabel);
    \u0275\u0275advance();
    \u0275\u0275repeater(source_r36.paragraphs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(source_r36.sourceUrl ? 7 : -1);
  }
}
var JourneyPathWorkspaceComponent = class _JourneyPathWorkspaceComponent {
  runtime = inject(JourneyPathRuntime);
  router = inject(Router);
  route = inject(ActivatedRoute);
  element = inject(ElementRef);
  injector = inject(Injector);
  params = toSignal(this.route.queryParamMap);
  session = signal(
    1,
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewNodeId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "previewNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewDecisions = signal(
    [],
    ...ngDevMode ? [{ debugName: "previewDecisions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingRouteId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "pendingRouteId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeEventId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "activeEventId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedPlace = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "inspectedPlace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  map = viewChild(
    LivingJourneyMapComponent,
    ...ngDevMode ? [{ debugName: "map" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tutor = viewChild(
    "tutor",
    ...ngDevMode ? [{ debugName: "tutor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sources = viewChild(
    "sources",
    ...ngDevMode ? [{ debugName: "sources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceTrigger = viewChild(
    "sourceTrigger",
    ...ngDevMode ? [{ debugName: "sourceTrigger" }] : (
      /* istanbul ignore next */
      []
    )
  );
  definition = this.runtime.config.experience;
  vesselArt = this.definition.nodes.find((node) => node.sceneArt)?.sceneArt?.ship;
  pathEntry = computed(
    () => this.runtime.path().find((entry) => entry.node.session === this.session()),
    ...ngDevMode ? [{ debugName: "pathEntry" }] : (
      /* istanbul ignore next */
      []
    )
  );
  node = computed(
    () => this.definition.nodes.find((node) => node.id === this.previewNodeId()) ?? this.pathEntry().node,
    ...ngDevMode ? [{ debugName: "node" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewing = computed(
    () => this.previewNodeId() !== void 0,
    ...ngDevMode ? [{ debugName: "previewing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  decisions = computed(
    () => this.previewing() ? this.previewDecisions() : this.runtime.state().decisions,
    ...ngDevMode ? [{ debugName: "decisions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  before = computed(
    () => {
      if (!this.previewing())
        return projectJourneyResources(this.runtime.config, this.runtime.state(), this.session());
      const choices = [...this.definition.nodes].sort((a, b) => a.session - b.session).filter((node) => node.session < this.session()).flatMap((node) => (node.kind === "map" ? ["route"] : node.events.map((event) => event.id)).flatMap((key) => {
        const choice = selectedPathChoice(node, this.previewDecisions(), key);
        return choice ? [choice] : [];
      }));
      return projectPathChoices(this.runtime.config, choices);
    },
    ...ngDevMode ? [{ debugName: "before" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableRoutes = computed(
    () => this.previewing() ? this.node().choices : availablePathChoices(this.node(), this.before().tags),
    ...ngDevMode ? [{ debugName: "availableRoutes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  routeLabels = computed(
    () => Object.fromEntries(this.availableRoutes().map((choice) => [choice.routeId, choice.label.split(" \xB7 ")[0]])),
    ...ngDevMode ? [{ debugName: "routeLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  routeIds = computed(
    () => this.availableRoutes().map((choice) => choice.routeId),
    ...ngDevMode ? [{ debugName: "routeIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedRoute = computed(
    () => this.availableRoutes().find((choice) => choice.id === this.pendingRouteId()) ?? selectedPathChoice(this.node(), this.decisions(), "route"),
    ...ngDevMode ? [{ debugName: "selectedRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeEvent = computed(
    () => this.node().events.find((event) => event.id === this.activeEventId()) ?? this.node().events.at(0),
    ...ngDevMode ? [{ debugName: "activeEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentChoices = computed(
    () => (this.node().kind === "map" ? ["route"] : this.node().events.map((event) => event.id)).flatMap((key) => {
      const choice = selectedPathChoice(this.node(), this.decisions(), key);
      return choice ? [choice] : [];
    }),
    ...ngDevMode ? [{ debugName: "currentChoices" }] : (
      /* istanbul ignore next */
      []
    )
  );
  eventSelected = computed(
    () => this.activeEvent() && selectedPathChoice(this.node(), this.decisions(), this.activeEvent().id),
    ...ngDevMode ? [{ debugName: "eventSelected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  incoming = computed(
    () => this.previewing() ? this.definition.nodes.filter((node) => node.session === this.session() - 1).flatMap((node) => (node.kind === "map" ? ["route"] : node.events.map((event) => event.id)).flatMap((key) => {
      const choice = selectedPathChoice(node, this.previewDecisions(), key);
      return choice ? [choice] : [];
    })) : this.runtime.path().find((entry) => entry.node.session === this.session() - 1)?.choices ?? [],
    ...ngDevMode ? [{ debugName: "incoming" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextNode = computed(
    () => this.definition.nodes.find((node) => node.id === ([...this.currentChoices()].reverse().find((choice) => choice.nextNodeId)?.nextNodeId ?? this.node().defaultNextId)),
    ...ngDevMode ? [{ debugName: "nextNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resources = computed(
    () => {
      let record = {
        resources: this.before().resources,
        completedSteps: this.before().completedSteps
      };
      for (const choice of this.currentChoices())
        record = {
          resources: resolveJourneyOutcome(this.runtime.config, record, choice).resources,
          completedSteps: [...record.completedSteps, { choiceId: choice.id }]
        };
      return record.resources;
    },
    ...ngDevMode ? [{ debugName: "resources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  routeTrace = computed(
    () => {
      const routes = this.previewing() ? this.definition.nodes.filter((node) => node.session < this.session()).flatMap((node) => {
        const choice = selectedPathChoice(node, this.previewDecisions(), "route");
        return choice?.routeId ? [choice.routeId] : [];
      }) : this.runtime.path().filter((entry) => entry.node.session < this.session()).flatMap((entry) => entry.choices.flatMap((choice) => choice.routeId ? [choice.routeId] : []));
      const coordinates = routes.flatMap((id) => this.runtime.config.map.routes.find((route) => route.id === id)?.coordinates ?? []);
      const place = this.runtime.config.map.locations.find((place2) => place2.id === this.node().locationId);
      const points = coordinates.length ? [...coordinates, place] : [place];
      return points.map((point, sequence) => __spreadValues(__spreadProps(__spreadValues({}, point), {
        voyageId: "practice-path",
        pointId: `path-${sequence}`,
        sequence,
        legId: "practice",
        timestamp: ""
      }), "id" in point ? { locationId: String(point.id) } : {}));
    },
    ...ngDevMode ? [{ debugName: "routeTrace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = computed(
    () => this.runtime.config.evidence.filter((item) => this.activeEvent()?.evidenceIds.includes(item.id)),
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedEvents = computed(
    () => this.node().events.filter((event) => !!selectedPathChoice(this.node(), this.decisions(), event.id)).length,
    ...ngDevMode ? [{ debugName: "completedEvents" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const value = Number(this.params()?.get("lesson") ?? 1);
      this.selectSession(Number.isInteger(value) && value >= 1 && value <= 8 ? value : 1);
    });
    bindLessonFocus((lesson) => this.selectSession(lesson.number));
    effect(() => {
      const nodeId = this.node().id;
      this.pendingRouteId.set(void 0);
      this.activeEventId.set(void 0);
      this.inspectedPlace.set(void 0);
      untracked(() => afterNextRender(() => this.element.nativeElement.querySelector(".planning-column")?.scrollTo({ top: 0 }), { injector: this.injector }));
      void nodeId;
    });
  }
  selectSession(number) {
    untracked(() => {
      const preview = this.definition.nodes.find((node) => node.id === this.previewNodeId());
      if (preview && preview.session !== number)
        this.backToPath();
      this.session.set(number);
    });
  }
  inspectRoute(routeId) {
    const choice = this.availableRoutes().find((choice2) => choice2.routeId === routeId);
    if (choice) {
      this.pendingRouteId.set(choice.id);
      this.inspectedPlace.set(void 0);
      this.revealTutor(".route-options");
    }
  }
  inspectPlace(place) {
    const choice = this.availableRoutes().find((choice2) => this.runtime.config.map.routes.find((route) => route.id === choice2.routeId)?.toLocationId === place.id);
    if (choice)
      this.inspectRoute(choice.routeId);
    else {
      this.inspectedPlace.set(place);
      this.revealTutor(".place-report");
    }
  }
  inspectEvent(id) {
    this.activeEventId.set(id);
    this.revealTutor(".event-options");
  }
  selectRoute(id) {
    this.pendingRouteId.set(id);
    this.inspectedPlace.set(void 0);
  }
  enterLocation() {
    const choice = this.selectedRoute();
    if (choice && this.choose("route", choice) && choice.nextNodeId)
      this.goNode(choice.nextNodeId);
  }
  choose(eventId, choice) {
    if (this.previewing()) {
      this.previewDecisions.update((decisions) => [
        ...decisions.filter((item) => item.nodeId !== this.node().id || item.eventId !== eventId),
        { nodeId: this.node().id, eventId, choiceId: choice.id }
      ]);
      return true;
    }
    return this.runtime.choose(this.node().id, eventId, choice.id);
  }
  next() {
    const node = this.nextNode();
    if (node)
      this.goNode(node.id);
  }
  goNode(id) {
    const node = this.definition.nodes.find((node2) => node2.id === id);
    if (this.previewing())
      this.previewNodeId.set(id);
    this.session.set(node.session);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lesson: node.session },
      queryParamsHandling: "merge"
    });
    afterNextRender(() => {
      const surface = this.element.nativeElement.querySelector(".activity");
      surface?.scrollIntoView({ block: "start", behavior: "instant" });
      surface?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  previewScene(id) {
    if (!id) {
      this.previewNodeId.set(void 0);
      return;
    }
    this.previewDecisions.set([]);
    this.previewNodeId.set(id);
    this.goNode(id);
  }
  backToPath() {
    this.previewNodeId.set(void 0);
    this.previewDecisions.set([]);
  }
  decisionLabel(decision) {
    const node = this.definition.nodes.find((node2) => node2.id === decision.nodeId);
    return node ? pathChoices(node, decision.eventId).find((choice) => choice.id === decision.choiceId)?.label ?? "Earlier choice" : "Earlier choice";
  }
  selected(eventId, choiceId) {
    return selectedPathChoice(this.node(), this.decisions(), eventId)?.id === choiceId;
  }
  preview(choice) {
    let record = {
      resources: this.before().resources,
      completedSteps: this.before().completedSteps
    };
    for (const event of this.node().events) {
      if (event.choices.some((item) => item.id === choice.id))
        break;
      const earlier = selectedPathChoice(this.node(), this.decisions(), event.id);
      if (earlier)
        record = {
          resources: resolveJourneyOutcome(this.runtime.config, record, earlier).resources,
          completedSteps: [...record.completedSteps, { choiceId: earlier.id }]
        };
    }
    return resolveJourneyOutcome(this.runtime.config, record, choice);
  }
  effectLabel(choice) {
    return this.preview(choice).changes.map((change) => `${change.label} ${change.delta > 0 ? "+" : ""}${change.delta}`).join(" \xB7 ");
  }
  sourceText(id) {
    return this.runtime.config.evidence.find((item) => item.id === id)?.title ?? id;
  }
  placeName(id) {
    return this.runtime.config.map.locations.find((place) => place.id === id)?.shortName ?? "";
  }
  nodeKind(id) {
    return this.definition.nodes.find((node) => node.id === id)?.kind === "map" ? "Map" : "Location";
  }
  openSources() {
    this.sources()?.nativeElement.showModal();
  }
  closeSources() {
    this.sourceTrigger()?.nativeElement.focus();
  }
  showScene() {
    const activity = this.element.nativeElement.querySelector(".activity");
    activity?.scrollIntoView({ block: "start", behavior: "instant" });
    activity?.focus({ preventScroll: true });
  }
  revealTutor(selector = ".tutor-body") {
    const tutor = this.tutor()?.nativeElement;
    if (tutor)
      tutor.open = true;
    afterNextRender(() => {
      const target = this.element.nativeElement.querySelector(selector);
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
      target?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function JourneyPathWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyPathWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyPathWorkspaceComponent, selectors: [["app-journey-path-workspace"]], viewQuery: function JourneyPathWorkspaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.map, LivingJourneyMapComponent, 5)(ctx.tutor, _c02, 5)(ctx.sources, _c1, 5)(ctx.sourceTrigger, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  }, features: [\u0275\u0275ProvidersFeature([JourneyPathRuntime])], decls: 86, vars: 19, consts: [["tutor", ""], ["sources", ""], ["sourceTrigger", ""], [1, "path-workspace"], ["tabindex", "-1", 1, "activity"], [3, "node", "selections", "activeEventId"], ["type", "button", 1, "show-options", 3, "click"], ["aria-label", "Weekly tasks and AI Tutor", 1, "planning-column"], ["open", "", 1, "weekly-tasks"], [1, "tasks-body"], [1, "carried-task"], [1, "product"], ["open", "", 1, "tutor"], ["aria-hidden", "true", 1, "tutor-emblem"], ["tabindex", "-1", 1, "tutor-body"], [1, "connection"], [1, "practice-note"], ["aria-label", "Modeled expedition resources", 1, "resource-meters"], [1, "tutor-plan"], [1, "path-tools"], ["for", "path-scene"], ["id", "path-scene", 3, "change", "value"], ["value", ""], [3, "value"], [1, "path-record"], [3, "history", "includeEpilogue"], [1, "save-note"], ["role", "alert", 1, "error"], ["aria-label", "Location source evidence", 1, "source-dialog", 3, "close"], ["type", "button", "aria-label", "Close source evidence", 3, "click"], ["mapLabel", "Your Atlantic passage. Inspect a highlighted route, then choose it in AI Tutor. Drag the chart or use arrow keys to pan.", 3, "routeInspected", "locationInspected", "map", "team", "route", "candidateRouteIds", "candidateRouteLabels", "selectedRouteId", "activeLocationId", "immersive", "showRouteLabels", "expeditionStyle", "vesselArt"], [1, "map-tools"], ["aria-label", "Map tools"], ["type", "button", "aria-label", "Zoom map in", 3, "click"], ["type", "button", "aria-label", "Zoom map out", 3, "click"], ["type", "button", 3, "click"], [3, "inspected", "node", "selections", "activeEventId"], [3, "click"], [3, "min", "max", "value"], ["aria-label", "Passage choices", "tabindex", "-1", 1, "route-options"], ["type", "button", 1, "choice"], ["tabindex", "-1", 1, "place-report"], ["type", "button", 1, "choice", 3, "click"], ["aria-live", "polite", 1, "choice-result"], ["type", "button", 1, "continue", 3, "click"], ["aria-label", "Location events", 1, "event-tabs"], ["type", "button"], ["tabindex", "-1", 1, "event-options"], [1, "testing-cue"], [1, "observation-text"], ["type", "button", 1, "source-button", 3, "click"], ["type", "button", 1, "scene-return", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function JourneyPathWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "section", 4);
      \u0275\u0275conditionalCreate(2, JourneyPathWorkspaceComponent_Conditional_2_Template, 13, 12)(3, JourneyPathWorkspaceComponent_Conditional_3_Template, 1, 3, "app-journey-location-scene", 5);
      \u0275\u0275elementStart(4, "button", 6);
      \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Template_button_click_4_listener() {
        return ctx.revealTutor();
      });
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "aside", 7)(7, "details", 8)(8, "summary")(9, "span");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "b");
      \u0275\u0275text(12, "Tasks & product");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 9)(14, "h2");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "ul");
      \u0275\u0275repeaterCreate(17, JourneyPathWorkspaceComponent_For_18_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, JourneyPathWorkspaceComponent_Conditional_19_Template, 5, 0, "div", 10);
      \u0275\u0275elementStart(20, "p", 11)(21, "b");
      \u0275\u0275text(22, "Make");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "details", 12, 0)(26, "summary")(27, "span", 13);
      \u0275\u0275text(28, "\u2726");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "b");
      \u0275\u0275text(30, "AI Tutor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "small");
      \u0275\u0275text(32, "Options only");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 14)(34, "p", 15);
      \u0275\u0275text(35, "AI not connected \xB7 choose the next event here.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(36, JourneyPathWorkspaceComponent_Conditional_36_Template, 4, 0, "p", 16)(37, JourneyPathWorkspaceComponent_Conditional_37_Template, 2, 0, "p", 16);
      \u0275\u0275elementStart(38, "div", 17);
      \u0275\u0275repeaterCreate(39, JourneyPathWorkspaceComponent_For_40_Template, 8, 7, "div", null, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(41, JourneyPathWorkspaceComponent_Conditional_41_Template, 7, 2)(42, JourneyPathWorkspaceComponent_Conditional_42_Template, 6, 2);
      \u0275\u0275elementStart(43, "details", 18)(44, "summary");
      \u0275\u0275text(45, "Learning & future tutor plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p");
      \u0275\u0275text(47);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(48, JourneyPathWorkspaceComponent_For_49_Template, 2, 1, "p", null, _forTrack02);
      \u0275\u0275conditionalCreate(50, JourneyPathWorkspaceComponent_Conditional_50_Template, 9, 1);
      \u0275\u0275elementStart(51, "p");
      \u0275\u0275text(52, " Future controls: ask about evidence, compare predictions, explain a revision. No AI responses, assessment or automatic adaptation are connected. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "details", 19)(54, "summary");
      \u0275\u0275text(55, "Explore paths & records");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "label", 20);
      \u0275\u0275text(57, "Inspect any scene");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "select", 21);
      \u0275\u0275listener("change", function JourneyPathWorkspaceComponent_Template_select_change_58_listener($event) {
        return ctx.previewScene($event.target.value);
      });
      \u0275\u0275elementStart(59, "option", 22);
      \u0275\u0275text(60, "Your current path");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(61, JourneyPathWorkspaceComponent_For_62_Template, 2, 5, "option", 23, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "p");
      \u0275\u0275text(64, " Alternate scenes are available for testing. Preview choices leave your saved path intact. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "ol", 24);
      \u0275\u0275repeaterCreate(66, JourneyPathWorkspaceComponent_For_67_Template, 6, 3, "li", null, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "details")(69, "summary");
      \u0275\u0275text(70);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(71, JourneyPathWorkspaceComponent_For_72_Template, 5, 1, "p", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(73, JourneyPathWorkspaceComponent_Conditional_73_Template, 1, 2, "app-journey-history-context", 25);
      \u0275\u0275elementStart(74, "p", 26);
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(76, JourneyPathWorkspaceComponent_Conditional_76_Template, 4, 1, "p", 27);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(77, "dialog", 28, 1);
      \u0275\u0275listener("close", function JourneyPathWorkspaceComponent_Template_dialog_close_77_listener() {
        return ctx.closeSources();
      });
      \u0275\u0275elementStart(79, "header")(80, "h2");
      \u0275\u0275text(81, "Source evidence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "button", 29);
      \u0275\u0275listener("click", function JourneyPathWorkspaceComponent_Template_button_click_82_listener() {
        \u0275\u0275restoreView(_r1);
        const sources_r34 = \u0275\u0275reference(78);
        return \u0275\u0275resetView(sources_r34.close());
      });
      \u0275\u0275text(83, " Close ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(84, JourneyPathWorkspaceComponent_For_85_Template, 8, 3, "article", null, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_17_0;
      let tmp_23_0;
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.node().kind === "map" ? "Choose the next passage on the map" : ctx.node().title)("data-node", ctx.node().id)("data-session", ctx.session());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.node().kind === "map" ? 2 : 3);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.node().kind === "map" ? "Passage choices" : "Event options", " \u2197 ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("Week ", (ctx.session() + ctx.session() % 2) / 2, " \xB7 Session ", ctx.session());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.node().title);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.node().tasks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.previewing() && ctx.incoming().length ? 19 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.node().product);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.previewing() ? 36 : ctx.pathEntry().provisional && ctx.session() > 1 ? 37 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.runtime.config.resources);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.node().kind === "map" ? 41 : 42);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.node().learning);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.incoming());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_17_0 = ctx.activeEvent()) ? 50 : -1, tmp_17_0);
      \u0275\u0275advance(8);
      \u0275\u0275property("value", ctx.previewNodeId() ?? "");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.definition.nodes);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.runtime.path());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Earlier path revisions \xB7 ", ctx.runtime.state().previousPaths.length);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.state().previousPaths);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_23_0 = ctx.runtime.config.historicalFrame) ? 73 : -1, tmp_23_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Local practice \xB7 ", ctx.runtime.saved() ? "choices retained" : "not saved", ". No classroom submission or grade. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.error() ? 76 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.evidence());
    }
  }, dependencies: [
    LivingJourneyMapComponent,
    JourneyLocationSceneComponent,
    JourneyHistoryContextComponent
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 0;\n  color: #203f42;\n  background: #eae9df;\n  font: 13px/1.5 Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.path-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 345px;\n  height: calc(100dvh - 102px);\n  min-height: 580px;\n}\n.activity[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n  background: #163d45;\n  scroll-margin-top: 104px;\n}\n.activity[_ngcontent-%COMP%]    > app-living-journey-map[_ngcontent-%COMP%], \n.activity[_ngcontent-%COMP%]    > app-journey-location-scene[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.activity[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.activity[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d6b776;\n  outline-offset: -3px;\n}\n.planning-column[_ngcontent-%COMP%] {\n  overflow: auto;\n  border-left: 1px solid #acb7ad;\n  scrollbar-width: thin;\n  padding: 18px 17px 24px;\n}\n.weekly-tasks[_ngcontent-%COMP%], \n.tutor[_ngcontent-%COMP%] {\n  border: 1px solid #c1c9bd;\n  border-radius: 9px;\n  background: #f7f7ef;\n  overflow: hidden;\n}\n.weekly-tasks[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.weekly-tasks[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  padding: 13px 16px;\n  background: #e0e7dc;\n}\n.weekly-tasks[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n  color: #57716a;\n}\n.weekly-tasks[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.tasks-body[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.tasks-body[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font: 500 20px/1.25 Georgia, serif;\n}\n.tasks-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 17px;\n  margin: 9px 0;\n}\n.tasks-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  font-size: 12px;\n}\n.product[_ngcontent-%COMP%] {\n  border-top: 1px solid #d6dbcf;\n  padding-top: 9px;\n  margin: 10px 0 0;\n  font-size: 11px;\n}\n.product[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  margin-right: 5px;\n}\n.carried-task[_ngcontent-%COMP%] {\n  border-left: 2px solid #cda660;\n  padding-left: 10px;\n  margin-top: 13px;\n}\n.carried-task[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #806430;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.carried-task[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 6px;\n  font-size: 11px;\n}\n.tutor[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  background: #193d43;\n  color: #eff0df;\n}\n.tutor[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #b8c9c1;\n  font-size: 10px;\n}\n.tutor-emblem[_ngcontent-%COMP%] {\n  color: #e7c27d;\n  font-size: 18px;\n}\n.tutor-body[_ngcontent-%COMP%] {\n  padding: 12px 14px 16px;\n}\n.connection[_ngcontent-%COMP%] {\n  font-size: 10px;\n  margin: 0 0 12px;\n  color: #546b65;\n}\n.practice-note[_ngcontent-%COMP%] {\n  border-left: 2px solid #ae8a4f;\n  padding: 4px 0 4px 8px;\n  color: #725d34;\n  font-size: 10px;\n}\n.practice-note[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n}\n.resource-meters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px 10px;\n  padding-bottom: 14px;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #d5dccf;\n}\n.resource-meters[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  display: block;\n  color: #5b716b;\n}\n.resource-meters[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 600 17px Georgia, serif;\n  display: block;\n}\n.resource-meters[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 9px Arial, sans-serif;\n}\nmeter[_ngcontent-%COMP%] {\n  height: 6px;\n  width: 100%;\n  display: block;\n  margin-top: 4px;\n  accent-color: #387973;\n}\nh3[_ngcontent-%COMP%] {\n  font: 600 15px/1.4 Georgia, serif;\n  margin: 0 0 10px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \n[tabindex][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #298a8a;\n  outline-offset: 3px;\n}\n.choice[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  border: 1px solid #bfccc2;\n  border-radius: 6px;\n  background: #fffef5;\n  color: #233f40;\n  padding: 11px 12px;\n  margin: 8px 0;\n  min-height: 50px;\n  transition: background 0.15s;\n}\n.choice[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n}\n.choice[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  margin-top: 4px;\n  line-height: 1.5;\n  color: #5c6d62;\n}\n.choice[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  margin-top: 5px;\n  color: #776334;\n  font-style: normal;\n}\n.choice[_ngcontent-%COMP%]:hover {\n  border-color: #4c807a;\n  background: #eef5e8;\n}\n.choice[aria-pressed=true][_ngcontent-%COMP%] {\n  border: 2px solid #427d73;\n  padding: 10px 11px;\n  background: #e1eddf;\n}\n.choice-result[_ngcontent-%COMP%] {\n  border-left: 2px solid #b99451;\n  padding: 2px 0 2px 11px;\n  margin: 12px 0;\n}\n.choice-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin: 0 0 8px;\n}\n.choice-result[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6e673f;\n  display: block;\n}\n.scene-return[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 0;\n  border: 0;\n  background: none;\n  color: #235e61;\n  text-decoration: underline;\n  font-size: 11px;\n}\n.continue[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 44px;\n  margin-top: 12px;\n  padding: 10px;\n  border: 0;\n  border-radius: 5px;\n  color: #fff2cf;\n  background: #1e5558;\n  font-size: 12px;\n  font-weight: bold;\n}\n.event-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 15px;\n}\n.event-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 44px;\n  border: 1px solid #c1ccb9;\n  border-radius: 5px;\n  background: #e8eddf;\n  color: #496157;\n  padding: 6px;\n  font-size: 10px;\n}\n.event-tabs[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #d1dec9;\n  color: #203f36;\n  border-color: #70866e;\n}\n.observation-text[_ngcontent-%COMP%], \n.place-report[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.6;\n}\n.source-button[_ngcontent-%COMP%] {\n  padding: 5px 0;\n  min-height: 40px;\n  background: none;\n  border: 0;\n  text-decoration: underline;\n  color: #306d70;\n  font-size: 11px;\n}\n.tutor-plan[_ngcontent-%COMP%], \n.path-tools[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #d3dacf;\n  font-size: 11px;\n}\n.tutor-plan[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%], \n.path-tools[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  min-height: 36px;\n  color: #506861;\n  font-size: 11px;\n}\n.path-tools[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin: 8px 0;\n}\n.path-tools[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 7px;\n  border: 1px solid #a8baab;\n  color: #284d48;\n  background: #fffef5;\n  border-radius: 4px;\n  font-size: 11px;\n}\n.path-record[_ngcontent-%COMP%] {\n  padding-left: 18px;\n  font-size: 10px;\n}\n.path-record[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.path-record[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.path-record[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.path-record[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.path-record[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #59846a;\n}\n.testing-cue[_ngcontent-%COMP%], \n.save-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6b756c;\n}\n.map-tools[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  bottom: 18px;\n  color: #f7e8c4;\n  background: rgba(21, 52, 59, 0.9098039216);\n  border: 1px solid #9eb4a4;\n  border-radius: 6px;\n}\n.map-tools[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  display: grid;\n  place-content: center;\n  width: 46px;\n  height: 46px;\n  font-size: 22px;\n  list-style: none;\n}\n.map-tools[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 44px 44px;\n  gap: 5px;\n  padding: 8px;\n}\n.map-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 4px;\n  border: 1px solid #63837b;\n  color: #f7e8c4;\n  background: #1e484c;\n  border-radius: 4px;\n  font-size: 11px;\n}\n.show-options[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 18px;\n  bottom: 18px;\n  min-height: 44px;\n  border: 1px solid #a3b8a9;\n  border-radius: 6px;\n  background: rgba(22, 60, 66, 0.9098039216);\n  color: #f2e6bb;\n  font-size: 11px;\n  padding: 9px 14px;\n}\n.activity[_ngcontent-%COMP%]:has(app-journey-location-scene)   .show-options[_ngcontent-%COMP%] {\n  top: 72px;\n  bottom: auto;\n}\n.error[_ngcontent-%COMP%] {\n  color: #99432f;\n  font-size: 11px;\n}\n.source-dialog[_ngcontent-%COMP%] {\n  width: min(680px, 100% - 28px);\n  max-height: 85dvh;\n  border: 1px solid #809b8b;\n  padding: 24px;\n  border-radius: 9px;\n  background: #f7f5e8;\n  color: #304a43;\n}\n.source-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(12, 37, 43, 0.7333333333);\n}\n.source-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.source-dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 24px Georgia, serif;\n}\n.source-dialog[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 10px 15px;\n  min-height: 44px;\n  color: white;\n  background: #245356;\n  border-radius: 5px;\n}\n.source-dialog[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  padding-top: 16px;\n  border-top: 1px solid #bdc8b7;\n}\n.source-dialog[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 14px 0;\n  padding-left: 15px;\n  border-left: 2px solid #c6a762;\n  line-height: 1.7;\n}\n.source-dialog[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  color: #64775e;\n}\n@media (max-width: 1000px) {\n  .path-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 310px;\n  }\n  .planning-column[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .path-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    height: auto;\n    min-height: 0;\n  }\n  .activity[_ngcontent-%COMP%] {\n    height: min(64dvh, 550px);\n    min-height: 420px;\n  }\n  .planning-column[_ngcontent-%COMP%] {\n    overflow: visible;\n    padding: 14px;\n    border-left: 0;\n  }\n  .resource-meters[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(5, minmax(0, 1fr));\n  }\n  .show-options[_ngcontent-%COMP%] {\n    bottom: 13px;\n    right: 13px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=journey-path-workspace.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyPathWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-journey-path-workspace", imports: [
      LivingJourneyMapComponent,
      JourneyLocationSceneComponent,
      JourneyHistoryContextComponent
    ], providers: [JourneyPathRuntime], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="path-workspace">
  <section
    class="activity"
    tabindex="-1"
    [attr.aria-label]="node().kind === 'map' ? 'Choose the next passage on the map' : node().title"
    [attr.data-node]="node().id"
    [attr.data-session]="session()"
  >
    @if (node().kind === 'map') {
      <app-living-journey-map
        [map]="runtime.config.map"
        [team]="runtime.config.team"
        [route]="routeTrace()"
        [candidateRouteIds]="routeIds()"
        [candidateRouteLabels]="routeLabels()"
        [selectedRouteId]="selectedRoute()?.routeId"
        [activeLocationId]="node().locationId"
        [immersive]="true"
        [showRouteLabels]="false"
        [expeditionStyle]="true"
        [vesselArt]="vesselArt"
        mapLabel="Your Atlantic passage. Inspect a highlighted route, then choose it in AI Tutor. Drag the chart or use arrow keys to pan."
        (routeInspected)="inspectRoute($event)"
        (locationInspected)="inspectPlace($event)"
      />
      <details class="map-tools">
        <summary aria-label="Map tools">\u2316</summary>
        <div>
          <button type="button" aria-label="Zoom map in" (click)="map()?.zoomBy(0.25)">+</button>
          <button type="button" aria-label="Zoom map out" (click)="map()?.zoomBy(-0.25)">\u2212</button>
          <button type="button" (click)="map()?.resetView()">Fit chart</button>
          <button
            type="button"
            [attr.aria-pressed]="map()?.lensOn('weather')"
            (click)="map()?.toggleLens('weather')"
          >
            Wind
          </button>
        </div>
      </details>
    } @else {
      <app-journey-location-scene
        [node]="node()"
        [selections]="currentChoices()"
        [activeEventId]="activeEventId()"
        (inspected)="inspectEvent($event)"
      />
    }
    <button class="show-options" type="button" (click)="revealTutor()">
      {{ node().kind === 'map' ? 'Passage choices' : 'Event options' }} \u2197
    </button>
  </section>
  <aside class="planning-column" aria-label="Weekly tasks and AI Tutor">
    <details class="weekly-tasks" open>
      <summary>
        <span>Week {{ (session() + (session() % 2)) / 2 }} \xB7 Session {{ session() }}</span
        ><b>Tasks & product</b>
      </summary>
      <div class="tasks-body">
        <h2>{{ node().title }}</h2>
        <ul>
          @for (task of node().tasks; track $index) {
            <li>{{ task }}</li>
          }
        </ul>
        @if (!previewing() && incoming().length) {
          <div class="carried-task">
            <span>From your choices</span>
            @for (choice of incoming(); track choice.id) {
              <p>{{ choice.nextTask }}</p>
            }
          </div>
        }
        <p class="product"><b>Make</b> {{ node().product }}</p>
      </div>
    </details>
    <details #tutor class="tutor" open>
      <summary>
        <span class="tutor-emblem" aria-hidden="true">\u2726</span><b>AI Tutor</b
        ><small>Options only</small>
      </summary>
      <div class="tutor-body" tabindex="-1">
        <p class="connection">AI not connected \xB7 choose the next event here.</p>
        @if (previewing()) {
          <p class="practice-note">
            Scene preview \xB7 changes stay in this preview.
            <button (click)="backToPath()">Return to your path</button>
          </p>
        } @else if (pathEntry().provisional && session() > 1) {
          <p class="practice-note">Practice entry \xB7 earlier choices have not been recorded.</p>
        }
        <div class="resource-meters" aria-label="Modeled expedition resources">
          @for (resource of runtime.config.resources; track resource.id) {
            <div>
              <span>{{ resource.label }}</span
              ><strong
                >{{ resources()[resource.id] }}<small>{{ resource.unit }}</small></strong
              ><meter
                [min]="resource.minimum"
                [max]="resource.maximum"
                [value]="resources()[resource.id]"
                [attr.aria-label]="resource.label"
              ></meter>
            </div>
          }
        </div>
        @if (node().kind === 'map') {
          <section class="route-options" aria-label="Passage choices" tabindex="-1">
            <h3>Choose where to explore</h3>
            @for (choice of availableRoutes(); track choice.id) {
              <button
                type="button"
                class="choice"
                [attr.aria-pressed]="selectedRoute()?.id === choice.id"
                (click)="selectRoute(choice.id)"
              >
                <span>{{ choice.label }}</span
                ><small>{{ choice.summary }}</small>
                @if (choice.requiresAny?.length) {
                  <em>{{ previewing() ? 'Alternate path' : 'Revealed by earlier choices' }}</em>
                }
              </button>
            }
            @if (selectedRoute(); as choice) {
              <div class="choice-result" aria-live="polite">
                <p>{{ choice.nextTask }}</p>
                <small>{{ effectLabel(choice) }}</small>
              </div>
              <button class="continue" type="button" (click)="enterLocation()">
                Enter location \xB7 Session {{ session() + 1 }} \u2192
              </button>
            }
          </section>
          @if (inspectedPlace(); as place) {
            <section class="place-report" tabindex="-1">
              <h3>{{ place.name }}</h3>
              <p>{{ place.description }}</p>
            </section>
          }
        } @else {
          <nav class="event-tabs" aria-label="Location events">
            @for (event of node().events; track event.id; let index = $index) {
              <button
                type="button"
                [attr.aria-pressed]="activeEvent()?.id === event.id"
                (click)="inspectEvent(event.id)"
              >
                {{ index + 1 }} \xB7 {{ event.label }}
              </button>
            }
          </nav>
          @if (activeEvent(); as event) {
            <section class="event-options" tabindex="-1" [attr.aria-label]="event.label">
              <h3>{{ event.label }}</h3>
              <p class="observation-text">{{ event.observation }}</p>
              <button #sourceTrigger type="button" class="source-button" (click)="openSources()">
                Inspect source evidence \u2197
              </button>
              @for (choice of event.choices; track choice.id) {
                <button
                  type="button"
                  class="choice"
                  [attr.aria-pressed]="selected(event.id, choice.id)"
                  (click)="choose(event.id, choice)"
                >
                  <span>{{ choice.label }}</span
                  ><small>{{ choice.summary }}</small
                  ><em>{{ effectLabel(choice) }}</em>
                </button>
              }
              @if (eventSelected(); as choice) {
                <div class="choice-result" aria-live="polite">
                  <p>{{ preview(choice).consequence }}</p>
                  <small><b>Next investigation</b> {{ choice.nextTask }}</small
                  ><button type="button" class="scene-return" (click)="showScene()">
                    See ship & shore \u2191
                  </button>
                </div>
              }
            </section>
          }
          @if (nextNode()) {
            <button class="continue" type="button" (click)="next()">
              Next map \xB7 Session {{ session() + 1 }} \u2192
            </button>
            <p class="testing-cue">
              {{ completedEvents() }} / {{ node().events.length }} event choices \xB7 all sessions
              remain open.
            </p>
          } @else {
            <p class="testing-cue">
              Your route and event choices remain available to inspect or revise.
            </p>
          }
        }
        <details class="tutor-plan">
          <summary>Learning & future tutor plan</summary>
          <p>{{ node().learning }}</p>
          @for (choice of incoming(); track choice.id) {
            <p>{{ choice.learning }}</p>
          }
          @if (activeEvent(); as event) {
            <p><b>Question</b> {{ event.question }}</p>
            <p>
              <b>Evidence to inspect</b>
              @for (id of event.evidenceIds; track id) {
                <span>{{ sourceText(id) }}. </span>
              }
            </p>
          }
          <p>
            Future controls: ask about evidence, compare predictions, explain a revision. No AI
            responses, assessment or automatic adaptation are connected.
          </p>
        </details>
        <details class="path-tools">
          <summary>Explore paths & records</summary>
          <label for="path-scene">Inspect any scene</label>
          <select
            id="path-scene"
            [value]="previewNodeId() ?? ''"
            (change)="previewScene($any($event.target).value)"
          >
            <option value="">Your current path</option>
            @for (scene of definition.nodes; track scene.id) {
              <option [value]="scene.id">
                {{ scene.session }} \xB7 {{ scene.kind === 'map' ? 'Map' : 'Location' }} \xB7
                {{ placeName(scene.locationId) }} \xB7 {{ scene.title }}
              </option>
            }
          </select>
          <p>
            Alternate scenes are available for testing. Preview choices leave your saved path
            intact.
          </p>
          <ol class="path-record">
            @for (entry of runtime.path(); track entry.node.id) {
              <li>
                <b>{{ entry.node.session }} \xB7 {{ entry.node.title }}</b>
                @for (choice of entry.choices; track choice.id) {
                  <span>{{ choice.label }}</span>
                } @empty {
                  <small>No choice recorded</small>
                }
              </li>
            }
          </ol>
          <details>
            <summary>Earlier path revisions \xB7 {{ runtime.state().previousPaths.length }}</summary>
            @for (branch of runtime.state().previousPaths; track $index) {
              <p>
                <b>Revision {{ $index + 1 }}</b>
                @for (decision of branch; track decision.nodeId + decision.eventId) {
                  <span>{{ decisionLabel(decision) }} \xB7 </span>
                }
              </p>
            }
          </details>
          @if (runtime.config.historicalFrame; as history) {
            <app-journey-history-context [history]="history" [includeEpilogue]="session() === 8" />
          }
          <p class="save-note">
            Local practice \xB7 {{ runtime.saved() ? 'choices retained' : 'not saved' }}. No classroom
            submission or grade.
          </p>
        </details>
        @if (runtime.error()) {
          <p class="error" role="alert">
            {{ runtime.error() }} <button (click)="runtime.retrySave()">Retry save</button>
          </p>
        }
      </div>
    </details>
  </aside>
</div>
<dialog
  #sources
  class="source-dialog"
  aria-label="Location source evidence"
  (close)="closeSources()"
>
  <header>
    <h2>Source evidence</h2>
    <button type="button" (click)="sources.close()" aria-label="Close source evidence">
      Close
    </button>
  </header>
  @for (source of evidence(); track source.id) {
    <article>
      <h3>{{ source.title }}</h3>
      <small>{{ source.sourceLabel }}</small>
      @for (paragraph of source.paragraphs; track paragraph.id) {
        <blockquote>
          @if (paragraph.perspective) {
            <b>{{ paragraph.perspective }}</b>
          }
          {{ paragraph.text }}
        </blockquote>
      }
      @if (source.sourceUrl) {
        <a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer"
          >{{ source.attribution ?? source.sourceLabel }} \u2197</a
        >
      }
    </article>
  }
</dialog>
`, styles: ["/* src/app/templates/journey-replay/ui/journey-path-workspace.component.scss */\n:host {\n  display: block;\n  min-height: 0;\n  color: #203f42;\n  background: #eae9df;\n  font: 13px/1.5 Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.path-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 345px;\n  height: calc(100dvh - 102px);\n  min-height: 580px;\n}\n.activity {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n  background: #163d45;\n  scroll-margin-top: 104px;\n}\n.activity > app-living-journey-map,\n.activity > app-journey-location-scene {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.activity:focus {\n  outline: none;\n}\n.activity:focus-visible {\n  outline: 3px solid #d6b776;\n  outline-offset: -3px;\n}\n.planning-column {\n  overflow: auto;\n  border-left: 1px solid #acb7ad;\n  scrollbar-width: thin;\n  padding: 18px 17px 24px;\n}\n.weekly-tasks,\n.tutor {\n  border: 1px solid #c1c9bd;\n  border-radius: 9px;\n  background: #f7f7ef;\n  overflow: hidden;\n}\n.weekly-tasks {\n  margin-bottom: 14px;\n}\nsummary {\n  cursor: pointer;\n}\n.weekly-tasks > summary {\n  padding: 13px 16px;\n  background: #e0e7dc;\n}\n.weekly-tasks > summary span {\n  display: block;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n  color: #57716a;\n}\n.weekly-tasks > summary b {\n  font-size: 12px;\n}\n.tasks-body {\n  padding: 12px 16px;\n}\n.tasks-body h2 {\n  margin: 0 0 8px;\n  font: 500 20px/1.25 Georgia, serif;\n}\n.tasks-body ul {\n  padding-left: 17px;\n  margin: 9px 0;\n}\n.tasks-body li {\n  margin-bottom: 6px;\n  font-size: 12px;\n}\n.product {\n  border-top: 1px solid #d6dbcf;\n  padding-top: 9px;\n  margin: 10px 0 0;\n  font-size: 11px;\n}\n.product b {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  margin-right: 5px;\n}\n.carried-task {\n  border-left: 2px solid #cda660;\n  padding-left: 10px;\n  margin-top: 13px;\n}\n.carried-task span {\n  color: #806430;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.carried-task p {\n  margin: 4px 0 6px;\n  font-size: 11px;\n}\n.tutor > summary {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  background: #193d43;\n  color: #eff0df;\n}\n.tutor > summary small {\n  margin-left: auto;\n  color: #b8c9c1;\n  font-size: 10px;\n}\n.tutor-emblem {\n  color: #e7c27d;\n  font-size: 18px;\n}\n.tutor-body {\n  padding: 12px 14px 16px;\n}\n.connection {\n  font-size: 10px;\n  margin: 0 0 12px;\n  color: #546b65;\n}\n.practice-note {\n  border-left: 2px solid #ae8a4f;\n  padding: 4px 0 4px 8px;\n  color: #725d34;\n  font-size: 10px;\n}\n.practice-note button {\n  display: block;\n  margin-top: 8px;\n}\n.resource-meters {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px 10px;\n  padding-bottom: 14px;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #d5dccf;\n}\n.resource-meters span {\n  font-size: 9px;\n  display: block;\n  color: #5b716b;\n}\n.resource-meters strong {\n  font: 600 17px Georgia, serif;\n  display: block;\n}\n.resource-meters small {\n  font: 9px Arial, sans-serif;\n}\nmeter {\n  height: 6px;\n  width: 100%;\n  display: block;\n  margin-top: 4px;\n  accent-color: #387973;\n}\nh3 {\n  font: 600 15px/1.4 Georgia, serif;\n  margin: 0 0 10px;\n}\nbutton,\nselect {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:focus-visible,\nsummary:focus-visible,\nselect:focus-visible,\na:focus-visible,\n[tabindex]:focus-visible {\n  outline: 3px solid #298a8a;\n  outline-offset: 3px;\n}\n.choice {\n  display: block;\n  width: 100%;\n  text-align: left;\n  border: 1px solid #bfccc2;\n  border-radius: 6px;\n  background: #fffef5;\n  color: #233f40;\n  padding: 11px 12px;\n  margin: 8px 0;\n  min-height: 50px;\n  transition: background 0.15s;\n}\n.choice span {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n}\n.choice small {\n  display: block;\n  font-size: 10px;\n  margin-top: 4px;\n  line-height: 1.5;\n  color: #5c6d62;\n}\n.choice em {\n  display: block;\n  font-size: 9px;\n  margin-top: 5px;\n  color: #776334;\n  font-style: normal;\n}\n.choice:hover {\n  border-color: #4c807a;\n  background: #eef5e8;\n}\n.choice[aria-pressed=true] {\n  border: 2px solid #427d73;\n  padding: 10px 11px;\n  background: #e1eddf;\n}\n.choice-result {\n  border-left: 2px solid #b99451;\n  padding: 2px 0 2px 11px;\n  margin: 12px 0;\n}\n.choice-result p {\n  font-size: 11px;\n  margin: 0 0 8px;\n}\n.choice-result small {\n  font-size: 10px;\n  color: #6e673f;\n  display: block;\n}\n.scene-return {\n  min-height: 44px;\n  padding: 8px 0;\n  border: 0;\n  background: none;\n  color: #235e61;\n  text-decoration: underline;\n  font-size: 11px;\n}\n.continue {\n  display: block;\n  width: 100%;\n  min-height: 44px;\n  margin-top: 12px;\n  padding: 10px;\n  border: 0;\n  border-radius: 5px;\n  color: #fff2cf;\n  background: #1e5558;\n  font-size: 12px;\n  font-weight: bold;\n}\n.event-tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 15px;\n}\n.event-tabs button {\n  flex: 1;\n  min-height: 44px;\n  border: 1px solid #c1ccb9;\n  border-radius: 5px;\n  background: #e8eddf;\n  color: #496157;\n  padding: 6px;\n  font-size: 10px;\n}\n.event-tabs button[aria-pressed=true] {\n  background: #d1dec9;\n  color: #203f36;\n  border-color: #70866e;\n}\n.observation-text,\n.place-report p {\n  font-size: 11px;\n  line-height: 1.6;\n}\n.source-button {\n  padding: 5px 0;\n  min-height: 40px;\n  background: none;\n  border: 0;\n  text-decoration: underline;\n  color: #306d70;\n  font-size: 11px;\n}\n.tutor-plan,\n.path-tools {\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #d3dacf;\n  font-size: 11px;\n}\n.tutor-plan summary,\n.path-tools summary {\n  min-height: 36px;\n  color: #506861;\n  font-size: 11px;\n}\n.path-tools label {\n  display: block;\n  margin: 8px 0;\n}\n.path-tools select {\n  width: 100%;\n  padding: 10px 7px;\n  border: 1px solid #a8baab;\n  color: #284d48;\n  background: #fffef5;\n  border-radius: 4px;\n  font-size: 11px;\n}\n.path-record {\n  padding-left: 18px;\n  font-size: 10px;\n}\n.path-record li {\n  margin: 10px 0;\n}\n.path-record b,\n.path-record span,\n.path-record small {\n  display: block;\n}\n.path-record span {\n  color: #59846a;\n}\n.testing-cue,\n.save-note {\n  font-size: 10px;\n  color: #6b756c;\n}\n.map-tools {\n  position: absolute;\n  left: 18px;\n  bottom: 18px;\n  color: #f7e8c4;\n  background: rgba(21, 52, 59, 0.9098039216);\n  border: 1px solid #9eb4a4;\n  border-radius: 6px;\n}\n.map-tools summary {\n  display: grid;\n  place-content: center;\n  width: 46px;\n  height: 46px;\n  font-size: 22px;\n  list-style: none;\n}\n.map-tools > div {\n  display: grid;\n  grid-template-columns: 44px 44px;\n  gap: 5px;\n  padding: 8px;\n}\n.map-tools button {\n  min-height: 44px;\n  padding: 4px;\n  border: 1px solid #63837b;\n  color: #f7e8c4;\n  background: #1e484c;\n  border-radius: 4px;\n  font-size: 11px;\n}\n.show-options {\n  position: absolute;\n  right: 18px;\n  bottom: 18px;\n  min-height: 44px;\n  border: 1px solid #a3b8a9;\n  border-radius: 6px;\n  background: rgba(22, 60, 66, 0.9098039216);\n  color: #f2e6bb;\n  font-size: 11px;\n  padding: 9px 14px;\n}\n.activity:has(app-journey-location-scene) .show-options {\n  top: 72px;\n  bottom: auto;\n}\n.error {\n  color: #99432f;\n  font-size: 11px;\n}\n.source-dialog {\n  width: min(680px, 100% - 28px);\n  max-height: 85dvh;\n  border: 1px solid #809b8b;\n  padding: 24px;\n  border-radius: 9px;\n  background: #f7f5e8;\n  color: #304a43;\n}\n.source-dialog::backdrop {\n  background: rgba(12, 37, 43, 0.7333333333);\n}\n.source-dialog header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.source-dialog h2 {\n  font: 24px Georgia, serif;\n}\n.source-dialog button {\n  border: 0;\n  padding: 10px 15px;\n  min-height: 44px;\n  color: white;\n  background: #245356;\n  border-radius: 5px;\n}\n.source-dialog article {\n  margin-top: 18px;\n  padding-top: 16px;\n  border-top: 1px solid #bdc8b7;\n}\n.source-dialog blockquote {\n  margin: 14px 0;\n  padding-left: 15px;\n  border-left: 2px solid #c6a762;\n  line-height: 1.7;\n}\n.source-dialog blockquote b {\n  display: block;\n  color: #64775e;\n}\n@media (max-width: 1000px) {\n  .path-workspace {\n    grid-template-columns: minmax(0, 1fr) 310px;\n  }\n  .planning-column {\n    padding: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .path-workspace {\n    grid-template-columns: minmax(0, 1fr);\n    height: auto;\n    min-height: 0;\n  }\n  .activity {\n    height: min(64dvh, 550px);\n    min-height: 420px;\n  }\n  .planning-column {\n    overflow: visible;\n    padding: 14px;\n    border-left: 0;\n  }\n  .resource-meters {\n    grid-template-columns: repeat(5, minmax(0, 1fr));\n  }\n  .show-options {\n    bottom: 13px;\n    right: 13px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=journey-path-workspace.component.css.map */\n"] }]
  }], () => [], { map: [{ type: ViewChild, args: [forwardRef(() => LivingJourneyMapComponent), { isSignal: true }] }], tutor: [{ type: ViewChild, args: ["tutor", { isSignal: true }] }], sources: [{ type: ViewChild, args: ["sources", { isSignal: true }] }], sourceTrigger: [{ type: ViewChild, args: ["sourceTrigger", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyPathWorkspaceComponent, { className: "JourneyPathWorkspaceComponent", filePath: "src/app/templates/journey-replay/ui/journey-path-workspace.component.ts", lineNumber: 44 });
})();
export {
  JourneyPathWorkspaceComponent
};
//# debugId=f339e6c8-a8b4-5304-accc-5c608cdea352
//# sourceMappingURL=chunk-HA74I6MB.js.map
