import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import {
  ACCESS_TOOLS,
  ASSEMBLY_ROLES,
  BrowserInventionPersistence,
  INVENTION_CONTEXT,
  INVENTION_PERSISTENCE,
  INVENTION_PROJECT,
  InventionRuntime,
  applyKnowledgeEvent,
  assemblyFault,
  circulationValue,
  emptyKnowledge,
  interviewValue,
  knowledgeActivities,
  newspaperValue,
  replayKnowledge,
  timelineValue
} from "./chunk-KCORHQSX.js";
import "./chunk-RTVK2FN5.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import "./chunk-2WXJ5NX3.js";
import {
  NgComponentOutlet
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  Injectable,
  InjectionToken,
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
  untracked,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/time-repair/invention/press-proof.component.ts
function PressProofComponent_Conditional_3_For_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 11);
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    const \u0275$index_14_r2 = \u0275\u0275nextContext().$index;
    const p_r3 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("d", ctx_r3.line(\u0275$index_14_r2, row_r1))("stroke-width", 2.8 + p_r3.spread * 3);
  }
}
function PressProofComponent_Conditional_3_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 12);
    \u0275\u0275domElement(1, "rect", 13)(2, "rect", 14)(3, "rect", 15)(4, "rect", 16);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const \u0275$index_14_r2 = \u0275\u0275nextContext().$index;
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 35 + \u0275$index_14_r2 * 39);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 42 + \u0275$index_14_r2 * 39);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 37 + \u0275$index_14_r2 * 39);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 47 + \u0275$index_14_r2 * 39);
  }
}
function PressProofComponent_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 9)(1, "text", 10);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, PressProofComponent_Conditional_3_For_4_For_4_Template, 1, 2, ":svg:path", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, PressProofComponent_Conditional_3_For_4_Conditional_5_Template, 5, 4, ":svg:g", 12);
  }
  if (rf & 2) {
    const letter_r5 = ctx.$implicit;
    const \u0275$index_14_r2 = ctx.$index;
    const p_r3 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("opacity", ctx_r3.coverage(\u0275$index_14_r2))("stroke", p_r3.spread > 0.2 ? "#28262a" : "none")("stroke-width", p_r3.spread * 2.8);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 36 + \u0275$index_14_r2 * 39);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", letter_r5, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.rows);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.coverage(\u0275$index_14_r2) < 0.6 ? 5 : -1);
  }
}
function PressProofComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 4);
    \u0275\u0275domElement(1, "path", 5)(2, "path", 6);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, PressProofComponent_Conditional_3_For_4_Template, 6, 6, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElement(5, "path", 7);
    \u0275\u0275domElementStart(6, "text", 8);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("opacity", ctx_r3.hasImpression() ? 1 : 0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(p_r3.text);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("opacity", ctx_r3.hasImpression() ? 1 : 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", p_r3.id, " ");
  }
}
function PressProofComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 3);
  }
}
var PressProofComponent = class _PressProofComponent {
  proof = input(
    ...ngDevMode ? [void 0, { debugName: "proof" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rows = [0, 1, 2, 3, 4, 5, 6];
  hasImpression() {
    return this.proof()?.coverage.some((c) => c > 0) ?? false;
  }
  description() {
    const p = this.proof();
    return !p ? "Unprinted sheet" : !this.hasImpression() ? `Proof ${p.id}, blank sheet` : `Proof ${p.id}, reads ${p.text}, ${p.usable ? "even impression" : "uneven or incorrect impression"}`;
  }
  coverage(i) {
    return this.proof()?.coverage[Math.min(2, Math.floor(i * 3 / 5))] ?? 1;
  }
  line(i, row) {
    const x = 38 + i * 39, y = 137 + row * 13;
    return `M${x} ${y}h${row % 2 ? 11 : 8}m3 0h${row % 3 ? 7 : 9}m3 0h${row % 2 ? 6 : 8}`;
  }
  static \u0275fac = function PressProofComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PressProofComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PressProofComponent, selectors: [["app-press-proof"]], inputs: { proof: [1, "proof"] }, decls: 5, vars: 2, consts: [["viewBox", "0 0 260 310", "role", "img"], ["d", "M10 5 L251 9 247 303 6 307Z", "fill", "#f4e6c6", "stroke", "#b8a27c", "stroke-width", "1.5"], ["d", "M17 13L243 17M18 293L236 289", "stroke", "#dbc9a1"], ["d", "M117 146h26m-13-13v26", "stroke", "#ccbc9f", "stroke-width", "1"], ["fill", "#b95b43"], ["d", "M30 34h200v2H30zM30 252h200v2H30z"], ["d", "M30 46v-12h12M218 34h12v12M30 241v12h12M218 253h12v-12", "fill", "none", "stroke", "#b95b43", "stroke-width", "2"], ["d", "M109 268l21-8 21 8-21 8zM130 256v24", "fill", "none", "stroke", "#a76042", "stroke-width", "1.5"], ["x", "229", "y", "287", "text-anchor", "end", "font-family", "Georgia,serif", "font-size", "11", "fill", "#8b795e"], ["fill", "#28262a"], ["y", "111", "font-family", "Georgia,serif", "font-size", "41", "font-weight", "700"], ["stroke", "#28262a", "stroke-linecap", "square"], ["fill", "#f4e6c6"], ["y", "87", "width", "36", "height", "3"], ["y", "100", "width", "23", "height", "4"], ["y", "143", "width", "28", "height", "4"], ["y", "182", "width", "20", "height", "3"]], template: function PressProofComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2);
      \u0275\u0275conditionalCreate(3, PressProofComponent_Conditional_3_Template, 8, 3)(4, PressProofComponent_Conditional_4_Template, 1, 0, ":svg:path", 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275attribute("aria-label", ctx.description());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_1_0 = ctx.proof()) ? 3 : 4, tmp_1_0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n/*# sourceMappingURL=press-proof.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PressProofComponent, [{
    type: Component,
    args: [{ selector: "app-press-proof", changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg viewBox="0 0 260 310" role="img" [attr.aria-label]="description()">
    <path d="M10 5 L251 9 247 303 6 307Z" fill="#f4e6c6" stroke="#b8a27c" stroke-width="1.5" />
    <path d="M17 13L243 17M18 293L236 289" stroke="#dbc9a1" />
    @if (proof(); as p) {
      <g fill="#b95b43" [attr.opacity]="hasImpression() ? 1 : 0">
        <path d="M30 34h200v2H30zM30 252h200v2H30z" />
        <path
          d="M30 46v-12h12M218 34h12v12M30 241v12h12M218 253h12v-12"
          fill="none"
          stroke="#b95b43"
          stroke-width="2"
        />
      </g>
      @for (letter of p.text; track $index; let i = $index) {
        <g
          [attr.opacity]="coverage(i)"
          fill="#28262a"
          [attr.stroke]="p.spread > 0.2 ? '#28262a' : 'none'"
          [attr.stroke-width]="p.spread * 2.8"
        >
          <text
            [attr.x]="36 + i * 39"
            y="111"
            font-family="Georgia,serif"
            font-size="41"
            font-weight="700"
          >
            {{ letter }}
          </text>
          @for (row of rows; track row) {
            <path
              [attr.d]="line(i, row)"
              stroke="#28262a"
              [attr.stroke-width]="2.8 + p.spread * 3"
              stroke-linecap="square"
            />
          }
        </g>
        @if (coverage(i) < 0.6) {
          <g fill="#f4e6c6">
            <rect [attr.x]="35 + i * 39" y="87" width="36" height="3" />
            <rect [attr.x]="42 + i * 39" y="100" width="23" height="4" />
            <rect [attr.x]="37 + i * 39" y="143" width="28" height="4" />
            <rect [attr.x]="47 + i * 39" y="182" width="20" height="3" />
          </g>
        }
      }
      <path
        d="M109 268l21-8 21 8-21 8zM130 256v24"
        [attr.opacity]="hasImpression() ? 1 : 0"
        fill="none"
        stroke="#a76042"
        stroke-width="1.5"
      />
      <text
        x="229"
        y="287"
        text-anchor="end"
        font-family="Georgia,serif"
        font-size="11"
        fill="#8b795e"
      >
        {{ p.id }}
      </text>
    } @else {
      <path d="M117 146h26m-13-13v26" stroke="#ccbc9f" stroke-width="1" />
    }
  </svg>`, styles: ["/* angular:styles/component:scss;7b0b0308527d2c52c3a6bff67a240c6705b7f1754dcad3345d0e15d18f044d6d;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/time-repair/invention/press-proof.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n/*# sourceMappingURL=press-proof.component.css.map */\n"] }]
  }], null, { proof: [{ type: Input, args: [{ isSignal: true, alias: "proof", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PressProofComponent, { className: "PressProofComponent", filePath: "src/app/templates/time-repair/invention/press-proof.component.ts", lineNumber: 89 });
})();

// src/app/templates/time-repair/invention/press-workbench.component.ts
var _c0 = () => ["Low pressure", "Medium pressure", "High pressure"];
var _c1 = () => ["Left", "Middle", "Right"];
var _c2 = () => ["L", "M", "R"];
var _forTrack0 = ($index, $item) => $item.id;
function PressWorkbenchComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 35);
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    \u0275\u0275attribute("d", "M550 478L" + (i_r2 * 115 - 270) + " 820");
  }
}
function PressWorkbenchComponent_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 65);
  }
  if (rf & 2) {
    const i_r3 = ctx.$implicit;
    \u0275\u0275attribute("d", "M592 " + (115 + i_r3 * 14) + "l42-10");
  }
}
function PressWorkbenchComponent_For_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g")(1, "text", 111);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const letter_r4 = ctx.$implicit;
    const \u0275$index_153_r5 = ctx.$index;
    \u0275\u0275attribute("transform", "translate(" + (541 + \u0275$index_153_r5 * 34) + " 494) skewX(44) scale(-.9 .4)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", letter_r4, " ");
  }
}
function PressWorkbenchComponent_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 112)(2, "path", 113);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("usable-sheet", ctx_r5.r.proof().usable);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("opacity", ctx_r5.r.proof().usable ? 0.8 : 0.22);
  }
}
function PressWorkbenchComponent_Conditional_106_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 114);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_106_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.r.prepare("ink"));
    });
    \u0275\u0275elementStart(1, "span", 98);
    \u0275\u0275text(2, "\u25CF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Ink type");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 115);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_106_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.r.prepare("paper"));
    });
    \u0275\u0275elementStart(6, "span", 98);
    \u0275\u0275text(7, "\u25A4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r5.r.state().preparation.inked);
    \u0275\u0275advance(5);
    \u0275\u0275attribute("aria-pressed", ctx_r5.r.state().preparation.paperLoaded)("aria-label", ctx_r5.r.state().preparation.paperLoaded ? "Lift the paper from the type" : "Place a sheet over the type");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r5.r.state().preparation.paperLoaded ? "Lift sheet" : "Place sheet");
  }
}
function PressWorkbenchComponent_Conditional_107_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_107_For_2_Template_button_click_0_listener() {
      const level_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.r.configure({ pressure: level_r9 }));
    });
    \u0275\u0275element(1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const level_r9 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pureFunction0(4, _c0)[level_r9])("aria-pressed", ctx_r5.r.settings().pressure === level_r9);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", 8 + level_r9 * 5, "px");
  }
}
function PressWorkbenchComponent_Conditional_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275repeaterCreate(1, PressWorkbenchComponent_Conditional_107_For_2_Template, 2, 5, "button", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Pressure");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r5.marks);
  }
}
function PressWorkbenchComponent_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u25C8");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r5.r.goodCount(), "/", ctx_r5.r.session().batchSize, " ");
  }
}
function PressWorkbenchComponent_Conditional_113_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 120);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_113_For_2_Template_button_click_0_listener() {
      const \u0275$index_261_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.r.swapType(\u0275$index_261_r12));
    });
    \u0275\u0275elementStart(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const letter_r13 = ctx.$implicit;
    const \u0275$index_261_r12 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", "Type block " + (\u0275$index_261_r12 + 1) + ", reversed " + letter_r13 + (ctx_r5.r.selectedType() === null ? ". Select to lift." : ". Select to swap with lifted block."))("aria-pressed", ctx_r5.r.selectedType() === \u0275$index_261_r12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(letter_r13);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_261_r12 + 1);
  }
}
function PressWorkbenchComponent_Conditional_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 117);
    \u0275\u0275repeaterCreate(1, PressWorkbenchComponent_Conditional_113_For_2_Template, 5, 4, "button", 118, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 119)(4, "small");
    \u0275\u0275text(5, "SPECIMEN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r5.r.settings().type);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r5.r.session().target);
  }
}
function PressWorkbenchComponent_Conditional_114_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_114_For_2_Template_button_click_0_listener() {
      const ink_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.r.configure({ ink: ink_r15.id }));
    });
    \u0275\u0275element(1, "span", 123);
    \u0275\u0275elementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ink_r15 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", "Ink " + ink_r15.mark + ": " + ink_r15.name)("aria-pressed", ctx_r5.r.settings().ink === ink_r15.id);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ink_r15.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ink_r15.mark);
  }
}
function PressWorkbenchComponent_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275repeaterCreate(1, PressWorkbenchComponent_Conditional_114_For_2_Template, 4, 5, "button", 121, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r5.r.content.inks);
  }
}
function PressWorkbenchComponent_Conditional_115_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128)(1, "span");
    \u0275\u0275text(2, "\u2723");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sample_r17 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("metal", sample_r17.surface === "metal");
    \u0275\u0275attribute("aria-label", sample_r17.ink + " on " + sample_r17.surface);
    \u0275\u0275advance();
    \u0275\u0275styleProp("opacity", sample_r17.adhesion);
    \u0275\u0275classProp("broken", sample_r17.adhesion < 0.5)("spread", sample_r17.spread > 0.2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", sample_r17.surface === "paper" ? "P" : "M", " \xB7 ", ctx_r5.inkMark(sample_r17.ink));
  }
}
function PressWorkbenchComponent_Conditional_115_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 124)(2, "button", 116);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_115_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.r.materialSurface.set("paper"));
    });
    \u0275\u0275text(3, " Paper");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 116);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_115_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.r.materialSurface.set("metal"));
    });
    \u0275\u0275text(5, " Metal ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 125);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_115_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.r.sample());
    });
    \u0275\u0275elementStart(7, "span", 98);
    \u0275\u0275text(8, "\u25CF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10, "Dab");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 126);
    \u0275\u0275repeaterCreate(12, PressWorkbenchComponent_Conditional_115_For_13_Template, 5, 11, "div", 127, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r5.r.materialSurface() === "paper");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r5.r.materialSurface() === "metal");
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r5.r.state().samples.slice(-4));
  }
}
function PressWorkbenchComponent_Conditional_116_For_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const layer_r20 = ctx.$implicit;
    const region_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("present", ctx_r5.r.settings().packing[region_r19] > layer_r20);
  }
}
function PressWorkbenchComponent_Conditional_116_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function PressWorkbenchComponent_Conditional_116_For_2_Template_button_click_0_listener() {
      const region_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.r.cyclePacking(region_r19));
    });
    \u0275\u0275elementStart(1, "span", 129);
    \u0275\u0275repeaterCreate(2, PressWorkbenchComponent_Conditional_116_For_2_For_3_Template, 1, 2, "i", 130, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const region_r19 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pureFunction0(2, _c1)[region_r19] + " packing: " + ctx_r5.r.settings().packing[region_r19] + " layers. Change packing.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r5.marks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pureFunction0(3, _c2)[region_r19]);
  }
}
function PressWorkbenchComponent_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275repeaterCreate(1, PressWorkbenchComponent_Conditional_116_For_2_Template, 6, 4, "button", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r5.marks);
  }
}
function PressWorkbenchComponent_For_119_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function PressWorkbenchComponent_For_119_Template_button_click_0_listener() {
      const trial_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      const lens_r10 = \u0275\u0275reference(121);
      ctx_r5.r.selectedProof.set(trial_r22.id);
      return \u0275\u0275resetView(lens_r10.showModal());
    });
    \u0275\u0275element(1, "app-press-proof", 101);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r22 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", "Inspect proof " + trial_r22.id)("aria-pressed", ctx_r5.r.proof()?.id === trial_r22.id);
    \u0275\u0275advance();
    \u0275\u0275property("proof", trial_r22);
  }
}
function PressWorkbenchComponent_Conditional_125_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r23 = ctx;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Ink ", ctx_r5.inkMark(p_r23.settings.ink));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Pressure ", p_r23.settings.pressure + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Packing ", p_r23.settings.packing.join(" / "));
  }
}
var PressWorkbenchComponent = class _PressWorkbenchComponent {
  r = inject(InventionRuntime);
  pressDown = signal(
    false,
    ...ngDevMode ? [{ debugName: "pressDown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  typesEditable = computed(
    () => ["compose", "recompose", "production"].includes(this.r.session().mode),
    ...ngDevMode ? [{ debugName: "typesEditable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inkEditable = computed(
    () => ["ink", "production", "return"].includes(this.r.session().mode),
    ...ngDevMode ? [{ debugName: "inkEditable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  packingEditable = computed(
    () => ["packing", "production"].includes(this.r.session().mode),
    ...ngDevMode ? [{ debugName: "packingEditable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pressureEditable = computed(
    () => ["ink", "packing", "production", "return"].includes(this.r.session().mode),
    ...ngDevMode ? [{ debugName: "pressureEditable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleTrials = computed(
    () => this.r.state().trials.slice(-5),
    ...ngDevMode ? [{ debugName: "visibleTrials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stitches = Array.from({ length: 15 }, (_, i) => i);
  floorLines = Array.from({ length: 14 }, (_, i) => i);
  marks = [0, 1, 2];
  inkMark(id) {
    return this.r.content.inks.find((i) => i.id === id)?.mark ?? "";
  }
  pull() {
    this.pressDown.update((v) => !v);
    this.r.pull();
  }
  static \u0275fac = function PressWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PressWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PressWorkbenchComponent, selectors: [["app-press-workbench"]], decls: 126, vars: 19, consts: [["lens", ""], ["aria-label", "Operable printing press and proof workbench", 1, "press-scene"], ["viewBox", "0 0 1100 820", "preserveAspectRatio", "none", "aria-hidden", "true", 1, "workshop-art"], ["id", "press-wall", "x2", "0", "y2", "1"], ["stop-color", "#445153"], ["offset", "1", "stop-color", "#202c2e"], ["id", "press-floor", "x2", "0", "y2", "1"], ["stop-color", "#635343"], ["offset", "1", "stop-color", "#302c29"], ["id", "press-wood"], ["stop-color", "#50352c"], ["offset", ".24", "stop-color", "#b98c59"], ["offset", ".55", "stop-color", "#926c46"], ["offset", "1", "stop-color", "#463128"], ["id", "press-crossbeam", "x2", "0", "y2", "1"], ["stop-color", "#d0a36a"], ["offset", ".2", "stop-color", "#aa8051"], ["offset", "1", "stop-color", "#674a35"], ["id", "press-table", "x2", ".2", "y2", "1"], ["stop-color", "#bd9566"], ["offset", "1", "stop-color", "#6f4b34"], ["id", "press-light"], ["stop-color", "#fff2cc", "stop-opacity", ".2"], ["offset", "1", "stop-color", "#fff2cc", "stop-opacity", "0"], ["id", "press-metal"], ["stop-color", "#bbc0bb"], ["offset", ".5", "stop-color", "#5f6967"], ["offset", "1", "stop-color", "#30393a"], ["id", "press-plaster", "width", "94", "height", "52", "patternUnits", "userSpaceOnUse"], ["d", "M0 51h94M43 0v52", "stroke", "#d7d2b4", "stroke-opacity", ".035", "fill", "none"], ["width", "1100", "height", "820", "fill", "url(#press-wall)"], ["width", "1100", "height", "520", "fill", "url(#press-plaster)"], ["d", "M0 0h1100v30H0zM0 0h45v543H0zM1042 0h58v559h-58zM395 0h27v280h-27z", "fill", "#19292b"], ["d", "M0 32L398 0M1043 32L724 0", "stroke", "#8a7152", "stroke-width", "8", "opacity", ".25"], ["d", "M0 523L1100 481V820H0Z", "fill", "url(#press-floor)"], ["stroke", "#211f1e", "stroke-width", "2", "opacity", ".42"], ["d", "M0 584L1100 553M0 663L1100 635M0 769L1100 748", "stroke", "#261f1d", "stroke-width", "3", "opacity", ".4"], ["d", "M67 359V143Q67 63 186 53Q305 63 305 143V359Z", "fill", "#171f21", "stroke", "#82705b", "stroke-width", "10"], ["d", "M82 343V144Q82 77 186 68Q290 77 290 144V343Z", "fill", "#a7bcb0"], ["d", "M82 211h208M185 68v276M84 145l205 157M84 216l164 127M126 87l164 127M86 302l202-157M84 219l149-127M144 343l145-116", "stroke", "#566f6b", "stroke-width", "5"], ["d", "M83 342L275 110L847 552L280 671Z", "fill", "#eed9a8", "opacity", ".05"], ["cx", "372", "cy", "383", "rx", "439", "ry", "388", "fill", "url(#press-light)"], ["d", "M53 425h243v20H53zM76 446v87M272 446v62", "fill", "#362d28", "stroke", "#332b26", "stroke-width", "11"], ["fill", "#d6c5a1", "stroke", "#b5a27f", "stroke-width", "2"], ["d", "M78 416v-59q0-9 9-9h53v68z"], ["d", "M145 416v-72h30v72zM183 416v-64h54v64z"], ["d", "M82 359h52M150 354h19M188 366h43", "stroke", "#8d7153", "stroke-width", "4"], ["opacity", ".8"], ["d", "M829 120h205v18H829zM848 137v36M1015 137v36", "stroke", "#8d7153", "fill", "#6b503b", "stroke-width", "9"], ["d", "M859 116V72h38v44M910 117V57h27v60M948 117V71h54v46", "fill", "#b29f7b", "stroke", "#705c43", "stroke-width", "4"], ["d", "M866 84h23M916 70h15M955 85h40", "stroke", "#6a5943", "stroke-width", "4"], ["cx", "623", "cy", "600", "rx", "297", "ry", "39", "fill", "#121e21", "opacity", ".5"], ["d", "M392 173L800 158L836 180L426 200Z", "fill", "#c29a65"], ["d", "M391 175h65v405l-65 20zM744 164h62v416l-62-14z", "fill", "url(#press-wood)", "stroke", "#4c352a", "stroke-width", "3"], ["d", "M805 164l31 17v382l-30 17Z", "fill", "#49372b"], ["d", "M386 218L808 204V270L386 284Z", "fill", "url(#press-crossbeam)", "stroke", "#50382b", "stroke-width", "3"], ["d", "M401 236L791 224M401 261L791 248", "stroke", "#d5b081", "opacity", ".4"], ["d", "M386 534L806 524V558L386 571Z", "fill", "#795039", "stroke", "#402b24", "stroke-width", "3"], ["d", "M367 589l121-16v28l-132 17zM720 575l127 7v27l-127-4z", "fill", "url(#press-crossbeam)", "stroke", "#4b3329", "stroke-width", "3"], ["fill", "#282b2b", "stroke", "#afa68b"], ["cx", "421", "cy", "250", "r", "8"], ["cx", "771", "cy", "238", "r", "8"], ["cx", "421", "cy", "546", "r", "7"], ["cx", "775", "cy", "540", "r", "7"], ["d", "M596 103h34v247h-34z", "fill", "url(#press-wood)", "stroke", "#432e26", "stroke-width", "3"], ["stroke", "#442f26", "stroke-width", "5"], ["d", "M572 99h83v24h-83z", "fill", "#9d784d", "stroke", "#4b3429", "stroke-width", "3"], [1, "platen"], ["d", "M493 364l201-8 48 40-225 15z", "fill", "#b8905d", "stroke", "#483729", "stroke-width", "3"], ["d", "M517 411l225-15v29l-225 15z", "fill", "#5d4432"], ["d", "M494 364v32l23 44v-29z", "fill", "#765239"], ["d", "M596 341h34v31h-34z", "fill", "#6f5037"], ["d", "M486 478l218-15 72 48-237 17z", "fill", "#262e30", "stroke", "#aeb2a6", "stroke-width", "3"], ["d", "M501 482l196-12 49 32-208 14z", "fill", "#c6c4b5"], ["d", "M509 483l184-11 37 26-191 11z"], ["d", "M454 518l329-18v23l-329 22z", "fill", "url(#press-metal)"], ["d", "M491 420l212-13 65 43-233 17z", "fill", "#eadbb8"], [1, "lever"], ["d", "M611 334L869 261", "stroke", "#493429", "stroke-width", "18", "stroke-linecap", "round"], ["d", "M612 330L860 260", "stroke", "#bb9160", "stroke-width", "8", "stroke-linecap", "round"], ["d", "M843 264l47-15", "stroke", "#d2b888", "stroke-width", "23", "stroke-linecap", "round"], ["cx", "611", "cy", "334", "r", "16", "fill", "#767364", "stroke", "#252c2c", "stroke-width", "5"], [1, "workshop-collaborator"], ["cx", "964", "cy", "586", "rx", "78", "ry", "18", "fill", "#132324", "opacity", ".5"], ["d", "M919 539l7-141q22-29 50-22q42 12 53 150l-56 33z", "fill", "#526962", "stroke", "#354d47", "stroke-width", "3"], ["d", "M940 406l-11 131 58 13-18-145z", "fill", "#b5a47b"], ["d", "M940 353q-7-40 22-43q31-4 31 31l-8 43-21 12-23-21z", "fill", "#c59872"], ["d", "M931 334q4-34 40-34q33 4 28 34l-34-10-29 14z", "fill", "#604938"], ["d", "M942 365l8 29 19 12 20-25-2-20-20 17z", "fill", "#bcb7a2"], ["d", "M929 442l-20 41-25-7M995 444l16 41-31 17", "fill", "none", "stroke", "#708277", "stroke-width", "22", "stroke-linecap", "round"], ["d", "M884 476l-12-3M980 501l-16 7", "stroke", "#cba37d", "stroke-width", "11", "stroke-linecap", "round"], [3, "usable-sheet"], ["d", "M0 611L911 577L1100 663L1100 820H0Z", "fill", "url(#press-table)", "stroke", "#503528", "stroke-width", "4"], ["d", "M0 756l1100-10v24L0 785Z", "fill", "#503629"], ["d", "M0 785h1100v35H0z", "fill", "#372c26"], ["d", "M10 638l937-22M10 673l1021-22M13 723l1063-11", "stroke", "#442f24", "stroke-width", "2", "opacity", ".28"], ["d", "M37 690q97-6 189 0M442 734q124-12 235-3", "stroke", "#dec096", "stroke-width", "2", "opacity", ".3", "fill", "none"], ["aria-label", "Pull the press and inspect a new proof", "title", "Pull the press", 1, "press-handle", "object-action", 3, "click"], ["aria-hidden", "true"], ["role", "group", "aria-label", "Press pressure", 1, "pressure-control"], ["aria-label", "Magnify the current proof", 1, "fresh-proof", 3, "click", "disabled"], [3, "proof"], ["aria-hidden", "true", 1, "magnify-mark"], ["aria-hidden", "true", 1, "proof-stamp"], ["role", "group", "aria-label", "Select an ink sample", 1, "ink-pots"], [1, "material-bench"], ["role", "group", "aria-label", "Packing beneath the left, middle and right of the forme", 1, "packing-bench"], ["aria-label", "Earlier proofs", 1, "proof-line"], ["aria-label", "Magnified proof", 1, "proof-lens"], ["aria-label", "Close magnified proof", 1, "close-lens", 3, "click"], [1, "proof-settings"], ["x", "0", "y", "0", "fill", "#b2b9a9", "font-family", "Georgia,serif", "font-weight", "700", "font-size", "30"], ["d", "M875 453l81 18-16 82-78-24z", "fill", "#dfd1ac", "stroke", "#9d8762", "stroke-width", "2"], ["d", "M884 479l46 12M880 491l49 12M878 503l45 12", "stroke", "#4d554b", "stroke-width", "3"], ["aria-label", "Apply ink to the raised type", 1, "reference-ink", 3, "click"], [1, "reference-paper", 3, "click"], [3, "click"], ["role", "group", "aria-label", "Moveable type. Select one block, then another to exchange them.", 1, "type-case"], [1, "type-block"], ["aria-label", "Reference impression", 1, "specimen"], [1, "type-block", 3, "click"], [1, "ink-pot"], [1, "ink-pot", 3, "click"], [1, "ink-well"], ["role", "group", "aria-label", "Choose a material for the ink test", 1, "sample-surfaces"], ["aria-label", "Test selected ink on selected material", 1, "ink-dabber", 3, "click"], ["aria-label", "Material test impressions", 1, "material-samples"], [1, "sample", 3, "metal"], [1, "sample"], [1, "pad-stack"], [3, "present"]], template: function PressWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "section", 1);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(1, "svg", 2)(2, "defs")(3, "linearGradient", 3);
      \u0275\u0275element(4, "stop", 4)(5, "stop", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "linearGradient", 6);
      \u0275\u0275element(7, "stop", 7)(8, "stop", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "linearGradient", 9);
      \u0275\u0275element(10, "stop", 10)(11, "stop", 11)(12, "stop", 12)(13, "stop", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "linearGradient", 14);
      \u0275\u0275element(15, "stop", 15)(16, "stop", 16)(17, "stop", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "linearGradient", 18);
      \u0275\u0275element(19, "stop", 19)(20, "stop", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "radialGradient", 21);
      \u0275\u0275element(22, "stop", 22)(23, "stop", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "linearGradient", 24);
      \u0275\u0275element(25, "stop", 25)(26, "stop", 26)(27, "stop", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "pattern", 28);
      \u0275\u0275element(29, "path", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(30, "rect", 30)(31, "rect", 31)(32, "path", 32)(33, "path", 33)(34, "path", 34);
      \u0275\u0275repeaterCreate(35, PressWorkbenchComponent_For_36_Template, 1, 1, ":svg:path", 35, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(37, "path", 36)(38, "path", 37)(39, "path", 38)(40, "path", 39)(41, "path", 40)(42, "ellipse", 41)(43, "path", 42);
      \u0275\u0275elementStart(44, "g", 43);
      \u0275\u0275element(45, "path", 44)(46, "path", 45);
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "path", 46);
      \u0275\u0275elementStart(48, "g", 47);
      \u0275\u0275element(49, "path", 48)(50, "path", 49)(51, "path", 50);
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "ellipse", 51)(53, "path", 52)(54, "path", 53)(55, "path", 54)(56, "path", 55)(57, "path", 56)(58, "path", 57)(59, "path", 58);
      \u0275\u0275elementStart(60, "g", 59);
      \u0275\u0275element(61, "circle", 60)(62, "circle", 61)(63, "circle", 62)(64, "circle", 63);
      \u0275\u0275elementEnd();
      \u0275\u0275element(65, "path", 64);
      \u0275\u0275repeaterCreate(66, PressWorkbenchComponent_For_67_Template, 1, 1, ":svg:path", 65, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(68, "path", 66);
      \u0275\u0275elementStart(69, "g", 67);
      \u0275\u0275element(70, "path", 68)(71, "path", 69)(72, "path", 70)(73, "path", 71);
      \u0275\u0275elementEnd();
      \u0275\u0275element(74, "path", 72)(75, "path", 73)(76, "path", 74);
      \u0275\u0275repeaterCreate(77, PressWorkbenchComponent_For_78_Template, 3, 2, ":svg:g", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275element(79, "path", 75)(80, "path", 76);
      \u0275\u0275elementStart(81, "g", 77);
      \u0275\u0275element(82, "path", 78)(83, "path", 79)(84, "path", 80)(85, "circle", 81);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "g", 82);
      \u0275\u0275element(87, "ellipse", 83)(88, "path", 84)(89, "path", 85)(90, "path", 86)(91, "path", 87)(92, "path", 88)(93, "path", 89)(94, "path", 90);
      \u0275\u0275conditionalCreate(95, PressWorkbenchComponent_Conditional_95_Template, 3, 3, ":svg:g", 91);
      \u0275\u0275elementEnd();
      \u0275\u0275element(96, "path", 92)(97, "path", 93)(98, "path", 94)(99, "path", 95)(100, "path", 96);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(101, "button", 97);
      \u0275\u0275listener("click", function PressWorkbenchComponent_Template_button_click_101_listener() {
        return ctx.pull();
      });
      \u0275\u0275elementStart(102, "span", 98);
      \u0275\u0275text(103, "\u2199");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "small");
      \u0275\u0275text(105, "Pull");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(106, PressWorkbenchComponent_Conditional_106_Template, 10, 4);
      \u0275\u0275conditionalCreate(107, PressWorkbenchComponent_Conditional_107_Template, 5, 0, "div", 99);
      \u0275\u0275elementStart(108, "button", 100);
      \u0275\u0275listener("click", function PressWorkbenchComponent_Template_button_click_108_listener() {
        \u0275\u0275restoreView(_r1);
        const lens_r10 = \u0275\u0275reference(121);
        return \u0275\u0275resetView(lens_r10.showModal());
      });
      \u0275\u0275element(109, "app-press-proof", 101);
      \u0275\u0275elementStart(110, "span", 102);
      \u0275\u0275text(111, "\u2315");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(112, PressWorkbenchComponent_Conditional_112_Template, 4, 2, "span", 103);
      \u0275\u0275conditionalCreate(113, PressWorkbenchComponent_Conditional_113_Template, 8, 1);
      \u0275\u0275conditionalCreate(114, PressWorkbenchComponent_Conditional_114_Template, 3, 0, "div", 104);
      \u0275\u0275conditionalCreate(115, PressWorkbenchComponent_Conditional_115_Template, 14, 2, "div", 105);
      \u0275\u0275conditionalCreate(116, PressWorkbenchComponent_Conditional_116_Template, 3, 0, "div", 106);
      \u0275\u0275elementStart(117, "div", 107);
      \u0275\u0275repeaterCreate(118, PressWorkbenchComponent_For_119_Template, 2, 3, "button", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "dialog", 108, 0)(122, "button", 109);
      \u0275\u0275listener("click", function PressWorkbenchComponent_Template_button_click_122_listener() {
        \u0275\u0275restoreView(_r1);
        const lens_r10 = \u0275\u0275reference(121);
        return \u0275\u0275resetView(lens_r10.close());
      });
      \u0275\u0275text(123, "\xD7");
      \u0275\u0275elementEnd();
      \u0275\u0275element(124, "app-press-proof", 101);
      \u0275\u0275conditionalCreate(125, PressWorkbenchComponent_Conditional_125_Template, 7, 3, "div", 110);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_21_0;
      \u0275\u0275classProp("pressing", ctx.pressDown())("has-proof", ctx.r.state().trials.length > 0);
      \u0275\u0275attribute("data-mode", ctx.r.session().mode);
      \u0275\u0275advance(35);
      \u0275\u0275repeater(ctx.floorLines);
      \u0275\u0275advance(31);
      \u0275\u0275repeater(ctx.stitches);
      \u0275\u0275advance(10);
      \u0275\u0275attribute("fill", ctx.r.session().mode !== "reference" || ctx.r.state().preparation.inked ? "#252a2b" : "#8b9991");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.r.settings().type);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("opacity", ctx.r.session().mode !== "reference" || ctx.r.state().preparation.paperLoaded ? 0.95 : 0);
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.r.proof() ? 95 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.r.session().mode === "reference" ? 106 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.pressureEditable() ? 107 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.r.proof());
      \u0275\u0275advance();
      \u0275\u0275property("proof", ctx.r.proof());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.r.proof() ? 112 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.typesEditable() ? 113 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.inkEditable() ? 114 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.r.session().mode === "ink" ? 115 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.packingEditable() ? 116 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleTrials());
      \u0275\u0275advance(6);
      \u0275\u0275property("proof", ctx.r.proof());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_21_0 = ctx.r.proof()) ? 125 : -1, tmp_21_0);
    }
  }, dependencies: [PressProofComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.press-scene[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  isolation: isolate;\n  background: #2d3635;\n  container-type: inline-size;\n}\n.workshop-art[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: #293b38;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bcf5e4;\n  outline-offset: 4px;\n  z-index: 5;\n}\n.object-action[_ngcontent-%COMP%] {\n  position: absolute;\n  background: #e6c691;\n  border: 2px solid #72513a;\n  box-shadow: 0 4px 0 #503a2d, 0 0 0 6px rgba(255, 229, 179, 0.0941176471);\n  border-radius: 50%;\n  min-width: 54px;\n  min-height: 54px;\n}\n.press-handle[_ngcontent-%COMP%] {\n  left: 76%;\n  top: 29%;\n  width: 66px;\n  height: 66px;\n  display: grid;\n  place-content: center;\n  transition: transform 0.18s;\n}\n.press-handle[_ngcontent-%COMP%]:hover {\n  transform: translateY(3px);\n  background: #f7dca8;\n}\n.press-handle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 29px;\n  line-height: 0.9;\n}\n.press-handle[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 700 10px Arial, sans-serif;\n  margin-top: 4px;\n}\n.reference-ink[_ngcontent-%COMP%], \n.reference-paper[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 77%;\n  left: 45%;\n  width: 80px;\n  min-height: 66px;\n  padding: 5px;\n  border: 1px solid #bc9b64;\n  border-radius: 6px;\n  background: #624c35;\n  color: #ead0a1;\n  box-shadow: 3px 5px rgba(53, 44, 36, 0.4392156863);\n}\n.reference-ink[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto 5px;\n  width: 43px;\n  height: 31px;\n  border-radius: 50%;\n  background: #b2905a;\n  color: #252b2a;\n  font-size: 32px;\n  line-height: 0.8;\n}\n.reference-paper[_ngcontent-%COMP%] {\n  left: 66%;\n  transform: rotate(3deg);\n  background: #e7d5ac;\n  color: #67573d;\n}\n.reference-paper[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 30px;\n  line-height: 1;\n  margin-bottom: 5px;\n}\n.reference-ink[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.reference-paper[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 10px Arial, sans-serif;\n}\n.reference-ink[aria-pressed=true][_ngcontent-%COMP%], \n.reference-paper[aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 2px solid #bcebd2;\n  outline-offset: 3px;\n}\n.lever[_ngcontent-%COMP%] {\n  transform-origin: 611px 334px;\n}\n.has-proof.pressing[_ngcontent-%COMP%]   .lever[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lever-pull 0.7s ease;\n}\n.has-proof[_ngcontent-%COMP%]:not(.pressing)   .lever[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lever-pull-again 0.7s ease;\n}\n.has-proof.pressing[_ngcontent-%COMP%]   .platen[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_platen-stroke 0.7s ease;\n}\n.has-proof[_ngcontent-%COMP%]:not(.pressing)   .platen[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_platen-stroke-again 0.7s ease;\n}\n@keyframes _ngcontent-%COMP%_lever-pull {\n  40%, 65% {\n    transform: rotate(7deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_lever-pull-again {\n  40%, 65% {\n    transform: rotate(7deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_platen-stroke {\n  40%, 65% {\n    transform: translateY(19px);\n  }\n}\n@keyframes _ngcontent-%COMP%_platen-stroke-again {\n  40%, 65% {\n    transform: translateY(19px);\n  }\n}\n.fresh-proof[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 4%;\n  top: 34%;\n  width: 25%;\n  height: 36%;\n  padding: 0;\n  transform: rotate(-5deg);\n  background: transparent;\n  border: 0;\n  filter: drop-shadow(8px 15px 8px rgba(17, 32, 32, 0.3960784314));\n}\n.fresh-proof[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.magnify-mark[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 9%;\n  bottom: 4%;\n  font-size: 28px;\n  color: #6b5f46;\n}\n.fresh-proof[_ngcontent-%COMP%]:disabled   .magnify-mark[_ngcontent-%COMP%] {\n  display: none;\n}\n.proof-stamp[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 13%;\n  top: 68%;\n  font: 14px Georgia, serif;\n  color: #f5e4be;\n}\n.proof-stamp[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #eac17c;\n  margin-left: 6px;\n}\n.pressure-control[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 48%;\n  top: 34%;\n  display: flex;\n  gap: 3px;\n  padding: 6px 7px 18px;\n  background: rgba(69, 53, 42, 0.8509803922);\n  border: 1px solid #c09860;\n  border-radius: 8px;\n}\n.pressure-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 36px;\n  min-height: 40px;\n  display: grid;\n  place-items: center;\n  border: 0;\n  border-radius: 3px;\n  background: #1b292b;\n}\n.pressure-control[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #e8c58c;\n}\n.pressure-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  width: 7px;\n  background: #9eafa5;\n}\n.pressure-control[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #4a3d2d;\n}\n.pressure-control[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3px;\n  width: 100%;\n  text-align: center;\n  left: 0;\n  font: 9px Arial, sans-serif;\n  color: #f5e4be;\n}\n.type-case[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 6%;\n  top: 76%;\n  width: 60%;\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 12px;\n  background: #3c3029;\n  border: 3px solid #bc9260;\n  box-shadow: 4px 8px 12px rgba(51, 34, 31, 0.4392156863);\n}\n.type-block[_ngcontent-%COMP%] {\n  position: relative;\n  width: 16%;\n  height: 58px;\n  border: 2px solid #a4b1aa;\n  border-radius: 2px;\n  background:\n    linear-gradient(\n      125deg,\n      #b8c0b8,\n      #667775 50%,\n      #314342);\n  box-shadow: 0 6px 0 #263c3e;\n}\n.type-block[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  transform: scaleX(-1);\n  font: bold 33px Georgia, serif;\n  color: #192c30;\n  text-shadow: 0 1px #dce3d3;\n}\n.type-block[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -21px;\n  font: 10px Arial, sans-serif;\n  left: 40%;\n  color: #dec6a0;\n}\n.type-block[aria-pressed=true][_ngcontent-%COMP%] {\n  transform: translateY(-10px);\n  outline: 3px solid #eccc87;\n  box-shadow: 0 10px 12px rgba(29, 34, 38, 0.6666666667);\n}\n.specimen[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 73%;\n  top: 68%;\n  width: 23%;\n  padding: 10px 8px;\n  background: #e4d5ad;\n  border: 1px solid #a88e5f;\n  box-shadow: 4px 7px 9px rgba(51, 34, 31, 0.3764705882);\n  transform: rotate(4deg);\n  text-align: center;\n}\n.specimen[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 8px Arial, sans-serif;\n  letter-spacing: 0.2em;\n  color: #776b51;\n}\n.specimen[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 10px;\n  font: 700 clamp(18px, 3cqw, 30px) Georgia, serif;\n  letter-spacing: 0.07em;\n}\n.ink-pots[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 77%;\n  left: 6%;\n  width: 29%;\n  display: flex;\n  justify-content: space-between;\n}\n.ink-pot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  width: 29%;\n  min-height: 61px;\n  background:\n    linear-gradient(\n      90deg,\n      #684632,\n      #ad8054 50%,\n      #694831);\n  border: 2px solid #553e2c;\n  border-radius: 40% 40% 25% 25%;\n  box-shadow: 0 5px 0 #433127;\n  padding: 5px 3px;\n}\n.ink-well[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  border: 3px solid #c89b64;\n  width: 100%;\n  height: 23px;\n  box-shadow: inset 3px 2px 4px #141b27;\n}\n.ink-pot[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  width: 22px;\n  margin-top: 3px;\n  background: #e6d0a7;\n  color: #523d2a;\n  font: 12px Georgia, serif;\n}\n.ink-pot[aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 3px solid #e6c586;\n  outline-offset: 5px;\n}\n.material-bench[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 40%;\n  top: 74%;\n  width: 54%;\n  height: 21%;\n}\n.sample-surfaces[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.sample-surfaces[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 54px;\n  min-height: 36px;\n  padding: 4px;\n  border: 1px solid #ad9874;\n  background: #e9d6ad;\n  color: #413d34;\n  font: 10px Arial, sans-serif;\n}\n.sample-surfaces[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  background:\n    linear-gradient(\n      110deg,\n      #acbbb2,\n      #5d6e6b);\n}\n.sample-surfaces[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 2px solid #ecce8e;\n  outline-offset: 3px;\n}\n.ink-dabber[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: -8px;\n  width: 58px;\n  height: 58px;\n  border: 0;\n  background: transparent;\n  color: #e5c68f;\n}\n.ink-dabber[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  width: 42px;\n  height: 34px;\n  margin: auto;\n  border-radius: 50%;\n  color: #282d2a;\n  background: #3b3630;\n  border: 4px solid #b28a55;\n  box-shadow: 2px 5px 0 #4c382a;\n  font-size: 24px;\n}\n.ink-dabber[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font: 10px Arial, sans-serif;\n}\n.material-samples[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 48px;\n}\n.sample[_ngcontent-%COMP%] {\n  width: 20%;\n  height: 62px;\n  background: #e8d9b8;\n  border: 1px solid #c0ae89;\n  text-align: center;\n  box-shadow: 3px 5px rgba(71, 55, 41, 0.4);\n}\n.sample.metal[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #adb6ad,\n      #6c7872);\n  border-color: #536460;\n}\n.sample[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: bold 38px/1 Georgia, serif;\n  color: #1f2428;\n}\n.sample[_ngcontent-%COMP%]    > .broken[_ngcontent-%COMP%] {\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 4px,\n      #e3d7b5 5px 7px);\n}\n.sample[_ngcontent-%COMP%]    > .spread[_ngcontent-%COMP%] {\n  text-shadow: 1px 1px 1px #1f2428, -1px -1px 2px #1f2428;\n}\n.sample[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 9px Arial, sans-serif;\n  color: #283e3c;\n}\n.packing-bench[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 43%;\n  top: 74%;\n  width: 41%;\n  display: flex;\n  justify-content: space-around;\n  padding: 9px;\n  border: 3px solid #ad8a5e;\n  background: #382c26;\n  box-shadow: 3px 6px 9px rgba(48, 40, 31, 0.5333333333);\n}\n.packing-bench[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  background: transparent;\n  border: 1px solid #77684e;\n  border-radius: 3px;\n  width: 27%;\n  min-height: 70px;\n  padding: 4px;\n}\n.pad-stack[_ngcontent-%COMP%] {\n  height: 46px;\n  display: flex;\n  flex-direction: column-reverse;\n  justify-content: start;\n}\n.pad-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 10px;\n  margin-top: 3px;\n  background: rgba(187, 160, 121, 0.2);\n  border: 1px dashed #958465;\n  transform: skewY(-5deg);\n}\n.pad-stack[_ngcontent-%COMP%]   i.present[_ngcontent-%COMP%] {\n  background: #e4cfa5;\n  border: 1px solid #b49668;\n  box-shadow: 2px 3px #5a4531;\n}\n.packing-bench[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #f0d7aa;\n  font: 10px Arial, sans-serif;\n}\n.proof-line[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 4%;\n  top: 17%;\n  display: flex;\n  gap: 5px;\n  width: 23%;\n  border-top: 1px solid #aa9b7d;\n  padding-top: 9px;\n  justify-content: end;\n}\n.proof-line[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: 0;\n  padding: 0;\n  width: 18%;\n  min-height: 44px;\n  transform: rotate(4deg);\n  filter: drop-shadow(2px 4px 4px #10201f);\n}\n.proof-line[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(even) {\n  transform: rotate(-6deg);\n}\n.proof-line[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 2px solid #d7bf80;\n  outline-offset: 2px;\n}\n.proof-lens[_ngcontent-%COMP%] {\n  width: min(440px, 100vw - 28px);\n  max-height: 90dvh;\n  padding: 30px 36px 18px;\n  border: 1px solid #be9b64;\n  border-radius: 12px;\n  background: #273b39;\n  color: #f2e7cf;\n  box-shadow: 0 20px 50px #071d29;\n}\n.proof-lens[_ngcontent-%COMP%]::backdrop {\n  background: rgba(16, 40, 39, 0.768627451);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.proof-lens[_ngcontent-%COMP%]   app-press-proof[_ngcontent-%COMP%] {\n  height: min(60dvh, 470px);\n}\n.close-lens[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 3px;\n  top: 3px;\n  width: 44px;\n  height: 44px;\n  color: white;\n  background: transparent;\n  border: 0;\n  font-size: 28px;\n}\n.proof-settings[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 8px 15px;\n  font: 11px/1.6 Arial, sans-serif;\n  margin-top: 15px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .type-case[_ngcontent-%COMP%] {\n  top: 74%;\n  left: 39%;\n  width: 47%;\n  padding: 6px 9px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .type-block[_ngcontent-%COMP%] {\n  height: 40px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .type-block[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .type-block[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n}\n[data-mode=production][_ngcontent-%COMP%]   .packing-bench[_ngcontent-%COMP%] {\n  top: 85%;\n  left: 39%;\n  width: 47%;\n  padding: 3px 6px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .packing-bench[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .pad-stack[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 50%;\n}\n[data-mode=production][_ngcontent-%COMP%]   .pad-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 7px;\n  margin-top: 2px;\n}\n[data-mode=production][_ngcontent-%COMP%]   .specimen[_ngcontent-%COMP%] {\n  top: 56%;\n  left: 77%;\n  width: 19%;\n  padding: 6px;\n}\n@container (max-width: 600px) {\n  .press-handle[_ngcontent-%COMP%] {\n    width: 52px;\n    height: 52px;\n  }\n  .fresh-proof[_ngcontent-%COMP%] {\n    width: 29%;\n    left: 2%;\n  }\n  .pressure-control[_ngcontent-%COMP%] {\n    left: 39%;\n    top: 35%;\n    padding: 3px 3px 18px;\n    gap: 1px;\n  }\n  .pressure-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 36px;\n  }\n  .type-case[_ngcontent-%COMP%] {\n    left: 4%;\n    width: 66%;\n    padding: 8px;\n  }\n  .type-block[_ngcontent-%COMP%] {\n    min-height: 48px;\n    height: 48px;\n  }\n  .type-block[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .ink-pots[_ngcontent-%COMP%] {\n    width: 33%;\n    left: 5%;\n  }\n  .ink-pot[_ngcontent-%COMP%] {\n    min-width: 40px;\n    padding: 4px 2px;\n  }\n  .material-bench[_ngcontent-%COMP%] {\n    left: 44%;\n    width: 51%;\n  }\n  .sample-surfaces[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .sample-surfaces[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 47px;\n    min-height: 40px;\n  }\n  .ink-dabber[_ngcontent-%COMP%] {\n    top: -3px;\n    right: -8px;\n    width: 44px;\n  }\n  .material-samples[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .sample[_ngcontent-%COMP%] {\n    width: 22%;\n  }\n  .proof-line[_ngcontent-%COMP%] {\n    width: 36%;\n    right: 5%;\n    top: 15%;\n    gap: 7px;\n  }\n  .proof-line[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 25px;\n  }\n  .specimen[_ngcontent-%COMP%] {\n    left: 76%;\n    width: 20%;\n  }\n  [data-mode=production][_ngcontent-%COMP%]   .type-case[_ngcontent-%COMP%] {\n    width: 58%;\n    left: 39%;\n    top: 70%;\n  }\n  [data-mode=production][_ngcontent-%COMP%]   .type-block[_ngcontent-%COMP%] {\n    min-height: 44px;\n  }\n  [data-mode=production][_ngcontent-%COMP%]   .packing-bench[_ngcontent-%COMP%] {\n    width: 55%;\n    left: 40%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   .lever[_ngcontent-%COMP%], \n   .platen[_ngcontent-%COMP%] {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=press-workbench.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PressWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-press-workbench", imports: [PressProofComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section
  class="press-scene"
  [class.pressing]="pressDown()"
  [class.has-proof]="r.state().trials.length > 0"
  [attr.data-mode]="r.session().mode"
  aria-label="Operable printing press and proof workbench"
>
  <svg class="workshop-art" viewBox="0 0 1100 820" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="press-wall" x2="0" y2="1">
        <stop stop-color="#445153" />
        <stop offset="1" stop-color="#202c2e" />
      </linearGradient>
      <linearGradient id="press-floor" x2="0" y2="1">
        <stop stop-color="#635343" />
        <stop offset="1" stop-color="#302c29" />
      </linearGradient>
      <linearGradient id="press-wood">
        <stop stop-color="#50352c" />
        <stop offset=".24" stop-color="#b98c59" />
        <stop offset=".55" stop-color="#926c46" />
        <stop offset="1" stop-color="#463128" />
      </linearGradient>
      <linearGradient id="press-crossbeam" x2="0" y2="1">
        <stop stop-color="#d0a36a" />
        <stop offset=".2" stop-color="#aa8051" />
        <stop offset="1" stop-color="#674a35" />
      </linearGradient>
      <linearGradient id="press-table" x2=".2" y2="1">
        <stop stop-color="#bd9566" />
        <stop offset="1" stop-color="#6f4b34" />
      </linearGradient>
      <radialGradient id="press-light">
        <stop stop-color="#fff2cc" stop-opacity=".2" />
        <stop offset="1" stop-color="#fff2cc" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="press-metal">
        <stop stop-color="#bbc0bb" />
        <stop offset=".5" stop-color="#5f6967" />
        <stop offset="1" stop-color="#30393a" />
      </linearGradient>
      <pattern id="press-plaster" width="94" height="52" patternUnits="userSpaceOnUse">
        <path d="M0 51h94M43 0v52" stroke="#d7d2b4" stroke-opacity=".035" fill="none" />
      </pattern>
    </defs>
    <rect width="1100" height="820" fill="url(#press-wall)" />
    <rect width="1100" height="520" fill="url(#press-plaster)" />
    <path d="M0 0h1100v30H0zM0 0h45v543H0zM1042 0h58v559h-58zM395 0h27v280h-27z" fill="#19292b" />
    <path d="M0 32L398 0M1043 32L724 0" stroke="#8a7152" stroke-width="8" opacity=".25" />
    <path d="M0 523L1100 481V820H0Z" fill="url(#press-floor)" />
    @for (i of floorLines; track i) {
      <path
        [attr.d]="'M550 478L' + (i * 115 - 270) + ' 820'"
        stroke="#211f1e"
        stroke-width="2"
        opacity=".42"
      />
    }
    <path
      d="M0 584L1100 553M0 663L1100 635M0 769L1100 748"
      stroke="#261f1d"
      stroke-width="3"
      opacity=".4"
    />
    <!-- Leaded window, scattered light, and stored supplies are part of the workshop. -->
    <path
      d="M67 359V143Q67 63 186 53Q305 63 305 143V359Z"
      fill="#171f21"
      stroke="#82705b"
      stroke-width="10"
    />
    <path d="M82 343V144Q82 77 186 68Q290 77 290 144V343Z" fill="#a7bcb0" />
    <path
      d="M82 211h208M185 68v276M84 145l205 157M84 216l164 127M126 87l164 127M86 302l202-157M84 219l149-127M144 343l145-116"
      stroke="#566f6b"
      stroke-width="5"
    />
    <path d="M83 342L275 110L847 552L280 671Z" fill="#eed9a8" opacity=".05" />
    <ellipse cx="372" cy="383" rx="439" ry="388" fill="url(#press-light)" />
    <path
      d="M53 425h243v20H53zM76 446v87M272 446v62"
      fill="#362d28"
      stroke="#332b26"
      stroke-width="11"
    />
    <g fill="#d6c5a1" stroke="#b5a27f" stroke-width="2">
      <path d="M78 416v-59q0-9 9-9h53v68z" />
      <path d="M145 416v-72h30v72zM183 416v-64h54v64z" />
    </g>
    <path d="M82 359h52M150 354h19M188 366h43" stroke="#8d7153" stroke-width="4" />
    <g opacity=".8">
      <path
        d="M829 120h205v18H829zM848 137v36M1015 137v36"
        stroke="#8d7153"
        fill="#6b503b"
        stroke-width="9"
      />
      <path
        d="M859 116V72h38v44M910 117V57h27v60M948 117V71h54v46"
        fill="#b29f7b"
        stroke="#705c43"
        stroke-width="4"
      />
      <path d="M866 84h23M916 70h15M955 85h40" stroke="#6a5943" stroke-width="4" />
    </g>
    <!-- The press is drawn as individual moving machine parts. -->
    <ellipse cx="623" cy="600" rx="297" ry="39" fill="#121e21" opacity=".5" />
    <path d="M392 173L800 158L836 180L426 200Z" fill="#c29a65" />
    <path
      d="M391 175h65v405l-65 20zM744 164h62v416l-62-14z"
      fill="url(#press-wood)"
      stroke="#4c352a"
      stroke-width="3"
    />
    <path d="M805 164l31 17v382l-30 17Z" fill="#49372b" />
    <path
      d="M386 218L808 204V270L386 284Z"
      fill="url(#press-crossbeam)"
      stroke="#50382b"
      stroke-width="3"
    />
    <path d="M401 236L791 224M401 261L791 248" stroke="#d5b081" opacity=".4" />
    <path d="M386 534L806 524V558L386 571Z" fill="#795039" stroke="#402b24" stroke-width="3" />
    <path
      d="M367 589l121-16v28l-132 17zM720 575l127 7v27l-127-4z"
      fill="url(#press-crossbeam)"
      stroke="#4b3329"
      stroke-width="3"
    />
    <g fill="#282b2b" stroke="#afa68b">
      <circle cx="421" cy="250" r="8" />
      <circle cx="771" cy="238" r="8" />
      <circle cx="421" cy="546" r="7" />
      <circle cx="775" cy="540" r="7" />
    </g>
    <path d="M596 103h34v247h-34z" fill="url(#press-wood)" stroke="#432e26" stroke-width="3" />
    @for (i of stitches; track i) {
      <path [attr.d]="'M592 ' + (115 + i * 14) + 'l42-10'" stroke="#442f26" stroke-width="5" />
    }
    <path d="M572 99h83v24h-83z" fill="#9d784d" stroke="#4b3429" stroke-width="3" />
    <g class="platen">
      <path d="M493 364l201-8 48 40-225 15z" fill="#b8905d" stroke="#483729" stroke-width="3" />
      <path d="M517 411l225-15v29l-225 15z" fill="#5d4432" />
      <path d="M494 364v32l23 44v-29z" fill="#765239" />
      <path d="M596 341h34v31h-34z" fill="#6f5037" />
    </g>
    <path d="M486 478l218-15 72 48-237 17z" fill="#262e30" stroke="#aeb2a6" stroke-width="3" />
    <path d="M501 482l196-12 49 32-208 14z" fill="#c6c4b5" />
    <path
      d="M509 483l184-11 37 26-191 11z"
      [attr.fill]="
        r.session().mode !== 'reference' || r.state().preparation.inked ? '#252a2b' : '#8b9991'
      "
    />
    @for (letter of r.settings().type; track $index; let i = $index) {
      <g [attr.transform]="'translate(' + (541 + i * 34) + ' 494) skewX(44) scale(-.9 .4)'">
        <text
          x="0"
          y="0"
          fill="#b2b9a9"
          font-family="Georgia,serif"
          font-weight="700"
          font-size="30"
        >
          {{ letter }}
        </text>
      </g>
    }
    <path d="M454 518l329-18v23l-329 22z" fill="url(#press-metal)" />
    <path
      d="M491 420l212-13 65 43-233 17z"
      fill="#eadbb8"
      [attr.opacity]="
        r.session().mode !== 'reference' || r.state().preparation.paperLoaded ? 0.95 : 0
      "
    />
    <g class="lever">
      <path d="M611 334L869 261" stroke="#493429" stroke-width="18" stroke-linecap="round" />
      <path d="M612 330L860 260" stroke="#bb9160" stroke-width="8" stroke-linecap="round" />
      <path d="M843 264l47-15" stroke="#d2b888" stroke-width="23" stroke-linecap="round" />
      <circle cx="611" cy="334" r="16" fill="#767364" stroke="#252c2c" stroke-width="5" />
    </g>
    <!-- A workshop collaborator watches the impression and helps at the bench. -->
    <g class="workshop-collaborator">
      <ellipse cx="964" cy="586" rx="78" ry="18" fill="#132324" opacity=".5" />
      <path
        d="M919 539l7-141q22-29 50-22q42 12 53 150l-56 33z"
        fill="#526962"
        stroke="#354d47"
        stroke-width="3"
      />
      <path d="M940 406l-11 131 58 13-18-145z" fill="#b5a47b" />
      <path d="M940 353q-7-40 22-43q31-4 31 31l-8 43-21 12-23-21z" fill="#c59872" />
      <path d="M931 334q4-34 40-34q33 4 28 34l-34-10-29 14z" fill="#604938" />
      <path d="M942 365l8 29 19 12 20-25-2-20-20 17z" fill="#bcb7a2" />
      <path
        d="M929 442l-20 41-25-7M995 444l16 41-31 17"
        fill="none"
        stroke="#708277"
        stroke-width="22"
        stroke-linecap="round"
      />
      <path
        d="M884 476l-12-3M980 501l-16 7"
        stroke="#cba37d"
        stroke-width="11"
        stroke-linecap="round"
      />
      @if (r.proof()) {
        <g [class.usable-sheet]="r.proof()!.usable">
          <path d="M875 453l81 18-16 82-78-24z" fill="#dfd1ac" stroke="#9d8762" stroke-width="2" />
          <path
            d="M884 479l46 12M880 491l49 12M878 503l45 12"
            stroke="#4d554b"
            [attr.opacity]="r.proof()!.usable ? 0.8 : 0.22"
            stroke-width="3"
          />
        </g>
      }
    </g>
    <!-- Foreground bench: proofs, specimens, and removable type sit on the surface. -->
    <path
      d="M0 611L911 577L1100 663L1100 820H0Z"
      fill="url(#press-table)"
      stroke="#503528"
      stroke-width="4"
    />
    <path d="M0 756l1100-10v24L0 785Z" fill="#503629" />
    <path d="M0 785h1100v35H0z" fill="#372c26" />
    <path
      d="M10 638l937-22M10 673l1021-22M13 723l1063-11"
      stroke="#442f24"
      stroke-width="2"
      opacity=".28"
    />
    <path
      d="M37 690q97-6 189 0M442 734q124-12 235-3"
      stroke="#dec096"
      stroke-width="2"
      opacity=".3"
      fill="none"
    />
  </svg>

  <button
    class="press-handle object-action"
    (click)="pull()"
    aria-label="Pull the press and inspect a new proof"
    title="Pull the press"
  >
    <span aria-hidden="true">\u2199</span><small>Pull</small>
  </button>

  @if (r.session().mode === 'reference') {
    <button
      class="reference-ink"
      (click)="r.prepare('ink')"
      [attr.aria-pressed]="r.state().preparation.inked"
      aria-label="Apply ink to the raised type"
    >
      <span aria-hidden="true">\u25CF</span><small>Ink type</small>
    </button>
    <button
      class="reference-paper"
      (click)="r.prepare('paper')"
      [attr.aria-pressed]="r.state().preparation.paperLoaded"
      [attr.aria-label]="
        r.state().preparation.paperLoaded
          ? 'Lift the paper from the type'
          : 'Place a sheet over the type'
      "
    >
      <span aria-hidden="true">\u25A4</span
      ><small>{{ r.state().preparation.paperLoaded ? 'Lift sheet' : 'Place sheet' }}</small>
    </button>
  }

  @if (pressureEditable()) {
    <div class="pressure-control" role="group" aria-label="Press pressure">
      @for (level of marks; track level) {
        <button
          [attr.aria-label]="['Low pressure', 'Medium pressure', 'High pressure'][level]"
          [attr.aria-pressed]="r.settings().pressure === level"
          (click)="r.configure({ pressure: level })"
        >
          <span [style.height.px]="8 + level * 5"></span>
        </button>
      }
      <small>Pressure</small>
    </div>
  }

  <button
    class="fresh-proof"
    (click)="lens.showModal()"
    [disabled]="!r.proof()"
    aria-label="Magnify the current proof"
  >
    <app-press-proof [proof]="r.proof()" /><span class="magnify-mark" aria-hidden="true">\u2315</span>
  </button>
  @if (r.proof()) {
    <span class="proof-stamp" aria-hidden="true"
      >{{ r.goodCount() }}/{{ r.session().batchSize }} <span>\u25C8</span></span
    >
  }

  @if (typesEditable()) {
    <div
      class="type-case"
      role="group"
      aria-label="Moveable type. Select one block, then another to exchange them."
    >
      @for (letter of r.settings().type; track $index; let i = $index) {
        <button
          class="type-block"
          [attr.aria-label]="
            'Type block ' +
            (i + 1) +
            ', reversed ' +
            letter +
            (r.selectedType() === null
              ? '. Select to lift.'
              : '. Select to swap with lifted block.')
          "
          [attr.aria-pressed]="r.selectedType() === i"
          (click)="r.swapType(i)"
        >
          <b>{{ letter }}</b
          ><span>{{ i + 1 }}</span>
        </button>
      }
    </div>
    <div class="specimen" aria-label="Reference impression">
      <small>SPECIMEN</small><span>{{ r.session().target }}</span>
    </div>
  }

  @if (inkEditable()) {
    <div class="ink-pots" role="group" aria-label="Select an ink sample">
      @for (ink of r.content.inks; track ink.id) {
        <button
          class="ink-pot"
          [attr.aria-label]="'Ink ' + ink.mark + ': ' + ink.name"
          [attr.aria-pressed]="r.settings().ink === ink.id"
          (click)="r.configure({ ink: ink.id })"
        >
          <span class="ink-well" [style.background]="ink.color"></span><b>{{ ink.mark }}</b>
        </button>
      }
    </div>
  }

  @if (r.session().mode === 'ink') {
    <div class="material-bench">
      <div class="sample-surfaces" role="group" aria-label="Choose a material for the ink test">
        <button
          [attr.aria-pressed]="r.materialSurface() === 'paper'"
          (click)="r.materialSurface.set('paper')"
        >
          Paper</button
        ><button
          [attr.aria-pressed]="r.materialSurface() === 'metal'"
          (click)="r.materialSurface.set('metal')"
        >
          Metal
        </button>
      </div>
      <button
        class="ink-dabber"
        (click)="r.sample()"
        aria-label="Test selected ink on selected material"
      >
        <span aria-hidden="true">\u25CF</span><small>Dab</small>
      </button>
      <div class="material-samples" aria-label="Material test impressions">
        @for (sample of r.state().samples.slice(-4); track $index) {
          <div
            class="sample"
            [class.metal]="sample.surface === 'metal'"
            [attr.aria-label]="sample.ink + ' on ' + sample.surface"
          >
            <span
              [style.opacity]="sample.adhesion"
              [class.broken]="sample.adhesion < 0.5"
              [class.spread]="sample.spread > 0.2"
              >\u2723</span
            ><small>{{ sample.surface === 'paper' ? 'P' : 'M' }} \xB7 {{ inkMark(sample.ink) }}</small>
          </div>
        }
      </div>
    </div>
  }

  @if (packingEditable()) {
    <div
      class="packing-bench"
      role="group"
      aria-label="Packing beneath the left, middle and right of the forme"
    >
      @for (region of marks; track region) {
        <button
          [attr.aria-label]="
            ['Left', 'Middle', 'Right'][region] +
            ' packing: ' +
            r.settings().packing[region] +
            ' layers. Change packing.'
          "
          (click)="r.cyclePacking(region)"
        >
          <span class="pad-stack">
            @for (layer of marks; track layer) {
              <i [class.present]="r.settings().packing[region] > layer"></i>
            }</span
          ><small>{{ ['L', 'M', 'R'][region] }}</small>
        </button>
      }
    </div>
  }

  <div class="proof-line" aria-label="Earlier proofs">
    @for (trial of visibleTrials(); track trial.id) {
      <button
        [attr.aria-label]="'Inspect proof ' + trial.id"
        [attr.aria-pressed]="r.proof()?.id === trial.id"
        (click)="r.selectedProof.set(trial.id); lens.showModal()"
      >
        <app-press-proof [proof]="trial" />
      </button>
    }
  </div>

  <dialog #lens class="proof-lens" aria-label="Magnified proof">
    <button class="close-lens" (click)="lens.close()" aria-label="Close magnified proof">\xD7</button>
    <app-press-proof [proof]="r.proof()" />
    @if (r.proof(); as p) {
      <div class="proof-settings">
        <span>Ink {{ inkMark(p.settings.ink) }}</span
        ><span>Pressure {{ p.settings.pressure + 1 }}</span
        ><span>Packing {{ p.settings.packing.join(' / ') }}</span>
      </div>
    }
  </dialog>
</section>
`, styles: ["/* src/app/templates/time-repair/invention/press-workbench.component.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n* {\n  box-sizing: border-box;\n}\n.press-scene {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  isolation: isolate;\n  background: #2d3635;\n  container-type: inline-size;\n}\n.workshop-art {\n  display: block;\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\nbutton {\n  font: inherit;\n  color: #293b38;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n}\nbutton:focus-visible {\n  outline: 3px solid #bcf5e4;\n  outline-offset: 4px;\n  z-index: 5;\n}\n.object-action {\n  position: absolute;\n  background: #e6c691;\n  border: 2px solid #72513a;\n  box-shadow: 0 4px 0 #503a2d, 0 0 0 6px rgba(255, 229, 179, 0.0941176471);\n  border-radius: 50%;\n  min-width: 54px;\n  min-height: 54px;\n}\n.press-handle {\n  left: 76%;\n  top: 29%;\n  width: 66px;\n  height: 66px;\n  display: grid;\n  place-content: center;\n  transition: transform 0.18s;\n}\n.press-handle:hover {\n  transform: translateY(3px);\n  background: #f7dca8;\n}\n.press-handle span {\n  font-size: 29px;\n  line-height: 0.9;\n}\n.press-handle small {\n  font: 700 10px Arial, sans-serif;\n  margin-top: 4px;\n}\n.reference-ink,\n.reference-paper {\n  position: absolute;\n  top: 77%;\n  left: 45%;\n  width: 80px;\n  min-height: 66px;\n  padding: 5px;\n  border: 1px solid #bc9b64;\n  border-radius: 6px;\n  background: #624c35;\n  color: #ead0a1;\n  box-shadow: 3px 5px rgba(53, 44, 36, 0.4392156863);\n}\n.reference-ink > span {\n  display: block;\n  margin: 0 auto 5px;\n  width: 43px;\n  height: 31px;\n  border-radius: 50%;\n  background: #b2905a;\n  color: #252b2a;\n  font-size: 32px;\n  line-height: 0.8;\n}\n.reference-paper {\n  left: 66%;\n  transform: rotate(3deg);\n  background: #e7d5ac;\n  color: #67573d;\n}\n.reference-paper > span {\n  display: block;\n  font-size: 30px;\n  line-height: 1;\n  margin-bottom: 5px;\n}\n.reference-ink small,\n.reference-paper small {\n  font: 10px Arial, sans-serif;\n}\n.reference-ink[aria-pressed=true],\n.reference-paper[aria-pressed=true] {\n  outline: 2px solid #bcebd2;\n  outline-offset: 3px;\n}\n.lever {\n  transform-origin: 611px 334px;\n}\n.has-proof.pressing .lever {\n  animation: lever-pull 0.7s ease;\n}\n.has-proof:not(.pressing) .lever {\n  animation: lever-pull-again 0.7s ease;\n}\n.has-proof.pressing .platen {\n  animation: platen-stroke 0.7s ease;\n}\n.has-proof:not(.pressing) .platen {\n  animation: platen-stroke-again 0.7s ease;\n}\n@keyframes lever-pull {\n  40%, 65% {\n    transform: rotate(7deg);\n  }\n}\n@keyframes lever-pull-again {\n  40%, 65% {\n    transform: rotate(7deg);\n  }\n}\n@keyframes platen-stroke {\n  40%, 65% {\n    transform: translateY(19px);\n  }\n}\n@keyframes platen-stroke-again {\n  40%, 65% {\n    transform: translateY(19px);\n  }\n}\n.fresh-proof {\n  position: absolute;\n  left: 4%;\n  top: 34%;\n  width: 25%;\n  height: 36%;\n  padding: 0;\n  transform: rotate(-5deg);\n  background: transparent;\n  border: 0;\n  filter: drop-shadow(8px 15px 8px rgba(17, 32, 32, 0.3960784314));\n}\n.fresh-proof:disabled {\n  cursor: default;\n}\n.magnify-mark {\n  position: absolute;\n  right: 9%;\n  bottom: 4%;\n  font-size: 28px;\n  color: #6b5f46;\n}\n.fresh-proof:disabled .magnify-mark {\n  display: none;\n}\n.proof-stamp {\n  position: absolute;\n  left: 13%;\n  top: 68%;\n  font: 14px Georgia, serif;\n  color: #f5e4be;\n}\n.proof-stamp > span {\n  color: #eac17c;\n  margin-left: 6px;\n}\n.pressure-control {\n  position: absolute;\n  left: 48%;\n  top: 34%;\n  display: flex;\n  gap: 3px;\n  padding: 6px 7px 18px;\n  background: rgba(69, 53, 42, 0.8509803922);\n  border: 1px solid #c09860;\n  border-radius: 8px;\n}\n.pressure-control button {\n  width: 36px;\n  min-height: 40px;\n  display: grid;\n  place-items: center;\n  border: 0;\n  border-radius: 3px;\n  background: #1b292b;\n}\n.pressure-control button[aria-pressed=true] {\n  background: #e8c58c;\n}\n.pressure-control button span {\n  display: block;\n  width: 7px;\n  background: #9eafa5;\n}\n.pressure-control button[aria-pressed=true] span {\n  background: #4a3d2d;\n}\n.pressure-control small {\n  position: absolute;\n  bottom: 3px;\n  width: 100%;\n  text-align: center;\n  left: 0;\n  font: 9px Arial, sans-serif;\n  color: #f5e4be;\n}\n.type-case {\n  position: absolute;\n  left: 6%;\n  top: 76%;\n  width: 60%;\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 12px;\n  background: #3c3029;\n  border: 3px solid #bc9260;\n  box-shadow: 4px 8px 12px rgba(51, 34, 31, 0.4392156863);\n}\n.type-block {\n  position: relative;\n  width: 16%;\n  height: 58px;\n  border: 2px solid #a4b1aa;\n  border-radius: 2px;\n  background:\n    linear-gradient(\n      125deg,\n      #b8c0b8,\n      #667775 50%,\n      #314342);\n  box-shadow: 0 6px 0 #263c3e;\n}\n.type-block b {\n  display: block;\n  transform: scaleX(-1);\n  font: bold 33px Georgia, serif;\n  color: #192c30;\n  text-shadow: 0 1px #dce3d3;\n}\n.type-block span {\n  position: absolute;\n  bottom: -21px;\n  font: 10px Arial, sans-serif;\n  left: 40%;\n  color: #dec6a0;\n}\n.type-block[aria-pressed=true] {\n  transform: translateY(-10px);\n  outline: 3px solid #eccc87;\n  box-shadow: 0 10px 12px rgba(29, 34, 38, 0.6666666667);\n}\n.specimen {\n  position: absolute;\n  left: 73%;\n  top: 68%;\n  width: 23%;\n  padding: 10px 8px;\n  background: #e4d5ad;\n  border: 1px solid #a88e5f;\n  box-shadow: 4px 7px 9px rgba(51, 34, 31, 0.3764705882);\n  transform: rotate(4deg);\n  text-align: center;\n}\n.specimen small {\n  display: block;\n  font: 8px Arial, sans-serif;\n  letter-spacing: 0.2em;\n  color: #776b51;\n}\n.specimen span {\n  display: block;\n  margin-top: 10px;\n  font: 700 clamp(18px, 3cqw, 30px) Georgia, serif;\n  letter-spacing: 0.07em;\n}\n.ink-pots {\n  position: absolute;\n  top: 77%;\n  left: 6%;\n  width: 29%;\n  display: flex;\n  justify-content: space-between;\n}\n.ink-pot {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  width: 29%;\n  min-height: 61px;\n  background:\n    linear-gradient(\n      90deg,\n      #684632,\n      #ad8054 50%,\n      #694831);\n  border: 2px solid #553e2c;\n  border-radius: 40% 40% 25% 25%;\n  box-shadow: 0 5px 0 #433127;\n  padding: 5px 3px;\n}\n.ink-well {\n  border-radius: 50%;\n  border: 3px solid #c89b64;\n  width: 100%;\n  height: 23px;\n  box-shadow: inset 3px 2px 4px #141b27;\n}\n.ink-pot b {\n  display: block;\n  width: 22px;\n  margin-top: 3px;\n  background: #e6d0a7;\n  color: #523d2a;\n  font: 12px Georgia, serif;\n}\n.ink-pot[aria-pressed=true] {\n  outline: 3px solid #e6c586;\n  outline-offset: 5px;\n}\n.material-bench {\n  position: absolute;\n  left: 40%;\n  top: 74%;\n  width: 54%;\n  height: 21%;\n}\n.sample-surfaces {\n  display: flex;\n  gap: 6px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.sample-surfaces button {\n  min-width: 54px;\n  min-height: 36px;\n  padding: 4px;\n  border: 1px solid #ad9874;\n  background: #e9d6ad;\n  color: #413d34;\n  font: 10px Arial, sans-serif;\n}\n.sample-surfaces button:last-child {\n  background:\n    linear-gradient(\n      110deg,\n      #acbbb2,\n      #5d6e6b);\n}\n.sample-surfaces button[aria-pressed=true] {\n  outline: 2px solid #ecce8e;\n  outline-offset: 3px;\n}\n.ink-dabber {\n  position: absolute;\n  right: 0;\n  top: -8px;\n  width: 58px;\n  height: 58px;\n  border: 0;\n  background: transparent;\n  color: #e5c68f;\n}\n.ink-dabber > span {\n  display: block;\n  width: 42px;\n  height: 34px;\n  margin: auto;\n  border-radius: 50%;\n  color: #282d2a;\n  background: #3b3630;\n  border: 4px solid #b28a55;\n  box-shadow: 2px 5px 0 #4c382a;\n  font-size: 24px;\n}\n.ink-dabber small {\n  display: block;\n  margin-top: 5px;\n  font: 10px Arial, sans-serif;\n}\n.material-samples {\n  display: flex;\n  gap: 10px;\n  margin-top: 48px;\n}\n.sample {\n  width: 20%;\n  height: 62px;\n  background: #e8d9b8;\n  border: 1px solid #c0ae89;\n  text-align: center;\n  box-shadow: 3px 5px rgba(71, 55, 41, 0.4);\n}\n.sample.metal {\n  background:\n    linear-gradient(\n      120deg,\n      #adb6ad,\n      #6c7872);\n  border-color: #536460;\n}\n.sample > span {\n  font: bold 38px/1 Georgia, serif;\n  color: #1f2428;\n}\n.sample > .broken {\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 4px,\n      #e3d7b5 5px 7px);\n}\n.sample > .spread {\n  text-shadow: 1px 1px 1px #1f2428, -1px -1px 2px #1f2428;\n}\n.sample small {\n  display: block;\n  font: 9px Arial, sans-serif;\n  color: #283e3c;\n}\n.packing-bench {\n  position: absolute;\n  left: 43%;\n  top: 74%;\n  width: 41%;\n  display: flex;\n  justify-content: space-around;\n  padding: 9px;\n  border: 3px solid #ad8a5e;\n  background: #382c26;\n  box-shadow: 3px 6px 9px rgba(48, 40, 31, 0.5333333333);\n}\n.packing-bench button {\n  position: relative;\n  background: transparent;\n  border: 1px solid #77684e;\n  border-radius: 3px;\n  width: 27%;\n  min-height: 70px;\n  padding: 4px;\n}\n.pad-stack {\n  height: 46px;\n  display: flex;\n  flex-direction: column-reverse;\n  justify-content: start;\n}\n.pad-stack i {\n  display: block;\n  height: 10px;\n  margin-top: 3px;\n  background: rgba(187, 160, 121, 0.2);\n  border: 1px dashed #958465;\n  transform: skewY(-5deg);\n}\n.pad-stack i.present {\n  background: #e4cfa5;\n  border: 1px solid #b49668;\n  box-shadow: 2px 3px #5a4531;\n}\n.packing-bench small {\n  color: #f0d7aa;\n  font: 10px Arial, sans-serif;\n}\n.proof-line {\n  position: absolute;\n  right: 4%;\n  top: 17%;\n  display: flex;\n  gap: 5px;\n  width: 23%;\n  border-top: 1px solid #aa9b7d;\n  padding-top: 9px;\n  justify-content: end;\n}\n.proof-line button {\n  background: none;\n  border: 0;\n  padding: 0;\n  width: 18%;\n  min-height: 44px;\n  transform: rotate(4deg);\n  filter: drop-shadow(2px 4px 4px #10201f);\n}\n.proof-line button:nth-child(even) {\n  transform: rotate(-6deg);\n}\n.proof-line button[aria-pressed=true] {\n  outline: 2px solid #d7bf80;\n  outline-offset: 2px;\n}\n.proof-lens {\n  width: min(440px, 100vw - 28px);\n  max-height: 90dvh;\n  padding: 30px 36px 18px;\n  border: 1px solid #be9b64;\n  border-radius: 12px;\n  background: #273b39;\n  color: #f2e7cf;\n  box-shadow: 0 20px 50px #071d29;\n}\n.proof-lens::backdrop {\n  background: rgba(16, 40, 39, 0.768627451);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.proof-lens app-press-proof {\n  height: min(60dvh, 470px);\n}\n.close-lens {\n  position: absolute;\n  right: 3px;\n  top: 3px;\n  width: 44px;\n  height: 44px;\n  color: white;\n  background: transparent;\n  border: 0;\n  font-size: 28px;\n}\n.proof-settings {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 8px 15px;\n  font: 11px/1.6 Arial, sans-serif;\n  margin-top: 15px;\n}\n[data-mode=production] .type-case {\n  top: 74%;\n  left: 39%;\n  width: 47%;\n  padding: 6px 9px;\n}\n[data-mode=production] .type-block {\n  height: 40px;\n}\n[data-mode=production] .type-block b {\n  font-size: 25px;\n}\n[data-mode=production] .type-block span {\n  display: none;\n}\n[data-mode=production] .packing-bench {\n  top: 85%;\n  left: 39%;\n  width: 47%;\n  padding: 3px 6px;\n}\n[data-mode=production] .packing-bench button {\n  min-height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n[data-mode=production] .pad-stack {\n  height: 32px;\n  width: 50%;\n}\n[data-mode=production] .pad-stack i {\n  height: 7px;\n  margin-top: 2px;\n}\n[data-mode=production] .specimen {\n  top: 56%;\n  left: 77%;\n  width: 19%;\n  padding: 6px;\n}\n@container (max-width: 600px) {\n  .press-handle {\n    width: 52px;\n    height: 52px;\n  }\n  .fresh-proof {\n    width: 29%;\n    left: 2%;\n  }\n  .pressure-control {\n    left: 39%;\n    top: 35%;\n    padding: 3px 3px 18px;\n    gap: 1px;\n  }\n  .pressure-control button {\n    width: 36px;\n  }\n  .type-case {\n    left: 4%;\n    width: 66%;\n    padding: 8px;\n  }\n  .type-block {\n    min-height: 48px;\n    height: 48px;\n  }\n  .type-block b {\n    font-size: 27px;\n  }\n  .ink-pots {\n    width: 33%;\n    left: 5%;\n  }\n  .ink-pot {\n    min-width: 40px;\n    padding: 4px 2px;\n  }\n  .material-bench {\n    left: 44%;\n    width: 51%;\n  }\n  .sample-surfaces {\n    gap: 4px;\n  }\n  .sample-surfaces button {\n    min-width: 47px;\n    min-height: 40px;\n  }\n  .ink-dabber {\n    top: -3px;\n    right: -8px;\n    width: 44px;\n  }\n  .material-samples {\n    gap: 5px;\n  }\n  .sample {\n    width: 22%;\n  }\n  .proof-line {\n    width: 36%;\n    right: 5%;\n    top: 15%;\n    gap: 7px;\n  }\n  .proof-line button {\n    min-width: 25px;\n  }\n  .specimen {\n    left: 76%;\n    width: 20%;\n  }\n  [data-mode=production] .type-case {\n    width: 58%;\n    left: 39%;\n    top: 70%;\n  }\n  [data-mode=production] .type-block {\n    min-height: 44px;\n  }\n  [data-mode=production] .packing-bench {\n    width: 55%;\n    left: 40%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  .lever,\n  .platen {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=press-workbench.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PressWorkbenchComponent, { className: "PressWorkbenchComponent", filePath: "src/app/templates/time-repair/invention/press-workbench.component.ts", lineNumber: 12 });
})();

// src/app/templates/time-repair/invention/courtyard-scene.component.ts
function CourtyardSceneComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 33);
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    \u0275\u0275attribute("d", "M" + (337 + i_r1 * 33) + " 104l125 104");
  }
}
function CourtyardSceneComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 112)(1, "path", 113);
  }
}
function CourtyardSceneComponent_For_70_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 114);
  }
  if (rf & 2) {
    const row_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("d", "M" + (225 + row_r2 * 3) + " " + (572 + row_r2 * 2) + "l21-3");
  }
}
function CourtyardSceneComponent_For_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CourtyardSceneComponent_For_70_Conditional_0_Template, 1, 1, ":svg:path", 114);
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(row_r2 < ctx_r2.flow().strokes % 3 * 2 || ctx_r2.flow().strokes > 0 && ctx_r2.flow().strokes % 3 === 0 ? 0 : -1);
  }
}
function CourtyardSceneComponent_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 78);
  }
  if (rf & 2) {
    const page_r4 = ctx.$implicit;
    \u0275\u0275attribute("d", "M438 " + (600 - page_r4 * 4) + "l55-5 36 19-58 9z");
  }
}
function CourtyardSceneComponent_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "path", 115)(2, "path", 116);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const book_r5 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(0," + -book_r5 * 9 + ")");
  }
}
function CourtyardSceneComponent_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 117)(1, "path", 118);
  }
}
function CourtyardSceneComponent_For_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "path", 119)(2, "path", 120)(3, "path", 121);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const copy_r6 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(" + (791 + copy_r6 * 31) + ",754)");
  }
}
function CourtyardSceneComponent_Conditional_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 109);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.paperCount());
  }
}
function CourtyardSceneComponent_Conditional_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 110);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.flow().finished);
  }
}
var CourtyardSceneComponent = class _CourtyardSceneComponent {
  r = inject(InventionRuntime);
  restored = computed(
    () => this.r.session().mode === "return" && this.r.repaired(),
    ...ngDevMode ? [{ debugName: "restored" }] : (
      /* istanbul ignore next */
      []
    )
  );
  flow = computed(
    () => this.r.state().flow,
    ...ngDevMode ? [{ debugName: "flow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paperCount = computed(
    () => this.flow().sheets + (this.restored() ? this.r.state().trials.filter((p) => p.usable).length - this.flow().supplied : 0),
    ...ngDevMode ? [{ debugName: "paperCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pages = computed(
    () => Array.from({ length: Math.min(6, this.paperCount()) }, (_, i) => i),
    ...ngDevMode ? [{ debugName: "pages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finished = computed(
    () => Array.from({ length: Math.min(4, this.flow().finished) }, (_, i) => i),
    ...ngDevMode ? [{ debugName: "finished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  delivered = computed(
    () => Array.from({ length: Math.min(3, this.flow().delivered) }, (_, i) => i),
    ...ngDevMode ? [{ debugName: "delivered" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rows = [0, 1, 2, 3, 4, 5];
  roofTiles = Array.from({ length: 15 }, (_, i) => i);
  static \u0275fac = function CourtyardSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CourtyardSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CourtyardSceneComponent, selectors: [["app-courtyard-scene"]], decls: 143, vars: 18, consts: [["aria-label", "Bookseller\u2019s courtyard. Operate the scribe, binder, and messenger to follow a commission.", 1, "courtyard"], ["viewBox", "0 0 1100 820", "preserveAspectRatio", "none", "aria-hidden", "true"], ["id", "court-sky", "x2", "0", "y2", "1"], ["stop-color", "#718d8d"], ["offset", "1", "stop-color", "#d7c4a0"], ["id", "court-plaster", "x2", "0", "y2", "1"], ["stop-color", "#c8b792"], ["offset", "1", "stop-color", "#a19376"], ["id", "court-ground", "x2", "0", "y2", "1"], ["stop-color", "#958b72"], ["offset", "1", "stop-color", "#494e48"], ["id", "court-roof", "x2", "0", "y2", "1"], ["stop-color", "#9a6650"], ["offset", "1", "stop-color", "#514a41"], ["id", "court-table", "x2", "0", "y2", "1"], ["stop-color", "#c49661"], ["offset", "1", "stop-color", "#765135"], ["id", "court-glow"], ["stop-color", "#ffe7b0", "stop-opacity", ".26"], ["offset", "1", "stop-color", "#ffe7b0", "stop-opacity", "0"], ["id", "court-stone", "width", "114", "height", "53", "patternUnits", "userSpaceOnUse", "patternTransform", "skewX(-19)"], ["d", "M0 51h114M0 0v51M56 0v25M56 27h58", "stroke", "#c2b795", "stroke-opacity", ".22", "stroke-width", "2", "fill", "none"], ["width", "1100", "height", "820", "fill", "url(#court-sky)"], ["d", "M697 209V99l35-74 39 75v127zM742 207V67l41-48 36 60v145zM815 225V101l45-31 52 51v137", "fill", "#637b76", "opacity", ".5"], ["d", "M0 440L1100 422V820H0Z", "fill", "url(#court-ground)"], ["d", "M0 460L1100 420V820H0Z", "fill", "url(#court-stone)"], ["d", "M0 93L178 43l146 173v266L0 552Z", "fill", "#625d4c"], ["d", "M-16 101L164 19l183 188-30 16L164 57 0 129Z", "fill", "url(#court-roof)"], ["d", "M30 133l252 112v188L30 492Z", "fill", "url(#court-plaster)"], ["d", "M31 130v365M157 184v283M286 228v206M22 300l272 19M22 391l272-16M31 300l126-114M157 303l126-74M31 389l124-84M164 375l119-56", "stroke", "#4a4638", "stroke-width", "15"], ["d", "M57 174l65 28v79l-65-13zM188 228l61 26v47l-61-6z", "fill", "#333e38", "stroke", "#736a50", "stroke-width", "7"], ["d", "M81 184v90M215 242v55", "stroke", "#8f876a", "stroke-width", "4"], ["d", "M330 98L829 74L990 201L344 243Z", "fill", "url(#court-roof)", "stroke", "#52483c", "stroke-width", "7"], ["stroke", "#cd9a6b", "stroke-opacity", ".16", "stroke-width", "2"], ["d", "M386 139l506-18M416 166l510-14M441 195l508-14", "stroke", "#372f29", "stroke-opacity", ".25", "stroke-width", "4"], ["d", "M344 243L960 207v298L344 488Z", "fill", "url(#court-plaster)"], ["d", "M350 246v252M600 229v268M955 210v306M348 329l610-28M348 432l610-19", "stroke", "#514b3b", "stroke-width", "14"], ["d", "M355 253l239 69M611 313l172-97M607 420l188-113M793 308l160 99", "stroke", "#625341", "stroke-width", "9"], ["d", "M384 269h81v50h-81zM490 264h76v55h-76zM685 262h76v46h-76zM808 254h92v45h-92z", "fill", "#3b4942", "stroke", "#968a69", "stroke-width", "5"], ["d", "M423 269v50M528 266v52M723 265v42M852 257v39", "stroke", "#b0a07b", "stroke-width", "3"], ["d", "M631 484V374q0-40 51-43q51 3 51 43v110Z", "fill", "#273b37", "stroke", "#8c7956", "stroke-width", "8"], ["d", "M648 469V381h14v88M704 469v-88h14v88M651 391h65M652 454h65", "stroke", "#c0915f", "stroke-width", "8"], ["d", "M681 366v68M661 435h40", "stroke", "#a99267", "stroke-width", "7"], ["d", "M700 416l30-15", "stroke", "#d1b883", "stroke-width", "5"], ["d", "M847 489v-93q0-33 42-33q42 0 42 33v100", "fill", "#414637", "stroke", "#89734e", "stroke-width", "9"], ["d", "M813 365h154l18 15H800Z", "fill", "#806747"], ["d", "M361 348L752 330L803 428L303 451Z", "fill", "#b9af86", "stroke", "#6a684c", "stroke-width", "4"], ["d", "M414 346l-4 97M520 341l28 96M626 336l60 95M726 332l64 94", "stroke", "#536b61", "stroke-width", "49", "opacity", ".85"], ["d", "M305 450v158M799 427v161", "stroke", "#615039", "stroke-width", "10"], ["d", "M307 450q49 24 101-7q68 24 137-6q71 25 142-7q57 25 110-3", "fill", "#9a9c73", "stroke", "#707252", "stroke-width", "4"], ["cx", "358", "cy", "364", "rx", "442", "ry", "369", "fill", "url(#court-glow)"], ["cx", "187", "cy", "653", "rx", "137", "ry", "28", "fill", "#253733", "opacity", ".35"], ["d", "M109 611l19 65M240 601l17 72", "stroke", "#42372b", "stroke-width", "15"], ["d", "M117 583q-10-105 55-123q68-5 75 103l-52 52Z", "fill", "#666f67", "stroke", "#3b4d47", "stroke-width", "3"], ["d", "M158 494l26 25 28-27-14-29-33 1z", "fill", "#e5cdb0"], ["d", "M151 448q-3-30 27-36q34-2 34 32l-8 33-28 5-22-17z", "fill", "#c99e78"], ["d", "M144 438q4-38 46-32q33 5 29 27l-38-8-34 17z", "fill", "#604b3c"], ["d", "M151 464l14 28 34 1 12-24-29 14z", "fill", "#b4b2a0"], ["d", "M124 527l39 34 40-12M224 522l-16 26 44 17", "fill", "none", "stroke", "#7d877a", "stroke-width", "21", "stroke-linecap", "round"], ["d", "M195 551l25 6M247 564l13 2", "stroke", "#cfaa83", "stroke-width", "12", "stroke-linecap", "round"], ["d", "M72 572l174-27 74 43-195 33z", "fill", "url(#court-table)", "stroke", "#5c452f", "stroke-width", "5"], ["d", "M128 622v43M292 594v46", "stroke", "#634a32", "stroke-width", "12"], ["d", "M108 576l76-12 37 22-82 13z", "fill", "#e6d3aa", "stroke", "#b69b70"], ["d", "M170 568l10 26", "stroke", "#ad8d65", "stroke-width", "2"], ["d", "M216 571l41-7 31 20-45 8z", "fill", "#efe0ba"], ["d", "M257 565l24-44q-7-23-23-6l-1 50 13-25", "fill", "#e4dfc7", "stroke", "#826f4f", "stroke-width", "1.5", 1, "quill"], ["cx", "106", "cy", "565", "rx", "12", "ry", "6", "fill", "#444338", "stroke", "#b19b72", "stroke-width", "4"], ["cx", "547", "cy", "683", "rx", "175", "ry", "35", "fill", "#28342f", "opacity", ".35"], ["d", "M507 594q-16-110 37-137q53 10 75 123l-49 40z", "fill", "#a57651", "stroke", "#78553c", "stroke-width", "3"], ["d", "M523 489l34-6 12 105-42 5z", "fill", "#d3bd8d"], ["d", "M523 433q3-31 30-25q26 5 20 34l-8 31-21 10-24-23Z", "fill", "#c99670"], ["d", "M515 428q4-40 39-34q35 4 24 35l-21-5-31 12z", "fill", "#373e36"], ["d", "M510 514l-13 43 41 31M590 511l18 41-24 33", "stroke", "#98704e", "stroke-width", "23", "stroke-linecap", "round", "fill", "none"], ["d", "M534 585l18 4M580 585l-18 4", "stroke", "#cda17c", "stroke-width", "12", "stroke-linecap", "round"], ["d", "M414 590l231-17 106 59-256 32z", "fill", "url(#court-table)", "stroke", "#644a31", "stroke-width", "5"], ["d", "M495 663v51M726 635v51M430 600v47", "stroke", "#584631", "stroke-width", "13"], ["d", "M484 603l58-8 40 23-63 10zM489 611l55-7 30 17", "fill", "#925c3d", "stroke", "#593b2b", "stroke-width", "3"], ["d", "M603 608l39-5 29 16-39 6zM608 620l39-5 27 13-39 8z", "fill", "#82533a", "stroke", "#593a28", "stroke-width", "3"], ["fill", "#eee0bd", "stroke", "#c2ad85"], ["d", "M570 601l-18 24M568 601l15 23", "stroke", "#605c46", "stroke-width", "3"], ["cx", "548", "cy", "628", "r", "5", "fill", "none", "stroke", "#605c46", "stroke-width", "3"], ["cx", "892", "cy", "718", "rx", "104", "ry", "24", "fill", "#273832", "opacity", ".4"], ["d", "M854 628l-5 80 22 4 25-84M901 632l11 74 21-3-4-98", "fill", "#404b42", "stroke", "#303d37", "stroke-width", "5"], ["d", "M848 706l-16 13q6 12 38 3l2-11M912 702l2 18 31-2q4-11-17-15", "fill", "#44392e"], ["d", "M842 632l3-102q1-30 40-36q42 10 55 122l-52 24z", "fill", "#687c72", "stroke", "#43574f", "stroke-width", "3"], ["d", "M863 492l27 12 18-11-9-28-32 1z", "fill", "#c19a77"], ["d", "M862 451q1-28 25-28q31 3 30 27l-16 33-25 2-17-17z", "fill", "#cca380"], ["d", "M850 442q18-40 51-25l15 23 20 10-62 8-34-7Z", "fill", "#655941", "stroke", "#403c2f", "stroke-width", "3"], ["d", "M909 514l-46 107", "stroke", "#ad8b59", "stroke-width", "9"], ["d", "M829 603l38 9 3 49-42-10z", "fill", "#937046", "stroke", "#524530", "stroke-width", "3"], ["d", "M925 548l21 44-24 30M854 544l-19 34 33 12", "fill", "none", "stroke", "#798c7b", "stroke-width", "22", "stroke-linecap", "round"], ["d", "M920 621l-9 7M863 590l14 4", "stroke", "#c7a07b", "stroke-width", "12", "stroke-linecap", "round"], ["transform", "translate(10, 70) scale(.63)"], ["d", "M1430 640l4-94q24-57 70-1l15 89z", "fill", "#763c35"], ["cx", "1472", "cy", "506", "r", "24", "fill", "#b98e6c"], ["d", "M1445 499q17-41 49-12l10 20h-62", "fill", "#423d32"], ["d", "M1457 557l33 13-6 37-31-14Z", "fill", "#d0a259"], ["d", "M1444 634v47M1499 634v47", "stroke", "#3f3e32", "stroke-width", "15"], ["transform", "translate(108,70) scale(.61)"], ["d", "M1430 640l4-94q24-57 70-1l15 89z", "fill", "#696c5c"], ["d", "M1447 495q9-22 36-19l10 18", "stroke", "#514232", "stroke-width", "11", "fill", "none"], ["d", "M1010 762q-24-80 19-109q20 22 2 47q43-26 57 4q-10 37-49 30l7 41Z", "fill", "#657357"], ["d", "M999 755h60l-8 60h-44Z", "fill", "#946549", "stroke", "#694b34", "stroke-width", "3"], ["d", "M4 731l39 13-7 76H0Z", "fill", "#605743"], ["aria-label", "Operate the scribe: copy part of the manuscript", 1, "station", "scribe", 3, "click"], ["aria-hidden", "true"], ["aria-label", "Operate the binder: finish a copy if pages are available", 1, "station", "binder", 3, "click"], ["aria-label", "Send the messenger with a finished copy", 1, "station", "courier", 3, "click"], ["aria-label", "Inspect the patron and the reader who cannot afford a copy", 1, "access-object", 3, "click"], ["aria-label", "Available sample sheets", 1, "object-count", "sheets"], ["aria-label", "Finished copies", 1, "object-count", "bound"], [1, "copy-progress"], ["d", "M639 350v134h43V342zM689 342v142h34V354z", "fill", "#675039", "stroke", "#382f25", "stroke-width", "3"], ["d", "M632 400l105 49", "stroke", "#ae8b59", "stroke-width", "10"], ["stroke", "#594e3b", "stroke-width", "1.5"], ["d", "M640 628l43-6 29 18-45 6z", "fill", "#8e4934", "stroke", "#49392c", "stroke-width", "2"], ["d", "M668 646l44-6v5l-44 6z", "fill", "#e4d3af"], ["d", "M874 578l41 13-7 31-41-16Z", "fill", "#94563c", "stroke", "#533c2d", "stroke-width", "3"], ["d", "M871 605l37 14v-6l-37-14", "fill", "#e0cd9f"], ["d", "M0 0l20-3 10 7-22 4z", "fill", "#cba66b", "stroke", "#655b42"], ["d", "M8 8l22-4v10L8 18Z", "fill", "#e5d1a8"], ["d", "M0 0v11l8 7V8Z", "fill", "#8d4e39"]], template: function CourtyardSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(1, "svg", 1)(2, "defs")(3, "linearGradient", 2);
      \u0275\u0275domElement(4, "stop", 3)(5, "stop", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "linearGradient", 5);
      \u0275\u0275domElement(7, "stop", 6)(8, "stop", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "linearGradient", 8);
      \u0275\u0275domElement(10, "stop", 9)(11, "stop", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "linearGradient", 11);
      \u0275\u0275domElement(13, "stop", 12)(14, "stop", 13);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "linearGradient", 14);
      \u0275\u0275domElement(16, "stop", 15)(17, "stop", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "radialGradient", 17);
      \u0275\u0275domElement(19, "stop", 18)(20, "stop", 19);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "pattern", 20);
      \u0275\u0275domElement(22, "path", 21);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(23, "rect", 22)(24, "path", 23)(25, "path", 24)(26, "path", 25)(27, "path", 26)(28, "path", 27)(29, "path", 28)(30, "path", 29)(31, "path", 30)(32, "path", 31)(33, "path", 32);
      \u0275\u0275repeaterCreate(34, CourtyardSceneComponent_For_35_Template, 1, 1, ":svg:path", 33, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElement(36, "path", 34)(37, "path", 35)(38, "path", 36)(39, "path", 37)(40, "path", 38)(41, "path", 39)(42, "path", 40);
      \u0275\u0275domElementStart(43, "g");
      \u0275\u0275domElement(44, "path", 41)(45, "path", 42)(46, "path", 43);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(47, CourtyardSceneComponent_Conditional_47_Template, 2, 0);
      \u0275\u0275domElement(48, "path", 44)(49, "path", 45)(50, "path", 46)(51, "path", 47)(52, "path", 48)(53, "path", 49)(54, "ellipse", 50)(55, "ellipse", 51)(56, "path", 52)(57, "path", 53)(58, "path", 54)(59, "path", 55)(60, "path", 56)(61, "path", 57)(62, "path", 58)(63, "path", 59)(64, "path", 60)(65, "path", 61)(66, "path", 62)(67, "path", 63)(68, "path", 64);
      \u0275\u0275repeaterCreate(69, CourtyardSceneComponent_For_70_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElement(71, "path", 65)(72, "ellipse", 66)(73, "ellipse", 67)(74, "path", 68)(75, "path", 69)(76, "path", 70)(77, "path", 71)(78, "path", 72)(79, "path", 73)(80, "path", 74)(81, "path", 75)(82, "path", 76)(83, "path", 77);
      \u0275\u0275repeaterCreate(84, CourtyardSceneComponent_For_85_Template, 1, 1, ":svg:path", 78, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(86, CourtyardSceneComponent_For_87_Template, 3, 1, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElement(88, "path", 79)(89, "circle", 80)(90, "ellipse", 81);
      \u0275\u0275domElementStart(91, "g");
      \u0275\u0275domElement(92, "path", 82)(93, "path", 83)(94, "path", 84)(95, "path", 85)(96, "path", 86)(97, "path", 87)(98, "path", 88)(99, "path", 89)(100, "path", 90)(101, "path", 91);
      \u0275\u0275conditionalCreate(102, CourtyardSceneComponent_Conditional_102_Template, 2, 0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(103, "g", 92);
      \u0275\u0275domElement(104, "path", 93)(105, "circle", 94)(106, "path", 95)(107, "path", 96)(108, "path", 97);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(109, "g", 98);
      \u0275\u0275domElement(110, "path", 99)(111, "circle", 94)(112, "path", 100)(113, "path", 97);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(114, "path", 101)(115, "path", 102)(116, "path", 103);
      \u0275\u0275repeaterCreate(117, CourtyardSceneComponent_For_118_Template, 4, 1, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(119, "button", 104);
      \u0275\u0275domListener("click", function CourtyardSceneComponent_Template_button_click_119_listener() {
        return ctx.r.flow("scribe");
      });
      \u0275\u0275domElementStart(120, "span", 105);
      \u0275\u0275text(121, "\u270E");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(122, "small");
      \u0275\u0275text(123, "Copy");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(124, "button", 106);
      \u0275\u0275domListener("click", function CourtyardSceneComponent_Template_button_click_124_listener() {
        return ctx.r.flow("binder");
      });
      \u0275\u0275domElementStart(125, "span", 105);
      \u0275\u0275text(126, "\u2318");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(127, "small");
      \u0275\u0275text(128, "Bind");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(129, "button", 107);
      \u0275\u0275domListener("click", function CourtyardSceneComponent_Template_button_click_129_listener() {
        return ctx.r.flow("courier");
      });
      \u0275\u0275domElementStart(130, "span", 105);
      \u0275\u0275text(131, "\u2197");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(132, "small");
      \u0275\u0275text(133, "Send");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(134, "button", 108);
      \u0275\u0275domListener("click", function CourtyardSceneComponent_Template_button_click_134_listener() {
        return ctx.r.flow("patron");
      });
      \u0275\u0275domElementStart(135, "span", 105);
      \u0275\u0275text(136, "\u25C8");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(137, CourtyardSceneComponent_Conditional_137_Template, 2, 1, "span", 109);
      \u0275\u0275conditionalCreate(138, CourtyardSceneComponent_Conditional_138_Template, 2, 1, "span", 110);
      \u0275\u0275domElementStart(139, "span", 111);
      \u0275\u0275domElement(140, "i")(141, "i")(142, "i");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("restored", ctx.restored());
      \u0275\u0275advance(34);
      \u0275\u0275repeater(ctx.roofTiles);
      \u0275\u0275advance(9);
      \u0275\u0275attribute("opacity", ctx.restored() ? 1 : 0.3);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.restored() ? 47 : -1);
      \u0275\u0275advance(22);
      \u0275\u0275repeater(ctx.rows);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("writing", ctx.flow().strokes % 2 === 1);
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.pages());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.finished());
      \u0275\u0275advance(5);
      \u0275\u0275classProp("messenger-delivered", ctx.flow().delivered > 0);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.flow().delivered > 0 ? 102 : -1);
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.delivered());
      \u0275\u0275advance(20);
      \u0275\u0275conditional(ctx.paperCount() > 0 ? 137 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.flow().finished > 0 ? 138 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "Manuscript progress: " + ctx.flow().strokes % 3 + " of 3 modeled steps");
      \u0275\u0275advance();
      \u0275\u0275classProp("filled", ctx.flow().strokes % 3 > 0);
      \u0275\u0275advance();
      \u0275\u0275classProp("filled", ctx.flow().strokes % 3 > 1);
      \u0275\u0275advance();
      \u0275\u0275classProp("filled", ctx.flow().strokes > 0 && ctx.flow().strokes % 3 === 0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.courtyard[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n  background: #51625b;\n  isolation: isolate;\n}\nsvg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.station[_ngcontent-%COMP%] {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  min-width: 44px;\n  min-height: 44px;\n  border: 2px solid #806a44;\n  background: #f0d09a;\n  color: #3e4c3e;\n  border-radius: 50%;\n  box-shadow: 0 4px 0 #473e2f, 0 0 0 6px rgba(217, 188, 140, 0.1411764706);\n  cursor: pointer;\n  transform: translateX(-50%);\n  transition: background 0.2s;\n}\n.station[_ngcontent-%COMP%]:hover {\n  background: #ffe6b5;\n}\n.station[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 25px;\n  line-height: 1;\n}\n.station[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 700 10px Arial, sans-serif;\n  margin-top: 2px;\n}\n.scribe[_ngcontent-%COMP%] {\n  left: 22%;\n  top: 74%;\n}\n.binder[_ngcontent-%COMP%] {\n  left: 53%;\n  top: 79%;\n}\n.courier[_ngcontent-%COMP%] {\n  left: 81%;\n  top: 81%;\n}\n.access-object[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 88%;\n  top: 56%;\n  width: 44px;\n  height: 44px;\n  background: rgba(230, 200, 144, 0.9098039216);\n  color: #4b4a39;\n  border: 1px solid #79613d;\n  border-radius: 50%;\n  box-shadow: 0 2px 10px rgba(83, 73, 48, 0.3333333333);\n  cursor: pointer;\n  font-size: 21px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #eefff5;\n  outline-offset: 4px;\n}\n.object-count[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: #173e39;\n  color: #e9d4a7;\n  border: 1px solid #cfb278;\n  display: grid;\n  place-items: center;\n  font: 11px Arial, sans-serif;\n}\n.sheets[_ngcontent-%COMP%] {\n  top: 70%;\n  left: 41%;\n}\n.bound[_ngcontent-%COMP%] {\n  top: 75%;\n  left: 63%;\n}\n.copy-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 74%;\n  left: 12%;\n  display: flex;\n  gap: 4px;\n  transform: rotate(-8deg);\n}\n.copy-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border: 1px solid #ddd0a7;\n  background: #554f3b;\n  border-radius: 50%;\n}\n.copy-progress[_ngcontent-%COMP%]   i.filled[_ngcontent-%COMP%] {\n  background: #f6d590;\n}\n.quill[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n  transform-origin: 257px 565px;\n}\n.quill.writing[_ngcontent-%COMP%] {\n  transform: rotate(-17deg);\n}\n.messenger-delivered[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_messenger-step 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_messenger-step {\n  from {\n    transform: translateX(-12px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@media (max-width: 600px) {\n  .station[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n  }\n  .access-object[_ngcontent-%COMP%] {\n    left: 86%;\n    top: 55%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   .quill[_ngcontent-%COMP%] {\n    animation: none;\n    transition: none;\n  }\n}\n/*# sourceMappingURL=courtyard-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CourtyardSceneComponent, [{
    type: Component,
    args: [{ selector: "app-courtyard-scene", changeDetection: ChangeDetectionStrategy.OnPush, template: `<section
  class="courtyard"
  [class.restored]="restored()"
  aria-label="Bookseller\u2019s courtyard. Operate the scribe, binder, and messenger to follow a commission."
>
  <svg viewBox="0 0 1100 820" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="court-sky" x2="0" y2="1">
        <stop stop-color="#718d8d" />
        <stop offset="1" stop-color="#d7c4a0" />
      </linearGradient>
      <linearGradient id="court-plaster" x2="0" y2="1">
        <stop stop-color="#c8b792" />
        <stop offset="1" stop-color="#a19376" />
      </linearGradient>
      <linearGradient id="court-ground" x2="0" y2="1">
        <stop stop-color="#958b72" />
        <stop offset="1" stop-color="#494e48" />
      </linearGradient>
      <linearGradient id="court-roof" x2="0" y2="1">
        <stop stop-color="#9a6650" />
        <stop offset="1" stop-color="#514a41" />
      </linearGradient>
      <linearGradient id="court-table" x2="0" y2="1">
        <stop stop-color="#c49661" />
        <stop offset="1" stop-color="#765135" />
      </linearGradient>
      <radialGradient id="court-glow">
        <stop stop-color="#ffe7b0" stop-opacity=".26" />
        <stop offset="1" stop-color="#ffe7b0" stop-opacity="0" />
      </radialGradient>
      <pattern
        id="court-stone"
        width="114"
        height="53"
        patternUnits="userSpaceOnUse"
        patternTransform="skewX(-19)"
      >
        <path
          d="M0 51h114M0 0v51M56 0v25M56 27h58"
          stroke="#c2b795"
          stroke-opacity=".22"
          stroke-width="2"
          fill="none"
        />
      </pattern>
    </defs>
    <rect width="1100" height="820" fill="url(#court-sky)" />
    <path
      d="M697 209V99l35-74 39 75v127zM742 207V67l41-48 36 60v145zM815 225V101l45-31 52 51v137"
      fill="#637b76"
      opacity=".5"
    />
    <path d="M0 440L1100 422V820H0Z" fill="url(#court-ground)" />
    <path d="M0 460L1100 420V820H0Z" fill="url(#court-stone)" />
    <path d="M0 93L178 43l146 173v266L0 552Z" fill="#625d4c" />
    <path d="M-16 101L164 19l183 188-30 16L164 57 0 129Z" fill="url(#court-roof)" />
    <path d="M30 133l252 112v188L30 492Z" fill="url(#court-plaster)" />
    <path
      d="M31 130v365M157 184v283M286 228v206M22 300l272 19M22 391l272-16M31 300l126-114M157 303l126-74M31 389l124-84M164 375l119-56"
      stroke="#4a4638"
      stroke-width="15"
    />
    <path
      d="M57 174l65 28v79l-65-13zM188 228l61 26v47l-61-6z"
      fill="#333e38"
      stroke="#736a50"
      stroke-width="7"
    />
    <path d="M81 184v90M215 242v55" stroke="#8f876a" stroke-width="4" />
    <path
      d="M330 98L829 74L990 201L344 243Z"
      fill="url(#court-roof)"
      stroke="#52483c"
      stroke-width="7"
    />
    @for (i of roofTiles; track i) {
      <path
        [attr.d]="'M' + (337 + i * 33) + ' 104l125 104'"
        stroke="#cd9a6b"
        stroke-opacity=".16"
        stroke-width="2"
      />
    }
    <path
      d="M386 139l506-18M416 166l510-14M441 195l508-14"
      stroke="#372f29"
      stroke-opacity=".25"
      stroke-width="4"
    />
    <path d="M344 243L960 207v298L344 488Z" fill="url(#court-plaster)" />
    <path
      d="M350 246v252M600 229v268M955 210v306M348 329l610-28M348 432l610-19"
      stroke="#514b3b"
      stroke-width="14"
    />
    <path
      d="M355 253l239 69M611 313l172-97M607 420l188-113M793 308l160 99"
      stroke="#625341"
      stroke-width="9"
    />
    <path
      d="M384 269h81v50h-81zM490 264h76v55h-76zM685 262h76v46h-76zM808 254h92v45h-92z"
      fill="#3b4942"
      stroke="#968a69"
      stroke-width="5"
    />
    <path d="M423 269v50M528 266v52M723 265v42M852 257v39" stroke="#b0a07b" stroke-width="3" />
    <path
      d="M631 484V374q0-40 51-43q51 3 51 43v110Z"
      fill="#273b37"
      stroke="#8c7956"
      stroke-width="8"
    />
    <g [attr.opacity]="restored() ? 1 : 0.3">
      <path
        d="M648 469V381h14v88M704 469v-88h14v88M651 391h65M652 454h65"
        stroke="#c0915f"
        stroke-width="8"
      />
      <path d="M681 366v68M661 435h40" stroke="#a99267" stroke-width="7" />
      <path d="M700 416l30-15" stroke="#d1b883" stroke-width="5" />
    </g>
    @if (!restored()) {
      <path
        d="M639 350v134h43V342zM689 342v142h34V354z"
        fill="#675039"
        stroke="#382f25"
        stroke-width="3"
      />
      <path d="M632 400l105 49" stroke="#ae8b59" stroke-width="10" />
    }
    <path
      d="M847 489v-93q0-33 42-33q42 0 42 33v100"
      fill="#414637"
      stroke="#89734e"
      stroke-width="9"
    />
    <path d="M813 365h154l18 15H800Z" fill="#806747" />
    <!-- Canvas awning frames the binding stall, and catches the afternoon light. -->
    <path d="M361 348L752 330L803 428L303 451Z" fill="#b9af86" stroke="#6a684c" stroke-width="4" />
    <path
      d="M414 346l-4 97M520 341l28 96M626 336l60 95M726 332l64 94"
      stroke="#536b61"
      stroke-width="49"
      opacity=".85"
    />
    <path d="M305 450v158M799 427v161" stroke="#615039" stroke-width="10" />
    <path
      d="M307 450q49 24 101-7q68 24 137-6q71 25 142-7q57 25 110-3"
      fill="#9a9c73"
      stroke="#707252"
      stroke-width="4"
    />
    <ellipse cx="358" cy="364" rx="442" ry="369" fill="url(#court-glow)" />
    <!-- The scribe, a page in progress, and the supply table. -->
    <ellipse cx="187" cy="653" rx="137" ry="28" fill="#253733" opacity=".35" />
    <path d="M109 611l19 65M240 601l17 72" stroke="#42372b" stroke-width="15" />
    <path
      d="M117 583q-10-105 55-123q68-5 75 103l-52 52Z"
      fill="#666f67"
      stroke="#3b4d47"
      stroke-width="3"
    />
    <path d="M158 494l26 25 28-27-14-29-33 1z" fill="#e5cdb0" />
    <path d="M151 448q-3-30 27-36q34-2 34 32l-8 33-28 5-22-17z" fill="#c99e78" />
    <path d="M144 438q4-38 46-32q33 5 29 27l-38-8-34 17z" fill="#604b3c" />
    <path d="M151 464l14 28 34 1 12-24-29 14z" fill="#b4b2a0" />
    <path
      d="M124 527l39 34 40-12M224 522l-16 26 44 17"
      fill="none"
      stroke="#7d877a"
      stroke-width="21"
      stroke-linecap="round"
    />
    <path
      d="M195 551l25 6M247 564l13 2"
      stroke="#cfaa83"
      stroke-width="12"
      stroke-linecap="round"
    />
    <path
      d="M72 572l174-27 74 43-195 33z"
      fill="url(#court-table)"
      stroke="#5c452f"
      stroke-width="5"
    />
    <path d="M128 622v43M292 594v46" stroke="#634a32" stroke-width="12" />
    <path d="M108 576l76-12 37 22-82 13z" fill="#e6d3aa" stroke="#b69b70" />
    <path d="M170 568l10 26" stroke="#ad8d65" stroke-width="2" />
    <path d="M216 571l41-7 31 20-45 8z" fill="#efe0ba" />
    @for (row of rows; track row) {
      @if (row < (flow().strokes % 3) * 2 || (flow().strokes > 0 && flow().strokes % 3 === 0)) {
        <path
          [attr.d]="'M' + (225 + row * 3) + ' ' + (572 + row * 2) + 'l21-3'"
          stroke="#594e3b"
          stroke-width="1.5"
        />
      }
    }
    <path
      class="quill"
      [class.writing]="flow().strokes % 2 === 1"
      d="M257 565l24-44q-7-23-23-6l-1 50 13-25"
      fill="#e4dfc7"
      stroke="#826f4f"
      stroke-width="1.5"
    />
    <ellipse cx="106" cy="565" rx="12" ry="6" fill="#444338" stroke="#b19b72" stroke-width="4" />
    <!-- The binder works with the output produced upstream. -->
    <ellipse cx="547" cy="683" rx="175" ry="35" fill="#28342f" opacity=".35" />
    <path
      d="M507 594q-16-110 37-137q53 10 75 123l-49 40z"
      fill="#a57651"
      stroke="#78553c"
      stroke-width="3"
    />
    <path d="M523 489l34-6 12 105-42 5z" fill="#d3bd8d" />
    <path d="M523 433q3-31 30-25q26 5 20 34l-8 31-21 10-24-23Z" fill="#c99670" />
    <path d="M515 428q4-40 39-34q35 4 24 35l-21-5-31 12z" fill="#373e36" />
    <path
      d="M510 514l-13 43 41 31M590 511l18 41-24 33"
      stroke="#98704e"
      stroke-width="23"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M534 585l18 4M580 585l-18 4"
      stroke="#cda17c"
      stroke-width="12"
      stroke-linecap="round"
    />
    <path
      d="M414 590l231-17 106 59-256 32z"
      fill="url(#court-table)"
      stroke="#644a31"
      stroke-width="5"
    />
    <path d="M495 663v51M726 635v51M430 600v47" stroke="#584631" stroke-width="13" />
    <path
      d="M484 603l58-8 40 23-63 10zM489 611l55-7 30 17"
      fill="#925c3d"
      stroke="#593b2b"
      stroke-width="3"
    />
    <path
      d="M603 608l39-5 29 16-39 6zM608 620l39-5 27 13-39 8z"
      fill="#82533a"
      stroke="#593a28"
      stroke-width="3"
    />
    @for (page of pages(); track page) {
      <path
        [attr.d]="'M438 ' + (600 - page * 4) + 'l55-5 36 19-58 9z'"
        fill="#eee0bd"
        stroke="#c2ad85"
      />
    }
    @for (book of finished(); track book) {
      <g [attr.transform]="'translate(0,' + -book * 9 + ')'">
        <path d="M640 628l43-6 29 18-45 6z" fill="#8e4934" stroke="#49392c" stroke-width="2" />
        <path d="M668 646l44-6v5l-44 6z" fill="#e4d3af" />
      </g>
    }
    <path d="M570 601l-18 24M568 601l15 23" stroke="#605c46" stroke-width="3" />
    <circle cx="548" cy="628" r="5" fill="none" stroke="#605c46" stroke-width="3" />
    <!-- The messenger and waiting commissions. -->
    <ellipse cx="892" cy="718" rx="104" ry="24" fill="#273832" opacity=".4" />
    <g [class.messenger-delivered]="flow().delivered > 0">
      <path
        d="M854 628l-5 80 22 4 25-84M901 632l11 74 21-3-4-98"
        fill="#404b42"
        stroke="#303d37"
        stroke-width="5"
      />
      <path d="M848 706l-16 13q6 12 38 3l2-11M912 702l2 18 31-2q4-11-17-15" fill="#44392e" />
      <path
        d="M842 632l3-102q1-30 40-36q42 10 55 122l-52 24z"
        fill="#687c72"
        stroke="#43574f"
        stroke-width="3"
      />
      <path d="M863 492l27 12 18-11-9-28-32 1z" fill="#c19a77" />
      <path d="M862 451q1-28 25-28q31 3 30 27l-16 33-25 2-17-17z" fill="#cca380" />
      <path
        d="M850 442q18-40 51-25l15 23 20 10-62 8-34-7Z"
        fill="#655941"
        stroke="#403c2f"
        stroke-width="3"
      />
      <path d="M909 514l-46 107" stroke="#ad8b59" stroke-width="9" />
      <path d="M829 603l38 9 3 49-42-10z" fill="#937046" stroke="#524530" stroke-width="3" />
      <path
        d="M925 548l21 44-24 30M854 544l-19 34 33 12"
        fill="none"
        stroke="#798c7b"
        stroke-width="22"
        stroke-linecap="round"
      />
      <path
        d="M920 621l-9 7M863 590l14 4"
        stroke="#c7a07b"
        stroke-width="12"
        stroke-linecap="round"
      />
      @if (flow().delivered > 0) {
        <path d="M874 578l41 13-7 31-41-16Z" fill="#94563c" stroke="#533c2d" stroke-width="3" />
        <path d="M871 605l37 14v-6l-37-14" fill="#e0cd9f" />
      }
    </g>
    <!-- A wealthy patron still holds access; another reader still waits. -->
    <g transform="translate(10, 70) scale(.63)">
      <path d="M1430 640l4-94q24-57 70-1l15 89z" fill="#763c35" />
      <circle cx="1472" cy="506" r="24" fill="#b98e6c" />
      <path d="M1445 499q17-41 49-12l10 20h-62" fill="#423d32" />
      <path d="M1457 557l33 13-6 37-31-14Z" fill="#d0a259" />
      <path d="M1444 634v47M1499 634v47" stroke="#3f3e32" stroke-width="15" />
    </g>
    <g transform="translate(108,70) scale(.61)">
      <path d="M1430 640l4-94q24-57 70-1l15 89z" fill="#696c5c" />
      <circle cx="1472" cy="506" r="24" fill="#b98e6c" />
      <path d="M1447 495q9-22 36-19l10 18" stroke="#514232" stroke-width="11" fill="none" />
      <path d="M1444 634v47M1499 634v47" stroke="#3f3e32" stroke-width="15" />
    </g>
    <path d="M1010 762q-24-80 19-109q20 22 2 47q43-26 57 4q-10 37-49 30l7 41Z" fill="#657357" />
    <path d="M999 755h60l-8 60h-44Z" fill="#946549" stroke="#694b34" stroke-width="3" />
    <path d="M4 731l39 13-7 76H0Z" fill="#605743" />
    @for (copy of delivered(); track copy) {
      <g [attr.transform]="'translate(' + (791 + copy * 31) + ',754)'">
        <path d="M0 0l20-3 10 7-22 4z" fill="#cba66b" stroke="#655b42" />
        <path d="M8 8l22-4v10L8 18Z" fill="#e5d1a8" />
        <path d="M0 0v11l8 7V8Z" fill="#8d4e39" />
      </g>
    }
  </svg>
  <button
    class="station scribe"
    (click)="r.flow('scribe')"
    aria-label="Operate the scribe: copy part of the manuscript"
  >
    <span aria-hidden="true">\u270E</span><small>Copy</small>
  </button>
  <button
    class="station binder"
    (click)="r.flow('binder')"
    aria-label="Operate the binder: finish a copy if pages are available"
  >
    <span aria-hidden="true">\u2318</span><small>Bind</small>
  </button>
  <button
    class="station courier"
    (click)="r.flow('courier')"
    aria-label="Send the messenger with a finished copy"
  >
    <span aria-hidden="true">\u2197</span><small>Send</small>
  </button>
  <button
    class="access-object"
    (click)="r.flow('patron')"
    aria-label="Inspect the patron and the reader who cannot afford a copy"
  >
    <span aria-hidden="true">\u25C8</span>
  </button>
  @if (paperCount() > 0) {
    <span class="object-count sheets" aria-label="Available sample sheets">{{ paperCount() }}</span>
  }
  @if (flow().finished > 0) {
    <span class="object-count bound" aria-label="Finished copies">{{ flow().finished }}</span>
  }
  <span
    class="copy-progress"
    [attr.aria-label]="'Manuscript progress: ' + (flow().strokes % 3) + ' of 3 modeled steps'"
    ><i [class.filled]="flow().strokes % 3 > 0"></i><i [class.filled]="flow().strokes % 3 > 1"></i
    ><i [class.filled]="flow().strokes > 0 && flow().strokes % 3 === 0"></i
  ></span>
</section>
`, styles: ["/* src/app/templates/time-repair/invention/courtyard-scene.component.scss */\n:host {\n  display: block;\n  height: 100%;\n}\n.courtyard {\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n  background: #51625b;\n  isolation: isolate;\n}\nsvg {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.station {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  min-width: 44px;\n  min-height: 44px;\n  border: 2px solid #806a44;\n  background: #f0d09a;\n  color: #3e4c3e;\n  border-radius: 50%;\n  box-shadow: 0 4px 0 #473e2f, 0 0 0 6px rgba(217, 188, 140, 0.1411764706);\n  cursor: pointer;\n  transform: translateX(-50%);\n  transition: background 0.2s;\n}\n.station:hover {\n  background: #ffe6b5;\n}\n.station span {\n  font-size: 25px;\n  line-height: 1;\n}\n.station small {\n  font: 700 10px Arial, sans-serif;\n  margin-top: 2px;\n}\n.scribe {\n  left: 22%;\n  top: 74%;\n}\n.binder {\n  left: 53%;\n  top: 79%;\n}\n.courier {\n  left: 81%;\n  top: 81%;\n}\n.access-object {\n  position: absolute;\n  left: 88%;\n  top: 56%;\n  width: 44px;\n  height: 44px;\n  background: rgba(230, 200, 144, 0.9098039216);\n  color: #4b4a39;\n  border: 1px solid #79613d;\n  border-radius: 50%;\n  box-shadow: 0 2px 10px rgba(83, 73, 48, 0.3333333333);\n  cursor: pointer;\n  font-size: 21px;\n}\nbutton:focus-visible {\n  outline: 3px solid #eefff5;\n  outline-offset: 4px;\n}\n.object-count {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: #173e39;\n  color: #e9d4a7;\n  border: 1px solid #cfb278;\n  display: grid;\n  place-items: center;\n  font: 11px Arial, sans-serif;\n}\n.sheets {\n  top: 70%;\n  left: 41%;\n}\n.bound {\n  top: 75%;\n  left: 63%;\n}\n.copy-progress {\n  position: absolute;\n  top: 74%;\n  left: 12%;\n  display: flex;\n  gap: 4px;\n  transform: rotate(-8deg);\n}\n.copy-progress i {\n  width: 6px;\n  height: 6px;\n  border: 1px solid #ddd0a7;\n  background: #554f3b;\n  border-radius: 50%;\n}\n.copy-progress i.filled {\n  background: #f6d590;\n}\n.quill {\n  transition: transform 0.2s;\n  transform-origin: 257px 565px;\n}\n.quill.writing {\n  transform: rotate(-17deg);\n}\n.messenger-delivered {\n  animation: messenger-step 0.5s ease-out;\n}\n@keyframes messenger-step {\n  from {\n    transform: translateX(-12px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@media (max-width: 600px) {\n  .station {\n    width: 48px;\n    height: 48px;\n  }\n  .access-object {\n    left: 86%;\n    top: 55%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  .quill {\n    animation: none;\n    transition: none;\n  }\n}\n/*# sourceMappingURL=courtyard-scene.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CourtyardSceneComponent, { className: "CourtyardSceneComponent", filePath: "src/app/templates/time-repair/invention/courtyard-scene.component.ts", lineNumber: 10 });
})();

// src/app/templates/time-repair/invention/knowledge/knowledge.runtime.ts
var KNOWLEDGE_PERSISTENCE = new InjectionToken("KNOWLEDGE_PERSISTENCE");
var KnowledgeRuntime = class _KnowledgeRuntime {
  r = inject(InventionRuntime);
  context = inject(INVENTION_CONTEXT);
  persistence = inject(KNOWLEDGE_PERSISTENCE);
  config = computed(
    () => this.r.session().knowledge,
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = computed(
    () => !!this.config(),
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = signal(
    emptyKnowledge(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = computed(
    () => this.state().message || "Operate the objects. Your observations will appear here.",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storageMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "storageMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  events = signal(
    [],
    ...ngDevMode ? [{ debugName: "events" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visits = /* @__PURE__ */ new Map();
  constructor() {
    effect(() => {
      const config = this.config();
      const session = this.r.session();
      untracked(() => {
        this.storageMessage.set("");
        if (!config) {
          this.state.set(emptyKnowledge());
          this.events.set([]);
          return;
        }
        let events = this.visits.get(session.id) ?? [];
        if (!this.r.example && !this.visits.has(session.id))
          try {
            events = this.persistence.load(session)?.events ?? [];
          } catch {
            this.storageMessage.set("Saved work could not be read. This visit remains usable.");
          }
        if (this.r.example)
          events = [];
        this.events.set(events);
        this.state.set(replayKnowledge(config, events, this.r.project.projectId, session.id) ?? knowledgeActivities[config.kind].initial(config));
      });
    });
  }
  act(action) {
    const c = this.config();
    if (!c)
      return;
    if (this.events().length >= 800) {
      this.storageMessage.set("Notebook full. Download it, then reset this activity from the task box.");
      return;
    }
    const id = crypto.randomUUID();
    const event = {
      id,
      clientEventId: id,
      eventType: `inventionKnowledge.${c.kind}Operated`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      tenantId: this.context.tenantId,
      projectId: this.r.project.projectId,
      attemptId: this.context.attemptId,
      actor: { type: "student", id: this.context.actorId },
      sourceId: this.r.session().id,
      payload: { action }
    };
    const next = applyKnowledgeEvent(c, this.state(), event, this.r.project.projectId, this.r.session().id);
    if (next === this.state())
      return;
    this.state.set(next);
    this.events.update((events) => [...events, event]);
    this.save();
  }
  save() {
    if (this.r.example)
      return;
    this.visits.set(this.r.session().id, this.events());
    try {
      this.persistence.save(this.r.session(), { events: this.events() });
      this.storageMessage.set(this.persistence.available ? "Saved on this device" : "Storage unavailable \xB7 keep this visit open");
    } catch {
      this.storageMessage.set("Could not save. Download this notebook before leaving.");
    }
  }
  reset() {
    const c = this.config();
    if (!c)
      return;
    this.state.set(knowledgeActivities[c.kind].initial(c));
    this.events.set([]);
    this.save();
  }
  export() {
    const blob = new Blob([
      JSON.stringify({
        projectId: this.r.project.projectId,
        projectVersion: this.r.project.projectVersion,
        session: this.r.session().id,
        label: "Local model evidence, not assessment",
        events: this.events(),
        state: this.state()
      }, null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.r.session().id}-knowledge-notebook.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function KnowledgeRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KnowledgeRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _KnowledgeRuntime, factory: _KnowledgeRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KnowledgeRuntime, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/time-repair/invention/knowledge/scene-tools.ts
function KnowledgeRoomComponent_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "rect", 66)(1, "path", 67);
  }
  if (rf & 2) {
    const book_r1 = ctx.$implicit;
    \u0275\u0275attribute("x", 737 + book_r1 * 25)("fill", book_r1 % 2 ? "#aa8060" : "#7e947d");
    \u0275\u0275advance();
    \u0275\u0275attribute("d", "M" + (742 + book_r1 * 25) + " 43v26");
  }
}
function KnowledgeDrawingComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 6);
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    \u0275\u0275attribute("transform", "rotate(" + i_r1 * 15 + " 150 100)");
  }
}
var SceneButtonDirective = class _SceneButtonDirective {
  label = input.required(
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pressed = input(
    null,
    ...ngDevMode ? [{ debugName: "pressed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activate = output();
  key(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.activate.emit();
    }
  }
  static \u0275fac = function SceneButtonDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SceneButtonDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SceneButtonDirective, selectors: [["", "kb", ""]], hostAttrs: ["role", "button", "tabindex", "0"], hostVars: 2, hostBindings: function SceneButtonDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function SceneButtonDirective_click_HostBindingHandler() {
        return ctx.activate.emit();
      })("keydown", function SceneButtonDirective_keydown_HostBindingHandler($event) {
        return ctx.key($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.label())("aria-pressed", ctx.pressed());
    }
  }, inputs: { label: [1, "label"], pressed: [1, "pressed"] }, outputs: { activate: "activate" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SceneButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[kb]",
      host: {
        role: "button",
        tabindex: "0",
        "[attr.aria-label]": "label()",
        "[attr.aria-pressed]": "pressed()",
        "(click)": "activate.emit()",
        "(keydown)": "key($event)"
      }
    }]
  }], null, { label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: true }] }], pressed: [{ type: Input, args: [{ isSignal: true, alias: "pressed", required: false }] }], activate: [{ type: Output, args: ["activate"] }] });
})();
var KnowledgeRoomComponent = class _KnowledgeRoomComponent {
  books = [0, 1, 2, 3, 4, 5];
  static \u0275fac = function KnowledgeRoomComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KnowledgeRoomComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KnowledgeRoomComponent, selectors: [["g", "knowledge-room", ""]], decls: 72, vars: 0, consts: [["aria-hidden", "true"], ["id", "k-wall", "x2", "0", "y2", "1"], ["stop-color", "#294a49"], ["offset", "1", "stop-color", "#112d34"], ["id", "k-wood", "x2", "0", "y2", "1"], ["stop-color", "#b18053"], ["offset", "1", "stop-color", "#634732"], ["id", "k-light"], ["stop-color", "#efdfaa", "stop-opacity", ".2"], ["offset", "1", "stop-color", "#f2e0b0", "stop-opacity", "0"], ["id", "k-grain", "width", "80", "height", "28", "patternUnits", "userSpaceOnUse"], ["d", "M0 6Q40 12 80 4M0 25Q20 15 80 21", "fill", "none", "stroke", "#e8c995", "stroke-opacity", ".1"], ["id", "k-frame", "viewBox", "0 0 100 100"], ["d", "M12 16H88V84H12Z", "fill", "#775033", "stroke", "#cfb37e", "stroke-width", "7"], ["d", "M27 31H73V69H27Z", "fill", "#253f41"], ["d", "M34 44v16m16-21v21m16-16v16", "stroke", "#a6b7a6", "stroke-width", "9"], ["id", "k-mold", "viewBox", "0 0 100 100"], ["d", "M8 27L53 12 90 34 46 50Z", "fill", "#a3b5ae", "stroke", "#344e50", "stroke-width", "4"], ["d", "M8 27V73L46 92V50M46 92L90 75V34", "fill", "#607d7b", "stroke", "#344e50", "stroke-width", "4"], ["d", "M31 33l23-8 18 11-25 8Z", "fill", "#243c41"], ["d", "M53 17v19", "stroke", "#dfc999", "stroke-width", "5"], ["id", "k-ink", "viewBox", "0 0 100 100"], ["d", "M47 15v40", "stroke", "#b88550", "stroke-width", "12"], ["cx", "48", "cy", "62", "rx", "37", "ry", "24", "fill", "#20282a", "stroke", "#c9a772", "stroke-width", "7"], ["cx", "48", "cy", "56", "rx", "26", "ry", "12", "fill", "#464d42"], ["id", "k-screw", "viewBox", "0 0 100 100"], ["d", "M44 15h14v65H44Z", "fill", "#b2874c"], ["d", "M40 24l22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8", "stroke", "#68492d", "stroke-width", "5"], ["d", "M15 14h70M24 84h54", "stroke", "#d2b57a", "stroke-width", "12"], ["id", "k-book", "viewBox", "0 0 100 100"], ["d", "M12 18Q38 9 50 22Q68 9 88 18V82Q66 73 50 87Q34 74 12 82Z", "fill", "#ead9af", "stroke", "#926d45", "stroke-width", "4"], ["d", "M50 23V86M22 33h17m-17 12h17m-17 12h17m22-24h16m-16 12h16m-16 12h16", "stroke", "#667963", "stroke-width", "3"], ["id", "k-copy", "viewBox", "0 0 100 100"], ["d", "M22 9L83 16 77 91 16 86Z", "fill", "#f1dfb8", "stroke", "#9b784e", "stroke-width", "3"], ["d", "M31 28h35m-35 10h35m-35 10h25M30 69l15-15 17 16Z", "fill", "none", "stroke", "#405b53", "stroke-width", "4"], ["id", "k-translation", "viewBox", "0 0 100 100"], ["href", "#k-book", "width", "100", "height", "100"], ["x", "25", "y", "64", "font-size", "33", "fill", "#8c463d"], ["x", "59", "y", "64", "font-size", "33", "fill", "#376d69"], ["id", "k-reading", "viewBox", "0 0 100 100"], ["cx", "35", "cy", "27", "r", "17", "fill", "#d2a779"], ["d", "M12 87V58Q34 35 58 58V87", "fill", "#758a76"], ["d", "M59 22q16 10 0 22m9-29q28 17 0 37", "fill", "none", "stroke", "#e4cc98", "stroke-width", "5"], ["id", "k-loan", "viewBox", "0 0 100 100"], ["d", "M14 91h64l-13-11m13 11-13 8", "fill", "none", "stroke", "#69b0a0", "stroke-width", "7"], ["id", "k-packing", "viewBox", "0 0 100 100"], ["d", "M10 62l54-12 29 19-52 19Zm0-18 54-12 29 19-52 19Zm0-18L64 14l29 19-52 19Z", "fill", "#d6c28d", "stroke", "#8d764d", "stroke-width", "3"], ["id", "k-type", "viewBox", "0 0 100 100"], ["d", "M18 14h65v65L66 93 18 79Z", "fill", "#97aaa2", "stroke", "#3f5e5c", "stroke-width", "4"], ["x", "40", "y", "67", "font-size", "53", "fill", "#273d3e"], ["id", "k-person", "viewBox", "0 0 100 150"], ["cx", "50", "cy", "143", "rx", "36", "ry", "6", "fill", "#142b30", "opacity", ".3"], ["d", "M29 91v48m41-48v48", "stroke", "#493f35", "stroke-width", "15"], ["d", "M17 63Q50 39 82 63L78 112H21Z", "fill", "currentColor"], ["cx", "50", "cy", "31", "r", "22", "fill", "#cca078"], ["d", "M27 31Q20 0 53 6Q79 6 75 25L53 19Z", "fill", "#554d3c"], ["width", "1000", "height", "660", "fill", "url(#k-wall)"], ["d", "M0 0H1000V30H0ZM0 56H1000M46 0V410M936 0V410", "stroke", "#1a302f", "stroke-width", "25"], ["d", "M74 100Q150 9 226 100V312H74Z", "fill", "#7eaaa3", "stroke", "#a58a60", "stroke-width", "12"], ["d", "M151 50V312M74 176H226M87 99L213 246M209 92L89 248", "stroke", "#425f57", "stroke-width", "6"], ["d", "M74 312L470 515 800 470 226 312", "fill", "#d9d9ac", "opacity", ".09"], ["d", "M720 77h192v16H720Zm0 109h192v14H720Z", "fill", "#795d40"], ["y", "410", "width", "1000", "height", "250", "fill", "url(#k-wood)"], ["y", "410", "width", "1000", "height", "250", "fill", "url(#k-grain)"], ["d", "M0 410H1000M0 615H1000", "stroke", "#dbb980", "stroke-width", "8", "opacity", ".5"], ["cx", "350", "cy", "280", "rx", "460", "ry", "410", "fill", "url(#k-light)"], ["y", "35", "width", "19", "height", "42", "rx", "2"], ["stroke", "#d1b98c"]], template: function KnowledgeRoomComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "defs", 0)(1, "linearGradient", 1);
      \u0275\u0275domElement(2, "stop", 2)(3, "stop", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "linearGradient", 4);
      \u0275\u0275domElement(5, "stop", 5)(6, "stop", 6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "radialGradient", 7);
      \u0275\u0275domElement(8, "stop", 8)(9, "stop", 9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "pattern", 10);
      \u0275\u0275domElement(11, "path", 11);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "symbol", 12);
      \u0275\u0275domElement(13, "path", 13)(14, "path", 14)(15, "path", 15);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "symbol", 16);
      \u0275\u0275domElement(17, "path", 17)(18, "path", 18)(19, "path", 19)(20, "path", 20);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "symbol", 21);
      \u0275\u0275domElement(22, "path", 22)(23, "ellipse", 23)(24, "ellipse", 24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "symbol", 25);
      \u0275\u0275domElement(26, "path", 26)(27, "path", 27)(28, "path", 28);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "symbol", 29);
      \u0275\u0275domElement(30, "path", 30)(31, "path", 31);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "symbol", 32);
      \u0275\u0275domElement(33, "path", 33)(34, "path", 34);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "symbol", 35);
      \u0275\u0275domElement(36, "use", 36);
      \u0275\u0275domElementStart(37, "text", 37);
      \u0275\u0275text(38, "A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(39, "text", 38);
      \u0275\u0275text(40, "\u03A9");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(41, "symbol", 39);
      \u0275\u0275domElement(42, "circle", 40)(43, "path", 41)(44, "path", 42);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(45, "symbol", 43);
      \u0275\u0275domElement(46, "use", 36)(47, "path", 44);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "symbol", 45);
      \u0275\u0275domElement(49, "path", 46);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(50, "symbol", 47);
      \u0275\u0275domElement(51, "path", 48);
      \u0275\u0275domElementStart(52, "text", 49);
      \u0275\u0275text(53, "R");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(54, "symbol", 50);
      \u0275\u0275domElement(55, "ellipse", 51)(56, "path", 52)(57, "path", 53)(58, "circle", 54)(59, "path", 55);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(60, "rect", 56)(61, "path", 57)(62, "path", 58)(63, "path", 59)(64, "path", 60)(65, "path", 61);
      \u0275\u0275repeaterCreate(66, KnowledgeRoomComponent_For_67_Template, 2, 3, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElement(68, "rect", 62)(69, "rect", 63)(70, "path", 64)(71, "ellipse", 65);
    }
    if (rf & 2) {
      \u0275\u0275advance(66);
      \u0275\u0275repeater(ctx.books);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KnowledgeRoomComponent, [{
    type: Component,
    args: [{
      selector: "g[knowledge-room]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <svg:defs aria-hidden="true">
      <svg:linearGradient id="k-wall" x2="0" y2="1">
        <svg:stop stop-color="#294a49" />
        <svg:stop offset="1" stop-color="#112d34" />
      </svg:linearGradient>
      <svg:linearGradient id="k-wood" x2="0" y2="1">
        <svg:stop stop-color="#b18053" />
        <svg:stop offset="1" stop-color="#634732" />
      </svg:linearGradient>
      <svg:radialGradient id="k-light">
        <svg:stop stop-color="#efdfaa" stop-opacity=".2" />
        <svg:stop offset="1" stop-color="#f2e0b0" stop-opacity="0" />
      </svg:radialGradient>
      <svg:pattern id="k-grain" width="80" height="28" patternUnits="userSpaceOnUse">
        <svg:path
          d="M0 6Q40 12 80 4M0 25Q20 15 80 21"
          fill="none"
          stroke="#e8c995"
          stroke-opacity=".1"
        />
      </svg:pattern>
      <svg:symbol id="k-frame" viewBox="0 0 100 100">
        <svg:path d="M12 16H88V84H12Z" fill="#775033" stroke="#cfb37e" stroke-width="7" />
        <svg:path d="M27 31H73V69H27Z" fill="#253f41" />
        <svg:path d="M34 44v16m16-21v21m16-16v16" stroke="#a6b7a6" stroke-width="9" />
      </svg:symbol>
      <svg:symbol id="k-mold" viewBox="0 0 100 100">
        <svg:path d="M8 27L53 12 90 34 46 50Z" fill="#a3b5ae" stroke="#344e50" stroke-width="4" />
        <svg:path
          d="M8 27V73L46 92V50M46 92L90 75V34"
          fill="#607d7b"
          stroke="#344e50"
          stroke-width="4"
        />
        <svg:path d="M31 33l23-8 18 11-25 8Z" fill="#243c41" />
        <svg:path d="M53 17v19" stroke="#dfc999" stroke-width="5" />
      </svg:symbol>
      <svg:symbol id="k-ink" viewBox="0 0 100 100">
        <svg:path d="M47 15v40" stroke="#b88550" stroke-width="12" />
        <svg:ellipse
          cx="48"
          cy="62"
          rx="37"
          ry="24"
          fill="#20282a"
          stroke="#c9a772"
          stroke-width="7"
        />
        <svg:ellipse cx="48" cy="56" rx="26" ry="12" fill="#464d42" />
      </svg:symbol>
      <svg:symbol id="k-screw" viewBox="0 0 100 100">
        <svg:path d="M44 15h14v65H44Z" fill="#b2874c" />
        <svg:path
          d="M40 24l22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8"
          stroke="#68492d"
          stroke-width="5"
        />
        <svg:path d="M15 14h70M24 84h54" stroke="#d2b57a" stroke-width="12" />
      </svg:symbol>
      <svg:symbol id="k-book" viewBox="0 0 100 100">
        <svg:path
          d="M12 18Q38 9 50 22Q68 9 88 18V82Q66 73 50 87Q34 74 12 82Z"
          fill="#ead9af"
          stroke="#926d45"
          stroke-width="4"
        />
        <svg:path
          d="M50 23V86M22 33h17m-17 12h17m-17 12h17m22-24h16m-16 12h16m-16 12h16"
          stroke="#667963"
          stroke-width="3"
        />
      </svg:symbol>
      <svg:symbol id="k-copy" viewBox="0 0 100 100">
        <svg:path d="M22 9L83 16 77 91 16 86Z" fill="#f1dfb8" stroke="#9b784e" stroke-width="3" />
        <svg:path
          d="M31 28h35m-35 10h35m-35 10h25M30 69l15-15 17 16Z"
          fill="none"
          stroke="#405b53"
          stroke-width="4"
        />
      </svg:symbol>
      <svg:symbol id="k-translation" viewBox="0 0 100 100">
        <svg:use href="#k-book" width="100" height="100" />
        <svg:text x="25" y="64" font-size="33" fill="#8c463d">A</svg:text>
        <svg:text x="59" y="64" font-size="33" fill="#376d69">\u03A9</svg:text>
      </svg:symbol>
      <svg:symbol id="k-reading" viewBox="0 0 100 100">
        <svg:circle cx="35" cy="27" r="17" fill="#d2a779" />
        <svg:path d="M12 87V58Q34 35 58 58V87" fill="#758a76" />
        <svg:path
          d="M59 22q16 10 0 22m9-29q28 17 0 37"
          fill="none"
          stroke="#e4cc98"
          stroke-width="5"
        />
      </svg:symbol>
      <svg:symbol id="k-loan" viewBox="0 0 100 100">
        <svg:use href="#k-book" width="100" height="100" />
        <svg:path d="M14 91h64l-13-11m13 11-13 8" fill="none" stroke="#69b0a0" stroke-width="7" />
      </svg:symbol>
      <svg:symbol id="k-packing" viewBox="0 0 100 100">
        <svg:path
          d="M10 62l54-12 29 19-52 19Zm0-18 54-12 29 19-52 19Zm0-18L64 14l29 19-52 19Z"
          fill="#d6c28d"
          stroke="#8d764d"
          stroke-width="3"
        />
      </svg:symbol>
      <svg:symbol id="k-type" viewBox="0 0 100 100">
        <svg:path d="M18 14h65v65L66 93 18 79Z" fill="#97aaa2" stroke="#3f5e5c" stroke-width="4" />
        <svg:text x="40" y="67" font-size="53" fill="#273d3e">R</svg:text>
      </svg:symbol>
      <svg:symbol id="k-person" viewBox="0 0 100 150">
        <svg:ellipse cx="50" cy="143" rx="36" ry="6" fill="#142b30" opacity=".3" />
        <svg:path d="M29 91v48m41-48v48" stroke="#493f35" stroke-width="15" />
        <svg:path d="M17 63Q50 39 82 63L78 112H21Z" fill="currentColor" />
        <svg:circle cx="50" cy="31" r="22" fill="#cca078" />
        <svg:path d="M27 31Q20 0 53 6Q79 6 75 25L53 19Z" fill="#554d3c" />
      </svg:symbol>
    </svg:defs>
    <svg:rect width="1000" height="660" fill="url(#k-wall)" />
    <svg:path d="M0 0H1000V30H0ZM0 56H1000M46 0V410M936 0V410" stroke="#1a302f" stroke-width="25" />
    <svg:path d="M74 100Q150 9 226 100V312H74Z" fill="#7eaaa3" stroke="#a58a60" stroke-width="12" />
    <svg:path
      d="M151 50V312M74 176H226M87 99L213 246M209 92L89 248"
      stroke="#425f57"
      stroke-width="6"
    />
    <svg:path d="M74 312L470 515 800 470 226 312" fill="#d9d9ac" opacity=".09" />
    <svg:path d="M720 77h192v16H720Zm0 109h192v14H720Z" fill="#795d40" />
    @for (book of books; track book) {
      <svg:rect
        [attr.x]="737 + book * 25"
        y="35"
        width="19"
        height="42"
        rx="2"
        [attr.fill]="book % 2 ? '#aa8060' : '#7e947d'"
      />
      <svg:path [attr.d]="'M' + (742 + book * 25) + ' 43v26'" stroke="#d1b98c" />
    }
    <svg:rect y="410" width="1000" height="250" fill="url(#k-wood)" />
    <svg:rect y="410" width="1000" height="250" fill="url(#k-grain)" />
    <svg:path d="M0 410H1000M0 615H1000" stroke="#dbb980" stroke-width="8" opacity=".5" />
    <svg:ellipse cx="350" cy="280" rx="460" ry="410" fill="url(#k-light)" />
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KnowledgeRoomComponent, { className: "KnowledgeRoomComponent", filePath: "src/app/templates/time-repair/invention/knowledge/scene-tools.ts", lineNumber: 177 });
})();
var KnowledgeDrawingComponent = class _KnowledgeDrawingComponent {
  marks = Array.from({ length: 24 }, (_, i) => i);
  static \u0275fac = function KnowledgeDrawingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KnowledgeDrawingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KnowledgeDrawingComponent, selectors: [["g", "knowledge-drawing", ""]], decls: 9, vars: 0, consts: [["x", "4", "y", "4", "width", "292", "height", "192", "rx", "3", "fill", "#f0ddb2", "stroke", "#aa8657", "stroke-width", "2"], ["cx", "150", "cy", "100", "r", "77", "fill", "none", "stroke", "#425e57", "stroke-width", "3"], ["cx", "150", "cy", "100", "r", "56", "fill", "none", "stroke", "#ac7049", "stroke-width", "2"], ["d", "M150 10V190M16 100H284M55 22L245 178M55 178L245 22M150 18L169 78 237 100 168 122 150 181 131 122 64 100 131 78Z", "fill", "none", "stroke", "#44685d", "stroke-width", "2.5"], ["d", "M150 42L160 89 190 100 160 110 150 157 140 110 110 100 140 89Z", "fill", "#b56e4d", "opacity", ".7"], ["cx", "150", "cy", "100", "r", "8", "fill", "#294f4b"], ["d", "M150 20v7", "stroke", "#3a6056", "stroke-width", "2"], ["d", "M17 22h22v22H17Zm244 133h23v43h-23ZM17 154l25 25-25 7ZM266 18l14 12-14 12-14-12Z", "fill", "none", "stroke", "#a26645", "stroke-width", "3"]], template: function KnowledgeDrawingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElement(0, "rect", 0)(1, "circle", 1)(2, "circle", 2)(3, "path", 3)(4, "path", 4)(5, "circle", 5);
      \u0275\u0275repeaterCreate(6, KnowledgeDrawingComponent_For_7_Template, 1, 1, ":svg:path", 6, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElement(8, "path", 7);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.marks);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KnowledgeDrawingComponent, [{
    type: Component,
    args: [{
      selector: "g[knowledge-drawing]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <svg:rect
      x="4"
      y="4"
      width="292"
      height="192"
      rx="3"
      fill="#f0ddb2"
      stroke="#aa8657"
      stroke-width="2"
    />
    <svg:circle cx="150" cy="100" r="77" fill="none" stroke="#425e57" stroke-width="3" />
    <svg:circle cx="150" cy="100" r="56" fill="none" stroke="#ac7049" stroke-width="2" />
    <svg:path
      d="M150 10V190M16 100H284M55 22L245 178M55 178L245 22M150 18L169 78 237 100 168 122 150 181 131 122 64 100 131 78Z"
      fill="none"
      stroke="#44685d"
      stroke-width="2.5"
    />
    <svg:path
      d="M150 42L160 89 190 100 160 110 150 157 140 110 110 100 140 89Z"
      fill="#b56e4d"
      opacity=".7"
    />
    <svg:circle cx="150" cy="100" r="8" fill="#294f4b" />
    @for (i of marks; track i) {
      <svg:path
        d="M150 20v7"
        [attr.transform]="'rotate(' + i * 15 + ' 150 100)'"
        stroke="#3a6056"
        stroke-width="2"
      />
    }
    <svg:path
      d="M17 22h22v22H17Zm244 133h23v43h-23ZM17 154l25 25-25 7ZM266 18l14 12-14 12-14-12Z"
      fill="none"
      stroke="#a26645"
      stroke-width="3"
    />
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KnowledgeDrawingComponent, { className: "KnowledgeDrawingComponent", filePath: "src/app/templates/time-repair/invention/knowledge/scene-tools.ts", lineNumber: 225 });
})();
function gearPath(radius, teeth = 20) {
  const points = Array.from({ length: teeth * 4 }, (_, i) => {
    const r = radius + ([1, 2].includes(i % 4) ? 5 : -5);
    const a = i * Math.PI * 2 / (teeth * 4);
    return `${Math.cos(a) * r},${Math.sin(a) * r}`;
  });
  return `M${points.join("L")}Z`;
}

// src/app/templates/time-repair/invention/knowledge/reconstruction.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function ReconstructionComponent_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g")(1, "svg", 16);
    \u0275\u0275element(2, "g", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r2 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "rotate(" + ctx_r2.k.state().values[f_r2.id] * 90 + " 71 71)");
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", ctx_r2.view(f_r2));
  }
}
function ReconstructionComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 14);
    \u0275\u0275conditionalCreate(2, ReconstructionComponent_For_6_Conditional_2_Template, 3, 2, ":svg:g");
    \u0275\u0275elementStart(3, "rect", 15);
    \u0275\u0275listener("activate", function ReconstructionComponent_For_6_Template_rect_activate_3_listener() {
      const cell_r4 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "place", target: "" + cell_r4 }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const cell_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (405 + cell_r4 % 3 * 142) + " " + (170 + ctx_r2.Math.floor(cell_r4 / 3) * 142) + ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = ctx_r2.at(cell_r4)) ? 2 : -1, tmp_11_0);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Page position " + (cell_r4 + 1) + ". Place the lifted fragment.");
  }
}
function ReconstructionComponent_For_8_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g")(1, "g")(2, "svg", 21);
    \u0275\u0275element(3, "g", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "rect", 22);
    \u0275\u0275listener("activate", function ReconstructionComponent_For_8_For_6_Conditional_0_Template_rect_activate_4_listener() {
      \u0275\u0275restoreView(_r5);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "select", item: f_r6.id }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    const f_r6 = ctx_r6.$implicit;
    const \u0275$index_35_r8 = ctx_r6.$index;
    const copy_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (\u0275$index_35_r8 % 3 === 1 ? 66 : 6) + " " + (16 + ctx_r2.Math.floor(\u0275$index_35_r8 % 3 / 2) * 108) + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("transform", "rotate(" + ctx_r2.k.state().values[f_r6.id] * 90 + " 30 40)");
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", ctx_r2.view(f_r6));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", "Lift fragment " + (f_r6.cell + 1) + " from copy " + (copy_r9 + 1))("pressed", ctx_r2.k.state().selected === f_r6.id);
  }
}
function ReconstructionComponent_For_8_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ReconstructionComponent_For_8_For_6_Conditional_0_Template, 5, 5, ":svg:g");
  }
  if (rf & 2) {
    const f_r6 = ctx.$implicit;
    const copy_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(f_r6.copy === copy_r9 ? 0 : -1);
  }
}
function ReconstructionComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 18)(2, "path", 19);
    \u0275\u0275elementStart(3, "text", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, ReconstructionComponent_For_8_For_6_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const copy_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (38 + copy_r9 * 158) + " " + (copy_r9 ? 276 : 144) + ") rotate(" + (copy_r9 ? 5 : -6) + ")");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(copy_r9 ? "II" : "I");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.fragments());
  }
}
var ReconstructionComponent = class _ReconstructionComponent {
  k = inject(KnowledgeRuntime);
  cells = [0, 1, 2, 3, 4, 5];
  copies = [0, 1];
  Math = Math;
  fragments = computed(
    () => this.k.config().fragments,
    ...ngDevMode ? [{ debugName: "fragments" }] : (
      /* istanbul ignore next */
      []
    )
  );
  at(cell) {
    return this.fragments().find((f) => f.id === this.k.state().placements[String(cell)]);
  }
  view(f) {
    return `${f.cell % 3 * 100} ${Math.floor(f.cell / 3) * 100} 100 100`;
  }
  static \u0275fac = function ReconstructionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReconstructionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReconstructionComponent, selectors: [["app-knowledge-reconstruction"]], decls: 19, vars: 0, consts: [["viewBox", "0 0 1000 660", "preserveAspectRatio", "xMidYMid meet", "role", "group", "aria-label", "Recover a drawing from two damaged copies", 1, "scene"], ["knowledge-room", ""], ["d", "M373 72L916 92 897 578 362 562Z", "fill", "#172d2e", "opacity", ".4"], ["d", "M371 62L905 78 894 560 360 548Z", 1, "paper"], ["d", "M372 62L360 548M641 76V540", "stroke", "#ad9366", "stroke-width", "4"], ["kb", "", "label", "Turn the lifted fragment a quarter turn", "transform", "translate(260 95)", 3, "activate"], ["r", "40", 1, "hit", "button-face"], ["y", "10", "font-size", "39", 1, "button-ink"], ["kb", "", "label", "Examine the reconstructed page and its joins", "transform", "translate(906 584)", 3, "activate"], ["r", "43", 1, "hit", "button-face"], ["r", "18", "cy", "-5", "fill", "none", "stroke", "#335c53", "stroke-width", "5"], ["d", "M12 9l13 15", "stroke", "#335c53", "stroke-width", "7"], ["d", "M47 582q70-20 196 2", "fill", "none", "stroke", "#d8c18f", "stroke-width", "9"], ["d", "M88 561l99 50", "stroke", "#a5906b", "stroke-width", "4"], ["d", "M0 0H142V142H0Z", "fill", "#c1ab80", "stroke", "#9c895f", "stroke-dasharray", "4 6"], ["kb", "", "x", "0", "y", "0", "width", "142", "height", "142", "fill", "transparent", "rx", "5", 1, "hit", 3, "activate", "label"], ["x", "0", "y", "0", "width", "142", "height", "142", 2, "overflow", "hidden", "pointer-events", "none"], ["knowledge-drawing", ""], ["d", "M-5-5H146V240H-5Z", "fill", "#57463a", "stroke", "#bd9d6b", "stroke-width", "5"], ["d", "M0 0H136V228L109 232 90 212 65 232 45 219 0 232Z", 1, "paper"], ["x", "66", "y", "-20", 1, "label"], ["width", "60", "height", "80", 2, "overflow", "hidden", "pointer-events", "none"], ["kb", "", "x", "-3", "y", "-3", "width", "63", "height", "87", "fill", "transparent", "rx", "4", 1, "hit", 3, "activate", "label", "pressed"]], template: function ReconstructionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "g", 1)(2, "path", 2)(3, "path", 3)(4, "path", 4);
      \u0275\u0275repeaterCreate(5, ReconstructionComponent_For_6_Template, 4, 3, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(7, ReconstructionComponent_For_8_Template, 7, 2, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(9, "g", 5);
      \u0275\u0275listener("activate", function ReconstructionComponent_Template_g_activate_9_listener() {
        return ctx.k.act({ type: "turn" });
      });
      \u0275\u0275element(10, "circle", 6);
      \u0275\u0275elementStart(11, "text", 7);
      \u0275\u0275text(12, "\u21BB");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "g", 8);
      \u0275\u0275listener("activate", function ReconstructionComponent_Template_g_activate_13_listener() {
        return ctx.k.act({ type: "inspect" });
      });
      \u0275\u0275element(14, "circle", 9)(15, "circle", 10)(16, "path", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "path", 12)(18, "path", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.cells);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.copies);
    }
  }, dependencies: [KnowledgeRoomComponent, KnowledgeDrawingComponent, SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReconstructionComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-reconstruction", imports: [KnowledgeRoomComponent, KnowledgeDrawingComponent, SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Recover a drawing from two damaged copies"
  >
    <g knowledge-room />
    <path d="M373 72L916 92 897 578 362 562Z" fill="#172d2e" opacity=".4" />
    <path d="M371 62L905 78 894 560 360 548Z" class="paper" />
    <path d="M372 62L360 548M641 76V540" stroke="#ad9366" stroke-width="4" />
    @for (cell of cells; track cell) {
      <g
        [attr.transform]="
          'translate(' + (405 + (cell % 3) * 142) + ' ' + (170 + Math.floor(cell / 3) * 142) + ')'
        "
      >
        <path d="M0 0H142V142H0Z" fill="#c1ab80" stroke="#9c895f" stroke-dasharray="4 6" />
        @if (at(cell); as f) {
          <g [attr.transform]="'rotate(' + k.state().values[f.id] * 90 + ' 71 71)'">
            <svg
              x="0"
              y="0"
              width="142"
              height="142"
              style="overflow:hidden;pointer-events:none"
              [attr.viewBox]="view(f)"
            >
              <g knowledge-drawing />
            </svg>
          </g>
        }
        <rect
          kb
          [label]="'Page position ' + (cell + 1) + '. Place the lifted fragment.'"
          (activate)="k.act({ type: 'place', target: '' + cell })"
          class="hit"
          x="0"
          y="0"
          width="142"
          height="142"
          fill="transparent"
          rx="5"
        />
      </g>
    }
    @for (copy of copies; track copy) {
      <g
        [attr.transform]="
          'translate(' +
          (38 + copy * 158) +
          ' ' +
          (copy ? 276 : 144) +
          ') rotate(' +
          (copy ? 5 : -6) +
          ')'
        "
      >
        <path d="M-5-5H146V240H-5Z" fill="#57463a" stroke="#bd9d6b" stroke-width="5" />
        <path d="M0 0H136V228L109 232 90 212 65 232 45 219 0 232Z" class="paper" />
        <text x="66" y="-20" class="label">{{ copy ? 'II' : 'I' }}</text>
        @for (f of fragments(); track f.id; let i = $index) {
          @if (f.copy === copy) {
            <g
              [attr.transform]="
                'translate(' +
                (i % 3 === 1 ? 66 : 6) +
                ' ' +
                (16 + Math.floor((i % 3) / 2) * 108) +
                ')'
              "
            >
              <g [attr.transform]="'rotate(' + k.state().values[f.id] * 90 + ' 30 40)'">
                <svg
                  width="60"
                  height="80"
                  style="overflow:hidden;pointer-events:none"
                  [attr.viewBox]="view(f)"
                >
                  <g knowledge-drawing />
                </svg>
              </g>
              <rect
                kb
                [label]="'Lift fragment ' + (f.cell + 1) + ' from copy ' + (copy + 1)"
                [pressed]="k.state().selected === f.id"
                (activate)="k.act({ type: 'select', item: f.id })"
                class="hit"
                x="-3"
                y="-3"
                width="63"
                height="87"
                fill="transparent"
                rx="4"
              />
            </g>
          }
        }
      </g>
    }
    <g
      kb
      label="Turn the lifted fragment a quarter turn"
      (activate)="k.act({ type: 'turn' })"
      transform="translate(260 95)"
    >
      <circle class="hit button-face" r="40" />
      <text class="button-ink" y="10" font-size="39">\u21BB</text>
    </g>
    <g
      kb
      label="Examine the reconstructed page and its joins"
      (activate)="k.act({ type: 'inspect' })"
      transform="translate(906 584)"
    >
      <circle class="hit button-face" r="43" />
      <circle r="18" cy="-5" fill="none" stroke="#335c53" stroke-width="5" />
      <path d="M12 9l13 15" stroke="#335c53" stroke-width="7" />
    </g>
    <path d="M47 582q70-20 196 2" fill="none" stroke="#d8c18f" stroke-width="9" />
    <path d="M88 561l99 50" stroke="#a5906b" stroke-width="4" />
  </svg>`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReconstructionComponent, { className: "ReconstructionComponent", filePath: "src/app/templates/time-repair/invention/knowledge/reconstruction.component.ts", lineNumber: 138 });
})();

// src/app/templates/time-repair/invention/knowledge/assembly.component.ts
function AssemblyComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 5);
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    \u0275\u0275attribute("d", "M561 " + (191 + i_r1 * 18) + "l38-12");
  }
}
function AssemblyComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 6);
    \u0275\u0275element(1, "rect", 15)(2, "path", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (453 + i_r2 * 64) + " " + (ctx_r2.k.state().values["frame"] ? 406 : 401 + i_r2 % 2 * 12) + ")")("opacity", ctx_r2.value("mold") > i_r2 ? 1 : 0.15);
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r2.value("ink") >= 2 ? "#1b292a" : "#a9bbae");
  }
}
function AssemblyComponent_For_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 19);
  }
  if (rf & 2) {
    \u0275\u0275attribute("href", "#k-" + ctx);
  }
}
function AssemblyComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 17);
    \u0275\u0275listener("activate", function AssemblyComponent_For_14_Template_g_activate_0_listener() {
      const role_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "fit", target: role_r5 }));
    });
    \u0275\u0275element(1, "rect", 18);
    \u0275\u0275conditionalCreate(2, AssemblyComponent_For_14_Conditional_2_Template, 1, 1, ":svg:use", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "g", 17);
    \u0275\u0275listener("activate", function AssemblyComponent_For_14_Template_g_activate_3_listener() {
      const role_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "operate", target: role_r5 }));
    });
    \u0275\u0275element(4, "ellipse", 20);
    \u0275\u0275elementStart(5, "text", 21);
    \u0275\u0275text(6, "\u21BB");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const role_r5 = ctx.$implicit;
    const \u0275$index_29_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Fit selected mechanism to " + role_r5 + " socket");
    \u0275\u0275attribute("transform", "translate(" + ctx_r2.socketX[\u0275$index_29_r6] + " " + ctx_r2.socketY[\u0275$index_29_r6] + ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = ctx_r2.k.state().placements[role_r5]) ? 2 : -1, tmp_13_0);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Operate fitted " + role_r5);
    \u0275\u0275attribute("transform", "translate(" + (ctx_r2.socketX[\u0275$index_29_r6] + 49) + " " + (ctx_r2.socketY[\u0275$index_29_r6] + 122) + ")");
  }
}
function AssemblyComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 22);
    \u0275\u0275listener("activate", function AssemblyComponent_For_16_Template_g_activate_0_listener() {
      const part_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "select", item: part_r8 }));
    });
    \u0275\u0275element(1, "rect", 23)(2, "use", 24);
    \u0275\u0275elementStart(3, "text", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const part_r8 = ctx.$implicit;
    const \u0275$index_44_r9 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Lift " + part_r8 + " mechanism")("pressed", ctx_r2.k.state().selected === part_r8);
    \u0275\u0275attribute("transform", "translate(42 " + (62 + \u0275$index_44_r9 * 135) + ")");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("href", "#k-" + part_r8);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(part_r8);
  }
}
function AssemblyComponent_Conditional_21_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 27);
  }
  if (rf & 2) {
    const i_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", "M" + (24 + i_r10 * 43) + " 22v44h22V22Z")("opacity", ctx_r2.fault() === "none" ? 1 : ctx_r2.fault() === "ink" ? 0.2 : ctx_r2.fault() === "type" && i_r10 >= (ctx_r2.printed()?.controls?.["mold"] ?? 0) ? 0 : 0.55)("transform", ctx_r2.fault() === "loose" ? "rotate(" + i_r10 * 3 + " 100 40)" : null);
  }
}
function AssemblyComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 14);
    \u0275\u0275element(1, "path", 26);
    \u0275\u0275repeaterCreate(2, AssemblyComponent_Conditional_21_For_3_Template, 1, 3, ":svg:path", 27, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.typePieces);
  }
}
var AssemblyComponent = class _AssemblyComponent {
  k = inject(KnowledgeRuntime);
  roles = ASSEMBLY_ROLES;
  socketX = [208, 208, 850, 490];
  socketY = [341, 164, 231, 44];
  thread = [0, 1, 2, 3, 4, 5, 6, 7];
  typePieces = [0, 1, 2, 3];
  printed = computed(
    () => {
      const trial = this.k.state().trials.at(-1);
      return trial ? JSON.parse(trial.evidence) : void 0;
    },
    ...ngDevMode ? [{ debugName: "printed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  value(key) {
    return this.k.state().values[key] ?? 0;
  }
  fault() {
    return this.printed()?.fault ?? assemblyFault(this.k.state());
  }
  static \u0275fac = function AssemblyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssemblyComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssemblyComponent, selectors: [["app-knowledge-assembly"]], decls: 22, vars: 3, consts: [["viewBox", "0 0 1000 660", "preserveAspectRatio", "xMidYMid meet", "role", "group", "aria-label", "Assemble and operate the contributions of four crafts", 1, "scene"], ["knowledge-room", ""], ["d", "M315 540V121H849V540M315 181H849M355 539H805", "fill", "none", "stroke", "#4b392b", "stroke-width", "43"], ["d", "M315 534V122H849V534M323 181H841", "fill", "none", "stroke", "#bc9560", "stroke-width", "25"], ["d", "M579 187V342", "stroke", "#9e7746", "stroke-width", "24"], ["stroke", "#64432f", "stroke-width", "6"], [1, "moved"], ["d", "M445 315H722V348H445Z", "fill", "#ac8c5b", "stroke", "#553e2d", "stroke-width", "5"], ["d", "M393 459L772 448 786 480 407 495Z", "fill", "#e6d7b3"], ["d", "M429 394H734V442H429Z", "stroke", "#a0aa91", "stroke-width", "7"], ["kb", "", 3, "label", "pressed"], ["kb", "", "label", "Test the assembled printing system", "transform", "translate(864 562)", 3, "activate"], ["r", "48", 1, "hit", "button-face"], ["y", "9", 1, "button-ink"], ["transform", "translate(550 543) rotate(-3)"], ["width", "43", "height", "27", "rx", "3", "stroke", "#b8c0a3"], ["d", "M9 6h22v16H9Z", "fill", "none", "stroke", "#d0c9a5", "stroke-width", "3"], ["kb", "", 3, "activate", "label"], ["width", "98", "height", "96", "rx", "8", 1, "socket", "hit"], ["x", "10", "y", "8", "width", "77", "height", "77"], ["rx", "37", "ry", "22", 1, "hit", "button-face"], ["y", "8", 1, "button-ink"], ["kb", "", 3, "activate", "label", "pressed"], ["width", "130", "height", "115", "rx", "8", 1, "hit", "wood"], ["x", "24", "y", "8", "width", "82", "height", "82"], ["x", "65", "y", "103", 1, "small"], ["d", "M0 0h207v92H0Z", 1, "paper"], ["fill", "none", "stroke", "#294941", "stroke-width", "6"]], template: function AssemblyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "g", 1)(2, "path", 2)(3, "path", 3)(4, "path", 4);
      \u0275\u0275repeaterCreate(5, AssemblyComponent_For_6_Template, 1, 1, ":svg:path", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(7, "g", 6);
      \u0275\u0275element(8, "path", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "path", 8)(10, "path", 9);
      \u0275\u0275repeaterCreate(11, AssemblyComponent_For_12_Template, 3, 3, ":svg:g", 6, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(13, AssemblyComponent_For_14_Template, 7, 5, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(15, AssemblyComponent_For_16_Template, 5, 5, ":svg:g", 10, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(17, "g", 11);
      \u0275\u0275listener("activate", function AssemblyComponent_Template_g_activate_17_listener() {
        return ctx.k.act({ type: "test" });
      });
      \u0275\u0275element(18, "circle", 12);
      \u0275\u0275elementStart(19, "text", 13);
      \u0275\u0275text(20, "Pull");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, AssemblyComponent_Conditional_21_Template, 4, 0, ":svg:g", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.thread);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("transform", "translate(0 " + ctx.value("screw") * 26 + ")");
      \u0275\u0275advance(3);
      \u0275\u0275attribute("fill", ctx.k.state().values["frame"] ? "#304c46" : "#815c38");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.typePieces);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.roles);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.k.config().parts);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.k.state().trials.length ? 21 : -1);
    }
  }, dependencies: [KnowledgeRoomComponent, SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssemblyComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-assembly", imports: [KnowledgeRoomComponent, SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Assemble and operate the contributions of four crafts"
  >
    <g knowledge-room />
    <path
      d="M315 540V121H849V540M315 181H849M355 539H805"
      fill="none"
      stroke="#4b392b"
      stroke-width="43"
    />
    <path d="M315 534V122H849V534M323 181H841" fill="none" stroke="#bc9560" stroke-width="25" />
    <path d="M579 187V342" stroke="#9e7746" stroke-width="24" />
    @for (i of thread; track i) {
      <path [attr.d]="'M561 ' + (191 + i * 18) + 'l38-12'" stroke="#64432f" stroke-width="6" />
    }
    <g class="moved" [attr.transform]="'translate(0 ' + value('screw') * 26 + ')'">
      <path d="M445 315H722V348H445Z" fill="#ac8c5b" stroke="#553e2d" stroke-width="5" />
    </g>
    <path d="M393 459L772 448 786 480 407 495Z" fill="#e6d7b3" />
    <path
      d="M429 394H734V442H429Z"
      [attr.fill]="k.state().values['frame'] ? '#304c46' : '#815c38'"
      stroke="#a0aa91"
      stroke-width="7"
    />
    @for (i of typePieces; track i) {
      <g
        class="moved"
        [attr.transform]="
          'translate(' +
          (453 + i * 64) +
          ' ' +
          (k.state().values['frame'] ? 406 : 401 + (i % 2) * 12) +
          ')'
        "
        [attr.opacity]="value('mold') > i ? 1 : 0.15"
      >
        <rect
          width="43"
          height="27"
          rx="3"
          [attr.fill]="value('ink') >= 2 ? '#1b292a' : '#a9bbae'"
          stroke="#b8c0a3"
        />
        <path d="M9 6h22v16H9Z" fill="none" stroke="#d0c9a5" stroke-width="3" />
      </g>
    }
    @for (role of roles; track role; let i = $index) {
      <g
        kb
        [label]="'Fit selected mechanism to ' + role + ' socket'"
        [attr.transform]="'translate(' + socketX[i] + ' ' + socketY[i] + ')'"
        (activate)="k.act({ type: 'fit', target: role })"
      >
        <rect class="socket hit" width="98" height="96" rx="8" />
        @if (k.state().placements[role]; as item) {
          <use [attr.href]="'#k-' + item" x="10" y="8" width="77" height="77" />
        }
      </g>
      <g
        kb
        [label]="'Operate fitted ' + role"
        [attr.transform]="'translate(' + (socketX[i] + 49) + ' ' + (socketY[i] + 122) + ')'"
        (activate)="k.act({ type: 'operate', target: role })"
      >
        <ellipse class="hit button-face" rx="37" ry="22" />
        <text class="button-ink" y="8">\u21BB</text>
      </g>
    }
    @for (part of k.config()!.parts; track part; let i = $index) {
      <g
        kb
        [label]="'Lift ' + part + ' mechanism'"
        [pressed]="k.state().selected === part"
        (activate)="k.act({ type: 'select', item: part })"
        [attr.transform]="'translate(42 ' + (62 + i * 135) + ')'"
      >
        <rect class="hit wood" width="130" height="115" rx="8" />
        <use [attr.href]="'#k-' + part" x="24" y="8" width="82" height="82" />
        <text x="65" y="103" class="small">{{ part }}</text>
      </g>
    }
    <g
      kb
      label="Test the assembled printing system"
      transform="translate(864 562)"
      (activate)="k.act({ type: 'test' })"
    >
      <circle class="hit button-face" r="48" />
      <text class="button-ink" y="9">Pull</text>
    </g>
    @if (k.state().trials.length) {
      <g transform="translate(550 543) rotate(-3)">
        <path d="M0 0h207v92H0Z" class="paper" />
        @for (i of typePieces; track i) {
          <path
            [attr.d]="'M' + (24 + i * 43) + ' 22v44h22V22Z'"
            fill="none"
            stroke="#294941"
            stroke-width="6"
            [attr.opacity]="
              fault() === 'none'
                ? 1
                : fault() === 'ink'
                  ? 0.2
                  : fault() === 'type' && i >= (printed()?.controls?.['mold'] ?? 0)
                    ? 0
                    : 0.55
            "
            [attr.transform]="fault() === 'loose' ? 'rotate(' + i * 3 + ' 100 40)' : null"
          />
        }
      </g>
    }
  </svg>`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssemblyComponent, { className: "AssemblyComponent", filePath: "src/app/templates/time-repair/invention/knowledge/assembly.component.ts", lineNumber: 131 });
})();

// src/app/templates/time-repair/invention/knowledge/diagram.component.ts
var _c02 = () => [0, 1];
var _c12 = (a0) => [a0, 1];
function DiagramComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 16);
    \u0275\u0275listener("activate", function DiagramComponent_For_5_Template_g_activate_0_listener() {
      const blueprint_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "blueprint", value: blueprint_r2 }));
    });
    \u0275\u0275element(1, "rect", 17);
    \u0275\u0275elementStart(2, "g", 18);
    \u0275\u0275element(3, "circle", 19)(4, "circle", 20)(5, "circle", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "text", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const blueprint_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Build printed diagram " + (blueprint_r2 === 0 ? "A" : "B"))("pressed", ctx_r2.k.state().values["blueprint"] === blueprint_r2);
    \u0275\u0275attribute("transform", "translate(" + (50 + blueprint_r2 * 165) + " " + (blueprint_r2 ? 67 : 92) + ") rotate(" + (blueprint_r2 ? 4 : -6) + ")");
    \u0275\u0275advance(4);
    \u0275\u0275attribute("cx", blueprint_r2 ? 71 : 85);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", blueprint_r2 === 0 ? "A" : "B", " ");
  }
}
function DiagramComponent_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 27);
    \u0275\u0275element(1, "path", 28)(2, "circle", 29)(3, "path", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx;
    const slot_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("animation-duration", (slot_r5 === 1 ? 2.25 : 3) + "s");
    \u0275\u0275classProp("running", !!ctx_r2.k.state().values["running"])("reverse", slot_r5 === 1);
    \u0275\u0275attribute("transform", slot_r5 === 0 ? "rotate(" + ctx_r2.k.state().values["rotation"] * 45 + ")" : null);
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r2.gear(+item_r6))("fill", +item_r6 === 1 ? "#a3b0a0" : "#bd975c");
  }
}
function DiagramComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 23);
    \u0275\u0275listener("activate", function DiagramComponent_For_7_Template_g_activate_0_listener() {
      const slot_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "fit", target: "" + slot_r5 }));
    });
    \u0275\u0275element(1, "circle", 24)(2, "circle", 25);
    \u0275\u0275conditionalCreate(3, DiagramComponent_For_7_Conditional_3_Template, 4, 9, ":svg:g", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const slot_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Fit the lifted wheel onto axle " + (slot_r5 + 1));
    \u0275\u0275attribute("transform", "translate(" + ctx_r2.axle(slot_r5) + " 346)");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.k.state().placements["" + slot_r5]) ? 3 : -1, tmp_12_0);
  }
}
function DiagramComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 23);
    \u0275\u0275listener("activate", function DiagramComponent_For_9_Template_g_activate_0_listener() {
      const direction_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "shift", value: direction_r8 }));
    });
    \u0275\u0275element(1, "rect", 31);
    \u0275\u0275elementStart(2, "text", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const direction_r8 = ctx.$implicit;
    \u0275\u0275property("label", direction_r8 < 0 ? "Move middle axle left" : "Move middle axle right");
    \u0275\u0275attribute("transform", "translate(" + (472 + direction_r8 * 54) + " 471)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(direction_r8 < 0 ? "\u2190" : "\u2192");
  }
}
function DiagramComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 16);
    \u0275\u0275listener("activate", function DiagramComponent_For_19_Template_g_activate_0_listener() {
      const part_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "select", item: "" + part_r10 }));
    });
    \u0275\u0275element(1, "rect", 33)(2, "path", 34)(3, "circle", 35);
    \u0275\u0275elementStart(4, "text", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const part_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Lift wheel " + (part_r10 + 1))("pressed", ctx_r2.k.state().selected === "" + part_r10);
    \u0275\u0275attribute("transform", "translate(" + (280 + part_r10 * 160) + " 582)");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("d", ctx_r2.gear(part_r10));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(part_r10 + 1);
  }
}
function DiagramComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 15);
    \u0275\u0275element(1, "rect", 37);
    \u0275\u0275elementStart(2, "g", 38);
    \u0275\u0275element(3, "circle", 39)(4, "circle", 40)(5, "circle", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "text", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275attribute("cx", 67 + (ctx_r2.k.state().values["printed"] - 472) * 0.35);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.k.state().values["revision"], " \xB7 \u21BB ");
  }
}
var DiagramComponent = class _DiagramComponent {
  k = inject(KnowledgeRuntime);
  slots = [0, 1, 2];
  axle(i) {
    return i === 1 ? this.k.state().values["middle"] : this.k.config().axles[i];
  }
  gear(i) {
    return gearPath(this.k.config().gearRadii[i], Math.round(this.k.config().gearRadii[i] / 3.2));
  }
  static \u0275fac = function DiagramComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DiagramComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiagramComponent, selectors: [["app-knowledge-diagram"]], decls: 24, vars: 6, consts: [["viewBox", "0 0 1000 660", "preserveAspectRatio", "xMidYMid meet", "role", "group", "aria-label", "Build and test two printed gear diagrams", 1, "scene"], ["knowledge-room", ""], ["d", "M260 218L779 218 805 490 247 490Z", "fill", "#604936", "stroke", "#c09c64", "stroke-width", "6"], ["d", "M282 246H755V451H282Z", "fill", "#223e3e", "stroke", "#8e9b7c", "stroke-width", "2"], ["kb", "", 3, "label", "pressed"], ["kb", "", 3, "label"], ["d", "M292 346H243V410H220", "fill", "none", "stroke", "#ae9567", "stroke-width", "13"], ["kb", "", "label", "Turn the crank and test transmission", "transform", "translate(216 412)", 3, "activate"], ["r", "43", 1, "button-face", "hit"], ["y", "10", 1, "button-ink"], ["d", "M665 346H747V427", "fill", "none", "stroke", "#c6b581", "stroke-width", "12"], ["d", "M713 424h70l-9 45h-52Z", "fill", "#859f89", "stroke", "#e0c18b", "stroke-width", "4"], ["kb", "", "label", "Stamp a revised diagram of the tested arrangement", "transform", "translate(856 527)", 3, "activate"], ["href", "#k-ink", "x", "-43", "y", "-43", "width", "86", "height", "86"], ["x", "-51", "y", "-51", "width", "102", "height", "102", "rx", "20", "fill", "transparent", 1, "hit"], ["transform", "translate(790 91) rotate(5)"], ["kb", "", 3, "activate", "label", "pressed"], ["width", "144", "height", "124", 1, "paper", "hit"], ["fill", "none", "stroke", "#345b50", "stroke-width", "2"], ["cx", "32", "cy", "60", "r", "22"], ["cy", "60", "r", "16"], ["cx", "110", "cy", "60", "r", "22"], ["x", "72", "y", "107", "fill", "#8c4d3e", "text-anchor", "middle", "font-size", "22"], ["kb", "", 3, "activate", "label"], ["r", "24", "fill", "transparent", 1, "hit"], ["r", "13", "fill", "#cfb784", "stroke", "#5f725e", "stroke-width", "4"], [2, "pointer-events", "none", 3, "running", "reverse", "animation-duration"], [2, "pointer-events", "none"], ["stroke", "#465b4b", "stroke-width", "4"], ["r", "19", "fill", "#304846", "stroke", "#ded0a1", "stroke-width", "5"], ["d", "M0-25V-45M25 0H45M0 25V45M-25 0H-45", "stroke", "#6f6f4e", "stroke-width", "8"], ["x", "-39", "y", "-21", "width", "78", "height", "44", "rx", "9", 1, "button-face", "hit"], ["y", "9", 1, "button-ink"], ["x", "-76", "y", "-72", "width", "152", "height", "144", "rx", "12", "fill", "transparent", 1, "hit"], ["fill", "#a38b59", "stroke", "#4d5e4d", "stroke-width", "4"], ["r", "18", "fill", "#344f48"], ["y", "7", "text-anchor", "middle", "fill", "#f1d8a5", "font-size", "22"], ["width", "152", "height", "148", 1, "paper"], ["fill", "none", "stroke", "#3d5e52", "stroke-width", "3"], ["cx", "29", "cy", "72", "r", "22"], ["cy", "72", "r", "17"], ["cx", "107", "cy", "72", "r", "22"], ["x", "76", "y", "127", "text-anchor", "middle", "fill", "#985f46", "font-size", "19"]], template: function DiagramComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "g", 1)(2, "path", 2)(3, "path", 3);
      \u0275\u0275repeaterCreate(4, DiagramComponent_For_5_Template, 8, 5, ":svg:g", 4, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(6, DiagramComponent_For_7_Template, 4, 3, ":svg:g", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(8, DiagramComponent_For_9_Template, 4, 3, ":svg:g", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(10, "path", 6);
      \u0275\u0275elementStart(11, "g", 7);
      \u0275\u0275listener("activate", function DiagramComponent_Template_g_activate_11_listener() {
        return ctx.k.act({ type: "crank" });
      });
      \u0275\u0275element(12, "circle", 8);
      \u0275\u0275elementStart(13, "text", 9);
      \u0275\u0275text(14, "\u21BB");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "g");
      \u0275\u0275element(16, "path", 10)(17, "path", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(18, DiagramComponent_For_19_Template, 6, 5, ":svg:g", 4, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(20, "g", 12);
      \u0275\u0275listener("activate", function DiagramComponent_Template_g_activate_20_listener() {
        return ctx.k.act({ type: "print" });
      });
      \u0275\u0275element(21, "use", 13)(22, "rect", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, DiagramComponent_Conditional_23_Template, 8, 2, ":svg:g", 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(3, _c02));
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.slots);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(\u0275\u0275pureFunction1(4, _c12, -1));
      \u0275\u0275advance(7);
      \u0275\u0275classProp("operate", !!ctx.k.state().values["running"]);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.slots);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.k.state().values["revision"] ? 23 : -1);
    }
  }, dependencies: [KnowledgeRoomComponent, SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiagramComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-diagram", imports: [KnowledgeRoomComponent, SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Build and test two printed gear diagrams"
  >
    <g knowledge-room />
    <path d="M260 218L779 218 805 490 247 490Z" fill="#604936" stroke="#c09c64" stroke-width="6" />
    <path d="M282 246H755V451H282Z" fill="#223e3e" stroke="#8e9b7c" stroke-width="2" />
    @for (blueprint of [0, 1]; track blueprint) {
      <g
        kb
        [label]="'Build printed diagram ' + (blueprint === 0 ? 'A' : 'B')"
        [pressed]="k.state().values['blueprint'] === blueprint"
        (activate)="k.act({ type: 'blueprint', value: blueprint })"
        [attr.transform]="
          'translate(' +
          (50 + blueprint * 165) +
          ' ' +
          (blueprint ? 67 : 92) +
          ') rotate(' +
          (blueprint ? 4 : -6) +
          ')'
        "
      >
        <rect class="paper hit" width="144" height="124" />
        <g fill="none" stroke="#345b50" stroke-width="2">
          <circle cx="32" cy="60" r="22" />
          <circle [attr.cx]="blueprint ? 71 : 85" cy="60" r="16" />
          <circle cx="110" cy="60" r="22" />
        </g>
        <text x="72" y="107" fill="#8c4d3e" text-anchor="middle" font-size="22">
          {{ blueprint === 0 ? 'A' : 'B' }}
        </text>
      </g>
    }
    @for (slot of slots; track slot) {
      <g
        kb
        [label]="'Fit the lifted wheel onto axle ' + (slot + 1)"
        (activate)="k.act({ type: 'fit', target: '' + slot })"
        [attr.transform]="'translate(' + axle(slot) + ' 346)'"
      >
        <circle r="24" fill="transparent" class="hit" />
        <circle r="13" fill="#cfb784" stroke="#5f725e" stroke-width="4" />
        @if (k.state().placements['' + slot]; as item) {
          <g
            style="pointer-events:none"
            [class.running]="!!k.state().values['running']"
            [class.reverse]="slot === 1"
            [style.animation-duration]="(slot === 1 ? 2.25 : 3) + 's'"
            [attr.transform]="
              slot === 0 ? 'rotate(' + k.state().values['rotation'] * 45 + ')' : null
            "
          >
            <path
              [attr.d]="gear(+item)"
              [attr.fill]="+item === 1 ? '#a3b0a0' : '#bd975c'"
              stroke="#465b4b"
              stroke-width="4"
            />
            <circle r="19" fill="#304846" stroke="#ded0a1" stroke-width="5" />
            <path d="M0-25V-45M25 0H45M0 25V45M-25 0H-45" stroke="#6f6f4e" stroke-width="8" />
          </g>
        }
      </g>
    }
    @for (direction of [-1, 1]; track direction) {
      <g
        kb
        [label]="direction < 0 ? 'Move middle axle left' : 'Move middle axle right'"
        (activate)="k.act({ type: 'shift', value: direction })"
        [attr.transform]="'translate(' + (472 + direction * 54) + ' 471)'"
      >
        <rect class="button-face hit" x="-39" y="-21" width="78" height="44" rx="9" />
        <text class="button-ink" y="9">{{ direction < 0 ? '\u2190' : '\u2192' }}</text>
      </g>
    }
    <path d="M292 346H243V410H220" fill="none" stroke="#ae9567" stroke-width="13" />
    <g
      kb
      label="Turn the crank and test transmission"
      (activate)="k.act({ type: 'crank' })"
      transform="translate(216 412)"
    >
      <circle class="button-face hit" r="43" />
      <text class="button-ink" y="10">\u21BB</text>
    </g>
    <g [class.operate]="!!k.state().values['running']">
      <path d="M665 346H747V427" fill="none" stroke="#c6b581" stroke-width="12" />
      <path d="M713 424h70l-9 45h-52Z" fill="#859f89" stroke="#e0c18b" stroke-width="4" />
    </g>
    @for (part of slots; track part) {
      <g
        kb
        [label]="'Lift wheel ' + (part + 1)"
        [pressed]="k.state().selected === '' + part"
        (activate)="k.act({ type: 'select', item: '' + part })"
        [attr.transform]="'translate(' + (280 + part * 160) + ' 582)'"
      >
        <rect class="hit" x="-76" y="-72" width="152" height="144" rx="12" fill="transparent" />
        <path [attr.d]="gear(part)" fill="#a38b59" stroke="#4d5e4d" stroke-width="4" />
        <circle r="18" fill="#344f48" />
        <text y="7" text-anchor="middle" fill="#f1d8a5" font-size="22">{{ part + 1 }}</text>
      </g>
    }
    <g
      kb
      label="Stamp a revised diagram of the tested arrangement"
      (activate)="k.act({ type: 'print' })"
      transform="translate(856 527)"
    >
      <use href="#k-ink" x="-43" y="-43" width="86" height="86" />
      <rect class="hit" x="-51" y="-51" width="102" height="102" rx="20" fill="transparent" />
    </g>
    @if (k.state().values['revision']) {
      <g transform="translate(790 91) rotate(5)">
        <rect width="152" height="148" class="paper" />
        <g fill="none" stroke="#3d5e52" stroke-width="3">
          <circle cx="29" cy="72" r="22" />
          <circle [attr.cx]="67 + (k.state().values['printed'] - 472) * 0.35" cy="72" r="17" />
          <circle cx="107" cy="72" r="22" />
        </g>
        <text x="76" y="127" text-anchor="middle" fill="#985f46" font-size="19">
          {{ k.state().values['revision'] }} \xB7 \u21BB
        </text>
      </g>
    }
  </svg>`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiagramComponent, { className: "DiagramComponent", filePath: "src/app/templates/time-repair/invention/knowledge/diagram.component.ts", lineNumber: 141 });
})();

// src/app/templates/time-repair/invention/knowledge/distribution.component.ts
var _c03 = ["stage"];
var _forTrack03 = ($index, $item) => $item.id;
function DistributionComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function DistributionComponent_For_5_Template_button_click_0_listener() {
      const place_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "move", target: place_r2.id }));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const place_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Walk to ", place_r2.name, " ");
  }
}
var KNOWLEDGE_TOWN_LOADER = new InjectionToken("KNOWLEDGE_TOWN_LOADER", {
  providedIn: "root",
  factory: () => () => import("./chunk-C4LTVRAI.js")
});
var DistributionComponent = class _DistributionComponent {
  k = inject(KnowledgeRuntime);
  loader = inject(KNOWLEDGE_TOWN_LOADER);
  scene;
  destroyed = false;
  stage;
  constructor() {
    effect(() => {
      const state = this.k.state();
      this.scene?.refresh(state);
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit() {
    try {
      const { mountKnowledgeTown } = await this.loader();
      if (this.destroyed)
        return;
      const scene = await mountKnowledgeTown(this.stage.nativeElement, this.k.config(), this.k.state(), (a) => this.k.act(a));
      if (this.destroyed)
        scene.destroy();
      else {
        this.scene = scene;
        scene.refresh(this.k.state());
      }
    } catch {
      this.k.storageMessage.set("The town renderer could not load. Reload this page to try again.");
    }
  }
  static \u0275fac = function DistributionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DistributionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DistributionComponent, selectors: [["app-knowledge-distribution"]], viewQuery: function DistributionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stage = _t.first);
    }
  }, decls: 10, vars: 0, consts: [["stage", ""], ["role", "group", "aria-label", "Carry printed copies through the town along its streets", 1, "town"], ["aria-hidden", "true", 1, "canvas"], [1, "keyboard-objects"], [3, "click"]], template: function DistributionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "div", 2, 0);
      \u0275\u0275domElementStart(3, "div", 3);
      \u0275\u0275repeaterCreate(4, DistributionComponent_For_5_Template, 2, 1, "button", null, _forTrack03);
      \u0275\u0275domElementStart(6, "button", 4);
      \u0275\u0275domListener("click", function DistributionComponent_Template_button_click_6_listener() {
        return ctx.k.act({ type: "load" });
      });
      \u0275\u0275text(7, "Load a copy at the workshop");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 4);
      \u0275\u0275domListener("click", function DistributionComponent_Template_button_click_8_listener() {
        return ctx.k.act({ type: "deliver" });
      });
      \u0275\u0275text(9, "Hand over a carried copy");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.k.config().places);
    }
  }, styles: ["\n[_nghost-%COMP%], \n.town[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  position: relative;\n  background: #27483f;\n}\n.canvas[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.keyboard-objects[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  right: 12px;\n  pointer-events: none;\n}\nbutton[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  position: relative;\n  width: auto;\n  height: auto;\n  clip-path: none;\n  padding: 12px;\n  background: #f2ddad;\n  color: #183c35;\n  border: 3px solid #8de7c6;\n  border-radius: 5px;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=distribution.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DistributionComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-distribution", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="town"
      role="group"
      aria-label="Carry printed copies through the town along its streets"
    >
      <div #stage class="canvas" aria-hidden="true"></div>
      <div class="keyboard-objects">
        @for (place of k.config()!.places!; track place.id) {
          <button (click)="k.act({ type: 'move', target: place.id })">
            Walk to {{ place.name }}
          </button>
        }
        <button (click)="k.act({ type: 'load' })">Load a copy at the workshop</button>
        <button (click)="k.act({ type: 'deliver' })">Hand over a carried copy</button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;40a727dfa7c3cfbf770687c4b331eb99d9978d9c86e53b4aba450efb7a1c394d;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/time-repair/invention/knowledge/distribution.component.ts */\n:host,\n.town {\n  display: block;\n  height: 100%;\n  position: relative;\n  background: #27483f;\n}\n.canvas {\n  position: absolute;\n  inset: 0;\n}\n.keyboard-objects {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  right: 12px;\n  pointer-events: none;\n}\nbutton {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\nbutton:focus-visible {\n  position: relative;\n  width: auto;\n  height: auto;\n  clip-path: none;\n  padding: 12px;\n  background: #f2ddad;\n  color: #183c35;\n  border: 3px solid #8de7c6;\n  border-radius: 5px;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=distribution.component.css.map */\n"] }]
  }], () => [], { stage: [{
    type: ViewChild,
    args: ["stage", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DistributionComponent, { className: "DistributionComponent", filePath: "src/app/templates/time-repair/invention/knowledge/distribution.component.ts", lineNumber: 84 });
})();

// src/app/templates/time-repair/invention/knowledge/access.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function AccessComponent_For_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 14)(1, "circle", 15)(2, "path", 16);
  }
}
function AccessComponent_For_4_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 18)(1, "path", 19);
    \u0275\u0275elementStart(2, "text", 20);
    \u0275\u0275text(3, "0");
    \u0275\u0275elementEnd();
  }
}
function AccessComponent_For_4_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 21);
    \u0275\u0275elementStart(1, "text", 22);
    \u0275\u0275text(2, "\u03A9 \u2260 A");
    \u0275\u0275elementEnd();
  }
}
function AccessComponent_For_4_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 23)(1, "path", 24);
  }
}
function AccessComponent_For_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 17);
    \u0275\u0275conditionalCreate(1, AccessComponent_For_4_Conditional_7_Conditional_1_Template, 4, 0)(2, AccessComponent_For_4_Conditional_7_Conditional_2_Template, 3, 0)(3, AccessComponent_For_4_Conditional_7_Conditional_3_Template, 2, 0);
  }
  if (rf & 2) {
    const reader_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(reader_r2.barrier === "cost" ? 1 : reader_r2.barrier === "language" ? 2 : 3);
  }
}
function AccessComponent_For_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 11);
  }
  if (rf & 2) {
    const reader_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("opacity", reader_r2.barrier === "cost" && !ctx_r2.using(reader_r2.id) ? 0.45 : 1);
  }
}
function AccessComponent_For_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 12);
  }
  if (rf & 2) {
    \u0275\u0275attribute("href", "#k-" + ctx);
  }
}
function AccessComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 6);
    \u0275\u0275listener("activate", function AccessComponent_For_4_Template_g_activate_0_listener() {
      const reader_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "offer", target: reader_r2.id }));
    });
    \u0275\u0275element(1, "ellipse", 7)(2, "use", 8)(3, "path", 9)(4, "path", 10);
    \u0275\u0275elementStart(5, "g");
    \u0275\u0275conditionalCreate(6, AccessComponent_For_4_Conditional_6_Template, 3, 0)(7, AccessComponent_For_4_Conditional_7_Template, 4, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, AccessComponent_For_4_Conditional_8_Template, 1, 1, ":svg:use", 11);
    \u0275\u0275conditionalCreate(9, AccessComponent_For_4_Conditional_9_Template, 1, 1, ":svg:use", 12);
    \u0275\u0275element(10, "rect", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const reader_r2 = ctx.$implicit;
    const \u0275$index_7_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Offer the selected resource to " + reader_r2.name);
    \u0275\u0275attribute("transform", "translate(" + (55 + \u0275$index_7_r4 * 312) + " 165)");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("color", ctx_r2.colors[\u0275$index_7_r4]);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("operate", ctx_r2.using(reader_r2.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.using(reader_r2.id) ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.k.state().values["copy-" + reader_r2.id] ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = ctx_r2.k.state().placements[reader_r2.id]) ? 9 : -1, tmp_17_0);
  }
}
function AccessComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 25);
    \u0275\u0275listener("activate", function AccessComponent_For_7_Template_g_activate_0_listener() {
      const tool_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "select", item: tool_r6 }));
    });
    \u0275\u0275element(1, "ellipse", 26)(2, "use", 27);
    \u0275\u0275elementStart(3, "text", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "rect", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tool_r6 = ctx.$implicit;
    const \u0275$index_59_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", ctx_r2.labels[tool_r6])("pressed", ctx_r2.k.state().selected === tool_r6);
    \u0275\u0275attribute("transform", "translate(" + (127 + \u0275$index_59_r7 * 220) + " 498)");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("href", "#k-" + tool_r6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.short[tool_r6]);
  }
}
var AccessComponent = class _AccessComponent {
  k = inject(KnowledgeRuntime);
  tools = ACCESS_TOOLS;
  colors = ["#a58d60", "#628c8c", "#a66e52"];
  short = {
    copy: "Copy",
    loan: "Lend",
    translation: "Translate",
    reading: "Read together"
  };
  labels = {
    copy: "Offer another printed copy",
    loan: "Arrange a shared book loan",
    translation: "Bring a translation",
    reading: "Bring a reader to explain aloud"
  };
  using(id) {
    return !!this.k.state().values["using-" + id];
  }
  static \u0275fac = function AccessComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessComponent, selectors: [["app-knowledge-access"]], decls: 8, vars: 0, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "A shared workshop: make a printed plan usable for three people", 1, "scene"], ["knowledge-room", ""], ["d", "M18 207H976V432H18Z", "fill", "#152f33", "opacity", ".7"], ["kb", "", 3, "label"], ["d", "M61 523Q485 491 941 525L927 629H77Z", "fill", "#473c30", "stroke", "#c3a16c", "stroke-width", "5"], ["kb", "", 3, "label", "pressed"], ["kb", "", 3, "activate", "label"], ["cx", "135", "cy", "299", "rx", "136", "ry", "22", "fill", "#183433", "opacity", ".35"], ["href", "#k-person", "x", "94", "y", "-37", "width", "114", "height", "174"], ["d", "M3 173L220 159 270 217 32 232Z", "fill", "#bd9460", "stroke", "#4b4233", "stroke-width", "5"], ["d", "M32 232v69m221-85v72M9 175v104", "stroke", "#684a32", "stroke-width", "15"], ["href", "#k-copy", "x", "12", "y", "127", "width", "74", "height", "90"], ["x", "185", "y", "82", "width", "84", "height", "87"], ["x", "-6", "y", "-51", "width", "284", "height", "355", "fill", "transparent", "rx", "12", 1, "hit"], ["d", "M66 183L117 84 197 179ZM117 84V191M83 152H172", "fill", "none", "stroke", "#e4c286", "stroke-width", "9"], ["cx", "117", "cy", "144", "r", "9", "fill", "#51847b"], ["d", "M169 48l15 14 27-32", "fill", "none", "stroke", "#a1e1bd", "stroke-width", "5"], ["d", "M65 190l114-12m-107-8 122 22M91 202l87-41", "stroke", "#d6b37c", "stroke-width", "8"], ["d", "M36 63q-22 29 4 42q37 9 38-20L65 64Z", "fill", "#73513f", "stroke", "#c5a175", "stroke-width", "3"], ["d", "M36 64H65", "stroke", "#e9cc92", "stroke-width", "3"], ["x", "55", "y", "92", 1, "small"], ["d", "M12 30H98V89H47L36 107V89H12Z", "fill", "#e8d3a4"], ["x", "54", "y", "68", "fill", "#405e51", "font-size", "31", "text-anchor", "middle"], ["d", "M21 44q22-25 44 0q10 15-4 25l-9 17q-8 8-15-1", "fill", "none", "stroke", "#e6c98e", "stroke-width", "7"], ["d", "M76 35q22 20 0 39", "fill", "none", "stroke", "#95b4a0", "stroke-width", "3"], ["kb", "", 3, "activate", "label", "pressed"], ["cx", "45", "cy", "97", "rx", "65", "ry", "13", "fill", "#172d2e", "opacity", ".3"], ["width", "100", "height", "105"], ["x", "50", "y", "126", 1, "label"], ["x", "-24", "y", "-8", "width", "151", "height", "143", "rx", "8", "fill", "transparent", 1, "hit"]], template: function AccessComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "g", 1)(2, "path", 2);
      \u0275\u0275repeaterCreate(3, AccessComponent_For_4_Template, 11, 8, ":svg:g", 3, _forTrack04);
      \u0275\u0275element(5, "path", 4);
      \u0275\u0275repeaterCreate(6, AccessComponent_For_7_Template, 6, 5, ":svg:g", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.k.config().readers);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.tools);
    }
  }, dependencies: [KnowledgeRoomComponent, SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-access", imports: [KnowledgeRoomComponent, SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    role="group"
    aria-label="A shared workshop: make a printed plan usable for three people"
  >
    <g knowledge-room />
    <path d="M18 207H976V432H18Z" fill="#152f33" opacity=".7" />
    @for (reader of k.config()!.readers!; track reader.id; let i = $index) {
      <g
        kb
        [label]="'Offer the selected resource to ' + reader.name"
        (activate)="k.act({ type: 'offer', target: reader.id })"
        [attr.transform]="'translate(' + (55 + i * 312) + ' 165)'"
      >
        <ellipse cx="135" cy="299" rx="136" ry="22" fill="#183433" opacity=".35" />
        <use href="#k-person" x="94" y="-37" width="114" height="174" [attr.color]="colors[i]" />
        <path d="M3 173L220 159 270 217 32 232Z" fill="#bd9460" stroke="#4b4233" stroke-width="5" />
        <path d="M32 232v69m221-85v72M9 175v104" stroke="#684a32" stroke-width="15" />
        <g [class.operate]="using(reader.id)">
          @if (using(reader.id)) {
            <path
              d="M66 183L117 84 197 179ZM117 84V191M83 152H172"
              fill="none"
              stroke="#e4c286"
              stroke-width="9"
            />
            <circle cx="117" cy="144" r="9" fill="#51847b" />
            <path d="M169 48l15 14 27-32" fill="none" stroke="#a1e1bd" stroke-width="5" />
          } @else {
            <path d="M65 190l114-12m-107-8 122 22M91 202l87-41" stroke="#d6b37c" stroke-width="8" />
            @if (reader.barrier === 'cost') {
              <path
                d="M36 63q-22 29 4 42q37 9 38-20L65 64Z"
                fill="#73513f"
                stroke="#c5a175"
                stroke-width="3"
              />
              <path d="M36 64H65" stroke="#e9cc92" stroke-width="3" />
              <text x="55" y="92" class="small">0</text>
            } @else if (reader.barrier === 'language') {
              <path d="M12 30H98V89H47L36 107V89H12Z" fill="#e8d3a4" />
              <text x="54" y="68" fill="#405e51" font-size="31" text-anchor="middle">\u03A9 \u2260 A</text>
            } @else {
              <path
                d="M21 44q22-25 44 0q10 15-4 25l-9 17q-8 8-15-1"
                fill="none"
                stroke="#e6c98e"
                stroke-width="7"
              />
              <path d="M76 35q22 20 0 39" fill="none" stroke="#95b4a0" stroke-width="3" />
            }
          }
        </g>
        @if (k.state().values['copy-' + reader.id]) {
          <use
            href="#k-copy"
            x="12"
            y="127"
            width="74"
            height="90"
            [attr.opacity]="reader.barrier === 'cost' && !using(reader.id) ? 0.45 : 1"
          />
        }
        @if (k.state().placements[reader.id]; as helper) {
          <use [attr.href]="'#k-' + helper" x="185" y="82" width="84" height="87" />
        }
        <rect class="hit" x="-6" y="-51" width="284" height="355" fill="transparent" rx="12" />
      </g>
    }
    <path
      d="M61 523Q485 491 941 525L927 629H77Z"
      fill="#473c30"
      stroke="#c3a16c"
      stroke-width="5"
    />
    @for (tool of tools; track tool; let i = $index) {
      <g
        kb
        [label]="labels[tool]"
        [pressed]="k.state().selected === tool"
        (activate)="k.act({ type: 'select', item: tool })"
        [attr.transform]="'translate(' + (127 + i * 220) + ' 498)'"
      >
        <ellipse cx="45" cy="97" rx="65" ry="13" fill="#172d2e" opacity=".3" />
        <use [attr.href]="'#k-' + tool" width="100" height="105" />
        <text x="50" y="126" class="label">{{ short[tool] }}</text>
        <rect class="hit" x="-24" y="-8" width="151" height="143" rx="8" fill="transparent" />
      </g>
    }
  </svg>`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessComponent, { className: "AccessComponent", filePath: "src/app/templates/time-repair/invention/knowledge/access.component.ts", lineNumber: 103 });
})();

// src/app/templates/time-repair/invention/knowledge/apprentice.component.ts
function TeachingObjectComponent_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 2);
  }
  if (rf & 2) {
    const line_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", "M17 " + (48 + line_r1 * 8) + "h" + (ctx_r1.item() === "before-packing" && line_r1 % 2 ? 30 : 57));
  }
}
function TeachingObjectComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 0);
    \u0275\u0275domElementStart(1, "g")(2, "text", 1);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(4, TeachingObjectComponent_Conditional_0_For_5_Template, 1, 1, ":svg:path", 2, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("opacity", ctx_r1.item() === "before-ink" ? 0.24 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.item() === "before-type" ? "LIBRE" : "LIBER", " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lines);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "ellipse", 4)(1, "circle", 5)(2, "circle", 6);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "ellipse", 7)(1, "path", 8);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "use", 3);
    \u0275\u0275conditionalCreate(1, TeachingObjectComponent_Conditional_1_Conditional_0_Conditional_1_Template, 3, 0)(2, TeachingObjectComponent_Conditional_1_Conditional_0_Conditional_2_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.item().startsWith("fault") ? 1 : 2);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 10)(1, "path", 11);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "use", 9);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TeachingObjectComponent_Conditional_1_Conditional_1_Conditional_0_Template, 2, 0)(1, TeachingObjectComponent_Conditional_1_Conditional_1_Conditional_1_Template, 1, 0, ":svg:use", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.item().startsWith("fault") ? 0 : 1);
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "rect", 13);
    \u0275\u0275domElementStart(1, "text", 14);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const letter_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275attribute("x", 7 + $index_r4 * 17);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 14 + $index_r4 * 17)("transform", "translate(" + (28 + $index_r4 * 34) + " 0) scale(-1 1)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", letter_r3, " ");
  }
}
function TeachingObjectComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 12);
    \u0275\u0275repeaterCreate(1, TeachingObjectComponent_Conditional_1_Conditional_2_For_2_Template, 3, 4, null, null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater((ctx_r1.item().startsWith("fault") ? "ERBIL" : "REBIL").split(""));
  }
}
function TeachingObjectComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TeachingObjectComponent_Conditional_1_Conditional_0_Template, 3, 1)(1, TeachingObjectComponent_Conditional_1_Conditional_1_Template, 2, 1)(2, TeachingObjectComponent_Conditional_1_Conditional_2_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.part() === "ink" ? 0 : ctx_r1.part() === "packing" ? 1 : 2);
  }
}
function ApprenticeComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 9);
  }
  if (rf & 2) {
    const n_r1 = ctx.$implicit;
    \u0275\u0275attribute("d", "M133 " + (43 + n_r1 * 15) + "l35-10");
  }
}
function ApprenticeComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "g", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("item", (ctx_r1.k.state().values["running"] === 1 ? "after-" : "before-") + ctx_r1.fault());
    \u0275\u0275attribute("transform", "translate(180 290) scale(.95)");
  }
}
function ApprenticeComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 25);
    \u0275\u0275listener("activate", function ApprenticeComponent_For_21_Template_g_activate_0_listener() {
      const \u0275$index_40_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "case", value: \u0275$index_40_r4 }));
    });
    \u0275\u0275element(1, "g", 16)(2, "rect", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fault_r5 = ctx.$implicit;
    const \u0275$index_40_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Investigate the " + fault_r5 + " failure")("pressed", ctx_r1.k.state().values["case"] === \u0275$index_40_r4);
    \u0275\u0275attribute("transform", "translate(" + \u0275$index_40_r4 * 107 + " 0)");
    \u0275\u0275advance();
    \u0275\u0275property("item", "before-" + fault_r5);
  }
}
function ApprenticeComponent_For_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "g", 29);
  }
  if (rf & 2) {
    \u0275\u0275property("item", ctx);
  }
}
function ApprenticeComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 27);
    \u0275\u0275listener("activate", function ApprenticeComponent_For_24_Template_g_activate_0_listener() {
      const \u0275$index_49_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "place", target: "" + \u0275$index_49_r7 }));
    });
    \u0275\u0275element(1, "rect", 28);
    \u0275\u0275conditionalCreate(2, ApprenticeComponent_For_24_Conditional_2_Template, 1, 1, ":svg:g", 29);
    \u0275\u0275elementStart(3, "text", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const \u0275$index_49_r7 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Teaching position " + (\u0275$index_49_r7 + 1) + ". Place selected example.");
    \u0275\u0275attribute("transform", "translate(" + (178 + \u0275$index_49_r7 % 2 * 152) + " " + (209 + ctx_r1.Math.floor(\u0275$index_49_r7 / 2) * 79) + ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = ctx_r1.k.state().placements["" + \u0275$index_49_r7]) ? 2 : -1, tmp_13_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_49_r7 + 1);
  }
}
function ApprenticeComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 24);
  }
}
function ApprenticeComponent_For_30_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 25);
    \u0275\u0275listener("activate", function ApprenticeComponent_For_30_For_1_Conditional_0_Template_g_activate_0_listener() {
      \u0275\u0275restoreView(_r8);
      const stage_r9 = \u0275\u0275nextContext().$implicit;
      const case_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "select", item: stage_r9 + "-" + case_r10 }));
    });
    \u0275\u0275element(1, "g", 31)(2, "rect", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    const stage_r9 = ctx_r10.$implicit;
    const \u0275$index_70_r12 = ctx_r10.$index;
    const ctx_r12 = \u0275\u0275nextContext();
    const case_r10 = ctx_r12.$implicit;
    const \u0275$index_69_r14 = ctx_r12.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("label", ctx_r1.objectLabel(stage_r9, case_r10))("pressed", ctx_r1.k.state().selected === stage_r9 + "-" + case_r10);
    \u0275\u0275attribute("transform", "translate(" + (58 + \u0275$index_70_r12 * 230 + \u0275$index_69_r14 * 8) + " " + (425 + \u0275$index_69_r14 * 70) + ")");
    \u0275\u0275advance();
    \u0275\u0275property("item", stage_r9 + "-" + case_r10);
  }
}
function ApprenticeComponent_For_30_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ApprenticeComponent_For_30_For_1_Conditional_0_Template, 3, 4, ":svg:g", 18);
  }
  if (rf & 2) {
    const stage_r9 = ctx.$implicit;
    const \u0275$index_69_r14 = \u0275\u0275nextContext().$index;
    \u0275\u0275conditional(stage_r9 !== "after" || \u0275$index_69_r14 === 0 ? 0 : -1);
  }
}
function ApprenticeComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ApprenticeComponent_For_30_For_1_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.trayOrder);
  }
}
var TeachingObjectComponent = class _TeachingObjectComponent {
  item = input.required(
    ...ngDevMode ? [{ debugName: "item" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lines = [0, 1, 2, 3];
  part = computed(
    () => this.item().split("-")[1],
    ...ngDevMode ? [{ debugName: "part" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function TeachingObjectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeachingObjectComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeachingObjectComponent, selectors: [["g", "teaching-object", ""]], inputs: { item: [1, "item"] }, decls: 2, vars: 1, consts: [["d", "M7 3L93 8 89 91 4 86Z", "fill", "#ead9ad", "stroke", "#a38050", "stroke-width", "2"], ["x", "12", "y", "37", "fill", "#344f48", "font-size", "21", "font-family", "Georgia"], ["stroke", "#405a4d", "stroke-width", "3"], ["href", "#k-ink", "width", "100", "height", "100"], ["cx", "48", "cy", "64", "rx", "27", "ry", "10", "fill", "#aababa", "opacity", ".8"], ["cx", "25", "cy", "88", "r", "5", "fill", "#688c91"], ["cx", "67", "cy", "92", "r", "7", "fill", "#688c91"], ["cx", "48", "cy", "63", "rx", "27", "ry", "12", "fill", "#142e30"], ["d", "M28 55Q48 47 65 56", "stroke", "#81928a", "fill", "none", "stroke-width", "3"], ["href", "#k-packing", "width", "100", "height", "100"], ["d", "M10 59L64 44 92 65 39 82Z", "fill", "#dfc594", "stroke", "#8d764d", "stroke-width", "3"], ["d", "M10 59L35 39 64 44", "fill", "#b29970"], ["d", "M3 20H97V77H3Z", "fill", "#4b645b", "stroke", "#ccb789", "stroke-width", "3"], ["y", "29", "width", "15", "height", "37", "fill", "#a7b7aa"], ["y", "55", "font-size", "16", "text-anchor", "middle", "fill", "#2b4945"]], template: function TeachingObjectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, TeachingObjectComponent_Conditional_0_Template, 6, 2)(1, TeachingObjectComponent_Conditional_1_Template, 3, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.item().startsWith("before") || ctx.item().startsWith("after") ? 0 : 1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeachingObjectComponent, [{
    type: Component,
    args: [{
      selector: "g[teaching-object]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (item().startsWith('before') || item().startsWith('after')) {
      <svg:path d="M7 3L93 8 89 91 4 86Z" fill="#ead9ad" stroke="#a38050" stroke-width="2" />
      <svg:g [attr.opacity]="item() === 'before-ink' ? 0.24 : 1">
        <svg:text x="12" y="37" fill="#344f48" font-size="21" font-family="Georgia">
          {{ item() === 'before-type' ? 'LIBRE' : 'LIBER' }}
        </svg:text>
        @for (line of lines; track line) {
          <svg:path
            [attr.d]="
              'M17 ' + (48 + line * 8) + 'h' + (item() === 'before-packing' && line % 2 ? 30 : 57)
            "
            stroke="#405a4d"
            stroke-width="3"
          />
        }
      </svg:g>
    } @else {
      @if (part() === 'ink') {
        <svg:use href="#k-ink" width="100" height="100" />
        @if (item().startsWith('fault')) {
          <svg:ellipse cx="48" cy="64" rx="27" ry="10" fill="#aababa" opacity=".8" />
          <svg:circle cx="25" cy="88" r="5" fill="#688c91" />
          <svg:circle cx="67" cy="92" r="7" fill="#688c91" />
        } @else {
          <svg:ellipse cx="48" cy="63" rx="27" ry="12" fill="#142e30" />
          <svg:path d="M28 55Q48 47 65 56" stroke="#81928a" fill="none" stroke-width="3" />
        }
      } @else if (part() === 'packing') {
        @if (item().startsWith('fault')) {
          <svg:path
            d="M10 59L64 44 92 65 39 82Z"
            fill="#dfc594"
            stroke="#8d764d"
            stroke-width="3"
          />
          <svg:path d="M10 59L35 39 64 44" fill="#b29970" />
        } @else {
          <svg:use href="#k-packing" width="100" height="100" />
        }
      } @else {
        <svg:path d="M3 20H97V77H3Z" fill="#4b645b" stroke="#ccb789" stroke-width="3" />
        @for (letter of (item().startsWith('fault') ? 'ERBIL' : 'REBIL').split(''); track $index) {
          <svg:rect [attr.x]="7 + $index * 17" y="29" width="15" height="37" fill="#a7b7aa" />
          <svg:text
            [attr.x]="14 + $index * 17"
            y="55"
            font-size="16"
            text-anchor="middle"
            fill="#2b4945"
            [attr.transform]="'translate(' + (28 + $index * 34) + ' 0) scale(-1 1)'"
          >
            {{ letter }}
          </svg:text>
        }
      }
    }
  `
    }]
  }], null, { item: [{ type: Input, args: [{ isSignal: true, alias: "item", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeachingObjectComponent, { className: "TeachingObjectComponent", filePath: "src/app/templates/time-repair/invention/knowledge/apprentice.component.ts", lineNumber: 67 });
})();
var ApprenticeComponent = class _ApprenticeComponent {
  k = inject(KnowledgeRuntime);
  Math = Math;
  screws = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  stages = ["before", "fault", "repair", "after"];
  trayOrder = ["repair", "before", "after", "fault"];
  fault = computed(
    () => this.k.config().cases[this.k.state().values["case"]],
    ...ngDevMode ? [{ debugName: "fault" }] : (
      /* istanbul ignore next */
      []
    )
  );
  objectLabel(stage, fault) {
    return stage === "after" ? "Clean impression" : ({ before: "Failed impression", fault: "Faulty part", repair: "Repaired part" }[stage] ?? stage) + " for " + fault;
  }
  static \u0275fac = function ApprenticeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApprenticeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApprenticeComponent, selectors: [["app-knowledge-apprentice"]], decls: 31, vars: 4, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "Teach the apprentice a repair using physical examples", 1, "scene"], ["knowledge-room", ""], ["d", "M36 390V129Q87 62 139 129V390Z", "fill", "#10282d", "stroke", "#a68a5d", "stroke-width", "8"], ["kb", "", "label", "Invite the expert in or send the expert away", 3, "activate"], ["href", "#k-person", "y", "210", "width", "103", "height", "168", "color", "#8b8870"], ["d", "M101 185h34l-9-10m9 10-9 10", "stroke", "#dfc587", "stroke-width", "4", "fill", "none"], ["x", "17", "y", "163", "width", "139", "height", "227", "fill", "transparent", "rx", "8", 1, "hit"], ["transform", "translate(523 38)"], ["d", "M15 297V73H298V297M15 78H298M150 28v199", "fill", "none", "stroke", "#b58b55", "stroke-width", "22"], ["stroke", "#674b31", "stroke-width", "5"], ["d", "M79 235H233M83 259H228", "stroke", "#e2c496", "stroke-width", "18"], ["d", "M159 139L289 111", "stroke", "#ae8b52", "stroke-width", "15"], ["kb", "", "label", "Let the apprentice operate the press independently", 3, "activate"], ["cx", "291", "cy", "111", "r", "37", 1, "hit", "button-face"], ["x", "291", "y", "119", 1, "button-ink"], ["href", "#k-person", "x", "292", "y", "124", "width", "115", "height", "174", "color", "#739d90"], ["teaching-object", "", 3, "item"], ["transform", "translate(182 66)"], ["kb", "", 3, "label", "pressed"], ["d", "M170 203H476V369H170Z", "fill", "#102b2d", "stroke", "#9a7b52", "stroke-width", "5"], ["kb", "", 3, "label"], ["kb", "", "label", "Demonstrate the four examples to the apprentice", "transform", "translate(481 364)", 3, "activate"], ["r", "34", 1, "hit", "button-face"], ["d", "M-10-18L16 0-10 18Z", "fill", "#375c50"], ["d", "M475 286Q601 340 866 256", "fill", "none", "stroke", "#9fdfb9", "stroke-width", "5", "stroke-dasharray", "8 8"], ["kb", "", 3, "activate", "label", "pressed"], ["x", "-2", "y", "-3", "width", "98", "height", "103", "fill", "transparent", 1, "hit"], ["kb", "", 3, "activate", "label"], ["width", "138", "height", "70", "rx", "4", 1, "socket", "hit"], ["teaching-object", "", "transform", "translate(37 0) scale(.7)", 3, "item"], ["x", "14", "y", "22", 1, "small"], ["teaching-object", "", "transform", "scale(.76)", 3, "item"], ["x", "-4", "y", "-3", "width", "115", "height", "72", "fill", "transparent", "rx", "5", 1, "hit"]], template: function ApprenticeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "g", 1)(2, "path", 2);
      \u0275\u0275elementStart(3, "g", 3);
      \u0275\u0275listener("activate", function ApprenticeComponent_Template_g_activate_3_listener() {
        return ctx.k.act({ type: "expert" });
      });
      \u0275\u0275element(4, "use", 4)(5, "path", 5)(6, "rect", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "g", 7);
      \u0275\u0275element(8, "path", 8);
      \u0275\u0275repeaterCreate(9, ApprenticeComponent_For_10_Template, 1, 1, ":svg:path", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(11, "path", 10)(12, "path", 11);
      \u0275\u0275elementStart(13, "g", 12);
      \u0275\u0275listener("activate", function ApprenticeComponent_Template_g_activate_13_listener() {
        return ctx.k.act({ type: "run" });
      });
      \u0275\u0275element(14, "circle", 13);
      \u0275\u0275elementStart(15, "text", 14);
      \u0275\u0275text(16, "\u2198");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(17, "use", 15);
      \u0275\u0275conditionalCreate(18, ApprenticeComponent_Conditional_18_Template, 1, 2, ":svg:g", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "g", 17);
      \u0275\u0275repeaterCreate(20, ApprenticeComponent_For_21_Template, 3, 4, ":svg:g", 18, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "path", 19);
      \u0275\u0275repeaterCreate(23, ApprenticeComponent_For_24_Template, 5, 4, ":svg:g", 20, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(25, "g", 21);
      \u0275\u0275listener("activate", function ApprenticeComponent_Template_g_activate_25_listener() {
        return ctx.k.act({ type: "teach" });
      });
      \u0275\u0275element(26, "circle", 22)(27, "path", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(28, ApprenticeComponent_Conditional_28_Template, 1, 0, ":svg:path", 24);
      \u0275\u0275repeaterCreate(29, ApprenticeComponent_For_30_Template, 2, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275attribute("x", ctx.k.state().values["expert"] ? 39 : 5)("opacity", ctx.k.state().values["expert"] ? 1 : 0.15);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.screws);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.k.state().values["running"] ? 18 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.k.config().cases);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.stages);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.k.state().values["demonstration"] ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.k.config().cases);
    }
  }, dependencies: [KnowledgeRoomComponent, SceneButtonDirective, TeachingObjectComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApprenticeComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-apprentice", imports: [KnowledgeRoomComponent, SceneButtonDirective, TeachingObjectComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    role="group"
    aria-label="Teach the apprentice a repair using physical examples"
  >
    <g knowledge-room />
    <path d="M36 390V129Q87 62 139 129V390Z" fill="#10282d" stroke="#a68a5d" stroke-width="8" />
    <g
      kb
      label="Invite the expert in or send the expert away"
      (activate)="k.act({ type: 'expert' })"
    >
      <use
        href="#k-person"
        [attr.x]="k.state().values['expert'] ? 39 : 5"
        y="210"
        width="103"
        height="168"
        color="#8b8870"
        [attr.opacity]="k.state().values['expert'] ? 1 : 0.15"
      />
      <path d="M101 185h34l-9-10m9 10-9 10" stroke="#dfc587" stroke-width="4" fill="none" />
      <rect class="hit" x="17" y="163" width="139" height="227" fill="transparent" rx="8" />
    </g>
    <g transform="translate(523 38)">
      <path
        d="M15 297V73H298V297M15 78H298M150 28v199"
        fill="none"
        stroke="#b58b55"
        stroke-width="22"
      />
      @for (n of screws; track n) {
        <path [attr.d]="'M133 ' + (43 + n * 15) + 'l35-10'" stroke="#674b31" stroke-width="5" />
      }
      <path d="M79 235H233M83 259H228" stroke="#e2c496" stroke-width="18" />
      <path d="M159 139L289 111" stroke="#ae8b52" stroke-width="15" />
      <g
        kb
        label="Let the apprentice operate the press independently"
        (activate)="k.act({ type: 'run' })"
      >
        <circle class="hit button-face" cx="291" cy="111" r="37" />
        <text class="button-ink" x="291" y="119">\u2198</text>
      </g>
      <use href="#k-person" x="292" y="124" width="115" height="174" color="#739d90" />
      @if (k.state().values['running']) {
        <g
          [attr.transform]="'translate(180 290) scale(.95)'"
          teaching-object
          [item]="(k.state().values['running'] === 1 ? 'after-' : 'before-') + fault()"
        />
      }
    </g>
    <g transform="translate(182 66)">
      @for (fault of k.config()!.cases!; track fault; let i = $index) {
        <g
          kb
          [label]="'Investigate the ' + fault + ' failure'"
          [pressed]="k.state().values['case'] === i"
          (activate)="k.act({ type: 'case', value: i })"
          [attr.transform]="'translate(' + i * 107 + ' 0)'"
        >
          <g teaching-object [item]="'before-' + fault" />
          <rect class="hit" x="-2" y="-3" width="98" height="103" fill="transparent" />
        </g>
      }
    </g>
    <path d="M170 203H476V369H170Z" fill="#102b2d" stroke="#9a7b52" stroke-width="5" />
    @for (stage of stages; track stage; let i = $index) {
      <g
        kb
        [label]="'Teaching position ' + (i + 1) + '. Place selected example.'"
        (activate)="k.act({ type: 'place', target: '' + i })"
        [attr.transform]="
          'translate(' + (178 + (i % 2) * 152) + ' ' + (209 + Math.floor(i / 2) * 79) + ')'
        "
      >
        <rect class="socket hit" width="138" height="70" rx="4" />
        @if (k.state().placements['' + i]; as item) {
          <g teaching-object [item]="item" transform="translate(37 0) scale(.7)" />
        }
        <text x="14" y="22" class="small">{{ i + 1 }}</text>
      </g>
    }
    <g
      kb
      label="Demonstrate the four examples to the apprentice"
      (activate)="k.act({ type: 'teach' })"
      transform="translate(481 364)"
    >
      <circle class="hit button-face" r="34" />
      <path d="M-10-18L16 0-10 18Z" fill="#375c50" />
    </g>
    @if (k.state().values['demonstration']) {
      <path
        d="M475 286Q601 340 866 256"
        fill="none"
        stroke="#9fdfb9"
        stroke-width="5"
        stroke-dasharray="8 8"
      />
    }
    @for (case of k.config()!.cases!; track case; let row = $index) {
      @for (stage of trayOrder; track stage; let col = $index) {
        @if (stage !== 'after' || row === 0) {
          <g
            kb
            [label]="objectLabel(stage, case)"
            [pressed]="k.state().selected === stage + '-' + case"
            (activate)="k.act({ type: 'select', item: stage + '-' + case })"
            [attr.transform]="
              'translate(' + (58 + col * 230 + row * 8) + ' ' + (425 + row * 70) + ')'
            "
          >
            <g teaching-object [item]="stage + '-' + case" transform="scale(.76)" />
            <rect class="hit" x="-4" y="-3" width="115" height="72" fill="transparent" rx="5" />
          </g>
        }
      }
    }
  </svg>`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApprenticeComponent, { className: "ApprenticeComponent", filePath: "src/app/templates/time-repair/invention/knowledge/apprentice.component.ts", lineNumber: 201 });
})();

// src/app/templates/time-repair/invention/knowledge/circulation.component.ts
var _c04 = (a0) => [a0];
var _forTrack05 = ($index, $item) => $item.id;
function CirculationComponent_For_58_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 73);
  }
  if (rf & 2) {
    const sheet_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("x", 12 + sheet_r1 * 28);
  }
}
function CirculationComponent_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CirculationComponent_For_58_Conditional_0_Template, 1, 1, ":svg:use", 73);
  }
  if (rf & 2) {
    const sheet_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.n("stock") > sheet_r1 ? 0 : -1);
  }
}
function CirculationComponent_For_64_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 74);
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("d", "M17 " + (25 + row_r3 * 13) + "L87 " + (17 + row_r3 * 13));
  }
}
function CirculationComponent_For_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CirculationComponent_For_64_Conditional_0_Template, 1, 1, ":svg:path", 74);
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.n("stroke") > row_r3 ? 0 : -1);
  }
}
function CirculationComponent_For_91_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 87);
  }
}
function CirculationComponent_For_91_For_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 98);
  }
}
function CirculationComponent_For_91_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CirculationComponent_For_91_For_18_Conditional_0_Template, 1, 0, ":svg:path", 98);
  }
  if (rf & 2) {
    const pull_r6 = ctx.$implicit;
    \u0275\u0275conditional(pull_r6 ? 0 : -1);
  }
}
function CirculationComponent_For_91_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 100);
  }
}
function CirculationComponent_For_91_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 99);
    \u0275\u0275conditionalCreate(1, CirculationComponent_For_91_Conditional_22_Conditional_1_Template, 1, 0, ":svg:path", 100);
  }
  if (rf & 2) {
    const place_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("opacity", ctx_r1.n("proof-" + place_r5.id) === 2 ? 1 : 0.19);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.n("proof-" + place_r5.id) === 1 ? 1 : -1);
  }
}
function CirculationComponent_For_91_Conditional_26_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 104);
  }
}
function CirculationComponent_For_91_Conditional_26_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 107)(1, "circle", 108)(2, "circle", 109);
  }
}
function CirculationComponent_For_91_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 93);
    \u0275\u0275element(1, "path", 101)(2, "path", 102)(3, "path", 103);
    \u0275\u0275conditionalCreate(4, CirculationComponent_For_91_Conditional_26_Conditional_4_Template, 1, 0, ":svg:path", 104)(5, CirculationComponent_For_91_Conditional_26_Conditional_5_Template, 3, 0);
    \u0275\u0275elementStart(6, "text", 105);
    \u0275\u0275text(7, "Paper");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "text", 106);
    \u0275\u0275text(9, "Metal");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.reference() ? 4 : 5);
  }
}
function CirculationComponent_For_91_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 94);
  }
}
function CirculationComponent_For_91_For_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 110);
  }
  if (rf & 2) {
    const sheet_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("d", "M" + (314 + sheet_r7 * 12) + " 138h9v16h-9Z");
  }
}
function CirculationComponent_For_91_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CirculationComponent_For_91_For_31_Conditional_0_Template, 1, 1, ":svg:path", 110);
  }
  if (rf & 2) {
    const sheet_r7 = ctx.$implicit;
    const place_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.n("copies-" + place_r5.id) > sheet_r7 ? 0 : -1);
  }
}
function CirculationComponent_For_91_For_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 114)(1, "path", 115);
  }
}
function CirculationComponent_For_91_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "use", 111)(2, "use", 112)(3, "path", 113);
    \u0275\u0275conditionalCreate(4, CirculationComponent_For_91_For_35_Conditional_4_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const table_r8 = ctx.$implicit;
    const place_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (438 + table_r8 * 58) + " 72)")("opacity", ctx_r1.n("readers-" + place_r5.id) > table_r8 ? 1 : 0.22);
    \u0275\u0275advance();
    \u0275\u0275attribute("color", table_r8 === 1 ? "#a47753" : "#8f9b77");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.n("readers-" + place_r5.id) > table_r8 ? 4 : -1);
  }
}
function CirculationComponent_For_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 75)(2, "path", 76)(3, "path", 77)(4, "path", 78)(5, "path", 79);
    \u0275\u0275elementStart(6, "text", 80);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "g", 81);
    \u0275\u0275listener("activate", function CirculationComponent_For_91_Template_g_activate_8_listener() {
      const place_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "send", target: place_r5.id }));
    });
    \u0275\u0275element(9, "path", 82)(10, "path", 83)(11, "rect", 84);
    \u0275\u0275elementStart(12, "text", 85);
    \u0275\u0275text(13, "Send");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "g", 81);
    \u0275\u0275listener("activate", function CirculationComponent_For_91_Template_g_activate_14_listener() {
      const place_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "print", target: place_r5.id }));
    });
    \u0275\u0275element(15, "use", 86);
    \u0275\u0275conditionalCreate(16, CirculationComponent_For_91_Conditional_16_Template, 1, 0, ":svg:use", 87);
    \u0275\u0275repeaterCreate(17, CirculationComponent_For_91_For_18_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(19, "rect", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "g", 81);
    \u0275\u0275listener("activate", function CirculationComponent_For_91_Template_g_activate_20_listener() {
      const place_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "inspect", target: place_r5.id }));
    });
    \u0275\u0275element(21, "path", 89);
    \u0275\u0275conditionalCreate(22, CirculationComponent_For_91_Conditional_22_Template, 2, 2);
    \u0275\u0275element(23, "circle", 90)(24, "path", 91)(25, "rect", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, CirculationComponent_For_91_Conditional_26_Template, 10, 1, ":svg:g", 93)(27, CirculationComponent_For_91_Conditional_27_Template, 1, 0, ":svg:path", 94);
    \u0275\u0275elementStart(28, "g", 81);
    \u0275\u0275listener("activate", function CirculationComponent_For_91_Template_g_activate_28_listener() {
      const place_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "share", target: place_r5.id }));
    });
    \u0275\u0275element(29, "path", 95);
    \u0275\u0275repeaterCreate(30, CirculationComponent_For_91_For_31_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(32, "path", 96)(33, "rect", 97);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(34, CirculationComponent_For_91_For_35_Template, 5, 4, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const place_r5 = ctx.$implicit;
    const \u0275$index_169_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(324 " + (32 + \u0275$index_169_r9 * 204) + ")");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(place_r5.name);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Send one manuscript to " + place_r5.name);
    \u0275\u0275advance(6);
    \u0275\u0275property("label", "Print a batch in " + place_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.n("seed-" + place_r5.id) ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction1(9, _c04, ctx_r1.n("pull-" + place_r5.id)));
    \u0275\u0275advance(3);
    \u0275\u0275property("label", "Inspect ink transfer in " + place_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.n("proof-" + place_r5.id) ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.n("inspected-" + place_r5.id) ? 26 : 27);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", "Share a copy with a discussion table in " + place_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.sheets);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.tables);
  }
}
var CirculationComponent = class _CirculationComponent {
  k = inject(KnowledgeRuntime);
  d = computed(
    () => this.k.config().circulation,
    ...ngDevMode ? [{ debugName: "d" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reference = computed(
    () => !!this.k.state().values["reference"],
    ...ngDevMode ? [{ debugName: "reference" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspected = computed(
    () => this.d().destinations.some((p) => this.n("inspected-" + p.id)),
    ...ngDevMode ? [{ debugName: "inspected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tables = [0, 1, 2];
  sheets = [0, 1, 2, 3, 4, 5];
  lines = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  n(key) {
    return circulationValue(this.k.state(), key);
  }
  static \u0275fac = function CirculationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CirculationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CirculationComponent, selectors: [["app-knowledge-circulation"]], decls: 92, vars: 12, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "Investigate a missing printed debate with manuscripts, presses, and discussion tables", 1, "scene"], ["id", "circulation-wood", "x2", "0.7", "y2", "1"], ["stop-color", "#384b49"], ["offset", "1", "stop-color", "#172c30"], ["id", "circulation-paper", "x2", "1", "y2", "1"], ["stop-color", "#f6e8c8"], ["offset", "1", "stop-color", "#d4b987"], ["id", "circulation-light"], ["stop-color", "#eed2a0", "stop-opacity", ".17"], ["offset", "1", "stop-color", "#eed2a0", "stop-opacity", "0"], ["id", "circulation-grain", "width", "90", "height", "37", "patternUnits", "userSpaceOnUse"], ["d", "M0 7Q40 1 90 8M0 28Q50 40 90 27", "fill", "none", "stroke", "#e8d7b0", "opacity", ".045"], ["id", "circulation-sheet", "viewBox", "0 0 44 60"], ["d", "M3 2L39 0 43 56 1 60Z", "fill", "url(#circulation-paper)", "stroke", "#8e734b"], ["x", "22", "y", "20", "text-anchor", "middle", "font-size", "15", "fill", "#354942"], ["d", "M8 27H35M9 32H34M8 37H35M9 42H34M8 47H30", "stroke", "#46554b", "stroke-width", "1.3"], ["id", "circulation-person", "viewBox", "0 0 40 65"], ["d", "M3 64L7 32Q20 20 33 32L38 64Z", "fill", "currentColor", "stroke", "#243935", "stroke-width", "2"], ["d", "M13 21V31L20 39 27 31V21", "fill", "#c69469"], ["cx", "20", "cy", "16", "rx", "10", "ry", "13", "fill", "#d5ac81"], ["d", "M9 15Q7 0 21 1Q34 2 31 17L26 10 10 11Z", "fill", "#42382f"], ["d", "M13 43L24 55M30 40L24 55", "fill", "none", "stroke", "#ddbc91", "stroke-width", "5"], ["id", "circulation-press", "viewBox", "0 0 140 155"], ["d", "M15 145H130L123 153H8Z", "fill", "#12282b", "opacity", ".6"], ["d", "M25 144V12H116V145M13 145H44M97 145H130", "fill", "none", "stroke", "#312d27", "stroke-width", "18"], ["d", "M26 142V13H115V143", "fill", "none", "stroke", "#a18151", "stroke-width", "10"], ["d", "M31 22H108M32 31H108M29 130H113", "stroke", "#d4b37a", "stroke-width", "3"], ["d", "M70 23V80", "stroke", "#bdb8a1", "stroke-width", "10"], ["d", "M64 32L76 27M64 44L76 39M64 56L76 51M64 68L76 63", "stroke", "#4e5b50", "stroke-width", "3"], ["d", "M45 79H94V89H45Z", "fill", "#766c54", "stroke", "#c9b285", "stroke-width", "2"], ["d", "M13 115L104 106 133 120 40 130Z", "fill", "#bf9968", "stroke", "#4d4233", "stroke-width", "3"], ["d", "M30 113L101 110 119 119 45 124Z", "fill", "#2a3936"], ["d", "M70 47L121 36", "stroke", "#d9bb87", "stroke-width", "6", "stroke-linecap", "round"], ["cx", "121", "cy", "36", "r", "8", "fill", "#af7844", "stroke", "#e9c88b", "stroke-width", "2"], ["d", "M0 0H1000V660H0Z", "fill", "url(#circulation-wood)"], ["d", "M8 8H992V652H8Z", "fill", "url(#circulation-grain)", "stroke", "#7e7d60", "stroke-width", "3"], ["cx", "440", "cy", "160", "rx", "660", "ry", "480", "fill", "url(#circulation-light)"], ["d", "M293 23V636", "stroke", "#0e2427", "stroke-width", "7"], ["transform", "translate(34 31)"], ["d", "M4 4H238V237H4Z", "fill", "#10282a", "opacity", ".5"], ["d", "M0 0H229V229H0Z", "fill", "url(#circulation-paper)", "stroke", "#af8d57", "stroke-width", "3"], ["x", "114", "y", "27", 1, "ink-label"], ["d", "M20 164Q29 117 60 111Q97 112 111 164Z", "fill", "#343b35"], ["d", "M49 113L46 127 63 145 82 125 77 110", "fill", "#d0a278"], ["d", "M41 78Q66 52 86 79L82 110Q62 132 45 108Z", "fill", "#c9a37b", "stroke", "#705943", "stroke-width", "2"], ["d", "M33 81Q33 56 62 54Q91 53 96 80L86 88 80 74 43 77Z", "fill", "#333831"], ["d", "M38 90Q43 121 59 126M88 90Q82 121 69 127M57 90H52M77 90H72M62 93L60 104 66 105M56 113Q65 117 74 112", "fill", "none", "stroke", "#7e674e", "stroke-width", "2"], ["href", "#circulation-sheet", "x", "126", "y", "61", "width", "75", "height", "103"], ["x", "114", "y", "189", 1, "ink-label"], ["x", "114", "y", "211", 1, "caption", "ink-text"], ["transform", "translate(48 281)"], ["d", "M0 0H218V63H0Z", "fill", "#153033", "stroke", "#a7956b", "stroke-width", "2"], ["x", "105", "y", "88", 1, "label"], ["kb", "", "label", "Write the next portion of a handwritten copy", "transform", "translate(67 381)", 3, "activate"], ["d", "M0 8L102 0 112 66 4 77Z", "fill", "url(#circulation-paper)", "stroke", "#b59765", "stroke-width", "2"], ["d", "M73 63Q108 31 153-1Q138 39 92 60L73 63M84 57L147 4", "fill", "#d9c59a", "stroke", "#8e794f", "stroke-width", "2"], ["cx", "149", "cy", "66", "r", "17", "fill", "#243d3b", "stroke", "#b89a66", "stroke-width", "4"], ["x", "-8", "y", "-9", "width", "192", "height", "108", "rx", "10", "fill", "transparent", 1, "hit"], ["x", "71", "y", "104", 1, "small"], ["transform", "translate(37 510)"], ["d", "M0 0H226V67H0Z", "fill", "#142e31", "stroke", "#aa9367", "stroke-width", "2"], ["kb", "", "label", "Inspect the broken timeline", 3, "activate", "pressed"], ["x", "3", "y", "3", "width", "109", "height", "61", "rx", "5", 1, "hit"], ["x", "56", "y", "28", 1, "small"], ["x", "56", "y", "49", 1, "small"], ["kb", "", "label", "Compare the archive with working presses", 3, "activate", "pressed"], ["x", "114", "y", "3", "width", "109", "height", "61", "rx", "5", 1, "hit"], ["x", "169", "y", "28", 1, "small"], ["x", "169", "y", "49", 1, "small"], ["transform", "translate(48 603)"], ["d", "M3 10H205M8 5L3 10 8 15", "fill", "none", "stroke", "#dabb85", "stroke-width", "2"], ["x", "104", "y", "-3", 1, "small"], ["x", "104", "y", "32", 1, "caption"], ["href", "#circulation-sheet", "y", "8", "width", "32", "height", "43"], ["stroke", "#384e48", "stroke-width", "3"], ["d", "M1 0H634V184H1Z", "fill", "#0c2225", "opacity", ".38"], ["d", "M9 9H625V171H9Z", "fill", "#3a504c", "stroke", "#71816a", "stroke-width", "2"], ["d", "M9 132L625 143V172H9Z", "fill", "#896e49"], ["d", "M15 153H620M15 160H619", "stroke", "#c4a16a", "opacity", ".4"], ["d", "M19 16H244V39H19Z", "fill", "#e0c698"], ["x", "131", "y", "33", 1, "ink-label"], ["kb", "", 3, "activate", "label"], ["d", "M24 60H69V95H24Z M24 60L47 78 69 60", "fill", "#e4d1a9", "stroke", "#a18455", "stroke-width", "2"], ["d", "M34 111H68L60 104M68 111L60 118", "fill", "none", "stroke", "#e7c98e", "stroke-width", "3"], ["x", "17", "y", "51", "width", "59", "height", "77", "rx", "5", "fill", "transparent", 1, "hit"], ["x", "47", "y", "153", 1, "caption"], ["href", "#circulation-press", "x", "82", "y", "40", "width", "124", "height", "134"], ["href", "#circulation-sheet", "x", "111", "y", "123", "width", "33", "height", "25", "transform", "rotate(-8 127 135)"], ["x", "80", "y", "40", "width", "130", "height", "134", "rx", "7", "fill", "transparent", 1, "hit"], ["d", "M225 57H278V125H225Z", "fill", "url(#circulation-paper)", "stroke", "#a98b5f", "stroke-width", "2"], ["cx", "269", "cy", "127", "r", "14", "fill", "#b8d2bb", "fill-opacity", ".3", "stroke", "#e4c997", "stroke-width", "3"], ["d", "M279 139L290 150", "stroke", "#e4c997", "stroke-width", "5"], ["x", "218", "y", "48", "width", "82", "height", "110", "rx", "6", "fill", "transparent", 1, "hit"], ["transform", "translate(305 47)", "aria-label", "Ink comparison: a clear mark on paper and beading on metal in the broken timeline"], ["d", "M310 61H391M310 82H391M310 104H391", "stroke", "#82917a", "stroke-width", "3", "opacity", ".4"], ["d", "M307 132H397V159H307Z", "fill", "#233c37", "stroke", "#b09563", "stroke-width", "2"], ["d", "M400 146H425L419 140M425 146L419 152", "stroke", "#ebd7ad", "stroke-width", "3", "fill", "none"], ["x", "302", "y", "124", "width", "125", "height", "41", "rx", "5", "fill", "transparent", 1, "hit"], ["d", "M195 65L185 92", "stroke", "#f3d192", "stroke-width", "5", "stroke-linecap", "round", 1, "pull-mark"], ["href", "#circulation-sheet", "x", "232", "y", "61", "width", "41", "height", "58"], ["d", "M241 82L245 87M261 95L264 101M243 112L249 109", "stroke", "#796b4e", "stroke-width", "2"], ["d", "M0 0H40V51H0Z", "fill", "#e6d3ac", "stroke", "#b39460"], ["d", "M8 12L31 40M8 40L31 12", "stroke", "#2c423c", "stroke-width", "5"], ["d", "M47 0H87V51H47Z", "fill", "#9eaaa0", "stroke", "#d3d6b6"], ["d", "M55 12L78 40M55 40L78 12", "stroke", "#2c423c", "stroke-width", "5"], ["x", "20", "y", "68", 1, "caption"], ["x", "69", "y", "68", 1, "caption"], ["cx", "59", "cy", "14", "r", "4", "fill", "#2c423c"], ["cx", "73", "cy", "24", "r", "5", "fill", "#2c423c"], ["cx", "60", "cy", "39", "r", "3", "fill", "#2c423c"], ["fill", "#ebd7ad", "stroke", "#bc9d68"], ["href", "#circulation-person", "x", "0", "y", "0", "width", "30", "height", "54"], ["href", "#circulation-person", "x", "23", "y", "1", "width", "30", "height", "54", "color", "#668b83"], ["d", "M0 44H51V53H0ZM6 53V80M44 53V80", "fill", "#ac8353", "stroke", "#cfa66c", "stroke-width", "3"], ["href", "#circulation-sheet", "x", "18", "y", "31", "width", "20", "height", "27"], ["d", "M9-9Q24-21 38-9M32-16L39-9 30-8", "fill", "none", "stroke", "#ebd7ad", "stroke-width", "2", 1, "discussion"]], template: function CirculationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275element(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "linearGradient", 4);
      \u0275\u0275element(6, "stop", 5)(7, "stop", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "radialGradient", 7);
      \u0275\u0275element(9, "stop", 8)(10, "stop", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "pattern", 10);
      \u0275\u0275element(12, "path", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "symbol", 12);
      \u0275\u0275element(14, "path", 13);
      \u0275\u0275elementStart(15, "text", 14);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "path", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "symbol", 16);
      \u0275\u0275element(19, "path", 17)(20, "path", 18)(21, "ellipse", 19)(22, "path", 20)(23, "path", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "symbol", 22);
      \u0275\u0275element(25, "path", 23)(26, "path", 24)(27, "path", 25)(28, "path", 26)(29, "path", 27)(30, "path", 28)(31, "path", 29)(32, "path", 30)(33, "path", 31)(34, "path", 32)(35, "circle", 33);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(36, "path", 34)(37, "path", 35)(38, "ellipse", 36)(39, "path", 37);
      \u0275\u0275elementStart(40, "g", 38);
      \u0275\u0275element(41, "path", 39)(42, "path", 40);
      \u0275\u0275elementStart(43, "text", 41);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "path", 42)(46, "path", 43)(47, "path", 44)(48, "path", 45)(49, "path", 46)(50, "use", 47);
      \u0275\u0275elementStart(51, "text", 48);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "text", 49);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "g", 50);
      \u0275\u0275element(56, "path", 51);
      \u0275\u0275repeaterCreate(57, CirculationComponent_For_58_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(59, "text", 52);
      \u0275\u0275text(60, "Dispatch copies");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "g", 53);
      \u0275\u0275listener("activate", function CirculationComponent_Template_g_activate_61_listener() {
        return ctx.k.act({ type: "copy" });
      });
      \u0275\u0275element(62, "path", 54);
      \u0275\u0275repeaterCreate(63, CirculationComponent_For_64_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(65, "path", 55)(66, "circle", 56)(67, "rect", 57);
      \u0275\u0275elementStart(68, "text", 58);
      \u0275\u0275text(69, "Hand copy");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "g", 59);
      \u0275\u0275element(71, "path", 60);
      \u0275\u0275elementStart(72, "g", 61);
      \u0275\u0275listener("activate", function CirculationComponent_Template_g_activate_72_listener() {
        return ctx.k.act({ type: "compare", value: 0 });
      });
      \u0275\u0275element(73, "rect", 62);
      \u0275\u0275elementStart(74, "text", 63);
      \u0275\u0275text(75, "Broken");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "text", 64);
      \u0275\u0275text(77, "timeline");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "g", 65);
      \u0275\u0275listener("activate", function CirculationComponent_Template_g_activate_78_listener() {
        return ctx.k.act({ type: "compare", value: 1 });
      });
      \u0275\u0275element(79, "rect", 66);
      \u0275\u0275elementStart(80, "text", 67);
      \u0275\u0275text(81, "Archive");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "text", 68);
      \u0275\u0275text(83, "comparison");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(84, "g", 69);
      \u0275\u0275element(85, "path", 70);
      \u0275\u0275elementStart(86, "text", 71);
      \u0275\u0275text(87);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "text", 72);
      \u0275\u0275text(89);
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(90, CirculationComponent_For_91_Template, 36, 11, ":svg:g", null, _forTrack05);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.d().mark);
      \u0275\u0275advance(28);
      \u0275\u0275textInterpolate2("", ctx.d().origin, " \xB7 ", ctx.d().date);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.d().author);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.d().document);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.sheets);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.tables);
      \u0275\u0275advance(9);
      \u0275\u0275property("pressed", !ctx.reference());
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.reference() ? "#1d3839" : "#74533b");
      \u0275\u0275advance(5);
      \u0275\u0275property("pressed", ctx.reference());
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.reference() ? "#536b55" : "#1d3839");
      \u0275\u0275advance(5);
      \u0275\u0275attribute("opacity", ctx.inspected() ? 1 : 0.3);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.d().trace);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.inspected() ? "Ink trail found" : "Inspect the ink", " ");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.d().destinations);
    }
  }, dependencies: [SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */", "\n.ink-label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #34463d;\n  text-anchor: middle;\n}\n.caption[_ngcontent-%COMP%] {\n  font: 14px Arial, sans-serif;\n  fill: #f0dfb8;\n  text-anchor: middle;\n}\n.ink-text[_ngcontent-%COMP%] {\n  fill: #34463d;\n}\n.pull-mark[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pull 0.5s ease-in-out 2;\n  transform-origin: 186px 76px;\n}\n.discussion[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_speak 0.6s ease-out 2;\n}\n@keyframes _ngcontent-%COMP%_pull {\n  50% {\n    transform: rotate(32deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_speak {\n  from {\n    opacity: 0.15;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .pull-mark[_ngcontent-%COMP%], \n   .discussion[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=circulation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CirculationComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-circulation", imports: [SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: `<svg
  class="scene"
  viewBox="0 0 1000 660"
  role="group"
  aria-label="Investigate a missing printed debate with manuscripts, presses, and discussion tables"
>
  <defs>
    <linearGradient id="circulation-wood" x2="0.7" y2="1">
      <stop stop-color="#384b49" />
      <stop offset="1" stop-color="#172c30" />
    </linearGradient>
    <linearGradient id="circulation-paper" x2="1" y2="1">
      <stop stop-color="#f6e8c8" />
      <stop offset="1" stop-color="#d4b987" />
    </linearGradient>
    <radialGradient id="circulation-light">
      <stop stop-color="#eed2a0" stop-opacity=".17" />
      <stop offset="1" stop-color="#eed2a0" stop-opacity="0" />
    </radialGradient>
    <pattern id="circulation-grain" width="90" height="37" patternUnits="userSpaceOnUse">
      <path d="M0 7Q40 1 90 8M0 28Q50 40 90 27" fill="none" stroke="#e8d7b0" opacity=".045" />
    </pattern>
    <symbol id="circulation-sheet" viewBox="0 0 44 60">
      <path d="M3 2L39 0 43 56 1 60Z" fill="url(#circulation-paper)" stroke="#8e734b" />
      <text x="22" y="20" text-anchor="middle" font-size="15" fill="#354942">{{ d().mark }}</text>
      <path d="M8 27H35M9 32H34M8 37H35M9 42H34M8 47H30" stroke="#46554b" stroke-width="1.3" />
    </symbol>
    <symbol id="circulation-person" viewBox="0 0 40 65">
      <path
        d="M3 64L7 32Q20 20 33 32L38 64Z"
        fill="currentColor"
        stroke="#243935"
        stroke-width="2"
      />
      <path d="M13 21V31L20 39 27 31V21" fill="#c69469" />
      <ellipse cx="20" cy="16" rx="10" ry="13" fill="#d5ac81" />
      <path d="M9 15Q7 0 21 1Q34 2 31 17L26 10 10 11Z" fill="#42382f" />
      <path d="M13 43L24 55M30 40L24 55" fill="none" stroke="#ddbc91" stroke-width="5" />
    </symbol>
    <symbol id="circulation-press" viewBox="0 0 140 155">
      <path d="M15 145H130L123 153H8Z" fill="#12282b" opacity=".6" />
      <path
        d="M25 144V12H116V145M13 145H44M97 145H130"
        fill="none"
        stroke="#312d27"
        stroke-width="18"
      />
      <path d="M26 142V13H115V143" fill="none" stroke="#a18151" stroke-width="10" />
      <path d="M31 22H108M32 31H108M29 130H113" stroke="#d4b37a" stroke-width="3" />
      <path d="M70 23V80" stroke="#bdb8a1" stroke-width="10" />
      <path
        d="M64 32L76 27M64 44L76 39M64 56L76 51M64 68L76 63"
        stroke="#4e5b50"
        stroke-width="3"
      />
      <path d="M45 79H94V89H45Z" fill="#766c54" stroke="#c9b285" stroke-width="2" />
      <path d="M13 115L104 106 133 120 40 130Z" fill="#bf9968" stroke="#4d4233" stroke-width="3" />
      <path d="M30 113L101 110 119 119 45 124Z" fill="#2a3936" />
      <path d="M70 47L121 36" stroke="#d9bb87" stroke-width="6" stroke-linecap="round" />
      <circle cx="121" cy="36" r="8" fill="#af7844" stroke="#e9c88b" stroke-width="2" />
    </symbol>
  </defs>
  <path d="M0 0H1000V660H0Z" fill="url(#circulation-wood)" />
  <path d="M8 8H992V652H8Z" fill="url(#circulation-grain)" stroke="#7e7d60" stroke-width="3" />
  <ellipse cx="440" cy="160" rx="660" ry="480" fill="url(#circulation-light)" />
  <path d="M293 23V636" stroke="#0e2427" stroke-width="7" />

  <!-- A surviving author and manuscript: the historical idea itself has not vanished. -->
  <g transform="translate(34 31)">
    <path d="M4 4H238V237H4Z" fill="#10282a" opacity=".5" />
    <path d="M0 0H229V229H0Z" fill="url(#circulation-paper)" stroke="#af8d57" stroke-width="3" />
    <text x="114" y="27" class="ink-label">{{ d().origin }} \xB7 {{ d().date }}</text>
    <path d="M20 164Q29 117 60 111Q97 112 111 164Z" fill="#343b35" />
    <path d="M49 113L46 127 63 145 82 125 77 110" fill="#d0a278" />
    <path
      d="M41 78Q66 52 86 79L82 110Q62 132 45 108Z"
      fill="#c9a37b"
      stroke="#705943"
      stroke-width="2"
    />
    <path d="M33 81Q33 56 62 54Q91 53 96 80L86 88 80 74 43 77Z" fill="#333831" />
    <path
      d="M38 90Q43 121 59 126M88 90Q82 121 69 127M57 90H52M77 90H72M62 93L60 104 66 105M56 113Q65 117 74 112"
      fill="none"
      stroke="#7e674e"
      stroke-width="2"
    />
    <use href="#circulation-sheet" x="126" y="61" width="75" height="103" />
    <text x="114" y="189" class="ink-label">{{ d().author }}</text>
    <text x="114" y="211" class="caption ink-text">{{ d().document }}</text>
  </g>
  <!-- A copying tool, not a response field. Four visible strokes produce one dispatch copy. -->
  <g transform="translate(48 281)">
    <path d="M0 0H218V63H0Z" fill="#153033" stroke="#a7956b" stroke-width="2" />
    @for (sheet of sheets; track sheet) {
      @if (n('stock') > sheet) {
        <use href="#circulation-sheet" [attr.x]="12 + sheet * 28" y="8" width="32" height="43" />
      }
    }
    <text x="105" y="88" class="label">Dispatch copies</text>
  </g>
  <g
    kb
    label="Write the next portion of a handwritten copy"
    (activate)="k.act({ type: 'copy' })"
    transform="translate(67 381)"
  >
    <path
      d="M0 8L102 0 112 66 4 77Z"
      fill="url(#circulation-paper)"
      stroke="#b59765"
      stroke-width="2"
    />
    @for (row of tables; track row) {
      @if (n('stroke') > row) {
        <path
          [attr.d]="'M17 ' + (25 + row * 13) + 'L87 ' + (17 + row * 13)"
          stroke="#384e48"
          stroke-width="3"
        />
      }
    }
    <path
      d="M73 63Q108 31 153-1Q138 39 92 60L73 63M84 57L147 4"
      fill="#d9c59a"
      stroke="#8e794f"
      stroke-width="2"
    />
    <circle cx="149" cy="66" r="17" fill="#243d3b" stroke="#b89a66" stroke-width="4" />
    <rect class="hit" x="-8" y="-9" width="192" height="108" rx="10" fill="transparent" />
    <text x="71" y="104" class="small">Hand copy</text>
  </g>
  <!-- The archive selector compares two models; it never changes progress or repairs the past. -->
  <g transform="translate(37 510)">
    <path d="M0 0H226V67H0Z" fill="#142e31" stroke="#aa9367" stroke-width="2" />
    <g
      kb
      label="Inspect the broken timeline"
      [pressed]="!reference()"
      (activate)="k.act({ type: 'compare', value: 0 })"
    >
      <rect
        class="hit"
        x="3"
        y="3"
        width="109"
        height="61"
        rx="5"
        [attr.fill]="reference() ? '#1d3839' : '#74533b'"
      />
      <text x="56" y="28" class="small">Broken</text>
      <text x="56" y="49" class="small">timeline</text>
    </g>
    <g
      kb
      label="Compare the archive with working presses"
      [pressed]="reference()"
      (activate)="k.act({ type: 'compare', value: 1 })"
    >
      <rect
        class="hit"
        x="114"
        y="3"
        width="109"
        height="61"
        rx="5"
        [attr.fill]="reference() ? '#536b55' : '#1d3839'"
      />
      <text x="169" y="28" class="small">Archive</text>
      <text x="169" y="49" class="small">comparison</text>
    </g>
  </g>
  <g transform="translate(48 603)" [attr.opacity]="inspected() ? 1 : 0.3">
    <path d="M3 10H205M8 5L3 10 8 15" fill="none" stroke="#dabb85" stroke-width="2" />
    <text x="104" y="-3" class="small">{{ d().trace }}</text>
    <text x="104" y="32" class="caption">
      {{ inspected() ? 'Ink trail found' : 'Inspect the ink' }}
    </text>
  </g>

  <!-- Three carved workshop models. These are comparisons, not a geographical map. -->
  @for (place of d().destinations; track place.id; let i = $index) {
    <g [attr.transform]="'translate(324 ' + (32 + i * 204) + ')'">
      <path d="M1 0H634V184H1Z" fill="#0c2225" opacity=".38" />
      <path d="M9 9H625V171H9Z" fill="#3a504c" stroke="#71816a" stroke-width="2" />
      <path d="M9 132L625 143V172H9Z" fill="#896e49" />
      <path d="M15 153H620M15 160H619" stroke="#c4a16a" opacity=".4" />
      <path d="M19 16H244V39H19Z" fill="#e0c698" />
      <text x="131" y="33" class="ink-label">{{ place.name }}</text>
      <g
        kb
        [label]="'Send one manuscript to ' + place.name"
        (activate)="k.act({ type: 'send', target: place.id })"
      >
        <path
          d="M24 60H69V95H24Z M24 60L47 78 69 60"
          fill="#e4d1a9"
          stroke="#a18455"
          stroke-width="2"
        />
        <path d="M34 111H68L60 104M68 111L60 118" fill="none" stroke="#e7c98e" stroke-width="3" />
        <rect class="hit" x="17" y="51" width="59" height="77" rx="5" fill="transparent" />
        <text x="47" y="153" class="caption">Send</text>
      </g>
      <g
        kb
        [label]="'Print a batch in ' + place.name"
        (activate)="k.act({ type: 'print', target: place.id })"
      >
        <use href="#circulation-press" x="82" y="40" width="124" height="134" />
        @if (n('seed-' + place.id)) {
          <use
            href="#circulation-sheet"
            x="111"
            y="123"
            width="33"
            height="25"
            transform="rotate(-8 127 135)"
          />
        }
        @for (pull of [n('pull-' + place.id)]; track pull) {
          @if (pull) {
            <path
              class="pull-mark"
              d="M195 65L185 92"
              stroke="#f3d192"
              stroke-width="5"
              stroke-linecap="round"
            />
          }
        }
        <rect class="hit" x="80" y="40" width="130" height="134" rx="7" fill="transparent" />
      </g>
      <g
        kb
        [label]="'Inspect ink transfer in ' + place.name"
        (activate)="k.act({ type: 'inspect', target: place.id })"
      >
        <path
          d="M225 57H278V125H225Z"
          fill="url(#circulation-paper)"
          stroke="#a98b5f"
          stroke-width="2"
        />
        @if (n('proof-' + place.id)) {
          <use
            href="#circulation-sheet"
            x="232"
            y="61"
            width="41"
            height="58"
            [attr.opacity]="n('proof-' + place.id) === 2 ? 1 : 0.19"
          />
          @if (n('proof-' + place.id) === 1) {
            <path
              d="M241 82L245 87M261 95L264 101M243 112L249 109"
              stroke="#796b4e"
              stroke-width="2"
            />
          }
        }
        <circle
          cx="269"
          cy="127"
          r="14"
          fill="#b8d2bb"
          fill-opacity=".3"
          stroke="#e4c997"
          stroke-width="3"
        />
        <path d="M279 139L290 150" stroke="#e4c997" stroke-width="5" />
        <rect class="hit" x="218" y="48" width="82" height="110" rx="6" fill="transparent" />
      </g>
      @if (n('inspected-' + place.id)) {
        <g
          transform="translate(305 47)"
          aria-label="Ink comparison: a clear mark on paper and beading on metal in the broken timeline"
        >
          <path d="M0 0H40V51H0Z" fill="#e6d3ac" stroke="#b39460" />
          <path d="M8 12L31 40M8 40L31 12" stroke="#2c423c" stroke-width="5" />
          <path d="M47 0H87V51H47Z" fill="#9eaaa0" stroke="#d3d6b6" />
          @if (reference()) {
            <path d="M55 12L78 40M55 40L78 12" stroke="#2c423c" stroke-width="5" />
          } @else {
            <circle cx="59" cy="14" r="4" fill="#2c423c" />
            <circle cx="73" cy="24" r="5" fill="#2c423c" />
            <circle cx="60" cy="39" r="3" fill="#2c423c" />
          }
          <text x="20" y="68" class="caption">Paper</text>
          <text x="69" y="68" class="caption">Metal</text>
        </g>
      } @else {
        <path
          d="M310 61H391M310 82H391M310 104H391"
          stroke="#82917a"
          stroke-width="3"
          opacity=".4"
        />
      }
      <g
        kb
        [label]="'Share a copy with a discussion table in ' + place.name"
        (activate)="k.act({ type: 'share', target: place.id })"
      >
        <path d="M307 132H397V159H307Z" fill="#233c37" stroke="#b09563" stroke-width="2" />
        @for (sheet of sheets; track sheet) {
          @if (n('copies-' + place.id) > sheet) {
            <path
              [attr.d]="'M' + (314 + sheet * 12) + ' 138h9v16h-9Z'"
              fill="#ebd7ad"
              stroke="#bc9d68"
            />
          }
        }
        <path
          d="M400 146H425L419 140M425 146L419 152"
          stroke="#ebd7ad"
          stroke-width="3"
          fill="none"
        />
        <rect class="hit" x="302" y="124" width="125" height="41" rx="5" fill="transparent" />
      </g>
      @for (table of tables; track table) {
        <g
          [attr.transform]="'translate(' + (438 + table * 58) + ' 72)'"
          [attr.opacity]="n('readers-' + place.id) > table ? 1 : 0.22"
        >
          <use
            href="#circulation-person"
            x="0"
            y="0"
            width="30"
            height="54"
            [attr.color]="table === 1 ? '#a47753' : '#8f9b77'"
          />
          <use href="#circulation-person" x="23" y="1" width="30" height="54" color="#668b83" />
          <path
            d="M0 44H51V53H0ZM6 53V80M44 53V80"
            fill="#ac8353"
            stroke="#cfa66c"
            stroke-width="3"
          />
          @if (n('readers-' + place.id) > table) {
            <use href="#circulation-sheet" x="18" y="31" width="20" height="27" />
            <path
              class="discussion"
              d="M9-9Q24-21 38-9M32-16L39-9 30-8"
              fill="none"
              stroke="#ebd7ad"
              stroke-width="2"
            />
          }
        </g>
      }
    </g>
  }
</svg>
`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n", "/* src/app/templates/time-repair/invention/knowledge/circulation.component.scss */\n.ink-label {\n  font: 18px Georgia, serif;\n  fill: #34463d;\n  text-anchor: middle;\n}\n.caption {\n  font: 14px Arial, sans-serif;\n  fill: #f0dfb8;\n  text-anchor: middle;\n}\n.ink-text {\n  fill: #34463d;\n}\n.pull-mark {\n  animation: pull 0.5s ease-in-out 2;\n  transform-origin: 186px 76px;\n}\n.discussion {\n  animation: speak 0.6s ease-out 2;\n}\n@keyframes pull {\n  50% {\n    transform: rotate(32deg);\n  }\n}\n@keyframes speak {\n  from {\n    opacity: 0.15;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .pull-mark,\n  .discussion {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=circulation.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CirculationComponent, { className: "CirculationComponent", filePath: "src/app/templates/time-repair/invention/knowledge/circulation.component.ts", lineNumber: 13 });
})();

// src/app/templates/time-repair/invention/knowledge/timeline.component.ts
var _forTrack06 = ($index, $item) => $item.id;
function TimelineComponent_Conditional_28_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.headlineLines(ctx_r1.leadHeadline(), 65)[1]);
  }
}
function TimelineComponent_Conditional_28_For_17_For_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const line_r6 = ctx_r4.$implicit;
    const \u0275$index_97_r7 = ctx_r4.$index;
    \u0275\u0275attribute("y", 374 + \u0275$index_97_r7 * 18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(line_r6);
  }
}
function TimelineComponent_Conditional_28_For_17_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TimelineComponent_Conditional_28_For_17_For_7_Conditional_0_Template, 2, 2, ":svg:text", 60);
  }
  if (rf & 2) {
    const \u0275$index_97_r7 = ctx.$index;
    \u0275\u0275conditional(\u0275$index_97_r7 < 5 ? 0 : -1);
  }
}
function TimelineComponent_Conditional_28_For_17_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 58);
  }
}
function TimelineComponent_Conditional_28_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 52);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_28_For_17_Template_g_activate_0_listener() {
      const \u0275$index_85_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "inspect", target: ctx_r1.d().nodes[\u0275$index_85_r4].id }));
    });
    \u0275\u0275element(1, "rect", 53)(2, "rect", 54);
    \u0275\u0275elementStart(3, "text", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "path", 56);
    \u0275\u0275repeaterCreate(6, TimelineComponent_Conditional_28_For_17_For_7_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(8, "text", 57);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, TimelineComponent_Conditional_28_For_17_Conditional_10_Template, 1, 0, ":svg:path", 58);
    \u0275\u0275element(11, "rect", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const headline_r8 = ctx.$implicit;
    const \u0275$index_85_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", "Inspect fake newspaper headline: " + headline_r8)("pressed", ctx_r1.n("inspected-" + ctx_r1.d().nodes[\u0275$index_85_r4].id) > 0);
    \u0275\u0275attribute("transform", "translate(" + (32 + \u0275$index_85_r4 * 236) + " 0)");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("REPORT 0", \u0275$index_85_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.headlineLines(headline_r8, 25));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.n("inspected-" + ctx_r1.d().nodes[\u0275$index_85_r4].id) ? "CLUE INSPECTED" : "inspect clipping");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.n("inspected-" + ctx_r1.d().nodes[\u0275$index_85_r4].id) ? 10 : -1);
  }
}
function TimelineComponent_Conditional_28_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 52);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_28_For_23_Template_g_activate_0_listener() {
      const candidate_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "candidate", target: candidate_r10.id }));
    });
    \u0275\u0275element(1, "rect", 61);
    \u0275\u0275elementStart(2, "text", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "text", 63);
    \u0275\u0275text(5, "place this possibility");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "rect", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const candidate_r10 = ctx.$implicit;
    const \u0275$index_117_r11 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", "Place candidate in the gap: " + candidate_r10.label)("pressed", ctx_r1.k.state().selected === candidate_r10.id);
    \u0275\u0275attribute("transform", "translate(" + \u0275$index_117_r11 * 220 + " 17)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(candidate_r10.label);
  }
}
function TimelineComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 25);
    \u0275\u0275text(1, "THE WITTENBERG EXTRA \xB7 FICTIONAL ARCHIVE");
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "path", 26);
    \u0275\u0275elementStart(3, "g", 27);
    \u0275\u0275element(4, "rect", 28)(5, "rect", 29);
    \u0275\u0275elementStart(6, "text", 30);
    \u0275\u0275text(7, "LOCAL MONK REPORT");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "path", 31);
    \u0275\u0275elementStart(9, "text", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, TimelineComponent_Conditional_28_Conditional_11_Template, 2, 1, ":svg:text", 33);
    \u0275\u0275elementStart(12, "text", 34);
    \u0275\u0275text(13, "Wittenberg \xB7 autumn 1517 \xB7 exact count disputed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "text", 35);
    \u0275\u0275text(15, "FOUR REPORTS TO INSPECT \xB7 WHAT DID READERS ACTUALLY RECEIVE?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, TimelineComponent_Conditional_28_For_17_Template, 12, 6, ":svg:g", 36, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(18, "path", 37);
    \u0275\u0275elementStart(19, "g", 38)(20, "text", 39);
    \u0275\u0275text(21, "WHAT COULD FILL THE GAP?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, TimelineComponent_Conditional_28_For_23_Template, 7, 4, ":svg:g", 36, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "g", 40)(25, "g", 41);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_28_Template_g_activate_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "view", value: 0 }));
    });
    \u0275\u0275element(26, "rect", 42);
    \u0275\u0275elementStart(27, "text", 43);
    \u0275\u0275text(28, "BROKEN RECORD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "text", 44);
    \u0275\u0275text(30, "local speech remains");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "rect", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "g", 46);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_28_Template_g_activate_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "view", value: 1 }));
    });
    \u0275\u0275element(33, "rect", 42);
    \u0275\u0275elementStart(34, "text", 43);
    \u0275\u0275text(35, "REPAIRED RECORD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "text", 44);
    \u0275\u0275text(37, "printed debate travels");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "rect", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "g", 47);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_28_Template_g_activate_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "test" }));
    });
    \u0275\u0275element(40, "rect", 48);
    \u0275\u0275elementStart(41, "text", 49);
    \u0275\u0275text(42, "TEST THE GAP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "text", 50);
    \u0275\u0275text(44, "compare every clue");
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "rect", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.headlineLines(ctx_r1.leadHeadline(), 65)[0]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.headlineLines(ctx_r1.leadHeadline(), 65).length > 1 ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.headlineCards());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.d().candidates);
    \u0275\u0275advance(3);
    \u0275\u0275property("pressed", ctx_r1.view() === 0);
    \u0275\u0275advance(7);
    \u0275\u0275property("pressed", ctx_r1.view() === 1);
  }
}
function TimelineComponent_Conditional_29_For_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 83);
  }
}
function TimelineComponent_Conditional_29_For_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 84);
  }
}
function TimelineComponent_Conditional_29_For_6_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 88);
  }
}
function TimelineComponent_Conditional_29_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 79);
    \u0275\u0275elementStart(2, "g", 80);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_29_For_6_Template_g_activate_2_listener() {
      const node_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "inspect", target: node_r14.id }));
    });
    \u0275\u0275element(3, "rect", 81)(4, "circle", 82);
    \u0275\u0275conditionalCreate(5, TimelineComponent_Conditional_29_For_6_Conditional_5_Template, 1, 0, ":svg:path", 83)(6, TimelineComponent_Conditional_29_For_6_Conditional_6_Template, 1, 0, ":svg:use", 84);
    \u0275\u0275elementStart(7, "text", 85);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "text", 86);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "rect", 87);
    \u0275\u0275conditionalCreate(12, TimelineComponent_Conditional_29_For_6_Conditional_12_Template, 1, 0, ":svg:path", 88);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r14 = ctx.$implicit;
    const \u0275$index_178_r15 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(" + (70 + \u0275$index_178_r15 * 172) + " 0)");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", "Inspect timeline record: " + node_r14.label + ", " + node_r14.date);
    \u0275\u0275advance();
    \u0275\u0275attribute("opacity", ctx_r1.n("inspected-" + node_r14.id) ? 1 : 0.86);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(node_r14.lane === "gap" ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(node_r14.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.n("inspected-" + node_r14.id) ? 12 : -1);
  }
}
function TimelineComponent_Conditional_29_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 52);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_29_For_11_Template_g_activate_0_listener() {
      const candidate_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "candidate", target: candidate_r17.id }));
    });
    \u0275\u0275element(1, "rect", 89);
    \u0275\u0275elementStart(2, "text", 90);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "text", 91);
    \u0275\u0275text(5, "place this possibility");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "rect", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const candidate_r17 = ctx.$implicit;
    const \u0275$index_211_r18 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", "Place candidate in the gap: " + candidate_r17.label)("pressed", ctx_r1.k.state().selected === candidate_r17.id);
    \u0275\u0275attribute("transform", "translate(" + \u0275$index_211_r18 * 220 + " 28)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(candidate_r17.label);
  }
}
function TimelineComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 65);
    \u0275\u0275elementStart(1, "text", 66);
    \u0275\u0275text(2, "ARCHIVE EVIDENCE");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "path", 67)(4, "path", 68);
    \u0275\u0275repeaterCreate(5, TimelineComponent_Conditional_29_For_6_Template, 13, 7, ":svg:g", null, _forTrack06);
    \u0275\u0275elementStart(7, "g", 69)(8, "text", 39);
    \u0275\u0275text(9, "WHAT COULD FILL THE GAP?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(10, TimelineComponent_Conditional_29_For_11_Template, 7, 4, ":svg:g", 36, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "g", 70)(13, "g", 41);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_29_Template_g_activate_13_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "view", value: 0 }));
    });
    \u0275\u0275element(14, "rect", 71);
    \u0275\u0275elementStart(15, "text", 72);
    \u0275\u0275text(16, "BROKEN RECORD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "text", 73);
    \u0275\u0275text(18, "local speech remains");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "rect", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "g", 46);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_29_Template_g_activate_20_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "view", value: 1 }));
    });
    \u0275\u0275element(21, "rect", 71);
    \u0275\u0275elementStart(22, "text", 72);
    \u0275\u0275text(23, "REPAIRED RECORD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "text", 73);
    \u0275\u0275text(25, "printed debate travels");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "rect", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "g", 47);
    \u0275\u0275listener("activate", function TimelineComponent_Conditional_29_Template_g_activate_27_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.act({ type: "test" }));
    });
    \u0275\u0275element(28, "rect", 75);
    \u0275\u0275elementStart(29, "text", 76);
    \u0275\u0275text(30, "TEST THE GAP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "text", 77);
    \u0275\u0275text(32, "compare every clue");
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "rect", 78);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.d().nodes);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.d().candidates);
    \u0275\u0275advance(3);
    \u0275\u0275property("pressed", ctx_r1.view() === 0);
    \u0275\u0275advance(7);
    \u0275\u0275property("pressed", ctx_r1.view() === 1);
  }
}
var TimelineComponent = class _TimelineComponent {
  k = inject(KnowledgeRuntime);
  d = computed(
    () => this.k.config().timeline,
    ...ngDevMode ? [{ debugName: "d" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasHeadlines = computed(
    () => (this.d().headlines?.length ?? 0) > 0,
    ...ngDevMode ? [{ debugName: "hasHeadlines" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leadHeadline = computed(
    () => this.d().headlines?.[0] ?? "",
    ...ngDevMode ? [{ debugName: "leadHeadline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headlineCards = computed(
    () => (this.d().headlines ?? []).slice(1, 5),
    ...ngDevMode ? [{ debugName: "headlineCards" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = computed(
    () => timelineValue(this.k.state(), "view"),
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  n(key) {
    return timelineValue(this.k.state(), key);
  }
  headlineLines(headline, maxLength = 30) {
    const words = headline.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (line && next.length > maxLength) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line)
      lines.push(line);
    return lines;
  }
  static \u0275fac = function TimelineComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimelineComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TimelineComponent, selectors: [["app-knowledge-timeline"]], decls: 30, vars: 3, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "Investigate fake newspaper headlines and test a missing event", 1, "scene", "investigation-scene"], ["id", "timeline-wall", "x2", "0", "y2", "1"], ["stop-color", "#203d43"], ["offset", "1", "stop-color", "#102a31"], ["id", "timeline-paper", "x2", "1", "y2", "1"], ["stop-color", "#f4e5c3"], ["offset", "1", "stop-color", "#cbae78"], ["id", "headline-paper", "x2", "0.2", "y2", "1"], ["stop-color", "#fff4d7"], ["offset", "1", "stop-color", "#d8b878"], ["id", "timeline-glow"], ["stop-color", "#efda9a", "stop-opacity", ".24"], ["offset", "1", "stop-color", "#efda9a", "stop-opacity", "0"], ["id", "timeline-grain", "width", "120", "height", "40", "patternUnits", "userSpaceOnUse"], ["d", "M0 12Q48 2 120 11M0 32Q56 44 120 30", "fill", "none", "stroke", "#e5cf9e", "opacity", ".08"], ["id", "newsprint-lines", "width", "12", "height", "12", "patternUnits", "userSpaceOnUse"], ["d", "M0 11H12", "stroke", "#7e6748", "stroke-width", "1", "opacity", ".16"], ["id", "timeline-seal", "viewBox", "0 0 80 80"], ["cx", "40", "cy", "40", "r", "28", "fill", "#9a6248", "stroke", "#e1bd7d", "stroke-width", "4"], ["d", "M22 43h36M28 34h24M31 51h18", "stroke", "#f2d8a2", "stroke-width", "4"], ["width", "1000", "height", "660", "fill", "url(#timeline-wall)"], ["x", "9", "y", "9", "width", "982", "height", "642", "fill", "url(#timeline-grain)", "stroke", "#6e806d", "stroke-width", "3"], ["cx", "440", "cy", "160", "rx", "600", "ry", "410", "fill", "url(#timeline-glow)"], ["x", "500", "y", "54", 1, "scene-kicker"], ["x", "500", "y", "78", 1, "scene-subtitle"], ["x", "500", "y", "112", 1, "lane-label"], ["d", "M32 126H968", "stroke", "#d3b87d", "stroke-width", "3", "opacity", ".55"], ["transform", "translate(38 140)", 1, "lead-paper"], ["width", "924", "height", "130", "rx", "4", "fill", "url(#headline-paper)", "stroke", "#f0d396", "stroke-width", "4"], ["x", "12", "y", "12", "width", "900", "height", "106", "fill", "url(#newsprint-lines)", "opacity", ".8"], ["x", "462", "y", "31", 1, "paper-masthead"], ["d", "M28 42H896", "stroke", "#5e4a3a", "stroke-width", "2", "opacity", ".55"], ["x", "462", "y", "69", 1, "lead-label"], ["x", "462", "y", "94", 1, "lead-label"], ["x", "462", "y", "115", 1, "paper-byline"], ["x", "500", "y", "302", 1, "lane-label"], ["kb", "", 3, "label", "pressed"], ["d", "M32 492H968", "stroke", "#d3b87d", "stroke-width", "3", "opacity", ".55"], ["transform", "translate(45 510)"], ["x", "455", "y", "0", 1, "lane-label"], ["transform", "translate(45 606)"], ["kb", "", "label", "Show the broken timeline", 3, "activate", "pressed"], ["x", "0", "y", "0", "width", "186", "height", "42", "rx", "7", 1, "view-button"], ["x", "93", "y", "19", 1, "view-label"], ["x", "93", "y", "34", 1, "view-hint"], ["x", "-5", "y", "-5", "width", "196", "height", "52", "rx", "9", "fill", "transparent", 1, "hit"], ["kb", "", "label", "Show the repaired timeline", "transform", "translate(202 0)", 3, "activate", "pressed"], ["kb", "", "label", "Test the selected timeline candidate", "transform", "translate(610 0)", 3, "activate"], ["x", "0", "y", "0", "width", "300", "height", "42", "rx", "9", 1, "test-button"], ["x", "150", "y", "19", 1, "test-label"], ["x", "150", "y", "34", 1, "test-hint"], ["x", "-6", "y", "-6", "width", "312", "height", "54", "rx", "10", "fill", "transparent", 1, "hit"], ["kb", "", 3, "activate", "label", "pressed"], ["x", "0", "y", "322", "width", "218", "height", "148", "rx", "4", 1, "headline-card"], ["x", "10", "y", "332", "width", "198", "height", "128", 1, "headline-card-lines"], ["x", "109", "y", "342", 1, "clip-number"], ["d", "M15 350H203", "stroke", "#806646", "stroke-width", "2", "opacity", ".55"], ["x", "109", "y", "454", 1, "clip-hint"], ["d", "M188 336l12 12M200 336l-12 12", "stroke", "#237b70", "stroke-width", "3"], ["x", "-6", "y", "316", "width", "230", "height", "162", "rx", "8", "fill", "transparent", 1, "hit"], ["x", "109", 1, "headline-text"], ["x", "0", "y", "0", "width", "194", "height", "58", "rx", "8", 1, "candidate-card"], ["x", "97", "y", "24", 1, "candidate-label"], ["x", "97", "y", "44", 1, "candidate-hint"], ["x", "-6", "y", "-6", "width", "206", "height", "70", "rx", "10", "fill", "transparent", 1, "hit"], ["d", "M32 94H968M32 430H968", "stroke", "#d3b87d", "stroke-width", "3", "opacity", ".55"], ["x", "500", "y", "121", 1, "lane-label"], ["d", "M78 214H922", "stroke", "#d4bd86", "stroke-width", "8", "stroke-linecap", "round"], ["d", "M78 214H922", "stroke", "#344f4b", "stroke-width", "20", "stroke-linecap", "round", "opacity", ".55"], ["transform", "translate(45 348)"], ["transform", "translate(45 525)"], ["x", "0", "y", "0", "width", "186", "height", "64", "rx", "7", 1, "view-button"], ["x", "93", "y", "27", 1, "view-label"], ["x", "93", "y", "48", 1, "view-hint"], ["x", "-5", "y", "-5", "width", "196", "height", "74", "rx", "9", "fill", "transparent", 1, "hit"], ["x", "0", "y", "0", "width", "300", "height", "64", "rx", "9", 1, "test-button"], ["x", "150", "y", "29", 1, "test-label"], ["x", "150", "y", "50", 1, "test-hint"], ["x", "-6", "y", "-6", "width", "312", "height", "76", "rx", "10", "fill", "transparent", 1, "hit"], ["d", "M8 200V228", "stroke", "#e1c58b", "stroke-width", "4"], ["kb", "", 3, "activate", "label"], ["x", "-26", "y", "132", "width", "146", "height", "150", "rx", "7", 1, "record-card"], ["cx", "46", "cy", "208", "r", "32", "fill", "#314c48", "stroke", "#e1c58b", "stroke-width", "4"], ["d", "M28 208h36M46 190v36", "stroke", "#df9b6d", "stroke-width", "5"], ["href", "#timeline-seal", "x", "14", "y", "176", "width", "64", "height", "64"], ["x", "46", "y", "153", 1, "record-date"], ["x", "46", "y", "268", 1, "record-label"], ["x", "-32", "y", "126", "width", "158", "height", "164", "rx", "9", "fill", "transparent", 1, "hit"], ["d", "M86 169l18 18M102 169l-18 18", "stroke", "#8cf1db", "stroke-width", "3"], ["x", "0", "y", "0", "width", "194", "height", "78", "rx", "8", 1, "candidate-card"], ["x", "97", "y", "30", 1, "candidate-label"], ["x", "97", "y", "55", 1, "candidate-hint"], ["x", "-6", "y", "-6", "width", "206", "height", "90", "rx", "10", "fill", "transparent", 1, "hit"]], template: function TimelineComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275element(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "linearGradient", 4);
      \u0275\u0275element(6, "stop", 5)(7, "stop", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "linearGradient", 7);
      \u0275\u0275element(9, "stop", 8)(10, "stop", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "radialGradient", 10);
      \u0275\u0275element(12, "stop", 11)(13, "stop", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "pattern", 13);
      \u0275\u0275element(15, "path", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "pattern", 15);
      \u0275\u0275element(17, "path", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "symbol", 17);
      \u0275\u0275element(19, "circle", 18)(20, "path", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(21, "rect", 20)(22, "rect", 21)(23, "ellipse", 22);
      \u0275\u0275elementStart(24, "text", 23);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "text", 24);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(28, TimelineComponent_Conditional_28_Template, 46, 4)(29, TimelineComponent_Conditional_29_Template, 34, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(25);
      \u0275\u0275textInterpolate(ctx.d().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.d().era);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasHeadlines() ? 28 : 29);
    }
  }, dependencies: [SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */", "\n.scene-kicker[_ngcontent-%COMP%] {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle[_ngcontent-%COMP%], \n.lane-label[_ngcontent-%COMP%], \n.record-date[_ngcontent-%COMP%], \n.record-label[_ngcontent-%COMP%], \n.candidate-label[_ngcontent-%COMP%], \n.candidate-hint[_ngcontent-%COMP%], \n.view-label[_ngcontent-%COMP%], \n.view-hint[_ngcontent-%COMP%], \n.test-label[_ngcontent-%COMP%], \n.test-hint[_ngcontent-%COMP%] {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle[_ngcontent-%COMP%] {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.lane-label[_ngcontent-%COMP%] {\n  fill: #dec18b;\n  font: 13px Arial, sans-serif;\n  letter-spacing: 2px;\n}\n.paper-masthead[_ngcontent-%COMP%] {\n  fill: #5e4a3a;\n  font: 12px Arial, sans-serif;\n  letter-spacing: 4px;\n  text-anchor: middle;\n}\n.lead-label[_ngcontent-%COMP%] {\n  fill: #342d29;\n  font: 24px Georgia, serif;\n  font-weight: 700;\n  text-anchor: middle;\n}\n.paper-byline[_ngcontent-%COMP%] {\n  fill: #6b5843;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n  text-anchor: middle;\n}\n.headline-card[_ngcontent-%COMP%] {\n  fill: url(#headline-paper);\n  stroke: #e0bd78;\n  stroke-width: 3;\n}\n.headline-card-lines[_ngcontent-%COMP%] {\n  fill: url(#newsprint-lines);\n  pointer-events: none;\n}\n.clip-number[_ngcontent-%COMP%] {\n  fill: #71583e;\n  font: 10px Arial, sans-serif;\n  letter-spacing: 2px;\n  text-anchor: middle;\n}\n.headline-text[_ngcontent-%COMP%] {\n  fill: #342d29;\n  font: 14px Georgia, serif;\n  font-weight: 700;\n  text-anchor: middle;\n}\n.clip-hint[_ngcontent-%COMP%] {\n  fill: #5b806e;\n  font: 10px Arial, sans-serif;\n  letter-spacing: 1px;\n  text-anchor: middle;\n}\n.record-card[_ngcontent-%COMP%] {\n  fill: url(#timeline-paper);\n  stroke: #b7915a;\n  stroke-width: 3;\n}\n.record-date[_ngcontent-%COMP%] {\n  fill: #3b5047;\n  font: 14px Arial, sans-serif;\n}\n.record-label[_ngcontent-%COMP%] {\n  fill: #30473f;\n  font: 16px Georgia, serif;\n}\n.candidate-card[_ngcontent-%COMP%] {\n  fill: #334f4d;\n  stroke: #ae9364;\n  stroke-width: 3;\n}\n.candidate-label[_ngcontent-%COMP%] {\n  fill: #f0dfb5;\n  font: 17px Georgia, serif;\n}\n.candidate-hint[_ngcontent-%COMP%], \n.view-hint[_ngcontent-%COMP%], \n.test-hint[_ngcontent-%COMP%] {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n.view-button[_ngcontent-%COMP%] {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.test-button[_ngcontent-%COMP%] {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label[_ngcontent-%COMP%], \n.test-label[_ngcontent-%COMP%] {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n[kb][aria-pressed=true][_ngcontent-%COMP%]   .candidate-card[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .view-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][aria-pressed=true][_ngcontent-%COMP%]   .headline-card[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][_ngcontent-%COMP%]:hover   .record-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .candidate-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .test-button[_ngcontent-%COMP%] {\n  stroke: #f4d69b;\n}\n[kb][_ngcontent-%COMP%]:hover   .headline-card[_ngcontent-%COMP%] {\n  stroke: #f4d69b;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .record-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .candidate-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .test-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .headline-card[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n/*# sourceMappingURL=timeline.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-timeline", imports: [SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: `<svg
  class="scene investigation-scene"
  viewBox="0 0 1000 660"
  role="group"
  aria-label="Investigate fake newspaper headlines and test a missing event"
>
  <defs>
    <linearGradient id="timeline-wall" x2="0" y2="1">
      <stop stop-color="#203d43" />
      <stop offset="1" stop-color="#102a31" />
    </linearGradient>
    <linearGradient id="timeline-paper" x2="1" y2="1">
      <stop stop-color="#f4e5c3" />
      <stop offset="1" stop-color="#cbae78" />
    </linearGradient>
    <linearGradient id="headline-paper" x2="0.2" y2="1">
      <stop stop-color="#fff4d7" />
      <stop offset="1" stop-color="#d8b878" />
    </linearGradient>
    <radialGradient id="timeline-glow">
      <stop stop-color="#efda9a" stop-opacity=".24" />
      <stop offset="1" stop-color="#efda9a" stop-opacity="0" />
    </radialGradient>
    <pattern id="timeline-grain" width="120" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 12Q48 2 120 11M0 32Q56 44 120 30" fill="none" stroke="#e5cf9e" opacity=".08" />
    </pattern>
    <pattern id="newsprint-lines" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 11H12" stroke="#7e6748" stroke-width="1" opacity=".16" />
    </pattern>
    <symbol id="timeline-seal" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="28" fill="#9a6248" stroke="#e1bd7d" stroke-width="4" />
      <path d="M22 43h36M28 34h24M31 51h18" stroke="#f2d8a2" stroke-width="4" />
    </symbol>
  </defs>
  <rect width="1000" height="660" fill="url(#timeline-wall)" />
  <rect x="9" y="9" width="982" height="642" fill="url(#timeline-grain)" stroke="#6e806d" stroke-width="3" />
  <ellipse cx="440" cy="160" rx="600" ry="410" fill="url(#timeline-glow)" />
  <text x="500" y="54" class="scene-kicker">{{ d().title }}</text>
  <text x="500" y="78" class="scene-subtitle">{{ d().era }}</text>

  @if (hasHeadlines()) {
    <text x="500" y="112" class="lane-label">THE WITTENBERG EXTRA \xB7 FICTIONAL ARCHIVE</text>
    <path d="M32 126H968" stroke="#d3b87d" stroke-width="3" opacity=".55" />
    <g class="lead-paper" transform="translate(38 140)">
      <rect width="924" height="130" rx="4" fill="url(#headline-paper)" stroke="#f0d396" stroke-width="4" />
      <rect x="12" y="12" width="900" height="106" fill="url(#newsprint-lines)" opacity=".8" />
      <text x="462" y="31" class="paper-masthead">LOCAL MONK REPORT</text>
      <path d="M28 42H896" stroke="#5e4a3a" stroke-width="2" opacity=".55" />
      <text x="462" y="69" class="lead-label">{{ headlineLines(leadHeadline(), 65)[0] }}</text>
      @if (headlineLines(leadHeadline(), 65).length > 1) {
        <text x="462" y="94" class="lead-label">{{ headlineLines(leadHeadline(), 65)[1] }}</text>
      }
      <text x="462" y="115" class="paper-byline">Wittenberg \xB7 autumn 1517 \xB7 exact count disputed</text>
    </g>
    <text x="500" y="302" class="lane-label">FOUR REPORTS TO INSPECT \xB7 WHAT DID READERS ACTUALLY RECEIVE?</text>
    @for (headline of headlineCards(); track headline; let i = $index) {
      <g
        kb
        [label]="'Inspect fake newspaper headline: ' + headline"
        [pressed]="n('inspected-' + d().nodes[i].id) > 0"
        (activate)="k.act({ type: 'inspect', target: d().nodes[i].id })"
        [attr.transform]="'translate(' + (32 + i * 236) + ' 0)'"
      >
        <rect class="headline-card" x="0" y="322" width="218" height="148" rx="4" />
        <rect class="headline-card-lines" x="10" y="332" width="198" height="128" />
        <text x="109" y="342" class="clip-number">REPORT 0{{ i + 1 }}</text>
        <path d="M15 350H203" stroke="#806646" stroke-width="2" opacity=".55" />
        @for (line of headlineLines(headline, 25); track $index; let lineIndex = $index) {
          @if (lineIndex < 5) {
            <text x="109" [attr.y]="374 + lineIndex * 18" class="headline-text">{{ line }}</text>
          }
        }
        <text x="109" y="454" class="clip-hint">{{ n('inspected-' + d().nodes[i].id) ? 'CLUE INSPECTED' : 'inspect clipping' }}</text>
        @if (n('inspected-' + d().nodes[i].id)) {
          <path d="M188 336l12 12M200 336l-12 12" stroke="#237b70" stroke-width="3" />
        }
        <rect class="hit" x="-6" y="316" width="230" height="162" rx="8" fill="transparent" />
      </g>
    }
    <path d="M32 492H968" stroke="#d3b87d" stroke-width="3" opacity=".55" />
    <g transform="translate(45 510)">
      <text x="455" y="0" class="lane-label">WHAT COULD FILL THE GAP?</text>
      @for (candidate of d().candidates; track candidate.id; let i = $index) {
        <g kb [label]="'Place candidate in the gap: ' + candidate.label" [pressed]="k.state().selected === candidate.id" (activate)="k.act({ type: 'candidate', target: candidate.id })" [attr.transform]="'translate(' + (i * 220) + ' 17)'">
          <rect class="candidate-card" x="0" y="0" width="194" height="58" rx="8" />
          <text x="97" y="24" class="candidate-label">{{ candidate.label }}</text>
          <text x="97" y="44" class="candidate-hint">place this possibility</text>
          <rect class="hit" x="-6" y="-6" width="206" height="70" rx="10" fill="transparent" />
        </g>
      }
    </g>
    <g transform="translate(45 606)">
      <g kb label="Show the broken timeline" [pressed]="view() === 0" (activate)="k.act({ type: 'view', value: 0 })">
        <rect class="view-button" x="0" y="0" width="186" height="42" rx="7" />
        <text x="93" y="19" class="view-label">BROKEN RECORD</text>
        <text x="93" y="34" class="view-hint">local speech remains</text>
        <rect class="hit" x="-5" y="-5" width="196" height="52" rx="9" fill="transparent" />
      </g>
      <g kb label="Show the repaired timeline" [pressed]="view() === 1" (activate)="k.act({ type: 'view', value: 1 })" transform="translate(202 0)">
        <rect class="view-button" x="0" y="0" width="186" height="42" rx="7" />
        <text x="93" y="19" class="view-label">REPAIRED RECORD</text>
        <text x="93" y="34" class="view-hint">printed debate travels</text>
        <rect class="hit" x="-5" y="-5" width="196" height="52" rx="9" fill="transparent" />
      </g>
      <g kb label="Test the selected timeline candidate" (activate)="k.act({ type: 'test' })" transform="translate(610 0)">
        <rect class="test-button" x="0" y="0" width="300" height="42" rx="9" />
        <text x="150" y="19" class="test-label">TEST THE GAP</text>
        <text x="150" y="34" class="test-hint">compare every clue</text>
        <rect class="hit" x="-6" y="-6" width="312" height="54" rx="10" fill="transparent" />
      </g>
    </g>
  } @else {
    <path d="M32 94H968M32 430H968" stroke="#d3b87d" stroke-width="3" opacity=".55" />
    <text x="500" y="121" class="lane-label">ARCHIVE EVIDENCE</text>
    <path d="M78 214H922" stroke="#d4bd86" stroke-width="8" stroke-linecap="round" />
    <path d="M78 214H922" stroke="#344f4b" stroke-width="20" stroke-linecap="round" opacity=".55" />
    @for (node of d().nodes; track node.id; let i = $index) {
      <g [attr.transform]="'translate(' + (70 + i * 172) + ' 0)'">
        <path d="M8 200V228" stroke="#e1c58b" stroke-width="4" />
        <g kb [label]="'Inspect timeline record: ' + node.label + ', ' + node.date" (activate)="k.act({ type: 'inspect', target: node.id })">
          <rect class="record-card" x="-26" y="132" width="146" height="150" rx="7" [attr.opacity]="n('inspected-' + node.id) ? 1 : .86" />
          <circle cx="46" cy="208" r="32" fill="#314c48" stroke="#e1c58b" stroke-width="4" />
          @if (node.lane === 'gap') {
            <path d="M28 208h36M46 190v36" stroke="#df9b6d" stroke-width="5" />
          } @else {
            <use href="#timeline-seal" x="14" y="176" width="64" height="64" />
          }
          <text x="46" y="153" class="record-date">{{ node.date }}</text>
          <text x="46" y="268" class="record-label">{{ node.label }}</text>
          <rect class="hit" x="-32" y="126" width="158" height="164" rx="9" fill="transparent" />
          @if (n('inspected-' + node.id)) {
            <path d="M86 169l18 18M102 169l-18 18" stroke="#8cf1db" stroke-width="3" />
          }
        </g>
      </g>
    }
    <g transform="translate(45 348)">
      <text x="455" y="0" class="lane-label">WHAT COULD FILL THE GAP?</text>
      @for (candidate of d().candidates; track candidate.id; let i = $index) {
        <g kb [label]="'Place candidate in the gap: ' + candidate.label" [pressed]="k.state().selected === candidate.id" (activate)="k.act({ type: 'candidate', target: candidate.id })" [attr.transform]="'translate(' + (i * 220) + ' 28)'">
          <rect class="candidate-card" x="0" y="0" width="194" height="78" rx="8" />
          <text x="97" y="30" class="candidate-label">{{ candidate.label }}</text>
          <text x="97" y="55" class="candidate-hint">place this possibility</text>
          <rect class="hit" x="-6" y="-6" width="206" height="90" rx="10" fill="transparent" />
        </g>
      }
    </g>
    <g transform="translate(45 525)">
      <g kb label="Show the broken timeline" [pressed]="view() === 0" (activate)="k.act({ type: 'view', value: 0 })">
        <rect class="view-button" x="0" y="0" width="186" height="64" rx="7" />
        <text x="93" y="27" class="view-label">BROKEN RECORD</text>
        <text x="93" y="48" class="view-hint">local speech remains</text>
        <rect class="hit" x="-5" y="-5" width="196" height="74" rx="9" fill="transparent" />
      </g>
      <g kb label="Show the repaired timeline" [pressed]="view() === 1" (activate)="k.act({ type: 'view', value: 1 })" transform="translate(202 0)">
        <rect class="view-button" x="0" y="0" width="186" height="64" rx="7" />
        <text x="93" y="27" class="view-label">REPAIRED RECORD</text>
        <text x="93" y="48" class="view-hint">printed debate travels</text>
        <rect class="hit" x="-5" y="-5" width="196" height="74" rx="9" fill="transparent" />
      </g>
      <g kb label="Test the selected timeline candidate" (activate)="k.act({ type: 'test' })" transform="translate(610 0)">
        <rect class="test-button" x="0" y="0" width="300" height="64" rx="9" />
        <text x="150" y="29" class="test-label">TEST THE GAP</text>
        <text x="150" y="50" class="test-hint">compare every clue</text>
        <rect class="hit" x="-6" y="-6" width="312" height="76" rx="10" fill="transparent" />
      </g>
    </g>
  }
</svg>
`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n", "/* src/app/templates/time-repair/invention/knowledge/timeline.component.scss */\n.scene-kicker {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle,\n.lane-label,\n.record-date,\n.record-label,\n.candidate-label,\n.candidate-hint,\n.view-label,\n.view-hint,\n.test-label,\n.test-hint {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.lane-label {\n  fill: #dec18b;\n  font: 13px Arial, sans-serif;\n  letter-spacing: 2px;\n}\n.paper-masthead {\n  fill: #5e4a3a;\n  font: 12px Arial, sans-serif;\n  letter-spacing: 4px;\n  text-anchor: middle;\n}\n.lead-label {\n  fill: #342d29;\n  font: 24px Georgia, serif;\n  font-weight: 700;\n  text-anchor: middle;\n}\n.paper-byline {\n  fill: #6b5843;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n  text-anchor: middle;\n}\n.headline-card {\n  fill: url(#headline-paper);\n  stroke: #e0bd78;\n  stroke-width: 3;\n}\n.headline-card-lines {\n  fill: url(#newsprint-lines);\n  pointer-events: none;\n}\n.clip-number {\n  fill: #71583e;\n  font: 10px Arial, sans-serif;\n  letter-spacing: 2px;\n  text-anchor: middle;\n}\n.headline-text {\n  fill: #342d29;\n  font: 14px Georgia, serif;\n  font-weight: 700;\n  text-anchor: middle;\n}\n.clip-hint {\n  fill: #5b806e;\n  font: 10px Arial, sans-serif;\n  letter-spacing: 1px;\n  text-anchor: middle;\n}\n.record-card {\n  fill: url(#timeline-paper);\n  stroke: #b7915a;\n  stroke-width: 3;\n}\n.record-date {\n  fill: #3b5047;\n  font: 14px Arial, sans-serif;\n}\n.record-label {\n  fill: #30473f;\n  font: 16px Georgia, serif;\n}\n.candidate-card {\n  fill: #334f4d;\n  stroke: #ae9364;\n  stroke-width: 3;\n}\n.candidate-label {\n  fill: #f0dfb5;\n  font: 17px Georgia, serif;\n}\n.candidate-hint,\n.view-hint,\n.test-hint {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n.view-button {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.test-button {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label,\n.test-label {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n[kb][aria-pressed=true] .candidate-card,\n[kb][aria-pressed=true] .view-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][aria-pressed=true] .headline-card {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb]:hover .record-card,\n[kb]:hover .candidate-card,\n[kb]:hover .view-button,\n[kb]:hover .test-button {\n  stroke: #f4d69b;\n}\n[kb]:hover .headline-card {\n  stroke: #f4d69b;\n}\n[kb]:focus-visible .record-card,\n[kb]:focus-visible .candidate-card,\n[kb]:focus-visible .view-button,\n[kb]:focus-visible .test-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb]:focus-visible .headline-card {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n/*# sourceMappingURL=timeline.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TimelineComponent, { className: "TimelineComponent", filePath: "src/app/templates/time-repair/invention/knowledge/timeline.component.ts", lineNumber: 13 });
})();

// src/app/templates/time-repair/invention/knowledge/newspaper.component.ts
var _forTrack07 = ($index, $item) => $item.id;
function NewspaperComponent_For_28_For_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 51)(1, "path", 52);
  }
  if (rf & 2) {
    const $index_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("cx", ctx_r2.columnX($index_r5) + 90)("cy", ctx_r2.columnY($index_r5) + 23);
    \u0275\u0275advance();
    \u0275\u0275attribute("d", "M" + (ctx_r2.columnX($index_r5) + 82) + " " + (ctx_r2.columnY($index_r5) + 23) + "l6 6 12-14");
  }
}
function NewspaperComponent_For_28_For_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 49);
  }
  if (rf & 2) {
    const $index_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", "M" + (ctx_r2.columnX($index_r5) + 9) + " " + (ctx_r2.columnY($index_r5) + 14) + "h90M" + (ctx_r2.columnX($index_r5) + 9) + " " + (ctx_r2.columnY($index_r5) + 26) + "h78M" + (ctx_r2.columnX($index_r5) + 9) + " " + (ctx_r2.columnY($index_r5) + 38) + "h64");
  }
}
function NewspaperComponent_For_28_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 47);
    \u0275\u0275listener("activate", function NewspaperComponent_For_28_For_16_Template_g_activate_0_listener() {
      const $index_r5 = \u0275\u0275restoreView(_r4).$index;
      const edition_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "inspect", target: edition_r2.id + ":" + $index_r5 }));
    });
    \u0275\u0275element(1, "rect", 48);
    \u0275\u0275conditionalCreate(2, NewspaperComponent_For_28_For_16_Conditional_2_Template, 2, 3)(3, NewspaperComponent_For_28_For_16_Conditional_3_Template, 1, 1, ":svg:path", 49);
    \u0275\u0275element(4, "rect", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r5 = ctx.$index;
    const edition_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Inspect column " + ($index_r5 + 1) + " in " + edition_r2.masthead);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", ctx_r2.columnX($index_r5))("y", ctx_r2.columnY($index_r5));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.n("clue-" + edition_r2.id + "-" + $index_r5) ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("x", ctx_r2.columnX($index_r5) - 6)("y", ctx_r2.columnY($index_r5) - 6);
  }
}
function NewspaperComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g")(1, "g");
    \u0275\u0275element(2, "path", 35)(3, "path", 36);
    \u0275\u0275elementStart(4, "text", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "text", 38);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "path", 39);
    \u0275\u0275elementStart(9, "text", 40);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "text", 41);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "g", 42);
    \u0275\u0275listener("activate", function NewspaperComponent_For_28_Template_g_activate_13_listener() {
      const edition_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "open", target: edition_r2.id }));
    });
    \u0275\u0275element(14, "rect", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, NewspaperComponent_For_28_For_16_Template, 5, 6, ":svg:g", 44, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275element(17, "path", 45);
    \u0275\u0275elementStart(18, "text", 46);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const edition_r2 = ctx.$implicit;
    const \u0275$index_52_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (36 + \u0275$index_52_r6 * 312) + " 0)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(edition_r2.masthead);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(edition_r2.date);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(edition_r2.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(edition_r2.subhead);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Open newspaper: " + edition_r2.masthead + ", " + edition_r2.date)("pressed", ctx_r2.k.state().selected === edition_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(edition_r2.columns);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(edition_r2.kind === "historical" ? "SURVIVING RECORD" : "ALTERNATE EDITION");
  }
}
var NewspaperComponent = class _NewspaperComponent {
  k = inject(KnowledgeRuntime);
  d = computed(
    () => this.k.config().newspaper,
    ...ngDevMode ? [{ debugName: "d" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = computed(
    () => newspaperValue(this.k.state(), "view"),
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  n(key) {
    return newspaperValue(this.k.state(), key);
  }
  row(index) {
    return Math.floor(index / 2);
  }
  columnX(index) {
    return 26 + index % 2 * 122;
  }
  columnY(index) {
    return 274 + this.row(index) * 57;
  }
  static \u0275fac = function NewspaperComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NewspaperComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewspaperComponent, selectors: [["app-knowledge-newspaper"]], decls: 51, vars: 4, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "Investigate alternate and historical newspapers for evidence about the printing press", 1, "scene", "investigation-scene"], ["id", "paperroom-wall", "x2", "0", "y2", "1"], ["stop-color", "#283f43"], ["offset", "1", "stop-color", "#142c32"], ["id", "paperroom-table", "x2", "0", "y2", "1"], ["stop-color", "#a7794d"], ["offset", "1", "stop-color", "#523a31"], ["id", "broadsheet", "x2", "1", "y2", "1"], ["stop-color", "#f4e4bd"], ["offset", "1", "stop-color", "#c4a472"], ["id", "paperroom-lamp"], ["stop-color", "#f4dda2", "stop-opacity", ".23"], ["offset", "1", "stop-color", "#f4dda2", "stop-opacity", "0"], ["id", "paperroom-grain", "width", "110", "height", "36", "patternUnits", "userSpaceOnUse"], ["d", "M0 8Q47 1 110 10M0 28Q55 41 110 25", "fill", "none", "stroke", "#f1d8a7", "opacity", ".08"], ["width", "1000", "height", "660", "fill", "url(#paperroom-wall)"], ["x", "8", "y", "8", "width", "984", "height", "644", "fill", "url(#paperroom-grain)", "stroke", "#74806d", "stroke-width", "3"], ["cx", "530", "cy", "170", "rx", "570", "ry", "410", "fill", "url(#paperroom-lamp)"], ["d", "M0 482H1000V660H0Z", "fill", "url(#paperroom-table)"], ["d", "M0 482H1000M0 620H1000", "stroke", "#e0bb7e", "stroke-width", "7", "opacity", ".45"], ["x", "500", "y", "52", 1, "scene-kicker"], ["x", "500", "y", "76", 1, "scene-subtitle"], ["x", "500", "y", "112", 1, "scene-note"], ["transform", "translate(44 523)"], ["kb", "", "label", "Read the alternate newspaper record", 3, "activate", "pressed"], ["x", "0", "y", "0", "width", "250", "height", "62", "rx", "8", 1, "view-button"], ["x", "125", "y", "27", 1, "view-label"], ["x", "125", "y", "47", 1, "view-hint"], ["x", "-5", "y", "-5", "width", "260", "height", "72", "rx", "10", "fill", "transparent", 1, "hit"], ["kb", "", "label", "Compare the historical newspaper record", "transform", "translate(270 0)", 3, "activate", "pressed"], ["kb", "", "label", "Trace the newspaper evidence", "transform", "translate(540 0)", 3, "activate"], ["x", "0", "y", "0", "width", "370", "height", "62", "rx", "8", 1, "trace-button"], ["x", "185", "y", "27", 1, "trace-label"], ["x", "185", "y", "47", 1, "trace-hint"], ["x", "-5", "y", "-5", "width", "380", "height", "72", "rx", "10", "fill", "transparent", 1, "hit"], ["d", "M16 156L286 144 296 456 8 466Z", 1, "paper-shadow"], ["d", "M7 144L278 132 288 444 0 456Z", 1, "sheet"], ["x", "143", "y", "168", 1, "masthead"], ["x", "143", "y", "188", 1, "edition-date"], ["d", "M22 204H266", "stroke", "#526257", "stroke-width", "2"], ["x", "143", "y", "231", 1, "headline"], ["x", "143", "y", "254", 1, "subhead"], ["kb", "", 3, "activate", "label", "pressed"], ["x", "-9", "y", "124", "width", "306", "height", "140", "rx", "9", "fill", "transparent", 1, "hit"], ["kb", "", 3, "label"], ["d", "M25 414H263", "stroke", "#526257", "stroke-width", "2"], ["x", "143", "y", "433", 1, "issue-tag"], ["kb", "", 3, "activate", "label"], ["width", "110", "height", "46", "rx", "3", 1, "column-panel"], ["stroke", "#526257", "stroke-width", "3"], ["width", "122", "height", "58", "rx", "4", "fill", "transparent", 1, "hit"], ["r", "15", "fill", "#9b6549"], ["fill", "none", "stroke", "#f3db9f", "stroke-width", "3"]], template: function NewspaperComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275element(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "linearGradient", 4);
      \u0275\u0275element(6, "stop", 5)(7, "stop", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "linearGradient", 7);
      \u0275\u0275element(9, "stop", 8)(10, "stop", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "radialGradient", 10);
      \u0275\u0275element(12, "stop", 11)(13, "stop", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "pattern", 13);
      \u0275\u0275element(15, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "rect", 15)(17, "rect", 16)(18, "ellipse", 17)(19, "path", 18)(20, "path", 19);
      \u0275\u0275elementStart(21, "text", 20);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "text", 21);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "text", 22);
      \u0275\u0275text(26, "Open an issue, inspect two columns, then compare the record.");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(27, NewspaperComponent_For_28_Template, 20, 8, ":svg:g", null, _forTrack07);
      \u0275\u0275elementStart(29, "g", 23)(30, "g", 24);
      \u0275\u0275listener("activate", function NewspaperComponent_Template_g_activate_30_listener() {
        return ctx.k.act({ type: "compare", value: 0 });
      });
      \u0275\u0275element(31, "rect", 25);
      \u0275\u0275elementStart(32, "text", 26);
      \u0275\u0275text(33, "ALTERNATE RECORD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "text", 27);
      \u0275\u0275text(35, "what the missing press leaves behind");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "rect", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "g", 29);
      \u0275\u0275listener("activate", function NewspaperComponent_Template_g_activate_37_listener() {
        return ctx.k.act({ type: "compare", value: 1 });
      });
      \u0275\u0275element(38, "rect", 25);
      \u0275\u0275elementStart(39, "text", 26);
      \u0275\u0275text(40, "HISTORICAL RECORD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "text", 27);
      \u0275\u0275text(42, "what surviving issues show");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "rect", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "g", 30);
      \u0275\u0275listener("activate", function NewspaperComponent_Template_g_activate_44_listener() {
        return ctx.k.act({ type: "trace" });
      });
      \u0275\u0275element(45, "rect", 31);
      \u0275\u0275elementStart(46, "text", 32);
      \u0275\u0275text(47, "TRACE THE PRESS TRAIL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "text", 33);
      \u0275\u0275text(49, "two columns per issue");
      \u0275\u0275elementEnd();
      \u0275\u0275element(50, "rect", 34);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275textInterpolate(ctx.d().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.d().era);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.d().editions);
      \u0275\u0275advance(3);
      \u0275\u0275property("pressed", ctx.view() === 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("pressed", ctx.view() === 1);
    }
  }, dependencies: [SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */", "\n.scene-kicker[_ngcontent-%COMP%] {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle[_ngcontent-%COMP%], \n.scene-note[_ngcontent-%COMP%], \n.masthead[_ngcontent-%COMP%], \n.edition-date[_ngcontent-%COMP%], \n.headline[_ngcontent-%COMP%], \n.subhead[_ngcontent-%COMP%], \n.issue-tag[_ngcontent-%COMP%], \n.view-label[_ngcontent-%COMP%], \n.view-hint[_ngcontent-%COMP%], \n.trace-label[_ngcontent-%COMP%], \n.trace-hint[_ngcontent-%COMP%] {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle[_ngcontent-%COMP%] {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.scene-note[_ngcontent-%COMP%] {\n  fill: #d7c08c;\n  font: 13px Arial, sans-serif;\n}\n.paper-shadow[_ngcontent-%COMP%] {\n  fill: #0b2025;\n  opacity: 0.55;\n}\n.sheet[_ngcontent-%COMP%] {\n  fill: url(#broadsheet);\n  stroke: #b5905b;\n  stroke-width: 3;\n}\n.masthead[_ngcontent-%COMP%] {\n  fill: #2e483e;\n  font: 22px Georgia, serif;\n}\n.edition-date[_ngcontent-%COMP%] {\n  fill: #526257;\n  font: 12px Arial, sans-serif;\n}\n.headline[_ngcontent-%COMP%] {\n  fill: #354b42;\n  font: 16px Georgia, serif;\n}\n.subhead[_ngcontent-%COMP%] {\n  fill: #5c6d5d;\n  font: 11px Arial, sans-serif;\n}\n.column-panel[_ngcontent-%COMP%] {\n  fill: #e7d5a9;\n  stroke: #b39566;\n  stroke-width: 2;\n}\n.issue-tag[_ngcontent-%COMP%] {\n  fill: #5b6b5d;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-button[_ngcontent-%COMP%] {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.trace-button[_ngcontent-%COMP%] {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label[_ngcontent-%COMP%], \n.trace-label[_ngcontent-%COMP%] {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-hint[_ngcontent-%COMP%], \n.trace-hint[_ngcontent-%COMP%] {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n[kb][aria-pressed=true][_ngcontent-%COMP%]   .sheet[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .view-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][_ngcontent-%COMP%]:hover   .sheet[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .trace-button[_ngcontent-%COMP%] {\n  stroke: #f4d69b;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .sheet[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .trace-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n/*# sourceMappingURL=newspaper.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewspaperComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-newspaper", imports: [SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: `<svg
  class="scene investigation-scene"
  viewBox="0 0 1000 660"
  role="group"
  aria-label="Investigate alternate and historical newspapers for evidence about the printing press"
>
  <defs>
    <linearGradient id="paperroom-wall" x2="0" y2="1">
      <stop stop-color="#283f43" />
      <stop offset="1" stop-color="#142c32" />
    </linearGradient>
    <linearGradient id="paperroom-table" x2="0" y2="1">
      <stop stop-color="#a7794d" />
      <stop offset="1" stop-color="#523a31" />
    </linearGradient>
    <linearGradient id="broadsheet" x2="1" y2="1">
      <stop stop-color="#f4e4bd" />
      <stop offset="1" stop-color="#c4a472" />
    </linearGradient>
    <radialGradient id="paperroom-lamp">
      <stop stop-color="#f4dda2" stop-opacity=".23" />
      <stop offset="1" stop-color="#f4dda2" stop-opacity="0" />
    </radialGradient>
    <pattern id="paperroom-grain" width="110" height="36" patternUnits="userSpaceOnUse">
      <path d="M0 8Q47 1 110 10M0 28Q55 41 110 25" fill="none" stroke="#f1d8a7" opacity=".08" />
    </pattern>
  </defs>
  <rect width="1000" height="660" fill="url(#paperroom-wall)" />
  <rect x="8" y="8" width="984" height="644" fill="url(#paperroom-grain)" stroke="#74806d" stroke-width="3" />
  <ellipse cx="530" cy="170" rx="570" ry="410" fill="url(#paperroom-lamp)" />
  <path d="M0 482H1000V660H0Z" fill="url(#paperroom-table)" />
  <path d="M0 482H1000M0 620H1000" stroke="#e0bb7e" stroke-width="7" opacity=".45" />
  <text x="500" y="52" class="scene-kicker">{{ d().title }}</text>
  <text x="500" y="76" class="scene-subtitle">{{ d().era }}</text>
  <text x="500" y="112" class="scene-note">Open an issue, inspect two columns, then compare the record.</text>
  @for (edition of d().editions; track edition.id; let i = $index) {
    <g [attr.transform]="'translate(' + (36 + i * 312) + ' 0)'">
      <g>
        <path class="paper-shadow" d="M16 156L286 144 296 456 8 466Z" />
        <path class="sheet" d="M7 144L278 132 288 444 0 456Z" />
        <text x="143" y="168" class="masthead">{{ edition.masthead }}</text>
        <text x="143" y="188" class="edition-date">{{ edition.date }}</text>
        <path d="M22 204H266" stroke="#526257" stroke-width="2" />
        <text x="143" y="231" class="headline">{{ edition.headline }}</text>
        <text x="143" y="254" class="subhead">{{ edition.subhead }}</text>
        <g kb [label]="'Open newspaper: ' + edition.masthead + ', ' + edition.date" [pressed]="k.state().selected === edition.id" (activate)="k.act({ type: 'open', target: edition.id })">
          <rect class="hit" x="-9" y="124" width="306" height="140" rx="9" fill="transparent" />
        </g>
        @for (column of edition.columns; track $index) {
          <g kb [label]="'Inspect column ' + ($index + 1) + ' in ' + edition.masthead" (activate)="k.act({ type: 'inspect', target: edition.id + ':' + $index })">
            <rect class="column-panel" [attr.x]="columnX($index)" [attr.y]="columnY($index)" width="110" height="46" rx="3" />
            @if (n('clue-' + edition.id + '-' + $index)) {
              <circle [attr.cx]="columnX($index) + 90" [attr.cy]="columnY($index) + 23" r="15" fill="#9b6549" />
              <path [attr.d]="'M' + (columnX($index) + 82) + ' ' + (columnY($index) + 23) + 'l6 6 12-14'" fill="none" stroke="#f3db9f" stroke-width="3" />
            } @else {
              <path [attr.d]="'M' + (columnX($index) + 9) + ' ' + (columnY($index) + 14) + 'h90M' + (columnX($index) + 9) + ' ' + (columnY($index) + 26) + 'h78M' + (columnX($index) + 9) + ' ' + (columnY($index) + 38) + 'h64'" stroke="#526257" stroke-width="3" />
            }
            <rect class="hit" [attr.x]="columnX($index) - 6" [attr.y]="columnY($index) - 6" width="122" height="58" rx="4" fill="transparent" />
          </g>
        }
        <path d="M25 414H263" stroke="#526257" stroke-width="2" />
        <text x="143" y="433" class="issue-tag">{{ edition.kind === 'historical' ? 'SURVIVING RECORD' : 'ALTERNATE EDITION' }}</text>
      </g>
    </g>
  }
  <g transform="translate(44 523)">
    <g kb label="Read the alternate newspaper record" [pressed]="view() === 0" (activate)="k.act({ type: 'compare', value: 0 })">
      <rect class="view-button" x="0" y="0" width="250" height="62" rx="8" />
      <text x="125" y="27" class="view-label">ALTERNATE RECORD</text>
      <text x="125" y="47" class="view-hint">what the missing press leaves behind</text>
      <rect class="hit" x="-5" y="-5" width="260" height="72" rx="10" fill="transparent" />
    </g>
    <g kb label="Compare the historical newspaper record" [pressed]="view() === 1" (activate)="k.act({ type: 'compare', value: 1 })" transform="translate(270 0)">
      <rect class="view-button" x="0" y="0" width="250" height="62" rx="8" />
      <text x="125" y="27" class="view-label">HISTORICAL RECORD</text>
      <text x="125" y="47" class="view-hint">what surviving issues show</text>
      <rect class="hit" x="-5" y="-5" width="260" height="72" rx="10" fill="transparent" />
    </g>
    <g kb label="Trace the newspaper evidence" (activate)="k.act({ type: 'trace' })" transform="translate(540 0)">
      <rect class="trace-button" x="0" y="0" width="370" height="62" rx="8" />
      <text x="185" y="27" class="trace-label">TRACE THE PRESS TRAIL</text>
      <text x="185" y="47" class="trace-hint">two columns per issue</text>
      <rect class="hit" x="-5" y="-5" width="380" height="72" rx="10" fill="transparent" />
    </g>
  </g>
</svg>
`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n", "/* src/app/templates/time-repair/invention/knowledge/newspaper.component.scss */\n.scene-kicker {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle,\n.scene-note,\n.masthead,\n.edition-date,\n.headline,\n.subhead,\n.issue-tag,\n.view-label,\n.view-hint,\n.trace-label,\n.trace-hint {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.scene-note {\n  fill: #d7c08c;\n  font: 13px Arial, sans-serif;\n}\n.paper-shadow {\n  fill: #0b2025;\n  opacity: 0.55;\n}\n.sheet {\n  fill: url(#broadsheet);\n  stroke: #b5905b;\n  stroke-width: 3;\n}\n.masthead {\n  fill: #2e483e;\n  font: 22px Georgia, serif;\n}\n.edition-date {\n  fill: #526257;\n  font: 12px Arial, sans-serif;\n}\n.headline {\n  fill: #354b42;\n  font: 16px Georgia, serif;\n}\n.subhead {\n  fill: #5c6d5d;\n  font: 11px Arial, sans-serif;\n}\n.column-panel {\n  fill: #e7d5a9;\n  stroke: #b39566;\n  stroke-width: 2;\n}\n.issue-tag {\n  fill: #5b6b5d;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-button {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.trace-button {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label,\n.trace-label {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-hint,\n.trace-hint {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n[kb][aria-pressed=true] .sheet,\n[kb][aria-pressed=true] .view-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb]:hover .sheet,\n[kb]:hover .view-button,\n[kb]:hover .trace-button {\n  stroke: #f4d69b;\n}\n[kb]:focus-visible .sheet,\n[kb]:focus-visible .view-button,\n[kb]:focus-visible .trace-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n/*# sourceMappingURL=newspaper.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewspaperComponent, { className: "NewspaperComponent", filePath: "src/app/templates/time-repair/invention/knowledge/newspaper.component.ts", lineNumber: 13 });
})();

// src/app/templates/time-repair/invention/knowledge/interview.component.ts
var _forTrack08 = ($index, $item) => $item.id;
function InterviewComponent_For_33_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 51);
  }
}
function InterviewComponent_For_33_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 54);
    \u0275\u0275elementStart(1, "text", 55);
    \u0275\u0275text(2, "VOICE LOGGED");
    \u0275\u0275elementEnd();
  }
}
function InterviewComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "rect", 40);
    \u0275\u0275elementStart(2, "text", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "text", 42);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "g", 43);
    \u0275\u0275listener("activate", function InterviewComponent_For_33_Template_g_activate_6_listener() {
      const witness_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "hear", target: witness_r2.id }));
    });
    \u0275\u0275element(7, "circle", 44)(8, "use", 45)(9, "rect", 46);
    \u0275\u0275elementStart(10, "text", 47);
    \u0275\u0275text(11, "HEAR ACCOUNT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "g", 43);
    \u0275\u0275listener("activate", function InterviewComponent_For_33_Template_g_activate_12_listener() {
      const witness_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.k.act({ type: "inspect", target: witness_r2.id }));
    });
    \u0275\u0275element(13, "rect", 48)(14, "path", 49)(15, "circle", 50);
    \u0275\u0275conditionalCreate(16, InterviewComponent_For_33_Conditional_16_Template, 1, 0, ":svg:path", 51);
    \u0275\u0275elementStart(17, "text", 52);
    \u0275\u0275text(18, "INSPECT OBJECT");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "rect", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, InterviewComponent_For_33_Conditional_20_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const witness_r2 = ctx.$implicit;
    const \u0275$index_62_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (30 + \u0275$index_62_r4 * 316) + " 0)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(witness_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", witness_r2.role, " \xB7 ", witness_r2.date);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Hear " + witness_r2.name + " describe the record")("pressed", !!ctx_r2.n("heard-" + witness_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("color", \u0275$index_62_r4 === 1 ? "#9c7350" : \u0275$index_62_r4 === 2 ? "#6f8b78" : "#7d8b78");
    \u0275\u0275advance(4);
    \u0275\u0275property("label", "Inspect the evidence object carried by " + witness_r2.name)("pressed", !!ctx_r2.n("artifact-" + witness_r2.id));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.n("artifact-" + witness_r2.id) ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.n("heard-" + witness_r2.id) ? 20 : -1);
  }
}
var InterviewComponent = class _InterviewComponent {
  k = inject(KnowledgeRuntime);
  d = computed(
    () => this.k.config().interview,
    ...ngDevMode ? [{ debugName: "d" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = computed(
    () => interviewValue(this.k.state(), "view"),
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  n(key) {
    return interviewValue(this.k.state(), key);
  }
  static \u0275fac = function InterviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InterviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InterviewComponent, selectors: [["app-knowledge-interview"]], decls: 56, vars: 4, consts: [["viewBox", "0 0 1000 660", "role", "group", "aria-label", "Compare interviews and physical evidence from an alternate historical record", 1, "scene", "investigation-scene"], ["id", "interview-wall", "x2", "0", "y2", "1"], ["stop-color", "#263f43"], ["offset", "1", "stop-color", "#112b32"], ["id", "interview-table", "x2", "0", "y2", "1"], ["stop-color", "#a4784c"], ["offset", "1", "stop-color", "#4d382f"], ["id", "interview-paper", "x2", "1", "y2", "1"], ["stop-color", "#f2e0b9"], ["offset", "1", "stop-color", "#c3a473"], ["id", "interview-lamp"], ["stop-color", "#f0d69a", "stop-opacity", ".22"], ["offset", "1", "stop-color", "#f0d69a", "stop-opacity", "0"], ["id", "interview-grain", "width", "100", "height", "34", "patternUnits", "userSpaceOnUse"], ["d", "M0 9Q45 0 100 11M0 28Q55 41 100 25", "fill", "none", "stroke", "#efdaa9", "opacity", ".08"], ["id", "interview-person", "viewBox", "0 0 100 120"], ["cx", "50", "cy", "112", "rx", "34", "ry", "5", "fill", "#10282d", "opacity", ".4"], ["d", "M18 108Q21 62 50 56Q79 62 82 108Z", "fill", "currentColor", "stroke", "#304844", "stroke-width", "3"], ["cx", "50", "cy", "37", "r", "24", "fill", "#c99b73"], ["d", "M26 39Q23 7 54 10Q77 12 75 39L63 24 37 28Z", "fill", "#403a34"], ["width", "1000", "height", "660", "fill", "url(#interview-wall)"], ["x", "8", "y", "8", "width", "984", "height", "644", "fill", "url(#interview-grain)", "stroke", "#74806d", "stroke-width", "3"], ["cx", "480", "cy", "170", "rx", "570", "ry", "390", "fill", "url(#interview-lamp)"], ["d", "M0 468H1000V660H0Z", "fill", "url(#interview-table)"], ["d", "M0 468H1000M0 620H1000", "stroke", "#e0bb7e", "stroke-width", "7", "opacity", ".45"], ["x", "500", "y", "52", 1, "scene-kicker"], ["x", "500", "y", "76", 1, "scene-subtitle"], ["x", "500", "y", "108", 1, "scene-note"], ["transform", "translate(45 523)"], ["kb", "", "label", "Show the alternate witness record", 3, "activate", "pressed"], ["x", "0", "y", "0", "width", "250", "height", "62", "rx", "8", 1, "view-button"], ["x", "125", "y", "27", 1, "view-label"], ["x", "125", "y", "47", 1, "view-hint"], ["x", "-5", "y", "-5", "width", "260", "height", "72", "rx", "10", "fill", "transparent", 1, "hit"], ["kb", "", "label", "Compare the historical witness record", "transform", "translate(270 0)", 3, "activate", "pressed"], ["kb", "", "label", "Weigh the interview evidence", "transform", "translate(540 0)", 3, "activate"], ["x", "0", "y", "0", "width", "370", "height", "62", "rx", "8", 1, "weigh-button"], ["x", "185", "y", "27", 1, "weigh-label"], ["x", "185", "y", "47", 1, "weigh-hint"], ["x", "-5", "y", "-5", "width", "380", "height", "72", "rx", "10", "fill", "transparent", 1, "hit"], ["x", "0", "y", "126", "width", "292", "height", "310", "rx", "9", 1, "witness-card"], ["x", "146", "y", "152", 1, "witness-name"], ["x", "146", "y", "174", 1, "witness-role"], ["kb", "", 3, "activate", "label", "pressed"], ["cx", "72", "cy", "244", "r", "58", "fill", "#334e4b", "stroke", "#d4b47b", "stroke-width", "3"], ["href", "#interview-person", "x", "26", "y", "184", "width", "92", "height", "112"], ["x", "11", "y", "181", "width", "124", "height", "128", "rx", "8", "fill", "transparent", 1, "hit"], ["x", "72", "y", "326", 1, "action-label"], ["x", "152", "y", "206", "width", "115", "height", "102", "rx", "6", 1, "artifact-card"], ["d", "M169 227h81M169 245h72M169 263h58", "stroke", "#5a6a5a", "stroke-width", "3"], ["cx", "235", "cy", "279", "r", "17", "fill", "#9b6549"], ["d", "M226 279l6 6 12-14", "fill", "none", "stroke", "#f2d69c", "stroke-width", "3"], ["x", "210", "y", "330", 1, "action-label"], ["x", "146", "y", "196", "width", "128", "height", "145", "rx", "8", "fill", "transparent", 1, "hit"], ["d", "M31 366Q83 342 136 366", "fill", "none", "stroke", "#eed49c", "stroke-width", "3", 1, "speech-line"], ["x", "146", "y", "389", 1, "heard-label"]], template: function InterviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275element(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "linearGradient", 4);
      \u0275\u0275element(6, "stop", 5)(7, "stop", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "linearGradient", 7);
      \u0275\u0275element(9, "stop", 8)(10, "stop", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "radialGradient", 10);
      \u0275\u0275element(12, "stop", 11)(13, "stop", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "pattern", 13);
      \u0275\u0275element(15, "path", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "symbol", 15);
      \u0275\u0275element(17, "ellipse", 16)(18, "path", 17)(19, "circle", 18)(20, "path", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(21, "rect", 20)(22, "rect", 21)(23, "ellipse", 22)(24, "path", 23)(25, "path", 24);
      \u0275\u0275elementStart(26, "text", 25);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "text", 26);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "text", 27);
      \u0275\u0275text(31, "Hear each voice, inspect its object, then weigh the account.");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(32, InterviewComponent_For_33_Template, 21, 11, ":svg:g", null, _forTrack08);
      \u0275\u0275elementStart(34, "g", 28)(35, "g", 29);
      \u0275\u0275listener("activate", function InterviewComponent_Template_g_activate_35_listener() {
        return ctx.k.act({ type: "compare", value: 0 });
      });
      \u0275\u0275element(36, "rect", 30);
      \u0275\u0275elementStart(37, "text", 31);
      \u0275\u0275text(38, "ALTERNATE VOICES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "text", 32);
      \u0275\u0275text(40, "what people could see");
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "rect", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "g", 34);
      \u0275\u0275listener("activate", function InterviewComponent_Template_g_activate_42_listener() {
        return ctx.k.act({ type: "compare", value: 1 });
      });
      \u0275\u0275element(43, "rect", 30);
      \u0275\u0275elementStart(44, "text", 31);
      \u0275\u0275text(45, "HISTORICAL VOICES");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "text", 32);
      \u0275\u0275text(47, "what the sources preserve");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "rect", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "g", 35);
      \u0275\u0275listener("activate", function InterviewComponent_Template_g_activate_49_listener() {
        return ctx.k.act({ type: "weigh" });
      });
      \u0275\u0275element(50, "rect", 36);
      \u0275\u0275elementStart(51, "text", 37);
      \u0275\u0275text(52, "WEIGH THE TESTIMONY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "text", 38);
      \u0275\u0275text(54, "voices plus objects");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "rect", 39);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(27);
      \u0275\u0275textInterpolate(ctx.d().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.d().era);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.d().witnesses);
      \u0275\u0275advance(3);
      \u0275\u0275property("pressed", ctx.view() === 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("pressed", ctx.view() === 1);
    }
  }, dependencies: [SceneButtonDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb][_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n}\n[kb][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb][_ngcontent-%COMP%]:hover   .hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .hit[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit[_ngcontent-%COMP%] {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit[_ngcontent-%COMP%]:hover {\n  stroke: #f0d69f;\n}\n[kb].hit[_ngcontent-%COMP%]:focus-visible, \n[kb].hit[aria-pressed=true][_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper[_ngcontent-%COMP%] {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink[_ngcontent-%COMP%] {\n  fill: #355951;\n}\n.label[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small[_ngcontent-%COMP%] {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood[_ngcontent-%COMP%] {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal[_ngcontent-%COMP%] {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket[_ngcontent-%COMP%] {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb][_ngcontent-%COMP%]   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #baa87b;\n}\n[kb][_ngcontent-%COMP%]:hover   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #f0d69f;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .socket.hit[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n}\n.button-face[_ngcontent-%COMP%] {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink[_ngcontent-%COMP%] {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved[_ngcontent-%COMP%] {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow[_ngcontent-%COMP%] {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse[_ngcontent-%COMP%] {\n  animation-direction: reverse;\n}\n.operate[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_work-bob 1s ease-in-out 3;\n}\n@keyframes _ngcontent-%COMP%_turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */", "\n.scene-kicker[_ngcontent-%COMP%] {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle[_ngcontent-%COMP%], \n.scene-note[_ngcontent-%COMP%], \n.witness-name[_ngcontent-%COMP%], \n.witness-role[_ngcontent-%COMP%], \n.action-label[_ngcontent-%COMP%], \n.heard-label[_ngcontent-%COMP%], \n.view-label[_ngcontent-%COMP%], \n.view-hint[_ngcontent-%COMP%], \n.weigh-label[_ngcontent-%COMP%], \n.weigh-hint[_ngcontent-%COMP%] {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle[_ngcontent-%COMP%] {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.scene-note[_ngcontent-%COMP%] {\n  fill: #d7c08c;\n  font: 13px Arial, sans-serif;\n}\n.witness-card[_ngcontent-%COMP%] {\n  fill: #1c383c;\n  stroke: #aa9367;\n  stroke-width: 3;\n}\n.witness-name[_ngcontent-%COMP%] {\n  fill: #f0dfb5;\n  font: 18px Georgia, serif;\n}\n.witness-role[_ngcontent-%COMP%] {\n  fill: #aebea7;\n  font: 12px Arial, sans-serif;\n}\n.artifact-card[_ngcontent-%COMP%] {\n  fill: url(#interview-paper);\n  stroke: #b49564;\n  stroke-width: 2;\n}\n.action-label[_ngcontent-%COMP%] {\n  fill: #ddc28d;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.heard-label[_ngcontent-%COMP%] {\n  fill: #8cf1db;\n  font: 12px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-button[_ngcontent-%COMP%] {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.weigh-button[_ngcontent-%COMP%] {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label[_ngcontent-%COMP%], \n.weigh-label[_ngcontent-%COMP%] {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-hint[_ngcontent-%COMP%], \n.weigh-hint[_ngcontent-%COMP%] {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n[kb][aria-pressed=true][_ngcontent-%COMP%]   .witness-card[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .artifact-card[_ngcontent-%COMP%], \n[kb][aria-pressed=true][_ngcontent-%COMP%]   .view-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb][_ngcontent-%COMP%]:hover   .witness-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .artifact-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:hover   .weigh-button[_ngcontent-%COMP%] {\n  stroke: #f4d69b;\n}\n[kb][_ngcontent-%COMP%]:focus-visible   .witness-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .artifact-card[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .view-button[_ngcontent-%COMP%], \n[kb][_ngcontent-%COMP%]:focus-visible   .weigh-button[_ngcontent-%COMP%] {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n.speech-line[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_speech 0.8s ease-out 2;\n}\n@keyframes _ngcontent-%COMP%_speech {\n  from {\n    opacity: 0.15;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .speech-line[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=interview.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-interview", imports: [SceneButtonDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: `<svg
  class="scene investigation-scene"
  viewBox="0 0 1000 660"
  role="group"
  aria-label="Compare interviews and physical evidence from an alternate historical record"
>
  <defs>
    <linearGradient id="interview-wall" x2="0" y2="1">
      <stop stop-color="#263f43" />
      <stop offset="1" stop-color="#112b32" />
    </linearGradient>
    <linearGradient id="interview-table" x2="0" y2="1">
      <stop stop-color="#a4784c" />
      <stop offset="1" stop-color="#4d382f" />
    </linearGradient>
    <linearGradient id="interview-paper" x2="1" y2="1">
      <stop stop-color="#f2e0b9" />
      <stop offset="1" stop-color="#c3a473" />
    </linearGradient>
    <radialGradient id="interview-lamp">
      <stop stop-color="#f0d69a" stop-opacity=".22" />
      <stop offset="1" stop-color="#f0d69a" stop-opacity="0" />
    </radialGradient>
    <pattern id="interview-grain" width="100" height="34" patternUnits="userSpaceOnUse">
      <path d="M0 9Q45 0 100 11M0 28Q55 41 100 25" fill="none" stroke="#efdaa9" opacity=".08" />
    </pattern>
    <symbol id="interview-person" viewBox="0 0 100 120">
      <ellipse cx="50" cy="112" rx="34" ry="5" fill="#10282d" opacity=".4" />
      <path d="M18 108Q21 62 50 56Q79 62 82 108Z" fill="currentColor" stroke="#304844" stroke-width="3" />
      <circle cx="50" cy="37" r="24" fill="#c99b73" />
      <path d="M26 39Q23 7 54 10Q77 12 75 39L63 24 37 28Z" fill="#403a34" />
    </symbol>
  </defs>
  <rect width="1000" height="660" fill="url(#interview-wall)" />
  <rect x="8" y="8" width="984" height="644" fill="url(#interview-grain)" stroke="#74806d" stroke-width="3" />
  <ellipse cx="480" cy="170" rx="570" ry="390" fill="url(#interview-lamp)" />
  <path d="M0 468H1000V660H0Z" fill="url(#interview-table)" />
  <path d="M0 468H1000M0 620H1000" stroke="#e0bb7e" stroke-width="7" opacity=".45" />
  <text x="500" y="52" class="scene-kicker">{{ d().title }}</text>
  <text x="500" y="76" class="scene-subtitle">{{ d().era }}</text>
  <text x="500" y="108" class="scene-note">Hear each voice, inspect its object, then weigh the account.</text>
  @for (witness of d().witnesses; track witness.id; let i = $index) {
    <g [attr.transform]="'translate(' + (30 + i * 316) + ' 0)'">
      <rect class="witness-card" x="0" y="126" width="292" height="310" rx="9" />
      <text x="146" y="152" class="witness-name">{{ witness.name }}</text>
      <text x="146" y="174" class="witness-role">{{ witness.role }} \xB7 {{ witness.date }}</text>
      <g kb [label]="'Hear ' + witness.name + ' describe the record'" [pressed]="!!n('heard-' + witness.id)" (activate)="k.act({ type: 'hear', target: witness.id })">
        <circle cx="72" cy="244" r="58" fill="#334e4b" stroke="#d4b47b" stroke-width="3" />
        <use href="#interview-person" x="26" y="184" width="92" height="112" [attr.color]="i === 1 ? '#9c7350' : i === 2 ? '#6f8b78' : '#7d8b78'" />
        <rect class="hit" x="11" y="181" width="124" height="128" rx="8" fill="transparent" />
        <text x="72" y="326" class="action-label">HEAR ACCOUNT</text>
      </g>
      <g kb [label]="'Inspect the evidence object carried by ' + witness.name" [pressed]="!!n('artifact-' + witness.id)" (activate)="k.act({ type: 'inspect', target: witness.id })">
        <rect class="artifact-card" x="152" y="206" width="115" height="102" rx="6" />
        <path d="M169 227h81M169 245h72M169 263h58" stroke="#5a6a5a" stroke-width="3" />
        <circle cx="235" cy="279" r="17" fill="#9b6549" />
        @if (n('artifact-' + witness.id)) {
          <path d="M226 279l6 6 12-14" fill="none" stroke="#f2d69c" stroke-width="3" />
        }
        <text x="210" y="330" class="action-label">INSPECT OBJECT</text>
        <rect class="hit" x="146" y="196" width="128" height="145" rx="8" fill="transparent" />
      </g>
      @if (n('heard-' + witness.id)) {
        <path class="speech-line" d="M31 366Q83 342 136 366" fill="none" stroke="#eed49c" stroke-width="3" />
        <text x="146" y="389" class="heard-label">VOICE LOGGED</text>
      }
    </g>
  }
  <g transform="translate(45 523)">
    <g kb label="Show the alternate witness record" [pressed]="view() === 0" (activate)="k.act({ type: 'compare', value: 0 })">
      <rect class="view-button" x="0" y="0" width="250" height="62" rx="8" />
      <text x="125" y="27" class="view-label">ALTERNATE VOICES</text>
      <text x="125" y="47" class="view-hint">what people could see</text>
      <rect class="hit" x="-5" y="-5" width="260" height="72" rx="10" fill="transparent" />
    </g>
    <g kb label="Compare the historical witness record" [pressed]="view() === 1" (activate)="k.act({ type: 'compare', value: 1 })" transform="translate(270 0)">
      <rect class="view-button" x="0" y="0" width="250" height="62" rx="8" />
      <text x="125" y="27" class="view-label">HISTORICAL VOICES</text>
      <text x="125" y="47" class="view-hint">what the sources preserve</text>
      <rect class="hit" x="-5" y="-5" width="260" height="72" rx="10" fill="transparent" />
    </g>
    <g kb label="Weigh the interview evidence" (activate)="k.act({ type: 'weigh' })" transform="translate(540 0)">
      <rect class="weigh-button" x="0" y="0" width="370" height="62" rx="8" />
      <text x="185" y="27" class="weigh-label">WEIGH THE TESTIMONY</text>
      <text x="185" y="47" class="weigh-hint">voices plus objects</text>
      <rect class="hit" x="-5" y="-5" width="380" height="72" rx="10" fill="transparent" />
    </g>
  </g>
</svg>
`, styles: ["/* src/app/templates/time-repair/invention/knowledge/knowledge-scene.scss */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n.scene {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #213d40;\n  font-family: Georgia, serif;\n}\n.scene text {\n  -webkit-user-select: none;\n  user-select: none;\n}\n[kb] {\n  cursor: pointer;\n  outline: none;\n}\n[kb] .hit {\n  stroke: transparent;\n  stroke-width: 4;\n}\n[kb]:hover .hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .hit,\n[kb][aria-pressed=true] .hit {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb].hit {\n  cursor: pointer;\n  stroke: transparent;\n  stroke-width: 3;\n}\n[kb].hit:hover {\n  stroke: #f0d69f;\n}\n[kb].hit:focus-visible,\n[kb].hit[aria-pressed=true] {\n  stroke: #8cf1db;\n  stroke-width: 4;\n}\n.paper {\n  fill: #eddab1;\n  stroke: #947145;\n  stroke-width: 2;\n}\n.ink {\n  fill: #355951;\n}\n.label {\n  font: 18px Georgia, serif;\n  fill: #f7e5bd;\n  text-anchor: middle;\n}\n.small {\n  font: 15px Arial, sans-serif;\n  fill: #f2e0b4;\n  text-anchor: middle;\n}\n.wood {\n  fill: #785039;\n  stroke: #b99463;\n  stroke-width: 3;\n}\n.metal {\n  fill: #a1b2a7;\n  stroke: #415f59;\n  stroke-width: 3;\n}\n.socket {\n  fill: rgba(20, 46, 50, 0.6);\n  stroke: #a99a72;\n  stroke-width: 3;\n  stroke-dasharray: 9 7;\n}\n[kb] .socket.hit {\n  stroke: #baa87b;\n}\n[kb]:hover .socket.hit {\n  stroke: #f0d69f;\n}\n[kb]:focus-visible .socket.hit {\n  stroke: #8cf1db;\n}\n.button-face {\n  fill: #ddc08b;\n  stroke: #795837;\n  stroke-width: 3;\n}\n.button-ink {\n  fill: #294a46;\n  font: 22px Georgia, serif;\n  text-anchor: middle;\n}\n.moved {\n  transition: transform 0.6s ease, opacity 0.5s;\n}\n.glow {\n  fill: #90b49a;\n  opacity: 0.25;\n}\n.running {\n  animation: turn-wheel 3s linear 3;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.reverse {\n  animation-direction: reverse;\n}\n.operate {\n  animation: work-bob 1s ease-in-out 3;\n}\n@keyframes turn-wheel {\n  to {\n    rotate: 360deg;\n  }\n}\n@keyframes work-bob {\n  50% {\n    translate: 0 -8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=knowledge-scene.css.map */\n", "/* src/app/templates/time-repair/invention/knowledge/interview.component.scss */\n.scene-kicker {\n  fill: #f1dfb6;\n  font: 24px Georgia, serif;\n  text-anchor: middle;\n}\n.scene-subtitle,\n.scene-note,\n.witness-name,\n.witness-role,\n.action-label,\n.heard-label,\n.view-label,\n.view-hint,\n.weigh-label,\n.weigh-hint {\n  text-anchor: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scene-subtitle {\n  fill: #b8c8a3;\n  font: 15px Arial, sans-serif;\n}\n.scene-note {\n  fill: #d7c08c;\n  font: 13px Arial, sans-serif;\n}\n.witness-card {\n  fill: #1c383c;\n  stroke: #aa9367;\n  stroke-width: 3;\n}\n.witness-name {\n  fill: #f0dfb5;\n  font: 18px Georgia, serif;\n}\n.witness-role {\n  fill: #aebea7;\n  font: 12px Arial, sans-serif;\n}\n.artifact-card {\n  fill: url(#interview-paper);\n  stroke: #b49564;\n  stroke-width: 2;\n}\n.action-label {\n  fill: #ddc28d;\n  font: 11px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.heard-label {\n  fill: #8cf1db;\n  font: 12px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-button {\n  fill: #203c3e;\n  stroke: #b49563;\n  stroke-width: 3;\n}\n.weigh-button {\n  fill: #896346;\n  stroke: #ebc988;\n  stroke-width: 3;\n}\n.view-label,\n.weigh-label {\n  fill: #f2dfb3;\n  font: 14px Arial, sans-serif;\n  letter-spacing: 1px;\n}\n.view-hint,\n.weigh-hint {\n  fill: #b4c3a4;\n  font: 12px Arial, sans-serif;\n}\n[kb][aria-pressed=true] .witness-card,\n[kb][aria-pressed=true] .artifact-card,\n[kb][aria-pressed=true] .view-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n[kb]:hover .witness-card,\n[kb]:hover .artifact-card,\n[kb]:hover .view-button,\n[kb]:hover .weigh-button {\n  stroke: #f4d69b;\n}\n[kb]:focus-visible .witness-card,\n[kb]:focus-visible .artifact-card,\n[kb]:focus-visible .view-button,\n[kb]:focus-visible .weigh-button {\n  stroke: #8cf1db;\n  stroke-width: 5;\n}\n.speech-line {\n  animation: speech 0.8s ease-out 2;\n}\n@keyframes speech {\n  from {\n    opacity: 0.15;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .speech-line {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=interview.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InterviewComponent, { className: "InterviewComponent", filePath: "src/app/templates/time-repair/invention/knowledge/interview.component.ts", lineNumber: 13 });
})();

// src/app/templates/time-repair/invention/knowledge/knowledge-host.component.ts
function KnowledgeHostComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
var KNOWLEDGE_RENDERERS = {
  reconstruction: ReconstructionComponent,
  assembly: AssemblyComponent,
  diagram: DiagramComponent,
  distribution: DistributionComponent,
  access: AccessComponent,
  apprentice: ApprenticeComponent,
  circulation: CirculationComponent,
  timeline: TimelineComponent,
  newspaper: NewspaperComponent,
  interview: InterviewComponent
};
var KnowledgeHostComponent = class _KnowledgeHostComponent {
  k = inject(KnowledgeRuntime);
  renderer = computed(
    () => KNOWLEDGE_RENDERERS[this.k.config().kind],
    ...ngDevMode ? [{ debugName: "renderer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function KnowledgeHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KnowledgeHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KnowledgeHostComponent, selectors: [["app-knowledge-host"]], decls: 1, vars: 1, consts: [[4, "ngComponentOutlet"]], template: function KnowledgeHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, KnowledgeHostComponent_ng_container_0_Template, 1, 0, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngComponentOutlet", ctx.renderer());
    }
  }, dependencies: [NgComponentOutlet], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n/*# sourceMappingURL=knowledge-host.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KnowledgeHostComponent, [{
    type: Component,
    args: [{ selector: "app-knowledge-host", imports: [NgComponentOutlet], changeDetection: ChangeDetectionStrategy.OnPush, template: `<ng-container *ngComponentOutlet="renderer()" />`, styles: ["/* angular:styles/component:scss;d0d8e7d307aee74fe9613a6a9b5637dbef0098006af1aaf48088440e29a29461;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/time-repair/invention/knowledge/knowledge-host.component.ts */\n:host {\n  display: block;\n  height: 100%;\n  min-width: 0;\n}\n/*# sourceMappingURL=knowledge-host.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KnowledgeHostComponent, { className: "KnowledgeHostComponent", filePath: "src/app/templates/time-repair/invention/knowledge/knowledge-host.component.ts", lineNumber: 35 });
})();

// src/app/templates/time-repair/invention/knowledge/knowledge.persistence.ts
var BrowserKnowledgePersistence = class {
  constructor(context, storage = safeBrowserStorage()) {
    this.context = context;
    this.storage = storage;
    this.available = !!storage;
  }
  context;
  storage;
  available;
  store(session) {
    return new ScopedBrowserStore(
      "invention-knowledge.v1",
      this.storage,
      (value) => {
        if (!value || typeof value !== "object" || !session.knowledge) return false;
        const save = value;
        return Array.isArray(save.events) && save.events.length <= 800 && save.events.every(
          (e) => e?.tenantId === this.context.tenantId && e.actor?.id === this.context.actorId && e.attemptId === this.context.attemptId
        ) && replayKnowledge(session.knowledge, save.events, this.context.projectId, session.id) !== void 0;
      }
    );
  }
  load(session) {
    return this.store(session).load(__spreadProps(__spreadValues({}, this.context), { sessionId: session.id }));
  }
  save(session, data) {
    this.store(session).save(__spreadProps(__spreadValues({}, this.context), { sessionId: session.id }), data);
  }
};

// src/app/templates/time-repair/invention/invention-workspace.component.ts
var _forTrack09 = ($index, $item) => $item.id;
function InventionWorkspaceComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-knowledge-host");
  }
}
function InventionWorkspaceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-courtyard-scene");
  }
}
function InventionWorkspaceComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-press-workbench");
  }
}
function InventionWorkspaceComponent_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.r.goodCount(), " / ", ctx_r1.r.session().batchSize, " clean impressions in a row ");
  }
}
function InventionWorkspaceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function InventionWorkspaceComponent_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.travel());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, InventionWorkspaceComponent_Conditional_21_Conditional_2_Template, 2, 2, "p", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.r.scene() === "press" ? "Return to 1460 \u2197" : "Back to the workshop \u2199", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.r.scene() === "press" ? 2 : -1);
  }
}
function InventionWorkspaceComponent_For_29_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Session ", s_r3.number);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", s_r3.product, " ");
  }
}
function InventionWorkspaceComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InventionWorkspaceComponent_For_29_Conditional_0_Template, 4, 2, "li");
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(s_r3.number === ctx_r1.r.week() * 2 - 1 || s_r3.number === ctx_r1.r.week() * 2 ? 0 : -1);
  }
}
function InventionWorkspaceComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function InventionWorkspaceComponent_Conditional_37_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.export());
    });
    \u0275\u0275text(3, "Download notebook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 15);
    \u0275\u0275listener("click", function InventionWorkspaceComponent_Conditional_37_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.k.reset());
    });
    \u0275\u0275text(5, "Reset this activity");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.k.state().trials.length, " recorded investigations");
  }
}
function InventionWorkspaceComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function InventionWorkspaceComponent_Conditional_38_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.exportNotebook());
    });
    \u0275\u0275text(3, "Download notebook");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.r.state().trials.length, " proofs \xB7 ", ctx_r1.r.state().samples.length, " material tests ");
  }
}
function InventionWorkspaceComponent_For_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "a", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("href", source_r6.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r6.title, " \u2197");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r6.detail);
  }
}
function InventionWorkspaceComponent_For_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7);
  }
}
var InventionWorkspaceComponent = class _InventionWorkspaceComponent {
  r = inject(InventionRuntime);
  k = inject(KnowledgeRuntime);
  focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  constructor() {
    effect(() => {
      const lesson = this.focus?.();
      if (lesson && !this.r.example)
        untracked(() => this.r.open(lesson.number));
    });
  }
  static \u0275fac = function InventionWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventionWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InventionWorkspaceComponent, selectors: [["app-invention-workspace"]], features: [\u0275\u0275ProvidersFeature([
    InventionRuntime,
    KnowledgeRuntime,
    {
      provide: KNOWLEDGE_PERSISTENCE,
      useFactory: () => new BrowserKnowledgePersistence(inject(INVENTION_CONTEXT))
    },
    {
      provide: INVENTION_PERSISTENCE,
      useFactory: () => new BrowserInventionPersistence(inject(INVENTION_PROJECT), inject(INVENTION_CONTEXT))
    }
  ])], decls: 76, vars: 21, consts: [[1, "invention-layout"], ["aria-label", "Invention rescue activity", 1, "activity-panel"], ["aria-label", "Weekly task and AI Tutor", 1, "mission-column"], ["open", "", 1, "task-box"], [1, "task-content"], [1, "coordinates"], [1, "inside-detail"], ["role", "status", "aria-live", "polite", 1, "feedback"], ["open", "", 1, "tutor-box"], [1, "tutor-title"], [1, "tutor-content"], [1, "tutor-question"], [1, "source"], [1, "time-jump", 3, "click"], [1, "batch-note"], [1, "notebook", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function InventionWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1);
      \u0275\u0275conditionalCreate(2, InventionWorkspaceComponent_Conditional_2_Template, 1, 0, "app-knowledge-host")(3, InventionWorkspaceComponent_Conditional_3_Template, 1, 0, "app-courtyard-scene")(4, InventionWorkspaceComponent_Conditional_4_Template, 1, 0, "app-press-workbench");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "aside", 2)(6, "details", 3)(7, "summary")(8, "span");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "h2");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 4)(13, "p", 5);
      \u0275\u0275text(14);
      \u0275\u0275elementStart(15, "b");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "h3");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, InventionWorkspaceComponent_Conditional_21_Template, 3, 2);
      \u0275\u0275elementStart(22, "details", 6)(23, "summary");
      \u0275\u0275text(24, "This week\u2019s goal & work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p");
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "ul");
      \u0275\u0275repeaterCreate(28, InventionWorkspaceComponent_For_29_Template, 1, 1, null, null, _forTrack09);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "p", 7);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "details", 6)(33, "summary");
      \u0275\u0275text(34, "Trial notebook & local save");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p");
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(37, InventionWorkspaceComponent_Conditional_37_Template, 6, 1)(38, InventionWorkspaceComponent_Conditional_38_Template, 4, 2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "details", 8)(40, "summary")(41, "span");
      \u0275\u0275text(42, "YOUR THINKING SPACE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 9)(44, "h2");
      \u0275\u0275text(45, "AI Tutor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "b");
      \u0275\u0275text(47, "Not connected");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "div", 10)(49, "p", 11);
      \u0275\u0275text(50);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "details", 6)(52, "summary");
      \u0275\u0275text(53, "The history behind this scene");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p");
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p");
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p");
      \u0275\u0275text(59);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "details", 6)(61, "summary");
      \u0275\u0275text(62, "Sources to investigate");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(63, InventionWorkspaceComponent_For_64_Template, 5, 3, "div", 12, _forTrack09);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "details", 6)(66, "summary");
      \u0275\u0275text(67, "Evidence the tutor will check");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "ul");
      \u0275\u0275repeaterCreate(69, InventionWorkspaceComponent_For_70_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "details", 6)(72, "summary");
      \u0275\u0275text(73, "Planned tutor controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "p");
      \u0275\u0275text(75, " Compare your trials, prompt a one-variable test, introduce a fresh mechanical fault, and review your historical explanation. These controls and assessment are not connected. ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-week", ctx.r.week())("data-lesson", ctx.r.number());
      \u0275\u0275advance();
      \u0275\u0275classProp("knowledge-panel", ctx.k.active());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.k.active() ? 2 : ctx.r.scene() === "courtyard" ? 3 : 4);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2("WEEK ", ctx.r.week(), " \xB7 ", ctx.r.example ? "EXAMPLE" : ctx.r.number() % 2 === 1 ? "INDIVIDUAL" : "GROUP");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.weekContent().title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.r.scene() === "courtyard" ? "Mainz \xB7 bookseller\u2019s courtyard" : ctx.r.session().location);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.scene() === "courtyard" ? "c. 1460" : ctx.r.session().date);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.session().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.session().task);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.r.session().mode === "return" ? 21 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.r.weekContent().goal);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.r.content.sessions);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", (ctx.k.active() ? ctx.k.message() : ctx.r.message()) || (ctx.r.example ? "Example batch prepared. This does not alter your session work." : "Operate the objects. Your observations will appear here."), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", (ctx.k.active() ? ctx.k.storageMessage() : ctx.r.storageMessage()) || "Local model practice. No grades or shared changes are recorded.", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.k.active() ? 37 : 38);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.r.session().question);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.r.session().historicalNote);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.content.fiction);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.content.modelNote);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.r.sourceIds());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.r.weekContent().evidence);
    }
  }, dependencies: [PressWorkbenchComponent, CourtyardSceneComponent, KnowledgeHostComponent], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  color: #293f3b;\n  background: #e7e8df;\n  font: 13px/1.55 Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.invention-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 306px;\n  gap: 0;\n  min-height: calc(100dvh - 102px);\n}\n.activity-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  height: max(580px, 100dvh - 102px);\n  position: sticky;\n  top: 68px;\n  overflow: hidden;\n  border-right: 1px solid #8c917d;\n}\n.mission-column[_ngcontent-%COMP%] {\n  padding: 19px 17px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: #edeee6;\n  min-width: 0;\n}\n.task-box[_ngcontent-%COMP%], \n.tutor-box[_ngcontent-%COMP%] {\n  border: 1px solid #bdc7bc;\n  border-radius: 10px;\n  background: #f8f6ed;\n  overflow: hidden;\n}\n.task-box[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%], \n.tutor-box[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 17px 16px 13px;\n  list-style: none;\n  position: relative;\n}\n.task-box[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::after, \n.tutor-box[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::after {\n  content: "+";\n  position: absolute;\n  top: 10px;\n  right: 13px;\n  color: #637b6d;\n  font-size: 16px;\n}\ndetails[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::after {\n  content: "\\2212";\n}\nsummary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\nsummary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font: 700 9px/1.5 Arial, sans-serif;\n  letter-spacing: 0.12em;\n  color: #687b6c;\n  margin-bottom: 6px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 500 21px/1.2 Georgia, serif;\n  margin: 0;\n  color: #263e38;\n}\nh3[_ngcontent-%COMP%] {\n  font: 700 13px/1.4 Arial, sans-serif;\n  margin: 16px 0 7px;\n}\np[_ngcontent-%COMP%] {\n  margin: 8px 0 14px;\n}\n.task-content[_ngcontent-%COMP%], \n.tutor-content[_ngcontent-%COMP%] {\n  padding: 0 16px 13px;\n}\n.coordinates[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 1px 0 12px;\n  color: #788374;\n  font-size: 10px;\n}\n.coordinates[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 16px/1.4 Georgia, serif;\n  color: #826640;\n}\n.inside-detail[_ngcontent-%COMP%] {\n  border-top: 1px solid #d8ddcf;\n  margin-top: 10px;\n}\n.inside-detail[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  padding: 11px 0;\n  cursor: pointer;\n  font-size: 11px;\n  color: #446654;\n  list-style: none;\n}\n.inside-detail[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::before {\n  content: "\\203a";\n  margin-right: 8px;\n  color: #8c7348;\n}\n.inside-detail[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::before {\n  content: "\\2304";\n}\n.inside-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.inside-detail[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 17px;\n}\nli[_ngcontent-%COMP%]    + li[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.feedback[_ngcontent-%COMP%] {\n  border-left: 2px solid #b99257;\n  padding-left: 10px;\n  font-size: 12px;\n  color: #725f40;\n  margin: 10px 0;\n}\n.tutor-box[_ngcontent-%COMP%] {\n  background: #e4ebe2;\n  border-color: #b6c7b5;\n}\n.tutor-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n}\n.tutor-title[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 500 9px Arial, sans-serif;\n  padding: 5px 7px;\n  border: 1px solid #bdcab9;\n  border-radius: 9px;\n  color: #586b59;\n}\n.tutor-question[_ngcontent-%COMP%] {\n  font: 15px/1.5 Georgia, serif;\n  color: #3b5548;\n  margin-top: 4px;\n}\n.source[_ngcontent-%COMP%] {\n  margin: 5px 0 15px;\n}\n.source[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #315f54;\n  font-weight: 600;\n  font-size: 12px;\n}\n.source[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.time-jump[_ngcontent-%COMP%] {\n  min-height: 44px;\n  width: 100%;\n  padding: 8px;\n  background: #254b43;\n  color: #f2e6c9;\n  border: 1px solid #1b453b;\n  border-radius: 6px;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.time-jump[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  color: #748275;\n  background: #dfe4d8;\n  border-color: #bdc6b3;\n}\n.batch-note[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 10px;\n  color: #697b67;\n  margin-top: 7px;\n}\n.notebook[_ngcontent-%COMP%] {\n  min-height: 40px;\n  background: #f8f6ed;\n  border: 1px solid #9daa97;\n  border-radius: 5px;\n  padding: 7px 10px;\n  color: #37533f;\n  font: 11px Arial, sans-serif;\n  cursor: pointer;\n}\n@media (min-width: 951px) {\n  .mission-column[_ngcontent-%COMP%] {\n    max-height: max(580px, 100dvh - 102px);\n    overflow-y: auto;\n    overscroll-behavior: contain;\n  }\n  .task-box[_ngcontent-%COMP%], \n   .tutor-box[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n  }\n}\nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #167890;\n  outline-offset: 3px;\n}\n@media (min-width: 1600px) {\n  .invention-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 350px;\n  }\n  .mission-column[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n@media (max-width: 950px) {\n  .invention-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .activity-panel[_ngcontent-%COMP%] {\n    position: relative;\n    top: auto;\n    height: 620px;\n    border-right: 0;\n  }\n  .mission-column[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: stretch;\n    gap: 16px;\n  }\n  .task-box[_ngcontent-%COMP%] {\n    order: 0;\n  }\n  .tutor-box[_ngcontent-%COMP%] {\n    order: 1;\n  }\n}\n@media (max-width: 600px) {\n  .knowledge-panel[_ngcontent-%COMP%] {\n    overflow-x: auto;\n  }\n  .knowledge-panel[_ngcontent-%COMP%]   app-knowledge-host[_ngcontent-%COMP%] {\n    min-width: 660px;\n  }\n  .activity-panel[_ngcontent-%COMP%] {\n    height: 440px;\n  }\n  .mission-column[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .task-box[_ngcontent-%COMP%], \n   .tutor-box[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .invention-layout[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n}\n/*# sourceMappingURL=invention-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventionWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-invention-workspace", imports: [PressWorkbenchComponent, CourtyardSceneComponent, KnowledgeHostComponent], providers: [
      InventionRuntime,
      KnowledgeRuntime,
      {
        provide: KNOWLEDGE_PERSISTENCE,
        useFactory: () => new BrowserKnowledgePersistence(inject(INVENTION_CONTEXT))
      },
      {
        provide: INVENTION_PERSISTENCE,
        useFactory: () => new BrowserInventionPersistence(inject(INVENTION_PROJECT), inject(INVENTION_CONTEXT))
      }
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="invention-layout" [attr.data-week]="r.week()" [attr.data-lesson]="r.number()">
  <section
    class="activity-panel"
    [class.knowledge-panel]="k.active()"
    aria-label="Invention rescue activity"
  >
    @if (k.active()) {
      <app-knowledge-host />
    } @else if (r.scene() === 'courtyard') {
      <app-courtyard-scene />
    } @else {
      <app-press-workbench />
    }
  </section>
  <aside class="mission-column" aria-label="Weekly task and AI Tutor">
    <details class="task-box" open>
      <summary>
        <span
          >WEEK {{ r.week() }} \xB7
          {{ r.example ? 'EXAMPLE' : r.number() % 2 === 1 ? 'INDIVIDUAL' : 'GROUP' }}</span
        >
        <h2>{{ r.weekContent().title }}</h2>
      </summary>
      <div class="task-content">
        <p class="coordinates">
          {{ r.scene() === 'courtyard' ? 'Mainz \xB7 bookseller\u2019s courtyard' : r.session().location
          }}<b>{{ r.scene() === 'courtyard' ? 'c. 1460' : r.session().date }}</b>
        </p>
        <h3>{{ r.session().title }}</h3>
        <p>{{ r.session().task }}</p>
        @if (r.session().mode === 'return') {
          <button class="time-jump" (click)="r.travel()">
            {{ r.scene() === 'press' ? 'Return to 1460 \u2197' : 'Back to the workshop \u2199' }}
          </button>
          @if (r.scene() === 'press') {
            <p class="batch-note">
              {{ r.goodCount() }} / {{ r.session().batchSize }} clean impressions in a row
            </p>
          }
        }
        <details class="inside-detail">
          <summary>This week\u2019s goal & work</summary>
          <p>{{ r.weekContent().goal }}</p>
          <ul>
            @for (s of r.content.sessions; track s.id) {
              @if (s.number === r.week() * 2 - 1 || s.number === r.week() * 2) {
                <li>
                  <strong>Session {{ s.number }}</strong> \xB7 {{ s.product }}
                </li>
              }
            }
          </ul>
        </details>
        <p class="feedback" role="status" aria-live="polite">
          {{
            (k.active() ? k.message() : r.message()) ||
              (r.example
                ? 'Example batch prepared. This does not alter your session work.'
                : 'Operate the objects. Your observations will appear here.')
          }}
        </p>
        <details class="inside-detail">
          <summary>Trial notebook & local save</summary>
          <p>
            {{
              (k.active() ? k.storageMessage() : r.storageMessage()) ||
                'Local model practice. No grades or shared changes are recorded.'
            }}
          </p>
          @if (k.active()) {
            <p>{{ k.state().trials.length }} recorded investigations</p>
            <button class="notebook" (click)="k.export()">Download notebook</button>
            <button class="notebook" (click)="k.reset()">Reset this activity</button>
          } @else {
            <p>
              {{ r.state().trials.length }} proofs \xB7 {{ r.state().samples.length }} material tests
            </p>
            <button class="notebook" (click)="r.exportNotebook()">Download notebook</button>
          }
        </details>
      </div>
    </details>
    <details class="tutor-box" open>
      <summary>
        <span>YOUR THINKING SPACE</span>
        <div class="tutor-title">
          <h2>AI Tutor</h2>
          <b>Not connected</b>
        </div>
      </summary>
      <div class="tutor-content">
        <p class="tutor-question">{{ r.session().question }}</p>
        <details class="inside-detail">
          <summary>The history behind this scene</summary>
          <p>{{ r.session().historicalNote }}</p>
          <p>{{ r.content.fiction }}</p>
          <p>{{ r.content.modelNote }}</p>
        </details>
        <details class="inside-detail">
          <summary>Sources to investigate</summary>
          @for (source of r.sourceIds(); track source.id) {
            <div class="source">
              <a [href]="source.url" target="_blank" rel="noopener noreferrer"
                >{{ source.title }} \u2197</a
              >
              <p>{{ source.detail }}</p>
            </div>
          }
        </details>
        <details class="inside-detail">
          <summary>Evidence the tutor will check</summary>
          <ul>
            @for (item of r.weekContent().evidence; track $index) {
              <li>{{ item }}</li>
            }
          </ul>
        </details>
        <details class="inside-detail">
          <summary>Planned tutor controls</summary>
          <p>
            Compare your trials, prompt a one-variable test, introduce a fresh mechanical fault, and
            review your historical explanation. These controls and assessment are not connected.
          </p>
        </details>
      </div>
    </details>
  </aside>
</main>
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/time-repair/invention/invention-workspace.component.scss */\n:host {\n  display: block;\n  color: #293f3b;\n  background: #e7e8df;\n  font: 13px/1.55 Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.invention-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 306px;\n  gap: 0;\n  min-height: calc(100dvh - 102px);\n}\n.activity-panel {\n  min-width: 0;\n  height: max(580px, 100dvh - 102px);\n  position: sticky;\n  top: 68px;\n  overflow: hidden;\n  border-right: 1px solid #8c917d;\n}\n.mission-column {\n  padding: 19px 17px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: #edeee6;\n  min-width: 0;\n}\n.task-box,\n.tutor-box {\n  border: 1px solid #bdc7bc;\n  border-radius: 10px;\n  background: #f8f6ed;\n  overflow: hidden;\n}\n.task-box > summary,\n.tutor-box > summary {\n  cursor: pointer;\n  padding: 17px 16px 13px;\n  list-style: none;\n  position: relative;\n}\n.task-box > summary::after,\n.tutor-box > summary::after {\n  content: "+";\n  position: absolute;\n  top: 10px;\n  right: 13px;\n  color: #637b6d;\n  font-size: 16px;\n}\ndetails[open] > summary::after {\n  content: "\\2212";\n}\nsummary::-webkit-details-marker {\n  display: none;\n}\nsummary > span {\n  display: block;\n  font: 700 9px/1.5 Arial, sans-serif;\n  letter-spacing: 0.12em;\n  color: #687b6c;\n  margin-bottom: 6px;\n}\nh2 {\n  font: 500 21px/1.2 Georgia, serif;\n  margin: 0;\n  color: #263e38;\n}\nh3 {\n  font: 700 13px/1.4 Arial, sans-serif;\n  margin: 16px 0 7px;\n}\np {\n  margin: 8px 0 14px;\n}\n.task-content,\n.tutor-content {\n  padding: 0 16px 13px;\n}\n.coordinates {\n  display: flex;\n  flex-direction: column;\n  margin: 1px 0 12px;\n  color: #788374;\n  font-size: 10px;\n}\n.coordinates b {\n  font: 16px/1.4 Georgia, serif;\n  color: #826640;\n}\n.inside-detail {\n  border-top: 1px solid #d8ddcf;\n  margin-top: 10px;\n}\n.inside-detail > summary {\n  padding: 11px 0;\n  cursor: pointer;\n  font-size: 11px;\n  color: #446654;\n  list-style: none;\n}\n.inside-detail > summary::before {\n  content: "\\203a";\n  margin-right: 8px;\n  color: #8c7348;\n}\n.inside-detail[open] > summary::before {\n  content: "\\2304";\n}\n.inside-detail p,\n.inside-detail li {\n  font-size: 12px;\n  line-height: 1.6;\n}\nul {\n  padding-left: 17px;\n}\nli + li {\n  margin-top: 8px;\n}\n.feedback {\n  border-left: 2px solid #b99257;\n  padding-left: 10px;\n  font-size: 12px;\n  color: #725f40;\n  margin: 10px 0;\n}\n.tutor-box {\n  background: #e4ebe2;\n  border-color: #b6c7b5;\n}\n.tutor-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n}\n.tutor-title b {\n  font: 500 9px Arial, sans-serif;\n  padding: 5px 7px;\n  border: 1px solid #bdcab9;\n  border-radius: 9px;\n  color: #586b59;\n}\n.tutor-question {\n  font: 15px/1.5 Georgia, serif;\n  color: #3b5548;\n  margin-top: 4px;\n}\n.source {\n  margin: 5px 0 15px;\n}\n.source a {\n  color: #315f54;\n  font-weight: 600;\n  font-size: 12px;\n}\n.source p {\n  font-size: 11px;\n}\n.time-jump {\n  min-height: 44px;\n  width: 100%;\n  padding: 8px;\n  background: #254b43;\n  color: #f2e6c9;\n  border: 1px solid #1b453b;\n  border-radius: 6px;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.time-jump:disabled {\n  cursor: default;\n  color: #748275;\n  background: #dfe4d8;\n  border-color: #bdc6b3;\n}\n.batch-note {\n  text-align: center;\n  font-size: 10px;\n  color: #697b67;\n  margin-top: 7px;\n}\n.notebook {\n  min-height: 40px;\n  background: #f8f6ed;\n  border: 1px solid #9daa97;\n  border-radius: 5px;\n  padding: 7px 10px;\n  color: #37533f;\n  font: 11px Arial, sans-serif;\n  cursor: pointer;\n}\n@media (min-width: 951px) {\n  .mission-column {\n    max-height: max(580px, 100dvh - 102px);\n    overflow-y: auto;\n    overscroll-behavior: contain;\n  }\n  .task-box,\n  .tutor-box {\n    flex: 0 0 auto;\n  }\n}\nsummary:focus-visible,\na:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #167890;\n  outline-offset: 3px;\n}\n@media (min-width: 1600px) {\n  .invention-layout {\n    grid-template-columns: minmax(0, 1fr) 350px;\n  }\n  .mission-column {\n    padding: 24px;\n  }\n}\n@media (max-width: 950px) {\n  .invention-layout {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .activity-panel {\n    position: relative;\n    top: auto;\n    height: 620px;\n    border-right: 0;\n  }\n  .mission-column {\n    display: flex;\n    align-items: stretch;\n    gap: 16px;\n  }\n  .task-box {\n    order: 0;\n  }\n  .tutor-box {\n    order: 1;\n  }\n}\n@media (max-width: 600px) {\n  .knowledge-panel {\n    overflow-x: auto;\n  }\n  .knowledge-panel app-knowledge-host {\n    min-width: 660px;\n  }\n  .activity-panel {\n    height: 440px;\n  }\n  .mission-column {\n    padding: 14px;\n  }\n  .task-box,\n  .tutor-box {\n    width: 100%;\n  }\n  .invention-layout {\n    min-height: auto;\n  }\n}\n/*# sourceMappingURL=invention-workspace.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InventionWorkspaceComponent, { className: "InventionWorkspaceComponent", filePath: "src/app/templates/time-repair/invention/invention-workspace.component.ts", lineNumber: 36 });
})();
export {
  InventionWorkspaceComponent
};
//# debugId=a2c829ad-9443-54af-afd4-3b15286c64e1
//# sourceMappingURL=chunk-RXOBA23M.js.map
