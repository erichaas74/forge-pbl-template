import {
  InquiryExampleComponent
} from "./chunk-QC3X7FWS.js";
import {
  Component,
  InjectionToken,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/shared/inquiry/inquiry-example-page.component.ts
var INQUIRY_EXAMPLE_PRESENTATION = new InjectionToken("INQUIRY_EXAMPLE_PRESENTATION");
var InquiryExamplePageComponent = class _InquiryExamplePageComponent {
  presentation = inject(INQUIRY_EXAMPLE_PRESENTATION);
  static \u0275fac = function InquiryExamplePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InquiryExamplePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InquiryExamplePageComponent, selectors: [["app-inquiry-example-page"]], decls: 4, vars: 3, consts: [[3, "example", "sources"]], template: function InquiryExamplePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main")(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-inquiry-example", 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.presentation.projectTitle, " \xB7 Final example");
      \u0275\u0275advance();
      \u0275\u0275property("example", ctx.presentation.example)("sources", ctx.presentation.sources);
    }
  }, dependencies: [InquiryExampleComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  background: #f4f5ef;\n  min-height: 100vh;\n}\nmain[_ngcontent-%COMP%] {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: clamp(16px, 3vw, 40px);\n}\nh1[_ngcontent-%COMP%] {\n  color: #153b43;\n  font: 600 clamp(24px, 3vw, 36px)/1.3 Georgia, serif;\n  margin: 0;\n}\n/*# sourceMappingURL=inquiry-example-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InquiryExamplePageComponent, [{
    type: Component,
    args: [{ selector: "app-inquiry-example-page", imports: [InquiryExampleComponent], template: `
    <main>
      <h1>{{ presentation.projectTitle }} \xB7 Final example</h1>
      <app-inquiry-example [example]="presentation.example" [sources]="presentation.sources" />
    </main>
  `, styles: ["/* angular:styles/component:scss;25e3fe47f030a0d56111c7eb02976f7f5054c3b09eab58ff9af1c785c28e93ee;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/inquiry/inquiry-example-page.component.ts */\n:host {\n  display: block;\n  background: #f4f5ef;\n  min-height: 100vh;\n}\nmain {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: clamp(16px, 3vw, 40px);\n}\nh1 {\n  color: #153b43;\n  font: 600 clamp(24px, 3vw, 36px)/1.3 Georgia, serif;\n  margin: 0;\n}\n/*# sourceMappingURL=inquiry-example-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InquiryExamplePageComponent, { className: "InquiryExamplePageComponent", filePath: "src/app/shared/inquiry/inquiry-example-page.component.ts", lineNumber: 41 });
})();
export {
  INQUIRY_EXAMPLE_PRESENTATION,
  InquiryExamplePageComponent
};
//# debugId=dd615b51-ae07-547c-aef4-1d198546d2b5
//# sourceMappingURL=chunk-S32AJKBT.js.map
