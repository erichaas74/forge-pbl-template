import {
  isExhibitObjectModel
} from "./chunk-MNKXLJET.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  InjectionToken,
  Input,
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/shared/media/object-model-viewer.component.ts
var _c0 = ["viewer"];
function ObjectModelViewerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "model-viewer", 8, 0);
    \u0275\u0275domListener("load", function ObjectModelViewerComponent_Conditional_1_Template_model_viewer_load_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loaded());
    })("error", function ObjectModelViewerComponent_Conditional_1_Template_model_viewer_error_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.failed.set(true));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("src", ctx_r1.model.src)("alt", ctx_r1.model.alt)("camera-orbit", ctx_r1.initialOrbit());
  }
}
function ObjectModelViewerComponent_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", (ctx_r1.model.sizeBytes / 1e6).toFixed(1), " MB");
  }
}
function ObjectModelViewerComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("click", function ObjectModelViewerComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275domElementStart(1, "span", 10);
    \u0275\u0275text(2, "360\xB0");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, "Load 3D object ");
    \u0275\u0275conditionalCreate(4, ObjectModelViewerComponent_Conditional_2_Conditional_4_Template, 2, 1, "small");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.model.sizeBytes ? 4 : -1);
  }
}
function ObjectModelViewerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1, "Loading 3D object\u2026");
    \u0275\u0275domElementEnd();
  }
}
function ObjectModelViewerComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 5)(1, "p");
    \u0275\u0275text(2, "The 3D object could not load. Its description is available below.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 11);
    \u0275\u0275domListener("click", function ObjectModelViewerComponent_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(4, "Try again");
    \u0275\u0275domElementEnd()();
  }
}
function ObjectModelViewerComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "nav", 12)(1, "button", 13);
    \u0275\u0275domListener("click", function ObjectModelViewerComponent_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.rotate(-30));
    });
    \u0275\u0275text(2, "\u21B6 Left");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 14);
    \u0275\u0275domListener("click", function ObjectModelViewerComponent_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.rotate(30));
    });
    \u0275\u0275text(4, "Right \u21B7");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 11);
    \u0275\u0275domListener("click", function ObjectModelViewerComponent_Conditional_5_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(6, "Reset view");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "p", 15);
    \u0275\u0275text(8, "Drag or use arrow keys to rotate. Pinch or scroll to zoom.");
    \u0275\u0275domElementEnd();
  }
}
var LOAD_OBJECT_MODEL_VIEWER = new InjectionToken("LOAD_OBJECT_MODEL_VIEWER", {
  providedIn: "root",
  factory: () => () => import("./chunk-5CGJ7T7B.js")
});
var ObjectModelViewerComponent = class _ObjectModelViewerComponent {
  autoLoad = false;
  model;
  active = signal(
    false,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failed = signal(
    false,
    ...ngDevMode ? [{ debugName: "failed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadViewer = inject(LOAD_OBJECT_MODEL_VIEWER);
  viewer = viewChild(
    "viewer",
    ...ngDevMode ? [{ debugName: "viewer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  generation = 0;
  ngOnChanges() {
    this.generation++;
    this.active.set(false);
    this.loading.set(false);
    this.failed.set(false);
    if (this.autoLoad)
      void this.load();
  }
  async load() {
    const generation = ++this.generation;
    this.active.set(false);
    this.failed.set(false);
    this.loading.set(true);
    try {
      if (!isExhibitObjectModel(this.model))
        throw new Error("Invalid model");
      await this.loadViewer();
      if (generation === this.generation)
        this.active.set(true);
    } catch {
      if (generation === this.generation) {
        this.failed.set(true);
        this.loading.set(false);
      }
    }
  }
  loaded() {
    this.loading.set(false);
    if (!this.autoLoad)
      this.viewer()?.nativeElement.focus({ preventScroll: true });
  }
  rotate(degrees) {
    const viewer = this.viewer()?.nativeElement;
    if (!viewer)
      return;
    const orbit = viewer.getCameraOrbit();
    viewer.cameraOrbit = `${orbit.theta + degrees * Math.PI / 180}rad ${orbit.phi}rad ${orbit.radius}m`;
  }
  initialOrbit() {
    const view = this.model.initialView;
    return view ? `${view.azimuthDegrees}deg ${view.elevationDegrees}deg ${view.distancePercent}%` : "0deg 75deg 105%";
  }
  reset() {
    const viewer = this.viewer()?.nativeElement;
    if (viewer)
      viewer.cameraOrbit = this.initialOrbit();
  }
  static \u0275fac = function ObjectModelViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ObjectModelViewerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ObjectModelViewerComponent, selectors: [["app-object-model-viewer"]], viewQuery: function ObjectModelViewerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.viewer, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { autoLoad: "autoLoad", model: "model" }, features: [\u0275\u0275NgOnChangesFeature], decls: 10, vars: 8, consts: [["viewer", ""], [1, "viewer"], ["camera-controls", "", "touch-action", "pan-y", "interaction-prompt", "none", "shadow-intensity", "0.8"], ["type", "button", 1, "load"], ["role", "status", 1, "status"], ["role", "status", 1, "error"], [1, "credit"], ["target", "_blank", "rel", "noreferrer", 3, "href"], ["camera-controls", "", "touch-action", "pan-y", "interaction-prompt", "none", "shadow-intensity", "0.8", 3, "load", "error"], ["type", "button", 1, "load", 3, "click"], ["aria-hidden", "true"], ["type", "button", 3, "click"], ["aria-label", "3D object controls"], ["type", "button", "aria-label", "Rotate object left", 3, "click"], ["type", "button", "aria-label", "Rotate object right", 3, "click"], [1, "help"]], template: function ObjectModelViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, ObjectModelViewerComponent_Conditional_1_Template, 2, 3, "model-viewer", 2);
      \u0275\u0275conditionalCreate(2, ObjectModelViewerComponent_Conditional_2_Template, 5, 1, "button", 3);
      \u0275\u0275conditionalCreate(3, ObjectModelViewerComponent_Conditional_3_Template, 2, 0, "p", 4);
      \u0275\u0275conditionalCreate(4, ObjectModelViewerComponent_Conditional_4_Template, 5, 0, "div", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, ObjectModelViewerComponent_Conditional_5_Template, 9, 0);
      \u0275\u0275domElementStart(6, "p", 6)(7, "a", 7);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.active() && !ctx.failed() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.active() && !ctx.loading() && !ctx.failed() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() && !ctx.failed() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.failed() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.active() && !ctx.loading() && !ctx.failed() ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("href", ctx.model.sourceUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.model.credit);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" \xB7 ", ctx.model.license, " ");
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  color: inherit;\n}\n.viewer[_ngcontent-%COMP%] {\n  color: #f5ecdd;\n  position: relative;\n  display: grid;\n  place-items: center;\n  min-height: 260px;\n  background:\n    radial-gradient(\n      ellipse at 50% 35%,\n      #65736a,\n      #243632 75%);\n}\nmodel-viewer[_ngcontent-%COMP%] {\n  width: 100%;\n  height: var(--%NS%model-height, clamp(260px, 42vw, 460px));\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font: inherit;\n  color: #223b36;\n  background: #f4e9d3;\n  border: 1px solid #baa57a;\n  border-radius: 5px;\n  min-height: 44px;\n  padding: 9px 13px;\n}\n.load[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 10px;\n  padding: 20px 28px;\n}\n.load[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-family: Georgia, serif;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.status[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  padding: 10px;\n  background: #243632;\n}\n.error[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n  line-height: 1.6;\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 12px 8px 4px;\n}\n.help[_ngcontent-%COMP%], \n.credit[_ngcontent-%COMP%] {\n  font: 12px/1.5 system-ui;\n  text-align: center;\n  margin: 8px;\n}\na[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: underline;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f0c675;\n  outline-offset: 3px;\n}\n/*# sourceMappingURL=object-model-viewer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ObjectModelViewerComponent, [{
    type: Component,
    args: [{ selector: "app-object-model-viewer", schemas: [CUSTOM_ELEMENTS_SCHEMA], template: `
    <div class="viewer">
      @if (active() && !failed()) {
        <model-viewer
          #viewer
          [attr.src]="model.src"
          [attr.alt]="model.alt"
          camera-controls
          touch-action="pan-y"
          interaction-prompt="none"
          shadow-intensity="0.8"
          [attr.camera-orbit]="initialOrbit()"
          (load)="loaded()"
          (error)="failed.set(true)"
        />
      }
      @if (!active() && !loading() && !failed()) {
        <button class="load" type="button" (click)="load()">
          <span aria-hidden="true">360\xB0</span>Load 3D object
          @if (model.sizeBytes) {
            <small>{{ (model.sizeBytes / 1000000).toFixed(1) }} MB</small>
          }
        </button>
      }
      @if (loading() && !failed()) {
        <p class="status" role="status">Loading 3D object\u2026</p>
      }
      @if (failed()) {
        <div class="error" role="status">
          <p>The 3D object could not load. Its description is available below.</p>
          <button type="button" (click)="load()">Try again</button>
        </div>
      }
    </div>
    @if (active() && !loading() && !failed()) {
      <nav aria-label="3D object controls">
        <button type="button" (click)="rotate(-30)" aria-label="Rotate object left">\u21B6 Left</button>
        <button type="button" (click)="rotate(30)" aria-label="Rotate object right">Right \u21B7</button>
        <button type="button" (click)="reset()">Reset view</button>
      </nav>
      <p class="help">Drag or use arrow keys to rotate. Pinch or scroll to zoom.</p>
    }
    <p class="credit">
      <a [href]="model.sourceUrl" target="_blank" rel="noreferrer">{{ model.credit }}</a> \xB7
      {{ model.license }}
    </p>
  `, styles: ["/* angular:styles/component:scss;b0462e63c58f16b632daf24d3b9ac6379aa6d3924482f351fd8ab095c5f046c7;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/media/object-model-viewer.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  color: inherit;\n}\n.viewer {\n  color: #f5ecdd;\n  position: relative;\n  display: grid;\n  place-items: center;\n  min-height: 260px;\n  background:\n    radial-gradient(\n      ellipse at 50% 35%,\n      #65736a,\n      #243632 75%);\n}\nmodel-viewer {\n  width: 100%;\n  height: var(--model-height, clamp(260px, 42vw, 460px));\n}\nbutton {\n  cursor: pointer;\n  font: inherit;\n  color: #223b36;\n  background: #f4e9d3;\n  border: 1px solid #baa57a;\n  border-radius: 5px;\n  min-height: 44px;\n  padding: 9px 13px;\n}\n.load {\n  display: grid;\n  justify-items: center;\n  gap: 10px;\n  padding: 20px 28px;\n}\n.load span {\n  font-size: 2rem;\n  font-family: Georgia, serif;\n}\nsmall {\n  font-size: 0.75rem;\n}\n.status {\n  position: absolute;\n  bottom: 12px;\n  padding: 10px;\n  background: #243632;\n}\n.error {\n  text-align: center;\n  padding: 20px;\n  line-height: 1.6;\n}\nnav {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 12px 8px 4px;\n}\n.help,\n.credit {\n  font: 12px/1.5 system-ui;\n  text-align: center;\n  margin: 8px;\n}\na {\n  color: inherit;\n  text-decoration: underline;\n}\nbutton:focus-visible,\na:focus-visible {\n  outline: 3px solid #f0c675;\n  outline-offset: 3px;\n}\n/*# sourceMappingURL=object-model-viewer.component.css.map */\n"] }]
  }], null, { autoLoad: [{
    type: Input
  }], model: [{
    type: Input,
    args: [{ required: true }]
  }], viewer: [{ type: ViewChild, args: ["viewer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ObjectModelViewerComponent, { className: "ObjectModelViewerComponent", filePath: "src/app/shared/media/object-model-viewer.component.ts", lineNumber: 148 });
})();

export {
  ObjectModelViewerComponent
};
//# debugId=1a8634b2-1cbc-5854-969d-e0692d3c0dab
//# sourceMappingURL=chunk-ICIU3PCK.js.map
