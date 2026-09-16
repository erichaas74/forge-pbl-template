import {
  InquiryExampleComponent
} from "./chunk-QC3X7FWS.js";
import {
  inquiryTargetReady,
  latestInquiryAttempt
} from "./chunk-H7BIYLRY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  Component,
  ElementRef,
  InjectionToken,
  Injector,
  Output,
  afterNextRender,
  computed,
  inject,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-E2VJWGUE.js";

// src/app/shared/inquiry/inquiry-workspace.port.ts
var INQUIRY_WORKSPACE = new InjectionToken("INQUIRY_WORKSPACE");

// src/app/shared/inquiry/inquiry-workspace.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function InquiryWorkspaceComponent_Conditional_38_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-inquiry-example", 30);
  }
  if (rf & 2) {
    const example_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("example", example_r1)("sources", ctx_r1.runtime.config.evidence);
  }
}
function InquiryWorkspaceComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, InquiryWorkspaceComponent_Conditional_38_For_1_Template, 1, 2, "app-inquiry-example", 30, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.examples());
  }
}
function InquiryWorkspaceComponent_Conditional_39_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", target_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", target_r4.label, "", ctx_r1.targetReady(target_r4.id) ? " \xB7 reviewed in demo" : "", " ");
  }
}
function InquiryWorkspaceComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "label", 31);
    \u0275\u0275text(2, "Choose one learning target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 32);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_39_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectTarget($event));
    });
    \u0275\u0275repeaterCreate(4, InquiryWorkspaceComponent_Conditional_39_For_5_Template, 2, 3, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.targetId());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.config.targets);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" ", ctx_r1.confirmedCount(), " of ", ctx_r1.config.targets.length, " targets reviewed as ready in this demo. ", ctx_r1.config.recordSummary, " ");
  }
}
function InquiryWorkspaceComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.lesson().task);
  }
}
function InquiryWorkspaceComponent_Conditional_41_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gate_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Lesson ", gate_r5.afterLesson, " \xB7 ", gate_r5.criteria);
  }
}
function InquiryWorkspaceComponent_Conditional_41_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InquiryWorkspaceComponent_Conditional_41_For_6_Conditional_0_Template, 2, 2, "p");
  }
  if (rf & 2) {
    const gate_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(gate_r5.id === ctx_r1.lesson().requiresGate ? 0 : -1);
  }
}
function InquiryWorkspaceComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 12)(1, "strong");
    \u0275\u0275text(2, "Teacher checkpoint before this task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, InquiryWorkspaceComponent_Conditional_41_For_6_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().requiresGate?.toUpperCase(), " needs review. You can keep reading sources and getting help. Return to the earlier checkpoint for a fresh response. ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.config.gates);
  }
}
function InquiryWorkspaceComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r6 = ctx.$implicit;
    \u0275\u0275property("value", source_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r6.title);
  }
}
function InquiryWorkspaceComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.source().imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.source().imageAlt || ctx_r1.source().title);
  }
}
function InquiryWorkspaceComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 23);
    \u0275\u0275text(1, "Open source reference \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r1.source().sourceUrl, \u0275\u0275sanitizeUrl);
  }
}
function InquiryWorkspaceComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Independent check \xB7 sources allowed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Show your thinking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7, " Answer on your own. Practice hints are closed during this check. If you need support, return to practice and ask for a fresh check afterward. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "label", 33);
    \u0275\u0275text(9, "My answer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 34);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_69_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.checkKey(), $event));
    })("blur", function InquiryWorkspaceComponent_Conditional_69_Template_textarea_blur_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(11, "div", 35)(12, "button", 36);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_69_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(13, " Save for review ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 8);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_69_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.checking.set(false));
    });
    \u0275\u0275text(15, "Back to practice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.checkPrompt());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.blocked())("ngModel", ctx_r1.draft(ctx_r1.checkKey()));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.blocked() || !ctx_r1.draft(ctx_r1.checkKey()).trim());
  }
}
function InquiryWorkspaceComponent_Conditional_70_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 39);
    \u0275\u0275text(7, "My practice explanation and source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 40);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_70_Conditional_0_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("target-" + ctx_r1.targetId(), $event));
    })("blur", function InquiryWorkspaceComponent_Conditional_70_Conditional_0_Template_textarea_blur_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.target().standardId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.target().label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.target().prompt);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.draft("target-" + ctx_r1.targetId()));
    \u0275\u0275control();
  }
}
function InquiryWorkspaceComponent_Conditional_70_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "textarea", 43);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_70_Conditional_1_For_1_Template_textarea_ngModelChange_4_listener($event) {
      const field_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.fieldKey(field_r11.id), $event));
    })("blur", function InquiryWorkspaceComponent_Conditional_70_Conditional_1_For_1_Template_textarea_blur_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const field_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("for", field_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r11.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r11.prompt);
    \u0275\u0275advance();
    \u0275\u0275property("id", field_r11.id)("disabled", ctx_r1.blocked())("ngModel", ctx_r1.draft(ctx_r1.fieldKey(field_r11.id)));
    \u0275\u0275control();
  }
}
function InquiryWorkspaceComponent_Conditional_70_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, InquiryWorkspaceComponent_Conditional_70_Conditional_1_For_1_Template, 5, 6, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.lesson().fields);
  }
}
function InquiryWorkspaceComponent_Conditional_70_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 38)(1, "summary");
    \u0275\u0275text(2, "Ready for a side quest?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 44);
    \u0275\u0275text(6, "My extension");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 45);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_70_Conditional_14_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.fieldKey("side-quest"), $event));
    })("blur", function InquiryWorkspaceComponent_Conditional_70_Conditional_14_Template_textarea_blur_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "A side quest adds depth. It does not complete a checkpoint for you.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.lesson().sideQuest);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.draft(ctx_r1.fieldKey("side-quest")));
    \u0275\u0275control();
  }
}
function InquiryWorkspaceComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, InquiryWorkspaceComponent_Conditional_70_Conditional_0_Template, 9, 4)(1, InquiryWorkspaceComponent_Conditional_70_Conditional_1_Template, 2, 0);
    \u0275\u0275elementStart(2, "details", 37)(3, "summary");
    \u0275\u0275text(4, "I need a little help");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Use this in practice, then complete an independent check.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 35)(10, "button", 36);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_70_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCheck());
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_70_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveWork());
    });
    \u0275\u0275text(13, "Save my work");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, InquiryWorkspaceComponent_Conditional_70_Conditional_14_Template, 10, 2, "details", 38);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.tab() === "record" ? 0 : 1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.lesson().help);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.blocked());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.latest() ? "Try a fresh check" : "Try my checkpoint", " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.latest() && ctx_r1.runtime.inquiryState().reviews[ctx_r1.latest().id]?.decision === "ready" ? 14 : -1);
  }
}
function InquiryWorkspaceComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 25)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "Earlier responses are preserved in your portfolio download.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attempt_r13 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.decision === "ready" ? "Reviewed as ready \xB7 demo only" : ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.decision === "revise" ? "Try again with feedback" : "Response waiting for review", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attempt_r13.response);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.feedback);
  }
}
function InquiryWorkspaceComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.message());
  }
}
function InquiryWorkspaceComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 46);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_73_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hearingRequested.emit());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.config.finalActionLabel || "Enter the hearing", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.config.finalActionNote || "Local demonstration of the debate room. Shared class filing and recordings require the school gateway.", " ");
  }
}
function InquiryWorkspaceComponent_Conditional_74_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gate_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.runtime.inquiryGate(gate_r15.id) ? "\u2713 Demo reviewed" : "\u25CB Review needed", " \xB7 ", gate_r15.label, ": ", gate_r15.criteria, " ");
  }
}
function InquiryWorkspaceComponent_Conditional_74_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const standard_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.standardReady(standard_r16) ? "\u2713 All targets reviewed in demo" : "\u25CB Evidence still needed", " \xB7 ", standard_r16, " ");
  }
}
function InquiryWorkspaceComponent_Conditional_74_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_74_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.toggleTeacherPreview());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.teacherPreview() ? "Close teacher preview" : "Open teacher preview", " ");
  }
}
function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 52);
    \u0275\u0275text(1, "Observed presentation or discussion evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "textarea", 53);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Conditional_10_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.performanceEvidence.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.performanceEvidence());
    \u0275\u0275control();
  }
}
function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "strong");
    \u0275\u0275text(2, "Demo review \u2014 this learner\u2019s latest response");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, " Read the response and cited work before deciding. These controls cannot issue official grades or unlock a live school session. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 49);
    \u0275\u0275text(6, "Feedback tied to the evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 50);
    \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.feedback.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, " Review the complete saved work against the standard, including each required part. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, InquiryWorkspaceComponent_Conditional_74_Conditional_22_Conditional_10_Template, 3, 1);
    \u0275\u0275elementStart(11, "div", 35)(12, "button", 51);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.review("ready"));
    });
    \u0275\u0275text(13, " Demo: ready");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 51);
    \u0275\u0275listener("click", function InquiryWorkspaceComponent_Conditional_74_Conditional_22_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.review("revise"));
    });
    \u0275\u0275text(15, " Demo: needs revision ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r1.feedback());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.needsPerformance() ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.feedback().trim() || ctx_r1.needsPerformance() && !ctx_r1.performanceEvidence().trim());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.feedback().trim());
  }
}
function InquiryWorkspaceComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 28)(1, "summary");
    \u0275\u0275text(2, "Teacher & tutor guide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Teacher:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Tutor task:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, " Scripted practice is available here. A connected AI tutor should recommend readiness from individual evidence; only an authorized teacher can confirm official completion. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ul");
    \u0275\u0275repeaterCreate(16, InquiryWorkspaceComponent_Conditional_74_For_17_Template, 2, 3, "li", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ul");
    \u0275\u0275repeaterCreate(19, InquiryWorkspaceComponent_Conditional_74_For_20_Template, 2, 2, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, InquiryWorkspaceComponent_Conditional_74_Conditional_21_Template, 2, 1, "button", 47);
    \u0275\u0275conditionalCreate(22, InquiryWorkspaceComponent_Conditional_74_Conditional_22_Template, 16, 4, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().teacher);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().tutor);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.lesson().workload);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.config.gates);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.standards);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.config.viewer.allowTeacherPreview ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.canManageModerator() && ctx_r1.latest() ? 22 : -1);
  }
}
var InquiryWorkspaceComponent = class _InquiryWorkspaceComponent {
  host = inject(ElementRef);
  injector = inject(Injector);
  runtime = inject(INQUIRY_WORKSPACE);
  config = this.runtime.config.inquiry;
  hearingRequested = output();
  lessonNumber = signal(
    1,
    ...ngDevMode ? [{ debugName: "lessonNumber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lesson = computed(
    () => this.config.lessons[this.lessonNumber() - 1],
    ...ngDevMode ? [{ debugName: "lesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  examples = computed(
    () => this.config.examples?.filter((e) => e.lesson === this.lessonNumber()) ?? [],
    ...ngDevMode ? [{ debugName: "examples" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSourceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedSourceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = computed(
    () => this.runtime.config.evidence.find((e) => e.id === this.selectedSourceId()) ?? this.runtime.config.evidence.find((e) => e.id === this.lesson().sourceIds[0]),
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tab = signal(
    "work",
    ...ngDevMode ? [{ debugName: "tab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  targetId = signal(
    this.config.targets[0].id,
    ...ngDevMode ? [{ debugName: "targetId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  target = computed(
    () => this.config.targets.find((t) => t.id === this.targetId()),
    ...ngDevMode ? [{ debugName: "target" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checking = signal(
    false,
    ...ngDevMode ? [{ debugName: "checking" }] : (
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
  performanceEvidence = signal(
    "",
    ...ngDevMode ? [{ debugName: "performanceEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  needsPerformance = computed(
    () => !!this.latest()?.targetId && !!this.config.targets.find((t) => t.id === this.latest()?.targetId)?.requiresPerformanceEvidence,
    ...ngDevMode ? [{ debugName: "needsPerformance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  blocked = computed(
    () => !!this.lesson().requiresGate && !this.runtime.inquiryGate(this.lesson().requiresGate),
    ...ngDevMode ? [{ debugName: "blocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  latest = computed(
    () => this.tab() === "record" ? [...this.runtime.inquiryState().attempts].reverse().find((a) => a.targetId === this.targetId()) : latestInquiryAttempt(this.runtime.inquiryState(), this.lessonNumber()),
    ...ngDevMode ? [{ debugName: "latest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkPrompt = computed(
    () => this.tab() === "record" ? `${this.latest() ? "Use a different example or source detail from your last response. " : ""}${this.target().prompt}` : this.latest() ? this.lesson().retry : this.lesson().check,
    ...ngDevMode ? [{ debugName: "checkPrompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  standards = [...new Set(this.config.targets.map((t) => t.standardId))];
  confirmedCount = computed(
    () => this.config.targets.filter((t) => this.targetReady(t.id)).length,
    ...ngDevMode ? [{ debugName: "confirmedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkKey = computed(
    () => `check-${this.tab() === "record" ? this.targetId() : this.lessonNumber()}`,
    ...ngDevMode ? [{ debugName: "checkKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    bindLessonFocus((lesson) => {
      this.runtime.saveInquiryDrafts();
      this.lessonNumber.set(lesson.number);
      this.selectedSourceId.set("");
      this.checking.set(false);
      this.tab.set("work");
      this.message.set("");
    });
  }
  draft(key) {
    return this.runtime.inquiryState().drafts[key] ?? "";
  }
  fieldKey(id) {
    return `lesson-${this.lessonNumber()}-${id}`;
  }
  targetReady(id) {
    return inquiryTargetReady(this.runtime.inquiryState(), id);
  }
  standardReady(id) {
    return this.config.targets.filter((t) => t.standardId === id).every((t) => this.targetReady(t.id));
  }
  changeTab(tab) {
    this.runtime.saveInquiryDrafts();
    this.tab.set(tab);
    this.checking.set(false);
    this.message.set("");
    this.reveal(tab === "record" ? "#concept" : ".response-card");
  }
  selectTarget(id) {
    this.runtime.saveInquiryDrafts();
    this.targetId.set(id);
    this.checking.set(false);
    this.selectedSourceId.set(this.target().sourceIds[0]);
    this.message.set("");
    this.reveal(".response-card");
  }
  startCheck() {
    this.checking.set(true);
    this.message.set("");
    this.reveal("#independent-response");
  }
  saveWork() {
    this.runtime.saveInquiryDrafts();
    this.message.set(this.runtime.saveState() === "local" ? "Work is still on this page, but could not be saved. Keep the page open and download your portfolio." : "Draft saved on this device. A saved draft is not a completed standard.");
  }
  reveal(selector) {
    afterNextRender(() => {
      const element = this.host.nativeElement.querySelector(selector);
      element?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  submit() {
    if (!this.checking())
      return;
    if (this.runtime.submitInquiryAttempt(this.lessonNumber(), this.checkPrompt(), this.draft(this.checkKey()), this.tab() === "record" ? this.targetId() : void 0)) {
      this.checking.set(false);
      this.runtime.updateInquiryDraft(this.checkKey(), "");
      this.runtime.saveInquiryDrafts();
      this.message.set(this.runtime.saveState() === "local" ? "Response kept on this page, but storage is unavailable. Keep the page open and download your portfolio." : "Response saved for demo review. Earlier attempts are kept. This is not an official submission.");
    }
  }
  review(decision) {
    const attempt = this.latest();
    if (!attempt)
      return;
    if (decision === "ready" && this.needsPerformance() && !this.performanceEvidence().trim())
      return;
    this.runtime.reviewInquiryAttempt(attempt.id, decision, this.feedback(), this.performanceEvidence());
    this.performanceEvidence.set("");
    this.feedback.set("");
    this.message.set(this.runtime.saveState() === "local" ? "Demo review could not be saved. Keep this page open and download the portfolio." : "Demo review saved. Official mastery is unchanged.");
  }
  exportPortfolio() {
    this.runtime.saveInquiryDrafts();
    const state = this.runtime.inquiryState();
    const lines = [
      `# ${this.runtime.config.title} \u2014 individual portfolio`,
      "",
      `Learner: ${this.runtime.config.viewer.studentDisplayName}`,
      "Local demonstration export. Reviews are not official mastery.",
      ""
    ];
    for (const lesson of this.config.lessons) {
      lines.push(`## Lesson ${lesson.number}: ${lesson.title}`);
      for (const field of lesson.fields)
        lines.push(`### ${field.label}`, state.drafts[`lesson-${lesson.number}-${field.id}`] ?? "(No draft)", "");
      const extension = state.drafts[`lesson-${lesson.number}-side-quest`];
      if (extension)
        lines.push("### Side quest", extension, "");
    }
    for (const target of this.config.targets)
      lines.push(`## ${target.label} \u2014 ${target.standardId}`, state.drafts[`target-${target.id}`] ?? "(No practice note)", "");
    for (const attempt of state.attempts) {
      const review = state.reviews[attempt.id];
      lines.push(`## ${attempt.targetId ?? `Lesson ${attempt.lesson}`} \u2014 ${attempt.createdAt}`, attempt.prompt, "", attempt.response, "", review ? `Demo review: ${review.decision}. ${review.feedback}` : "Awaiting review.", ...attempt.evidenceDrafts ? [
        "### Work at the time of this response",
        ...Object.entries(attempt.evidenceDrafts).filter(([key]) => !key.startsWith("check-")).map(([key, value]) => `${key}
${value}
`)
      ] : [], "");
    }
    lines.push("## Review history", ...(state.reviewHistory ?? []).map((r) => `${r.createdAt} | ${r.attemptId} | ${r.reviewerId} | demo: ${r.decision} | ${r.feedback} | ${r.performanceEvidence ?? ""}`), "", "## Source packet", ...this.runtime.config.evidence.map((e) => `${e.title}: ${e.citation}
${e.sourceUrl ?? ""}
`));
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/markdown" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.runtime.config.projectId}-portfolio.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function InquiryWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InquiryWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InquiryWorkspaceComponent, selectors: [["app-inquiry-workspace"]], outputs: { hearingRequested: "hearingRequested" }, decls: 77, vars: 31, consts: [["aria-labelledby", "inquiry-title", 1, "inquiry"], [1, "scene-introduction"], ["id", "inquiry-title"], [1, "learning-desk"], [1, "desk-top"], [1, "eyebrow"], ["role", "status", 1, "save-status"], ["aria-label", "My work", 1, "desk-tabs"], ["type", "button", 3, "click"], [1, "help-menu"], [1, "record-heading"], [1, "task-instruction"], ["role", "status", 1, "gate-note"], [1, "desk-columns"], ["aria-label", "Historical source", 1, "source-card"], ["for", "source-select"], ["id", "source-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "source-kind"], [1, "source-image", 3, "src", "alt"], [1, "small-note"], ["tabindex", "0", "role", "region", "aria-label", "Source reading", 1, "source-excerpt"], [1, "source-context"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["aria-label", "My response", "tabindex", "-1", 1, "response-card"], [1, "review-result"], ["role", "status", 1, "status-message"], [1, "final-action"], [1, "teacher-guide"], [1, "artwork-caption"], [3, "example", "sources"], ["for", "concept"], ["id", "concept", 3, "ngModelChange", "ngModel"], ["for", "independent-response"], ["id", "independent-response", "rows", "7", 3, "ngModelChange", "blur", "disabled", "ngModel"], [1, "actions"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "practice-help"], [1, "side-quest"], ["for", "concept-note"], ["id", "concept-note", "rows", "5", 3, "ngModelChange", "blur", "ngModel"], [3, "for"], [1, "field-prompt"], ["rows", "3", 3, "ngModelChange", "blur", "id", "disabled", "ngModel"], ["for", "side-quest"], ["id", "side-quest", "rows", "3", 3, "ngModelChange", "blur", "ngModel"], ["type", "button", 1, "primary", 3, "click"], ["type", "button"], [1, "demo-review"], ["for", "review-feedback"], ["id", "review-feedback", "rows", "3", 3, "ngModelChange", "ngModel"], ["type", "button", 3, "click", "disabled"], ["for", "performance-evidence"], ["id", "performance-evidence", "rows", "3", "placeholder", "Record the learner, observed skill, lesson/date or recording timestamp. Text answers alone do not demonstrate speaking or listening.", 3, "ngModelChange", "ngModel"]], template: function InquiryWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "span");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 3)(9, "div", 4)(10, "div")(11, "span", 5);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "h2");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "nav", 7)(18, "button", 8);
      \u0275\u0275listener("click", function InquiryWorkspaceComponent_Template_button_click_18_listener() {
        return ctx.changeTab("work");
      });
      \u0275\u0275text(19, " Today\u2019s task ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 8);
      \u0275\u0275listener("click", function InquiryWorkspaceComponent_Template_button_click_20_listener() {
        return ctx.changeTab("record");
      });
      \u0275\u0275text(21, " My learning record ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "details", 9)(23, "summary");
      \u0275\u0275text(24, "About this project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "p");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p")(31, "strong");
      \u0275\u0275text(32, "Local pilot:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, " work saves on this device. Tutor questions are scripted; live AI and school submission are not connected. Teacher preview demonstrates reviews only. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "p");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 8);
      \u0275\u0275listener("click", function InquiryWorkspaceComponent_Template_button_click_36_listener() {
        return ctx.exportPortfolio();
      });
      \u0275\u0275text(37, "Download my portfolio");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(38, InquiryWorkspaceComponent_Conditional_38_Template, 2, 0);
      \u0275\u0275conditionalCreate(39, InquiryWorkspaceComponent_Conditional_39_Template, 8, 4, "div", 10)(40, InquiryWorkspaceComponent_Conditional_40_Template, 2, 1, "p", 11);
      \u0275\u0275conditionalCreate(41, InquiryWorkspaceComponent_Conditional_41_Template, 7, 1, "aside", 12);
      \u0275\u0275elementStart(42, "div", 13)(43, "aside", 14)(44, "label", 15);
      \u0275\u0275text(45, "Read a source");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "select", 16);
      \u0275\u0275listener("ngModelChange", function InquiryWorkspaceComponent_Template_select_ngModelChange_46_listener($event) {
        return ctx.selectedSourceId.set($event);
      });
      \u0275\u0275repeaterCreate(47, InquiryWorkspaceComponent_For_48_Template, 2, 2, "option", 17, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(49, "span", 18);
      \u0275\u0275text(50);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "h3");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(53, InquiryWorkspaceComponent_Conditional_53_Template, 1, 2, "img", 19);
      \u0275\u0275elementStart(54, "p", 20);
      \u0275\u0275text(55, "Read the whole passage. Scroll inside the reading for more.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 21);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p", 22);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "details")(61, "summary");
      \u0275\u0275text(62, "Where this source comes from");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "p");
      \u0275\u0275text(64);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p");
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, InquiryWorkspaceComponent_Conditional_67_Template, 2, 1, "a", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "section", 24);
      \u0275\u0275conditionalCreate(69, InquiryWorkspaceComponent_Conditional_69_Template, 16, 4)(70, InquiryWorkspaceComponent_Conditional_70_Template, 15, 5);
      \u0275\u0275conditionalCreate(71, InquiryWorkspaceComponent_Conditional_71_Template, 9, 3, "details", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(72, InquiryWorkspaceComponent_Conditional_72_Template, 2, 1, "p", 26);
      \u0275\u0275conditionalCreate(73, InquiryWorkspaceComponent_Conditional_73_Template, 5, 2, "div", 27);
      \u0275\u0275conditionalCreate(74, InquiryWorkspaceComponent_Conditional_74_Template, 23, 5, "details", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "p", 29);
      \u0275\u0275text(76);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_26_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.config.historicalSetting);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.centralQuestion);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("Week ", (ctx.lessonNumber() + 1 - (ctx.lessonNumber() % 2 === 0 ? 1 : 0)) / 2, " \xB7 ", ctx.lessonNumber() % 2 ? "Learn on your own" : "Work together");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lesson().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Practice preview \xB7 ", ctx.runtime.saveState() === "saving" ? "Saving\u2026" : ctx.runtime.saveState() === "local" ? "Not saved \xB7 keep this page open" : "Saved on this device");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.tab() === "work");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.tab() === "record");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.config.introduction);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config.artworkCaption);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.lesson().workload);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.tab() === "work" && !ctx.checking() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tab() === "record" ? 39 : 40);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.blocked() ? 41 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.source().id);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.config.evidence);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.source().sourceType, " \xB7 ", ctx.source().dateLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.source().imageUrl ? 53 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.source().excerpt, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().context);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.source().citation);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().perspective);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.source().sourceUrl ? 67 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.checking() ? 69 : 70);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_26_0 = !ctx.checking() && ctx.latest()) ? 71 : -1, tmp_26_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.lessonNumber() >= (ctx.config.studioFromLesson ?? 8) && !ctx.blocked() ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checking() ? 74 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config.artworkCaption);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, InquiryExampleComponent], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.inquiry[_ngcontent-%COMP%] {\n  padding: 0 clamp(14px, 3vw, 44px) 24px;\n  color: #29251f;\n}\n.scene-introduction[_ngcontent-%COMP%] {\n  padding: 32px 12px 26px;\n  color: #fff4d9;\n  text-align: center;\n  text-shadow: 0 2px 12px #241106;\n}\n.scene-introduction[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font: 600 clamp(30px, 4vw, 48px)/1.1 Georgia, serif;\n}\n.scene-introduction[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  font-size: 18px;\n}\n.learning-desk[_ngcontent-%COMP%] {\n  max-width: 1160px;\n  margin: auto;\n  padding: clamp(16px, 2.5vw, 30px);\n  border: 1px solid #e7cf9c;\n  border-radius: 18px;\n  background: rgba(251, 247, 237, 0.9803921569);\n  box-shadow: 0 14px 50px rgba(35, 23, 11, 0.4392156863);\n}\n.desk-top[_ngcontent-%COMP%], \n.desk-tabs[_ngcontent-%COMP%], \n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.desk-top[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.desk-top[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #7b5830;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 5px 0 12px;\n  font-size: 25px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 700 23px/1.25 Georgia, serif;\n  margin: 15px 0;\n}\n.save-status[_ngcontent-%COMP%], \n.small-note[_ngcontent-%COMP%], \n.record-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #56574f;\n}\n.desk-tabs[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #d9cfbc;\n  padding: 6px 0 16px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  min-height: 48px;\n  font: 600 15px/1.3 system-ui, sans-serif;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  border: 1px solid #c9bba2;\n  border-radius: 9px;\n  background: #fffdf7;\n  color: #3f3325;\n  cursor: pointer;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #e9dfc8;\n  border-color: #8a6b3f;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #2d5552;\n  color: white;\n  border-color: #2d5552;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.96);\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #247574;\n  outline-offset: 3px;\n}\n.task-instruction[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1.55;\n  max-width: 940px;\n}\n.desk-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  gap: 26px;\n  align-items: start;\n  margin-top: 22px;\n}\n.source-card[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f0e5cf;\n  border: 1px solid #dbcaab;\n  border-radius: 12px;\n}\n.source-kind[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: #685334;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.55;\n}\n.source-excerpt[_ngcontent-%COMP%] {\n  font: 19px/1.65 Georgia, serif;\n}\n.source-context[_ngcontent-%COMP%] {\n  padding-top: 14px;\n  border-top: 1px solid #cdbb98;\n  font-size: 15px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 0 8px;\n  font-weight: 750;\n  font-size: 16px;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px;\n  background: #fffefa;\n  color: #262d2b;\n  border: 1px solid #aa9e86;\n  border-radius: 8px;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: 17px/1.55 system-ui, sans-serif;\n  resize: vertical;\n  margin-bottom: 18px;\n}\n.field-prompt[_ngcontent-%COMP%] {\n  margin: -2px 0 10px;\n  font-size: 14px;\n  color: #555348;\n}\nsummary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  color: #2a5756;\n}\nsummary[_ngcontent-%COMP%]::before {\n  content: "+";\n  margin-right: 10px;\n  font-size: 20px;\n}\ndetails[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::before {\n  content: "\\2212";\n}\ndetails[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.help-menu[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.help-menu[open][_ngcontent-%COMP%] {\n  flex-basis: 100%;\n}\n.help-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  max-width: 850px;\n  padding: 0 12px;\n}\n.practice-help[_ngcontent-%COMP%], \n.side-quest[_ngcontent-%COMP%], \n.review-result[_ngcontent-%COMP%] {\n  border-top: 1px solid #d9cfbc;\n  margin: 12px 0;\n}\n.review-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n.record-heading[_ngcontent-%COMP%], \n.gate-note[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 16px;\n  border-radius: 9px;\n  background: #eee6d5;\n}\n.record-heading[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  max-width: 540px;\n}\n.gate-note[_ngcontent-%COMP%] {\n  border-left: 4px solid #aa7535;\n  background: #fff0d4;\n}\n.teacher-guide[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  border-top: 1px solid #ccc0a9;\n}\n.teacher-guide[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.demo-review[_ngcontent-%COMP%] {\n  padding: 18px;\n  background: #e7eeea;\n  border-radius: 10px;\n  margin-top: 18px;\n}\n.status-message[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #e7eeea;\n  border-radius: 8px;\n}\n.final-action[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.final-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.artwork-caption[_ngcontent-%COMP%] {\n  margin: 18px auto 0;\n  max-width: 1100px;\n  text-align: center;\n  font-size: 12px;\n  color: #fff4d9;\n  text-shadow: 0 1px 6px #000;\n}\na[_ngcontent-%COMP%] {\n  color: #175d60;\n  overflow-wrap: anywhere;\n}\n@media (max-width: 720px) {\n  .desk-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 22px;\n  }\n  .scene-introduction[_ngcontent-%COMP%] {\n    padding: 26px 0 22px;\n  }\n  .help-menu[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .source-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.source-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n.source-excerpt[_ngcontent-%COMP%] {\n  white-space: pre-line;\n  max-height: min(55vh, 480px);\n  overflow: auto;\n  padding-right: 10px;\n  overscroll-behavior: contain;\n}\n.source-excerpt[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #aa7027;\n  outline-offset: 4px;\n}\n/*# sourceMappingURL=inquiry-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InquiryWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-inquiry-workspace", imports: [FormsModule, InquiryExampleComponent], template: `<section class="inquiry" aria-labelledby="inquiry-title">
  <div class="scene-introduction">
    <span>{{ runtime.config.historicalSetting }}</span>
    <h1 id="inquiry-title">{{ runtime.config.title }}</h1>
    <p>{{ runtime.config.centralQuestion }}</p>
  </div>
  <div class="learning-desk">
    <div class="desk-top">
      <div>
        <span class="eyebrow"
          >Week {{ (lessonNumber() + 1 - (lessonNumber() % 2 === 0 ? 1 : 0)) / 2 }} \xB7
          {{ lessonNumber() % 2 ? 'Learn on your own' : 'Work together' }}</span
        >
        <h2>{{ lesson().title }}</h2>
      </div>
      <span class="save-status" role="status"
        >Practice preview \xB7
        {{
          runtime.saveState() === 'saving'
            ? 'Saving\u2026'
            : runtime.saveState() === 'local'
              ? 'Not saved \xB7 keep this page open'
              : 'Saved on this device'
        }}</span
      >
    </div>
    <nav class="desk-tabs" aria-label="My work">
      <button type="button" [attr.aria-pressed]="tab() === 'work'" (click)="changeTab('work')">
        Today\u2019s task
      </button>
      <button type="button" [attr.aria-pressed]="tab() === 'record'" (click)="changeTab('record')">
        My learning record
      </button>
      <details class="help-menu">
        <summary>About this project</summary>
        <div>
          <p>{{ config.introduction }}</p>
          <p>{{ config.artworkCaption }}</p>
          <p>
            <strong>Local pilot:</strong> work saves on this device. Tutor questions are scripted;
            live AI and school submission are not connected. Teacher preview demonstrates reviews
            only.
          </p>
          <p>{{ lesson().workload }}</p>
          <button type="button" (click)="exportPortfolio()">Download my portfolio</button>
        </div>
      </details>
    </nav>
    @if (tab() === 'work' && !checking()) {
      @for (example of examples(); track example.id) {
        <app-inquiry-example [example]="example" [sources]="runtime.config.evidence" />
      }
    }
    @if (tab() === 'record') {
      <div class="record-heading">
        <label for="concept">Choose one learning target</label>
        <select id="concept" [ngModel]="targetId()" (ngModelChange)="selectTarget($event)">
          @for (target of config.targets; track target.id) {
            <option [value]="target.id">
              {{ target.label }}{{ targetReady(target.id) ? ' \xB7 reviewed in demo' : '' }}
            </option>
          }
        </select>
        <p>
          {{ confirmedCount() }} of {{ config.targets.length }} targets reviewed as ready in this
          demo. {{ config.recordSummary }}
        </p>
      </div>
    } @else {
      <p class="task-instruction">{{ lesson().task }}</p>
    }
    @if (blocked()) {
      <aside class="gate-note" role="status">
        <strong>Teacher checkpoint before this task</strong>
        <p>
          {{ lesson().requiresGate?.toUpperCase() }} needs review. You can keep reading sources and
          getting help. Return to the earlier checkpoint for a fresh response.
        </p>
        @for (gate of config.gates; track gate.id) {
          @if (gate.id === lesson().requiresGate) {
            <p>Lesson {{ gate.afterLesson }} \xB7 {{ gate.criteria }}</p>
          }
        }
      </aside>
    }
    <div class="desk-columns">
      <aside class="source-card" aria-label="Historical source">
        <label for="source-select">Read a source</label>
        <select
          id="source-select"
          [ngModel]="source().id"
          (ngModelChange)="selectedSourceId.set($event)"
        >
          @for (source of runtime.config.evidence; track source.id) {
            <option [value]="source.id">{{ source.title }}</option>
          }
        </select>
        <span class="source-kind">{{ source().sourceType }} \xB7 {{ source().dateLabel }}</span>
        <h3>{{ source().title }}</h3>
        @if (source().imageUrl) {
          <img
            class="source-image"
            [src]="source().imageUrl"
            [alt]="source().imageAlt || source().title"
          />
        }
        <p class="small-note">Read the whole passage. Scroll inside the reading for more.</p>
        <p class="source-excerpt" tabindex="0" role="region" aria-label="Source reading">
          {{ source().excerpt }}
        </p>
        <p class="source-context">{{ source().context }}</p>
        <details>
          <summary>Where this source comes from</summary>
          <p>{{ source().citation }}</p>
          <p>{{ source().perspective }}</p>
          @if (source().sourceUrl) {
            <a [href]="source().sourceUrl" target="_blank" rel="noopener noreferrer"
              >Open source reference \u2197</a
            >
          }
        </details>
      </aside>
      <section class="response-card" aria-label="My response" tabindex="-1">
        @if (checking()) {
          <span class="eyebrow">Independent check \xB7 sources allowed</span>
          <h3>Show your thinking</h3>
          <p>{{ checkPrompt() }}</p>
          <p class="small-note">
            Answer on your own. Practice hints are closed during this check. If you need support,
            return to practice and ask for a fresh check afterward.
          </p>
          <label for="independent-response">My answer</label>
          <textarea
            id="independent-response"
            rows="7"
            [disabled]="blocked()"
            [ngModel]="draft(checkKey())"
            (ngModelChange)="runtime.updateInquiryDraft(checkKey(), $event)"
            (blur)="runtime.saveInquiryDrafts()"
          ></textarea>
          <div class="actions">
            <button
              type="button"
              class="primary"
              [disabled]="blocked() || !draft(checkKey()).trim()"
              (click)="submit()"
            >
              Save for review
            </button>
            <button type="button" (click)="checking.set(false)">Back to practice</button>
          </div>
        } @else {
          @if (tab() === 'record') {
            <span class="eyebrow">{{ target().standardId }}</span>
            <h3>{{ target().label }}</h3>
            <p>{{ target().prompt }}</p>
            <label for="concept-note">My practice explanation and source</label>
            <textarea
              id="concept-note"
              rows="5"
              [ngModel]="draft('target-' + targetId())"
              (ngModelChange)="runtime.updateInquiryDraft('target-' + targetId(), $event)"
              (blur)="runtime.saveInquiryDrafts()"
            ></textarea>
          } @else {
            @for (field of lesson().fields; track field.id) {
              <label [for]="field.id">{{ field.label }}</label>
              <p class="field-prompt">{{ field.prompt }}</p>
              <textarea
                [id]="field.id"
                rows="3"
                [disabled]="blocked()"
                [ngModel]="draft(fieldKey(field.id))"
                (ngModelChange)="runtime.updateInquiryDraft(fieldKey(field.id), $event)"
                (blur)="runtime.saveInquiryDrafts()"
              ></textarea>
            }
          }
          <details class="practice-help">
            <summary>I need a little help</summary>
            <p>{{ lesson().help }}</p>
            <p>Use this in practice, then complete an independent check.</p>
          </details>
          <div class="actions">
            <button type="button" class="primary" [disabled]="blocked()" (click)="startCheck()">
              {{ latest() ? 'Try a fresh check' : 'Try my checkpoint' }}
            </button>
            <button type="button" (click)="saveWork()">Save my work</button>
          </div>
          @if (latest() && runtime.inquiryState().reviews[latest()!.id]?.decision === 'ready') {
            <details class="side-quest">
              <summary>Ready for a side quest?</summary>
              <p>{{ lesson().sideQuest }}</p>
              <label for="side-quest">My extension</label
              ><textarea
                id="side-quest"
                rows="3"
                [ngModel]="draft(fieldKey('side-quest'))"
                (ngModelChange)="runtime.updateInquiryDraft(fieldKey('side-quest'), $event)"
                (blur)="runtime.saveInquiryDrafts()"
              ></textarea>
              <p>A side quest adds depth. It does not complete a checkpoint for you.</p>
            </details>
          }
        }
        @if (!checking() && latest(); as attempt) {
          <details class="review-result">
            <summary>
              {{
                runtime.inquiryState().reviews[attempt.id]?.decision === 'ready'
                  ? 'Reviewed as ready \xB7 demo only'
                  : runtime.inquiryState().reviews[attempt.id]?.decision === 'revise'
                    ? 'Try again with feedback'
                    : 'Response waiting for review'
              }}
            </summary>
            <p>{{ attempt.response }}</p>
            <p>{{ runtime.inquiryState().reviews[attempt.id]?.feedback }}</p>
            <small>Earlier responses are preserved in your portfolio download.</small>
          </details>
        }
      </section>
    </div>
    @if (message()) {
      <p role="status" class="status-message">{{ message() }}</p>
    }
    @if (lessonNumber() >= (config.studioFromLesson ?? 8) && !blocked()) {
      <div class="final-action">
        <button type="button" class="primary" (click)="hearingRequested.emit()">
          {{ config.finalActionLabel || 'Enter the hearing' }}
        </button>
        <p>
          {{
            config.finalActionNote ||
              'Local demonstration of the debate room. Shared class filing and recordings require the school gateway.'
          }}
        </p>
      </div>
    }
    @if (!checking()) {
      <details class="teacher-guide">
        <summary>Teacher & tutor guide</summary>
        <p><strong>Teacher:</strong> {{ lesson().teacher }}</p>
        <p><strong>Tutor task:</strong> {{ lesson().tutor }}</p>
        <p>
          Scripted practice is available here. A connected AI tutor should recommend readiness from
          individual evidence; only an authorized teacher can confirm official completion.
        </p>
        <p>{{ lesson().workload }}</p>
        <ul>
          @for (gate of config.gates; track gate.id) {
            <li>
              {{ runtime.inquiryGate(gate.id) ? '\u2713 Demo reviewed' : '\u25CB Review needed' }} \xB7
              {{ gate.label }}: {{ gate.criteria }}
            </li>
          }
        </ul>
        <ul>
          @for (standard of standards; track standard) {
            <li>
              {{
                standardReady(standard)
                  ? '\u2713 All targets reviewed in demo'
                  : '\u25CB Evidence still needed'
              }}
              \xB7 {{ standard }}
            </li>
          }
        </ul>
        @if (runtime.config.viewer.allowTeacherPreview) {
          <button type="button" (click)="runtime.toggleTeacherPreview()">
            {{ runtime.teacherPreview() ? 'Close teacher preview' : 'Open teacher preview' }}
          </button>
        }
        @if (runtime.canManageModerator() && latest()) {
          <div class="demo-review">
            <strong>Demo review \u2014 this learner\u2019s latest response</strong>
            <p>
              Read the response and cited work before deciding. These controls cannot issue official
              grades or unlock a live school session.
            </p>
            <label for="review-feedback">Feedback tied to the evidence</label
            ><textarea
              id="review-feedback"
              rows="3"
              [ngModel]="feedback()"
              (ngModelChange)="feedback.set($event)"
            ></textarea>
            <p>
              Review the complete saved work against the standard, including each required part.
            </p>
            @if (needsPerformance()) {
              <label for="performance-evidence">Observed presentation or discussion evidence</label>
              <textarea
                id="performance-evidence"
                rows="3"
                [ngModel]="performanceEvidence()"
                (ngModelChange)="performanceEvidence.set($event)"
                placeholder="Record the learner, observed skill, lesson/date or recording timestamp. Text answers alone do not demonstrate speaking or listening."
              ></textarea>
            }
            <div class="actions">
              <button
                type="button"
                [disabled]="
                  !feedback().trim() || (needsPerformance() && !performanceEvidence().trim())
                "
                (click)="review('ready')"
              >
                Demo: ready</button
              ><button type="button" [disabled]="!feedback().trim()" (click)="review('revise')">
                Demo: needs revision
              </button>
            </div>
          </div>
        }
      </details>
    }
  </div>
  <p class="artwork-caption">{{ config.artworkCaption }}</p>
</section>
`, styles: ['@charset "UTF-8";\n\n/* src/app/shared/inquiry/inquiry-workspace.component.scss */\n:host {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.inquiry {\n  padding: 0 clamp(14px, 3vw, 44px) 24px;\n  color: #29251f;\n}\n.scene-introduction {\n  padding: 32px 12px 26px;\n  color: #fff4d9;\n  text-align: center;\n  text-shadow: 0 2px 12px #241106;\n}\n.scene-introduction span,\n.eyebrow {\n  font-size: 12px;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 8px 0;\n  font: 600 clamp(30px, 4vw, 48px)/1.1 Georgia, serif;\n}\n.scene-introduction p {\n  margin: 10px 0;\n  font-size: 18px;\n}\n.learning-desk {\n  max-width: 1160px;\n  margin: auto;\n  padding: clamp(16px, 2.5vw, 30px);\n  border: 1px solid #e7cf9c;\n  border-radius: 18px;\n  background: rgba(251, 247, 237, 0.9803921569);\n  box-shadow: 0 14px 50px rgba(35, 23, 11, 0.4392156863);\n}\n.desk-top,\n.desk-tabs,\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.desk-top {\n  justify-content: space-between;\n}\n.desk-top .eyebrow {\n  color: #7b5830;\n}\nh2 {\n  margin: 5px 0 12px;\n  font-size: 25px;\n}\nh3 {\n  font: 700 23px/1.25 Georgia, serif;\n  margin: 15px 0;\n}\n.save-status,\n.small-note,\n.record-heading p {\n  font-size: 13px;\n  color: #56574f;\n}\n.desk-tabs {\n  border-bottom: 1px solid #d9cfbc;\n  padding: 6px 0 16px;\n}\nbutton,\nselect,\nsummary {\n  min-height: 48px;\n  font: 600 15px/1.3 system-ui, sans-serif;\n}\nbutton {\n  padding: 12px 18px;\n  border: 1px solid #c9bba2;\n  border-radius: 9px;\n  background: #fffdf7;\n  color: #3f3325;\n  cursor: pointer;\n}\nbutton[aria-pressed=true] {\n  background: #e9dfc8;\n  border-color: #8a6b3f;\n}\nbutton.primary {\n  background: #2d5552;\n  color: white;\n  border-color: #2d5552;\n}\nbutton:hover {\n  filter: brightness(0.96);\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\nsummary:focus-visible,\na:focus-visible {\n  outline: 3px solid #247574;\n  outline-offset: 3px;\n}\n.task-instruction {\n  font-size: 18px;\n  line-height: 1.55;\n  max-width: 940px;\n}\n.desk-columns {\n  display: grid;\n  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  gap: 26px;\n  align-items: start;\n  margin-top: 22px;\n}\n.source-card {\n  padding: 22px;\n  background: #f0e5cf;\n  border: 1px solid #dbcaab;\n  border-radius: 12px;\n}\n.source-kind {\n  display: block;\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: #685334;\n}\np {\n  line-height: 1.55;\n}\n.source-excerpt {\n  font: 19px/1.65 Georgia, serif;\n}\n.source-context {\n  padding-top: 14px;\n  border-top: 1px solid #cdbb98;\n  font-size: 15px;\n}\nlabel {\n  display: block;\n  margin: 0 0 8px;\n  font-weight: 750;\n  font-size: 16px;\n}\ntextarea,\nselect {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px;\n  background: #fffefa;\n  color: #262d2b;\n  border: 1px solid #aa9e86;\n  border-radius: 8px;\n}\ntextarea {\n  font: 17px/1.55 system-ui, sans-serif;\n  resize: vertical;\n  margin-bottom: 18px;\n}\n.field-prompt {\n  margin: -2px 0 10px;\n  font-size: 14px;\n  color: #555348;\n}\nsummary {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  color: #2a5756;\n}\nsummary::before {\n  content: "+";\n  margin-right: 10px;\n  font-size: 20px;\n}\ndetails[open] > summary::before {\n  content: "\\2212";\n}\ndetails {\n  font-size: 14px;\n}\n.help-menu {\n  margin-left: auto;\n}\n.help-menu[open] {\n  flex-basis: 100%;\n}\n.help-menu > div {\n  max-width: 850px;\n  padding: 0 12px;\n}\n.practice-help,\n.side-quest,\n.review-result {\n  border-top: 1px solid #d9cfbc;\n  margin: 12px 0;\n}\n.review-result p {\n  white-space: pre-wrap;\n}\n.record-heading,\n.gate-note {\n  margin-top: 20px;\n  padding: 16px;\n  border-radius: 9px;\n  background: #eee6d5;\n}\n.record-heading select {\n  max-width: 540px;\n}\n.gate-note {\n  border-left: 4px solid #aa7535;\n  background: #fff0d4;\n}\n.teacher-guide {\n  margin-top: 24px;\n  border-top: 1px solid #ccc0a9;\n}\n.teacher-guide li {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.demo-review {\n  padding: 18px;\n  background: #e7eeea;\n  border-radius: 10px;\n  margin-top: 18px;\n}\n.status-message {\n  padding: 12px;\n  background: #e7eeea;\n  border-radius: 8px;\n}\n.final-action {\n  margin-top: 24px;\n}\n.final-action p {\n  font-size: 13px;\n}\n.artwork-caption {\n  margin: 18px auto 0;\n  max-width: 1100px;\n  text-align: center;\n  font-size: 12px;\n  color: #fff4d9;\n  text-shadow: 0 1px 6px #000;\n}\na {\n  color: #175d60;\n  overflow-wrap: anywhere;\n}\n@media (max-width: 720px) {\n  .desk-columns {\n    grid-template-columns: 1fr;\n    gap: 22px;\n  }\n  .scene-introduction {\n    padding: 26px 0 22px;\n  }\n  .help-menu {\n    margin-left: 0;\n  }\n  .source-card {\n    padding: 16px;\n  }\n  .actions button {\n    flex: 1 1 auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.source-image {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n.source-excerpt {\n  white-space: pre-line;\n  max-height: min(55vh, 480px);\n  overflow: auto;\n  padding-right: 10px;\n  overscroll-behavior: contain;\n}\n.source-excerpt:focus-visible {\n  outline: 3px solid #aa7027;\n  outline-offset: 4px;\n}\n/*# sourceMappingURL=inquiry-workspace.component.css.map */\n'] }]
  }], () => [], { hearingRequested: [{ type: Output, args: ["hearingRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InquiryWorkspaceComponent, { className: "InquiryWorkspaceComponent", filePath: "src/app/shared/inquiry/inquiry-workspace.component.ts", lineNumber: 23 });
})();

export {
  INQUIRY_WORKSPACE,
  InquiryWorkspaceComponent
};
//# debugId=dd0c4c5f-1432-5cd9-915e-71a7948e4eee
//# sourceMappingURL=chunk-HK5V4SOG.js.map
