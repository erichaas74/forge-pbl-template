import {
  ConservationChamberComponent,
  EmergencyResponseComponent,
  PropertiesLabComponent,
  ReactionBenchComponent,
  RestorationWorkspaceComponent
} from "./chunk-TNCQS45K.js";
import "./chunk-5LAJN7BS.js";
import {
  LAB_PREVIEW_WEEKS,
  validateLabWeeks
} from "./chunk-46FPAVMA.js";
import {
  WORKSPACE_DRAFTS
} from "./chunk-K64YZ7RA.js";
import "./chunk-UW6DFD2Z.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  NgComponentOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Injector,
  ViewChildren,
  computed,
  effect,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  untracked,
  viewChildren,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import "./chunk-EOGBHGAA.js";
import "./chunk-GOMI4DH3.js";

// src/app/features/mystery-investigation/lab-week-workspace.component.ts
var _forTrack0 = ($index, $item) => $item.week;
var _forTrack1 = ($index, $item) => $item.number;
function LabWeekWorkspaceComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 0);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.join(" "));
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_17_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const session_r3 = ctx.$implicit;
    const \u0275$index_34_r4 = ctx.$index;
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", (item_r5.week - 1) * 2 + \u0275$index_34_r4 + 1)("selected", ctx_r0.selectedLesson() === (item_r5.week - 1) * 2 + \u0275$index_34_r4 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Week ", item_r5.week, " \xB7 ", \u0275$index_34_r4 + 1, " \u2014 ", session_r3.title);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, LabWeekWorkspaceComponent_Conditional_1_For_17_For_1_Template, 2, 5, "option", 15, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275repeater(item_r5.sessions);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Extra exploration: ", ctx, ". The planning panels still describe Week ", ctx_r0.week().week, ".");
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_24_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9);
    \u0275\u0275template(1, LabWeekWorkspaceComponent_Conditional_1_For_24_ng_container_1_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r0.selectedLesson() !== entry_r6.number);
    \u0275\u0275attribute("aria-label", entry_r6.session.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngComponentOutlet", entry_r6.component)("ngComponentOutletInputs", ctx_r0.inputsFor(entry_r6))("ngComponentOutletInjector", entry_r6.injector);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const \u0275$index_72_r8 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("current", \u0275$index_72_r8 === ctx_r0.sessionIndex());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Session ", \u0275$index_72_r8 + 1, " \xB7 ", \u0275$index_72_r8 === 0 ? "Individual learning" : "Group activity");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.product);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r9);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r10);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r11);
  }
}
function LabWeekWorkspaceComponent_Conditional_1_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Extra tool open: ", ctx, ". Compare its result with this session's intended test.");
  }
}
function LabWeekWorkspaceComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 1)(1, "section", 2)(2, "header", 3)(3, "div")(4, "p", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 5);
    \u0275\u0275text(11, "Local testing \xB7 all sessions open");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 6)(13, "label");
    \u0275\u0275text(14, "Lab session ");
    \u0275\u0275elementStart(15, "select", 7);
    \u0275\u0275listener("change", function LabWeekWorkspaceComponent_Conditional_1_Template_select_change_15_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.chooseLesson(+$event.target.value));
    });
    \u0275\u0275repeaterCreate(16, LabWeekWorkspaceComponent_Conditional_1_For_17_Template, 2, 0, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "p", 8);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, LabWeekWorkspaceComponent_Conditional_1_Conditional_22_Template, 2, 2, "p", 8);
    \u0275\u0275repeaterCreate(23, LabWeekWorkspaceComponent_Conditional_1_For_24_Template, 2, 5, "section", 9, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "aside", 10)(26, "details", 11)(27, "summary")(28, "span", 4);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "h2");
    \u0275\u0275text(31, "Proposed weekly products");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "Potential work \xB7 no completion tracking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "ol");
    \u0275\u0275repeaterCreate(35, LabWeekWorkspaceComponent_Conditional_1_For_36_Template, 5, 5, "li", 12, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 13);
    \u0275\u0275text(38, "The future tutor will guide and review products before completion is recorded. Shared work is a future build.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "details", 14)(40, "summary")(41, "span", 4);
    \u0275\u0275text(42, "BUILD PLANNING");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "h2");
    \u0275\u0275text(44, "AI Tutor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 5);
    \u0275\u0275text(46, "Not connected");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "h3");
    \u0275\u0275text(48, "Questions and concepts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "ul");
    \u0275\u0275repeaterCreate(50, LabWeekWorkspaceComponent_Conditional_1_For_51_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "h3");
    \u0275\u0275text(53, "Evidence to inspect");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "ul");
    \u0275\u0275repeaterCreate(55, LabWeekWorkspaceComponent_Conditional_1_For_56_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "h3");
    \u0275\u0275text(58, "Future model controls");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "ul");
    \u0275\u0275repeaterCreate(60, LabWeekWorkspaceComponent_Conditional_1_For_61_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(62, LabWeekWorkspaceComponent_Conditional_1_Conditional_62_Template, 2, 1, "p");
    \u0275\u0275elementStart(63, "p", 13);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_16_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-week", ctx_r0.week().week);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("MYSTERY SUBSTANCE \xB7 WEEK ", ctx_r0.week().week);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.week().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.week().setting);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.selectedLesson());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.weeks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.sessionIndex() === 0 ? "Individual learning" : "Group activity plan", " \xB7 local drafts only");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Starting content: ", ctx_r0.session().sample);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = ctx_r0.extraFocus()) ? 22 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.opened());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("WEEK ", ctx_r0.week().week);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.week().sessions);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.week().questions);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.week().evidence);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.week().controls);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_16_0 = ctx_r0.extraFocus()) ? 62 : -1, tmp_16_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Manual instrument changes are extra exploration within Week ", ctx_r0.week().week, ". These lists keep that week's focus. There is no automatic review, adaptation or mastery assessment.");
  }
}
var renderers = {
  properties: PropertiesLabComponent,
  reaction: ReactionBenchComponent,
  conservation: ConservationChamberComponent,
  emergency: EmergencyResponseComponent,
  restoration: RestorationWorkspaceComponent
};
var LabWeekWorkspaceComponent = class _LabWeekWorkspaceComponent {
  weeks = inject(LAB_PREVIEW_WEEKS);
  errors = validateLabWeeks(this.weeks);
  lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  router = inject(Router, { optional: true });
  route = inject(ActivatedRoute, { optional: true });
  parent = inject(Injector);
  drafts = inject(WORKSPACE_DRAFTS);
  selectedLesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
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
  // Keep each visited session mounted so unfinished measurements and animation checkpoints survive.
  opened = signal(
    [],
    ...ngDevMode ? [{ debugName: "opened" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outlets = viewChildren(
    NgComponentOutlet,
    ...ngDevMode ? [{ debugName: "outlets" }] : (
      /* istanbul ignore next */
      []
    )
  );
  extraFocus() {
    const index = this.opened().findIndex((entry) => entry.number === this.selectedLesson());
    const component = this.outlets()[index]?.componentInstance;
    const activity = this.session().activity;
    if (component instanceof PropertiesLabComponent && activity.station === "properties" && component.testId() !== activity.test)
      return component.activeTest().title;
    if (component instanceof ConservationChamberComponent && activity.station === "conservation" && component.trialId() !== activity.chamber)
      return component.trial().title;
    return void 0;
  }
  inputsFor(entry) {
    return entry.session.activity.station === "reaction" ? { active: entry.number === this.selectedLesson() } : entry.inputs;
  }
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  chooseLesson(number) {
    this.openLesson(number);
    if (this.router && this.lesson?.())
      void this.router.navigate([], { relativeTo: this.route, queryParams: { lesson: number }, queryParamsHandling: "merge" });
  }
  openLesson(number) {
    if (this.errors.length || !Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.selectedLesson.set(number);
    if (this.opened().some((entry) => entry.number === number))
      return;
    const session = this.session();
    const prefix = `lab-week-preview.v1:session-${number}:`;
    const store = {
      read: (key) => this.drafts.read(prefix + key),
      write: (key, value) => this.drafts.write(prefix + key, value)
    };
    const activity = session.activity;
    const inputs = activity.station === "properties" ? { initialTestId: activity.test } : activity.station === "conservation" ? { initialChamberId: activity.chamber } : {};
    this.opened.update((entries) => [...entries, {
      number,
      session,
      component: renderers[activity.station],
      inputs,
      injector: Injector.create({ parent: this.parent, providers: [{ provide: WORKSPACE_DRAFTS, useValue: store }] })
    }]);
  }
  static \u0275fac = function LabWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LabWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LabWeekWorkspaceComponent, selectors: [["app-lab-week-workspace"]], viewQuery: function LabWeekWorkspaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.outlets, NgComponentOutlet, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 2, vars: 1, consts: [["role", "alert"], [1, "weekly-workspace"], ["aria-label", "Interactive science workspace", 1, "interactive"], [1, "week-heading"], [1, "eyebrow"], [1, "badge"], [1, "session-bar"], ["aria-label", "Lab session", 3, "change", "value"], [1, "sample-note"], [1, "lab-slot", 3, "hidden"], ["aria-label", "Weekly products and tutor planning", 1, "planning"], ["open", "", 1, "plan-card", "products"], [3, "current"], [1, "footnote"], ["open", "", 1, "plan-card", "tutor"], [3, "value", "selected"], [4, "ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector"]], template: function LabWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, LabWeekWorkspaceComponent_Conditional_0_Template, 2, 1, "p", 0)(1, LabWeekWorkspaceComponent_Conditional_1_Template, 65, 11, "main", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.errors.length ? 0 : 1);
    }
  }, dependencies: [NgComponentOutlet], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #e6f2f6;\n  background: #091b27;\n  font-family: system-ui, sans-serif;\n}\n.weekly-workspace[_ngcontent-%COMP%] {\n  --%NS%accent: #80e3d6;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(280px, 3fr);\n  gap: 18px;\n  padding: 18px;\n  align-items: start;\n}\n.weekly-workspace[data-week="2"][_ngcontent-%COMP%] {\n  --%NS%accent: #bdb1ff;\n}\n.weekly-workspace[data-week="3"][_ngcontent-%COMP%] {\n  --%NS%accent: #88cfff;\n}\n.weekly-workspace[data-week="4"][_ngcontent-%COMP%] {\n  --%NS%accent: #ffd095;\n}\n.interactive[_ngcontent-%COMP%], \n.planning[_ngcontent-%COMP%], \n.lab-slot[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.week-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: start;\n  border-top: 3px solid var(--%NS%accent);\n  padding: 16px 0 6px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(1.4rem, 2.5vw, 2rem);\n  margin: 5px 0 8px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  margin: 6px 0;\n}\nh3[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 0.95rem;\n  margin: 20px 0 7px;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font-size: 0.94rem;\n  line-height: 1.5;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 0.72rem;\n  letter-spacing: 0.12em;\n  font-weight: 750;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.75rem;\n  line-height: 1.4;\n  padding: 6px 9px;\n  border: 1px solid #557586;\n  border-radius: 7px;\n  color: #d7e6ec;\n}\n.session-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  align-items: end;\n  flex-wrap: wrap;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  font-size: 0.82rem;\n  flex: 1;\n  min-width: 0;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  font: inherit;\n  background: #153442;\n  color: #fff;\n  border: 1px solid #53778a;\n  border-radius: 6px;\n  padding: 8px;\n}\n.sample-note[_ngcontent-%COMP%] {\n  border-left: 2px solid var(--%NS%accent);\n  padding: 8px 12px;\n  color: #c5dce6;\n  font-size: 0.82rem;\n}\n.lab-slot[_ngcontent-%COMP%] {\n  border: 1px solid #355866;\n  border-radius: 12px;\n  overflow: clip;\n}\n.lab-slot[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.planning[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #122c3a;\n  border: 1px solid #355565;\n  border-radius: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n}\nsummary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: inline;\n  margin-right: 8px;\n}\nsummary[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n}\nol[_ngcontent-%COMP%], \nul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%] {\n  padding: 4px 0;\n}\n.products[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 12px;\n  margin: 10px 0;\n  border-left: 2px solid #355565;\n}\n.products[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%] {\n  background: #1c3e4e;\n  border-color: var(--%NS%accent);\n}\n.footnote[_ngcontent-%COMP%] {\n  color: #b1c9d3;\n  font-size: 0.8rem;\n}\n[_ngcontent-%COMP%]:is(select, summary):focus-visible {\n  outline: 3px solid var(--%NS%accent);\n  outline-offset: 4px;\n}\n@media (max-width: 1000px) {\n  .weekly-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 620px) {\n  .weekly-workspace[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .week-heading[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .session-bar[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=lab-week-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LabWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-lab-week-workspace", imports: [NgComponentOutlet], template: `@if (errors.length) {
  <p role="alert">{{ errors.join(' ') }}</p>
} @else {
  <main class="weekly-workspace" [attr.data-week]="week().week">
    <section class="interactive" aria-label="Interactive science workspace">
      <header class="week-heading">
        <div><p class="eyebrow">MYSTERY SUBSTANCE \xB7 WEEK {{ week().week }}</p>
          <h1>{{ week().title }}</h1><p>{{ week().setting }}</p></div>
        <span class="badge">Local testing \xB7 all sessions open</span>
      </header>
      <div class="session-bar">
        <label>Lab session
          <select aria-label="Lab session" [value]="selectedLesson()" (change)="chooseLesson(+$any($event.target).value)">
            @for (item of weeks; track item.week) {
              @for (session of item.sessions; track $index; let i = $index) {
                <option [value]="(item.week - 1) * 2 + i + 1" [selected]="selectedLesson() === (item.week - 1) * 2 + i + 1">Week {{ item.week }} \xB7 {{ i + 1 }} \u2014 {{ session.title }}</option>
              }
            }
          </select>
        </label>
        <p>{{ sessionIndex() === 0 ? 'Individual learning' : 'Group activity plan' }} \xB7 local drafts only</p>
      </div>
      <p class="sample-note">Starting content: {{ session().sample }}</p>
      @if (extraFocus(); as focus) { <p class="sample-note">Extra exploration: {{ focus }}. The planning panels still describe Week {{ week().week }}.</p> }
      @for (entry of opened(); track entry.number) {
        <section class="lab-slot" [hidden]="selectedLesson() !== entry.number" [attr.aria-label]="entry.session.title">
          <ng-container *ngComponentOutlet="entry.component; inputs: inputsFor(entry); injector: entry.injector" />
        </section>
      }
    </section>
    <aside class="planning" aria-label="Weekly products and tutor planning">
      <details open class="plan-card products">
        <summary><span class="eyebrow">WEEK {{ week().week }}</span><h2>Proposed weekly products</h2></summary>
        <p>Potential work \xB7 no completion tracking</p>
        <ol>
          @for (item of week().sessions; track $index; let i = $index) {
            <li [class.current]="i === sessionIndex()"><strong>Session {{ i + 1 }} \xB7 {{ i === 0 ? 'Individual learning' : 'Group activity' }}</strong><p>{{ item.product }}</p></li>
          }
        </ol>
        <p class="footnote">The future tutor will guide and review products before completion is recorded. Shared work is a future build.</p>
      </details>
      <details open class="plan-card tutor">
        <summary><span class="eyebrow">BUILD PLANNING</span><h2>AI Tutor</h2><span class="badge">Not connected</span></summary>
        <h3>Questions and concepts</h3><ul>@for (question of week().questions; track question) { <li>{{ question }}</li> }</ul>
        <h3>Evidence to inspect</h3><ul>@for (item of week().evidence; track item) { <li>{{ item }}</li> }</ul>
        <h3>Future model controls</h3><ul>@for (item of week().controls; track item) { <li>{{ item }}</li> }</ul>
        @if (extraFocus(); as focus) { <p>Extra tool open: {{ focus }}. Compare its result with this session's intended test.</p> }
        <p class="footnote">Manual instrument changes are extra exploration within Week {{ week().week }}. These lists keep that week's focus. There is no automatic review, adaptation or mastery assessment.</p>
      </details>
    </aside>
  </main>
}
`, styles: ['/* src/app/features/mystery-investigation/lab-week-workspace.component.scss */\n:host {\n  display: block;\n  color: #e6f2f6;\n  background: #091b27;\n  font-family: system-ui, sans-serif;\n}\n.weekly-workspace {\n  --accent: #80e3d6;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(280px, 3fr);\n  gap: 18px;\n  padding: 18px;\n  align-items: start;\n}\n.weekly-workspace[data-week="2"] {\n  --accent: #bdb1ff;\n}\n.weekly-workspace[data-week="3"] {\n  --accent: #88cfff;\n}\n.weekly-workspace[data-week="4"] {\n  --accent: #ffd095;\n}\n.interactive,\n.planning,\n.lab-slot {\n  min-width: 0;\n}\n.week-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: start;\n  border-top: 3px solid var(--accent);\n  padding: 16px 0 6px;\n}\nh1 {\n  font-size: clamp(1.4rem, 2.5vw, 2rem);\n  margin: 5px 0 8px;\n}\nh2 {\n  font-size: 1.15rem;\n  margin: 6px 0;\n}\nh3 {\n  color: var(--accent);\n  font-size: 0.95rem;\n  margin: 20px 0 7px;\n}\np,\nli {\n  font-size: 0.94rem;\n  line-height: 1.5;\n}\np {\n  margin: 6px 0 12px;\n}\n.eyebrow {\n  color: var(--accent);\n  font-size: 0.72rem;\n  letter-spacing: 0.12em;\n  font-weight: 750;\n}\n.badge {\n  display: inline-block;\n  font-size: 0.75rem;\n  line-height: 1.4;\n  padding: 6px 9px;\n  border: 1px solid #557586;\n  border-radius: 7px;\n  color: #d7e6ec;\n}\n.session-bar {\n  display: flex;\n  gap: 14px;\n  align-items: end;\n  flex-wrap: wrap;\n}\nlabel {\n  display: grid;\n  gap: 6px;\n  font-size: 0.82rem;\n  flex: 1;\n  min-width: 0;\n}\nselect {\n  width: 100%;\n  min-height: 44px;\n  font: inherit;\n  background: #153442;\n  color: #fff;\n  border: 1px solid #53778a;\n  border-radius: 6px;\n  padding: 8px;\n}\n.sample-note {\n  border-left: 2px solid var(--accent);\n  padding: 8px 12px;\n  color: #c5dce6;\n  font-size: 0.82rem;\n}\n.lab-slot {\n  border: 1px solid #355866;\n  border-radius: 12px;\n  overflow: clip;\n}\n.lab-slot[hidden] {\n  display: none;\n}\n.planning {\n  display: grid;\n  gap: 16px;\n}\n.plan-card {\n  padding: 16px;\n  background: #122c3a;\n  border: 1px solid #355565;\n  border-radius: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 44px;\n}\nsummary h2 {\n  display: inline;\n  margin-right: 8px;\n}\nsummary .eyebrow {\n  display: block;\n  margin-bottom: 8px;\n}\nol,\nul {\n  padding-left: 20px;\n}\nli {\n  padding: 4px 0;\n}\n.products li {\n  padding: 12px;\n  margin: 10px 0;\n  border-left: 2px solid #355565;\n}\n.products li.current {\n  background: #1c3e4e;\n  border-color: var(--accent);\n}\n.footnote {\n  color: #b1c9d3;\n  font-size: 0.8rem;\n}\n:is(select, summary):focus-visible {\n  outline: 3px solid var(--accent);\n  outline-offset: 4px;\n}\n@media (max-width: 1000px) {\n  .weekly-workspace {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 620px) {\n  .weekly-workspace {\n    padding: 10px;\n  }\n  .week-heading {\n    flex-direction: column;\n  }\n  .planning {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .session-bar {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=lab-week-workspace.component.css.map */\n'] }]
  }], () => [], { outlets: [{ type: ViewChildren, args: [forwardRef(() => NgComponentOutlet), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LabWeekWorkspaceComponent, { className: "LabWeekWorkspaceComponent", filePath: "src/app/features/mystery-investigation/lab-week-workspace.component.ts", lineNumber: 27 });
})();
export {
  LabWeekWorkspaceComponent
};
//# debugId=6a3f1de1-9111-5503-b515-7d7075c4efd2
//# sourceMappingURL=chunk-V42PMG4A.js.map
