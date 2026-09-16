import {
  InvestigationFinalCaseComponent
} from "./chunk-KTMTM7KE.js";
import {
  ConservationChamberComponent,
  EmergencyResponseComponent,
  PropertiesLabComponent,
  ReactionBenchComponent,
  RestorationWorkspaceComponent,
  persistWorkspaceDraft,
  physicalTests,
  reactionTests
} from "./chunk-TNCQS45K.js";
import "./chunk-5LAJN7BS.js";
import "./chunk-46FPAVMA.js";
import {
  MysteryInvestigationService,
  mysteryWorkbenchLinks
} from "./chunk-ITTVRLH2.js";
import "./chunk-CN67HRIA.js";
import "./chunk-PJ67YSEX.js";
import "./chunk-G626JLCU.js";
import "./chunk-K64YZ7RA.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RangeValueAccessor,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import "./chunk-2WXJ5NX3.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
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
  untracked,
  viewChild,
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
  ɵɵproperty,
  ɵɵpureFunction0,
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
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  mysteryEvidenceCatalog,
  mysteryInvestigationActivities,
  mysteryInvestigationPhases,
  mysteryObservationTags,
  mysteryVials
} from "./chunk-EOGBHGAA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/investigation/ui/working-theory.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.revisionId;
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 17, 0);
    \u0275\u0275listener("change", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_For_11_Template_input_change_1_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const recordCheck_r5 = \u0275\u0275reference(2);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleEvidence(item_r4.id, recordCheck_r5.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.evidenceIds().includes(item_r4.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.title);
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7);
    \u0275\u0275text(1, "Why my thinking changed ");
    \u0275\u0275elementStart(2, "textarea", 18);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_24_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reasonForChange.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Your earlier explanation stays in the investigation record.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.reasonForChange());
    \u0275\u0275control();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditing());
    });
    \u0275\u0275text(1, "Cancel revision");
    \u0275\u0275elementEnd();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 6);
    \u0275\u0275listener("submit", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template_form_submit_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.saveTheory());
    });
    \u0275\u0275elementStart(1, "label", 7);
    \u0275\u0275text(2, "My idea ");
    \u0275\u0275elementStart(3, "textarea", 8);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.statement.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "fieldset", 7)(5, "legend");
    \u0275\u0275text(6, "Evidence I am using");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Choose records here or use \u201CUse in my explanation\u201D beside the bench.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 9);
    \u0275\u0275repeaterCreate(10, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_For_11_Template, 5, 2, "label", null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label", 7);
    \u0275\u0275text(13, "Why this evidence supports my idea ");
    \u0275\u0275elementStart(14, "textarea", 10);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reasoning.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 7);
    \u0275\u0275text(16, "What I am still unsure about ");
    \u0275\u0275elementStart(17, "textarea", 11);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remainingQuestion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "label", 12)(19, "span");
    \u0275\u0275text(20, "How sure am I? ");
    \u0275\u0275elementStart(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 13);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confidence.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_24_Template, 5, 1, "label", 7);
    \u0275\u0275elementStart(25, "div", 14);
    \u0275\u0275conditionalCreate(26, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Conditional_26_Template, 2, 0, "button", 15);
    \u0275\u0275elementStart(27, "button", 16);
    \u0275\u0275text(28, " Save my explanation ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.statement());
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.availableEvidence());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.reasoning());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.remainingQuestion());
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.confidence(), "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.confidence());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.theory() && !ctx_r1.creatingAlternative() ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.theory() ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.statement().trim());
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 revising ");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "textarea", 8);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_4_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.statement.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 12)(4, "span");
    \u0275\u0275text(5, "How sure are you? ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "input", 13);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_4_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confidence.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.creatingAlternative() ? "What is a different explanation for the same evidence?" : "What do you think right now?", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.statement());
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.confidence(), "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.confidence());
    \u0275\u0275control();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7);
    \u0275\u0275text(1, " Why does your evidence support this idea? ");
    \u0275\u0275elementStart(2, "textarea", 21);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_5_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reasoning.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.reasoning());
    \u0275\u0275control();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7);
    \u0275\u0275text(1, " What are you still unsure about? ");
    \u0275\u0275elementStart(2, "textarea", 22);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_6_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.remainingQuestion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.remainingQuestion());
    \u0275\u0275control();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7);
    \u0275\u0275text(1, " Why did your thinking change? ");
    \u0275\u0275elementStart(2, "textarea", 23);
    \u0275\u0275listener("ngModelChange", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_7_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reasonForChange.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Your earlier thinking is kept, not erased.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.reasonForChange());
    \u0275\u0275control();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 17, 1);
    \u0275\u0275listener("change", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_8_For_5_Template_input_change_1_listener() {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const evidenceCheckbox_r15 = \u0275\u0275reference(2);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleEvidence(item_r14.id, evidenceCheckbox_r15.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.evidenceIds().includes(item_r14.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r14.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r14.classification ?? "not analyzed");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 7)(1, "legend");
    \u0275\u0275text(2, "Which records is this built on?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9);
    \u0275\u0275repeaterCreate(4, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_8_For_5_Template, 8, 3, "label", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.availableEvidence());
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.back());
    });
    \u0275\u0275text(1, "Back");
    \u0275\u0275elementEnd();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditing());
    });
    \u0275\u0275text(1, "Cancel");
    \u0275\u0275elementEnd();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 6);
    \u0275\u0275listener("submit", function InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Template_form_submit_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275elementStart(1, "p", 20);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_4_Template, 9, 4)(5, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_5_Template, 3, 1, "label", 7)(6, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_6_Template, 3, 1, "label", 7)(7, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_7_Template, 5, 1, "label", 7)(8, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Case_8_Template, 6, 0, "fieldset", 7);
    \u0275\u0275elementStart(9, "div", 14);
    \u0275\u0275conditionalCreate(10, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_10_Template, 2, 0, "button", 15)(11, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Conditional_11_Template, 2, 0, "button", 15);
    \u0275\u0275elementStart(12, "button", 16);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Slip ", ctx_r1.step() + 1, " of ", ctx_r1.steps().length, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.theory() !== void 0 && !ctx_r1.creatingAlternative() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.currentStep()) === "statement" ? 4 : tmp_4_0 === "reasoning" ? 5 : tmp_4_0 === "question" ? 6 : tmp_4_0 === "change" ? 7 : tmp_4_0 === "evidence" ? 8 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.step() > 0 ? 10 : ctx_r1.theory() !== void 0 ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canAdvance());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.onLastStep() ? "Save theory" : "Next", " ");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_0_Template, 29, 8, "form", 5)(1, InvestigationWorkingTheoryComponent_Conditional_5_Conditional_1_Template, 14, 7, "form", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.singlePage() ? 0 : 1);
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_0_For_2_Template_button_click_0_listener() {
      const item_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.theorySelected.emit(item_r20.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = ctx.$implicit;
    const $index_r21 = ctx.$index;
    const current_r22 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", item_r20.id === current_r22.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Theory ", $index_r21 + 1, " \xB7 ", item_r20.confidence ?? 0, "% ");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 24);
    \u0275\u0275repeaterCreate(1, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_0_For_2_Template, 2, 4, "button", 34, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.theories());
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_2_Template_button_click_0_listener() {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.evidenceSelected.emit(item_r24.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + ", item_r24.title, " ");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_4_Template_button_click_0_listener() {
      const item_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.evidenceSelected.emit(item_r26.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2212 ", item_r26.title, " ");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_2_Template, 2, 1, "button", 35, _forTrack0);
    \u0275\u0275repeaterCreate(3, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_For_4_Template, 2, 1, "button", 36, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.supportingEvidence().slice(0, 2));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.challengingEvidence().slice(0, 2));
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.beginAlternative());
    });
    \u0275\u0275text(1, "Add alternative");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_24_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.finalRequested.emit());
    });
    \u0275\u0275text(3, "Check final readiness");
    \u0275\u0275elementEnd();
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_25_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const revision_r28 = ctx.$implicit;
    const $index_r29 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Version ", $index_r29 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(revision_r28.statement);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(revision_r28.reasonForChange || "Initial theory");
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 33)(1, "summary");
    \u0275\u0275text(2, " Earlier thinking");
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "ol");
    \u0275\u0275repeaterCreate(6, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_25_For_7_Template, 7, 3, "li", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const current_r22 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(current_r22.revisions.length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(current_r22.revisions);
  }
}
function InvestigationWorkingTheoryComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_0_Template, 3, 0, "nav", 24);
    \u0275\u0275elementStart(1, "article", 25)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "span");
    \u0275\u0275text(6, "Confidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "i");
    \u0275\u0275element(10, "span");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 27);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_13_Template, 5, 0, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "section", 29)(15, "p");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 19);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.investigateRequested.emit());
    });
    \u0275\u0275text(18, " Find an investigation ");
    \u0275\u0275elementStart(19, "span", 30);
    \u0275\u0275text(20, "\u2192");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 31)(22, "button", 32);
    \u0275\u0275listener("click", function InvestigationWorkingTheoryComponent_Conditional_6_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.beginEditing());
    });
    \u0275\u0275text(23, "Revise theory");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_24_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, InvestigationWorkingTheoryComponent_Conditional_6_Conditional_25_Template, 8, 1, "details", 33);
  }
  if (rf & 2) {
    const current_r22 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.theories().length > 1 && !ctx_r1.compact() ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r22.statement);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", current_r22.confidence ?? 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", current_r22.confidence ?? 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", current_r22.reasoning || "Add reasoning that connects the evidence to your explanation.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.supportingEvidence().length > 0 || ctx_r1.challengingEvidence().length > 0 ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r22.remainingQuestion || "What evidence would make you more confident?");
    \u0275\u0275advance(8);
    \u0275\u0275conditional(!ctx_r1.compact() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.compact() && current_r22.revisions.length > 1 ? 25 : -1);
  }
}
var InvestigationWorkingTheoryComponent = class _InvestigationWorkingTheoryComponent {
  theory = input(
    void 0,
    ...ngDevMode ? [{ debugName: "theory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theories = input(
    [],
    ...ngDevMode ? [{ debugName: "theories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = input(
    [],
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compact = input(
    false,
    ...ngDevMode ? [{ debugName: "compact" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = input(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  singlePage = input(
    false,
    ...ngDevMode ? [{ debugName: "singlePage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theorySaved = output();
  theorySelected = output();
  evidenceSelected = output();
  investigateRequested = output();
  finalRequested = output();
  /**
   * Revision is dealt one slip at a time rather than as a five-field form. The
   * questions are the same; asking them one at a time is what stops the panel
   * reading like a web form and starts it reading like thinking.
   */
  step = signal(
    0,
    ...ngDevMode ? [{ debugName: "step" }] : (
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
  creatingAlternative = signal(
    false,
    ...ngDevMode ? [{ debugName: "creatingAlternative" }] : (
      /* istanbul ignore next */
      []
    )
  );
  statement = signal(
    "",
    ...ngDevMode ? [{ debugName: "statement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confidence = signal(
    50,
    ...ngDevMode ? [{ debugName: "confidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoning = signal(
    "",
    ...ngDevMode ? [{ debugName: "reasoning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  remainingQuestion = signal(
    "",
    ...ngDevMode ? [{ debugName: "remainingQuestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceIds = signal(
    [],
    ...ngDevMode ? [{ debugName: "evidenceIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasonForChange = signal(
    "",
    ...ngDevMode ? [{ debugName: "reasonForChange" }] : (
      /* istanbul ignore next */
      []
    )
  );
  supportingEvidence = computed(
    () => this.evidence().filter((item) => item.classification === "supports" && this.evidenceIds().includes(item.id)),
    ...ngDevMode ? [{ debugName: "supportingEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  challengingEvidence = computed(
    () => this.evidence().filter((item) => item.classification === "contradicts" && this.evidenceIds().includes(item.id)),
    ...ngDevMode ? [{ debugName: "challengingEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableEvidence = computed(
    () => this.evidence().filter((item) => item.status !== "locked"),
    ...ngDevMode ? [{ debugName: "availableEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Which slips this pass asks for — a revision asks one the others do not. */
  steps = computed(
    () => {
      const revising = this.theory() !== void 0 && !this.creatingAlternative();
      return [
        "statement",
        "reasoning",
        "question",
        ...revising ? ["change"] : [],
        ...this.compact() ? [] : ["evidence"]
      ];
    },
    ...ngDevMode ? [{ debugName: "steps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentStep = computed(
    () => this.steps()[Math.min(this.step(), this.steps().length - 1)],
    ...ngDevMode ? [{ debugName: "currentStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onLastStep = computed(
    () => this.step() >= this.steps().length - 1,
    ...ngDevMode ? [{ debugName: "onLastStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** A theory needs a statement; everything after it may be left for later. */
  canAdvance = computed(
    () => this.currentStep() !== "statement" || this.statement().trim().length > 0,
    ...ngDevMode ? [{ debugName: "canAdvance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  next() {
    if (!this.canAdvance()) {
      return;
    }
    if (this.onLastStep()) {
      this.saveTheory();
      return;
    }
    this.step.update((value) => value + 1);
  }
  back() {
    this.step.update((value) => Math.max(value - 1, 0));
  }
  constructor() {
    persistWorkspaceDraft("working-theory", () => ({
      statement: this.statement(),
      reasoning: this.reasoning(),
      confidence: this.confidence(),
      remainingQuestion: this.remainingQuestion(),
      evidenceIds: this.evidenceIds(),
      reasonForChange: this.reasonForChange(),
      editing: this.editing() || this.theory() === void 0,
      creatingAlternative: this.creatingAlternative(),
      step: this.step()
    }), (saved) => {
      if (typeof saved.statement !== "string")
        return;
      this.statement.set(saved.statement);
      this.reasoning.set(typeof saved.reasoning === "string" ? saved.reasoning : "");
      this.remainingQuestion.set(typeof saved.remainingQuestion === "string" ? saved.remainingQuestion : "");
      this.confidence.set(typeof saved.confidence === "number" ? saved.confidence : 50);
      this.evidenceIds.set(Array.isArray(saved.evidenceIds) ? saved.evidenceIds : []);
      this.reasonForChange.set(saved.reasonForChange ?? "");
      this.editing.set(saved.editing ?? true);
      this.creatingAlternative.set(saved.creatingAlternative ?? false);
      this.step.set(saved.step ?? 0);
    });
    effect(() => {
      if (this.editing() || this.creatingAlternative()) {
        return;
      }
      const theory = this.theory();
      if (theory === void 0) {
        this.statement.set("");
        this.confidence.set(50);
        this.reasoning.set("");
        this.remainingQuestion.set("");
        this.evidenceIds.set([]);
        return;
      }
      this.statement.set(theory.statement);
      this.confidence.set(theory.confidence ?? 50);
      this.reasoning.set(theory.reasoning ?? "");
      this.remainingQuestion.set(theory.remainingQuestion ?? "");
      this.evidenceIds.set([...theory.evidenceIds ?? []]);
    });
  }
  includeEvidence(evidenceId) {
    this.editing.set(true);
    this.evidenceIds.update((ids) => [.../* @__PURE__ */ new Set([...ids, evidenceId])]);
  }
  beginEditing() {
    this.step.set(0);
    this.editing.set(true);
  }
  beginAlternative() {
    this.step.set(0);
    this.creatingAlternative.set(true);
    this.editing.set(false);
    this.statement.set("");
    this.confidence.set(50);
    this.reasoning.set("");
    this.remainingQuestion.set("");
    this.evidenceIds.set([]);
    this.reasonForChange.set("");
  }
  cancelEditing() {
    this.step.set(0);
    this.creatingAlternative.set(false);
    this.editing.set(false);
    const theory = this.theory();
    if (theory !== void 0) {
      this.statement.set(theory.statement);
      this.confidence.set(theory.confidence ?? 50);
      this.reasoning.set(theory.reasoning ?? "");
      this.remainingQuestion.set(theory.remainingQuestion ?? "");
      this.evidenceIds.set([...theory.evidenceIds ?? []]);
    }
  }
  toggleEvidence(evidenceId, selected) {
    this.evidenceIds.update((current) => selected ? current.includes(evidenceId) ? current : [...current, evidenceId] : current.filter((id) => id !== evidenceId));
  }
  saveTheory() {
    const statement = this.statement().trim();
    if (statement.length === 0) {
      return;
    }
    this.theorySaved.emit({
      statement,
      confidence: this.confidence(),
      reasoning: this.reasoning().trim(),
      remainingQuestion: this.remainingQuestion().trim(),
      evidenceIds: this.evidenceIds(),
      reasonForChange: this.reasonForChange().trim() || void 0,
      createNew: this.creatingAlternative()
    });
    this.reasonForChange.set("");
    this.creatingAlternative.set(false);
    this.editing.set(false);
    this.step.set(0);
  }
  static \u0275fac = function InvestigationWorkingTheoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationWorkingTheoryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationWorkingTheoryComponent, selectors: [["app-investigation-working-theory"]], inputs: { theory: [1, "theory"], theories: [1, "theories"], evidence: [1, "evidence"], compact: [1, "compact"], saveState: [1, "saveState"], singlePage: [1, "singlePage"] }, outputs: { theorySaved: "theorySaved", theorySelected: "theorySelected", evidenceSelected: "evidenceSelected", investigateRequested: "investigateRequested", finalRequested: "finalRequested" }, decls: 7, vars: 4, consts: [["recordCheck", ""], ["evidenceCheckbox", ""], ["aria-labelledby", "working-theory-title", 1, "theory-panel"], ["id", "working-theory-title", 1, "panel-tab"], ["aria-live", "polite"], [1, "theory-form"], [1, "theory-form", 3, "submit"], [1, "slip"], ["rows", "3", "name", "statement", "placeholder", "I think the four vials are\u2026", 3, "ngModelChange", "ngModel"], [1, "evidence-picker"], ["rows", "3", "name", "reasoning", "placeholder", "These results matter because\u2026", 3, "ngModelChange", "ngModel"], ["rows", "2", "name", "remainingQuestion", "placeholder", "I still need to find out\u2026", 3, "ngModelChange", "ngModel"], [1, "confidence-control"], ["type", "range", "min", "0", "max", "100", "step", "5", "name", "confidence", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "button"], ["type", "submit", 1, "primary", 3, "disabled"], ["type", "checkbox", 3, "change", "checked"], ["rows", "2", "name", "reasonForChange", "placeholder", "New evidence showed\u2026", 3, "ngModelChange", "ngModel"], ["type", "button", 3, "click"], [1, "slip-progress"], ["rows", "4", "name", "reasoning", "placeholder", "This evidence matters because\u2026", 3, "ngModelChange", "ngModel"], ["rows", "3", "name", "remainingQuestion", "placeholder", "I still need to know\u2026", 3, "ngModelChange", "ngModel"], ["rows", "3", "name", "reasonForChange", "placeholder", "New evidence showed\u2026", 3, "ngModelChange", "ngModel"], ["aria-label", "Possible explanations", 1, "theory-tabs"], [1, "theory-card"], [1, "confidence-readout"], [1, "reasoning-copy"], [1, "evidence-chips"], [1, "remaining-question"], ["aria-hidden", "true"], [1, "panel-actions"], ["type", "button", 1, "primary", 3, "click"], [1, "theory-history"], ["type", "button", 3, "active"], ["type", "button", "data-zone", "supports"], ["type", "button", "data-zone", "contradicts"], ["type", "button", "data-zone", "supports", 3, "click"], ["type", "button", "data-zone", "contradicts", 3, "click"]], template: function InvestigationWorkingTheoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2)(1, "p", 3);
      \u0275\u0275text(2, " Theory ");
      \u0275\u0275elementStart(3, "span", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, InvestigationWorkingTheoryComponent_Conditional_5_Template, 2, 1)(6, InvestigationWorkingTheoryComponent_Conditional_6_Template, 26, 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275classProp("compact", ctx.compact());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.saveState() === "saving" ? "Saving\u2026" : ctx.saveState() === "pending" ? "Pending" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.theory() === void 0 || ctx.editing() || ctx.creatingAlternative() ? 5 : (tmp_2_0 = ctx.theory()) ? 6 : -1, tmp_2_0);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RangeValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], styles: ['\n[_nghost-%COMP%], \n.theory-panel[_ngcontent-%COMP%] {\n  display: block;\n  min-height: 100%;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\n.theory-panel[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.panel-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: var(--%NS%case-accent, #a79ae8);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.panel-tab[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%case-muted, #8390a8);\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.slip-progress[_ngcontent-%COMP%] {\n  margin-top: 0.9rem;\n  color: var(--%NS%case-muted, #8390a8);\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 0.9rem;\n  background:\n    linear-gradient(\n      168deg,\n      #f6ecda,\n      #e6d8c0);\n  box-shadow: 0 0.9rem 1.8rem rgba(0, 0, 0, 0.45);\n  color: #1d1108;\n  font-size: 0.92rem;\n  font-weight: 650;\n  letter-spacing: normal;\n  line-height: 1.35;\n  text-transform: none;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]    > legend[_ngcontent-%COMP%] {\n  padding: 0;\n  font-size: 0.92rem;\n  font-weight: 650;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6a5236;\n  font-size: 0.66rem;\n  font-weight: 500;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  border-color: rgba(93, 70, 48, 0.42);\n  color: #241609;\n  background: rgba(255, 255, 255, 0.55);\n  font-size: 0.78rem;\n  font-weight: 400;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]   .evidence-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  border-color: rgba(93, 70, 48, 0.32);\n  color: #241609;\n  background: rgba(255, 255, 255, 0.42);\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]   .evidence-picker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #241609;\n}\n.theory-form[_ngcontent-%COMP%]    > .slip[_ngcontent-%COMP%]   .evidence-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6a5236;\n}\n.confidence-control[_ngcontent-%COMP%] {\n  color: var(--%NS%case-ink, #bac7d2);\n}\n.theory-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.72rem;\n}\n.theory-form[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \n.theory-form[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  color: #bac7d2;\n  font-size: 0.69rem;\n  font-weight: 700;\n}\ntextarea[_ngcontent-%COMP%], \ninput[type=text][_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #384d65;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #eff6fb;\n  background: #091a29;\n  resize: vertical;\n}\n.confidence-control[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: var(--%NS%case-accent, #8d7ce0);\n}\n.evidence-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));\n  gap: 0.35rem;\n  max-height: 12rem;\n  overflow: auto;\n}\n.evidence-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  border: 1px solid #30465a;\n  border-radius: 0.45rem;\n  padding: 0.45rem;\n  color: #d9e5ec;\n  background: #0b2131;\n}\n.evidence-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.evidence-picker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font-size: 0.67rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #829fac;\n  font-size: 0.58rem;\n  text-transform: capitalize;\n}\n.form-actions[_ngcontent-%COMP%], \n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.panel-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.remaining-question[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%case-edge, #4f4d7c);\n  border-radius: 0.45rem;\n  padding: 0.52rem 0.7rem;\n  color: var(--%NS%case-ink, #d7d2f4);\n  background: rgba(0, 0, 0, 0.32);\n  cursor: pointer;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  border-color: var(--%NS%case-accent, #9b8dec);\n  color: #23150d;\n  background: var(--%NS%case-accent, #a99cf3);\n  font-weight: 700;\n}\nbutton.primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.theory-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n  margin-top: 0.8rem;\n  overflow-x: auto;\n}\n.theory-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border: 1px solid #3c4960;\n  border-radius: 999px;\n  padding: 0.35rem 0.6rem;\n  color: #99aabb;\n  background: transparent;\n  cursor: pointer;\n}\n.theory-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #9082df;\n  color: #eeeaff;\n  background: #302b61;\n}\n.theory-card[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 1.1rem;\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 1rem 0.95rem 0.95rem;\n  color: #241609;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      transparent 0 1.34rem,\n      rgba(66, 108, 140, 0.13) 1.34rem 1.4rem),\n    linear-gradient(\n      168deg,\n      #f6ecda,\n      #e6d8c0);\n  box-shadow: 0 1.1rem 2.2rem rgba(0, 0, 0, 0.5), inset 0 -2px 0 rgba(120, 96, 66, 0.18);\n  transform: rotate(-0.55deg);\n}\n.theory-card[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -0.42rem;\n  left: 50%;\n  width: 0.85rem;\n  height: 0.85rem;\n  margin-left: -0.42rem;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 34% 30%,\n      #ffd9a0,\n      #c8642c 62%,\n      #7d3413);\n  box-shadow: 0 0.25rem 0.45rem rgba(0, 0, 0, 0.55);\n  content: "";\n}\n.theory-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #1d1108;\n  font-size: clamp(1.1rem, 1.9vw, 1.45rem);\n  font-weight: 650;\n  line-height: 1.35;\n}\n.confidence-readout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.25rem;\n  margin-top: 0.75rem;\n  color: #5d4630;\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.confidence-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7d3413;\n}\n.confidence-readout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  height: 0.3rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(93, 70, 48, 0.22);\n}\n.confidence-readout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #b3382f,\n      #e8a33f);\n}\n.reasoning-copy[_ngcontent-%COMP%] {\n  margin-top: 0.7rem;\n  color: #45341f;\n  font-size: 0.74rem;\n  line-height: 1.5;\n}\n.evidence-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  margin-top: 0.6rem;\n}\n.evidence-chips[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  max-width: 100%;\n  overflow: hidden;\n  border: 1px solid rgba(93, 70, 48, 0.4);\n  border-radius: 999px;\n  padding: 0.22rem 0.55rem;\n  color: #3b2b18;\n  background: rgba(255, 255, 255, 0.32);\n  cursor: pointer;\n  font-size: 0.66rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-chips[_ngcontent-%COMP%]   button[data-zone=supports][_ngcontent-%COMP%] {\n  border-color: #2f6b4c;\n  color: #1f4c34;\n}\n.evidence-chips[_ngcontent-%COMP%]   button[data-zone=contradicts][_ngcontent-%COMP%] {\n  border-color: #a33a2c;\n  color: #7d2419;\n}\n.remaining-question[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  border: 1px dashed var(--%NS%case-edge, #334a5d);\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: rgba(0, 0, 0, 0.2);\n}\n.remaining-question[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%case-ink, #9db2bd);\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.remaining-question[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.68rem;\n}\ndetails[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  border-top: 1px solid var(--%NS%case-edge, rgba(128, 126, 170, 0.22));\n  padding-top: 0.6rem;\n}\nsummary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: var(--%NS%case-ink, #b5afd6);\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 700;\n}\nsummary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%case-muted, #8390a8);\n  font-size: 0.62rem;\n  font-weight: 600;\n}\ndetails[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.5rem 0 0;\n  padding-left: 1.4rem;\n}\ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #91a7b2;\n  font-size: 0.65rem;\n}\ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dce7ec;\n}\n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 0.75rem;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b2a7f5;\n  outline-offset: 2px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .theory-card[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=working-theory.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationWorkingTheoryComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-working-theory", imports: [FormsModule], template: `<section class="theory-panel" [class.compact]="compact()" aria-labelledby="working-theory-title">
  <p class="panel-tab" id="working-theory-title">
    Theory
    <span aria-live="polite">
      {{ saveState() === 'saving' ? 'Saving\u2026' : saveState() === 'pending' ? 'Pending' : '' }}
    </span>
  </p>

  @if (theory() === undefined || editing() || creatingAlternative()) {
    @if (singlePage()) {
      <form class="theory-form" (submit)="$event.preventDefault(); saveTheory()">
        <label class="slip"
          >My idea
          <textarea
            rows="3"
            name="statement"
            [ngModel]="statement()"
            (ngModelChange)="statement.set($event)"
            placeholder="I think the four vials are\u2026"
          ></textarea>
        </label>
        <fieldset class="slip">
          <legend>Evidence I am using</legend>
          <p>Choose records here or use \u201CUse in my explanation\u201D beside the bench.</p>
          <div class="evidence-picker">
            @for (item of availableEvidence(); track item.id) {
              <label
                ><input
                  #recordCheck
                  type="checkbox"
                  [checked]="evidenceIds().includes(item.id)"
                  (change)="toggleEvidence(item.id, recordCheck.checked)"
                /><span>{{ item.title }}</span></label
              >
            }
          </div>
        </fieldset>
        <label class="slip"
          >Why this evidence supports my idea
          <textarea
            rows="3"
            name="reasoning"
            [ngModel]="reasoning()"
            (ngModelChange)="reasoning.set($event)"
            placeholder="These results matter because\u2026"
          ></textarea>
        </label>
        <label class="slip"
          >What I am still unsure about
          <textarea
            rows="2"
            name="remainingQuestion"
            [ngModel]="remainingQuestion()"
            (ngModelChange)="remainingQuestion.set($event)"
            placeholder="I still need to find out\u2026"
          ></textarea>
        </label>
        <label class="confidence-control"
          ><span
            >How sure am I? <strong>{{ confidence() }}%</strong></span
          ><input
            type="range"
            min="0"
            max="100"
            step="5"
            name="confidence"
            [ngModel]="confidence()"
            (ngModelChange)="confidence.set(+$event)"
        /></label>
        @if (theory() && !creatingAlternative()) {
          <label class="slip"
            >Why my thinking changed
            <textarea
              rows="2"
              name="reasonForChange"
              [ngModel]="reasonForChange()"
              (ngModelChange)="reasonForChange.set($event)"
              placeholder="New evidence showed\u2026"
            ></textarea>
            <small>Your earlier explanation stays in the investigation record.</small>
          </label>
        }
        <div class="form-actions">
          @if (theory()) {
            <button type="button" (click)="cancelEditing()">Cancel revision</button>
          }
          <button class="primary" type="submit" [disabled]="!statement().trim()">
            Save my explanation
          </button>
        </div>
      </form>
    } @else {
      <!-- One question at a time, not a five-field form. -->
      <form class="theory-form" (submit)="$event.preventDefault(); next()">
        <p class="slip-progress">
          Slip {{ step() + 1 }} of {{ steps().length }}
          @if (theory() !== undefined && !creatingAlternative()) {
            \xB7 revising
          }
        </p>

        @switch (currentStep()) {
          @case ('statement') {
            <label class="slip">
              {{
                creatingAlternative()
                  ? 'What is a different explanation for the same evidence?'
                  : 'What do you think right now?'
              }}
              <textarea
                rows="3"
                [ngModel]="statement()"
                (ngModelChange)="statement.set($event)"
                name="statement"
                placeholder="I think the four vials are\u2026"
              ></textarea>
            </label>

            <label class="confidence-control">
              <span
                >How sure are you? <strong>{{ confidence() }}%</strong></span
              >
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                [ngModel]="confidence()"
                (ngModelChange)="confidence.set(+$event)"
                name="confidence"
              />
            </label>
          }

          @case ('reasoning') {
            <label class="slip">
              Why does your evidence support this idea?
              <textarea
                rows="4"
                [ngModel]="reasoning()"
                (ngModelChange)="reasoning.set($event)"
                name="reasoning"
                placeholder="This evidence matters because\u2026"
              ></textarea>
            </label>
          }

          @case ('question') {
            <label class="slip">
              What are you still unsure about?
              <textarea
                rows="3"
                [ngModel]="remainingQuestion()"
                (ngModelChange)="remainingQuestion.set($event)"
                name="remainingQuestion"
                placeholder="I still need to know\u2026"
              ></textarea>
            </label>
          }

          @case ('change') {
            <label class="slip">
              Why did your thinking change?
              <textarea
                rows="3"
                [ngModel]="reasonForChange()"
                (ngModelChange)="reasonForChange.set($event)"
                name="reasonForChange"
                placeholder="New evidence showed\u2026"
              ></textarea>
              <small>Your earlier thinking is kept, not erased.</small>
            </label>
          }

          @case ('evidence') {
            <fieldset class="slip">
              <legend>Which records is this built on?</legend>
              <div class="evidence-picker">
                @for (item of availableEvidence(); track item.id) {
                  <label>
                    <input
                      #evidenceCheckbox
                      type="checkbox"
                      [checked]="evidenceIds().includes(item.id)"
                      (change)="toggleEvidence(item.id, evidenceCheckbox.checked)"
                    />
                    <span
                      ><strong>{{ item.title }}</strong
                      ><small>{{ item.classification ?? 'not analyzed' }}</small></span
                    >
                  </label>
                }
              </div>
            </fieldset>
          }
        }

        <div class="form-actions">
          @if (step() > 0) {
            <button type="button" (click)="back()">Back</button>
          } @else if (theory() !== undefined) {
            <button type="button" (click)="cancelEditing()">Cancel</button>
          }
          <button class="primary" type="submit" [disabled]="!canAdvance()">
            {{ onLastStep() ? 'Save theory' : 'Next' }}
          </button>
        </div>
      </form>
    }
  } @else if (theory(); as current) {
    @if (theories().length > 1 && !compact()) {
      <nav class="theory-tabs" aria-label="Possible explanations">
        @for (item of theories(); track item.id) {
          <button
            type="button"
            [class.active]="item.id === current.id"
            (click)="theorySelected.emit(item.id)"
          >
            Theory {{ $index + 1 }} \xB7 {{ item.confidence ?? 0 }}%
          </button>
        }
      </nav>
    }

    <!-- The card: the sentence and how sure they are, and nothing else loud. -->
    <article class="theory-card">
      <h3>{{ current.statement }}</h3>
      <div class="confidence-readout">
        <span>Confidence</span><strong>{{ current.confidence ?? 0 }}%</strong>
        <i><span [style.width.%]="current.confidence ?? 0"></span></i>
      </div>

      <p class="reasoning-copy">
        {{ current.reasoning || 'Add reasoning that connects the evidence to your explanation.' }}
      </p>

      @if (supportingEvidence().length > 0 || challengingEvidence().length > 0) {
        <div class="evidence-chips">
          @for (item of supportingEvidence().slice(0, 2); track item.id) {
            <button type="button" data-zone="supports" (click)="evidenceSelected.emit(item.id)">
              + {{ item.title }}
            </button>
          }
          @for (item of challengingEvidence().slice(0, 2); track item.id) {
            <button type="button" data-zone="contradicts" (click)="evidenceSelected.emit(item.id)">
              \u2212 {{ item.title }}
            </button>
          }
        </div>
      }
    </article>

    <section class="remaining-question">
      <p>{{ current.remainingQuestion || 'What evidence would make you more confident?' }}</p>
      <button type="button" (click)="investigateRequested.emit()">
        Find an investigation <span aria-hidden="true">\u2192</span>
      </button>
    </section>

    <div class="panel-actions">
      <button class="primary" type="button" (click)="beginEditing()">Revise theory</button>
      @if (!compact()) {
        <button type="button" (click)="beginAlternative()">Add alternative</button>
        <button type="button" (click)="finalRequested.emit()">Check final readiness</button>
      }
    </div>

    @if (!compact() && current.revisions.length > 1) {
      <details class="theory-history">
        <summary>
          Earlier thinking<span>{{ current.revisions.length }}</span>
        </summary>
        <ol>
          @for (revision of current.revisions; track revision.revisionId) {
            <li>
              <span>Version {{ $index + 1 }}</span
              ><strong>{{ revision.statement }}</strong
              ><small>{{ revision.reasonForChange || 'Initial theory' }}</small>
            </li>
          }
        </ol>
      </details>
    }
  }
</section>
`, styles: ['/* src/app/templates/investigation/ui/working-theory.component.scss */\n:host,\n.theory-panel {\n  display: block;\n  min-height: 100%;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea {\n  font: inherit;\n}\n.theory-panel {\n  padding: 1rem;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\n.panel-tab {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: var(--case-accent, #a79ae8);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.panel-tab span {\n  color: var(--case-muted, #8390a8);\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.slip-progress {\n  margin-top: 0.9rem;\n  color: var(--case-muted, #8390a8);\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.theory-form > .slip {\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 0.9rem;\n  background:\n    linear-gradient(\n      168deg,\n      #f6ecda,\n      #e6d8c0);\n  box-shadow: 0 0.9rem 1.8rem rgba(0, 0, 0, 0.45);\n  color: #1d1108;\n  font-size: 0.92rem;\n  font-weight: 650;\n  letter-spacing: normal;\n  line-height: 1.35;\n  text-transform: none;\n}\n.theory-form > .slip > legend {\n  padding: 0;\n  font-size: 0.92rem;\n  font-weight: 650;\n}\n.theory-form > .slip small {\n  color: #6a5236;\n  font-size: 0.66rem;\n  font-weight: 500;\n}\n.theory-form > .slip textarea {\n  margin-top: 0.5rem;\n  border-color: rgba(93, 70, 48, 0.42);\n  color: #241609;\n  background: rgba(255, 255, 255, 0.55);\n  font-size: 0.78rem;\n  font-weight: 400;\n}\n.theory-form > .slip .evidence-picker label {\n  border-color: rgba(93, 70, 48, 0.32);\n  color: #241609;\n  background: rgba(255, 255, 255, 0.42);\n}\n.theory-form > .slip .evidence-picker strong {\n  color: #241609;\n}\n.theory-form > .slip .evidence-picker small {\n  color: #6a5236;\n}\n.confidence-control {\n  color: var(--case-ink, #bac7d2);\n}\n.theory-form {\n  display: grid;\n  gap: 0.72rem;\n}\n.theory-form > label,\n.theory-form fieldset {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0;\n  border: 0;\n  padding: 0;\n  color: #bac7d2;\n  font-size: 0.69rem;\n  font-weight: 700;\n}\ntextarea,\ninput[type=text] {\n  width: 100%;\n  border: 1px solid #384d65;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #eff6fb;\n  background: #091a29;\n  resize: vertical;\n}\n.confidence-control > span {\n  display: flex;\n  justify-content: space-between;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: var(--case-accent, #8d7ce0);\n}\n.evidence-picker {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));\n  gap: 0.35rem;\n  max-height: 12rem;\n  overflow: auto;\n}\n.evidence-picker label {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  border: 1px solid #30465a;\n  border-radius: 0.45rem;\n  padding: 0.45rem;\n  color: #d9e5ec;\n  background: #0b2131;\n}\n.evidence-picker label > span {\n  display: grid;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.evidence-picker strong {\n  overflow: hidden;\n  font-size: 0.67rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-picker small {\n  color: #829fac;\n  font-size: 0.58rem;\n  text-transform: capitalize;\n}\n.form-actions,\n.panel-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n}\n.form-actions button,\n.panel-actions button,\n.remaining-question button {\n  border: 1px solid var(--case-edge, #4f4d7c);\n  border-radius: 0.45rem;\n  padding: 0.52rem 0.7rem;\n  color: var(--case-ink, #d7d2f4);\n  background: rgba(0, 0, 0, 0.32);\n  cursor: pointer;\n}\nbutton.primary {\n  border-color: var(--case-accent, #9b8dec);\n  color: #23150d;\n  background: var(--case-accent, #a99cf3);\n  font-weight: 700;\n}\nbutton.primary:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.theory-tabs {\n  display: flex;\n  gap: 0.35rem;\n  margin-top: 0.8rem;\n  overflow-x: auto;\n}\n.theory-tabs button {\n  flex: 0 0 auto;\n  border: 1px solid #3c4960;\n  border-radius: 999px;\n  padding: 0.35rem 0.6rem;\n  color: #99aabb;\n  background: transparent;\n  cursor: pointer;\n}\n.theory-tabs button.active {\n  border-color: #9082df;\n  color: #eeeaff;\n  background: #302b61;\n}\n.theory-card {\n  position: relative;\n  margin-top: 1.1rem;\n  border: 0;\n  border-radius: 0.25rem;\n  padding: 1rem 0.95rem 0.95rem;\n  color: #241609;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      transparent 0 1.34rem,\n      rgba(66, 108, 140, 0.13) 1.34rem 1.4rem),\n    linear-gradient(\n      168deg,\n      #f6ecda,\n      #e6d8c0);\n  box-shadow: 0 1.1rem 2.2rem rgba(0, 0, 0, 0.5), inset 0 -2px 0 rgba(120, 96, 66, 0.18);\n  transform: rotate(-0.55deg);\n}\n.theory-card::before {\n  position: absolute;\n  top: -0.42rem;\n  left: 50%;\n  width: 0.85rem;\n  height: 0.85rem;\n  margin-left: -0.42rem;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 34% 30%,\n      #ffd9a0,\n      #c8642c 62%,\n      #7d3413);\n  box-shadow: 0 0.25rem 0.45rem rgba(0, 0, 0, 0.55);\n  content: "";\n}\n.theory-card h3 {\n  margin-top: 0;\n  color: #1d1108;\n  font-size: clamp(1.1rem, 1.9vw, 1.45rem);\n  font-weight: 650;\n  line-height: 1.35;\n}\n.confidence-readout {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.25rem;\n  margin-top: 0.75rem;\n  color: #5d4630;\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.confidence-readout strong {\n  color: #7d3413;\n}\n.confidence-readout i {\n  grid-column: 1/-1;\n  height: 0.3rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(93, 70, 48, 0.22);\n}\n.confidence-readout i span {\n  display: block;\n  height: 100%;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #b3382f,\n      #e8a33f);\n}\n.reasoning-copy {\n  margin-top: 0.7rem;\n  color: #45341f;\n  font-size: 0.74rem;\n  line-height: 1.5;\n}\n.evidence-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  margin-top: 0.6rem;\n}\n.evidence-chips button {\n  max-width: 100%;\n  overflow: hidden;\n  border: 1px solid rgba(93, 70, 48, 0.4);\n  border-radius: 999px;\n  padding: 0.22rem 0.55rem;\n  color: #3b2b18;\n  background: rgba(255, 255, 255, 0.32);\n  cursor: pointer;\n  font-size: 0.66rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-chips button[data-zone=supports] {\n  border-color: #2f6b4c;\n  color: #1f4c34;\n}\n.evidence-chips button[data-zone=contradicts] {\n  border-color: #a33a2c;\n  color: #7d2419;\n}\n.remaining-question {\n  margin-top: 0.75rem;\n  border: 1px dashed var(--case-edge, #334a5d);\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: rgba(0, 0, 0, 0.2);\n}\n.remaining-question p {\n  color: var(--case-ink, #9db2bd);\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.remaining-question button {\n  margin-top: 0.5rem;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.68rem;\n}\ndetails {\n  margin-top: 0.6rem;\n  border-top: 1px solid var(--case-edge, rgba(128, 126, 170, 0.22));\n  padding-top: 0.6rem;\n}\nsummary {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: var(--case-ink, #b5afd6);\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 700;\n}\nsummary span {\n  color: var(--case-muted, #8390a8);\n  font-size: 0.62rem;\n  font-weight: 600;\n}\ndetails ol {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.5rem 0 0;\n  padding-left: 1.4rem;\n}\ndetails li {\n  color: #91a7b2;\n  font-size: 0.65rem;\n}\ndetails li span,\ndetails li strong,\ndetails li small {\n  display: block;\n}\ndetails li strong {\n  color: #dce7ec;\n}\n.panel-actions {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 0.75rem;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nsummary:focus-visible {\n  outline: 2px solid #b2a7f5;\n  outline-offset: 2px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .theory-card {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=working-theory.component.css.map */\n'] }]
  }], () => [], { theory: [{ type: Input, args: [{ isSignal: true, alias: "theory", required: false }] }], theories: [{ type: Input, args: [{ isSignal: true, alias: "theories", required: false }] }], evidence: [{ type: Input, args: [{ isSignal: true, alias: "evidence", required: false }] }], compact: [{ type: Input, args: [{ isSignal: true, alias: "compact", required: false }] }], saveState: [{ type: Input, args: [{ isSignal: true, alias: "saveState", required: false }] }], singlePage: [{ type: Input, args: [{ isSignal: true, alias: "singlePage", required: false }] }], theorySaved: [{ type: Output, args: ["theorySaved"] }], theorySelected: [{ type: Output, args: ["theorySelected"] }], evidenceSelected: [{ type: Output, args: ["evidenceSelected"] }], investigateRequested: [{ type: Output, args: ["investigateRequested"] }], finalRequested: [{ type: Output, args: ["finalRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationWorkingTheoryComponent, { className: "InvestigationWorkingTheoryComponent", filePath: "src/app/templates/investigation/ui/working-theory.component.ts", lineNumber: 17 });
})();

// src/app/templates/investigation/ui/evidence-detail.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function InvestigationEvidenceDetailComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 4)(1, "span", 5);
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Locked evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Complete its connected investigation before examining this result.");
    \u0275\u0275elementEnd()()();
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl)("alt", ctx_r0.evidence().title);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "span")(2, "span")(3, "span")(4, "span")(5, "span");
    \u0275\u0275elementEnd();
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(record_r2.text);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(column_r3);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r4);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_8_For_2_Template, 2, 1, "td", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r5);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "table", 13)(2, "thead")(3, "tr");
    \u0275\u0275repeaterCreate(4, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_5_Template, 2, 1, "th", 14, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "tbody");
    \u0275\u0275repeaterCreate(7, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_For_8_Template, 3, 0, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(record_r2.columns);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(record_r2.rows);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_0_Template, 2, 1, "p", 11);
    \u0275\u0275conditionalCreate(1, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Conditional_1_Template, 9, 0, "div", 12);
  }
  if (rf & 2) {
    const record_r2 = ctx;
    \u0275\u0275conditional(record_r2.text ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(record_r2.rows ? 1 : -1);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(column_r6);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_13_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r7 = ctx.$implicit;
    \u0275\u0275classProp("empty-result", cell_r7 === void 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r7 ?? "Not tested", " ");
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_13_For_4_Template, 2, 3, "td", 17, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.label);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r8.cells);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "h3", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 12)(4, "table")(5, "thead")(6, "tr")(7, "th", 14);
    \u0275\u0275text(8, "Test");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_10_Template, 2, 1, "th", 14, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_For_13_Template, 5, 1, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const matrix_r9 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(matrix_r9.title);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(matrix_r9.columnLabels);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(matrix_r9.rows);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1, "Open source record ");
    \u0275\u0275elementStart(2, "span", 5);
    \u0275\u0275text(3, "\u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("href", ctx, \u0275\u0275sanitizeUrl);
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Your current idea:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.claim());
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 18)(1, "span", 19);
    \u0275\u0275text(2, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "fieldset")(4, "legend");
    \u0275\u0275text(5, "Decide what this clue does");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Conditional_6_Template, 4, 1, "p");
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Your classification records your interpretation; it is not graded as right or wrong. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 25)(10, "button", 23);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.classificationChanged.emit("supports"));
    });
    \u0275\u0275elementStart(11, "span", 5);
    \u0275\u0275text(12, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Supports ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 23);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.classificationChanged.emit("uncertain"));
    });
    \u0275\u0275elementStart(15, "span", 5);
    \u0275\u0275text(16, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Uncertain ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 23);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.classificationChanged.emit("contradicts"));
    });
    \u0275\u0275elementStart(19, "span", 5);
    \u0275\u0275text(20, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Contradicts ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.claim() ? 6 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("selected", ctx_r0.evidence().classification === "supports");
    \u0275\u0275attribute("aria-pressed", ctx_r0.evidence().classification === "supports");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("selected", ctx_r0.evidence().classification === "uncertain");
    \u0275\u0275attribute("aria-pressed", ctx_r0.evidence().classification === "uncertain");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("selected", ctx_r0.evidence().classification === "contradicts");
    \u0275\u0275attribute("aria-pressed", ctx_r0.evidence().classification === "contradicts");
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Write your current idea in My explanation before deciding whether this evidence supports it. ");
    \u0275\u0275elementEnd();
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 18)(1, "span", 19);
    \u0275\u0275text(2, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "h3");
    \u0275\u0275text(5, "Look closely");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "What do you notice before deciding what this clue means?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, " Evidence note ");
    \u0275\u0275elementStart(10, "textarea", 20);
    \u0275\u0275listener("ngModelChange", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.note.set($event));
    })("blur", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_textarea_blur_10_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveNote());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 21);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveNote());
    });
    \u0275\u0275text(12, "Save observation");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_13_Template, 22, 10, "section", 18)(14, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Conditional_14_Template, 2, 0, "p");
    \u0275\u0275elementStart(15, "section", 18)(16, "span", 19);
    \u0275\u0275text(17, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "h3");
    \u0275\u0275text(20, "Use the evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 22)(22, "button", 23);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.importanceChanged.emit(!ctx_r0.evidence().important));
    });
    \u0275\u0275elementStart(23, "span", 5);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 23);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.finalEvidenceSelected.emit());
    });
    \u0275\u0275elementStart(27, "span", 5);
    \u0275\u0275text(28, "\uFF0B");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label");
    \u0275\u0275text(31, " Ask a question about this evidence ");
    \u0275\u0275elementStart(32, "input", 24);
    \u0275\u0275listener("ngModelChange", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.question.set($event));
    })("keyup.enter", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_input_keyup_enter_32_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addQuestion());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 21);
    \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addQuestion());
    });
    \u0275\u0275text(34, "Add question");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r0.note());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r0.requireClaim() || ctx_r0.claim() ? 13 : 14);
    \u0275\u0275advance(9);
    \u0275\u0275attribute("aria-pressed", ctx_r0.evidence().important);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.evidence().important ? "\u2605" : "\u2606");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.evidence().important ? "Marked important" : "Mark important", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.requireClaim() ? "Use in my explanation" : "Add to final evidence set", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.question());
    \u0275\u0275control();
  }
}
function InvestigationEvidenceDetailComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 6);
    \u0275\u0275conditionalCreate(1, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_1_Template, 1, 2, "img", 7)(2, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_2_Template, 6, 0, "div", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_5_Template, 2, 2);
    \u0275\u0275conditionalCreate(6, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_6_Template, 14, 1, "section", 9);
    \u0275\u0275conditionalCreate(7, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_7_Template, 4, 1, "a", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, InvestigationEvidenceDetailComponent_Conditional_12_Conditional_8_Template, 35, 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.evidence().asset) ? 1 : 2, tmp_1_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.evidence().summary);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.sourceRecord()) ? 5 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r0.evidence().resultMatrix) ? 6 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r0.evidence().file) ? 7 : -1, tmp_5_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.referenceOnly() ? 8 : -1);
  }
}
var InvestigationEvidenceDetailComponent = class _InvestigationEvidenceDetailComponent {
  evidence = input.required(
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  referenceOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "referenceOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  claim = input(
    ...ngDevMode ? [void 0, { debugName: "claim" }] : (
      /* istanbul ignore next */
      []
    )
  );
  requireClaim = input(
    false,
    ...ngDevMode ? [{ debugName: "requireClaim" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceRecord = input(
    ...ngDevMode ? [void 0, { debugName: "sourceRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closed = output();
  classificationChanged = output();
  noteSaved = output();
  importanceChanged = output();
  finalEvidenceSelected = output();
  questionCreated = output();
  note = signal(
    "",
    ...ngDevMode ? [{ debugName: "note" }] : (
      /* istanbul ignore next */
      []
    )
  );
  question = signal(
    "",
    ...ngDevMode ? [{ debugName: "question" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentId;
  drafts = /* @__PURE__ */ new Map();
  constructor() {
    persistWorkspaceDraft("evidence-notes", () => {
      const draft = { note: this.note(), question: this.question() };
      if (this.currentId)
        this.drafts.set(this.currentId, draft);
      return [...this.drafts.entries()];
    }, (saved) => {
      if (Array.isArray(saved))
        for (const [id, draft] of saved)
          this.drafts.set(id, draft);
    });
    effect(() => {
      const item = this.evidence();
      untracked(() => {
        if (item.id === this.currentId)
          return;
        if (this.currentId)
          this.drafts.set(this.currentId, { note: this.note(), question: this.question() });
        this.currentId = item.id;
        const draft = this.drafts.get(item.id);
        this.note.set(draft?.note ?? item.notes.at(-1) ?? "");
        this.question.set(draft?.question ?? "");
      });
    });
  }
  saveNote() {
    const note = this.note().trim();
    if (note.length > 0 && note !== this.evidence().notes.at(-1)) {
      this.noteSaved.emit(note);
    }
  }
  addQuestion() {
    const question = this.question().trim();
    if (question.length === 0) {
      return;
    }
    this.questionCreated.emit(question);
    this.question.set("");
  }
  static \u0275fac = function InvestigationEvidenceDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationEvidenceDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationEvidenceDetailComponent, selectors: [["app-investigation-evidence-detail"]], inputs: { evidence: [1, "evidence"], referenceOnly: [1, "referenceOnly"], claim: [1, "claim"], requireClaim: [1, "requireClaim"], sourceRecord: [1, "sourceRecord"] }, outputs: { closed: "closed", classificationChanged: "classificationChanged", noteSaved: "noteSaved", importanceChanged: "importanceChanged", finalEvidenceSelected: "finalEvidenceSelected", questionCreated: "questionCreated" }, decls: 13, vars: 4, consts: [["aria-labelledby", "evidence-detail-title", 1, "evidence-detail"], [1, "eyebrow"], ["id", "evidence-detail-title"], ["type", "button", "aria-label", "Close evidence detail", 1, "icon-button", 3, "click"], ["aria-live", "polite", 1, "locked-state"], ["aria-hidden", "true"], ["aria-label", "Evidence content", 1, "evidence-content"], [3, "src", "alt"], ["aria-hidden", "true", 1, "data-visual"], ["aria-labelledby", "result-matrix-title", 1, "result-matrix"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "source-transcript"], [1, "result-table-scroll"], [1, "source-table"], ["scope", "col"], ["id", "result-matrix-title"], ["scope", "row"], [3, "empty-result"], [1, "guided-step"], [1, "step-number"], ["rows", "3", "placeholder", "I notice\u2026", 3, "ngModelChange", "blur", "ngModel"], ["type", "button", 1, "quiet-action", 3, "click"], [1, "evidence-actions"], ["type", "button", 3, "click"], ["type", "text", "placeholder", "Why did this happen?", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "classification-actions"]], template: function InvestigationEvidenceDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article", 0)(1, "header")(2, "div")(3, "span", 1);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2", 2);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 3);
      \u0275\u0275listener("click", function InvestigationEvidenceDetailComponent_Template_button_click_9_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275text(10, " \xD7 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, InvestigationEvidenceDetailComponent_Conditional_11_Template, 8, 0, "section", 4)(12, InvestigationEvidenceDetailComponent_Conditional_12_Template, 9, 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.evidence().type);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.evidence().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.evidence().source);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.evidence().status === "locked" ? 11 : 12);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\n.evidence-detail[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  margin-top: 0.18rem;\n  color: #f5fbff;\n  font-size: clamp(1.15rem, 2vw, 1.55rem);\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.guided-step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.28rem;\n  color: #9fb8c8;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #7fd9d7;\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.icon-button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.25rem;\n  height: 2.25rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #31566d;\n  border-radius: 0.5rem;\n  color: #cfe3ef;\n  background: #0c2232;\n  cursor: pointer;\n}\n.evidence-content[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #31566d;\n  border-radius: 0.8rem;\n  background: #071a28;\n}\n.evidence-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-height: 18rem;\n  object-fit: cover;\n}\n.evidence-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 0.85rem 0.9rem 0.35rem;\n  color: #dceaf2;\n  font-size: 0.86rem;\n  line-height: 1.5;\n}\n.evidence-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin: 0.25rem 0.9rem 0.9rem;\n  color: #8be3df;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.result-matrix[_ngcontent-%COMP%] {\n  margin: 0.75rem 0.9rem 0.9rem;\n  border-top: 1px solid rgba(130, 172, 195, 0.22);\n  padding-top: 0.75rem;\n}\n.result-table-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin-top: 0.55rem;\n}\n.result-matrix[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 38rem;\n  border-collapse: collapse;\n  color: #dceaf2;\n  font-size: 0.7rem;\n  line-height: 1.35;\n}\n.result-matrix[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.result-matrix[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border: 1px solid #284a5f;\n  padding: 0.55rem;\n  text-align: left;\n  vertical-align: top;\n}\n.result-matrix[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #aef2ed;\n  background: #103242;\n}\n.result-matrix[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  width: 7.5rem;\n  color: #eef8fb;\n  background: #0c2938;\n}\n.result-matrix[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  min-width: 7rem;\n  background: rgba(8, 31, 44, 0.72);\n}\n.result-matrix[_ngcontent-%COMP%]   td.empty-result[_ngcontent-%COMP%] {\n  color: #6f8b99;\n  font-style: italic;\n}\n.data-visual[_ngcontent-%COMP%] {\n  display: flex;\n  height: 8rem;\n  align-items: end;\n  justify-content: center;\n  gap: 0.65rem;\n  padding: 1rem;\n  background:\n    linear-gradient(rgba(89, 143, 169, 0.12) 1px, transparent 1px) 0 0/100% 1.5rem,\n    linear-gradient(\n      135deg,\n      #0a2638,\n      #102f3a);\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 9%;\n  border-radius: 0.25rem 0.25rem 0 0;\n  background: linear-gradient(#78dfd9, #318d9a);\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  height: 38%;\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  height: 62%;\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  height: 47%;\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4) {\n  height: 82%;\n}\n.data-visual[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5) {\n  height: 69%;\n}\n.guided-step[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.8rem minmax(0, 1fr);\n  gap: 0.65rem;\n  border-top: 1px solid rgba(130, 172, 195, 0.18);\n  padding-top: 1rem;\n}\n.step-number[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.65rem;\n  height: 1.65rem;\n  place-items: center;\n  border: 1px solid #4a9ca3;\n  border-radius: 50%;\n  color: #b9fffb;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\nh3[_ngcontent-%COMP%], \nlegend[_ngcontent-%COMP%] {\n  color: #edf7fb;\n  font-size: 0.86rem;\n  font-weight: 800;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.38rem;\n  margin-top: 0.7rem;\n  color: #b9cfdb;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #31566d;\n  border-radius: 0.55rem;\n  padding: 0.65rem 0.7rem;\n  color: #eff9fc;\n  outline: none;\n  background: #071824;\n  resize: vertical;\n}\ntextarea[_ngcontent-%COMP%]:focus, \ninput[_ngcontent-%COMP%]:focus, \nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  border-color: #8ae7e1;\n  outline: 2px solid rgba(138, 231, 225, 0.32);\n  outline-offset: 2px;\n}\nfieldset[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.classification-actions[_ngcontent-%COMP%], \n.evidence-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.42rem;\n  margin-top: 0.72rem;\n}\n.classification-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.evidence-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.quiet-action[_ngcontent-%COMP%] {\n  min-height: 2.3rem;\n  border: 1px solid #31566d;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.68rem;\n  color: #cce0e9;\n  background: #0c2332;\n  cursor: pointer;\n}\n.classification-actions[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #72d7d2;\n  color: #efffff;\n  background: #154650;\n}\n.quiet-action[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  color: #9ee7e3;\n  background: transparent;\n  font-size: 0.75rem;\n}\n.locked-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px dashed #526779;\n  border-radius: 0.75rem;\n  padding: 1.15rem;\n  color: #dce8ef;\n  background: rgba(21, 37, 50, 0.72);\n}\n@media (max-width: 700px) {\n  .evidence-detail[_ngcontent-%COMP%] {\n    padding: 0.8rem;\n  }\n  .evidence-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 14rem;\n  }\n}\n[_nghost-%COMP%]   .source-transcript[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n[_nghost-%COMP%]   .source-table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  font-size: 0.8rem;\n  min-width: 420px;\n}\n[_nghost-%COMP%]   .source-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n[_nghost-%COMP%]   .source-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.6rem;\n  border: 1px solid #52717b;\n  text-align: left;\n  vertical-align: top;\n}\n/*# sourceMappingURL=evidence-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationEvidenceDetailComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-evidence-detail", imports: [FormsModule], template: `<article class="evidence-detail" aria-labelledby="evidence-detail-title">
  <header>
    <div>
      <span class="eyebrow">{{ evidence().type }}</span>
      <h2 id="evidence-detail-title">{{ evidence().title }}</h2>
      <p>{{ evidence().source }}</p>
    </div>
    <button
      class="icon-button"
      type="button"
      aria-label="Close evidence detail"
      (click)="closed.emit()"
    >
      \xD7
    </button>
  </header>

  @if (evidence().status === 'locked') {
    <section class="locked-state" aria-live="polite">
      <span aria-hidden="true">\u{1F512}</span>
      <div>
        <strong>Locked evidence</strong>
        <p>Complete its connected investigation before examining this result.</p>
      </div>
    </section>
  } @else {
    <section class="evidence-content" aria-label="Evidence content">
      @if (evidence().asset; as asset) {
        <img [src]="asset" [alt]="evidence().title" />
      } @else {
        <div class="data-visual" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      }
      <p>{{ evidence().summary }}</p>
      @if (sourceRecord(); as record) {
        @if (record.text) {
          <p class="source-transcript">{{ record.text }}</p>
        }
        @if (record.rows) {
          <div class="result-table-scroll">
            <table class="source-table">
              <thead>
                <tr>
                  @for (column of record.columns; track $index) {
                    <th scope="col">{{ column }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of record.rows; track $index) {
                  <tr>
                    @for (cell of row; track $index) {
                      <td>{{ cell }}</td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      }
      @if (evidence().resultMatrix; as matrix) {
        <section class="result-matrix" aria-labelledby="result-matrix-title">
          <h3 id="result-matrix-title">{{ matrix.title }}</h3>
          <div class="result-table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Test</th>
                  @for (column of matrix.columnLabels; track column) {
                    <th scope="col">{{ column }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of matrix.rows; track row.id) {
                  <tr>
                    <th scope="row">{{ row.label }}</th>
                    @for (cell of row.cells; track $index) {
                      <td [class.empty-result]="cell === undefined">
                        {{ cell ?? 'Not tested' }}
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      }
      @if (evidence().file; as file) {
        <a [href]="file" target="_blank" rel="noopener"
          >Open source record <span aria-hidden="true">\u2197</span></a
        >
      }
    </section>

    @if (!referenceOnly()) {
      <section class="guided-step">
        <span class="step-number">1</span>
        <div>
          <h3>Look closely</h3>
          <p>What do you notice before deciding what this clue means?</p>
          <label>
            Evidence note
            <textarea
              rows="3"
              [ngModel]="note()"
              (ngModelChange)="note.set($event)"
              (blur)="saveNote()"
              placeholder="I notice\u2026"
            ></textarea>
          </label>
          <button class="quiet-action" type="button" (click)="saveNote()">Save observation</button>
        </div>
      </section>

      @if (!requireClaim() || claim()) {
        <section class="guided-step">
          <span class="step-number">2</span>
          <fieldset>
            <legend>Decide what this clue does</legend>
            @if (claim()) {
              <p><strong>Your current idea:</strong> {{ claim() }}</p>
            }
            <p>
              Your classification records your interpretation; it is not graded as right or wrong.
            </p>
            <div class="classification-actions">
              <button
                type="button"
                [class.selected]="evidence().classification === 'supports'"
                [attr.aria-pressed]="evidence().classification === 'supports'"
                (click)="classificationChanged.emit('supports')"
              >
                <span aria-hidden="true">+</span> Supports
              </button>
              <button
                type="button"
                [class.selected]="evidence().classification === 'uncertain'"
                [attr.aria-pressed]="evidence().classification === 'uncertain'"
                (click)="classificationChanged.emit('uncertain')"
              >
                <span aria-hidden="true">?</span> Uncertain
              </button>
              <button
                type="button"
                [class.selected]="evidence().classification === 'contradicts'"
                [attr.aria-pressed]="evidence().classification === 'contradicts'"
                (click)="classificationChanged.emit('contradicts')"
              >
                <span aria-hidden="true">\u2212</span> Contradicts
              </button>
            </div>
          </fieldset>
        </section>
      } @else {
        <p>
          Write your current idea in My explanation before deciding whether this evidence supports
          it.
        </p>
      }

      <section class="guided-step">
        <span class="step-number">3</span>
        <div>
          <h3>Use the evidence</h3>
          <div class="evidence-actions">
            <button
              type="button"
              [attr.aria-pressed]="evidence().important"
              (click)="importanceChanged.emit(!evidence().important)"
            >
              <span aria-hidden="true">{{ evidence().important ? '\u2605' : '\u2606' }}</span>
              {{ evidence().important ? 'Marked important' : 'Mark important' }}
            </button>
            <button type="button" (click)="finalEvidenceSelected.emit()">
              <span aria-hidden="true">\uFF0B</span>
              {{ requireClaim() ? 'Use in my explanation' : 'Add to final evidence set' }}
            </button>
          </div>
          <label>
            Ask a question about this evidence
            <input
              type="text"
              [ngModel]="question()"
              (ngModelChange)="question.set($event)"
              (keyup.enter)="addQuestion()"
              placeholder="Why did this happen?"
            />
          </label>
          <button class="quiet-action" type="button" (click)="addQuestion()">Add question</button>
        </div>
      </section>
    }
  }
</article>
`, styles: ["/* src/app/templates/investigation/ui/evidence-detail.component.scss */\n:host {\n  display: block;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ntextarea,\ninput,\na {\n  font: inherit;\n}\n.evidence-detail {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\nheader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\nh2 {\n  margin-top: 0.18rem;\n  color: #f5fbff;\n  font-size: clamp(1.15rem, 2vw, 1.55rem);\n}\nheader p,\n.guided-step p {\n  margin-top: 0.28rem;\n  color: #9fb8c8;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.eyebrow {\n  color: #7fd9d7;\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.icon-button {\n  display: grid;\n  width: 2.25rem;\n  height: 2.25rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #31566d;\n  border-radius: 0.5rem;\n  color: #cfe3ef;\n  background: #0c2232;\n  cursor: pointer;\n}\n.evidence-content {\n  overflow: hidden;\n  border: 1px solid #31566d;\n  border-radius: 0.8rem;\n  background: #071a28;\n}\n.evidence-content img {\n  display: block;\n  width: 100%;\n  max-height: 18rem;\n  object-fit: cover;\n}\n.evidence-content p {\n  padding: 0.85rem 0.9rem 0.35rem;\n  color: #dceaf2;\n  font-size: 0.86rem;\n  line-height: 1.5;\n}\n.evidence-content a {\n  display: inline-flex;\n  margin: 0.25rem 0.9rem 0.9rem;\n  color: #8be3df;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.result-matrix {\n  margin: 0.75rem 0.9rem 0.9rem;\n  border-top: 1px solid rgba(130, 172, 195, 0.22);\n  padding-top: 0.75rem;\n}\n.result-table-scroll {\n  overflow-x: auto;\n  margin-top: 0.55rem;\n}\n.result-matrix table {\n  width: 100%;\n  min-width: 38rem;\n  border-collapse: collapse;\n  color: #dceaf2;\n  font-size: 0.7rem;\n  line-height: 1.35;\n}\n.result-matrix th,\n.result-matrix td {\n  border: 1px solid #284a5f;\n  padding: 0.55rem;\n  text-align: left;\n  vertical-align: top;\n}\n.result-matrix thead th {\n  color: #aef2ed;\n  background: #103242;\n}\n.result-matrix tbody th {\n  width: 7.5rem;\n  color: #eef8fb;\n  background: #0c2938;\n}\n.result-matrix td {\n  min-width: 7rem;\n  background: rgba(8, 31, 44, 0.72);\n}\n.result-matrix td.empty-result {\n  color: #6f8b99;\n  font-style: italic;\n}\n.data-visual {\n  display: flex;\n  height: 8rem;\n  align-items: end;\n  justify-content: center;\n  gap: 0.65rem;\n  padding: 1rem;\n  background:\n    linear-gradient(rgba(89, 143, 169, 0.12) 1px, transparent 1px) 0 0/100% 1.5rem,\n    linear-gradient(\n      135deg,\n      #0a2638,\n      #102f3a);\n}\n.data-visual span {\n  width: 9%;\n  border-radius: 0.25rem 0.25rem 0 0;\n  background: linear-gradient(#78dfd9, #318d9a);\n}\n.data-visual span:nth-child(1) {\n  height: 38%;\n}\n.data-visual span:nth-child(2) {\n  height: 62%;\n}\n.data-visual span:nth-child(3) {\n  height: 47%;\n}\n.data-visual span:nth-child(4) {\n  height: 82%;\n}\n.data-visual span:nth-child(5) {\n  height: 69%;\n}\n.guided-step {\n  display: grid;\n  grid-template-columns: 1.8rem minmax(0, 1fr);\n  gap: 0.65rem;\n  border-top: 1px solid rgba(130, 172, 195, 0.18);\n  padding-top: 1rem;\n}\n.step-number {\n  display: grid;\n  width: 1.65rem;\n  height: 1.65rem;\n  place-items: center;\n  border: 1px solid #4a9ca3;\n  border-radius: 50%;\n  color: #b9fffb;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\nh3,\nlegend {\n  color: #edf7fb;\n  font-size: 0.86rem;\n  font-weight: 800;\n}\nlabel {\n  display: grid;\n  gap: 0.38rem;\n  margin-top: 0.7rem;\n  color: #b9cfdb;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\ntextarea,\ninput {\n  width: 100%;\n  border: 1px solid #31566d;\n  border-radius: 0.55rem;\n  padding: 0.65rem 0.7rem;\n  color: #eff9fc;\n  outline: none;\n  background: #071824;\n  resize: vertical;\n}\ntextarea:focus,\ninput:focus,\nbutton:focus-visible,\na:focus-visible {\n  border-color: #8ae7e1;\n  outline: 2px solid rgba(138, 231, 225, 0.32);\n  outline-offset: 2px;\n}\nfieldset {\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.classification-actions,\n.evidence-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.42rem;\n  margin-top: 0.72rem;\n}\n.classification-actions button,\n.evidence-actions button,\n.quiet-action {\n  min-height: 2.3rem;\n  border: 1px solid #31566d;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.68rem;\n  color: #cce0e9;\n  background: #0c2332;\n  cursor: pointer;\n}\n.classification-actions button.selected {\n  border-color: #72d7d2;\n  color: #efffff;\n  background: #154650;\n}\n.quiet-action {\n  margin-top: 0.5rem;\n  color: #9ee7e3;\n  background: transparent;\n  font-size: 0.75rem;\n}\n.locked-state {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px dashed #526779;\n  border-radius: 0.75rem;\n  padding: 1.15rem;\n  color: #dce8ef;\n  background: rgba(21, 37, 50, 0.72);\n}\n@media (max-width: 700px) {\n  .evidence-detail {\n    padding: 0.8rem;\n  }\n  .evidence-content img {\n    max-height: 14rem;\n  }\n}\n:host .source-transcript {\n  white-space: pre-wrap;\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n:host .source-table {\n  border-collapse: collapse;\n  font-size: 0.8rem;\n  min-width: 420px;\n}\n:host .source-table th,\n:host .source-table td {\n  padding: 0.6rem;\n  border: 1px solid #52717b;\n  text-align: left;\n  vertical-align: top;\n}\n/*# sourceMappingURL=evidence-detail.component.css.map */\n"] }]
  }], () => [], { evidence: [{ type: Input, args: [{ isSignal: true, alias: "evidence", required: true }] }], referenceOnly: [{ type: Input, args: [{ isSignal: true, alias: "referenceOnly", required: false }] }], claim: [{ type: Input, args: [{ isSignal: true, alias: "claim", required: false }] }], requireClaim: [{ type: Input, args: [{ isSignal: true, alias: "requireClaim", required: false }] }], sourceRecord: [{ type: Input, args: [{ isSignal: true, alias: "sourceRecord", required: false }] }], closed: [{ type: Output, args: ["closed"] }], classificationChanged: [{ type: Output, args: ["classificationChanged"] }], noteSaved: [{ type: Output, args: ["noteSaved"] }], importanceChanged: [{ type: Output, args: ["importanceChanged"] }], finalEvidenceSelected: [{ type: Output, args: ["finalEvidenceSelected"] }], questionCreated: [{ type: Output, args: ["questionCreated"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationEvidenceDetailComponent, { className: "InvestigationEvidenceDetailComponent", filePath: "src/app/templates/investigation/ui/evidence-detail.component.ts", lineNumber: 14 });
})();

// src/app/templates/investigation/ui/workbench-evidence.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function WorkbenchEvidenceComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Searching all available records.");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchEvidenceComponent_For_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 15);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", item_r2.asset, \u0275\u0275sanitizeUrl);
  }
}
function WorkbenchEvidenceComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function WorkbenchEvidenceComponent_For_31_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selected.emit(item_r2.id));
    });
    \u0275\u0275conditionalCreate(1, WorkbenchEvidenceComponent_For_31_Conditional_1_Template, 1, 1, "img", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.selectedId() === item_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.asset ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.status === "locked" ? "Not recorded yet" : item_r2.status === "available" || item_r2.status === "unopened" ? "New" : "Available");
  }
}
function WorkbenchEvidenceComponent_ForEmpty_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No matching records. Try another word or choose All records.");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(link_r5.instruction);
  }
}
function WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      const action_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.useTool.emit(action_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.label, " ");
  }
}
function WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Conditional_0_Template, 2, 1, "p", 17);
    \u0275\u0275conditionalCreate(1, WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Conditional_1_Template, 2, 1, "button", 18);
  }
  if (rf & 2) {
    let tmp_5_0;
    const link_r5 = ctx;
    \u0275\u0275conditional(link_r5.instruction ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = link_r5.action) ? 1 : -1, tmp_5_0);
  }
}
function WorkbenchEvidenceComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, WorkbenchEvidenceComponent_Conditional_33_Conditional_1_Template, 2, 2);
    \u0275\u0275elementStart(2, "app-investigation-evidence-detail", 16);
    \u0275\u0275listener("closed", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_closed_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selected.emit(void 0));
    })("classificationChanged", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_classificationChanged_2_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.classify.emit({ evidenceId: item_r8.id, classification: $event }));
    })("noteSaved", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_noteSaved_2_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.noteSaved.emit({ evidenceId: item_r8.id, note: $event }));
    })("questionCreated", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_questionCreated_2_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.questionCreated.emit({ evidenceId: item_r8.id, text: $event }));
    })("importanceChanged", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_importanceChanged_2_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.importanceChanged.emit({ evidenceId: item_r8.id, important: $event }));
    })("finalEvidenceSelected", function WorkbenchEvidenceComponent_Conditional_33_Template_app_investigation_evidence_detail_finalEvidenceSelected_2_listener() {
      const item_r8 = \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.useEvidence.emit(item_r8.id));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.currentLink()) ? 1 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275property("evidence", ctx)("sourceRecord", ctx_r2.currentLink()?.sourceRecord)("referenceOnly", ctx_r2.currentLink()?.category === "guide")("claim", ctx_r2.claim())("requireClaim", true);
  }
}
var WorkbenchEvidenceComponent = class _WorkbenchEvidenceComponent {
  evidence = input.required(
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  links = input(
    [],
    ...ngDevMode ? [{ debugName: "links" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activityId = input(
    ...ngDevMode ? [void 0, { debugName: "activityId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = input(
    ...ngDevMode ? [void 0, { debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  claim = input(
    ...ngDevMode ? [void 0, { debugName: "claim" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = output();
  useTool = output();
  useEvidence = output();
  classify = output();
  noteSaved = output();
  questionCreated = output();
  importanceChanged = output();
  query = signal(
    "",
    ...ngDevMode ? [{ debugName: "query" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scope = signal(
    "related",
    ...ngDevMode ? [{ debugName: "scope" }] : (
      /* istanbul ignore next */
      []
    )
  );
  category = signal(
    "all",
    ...ngDevMode ? [{ debugName: "category" }] : (
      /* istanbul ignore next */
      []
    )
  );
  current = computed(
    () => this.evidence().find((item) => item.id === this.selectedId()),
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentLink = computed(
    () => this.links().find((link) => link.evidenceId === this.selectedId()),
    ...ngDevMode ? [{ debugName: "currentLink" }] : (
      /* istanbul ignore next */
      []
    )
  );
  items = computed(
    () => {
      const query = this.query().trim().toLowerCase();
      return this.evidence().filter((item) => {
        const link = this.links().find((link2) => link2.evidenceId === item.id);
        const related = !this.activityId() || link?.activityIds.includes(this.activityId());
        if (!query && this.scope() === "related" && !related && item.id !== this.selectedId())
          return false;
        if (this.category() !== "all" && (link?.category ?? (item.studentCreated ? "result" : "clue")) !== this.category())
          return false;
        const text = [item.title, link?.keywords, item.status === "locked" ? "" : item.summary].join(" ").toLowerCase();
        return !query || text.includes(query);
      });
    },
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function WorkbenchEvidenceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkbenchEvidenceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkbenchEvidenceComponent, selectors: [["app-workbench-evidence"]], inputs: { evidence: [1, "evidence"], links: [1, "links"], activityId: [1, "activityId"], selectedId: [1, "selectedId"], claim: [1, "claim"] }, outputs: { selected: "selected", useTool: "useTool", useEvidence: "useEvidence", classify: "classify", noteSaved: "noteSaved", questionCreated: "questionCreated", importanceChanged: "importanceChanged" }, decls: 34, vars: 8, consts: [["aria-label", "Evidence and equipment guides"], [1, "search"], ["type", "search", "placeholder", "Try water, probe, color, or vial A", 3, "ngModelChange", "ngModel"], [1, "filters"], [3, "ngModelChange", "ngModel"], ["value", "related"], ["value", "all"], ["value", "clue"], ["value", "guide"], ["value", "result"], [1, "hint"], ["aria-label", "Matching records", 1, "record-list"], ["type", "button"], ["aria-live", "polite", 1, "selected-record"], ["type", "button", 3, "click"], ["alt", "", "loading", "lazy", 3, "src"], [3, "closed", "classificationChanged", "noteSaved", "questionCreated", "importanceChanged", "finalEvidenceSelected", "evidence", "sourceRecord", "referenceOnly", "claim", "requireClaim"], [1, "instructions"], ["type", "button", 1, "tool-action"], ["type", "button", 1, "tool-action", 3, "click"]], template: function WorkbenchEvidenceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header")(2, "h2");
      \u0275\u0275text(3, "Evidence beside your bench");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Look up a clue or tool guide without leaving your experiment.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "label", 1);
      \u0275\u0275text(7, "Find evidence or equipment");
      \u0275\u0275elementStart(8, "input", 2);
      \u0275\u0275listener("ngModelChange", function WorkbenchEvidenceComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.query.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 3)(10, "label");
      \u0275\u0275text(11, "Show");
      \u0275\u0275elementStart(12, "select", 4);
      \u0275\u0275listener("ngModelChange", function WorkbenchEvidenceComponent_Template_select_ngModelChange_12_listener($event) {
        return ctx.scope.set($event);
      });
      \u0275\u0275elementStart(13, "option", 5);
      \u0275\u0275text(14, "For this tool");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 6);
      \u0275\u0275text(16, "All records");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label");
      \u0275\u0275text(18, "Kind");
      \u0275\u0275elementStart(19, "select", 4);
      \u0275\u0275listener("ngModelChange", function WorkbenchEvidenceComponent_Template_select_ngModelChange_19_listener($event) {
        return ctx.category.set($event);
      });
      \u0275\u0275elementStart(20, "option", 6);
      \u0275\u0275text(21, "Everything");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "option", 7);
      \u0275\u0275text(23, "Case clues");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "option", 8);
      \u0275\u0275text(25, "Tool guides");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "option", 9);
      \u0275\u0275text(27, "My results");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(28, WorkbenchEvidenceComponent_Conditional_28_Template, 2, 0, "p", 10);
      \u0275\u0275elementStart(29, "div", 11);
      \u0275\u0275repeaterCreate(30, WorkbenchEvidenceComponent_For_31_Template, 6, 4, "button", 12, _forTrack03, false, WorkbenchEvidenceComponent_ForEmpty_32_Template, 2, 0, "p");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(33, WorkbenchEvidenceComponent_Conditional_33_Template, 3, 6, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_9_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", ctx.query());
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.scope());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.category());
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.query().trim() ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("record-list--compact", !!ctx.current());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_9_0 = ctx.current()) ? 33 : -1, tmp_9_0);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, InvestigationEvidenceDetailComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #e8f3f5;\n  min-width: 0;\n}\nsection[_ngcontent-%COMP%] {\n  background: #142330;\n  border: 1px solid #415661;\n  border-radius: 12px;\n  padding: 16px;\n}\nheader[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0 0 6px;\n}\np[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  line-height: 1.5;\n  color: #c6d9df;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  font-size: 0.8rem;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  background: #0b1720;\n  border: 1px solid #637985;\n  border-radius: 6px;\n  color: #f4fafb;\n  padding: 10px;\n  font: inherit;\n  min-height: 44px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  margin: 12px 0;\n}\n.record-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  max-height: 240px;\n  overflow: auto;\n  scrollbar-gutter: stable;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font: inherit;\n  color: inherit;\n  background: #1e3442;\n  border: 1px solid #526c78;\n  border-radius: 6px;\n  padding: 9px;\n  min-height: 44px;\n}\n.record-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  font-size: 0.84rem;\n}\n.record-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  object-fit: cover;\n  border-radius: 4px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  color: #c0d6dc;\n  margin-top: 3px;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #254e52;\n  border-color: #a6e3dd;\n}\n.selected-record[_ngcontent-%COMP%] {\n  border-top: 1px solid #4c6874;\n  margin-top: 14px;\n  padding-top: 12px;\n}\n.tool-action[_ngcontent-%COMP%] {\n  background: #b8e4dc;\n  color: #123638;\n  width: 100%;\n  margin-bottom: 12px;\n}\n.instructions[_ngcontent-%COMP%] {\n  padding: 10px;\n  background: #203b45;\n  border-left: 3px solid #b8e4dc;\n}\n[_nghost-%COMP%]     .selected-record .evidence-content > img {\n  max-height: 180px;\n  width: 100%;\n  object-fit: contain;\n}\n[_nghost-%COMP%]     .selected-record .guided-step {\n  padding: 12px 0;\n}\n[_nghost-%COMP%]     .selected-record .evidence-detail {\n  min-width: 0;\n}\n@media (max-width: 650px) {\n  .record-list[_ngcontent-%COMP%] {\n    max-height: 180px;\n  }\n  input[_ngcontent-%COMP%], \n   select[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n.record-list.record-list--compact[_ngcontent-%COMP%] {\n  max-height: 110px;\n}\n/*# sourceMappingURL=workbench-evidence.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkbenchEvidenceComponent, [{
    type: Component,
    args: [{ selector: "app-workbench-evidence", imports: [FormsModule, InvestigationEvidenceDetailComponent], template: `<section aria-label="Evidence and equipment guides">
  <header>
    <h2>Evidence beside your bench</h2>
    <p>Look up a clue or tool guide without leaving your experiment.</p>
  </header>
  <label class="search"
    >Find evidence or equipment<input
      type="search"
      placeholder="Try water, probe, color, or vial A"
      [ngModel]="query()"
      (ngModelChange)="query.set($event)"
  /></label>
  <div class="filters">
    <label
      >Show<select [ngModel]="scope()" (ngModelChange)="scope.set($event)">
        <option value="related">For this tool</option>
        <option value="all">All records</option>
      </select></label
    >
    <label
      >Kind<select [ngModel]="category()" (ngModelChange)="category.set($event)">
        <option value="all">Everything</option>
        <option value="clue">Case clues</option>
        <option value="guide">Tool guides</option>
        <option value="result">My results</option>
      </select></label
    >
  </div>
  @if (query().trim()) {
    <p class="hint">Searching all available records.</p>
  }
  <div class="record-list" [class.record-list--compact]="!!current()" aria-label="Matching records">
    @for (item of items(); track item.id) {
      <button
        type="button"
        [attr.aria-pressed]="selectedId() === item.id"
        (click)="selected.emit(item.id)"
      >
        @if (item.asset) {
          <img [src]="item.asset" alt="" loading="lazy" />
        }
        <span
          >{{ item.title
          }}<small>{{
            item.status === 'locked'
              ? 'Not recorded yet'
              : item.status === 'available' || item.status === 'unopened'
                ? 'New'
                : 'Available'
          }}</small></span
        >
      </button>
    } @empty {
      <p>No matching records. Try another word or choose All records.</p>
    }
  </div>
  @if (current(); as item) {
    <div class="selected-record" aria-live="polite">
      @if (currentLink(); as link) {
        @if (link.instruction) {
          <p class="instructions">{{ link.instruction }}</p>
        }
        @if (link.action; as action) {
          <button class="tool-action" type="button" (click)="useTool.emit(action)">
            {{ action.label }}
          </button>
        }
      }
      <app-investigation-evidence-detail
        [evidence]="item"
        [sourceRecord]="currentLink()?.sourceRecord"
        [referenceOnly]="currentLink()?.category === 'guide'"
        [claim]="claim()"
        [requireClaim]="true"
        (closed)="selected.emit(undefined)"
        (classificationChanged)="classify.emit({ evidenceId: item.id, classification: $event })"
        (noteSaved)="noteSaved.emit({ evidenceId: item.id, note: $event })"
        (questionCreated)="questionCreated.emit({ evidenceId: item.id, text: $event })"
        (importanceChanged)="importanceChanged.emit({ evidenceId: item.id, important: $event })"
        (finalEvidenceSelected)="useEvidence.emit(item.id)"
      />
    </div>
  }
</section>
`, styles: ["/* src/app/templates/investigation/ui/workbench-evidence.component.scss */\n:host {\n  display: block;\n  color: #e8f3f5;\n  min-width: 0;\n}\nsection {\n  background: #142330;\n  border: 1px solid #415661;\n  border-radius: 12px;\n  padding: 16px;\n}\nheader h2 {\n  font-size: 1.1rem;\n  margin: 0 0 6px;\n}\np {\n  font-size: 0.86rem;\n  line-height: 1.5;\n  color: #c6d9df;\n}\nlabel {\n  display: grid;\n  gap: 6px;\n  font-size: 0.8rem;\n}\ninput,\nselect {\n  width: 100%;\n  min-width: 0;\n  background: #0b1720;\n  border: 1px solid #637985;\n  border-radius: 6px;\n  color: #f4fafb;\n  padding: 10px;\n  font: inherit;\n  min-height: 44px;\n}\n.filters {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  margin: 12px 0;\n}\n.record-list {\n  display: grid;\n  gap: 6px;\n  max-height: 240px;\n  overflow: auto;\n  scrollbar-gutter: stable;\n}\nbutton {\n  cursor: pointer;\n  font: inherit;\n  color: inherit;\n  background: #1e3442;\n  border: 1px solid #526c78;\n  border-radius: 6px;\n  padding: 9px;\n  min-height: 44px;\n}\n.record-list button {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  font-size: 0.84rem;\n}\n.record-list img {\n  width: 42px;\n  height: 42px;\n  object-fit: cover;\n  border-radius: 4px;\n}\nsmall {\n  display: block;\n  color: #c0d6dc;\n  margin-top: 3px;\n}\nbutton[aria-pressed=true] {\n  background: #254e52;\n  border-color: #a6e3dd;\n}\n.selected-record {\n  border-top: 1px solid #4c6874;\n  margin-top: 14px;\n  padding-top: 12px;\n}\n.tool-action {\n  background: #b8e4dc;\n  color: #123638;\n  width: 100%;\n  margin-bottom: 12px;\n}\n.instructions {\n  padding: 10px;\n  background: #203b45;\n  border-left: 3px solid #b8e4dc;\n}\n:host ::ng-deep .selected-record .evidence-content > img {\n  max-height: 180px;\n  width: 100%;\n  object-fit: contain;\n}\n:host ::ng-deep .selected-record .guided-step {\n  padding: 12px 0;\n}\n:host ::ng-deep .selected-record .evidence-detail {\n  min-width: 0;\n}\n@media (max-width: 650px) {\n  .record-list {\n    max-height: 180px;\n  }\n  input,\n  select {\n    font-size: 16px;\n  }\n}\n.record-list.record-list--compact {\n  max-height: 110px;\n}\n/*# sourceMappingURL=workbench-evidence.component.css.map */\n"] }]
  }], null, { evidence: [{ type: Input, args: [{ isSignal: true, alias: "evidence", required: true }] }], links: [{ type: Input, args: [{ isSignal: true, alias: "links", required: false }] }], activityId: [{ type: Input, args: [{ isSignal: true, alias: "activityId", required: false }] }], selectedId: [{ type: Input, args: [{ isSignal: true, alias: "selectedId", required: false }] }], claim: [{ type: Input, args: [{ isSignal: true, alias: "claim", required: false }] }], selected: [{ type: Output, args: ["selected"] }], useTool: [{ type: Output, args: ["useTool"] }], useEvidence: [{ type: Output, args: ["useEvidence"] }], classify: [{ type: Output, args: ["classify"] }], noteSaved: [{ type: Output, args: ["noteSaved"] }], questionCreated: [{ type: Output, args: ["questionCreated"] }], importanceChanged: [{ type: Output, args: ["importanceChanged"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkbenchEvidenceComponent, { className: "WorkbenchEvidenceComponent", filePath: "src/app/templates/investigation/ui/workbench-evidence.component.ts", lineNumber: 16 });
})();

// src/app/features/mystery-investigation/mystery-investigation.component.ts
var _c0 = () => ["restoration", "conservation", "emergency"];
var _forTrack04 = ($index, $item) => $item.key;
var _forTrack12 = ($index, $item) => $item.vialId;
var _forTrack2 = ($index, $item) => $item.evidenceId;
var _forTrack3 = ($index, $item) => $item.id;
function MysteryInvestigationComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Current specimen: Vial ", ctx.code);
  }
}
function MysteryInvestigationComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_For_25_Template_button_click_0_listener() {
      const station_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      const equipmentMenu_r5 = \u0275\u0275reference(20);
      ctx_r3.launchStation(station_r3);
      return \u0275\u0275resetView(equipmentMenu_r5.open = false);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r3.selectionBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", station_r3.name, " ");
  }
}
function MysteryInvestigationComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14);
    \u0275\u0275text(1, "Preparing your workbench\u2026");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_47_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r7);
  }
}
function MysteryInvestigationComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 15)(1, "div")(2, "h1");
    \u0275\u0275text(3, "Investigation unavailable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Your work has not been lost.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, MysteryInvestigationComponent_Conditional_47_For_7_Template, 2, 1, "p", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.investigation.errors());
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Comparing open and sealed chambers \xB7 vials do not change this model");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Bay 3 transfer challenge \xB7 use the new tub and prior records");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Working with");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_48_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_For_7_Template_button_click_0_listener() {
      const vial_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectVial(vial_r10));
    });
    \u0275\u0275element(1, "img", 34);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vial_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r3.selectionBusy());
    \u0275\u0275attribute("aria-pressed", ctx_r3.selectedVial()?.vialId === vial_r10.vialId);
    \u0275\u0275advance();
    \u0275\u0275property("src", vial_r10.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vial ", vial_r10.code);
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_Conditional_8_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const alert_r13 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.inspectEvidence(alert_r13.evidenceId));
    });
    \u0275\u0275text(1, " Read result beside the bench ");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, MysteryInvestigationComponent_Conditional_48_Conditional_8_Conditional_3_Template, 2, 0, "button", 35);
    \u0275\u0275elementStart(4, "button", 36);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_Conditional_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.contextAlert.set(void 0));
    });
    \u0275\u0275text(5, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const alert_r13 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alert_r13.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(alert_r13.evidenceId ? 3 : -1);
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_16_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_Conditional_16_For_22_Template_button_click_0_listener() {
      const tag_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.toggleTag(tag_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r16 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r3.selectedTags().includes(tag_r16));
    \u0275\u0275attribute("aria-pressed", ctx_r3.selectedTags().includes(tag_r16));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tag_r16, " ");
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "section", 37)(2, "header")(3, "span");
    \u0275\u0275element(4, "i");
    \u0275\u0275text(5, " Optical channel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9, "6\xD7 magnification \xB7 equal lighting");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "figure");
    \u0275\u0275element(11, "img", 38)(12, "span", 39)(13, "span", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "section", 41)(15, "h2");
    \u0275\u0275text(16, "What do you notice?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "details", 42)(18, "summary");
    \u0275\u0275text(19, "Mark a feature");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 43);
    \u0275\u0275repeaterCreate(21, MysteryInvestigationComponent_Conditional_48_Conditional_16_For_22_Template, 2, 4, "button", 44, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label");
    \u0275\u0275text(24, "My observation");
    \u0275\u0275elementStart(25, "textarea", 45);
    \u0275\u0275listener("ngModelChange", function MysteryInvestigationComponent_Conditional_48_Conditional_16_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.observation.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 46);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_Conditional_16_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureScan());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vial_r17 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Vial ", vial_r17.code);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("--%NS%vial-color", vial_r17.color);
    \u0275\u0275advance();
    \u0275\u0275property("src", vial_r17.image, \u0275\u0275sanitizeUrl)("alt", "Magnified optical scan of Vial " + vial_r17.code);
    \u0275\u0275advance();
    \u0275\u0275classProp("running", ctx_r3.scanState() === "scanning");
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r3.observationTags);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.observation());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.scanState() === "scanning" || !ctx_r3.observation().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.scanState() === "scanning" ? "Capturing result\u2026" : "Record this observation", " ");
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "app-properties-lab", 47);
    \u0275\u0275listener("vialChanged", function MysteryInvestigationComponent_Conditional_48_Conditional_17_Template_app_properties_lab_vialChanged_1_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onVialChanged($event));
    })("captured", function MysteryInvestigationComponent_Conditional_48_Conditional_17_Template_app_properties_lab_captured_1_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureStationResult($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "properties");
    \u0275\u0275advance();
    \u0275\u0275property("embedded", true)("selectedVialId", ctx_r3.selectedVial()?.vialId)("savedResults", ctx_r3.propertyResults());
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "app-reaction-bench", 48);
    \u0275\u0275listener("vialChanged", function MysteryInvestigationComponent_Conditional_48_Conditional_18_Template_app_reaction_bench_vialChanged_1_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onVialChanged($event));
    })("captured", function MysteryInvestigationComponent_Conditional_48_Conditional_18_Template_app_reaction_bench_captured_1_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureStationResult($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "reaction");
    \u0275\u0275advance();
    \u0275\u0275property("selectedVialId", ctx_r3.selectedVial()?.vialId)("active", ctx_r3.activeStationKey() === "reaction" && ctx_r3.workspacePair() !== "final-investigation");
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "app-conservation-chamber", 49);
    \u0275\u0275listener("captured", function MysteryInvestigationComponent_Conditional_48_Conditional_19_Template_app_conservation_chamber_captured_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureStationResult($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "conservation");
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "app-restoration-workspace", 50);
    \u0275\u0275listener("vialChanged", function MysteryInvestigationComponent_Conditional_48_Conditional_20_Template_app_restoration_workspace_vialChanged_1_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onVialChanged($event));
    })("captured", function MysteryInvestigationComponent_Conditional_48_Conditional_20_Template_app_restoration_workspace_captured_1_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureStationResult($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "restoration");
    \u0275\u0275advance();
    \u0275\u0275property("selectedVialId", ctx_r3.selectedVial()?.vialId);
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "app-emergency-response", 49);
    \u0275\u0275listener("captured", function MysteryInvestigationComponent_Conditional_48_Conditional_21_Template_app_emergency_response_captured_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.captureStationResult($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "emergency");
  }
}
function MysteryInvestigationComponent_Conditional_48_For_28_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(column_r23);
  }
}
function MysteryInvestigationComponent_Conditional_48_For_28_For_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "button", 16);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_48_For_28_For_12_For_4_Template_button_click_1_listener() {
      const ctx_r24 = \u0275\u0275restoreView(_r24);
      const cell_r26 = ctx_r24.$implicit;
      const $index_r27 = ctx_r24.$index;
      const row_r28 = \u0275\u0275nextContext().$implicit;
      const record_r29 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.chooseResult(record_r29.evidenceId, row_r28.id, $index_r27, !!cell_r26));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cell_r26 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.selectionBusy() && !cell_r26);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r26 || "Not tested \xB7 choose tool", " ");
  }
}
function MysteryInvestigationComponent_Conditional_48_For_28_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, MysteryInvestigationComponent_Conditional_48_For_28_For_12_For_4_Template, 3, 2, "td", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r28 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r28.label);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r28.cells);
  }
}
function MysteryInvestigationComponent_Conditional_48_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 51)(3, "table")(4, "thead")(5, "tr")(6, "th", 52);
    \u0275\u0275text(7, "Test");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, MysteryInvestigationComponent_Conditional_48_For_28_For_9_Template, 2, 1, "th", 52, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, MysteryInvestigationComponent_Conditional_48_For_28_For_12_Template, 5, 1, "tr", null, _forTrack3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r29 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(record_r29.matrix.title);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(record_r29.matrix.columnLabels);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(record_r29.matrix.rows);
  }
}
function MysteryInvestigationComponent_Conditional_48_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-investigation-final-case", 54);
    \u0275\u0275listener("caseBoardRequested", function MysteryInvestigationComponent_Conditional_48_Conditional_37_Template_app_investigation_final_case_caseBoardRequested_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectWorkspace("analysis-theory"));
    })("draftSaved", function MysteryInvestigationComponent_Conditional_48_Conditional_37_Template_app_investigation_final_case_draftSaved_0_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveFinalDraft($event));
    })("submitRequested", function MysteryInvestigationComponent_Conditional_48_Conditional_37_Template_app_investigation_final_case_submitRequested_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.submitFinalInvestigation());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const runtime_r31 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("runtime", runtime_r31)("evidence", ctx_r3.evidence())("ready", ctx_r3.finalReady())("missingReadiness", ctx_r3.finalReadinessMissing())("saveState", ctx_r3.investigation.saveState());
  }
}
function MysteryInvestigationComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "section", 18);
    \u0275\u0275conditionalCreate(2, MysteryInvestigationComponent_Conditional_48_Conditional_2_Template, 2, 0, "strong")(3, MysteryInvestigationComponent_Conditional_48_Conditional_3_Template, 2, 0, "strong")(4, MysteryInvestigationComponent_Conditional_48_Conditional_4_Template, 2, 0, "strong");
    \u0275\u0275elementStart(5, "div", 19);
    \u0275\u0275repeaterCreate(6, MysteryInvestigationComponent_Conditional_48_For_7_Template, 4, 4, "button", 11, _forTrack12);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, MysteryInvestigationComponent_Conditional_48_Conditional_8_Template, 6, 2, "div", 20);
    \u0275\u0275elementStart(9, "main", 21)(10, "div", 22)(11, "div", 23)(12, "div", 17)(13, "section", 24);
    \u0275\u0275element(14, "img", 25)(15, "div", 26);
    \u0275\u0275conditionalCreate(16, MysteryInvestigationComponent_Conditional_48_Conditional_16_Template, 28, 10, "div", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, MysteryInvestigationComponent_Conditional_48_Conditional_17_Template, 2, 4, "div", 17);
    \u0275\u0275conditionalCreate(18, MysteryInvestigationComponent_Conditional_48_Conditional_18_Template, 2, 3, "div", 17);
    \u0275\u0275conditionalCreate(19, MysteryInvestigationComponent_Conditional_48_Conditional_19_Template, 2, 1, "div", 17);
    \u0275\u0275conditionalCreate(20, MysteryInvestigationComponent_Conditional_48_Conditional_20_Template, 2, 2, "div", 17);
    \u0275\u0275conditionalCreate(21, MysteryInvestigationComponent_Conditional_48_Conditional_21_Template, 2, 1, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "section", 28)(23, "h2");
    \u0275\u0275text(24, "Compare my results");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p");
    \u0275\u0275text(26, " Only recorded results appear here. Choose an untested cell to bring its tool to the bench, or a recorded cell to read the evidence. Earlier trials stay in your investigation record. ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(27, MysteryInvestigationComponent_Conditional_48_For_28_Template, 13, 1, null, null, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "section", 29)(30, "h2");
    \u0275\u0275text(31, "My explanation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, " Use a result from the evidence panel to link it here. Your measurements and earlier explanations stay in your record. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "app-investigation-working-theory", 30);
    \u0275\u0275listener("theorySaved", function MysteryInvestigationComponent_Conditional_48_Template_app_investigation_working_theory_theorySaved_34_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveTheory($event));
    })("theorySelected", function MysteryInvestigationComponent_Conditional_48_Template_app_investigation_working_theory_theorySelected_34_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.investigation.selectTheory($event));
    })("evidenceSelected", function MysteryInvestigationComponent_Conditional_48_Template_app_investigation_working_theory_evidenceSelected_34_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.inspectEvidence($event));
    })("investigateRequested", function MysteryInvestigationComponent_Conditional_48_Template_app_investigation_working_theory_investigateRequested_34_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openBench());
    })("finalRequested", function MysteryInvestigationComponent_Conditional_48_Template_app_investigation_working_theory_finalRequested_34_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openFinalInvestigation());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "aside", 31)(36, "app-workbench-evidence", 32);
    \u0275\u0275listener("selected", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_selected_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.inspectEvidence($event));
    })("useTool", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_useTool_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.useTool($event));
    })("useEvidence", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_useEvidence_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.useInExplanation($event));
    })("classify", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_classify_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.classifyEvidence($event));
    })("noteSaved", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_noteSaved_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveEvidenceNote($event));
    })("questionCreated", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_questionCreated_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.createEvidenceQuestion($event));
    })("importanceChanged", function MysteryInvestigationComponent_Conditional_48_Template_app_workbench_evidence_importanceChanged_36_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setEvidenceImportance($event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(37, MysteryInvestigationComponent_Conditional_48_Conditional_37_Template, 1, 5, "app-investigation-final-case", 33);
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_13_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("hidden", ctx_r3.workspacePair() === "final-investigation");
    \u0275\u0275advance();
    \u0275\u0275property("hidden", \u0275\u0275pureFunction0(29, _c0).includes(ctx_r3.activeStationKey() ?? "") || ctx_r3.explanationOpen() || ctx_r3.comparisonOpen());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.activeStationKey() === "conservation" ? 2 : ctx_r3.activeStationKey() === "emergency" ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() === "conservation" || ctx_r3.activeStationKey() === "emergency");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.vials);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_9_0 = ctx_r3.contextAlert()) ? 8 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275classProp("evidence-open", ctx_r3.evidenceDockOpen());
    \u0275\u0275advance(2);
    \u0275\u0275property("hidden", ctx_r3.comparisonOpen() || ctx_r3.explanationOpen());
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.activeStationKey() !== "scanner");
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_13_0 = ctx_r3.selectedVial()) ? 16 : -1, tmp_13_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.visitedStations().includes("properties") ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.visitedStations().includes("reaction") ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.visitedStations().includes("conservation") ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.visitedStations().includes("restoration") ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.visitedStations().includes("emergency") ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", !ctx_r3.comparisonOpen());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.comparisonMatrices());
    \u0275\u0275advance(2);
    \u0275\u0275property("hidden", !ctx_r3.explanationOpen());
    \u0275\u0275advance(5);
    \u0275\u0275property("singlePage", false)("theory", ctx_r3.currentTheory())("theories", ctx.hypotheses)("evidence", ctx_r3.evidence())("saveState", ctx_r3.investigation.saveState());
    \u0275\u0275advance();
    \u0275\u0275property("hidden", !ctx_r3.evidenceDockOpen());
    \u0275\u0275advance();
    \u0275\u0275property("evidence", ctx_r3.evidence())("links", ctx_r3.workbenchLinks)("activityId", ctx_r3.activeActivityId())("selectedId", ctx_r3.selectedEvidenceId())("claim", ctx_r3.currentTheory()?.statement);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.workspacePair() === "final-investigation" ? 37 : -1);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_7_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_7_For_30_Template_button_click_1_listener() {
      const phase_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.drawer.set(void 0);
      return \u0275\u0275resetView(ctx_r3.selectPhase(phase_r35));
    });
    \u0275\u0275elementStart(2, "span", 66);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const phase_r35 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("current", phase_r35.status === "current")("complete", phase_r35.status === "complete")("locked", phase_r35.status === "locked");
    \u0275\u0275attribute("aria-label", phase_r35.title + ", " + phase_r35.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r35.status === "complete" ? "\u2713" : phase_r35.status === "locked" ? "\u{1F512}" : phase_r35.number);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(phase_r35.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r35.instruction);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 63);
    \u0275\u0275text(2, "The Unlabeled Shelf");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Restore the lab shelf with evidence.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl")(6, "div")(7, "dt");
    \u0275\u0275text(8, "Your role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd");
    \u0275\u0275text(10, "Student laboratory investigation team");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "dt");
    \u0275\u0275text(13, "Situation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd");
    \u0275\u0275text(15, "Four sealed substances remain after their labels were separated.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "dt");
    \u0275\u0275text(18, "Stakes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd");
    \u0275\u0275text(20, " The shelf cannot return to use until each identification and position can be defended. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "dt");
    \u0275\u0275text(23, "Final mission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "dd");
    \u0275\u0275text(25, " Build a case file that identifies all four vials and recommends safe shelf positions. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "h3", 64);
    \u0275\u0275text(27, "Investigation phases");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "ol", 65);
    \u0275\u0275repeaterCreate(29, MysteryInvestigationComponent_Conditional_49_Conditional_7_For_30_Template, 9, 10, "li", null, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_7_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.drawer.set(void 0));
    });
    \u0275\u0275text(32, "Back to the lab");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(29);
    \u0275\u0275repeater(ctx_r3.phases());
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span", 66);
    \u0275\u0275text(2, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const question_r37 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(question_r37.text);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "p");
    \u0275\u0275text(2, " Keep questions here while you work. Use the evidence beside your bench to decide what to test next. ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, MysteryInvestigationComponent_Conditional_49_Conditional_8_For_4_Template, 5, 1, "article", null, _forTrack3);
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Add a question");
    \u0275\u0275elementStart(7, "textarea", 67);
    \u0275\u0275listener("ngModelChange", function MysteryInvestigationComponent_Conditional_49_Conditional_8_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.notebookQuestion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.addNotebookQuestion());
    });
    \u0275\u0275text(9, "Save question");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.questions());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.notebookQuestion());
    \u0275\u0275control();
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68)(1, "span");
    \u0275\u0275text(2, "You are here");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const next_r39 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", next_r39.number, " \xB7 ", next_r39.title);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68)(1, "span");
    \u0275\u0275text(2, "All stations complete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "Build the final case");
    \u0275\u0275elementEnd()();
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 75)(11, "span");
    \u0275\u0275text(12, "Files when");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const step_r40 = ctx.$implicit;
    \u0275\u0275attribute("data-status", step_r40.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r40.status === "complete" ? "\u2713" : step_r40.number);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r40.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r40.where);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r40.todo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", step_r40.completes, " ");
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 70);
    \u0275\u0275text(1, "Everything is in place. The final investigation is open.");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r41);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 71);
    \u0275\u0275repeaterCreate(1, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_11_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.finalReadinessMissing());
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 72)(1, "strong");
    \u0275\u0275text(2, "Testing override is on.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " The final investigation is open even though the list above is unfinished. Turn ");
    \u0275\u0275elementStart(4, "code");
    \u0275\u0275text(5, "finalUnlockedForTesting");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " back to ");
    \u0275\u0275elementStart(7, "code");
    \u0275\u0275text(8, "false");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " before a class uses this. ");
    \u0275\u0275elementEnd();
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "h2");
    \u0275\u0275text(2, "Every stop, in order, and what closes it.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_3_Template, 5, 2, "p", 68)(4, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_4_Template, 5, 0, "p", 68);
    \u0275\u0275elementStart(5, "ol", 69);
    \u0275\u0275repeaterCreate(6, MysteryInvestigationComponent_Conditional_49_Conditional_9_For_7_Template, 14, 6, "li", null, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h3", 64);
    \u0275\u0275text(9, "The final case also needs");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_10_Template, 2, 0, "p", 70)(11, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_11_Template, 3, 0, "ul", 71);
    \u0275\u0275conditionalCreate(12, MysteryInvestigationComponent_Conditional_49_Conditional_9_Conditional_12_Template, 10, 0, "p", 72);
    \u0275\u0275elementStart(13, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.drawer.set(void 0));
    });
    \u0275\u0275text(14, "Back to the lab");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_5_0 = ctx_r3.nextRouteStep()) ? 3 : 4, tmp_5_0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.labRoute());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r3.finalReadinessMissing().length === 0 ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.testingOverrideActive() ? 12 : -1);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "span", 66);
    \u0275\u0275text(2, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Use the connection between the panels.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.drawer.set(void 0));
    });
    \u0275\u0275text(8, "Keep investigating");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.workspaceHelp());
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_11_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r44 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r44);
  }
}
function MysteryInvestigationComponent_Conditional_49_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 66);
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Final investigation is not ready yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Complete these reasoning steps before the official final case opens:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul");
    \u0275\u0275repeaterCreate(8, MysteryInvestigationComponent_Conditional_49_Conditional_11_For_9_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 7);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Conditional_11_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.drawer.set(void 0);
      return \u0275\u0275resetView(ctx_r3.selectWorkspace(ctx_r3.currentTheory() ? "theory-investigate" : "analysis-theory"));
    });
    \u0275\u0275text(11, " Return to investigation ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r3.finalReadinessMissing());
  }
}
function MysteryInvestigationComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.drawer.set(void 0));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "aside", 56)(2, "header")(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 57);
    \u0275\u0275listener("click", function MysteryInvestigationComponent_Conditional_49_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.drawer.set(void 0));
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, MysteryInvestigationComponent_Conditional_49_Conditional_7_Template, 33, 0, "div", 58)(8, MysteryInvestigationComponent_Conditional_49_Conditional_8_Template, 10, 1, "div", 59)(9, MysteryInvestigationComponent_Conditional_49_Conditional_9_Template, 15, 3, "div", 60)(10, MysteryInvestigationComponent_Conditional_49_Conditional_10_Template, 9, 1, "div", 61)(11, MysteryInvestigationComponent_Conditional_49_Conditional_11_Template, 12, 0, "div", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const openDrawer_r45 = ctx;
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", openDrawer_r45 === "mission" ? "Mission brief" : openDrawer_r45 === "notebook" ? "Notebook" : openDrawer_r45 === "help" ? "Help" : openDrawer_r45 === "route" ? "Route through the lab" : "Locked phase requirements");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(openDrawer_r45 === "mission" ? "Mission brief" : openDrawer_r45 === "notebook" ? "Investigation notebook" : openDrawer_r45 === "help" ? "Workspace help" : openDrawer_r45 === "route" ? "Route through the lab" : "Final readiness");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(openDrawer_r45 === "mission" ? 7 : openDrawer_r45 === "notebook" ? 8 : openDrawer_r45 === "route" ? 9 : openDrawer_r45 === "help" ? 10 : 11);
  }
}
var finalUnlockedForTesting = false;
var routeGuide = {
  "phase-inventory": {
    where: "Specimen Scanner",
    todo: "Open each of the four sealed vials in turn and describe what the optical channel shows.",
    completes: "All four scans captured. Each needs the observation box filled in \u2014 tags alone will not file it."
  },
  "phase-evidence": {
    where: "Evidence Locker",
    todo: "Read the inventory, scene, prior test log, recovered labels and witness note beside your bench.",
    completes: "Review all five case clues. Tool guides are available whenever you need them."
  },
  "phase-properties": {
    where: "Properties Lab",
    todo: "Run the magnifier, water, probe and scanner trials across all four vials under equal conditions.",
    completes: "One captured trial files the activity \u2014 but the 4 \xD7 4 matrix only fills in as you run more."
  },
  "phase-reactions": {
    where: "Reaction Bench",
    todo: "Drag a vial onto the bench, measure and weigh, then run Solution A and Indicator B in a sealed vessel.",
    completes: "A finished screening with your own observation typed in."
  },
  "phase-conservation": {
    where: "Matter Tracker",
    todo: "Run the sealed chamber and the open chamber, and watch the particle count against the balance.",
    completes: "A settled run plus a written observation of what happened to the particles and the mass."
  },
  "phase-restore": {
    where: "Shelf Restoration",
    todo: "Give every vial a label, a shelf position, a handling plan and the reasoning behind it.",
    completes: "A captured case draft. Each label may only be used once across the four vials."
  },
  "phase-emergency": {
    where: "Bay 3 Response",
    todo: "Spend the 25-minute clock on the tests that can separate the two candidates, then file your call.",
    completes: "A call filed with the marshal and the incident record captured."
  },
  "phase-showcase": {
    where: "Final case",
    todo: "Build the claim, the evidence trail, the reasoning and the shelf plan.",
    completes: "Submitting the final investigation for teacher review."
  }
};
var stationCatalogue = [
  {
    key: "scanner",
    activityId: "activity-scan-vial-a",
    name: "Specimen Scanner",
    instrument: "6x optical channel",
    purpose: "Look at each sealed vial and record what you can actually see."
  },
  {
    key: "properties",
    activityId: "activity-property-comparison",
    name: "Properties Lab",
    instrument: "Magnifier / water / probe / scanner",
    purpose: "Test all four vials under equal conditions and fill the property grid."
  },
  {
    key: "reaction",
    activityId: "activity-reaction-comparison",
    name: "Reaction Bench",
    instrument: "Solution A / Indicator B",
    purpose: "Run two vials side by side in sealed vessels and compare the change."
  },
  {
    key: "conservation",
    activityId: "activity-conservation-model",
    name: "Matter Tracker",
    instrument: "Balance and particle counter",
    purpose: "Weigh a sealed and an open chamber to find where the mass went."
  },
  {
    key: "restoration",
    activityId: "activity-shelf-restoration",
    name: "Shelf Restoration",
    instrument: "Label clips and shelf zones",
    purpose: "Commit a label, a position, and a handling plan for every vial."
  },
  {
    key: "emergency",
    activityId: "activity-emergency-response",
    name: "Bay 3 Response",
    instrument: "Incident clock and marshal radio",
    purpose: "Identify an unlabeled shipment against the clock before a crew enters a spill."
  }
];
var scanActivityIds = [
  "activity-scan-vial-a",
  "activity-scan-vial-b",
  "activity-scan-vial-c",
  "activity-scan-vial-d"
];
var requiredFinalActivityIds = [
  "activity-scan-vial-a",
  "activity-scan-vial-b",
  "activity-scan-vial-c",
  "activity-scan-vial-d",
  "activity-evidence-locker",
  "activity-property-comparison",
  "activity-reaction-comparison",
  "activity-conservation-model",
  "activity-shelf-restoration",
  "activity-emergency-response"
];
var MysteryInvestigationComponent = class _MysteryInvestigationComponent {
  lessonFocus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  appliedFocus;
  investigation = inject(MysteryInvestigationService);
  observationTags = mysteryObservationTags;
  vials = mysteryVials;
  evidenceDockOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "evidenceDockOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspacePair = signal(
    "bench",
    ...ngDevMode ? [{ debugName: "workspacePair" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePhaseId = signal(
    mysteryInvestigationPhases[0].id,
    ...ngDevMode ? [{ debugName: "activePhaseId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidenceId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedEvidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeActivityId = signal(
    "activity-scan-vial-a",
    ...ngDevMode ? [{ debugName: "activeActivityId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drawer = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "drawer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lockedPhaseId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "lockedPhaseId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mobilePanel = signal(
    "left",
    ...ngDevMode ? [{ debugName: "mobilePanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contextAlert = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "contextAlert" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notebookQuestion = signal(
    "",
    ...ngDevMode ? [{ debugName: "notebookQuestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedVial = signal(
    mysteryVials[0],
    ...ngDevMode ? [{ debugName: "selectedVial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workbenchLinks = mysteryWorkbenchLinks;
  visitedStations = signal(
    ["scanner"],
    ...ngDevMode ? [{ debugName: "visitedStations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  comparisonOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "comparisonOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  explanationOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "explanationOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  propertiesLab = viewChild(
    PropertiesLabComponent,
    ...ngDevMode ? [{ debugName: "propertiesLab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reactionLab = viewChild(
    ReactionBenchComponent,
    ...ngDevMode ? [{ debugName: "reactionLab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theoryEditor = viewChild(
    InvestigationWorkingTheoryComponent,
    ...ngDevMode ? [{ debugName: "theoryEditor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceDock = viewChild(
    WorkbenchEvidenceComponent,
    ...ngDevMode ? [{ debugName: "evidenceDock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  injector = inject(Injector);
  scanDrafts = /* @__PURE__ */ new Map();
  activeStationKey = computed(
    () => {
      const id = this.activeActivityId();
      return id?.startsWith("activity-scan-") ? "scanner" : stationCatalogue.find((s) => s.activityId === id)?.key;
    },
    ...ngDevMode ? [{ debugName: "activeStationKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectionBusy = computed(
    () => this.propertiesLab()?.running() || this.reactionLab()?.busy() || this.scanState() === "scanning",
    ...ngDevMode ? [{ debugName: "selectionBusy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  propertyResults = computed(
    () => this.investigation.snapshot()?.activities["activity-property-comparison"]?.resultHistory ?? [],
    ...ngDevMode ? [{ debugName: "propertyResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  comparisonMatrices = computed(
    () => this.evidence().filter((item) => item.resultMatrix).map((item) => ({ evidenceId: item.id, matrix: item.resultMatrix })),
    ...ngDevMode ? [{ debugName: "comparisonMatrices" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observation = signal(
    "",
    ...ngDevMode ? [{ debugName: "observation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTags = signal(
    [],
    ...ngDevMode ? [{ debugName: "selectedTags" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scanState = signal(
    "ready",
    ...ngDevMode ? [{ debugName: "scanState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = computed(
    () => {
      const runtime = this.investigation.snapshot();
      if (runtime === void 0) {
        return [];
      }
      const configured = mysteryEvidenceCatalog.map((definition) => {
        const state = runtime.evidence[definition.id];
        if (state === void 0 || state.status === "hidden") {
          return void 0;
        }
        return {
          id: definition.id,
          title: definition.title,
          type: readableType(definition.type),
          summary: definition.summary,
          source: definition.source,
          asset: "asset" in definition ? definition.asset : void 0,
          file: "file" in definition ? definition.file : void 0,
          status: state.status,
          classification: asClassification(state.classification),
          notes: state.notes ?? [],
          important: state.important ?? false,
          studentCreated: false,
          resultMatrix: evidenceResultMatrix(definition.id, runtime.activities)
        };
      }).filter((item) => item !== void 0);
      const studentCreated = Object.values(runtime.studentEvidence).map((record) => ({
        id: record.id,
        title: record.title,
        type: readableType(record.evidenceType),
        summary: studentEvidenceText(record.content),
        source: "Created by you \xB7 Investigation workspace",
        status: record.usedInFinalClaim ? "usedInClaim" : "studentCreated",
        classification: asClassification(record.classification),
        notes: record.notes ?? [],
        important: record.important ?? false,
        studentCreated: true
      }));
      return [...configured, ...studentCreated];
    },
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  capturedCount = computed(
    () => this.evidence().filter((item) => item.status !== "locked" && item.status !== "available" && item.status !== "unopened").length,
    ...ngDevMode ? [{ debugName: "capturedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentTheory = computed(
    () => {
      const theories = this.investigation.snapshot()?.hypotheses ?? [];
      return theories.find((theory) => theory.selected) ?? theories.at(-1);
    },
    ...ngDevMode ? [{ debugName: "currentTheory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  questions = computed(
    () => (this.investigation.snapshot()?.board.questions ?? []).map((question) => ({
      id: question.id,
      text: question.text,
      sourceEvidenceId: question.sourceEvidenceId,
      status: question.status ?? "open"
    })),
    ...ngDevMode ? [{ debugName: "questions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activityViews = computed(
    () => {
      const activities = this.investigation.snapshot()?.activities ?? {};
      return mysteryInvestigationActivities.map((activity) => __spreadProps(__spreadValues({}, activity), {
        runtime: activities[activity.id],
        locked: false
      }));
    },
    ...ngDevMode ? [{ debugName: "activityViews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The lab stations shown on the bench rail and the bench landing view. */
  labStations = computed(
    () => {
      const activities = this.investigation.snapshot()?.activities ?? {};
      return stationCatalogue.map((station) => {
        const isScanner = station.activityId === scanActivityIds[0];
        const memberIds = isScanner ? scanActivityIds : [station.activityId];
        const done = memberIds.filter((id) => activities[id]?.status === "complete").length;
        const trials = memberIds.reduce((total, id) => total + (activities[id]?.resultHistory?.length ?? 0), 0);
        const nextId = isScanner ? scanActivityIds.find((id) => activities[id]?.status !== "complete") ?? scanActivityIds[0] : station.activityId;
        return {
          id: nextId,
          name: station.name,
          instrument: station.instrument,
          purpose: station.purpose,
          key: station.key,
          trials,
          done,
          total: memberIds.length,
          complete: done === memberIds.length
        };
      });
    },
    ...ngDevMode ? [{ debugName: "labStations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Evidence the student can actually open, newest-looking first. */
  benchEvidence = computed(
    () => this.evidence().filter((item) => item.status !== "locked"),
    ...ngDevMode ? [{ debugName: "benchEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  newEvidenceCount = computed(
    () => this.evidence().filter((item) => item.status === "available" || item.status === "unopened").length,
    ...ngDevMode ? [{ debugName: "newEvidenceCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phasesComplete = computed(
    () => this.phases().filter((phase) => phase.status === "complete").length,
    ...ngDevMode ? [{ debugName: "phasesComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalReadinessMissing = computed(
    () => {
      const runtime = this.investigation.snapshot();
      if (runtime === void 0) {
        return ["Load the investigation record"];
      }
      const missing = [];
      if (this.capturedCount() < 4) {
        missing.push(`Collect ${4 - this.capturedCount()} more evidence record(s)`);
      }
      if (this.currentTheory() === void 0) {
        missing.push("Create a working theory");
      }
      const incompleteActivities = requiredFinalActivityIds.filter((id) => runtime.activities[id]?.status !== "complete");
      if (incompleteActivities.length > 0) {
        missing.push(`Complete ${incompleteActivities.length} required investigation(s)`);
      }
      return missing;
    },
    ...ngDevMode ? [{ debugName: "finalReadinessMissing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalReady = computed(
    () => finalUnlockedForTesting || this.finalReadinessMissing().length === 0,
    ...ngDevMode ? [{ debugName: "finalReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** True while the final case is open only because the override is on. */
  finalUnlockedForTesting = finalUnlockedForTesting;
  testingOverrideActive = computed(
    () => finalUnlockedForTesting && this.finalReadinessMissing().length > 0,
    ...ngDevMode ? [{ debugName: "testingOverrideActive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The path through the lab, in order, with live status. Built from the same
   * phase and activity state the rest of the shell reads, so it can never drift
   * from what the workspace actually requires.
   */
  labRoute = computed(
    () => this.phases().map((phase) => {
      const guide = routeGuide[phase.id];
      return {
        id: phase.id,
        number: phase.number,
        title: phase.title,
        where: guide?.where ?? "Lab bench",
        todo: guide?.todo ?? phase.instruction,
        completes: guide?.completes ?? "Capture a result from this station.",
        status: phase.status === "complete" ? "complete" : phase.id === this.activePhaseId() ? "current" : "todo"
      };
    }),
    ...ngDevMode ? [{ debugName: "labRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The first thing still standing between the student and the final case. */
  nextRouteStep = computed(
    () => this.labRoute().find((step) => step.status !== "complete"),
    ...ngDevMode ? [{ debugName: "nextRouteStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phases = computed(
    () => {
      const activities = this.investigation.snapshot()?.activities ?? {};
      return mysteryInvestigationPhases.map((phase) => {
        const complete = phase.activityIds.every((id) => activities[id]?.status === "complete");
        const finalLocked = phase.id === "phase-showcase" && !this.finalReady();
        return __spreadProps(__spreadValues({}, phase), {
          status: complete ? "complete" : phase.id === this.activePhaseId() ? "current" : finalLocked ? "locked" : "available"
        });
      });
    },
    ...ngDevMode ? [{ debugName: "phases" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentPhase = computed(
    () => this.phases().find((phase) => phase.id === this.activePhaseId()) ?? this.phases()[0],
    ...ngDevMode ? [{ debugName: "currentPhase" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeActivity = computed(
    () => this.activityViews().find((activity) => activity.id === this.activeActivityId()),
    ...ngDevMode ? [{ debugName: "activeActivity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentQuestion = computed(
    () => this.currentTheory()?.remainingQuestion ?? this.questions().filter((question) => question.status === "open").at(-1)?.text ?? "",
    ...ngDevMode ? [{ debugName: "currentQuestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextAction = computed(
    () => {
      if (this.finalReady()) {
        return "Build your final evidence-based case";
      }
      const guidance = {
        scanner: "Describe the visible features of each sealed vial. Record each observation before comparing tests.",
        properties: "Choose a test, run it under equal conditions, then record what you see. Compare the same test across Vials A\u2013D.",
        reaction: "Follow the highlighted step on the rig. Measure, weigh, react, and add the indicator; then record both changes.",
        conservation: "Compare the open and sealed chambers. Record what happens to the particles and the measured mass.",
        restoration: "Use your measurements and the recovered records to choose each vial\u2019s label and shelf position.",
        emergency: "Use what you learned on a new case. Choose tests for the Bay 3 tub, then explain the call you can defend."
      };
      const current = this.activeStationKey();
      if (current && guidance[current])
        return guidance[current];
      const next = this.nextRouteStep();
      if (next && next.id !== "phase-showcase")
        return `${next.where}: ${next.todo}`;
      if (this.currentTheory() === void 0) {
        return "Use your analyzed evidence to create a working theory";
      }
      return "Choose an investigation that can address your remaining uncertainty";
    },
    ...ngDevMode ? [{ debugName: "nextAction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspaceHelp = computed(
    () => {
      switch (this.workspacePair()) {
        case "bench":
          return "Choose a vial and tool above. Read clues and full reference records beside the experiment. Record your observations, compare results below, and build your explanation in the same workspace.";
        case "evidence-analysis":
          return "Open a piece of evidence, record what you notice, then decide whether it supports, challenges, or leaves your explanation uncertain.";
        case "analysis-theory":
          return "Use evidence from every zone. Strong theories explain support and address evidence that does not fit.";
        case "theory-investigate":
          return "Choose a test that can answer an important question, then use the new evidence to strengthen or revise your working theory.";
        case "final-investigation":
          return "Build the final case from evidence and theory already in your Investigation Record.";
      }
    },
    ...ngDevMode ? [{ debugName: "workspaceHelp" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const target = this.lessonFocus?.()?.focusTarget;
      if (!target || this.investigation.loading() || this.selectionBusy())
        return;
      if (target === this.appliedFocus)
        return;
      this.appliedFocus = target;
      untracked(() => {
        this.openBench();
        this.evidenceDockOpen.set(false);
        if (target === "theory")
          this.selectWorkspace("analysis-theory");
        else if (target === "final")
          void this.openFinalInvestigation();
        else {
          const station = stationCatalogue.find((item) => item.key === target);
          if (station)
            void this.launchActivity(station.activityId);
        }
      });
    });
    persistWorkspaceDraft("investigation-workbench", () => ({
      activityId: this.activeActivityId(),
      vialId: this.selectedVial()?.vialId,
      observation: this.observation(),
      tags: this.selectedTags(),
      drafts: [...this.scanDrafts.entries()],
      selectedEvidenceId: this.selectedEvidenceId(),
      comparisonOpen: this.comparisonOpen(),
      explanationOpen: this.explanationOpen(),
      notebookQuestion: this.notebookQuestion()
    }), (saved) => {
      const vial = this.vials.find((v) => v.vialId === saved.vialId);
      if (typeof saved.selectedEvidenceId === "string")
        this.selectedEvidenceId.set(saved.selectedEvidenceId);
      this.comparisonOpen.set(saved.comparisonOpen === true);
      this.explanationOpen.set(saved.explanationOpen === true);
      if (typeof saved.notebookQuestion === "string")
        this.notebookQuestion.set(saved.notebookQuestion);
      if (vial)
        this.selectedVial.set(vial);
      if (mysteryInvestigationActivities.some((a) => a.id === saved.activityId))
        this.activeActivityId.set(saved.activityId);
      if (typeof saved.observation === "string")
        this.observation.set(saved.observation);
      if (Array.isArray(saved.tags))
        this.selectedTags.set(saved.tags.filter((t) => this.observationTags.some((tag) => tag === t)));
      if (Array.isArray(saved.drafts))
        for (const [id, draft] of saved.drafts)
          this.scanDrafts.set(id, draft);
    });
    effect(() => {
      const key = this.activeStationKey();
      if (key)
        this.visitedStations.update((items) => items.includes(key) ? items : [...items, key]);
    });
    void this.investigation.initialize();
  }
  openBench() {
    this.comparisonOpen.set(false);
    this.explanationOpen.set(false);
    this.workspacePair.set("bench");
    this.drawer.set(void 0);
  }
  async launchStation(station) {
    this.openBench();
    await this.launchActivity(station.id);
    this.reveal("#active-experiment");
  }
  selectWorkspace(pair) {
    if (pair === "final-investigation") {
      void this.openFinalInvestigation();
      return;
    }
    this.workspacePair.set("bench");
    if (pair === "analysis-theory") {
      this.comparisonOpen.set(false);
      this.explanationOpen.set(true);
      this.reveal("#explanation");
    }
    if (pair === "evidence-analysis") {
      this.evidenceDockOpen.set(true);
      this.evidenceDock()?.scope.set("all");
      this.reveal("#evidence-dock");
    }
    this.drawer.set(void 0);
    this.mobilePanel.set("left");
  }
  selectPhase(phase) {
    if (phase.status === "locked") {
      this.lockedPhaseId.set(phase.id);
      this.drawer.set("lockedPhase");
      return;
    }
    this.activePhaseId.set(phase.id);
    this.contextAlert.set(void 0);
    if (phase.id === "phase-showcase") {
      void this.openFinalInvestigation();
    }
  }
  async inspectEvidence(evidenceId) {
    this.selectedEvidenceId.set(evidenceId);
    if (evidenceId)
      this.evidenceDockOpen.set(true);
    if (evidenceId === void 0) {
      return;
    }
    const item = this.evidence().find((evidence) => evidence.id === evidenceId);
    if (item !== void 0 && item.status !== "locked" && !item.studentCreated) {
      await this.investigation.reviewEvidence(evidenceId);
    }
  }
  scrollToComparison() {
    this.reveal("#comparison");
  }
  reveal(selector) {
    afterNextRender(() => {
      const region = this.element.nativeElement.querySelector(selector);
      region?.scrollIntoView({ block: "nearest", behavior: "instant" });
      region?.querySelector("input, button, summary, textarea")?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  async useTool(action) {
    if (this.selectionBusy())
      return;
    const scanVial = this.vials.find((v) => action.activityId === `activity-scan-${v.vialId}`);
    if (scanVial)
      await this.selectVial(scanVial);
    await this.launchActivity(action.activityId);
    if (action.toolId)
      afterNextRender(() => this.propertiesLab()?.selectTest(action.toolId), {
        injector: this.injector
      });
    this.reveal("#active-experiment");
  }
  async chooseResult(evidenceId, testId, column, recorded) {
    if (recorded) {
      await this.inspectEvidence(evidenceId);
      this.reveal("#evidence-dock");
      return;
    }
    if (this.selectionBusy())
      return;
    await this.selectVial(this.vials[column]);
    await this.useTool({
      activityId: evidenceId === "evidence-property-trials" ? "activity-property-comparison" : "activity-reaction-comparison",
      label: "Run test",
      toolId: evidenceId === "evidence-property-trials" ? testId : void 0
    });
  }
  async useInExplanation(evidenceId) {
    await this.investigation.addEvidenceToFinal(evidenceId);
    this.theoryEditor()?.includeEvidence(evidenceId);
    this.explanationOpen.set(true);
    this.reveal("#explanation");
  }
  onVialChanged(id) {
    const vial = this.vials.find((v) => v.vialId === id);
    if (vial)
      void this.selectVial(vial);
  }
  async classifyEvidence(change) {
    await this.investigation.classifyEvidence(change.evidenceId, change.classification);
    this.selectedEvidenceId.set(change.evidenceId);
  }
  async saveEvidenceNote(change) {
    await this.investigation.annotateEvidence(change.evidenceId, change.note);
  }
  async setEvidenceImportance(change) {
    await this.investigation.setEvidenceImportance(change.evidenceId, change.important);
  }
  async addEvidenceToFinal(evidenceId) {
    await this.investigation.addEvidenceToFinal(evidenceId);
    this.contextAlert.set({
      label: "Final case updated",
      title: "Evidence added to your final set"
    });
  }
  async createEvidenceQuestion(change) {
    await this.investigation.createQuestion(change.text, change.evidenceId);
  }
  async createQuestion(text) {
    await this.investigation.createQuestion(text);
  }
  async addNotebookQuestion() {
    const question = this.notebookQuestion().trim();
    if (question.length === 0) {
      return;
    }
    await this.createQuestion(question);
    this.notebookQuestion.set("");
  }
  async createStudentEvidence(draft) {
    await this.investigation.createStudentEvidence(draft.title, draft.observation);
    this.contextAlert.set({ label: "New evidence", title: draft.title });
  }
  async saveTheory(draft) {
    await this.investigation.saveTheory(draft);
    this.contextAlert.set({
      label: this.currentTheory()?.revisions.length === 1 ? "Working theory saved" : "Theory revised",
      title: "Your earlier thinking remains in theory history"
    });
  }
  async openFinalInvestigation() {
    if (!this.finalReady()) {
      this.lockedPhaseId.set("phase-showcase");
      this.drawer.set("lockedPhase");
      return;
    }
    await this.investigation.openFinalInvestigation();
    this.workspacePair.set("final-investigation");
    this.activePhaseId.set("phase-showcase");
    this.drawer.set(void 0);
  }
  async saveFinalDraft(draft) {
    await this.investigation.saveFinalDraft(draft);
  }
  async submitFinalInvestigation() {
    await this.investigation.submitFinalInvestigation();
    this.contextAlert.set({
      label: "Investigation complete",
      title: "Your final case has been recorded for teacher review"
    });
  }
  async launchActivity(activityId) {
    if (this.selectionBusy())
      return;
    this.workspacePair.set("bench");
    if (activityId === "activity-evidence-locker") {
      this.selectWorkspace("evidence-analysis");
      return;
    }
    this.activeActivityId.set(activityId.startsWith("activity-scan-") ? `activity-scan-${this.selectedVial()?.vialId ?? "vial-a"}` : activityId);
    this.drawer.set(void 0);
    const scanVialId = activityId.startsWith("activity-scan-") ? this.selectedVial()?.vialId : void 0;
    if (scanVialId !== void 0) {
      const vial = this.vials.find((item) => item.vialId === scanVialId);
      if (vial !== void 0) {
        await this.selectVial(vial);
      }
      return;
    }
    await this.investigation.startActivity(activityId);
  }
  returnFromActivity() {
    this.openBench();
  }
  async selectVial(vial) {
    if (this.selectionBusy() || vial.vialId === this.selectedVial()?.vialId)
      return;
    const previous = this.selectedVial();
    if (previous)
      this.scanDrafts.set(previous.vialId, {
        observation: this.observation(),
        tags: this.selectedTags()
      });
    this.selectedVial.set(vial);
    const draft = this.scanDrafts.get(vial.vialId);
    this.observation.set(draft?.observation ?? this.investigation.legacyDrafts()[vial.vialId] ?? "");
    this.selectedTags.set(draft?.tags ?? []);
    this.scanState.set("ready");
    if (this.activeStationKey() === "scanner") {
      this.activeActivityId.set(`activity-scan-${vial.vialId}`);
      await this.investigation.startScan(vial.vialId);
    }
  }
  toggleTag(tag) {
    this.selectedTags.update((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  }
  async captureScan() {
    const vial = this.selectedVial();
    if (vial === void 0 || this.scanState() === "scanning" || !this.observation().trim()) {
      return;
    }
    this.scanState.set("scanning");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.investigation.captureScan(vial.vialId, this.observation(), this.selectedTags());
    this.scanState.set("captured");
    this.noteEvidence(`evidence-scan-${vial.vialId}`, `Vial ${vial.code} optical scan`);
  }
  async captureStationResult(capture) {
    await this.investigation.captureActivity(capture.activityId, capture.evidenceId, capture.result, capture.note);
    this.noteEvidence(capture.evidenceId, evidenceTitle(capture.evidenceId));
  }
  /**
   * Records the new evidence without closing the station. Students stay at the
   * bench so they can run the next trial; the rail and the alert show what they
   * just captured.
   */
  noteEvidence(evidenceId, title) {
    this.contextAlert.set({ label: "New evidence collected", title, evidenceId });
  }
  static \u0275fac = function MysteryInvestigationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MysteryInvestigationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MysteryInvestigationComponent, selectors: [["app-mystery-investigation"]], viewQuery: function MysteryInvestigationComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.propertiesLab, PropertiesLabComponent, 5)(ctx.reactionLab, ReactionBenchComponent, 5)(ctx.theoryEditor, InvestigationWorkingTheoryComponent, 5)(ctx.evidenceDock, WorkbenchEvidenceComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  }, decls: 50, vars: 10, consts: [["equipmentMenu", ""], ["recordMenu", ""], [1, "investigation-shell", "workbench"], [1, "case-bar"], ["type", "button", 1, "project-identity", 3, "click"], ["aria-hidden", "true", 1, "project-seal"], ["aria-label", "Investigation stages", 1, "workbench-stages"], ["type", "button", 3, "click"], [1, "current-vial"], ["aria-live", "polite", 1, "save-dot"], [1, "equipment-menu"], ["type", "button", 3, "disabled"], ["title", "Investigation guide"], ["type", "button", 1, "focus-evidence", 3, "click"], ["role", "status", 1, "system-state"], ["role", "alert", 1, "system-state", "error"], ["type", "button", 3, "click", "disabled"], [3, "hidden"], ["aria-label", "Your current specimen", 1, "workbench-selection", 3, "hidden"], ["aria-label", "Choose a vial", 1, "workbench-vials", 3, "hidden"], ["role", "status", 1, "workbench-update"], ["id", "investigation-workspace", 1, "workbench-layout"], ["id", "active-experiment", 1, "workbench-main"], [1, "active-bench", 3, "hidden"], [1, "scan-activity"], ["src", "/week1-incident-room-v1.webp", "alt", "Four sealed mystery vials at the optical scanning station", 1, "scan-activity__scene"], ["aria-hidden", "true", 1, "scan-activity__scrim"], [1, "scanner"], ["id", "comparison", 1, "workbench-comparison", 3, "hidden"], ["id", "explanation", 1, "workbench-explanation", 3, "hidden"], [3, "theorySaved", "theorySelected", "evidenceSelected", "investigateRequested", "finalRequested", "singlePage", "theory", "theories", "evidence", "saveState"], ["id", "evidence-dock", 3, "hidden"], [3, "selected", "useTool", "useEvidence", "classify", "noteSaved", "questionCreated", "importanceChanged", "evidence", "links", "activityId", "selectedId", "claim"], [3, "runtime", "evidence", "ready", "missingReadiness", "saveState"], ["alt", "", 3, "src"], ["type", "button"], ["type", "button", "aria-label", "Dismiss update", 3, "click"], [1, "scanner-visual"], [3, "src", "alt"], [1, "scan-line"], ["aria-hidden", "true", 1, "reticle"], [1, "scanner-record"], [1, "optional-markers"], ["aria-label", "Visible feature markers", 1, "tag-bank"], ["type", "button", 3, "selected"], ["rows", "4", "placeholder", "I can see\u2026", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], [1, "workbench-station", 3, "vialChanged", "captured", "embedded", "selectedVialId", "savedResults"], [1, "workbench-station", 3, "vialChanged", "captured", "selectedVialId", "active"], [1, "workbench-station", 3, "captured"], [1, "workbench-station", 3, "vialChanged", "captured", "selectedVialId"], [1, "comparison-scroll"], ["scope", "col"], ["scope", "row"], [3, "caseBoardRequested", "draftSaved", "submitRequested", "runtime", "evidence", "ready", "missingReadiness", "saveState"], ["type", "button", "aria-label", "Close utility panel", 1, "drawer-backdrop", 3, "click"], [1, "utility-drawer"], ["type", "button", "aria-label", "Close", 3, "click"], [1, "mission-brief"], [1, "notebook"], [1, "route-guide"], [1, "help-panel"], [1, "locked-phase"], [1, "eyebrow"], [1, "drawer-subhead"], [1, "phase-list"], ["aria-hidden", "true"], ["rows", "4", "placeholder", "What do I still need to know?", 3, "ngModelChange", "ngModel"], [1, "route-next"], [1, "route-list"], [1, "route-clear"], [1, "route-missing"], [1, "route-override"], ["aria-hidden", "true", 1, "route-mark"], [1, "route-where"], [1, "route-gate"]], template: function MysteryInvestigationComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "app-workspace-tools")(2, "header", 3)(3, "button", 4);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_3_listener() {
        return ctx.drawer.set("mission");
      });
      \u0275\u0275elementStart(4, "span", 5);
      \u0275\u0275text(5, "US");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span")(7, "strong");
      \u0275\u0275text(8, "The Unlabeled Shelf");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "nav", 6)(10, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_10_listener() {
        return ctx.openBench();
      });
      \u0275\u0275text(11, " 1 \xB7 Investigate ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_12_listener() {
        return ctx.selectWorkspace("analysis-theory");
      });
      \u0275\u0275text(13, " 2 \xB7 My explanation ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_14_listener() {
        return ctx.openFinalInvestigation();
      });
      \u0275\u0275text(15, "3 \xB7 Final case");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, MysteryInvestigationComponent_Conditional_16_Template, 2, 1, "span", 8);
      \u0275\u0275elementStart(17, "span", 9);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "details", 10, 0)(21, "summary");
      \u0275\u0275text(22, "Equipment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div");
      \u0275\u0275repeaterCreate(24, MysteryInvestigationComponent_For_25_Template, 2, 2, "button", 11, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_26_listener() {
        return ctx.evidenceDockOpen.set(!ctx.evidenceDockOpen());
      });
      \u0275\u0275text(27, " Evidence ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        ctx.comparisonOpen.set(true);
        return \u0275\u0275resetView(ctx.explanationOpen.set(false));
      });
      \u0275\u0275text(29, " Compare ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "details", 10, 1)(32, "summary");
      \u0275\u0275text(33, "My record");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div")(35, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        const recordMenu_r6 = \u0275\u0275reference(31);
        ctx.drawer.set("notebook");
        return \u0275\u0275resetView(recordMenu_r6.open = false);
      });
      \u0275\u0275text(36, " My questions ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 7);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        const recordMenu_r6 = \u0275\u0275reference(31);
        ctx.drawer.set("route");
        return \u0275\u0275resetView(recordMenu_r6.open = false);
      });
      \u0275\u0275text(38, " Checklist ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "app-task-guide", 12)(40, "p");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p");
      \u0275\u0275text(43, "Look \u2192 test \u2192 compare \u2192 explain.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "button", 13);
      \u0275\u0275listener("click", function MysteryInvestigationComponent_Template_button_click_44_listener() {
        return ctx.evidenceDockOpen.set(!ctx.evidenceDockOpen());
      });
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(46, MysteryInvestigationComponent_Conditional_46_Template, 2, 0, "section", 14)(47, MysteryInvestigationComponent_Conditional_47_Template, 8, 0, "section", 15)(48, MysteryInvestigationComponent_Conditional_48_Template, 38, 30);
      \u0275\u0275conditionalCreate(49, MysteryInvestigationComponent_Conditional_49_Template, 12, 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_11_0;
      let tmp_12_0;
      \u0275\u0275advance(10);
      \u0275\u0275attribute("aria-pressed", ctx.workspacePair() !== "final-investigation");
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_3_0 = ctx.selectedVial()) ? 16 : -1, tmp_3_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.investigation.saveState() === "saved" ? "Recorded work saved" : ctx.investigation.saveState());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.labStations());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.evidenceDockOpen());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.comparisonOpen());
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.nextAction());
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-expanded", ctx.evidenceDockOpen());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.evidenceDockOpen() ? "Close evidence" : "Evidence", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.investigation.loading() ? 46 : ctx.investigation.errors().length > 0 ? 47 : (tmp_11_0 = ctx.investigation.snapshot()) ? 48 : -1, tmp_11_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_12_0 = ctx.drawer()) ? 49 : -1, tmp_12_0);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    TaskGuideComponent,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    InvestigationFinalCaseComponent,
    InvestigationWorkingTheoryComponent,
    PropertiesLabComponent,
    ReactionBenchComponent,
    ConservationChamberComponent,
    RestorationWorkspaceComponent,
    EmergencyResponseComponent,
    WorkbenchEvidenceComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  color: #eaf4f8;\n  background: #06111b;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%]::before, \n[_nghost-%COMP%]   *[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\n.investigation-shell[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background:\n    radial-gradient(\n      circle at 15% -20%,\n      rgba(35, 109, 120, 0.18),\n      transparent 36rem),\n    #06111b;\n}\n.case-bar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 20;\n  display: grid;\n  min-height: 3.4rem;\n  grid-template-columns: auto auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.85rem;\n  border-bottom: 1px solid rgba(137, 179, 199, 0.18);\n  padding: 0.4rem 1rem;\n  background: rgba(5, 16, 25, 0.97);\n}\n.project-identity[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.55rem;\n  border: 0;\n  padding: 0;\n  text-align: left;\n  background: transparent;\n  cursor: pointer;\n}\n.project-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.2rem;\n  height: 2.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #54aeb3;\n  border-radius: 50%;\n  color: #b7f4ef;\n  background:\n    radial-gradient(\n      circle,\n      #174652,\n      #0a222f);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n}\n.project-identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.02rem;\n}\n.project-identity[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f0f7fa;\n  font-size: 0.86rem;\n}\n.project-identity[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: #68c6c4;\n  font-size: 0.56rem;\n  font-style: normal;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.mission-question[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin: 0;\n  overflow: hidden;\n  color: #a9c2cd;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.case-meters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.meter[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.04rem;\n  border-left: 1px solid #294352;\n  padding-left: 0.75rem;\n}\n.meter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.eyebrow[_ngcontent-%COMP%], \n.activity-header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.activity-header[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.56rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.meter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dcebf1;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n.save-dot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #86a3b0;\n  font-size: 0.62rem;\n  font-weight: 700;\n}\n.save-dot[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #62c9a4;\n}\n.save-dot[_ngcontent-%COMP%]   i.pending[_ngcontent-%COMP%] {\n  background: #e0b64a;\n}\n.drawer-subhead[_ngcontent-%COMP%] {\n  margin: 0.4rem 0 0;\n  color: #9fc0cc;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.phase-list[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.3rem;\n  list-style: none;\n}\n.phase-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  gap: 0.55rem;\n  border: 1px solid #26465a;\n  border-radius: 0.45rem;\n  padding: 0.45rem 0.55rem;\n  color: #a5c0cc;\n  text-align: left;\n  background: rgba(10, 30, 42, 0.7);\n  cursor: pointer;\n}\n.phase-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: grid;\n  width: 1.5rem;\n  height: 1.5rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.phase-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.1rem;\n}\n.phase-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e6f3f7;\n  font-size: 0.76rem;\n}\n.phase-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #86a4b1;\n  font-size: 0.64rem;\n  line-height: 1.3;\n}\n.phase-list[_ngcontent-%COMP%]   button.current[_ngcontent-%COMP%] {\n  border-color: #6ecac6;\n  background: rgba(20, 69, 79, 0.8);\n}\n.phase-list[_ngcontent-%COMP%]   button.complete[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.phase-list[_ngcontent-%COMP%]   button.locked[_ngcontent-%COMP%] {\n  opacity: 0.62;\n}\n.route-guide[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  color: #eaf6fa;\n  font-size: 0.98rem;\n}\n.route-next[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.1rem;\n  margin: 0 0 0.7rem;\n  border-left: 3px solid #6ecac6;\n  border-radius: 0 0.4rem 0.4rem 0;\n  padding: 0.45rem 0.6rem;\n  background: rgba(20, 69, 79, 0.55);\n}\n.route-next[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7fd0cd;\n  font-size: 0.56rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.route-next[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #eaf6fa;\n  font-size: 0.8rem;\n}\n.route-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0 0 0.8rem;\n  padding: 0;\n  list-style: none;\n}\n.route-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.55rem;\n  border: 1px solid #26465a;\n  border-radius: 0.45rem;\n  padding: 0.5rem 0.6rem;\n  background: rgba(10, 30, 42, 0.7);\n}\n.route-list[_ngcontent-%COMP%]   li[data-status=current][_ngcontent-%COMP%] {\n  border-color: #6ecac6;\n  background: rgba(20, 69, 79, 0.8);\n}\n.route-list[_ngcontent-%COMP%]   li[data-status=complete][_ngcontent-%COMP%] {\n  opacity: 0.72;\n}\n.route-mark[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.5rem;\n  height: 1.5rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  color: #cbe4ec;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.route-list[_ngcontent-%COMP%]   li[data-status=complete][_ngcontent-%COMP%]   .route-mark[_ngcontent-%COMP%] {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.route-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e6f3f7;\n  font-size: 0.78rem;\n}\n.route-where[_ngcontent-%COMP%] {\n  display: block;\n  color: #7fd0cd;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n}\n.route-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.28rem 0 0;\n  color: #9db6c2;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.route-gate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d8b25f;\n  font-weight: 800;\n}\n.route-missing[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0.7rem;\n  padding-left: 1.1rem;\n  color: #e0c98b;\n  font-size: 0.7rem;\n  line-height: 1.5;\n}\n.route-clear[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0.7rem;\n  color: #8fe0c4;\n  font-size: 0.7rem;\n}\n.route-override[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  border: 1px dashed #b07f3a;\n  border-radius: 0.45rem;\n  padding: 0.55rem 0.6rem;\n  color: #f0d8a6;\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.route-override[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #ffd483;\n}\n.route-override[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: #ffe6b4;\n  font-size: 0.66rem;\n}\n.system-state[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 24rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.9rem;\n  border: 1px solid #2c4c5d;\n  border-radius: 0.8rem;\n  background: linear-gradient(rgba(5, 19, 29, 0.72), rgba(5, 19, 29, 0.92)), url(/lab-investigation-room-v2.webp) center/cover;\n}\n.system-state[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n}\n.system-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #77c9c6;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.system-state[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #edf8fb;\n  font-size: 0.9rem;\n}\n.system-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 35rem;\n  margin: 0.3rem 0 0;\n  color: #cfb4b4;\n  font-size: 0.7rem;\n}\n.system-state.error[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  height: 2rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #2c1111;\n  background: #d78c8c;\n  font-weight: 900;\n}\n.loader[_ngcontent-%COMP%] {\n  width: 1.8rem;\n  height: 1.8rem;\n  border: 2px solid #365b6c;\n  border-top-color: #76d6d1;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 900ms linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.activity-workspace[_ngcontent-%COMP%] {\n  min-height: calc(100dvh - 13rem);\n  overflow: hidden;\n  border: 1px solid #2d4f61;\n  border-radius: 0.8rem;\n  background: #081722;\n}\n.activity-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(15rem, 1fr) minmax(14rem, 0.7fr);\n  align-items: center;\n  gap: 0.85rem;\n  border-bottom: 1px solid #315263;\n  padding: 0.65rem 0.8rem;\n  background: #0a2130;\n}\n.activity-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  align-self: stretch;\n  border: 1px solid #3a6173;\n  border-radius: 0.48rem;\n  padding: 0.5rem 0.65rem;\n  color: #a9d9d8;\n  background: #0b2a38;\n  cursor: pointer;\n  font-size: 0.65rem;\n}\n.activity-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.scanner-record[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.12rem 0 0;\n  color: #f0f8fb;\n  font-size: 1rem;\n}\n.activity-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: #91a9b6;\n  font-size: 0.65rem;\n}\n.activity-header[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0;\n}\n.activity-header[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 4rem 1fr;\n  gap: 0.4rem;\n}\n.activity-header[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #c0d0d7;\n  font-size: 0.61rem;\n}\n.plugin-workspace[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: max(34rem, 100dvh - 19rem);\n  overflow: hidden;\n}\n.scan-activity[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 34rem;\n  overflow: hidden;\n}\n.scan-activity__scene[_ngcontent-%COMP%], \n.scan-activity__scrim[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.scan-activity__scene[_ngcontent-%COMP%] {\n  object-fit: cover;\n}\n.scan-activity__scrim[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 15, 23, 0.2),\n      rgba(4, 15, 23, 0.86) 55%,\n      rgba(4, 15, 23, 0.94));\n}\n.scanner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  width: min(64rem, 100% - 2rem);\n  min-height: 26rem;\n  grid-template-columns: minmax(16rem, 1.15fr) minmax(16rem, 0.85fr);\n  gap: 0.75rem;\n  margin: 1rem auto 5.6rem;\n}\n.scanner-visual[_ngcontent-%COMP%], \n.scanner-record[_ngcontent-%COMP%] {\n  border: 1px solid rgba(111, 169, 190, 0.45);\n  border-radius: 0.75rem;\n  background: rgba(5, 21, 31, 0.92);\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.35);\n}\n.scanner-visual[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.4rem;\n  border-bottom: 1px solid #294b5e;\n  padding: 0.6rem 0.75rem;\n}\n.scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #83a5b5;\n  font-size: 0.6rem;\n}\n.scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e9f5f8;\n  font-size: 0.75rem;\n}\n.scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 22rem;\n  place-items: center;\n  overflow: hidden;\n  margin: 0;\n  background:\n    radial-gradient(\n      circle,\n      color-mix(in srgb, var(--%NS%vial-color) 25%, #102330),\n      #06131d 68%);\n}\n.scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: min(17rem, 72%);\n  max-height: 20rem;\n  object-fit: contain;\n  filter: drop-shadow(0 1.2rem 1.6rem rgba(0, 0, 0, 0.55));\n}\n.reticle[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 75%;\n  aspect-ratio: 1;\n  border: 1px solid rgba(118, 218, 213, 0.34);\n  border-radius: 50%;\n}\n.reticle[_ngcontent-%COMP%]::before, \n.reticle[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  background: rgba(118, 218, 213, 0.25);\n  content: "";\n  transform: translate(-50%, -50%);\n}\n.reticle[_ngcontent-%COMP%]::before {\n  width: 100%;\n  height: 1px;\n}\n.reticle[_ngcontent-%COMP%]::after {\n  width: 1px;\n  height: 100%;\n}\n.scan-line[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 12%;\n  left: 8%;\n  width: 84%;\n  height: 2px;\n  opacity: 0;\n  background: #9cfff8;\n  box-shadow: 0 0 1rem #62dfd8;\n}\n.scan-line.running[_ngcontent-%COMP%] {\n  opacity: 1;\n  animation: _ngcontent-%COMP%_scan 1.1s ease-in-out infinite alternate;\n}\n@keyframes _ngcontent-%COMP%_scan {\n  to {\n    top: 86%;\n  }\n}\n.scanner-record[_ngcontent-%COMP%] {\n  align-self: center;\n  padding: 1rem;\n}\n.scanner-record[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: #96afbb;\n  font-size: 0.72rem;\n}\n.tag-bank[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.75rem;\n}\n.tag-bank[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #3c6070;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  color: #a9bfca;\n  background: #0b2432;\n  cursor: pointer;\n  font-size: 0.62rem;\n}\n.tag-bank[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #76d7d1;\n  color: #082124;\n  background: #74d2cd;\n}\n.scanner-record[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.75rem;\n  color: #b6cbd4;\n  font-size: 0.67rem;\n  font-weight: 700;\n}\n.scanner-record[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #36596b;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #edf8fa;\n  background: #071923;\n  resize: vertical;\n}\n.primary-action[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0.7rem;\n  border: 1px solid #7fe4dd;\n  border-radius: 0.5rem;\n  padding: 0.62rem;\n  color: #062128;\n  background: #77d6d1;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 850;\n}\n.primary-action[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.65;\n}\n.vial-switcher[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  right: 1rem;\n  bottom: 0.8rem;\n  left: 1rem;\n  display: flex;\n  justify-content: center;\n  gap: 0.45rem;\n}\n.vial-switcher[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #38596a;\n  border-radius: 0.5rem;\n  padding: 0.38rem 0.55rem;\n  color: #a9bdc7;\n  background: rgba(7, 23, 34, 0.92);\n  cursor: pointer;\n}\n.vial-switcher[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #71d4cf;\n  color: #f0ffff;\n}\n.vial-switcher[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.45rem;\n  height: 1.45rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: var(--%NS%vial-color);\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.vial-switcher[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.58rem;\n}\n.next-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.next-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d8b75e;\n  font-size: 0.55rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.next-action[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #c8d8df;\n  font-size: 0.66rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 80;\n  inset: 0;\n  border: 0;\n  background: rgba(2, 9, 14, 0.72);\n  cursor: default;\n}\n.utility-drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 90;\n  top: 0;\n  right: 0;\n  display: grid;\n  width: min(28rem, 100%);\n  height: 100dvh;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  border-left: 1px solid #3a5d70;\n  color: #e8f3f7;\n  background: #091b27;\n  box-shadow: -1.5rem 0 4rem rgba(0, 0, 0, 0.4);\n}\n.utility-drawer[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 3.8rem;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #2c4959;\n  padding: 0 0.9rem;\n  color: #8dcfcd;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.utility-drawer[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  height: 2rem;\n  place-items: center;\n  border: 1px solid #38596a;\n  border-radius: 0.45rem;\n  background: #102735;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.mission-brief[_ngcontent-%COMP%], \n.notebook[_ngcontent-%COMP%], \n.help-panel[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.mission-brief[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.help-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #f0f7fa;\n  font-size: 1.35rem;\n}\n.mission-brief[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 1rem;\n}\n.mission-brief[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  border-left: 2px solid #3e7579;\n  padding-left: 0.65rem;\n}\n.mission-brief[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #78c5c3;\n  font-size: 0.6rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.mission-brief[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0.18rem 0 0;\n  color: #b7c9d1;\n  font-size: 0.72rem;\n  line-height: 1.48;\n}\n.mission-brief[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.notebook[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n.help-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border: 1px solid #5ec2bd;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.7rem;\n  color: #062128;\n  background: #72d1cc;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n.notebook[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.help-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #98b0bc;\n  font-size: 0.72rem;\n  line-height: 1.5;\n}\n.notebook[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin-top: 0.5rem;\n  border: 1px solid #334f60;\n  border-radius: 0.5rem;\n  padding: 0.55rem;\n  background: #0d2432;\n}\n.notebook[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.25rem;\n  height: 1.25rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #201908;\n  background: #e0b958;\n  font-size: 0.62rem;\n}\n.notebook[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dce8ee;\n  font-size: 0.68rem;\n}\n.notebook[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.9rem;\n  color: #b4c7d0;\n  font-size: 0.68rem;\n  font-weight: 700;\n}\n.notebook[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #365567;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #eef7fa;\n  background: #061722;\n  resize: vertical;\n}\n.help-panel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.2rem;\n  height: 2.2rem;\n  place-items: center;\n  border: 1px solid #5ba9aa;\n  border-radius: 50%;\n  color: #c8fffb;\n  background: #153b45;\n  font-weight: 900;\n}\n.help-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.locked-phase[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n}\n.locked-phase[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.8rem;\n  padding-left: 1.1rem;\n  color: #c1d0d7;\n  font-size: 0.7rem;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n@media (max-width: 960px) {\n  .case-bar[_ngcontent-%COMP%] {\n    grid-template-columns: auto auto minmax(0, 1fr);\n    row-gap: 0.35rem;\n  }\n  .case-meters[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    justify-content: flex-end;\n  }\n  .activity-header[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .activity-header[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 760px) {\n  .case-bar[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr auto;\n  }\n  .mission-question[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .bench-rail[_ngcontent-%COMP%] {\n    padding-inline: 0.55rem;\n  }\n  .rail-item[_ngcontent-%COMP%] {\n    min-width: 7.4rem;\n  }\n  .bench[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n  .workspace-area[_ngcontent-%COMP%] {\n    padding: 0.45rem;\n  }\n  .mobile-pair-toggle[_ngcontent-%COMP%] {\n    position: relative;\n    z-index: 2;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.3rem;\n    margin-bottom: 0.4rem;\n  }\n  .mobile-pair-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    border: 1px solid var(--%NS%case-edge, #315263);\n    border-radius: 0.45rem;\n    padding: 0.45rem;\n    color: var(--%NS%case-muted, #8ea8b4);\n    background: rgba(0, 0, 0, 0.4);\n  }\n  .mobile-pair-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n    border-color: var(--%NS%case-accent, #69c9c5);\n    color: var(--%NS%case-ink, #efffff);\n    background: #15404a;\n  }\n  .activity-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .activity-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    justify-self: start;\n  }\n  .scanner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    margin-bottom: 6rem;\n  }\n  .scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n    min-height: 15rem;\n  }\n  .vial-switcher[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    justify-content: flex-start;\n  }\n}\n@media (max-width: 520px) {\n  .case-bar[_ngcontent-%COMP%] {\n    padding-inline: 0.65rem;\n  }\n  .project-identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    display: none;\n  }\n  .meter[_ngcontent-%COMP%] {\n    padding-left: 0.5rem;\n  }\n  .save-dot[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .station-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .context-alert[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .context-alert[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin-left: 2.35rem;\n  }\n  .context-alert[_ngcontent-%COMP%]   button.dismiss[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0.35rem;\n    right: 0.4rem;\n  }\n  .scanner[_ngcontent-%COMP%] {\n    width: calc(100% - 0.8rem);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n.case-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  padding: 10px 22px;\n}\n.case-bar[_ngcontent-%COMP%]   .project-identity[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.case-bar[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n.equipment-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #597785;\n  border-radius: 8px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n  font: 700 13px Arial;\n}\n.current-vial[_ngcontent-%COMP%] {\n  display: none;\n}\n.equipment-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.equipment-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 100%;\n  width: 240px;\n  display: grid;\n  gap: 6px;\n  padding: 12px;\n  background: #15313d;\n  z-index: 30;\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);\n}\n.equipment-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px;\n  color: #fff7d5;\n  border: 1px solid #607d84;\n  background: transparent;\n  border-radius: 6px;\n  text-align: left;\n  cursor: pointer;\n}\n.workbench-layout[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1320px;\n  margin: auto;\n}\n.workbench-layout.evidence-open[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr);\n}\n.workbench-selection[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 12px;\n}\n.scanner[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: auto;\n}\n.scan-activity[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n.save-dot[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.workbench-stages[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n@media (max-width: 850px) {\n  .workbench-layout.evidence-open[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .case-bar[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n  }\n  .workbench-stages[_ngcontent-%COMP%] {\n    order: 3;\n    flex: 1 0 100%;\n    justify-content: center;\n  }\n  .workbench-selection[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.workbench[_ngcontent-%COMP%]   .workbench-layout[_ngcontent-%COMP%]:not(.evidence-open) {\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1120px;\n}\n.workbench[_ngcontent-%COMP%]   .workbench-selection[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 16px;\n}\n.workbench[_ngcontent-%COMP%]   .workbench-selection[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: none;\n}\n.workbench[_ngcontent-%COMP%]   .scanner-record[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.workbench[_ngcontent-%COMP%]   .scanner-record[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.workbench[_ngcontent-%COMP%]   .scan-activity[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n  min-height: 0;\n}\n.active-bench[hidden][_ngcontent-%COMP%], \n.workbench-comparison[hidden][_ngcontent-%COMP%], \n.workbench-explanation[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n/*# sourceMappingURL=mystery-investigation.component.css.map */', "\n[_nghost-%COMP%]   [hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.workbench[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.workbench[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.workbench-stages[_ngcontent-%COMP%], \n.workbench-selection[_ngcontent-%COMP%], \n.workbench-vials[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.workbench-stages[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.workbench-stages[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.workbench-selection[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.workbench-next[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.workbench-update[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #42606b;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.7rem;\n  background: #102c37;\n  font-size: 0.78rem;\n}\n.workbench[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #79ded0;\n  background-color: #19424b;\n  box-shadow: inset 0 -2px #79ded0;\n}\n.workbench-selection[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem;\n  background: #0b202b;\n}\n.workbench-selection[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #aec9d2;\n  font-size: 0.8rem;\n}\n.workbench-vials[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.workbench-vials[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.25rem 0.65rem 0.25rem 0.25rem;\n}\n.workbench-vials[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 2.2rem;\n  height: 2.2rem;\n  border-radius: 0.3rem;\n  object-fit: cover;\n}\n.workbench-tools[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 0.45rem;\n  padding: 0.65rem 1rem;\n}\n.workbench-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border: 1px solid #355462;\n  border-radius: 0.6rem;\n  padding: 0.45rem;\n  text-align: left;\n  background: #0d2531;\n}\n.workbench-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.15rem;\n}\n.workbench-tools[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.workbench-tools[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.workbench-tools[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: #a7c0ca;\n  font-size: 0.68rem;\n  font-style: normal;\n}\n.tool-thumb[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3.8rem;\n  flex-shrink: 0;\n  border-radius: 0.4rem;\n  background-size: cover;\n  background-position: center;\n}\n[data-station=scanner][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/week1-incident-room-v1.webp);\n}\n[data-station=properties][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/week2-test-scenes-v2.webp);\n}\n[data-station=reaction][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/week3-test-scenes-v2.webp);\n}\n[data-station=conservation][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/conservation-test-scenes-v2.webp);\n}\n[data-station=restoration][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/week4-test-scenes-v2.webp);\n}\n[data-station=emergency][_ngcontent-%COMP%]   .tool-thumb[_ngcontent-%COMP%] {\n  background-image: url(/lab-investigation-room-v2.webp);\n}\n.workbench-next[_ngcontent-%COMP%], \n.workbench-update[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  justify-content: space-between;\n  margin: 0 1rem 0.75rem;\n  padding: 0.5rem 0.75rem;\n  border-left: 3px solid #66c9bd;\n  background: #122d37;\n  font-size: 0.8rem;\n}\n.workbench-next[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.5;\n}\n.workbench-next[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n  color: #93e7d8;\n}\n.workbench-next[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.workbench-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(300px, 350px);\n  gap: 0.8rem;\n  padding: 0 1rem 1rem;\n  align-items: start;\n}\n.workbench-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  container-type: inline-size;\n}\n.workbench-main[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid #355462;\n  border-radius: 0.8rem;\n  min-height: 34rem;\n  background: #081b27;\n}\n#evidence-dock[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0.5rem;\n  min-width: 0;\n  max-height: calc(100dvh - 1rem);\n  overflow-y: auto;\n  border-radius: 0.7rem;\n}\n.workbench-comparison[_ngcontent-%COMP%], \n.workbench-explanation[_ngcontent-%COMP%] {\n  margin-top: 0.8rem;\n  padding: 0.8rem;\n  border: 1px solid #355462;\n  border-radius: 0.65rem;\n  background: #0d2531;\n}\n.workbench-main[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.95rem;\n  padding: 0.3rem;\n}\n.workbench-main[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #aac4cf;\n  font-size: 0.8rem;\n  line-height: 1.5;\n}\n.workbench-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.comparison-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.comparison-scroll[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  table-layout: fixed;\n  min-width: 580px;\n  border-collapse: collapse;\n  font-size: 0.75rem;\n}\n.comparison-scroll[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.comparison-scroll[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border: 1px solid #38535e;\n  text-align: left;\n  vertical-align: top;\n  overflow-wrap: anywhere;\n}\n.comparison-scroll[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 3rem;\n  border: 0;\n  color: #b3e4dc;\n  background: transparent;\n  font-size: inherit;\n  text-align: left;\n  line-height: 1.5;\n}\n.workbench[_ngcontent-%COMP%]   .scanner[_ngcontent-%COMP%] {\n  width: calc(100% - 1.5rem);\n  margin: 0.75rem;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n}\n.workbench[_ngcontent-%COMP%]   .scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  min-height: 20rem;\n}\n.workbench[_ngcontent-%COMP%]   .scanner-record[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n@container (max-width: 620px) {\n  .workbench[_ngcontent-%COMP%]   .scanner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .workbench[_ngcontent-%COMP%]   .scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n    min-height: 15rem;\n  }\n}\n@media (max-width: 1200px) {\n  .workbench-tools[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .workbench-stages[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    grid-row: 2;\n  }\n  .case-bar[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr auto;\n  }\n}\n@media (max-width: 800px) {\n  .workbench-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-inline: 0.5rem;\n  }\n  #evidence-dock[_ngcontent-%COMP%] {\n    position: static;\n    max-height: none;\n  }\n  .workbench-tools[_ngcontent-%COMP%] {\n    padding-inline: 0.5rem;\n  }\n  .workbench-next[_ngcontent-%COMP%] {\n    margin-inline: 0.5rem;\n  }\n}\n@media (max-width: 520px) {\n  .workbench-tools[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .workbench[_ngcontent-%COMP%]   .project-identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    display: grid;\n  }\n  .workbench-next[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .workbench-vials[_ngcontent-%COMP%] {\n    gap: 0.25rem;\n  }\n  .workbench-vials[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding-right: 0.3rem;\n    font-size: 0.7rem;\n  }\n  .workbench-vials[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 1.8rem;\n    height: 1.8rem;\n  }\n}\n.current-vial[_ngcontent-%COMP%] {\n  color: #f3e4bd;\n  font-size: 13px;\n  font-weight: 700;\n}\n.evidence-check[_ngcontent-%COMP%] {\n  max-width: 380px;\n  font-size: 14px;\n}\n.evidence-check[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n/*# sourceMappingURL=workbench.css.map */", "\n[_nghost-%COMP%] {\n  display: block;\n}\n.workbench[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.workbench[_ngcontent-%COMP%]   .workbench-layout[_ngcontent-%COMP%], \n.workbench[_ngcontent-%COMP%]   .workbench-layout[_ngcontent-%COMP%]:not(.evidence-open) {\n  max-width: none;\n  padding: 0;\n}\n.workbench-main[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0;\n  min-height: 100dvh;\n}\n.workbench-selection[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 0;\n}\n.workbench-selection[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.workbench-vials[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 4px 10px;\n  background: rgba(16, 43, 53, 0.8745098039);\n}\n.workbench-vials[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: none;\n}\n.focus-evidence[_ngcontent-%COMP%] {\n  position: fixed;\n  top: calc(var(--%NS%project-navigation-height, 0px) + 14px);\n  right: 66px;\n  z-index: 80;\n  min-height: 40px;\n  border: 1px solid rgba(138, 166, 175, 0.5019607843);\n  border-radius: 22px;\n  padding: 8px 14px;\n  color: #eef9f9;\n  background: rgba(16, 43, 53, 0.9333333333);\n  cursor: pointer;\n}\n.workbench[_ngcontent-%COMP%]   .scan-activity[_ngcontent-%COMP%] {\n  display: grid;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 100dvh;\n  padding: 82px 24px 32px;\n}\n.workbench[_ngcontent-%COMP%]   .scanner[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: auto;\n  background: rgba(10, 32, 43, 0.8666666667);\n  border-radius: 20px;\n}\n.workbench[_ngcontent-%COMP%]   .scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.scanner-visual[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: none;\n}\n.workbench-explanation[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  padding: 90px max(24px, (100% - 700px) / 2) 32px;\n  background: linear-gradient(rgba(3, 16, 29, 0.5333333333), rgba(3, 16, 29, 0.6)), url(/week1-incident-room-v1.webp) center/cover;\n}\n.workbench-explanation[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%], \n.workbench-explanation[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  display: none;\n}\n.optional-markers[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.optional-markers[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #b7ced5;\n  font-size: 13px;\n}\n.workbench-update[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 16px;\n  left: 16px;\n  right: 16px;\n  z-index: 60;\n}\n.workbench-layout.evidence-open[_ngcontent-%COMP%] {\n  padding-top: 72px;\n}\n@media (max-width: 700px) {\n  .workbench-selection[_ngcontent-%COMP%] {\n    top: 66px;\n    width: max-content;\n  }\n  .workbench[_ngcontent-%COMP%]   .scan-activity[_ngcontent-%COMP%] {\n    padding: 122px 12px 20px;\n  }\n  .workbench[_ngcontent-%COMP%]   .scanner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .workbench[_ngcontent-%COMP%]   .scanner-visual[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n    min-height: 200px;\n  }\n}\n/*# sourceMappingURL=focused-workbench.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MysteryInvestigationComponent, [{
    type: Component,
    args: [{ selector: "app-mystery-investigation", imports: [
      WorkspaceToolsComponent,
      TaskGuideComponent,
      FormsModule,
      InvestigationFinalCaseComponent,
      InvestigationWorkingTheoryComponent,
      PropertiesLabComponent,
      ReactionBenchComponent,
      ConservationChamberComponent,
      RestorationWorkspaceComponent,
      EmergencyResponseComponent,
      WorkbenchEvidenceComponent
    ], template: `<div class="investigation-shell workbench">
  <app-workspace-tools>
    <header class="case-bar">
      <button class="project-identity" type="button" (click)="drawer.set('mission')">
        <span class="project-seal" aria-hidden="true">US</span
        ><span><strong>The Unlabeled Shelf</strong></span>
      </button>
      <nav class="workbench-stages" aria-label="Investigation stages">
        <button
          type="button"
          [attr.aria-pressed]="workspacePair() !== 'final-investigation'"
          (click)="openBench()"
        >
          1 \xB7 Investigate
        </button>
        <button type="button" (click)="selectWorkspace('analysis-theory')">
          2 \xB7 My explanation
        </button>
        <button type="button" (click)="openFinalInvestigation()">3 \xB7 Final case</button>
      </nav>
      @if (selectedVial(); as vial) {
        <span class="current-vial">Current specimen: Vial {{ vial.code }}</span>
      }
      <span class="save-dot" aria-live="polite">{{
        investigation.saveState() === 'saved' ? 'Recorded work saved' : investigation.saveState()
      }}</span>
      <details #equipmentMenu class="equipment-menu">
        <summary>Equipment</summary>
        <div>
          @for (station of labStations(); track station.key) {
            <button
              type="button"
              [disabled]="selectionBusy()"
              (click)="launchStation(station); equipmentMenu.open = false"
            >
              {{ station.name }}
            </button>
          }
        </div>
      </details>
      <button
        type="button"
        (click)="evidenceDockOpen.set(!evidenceDockOpen())"
        [attr.aria-pressed]="evidenceDockOpen()"
      >
        Evidence
      </button>
      <button
        type="button"
        [attr.aria-pressed]="comparisonOpen()"
        (click)="comparisonOpen.set(true); explanationOpen.set(false)"
      >
        Compare
      </button>
      <details class="equipment-menu" #recordMenu>
        <summary>My record</summary>
        <div>
          <button type="button" (click)="drawer.set('notebook'); recordMenu.open = false">
            My questions
          </button>
          <button type="button" (click)="drawer.set('route'); recordMenu.open = false">
            Checklist
          </button>
        </div>
      </details>
      <app-task-guide title="Investigation guide"
        ><p>{{ nextAction() }}</p>
        <p>Look \u2192 test \u2192 compare \u2192 explain.</p>
      </app-task-guide>
    </header>
  </app-workspace-tools>
  <button
    class="focus-evidence"
    type="button"
    (click)="evidenceDockOpen.set(!evidenceDockOpen())"
    [attr.aria-expanded]="evidenceDockOpen()"
  >
    {{ evidenceDockOpen() ? 'Close evidence' : 'Evidence' }}
  </button>
  @if (investigation.loading()) {
    <section class="system-state" role="status">Preparing your workbench\u2026</section>
  } @else if (investigation.errors().length > 0) {
    <section class="system-state error" role="alert">
      <div>
        <h1>Investigation unavailable</h1>
        <p>Your work has not been lost.</p>
        @for (error of investigation.errors(); track error) {
          <p>{{ error }}</p>
        }
      </div>
    </section>
  } @else if (investigation.snapshot(); as runtime) {
    <div [hidden]="workspacePair() === 'final-investigation'">
      <section
        class="workbench-selection"
        [hidden]="
          ['restoration', 'conservation', 'emergency'].includes(activeStationKey() ?? '') ||
          explanationOpen() ||
          comparisonOpen()
        "
        aria-label="Your current specimen"
      >
        @if (activeStationKey() === 'conservation') {
          <strong>Comparing open and sealed chambers \xB7 vials do not change this model</strong>
        } @else if (activeStationKey() === 'emergency') {
          <strong>Bay 3 transfer challenge \xB7 use the new tub and prior records</strong>
        } @else {
          <strong>Working with</strong>
        }
        <div
          [hidden]="activeStationKey() === 'conservation' || activeStationKey() === 'emergency'"
          class="workbench-vials"
          aria-label="Choose a vial"
        >
          @for (vial of vials; track vial.vialId) {
            <button
              type="button"
              [attr.aria-pressed]="selectedVial()?.vialId === vial.vialId"
              [disabled]="selectionBusy()"
              (click)="selectVial(vial)"
            >
              <img [src]="vial.image" alt="" /><span>Vial {{ vial.code }}</span>
            </button>
          }
        </div>
      </section>
      @if (contextAlert(); as alert) {
        <div class="workbench-update" role="status">
          <span>{{ alert.title }}</span>
          @if (alert.evidenceId) {
            <button type="button" (click)="inspectEvidence(alert.evidenceId)">
              Read result beside the bench
            </button>
          }
          <button type="button" aria-label="Dismiss update" (click)="contextAlert.set(undefined)">
            \xD7
          </button>
        </div>
      }
      <main
        class="workbench-layout"
        [class.evidence-open]="evidenceDockOpen()"
        id="investigation-workspace"
      >
        <div class="workbench-main" id="active-experiment">
          <div class="active-bench" [hidden]="comparisonOpen() || explanationOpen()">
            <div [hidden]="activeStationKey() !== 'scanner'">
              <section class="scan-activity">
                <img
                  class="scan-activity__scene"
                  src="/week1-incident-room-v1.webp"
                  alt="Four sealed mystery vials at the optical scanning station"
                />
                <div class="scan-activity__scrim" aria-hidden="true"></div>
                @if (selectedVial(); as vial) {
                  <div class="scanner">
                    <section class="scanner-visual">
                      <header>
                        <span><i></i> Optical channel</span><strong>Vial {{ vial.code }}</strong
                        ><small>6\xD7 magnification \xB7 equal lighting</small>
                      </header>
                      <figure [style.--vial-color]="vial.color">
                        <img
                          [src]="vial.image"
                          [alt]="'Magnified optical scan of Vial ' + vial.code"
                        />
                        <span class="scan-line" [class.running]="scanState() === 'scanning'"></span>
                        <span class="reticle" aria-hidden="true"></span>
                      </figure>
                    </section>
                    <section class="scanner-record">
                      <h2>What do you notice?</h2>
                      <details class="optional-markers">
                        <summary>Mark a feature</summary>
                        <div class="tag-bank" aria-label="Visible feature markers">
                          @for (tag of observationTags; track tag) {
                            <button
                              type="button"
                              [class.selected]="selectedTags().includes(tag)"
                              [attr.aria-pressed]="selectedTags().includes(tag)"
                              (click)="toggleTag(tag)"
                            >
                              {{ tag }}
                            </button>
                          }
                        </div>
                      </details>
                      <label
                        >My observation<textarea
                          rows="4"
                          [ngModel]="observation()"
                          (ngModelChange)="observation.set($event)"
                          placeholder="I can see\u2026"
                        ></textarea>
                      </label>
                      <button
                        class="primary-action"
                        type="button"
                        [disabled]="scanState() === 'scanning' || !observation().trim()"
                        (click)="captureScan()"
                      >
                        {{
                          scanState() === 'scanning'
                            ? 'Capturing result\u2026'
                            : 'Record this observation'
                        }}
                      </button>
                    </section>
                  </div>
                }
              </section>
            </div>
            @if (visitedStations().includes('properties')) {
              <div [hidden]="activeStationKey() !== 'properties'">
                <app-properties-lab
                  class="workbench-station"
                  [embedded]="true"
                  [selectedVialId]="selectedVial()?.vialId"
                  [savedResults]="propertyResults()"
                  (vialChanged)="onVialChanged($event)"
                  (captured)="captureStationResult($event)"
                />
              </div>
            }
            @if (visitedStations().includes('reaction')) {
              <div [hidden]="activeStationKey() !== 'reaction'">
                <app-reaction-bench
                  class="workbench-station"
                  [selectedVialId]="selectedVial()?.vialId"
                  [active]="
                    activeStationKey() === 'reaction' && workspacePair() !== 'final-investigation'
                  "
                  (vialChanged)="onVialChanged($event)"
                  (captured)="captureStationResult($event)"
                />
              </div>
            }
            @if (visitedStations().includes('conservation')) {
              <div [hidden]="activeStationKey() !== 'conservation'">
                <app-conservation-chamber
                  class="workbench-station"
                  (captured)="captureStationResult($event)"
                />
              </div>
            }
            @if (visitedStations().includes('restoration')) {
              <div [hidden]="activeStationKey() !== 'restoration'">
                <app-restoration-workspace
                  class="workbench-station"
                  [selectedVialId]="selectedVial()?.vialId"
                  (vialChanged)="onVialChanged($event)"
                  (captured)="captureStationResult($event)"
                />
              </div>
            }
            @if (visitedStations().includes('emergency')) {
              <div [hidden]="activeStationKey() !== 'emergency'">
                <app-emergency-response
                  class="workbench-station"
                  (captured)="captureStationResult($event)"
                />
              </div>
            }
          </div>
          <section class="workbench-comparison" id="comparison" [hidden]="!comparisonOpen()">
            <h2>Compare my results</h2>
            <p>
              Only recorded results appear here. Choose an untested cell to bring its tool to the
              bench, or a recorded cell to read the evidence. Earlier trials stay in your
              investigation record.
            </p>
            @for (record of comparisonMatrices(); track record.evidenceId) {
              <h3>{{ record.matrix.title }}</h3>
              <div class="comparison-scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Test</th>
                      @for (column of record.matrix.columnLabels; track column) {
                        <th scope="col">{{ column }}</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    @for (row of record.matrix.rows; track row.id) {
                      <tr>
                        <th scope="row">{{ row.label }}</th>
                        @for (cell of row.cells; track $index) {
                          <td>
                            <button
                              type="button"
                              [disabled]="selectionBusy() && !cell"
                              (click)="chooseResult(record.evidenceId, row.id, $index, !!cell)"
                            >
                              {{ cell || 'Not tested \xB7 choose tool' }}
                            </button>
                          </td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </section>
          <section class="workbench-explanation" id="explanation" [hidden]="!explanationOpen()">
            <h2>My explanation</h2>
            <p>
              Use a result from the evidence panel to link it here. Your measurements and earlier
              explanations stay in your record.
            </p>
            <app-investigation-working-theory
              [singlePage]="false"
              [theory]="currentTheory()"
              [theories]="runtime.hypotheses"
              [evidence]="evidence()"
              [saveState]="investigation.saveState()"
              (theorySaved)="saveTheory($event)"
              (theorySelected)="investigation.selectTheory($event)"
              (evidenceSelected)="inspectEvidence($event)"
              (investigateRequested)="openBench()"
              (finalRequested)="openFinalInvestigation()"
            />
          </section>
        </div>
        <aside id="evidence-dock" [hidden]="!evidenceDockOpen()">
          <app-workbench-evidence
            [evidence]="evidence()"
            [links]="workbenchLinks"
            [activityId]="activeActivityId()"
            [selectedId]="selectedEvidenceId()"
            [claim]="currentTheory()?.statement"
            (selected)="inspectEvidence($event)"
            (useTool)="useTool($event)"
            (useEvidence)="useInExplanation($event)"
            (classify)="classifyEvidence($event)"
            (noteSaved)="saveEvidenceNote($event)"
            (questionCreated)="createEvidenceQuestion($event)"
            (importanceChanged)="setEvidenceImportance($event)"
          />
        </aside>
      </main>
    </div>
    @if (workspacePair() === 'final-investigation') {
      <app-investigation-final-case
        [runtime]="runtime"
        [evidence]="evidence()"
        [ready]="finalReady()"
        [missingReadiness]="finalReadinessMissing()"
        [saveState]="investigation.saveState()"
        (caseBoardRequested)="selectWorkspace('analysis-theory')"
        (draftSaved)="saveFinalDraft($event)"
        (submitRequested)="submitFinalInvestigation()"
      />
    }
  }
  @if (drawer(); as openDrawer) {
    <button
      class="drawer-backdrop"
      type="button"
      aria-label="Close utility panel"
      (click)="drawer.set(undefined)"
    ></button>
    <aside
      class="utility-drawer"
      [attr.aria-label]="
        openDrawer === 'mission'
          ? 'Mission brief'
          : openDrawer === 'notebook'
            ? 'Notebook'
            : openDrawer === 'help'
              ? 'Help'
              : openDrawer === 'route'
                ? 'Route through the lab'
                : 'Locked phase requirements'
      "
    >
      <header>
        <span>{{
          openDrawer === 'mission'
            ? 'Mission brief'
            : openDrawer === 'notebook'
              ? 'Investigation notebook'
              : openDrawer === 'help'
                ? 'Workspace help'
                : openDrawer === 'route'
                  ? 'Route through the lab'
                  : 'Final readiness'
        }}</span>
        <button type="button" aria-label="Close" (click)="drawer.set(undefined)">\xD7</button>
      </header>
      @if (openDrawer === 'mission') {
        <div class="mission-brief">
          <span class="eyebrow">The Unlabeled Shelf</span>
          <h2>Restore the lab shelf with evidence.</h2>
          <dl>
            <div>
              <dt>Your role</dt>
              <dd>Student laboratory investigation team</dd>
            </div>
            <div>
              <dt>Situation</dt>
              <dd>Four sealed substances remain after their labels were separated.</dd>
            </div>
            <div>
              <dt>Stakes</dt>
              <dd>
                The shelf cannot return to use until each identification and position can be
                defended.
              </dd>
            </div>
            <div>
              <dt>Final mission</dt>
              <dd>
                Build a case file that identifies all four vials and recommends safe shelf
                positions.
              </dd>
            </div>
          </dl>

          <h3 class="drawer-subhead">Investigation phases</h3>
          <ol class="phase-list">
            @for (phase of phases(); track phase.id) {
              <li>
                <button
                  type="button"
                  [class.current]="phase.status === 'current'"
                  [class.complete]="phase.status === 'complete'"
                  [class.locked]="phase.status === 'locked'"
                  [attr.aria-label]="phase.title + ', ' + phase.status"
                  (click)="drawer.set(undefined); selectPhase(phase)"
                >
                  <span aria-hidden="true">{{
                    phase.status === 'complete'
                      ? '\u2713'
                      : phase.status === 'locked'
                        ? '\u{1F512}'
                        : phase.number
                  }}</span>
                  <span>
                    <strong>{{ phase.title }}</strong>
                    <small>{{ phase.instruction }}</small>
                  </span>
                </button>
              </li>
            }
          </ol>

          <button type="button" (click)="drawer.set(undefined)">Back to the lab</button>
        </div>
      } @else if (openDrawer === 'notebook') {
        <div class="notebook">
          <p>
            Keep questions here while you work. Use the evidence beside your bench to decide what to
            test next.
          </p>
          @for (question of questions(); track question.id) {
            <article>
              <span aria-hidden="true">?</span><strong>{{ question.text }}</strong>
            </article>
          }
          <label
            >Add a question<textarea
              rows="4"
              [ngModel]="notebookQuestion()"
              (ngModelChange)="notebookQuestion.set($event)"
              placeholder="What do I still need to know?"
            ></textarea>
          </label>
          <button type="button" (click)="addNotebookQuestion()">Save question</button>
        </div>
      } @else if (openDrawer === 'route') {
        <div class="route-guide">
          <h2>Every stop, in order, and what closes it.</h2>
          @if (nextRouteStep(); as next) {
            <p class="route-next">
              <span>You are here</span><strong>{{ next.number }} \xB7 {{ next.title }}</strong>
            </p>
          } @else {
            <p class="route-next">
              <span>All stations complete</span><strong>Build the final case</strong>
            </p>
          }

          <ol class="route-list">
            @for (step of labRoute(); track step.id) {
              <li [attr.data-status]="step.status">
                <span class="route-mark" aria-hidden="true">{{
                  step.status === 'complete' ? '\u2713' : step.number
                }}</span>
                <div>
                  <strong>{{ step.title }}</strong>
                  <small class="route-where">{{ step.where }}</small>
                  <p>{{ step.todo }}</p>
                  <p class="route-gate">
                    <span>Files when</span>
                    {{ step.completes }}
                  </p>
                </div>
              </li>
            }
          </ol>

          <h3 class="drawer-subhead">The final case also needs</h3>
          @if (finalReadinessMissing().length === 0) {
            <p class="route-clear">Everything is in place. The final investigation is open.</p>
          } @else {
            <ul class="route-missing">
              @for (item of finalReadinessMissing(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }

          @if (testingOverrideActive()) {
            <p class="route-override">
              <strong>Testing override is on.</strong>
              The final investigation is open even though the list above is unfinished. Turn
              <code>finalUnlockedForTesting</code> back to <code>false</code> before a class uses
              this.
            </p>
          }

          <button type="button" (click)="drawer.set(undefined)">Back to the lab</button>
        </div>
      } @else if (openDrawer === 'help') {
        <div class="help-panel">
          <span aria-hidden="true">?</span>
          <h2>Use the connection between the panels.</h2>
          <p>{{ workspaceHelp() }}</p>
          <button type="button" (click)="drawer.set(undefined)">Keep investigating</button>
        </div>
      } @else {
        <div class="locked-phase">
          <span aria-hidden="true">\u{1F512}</span>
          <h2>Final investigation is not ready yet.</h2>
          <p>Complete these reasoning steps before the official final case opens:</p>
          <ul>
            @for (item of finalReadinessMissing(); track item) {
              <li>{{ item }}</li>
            }
          </ul>
          <button
            type="button"
            (click)="
              drawer.set(undefined);
              selectWorkspace(currentTheory() ? 'theory-investigate' : 'analysis-theory')
            "
          >
            Return to investigation
          </button>
        </div>
      }
    </aside>
  }
</div>
`, styles: ['/* src/app/features/mystery-investigation/mystery-investigation.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  color: #eaf4f8;\n  background: #06111b;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n:host,\n:host *,\n:host *::before,\n:host *::after {\n  box-sizing: border-box;\n}\nbutton,\ntextarea,\ninput,\nselect,\na {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\n.investigation-shell {\n  min-height: 100dvh;\n  background:\n    radial-gradient(\n      circle at 15% -20%,\n      rgba(35, 109, 120, 0.18),\n      transparent 36rem),\n    #06111b;\n}\n.case-bar {\n  position: relative;\n  z-index: 20;\n  display: grid;\n  min-height: 3.4rem;\n  grid-template-columns: auto auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.85rem;\n  border-bottom: 1px solid rgba(137, 179, 199, 0.18);\n  padding: 0.4rem 1rem;\n  background: rgba(5, 16, 25, 0.97);\n}\n.project-identity {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.55rem;\n  border: 0;\n  padding: 0;\n  text-align: left;\n  background: transparent;\n  cursor: pointer;\n}\n.project-seal {\n  display: grid;\n  width: 2.2rem;\n  height: 2.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #54aeb3;\n  border-radius: 50%;\n  color: #b7f4ef;\n  background:\n    radial-gradient(\n      circle,\n      #174652,\n      #0a222f);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n}\n.project-identity > span:last-child {\n  display: grid;\n  gap: 0.02rem;\n}\n.project-identity strong {\n  color: #f0f7fa;\n  font-size: 0.86rem;\n}\n.project-identity em {\n  color: #68c6c4;\n  font-size: 0.56rem;\n  font-style: normal;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.mission-question {\n  min-width: 0;\n  margin: 0;\n  overflow: hidden;\n  color: #a9c2cd;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.case-meters {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.meter {\n  display: grid;\n  gap: 0.04rem;\n  border-left: 1px solid #294352;\n  padding-left: 0.75rem;\n}\n.meter small,\n.eyebrow,\n.activity-header small,\n.activity-header dt {\n  color: #7f9ead;\n  font-size: 0.56rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.meter strong {\n  color: #dcebf1;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n.save-dot {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #86a3b0;\n  font-size: 0.62rem;\n  font-weight: 700;\n}\n.save-dot i {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #62c9a4;\n}\n.save-dot i.pending {\n  background: #e0b64a;\n}\n.drawer-subhead {\n  margin: 0.4rem 0 0;\n  color: #9fc0cc;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.phase-list {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.3rem;\n  list-style: none;\n}\n.phase-list button {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  gap: 0.55rem;\n  border: 1px solid #26465a;\n  border-radius: 0.45rem;\n  padding: 0.45rem 0.55rem;\n  color: #a5c0cc;\n  text-align: left;\n  background: rgba(10, 30, 42, 0.7);\n  cursor: pointer;\n}\n.phase-list button > span:first-child {\n  display: grid;\n  width: 1.5rem;\n  height: 1.5rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.phase-list button > span:last-child {\n  display: grid;\n  gap: 0.1rem;\n}\n.phase-list strong {\n  color: #e6f3f7;\n  font-size: 0.76rem;\n}\n.phase-list small {\n  color: #86a4b1;\n  font-size: 0.64rem;\n  line-height: 1.3;\n}\n.phase-list button.current {\n  border-color: #6ecac6;\n  background: rgba(20, 69, 79, 0.8);\n}\n.phase-list button.complete > span:first-child {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.phase-list button.locked {\n  opacity: 0.62;\n}\n.route-guide h2 {\n  margin: 0 0 0.5rem;\n  color: #eaf6fa;\n  font-size: 0.98rem;\n}\n.route-next {\n  display: grid;\n  gap: 0.1rem;\n  margin: 0 0 0.7rem;\n  border-left: 3px solid #6ecac6;\n  border-radius: 0 0.4rem 0.4rem 0;\n  padding: 0.45rem 0.6rem;\n  background: rgba(20, 69, 79, 0.55);\n}\n.route-next span {\n  color: #7fd0cd;\n  font-size: 0.56rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.route-next strong {\n  color: #eaf6fa;\n  font-size: 0.8rem;\n}\n.route-list {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0 0 0.8rem;\n  padding: 0;\n  list-style: none;\n}\n.route-list li {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.55rem;\n  border: 1px solid #26465a;\n  border-radius: 0.45rem;\n  padding: 0.5rem 0.6rem;\n  background: rgba(10, 30, 42, 0.7);\n}\n.route-list li[data-status=current] {\n  border-color: #6ecac6;\n  background: rgba(20, 69, 79, 0.8);\n}\n.route-list li[data-status=complete] {\n  opacity: 0.72;\n}\n.route-mark {\n  display: grid;\n  width: 1.5rem;\n  height: 1.5rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  color: #cbe4ec;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.route-list li[data-status=complete] .route-mark {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.route-list strong {\n  color: #e6f3f7;\n  font-size: 0.78rem;\n}\n.route-where {\n  display: block;\n  color: #7fd0cd;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n}\n.route-list p {\n  margin: 0.28rem 0 0;\n  color: #9db6c2;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.route-gate span {\n  color: #d8b25f;\n  font-weight: 800;\n}\n.route-missing {\n  margin: 0.35rem 0 0.7rem;\n  padding-left: 1.1rem;\n  color: #e0c98b;\n  font-size: 0.7rem;\n  line-height: 1.5;\n}\n.route-clear {\n  margin: 0.35rem 0 0.7rem;\n  color: #8fe0c4;\n  font-size: 0.7rem;\n}\n.route-override {\n  margin: 0 0 0.7rem;\n  border: 1px dashed #b07f3a;\n  border-radius: 0.45rem;\n  padding: 0.55rem 0.6rem;\n  color: #f0d8a6;\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.route-override strong {\n  display: block;\n  color: #ffd483;\n}\n.route-override code {\n  color: #ffe6b4;\n  font-size: 0.66rem;\n}\n.system-state {\n  display: flex;\n  min-height: 24rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.9rem;\n  border: 1px solid #2c4c5d;\n  border-radius: 0.8rem;\n  background: linear-gradient(rgba(5, 19, 29, 0.72), rgba(5, 19, 29, 0.92)), url(/lab-investigation-room-v2.webp) center/cover;\n}\n.system-state > div {\n  display: grid;\n  gap: 0.15rem;\n}\n.system-state small {\n  color: #77c9c6;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.system-state strong {\n  color: #edf8fb;\n  font-size: 0.9rem;\n}\n.system-state p {\n  max-width: 35rem;\n  margin: 0.3rem 0 0;\n  color: #cfb4b4;\n  font-size: 0.7rem;\n}\n.system-state.error > span {\n  display: grid;\n  width: 2rem;\n  height: 2rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #2c1111;\n  background: #d78c8c;\n  font-weight: 900;\n}\n.loader {\n  width: 1.8rem;\n  height: 1.8rem;\n  border: 2px solid #365b6c;\n  border-top-color: #76d6d1;\n  border-radius: 50%;\n  animation: spin 900ms linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.activity-workspace {\n  min-height: calc(100dvh - 13rem);\n  overflow: hidden;\n  border: 1px solid #2d4f61;\n  border-radius: 0.8rem;\n  background: #081722;\n}\n.activity-header {\n  display: grid;\n  grid-template-columns: auto minmax(15rem, 1fr) minmax(14rem, 0.7fr);\n  align-items: center;\n  gap: 0.85rem;\n  border-bottom: 1px solid #315263;\n  padding: 0.65rem 0.8rem;\n  background: #0a2130;\n}\n.activity-header > button {\n  align-self: stretch;\n  border: 1px solid #3a6173;\n  border-radius: 0.48rem;\n  padding: 0.5rem 0.65rem;\n  color: #a9d9d8;\n  background: #0b2a38;\n  cursor: pointer;\n  font-size: 0.65rem;\n}\n.activity-header h1,\n.scanner-record h2 {\n  margin: 0.12rem 0 0;\n  color: #f0f8fb;\n  font-size: 1rem;\n}\n.activity-header p {\n  margin: 0.1rem 0 0;\n  color: #91a9b6;\n  font-size: 0.65rem;\n}\n.activity-header dl {\n  display: grid;\n  gap: 0.3rem;\n  margin: 0;\n}\n.activity-header dl div {\n  display: grid;\n  grid-template-columns: 4rem 1fr;\n  gap: 0.4rem;\n}\n.activity-header dd {\n  margin: 0;\n  color: #c0d0d7;\n  font-size: 0.61rem;\n}\n.plugin-workspace {\n  position: relative;\n  min-height: max(34rem, 100dvh - 19rem);\n  overflow: hidden;\n}\n.scan-activity {\n  position: relative;\n  min-height: 34rem;\n  overflow: hidden;\n}\n.scan-activity__scene,\n.scan-activity__scrim {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.scan-activity__scene {\n  object-fit: cover;\n}\n.scan-activity__scrim {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 15, 23, 0.2),\n      rgba(4, 15, 23, 0.86) 55%,\n      rgba(4, 15, 23, 0.94));\n}\n.scanner {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  width: min(64rem, 100% - 2rem);\n  min-height: 26rem;\n  grid-template-columns: minmax(16rem, 1.15fr) minmax(16rem, 0.85fr);\n  gap: 0.75rem;\n  margin: 1rem auto 5.6rem;\n}\n.scanner-visual,\n.scanner-record {\n  border: 1px solid rgba(111, 169, 190, 0.45);\n  border-radius: 0.75rem;\n  background: rgba(5, 21, 31, 0.92);\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.35);\n}\n.scanner-visual > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.4rem;\n  border-bottom: 1px solid #294b5e;\n  padding: 0.6rem 0.75rem;\n}\n.scanner-visual header span,\n.scanner-visual header small {\n  color: #83a5b5;\n  font-size: 0.6rem;\n}\n.scanner-visual header strong {\n  color: #e9f5f8;\n  font-size: 0.75rem;\n}\n.scanner-visual figure {\n  position: relative;\n  display: grid;\n  min-height: 22rem;\n  place-items: center;\n  overflow: hidden;\n  margin: 0;\n  background:\n    radial-gradient(\n      circle,\n      color-mix(in srgb, var(--vial-color) 25%, #102330),\n      #06131d 68%);\n}\n.scanner-visual figure > img {\n  width: min(17rem, 72%);\n  max-height: 20rem;\n  object-fit: contain;\n  filter: drop-shadow(0 1.2rem 1.6rem rgba(0, 0, 0, 0.55));\n}\n.reticle {\n  position: absolute;\n  width: 75%;\n  aspect-ratio: 1;\n  border: 1px solid rgba(118, 218, 213, 0.34);\n  border-radius: 50%;\n}\n.reticle::before,\n.reticle::after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  background: rgba(118, 218, 213, 0.25);\n  content: "";\n  transform: translate(-50%, -50%);\n}\n.reticle::before {\n  width: 100%;\n  height: 1px;\n}\n.reticle::after {\n  width: 1px;\n  height: 100%;\n}\n.scan-line {\n  position: absolute;\n  z-index: 2;\n  top: 12%;\n  left: 8%;\n  width: 84%;\n  height: 2px;\n  opacity: 0;\n  background: #9cfff8;\n  box-shadow: 0 0 1rem #62dfd8;\n}\n.scan-line.running {\n  opacity: 1;\n  animation: scan 1.1s ease-in-out infinite alternate;\n}\n@keyframes scan {\n  to {\n    top: 86%;\n  }\n}\n.scanner-record {\n  align-self: center;\n  padding: 1rem;\n}\n.scanner-record > p {\n  margin: 0.3rem 0 0;\n  color: #96afbb;\n  font-size: 0.72rem;\n}\n.tag-bank {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 0.75rem;\n}\n.tag-bank button {\n  border: 1px solid #3c6070;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  color: #a9bfca;\n  background: #0b2432;\n  cursor: pointer;\n  font-size: 0.62rem;\n}\n.tag-bank button.selected {\n  border-color: #76d7d1;\n  color: #082124;\n  background: #74d2cd;\n}\n.scanner-record label {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.75rem;\n  color: #b6cbd4;\n  font-size: 0.67rem;\n  font-weight: 700;\n}\n.scanner-record textarea {\n  border: 1px solid #36596b;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #edf8fa;\n  background: #071923;\n  resize: vertical;\n}\n.primary-action {\n  width: 100%;\n  margin-top: 0.7rem;\n  border: 1px solid #7fe4dd;\n  border-radius: 0.5rem;\n  padding: 0.62rem;\n  color: #062128;\n  background: #77d6d1;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 850;\n}\n.primary-action:disabled {\n  cursor: wait;\n  opacity: 0.65;\n}\n.vial-switcher {\n  position: absolute;\n  z-index: 3;\n  right: 1rem;\n  bottom: 0.8rem;\n  left: 1rem;\n  display: flex;\n  justify-content: center;\n  gap: 0.45rem;\n}\n.vial-switcher button {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #38596a;\n  border-radius: 0.5rem;\n  padding: 0.38rem 0.55rem;\n  color: #a9bdc7;\n  background: rgba(7, 23, 34, 0.92);\n  cursor: pointer;\n}\n.vial-switcher button.active {\n  border-color: #71d4cf;\n  color: #f0ffff;\n}\n.vial-switcher button > span {\n  display: grid;\n  width: 1.45rem;\n  height: 1.45rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: var(--vial-color);\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.vial-switcher small {\n  font-size: 0.58rem;\n}\n.next-action {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.next-action span {\n  color: #d8b75e;\n  font-size: 0.55rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.next-action strong {\n  overflow: hidden;\n  color: #c8d8df;\n  font-size: 0.66rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.drawer-backdrop {\n  position: fixed;\n  z-index: 80;\n  inset: 0;\n  border: 0;\n  background: rgba(2, 9, 14, 0.72);\n  cursor: default;\n}\n.utility-drawer {\n  position: fixed;\n  z-index: 90;\n  top: 0;\n  right: 0;\n  display: grid;\n  width: min(28rem, 100%);\n  height: 100dvh;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  border-left: 1px solid #3a5d70;\n  color: #e8f3f7;\n  background: #091b27;\n  box-shadow: -1.5rem 0 4rem rgba(0, 0, 0, 0.4);\n}\n.utility-drawer > header {\n  display: flex;\n  min-height: 3.8rem;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #2c4959;\n  padding: 0 0.9rem;\n  color: #8dcfcd;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.utility-drawer > header button {\n  display: grid;\n  width: 2rem;\n  height: 2rem;\n  place-items: center;\n  border: 1px solid #38596a;\n  border-radius: 0.45rem;\n  background: #102735;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.mission-brief,\n.notebook,\n.help-panel,\n.locked-phase {\n  padding: 1rem;\n}\n.mission-brief h2,\n.help-panel h2,\n.locked-phase h2 {\n  margin: 0.35rem 0 0;\n  color: #f0f7fa;\n  font-size: 1.35rem;\n}\n.mission-brief dl {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 1rem;\n}\n.mission-brief dl div {\n  border-left: 2px solid #3e7579;\n  padding-left: 0.65rem;\n}\n.mission-brief dt {\n  color: #78c5c3;\n  font-size: 0.6rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.mission-brief dd {\n  margin: 0.18rem 0 0;\n  color: #b7c9d1;\n  font-size: 0.72rem;\n  line-height: 1.48;\n}\n.mission-brief button,\n.notebook > button,\n.help-panel button,\n.locked-phase button {\n  margin-top: 1rem;\n  border: 1px solid #5ec2bd;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.7rem;\n  color: #062128;\n  background: #72d1cc;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n.notebook > p,\n.help-panel p,\n.locked-phase p {\n  margin: 0;\n  color: #98b0bc;\n  font-size: 0.72rem;\n  line-height: 1.5;\n}\n.notebook article {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin-top: 0.5rem;\n  border: 1px solid #334f60;\n  border-radius: 0.5rem;\n  padding: 0.55rem;\n  background: #0d2432;\n}\n.notebook article span {\n  display: grid;\n  width: 1.25rem;\n  height: 1.25rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #201908;\n  background: #e0b958;\n  font-size: 0.62rem;\n}\n.notebook article strong {\n  color: #dce8ee;\n  font-size: 0.68rem;\n}\n.notebook label {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.9rem;\n  color: #b4c7d0;\n  font-size: 0.68rem;\n  font-weight: 700;\n}\n.notebook textarea {\n  border: 1px solid #365567;\n  border-radius: 0.5rem;\n  padding: 0.6rem;\n  color: #eef7fa;\n  background: #061722;\n  resize: vertical;\n}\n.help-panel > span,\n.locked-phase > span {\n  display: grid;\n  width: 2.2rem;\n  height: 2.2rem;\n  place-items: center;\n  border: 1px solid #5ba9aa;\n  border-radius: 50%;\n  color: #c8fffb;\n  background: #153b45;\n  font-weight: 900;\n}\n.help-panel p,\n.locked-phase p {\n  margin-top: 0.6rem;\n}\n.locked-phase ul {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.8rem;\n  padding-left: 1.1rem;\n  color: #c1d0d7;\n  font-size: 0.7rem;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\ninput:focus-visible,\nselect:focus-visible,\na:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n@media (max-width: 960px) {\n  .case-bar {\n    grid-template-columns: auto auto minmax(0, 1fr);\n    row-gap: 0.35rem;\n  }\n  .case-meters {\n    grid-column: 1/-1;\n    justify-content: flex-end;\n  }\n  .activity-header {\n    grid-template-columns: auto 1fr;\n  }\n  .activity-header dl {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 760px) {\n  .case-bar {\n    grid-template-columns: auto 1fr auto;\n  }\n  .mission-question {\n    display: none;\n  }\n  .bench-rail {\n    padding-inline: 0.55rem;\n  }\n  .rail-item {\n    min-width: 7.4rem;\n  }\n  .bench {\n    min-height: auto;\n  }\n  .workspace-area {\n    padding: 0.45rem;\n  }\n  .mobile-pair-toggle {\n    position: relative;\n    z-index: 2;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.3rem;\n    margin-bottom: 0.4rem;\n  }\n  .mobile-pair-toggle button {\n    border: 1px solid var(--case-edge, #315263);\n    border-radius: 0.45rem;\n    padding: 0.45rem;\n    color: var(--case-muted, #8ea8b4);\n    background: rgba(0, 0, 0, 0.4);\n  }\n  .mobile-pair-toggle button.active {\n    border-color: var(--case-accent, #69c9c5);\n    color: var(--case-ink, #efffff);\n    background: #15404a;\n  }\n  .activity-header {\n    grid-template-columns: 1fr;\n  }\n  .activity-header > button {\n    justify-self: start;\n  }\n  .scanner {\n    grid-template-columns: 1fr;\n    margin-bottom: 6rem;\n  }\n  .scanner-visual figure {\n    min-height: 15rem;\n  }\n  .vial-switcher {\n    overflow-x: auto;\n    justify-content: flex-start;\n  }\n}\n@media (max-width: 520px) {\n  .case-bar {\n    padding-inline: 0.65rem;\n  }\n  .project-identity > span:last-child {\n    display: none;\n  }\n  .meter {\n    padding-left: 0.5rem;\n  }\n  .save-dot {\n    display: none;\n  }\n  .station-cards {\n    grid-template-columns: 1fr;\n  }\n  .context-alert {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .context-alert button {\n    margin-left: 2.35rem;\n  }\n  .context-alert button.dismiss {\n    position: absolute;\n    top: 0.35rem;\n    right: 0.4rem;\n  }\n  .scanner {\n    width: calc(100% - 0.8rem);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n.case-bar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  padding: 10px 22px;\n}\n.case-bar .project-identity {\n  margin-right: auto;\n}\n.case-bar > button,\n.equipment-menu summary {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #597785;\n  border-radius: 8px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n  font: 700 13px Arial;\n}\n.current-vial {\n  display: none;\n}\n.equipment-menu {\n  position: relative;\n}\n.equipment-menu > div {\n  position: absolute;\n  right: 0;\n  top: 100%;\n  width: 240px;\n  display: grid;\n  gap: 6px;\n  padding: 12px;\n  background: #15313d;\n  z-index: 30;\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);\n}\n.equipment-menu button {\n  min-height: 44px;\n  padding: 8px;\n  color: #fff7d5;\n  border: 1px solid #607d84;\n  background: transparent;\n  border-radius: 6px;\n  text-align: left;\n  cursor: pointer;\n}\n.workbench-layout {\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1320px;\n  margin: auto;\n}\n.workbench-layout.evidence-open {\n  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr);\n}\n.workbench-selection {\n  justify-content: center;\n  padding: 12px;\n}\n.scanner {\n  max-width: 1000px;\n  margin: auto;\n}\n.scan-activity {\n  min-height: 0;\n}\n.save-dot {\n  font-size: 11px;\n}\n.workbench-stages button {\n  min-height: 44px;\n}\n@media (max-width: 850px) {\n  .workbench-layout.evidence-open {\n    grid-template-columns: 1fr;\n  }\n  .case-bar {\n    padding: 8px 12px;\n  }\n  .workbench-stages {\n    order: 3;\n    flex: 1 0 100%;\n    justify-content: center;\n  }\n  .workbench-selection {\n    flex-wrap: wrap;\n  }\n}\n.workbench .workbench-layout:not(.evidence-open) {\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1120px;\n}\n.workbench .workbench-selection {\n  justify-content: center;\n  gap: 16px;\n}\n.workbench .workbench-selection > strong {\n  display: none;\n}\n.workbench .scanner-record h2 {\n  font-size: 25px;\n}\n.workbench .scanner-record textarea {\n  font-size: 18px;\n}\n.workbench .scan-activity {\n  padding-bottom: 0;\n  min-height: 0;\n}\n.active-bench[hidden],\n.workbench-comparison[hidden],\n.workbench-explanation[hidden] {\n  display: none !important;\n}\n/*# sourceMappingURL=mystery-investigation.component.css.map */\n', "/* src/app/features/mystery-investigation/workbench.scss */\n:host [hidden] {\n  display: none !important;\n}\n.workbench button {\n  cursor: pointer;\n}\n.workbench button:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.workbench-stages,\n.workbench-selection,\n.workbench-vials {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.workbench-stages {\n  justify-content: center;\n}\n.workbench-stages button,\n.workbench-selection button,\n.workbench-next button,\n.workbench-update button {\n  border: 1px solid #42606b;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.7rem;\n  background: #102c37;\n  font-size: 0.78rem;\n}\n.workbench button[aria-pressed=true] {\n  border-color: #79ded0;\n  background-color: #19424b;\n  box-shadow: inset 0 -2px #79ded0;\n}\n.workbench-selection {\n  padding: 0.65rem 1rem;\n  background: #0b202b;\n}\n.workbench-selection > strong {\n  color: #aec9d2;\n  font-size: 0.8rem;\n}\n.workbench-vials {\n  margin-right: auto;\n}\n.workbench-vials button {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.25rem 0.65rem 0.25rem 0.25rem;\n}\n.workbench-vials img {\n  width: 2.2rem;\n  height: 2.2rem;\n  border-radius: 0.3rem;\n  object-fit: cover;\n}\n.workbench-tools {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 0.45rem;\n  padding: 0.65rem 1rem;\n}\n.workbench-tools button {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border: 1px solid #355462;\n  border-radius: 0.6rem;\n  padding: 0.45rem;\n  text-align: left;\n  background: #0d2531;\n}\n.workbench-tools button > span:last-child {\n  display: grid;\n  gap: 0.15rem;\n}\n.workbench-tools strong {\n  font-size: 0.8rem;\n}\n.workbench-tools small,\n.workbench-tools em {\n  color: #a7c0ca;\n  font-size: 0.68rem;\n  font-style: normal;\n}\n.tool-thumb {\n  width: 3rem;\n  height: 3.8rem;\n  flex-shrink: 0;\n  border-radius: 0.4rem;\n  background-size: cover;\n  background-position: center;\n}\n[data-station=scanner] .tool-thumb {\n  background-image: url(/week1-incident-room-v1.webp);\n}\n[data-station=properties] .tool-thumb {\n  background-image: url(/week2-test-scenes-v2.webp);\n}\n[data-station=reaction] .tool-thumb {\n  background-image: url(/week3-test-scenes-v2.webp);\n}\n[data-station=conservation] .tool-thumb {\n  background-image: url(/conservation-test-scenes-v2.webp);\n}\n[data-station=restoration] .tool-thumb {\n  background-image: url(/week4-test-scenes-v2.webp);\n}\n[data-station=emergency] .tool-thumb {\n  background-image: url(/lab-investigation-room-v2.webp);\n}\n.workbench-next,\n.workbench-update {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  justify-content: space-between;\n  margin: 0 1rem 0.75rem;\n  padding: 0.5rem 0.75rem;\n  border-left: 3px solid #66c9bd;\n  background: #122d37;\n  font-size: 0.8rem;\n}\n.workbench-next p {\n  margin: 0;\n  line-height: 1.5;\n}\n.workbench-next strong {\n  margin-right: 0.5rem;\n  color: #93e7d8;\n}\n.workbench-next button {\n  flex-shrink: 0;\n}\n.workbench-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(300px, 350px);\n  gap: 0.8rem;\n  padding: 0 1rem 1rem;\n  align-items: start;\n}\n.workbench-main {\n  min-width: 0;\n  container-type: inline-size;\n}\n.workbench-main > div {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid #355462;\n  border-radius: 0.8rem;\n  min-height: 34rem;\n  background: #081b27;\n}\n#evidence-dock {\n  position: sticky;\n  top: 0.5rem;\n  min-width: 0;\n  max-height: calc(100dvh - 1rem);\n  overflow-y: auto;\n  border-radius: 0.7rem;\n}\n.workbench-comparison,\n.workbench-explanation {\n  margin-top: 0.8rem;\n  padding: 0.8rem;\n  border: 1px solid #355462;\n  border-radius: 0.65rem;\n  background: #0d2531;\n}\n.workbench-main summary {\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.95rem;\n  padding: 0.3rem;\n}\n.workbench-main details > p {\n  color: #aac4cf;\n  font-size: 0.8rem;\n  line-height: 1.5;\n}\n.workbench-comparison h3 {\n  font-size: 0.9rem;\n}\n.comparison-scroll {\n  overflow-x: auto;\n}\n.comparison-scroll table {\n  width: 100%;\n  table-layout: fixed;\n  min-width: 580px;\n  border-collapse: collapse;\n  font-size: 0.75rem;\n}\n.comparison-scroll th,\n.comparison-scroll td {\n  padding: 0.5rem;\n  border: 1px solid #38535e;\n  text-align: left;\n  vertical-align: top;\n  overflow-wrap: anywhere;\n}\n.comparison-scroll td button {\n  width: 100%;\n  min-height: 3rem;\n  border: 0;\n  color: #b3e4dc;\n  background: transparent;\n  font-size: inherit;\n  text-align: left;\n  line-height: 1.5;\n}\n.workbench .scanner {\n  width: calc(100% - 1.5rem);\n  margin: 0.75rem;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n}\n.workbench .scanner-visual figure {\n  min-height: 20rem;\n}\n.workbench .scanner-record {\n  padding: 1rem;\n}\n@container (max-width: 620px) {\n  .workbench .scanner {\n    grid-template-columns: 1fr;\n  }\n  .workbench .scanner-visual figure {\n    min-height: 15rem;\n  }\n}\n@media (max-width: 1200px) {\n  .workbench-tools {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .workbench-stages {\n    grid-column: 1/-1;\n    grid-row: 2;\n  }\n  .case-bar {\n    grid-template-columns: auto 1fr auto;\n  }\n}\n@media (max-width: 800px) {\n  .workbench-layout {\n    grid-template-columns: 1fr;\n    padding-inline: 0.5rem;\n  }\n  #evidence-dock {\n    position: static;\n    max-height: none;\n  }\n  .workbench-tools {\n    padding-inline: 0.5rem;\n  }\n  .workbench-next {\n    margin-inline: 0.5rem;\n  }\n}\n@media (max-width: 520px) {\n  .workbench-tools {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .workbench .project-identity > span:last-child {\n    display: grid;\n  }\n  .workbench-next {\n    flex-wrap: wrap;\n  }\n  .workbench-vials {\n    gap: 0.25rem;\n  }\n  .workbench-vials button {\n    padding-right: 0.3rem;\n    font-size: 0.7rem;\n  }\n  .workbench-vials img {\n    width: 1.8rem;\n    height: 1.8rem;\n  }\n}\n.current-vial {\n  color: #f3e4bd;\n  font-size: 13px;\n  font-weight: 700;\n}\n.evidence-check {\n  max-width: 380px;\n  font-size: 14px;\n}\n.evidence-check summary {\n  cursor: pointer;\n}\n/*# sourceMappingURL=workbench.css.map */\n", "/* src/app/features/mystery-investigation/focused-workbench.scss */\n:host {\n  display: block;\n}\n.workbench {\n  min-height: 100dvh;\n}\n.workbench .workbench-layout,\n.workbench .workbench-layout:not(.evidence-open) {\n  max-width: none;\n  padding: 0;\n}\n.workbench-main > div {\n  border: 0;\n  border-radius: 0;\n  min-height: 100dvh;\n}\n.workbench-selection {\n  position: absolute;\n  top: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 0;\n}\n.workbench-selection[hidden] {\n  display: none;\n}\n.workbench-vials button {\n  min-height: 40px;\n  padding: 4px 10px;\n  background: rgba(16, 43, 53, 0.8745098039);\n}\n.workbench-vials img {\n  display: none;\n}\n.focus-evidence {\n  position: fixed;\n  top: calc(var(--project-navigation-height, 0px) + 14px);\n  right: 66px;\n  z-index: 80;\n  min-height: 40px;\n  border: 1px solid rgba(138, 166, 175, 0.5019607843);\n  border-radius: 22px;\n  padding: 8px 14px;\n  color: #eef9f9;\n  background: rgba(16, 43, 53, 0.9333333333);\n  cursor: pointer;\n}\n.workbench .scan-activity {\n  display: grid;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 100dvh;\n  padding: 82px 24px 32px;\n}\n.workbench .scanner {\n  width: 100%;\n  margin: auto;\n  background: rgba(10, 32, 43, 0.8666666667);\n  border-radius: 20px;\n}\n.workbench .scanner-visual header {\n  justify-content: center;\n}\n.scanner-visual header > span,\n.scanner-visual header > small {\n  display: none;\n}\n.workbench-explanation {\n  box-sizing: border-box;\n  padding: 90px max(24px, (100% - 700px) / 2) 32px;\n  background: linear-gradient(rgba(3, 16, 29, 0.5333333333), rgba(3, 16, 29, 0.6)), url(/week1-incident-room-v1.webp) center/cover;\n}\n.workbench-explanation > h2,\n.workbench-explanation > p {\n  display: none;\n}\n.optional-markers {\n  margin-bottom: 16px;\n}\n.optional-markers summary {\n  cursor: pointer;\n  color: #b7ced5;\n  font-size: 13px;\n}\n.workbench-update {\n  position: fixed;\n  bottom: 16px;\n  left: 16px;\n  right: 16px;\n  z-index: 60;\n}\n.workbench-layout.evidence-open {\n  padding-top: 72px;\n}\n@media (max-width: 700px) {\n  .workbench-selection {\n    top: 66px;\n    width: max-content;\n  }\n  .workbench .scan-activity {\n    padding: 122px 12px 20px;\n  }\n  .workbench .scanner {\n    grid-template-columns: 1fr;\n  }\n  .workbench .scanner-visual figure {\n    min-height: 200px;\n  }\n}\n/*# sourceMappingURL=focused-workbench.css.map */\n"] }]
  }], () => [], { propertiesLab: [{ type: ViewChild, args: [forwardRef(() => PropertiesLabComponent), { isSignal: true }] }], reactionLab: [{ type: ViewChild, args: [forwardRef(() => ReactionBenchComponent), { isSignal: true }] }], theoryEditor: [{ type: ViewChild, args: [forwardRef(() => InvestigationWorkingTheoryComponent), { isSignal: true }] }], evidenceDock: [{ type: ViewChild, args: [forwardRef(() => WorkbenchEvidenceComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MysteryInvestigationComponent, { className: "MysteryInvestigationComponent", filePath: "src/app/features/mystery-investigation/mystery-investigation.component.ts", lineNumber: 235 });
})();
function asClassification(value) {
  return value === "supports" || value === "uncertain" || value === "contradicts" ? value : void 0;
}
function readableType(value) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}
function studentEvidenceText(content) {
  if (typeof content === "object" && content !== null && "text" in content && typeof content.text === "string") {
    return content.text;
  }
  return typeof content === "string" ? content : "Student-created investigation record";
}
function evidenceTitle(evidenceId) {
  return mysteryEvidenceCatalog.find((evidence) => evidence.id === evidenceId)?.title ?? "Investigation result";
}
function evidenceResultMatrix(evidenceId, activities) {
  if (evidenceId === "evidence-property-trials") {
    const activity = activities["activity-property-comparison"];
    const results = activity?.resultHistory ?? (activity?.lastResult ? [activity.lastResult] : []);
    const cells = /* @__PURE__ */ new Map();
    for (const result of results) {
      const trial = asRecord(result.outputs);
      const inputs = asRecord(trial?.["inputs"]);
      const outputs = asRecord(trial?.["outputs"]);
      const vialId = stringValue(inputs?.["specimen"]);
      const testId = stringValue(inputs?.["test"]);
      if (vialId !== void 0 && testId !== void 0 && outputs !== void 0) {
        cells.set(`${testId}::${vialId}`, summarizeResult(outputs));
      }
    }
    return resultMatrix("Four-vial physical-property record", physicalTests, cells);
  }
  if (evidenceId === "evidence-reaction-trials") {
    const activity = activities["activity-reaction-comparison"];
    const results = activity?.resultHistory ?? (activity?.lastResult ? [activity.lastResult] : []);
    const cells = /* @__PURE__ */ new Map();
    for (const result of results) {
      const trial = asRecord(result.outputs);
      const stages = trial?.["stages"];
      const trialVialId = stringValue(trial?.["vialId"]);
      if (Array.isArray(stages)) {
        for (const stage of stages) {
          const record = asRecord(stage);
          const testId2 = stringValue(record?.["reagent"]);
          const vialId = stringValue(record?.["vialId"]) ?? trialVialId;
          const output2 = asRecord(record?.["output"]);
          if (testId2 !== void 0 && vialId !== void 0 && output2 !== void 0) {
            cells.set(`${testId2}::${vialId}`, summarizeResult(output2));
          }
        }
        continue;
      }
      const testId = stringValue(trial?.["reagent"]);
      const comparisons = trial?.["comparisons"];
      if (testId === void 0 || !Array.isArray(comparisons)) {
        continue;
      }
      for (const comparison of comparisons) {
        const record = asRecord(comparison);
        const vialId = stringValue(record?.["vialId"]);
        const output2 = asRecord(record?.["output"]);
        if (vialId !== void 0 && output2 !== void 0) {
          cells.set(`${testId}::${vialId}`, summarizeResult(output2));
        }
      }
    }
    return resultMatrix("Four-vial chemical-screening record", reactionTests, cells);
  }
  return void 0;
}
function resultMatrix(title, tests, values) {
  const vialIds = mysteryVials.map((vial) => vial.vialId);
  return {
    title,
    columnLabels: mysteryVials.map((vial) => `Vial ${vial.code}`),
    rows: tests.map((test) => ({
      id: test.id,
      label: test.title,
      cells: vialIds.map((vialId) => values.get(`${test.id}::${vialId}`))
    }))
  };
}
function summarizeResult(result) {
  return Object.entries(result).map(([key, value]) => `${readableResultLabel(key)}: ${String(value)}`).join(" \xB7 ");
}
function readableResultLabel(value) {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function stringValue(value) {
  return typeof value === "string" ? value : void 0;
}
export {
  MysteryInvestigationComponent
};
//# debugId=c37ccdb3-f221-5883-bb14-878b2d1cf73a
//# sourceMappingURL=chunk-XXHQGXF5.js.map
