import {
  ClassJourneyMapComponent
} from "./chunk-D6EU5EB6.js";
import {
  JourneyReplayRuntimeService,
  assertResponse,
  hasResponse,
  routeForScene
} from "./chunk-EHZR63UE.js";
import {
  JourneyHistoryContextComponent
} from "./chunk-U6GFPECO.js";
import {
  LivingJourneyMapComponent
} from "./chunk-G7WLRBLS.js";
import {
  resolveJourneyOutcome
} from "./chunk-Q2RH2RH4.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  ElementRef,
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
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
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
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/journey-replay/ui/journey-decision-panel.component.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.choice.id;
var _forTrack3 = ($index, $item) => $item.evidenceId + $item.paragraphId;
function JourneyDecisionPanelComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Your crew\u2019s route and experience can change. The historical record stays the same.");
    \u0275\u0275domElementEnd();
  }
}
function JourneyDecisionPanelComponent_Conditional_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const change_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(change_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", change_r2.before, " \u2192 ", change_r2.after, "", change_r2.unit);
  }
}
function JourneyDecisionPanelComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 1)(1, "span");
    \u0275\u0275text(2, "Decision recorded \xB7 your experience changes");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, JourneyDecisionPanelComponent_Conditional_1_Conditional_3_Template, 2, 0, "p");
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "dl");
    \u0275\u0275repeaterCreate(9, JourneyDecisionPanelComponent_Conditional_1_For_10_Template, 5, 4, "div", null, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "p", 3);
    \u0275\u0275text(12, " Compare this with your prediction. What will you protect in the next decision? ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "button", 4);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_1_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismissedOutcome.set(ctx_r2.lastOutcome()?.stepId));
    });
    \u0275\u0275text(14, " Continue the adventure \u2192 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.runtime.config.historicalFrame ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.steps[ctx_r2.runtime.state().completedSteps.length - 1]?.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.lastOutcome()?.consequence);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.outcomeChanges());
  }
}
function JourneyDecisionPanelComponent_Conditional_2_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_For_10_Template_button_click_0_listener() {
      const \u0275$index_52_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToWorkStep(\u0275$index_52_r5));
    });
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const label_r6 = ctx.$implicit;
    const \u0275$index_52_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", !ctx_r2.canVisitWorkStep(\u0275$index_52_r5));
    \u0275\u0275attribute("aria-current", ctx_r2.workStep() === \u0275$index_52_r5 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_52_r5 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", label_r6, " ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 8);
    \u0275\u0275text(1, " Your decision: ");
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.label);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_14_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const goal_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(goal_r7);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "details", 16)(1, "summary");
    \u0275\u0275text(2, "Captain\u2019s briefing \xB7 learn to succeed");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "ul");
    \u0275\u0275repeaterCreate(6, JourneyDecisionPanelComponent_Conditional_2_Conditional_14_For_7_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "p", 17);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const adventure_r8 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(adventure_r8.narrative);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(adventure_r8.learningGoals);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(adventure_r8.stakes);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 26);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_For_10_Template_button_click_0_listener() {
      const target_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.inspectPlanningTarget(target_r10.id));
    });
    \u0275\u0275domElementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const target_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("inspected", ctx_r2.inspectedPlanningTarget()?.id === target_r10.id)("selected", ctx_r2.runtime.state().responseDraft.planningTargetId === target_r10.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r10.summary);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "dl")(1, "div")(2, "dt");
    \u0275\u0275text(3, "Distance");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "dd");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div")(7, "dt");
    \u0275\u0275text(8, "Risk");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "dd");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div")(12, "dt");
    \u0275\u0275text(13, "Conditions");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "dd");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const route_r12 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(route_r12.distanceLabel);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(route_r12.risk);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(route_r12.windLabel);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const fact_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fact_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fact_r13.value);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "dl");
    \u0275\u0275repeaterCreate(1, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_8_For_2_Template, 5, 2, "div", null, _forTrack1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r14 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(target_r14.facts);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 23)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_7_Template, 16, 3, "dl");
    \u0275\u0275conditionalCreate(8, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Conditional_8_Template, 3, 0, "dl");
    \u0275\u0275domElementStart(9, "button", 27);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Template_button_click_9_listener() {
      const target_r14 = \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.selectPlanningTarget(target_r14.id));
    });
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const target_r14 = ctx;
    const planning_r15 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(planning_r15.mode === "sponsor" ? "Potential sponsor" : "Potential voyage");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r14.details);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.planningRoute()) ? 7 : -1, tmp_12_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(target_r14.facts?.length ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().responseDraft.planningTargetId === target_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().responseDraft.planningTargetId === target_r14.id ? "Selected: " + target_r14.label : planning_r15.selectionLabel, " ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 24)(1, "h3", 28);
    \u0275\u0275text(2, "Build your proposal");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "label", 29);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "textarea", 30);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_12_Template_textarea_input_5_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.planningTextInput($event));
    })("blur", function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_12_Template_textarea_blur_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.runtime.flushDraft());
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "button", 31);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_12_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.sendPlanning());
    });
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const planning_r15 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(planning_r15.planPrompt);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().responseDraft.planningText ?? "")("placeholder", planning_r15.planPlaceholder ?? "");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r2.canSubmitPlanning());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", planning_r15.submitLabel ?? "Confirm plan", " ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 25)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const planning_r15 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(planning_r15.mode === "sponsor" ? "Sponsor response" : "Mission target selected");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedPlanningTarget()?.decisionResponse ?? "This destination is now part of your mission plan. You may still change the goal or target before recording the chapter.", " ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "h3", 19);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 20);
    \u0275\u0275text(7, " Select a highlighted place or route on the map, or inspect an option below. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 21);
    \u0275\u0275repeaterCreate(9, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_For_10_Template, 5, 6, "button", 22, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(11, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_11_Template, 11, 7, "article", 23);
    \u0275\u0275conditionalCreate(12, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_12_Template, 8, 5, "section", 24);
    \u0275\u0275conditionalCreate(13, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Conditional_13_Template, 5, 2, "section", 25);
  }
  if (rf & 2) {
    let tmp_12_0;
    const planning_r15 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(planning_r15.mode === "sponsor" ? "Sponsor planning" : "Voyage planning");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(planning_r15.targetPrompt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(planning_r15.prompt);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", planning_r15.targetPrompt);
    \u0275\u0275advance();
    \u0275\u0275repeater(planning_r15.targets);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.inspectedPlanningTarget()) ? 11 : -1, tmp_12_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.state().responseDraft.planningTargetId && planning_r15.planPrompt ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.planningReady() ? 13 : -1);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Conditional_0_Template, 14, 7);
  }
  if (rf & 2) {
    let tmp_5_0;
    \u0275\u0275conditional((tmp_5_0 = ctx.planning) ? 0 : -1, tmp_5_0);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 18)(1, "span");
    \u0275\u0275text(2, "First decision");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3", 19);
    \u0275\u0275text(4, "Choose a goal above");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, " The map will reveal different routes, sponsors, or unknown regions based on your goal. ");
    \u0275\u0275domElementEnd()();
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 11);
    \u0275\u0275conditionalCreate(1, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_1_Template, 1, 1)(2, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Conditional_2_Template, 7, 0, "section", 18);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.runtime.choice()) ? 1 : 2, tmp_3_0);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const choice_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r18.icon);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_For_5_Template_button_click_0_listener() {
      const choice_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.choose(choice_r18.id));
    });
    \u0275\u0275conditionalCreate(1, JourneyDecisionPanelComponent_Conditional_2_Conditional_16_For_5_Conditional_1_Template, 2, 1, "span", 35);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const choice_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.runtime.choice()?.id === choice_r18.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.choice()?.id === choice_r18.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r18.icon ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r18.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r18.summary);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Conditional_6_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "dl")(6, "div")(7, "dt");
    \u0275\u0275text(8, "Distance");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "dd");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div")(12, "dt");
    \u0275\u0275text(13, "Risk");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "dd");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r2.runtime.choice()?.id === item_r19.choice.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r19.choice.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r19.route?.windLabel);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r19.route?.distanceLabel ?? "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r19.route?.risk ?? "\u2014");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 34)(1, "span");
    \u0275\u0275text(2, "Compare before deciding");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div");
    \u0275\u0275repeaterCreate(4, JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Conditional_6_For_5_Template, 16, 6, "article", 36, _forTrack2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.routeOptions());
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "fieldset")(1, "legend");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 32);
    \u0275\u0275repeaterCreate(4, JourneyDecisionPanelComponent_Conditional_2_Conditional_16_For_5_Template, 6, 6, "button", 33, _forTrack0);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(6, JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Conditional_6_Template, 6, 0, "section", 34);
  }
  if (rf & 2) {
    const step_r20 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r20.choicePrompt);
    \u0275\u0275advance();
    \u0275\u0275classProp("visual-choices", step_r20.choices[0]?.icon);
    \u0275\u0275advance();
    \u0275\u0275repeater(step_r20.choices);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.routeOptions().length > 0 ? 6 : -1);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const change_r22 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(change_r22.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", change_r22.before, " \u2192 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", change_r22.after, "", change_r22.unit);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 49);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const effect_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u21B3 ", effect_r23);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 48)(1, "h3");
    \u0275\u0275text(2, "What you commit");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, " Simulated costs with your current cargo and earlier decisions. Changes apply when you record the chapter. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "dl");
    \u0275\u0275repeaterCreate(6, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_For_7_Template, 7, 4, "div", null, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(8, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_For_9_Template, 2, 1, "p", 49, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const preview_r24 = ctx;
    \u0275\u0275advance(6);
    \u0275\u0275repeater(preview_r24.changes);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(preview_r24.carriedForward);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Conditional_0_Template, 10, 0, "section", 48);
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.outcomePreview()) ? 0 : -1, tmp_5_0);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "em");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const paragraph_r27 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(paragraph_r27.perspective);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "blockquote")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_For_8_Conditional_3_Template, 2, 1, "em");
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const paragraph_r27 = ctx.$implicit;
    const \u0275$index_309_r28 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Paragraph ", \u0275$index_309_r28 + 1);
    \u0275\u0275advance();
    \u0275\u0275conditional(paragraph_r27.perspective ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paragraph_r27.text);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "details", 50);
    \u0275\u0275domListener("toggle", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_Template_details_toggle_0_listener($event) {
      const item_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.evidenceToggled(item_r26.id, $event));
    });
    \u0275\u0275domElementStart(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(7, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_For_8_Template, 6, 3, "blockquote", null, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r26.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r26.sourceLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r26.summary);
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r26.paragraphs ?? \u0275\u0275pureFunction0(3, _c0));
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label", 51);
    \u0275\u0275text(1, "Explain your decision");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "textarea", 52);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_21_Template_textarea_input_2_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.responseInput($event));
    })("blur", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_21_Template_textarea_blur_2_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.flushDraft());
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().responseDraft.text);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 61);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.startRecording());
    });
    \u0275\u0275text(1, " \u25CF Record answer ");
    \u0275\u0275domElementEnd();
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 62);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.stopRecording());
    });
    \u0275\u0275text(1, " \u25A0 Stop recording ");
    \u0275\u0275domElementEnd();
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_0_Template, 2, 0, "button", 59)(1, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Conditional_1_Template, 2, 0, "button", 60);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(!ctx_r2.recording() ? 0 : 1);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "audio", 56);
    \u0275\u0275text(1, " Your browser does not support audio playback. ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275domProperty("src", ctx);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 44)(1, "div", 53);
    \u0275\u0275conditionalCreate(2, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_2_Template, 2, 1);
    \u0275\u0275domElementStart(3, "label", 54);
    \u0275\u0275text(4, " Attach audio ");
    \u0275\u0275domElementStart(5, "input", 55);
    \u0275\u0275domListener("change", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.audioFileSelected($event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(8, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Conditional_8_Template, 2, 1, "audio", 56);
    \u0275\u0275domElementStart(9, "label", 57);
    \u0275\u0275text(10, "Transcript or key sentence");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "textarea", 58);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Template_textarea_input_11_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.transcriptInput($event));
    })("blur", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Template_textarea_blur_11_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.flushDraft());
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.recordingSupported ? 2 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.runtime.mediaState() === "uploading" ? "Saving audio\u2026" : ctx_r2.runtime.mediaState() === "ready" ? "Audio saved" : "");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.runtime.mediaPreviewUrl()) ? 8 : -1, tmp_7_0);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().responseDraft.transcript);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r34 = ctx.$implicit;
    \u0275\u0275domProperty("value", item_r34.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r34.title);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const paragraph_r35 = ctx.$implicit;
    const \u0275$index_423_r36 = ctx.$index;
    \u0275\u0275domProperty("value", paragraph_r35.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Paragraph ", \u0275$index_423_r36 + 1);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_27_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "blockquote", 74);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const paragraph_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(paragraph_r37.text);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_27_Conditional_0_Template, 2, 1, "blockquote", 74);
  }
  if (rf & 2) {
    const paragraph_r37 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(paragraph_r37.id === ctx_r2.citationParagraph() ? 0 : -1);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "button", 75);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_35_Template_button_click_6_listener() {
      const \u0275$index_442_r39 = \u0275\u0275restoreView(_r38).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.removeCitation(\u0275$index_442_r39));
    });
    \u0275\u0275text(7, " Remove ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const citation_r40 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.evidenceTitle(citation_r40.evidenceId), " \xB7 ", ctx_r2.paragraphLabel(citation_r40.evidenceId, citation_r40.paragraphId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(citation_r40.explanation);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_ForEmpty_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Read a source, choose a paragraph, and explain why it matters.");
    \u0275\u0275domElementEnd();
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 45)(1, "header")(2, "div")(3, "span");
    \u0275\u0275text(4, "Source connection");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "h3", 63);
    \u0275\u0275text(6, "Cite one exact paragraph");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "p", 64);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 65)(12, "label");
    \u0275\u0275text(13, " Source ");
    \u0275\u0275domElementStart(14, "select", 66);
    \u0275\u0275domListener("change", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template_select_change_14_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.sourceChanged($event.target.value));
    });
    \u0275\u0275domElementStart(15, "option", 67);
    \u0275\u0275text(16, "Choose a source");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(17, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_18_Template, 2, 2, "option", 68, _forTrack0);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "label");
    \u0275\u0275text(20, " Paragraph ");
    \u0275\u0275domElementStart(21, "select", 69);
    \u0275\u0275domListener("change", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template_select_change_21_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.citationParagraph.set($event.target.value));
    });
    \u0275\u0275domElementStart(22, "option", 67);
    \u0275\u0275text(23, "Choose a paragraph");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(24, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_25_Template, 2, 2, "option", 68, _forTrack0);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275repeaterCreate(26, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_27_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275domElementStart(28, "label", 70);
    \u0275\u0275text(29, "How does this detail support your decision?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(30, "textarea", 71);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template_textarea_input_30_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.citationExplanation.set($event.target.value));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "button", 72);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.addCitation());
    });
    \u0275\u0275text(32, " Add source connection ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(33, "div", 73);
    \u0275\u0275repeaterCreate(34, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_For_35_Template, 8, 3, "article", null, _forTrack3, false, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_ForEmpty_36_Template, 2, 0, "p");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.state().responseDraft.citations?.length ?? 0, " added");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.learning.responseFrame);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r2.citationSource());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.evidence());
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r2.citationParagraph())("disabled", ctx_r2.citationParagraphs().length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.citationParagraphs());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.citationParagraphs());
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r2.citationExplanation());
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r2.citationReady());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.state().responseDraft.citations ?? \u0275\u0275pureFunction0(8, _c0));
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const turn_r42 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(turn_r42.explanation);
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Conditional_3_Template, 2, 1, "p");
    \u0275\u0275domElementStart(4, "label");
    \u0275\u0275text(5, " Your reply ");
    \u0275\u0275domElementStart(6, "textarea", 76);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Template_textarea_input_6_listener($event) {
      const turn_r42 = \u0275\u0275restoreView(_r41).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.answerTutor(turn_r42.id, $event.target.value));
    })("blur", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Template_textarea_blur_6_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.flushDraft());
    });
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const turn_r42 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r42.question);
    \u0275\u0275advance();
    \u0275\u0275conditional(turn_r42.explanation ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", turn_r42.answer ?? "");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_0_Template, 1, 1);
    \u0275\u0275domElementStart(1, "section", 37)(2, "div", 38)(3, "span");
    \u0275\u0275text(4, "Evidence on the chart");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(5, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_6_Template, 9, 4, "details", null, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 39)(8, "h3");
    \u0275\u0275text(9, "What might happen?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "label", 40);
    \u0275\u0275text(11, "Predict the consequence");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "textarea", 41);
    \u0275\u0275domListener("input", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template_textarea_input_12_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.setPrediction($event.target.value));
    })("blur", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template_textarea_blur_12_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.flushDraft());
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div", 10)(14, "h3", 42);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "div", 43)(17, "button", 4);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.setResponseMode("text"));
    });
    \u0275\u0275text(18, " Write ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "button", 4);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.setResponseMode("audio"));
    });
    \u0275\u0275text(20, " Speak ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(21, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_21_Template, 3, 1)(22, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_22_Template, 12, 4, "div", 44);
    \u0275\u0275conditionalCreate(23, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Conditional_23_Template, 37, 9, "section", 45);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(24, "div", 10)(25, "h3");
    \u0275\u0275text(26, "Ready to record this chapter?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "p");
    \u0275\u0275text(28, " Defend the voyage with reasoning, not speed. Check your explanation and its exact source connection. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(29, "blockquote");
    \u0275\u0275text(30);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "p");
    \u0275\u0275text(32);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(33, "details")(34, "summary");
    \u0275\u0275text(35, "Optional: test your explanation with the reasoning coach");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "section", 46)(37, "header")(38, "div")(39, "span");
    \u0275\u0275text(40, "Reasoning coach");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(41, "h3", 47);
    \u0275\u0275text(42, "Test your explanation");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(43, "small");
    \u0275\u0275text(44);
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(45, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_For_46_Template, 7, 3, "article", null, _forTrack0);
    \u0275\u0275domElementStart(47, "button", 15);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.askTutor());
    });
    \u0275\u0275text(48);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.workStep() === 0 || ctx_r2.workStep() === 4 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("hidden", ctx_r2.workStep() !== 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.evidence());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("hidden", ctx_r2.workStep() !== 2);
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().responseDraft.prediction ?? "");
    \u0275\u0275advance();
    \u0275\u0275domProperty("hidden", ctx_r2.workStep() !== 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.question);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().responseDraft.responseMode === "text");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().responseDraft.responseMode === "audio");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.state().responseDraft.responseMode === "text" ? 21 : 22);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.config.learning?.requireCitation ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("hidden", ctx_r2.workStep() !== 4);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().responseDraft.text || ctx_r2.runtime.state().responseDraft.transcript, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().responseDraft.citations?.length ?? 0, " explained source connections saved. ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.runtime.tutorAvailable ? "Tutor connection ready" : "Built-in question");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.state().responseDraft.tutorTurns ?? \u0275\u0275pureFunction0(16, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r2.runtime.tutorBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.tutorBusy() ? "Preparing a question\u2026" : "Ask for a reasoning question", " ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToWorkStep(ctx_r2.workStep() - 1));
    });
    \u0275\u0275text(1, "\u2190 Back");
    \u0275\u0275domElementEnd();
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 77);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToWorkStep(ctx_r2.workStep() + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", !ctx_r2.canVisitWorkStep(ctx_r2.workStep() + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Complete ", ctx_r2.workSteps[ctx_r2.workStep()], " \xB7 Continue to ", ctx_r2.workSteps[ctx_r2.workStep() + 1], " \u2192 ");
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_21_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 78);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.completionHint());
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, JourneyDecisionPanelComponent_Conditional_2_Conditional_21_Conditional_0_Template, 2, 1, "p", 78);
    \u0275\u0275domElementStart(1, "button", 77);
    \u0275\u0275domListener("click", function JourneyDecisionPanelComponent_Conditional_2_Conditional_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.recordChapter());
    });
    \u0275\u0275text(2, " Complete chapter & continue \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r2.runtime.canComplete() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r2.runtime.canComplete());
  }
}
function JourneyDecisionPanelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "header")(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2", 5);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "nav", 6);
    \u0275\u0275repeaterCreate(9, JourneyDecisionPanelComponent_Conditional_2_For_10_Template, 4, 4, "button", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(11, JourneyDecisionPanelComponent_Conditional_2_Conditional_11_Template, 4, 1, "p", 8);
    \u0275\u0275domElementStart(12, "div", 9)(13, "div", 10);
    \u0275\u0275conditionalCreate(14, JourneyDecisionPanelComponent_Conditional_2_Conditional_14_Template, 10, 2);
    \u0275\u0275conditionalCreate(15, JourneyDecisionPanelComponent_Conditional_2_Conditional_15_Template, 3, 1, "section", 11)(16, JourneyDecisionPanelComponent_Conditional_2_Conditional_16_Template, 7, 4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(17, JourneyDecisionPanelComponent_Conditional_2_Conditional_17_Template, 49, 17);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "footer", 12);
    \u0275\u0275conditionalCreate(19, JourneyDecisionPanelComponent_Conditional_2_Conditional_19_Template, 2, 0, "button", 13);
    \u0275\u0275conditionalCreate(20, JourneyDecisionPanelComponent_Conditional_2_Conditional_20_Template, 2, 3, "button", 14)(21, JourneyDecisionPanelComponent_Conditional_2_Conditional_21_Template, 3, 2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_9_0;
    let tmp_11_0;
    const step_r20 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r20.kicker);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Chapter ", step_r20.chapter, " \xB7 ", step_r20.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.state().completedSteps.length + 1, " / ", ctx_r2.runtime.config.steps.length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.workSteps);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_6_0 = ctx_r2.runtime.choice()) ? 11 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.workSteps[ctx_r2.workStep()] + " task content \u2014 scroll for details");
    \u0275\u0275advance();
    \u0275\u0275domProperty("hidden", ctx_r2.workStep() !== 0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = step_r20.adventure) ? 14 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r20.choices[0]?.planning ? 15 : 16);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = ctx_r2.runtime.choice()) ? 17 : -1, tmp_11_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.workStep() > 0 ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.workStep() < 4 ? 20 : 21);
  }
}
function JourneyDecisionPanelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 2)(1, "span");
    \u0275\u0275text(2, "Expedition record complete");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h2");
    \u0275\u0275text(4, "Your journey is ready to replay.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "Every choice, explanation, consequence, and route point has been preserved in order.");
    \u0275\u0275domElementEnd()();
  }
}
var JourneyDecisionPanelComponent = class _JourneyDecisionPanelComponent {
  element = inject(ElementRef);
  injector = inject(Injector);
  runtime = inject(JourneyReplayRuntimeService);
  evidence = computed(
    () => {
      const ids = this.runtime.choice()?.evidenceIds ?? [];
      return this.runtime.config.evidence.filter((item) => ids.includes(item.id));
    },
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recording = this.runtime.recording;
  workStep = signal(
    0,
    ...ngDevMode ? [{ debugName: "workStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outcomePreview = computed(
    () => {
      const choice = this.runtime.choice();
      return choice ? resolveJourneyOutcome(this.runtime.config, this.runtime.state(), choice) : void 0;
    },
    ...ngDevMode ? [{ debugName: "outcomePreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastOutcome = computed(
    () => this.runtime.state().completedSteps.at(-1),
    ...ngDevMode ? [{ debugName: "lastOutcome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dismissedOutcome = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "dismissedOutcome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showOutcome = computed(
    () => this.lastOutcome() && this.dismissedOutcome() !== this.lastOutcome()?.stepId,
    ...ngDevMode ? [{ debugName: "showOutcome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outcomeChanges = computed(
    () => {
      const outcome = this.lastOutcome();
      if (!outcome?.resourceBefore || !outcome.resourceAfter)
        return [];
      return this.runtime.config.resources.flatMap((resource) => {
        const before = outcome.resourceBefore[resource.id];
        const after = outcome.resourceAfter[resource.id];
        return before === after ? [] : [__spreadProps(__spreadValues({}, resource), { before, after })];
      });
    },
    ...ngDevMode ? [{ debugName: "outcomeChanges" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completionHint = computed(
    () => {
      if (!this.runtime.ready())
        return "Wait for the journey to finish connecting before recording.";
      if (this.runtime.mediaBusy())
        return "Stop the recording and wait for audio to save.";
      const choice = this.runtime.choice();
      if (!choice)
        return "Choose a mission first.";
      try {
        assertResponse(this.runtime.config, choice, this.runtime.state().responseDraft);
        return "Your explanation and source connection are ready to record.";
      } catch (error) {
        const code = error instanceof Error ? error.message : "";
        if (code === "PREDICTION_REQUIRED")
          return "Add your prediction before recording.";
        if (code === "CITATION_REQUIRED")
          return "Add an explained source paragraph in Explain and cite.";
        if (code === "CITATION_INVALID")
          return "Check the cited paragraph and explain its relevance in at least three words and twelve characters.";
        if (code === "PLANNING_TARGET_REQUIRED")
          return "Choose a map option before recording.";
        if (code === "PLANNING_TEXT_REQUIRED")
          return "Write a specific sponsor plan before sending it.";
        if (code === "PLANNING_SUBMISSION_REQUIRED")
          return "Confirm the mission plan before continuing.";
        return "Write an explanation or transcript of at least three words and twelve characters, or attach your recorded answer.";
      }
    },
    ...ngDevMode ? [{ debugName: "completionHint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workSteps = ["Choose", "Read", "Predict", "Explain", "Record"];
  goToWorkStep(step) {
    if (!this.canVisitWorkStep(step))
      return;
    this.workStep.set(step);
    afterNextRender(() => {
      const panel = this.element.nativeElement.querySelector(".step-body");
      if (panel) {
        panel.scrollTop = 0;
        panel.scrollIntoView?.({ block: "nearest", behavior: "instant" });
        panel.focus({ preventScroll: true });
      }
    }, { injector: this.injector });
  }
  async recordChapter() {
    const completed = await this.runtime.completeCurrentStep();
    if (!completed)
      return;
    this.workStep.set(0);
    afterNextRender(() => {
      const report = this.element.nativeElement.querySelector(".outcome-report");
      report?.scrollIntoView?.({ block: "start", behavior: "instant" });
      report?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  routeOptions = computed(
    () => this.runtime.step()?.choices.map((choice) => ({
      choice,
      route: this.runtime.config.map.routes.find((route) => route.id === choice.routeId)
    })).filter((item) => item.route) ?? [],
    ...ngDevMode ? [{ debugName: "routeOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedPlanningTargetId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "inspectedPlanningTargetId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planning = computed(
    () => this.runtime.choice()?.planning,
    ...ngDevMode ? [{ debugName: "planning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedPlanningTarget = computed(
    () => {
      const id = this.inspectedPlanningTargetId() ?? this.runtime.state().responseDraft.planningTargetId;
      return this.planning()?.targets.find((target) => target.id === id);
    },
    ...ngDevMode ? [{ debugName: "inspectedPlanningTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningRoute = computed(
    () => {
      const routeId = this.inspectedPlanningTarget()?.routeId;
      return this.runtime.config.map.routes.find((route) => route.id === routeId);
    },
    ...ngDevMode ? [{ debugName: "planningRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPlanningTarget = computed(
    () => this.planning()?.targets.find((target) => target.id === this.runtime.state().responseDraft.planningTargetId),
    ...ngDevMode ? [{ debugName: "selectedPlanningTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningReady = computed(
    () => Boolean(this.runtime.choice()?.planning && this.runtime.state().responseDraft.planningSubmitted),
    ...ngDevMode ? [{ debugName: "planningReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canSubmitPlanning = computed(
    () => {
      const draft = this.runtime.state().responseDraft;
      if (!draft.planningTargetId)
        return false;
      return !this.planning()?.planPrompt || hasResponse({ responseMode: "text", text: draft.planningText ?? "", transcript: "" });
    },
    ...ngDevMode ? [{ debugName: "canSubmitPlanning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citationEvidence = computed(
    () => this.evidence().find((item) => item.id === this.citationSource()),
    ...ngDevMode ? [{ debugName: "citationEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citationParagraphs = computed(
    () => this.citationEvidence()?.paragraphs ?? [],
    ...ngDevMode ? [{ debugName: "citationParagraphs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citationSource = signal(
    "",
    ...ngDevMode ? [{ debugName: "citationSource" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citationParagraph = signal(
    "",
    ...ngDevMode ? [{ debugName: "citationParagraph" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citationExplanation = signal(
    "",
    ...ngDevMode ? [{ debugName: "citationExplanation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  destroyed = false;
  recordingSupported = typeof navigator !== "undefined" && navigator.mediaDevices !== void 0 && typeof MediaRecorder !== "undefined";
  mediaRecorder;
  mediaStream;
  chunks = [];
  choose(id) {
    this.runtime.selectChoice(id);
    this.inspectedPlanningTargetId.set(this.runtime.state().responseDraft.planningTargetId);
    const firstSource = this.runtime.choice()?.evidenceIds[0] ?? "";
    this.sourceChanged(firstSource);
    this.goToWorkStep(0);
  }
  canVisitWorkStep(step) {
    if (step === 0)
      return true;
    const choice = this.runtime.choice();
    return Boolean(choice && (!choice.planning || this.planningReady()));
  }
  inspectPlanningTarget(id) {
    if (!this.planning()?.targets.some((target) => target.id === id))
      return;
    this.inspectedPlanningTargetId.set(id);
    this.goToWorkStep(0);
  }
  selectPlanningTarget(id) {
    const planning = this.planning();
    if (!planning?.targets.some((target) => target.id === id))
      return;
    this.inspectedPlanningTargetId.set(id);
    this.runtime.setPlanningTarget(id);
    if (!planning.planPrompt)
      this.runtime.submitPlanning();
  }
  planningTextInput(event) {
    this.runtime.setPlanningText(event.target.value);
  }
  sendPlanning() {
    const draft = this.runtime.state().responseDraft;
    if (!draft.planningTargetId)
      return;
    if (this.planning()?.planPrompt && !hasResponse({ responseMode: "text", text: draft.planningText ?? "", transcript: "" }))
      return;
    this.runtime.submitPlanning();
  }
  addCitation() {
    const evidenceId = this.citationSource();
    const paragraphId = this.citationParagraph();
    const explanation = this.citationExplanation().trim();
    if (!this.citationReady())
      return;
    const prior = this.runtime.state().responseDraft.citations ?? [];
    this.runtime.setCitations([
      ...prior.filter((citation) => citation.evidenceId !== evidenceId || citation.paragraphId !== paragraphId),
      { evidenceId, paragraphId, explanation }
    ]);
    this.citationExplanation.set("");
    this.runtime.flushDraft();
  }
  removeCitation(index) {
    this.runtime.setCitations(this.runtime.state().responseDraft.citations?.filter((_, i) => i !== index) ?? []);
    this.runtime.flushDraft();
  }
  sourceChanged(id) {
    this.citationSource.set(id);
    this.citationParagraph.set(this.evidence().find((item) => item.id === id)?.paragraphs?.[0]?.id ?? "");
  }
  evidenceToggled(evidenceId, event) {
    if (event.target.open)
      this.runtime.markEvidenceViewed(evidenceId);
  }
  evidenceTitle(evidenceId) {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  paragraphLabel(evidenceId, paragraphId) {
    const source = this.runtime.config.evidence.find((item) => item.id === evidenceId);
    const index = source?.paragraphs?.findIndex((paragraph) => paragraph.id === paragraphId) ?? -1;
    return index >= 0 ? `paragraph ${index + 1}` : paragraphId;
  }
  citationReady() {
    return Boolean(this.citationSource() && this.citationParagraph() && hasResponse({ responseMode: "text", text: this.citationExplanation(), transcript: "" }));
  }
  ngOnDestroy() {
    this.destroyed = true;
    if (this.mediaRecorder?.state === "recording")
      this.mediaRecorder.stop();
    this.stopTracks();
    this.recording.set(false);
  }
  responseInput(event) {
    this.runtime.setResponseText(event.target.value);
  }
  transcriptInput(event) {
    this.runtime.setTranscript(event.target.value);
  }
  async audioFileSelected(event) {
    const input2 = event.target;
    const file = input2.files?.[0];
    if (file !== void 0)
      await this.runtime.attachAudio(file, file.name);
    input2.value = "";
  }
  async startRecording() {
    if (!this.recordingSupported || this.runtime.mediaBusy())
      return;
    this.recording.set(true);
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.destroyed) {
        this.stopTracks();
        this.recording.set(false);
        return;
      }
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0)
          this.chunks.push(event.data);
      };
      this.mediaRecorder.onstop = async () => {
        const type = this.mediaRecorder?.mimeType || "audio/webm";
        const blob = new Blob(this.chunks, { type });
        this.stopTracks();
        this.recording.set(false);
        if (!this.destroyed && blob.size > 0)
          await this.runtime.attachAudio(blob);
      };
      this.mediaRecorder.start();
      this.recording.set(true);
    } catch {
      this.stopTracks();
      this.recording.set(false);
      this.runtime.error.set("Microphone access was unavailable. Attach an audio file or use text.");
    }
  }
  stopRecording() {
    if (this.mediaRecorder?.state === "recording")
      this.mediaRecorder.stop();
  }
  stopTracks() {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = void 0;
  }
  static \u0275fac = function JourneyDecisionPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyDecisionPanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyDecisionPanelComponent, selectors: [["app-journey-decision-panel"]], decls: 4, vars: 2, consts: [["aria-labelledby", "journey-step-title", 1, "decision-panel"], ["tabindex", "-1", "aria-label", "Recorded decision consequence", "aria-live", "polite", 1, "outcome-report"], [1, "journey-complete"], [1, "outcome-reflection"], ["type", "button", 3, "click"], ["id", "journey-step-title"], ["aria-label", "Chapter tasks", 1, "work-progress"], ["type", "button", 3, "disabled"], [1, "selected-choice"], ["tabindex", "-1", "role", "region", 1, "step-body"], [3, "hidden"], ["aria-labelledby", "mission-planning-title", 1, "mission-planning"], [1, "work-actions"], ["type", "button"], ["type", "button", 1, "continue", 3, "disabled"], ["type", "button", 3, "click", "disabled"], [1, "learning-brief"], [1, "decision-stakes"], [1, "choose-goal-message"], ["id", "mission-planning-title"], [1, "map-instruction"], ["role", "list", 1, "planning-targets"], ["type", "button", "role", "listitem", 3, "inspected", "selected"], ["tabindex", "-1", 1, "planning-detail"], ["aria-labelledby", "sponsor-plan-title", 1, "sponsor-plan"], ["aria-live", "polite", 1, "planning-result"], ["type", "button", "role", "listitem", 3, "click"], ["type", "button", 1, "select-planning-target", 3, "click"], ["id", "sponsor-plan-title"], ["for", "planning-response"], ["id", "planning-response", "rows", "5", 3, "input", "blur", "value", "placeholder"], ["type", "button", 1, "send-plan", 3, "click", "disabled"], [1, "choices"], ["type", "button", 3, "selected"], ["aria-label", "Compare available routes", 1, "route-comparison"], ["aria-hidden", "true", 1, "choice-icon"], [3, "selected"], ["aria-labelledby", "captains-question", "tabindex", "-1", 1, "reasoning"], [1, "evidence-strip", 3, "hidden"], [1, "prediction-task", 3, "hidden"], ["for", "journey-prediction"], ["id", "journey-prediction", "rows", "3", "placeholder", "I predict this choice will\u2026 because\u2026", 3, "input", "blur", "value"], ["id", "captains-question", 1, "question"], ["role", "group", "aria-label", "Answer format", 1, "response-modes"], [1, "audio-workspace"], ["aria-labelledby", "citation-title", 1, "citation-builder"], ["aria-labelledby", "reasoning-coach-title", 1, "tutor-workspace"], ["id", "reasoning-coach-title"], ["aria-label", "Projected resource tradeoffs", 1, "consequence-preview"], [1, "carried-forward"], [3, "toggle"], ["for", "journey-response"], ["id", "journey-response", "rows", "5", "placeholder", "Use the evidence to explain what you chose and why.", 3, "input", "blur", "value"], [1, "audio-actions"], [1, "file-button"], ["type", "file", "accept", "audio/*", "capture", "user", 3, "change"], ["controls", "", 3, "src"], ["for", "journey-transcript"], ["id", "journey-transcript", "rows", "3", "placeholder", "Add a transcript so every listener can follow your reasoning.", 3, "input", "blur", "value"], ["type", "button", 1, "record"], ["type", "button", 1, "stop"], ["type", "button", 1, "record", 3, "click"], ["type", "button", 1, "stop", 3, "click"], ["id", "citation-title"], [1, "response-frame"], [1, "citation-fields"], [3, "change", "value"], ["value", ""], [3, "value"], [3, "change", "value", "disabled"], ["for", "citation-explanation"], ["id", "citation-explanation", "rows", "3", "placeholder", "This matters because\u2026", 3, "input", "value"], ["type", "button", 1, "add-citation", 3, "click", "disabled"], [1, "citation-list"], [1, "selected-source"], ["type", "button", "aria-label", "Remove this source connection", 3, "click"], ["rows", "3", 3, "input", "blur", "value"], ["type", "button", 1, "continue", 3, "click", "disabled"], [1, "continue-help"]], template: function JourneyDecisionPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, JourneyDecisionPanelComponent_Conditional_1_Template, 15, 3, "section", 1);
      \u0275\u0275conditionalCreate(2, JourneyDecisionPanelComponent_Conditional_2_Template, 22, 13)(3, JourneyDecisionPanelComponent_Conditional_3_Template, 7, 0, "section", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showOutcome() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_1_0 = ctx.runtime.step()) ? 2 : 3, tmp_1_0);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.decision-panel[_ngcontent-%COMP%] {\n  color: #2c271d;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #b7a47c;\n  padding-bottom: 0.8rem;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.journey-complete[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8d532e;\n  font: 850 0.68rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh2[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: clamp(1.35rem, 2vw, 1.8rem);\n  line-height: 1.1;\n}\nheader[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  border: 1px solid #b19a6e;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  color: #6a5738;\n  font-weight: 800;\n  white-space: nowrap;\n}\n.mission[_ngcontent-%COMP%] {\n  margin: 0.9rem 0;\n  color: #4a4030;\n  font-size: 0.95rem;\n  line-height: 1.55;\n}\n.learning-brief[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n  border-color: #9aa489;\n  background: #eef0da;\n}\n.learning-brief[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.learning-brief[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.55rem 0;\n  padding-left: 1.1rem;\n  color: #4b533d;\n  font-size: 0.75rem;\n  line-height: 1.45;\n}\n.learning-brief[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0.55rem 0 0;\n}\n.learning-brief[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 5.5rem 1fr;\n  gap: 0.45rem;\n}\n.learning-brief[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-weight: 850;\n}\n.learning-brief[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #566047;\n  font-size: 0.72rem;\n}\nfieldset[_ngcontent-%COMP%] {\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  margin-bottom: 0.55rem;\n  color: #4f3b22;\n  font-weight: 850;\n}\n.choices[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  width: 100%;\n  min-height: 4.4rem;\n  border: 1px solid #b8a477;\n  border-radius: 0.35rem;\n  padding: 0.7rem;\n  color: #392f21;\n  background: #f3e7c8;\n  text-align: left;\n  cursor: pointer;\n}\n.choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.choices[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #245e62;\n  background: #dfe9dc;\n  box-shadow: inset 0.3rem 0 #2d7372;\n}\n.choices[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 800 0.9rem Georgia, serif;\n}\n.choices[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #665b45;\n  font-size: 0.74rem;\n  line-height: 1.35;\n}\n.route-comparison[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.route-comparison[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #78512d;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.route-comparison[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));\n  gap: 0.4rem;\n  margin-top: 0.35rem;\n}\n.route-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #b8a477;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  background: #eadcb9;\n}\n.route-comparison[_ngcontent-%COMP%]   article.selected[_ngcontent-%COMP%] {\n  border-color: #245e62;\n  background: #dfe9dc;\n}\n.route-comparison[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.route-comparison[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.route-comparison[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 2em;\n  margin-top: 0.15rem;\n  color: #685b43;\n}\n.route-comparison[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n  margin: 0.45rem 0 0;\n}\n.route-comparison[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #786b51;\n  font-size: 0.62rem;\n  text-transform: uppercase;\n}\n.route-comparison[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.reasoning[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border-top: 3px double #a38b5d;\n  padding-top: 0.9rem;\n}\n.evidence-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.7rem;\n}\n.evidence-strip[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: 100%;\n  color: #78512d;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\ndetails[_ngcontent-%COMP%] {\n  flex: 1 1 11rem;\n  border: 1px solid #bca87e;\n  border-radius: 0.3rem;\n  padding: 0.45rem;\n  background: #fff8e4;\n}\nsummary[_ngcontent-%COMP%] {\n  color: #433522;\n  font-size: 0.76rem;\n  font-weight: 800;\n  cursor: pointer;\n}\ndetails[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.4rem;\n  color: #806b4b;\n}\ndetails[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #594b35;\n  font-size: 0.76rem;\n  line-height: 1.4;\n}\n.evidence-strip[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  border-top: 1px solid #dfd1ad;\n  padding-top: 0.5rem;\n}\n.evidence-strip[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.evidence-strip[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  color: #765633;\n  font-size: 0.66rem;\n}\n.evidence-strip[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  font-weight: 600;\n}\n.hint[_ngcontent-%COMP%] {\n  border-left: 0.22rem solid #ad7d40;\n  padding: 0.45rem 0.6rem;\n  color: #605035;\n  background: #efe0b8;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\nh3[_ngcontent-%COMP%] {\n  margin-top: 0.8rem;\n  font-size: 1.1rem;\n}\n.question[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.65rem;\n  color: #3f3528;\n  font-weight: 650;\n  line-height: 1.45;\n}\n.response-modes[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.25rem;\n  margin-bottom: 0.55rem;\n  border: 1px solid #9c895f;\n  border-radius: 0.35rem;\n  padding: 0.2rem;\n  background: #d9c69c;\n}\n.response-modes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.2rem;\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 0.4rem 0.75rem;\n  color: #4b3e29;\n  background: transparent;\n  font-weight: 800;\n  cursor: pointer;\n}\n.response-modes[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #f6ecd3;\n  background: #2b5a57;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: #4e3b25;\n  font-size: 0.75rem;\n  font-weight: 800;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #a58f65;\n  border-radius: 0.35rem;\n  padding: 0.7rem;\n  color: #2c2b27;\n  background: #fffdf3;\n  font:\n    1rem/1.5 ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\ntextarea[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible, \n.file-button[_ngcontent-%COMP%]:focus-within, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #238d94;\n  outline-offset: 2px;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.55rem;\n  border: 1px solid #a58f65;\n  border-radius: 0.35rem;\n  padding: 0.45rem;\n  color: #2c2b27;\n  background: #fffdf3;\n}\n.audio-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.5rem;\n}\n.audio-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.file-button[_ngcontent-%COMP%] {\n  min-height: 2.55rem;\n  border: 1px solid #9d7144;\n  border-radius: 0.35rem;\n  padding: 0.55rem 0.7rem;\n  color: #fff4d9;\n  background: #77432f;\n  font-size: 0.75rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.audio-actions[_ngcontent-%COMP%]   .stop[_ngcontent-%COMP%] {\n  background: #9a352e;\n}\n.file-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  margin: 0;\n  color: #3f3527;\n  background: #ebdbb7;\n}\n.file-button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n}\n.audio-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #665b47;\n  font-size: 0.72rem;\n}\naudio[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 0.55rem;\n}\n.citation-builder[_ngcontent-%COMP%], \n.tutor-workspace[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  border: 1px solid #aa9468;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #f8edcf;\n}\n.citation-builder[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.tutor-workspace[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  align-items: center;\n  padding-bottom: 0.5rem;\n}\n.citation-builder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.tutor-workspace[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.1rem;\n}\n.citation-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.55rem;\n}\n.response-frame[_ngcontent-%COMP%] {\n  margin: 0.55rem 0;\n  border-left: 0.2rem solid #2d7372;\n  padding: 0.45rem 0.55rem;\n  color: #4c523b;\n  background: #e8edd8;\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.add-citation[_ngcontent-%COMP%], \n.tutor-workspace[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 1px solid #28615d;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.7rem;\n  color: #f7eed7;\n  background: #2e6863;\n  font-weight: 800;\n  cursor: pointer;\n}\n.add-citation[_ngcontent-%COMP%]:disabled, \n.tutor-workspace[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.citation-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  margin-top: 0.6rem;\n}\n.citation-list[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #6a5a40;\n  font-size: 0.75rem;\n}\n.citation-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid #d4c29b;\n  padding-top: 0.5rem;\n}\n.citation-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n}\n.citation-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: #564b38;\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.citation-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #7c382d;\n  background: transparent;\n  font-size: 0.7rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.tutor-workspace[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  border-left: 0.2rem solid #8a5a32;\n  padding-left: 0.6rem;\n}\n.tutor-workspace[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  font-size: 0.83rem;\n  line-height: 1.4;\n}\n.tutor-workspace[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0;\n  color: #66523a;\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.tutor-workspace[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n}\n.continue-help[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  color: #6f5537;\n  font-size: 0.72rem;\n  text-align: center;\n}\n.continue[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 3.1rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  margin-top: 0.75rem;\n  border: 1px solid #184f50;\n  border-radius: 0.35rem;\n  color: #f9f1da;\n  background: linear-gradient(#397b73, #225a58);\n  font-weight: 850;\n  cursor: pointer;\n}\n.continue[_ngcontent-%COMP%]:disabled {\n  border-color: #aaa084;\n  color: #817861;\n  background: #d7ccb0;\n  cursor: not-allowed;\n}\n.journey-complete[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 18rem;\n  align-content: center;\n  gap: 0.6rem;\n  text-align: center;\n}\n.journey-complete[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #62543d;\n  line-height: 1.5;\n}\n@media (max-width: 34rem) {\n  .citation-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.decision-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100dvh - 110px);\n}\n.decision-panel[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.work-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin: 8px 0;\n}\n.work-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px;\n  min-height: 44px;\n  background: #f8edcf;\n  color: #30291e;\n  border: 1px solid #8e7349;\n}\n.work-steps[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%] {\n  background: #234c42;\n  color: white;\n}\n.selected-choice[_ngcontent-%COMP%] {\n  margin: 4px 0 8px;\n  font-size: 14px;\n}\n.step-body[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n  padding: 4px 8px;\n  scrollbar-gutter: stable;\n}\n.step-body[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #477363;\n  outline-offset: -2px;\n}\n.work-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 10px 0 0;\n  border-top: 1px solid #aa9067;\n  background: #f0e2bf;\n}\n.work-actions[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.work-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex: 1 1 160px;\n  font-size: 13px;\n  margin: 0;\n}\n.work-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 10px;\n}\n.work-actions[_ngcontent-%COMP%]   .continue[_ngcontent-%COMP%] {\n  margin: 0;\n  width: auto;\n  flex: 1;\n}\n.selected-source[_ngcontent-%COMP%] {\n  max-height: 140px;\n  overflow: auto;\n  padding: 10px;\n  margin: 10px 0;\n  background: #fff6dd;\n}\n@media (max-width: 700px) {\n  .decision-panel[_ngcontent-%COMP%] {\n    max-height: calc(100dvh - 70px);\n  }\n}\n.decision-panel[_ngcontent-%COMP%] {\n  max-height: none;\n}\n.step-body[_ngcontent-%COMP%] {\n  max-height: none;\n}\n.choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 80px;\n}\n.prediction-task[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.prediction-task[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 150px;\n  font-size: 19px;\n}\n.work-actions[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.question[_ngcontent-%COMP%] {\n  font-size: 24px !important;\n  line-height: 1.4;\n}\n.selected-choice[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.mission-planning[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.planning-detail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.choose-goal-message[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8d532e;\n  font-size: 0.68rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.mission-planning[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%], \n.choose-goal-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n}\n.mission-planning[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.choose-goal-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.planning-detail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  color: #554833;\n  line-height: 1.5;\n}\n.map-instruction[_ngcontent-%COMP%] {\n  border-left: 0.2rem solid #2d7372;\n  padding: 0.5rem 0.65rem;\n  background: #e3eadb;\n  font-size: 0.78rem;\n}\n.planning-targets[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));\n  gap: 0.45rem;\n  margin-top: 0.7rem;\n}\n.planning-targets[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  min-height: 5.2rem;\n  border: 1px solid #af986c;\n  border-radius: 0.35rem;\n  padding: 0.65rem;\n  color: #3c3225;\n  background: #f3e7c8;\n  text-align: left;\n  cursor: pointer;\n}\n.planning-targets[_ngcontent-%COMP%]   button.inspected[_ngcontent-%COMP%], \n.planning-targets[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #245e62;\n  background: #dfe9dc;\n  box-shadow: inset 0.25rem 0 #2d7372;\n}\n.planning-targets[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #655842;\n  line-height: 1.35;\n}\n.planning-detail[_ngcontent-%COMP%], \n.sponsor-plan[_ngcontent-%COMP%], \n.planning-result[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  border: 1px solid #a99165;\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #fff6dc;\n}\n.planning-detail[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.65rem 0;\n}\n.planning-detail[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(5.5rem, 0.42fr) 1fr;\n  gap: 0.45rem;\n  border-top: 1px solid #ded0ad;\n  padding-top: 0.35rem;\n}\n.planning-detail[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #755a35;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.planning-detail[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #43392d;\n  font-size: 0.76rem;\n  line-height: 1.35;\n  text-transform: capitalize;\n}\n.select-planning-target[_ngcontent-%COMP%], \n.send-plan[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.75rem;\n  border: 1px solid #245e62;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  color: #fff5dc;\n  background: #2d6965;\n  font-weight: 850;\n  cursor: pointer;\n}\n.sponsor-plan[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.55rem;\n}\n.sponsor-plan[_ngcontent-%COMP%]   .send-plan[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.planning-result[_ngcontent-%COMP%] {\n  border-color: #587656;\n  background: #e3edd7;\n}\n.planning-result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #275646;\n}\n.planning-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  color: #3f513d;\n  line-height: 1.45;\n}\n.visual-choices[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.visual-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: center;\n  justify-items: center;\n  align-content: start;\n  gap: 12px;\n  padding: 20px 12px;\n}\n.visual-choices[_ngcontent-%COMP%]   .choice-icon[_ngcontent-%COMP%] {\n  font: 52px/1.4 system-ui;\n}\n.visual-choices[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n}\n@media (max-width: 620px) {\n  .visual-choices[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .visual-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    grid-template-columns: 60px 1fr;\n    justify-items: start;\n    text-align: left;\n  }\n  .visual-choices[_ngcontent-%COMP%]   .choice-icon[_ngcontent-%COMP%] {\n    grid-row: 1/span 2;\n  }\n}\n.decision-panel[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n.work-progress[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 3px;\n  margin: 12px 0;\n}\n.work-progress[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 5px;\n  min-height: 50px;\n  padding: 6px 2px;\n  border: 1px solid #b4a17a;\n  border-radius: 4px;\n  color: #574a34;\n  background: #ede0bf;\n  font: 700 10px/1.2 system-ui;\n  cursor: pointer;\n}\n.work-progress[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.work-progress[_ngcontent-%COMP%]   button[aria-current][_ngcontent-%COMP%] {\n  background: #245a55;\n  color: #fff4d6;\n  border-color: #245a55;\n}\n.work-progress[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.decision-stakes[_ngcontent-%COMP%] {\n  margin: 10px 0 16px;\n  padding-left: 12px;\n  border-left: 3px solid #a37537;\n  color: #554633;\n  font: 13px/1.6 system-ui;\n}\n.visual-choices[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr);\n}\n.visual-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  grid-template-columns: 36px 1fr;\n  justify-items: start;\n  text-align: left;\n  gap: 5px 10px;\n  padding: 12px;\n}\n.visual-choices[_ngcontent-%COMP%]   .choice-icon[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  font-size: 26px;\n}\n.visual-choices[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.planning-targets[_ngcontent-%COMP%], \n.route-comparison[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr);\n}\n.question[_ngcontent-%COMP%] {\n  font-size: 19px !important;\n}\n.step-body[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n.consequence-preview[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%] {\n  margin: 14px 0;\n  padding: 14px;\n  border: 1px solid #91a292;\n  border-radius: 6px;\n  background: #e4ecdc;\n}\n.consequence-preview[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 19px;\n}\n.consequence-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 7px;\n  font: 12px/1.65 system-ui;\n}\n.consequence-preview[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  display: grid;\n  gap: 5px;\n}\n.consequence-preview[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-bottom: 1px solid #b8c6ad;\n  padding: 5px 0;\n  font-size: 12px;\n}\n.consequence-preview[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%], \n.outcome-report[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.carried-forward[_ngcontent-%COMP%] {\n  border-left: 3px solid #417065;\n  padding-left: 8px;\n}\n.outcome-report[_ngcontent-%COMP%] {\n  margin-top: 0;\n  background: #143e3f;\n  color: #f2e6c5;\n  border-color: #a29a63;\n}\n.outcome-report[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #ecd18b;\n  text-transform: uppercase;\n  font-size: 10px;\n  letter-spacing: 0.1em;\n}\n.outcome-report[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 6px;\n}\n.outcome-report[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  margin-top: 12px;\n  border: 1px solid #d2b76f;\n  border-radius: 4px;\n  color: #203e36;\n  background: #e5ca82;\n  font-weight: 800;\n  cursor: pointer;\n}\n.outcome-reflection[_ngcontent-%COMP%] {\n  color: #c3d9c8;\n}\n.citation-fields[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n/*# sourceMappingURL=journey-decision-panel.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyDecisionPanelComponent, [{
    type: Component,
    args: [{ selector: "app-journey-decision-panel", template: `<section class="decision-panel" aria-labelledby="journey-step-title">
  @if (showOutcome()) {
    <section
      class="outcome-report"
      tabindex="-1"
      aria-label="Recorded decision consequence"
      aria-live="polite"
    >
      <span>Decision recorded \xB7 your experience changes</span>
      @if (runtime.config.historicalFrame) {
        <p>Your crew\u2019s route and experience can change. The historical record stays the same.</p>
      }
      <h3>{{ runtime.config.steps[runtime.state().completedSteps.length - 1]?.title }}</h3>
      <p>{{ lastOutcome()?.consequence }}</p>
      <dl>
        @for (change of outcomeChanges(); track change.id) {
          <div>
            <dt>{{ change.label }}</dt>
            <dd>{{ change.before }} \u2192 {{ change.after }}{{ change.unit }}</dd>
          </div>
        }
      </dl>
      <p class="outcome-reflection">
        Compare this with your prediction. What will you protect in the next decision?
      </p>
      <button type="button" (click)="dismissedOutcome.set(lastOutcome()?.stepId)">
        Continue the adventure \u2192
      </button>
    </section>
  }
  @if (runtime.step(); as step) {
    <header>
      <div>
        <span>{{ step.kicker }}</span>
        <h2 id="journey-step-title">Chapter {{ step.chapter }} \xB7 {{ step.title }}</h2>
      </div>
      <small
        >{{ runtime.state().completedSteps.length + 1 }} / {{ runtime.config.steps.length }}</small
      >
    </header>
    <nav class="work-progress" aria-label="Chapter tasks">
      @for (label of workSteps; track label; let index = $index) {
        <button
          type="button"
          [attr.aria-current]="workStep() === index ? 'step' : null"
          [disabled]="!canVisitWorkStep(index)"
          (click)="goToWorkStep(index)"
        >
          <span>{{ index + 1 }}</span
          >{{ label }}
        </button>
      }
    </nav>

    @if (runtime.choice(); as selected) {
      <p class="selected-choice">
        Your decision: <strong>{{ selected.label }}</strong>
      </p>
    }
    <div
      class="step-body"
      tabindex="-1"
      role="region"
      [attr.aria-label]="workSteps[workStep()] + ' task content \u2014 scroll for details'"
    >
      <div [hidden]="workStep() !== 0">
        @if (step.adventure; as adventure) {
          <details class="learning-brief">
            <summary>Captain\u2019s briefing \xB7 learn to succeed</summary>
            <p>{{ adventure.narrative }}</p>
            <ul>
              @for (goal of adventure.learningGoals; track goal) {
                <li>{{ goal }}</li>
              }
            </ul>
          </details>
          <p class="decision-stakes">{{ adventure.stakes }}</p>
        }
        @if (step.choices[0]?.planning) {
          <section class="mission-planning" aria-labelledby="mission-planning-title">
            @if (runtime.choice(); as choice) {
              @if (choice.planning; as planning) {
                <span>{{
                  planning.mode === 'sponsor' ? 'Sponsor planning' : 'Voyage planning'
                }}</span>
                <h3 id="mission-planning-title">{{ planning.targetPrompt }}</h3>
                <p>{{ planning.prompt }}</p>
                <p class="map-instruction">
                  Select a highlighted place or route on the map, or inspect an option below.
                </p>
                <div class="planning-targets" role="list" [attr.aria-label]="planning.targetPrompt">
                  @for (target of planning.targets; track target.id) {
                    <button
                      type="button"
                      role="listitem"
                      [class.inspected]="inspectedPlanningTarget()?.id === target.id"
                      [class.selected]="
                        runtime.state().responseDraft.planningTargetId === target.id
                      "
                      (click)="inspectPlanningTarget(target.id)"
                    >
                      <strong>{{ target.label }}</strong>
                      <small>{{ target.summary }}</small>
                    </button>
                  }
                </div>

                @if (inspectedPlanningTarget(); as target) {
                  <article class="planning-detail" tabindex="-1">
                    <span>{{
                      planning.mode === 'sponsor' ? 'Potential sponsor' : 'Potential voyage'
                    }}</span>
                    <h3>{{ target.label }}</h3>
                    <p>{{ target.details }}</p>
                    @if (planningRoute(); as route) {
                      <dl>
                        <div>
                          <dt>Distance</dt>
                          <dd>{{ route.distanceLabel }}</dd>
                        </div>
                        <div>
                          <dt>Risk</dt>
                          <dd>{{ route.risk }}</dd>
                        </div>
                        <div>
                          <dt>Conditions</dt>
                          <dd>{{ route.windLabel }}</dd>
                        </div>
                      </dl>
                    }
                    @if (target.facts?.length) {
                      <dl>
                        @for (fact of target.facts; track fact.label) {
                          <div>
                            <dt>{{ fact.label }}</dt>
                            <dd>{{ fact.value }}</dd>
                          </div>
                        }
                      </dl>
                    }
                    <button
                      type="button"
                      class="select-planning-target"
                      [attr.aria-pressed]="
                        runtime.state().responseDraft.planningTargetId === target.id
                      "
                      (click)="selectPlanningTarget(target.id)"
                    >
                      {{
                        runtime.state().responseDraft.planningTargetId === target.id
                          ? 'Selected: ' + target.label
                          : planning.selectionLabel
                      }}
                    </button>
                  </article>
                }

                @if (runtime.state().responseDraft.planningTargetId && planning.planPrompt) {
                  <section class="sponsor-plan" aria-labelledby="sponsor-plan-title">
                    <h3 id="sponsor-plan-title">Build your proposal</h3>
                    <label for="planning-response">{{ planning.planPrompt }}</label>
                    <textarea
                      id="planning-response"
                      rows="5"
                      [value]="runtime.state().responseDraft.planningText ?? ''"
                      [placeholder]="planning.planPlaceholder ?? ''"
                      (input)="planningTextInput($event)"
                      (blur)="runtime.flushDraft()"
                    ></textarea>
                    <button
                      type="button"
                      class="send-plan"
                      [disabled]="!canSubmitPlanning()"
                      (click)="sendPlanning()"
                    >
                      {{ planning.submitLabel ?? 'Confirm plan' }}
                    </button>
                  </section>
                }

                @if (planningReady()) {
                  <section class="planning-result" aria-live="polite">
                    <strong>{{
                      planning.mode === 'sponsor' ? 'Sponsor response' : 'Mission target selected'
                    }}</strong>
                    <p>
                      {{
                        selectedPlanningTarget()?.decisionResponse ??
                          'This destination is now part of your mission plan. You may still change the goal or target before recording the chapter.'
                      }}
                    </p>
                  </section>
                }
              }
            } @else {
              <section class="choose-goal-message">
                <span>First decision</span>
                <h3 id="mission-planning-title">Choose a goal above</h3>
                <p>
                  The map will reveal different routes, sponsors, or unknown regions based on your
                  goal.
                </p>
              </section>
            }
          </section>
        } @else {
          <fieldset>
            <legend>{{ step.choicePrompt }}</legend>
            <div class="choices" [class.visual-choices]="step.choices[0]?.icon">
              @for (choice of step.choices; track choice.id) {
                <button
                  type="button"
                  [class.selected]="runtime.choice()?.id === choice.id"
                  [attr.aria-pressed]="runtime.choice()?.id === choice.id"
                  (click)="choose(choice.id)"
                >
                  @if (choice.icon) {
                    <span class="choice-icon" aria-hidden="true">{{ choice.icon }}</span>
                  }
                  <span>{{ choice.label }}</span>
                  <small>{{ choice.summary }}</small>
                </button>
              }
            </div>
          </fieldset>

          @if (routeOptions().length > 0) {
            <section class="route-comparison" aria-label="Compare available routes">
              <span>Compare before deciding</span>
              <div>
                @for (item of routeOptions(); track item.choice.id) {
                  <article [class.selected]="runtime.choice()?.id === item.choice.id">
                    <strong>{{ item.choice.label }}</strong>
                    <small>{{ item.route?.windLabel }}</small>
                    <dl>
                      <div>
                        <dt>Distance</dt>
                        <dd>{{ item.route?.distanceLabel ?? '\u2014' }}</dd>
                      </div>
                      <div>
                        <dt>Risk</dt>
                        <dd>{{ item.route?.risk ?? '\u2014' }}</dd>
                      </div>
                    </dl>
                  </article>
                }
              </div>
            </section>
          }
        }
      </div>
      @if (runtime.choice(); as choice) {
        @if (workStep() === 0 || workStep() === 4) {
          @if (outcomePreview(); as preview) {
            <section class="consequence-preview" aria-label="Projected resource tradeoffs">
              <h3>What you commit</h3>
              <p>
                Simulated costs with your current cargo and earlier decisions. Changes apply when
                you record the chapter.
              </p>
              <dl>
                @for (change of preview.changes; track change.id) {
                  <div>
                    <dt>{{ change.label }}</dt>
                    <dd>
                      {{ change.before }} \u2192 <strong>{{ change.after }}{{ change.unit }}</strong>
                    </dd>
                  </div>
                }
              </dl>
              @for (effect of preview.carriedForward; track effect) {
                <p class="carried-forward">\u21B3 {{ effect }}</p>
              }
            </section>
          }
        }
        <section class="reasoning" aria-labelledby="captains-question" tabindex="-1">
          <div class="evidence-strip" [hidden]="workStep() !== 1">
            <span>Evidence on the chart</span>
            @for (item of evidence(); track item.id) {
              <details (toggle)="evidenceToggled(item.id, $event)">
                <summary>{{ item.title }}</summary>
                <small>{{ item.sourceLabel }}</small>
                <p>{{ item.summary }}</p>
                @for (paragraph of item.paragraphs ?? []; track paragraph.id; let number = $index) {
                  <blockquote>
                    <b>Paragraph {{ number + 1 }}</b>
                    @if (paragraph.perspective) {
                      <em>{{ paragraph.perspective }}</em>
                    }
                    <p>{{ paragraph.text }}</p>
                  </blockquote>
                }
              </details>
            }
          </div>
          <div class="prediction-task" [hidden]="workStep() !== 2">
            <h3>What might happen?</h3>
            <label for="journey-prediction">Predict the consequence</label>
            <textarea
              id="journey-prediction"
              rows="3"
              [value]="runtime.state().responseDraft.prediction ?? ''"
              placeholder="I predict this choice will\u2026 because\u2026"
              (input)="runtime.setPrediction($any($event.target).value)"
              (blur)="runtime.flushDraft()"
            ></textarea>
          </div>
          <div [hidden]="workStep() !== 3">
            <h3 id="captains-question" class="question">{{ choice.question }}</h3>

            <div class="response-modes" role="group" aria-label="Answer format">
              <button
                type="button"
                [attr.aria-pressed]="runtime.state().responseDraft.responseMode === 'text'"
                (click)="runtime.setResponseMode('text')"
              >
                Write
              </button>
              <button
                type="button"
                [attr.aria-pressed]="runtime.state().responseDraft.responseMode === 'audio'"
                (click)="runtime.setResponseMode('audio')"
              >
                Speak
              </button>
            </div>

            @if (runtime.state().responseDraft.responseMode === 'text') {
              <label for="journey-response">Explain your decision</label>
              <textarea
                id="journey-response"
                rows="5"
                [value]="runtime.state().responseDraft.text"
                placeholder="Use the evidence to explain what you chose and why."
                (input)="responseInput($event)"
                (blur)="runtime.flushDraft()"
              ></textarea>
            } @else {
              <div class="audio-workspace">
                <div class="audio-actions">
                  @if (recordingSupported) {
                    @if (!recording()) {
                      <button type="button" class="record" (click)="startRecording()">
                        \u25CF Record answer
                      </button>
                    } @else {
                      <button type="button" class="stop" (click)="stopRecording()">
                        \u25A0 Stop recording
                      </button>
                    }
                  }
                  <label class="file-button">
                    Attach audio
                    <input
                      type="file"
                      accept="audio/*"
                      capture="user"
                      (change)="audioFileSelected($event)"
                    />
                  </label>
                  <span>{{
                    runtime.mediaState() === 'uploading'
                      ? 'Saving audio\u2026'
                      : runtime.mediaState() === 'ready'
                        ? 'Audio saved'
                        : ''
                  }}</span>
                </div>
                @if (runtime.mediaPreviewUrl(); as audioUrl) {
                  <audio controls [src]="audioUrl">
                    Your browser does not support audio playback.
                  </audio>
                }
                <label for="journey-transcript">Transcript or key sentence</label>
                <textarea
                  id="journey-transcript"
                  rows="3"
                  [value]="runtime.state().responseDraft.transcript"
                  placeholder="Add a transcript so every listener can follow your reasoning."
                  (input)="transcriptInput($event)"
                  (blur)="runtime.flushDraft()"
                ></textarea>
              </div>
            }

            @if (runtime.config.learning?.requireCitation) {
              <section class="citation-builder" aria-labelledby="citation-title">
                <header>
                  <div>
                    <span>Source connection</span>
                    <h3 id="citation-title">Cite one exact paragraph</h3>
                  </div>
                  <small>{{ runtime.state().responseDraft.citations?.length ?? 0 }} added</small>
                </header>
                <p class="response-frame">{{ runtime.config.learning.responseFrame }}</p>
                <div class="citation-fields">
                  <label>
                    Source
                    <select
                      [value]="citationSource()"
                      (change)="sourceChanged($any($event.target).value)"
                    >
                      <option value="">Choose a source</option>
                      @for (item of evidence(); track item.id) {
                        <option [value]="item.id">{{ item.title }}</option>
                      }
                    </select>
                  </label>
                  <label>
                    Paragraph
                    <select
                      [value]="citationParagraph()"
                      (change)="citationParagraph.set($any($event.target).value)"
                      [disabled]="citationParagraphs().length === 0"
                    >
                      <option value="">Choose a paragraph</option>
                      @for (
                        paragraph of citationParagraphs();
                        track paragraph.id;
                        let number = $index
                      ) {
                        <option [value]="paragraph.id">Paragraph {{ number + 1 }}</option>
                      }
                    </select>
                  </label>
                </div>
                @for (paragraph of citationParagraphs(); track paragraph.id) {
                  @if (paragraph.id === citationParagraph()) {
                    <blockquote class="selected-source">{{ paragraph.text }}</blockquote>
                  }
                }
                <label for="citation-explanation"
                  >How does this detail support your decision?</label
                >
                <textarea
                  id="citation-explanation"
                  rows="3"
                  [value]="citationExplanation()"
                  placeholder="This matters because\u2026"
                  (input)="citationExplanation.set($any($event.target).value)"
                ></textarea>
                <button
                  type="button"
                  class="add-citation"
                  [disabled]="!citationReady()"
                  (click)="addCitation()"
                >
                  Add source connection
                </button>
                <div class="citation-list">
                  @for (
                    citation of runtime.state().responseDraft.citations ?? [];
                    track citation.evidenceId + citation.paragraphId;
                    let index = $index
                  ) {
                    <article>
                      <div>
                        <strong
                          >{{ evidenceTitle(citation.evidenceId) }} \xB7
                          {{ paragraphLabel(citation.evidenceId, citation.paragraphId) }}</strong
                        >
                        <p>{{ citation.explanation }}</p>
                      </div>
                      <button
                        type="button"
                        (click)="removeCitation(index)"
                        aria-label="Remove this source connection"
                      >
                        Remove
                      </button>
                    </article>
                  } @empty {
                    <p>Read a source, choose a paragraph, and explain why it matters.</p>
                  }
                </div>
              </section>
            }
          </div>
          <div [hidden]="workStep() !== 4">
            <h3>Ready to record this chapter?</h3>
            <p>
              Defend the voyage with reasoning, not speed. Check your explanation and its exact
              source connection.
            </p>
            <blockquote>
              {{ runtime.state().responseDraft.text || runtime.state().responseDraft.transcript }}
            </blockquote>
            <p>
              {{ runtime.state().responseDraft.citations?.length ?? 0 }} explained source
              connections saved.
            </p>
            <details>
              <summary>Optional: test your explanation with the reasoning coach</summary>
              <section class="tutor-workspace" aria-labelledby="reasoning-coach-title">
                <header>
                  <div>
                    <span>Reasoning coach</span>
                    <h3 id="reasoning-coach-title">Test your explanation</h3>
                  </div>
                  <small>{{
                    runtime.tutorAvailable ? 'Tutor connection ready' : 'Built-in question'
                  }}</small>
                </header>
                @for (turn of runtime.state().responseDraft.tutorTurns ?? []; track turn.id) {
                  <article>
                    <strong>{{ turn.question }}</strong>
                    @if (turn.explanation) {
                      <p>{{ turn.explanation }}</p>
                    }
                    <label>
                      Your reply
                      <textarea
                        rows="3"
                        [value]="turn.answer ?? ''"
                        (input)="runtime.answerTutor(turn.id, $any($event.target).value)"
                        (blur)="runtime.flushDraft()"
                      ></textarea>
                    </label>
                  </article>
                }
                <button type="button" (click)="runtime.askTutor()" [disabled]="runtime.tutorBusy()">
                  {{
                    runtime.tutorBusy() ? 'Preparing a question\u2026' : 'Ask for a reasoning question'
                  }}
                </button>
              </section>
            </details>
          </div>
        </section>
      }
    </div>
    <footer class="work-actions">
      @if (workStep() > 0) {
        <button type="button" (click)="goToWorkStep(workStep() - 1)">\u2190 Back</button>
      }
      @if (workStep() < 4) {
        <button
          type="button"
          class="continue"
          [disabled]="!canVisitWorkStep(workStep() + 1)"
          (click)="goToWorkStep(workStep() + 1)"
        >
          Complete {{ workSteps[workStep()] }} \xB7 Continue to {{ workSteps[workStep() + 1] }} \u2192
        </button>
      } @else {
        @if (!runtime.canComplete()) {
          <p class="continue-help">{{ completionHint() }}</p>
        }
        <button
          class="continue"
          type="button"
          [disabled]="!runtime.canComplete()"
          (click)="recordChapter()"
        >
          Complete chapter & continue \u2192
        </button>
      }
    </footer>
  } @else {
    <section class="journey-complete">
      <span>Expedition record complete</span>
      <h2>Your journey is ready to replay.</h2>
      <p>Every choice, explanation, consequence, and route point has been preserved in order.</p>
    </section>
  }
</section>
`, styles: ['/* src/app/templates/journey-replay/ui/journey-decision-panel.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n* {\n  box-sizing: border-box;\n}\n.decision-panel {\n  color: #2c271d;\n}\nheader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #b7a47c;\n  padding-bottom: 0.8rem;\n}\nheader span,\n.journey-complete > span {\n  color: #8d532e;\n  font: 850 0.68rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\nh2,\nh3 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh2 {\n  margin-top: 0.2rem;\n  font-size: clamp(1.35rem, 2vw, 1.8rem);\n  line-height: 1.1;\n}\nheader small {\n  border: 1px solid #b19a6e;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  color: #6a5738;\n  font-weight: 800;\n  white-space: nowrap;\n}\n.mission {\n  margin: 0.9rem 0;\n  color: #4a4030;\n  font-size: 0.95rem;\n  line-height: 1.55;\n}\n.learning-brief {\n  margin-bottom: 0.9rem;\n  border-color: #9aa489;\n  background: #eef0da;\n}\n.learning-brief > p {\n  margin-top: 0.55rem;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.learning-brief ul {\n  margin: 0.55rem 0;\n  padding-left: 1.1rem;\n  color: #4b533d;\n  font-size: 0.75rem;\n  line-height: 1.45;\n}\n.learning-brief dl {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0.55rem 0 0;\n}\n.learning-brief dl div {\n  display: grid;\n  grid-template-columns: 5.5rem 1fr;\n  gap: 0.45rem;\n}\n.learning-brief dt {\n  font-weight: 850;\n}\n.learning-brief dd {\n  margin: 0;\n  color: #566047;\n  font-size: 0.72rem;\n}\nfieldset {\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\nlegend {\n  margin-bottom: 0.55rem;\n  color: #4f3b22;\n  font-weight: 850;\n}\n.choices {\n  display: grid;\n  gap: 0.5rem;\n}\n.choices button {\n  display: grid;\n  gap: 0.2rem;\n  width: 100%;\n  min-height: 4.4rem;\n  border: 1px solid #b8a477;\n  border-radius: 0.35rem;\n  padding: 0.7rem;\n  color: #392f21;\n  background: #f3e7c8;\n  text-align: left;\n  cursor: pointer;\n}\n.choices button:hover,\n.choices button.selected {\n  border-color: #245e62;\n  background: #dfe9dc;\n  box-shadow: inset 0.3rem 0 #2d7372;\n}\n.choices span {\n  font: 800 0.9rem Georgia, serif;\n}\n.choices small {\n  color: #665b45;\n  font-size: 0.74rem;\n  line-height: 1.35;\n}\n.route-comparison {\n  margin-top: 0.75rem;\n}\n.route-comparison > span {\n  color: #78512d;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.route-comparison > div {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));\n  gap: 0.4rem;\n  margin-top: 0.35rem;\n}\n.route-comparison article {\n  border: 1px solid #b8a477;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  background: #eadcb9;\n}\n.route-comparison article.selected {\n  border-color: #245e62;\n  background: #dfe9dc;\n}\n.route-comparison strong,\n.route-comparison small {\n  display: block;\n}\n.route-comparison small {\n  min-height: 2em;\n  margin-top: 0.15rem;\n  color: #685b43;\n}\n.route-comparison dl {\n  display: flex;\n  gap: 0.65rem;\n  margin: 0.45rem 0 0;\n}\n.route-comparison dt {\n  color: #786b51;\n  font-size: 0.62rem;\n  text-transform: uppercase;\n}\n.route-comparison dd {\n  margin: 0;\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.reasoning {\n  margin-top: 1rem;\n  border-top: 3px double #a38b5d;\n  padding-top: 0.9rem;\n}\n.evidence-strip {\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.7rem;\n}\n.evidence-strip > span {\n  width: 100%;\n  color: #78512d;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\ndetails {\n  flex: 1 1 11rem;\n  border: 1px solid #bca87e;\n  border-radius: 0.3rem;\n  padding: 0.45rem;\n  background: #fff8e4;\n}\nsummary {\n  color: #433522;\n  font-size: 0.76rem;\n  font-weight: 800;\n  cursor: pointer;\n}\ndetails small {\n  display: block;\n  margin-top: 0.4rem;\n  color: #806b4b;\n}\ndetails p {\n  margin-top: 0.25rem;\n  color: #594b35;\n  font-size: 0.76rem;\n  line-height: 1.4;\n}\n.evidence-strip blockquote {\n  margin: 0.55rem 0 0;\n  border-top: 1px solid #dfd1ad;\n  padding-top: 0.5rem;\n}\n.evidence-strip blockquote b,\n.evidence-strip blockquote em {\n  display: block;\n  color: #765633;\n  font-size: 0.66rem;\n}\n.evidence-strip blockquote em {\n  margin-top: 0.12rem;\n  font-weight: 600;\n}\n.hint {\n  border-left: 0.22rem solid #ad7d40;\n  padding: 0.45rem 0.6rem;\n  color: #605035;\n  background: #efe0b8;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\nh3 {\n  margin-top: 0.8rem;\n  font-size: 1.1rem;\n}\n.question {\n  margin: 0.25rem 0 0.65rem;\n  color: #3f3528;\n  font-weight: 650;\n  line-height: 1.45;\n}\n.response-modes {\n  display: inline-flex;\n  gap: 0.25rem;\n  margin-bottom: 0.55rem;\n  border: 1px solid #9c895f;\n  border-radius: 0.35rem;\n  padding: 0.2rem;\n  background: #d9c69c;\n}\n.response-modes button {\n  min-height: 2.2rem;\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 0.4rem 0.75rem;\n  color: #4b3e29;\n  background: transparent;\n  font-weight: 800;\n  cursor: pointer;\n}\n.response-modes button[aria-pressed=true] {\n  color: #f6ecd3;\n  background: #2b5a57;\n}\nlabel {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: #4e3b25;\n  font-size: 0.75rem;\n  font-weight: 800;\n}\ntextarea {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #a58f65;\n  border-radius: 0.35rem;\n  padding: 0.7rem;\n  color: #2c2b27;\n  background: #fffdf3;\n  font:\n    1rem/1.5 ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\ntextarea:focus-visible,\nbutton:focus-visible,\n.file-button:focus-within,\nselect:focus-visible {\n  outline: 3px solid #238d94;\n  outline-offset: 2px;\n}\nselect {\n  width: 100%;\n  min-height: 2.55rem;\n  border: 1px solid #a58f65;\n  border-radius: 0.35rem;\n  padding: 0.45rem;\n  color: #2c2b27;\n  background: #fffdf3;\n}\n.audio-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.5rem;\n}\n.audio-actions button,\n.file-button {\n  min-height: 2.55rem;\n  border: 1px solid #9d7144;\n  border-radius: 0.35rem;\n  padding: 0.55rem 0.7rem;\n  color: #fff4d9;\n  background: #77432f;\n  font-size: 0.75rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.audio-actions .stop {\n  background: #9a352e;\n}\n.file-button {\n  display: inline-flex;\n  align-items: center;\n  margin: 0;\n  color: #3f3527;\n  background: #ebdbb7;\n}\n.file-button input {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n}\n.audio-actions span {\n  color: #665b47;\n  font-size: 0.72rem;\n}\naudio {\n  width: 100%;\n  margin-bottom: 0.55rem;\n}\n.citation-builder,\n.tutor-workspace {\n  margin-top: 0.85rem;\n  border: 1px solid #aa9468;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #f8edcf;\n}\n.citation-builder > header,\n.tutor-workspace > header {\n  align-items: center;\n  padding-bottom: 0.5rem;\n}\n.citation-builder h3,\n.tutor-workspace h3 {\n  margin-top: 0.1rem;\n}\n.citation-fields {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.55rem;\n}\n.response-frame {\n  margin: 0.55rem 0;\n  border-left: 0.2rem solid #2d7372;\n  padding: 0.45rem 0.55rem;\n  color: #4c523b;\n  background: #e8edd8;\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.add-citation,\n.tutor-workspace > button {\n  min-height: 2.5rem;\n  border: 1px solid #28615d;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.7rem;\n  color: #f7eed7;\n  background: #2e6863;\n  font-weight: 800;\n  cursor: pointer;\n}\n.add-citation:disabled,\n.tutor-workspace > button:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.citation-list {\n  display: grid;\n  gap: 0.4rem;\n  margin-top: 0.6rem;\n}\n.citation-list > p {\n  color: #6a5a40;\n  font-size: 0.75rem;\n}\n.citation-list article {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid #d4c29b;\n  padding-top: 0.5rem;\n}\n.citation-list article strong {\n  font-size: 0.72rem;\n}\n.citation-list article p {\n  margin-top: 0.2rem;\n  color: #564b38;\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.citation-list article button {\n  border: 0;\n  color: #7c382d;\n  background: transparent;\n  font-size: 0.7rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.tutor-workspace article {\n  margin-top: 0.6rem;\n  border-left: 0.2rem solid #8a5a32;\n  padding-left: 0.6rem;\n}\n.tutor-workspace article > strong {\n  font-size: 0.83rem;\n  line-height: 1.4;\n}\n.tutor-workspace article > p {\n  margin: 0.3rem 0;\n  color: #66523a;\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.tutor-workspace article label {\n  margin-top: 0.45rem;\n}\n.continue-help {\n  margin-top: 0.4rem;\n  color: #6f5537;\n  font-size: 0.72rem;\n  text-align: center;\n}\n.continue {\n  display: flex;\n  width: 100%;\n  min-height: 3.1rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  margin-top: 0.75rem;\n  border: 1px solid #184f50;\n  border-radius: 0.35rem;\n  color: #f9f1da;\n  background: linear-gradient(#397b73, #225a58);\n  font-weight: 850;\n  cursor: pointer;\n}\n.continue:disabled {\n  border-color: #aaa084;\n  color: #817861;\n  background: #d7ccb0;\n  cursor: not-allowed;\n}\n.journey-complete {\n  display: grid;\n  min-height: 18rem;\n  align-content: center;\n  gap: 0.6rem;\n  text-align: center;\n}\n.journey-complete p {\n  color: #62543d;\n  line-height: 1.5;\n}\n@media (max-width: 34rem) {\n  .citation-fields {\n    grid-template-columns: 1fr;\n  }\n}\n[hidden] {\n  display: none !important;\n}\n.decision-panel {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100dvh - 110px);\n}\n.decision-panel > header {\n  flex: 0 0 auto;\n}\n.work-steps {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin: 8px 0;\n}\n.work-steps button {\n  flex: 1;\n  padding: 8px;\n  min-height: 44px;\n  background: #f8edcf;\n  color: #30291e;\n  border: 1px solid #8e7349;\n}\n.work-steps [aria-current=step] {\n  background: #234c42;\n  color: white;\n}\n.selected-choice {\n  margin: 4px 0 8px;\n  font-size: 14px;\n}\n.step-body {\n  min-height: 0;\n  overflow: auto;\n  padding: 4px 8px;\n  scrollbar-gutter: stable;\n}\n.step-body:focus {\n  outline: 2px solid #477363;\n  outline-offset: -2px;\n}\n.work-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 10px 0 0;\n  border-top: 1px solid #aa9067;\n  background: #f0e2bf;\n}\n.work-actions > span,\n.work-actions p {\n  flex: 1 1 160px;\n  font-size: 13px;\n  margin: 0;\n}\n.work-actions button {\n  min-height: 44px;\n  padding: 10px;\n}\n.work-actions .continue {\n  margin: 0;\n  width: auto;\n  flex: 1;\n}\n.selected-source {\n  max-height: 140px;\n  overflow: auto;\n  padding: 10px;\n  margin: 10px 0;\n  background: #fff6dd;\n}\n@media (max-width: 700px) {\n  .decision-panel {\n    max-height: calc(100dvh - 70px);\n  }\n}\n.decision-panel {\n  max-height: none;\n}\n.step-body {\n  max-height: none;\n}\n.choices button {\n  min-height: 80px;\n}\n.prediction-task h3 {\n  font-size: 25px;\n}\n.prediction-task textarea {\n  min-height: 150px;\n  font-size: 19px;\n}\n.work-actions {\n  flex-wrap: wrap;\n}\n.question {\n  font-size: 24px !important;\n  line-height: 1.4;\n}\n.selected-choice {\n  font-size: 13px;\n}\n.mission-planning > span,\n.planning-detail > span,\n.choose-goal-message > span {\n  color: #8d532e;\n  font-size: 0.68rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.mission-planning > h3,\n.choose-goal-message h3 {\n  margin-top: 0.25rem;\n}\n.mission-planning > p,\n.choose-goal-message p,\n.planning-detail > p {\n  margin-top: 0.45rem;\n  color: #554833;\n  line-height: 1.5;\n}\n.map-instruction {\n  border-left: 0.2rem solid #2d7372;\n  padding: 0.5rem 0.65rem;\n  background: #e3eadb;\n  font-size: 0.78rem;\n}\n.planning-targets {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));\n  gap: 0.45rem;\n  margin-top: 0.7rem;\n}\n.planning-targets button {\n  display: grid;\n  gap: 0.25rem;\n  min-height: 5.2rem;\n  border: 1px solid #af986c;\n  border-radius: 0.35rem;\n  padding: 0.65rem;\n  color: #3c3225;\n  background: #f3e7c8;\n  text-align: left;\n  cursor: pointer;\n}\n.planning-targets button.inspected,\n.planning-targets button.selected {\n  border-color: #245e62;\n  background: #dfe9dc;\n  box-shadow: inset 0.25rem 0 #2d7372;\n}\n.planning-targets small {\n  color: #655842;\n  line-height: 1.35;\n}\n.planning-detail,\n.sponsor-plan,\n.planning-result {\n  margin-top: 0.75rem;\n  border: 1px solid #a99165;\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #fff6dc;\n}\n.planning-detail dl {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.65rem 0;\n}\n.planning-detail dl div {\n  display: grid;\n  grid-template-columns: minmax(5.5rem, 0.42fr) 1fr;\n  gap: 0.45rem;\n  border-top: 1px solid #ded0ad;\n  padding-top: 0.35rem;\n}\n.planning-detail dt {\n  color: #755a35;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.planning-detail dd {\n  margin: 0;\n  color: #43392d;\n  font-size: 0.76rem;\n  line-height: 1.35;\n  text-transform: capitalize;\n}\n.select-planning-target,\n.send-plan {\n  width: 100%;\n  min-height: 2.75rem;\n  border: 1px solid #245e62;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  color: #fff5dc;\n  background: #2d6965;\n  font-weight: 850;\n  cursor: pointer;\n}\n.sponsor-plan h3 {\n  margin: 0 0 0.55rem;\n}\n.sponsor-plan .send-plan {\n  margin-top: 0.5rem;\n}\n.planning-result {\n  border-color: #587656;\n  background: #e3edd7;\n}\n.planning-result strong {\n  color: #275646;\n}\n.planning-result p {\n  margin-top: 0.3rem;\n  color: #3f513d;\n  line-height: 1.45;\n}\n.visual-choices {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.visual-choices button {\n  text-align: center;\n  justify-items: center;\n  align-content: start;\n  gap: 12px;\n  padding: 20px 12px;\n}\n.visual-choices .choice-icon {\n  font: 52px/1.4 system-ui;\n}\n.visual-choices small {\n  font-size: 14px;\n  line-height: 1.5;\n}\n@media (max-width: 620px) {\n  .visual-choices {\n    grid-template-columns: 1fr;\n  }\n  .visual-choices button {\n    grid-template-columns: 60px 1fr;\n    justify-items: start;\n    text-align: left;\n  }\n  .visual-choices .choice-icon {\n    grid-row: 1/span 2;\n  }\n}\n.decision-panel {\n  overflow-wrap: anywhere;\n}\n.work-progress {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 3px;\n  margin: 12px 0;\n}\n.work-progress button {\n  display: grid;\n  justify-items: center;\n  gap: 5px;\n  min-height: 50px;\n  padding: 6px 2px;\n  border: 1px solid #b4a17a;\n  border-radius: 4px;\n  color: #574a34;\n  background: #ede0bf;\n  font: 700 10px/1.2 system-ui;\n  cursor: pointer;\n}\n.work-progress button span {\n  font-size: 13px;\n}\n.work-progress button[aria-current] {\n  background: #245a55;\n  color: #fff4d6;\n  border-color: #245a55;\n}\n.work-progress button:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.decision-stakes {\n  margin: 10px 0 16px;\n  padding-left: 12px;\n  border-left: 3px solid #a37537;\n  color: #554633;\n  font: 13px/1.6 system-ui;\n}\n.visual-choices {\n  grid-template-columns: minmax(0, 1fr);\n}\n.visual-choices button {\n  grid-template-columns: 36px 1fr;\n  justify-items: start;\n  text-align: left;\n  gap: 5px 10px;\n  padding: 12px;\n}\n.visual-choices .choice-icon {\n  grid-row: 1/span 2;\n  font-size: 26px;\n}\n.visual-choices small {\n  font-size: 12px;\n}\n.planning-targets,\n.route-comparison > div {\n  grid-template-columns: minmax(0, 1fr);\n}\n.question {\n  font-size: 19px !important;\n}\n.step-body {\n  overflow: visible;\n}\n.consequence-preview,\n.outcome-report {\n  margin: 14px 0;\n  padding: 14px;\n  border: 1px solid #91a292;\n  border-radius: 6px;\n  background: #e4ecdc;\n}\n.consequence-preview h3,\n.outcome-report h3 {\n  font-size: 19px;\n}\n.consequence-preview p,\n.outcome-report p {\n  margin-top: 7px;\n  font: 12px/1.65 system-ui;\n}\n.consequence-preview dl,\n.outcome-report dl {\n  margin: 10px 0;\n  display: grid;\n  gap: 5px;\n}\n.consequence-preview dl > div,\n.outcome-report dl > div {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-bottom: 1px solid #b8c6ad;\n  padding: 5px 0;\n  font-size: 12px;\n}\n.consequence-preview dd,\n.outcome-report dd {\n  margin: 0;\n}\n.carried-forward {\n  border-left: 3px solid #417065;\n  padding-left: 8px;\n}\n.outcome-report {\n  margin-top: 0;\n  background: #143e3f;\n  color: #f2e6c5;\n  border-color: #a29a63;\n}\n.outcome-report > span {\n  color: #ecd18b;\n  text-transform: uppercase;\n  font-size: 10px;\n  letter-spacing: 0.1em;\n}\n.outcome-report h3 {\n  margin-top: 6px;\n}\n.outcome-report button {\n  width: 100%;\n  min-height: 44px;\n  margin-top: 12px;\n  border: 1px solid #d2b76f;\n  border-radius: 4px;\n  color: #203e36;\n  background: #e5ca82;\n  font-weight: 800;\n  cursor: pointer;\n}\n.outcome-reflection {\n  color: #c3d9c8;\n}\n.citation-fields {\n  grid-template-columns: 1fr;\n}\n/*# sourceMappingURL=journey-decision-panel.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyDecisionPanelComponent, { className: "JourneyDecisionPanelComponent", filePath: "src/app/templates/journey-replay/ui/journey-decision-panel.component.ts", lineNumber: 22 });
})();

// src/app/templates/journey-replay/ui/journey-replay-player.component.ts
var _c02 = ["sceneHeading"];
var _c1 = () => [];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.paragraphId;
var _forTrack22 = ($index, $item) => $item.revisedAt;
function JourneyReplayPlayerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function JourneyReplayPlayerComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(1, "Return to journey");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPlayerComponent_Conditional_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-journey-history-context", 18);
    \u0275\u0275elementStart(1, "small");
    \u0275\u0275text(2, "Your recorded experience \xB7 fictional crew");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("history", ctx)("includeEpilogue", ctx_r1.runtime.state().completionStatus === "complete");
  }
}
function JourneyReplayPlayerComponent_Conditional_10_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "audio", 19);
    \u0275\u0275text(1, "Student audio response");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx);
  }
}
function JourneyReplayPlayerComponent_Conditional_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "blockquote");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "cite");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, JourneyReplayPlayerComponent_Conditional_10_Conditional_9_Conditional_4_Template, 2, 1, "audio", 19);
  }
  if (rf & 2) {
    let tmp_7_0;
    const record_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", record_r3.studentResponse.text || record_r3.studentResponse.transcript || "Student audio response", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Student reasoning \xB7 ", record_r3.studentResponse.responseMode);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = record_r3.studentResponse.mediaAssetId && ctx_r1.runtime.mediaPreviewUrl()) ? 4 : -1, tmp_7_0);
  }
}
function JourneyReplayPlayerComponent_Conditional_10_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 ", tag_r4);
  }
}
function JourneyReplayPlayerComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 7)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 16, 0);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, JourneyReplayPlayerComponent_Conditional_10_Conditional_6_Template, 3, 2);
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, JourneyReplayPlayerComponent_Conditional_10_Conditional_9_Template, 5, 3);
    \u0275\u0275elementStart(10, "div", 17);
    \u0275\u0275repeaterCreate(11, JourneyReplayPlayerComponent_Conditional_10_For_12_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_7_0;
    const currentScene_r5 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Scene ", ctx_r1.sceneIndex() + 1, " \xB7 ", currentScene_r5.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(currentScene_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.runtime.config.historicalFrame) ? 6 : -1, tmp_5_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(currentScene_r5.systemNarration);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.stepRecord()) ? 9 : -1, tmp_7_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(currentScene_r5.masteryHighlights);
  }
}
function JourneyReplayPlayerComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 8)(1, "h2");
    \u0275\u0275text(2, "Complete a chapter to begin the replay.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Recorded choices and explanations will become scenes automatically.");
    \u0275\u0275elementEnd()();
  }
}
function JourneyReplayPlayerComponent_For_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 20);
    \u0275\u0275listener("change", function JourneyReplayPlayerComponent_For_22_Conditional_1_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleScene(item_r8.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Include ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", !item_r8.hidden);
  }
}
function JourneyReplayPlayerComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, JourneyReplayPlayerComponent_For_22_Conditional_1_Template, 3, 1, "label");
    \u0275\u0275elementStart(2, "button", 11);
    \u0275\u0275listener("click", function JourneyReplayPlayerComponent_For_22_Template_button_click_2_listener() {
      const item_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectScene(item_r8.id));
    });
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", ctx_r1.scene()?.id === item_r8.id)("hidden", item_r8.hidden);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", item_r8.hidden);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.order + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r8.title, " ");
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const resource_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", resource_r9.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r1.resourceValue(resource_r9.id, false), " \u2192 ", ctx_r1.resourceValue(resource_r9.id, true), " ", resource_r9.unit);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "blockquote");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "Why the student cited it:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const citation_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.source(citation_r10.evidenceId)?.title, " \xB7 ", citation_r10.paragraphId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.paragraph(citation_r10.evidenceId, citation_r10.paragraphId));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", citation_r10.explanation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.source(citation_r10.evidenceId)?.attribution);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Earlier response");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p")(5, "strong");
    \u0275\u0275text(6, "Reason for revision:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const revision_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(revision_r11.response.text);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", revision_r11.reason);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Scripted scaffold question \xB7 advisory example");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p")(5, "strong");
    \u0275\u0275text(6, "Student answer:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9, "Saved with the original response it questioned. No live AI call is made by this sample.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const turn_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(turn_r12.question);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", turn_r12.answer);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "See the first response, feedback, and revision");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_For_4_Template, 8, 2, null, null, _forTrack22);
    \u0275\u0275repeaterCreate(5, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_For_6_Template, 10, 2, null, null, _forTrack02);
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8, "Revised explanation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r13 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(record_r13.responseRevisions);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(record_r13.studentResponse.tutorTurns || \u0275\u0275pureFunction0(1, _c1));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(record_r13.studentResponse.text);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 21)(1, "summary");
    \u0275\u0275text(2, "Read the Captain\u2019s Log and supporting evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 22)(6, "article")(7, "h3");
    \u0275\u0275text(8, "Before the choice \xB7 Prediction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "article")(12, "h3");
    \u0275\u0275text(13, "After the choice \xB7 Recorded consequence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 23);
    \u0275\u0275repeaterCreate(17, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_For_18_Template, 4, 4, "span", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "details")(20, "summary");
    \u0275\u0275text(21, "Inspect the exact source paragraphs");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_For_23_Template, 11, 5, "article", null, _forTrack12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Conditional_24_Template, 11, 2, "details");
    \u0275\u0275elementStart(25, "p", 24);
    \u0275\u0275text(26, " These records show evidence collected. Completion and resource totals do not assign a mastery level. Route conditions and source accounts are classroom reconstructions. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r13 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Captain\u2019s Log \xB7 ", ctx_r1.scene()?.title);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(record_r13.studentResponse.prediction);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(record_r13.consequence);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.runtime.config.resources);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(record_r13.studentResponse.citations || \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(record_r13.responseRevisions?.length ? 24 : -1);
  }
}
function JourneyReplayPlayerComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyReplayPlayerComponent_Conditional_23_Conditional_0_Template, 27, 5, "details", 21);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.stepRecord()) ? 0 : -1, tmp_1_0);
  }
}
var JourneyReplayPlayerComponent = class _JourneyReplayPlayerComponent {
  runtime = inject(JourneyReplayRuntimeService);
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  embedded = input(
    false,
    ...ngDevMode ? [{ debugName: "embedded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  sceneHeading = viewChild(
    "sceneHeading",
    ...ngDevMode ? [{ debugName: "sceneHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closed = output();
  playableScenes = computed(
    () => this.runtime.state().replayTimeline.filter((scene) => !scene.hidden),
    ...ngDevMode ? [{ debugName: "playableScenes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  requestedSceneIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "requestedSceneIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneIndex = computed(
    () => Math.min(this.requestedSceneIndex(), Math.max(0, this.playableScenes().length - 1)),
    ...ngDevMode ? [{ debugName: "sceneIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = computed(
    () => this.playableScenes()[this.sceneIndex()],
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  route = computed(
    () => routeForScene(this.runtime.state(), this.scene()),
    ...ngDevMode ? [{ debugName: "route" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stepRecord = computed(
    () => this.runtime.state().completedSteps.find((record) => record.stepId === this.scene()?.stepId),
    ...ngDevMode ? [{ debugName: "stepRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = false;
  timer;
  togglePlayback() {
    if (this.playing)
      this.pause();
    else
      this.play();
  }
  play() {
    if (this.playableScenes().length === 0 || this.playing)
      return;
    if (this.requestedSceneIndex() >= this.playableScenes().length - 1)
      this.requestedSceneIndex.set(0);
    this.playing = true;
    this.loadSceneAudio();
    this.timer = setInterval(() => this.next(false), this.runtime.config.replay.sceneDurationSeconds * 1e3);
  }
  pause() {
    this.playing = false;
    if (this.timer !== void 0)
      clearInterval(this.timer);
    this.timer = void 0;
  }
  next(focus = true) {
    if (this.requestedSceneIndex() >= this.playableScenes().length - 1) {
      this.pause();
      return;
    }
    this.requestedSceneIndex.update((index) => index + 1);
    this.loadSceneAudio();
    if (focus)
      this.focusScene();
  }
  previous() {
    this.pause();
    this.requestedSceneIndex.update((index) => Math.max(0, index - 1));
    this.loadSceneAudio();
    this.focusScene();
  }
  selectScene(sceneId) {
    const index = this.playableScenes().findIndex((scene) => scene.id === sceneId);
    if (index < 0)
      return;
    this.pause();
    this.requestedSceneIndex.set(index);
    this.loadSceneAudio();
    this.focusScene();
  }
  focusScene() {
    afterNextRender(() => {
      const element = this.sceneHeading()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  toggleScene(sceneId, event) {
    if (this.readOnly())
      return;
    this.pause();
    this.runtime.setSceneHidden(sceneId, !event.target.checked);
    this.requestedSceneIndex.set(Math.min(this.requestedSceneIndex(), Math.max(0, this.playableScenes().length - 1)));
  }
  source(id) {
    return this.runtime.config.evidence.find((item) => item.id === id);
  }
  paragraph(evidenceId, paragraphId) {
    return this.source(evidenceId)?.paragraphs?.find((item) => item.id === paragraphId)?.text ?? "";
  }
  resourceValue(id, after) {
    return (after ? this.stepRecord()?.resourceAfter : this.stepRecord()?.resourceBefore)?.[id];
  }
  close() {
    this.pause();
    this.closed.emit();
  }
  ngOnDestroy() {
    this.pause();
  }
  loadSceneAudio() {
    const response = this.stepRecord()?.studentResponse;
    if (response?.mediaAssetId !== void 0)
      void this.runtime.loadMediaPreview(response.mediaAssetId);
  }
  static \u0275fac = function JourneyReplayPlayerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyReplayPlayerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyReplayPlayerComponent, selectors: [["app-journey-replay-player"]], viewQuery: function JourneyReplayPlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.sceneHeading, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostVars: 2, hostBindings: function JourneyReplayPlayerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("embedded", ctx.readOnly() || ctx.embedded());
    }
  }, inputs: { readOnly: [1, "readOnly"], embedded: [1, "embedded"] }, outputs: { closed: "closed" }, decls: 24, vars: 12, consts: [["sceneHeading", ""], ["aria-labelledby", "replay-title", 1, "replay-shell"], [1, "replay-header"], ["id", "replay-title"], ["type", "button", 1, "close"], [1, "replay-stage"], ["mapLabel", "Animated replay of the recorded student journey", 3, "map", "route", "team"], ["aria-live", "polite", 1, "scene-card"], [1, "empty-replay"], [1, "replay-controls"], ["aria-label", "Playback controls", 1, "transport"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "play", 3, "click", "disabled"], ["aria-label", "Replay scene editor", 1, "scene-editor"], [3, "current", "hidden"], ["type", "button", 1, "close", 3, "click"], ["tabindex", "-1"], ["aria-label", "Mastery evidence collected", 1, "mastery"], [3, "history", "includeEpilogue"], ["controls", "", 3, "src"], ["type", "checkbox", 3, "change", "checked"], [1, "captain-record"], [1, "log-comparison"], [1, "resource-record"], [1, "assessment-note"]], template: function JourneyReplayPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "header", 2)(2, "div")(3, "span");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, JourneyReplayPlayerComponent_Conditional_7_Template, 2, 0, "button", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5);
      \u0275\u0275element(9, "app-living-journey-map", 6);
      \u0275\u0275conditionalCreate(10, JourneyReplayPlayerComponent_Conditional_10_Template, 13, 6, "article", 7)(11, JourneyReplayPlayerComponent_Conditional_11_Template, 5, 0, "article", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "footer", 9)(13, "div", 10)(14, "button", 11);
      \u0275\u0275listener("click", function JourneyReplayPlayerComponent_Template_button_click_14_listener() {
        return ctx.previous();
      });
      \u0275\u0275text(15, "\u2190 Previous");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 12);
      \u0275\u0275listener("click", function JourneyReplayPlayerComponent_Template_button_click_16_listener() {
        return ctx.togglePlayback();
      });
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 11);
      \u0275\u0275listener("click", function JourneyReplayPlayerComponent_Template_button_click_18_listener() {
        return ctx.next();
      });
      \u0275\u0275text(19, " Next \u2192 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13);
      \u0275\u0275repeaterCreate(21, JourneyReplayPlayerComponent_For_22_Template, 6, 8, "div", 14, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, JourneyReplayPlayerComponent_Conditional_23_Template, 1, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Journey replay \xB7 ", ctx.runtime.enrollment.studentDisplayName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.replay.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.readOnly() ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("map", ctx.runtime.config.map)("route", ctx.route())("team", ctx.runtime.config.team);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.scene()) ? 10 : 11, tmp_6_0);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.sceneIndex() === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.playableScenes().length === 0);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.playing ? "Pause" : "Play my journey", " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.sceneIndex() >= ctx.playableScenes().length - 1);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.runtime.state().replayTimeline);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.readOnly() ? 23 : -1);
    }
  }, dependencies: [LivingJourneyMapComponent, JourneyHistoryContextComponent], styles: ['\n[_nghost-%COMP%] {\n  position: fixed;\n  z-index: 40;\n  inset: 0;\n  display: block;\n  overflow: auto;\n  color: #f0e4c5;\n  background: #07100f;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.replay-shell[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #25423a,\n      #08110f 55%);\n}\n.replay-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #6f603f;\n  padding: 0.8rem 1rem;\n  background: rgba(13, 26, 23, 0.9098039216);\n}\n.replay-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #bcae82;\n  font-size: 0.67rem;\n  font-weight: 850;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh1[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  font-size: clamp(1.25rem, 2.4vw, 2rem);\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 2.7rem;\n  border: 1px solid #846f43;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.8rem;\n  color: #f0e4c5;\n  background: #263830;\n  font-weight: 800;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #e9c873;\n  background: #3d5548;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #75d5dc;\n  outline-offset: 2px;\n}\n.close[_ngcontent-%COMP%] {\n  background: #523728;\n}\n.replay-stage[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(94rem, 100%);\n  margin: 0 auto;\n  padding: 1rem;\n}\n.scene-card[_ngcontent-%COMP%], \n.empty-replay[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  right: 2rem;\n  bottom: 2rem;\n  width: min(31rem, 100% - 4rem);\n  border: 1px solid #ddbc67;\n  border-left: 0.35rem solid #e6c66b;\n  border-radius: 0.4rem;\n  padding: 1rem;\n  color: #2f2a21;\n  background: rgba(244, 232, 201, 0.9294117647);\n  box-shadow: 0 1rem 3rem rgba(7, 16, 15, 0.7333333333);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.scene-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8d522e;\n  font-size: 0.68rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.scene-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.45rem;\n  font-size: clamp(1.45rem, 3vw, 2.25rem);\n}\n.scene-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #594c37;\n  line-height: 1.5;\n}\nblockquote[_ngcontent-%COMP%] {\n  margin: 0.7rem 0;\n  border-left: 2px solid #9b7947;\n  padding-left: 0.7rem;\n  color: #3e3528;\n  font: italic 1rem/1.45 Georgia, serif;\n}\ncite[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n  color: #7c6848;\n  font: 700 0.65rem ui-sans-serif, sans-serif;\n  text-transform: uppercase;\n}\naudio[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mastery[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.65rem;\n}\n.mastery[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.3rem 0.48rem;\n  color: #285443;\n  background: #d7e7cf;\n  font-size: 0.67rem;\n  font-weight: 800;\n}\n.empty-replay[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n}\n.replay-controls[_ngcontent-%COMP%] {\n  width: min(94rem, 100%);\n  margin: 0 auto;\n  padding: 0 1rem 1.2rem;\n}\n.transport[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.45rem;\n  margin-bottom: 0.8rem;\n}\n.transport[_ngcontent-%COMP%]   .play[_ngcontent-%COMP%] {\n  min-width: 12rem;\n  color: #263026;\n  background: #e0c16d;\n}\n.scene-editor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(10rem, 1fr));\n  gap: 0.45rem;\n  overflow-x: auto;\n  padding-bottom: 0.5rem;\n}\n.scene-editor[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  border: 1px solid #62583f;\n  border-radius: 0.35rem;\n  padding: 0.4rem;\n  background: #121f1b;\n}\n.scene-editor[_ngcontent-%COMP%]    > div.current[_ngcontent-%COMP%] {\n  border-color: #e4c466;\n  background: #223c32;\n}\n.scene-editor[_ngcontent-%COMP%]    > div.hidden[_ngcontent-%COMP%] {\n  opacity: 0.58;\n}\n.scene-editor[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #c9bd9d;\n  font-size: 0.65rem;\n  font-weight: 800;\n}\n.scene-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 3rem;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem;\n  text-align: left;\n}\n.scene-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.5rem;\n  aspect-ratio: 1;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #27352c;\n  background: #dbc074;\n  font-size: 0.7rem;\n}\n@media (max-width: 680px) {\n  .replay-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .scene-card[_ngcontent-%COMP%], \n   .empty-replay[_ngcontent-%COMP%] {\n    position: relative;\n    inset: auto;\n    width: auto;\n    margin: 0.6rem 0 0;\n  }\n  .transport[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .transport[_ngcontent-%COMP%]   .play[_ngcontent-%COMP%] {\n    order: -1;\n    width: 100%;\n  }\n}\n.captain-record[_ngcontent-%COMP%] {\n  padding: 28px;\n  background: #f8f2e4;\n  color: #263d3c;\n  border-radius: 0 0 14px 14px;\n}\n.captain-record[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 1.7rem Georgia, serif;\n}\n.captain-record[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.captain-record[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.captain-record[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  line-height: 1.8;\n}\n.captain-record[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 12px 18px;\n  border-left: 3px solid #ad894d;\n  background: #eee5d2;\n}\n.captain-record[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.73rem;\n}\n.captain-record[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border-top: 1px solid #c7baa0;\n  padding: 17px 0;\n}\n.captain-record[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  font-weight: 700;\n  cursor: pointer;\n}\n.captain-record[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  margin: 14px 0;\n}\n.log-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.resource-record[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 12px 0;\n}\n.resource-record[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  background: #e5e7d7;\n  border-radius: 5px;\n  font-size: 0.8rem;\n}\n.resource-record[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n}\n.assessment-note[_ngcontent-%COMP%] {\n  color: #5c6b61;\n}\n.scene-editor[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.scene-editor[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n@media (max-width: 700px) {\n  .log-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0;\n  }\n  .captain-record[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .replay-controls[_ngcontent-%COMP%]   .transport[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .scene-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n}\n.embedded[_nghost-%COMP%] {\n  position: relative;\n  z-index: auto;\n  inset: auto;\n  overflow: visible;\n  border-radius: 12px;\n}\n.embedded[_nghost-%COMP%]   .replay-shell[_ngcontent-%COMP%] {\n  min-height: 0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.embedded[_nghost-%COMP%]   .scene-card[_ngcontent-%COMP%] {\n  max-height: calc(100% - 2rem);\n  overflow: auto;\n}\n@media (max-width: 680px) {\n  .embedded[_nghost-%COMP%]   .scene-card[_ngcontent-%COMP%] {\n    max-height: none;\n    overflow: visible;\n  }\n}\n.replay-stage[_ngcontent-%COMP%] {\n  --%NS%journey-map-height: clamp(190px, calc(100dvh - 470px), 450px);\n  --%NS%journey-map-min-height: 0px;\n  padding: 8px;\n}\n.replay-header[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n}\n.replay-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.scene-card[_ngcontent-%COMP%] {\n  max-height: calc(100% - 110px);\n  overflow: auto;\n  width: min(350px, 42%);\n  padding: 12px;\n}\n.scene-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.replay-controls[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  z-index: 5;\n  background: #152a23;\n  padding: 8px 12px;\n}\n.scene-editor[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-x: auto;\n  gap: 6px;\n  padding-top: 6px;\n}\n.scene-editor[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1 0 140px;\n}\n.scene-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.captain-record[_ngcontent-%COMP%] {\n  margin: 12px;\n}\n.captain-record[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 12px;\n  font-weight: 700;\n}\n@media (max-width: 680px) {\n  .scene-card[_ngcontent-%COMP%] {\n    position: relative;\n    width: auto;\n    inset: auto;\n    max-height: 190px !important;\n    overflow: auto !important;\n  }\n}\n.replay-stage[_ngcontent-%COMP%] {\n  --%NS%journey-map-height: clamp(160px, calc(100dvh - 535px), 470px);\n}\n/*# sourceMappingURL=journey-replay-player.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyReplayPlayerComponent, [{
    type: Component,
    args: [{ selector: "app-journey-replay-player", host: { "[class.embedded]": "readOnly() || embedded()" }, imports: [LivingJourneyMapComponent, JourneyHistoryContextComponent], template: `<section class="replay-shell" aria-labelledby="replay-title">
  <header class="replay-header">
    <div>
      <span>Journey replay \xB7 {{ runtime.enrollment.studentDisplayName }}</span>
      <h1 id="replay-title">{{ runtime.config.replay.title }}</h1>
    </div>
    @if (!readOnly()) {
      <button type="button" class="close" (click)="close()">Return to journey</button>
    }
  </header>

  <div class="replay-stage">
    <app-living-journey-map
      [map]="runtime.config.map"
      [route]="route()"
      [team]="runtime.config.team"
      mapLabel="Animated replay of the recorded student journey"
    />
    @if (scene(); as currentScene) {
      <article class="scene-card" aria-live="polite">
        <span>Scene {{ sceneIndex() + 1 }} \xB7 {{ currentScene.type }}</span>
        <h2 #sceneHeading tabindex="-1">{{ currentScene.title }}</h2>
        @if (runtime.config.historicalFrame; as history) {
          <app-journey-history-context
            [history]="history"
            [includeEpilogue]="runtime.state().completionStatus === 'complete'"
          />
          <small>Your recorded experience \xB7 fictional crew</small>
        }
        <p>{{ currentScene.systemNarration }}</p>
        @if (stepRecord(); as record) {
          <blockquote>
            {{
              record.studentResponse.text ||
                record.studentResponse.transcript ||
                'Student audio response'
            }}
            <cite>Student reasoning \xB7 {{ record.studentResponse.responseMode }}</cite>
          </blockquote>
          @if (record.studentResponse.mediaAssetId && runtime.mediaPreviewUrl(); as audioUrl) {
            <audio controls [src]="audioUrl">Student audio response</audio>
          }
        }
        <div class="mastery" aria-label="Mastery evidence collected">
          @for (tag of currentScene.masteryHighlights; track tag) {
            <span>\u2713 {{ tag }}</span>
          }
        </div>
      </article>
    } @else {
      <article class="empty-replay">
        <h2>Complete a chapter to begin the replay.</h2>
        <p>Recorded choices and explanations will become scenes automatically.</p>
      </article>
    }
  </div>

  <footer class="replay-controls">
    <div class="transport" aria-label="Playback controls">
      <button type="button" (click)="previous()" [disabled]="sceneIndex() === 0">\u2190 Previous</button>
      <button
        type="button"
        class="play"
        (click)="togglePlayback()"
        [disabled]="playableScenes().length === 0"
      >
        {{ playing ? 'Pause' : 'Play my journey' }}
      </button>
      <button
        type="button"
        (click)="next()"
        [disabled]="sceneIndex() >= playableScenes().length - 1"
      >
        Next \u2192
      </button>
    </div>
    <div class="scene-editor" aria-label="Replay scene editor">
      @for (item of runtime.state().replayTimeline; track item.id) {
        <div [class.current]="scene()?.id === item.id" [class.hidden]="item.hidden">
          @if (!readOnly()) {
            <label>
              <input
                type="checkbox"
                [checked]="!item.hidden"
                (change)="toggleScene(item.id, $event)"
              />
              Include
            </label>
          }
          <button type="button" [disabled]="item.hidden" (click)="selectScene(item.id)">
            <span>{{ item.order + 1 }}</span
            >{{ item.title }}
          </button>
        </div>
      }
    </div>
  </footer>
  @if (readOnly()) {
    @if (stepRecord(); as record) {
      <details class="captain-record">
        <summary>Read the Captain\u2019s Log and supporting evidence</summary>
        <h2>Captain\u2019s Log \xB7 {{ scene()?.title }}</h2>
        <div class="log-comparison">
          <article>
            <h3>Before the choice \xB7 Prediction</h3>
            <p>{{ record.studentResponse.prediction }}</p>
          </article>
          <article>
            <h3>After the choice \xB7 Recorded consequence</h3>
            <p>{{ record.consequence }}</p>
          </article>
        </div>
        <div class="resource-record">
          @for (resource of runtime.config.resources; track resource.id) {
            <span
              >{{ resource.label }}
              <strong
                >{{ resourceValue(resource.id, false) }} \u2192 {{ resourceValue(resource.id, true) }}
                {{ resource.unit }}</strong
              ></span
            >
          }
        </div>
        <details>
          <summary>Inspect the exact source paragraphs</summary>
          @for (citation of record.studentResponse.citations || []; track citation.paragraphId) {
            <article>
              <h3>{{ source(citation.evidenceId)?.title }} \xB7 {{ citation.paragraphId }}</h3>
              <blockquote>{{ paragraph(citation.evidenceId, citation.paragraphId) }}</blockquote>
              <p><strong>Why the student cited it:</strong> {{ citation.explanation }}</p>
              <small>{{ source(citation.evidenceId)?.attribution }}</small>
            </article>
          }
        </details>
        @if (record.responseRevisions?.length) {
          <details>
            <summary>See the first response, feedback, and revision</summary>
            @for (revision of record.responseRevisions; track revision.revisedAt) {
              <h3>Earlier response</h3>
              <p>{{ revision.response.text }}</p>
              <p><strong>Reason for revision:</strong> {{ revision.reason }}</p>
            }
            @for (turn of record.studentResponse.tutorTurns || []; track turn.id) {
              <h3>Scripted scaffold question \xB7 advisory example</h3>
              <p>{{ turn.question }}</p>
              <p><strong>Student answer:</strong> {{ turn.answer }}</p>
              <small
                >Saved with the original response it questioned. No live AI call is made by this
                sample.</small
              >
            }
            <h3>Revised explanation</h3>
            <p>{{ record.studentResponse.text }}</p>
          </details>
        }
        <p class="assessment-note">
          These records show evidence collected. Completion and resource totals do not assign a
          mastery level. Route conditions and source accounts are classroom reconstructions.
        </p>
      </details>
    }
  }
</section>
`, styles: ['/* src/app/templates/journey-replay/ui/journey-replay-player.component.scss */\n:host {\n  position: fixed;\n  z-index: 40;\n  inset: 0;\n  display: block;\n  overflow: auto;\n  color: #f0e4c5;\n  background: #07100f;\n}\n* {\n  box-sizing: border-box;\n}\n.replay-shell {\n  min-height: 100dvh;\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #25423a,\n      #08110f 55%);\n}\n.replay-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #6f603f;\n  padding: 0.8rem 1rem;\n  background: rgba(13, 26, 23, 0.9098039216);\n}\n.replay-header span {\n  color: #bcae82;\n  font-size: 0.67rem;\n  font-weight: 850;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\nh1,\nh2,\np {\n  margin: 0;\n}\nh1,\nh2 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh1 {\n  margin-top: 0.12rem;\n  font-size: clamp(1.25rem, 2.4vw, 2rem);\n}\nbutton {\n  min-height: 2.7rem;\n  border: 1px solid #846f43;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.8rem;\n  color: #f0e4c5;\n  background: #263830;\n  font-weight: 800;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled) {\n  border-color: #e9c873;\n  background: #3d5548;\n}\nbutton:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #75d5dc;\n  outline-offset: 2px;\n}\n.close {\n  background: #523728;\n}\n.replay-stage {\n  position: relative;\n  width: min(94rem, 100%);\n  margin: 0 auto;\n  padding: 1rem;\n}\n.scene-card,\n.empty-replay {\n  position: absolute;\n  z-index: 3;\n  right: 2rem;\n  bottom: 2rem;\n  width: min(31rem, 100% - 4rem);\n  border: 1px solid #ddbc67;\n  border-left: 0.35rem solid #e6c66b;\n  border-radius: 0.4rem;\n  padding: 1rem;\n  color: #2f2a21;\n  background: rgba(244, 232, 201, 0.9294117647);\n  box-shadow: 0 1rem 3rem rgba(7, 16, 15, 0.7333333333);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.scene-card > span {\n  color: #8d522e;\n  font-size: 0.68rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.scene-card h2 {\n  margin: 0.2rem 0 0.45rem;\n  font-size: clamp(1.45rem, 3vw, 2.25rem);\n}\n.scene-card > p {\n  color: #594c37;\n  line-height: 1.5;\n}\nblockquote {\n  margin: 0.7rem 0;\n  border-left: 2px solid #9b7947;\n  padding-left: 0.7rem;\n  color: #3e3528;\n  font: italic 1rem/1.45 Georgia, serif;\n}\ncite {\n  display: block;\n  margin-top: 0.25rem;\n  color: #7c6848;\n  font: 700 0.65rem ui-sans-serif, sans-serif;\n  text-transform: uppercase;\n}\naudio {\n  width: 100%;\n}\n.mastery {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.65rem;\n}\n.mastery span {\n  border-radius: 999px;\n  padding: 0.3rem 0.48rem;\n  color: #285443;\n  background: #d7e7cf;\n  font-size: 0.67rem;\n  font-weight: 800;\n}\n.empty-replay p {\n  margin-top: 0.35rem;\n}\n.replay-controls {\n  width: min(94rem, 100%);\n  margin: 0 auto;\n  padding: 0 1rem 1.2rem;\n}\n.transport {\n  display: flex;\n  justify-content: center;\n  gap: 0.45rem;\n  margin-bottom: 0.8rem;\n}\n.transport .play {\n  min-width: 12rem;\n  color: #263026;\n  background: #e0c16d;\n}\n.scene-editor {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(10rem, 1fr));\n  gap: 0.45rem;\n  overflow-x: auto;\n  padding-bottom: 0.5rem;\n}\n.scene-editor > div {\n  display: grid;\n  gap: 0.25rem;\n  border: 1px solid #62583f;\n  border-radius: 0.35rem;\n  padding: 0.4rem;\n  background: #121f1b;\n}\n.scene-editor > div.current {\n  border-color: #e4c466;\n  background: #223c32;\n}\n.scene-editor > div.hidden {\n  opacity: 0.58;\n}\n.scene-editor label {\n  color: #c9bd9d;\n  font-size: 0.65rem;\n  font-weight: 800;\n}\n.scene-editor button {\n  display: flex;\n  min-height: 3rem;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem;\n  text-align: left;\n}\n.scene-editor button span {\n  display: grid;\n  width: 1.5rem;\n  aspect-ratio: 1;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #27352c;\n  background: #dbc074;\n  font-size: 0.7rem;\n}\n@media (max-width: 680px) {\n  .replay-header {\n    align-items: flex-start;\n  }\n  .scene-card,\n  .empty-replay {\n    position: relative;\n    inset: auto;\n    width: auto;\n    margin: 0.6rem 0 0;\n  }\n  .transport {\n    flex-wrap: wrap;\n  }\n  .transport .play {\n    order: -1;\n    width: 100%;\n  }\n}\n.captain-record {\n  padding: 28px;\n  background: #f8f2e4;\n  color: #263d3c;\n  border-radius: 0 0 14px 14px;\n}\n.captain-record h2 {\n  font: 1.7rem Georgia, serif;\n}\n.captain-record h3 {\n  font-size: 0.9rem;\n}\n.captain-record p,\n.captain-record blockquote {\n  font-size: 0.88rem;\n  line-height: 1.8;\n}\n.captain-record blockquote {\n  margin: 12px 0;\n  padding: 12px 18px;\n  border-left: 3px solid #ad894d;\n  background: #eee5d2;\n}\n.captain-record small {\n  font-size: 0.73rem;\n}\n.captain-record details {\n  border-top: 1px solid #c7baa0;\n  padding: 17px 0;\n}\n.captain-record summary {\n  font-weight: 700;\n  cursor: pointer;\n}\n.captain-record article {\n  margin: 14px 0;\n}\n.log-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.resource-record {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 12px 0;\n}\n.resource-record span {\n  padding: 10px 16px;\n  background: #e5e7d7;\n  border-radius: 5px;\n  font-size: 0.8rem;\n}\n.resource-record strong {\n  display: block;\n  margin-top: 5px;\n}\n.assessment-note {\n  color: #5c6b61;\n}\n.scene-editor {\n  min-width: 0;\n}\n.scene-editor > div {\n  min-width: 0;\n}\n@media (max-width: 700px) {\n  .log-comparison {\n    grid-template-columns: 1fr;\n    gap: 0;\n  }\n  .captain-record {\n    padding: 20px;\n  }\n  .replay-controls .transport {\n    flex-wrap: wrap;\n  }\n  .scene-editor button {\n    white-space: normal;\n  }\n}\n:host(.embedded) {\n  position: relative;\n  z-index: auto;\n  inset: auto;\n  overflow: visible;\n  border-radius: 12px;\n}\n:host(.embedded) .replay-shell {\n  min-height: 0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n:host(.embedded) .scene-card {\n  max-height: calc(100% - 2rem);\n  overflow: auto;\n}\n@media (max-width: 680px) {\n  :host(.embedded) .scene-card {\n    max-height: none;\n    overflow: visible;\n  }\n}\n.replay-stage {\n  --journey-map-height: clamp(190px, calc(100dvh - 470px), 450px);\n  --journey-map-min-height: 0px;\n  padding: 8px;\n}\n.replay-header {\n  padding: 10px 16px;\n}\n.replay-header h1 {\n  font-size: 24px;\n}\n.scene-card {\n  max-height: calc(100% - 110px);\n  overflow: auto;\n  width: min(350px, 42%);\n  padding: 12px;\n}\n.scene-card h2 {\n  font-size: 22px;\n}\n.replay-controls {\n  position: sticky;\n  bottom: 0;\n  z-index: 5;\n  background: #152a23;\n  padding: 8px 12px;\n}\n.scene-editor {\n  display: flex;\n  overflow-x: auto;\n  gap: 6px;\n  padding-top: 6px;\n}\n.scene-editor > div {\n  flex: 1 0 140px;\n}\n.scene-editor button {\n  min-height: 44px;\n}\n.captain-record {\n  margin: 12px;\n}\n.captain-record > summary {\n  cursor: pointer;\n  padding: 12px;\n  font-weight: 700;\n}\n@media (max-width: 680px) {\n  .scene-card {\n    position: relative;\n    width: auto;\n    inset: auto;\n    max-height: 190px !important;\n    overflow: auto !important;\n  }\n}\n.replay-stage {\n  --journey-map-height: clamp(160px, calc(100dvh - 535px), 470px);\n}\n/*# sourceMappingURL=journey-replay-player.component.css.map */\n'] }]
  }], null, { readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], embedded: [{ type: Input, args: [{ isSignal: true, alias: "embedded", required: false }] }], sceneHeading: [{ type: ViewChild, args: ["sceneHeading", { isSignal: true }] }], closed: [{ type: Output, args: ["closed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyReplayPlayerComponent, { className: "JourneyReplayPlayerComponent", filePath: "src/app/templates/journey-replay/ui/journey-replay-player.component.ts", lineNumber: 28 });
})();

// src/app/templates/journey-replay/ui/journey-adventure-scene.component.ts
function JourneyAdventureSceneComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 5);
    \u0275\u0275domElement(1, "path", 21)(2, "path", 22)(3, "path", 23);
    \u0275\u0275domElementEnd();
  }
}
function JourneyAdventureSceneComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 24)(1, "path", 25)(2, "path", 26);
  }
}
function JourneyAdventureSceneComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 27);
    \u0275\u0275domElementStart(1, "g", 28);
    \u0275\u0275domElement(2, "path", 29);
    \u0275\u0275domElementEnd();
  }
}
var JourneyAdventureSceneComponent = class _JourneyAdventureSceneComponent {
  adventure = input.required(
    ...ngDevMode ? [{ debugName: "adventure" }] : (
      /* istanbul ignore next */
      []
    )
  );
  location = input.required(
    ...ngDevMode ? [{ debugName: "location" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = signal(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function JourneyAdventureSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyAdventureSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyAdventureSceneComponent, selectors: [["app-journey-adventure-scene"]], inputs: { adventure: [1, "adventure"], location: [1, "location"] }, decls: 31, vars: 12, consts: [["aria-label", "Adventure dispatch", 1, "adventure-scene"], ["aria-hidden", "true", 1, "scene-art"], ["viewBox", "0 0 440 220", "preserveAspectRatio", "xMidYMid slice"], ["cx", "325", "cy", "60", "r", "36", "fill", "#f5ce83", 1, "sun"], ["d", "M-40 45h130c-5-25-42-34-56-16C13 8-19 19-21 33z M270 30h145c-9-20-35-23-47-12-16-20-47-21-59-3-16-5-30 2-39 15", "fill", "#d8e4d9", "opacity", ".3", 1, "cloud"], ["fill", "#294b50"], ["d", "M0 155q55-12 110 0t110 0t110 0t110 0v70H0z", "fill", "#20777f"], [1, "ship"], ["d", "M165 147l19 25h99l28-25z", "fill", "#382e29"], ["d", "M170 147h134l-10 10H180z", "fill", "#b18348"], ["d", "M232 43v107m-39-62v61m73-66v66", "stroke", "#674329", "stroke-width", "4"], ["d", "M237 51q35 23 46 70h-46z M226 56q-37 27-38 65h38z M269 88l27 45h-27z M189 93l-26 40h26z", "fill", "#f2dfb0"], ["d", "M232 42l31 8-31 9z", "fill", "#dc8657"], ["d", "M190 126h89m-94 7h99", "stroke", "#a58252", "opacity", ".7"], ["fill", "none", "stroke", "#86c4bd", "stroke-width", "2", "opacity", ".6", 1, "waves"], ["d", "M-60 179q25-8 50 0t50 0m27 0q25-8 50 0t50 0m27 0q25-8 50 0t50 0m27 0q25-8 50 0t50 0"], ["d", "M0 203q30-8 60 0t60 0m26 0q30-8 60 0t60 0m26 0q30-8 60 0t60 0"], ["d", "M58 62q8-8 16 0 8-8 16 0m12-16q6-6 12 0 6-6 12 0", "stroke", "#dae3ce", "fill", "none", "opacity", ".8"], [1, "location-stamp"], [1, "dispatch"], ["type", "button", 1, "motion-toggle", 3, "click"], ["d", "M0 143V80h28V63h22v80h12V94h40v49h18V52l15-23 15 23v91h20v-37h40v37z"], ["d", "M0 142h220v14H0z", "fill", "#99784e"], ["d", "M18 156v40m44-40v40m44-40v40m44-40v40", "stroke", "#8b6d4c", "stroke-width", "8"], ["d", "M245 147l44-75 16 24 24-47 43 59 33-16 35 37v65z", "fill", "#42675b"], ["d", "M284 143l25-50 16 17 8-47 23 49 39 19 45 8v26z", "fill", "#658573"], ["d", "M260 162q80-30 180-8v18H253", "fill", "#d1b97c"], ["d", "M340-5l-31 63 23-4-26 63 62-78-29 8 28-52", "fill", "#f6e8b3", 1, "lightning"], ["stroke", "#c2dbe2", "opacity", ".45", 1, "rain"], ["d", "M40 10l-12 40m85-24-12 40m60-66-12 40m40 34-12 40m85-55-12 40m-192 14-12 40m85-29-12 40m260-65-12 40m-44 29-12 40"]], template: function JourneyAdventureSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(2, "svg", 2);
      \u0275\u0275domElement(3, "circle", 3)(4, "path", 4);
      \u0275\u0275conditionalCreate(5, JourneyAdventureSceneComponent_Conditional_5_Template, 4, 0, ":svg:g", 5)(6, JourneyAdventureSceneComponent_Conditional_6_Template, 3, 0);
      \u0275\u0275domElement(7, "path", 6);
      \u0275\u0275domElementStart(8, "g", 7);
      \u0275\u0275domElement(9, "path", 8)(10, "path", 9)(11, "path", 10)(12, "path", 11)(13, "path", 12)(14, "path", 13);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "g", 14);
      \u0275\u0275domElement(16, "path", 15)(17, "path", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(18, JourneyAdventureSceneComponent_Conditional_18_Template, 3, 0);
      \u0275\u0275domElement(19, "path", 17);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(20, "span", 18);
      \u0275\u0275text(21);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(22, "div", 19)(23, "span");
      \u0275\u0275text(24, "From the deck \xB7 fictional adventure");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "h2");
      \u0275\u0275text(26);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "p");
      \u0275\u0275text(28);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(29, "button", 20);
      \u0275\u0275domListener("click", function JourneyAdventureSceneComponent_Template_button_click_29_listener() {
        return ctx.paused.set(!ctx.paused());
      });
      \u0275\u0275text(30);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap("adventure-scene " + ctx.adventure().atmosphere);
      \u0275\u0275classProp("paused", ctx.paused());
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.adventure().atmosphere === "harbor" ? 5 : ctx.adventure().atmosphere === "landfall" ? 6 : -1);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.adventure().atmosphere === "storm" ? 18 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("\u2316 ", ctx.location());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.adventure().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.adventure().narrative);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.paused())("aria-label", ctx.paused() ? "Resume scene animation" : "Pause scene animation");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.paused() ? "\u25B6" : "\u2161", " ");
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.adventure-scene[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(140px, 28%) 1fr;\n  color: #f0e6ca;\n  background: #102c30;\n  border-top: 1px solid #8c865f;\n}\n.scene-art[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  min-height: 165px;\n  background: linear-gradient(#214652, #a28765);\n}\nsvg[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.storm[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n  background: linear-gradient(#101d32, #405665);\n}\n.storm[_ngcontent-%COMP%]   .sun[_ngcontent-%COMP%] {\n  opacity: 0.08;\n}\n.location-stamp[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  bottom: 9px;\n  border: 1px solid rgba(196, 189, 135, 0.5019607843);\n  padding: 4px 8px;\n  border-radius: 3px;\n  background: rgba(9, 38, 43, 0.9019607843);\n  font: 700 11px/1.4 system-ui;\n}\n.dispatch[_ngcontent-%COMP%] {\n  align-self: center;\n  padding: 17px 40px 17px 22px;\n}\n.dispatch[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 800 10px/1.5 system-ui;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #d3b87b;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 5px 0 7px;\n  font: 700 clamp(18px, 1.7vw, 25px)/1.15 Georgia, serif;\n}\np[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #ccdcd5;\n  font: 13px/1.65 system-ui;\n}\n.motion-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  width: 32px;\n  height: 32px;\n  border: 1px solid #668381;\n  border-radius: 50%;\n  color: #efdfb8;\n  background: #15393d;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #9ce0dd;\n  outline-offset: 2px;\n}\n.ship[_ngcontent-%COMP%] {\n  transform-origin: 230px 166px;\n  animation: _ngcontent-%COMP%_rock 5s ease-in-out infinite;\n}\n.storm[_ngcontent-%COMP%]   .ship[_ngcontent-%COMP%] {\n  animation-duration: 2.5s;\n}\n.waves[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_drift 6s ease-in-out infinite alternate;\n}\n.rain[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_rain 1.3s linear infinite;\n}\n.lightning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_flash 8s ease-in-out infinite;\n}\n.paused[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  animation-play-state: paused !important;\n}\n@keyframes _ngcontent-%COMP%_rock {\n  0%, 100% {\n    transform: rotate(-3deg) translateY(2px);\n  }\n  50% {\n    transform: rotate(3deg) translateY(-3px);\n  }\n}\n@keyframes _ngcontent-%COMP%_drift {\n  to {\n    transform: translateX(28px);\n  }\n}\n@keyframes _ngcontent-%COMP%_rain {\n  to {\n    transform: translate(-20px, 45px);\n  }\n}\n@keyframes _ngcontent-%COMP%_flash {\n  0%, 78%, 100% {\n    opacity: 0.04;\n  }\n  82%, 88% {\n    opacity: 0.75;\n  }\n}\n@media (max-width: 1100px) {\n  .adventure-scene[_ngcontent-%COMP%] {\n    grid-template-columns: 140px 1fr;\n  }\n  .dispatch[_ngcontent-%COMP%] {\n    padding: 12px 34px 12px 14px;\n  }\n  p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .adventure-scene[_ngcontent-%COMP%] {\n    grid-template-columns: 90px 1fr;\n  }\n  .scene-art[_ngcontent-%COMP%] {\n    min-height: 90px;\n  }\n  .dispatch[_ngcontent-%COMP%] {\n    padding: 8px 36px 8px 10px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  p[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .location-stamp[_ngcontent-%COMP%] {\n    font-size: 9px;\n    left: 3px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n  .motion-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=journey-adventure-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyAdventureSceneComponent, [{
    type: Component,
    args: [{ selector: "app-journey-adventure-scene", template: `<section
  class="adventure-scene"
  [class]="'adventure-scene ' + adventure().atmosphere"
  [class.paused]="paused()"
  aria-label="Adventure dispatch"
>
  <div class="scene-art" aria-hidden="true">
    <svg viewBox="0 0 440 220" preserveAspectRatio="xMidYMid slice">
      <circle class="sun" cx="325" cy="60" r="36" fill="#f5ce83" />
      <path
        class="cloud"
        d="M-40 45h130c-5-25-42-34-56-16C13 8-19 19-21 33z M270 30h145c-9-20-35-23-47-12-16-20-47-21-59-3-16-5-30 2-39 15"
        fill="#d8e4d9"
        opacity=".3"
      />
      @if (adventure().atmosphere === 'harbor') {
        <g fill="#294b50">
          <path d="M0 143V80h28V63h22v80h12V94h40v49h18V52l15-23 15 23v91h20v-37h40v37z" />
          <path d="M0 142h220v14H0z" fill="#99784e" />
          <path d="M18 156v40m44-40v40m44-40v40m44-40v40" stroke="#8b6d4c" stroke-width="8" />
        </g>
      } @else if (adventure().atmosphere === 'landfall') {
        <path d="M245 147l44-75 16 24 24-47 43 59 33-16 35 37v65z" fill="#42675b" />
        <path d="M284 143l25-50 16 17 8-47 23 49 39 19 45 8v26z" fill="#658573" />
        <path d="M260 162q80-30 180-8v18H253" fill="#d1b97c" />
      }
      <path d="M0 155q55-12 110 0t110 0t110 0t110 0v70H0z" fill="#20777f" />
      <g class="ship">
        <path d="M165 147l19 25h99l28-25z" fill="#382e29" />
        <path d="M170 147h134l-10 10H180z" fill="#b18348" />
        <path d="M232 43v107m-39-62v61m73-66v66" stroke="#674329" stroke-width="4" />
        <path
          d="M237 51q35 23 46 70h-46z M226 56q-37 27-38 65h38z M269 88l27 45h-27z M189 93l-26 40h26z"
          fill="#f2dfb0"
        />
        <path d="M232 42l31 8-31 9z" fill="#dc8657" />
        <path d="M190 126h89m-94 7h99" stroke="#a58252" opacity=".7" />
      </g>
      <g class="waves" fill="none" stroke="#86c4bd" stroke-width="2" opacity=".6">
        <path
          d="M-60 179q25-8 50 0t50 0m27 0q25-8 50 0t50 0m27 0q25-8 50 0t50 0m27 0q25-8 50 0t50 0"
        />
        <path d="M0 203q30-8 60 0t60 0m26 0q30-8 60 0t60 0m26 0q30-8 60 0t60 0" />
      </g>
      @if (adventure().atmosphere === 'storm') {
        <path class="lightning" d="M340-5l-31 63 23-4-26 63 62-78-29 8 28-52" fill="#f6e8b3" />
        <g class="rain" stroke="#c2dbe2" opacity=".45">
          <path
            d="M40 10l-12 40m85-24-12 40m60-66-12 40m40 34-12 40m85-55-12 40m-192 14-12 40m85-29-12 40m260-65-12 40m-44 29-12 40"
          />
        </g>
      }
      <path
        d="M58 62q8-8 16 0 8-8 16 0m12-16q6-6 12 0 6-6 12 0"
        stroke="#dae3ce"
        fill="none"
        opacity=".8"
      />
    </svg>
    <span class="location-stamp">\u2316 {{ location() }}</span>
  </div>
  <div class="dispatch">
    <span>From the deck \xB7 fictional adventure</span>
    <h2>{{ adventure().title }}</h2>
    <p>{{ adventure().narrative }}</p>
  </div>
  <button
    type="button"
    class="motion-toggle"
    [attr.aria-pressed]="paused()"
    (click)="paused.set(!paused())"
    [attr.aria-label]="paused() ? 'Resume scene animation' : 'Pause scene animation'"
  >
    {{ paused() ? '\u25B6' : '\u2161' }}
  </button>
</section>
`, styles: ["/* src/app/templates/journey-replay/ui/journey-adventure-scene.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n.adventure-scene {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(140px, 28%) 1fr;\n  color: #f0e6ca;\n  background: #102c30;\n  border-top: 1px solid #8c865f;\n}\n.scene-art {\n  position: relative;\n  overflow: hidden;\n  min-height: 165px;\n  background: linear-gradient(#214652, #a28765);\n}\nsvg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.storm .scene-art {\n  background: linear-gradient(#101d32, #405665);\n}\n.storm .sun {\n  opacity: 0.08;\n}\n.location-stamp {\n  position: absolute;\n  left: 10px;\n  bottom: 9px;\n  border: 1px solid rgba(196, 189, 135, 0.5019607843);\n  padding: 4px 8px;\n  border-radius: 3px;\n  background: rgba(9, 38, 43, 0.9019607843);\n  font: 700 11px/1.4 system-ui;\n}\n.dispatch {\n  align-self: center;\n  padding: 17px 40px 17px 22px;\n}\n.dispatch > span {\n  font: 800 10px/1.5 system-ui;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #d3b87b;\n}\nh2 {\n  margin: 5px 0 7px;\n  font: 700 clamp(18px, 1.7vw, 25px)/1.15 Georgia, serif;\n}\np {\n  margin: 0;\n  color: #ccdcd5;\n  font: 13px/1.65 system-ui;\n}\n.motion-toggle {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  width: 32px;\n  height: 32px;\n  border: 1px solid #668381;\n  border-radius: 50%;\n  color: #efdfb8;\n  background: #15393d;\n  cursor: pointer;\n}\nbutton:focus-visible {\n  outline: 3px solid #9ce0dd;\n  outline-offset: 2px;\n}\n.ship {\n  transform-origin: 230px 166px;\n  animation: rock 5s ease-in-out infinite;\n}\n.storm .ship {\n  animation-duration: 2.5s;\n}\n.waves {\n  animation: drift 6s ease-in-out infinite alternate;\n}\n.rain {\n  animation: rain 1.3s linear infinite;\n}\n.lightning {\n  animation: flash 8s ease-in-out infinite;\n}\n.paused * {\n  animation-play-state: paused !important;\n}\n@keyframes rock {\n  0%, 100% {\n    transform: rotate(-3deg) translateY(2px);\n  }\n  50% {\n    transform: rotate(3deg) translateY(-3px);\n  }\n}\n@keyframes drift {\n  to {\n    transform: translateX(28px);\n  }\n}\n@keyframes rain {\n  to {\n    transform: translate(-20px, 45px);\n  }\n}\n@keyframes flash {\n  0%, 78%, 100% {\n    opacity: 0.04;\n  }\n  82%, 88% {\n    opacity: 0.75;\n  }\n}\n@media (max-width: 1100px) {\n  .adventure-scene {\n    grid-template-columns: 140px 1fr;\n  }\n  .dispatch {\n    padding: 12px 34px 12px 14px;\n  }\n  p {\n    font-size: 12px;\n  }\n}\n@media (max-width: 760px) {\n  .adventure-scene {\n    grid-template-columns: 90px 1fr;\n  }\n  .scene-art {\n    min-height: 90px;\n  }\n  .dispatch {\n    padding: 8px 36px 8px 10px;\n  }\n  h2 {\n    font-size: 16px;\n  }\n  p {\n    display: none;\n  }\n  .location-stamp {\n    font-size: 9px;\n    left: 3px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n  }\n  .motion-toggle {\n    display: none;\n  }\n}\n/*# sourceMappingURL=journey-adventure-scene.component.css.map */\n"] }]
  }], null, { adventure: [{ type: Input, args: [{ isSignal: true, alias: "adventure", required: true }] }], location: [{ type: Input, args: [{ isSignal: true, alias: "location", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyAdventureSceneComponent, { className: "JourneyAdventureSceneComponent", filePath: "src/app/templates/journey-replay/ui/journey-adventure-scene.component.ts", lineNumber: 9 });
})();

// src/app/templates/journey-replay/ui/journey-shell.component.ts
var _c03 = (a0) => ["/projects", a0];
var _c12 = (a0) => ["/projects", a0, "final-demo"];
var _c2 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.term;
var _forTrack23 = ($index, $item) => $item.route.id;
var _forTrack32 = ($index, $item) => $item.stepId;
var _forTrack4 = ($index, $item) => $item.evidenceId + $item.paragraphId;
var _forTrack5 = ($index, $item) => $item.masteryTag;
function JourneyReplayPageComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openClassMap());
    });
    \u0275\u0275text(1, "Class map");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_For_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const resource_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(resource_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().resources[resource_r5.id]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(resource_r5.unit);
  }
}
function JourneyReplayPageComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-journey-adventure-scene", 20);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("adventure", ctx)("location", ctx_r3.currentLocation()?.name ?? "At sea");
  }
}
function JourneyReplayPageComponent_Conditional_75_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_For_35_Template_button_click_0_listener() {
      const lens_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const map_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(map_r7.toggleLens(lens_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lens_r9 = ctx.$implicit;
    const map_r7 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", map_r7.lensOn(lens_r9));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lens_r9, " ");
  }
}
function JourneyReplayPageComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 21)(1, "summary")(2, "span", 8);
    \u0275\u0275text(3, "\u{1F5FA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span")(5, "strong");
    \u0275\u0275text(6, "Map tools");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 33)(10, "fieldset")(11, "legend");
    \u0275\u0275text(12, "Map view");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 34)(14, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_Template_button_click_14_listener() {
      const map_r7 = \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView(map_r7.setCover("regional"));
    });
    \u0275\u0275text(15, " Atlantic ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_Template_button_click_16_listener() {
      const map_r7 = \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView(map_r7.setCover("world"));
    });
    \u0275\u0275text(17, " World ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "fieldset")(19, "legend");
    \u0275\u0275text(20, "Zoom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 35)(22, "button", 36);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_Template_button_click_22_listener() {
      const map_r7 = \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView(map_r7.zoomBy(-0.25));
    });
    \u0275\u0275text(23, " \u2212 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "output", 37);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 38);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_Template_button_click_26_listener() {
      const map_r7 = \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView(map_r7.zoomBy(0.25));
    });
    \u0275\u0275text(27, " + ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_75_Template_button_click_28_listener() {
      const map_r7 = \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView(map_r7.resetView());
    });
    \u0275\u0275text(29, "Fit map");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "fieldset")(31, "legend");
    \u0275\u0275text(32, "Chart overlays");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 39);
    \u0275\u0275repeaterCreate(34, JourneyReplayPageComponent_Conditional_75_For_35_Template, 2, 2, "button", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const map_r7 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(map_r7.cover() === "regional" ? "Atlantic" : "World");
    \u0275\u0275advance(6);
    \u0275\u0275attribute("aria-pressed", map_r7.cover() === "regional");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", map_r7.cover() === "world");
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", map_r7.zoom() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (map_r7.zoom() * 100).toFixed(0), "%");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", map_r7.zoom() >= 2.8);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r3.runtime.config.map.lenses);
  }
}
function JourneyReplayPageComponent_Conditional_76_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Select a glowing route or destination to compare your choices.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "The map opens route facts without taking you away from your voyage.");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_76_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Explore any marked place, or return to the current chapter.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "Your ship, completed route, and current decision location stay visible here.");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "span");
    \u0275\u0275text(2, "Map workspace");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, JourneyReplayPageComponent_Conditional_76_Conditional_3_Template, 4, 0)(4, JourneyReplayPageComponent_Conditional_76_Conditional_4_Template, 4, 0);
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_76_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openDecision());
    });
    \u0275\u0275text(6, "Open current chapter");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.candidateRouteIds().length > 0 || ctx_r3.candidateLocationIds().length > 0 ? 3 : 4);
  }
}
function JourneyReplayPageComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-journey-history-context", 26);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("history", ctx)("includeEpilogue", ctx_r3.runtime.state().completionStatus === "complete");
  }
}
function JourneyReplayPageComponent_Conditional_84_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r12.icon);
  }
}
function JourneyReplayPageComponent_Conditional_84_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_84_For_2_Template_button_click_0_listener() {
      const choice_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.chooseGoal(choice_r12.id));
    });
    \u0275\u0275conditionalCreate(1, JourneyReplayPageComponent_Conditional_84_For_2_Conditional_1_Template, 2, 1, "span", 8);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r12 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r3.runtime.choice()?.id === choice_r12.id);
    \u0275\u0275attribute("aria-pressed", ctx_r3.runtime.choice()?.id === choice_r12.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r12.icon ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r12.label);
  }
}
function JourneyReplayPageComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 27);
    \u0275\u0275repeaterCreate(1, JourneyReplayPageComponent_Conditional_84_For_2_Template, 4, 5, "button", 40, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.planningChoices());
  }
}
function JourneyReplayPageComponent_Conditional_86_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const submission_r14 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(submission_r14.teacherFeedback);
  }
}
function JourneyReplayPageComponent_Conditional_86_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, JourneyReplayPageComponent_Conditional_86_Conditional_7_Conditional_2_Template, 2, 1, "p");
  }
  if (rf & 2) {
    const submission_r14 = ctx;
    \u0275\u0275classProp("approved", submission_r14.status === "approved");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", submission_r14.status === "revision-requested" ? "Revision requested" : submission_r14.status, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(submission_r14.teacherFeedback ? 2 : -1);
  }
}
function JourneyReplayPageComponent_Conditional_86_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Submission creates an authoritative snapshot. Later edits stay separate until you submit again. ");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_86_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Open the signed-in hosted site to submit this local draft.");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_86_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_86_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.submitJourney());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.submission()?.status === "revision-requested" ? "Resubmit journey" : "Submit for review", " ");
  }
}
function JourneyReplayPageComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_86_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openReplay());
    });
    \u0275\u0275text(1, " \u25B6 Play my journey ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "section", 42)(3, "span");
    \u0275\u0275text(4, "Teacher review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 43);
    \u0275\u0275text(6, "Submit the recorded voyage");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, JourneyReplayPageComponent_Conditional_86_Conditional_7_Template, 3, 4)(8, JourneyReplayPageComponent_Conditional_86_Conditional_8_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(9, JourneyReplayPageComponent_Conditional_86_Conditional_9_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(10, JourneyReplayPageComponent_Conditional_86_Conditional_10_Template, 2, 1, "button", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.runtime.submission()) ? 7 : 8, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.runtime.session() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.runtime.canSubmit() ? 10 : -1);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_3_Conditional_17_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r17.term);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r17.definition);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "Words and ideas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl");
    \u0275\u0275repeaterCreate(6, JourneyReplayPageComponent_Conditional_87_Case_3_Conditional_17_For_7_Template, 4, 2, null, null, _forTrack13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const learning_r18 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(learning_r18.scopeNote);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(learning_r18.glossary);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Current heading");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dl")(7, "div")(8, "dt");
    \u0275\u0275text(9, "Driving question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "dt");
    \u0275\u0275text(14, "Student role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dd");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(17, JourneyReplayPageComponent_Conditional_87_Case_3_Conditional_17_Template, 8, 1, "details");
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.runtime.step()?.title || "Journey recorded");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.step()?.mission || ctx_r3.runtime.config.drivingQuestion);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.runtime.config.drivingQuestion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.config.roles.join(" \xB7 "));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = ctx_r3.runtime.config.learning) ? 17 : -1, tmp_8_0);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 50)(1, "span");
    \u0275\u0275text(2, "Possible decision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dl")(8, "div")(9, "dt");
    \u0275\u0275text(10, "Distance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "dt");
    \u0275\u0275text(15, "Risk");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "dt");
    \u0275\u0275text(20, "Wind and navigation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "p", 52);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 53);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_6_Conditional_0_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.chooseInspectedRoute());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const routeChoice_r20 = ctx;
    const route_r21 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(routeChoice_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(routeChoice_r20.summary);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(route_r21.distanceLabel);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(route_r21.risk);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(route_r21.windLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(routeChoice_r20.rationaleHint);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Choose ", routeChoice_r20.label, " ");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_6_Conditional_0_Template, 27, 7, "section", 50);
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional((tmp_6_0 = ctx_r3.inspectedRouteChoice()) ? 0 : -1, tmp_6_0);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_7_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_7_For_6_Template_button_click_0_listener() {
      const item_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.inspectRoute(item_r23.route.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r23 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r23.choice?.label || "Possible route");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r23.route.distanceLabel, " \xB7 ", item_r23.route.risk, " risk");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 49)(1, "span");
    \u0275\u0275text(2, "Routes to this place");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 54);
    \u0275\u0275text(4, "Compare on the map");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_7_For_6_Template, 5, 3, "button", 15, _forTrack23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.inspectedDestinationRoutes());
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl")(1, "div")(2, "dt");
    \u0275\u0275text(3, "Region");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "dt");
    \u0275\u0275text(8, "Coordinates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const location_r24 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(location_r24.regionId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", location_r24.latitude.toFixed(2), "\xB0, ", location_r24.longitude.toFixed(2), "\xB0");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_6_Template, 1, 1)(7, JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_7_Template, 7, 0, "section", 49)(8, JourneyReplayPageComponent_Conditional_87_Case_4_Conditional_8_Template, 11, 3, "dl");
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.inspectedRoute() ? "Route report" : "Map report");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.inspectedLocation()?.name || "Choose a map location");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.inspectedLocation()?.description || "Select any marked port, waypoint, or glowing route to inspect it.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r3.inspectedRoute()) ? 6 : ctx_r3.inspectedDestinationRoutes().length > 0 ? 7 : (tmp_7_0 = ctx_r3.inspectedLocation()) ? 8 : -1, tmp_7_0);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_5_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "header")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "output");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275element(7, "i");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const resource_r25 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(resource_r25.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r3.runtime.state().resources[resource_r25.id], "", resource_r25.unit);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r3.runtime.state().resources[resource_r25.id] / resource_r25.maximum * 100, "%");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Ship's manifest");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Expedition resources");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 55);
    \u0275\u0275repeaterCreate(5, JourneyReplayPageComponent_Conditional_87_Case_5_For_6_Template, 8, 5, "div", null, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.runtime.config.resources);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2, "Prediction:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r26 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", record_r26.studentResponse.prediction);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "blockquote")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const citation_r27 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(citation_r27.paragraphId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", citation_r27.explanation, " ");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r26 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", record_r26.responseRevisions?.length, " earlier response version(s) preserved ");
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mastery_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 ", mastery_r28.masteryTag);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r29);
      const record_r26 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.runtime.openRevision(record_r26.stepId));
    });
    \u0275\u0275text(1, " Revise explanation ");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_5_Template, 4, 1, "p");
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_For_9_Template, 4, 2, "blockquote", null, _forTrack4);
    \u0275\u0275conditionalCreate(10, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_10_Template, 2, 1, "p", 58);
    \u0275\u0275elementStart(11, "footer");
    \u0275\u0275repeaterCreate(12, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_For_13_Template, 2, 1, "span", null, _forTrack5);
    \u0275\u0275conditionalCreate(14, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Conditional_14_Template, 2, 0, "button", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r26 = ctx.$implicit;
    const $index_r30 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Chapter ", $index_r30 + 1, " \xB7 ", ctx_r3.stepTitle(record_r26.stepId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.choiceLabel(record_r26.stepId));
    \u0275\u0275advance();
    \u0275\u0275conditional(record_r26.studentResponse.prediction ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", record_r26.studentResponse.text || record_r26.studentResponse.transcript || "Audio response attached", " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(record_r26.studentResponse.citations ?? \u0275\u0275pureFunction0(7, _c2));
    \u0275\u0275advance(2);
    \u0275\u0275conditional((record_r26.responseRevisions?.length ?? 0) > 0 ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(record_r26.masteryResults);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.runtime.submission()?.status !== "approved" ? 14 : -1);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Your completed decisions and explanations will appear here.");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 57)(1, "span");
    \u0275\u0275text(2, "Preserves the earlier response");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, " Updated explanation ");
    \u0275\u0275elementStart(7, "textarea", 60);
    \u0275\u0275listener("input", function JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template_textarea_input_7_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.updateRevisionText($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, " Why are you revising? ");
    \u0275\u0275elementStart(10, "textarea", 61);
    \u0275\u0275listener("input", function JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template_textarea_input_10_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.revisionReason.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.runtime.revisionStepId.set(void 0));
    });
    \u0275\u0275text(13, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 62);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.saveRevision());
    });
    \u0275\u0275text(15, " Save revision ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Revise ", ctx_r3.stepTitle(ctx));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.revisionDraft().text);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.revisionReason());
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Captain's log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 56);
    \u0275\u0275repeaterCreate(5, JourneyReplayPageComponent_Conditional_87_Case_6_For_6_Template, 15, 8, "article", null, _forTrack32, false, JourneyReplayPageComponent_Conditional_87_Case_6_ForEmpty_7_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, JourneyReplayPageComponent_Conditional_87_Case_6_Conditional_8_Template, 16, 3, "section", 57);
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.state().completedSteps.length, " chapters recorded");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.runtime.state().completedSteps);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_6_0 = ctx_r3.runtime.revisionStepId()) ? 8 : -1, tmp_6_0);
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.downloadBackup("class"));
    });
    \u0275\u0275text(1, "Download class copy");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.runtime.retrySave());
    });
    \u0275\u0275text(1, "Retry save");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_87_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Journey records");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Keep a portable backup");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, " The JSON backup contains decisions, explanations, citations, route points, and revision history. Audio files remain in their media storage. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 63)(7, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Case_7_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.downloadBackup("device"));
    });
    \u0275\u0275text(8, "Download device copy");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_9_Template, 2, 0, "button", 15);
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, " Restore this learner's backup ");
    \u0275\u0275elementStart(12, "input", 64);
    \u0275\u0275listener("change", function JourneyReplayPageComponent_Conditional_87_Case_7_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r32);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.importBackup($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, JourneyReplayPageComponent_Conditional_87_Case_7_Conditional_13_Template, 2, 0, "button", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r3.runtime.conflictRecord() ? 9 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r3.runtime.saveState() === "error" || ctx_r3.runtime.authorityState() === "offline" ? 13 : -1);
  }
}
function JourneyReplayPageComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 28)(1, "button", 47);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeUtility());
    });
    \u0275\u0275text(2, " \xD7 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, JourneyReplayPageComponent_Conditional_87_Case_3_Template, 18, 5)(4, JourneyReplayPageComponent_Conditional_87_Case_4_Template, 9, 4)(5, JourneyReplayPageComponent_Conditional_87_Case_5_Template, 7, 0)(6, JourneyReplayPageComponent_Conditional_87_Case_6_Template, 9, 3)(7, JourneyReplayPageComponent_Conditional_87_Case_7_Template, 14, 2);
    \u0275\u0275elementStart(8, "button", 48);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_87_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeUtility());
    });
    \u0275\u0275text(9, " Keep exploring the map ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const openUtilityName_r35 = ctx;
    \u0275\u0275attribute("aria-label", openUtilityName_r35);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_4_0 = openUtilityName_r35) === "mission" ? 3 : tmp_4_0 === "location" ? 4 : tmp_4_0 === "manifest" ? 5 : tmp_4_0 === "log" ? 6 : tmp_4_0 === "records" ? 7 : -1);
  }
}
function JourneyReplayPageComponent_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 29)(1, "button", 65);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_88_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.returnToJourney());
    });
    \u0275\u0275text(2, " \xD7 Return to map ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-class-journey-map");
    \u0275\u0275elementEnd();
  }
}
function JourneyReplayPageComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 30)(1, "app-journey-replay-player", 66);
    \u0275\u0275listener("closed", function JourneyReplayPageComponent_Conditional_89_Template_app_journey_replay_player_closed_1_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.returnToJourney());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("embedded", true);
  }
}
function JourneyReplayPageComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 31)(1, "div")(2, "span");
    \u0275\u0275text(3, "Two saved copies");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 67);
    \u0275\u0275text(5, "Choose which journey to continue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Download both copies first. Recorded decisions cannot be silently replaced.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_90_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.downloadBackup("device"));
    });
    \u0275\u0275text(10, "Download device");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_90_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.downloadBackup("class"));
    });
    \u0275\u0275text(12, "Download class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_90_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.resolveConflict("device"));
    });
    \u0275\u0275text(14, " Keep device copy ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 9);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_90_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.resolveConflict("class"));
    });
    \u0275\u0275text(16, "Use class copy");
    \u0275\u0275elementEnd()()();
  }
}
function JourneyReplayPageComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 69);
    \u0275\u0275listener("click", function JourneyReplayPageComponent_Conditional_91_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r39);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.clearMessages());
    });
    \u0275\u0275text(4, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("error", ctx_r3.runtime.error());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.error() || ctx_r3.runtime.notice());
  }
}
var JourneyReplayPageComponent = class _JourneyReplayPageComponent {
  runtime = inject(JourneyReplayRuntimeService);
  element = inject(ElementRef);
  injector = inject(Injector);
  view = signal(
    "journey",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  decisionPanel = viewChild(
    JourneyDecisionPanelComponent,
    ...ngDevMode ? [{ debugName: "decisionPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  livingMap = viewChild(
    LivingJourneyMapComponent,
    ...ngDevMode ? [{ debugName: "livingMap" }] : (
      /* istanbul ignore next */
      []
    )
  );
  decisionOpen = signal(
    true,
    ...ngDevMode ? [{ debugName: "decisionOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentLocation = computed(
    () => {
      const id = this.runtime.state().route.at(-1)?.locationId ?? this.runtime.step()?.positionLocationId;
      return this.runtime.config.map.locations.find((location) => location.id === id);
    },
    ...ngDevMode ? [{ debugName: "currentLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  adventure = computed(
    () => this.runtime.step()?.adventure ?? this.runtime.config.steps.at(-1)?.adventure,
    ...ngDevMode ? [{ debugName: "adventure" }] : (
      /* istanbul ignore next */
      []
    )
  );
  utility = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "utility" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedLocation = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "inspectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedRouteId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "inspectedRouteId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revisionReason = signal(
    "",
    ...ngDevMode ? [{ debugName: "revisionReason" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningChoices = computed(
    () => this.runtime.step()?.choices.filter((choice) => choice.planning) ?? [],
    ...ngDevMode ? [{ debugName: "planningChoices" }] : (
      /* istanbul ignore next */
      []
    )
  );
  planningTargets = computed(
    () => this.runtime.choice()?.planning?.targets ?? [],
    ...ngDevMode ? [{ debugName: "planningTargets" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateRouteIds = computed(
    () => {
      const targets = this.planningTargets();
      return targets.length > 0 ? targets.flatMap((target) => target.routeId ? [target.routeId] : []) : this.runtime.step()?.choices.flatMap((choice) => choice.routeId ? [choice.routeId] : []) ?? [];
    },
    ...ngDevMode ? [{ debugName: "candidateRouteIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateRouteLabels = computed(
    () => Object.fromEntries(this.planningTargets().length > 0 ? this.planningTargets().filter((target) => target.routeId !== void 0).map((target) => [target.routeId, target.label]) : (this.runtime.step()?.choices ?? []).filter((choice) => choice.routeId !== void 0).map((choice) => [choice.routeId, choice.label])),
    ...ngDevMode ? [{ debugName: "candidateRouteLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateLocationIds = computed(
    () => this.planningTargets().map((target) => target.locationId),
    ...ngDevMode ? [{ debugName: "candidateLocationIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateLocationLabels = computed(
    () => Object.fromEntries(this.planningTargets().map((target) => [target.locationId, target.label])),
    ...ngDevMode ? [{ debugName: "candidateLocationLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPlanningTarget = computed(
    () => this.planningTargets().find((target) => target.id === this.runtime.state().responseDraft.planningTargetId),
    ...ngDevMode ? [{ debugName: "selectedPlanningTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedRouteId = computed(
    () => this.selectedPlanningTarget()?.routeId ?? this.runtime.choice()?.routeId,
    ...ngDevMode ? [{ debugName: "selectedRouteId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedRoute = computed(
    () => this.runtime.config.map.routes.find((route) => route.id === this.inspectedRouteId()),
    ...ngDevMode ? [{ debugName: "inspectedRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedRouteChoice = computed(
    () => this.runtime.step()?.choices.find((choice) => choice.routeId === this.inspectedRouteId()),
    ...ngDevMode ? [{ debugName: "inspectedRouteChoice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedDestinationRoutes = computed(
    () => {
      const destinationId = this.inspectedLocation()?.id;
      const candidateIds = new Set(this.candidateRouteIds());
      if (!destinationId)
        return [];
      return this.runtime.config.map.routes.filter((route) => candidateIds.has(route.id) && route.toLocationId === destinationId).map((route) => ({
        route,
        choice: this.runtime.step()?.choices.find((choice) => choice.routeId === route.id)
      }));
    },
    ...ngDevMode ? [{ debugName: "inspectedDestinationRoutes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapOnly = computed(
    () => this.view() === "journey" && !this.decisionOpen() && this.utility() === void 0,
    ...ngDevMode ? [{ debugName: "mapOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastFocusedGoalId;
  constructor() {
    bindLessonFocus((lesson) => {
      if (lesson.focusTarget === "journey")
        this.openDecision();
      else if (lesson.focusTarget === "log")
        this.openUtility("log");
      else if (lesson.focusTarget === "replay") {
        if (this.runtime.state().replayTimeline.length)
          this.openReplay();
        else
          this.openDecision();
      }
    });
    effect(() => {
      const map = this.livingMap();
      const choice = this.runtime.choice();
      if (!map || !choice?.planning?.mapFocus || choice.id === this.lastFocusedGoalId)
        return;
      this.lastFocusedGoalId = choice.id;
      map.focusArea(choice.planning.mapFocus);
    });
  }
  openUtility(utility) {
    if (this.utility() === utility) {
      this.closeUtility();
      return;
    }
    this.view.set("journey");
    this.decisionOpen.set(false);
    this.utility.set(utility);
    this.focusTool();
  }
  inspectLocation(location) {
    const planningTarget = this.planningTargets().find((target) => target.locationId === location.id);
    if (planningTarget) {
      this.openDecision();
      this.decisionPanel()?.inspectPlanningTarget(planningTarget.id);
      return;
    }
    this.inspectedLocation.set(location);
    this.inspectedRouteId.set(void 0);
    this.openLocationUtility();
  }
  inspectRoute(routeId) {
    const planningTarget = this.planningTargets().find((target) => target.routeId === routeId);
    if (planningTarget) {
      this.openDecision();
      this.decisionPanel()?.inspectPlanningTarget(planningTarget.id);
      return;
    }
    const route = this.runtime.config.map.routes.find((item) => item.id === routeId);
    if (!route)
      return;
    this.inspectedRouteId.set(routeId);
    this.inspectedLocation.set(this.runtime.config.map.locations.find((location) => location.id === route.toLocationId));
    this.openLocationUtility();
  }
  chooseInspectedRoute() {
    const choice = this.inspectedRouteChoice();
    if (!choice)
      return;
    this.view.set("journey");
    this.utility.set(void 0);
    this.decisionOpen.set(true);
    this.decisionPanel()?.choose(choice.id);
  }
  chooseGoal(choiceId) {
    this.openDecision();
    this.decisionPanel()?.choose(choiceId);
    const focus = this.runtime.choice()?.planning?.mapFocus;
    if (focus) {
      this.lastFocusedGoalId = choiceId;
      this.livingMap()?.focusArea(focus);
    }
  }
  openDecision() {
    this.view.set("journey");
    this.utility.set(void 0);
    this.decisionOpen.set(true);
    this.focusOverlay(".decision-sheet .sheet-close");
  }
  showMapOnly() {
    this.view.set("journey");
    this.utility.set(void 0);
    this.decisionOpen.set(false);
    afterNextRender(() => this.element.nativeElement.querySelector(".world-map")?.focus(), { injector: this.injector });
  }
  focusTool() {
    this.focusOverlay(".utility-close");
  }
  openLocationUtility() {
    this.view.set("journey");
    this.decisionOpen.set(false);
    this.utility.set("location");
    this.focusTool();
  }
  focusOverlay(selector) {
    afterNextRender(() => this.element.nativeElement.querySelector(selector)?.focus({ preventScroll: true }), { injector: this.injector });
  }
  closeUtility() {
    const selector = this.utility() === "mission" ? ".guide-tool" : ".voyage-menu summary";
    this.utility.set(void 0);
    afterNextRender(() => this.element.nativeElement.querySelector(selector)?.focus({ preventScroll: true }), { injector: this.injector });
  }
  openReplay() {
    this.utility.set(void 0);
    this.decisionOpen.set(false);
    this.view.set("replay");
  }
  openClassMap() {
    this.utility.set(void 0);
    this.decisionOpen.set(false);
    this.view.set("class");
  }
  returnToJourney() {
    this.view.set("journey");
    this.decisionOpen.set(false);
  }
  choiceLabel(stepId) {
    const record = this.runtime.state().completedSteps.find((item) => item.stepId === stepId);
    const step = this.runtime.config.steps.find((item) => item.id === stepId);
    return step?.choices.find((choice) => choice.id === record?.choiceId)?.label ?? "Awaiting decision";
  }
  stepTitle(stepId) {
    return this.runtime.config.steps.find((step) => step.id === stepId)?.title ?? stepId;
  }
  updateRevisionText(event) {
    const text = event.target.value;
    this.runtime.revisionDraft.update((draft) => __spreadProps(__spreadValues({}, draft), { responseMode: "text", text }));
  }
  saveRevision() {
    if (this.runtime.saveRevision(this.revisionReason()))
      this.revisionReason.set("");
  }
  downloadBackup(which = "device") {
    const url = URL.createObjectURL(new Blob([this.runtime.exportRecord(which)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `journey-${which}-backup.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  async importBackup(event) {
    const input2 = event.target;
    const file = input2.files?.[0];
    if (file)
      this.runtime.importRecord(await file.text());
    input2.value = "";
  }
  static \u0275fac = function JourneyReplayPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyReplayPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyReplayPageComponent, selectors: [["app-journey-replay-page"]], viewQuery: function JourneyReplayPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.decisionPanel, JourneyDecisionPanelComponent, 5)(ctx.livingMap, LivingJourneyMapComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 92, vars: 48, consts: [["voyageMenu", ""], [1, "journey-page"], [1, "command-bar"], ["routerLink", "/projects", 1, "project-return-link"], [1, "project-title"], [1, "voyage-status"], ["aria-label", "Expedition tools", 1, "artifact-tools"], ["type", "button", 1, "map-home-tool", 3, "click"], ["aria-hidden", "true"], ["type", "button", 3, "click"], ["type", "button", 1, "guide-tool", 3, "click"], [1, "voyage-menu"], [3, "click"], [3, "routerLink"], ["type", "button", 1, "replay-tool", 3, "click", "disabled"], ["type", "button"], ["aria-label", "Journey map and decisions workspace", 1, "map-experience"], [1, "map-canvas"], ["aria-label", "Current expedition resources", 1, "voyage-resources"], ["mapLabel", "Interactive Atlantic journey map. Choose highlighted routes and inspect places.", 3, "locationInspected", "routeInspected", "map", "route", "team", "candidateRouteIds", "candidateRouteLabels", "selectedRouteId", "candidateLocationIds", "candidateLocationLabels", "selectedCandidateLocationId", "activeLocationId", "immersive"], [3, "adventure", "location"], [1, "map-settings", "map-tools-popout"], ["aria-live", "polite", 1, "map-prompt"], ["aria-label", "Current chapter", 1, "decision-sheet", "overlay-sheet", 3, "hidden"], ["type", "button", 1, "sheet-close", 3, "click"], [1, "sheet-scroll"], [3, "history", "includeEpilogue"], ["aria-label", "Choose your expedition affiliation", 1, "mission-goal-tabs"], [1, "utility-sheet", "overlay-sheet"], ["aria-label", "Class voyage overlay", 1, "view-overlay", "class-overlay"], ["aria-label", "Journey replay overlay", 1, "view-overlay", "replay-overlay"], ["role", "alert", "aria-labelledby", "conflict-title", 1, "conflict-banner"], ["role", "status", 1, "toast", 3, "error"], [1, "map-settings-body"], [1, "map-button-row"], [1, "map-button-row", "map-zoom-row"], ["type", "button", "aria-label", "Zoom map out", 3, "click", "disabled"], ["aria-label", "Map zoom level"], ["type", "button", "aria-label", "Zoom map in", 3, "click", "disabled"], [1, "map-button-row", "overlay-buttons"], ["type", "button", 3, "selected"], ["type", "button", 1, "play-journey", 3, "click"], ["aria-labelledby", "submission-title", 1, "submission-card"], ["id", "submission-title"], ["type", "button", 1, "submit-journey"], [1, "submission-state"], ["type", "button", 1, "submit-journey", 3, "click"], ["type", "button", "aria-label", "Close tool and return to map", 1, "utility-close", 3, "click"], ["type", "button", 1, "return-to-map", 3, "click"], ["aria-labelledby", "destination-routes-title", 1, "destination-routes"], ["aria-labelledby", "route-detail-title", 1, "route-detail"], ["id", "route-detail-title"], [1, "route-hint"], ["type", "button", 1, "choose-map-route", 3, "click"], ["id", "destination-routes-title"], [1, "resource-list"], [1, "log-list"], ["aria-labelledby", "revision-title", 1, "revision-editor"], [1, "revision-count"], ["id", "revision-title"], ["rows", "5", 3, "input", "value"], ["rows", "3", 3, "input", "value"], ["type", "button", 1, "save-revision", 3, "click"], [1, "backup-actions"], ["type", "file", "accept", "application/json,.json", 3, "change"], ["type", "button", 1, "view-close", 3, "click"], [3, "closed", "embedded"], ["id", "conflict-title"], ["role", "status", 1, "toast"], ["type", "button", "aria-label", "Dismiss message", 3, "click"]], template: function JourneyReplayPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "main", 1)(1, "app-workspace-tools")(2, "header", 2)(3, "a", 3);
      \u0275\u0275text(4, "\u2190 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "span");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h1");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 5)(11, "span");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div");
      \u0275\u0275element(14, "i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "small");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "nav", 6)(18, "button", 7);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_18_listener() {
        return ctx.showMapOnly();
      });
      \u0275\u0275elementStart(19, "span", 8);
      \u0275\u0275text(20, "\u{1F5FA}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "small");
      \u0275\u0275text(22, "Map");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "button", 9);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_23_listener() {
        return ctx.openDecision();
      });
      \u0275\u0275elementStart(24, "span", 8);
      \u0275\u0275text(25, "\u2637");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "small");
      \u0275\u0275text(27, "Chapter");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 10);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_28_listener() {
        return ctx.openUtility("mission");
      });
      \u0275\u0275elementStart(29, "span", 8);
      \u0275\u0275text(30, "\u2316");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "small");
      \u0275\u0275text(32, "Guide");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "details", 11, 0)(35, "summary");
      \u0275\u0275text(36, "My voyage");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 12);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_div_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        const voyageMenu_r2 = \u0275\u0275reference(34);
        return \u0275\u0275resetView(voyageMenu_r2.open = false);
      });
      \u0275\u0275elementStart(38, "a", 13);
      \u0275\u0275text(39, "Project opening");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "a", 13);
      \u0275\u0275text(41, "Final example");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 9);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_42_listener() {
        return ctx.openUtility("location");
      });
      \u0275\u0275elementStart(43, "span", 8);
      \u0275\u0275text(44, "\u25C9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "small");
      \u0275\u0275text(46, "Place");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "button", 9);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_47_listener() {
        return ctx.openUtility("manifest");
      });
      \u0275\u0275elementStart(48, "span", 8);
      \u0275\u0275text(49, "\u25A4");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "small");
      \u0275\u0275text(51, "Manifest");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "button", 9);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_52_listener() {
        return ctx.openUtility("log");
      });
      \u0275\u0275elementStart(53, "span", 8);
      \u0275\u0275text(54, "\u25A3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "small");
      \u0275\u0275text(56, "Captain's log");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "button", 9);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_57_listener() {
        return ctx.openUtility("records");
      });
      \u0275\u0275elementStart(58, "span", 8);
      \u0275\u0275text(59, "\u21E9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "small");
      \u0275\u0275text(61, "Backup");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "button", 14);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_62_listener() {
        return ctx.openReplay();
      });
      \u0275\u0275elementStart(63, "span", 8);
      \u0275\u0275text(64, "\u25B6");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "small");
      \u0275\u0275text(66, "Replay");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(67, JourneyReplayPageComponent_Conditional_67_Template, 2, 0, "button", 15);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(68, "section", 16)(69, "div", 17)(70, "div", 18);
      \u0275\u0275repeaterCreate(71, JourneyReplayPageComponent_For_72_Template, 7, 3, "div", null, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "app-living-journey-map", 19);
      \u0275\u0275listener("locationInspected", function JourneyReplayPageComponent_Template_app_living_journey_map_locationInspected_73_listener($event) {
        return ctx.inspectLocation($event);
      })("routeInspected", function JourneyReplayPageComponent_Template_app_living_journey_map_routeInspected_73_listener($event) {
        return ctx.inspectRoute($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(74, JourneyReplayPageComponent_Conditional_74_Template, 1, 2, "app-journey-adventure-scene", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(75, JourneyReplayPageComponent_Conditional_75_Template, 36, 6, "details", 21);
      \u0275\u0275conditionalCreate(76, JourneyReplayPageComponent_Conditional_76_Template, 7, 1, "section", 22);
      \u0275\u0275elementStart(77, "aside", 23)(78, "button", 24);
      \u0275\u0275listener("click", function JourneyReplayPageComponent_Template_button_click_78_listener() {
        return ctx.showMapOnly();
      });
      \u0275\u0275elementStart(79, "span", 8);
      \u0275\u0275text(80, "\u2922");
      \u0275\u0275elementEnd();
      \u0275\u0275text(81, " Expand map ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "div", 25);
      \u0275\u0275conditionalCreate(83, JourneyReplayPageComponent_Conditional_83_Template, 1, 2, "app-journey-history-context", 26);
      \u0275\u0275conditionalCreate(84, JourneyReplayPageComponent_Conditional_84_Template, 3, 0, "nav", 27);
      \u0275\u0275element(85, "app-journey-decision-panel");
      \u0275\u0275conditionalCreate(86, JourneyReplayPageComponent_Conditional_86_Template, 11, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(87, JourneyReplayPageComponent_Conditional_87_Template, 10, 2, "aside", 28);
      \u0275\u0275conditionalCreate(88, JourneyReplayPageComponent_Conditional_88_Template, 4, 0, "section", 29);
      \u0275\u0275conditionalCreate(89, JourneyReplayPageComponent_Conditional_89_Template, 2, 1, "section", 30);
      \u0275\u0275conditionalCreate(90, JourneyReplayPageComponent_Conditional_90_Template, 17, 0, "section", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(91, JourneyReplayPageComponent_Conditional_91_Template, 5, 3, "div", 32);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_30_0;
      let tmp_31_0;
      let tmp_34_0;
      let tmp_37_0;
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("Forge PBL \xB7 ", ctx.runtime.step()?.title || "Journey complete");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.runtime.config.team.emblem, " ", ctx.runtime.config.team.name);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.runtime.progressPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.runtime.progressPercent(), "% recorded \xB7 ", ctx.runtime.saveLabel());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.mapOnly());
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.view() === "journey" && ctx.decisionOpen());
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.utility() === "mission");
      \u0275\u0275advance(10);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(44, _c03, ctx.runtime.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(46, _c12, ctx.runtime.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.utility() === "location");
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.utility() === "manifest");
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.utility() === "log");
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.utility() === "records");
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.runtime.state().replayTimeline.length === 0);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.runtime.isTeacher() || !ctx.runtime.session() ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("has-side-panel", ctx.view() === "journey" && (ctx.decisionOpen() || ctx.utility()));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.runtime.config.resources);
      \u0275\u0275advance(2);
      \u0275\u0275property("map", ctx.runtime.config.map)("route", ctx.runtime.state().route)("team", ctx.runtime.config.team)("candidateRouteIds", ctx.candidateRouteIds())("candidateRouteLabels", ctx.candidateRouteLabels())("selectedRouteId", ctx.selectedRouteId())("candidateLocationIds", ctx.candidateLocationIds())("candidateLocationLabels", ctx.candidateLocationLabels())("selectedCandidateLocationId", ctx.selectedPlanningTarget()?.locationId)("activeLocationId", ctx.currentLocation()?.id)("immersive", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_30_0 = ctx.adventure()) ? 74 : -1, tmp_30_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_31_0 = ctx.livingMap()) ? 75 : -1, tmp_31_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mapOnly() ? 76 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.view() !== "journey" || !ctx.decisionOpen());
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_34_0 = ctx.runtime.config.historicalFrame) ? 83 : -1, tmp_34_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.planningChoices().length > 0 ? 84 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.state().completionStatus === "complete" ? 86 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_37_0 = ctx.utility()) ? 87 : -1, tmp_37_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "class" ? 88 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "replay" ? 89 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.conflictRecord() ? 90 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.notice() || ctx.runtime.error() ? 91 : -1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    ClassJourneyMapComponent,
    JourneyDecisionPanelComponent,
    JourneyReplayPlayerComponent,
    LivingJourneyMapComponent,
    RouterLink,
    JourneyAdventureSceneComponent,
    JourneyHistoryContextComponent
  ], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100dvh;\n  overflow: hidden;\n  color: #efe4c8;\n  background: #091310;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #73d2d8;\n  outline-offset: 2px;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.journey-page[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100dvh;\n  grid-template-rows: auto minmax(0, 1fr);\n  background: #08110f;\n}\n.command-bar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 80;\n  display: flex;\n  min-height: 4.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.7rem 1rem;\n  border-bottom: 1px solid #77653e;\n  padding: 0.6rem 1rem;\n  background: rgba(10, 23, 20, 0.9607843137);\n  box-shadow: 0 0.55rem 1.5rem rgba(4, 8, 7, 0.5333333333);\n}\n.project-return-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 2.75rem;\n  align-items: center;\n  border-right: 1px solid #5f664f;\n  padding: 0 1rem 0 0.2rem;\n  color: #f2e6c5;\n  font-size: 0.76rem;\n  font-weight: 850;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.project-title[_ngcontent-%COMP%] {\n  min-width: 13rem;\n  margin-right: auto;\n}\n.project-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.overlay-sheet[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.route-detail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.destination-routes[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.map-prompt[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.conflict-banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #cfae61;\n  font-size: 0.72rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh1[_ngcontent-%COMP%] {\n  margin-top: 0.1rem;\n  font-size: clamp(1.2rem, 2.2vw, 1.8rem);\n  line-height: 1;\n}\n.voyage-status[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(14rem, 23vw);\n  gap: 0.2rem;\n}\n.voyage-status[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 800 0.76rem Georgia, serif;\n}\n.voyage-status[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n.resource-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  height: 0.38rem;\n  overflow: hidden;\n  border-radius: 99px;\n  background: #34443b;\n}\n.voyage-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.resource-list[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #5ca59b,\n      #e0bf66);\n}\n.voyage-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a5b4a9;\n  font-size: 0.67rem;\n}\n.artifact-tools[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.command-bar[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n.voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  border: 1px solid #806a3f;\n  border-radius: 0.4rem;\n  padding: 0.48rem 0.72rem;\n  color: #f2e6c5;\n  background: #2d4036;\n  font-weight: 800;\n  cursor: pointer;\n}\n.artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.38rem;\n}\n.artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled), \n.artifact-tools[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #e0bf68;\n  color: #26352d;\n  background: #dec474;\n}\n.artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.12rem;\n  line-height: 1;\n}\n.artifact-tools[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 850;\n}\n.voyage-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  list-style: none;\n}\n.voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n.voyage-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 90;\n  top: calc(100% + 0.45rem);\n  right: 0;\n  display: grid;\n  width: 14rem;\n  gap: 0.45rem;\n  border: 1px solid #75633f;\n  border-radius: 0.55rem;\n  padding: 0.7rem;\n  background: rgba(20, 40, 32, 0.9725490196);\n  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.6);\n}\n.voyage-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 2.65rem;\n  align-items: center;\n  border-bottom: 1px solid #526354;\n  color: #efe3c4;\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.map-experience[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  min-height: 0;\n  overflow: hidden;\n  isolation: isolate;\n}\n.map-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n  grid-column: 1;\n  grid-row: 1;\n  min-width: 0;\n  min-height: 0;\n  z-index: 0;\n}\n.has-side-panel[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 3fr) minmax(0, 7fr);\n}\n.has-side-panel[_ngcontent-%COMP%]   .map-canvas[_ngcontent-%COMP%] {\n  grid-column: 2;\n}\n.voyage-resources[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #0e262b;\n  border-bottom: 1px solid #64796a;\n}\n.voyage-resources[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n}\n.voyage-resources[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n  color: #b5c6bd;\n}\n.voyage-resources[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f3d28b;\n  font-size: 20px;\n}\n.voyage-resources[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 2px;\n  font-size: 11px;\n  color: #c6d2c5;\n}\n.map-canvas[_ngcontent-%COMP%]   app-living-journey-map[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.map-prompt[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 8;\n  bottom: 1.25rem;\n  left: 1.25rem;\n  display: grid;\n  width: min(27rem, 100% - 2.5rem);\n  gap: 0.35rem;\n  border: 1px solid #d4b663;\n  border-radius: 0.65rem;\n  padding: 0.9rem;\n  color: #f5ead0;\n  background: rgba(16, 36, 31, 0.8745098039);\n  box-shadow: 0 0.8rem 2rem rgba(2, 6, 5, 0.6);\n  -webkit-backdrop-filter: blur(9px);\n  backdrop-filter: blur(9px);\n}\n.map-prompt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1rem/1.35 Georgia, serif;\n}\n.map-prompt[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #becdc3;\n  line-height: 1.4;\n}\n.map-prompt[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.choose-map-route[_ngcontent-%COMP%], \n.return-to-map[_ngcontent-%COMP%], \n.view-close[_ngcontent-%COMP%], \n.play-journey[_ngcontent-%COMP%], \n.submit-journey[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  border: 1px solid #d4b663;\n  border-radius: 0.4rem;\n  padding: 0.55rem 0.75rem;\n  color: #23342c;\n  background: #e0c16d;\n  font-weight: 900;\n  cursor: pointer;\n}\n.overlay-sheet[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 20;\n  top: 1rem;\n  right: 1rem;\n  bottom: 1rem;\n  width: min(34rem, 100% - 2rem);\n  border: 1px solid #b89c62;\n  border-radius: 0.75rem;\n  color: #2d281f;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(230, 211, 169, 0.9607843137),\n      rgba(255, 242, 206, 0.968627451) 7%,\n      rgba(234, 216, 174, 0.9607843137) 98%);\n  box-shadow: 0 1.2rem 3.5rem rgba(2, 5, 4, 0.7215686275);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.decision-sheet[_ngcontent-%COMP%] {\n  right: auto;\n  left: 1rem;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.has-side-panel[_ngcontent-%COMP%]    > .overlay-sheet[_ngcontent-%COMP%] {\n  position: relative;\n  grid-column: 1;\n  grid-row: 1;\n  inset: auto;\n  width: auto;\n  min-width: 0;\n  min-height: 0;\n  max-height: none;\n  border: 0;\n  border-right: 1px solid #b89c62;\n  border-radius: 0;\n  box-shadow: none;\n}\n.sheet-close[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  border: 0;\n  border-bottom: 1px solid #ad9568;\n  padding: 0.45rem 0.75rem;\n  color: #385449;\n  background: #f0e1bb;\n  font-size: 0.76rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.sheet-close[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  line-height: 1;\n}\n.sheet-scroll[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow-y: auto;\n  padding: 0.9rem;\n  scrollbar-color: #8e7349 #e1cea2;\n}\n.mission-goal-tabs[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 3;\n  top: -0.9rem;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.35rem;\n  margin: -0.9rem -0.9rem 0.8rem;\n  border-bottom: 1px solid #9c814f;\n  padding: 0.55rem;\n  background: rgba(230, 211, 167, 0.9607843137);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.mission-goal-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  min-height: 2.75rem;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #a88c58;\n  border-radius: 0.4rem;\n  padding: 0.45rem;\n  color: #443525;\n  background: #f7e9c7;\n  text-align: left;\n  cursor: pointer;\n}\n.mission-goal-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.mission-goal-tabs[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #245e62;\n  color: #f9efd8;\n  background: #2d625c;\n}\n.mission-goal-tabs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n}\n.mission-goal-tabs[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  line-height: 1.2;\n}\n.map-settings[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n  border: 1px solid #ad9566;\n  border-radius: 0.5rem;\n  background: rgba(248, 236, 204, 0.9490196078);\n}\n.map-tools-popout[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 18;\n  right: 1rem;\n  bottom: 13rem;\n  width: min(11rem, 100% - 2rem);\n  margin: 0;\n  border-color: #d1b462;\n  background: rgba(16, 36, 31, 0.9333333333);\n  box-shadow: 0 0.8rem 2rem rgba(2, 6, 5, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.map-settings.map-tools-popout[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  color: #f4e7c5;\n}\n.map-tools-popout[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b9cbc0;\n}\n.map-tools-popout[_ngcontent-%COMP%]   .map-settings-body[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 0.45rem);\n  width: min(22rem, 100vw - 2rem);\n  max-height: min(65dvh, 34rem);\n  overflow-y: auto;\n  border: 1px solid #b99c62;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  color: #342b20;\n  background: rgba(246, 231, 196, 0.968627451);\n  box-shadow: 0 1rem 2.8rem rgba(2, 5, 4, 0.6784313725);\n}\n.map-settings[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 3.2rem;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.6rem 0.75rem;\n  color: #3f3426;\n  cursor: pointer;\n}\n.map-settings[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  font-size: 1.35rem;\n}\n.map-settings[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.map-settings[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.map-settings[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #766346;\n  font-size: 0.72rem;\n}\n.map-settings-body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  border-top: 1px solid #c5ad7c;\n  padding: 0.75rem;\n}\n.map-settings[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.map-settings[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  margin-bottom: 0.35rem;\n  color: #755432;\n  font-size: 0.7rem;\n  font-weight: 900;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.map-button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.map-button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.65rem;\n  border: 1px solid #987b4e;\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.65rem;\n  color: #423525;\n  background: #ead8ad;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: capitalize;\n  cursor: pointer;\n}\n.map-button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled), \n.map-button-row[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #285e58;\n  color: #f8efd9;\n  background: #315f53;\n}\n.map-button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.map-zoom-row[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.map-zoom-row[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  min-width: 3.6rem;\n  color: #5f4c33;\n  font: 800 0.78rem ui-monospace, monospace;\n  text-align: center;\n}\n.utility-sheet[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  padding: 1.15rem;\n}\n.utility-close[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 2;\n  top: 0;\n  float: right;\n  display: grid;\n  width: 2.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #9f8553;\n  border-radius: 50%;\n  color: #4a3925;\n  background: #ecdbaf;\n  font-size: 1.35rem;\n  cursor: pointer;\n}\n.utility-sheet[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 2.8rem 0.55rem 0;\n  font-size: clamp(1.45rem, 3vw, 2rem);\n}\n.utility-sheet[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.route-detail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #554a37;\n  line-height: 1.55;\n}\ndl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  margin: 0.75rem 0 0;\n}\ndl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  border-top: 1px solid #c1aa78;\n  padding-top: 0.45rem;\n}\ndt[_ngcontent-%COMP%] {\n  color: #826440;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  color: #453a2b;\n  line-height: 1.4;\n}\n.route-detail[_ngcontent-%COMP%], \n.destination-routes[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border-top: 3px double #a78d5d;\n  padding-top: 0.85rem;\n}\n.route-detail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.destination-routes[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8a4f2d;\n}\n.route-detail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.destination-routes[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.45rem;\n  font-size: 1.3rem;\n}\n.route-hint[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  border-left: 0.22rem solid #9c6d35;\n  padding: 0.55rem 0.65rem;\n  background: #f0dfb8;\n}\n.choose-map-route[_ngcontent-%COMP%], \n.return-to-map[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0.8rem;\n  color: #f5ecd5;\n  background: #315f53;\n  border-color: #315f53;\n}\n.destination-routes[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.destination-routes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  min-height: 3.6rem;\n  border: 1px solid #aa9160;\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #332b20;\n  background: rgba(248, 236, 203, 0.9411764706);\n  text-align: left;\n  cursor: pointer;\n}\n.destination-routes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #276865;\n  background: #e2ebdc;\n}\n.destination-routes[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6a5c43;\n}\n.resource-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.85rem;\n  margin-top: 1rem;\n}\n.resource-list[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.3rem;\n}\n.resource-list[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  color: #5b4b34;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.resource-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  height: 0.58rem;\n  background: #c5b58d;\n}\n.log-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  margin-top: 0.8rem;\n}\n.log-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #baa474;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #fff5d8;\n}\n.log-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #876340;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.log-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0.15rem 0 0.3rem;\n  font-family: Georgia, serif;\n}\n.log-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.log-list[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  color: #594c37;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.log-list[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  border-left: 0.18rem solid #957747;\n  padding-left: 0.55rem;\n}\n.log-list[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.5rem;\n}\n.log-list[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.23rem 0.4rem;\n  color: #315949;\n  background: #dce8d3;\n  font-size: 0.63rem;\n  font-weight: 800;\n}\n.log-list[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  border: 1px solid #8b7043;\n  border-radius: 0.3rem;\n  padding: 0.38rem 0.5rem;\n  color: #4b3722;\n  background: #ead9ae;\n  font-size: 0.68rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.revision-editor[_ngcontent-%COMP%] {\n  margin-top: 0.9rem;\n  border-top: 3px double #9f8655;\n  padding-top: 0.8rem;\n}\n.revision-editor[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: #5a4328;\n  font-size: 0.76rem;\n  font-weight: 800;\n}\n.revision-editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0.25rem;\n  resize: vertical;\n  border: 1px solid #9f895f;\n  border-radius: 0.35rem;\n  padding: 0.6rem;\n  background: #fff9e7;\n  font: 0.9rem/1.45 system-ui, sans-serif;\n}\n.revision-editor[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n.backup-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-top: 0.65rem;\n}\n.revision-editor[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.backup-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.backup-actions[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 1px solid #84683d;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.65rem;\n  color: #3d3020;\n  background: #ead9ae;\n  font-size: 0.74rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.backup-actions[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.backup-actions[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n}\n.play-journey[_ngcontent-%COMP%], \n.submit-journey[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0.8rem;\n}\n.submission-card[_ngcontent-%COMP%] {\n  margin-top: 0.8rem;\n  border: 1px solid #a38a58;\n  border-radius: 0.45rem;\n  padding: 0.85rem;\n  background: #fff4d5;\n}\n.submission-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8a4f2d;\n}\n.submission-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 1.3rem;\n}\n.submission-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  color: #5c4d38;\n  line-height: 1.45;\n}\n.submission-card[_ngcontent-%COMP%]   .submission-state[_ngcontent-%COMP%] {\n  display: inline-block;\n  border-radius: 999px;\n  padding: 0.3rem 0.55rem;\n  color: #5a351f;\n  background: #e4bd71;\n  font-size: 0.74rem;\n  font-weight: 900;\n  text-transform: capitalize;\n}\n.submission-card[_ngcontent-%COMP%]   .submission-state.approved[_ngcontent-%COMP%] {\n  color: #eef8ef;\n  background: #37644f;\n}\n.view-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 30;\n  inset: 0.8rem;\n  overflow: auto;\n  border: 1px solid #b89b5d;\n  border-radius: 0.8rem;\n  background: rgba(13, 25, 22, 0.9294117647);\n  box-shadow: 0 1.2rem 4rem rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.view-close[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 45;\n  top: 0.65rem;\n  float: right;\n  margin: 0.65rem 0.65rem -3.4rem 0;\n}\n.replay-overlay[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n.conflict-banner[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 50;\n  right: 1rem;\n  bottom: 1rem;\n  left: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border: 1px solid #cf8e55;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  color: #3f2b20;\n  background: rgba(242, 211, 157, 0.9607843137);\n  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.5333333333);\n}\n.conflict-banner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  font-size: 1.1rem;\n}\n.conflict-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 0.76rem;\n}\n.conflict-banner[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.conflict-banner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 1px solid #7b5430;\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.6rem;\n  color: #f7ecd5;\n  background: #62442d;\n  font-size: 0.72rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  right: 1rem;\n  bottom: 1rem;\n  display: flex;\n  max-width: min(30rem, 100% - 2rem);\n  align-items: center;\n  gap: 0.7rem;\n  border: 1px solid #a68a4d;\n  border-radius: 0.45rem;\n  padding: 0.75rem 0.85rem;\n  color: #efe5c8;\n  background: #24483f;\n  box-shadow: 0 0.8rem 2rem rgba(5, 10, 8, 0.6666666667);\n}\n.toast.error[_ngcontent-%COMP%] {\n  border-color: #cb7166;\n  background: #71352e;\n}\n.toast[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n@media (max-width: 900px) {\n  .project-title[_ngcontent-%COMP%] {\n    min-width: 10rem;\n  }\n  .voyage-status[_ngcontent-%COMP%] {\n    width: 11rem;\n  }\n  .artifact-tools[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 760px) {\n  .has-side-panel[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-rows: minmax(200px, 43%) minmax(0, 57%);\n  }\n  .has-side-panel[_ngcontent-%COMP%]   .map-canvas[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .has-side-panel[_ngcontent-%COMP%]    > .overlay-sheet[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 2;\n    border-top: 1px solid #b89c62;\n  }\n  .voyage-resources[_ngcontent-%COMP%] {\n    gap: 5px;\n    padding: 6px;\n  }\n  .voyage-resources[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 0;\n  }\n  .voyage-resources[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .map-tools-popout[_ngcontent-%COMP%] {\n    top: 3.7rem;\n    bottom: auto;\n    right: 0.5rem;\n  }\n  .map-tools-popout[open][_ngcontent-%COMP%] {\n    max-height: none;\n    overflow: visible;\n  }\n  .map-tools-popout[_ngcontent-%COMP%]   .map-settings-body[_ngcontent-%COMP%] {\n    top: calc(100% + 0.4rem);\n    bottom: auto;\n    max-height: 45dvh;\n  }\n  .command-bar[_ngcontent-%COMP%] {\n    min-height: 3.7rem;\n    gap: 0.45rem;\n    padding: 0.45rem 0.55rem;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .voyage-status[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .voyage-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .voyage-status[_ngcontent-%COMP%] {\n    width: 4.5rem;\n  }\n  .artifact-tools[_ngcontent-%COMP%] {\n    gap: 0.25rem;\n  }\n  .artifact-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n    min-width: 2.75rem;\n    min-height: 2.75rem;\n    justify-content: center;\n    padding: 0.4rem;\n  }\n  .voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n    font-size: 0;\n  }\n  .voyage-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::after {\n    content: "\\2022\\2022\\2022";\n    font-size: 0.85rem;\n  }\n  .overlay-sheet[_ngcontent-%COMP%] {\n    top: auto;\n    right: 0.5rem;\n    bottom: 0.5rem;\n    left: 0.5rem;\n    width: auto;\n    max-height: min(68dvh, 42rem);\n  }\n  .utility-sheet[_ngcontent-%COMP%] {\n    max-height: min(76dvh, 46rem);\n  }\n  .map-prompt[_ngcontent-%COMP%] {\n    right: 0.75rem;\n    bottom: 0.75rem;\n    left: 0.75rem;\n    width: auto;\n  }\n  .view-overlay[_ngcontent-%COMP%] {\n    inset: 0.4rem;\n  }\n  .conflict-banner[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=journey-shell.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyReplayPageComponent, [{
    type: Component,
    args: [{ selector: "app-journey-replay-page", imports: [
      WorkspaceToolsComponent,
      ClassJourneyMapComponent,
      JourneyDecisionPanelComponent,
      JourneyReplayPlayerComponent,
      LivingJourneyMapComponent,
      RouterLink,
      JourneyAdventureSceneComponent,
      JourneyHistoryContextComponent
    ], template: `<main class="journey-page">\r
  <app-workspace-tools><header class="command-bar">\r
    <a class="project-return-link" routerLink="/projects">\u2190 Projects</a>\r
    <div class="project-title">\r
      <span>Forge PBL \xB7 {{ runtime.step()?.title || 'Journey complete' }}</span>\r
      <h1>{{ runtime.config.title }}</h1>\r
    </div>\r
\r
    <div class="voyage-status">\r
      <span>{{ runtime.config.team.emblem }} {{ runtime.config.team.name }}</span>\r
      <div><i [style.width.%]="runtime.progressPercent()"></i></div>\r
      <small>{{ runtime.progressPercent() }}% recorded \xB7 {{ runtime.saveLabel() }}</small>\r
    </div>\r
\r
    <nav class="artifact-tools" aria-label="Expedition tools">\r
      <button\r
        type="button"\r
        class="map-home-tool"\r
        [attr.aria-pressed]="mapOnly()"\r
        (click)="showMapOnly()"\r
      >\r
        <span aria-hidden="true">\u{1F5FA}</span><small>Map</small>\r
      </button>\r
      <button\r
        type="button"\r
        [attr.aria-pressed]="view() === 'journey' && decisionOpen()"\r
        (click)="openDecision()"\r
      >\r
        <span aria-hidden="true">\u2637</span><small>Chapter</small>\r
      </button>\r
      <button\r
        type="button"\r
        class="guide-tool"\r
        [attr.aria-pressed]="utility() === 'mission'"\r
        (click)="openUtility('mission')"\r
      >\r
        <span aria-hidden="true">\u2316</span><small>Guide</small>\r
      </button>\r
      <details class="voyage-menu" #voyageMenu>\r
        <summary>My voyage</summary>\r
        <div (click)="voyageMenu.open = false">\r
          <a [routerLink]="['/projects', runtime.config.projectId]">Project opening</a>\r
          <a [routerLink]="['/projects', runtime.config.projectId, 'final-demo']">Final example</a>\r
          <button\r
            type="button"\r
            [attr.aria-pressed]="utility() === 'location'"\r
            (click)="openUtility('location')"\r
          >\r
            <span aria-hidden="true">\u25C9</span><small>Place</small>\r
          </button>\r
          <button\r
            type="button"\r
            [attr.aria-pressed]="utility() === 'manifest'"\r
            (click)="openUtility('manifest')"\r
          >\r
            <span aria-hidden="true">\u25A4</span><small>Manifest</small>\r
          </button>\r
          <button\r
            type="button"\r
            [attr.aria-pressed]="utility() === 'log'"\r
            (click)="openUtility('log')"\r
          >\r
            <span aria-hidden="true">\u25A3</span><small>Captain's log</small>\r
          </button>\r
          <button\r
            type="button"\r
            [attr.aria-pressed]="utility() === 'records'"\r
            (click)="openUtility('records')"\r
          >\r
            <span aria-hidden="true">\u21E9</span><small>Backup</small>\r
          </button>\r
          <button\r
            type="button"\r
            class="replay-tool"\r
            [disabled]="runtime.state().replayTimeline.length === 0"\r
            (click)="openReplay()"\r
          >\r
            <span aria-hidden="true">\u25B6</span><small>Replay</small>\r
          </button>\r
          @if (runtime.isTeacher() || !runtime.session()) {\r
            <button type="button" (click)="openClassMap()">Class map</button>\r
          }\r
        </div>\r
      </details>\r
    </nav>\r
  </header></app-workspace-tools>\r
\r
  <section\r
    class="map-experience"\r
    [class.has-side-panel]="view() === 'journey' && (decisionOpen() || utility())"\r
    aria-label="Journey map and decisions workspace"\r
  >\r
    <div class="map-canvas">\r
      <div class="voyage-resources" aria-label="Current expedition resources">\r
        @for (resource of runtime.config.resources; track resource.id) {\r
          <div>\r
            <span>{{ resource.label }}</span\r
            ><strong\r
              >{{ runtime.state().resources[resource.id]\r
              }}<small>{{ resource.unit }}</small></strong\r
            >\r
          </div>\r
        }\r
      </div>\r
      <app-living-journey-map\r
        [map]="runtime.config.map"\r
        [route]="runtime.state().route"\r
        [team]="runtime.config.team"\r
        [candidateRouteIds]="candidateRouteIds()"\r
        [candidateRouteLabels]="candidateRouteLabels()"\r
        [selectedRouteId]="selectedRouteId()"\r
        [candidateLocationIds]="candidateLocationIds()"\r
        [candidateLocationLabels]="candidateLocationLabels()"\r
        [selectedCandidateLocationId]="selectedPlanningTarget()?.locationId"\r
        [activeLocationId]="currentLocation()?.id"\r
        [immersive]="true"\r
        mapLabel="Interactive Atlantic journey map. Choose highlighted routes and inspect places."\r
        (locationInspected)="inspectLocation($event)"\r
        (routeInspected)="inspectRoute($event)"\r
      />\r
      @if (adventure(); as scene) {\r
        <app-journey-adventure-scene\r
          [adventure]="scene"\r
          [location]="currentLocation()?.name ?? 'At sea'"\r
        />\r
      }\r
    </div>\r
\r
    @if (livingMap(); as map) {\r
      <details class="map-settings map-tools-popout">\r
        <summary>\r
          <span aria-hidden="true">\u{1F5FA}</span>\r
          <span>\r
            <strong>Map tools</strong>\r
            <small>{{ map.cover() === 'regional' ? 'Atlantic' : 'World' }}</small>\r
          </span>\r
        </summary>\r
        <div class="map-settings-body">\r
          <fieldset>\r
            <legend>Map view</legend>\r
            <div class="map-button-row">\r
              <button\r
                type="button"\r
                [attr.aria-pressed]="map.cover() === 'regional'"\r
                (click)="map.setCover('regional')"\r
              >\r
                Atlantic\r
              </button>\r
              <button\r
                type="button"\r
                [attr.aria-pressed]="map.cover() === 'world'"\r
                (click)="map.setCover('world')"\r
              >\r
                World\r
              </button>\r
            </div>\r
          </fieldset>\r
          <fieldset>\r
            <legend>Zoom</legend>\r
            <div class="map-button-row map-zoom-row">\r
              <button\r
                type="button"\r
                aria-label="Zoom map out"\r
                [disabled]="map.zoom() <= 1"\r
                (click)="map.zoomBy(-0.25)"\r
              >\r
                \u2212\r
              </button>\r
              <output aria-label="Map zoom level">{{ (map.zoom() * 100).toFixed(0) }}%</output>\r
              <button\r
                type="button"\r
                aria-label="Zoom map in"\r
                [disabled]="map.zoom() >= 2.8"\r
                (click)="map.zoomBy(0.25)"\r
              >\r
                +\r
              </button>\r
              <button type="button" (click)="map.resetView()">Fit map</button>\r
            </div>\r
          </fieldset>\r
          <fieldset>\r
            <legend>Chart overlays</legend>\r
            <div class="map-button-row overlay-buttons">\r
              @for (lens of runtime.config.map.lenses; track lens) {\r
                <button\r
                  type="button"\r
                  [attr.aria-pressed]="map.lensOn(lens)"\r
                  (click)="map.toggleLens(lens)"\r
                >\r
                  {{ lens }}\r
                </button>\r
              }\r
            </div>\r
          </fieldset>\r
        </div>\r
      </details>\r
    }\r
\r
    @if (mapOnly()) {\r
      <section class="map-prompt" aria-live="polite">\r
        <span>Map workspace</span>\r
        @if (candidateRouteIds().length > 0 || candidateLocationIds().length > 0) {\r
          <strong>Select a glowing route or destination to compare your choices.</strong>\r
          <small>The map opens route facts without taking you away from your voyage.</small>\r
        } @else {\r
          <strong>Explore any marked place, or return to the current chapter.</strong>\r
          <small\r
            >Your ship, completed route, and current decision location stay visible here.</small\r
          >\r
        }\r
        <button type="button" (click)="openDecision()">Open current chapter</button>\r
      </section>\r
    }\r
\r
    <aside\r
      class="decision-sheet overlay-sheet"\r
      [hidden]="view() !== 'journey' || !decisionOpen()"\r
      aria-label="Current chapter"\r
    >\r
      <button type="button" class="sheet-close" (click)="showMapOnly()">\r
        <span aria-hidden="true">\u2922</span> Expand map\r
      </button>\r
      <div class="sheet-scroll">\r
        @if (runtime.config.historicalFrame; as history) {\r
          <app-journey-history-context\r
            [history]="history"\r
            [includeEpilogue]="runtime.state().completionStatus === 'complete'"\r
          />\r
        }\r
        @if (planningChoices().length > 0) {\r
          <nav class="mission-goal-tabs" aria-label="Choose your expedition affiliation">\r
            @for (choice of planningChoices(); track choice.id) {\r
              <button\r
                type="button"\r
                [class.selected]="runtime.choice()?.id === choice.id"\r
                [attr.aria-pressed]="runtime.choice()?.id === choice.id"\r
                (click)="chooseGoal(choice.id)"\r
              >\r
                @if (choice.icon) {\r
                  <span aria-hidden="true">{{ choice.icon }}</span>\r
                }\r
                <strong>{{ choice.label }}</strong>\r
              </button>\r
            }\r
          </nav>\r
        }\r
        <app-journey-decision-panel />\r
        @if (runtime.state().completionStatus === 'complete') {\r
          <button type="button" class="play-journey" (click)="openReplay()">\r
            \u25B6 Play my journey\r
          </button>\r
          <section class="submission-card" aria-labelledby="submission-title">\r
            <span>Teacher review</span>\r
            <h2 id="submission-title">Submit the recorded voyage</h2>\r
            @if (runtime.submission(); as submission) {\r
              <p class="submission-state" [class.approved]="submission.status === 'approved'">\r
                {{\r
                  submission.status === 'revision-requested'\r
                    ? 'Revision requested'\r
                    : submission.status\r
                }}\r
              </p>\r
              @if (submission.teacherFeedback) {\r
                <p>{{ submission.teacherFeedback }}</p>\r
              }\r
            } @else {\r
              <p>\r
                Submission creates an authoritative snapshot. Later edits stay separate until you\r
                submit again.\r
              </p>\r
            }\r
            @if (!runtime.session()) {\r
              <p>Open the signed-in hosted site to submit this local draft.</p>\r
            }\r
            @if (runtime.canSubmit()) {\r
              <button type="button" class="submit-journey" (click)="runtime.submitJourney()">\r
                {{\r
                  runtime.submission()?.status === 'revision-requested'\r
                    ? 'Resubmit journey'\r
                    : 'Submit for review'\r
                }}\r
              </button>\r
            }\r
          </section>\r
        }\r
      </div>\r
    </aside>\r
\r
    @if (utility(); as openUtilityName) {\r
      <aside class="utility-sheet overlay-sheet" [attr.aria-label]="openUtilityName">\r
        <button\r
          type="button"\r
          class="utility-close"\r
          aria-label="Close tool and return to map"\r
          (click)="closeUtility()"\r
        >\r
          \xD7\r
        </button>\r
        @switch (openUtilityName) {\r
          @case ('mission') {\r
            <span>Current heading</span>\r
            <h2>{{ runtime.step()?.title || 'Journey recorded' }}</h2>\r
            <p>{{ runtime.step()?.mission || runtime.config.drivingQuestion }}</p>\r
            <dl>\r
              <div>\r
                <dt>Driving question</dt>\r
                <dd>{{ runtime.config.drivingQuestion }}</dd>\r
              </div>\r
              <div>\r
                <dt>Student role</dt>\r
                <dd>{{ runtime.config.roles.join(' \xB7 ') }}</dd>\r
              </div>\r
            </dl>\r
            @if (runtime.config.learning; as learning) {\r
              <details>\r
                <summary>Words and ideas</summary>\r
                <p>{{ learning.scopeNote }}</p>\r
                <dl>\r
                  @for (entry of learning.glossary; track entry.term) {\r
                    <dt>{{ entry.term }}</dt>\r
                    <dd>{{ entry.definition }}</dd>\r
                  }\r
                </dl>\r
              </details>\r
            }\r
          }\r
          @case ('location') {\r
            <span>{{ inspectedRoute() ? 'Route report' : 'Map report' }}</span>\r
            <h2>{{ inspectedLocation()?.name || 'Choose a map location' }}</h2>\r
            <p>\r
              {{\r
                inspectedLocation()?.description ||\r
                  'Select any marked port, waypoint, or glowing route to inspect it.'\r
              }}\r
            </p>\r
\r
            @if (inspectedRoute(); as route) {\r
              @if (inspectedRouteChoice(); as routeChoice) {\r
                <section class="route-detail" aria-labelledby="route-detail-title">\r
                  <span>Possible decision</span>\r
                  <h3 id="route-detail-title">{{ routeChoice.label }}</h3>\r
                  <p>{{ routeChoice.summary }}</p>\r
                  <dl>\r
                    <div>\r
                      <dt>Distance</dt>\r
                      <dd>{{ route.distanceLabel }}</dd>\r
                    </div>\r
                    <div>\r
                      <dt>Risk</dt>\r
                      <dd>{{ route.risk }}</dd>\r
                    </div>\r
                    <div>\r
                      <dt>Wind and navigation</dt>\r
                      <dd>{{ route.windLabel }}</dd>\r
                    </div>\r
                  </dl>\r
                  <p class="route-hint">{{ routeChoice.rationaleHint }}</p>\r
                  <button type="button" class="choose-map-route" (click)="chooseInspectedRoute()">\r
                    Choose {{ routeChoice.label }}\r
                  </button>\r
                </section>\r
              }\r
            } @else if (inspectedDestinationRoutes().length > 0) {\r
              <section class="destination-routes" aria-labelledby="destination-routes-title">\r
                <span>Routes to this place</span>\r
                <h3 id="destination-routes-title">Compare on the map</h3>\r
                @for (item of inspectedDestinationRoutes(); track item.route.id) {\r
                  <button type="button" (click)="inspectRoute(item.route.id)">\r
                    <strong>{{ item.choice?.label || 'Possible route' }}</strong>\r
                    <small>{{ item.route.distanceLabel }} \xB7 {{ item.route.risk }} risk</small>\r
                  </button>\r
                }\r
              </section>\r
            } @else if (inspectedLocation(); as location) {\r
              <dl>\r
                <div>\r
                  <dt>Region</dt>\r
                  <dd>{{ location.regionId }}</dd>\r
                </div>\r
                <div>\r
                  <dt>Coordinates</dt>\r
                  <dd>{{ location.latitude.toFixed(2) }}\xB0, {{ location.longitude.toFixed(2) }}\xB0</dd>\r
                </div>\r
              </dl>\r
            }\r
          }\r
          @case ('manifest') {\r
            <span>Ship's manifest</span>\r
            <h2>Expedition resources</h2>\r
            <div class="resource-list">\r
              @for (resource of runtime.config.resources; track resource.id) {\r
                <div>\r
                  <header>\r
                    <strong>{{ resource.label }}</strong>\r
                    <output>{{ runtime.state().resources[resource.id] }}{{ resource.unit }}</output>\r
                  </header>\r
                  <div>\r
                    <i\r
                      [style.width.%]="\r
                        (runtime.state().resources[resource.id] / resource.maximum) * 100\r
                      "\r
                    ></i>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          }\r
          @case ('log') {\r
            <span>Captain's log</span>\r
            <h2>{{ runtime.state().completedSteps.length }} chapters recorded</h2>\r
            <div class="log-list">\r
              @for (record of runtime.state().completedSteps; track record.stepId) {\r
                <article>\r
                  <small>Chapter {{ $index + 1 }} \xB7 {{ stepTitle(record.stepId) }}</small>\r
                  <strong>{{ choiceLabel(record.stepId) }}</strong>\r
                  @if (record.studentResponse.prediction) {\r
                    <p><b>Prediction:</b> {{ record.studentResponse.prediction }}</p>\r
                  }\r
                  <p>\r
                    {{\r
                      record.studentResponse.text ||\r
                        record.studentResponse.transcript ||\r
                        'Audio response attached'\r
                    }}\r
                  </p>\r
                  @for (\r
                    citation of record.studentResponse.citations ?? [];\r
                    track citation.evidenceId + citation.paragraphId\r
                  ) {\r
                    <blockquote>\r
                      <b>{{ citation.paragraphId }}</b> \xB7 {{ citation.explanation }}\r
                    </blockquote>\r
                  }\r
                  @if ((record.responseRevisions?.length ?? 0) > 0) {\r
                    <p class="revision-count">\r
                      {{ record.responseRevisions?.length }} earlier response version(s) preserved\r
                    </p>\r
                  }\r
                  <footer>\r
                    @for (mastery of record.masteryResults; track mastery.masteryTag) {\r
                      <span>\u2713 {{ mastery.masteryTag }}</span>\r
                    }\r
                    @if (runtime.submission()?.status !== 'approved') {\r
                      <button type="button" (click)="runtime.openRevision(record.stepId)">\r
                        Revise explanation\r
                      </button>\r
                    }\r
                  </footer>\r
                </article>\r
              } @empty {\r
                <p>Your completed decisions and explanations will appear here.</p>\r
              }\r
            </div>\r
            @if (runtime.revisionStepId(); as stepId) {\r
              <section class="revision-editor" aria-labelledby="revision-title">\r
                <span>Preserves the earlier response</span>\r
                <h3 id="revision-title">Revise {{ stepTitle(stepId) }}</h3>\r
                <label>\r
                  Updated explanation\r
                  <textarea\r
                    rows="5"\r
                    [value]="runtime.revisionDraft().text"\r
                    (input)="updateRevisionText($event)"\r
                  ></textarea>\r
                </label>\r
                <label>\r
                  Why are you revising?\r
                  <textarea\r
                    rows="3"\r
                    [value]="revisionReason()"\r
                    (input)="revisionReason.set($any($event.target).value)"\r
                  ></textarea>\r
                </label>\r
                <div>\r
                  <button type="button" (click)="runtime.revisionStepId.set(undefined)">\r
                    Cancel\r
                  </button>\r
                  <button type="button" class="save-revision" (click)="saveRevision()">\r
                    Save revision\r
                  </button>\r
                </div>\r
              </section>\r
            }\r
          }\r
          @case ('records') {\r
            <span>Journey records</span>\r
            <h2>Keep a portable backup</h2>\r
            <p>\r
              The JSON backup contains decisions, explanations, citations, route points, and\r
              revision history. Audio files remain in their media storage.\r
            </p>\r
            <div class="backup-actions">\r
              <button type="button" (click)="downloadBackup('device')">Download device copy</button>\r
              @if (runtime.conflictRecord()) {\r
                <button type="button" (click)="downloadBackup('class')">Download class copy</button>\r
              }\r
              <label>\r
                Restore this learner's backup\r
                <input\r
                  type="file"\r
                  accept="application/json,.json"\r
                  (change)="importBackup($event)"\r
                />\r
              </label>\r
              @if (runtime.saveState() === 'error' || runtime.authorityState() === 'offline') {\r
                <button type="button" (click)="runtime.retrySave()">Retry save</button>\r
              }\r
            </div>\r
          }\r
        }\r
        <button type="button" class="return-to-map" (click)="closeUtility()">\r
          Keep exploring the map\r
        </button>\r
      </aside>\r
    }\r
\r
    @if (view() === 'class') {\r
      <section class="view-overlay class-overlay" aria-label="Class voyage overlay">\r
        <button type="button" class="view-close" (click)="returnToJourney()">\r
          \xD7 Return to map\r
        </button>\r
        <app-class-journey-map />\r
      </section>\r
    }\r
\r
    @if (view() === 'replay') {\r
      <section class="view-overlay replay-overlay" aria-label="Journey replay overlay">\r
        <app-journey-replay-player [embedded]="true" (closed)="returnToJourney()" />\r
      </section>\r
    }\r
\r
    @if (runtime.conflictRecord()) {\r
      <section class="conflict-banner" role="alert" aria-labelledby="conflict-title">\r
        <div>\r
          <span>Two saved copies</span>\r
          <h2 id="conflict-title">Choose which journey to continue</h2>\r
          <p>Download both copies first. Recorded decisions cannot be silently replaced.</p>\r
        </div>\r
        <div>\r
          <button type="button" (click)="downloadBackup('device')">Download device</button>\r
          <button type="button" (click)="downloadBackup('class')">Download class</button>\r
          <button type="button" (click)="runtime.resolveConflict('device')">\r
            Keep device copy\r
          </button>\r
          <button type="button" (click)="runtime.resolveConflict('class')">Use class copy</button>\r
        </div>\r
      </section>\r
    }\r
  </section>\r
\r
  @if (runtime.notice() || runtime.error()) {\r
    <div class="toast" [class.error]="runtime.error()" role="status">\r
      <span>{{ runtime.error() || runtime.notice() }}</span>\r
      <button type="button" aria-label="Dismiss message" (click)="runtime.clearMessages()">\r
        \xD7\r
      </button>\r
    </div>\r
  }\r
</main>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/journey-replay/ui/journey-shell.scss */\n:host {\n  display: block;\n  height: 100dvh;\n  overflow: hidden;\n  color: #efe4c8;\n  background: #091310;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\nbutton,\nsummary {\n  font: inherit;\n}\nbutton:focus-visible,\nsummary:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #73d2d8;\n  outline-offset: 2px;\n}\n[hidden] {\n  display: none !important;\n}\n.journey-page {\n  display: grid;\n  height: 100dvh;\n  grid-template-rows: auto minmax(0, 1fr);\n  background: #08110f;\n}\n.command-bar {\n  position: relative;\n  z-index: 80;\n  display: flex;\n  min-height: 4.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.7rem 1rem;\n  border-bottom: 1px solid #77653e;\n  padding: 0.6rem 1rem;\n  background: rgba(10, 23, 20, 0.9607843137);\n  box-shadow: 0 0.55rem 1.5rem rgba(4, 8, 7, 0.5333333333);\n}\n.project-return-link {\n  display: inline-flex;\n  min-height: 2.75rem;\n  align-items: center;\n  border-right: 1px solid #5f664f;\n  padding: 0 1rem 0 0.2rem;\n  color: #f2e6c5;\n  font-size: 0.76rem;\n  font-weight: 850;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.project-title {\n  min-width: 13rem;\n  margin-right: auto;\n}\n.project-title span,\n.overlay-sheet > span,\n.route-detail > span,\n.destination-routes > span,\n.map-prompt > span,\n.submission-card > span,\n.conflict-banner span {\n  color: #cfae61;\n  font-size: 0.72rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\nh1,\nh2,\nh3 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nh1 {\n  margin-top: 0.1rem;\n  font-size: clamp(1.2rem, 2.2vw, 1.8rem);\n  line-height: 1;\n}\n.voyage-status {\n  display: grid;\n  width: min(14rem, 23vw);\n  gap: 0.2rem;\n}\n.voyage-status > span {\n  font: 800 0.76rem Georgia, serif;\n}\n.voyage-status > div,\n.resource-list > div > div {\n  height: 0.38rem;\n  overflow: hidden;\n  border-radius: 99px;\n  background: #34443b;\n}\n.voyage-status i,\n.resource-list i {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #5ca59b,\n      #e0bf66);\n}\n.voyage-status small {\n  color: #a5b4a9;\n  font-size: 0.67rem;\n}\n.artifact-tools {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.artifact-tools button,\n.command-bar > button,\n.voyage-menu summary {\n  min-height: 2.75rem;\n  border: 1px solid #806a3f;\n  border-radius: 0.4rem;\n  padding: 0.48rem 0.72rem;\n  color: #f2e6c5;\n  background: #2d4036;\n  font-weight: 800;\n  cursor: pointer;\n}\n.artifact-tools button {\n  display: flex;\n  align-items: center;\n  gap: 0.38rem;\n}\n.artifact-tools button:hover:not(:disabled),\n.artifact-tools button[aria-pressed=true] {\n  border-color: #e0bf68;\n  color: #26352d;\n  background: #dec474;\n}\n.artifact-tools button:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.artifact-tools button > span {\n  font-size: 1.12rem;\n  line-height: 1;\n}\n.artifact-tools small {\n  font-size: 0.7rem;\n  font-weight: 850;\n}\n.voyage-menu {\n  position: relative;\n}\n.voyage-menu summary {\n  display: flex;\n  align-items: center;\n  list-style: none;\n}\n.voyage-menu summary::-webkit-details-marker {\n  display: none;\n}\n.voyage-menu > div {\n  position: absolute;\n  z-index: 90;\n  top: calc(100% + 0.45rem);\n  right: 0;\n  display: grid;\n  width: 14rem;\n  gap: 0.45rem;\n  border: 1px solid #75633f;\n  border-radius: 0.55rem;\n  padding: 0.7rem;\n  background: rgba(20, 40, 32, 0.9725490196);\n  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.6);\n}\n.voyage-menu > div > a {\n  display: flex;\n  min-height: 2.65rem;\n  align-items: center;\n  border-bottom: 1px solid #526354;\n  color: #efe3c4;\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.map-experience {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  min-height: 0;\n  overflow: hidden;\n  isolation: isolate;\n}\n.map-canvas {\n  position: relative;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n  grid-column: 1;\n  grid-row: 1;\n  min-width: 0;\n  min-height: 0;\n  z-index: 0;\n}\n.has-side-panel {\n  grid-template-columns: minmax(0, 3fr) minmax(0, 7fr);\n}\n.has-side-panel .map-canvas {\n  grid-column: 2;\n}\n.voyage-resources {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #0e262b;\n  border-bottom: 1px solid #64796a;\n}\n.voyage-resources > div {\n  display: grid;\n  gap: 3px;\n}\n.voyage-resources span {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n  color: #b5c6bd;\n}\n.voyage-resources strong {\n  color: #f3d28b;\n  font-size: 20px;\n}\n.voyage-resources small {\n  margin-left: 2px;\n  font-size: 11px;\n  color: #c6d2c5;\n}\n.map-canvas app-living-journey-map {\n  display: block;\n  height: 100%;\n}\n.map-prompt {\n  position: absolute;\n  z-index: 8;\n  bottom: 1.25rem;\n  left: 1.25rem;\n  display: grid;\n  width: min(27rem, 100% - 2.5rem);\n  gap: 0.35rem;\n  border: 1px solid #d4b663;\n  border-radius: 0.65rem;\n  padding: 0.9rem;\n  color: #f5ead0;\n  background: rgba(16, 36, 31, 0.8745098039);\n  box-shadow: 0 0.8rem 2rem rgba(2, 6, 5, 0.6);\n  -webkit-backdrop-filter: blur(9px);\n  backdrop-filter: blur(9px);\n}\n.map-prompt strong {\n  font: 700 1rem/1.35 Georgia, serif;\n}\n.map-prompt small {\n  color: #becdc3;\n  line-height: 1.4;\n}\n.map-prompt button,\n.choose-map-route,\n.return-to-map,\n.view-close,\n.play-journey,\n.submit-journey {\n  min-height: 2.75rem;\n  border: 1px solid #d4b663;\n  border-radius: 0.4rem;\n  padding: 0.55rem 0.75rem;\n  color: #23342c;\n  background: #e0c16d;\n  font-weight: 900;\n  cursor: pointer;\n}\n.overlay-sheet {\n  position: absolute;\n  z-index: 20;\n  top: 1rem;\n  right: 1rem;\n  bottom: 1rem;\n  width: min(34rem, 100% - 2rem);\n  border: 1px solid #b89c62;\n  border-radius: 0.75rem;\n  color: #2d281f;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(230, 211, 169, 0.9607843137),\n      rgba(255, 242, 206, 0.968627451) 7%,\n      rgba(234, 216, 174, 0.9607843137) 98%);\n  box-shadow: 0 1.2rem 3.5rem rgba(2, 5, 4, 0.7215686275);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.decision-sheet {\n  right: auto;\n  left: 1rem;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.has-side-panel > .overlay-sheet {\n  position: relative;\n  grid-column: 1;\n  grid-row: 1;\n  inset: auto;\n  width: auto;\n  min-width: 0;\n  min-height: 0;\n  max-height: none;\n  border: 0;\n  border-right: 1px solid #b89c62;\n  border-radius: 0;\n  box-shadow: none;\n}\n.sheet-close {\n  display: flex;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  border: 0;\n  border-bottom: 1px solid #ad9568;\n  padding: 0.45rem 0.75rem;\n  color: #385449;\n  background: #f0e1bb;\n  font-size: 0.76rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.sheet-close span {\n  font-size: 1.25rem;\n  line-height: 1;\n}\n.sheet-scroll {\n  min-height: 0;\n  overflow-y: auto;\n  padding: 0.9rem;\n  scrollbar-color: #8e7349 #e1cea2;\n}\n.mission-goal-tabs {\n  position: sticky;\n  z-index: 3;\n  top: -0.9rem;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.35rem;\n  margin: -0.9rem -0.9rem 0.8rem;\n  border-bottom: 1px solid #9c814f;\n  padding: 0.55rem;\n  background: rgba(230, 211, 167, 0.9607843137);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.mission-goal-tabs button {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  min-height: 2.75rem;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #a88c58;\n  border-radius: 0.4rem;\n  padding: 0.45rem;\n  color: #443525;\n  background: #f7e9c7;\n  text-align: left;\n  cursor: pointer;\n}\n.mission-goal-tabs button:hover,\n.mission-goal-tabs button.selected {\n  border-color: #245e62;\n  color: #f9efd8;\n  background: #2d625c;\n}\n.mission-goal-tabs span {\n  font-size: 1.15rem;\n}\n.mission-goal-tabs strong {\n  font-size: 0.72rem;\n  line-height: 1.2;\n}\n.map-settings {\n  margin-bottom: 0.9rem;\n  border: 1px solid #ad9566;\n  border-radius: 0.5rem;\n  background: rgba(248, 236, 204, 0.9490196078);\n}\n.map-tools-popout {\n  position: absolute;\n  z-index: 18;\n  right: 1rem;\n  bottom: 13rem;\n  width: min(11rem, 100% - 2rem);\n  margin: 0;\n  border-color: #d1b462;\n  background: rgba(16, 36, 31, 0.9333333333);\n  box-shadow: 0 0.8rem 2rem rgba(2, 6, 5, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.map-settings.map-tools-popout > summary {\n  color: #f4e7c5;\n}\n.map-tools-popout > summary small {\n  color: #b9cbc0;\n}\n.map-tools-popout .map-settings-body {\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 0.45rem);\n  width: min(22rem, 100vw - 2rem);\n  max-height: min(65dvh, 34rem);\n  overflow-y: auto;\n  border: 1px solid #b99c62;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  color: #342b20;\n  background: rgba(246, 231, 196, 0.968627451);\n  box-shadow: 0 1rem 2.8rem rgba(2, 5, 4, 0.6784313725);\n}\n.map-settings > summary {\n  display: flex;\n  min-height: 3.2rem;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.6rem 0.75rem;\n  color: #3f3426;\n  cursor: pointer;\n}\n.map-settings > summary > span:first-child {\n  font-size: 1.35rem;\n}\n.map-settings > summary strong,\n.map-settings > summary small {\n  display: block;\n}\n.map-settings > summary small {\n  margin-top: 0.12rem;\n  color: #766346;\n  font-size: 0.72rem;\n}\n.map-settings-body {\n  display: grid;\n  gap: 0.75rem;\n  border-top: 1px solid #c5ad7c;\n  padding: 0.75rem;\n}\n.map-settings fieldset {\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.map-settings legend {\n  margin-bottom: 0.35rem;\n  color: #755432;\n  font-size: 0.7rem;\n  font-weight: 900;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.map-button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.map-button-row button {\n  min-height: 2.65rem;\n  border: 1px solid #987b4e;\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.65rem;\n  color: #423525;\n  background: #ead8ad;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: capitalize;\n  cursor: pointer;\n}\n.map-button-row button:hover:not(:disabled),\n.map-button-row button[aria-pressed=true] {\n  border-color: #285e58;\n  color: #f8efd9;\n  background: #315f53;\n}\n.map-button-row button:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.map-zoom-row {\n  align-items: center;\n}\n.map-zoom-row output {\n  min-width: 3.6rem;\n  color: #5f4c33;\n  font: 800 0.78rem ui-monospace, monospace;\n  text-align: center;\n}\n.utility-sheet {\n  overflow-y: auto;\n  padding: 1.15rem;\n}\n.utility-close {\n  position: sticky;\n  z-index: 2;\n  top: 0;\n  float: right;\n  display: grid;\n  width: 2.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #9f8553;\n  border-radius: 50%;\n  color: #4a3925;\n  background: #ecdbaf;\n  font-size: 1.35rem;\n  cursor: pointer;\n}\n.utility-sheet h2 {\n  margin: 0.25rem 2.8rem 0.55rem 0;\n  font-size: clamp(1.45rem, 3vw, 2rem);\n}\n.utility-sheet > p,\n.route-detail > p {\n  color: #554a37;\n  line-height: 1.55;\n}\ndl {\n  display: grid;\n  gap: 0.45rem;\n  margin: 0.75rem 0 0;\n}\ndl div {\n  border-top: 1px solid #c1aa78;\n  padding-top: 0.45rem;\n}\ndt {\n  color: #826440;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\ndd {\n  margin: 0.15rem 0 0;\n  color: #453a2b;\n  line-height: 1.4;\n}\n.route-detail,\n.destination-routes {\n  margin-top: 1rem;\n  border-top: 3px double #a78d5d;\n  padding-top: 0.85rem;\n}\n.route-detail > span,\n.destination-routes > span {\n  color: #8a4f2d;\n}\n.route-detail h3,\n.destination-routes h3 {\n  margin: 0.2rem 0 0.45rem;\n  font-size: 1.3rem;\n}\n.route-hint {\n  margin-top: 0.75rem;\n  border-left: 0.22rem solid #9c6d35;\n  padding: 0.55rem 0.65rem;\n  background: #f0dfb8;\n}\n.choose-map-route,\n.return-to-map {\n  width: 100%;\n  margin-top: 0.8rem;\n  color: #f5ecd5;\n  background: #315f53;\n  border-color: #315f53;\n}\n.destination-routes {\n  display: grid;\n  gap: 0.5rem;\n}\n.destination-routes button {\n  display: grid;\n  gap: 0.2rem;\n  min-height: 3.6rem;\n  border: 1px solid #aa9160;\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #332b20;\n  background: rgba(248, 236, 203, 0.9411764706);\n  text-align: left;\n  cursor: pointer;\n}\n.destination-routes button:hover {\n  border-color: #276865;\n  background: #e2ebdc;\n}\n.destination-routes small {\n  color: #6a5c43;\n}\n.resource-list {\n  display: grid;\n  gap: 0.85rem;\n  margin-top: 1rem;\n}\n.resource-list header {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.3rem;\n}\n.resource-list output {\n  color: #5b4b34;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.resource-list > div > div {\n  height: 0.58rem;\n  background: #c5b58d;\n}\n.log-list {\n  display: grid;\n  gap: 0.6rem;\n  margin-top: 0.8rem;\n}\n.log-list article {\n  border: 1px solid #baa474;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #fff5d8;\n}\n.log-list small {\n  display: block;\n  color: #876340;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.log-list strong {\n  display: block;\n  margin: 0.15rem 0 0.3rem;\n  font-family: Georgia, serif;\n}\n.log-list p,\n.log-list blockquote {\n  color: #594c37;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.log-list blockquote {\n  margin: 0.5rem 0 0;\n  border-left: 0.18rem solid #957747;\n  padding-left: 0.55rem;\n}\n.log-list footer {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.5rem;\n}\n.log-list footer span {\n  border-radius: 999px;\n  padding: 0.23rem 0.4rem;\n  color: #315949;\n  background: #dce8d3;\n  font-size: 0.63rem;\n  font-weight: 800;\n}\n.log-list footer button {\n  margin-left: auto;\n  border: 1px solid #8b7043;\n  border-radius: 0.3rem;\n  padding: 0.38rem 0.5rem;\n  color: #4b3722;\n  background: #ead9ae;\n  font-size: 0.68rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.revision-editor {\n  margin-top: 0.9rem;\n  border-top: 3px double #9f8655;\n  padding-top: 0.8rem;\n}\n.revision-editor label {\n  display: block;\n  margin-top: 0.5rem;\n  color: #5a4328;\n  font-size: 0.76rem;\n  font-weight: 800;\n}\n.revision-editor textarea {\n  width: 100%;\n  margin-top: 0.25rem;\n  resize: vertical;\n  border: 1px solid #9f895f;\n  border-radius: 0.35rem;\n  padding: 0.6rem;\n  background: #fff9e7;\n  font: 0.9rem/1.45 system-ui, sans-serif;\n}\n.revision-editor > div,\n.backup-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-top: 0.65rem;\n}\n.revision-editor button,\n.backup-actions button,\n.backup-actions label {\n  min-height: 2.5rem;\n  border: 1px solid #84683d;\n  border-radius: 0.35rem;\n  padding: 0.5rem 0.65rem;\n  color: #3d3020;\n  background: #ead9ae;\n  font-size: 0.74rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.backup-actions label {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.backup-actions input {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  opacity: 0;\n}\n.play-journey,\n.submit-journey {\n  width: 100%;\n  margin-top: 0.8rem;\n}\n.submission-card {\n  margin-top: 0.8rem;\n  border: 1px solid #a38a58;\n  border-radius: 0.45rem;\n  padding: 0.85rem;\n  background: #fff4d5;\n}\n.submission-card > span {\n  color: #8a4f2d;\n}\n.submission-card h2 {\n  margin-top: 0.25rem;\n  font-size: 1.3rem;\n}\n.submission-card p {\n  margin-top: 0.5rem;\n  color: #5c4d38;\n  line-height: 1.45;\n}\n.submission-card .submission-state {\n  display: inline-block;\n  border-radius: 999px;\n  padding: 0.3rem 0.55rem;\n  color: #5a351f;\n  background: #e4bd71;\n  font-size: 0.74rem;\n  font-weight: 900;\n  text-transform: capitalize;\n}\n.submission-card .submission-state.approved {\n  color: #eef8ef;\n  background: #37644f;\n}\n.view-overlay {\n  position: absolute;\n  z-index: 30;\n  inset: 0.8rem;\n  overflow: auto;\n  border: 1px solid #b89b5d;\n  border-radius: 0.8rem;\n  background: rgba(13, 25, 22, 0.9294117647);\n  box-shadow: 0 1.2rem 4rem rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.view-close {\n  position: sticky;\n  z-index: 45;\n  top: 0.65rem;\n  float: right;\n  margin: 0.65rem 0.65rem -3.4rem 0;\n}\n.replay-overlay {\n  padding: 0.5rem;\n}\n.conflict-banner {\n  position: absolute;\n  z-index: 50;\n  right: 1rem;\n  bottom: 1rem;\n  left: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border: 1px solid #cf8e55;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  color: #3f2b20;\n  background: rgba(242, 211, 157, 0.9607843137);\n  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.5333333333);\n}\n.conflict-banner h2 {\n  margin-top: 0.15rem;\n  font-size: 1.1rem;\n}\n.conflict-banner p {\n  margin-top: 0.2rem;\n  font-size: 0.76rem;\n}\n.conflict-banner > div:last-child {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.conflict-banner button {\n  min-height: 2.5rem;\n  border: 1px solid #7b5430;\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.6rem;\n  color: #f7ecd5;\n  background: #62442d;\n  font-size: 0.72rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.toast {\n  position: fixed;\n  z-index: 100;\n  right: 1rem;\n  bottom: 1rem;\n  display: flex;\n  max-width: min(30rem, 100% - 2rem);\n  align-items: center;\n  gap: 0.7rem;\n  border: 1px solid #a68a4d;\n  border-radius: 0.45rem;\n  padding: 0.75rem 0.85rem;\n  color: #efe5c8;\n  background: #24483f;\n  box-shadow: 0 0.8rem 2rem rgba(5, 10, 8, 0.6666666667);\n}\n.toast.error {\n  border-color: #cb7166;\n  background: #71352e;\n}\n.toast button {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n@media (max-width: 900px) {\n  .project-title {\n    min-width: 10rem;\n  }\n  .voyage-status {\n    width: 11rem;\n  }\n  .artifact-tools small {\n    display: none;\n  }\n}\n@media (max-width: 760px) {\n  .has-side-panel {\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-rows: minmax(200px, 43%) minmax(0, 57%);\n  }\n  .has-side-panel .map-canvas {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .has-side-panel > .overlay-sheet {\n    grid-column: 1;\n    grid-row: 2;\n    border-top: 1px solid #b89c62;\n  }\n  .voyage-resources {\n    gap: 5px;\n    padding: 6px;\n  }\n  .voyage-resources span {\n    font-size: 8px;\n    letter-spacing: 0;\n  }\n  .voyage-resources strong {\n    font-size: 15px;\n  }\n  .map-tools-popout {\n    top: 3.7rem;\n    bottom: auto;\n    right: 0.5rem;\n  }\n  .map-tools-popout[open] {\n    max-height: none;\n    overflow: visible;\n  }\n  .map-tools-popout .map-settings-body {\n    top: calc(100% + 0.4rem);\n    bottom: auto;\n    max-height: 45dvh;\n  }\n  .command-bar {\n    min-height: 3.7rem;\n    gap: 0.45rem;\n    padding: 0.45rem 0.55rem;\n  }\n  .project-title {\n    min-width: 0;\n  }\n  .project-title > span,\n  .voyage-status > span,\n  .voyage-status small {\n    display: none;\n  }\n  h1 {\n    font-size: 1rem;\n  }\n  .voyage-status {\n    width: 4.5rem;\n  }\n  .artifact-tools {\n    gap: 0.25rem;\n  }\n  .artifact-tools button,\n  .voyage-menu summary {\n    min-width: 2.75rem;\n    min-height: 2.75rem;\n    justify-content: center;\n    padding: 0.4rem;\n  }\n  .voyage-menu summary {\n    font-size: 0;\n  }\n  .voyage-menu summary::after {\n    content: "\\2022\\2022\\2022";\n    font-size: 0.85rem;\n  }\n  .overlay-sheet {\n    top: auto;\n    right: 0.5rem;\n    bottom: 0.5rem;\n    left: 0.5rem;\n    width: auto;\n    max-height: min(68dvh, 42rem);\n  }\n  .utility-sheet {\n    max-height: min(76dvh, 46rem);\n  }\n  .map-prompt {\n    right: 0.75rem;\n    bottom: 0.75rem;\n    left: 0.75rem;\n    width: auto;\n  }\n  .view-overlay {\n    inset: 0.4rem;\n  }\n  .conflict-banner {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=journey-shell.css.map */\n'] }]
  }], () => [], { decisionPanel: [{ type: ViewChild, args: [forwardRef(() => JourneyDecisionPanelComponent), { isSignal: true }] }], livingMap: [{ type: ViewChild, args: [forwardRef(() => LivingJourneyMapComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyReplayPageComponent, { className: "JourneyReplayPageComponent", filePath: "src/app/templates/journey-replay/ui/journey-shell.component.ts", lineNumber: 45 });
})();
export {
  JourneyReplayPageComponent
};
//# debugId=b6de31a9-dbe9-5fd1-8931-7c334439bdf9
//# sourceMappingURL=chunk-QA2YYO42.js.map
