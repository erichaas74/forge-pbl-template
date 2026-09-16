import {
  BroadcastDirectorService,
  CompetitionBracketComponent,
  ScoreboardComponent,
  TelevisionStageComponent,
  studioProjection
} from "./chunk-LTBIBO7J.js";
import {
  CompetitionRuntimeService
} from "./chunk-2T3THWAB.js";
import {
  midnightBroadcast,
  polarBroadcast
} from "./chunk-IIEET437.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
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
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/domain/show-progress.ts
var railStops = [
  { id: "line-up", label: "Line-up" },
  { id: "get-ready", label: "Get ready" },
  { id: "answer", label: "Answer now" },
  { id: "scores", label: "Scores" },
  { id: "result", label: "Result" }
];
var stopByPhase = {
  setup: "line-up",
  bracket: "line-up",
  ready: "get-ready",
  open: "answer",
  paused: "answer",
  locked: "scores",
  revealed: "scores",
  results: "result",
  champion: "result"
};
function railIndex(phase) {
  return railStops.findIndex((stop) => stop.id === stopByPhase[phase]);
}
function railWaiting(phase) {
  return phase === "paused" || phase === "locked";
}
function railDetail(phase, roundTitle, roundIndex, roundCount) {
  if (phase === "setup") return "Seeds are set. Nobody has played yet.";
  if (phase === "bracket") return "The bracket is drawn.";
  if (phase === "champion") return "The championship is decided.";
  if (phase === "results") return "The contest is over.";
  return `${roundTitle} \xB7 round ${roundIndex + 1} of ${roundCount}`;
}

// src/app/templates/competition-show/ui/show-rail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ShowRailComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275domElement(1, "span", 5);
    \u0275\u0275domElementStart(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const stop_r1 = ctx.$implicit;
    const \u0275$index_5_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("done", \u0275$index_5_r2 < ctx_r2.index())("now", \u0275$index_5_r2 === ctx_r2.index())("waiting", \u0275$index_5_r2 === ctx_r2.index() && ctx_r2.waiting());
    \u0275\u0275attribute("aria-current", \u0275$index_5_r2 === ctx_r2.index() ? "step" : null);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stop_r1.label);
  }
}
function ShowRailComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.clock());
  }
}
var ShowRailComponent = class _ShowRailComponent {
  phase = input.required(
    ...ngDevMode ? [{ debugName: "phase" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roundTitle = input(
    "",
    ...ngDevMode ? [{ debugName: "roundTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roundIndex = input(
    0,
    ...ngDevMode ? [{ debugName: "roundIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roundCount = input(
    1,
    ...ngDevMode ? [{ debugName: "roundCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = input(
    "",
    ...ngDevMode ? [{ debugName: "clock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stops = railStops;
  index = computed(
    () => railIndex(this.phase()),
    ...ngDevMode ? [{ debugName: "index" }] : (
      /* istanbul ignore next */
      []
    )
  );
  waiting = computed(
    () => railWaiting(this.phase()),
    ...ngDevMode ? [{ debugName: "waiting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  detail = computed(
    () => railDetail(this.phase(), this.roundTitle(), this.roundIndex(), this.roundCount()),
    ...ngDevMode ? [{ debugName: "detail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ShowRailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowRailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShowRailComponent, selectors: [["app-show-rail"]], inputs: { phase: [1, "phase"], roundTitle: [1, "roundTitle"], roundIndex: [1, "roundIndex"], roundCount: [1, "roundCount"], clock: [1, "clock"] }, decls: 8, vars: 2, consts: [[1, "rail"], ["aria-label", "Show progress"], [3, "done", "now", "waiting"], [1, "detail"], [1, "clock"], ["aria-hidden", "true", 1, "dot"], [1, "label"]], template: function ShowRailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "ol", 1);
      \u0275\u0275repeaterCreate(2, ShowRailComponent_For_3_Template, 4, 8, "li", 2, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 3)(5, "span");
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(7, ShowRailComponent_Conditional_7_Template, 2, 1, "strong", 4);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.stops);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.detail());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clock() ? 7 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.rail[_ngcontent-%COMP%] {\n  border: 1px solid #26344a;\n  border-top: 2px solid var(--%NS%broadcast-accent, #edc875);\n  background: #0b1524;\n  padding: 16px 18px 12px;\n}\nol[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nli[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 7px;\n  position: relative;\n  text-align: center;\n  min-width: 0;\n}\nli[_ngcontent-%COMP%]::before, \nli[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 6px;\n  height: 2px;\n  background: #1b2739;\n}\nli[_ngcontent-%COMP%]::before {\n  left: 0;\n  right: 50%;\n  margin-right: 7px;\n}\nli[_ngcontent-%COMP%]::after {\n  left: 50%;\n  right: 0;\n  margin-left: 7px;\n}\nli[_ngcontent-%COMP%]:first-child::before, \nli[_ngcontent-%COMP%]:last-child::after {\n  display: none;\n}\nli.done[_ngcontent-%COMP%]::before, \nli.done[_ngcontent-%COMP%]::after, \nli.now[_ngcontent-%COMP%]::before {\n  background: #6d7f98;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  border: 2px solid #1b2739;\n  background: #0b1524;\n  position: relative;\n  z-index: 1;\n  flex: none;\n}\nli.done[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #6d7f98;\n  border-color: #6d7f98;\n}\nli.now[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--%NS%broadcast-accent, #edc875);\n  border-color: var(--%NS%broadcast-accent, #edc875);\n  box-shadow: 0 0 0 5px rgba(237, 200, 117, 0.1803921569);\n}\nli.now.waiting[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 1.6s ease-in-out infinite;\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #6d7f98;\n  overflow-wrap: anywhere;\n}\nli.now[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent, #edc875);\n}\nli.done[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #93a6c0;\n}\n.detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n  margin: 14px 0 0;\n  font-size: 13px;\n  color: #93a6c0;\n}\n.clock[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-variant-numeric: tabular-nums;\n  color: var(--%NS%broadcast-accent, #edc875);\n  font-weight: 400;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 5px rgba(237, 200, 117, 0.1803921569);\n  }\n  50% {\n    box-shadow: 0 0 0 9px rgba(237, 200, 117, 0.0784313725);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  li.now.waiting[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n@media (max-width: 640px) {\n  .label[_ngcontent-%COMP%] {\n    font-size: 9px;\n    letter-spacing: 0.04em;\n  }\n  .rail[_ngcontent-%COMP%] {\n    padding: 12px 10px 10px;\n  }\n}\n/*# sourceMappingURL=show-rail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowRailComponent, [{
    type: Component,
    args: [{ selector: "app-show-rail", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="rail">
      <ol aria-label="Show progress">
        @for (stop of stops; track stop.id; let i = $index) {
          <li [class.done]="i < index()" [class.now]="i === index()" [class.waiting]="i === index() && waiting()"
            [attr.aria-current]="i === index() ? 'step' : null">
            <span class="dot" aria-hidden="true"></span><span class="label">{{ stop.label }}</span>
          </li>
        }
      </ol>
      <p class="detail"><span>{{ detail() }}</span>@if (clock()) { <strong class="clock">{{ clock() }}</strong> }</p>
    </div>`, styles: ['/* angular:styles/component:scss;fbb0901770a942fe1856aadb5ba5f59f4d733f50c2f8613f00bb80919bfd2e26;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/competition-show/ui/show-rail.component.ts */\n:host {\n  display: block;\n}\n.rail {\n  border: 1px solid #26344a;\n  border-top: 2px solid var(--broadcast-accent, #edc875);\n  background: #0b1524;\n  padding: 16px 18px 12px;\n}\nol {\n  display: flex;\n  align-items: flex-start;\n  gap: 0;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nli {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 7px;\n  position: relative;\n  text-align: center;\n  min-width: 0;\n}\nli::before,\nli::after {\n  content: "";\n  position: absolute;\n  top: 6px;\n  height: 2px;\n  background: #1b2739;\n}\nli::before {\n  left: 0;\n  right: 50%;\n  margin-right: 7px;\n}\nli::after {\n  left: 50%;\n  right: 0;\n  margin-left: 7px;\n}\nli:first-child::before,\nli:last-child::after {\n  display: none;\n}\nli.done::before,\nli.done::after,\nli.now::before {\n  background: #6d7f98;\n}\n.dot {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  border: 2px solid #1b2739;\n  background: #0b1524;\n  position: relative;\n  z-index: 1;\n  flex: none;\n}\nli.done .dot {\n  background: #6d7f98;\n  border-color: #6d7f98;\n}\nli.now .dot {\n  background: var(--broadcast-accent, #edc875);\n  border-color: var(--broadcast-accent, #edc875);\n  box-shadow: 0 0 0 5px rgba(237, 200, 117, 0.1803921569);\n}\nli.now.waiting .dot {\n  animation: pulse 1.6s ease-in-out infinite;\n}\n.label {\n  font-size: 11px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #6d7f98;\n  overflow-wrap: anywhere;\n}\nli.now .label {\n  color: var(--broadcast-accent, #edc875);\n}\nli.done .label {\n  color: #93a6c0;\n}\n.detail {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n  margin: 14px 0 0;\n  font-size: 13px;\n  color: #93a6c0;\n}\n.clock {\n  font-size: 26px;\n  font-variant-numeric: tabular-nums;\n  color: var(--broadcast-accent, #edc875);\n  font-weight: 400;\n}\n@keyframes pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 5px rgba(237, 200, 117, 0.1803921569);\n  }\n  50% {\n    box-shadow: 0 0 0 9px rgba(237, 200, 117, 0.0784313725);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  li.now.waiting .dot {\n    animation: none;\n  }\n}\n@media (max-width: 640px) {\n  .label {\n    font-size: 9px;\n    letter-spacing: 0.04em;\n  }\n  .rail {\n    padding: 12px 10px 10px;\n  }\n}\n/*# sourceMappingURL=show-rail.component.css.map */\n'] }]
  }], null, { phase: [{ type: Input, args: [{ isSignal: true, alias: "phase", required: true }] }], roundTitle: [{ type: Input, args: [{ isSignal: true, alias: "roundTitle", required: false }] }], roundIndex: [{ type: Input, args: [{ isSignal: true, alias: "roundIndex", required: false }] }], roundCount: [{ type: Input, args: [{ isSignal: true, alias: "roundCount", required: false }] }], clock: [{ type: Input, args: [{ isSignal: true, alias: "clock", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShowRailComponent, { className: "ShowRailComponent", filePath: "src/app/templates/competition-show/ui/show-rail.component.ts", lineNumber: 42 });
})();

// src/app/templates/competition-show/ui/teacher-guide.component.ts
var _c0 = ["panel"];
var _c1 = ["trigger"];
var _c2 = ["*"];
function TeacherGuideComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.badge());
  }
}
function TeacherGuideComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "aside", 4, 1)(2, "header")(3, "div")(4, "small");
    \u0275\u0275text(5, "TEACHER ONLY");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "button", 5);
    \u0275\u0275domListener("click", function TeacherGuideComponent_Conditional_4_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.close());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "div", 6);
    \u0275\u0275projection(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "p", 7);
    \u0275\u0275text(13, "Students never see this panel. Game points stay separate from academic evidence.");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.title());
  }
}
var TeacherGuideComponent = class _TeacherGuideComponent {
  title = input(
    "Teacher guide",
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Count of actions waiting on the host, shown on the closed trigger. */
  badge = input(
    0,
    ...ngDevMode ? [{ debugName: "badge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opened = output();
  open = signal(
    false,
    ...ngDevMode ? [{ debugName: "open" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panel = viewChild(
    "panel",
    ...ngDevMode ? [{ debugName: "panel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trigger = viewChild(
    "trigger",
    ...ngDevMode ? [{ debugName: "trigger" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  toggle() {
    this.open.update((value) => !value);
    this.opened.emit(this.open());
    if (this.open())
      afterNextRender(() => this.panel()?.nativeElement.focus({ preventScroll: true }), { injector: this.injector });
  }
  close() {
    if (!this.open())
      return;
    this.open.set(false);
    this.opened.emit(false);
    this.trigger()?.nativeElement.focus({ preventScroll: true });
  }
  static \u0275fac = function TeacherGuideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherGuideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherGuideComponent, selectors: [["app-teacher-guide"]], viewQuery: function TeacherGuideComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.panel, _c0, 5)(ctx.trigger, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { title: [1, "title"], badge: [1, "badge"] }, outputs: { opened: "opened" }, ngContentSelectors: _c2, decls: 5, vars: 4, consts: [["trigger", ""], ["panel", ""], ["type", "button", "aria-controls", "teacher-guide-panel", 1, "guide-trigger", 3, "click"], [1, "badge"], ["id", "teacher-guide-panel", "tabindex", "-1", "aria-label", "Teacher guide", 1, "guide"], ["type", "button", "aria-label", "Close teacher guide", 3, "click"], [1, "guide-body"], [1, "guide-foot"]], template: function TeacherGuideComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "button", 2, 0);
      \u0275\u0275domListener("click", function TeacherGuideComponent_Template_button_click_0_listener() {
        return ctx.toggle();
      });
      \u0275\u0275text(2);
      \u0275\u0275conditionalCreate(3, TeacherGuideComponent_Conditional_3_Template, 2, 1, "span", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, TeacherGuideComponent_Conditional_4_Template, 14, 1, "aside", 4);
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-expanded", ctx.open());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.open() ? "Close guide" : "\u2699 Teacher guide");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.open() && ctx.badge() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.open() ? 4 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.guide-trigger[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 1px solid var(--%NS%broadcast-accent, #edc875);\n  border-radius: 4px;\n  background: #1a1508;\n  color: var(--%NS%broadcast-accent, #edc875);\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n.guide-trigger[_ngcontent-%COMP%]:hover {\n  background: #241d0c;\n}\n.badge[_ngcontent-%COMP%] {\n  background: var(--%NS%broadcast-accent, #edc875);\n  color: #111a28;\n  border-radius: 9px;\n  padding: 1px 7px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.guide[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  border: 1px solid #6d5a33;\n  border-left: 3px solid var(--%NS%broadcast-accent, #edc875);\n  background: #12100a;\n  padding: 0 0 4px;\n}\n.guide[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 20px;\n  border-bottom: 1px solid #332c18;\n}\nheader[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%broadcast-accent, #edc875);\n  font-size: 9px;\n  letter-spacing: 2px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 500;\n  margin: 6px 0 0;\n  color: #f4ecd8;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 36px;\n  min-width: 36px;\n  border: 1px solid #5d4f2e;\n  border-radius: 4px;\n  background: #1d1809;\n  color: #e7dcc0;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n}\n.guide-body[_ngcontent-%COMP%] {\n  padding: 4px 20px;\n}\n.guide-foot[_ngcontent-%COMP%] {\n  margin: 4px 20px 12px;\n  font-size: 11px;\n  color: #96886a;\n}\n[_ngcontent-%COMP%]:is(button, input, textarea, select):focus-visible {\n  outline: 2px solid #f1d89b;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .guide-body[_ngcontent-%COMP%] {\n    padding: 4px 12px;\n  }\n  header[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}\n/*# sourceMappingURL=teacher-guide.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherGuideComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-guide", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button #trigger class="guide-trigger" type="button" [attr.aria-expanded]="open()" aria-controls="teacher-guide-panel"
      (click)="toggle()">{{ open() ? 'Close guide' : '\u2699 Teacher guide' }}@if (!open() && badge()) { <span class="badge">{{ badge() }}</span> }</button>
    @if (open()) {
      <aside #panel id="teacher-guide-panel" class="guide" tabindex="-1" aria-label="Teacher guide">
        <header><div><small>TEACHER ONLY</small><h2>{{ title() }}</h2></div>
          <button type="button" (click)="close()" aria-label="Close teacher guide">\xD7</button></header>
        <div class="guide-body"><ng-content /></div>
        <p class="guide-foot">Students never see this panel. Game points stay separate from academic evidence.</p>
      </aside>
    }`, styles: ["/* angular:styles/component:scss;52c1e7443013b23189df49cfa720c8cbf6f57f2b5afe3315974a177419684d58;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/competition-show/ui/teacher-guide.component.ts */\n:host {\n  display: block;\n}\n.guide-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 1px solid var(--broadcast-accent, #edc875);\n  border-radius: 4px;\n  background: #1a1508;\n  color: var(--broadcast-accent, #edc875);\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n.guide-trigger:hover {\n  background: #241d0c;\n}\n.badge {\n  background: var(--broadcast-accent, #edc875);\n  color: #111a28;\n  border-radius: 9px;\n  padding: 1px 7px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.guide {\n  margin-top: 12px;\n  border: 1px solid #6d5a33;\n  border-left: 3px solid var(--broadcast-accent, #edc875);\n  background: #12100a;\n  padding: 0 0 4px;\n}\n.guide:focus {\n  outline: none;\n}\nheader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 20px;\n  border-bottom: 1px solid #332c18;\n}\nheader small {\n  display: block;\n  color: var(--broadcast-accent, #edc875);\n  font-size: 9px;\n  letter-spacing: 2px;\n}\nh2 {\n  font-size: 19px;\n  font-weight: 500;\n  margin: 6px 0 0;\n  color: #f4ecd8;\n}\nheader button {\n  min-height: 36px;\n  min-width: 36px;\n  border: 1px solid #5d4f2e;\n  border-radius: 4px;\n  background: #1d1809;\n  color: #e7dcc0;\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n}\n.guide-body {\n  padding: 4px 20px;\n}\n.guide-foot {\n  margin: 4px 20px 12px;\n  font-size: 11px;\n  color: #96886a;\n}\n:is(button, input, textarea, select):focus-visible {\n  outline: 2px solid #f1d89b;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .guide-body {\n    padding: 4px 12px;\n  }\n  header {\n    padding: 12px;\n  }\n}\n/*# sourceMappingURL=teacher-guide.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], badge: [{ type: Input, args: [{ isSignal: true, alias: "badge", required: false }] }], opened: [{ type: Output, args: ["opened"] }], panel: [{ type: ViewChild, args: ["panel", { isSignal: true }] }], trigger: [{ type: ViewChild, args: ["trigger", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherGuideComponent, { className: "TeacherGuideComponent", filePath: "src/app/templates/competition-show/ui/teacher-guide.component.ts", lineNumber: 37 });
})();

// src/app/templates/competition-show/ui/competition-show.component.ts
var _c02 = ["workspace"];
var _c12 = () => ["setup", "bracket"];
var _c22 = (a0) => ["/projects", a0, "final-demo"];
var _c3 = () => ["open", "paused", "locked", "revealed"];
var _c4 = () => ["locked", "revealed", "results", "bracket", "champion"];
var _c5 = () => ["setup", "bracket", "champion"];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.teamId;
function CompetitionShowComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 2);
    \u0275\u0275text(1, "\u2190 Projects");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.present());
    });
    \u0275\u0275text(1, "Leave projector mode");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275text(1, "\u25B6 Preview the final");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c22, ctx_r1.show.config.projectId));
  }
}
function CompetitionShowComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.error());
  }
}
function CompetitionShowComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "small");
    \u0275\u0275text(2, "THE CHAMPIONSHIP IS DECIDED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.show.name(ctx_r1.show.state().championId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Champions of ", ctx_r1.show.config.title);
  }
}
function CompetitionShowComponent_Conditional_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-competition-bracket", 11);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("matches", ctx_r1.show.state().matches)("teams", ctx_r1.show.state().teams)("hybrid", ctx_r1.show.state().mode === "hybrid");
  }
}
function CompetitionShowComponent_Conditional_18_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "b");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r3.qualificationPoints);
  }
}
function CompetitionShowComponent_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12)(1, "h2");
    \u0275\u0275text(2, "The line-up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Seeded on qualification points. Every contest starts at zero.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ol");
    \u0275\u0275repeaterCreate(6, CompetitionShowComponent_Conditional_18_Conditional_1_For_7_Template, 7, 3, "li", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.lineup());
  }
}
function CompetitionShowComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CompetitionShowComponent_Conditional_18_Conditional_0_Template, 1, 3, "app-competition-bracket", 11)(1, CompetitionShowComponent_Conditional_18_Conditional_1_Template, 8, 0, "section", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.show.state().matches.length ? 0 : 1);
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Clock paused. Answers are paused too.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Answers are in. Scores on their way.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 15)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CompetitionShowComponent_Conditional_19_Conditional_1_Conditional_3_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(4, CompetitionShowComponent_Conditional_19_Conditional_1_Conditional_4_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.round().prompt);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "paused" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "locked" ? 4 : -1);
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("First buzz: ", ctx_r1.show.name(ctx_r1.show.state().buzzes[0]));
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const top_r5 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(top_r5.verdict === "correct" ? top_r5.name + " takes " + top_r5.award + " points." : "No points this time.");
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Round complete.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const response_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.show.name(response_r6.teamId), " \xB7 ", response_r6.points, " points");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(response_r6.text);
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_For_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.show.name(id_r7), " \xB7 No answer \xB7 ", ctx_r1.show.round().kind === "wager" ? -ctx_r1.show.state().wagers[id_r7] : 0, " points");
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CompetitionShowComponent_Conditional_19_Conditional_3_For_9_Conditional_0_Template, 2, 2, "p", 20);
  }
  if (rf & 2) {
    const id_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!ctx_r1.answerLocked(id_r7) ? 0 : -1);
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18)(1, "small");
    \u0275\u0275text(2, "THE SCORES ARE IN");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CompetitionShowComponent_Conditional_19_Conditional_3_Conditional_3_Template, 2, 1, "strong")(4, CompetitionShowComponent_Conditional_19_Conditional_3_Conditional_4_Template, 2, 0, "strong");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "section", 19);
    \u0275\u0275repeaterCreate(6, CompetitionShowComponent_Conditional_19_Conditional_3_For_7_Template, 5, 3, "article", null, _forTrack1);
    \u0275\u0275repeaterCreate(8, CompetitionShowComponent_Conditional_19_Conditional_3_For_9_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("good", ctx_r1.topAward() && ctx_r1.topAward().verdict === "correct");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.topAward()) ? 3 : 4, tmp_4_0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.show.state().responses);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.show.state().participants);
  }
}
function CompetitionShowComponent_Conditional_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.leaders().length > 1 ? "A tie. One more decision." : ctx_r1.show.name(ctx_r1.show.leaders()[0]) + " leads the field.");
  }
}
function CompetitionShowComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-scoreboard", 14);
    \u0275\u0275conditionalCreate(1, CompetitionShowComponent_Conditional_19_Conditional_1_Template, 5, 3, "section", 15);
    \u0275\u0275conditionalCreate(2, CompetitionShowComponent_Conditional_19_Conditional_2_Template, 2, 1, "p", 16);
    \u0275\u0275conditionalCreate(3, CompetitionShowComponent_Conditional_19_Conditional_3_Template, 10, 3);
    \u0275\u0275conditionalCreate(4, CompetitionShowComponent_Conditional_19_Conditional_4_Template, 2, 1, "h3", 17);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("teams", ctx_r1.studioView().teams)("animate", !ctx_r1.director.reducedMotion());
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275\u0275pureFunction0(6, _c3).includes(ctx_r1.show.state().phase) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.round().kind === "buzzer" && ctx_r1.show.state().buzzes.length ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "revealed" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "results" ? 4 : -1);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 21)(1, "h2");
    \u0275\u0275text(2, "Ready when you are.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.seed());
    });
    \u0275\u0275text(6, "Start the championship");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.show.config.description);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Wager locked \xB7 ", ctx_r1.show.state().wagers[id_r10]);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_4_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r11);
      const id_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.wagers[id_r10], $event) || (ctx_r1.wagers[id_r10] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 36);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const id_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "wager", teamId: id_r10, points: ctx_r1.wagers[id_r10] ?? 0 }));
    });
    \u0275\u0275text(4, "Lock wager");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Wager (0\u2013", ctx_r1.show.state().scores[id_r10], ") ");
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.show.state().scores[id_r10]);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.wagers[id_r10]);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_3_Template, 2, 1, "span", 34)(4, CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Conditional_4_Template, 5, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.name(id_r10));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().wagers[id_r10] !== void 0 ? 3 : 4);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21)(1, "h2");
    \u0275\u0275text(2, "How much will you risk?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Lock every wager before the prompt appears. A missed or unanswered response loses the wager.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, CompetitionShowComponent_Conditional_20_Conditional_1_For_6_Template, 5, 2, "div", 33, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.show.state().participants);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_1_For_6_Template_button_click_0_listener() {
      const id_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.command({ type: "buzz", teamId: id_r13 }));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.name(id_r13));
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Buzz in.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "First team to buzz answers this one.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 37);
    \u0275\u0275repeaterCreate(5, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_1_For_6_Template, 2, 2, "button", 38, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.show.state().participants);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Conditional_2_For_2_Template_button_click_0_listener() {
      const other_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.answering.set(other_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const other_r16 = ctx.$implicit;
    const id_r17 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", other_r16 === id_r17);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.name(other_r16));
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275repeaterCreate(1, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Conditional_2_For_2_Template, 2, 2, "button", 44, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pending());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Conditional_2_Template, 3, 0, "div", 40);
    \u0275\u0275elementStart(3, "label", 41);
    \u0275\u0275text(4, "Team answer ");
    \u0275\u0275elementStart(5, "textarea", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Template_textarea_ngModelChange_5_listener($event) {
      const id_r17 = \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.drafts[id_r17], $event) || (ctx_r1.drafts[id_r17] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Template_button_click_6_listener() {
      const id_r17 = \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "answer", teamId: id_r17, text: ctx_r1.drafts[id_r17] }));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r17 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.show.name(id_r17), ", your answer.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pending().length > 1 ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.drafts[id_r17]);
    \u0275\u0275attribute("aria-label", "Answer for " + ctx_r1.show.name(id_r17));
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.show.blocked() || !ctx_r1.drafts[id_r17]?.trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Lock ", ctx_r1.show.name(id_r17), "'s answer");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.pending().length, " of ", ctx_r1.show.state().participants.length, " still to answer.");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Every answer is in.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Waiting for the host to close the round.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21);
    \u0275\u0275conditionalCreate(1, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_1_Template, 7, 0)(2, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_2_Template, 10, 8)(3, CompetitionShowComponent_Conditional_20_Conditional_2_Conditional_3_Template, 4, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.round().kind === "buzzer" && !ctx_r1.show.state().buzzes.length ? 1 : (tmp_3_0 = ctx_r1.current()) ? 2 : 3, tmp_3_0);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Teams, get ready.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.director.cue() === "question" ? "Question reveal in progress. Answer time starts when the reveal finishes." : "The prompt appears when the host starts the clock.");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Hold on.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "The clock is paused. Nothing is lost.");
    \u0275\u0275elementEnd()();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.state().phase === "champion" ? "That is the championship." : "Eyes on the stage.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.state().phase === "bracket" ? "The host starts the next match." : ctx_r1.show.state().phase === "champion" ? "Thanks for playing." : "The host is working through the scores.");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_7_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 48)(1, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_7_For_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.mode, $event) || (ctx_r1.mode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(2, "span")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const option_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("value", option_r20.id);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.mode);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(option_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r20.description);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_7_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4, "Team name ");
    \u0275\u0275elementStart(5, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_7_For_17_Template_input_ngModelChange_5_listener($event) {
      const team_r22 = \u0275\u0275restoreView(_r21).$implicit;
      \u0275\u0275twoWayBindingSet(team_r22.name, $event) || (team_r22.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Qualification points ");
    \u0275\u0275elementStart(8, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_7_For_17_Template_input_ngModelChange_8_listener($event) {
      const team_r22 = \u0275\u0275restoreView(_r21).$implicit;
      \u0275\u0275twoWayBindingSet(team_r22.qualificationPoints, $event) || (team_r22.qualificationPoints = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 36);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_7_For_17_Template_button_click_9_listener() {
      const team_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeTeam(team_r22.id));
    });
    \u0275\u0275text(10, "Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r22 = ctx.$implicit;
    const \u0275$index_285_r23 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_285_r23 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", team_r22.name);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", team_r22.qualificationPoints);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.teams.length <= 2);
    \u0275\u0275attribute("aria-label", "Remove " + team_r22.name);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "h3");
    \u0275\u0275text(2, "Championship format");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "fieldset", 46)(4, "legend", 47);
    \u0275\u0275text(5, "Championship format");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, CompetitionShowComponent_Conditional_20_Conditional_7_For_7_Template, 7, 4, "label", 48, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "section")(9, "h3");
    \u0275\u0275text(10, "Team line-up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Qualification points determine seeds. Ties use team ID order. Game scores never become grades.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "fieldset", 46)(14, "legend", 47);
    \u0275\u0275text(15, "Teams");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, CompetitionShowComponent_Conditional_20_Conditional_7_For_17_Template, 11, 5, "div", 33, _forTrack02);
    \u0275\u0275elementStart(18, "button", 36);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_7_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addTeam());
    });
    \u0275\u0275text(19, "Add team");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.modes);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.teams);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.teams.length >= 16);
  }
}
function CompetitionShowComponent_Conditional_20_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const round_r24 = ctx.$implicit;
    const \u0275$index_317_r25 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", \u0275$index_317_r25 === ctx_r1.show.state().roundIndex && ctx_r1.show.state().phase !== "setup");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(round_r24.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" \xB7 ", round_r24.kind, " \xB7 ", round_r24.seconds, "s \xB7 ", round_r24.kind === "wager" ? "risk up to your score" : round_r24.maxPoints + " points");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r28 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.name(id_r28));
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Finalists: ");
    \u0275\u0275repeaterCreate(2, CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_4_For_3_Template, 2, 1, "span", 53, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "start" }));
    });
    \u0275\u0275text(5, "Bring on the championship game show");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.show.finalists());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.show.blocked());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "All teams go directly to the championship game show.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "h3");
    \u0275\u0275text(2, "Start the next match");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-competition-bracket", 52);
    \u0275\u0275listener("start", function CompetitionShowComponent_Conditional_20_Conditional_18_Template_app_competition_bracket_start_3_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.command({ type: "start", matchId: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_4_Template, 6, 1);
    \u0275\u0275conditionalCreate(5, CompetitionShowComponent_Conditional_20_Conditional_18_Conditional_5_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("matches", ctx_r1.show.state().matches)("teams", ctx_r1.show.state().teams)("hybrid", ctx_r1.show.state().mode === "hybrid")("canStart", !ctx_r1.show.blocked());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().mode !== "tournament" && ctx_r1.show.finalists().length >= 2 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.show.state().matches.length ? 5 : -1);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Every wager must be locked first.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "open" }));
    });
    \u0275\u0275text(1, "Reveal prompt & start clock");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_6_Conditional_2_Template, 2, 0, "p");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.show.round().kind === "wager" && !ctx_r1.allWagersLocked());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.show.round().kind === "wager" && !ctx_r1.allWagersLocked() ? 2 : -1);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "pause" }));
    });
    \u0275\u0275text(1, "Pause clock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "lock" }));
    });
    \u0275\u0275text(3, "Lock all answers");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "resume" }));
    });
    \u0275\u0275text(1, "Resume clock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "lock" }));
    });
    \u0275\u0275text(3, "Lock all answers");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r33);
      const response_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.command({ type: "score", teamId: response_r34.teamId, points: ctx_r1.show.state().wagers[response_r34.teamId] }));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r33);
      const response_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.command({ type: "score", teamId: response_r34.teamId, points: -ctx_r1.show.state().wagers[response_r34.teamId] }));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const response_r34 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Correct: +", ctx_r1.show.state().wagers[response_r34.teamId]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Miss: \u2212", ctx_r1.show.state().wagers[response_r34.teamId]);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_6_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r35);
      const response_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.awards[response_r34.teamId], $event) || (ctx_r1.awards[response_r34.teamId] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r35);
      const response_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.command({ type: "score", teamId: response_r34.teamId, points: ctx_r1.awards[response_r34.teamId] ?? 0 }));
    });
    \u0275\u0275text(4, "Save points");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const response_r34 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Points (0\u2013", ctx_r1.show.round().maxPoints, ") ");
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.show.round().maxPoints);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.awards[response_r34.teamId]);
    \u0275\u0275control();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h4");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_5_Template, 4, 2)(6, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Conditional_6_Template, 5, 3);
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const response_r34 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.name(response_r34.teamId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(response_r34.text);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.round().kind === "wager" ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(response_r34.points === null ? "Needs scoring" : "Ready to reveal: " + response_r34.points);
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("No responses. ", ctx_r1.show.round().kind === "wager" ? "Every team loses its wager." : "No points awarded.");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Review each answer. Points may be corrected until the reveal.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_For_3_Template, 9, 4, "article", null, _forTrack1, false, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_ForEmpty_4_Template, 2, 1, "p");
    \u0275\u0275elementStart(5, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "reveal" }));
    });
    \u0275\u0275text(6, "Reveal answers & scores");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.show.state().responses);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.allScored());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.command({ type: "next" }));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.show.state().roundIndex + 1 === ctx_r1.show.config.rounds.length ? "Show contest results" : "Cue next round");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Tiebreak result ");
    \u0275\u0275elementStart(2, "textarea", 57);
    \u0275\u0275twoWayListener("ngModelChange", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_Conditional_0_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.tiebreak, $event) || (ctx_r1.tiebreak = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tiebreak);
    \u0275\u0275control();
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_For_2_Template_button_click_0_listener() {
      const id_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.finish(id_r39));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.show.blocked() || ctx_r1.show.leaders().length > 1 && ctx_r1.tiebreak.trim().length < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Confirm ", ctx_r1.show.name(id_r39), " ", ctx_r1.show.state().contestId === "championship-show" ? "as champion" : "to advance");
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_Conditional_0_Template, 3, 1, "label");
    \u0275\u0275repeaterCreate(1, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_For_2_Template, 2, 3, "button", 56, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.show.leaders().length > 1 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.show.leaders());
  }
}
function CompetitionShowComponent_Conditional_20_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h3");
    \u0275\u0275text(2, "Host controls");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "fieldset", 46)(4, "legend", 47);
    \u0275\u0275text(5, "Host controls");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_6_Template, 3, 2);
    \u0275\u0275conditionalCreate(7, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_7_Template, 4, 0);
    \u0275\u0275conditionalCreate(8, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_8_Template, 4, 0);
    \u0275\u0275conditionalCreate(9, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_9_Template, 7, 2);
    \u0275\u0275conditionalCreate(10, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_10_Template, 2, 1, "button", 54);
    \u0275\u0275conditionalCreate(11, CompetitionShowComponent_Conditional_20_Conditional_19_Conditional_11_Template, 3, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.show.blocked() || ctx_r1.director.cue() !== null);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.show.state().phase === "ready" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "open" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "paused" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "locked" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "revealed" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "results" ? 11 : -1);
  }
}
function CompetitionShowComponent_Conditional_20_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 26)(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "blockquote");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r40 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", e_r40.contestId, " \xB7 ", e_r40.roundId, " \xB7 ", e_r40.standards.join(" \xB7 "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.name(e_r40.teamId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r40.prompt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r40.response);
  }
}
function CompetitionShowComponent_Conditional_20_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Responses appear here as teams lock their answers.");
    \u0275\u0275elementEnd();
  }
}
function CompetitionShowComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, CompetitionShowComponent_Conditional_20_Conditional_0_Template, 7, 2, "section", 21)(1, CompetitionShowComponent_Conditional_20_Conditional_1_Template, 7, 0, "section", 21)(2, CompetitionShowComponent_Conditional_20_Conditional_2_Template, 4, 1, "section", 21)(3, CompetitionShowComponent_Conditional_20_Conditional_3_Template, 5, 1, "section", 22)(4, CompetitionShowComponent_Conditional_20_Conditional_4_Template, 5, 0, "section", 22)(5, CompetitionShowComponent_Conditional_20_Conditional_5_Template, 5, 2, "section", 22);
    \u0275\u0275elementStart(6, "app-teacher-guide", 23);
    \u0275\u0275conditionalCreate(7, CompetitionShowComponent_Conditional_20_Conditional_7_Template, 20, 3);
    \u0275\u0275elementStart(8, "section")(9, "h3");
    \u0275\u0275text(10, "Run sheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Each match uses this round queue. In hybrid mode it also runs once for all finalists.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "ol", 24);
    \u0275\u0275repeaterCreate(14, CompetitionShowComponent_Conditional_20_For_15_Template, 4, 6, "li", 25, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "Bracket byes advance automatically. Tied contests require a host tiebreak and a recorded reason.");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, CompetitionShowComponent_Conditional_20_Conditional_18_Template, 6, 6, "section");
    \u0275\u0275conditionalCreate(19, CompetitionShowComponent_Conditional_20_Conditional_19_Template, 12, 7, "section");
    \u0275\u0275elementStart(20, "section")(21, "h3");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Original prompts, team responses, and standards stay together. These are team evidence records; individual mastery still needs teacher review.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportRecord());
    });
    \u0275\u0275text(26, "Export rehearsal + evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(27, CompetitionShowComponent_Conditional_20_For_28_Template, 9, 6, "article", 26, _forTrack02, false, CompetitionShowComponent_Conditional_20_ForEmpty_29_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "section")(31, "h3");
    \u0275\u0275text(32, "Room & studio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.present());
    });
    \u0275\u0275text(34, "Projector mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.director.toggleSound());
    });
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 10);
    \u0275\u0275listener("click", function CompetitionShowComponent_Conditional_20_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.director.reducedMotion.set(!ctx_r1.director.reducedMotion()));
    });
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "label", 27);
    \u0275\u0275text(40, "Studio skin ");
    \u0275\u0275elementStart(41, "select", 28);
    \u0275\u0275listener("change", function CompetitionShowComponent_Conditional_20_Template_select_change_41_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeSkin($event));
    });
    \u0275\u0275elementStart(42, "option", 29);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 30);
    \u0275\u0275text(45, "Polar / Silver preview");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "p", 31);
    \u0275\u0275text(47, "Local rehearsal \xB7 all teams play from this device. Progress saves in this browser.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "a", 4);
    \u0275\u0275text(49, "\u25B6 Preview the final");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "setup" ? 0 : ctx_r1.show.state().phase === "ready" && ctx_r1.show.round().kind === "wager" ? 1 : ctx_r1.show.state().phase === "open" ? 2 : ctx_r1.show.state().phase === "ready" ? 3 : ctx_r1.show.state().phase === "paused" ? 4 : \u0275\u0275pureFunction0(12, _c4).includes(ctx_r1.show.state().phase) ? 5 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("badge", ctx_r1.waiting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.show.state().phase === "setup" ? 7 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.show.config.rounds);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.show.state().phase === "bracket" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!\u0275\u0275pureFunction0(13, _c5).includes(ctx_r1.show.state().phase) ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Evidence (", ctx_r1.show.state().evidence.length, ")");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.show.state().evidence);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.director.sound() ? "Sound on" : "Sound off");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.director.reducedMotion() ? "Camera cuts" : "Camera moves");
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.skin());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.show.config.broadcast?.label ?? "Midnight / Gold");
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c22, ctx_r1.show.config.projectId));
  }
}
var CompetitionShowComponent = class _CompetitionShowComponent {
  show = inject(CompetitionRuntimeService);
  television = viewChild(
    TelevisionStageComponent,
    ...ngDevMode ? [{ debugName: "television" }] : (
      /* istanbul ignore next */
      []
    )
  );
  director = inject(BroadcastDirectorService);
  skin = signal(
    "project",
    ...ngDevMode ? [{ debugName: "skin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theme = computed(
    () => this.skin() === "polar" ? __spreadProps(__spreadValues({}, polarBroadcast), { assets: this.show.config.broadcast?.assets ?? {}, teamEmblems: this.show.config.broadcast?.teamEmblems }) : this.show.config.broadcast ?? midnightBroadcast,
    ...ngDevMode ? [{ debugName: "theme" }] : (
      /* istanbul ignore next */
      []
    )
  );
  studioView = computed(
    () => studioProjection(this.show.config, this.show.state(), this.theme(), this.director.shot(), this.director.teamId(), this.director.cue(), this.director.step(), this.show.seconds()),
    ...ngDevMode ? [{ debugName: "studioView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  workspace = viewChild(
    "workspace",
    ...ngDevMode ? [{ debugName: "workspace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Projector mode drops the play card and the guide; the stage is all that remains. */
  projector = signal(
    false,
    ...ngDevMode ? [{ debugName: "projector" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Which team's answer card is showing. One team at a time replaces eight stacked fieldsets. */
  answering = signal(
    null,
    ...ngDevMode ? [{ debugName: "answering" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = this.show.state().mode;
  teams = structuredClone(this.show.state().teams);
  drafts = {};
  awards = {};
  wagers = {};
  tiebreak = "";
  modes = [
    { id: "hybrid", label: "Bracket \u2192 final game show", description: "Seeded matches narrow the field to four. The finalists enter one all-team championship." },
    { id: "tournament", label: "Head-to-head tournament", description: "Each match is a game show. Winners advance until one champion remains." },
    { id: "game-show", label: "All-team game show", description: "Every team stays in the final. The highest final score wins." }
  ];
  /** Teams still owing an answer this round, in turn order. */
  pending = computed(
    () => this.show.state().participants.filter((id) => this.canAnswer(id)),
    ...ngDevMode ? [{ debugName: "pending" }] : (
      /* istanbul ignore next */
      []
    )
  );
  current = computed(
    () => {
      const pending = this.pending();
      const chosen = this.answering();
      return chosen && pending.includes(chosen) ? chosen : pending[0] ?? null;
    },
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Actions waiting on the host, surfaced on the closed guide trigger. */
  waiting = computed(
    () => {
      const state = this.show.state();
      if (state.phase === "locked")
        return state.responses.filter((r) => r.points === null).length || 1;
      return ["ready", "open", "paused", "revealed", "results", "bracket"].includes(state.phase) ? 1 : 0;
    },
    ...ngDevMode ? [{ debugName: "waiting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The biggest mover of the round, for the reveal headline. */
  topAward = computed(
    () => {
      const scored = this.studioView().teams.filter((t) => t.verdict !== null);
      return scored.sort((a, b) => (b.award ?? 0) - (a.award ?? 0))[0] ?? null;
    },
    ...ngDevMode ? [{ debugName: "topAward" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = computed(
    () => ["ready", "open", "paused"].includes(this.show.state().phase) ? `${this.show.seconds()}s` : "",
    ...ngDevMode ? [{ debugName: "clock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const sound = this.director.sound();
      const cue = this.director.cue();
      const phase = this.show.state().phase;
      this.director.tension(this.theme(), sound && this.show.round().kind === "wager" && (phase === "ready" || phase === "open") && cue === null);
    });
    effect(() => {
      const first = this.show.state().buzzes[0];
      if (first && this.show.state().phase === "open")
        this.director.autoShot("team", first);
    });
  }
  command(command) {
    if (this.director.cue())
      return;
    if (command.type === "open" || command.type === "reveal") {
      const state = this.show.state();
      const expectedPhase = command.type === "open" ? "ready" : "locked";
      if (state.phase !== expectedPhase || this.show.blocked())
        return;
      this.television()?.focusStage();
      this.director.run(command.type === "open" ? "question" : "score", this.theme(), () => {
        const current = this.show.state();
        if (current.phase === expectedPhase && current.contestId === state.contestId && current.roundIndex === state.roundIndex)
          this.commit(command);
      });
      return;
    }
    this.commit(command);
  }
  commit(command) {
    const previous = this.show.state().phase;
    if (this.show.command(command)) {
      if (["next", "start"].includes(command.type)) {
        this.drafts = {};
        this.awards = {};
        this.wagers = {};
        this.tiebreak = "";
        this.answering.set(null);
      }
      if (command.type === "answer")
        this.answering.set(null);
      if (previous !== this.show.state().phase && !["start", "open", "reveal", "finish"].includes(command.type))
        this.focusWorkspace();
      if (command.type === "start") {
        this.television()?.focusStage();
        this.director.run("entrance", this.theme());
      }
      if (command.type === "next")
        this.director.autoShot("wide");
      if (command.type === "finish") {
        if (this.show.state().phase === "champion") {
          this.television()?.focusStage();
          this.director.run("champion", this.theme(), void 0, this.show.state().championId);
        } else
          this.director.autoShot("wide");
      }
    }
  }
  seed() {
    if (this.show.command({ type: "configure", mode: this.mode, teams: this.teams }))
      this.command({ type: "seed" });
  }
  addTeam() {
    let n = 1;
    while (this.teams.some((t) => t.id === `team-${n}`))
      n++;
    this.teams = [...this.teams, { id: `team-${n}`, name: `Team ${n}`, qualificationPoints: 0 }];
  }
  removeTeam(id) {
    this.teams = this.teams.filter((t) => t.id !== id);
  }
  changeSkin(event) {
    this.director.cancel();
    this.skin.set(event.target.value === "polar" ? "polar" : "project");
  }
  present() {
    this.projector.update((value) => !value);
    this.focusWorkspace();
  }
  /** Seeded order, for the read-only line-up the class sees before the first bell. */
  lineup = computed(
    () => [...this.show.state().teams].sort((a, b) => b.qualificationPoints - a.qualificationPoints || a.id.localeCompare(b.id)),
    ...ngDevMode ? [{ debugName: "lineup" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answerLocked(id) {
    return this.show.state().responses.some((r) => r.teamId === id);
  }
  allWagersLocked() {
    return this.show.state().participants.every((id) => this.show.state().wagers[id] !== void 0);
  }
  canAnswer(id) {
    return !this.answerLocked(id) && (this.show.round().kind !== "buzzer" || this.show.state().buzzes[0] === id);
  }
  allScored() {
    return this.show.state().responses.every((r) => r.points !== null);
  }
  finish(id) {
    this.command({ type: "finish", winnerId: id, reason: this.tiebreak });
  }
  exportRecord() {
    const state = this.show.state();
    const data = {
      schemaVersion: "1.0",
      authority: "local-rehearsal",
      projectId: this.show.config.projectId,
      projectVersion: this.show.config.projectVersion,
      mode: state.mode,
      teams: state.teams,
      championId: state.championId,
      matches: state.matches,
      results: state.results,
      evidence: state.evidence
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.show.config.projectId}-rehearsal.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  focusWorkspace() {
    afterNextRender(() => this.workspace()?.nativeElement.focus({ preventScroll: false }), { injector: this.injector });
  }
  static \u0275fac = function CompetitionShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompetitionShowComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompetitionShowComponent, selectors: [["app-competition-show"]], viewQuery: function CompetitionShowComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.television, TelevisionStageComponent, 5)(ctx.workspace, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, features: [\u0275\u0275ProvidersFeature([BroadcastDirectorService])], decls: 21, vars: 26, consts: [["workspace", ""], [1, "competition"], ["routerLink", "/projects"], [1, "header-actions"], [1, "button-link", 3, "routerLink"], ["role", "alert", 1, "error"], ["tabindex", "-1"], [3, "phase", "roundTitle", "roundIndex", "roundCount", "clock"], [3, "view", "theme", "presentation"], [1, "champion"], [3, "click"], [3, "matches", "teams", "hybrid"], [1, "lineup"], [1, "seed"], ["label", "Contest scoreboard", 3, "teams", "animate"], ["aria-live", "polite", 1, "prompt"], ["role", "status", 1, "buzz"], [1, "verdict"], [1, "verdict-banner"], [1, "reveal"], [1, "no-answer"], [1, "play"], [1, "play", "quiet"], ["title", "Run the championship", 3, "badge"], [1, "rundown"], [3, "active"], [1, "evidence"], [1, "skin-select"], ["aria-label", "Studio skin", 3, "change", "value"], ["value", "project"], ["value", "polar"], [1, "fineprint"], [1, "primary", 3, "click", "disabled"], [1, "team-row"], [1, "locked"], ["type", "number", "min", "0", 3, "ngModelChange", "max", "ngModel"], [3, "click", "disabled"], [1, "buzzers"], [1, "buzzer", 3, "disabled"], [1, "buzzer", 3, "click", "disabled"], ["role", "group", "aria-label", "Answering team", 1, "turns"], [1, "answer"], ["maxlength", "6000", 3, "ngModelChange", "ngModel"], [1, "remaining"], [1, "turn"], [1, "turn", 3, "click"], [3, "disabled"], [1, "sr-only"], [1, "mode"], ["type", "radio", "name", "mode", 3, "ngModelChange", "value", "ngModel"], ["maxlength", "60", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [3, "start", "matches", "teams", "hybrid", "canStart"], [1, "team-label"], [1, "primary"], [1, "primary", 3, "click"], [1, "primary", 3, "disabled"], ["placeholder", "Run a host-led tiebreak, then record the deciding evidence.", 3, "ngModelChange", "ngModel"]], template: function CompetitionShowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "app-workspace-tools")(2, "header");
      \u0275\u0275conditionalCreate(3, CompetitionShowComponent_Conditional_3_Template, 2, 0, "a", 2);
      \u0275\u0275elementStart(4, "div")(5, "small");
      \u0275\u0275text(6, "THE FINAL \xB7 CHAMPIONSHIP REHEARSAL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h1");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 3);
      \u0275\u0275conditionalCreate(10, CompetitionShowComponent_Conditional_10_Template, 2, 0, "button")(11, CompetitionShowComponent_Conditional_11_Template, 2, 3, "a", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(12, CompetitionShowComponent_Conditional_12_Template, 2, 1, "p", 5);
      \u0275\u0275elementStart(13, "main", 6, 0);
      \u0275\u0275element(15, "app-show-rail", 7)(16, "app-television-stage", 8);
      \u0275\u0275conditionalCreate(17, CompetitionShowComponent_Conditional_17_Template, 7, 2, "section", 9);
      \u0275\u0275conditionalCreate(18, CompetitionShowComponent_Conditional_18_Template, 2, 1)(19, CompetitionShowComponent_Conditional_19_Template, 5, 7);
      \u0275\u0275conditionalCreate(20, CompetitionShowComponent_Conditional_20_Template, 50, 16);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%broadcast-accent", ctx.theme().palette.accent)("--%NS%broadcast-secondary", ctx.theme().palette.secondary);
      \u0275\u0275classProp("projector", ctx.projector());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.projector() ? 3 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.show.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.projector() ? 10 : 11);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.show.error() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("on-air", ctx.projector())("cue-running", ctx.director.cue() !== null);
      \u0275\u0275advance(2);
      \u0275\u0275property("phase", ctx.show.state().phase)("roundTitle", ctx.show.round().title)("roundIndex", ctx.show.state().roundIndex)("roundCount", ctx.show.config.rounds.length)("clock", ctx.clock());
      \u0275\u0275advance();
      \u0275\u0275property("view", ctx.studioView())("theme", ctx.theme())("presentation", ctx.projector());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.show.state().phase === "champion" ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(\u0275\u0275pureFunction0(25, _c12).includes(ctx.show.state().phase) ? 18 : 19);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.projector() ? 20 : -1);
    }
  }, dependencies: [WorkspaceToolsComponent, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RadioControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, RouterLink, CompetitionBracketComponent, TelevisionStageComponent, ShowRailComponent, TeacherGuideComponent, ScoreboardComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #e9edf5;\n  background: #080f1b;\n  min-height: 100%;\n  font-family: Arial, sans-serif;\n}\n.competition[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: auto;\n  padding: 0 2rem 3rem;\n}\nheader[_ngcontent-%COMP%] {\n  min-height: 86px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.2rem;\n  flex-wrap: wrap;\n}\nheader[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 12px;\n  text-decoration: none;\n  color: #9baec9;\n}\nheader[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  font-size: 9px;\n  letter-spacing: 2px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 500;\n  margin: 6px 0;\n  letter-spacing: -0.3px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: clamp(22px, 2.3vw, 30px);\n  font-weight: 500;\n  letter-spacing: -0.5px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 1.4;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0 0 0.4rem;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  color: #a8b8ce;\n}\na[_ngcontent-%COMP%] {\n  color: #bcd8f8;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.65;\n  color: #c0ccdc;\n}\nmain[_ngcontent-%COMP%] {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\nmain[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0.65rem 1rem;\n  border: 1px solid #465773;\n  border-radius: 4px;\n  background: #152237;\n  color: #e4edf8;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n  margin: 0.2rem 0.4rem 0.2rem 0;\n  transition: background 0.15s;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #213551;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: var(--%NS%broadcast-accent);\n  color: #111a28;\n  border-color: var(--%NS%broadcast-accent);\n  font-weight: 700;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  border-color: var(--%NS%broadcast-accent);\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n[_ngcontent-%COMP%]:is(button, input, textarea, select, a):focus-visible {\n  outline: 2px solid #f1d89b;\n  outline-offset: 3px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #adbed4;\n}\ninput[_ngcontent-%COMP%]:not([type=radio]), \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  display: block;\n  box-sizing: border-box;\n  margin: 0.4rem 0;\n  padding: 0.7rem;\n  font: inherit;\n  border: 1px solid #425672;\n  border-radius: 3px;\n  background: #091322;\n  color: #eaf0f8;\n  max-width: 100%;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 85px;\n  font-size: 15px;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n.error[_ngcontent-%COMP%] {\n  border-left: 4px solid #f1a399;\n  padding: 1rem;\n  background: #361d24;\n  color: #ffd3ce;\n}\n.play[_ngcontent-%COMP%] {\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--%NS%broadcast-secondary);\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.5rem 1.6rem;\n}\n.play[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n}\n.play[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n  max-width: 62ch;\n}\n.play.quiet[_ngcontent-%COMP%] {\n  background: #0c1626;\n  border-top-color: #2b3b54;\n  text-align: center;\n  padding: 1.2rem;\n}\n.play.quiet[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: #b6c6da;\n}\n.play.quiet[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  font-size: 13px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8fa3bd;\n  margin: 0.9rem 0 0;\n  max-width: 62ch;\n}\n.hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c9d7e9;\n}\n.button-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 44px;\n  padding: 0.65rem 1rem;\n  border: 1px solid #465773;\n  border-radius: 4px;\n  background: #152237;\n  color: #e4edf8;\n  font-size: 12px;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.button-link[_ngcontent-%COMP%]:hover {\n  background: #213551;\n}\n.answer[_ngcontent-%COMP%] {\n  margin-bottom: 0.6rem;\n}\n.remaining[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8fa3bd;\n  margin: 0.7rem 0 0;\n}\n.turns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.9rem;\n}\n.turn[_ngcontent-%COMP%] {\n  font-size: 11px;\n  min-height: 36px;\n  padding: 0.4rem 0.8rem;\n  margin: 0;\n}\n.buzzers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.buzzer[_ngcontent-%COMP%] {\n  flex: 1 1 150px;\n  min-height: 64px;\n  font-size: 15px;\n  font-weight: 600;\n  border-color: var(--%NS%broadcast-accent);\n  color: var(--%NS%broadcast-accent);\n  background: #16202f;\n  margin: 0;\n}\n.locked[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  font-size: 12px;\n}\n.lineup[_ngcontent-%COMP%] {\n  border: 1px solid #2b3b54;\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.4rem 1.6rem;\n}\n.lineup[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 1rem 0 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 0.5rem;\n}\n.lineup[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  padding: 0.7rem 0.9rem;\n  background: #0b1524;\n  border-left: 2px solid var(--%NS%broadcast-accent);\n}\n.lineup[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  flex: 1;\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\n.lineup[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n  color: #93a6c0;\n}\n.seed[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #7d92ae;\n  min-width: 16px;\n  font-variant-numeric: tabular-nums;\n}\n.scoreboard[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.scoreboard[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 120px;\n  text-align: center;\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--%NS%broadcast-accent);\n  border-radius: 4px;\n  background: #101c2d;\n  padding: 1rem 0.6rem;\n}\n.scoreboard[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 14px;\n}\n.scoreboard[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 34px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n}\n.scoreboard[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  font-size: 9px;\n}\n.prompt[_ngcontent-%COMP%] {\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--%NS%broadcast-secondary);\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.4rem 1.6rem;\n}\n.prompt[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: clamp(18px, 2vw, 24px);\n  line-height: 1.55;\n  margin: 0;\n}\n.prompt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.8rem 0 0;\n  font-size: 13px;\n}\n.buzz[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%broadcast-accent);\n  font-size: 13px;\n}\n.reveal[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #2b3b54;\n  border-radius: 4px;\n  background: #101c2d;\n  padding: 1rem 1.2rem;\n  margin-bottom: 0.6rem;\n}\n.reveal[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  font-weight: 500;\n}\n.reveal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n}\n.no-answer[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #8fa3bd;\n}\n.verdict[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.verdict-banner[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  border: 1px solid #2b3b54;\n  border-radius: 5px;\n  background: #0c1626;\n}\n.verdict-banner[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  letter-spacing: 3px;\n  font-size: 10px;\n}\n.verdict-banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: clamp(20px, 2.4vw, 30px);\n  font-weight: 500;\n}\n.verdict-banner.good[_ngcontent-%COMP%] {\n  border-color: var(--%NS%broadcast-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #1a1608,\n      #0c1626 70%);\n}\n.verdict-banner.good[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n}\n.champion[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1rem;\n}\n.champion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(34px, 5vw, 48px);\n  color: var(--%NS%broadcast-accent);\n}\n.champion[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  letter-spacing: 3px;\n  font-size: 11px;\n}\napp-teacher-guide[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  padding: 1.2rem 0;\n  border-top: 1px solid #2b2411;\n}\napp-teacher-guide[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]:first-of-type {\n  border-top: 0;\n}\napp-teacher-guide[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #e4cf9e;\n  margin: 0 0 0.6rem;\n}\napp-teacher-guide[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n}\napp-teacher-guide[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #332c17;\n  border-radius: 4px;\n  background: #171308;\n  padding: 0.9rem 1.1rem;\n  margin: 0.6rem 0;\n}\n.mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  padding: 0.8rem;\n  margin: 0.4rem 0;\n  border: 1px solid #332c17;\n  border-radius: 4px;\n  background: #171308;\n}\n.mode[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n}\n.mode[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  line-height: 1.5;\n  font-size: 12px;\n}\ninput[type=radio][_ngcontent-%COMP%] {\n  accent-color: var(--%NS%broadcast-accent);\n  margin-top: 3px;\n}\n.team-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 0.8rem;\n}\n.team-row[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  width: 140px;\n}\n.team-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.4rem 0.8rem;\n  margin: 0.2rem;\n  border-left: 3px solid var(--%NS%broadcast-accent);\n  background: #171308;\n  font-size: 12px;\n}\n.rundown[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0.6rem 0;\n  padding: 0;\n}\n.rundown[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.55rem 0.8rem;\n  color: #b9cbe0;\n  font-size: 13px;\n  border-left: 2px solid #332c17;\n  margin-bottom: 0.3rem;\n}\n.rundown[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  border-left-color: var(--%NS%broadcast-accent);\n  color: #f4ecd8;\n  background: #171308;\n}\n.evidence[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  border-left: 3px solid #5d4f2e;\n  margin: 0.8rem 0 0;\n  padding-left: 1rem;\n  color: #cfdaea;\n}\n.skin-select[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0.4rem 0;\n}\n.skin-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin: 0;\n}\n.fineprint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #96886a;\n  margin: 0.8rem 0 0.4rem;\n}\n.projector[_ngcontent-%COMP%] {\n  max-width: none;\n  padding: 0 1.5rem 1.5rem;\n}\n.projector[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  min-height: 60px;\n}\n.projector[_ngcontent-%COMP%]   main[_ngcontent-%COMP%] {\n  gap: 1rem;\n}\n.projector[_ngcontent-%COMP%]   .scoreboard[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 0.7rem 0.5rem;\n}\n.projector[_ngcontent-%COMP%]   .prompt[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 2.4vw, 32px);\n}\n@media (max-width: 700px) {\n  .competition[_ngcontent-%COMP%] {\n    padding: 0 1rem 2rem;\n  }\n  header[_ngcontent-%COMP%] {\n    min-height: 82px;\n    gap: 8px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .button-link[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 0.5rem 0.7rem;\n  }\n  .play[_ngcontent-%COMP%] {\n    padding: 1.1rem;\n  }\n  .scoreboard[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .scoreboard[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    min-width: 100px;\n    padding: 0.7rem 0.4rem;\n  }\n  .scoreboard[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .team-row[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .lineup[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=competition-show.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompetitionShowComponent, [{
    type: Component,
    args: [{ selector: "app-competition-show", standalone: true, imports: [WorkspaceToolsComponent, FormsModule, RouterLink, CompetitionBracketComponent, TelevisionStageComponent, ShowRailComponent, TeacherGuideComponent, ScoreboardComponent], providers: [BroadcastDirectorService], template: `<div class="competition" [class.projector]="projector()" [style.--broadcast-accent]="theme().palette.accent" [style.--broadcast-secondary]="theme().palette.secondary">\r
  <app-workspace-tools><header>\r
    @if (!projector()) { <a routerLink="/projects">\u2190 Projects</a> }\r
    <div><small>THE FINAL \xB7 CHAMPIONSHIP REHEARSAL</small><h1>{{ show.config.title }}</h1></div>\r
    <div class="header-actions">\r
      @if (projector()) { <button (click)="present()">Leave projector mode</button> } @else {\r
        <a class="button-link" [routerLink]="['/projects', show.config.projectId, 'final-demo']">\u25B6 Preview the final</a>\r
      }\r
    </div>\r
  </header></app-workspace-tools>\r
\r
  @if (show.error()) { <p role="alert" class="error">{{ show.error() }}</p> }\r
\r
  <main #workspace tabindex="-1" [class.on-air]="projector()" [class.cue-running]="director.cue() !== null">\r
\r
    <!-- ============ STAGE \xB7 everyone sees this, nobody operates it ============ -->\r
    <app-show-rail [phase]="show.state().phase" [roundTitle]="show.round().title"\r
      [roundIndex]="show.state().roundIndex" [roundCount]="show.config.rounds.length" [clock]="clock()" />\r
    <app-television-stage [view]="studioView()" [theme]="theme()" [presentation]="projector()" />\r
\r
    @if (show.state().phase === 'champion') {\r
      <section class="champion"><small>THE CHAMPIONSHIP IS DECIDED</small><h2>{{ show.name(show.state().championId!) }}</h2><p>Champions of {{ show.config.title }}</p></section>\r
    }\r
\r
    @if (['setup', 'bracket'].includes(show.state().phase)) {\r
      @if (show.state().matches.length) {\r
        <app-competition-bracket [matches]="show.state().matches" [teams]="show.state().teams" [hybrid]="show.state().mode === 'hybrid'" />\r
      } @else {\r
        <section class="lineup"><h2>The line-up</h2><p>Seeded on qualification points. Every contest starts at zero.</p>\r
          <ol>@for (team of lineup(); track team.id) { <li><span class="seed">{{ $index + 1 }}</span><strong>{{ team.name }}</strong><b>{{ team.qualificationPoints }}</b></li> }</ol>\r
        </section>\r
      }\r
    } @else {\r
      <app-scoreboard [teams]="studioView().teams" [animate]="!director.reducedMotion()" label="Contest scoreboard" />\r
      @if (['open', 'paused', 'locked', 'revealed'].includes(show.state().phase)) {\r
        <section class="prompt" aria-live="polite"><h3>{{ show.round().prompt }}</h3>\r
          @if (show.state().phase === 'paused') { <p>Clock paused. Answers are paused too.</p> }\r
          @if (show.state().phase === 'locked') { <p>Answers are in. Scores on their way.</p> }\r
        </section>\r
      }\r
      @if (show.round().kind === 'buzzer' && show.state().buzzes.length) { <p class="buzz" role="status">First buzz: {{ show.name(show.state().buzzes[0]) }}</p> }\r
      @if (show.state().phase === 'revealed') {\r
        <section class="verdict-banner" [class.good]="topAward() && topAward()!.verdict === 'correct'">\r
          <small>THE SCORES ARE IN</small>\r
          @if (topAward(); as top) {\r
            <strong>{{ top.verdict === 'correct' ? top.name + ' takes ' + top.award + ' points.' : 'No points this time.' }}</strong>\r
          } @else { <strong>Round complete.</strong> }\r
        </section>\r
        <section class="reveal">\r
          @for (response of show.state().responses; track response.teamId) { <article><strong>{{ show.name(response.teamId) }} \xB7 {{ response.points }} points</strong><p>{{ response.text }}</p></article> }\r
          @for (id of show.state().participants; track id) { @if (!answerLocked(id)) { <p class="no-answer">{{ show.name(id) }} \xB7 No answer \xB7 {{ show.round().kind === 'wager' ? -show.state().wagers[id] : 0 }} points</p> } }\r
        </section>\r
      }\r
      @if (show.state().phase === 'results') {\r
        <h3 class="verdict">{{ show.leaders().length > 1 ? 'A tie. One more decision.' : show.name(show.leaders()[0]) + ' leads the field.' }}</h3>\r
      }\r
    }\r
\r
    @if (!projector()) {\r
      <!-- ============ PLAY \xB7 exactly one thing to do right now ============ -->\r
      @if (show.state().phase === 'setup') {\r
        <section class="play"><h2>Ready when you are.</h2><p>{{ show.config.description }}</p>\r
          <button class="primary" [disabled]="show.blocked()" (click)="seed()">Start the championship</button>\r
\r
        </section>\r
      } @else if (show.state().phase === 'ready' && show.round().kind === 'wager') {\r
        <section class="play"><h2>How much will you risk?</h2>\r
          <p>Lock every wager before the prompt appears. A missed or unanswered response loses the wager.</p>\r
          @for (id of show.state().participants; track id) {\r
            <div class="team-row"><strong>{{ show.name(id) }}</strong>\r
              @if (show.state().wagers[id] !== undefined) { <span class="locked">Wager locked \xB7 {{ show.state().wagers[id] }}</span> } @else {\r
                <label>Wager (0\u2013{{ show.state().scores[id] }}) <input type="number" min="0" [max]="show.state().scores[id]" [(ngModel)]="wagers[id]" /></label>\r
                <button [disabled]="show.blocked()" (click)="command({ type: 'wager', teamId: id, points: wagers[id] ?? 0 })">Lock wager</button>\r
              }\r
            </div>\r
          }\r
        </section>\r
      } @else if (show.state().phase === 'open') {\r
        <section class="play">\r
          @if (show.round().kind === 'buzzer' && !show.state().buzzes.length) {\r
            <h2>Buzz in.</h2><p>First team to buzz answers this one.</p>\r
            <div class="buzzers">@for (id of show.state().participants; track id) {\r
              <button class="buzzer" [disabled]="show.blocked()" (click)="command({ type: 'buzz', teamId: id })">{{ show.name(id) }}</button>\r
            }</div>\r
          } @else if (current(); as id) {\r
            <h2>{{ show.name(id) }}, your answer.</h2>\r
            @if (pending().length > 1) {\r
              <div class="turns" role="group" aria-label="Answering team">\r
                @for (other of pending(); track other) {\r
                  <button class="turn" [attr.aria-pressed]="other === id" (click)="answering.set(other)">{{ show.name(other) }}</button>\r
                }\r
              </div>\r
            }\r
            <label class="answer">Team answer <textarea maxlength="6000" [(ngModel)]="drafts[id]" [attr.aria-label]="'Answer for ' + show.name(id)"></textarea></label>\r
            <button class="primary" [disabled]="show.blocked() || !drafts[id]?.trim()" (click)="command({ type: 'answer', teamId: id, text: drafts[id] })">Lock {{ show.name(id) }}'s answer</button>\r
            <p class="remaining">{{ pending().length }} of {{ show.state().participants.length }} still to answer.</p>\r
          } @else {\r
            <h2>Every answer is in.</h2><p>Waiting for the host to close the round.</p>\r
          }\r
        </section>\r
      } @else if (show.state().phase === 'ready') {\r
        <section class="play quiet"><h2>Teams, get ready.</h2>\r
          <p>{{ director.cue() === 'question' ? 'Question reveal in progress. Answer time starts when the reveal finishes.' : 'The prompt appears when the host starts the clock.' }}</p>\r
        </section>\r
      } @else if (show.state().phase === 'paused') {\r
        <section class="play quiet"><h2>Hold on.</h2><p>The clock is paused. Nothing is lost.</p></section>\r
      } @else if (['locked', 'revealed', 'results', 'bracket', 'champion'].includes(show.state().phase)) {\r
        <section class="play quiet"><h2>{{ show.state().phase === 'champion' ? 'That is the championship.' : 'Eyes on the stage.' }}</h2>\r
          <p>{{ show.state().phase === 'bracket' ? 'The host starts the next match.' : show.state().phase === 'champion' ? 'Thanks for playing.' : 'The host is working through the scores.' }}</p>\r
        </section>\r
      }\r
\r
      <!-- ============ GUIDE \xB7 every choice the show offers ============ -->\r
      <app-teacher-guide title="Run the championship" [badge]="waiting()">\r
        @if (show.state().phase === 'setup') {\r
          <section><h3>Championship format</h3>\r
            <fieldset [disabled]="show.blocked()"><legend class="sr-only">Championship format</legend>\r
              @for (option of modes; track option.id) {\r
                <label class="mode"><input type="radio" name="mode" [value]="option.id" [(ngModel)]="mode" />\r
                  <span><strong>{{ option.label }}</strong><small>{{ option.description }}</small></span></label>\r
              }\r
            </fieldset>\r
          </section>\r
          <section><h3>Team line-up</h3>\r
            <p>Qualification points determine seeds. Ties use team ID order. Game scores never become grades.</p>\r
            <fieldset [disabled]="show.blocked()"><legend class="sr-only">Teams</legend>\r
              @for (team of teams; track team.id; let i = $index) {\r
                <div class="team-row"><span class="seed">{{ i + 1 }}</span><label>Team name <input [(ngModel)]="team.name" maxlength="60" /></label>\r
                  <label>Qualification points <input type="number" min="0" [(ngModel)]="team.qualificationPoints" /></label>\r
                  <button [disabled]="teams.length <= 2" (click)="removeTeam(team.id)" [attr.aria-label]="'Remove ' + team.name">Remove</button></div>\r
              }\r
              <button [disabled]="teams.length >= 16" (click)="addTeam()">Add team</button>\r
            </fieldset>\r
          </section>\r
        }\r
\r
        <section><h3>Run sheet</h3><p>Each match uses this round queue. In hybrid mode it also runs once for all finalists.</p>\r
          <ol class="rundown">@for (round of show.config.rounds; track round.id; let i = $index) {\r
            <li [class.active]="i === show.state().roundIndex && show.state().phase !== 'setup'"><strong>{{ round.title }}</strong> \xB7 {{ round.kind }} \xB7 {{ round.seconds }}s \xB7 {{ round.kind === 'wager' ? 'risk up to your score' : round.maxPoints + ' points' }}</li>\r
          }</ol>\r
          <p>Bracket byes advance automatically. Tied contests require a host tiebreak and a recorded reason.</p>\r
        </section>\r
\r
        @if (show.state().phase === 'bracket') {\r
          <section><h3>Start the next match</h3>\r
            <app-competition-bracket [matches]="show.state().matches" [teams]="show.state().teams" [hybrid]="show.state().mode === 'hybrid'"\r
              [canStart]="!show.blocked()" (start)="command({ type: 'start', matchId: $event })" />\r
            @if (show.state().mode !== 'tournament' && show.finalists().length >= 2) {\r
              <p>Finalists: @for (id of show.finalists(); track id) { <span class="team-label">{{ show.name(id) }}</span> }</p>\r
              <button class="primary" [disabled]="show.blocked()" (click)="command({ type: 'start' })">Bring on the championship game show</button>\r
            }\r
            @if (!show.state().matches.length) { <p>All teams go directly to the championship game show.</p> }\r
          </section>\r
        }\r
\r
        @if (!['setup', 'bracket', 'champion'].includes(show.state().phase)) {\r
          <section><h3>Host controls</h3>\r
            <fieldset [disabled]="show.blocked() || director.cue() !== null"><legend class="sr-only">Host controls</legend>\r
              @if (show.state().phase === 'ready') {\r
                <button class="primary" [disabled]="show.round().kind === 'wager' && !allWagersLocked()" (click)="command({ type: 'open' })">Reveal prompt &amp; start clock</button>\r
                @if (show.round().kind === 'wager' && !allWagersLocked()) { <p>Every wager must be locked first.</p> }\r
              }\r
              @if (show.state().phase === 'open') { <button (click)="command({ type: 'pause' })">Pause clock</button><button (click)="command({ type: 'lock' })">Lock all answers</button> }\r
              @if (show.state().phase === 'paused') { <button (click)="command({ type: 'resume' })">Resume clock</button><button (click)="command({ type: 'lock' })">Lock all answers</button> }\r
              @if (show.state().phase === 'locked') {\r
                <p>Review each answer. Points may be corrected until the reveal.</p>\r
                @for (response of show.state().responses; track response.teamId) {\r
                  <article><h4>{{ show.name(response.teamId) }}</h4><p>{{ response.text }}</p>\r
                    @if (show.round().kind === 'wager') {\r
                      <button (click)="command({ type: 'score', teamId: response.teamId, points: show.state().wagers[response.teamId] })">Correct: +{{ show.state().wagers[response.teamId] }}</button>\r
                      <button (click)="command({ type: 'score', teamId: response.teamId, points: -show.state().wagers[response.teamId] })">Miss: \u2212{{ show.state().wagers[response.teamId] }}</button>\r
                    } @else {\r
                      <label>Points (0\u2013{{ show.round().maxPoints }}) <input type="number" min="0" [max]="show.round().maxPoints" [(ngModel)]="awards[response.teamId]" /></label>\r
                      <button (click)="command({ type: 'score', teamId: response.teamId, points: awards[response.teamId] ?? 0 })">Save points</button>\r
                    }\r
                    <p>{{ response.points === null ? 'Needs scoring' : 'Ready to reveal: ' + response.points }}</p>\r
                  </article>\r
                } @empty { <p>No responses. {{ show.round().kind === 'wager' ? 'Every team loses its wager.' : 'No points awarded.' }}</p> }\r
                <button class="primary" [disabled]="!allScored()" (click)="command({ type: 'reveal' })">Reveal answers &amp; scores</button>\r
              }\r
              @if (show.state().phase === 'revealed') { <button class="primary" (click)="command({ type: 'next' })">{{ show.state().roundIndex + 1 === show.config.rounds.length ? 'Show contest results' : 'Cue next round' }}</button> }\r
              @if (show.state().phase === 'results') {\r
                @if (show.leaders().length > 1) { <label>Tiebreak result <textarea [(ngModel)]="tiebreak" placeholder="Run a host-led tiebreak, then record the deciding evidence."></textarea></label> }\r
                @for (id of show.leaders(); track id) { <button class="primary" [disabled]="show.blocked() || (show.leaders().length > 1 && tiebreak.trim().length < 5)" (click)="finish(id)">Confirm {{ show.name(id) }} {{ show.state().contestId === 'championship-show' ? 'as champion' : 'to advance' }}</button> }\r
              }\r
            </fieldset>\r
          </section>\r
        }\r
\r
        <section><h3>Evidence ({{ show.state().evidence.length }})</h3>\r
          <p>Original prompts, team responses, and standards stay together. These are team evidence records; individual mastery still needs teacher review.</p>\r
          <button (click)="exportRecord()">Export rehearsal + evidence</button>\r
          @for (e of show.state().evidence; track e.id) {\r
            <article class="evidence"><small>{{ e.contestId }} \xB7 {{ e.roundId }} \xB7 {{ e.standards.join(' \xB7 ') }}</small>\r
              <h4>{{ show.name(e.teamId) }}</h4><p>{{ e.prompt }}</p><blockquote>{{ e.response }}</blockquote></article>\r
          } @empty { <p>Responses appear here as teams lock their answers.</p> }\r
        </section>\r
\r
        <section><h3>Room &amp; studio</h3>\r
          <button (click)="present()">Projector mode</button>\r
          <button (click)="director.toggleSound()">{{ director.sound() ? 'Sound on' : 'Sound off' }}</button>\r
          <button (click)="director.reducedMotion.set(!director.reducedMotion())">{{ director.reducedMotion() ? 'Camera cuts' : 'Camera moves' }}</button>\r
          <label class="skin-select">Studio skin <select aria-label="Studio skin" [value]="skin()" (change)="changeSkin($event)"><option value="project">{{ show.config.broadcast?.label ?? 'Midnight / Gold' }}</option><option value="polar">Polar / Silver preview</option></select></label>\r
          <p class="fineprint">Local rehearsal \xB7 all teams play from this device. Progress saves in this browser.</p>\r
          <a class="button-link" [routerLink]="['/projects', show.config.projectId, 'final-demo']">\u25B6 Preview the final</a>\r
        </section>\r
      </app-teacher-guide>\r
    }\r
  </main>\r
</div>\r
`, styles: ["/* src/app/templates/competition-show/ui/competition-show.component.scss */\n:host {\n  display: block;\n  color: #e9edf5;\n  background: #080f1b;\n  min-height: 100%;\n  font-family: Arial, sans-serif;\n}\n.competition {\n  max-width: 1180px;\n  margin: auto;\n  padding: 0 2rem 3rem;\n}\nheader {\n  min-height: 86px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.2rem;\n  flex-wrap: wrap;\n}\nheader a {\n  font-size: 12px;\n  text-decoration: none;\n  color: #9baec9;\n}\nheader small {\n  color: var(--broadcast-accent);\n  font-size: 9px;\n  letter-spacing: 2px;\n}\nh1 {\n  font-size: 19px;\n  font-weight: 500;\n  margin: 6px 0;\n  letter-spacing: -0.3px;\n}\nh2 {\n  font-size: clamp(22px, 2.3vw, 30px);\n  font-weight: 500;\n  letter-spacing: -0.5px;\n}\nh3 {\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 1.4;\n}\nh4 {\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0 0 0.4rem;\n}\nsmall {\n  display: block;\n  color: #a8b8ce;\n}\na {\n  color: #bcd8f8;\n}\np {\n  line-height: 1.65;\n  color: #c0ccdc;\n}\nmain {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\nmain:focus {\n  outline: none;\n}\nbutton {\n  min-height: 44px;\n  padding: 0.65rem 1rem;\n  border: 1px solid #465773;\n  border-radius: 4px;\n  background: #152237;\n  color: #e4edf8;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n  margin: 0.2rem 0.4rem 0.2rem 0;\n  transition: background 0.15s;\n}\nbutton:hover:not(:disabled) {\n  background: #213551;\n}\nbutton.primary {\n  background: var(--broadcast-accent);\n  color: #111a28;\n  border-color: var(--broadcast-accent);\n  font-weight: 700;\n}\nbutton[aria-pressed=true] {\n  color: var(--broadcast-accent);\n  border-color: var(--broadcast-accent);\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n:is(button, input, textarea, select, a):focus-visible {\n  outline: 2px solid #f1d89b;\n  outline-offset: 3px;\n}\nlabel {\n  display: block;\n  font-size: 12px;\n  color: #adbed4;\n}\ninput:not([type=radio]),\ntextarea,\nselect {\n  display: block;\n  box-sizing: border-box;\n  margin: 0.4rem 0;\n  padding: 0.7rem;\n  font: inherit;\n  border: 1px solid #425672;\n  border-radius: 3px;\n  background: #091322;\n  color: #eaf0f8;\n  max-width: 100%;\n}\ntextarea {\n  width: 100%;\n  min-height: 85px;\n  font-size: 15px;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n.error {\n  border-left: 4px solid #f1a399;\n  padding: 1rem;\n  background: #361d24;\n  color: #ffd3ce;\n}\n.play {\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--broadcast-secondary);\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.5rem 1.6rem;\n}\n.play h2 {\n  margin: 0 0 0.5rem;\n}\n.play > p {\n  margin: 0 0 1rem;\n  max-width: 62ch;\n}\n.play.quiet {\n  background: #0c1626;\n  border-top-color: #2b3b54;\n  text-align: center;\n  padding: 1.2rem;\n}\n.play.quiet h2 {\n  font-size: 19px;\n  color: #b6c6da;\n}\n.play.quiet p {\n  margin: 0.3rem 0 0;\n  font-size: 13px;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.hint {\n  font-size: 12px;\n  color: #8fa3bd;\n  margin: 0.9rem 0 0;\n  max-width: 62ch;\n}\n.hint strong {\n  color: #c9d7e9;\n}\n.button-link {\n  display: inline-flex;\n  align-items: center;\n  min-height: 44px;\n  padding: 0.65rem 1rem;\n  border: 1px solid #465773;\n  border-radius: 4px;\n  background: #152237;\n  color: #e4edf8;\n  font-size: 12px;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.button-link:hover {\n  background: #213551;\n}\n.answer {\n  margin-bottom: 0.6rem;\n}\n.remaining {\n  font-size: 12px;\n  color: #8fa3bd;\n  margin: 0.7rem 0 0;\n}\n.turns {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.9rem;\n}\n.turn {\n  font-size: 11px;\n  min-height: 36px;\n  padding: 0.4rem 0.8rem;\n  margin: 0;\n}\n.buzzers {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.buzzer {\n  flex: 1 1 150px;\n  min-height: 64px;\n  font-size: 15px;\n  font-weight: 600;\n  border-color: var(--broadcast-accent);\n  color: var(--broadcast-accent);\n  background: #16202f;\n  margin: 0;\n}\n.locked {\n  color: var(--broadcast-accent);\n  font-size: 12px;\n}\n.lineup {\n  border: 1px solid #2b3b54;\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.4rem 1.6rem;\n}\n.lineup ol {\n  list-style: none;\n  margin: 1rem 0 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 0.5rem;\n}\n.lineup li {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  padding: 0.7rem 0.9rem;\n  background: #0b1524;\n  border-left: 2px solid var(--broadcast-accent);\n}\n.lineup strong {\n  flex: 1;\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\n.lineup b {\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n  color: #93a6c0;\n}\n.seed {\n  font-size: 10px;\n  color: #7d92ae;\n  min-width: 16px;\n  font-variant-numeric: tabular-nums;\n}\n.scoreboard {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.scoreboard article {\n  flex: 1;\n  min-width: 120px;\n  text-align: center;\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--broadcast-accent);\n  border-radius: 4px;\n  background: #101c2d;\n  padding: 1rem 0.6rem;\n}\n.scoreboard h3 {\n  margin: 0 0 0.5rem;\n  font-size: 14px;\n}\n.scoreboard strong {\n  font-size: 34px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n}\n.scoreboard small {\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  font-size: 9px;\n}\n.prompt {\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--broadcast-secondary);\n  border-radius: 5px;\n  background: #101c2d;\n  padding: 1.4rem 1.6rem;\n}\n.prompt h3 {\n  font-size: clamp(18px, 2vw, 24px);\n  line-height: 1.55;\n  margin: 0;\n}\n.prompt p {\n  margin: 0.8rem 0 0;\n  font-size: 13px;\n}\n.buzz {\n  margin: 0;\n  color: var(--broadcast-accent);\n  font-size: 13px;\n}\n.reveal article {\n  border: 1px solid #2b3b54;\n  border-radius: 4px;\n  background: #101c2d;\n  padding: 1rem 1.2rem;\n  margin-bottom: 0.6rem;\n}\n.reveal strong {\n  color: var(--broadcast-accent);\n  font-weight: 500;\n}\n.reveal p {\n  margin: 0.5rem 0 0;\n}\n.no-answer {\n  font-size: 13px;\n  color: #8fa3bd;\n}\n.verdict {\n  margin: 0;\n}\n.verdict-banner {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  border: 1px solid #2b3b54;\n  border-radius: 5px;\n  background: #0c1626;\n}\n.verdict-banner small {\n  color: var(--broadcast-accent);\n  letter-spacing: 3px;\n  font-size: 10px;\n}\n.verdict-banner strong {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: clamp(20px, 2.4vw, 30px);\n  font-weight: 500;\n}\n.verdict-banner.good {\n  border-color: var(--broadcast-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #1a1608,\n      #0c1626 70%);\n}\n.verdict-banner.good strong {\n  color: var(--broadcast-accent);\n}\n.champion {\n  text-align: center;\n  padding: 2.5rem 1rem;\n}\n.champion h2 {\n  font-size: clamp(34px, 5vw, 48px);\n  color: var(--broadcast-accent);\n}\n.champion small {\n  letter-spacing: 3px;\n  font-size: 11px;\n}\napp-teacher-guide section {\n  padding: 1.2rem 0;\n  border-top: 1px solid #2b2411;\n}\napp-teacher-guide section:first-of-type {\n  border-top: 0;\n}\napp-teacher-guide h3 {\n  color: #e4cf9e;\n  margin: 0 0 0.6rem;\n}\napp-teacher-guide fieldset {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n}\napp-teacher-guide article {\n  border: 1px solid #332c17;\n  border-radius: 4px;\n  background: #171308;\n  padding: 0.9rem 1.1rem;\n  margin: 0.6rem 0;\n}\n.mode {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  padding: 0.8rem;\n  margin: 0.4rem 0;\n  border: 1px solid #332c17;\n  border-radius: 4px;\n  background: #171308;\n}\n.mode strong {\n  font-size: 13px;\n  font-weight: 500;\n}\n.mode small {\n  margin-top: 6px;\n  line-height: 1.5;\n  font-size: 12px;\n}\ninput[type=radio] {\n  accent-color: var(--broadcast-accent);\n  margin-top: 3px;\n}\n.team-row {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 0.8rem;\n}\n.team-row input[type=number] {\n  width: 140px;\n}\n.team-label {\n  display: inline-block;\n  padding: 0.4rem 0.8rem;\n  margin: 0.2rem;\n  border-left: 3px solid var(--broadcast-accent);\n  background: #171308;\n  font-size: 12px;\n}\n.rundown {\n  list-style: none;\n  margin: 0.6rem 0;\n  padding: 0;\n}\n.rundown li {\n  padding: 0.55rem 0.8rem;\n  color: #b9cbe0;\n  font-size: 13px;\n  border-left: 2px solid #332c17;\n  margin-bottom: 0.3rem;\n}\n.rundown li.active {\n  border-left-color: var(--broadcast-accent);\n  color: #f4ecd8;\n  background: #171308;\n}\n.evidence blockquote {\n  white-space: pre-wrap;\n  border-left: 3px solid #5d4f2e;\n  margin: 0.8rem 0 0;\n  padding-left: 1rem;\n  color: #cfdaea;\n}\n.skin-select {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0.4rem 0;\n}\n.skin-select select {\n  font-size: 11px;\n  margin: 0;\n}\n.fineprint {\n  font-size: 11px;\n  color: #96886a;\n  margin: 0.8rem 0 0.4rem;\n}\n.projector {\n  max-width: none;\n  padding: 0 1.5rem 1.5rem;\n}\n.projector header {\n  min-height: 60px;\n}\n.projector main {\n  gap: 1rem;\n}\n.projector .scoreboard article {\n  padding: 0.7rem 0.5rem;\n}\n.projector .prompt h3 {\n  font-size: clamp(20px, 2.4vw, 32px);\n}\n@media (max-width: 700px) {\n  .competition {\n    padding: 0 1rem 2rem;\n  }\n  header {\n    min-height: 82px;\n    gap: 8px;\n  }\n  h1 {\n    font-size: 17px;\n  }\n  .button-link {\n    font-size: 11px;\n    padding: 0.5rem 0.7rem;\n  }\n  .play {\n    padding: 1.1rem;\n  }\n  .scoreboard {\n    gap: 0.5rem;\n  }\n  .scoreboard article {\n    min-width: 100px;\n    padding: 0.7rem 0.4rem;\n  }\n  .scoreboard strong {\n    font-size: 26px;\n  }\n  .team-row {\n    align-items: flex-start;\n  }\n  .lineup ol {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=competition-show.component.css.map */\n"] }]
  }], () => [], { television: [{ type: ViewChild, args: [forwardRef(() => TelevisionStageComponent), { isSignal: true }] }], workspace: [{ type: ViewChild, args: ["workspace", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompetitionShowComponent, { className: "CompetitionShowComponent", filePath: "src/app/templates/competition-show/ui/competition-show.component.ts", lineNumber: 22 });
})();
export {
  CompetitionShowComponent
};
//# debugId=16837e7a-ea3d-5e33-81fe-bb057551cf0c
//# sourceMappingURL=chunk-B3IUQIGC.js.map
