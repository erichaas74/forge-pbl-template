import {
  LeagueLeaderboardComponent
} from "./chunk-3WTQ42MR.js";
import {
  LeagueRuntimeService
} from "./chunk-IKO3FXUM.js";
import "./chunk-EMQ2ALBA.js";
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
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-UW6DFD2Z.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  DecimalPipe
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/live-strategy-league/ui/league-shell.component.ts
var _c0 = (a0) => ["/projects", a0];
var _c1 = (a0) => ["/projects", a0, "final-demo"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.round;
function LeagueShellComponent_Conditional_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function LeagueShellComponent_Conditional_19_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.league.command({ type: "restart" });
      ctx_r1.history.set(false);
      return \u0275\u0275resetView(ctx_r1.controls.set(false));
    });
    \u0275\u0275text(1, "Start fresh practice \u2192");
    \u0275\u0275elementEnd();
  }
}
function LeagueShellComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 8)(1, "p");
    \u0275\u0275text(2, "Practice the teacher\u2019s role. Other teams submit simulated decisions when you lock or close the round.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 4)(4, "button", 37);
    \u0275\u0275listener("click", function LeagueShellComponent_Conditional_19_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: ctx_r1.league.state().pausedSeconds === null ? "pause" : "resume" }));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 37);
    \u0275\u0275listener("click", function LeagueShellComponent_Conditional_19_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "extend" }));
    });
    \u0275\u0275text(7, "+60 seconds");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 37);
    \u0275\u0275listener("click", function LeagueShellComponent_Conditional_19_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "close" }));
    });
    \u0275\u0275text(9, "Close & lock round");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, LeagueShellComponent_Conditional_19_Conditional_10_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.league.state().phase !== "decision-open");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.league.state().pausedSeconds === null ? "Pause timer" : "Resume timer");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.league.state().phase !== "decision-open");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.league.state().phase !== "decision-open");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.league.state().phase === "complete" ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.league.state().phase === "complete" ? "Starting fresh replaces the saved results and history for this practice." : "At the deadline, your last valid saved decision is used. If unaffordable, a feasible practice decision is substituted.");
  }
}
function LeagueShellComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.league.error());
  }
}
function LeagueShellComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const metric_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", metric_r4.unit, "", \u0275\u0275pipeBind2(5, 3, ctx_r1.league.team().state[metric_r4.id], "1.0-2"));
  }
}
function LeagueShellComponent_Conditional_48_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 50);
    \u0275\u0275listener("ngModelChange", function LeagueShellComponent_Conditional_48_For_6_Template_input_ngModelChange_5_listener($event) {
      const decision_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.league.updateValue(decision_r7.id, $event));
    })("blur", function LeagueShellComponent_Conditional_48_For_6_Template_input_blur_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.league.saveDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const decision_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("for", decision_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", decision_r7.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(decision_r7.unit);
    \u0275\u0275advance();
    \u0275\u0275property("id", decision_r7.id)("name", decision_r7.id)("min", decision_r7.min)("max", decision_r7.max)("step", decision_r7.step)("ngModel", ctx_r1.league.draft().values[decision_r7.id]);
    \u0275\u0275control();
  }
}
function LeagueShellComponent_Conditional_48_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.league.validation());
  }
}
function LeagueShellComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 39);
    \u0275\u0275listener("ngSubmit", function LeagueShellComponent_Conditional_48_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.lock());
    });
    \u0275\u0275elementStart(1, "fieldset", 40)(2, "legend");
    \u0275\u0275text(3, "Your strategy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 41);
    \u0275\u0275repeaterCreate(5, LeagueShellComponent_Conditional_48_For_6_Template, 6, 9, "div", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 42)(8, "span");
    \u0275\u0275text(9, "Projected cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 43)(14, "div")(15, "label", 44);
    \u0275\u0275text(16, "Predicted points ");
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 45);
    \u0275\u0275listener("ngModelChange", function LeagueShellComponent_Conditional_48_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.updatePrediction($event));
    })("blur", function LeagueShellComponent_Conditional_48_Template_input_blur_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.saveDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "label", 46);
    \u0275\u0275text(22, "Why this strategy? ");
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "textarea", 47);
    \u0275\u0275listener("ngModelChange", function LeagueShellComponent_Conditional_48_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.updateNote($event));
    })("blur", function LeagueShellComponent_Conditional_48_Template_textarea_blur_25_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.saveDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(26, LeagueShellComponent_Conditional_48_Conditional_26_Template, 2, 1, "p", 9);
    \u0275\u0275elementStart(27, "p", 48);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.league.editable());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.league.config.decisions);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 6, ctx_r1.league.cost(), "1.0-2"));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngModel", ctx_r1.league.draft().prediction);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r1.league.draft().reasoning);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.league.validation() && ctx_r1.league.editable() ? 26 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.league.team().decision.lockedAt !== void 0 ? "\u2713 Decision locked." : ctx_r1.league.state().phase === "preview" ? "Open the round to begin." : "Lock your decision when ready. It is final for this round.");
  }
}
function LeagueShellComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 15);
    \u0275\u0275text(2, "LEAGUE COMPLETE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.teamName(ctx_r1.league.ranking()[0].id), " wins the league.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(7, 3, ctx_r1.league.ranking()[0].score, "1.0-2"), " points across ", ctx_r1.league.config.rounds.length, " rounds.");
  }
}
function LeagueShellComponent_Case_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function LeagueShellComponent_Case_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "start" }));
    });
    \u0275\u0275text(1, "Open round \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.league.blocked());
  }
}
function LeagueShellComponent_Case_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275text(1, "Lock team decision \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.league.editable() || !!ctx_r1.league.validation());
  }
}
function LeagueShellComponent_Case_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function LeagueShellComponent_Case_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "calculate" }));
    });
    \u0275\u0275text(1, "Calculate results \u2192");
    \u0275\u0275elementEnd();
  }
}
function LeagueShellComponent_Case_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function LeagueShellComponent_Case_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "reveal" }));
    });
    \u0275\u0275text(1, "Reveal standings \u2192");
    \u0275\u0275elementEnd();
  }
}
function LeagueShellComponent_Case_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function LeagueShellComponent_Case_55_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.league.command({ type: "next" }));
    });
    \u0275\u0275text(1, "Next round \u2192");
    \u0275\u0275elementEnd();
  }
}
function LeagueShellComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 54)(3, "div")(4, "span");
    \u0275\u0275text(5, "Your rank");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "span");
    \u0275\u0275text(10, "Round points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 55);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r12 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Round ", record_r12.round + 1, " \xB7 ", ctx_r1.league.config.rounds[record_r12.round].title);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("#", record_r12.team.rank);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", record_r12.team.result.scoreDelta > 0 ? "+" : "", "", \u0275\u0275pipeBind2(13, 7, record_r12.team.result.scoreDelta, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(record_r12.team.result.explanation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r12.team.decision.reasoning || "No strategy note entered for this round.");
  }
}
function LeagueShellComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 56);
    \u0275\u0275text(2, "\u21B6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Your first result goes here.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "After the standings are revealed, see your rank, points and what shaped the result.");
    \u0275\u0275elementEnd()();
  }
}
function LeagueShellComponent_Conditional_75_For_6_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const record_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Round ", record_r14.round + 1, " \xB7 ", ctx_r1.league.config.rounds[record_r14.round].title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.league.config.rounds[record_r14.round].headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Rank ", row_r13.rank, " \xB7 ", \u0275\u0275pipeBind2(7, 8, row_r13.result.scoreDelta, "1.0-2"), " points");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r13.result.explanation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Prediction: ", row_r13.decision.prediction === null ? "Not entered" : row_r13.decision.prediction, " \xB7 Reasoning: ", row_r13.decision.reasoning || "Not entered");
  }
}
function LeagueShellComponent_Conditional_75_For_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LeagueShellComponent_Conditional_75_For_6_For_1_Conditional_0_Template, 12, 11, "article");
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(row_r13.id === ctx_r1.league.team().id ? 0 : -1);
  }
}
function LeagueShellComponent_Conditional_75_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, LeagueShellComponent_Conditional_75_For_6_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const record_r14 = ctx.$implicit;
    \u0275\u0275repeater(record_r14.teams);
  }
}
function LeagueShellComponent_Conditional_75_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Finish a round to see your decisions and results here.");
    \u0275\u0275elementEnd();
  }
}
function LeagueShellComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 36)(1, "p", 15);
    \u0275\u0275text(2, "YOUR DECISIONS & RESULTS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Round history");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, LeagueShellComponent_Conditional_75_For_6_Template, 2, 0, null, null, _forTrack1, false, LeagueShellComponent_Conditional_75_ForEmpty_7_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.league.state().history);
  }
}
var LeagueShellComponent = class _LeagueShellComponent {
  league = inject(LeagueRuntimeService);
  element = inject(ElementRef);
  injector = inject(Injector);
  controls = signal(
    false,
    ...ngDevMode ? [{ debugName: "controls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = signal(
    false,
    ...ngDevMode ? [{ debugName: "history" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextRound = computed(
    () => this.league.config.rounds.at(this.league.state().round + 1),
    ...ngDevMode ? [{ debugName: "nextRound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastRound = computed(
    () => {
      const record = this.league.state().history.at(-1);
      const team = record?.teams.find((row) => row.id === this.league.team().id);
      return record && team ? { round: record.round, team } : null;
    },
    ...ngDevMode ? [{ debugName: "lastRound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labels = {
    preview: "Round preview",
    "decision-open": "Decisions open",
    "decision-locked": "All decisions locked",
    revealing: "Results ready",
    results: "Round complete",
    complete: "League complete"
  };
  constructor() {
    let previous = this.league.state().phase;
    effect(() => {
      const phase = this.league.state().phase;
      if (phase === previous)
        return;
      previous = phase;
      this.focusRegion(phase === "results" || phase === "complete" ? ".stage" : ".project-header");
    });
  }
  toggleControls() {
    this.controls.update((open) => !open);
    if (this.controls())
      this.focusRegion("#teacher-controls");
  }
  toggleHistory(open = !this.history()) {
    this.history.set(open);
    if (open)
      this.focusRegion("#round-history");
  }
  focusRegion(selector) {
    afterNextRender(() => {
      const region = this.element.nativeElement.querySelector(selector);
      region?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      region?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  teamName(id) {
    return this.league.config.teams.find((t) => t.id === id)?.name ?? id;
  }
  canLeave() {
    this.league.saveDraft();
    return true;
  }
  static \u0275fac = function LeagueShellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeagueShellComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeagueShellComponent, selectors: [["app-league-shell"]], decls: 76, vars: 35, consts: [[1, "league"], ["tabindex", "-1", "aria-label", "Project title and controls", 1, "project-header"], [1, "practice"], [1, "project-title"], [1, "actions"], [1, "example-link", 3, "routerLink"], ["aria-controls", "round-history", 3, "click"], ["aria-controls", "teacher-controls", 3, "click"], ["id", "teacher-controls", "tabindex", "-1", "aria-label", "Teacher practice controls", 1, "teacher-panel"], ["role", "alert", 1, "error"], [1, "arena"], ["tabindex", "-1", "aria-labelledby", "standings-title", 1, "stage", "panel"], [3, "config", "snapshot", "yourTeamId"], ["aria-labelledby", "command-title", 1, "command", "panel"], [1, "section-heading"], [1, "eyebrow"], ["id", "command-title"], [1, "round-status"], ["aria-label", "Time remaining", 1, "clock"], ["aria-live", "polite", 1, "phase"], [1, "current-event"], [1, "team-heading"], [1, "saved"], [1, "metrics"], ["id", "team-decision"], [1, "champion"], [1, "focus-round-action"], [1, "primary", 3, "disabled"], ["type", "submit", "form", "team-decision", 1, "primary", 3, "disabled"], [1, "primary"], [1, "round-information"], ["aria-labelledby", "event-title", 1, "info", "panel"], ["id", "event-title"], ["aria-labelledby", "recap-title", "aria-live", "polite", 1, "recap", "panel"], ["id", "recap-title"], [1, "empty-recap"], ["id", "round-history", "tabindex", "-1", "aria-label", "Your round history", 1, "history", "panel"], [3, "click", "disabled"], [3, "click"], ["id", "team-decision", 3, "ngSubmit"], [3, "disabled"], [1, "decision-fields"], [1, "cost"], [1, "reflection-fields"], ["for", "prediction"], ["id", "prediction", "name", "prediction", "type", "number", 3, "ngModelChange", "blur", "ngModel"], ["for", "reasoning"], ["id", "reasoning", "name", "reasoning", "rows", "2", "maxlength", "1000", "placeholder", "Explain your choices\u2026", 3, "ngModelChange", "blur", "ngModel"], [1, "form-note"], [3, "for"], ["type", "number", "required", "", 3, "ngModelChange", "blur", "id", "name", "min", "max", "step", "ngModel"], [1, "primary", 3, "click", "disabled"], [1, "primary", 3, "click"], [1, "recap-round"], [1, "recap-metrics"], [1, "recap-reasoning"], ["aria-hidden", "true"]], template: function LeagueShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "app-workspace-tools")(2, "header", 1)(3, "span", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "a", 5);
      \u0275\u0275text(12, "League lobby");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 5);
      \u0275\u0275text(14, "Final example \u2197");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 6);
      \u0275\u0275listener("click", function LeagueShellComponent_Template_button_click_15_listener() {
        return ctx.toggleHistory();
      });
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275listener("click", function LeagueShellComponent_Template_button_click_17_listener() {
        return ctx.toggleControls();
      });
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, LeagueShellComponent_Conditional_19_Template, 13, 6, "section", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(20, LeagueShellComponent_Conditional_20_Template, 2, 1, "p", 9);
      \u0275\u0275elementStart(21, "div", 10)(22, "section", 11);
      \u0275\u0275element(23, "app-league-leaderboard", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "section", 13)(25, "div", 14)(26, "div")(27, "p", 15);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "h2", 16);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 17)(32, "strong", 18);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 19);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "p", 20);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 21)(39, "h3");
      \u0275\u0275text(40);
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42, "YOUR TEAM");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "span", 22);
      \u0275\u0275text(44, "Saved on this browser");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 23);
      \u0275\u0275repeaterCreate(46, LeagueShellComponent_For_47_Template, 6, 6, "div", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(48, LeagueShellComponent_Conditional_48_Template, 29, 9, "form", 24)(49, LeagueShellComponent_Conditional_49_Template, 8, 6, "div", 25);
      \u0275\u0275elementStart(50, "div", 26);
      \u0275\u0275conditionalCreate(51, LeagueShellComponent_Case_51_Template, 2, 1, "button", 27)(52, LeagueShellComponent_Case_52_Template, 2, 1, "button", 28)(53, LeagueShellComponent_Case_53_Template, 2, 0, "button", 29)(54, LeagueShellComponent_Case_54_Template, 2, 0, "button", 29)(55, LeagueShellComponent_Case_55_Template, 2, 0, "button", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 30)(57, "section", 31)(58, "p", 15);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "h2", 32);
      \u0275\u0275text(61);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "p");
      \u0275\u0275text(63);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "h3");
      \u0275\u0275text(65, "How scoring works");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "p");
      \u0275\u0275text(67);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "section", 33)(69, "p", 15);
      \u0275\u0275text(70, "LOOKING BACK");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "h2", 34);
      \u0275\u0275text(72, "Last round recap");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(73, LeagueShellComponent_Conditional_73_Template, 18, 10)(74, LeagueShellComponent_Conditional_74_Template, 7, 0, "div", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(75, LeagueShellComponent_Conditional_75_Template, 8, 1, "section", 36);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_23_0;
      let tmp_28_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("LOCAL PRACTICE \xB7 ", ctx.league.config.teams.length, " DEMO TEAMS");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.league.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("Round ", ctx.league.state().round + 1, " / ", ctx.league.config.rounds.length);
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(31, _c0, ctx.league.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(33, _c1, ctx.league.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.history());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.history() ? "Hide history" : "Round history");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.controls());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("Teacher controls ", ctx.controls() ? "\u2212" : "+");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.controls() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.league.error() ? 20 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("config", ctx.league.config)("snapshot", ctx.league.state())("yourTeamId", ctx.league.team().id);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("HAPPENING NOW \xB7 ROUND ", ctx.league.state().round + 1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.league.round().title);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("urgent", ctx.league.seconds() < 30 && ctx.league.state().phase === "decision-open");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.league.timer());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.league.state().pausedSeconds !== null ? "Timer paused" : ctx.labels[ctx.league.state().phase]);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.league.round().headline);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.teamName(ctx.league.team().id), " ");
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.league.config.metrics);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.league.state().phase !== "complete" ? 48 : 49);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_23_0 = ctx.league.state().phase) === "preview" ? 51 : tmp_23_0 === "decision-open" ? 52 : tmp_23_0 === "decision-locked" ? 53 : tmp_23_0 === "revealing" ? 54 : tmp_23_0 === "results" ? 55 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("ROUND ", ctx.league.state().round + 1, " \xB7 ROUND INFORMATION");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.league.round().headline);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.league.round().description);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.league.config.explanation);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_28_0 = ctx.lastRound()) ? 73 : 74, tmp_28_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.history() ? 75 : -1);
    }
  }, dependencies: [WorkspaceToolsComponent, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterLink, LeagueLeaderboardComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.league[_ngcontent-%COMP%] {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead[_ngcontent-%COMP%] {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back[_ngcontent-%COMP%] {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n[_ngcontent-%COMP%]:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage[_ngcontent-%COMP%] {\n  padding: 0 18px;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock[_ngcontent-%COMP%] {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent[_ngcontent-%COMP%] {\n  color: #ffbc93;\n}\n.phase[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved[_ngcontent-%COMP%] {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput[_ngcontent-%COMP%]:disabled, \ntextarea[_ngcontent-%COMP%]:disabled {\n  color: #8c9bb1;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #8d9bb0;\n}\n.cost[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note[_ngcontent-%COMP%] {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.history[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.recap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.recap-round[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.recap-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning[_ngcontent-%COMP%] {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap[_ngcontent-%COMP%] {\n  padding: 22px 0 8px;\n}\n.empty-recap[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 340px;\n}\n.history[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.champion[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error[_ngcontent-%COMP%] {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 18px;\n  }\n  .arena[_ngcontent-%COMP%] {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 12px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .decision-fields[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena[_ngcontent-%COMP%], \n   .round-information[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    flex: 1 0 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .round-information[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .masthead[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 10px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .project-header[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .saved[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .clock[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n}\n.focus-round-action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n.league[_ngcontent-%COMP%] {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeagueShellComponent, [{
    type: Component,
    args: [{ selector: "app-league-shell", imports: [WorkspaceToolsComponent, DecimalPipe, FormsModule, RouterLink, LeagueLeaderboardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="league">\r
\r
\r
  <app-workspace-tools><header class="project-header" tabindex="-1" aria-label="Project title and controls">\r
    <span class="practice">LOCAL PRACTICE \xB7 {{ league.config.teams.length }} DEMO TEAMS</span>\r
    <div class="project-title"><h1>{{ league.config.title }}</h1><span>Round {{ league.state().round + 1 }} / {{ league.config.rounds.length }}</span></div>\r
    <div class="actions">\r
      <a class="example-link" [routerLink]="['/projects', league.config.projectId]">League lobby</a>\r
      <a class="example-link" [routerLink]="['/projects', league.config.projectId, 'final-demo']">Final example \u2197</a>\r
      <button [attr.aria-expanded]="history()" aria-controls="round-history" (click)="toggleHistory()">{{ history() ? 'Hide history' : 'Round history' }}</button>\r
      <button [attr.aria-expanded]="controls()" aria-controls="teacher-controls" (click)="toggleControls()">Teacher controls {{ controls() ? '\u2212' : '+' }}</button>\r
\r
    </div>\r
    @if (controls()) {\r
      <section id="teacher-controls" tabindex="-1" class="teacher-panel" aria-label="Teacher practice controls">\r
        <p>Practice the teacher\u2019s role. Other teams submit simulated decisions when you lock or close the round.</p>\r
        <div class="actions">\r
          <button [disabled]="league.state().phase !== 'decision-open'" (click)="league.command({type: league.state().pausedSeconds === null ? 'pause' : 'resume'})">{{ league.state().pausedSeconds === null ? 'Pause timer' : 'Resume timer' }}</button>\r
          <button [disabled]="league.state().phase !== 'decision-open'" (click)="league.command({type: 'extend'})">+60 seconds</button>\r
          <button [disabled]="league.state().phase !== 'decision-open'" (click)="league.command({type: 'close'})">Close & lock round</button>\r
          @if (league.state().phase === 'complete') { <button (click)="league.command({type: 'restart'}); history.set(false); controls.set(false)">Start fresh practice \u2192</button> }\r
        </div>\r
        <small>{{ league.state().phase === 'complete' ? 'Starting fresh replaces the saved results and history for this practice.' : 'At the deadline, your last valid saved decision is used. If unaffordable, a feasible practice decision is substituted.' }}</small>\r
      </section>\r
    }\r
  </header></app-workspace-tools>\r
  @if (league.error()) { <p class="error" role="alert">{{ league.error() }}</p> }\r
\r
  <div class="arena">\r
    <section class="stage panel" tabindex="-1" aria-labelledby="standings-title">\r
      <app-league-leaderboard [config]="league.config" [snapshot]="league.state()" [yourTeamId]="league.team().id" />\r
    </section>\r
\r
    <section class="command panel" aria-labelledby="command-title">\r
      <div class="section-heading">\r
        <div><p class="eyebrow">HAPPENING NOW \xB7 ROUND {{ league.state().round + 1 }}</p><h2 id="command-title">{{ league.round().title }}</h2></div>\r
        <div class="round-status"><strong class="clock" [class.urgent]="league.seconds() < 30 && league.state().phase === 'decision-open'" aria-label="Time remaining">{{ league.timer() }}</strong><span class="phase" aria-live="polite">{{ league.state().pausedSeconds !== null ? 'Timer paused' : labels[league.state().phase] }}</span></div>\r
      </div>\r
      <p class="current-event">{{ league.round().headline }}</p>\r
      <div class="team-heading"><h3>{{ teamName(league.team().id) }} <span>YOUR TEAM</span></h3><span class="saved">Saved on this browser</span></div>\r
      <div class="metrics">@for (metric of league.config.metrics; track metric.id) {\r
        <div><span>{{ metric.label }}</span><strong>{{ metric.unit }}{{ league.team().state[metric.id] | number:'1.0-2' }}</strong></div>\r
      }</div>\r
      @if (league.state().phase !== 'complete') {\r
        <form id="team-decision" (ngSubmit)="league.lock()">\r
          <fieldset [disabled]="!league.editable()"><legend>Your strategy</legend>\r
            <div class="decision-fields">@for (decision of league.config.decisions; track decision.id) {\r
              <div><label [for]="decision.id">{{ decision.label }} <span>{{ decision.unit }}</span></label>\r
                <input [id]="decision.id" [name]="decision.id" type="number" [min]="decision.min" [max]="decision.max" [step]="decision.step" [ngModel]="league.draft().values[decision.id]" (ngModelChange)="league.updateValue(decision.id, $event)" (blur)="league.saveDraft()" required></div>\r
            }</div>\r
            <div class="cost"><span>Projected cost</span><strong>{{ league.cost() | number:'1.0-2' }}</strong></div>\r
            <div class="reflection-fields">\r
              <div><label for="prediction">Predicted points <span>optional</span></label><input id="prediction" name="prediction" type="number" [ngModel]="league.draft().prediction" (ngModelChange)="league.updatePrediction($event)" (blur)="league.saveDraft()"></div>\r
              <div><label for="reasoning">Why this strategy? <span>optional</span></label><textarea id="reasoning" name="reasoning" rows="2" maxlength="1000" placeholder="Explain your choices\u2026" [ngModel]="league.draft().reasoning" (ngModelChange)="league.updateNote($event)" (blur)="league.saveDraft()"></textarea></div>\r
            </div>\r
          </fieldset>\r
          @if (league.validation() && league.editable()) { <p class="error" role="alert">{{ league.validation() }}</p> }\r
          <p class="form-note">{{ league.team().decision.lockedAt !== undefined ? '\u2713 Decision locked.' : league.state().phase === 'preview' ? 'Open the round to begin.' : 'Lock your decision when ready. It is final for this round.' }}</p>\r
        </form>\r
      } @else {\r
        <div class="champion"><p class="eyebrow">LEAGUE COMPLETE</p><h3>{{ teamName(league.ranking()[0].id) }} wins the league.</h3><p>{{ league.ranking()[0].score | number:'1.0-2' }} points across {{ league.config.rounds.length }} rounds.</p></div>\r
      }\r
      <div class="focus-round-action">      @switch (league.state().phase) {\r
        @case ('preview') { <button class="primary" [disabled]="league.blocked()" (click)="league.command({type: 'start'})">Open round \u2192</button> }\r
        @case ('decision-open') { <button class="primary" type="submit" form="team-decision" [disabled]="!league.editable() || !!league.validation()">Lock team decision \u2192</button> }\r
        @case ('decision-locked') { <button class="primary" (click)="league.command({type: 'calculate'})">Calculate results \u2192</button> }\r
        @case ('revealing') { <button class="primary" (click)="league.command({type: 'reveal'})">Reveal standings \u2192</button> }\r
        @case ('results') { <button class="primary" (click)="league.command({type: 'next'})">Next round \u2192</button> }\r
      }</div>\r
    </section>\r
\r
    <div class="round-information">\r
      <section class="info panel" aria-labelledby="event-title">\r
        <p class="eyebrow">ROUND {{ league.state().round + 1 }} \xB7 ROUND INFORMATION</p>\r
        <h2 id="event-title">{{ league.round().headline }}</h2><p>{{ league.round().description }}</p>\r
        <h3>How scoring works</h3><p>{{ league.config.explanation }}</p>\r
      </section>\r
      <section class="recap panel" aria-labelledby="recap-title" aria-live="polite">\r
        <p class="eyebrow">LOOKING BACK</p><h2 id="recap-title">Last round recap</h2>\r
        @if (lastRound(); as record) {\r
          <p class="recap-round">Round {{ record.round + 1 }} \xB7 {{ league.config.rounds[record.round].title }}</p>\r
          <div class="recap-metrics"><div><span>Your rank</span><strong>#{{ record.team.rank }}</strong></div><div><span>Round points</span><strong>{{ record.team.result.scoreDelta > 0 ? '+' : '' }}{{ record.team.result.scoreDelta | number:'1.0-2' }}</strong></div></div>\r
          <p>{{ record.team.result.explanation }}</p>\r
          <p class="recap-reasoning">{{ record.team.decision.reasoning || 'No strategy note entered for this round.' }}</p>\r
        } @else { <div class="empty-recap"><span aria-hidden="true">\u21B6</span><h3>Your first result goes here.</h3><p>After the standings are revealed, see your rank, points and what shaped the result.</p></div> }\r
      </section>\r
    </div>\r
    @if (history()) {\r
      <section id="round-history" tabindex="-1" class="history panel" aria-label="Your round history">\r
        <p class="eyebrow">YOUR DECISIONS & RESULTS</p><h2>Round history</h2>\r
        @for (record of league.state().history; track record.round) {\r
          @for (row of record.teams; track row.id) {\r
            @if (row.id === league.team().id) {\r
              <article><h3>Round {{ record.round + 1 }} \xB7 {{ league.config.rounds[record.round].title }}</h3>\r
                <p>{{ league.config.rounds[record.round].headline }}</p><strong>Rank {{ row.rank }} \xB7 {{ row.result.scoreDelta | number:'1.0-2' }} points</strong>\r
                <p>{{ row.result.explanation }}</p><p>Prediction: {{ row.decision.prediction === null ? 'Not entered' : row.decision.prediction }} \xB7 Reasoning: {{ row.decision.reasoning || 'Not entered' }}</p>\r
              </article>\r
            }\r
          }\r
        } @empty { <p>Finish a round to see your decisions and results here.</p> }\r
      </section>\r
    }\r
  </div>\r
</main>\r
`, styles: ['/* src/app/templates/live-strategy-league/ui/league-shell.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.league {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark span {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1 {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title > span {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel p {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel small {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage {\n  padding: 0 18px;\n}\n.section-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2 {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent {\n  color: #ffbc93;\n}\n.phase {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round > span {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round strong {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round small {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading h3 {\n  font-size: 15px;\n}\n.team-heading h3 span {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics span {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics strong {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel span {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput:disabled,\ntextarea:disabled {\n  color: #8c9bb1;\n}\ntextarea {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea::placeholder {\n  color: #8d9bb0;\n}\n.cost {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info p:not(.eyebrow),\n.recap p:not(.eyebrow),\n.history p {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info h3 {\n  margin-top: 22px;\n}\n.info h2,\n.recap h2 {\n  font-size: 20px;\n}\n.info p:last-child {\n  margin-bottom: 0;\n}\n.recap-round {\n  margin-top: 12px;\n}\n.recap-metrics {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics span {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics strong {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap {\n  padding: 22px 0 8px;\n}\n.empty-recap > span {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap p {\n  max-width: 340px;\n}\n.history {\n  grid-column: 1/-1;\n}\n.history article {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history article:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history strong {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion h3 {\n  font-size: 22px;\n}\n.champion p:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league {\n    padding-inline: 18px;\n  }\n  .arena {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel {\n    padding: 16px;\n  }\n  .stage {\n    padding: 0 12px;\n  }\n  .project-title {\n    gap: 10px;\n  }\n  h1 {\n    font-size: 18px;\n  }\n  .project-title > span {\n    padding-left: 10px;\n  }\n  .reflection-fields {\n    gap: 10px;\n  }\n  .decision-fields {\n    gap: 8px;\n  }\n  h2 {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena,\n  .round-information {\n    grid-template-columns: 1fr;\n  }\n  .project-title {\n    flex: 1 0 100%;\n  }\n  .project-header > .actions {\n    width: 100%;\n  }\n  .project-header > .actions .primary {\n    margin-left: auto;\n  }\n  .round-information {\n    gap: 14px;\n  }\n  .masthead {\n    gap: 14px;\n  }\n  .practice {\n    font-size: 8px;\n  }\n  .wordmark span {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league {\n    padding-inline: 10px;\n  }\n  .project-title {\n    justify-content: space-between;\n  }\n  h1 {\n    font-size: 16px;\n  }\n  .project-title > span {\n    font-size: 9px;\n  }\n  .project-header .actions {\n    gap: 5px;\n  }\n  button {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel {\n    padding: 14px;\n  }\n  .stage {\n    padding: 0 10px;\n  }\n  .reflection-fields {\n    grid-template-columns: 1fr;\n  }\n  .saved {\n    display: none;\n  }\n  .clock {\n    font-size: 25px;\n  }\n  .section-heading h2 {\n    font-size: 19px;\n  }\n}\n.focus-round-action {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action button {\n  min-height: 48px;\n}\n.league {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeagueShellComponent, { className: "LeagueShellComponent", filePath: "src/app/templates/live-strategy-league/ui/league-shell.component.ts", lineNumber: 18 });
})();
export {
  LeagueShellComponent
};
//# debugId=cdb9ddd1-8bc2-53ff-89d6-8f95a0a20ec4
//# sourceMappingURL=chunk-D7T5B5FL.js.map
