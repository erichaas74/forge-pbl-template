import {
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E2VJWGUE.js";

// src/app/shared/learning/task-guide.component.ts
var _c0 = ["*"];
var TaskGuideComponent = class _TaskGuideComponent {
  title = input(
    "A little help",
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function TaskGuideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaskGuideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskGuideComponent, selectors: [["app-task-guide"]], inputs: { title: [1, "title"] }, ngContentSelectors: _c0, decls: 13, vars: 1, consts: [["guide", ""], ["type", "button", 1, "guide-trigger", 3, "click"], ["aria-label", "Task guide", 3, "click"], ["type", "button", "aria-label", "Close guide", 3, "click"], [1, "guide-content"], ["type", "button", 1, "return-button", 3, "click"]], template: function TaskGuideComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "button", 1);
      \u0275\u0275domListener("click", function TaskGuideComponent_Template_button_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        const guide_r2 = \u0275\u0275reference(3);
        return \u0275\u0275resetView(guide_r2.showModal());
      });
      \u0275\u0275text(1, "? Guide");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "dialog", 2, 0);
      \u0275\u0275domListener("click", function TaskGuideComponent_Template_dialog_click_2_listener($event) {
        \u0275\u0275restoreView(_r1);
        const guide_r2 = \u0275\u0275reference(3);
        return \u0275\u0275resetView($event.target === guide_r2 && guide_r2.close());
      });
      \u0275\u0275domElementStart(4, "header")(5, "h2");
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "button", 3);
      \u0275\u0275domListener("click", function TaskGuideComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        const guide_r2 = \u0275\u0275reference(3);
        return \u0275\u0275resetView(guide_r2.close());
      });
      \u0275\u0275text(8, "\xD7");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 4);
      \u0275\u0275projection(10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "button", 5);
      \u0275\u0275domListener("click", function TaskGuideComponent_Template_button_click_11_listener() {
        \u0275\u0275restoreView(_r1);
        const guide_r2 = \u0275\u0275reference(3);
        return \u0275\u0275resetView(guide_r2.close());
      });
      \u0275\u0275text(12, "Back to my work");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.title());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: inline-block;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n  min-height: 44px;\n  border: 1px solid currentColor;\n  border-radius: 8px;\n  padding: 8px 14px;\n  color: inherit;\n  background: transparent;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #1585b5;\n  outline-offset: 3px;\n}\ndialog[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: min(560px, 100vw - 32px);\n  max-height: 85dvh;\n  padding: 24px;\n  border: 1px solid #bac9c7;\n  border-radius: 16px;\n  color: #193c43;\n  background: #fffdf6;\n  box-shadow: 0 24px 90px rgba(0, 26, 51, 0.3137254902);\n  font: 16px/1.6 Arial, sans-serif;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(7, 30, 53, 0.6509803922);\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin: 0;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.guide-content[_ngcontent-%COMP%] {\n  margin: 20px 0;\n}\n.return-button[_ngcontent-%COMP%] {\n  color: white;\n  background: #165b60;\n  border-color: #165b60;\n}\n/*# sourceMappingURL=task-guide.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaskGuideComponent, [{
    type: Component,
    args: [{ selector: "app-task-guide", template: `
    <button class="guide-trigger" type="button" (click)="guide.showModal()">? Guide</button>
    <dialog #guide aria-label="Task guide" (click)="$event.target === guide && guide.close()">
      <header>
        <h2>{{ title() }}</h2>
        <button type="button" (click)="guide.close()" aria-label="Close guide">\xD7</button>
      </header>
      <div class="guide-content"><ng-content /></div>
      <button class="return-button" type="button" (click)="guide.close()">Back to my work</button>
    </dialog>
  `, styles: ["/* angular:styles/component:scss;ff45eaef66e85a3d8c7ddc4dc11ae24449581bfbf02de493bb107b2f787ae08f;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/learning/task-guide.component.ts */\n:host {\n  display: inline-block;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n  min-height: 44px;\n  border: 1px solid currentColor;\n  border-radius: 8px;\n  padding: 8px 14px;\n  color: inherit;\n  background: transparent;\n}\nbutton:focus-visible {\n  outline: 3px solid #1585b5;\n  outline-offset: 3px;\n}\ndialog {\n  box-sizing: border-box;\n  width: min(560px, 100vw - 32px);\n  max-height: 85dvh;\n  padding: 24px;\n  border: 1px solid #bac9c7;\n  border-radius: 16px;\n  color: #193c43;\n  background: #fffdf6;\n  box-shadow: 0 24px 90px rgba(0, 26, 51, 0.3137254902);\n  font: 16px/1.6 Arial, sans-serif;\n}\ndialog::backdrop {\n  background: rgba(7, 30, 53, 0.6509803922);\n}\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\nh2 {\n  font-size: 22px;\n  margin: 0;\n}\nheader button {\n  font-size: 24px;\n}\n.guide-content {\n  margin: 20px 0;\n}\n.return-button {\n  color: white;\n  background: #165b60;\n  border-color: #165b60;\n}\n/*# sourceMappingURL=task-guide.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskGuideComponent, { className: "TaskGuideComponent", filePath: "src/app/shared/learning/task-guide.component.ts", lineNumber: 75 });
})();

export {
  TaskGuideComponent
};
//# debugId=20669542-557f-5d21-92b6-89fe817f4bb8
//# sourceMappingURL=chunk-FBZ4EUOY.js.map
