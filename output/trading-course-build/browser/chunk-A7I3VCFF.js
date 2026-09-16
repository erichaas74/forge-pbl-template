import {
  BlockBuilderComponent
} from "./chunk-SCMANZFT.js";
import "./chunk-5NMHGW4V.js";
import {
  ENGINEERING_CONFIG,
  EngineeringDesignRuntime
} from "./chunk-S4ZXE6OE.js";
import {
  DESIGN_CAPTURE,
  DESIGN_CHANGE,
  DESIGN_CHROME,
  DESIGN_EDITOR,
  DESIGN_QUEST_PROGRESS,
  DESIGN_SIMULATIONS,
  DESIGN_VIEW_REQUEST,
  DesignEditor
} from "./chunk-T7GOLBBA.js";
import "./chunk-UW6DFD2Z.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import "./chunk-2WXJ5NX3.js";
import {
  NgComponentOutlet,
  NgTemplateOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Injector,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/engineering-design/ui/engineering-week-workspace.component.ts
var _c0 = ["editorPanel"];
var _c1 = ["stage"];
var _c2 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function EngineeringWeekWorkspaceComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringWeekWorkspaceComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringWeekWorkspaceComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 15, 1);
    \u0275\u0275listener("keydown.escape", function EngineeringWeekWorkspaceComponent_Conditional_7_Template_aside_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setEditing(false));
    });
    \u0275\u0275elementStart(2, "button", 16);
    \u0275\u0275listener("click", function EngineeringWeekWorkspaceComponent_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setEditing(false));
    });
    \u0275\u0275text(3, "Done editing \xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-block-builder", 17);
    \u0275\u0275listener("changed", function EngineeringWeekWorkspaceComponent_Conditional_7_Template_app_block_builder_changed_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveDesign($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("design", ctx_r1.design())("editor", ctx_r1.editor);
  }
}
function EngineeringWeekWorkspaceComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.notice());
  }
}
function EngineeringWeekWorkspaceComponent_For_17_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reading_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(reading_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reading_r4.value);
  }
}
function EngineeringWeekWorkspaceComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dl");
    \u0275\u0275repeaterCreate(4, EngineeringWeekWorkspaceComponent_For_17_For_5_Template, 4, 2, null, null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 18);
    \u0275\u0275listener("click", function EngineeringWeekWorkspaceComponent_For_17_Template_button_click_6_listener() {
      const trial_r5 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay(trial_r5));
    });
    \u0275\u0275text(7, "Replay this design & Sun");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trial_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", trial_r5.settings["localDate"], " \xB7 ", trial_r5.settings["localTime"] || trial_r5.settings["observationRule"] || "Saved observation", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(trial_r5.measurements);
  }
}
function EngineeringWeekWorkspaceComponent_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Pause at an interesting moment and choose Save test.");
    \u0275\u0275elementEnd();
  }
}
function EngineeringWeekWorkspaceComponent_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(product_r6);
  }
}
function EngineeringWeekWorkspaceComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r7);
  }
}
function EngineeringWeekWorkspaceComponent_For_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r8);
  }
}
function EngineeringWeekWorkspaceComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(control_r9);
  }
}
var EngineeringWeekWorkspaceComponent = class _EngineeringWeekWorkspaceComponent {
  config = inject(ENGINEERING_CONFIG);
  runtime = inject(EngineeringDesignRuntime);
  lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  injector = inject(Injector);
  selectedLesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weekNumber = computed(
    () => Math.floor((this.selectedLesson() - 1) / 2) + 1,
    ...ngDevMode ? [{ debugName: "weekNumber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => this.config.previewWeeks[Math.floor((this.selectedLesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.week().sessions[(this.selectedLesson() - 1) % 2],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = computed(
    () => this.runtime.snapshot().previewDrafts?.[this.week().id],
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  design = computed(
    () => this.draft()?.design ?? this.week().starter,
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The simulation measures a win; the runtime keeps it once for this week's draft. */
  questReported(state) {
    const quest = this.session().quest;
    if (!quest || state.questId !== quest.id)
      return;
    this.questProgress.set(state);
    if (!state.complete || this.levelComplete())
      return;
    try {
      this.runtime.completeQuest(this.week().id, quest.id);
    } catch {
      this.notice.set("The level result could not be saved. Your work is still on this page.");
    }
  }
  chrome = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "chrome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editing = signal(
    false,
    ...ngDevMode ? [{ debugName: "editing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restore = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "restore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    "",
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  questProgress = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "questProgress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  levelComplete = computed(
    () => {
      const quest = this.session().quest;
      return !!quest && !!this.draft()?.quests?.[quest.id];
    },
    ...ngDevMode ? [{ debugName: "levelComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editorPanel = viewChild(
    "editorPanel",
    ...ngDevMode ? [{ debugName: "editorPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stage = viewChild(
    "stage",
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulation = inject(DESIGN_SIMULATIONS).require(this.config.simulationId);
  editor = new DesignEditor(() => this.design(), (design) => this.saveDesign(design), () => this.runtime.authoringPreview);
  simulationInjector = Injector.create({
    parent: this.injector,
    providers: [
      { provide: DESIGN_EDITOR, useValue: this.editor },
      {
        provide: DESIGN_CHROME,
        useValue: (chrome) => this.chrome.set(chrome)
      },
      { provide: DESIGN_CHANGE, useValue: (design) => this.saveDesign(design) },
      {
        provide: DESIGN_CAPTURE,
        useValue: (capture) => this.runtime.capturePreview(this.week().id, __spreadProps(__spreadValues({}, capture), {
          settings: __spreadProps(__spreadValues({}, capture.settings), {
            previewWeekId: this.week().id,
            previewSession: this.selectedLesson()
          })
        }))
      },
      {
        provide: DESIGN_VIEW_REQUEST,
        useValue: (view) => this.setEditing(view === "build")
      },
      {
        provide: DESIGN_QUEST_PROGRESS,
        useValue: (state) => this.questReported(state)
      }
    ]
  });
  simulationInputs = computed(
    () => ({
      design: this.design(),
      activity: this.session().activity,
      restore: this.restore(),
      active: true,
      building: this.editing(),
      weeklyControls: true,
      workspaceKey: String(this.selectedLesson()),
      presentation: false,
      quest: this.session().quest,
      questCompleted: this.levelComplete()
    }),
    ...ngDevMode ? [{ debugName: "simulationInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.selectedLesson.set(number);
    this.runtime.openPreviewWeek(this.week().id);
    this.editor.sync(this.week().id);
    this.editing.set(false);
    this.notice.set("");
    this.questProgress.set(void 0);
    const last = [...this.draft()?.trials ?? []].reverse().find((t) => t.settings["previewSession"] === number);
    this.restore.set(last ? __spreadProps(__spreadValues({}, last), { design: this.design() }) : {
      id: "preview-start-" + number,
      pluginId: this.config.simulationId,
      capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
      design: this.design(),
      settings: this.session().settings,
      measurements: []
    });
  }
  saveDesign(design) {
    this.runtime.savePreviewDesign(this.week().id, design);
  }
  setEditing(editing) {
    if (this.editing() === editing)
      return;
    this.editing.set(editing);
    afterNextRender(() => {
      const region = (editing ? this.editorPanel() : this.stage())?.nativeElement;
      region?.scrollIntoView({ block: "nearest" });
      region?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  replay(trial) {
    this.saveDesign(trial.design);
    this.restore.set(__spreadValues({}, trial));
    this.setEditing(false);
    this.notice.set("Recorded design and Sun restored. You can edit it or play the day again.");
  }
  static \u0275fac = function EngineeringWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EngineeringWeekWorkspaceComponent, selectors: [["app-engineering-week-workspace"]], viewQuery: function EngineeringWeekWorkspaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.editorPanel, _c0, 5)(ctx.stage, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 54, vars: 11, consts: [["stage", ""], ["editorPanel", ""], [1, "week-workspace"], ["aria-label", "Weekly build workspace", 1, "activity"], [1, "solar-toolbar"], [4, "ngTemplateOutlet"], ["tabindex", "-1", "aria-label", "Interactive solar model", 1, "stage"], [4, "ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector"], ["tabindex", "-1", "aria-label", "Edit weekly build", 1, "build-panel"], [1, "draft-note"], ["role", "status"], [1, "trials"], ["aria-label", "Weekly planning", 1, "planning"], ["open", "", 1, "products"], ["open", "", 1, "tutor"], ["tabindex", "-1", "aria-label", "Edit weekly build", 1, "build-panel", 3, "keydown.escape"], [1, "close", 3, "click"], [3, "changed", "design", "editor"], [3, "click"]], template: function EngineeringWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 2)(1, "section", 3)(2, "div", 4);
      \u0275\u0275template(3, EngineeringWeekWorkspaceComponent_ng_container_3_Template, 1, 0, "ng-container", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "section", 6, 0);
      \u0275\u0275template(6, EngineeringWeekWorkspaceComponent_ng_container_6_Template, 1, 0, "ng-container", 7);
      \u0275\u0275conditionalCreate(7, EngineeringWeekWorkspaceComponent_Conditional_7_Template, 5, 2, "aside", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 9);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, EngineeringWeekWorkspaceComponent_Conditional_10_Template, 2, 1, "p", 10);
      \u0275\u0275elementStart(11, "details", 11)(12, "summary");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p");
      \u0275\u0275text(15, " Up to 40 recent observations per week. Replaying loads that test\u2019s design for further editing. ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(16, EngineeringWeekWorkspaceComponent_For_17_Template, 8, 2, "details", null, _forTrack0, false, EngineeringWeekWorkspaceComponent_ForEmpty_18_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "aside", 12)(20, "details", 13)(21, "summary");
      \u0275\u0275text(22, "Proposed weekly products");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "ul");
      \u0275\u0275repeaterCreate(26, EngineeringWeekWorkspaceComponent_For_27_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "small");
      \u0275\u0275text(29, "Potential deliverables for this week. No submission or completion is required in this preview.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "details", 14)(31, "summary");
      \u0275\u0275text(32, "AI Tutor ");
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34, "Disconnected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "p");
      \u0275\u0275text(36, " Planning only. Questions and evidence for a future tutor; no review, assessment or model control is connected. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "h2");
      \u0275\u0275text(38, "Questions & concepts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "ul");
      \u0275\u0275repeaterCreate(40, EngineeringWeekWorkspaceComponent_For_41_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "h2");
      \u0275\u0275text(43, "Evidence to inspect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "ul");
      \u0275\u0275repeaterCreate(45, EngineeringWeekWorkspaceComponent_For_46_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "h2");
      \u0275\u0275text(48, "Future model controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "ul");
      \u0275\u0275repeaterCreate(50, EngineeringWeekWorkspaceComponent_For_51_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "small");
      \u0275\u0275text(53, "Group sessions use this local draft. Shared work is deferred.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngTemplateOutlet", ctx.chrome()?.toolbar ?? null);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngComponentOutlet", ctx.simulation)("ngComponentOutletInputs", ctx.simulationInputs())("ngComponentOutletInjector", ctx.simulationInjector);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.editing() ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Editable sample starting build \xB7 Your changes stay with this week. ", ctx.runtime.saveStatus(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.notice() ? 10 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Saved tests \xB7 ", ctx.draft()?.trials?.length ?? 0);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.draft()?.trials ?? \u0275\u0275pureFunction0(10, _c2));
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.week().products);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().evidence);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().controls);
    }
  }, dependencies: [NgComponentOutlet, NgTemplateOutlet, BlockBuilderComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #233e43;\n  font-family: Arial, sans-serif;\n  --%NS%solar-toolbar-top: var(--%NS%project-navigation-height, 0px);\n}\n.week-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(260px, 3fr);\n  gap: 18px;\n  align-items: start;\n}\n.activity[_ngcontent-%COMP%], \n.planning[_ngcontent-%COMP%], \n.stage[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.activity[_ngcontent-%COMP%] {\n  background: #fffdf7;\n  border: 1px solid #cdd4c5;\n  border-radius: 16px;\n  overflow: clip;\n}\n.solar-toolbar[_ngcontent-%COMP%] {\n  display: contents;\n}\n.stage[_ngcontent-%COMP%] {\n  position: relative;\n  background: #e9efe8;\n}\n.build-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 20;\n  top: 8px;\n  right: 8px;\n  width: min(390px, 100% - 16px);\n  max-height: calc(100% - 16px);\n  overflow: auto;\n  padding: 14px;\n  box-sizing: border-box;\n  background: #fffdf5;\n  border: 1px solid #bccbbb;\n  border-radius: 12px;\n  box-shadow: 0 8px 28px rgba(19, 47, 70, 0.2);\n}\n.close[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  margin-left: auto;\n  display: block;\n}\n.planning[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n.planning[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border: 1px solid #cbd5c6;\n  border-radius: 14px;\n  padding: 16px;\n  background: #f6f7eb;\n}\n.planning[_ngcontent-%COMP%]   .tutor[_ngcontent-%COMP%] {\n  background: #edf4f1;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 700;\n  line-height: 1.5;\n}\nsummary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  background: #dce5e0;\n  padding: 2px 6px;\n  border-radius: 6px;\n  margin-left: 4px;\n}\n.planning[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.6;\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%]    + li[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-top: 22px;\n}\nsmall[_ngcontent-%COMP%], \n.draft-note[_ngcontent-%COMP%] {\n  color: #576a60;\n  font-size: 12px;\n  line-height: 1.6;\n}\n.draft-note[_ngcontent-%COMP%], \n.trials[_ngcontent-%COMP%] {\n  margin: 12px 18px;\n}\n.trials[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  border-top: 1px solid #dde1d6;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 8px 12px;\n  border: 1px solid #92aca0;\n  border-radius: 8px;\n  background: #fffdf7;\n  color: #234e48;\n  cursor: pointer;\n}\n[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ba761f;\n  outline-offset: 3px;\n}\ndl[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 3px 0 10px;\n}\n@media (max-width: 950px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 580px) {\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .solar-toolbar[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n  }\n}\n/*# sourceMappingURL=engineering-week-workspace.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-engineering-week-workspace", imports: [NgComponentOutlet, NgTemplateOutlet, BlockBuilderComponent], template: `<main class="week-workspace">
  <section class="activity" aria-label="Weekly build workspace">
    <div class="solar-toolbar"><ng-container *ngTemplateOutlet="chrome()?.toolbar ?? null" /></div>
    <section #stage class="stage" tabindex="-1" aria-label="Interactive solar model">
      <ng-container
        *ngComponentOutlet="simulation; inputs: simulationInputs(); injector: simulationInjector"
      />
      @if (editing()) {
        <aside
          #editorPanel
          class="build-panel"
          tabindex="-1"
          aria-label="Edit weekly build"
          (keydown.escape)="setEditing(false)"
        >
          <button class="close" (click)="setEditing(false)">Done editing \xD7</button>
          <app-block-builder [design]="design()" [editor]="editor" (changed)="saveDesign($event)" />
        </aside>
      }
    </section>
    <p class="draft-note">
      Editable sample starting build \xB7 Your changes stay with this week. {{ runtime.saveStatus() }}
    </p>
    @if (notice()) {
      <p role="status">{{ notice() }}</p>
    }
    <details class="trials">
      <summary>Saved tests \xB7 {{ draft()?.trials?.length ?? 0 }}</summary>
      <p>
        Up to 40 recent observations per week. Replaying loads that test\u2019s design for further
        editing.
      </p>
      @for (trial of draft()?.trials ?? []; track trial.id) {
        <details>
          <summary>
            {{ trial.settings['localDate'] }} \xB7
            {{
              trial.settings['localTime'] ||
                trial.settings['observationRule'] ||
                'Saved observation'
            }}
          </summary>
          <dl>
            @for (reading of trial.measurements; track reading.label) {
              <dt>{{ reading.label }}</dt>
              <dd>{{ reading.value }}</dd>
            }
          </dl>
          <button (click)="replay(trial)">Replay this design & Sun</button>
        </details>
      } @empty {
        <p>Pause at an interesting moment and choose Save test.</p>
      }
    </details>
  </section>
  <aside class="planning" aria-label="Weekly planning">
    <details open class="products">
      <summary>Proposed weekly products</summary>
      <p>{{ week().title }}</p>
      <ul>
        @for (product of week().products; track product) {
          <li>{{ product }}</li>
        }
      </ul>
      <small
        >Potential deliverables for this week. No submission or completion is required in this
        preview.</small
      >
    </details>
    <details open class="tutor">
      <summary>AI Tutor <span>Disconnected</span></summary>
      <p>
        Planning only. Questions and evidence for a future tutor; no review, assessment or model
        control is connected.
      </p>
      <h2>Questions & concepts</h2>
      <ul>
        @for (question of week().questions; track question) {
          <li>{{ question }}</li>
        }
      </ul>
      <h2>Evidence to inspect</h2>
      <ul>
        @for (item of week().evidence; track item) {
          <li>{{ item }}</li>
        }
      </ul>
      <h2>Future model controls</h2>
      <ul>
        @for (control of week().controls; track control) {
          <li>{{ control }}</li>
        }
      </ul>
      <small>Group sessions use this local draft. Shared work is deferred.</small>
    </details>
  </aside>
</main>
`, styles: ["/* src/app/templates/engineering-design/ui/engineering-week-workspace.component.scss */\n:host {\n  display: block;\n  color: #233e43;\n  font-family: Arial, sans-serif;\n  --solar-toolbar-top: var(--project-navigation-height, 0px);\n}\n.week-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(260px, 3fr);\n  gap: 18px;\n  align-items: start;\n}\n.activity,\n.planning,\n.stage {\n  min-width: 0;\n}\n.activity {\n  background: #fffdf7;\n  border: 1px solid #cdd4c5;\n  border-radius: 16px;\n  overflow: clip;\n}\n.solar-toolbar {\n  display: contents;\n}\n.stage {\n  position: relative;\n  background: #e9efe8;\n}\n.build-panel {\n  position: absolute;\n  z-index: 20;\n  top: 8px;\n  right: 8px;\n  width: min(390px, 100% - 16px);\n  max-height: calc(100% - 16px);\n  overflow: auto;\n  padding: 14px;\n  box-sizing: border-box;\n  background: #fffdf5;\n  border: 1px solid #bccbbb;\n  border-radius: 12px;\n  box-shadow: 0 8px 28px rgba(19, 47, 70, 0.2);\n}\n.close {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  margin-left: auto;\n  display: block;\n}\n.planning {\n  display: grid;\n  gap: 16px;\n}\n.planning details {\n  border: 1px solid #cbd5c6;\n  border-radius: 14px;\n  padding: 16px;\n  background: #f6f7eb;\n}\n.planning .tutor {\n  background: #edf4f1;\n}\nsummary {\n  cursor: pointer;\n  font-weight: 700;\n  line-height: 1.5;\n}\nsummary span {\n  display: inline-block;\n  font-size: 11px;\n  background: #dce5e0;\n  padding: 2px 6px;\n  border-radius: 6px;\n  margin-left: 4px;\n}\n.planning p,\nli {\n  font-size: 13px;\n  line-height: 1.6;\n}\nul {\n  padding-left: 20px;\n}\nli + li {\n  margin-top: 8px;\n}\nh2 {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-top: 22px;\n}\nsmall,\n.draft-note {\n  color: #576a60;\n  font-size: 12px;\n  line-height: 1.6;\n}\n.draft-note,\n.trials {\n  margin: 12px 18px;\n}\n.trials details {\n  padding: 10px 0;\n  border-top: 1px solid #dde1d6;\n}\nbutton {\n  min-height: 40px;\n  padding: 8px 12px;\n  border: 1px solid #92aca0;\n  border-radius: 8px;\n  background: #fffdf7;\n  color: #234e48;\n  cursor: pointer;\n}\n:focus-visible {\n  outline: 3px solid #ba761f;\n  outline-offset: 3px;\n}\ndl {\n  font-size: 13px;\n}\ndt {\n  font-weight: 700;\n}\ndd {\n  margin: 3px 0 10px;\n}\n@media (max-width: 950px) {\n  .week-workspace {\n    grid-template-columns: 1fr;\n  }\n  .planning {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 580px) {\n  .planning {\n    grid-template-columns: 1fr;\n  }\n  .solar-toolbar {\n    padding: 6px 8px;\n  }\n}\n/*# sourceMappingURL=engineering-week-workspace.component.css.map */\n"] }]
  }], () => [], { editorPanel: [{ type: ViewChild, args: ["editorPanel", { isSignal: true }] }], stage: [{ type: ViewChild, args: ["stage", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EngineeringWeekWorkspaceComponent, { className: "EngineeringWeekWorkspaceComponent", filePath: "src/app/templates/engineering-design/ui/engineering-week-workspace.component.ts", lineNumber: 39 });
})();
export {
  EngineeringWeekWorkspaceComponent
};
//# debugId=abac1e2b-c46f-5b5d-b44f-9e13587c66cc
//# sourceMappingURL=chunk-A7I3VCFF.js.map
