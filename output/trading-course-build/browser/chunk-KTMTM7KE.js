import {
  DraftAutosaveController
} from "./chunk-5LAJN7BS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RangeValueAccessor,
  ɵNgNoValidate
} from "./chunk-UW6DFD2Z.js";
import {
  Component,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/templates/investigation/ui/final-investigation.component.ts
var _c0 = ["previewHeading"];
var _forTrack0 = ($index, $item) => $item.id;
function InvestigationFinalCaseComponent_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_1_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.caseBoardRequested.emit());
    });
    \u0275\u0275text(1, "Review Case Board");
    \u0275\u0275elementEnd();
  }
}
function InvestigationFinalCaseComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 3)(1, "span", 4);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "small");
    \u0275\u0275text(5, "Final investigation submitted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "Your case has been recorded.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "The official case reveal will be released by your teacher.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, InvestigationFinalCaseComponent_Conditional_1_Conditional_10_Template, 2, 0, "button", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 10 : -1);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_20_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, InvestigationFinalCaseComponent_Conditional_2_Conditional_20_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.missingReadiness());
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.caseBoardRequested.emit());
    });
    \u0275\u0275text(1, "Review Case Board");
    \u0275\u0275elementEnd();
  }
}
function InvestigationFinalCaseComponent_Conditional_2_For_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_For_45_Template_button_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previewEvidenceRecord(item_r7.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.title, " ");
  }
}
function InvestigationFinalCaseComponent_Conditional_2_For_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_For_50_Template_button_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previewEvidenceRecord(item_r9.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.title, " ");
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(column_r11);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r12 ?? "\u2014");
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_12_For_4_Template, 2, 1, "td", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r13.label);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r13.cells);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "table")(2, "caption");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "thead")(5, "tr")(6, "th", 35);
    \u0275\u0275text(7, "Sample");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_9_Template, 2, 1, "th", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_For_12_Template, 5, 1, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const matrix_r14 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", matrix_r14.title, " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(matrix_r14.columnLabels);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(matrix_r14.rows);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(note_r15);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 14)(1, "button", 32);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previewEvidenceId.set(void 0));
    });
    \u0275\u0275text(2, " \xD7 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong", 33, 0);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "small");
    \u0275\u0275text(14, "Source");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Conditional_16_Template, 13, 1, "div", 34);
    \u0275\u0275repeaterCreate(17, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_For_18_Template, 2, 1, "p", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const preview_r16 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(preview_r16.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(preview_r16.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(preview_r16.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Analysis: ", preview_r16.classification ?? "not classified");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", preview_r16.source);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = preview_r16.resultMatrix) ? 16 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(preview_r16.notes);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_For_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 37, 1);
    \u0275\u0275listener("change", function InvestigationFinalCaseComponent_Conditional_2_For_93_Template_input_change_1_listener() {
      const item_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const finalEvidence_r19 = \u0275\u0275reference(2);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleEvidence(item_r18.id, finalEvidence_r19.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_For_93_Template_button_click_8_listener($event) {
      const item_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.previewEvidenceRecord(item_r18.id));
    });
    \u0275\u0275text(9, " Preview ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.readOnly())("checked", ctx_r1.selectedEvidenceIds().includes(item_r18.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r18.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.classification ?? item_r18.type);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_ForEmpty_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No collected evidence matches this filter.");
    \u0275\u0275elementEnd();
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_147_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r20);
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, InvestigationFinalCaseComponent_Conditional_2_Conditional_147_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.missingSections());
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_148_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1, " Connection required to submit. Your draft remains saved on this device. ");
    \u0275\u0275elementEnd();
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_148_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "footer");
    \u0275\u0275conditionalCreate(1, InvestigationFinalCaseComponent_Conditional_2_Conditional_148_Conditional_1_Template, 2, 0, "p", 38);
    \u0275\u0275elementStart(2, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Conditional_148_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveDraft());
    });
    \u0275\u0275text(3, "Save draft");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 39);
    \u0275\u0275text(5, " Submit final investigation ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.connectionAvailable() ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.missingSections().length > 0 || !ctx_r1.connectionAvailable());
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Conditional_149_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "section", 40)(2, "span", 8);
    \u0275\u0275text(3, "Authoritative submission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 41);
    \u0275\u0275text(5, "Submit final investigation?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Your official case will be recorded. A teacher can return it for revision later.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Conditional_149_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmSubmit.set(false));
    });
    \u0275\u0275text(10, "Keep editing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 42);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Conditional_149_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.confirmSubmit.set(false);
      return \u0275\u0275resetView(ctx_r1.submitRequested.emit());
    });
    \u0275\u0275text(12, " Submit investigation ");
    \u0275\u0275elementEnd()()()();
  }
}
function InvestigationFinalCaseComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 7)(1, "div")(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 9);
    \u0275\u0275text(5, "Final Investigation");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "i");
    \u0275\u0275element(10, "span");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "section", 11)(12, "div")(13, "span", 4);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div")(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, InvestigationFinalCaseComponent_Conditional_2_Conditional_20_Template, 3, 0, "ul");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 12)(22, "aside", 13)(23, "header")(24, "span");
    \u0275\u0275text(25, "Your investigation");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, InvestigationFinalCaseComponent_Conditional_2_Conditional_26_Template, 2, 0, "button", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "section")(28, "small");
    \u0275\u0275text(29, "Current theory");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "section")(35, "small");
    \u0275\u0275text(36, "Evidence collected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "strong");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "section")(42, "small");
    \u0275\u0275text(43, "Strongest support");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(44, InvestigationFinalCaseComponent_Conditional_2_For_45_Template, 2, 1, "button", 5, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "section")(47, "small");
    \u0275\u0275text(48, "Biggest challenge");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(49, InvestigationFinalCaseComponent_Conditional_2_For_50_Template, 2, 1, "button", 5, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(51, InvestigationFinalCaseComponent_Conditional_2_Conditional_51_Template, 19, 6, "article", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "form", 15);
    \u0275\u0275listener("submit", function InvestigationFinalCaseComponent_Conditional_2_Template_form_submit_52_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.requestSubmit());
    });
    \u0275\u0275elementStart(53, "header")(54, "div")(55, "span");
    \u0275\u0275text(56, "Laboratory case report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "h3");
    \u0275\u0275text(58, "Restored Shelf Case File");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "span", 16);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "label", 17)(62, "span");
    \u0275\u0275text(63, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div")(65, "strong");
    \u0275\u0275text(66, "Final identification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "small");
    \u0275\u0275text(68, "Identify the four vials and explain the shelf arrangement.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "textarea", 18);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("identification", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "fieldset", 17)(71, "span");
    \u0275\u0275text(72, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div")(74, "legend");
    \u0275\u0275text(75, "Show your best clues");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "small");
    \u0275\u0275text(77, "Select at least four existing evidence records.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "nav", 19)(79, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_79_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("all"));
    });
    \u0275\u0275text(80, " All ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_81_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("supports"));
    });
    \u0275\u0275text(82, " Supports ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("contradicts"));
    });
    \u0275\u0275text(84, " Challenges ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_85_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("uncertain"));
    });
    \u0275\u0275text(86, " Uncertain ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_87_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("important"));
    });
    \u0275\u0275text(88, " Important ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "button", 6);
    \u0275\u0275listener("click", function InvestigationFinalCaseComponent_Conditional_2_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.evidenceFilter.set("studentCreated"));
    });
    \u0275\u0275text(90, " Created by me ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 20);
    \u0275\u0275repeaterCreate(92, InvestigationFinalCaseComponent_Conditional_2_For_93_Template, 10, 4, "label", null, _forTrack0, false, InvestigationFinalCaseComponent_Conditional_2_ForEmpty_94_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "label", 17)(96, "span");
    \u0275\u0275text(97, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "div")(99, "strong");
    \u0275\u0275text(100, "Scientific reasoning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "small");
    \u0275\u0275text(102, "Why do these clues support your identification?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "textarea", 21);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_103_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("reasoning", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "label", 17)(105, "span");
    \u0275\u0275text(106, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div")(108, "strong");
    \u0275\u0275text(109, "Counterevidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "small");
    \u0275\u0275text(111, "Which clue is hardest to explain, and why is your conclusion still strongest?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "textarea", 22);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_112_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("counterevidence", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "label", 17)(114, "span");
    \u0275\u0275text(115, "5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(116, "div")(117, "strong");
    \u0275\u0275text(118, "Shelf restoration recommendation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "small");
    \u0275\u0275text(120, "What should the lab do next, including safe handling?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(121, "textarea", 23);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_121_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("recommendation", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "div", 24)(123, "label")(124, "strong");
    \u0275\u0275text(125, "What remains uncertain?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "textarea", 25);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_126_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("uncertainty", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "label")(128, "strong");
    \u0275\u0275text(129, "How did your confidence change?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "span", 26);
    \u0275\u0275text(131);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "input", 27);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_input_ngModelChange_132_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateConfidence(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "label")(134, "strong");
    \u0275\u0275text(135, "Individual reflection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(136, "textarea", 28);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_136_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("reflection", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(137, "label")(138, "strong");
    \u0275\u0275text(139, "Your contribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "textarea", 29);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalCaseComponent_Conditional_2_Template_textarea_ngModelChange_140_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateText("individualContribution", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(141, "section", 30)(142, "div")(143, "strong");
    \u0275\u0275text(144, "Final check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(145, "span");
    \u0275\u0275text(146);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(147, InvestigationFinalCaseComponent_Conditional_2_Conditional_147_Template, 3, 0, "ul");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(148, InvestigationFinalCaseComponent_Conditional_2_Conditional_148_Template, 6, 2, "footer");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(149, InvestigationFinalCaseComponent_Conditional_2_Conditional_149_Template, 13, 0, "div", 31);
  }
  if (rf & 2) {
    let tmp_16_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.readOnly() ? "Completed investigation \xB7 Fictional sample" : "Build from the work you already created");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.completedSections(), " of 5 required sections complete");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.completedSections() * 20, "%");
    \u0275\u0275advance();
    \u0275\u0275classProp("ready", ctx_r1.ready());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.ready() ? "\u2713" : "\u25C7");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.readOnly() ? "Case file complete \xB7 Evidence available to inspect" : ctx_r1.ready() ? "Final case is ready to build" : "Final readiness check");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.readOnly() ? "Open the clues to see how the completed identification was supported." : ctx_r1.ready() ? "You can still return to the Case Board before submitting." : "You may draft now, but finish the investigation record before submitting.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.ready() ? 20 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 26 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentTheory()?.statement || "No working theory saved yet");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Confidence ", ctx_r1.currentTheory()?.confidence ?? 0, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.eligibleEvidence().length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.selectedEvidence().length, " selected for the final case");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.strongestSupport());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.biggestChallenges());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_16_0 = ctx_r1.previewEvidence()) ? 51 : -1, tmp_16_0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.readOnly() ? "Completed sample \xB7 Read only" : ctx_r1.saveState() === "saving" ? "Saving\u2026" : ctx_r1.saveState() === "pending" ? "Pending sync" : "Saved on this device");
    \u0275\u0275advance(9);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.identification());
    \u0275\u0275control();
    \u0275\u0275advance(10);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "supports");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "contradicts");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "uncertain");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "important");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.evidenceFilter() === "studentCreated");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.filteredEvidence());
    \u0275\u0275advance(11);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.reasoning());
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.counterevidence());
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.recommendation());
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.uncertainty());
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Final confidence ", ctx_r1.confidence(), "%");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.readOnly())("ngModel", ctx_r1.confidence());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.reflection());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("ngModel", ctx_r1.individualContribution());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275classProp("complete", ctx_r1.missingSections().length === 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.missingSections().length === 0 ? "All required sections complete" : ctx_r1.missingSections().length + " items remaining");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.missingSections().length > 0 ? 147 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 148 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() && ctx_r1.confirmSubmit() ? 149 : -1);
  }
}
var InvestigationFinalCaseComponent = class _InvestigationFinalCaseComponent {
  runtime = input.required(
    ...ngDevMode ? [{ debugName: "runtime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = input.required(
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = input(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
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
  injector = inject(Injector);
  previewHeading = viewChild(
    "previewHeading",
    ...ngDevMode ? [{ debugName: "previewHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  missingReadiness = input(
    [],
    ...ngDevMode ? [{ debugName: "missingReadiness" }] : (
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
  caseBoardRequested = output();
  evidencePreviewRequested = output();
  draftSaved = output();
  submitRequested = output();
  identification = signal(
    "",
    ...ngDevMode ? [{ debugName: "identification" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidenceIds = signal(
    [],
    ...ngDevMode ? [{ debugName: "selectedEvidenceIds" }] : (
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
  counterevidence = signal(
    "",
    ...ngDevMode ? [{ debugName: "counterevidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  uncertainty = signal(
    "",
    ...ngDevMode ? [{ debugName: "uncertainty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recommendation = signal(
    "",
    ...ngDevMode ? [{ debugName: "recommendation" }] : (
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
  reflection = signal(
    "",
    ...ngDevMode ? [{ debugName: "reflection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  individualContribution = signal(
    "",
    ...ngDevMode ? [{ debugName: "individualContribution" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewEvidenceId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "previewEvidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmSubmit = signal(
    false,
    ...ngDevMode ? [{ debugName: "confirmSubmit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceFilter = signal(
    "all",
    ...ngDevMode ? [{ debugName: "evidenceFilter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  autosave = new DraftAutosaveController((draft) => this.draftSaved.emit(draft));
  eligibleEvidence = computed(
    () => this.evidence().filter((item) => item.status !== "locked" && item.status !== "available" && item.status !== "unopened"),
    ...ngDevMode ? [{ debugName: "eligibleEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredEvidence = computed(
    () => {
      const filter = this.evidenceFilter();
      return this.eligibleEvidence().filter((item) => {
        if (filter === "all") {
          return true;
        }
        if (filter === "important") {
          return item.important;
        }
        if (filter === "studentCreated") {
          return item.studentCreated;
        }
        return item.classification === filter;
      });
    },
    ...ngDevMode ? [{ debugName: "filteredEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidence = computed(
    () => this.eligibleEvidence().filter((item) => this.selectedEvidenceIds().includes(item.id)),
    ...ngDevMode ? [{ debugName: "selectedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewEvidence = computed(
    () => this.evidence().find((item) => item.id === this.previewEvidenceId()),
    ...ngDevMode ? [{ debugName: "previewEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  missingSections = computed(
    () => {
      const missing = [];
      if (this.identification().trim().length === 0) {
        missing.push("Final identification");
      }
      if (this.selectedEvidence().length < 4) {
        missing.push("At least 4 evidence items");
      }
      if (this.reasoning().trim().length === 0) {
        missing.push("Scientific reasoning");
      }
      if (this.counterevidence().trim().length === 0) {
        missing.push("Counterevidence");
      }
      if (this.recommendation().trim().length === 0) {
        missing.push("Shelf restoration recommendation");
      }
      return missing;
    },
    ...ngDevMode ? [{ debugName: "missingSections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedSections = computed(
    () => 5 - this.missingSections().length,
    ...ngDevMode ? [{ debugName: "completedSections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentTheory = computed(
    () => {
      const theories = this.runtime().hypotheses;
      return theories.find((theory) => theory.selected) ?? theories.at(-1);
    },
    ...ngDevMode ? [{ debugName: "currentTheory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  strongestSupport = computed(
    () => this.eligibleEvidence().filter((item) => item.classification === "supports").slice(0, 3),
    ...ngDevMode ? [{ debugName: "strongestSupport" }] : (
      /* istanbul ignore next */
      []
    )
  );
  biggestChallenges = computed(
    () => this.eligibleEvidence().filter((item) => item.classification === "contradicts").slice(0, 3),
    ...ngDevMode ? [{ debugName: "biggestChallenges" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const draft = this.runtime().finalSubmission.argumentDraft;
      this.identification.set(draft.identification ?? draft.claim ?? "");
      this.selectedEvidenceIds.set([...draft.evidenceIds ?? []]);
      this.reasoning.set(draft.reasoning ?? "");
      this.counterevidence.set(draft.counterevidence ?? "");
      this.uncertainty.set(draft.uncertainty ?? "");
      this.recommendation.set(draft.recommendation ?? "");
      this.confidence.set(draft.confidence ?? 50);
      this.reflection.set(draft.reflection ?? "");
      this.individualContribution.set(draft.individualContribution ?? "");
    });
  }
  ngOnDestroy() {
    void this.autosave.flush();
  }
  connectionAvailable() {
    return typeof navigator === "undefined" || navigator.onLine;
  }
  updateText(field, value) {
    if (this.readOnly())
      return;
    this[field].set(value);
    this.queueSave();
  }
  updateConfidence(value) {
    if (this.readOnly())
      return;
    this.confidence.set(value);
    this.queueSave();
  }
  toggleEvidence(evidenceId, selected) {
    if (this.readOnly())
      return;
    this.selectedEvidenceIds.update((current) => selected ? current.includes(evidenceId) ? current : [...current, evidenceId] : current.filter((id) => id !== evidenceId));
    this.queueSave();
  }
  saveDraft() {
    if (this.readOnly())
      return;
    this.autosave.cancel();
    this.draftSaved.emit(this.currentDraft());
  }
  requestSubmit() {
    if (this.readOnly())
      return;
    this.saveDraft();
    if (this.missingSections().length === 0 && this.connectionAvailable()) {
      this.confirmSubmit.set(true);
    }
  }
  queueSave() {
    this.autosave.schedule(this.currentDraft());
  }
  previewEvidenceRecord(id) {
    this.previewEvidenceId.set(id);
    afterNextRender(() => {
      const element = this.previewHeading()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  currentDraft() {
    return {
      identification: this.identification().trim(),
      evidenceIds: this.selectedEvidence().map((item) => item.id),
      reasoning: this.reasoning().trim(),
      counterevidence: this.counterevidence().trim(),
      uncertainty: this.uncertainty().trim(),
      recommendation: this.recommendation().trim(),
      confidence: this.confidence(),
      reflection: this.reflection().trim(),
      individualContribution: this.individualContribution().trim()
    };
  }
  static \u0275fac = function InvestigationFinalCaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationFinalCaseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationFinalCaseComponent, selectors: [["app-investigation-final-case"]], viewQuery: function InvestigationFinalCaseComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.previewHeading, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { runtime: [1, "runtime"], evidence: [1, "evidence"], ready: [1, "ready"], readOnly: [1, "readOnly"], missingReadiness: [1, "missingReadiness"], saveState: [1, "saveState"] }, outputs: { caseBoardRequested: "caseBoardRequested", evidencePreviewRequested: "evidencePreviewRequested", draftSaved: "draftSaved", submitRequested: "submitRequested" }, decls: 3, vars: 3, consts: [["previewHeading", ""], ["finalEvidence", ""], ["aria-labelledby", "final-case-title", 1, "final-workspace"], ["aria-live", "polite", 1, "submission-success"], ["aria-hidden", "true"], ["type", "button"], ["type", "button", 3, "click"], [1, "final-header"], [1, "eyebrow"], ["id", "final-case-title"], [1, "final-progress"], [1, "readiness"], [1, "final-pair"], ["aria-label", "Investigation record", 1, "investigation-record"], [1, "evidence-preview"], [1, "final-case", 3, "submit"], ["aria-live", "polite", 1, "save-state"], [1, "numbered-section"], ["rows", "3", "name", "identification", 3, "ngModelChange", "readOnly", "ngModel"], ["aria-label", "Filter evidence for the final case", 1, "evidence-filters"], [1, "final-evidence-picker"], ["rows", "5", "name", "reasoning", 3, "ngModelChange", "readOnly", "ngModel"], ["rows", "4", "name", "counterevidence", 3, "ngModelChange", "readOnly", "ngModel"], ["rows", "4", "name", "recommendation", 3, "ngModelChange", "readOnly", "ngModel"], [1, "optional-grid"], ["rows", "3", "name", "uncertainty", 3, "ngModelChange", "readOnly", "ngModel"], [1, "range-label"], ["type", "range", "min", "0", "max", "100", "step", "5", "name", "finalConfidence", 3, "ngModelChange", "disabled", "ngModel"], ["rows", "3", "name", "reflection", 3, "ngModelChange", "readOnly", "ngModel"], ["rows", "3", "name", "contribution", 3, "ngModelChange", "readOnly", "ngModel"], [1, "final-check"], [1, "confirmation-backdrop"], ["type", "button", "aria-label", "Close evidence preview", 3, "click"], ["tabindex", "-1"], [1, "matrix-scroll"], ["scope", "col"], ["scope", "row"], ["type", "checkbox", 3, "change", "disabled", "checked"], ["role", "status"], ["type", "submit", 1, "submit", 3, "disabled"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "submit-confirm-title"], ["id", "submit-confirm-title"], ["type", "button", 1, "submit", 3, "click"]], template: function InvestigationFinalCaseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2);
      \u0275\u0275conditionalCreate(1, InvestigationFinalCaseComponent_Conditional_1_Template, 11, 1, "section", 3)(2, InvestigationFinalCaseComponent_Conditional_2_Template, 150, 53);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("read-only", ctx.readOnly());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime().finalSubmission.status === "submitted" ? 1 : 2);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RangeValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], styles: ['\n[_nghost-%COMP%], \n.final-workspace[_ngcontent-%COMP%] {\n  display: block;\n  min-height: 100%;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\n.final-workspace[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.final-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\nh2[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #f6fbff;\n  font-size: 1.35rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #e6bd5f;\n  font-size: 0.64rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.final-progress[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(16rem, 40%);\n  gap: 0.3rem;\n  color: #9eb4bf;\n  font-size: 0.65rem;\n}\n.final-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 0.35rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #1b2d38;\n}\n.final-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #6accc7,\n      #e3bd61);\n}\n.readiness[_ngcontent-%COMP%] {\n  margin-top: 0.8rem;\n  border: 1px solid #665d3c;\n  border-radius: 0.7rem;\n  padding: 0.7rem;\n  color: #dfd5b7;\n  background: rgba(68, 54, 25, 0.35);\n}\n.readiness.ready[_ngcontent-%COMP%] {\n  border-color: #3e716d;\n  color: #ceefeb;\n  background: rgba(28, 72, 68, 0.35);\n}\n.readiness[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.readiness[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid currentColor;\n  border-radius: 50%;\n}\n.readiness[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n}\n.readiness[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #aeb8b3;\n  font-size: 0.65rem;\n}\n.readiness[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0 2.4rem;\n  padding: 0;\n  color: #baad87;\n  font-size: 0.64rem;\n}\n.final-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(14rem, 0.75fr) minmax(25rem, 1.5fr);\n  gap: 0.75rem;\n  margin-top: 0.8rem;\n}\n.investigation-record[_ngcontent-%COMP%], \n.final-case[_ngcontent-%COMP%] {\n  border: 1px solid #304d60;\n  border-radius: 0.8rem;\n  background: rgba(7, 23, 34, 0.94);\n}\n.investigation-record[_ngcontent-%COMP%] {\n  align-self: start;\n  padding: 0.75rem;\n}\n.investigation-record[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.final-case[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  border-bottom: 1px solid rgba(106, 146, 166, 0.2);\n  padding-bottom: 0.6rem;\n}\n.investigation-record[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.final-case[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  color: #84cfcc;\n  font-size: 0.61rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.investigation-record[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #8edbd7;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.62rem;\n}\n.investigation-record[_ngcontent-%COMP%]    > section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.18rem;\n  border-bottom: 1px solid rgba(106, 146, 166, 0.14);\n  padding: 0.65rem 0;\n}\n.investigation-record[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9baa;\n  font-size: 0.59rem;\n  text-transform: uppercase;\n}\n.investigation-record[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e5eff4;\n  font-size: 0.76rem;\n}\n.investigation-record[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #9fb2bd;\n  font-size: 0.63rem;\n}\n.investigation-record[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0.18rem 0;\n  color: #c9dbe3;\n  text-align: left;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.65rem;\n}\n.evidence-preview[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 0.25rem;\n  margin-top: 0.7rem;\n  border: 1px solid #5a536e;\n  border-radius: 0.6rem;\n  padding: 0.7rem;\n  background: #191c31;\n}\n.evidence-preview[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.35rem;\n  right: 0.4rem;\n  border: 0;\n  color: #b9bad1;\n  background: transparent;\n  cursor: pointer;\n}\n.evidence-preview[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #9e91e2;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.evidence-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  padding-right: 1rem;\n  color: #eeeaff;\n  font-size: 0.72rem;\n}\n.evidence-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.evidence-preview[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a6afbd;\n  font-size: 0.62rem;\n  line-height: 1.4;\n}\n.final-case[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  padding: 0.8rem;\n}\n.final-case[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #f0f6f8;\n  font-size: 1rem;\n}\n.save-state[_ngcontent-%COMP%] {\n  color: #8ea8b5;\n  font-size: 0.61rem;\n}\n.numbered-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr);\n  gap: 0.2rem 0.55rem;\n  margin: 0;\n  border: 0;\n  border-top: 1px solid rgba(105, 147, 166, 0.16);\n  padding: 0.7rem 0 0;\n}\n.numbered-section[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  grid-row: 1/span 2;\n  place-items: center;\n  border: 1px solid #5e8792;\n  border-radius: 50%;\n  color: #bce9e6;\n  font-size: 0.65rem;\n  font-weight: 800;\n}\n.numbered-section[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-of-type {\n  display: grid;\n  gap: 0.1rem;\n}\n.numbered-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.numbered-section[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  color: #eaf3f6;\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.numbered-section[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #879eaa;\n  font-size: 0.61rem;\n}\n.numbered-section[_ngcontent-%COMP%]    > textarea[_ngcontent-%COMP%], \n.numbered-section[_ngcontent-%COMP%]    > .evidence-filters[_ngcontent-%COMP%], \n.numbered-section[_ngcontent-%COMP%]    > .final-evidence-picker[_ngcontent-%COMP%] {\n  grid-column: 2;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #304c5e;\n  border-radius: 0.5rem;\n  padding: 0.55rem;\n  color: #edf6f9;\n  background: #071923;\n  resize: vertical;\n}\n.evidence-filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.28rem;\n}\n.evidence-filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #314f60;\n  border-radius: 999px;\n  padding: 0.28rem 0.5rem;\n  color: #87a4b1;\n  background: #0a1e2b;\n  cursor: pointer;\n  font-size: 0.57rem;\n}\n.evidence-filters[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #6fcfca;\n  color: #e9ffff;\n  background: #17444b;\n}\n.final-evidence-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));\n  gap: 0.35rem;\n  max-height: 15rem;\n  overflow: auto;\n}\n.final-evidence-picker[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  margin: 0;\n  color: #809aa7;\n  font-size: 0.65rem;\n}\n.final-evidence-picker[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid #304a5b;\n  border-radius: 0.45rem;\n  padding: 0.42rem;\n  background: #0c2230;\n}\n.final-evidence-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n}\n.final-evidence-picker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font-size: 0.63rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.final-evidence-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7796a5;\n  font-size: 0.55rem;\n  text-transform: capitalize;\n}\n.final-evidence-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #83cecb;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.58rem;\n}\n.optional-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.55rem;\n  border-top: 1px solid rgba(105, 147, 166, 0.16);\n  padding-top: 0.7rem;\n}\n.optional-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.35rem;\n  color: #b8c8d0;\n  font-size: 0.67rem;\n}\n.range-label[_ngcontent-%COMP%] {\n  color: #8fa8b3;\n  font-size: 0.61rem;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #69c9c5;\n}\n.final-check[_ngcontent-%COMP%] {\n  border: 1px solid #654d4d;\n  border-radius: 0.6rem;\n  padding: 0.65rem;\n  color: #d3b7b7;\n  background: rgba(72, 34, 34, 0.25);\n}\n.final-check.complete[_ngcontent-%COMP%] {\n  border-color: #3e716d;\n  color: #c7e9e6;\n  background: rgba(28, 72, 68, 0.28);\n}\n.final-check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  font-size: 0.67rem;\n}\n.final-check[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.45rem 0 0;\n  padding-left: 1.1rem;\n  font-size: 0.61rem;\n}\n.final-case[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.45rem;\n}\n.final-case[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-right: auto;\n  color: #dfbd72;\n  font-size: 0.62rem;\n}\n.final-case[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.confirmation-backdrop[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.submission-success[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #3b596a;\n  border-radius: 0.5rem;\n  padding: 0.52rem 0.7rem;\n  color: #c7dce4;\n  background: #0e2634;\n  cursor: pointer;\n}\nbutton.submit[_ngcontent-%COMP%] {\n  border-color: #d4ae57;\n  color: #221b0b;\n  background: #e1bb62;\n  font-weight: 800;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.confirmation-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  background: rgba(2, 9, 15, 0.82);\n}\n.confirmation-backdrop[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  width: min(28rem, 100%);\n  border: 1px solid #5c6f7e;\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: #0b1d29;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.45);\n}\n.confirmation-backdrop[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  color: #f0f5f8;\n}\n.confirmation-backdrop[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  color: #9fb2bd;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.confirmation-backdrop[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  margin-top: 0.85rem;\n}\n.submission-success[_ngcontent-%COMP%] {\n  display: flex;\n  max-width: 42rem;\n  align-items: flex-start;\n  gap: 0.9rem;\n  margin: 3rem auto;\n  border: 1px solid #4a7772;\n  border-radius: 0.9rem;\n  padding: 1.25rem;\n  background: rgba(17, 56, 54, 0.42);\n}\n.submission-success[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.4rem;\n  height: 2.4rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08201f;\n  background: #79d4ce;\n  font-weight: 900;\n}\n.submission-success[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #82d5d0;\n  text-transform: uppercase;\n}\n.submission-success[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n}\n.submission-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  color: #a9c4c2;\n  font-size: 0.75rem;\n}\n.submission-success[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #8ae7e1;\n  outline-offset: 2px;\n}\n@media (max-width: 850px) {\n  .final-pair[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .investigation-record[_ngcontent-%COMP%] {\n    order: 2;\n  }\n}\n@media (max-width: 620px) {\n  .final-workspace[_ngcontent-%COMP%] {\n    padding: 0.7rem;\n  }\n  .final-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .final-progress[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .optional-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .numbered-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1.5rem minmax(0, 1fr);\n  }\n}\n.read-only[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #283c3b;\n  resize: vertical;\n  line-height: 1.65;\n}\n.matrix-scroll[_ngcontent-%COMP%] {\n  overflow: auto;\n  margin: 12px 0;\n}\ntable[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  font-size: 0.72rem;\n  min-width: 320px;\n}\ncaption[_ngcontent-%COMP%] {\n  text-align: left;\n  font-weight: 700;\n  padding: 8px 0;\n}\ntd[_ngcontent-%COMP%], \nth[_ngcontent-%COMP%] {\n  padding: 7px;\n  border: 1px solid #cdd7d4;\n  text-align: left;\n}\nth[_ngcontent-%COMP%] {\n  background: #edf2ed;\n}\n.evidence-preview[_ngcontent-%COMP%]   [tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 2px solid #967343;\n  outline-offset: 3px;\n}\n.final-workspace.read-only[_ngcontent-%COMP%] {\n  background: #10252e;\n  padding: 24px;\n  border-radius: 12px;\n}\n.read-only[_ngcontent-%COMP%]   .readiness[_ngcontent-%COMP%] {\n  background: #234743;\n}\n.read-only[_ngcontent-%COMP%]   .final-progress[_ngcontent-%COMP%] {\n  color: #b6cbd0;\n}\n@media (max-width: 680px) {\n  .final-workspace.read-only[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .read-only[_ngcontent-%COMP%]   .final-pair[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .read-only[_ngcontent-%COMP%]   .final-evidence-picker[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .read-only[_ngcontent-%COMP%]   .optional-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=final-investigation.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationFinalCaseComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-final-case", imports: [FormsModule], template: `<section [class.read-only]="readOnly()" class="final-workspace" aria-labelledby="final-case-title">
  @if (runtime().finalSubmission.status === 'submitted') {
    <section class="submission-success" aria-live="polite">
      <span aria-hidden="true">\u2713</span>
      <div>
        <small>Final investigation submitted</small>
        <h2>Your case has been recorded.</h2>
        <p>The official case reveal will be released by your teacher.</p>
        @if (!readOnly()) {
          <button type="button" (click)="caseBoardRequested.emit()">Review Case Board</button>
        }
      </div>
    </section>
  } @else {
    <header class="final-header">
      <div>
        <span class="eyebrow">{{
          readOnly()
              ? 'Completed investigation \xB7 Fictional sample'
            : 'Build from the work you already created'
        }}</span>
        <h2 id="final-case-title">Final Investigation</h2>
      </div>
      <div class="final-progress">
        <span>{{ completedSections() }} of 5 required sections complete</span>
        <i><span [style.width.%]="completedSections() * 20"></span></i>
      </div>
    </header>

    <section class="readiness" [class.ready]="ready()">
      <div>
        <span aria-hidden="true">{{ ready() ? '\u2713' : '\u25C7' }}</span>
        <div>
          <strong>{{
            readOnly()
              ? 'Case file complete \xB7 Evidence available to inspect'
              : ready()
                ? 'Final case is ready to build'
                : 'Final readiness check'
          }}</strong>
          <p>
            {{
              readOnly()
                ? 'Open the clues to see how the completed identification was supported.'
                : ready()
                  ? 'You can still return to the Case Board before submitting.'
                  : 'You may draft now, but finish the investigation record before submitting.'
            }}
          </p>
        </div>
      </div>
      @if (!ready()) {
        <ul>
          @for (item of missingReadiness(); track item) {
            <li>{{ item }}</li>
          }
        </ul>
      }
    </section>

    <div class="final-pair">
      <aside class="investigation-record" aria-label="Investigation record">
        <header>
          <span>Your investigation</span>
          @if (!readOnly()) {
            <button type="button" (click)="caseBoardRequested.emit()">Review Case Board</button>
          }
        </header>
        <section>
          <small>Current theory</small>
          <strong>{{ currentTheory()?.statement || 'No working theory saved yet' }}</strong>
          <span>Confidence {{ currentTheory()?.confidence ?? 0 }}%</span>
        </section>
        <section>
          <small>Evidence collected</small>
          <strong>{{ eligibleEvidence().length }}</strong>
          <span>{{ selectedEvidence().length }} selected for the final case</span>
        </section>
        <section>
          <small>Strongest support</small>
          @for (item of strongestSupport(); track item.id) {
            <button type="button" (click)="previewEvidenceRecord(item.id)">
              {{ item.title }}
            </button>
          }
        </section>
        <section>
          <small>Biggest challenge</small>
          @for (item of biggestChallenges(); track item.id) {
            <button type="button" (click)="previewEvidenceRecord(item.id)">
              {{ item.title }}
            </button>
          }
        </section>

        @if (previewEvidence(); as preview) {
          <article class="evidence-preview">
            <button
              type="button"
              aria-label="Close evidence preview"
              (click)="previewEvidenceId.set(undefined)"
            >
              \xD7
            </button>
            <small>{{ preview.type }}</small>
            <strong #previewHeading tabindex="-1">{{ preview.title }}</strong>
            <p>{{ preview.summary }}</p>
            <span>Analysis: {{ preview.classification ?? 'not classified' }}</span>
            <p><small>Source</small> {{ preview.source }}</p>
            @if (preview.resultMatrix; as matrix) {
              <div class="matrix-scroll">
                <table>
                  <caption>
                    {{
                      matrix.title
                    }}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Sample</th>
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
                          <td>{{ cell ?? '\u2014' }}</td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
            @for (note of preview.notes; track note) {
              <p>{{ note }}</p>
            }
          </article>
        }
      </aside>

      <form class="final-case" (submit)="$event.preventDefault(); requestSubmit()">
        <header>
          <div>
            <span>Laboratory case report</span>
            <h3>Restored Shelf Case File</h3>
          </div>
          <span class="save-state" aria-live="polite">{{
            readOnly()
              ? 'Completed sample \xB7 Read only'
              : saveState() === 'saving'
                ? 'Saving\u2026'
                : saveState() === 'pending'
                  ? 'Pending sync'
                  : 'Saved on this device'
          }}</span>
        </header>

        <label class="numbered-section">
          <span>1</span>
          <div>
            <strong>Final identification</strong
            ><small>Identify the four vials and explain the shelf arrangement.</small>
          </div>
          <textarea
            [readOnly]="readOnly()"
            rows="3"
            [ngModel]="identification()"
            (ngModelChange)="updateText('identification', $event)"
            name="identification"
          ></textarea>
        </label>

        <fieldset class="numbered-section">
          <span>2</span>
          <div>
            <legend>Show your best clues</legend>
            <small>Select at least four existing evidence records.</small>
          </div>
          <nav class="evidence-filters" aria-label="Filter evidence for the final case">
            <button
              type="button"
              [class.active]="evidenceFilter() === 'all'"
              (click)="evidenceFilter.set('all')"
            >
              All
            </button>
            <button
              type="button"
              [class.active]="evidenceFilter() === 'supports'"
              (click)="evidenceFilter.set('supports')"
            >
              Supports
            </button>
            <button
              type="button"
              [class.active]="evidenceFilter() === 'contradicts'"
              (click)="evidenceFilter.set('contradicts')"
            >
              Challenges
            </button>
            <button
              type="button"
              [class.active]="evidenceFilter() === 'uncertain'"
              (click)="evidenceFilter.set('uncertain')"
            >
              Uncertain
            </button>
            <button
              type="button"
              [class.active]="evidenceFilter() === 'important'"
              (click)="evidenceFilter.set('important')"
            >
              Important
            </button>
            <button
              type="button"
              [class.active]="evidenceFilter() === 'studentCreated'"
              (click)="evidenceFilter.set('studentCreated')"
            >
              Created by me
            </button>
          </nav>
          <div class="final-evidence-picker">
            @for (item of filteredEvidence(); track item.id) {
              <label>
                <input
                  #finalEvidence
                  type="checkbox"
                  [disabled]="readOnly()"
                  [checked]="selectedEvidenceIds().includes(item.id)"
                  (change)="toggleEvidence(item.id, finalEvidence.checked)"
                />
                <span
                  ><strong>{{ item.title }}</strong
                  ><small>{{ item.classification ?? item.type }}</small></span
                >
                <button
                  type="button"
                  (click)="$event.stopPropagation(); previewEvidenceRecord(item.id)"
                >
                  Preview
                </button>
              </label>
            } @empty {
              <p>No collected evidence matches this filter.</p>
            }
          </div>
        </fieldset>

        <label class="numbered-section">
          <span>3</span>
          <div>
            <strong>Scientific reasoning</strong
            ><small>Why do these clues support your identification?</small>
          </div>
          <textarea
            [readOnly]="readOnly()"
            rows="5"
            [ngModel]="reasoning()"
            (ngModelChange)="updateText('reasoning', $event)"
            name="reasoning"
          ></textarea>
        </label>

        <label class="numbered-section">
          <span>4</span>
          <div>
            <strong>Counterevidence</strong
            ><small
              >Which clue is hardest to explain, and why is your conclusion still strongest?</small
            >
          </div>
          <textarea
            [readOnly]="readOnly()"
            rows="4"
            [ngModel]="counterevidence()"
            (ngModelChange)="updateText('counterevidence', $event)"
            name="counterevidence"
          ></textarea>
        </label>

        <label class="numbered-section">
          <span>5</span>
          <div>
            <strong>Shelf restoration recommendation</strong
            ><small>What should the lab do next, including safe handling?</small>
          </div>
          <textarea
            [readOnly]="readOnly()"
            rows="4"
            [ngModel]="recommendation()"
            (ngModelChange)="updateText('recommendation', $event)"
            name="recommendation"
          ></textarea>
        </label>

        <div class="optional-grid">
          <label
            ><strong>What remains uncertain?</strong
            ><textarea
              [readOnly]="readOnly()"
              rows="3"
              [ngModel]="uncertainty()"
              (ngModelChange)="updateText('uncertainty', $event)"
              name="uncertainty"
            ></textarea>
          </label>
          <label
            ><strong>How did your confidence change?</strong
            ><span class="range-label">Final confidence {{ confidence() }}%</span
            ><input
              type="range"
              [disabled]="readOnly()"
              min="0"
              max="100"
              step="5"
              [ngModel]="confidence()"
              (ngModelChange)="updateConfidence(+$event)"
              name="finalConfidence"
          /></label>
          <label
            ><strong>Individual reflection</strong
            ><textarea
              [readOnly]="readOnly()"
              rows="3"
              [ngModel]="reflection()"
              (ngModelChange)="updateText('reflection', $event)"
              name="reflection"
            ></textarea>
          </label>
          <label
            ><strong>Your contribution</strong
            ><textarea
              [readOnly]="readOnly()"
              rows="3"
              [ngModel]="individualContribution()"
              (ngModelChange)="updateText('individualContribution', $event)"
              name="contribution"
            ></textarea>
          </label>
        </div>

        <section class="final-check" [class.complete]="missingSections().length === 0">
          <div>
            <strong>Final check</strong
            ><span>{{
              missingSections().length === 0
                ? 'All required sections complete'
                : missingSections().length + ' items remaining'
            }}</span>
          </div>
          @if (missingSections().length > 0) {
            <ul>
              @for (item of missingSections(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }
        </section>

        @if (!readOnly()) {
          <footer>
            @if (!connectionAvailable()) {
              <p role="status">
                Connection required to submit. Your draft remains saved on this device.
              </p>
            }
            <button type="button" (click)="saveDraft()">Save draft</button>
            <button
              class="submit"
              type="submit"
              [disabled]="missingSections().length > 0 || !connectionAvailable()"
            >
              Submit final investigation
            </button>
          </footer>
        }
      </form>
    </div>

    @if (!readOnly() && confirmSubmit()) {
      <div class="confirmation-backdrop">
        <section role="alertdialog" aria-modal="true" aria-labelledby="submit-confirm-title">
          <span class="eyebrow">Authoritative submission</span>
          <h3 id="submit-confirm-title">Submit final investigation?</h3>
          <p>Your official case will be recorded. A teacher can return it for revision later.</p>
          <div>
            <button type="button" (click)="confirmSubmit.set(false)">Keep editing</button
            ><button
              class="submit"
              type="button"
              (click)="confirmSubmit.set(false); submitRequested.emit()"
            >
              Submit investigation
            </button>
          </div>
        </section>
      </div>
    }
  }
</section>
`, styles: ['/* src/app/templates/investigation/ui/final-investigation.component.scss */\n:host,\n.final-workspace {\n  display: block;\n  min-height: 100%;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea {\n  font: inherit;\n}\n.final-workspace {\n  padding: 1rem;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\n.final-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\nh2 {\n  margin-top: 0.12rem;\n  color: #f6fbff;\n  font-size: 1.35rem;\n}\n.eyebrow {\n  color: #e6bd5f;\n  font-size: 0.64rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.final-progress {\n  display: grid;\n  width: min(16rem, 40%);\n  gap: 0.3rem;\n  color: #9eb4bf;\n  font-size: 0.65rem;\n}\n.final-progress i {\n  height: 0.35rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #1b2d38;\n}\n.final-progress i span {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #6accc7,\n      #e3bd61);\n}\n.readiness {\n  margin-top: 0.8rem;\n  border: 1px solid #665d3c;\n  border-radius: 0.7rem;\n  padding: 0.7rem;\n  color: #dfd5b7;\n  background: rgba(68, 54, 25, 0.35);\n}\n.readiness.ready {\n  border-color: #3e716d;\n  color: #ceefeb;\n  background: rgba(28, 72, 68, 0.35);\n}\n.readiness > div {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.readiness > div > span {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid currentColor;\n  border-radius: 50%;\n}\n.readiness strong {\n  font-size: 0.78rem;\n}\n.readiness p {\n  margin-top: 0.12rem;\n  color: #aeb8b3;\n  font-size: 0.65rem;\n}\n.readiness ul {\n  margin: 0.55rem 0 0 2.4rem;\n  padding: 0;\n  color: #baad87;\n  font-size: 0.64rem;\n}\n.final-pair {\n  display: grid;\n  grid-template-columns: minmax(14rem, 0.75fr) minmax(25rem, 1.5fr);\n  gap: 0.75rem;\n  margin-top: 0.8rem;\n}\n.investigation-record,\n.final-case {\n  border: 1px solid #304d60;\n  border-radius: 0.8rem;\n  background: rgba(7, 23, 34, 0.94);\n}\n.investigation-record {\n  align-self: start;\n  padding: 0.75rem;\n}\n.investigation-record > header,\n.final-case > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  border-bottom: 1px solid rgba(106, 146, 166, 0.2);\n  padding-bottom: 0.6rem;\n}\n.investigation-record > header > span,\n.final-case > header span:first-child {\n  color: #84cfcc;\n  font-size: 0.61rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.investigation-record > header button {\n  border: 0;\n  color: #8edbd7;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.62rem;\n}\n.investigation-record > section {\n  display: grid;\n  gap: 0.18rem;\n  border-bottom: 1px solid rgba(106, 146, 166, 0.14);\n  padding: 0.65rem 0;\n}\n.investigation-record section small {\n  color: #7f9baa;\n  font-size: 0.59rem;\n  text-transform: uppercase;\n}\n.investigation-record section strong {\n  color: #e5eff4;\n  font-size: 0.76rem;\n}\n.investigation-record section span {\n  color: #9fb2bd;\n  font-size: 0.63rem;\n}\n.investigation-record section button {\n  border: 0;\n  padding: 0.18rem 0;\n  color: #c9dbe3;\n  text-align: left;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.65rem;\n}\n.evidence-preview {\n  position: relative;\n  display: grid;\n  gap: 0.25rem;\n  margin-top: 0.7rem;\n  border: 1px solid #5a536e;\n  border-radius: 0.6rem;\n  padding: 0.7rem;\n  background: #191c31;\n}\n.evidence-preview > button {\n  position: absolute;\n  top: 0.35rem;\n  right: 0.4rem;\n  border: 0;\n  color: #b9bad1;\n  background: transparent;\n  cursor: pointer;\n}\n.evidence-preview small {\n  color: #9e91e2;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.evidence-preview strong {\n  padding-right: 1rem;\n  color: #eeeaff;\n  font-size: 0.72rem;\n}\n.evidence-preview p,\n.evidence-preview span {\n  color: #a6afbd;\n  font-size: 0.62rem;\n  line-height: 1.4;\n}\n.final-case {\n  display: grid;\n  gap: 0.7rem;\n  padding: 0.8rem;\n}\n.final-case h3 {\n  margin-top: 0.12rem;\n  color: #f0f6f8;\n  font-size: 1rem;\n}\n.save-state {\n  color: #8ea8b5;\n  font-size: 0.61rem;\n}\n.numbered-section {\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr);\n  gap: 0.2rem 0.55rem;\n  margin: 0;\n  border: 0;\n  border-top: 1px solid rgba(105, 147, 166, 0.16);\n  padding: 0.7rem 0 0;\n}\n.numbered-section > span {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  grid-row: 1/span 2;\n  place-items: center;\n  border: 1px solid #5e8792;\n  border-radius: 50%;\n  color: #bce9e6;\n  font-size: 0.65rem;\n  font-weight: 800;\n}\n.numbered-section > div:first-of-type {\n  display: grid;\n  gap: 0.1rem;\n}\n.numbered-section strong,\n.numbered-section legend {\n  color: #eaf3f6;\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.numbered-section small {\n  color: #879eaa;\n  font-size: 0.61rem;\n}\n.numbered-section > textarea,\n.numbered-section > .evidence-filters,\n.numbered-section > .final-evidence-picker {\n  grid-column: 2;\n}\ntextarea {\n  width: 100%;\n  border: 1px solid #304c5e;\n  border-radius: 0.5rem;\n  padding: 0.55rem;\n  color: #edf6f9;\n  background: #071923;\n  resize: vertical;\n}\n.evidence-filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.28rem;\n}\n.evidence-filters button {\n  border: 1px solid #314f60;\n  border-radius: 999px;\n  padding: 0.28rem 0.5rem;\n  color: #87a4b1;\n  background: #0a1e2b;\n  cursor: pointer;\n  font-size: 0.57rem;\n}\n.evidence-filters button.active {\n  border-color: #6fcfca;\n  color: #e9ffff;\n  background: #17444b;\n}\n.final-evidence-picker {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));\n  gap: 0.35rem;\n  max-height: 15rem;\n  overflow: auto;\n}\n.final-evidence-picker > p {\n  grid-column: 1/-1;\n  margin: 0;\n  color: #809aa7;\n  font-size: 0.65rem;\n}\n.final-evidence-picker > label {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid #304a5b;\n  border-radius: 0.45rem;\n  padding: 0.42rem;\n  background: #0c2230;\n}\n.final-evidence-picker label > span {\n  display: grid;\n  min-width: 0;\n}\n.final-evidence-picker strong {\n  overflow: hidden;\n  font-size: 0.63rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.final-evidence-picker small {\n  color: #7796a5;\n  font-size: 0.55rem;\n  text-transform: capitalize;\n}\n.final-evidence-picker button {\n  border: 0;\n  color: #83cecb;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.58rem;\n}\n.optional-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.55rem;\n  border-top: 1px solid rgba(105, 147, 166, 0.16);\n  padding-top: 0.7rem;\n}\n.optional-grid label {\n  display: grid;\n  align-content: start;\n  gap: 0.35rem;\n  color: #b8c8d0;\n  font-size: 0.67rem;\n}\n.range-label {\n  color: #8fa8b3;\n  font-size: 0.61rem;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: #69c9c5;\n}\n.final-check {\n  border: 1px solid #654d4d;\n  border-radius: 0.6rem;\n  padding: 0.65rem;\n  color: #d3b7b7;\n  background: rgba(72, 34, 34, 0.25);\n}\n.final-check.complete {\n  border-color: #3e716d;\n  color: #c7e9e6;\n  background: rgba(28, 72, 68, 0.28);\n}\n.final-check > div {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  font-size: 0.67rem;\n}\n.final-check ul {\n  margin: 0.45rem 0 0;\n  padding-left: 1.1rem;\n  font-size: 0.61rem;\n}\n.final-case footer {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.45rem;\n}\n.final-case footer p {\n  margin-right: auto;\n  color: #dfbd72;\n  font-size: 0.62rem;\n}\n.final-case footer button,\n.confirmation-backdrop button,\n.submission-success button {\n  border: 1px solid #3b596a;\n  border-radius: 0.5rem;\n  padding: 0.52rem 0.7rem;\n  color: #c7dce4;\n  background: #0e2634;\n  cursor: pointer;\n}\nbutton.submit {\n  border-color: #d4ae57;\n  color: #221b0b;\n  background: #e1bb62;\n  font-weight: 800;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.confirmation-backdrop {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  background: rgba(2, 9, 15, 0.82);\n}\n.confirmation-backdrop section {\n  width: min(28rem, 100%);\n  border: 1px solid #5c6f7e;\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: #0b1d29;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.45);\n}\n.confirmation-backdrop h3 {\n  margin-top: 0.35rem;\n  color: #f0f5f8;\n}\n.confirmation-backdrop p {\n  margin-top: 0.4rem;\n  color: #9fb2bd;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.confirmation-backdrop section > div {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  margin-top: 0.85rem;\n}\n.submission-success {\n  display: flex;\n  max-width: 42rem;\n  align-items: flex-start;\n  gap: 0.9rem;\n  margin: 3rem auto;\n  border: 1px solid #4a7772;\n  border-radius: 0.9rem;\n  padding: 1.25rem;\n  background: rgba(17, 56, 54, 0.42);\n}\n.submission-success > span {\n  display: grid;\n  width: 2.4rem;\n  height: 2.4rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08201f;\n  background: #79d4ce;\n  font-weight: 900;\n}\n.submission-success small {\n  color: #82d5d0;\n  text-transform: uppercase;\n}\n.submission-success h2 {\n  margin-top: 0.2rem;\n}\n.submission-success p {\n  margin-top: 0.35rem;\n  color: #a9c4c2;\n  font-size: 0.75rem;\n}\n.submission-success button {\n  margin-top: 0.75rem;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible {\n  outline: 2px solid #8ae7e1;\n  outline-offset: 2px;\n}\n@media (max-width: 850px) {\n  .final-pair {\n    grid-template-columns: 1fr;\n  }\n  .investigation-record {\n    order: 2;\n  }\n}\n@media (max-width: 620px) {\n  .final-workspace {\n    padding: 0.7rem;\n  }\n  .final-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .final-progress {\n    width: 100%;\n  }\n  .optional-grid {\n    grid-template-columns: 1fr;\n  }\n  .numbered-section {\n    grid-template-columns: 1.5rem minmax(0, 1fr);\n  }\n}\n.read-only textarea {\n  background: #fff;\n  color: #283c3b;\n  resize: vertical;\n  line-height: 1.65;\n}\n.matrix-scroll {\n  overflow: auto;\n  margin: 12px 0;\n}\ntable {\n  border-collapse: collapse;\n  font-size: 0.72rem;\n  min-width: 320px;\n}\ncaption {\n  text-align: left;\n  font-weight: 700;\n  padding: 8px 0;\n}\ntd,\nth {\n  padding: 7px;\n  border: 1px solid #cdd7d4;\n  text-align: left;\n}\nth {\n  background: #edf2ed;\n}\n.evidence-preview [tabindex="-1"]:focus {\n  outline: 2px solid #967343;\n  outline-offset: 3px;\n}\n.final-workspace.read-only {\n  background: #10252e;\n  padding: 24px;\n  border-radius: 12px;\n}\n.read-only .readiness {\n  background: #234743;\n}\n.read-only .final-progress {\n  color: #b6cbd0;\n}\n@media (max-width: 680px) {\n  .final-workspace.read-only {\n    padding: 14px;\n  }\n  .read-only .final-pair {\n    grid-template-columns: 1fr;\n  }\n  .read-only .final-evidence-picker {\n    grid-template-columns: 1fr;\n  }\n  .read-only .optional-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=final-investigation.component.css.map */\n'] }]
  }], () => [], { runtime: [{ type: Input, args: [{ isSignal: true, alias: "runtime", required: true }] }], evidence: [{ type: Input, args: [{ isSignal: true, alias: "evidence", required: true }] }], ready: [{ type: Input, args: [{ isSignal: true, alias: "ready", required: false }] }], readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], previewHeading: [{ type: ViewChild, args: ["previewHeading", { isSignal: true }] }], missingReadiness: [{ type: Input, args: [{ isSignal: true, alias: "missingReadiness", required: false }] }], saveState: [{ type: Input, args: [{ isSignal: true, alias: "saveState", required: false }] }], caseBoardRequested: [{ type: Output, args: ["caseBoardRequested"] }], evidencePreviewRequested: [{ type: Output, args: ["evidencePreviewRequested"] }], draftSaved: [{ type: Output, args: ["draftSaved"] }], submitRequested: [{ type: Output, args: ["submitRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationFinalCaseComponent, { className: "InvestigationFinalCaseComponent", filePath: "src/app/templates/investigation/ui/final-investigation.component.ts", lineNumber: 27 });
})();

export {
  InvestigationFinalCaseComponent
};
//# debugId=1fb7c9c6-548e-518c-baad-6b7817808b1b
//# sourceMappingURL=chunk-KTMTM7KE.js.map
