import {
  NarrativeStoryMapComponent
} from "./chunk-YQSRM7MS.js";
import {
  narrativeWeekConfig,
  usesNarrativeWeeklyPreview,
  validateNarrativePreview
} from "./chunk-KYN6TK4M.js";
import {
  MemoryNarrativeStudioPersistenceAdapter,
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_PERSISTENCE,
  NARRATIVE_STUDIO_SESSION,
  NarrativeStudioRuntimeService
} from "./chunk-PJDX5C2H.js";
import {
  createInitialNarrativeState,
  wordCount
} from "./chunk-M73YRRYA.js";
import "./chunk-G626JLCU.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import {
  Component,
  ElementRef,
  Injectable,
  Injector,
  afterRenderEffect,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/narrative-studio/runtime/narrative-week-runtime.service.ts
var NarrativeWeekRuntimeService = class _NarrativeWeekRuntimeService {
  config = inject(NARRATIVE_STUDIO_CONFIG);
  session = inject(NARRATIVE_STUDIO_SESSION);
  parent = inject(Injector);
  runtimes = /* @__PURE__ */ new Map();
  constructor() {
    if (!usesNarrativeWeeklyPreview(this.config, this.session))
      throw new Error("NARRATIVE_PREVIEW_UNAVAILABLE: A local authoring preview is required.");
    validateNarrativePreview(this.config);
  }
  forWeek(week) {
    const cached = this.runtimes.get(week.id);
    if (cached)
      return cached.runtime;
    const config = narrativeWeekConfig(this.config, week);
    const initial = createInitialNarrativeState(config);
    const persistence = new MemoryNarrativeStudioPersistenceAdapter();
    persistence.save(__spreadProps(__spreadValues({}, initial), {
      storyTitle: week.title,
      bible: __spreadProps(__spreadValues({}, initial.bible), { pointOfView: "first" }),
      scenes: Object.fromEntries(week.scenes.map((scene) => [scene.id, __spreadProps(__spreadValues({}, initial.scenes[scene.id]), {
        text: scene.starterText,
        choiceLabels: Object.fromEntries(scene.choices.map((choice) => [choice.id, choice.prompt]))
      })]))
    }));
    const injector = Injector.create({ parent: this.parent, providers: [
      { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
      { provide: NARRATIVE_STUDIO_SESSION, useValue: this.session },
      { provide: NARRATIVE_STUDIO_PERSISTENCE, useValue: persistence },
      { provide: NARRATIVE_STUDIO_COACH, useValue: { respond: () => Promise.reject(new Error("TUTOR_DISCONNECTED")) } },
      NarrativeStudioRuntimeService
    ] });
    const runtime = injector.get(NarrativeStudioRuntimeService);
    this.runtimes.set(week.id, { runtime, injector });
    return runtime;
  }
  ngOnDestroy() {
    for (const { runtime, injector } of this.runtimes.values()) {
      runtime.destroy();
      injector.destroy();
    }
    this.runtimes.clear();
  }
  static \u0275fac = function NarrativeWeekRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeWeekRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NarrativeWeekRuntimeService, factory: _NarrativeWeekRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeWeekRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/narrative-studio/ui/narrative-week-workspace.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NarrativeWeekWorkspaceComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_For_20_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.chooseTool(item_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.tool() === item_r2.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.tool() === item_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.label);
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Extra tool open \xB7 the products and tutor plan still describe Week ", ctx_r2.week().week, ", ", ctx_r2.session().title, ".");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "h2");
    \u0275\u0275text(2, "Your branch map");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Select any scene to edit its writing or change its branches.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-narrative-story-map", 20);
    \u0275\u0275listener("nodeSelected", function NarrativeWeekWorkspaceComponent_Conditional_23_Template_app_narrative_story_map_nodeSelected_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectScene($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("config", ctx_r2.runtime().storyConfig())("scenes", ctx_r2.runtime().state().scenes)("activeNodeId", ctx_r2.runtime().state().selectedNodeId);
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Replaying a temporary earlier version. Original route: ", ctx.path.join(" \u2192 "), ". Restart returns to your current draft.");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_24_For_8_Template_button_click_0_listener() {
      const \u0275$index_68_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.stepBack(\u0275$index_68_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r8 = ctx.$implicit;
    const \u0275$index_68_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-current", \u0275$index_68_r7 === ctx_r2.path().length - 1 ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275$index_68_r7 + 1, " \xB7 ", ctx_r2.readerScenes()[id_r8].title || "Untitled scene");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_16_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_16_For_4_Template_button_click_0_listener() {
      const choice_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.choosePath(choice_r10.nextNodeId));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "b", 30);
    \u0275\u0275text(5, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r10 = ctx.$implicit;
    const \u0275$index_89_r11 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_89_r11 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.readerScene().choiceLabels[choice_r10.id] || "Untitled choice \u2014 edit in the writer", " ");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 29);
    \u0275\u0275repeaterCreate(3, NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_16_For_4_Template, 6, 2, "button", 24, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.readerNode().choiceQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.readerNode().choices);
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.readerNode().kind === "ending" ? "End of this path" : "This branch is ready for you to continue writing.");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_24_For_24_Template_button_click_0_listener() {
      const reading_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replayPath(reading_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reading_r13 = ctx.$implicit;
    const \u0275$index_111_r14 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Replay ", \u0275$index_111_r14 + 1, " \xB7 ", reading_r13.scenes[reading_r13.path.at(-1)].title, " \xB7 ", reading_r13.path.length, " scenes");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Follow a route to an ending to try it again here.");
    \u0275\u0275elementEnd();
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.restart());
    });
    \u0275\u0275text(2, "Restart current draft");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_24_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editReaderScene());
    });
    \u0275\u0275text(4, "Edit this scene");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_5_Template, 2, 1, "p", 22);
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275repeaterCreate(7, NarrativeWeekWorkspaceComponent_Conditional_24_For_8_Template, 2, 3, "button", 24, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "article", 25)(10, "p", 3);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h2");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_16_Template, 5, 1)(17, NarrativeWeekWorkspaceComponent_Conditional_24_Conditional_17_Template, 2, 1, "p", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "details", 28)(19, "summary");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Temporary versions, kept only on this page. The latest 20 paths remain available.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, NarrativeWeekWorkspaceComponent_Conditional_24_For_24_Template, 2, 3, "button", 24, \u0275\u0275repeaterTrackByIndex, false, NarrativeWeekWorkspaceComponent_Conditional_24_ForEmpty_25_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.replay()) ? 5 : -1, tmp_1_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.path());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.replay()?.title ?? ctx_r2.runtime().state().storyTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.readerScene().title || "Untitled scene");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.readerScene().text || "This scene is empty. Open the writer to create it.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.readerNode().choices.length ? 16 : 17);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Paths tried in this test (", ctx_r2.currentReadings().length, ")");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.currentReadings());
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", node_r16.id)("selected", node_r16.id === ctx_r2.runtime().state().selectedNodeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.sceneTitle(node_r16.id));
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 40)(1, "p", 3);
    \u0275\u0275text(2, "Original fictional sample");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.sample()?.suggestedTitle || "New branch");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.sample()?.starterText || "You created this branch. It has no sample text.");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "input", 47);
    \u0275\u0275listener("input", function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_For_4_Template_input_input_3_listener($event) {
      const choice_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime().updateChoice(choice_r18.id, ctx_r2.inputValue($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_For_4_Template_button_click_4_listener() {
      const choice_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectScene(choice_r18.nextNodeId));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r18 = ctx.$implicit;
    const \u0275$index_188_r19 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Choice ", \u0275$index_188_r19 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.runtime().selectedScene().choiceLabels[choice_r18.id]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Write destination \u2192 ", ctx_r2.sceneTitle(choice_r18.nextNodeId));
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 45)(1, "legend");
    \u0275\u0275text(2, "Reader choices");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_For_4_Template, 6, 3, "div", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime().selectedNode().choices);
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeBranch("branch"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.runtime().selectedScene().parkedChoices?.length ? "Restore continuation" : "Add two branches");
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeBranch("finish"));
    });
    \u0275\u0275text(1, "Make this an ending");
    \u0275\u0275elementEnd();
  }
}
function NarrativeWeekWorkspaceComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "label");
    \u0275\u0275text(2, "Scene");
    \u0275\u0275elementStart(3, "select", 32);
    \u0275\u0275listener("change", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectScene(ctx_r2.inputValue($event)));
    });
    \u0275\u0275repeaterCreate(4, NarrativeWeekWorkspaceComponent_Conditional_25_For_5_Template, 2, 3, "option", 33, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Writing lens");
    \u0275\u0275elementStart(8, "select", 34);
    \u0275\u0275listener("change", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_select_change_8_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime().updateBible("pointOfView", ctx_r2.inputValue($event) === "first" ? "first" : "third"));
    });
    \u0275\u0275elementStart(9, "option", 35);
    \u0275\u0275text(10, "First person \xB7 I");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 36);
    \u0275\u0275text(12, "Third person \xB7 they");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 37);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.chooseTool("read"));
    });
    \u0275\u0275text(14, "\u25B6 Play story");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "p", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "The writing lens is your intention; changing it does not rewrite your words.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 39);
    \u0275\u0275conditionalCreate(20, NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_20_Template, 7, 2, "article", 40);
    \u0275\u0275elementStart(21, "div", 41)(22, "label");
    \u0275\u0275text(23, "Scene title");
    \u0275\u0275elementStart(24, "input", 42);
    \u0275\u0275listener("input", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_input_input_24_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime().updateSceneTitle(ctx_r2.inputValue($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "label", 43)(26, "span");
    \u0275\u0275text(27, "Your scene ");
    \u0275\u0275elementStart(28, "small");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_textarea_input_30_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime().updateSceneText(ctx_r2.inputValue($event)));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(31, NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_31_Template, 5, 0, "fieldset", 45);
    \u0275\u0275elementStart(32, "div", 46);
    \u0275\u0275conditionalCreate(33, NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_33_Template, 2, 1, "button", 24);
    \u0275\u0275conditionalCreate(34, NarrativeWeekWorkspaceComponent_Conditional_25_Conditional_34_Template, 2, 0, "button", 24);
    \u0275\u0275elementStart(35, "button", 18);
    \u0275\u0275listener("click", function NarrativeWeekWorkspaceComponent_Conditional_25_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.chooseTool("map"));
    });
    \u0275\u0275text(36, "See the branch map");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "p", 22);
    \u0275\u0275text(38, "Fictional sample writing is editable. Ending a path keeps its later drafts in memory so you can restore the continuation.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime().state().selectedNodeId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime().storyConfig().nodes);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime().state().bible.pointOfView);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime().selectedNode().craftPrompt, " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("comparing", ctx_r2.tool() === "revise");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.tool() === "revise" ? 20 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime().selectedScene().title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.wordCount(ctx_r2.runtime().selectedScene().text), " words \xB7 temporary draft");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.runtime().selectedScene().text);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime().selectedNode().choices.length ? 31 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.runtime().selectedNode().choices.length ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime().selectedNode().id !== ctx_r2.week().startNodeId ? 34 : -1);
  }
}
function NarrativeWeekWorkspaceComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const \u0275$index_235_r23 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", ctx_r2.sessionIndex() === \u0275$index_235_r23);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Session ", \u0275$index_235_r23 + 1, " \xB7 ", \u0275$index_235_r23 === 0 ? "Individual learning" : "Group activity");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r22.product);
  }
}
function NarrativeWeekWorkspaceComponent_For_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r24);
  }
}
function NarrativeWeekWorkspaceComponent_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r25 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r25);
  }
}
function NarrativeWeekWorkspaceComponent_For_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r26);
  }
}
var NarrativeWeekWorkspaceComponent = class _NarrativeWeekWorkspaceComponent {
  studio = inject(NarrativeWeekRuntimeService);
  lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  element = inject(ElementRef);
  focusRequest = signal(
    0,
    ...ngDevMode ? [{ debugName: "focusRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weeks = this.studio.config.previewWeeks;
  week = computed(
    () => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionIndex = computed(
    () => (this.selectedLesson() - 1) % 2,
    ...ngDevMode ? [{ debugName: "sessionIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.week().sessions[this.sessionIndex()],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runtime = computed(
    () => this.studio.forWeek(this.week()),
    ...ngDevMode ? [{ debugName: "runtime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tool = signal(
    "write",
    ...ngDevMode ? [{ debugName: "tool" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tools = [
    { id: "write", label: "Scene writer" },
    { id: "map", label: "Branch map" },
    { id: "revise", label: "Compare & revise" },
    { id: "read", label: "Play story" }
  ];
  extraTool = computed(
    () => this.tool() !== this.session().tool,
    ...ngDevMode ? [{ debugName: "extraTool" }] : (
      /* istanbul ignore next */
      []
    )
  );
  wordCount = wordCount;
  sample = computed(
    () => this.week().scenes.find((scene) => scene.id === this.runtime().state().selectedNodeId),
    ...ngDevMode ? [{ debugName: "sample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  path = signal(
    [],
    ...ngDevMode ? [{ debugName: "path" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replay = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "replay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readings = signal(
    {},
    ...ngDevMode ? [{ debugName: "readings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentReadings = computed(
    () => this.readings()[this.week().id] ?? [],
    ...ngDevMode ? [{ debugName: "currentReadings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerConfig = computed(
    () => this.replay()?.config ?? this.runtime().storyConfig(),
    ...ngDevMode ? [{ debugName: "readerConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerScenes = computed(
    () => this.replay()?.scenes ?? this.runtime().state().scenes,
    ...ngDevMode ? [{ debugName: "readerScenes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerId = computed(
    () => this.path().at(-1) ?? this.week().startNodeId,
    ...ngDevMode ? [{ debugName: "readerId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerNode = computed(
    () => this.readerConfig().nodes.find((node) => node.id === this.readerId()),
    ...ngDevMode ? [{ debugName: "readerNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerScene = computed(
    () => this.readerScenes()[this.readerId()],
    ...ngDevMode ? [{ debugName: "readerScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputValue = (event) => event.target.value;
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
    afterRenderEffect(() => {
      this.selectedLesson();
      this.element.nativeElement.scrollIntoView?.({ block: "start", behavior: "instant" });
    });
    afterRenderEffect(() => {
      if (!this.focusRequest())
        return;
      const region = this.element.nativeElement.querySelector(".active-surface");
      region?.focus({ preventScroll: true });
      region?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
    });
  }
  openLesson(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.selectedLesson.set(number);
    const preferred = this.session().nodeId;
    const target = this.runtime().storyConfig().nodes.some((node) => node.id === preferred) ? preferred : this.week().startNodeId;
    this.runtime().selectNode(target);
    this.tool.set(this.session().tool);
    this.restart();
  }
  chooseTool(tool) {
    this.tool.set(tool);
    if (tool === "read")
      this.restart();
    this.reveal();
  }
  selectScene(id) {
    this.runtime().selectNode(id);
    if (this.tool() !== "revise")
      this.tool.set("write");
    this.reveal();
  }
  changeBranch(action) {
    this.runtime().changeBranch(action);
  }
  restart() {
    this.replay.set(void 0);
    this.path.set([this.week().startNodeId]);
  }
  choosePath(id) {
    if (!this.readerNode().choices.some((choice) => choice.nextNodeId === id))
      return;
    this.path.update((path) => [...path, id]);
    if (this.readerNode().kind === "ending" && !this.replay()) {
      const reading = {
        path: [...this.path()],
        title: this.runtime().state().storyTitle,
        config: structuredClone(this.runtime().storyConfig()),
        scenes: Object.fromEntries(Object.entries(this.runtime().state().scenes).map(([key, scene]) => [key, __spreadProps(__spreadValues({}, structuredClone(scene)), { revisions: [] })]))
      };
      this.readings.update((history) => __spreadProps(__spreadValues({}, history), { [this.week().id]: [...this.currentReadings(), reading].slice(-20) }));
    }
    this.reveal();
  }
  replayPath(reading) {
    this.replay.set(reading);
    this.path.set([reading.path[0]]);
    this.tool.set("read");
    this.reveal();
  }
  stepBack(index) {
    this.path.update((path) => path.slice(0, index + 1));
    this.reveal();
  }
  editReaderScene() {
    const id = this.readerId();
    this.replay.set(void 0);
    this.selectScene(this.runtime().storyConfig().nodes.some((node) => node.id === id) ? id : this.week().startNodeId);
  }
  sceneTitle(id) {
    return this.runtime().state().scenes[id]?.title || "Untitled scene";
  }
  reveal() {
    this.focusRequest.update((value) => value + 1);
  }
  static \u0275fac = function NarrativeWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativeWeekWorkspaceComponent, selectors: [["app-narrative-week-workspace"]], features: [\u0275\u0275ProvidersFeature([NarrativeWeekRuntimeService])], decls: 67, vars: 11, consts: [[1, "week-workspace"], ["aria-label", "Interactive story workspace", 1, "interactive"], [1, "mission-header"], [1, "eyebrow"], [1, "test-badge"], [1, "session-bar"], ["aria-label", "Story tools", 1, "tool-bar"], ["type", "button", 3, "active"], [1, "extra-note"], ["tabindex", "-1", 1, "active-surface"], [1, "memory-note"], ["aria-label", "Weekly products and tutor planning", 1, "planning"], ["open", "", 1, "plan-card"], [1, "products"], [3, "current"], [1, "footnote"], ["open", "", 1, "plan-card", "tutor-card"], [1, "offline"], ["type", "button", 3, "click"], [1, "surface-heading"], [3, "nodeSelected", "config", "scenes", "activeNodeId"], [1, "reader-toolbar"], [1, "sample-note"], ["aria-label", "Current reading path", 1, "path-strip"], ["type", "button"], [1, "reader"], [1, "story-copy"], [1, "ending"], [1, "test-paths"], [1, "reader-choices"], ["aria-hidden", "true"], [1, "editor-tools"], ["aria-label", "Writing scene", 3, "change", "value"], [3, "value", "selected"], ["aria-label", "Writing point of view", 3, "change", "value"], ["value", "first"], ["value", "third"], ["type", "button", 1, "primary", 3, "click"], [1, "craft-prompt"], [1, "draft-grid"], [1, "original"], [1, "writer"], [3, "input", "value"], [1, "prose-label"], ["aria-label", "Your scene", "rows", "9", "spellcheck", "true", "placeholder", "Write the next moment in your own words\u2026", 3, "input", "value"], [1, "choice-editor"], [1, "branch-actions"], ["placeholder", "Write a decision the reader can make", 3, "input", "value"]], template: function NarrativeWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "p", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "span", 4);
      \u0275\u0275text(10, "Editable sample \xB7 resets on reload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 5)(12, "strong");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "h2");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "nav", 6);
      \u0275\u0275repeaterCreate(19, NarrativeWeekWorkspaceComponent_For_20_Template, 2, 4, "button", 7, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, NarrativeWeekWorkspaceComponent_Conditional_21_Template, 2, 2, "p", 8);
      \u0275\u0275elementStart(22, "section", 9);
      \u0275\u0275conditionalCreate(23, NarrativeWeekWorkspaceComponent_Conditional_23_Template, 6, 3)(24, NarrativeWeekWorkspaceComponent_Conditional_24_Template, 26, 7)(25, NarrativeWeekWorkspaceComponent_Conditional_25_Template, 39, 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 10);
      \u0275\u0275text(27, "Nothing is saved to student records. Edits and path tests last only while this workspace stays open.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "aside", 11)(29, "details", 12)(30, "summary")(31, "span", 3);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "h2");
      \u0275\u0275text(34, "Proposed weekly products");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "p");
      \u0275\u0275text(36, "Potential work \xB7 no completion tracking");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "ol", 13);
      \u0275\u0275repeaterCreate(38, NarrativeWeekWorkspaceComponent_For_39_Template, 5, 5, "li", 14, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 15);
      \u0275\u0275text(41, "A future tutor will guide and review work before any completion is recorded. Group sessions are writing-circle plans; shared editing is not connected.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "details", 16)(43, "summary")(44, "span", 3);
      \u0275\u0275text(45, "BUILD PLANNING");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "h2");
      \u0275\u0275text(47, "AI Tutor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "span", 17);
      \u0275\u0275text(49, "Not connected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "h3");
      \u0275\u0275text(51, "Questions and concepts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "ul");
      \u0275\u0275repeaterCreate(53, NarrativeWeekWorkspaceComponent_For_54_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "h3");
      \u0275\u0275text(56, "Evidence to inspect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "ul");
      \u0275\u0275repeaterCreate(58, NarrativeWeekWorkspaceComponent_For_59_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "h3");
      \u0275\u0275text(61, "Future model controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "ul");
      \u0275\u0275repeaterCreate(63, NarrativeWeekWorkspaceComponent_For_64_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p", 15);
      \u0275\u0275text(66, "Planning only. No tutor responses, automatic revision, assessment, or mastery decisions run in this test.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-week", ctx.week().week);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("STORY WRITING \xB7 WEEK ", ctx.week().week);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.week().setting);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.sessionIndex() === 0 ? "Individual learning" : "Group activity \xB7 local test");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.session().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.session().mission);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tools);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.extraTool() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.tool() === "read" ? "Playable story" : "Story authoring");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tool() === "map" ? 23 : ctx.tool() === "read" ? 24 : 25);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("WEEK ", ctx.week().week);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.week().sessions);
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().evidence);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().controls);
    }
  }, dependencies: [NarrativeStoryMapComponent], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  scroll-margin-top: 118px;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  color: #203a3c;\n  --%NS%ink: #214e50;\n  --%NS%accent: #206b68;\n  --%NS%wash: #edf5f2;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.week-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 20px;\n  max-width: 1580px;\n  margin: 0 auto;\n  padding: 18px 24px 36px;\n  background: #f5f6f1;\n}\n[data-week="2"][_ngcontent-%COMP%] {\n  --%NS%ink: #314c66;\n  --%NS%accent: #386587;\n  --%NS%wash: #eef3f8;\n}\n[data-week="3"][_ngcontent-%COMP%] {\n  --%NS%ink: #59466c;\n  --%NS%accent: #745c89;\n  --%NS%wash: #f4f0f7;\n}\n[data-week="4"][_ngcontent-%COMP%] {\n  --%NS%ink: #654d29;\n  --%NS%accent: #8d662d;\n  --%NS%wash: #faf4e8;\n}\n.interactive[_ngcontent-%COMP%], \n.planning[_ngcontent-%COMP%], \n.writer[_ngcontent-%COMP%], \n.original[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.interactive[_ngcontent-%COMP%] {\n  border: 1px solid #d9e2dc;\n  border-radius: 18px;\n  background: white;\n  overflow: hidden;\n}\n.mission-header[_ngcontent-%COMP%] {\n  background: var(--%NS%ink);\n  color: white;\n  padding: 23px 26px 20px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: 1.4px;\n  text-transform: uppercase;\n}\n.mission-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 7px;\n  color: #dbebe6;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(25px, 2.7vw, 36px);\n  line-height: 1.13;\n  margin: 0 0 8px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  line-height: 1.3;\n  margin: 0;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  margin: 20px 0 9px;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.55;\n}\n.mission-header[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  margin: 0;\n  max-width: 76ch;\n  font-size: 14px;\n  color: #f0f4ef;\n}\n.test-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 750;\n  border: 1px solid rgba(255, 255, 255, 0.3882352941);\n  padding: 5px 10px;\n  border-radius: 30px;\n  margin-top: 12px;\n}\n.session-bar[_ngcontent-%COMP%] {\n  padding: 17px 24px 13px;\n  background: var(--%NS%wash);\n}\n.session-bar[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n.session-bar[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.session-bar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 0;\n}\n.tool-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  padding: 12px 24px;\n  border-bottom: 1px solid #e2e7e3;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #cddbd5;\n  border-radius: 8px;\n  background: white;\n  color: var(--%NS%ink);\n  padding: 10px 13px;\n  font-size: 13px;\n  font-weight: 700;\n  min-height: 42px;\n  line-height: 1.35;\n  white-space: normal;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%wash);\n  border-color: var(--%NS%accent);\n}\nbutton.active[_ngcontent-%COMP%], \nbutton.primary[_ngcontent-%COMP%] {\n  background: var(--%NS%accent);\n  color: white;\n  border-color: var(--%NS%accent);\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bc6b31;\n  outline-offset: 3px;\n}\n.active-surface[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.active-surface[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  min-height: 350px;\n}\n.surface-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 15px;\n  font-size: 14px;\n}\n.editor-tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  gap: 12px;\n}\n.editor-tools[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  color: #3a5453;\n  font-size: 12px;\n  font-weight: 750;\n  min-width: 0;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #c9d6cf;\n  border-radius: 8px;\n  padding: 10px 11px;\n  background: white;\n  color: #253e3d;\n  font-weight: 400;\n}\nselect[_ngcontent-%COMP%] {\n  max-width: 100%;\n  min-height: 42px;\n}\ninput[_ngcontent-%COMP%] {\n  font-size: 14px;\n  min-height: 42px;\n}\ntextarea[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.7;\n  resize: vertical;\n  min-height: 230px;\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\n.craft-prompt[_ngcontent-%COMP%] {\n  padding-left: 12px;\n  border-left: 3px solid var(--%NS%accent);\n  font-size: 13px;\n  margin: 16px 0;\n}\n.craft-prompt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #61736e;\n  font-size: 11px;\n  margin-top: 5px;\n}\n.draft-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n.draft-grid.comparing[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);\n}\n.original[_ngcontent-%COMP%] {\n  background: var(--%NS%wash);\n  border-radius: 10px;\n  padding: 17px;\n}\n.original[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: var(--%NS%accent);\n}\n.original[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 20px;\n  font-family: Georgia, serif;\n}\n.original[_ngcontent-%COMP%]   .story-copy[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.prose-label[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n.prose-label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #687e75;\n  font-weight: 500;\n}\n.choice-editor[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  margin: 18px 0;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 13px;\n}\nlegend[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-size: 14px;\n  margin-bottom: 12px;\n}\n.choice-editor[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: var(--%NS%wash);\n  padding: 12px;\n  border-radius: 10px;\n}\n.choice-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 8px;\n  font-size: 11px;\n  background: transparent;\n  text-align: left;\n}\n.branch-actions[_ngcontent-%COMP%], \n.reader-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n}\n.sample-note[_ngcontent-%COMP%], \n.memory-note[_ngcontent-%COMP%], \n.extra-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #61766f;\n}\n.sample-note[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.memory-note[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 13px 24px;\n  border-top: 1px solid #e4e9e6;\n  background: #fafbf7;\n}\n.extra-note[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 10px 24px;\n  background: #fff6e8;\n  color: #775023;\n}\n.reader[_ngcontent-%COMP%] {\n  background: #fffdf7;\n  padding: 26px;\n  border: 1px solid #e4e3d7;\n  border-radius: 12px;\n}\n.reader[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  margin: 0 0 12px;\n}\n.reader[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 30px;\n}\n.story-copy[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 19px;\n  line-height: 1.8;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.reader-choices[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n.reader-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 15px;\n}\n.reader-choices[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  background: var(--%NS%wash);\n  border-radius: 50%;\n  padding: 7px 11px;\n}\n.reader-choices[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.path-strip[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin: 13px 0;\n}\n.path-strip[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 32px;\n  font-size: 10px;\n  padding: 6px 10px;\n}\n.path-strip[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%] {\n  background: var(--%NS%wash);\n}\n.ending[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--%NS%accent);\n  border-top: 1px solid #ddd;\n  padding-top: 15px;\n  font-weight: 700;\n}\n.test-paths[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 12px 0;\n}\n.test-paths[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.test-paths[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  width: 100%;\n  text-align: left;\n}\n.planning[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  border: 1px solid #d8e1dc;\n  border-radius: 15px;\n  background: white;\n  padding: 20px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 800;\n  min-height: 30px;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  position: relative;\n  padding-right: 15px;\n  list-style: none;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::after {\n  content: "+";\n  position: absolute;\n  right: 0;\n  top: 9px;\n  font-size: 20px;\n}\n.plan-card[open][_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::after {\n  content: "\\2212";\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  display: block;\n  margin-bottom: 8px;\n}\n.plan-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.plan-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7b74;\n  margin: 13px 0;\n}\n.products[_ngcontent-%COMP%] {\n  padding-left: 0;\n  list-style: none;\n  margin: 15px 0;\n  display: grid;\n  gap: 10px;\n}\n.products[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 12px 13px;\n  border-left: 3px solid #dce6df;\n  border-radius: 0 8px 8px 0;\n}\n.products[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent);\n  background: var(--%NS%wash);\n}\n.products[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.products[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 7px 0 0;\n}\n.offline[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 10px;\n  color: #655833;\n  background: #f6edcd;\n  padding: 5px 9px;\n  border-radius: 30px;\n  margin-top: 9px;\n}\n.tutor-card[_ngcontent-%COMP%] {\n  background: #fbfcf8;\n}\n.tutor-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n  margin: 0;\n}\n.tutor-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 7px 0;\n}\n.footnote[_ngcontent-%COMP%] {\n  font-size: 11px !important;\n  line-height: 1.6;\n  border-top: 1px solid #e0e7e0;\n  padding-top: 13px;\n  margin-bottom: 0 !important;\n}\n.active-surface[_ngcontent-%COMP%] {\n  scroll-margin-top: 118px;\n}\n@media (max-width: 1000px) {\n  [_nghost-%COMP%], \n   .active-surface[_ngcontent-%COMP%] {\n    scroll-margin-top: 158px;\n  }\n  .week-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 16px;\n  }\n  .planning[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n}\n@media (max-width: 620px) {\n  [_nghost-%COMP%], \n   .active-surface[_ngcontent-%COMP%] {\n    scroll-margin-top: 256px;\n  }\n  .week-workspace[_ngcontent-%COMP%] {\n    padding: 10px;\n    gap: 12px;\n  }\n  .mission-header[_ngcontent-%COMP%], \n   .session-bar[_ngcontent-%COMP%], \n   .active-surface[_ngcontent-%COMP%] {\n    padding: 18px 15px;\n  }\n  .tool-bar[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n  .tool-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px 7px;\n  }\n  .planning[_ngcontent-%COMP%], \n   .draft-grid.comparing[_ngcontent-%COMP%], \n   .choice-editor[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .editor-tools[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n  .reader[_ngcontent-%COMP%] {\n    padding: 19px 15px;\n  }\n  .reader[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .story-copy[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .plan-card[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .memory-note[_ngcontent-%COMP%], \n   .extra-note[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n  }\n  input[_ngcontent-%COMP%], \n   select[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=narrative-week-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-week-workspace", imports: [NarrativeStoryMapComponent], providers: [NarrativeWeekRuntimeService], template: `<main class="week-workspace" [attr.data-week]="week().week">
  <section class="interactive" aria-label="Interactive story workspace">
    <header class="mission-header">
      <p class="eyebrow">STORY WRITING \xB7 WEEK {{ week().week }}</p>
      <h1>{{ week().title }}</h1>
      <p>{{ week().setting }}</p>
      <span class="test-badge">Editable sample \xB7 resets on reload</span>
    </header>
    <div class="session-bar">
      <strong>{{ sessionIndex() === 0 ? 'Individual learning' : 'Group activity \xB7 local test' }}</strong>
      <h2>{{ session().title }}</h2>
      <p>{{ session().mission }}</p>
    </div>
    <nav class="tool-bar" aria-label="Story tools">
      @for (item of tools; track item.id) {
        <button type="button" [class.active]="tool() === item.id" [attr.aria-pressed]="tool() === item.id" (click)="chooseTool(item.id)">{{ item.label }}</button>
      }
    </nav>
    @if (extraTool()) {
      <p class="extra-note">Extra tool open \xB7 the products and tutor plan still describe Week {{ week().week }}, {{ session().title }}.</p>
    }
    <section class="active-surface" tabindex="-1" [attr.aria-label]="tool() === 'read' ? 'Playable story' : 'Story authoring'">
      @if (tool() === 'map') {
        <div class="surface-heading"><h2>Your branch map</h2><p>Select any scene to edit its writing or change its branches.</p></div>
        <app-narrative-story-map [config]="runtime().storyConfig()" [scenes]="runtime().state().scenes" [activeNodeId]="runtime().state().selectedNodeId" (nodeSelected)="selectScene($event)" />
      } @else if (tool() === 'read') {
        <div class="reader-toolbar">
          <button type="button" (click)="restart()">Restart current draft</button>
          <button type="button" (click)="editReaderScene()">Edit this scene</button>
        </div>
        @if (replay(); as reading) { <p class="sample-note">Replaying a temporary earlier version. Original route: {{ reading.path.join(' \u2192 ') }}. Restart returns to your current draft.</p> }
        <div class="path-strip" aria-label="Current reading path">
          @for (id of path(); track $index; let index = $index) {
            <button type="button" (click)="stepBack(index)" [attr.aria-current]="index === path().length - 1 ? 'step' : null">{{ index + 1 }} \xB7 {{ readerScenes()[id].title || 'Untitled scene' }}</button>
          }
        </div>
        <article class="reader">
          <p class="eyebrow">{{ replay()?.title ?? runtime().state().storyTitle }}</p>
          <h2>{{ readerScene().title || 'Untitled scene' }}</h2>
          <p class="story-copy">{{ readerScene().text || 'This scene is empty. Open the writer to create it.' }}</p>
          @if (readerNode().choices.length) {
            <h3>{{ readerNode().choiceQuestion }}</h3>
            <div class="reader-choices">
              @for (choice of readerNode().choices; track choice.id; let index = $index) {
                <button type="button" (click)="choosePath(choice.nextNodeId)"><span>{{ index + 1 }}</span>{{ readerScene().choiceLabels[choice.id] || 'Untitled choice \u2014 edit in the writer' }} <b aria-hidden="true">\u2192</b></button>
              }
            </div>
          } @else {
            <p class="ending">{{ readerNode().kind === 'ending' ? 'End of this path' : 'This branch is ready for you to continue writing.' }}</p>
          }
        </article>
        <details class="test-paths"><summary>Paths tried in this test ({{ currentReadings().length }})</summary>
          <p>Temporary versions, kept only on this page. The latest 20 paths remain available.</p>
          @for (reading of currentReadings(); track $index; let index = $index) {
            <button type="button" (click)="replayPath(reading)">Replay {{ index + 1 }} \xB7 {{ reading.scenes[reading.path.at(-1)!].title }} \xB7 {{ reading.path.length }} scenes</button>
          } @empty { <p>Follow a route to an ending to try it again here.</p> }
        </details>
      } @else {
        <div class="editor-tools">
          <label>Scene<select aria-label="Writing scene" [value]="runtime().state().selectedNodeId" (change)="selectScene(inputValue($event))">
            @for (node of runtime().storyConfig().nodes; track node.id) { <option [value]="node.id" [selected]="node.id === runtime().state().selectedNodeId">{{ sceneTitle(node.id) }}</option> }
          </select></label>
          <label>Writing lens<select aria-label="Writing point of view" [value]="runtime().state().bible.pointOfView" (change)="runtime().updateBible('pointOfView', inputValue($event) === 'first' ? 'first' : 'third')">
            <option value="first">First person \xB7 I</option><option value="third">Third person \xB7 they</option>
          </select></label>
          <button type="button" class="primary" (click)="chooseTool('read')">\u25B6 Play story</button>
        </div>
        <p class="craft-prompt">{{ runtime().selectedNode().craftPrompt }} <span>The writing lens is your intention; changing it does not rewrite your words.</span></p>
        <div class="draft-grid" [class.comparing]="tool() === 'revise'">
          @if (tool() === 'revise') {
            <article class="original"><p class="eyebrow">Original fictional sample</p><h3>{{ sample()?.suggestedTitle || 'New branch' }}</h3><p class="story-copy">{{ sample()?.starterText || 'You created this branch. It has no sample text.' }}</p></article>
          }
          <div class="writer">
            <label>Scene title<input [value]="runtime().selectedScene().title" (input)="runtime().updateSceneTitle(inputValue($event))" /></label>
            <label class="prose-label"><span>Your scene <small>{{ wordCount(runtime().selectedScene().text) }} words \xB7 temporary draft</small></span>
              <textarea aria-label="Your scene" rows="9" spellcheck="true" [value]="runtime().selectedScene().text" (input)="runtime().updateSceneText(inputValue($event))" placeholder="Write the next moment in your own words\u2026"></textarea>
            </label>
          </div>
        </div>
        @if (runtime().selectedNode().choices.length) {
          <fieldset class="choice-editor"><legend>Reader choices</legend>
            @for (choice of runtime().selectedNode().choices; track choice.id; let index = $index) {
              <div><label>Choice {{ index + 1 }}<input [value]="runtime().selectedScene().choiceLabels[choice.id]" (input)="runtime().updateChoice(choice.id, inputValue($event))" placeholder="Write a decision the reader can make" /></label>
                <button type="button" (click)="selectScene(choice.nextNodeId)">Write destination \u2192 {{ sceneTitle(choice.nextNodeId) }}</button></div>
            }
          </fieldset>
        }
        <div class="branch-actions">
          @if (!runtime().selectedNode().choices.length) {
            <button type="button" (click)="changeBranch('branch')">{{ runtime().selectedScene().parkedChoices?.length ? 'Restore continuation' : 'Add two branches' }}</button>
          }
          @if (runtime().selectedNode().id !== week().startNodeId) {
            <button type="button" (click)="changeBranch('finish')">Make this an ending</button>
          }
          <button type="button" (click)="chooseTool('map')">See the branch map</button>
        </div>
        <p class="sample-note">Fictional sample writing is editable. Ending a path keeps its later drafts in memory so you can restore the continuation.</p>
      }
    </section>
    <p class="memory-note">Nothing is saved to student records. Edits and path tests last only while this workspace stays open.</p>
  </section>
  <aside class="planning" aria-label="Weekly products and tutor planning">
    <details class="plan-card" open><summary><span class="eyebrow">WEEK {{ week().week }}</span><h2>Proposed weekly products</h2></summary>
      <p>Potential work \xB7 no completion tracking</p>
      <ol class="products">@for (item of week().sessions; track $index; let index = $index) {
        <li [class.current]="sessionIndex() === index"><strong>Session {{ index + 1 }} \xB7 {{ index === 0 ? 'Individual learning' : 'Group activity' }}</strong><p>{{ item.product }}</p></li>
      }</ol>
      <p class="footnote">A future tutor will guide and review work before any completion is recorded. Group sessions are writing-circle plans; shared editing is not connected.</p>
    </details>
    <details class="plan-card tutor-card" open><summary><span class="eyebrow">BUILD PLANNING</span><h2>AI Tutor</h2><span class="offline">Not connected</span></summary>
      <h3>Questions and concepts</h3><ul>@for (question of week().questions; track question) { <li>{{ question }}</li> }</ul>
      <h3>Evidence to inspect</h3><ul>@for (item of week().evidence; track item) { <li>{{ item }}</li> }</ul>
      <h3>Future model controls</h3><ul>@for (item of week().controls; track item) { <li>{{ item }}</li> }</ul>
      <p class="footnote">Planning only. No tutor responses, automatic revision, assessment, or mastery decisions run in this test.</p>
    </details>
  </aside>
</main>
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/narrative-studio/ui/narrative-week-workspace.component.scss */\n:host {\n  display: block;\n  scroll-margin-top: 118px;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  color: #203a3c;\n  --ink: #214e50;\n  --accent: #206b68;\n  --wash: #edf5f2;\n}\n* {\n  box-sizing: border-box;\n}\n.week-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 20px;\n  max-width: 1580px;\n  margin: 0 auto;\n  padding: 18px 24px 36px;\n  background: #f5f6f1;\n}\n[data-week="2"] {\n  --ink: #314c66;\n  --accent: #386587;\n  --wash: #eef3f8;\n}\n[data-week="3"] {\n  --ink: #59466c;\n  --accent: #745c89;\n  --wash: #f4f0f7;\n}\n[data-week="4"] {\n  --ink: #654d29;\n  --accent: #8d662d;\n  --wash: #faf4e8;\n}\n.interactive,\n.planning,\n.writer,\n.original {\n  min-width: 0;\n}\n.interactive {\n  border: 1px solid #d9e2dc;\n  border-radius: 18px;\n  background: white;\n  overflow: hidden;\n}\n.mission-header {\n  background: var(--ink);\n  color: white;\n  padding: 23px 26px 20px;\n}\n.eyebrow {\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: 1.4px;\n  text-transform: uppercase;\n}\n.mission-header .eyebrow {\n  margin: 0 0 7px;\n  color: #dbebe6;\n}\nh1 {\n  font-size: clamp(25px, 2.7vw, 36px);\n  line-height: 1.13;\n  margin: 0 0 8px;\n}\nh2 {\n  font-size: 20px;\n  line-height: 1.3;\n  margin: 0;\n}\nh3 {\n  font-size: 15px;\n  margin: 20px 0 9px;\n}\np {\n  line-height: 1.55;\n}\n.mission-header > p:not(.eyebrow) {\n  margin: 0;\n  max-width: 76ch;\n  font-size: 14px;\n  color: #f0f4ef;\n}\n.test-badge {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 750;\n  border: 1px solid rgba(255, 255, 255, 0.3882352941);\n  padding: 5px 10px;\n  border-radius: 30px;\n  margin-top: 12px;\n}\n.session-bar {\n  padding: 17px 24px 13px;\n  background: var(--wash);\n}\n.session-bar > strong {\n  color: var(--accent);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n.session-bar h2 {\n  margin: 5px 0;\n}\n.session-bar p {\n  font-size: 13px;\n  margin: 0;\n}\n.tool-bar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  padding: 12px 24px;\n  border-bottom: 1px solid #e2e7e3;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #cddbd5;\n  border-radius: 8px;\n  background: white;\n  color: var(--ink);\n  padding: 10px 13px;\n  font-size: 13px;\n  font-weight: 700;\n  min-height: 42px;\n  line-height: 1.35;\n  white-space: normal;\n}\nbutton:hover {\n  background: var(--wash);\n  border-color: var(--accent);\n}\nbutton.active,\nbutton.primary {\n  background: var(--accent);\n  color: white;\n  border-color: var(--accent);\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #bc6b31;\n  outline-offset: 3px;\n}\n.active-surface:focus {\n  outline: none;\n}\n.active-surface {\n  padding: 20px 24px;\n  min-height: 350px;\n}\n.surface-heading p {\n  margin: 6px 0 15px;\n  font-size: 14px;\n}\n.editor-tools {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  gap: 12px;\n}\n.editor-tools label:first-child {\n  flex: 1;\n}\nlabel {\n  display: grid;\n  gap: 7px;\n  color: #3a5453;\n  font-size: 12px;\n  font-weight: 750;\n  min-width: 0;\n}\ninput,\nselect,\ntextarea {\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #c9d6cf;\n  border-radius: 8px;\n  padding: 10px 11px;\n  background: white;\n  color: #253e3d;\n  font-weight: 400;\n}\nselect {\n  max-width: 100%;\n  min-height: 42px;\n}\ninput {\n  font-size: 14px;\n  min-height: 42px;\n}\ntextarea {\n  font-size: 16px;\n  line-height: 1.7;\n  resize: vertical;\n  min-height: 230px;\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\n.craft-prompt {\n  padding-left: 12px;\n  border-left: 3px solid var(--accent);\n  font-size: 13px;\n  margin: 16px 0;\n}\n.craft-prompt span {\n  display: block;\n  color: #61736e;\n  font-size: 11px;\n  margin-top: 5px;\n}\n.draft-grid {\n  display: grid;\n  gap: 16px;\n}\n.draft-grid.comparing {\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);\n}\n.original {\n  background: var(--wash);\n  border-radius: 10px;\n  padding: 17px;\n}\n.original .eyebrow {\n  margin-top: 0;\n  color: var(--accent);\n}\n.original h3 {\n  margin-top: 12px;\n  font-size: 20px;\n  font-family: Georgia, serif;\n}\n.original .story-copy {\n  font-size: 15px;\n}\n.prose-label {\n  margin-top: 14px;\n}\n.prose-label > span {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nsmall {\n  font-size: 10px;\n  color: #687e75;\n  font-weight: 500;\n}\n.choice-editor {\n  border: 0;\n  padding: 0;\n  margin: 18px 0;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 13px;\n}\nlegend {\n  font-weight: 800;\n  font-size: 14px;\n  margin-bottom: 12px;\n}\n.choice-editor > div {\n  min-width: 0;\n  background: var(--wash);\n  padding: 12px;\n  border-radius: 10px;\n}\n.choice-editor button {\n  width: 100%;\n  margin-top: 8px;\n  font-size: 11px;\n  background: transparent;\n  text-align: left;\n}\n.branch-actions,\n.reader-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n}\n.sample-note,\n.memory-note,\n.extra-note {\n  font-size: 12px;\n  color: #61766f;\n}\n.sample-note {\n  margin-bottom: 0;\n}\n.memory-note {\n  margin: 0;\n  padding: 13px 24px;\n  border-top: 1px solid #e4e9e6;\n  background: #fafbf7;\n}\n.extra-note {\n  margin: 0;\n  padding: 10px 24px;\n  background: #fff6e8;\n  color: #775023;\n}\n.reader {\n  background: #fffdf7;\n  padding: 26px;\n  border: 1px solid #e4e3d7;\n  border-radius: 12px;\n}\n.reader .eyebrow {\n  color: var(--accent);\n  margin: 0 0 12px;\n}\n.reader h2 {\n  font-family: Georgia, serif;\n  font-size: 30px;\n}\n.story-copy {\n  font-family: Georgia, serif;\n  font-size: 19px;\n  line-height: 1.8;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.reader-choices {\n  display: grid;\n  gap: 10px;\n}\n.reader-choices button {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 15px;\n}\n.reader-choices span {\n  color: var(--accent);\n  background: var(--wash);\n  border-radius: 50%;\n  padding: 7px 11px;\n}\n.reader-choices b {\n  margin-left: auto;\n}\n.path-strip {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin: 13px 0;\n}\n.path-strip button {\n  min-height: 32px;\n  font-size: 10px;\n  padding: 6px 10px;\n}\n.path-strip [aria-current=step] {\n  background: var(--wash);\n}\n.ending {\n  font-size: 15px;\n  color: var(--accent);\n  border-top: 1px solid #ddd;\n  padding-top: 15px;\n  font-weight: 700;\n}\n.test-paths {\n  margin-top: 16px;\n  padding: 12px 0;\n}\n.test-paths > p {\n  font-size: 12px;\n}\n.test-paths button {\n  display: block;\n  margin-top: 6px;\n  width: 100%;\n  text-align: left;\n}\n.planning {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.plan-card {\n  border: 1px solid #d8e1dc;\n  border-radius: 15px;\n  background: white;\n  padding: 20px;\n}\nsummary {\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 800;\n  min-height: 30px;\n}\n.plan-card summary {\n  position: relative;\n  padding-right: 15px;\n  list-style: none;\n}\n.plan-card summary::-webkit-details-marker {\n  display: none;\n}\n.plan-card summary::after {\n  content: "+";\n  position: absolute;\n  right: 0;\n  top: 9px;\n  font-size: 20px;\n}\n.plan-card[open] summary::after {\n  content: "\\2212";\n}\n.plan-card summary .eyebrow {\n  color: var(--accent);\n  display: block;\n  margin-bottom: 8px;\n}\n.plan-card h2 {\n  font-size: 21px;\n}\n.plan-card > p {\n  font-size: 12px;\n  color: #6b7b74;\n  margin: 13px 0;\n}\n.products {\n  padding-left: 0;\n  list-style: none;\n  margin: 15px 0;\n  display: grid;\n  gap: 10px;\n}\n.products li {\n  padding: 12px 13px;\n  border-left: 3px solid #dce6df;\n  border-radius: 0 8px 8px 0;\n}\n.products li.current {\n  border-color: var(--accent);\n  background: var(--wash);\n}\n.products strong {\n  font-size: 11px;\n}\n.products p {\n  font-size: 13px;\n  margin: 7px 0 0;\n}\n.offline {\n  display: inline-block;\n  font-size: 10px;\n  color: #655833;\n  background: #f6edcd;\n  padding: 5px 9px;\n  border-radius: 30px;\n  margin-top: 9px;\n}\n.tutor-card {\n  background: #fbfcf8;\n}\n.tutor-card ul {\n  padding-left: 18px;\n  margin: 0;\n}\n.tutor-card li {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 7px 0;\n}\n.footnote {\n  font-size: 11px !important;\n  line-height: 1.6;\n  border-top: 1px solid #e0e7e0;\n  padding-top: 13px;\n  margin-bottom: 0 !important;\n}\n.active-surface {\n  scroll-margin-top: 118px;\n}\n@media (max-width: 1000px) {\n  :host,\n  .active-surface {\n    scroll-margin-top: 158px;\n  }\n  .week-workspace {\n    grid-template-columns: 1fr;\n    padding: 16px;\n  }\n  .planning {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n}\n@media (max-width: 620px) {\n  :host,\n  .active-surface {\n    scroll-margin-top: 256px;\n  }\n  .week-workspace {\n    padding: 10px;\n    gap: 12px;\n  }\n  .mission-header,\n  .session-bar,\n  .active-surface {\n    padding: 18px 15px;\n  }\n  .tool-bar {\n    padding: 12px 15px;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n  .tool-bar button {\n    padding: 10px 7px;\n  }\n  .planning,\n  .draft-grid.comparing,\n  .choice-editor {\n    grid-template-columns: 1fr;\n  }\n  .editor-tools {\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n  .reader {\n    padding: 19px 15px;\n  }\n  .reader h2 {\n    font-size: 26px;\n  }\n  .story-copy {\n    font-size: 17px;\n  }\n  .plan-card {\n    padding: 18px;\n  }\n  .memory-note,\n  .extra-note {\n    padding: 12px 15px;\n  }\n  input,\n  select {\n    font-size: 16px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=narrative-week-workspace.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativeWeekWorkspaceComponent, { className: "NarrativeWeekWorkspaceComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-week-workspace.component.ts", lineNumber: 23 });
})();
export {
  NarrativeWeekWorkspaceComponent
};
//# debugId=fb522ff2-dc1c-5148-85b1-fe43882478cf
//# sourceMappingURL=chunk-7XUO55TH.js.map
