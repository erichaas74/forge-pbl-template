import {
  INVESTIGATION_RUNTIME_FACADE
} from "./chunk-D7TSZHFD.js";
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
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  NgTemplateOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Input,
  Output,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/investigation/ui/case-board.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.definition.id;
function InvestigationCaseBoardComponent_For_2_For_8_Conditional_7_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r5 = ctx.$implicit;
    \u0275\u0275domProperty("value", target_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r5.id);
  }
}
function InvestigationCaseBoardComponent_For_2_For_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label", 5);
    \u0275\u0275text(1, " Move ");
    \u0275\u0275domElementStart(2, "select", 6);
    \u0275\u0275domListener("change", function InvestigationCaseBoardComponent_For_2_For_8_Conditional_7_Template_select_change_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const item_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.move(item_r2.definition.id, $event));
    });
    \u0275\u0275domElementStart(3, "option", 7);
    \u0275\u0275text(4, "Choose section");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(5, InvestigationCaseBoardComponent_For_2_For_8_Conditional_7_For_6_Template, 2, 2, "option", 8, _forTrack0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.model().config.sections);
  }
}
function InvestigationCaseBoardComponent_For_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function InvestigationCaseBoardComponent_For_2_For_8_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.itemSelected.emit(item_r2.definition.id));
    });
    \u0275\u0275domElementStart(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(7, InvestigationCaseBoardComponent_For_2_For_8_Conditional_7_Template, 7, 0, "label", 5);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.definition.evidenceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.definition.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.runtime.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.model().permissions.canMoveItems ? 7 : -1);
  }
}
function InvestigationCaseBoardComponent_For_2_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("click", function InvestigationCaseBoardComponent_For_2_For_10_Template_button_click_0_listener() {
      const hypothesis_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.itemSelected.emit(hypothesis_r7.id));
    });
    \u0275\u0275domElementStart(1, "small");
    \u0275\u0275text(2, "Hypothesis");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const hypothesis_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(hypothesis_r7.label || hypothesis_r7.statement);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Confidence ", hypothesis_r7.confidence ?? 0, "%");
  }
}
function InvestigationCaseBoardComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 1)(1, "header")(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 2);
    \u0275\u0275repeaterCreate(7, InvestigationCaseBoardComponent_For_2_For_8_Template, 8, 4, null, null, _forTrack1);
    \u0275\u0275repeaterCreate(9, InvestigationCaseBoardComponent_For_2_For_10_Template, 7, 2, "button", 3, _forTrack0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const section_r8 = ctx.$implicit;
    \u0275\u0275attribute("data-section-type", section_r8.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r8.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", section_r8.evidence.length + section_r8.hypotheses.length, " items");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(section_r8.evidence);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(section_r8.hypotheses);
  }
}
var InvestigationCaseBoardComponent = class _InvestigationCaseBoardComponent {
  model = input.required(
    ...ngDevMode ? [{ debugName: "model" }] : (
      /* istanbul ignore next */
      []
    )
  );
  itemSelected = output();
  moveRequested = output();
  noteRequested = output();
  questionRequested = output();
  sections = computed(
    () => [...this.model().config.sections].sort((left, right) => left.order - right.order).map((section) => __spreadProps(__spreadValues({}, section), {
      evidence: this.model().evidence.filter((item) => this.model().runtimeState.itemLocations[item.definition.id] === section.id),
      hypotheses: this.model().hypotheses.filter((item) => this.model().runtimeState.itemLocations[item.id] === section.id)
    })),
    ...ngDevMode ? [{ debugName: "sections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  move(itemId, event) {
    const sectionId = event.target.value;
    if (sectionId.length > 0)
      this.moveRequested.emit({ itemId, sectionId });
  }
  static \u0275fac = function InvestigationCaseBoardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationCaseBoardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationCaseBoardComponent, selectors: [["app-investigation-case-board"]], inputs: { model: [1, "model"] }, outputs: { itemSelected: "itemSelected", moveRequested: "moveRequested", noteRequested: "noteRequested", questionRequested: "questionRequested" }, decls: 3, vars: 2, consts: [[1, "case-board"], [1, "board-section"], [1, "board-items"], ["type", "button", 1, "board-card", "hypothesis"], ["type", "button", 1, "board-card", 3, "click"], [1, "move-control"], [3, "change"], ["value", ""], [3, "value"], ["type", "button", 1, "board-card", "hypothesis", 3, "click"]], template: function InvestigationCaseBoardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275repeaterCreate(1, InvestigationCaseBoardComponent_For_2_Template, 11, 3, "article", 1, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap("case-board layout-" + ctx.model().config.layoutMode);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.sections());
    }
  }, styles: ["\n.case-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}\n.board-section[_ngcontent-%COMP%] {\n  min-height: 12rem;\n  padding: 1rem;\n  border: 1px solid #c8c0b1;\n  border-radius: 0.75rem;\n  background: #f8f5ee;\n}\n.board-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.move-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.board-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.board-items[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 0.85rem;\n}\n.board-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  width: 100%;\n  padding: 0.75rem;\n  text-align: left;\n  border: 1px solid #d8cdbd;\n  border-radius: 0.55rem;\n  background: white;\n}\n/*# sourceMappingURL=case-board.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationCaseBoardComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-case-board", template: `<section class="case-board" [class]="'case-board layout-' + model().config.layoutMode">
  @for (section of sections(); track section.id) {
    <article class="board-section" [attr.data-section-type]="section.type">
      <header>
        <h3>{{ section.id }}</h3>
        <span>{{ section.evidence.length + section.hypotheses.length }} items</span>
      </header>
      <div class="board-items">
        @for (item of section.evidence; track item.definition.id) {
          <button type="button" class="board-card" (click)="itemSelected.emit(item.definition.id)">
            <small>{{ item.definition.evidenceType }}</small>
            <strong>{{ item.definition.title }}</strong>
            <span>{{ item.runtime.status }}</span>
          </button>
          @if (model().permissions.canMoveItems) {
            <label class="move-control">
              Move
              <select (change)="move(item.definition.id, $event)">
                <option value="">Choose section</option>
                @for (target of model().config.sections; track target.id) {
                  <option [value]="target.id">{{ target.id }}</option>
                }
              </select>
            </label>
          }
        }
        @for (hypothesis of section.hypotheses; track hypothesis.id) {
          <button type="button" class="board-card hypothesis" (click)="itemSelected.emit(hypothesis.id)">
            <small>Hypothesis</small>
            <strong>{{ hypothesis.label || hypothesis.statement }}</strong>
            <span>Confidence {{ hypothesis.confidence ?? 0 }}%</span>
          </button>
        }
      </div>
    </article>
  }
</section>
`, styles: ["/* src/app/templates/investigation/ui/case-board.component.scss */\n.case-board {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}\n.board-section {\n  min-height: 12rem;\n  padding: 1rem;\n  border: 1px solid #c8c0b1;\n  border-radius: 0.75rem;\n  background: #f8f5ee;\n}\n.board-section > header,\n.move-control {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.board-section h3 {\n  margin: 0;\n}\n.board-items {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 0.85rem;\n}\n.board-card {\n  display: grid;\n  gap: 0.3rem;\n  width: 100%;\n  padding: 0.75rem;\n  text-align: left;\n  border: 1px solid #d8cdbd;\n  border-radius: 0.55rem;\n  background: white;\n}\n/*# sourceMappingURL=case-board.component.css.map */\n"] }]
  }], null, { model: [{ type: Input, args: [{ isSignal: true, alias: "model", required: true }] }], itemSelected: [{ type: Output, args: ["itemSelected"] }], moveRequested: [{ type: Output, args: ["moveRequested"] }], noteRequested: [{ type: Output, args: ["noteRequested"] }], questionRequested: [{ type: Output, args: ["questionRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationCaseBoardComponent, { className: "InvestigationCaseBoardComponent", filePath: "src/app/templates/investigation/ui/case-board.component.ts", lineNumber: 15 });
})();

// src/app/templates/investigation/ui/final-section-host.component.ts
var _c0 = (a0) => ({ sectionId: a0 });
var _forTrack02 = ($index, $item) => $item.id;
function InvestigationFinalSectionHostComponent_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InvestigationFinalSectionHostComponent_For_2_Case_8_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const section_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275nextContext();
    const evidenceOptions_r3 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", evidenceOptions_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, section_r2.id));
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_9_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InvestigationFinalSectionHostComponent_For_2_Case_9_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const section_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275nextContext();
    const evidenceOptions_r3 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", evidenceOptions_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, section_r2.id));
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 8);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalSectionHostComponent_For_2_Case_10_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const section_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.update(section_r2.id, +$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Confidence ", ctx_r4.numberValue(section_r2.id), "% ");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r4.numberValue(section_r2.id))("name", section_r2.id);
    \u0275\u0275control();
  }
}
function InvestigationFinalSectionHostComponent_For_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 9);
    \u0275\u0275listener("ngModelChange", function InvestigationFinalSectionHostComponent_For_2_Case_11_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const section_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.update(section_r2.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const section_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngModel", ctx_r4.textValue(section_r2.id))("name", section_r2.id);
    \u0275\u0275control();
  }
}
function InvestigationFinalSectionHostComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, InvestigationFinalSectionHostComponent_For_2_Conditional_7_Template, 2, 0, "small");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, InvestigationFinalSectionHostComponent_For_2_Case_8_Template, 1, 4, "ng-container")(9, InvestigationFinalSectionHostComponent_For_2_Case_9_Template, 1, 4, "ng-container")(10, InvestigationFinalSectionHostComponent_For_2_Case_10_Template, 3, 3, "label")(11, InvestigationFinalSectionHostComponent_For_2_Case_11_Template, 1, 2, "textarea", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const section_r2 = ctx.$implicit;
    const \u0275$index_3_r7 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("missing", ctx_r4.missingSectionIds().includes(section_r2.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_3_r7 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r2.prompt || section_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(section_r2.required ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = section_r2.type) === "evidence" ? 8 : tmp_16_0 === "evidence-selection" ? 9 : tmp_16_0 === "confidence" ? 10 : 11);
  }
}
function InvestigationFinalSectionHostComponent_ng_template_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 11, 1);
    \u0275\u0275listener("change", function InvestigationFinalSectionHostComponent_ng_template_5_For_2_Template_input_change_1_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const choice_r10 = \u0275\u0275reference(2);
      const sectionId_r11 = \u0275\u0275nextContext().sectionId;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleEvidence(sectionId_r11, item_r9.id, choice_r10.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const sectionId_r11 = \u0275\u0275nextContext().sectionId;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r4.evidenceIds(sectionId_r11).includes(item_r9.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.title);
  }
}
function InvestigationFinalSectionHostComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, InvestigationFinalSectionHostComponent_ng_template_5_For_2_Template, 5, 2, "label", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.evidence());
  }
}
var InvestigationFinalSectionHostComponent = class _InvestigationFinalSectionHostComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = input(
    {},
    ...ngDevMode ? [{ debugName: "draft" }] : (
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
  draftChanged = output();
  submitRequested = output();
  values = signal(
    {},
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  orderedSections = computed(
    () => [...this.definition().sections],
    ...ngDevMode ? [{ debugName: "orderedSections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  missingSectionIds = computed(
    () => this.orderedSections().filter((section) => section.required).filter((section) => !this.sectionComplete(section.id, section.type, section.minEvidenceCount)).map((section) => section.id),
    ...ngDevMode ? [{ debugName: "missingSectionIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => this.values.set(structuredClone(this.draft())));
  }
  textValue(sectionId) {
    const value = this.values()[sectionId];
    return typeof value === "string" ? value : "";
  }
  numberValue(sectionId) {
    const value = this.values()[sectionId];
    return typeof value === "number" ? value : 50;
  }
  evidenceIds(sectionId) {
    const value = this.values()[sectionId];
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  }
  update(sectionId, value) {
    this.values.update((current) => __spreadProps(__spreadValues({}, current), { [sectionId]: value }));
    this.draftChanged.emit(Object.freeze(__spreadValues({}, this.values())));
  }
  toggleEvidence(sectionId, evidenceId, selected) {
    const current = this.evidenceIds(sectionId);
    this.update(sectionId, selected ? [.../* @__PURE__ */ new Set([...current, evidenceId])] : current.filter((id) => id !== evidenceId));
  }
  submit() {
    if (this.missingSectionIds().length === 0) {
      this.submitRequested.emit(Object.freeze(__spreadValues({}, this.values())));
    }
  }
  sectionComplete(sectionId, type, minimum = 1) {
    const value = this.values()[sectionId];
    if (type === "evidence" || type === "evidence-selection") {
      return Array.isArray(value) && value.length >= minimum;
    }
    if (typeof value === "string")
      return value.trim().length > 0;
    if (typeof value === "number")
      return Number.isFinite(value);
    return value !== void 0 && value !== null;
  }
  static \u0275fac = function InvestigationFinalSectionHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationFinalSectionHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationFinalSectionHostComponent, selectors: [["app-investigation-final-section-host"]], inputs: { definition: [1, "definition"], draft: [1, "draft"], evidence: [1, "evidence"] }, outputs: { draftChanged: "draftChanged", submitRequested: "submitRequested" }, decls: 7, vars: 1, consts: [["evidenceOptions", ""], ["choice", ""], [1, "final-section-host", 3, "submit"], [1, "final-section", 3, "missing"], ["type", "submit", 3, "disabled"], [1, "final-section"], ["rows", "4", 3, "ngModel", "name"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "range", "min", "0", "max", "100", 3, "ngModelChange", "ngModel", "name"], ["rows", "4", 3, "ngModelChange", "ngModel", "name"], [1, "evidence-options"], ["type", "checkbox", 3, "change", "checked"]], template: function InvestigationFinalSectionHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "form", 2);
      \u0275\u0275listener("submit", function InvestigationFinalSectionHostComponent_Template_form_submit_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.preventDefault();
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275repeaterCreate(1, InvestigationFinalSectionHostComponent_For_2_Template, 12, 6, "section", 3, _forTrack02);
      \u0275\u0275elementStart(3, "button", 4);
      \u0275\u0275text(4, "Submit");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(5, InvestigationFinalSectionHostComponent_ng_template_5_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.orderedSections());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.missingSectionIds().length > 0);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RangeValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, NgTemplateOutlet], styles: ["\n.final-section-host[_ngcontent-%COMP%], \n.final-section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.final-section[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid #cbc2b3;\n  border-radius: 0.75rem;\n  background: #fffdf8;\n}\n.final-section.missing[_ngcontent-%COMP%] {\n  border-color: #a86148;\n}\n.final-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.evidence-options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.final-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.evidence-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n/*# sourceMappingURL=final-section-host.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationFinalSectionHostComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-final-section-host", imports: [FormsModule, NgTemplateOutlet], template: `<form class="final-section-host" (submit)="$event.preventDefault(); submit()">
  @for (section of orderedSections(); track section.id; let number = $index) {
    <section class="final-section" [class.missing]="missingSectionIds().includes(section.id)">
      <header>
        <span>{{ number + 1 }}</span>
        <div>
          <h3>{{ section.prompt || section.id }}</h3>
          @if (section.required) { <small>Required</small> }
        </div>
      </header>
      @switch (section.type) {
        @case ('evidence') {
          <ng-container *ngTemplateOutlet="evidenceOptions; context: { sectionId: section.id }" />
        }
        @case ('evidence-selection') {
          <ng-container *ngTemplateOutlet="evidenceOptions; context: { sectionId: section.id }" />
        }
        @case ('confidence') {
          <label>
            Confidence {{ numberValue(section.id) }}%
            <input type="range" min="0" max="100" [ngModel]="numberValue(section.id)"
              (ngModelChange)="update(section.id, +$event)" [name]="section.id" />
          </label>
        }
        @default {
          <textarea rows="4" [ngModel]="textValue(section.id)"
            (ngModelChange)="update(section.id, $event)" [name]="section.id"></textarea>
        }
      }
    </section>
  }
  <button type="submit" [disabled]="missingSectionIds().length > 0">Submit</button>
</form>

<ng-template #evidenceOptions let-sectionId="sectionId">
  <div class="evidence-options">
    @for (item of evidence(); track item.id) {
      <label>
        <input #choice type="checkbox" [checked]="evidenceIds(sectionId).includes(item.id)"
          (change)="toggleEvidence(sectionId, item.id, choice.checked)" />
        <span>{{ item.title }}</span>
      </label>
    }
  </div>
</ng-template>
`, styles: ["/* src/app/templates/investigation/ui/final-section-host.component.scss */\n.final-section-host,\n.final-section {\n  display: grid;\n  gap: 1rem;\n}\n.final-section {\n  padding: 1rem;\n  border: 1px solid #cbc2b3;\n  border-radius: 0.75rem;\n  background: #fffdf8;\n}\n.final-section.missing {\n  border-color: #a86148;\n}\n.final-section > header,\n.evidence-options label {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.final-section h3 {\n  margin: 0;\n}\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n}\n.evidence-options {\n  display: grid;\n  gap: 0.5rem;\n}\n/*# sourceMappingURL=final-section-host.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], draft: [{ type: Input, args: [{ isSignal: true, alias: "draft", required: false }] }], evidence: [{ type: Input, args: [{ isSignal: true, alias: "evidence", required: false }] }], draftChanged: [{ type: Output, args: ["draftChanged"] }], submitRequested: [{ type: Output, args: ["submitRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationFinalSectionHostComponent, { className: "InvestigationFinalSectionHostComponent", filePath: "src/app/templates/investigation/ui/final-section-host.component.ts", lineNumber: 19 });
})();

// src/app/templates/investigation/ui/investigation-shell.component.ts
var _c02 = () => [];
var _c1 = () => ({});
var _forTrack03 = ($index, $item) => $item.code + $item.entityId;
var _forTrack12 = ($index, $item) => $item.id;
function InvestigationShellComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "Loading and validating the project package\u2026");
    \u0275\u0275elementEnd();
  }
}
function InvestigationShellComponent_Conditional_10_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(issue_r1.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", issue_r1.message);
  }
}
function InvestigationShellComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 3)(1, "h2");
    \u0275\u0275text(2, "The project package could not be opened");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, InvestigationShellComponent_Conditional_10_For_4_Template, 4, 2, "p", null, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.runtime.issues());
  }
}
function InvestigationShellComponent_Conditional_11_For_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function InvestigationShellComponent_Conditional_11_For_2_For_8_Template_button_click_0_listener() {
      const activityId_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.dispatch("activity.completed", activityId_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const activityId_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Complete ", ctx_r1.runtime.graph()?.activitiesById?.get(activityId_r4)?.title || activityId_r4, " ");
  }
}
function InvestigationShellComponent_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, InvestigationShellComponent_Conditional_11_For_2_For_8_Template, 2, 1, "button", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const phase_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r5.order);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r5.title || phase_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r5.description);
    \u0275\u0275advance();
    \u0275\u0275repeater(phase_r5.activityIds ?? \u0275\u0275pureFunction0(3, _c02));
  }
}
function InvestigationShellComponent_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h2");
    \u0275\u0275text(2, "Case board");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-investigation-case-board", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("model", ctx);
  }
}
function InvestigationShellComponent_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-investigation-final-section-host", 8);
    \u0275\u0275listener("draftChanged", function InvestigationShellComponent_Conditional_11_Conditional_4_Template_app_investigation_final_section_host_draftChanged_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveFinalDraft($event));
    })("submitRequested", function InvestigationShellComponent_Conditional_11_Conditional_4_Template_app_investigation_final_section_host_submitRequested_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitFinal($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const graph_r7 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(graph_r7.finalSubmission.title || "Final submission");
    \u0275\u0275advance();
    \u0275\u0275property("definition", graph_r7.finalSubmission)("draft", ctx_r1.runtime.snapshot()?.finalSubmission?.argumentDraft ?? \u0275\u0275pureFunction0(4, _c1))("evidence", ctx_r1.evidence());
  }
}
function InvestigationShellComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 4);
    \u0275\u0275repeaterCreate(1, InvestigationShellComponent_Conditional_11_For_2_Template, 9, 4, "article", null, _forTrack12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, InvestigationShellComponent_Conditional_11_Conditional_3_Template, 4, 1, "section");
    \u0275\u0275conditionalCreate(4, InvestigationShellComponent_Conditional_11_Conditional_4_Template, 4, 5, "section");
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.phases());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.boardModel()) ? 3 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.runtime.graph()) ? 4 : -1, tmp_3_0);
  }
}
var InvestigationShellComponent = class _InvestigationShellComponent {
  runtime = inject(INVESTIGATION_RUNTIME_FACADE);
  phases = computed(
    () => [...this.runtime.graph()?.investigation.phases ?? []].sort((left, right) => left.order - right.order),
    ...ngDevMode ? [{ debugName: "phases" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = computed(
    () => {
      const graph = this.runtime.graph();
      const snapshot = this.runtime.snapshot();
      if (graph === void 0 || snapshot === void 0)
        return [];
      return [...graph.evidenceById.values()].map((definition) => ({
        id: definition.id,
        title: definition.title ?? definition.id,
        type: definition.evidenceType,
        summary: definition.description ?? definition.content.text ?? "",
        source: definition.content.source?.citation ?? definition.content.source?.name ?? "",
        status: snapshot.evidence[definition.id]?.status ?? definition.availability.initialState,
        classification: asClassification(snapshot.evidence[definition.id]?.classification),
        notes: snapshot.evidence[definition.id]?.notes ?? [],
        important: snapshot.evidence[definition.id]?.important ?? false,
        studentCreated: false
      }));
    },
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  boardModel = computed(
    () => {
      const graph = this.runtime.graph();
      const snapshot = this.runtime.snapshot();
      if (graph === void 0 || snapshot === void 0)
        return void 0;
      return {
        config: graph.caseBoard,
        runtimeState: snapshot.board,
        evidence: [...graph.evidenceById.values()].map((definition) => ({
          definition,
          runtime: snapshot.evidence[definition.id]
        })),
        hypotheses: snapshot.hypotheses,
        permissions: {
          canMoveItems: graph.caseBoard.interactions.dragDrop,
          canReorderItems: graph.caseBoard.interactions.reorder,
          canCreateNotes: graph.caseBoard.interactions.annotate,
          canCreateQuestions: graph.caseBoard.interactions.createStudentEvidence
        }
      };
    },
    ...ngDevMode ? [{ debugName: "boardModel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    void this.runtime.initialize();
  }
  saveFinalDraft(draft) {
    void this.runtime.dispatch("finalSubmission.draftUpdated", void 0, { draft });
  }
  async submitFinal(draft) {
    await this.runtime.dispatch("finalSubmission.draftUpdated", void 0, { draft });
    await this.runtime.dispatch("finalSubmission.submitted");
  }
  static \u0275fac = function InvestigationShellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvestigationShellComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvestigationShellComponent, selectors: [["app-investigation-shell"]], decls: 12, vars: 2, consts: [[1, "investigation-shell"], ["routerLink", "/projects"], ["aria-live", "polite"], ["role", "alert", 1, "issues"], ["aria-label", "Investigation phases", 1, "phase-list"], ["type", "button"], ["type", "button", 3, "click"], [3, "model"], [3, "draftChanged", "submitRequested", "definition", "draft", "evidence"]], template: function InvestigationShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "header")(2, "a", 1);
      \u0275\u0275text(3, "\u2190 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "span");
      \u0275\u0275text(6, "Investigation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h1");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(9, InvestigationShellComponent_Conditional_9_Template, 2, 0, "p", 2)(10, InvestigationShellComponent_Conditional_10_Template, 5, 0, "section", 3)(11, InvestigationShellComponent_Conditional_11_Template, 5, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.runtime.graph()?.manifest?.title || "Loading investigation\u2026");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.loading() ? 9 : !ctx.runtime.graph() ? 10 : 11);
    }
  }, dependencies: [RouterLink, InvestigationCaseBoardComponent, InvestigationFinalSectionHostComponent], styles: ["\n.investigation-shell[_ngcontent-%COMP%] {\n  max-width: 88rem;\n  margin: 0 auto;\n  padding: 1.5rem;\n  color: #17212b;\n}\n.investigation-shell[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.phase-list[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.investigation-shell[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.investigation-shell[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n}\n.phase-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.issues[_ngcontent-%COMP%] {\n  flex: 1 1 16rem;\n  padding: 1rem;\n  border: 1px solid #cbc2b3;\n  border-radius: 0.75rem;\n  background: #fffdf8;\n}\n.investigation-shell[_ngcontent-%COMP%]    > section[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n/*# sourceMappingURL=investigation-shell.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvestigationShellComponent, [{
    type: Component,
    args: [{ selector: "app-investigation-shell", imports: [RouterLink, InvestigationCaseBoardComponent, InvestigationFinalSectionHostComponent], template: `<main class="investigation-shell">
  <header>
    <a routerLink="/projects">\u2190 Projects</a>
    <div>
      <span>Investigation</span>
      <h1>{{ runtime.graph()?.manifest?.title || 'Loading investigation\u2026' }}</h1>
    </div>
  </header>

  @if (runtime.loading()) {
    <p aria-live="polite">Loading and validating the project package\u2026</p>
  } @else if (!runtime.graph()) {
    <section class="issues" role="alert">
      <h2>The project package could not be opened</h2>
      @for (issue of runtime.issues(); track issue.code + issue.entityId) {
        <p><strong>{{ issue.code }}</strong> {{ issue.message }}</p>
      }
    </section>
  } @else {
    <nav class="phase-list" aria-label="Investigation phases">
      @for (phase of phases(); track phase.id) {
        <article>
          <span>{{ phase.order }}</span>
          <h2>{{ phase.title || phase.id }}</h2>
          <p>{{ phase.description }}</p>
          @for (activityId of phase.activityIds ?? []; track activityId) {
            <button type="button" (click)="runtime.dispatch('activity.completed', activityId)">
              Complete {{ runtime.graph()?.activitiesById?.get(activityId)?.title || activityId }}
            </button>
          }
        </article>
      }
    </nav>

    @if (boardModel(); as model) {
      <section>
        <h2>Case board</h2>
        <app-investigation-case-board [model]="model" />
      </section>
    }

    @if (runtime.graph(); as graph) {
      <section>
        <h2>{{ graph.finalSubmission.title || 'Final submission' }}</h2>
        <app-investigation-final-section-host
          [definition]="graph.finalSubmission"
          [draft]="runtime.snapshot()?.finalSubmission?.argumentDraft ?? {}"
          [evidence]="evidence()"
          (draftChanged)="saveFinalDraft($event)"
          (submitRequested)="submitFinal($event)"
        />
      </section>
    }
  }
</main>
`, styles: ["/* src/app/templates/investigation/ui/investigation-shell.component.scss */\n.investigation-shell {\n  max-width: 88rem;\n  margin: 0 auto;\n  padding: 1.5rem;\n  color: #17212b;\n}\n.investigation-shell > header,\n.phase-list {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.investigation-shell > header {\n  align-items: center;\n}\n.investigation-shell h1 {\n  margin: 0.2rem 0;\n}\n.phase-list article,\n.issues {\n  flex: 1 1 16rem;\n  padding: 1rem;\n  border: 1px solid #cbc2b3;\n  border-radius: 0.75rem;\n  background: #fffdf8;\n}\n.investigation-shell > section {\n  margin-top: 2rem;\n}\n/*# sourceMappingURL=investigation-shell.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvestigationShellComponent, { className: "InvestigationShellComponent", filePath: "src/app/templates/investigation/ui/investigation-shell.component.ts", lineNumber: 19 });
})();
function asClassification(value) {
  return value === "supports" || value === "uncertain" || value === "contradicts" ? value : void 0;
}
export {
  InvestigationShellComponent
};
//# debugId=152a0b57-294a-548a-aebc-67b2506d6ef6
//# sourceMappingURL=chunk-P2YGEX6A.js.map
