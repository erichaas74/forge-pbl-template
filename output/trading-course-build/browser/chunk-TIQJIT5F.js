import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RangeValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  encounterReady
} from "./chunk-JAVOWGH2.js";
import {
  cargoMass
} from "./chunk-AVOS3LLT.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  Output,
  ViewChild,
  computed,
  effect,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
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
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/encounters/encounter.component.ts
var _c0 = ["heading"];
var _c1 = ["player"];
var _c2 = ["panel"];
var _forTrack0 = ($index, $item) => $item.id;
function EncounterComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "You can use the descriptions and account to continue.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_22_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.retryImage());
    });
    \u0275\u0275text(6, "Retry scene image");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("The scene image could not load. ", ctx_r2.definition().imageAlt);
  }
}
function EncounterComponent_Conditional_23_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_23_For_1_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const destination_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.go(destination_r5.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const destination_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("left", destination_r5.position, "%")("top", destination_r5.mode === "talk" ? 49 : 65, "%");
    \u0275\u0275classProp("person-pin", destination_r5.mode === "talk");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(destination_r5.mode === "talk" ? "\u25CC" : "\u2315");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(destination_r5.label);
  }
}
function EncounterComponent_Conditional_23_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EncounterComponent_Conditional_23_For_1_Conditional_0_Template, 4, 8, "button", 25);
  }
  if (rf & 2) {
    const destination_r5 = ctx.$implicit;
    \u0275\u0275conditional(destination_r5.mode === "talk" || destination_r5.mode === "object" ? 0 : -1);
  }
}
function EncounterComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, EncounterComponent_Conditional_23_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.definition().views);
  }
}
function EncounterComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function EncounterComponent_For_31_Template_button_click_0_listener() {
      const destination_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.go(destination_r7.id));
    });
    \u0275\u0275elementStart(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const destination_r7 = ctx.$implicit;
    const \u0275$index_70_r8 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", !ctx_r2.insightOpen() && ctx_r2.view().id === destination_r7.id);
    \u0275\u0275attribute("aria-pressed", !ctx_r2.insightOpen() && ctx_r2.view().id === destination_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.state().visitedViews.includes(destination_r7.id) ? "\u2713" : "0" + (\u0275$index_70_r8 + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(destination_r7.label);
  }
}
function EncounterComponent_Conditional_34_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "span");
    \u0275\u0275text(2, "\u2713 INSIGHT RECORDED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 32);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_34_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.pause();
      return \u0275\u0275resetView(ctx_r2.leave.emit());
    });
    \u0275\u0275text(6, "Return with this insight \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.definition().insight.explanation);
  }
}
function EncounterComponent_Conditional_34_Conditional_15_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r11 = ctx.$implicit;
    \u0275\u0275property("value", source_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r11.title);
  }
}
function EncounterComponent_Conditional_34_Conditional_15_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 38)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r12 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r12.text);
    \u0275\u0275advance();
    \u0275\u0275property("href", source_r12.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r12.sourceTitle, " \u2197");
  }
}
function EncounterComponent_Conditional_34_Conditional_15_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "Complete the three encounter steps above, then return here.");
    \u0275\u0275elementEnd();
  }
}
function EncounterComponent_Conditional_34_Conditional_15_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.definition().insight.hint);
  }
}
function EncounterComponent_Conditional_34_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "Use an independent reference to test the claim. The illustration is a reconstruction.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 34);
    \u0275\u0275text(3, "Which reference tests the claim?");
    \u0275\u0275elementStart(4, "select", 35);
    \u0275\u0275listener("ngModelChange", function EncounterComponent_Conditional_34_Conditional_15_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.evidenceId.set($event));
    });
    \u0275\u0275elementStart(5, "option", 36);
    \u0275\u0275text(6, "Choose a source");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, EncounterComponent_Conditional_34_Conditional_15_For_8_Template, 2, 2, "option", 37, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EncounterComponent_Conditional_34_Conditional_15_Conditional_9_Template, 7, 4, "article", 38);
    \u0275\u0275elementStart(10, "label", 34);
    \u0275\u0275text(11, "How does it relate to the claim?");
    \u0275\u0275elementStart(12, "select", 35);
    \u0275\u0275listener("ngModelChange", function EncounterComponent_Conditional_34_Conditional_15_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.relationship.set($event));
    });
    \u0275\u0275elementStart(13, "option", 36);
    \u0275\u0275text(14, "Choose a relationship");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 39);
    \u0275\u0275text(16, "Supports the claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 40);
    \u0275\u0275text(18, "Contradicts the claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 41);
    \u0275\u0275text(20, "Does not establish the claim");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 42);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_34_Conditional_15_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.checkInsight());
    });
    \u0275\u0275text(22, "Check & record insight \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, EncounterComponent_Conditional_34_Conditional_15_Conditional_23_Template, 2, 0, "p", 33);
    \u0275\u0275conditionalCreate(24, EncounterComponent_Conditional_34_Conditional_15_Conditional_24_Template, 2, 1, "p", 43);
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.evidenceId());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.evidence());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.chosenEvidence()) ? 9 : -1, tmp_7_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.relationship());
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !ctx_r2.readyForInsight() || !ctx_r2.evidenceId() || !ctx_r2.relationship());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.readyForInsight() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.state().lastCorrect === false ? 24 : -1);
  }
}
function EncounterComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "TAKE SOMETHING BACK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 28, 1);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul", 30)(8, "li");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "li");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "li");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, EncounterComponent_Conditional_34_Conditional_14_Template, 7, 1)(15, EncounterComponent_Conditional_34_Conditional_15_Template, 25, 6);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.definition().insight.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.definition().insight.claim);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.state().chapters.length ? "\u2713" : "\u25CB", " Read or listen to a story chapter");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.state().questions.length ? "\u2713" : "\u25CB", " Ask a question");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.state().features.length ? "\u2713" : "\u25CB", " Observe an object detail");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.state().insightEarned ? 14 : 15);
  }
}
function EncounterComponent_Conditional_35_Case_0_For_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_35_Case_0_For_17_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const destination_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.go(destination_r14.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "\u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const destination_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(destination_r14.label);
  }
}
function EncounterComponent_Conditional_35_Case_0_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EncounterComponent_Conditional_35_Case_0_For_17_Conditional_0_Template, 5, 1, "button", 48);
  }
  if (rf & 2) {
    const destination_r14 = ctx.$implicit;
    \u0275\u0275conditional(destination_r14.mode !== "observe" ? 0 : -1);
  }
}
function EncounterComponent_Conditional_35_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "YOU HAVE STEPPED INSIDE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 28, 1);
    \u0275\u0275text(4, "Stay a while.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 46)(8, "span", 47);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "blockquote");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, "Choose a place below, or use the markers in the scene. You can return to the painting at any time.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, EncounterComponent_Conditional_35_Case_0_For_17_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.definition().invitation);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.definition().host.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u201C", ctx_r2.definition().host.greeting, "\u201D");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.definition().host.role);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.definition().views);
  }
}
function EncounterComponent_Conditional_35_Case_1_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function EncounterComponent_Conditional_35_Case_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_35_Case_1_For_9_Template_button_click_0_listener() {
      const chapter_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openChapter(chapter_r16.id));
    });
    \u0275\u0275elementStart(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EncounterComponent_Conditional_35_Case_1_For_9_Conditional_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const chapter_r16 = ctx.$implicit;
    const \u0275$index_215_r17 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.state().chapterId === chapter_r16.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.state().chapterId === chapter_r16.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_215_r17 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(chapter_r16.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.state().chapters.includes(chapter_r16.id) ? 5 : -1);
  }
}
function EncounterComponent_Conditional_35_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "STORY TIME \xB7 MUSEUM AUDIO GUIDE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 28, 1);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 33);
    \u0275\u0275text(6, "Listen, read, pause, or stay a little longer. Each chapter\u2019s complete text appears below.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "nav", 50);
    \u0275\u0275repeaterCreate(8, EncounterComponent_Conditional_35_Case_1_For_9_Template, 6, 6, "button", 18, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.definition().title);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.definition().chapters);
  }
}
function EncounterComponent_Conditional_35_Case_2_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Follow-up \xB7 open the earlier question first");
    \u0275\u0275elementEnd();
  }
}
function EncounterComponent_Conditional_35_Case_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_35_Case_2_For_9_Template_button_click_0_listener() {
      const question_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.ask(question_r19.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, EncounterComponent_Conditional_35_Case_2_For_9_Conditional_3_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const question_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.state().questionId === question_r19.id);
    \u0275\u0275property("disabled", !!question_r19.requiresQuestionId && !ctx_r2.state().questions.includes(question_r19.requiresQuestionId));
    \u0275\u0275attribute("aria-pressed", ctx_r2.state().questionId === question_r19.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(question_r19.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(question_r19.requiresQuestionId && !ctx_r2.state().questions.includes(question_r19.requiresQuestionId) ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.state().questions.includes(question_r19.id) ? "\u2713" : "\u2197");
  }
}
function EncounterComponent_Conditional_35_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "A CONVERSATION IN THE SCENE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 28, 1);
    \u0275\u0275text(4, "Start with a question.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 51);
    \u0275\u0275repeaterCreate(8, EncounterComponent_Conditional_35_Case_2_For_9_Template, 6, 7, "button", 52, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r2.definition().host.role, ". Questions identify the speaker and their sources.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.definition().questions);
  }
}
function EncounterComponent_Conditional_35_Case_3_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_35_Case_3_For_12_Template_button_click_0_listener() {
      const feature_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.inspectFeature(feature_r22.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.selectedFeature() === feature_r22.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r22.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.state().features.includes(feature_r22.id) ? "\u2713" : "\uFF0B");
  }
}
function EncounterComponent_Conditional_35_Case_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.text);
  }
}
function EncounterComponent_Conditional_35_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "LOOK MORE CLOSELY");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 28, 1);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "div", 54);
    \u0275\u0275elementStart(8, "label", 34);
    \u0275\u0275text(9, "Move the inspection lens");
    \u0275\u0275elementStart(10, "input", 55);
    \u0275\u0275listener("ngModelChange", function EncounterComponent_Conditional_35_Case_3_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.lens.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, EncounterComponent_Conditional_35_Case_3_For_12_Template, 5, 4, "button", 56, _forTrack0);
    \u0275\u0275conditionalCreate(13, EncounterComponent_Conditional_35_Case_3_Conditional_13_Template, 2, 1, "p", 57);
  }
  if (rf & 2) {
    let tmp_12_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.definition().object.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.definition().object.description);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-image", "url(" + ctx_r2.definition().image + ")")("background-position", ctx_r2.lens() + "% 70%");
    \u0275\u0275attribute("aria-label", "Magnified illustration: " + ctx_r2.definition().object.title);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.lens());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.definition().object.features);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.feature()) ? 13 : -1, tmp_12_0);
  }
}
function EncounterComponent_Conditional_35_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1, "Audio is unavailable. The complete account is readable below.");
    \u0275\u0275elementEnd();
  }
}
function EncounterComponent_Conditional_35_Conditional_4_For_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275element(5, "br");
    \u0275\u0275elementStart(6, "a", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r24 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r24.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r24.text);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", source_r24.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r24.sourceTitle, " \u2197");
  }
}
function EncounterComponent_Conditional_35_Conditional_4_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EncounterComponent_Conditional_35_Conditional_4_For_14_Conditional_0_Template, 8, 4, "p");
  }
  if (rf & 2) {
    const source_r24 = ctx.$implicit;
    const line_r25 = \u0275\u0275nextContext();
    \u0275\u0275conditional(line_r25.evidenceIds.includes(source_r24.id) ? 0 : -1);
  }
}
function EncounterComponent_Conditional_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 45)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "audio", 58, 2);
    \u0275\u0275listener("error", function EncounterComponent_Conditional_35_Conditional_4_Template_audio_error_5_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.audioError.set(true));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, EncounterComponent_Conditional_35_Conditional_4_Conditional_7_Template, 2, 0, "p", 59);
    \u0275\u0275elementStart(8, "p", 60);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details")(11, "summary");
    \u0275\u0275text(12, "Sources behind this account");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, EncounterComponent_Conditional_35_Conditional_4_For_14_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r25 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r25.speaker);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r25.title);
    \u0275\u0275advance();
    \u0275\u0275property("src", line_r25.audioSrc);
    \u0275\u0275attribute("aria-label", "Listen to " + line_r25.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.audioError() ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r25.text);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.sources());
  }
}
function EncounterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EncounterComponent_Conditional_35_Case_0_Template, 18, 4)(1, EncounterComponent_Conditional_35_Case_1_Template, 10, 1)(2, EncounterComponent_Conditional_35_Case_2_Template, 10, 1)(3, EncounterComponent_Conditional_35_Case_3_Template, 14, 9);
    \u0275\u0275conditionalCreate(4, EncounterComponent_Conditional_35_Conditional_4_Template, 15, 6, "article", 45);
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.view().mode) === "observe" ? 0 : tmp_2_0 === "listen" ? 1 : tmp_2_0 === "talk" ? 2 : tmp_2_0 === "object" ? 3 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.spoken()) ? 4 : -1, tmp_3_0);
  }
}
function EncounterComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function EncounterComponent_Conditional_44_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showInsight());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.state().insightEarned ? "Review your insight" : "Keep an insight", " \u2197");
  }
}
var EncounterComponent = class _EncounterComponent {
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
  reducedMotion = input(
    false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  returnLabel = input(
    "Return to gallery",
    ...ngDevMode ? [{ debugName: "returnLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  action = output();
  leave = output();
  view = computed(
    () => this.definition().views.find((v) => v.id === this.state().viewId),
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readyForInsight = computed(
    () => encounterReady(this.state()),
    ...ngDevMode ? [{ debugName: "readyForInsight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  insightOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "insightOpen" }] : (
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
  lens = signal(
    50,
    ...ngDevMode ? [{ debugName: "lens" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedFeature = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedFeature" }] : (
      /* istanbul ignore next */
      []
    )
  );
  imageError = signal(
    false,
    ...ngDevMode ? [{ debugName: "imageError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioError = signal(
    false,
    ...ngDevMode ? [{ debugName: "audioError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  imageAttempt = signal(
    0,
    ...ngDevMode ? [{ debugName: "imageAttempt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  imageSrc = computed(
    () => this.definition().image + (this.imageAttempt() ? `?retry=${this.imageAttempt()}` : ""),
    ...ngDevMode ? [{ debugName: "imageSrc" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = computed(
    () => this.sources().filter((s) => this.definition().insight.evidenceIds.includes(s.id)),
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chosenEvidence = computed(
    () => this.evidence().find((e) => e.id === this.evidenceId()),
    ...ngDevMode ? [{ debugName: "chosenEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chapter = computed(
    () => this.definition().chapters.find((c) => c.id === this.state().chapterId),
    ...ngDevMode ? [{ debugName: "chapter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  question = computed(
    () => this.definition().questions.find((q) => q.id === this.state().questionId),
    ...ngDevMode ? [{ debugName: "question" }] : (
      /* istanbul ignore next */
      []
    )
  );
  spoken = computed(
    () => this.insightOpen() ? void 0 : this.view().mode === "listen" ? this.chapter() : this.view().mode === "talk" ? this.question() : void 0,
    ...ngDevMode ? [{ debugName: "spoken" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feature = computed(
    () => this.definition().object.features.find((f) => f.id === this.selectedFeature()),
    ...ngDevMode ? [{ debugName: "feature" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heading = viewChild(
    "heading",
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  player = viewChild(
    "player",
    ...ngDevMode ? [{ debugName: "player" }] : (
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
  disposed = false;
  constructor() {
    effect(() => this.lens.set(this.definition().object.position));
    effect(() => {
      this.spoken()?.id;
      this.player()?.nativeElement.pause();
      this.audioError.set(false);
    });
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      this.pause();
    });
  }
  pause() {
    this.player()?.nativeElement.pause();
  }
  go(id) {
    this.pause();
    this.insightOpen.set(false);
    if (id !== this.state().viewId)
      this.action.emit({ type: "view", viewId: id });
    const destination = this.definition().views.find((v) => v.id === id);
    if (destination?.mode === "listen" && !this.state().chapterId)
      this.action.emit({ type: "chapter", chapterId: this.definition().chapters[0].id });
    this.focusPanel();
  }
  showInsight() {
    this.pause();
    this.insightOpen.set(true);
    this.focusPanel();
  }
  openChapter(id) {
    this.pause();
    if (this.state().chapterId !== id)
      this.action.emit({ type: "chapter", chapterId: id });
  }
  ask(id) {
    this.pause();
    if (this.state().questionId !== id)
      this.action.emit({ type: "question", questionId: id });
  }
  inspectFeature(id) {
    this.selectedFeature.set(id);
    if (!this.state().features.includes(id))
      this.action.emit({ type: "feature", featureId: id });
  }
  checkInsight() {
    const relationship = this.relationship();
    if (this.evidenceId() && relationship && this.readyForInsight())
      this.action.emit({ type: "insight", evidenceId: this.evidenceId(), relationship });
  }
  retryImage() {
    this.imageError.set(false);
    this.imageAttempt.update((n) => n + 1);
  }
  focusPanel() {
    setTimeout(() => {
      if (this.disposed)
        return;
      this.panel()?.nativeElement.scrollTo?.({ top: 0, behavior: "instant" });
      this.heading()?.nativeElement.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      this.heading()?.nativeElement.focus({ preventScroll: true });
    });
  }
  static \u0275fac = function EncounterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EncounterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EncounterComponent, selectors: [["app-historical-encounter"]], viewQuery: function EncounterComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.heading, _c0, 5)(ctx.player, _c1, 5)(ctx.panel, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, inputs: { definition: [1, "definition"], state: [1, "state"], sources: [1, "sources"], reducedMotion: [1, "reducedMotion"], returnLabel: [1, "returnLabel"] }, outputs: { action: "action", leave: "leave" }, decls: 50, vars: 27, consts: [["panel", ""], ["heading", ""], ["player", ""], [1, "encounter"], [1, "encounter-header"], [1, "return-button", 3, "click"], [1, "place-heading"], [1, "account-badge"], [1, "encounter-body"], ["aria-label", "Explore the reconstructed setting", 1, "scene-stage"], [1, "scene-art"], [3, "error", "src", "alt"], ["aria-hidden", "true", 1, "scene-light"], [1, "location-label"], [1, "location-dot"], ["role", "status", 1, "image-fallback"], [1, "scene-caption"], ["aria-label", "Encounter viewpoints", 1, "viewpoints"], [3, "active"], ["aria-label", "Encounter conversation and activities", 1, "encounter-panel"], [1, "encounter-notebook"], [1, "notebook-heading"], [1, "primary", "full"], [1, "about-account"], [3, "click"], [1, "scene-pin", 3, "person-pin", "left", "top"], [1, "scene-pin", 3, "click"], [1, "eyebrow"], ["tabindex", "-1"], [1, "claim"], [1, "preparation"], ["role", "status", 1, "insight-success"], [1, "primary", 3, "click"], [1, "quiet"], [1, "field"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "source-card"], ["value", "supports"], ["value", "contradicts"], ["value", "does-not-establish"], [1, "primary", "full", 3, "click", "disabled"], ["role", "status", 1, "check-feedback"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["aria-live", "polite", 1, "spoken-account"], [1, "welcome"], [1, "speaker"], [1, "encounter-choice"], [1, "encounter-choice", 3, "click"], ["aria-label", "Story chapters", 1, "story-chapters"], [1, "question-choices"], [1, "encounter-choice", 3, "active", "disabled"], [1, "encounter-choice", 3, "click", "disabled"], ["role", "img", 1, "object-lens"], ["type", "range", "min", "0", "max", "100", "aria-label", "Move the inspection lens", 3, "ngModelChange", "ngModel"], [1, "encounter-choice", 3, "active"], ["role", "status", 1, "observation"], ["controls", "", "preload", "none", 3, "error", "src"], ["role", "status"], [1, "transcript"], [1, "primary", "full", 3, "click"]], template: function EncounterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "header", 4)(2, "button", 5);
      \u0275\u0275listener("click", function EncounterComponent_Template_button_click_2_listener() {
        \u0275\u0275restoreView(_r1);
        ctx.pause();
        return \u0275\u0275resetView(ctx.leave.emit());
      });
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 6)(5, "span");
      \u0275\u0275text(6, "THROUGH THE FRAME");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "strong");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "span", 7);
      \u0275\u0275text(10, "Historical reconstruction");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8)(12, "section", 9)(13, "div", 10)(14, "img", 11);
      \u0275\u0275listener("error", function EncounterComponent_Template_img_error_14_listener() {
        return ctx.imageError.set(true);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275element(15, "div", 12);
      \u0275\u0275elementStart(16, "div", 13);
      \u0275\u0275element(17, "span", 14);
      \u0275\u0275elementStart(18, "div");
      \u0275\u0275text(19);
      \u0275\u0275elementStart(20, "small");
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(22, EncounterComponent_Conditional_22_Template, 7, 1, "div", 15);
      \u0275\u0275conditionalCreate(23, EncounterComponent_Conditional_23_Template, 2, 0);
      \u0275\u0275elementStart(24, "div", 16)(25, "span");
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p");
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "nav", 17);
      \u0275\u0275repeaterCreate(30, EncounterComponent_For_31_Template, 4, 5, "button", 18, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "aside", 19, 0);
      \u0275\u0275conditionalCreate(34, EncounterComponent_Conditional_34_Template, 16, 6)(35, EncounterComponent_Conditional_35_Template, 5, 2);
      \u0275\u0275elementStart(36, "footer", 20)(37, "div", 21)(38, "span");
      \u0275\u0275text(39, "YOUR ENCOUNTER NOTES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "b");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "p");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(44, EncounterComponent_Conditional_44_Template, 2, 1, "button", 22);
      \u0275\u0275elementStart(45, "details", 23)(46, "summary");
      \u0275\u0275text(47, "About this reconstruction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p");
      \u0275\u0275text(49);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("still", ctx.reducedMotion());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("\u2190 ", ctx.returnLabel());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.definition().title);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("seated", ctx.view().mode === "listen");
      \u0275\u0275advance();
      \u0275\u0275styleProp("transform", "scale(" + ctx.view().zoom + ")")("transform-origin", ctx.view().position + "% 58%");
      \u0275\u0275advance();
      \u0275\u0275styleProp("object-position", ctx.view().position + "% center");
      \u0275\u0275property("src", ctx.imageSrc(), \u0275\u0275sanitizeUrl)("alt", ctx.definition().imageAlt);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.definition().location);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.definition().date);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.imageError() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view().mode === "observe" && !ctx.imageError() ? 23 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.view().mode === "listen" ? "A PLACE TO LISTEN" : "TAKE YOUR TIME");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.view().description);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.definition().views);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.insightOpen() ? 34 : 35);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.state().insightEarned ? "\u2713" : "\u25C7");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3("", ctx.state().chapters.length, " chapters opened \xB7 ", ctx.state().questions.length, " questions asked \xB7 ", ctx.state().features.length, " details observed");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.insightOpen() ? 44 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.definition().attribution);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, RangeValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 0;\n  font:\n    14px/1.65 Arial,\n    Helvetica,\n    sans-serif;\n  color: #e8e6d4;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: inherit;\n  border: 1px solid #829678;\n  background: #294438;\n  border-radius: 7px;\n  padding: 11px 15px;\n  min-height: 44px;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #3a5943;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ffe0a0;\n  outline-offset: 3px;\n}\nh2[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\na[_ngcontent-%COMP%] {\n  color: #e8cf99;\n}\nh2[_ngcontent-%COMP%] {\n  font: 32px/1.18 Georgia, serif;\n  color: #f1e6c8;\n  margin: 0 0 20px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 21px/1.3 Georgia, serif;\n  margin: 8px 0 15px;\n  color: #f0e2bd;\n}\np[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nstrong[_ngcontent-%COMP%] {\n  color: #f4ebd4;\n}\n.encounter[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #152e27;\n}\n.encounter-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  padding: 14px 22px;\n  border-bottom: 1px solid #68714b;\n  flex-shrink: 0;\n  background: #132b24;\n}\n.return-button[_ngcontent-%COMP%] {\n  background: transparent;\n  font-size: 12px;\n  border-color: #577455;\n}\n.place-heading[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1px;\n}\n.place-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #cfbd87;\n  letter-spacing: 2px;\n}\n.place-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 21px Georgia;\n}\n.account-badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #bfd0b4;\n  font-size: 10px;\n  border: 1px solid #5a704e;\n  border-radius: 20px;\n  padding: 5px 11px;\n}\n.encounter-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(330px, 400px);\n}\n.scene-stage[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n  overflow: hidden;\n  background: #264d43;\n  min-height: 360px;\n}\n.scene-art[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  transition: transform 1.2s ease, transform-origin 1.2s ease;\n}\n.scene-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: object-position 1.2s ease;\n}\n.scene-light[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(9, 31, 32, 0.9019607843),\n      transparent 42%,\n      transparent 75%,\n      rgba(9, 31, 32, 0.2666666667));\n  pointer-events: none;\n}\n.seated[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n  translate: 0 2%;\n}\n.location-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 22px;\n  left: 22px;\n  right: 22px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  color: #fff3d3;\n  font-size: 12px;\n  text-shadow: 0 1px 4px #142520;\n}\n.location-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n}\n.location-dot[_ngcontent-%COMP%] {\n  background: #f3d78e;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  box-shadow: 0 0 18px #fff4bf;\n}\n.scene-pin[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  display: grid;\n  gap: 4px;\n  justify-items: center;\n  padding: 9px 12px;\n  font-size: 11px;\n  background: rgba(20, 55, 43, 0.9294117647);\n  border-color: #e9cb86;\n  box-shadow: 0 3px 25px rgba(20, 39, 30, 0.4);\n}\n.scene-pin[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 26px;\n  line-height: 1.1;\n}\n.person-pin[_ngcontent-%COMP%] {\n  top: 45%;\n}\n.scene-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 106px;\n  left: 27px;\n  right: 27px;\n  max-width: 520px;\n  text-shadow: 0 2px 8px #0c241e;\n}\n.scene-caption[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #f1d59b;\n}\n.scene-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font: 20px/1.4 Georgia;\n  color: #fff0cf;\n  margin: 10px 0 0;\n}\n.viewpoints[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  left: 22px;\n  right: 22px;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n}\n.viewpoints[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: center;\n  gap: 4px;\n  text-align: left;\n  padding: 10px 11px;\n  font-size: 11px;\n  background: rgba(23, 60, 50, 0.9098039216);\n  border-color: #8f9b6e;\n}\n.viewpoints[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #d3c494;\n}\n.active[_ngcontent-%COMP%] {\n  background: #e3ca91 !important;\n  color: #17392b !important;\n  border-color: #ffdc91 !important;\n}\n.active[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #43563b !important;\n}\n.encounter-panel[_ngcontent-%COMP%] {\n  overflow: auto;\n  min-width: 0;\n  scrollbar-width: thin;\n  scrollbar-color: #7c9169 #152e27;\n  padding: 28px 26px;\n  background:\n    linear-gradient(\n      135deg,\n      #233c2d,\n      #132a24);\n  border-left: 1px solid #829067;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.quiet[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b8cbb4;\n}\n.welcome[_ngcontent-%COMP%] {\n  padding: 18px;\n  background: rgba(204, 180, 113, 0.0705882353);\n  border: 1px solid #667852;\n  border-radius: 8px;\n  margin: 24px 0;\n}\n.speaker[_ngcontent-%COMP%] {\n  color: #d9c48b;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.welcome[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  font: 22px/1.5 Georgia;\n  color: #efe2be;\n  margin: 12px 0;\n}\n.welcome[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a9c0a5;\n}\n.encounter-choice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  width: 100%;\n  text-align: left;\n  margin: 9px 0;\n  background: #1b392c;\n  font-size: 13px;\n}\n.encounter-choice[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n}\n.encounter-choice[_ngcontent-%COMP%]    > b[_ngcontent-%COMP%] {\n  font-size: 17px;\n  flex-shrink: 0;\n}\n.story-chapters[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin-bottom: 24px;\n}\n.story-chapters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 11px;\n  align-items: center;\n  text-align: left;\n  font-size: 12px;\n  background: #1a3529;\n}\n.story-chapters[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 18px Georgia;\n}\n.story-chapters[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.spoken-account[_ngcontent-%COMP%] {\n  padding-top: 17px;\n  border-top: 1px solid #627452;\n}\n.spoken-account[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  display: block;\n  margin: 15px 0;\n  color-scheme: dark;\n}\n.transcript[_ngcontent-%COMP%] {\n  line-height: 1.85;\n  color: #d3ddc8;\n}\n.spoken-account[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  padding: 11px;\n  border: 1px solid #596f4f;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.spoken-account[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%], \n.about-account[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #d9c68e;\n  font-size: 11px;\n}\n.spoken-account[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.spoken-account[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n.object-lens[_ngcontent-%COMP%] {\n  height: 190px;\n  border: 5px ridge #a89968;\n  background-size: 350%;\n  background-repeat: no-repeat;\n  margin: 20px 0 12px;\n  box-shadow: 0 5px 20px rgba(8, 27, 21, 0.3333333333);\n}\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin: 17px 0;\n  font-size: 12px;\n  color: #d5dabf;\n}\n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #81916a;\n  background: #173429;\n  color: #f1e5c2;\n  border-radius: 5px;\n  min-width: 0;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #e7ca8a;\n}\n.observation[_ngcontent-%COMP%], \n.claim[_ngcontent-%COMP%], \n.check-feedback[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: rgba(140, 119, 69, 0.1333333333);\n  border-left: 3px solid #ceb47a;\n}\n.claim[_ngcontent-%COMP%] {\n  font: 18px/1.55 Georgia;\n  color: #efe1b9;\n}\n.check-feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.preparation[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  display: grid;\n  gap: 8px;\n  font-size: 12px;\n  color: #c6d4b7;\n}\n.source-card[_ngcontent-%COMP%] {\n  padding: 15px;\n  background: #11291f;\n  border: 1px solid #5a754e;\n  border-radius: 7px;\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n  overflow-wrap: anywhere;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e3ca91;\n  color: #17392b;\n  font-size: 12px;\n  font-weight: bold;\n  border-color: #f6dda4;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0dba8;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.insight-success[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #8ca672;\n  background: rgba(82, 112, 68, 0.2);\n  border-radius: 7px;\n  margin: 20px 0;\n}\n.insight-success[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: #e5d6a2;\n}\n.insight-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n}\n.encounter-notebook[_ngcontent-%COMP%] {\n  border-top: 1px solid #60754f;\n  margin-top: 28px;\n  padding-top: 18px;\n}\n.notebook-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 9px;\n  letter-spacing: 1.4px;\n  color: #d9c58b;\n}\n.notebook-heading[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.encounter-notebook[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #a9c1a3;\n  margin-top: 10px;\n}\n.about-account[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.about-account[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 11px;\n  color: #b9cbb0;\n}\n.image-fallback[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 25% 22px auto;\n  padding: 22px;\n  background: rgba(18, 47, 39, 0.9215686275);\n  border: 1px solid #82936c;\n  border-radius: 8px;\n  z-index: 2;\n}\n.still[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%], \n.still[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transition: none;\n}\n.still[_ngcontent-%COMP%]   .seated[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n  translate: none;\n}\n@media (max-width: 1050px) {\n  .encounter-body[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 340px;\n  }\n  .encounter-panel[_ngcontent-%COMP%] {\n    padding: 24px 20px;\n  }\n  .viewpoints[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .scene-caption[_ngcontent-%COMP%] {\n    bottom: 182px;\n  }\n  .scene-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .account-badge[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 700px) {\n  .encounter-header[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    gap: 10px;\n  }\n  .return-button[_ngcontent-%COMP%] {\n    padding: 8px 10px;\n    font-size: 10px;\n  }\n  .place-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .place-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .encounter-body[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n  }\n  .scene-stage[_ngcontent-%COMP%] {\n    height: 340px;\n    min-height: 340px;\n    flex-shrink: 0;\n  }\n  .encounter-panel[_ngcontent-%COMP%] {\n    overflow: visible;\n    border-left: 0;\n    border-top: 1px solid #829067;\n    padding: 24px 20px;\n  }\n  .location-label[_ngcontent-%COMP%] {\n    top: 12px;\n    left: 14px;\n    font-size: 10px;\n  }\n  .location-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .scene-caption[_ngcontent-%COMP%] {\n    bottom: 94px;\n    left: 15px;\n    right: 15px;\n  }\n  .scene-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 15px;\n    margin-top: 5px;\n    max-width: 300px;\n  }\n  .scene-caption[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .viewpoints[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    left: 10px;\n    right: 10px;\n    bottom: 12px;\n    gap: 5px;\n  }\n  .viewpoints[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 8px 6px;\n    min-height: 62px;\n  }\n  .scene-pin[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 6px 8px;\n  }\n  .scene-pin[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .object-lens[_ngcontent-%COMP%] {\n    height: 180px;\n  }\n  .image-fallback[_ngcontent-%COMP%] {\n    inset: 50px 12px auto;\n    padding: 14px;\n    font-size: 11px;\n  }\n  .image-fallback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0 0 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scene-art[_ngcontent-%COMP%], \n   .scene-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .seated[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n    translate: none;\n  }\n}\n/*# sourceMappingURL=encounter.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EncounterComponent, [{
    type: Component,
    args: [{ selector: "app-historical-encounter", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="encounter" [class.still]="reducedMotion()">\r
  <header class="encounter-header">\r
    <button class="return-button" (click)="pause(); leave.emit()">\u2190 {{ returnLabel() }}</button>
    <div class="place-heading"><span>THROUGH THE FRAME</span><strong>{{ definition().title }}</strong></div>\r
    <span class="account-badge">Historical reconstruction</span>\r
  </header>\r
  <div class="encounter-body">\r
    <section class="scene-stage" [class.seated]="view().mode === 'listen'" aria-label="Explore the reconstructed setting">\r
      <div class="scene-art" [style.transform]="'scale(' + view().zoom + ')'" [style.transform-origin]="view().position + '% 58%'">\r
        <img [src]="imageSrc()" [alt]="definition().imageAlt" [style.object-position]="view().position + '% center'" (error)="imageError.set(true)">\r
      </div>\r
      <div class="scene-light" aria-hidden="true"></div>\r
      <div class="location-label"><span class="location-dot"></span><div>{{ definition().location }}<small>{{ definition().date }}</small></div></div>\r
      @if (imageError()) { <div class="image-fallback" role="status"><p>The scene image could not load. {{ definition().imageAlt }}</p><p>You can use the descriptions and account to continue.</p><button (click)="retryImage()">Retry scene image</button></div> }\r
      @if (view().mode === 'observe' && !imageError()) {\r
        @for (destination of definition().views; track destination.id) {\r
          @if (destination.mode === 'talk' || destination.mode === 'object') {\r
            <button class="scene-pin" [class.person-pin]="destination.mode === 'talk'" [style.left.%]="destination.position" [style.top.%]="destination.mode === 'talk' ? 49 : 65" (click)="go(destination.id)"><span>{{ destination.mode === 'talk' ? '\u25CC' : '\u2315' }}</span>{{ destination.label }}</button>\r
          }\r
        }\r
      }\r
      <div class="scene-caption"><span>{{ view().mode === 'listen' ? 'A PLACE TO LISTEN' : 'TAKE YOUR TIME' }}</span><p>{{ view().description }}</p></div>\r
      <nav class="viewpoints" aria-label="Encounter viewpoints">\r
        @for (destination of definition().views; track destination.id; let i = $index) { <button [class.active]="!insightOpen() && view().id === destination.id" [attr.aria-pressed]="!insightOpen() && view().id === destination.id" (click)="go(destination.id)"><small>{{ state().visitedViews.includes(destination.id) ? '\u2713' : '0' + (i + 1) }}</small>{{ destination.label }}</button> }\r
      </nav>\r
    </section>\r
    <aside #panel class="encounter-panel" aria-label="Encounter conversation and activities">\r
      @if (insightOpen()) {\r
        <p class="eyebrow">TAKE SOMETHING BACK</p><h2 #heading tabindex="-1">{{ definition().insight.title }}</h2>\r
        <p class="claim">{{ definition().insight.claim }}</p>\r
        <ul class="preparation"><li>{{ state().chapters.length ? '\u2713' : '\u25CB' }} Read or listen to a story chapter</li><li>{{ state().questions.length ? '\u2713' : '\u25CB' }} Ask a question</li><li>{{ state().features.length ? '\u2713' : '\u25CB' }} Observe an object detail</li></ul>\r
        @if (state().insightEarned) {\r
          <div class="insight-success" role="status"><span>\u2713 INSIGHT RECORDED</span><p>{{ definition().insight.explanation }}</p></div>\r
          <button class="primary" (click)="pause(); leave.emit()">Return with this insight \u2192</button>\r
        } @else {\r
          <p class="quiet">Use an independent reference to test the claim. The illustration is a reconstruction.</p>\r
          <label class="field">Which reference tests the claim?<select [ngModel]="evidenceId()" (ngModelChange)="evidenceId.set($event)"><option value="">Choose a source</option>@for (source of evidence(); track source.id) { <option [value]="source.id">{{ source.title }}</option> }</select></label>\r
          @if (chosenEvidence(); as source) { <article class="source-card"><strong>{{ source.title }}</strong><p>{{ source.text }}</p><a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer">{{ source.sourceTitle }} \u2197</a></article> }\r
          <label class="field">How does it relate to the claim?<select [ngModel]="relationship()" (ngModelChange)="relationship.set($event)"><option value="">Choose a relationship</option><option value="supports">Supports the claim</option><option value="contradicts">Contradicts the claim</option><option value="does-not-establish">Does not establish the claim</option></select></label>\r
          <button class="primary full" [disabled]="!readyForInsight() || !evidenceId() || !relationship()" (click)="checkInsight()">Check &amp; record insight \u2192</button>\r
          @if (!readyForInsight()) { <p class="quiet">Complete the three encounter steps above, then return here.</p> }\r
          @if (state().lastCorrect === false) { <p class="check-feedback" role="status">{{ definition().insight.hint }}</p> }\r
        }\r
      } @else {\r
        @switch (view().mode) {\r
          @case ('observe') {\r
            <p class="eyebrow">YOU HAVE STEPPED INSIDE</p><h2 #heading tabindex="-1">Stay a while.</h2><p>{{ definition().invitation }}</p>\r
            <div class="welcome"><span class="speaker">{{ definition().host.name }}</span><blockquote>\u201C{{ definition().host.greeting }}\u201D</blockquote><small>{{ definition().host.role }}</small></div>\r
            <p>Choose a place below, or use the markers in the scene. You can return to the painting at any time.</p>\r
            @for (destination of definition().views; track destination.id) { @if (destination.mode !== 'observe') { <button class="encounter-choice" (click)="go(destination.id)"><span>{{ destination.label }}</span><b>\u2197</b></button> } }\r
          }\r
          @case ('listen') {\r
            <p class="eyebrow">STORY TIME \xB7 MUSEUM AUDIO GUIDE</p><h2 #heading tabindex="-1">{{ definition().title }}</h2><p class="quiet">Listen, read, pause, or stay a little longer. Each chapter\u2019s complete text appears below.</p>\r
            <nav class="story-chapters" aria-label="Story chapters">@for (chapter of definition().chapters; track chapter.id; let i = $index) { <button [class.active]="state().chapterId === chapter.id" [attr.aria-pressed]="state().chapterId === chapter.id" (click)="openChapter(chapter.id)"><b>{{ i + 1 }}</b><span>{{ chapter.title }}</span>@if (state().chapters.includes(chapter.id)) { <small>\u2713</small> }</button> }</nav>\r
          }\r
          @case ('talk') {\r
            <p class="eyebrow">A CONVERSATION IN THE SCENE</p><h2 #heading tabindex="-1">Start with a question.</h2><p class="quiet">{{ definition().host.role }}. Questions identify the speaker and their sources.</p>\r
            <div class="question-choices">@for (question of definition().questions; track question.id) { <button class="encounter-choice" [class.active]="state().questionId === question.id" [disabled]="!!question.requiresQuestionId && !state().questions.includes(question.requiresQuestionId)" [attr.aria-pressed]="state().questionId === question.id" (click)="ask(question.id)"><span>{{ question.title }}@if (question.requiresQuestionId && !state().questions.includes(question.requiresQuestionId)) { <small>Follow-up \xB7 open the earlier question first</small> }</span><b>{{ state().questions.includes(question.id) ? '\u2713' : '\u2197' }}</b></button> }</div>\r
          }\r
          @case ('object') {\r
            <p class="eyebrow">LOOK MORE CLOSELY</p><h2 #heading tabindex="-1">{{ definition().object.title }}</h2><p>{{ definition().object.description }}</p>\r
            <div class="object-lens" [style.background-image]="'url(' + definition().image + ')'" [style.background-position]="lens() + '% 70%'" role="img" [attr.aria-label]="'Magnified illustration: ' + definition().object.title"></div>\r
            <label class="field">Move the inspection lens<input type="range" min="0" max="100" [ngModel]="lens()" (ngModelChange)="lens.set(+$event)" aria-label="Move the inspection lens"></label>\r
            @for (feature of definition().object.features; track feature.id) { <button class="encounter-choice" [class.active]="selectedFeature() === feature.id" (click)="inspectFeature(feature.id)"><span>{{ feature.label }}</span><b>{{ state().features.includes(feature.id) ? '\u2713' : '\uFF0B' }}</b></button> }\r
            @if (feature(); as feature) { <p class="observation" role="status">{{ feature.text }}</p> }\r
          }\r
        }\r
        @if (spoken(); as line) {\r
          <article class="spoken-account" aria-live="polite"><span class="speaker">{{ line.speaker }}</span><h3>{{ line.title }}</h3>\r
            <audio #player controls preload="none" [src]="line.audioSrc" [attr.aria-label]="'Listen to ' + line.title" (error)="audioError.set(true)"></audio>\r
            @if (audioError()) { <p role="status">Audio is unavailable. The complete account is readable below.</p> }\r
            <p class="transcript">{{ line.text }}</p>\r
            <details><summary>Sources behind this account</summary>@for (source of sources(); track source.id) { @if (line.evidenceIds.includes(source.id)) { <p><strong>{{ source.title }}</strong><br>{{ source.text }}<br><a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer">{{ source.sourceTitle }} \u2197</a></p> } }</details>\r
          </article>\r
        }\r
      }\r
      <footer class="encounter-notebook"><div class="notebook-heading"><span>YOUR ENCOUNTER NOTES</span><b>{{ state().insightEarned ? '\u2713' : '\u25C7' }}</b></div><p>{{ state().chapters.length }} chapters opened \xB7 {{ state().questions.length }} questions asked \xB7 {{ state().features.length }} details observed</p>@if (!insightOpen()) { <button class="primary full" (click)="showInsight()">{{ state().insightEarned ? 'Review your insight' : 'Keep an insight' }} \u2197</button> }\r
        <details class="about-account"><summary>About this reconstruction</summary><p>{{ definition().attribution }}</p></details>\r
      </footer>\r
    </aside>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/shared/encounters/encounter.component.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-height: 0;\n  font:\n    14px/1.65 Arial,\n    Helvetica,\n    sans-serif;\n  color: #e8e6d4;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  color: inherit;\n  border: 1px solid #829678;\n  background: #294438;\n  border-radius: 7px;\n  padding: 11px 15px;\n  min-height: 44px;\n}\nbutton:hover:not(:disabled) {\n  background: #3a5943;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton:focus-visible,\ninput:focus-visible,\nselect:focus-visible,\nsummary:focus-visible,\na:focus-visible {\n  outline: 3px solid #ffe0a0;\n  outline-offset: 3px;\n}\nh2:focus {\n  outline: none;\n}\na {\n  color: #e8cf99;\n}\nh2 {\n  font: 32px/1.18 Georgia, serif;\n  color: #f1e6c8;\n  margin: 0 0 20px;\n}\nh3 {\n  font: 21px/1.3 Georgia, serif;\n  margin: 8px 0 15px;\n  color: #f0e2bd;\n}\np {\n  margin: 0 0 16px;\n}\nsmall {\n  font-size: 11px;\n}\nstrong {\n  color: #f4ebd4;\n}\n.encounter {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #152e27;\n}\n.encounter-header {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  padding: 14px 22px;\n  border-bottom: 1px solid #68714b;\n  flex-shrink: 0;\n  background: #132b24;\n}\n.return-button {\n  background: transparent;\n  font-size: 12px;\n  border-color: #577455;\n}\n.place-heading {\n  display: grid;\n  gap: 1px;\n}\n.place-heading > span,\n.eyebrow {\n  font-size: 9px;\n  color: #cfbd87;\n  letter-spacing: 2px;\n}\n.place-heading strong {\n  font: 21px Georgia;\n}\n.account-badge {\n  margin-left: auto;\n  color: #bfd0b4;\n  font-size: 10px;\n  border: 1px solid #5a704e;\n  border-radius: 20px;\n  padding: 5px 11px;\n}\n.encounter-body {\n  flex: 1;\n  min-height: 0;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(330px, 400px);\n}\n.scene-stage {\n  position: relative;\n  isolation: isolate;\n  overflow: hidden;\n  background: #264d43;\n  min-height: 360px;\n}\n.scene-art {\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  transition: transform 1.2s ease, transform-origin 1.2s ease;\n}\n.scene-art img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: object-position 1.2s ease;\n}\n.scene-light {\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(9, 31, 32, 0.9019607843),\n      transparent 42%,\n      transparent 75%,\n      rgba(9, 31, 32, 0.2666666667));\n  pointer-events: none;\n}\n.seated .scene-art {\n  translate: 0 2%;\n}\n.location-label {\n  position: absolute;\n  top: 22px;\n  left: 22px;\n  right: 22px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  color: #fff3d3;\n  font-size: 12px;\n  text-shadow: 0 1px 4px #142520;\n}\n.location-label small {\n  display: block;\n  font-size: 10px;\n}\n.location-dot {\n  background: #f3d78e;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  box-shadow: 0 0 18px #fff4bf;\n}\n.scene-pin {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  display: grid;\n  gap: 4px;\n  justify-items: center;\n  padding: 9px 12px;\n  font-size: 11px;\n  background: rgba(20, 55, 43, 0.9294117647);\n  border-color: #e9cb86;\n  box-shadow: 0 3px 25px rgba(20, 39, 30, 0.4);\n}\n.scene-pin > span {\n  font-size: 26px;\n  line-height: 1.1;\n}\n.person-pin {\n  top: 45%;\n}\n.scene-caption {\n  position: absolute;\n  bottom: 106px;\n  left: 27px;\n  right: 27px;\n  max-width: 520px;\n  text-shadow: 0 2px 8px #0c241e;\n}\n.scene-caption > span {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #f1d59b;\n}\n.scene-caption p {\n  font: 20px/1.4 Georgia;\n  color: #fff0cf;\n  margin: 10px 0 0;\n}\n.viewpoints {\n  position: absolute;\n  bottom: 22px;\n  left: 22px;\n  right: 22px;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n}\n.viewpoints button {\n  display: grid;\n  align-content: center;\n  gap: 4px;\n  text-align: left;\n  padding: 10px 11px;\n  font-size: 11px;\n  background: rgba(23, 60, 50, 0.9098039216);\n  border-color: #8f9b6e;\n}\n.viewpoints small {\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #d3c494;\n}\n.active {\n  background: #e3ca91 !important;\n  color: #17392b !important;\n  border-color: #ffdc91 !important;\n}\n.active small {\n  color: #43563b !important;\n}\n.encounter-panel {\n  overflow: auto;\n  min-width: 0;\n  scrollbar-width: thin;\n  scrollbar-color: #7c9169 #152e27;\n  padding: 28px 26px;\n  background:\n    linear-gradient(\n      135deg,\n      #233c2d,\n      #132a24);\n  border-left: 1px solid #829067;\n}\n.eyebrow {\n  margin-bottom: 12px;\n}\n.quiet {\n  font-size: 12px;\n  color: #b8cbb4;\n}\n.welcome {\n  padding: 18px;\n  background: rgba(204, 180, 113, 0.0705882353);\n  border: 1px solid #667852;\n  border-radius: 8px;\n  margin: 24px 0;\n}\n.speaker {\n  color: #d9c48b;\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.welcome blockquote {\n  font: 22px/1.5 Georgia;\n  color: #efe2be;\n  margin: 12px 0;\n}\n.welcome small {\n  color: #a9c0a5;\n}\n.encounter-choice {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  width: 100%;\n  text-align: left;\n  margin: 9px 0;\n  background: #1b392c;\n  font-size: 13px;\n}\n.encounter-choice small {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n}\n.encounter-choice > b {\n  font-size: 17px;\n  flex-shrink: 0;\n}\n.story-chapters {\n  display: grid;\n  gap: 8px;\n  margin-bottom: 24px;\n}\n.story-chapters button {\n  display: flex;\n  gap: 11px;\n  align-items: center;\n  text-align: left;\n  font-size: 12px;\n  background: #1a3529;\n}\n.story-chapters b {\n  font: 18px Georgia;\n}\n.story-chapters small {\n  margin-left: auto;\n}\n.spoken-account {\n  padding-top: 17px;\n  border-top: 1px solid #627452;\n}\n.spoken-account audio {\n  width: 100%;\n  height: 40px;\n  display: block;\n  margin: 15px 0;\n  color-scheme: dark;\n}\n.transcript {\n  line-height: 1.85;\n  color: #d3ddc8;\n}\n.spoken-account details {\n  padding: 11px;\n  border: 1px solid #596f4f;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.spoken-account summary,\n.about-account summary {\n  cursor: pointer;\n  color: #d9c68e;\n  font-size: 11px;\n}\n.spoken-account details p {\n  margin: 12px 0;\n}\n.spoken-account a {\n  overflow-wrap: anywhere;\n}\n.object-lens {\n  height: 190px;\n  border: 5px ridge #a89968;\n  background-size: 350%;\n  background-repeat: no-repeat;\n  margin: 20px 0 12px;\n  box-shadow: 0 5px 20px rgba(8, 27, 21, 0.3333333333);\n}\n.field {\n  display: grid;\n  gap: 8px;\n  margin: 17px 0;\n  font-size: 12px;\n  color: #d5dabf;\n}\n.field select {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #81916a;\n  background: #173429;\n  color: #f1e5c2;\n  border-radius: 5px;\n  min-width: 0;\n}\n.field input {\n  width: 100%;\n  accent-color: #e7ca8a;\n}\n.observation,\n.claim,\n.check-feedback {\n  padding: 14px;\n  background: rgba(140, 119, 69, 0.1333333333);\n  border-left: 3px solid #ceb47a;\n}\n.claim {\n  font: 18px/1.55 Georgia;\n  color: #efe1b9;\n}\n.check-feedback {\n  font-size: 12px;\n}\n.preparation {\n  list-style: none;\n  padding: 0;\n  display: grid;\n  gap: 8px;\n  font-size: 12px;\n  color: #c6d4b7;\n}\n.source-card {\n  padding: 15px;\n  background: #11291f;\n  border: 1px solid #5a754e;\n  border-radius: 7px;\n  font-size: 12px;\n}\n.source-card p {\n  margin: 10px 0;\n}\n.source-card a {\n  font-size: 11px;\n  overflow-wrap: anywhere;\n}\n.primary {\n  background: #e3ca91;\n  color: #17392b;\n  font-size: 12px;\n  font-weight: bold;\n  border-color: #f6dda4;\n}\n.primary:hover:not(:disabled) {\n  background: #f0dba8;\n}\n.full {\n  width: 100%;\n}\n.insight-success {\n  padding: 16px;\n  border: 1px solid #8ca672;\n  background: rgba(82, 112, 68, 0.2);\n  border-radius: 7px;\n  margin: 20px 0;\n}\n.insight-success > span {\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: #e5d6a2;\n}\n.insight-success p {\n  margin: 12px 0 0;\n}\n.encounter-notebook {\n  border-top: 1px solid #60754f;\n  margin-top: 28px;\n  padding-top: 18px;\n}\n.notebook-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 9px;\n  letter-spacing: 1.4px;\n  color: #d9c58b;\n}\n.notebook-heading b {\n  font-size: 20px;\n}\n.encounter-notebook > p {\n  font-size: 11px;\n  color: #a9c1a3;\n  margin-top: 10px;\n}\n.about-account {\n  margin-top: 20px;\n}\n.about-account p {\n  margin-top: 12px;\n  font-size: 11px;\n  color: #b9cbb0;\n}\n.image-fallback {\n  position: absolute;\n  inset: 25% 22px auto;\n  padding: 22px;\n  background: rgba(18, 47, 39, 0.9215686275);\n  border: 1px solid #82936c;\n  border-radius: 8px;\n  z-index: 2;\n}\n.still .scene-art,\n.still .scene-art img {\n  transition: none;\n}\n.still .seated .scene-art {\n  translate: none;\n}\n@media (max-width: 1050px) {\n  .encounter-body {\n    grid-template-columns: minmax(0, 1fr) 340px;\n  }\n  .encounter-panel {\n    padding: 24px 20px;\n  }\n  .viewpoints {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .scene-caption {\n    bottom: 182px;\n  }\n  .scene-caption p {\n    font-size: 18px;\n  }\n  .account-badge {\n    display: none;\n  }\n}\n@media (max-width: 700px) {\n  .encounter-header {\n    padding: 10px 12px;\n    gap: 10px;\n  }\n  .return-button {\n    padding: 8px 10px;\n    font-size: 10px;\n  }\n  .place-heading > span {\n    font-size: 8px;\n  }\n  .place-heading strong {\n    font-size: 16px;\n  }\n  .encounter-body {\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n  }\n  .scene-stage {\n    height: 340px;\n    min-height: 340px;\n    flex-shrink: 0;\n  }\n  .encounter-panel {\n    overflow: visible;\n    border-left: 0;\n    border-top: 1px solid #829067;\n    padding: 24px 20px;\n  }\n  .location-label {\n    top: 12px;\n    left: 14px;\n    font-size: 10px;\n  }\n  .location-label small {\n    font-size: 9px;\n  }\n  .scene-caption {\n    bottom: 94px;\n    left: 15px;\n    right: 15px;\n  }\n  .scene-caption p {\n    font-size: 15px;\n    margin-top: 5px;\n    max-width: 300px;\n  }\n  .scene-caption > span {\n    font-size: 8px;\n  }\n  .viewpoints {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    left: 10px;\n    right: 10px;\n    bottom: 12px;\n    gap: 5px;\n  }\n  .viewpoints button {\n    font-size: 9px;\n    padding: 8px 6px;\n    min-height: 62px;\n  }\n  .scene-pin {\n    font-size: 9px;\n    padding: 6px 8px;\n  }\n  .scene-pin > span {\n    font-size: 20px;\n  }\n  h2 {\n    font-size: 28px;\n  }\n  .object-lens {\n    height: 180px;\n  }\n  .image-fallback {\n    inset: 50px 12px auto;\n    padding: 14px;\n    font-size: 11px;\n  }\n  .image-fallback p {\n    margin: 0 0 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scene-art,\n  .scene-art img {\n    transition: none;\n  }\n  .seated .scene-art {\n    translate: none;\n  }\n}\n/*# sourceMappingURL=encounter.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], sources: [{ type: Input, args: [{ isSignal: true, alias: "sources", required: true }] }], reducedMotion: [{ type: Input, args: [{ isSignal: true, alias: "reducedMotion", required: false }] }], returnLabel: [{ type: Input, args: [{ isSignal: true, alias: "returnLabel", required: false }] }], action: [{ type: Output, args: ["action"] }], leave: [{ type: Output, args: ["leave"] }], heading: [{ type: ViewChild, args: ["heading", { isSignal: true }] }], player: [{ type: ViewChild, args: ["player", { isSignal: true }] }], panel: [{ type: ViewChild, args: ["panel", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EncounterComponent, { className: "EncounterComponent", filePath: "src/app/shared/encounters/encounter.component.ts", lineNumber: 10 });
})();

// src/app/templates/heist/gallery/ui/academic-lock.component.ts
var _c02 = () => ["rotation", "combo", "measurement", "cargo"];
var _c12 = () => [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
var _forTrack02 = ($index, $item) => $item.id;
function AcademicLockComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span")(3, "input", 8);
    \u0275\u0275listener("ngModelChange", function AcademicLockComponent_Conditional_10_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculation.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("1. ", ctx_r1.lock().type === "cargo" ? "Calculate the new capacity" : "Determine the result", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.calculation());
    \u0275\u0275attribute("aria-label", ctx_r1.lock().title + " calculation");
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.lock().unit ?? "kg");
  }
}
function AcademicLockComponent_Case_11_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 13);
  }
  if (rf & 2) {
    const degree_r4 = ctx.$implicit;
    \u0275\u0275attribute("transform", "rotate(" + degree_r4 + " 120 120)");
  }
}
function AcademicLockComponent_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 10);
    \u0275\u0275listener("pointerdown", function AcademicLockComponent_Case_11_Template_svg_pointerdown_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.turn($event));
    });
    \u0275\u0275element(2, "circle", 11)(3, "circle", 12);
    \u0275\u0275repeaterCreate(4, AcademicLockComponent_Case_11_For_5_Template, 1, 1, ":svg:path", 13, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(6, "text", 14);
    \u0275\u0275text(7, "N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "text", 15);
    \u0275\u0275text(9, "E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "text", 16);
    \u0275\u0275text(11, "S");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "text", 17);
    \u0275\u0275text(13, "W");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "g");
    \u0275\u0275element(15, "path", 18)(16, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "circle", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "output");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label");
    \u0275\u0275text(21, "2. Rotate the mechanism ");
    \u0275\u0275elementStart(22, "input", 21);
    \u0275\u0275listener("ngModelChange", function AcademicLockComponent_Case_11_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setting.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "small");
    \u0275\u0275text(24, "Drag the compass or use the slider arrow keys. North is 0\xB0; clockwise is positive.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c12));
    \u0275\u0275advance(10);
    \u0275\u0275attribute("transform", "rotate(" + ctx_r1.setting() + " 120 120)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.setting(), "\xB0");
    \u0275\u0275advance(3);
    \u0275\u0275property("min", ctx_r1.lock().min)("max", ctx_r1.lock().max)("step", ctx_r1.lock().step)("ngModel", ctx_r1.setting());
    \u0275\u0275control();
  }
}
function AcademicLockComponent_Case_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 24);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_12_For_4_Template_button_click_1_listener() {
      const \u0275$index_77_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.digit(\u0275$index_77_r6, 1));
    });
    \u0275\u0275text(2, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "output");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_12_For_4_Template_button_click_5_listener() {
      const \u0275$index_77_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.digit(\u0275$index_77_r6, -1));
    });
    \u0275\u0275text(6, "\u2212");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const digitValue_r7 = ctx.$implicit;
    const \u0275$index_77_r6 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Increase digit " + (\u0275$index_77_r6 + 1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(digitValue_r7);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Decrease digit " + (\u0275$index_77_r6 + 1));
  }
}
function AcademicLockComponent_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "2. Set the date cylinders");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 23);
    \u0275\u0275repeaterCreate(3, AcademicLockComponent_Case_12_For_4_Template, 7, 3, "div", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.digits());
  }
}
function AcademicLockComponent_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 27)(3, "path", 28)(4, "circle", 29);
    \u0275\u0275elementStart(5, "text", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "2. Extend the route to the distance you calculated");
    \u0275\u0275elementStart(9, "input", 31);
    \u0275\u0275listener("ngModelChange", function AcademicLockComponent_Case_13_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setting.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275attribute("d", "M25 120H" + (25 + 270 * ctx_r1.setting() / ctx_r1.lock().max));
    \u0275\u0275advance();
    \u0275\u0275attribute("cx", 25 + 270 * ctx_r1.setting() / ctx_r1.lock().max);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.setting(), " ", ctx_r1.lock().unit);
    \u0275\u0275advance(3);
    \u0275\u0275property("min", ctx_r1.lock().min)("max", ctx_r1.lock().max)("step", ctx_r1.lock().step)("ngModel", ctx_r1.setting());
    \u0275\u0275control();
  }
}
function AcademicLockComponent_Case_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_14_For_2_Template_button_click_0_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selected.set([item_r10.id]));
    });
    \u0275\u0275elementStart(1, "i");
    \u0275\u0275element(2, "b");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("pulled", ctx_r1.selected().includes(item_r10.id));
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected().includes(item_r10.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r10.label);
  }
}
function AcademicLockComponent_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, AcademicLockComponent_Case_14_For_2_Template, 5, 4, "button", 32, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lock().items);
  }
}
function AcademicLockComponent_Case_15_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 34);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_15_For_4_Template_button_click_5_listener() {
      const \u0275$index_127_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.move(\u0275$index_127_r12, -1));
    });
    \u0275\u0275text(6, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_15_For_4_Template_button_click_7_listener() {
      const \u0275$index_127_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.move(\u0275$index_127_r12, 1));
    });
    \u0275\u0275text(8, "\u2193");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const id_r13 = ctx.$implicit;
    const \u0275$index_127_r12 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_127_r12 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.label(id_r13));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", \u0275$index_127_r12 === 0);
    \u0275\u0275attribute("aria-label", "Move " + ctx_r1.label(id_r13) + " earlier");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_127_r12 === ctx_r1.order().length - 1);
    \u0275\u0275attribute("aria-label", "Move " + ctx_r1.label(id_r13) + " later");
  }
}
function AcademicLockComponent_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "Move the plaques from earliest to latest.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ol", 33);
    \u0275\u0275repeaterCreate(3, AcademicLockComponent_Case_15_For_4_Template, 9, 6, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.order());
  }
}
function AcademicLockComponent_Case_16_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_16_For_7_Template_button_click_0_listener() {
      const item_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.plot(item_r16.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("left", item_r16.x, "%")("top", item_r16.y, "%");
    \u0275\u0275classProp("placed", ctx_r1.order().includes(item_r16.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.order().includes(item_r16.id) ? ctx_r1.order().indexOf(item_r16.id) + 1 : "\uFF0B");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r16.label);
  }
}
function AcademicLockComponent_Case_16_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.label(id_r17), " \u2192 ");
  }
}
function AcademicLockComponent_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "Place the route pins in travel order.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 36);
    \u0275\u0275element(4, "path", 37)(5, "polyline");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, AcademicLockComponent_Case_16_For_7_Template, 4, 8, "button", 38, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 39);
    \u0275\u0275repeaterCreate(9, AcademicLockComponent_Case_16_For_10_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 6);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_16_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.order.set([]));
    });
    \u0275\u0275text(12, "Clear route");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275attribute("points", ctx_r1.routePoints());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lock().items);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.order());
  }
}
function AcademicLockComponent_Case_17_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_17_For_8_Template_button_click_0_listener() {
      const item_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle(item_r19.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("loaded", ctx_r1.selected().includes(item_r19.id));
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected().includes(item_r19.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selected().includes(item_r19.id) ? "\u25A3" : "\u25A1");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r19.mass, " kg");
  }
}
function AcademicLockComponent_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "meter", 41);
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 42);
    \u0275\u0275repeaterCreate(7, AcademicLockComponent_Case_17_For_8_Template, 6, 6, "button", 43, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.mass(), " kg loaded");
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.lock().items.length * 100)("value", ctx_r1.mass())("high", ctx_r1.calculation() ?? 0)("optimum", 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Your capacity prediction: ", ctx_r1.calculation() ?? "\u2014", " kg");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.lock().items);
  }
}
function AcademicLockComponent_Case_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_18_For_4_Template_button_click_0_listener() {
      const item_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.held.set(item_r21.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("held", ctx_r1.held() === item_r21.id)("assigned", !!ctx_r1.placements()[item_r21.id]);
    \u0275\u0275attribute("aria-pressed", ctx_r1.held() === item_r21.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.destination(item_r21.id));
  }
}
function AcademicLockComponent_Case_18_For_12_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r24 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r24.label);
  }
}
function AcademicLockComponent_Case_18_For_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AcademicLockComponent_Case_18_For_12_For_4_Conditional_0_Template, 2, 1, "span");
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    const zone_r23 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.placements()[item_r24.id] === zone_r23.id ? 0 : -1);
  }
}
function AcademicLockComponent_Case_18_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function AcademicLockComponent_Case_18_For_12_Template_button_click_0_listener() {
      const zone_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.place(zone_r23.id));
    });
    \u0275\u0275elementStart(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, AcademicLockComponent_Case_18_For_12_For_4_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const zone_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.held());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(zone_r23.label);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lock().items);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.held() ? "Place " + ctx_r1.label(ctx_r1.held()) + " here" : "Select an object above");
  }
}
function AcademicLockComponent_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 45);
    \u0275\u0275repeaterCreate(3, AcademicLockComponent_Case_18_For_4_Template, 5, 7, "button", 46, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 47)(6, "b");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 48);
    \u0275\u0275repeaterCreate(11, AcademicLockComponent_Case_18_For_12_Template, 7, 3, "button", 49, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 22);
    \u0275\u0275text(14, "To move an object, select it again and choose another destination.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Place all ", ctx_r1.lock().items.length, " objects. Select an object below, then select its destination. Selection order does not matter.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.lock().items);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.lock().items.length - ctx_r1.unplaced().length, " of ", ctx_r1.lock().items.length, " placed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.held() ? "Now choose a destination for " + ctx_r1.label(ctx_r1.held()) + "." : ctx_r1.unplaced().length ? "Select an object to place it." : "All objects placed. Operate the mechanism to check your sorting.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.lock().zones);
  }
}
function AcademicLockComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.lock().hint);
  }
}
var AcademicLockComponent = class _AcademicLockComponent {
  lock = input.required(
    ...ngDevMode ? [{ debugName: "lock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saved = input(
    ...ngDevMode ? [void 0, { debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    )
  );
  operate = output();
  calculation = signal(
    null,
    ...ngDevMode ? [{ debugName: "calculation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setting = signal(
    0,
    ...ngDevMode ? [{ debugName: "setting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  order = signal(
    [],
    ...ngDevMode ? [{ debugName: "order" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    [],
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placements = signal(
    {},
    ...ngDevMode ? [{ debugName: "placements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  held = signal(
    "",
    ...ngDevMode ? [{ debugName: "held" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hint = signal(
    false,
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  matching = computed(
    () => ["sorting", "people-placement", "technology-sort", "evidence-board"].includes(this.lock().type),
    ...ngDevMode ? [{ debugName: "matching" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unplaced = computed(
    () => this.lock().items?.filter((item) => !this.lock().zones?.some((zone) => zone.id === this.placements()[item.id])) ?? [],
    ...ngDevMode ? [{ debugName: "unplaced" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canOperate = computed(
    () => !this.matching() || this.unplaced().length === 0,
    ...ngDevMode ? [{ debugName: "canOperate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mass = computed(
    () => cargoMass(this.lock(), this.selected()),
    ...ngDevMode ? [{ debugName: "mass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  digits = computed(
    () => String(Math.round(this.setting())).padStart(this.lock().digits ?? 4, "0").split(""),
    ...ngDevMode ? [{ debugName: "digits" }] : (
      /* istanbul ignore next */
      []
    )
  );
  routePoints = computed(
    () => this.order().map((id) => this.lock().items?.find((i) => i.id === id)).filter((i) => !!i).map((i) => `${i.x},${i.y}`).join(" "),
    ...ngDevMode ? [{ debugName: "routePoints" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answer = computed(
    () => ({ calculation: this.calculation() ?? void 0, setting: this.setting(), order: this.order(), selected: this.selected(), placements: this.placements() }),
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const lock = this.lock(), saved = this.saved();
      this.calculation.set(saved?.calculation ?? null);
      this.setting.set(saved?.setting ?? lock.min ?? 0);
      this.order.set([...saved?.order ?? (lock.type === "timeline" ? lock.items?.map((i) => i.id) ?? [] : [])]);
      this.selected.set([...saved?.selected ?? []]);
      this.placements.set(__spreadValues({}, saved?.placements));
      this.held.set("");
      this.hint.set(false);
    });
  }
  label(id) {
    return this.lock().items?.find((i) => i.id === id)?.label ?? id;
  }
  destination(id) {
    return this.lock().zones?.find((zone) => zone.id === this.placements()[id])?.label ?? "Not placed";
  }
  submit() {
    if (this.canOperate())
      this.operate.emit(this.answer());
  }
  move(index, direction) {
    const next = [...this.order()];
    const target = index + direction;
    if (target < 0 || target >= next.length)
      return;
    [next[index], next[target]] = [next[target], next[index]];
    this.order.set(next);
  }
  digit(index, direction) {
    const chars = [...this.digits()];
    chars[index] = String((Number(chars[index]) + direction + 10) % 10);
    this.setting.set(Number(chars.join("")));
  }
  toggle(id) {
    this.selected.update((ids) => ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);
  }
  place(zone) {
    if (this.held()) {
      this.placements.update((p) => __spreadProps(__spreadValues({}, p), { [this.held()]: zone }));
      this.held.set("");
    }
  }
  plot(id) {
    if (!this.order().includes(id))
      this.order.update((order) => [...order, id]);
  }
  turn(event) {
    const element = event.currentTarget;
    element.setPointerCapture(event.pointerId);
    const set = (p) => {
      const rect = element.getBoundingClientRect(), x = p.clientX - rect.left - rect.width / 2, y = p.clientY - rect.top - rect.height / 2;
      const degrees = (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360, step = this.lock().step ?? 1;
      this.setting.set(Math.max(this.lock().min ?? 0, Math.min(this.lock().max ?? 360, Math.round(degrees / step) * step)));
    };
    set(event);
    element.onpointermove = set;
    element.onpointerup = () => {
      element.onpointermove = null;
      element.onpointerup = null;
    };
    element.onpointercancel = () => {
      element.onpointermove = null;
      element.onpointerup = null;
    };
  }
  static \u0275fac = function AcademicLockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AcademicLockComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AcademicLockComponent, selectors: [["app-academic-lock"]], inputs: { lock: [1, "lock"], saved: [1, "saved"] }, outputs: { operate: "operate" }, decls: 27, vars: 13, consts: [[1, "lock-shell"], [1, "lock-heading"], [1, "calculation"], [1, "levers"], [1, "lock-actions"], [1, "operate", 3, "click", "disabled"], [1, "secondary", 3, "click"], ["role", "status", 1, "hint"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "compass-wrap"], ["viewBox", "0 0 240 240", "aria-hidden", "true", 1, "compass", 3, "pointerdown"], ["cx", "120", "cy", "120", "r", "108", 1, "ring"], ["cx", "120", "cy", "120", "r", "87", 1, "inner"], ["d", "M120 20V31", 1, "tick"], ["x", "120", "y", "53"], ["x", "190", "y", "125"], ["x", "120", "y", "196"], ["x", "49", "y", "125"], ["d", "M120 42L132 128L120 117L108 128Z", 1, "needle"], ["d", "M120 195L130 119L120 125L110 119Z", 1, "tail"], ["cx", "120", "cy", "120", "r", "9", 1, "hub"], ["type", "range", "aria-label", "Mechanism angle", 3, "ngModelChange", "min", "max", "step", "ngModel"], [1, "instruction"], [1, "cylinders"], [3, "click"], [1, "blueprint"], ["viewBox", "0 0 320 150", "aria-hidden", "true"], ["d", "M25 120H295V25", 1, "grid-line"], [1, "measure-line"], ["cy", "120", "r", "7", 1, "needle"], ["x", "160", "y", "65"], ["type", "range", "aria-label", "Route distance", 3, "ngModelChange", "min", "max", "step", "ngModel"], [3, "pulled"], [1, "timeline-tiles"], [3, "click", "disabled"], [1, "route-map"], ["viewBox", "0 0 100 100", "preserveAspectRatio", "none", "aria-hidden", "true"], ["d", "M7 12L25 8L29 27L42 40L35 65L20 86L15 47Z M55 7L73 10L70 24L82 35L74 49L67 77L57 64L54 38Z M75 12L94 8L96 35L81 42"], [3, "left", "top", "placed"], [1, "route-order"], [1, "cargo-scale"], ["min", "0", 3, "max", "value", "high", "optimum"], [1, "cargo-items"], [3, "loaded"], ["id", "sorting-instructions", 1, "instruction"], [1, "sort-items"], ["aria-describedby", "sorting-instructions", 3, "held", "assigned"], ["id", "placement-status", "role", "status", 1, "placement-status"], [1, "sort-zones"], [1, "crate", 3, "disabled"], ["aria-describedby", "sorting-instructions", 3, "click"], [1, "crate", 3, "click", "disabled"]], template: function AcademicLockComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "span");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "small");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h3");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, AcademicLockComponent_Conditional_10_Template, 6, 4, "label", 2);
      \u0275\u0275conditionalCreate(11, AcademicLockComponent_Case_11_Template, 25, 7)(12, AcademicLockComponent_Case_12_Template, 5, 0)(13, AcademicLockComponent_Case_13_Template, 10, 8)(14, AcademicLockComponent_Case_14_Template, 3, 0, "div", 3)(15, AcademicLockComponent_Case_15_Template, 5, 0)(16, AcademicLockComponent_Case_16_Template, 13, 1)(17, AcademicLockComponent_Case_17_Template, 9, 6)(18, AcademicLockComponent_Case_18_Template, 15, 4);
      \u0275\u0275elementStart(19, "div", 4)(20, "button", 5);
      \u0275\u0275listener("click", function AcademicLockComponent_Template_button_click_20_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(21, "Operate mechanism ");
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, "\u2192");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "button", 6);
      \u0275\u0275listener("click", function AcademicLockComponent_Template_button_click_24_listener() {
        return ctx.hint.set(!ctx.hint());
      });
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(26, AcademicLockComponent_Conditional_26_Template, 2, 1, "p", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275attribute("data-lock-type", ctx.lock().type);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.lock().domain === "math" ? "CALCULATE \xB7 MANIPULATE \xB7 UNLOCK" : "USE THE EVIDENCE \xB7 OPERATE THE LOCK");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lock().standard);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lock().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lock().prompt);
      \u0275\u0275advance();
      \u0275\u0275conditional(\u0275\u0275pureFunction0(12, _c02).includes(ctx.lock().type) ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.lock().type) === "rotation" ? 11 : tmp_6_0 === "combo" ? 12 : tmp_6_0 === "measurement" ? 13 : tmp_6_0 === "lever" ? 14 : tmp_6_0 === "timeline" ? 15 : tmp_6_0 === "map-route" ? 16 : tmp_6_0 === "cargo" ? 17 : 18);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", !ctx.canOperate());
      \u0275\u0275attribute("aria-describedby", ctx.matching() ? "placement-status" : null);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-expanded", ctx.hint());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.hint() ? "Close hint" : "Need a hint?");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hint() ? 26 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #eae2cc;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: inherit;\n  border: 1px solid #6c735e;\n  background: #253d38;\n  border-radius: 6px;\n  min-height: 40px;\n  padding: 8px 12px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f2d387;\n  outline-offset: 3px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 500 27px Georgia, serif;\n  margin: 12px 0;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #d6d8c6;\n}\n.lock-heading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  color: #dfc685;\n}\n.lock-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b3c4b6;\n}\n.calculation[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n  padding: 14px;\n  background: #172c29;\n  border: 1px solid #526858;\n  border-radius: 8px;\n}\n.calculation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.calculation[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 130px;\n  background: #f0e8d5;\n  border: 0;\n  border-radius: 4px;\n  color: #203930;\n  padding: 10px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  font-size: 14px;\n}\nsmall[_ngcontent-%COMP%] {\n  color: #a9bcae;\n  line-height: 1.5;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #e4c880;\n  min-height: 35px;\n}\n.compass-wrap[_ngcontent-%COMP%] {\n  width: 220px;\n  margin: 20px auto 10px;\n  position: relative;\n  text-align: center;\n}\n.compass[_ngcontent-%COMP%] {\n  width: 220px;\n  touch-action: none;\n  cursor: grab;\n}\n.compass[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font: 12px Georgia;\n  fill: #eadcb8;\n  text-anchor: middle;\n}\n.ring[_ngcontent-%COMP%] {\n  fill: #293d35;\n  stroke: #ae9661;\n  stroke-width: 6;\n}\n.inner[_ngcontent-%COMP%] {\n  fill: #132c2c;\n  stroke: #d2b979;\n  stroke-width: 1;\n}\n.tick[_ngcontent-%COMP%] {\n  stroke: #c8ad71;\n  stroke-width: 2;\n}\n.needle[_ngcontent-%COMP%] {\n  fill: #e9c878;\n}\n.tail[_ngcontent-%COMP%] {\n  fill: #779d8c;\n}\n.hub[_ngcontent-%COMP%] {\n  fill: #d9c185;\n  stroke: #f8ebc9;\n  stroke-width: 2;\n}\n.compass-wrap[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font: 24px Georgia;\n  color: #efd393;\n}\n.cylinders[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  margin: 20px auto;\n}\n.cylinders[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  text-align: center;\n}\n.cylinders[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      #574b30,\n      #dfcd96 45%,\n      #bba46d 55%,\n      #564f37);\n  font: 42px Georgia;\n  color: #182921;\n  padding: 12px 16px;\n  border: 2px solid #baa166;\n  border-radius: 6px;\n}\n.cylinders[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  padding: 0;\n  font-size: 20px;\n}\n.instruction[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.levers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin: 24px 0;\n}\n.levers[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #152e2a;\n  font-size: 12px;\n  padding: 15px 5px;\n}\n.levers[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 70px;\n  width: 12px;\n  margin: 5px auto 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7a764f,\n      #c9b675,\n      #6b644a);\n  transform-origin: bottom;\n  transform: rotate(-15deg);\n  transition: transform 0.3s;\n}\n.levers[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  width: 26px;\n  height: 23px;\n  border-radius: 50%;\n  background: #ba9859;\n  transform: translate(-7px, -6px);\n  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.5333333333);\n}\n.levers[_ngcontent-%COMP%]   .pulled[_ngcontent-%COMP%] {\n  border-color: #ebcf8a;\n  background: #33483a;\n}\n.levers[_ngcontent-%COMP%]   .pulled[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  transform: rotate(25deg);\n}\n.timeline-tiles[_ngcontent-%COMP%] {\n  padding: 0;\n  list-style: none;\n  display: grid;\n  gap: 9px;\n}\n.timeline-tiles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #2d4037;\n  border: 1px solid #788166;\n  border-radius: 5px;\n  padding: 8px;\n}\n.timeline-tiles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > b[_ngcontent-%COMP%] {\n  color: #ddc28a;\n}\n.timeline-tiles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n}\n.timeline-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n}\n.sort-items[_ngcontent-%COMP%], \n.cargo-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 16px 0;\n}\n.sort-items[_ngcontent-%COMP%]   .held[_ngcontent-%COMP%] {\n  outline: 2px solid #eed09a;\n}\n.sort-items[_ngcontent-%COMP%]   .assigned[_ngcontent-%COMP%] {\n  background: #394b3d;\n}\n.sort-zones[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.crate[_ngcontent-%COMP%] {\n  min-height: 125px;\n  text-align: left;\n  border: 2px solid #927c51;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(92, 74, 47, 0.1333333333),\n      transparent),\n    #283c32;\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.crate[_ngcontent-%COMP%]:disabled {\n  opacity: 1;\n}\n.crate[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #e5cf97;\n  font-size: 12px;\n}\n.crate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  border-bottom: 1px solid #6a7255;\n  padding-bottom: 5px;\n}\n.crate[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: auto;\n  font-size: 10px;\n}\n.cargo-items[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  gap: 10px;\n  text-align: left;\n}\n.cargo-items[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: auto;\n  white-space: nowrap;\n}\n.cargo-items[_ngcontent-%COMP%]   .loaded[_ngcontent-%COMP%] {\n  border-color: #dcc180;\n  background: #3d4c37;\n}\n.cargo-scale[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin: 18px 0;\n  color: #ebd092;\n}\n.cargo-scale[_ngcontent-%COMP%]   meter[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 22px;\n}\n.lock-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 24px;\n}\n.operate[_ngcontent-%COMP%] {\n  background: #e5c98b;\n  color: #162f2b;\n  border-color: #f5e2b6;\n  font-weight: 700;\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n.secondary[_ngcontent-%COMP%] {\n  background: transparent;\n  font-size: 12px;\n}\n.hint[_ngcontent-%COMP%] {\n  background: #31483c;\n  border-left: 3px solid #d1b67a;\n  padding: 13px;\n  font-size: 13px;\n}\n.route-map[_ngcontent-%COMP%] {\n  height: 260px;\n  position: relative;\n  background: #152f31;\n  border: 1px solid #6e8167;\n  margin: 15px 0;\n  overflow: hidden;\n}\n.route-map[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  fill: #365449;\n  stroke: #70866a;\n  stroke-width: 0.5;\n}\n.route-map[_ngcontent-%COMP%]   polyline[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #f1ce83;\n  stroke-width: 1.3;\n}\n.route-map[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  padding: 0;\n  min-height: 26px;\n  width: 26px;\n  border-radius: 50%;\n  background: #203c35;\n  color: #e3c88c;\n  font-size: 12px;\n}\n.route-map[_ngcontent-%COMP%]   button.placed[_ngcontent-%COMP%] {\n  background: #dfbf79;\n  color: #15372c;\n}\n.route-map[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 28px;\n  transform: translateX(-50%);\n  background: #132b29;\n  color: #f5e5bd;\n  padding: 3px 6px;\n  white-space: nowrap;\n  font-size: 10px;\n}\n.route-order[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.blueprint[_ngcontent-%COMP%] {\n  margin: 15px 0;\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent,\n      transparent 19px,\n      rgba(83, 117, 102, 0.2) 20px),\n    repeating-linear-gradient(\n      90deg,\n      #152c2c,\n      #152c2c 19px,\n      rgba(83, 117, 102, 0.3333333333) 20px);\n}\n.blueprint[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.grid-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #728b74;\n  stroke-width: 1;\n  stroke-dasharray: 4;\n}\n.measure-line[_ngcontent-%COMP%] {\n  stroke: #e3c47e;\n  stroke-width: 4;\n  fill: none;\n}\n.blueprint[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #e9d99f;\n  font: 18px Georgia;\n  text-anchor: middle;\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n.sort-items[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 calc(50% - 8px);\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n.sort-items[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.sort-items[_ngcontent-%COMP%]   .held[_ngcontent-%COMP%] {\n  background: #46513a;\n  border-color: #eed09a;\n}\n.placement-status[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  padding: 12px 14px;\n  background: #182f2b;\n  border-left: 3px solid #dfc685;\n  font-size: 13px;\n}\n.placement-status[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #ecd69f;\n}\n.placement-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  line-height: 1.5;\n}\n/*# sourceMappingURL=academic-lock.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AcademicLockComponent, [{
    type: Component,
    args: [{ selector: "app-academic-lock", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="lock-shell" [attr.data-lock-type]="lock().type">\r
  <div class="lock-heading"><span>{{ lock().domain === 'math' ? 'CALCULATE \xB7 MANIPULATE \xB7 UNLOCK' : 'USE THE EVIDENCE \xB7 OPERATE THE LOCK' }}</span><small>{{ lock().standard }}</small></div>\r
  <h3>{{ lock().title }}</h3><p>{{ lock().prompt }}</p>\r
  @if (['rotation', 'combo', 'measurement', 'cargo'].includes(lock().type)) {\r
    <label class="calculation">1. {{ lock().type === 'cargo' ? 'Calculate the new capacity' : 'Determine the result' }}\r
      <span><input type="number" [ngModel]="calculation()" (ngModelChange)="calculation.set($event)" [attr.aria-label]="lock().title + ' calculation'"><b>{{ lock().unit ?? 'kg' }}</b></span>\r
    </label>\r
  }\r
  @switch (lock().type) {\r
    @case ('rotation') {\r
      <div class="compass-wrap">\r
        <svg class="compass" viewBox="0 0 240 240" (pointerdown)="turn($event)" aria-hidden="true">\r
          <circle cx="120" cy="120" r="108" class="ring"/><circle cx="120" cy="120" r="87" class="inner"/>\r
          @for (degree of [0,30,60,90,120,150,180,210,240,270,300,330]; track degree) { <path d="M120 20V31" [attr.transform]="'rotate(' + degree + ' 120 120)'" class="tick"/> }\r
          <text x="120" y="53">N</text><text x="190" y="125">E</text><text x="120" y="196">S</text><text x="49" y="125">W</text>\r
          <g [attr.transform]="'rotate(' + setting() + ' 120 120)'"><path d="M120 42L132 128L120 117L108 128Z" class="needle"/><path d="M120 195L130 119L120 125L110 119Z" class="tail"/></g><circle cx="120" cy="120" r="9" class="hub"/>\r
        </svg><output>{{ setting() }}\xB0</output>\r
      </div>\r
      <label>2. Rotate the mechanism <input type="range" [min]="lock().min!" [max]="lock().max!" [step]="lock().step!" [ngModel]="setting()" (ngModelChange)="setting.set(+$event)" aria-label="Mechanism angle"></label>\r
      <small>Drag the compass or use the slider arrow keys. North is 0\xB0; clockwise is positive.</small>\r
    }\r
    @case ('combo') {\r
      <p class="instruction">2. Set the date cylinders</p><div class="cylinders">\r
        @for (digitValue of digits(); track $index; let i = $index) {\r
          <div><button (click)="digit(i, 1)" [attr.aria-label]="'Increase digit ' + (i + 1)">+</button><output>{{ digitValue }}</output><button (click)="digit(i, -1)" [attr.aria-label]="'Decrease digit ' + (i + 1)">\u2212</button></div>\r
        }\r
      </div>\r
    }\r
    @case ('measurement') {\r
      <div class="blueprint"><svg viewBox="0 0 320 150" aria-hidden="true"><path d="M25 120H295V25" class="grid-line"/><path [attr.d]="'M25 120H' + (25 + 270 * setting() / lock().max!)" class="measure-line"/><circle [attr.cx]="25 + 270 * setting() / lock().max!" cy="120" r="7" class="needle"/><text x="160" y="65">{{ setting() }} {{ lock().unit }}</text></svg></div>\r
      <label>2. Extend the route to the distance you calculated<input type="range" [min]="lock().min!" [max]="lock().max!" [step]="lock().step!" [ngModel]="setting()" (ngModelChange)="setting.set(+$event)" aria-label="Route distance"></label>\r
    }\r
    @case ('lever') {\r
      <div class="levers">@for (item of lock().items; track item.id) { <button [class.pulled]="selected().includes(item.id)" [attr.aria-pressed]="selected().includes(item.id)" (click)="selected.set([item.id])"><i><b></b></i><span>{{ item.label }}</span></button> }</div>\r
    }\r
    @case ('timeline') {\r
      <p class="instruction">Move the plaques from earliest to latest.</p><ol class="timeline-tiles">@for (id of order(); track id; let i = $index) { <li><b>{{ i + 1 }}</b><span>{{ label(id) }}</span><button [disabled]="i === 0" (click)="move(i, -1)" [attr.aria-label]="'Move ' + label(id) + ' earlier'">\u2191</button><button [disabled]="i === order().length - 1" (click)="move(i, 1)" [attr.aria-label]="'Move ' + label(id) + ' later'">\u2193</button></li> }</ol>\r
    }\r
    @case ('map-route') {\r
      <p class="instruction">Place the route pins in travel order.</p><div class="route-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M7 12L25 8L29 27L42 40L35 65L20 86L15 47Z M55 7L73 10L70 24L82 35L74 49L67 77L57 64L54 38Z M75 12L94 8L96 35L81 42"/><polyline [attr.points]="routePoints()"/></svg>\r
      @for (item of lock().items; track item.id) { <button [style.left.%]="item.x" [style.top.%]="item.y" [class.placed]="order().includes(item.id)" (click)="plot(item.id)">{{ order().includes(item.id) ? order().indexOf(item.id) + 1 : '\uFF0B' }}<span>{{ item.label }}</span></button> }</div>\r
      <p class="route-order">@for (id of order(); track id) { <span>{{ label(id) }} \u2192 </span> }</p><button class="secondary" (click)="order.set([])">Clear route</button>\r
    }\r
    @case ('cargo') {\r
      <div class="cargo-scale"><span>{{ mass() }} kg loaded</span><meter min="0" [max]="lock().items!.length * 100" [value]="mass()" [high]="calculation() ?? 0" [optimum]="0"></meter><small>Your capacity prediction: {{ calculation() ?? '\u2014' }} kg</small></div>\r
      <div class="cargo-items">@for (item of lock().items; track item.id) { <button [class.loaded]="selected().includes(item.id)" [attr.aria-pressed]="selected().includes(item.id)" (click)="toggle(item.id)"><span>{{ selected().includes(item.id) ? '\u25A3' : '\u25A1' }}</span>{{ item.label }}<b>{{ item.mass }} kg</b></button> }</div>\r
    }\r
    @default {\r
      <p class="instruction" id="sorting-instructions">Place all {{ lock().items!.length }} objects. Select an object below, then select its destination. Selection order does not matter.</p>\r
      <div class="sort-items">@for (item of lock().items; track item.id) { <button [class.held]="held() === item.id" [class.assigned]="!!placements()[item.id]" [attr.aria-pressed]="held() === item.id" aria-describedby="sorting-instructions" (click)="held.set(item.id)"><strong>{{ item.label }}</strong><small>{{ destination(item.id) }}</small></button> }</div>\r
      <p class="placement-status" id="placement-status" role="status"><b>{{ lock().items!.length - unplaced().length }} of {{ lock().items!.length }} placed</b><span>{{ held() ? 'Now choose a destination for ' + label(held()) + '.' : unplaced().length ? 'Select an object to place it.' : 'All objects placed. Operate the mechanism to check your sorting.' }}</span></p>\r
      <div class="sort-zones">@for (zone of lock().zones; track zone.id) { <button class="crate" (click)="place(zone.id)" [disabled]="!held()"><b>{{ zone.label }}</b>@for (item of lock().items; track item.id) { @if (placements()[item.id] === zone.id) { <span>{{ item.label }}</span> } }<small>{{ held() ? 'Place ' + label(held()) + ' here' : 'Select an object above' }}</small></button> }</div>\r
      <p class="instruction">To move an object, select it again and choose another destination.</p>\r
    }\r
  }\r
  <div class="lock-actions"><button class="operate" [disabled]="!canOperate()" [attr.aria-describedby]="matching() ? 'placement-status' : null" (click)="submit()">Operate mechanism <span>\u2192</span></button><button class="secondary" (click)="hint.set(!hint())" [attr.aria-expanded]="hint()">{{ hint() ? 'Close hint' : 'Need a hint?' }}</button></div>\r
  @if (hint()) { <p class="hint" role="status">{{ lock().hint }}</p> }\r
</section>\r
`, styles: ["/* src/app/templates/heist/gallery/ui/academic-lock.component.scss */\n:host {\n  display: block;\n  color: #eae2cc;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  color: inherit;\n  border: 1px solid #6c735e;\n  background: #253d38;\n  border-radius: 6px;\n  min-height: 40px;\n  padding: 8px 12px;\n}\nbutton:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #f2d387;\n  outline-offset: 3px;\n}\nh3 {\n  font: 500 27px Georgia, serif;\n  margin: 12px 0;\n}\np {\n  line-height: 1.6;\n  color: #d6d8c6;\n}\n.lock-heading {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  color: #dfc685;\n}\n.lock-heading small {\n  color: #b3c4b6;\n}\n.calculation {\n  display: grid;\n  gap: 9px;\n  padding: 14px;\n  background: #172c29;\n  border: 1px solid #526858;\n  border-radius: 8px;\n}\n.calculation span {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.calculation input {\n  width: 130px;\n  background: #f0e8d5;\n  border: 0;\n  border-radius: 4px;\n  color: #203930;\n  padding: 10px;\n}\nlabel {\n  display: grid;\n  gap: 8px;\n  font-size: 14px;\n}\nsmall {\n  color: #a9bcae;\n  line-height: 1.5;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: #e4c880;\n  min-height: 35px;\n}\n.compass-wrap {\n  width: 220px;\n  margin: 20px auto 10px;\n  position: relative;\n  text-align: center;\n}\n.compass {\n  width: 220px;\n  touch-action: none;\n  cursor: grab;\n}\n.compass text {\n  font: 12px Georgia;\n  fill: #eadcb8;\n  text-anchor: middle;\n}\n.ring {\n  fill: #293d35;\n  stroke: #ae9661;\n  stroke-width: 6;\n}\n.inner {\n  fill: #132c2c;\n  stroke: #d2b979;\n  stroke-width: 1;\n}\n.tick {\n  stroke: #c8ad71;\n  stroke-width: 2;\n}\n.needle {\n  fill: #e9c878;\n}\n.tail {\n  fill: #779d8c;\n}\n.hub {\n  fill: #d9c185;\n  stroke: #f8ebc9;\n  stroke-width: 2;\n}\n.compass-wrap output {\n  font: 24px Georgia;\n  color: #efd393;\n}\n.cylinders {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  margin: 20px auto;\n}\n.cylinders > div {\n  display: grid;\n  gap: 5px;\n  text-align: center;\n}\n.cylinders output {\n  background:\n    linear-gradient(\n      #574b30,\n      #dfcd96 45%,\n      #bba46d 55%,\n      #564f37);\n  font: 42px Georgia;\n  color: #182921;\n  padding: 12px 16px;\n  border: 2px solid #baa166;\n  border-radius: 6px;\n}\n.cylinders button {\n  background: transparent;\n  border: 0;\n  padding: 0;\n  font-size: 20px;\n}\n.instruction {\n  font-size: 13px;\n}\n.levers {\n  display: flex;\n  gap: 8px;\n  margin: 24px 0;\n}\n.levers button {\n  flex: 1;\n  background: #152e2a;\n  font-size: 12px;\n  padding: 15px 5px;\n}\n.levers i {\n  display: block;\n  height: 70px;\n  width: 12px;\n  margin: 5px auto 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7a764f,\n      #c9b675,\n      #6b644a);\n  transform-origin: bottom;\n  transform: rotate(-15deg);\n  transition: transform 0.3s;\n}\n.levers b {\n  display: block;\n  width: 26px;\n  height: 23px;\n  border-radius: 50%;\n  background: #ba9859;\n  transform: translate(-7px, -6px);\n  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.5333333333);\n}\n.levers .pulled {\n  border-color: #ebcf8a;\n  background: #33483a;\n}\n.levers .pulled i {\n  transform: rotate(25deg);\n}\n.timeline-tiles {\n  padding: 0;\n  list-style: none;\n  display: grid;\n  gap: 9px;\n}\n.timeline-tiles li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #2d4037;\n  border: 1px solid #788166;\n  border-radius: 5px;\n  padding: 8px;\n}\n.timeline-tiles li > b {\n  color: #ddc28a;\n}\n.timeline-tiles span {\n  flex: 1;\n  font-size: 13px;\n}\n.timeline-tiles button {\n  padding: 4px 10px;\n}\n.sort-items,\n.cargo-items {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 16px 0;\n}\n.sort-items .held {\n  outline: 2px solid #eed09a;\n}\n.sort-items .assigned {\n  background: #394b3d;\n}\n.sort-zones {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.crate {\n  min-height: 125px;\n  text-align: left;\n  border: 2px solid #927c51;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(92, 74, 47, 0.1333333333),\n      transparent),\n    #283c32;\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.crate:disabled {\n  opacity: 1;\n}\n.crate b {\n  color: #e5cf97;\n  font-size: 12px;\n}\n.crate span {\n  font-size: 12px;\n  border-bottom: 1px solid #6a7255;\n  padding-bottom: 5px;\n}\n.crate small {\n  margin-top: auto;\n  font-size: 10px;\n}\n.cargo-items button {\n  width: 100%;\n  display: flex;\n  gap: 10px;\n  text-align: left;\n}\n.cargo-items b {\n  margin-left: auto;\n  white-space: nowrap;\n}\n.cargo-items .loaded {\n  border-color: #dcc180;\n  background: #3d4c37;\n}\n.cargo-scale {\n  display: grid;\n  gap: 8px;\n  margin: 18px 0;\n  color: #ebd092;\n}\n.cargo-scale meter {\n  width: 100%;\n  height: 22px;\n}\n.lock-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 24px;\n}\n.operate {\n  background: #e5c98b;\n  color: #162f2b;\n  border-color: #f5e2b6;\n  font-weight: 700;\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n.secondary {\n  background: transparent;\n  font-size: 12px;\n}\n.hint {\n  background: #31483c;\n  border-left: 3px solid #d1b67a;\n  padding: 13px;\n  font-size: 13px;\n}\n.route-map {\n  height: 260px;\n  position: relative;\n  background: #152f31;\n  border: 1px solid #6e8167;\n  margin: 15px 0;\n  overflow: hidden;\n}\n.route-map svg {\n  width: 100%;\n  height: 100%;\n  fill: #365449;\n  stroke: #70866a;\n  stroke-width: 0.5;\n}\n.route-map polyline {\n  fill: none;\n  stroke: #f1ce83;\n  stroke-width: 1.3;\n}\n.route-map button {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  padding: 0;\n  min-height: 26px;\n  width: 26px;\n  border-radius: 50%;\n  background: #203c35;\n  color: #e3c88c;\n  font-size: 12px;\n}\n.route-map button.placed {\n  background: #dfbf79;\n  color: #15372c;\n}\n.route-map span {\n  position: absolute;\n  left: 50%;\n  top: 28px;\n  transform: translateX(-50%);\n  background: #132b29;\n  color: #f5e5bd;\n  padding: 3px 6px;\n  white-space: nowrap;\n  font-size: 10px;\n}\n.route-order {\n  font-size: 11px;\n}\n.blueprint {\n  margin: 15px 0;\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent,\n      transparent 19px,\n      rgba(83, 117, 102, 0.2) 20px),\n    repeating-linear-gradient(\n      90deg,\n      #152c2c,\n      #152c2c 19px,\n      rgba(83, 117, 102, 0.3333333333) 20px);\n}\n.blueprint svg {\n  width: 100%;\n}\n.grid-line {\n  fill: none;\n  stroke: #728b74;\n  stroke-width: 1;\n  stroke-dasharray: 4;\n}\n.measure-line {\n  stroke: #e3c47e;\n  stroke-width: 4;\n  fill: none;\n}\n.blueprint text {\n  fill: #e9d99f;\n  font: 18px Georgia;\n  text-anchor: middle;\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n.sort-items button {\n  flex: 1 1 calc(50% - 8px);\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n.sort-items small {\n  font-size: 11px;\n}\n.sort-items .held {\n  background: #46513a;\n  border-color: #eed09a;\n}\n.placement-status {\n  display: grid;\n  gap: 5px;\n  padding: 12px 14px;\n  background: #182f2b;\n  border-left: 3px solid #dfc685;\n  font-size: 13px;\n}\n.placement-status b {\n  color: #ecd69f;\n}\n.placement-status span {\n  line-height: 1.5;\n}\n/*# sourceMappingURL=academic-lock.component.css.map */\n"] }]
  }], () => [], { lock: [{ type: Input, args: [{ isSignal: true, alias: "lock", required: true }] }], saved: [{ type: Input, args: [{ isSignal: true, alias: "saved", required: false }] }], operate: [{ type: Output, args: ["operate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AcademicLockComponent, { className: "AcademicLockComponent", filePath: "src/app/templates/heist/gallery/ui/academic-lock.component.ts", lineNumber: 9 });
})();

export {
  EncounterComponent,
  AcademicLockComponent
};
//# debugId=4a9e74db-e3fb-5a77-9fa9-c7b240321a45
//# sourceMappingURL=chunk-TIQJIT5F.js.map
