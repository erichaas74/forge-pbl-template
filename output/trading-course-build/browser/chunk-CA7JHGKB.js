import {
  AcademicLockComponent,
  EncounterComponent
} from "./chunk-TIQJIT5F.js";
import {
  PaintingCanvasComponent,
  comparisonImage,
  downloadFile,
  escapeHtml,
  renderRestoration
} from "./chunk-DZQKVJPO.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  RestorationCollectionRuntime,
  collectionReady,
  initialRestoration,
  selectedRepair
} from "./chunk-YYZUZM6Q.js";
import {
  initialEncounterState
} from "./chunk-JAVOWGH2.js";
import "./chunk-AVOS3LLT.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
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
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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

// src/app/shared/restoration/restoration-editor.component.ts
var _c0 = ["detailHeading"];
var _forTrack0 = ($index, $item) => $item.id;
function RestorationEditorComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "figure")(2, "figcaption");
    \u0275\u0275text(3, "Original forged study");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-restoration-canvas", 15);
    \u0275\u0275listener("mediaFailed", function RestorationEditorComponent_Conditional_12_Template_app_restoration_canvas_mediaFailed_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.failedMedia.set(true));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "figure")(6, "figcaption");
    \u0275\u0275text(7, "Your reconstruction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "app-restoration-canvas", 16);
    \u0275\u0275listener("mediaFailed", function RestorationEditorComponent_Conditional_12_Template_app_restoration_canvas_mediaFailed_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.failedMedia.set(true));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("definition", ctx_r1.definition())("state", ctx_r1.state())("original", true)("interactive", false);
    \u0275\u0275advance(4);
    \u0275\u0275property("definition", ctx_r1.definition())("state", ctx_r1.state())("interactive", false);
  }
}
function RestorationEditorComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "app-restoration-canvas", 17);
    \u0275\u0275listener("select", function RestorationEditorComponent_Conditional_13_Template_app_restoration_canvas_select_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect($event));
    })("mediaFailed", function RestorationEditorComponent_Conditional_13_Template_app_restoration_canvas_mediaFailed_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.failedMedia.set(true));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx_r1.definition())("state", ctx_r1.state())("guides", ctx_r1.guides())("interactive", !ctx_r1.readOnly());
  }
}
function RestorationEditorComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, " A painting layer could not load. Reload this page to retry before checking the restoration. Your saved work is preserved. ");
    \u0275\u0275elementEnd();
  }
}
function RestorationEditorComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RestorationEditorComponent_For_22_Template_button_click_0_listener() {
      const r_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(r_r5.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    const \u0275$index_57_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.readOnly());
    \u0275\u0275attribute("aria-pressed", ctx_r1.region()?.id === r_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_57_r6 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.state().notes[r_r5.id]?.explanation ? "Reasoning saved" : ctx_r1.state().inspected.includes(r_r5.id) ? "Inspected" : "Inspect this detail");
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_29_Conditional_18_For_4_Template_button_click_0_listener() {
      const option_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.edit(option_r9.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r1.choice() === option_r9.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r9.description);
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 12)(1, "legend");
    \u0275\u0275text(2, "What belongs in this picture?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, RestorationEditorComponent_Conditional_29_Conditional_18_For_4_Template, 5, 3, "button", 25, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r10 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.readOnly());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(r_r10.options);
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r12 = ctx.$implicit;
    \u0275\u0275property("value", s_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r12.title);
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Which reference helps you decide?");
    \u0275\u0275elementStart(2, "select", 29);
    \u0275\u0275listener("ngModelChange", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.evidenceId.set($event));
    })("blur", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_Template_select_blur_2_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(3, "option", 30);
    \u0275\u0275text(4, "Choose a reference");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_For_6_Template, 2, 2, "option", 31, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.evidenceId());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.references());
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 28)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r13 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r13.text);
    \u0275\u0275advance();
    \u0275\u0275property("href", s_r13.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", s_r13.sourceTitle, " \u2197");
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "How does this source relate to the original claim?");
    \u0275\u0275elementStart(2, "select", 29);
    \u0275\u0275listener("ngModelChange", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_5_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.relationship.set($event));
    })("blur", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_5_Template_select_blur_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(3, "option", 30);
    \u0275\u0275text(4, "Choose a relationship");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 33);
    \u0275\u0275text(6, "Supports the original claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 34);
    \u0275\u0275text(8, "Contradicts the original claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 35);
    \u0275\u0275text(10, "Does not establish the claim");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.relationship());
    \u0275\u0275control();
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Explain your decision");
    \u0275\u0275elementStart(2, "textarea", 36);
    \u0275\u0275listener("ngModelChange", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_6_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.explanation.set($event));
    })("blur", function RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_6_Template_textarea_blur_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.explanation());
    \u0275\u0275control();
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 12)(1, "legend", 27);
    \u0275\u0275text(2, "Evidence note");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_3_Template, 7, 1, "label");
    \u0275\u0275conditionalCreate(4, RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_4_Template, 5, 3, "aside", 28);
    \u0275\u0275conditionalCreate(5, RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_5_Template, 11, 1, "label");
    \u0275\u0275conditionalCreate(6, RestorationEditorComponent_Conditional_29_Conditional_19_Conditional_6_Template, 3, 1, "label");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.readOnly());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.step() === "source" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = ctx_r1.chosenSource()) ? 4 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.step() === "relationship" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.step() === "explanation" ? 6 : -1);
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_29_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previousStep());
    });
    \u0275\u0275text(1, "\u2190 Back");
    \u0275\u0275elementEnd();
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_29_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(1, " Save explanation ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.readOnly() || ctx_r1.explanation().trim().length < 20);
  }
}
function RestorationEditorComponent_Conditional_29_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_29_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1, " Continue \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.readOnly() || !ctx_r1.canContinue());
  }
}
function RestorationEditorComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3", 19, 0);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "blockquote")(4, "small");
    \u0275\u0275text(5, "The original claim");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "details")(8, "summary");
    \u0275\u0275text(9, "Detail notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 20);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_29_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.consult());
    });
    \u0275\u0275text(13, "Open the research desk \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 21);
    \u0275\u0275element(15, "app-restoration-canvas", 22);
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Your painting updates as you choose.");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, RestorationEditorComponent_Conditional_29_Conditional_18_Template, 5, 1, "fieldset", 12);
    \u0275\u0275conditionalCreate(19, RestorationEditorComponent_Conditional_29_Conditional_19_Template, 7, 5, "fieldset", 12);
    \u0275\u0275elementStart(20, "div", 23);
    \u0275\u0275conditionalCreate(21, RestorationEditorComponent_Conditional_29_Conditional_21_Template, 2, 0, "button");
    \u0275\u0275conditionalCreate(22, RestorationEditorComponent_Conditional_29_Conditional_22_Template, 2, 1, "button", 24)(23, RestorationEditorComponent_Conditional_29_Conditional_23_Template, 2, 1, "button", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r10 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r10.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r10.claim);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(r_r10.instruction);
    \u0275\u0275advance(4);
    \u0275\u0275property("definition", ctx_r1.definition())("state", ctx_r1.state())("interactive", false);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.step() === "repair" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.step() !== "repair" ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.step() !== "repair" ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.step() === "explanation" ? 22 : 23);
  }
}
function RestorationEditorComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "What doesn't belong?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Choose a numbered detail on the painting.");
    \u0275\u0275elementEnd();
  }
}
function RestorationEditorComponent_Conditional_31_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.state().feedback);
  }
}
function RestorationEditorComponent_Conditional_31_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(issue_r20);
  }
}
function RestorationEditorComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Inspect and justify every marked detail, including the detail you keep.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function RestorationEditorComponent_Conditional_31_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.check());
    });
    \u0275\u0275text(6, " Check my restoration ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 40);
    \u0275\u0275conditionalCreate(8, RestorationEditorComponent_Conditional_31_Conditional_8_Template, 2, 1, "p");
    \u0275\u0275repeaterCreate(9, RestorationEditorComponent_Conditional_31_For_10_Template, 2, 1, "p", 41, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12, "The check compares your choices, source, and relationship with the reference key. Your written reasoning is saved for teacher review.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.state().verified ? "\u2713 Evidence check passed" : "3. Check the whole restoration");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.readOnly() || ctx_r1.state().verified || ctx_r1.failedMedia());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.state().feedback ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.state().issues);
  }
}
var RestorationEditorComponent = class _RestorationEditorComponent {
  element = inject(ElementRef);
  injector = inject(Injector);
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = input.required(
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sources = input.required(
    ...ngDevMode ? [{ debugName: "sources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  action = output();
  research = output();
  region = computed(
    () => this.definition().regions.find((r) => r.id === this.state().selectedRegionId),
    ...ngDevMode ? [{ debugName: "region" }] : (
      /* istanbul ignore next */
      []
    )
  );
  references = computed(
    () => this.sources().filter((s) => this.region()?.evidenceIds.includes(s.id)),
    ...ngDevMode ? [{ debugName: "references" }] : (
      /* istanbul ignore next */
      []
    )
  );
  choice = computed(
    () => this.region() ? selectedRepair(this.region(), this.state()).id : "",
    ...ngDevMode ? [{ debugName: "choice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "evidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  relationship = signal(
    "",
    ...ngDevMode ? [{ debugName: "relationship" }] : (
      /* istanbul ignore next */
      []
    )
  );
  explanation = signal(
    "",
    ...ngDevMode ? [{ debugName: "explanation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = signal(
    "repair",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  steps = ["repair", "source", "relationship", "explanation"];
  readyForCheck = computed(
    () => this.definition().regions.every((region) => (this.state().notes[region.id]?.explanation?.trim().length ?? 0) >= 20),
    ...ngDevMode ? [{ debugName: "readyForCheck" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canContinue() {
    return this.step() === "repair" || (this.step() === "source" ? !!this.evidenceId() : !!this.relationship());
  }
  nextStep() {
    if (!this.canContinue())
      return;
    this.save();
    this.step.set(this.steps[Math.min(3, this.steps.indexOf(this.step()) + 1)]);
    this.focusStep();
  }
  previousStep() {
    this.save();
    this.step.set(this.steps[Math.max(0, this.steps.indexOf(this.step()) - 1)]);
    this.focusStep();
  }
  focusStep() {
    afterNextRender(() => this.element.nativeElement.querySelector(".repair-desk fieldset select, .repair-desk fieldset textarea, .repair-desk fieldset button")?.focus(), { injector: this.injector });
  }
  compare = signal(
    false,
    ...ngDevMode ? [{ debugName: "compare" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guides = signal(
    true,
    ...ngDevMode ? [{ debugName: "guides" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failedMedia = signal(
    false,
    ...ngDevMode ? [{ debugName: "failedMedia" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chosenSource = computed(
    () => this.sources().find((s) => s.id === this.evidenceId()),
    ...ngDevMode ? [{ debugName: "chosenSource" }] : (
      /* istanbul ignore next */
      []
    )
  );
  detailHeading = viewChild(
    "detailHeading",
    ...ngDevMode ? [{ debugName: "detailHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  noteKey = "";
  constructor() {
    effect(() => {
      const r = this.region(), note = r && this.state().notes[r.id];
      const key = this.definition().id + ":" + r?.id + ":" + JSON.stringify(note);
      if (key === this.noteKey)
        return;
      this.noteKey = key;
      this.evidenceId.set(note?.evidenceId ?? "");
      this.relationship.set(note?.relationship ?? "");
      this.explanation.set(note?.explanation ?? "");
    });
  }
  save() {
    const r = this.region();
    if (!r || this.readOnly())
      return;
    this.action.emit({
      type: "justify",
      regionId: r.id,
      note: {
        evidenceId: this.evidenceId(),
        relationship: this.relationship(),
        explanation: this.explanation()
      }
    });
  }
  inspect(id) {
    this.save();
    this.step.set("repair");
    this.action.emit({ type: "inspect", regionId: id });
    setTimeout(() => {
      this.detailHeading()?.nativeElement.scrollIntoView?.({
        block: "nearest",
        behavior: "instant"
      });
      this.detailHeading()?.nativeElement.focus({ preventScroll: true });
    });
  }
  edit(optionId) {
    this.save();
    if (this.region())
      this.action.emit({ type: "edit", regionId: this.region().id, optionId });
  }
  undo() {
    this.save();
    this.action.emit({ type: "undo" });
  }
  consult() {
    this.save();
    this.research.emit();
  }
  check() {
    this.save();
    if (!this.failedMedia())
      this.action.emit({ type: "submit" });
  }
  static \u0275fac = function RestorationEditorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationEditorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RestorationEditorComponent, selectors: [["app-restoration-editor"]], viewQuery: function RestorationEditorComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.detailHeading, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { definition: [1, "definition"], state: [1, "state"], sources: [1, "sources"], readOnly: [1, "readOnly"] }, outputs: { action: "action", research: "research" }, decls: 32, vars: 12, consts: [["detailHeading", ""], [1, "studio-grid"], ["aria-label", "Painting workspace", 1, "easel"], [1, "canvas-options"], [1, "canvas-tools"], ["type", "button", 3, "click"], ["type", "button", 3, "click", "disabled"], [1, "comparison"], [1, "frame"], [1, "caption"], ["role", "alert", 1, "warning"], ["aria-label", "Painting details", 1, "detail-list"], [3, "disabled"], ["aria-label", "Restoration desk", 1, "repair-desk"], [1, "check-panel"], [3, "mediaFailed", "definition", "state", "original", "interactive"], [3, "mediaFailed", "definition", "state", "interactive"], [3, "select", "mediaFailed", "definition", "state", "guides", "interactive"], [3, "click", "disabled"], ["tabindex", "-1"], [1, "research", 3, "click"], ["aria-label", "Live painting preview", 1, "mobile-preview"], [3, "definition", "state", "interactive"], [1, "focus-step-actions"], [1, "save-note", 3, "disabled"], ["type", "button", 1, "repair-option"], ["type", "button", 1, "repair-option", 3, "click"], [1, "sr-only"], [1, "source-excerpt"], [3, "ngModelChange", "blur", "ngModel"], ["value", ""], [3, "value"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["value", "supports"], ["value", "contradicts"], ["value", "does-not-establish"], ["rows", "4", "maxlength", "1500", "placeholder", "I changed / kept ___ because the source says ___. This fits the place and time because ___.", 3, "ngModelChange", "blur", "ngModel"], [3, "click"], [1, "save-note", 3, "click", "disabled"], [1, "primary", 3, "click", "disabled"], ["aria-live", "polite"], [1, "issue"]], template: function RestorationEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "section", 2)(2, "details", 3)(3, "summary");
      \u0275\u0275text(4, "View options");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "button", 5);
      \u0275\u0275listener("click", function RestorationEditorComponent_Template_button_click_6_listener() {
        return ctx.compare.set(!ctx.compare());
      });
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function RestorationEditorComponent_Template_button_click_8_listener() {
        return ctx.guides.set(!ctx.guides());
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function RestorationEditorComponent_Template_button_click_10_listener() {
        return ctx.undo();
      });
      \u0275\u0275text(11, " Undo repair ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(12, RestorationEditorComponent_Conditional_12_Template, 9, 7, "div", 7)(13, RestorationEditorComponent_Conditional_13_Template, 2, 4, "div", 8);
      \u0275\u0275elementStart(14, "p", 9);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, RestorationEditorComponent_Conditional_16_Template, 2, 0, "p", 10);
      \u0275\u0275elementStart(17, "details")(18, "summary");
      \u0275\u0275text(19, "Painting details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 11);
      \u0275\u0275repeaterCreate(21, RestorationEditorComponent_For_22_Template, 6, 5, "button", 12, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "details")(24, "summary");
      \u0275\u0275text(25, "About this reconstruction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "section", 13);
      \u0275\u0275conditionalCreate(29, RestorationEditorComponent_Conditional_29_Template, 24, 10)(30, RestorationEditorComponent_Conditional_30_Template, 4, 0);
      \u0275\u0275conditionalCreate(31, RestorationEditorComponent_Conditional_31_Template, 13, 3, "div", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_10_0;
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-pressed", ctx.compare());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.compare() ? "Show my painting" : "Compare before / after", " ");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.guides());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.guides() ? "Hide" : "Show", " detail outlines ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.readOnly() || !ctx.state().undo.length);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.compare() ? 12 : 13);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.definition().location, " \xB7 ", ctx.definition().date);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.failedMedia() ? 16 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.definition().regions);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.definition().attribution);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_10_0 = ctx.region()) ? 29 : 30, tmp_10_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.readyForCheck() || ctx.state().feedback || ctx.state().verified ? 31 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, PaintingCanvasComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #eee8d9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #65756d;\n  background: #1c3028;\n  color: #f4eddd;\n  border-radius: 7px;\n  padding: 11px 14px;\n  min-height: 44px;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #30483b;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #e8c16a;\n  outline-offset: 3px;\n}\n.studio-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.25fr) minmax(315px, 0.85fr);\n  gap: 28px;\n  align-items: start;\n}\n.easel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 18px;\n}\n.canvas-tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin-bottom: 12px;\n}\n.canvas-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 8px 10px;\n}\n.frame[_ngcontent-%COMP%] {\n  padding: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #866d42,\n      #332d20 35%,\n      #997c47 70%,\n      #443622);\n  border: 1px solid #a48a55;\n  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3333333333);\n}\n.caption[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #b9c6bc;\n  text-align: center;\n}\n.comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\nfigure[_ngcontent-%COMP%] {\n  margin: 0;\n}\nfigcaption[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 10px 0;\n  color: #e6c889;\n}\n.detail-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.detail-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  display: grid;\n  grid-template-columns: 26px 1fr;\n  gap: 5px;\n  font-size: 13px;\n}\n.detail-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  grid-row: span 2;\n  color: #e6c889;\n}\n.detail-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #c0cbc4;\n  font-size: 11px;\n}\n.detail-list[_ngcontent-%COMP%]   [aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #e8c16a;\n  background: #394636;\n}\n.repair-desk[_ngcontent-%COMP%] {\n  background: #16251f;\n  border: 1px solid #405448;\n  border-radius: 12px;\n  padding: 24px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #d4b675;\n  font-size: 11px;\n  letter-spacing: 1.7px;\n  text-transform: uppercase;\n}\nh3[_ngcontent-%COMP%] {\n  font: 32px/1.2 Georgia, serif;\n  margin: 10px 0 20px;\n}\np[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.65;\n}\nblockquote[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 14px 16px;\n  border-left: 3px solid #bd8d59;\n  background: #291f1a;\n  color: #ebd3b5;\n  font: 20px/1.45 Georgia, serif;\n}\nblockquote[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 11px/2.3 Arial, sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: #c5a98c;\n}\n.research[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 6px 0 22px;\n  border-color: #a68b52;\n  background: #383c29;\n  color: #f5dc9e;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  border-top: 1px solid #405448;\n  margin: 0 0 22px;\n  padding: 16px 0 0;\n  min-width: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  padding: 0 8px 0 0;\n  color: #d9cfae;\n}\n.repair-option[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  display: block;\n  margin-bottom: 9px;\n  background: #1e2e26;\n}\n.repair-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  margin-bottom: 4px;\n}\n.repair-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  line-height: 1.5;\n  color: #c0cbbf;\n}\n.repair-option[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #e8c16a;\n  background: #3c4330;\n  box-shadow: inset 3px 0 #e8c16a;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  line-height: 1.5;\n  margin-bottom: 15px;\n}\nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  margin-top: 7px;\n  padding: 11px;\n  border: 1px solid #607264;\n  border-radius: 6px;\n  background: #0e1b15;\n  color: #f7f0df;\n  resize: vertical;\n}\ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #a1afa4;\n}\n.source-excerpt[_ngcontent-%COMP%] {\n  padding: 12px 15px;\n  background: #26372d;\n  border-radius: 6px;\n  margin: 0 0 16px;\n}\n.source-excerpt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 0;\n}\na[_ngcontent-%COMP%] {\n  color: #ebcb87;\n  font-size: 12px;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #bec7ba;\n}\n.save-note[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n}\n.check-panel[_ngcontent-%COMP%] {\n  border-top: 1px solid #657157;\n  padding-top: 20px;\n}\n.check-panel[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e7ca8a;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #dec184;\n  color: #1a291f;\n  font-weight: 700;\n  width: 100%;\n}\n.primary[_ngcontent-%COMP%]:hover {\n  background: #f1d69d;\n}\n.issue[_ngcontent-%COMP%], \n.warning[_ngcontent-%COMP%] {\n  color: #f0c5a3;\n  border-left: 2px solid #c38e6a;\n  padding-left: 10px;\n}\ndetails[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  color: #b4c0b7;\n  font-size: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px 0;\n}\n@media (max-width: 900px) {\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .easel[_ngcontent-%COMP%] {\n    position: static;\n    max-width: 650px;\n    width: 100%;\n    margin: auto;\n  }\n  .repair-desk[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  h3[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n}\n@media (max-width: 440px) {\n  .comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .frame[_ngcontent-%COMP%] {\n    padding: 7px;\n  }\n  .canvas-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .repair-desk[_ngcontent-%COMP%] {\n    padding: 17px;\n  }\n}\n.mobile-preview[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 900px) {\n  .mobile-preview[_ngcontent-%COMP%] {\n    display: flex;\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    align-items: center;\n    gap: 15px;\n    margin: 0 -5px 20px;\n    padding: 10px;\n    background: rgba(23, 39, 31, 0.9607843137);\n    border: 1px solid #677456;\n    border-radius: 7px;\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3333333333);\n  }\n  .mobile-preview[_ngcontent-%COMP%]   app-restoration-canvas[_ngcontent-%COMP%] {\n    width: 135px;\n    flex: none;\n  }\n  .mobile-preview[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n    line-height: 1.5;\n    color: #d9c68f;\n    max-width: 135px;\n  }\n}\n.canvas-options[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.canvas-options[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 12px;\n}\n.canvas-options[_ngcontent-%COMP%]   .canvas-tools[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.focus-step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-top: 18px;\n}\n.focus-step-actions[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n}\n.repair-desk[_ngcontent-%COMP%]    > details[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 13px;\n}\n/*# sourceMappingURL=restoration-editor.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationEditorComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-editor", imports: [FormsModule, PaintingCanvasComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="studio-grid">
  <section class="easel" aria-label="Painting workspace">
    <details class="canvas-options">
      <summary>View options</summary>
      <div class="canvas-tools">
        <button type="button" [attr.aria-pressed]="compare()" (click)="compare.set(!compare())">
          {{ compare() ? 'Show my painting' : 'Compare before / after' }}
        </button>
        <button type="button" [attr.aria-pressed]="guides()" (click)="guides.set(!guides())">
          {{ guides() ? 'Hide' : 'Show' }} detail outlines
        </button>
        <button type="button" [disabled]="readOnly() || !state().undo.length" (click)="undo()">
          Undo repair
        </button>
      </div>
    </details>
    @if (compare()) {
      <div class="comparison">
        <figure>
          <figcaption>Original forged study</figcaption>
          <app-restoration-canvas
            [definition]="definition()"
            [state]="state()"
            [original]="true"
            [interactive]="false"
            (mediaFailed)="failedMedia.set(true)"
          />
        </figure>
        <figure>
          <figcaption>Your reconstruction</figcaption>
          <app-restoration-canvas
            [definition]="definition()"
            [state]="state()"
            [interactive]="false"
            (mediaFailed)="failedMedia.set(true)"
          />
        </figure>
      </div>
    } @else {
      <div class="frame">
        <app-restoration-canvas
          [definition]="definition()"
          [state]="state()"
          [guides]="guides()"
          [interactive]="!readOnly()"
          (select)="inspect($event)"
          (mediaFailed)="failedMedia.set(true)"
        />
      </div>
    }
    <p class="caption">{{ definition().location }} \xB7 {{ definition().date }}</p>
    @if (failedMedia()) {
      <p role="alert" class="warning">
        A painting layer could not load. Reload this page to retry before checking the restoration.
        Your saved work is preserved.
      </p>
    }
    <details>
      <summary>Painting details</summary>
      <div class="detail-list" aria-label="Painting details">
        @for (r of definition().regions; track r.id; let i = $index) {
          <button
            [disabled]="readOnly()"
            [attr.aria-pressed]="region()?.id === r.id"
            (click)="inspect(r.id)"
          >
            <span>{{ i + 1 }}</span
            >{{ r.title
            }}<small>{{
              state().notes[r.id]?.explanation
                ? 'Reasoning saved'
                : state().inspected.includes(r.id)
                  ? 'Inspected'
                  : 'Inspect this detail'
            }}</small>
          </button>
        }
      </div>
    </details>
    <details>
      <summary>About this reconstruction</summary>
      <p>{{ definition().attribution }}</p>
    </details>
  </section>
  <section class="repair-desk" aria-label="Restoration desk">
    @if (region(); as r) {
      <h3 #detailHeading tabindex="-1">{{ r.title }}</h3>
      <blockquote><small>The original claim</small>{{ r.claim }}</blockquote>
      <details>
        <summary>Detail notes</summary>
        <p>{{ r.instruction }}</p>
      </details>
      <button class="research" (click)="consult()">Open the research desk \u2197</button>
      <div class="mobile-preview" aria-label="Live painting preview">
        <app-restoration-canvas
          [definition]="definition()"
          [state]="state()"
          [interactive]="false"
        /><span>Your painting updates as you choose.</span>
      </div>
      @if (step() === 'repair') {
        <fieldset [disabled]="readOnly()">
          <legend>What belongs in this picture?</legend>
          @for (option of r.options; track option.id) {
            <button
              type="button"
              class="repair-option"
              [attr.aria-pressed]="choice() === option.id"
              (click)="edit(option.id)"
            >
              <strong>{{ option.label }}</strong
              ><span>{{ option.description }}</span>
            </button>
          }
        </fieldset>
      }
      @if (step() !== 'repair') {
        <fieldset [disabled]="readOnly()">
          <legend class="sr-only">Evidence note</legend>
          @if (step() === 'source') {
            <label
              >Which reference helps you decide?<select
                [ngModel]="evidenceId()"
                (ngModelChange)="evidenceId.set($event)"
                (blur)="save()"
              >
                <option value="">Choose a reference</option>
                @for (s of references(); track s.id) {
                  <option [value]="s.id">{{ s.title }}</option>
                }
              </select></label
            >
          }
          @if (chosenSource(); as s) {
            <aside class="source-excerpt">
              <p>{{ s.text }}</p>
              <a [href]="s.sourceUrl" target="_blank" rel="noopener noreferrer"
                >{{ s.sourceTitle }} \u2197</a
              >
            </aside>
          }
          @if (step() === 'relationship') {
            <label
              >How does this source relate to the original claim?<select
                [ngModel]="relationship()"
                (ngModelChange)="relationship.set($event)"
                (blur)="save()"
              >
                <option value="">Choose a relationship</option>
                <option value="supports">Supports the original claim</option>
                <option value="contradicts">Contradicts the original claim</option>
                <option value="does-not-establish">Does not establish the claim</option>
              </select></label
            >
          }
          @if (step() === 'explanation') {
            <label
              >Explain your decision<textarea
                rows="4"
                maxlength="1500"
                [ngModel]="explanation()"
                (ngModelChange)="explanation.set($event)"
                (blur)="save()"
                placeholder="I changed / kept ___ because the source says ___. This fits the place and time because ___."
              ></textarea>
            </label>
          }
        </fieldset>
      }
      <div class="focus-step-actions">
        @if (step() !== 'repair') {
          <button (click)="previousStep()">\u2190 Back</button>
        }
        @if (step() === 'explanation') {
          <button
            class="save-note"
            [disabled]="readOnly() || explanation().trim().length < 20"
            (click)="save()"
          >
            Save explanation
          </button>
        } @else {
          <button class="save-note" [disabled]="readOnly() || !canContinue()" (click)="nextStep()">
            Continue \u2192
          </button>
        }
      </div>
    } @else {
      <h3>What doesn't belong?</h3>
      <p>Choose a numbered detail on the painting.</p>
    }
    @if (readyForCheck() || state().feedback || state().verified) {
      <div class="check-panel">
        <strong>{{
          state().verified ? '\u2713 Evidence check passed' : '3. Check the whole restoration'
        }}</strong>
        <p>Inspect and justify every marked detail, including the detail you keep.</p>
        <button
          class="primary"
          [disabled]="readOnly() || state().verified || failedMedia()"
          (click)="check()"
        >
          Check my restoration
        </button>
        <div aria-live="polite">
          @if (state().feedback) {
            <p>{{ state().feedback }}</p>
          }
          @for (issue of state().issues; track $index) {
            <p class="issue">{{ issue }}</p>
          }
        </div>
        <small
          >The check compares your choices, source, and relationship with the reference key. Your
          written reasoning is saved for teacher review.</small
        >
      </div>
    }
  </section>
</div>
`, styles: ["/* src/app/shared/restoration/restoration-editor.component.scss */\n:host {\n  display: block;\n  color: #eee8d9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #65756d;\n  background: #1c3028;\n  color: #f4eddd;\n  border-radius: 7px;\n  padding: 11px 14px;\n  min-height: 44px;\n}\nbutton:hover {\n  background: #30483b;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #e8c16a;\n  outline-offset: 3px;\n}\n.studio-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.25fr) minmax(315px, 0.85fr);\n  gap: 28px;\n  align-items: start;\n}\n.easel {\n  position: sticky;\n  top: 18px;\n}\n.canvas-tools {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin-bottom: 12px;\n}\n.canvas-tools button {\n  font-size: 12px;\n  padding: 8px 10px;\n}\n.frame {\n  padding: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #866d42,\n      #332d20 35%,\n      #997c47 70%,\n      #443622);\n  border: 1px solid #a48a55;\n  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3333333333);\n}\n.caption {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #b9c6bc;\n  text-align: center;\n}\n.comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\nfigure {\n  margin: 0;\n}\nfigcaption {\n  font-size: 12px;\n  padding: 10px 0;\n  color: #e6c889;\n}\n.detail-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.detail-list button {\n  text-align: left;\n  display: grid;\n  grid-template-columns: 26px 1fr;\n  gap: 5px;\n  font-size: 13px;\n}\n.detail-list span {\n  grid-row: span 2;\n  color: #e6c889;\n}\n.detail-list small {\n  color: #c0cbc4;\n  font-size: 11px;\n}\n.detail-list [aria-pressed=true] {\n  border-color: #e8c16a;\n  background: #394636;\n}\n.repair-desk {\n  background: #16251f;\n  border: 1px solid #405448;\n  border-radius: 12px;\n  padding: 24px;\n}\n.eyebrow {\n  color: #d4b675;\n  font-size: 11px;\n  letter-spacing: 1.7px;\n  text-transform: uppercase;\n}\nh3 {\n  font: 32px/1.2 Georgia, serif;\n  margin: 10px 0 20px;\n}\np {\n  font-size: 14px;\n  line-height: 1.65;\n}\nblockquote {\n  margin: 0;\n  padding: 14px 16px;\n  border-left: 3px solid #bd8d59;\n  background: #291f1a;\n  color: #ebd3b5;\n  font: 20px/1.45 Georgia, serif;\n}\nblockquote small {\n  display: block;\n  font: 11px/2.3 Arial, sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: #c5a98c;\n}\n.research {\n  width: 100%;\n  margin: 6px 0 22px;\n  border-color: #a68b52;\n  background: #383c29;\n  color: #f5dc9e;\n}\nfieldset {\n  border: 0;\n  border-top: 1px solid #405448;\n  margin: 0 0 22px;\n  padding: 16px 0 0;\n  min-width: 0;\n}\nlegend {\n  font-size: 13px;\n  font-weight: 700;\n  padding: 0 8px 0 0;\n  color: #d9cfae;\n}\n.repair-option {\n  width: 100%;\n  text-align: left;\n  display: block;\n  margin-bottom: 9px;\n  background: #1e2e26;\n}\n.repair-option strong {\n  display: block;\n  font-size: 13px;\n  margin-bottom: 4px;\n}\n.repair-option span {\n  display: block;\n  font-size: 12px;\n  line-height: 1.5;\n  color: #c0cbbf;\n}\n.repair-option[aria-pressed=true] {\n  border-color: #e8c16a;\n  background: #3c4330;\n  box-shadow: inset 3px 0 #e8c16a;\n}\nlabel {\n  display: block;\n  font-size: 13px;\n  line-height: 1.5;\n  margin-bottom: 15px;\n}\nselect,\ntextarea {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  margin-top: 7px;\n  padding: 11px;\n  border: 1px solid #607264;\n  border-radius: 6px;\n  background: #0e1b15;\n  color: #f7f0df;\n  resize: vertical;\n}\ntextarea::placeholder {\n  color: #a1afa4;\n}\n.source-excerpt {\n  padding: 12px 15px;\n  background: #26372d;\n  border-radius: 6px;\n  margin: 0 0 16px;\n}\n.source-excerpt p {\n  font-size: 12px;\n  margin-top: 0;\n}\na {\n  color: #ebcb87;\n  font-size: 12px;\n}\nsmall {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #bec7ba;\n}\n.save-note {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n}\n.check-panel {\n  border-top: 1px solid #657157;\n  padding-top: 20px;\n}\n.check-panel strong {\n  color: #e7ca8a;\n}\n.primary {\n  background: #dec184;\n  color: #1a291f;\n  font-weight: 700;\n  width: 100%;\n}\n.primary:hover {\n  background: #f1d69d;\n}\n.issue,\n.warning {\n  color: #f0c5a3;\n  border-left: 2px solid #c38e6a;\n  padding-left: 10px;\n}\ndetails {\n  margin-top: 20px;\n  color: #b4c0b7;\n  font-size: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px 0;\n}\n@media (max-width: 900px) {\n  .studio-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .easel {\n    position: static;\n    max-width: 650px;\n    width: 100%;\n    margin: auto;\n  }\n  .repair-desk {\n    padding: 20px;\n  }\n  h3 {\n    font-size: 27px;\n  }\n}\n@media (max-width: 440px) {\n  .comparison {\n    grid-template-columns: 1fr;\n  }\n  .detail-list {\n    grid-template-columns: 1fr;\n  }\n  .frame {\n    padding: 7px;\n  }\n  .canvas-tools button {\n    flex: 1;\n  }\n  .repair-desk {\n    padding: 17px;\n  }\n}\n.mobile-preview {\n  display: none;\n}\n@media (max-width: 900px) {\n  .mobile-preview {\n    display: flex;\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    align-items: center;\n    gap: 15px;\n    margin: 0 -5px 20px;\n    padding: 10px;\n    background: rgba(23, 39, 31, 0.9607843137);\n    border: 1px solid #677456;\n    border-radius: 7px;\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3333333333);\n  }\n  .mobile-preview app-restoration-canvas {\n    width: 135px;\n    flex: none;\n  }\n  .mobile-preview span {\n    font-size: 12px;\n    line-height: 1.5;\n    color: #d9c68f;\n    max-width: 135px;\n  }\n}\n.canvas-options {\n  margin-bottom: 12px;\n}\n.canvas-options > summary {\n  cursor: pointer;\n  font-size: 12px;\n}\n.canvas-options .canvas-tools {\n  margin-top: 8px;\n}\n.focus-step-actions {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-top: 18px;\n}\n.focus-step-actions > :last-child {\n  margin-left: auto;\n}\n.repair-desk > details {\n  margin: 12px 0;\n  font-size: 13px;\n}\n/*# sourceMappingURL=restoration-editor.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], sources: [{ type: Input, args: [{ isSignal: true, alias: "sources", required: true }] }], readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], action: [{ type: Output, args: ["action"] }], research: [{ type: Output, args: ["research"] }], detailHeading: [{ type: ViewChild, args: ["detailHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RestorationEditorComponent, { className: "RestorationEditorComponent", filePath: "src/app/shared/restoration/restoration-editor.component.ts", lineNumber: 32 });
})();

// src/app/templates/heist/restoration/restoration-collection.component.ts
var _c02 = ["researchDialog"];
var _c1 = ["storyDialog"];
var _c2 = ["resetDialog"];
var _c3 = ["pageHeading"];
var _forTrack02 = ($index, $item) => $item.id;
function RestorationCollectionComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.downloadComparison());
    });
    \u0275\u0275text(1, "Download before / after");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.downloadBusy());
  }
}
function RestorationCollectionComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 13)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_40_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.retrySave());
    });
    \u0275\u0275text(4, "Retry save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_40_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.downloadLedger());
    });
    \u0275\u0275text(6, "Download current ledger");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.warning());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.runtime.blocked());
  }
}
function RestorationCollectionComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.message());
  }
}
function RestorationCollectionComponent_Conditional_42_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_42_Conditional_10_Template_button_click_0_listener() {
      const next_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.open(ctx_r2.work() && !ctx_r2.workState().verified ? ctx_r2.work() : next_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.completed() || ctx_r2.work() ? "Continue restoring" : "Start the first painting", " \u2192");
  }
}
function RestorationCollectionComponent_Conditional_42_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_42_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.go("heist"));
    });
    \u0275\u0275text(1, "Enter the final heist \u2192");
    \u0275\u0275elementEnd();
  }
}
function RestorationCollectionComponent_Conditional_42_For_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_42_For_50_Template_button_click_0_listener() {
      const w_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.open(w_r10));
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275element(2, "app-restoration-canvas", 36);
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 39)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 40);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "b");
    \u0275\u0275text(17, "\u2197");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const w_r10 = ctx.$implicit;
    const \u0275$index_167_r11 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", "Open " + w_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("definition", w_r10)("state", ctx_r2.stateFor(w_r10.id))("interactive", false);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275$index_167_r11 + 1 < 10 ? "0" : "", "", \u0275$index_167_r11 + 1);
    \u0275\u0275advance();
    \u0275\u0275classProp("checked", ctx_r2.stateFor(w_r10.id).verified);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.stateFor(w_r10.id).verified ? "\u2713 Checked" : ctx_r2.stateFor(w_r10.id).inspected.length ? "In progress" : "To restore");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(w_r10.collection);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", w_r10.location, " \xB7 ", w_r10.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r10.encounterId ? "\u25CC Story portal available" : "\u2315 Research desk");
  }
}
function RestorationCollectionComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 26)(1, "div")(2, "p", 16);
    \u0275\u0275text(3, "Your commission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 27, 3);
    \u0275\u0275text(6, "Put history back in the picture.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 24);
    \u0275\u0275conditionalCreate(10, RestorationCollectionComponent_Conditional_42_Conditional_10_Template, 2, 1, "button", 28)(11, RestorationCollectionComponent_Conditional_42_Conditional_11_Template, 2, 0, "button", 28);
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_42_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.research());
    });
    \u0275\u0275text(13, "Browse the reference desk");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "ol", 29)(15, "li")(16, "b");
    \u0275\u0275text(17, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span")(19, "strong");
    \u0275\u0275text(20, "Inspect the marked details");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, "What does the original image claim?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "li")(23, "b");
    \u0275\u0275text(24, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span")(26, "strong");
    \u0275\u0275text(27, "Follow the evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, "Read sources or step through a story portal.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "li")(30, "b");
    \u0275\u0275text(31, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span")(33, "strong");
    \u0275\u0275text(34, "Make the repair visible");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, "Remove, replace, relabel\u2014or keep a valid detail.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "li")(37, "b");
    \u0275\u0275text(38, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span")(40, "strong");
    \u0275\u0275text(41, "Explain and check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, "Save your evidence note, then compare the images.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 30)(44, "h2");
    \u0275\u0275text(45, "The restoration collection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 31);
    \u0275\u0275repeaterCreate(49, RestorationCollectionComponent_Conditional_42_For_50_Template, 18, 14, "button", 32, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.mission.briefing);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_6_0 = ctx_r2.nextWork()) ? 10 : 11, tmp_6_0);
    \u0275\u0275advance(37);
    \u0275\u0275textInterpolate1("", ctx_r2.mission.works.length, " restoration commissions");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.mission.works);
  }
}
function RestorationCollectionComponent_Conditional_43_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_43_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.enterStory());
    });
    \u0275\u0275text(1, "Story portal \u2197");
    \u0275\u0275elementEnd();
  }
}
function RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_9_Template_button_click_0_listener() {
      const next_r16 = \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.open(next_r16));
    });
    \u0275\u0275text(1, "Next painting \u2192");
    \u0275\u0275elementEnd();
  }
}
function RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.go("heist"));
    });
    \u0275\u0275text(1, "Continue to the heist \u2192");
    \u0275\u0275elementEnd();
  }
}
function RestorationCollectionComponent_Conditional_43_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 43)(1, "div")(2, "h3");
    \u0275\u0275text(3, "One more piece of history restored.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 24)(7, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_43_Conditional_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.go("ledger"));
    });
    \u0275\u0275text(8, "View my ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_9_Template, 2, 0, "button", 28)(10, RestorationCollectionComponent_Conditional_43_Conditional_8_Conditional_10_Template, 2, 0, "button", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("The image, original claim, and explanation are in your ledger. ", ctx_r2.completed(), " of ", ctx_r2.mission.works.length, " paintings have passed the evidence check.");
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_8_0 = ctx_r2.nextWork()) ? 9 : 10, tmp_8_0);
  }
}
function RestorationCollectionComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 27, 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, RestorationCollectionComponent_Conditional_43_Conditional_4_Template, 2, 0, "button");
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_43_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.research());
    });
    \u0275\u0275text(6, "Sources");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "app-restoration-editor", 42);
    \u0275\u0275listener("action", function RestorationCollectionComponent_Conditional_43_Template_app_restoration_editor_action_7_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.repair($event));
    })("research", function RestorationCollectionComponent_Conditional_43_Template_app_restoration_editor_research_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.research());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, RestorationCollectionComponent_Conditional_43_Conditional_8_Template, 11, 3, "section", 43);
  }
  if (rf & 2) {
    const w_r18 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(w_r18.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.portal() ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("definition", w_r18)("state", ctx_r2.workState())("sources", ctx_r2.mission.sourceGallery.evidence)("readOnly", ctx_r2.state().heistStarted || ctx_r2.runtime.blocked());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.workState().verified ? 8 : -1);
  }
}
function RestorationCollectionComponent_Conditional_44_For_15_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h4");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "b");
    \u0275\u0275text(5, "Original claim:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "b");
    \u0275\u0275text(9, "Image decision:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "b");
    \u0275\u0275text(13, "Evidence:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "blockquote");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r22 = ctx.$implicit;
    const w_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r22.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", r_r22.claim);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.optionLabel(w_r21, r_r22.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.sourceTitle(ctx_r2.stateFor(w_r21.id).notes[r_r22.id]?.evidenceId), " \xB7 ", ctx_r2.stateFor(w_r21.id).notes[r_r22.id]?.relationship || "Relationship not selected");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.stateFor(w_r21.id).notes[r_r22.id]?.explanation || "Your explanation will appear here.");
  }
}
function RestorationCollectionComponent_Conditional_44_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "div", 49)(2, "span", 50);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 51);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_44_For_15_Template_button_click_11_listener() {
      const w_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.open(w_r21));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 52);
    \u0275\u0275repeaterCreate(14, RestorationCollectionComponent_Conditional_44_For_15_For_15_Template, 17, 6, "section", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const w_r21 = ctx.$implicit;
    const \u0275$index_258_r23 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_258_r23 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", w_r21.location, " \xB7 ", w_r21.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r21.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.stateFor(w_r21.id).verified ? "\u2713 Evidence checked" : "Needs restoration");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.state().heistStarted ? "View painting" : "Open studio", " \u2197");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(w_r21.regions);
  }
}
function RestorationCollectionComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 44)(1, "p", 16);
    \u0275\u0275text(2, "A record that grows with your work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 27, 3);
    \u0275\u0275text(5, "The living restoration ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 24)(9, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_44_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.downloadLedger());
    });
    \u0275\u0275text(10, "Download evidence ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 25);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_44_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.downloadExhibition());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 45);
    \u0275\u0275repeaterCreate(14, RestorationCollectionComponent_Conditional_44_For_15_Template, 16, 6, "article", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "section", 46)(17, "h3");
    \u0275\u0275text(18, "Write the exhibition label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20, "How did the forgeries change the story? Describe a repair, a detail you preserved, and a question your sources cannot answer. Whose perspective would you seek next?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "label", 47);
    \u0275\u0275text(22, "Your museum label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "textarea", 48);
    \u0275\u0275listener("ngModelChange", function RestorationCollectionComponent_Conditional_44_Template_textarea_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.label.set($event));
    })("blur", function RestorationCollectionComponent_Conditional_44_Template_textarea_blur_23_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveLabel());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(24, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_44_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveLabel());
    });
    \u0275\u0275text(25, "Save museum label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "small");
    \u0275\u0275text(27, "Written explanations and this label are saved for teacher review.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("Every forgery has a place here: its original claim, your repair, your reference, and your reasoning. ", ctx_r2.completed(), " / ", ctx_r2.mission.works.length, " evidence checks passed.");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.downloadBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.downloadBusy() ? "Preparing exhibition\u2026" : "Download illustrated exhibition");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.mission.works);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r2.label());
    \u0275\u0275control();
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_8_Conditional_7_Template_button_click_0_listener() {
      const next_r25 = \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.open(next_r25));
    });
    \u0275\u0275text(1, "Restore the next painting \u2192");
    \u0275\u0275elementEnd();
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 54)(1, "span", 55);
    \u0275\u0275text(2, "\u2311");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The restoration work prepares you for the heist. Finish the evidence checks before operating the vault.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, RestorationCollectionComponent_Conditional_45_Conditional_8_Conditional_7_Template, 2, 0, "button", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.mission.works.length - ctx_r2.completed(), " paintings still need your care.");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.nextWork()) ? 7 : -1, tmp_7_0);
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 54)(1, "span", 55);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "The evidence is ready. Begin the recovery.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Starting the heist seals your checked reconstructions into the recovery record. The ledger and references remain available throughout the challenge.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_9_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startHeist());
    });
    \u0275\u0275text(8, "Begin the final heist \u2192");
    \u0275\u0275elementEnd()();
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const id_r27 = ctx.$implicit;
    const \u0275$index_374_r28 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("passed", ctx_r2.state().solvedLocks.includes(id_r27))("current", ctx_r2.nextLock()?.id === id_r27);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.state().solvedLocks.includes(id_r27) ? "\u2713" : \u0275$index_374_r28 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.lockTitle(id_r27));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.state().solvedLocks.includes(id_r27) ? "Mechanism passed" : ctx_r2.nextLock()?.id === id_r27 ? "Your next challenge" : "Awaiting access");
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.research());
    });
    \u0275\u0275text(2, "Open references");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.go("ledger"));
    });
    \u0275\u0275text(4, "Consult my restoration ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "app-academic-lock", 59);
    \u0275\u0275listener("operate", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_3_Template_app_academic_lock_operate_7_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.operate($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lock_r30 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r2.state().solvedLocks.length, "/", ctx_r2.mission.finalLockIds.length, " mechanisms passed");
    \u0275\u0275advance();
    \u0275\u0275property("lock", lock_r30)("saved", ctx_r2.lockDrafts()[lock_r30.id] || ctx_r2.state().answers[lock_r30.id]);
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 54)(1, "h3");
    \u0275\u0275text(2, "The vault is open.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "All five mechanisms passed. Your corrected collection and evidence ledger are ready to leave the vault.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 33);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.extract());
    });
    \u0275\u0275text(6, "Recover the collection \u2192");
    \u0275\u0275elementEnd()();
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 43)(1, "div")(2, "h3");
    \u0275\u0275text(3, "Recovery complete.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Exhibit the original and corrected images together, with the evidence that changed your decisions.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 24)(7, "button", 8);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_5_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.go("ledger"));
    });
    \u0275\u0275text(8, "Finish my museum label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 60);
    \u0275\u0275listener("click", function RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_5_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.downloadExhibition());
    });
    \u0275\u0275text(10, "Download the exhibition");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r2.downloadBusy());
  }
}
function RestorationCollectionComponent_Conditional_45_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 56);
    \u0275\u0275repeaterCreate(1, RestorationCollectionComponent_Conditional_45_Conditional_10_For_2_Template, 7, 7, "li", 57, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_3_Template, 8, 4)(4, RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_4_Template, 7, 0, "section", 54)(5, RestorationCollectionComponent_Conditional_45_Conditional_10_Conditional_5_Template, 11, 1, "section", 43);
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.mission.finalLockIds);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.nextLock()) ? 3 : !ctx_r2.state().extracted ? 4 : 5, tmp_7_0);
  }
}
function RestorationCollectionComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53)(1, "p", 16);
    \u0275\u0275text(2, "The final recovery \xB7 No countdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 27, 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, RestorationCollectionComponent_Conditional_45_Conditional_8_Template, 8, 2, "section", 54)(9, RestorationCollectionComponent_Conditional_45_Conditional_9_Template, 9, 0, "section", 54)(10, RestorationCollectionComponent_Conditional_45_Conditional_10_Template, 6, 1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.state().extracted ? "The collection is yours to exhibit." : "The vault audit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.mission.heistBriefing);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.ready() ? 8 : !ctx_r2.state().heistStarted ? 9 : 10);
  }
}
function RestorationCollectionComponent_For_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 25);
    \u0275\u0275listener("click", function RestorationCollectionComponent_For_60_Template_button_click_9_listener() {
      const s_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.send({ type: "read", evidenceId: s_r34.id }));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r34 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("relevant", ctx_r2.sourceIds().includes(s_r34.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.sourceIds().includes(s_r34.id) ? "Relevant to this task" : "Collection reference");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r34.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r34.text);
    \u0275\u0275advance();
    \u0275\u0275property("href", s_r34.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", s_r34.sourceTitle, " \u2197");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.state().sourcesRead.includes(s_r34.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.state().sourcesRead.includes(s_r34.id) ? "\u2713 Consulted" : "Mark as consulted");
  }
}
function RestorationCollectionComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-historical-encounter", 62);
    \u0275\u0275listener("action", function RestorationCollectionComponent_Conditional_63_Template_app_historical_encounter_action_0_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.storyAction($event));
    })("leave", function RestorationCollectionComponent_Conditional_63_Template_app_historical_encounter_leave_0_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.leaveStory());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("definition", ctx)("state", ctx_r2.encounterState())("sources", ctx_r2.mission.sourceGallery.evidence);
  }
}
var RestorationCollectionComponent = class _RestorationCollectionComponent {
  runtime = inject(RestorationCollectionRuntime);
  mission = this.runtime.mission;
  state = computed(
    () => {
      this.runtime.revision();
      return this.runtime.engine.state;
    },
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  page = signal(
    "collection",
    ...ngDevMode ? [{ debugName: "page" }] : (
      /* istanbul ignore next */
      []
    )
  );
  work = computed(
    () => this.mission.works.find((w) => w.id === this.state().workId),
    ...ngDevMode ? [{ debugName: "work" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workState = computed(
    () => this.work() ? this.state().works[this.work().id] ?? initialRestoration() : initialRestoration(),
    ...ngDevMode ? [{ debugName: "workState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = computed(
    () => this.mission.works.filter((w) => this.state().works[w.id]?.verified).length,
    ...ngDevMode ? [{ debugName: "completed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = computed(
    () => collectionReady(this.mission, this.state()),
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextWork = computed(
    () => this.mission.works.find((w) => !this.state().works[w.id]?.verified),
    ...ngDevMode ? [{ debugName: "nextWork" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextLock = computed(
    () => this.mission.sourceGallery.locks.find((l) => l.id === this.mission.finalLockIds.find((id) => !this.state().solvedLocks.includes(id))),
    ...ngDevMode ? [{ debugName: "nextLock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounter = computed(
    () => this.mission.sourceGallery.encounters?.find((e) => e.id === this.state().activeEncounterId),
    ...ngDevMode ? [{ debugName: "encounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  portal = computed(
    () => this.mission.sourceGallery.encounters?.find((e) => e.id === this.work()?.encounterId),
    ...ngDevMode ? [{ debugName: "portal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterState = computed(
    () => this.encounter() ? this.state().encounters[this.encounter().id] ?? initialEncounterState(this.encounter()) : void 0,
    ...ngDevMode ? [{ debugName: "encounterState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceIds = computed(
    () => this.page() === "heist" ? this.nextLock()?.evidenceIds ?? [] : this.work()?.regions.flatMap((r) => r.evidenceIds) ?? [],
    ...ngDevMode ? [{ debugName: "sourceIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceList = computed(
    () => [...this.mission.sourceGallery.evidence].sort((a, b) => Number(this.sourceIds().includes(b.id)) - Number(this.sourceIds().includes(a.id))),
    ...ngDevMode ? [{ debugName: "sourceList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  researchOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "researchOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resetOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "resetOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  downloadBusy = signal(
    false,
    ...ngDevMode ? [{ debugName: "downloadBusy" }] : (
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
  label = signal(
    this.state().museumLabel,
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lockDrafts = signal(
    {},
    ...ngDevMode ? [{ debugName: "lockDrafts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editor = viewChild(
    RestorationEditorComponent,
    ...ngDevMode ? [{ debugName: "editor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lockEditor = viewChild(
    AcademicLockComponent,
    ...ngDevMode ? [{ debugName: "lockEditor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  researchDialog = viewChild(
    "researchDialog",
    ...ngDevMode ? [{ debugName: "researchDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storyDialog = viewChild(
    "storyDialog",
    ...ngDevMode ? [{ debugName: "storyDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resetDialog = viewChild(
    "resetDialog",
    ...ngDevMode ? [{ debugName: "resetDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heading = viewChild(
    "pageHeading",
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previousFocus;
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === "studio") {
        const work = this.work() ?? this.nextWork();
        if (work)
          this.open(work);
      } else if (target === "ledger" || target === "heist")
        this.go(target);
    });
    if (this.state().heistStarted)
      this.page.set("heist");
    else if (this.state().workId)
      this.page.set("studio");
    effect(() => {
      if (this.researchOpen())
        this.researchDialog()?.nativeElement.showModal();
      else
        this.researchDialog()?.nativeElement.close();
    });
    effect(() => {
      if (this.encounter())
        this.storyDialog()?.nativeElement.showModal();
      else
        this.storyDialog()?.nativeElement.close();
    });
    effect(() => {
      if (this.resetOpen())
        this.resetDialog()?.nativeElement.showModal();
      else
        this.resetDialog()?.nativeElement.close();
    });
  }
  saveContext() {
    this.editor()?.save();
    const lock = this.nextLock();
    if (this.page() === "heist" && lock && this.lockEditor())
      this.lockDrafts.update((v) => __spreadProps(__spreadValues({}, v), { [lock.id]: this.lockEditor().answer() }));
    this.saveLabel();
  }
  saveLabel() {
    this.runtime.send({ type: "museum-label", text: this.label() });
  }
  go(page) {
    this.saveContext();
    this.page.set(page);
    this.focusHeading();
  }
  open(work) {
    this.saveContext();
    this.runtime.send({ type: "open", workId: work.id });
    this.page.set("studio");
    this.focusHeading();
  }
  repair(action) {
    const work = this.work();
    if (work)
      this.runtime.send({ type: "repair", workId: work.id, action });
  }
  stateFor(id) {
    return this.state().works[id] ?? initialRestoration();
  }
  optionLabel(w, id) {
    return selectedRepair(w.regions.find((r) => r.id === id), this.stateFor(w.id)).label;
  }
  sourceTitle(id) {
    return this.mission.sourceGallery.evidence.find((s) => s.id === id)?.title ?? "No reference attached";
  }
  lockTitle(id) {
    return this.mission.sourceGallery.locks.find((l) => l.id === id)?.title ?? id;
  }
  research() {
    this.saveContext();
    this.previousFocus = document.activeElement;
    this.researchOpen.set(true);
  }
  closeResearch() {
    this.researchOpen.set(false);
    this.restoreFocus();
  }
  enterStory() {
    const portal = this.portal();
    if (!portal)
      return;
    this.saveContext();
    this.previousFocus = document.activeElement;
    this.runtime.send({ type: "encounter", encounterId: portal.id, action: { type: "enter" } });
  }
  storyAction(action) {
    if (this.encounter())
      this.runtime.send({ type: "encounter", encounterId: this.encounter().id, action });
  }
  leaveStory() {
    this.storyAction({ type: "exit" });
    this.restoreFocus();
  }
  startHeist() {
    this.saveContext();
    if (this.runtime.send({ type: "start-heist" })) {
      this.page.set("heist");
      this.focusHeading();
    }
  }
  operate(answer) {
    const lock = this.nextLock();
    if (lock && this.runtime.send({ type: "operate", lockId: lock.id, answer })) {
      this.message.set(this.runtime.engine.events.at(-1).message);
      this.focusHeading();
    }
  }
  extract() {
    this.saveContext();
    if (this.runtime.send({ type: "extract" }))
      this.message.set(this.runtime.engine.events.at(-1).message);
  }
  reset() {
    this.runtime.reset();
    this.label.set("");
    this.message.set("");
    this.page.set("collection");
    this.resetOpen.set(false);
    this.focusHeading();
  }
  downloadLedger() {
    this.saveContext();
    downloadFile(new Blob([JSON.stringify(this.runtime.engine.dossier(), null, 2)], { type: "application/json" }), `${this.mission.projectId}-restoration-ledger.json`);
  }
  async downloadComparison() {
    const work = this.work();
    if (!work)
      return;
    this.saveContext();
    this.downloadBusy.set(true);
    try {
      downloadFile(await comparisonImage(work, this.workState()), `${work.id}-before-after.png`);
    } catch (e) {
      this.message.set(e instanceof Error ? e.message : "Image export failed.");
    } finally {
      this.downloadBusy.set(false);
    }
  }
  async downloadExhibition() {
    this.saveContext();
    this.downloadBusy.set(true);
    this.message.set("Preparing the illustrated exhibition\u2026");
    try {
      const dossier = this.runtime.engine.dossier();
      const sections = [];
      for (const work of this.mission.works) {
        const s = this.stateFor(work.id), before = await renderRestoration(work, s, true, 640), after = await renderRestoration(work, s, false, 640);
        sections.push(`<article><h2>${escapeHtml(work.title)}</h2><p>${escapeHtml(work.location)} \xB7 ${escapeHtml(work.date)} \xB7 ${s.verified ? "Evidence check passed" : "Work in progress"}</p><div class="pair"><figure><img src="${before.toDataURL("image/png")}" alt="Original forged study"><figcaption>Original forged study</figcaption></figure><figure><img src="${after.toDataURL("image/png")}" alt="Student reconstruction"><figcaption>Student reconstruction</figcaption></figure></div>${work.regions.map((r) => `<h3>${escapeHtml(r.title)}</h3><p>Original claim: ${escapeHtml(r.claim)}</p><p>Choice: ${escapeHtml(selectedRepair(r, s).description)}</p><p>Evidence: ${escapeHtml(this.sourceTitle(s.notes[r.id]?.evidenceId))} \xB7 ${escapeHtml(s.notes[r.id]?.relationship ?? "Not selected")}</p><blockquote>${escapeHtml(s.notes[r.id]?.explanation ?? "No explanation saved.")}</blockquote>`).join("")}<small>${escapeHtml(work.attribution)}</small></article>`);
      }
      const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Restoration exhibition</title><style>body{max-width:1100px;margin:auto;padding:28px;background:#f3eee2;color:#24372c;font:17px/1.6 system-ui}h1,h2{font-family:Georgia}article{border-top:2px solid #958867;margin-top:40px;padding-top:20px}.pair{display:flex;gap:16px}figure{margin:0;flex:1}img{width:100%}blockquote{border-left:3px solid #958867;padding-left:20px;white-space:pre-wrap}small{font-size:12px}a{color:#235744}@media(max-width:600px){.pair{display:block}}</style><h1>${escapeHtml(this.mission.title)}: student restoration exhibition</h1><p>Local practice \xB7 ${dossier.complete ? "Collection recovered" : "Recovery in progress"} \xB7 ${this.completed()}/${this.mission.works.length} evidence checks passed.</p><p>Written explanations are saved for teacher review; these checks are not teacher grades.</p><h2>Museum label</h2><blockquote>${escapeHtml(dossier.museumLabel || "Label not written yet.")}</blockquote>${sections.join("")}<h2>Reference desk</h2>${this.mission.sourceGallery.evidence.map((s) => `<p><a href="${escapeHtml(s.sourceUrl)}">${escapeHtml(s.sourceTitle)}</a><br>${escapeHtml(s.text)}</p>`).join("")}</html>`;
      downloadFile(new Blob([html], { type: "text/html" }), `${this.mission.projectId}-exhibition.html`);
      this.message.set("Exhibition downloaded with the before-and-after images and your explanations.");
    } catch (e) {
      this.message.set(e instanceof Error ? e.message : "Exhibition export failed.");
    } finally {
      this.downloadBusy.set(false);
    }
  }
  restoreFocus() {
    setTimeout(() => this.previousFocus?.isConnected ? this.previousFocus.focus() : this.heading()?.nativeElement.focus());
  }
  focusHeading() {
    setTimeout(() => {
      this.heading()?.nativeElement.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      this.heading()?.nativeElement.focus({ preventScroll: true });
    });
  }
  static \u0275fac = function RestorationCollectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationCollectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RestorationCollectionComponent, selectors: [["app-restoration-collection"]], viewQuery: function RestorationCollectionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.editor, RestorationEditorComponent, 5)(ctx.lockEditor, AcademicLockComponent, 5)(ctx.researchDialog, _c02, 5)(ctx.storyDialog, _c1, 5)(ctx.resetDialog, _c2, 5)(ctx.heading, _c3, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(6);
    }
  }, decls: 77, vars: 13, consts: [["researchDialog", ""], ["storyDialog", ""], ["resetDialog", ""], ["pageHeading", ""], [1, "restoration-world"], [1, "topbar"], ["href", "/projects", 1, "brand"], [1, "practice"], [3, "click"], ["aria-label", "Activity stages", 1, "journey"], [1, "backup-tools"], [3, "disabled"], [1, "content"], ["role", "alert", 1, "warning"], ["role", "status", 1, "notice"], ["aria-labelledby", "research-title", 1, "research-dialog", 3, "cancel"], [1, "eyebrow"], ["id", "research-title"], [1, "source-grid"], [3, "relevant"], ["aria-label", "Historical story portal", 1, "story-dialog", 3, "cancel"], ["returnLabel", "Return to my painting", 3, "definition", "state", "sources"], ["aria-labelledby", "reset-title", 1, "reset-dialog", 3, "cancel"], ["id", "reset-title"], [1, "actions"], [3, "click", "disabled"], [1, "intro-panel"], ["tabindex", "-1"], [1, "primary"], [1, "how-to"], [1, "section-heading"], [1, "collection-grid"], [1, "work-card"], [1, "primary", 3, "click"], [1, "work-card", 3, "click"], [1, "thumbnail"], [3, "definition", "state", "interactive"], [1, "work-number"], [1, "work-status"], [1, "card-copy"], [1, "card-link"], [1, "scene-resources"], [3, "action", "research", "definition", "state", "sources", "readOnly"], [1, "completion-strip"], [1, "ledger-heading"], [1, "ledger-list"], [1, "reflection"], ["for", "museum-label"], ["id", "museum-label", "rows", "5", "maxlength", "4000", 3, "ngModelChange", "blur", "ngModel"], [1, "ledger-top"], [1, "ledger-index"], [1, "status-pill"], [1, "repair-records"], [1, "heist-intro"], [1, "locked-panel"], ["aria-hidden", "true"], [1, "vault-audit"], [3, "passed", "current"], [1, "heist-tools"], [3, "operate", "lock", "saved"], [1, "primary", 3, "click", "disabled"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["returnLabel", "Return to my painting", 3, "action", "leave", "definition", "state", "sources"]], template: function RestorationCollectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "main", 4)(1, "app-workspace-tools")(2, "header", 5)(3, "a", 6);
      \u0275\u0275text(4, "FORGE ");
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "/ FIELD MISSIONS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "span", 7);
      \u0275\u0275text(8, "Local practice \xB7 saves in this browser");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_9_listener() {
        return ctx.resetOpen.set(true);
      });
      \u0275\u0275text(10, "New practice");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "nav", 9)(12, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_12_listener() {
        return ctx.go("collection");
      });
      \u0275\u0275elementStart(13, "b");
      \u0275\u0275text(14, "01");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16, "Restore the collection");
      \u0275\u0275elementStart(17, "small");
      \u0275\u0275text(18, "Inspect \xB7 research \xB7 repair");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_19_listener() {
        return ctx.go("ledger");
      });
      \u0275\u0275elementStart(20, "b");
      \u0275\u0275text(21, "02");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, "Your living ledger");
      \u0275\u0275elementStart(24, "small");
      \u0275\u0275text(25, "Every clue and explanation");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_26_listener() {
        return ctx.go("heist");
      });
      \u0275\u0275elementStart(27, "b");
      \u0275\u0275text(28, "03");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span");
      \u0275\u0275text(30, "The final heist");
      \u0275\u0275elementStart(31, "small");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(33, "div", 10)(34, "span");
      \u0275\u0275text(35, "Illustrated classroom reconstructions \xB7 Evidence checks are local practice");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_36_listener() {
        return ctx.downloadLedger();
      });
      \u0275\u0275text(37, "Save a copy of my ledger \u2193");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(38, RestorationCollectionComponent_Conditional_38_Template, 2, 1, "button", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 12);
      \u0275\u0275conditionalCreate(40, RestorationCollectionComponent_Conditional_40_Template, 7, 2, "aside", 13);
      \u0275\u0275conditionalCreate(41, RestorationCollectionComponent_Conditional_41_Template, 2, 1, "p", 14);
      \u0275\u0275conditionalCreate(42, RestorationCollectionComponent_Conditional_42_Template, 51, 3);
      \u0275\u0275conditionalCreate(43, RestorationCollectionComponent_Conditional_43_Template, 9, 7);
      \u0275\u0275conditionalCreate(44, RestorationCollectionComponent_Conditional_44_Template, 28, 5);
      \u0275\u0275conditionalCreate(45, RestorationCollectionComponent_Conditional_45_Template, 11, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "dialog", 15, 0);
      \u0275\u0275listener("cancel", function RestorationCollectionComponent_Template_dialog_cancel_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.preventDefault();
        return \u0275\u0275resetView(ctx.closeResearch());
      });
      \u0275\u0275elementStart(48, "header")(49, "div")(50, "p", 16);
      \u0275\u0275text(51, "Read \u2192 Compare \u2192 Return");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "h2", 17);
      \u0275\u0275text(53, "The research desk");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_54_listener() {
        return ctx.closeResearch();
      });
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "p");
      \u0275\u0275text(57, "References most relevant to your current task appear first. Read their claims, check their provenance, then attach the useful reference to your repair.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 18);
      \u0275\u0275repeaterCreate(59, RestorationCollectionComponent_For_60_Template, 11, 9, "article", 19, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "dialog", 20, 1);
      \u0275\u0275listener("cancel", function RestorationCollectionComponent_Template_dialog_cancel_61_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.preventDefault();
        return \u0275\u0275resetView(ctx.leaveStory());
      });
      \u0275\u0275conditionalCreate(63, RestorationCollectionComponent_Conditional_63_Template, 1, 3, "app-historical-encounter", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "dialog", 22, 2);
      \u0275\u0275listener("cancel", function RestorationCollectionComponent_Template_dialog_cancel_64_listener() {
        return ctx.resetOpen.set(false);
      });
      \u0275\u0275elementStart(66, "h2", 23);
      \u0275\u0275text(67, "Start a new local practice?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p");
      \u0275\u0275text(69, "This replaces the restoration progress for this practice in this browser. Download the ledger first if you want to keep a copy.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 24)(71, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_71_listener() {
        return ctx.downloadLedger();
      });
      \u0275\u0275text(72, "Download ledger");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_73_listener() {
        return ctx.resetOpen.set(false);
      });
      \u0275\u0275text(74, "Keep working");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "button", 8);
      \u0275\u0275listener("click", function RestorationCollectionComponent_Template_button_click_75_listener() {
        return ctx.reset();
      });
      \u0275\u0275text(76, "Start new practice");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_11_0;
      let tmp_16_0;
      \u0275\u0275advance(12);
      \u0275\u0275attribute("aria-current", ctx.page() === "collection" || ctx.page() === "studio" ? "step" : null);
      \u0275\u0275advance(7);
      \u0275\u0275attribute("aria-current", ctx.page() === "ledger" ? "step" : null);
      \u0275\u0275advance(7);
      \u0275\u0275attribute("aria-current", ctx.page() === "heist" ? "step" : null);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.state().extracted ? "Collection recovered" : ctx.ready() ? "Ready for recovery" : "Unlocks after restoration");
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.page() === "studio" && ctx.work() ? 38 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.warning() ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.page() === "collection" ? 42 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.page() === "studio" && ctx.work()) ? 43 : -1, tmp_11_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.page() === "ledger" ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.page() === "heist" ? 45 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("\u2190 Return ", ctx.page() === "studio" ? "to my painting" : "to my work");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.sourceList());
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_16_0 = ctx.encounter()) ? 63 : -1, tmp_16_0);
    }
  }, dependencies: [WorkspaceToolsComponent, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, PaintingCanvasComponent, RestorationEditorComponent, EncounterComponent, AcademicLockComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  background: #101d17;\n  color: #eee8d9;\n  min-height: 100vh;\n  font-family: Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.restoration-world[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      ellipse at 80% 0,\n      rgba(52, 66, 50, 0.3333333333),\n      transparent 50%);\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 1px solid #5e7163;\n  background: #20352a;\n  color: #f0e9d7;\n  padding: 11px 17px;\n  border-radius: 6px;\n  cursor: pointer;\n  min-height: 44px;\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #354b3b;\n  border-color: #c6b07a;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ebc982;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #eac989;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #dfc285;\n  color: #15251b;\n  border-color: #dfc285;\n  font-weight: 700;\n}\n.primary[_ngcontent-%COMP%]:hover {\n  background: #f2d9a4;\n}\np[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.7;\n  color: #c0cdc0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(32px, 4vw, 52px);\n  line-height: 1.1;\n  margin: 11px 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 34px;\n  margin: 8px 0 16px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 8px 0 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #d5b779;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  line-height: 1.8;\n}\n.topbar[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  gap: 25px;\n  padding: 20px 40px;\n  border-bottom: 1px solid rgba(82, 100, 79, 0.4);\n}\n.brand[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #eddbab;\n  letter-spacing: 3px;\n  font-size: 15px;\n  font-weight: 700;\n}\n.brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #acbda9;\n  letter-spacing: 1px;\n  margin-left: 12px;\n}\n.practice[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 11px;\n  color: #aabbac;\n}\n.topbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  background: transparent;\n}\n.content[_ngcontent-%COMP%] {\n  max-width: 1360px;\n  margin: auto;\n  padding: 35px 40px;\n}\n.masthead[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.masthead[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.progress-medallion[_ngcontent-%COMP%] {\n  flex: none;\n  border: 1px solid #b19458;\n  border-radius: 50%;\n  width: 118px;\n  height: 118px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  box-shadow: inset 0 0 0 7px #283429;\n}\n.progress-medallion[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 40px Georgia;\n  color: #efcf8a;\n}\n.progress-medallion[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #b4bba5;\n}\n.progress-medallion[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  margin-top: 4px;\n  color: #cbd4bc;\n}\n.journey[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  border-block: 1px solid #4a5b49;\n  margin-bottom: 32px;\n}\n.journey[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  display: flex;\n  gap: 14px;\n  align-items: center;\n  text-align: left;\n  padding: 20px;\n}\n.journey[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  border-left: 1px solid #4a5b49;\n}\n.journey[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 24px Georgia;\n  color: #a6956b;\n}\n.journey[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n}\n.journey[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #a2b3a1;\n  margin-top: 4px;\n}\n.journey[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%] {\n  background: #2a3c2d;\n  border-bottom: 2px solid #d7ba79;\n}\n.intro-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  gap: 60px;\n  align-items: center;\n  padding: 34px;\n  background:\n    linear-gradient(\n      130deg,\n      #2a3b2a,\n      #192a20);\n  border: 1px solid #506048;\n  border-radius: 10px;\n}\n.intro-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 38px;\n  max-width: 490px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.intro-panel[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.how-to[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 18px;\n}\n.how-to[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  font-size: 12px;\n  color: #b9c5b5;\n  line-height: 1.6;\n}\n.how-to[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  flex: none;\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #83926b;\n  border-radius: 50%;\n  color: #e5c991;\n  font: 18px Georgia;\n}\n.how-to[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #eee4c9;\n  font-size: 13px;\n  font-weight: 400;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 20px;\n  margin: 38px 0 16px;\n}\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 27px;\n  margin: 0;\n}\n.section-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a7b8a3;\n  font-size: 11px;\n}\n.collection-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 22px;\n}\n.work-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  padding: 0;\n  overflow: hidden;\n  border: 1px solid #42523e;\n  background: #1b2b20;\n  border-radius: 8px;\n}\n.work-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  background: #26372a;\n}\n.thumbnail[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n}\n.thumbnail[_ngcontent-%COMP%]   app-restoration-canvas[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.work-number[_ngcontent-%COMP%], \n.work-status[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-size: 10px;\n  background: rgba(24, 34, 29, 0.9098039216);\n  padding: 6px 8px;\n  border: 1px solid rgba(203, 186, 136, 0.4);\n  border-radius: 4px;\n}\n.work-status[_ngcontent-%COMP%] {\n  left: auto;\n  right: 10px;\n  color: #e2c793;\n}\n.work-status.checked[_ngcontent-%COMP%] {\n  background: #294c35;\n  color: #d6efc5;\n}\n.card-copy[_ngcontent-%COMP%] {\n  padding: 18px 15px;\n}\n.card-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #c3b380;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.card-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 21px;\n  line-height: 1.2;\n  min-height: 50px;\n  margin: 10px 0;\n}\n.card-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 10px;\n  min-height: 32px;\n  line-height: 1.6;\n}\n.card-link[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid rgba(77, 91, 69, 0.4);\n  padding-top: 14px;\n  margin-top: 13px;\n  font-size: 10px;\n  color: #d6c796;\n}\n.studio-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  margin-bottom: 20px;\n}\n.studio-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  max-width: 800px;\n}\n.studio-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.studio-heading[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  flex: none;\n}\n.text-button[_ngcontent-%COMP%] {\n  padding: 4px 0;\n  background: transparent;\n  border: 0;\n  color: #d8c68e;\n  font-size: 12px;\n}\n.portal-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 64px 1fr auto;\n  align-items: center;\n  gap: 22px;\n  padding: 22px 26px;\n  border: 1px solid #687256;\n  border-radius: 10px;\n  background: #283628;\n  margin: 20px 0 30px;\n}\n.portal-strip.has-story[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      115deg,\n      #243f35,\n      #26352a 60%,\n      #4b4730);\n}\n.portal-strip[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 0;\n}\n.portal-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 4px 0;\n}\n.portal-strip[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  font-size: 9px;\n}\n.portal-symbol[_ngcontent-%COMP%] {\n  font: 80px/1 Georgia;\n  color: #e6cf91;\n  text-shadow: 0 0 15px rgba(209, 207, 131, 0.4);\n}\n.portal-strip[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.completion-strip[_ngcontent-%COMP%] {\n  margin: 28px 0;\n  display: flex;\n  gap: 25px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 26px;\n  border: 1px solid #93a570;\n  background: #2c422e;\n  border-radius: 10px;\n}\n.completion-strip[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #edd39a;\n}\n.completion-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 640px;\n  font-size: 13px;\n}\n.ledger-heading[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin-bottom: 30px;\n}\n.ledger-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n.ledger-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #4e634d;\n  border-radius: 9px;\n  padding: 22px;\n  background: #192b20;\n}\n.ledger-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.ledger-index[_ngcontent-%COMP%] {\n  font: 28px Georgia;\n  color: #c2ab71;\n  min-width: 30px;\n}\n.ledger-top[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #b8c7ae;\n}\n.ledger-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 7px 0;\n}\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #d9c38f;\n  margin-left: auto;\n  padding: 8px;\n  border: 1px solid #839469;\n  border-radius: 20px;\n}\n.repair-records[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-top: 20px;\n  padding-top: 12px;\n  border-top: 1px solid #516349;\n}\n.repair-records[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font: 18px Georgia;\n  color: #dfcda0;\n  margin: 8px 0;\n}\n.repair-records[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.repair-records[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #d6dfce;\n}\n.repair-records[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #c7d4be;\n  margin: 12px 0 0;\n  padding: 10px 15px;\n  border-left: 2px solid #aa9f6c;\n  background: #233729;\n  white-space: pre-wrap;\n}\n.reflection[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  border: 1px solid #6f7955;\n  padding: 28px;\n  border-radius: 10px;\n}\n.reflection[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin: 10px 0 15px;\n  padding: 16px;\n  border: 1px solid #6b795f;\n  border-radius: 6px;\n  background: #132219;\n  color: #e7e8d5;\n  resize: vertical;\n  font: 14px/1.7 Arial;\n}\n.reflection[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.reflection[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  color: #b6c5ad;\n  font-size: 11px;\n}\n.heist-intro[_ngcontent-%COMP%] {\n  max-width: 900px;\n}\n.locked-panel[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 50px 25px;\n  margin: 24px 0;\n  border: 1px solid #6b7352;\n  background:\n    radial-gradient(\n      ellipse,\n      #3e472e,\n      #1c2d21);\n  border-radius: 12px;\n}\n.locked-panel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 60px Georgia;\n  color: #e6c788;\n}\n.locked-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 650px;\n  margin: 16px auto 26px;\n}\n.vault-audit[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 0;\n  list-style: none;\n  gap: 10px;\n  margin: 30px 0;\n}\n.vault-audit[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  border: 1px solid #4b5a44;\n  background: #1b2a20;\n  padding: 15px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.vault-audit[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  color: #9ead94;\n}\n.vault-audit[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 23px Georgia;\n  color: #afac7a;\n}\n.vault-audit[_ngcontent-%COMP%]   .passed[_ngcontent-%COMP%] {\n  background: #30472e;\n  border-color: #91a56b;\n}\n.vault-audit[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  border-color: #e0c385;\n  background: #3d432d;\n}\n.heist-tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.heist-tools[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 12px;\n  color: #c2cca9;\n}\napp-academic-lock[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 850px;\n  margin: auto;\n}\n.notice[_ngcontent-%COMP%], \n.warning[_ngcontent-%COMP%] {\n  padding: 14px 18px;\n  border: 1px solid #96885b;\n  background: #393c27;\n  border-radius: 6px;\n  font-size: 13px;\n  color: #eedcb0;\n}\n.warning[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  margin-top: 50px;\n  border-top: 1px solid #46533e;\n  padding: 22px 0;\n  color: #9ead94;\n  font-size: 10px;\n}\nfooter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  background: transparent;\n}\ndialog[_ngcontent-%COMP%] {\n  background: #18291f;\n  color: #eee8d9;\n  border: 1px solid #8f9a6c;\n  border-radius: 12px;\n  padding: 28px;\n  max-height: 92dvh;\n  max-width: calc(100vw - 28px);\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(8, 17, 12, 0.8745098039);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.research-dialog[_ngcontent-%COMP%] {\n  width: 1050px;\n}\n.research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}\n.research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: none;\n}\n.source-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-top: 24px;\n}\n.source-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  border: 1px solid #526449;\n  border-radius: 7px;\n  background: #243628;\n}\n.source-grid[_ngcontent-%COMP%]   article.relevant[_ngcontent-%COMP%] {\n  border-color: #b2a16b;\n}\n.source-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #c8b27b;\n}\n.source-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.source-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.source-grid[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  line-height: 1.5;\n  margin-bottom: 18px;\n}\n.source-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.story-dialog[_ngcontent-%COMP%] {\n  width: 1300px;\n  padding: 0;\n  border-radius: 10px;\n}\n.reset-dialog[_ngcontent-%COMP%] {\n  width: 540px;\n}\n.reset-dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n@media (max-width: 1150px) {\n  .collection-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .intro-panel[_ngcontent-%COMP%] {\n    gap: 28px;\n    padding: 26px;\n  }\n  .portal-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 45px 1fr;\n  }\n  .portal-strip[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n    grid-column: 2;\n    flex-direction: row;\n  }\n  .portal-symbol[_ngcontent-%COMP%] {\n    font-size: 60px;\n  }\n  .vault-audit[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 800px) {\n  .content[_ngcontent-%COMP%] {\n    padding: 25px 22px;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    padding: 15px 22px;\n    gap: 15px;\n  }\n  .brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .intro-panel[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .intro-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 33px;\n  }\n  .how-to[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .collection-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 16px;\n  }\n  .journey[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 13px 10px;\n    gap: 8px;\n  }\n  .journey[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .journey[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .journey[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .studio-heading[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n  .completion-strip[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n  .ledger-top[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .ledger-top[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .repair-records[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .source-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n  .research-dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .progress-medallion[_ngcontent-%COMP%] {\n    width: 90px;\n    height: 90px;\n  }\n  .progress-medallion[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 31px;\n  }\n  .progress-medallion[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .section-heading[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .masthead[_ngcontent-%COMP%] {\n    gap: 15px;\n  }\n  .masthead[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .masthead[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n@media (max-width: 480px) {\n  .content[_ngcontent-%COMP%] {\n    padding: 22px 15px;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    max-width: 115px;\n    line-height: 1.4;\n  }\n  .topbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 7px 9px;\n  }\n  .progress-medallion[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .journey[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .journey[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 11px 14px;\n  }\n  .journey[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n    border-left: 0;\n    border-top: 1px solid #4a5b49;\n  }\n  .journey[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: inline;\n    margin-left: 8px;\n  }\n  .collection-grid[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .card-copy[_ngcontent-%COMP%] {\n    padding: 12px 10px;\n  }\n  .card-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 19px;\n    min-height: 66px;\n  }\n  .card-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .card-link[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .work-status[_ngcontent-%COMP%] {\n    font-size: 8px;\n    padding: 5px;\n  }\n  .work-number[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .how-to[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .intro-panel[_ngcontent-%COMP%] {\n    padding: 22px;\n  }\n  .portal-strip[_ngcontent-%COMP%] {\n    padding: 18px;\n    gap: 10px;\n    grid-template-columns: 1fr;\n  }\n  .portal-symbol[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .portal-strip[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .portal-strip[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .vault-audit[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vault-audit[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ledger-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ledger-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .ledger-top[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .reflection[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  dialog[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .story-dialog[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .heist-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .heist-tools[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n.content[_ngcontent-%COMP%] {\n  padding-top: 78px;\n}\n.scene-resources[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.scene-resources[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-right: auto;\n  font: 500 20px Georgia, serif;\n}\n.scene-resources[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.scene-resources[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.backup-tools[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  margin: 16px 0;\n  font-size: 12px;\n}\n@media (max-width: 600px) {\n  .content[_ngcontent-%COMP%] {\n    padding-top: 78px;\n  }\n  .scene-resources[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .scene-resources[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=restoration-collection.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationCollectionComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-collection", imports: [WorkspaceToolsComponent, FormsModule, PaintingCanvasComponent, RestorationEditorComponent, EncounterComponent, AcademicLockComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="restoration-world">\r
  <app-workspace-tools><header class="topbar"><a href="/projects" class="brand">FORGE <span>/ FIELD MISSIONS</span></a><span class="practice">Local practice \xB7 saves in this browser</span><button (click)="resetOpen.set(true)">New practice</button></header>    <nav class="journey" aria-label="Activity stages"><button [attr.aria-current]="page() === 'collection' || page() === 'studio' ? 'step' : null" (click)="go('collection')"><b>01</b><span>Restore the collection<small>Inspect \xB7 research \xB7 repair</small></span></button><button [attr.aria-current]="page() === 'ledger' ? 'step' : null" (click)="go('ledger')"><b>02</b><span>Your living ledger<small>Every clue and explanation</small></span></button><button [attr.aria-current]="page() === 'heist' ? 'step' : null" (click)="go('heist')"><b>03</b><span>The final heist<small>{{ state().extracted ? 'Collection recovered' : ready() ? 'Ready for recovery' : 'Unlocks after restoration' }}</small></span></button></nav><div class="backup-tools"><span>Illustrated classroom reconstructions \xB7 Evidence checks are local practice</span><button (click)="downloadLedger()">Save a copy of my ledger \u2193</button></div>@if (page() === 'studio' && work()) { <button [disabled]="downloadBusy()" (click)="downloadComparison()">Download before / after</button> }</app-workspace-tools>\r
  <div class="content">\r
\r
\r
    @if (runtime.warning()) { <aside class="warning" role="alert"><p>{{ runtime.warning() }}</p><button (click)="runtime.retrySave()" [disabled]="runtime.blocked()">Retry save</button><button (click)="downloadLedger()">Download current ledger</button></aside> }\r
    @if (message()) { <p class="notice" role="status">{{ message() }}</p> }\r
    @if (page() === 'collection') {\r
      <section class="intro-panel"><div><p class="eyebrow">Your commission</p><h2 #pageHeading tabindex="-1">Put history back in the picture.</h2><p>{{ mission.briefing }}</p><div class="actions">@if (nextWork(); as next) { <button class="primary" (click)="open(work() && !workState().verified ? work()! : next)">{{ completed() || work() ? 'Continue restoring' : 'Start the first painting' }} \u2192</button> } @else { <button class="primary" (click)="go('heist')">Enter the final heist \u2192</button> }<button (click)="research()">Browse the reference desk</button></div></div><ol class="how-to"><li><b>1</b><span><strong>Inspect the marked details</strong>What does the original image claim?</span></li><li><b>2</b><span><strong>Follow the evidence</strong>Read sources or step through a story portal.</span></li><li><b>3</b><span><strong>Make the repair visible</strong>Remove, replace, relabel\u2014or keep a valid detail.</span></li><li><b>4</b><span><strong>Explain and check</strong>Save your evidence note, then compare the images.</span></li></ol></section>\r
      <div class="section-heading"><h2>The restoration collection</h2><span>{{ mission.works.length }} restoration commissions</span></div>\r
      <div class="collection-grid">@for (w of mission.works; track w.id; let i = $index) {\r
        <button class="work-card" (click)="open(w)" [attr.aria-label]="'Open ' + w.title"><div class="thumbnail"><app-restoration-canvas [definition]="w" [state]="stateFor(w.id)" [interactive]="false" /><span class="work-number">{{ i + 1 < 10 ? '0' : '' }}{{ i + 1 }}</span><span class="work-status" [class.checked]="stateFor(w.id).verified">{{ stateFor(w.id).verified ? '\u2713 Checked' : stateFor(w.id).inspected.length ? 'In progress' : 'To restore' }}</span></div><div class="card-copy"><small>{{ w.collection }}</small><h3>{{ w.title }}</h3><p>{{ w.location }} \xB7 {{ w.date }}</p><span class="card-link">{{ w.encounterId ? '\u25CC Story portal available' : '\u2315 Research desk' }}<b>\u2197</b></span></div></button>\r
      }</div>\r
    }\r
    @if (page() === 'studio' && work(); as w) {\r
      <div class="scene-resources">\r
        <span #pageHeading tabindex="-1">{{ w.title }}</span>\r
        @if (portal()) { <button (click)="enterStory()">Story portal \u2197</button> }\r
        <button (click)="research()">Sources</button>\r
      </div>\r
      <app-restoration-editor [definition]="w" [state]="workState()" [sources]="mission.sourceGallery.evidence" [readOnly]="state().heistStarted || runtime.blocked()" (action)="repair($event)" (research)="research()" />\r
      @if (workState().verified) { <section class="completion-strip"><div><h3>One more piece of history restored.</h3><p>The image, original claim, and explanation are in your ledger. {{ completed() }} of {{ mission.works.length }} paintings have passed the evidence check.</p></div><div class="actions"><button (click)="go('ledger')">View my ledger</button>@if (nextWork(); as next) { <button class="primary" (click)="open(next)">Next painting \u2192</button> } @else { <button class="primary" (click)="go('heist')">Continue to the heist \u2192</button> }</div></section> }\r
    }\r
    @if (page() === 'ledger') {\r
      <section class="ledger-heading"><p class="eyebrow">A record that grows with your work</p><h2 #pageHeading tabindex="-1">The living restoration ledger</h2><p>Every forgery has a place here: its original claim, your repair, your reference, and your reasoning. {{ completed() }} / {{ mission.works.length }} evidence checks passed.</p><div class="actions"><button (click)="downloadLedger()">Download evidence ledger</button><button [disabled]="downloadBusy()" (click)="downloadExhibition()">{{ downloadBusy() ? 'Preparing exhibition\u2026' : 'Download illustrated exhibition' }}</button></div></section>\r
      <div class="ledger-list">@for (w of mission.works; track w.id; let i = $index) { <article><div class="ledger-top"><span class="ledger-index">{{ i + 1 }}</span><div><small>{{ w.location }} \xB7 {{ w.date }}</small><h3>{{ w.title }}</h3></div><span class="status-pill">{{ stateFor(w.id).verified ? '\u2713 Evidence checked' : 'Needs restoration' }}</span><button (click)="open(w)">{{ state().heistStarted ? 'View painting' : 'Open studio' }} \u2197</button></div><div class="repair-records">@for (r of w.regions; track r.id) { <section><h4>{{ r.title }}</h4><p><b>Original claim:</b> {{ r.claim }}</p><p><b>Image decision:</b> {{ optionLabel(w, r.id) }}</p><p><b>Evidence:</b> {{ sourceTitle(stateFor(w.id).notes[r.id]?.evidenceId) }} \xB7 {{ stateFor(w.id).notes[r.id]?.relationship || 'Relationship not selected' }}</p><blockquote>{{ stateFor(w.id).notes[r.id]?.explanation || 'Your explanation will appear here.' }}</blockquote></section> }</div></article> }</div>\r
      <section class="reflection"><h3>Write the exhibition label</h3><p>How did the forgeries change the story? Describe a repair, a detail you preserved, and a question your sources cannot answer. Whose perspective would you seek next?</p><label for="museum-label">Your museum label</label><textarea id="museum-label" rows="5" maxlength="4000" [ngModel]="label()" (ngModelChange)="label.set($event)" (blur)="saveLabel()"></textarea><button (click)="saveLabel()">Save museum label</button><small>Written explanations and this label are saved for teacher review.</small></section>\r
    }\r
    @if (page() === 'heist') {\r
      <section class="heist-intro"><p class="eyebrow">The final recovery \xB7 No countdown</p><h2 #pageHeading tabindex="-1">{{ state().extracted ? 'The collection is yours to exhibit.' : 'The vault audit' }}</h2><p>{{ mission.heistBriefing }}</p></section>\r
      @if (!ready()) { <section class="locked-panel"><span aria-hidden="true">\u2311</span><h3>{{ mission.works.length - completed() }} paintings still need your care.</h3><p>The restoration work prepares you for the heist. Finish the evidence checks before operating the vault.</p>@if (nextWork(); as next) { <button class="primary" (click)="open(next)">Restore the next painting \u2192</button> }</section> }\r
      @else if (!state().heistStarted) { <section class="locked-panel"><span aria-hidden="true">\u2726</span><h3>The evidence is ready. Begin the recovery.</h3><p>Starting the heist seals your checked reconstructions into the recovery record. The ledger and references remain available throughout the challenge.</p><button class="primary" (click)="startHeist()">Begin the final heist \u2192</button></section> }\r
      @else {\r
        <ol class="vault-audit">@for (id of mission.finalLockIds; track id; let i = $index) { <li [class.passed]="state().solvedLocks.includes(id)" [class.current]="nextLock()?.id === id"><b>{{ state().solvedLocks.includes(id) ? '\u2713' : i + 1 }}</b><span>{{ lockTitle(id) }}<small>{{ state().solvedLocks.includes(id) ? 'Mechanism passed' : nextLock()?.id === id ? 'Your next challenge' : 'Awaiting access' }}</small></span></li> }</ol>\r
        @if (nextLock(); as lock) { <div class="heist-tools"><button (click)="research()">Open references</button><button (click)="go('ledger')">Consult my restoration ledger</button><span>{{ state().solvedLocks.length }}/{{ mission.finalLockIds.length }} mechanisms passed</span></div><app-academic-lock [lock]="lock" [saved]="lockDrafts()[lock.id] || state().answers[lock.id]" (operate)="operate($event)" /> }\r
        @else if (!state().extracted) { <section class="locked-panel"><h3>The vault is open.</h3><p>All five mechanisms passed. Your corrected collection and evidence ledger are ready to leave the vault.</p><button class="primary" (click)="extract()">Recover the collection \u2192</button></section> }\r
        @else { <section class="completion-strip"><div><h3>Recovery complete.</h3><p>Exhibit the original and corrected images together, with the evidence that changed your decisions.</p></div><div class="actions"><button (click)="go('ledger')">Finish my museum label</button><button class="primary" [disabled]="downloadBusy()" (click)="downloadExhibition()">Download the exhibition</button></div></section> }\r
      }\r
    }\r
\r
  </div>\r
</main>\r
<dialog #researchDialog class="research-dialog" aria-labelledby="research-title" (cancel)="$event.preventDefault(); closeResearch()"><header><div><p class="eyebrow">Read \u2192 Compare \u2192 Return</p><h2 id="research-title">The research desk</h2></div><button (click)="closeResearch()">\u2190 Return {{ page() === 'studio' ? 'to my painting' : 'to my work' }}</button></header><p>References most relevant to your current task appear first. Read their claims, check their provenance, then attach the useful reference to your repair.</p><div class="source-grid">@for (s of sourceList(); track s.id) { <article [class.relevant]="sourceIds().includes(s.id)"><small>{{ sourceIds().includes(s.id) ? 'Relevant to this task' : 'Collection reference' }}</small><h3>{{ s.title }}</h3><p>{{ s.text }}</p><a [href]="s.sourceUrl" target="_blank" rel="noopener noreferrer">{{ s.sourceTitle }} \u2197</a><button [disabled]="state().sourcesRead.includes(s.id)" (click)="runtime.send({ type: 'read', evidenceId: s.id })">{{ state().sourcesRead.includes(s.id) ? '\u2713 Consulted' : 'Mark as consulted' }}</button></article> }</div></dialog>\r
<dialog #storyDialog class="story-dialog" aria-label="Historical story portal" (cancel)="$event.preventDefault(); leaveStory()">@if (encounter(); as encounter) { <app-historical-encounter [definition]="encounter" [state]="encounterState()!" [sources]="mission.sourceGallery.evidence" returnLabel="Return to my painting" (action)="storyAction($event)" (leave)="leaveStory()" /> }</dialog>\r
<dialog #resetDialog class="reset-dialog" aria-labelledby="reset-title" (cancel)="resetOpen.set(false)"><h2 id="reset-title">Start a new local practice?</h2><p>This replaces the restoration progress for this practice in this browser. Download the ledger first if you want to keep a copy.</p><div class="actions"><button (click)="downloadLedger()">Download ledger</button><button (click)="resetOpen.set(false)">Keep working</button><button (click)="reset()">Start new practice</button></div></dialog>\r
\r
`, styles: ["/* src/app/templates/heist/restoration/restoration-collection.component.scss */\n:host {\n  display: block;\n  background: #101d17;\n  color: #eee8d9;\n  min-height: 100vh;\n  font-family: Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.restoration-world {\n  background:\n    radial-gradient(\n      ellipse at 80% 0,\n      rgba(52, 66, 50, 0.3333333333),\n      transparent 50%);\n}\nbutton,\na,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  border: 1px solid #5e7163;\n  background: #20352a;\n  color: #f0e9d7;\n  padding: 11px 17px;\n  border-radius: 6px;\n  cursor: pointer;\n  min-height: 44px;\n  font-size: 13px;\n}\nbutton:hover {\n  background: #354b3b;\n  border-color: #c6b07a;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton:focus-visible,\na:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #ebc982;\n  outline-offset: 3px;\n}\na {\n  color: #eac989;\n}\n.primary {\n  background: #dfc285;\n  color: #15251b;\n  border-color: #dfc285;\n  font-weight: 700;\n}\n.primary:hover {\n  background: #f2d9a4;\n}\np {\n  font-size: 14px;\n  line-height: 1.7;\n  color: #c0cdc0;\n}\nh1,\nh2,\nh3 {\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\nh1 {\n  font-size: clamp(32px, 4vw, 52px);\n  line-height: 1.1;\n  margin: 11px 0;\n}\nh2 {\n  font-size: 34px;\n  margin: 8px 0 16px;\n}\nh3 {\n  font-size: 24px;\n  margin: 8px 0 12px;\n}\n.eyebrow {\n  color: #d5b779;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  line-height: 1.8;\n}\n.topbar {\n  max-width: 1440px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  gap: 25px;\n  padding: 20px 40px;\n  border-bottom: 1px solid rgba(82, 100, 79, 0.4);\n}\n.brand {\n  text-decoration: none;\n  color: #eddbab;\n  letter-spacing: 3px;\n  font-size: 15px;\n  font-weight: 700;\n}\n.brand span {\n  font-size: 9px;\n  color: #acbda9;\n  letter-spacing: 1px;\n  margin-left: 12px;\n}\n.practice {\n  margin-left: auto;\n  font-size: 11px;\n  color: #aabbac;\n}\n.topbar button {\n  font-size: 11px;\n  background: transparent;\n}\n.content {\n  max-width: 1360px;\n  margin: auto;\n  padding: 35px 40px;\n}\n.masthead {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.masthead p {\n  margin: 5px 0;\n}\n.progress-medallion {\n  flex: none;\n  border: 1px solid #b19458;\n  border-radius: 50%;\n  width: 118px;\n  height: 118px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  box-shadow: inset 0 0 0 7px #283429;\n}\n.progress-medallion strong {\n  font: 40px Georgia;\n  color: #efcf8a;\n}\n.progress-medallion small {\n  font-size: 20px;\n  color: #b4bba5;\n}\n.progress-medallion span {\n  font-size: 10px;\n  margin-top: 4px;\n  color: #cbd4bc;\n}\n.journey {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  border-block: 1px solid #4a5b49;\n  margin-bottom: 32px;\n}\n.journey button {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  display: flex;\n  gap: 14px;\n  align-items: center;\n  text-align: left;\n  padding: 20px;\n}\n.journey button + button {\n  border-left: 1px solid #4a5b49;\n}\n.journey b {\n  font: 24px Georgia;\n  color: #a6956b;\n}\n.journey span {\n  font-size: 13px;\n  line-height: 1.5;\n}\n.journey small {\n  display: block;\n  font-size: 10px;\n  color: #a2b3a1;\n  margin-top: 4px;\n}\n.journey [aria-current=step] {\n  background: #2a3c2d;\n  border-bottom: 2px solid #d7ba79;\n}\n.intro-panel {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  gap: 60px;\n  align-items: center;\n  padding: 34px;\n  background:\n    linear-gradient(\n      130deg,\n      #2a3b2a,\n      #192a20);\n  border: 1px solid #506048;\n  border-radius: 10px;\n}\n.intro-panel h2 {\n  font-size: 38px;\n  max-width: 490px;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.intro-panel .actions {\n  margin-top: 24px;\n}\n.how-to {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 18px;\n}\n.how-to li {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  font-size: 12px;\n  color: #b9c5b5;\n  line-height: 1.6;\n}\n.how-to b {\n  flex: none;\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #83926b;\n  border-radius: 50%;\n  color: #e5c991;\n  font: 18px Georgia;\n}\n.how-to strong {\n  display: block;\n  color: #eee4c9;\n  font-size: 13px;\n  font-weight: 400;\n}\n.section-heading {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 20px;\n  margin: 38px 0 16px;\n}\n.section-heading h2 {\n  font-size: 27px;\n  margin: 0;\n}\n.section-heading span {\n  color: #a7b8a3;\n  font-size: 11px;\n}\n.collection-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 22px;\n}\n.work-card {\n  display: block;\n  text-align: left;\n  padding: 0;\n  overflow: hidden;\n  border: 1px solid #42523e;\n  background: #1b2b20;\n  border-radius: 8px;\n}\n.work-card:hover {\n  transform: translateY(-3px);\n  background: #26372a;\n}\n.thumbnail {\n  position: relative;\n  overflow: hidden;\n}\n.thumbnail app-restoration-canvas {\n  pointer-events: none;\n}\n.work-number,\n.work-status {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-size: 10px;\n  background: rgba(24, 34, 29, 0.9098039216);\n  padding: 6px 8px;\n  border: 1px solid rgba(203, 186, 136, 0.4);\n  border-radius: 4px;\n}\n.work-status {\n  left: auto;\n  right: 10px;\n  color: #e2c793;\n}\n.work-status.checked {\n  background: #294c35;\n  color: #d6efc5;\n}\n.card-copy {\n  padding: 18px 15px;\n}\n.card-copy small {\n  font-size: 9px;\n  color: #c3b380;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.card-copy h3 {\n  font-size: 21px;\n  line-height: 1.2;\n  min-height: 50px;\n  margin: 10px 0;\n}\n.card-copy p {\n  font-size: 10px;\n  min-height: 32px;\n  line-height: 1.6;\n}\n.card-link {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid rgba(77, 91, 69, 0.4);\n  padding-top: 14px;\n  margin-top: 13px;\n  font-size: 10px;\n  color: #d6c796;\n}\n.studio-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  margin-bottom: 20px;\n}\n.studio-heading > div {\n  max-width: 800px;\n}\n.studio-heading h2 {\n  margin-bottom: 10px;\n}\n.studio-heading > button {\n  flex: none;\n}\n.text-button {\n  padding: 4px 0;\n  background: transparent;\n  border: 0;\n  color: #d8c68e;\n  font-size: 12px;\n}\n.portal-strip {\n  display: grid;\n  grid-template-columns: 64px 1fr auto;\n  align-items: center;\n  gap: 22px;\n  padding: 22px 26px;\n  border: 1px solid #687256;\n  border-radius: 10px;\n  background: #283628;\n  margin: 20px 0 30px;\n}\n.portal-strip.has-story {\n  background:\n    linear-gradient(\n      115deg,\n      #243f35,\n      #26352a 60%,\n      #4b4730);\n}\n.portal-strip h3 {\n  font-size: 24px;\n  margin: 0;\n}\n.portal-strip p {\n  font-size: 12px;\n  margin: 4px 0;\n}\n.portal-strip .eyebrow {\n  font-size: 9px;\n}\n.portal-symbol {\n  font: 80px/1 Georgia;\n  color: #e6cf91;\n  text-shadow: 0 0 15px rgba(209, 207, 131, 0.4);\n}\n.portal-strip .actions {\n  flex-direction: column;\n}\n.completion-strip {\n  margin: 28px 0;\n  display: flex;\n  gap: 25px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 26px;\n  border: 1px solid #93a570;\n  background: #2c422e;\n  border-radius: 10px;\n}\n.completion-strip h3 {\n  color: #edd39a;\n}\n.completion-strip p {\n  max-width: 640px;\n  font-size: 13px;\n}\n.ledger-heading {\n  max-width: 900px;\n  margin-bottom: 30px;\n}\n.ledger-list {\n  display: grid;\n  gap: 18px;\n}\n.ledger-list article {\n  border: 1px solid #4e634d;\n  border-radius: 9px;\n  padding: 22px;\n  background: #192b20;\n}\n.ledger-top {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.ledger-index {\n  font: 28px Georgia;\n  color: #c2ab71;\n  min-width: 30px;\n}\n.ledger-top small {\n  font-size: 10px;\n  color: #b8c7ae;\n}\n.ledger-top h3 {\n  font-size: 24px;\n  margin: 7px 0;\n}\n.status-pill {\n  font-size: 10px;\n  color: #d9c38f;\n  margin-left: auto;\n  padding: 8px;\n  border: 1px solid #839469;\n  border-radius: 20px;\n}\n.repair-records {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-top: 20px;\n  padding-top: 12px;\n  border-top: 1px solid #516349;\n}\n.repair-records h4 {\n  font: 18px Georgia;\n  color: #dfcda0;\n  margin: 8px 0;\n}\n.repair-records p {\n  font-size: 12px;\n}\n.repair-records b {\n  color: #d6dfce;\n}\n.repair-records blockquote {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #c7d4be;\n  margin: 12px 0 0;\n  padding: 10px 15px;\n  border-left: 2px solid #aa9f6c;\n  background: #233729;\n  white-space: pre-wrap;\n}\n.reflection {\n  margin-top: 30px;\n  border: 1px solid #6f7955;\n  padding: 28px;\n  border-radius: 10px;\n}\n.reflection textarea {\n  display: block;\n  width: 100%;\n  margin: 10px 0 15px;\n  padding: 16px;\n  border: 1px solid #6b795f;\n  border-radius: 6px;\n  background: #132219;\n  color: #e7e8d5;\n  resize: vertical;\n  font: 14px/1.7 Arial;\n}\n.reflection label {\n  font-size: 13px;\n}\n.reflection small {\n  display: block;\n  margin-top: 12px;\n  color: #b6c5ad;\n  font-size: 11px;\n}\n.heist-intro {\n  max-width: 900px;\n}\n.locked-panel {\n  text-align: center;\n  padding: 50px 25px;\n  margin: 24px 0;\n  border: 1px solid #6b7352;\n  background:\n    radial-gradient(\n      ellipse,\n      #3e472e,\n      #1c2d21);\n  border-radius: 12px;\n}\n.locked-panel > span {\n  font: 60px Georgia;\n  color: #e6c788;\n}\n.locked-panel p {\n  max-width: 650px;\n  margin: 16px auto 26px;\n}\n.vault-audit {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 0;\n  list-style: none;\n  gap: 10px;\n  margin: 30px 0;\n}\n.vault-audit li {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  border: 1px solid #4b5a44;\n  background: #1b2a20;\n  padding: 15px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.vault-audit small {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  color: #9ead94;\n}\n.vault-audit b {\n  font: 23px Georgia;\n  color: #afac7a;\n}\n.vault-audit .passed {\n  background: #30472e;\n  border-color: #91a56b;\n}\n.vault-audit .current {\n  border-color: #e0c385;\n  background: #3d432d;\n}\n.heist-tools {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.heist-tools span {\n  margin-left: auto;\n  font-size: 12px;\n  color: #c2cca9;\n}\napp-academic-lock {\n  display: block;\n  max-width: 850px;\n  margin: auto;\n}\n.notice,\n.warning {\n  padding: 14px 18px;\n  border: 1px solid #96885b;\n  background: #393c27;\n  border-radius: 6px;\n  font-size: 13px;\n  color: #eedcb0;\n}\n.warning button {\n  margin-right: 10px;\n}\nfooter {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  margin-top: 50px;\n  border-top: 1px solid #46533e;\n  padding: 22px 0;\n  color: #9ead94;\n  font-size: 10px;\n}\nfooter button {\n  font-size: 11px;\n  background: transparent;\n}\ndialog {\n  background: #18291f;\n  color: #eee8d9;\n  border: 1px solid #8f9a6c;\n  border-radius: 12px;\n  padding: 28px;\n  max-height: 92dvh;\n  max-width: calc(100vw - 28px);\n}\ndialog::backdrop {\n  background: rgba(8, 17, 12, 0.8745098039);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.research-dialog {\n  width: 1050px;\n}\n.research-dialog header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}\n.research-dialog header h2 {\n  font-size: 32px;\n}\n.research-dialog header p {\n  margin: 0;\n}\n.research-dialog header button {\n  flex: none;\n}\n.source-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-top: 24px;\n}\n.source-grid article {\n  padding: 22px;\n  border: 1px solid #526449;\n  border-radius: 7px;\n  background: #243628;\n}\n.source-grid article.relevant {\n  border-color: #b2a16b;\n}\n.source-grid small {\n  font-size: 9px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #c8b27b;\n}\n.source-grid h3 {\n  font-size: 24px;\n}\n.source-grid p {\n  font-size: 13px;\n}\n.source-grid a {\n  display: block;\n  font-size: 11px;\n  line-height: 1.5;\n  margin-bottom: 18px;\n}\n.source-grid button {\n  font-size: 11px;\n}\n.story-dialog {\n  width: 1300px;\n  padding: 0;\n  border-radius: 10px;\n}\n.reset-dialog {\n  width: 540px;\n}\n.reset-dialog h2 {\n  font-size: 28px;\n}\n@media (max-width: 1150px) {\n  .collection-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .intro-panel {\n    gap: 28px;\n    padding: 26px;\n  }\n  .portal-strip {\n    grid-template-columns: 45px 1fr;\n  }\n  .portal-strip .actions {\n    grid-column: 2;\n    flex-direction: row;\n  }\n  .portal-symbol {\n    font-size: 60px;\n  }\n  .vault-audit {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 800px) {\n  .content {\n    padding: 25px 22px;\n  }\n  .topbar {\n    padding: 15px 22px;\n    gap: 15px;\n  }\n  .brand span {\n    display: none;\n  }\n  .intro-panel {\n    grid-template-columns: 1fr;\n  }\n  .intro-panel h2 {\n    font-size: 33px;\n  }\n  .how-to {\n    grid-template-columns: 1fr 1fr;\n  }\n  .collection-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 16px;\n  }\n  .journey button {\n    padding: 13px 10px;\n    gap: 8px;\n  }\n  .journey span {\n    font-size: 11px;\n  }\n  .journey b {\n    font-size: 21px;\n  }\n  .journey small {\n    font-size: 9px;\n  }\n  .studio-heading {\n    align-items: start;\n    flex-direction: column;\n  }\n  .completion-strip {\n    align-items: start;\n    flex-direction: column;\n  }\n  .ledger-top {\n    flex-wrap: wrap;\n  }\n  .ledger-top .status-pill {\n    margin-left: 0;\n  }\n  .repair-records {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .source-grid {\n    grid-template-columns: 1fr;\n  }\n  .research-dialog header {\n    align-items: start;\n    flex-direction: column;\n  }\n  .research-dialog header button {\n    width: 100%;\n  }\n  .progress-medallion {\n    width: 90px;\n    height: 90px;\n  }\n  .progress-medallion strong {\n    font-size: 31px;\n  }\n  .progress-medallion span {\n    font-size: 8px;\n  }\n  .practice {\n    font-size: 9px;\n  }\n  .section-heading {\n    align-items: start;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .section-heading h2 {\n    font-size: 25px;\n  }\n  .masthead {\n    gap: 15px;\n  }\n  .masthead p {\n    font-size: 12px;\n  }\n  .masthead .eyebrow {\n    font-size: 9px;\n  }\n  h2 {\n    font-size: 29px;\n  }\n  footer {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n@media (max-width: 480px) {\n  .content {\n    padding: 22px 15px;\n  }\n  .topbar {\n    padding: 12px 15px;\n  }\n  .practice {\n    max-width: 115px;\n    line-height: 1.4;\n  }\n  .topbar button {\n    padding: 7px 9px;\n  }\n  .progress-medallion {\n    display: none;\n  }\n  .journey {\n    grid-template-columns: 1fr;\n  }\n  .journey button {\n    padding: 11px 14px;\n  }\n  .journey button + button {\n    border-left: 0;\n    border-top: 1px solid #4a5b49;\n  }\n  .journey small {\n    display: inline;\n    margin-left: 8px;\n  }\n  .collection-grid {\n    gap: 12px;\n  }\n  .card-copy {\n    padding: 12px 10px;\n  }\n  .card-copy h3 {\n    font-size: 19px;\n    min-height: 66px;\n  }\n  .card-copy small {\n    font-size: 8px;\n  }\n  .card-link {\n    font-size: 9px;\n  }\n  .work-status {\n    font-size: 8px;\n    padding: 5px;\n  }\n  .work-number {\n    display: none;\n  }\n  .how-to {\n    grid-template-columns: 1fr;\n  }\n  .intro-panel {\n    padding: 22px;\n  }\n  .portal-strip {\n    padding: 18px;\n    gap: 10px;\n    grid-template-columns: 1fr;\n  }\n  .portal-symbol {\n    display: none;\n  }\n  .portal-strip .actions {\n    grid-column: 1;\n  }\n  .portal-strip h3 {\n    font-size: 22px;\n  }\n  .vault-audit {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vault-audit li {\n    padding: 12px;\n  }\n  .ledger-list article {\n    padding: 18px;\n  }\n  .ledger-top h3 {\n    font-size: 22px;\n  }\n  .ledger-top > button {\n    width: 100%;\n  }\n  .reflection {\n    padding: 20px;\n  }\n  dialog {\n    padding: 20px;\n  }\n  .story-dialog {\n    padding: 0;\n  }\n  .heist-tools button {\n    width: 100%;\n  }\n  .heist-tools span {\n    margin-left: 0;\n  }\n  .actions button {\n    flex: 1;\n  }\n}\n.content {\n  padding-top: 78px;\n}\n.scene-resources {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.scene-resources > span {\n  margin-right: auto;\n  font: 500 20px Georgia, serif;\n}\n.scene-resources > span:focus {\n  outline: none;\n}\n.scene-resources button {\n  min-height: 44px;\n}\n.backup-tools {\n  display: grid;\n  gap: 12px;\n  margin: 16px 0;\n  font-size: 12px;\n}\n@media (max-width: 600px) {\n  .content {\n    padding-top: 78px;\n  }\n  .scene-resources {\n    flex-wrap: wrap;\n  }\n  .scene-resources > span {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=restoration-collection.component.css.map */\n"] }]
  }], () => [], { editor: [{ type: ViewChild, args: [forwardRef(() => RestorationEditorComponent), { isSignal: true }] }], lockEditor: [{ type: ViewChild, args: [forwardRef(() => AcademicLockComponent), { isSignal: true }] }], researchDialog: [{ type: ViewChild, args: ["researchDialog", { isSignal: true }] }], storyDialog: [{ type: ViewChild, args: ["storyDialog", { isSignal: true }] }], resetDialog: [{ type: ViewChild, args: ["resetDialog", { isSignal: true }] }], heading: [{ type: ViewChild, args: ["pageHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RestorationCollectionComponent, { className: "RestorationCollectionComponent", filePath: "src/app/templates/heist/restoration/restoration-collection.component.ts", lineNumber: 20 });
})();
export {
  RestorationCollectionComponent
};
//# debugId=05e6372b-e892-5ba1-b0e7-0392983a68ca
//# sourceMappingURL=chunk-CA7JHGKB.js.map
