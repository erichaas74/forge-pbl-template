import {
  Component,
  HostListener,
  Input,
  ViewChild,
  input,
  setClassMetadata,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryAdvance,
  ɵɵresolveDocument,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/shared/project-lessons/workspace-tools.component.ts
var _c0 = ["menu"];
var _c1 = ["*"];
function WorkspaceToolsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var WorkspaceToolsComponent = class _WorkspaceToolsComponent {
  error = input(
    ...ngDevMode ? [void 0, { debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  menu = viewChild.required(
    "menu",
    ...ngDevMode ? [{ debugName: "menu" }] : (
      /* istanbul ignore next */
      []
    )
  );
  close(refocus = false) {
    const menu = this.menu().nativeElement;
    menu.open = false;
    if (refocus)
      menu.querySelector("summary")?.focus();
  }
  onAction(event) {
    if (event.target instanceof Element && event.target.closest("a"))
      this.close();
  }
  onEscape(event) {
    if (event.target instanceof Element && event.target.closest("dialog"))
      return;
    this.close(true);
  }
  onOutsideClick(event) {
    const menu = this.menu().nativeElement;
    if (event.target instanceof Node && !menu.contains(event.target) && !menu.querySelector("dialog[open]"))
      this.close();
  }
  static \u0275fac = function WorkspaceToolsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkspaceToolsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkspaceToolsComponent, selectors: [["app-workspace-tools"]], viewQuery: function WorkspaceToolsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.menu, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function WorkspaceToolsComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function WorkspaceToolsComponent_click_HostBindingHandler($event) {
        return ctx.onOutsideClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { error: [1, "error"] }, ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["menu", ""], [3, "keydown.escape"], ["aria-label", "Activity tools", "title", "Activity tools"], [1, "workspace-tools-panel", 3, "click"], ["role", "alert", 1, "save-error"]], template: function WorkspaceToolsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "details", 1, 0);
      \u0275\u0275domListener("keydown.escape", function WorkspaceToolsComponent_Template_details_keydown_escape_0_listener($event) {
        return ctx.onEscape($event);
      });
      \u0275\u0275domElementStart(2, "summary", 2);
      \u0275\u0275text(3, "\u2022\u2022\u2022");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 3);
      \u0275\u0275domListener("click", function WorkspaceToolsComponent_Template_div_click_4_listener($event) {
        return ctx.onAction($event);
      });
      \u0275\u0275projection(5);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(6, WorkspaceToolsComponent_Conditional_6_Template, 2, 1, "p", 4);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.error() ? 6 : -1);
    }
  }, styles: ["\n.save-error[_ngcontent-%COMP%] {\n  max-width: 280px;\n  padding: 12px;\n  background: #742c24;\n  color: #fff;\n  border-radius: 8px;\n}\n[_nghost-%COMP%] {\n  position: fixed;\n  top: calc(var(--%NS%project-navigation-height, 0px) + 12px);\n  right: 12px;\n  z-index: 90;\n}\nsummary[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border: 1px solid rgba(138, 166, 175, 0.5019607843);\n  border-radius: 50%;\n  color: #f3f9fa;\n  background: rgba(16, 43, 53, 0.9333333333);\n  cursor: pointer;\n  list-style: none;\n}\nsummary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #76e8d5;\n  outline-offset: 3px;\n}\n.workspace-tools-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 52px;\n  width: min(540px, 100vw - 24px);\n  max-height: calc(100dvh - var(--%NS%project-navigation-height, 0px) - 116px);\n  overflow: auto;\n  padding: 16px;\n  border-radius: 12px;\n  border: 1px solid #607b86;\n  color: #f3f9fa;\n  background: rgba(16, 35, 44, 0.9607843137);\n  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.5333333333);\n}\n/*# sourceMappingURL=workspace-tools.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkspaceToolsComponent, [{
    type: Component,
    args: [{ selector: "app-workspace-tools", template: `
    <details #menu (keydown.escape)="onEscape($event)">
      <summary aria-label="Activity tools" title="Activity tools">\u2022\u2022\u2022</summary>
      <div class="workspace-tools-panel" (click)="onAction($event)"><ng-content /></div>
    </details>
    @if (error()) {
      <p class="save-error" role="alert">{{ error() }}</p>
    }
  `, styles: ["/* angular:styles/component:scss;a197d5f779af349c361f171eea4ba944ecba5105c2363e7e96567baf0c396417;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/project-lessons/workspace-tools.component.ts */\n.save-error {\n  max-width: 280px;\n  padding: 12px;\n  background: #742c24;\n  color: #fff;\n  border-radius: 8px;\n}\n:host {\n  position: fixed;\n  top: calc(var(--project-navigation-height, 0px) + 12px);\n  right: 12px;\n  z-index: 90;\n}\nsummary {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border: 1px solid rgba(138, 166, 175, 0.5019607843);\n  border-radius: 50%;\n  color: #f3f9fa;\n  background: rgba(16, 43, 53, 0.9333333333);\n  cursor: pointer;\n  list-style: none;\n}\nsummary::-webkit-details-marker {\n  display: none;\n}\nsummary:focus-visible {\n  outline: 3px solid #76e8d5;\n  outline-offset: 3px;\n}\n.workspace-tools-panel {\n  position: absolute;\n  right: 0;\n  top: 52px;\n  width: min(540px, 100vw - 24px);\n  max-height: calc(100dvh - var(--project-navigation-height, 0px) - 116px);\n  overflow: auto;\n  padding: 16px;\n  border-radius: 12px;\n  border: 1px solid #607b86;\n  color: #f3f9fa;\n  background: rgba(16, 35, 44, 0.9607843137);\n  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.5333333333);\n}\n/*# sourceMappingURL=workspace-tools.component.css.map */\n"] }]
  }], null, { error: [{ type: Input, args: [{ isSignal: true, alias: "error", required: false }] }], menu: [{ type: ViewChild, args: ["menu", { isSignal: true }] }], onOutsideClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkspaceToolsComponent, { className: "WorkspaceToolsComponent", filePath: "src/app/shared/project-lessons/workspace-tools.component.ts", lineNumber: 64 });
})();

export {
  WorkspaceToolsComponent
};
//# debugId=37575c6b-55f7-5697-a613-6d9ee0f19423
//# sourceMappingURL=chunk-NDJR5R7S.js.map
