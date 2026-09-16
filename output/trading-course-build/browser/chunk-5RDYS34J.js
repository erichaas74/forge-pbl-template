import {
  HeistRuntime
} from "./chunk-4M73LSEV.js";
import {
  distance,
  location,
  position,
  verified
} from "./chunk-MCTIEJ4Y.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RangeValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
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
  DestroyRef,
  InjectionToken,
  ViewChild,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
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
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/ui/heist.component.ts
var _c0 = ["mapHost"];
var _c1 = ["detailPanel"];
var _forTrack0 = ($index, $item) => $item.id;
function HeistComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2460 Choose a path");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u2461 Solve three questions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "\u2462 Save the books");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current-step", ctx_r0.guideStep() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("current-step", ctx_r0.guideStep() === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("current-step", ctx_r0.guideStep() === 3);
  }
}
function HeistComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2316 ", ctx_r0.targetSecured() ? "TARGET SECURED" : "RECOVER THE ARCHIVE");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("GATE: ", ctx_r0.gateOpen() ? "OPEN" : "CLOSED");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("EXPOSURE: ", ctx_r0.replay() ? "SEE REPLAY EVENTS" : ctx_r0.engine().exposure.toFixed(1) + " / " + ctx_r0.mission.detectionGrace + " s");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.engine().problems.length ? "PLAN NEEDS EVIDENCE" : "PLAN VERIFIED");
  }
}
function HeistComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.runtime.error());
  }
}
function HeistComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.runtime.storageError());
  }
}
function HeistComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function HeistComponent_For_28_Template_button_click_0_listener() {
      const name_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setTool(name_r3));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.tool() === name_r3);
    \u0275\u0275property("disabled", !ctx_r0.engine().editable && (name_r3 === "Route" || name_r3 === "Measure"));
    \u0275\u0275attribute("aria-pressed", ctx_r0.tool() === name_r3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(name_r3 === "Inspect" ? "\u2316" : name_r3 === "Measure" ? "\u2194" : name_r3 === "Route" ? "\u22EF" : "\u2725");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(name_r3);
  }
}
function HeistComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.security.set(!ctx_r0.security()));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u25C9");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "Patrols");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r0.security());
  }
}
function HeistComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function HeistComponent_Conditional_59_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setTool("Route"));
    });
    \u0275\u0275text(1, "Plan route \u2192");
    \u0275\u0275elementEnd();
  }
}
function HeistComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_60_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.pause());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.paused() ? "Keep going" : "Pause game");
  }
}
function HeistComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Preparing the field map\u2026");
    \u0275\u0275elementEnd();
  }
}
function HeistComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mapError());
  }
}
function HeistComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r0.label(ctx.to), " ");
  }
}
function HeistComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r7 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("danger-event", event_r7.type === "CRISIS" || event_r7.type === "FAILED" || event_r7.type === "DETECTED");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.guided ? ctx_r0.stageLabel() : event_r7.type.replaceAll("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.guided && event_r7.type === "CRISIS_RESOLVED" ? "Your team is on the way again!" : ctx_r0.guided && event_r7.type === "NEAR_MISS" ? "A guard walked nearby. Your team kept going." : event_r7.message);
  }
}
function HeistComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mapWarning());
  }
}
function HeistComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("DEBUG \xB7 location ", ctx_r0.selected(), " \xB7 operation ", ctx_r0.time().toFixed(1), " s \xB7 actions ", ctx_r0.engine().actual.length, " \xB7 events ", ctx_r0.engine().events.length);
  }
}
function HeistComponent_Conditional_78_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_78_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.panel.set("results"));
    });
    \u0275\u0275text(1, "Results");
    \u0275\u0275elementEnd();
  }
}
function HeistComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 33)(1, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_78_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.panel.set("intel"));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_78_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.panel.set("plan"));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, HeistComponent_Conditional_78_Conditional_5_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.guided ? "The story" : "Intelligence");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.guided ? "Your plan" : "Operation plan");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().mode === "SUCCESS" || ctx_r0.engine().mode === "FAILURE" ? 5 : -1);
  }
}
function HeistComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.guided ? "TAKE YOUR TIME \xB7 GAME PAUSED" : "OPERATION INTERRUPTED \xB7 CLOCK PAUSED");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.mission.crisis.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.mission.crisis.description);
  }
}
function HeistComponent_Conditional_80_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r12 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(q_r12.hint);
  }
}
function HeistComponent_Conditional_80_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function HeistComponent_Conditional_80_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.showHint.set(!ctx_r0.showHint()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, HeistComponent_Conditional_80_Conditional_6_Conditional_2_Template, 2, 1, "p", 47);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-expanded", ctx_r0.showHint());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.showHint() ? "Hide hint" : "Show a hint");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showHint() ? 2 : -1);
  }
}
function HeistComponent_Conditional_80_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r12 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", ctx_r0.attempts(q_r12.id), " attempts \xB7 tolerance \xB1", q_r12.tolerance, " ", q_r12.unit);
  }
}
function HeistComponent_Conditional_80_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_80_Conditional_19_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.nextQuestion());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.solvedCount() === ctx_r0.engine().challenges.length ? "Ready to rescue! \u2192" : "Next question \u2192");
  }
}
function HeistComponent_Conditional_80_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, HeistComponent_Conditional_80_Conditional_19_Conditional_0_Template, 2, 1, "button", 48);
    \u0275\u0275elementStart(1, "button", 49);
    \u0275\u0275listener("click", function HeistComponent_Conditional_80_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.panel.set("plan"));
    });
    \u0275\u0275text(2, "\u2190 Back to your plan");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r12 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.guided && ctx_r0.isVerified(q_r12) ? 0 : -1);
  }
}
function HeistComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, HeistComponent_Conditional_80_Conditional_6_Template, 3, 3);
    \u0275\u0275elementStart(7, "form", 40);
    \u0275\u0275listener("ngSubmit", function HeistComponent_Conditional_80_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitMath());
    });
    \u0275\u0275elementStart(8, "label", 41);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 42)(11, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function HeistComponent_Conditional_80_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.answer, $event) || (ctx_r0.answer = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 44);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "p", 45);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, HeistComponent_Conditional_80_Conditional_18_Template, 2, 3, "small");
    \u0275\u0275conditionalCreate(19, HeistComponent_Conditional_80_Conditional_19_Template, 3, 1);
  }
  if (rf & 2) {
    const q_r12 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.guided ? ctx_r0.engine().mode === "CRISIS" ? "ONE LAST MATH QUESTION" : "QUESTION " + ctx_r0.questionNumber() + " OF " + ctx_r0.engine().challenges.length : "MATHEMATICAL EVIDENCE");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(q_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(q_r12.prompt);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.guided ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Your answer (", q_r12.unit, ")");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.answer);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(q_r12.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.guided ? "Check my answer" : "Check calculation");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.feedback());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.guided ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().mode !== "CRISIS" ? 19 : -1);
  }
}
function HeistComponent_Conditional_81_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("You got it! The broken cart holds ", ctx_r0.mission.crisis.challenge.answer, " kg, but the books weigh ", ctx_r0.mission.target.mass, " kg. Choose a way to carry them.");
  }
}
function HeistComponent_Conditional_81_Conditional_0_For_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Holds ", choice_r16.capacity, " kg \xB7 Takes ", choice_r16.delay, " seconds to get ready. ", choice_r16.speedMultiplier < 1 ? "Your team will walk more slowly." : "Then walk at your usual speed.");
  }
}
function HeistComponent_Conditional_81_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function HeistComponent_Conditional_81_Conditional_0_For_4_Template_button_click_0_listener() {
      const choice_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.respond(choice_r16.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, HeistComponent_Conditional_81_Conditional_0_For_4_Conditional_2_Template, 2, 3, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !ctx_r0.isVerified(ctx_r0.mission.crisis.challenge));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r16.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.guided ? 2 : -1);
  }
}
function HeistComponent_Conditional_81_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "How will you help?");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, HeistComponent_Conditional_81_Conditional_0_Conditional_2_Template, 2, 2, "p", 51);
    \u0275\u0275repeaterCreate(3, HeistComponent_Conditional_81_Conditional_0_For_4_Template, 3, 3, "button", 52, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.guided ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.mission.crisis.choices);
  }
}
function HeistComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HeistComponent_Conditional_81_Conditional_0_Template, 5, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.guided || ctx_r0.isVerified(ctx_r0.mission.crisis.challenge) ? 0 : -1);
  }
}
function HeistComponent_Conditional_82_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_82_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setTool("Route"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.guided ? "Back to your adventure \u2192" : "Plan the operation \u2192");
  }
}
function HeistComponent_Conditional_82_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "h3");
    \u0275\u0275text(2, "Field measurement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r18 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", m_r18.cm.toFixed(2), " cm");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Scale: 1 cm = ", ctx_r0.mission.map.metersPerCm, " m. Multiply to find the real distance.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4("(", m_r18.from.x.toFixed(0), ", ", m_r18.from.y.toFixed(0), ") \u2192 (", m_r18.to.x.toFixed(0), ", ", m_r18.to.y.toFixed(0), ")");
  }
}
function HeistComponent_Conditional_82_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.feedback());
  }
}
function HeistComponent_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, HeistComponent_Conditional_82_Conditional_6_Template, 2, 1, "button", 48);
    \u0275\u0275elementStart(7, "div", 54)(8, "h3");
    \u0275\u0275text(9, "Your mission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 55);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, HeistComponent_Conditional_82_Conditional_14_Template, 9, 6, "div", 56);
    \u0275\u0275conditionalCreate(15, HeistComponent_Conditional_82_Conditional_15_Template, 2, 1, "p", 57);
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.guided ? "EXPLORE THE CASTLE" : "FIELD INTELLIGENCE");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.detail().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.detail().description);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().editable ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.mission.briefing);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.mission.history);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = ctx_r0.measurement()) ? 14 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.feedback() ? 15 : -1);
  }
}
function HeistComponent_Conditional_83_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mission.briefing);
  }
}
function HeistComponent_Conditional_83_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_0_For_7_Template_button_click_0_listener() {
      const route_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.chooseRoute(route_r20.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const route_r20 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("chosen", ctx_r0.selectedRoute()?.id === route_r20.id);
    \u0275\u0275attribute("aria-pressed", ctx_r0.selectedRoute()?.id === route_r20.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.selectedRoute()?.id === route_r20.id ? "\u2713 " : "", "", route_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(route_r20.description);
  }
}
function HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.nextQuestion());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.solvedCount() ? "Keep solving \u2192" : "Start the math \u2192");
  }
}
function HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "You\u2019re ready! Watch your team follow your path. The game pauses when they need your help.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 63);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.lock());
    });
    \u0275\u0275text(3, "Start the rescue \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.engine().problems.length > 0 || !ctx_r0.ready() || !!ctx_r0.mapError());
  }
}
function HeistComponent_Conditional_83_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_4_Template, 2, 1, "button", 48)(5, HeistComponent_Conditional_83_Conditional_0_Conditional_8_Conditional_5_Template, 4, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 Your team will pick up the books and take them to ", ctx_r0.label(ctx_r0.mission.extraction), ".");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.solvedCount(), " of ", ctx_r0.engine().challenges.length, " questions solved");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.solvedCount() < ctx_r0.engine().challenges.length ? 4 : 5);
  }
}
function HeistComponent_Conditional_83_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, HeistComponent_Conditional_83_Conditional_0_Conditional_4_Template, 2, 1, "p");
    \u0275\u0275elementStart(5, "div", 58);
    \u0275\u0275repeaterCreate(6, HeistComponent_Conditional_83_Conditional_0_For_7_Template, 5, 6, "button", 59, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, HeistComponent_Conditional_83_Conditional_0_Conditional_8_Template, 6, 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.selectedRoute() ? "YOUR PATH IS READY" : "STEP 1 \xB7 CHOOSE A PATH");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedRoute() ? "A little math, then go!" : "Let\u2019s save the books.");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.selectedRoute() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.mission.guidance.routes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.selectedRoute() ? 8 : -1);
  }
}
function HeistComponent_Conditional_83_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_1_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.pause());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.paused() ? "Keep going" : "Pause game");
  }
}
function HeistComponent_Conditional_83_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "STEP 3 \xB7 SAVE THE BOOKS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Your team is on the way!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Your team follows your chosen path. Watch the map to see where they go next.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, HeistComponent_Conditional_83_Conditional_1_Conditional_6_Template, 2, 1, "button", 48);
    \u0275\u0275elementStart(7, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closePanel());
    });
    \u0275\u0275text(8, "Watch the map \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.engine().mode === "EXECUTING" ? 6 : -1);
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1, "Choose connected locations on the map or below. Finish at the river, and verify each calculation.");
    \u0275\u0275elementEnd();
  }
}
function HeistComponent_Conditional_83_Conditional_2_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r25 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("WAIT ", ctx_r0.engine().plan.waits[$index_r25.toString()], " s");
  }
}
function HeistComponent_Conditional_83_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, HeistComponent_Conditional_83_Conditional_2_For_7_Conditional_3_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r26 = ctx.$implicit;
    const $index_r25 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.label(id_r26));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().plan.waits[$index_r25.toString()] ? 3 : -1);
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_8_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_For_15_Template_button_click_0_listener() {
      const q_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openMath(q_r29));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r29 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.isVerified(q_r29) ? "\u2713" : "\u25CB");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(q_r29.title);
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_8_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const problem_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u25CB ", problem_r30);
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_8_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 73);
    \u0275\u0275text(1, "\u2713 Route, target, capacity, and math ready.");
    \u0275\u0275elementEnd();
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.runtime.send({ type: "undo" }));
    });
    \u0275\u0275text(1, "Undo last waypoint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 66)(3, "input", 67);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.pickup($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 68);
    \u0275\u0275text(6, "Wait at last waypoint (seconds)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 69)(8, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.waitSeconds, $event) || (ctx_r0.waitSeconds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(9, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addWait());
    });
    \u0275\u0275text(10, "Set wait");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Required calculations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 71);
    \u0275\u0275repeaterCreate(14, HeistComponent_Conditional_83_Conditional_2_Conditional_8_For_15_Template, 4, 2, "button", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "h3");
    \u0275\u0275text(17, "Operation readiness");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, HeistComponent_Conditional_83_Conditional_2_Conditional_8_For_19_Template, 2, 1, "p", 72, \u0275\u0275repeaterTrackByIdentity, false, HeistComponent_Conditional_83_Conditional_2_Conditional_8_ForEmpty_20_Template, 2, 0, "p", 73);
    \u0275\u0275elementStart(21, "button", 63);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.lock());
    });
    \u0275\u0275text(22, "Lock plan & execute \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.engine().plan.nodes.length < 2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.engine().plan.pickup);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Secure target at archive (", ctx_r0.mission.target.pickupSeconds, " s)");
    \u0275\u0275advance(4);
    \u0275\u0275property("max", ctx_r0.mission.deadline);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.waitSeconds);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.engine().challenges);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.engine().problems);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.engine().problems.length > 0 || !ctx_r0.ready() || !!ctx_r0.mapError());
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_83_Conditional_2_Conditional_9_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.pause());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.paused() ? "Keep going" : "Pause game");
  }
}
function HeistComponent_Conditional_83_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Watch the team follow your route. The clock pauses for a crisis decision.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, HeistComponent_Conditional_83_Conditional_2_Conditional_9_Conditional_4_Template, 2, 1, "button", 48);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Predicted: ", ctx_r0.clock(ctx_r0.engine().predicted.at(-1)?.end ?? 0), " \xB7 Revised: ", ctx_r0.clock(ctx_r0.engine().actual.at(-1)?.end ?? 0));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.engine().mode === "EXECUTING" ? 4 : -1);
  }
}
function HeistComponent_Conditional_83_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "THE OPERATION BOARD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, HeistComponent_Conditional_83_Conditional_2_Conditional_4_Template, 2, 0, "p", 64);
    \u0275\u0275elementStart(5, "ol", 65);
    \u0275\u0275repeaterCreate(6, HeistComponent_Conditional_83_Conditional_2_For_7_Template, 4, 2, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, HeistComponent_Conditional_83_Conditional_2_Conditional_8_Template, 23, 7)(9, HeistComponent_Conditional_83_Conditional_2_Conditional_9_Template, 5, 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.engine().editable ? "Make every second count." : "The plan is in motion.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().editable ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.engine().plan.nodes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.engine().editable ? 8 : 9);
  }
}
function HeistComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HeistComponent_Conditional_83_Conditional_0_Template, 9, 4)(1, HeistComponent_Conditional_83_Conditional_1_Template, 9, 1)(2, HeistComponent_Conditional_83_Conditional_2_Template, 10, 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.guided && ctx_r0.engine().editable ? 0 : ctx_r0.guided ? 1 : 2);
  }
}
function HeistComponent_Conditional_84_Conditional_0_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_0_For_23_Template_button_click_0_listener() {
      const ctx_r33 = \u0275\u0275restoreView(_r33);
      const event_r35 = ctx_r33.$implicit;
      const $index_r36 = ctx_r33.$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.jump(event_r35.time, $index_r36));
    });
    \u0275\u0275elementStart(1, "time");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r35 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.clock(event_r35.time));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r35.message);
  }
}
function HeistComponent_Conditional_84_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9, "Think about your adventure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Why did you choose to carry the books or fix the wheel?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reset());
    });
    \u0275\u0275text(13, "Play again \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_0_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startReplay());
    });
    \u0275\u0275text(15, "Watch your rescue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "details", 74)(17, "summary");
    \u0275\u0275text(18, "Show rescue details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_0_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.exportEvidence());
    });
    \u0275\u0275text(20, "Save your math work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 75);
    \u0275\u0275repeaterCreate(22, HeistComponent_Conditional_84_Conditional_0_For_23_Template, 5, 2, "button", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.engine().mode === "SUCCESS" ? "YOU DID IT!" : "ANOTHER TRY");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.engine().mode === "SUCCESS" ? "The books are safe!" : "Let\u2019s try that again.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.engine().mode === "SUCCESS" ? "Your team saved the books. You used multiplication, division, and subtraction to help them!" : "Your team did not reach the boat this time. Try another path. You can use the hints as often as you like.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Time used: ", ctx_r0.clock(ctx_r0.engine().time), " of ", ctx_r0.clock(ctx_r0.mission.deadline));
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.engine().events);
  }
}
function HeistComponent_Conditional_84_Conditional_1_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_1_For_32_Template_button_click_0_listener() {
      const ctx_r38 = \u0275\u0275restoreView(_r38);
      const event_r40 = ctx_r38.$implicit;
      const $index_r41 = ctx_r38.$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.jump(event_r40.time, $index_r41));
    });
    \u0275\u0275elementStart(1, "time");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r40 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.clock(event_r40.time));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r40.type.replaceAll("_", " "));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(event_r40.message);
  }
}
function HeistComponent_Conditional_84_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "REPLAY / DEFENSE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dl", 76)(7, "div")(8, "dt");
    \u0275\u0275text(9, "Planned");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "dt");
    \u0275\u0275text(14, "Actual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dd");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "dt");
    \u0275\u0275text(19, "Change");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "button", 50);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_1_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startReplay());
    });
    \u0275\u0275text(23, "View replay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_1_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.exportEvidence());
    });
    \u0275\u0275text(25, "Export mathematical evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "h3");
    \u0275\u0275text(27, "Defend your decisions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, "Which wait or calculation mattered most? Compare the original route timing with the crisis response.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 75);
    \u0275\u0275repeaterCreate(31, HeistComponent_Conditional_84_Conditional_1_For_32_Template, 7, 3, "button", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_84_Conditional_1_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reset());
    });
    \u0275\u0275text(34, "Start a new practice plan");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.engine().mode === "SUCCESS" ? "The archive is safe." : "Review the operation.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.engine().events.at(-1)?.message);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.clock(ctx_r0.engine().predicted.at(-1)?.end ?? 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.clock(ctx_r0.engine().time));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", (ctx_r0.engine().time - (ctx_r0.engine().predicted.at(-1)?.end ?? 0)).toFixed(1), " s");
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r0.engine().events);
  }
}
function HeistComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HeistComponent_Conditional_84_Conditional_0_Template, 24, 5)(1, HeistComponent_Conditional_84_Conditional_1_Template, 35, 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.guided ? 0 : 1);
  }
}
function HeistComponent_Conditional_85_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_85_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.playback.set(!ctx_r0.playback()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 80);
    \u0275\u0275text(3, "Watch from a different moment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 81);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_85_Conditional_3_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r43);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.jump(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.playback() ? "Pause replay" : "Play replay");
    \u0275\u0275advance(3);
    \u0275\u0275property("max", ctx_r0.engine().time)("ngModel", ctx_r0.time());
    \u0275\u0275control();
  }
}
function HeistComponent_Conditional_85_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_85_For_9_Template_button_click_0_listener() {
      const n_r45 = \u0275\u0275restoreView(_r44).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectNode(n_r45.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r45 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r45.name);
  }
}
function HeistComponent_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "footer", 34)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, HeistComponent_Conditional_85_Conditional_3_Template, 5, 3);
    \u0275\u0275elementStart(4, "details", 74)(5, "summary");
    \u0275\u0275text(6, "Explore the map & settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 77);
    \u0275\u0275repeaterCreate(8, HeistComponent_Conditional_85_For_9_Template, 2, 1, "button", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Game speed ");
    \u0275\u0275elementStart(12, "select", 78);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_85_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.speed.set(+$event));
    });
    \u0275\u0275elementStart(13, "option", 79);
    \u0275\u0275text(14, "Slow");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 79);
    \u0275\u0275text(16, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 79);
    \u0275\u0275text(18, "Fast");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "label")(20, "input", 67);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_85_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reducedMotion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275text(21, " Keep the camera still");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.engine().editable ? "No rush! The game timer starts when you start the rescue." : ctx_r0.engine().mode === "CRISIS" ? "The game is paused while you solve the wheel problem." : "You can pause the game at any time.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.replay() ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.mission.locations);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r0.speed());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 8);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.reducedMotion());
    \u0275\u0275control();
  }
}
function HeistComponent_Conditional_86_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.playback.set(!ctx_r0.playback()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.playback() ? "Pause replay" : "Play replay");
  }
}
function HeistComponent_Conditional_86_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.playback.set(!ctx_r0.playback()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.playback() ? "Pause preview" : "Play preview");
  }
}
function HeistComponent_Conditional_86_For_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_For_26_Template_button_click_0_listener() {
      const action_r50 = \u0275\u0275restoreView(_r49).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.jump(action_r50.start));
    });
    \u0275\u0275elementStart(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r50 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r0.engine().editable && !ctx_r0.replay());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.clock(action_r50.start), "\u2013", ctx_r0.clock(action_r50.end));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r50.type === "MOVE" ? ctx_r0.label(action_r50.to) : action_r50.type);
  }
}
function HeistComponent_Conditional_86_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_For_29_Template_button_click_0_listener() {
      const n_r52 = \u0275\u0275restoreView(_r51).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectNode(n_r52.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r52 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r0.selected() === n_r52.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r52.name);
  }
}
function HeistComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "footer", 35)(1, "div", 82)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, HeistComponent_Conditional_86_Conditional_6_Template, 2, 1, "button");
    \u0275\u0275conditionalCreate(7, HeistComponent_Conditional_86_Conditional_7_Template, 2, 1, "button");
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Playback ");
    \u0275\u0275elementStart(10, "select", 83);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_86_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.speed.set(+$event));
    });
    \u0275\u0275elementStart(11, "option", 79);
    \u0275\u0275text(12, "0.5\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 79);
    \u0275\u0275text(14, "1\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 79);
    \u0275\u0275text(16, "2\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 79);
    \u0275\u0275text(18, "4\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 79);
    \u0275\u0275text(20, "8\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 84);
    \u0275\u0275text(22, "Preview operation time in seconds");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 85);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_86_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.jump(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(24, "div", 86);
    \u0275\u0275repeaterCreate(25, HeistComponent_Conditional_86_For_26_Template, 4, 4, "button", 87, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 88);
    \u0275\u0275repeaterCreate(28, HeistComponent_Conditional_86_For_29_Template, 2, 2, "button", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 89)(31, "span");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label")(34, "input", 67);
    \u0275\u0275listener("ngModelChange", function HeistComponent_Conditional_86_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reducedMotion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275text(35, " Reduce camera motion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 90)(37, "button", 91);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.pan(-80, 0));
    });
    \u0275\u0275text(38, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 92);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.pan(0, -80));
    });
    \u0275\u0275text(40, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 93);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.pan(0, 80));
    });
    \u0275\u0275text(42, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 94);
    \u0275\u0275listener("click", function HeistComponent_Conditional_86_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.pan(80, 0));
    });
    \u0275\u0275text(44, "\u2192");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.replay() ? "OPERATION REPLAY" : ctx_r0.engine().editable ? "PREVIEW YOUR TIMING" : "OPERATION TIMELINE");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.clock(ctx_r0.time()), " / ", ctx_r0.clock(ctx_r0.mission.deadline));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.replay() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.engine().editable ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.speed());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 0.5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 8);
    \u0275\u0275advance(4);
    \u0275\u0275property("max", ctx_r0.replay() ? ctx_r0.engine().time : ctx_r0.mission.deadline)("disabled", !ctx_r0.engine().editable && !ctx_r0.replay())("ngModel", ctx_r0.time());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.replay() || !ctx_r0.engine().editable ? ctx_r0.engine().actual : ctx_r0.engine().predicted);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.mission.locations);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.tool() === "Measure" ? "Choose two map points or two location buttons to measure." : "Use the timeline to compare your team and the patrols.");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r0.reducedMotion());
    \u0275\u0275control();
  }
}
var HEIST_MAP_LOADER = new InjectionToken("HEIST_MAP_LOADER", {
  providedIn: "root",
  factory: () => () => import("./chunk-2EZ7FWIF.js")
});
var HeistComponent = class _HeistComponent {
  Math = Math;
  runtime = inject(HeistRuntime);
  mission = this.runtime.mission;
  guided = !!this.mission.guidance;
  engine = computed(() => {
    this.runtime.revision();
    return this.runtime.engine;
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "engine" } : (
    /* istanbul ignore next */
    {}
  )), { equal: () => false }));
  tools = this.guided ? [] : ["Inspect", "Measure", "Route", "Pan"];
  tool = signal(
    "Inspect",
    ...ngDevMode ? [{ debugName: "tool" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    this.mission.entry,
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  detail = computed(
    () => location(this.mission, this.selected()),
    ...ngDevMode ? [{ debugName: "detail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  security = signal(
    true,
    ...ngDevMode ? [{ debugName: "security" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = signal(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapError = signal(
    "",
    ...ngDevMode ? [{ debugName: "mapError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapWarning = signal(
    "",
    ...ngDevMode ? [{ debugName: "mapWarning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drawerOpen = signal(
    this.guided,
    ...ngDevMode ? [{ debugName: "drawerOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewTime = signal(
    0,
    ...ngDevMode ? [{ debugName: "previewTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replay = signal(
    false,
    ...ngDevMode ? [{ debugName: "replay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayEvent = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "replayEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleEvents = computed(() => {
    const cursor = this.replayEvent(), events = this.engine().events;
    return this.replay() && cursor !== void 0 ? events.slice(0, cursor + 1) : events;
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "visibleEvents" } : (
    /* istanbul ignore next */
    {}
  )), { equal: () => false }));
  paused = signal(
    true,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playback = signal(
    !this.guided,
    ...ngDevMode ? [{ debugName: "playback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  measurement = computed(
    () => this.engine().measurement,
    ...ngDevMode ? [{ debugName: "measurement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  measureStart = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "measureStart" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panel = signal(
    this.guided ? "plan" : "intel",
    ...ngDevMode ? [{ debugName: "panel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeChallenge = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "activeChallenge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showHint = signal(
    false,
    ...ngDevMode ? [{ debugName: "showHint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedRoute = computed(
    () => this.mission.guidance?.routes.find((r) => r.nodes.join("|") === this.engine().plan.nodes.join("|")),
    ...ngDevMode ? [{ debugName: "selectedRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  solvedCount = computed(
    () => this.engine().challenges.filter((q) => verified(q, this.engine().plan)).length,
    ...ngDevMode ? [{ debugName: "solvedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  questionNumber = computed(
    () => this.engine().challenges.findIndex((q) => q.id === this.activeChallenge()?.id) + 1,
    ...ngDevMode ? [{ debugName: "questionNumber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guideStep = computed(
    () => !this.engine().editable ? 3 : this.selectedRoute() ? 2 : 1,
    ...ngDevMode ? [{ debugName: "guideStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stageLabel = computed(
    () => this.replay() ? "Replay" : { RECON: "Choose a path", PLANNING: "Make your plan", EXECUTING: this.paused() ? "Game paused" : "Rescue in progress", CRISIS: "Help your team", SUCCESS: "Books saved!", FAILURE: "Try again" }[this.engine().mode],
    ...ngDevMode ? [{ debugName: "stageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  speed = signal(
    4,
    ...ngDevMode ? [{ debugName: "speed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  debug = new URLSearchParams(globalThis.location?.search ?? "").get("heistDebug") === "true";
  compatibility = new URLSearchParams(globalThis.location?.search ?? "").get("heistRenderer") === "canvas";
  answer = null;
  waitSeconds = 0;
  time = computed(
    () => this.engine().editable || this.replay() ? this.previewTime() : this.engine().time,
    ...ngDevMode ? [{ debugName: "time" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gateOpen = computed(
    () => this.time() % this.mission.gate.cycle < this.mission.gate.openSeconds,
    ...ngDevMode ? [{ debugName: "gateOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  targetSecured = computed(
    () => this.visibleEvents().some((e) => e.type === "TARGET_SECURED" && e.time <= this.time()),
    ...ngDevMode ? [{ debugName: "targetSecured" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentAction = computed(
    () => (this.engine().editable ? this.engine().predicted : this.engine().actual).find((a) => a.start <= this.time() && this.time() < a.end),
    ...ngDevMode ? [{ debugName: "currentAction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneStatus = computed(
    () => this.visibleEvents().filter((e) => e.time <= this.time() && ["CRISIS", "CRISIS_RESOLVED", "TARGET_SECURED", "NEAR_MISS", "DETECTED", "FAILED", "EXTRACTED"].includes(e.type) && (this.time() - e.time < 8 || ["CRISIS", "FAILED", "EXTRACTED"].includes(e.type))).at(-1),
    ...ngDevMode ? [{ debugName: "sceneStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  positionLabel = computed(
    () => {
      const p = position(this.mission, this.engine().actual, this.time());
      return `Team coordinates: ${p.x.toFixed(0)}, ${p.y.toFixed(0)}`;
    },
    ...ngDevMode ? [{ debugName: "positionLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapHost;
  detailPanel;
  map;
  loadMap = inject(HEIST_MAP_LOADER);
  disposed = false;
  timer;
  accumulator = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      if (this.timer)
        clearInterval(this.timer);
      this.runtime.checkpoint();
      this.map?.destroy();
    });
  }
  async ngAfterViewInit() {
    if (this.engine().mode === "CRISIS")
      this.openMath(this.mission.crisis.challenge);
    else if (this.engine().mode === "EXECUTING")
      this.panel.set("plan");
    else if (this.engine().mode === "SUCCESS" || this.engine().mode === "FAILURE")
      this.showPanel("results");
    try {
      const { mountHeistMap } = await this.loadMap();
      if (this.disposed)
        return;
      this.map = mountHeistMap(this.mapHost.nativeElement, this.mission, () => ({ revision: this.runtime.revision(), time: this.time(), actions: this.replay() || !this.engine().editable ? this.engine().actual : this.engine().predicted, plan: this.engine().plan, events: this.visibleEvents(), mode: this.engine().mode, response: this.engine().response, selected: this.selected(), security: this.security(), tool: this.tool(), measurement: this.measurement(), measureStart: this.measureStart(), executing: this.engine().mode === "EXECUTING" && !this.replay(), reducedMotion: this.reducedMotion(), cameraLocked: this.drawerOpen() || this.paused(), replay: this.replay() }), (p) => this.mapClick(p), (warning) => {
        this.ready.set(true);
        this.mapWarning.set(warning ?? "");
      }, (message) => this.mapError.set(message), this.compatibility);
    } catch {
      this.mapError.set("The Phaser map could not start. Reload this project in a browser with canvas support.");
    }
    this.timer = setInterval(() => this.tick(), 100);
  }
  tick() {
    if (document.hidden)
      return;
    const e = this.engine();
    if (e.editable && this.playback()) {
      this.previewTime.set((this.previewTime() + this.speed() / 10) % this.mission.deadline);
      return;
    }
    if (this.replay() && this.playback()) {
      this.replayEvent.set(void 0);
      const end = e.time;
      this.previewTime.set(Math.min(end, this.previewTime() + this.speed() / 10));
      if (this.previewTime() >= end)
        this.playback.set(false);
    } else if (e.mode === "EXECUTING" && !this.paused()) {
      this.accumulator += this.speed() / 10;
      if (this.accumulator < 0.1)
        return;
      const delta = Math.floor((this.accumulator + 1e-8) * 10) / 10;
      this.accumulator -= delta;
      this.runtime.advance(Math.min(this.mission.deadline + 1, e.time + delta));
      if (this.engine().mode === "CRISIS") {
        this.openMath(this.mission.crisis.challenge);
        this.paused.set(true);
      }
      if (this.engine().mode === "SUCCESS" || this.engine().mode === "FAILURE") {
        this.showPanel("results");
        this.focusPanel();
      }
    }
  }
  setTool(tool) {
    this.tool.set(this.guided && tool === "Route" ? "Inspect" : tool);
    this.feedback.set("");
    if (tool === "Route") {
      this.runtime.send({ type: "plan" });
      this.showPanel("plan");
      this.playback.set(false);
      this.previewTime.set(0);
    }
    if (tool === "Measure")
      this.measureStart.set(void 0);
  }
  mapClick(p) {
    if (this.tool() === "Measure" && this.engine().editable) {
      const start = this.measureStart();
      if (!start) {
        this.measureStart.set(p);
        this.feedback.set("Choose the second measurement point.");
      } else {
        if (this.runtime.send({ type: "measure", from: start, to: p })) {
          this.measureStart.set(void 0);
          this.openMath(this.engine().measurementChallenge);
        }
      }
      return;
    }
    const nearest = this.mission.locations.find((n) => distance(n, p) < 30);
    if (nearest)
      this.selectNode(nearest.id);
  }
  selectNode(id) {
    this.selected.set(id);
    if (this.engine().mode === "CRISIS") {
      this.openMath(this.mission.crisis.challenge);
      return;
    }
    if (this.tool() === "Route" && this.engine().editable)
      this.runtime.send({ type: "node", id });
    else if (this.tool() === "Measure" && this.engine().editable) {
      this.mapClick(location(this.mission, id));
      return;
    } else {
      this.panel.set("intel");
      if (this.tool() === "Inspect")
        this.map?.focus?.(location(this.mission, id));
    }
    this.focusPanel();
  }
  addWait() {
    this.runtime.send({ type: "wait", index: this.engine().plan.nodes.length - 1, seconds: this.waitSeconds });
  }
  chooseRoute(id) {
    if (this.runtime.send({ type: "route", id })) {
      this.previewTime.set(0);
      this.playback.set(false);
      this.tool.set("Inspect");
      this.activeChallenge.set(void 0);
      this.panel.set("plan");
      this.feedback.set("");
      this.map?.home();
      this.focusPanel();
    }
  }
  nextQuestion() {
    const next = this.engine().challenges.find((q) => !this.isVerified(q));
    if (next)
      this.openMath(next);
    else {
      this.panel.set("plan");
      this.focusPanel();
    }
  }
  pickup(enabled) {
    this.runtime.send({ type: "pickup", enabled });
  }
  openMath(c) {
    this.activeChallenge.set(c);
    this.answer = null;
    this.feedback.set("");
    this.showHint.set(false);
    this.playback.set(false);
    this.panel.set("math");
    this.focusPanel();
  }
  submitMath() {
    const q = this.activeChallenge();
    if (!q || this.answer === null) {
      this.feedback.set("Enter a number before checking.");
      return;
    }
    if (this.runtime.send({ type: "answer", id: q.id, answer: this.answer, unit: q.unit }))
      this.feedback.set(this.isVerified(q) ? this.guided ? "You got it! Your answer is saved." : "Verified. Your mathematical evidence is saved." : `Try again. ${q.hint}`);
    if (this.guided && this.engine().mode === "CRISIS" && this.isVerified(q))
      this.focusPanel();
  }
  isVerified(c) {
    return verified(c, this.engine().plan);
  }
  attempts(id) {
    return this.engine().plan.answers[id]?.length ?? 0;
  }
  lock() {
    if (this.runtime.send({ type: "lock" })) {
      this.replay.set(false);
      this.paused.set(false);
      this.accumulator = 0;
      this.panel.set("plan");
      this.drawerOpen.set(false);
    }
  }
  pause() {
    this.paused.update((v) => !v);
    if (this.paused())
      this.runtime.checkpoint();
  }
  respond(id) {
    if (this.runtime.send({ type: "respond", id })) {
      this.paused.set(false);
      this.panel.set("plan");
      this.drawerOpen.set(false);
      this.feedback.set("");
    }
  }
  startReplay() {
    this.replay.set(true);
    this.replayEvent.set(void 0);
    this.previewTime.set(0);
    this.panel.set("results");
    this.drawerOpen.set(false);
    this.playback.set(false);
    this.map?.home();
  }
  reset() {
    if (this.runtime.send({ type: "reset" })) {
      this.replay.set(false);
      this.paused.set(true);
      this.playback.set(false);
      this.previewTime.set(0);
      this.selected.set(this.mission.entry);
      this.tool.set("Inspect");
      this.panel.set(this.guided ? "plan" : "intel");
      this.activeChallenge.set(void 0);
      this.feedback.set("");
      this.showHint.set(false);
      this.map?.home();
      this.focusPanel();
    }
  }
  zoom(amount) {
    this.map?.zoom(amount);
  }
  pan(x, y) {
    this.map?.pan(x, y);
  }
  overview() {
    this.map?.home();
  }
  showPanel(panel) {
    this.panel.set(this.engine().mode === "CRISIS" ? "math" : panel);
    this.drawerOpen.set(true);
  }
  closePanel() {
    this.drawerOpen.set(false);
  }
  jump(time, eventIndex) {
    if (!this.engine().editable && this.engine().mode !== "EXECUTING" && this.engine().mode !== "CRISIS")
      this.replay.set(true);
    this.replayEvent.set(eventIndex);
    this.playback.set(false);
    this.previewTime.set(time);
  }
  label(id) {
    return location(this.mission, id).name;
  }
  clock(seconds) {
    return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  }
  exportEvidence() {
    const e = this.engine();
    const payload = { schemaVersion: "1.0", projectId: this.mission.projectId, projectVersion: this.mission.projectVersion, mode: "local-practice", plan: e.locked ?? e.plan, calculations: e.plan.answers, measurement: this.measurement(), predicted: e.predicted, actual: e.actual, response: e.response, outcome: e.mode, events: e.events };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.mission.projectId}-evidence.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  focusPanel() {
    this.drawerOpen.set(true);
    setTimeout(() => {
      const panel = this.detailPanel?.nativeElement;
      if (!panel)
        return;
      panel.scrollTop = 0;
      if (this.guided && window.innerWidth <= 760)
        panel.scrollIntoView({ block: "nearest", behavior: this.reducedMotion() ? "instant" : "smooth" });
      panel.focus({ preventScroll: true });
    }, 0);
  }
  static \u0275fac = function HeistComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeistComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeistComponent, selectors: [["app-heist"]], viewQuery: function HeistComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapHost = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.detailPanel = _t.first);
    }
  }, decls: 87, vars: 38, consts: [["mapHost", ""], ["detailPanel", ""], [1, "heist"], [1, "masthead"], ["routerLink", "/projects", 1, "back"], [1, "identity"], [1, "eyebrow"], [1, "mode"], [1, "dot"], [1, "clock"], [1, "status-strip"], ["role", "alert", 1, "notice", "error"], [1, "workspace"], ["aria-label", "Map tools", 1, "tools"], [3, "active", "disabled"], [1, "separator"], ["aria-label", "Zoom in", 3, "click"], ["aria-label", "Zoom out", 3, "click"], [3, "click"], ["aria-label", "Mission map", 1, "map-region"], [1, "map-caption"], [1, "field-objective"], [1, "drawer-controls"], ["aria-controls", "heist-details", 3, "click"], [1, "begin-plan"], ["role", "img", 1, "map-host"], [1, "map-message"], ["role", "alert", 1, "map-message"], [1, "map-foot"], ["role", "status", 1, "scene-event", 3, "danger-event"], ["role", "status", 1, "art-warning"], ["id", "heist-details", "tabindex", "-1", "aria-label", "Mission details", 1, "detail-panel", 3, "hidden"], ["aria-label", "Close mission details", 1, "close-drawer", 3, "click"], ["aria-label", "Mission panels", 1, "panel-nav"], [1, "guided-footer"], [1, "timeline"], [3, "click", "disabled"], [1, "begin-plan", 3, "click"], ["role", "status", 1, "scene-event"], [1, "eyebrow", "danger"], [3, "ngSubmit"], ["for", "heist-answer"], [1, "answer-line"], ["id", "heist-answer", "name", "answer", "type", "number", "step", "any", "required", "", "autocomplete", "off", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "primary"], ["aria-live", "polite", 1, "feedback"], [1, "hint-toggle", 3, "click"], [1, "math-hint"], [1, "primary"], [1, "text-button", 3, "click"], [1, "primary", 3, "click"], ["role", "status", 1, "feedback"], [1, "choice", 3, "disabled"], [1, "choice", 3, "click", "disabled"], [1, "brief"], [1, "history"], [1, "measurement"], ["aria-live", "polite"], ["aria-label", "Choose your rescue path", 1, "route-options"], [1, "route-option", 3, "chosen"], [1, "route-option", 3, "click"], [1, "pickup-note"], ["role", "status", 1, "question-progress"], [1, "primary", "lock", 3, "click", "disabled"], [1, "hint"], [1, "waypoints"], [1, "check"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["for", "heist-wait"], [1, "wait-line"], ["id", "heist-wait", "type", "number", "min", "0", 3, "ngModelChange", "max", "ngModel"], [1, "checks"], [1, "readiness"], [1, "feedback"], [1, "extra-details"], [1, "events"], [1, "results"], ["aria-label", "Map locations", 1, "locations"], ["aria-label", "Game speed", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["for", "guided-replay"], ["id", "guided-replay", "type", "range", "min", "0", "step", "1", 3, "ngModelChange", "max", "ngModel"], [1, "timeline-heading"], ["aria-label", "Playback speed", 3, "ngModelChange", "ngModel"], ["for", "heist-timeline", 1, "sr-only"], ["id", "heist-timeline", "type", "range", "min", "0", "step", "0.1", 3, "ngModelChange", "max", "disabled", "ngModel"], [1, "timeline-actions"], [3, "disabled"], ["aria-label", "Keyboard accessible map locations", 1, "locations"], [1, "preferences"], [1, "pan-controls"], ["aria-label", "Pan left", 3, "click"], ["aria-label", "Pan up", 3, "click"], ["aria-label", "Pan down", 3, "click"], ["aria-label", "Pan right", 3, "click"]], template: function HeistComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 2)(1, "app-workspace-tools")(2, "header", 3)(3, "a", 4);
      \u0275\u0275text(4, "\u2190 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h1");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "span", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementStart(13, "small");
      \u0275\u0275text(14, "Local practice");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 9)(16, "strong");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "small");
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "div", 10);
      \u0275\u0275conditionalCreate(21, HeistComponent_Conditional_21_Template, 6, 6)(22, HeistComponent_Conditional_22_Template, 8, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, HeistComponent_Conditional_23_Template, 2, 1, "p", 11);
      \u0275\u0275conditionalCreate(24, HeistComponent_Conditional_24_Template, 2, 1, "p", 11);
      \u0275\u0275elementStart(25, "div", 12)(26, "nav", 13);
      \u0275\u0275repeaterCreate(27, HeistComponent_For_28_Template, 4, 6, "button", 14, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(29, "div", 15);
      \u0275\u0275conditionalCreate(30, HeistComponent_Conditional_30_Template, 4, 1, "button");
      \u0275\u0275elementStart(31, "button", 16);
      \u0275\u0275listener("click", function HeistComponent_Template_button_click_31_listener() {
        return ctx.zoom(0.25);
      });
      \u0275\u0275elementStart(32, "span");
      \u0275\u0275text(33, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34, "Zoom in");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "button", 17);
      \u0275\u0275listener("click", function HeistComponent_Template_button_click_35_listener() {
        return ctx.zoom(-0.25);
      });
      \u0275\u0275elementStart(36, "span");
      \u0275\u0275text(37, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275text(38, "Zoom out");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 18);
      \u0275\u0275listener("click", function HeistComponent_Template_button_click_39_listener() {
        return ctx.overview();
      });
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "\u229E");
      \u0275\u0275elementEnd();
      \u0275\u0275text(42, "Overview");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "section", 19)(44, "div", 20)(45, "span");
      \u0275\u0275text(46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 21)(50, "span", 6);
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "strong");
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "small");
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 22)(57, "button", 23);
      \u0275\u0275listener("click", function HeistComponent_Template_button_click_57_listener() {
        return ctx.drawerOpen() ? ctx.closePanel() : ctx.showPanel(ctx.engine().mode === "SUCCESS" || ctx.engine().mode === "FAILURE" ? "results" : ctx.engine().editable && !ctx.guided ? "intel" : "plan");
      });
      \u0275\u0275text(58);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(59, HeistComponent_Conditional_59_Template, 2, 0, "button", 24);
      \u0275\u0275conditionalCreate(60, HeistComponent_Conditional_60_Template, 2, 1, "button");
      \u0275\u0275elementEnd();
      \u0275\u0275element(61, "div", 25, 0);
      \u0275\u0275conditionalCreate(63, HeistComponent_Conditional_63_Template, 2, 0, "div", 26);
      \u0275\u0275conditionalCreate(64, HeistComponent_Conditional_64_Template, 2, 1, "div", 27);
      \u0275\u0275elementStart(65, "div", 28)(66, "span");
      \u0275\u0275text(67);
      \u0275\u0275conditionalCreate(68, HeistComponent_Conditional_68_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "span");
      \u0275\u0275text(70);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(71, HeistComponent_Conditional_71_Template, 5, 4, "div", 29);
      \u0275\u0275conditionalCreate(72, HeistComponent_Conditional_72_Template, 2, 1, "p", 30);
      \u0275\u0275conditionalCreate(73, HeistComponent_Conditional_73_Template, 2, 4, "small");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "aside", 31, 1)(76, "button", 32);
      \u0275\u0275listener("click", function HeistComponent_Template_button_click_76_listener() {
        return ctx.closePanel();
      });
      \u0275\u0275text(77, "\xD7");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(78, HeistComponent_Conditional_78_Template, 6, 3, "nav", 33);
      \u0275\u0275conditionalCreate(79, HeistComponent_Conditional_79_Template, 6, 3);
      \u0275\u0275conditionalCreate(80, HeistComponent_Conditional_80_Template, 20, 11);
      \u0275\u0275conditionalCreate(81, HeistComponent_Conditional_81_Template, 1, 1)(82, HeistComponent_Conditional_82_Template, 16, 8)(83, HeistComponent_Conditional_83_Template, 3, 1)(84, HeistComponent_Conditional_84_Template, 2, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(85, HeistComponent_Conditional_85_Template, 22, 7, "footer", 34)(86, HeistComponent_Conditional_86_Template, 45, 16, "footer", 35);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_27_0;
      let tmp_29_0;
      let tmp_35_0;
      \u0275\u0275classProp("guided", ctx.guided);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.guided ? "A CASTLE MATH ADVENTURE" : "A MATHEMATICAL RECOVERY MISSION");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mission.title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.replay() ? "Replay" : ctx.guided ? ctx.stageLabel() : ctx.engine().mode);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.clock(ctx.guided ? ctx.Math.max(0, ctx.mission.deadline - ctx.time()) : ctx.time()));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.guided ? "GAME TIME LEFT" : "LOCKDOWN " + ctx.clock(ctx.mission.deadline));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.guided ? 21 : 22);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.error() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.storageError() ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("drawer-open", ctx.drawerOpen());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tools);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.guided ? 30 : -1);
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate2("", ctx.mission.title.toUpperCase(), " \xB7 ", ctx.tool().toUpperCase());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("1 cm : ", ctx.mission.map.metersPerCm, " m");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.targetSecured() ? "BRING THE BOOKS TO SAFETY" : "FIND THE BOOK ROOM");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.targetSecured() ? ctx.label(ctx.mission.extraction) : ctx.mission.target.name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.guided ? "Your team follows the path you choose." : ctx.mission.target.mass + " kg \xB7 " + ctx.mission.target.capacity + " kg cart");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.drawerOpen());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.drawerOpen() ? "See the map" : ctx.engine().mode === "CRISIS" ? "Help your team" : ctx.guided ? "Your next step" : "Mission briefing", " \u2630");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.engine().editable && !ctx.drawerOpen() ? 59 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.engine().mode === "EXECUTING" ? 60 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.guided ? "Castle route and patrol map. Open Explore the map and settings below for keyboard controls." : "Castle route and patrol map. Use location buttons and timeline below for keyboard control.");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.ready() && !ctx.mapError() ? 63 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mapError() ? 64 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.guided ? ctx.stageLabel() : ctx.currentAction()?.type ?? ctx.engine().mode, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_27_0 = ctx.currentAction()) ? 68 : -1, tmp_27_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.guided ? "GOLD LINE \xB7 YOUR PATH" : "TEAL \xB7 TEAM / RED \xB7 WATCH");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_29_0 = ctx.sceneStatus()) ? 71 : -1, tmp_29_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mapWarning() ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.debug ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !ctx.drawerOpen());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.engine().mode !== "CRISIS" ? 78 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.engine().mode === "CRISIS" ? 79 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_35_0 = ctx.panel() === "math" && !(ctx.guided && ctx.engine().mode === "CRISIS" && ctx.isVerified(ctx.mission.crisis.challenge)) && ctx.activeChallenge()) ? 80 : -1, tmp_35_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.engine().mode === "CRISIS" ? 81 : ctx.panel() === "intel" ? 82 : ctx.panel() === "plan" ? 83 : ctx.panel() === "results" ? 84 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.guided ? 85 : 86);
    }
  }, dependencies: [WorkspaceToolsComponent, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background: #142720;\n  color: #f3ebd8;\n  min-height: 100vh;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.heist[_ngcontent-%COMP%] {\n  max-width: 1800px;\n  margin: auto;\n  padding: 22px 28px;\n}\n.masthead[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  padding: 5px 0 22px;\n}\n.back[_ngcontent-%COMP%] {\n  color: #c5c6ae;\n  text-decoration: none;\n  font-size: 13px;\n}\n.identity[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #d7bc80;\n  font-weight: 700;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  font: 36px Georgia, serif;\n  letter-spacing: -0.7px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 28px/1.15 Georgia, serif;\n  margin: 12px 0;\n  color: #f7edce;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-top: 24px;\n  color: #dbc894;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #cbd0bc;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #aebda9;\n}\n.mode[_ngcontent-%COMP%] {\n  font-size: 12px;\n  letter-spacing: 1px;\n}\n.mode[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 7px;\n  text-align: right;\n  letter-spacing: 0;\n}\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #dac27e;\n  margin-right: 8px;\n}\n.clock[_ngcontent-%COMP%] {\n  border-left: 1px solid #51604a;\n  padding-left: 25px;\n  text-align: right;\n}\n.clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font: 29px monospace;\n}\n.clock[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  letter-spacing: 1px;\n}\n.status-strip[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  border-block: 1px solid #415241;\n  padding: 11px 0;\n  color: #c4c6ac;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 72px minmax(0, 1fr) 310px;\n  gap: 16px;\n  margin-top: 18px;\n  align-items: stretch;\n}\n.tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: transparent;\n  color: #bfc7ae;\n  font-size: 10px;\n  padding: 7px 3px;\n  min-height: 49px;\n}\n.tools[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 23px;\n  line-height: 1;\n  margin-bottom: 5px;\n}\n.tools[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%] {\n  background: #e8d399;\n  color: #29382c;\n}\n.separator[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #415341;\n  margin: 10px;\n}\n.map-region[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #233b32;\n  border: 1px solid #526047;\n  overflow: hidden;\n}\n.map-caption[_ngcontent-%COMP%], \n.map-foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 13px;\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #d0ceb1;\n  background: #1b3028;\n}\n.map-host[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1000/680;\n  position: relative;\n}\n.map-message[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 20% 10%;\n  display: grid;\n  place-content: center;\n  padding: 20px;\n  background: rgba(26, 48, 41, 0.9411764706);\n}\n.map-foot[_ngcontent-%COMP%] {\n  letter-spacing: 0.3px;\n  font-size: 8px;\n}\n.detail-panel[_ngcontent-%COMP%] {\n  padding: 23px;\n  background: #20352b;\n  border: 1px solid #4c5a43;\n  max-height: 690px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #788169 transparent;\n}\n.panel-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-bottom: 18px;\n}\n.panel-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 6px 8px;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 12px;\n  border: 1px solid #61715a;\n  background: #2c4435;\n  color: #eee6ce;\n  border-radius: 4px;\n  padding: 10px 12px;\n  cursor: pointer;\n  min-height: 36px;\n}\nbutton[_ngcontent-%COMP%]:hover:enabled {\n  background: #40593f;\n  border-color: #bfae7a;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \n.detail-panel[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f3d58b;\n  outline-offset: 3px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e6cb89;\n  color: #243628;\n  font-weight: 700;\n  width: 100%;\n  margin: 14px 0;\n  border-color: #e6cb89;\n}\n.primary[_ngcontent-%COMP%]:hover:enabled {\n  background: #f3dfab;\n}\n.text-button[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 20px;\n  background: transparent;\n  border: 0;\n  padding-inline: 0;\n}\n.choice[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  margin-top: 9px;\n  line-height: 1.5;\n}\n.danger[_ngcontent-%COMP%] {\n  color: #f3ac89;\n}\n.brief[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  border-top: 1px solid #4b5b44;\n}\n.history[_ngcontent-%COMP%] {\n  font-size: 11px;\n  opacity: 0.85;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.measurement[_ngcontent-%COMP%] {\n  border: 1px dashed #8fc9b8;\n  padding: 10px;\n  margin-top: 18px;\n}\n.measurement[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 26px Georgia, serif;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #d4d4ba;\n  display: block;\n  margin-top: 12px;\n}\ninput[type=number][_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  background: #13281f;\n  color: #f8eccf;\n  border: 1px solid #79856a;\n  border-radius: 3px;\n  padding: 11px;\n  font: 18px monospace;\n}\ninput[type=checkbox][_ngcontent-%COMP%] {\n  accent-color: #dec68a;\n}\n.answer-line[_ngcontent-%COMP%], \n.wait-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n}\n.answer-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d1bc85;\n}\n.wait-line[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100px;\n}\n.check[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  line-height: 1.5;\n  margin-block: 20px;\n}\n.feedback[_ngcontent-%COMP%] {\n  color: #dfcd98;\n  min-height: 20px;\n}\n.readiness[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin: 7px 0;\n}\n.waypoints[_ngcontent-%COMP%] {\n  padding-left: 22px;\n  font-size: 12px;\n  line-height: 1.6;\n  color: #e1d8bd;\n}\n.waypoints[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 4px;\n}\n.waypoints[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #e8bd7c;\n}\n.checks[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.checks[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.checks[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 9px;\n  color: #e3c683;\n}\n.results[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n}\n.results[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #b7bea5;\n}\n.results[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 7px 0;\n  font: 23px monospace;\n}\n.events[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin-block: 15px;\n}\n.events[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.events[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  color: #e1c887;\n}\n.events[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] {\n  font-family: monospace;\n}\n.timeline[_ngcontent-%COMP%] {\n  margin-left: 88px;\n  padding: 18px 0 0;\n}\n.timeline-heading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.timeline-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.timeline-heading[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin: 0;\n}\nselect[_ngcontent-%COMP%] {\n  color: #ede3c7;\n  background: #2c4435;\n  padding: 5px;\n  border: 1px solid #61715a;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #e2c98a;\n  margin: 16px 0;\n}\n.timeline-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  overflow-x: auto;\n}\n.timeline-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 90px;\n  font-size: 10px;\n  text-align: left;\n}\n.timeline-actions[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-family: monospace;\n  margin-bottom: 5px;\n  color: #d2bc87;\n}\n.locations[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 16px;\n}\n.locations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 10px;\n  background: transparent;\n  min-height: 34px;\n}\n.preferences[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 15px;\n  color: #acb89f;\n  font-size: 10px;\n}\n.preferences[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 10px;\n}\n.pan-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n}\n.pan-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  min-height: 28px;\n}\n.notice[_ngcontent-%COMP%] {\n  padding: 10px;\n  margin: 8px 0;\n  background: #603f30;\n  color: #fff1d2;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  clip-path: inset(50%);\n  overflow: hidden;\n}\n@media (min-width: 1500px) {\n  .workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 72px minmax(0, 1fr) 340px;\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    max-height: 850px;\n  }\n}\n@media (max-width: 1050px) {\n  .heist[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 55px minmax(0, 1fr) 270px;\n    gap: 10px;\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    padding: 16px;\n    max-height: 620px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .timeline[_ngcontent-%COMP%] {\n    margin-left: 65px;\n  }\n  .map-foot[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n@media (max-width: 760px) {\n  .masthead[_ngcontent-%COMP%] {\n    gap: 15px;\n    flex-wrap: wrap;\n  }\n  .back[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .mode[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .clock[_ngcontent-%COMP%] {\n    padding-left: 12px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .status-strip[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    font-size: 9px;\n  }\n  .workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 45px minmax(0, 1fr);\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    grid-column: 2;\n    max-height: 450px;\n  }\n  .tools[_ngcontent-%COMP%] {\n    grid-row: span 2;\n  }\n  .timeline[_ngcontent-%COMP%] {\n    margin-left: 55px;\n  }\n  .timeline-heading[_ngcontent-%COMP%], \n   .preferences[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .map-caption[_ngcontent-%COMP%] {\n    font-size: 8px;\n    padding: 8px;\n  }\n}\n[_nghost-%COMP%] {\n  background: #0e211f;\n}\n.heist[_ngcontent-%COMP%] {\n  max-width: none;\n  padding: 0;\n}\n.masthead[_ngcontent-%COMP%] {\n  height: 74px;\n  padding: 12px 24px;\n  gap: 26px;\n  background: #102522;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 29px;\n  margin-top: 3px;\n}\n.identity[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 2.5px;\n}\n.clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 27px;\n}\n.clock[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8px;\n}\n.status-strip[_ngcontent-%COMP%] {\n  padding: 9px 24px;\n  font-size: 9px;\n  background: #172e29;\n  border-color: #395045;\n}\n.workspace[_ngcontent-%COMP%] {\n  display: block;\n  position: relative;\n  margin: 0;\n  height: max(540px, 100dvh - 265px);\n  overflow: hidden;\n  background: #102421;\n}\n.map-region[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  border: 0;\n  overflow: hidden;\n  background: #102421;\n}\n.map-host[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  aspect-ratio: auto;\n}\n.map-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 15px;\n  left: 90px;\n  right: 24px;\n  padding: 0;\n  background: transparent;\n  color: #e2d4ac;\n  pointer-events: none;\n  text-shadow: 0 1px 5px #000;\n}\n.tools[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  top: 18px;\n  left: 15px;\n  width: 57px;\n  padding: 4px;\n  gap: 2px;\n  border: 1px solid rgba(121, 131, 107, 0.4666666667);\n  background: rgba(16, 37, 34, 0.9215686275);\n  border-radius: 8px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2666666667);\n}\n.tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 42px;\n  padding: 6px 1px;\n  font-size: 8px;\n}\n.tools[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin-bottom: 3px;\n}\n.separator[_ngcontent-%COMP%] {\n  margin: 3px 8px;\n}\n.field-objective[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 44px;\n  left: 92px;\n  display: grid;\n  gap: 7px;\n  padding: 14px 17px;\n  max-width: 320px;\n  background:\n    linear-gradient(\n      100deg,\n      rgba(16, 37, 34, 0.937254902),\n      rgba(16, 37, 34, 0.7882352941));\n  border-left: 2px solid #d3ba7a;\n  pointer-events: none;\n  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.1333333333);\n}\n.field-objective[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 20px Georgia, serif;\n  color: #fff0ca;\n}\n.field-objective[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #d2d2b5;\n}\n.drawer-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  top: 44px;\n  right: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.drawer-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: rgba(16, 37, 34, 0.9294117647);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1333333333);\n}\n.drawer-controls[_ngcontent-%COMP%]   .begin-plan[_ngcontent-%COMP%] {\n  background: #e3c987;\n  color: #183128;\n  font-weight: 700;\n}\n.map-foot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 10px 20px 10px 92px;\n  background: rgba(16, 37, 34, 0.9098039216);\n  color: #d6dcc7;\n  font-size: 9px;\n  pointer-events: none;\n}\n.drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n  margin-right: 340px;\n}\n.detail-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  inset: 0 0 0 auto;\n  width: 340px;\n  max-height: none;\n  padding: 27px 22px;\n  background: #172e29;\n  border: 0;\n  border-left: 1px solid rgba(107, 119, 88, 0.4);\n  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);\n}\n.detail-panel[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.panel-nav[_ngcontent-%COMP%] {\n  padding-right: 14px;\n}\n.close-drawer[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 7px;\n  min-height: 26px;\n  padding: 0 7px;\n  font-size: 20px;\n  border: 0;\n  background: transparent;\n}\n.scene-event[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  bottom: 47px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: min(440px, 70%);\n  padding: 12px 18px;\n  border-left: 3px solid #a2d9b7;\n  background: rgba(16, 37, 34, 0.9411764706);\n  pointer-events: none;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2666666667);\n}\n.scene-event[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #dfd09f;\n  margin-bottom: 5px;\n}\n.scene-event[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.5;\n  color: #d8dfc8;\n}\n.danger-event[_ngcontent-%COMP%] {\n  border-color: #e2a080;\n  background: rgba(61, 41, 35, 0.9607843137);\n}\n.art-warning[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  left: 90px;\n  bottom: 40px;\n  max-width: 350px;\n  background: #3d2923;\n  padding: 10px;\n}\n.timeline[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 12px 24px;\n  background: #102522;\n  border-top: 1px solid #617054;\n}\n.timeline-heading[_ngcontent-%COMP%] {\n  font-size: 9px;\n  gap: 16px;\n}\n.timeline-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 29px;\n  padding: 5px 10px;\n  font-size: 10px;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n.timeline-actions[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.timeline-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 85px;\n  min-height: 30px;\n  padding: 5px 8px;\n  font-size: 9px;\n}\n.timeline-actions[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8px;\n  margin-bottom: 2px;\n}\n.locations[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  gap: 5px;\n}\n.locations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 27px;\n  padding: 4px 9px;\n  font-size: 9px;\n}\n.preferences[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 9px;\n}\n.preferences[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 9px;\n}\n.notice[_ngcontent-%COMP%] {\n  margin: 0;\n}\n@media (min-width: 1600px) {\n  .workspace[_ngcontent-%COMP%] {\n    height: max(660px, 100dvh - 265px);\n  }\n  .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    margin-right: 380px;\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    width: 380px;\n  }\n}\n@media (max-width: 1050px) {\n  .masthead[_ngcontent-%COMP%] {\n    gap: 15px;\n    padding-inline: 16px;\n  }\n  .workspace[_ngcontent-%COMP%] {\n    height: 590px;\n  }\n  .field-objective[_ngcontent-%COMP%] {\n    max-width: 245px;\n  }\n  .field-objective[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .drawer-open[_ngcontent-%COMP%]   .field-objective[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    margin-right: 300px;\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    width: 300px;\n  }\n  .map-foot[_ngcontent-%COMP%] {\n    flex-direction: row;\n    font-size: 8px;\n    padding-left: 78px;\n  }\n  .map-foot[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n    display: none;\n  }\n  .preferences[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .timeline[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n}\n@media (max-width: 760px) {\n  .masthead[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: 83px;\n    gap: 10px;\n  }\n  .back[_ngcontent-%COMP%] {\n    width: auto;\n  }\n  .identity[_ngcontent-%COMP%] {\n    min-width: 160px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .identity[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mode[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .clock[_ngcontent-%COMP%] {\n    padding-left: 8px;\n  }\n  .clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .status-strip[_ngcontent-%COMP%] {\n    padding: 8px 15px;\n    gap: 8px;\n    font-size: 8px;\n  }\n  .workspace[_ngcontent-%COMP%] {\n    height: 580px;\n  }\n  .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n  .detail-panel[_ngcontent-%COMP%] {\n    width: min(340px, 100% - 78px);\n  }\n  .tools[_ngcontent-%COMP%] {\n    left: 9px;\n    width: 51px;\n  }\n  .map-caption[_ngcontent-%COMP%], \n   .field-objective[_ngcontent-%COMP%] {\n    left: 73px;\n  }\n  .field-objective[_ngcontent-%COMP%] {\n    top: 44px;\n    max-width: 225px;\n    padding: 10px;\n  }\n  .field-objective[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .field-objective[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .drawer-controls[_ngcontent-%COMP%] {\n    top: 145px;\n    right: 12px;\n  }\n  .drawer-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .timeline-heading[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .preferences[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .scene-event[_ngcontent-%COMP%] {\n    left: 58%;\n    width: 73%;\n  }\n  .locations[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n}\n/*# sourceMappingURL=heist.component.css.map */', "\n.guided[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.guided[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.guided[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.guided[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n}\n.guided[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.guided[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.guided[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 29px;\n}\n.guided[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.guided[_ngcontent-%COMP%]   .status-strip[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 48px;\n  font-size: 14px;\n  letter-spacing: 0;\n}\n.guided[_ngcontent-%COMP%]   .current-step[_ngcontent-%COMP%] {\n  color: #ffdf90;\n  font-weight: bold;\n}\n.guided[_ngcontent-%COMP%]   .workspace[_ngcontent-%COMP%] {\n  height: max(610px, 100dvh - 235px);\n}\n.guided[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.guided[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  display: none;\n}\n.guided[_ngcontent-%COMP%]   .detail-panel[_ngcontent-%COMP%] {\n  width: 380px;\n  padding: 28px 24px;\n}\n.guided[_ngcontent-%COMP%]   .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n  margin-right: 380px;\n}\n.guided[_ngcontent-%COMP%]   .panel-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.guided[_ngcontent-%COMP%]   .field-objective[_ngcontent-%COMP%] {\n  max-width: 255px;\n}\n.guided[_ngcontent-%COMP%]   .field-objective[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.guided[_ngcontent-%COMP%]   .drawer-open[_ngcontent-%COMP%]   .field-objective[_ngcontent-%COMP%] {\n  display: none;\n}\n.guided[_ngcontent-%COMP%]   .map-foot[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.guided[_ngcontent-%COMP%]   .route-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  margin-block: 20px;\n}\n.guided[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 16px;\n  border-radius: 8px;\n}\n.guided[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.guided[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.guided[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 17px;\n  margin-bottom: 6px;\n}\n.guided[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  color: #d8deca;\n  font-size: 14px;\n}\n.guided[_ngcontent-%COMP%]   .route-option.chosen[_ngcontent-%COMP%] {\n  border: 2px solid #e3c987;\n  background: #334a36;\n}\n.guided[_ngcontent-%COMP%]   .pickup-note[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #bce3c7;\n}\n.guided[_ngcontent-%COMP%]   .question-progress[_ngcontent-%COMP%] {\n  color: #f6dda1;\n  padding-block: 10px;\n  font-size: 16px;\n}\n.guided[_ngcontent-%COMP%]   .math-hint[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #29483b;\n  border-left: 3px solid #e3c987;\n}\n.guided[_ngcontent-%COMP%]   .choice[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: #d8deca;\n  line-height: 1.5;\n}\n.guided[_ngcontent-%COMP%]   .guided-footer[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  background: #102522;\n}\n.guided[_ngcontent-%COMP%]   .guided-footer[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  color: #d4dcc7;\n}\n.guided[_ngcontent-%COMP%]   .extra-details[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.guided[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding-block: 10px;\n  font-size: 14px;\n  color: #e8d399;\n}\n.guided[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f3d58b;\n  outline-offset: 3px;\n}\n.guided[_ngcontent-%COMP%]   .locations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n@media (max-width: 1050px) {\n  .guided[_ngcontent-%COMP%]   .detail-panel[_ngcontent-%COMP%] {\n    width: 340px;\n    padding: 26px 18px;\n  }\n  .guided[_ngcontent-%COMP%]   .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    margin-right: 340px;\n  }\n  .guided[_ngcontent-%COMP%]   .status-strip[_ngcontent-%COMP%] {\n    gap: 20px;\n    font-size: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .guided[_ngcontent-%COMP%]   .workspace[_ngcontent-%COMP%] {\n    height: auto;\n    overflow: visible;\n  }\n  .guided[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    height: 430px;\n  }\n  .guided[_ngcontent-%COMP%]   .drawer-open[_ngcontent-%COMP%]   .map-region[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n  .guided[_ngcontent-%COMP%]   .detail-panel[_ngcontent-%COMP%] {\n    position: relative;\n    width: 100%;\n    max-height: none;\n    box-shadow: none;\n  }\n  .guided[_ngcontent-%COMP%]   .status-strip[_ngcontent-%COMP%] {\n    gap: 12px;\n    justify-content: space-between;\n  }\n  .guided[_ngcontent-%COMP%]   .drawer-controls[_ngcontent-%COMP%] {\n    top: 44px;\n  }\n  .guided[_ngcontent-%COMP%]   .field-objective[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .guided[_ngcontent-%COMP%]   .mode[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=heist-guided.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeistComponent, [{
    type: Component,
    args: [{ selector: "app-heist", imports: [WorkspaceToolsComponent, FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="heist" [class.guided]="guided">\r
  <app-workspace-tools><header class="masthead">\r
    <a routerLink="/projects" class="back">\u2190 Projects</a>\r
    <div class="identity"><span class="eyebrow">{{ guided ? 'A CASTLE MATH ADVENTURE' : 'A MATHEMATICAL RECOVERY MISSION' }}</span><h1>{{ mission.title }}</h1></div>\r
    <div class="mode"><span class="dot"></span>{{ replay() ? 'Replay' : guided ? stageLabel() : engine().mode }}<small>Local practice</small></div>\r
    <div class="clock"><strong>{{ clock(guided ? Math.max(0, mission.deadline - time()) : time()) }}</strong><small>{{ guided ? 'GAME TIME LEFT' : 'LOCKDOWN ' + clock(mission.deadline) }}</small></div>\r
  </header></app-workspace-tools>\r
  <div class="status-strip">\r
    @if (guided) {\r
      <span [class.current-step]="guideStep() === 1">\u2460 Choose a path</span>\r
      <span [class.current-step]="guideStep() === 2">\u2461 Solve three questions</span>\r
      <span [class.current-step]="guideStep() === 3">\u2462 Save the books</span>\r
    } @else {\r
    <span>\u2316 {{ targetSecured() ? 'TARGET SECURED' : 'RECOVER THE ARCHIVE' }}</span>\r
    <span>GATE: {{ gateOpen() ? 'OPEN' : 'CLOSED' }}</span>\r
    <span>EXPOSURE: {{ replay() ? 'SEE REPLAY EVENTS' : engine().exposure.toFixed(1) + ' / ' + mission.detectionGrace + ' s' }}</span>\r
    <span>{{ engine().problems.length ? 'PLAN NEEDS EVIDENCE' : 'PLAN VERIFIED' }}</span>\r
    }\r
  </div>\r
  @if (runtime.error()) { <p class="notice error" role="alert">{{ runtime.error() }}</p> }\r
  @if (runtime.storageError()) { <p class="notice error" role="alert">{{ runtime.storageError() }}</p> }\r
  <div class="workspace" [class.drawer-open]="drawerOpen()">\r
    <nav class="tools" aria-label="Map tools">\r
      @for (name of tools; track name) { <button [class.active]="tool() === name" [attr.aria-pressed]="tool() === name" [disabled]="!engine().editable && (name === 'Route' || name === 'Measure')" (click)="setTool(name)"><span>{{ name === 'Inspect' ? '\u2316' : name === 'Measure' ? '\u2194' : name === 'Route' ? '\u22EF' : '\u2725' }}</span>{{ name }}</button> }\r
      <div class="separator"></div>\r
      @if (!guided) { <button (click)="security.set(!security())" [attr.aria-pressed]="security()"><span>\u25C9</span>Patrols</button> }\r
      <button (click)="zoom(0.25)" aria-label="Zoom in"><span>+</span>Zoom in</button>\r
      <button (click)="zoom(-0.25)" aria-label="Zoom out"><span>\u2212</span>Zoom out</button>\r
      <button (click)="overview()"><span>\u229E</span>Overview</button>\r
    </nav>\r
    <section class="map-region" aria-label="Mission map">\r
      <div class="map-caption"><span>{{ mission.title.toUpperCase() }} \xB7 {{ tool().toUpperCase() }}</span><span>1 cm : {{ mission.map.metersPerCm }} m</span></div>\r
      <div class="field-objective"><span class="eyebrow">{{ targetSecured() ? 'BRING THE BOOKS TO SAFETY' : 'FIND THE BOOK ROOM' }}</span><strong>{{ targetSecured() ? label(mission.extraction) : mission.target.name }}</strong><small>{{ guided ? 'Your team follows the path you choose.' : mission.target.mass + ' kg \xB7 ' + mission.target.capacity + ' kg cart' }}</small></div>\r
      <div class="drawer-controls">\r
        <button [attr.aria-expanded]="drawerOpen()" aria-controls="heist-details" (click)="drawerOpen() ? closePanel() : showPanel(engine().mode === 'SUCCESS' || engine().mode === 'FAILURE' ? 'results' : engine().editable && !guided ? 'intel' : 'plan')">{{ drawerOpen() ? 'See the map' : engine().mode === 'CRISIS' ? 'Help your team' : guided ? 'Your next step' : 'Mission briefing' }} \u2630</button>\r
        @if (engine().editable && !drawerOpen()) { <button class="begin-plan" (click)="setTool('Route')">Plan route \u2192</button> }\r
        @if (engine().mode === 'EXECUTING') { <button (click)="pause()">{{ paused() ? 'Keep going' : 'Pause game' }}</button> }\r
      </div>\r
      <div #mapHost class="map-host" role="img" [attr.aria-label]="guided ? 'Castle route and patrol map. Open Explore the map and settings below for keyboard controls.' : 'Castle route and patrol map. Use location buttons and timeline below for keyboard control.'"></div>\r
      @if (!ready() && !mapError()) { <div class="map-message">Preparing the field map\u2026</div> }\r
      @if (mapError()) { <div class="map-message" role="alert">{{ mapError() }}</div> }\r
      <div class="map-foot"><span>{{ guided ? stageLabel() : currentAction()?.type ?? engine().mode }} @if (currentAction(); as action) { \xB7 {{ label(action.to) }} }</span><span>{{ guided ? 'GOLD LINE \xB7 YOUR PATH' : 'TEAL \xB7 TEAM / RED \xB7 WATCH' }}</span></div>\r
      @if (sceneStatus(); as event) { <div class="scene-event" [class.danger-event]="event.type === 'CRISIS' || event.type === 'FAILED' || event.type === 'DETECTED'" role="status"><b>{{ guided ? stageLabel() : event.type.replaceAll('_', ' ') }}</b><span>{{ guided && event.type === 'CRISIS_RESOLVED' ? 'Your team is on the way again!' : guided && event.type === 'NEAR_MISS' ? 'A guard walked nearby. Your team kept going.' : event.message }}</span></div> }\r
      @if (mapWarning()) { <p class="art-warning" role="status">{{ mapWarning() }}</p> }\r
      @if (debug) { <small>DEBUG \xB7 location {{ selected() }} \xB7 operation {{ time().toFixed(1) }} s \xB7 actions {{ engine().actual.length }} \xB7 events {{ engine().events.length }}</small> }\r
    </section>\r
    <aside #detailPanel id="heist-details" class="detail-panel" [hidden]="!drawerOpen()" tabindex="-1" aria-label="Mission details">\r
      <button class="close-drawer" (click)="closePanel()" aria-label="Close mission details">\xD7</button>\r
      @if (engine().mode !== 'CRISIS') {\r
        <nav class="panel-nav" aria-label="Mission panels">\r
          <button (click)="panel.set('intel')">{{ guided ? 'The story' : 'Intelligence' }}</button><button (click)="panel.set('plan')">{{ guided ? 'Your plan' : 'Operation plan' }}</button>\r
          @if (engine().mode === 'SUCCESS' || engine().mode === 'FAILURE') { <button (click)="panel.set('results')">Results</button> }\r
        </nav>\r
      }\r
      @if (engine().mode === 'CRISIS') {\r
        <span class="eyebrow danger">{{ guided ? 'TAKE YOUR TIME \xB7 GAME PAUSED' : 'OPERATION INTERRUPTED \xB7 CLOCK PAUSED' }}</span><h2>{{ mission.crisis.title }}</h2><p>{{ mission.crisis.description }}</p>\r
      }\r
      @if (panel() === 'math' && !(guided && engine().mode === 'CRISIS' && isVerified(mission.crisis.challenge)) && activeChallenge(); as q) {\r
        <span class="eyebrow">{{ guided ? engine().mode === 'CRISIS' ? 'ONE LAST MATH QUESTION' : 'QUESTION ' + questionNumber() + ' OF ' + engine().challenges.length : 'MATHEMATICAL EVIDENCE' }}</span><h2>{{ q.title }}</h2><p>{{ q.prompt }}</p>\r
        @if (guided) { <button class="hint-toggle" [attr.aria-expanded]="showHint()" (click)="showHint.set(!showHint())">{{ showHint() ? 'Hide hint' : 'Show a hint' }}</button>@if (showHint()) { <p class="math-hint">{{ q.hint }}</p> } }\r
        <form (ngSubmit)="submitMath()">\r
          <label for="heist-answer">Your answer ({{ q.unit }})</label>\r
          <div class="answer-line"><input id="heist-answer" name="answer" type="number" step="any" [(ngModel)]="answer" required autocomplete="off"><span>{{ q.unit }}</span></div>\r
          <button class="primary" type="submit">{{ guided ? 'Check my answer' : 'Check calculation' }}</button>\r
        </form>\r
        <p class="feedback" aria-live="polite">{{ feedback() }}</p>\r
        @if (!guided) { <small>{{ attempts(q.id) }} attempts \xB7 tolerance \xB1{{ q.tolerance }} {{ q.unit }}</small> }\r
        @if (engine().mode !== 'CRISIS') {\r
          @if (guided && isVerified(q)) { <button class="primary" (click)="nextQuestion()">{{ solvedCount() === engine().challenges.length ? 'Ready to rescue! \u2192' : 'Next question \u2192' }}</button> }\r
          <button class="text-button" (click)="panel.set('plan')">\u2190 Back to your plan</button>\r
        }\r
      }\r
      @if (engine().mode === 'CRISIS') {\r
        @if (!guided || isVerified(mission.crisis.challenge)) {\r
          <h3>How will you help?</h3>\r
          @if (guided) { <p class="feedback" role="status">You got it! The broken cart holds {{ mission.crisis.challenge.answer }} kg, but the books weigh {{ mission.target.mass }} kg. Choose a way to carry them.</p> }\r
          @for (choice of mission.crisis.choices; track choice.id) { <button class="choice" [disabled]="!isVerified(mission.crisis.challenge)" (click)="respond(choice.id)">{{ choice.label }}@if (guided) { <small>Holds {{ choice.capacity }} kg \xB7 Takes {{ choice.delay }} seconds to get ready. {{ choice.speedMultiplier < 1 ? 'Your team will walk more slowly.' : 'Then walk at your usual speed.' }}</small> }</button> }\r
        }\r
      } @else if (panel() === 'intel') {\r
        <span class="eyebrow">{{ guided ? 'EXPLORE THE CASTLE' : 'FIELD INTELLIGENCE' }}</span><h2>{{ detail().name }}</h2><p>{{ detail().description }}</p>\r
        @if (engine().editable) { <button class="primary" (click)="setTool('Route')">{{ guided ? 'Back to your adventure \u2192' : 'Plan the operation \u2192' }}</button> }\r
        <div class="brief"><h3>Your mission</h3><p>{{ mission.briefing }}</p><p class="history">{{ mission.history }}</p></div>\r
        @if (measurement(); as m) { <div class="measurement"><h3>Field measurement</h3><strong>{{ m.cm.toFixed(2) }} cm</strong><p>Scale: 1 cm = {{ mission.map.metersPerCm }} m. Multiply to find the real distance.</p><small>({{ m.from.x.toFixed(0) }}, {{ m.from.y.toFixed(0) }}) \u2192 ({{ m.to.x.toFixed(0) }}, {{ m.to.y.toFixed(0) }})</small></div> }\r
        @if (feedback()) { <p aria-live="polite">{{ feedback() }}</p> }\r
      } @else if (panel() === 'plan') {\r
        @if (guided && engine().editable) {\r
          <span class="eyebrow">{{ selectedRoute() ? 'YOUR PATH IS READY' : 'STEP 1 \xB7 CHOOSE A PATH' }}</span>\r
          <h2>{{ selectedRoute() ? 'A little math, then go!' : 'Let\u2019s save the books.' }}</h2>\r
          @if (!selectedRoute()) { <p>{{ mission.briefing }}</p> }\r
          <div class="route-options" aria-label="Choose your rescue path">\r
            @for (route of mission.guidance!.routes; track route.id) {\r
              <button class="route-option" [class.chosen]="selectedRoute()?.id === route.id" [attr.aria-pressed]="selectedRoute()?.id === route.id" (click)="chooseRoute(route.id)"><strong>{{ selectedRoute()?.id === route.id ? '\u2713 ' : '' }}{{ route.label }}</strong><span>{{ route.description }}</span></button>\r
            }\r
          </div>\r
          @if (selectedRoute()) {\r
            <p class="pickup-note">\u2713 Your team will pick up the books and take them to {{ label(mission.extraction) }}.</p>\r
            <div class="question-progress" role="status">{{ solvedCount() }} of {{ engine().challenges.length }} questions solved</div>\r
            @if (solvedCount() < engine().challenges.length) { <button class="primary" (click)="nextQuestion()">{{ solvedCount() ? 'Keep solving \u2192' : 'Start the math \u2192' }}</button> }\r
            @else { <p>You\u2019re ready! Watch your team follow your path. The game pauses when they need your help.</p><button class="primary lock" [disabled]="engine().problems.length > 0 || !ready() || !!mapError()" (click)="lock()">Start the rescue \u2192</button> }\r
          }\r
        } @else if (guided) {\r
          <span class="eyebrow">STEP 3 \xB7 SAVE THE BOOKS</span><h2>Your team is on the way!</h2>\r
          <p>Your team follows your chosen path. Watch the map to see where they go next.</p>\r
          @if (engine().mode === 'EXECUTING') { <button class="primary" (click)="pause()">{{ paused() ? 'Keep going' : 'Pause game' }}</button> }\r
          <button (click)="closePanel()">Watch the map \u2192</button>\r
        } @else {\r
        <span class="eyebrow">THE OPERATION BOARD</span><h2>{{ engine().editable ? 'Make every second count.' : 'The plan is in motion.' }}</h2>\r
        @if (engine().editable) { <p class="hint">Choose connected locations on the map or below. Finish at the river, and verify each calculation.</p> }\r
        <ol class="waypoints">@for (id of engine().plan.nodes; track $index) { <li><span>{{ label(id) }}</span>@if (engine().plan.waits[$index.toString()]) { <small>WAIT {{ engine().plan.waits[$index.toString()] }} s</small> }</li> }</ol>\r
        @if (engine().editable) {\r
          <button (click)="runtime.send({ type: 'undo' })" [disabled]="engine().plan.nodes.length < 2">Undo last waypoint</button>\r
          <label class="check"><input type="checkbox" [ngModel]="engine().plan.pickup" (ngModelChange)="pickup($event)"> Secure target at archive ({{ mission.target.pickupSeconds }} s)</label>\r
          <label for="heist-wait">Wait at last waypoint (seconds)</label><div class="wait-line"><input id="heist-wait" type="number" min="0" [max]="mission.deadline" [(ngModel)]="waitSeconds"><button (click)="addWait()">Set wait</button></div>\r
          <h3>Required calculations</h3>\r
          <div class="checks">@for (q of engine().challenges; track q.id) { <button (click)="openMath(q)"><span>{{ isVerified(q) ? '\u2713' : '\u25CB' }}</span>{{ q.title }}</button> }</div>\r
          <h3>Operation readiness</h3>\r
          @for (problem of engine().problems; track problem) { <p class="readiness">\u25CB {{ problem }}</p> } @empty { <p class="feedback">\u2713 Route, target, capacity, and math ready.</p> }\r
          <button class="primary lock" [disabled]="engine().problems.length > 0 || !ready() || !!mapError()" (click)="lock()">Lock plan & execute \u2192</button>\r
        } @else {\r
          <p>Predicted: {{ clock(engine().predicted.at(-1)?.end ?? 0) }} \xB7 Revised: {{ clock(engine().actual.at(-1)?.end ?? 0) }}</p>\r
          <p>Watch the team follow your route. The clock pauses for a crisis decision.</p>\r
          @if (engine().mode === 'EXECUTING') { <button class="primary" (click)="pause()">{{ paused() ? 'Keep going' : 'Pause game' }}</button> }\r
        }\r
        }\r
      } @else if (panel() === 'results') {\r
        @if (guided) {\r
          <span class="eyebrow">{{ engine().mode === 'SUCCESS' ? 'YOU DID IT!' : 'ANOTHER TRY' }}</span>\r
          <h2>{{ engine().mode === 'SUCCESS' ? 'The books are safe!' : 'Let\u2019s try that again.' }}</h2>\r
          <p>{{ engine().mode === 'SUCCESS' ? 'Your team saved the books. You used multiplication, division, and subtraction to help them!' : 'Your team did not reach the boat this time. Try another path. You can use the hints as often as you like.' }}</p>\r
          <p>Time used: {{ clock(engine().time) }} of {{ clock(mission.deadline) }}</p>\r
          <h3>Think about your adventure</h3><p>Why did you choose to carry the books or fix the wheel?</p>\r
          <button class="primary" (click)="reset()">Play again \u2192</button><button (click)="startReplay()">Watch your rescue</button>\r
          <details class="extra-details"><summary>Show rescue details</summary><button (click)="exportEvidence()">Save your math work</button><div class="events">@for (event of engine().events; track $index) { <button (click)="jump(event.time, $index)"><time>{{ clock(event.time) }}</time><span>{{ event.message }}</span></button> }</div></details>\r
        } @else {\r
        <span class="eyebrow">REPLAY / DEFENSE</span><h2>{{ engine().mode === 'SUCCESS' ? 'The archive is safe.' : 'Review the operation.' }}</h2>\r
        <p>{{ engine().events.at(-1)?.message }}</p>\r
        <dl class="results"><div><dt>Planned</dt><dd>{{ clock(engine().predicted.at(-1)?.end ?? 0) }}</dd></div><div><dt>Actual</dt><dd>{{ clock(engine().time) }}</dd></div><div><dt>Change</dt><dd>{{ (engine().time - (engine().predicted.at(-1)?.end ?? 0)).toFixed(1) }} s</dd></div></dl>\r
        <button class="primary" (click)="startReplay()">View replay</button><button (click)="exportEvidence()">Export mathematical evidence</button>\r
        <h3>Defend your decisions</h3><p>Which wait or calculation mattered most? Compare the original route timing with the crisis response.</p>\r
        <div class="events">@for (event of engine().events; track $index) { <button (click)="jump(event.time, $index)"><time>{{ clock(event.time) }}</time><span><b>{{ event.type.replaceAll('_', ' ') }}</b>{{ event.message }}</span></button> }</div>\r
        <button (click)="reset()">Start a new practice plan</button>\r
        }\r
      }\r
    </aside>\r
  </div>\r
  @if (guided) {\r
    <footer class="guided-footer">\r
      <p>{{ engine().editable ? 'No rush! The game timer starts when you start the rescue.' : engine().mode === 'CRISIS' ? 'The game is paused while you solve the wheel problem.' : 'You can pause the game at any time.' }}</p>\r
      @if (replay()) { <button (click)="playback.set(!playback())">{{ playback() ? 'Pause replay' : 'Play replay' }}</button><label for="guided-replay">Watch from a different moment</label><input id="guided-replay" type="range" min="0" [max]="engine().time" step="1" [ngModel]="time()" (ngModelChange)="jump(+$event)"> }\r
      <details class="extra-details"><summary>Explore the map & settings</summary>\r
        <div class="locations" aria-label="Map locations">@for (n of mission.locations; track n.id) { <button (click)="selectNode(n.id)">{{ n.name }}</button> }</div>\r
        <label>Game speed <select aria-label="Game speed" [ngModel]="speed()" (ngModelChange)="speed.set(+$event)"><option [ngValue]="2">Slow</option><option [ngValue]="4">Normal</option><option [ngValue]="8">Fast</option></select></label>\r
        <label><input type="checkbox" [ngModel]="reducedMotion()" (ngModelChange)="reducedMotion.set($event)"> Keep the camera still</label>\r
      </details>\r
    </footer>\r
  } @else {\r
  <footer class="timeline">\r
    <div class="timeline-heading"><strong>{{ replay() ? 'OPERATION REPLAY' : engine().editable ? 'PREVIEW YOUR TIMING' : 'OPERATION TIMELINE' }}</strong><span>{{ clock(time()) }} / {{ clock(mission.deadline) }}</span>\r
      @if (replay()) { <button (click)="playback.set(!playback())">{{ playback() ? 'Pause replay' : 'Play replay' }}</button> }\r
      @if (engine().editable) { <button (click)="playback.set(!playback())">{{ playback() ? 'Pause preview' : 'Play preview' }}</button> }\r
      <label>Playback <select aria-label="Playback speed" [ngModel]="speed()" (ngModelChange)="speed.set(+$event)"><option [ngValue]="0.5">0.5\xD7</option><option [ngValue]="1">1\xD7</option><option [ngValue]="2">2\xD7</option><option [ngValue]="4">4\xD7</option><option [ngValue]="8">8\xD7</option></select></label>\r
    </div>\r
    <label class="sr-only" for="heist-timeline">Preview operation time in seconds</label><input id="heist-timeline" type="range" min="0" [max]="replay() ? engine().time : mission.deadline" step="0.1" [disabled]="!engine().editable && !replay()" [ngModel]="time()" (ngModelChange)="jump(+$event)">\r
    <div class="timeline-actions">@for (action of (replay() || !engine().editable ? engine().actual : engine().predicted); track action.id) { <button [disabled]="!engine().editable && !replay()" (click)="jump(action.start)"><small>{{ clock(action.start) }}\u2013{{ clock(action.end) }}</small>{{ action.type === 'MOVE' ? label(action.to) : action.type }}</button> }</div>\r
    <div class="locations" aria-label="Keyboard accessible map locations">@for (n of mission.locations; track n.id) { <button (click)="selectNode(n.id)" [attr.aria-pressed]="selected() === n.id">{{ n.name }}</button> }</div>\r
    <div class="preferences"><span>{{ tool() === 'Measure' ? 'Choose two map points or two location buttons to measure.' : 'Use the timeline to compare your team and the patrols.' }}</span><label><input type="checkbox" [ngModel]="reducedMotion()" (ngModelChange)="reducedMotion.set($event)"> Reduce camera motion</label><div class="pan-controls"><button aria-label="Pan left" (click)="pan(-80, 0)">\u2190</button><button aria-label="Pan up" (click)="pan(0, -80)">\u2191</button><button aria-label="Pan down" (click)="pan(0, 80)">\u2193</button><button aria-label="Pan right" (click)="pan(80, 0)">\u2192</button></div></div>\r
  </footer>\r
  }\r
</main>\r
`, styles: ['/* src/app/templates/heist/ui/heist.component.scss */\n:host {\n  display: block;\n  background: #142720;\n  color: #f3ebd8;\n  min-height: 100vh;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.heist {\n  max-width: 1800px;\n  margin: auto;\n  padding: 22px 28px;\n}\n.masthead {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  padding: 5px 0 22px;\n}\n.back {\n  color: #c5c6ae;\n  text-decoration: none;\n  font-size: 13px;\n}\n.identity {\n  flex: 1;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #d7bc80;\n  font-weight: 700;\n}\nh1 {\n  margin: 5px 0 0;\n  font: 36px Georgia, serif;\n  letter-spacing: -0.7px;\n}\nh2 {\n  font: 28px/1.15 Georgia, serif;\n  margin: 12px 0;\n  color: #f7edce;\n}\nh3 {\n  font-size: 12px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-top: 24px;\n  color: #dbc894;\n}\np {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #cbd0bc;\n}\nsmall {\n  font-size: 10px;\n  color: #aebda9;\n}\n.mode {\n  font-size: 12px;\n  letter-spacing: 1px;\n}\n.mode small {\n  display: block;\n  margin-top: 7px;\n  text-align: right;\n  letter-spacing: 0;\n}\n.dot {\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #dac27e;\n  margin-right: 8px;\n}\n.clock {\n  border-left: 1px solid #51604a;\n  padding-left: 25px;\n  text-align: right;\n}\n.clock strong {\n  display: block;\n  font: 29px monospace;\n}\n.clock small {\n  letter-spacing: 1px;\n}\n.status-strip {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  border-block: 1px solid #415241;\n  padding: 11px 0;\n  color: #c4c6ac;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.workspace {\n  display: grid;\n  grid-template-columns: 72px minmax(0, 1fr) 310px;\n  gap: 16px;\n  margin-top: 18px;\n  align-items: stretch;\n}\n.tools {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.tools button {\n  background: transparent;\n  border-color: transparent;\n  color: #bfc7ae;\n  font-size: 10px;\n  padding: 7px 3px;\n  min-height: 49px;\n}\n.tools span {\n  display: block;\n  font-size: 23px;\n  line-height: 1;\n  margin-bottom: 5px;\n}\n.tools .active {\n  background: #e8d399;\n  color: #29382c;\n}\n.separator {\n  height: 1px;\n  background: #415341;\n  margin: 10px;\n}\n.map-region {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #233b32;\n  border: 1px solid #526047;\n  overflow: hidden;\n}\n.map-caption,\n.map-foot {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 13px;\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #d0ceb1;\n  background: #1b3028;\n}\n.map-host {\n  width: 100%;\n  aspect-ratio: 1000/680;\n  position: relative;\n}\n.map-message {\n  position: absolute;\n  inset: 20% 10%;\n  display: grid;\n  place-content: center;\n  padding: 20px;\n  background: rgba(26, 48, 41, 0.9411764706);\n}\n.map-foot {\n  letter-spacing: 0.3px;\n  font-size: 8px;\n}\n.detail-panel {\n  padding: 23px;\n  background: #20352b;\n  border: 1px solid #4c5a43;\n  max-height: 690px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #788169 transparent;\n}\n.panel-nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-bottom: 18px;\n}\n.panel-nav button {\n  font-size: 10px;\n  padding: 6px 8px;\n}\nbutton {\n  font: inherit;\n  font-size: 12px;\n  border: 1px solid #61715a;\n  background: #2c4435;\n  color: #eee6ce;\n  border-radius: 4px;\n  padding: 10px 12px;\n  cursor: pointer;\n  min-height: 36px;\n}\nbutton:hover:enabled {\n  background: #40593f;\n  border-color: #bfae7a;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\nselect:focus-visible,\n.detail-panel:focus-visible {\n  outline: 3px solid #f3d58b;\n  outline-offset: 3px;\n}\n.primary {\n  background: #e6cb89;\n  color: #243628;\n  font-weight: 700;\n  width: 100%;\n  margin: 14px 0;\n  border-color: #e6cb89;\n}\n.primary:hover:enabled {\n  background: #f3dfab;\n}\n.text-button {\n  display: block;\n  margin-top: 20px;\n  background: transparent;\n  border: 0;\n  padding-inline: 0;\n}\n.choice {\n  display: block;\n  width: 100%;\n  text-align: left;\n  margin-top: 9px;\n  line-height: 1.5;\n}\n.danger {\n  color: #f3ac89;\n}\n.brief {\n  margin-top: 24px;\n  border-top: 1px solid #4b5b44;\n}\n.history {\n  font-size: 11px;\n  opacity: 0.85;\n}\n.hint {\n  font-size: 12px;\n}\n.measurement {\n  border: 1px dashed #8fc9b8;\n  padding: 10px;\n  margin-top: 18px;\n}\n.measurement strong {\n  font: 26px Georgia, serif;\n}\nlabel {\n  font-size: 12px;\n  color: #d4d4ba;\n  display: block;\n  margin-top: 12px;\n}\ninput[type=number] {\n  width: 100%;\n  min-width: 0;\n  background: #13281f;\n  color: #f8eccf;\n  border: 1px solid #79856a;\n  border-radius: 3px;\n  padding: 11px;\n  font: 18px monospace;\n}\ninput[type=checkbox] {\n  accent-color: #dec68a;\n}\n.answer-line,\n.wait-line {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n}\n.answer-line span {\n  color: #d1bc85;\n}\n.wait-line input {\n  width: 100px;\n}\n.check {\n  display: flex;\n  gap: 8px;\n  line-height: 1.5;\n  margin-block: 20px;\n}\n.feedback {\n  color: #dfcd98;\n  min-height: 20px;\n}\n.readiness {\n  font-size: 11px;\n  margin: 7px 0;\n}\n.waypoints {\n  padding-left: 22px;\n  font-size: 12px;\n  line-height: 1.6;\n  color: #e1d8bd;\n}\n.waypoints li {\n  padding: 4px;\n}\n.waypoints small {\n  display: block;\n  color: #e8bd7c;\n}\n.checks {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.checks button {\n  text-align: left;\n  font-size: 11px;\n}\n.checks span {\n  margin-right: 9px;\n  color: #e3c683;\n}\n.results {\n  display: flex;\n  gap: 18px;\n}\n.results dt {\n  font-size: 10px;\n  color: #b7bea5;\n}\n.results dd {\n  margin: 7px 0;\n  font: 23px monospace;\n}\n.events {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin-block: 15px;\n}\n.events button {\n  display: flex;\n  gap: 10px;\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.events b {\n  display: block;\n  color: #e1c887;\n}\n.events time {\n  font-family: monospace;\n}\n.timeline {\n  margin-left: 88px;\n  padding: 18px 0 0;\n}\n.timeline-heading {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.timeline-heading strong {\n  flex: 1;\n}\n.timeline-heading label {\n  margin: 0;\n}\nselect {\n  color: #ede3c7;\n  background: #2c4435;\n  padding: 5px;\n  border: 1px solid #61715a;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: #e2c98a;\n  margin: 16px 0;\n}\n.timeline-actions {\n  display: flex;\n  gap: 5px;\n  overflow-x: auto;\n}\n.timeline-actions button {\n  min-width: 90px;\n  font-size: 10px;\n  text-align: left;\n}\n.timeline-actions small {\n  display: block;\n  font-family: monospace;\n  margin-bottom: 5px;\n  color: #d2bc87;\n}\n.locations {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 16px;\n}\n.locations button {\n  font-size: 10px;\n  background: transparent;\n  min-height: 34px;\n}\n.preferences {\n  display: flex;\n  gap: 18px;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 15px;\n  color: #acb89f;\n  font-size: 10px;\n}\n.preferences label {\n  margin: 0;\n  font-size: 10px;\n}\n.pan-controls {\n  display: flex;\n  gap: 3px;\n}\n.pan-controls button {\n  padding: 4px 10px;\n  min-height: 28px;\n}\n.notice {\n  padding: 10px;\n  margin: 8px 0;\n  background: #603f30;\n  color: #fff1d2;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  clip-path: inset(50%);\n  overflow: hidden;\n}\n@media (min-width: 1500px) {\n  .workspace {\n    grid-template-columns: 72px minmax(0, 1fr) 340px;\n  }\n  .detail-panel {\n    max-height: 850px;\n  }\n}\n@media (max-width: 1050px) {\n  .heist {\n    padding: 15px;\n  }\n  .workspace {\n    grid-template-columns: 55px minmax(0, 1fr) 270px;\n    gap: 10px;\n  }\n  .detail-panel {\n    padding: 16px;\n    max-height: 620px;\n  }\n  h1 {\n    font-size: 28px;\n  }\n  .timeline {\n    margin-left: 65px;\n  }\n  .map-foot {\n    flex-direction: column;\n  }\n}\n@media (max-width: 760px) {\n  .masthead {\n    gap: 15px;\n    flex-wrap: wrap;\n  }\n  .back {\n    width: 100%;\n  }\n  .mode {\n    font-size: 10px;\n  }\n  .clock {\n    padding-left: 12px;\n  }\n  h1 {\n    font-size: 25px;\n  }\n  .status-strip {\n    flex-wrap: wrap;\n    font-size: 9px;\n  }\n  .workspace {\n    grid-template-columns: 45px minmax(0, 1fr);\n  }\n  .detail-panel {\n    grid-column: 2;\n    max-height: 450px;\n  }\n  .tools {\n    grid-row: span 2;\n  }\n  .timeline {\n    margin-left: 55px;\n  }\n  .timeline-heading,\n  .preferences {\n    flex-wrap: wrap;\n  }\n  .eyebrow {\n    font-size: 9px;\n  }\n  .map-caption {\n    font-size: 8px;\n    padding: 8px;\n  }\n}\n:host {\n  background: #0e211f;\n}\n.heist {\n  max-width: none;\n  padding: 0;\n}\n.masthead {\n  height: 74px;\n  padding: 12px 24px;\n  gap: 26px;\n  background: #102522;\n}\nh1 {\n  font-size: 29px;\n  margin-top: 3px;\n}\n.identity .eyebrow {\n  font-size: 8px;\n  letter-spacing: 2.5px;\n}\n.clock strong {\n  font-size: 27px;\n}\n.clock small {\n  font-size: 8px;\n}\n.status-strip {\n  padding: 9px 24px;\n  font-size: 9px;\n  background: #172e29;\n  border-color: #395045;\n}\n.workspace {\n  display: block;\n  position: relative;\n  margin: 0;\n  height: max(540px, 100dvh - 265px);\n  overflow: hidden;\n  background: #102421;\n}\n.map-region {\n  display: block;\n  height: 100%;\n  border: 0;\n  overflow: hidden;\n  background: #102421;\n}\n.map-host {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  aspect-ratio: auto;\n}\n.map-caption {\n  position: absolute;\n  z-index: 2;\n  top: 15px;\n  left: 90px;\n  right: 24px;\n  padding: 0;\n  background: transparent;\n  color: #e2d4ac;\n  pointer-events: none;\n  text-shadow: 0 1px 5px #000;\n}\n.tools {\n  position: absolute;\n  z-index: 4;\n  top: 18px;\n  left: 15px;\n  width: 57px;\n  padding: 4px;\n  gap: 2px;\n  border: 1px solid rgba(121, 131, 107, 0.4666666667);\n  background: rgba(16, 37, 34, 0.9215686275);\n  border-radius: 8px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2666666667);\n}\n.tools button {\n  min-height: 42px;\n  padding: 6px 1px;\n  font-size: 8px;\n}\n.tools span {\n  font-size: 20px;\n  margin-bottom: 3px;\n}\n.separator {\n  margin: 3px 8px;\n}\n.field-objective {\n  position: absolute;\n  z-index: 2;\n  top: 44px;\n  left: 92px;\n  display: grid;\n  gap: 7px;\n  padding: 14px 17px;\n  max-width: 320px;\n  background:\n    linear-gradient(\n      100deg,\n      rgba(16, 37, 34, 0.937254902),\n      rgba(16, 37, 34, 0.7882352941));\n  border-left: 2px solid #d3ba7a;\n  pointer-events: none;\n  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.1333333333);\n}\n.field-objective strong {\n  font: 20px Georgia, serif;\n  color: #fff0ca;\n}\n.field-objective small {\n  color: #d2d2b5;\n}\n.drawer-controls {\n  position: absolute;\n  z-index: 4;\n  top: 44px;\n  right: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.drawer-controls button {\n  background: rgba(16, 37, 34, 0.9294117647);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1333333333);\n}\n.drawer-controls .begin-plan {\n  background: #e3c987;\n  color: #183128;\n  font-weight: 700;\n}\n.map-foot {\n  position: absolute;\n  z-index: 2;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 10px 20px 10px 92px;\n  background: rgba(16, 37, 34, 0.9098039216);\n  color: #d6dcc7;\n  font-size: 9px;\n  pointer-events: none;\n}\n.drawer-open .map-region {\n  margin-right: 340px;\n}\n.detail-panel {\n  position: absolute;\n  z-index: 5;\n  inset: 0 0 0 auto;\n  width: 340px;\n  max-height: none;\n  padding: 27px 22px;\n  background: #172e29;\n  border: 0;\n  border-left: 1px solid rgba(107, 119, 88, 0.4);\n  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);\n}\n.detail-panel[hidden] {\n  display: none;\n}\n.panel-nav {\n  padding-right: 14px;\n}\n.close-drawer {\n  position: absolute;\n  top: 6px;\n  right: 7px;\n  min-height: 26px;\n  padding: 0 7px;\n  font-size: 20px;\n  border: 0;\n  background: transparent;\n}\n.scene-event {\n  position: absolute;\n  z-index: 3;\n  bottom: 47px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: min(440px, 70%);\n  padding: 12px 18px;\n  border-left: 3px solid #a2d9b7;\n  background: rgba(16, 37, 34, 0.9411764706);\n  pointer-events: none;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2666666667);\n}\n.scene-event b {\n  display: block;\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #dfd09f;\n  margin-bottom: 5px;\n}\n.scene-event span {\n  font-size: 12px;\n  line-height: 1.5;\n  color: #d8dfc8;\n}\n.danger-event {\n  border-color: #e2a080;\n  background: rgba(61, 41, 35, 0.9607843137);\n}\n.art-warning {\n  position: absolute;\n  z-index: 4;\n  left: 90px;\n  bottom: 40px;\n  max-width: 350px;\n  background: #3d2923;\n  padding: 10px;\n}\n.timeline {\n  margin: 0;\n  padding: 12px 24px;\n  background: #102522;\n  border-top: 1px solid #617054;\n}\n.timeline-heading {\n  font-size: 9px;\n  gap: 16px;\n}\n.timeline-heading button {\n  min-height: 29px;\n  padding: 5px 10px;\n  font-size: 10px;\n}\ninput[type=range] {\n  margin: 8px 0;\n}\n.timeline-actions:empty {\n  display: none;\n}\n.timeline-actions button {\n  min-width: 85px;\n  min-height: 30px;\n  padding: 5px 8px;\n  font-size: 9px;\n}\n.timeline-actions small {\n  font-size: 8px;\n  margin-bottom: 2px;\n}\n.locations {\n  margin-top: 8px;\n  gap: 5px;\n}\n.locations button {\n  min-height: 27px;\n  padding: 4px 9px;\n  font-size: 9px;\n}\n.preferences {\n  margin-top: 8px;\n  font-size: 9px;\n}\n.preferences label {\n  font-size: 9px;\n}\n.notice {\n  margin: 0;\n}\n@media (min-width: 1600px) {\n  .workspace {\n    height: max(660px, 100dvh - 265px);\n  }\n  .drawer-open .map-region {\n    margin-right: 380px;\n  }\n  .detail-panel {\n    width: 380px;\n  }\n}\n@media (max-width: 1050px) {\n  .masthead {\n    gap: 15px;\n    padding-inline: 16px;\n  }\n  .workspace {\n    height: 590px;\n  }\n  .field-objective {\n    max-width: 245px;\n  }\n  .field-objective strong {\n    font-size: 17px;\n  }\n  .drawer-open .field-objective {\n    display: none;\n  }\n  .drawer-open .map-region {\n    margin-right: 300px;\n  }\n  .detail-panel {\n    width: 300px;\n  }\n  .map-foot {\n    flex-direction: row;\n    font-size: 8px;\n    padding-left: 78px;\n  }\n  .map-foot span:last-child {\n    display: none;\n  }\n  .preferences {\n    flex-wrap: wrap;\n  }\n  .timeline {\n    padding: 12px 16px;\n  }\n}\n@media (max-width: 760px) {\n  .masthead {\n    height: auto;\n    min-height: 83px;\n    gap: 10px;\n  }\n  .back {\n    width: auto;\n  }\n  .identity {\n    min-width: 160px;\n  }\n  h1 {\n    font-size: 23px;\n  }\n  .identity .eyebrow {\n    display: none;\n  }\n  .mode {\n    font-size: 9px;\n  }\n  .clock {\n    padding-left: 8px;\n  }\n  .clock strong {\n    font-size: 20px;\n  }\n  .status-strip {\n    padding: 8px 15px;\n    gap: 8px;\n    font-size: 8px;\n  }\n  .workspace {\n    height: 580px;\n  }\n  .drawer-open .map-region {\n    margin-right: 0;\n  }\n  .detail-panel {\n    width: min(340px, 100% - 78px);\n  }\n  .tools {\n    left: 9px;\n    width: 51px;\n  }\n  .map-caption,\n  .field-objective {\n    left: 73px;\n  }\n  .field-objective {\n    top: 44px;\n    max-width: 225px;\n    padding: 10px;\n  }\n  .field-objective strong {\n    font-size: 16px;\n  }\n  .field-objective small {\n    font-size: 8px;\n  }\n  .drawer-controls {\n    top: 145px;\n    right: 12px;\n  }\n  .drawer-controls button {\n    font-size: 10px;\n  }\n  .timeline-heading {\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .preferences > span {\n    display: none;\n  }\n  .scene-event {\n    left: 58%;\n    width: 73%;\n  }\n  .locations {\n    gap: 4px;\n  }\n}\n/*# sourceMappingURL=heist.component.css.map */\n', "/* src/app/templates/heist/ui/heist-guided.scss */\n.guided p,\n.guided label,\n.guided button {\n  font-size: 15px;\n}\n.guided p {\n  line-height: 1.6;\n}\n.guided button {\n  min-height: 44px;\n}\n.guided small {\n  font-size: 12px;\n}\n.guided h2 {\n  font-size: 29px;\n}\n.guided h3 {\n  font-size: 16px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.guided .status-strip {\n  justify-content: center;\n  gap: 48px;\n  font-size: 14px;\n  letter-spacing: 0;\n}\n.guided .current-step {\n  color: #ffdf90;\n  font-weight: bold;\n}\n.guided .workspace {\n  height: max(610px, 100dvh - 235px);\n}\n.guided .tools button {\n  font-size: 10px;\n}\n.guided .separator {\n  display: none;\n}\n.guided .detail-panel {\n  width: 380px;\n  padding: 28px 24px;\n}\n.guided .drawer-open .map-region {\n  margin-right: 380px;\n}\n.guided .panel-nav button {\n  font-size: 13px;\n}\n.guided .field-objective {\n  max-width: 255px;\n}\n.guided .field-objective small {\n  font-size: 12px;\n}\n.guided .drawer-open .field-objective {\n  display: none;\n}\n.guided .map-foot {\n  font-size: 12px;\n}\n.guided .route-options {\n  display: grid;\n  gap: 12px;\n  margin-block: 20px;\n}\n.guided .route-option {\n  text-align: left;\n  padding: 16px;\n  border-radius: 8px;\n}\n.guided .route-option strong,\n.guided .route-option span {\n  display: block;\n}\n.guided .route-option strong {\n  font-size: 17px;\n  margin-bottom: 6px;\n}\n.guided .route-option span {\n  line-height: 1.5;\n  color: #d8deca;\n  font-size: 14px;\n}\n.guided .route-option.chosen {\n  border: 2px solid #e3c987;\n  background: #334a36;\n}\n.guided .pickup-note {\n  font-size: 14px;\n  color: #bce3c7;\n}\n.guided .question-progress {\n  color: #f6dda1;\n  padding-block: 10px;\n  font-size: 16px;\n}\n.guided .math-hint {\n  padding: 12px;\n  background: #29483b;\n  border-left: 3px solid #e3c987;\n}\n.guided .choice small {\n  display: block;\n  margin-top: 6px;\n  color: #d8deca;\n  line-height: 1.5;\n}\n.guided .guided-footer {\n  padding: 12px 24px;\n  background: #102522;\n}\n.guided .guided-footer > p {\n  margin: 0 0 6px;\n  color: #d4dcc7;\n}\n.guided .extra-details {\n  margin-top: 12px;\n}\n.guided summary {\n  cursor: pointer;\n  padding-block: 10px;\n  font-size: 14px;\n  color: #e8d399;\n}\n.guided summary:focus-visible {\n  outline: 3px solid #f3d58b;\n  outline-offset: 3px;\n}\n.guided .locations button {\n  font-size: 14px;\n}\n@media (max-width: 1050px) {\n  .guided .detail-panel {\n    width: 340px;\n    padding: 26px 18px;\n  }\n  .guided .drawer-open .map-region {\n    margin-right: 340px;\n  }\n  .guided .status-strip {\n    gap: 20px;\n    font-size: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .guided .workspace {\n    height: auto;\n    overflow: visible;\n  }\n  .guided .map-region {\n    height: 430px;\n  }\n  .guided .drawer-open .map-region {\n    margin-right: 0;\n  }\n  .guided .detail-panel {\n    position: relative;\n    width: 100%;\n    max-height: none;\n    box-shadow: none;\n  }\n  .guided .status-strip {\n    gap: 12px;\n    justify-content: space-between;\n  }\n  .guided .drawer-controls {\n    top: 44px;\n  }\n  .guided .field-objective {\n    display: none;\n  }\n  .guided .mode {\n    display: none;\n  }\n}\n/*# sourceMappingURL=heist-guided.css.map */\n"] }]
  }], () => [], { mapHost: [{
    type: ViewChild,
    args: ["mapHost", { static: true }]
  }], detailPanel: [{
    type: ViewChild,
    args: ["detailPanel"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeistComponent, { className: "HeistComponent", filePath: "src/app/templates/heist/ui/heist.component.ts", lineNumber: 15 });
})();
export {
  HEIST_MAP_LOADER,
  HeistComponent
};
//# debugId=7fc48b0c-bb12-59ce-8a09-96198fb174b0
//# sourceMappingURL=chunk-5RDYS34J.js.map
