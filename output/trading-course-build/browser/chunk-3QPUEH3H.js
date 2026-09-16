import {
  EXHIBIT_RENDERER_COMPONENTS,
  MuseumRoomPresentationComponent,
  MuseumSceneComponent,
  isMuseumBoardSnapshotData
} from "./chunk-NP2TX5O3.js";
import {
  ObjectModelViewerComponent
} from "./chunk-ICIU3PCK.js";
import {
  NgComponentOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Input,
  Output,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";

// src/app/templates/exhibit-hall/ui/exhibit-render-host.component.ts
function ExhibitRenderHostComponent_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ExhibitRenderHostComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ExhibitRenderHostComponent_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngComponentOutlet", ctx)("ngComponentOutletInputs", ctx_r0.rendererInputs());
  }
}
function ExhibitRenderHostComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275text(1, " This exhibit needs a renderer that is not installed. ");
    \u0275\u0275elementEnd();
  }
}
var ExhibitRenderHostComponent = class _ExhibitRenderHostComponent {
  registrations = inject(EXHIBIT_RENDERER_COMPONENTS);
  snapshot = input.required(
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = input(
    "thumbnail",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  renderer = computed(
    () => this.registrations.find((registration) => registration.rendererType === this.snapshot().rendererType)?.component,
    ...ngDevMode ? [{ debugName: "renderer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rendererInputs = computed(
    () => ({
      data: this.snapshot().visitorSafeData,
      mode: this.mode()
    }),
    ...ngDevMode ? [{ debugName: "rendererInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ExhibitRenderHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExhibitRenderHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExhibitRenderHostComponent, selectors: [["app-exhibit-render-host"]], inputs: { snapshot: [1, "snapshot"], mode: [1, "mode"] }, decls: 2, vars: 1, consts: [["role", "alert", 1, "missing-renderer"], [4, "ngComponentOutlet", "ngComponentOutletInputs"]], template: function ExhibitRenderHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ExhibitRenderHostComponent_Conditional_0_Template, 1, 2, "ng-container")(1, ExhibitRenderHostComponent_Conditional_1_Template, 2, 0, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.renderer()) ? 0 : 1, tmp_0_0);
    }
  }, dependencies: [NgComponentOutlet], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.missing-renderer[_ngcontent-%COMP%] {\n  border: 1px solid #b85c51;\n  padding: 1rem;\n  color: #742b22;\n  background: #ffe5df;\n}\n/*# sourceMappingURL=exhibit-render-host.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExhibitRenderHostComponent, [{
    type: Component,
    args: [{ selector: "app-exhibit-render-host", imports: [NgComponentOutlet], template: `
    @if (renderer(); as rendererComponent) {
      <ng-container *ngComponentOutlet="rendererComponent; inputs: rendererInputs()" />
    } @else {
      <div class="missing-renderer" role="alert">
        This exhibit needs a renderer that is not installed.
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;e73879b0e2d16446b0796e5418a0552ea06d0c1f93b288d0a7571addc1a9845c;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/exhibit-render-host.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.missing-renderer {\n  border: 1px solid #b85c51;\n  padding: 1rem;\n  color: #742b22;\n  background: #ffe5df;\n}\n/*# sourceMappingURL=exhibit-render-host.component.css.map */\n"] }]
  }], null, { snapshot: [{ type: Input, args: [{ isSignal: true, alias: "snapshot", required: true }] }], mode: [{ type: Input, args: [{ isSignal: true, alias: "mode", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExhibitRenderHostComponent, { className: "ExhibitRenderHostComponent", filePath: "src/app/templates/exhibit-hall/ui/exhibit-render-host.component.ts", lineNumber: 32 });
})();

// src/app/templates/exhibit-hall/ui/hall-corridor.component.ts
var _forTrack0 = ($index, $item) => $item.locationId;
function HallCorridorComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275element(1, "i");
    \u0275\u0275text(2, " Class standing here");
    \u0275\u0275elementEnd();
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "app-object-model-viewer", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("model", ctx);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function HallCorridorComponent_For_6_Conditional_3_Conditional_2_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const location_r2 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.opened.emit(location_r2.hanging.id));
    });
    \u0275\u0275element(1, "img", 18)(2, "span", 19);
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4, "Explore this wing");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const preview_r4 = \u0275\u0275nextContext();
    const location_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("aria-label", "Walk up to " + location_r2.snapshot.accessibleData.title);
    \u0275\u0275advance();
    \u0275\u0275property("src", preview_r4.imageUrl, \u0275\u0275sanitizeUrl)("alt", preview_r4.imageAlt);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "img", 18)(2, "span", 19);
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4, "Walk-up coming soon");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const preview_r4 = \u0275\u0275nextContext();
    const location_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("aria-label", location_r2.snapshot.accessibleData.title + ". Walk-up coming soon.");
    \u0275\u0275advance();
    \u0275\u0275property("src", preview_r4.imageUrl, \u0275\u0275sanitizeUrl)("alt", preview_r4.imageAlt);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HallCorridorComponent_For_6_Conditional_3_Conditional_2_Conditional_0_Template, 6, 3, "button", 15)(1, HallCorridorComponent_For_6_Conditional_3_Conditional_2_Conditional_1_Template, 6, 3, "div", 16);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.walkUpAvailable ? 0 : 1);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function HallCorridorComponent_For_6_Conditional_3_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const location_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.opened.emit(location_r2.hanging.id));
    });
    \u0275\u0275element(1, "app-exhibit-render-host", 24)(2, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("aria-label", "Walk up to " + location_r2.snapshot.accessibleData.title);
    \u0275\u0275advance();
    \u0275\u0275property("snapshot", location_r2.snapshot);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function HallCorridorComponent_For_6_Conditional_3_Conditional_13_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const location_r2 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.pointed.emit(location_r2.hanging.id));
    });
    \u0275\u0275text(1, " Point class here ");
    \u0275\u0275elementEnd();
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function HallCorridorComponent_For_6_Conditional_3_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const location_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.opened.emit(location_r2.hanging.id));
    });
    \u0275\u0275text(1, "Walk up");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, HallCorridorComponent_For_6_Conditional_3_Conditional_13_Conditional_2_Template, 2, 0, "button", 26);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.teacherMode() ? 2 : -1);
  }
}
function HallCorridorComponent_For_6_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275text(2, "Walk-up coming soon");
    \u0275\u0275elementEnd();
  }
}
function HallCorridorComponent_For_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HallCorridorComponent_For_6_Conditional_3_Conditional_0_Template, 3, 0, "span", 8);
    \u0275\u0275conditionalCreate(1, HallCorridorComponent_For_6_Conditional_3_Conditional_1_Template, 2, 1, "div", 9)(2, HallCorridorComponent_For_6_Conditional_3_Conditional_2_Template, 2, 1)(3, HallCorridorComponent_For_6_Conditional_3_Conditional_3_Template, 3, 2, "button", 10);
    \u0275\u0275elementStart(4, "div", 11)(5, "div")(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "small");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 12);
    \u0275\u0275conditionalCreate(13, HallCorridorComponent_For_6_Conditional_3_Conditional_13_Template, 3, 1)(14, HallCorridorComponent_For_6_Conditional_3_Conditional_14_Template, 3, 0, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const location_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(location_r2.hanging.id === ctx_r2.focusedHangingId() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.modelPreview(location_r2.snapshot.visitorSafeData)) ? 1 : (tmp_12_0 = location_r2.snapshot.corridorPreview) ? 2 : 3, tmp_12_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(location_r2.snapshot.accessibleData.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r2.team.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Snapshot v", location_r2.snapshot.version);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(location_r2.snapshot.corridorPreview?.walkUpAvailable !== false ? 13 : 14);
  }
}
function HallCorridorComponent_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 28);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const location_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.emptyLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", location_r2.team.displayName, " is still preparing its exhibit.");
  }
}
function HallCorridorComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 5)(1, "span", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, HallCorridorComponent_For_6_Conditional_3_Template, 15, 6)(4, HallCorridorComponent_For_6_Conditional_4_Template, 6, 2, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("focused", location_r2.hanging?.id === ctx_r2.focusedHangingId())("empty", location_r2.hanging === void 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((location_r2.position + 1).toString().padStart(2, "0"));
    \u0275\u0275advance();
    \u0275\u0275conditional(location_r2.hanging && location_r2.snapshot ? 3 : 4);
  }
}
var HallCorridorComponent = class _HallCorridorComponent {
  modelPreview(data) {
    return isMuseumBoardSnapshotData(data) ? data.objects[0]?.model : void 0;
  }
  locations = input.required(
    ...ngDevMode ? [{ debugName: "locations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedHangingId = input(
    void 0,
    ...ngDevMode ? [{ debugName: "focusedHangingId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  emptyLabel = input(
    "Empty location",
    ...ngDevMode ? [{ debugName: "emptyLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherMode = input(
    false,
    ...ngDevMode ? [{ debugName: "teacherMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opened = output();
  pointed = output();
  static \u0275fac = function HallCorridorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HallCorridorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HallCorridorComponent, selectors: [["app-hall-corridor"]], inputs: { locations: [1, "locations"], focusedHangingId: [1, "focusedHangingId"], emptyLabel: [1, "emptyLabel"], teacherMode: [1, "teacherMode"] }, outputs: { opened: "opened", pointed: "pointed" }, decls: 8, vars: 0, consts: [["aria-label", "Scrollable class exhibit corridor", 1, "gallery-viewport"], ["aria-hidden", "true", 1, "ceiling"], [1, "corridor"], [1, "hall-location", 3, "focused", "empty"], ["aria-hidden", "true", 1, "floor"], [1, "hall-location"], [1, "location-number"], ["aria-label", "No exhibit published", 1, "empty-nail"], [1, "standing-plate"], [1, "frame", "model-frame"], ["type", "button", 1, "frame"], [1, "museum-label"], [1, "location-actions"], [1, "coming-soon-action"], [3, "model"], ["type", "button", 1, "frame", "preview-frame", "available"], [1, "frame", "preview-frame", "unavailable"], ["type", "button", 1, "frame", "preview-frame", "available", 3, "click"], [3, "src", "alt"], ["aria-hidden", "true", 1, "scene-depth"], [1, "preview-status", "available-status"], ["aria-hidden", "true", 1, "frame-glint"], [1, "preview-status"], ["type", "button", 1, "frame", 3, "click"], ["mode", "thumbnail", 3, "snapshot"], ["type", "button", 3, "click"], ["type", "button", 1, "point"], ["type", "button", 1, "point", 3, "click"], ["aria-hidden", "true"]], template: function HallCorridorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, HallCorridorComponent_For_3_Template, 1, 0, "i", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275repeaterCreate(5, HallCorridorComponent_For_6_Template, 5, 6, "article", 3, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.locations());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.locations());
    }
  }, dependencies: [ExhibitRenderHostComponent, ObjectModelViewerComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.gallery-viewport[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 31rem;\n  overflow: hidden;\n  border: 1px solid #6a5741;\n  border-radius: 0.7rem;\n  background:\n    linear-gradient(\n      180deg,\n      #1d1b20 0 9%,\n      #4f473e 9% 74%,\n      #2a2119 74% 100%);\n  box-shadow: inset 0 0 5rem rgba(9, 7, 8, 0.7215686275), 0 0.8rem 2rem rgba(11, 9, 8, 0.3764705882);\n}\n.gallery-viewport[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: 0;\n  inset: 9% 0 26%;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.031372549) 0 1px,\n      transparent 1px 19rem),\n    linear-gradient(\n      90deg,\n      #2f2928,\n      #5b5147 18%,\n      #5e544a 82%,\n      #302a28);\n  content: "";\n}\n.ceiling[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  justify-content: space-around;\n  height: 11%;\n  background: linear-gradient(#141217, #242026);\n}\n.ceiling[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 3.4rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 0,\n      rgba(255, 228, 169, 0.6901960784),\n      transparent 68%);\n  clip-path: polygon(43% 0, 57% 0, 100% 100%, 0 100%);\n}\n.corridor[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 3;\n  display: grid;\n  grid-auto-columns: minmax(15rem, 24vw);\n  grid-auto-flow: column;\n  gap: clamp(1rem, 3vw, 2.4rem);\n  min-height: 31rem;\n  overflow-x: auto;\n  overscroll-behavior-inline: contain;\n  padding: 3.7rem clamp(1rem, 4vw, 3rem) 4.2rem;\n  scroll-padding-inline: 2rem;\n  scroll-snap-type: x mandatory;\n  scrollbar-color: #b59055 #211914;\n  scrollbar-width: thin;\n}\n.hall-location[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-rows: 1fr auto auto;\n  min-height: 23rem;\n  align-content: center;\n  scroll-snap-align: center;\n}\n.location-number[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -1.8rem;\n  left: 50%;\n  color: #cbbfae;\n  font: 700 0.58rem/1 ui-monospace, monospace;\n  letter-spacing: 0.18em;\n  transform: translateX(-50%);\n}\n.frame[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: 100%;\n  min-height: 16rem;\n  overflow: hidden;\n  border: 0.68rem ridge #a47c3e;\n  padding: 0.26rem;\n  background: #20150e;\n  box-shadow:\n    0 0 0 0.18rem #211812,\n    0 0.7rem 1.1rem rgba(11, 8, 6, 0.5019607843),\n    0 0 2.5rem rgba(233, 188, 89, 0.2509803922);\n  cursor: pointer;\n  transform: perspective(70rem) rotateX(0deg) rotateY(0deg);\n  transform-style: preserve-3d;\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n.frame[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: 2;\n  inset: 0;\n  border: 1px solid rgba(244, 217, 149, 0.5411764706);\n  pointer-events: none;\n  content: "";\n}\n.frame-glint[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      125deg,\n      rgba(255, 249, 223, 0.1215686275),\n      transparent 35% 72%,\n      rgba(255, 243, 197, 0.0705882353));\n}\n.preview-frame[_ngcontent-%COMP%] {\n  isolation: isolate;\n  padding: 0;\n  background: #110c08;\n}\n.preview-frame[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(1.025);\n  transition: filter 180ms ease, transform 260ms ease;\n}\n.preview-frame[_ngcontent-%COMP%]   .scene-depth[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(2, 1, 0, 0) 45%,\n      rgba(5, 3, 1, 0.5607843137) 100%),\n    radial-gradient(\n      ellipse at 50% 42%,\n      transparent 44%,\n      rgba(9, 5, 2, 0.3215686275) 100%);\n  box-shadow: inset 0 0 2.2rem rgba(5, 3, 1, 0.768627451), inset 0 -2.8rem 2rem rgba(3, 2, 1, 0.4588235294);\n}\n.preview-frame.available[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 0 0 0.18rem #211812,\n    -0.35rem 1rem 1.35rem rgba(11, 8, 6, 0.6),\n    0 0 3.2rem rgba(239, 195, 107, 0.4392156863);\n  transform: perspective(70rem) translateY(-0.3rem) rotateX(1.5deg) rotateY(-1.6deg);\n}\n.preview-frame.available[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  filter: saturate(1.08) contrast(1.03);\n  transform: scale(1.07);\n}\n.preview-frame.unavailable[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.preview-frame.unavailable[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  filter: saturate(0.82) brightness(0.82);\n}\n.preview-status[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  right: 0.65rem;\n  bottom: 0.65rem;\n  border: 1px solid rgba(243, 223, 183, 0.4784313725);\n  border-radius: 999px;\n  padding: 0.38rem 0.62rem;\n  color: #fff8ea;\n  background: rgba(33, 24, 17, 0.8745098039);\n  box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.5333333333);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.02em;\n}\n.available-status[_ngcontent-%COMP%] {\n  color: #30220f;\n  background: rgba(241, 206, 120, 0.9294117647);\n}\n.hall-location.focused[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%] {\n  outline: 0.25rem solid #e8bc62;\n  outline-offset: 0.3rem;\n  box-shadow: 0 0 0 0.18rem #211812, 0 0 2.6rem rgba(239, 195, 107, 0.5803921569);\n}\n.standing-plate[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  top: -1rem;\n  left: 50%;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #e4c785;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  color: #2e2316;\n  background: #f1d88f;\n  box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.4666666667);\n  font-size: 0.6rem;\n  font-weight: 900;\n  white-space: nowrap;\n  transform: translateX(-50%);\n}\n.standing-plate[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #8f2f28;\n}\n.museum-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 84%;\n  margin: 0.65rem auto 0;\n  border: 1px solid #bca880;\n  padding: 0.45rem 0.55rem;\n  color: #312c28;\n  background: #e9dfc7;\n  box-shadow: 0 0.25rem 0.6rem rgba(0, 0, 0, 0.3333333333);\n}\n.museum-label[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n}\n.museum-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.museum-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.museum-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.7rem Georgia, serif;\n}\n.museum-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.museum-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6a5c4b;\n  font-size: 0.52rem;\n}\n.location-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n  margin-top: 0.6rem;\n}\n.location-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.3rem;\n  border: 1px solid #cbb17f;\n  border-radius: 999px;\n  padding: 0.4rem 0.7rem;\n  color: #fff8e8;\n  background: #30271f;\n  font-size: 0.64rem;\n  font-weight: 800;\n}\n.location-actions[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%] {\n  color: #2d251b;\n  background: #d6b56d;\n}\n.coming-soon-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 2.3rem;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid #9b8c77;\n  border-radius: 999px;\n  padding: 0.4rem 0.7rem;\n  color: #ddd1bf;\n  background: #28231f;\n  font-size: 0.64rem;\n  font-weight: 800;\n}\n.coming-soon-action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.42rem;\n  height: 0.42rem;\n  border-radius: 50%;\n  background: #bfa977;\n  box-shadow: 0 0 0 0.18rem rgba(191, 169, 119, 0.1450980392);\n}\n.empty-nail[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 18rem;\n  place-items: center;\n  align-content: center;\n  border: 1px dashed #ad9a81;\n  padding: 1.2rem;\n  color: #e5d8c5;\n  text-align: center;\n  background: rgba(25, 23, 25, 0.1411764706);\n}\n.empty-nail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: 0.55rem;\n  height: 0.55rem;\n  margin-bottom: 1rem;\n  border-radius: 50%;\n  background: #b6a894;\n  box-shadow: 0 0.15rem 0.18rem rgba(0, 0, 0, 0.8);\n}\n.empty-nail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 0.42rem;\n  left: 50%;\n  width: 5rem;\n  height: 4rem;\n  border-right: 1px solid #aa9983;\n  border-bottom: 1px solid #aa9983;\n  transform: translateX(-50%) rotate(45deg);\n  content: "";\n}\n.empty-nail[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 4rem;\n  font: 700 1.1rem Georgia, serif;\n}\n.empty-nail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 13rem;\n  margin: 0.35rem 0 0;\n  color: #bfb2a3;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.floor[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 26%;\n  background:\n    repeating-linear-gradient(\n      100deg,\n      rgba(0, 0, 0, 0) 0 4.8rem,\n      rgba(23, 16, 12, 0.4) 4.9rem 5rem),\n    linear-gradient(#473528, #241913);\n  clip-path: polygon(7% 0, 93% 0, 100% 100%, 0 100%);\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #69c8d6;\n  outline-offset: 3px;\n}\n@media (max-width: 720px) {\n  .gallery-viewport[_ngcontent-%COMP%], \n   .corridor[_ngcontent-%COMP%] {\n    min-height: 35rem;\n  }\n  .corridor[_ngcontent-%COMP%] {\n    grid-auto-columns: calc(100vw - 3.25rem);\n    gap: 1rem;\n    padding: 3.4rem 1rem 4.2rem;\n  }\n  .hall-location[_ngcontent-%COMP%] {\n    min-height: 27rem;\n  }\n  .frame[_ngcontent-%COMP%] {\n    min-height: 20rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .corridor[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n  .frame[_ngcontent-%COMP%], \n   .preview-frame[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=hall-corridor.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HallCorridorComponent, [{
    type: Component,
    args: [{ selector: "app-hall-corridor", imports: [ExhibitRenderHostComponent, ObjectModelViewerComponent], template: `<div class="gallery-viewport" aria-label="Scrollable class exhibit corridor">
  <div class="ceiling" aria-hidden="true">
    @for (location of locations(); track location.locationId) {
      <i></i>
    }
  </div>
  <div class="corridor">
    @for (location of locations(); track location.locationId) {
      <article
        class="hall-location"
        [class.focused]="location.hanging?.id === focusedHangingId()"
        [class.empty]="location.hanging === undefined"
      >
        <span class="location-number">{{
          (location.position + 1).toString().padStart(2, '0')
        }}</span>
        @if (location.hanging && location.snapshot) {
          @if (location.hanging.id === focusedHangingId()) {
            <span class="standing-plate"><i></i> Class standing here</span>
          }
          @if (modelPreview(location.snapshot.visitorSafeData); as model) {
            <div class="frame model-frame">
              <app-object-model-viewer [model]="model" />
            </div>
          } @else if (location.snapshot.corridorPreview; as preview) {
            @if (preview.walkUpAvailable) {
              <button
                type="button"
                class="frame preview-frame available"
                (click)="opened.emit(location.hanging.id)"
                [attr.aria-label]="'Walk up to ' + location.snapshot.accessibleData.title"
              >
                <img [src]="preview.imageUrl" [alt]="preview.imageAlt" />
                <span class="scene-depth" aria-hidden="true"></span>
                <span class="preview-status available-status">Explore this wing</span>
                <span class="frame-glint" aria-hidden="true"></span>
              </button>
            } @else {
              <div
                class="frame preview-frame unavailable"
                [attr.aria-label]="
                  location.snapshot.accessibleData.title + '. Walk-up coming soon.'
                "
              >
                <img [src]="preview.imageUrl" [alt]="preview.imageAlt" />
                <span class="scene-depth" aria-hidden="true"></span>
                <span class="preview-status">Walk-up coming soon</span>
                <span class="frame-glint" aria-hidden="true"></span>
              </div>
            }
          } @else {
            <button
              type="button"
              class="frame"
              (click)="opened.emit(location.hanging.id)"
              [attr.aria-label]="'Walk up to ' + location.snapshot.accessibleData.title"
            >
              <app-exhibit-render-host [snapshot]="location.snapshot" mode="thumbnail" />
              <span class="frame-glint" aria-hidden="true"></span>
            </button>
          }
          <div class="museum-label">
            <div>
              <strong>{{ location.snapshot.accessibleData.title }}</strong>
              <span>{{ location.team.displayName }}</span>
            </div>
            <small>Snapshot v{{ location.snapshot.version }}</small>
          </div>
          <div class="location-actions">
            @if (location.snapshot.corridorPreview?.walkUpAvailable !== false) {
              <button type="button" (click)="opened.emit(location.hanging.id)">Walk up</button>
              @if (teacherMode()) {
                <button type="button" class="point" (click)="pointed.emit(location.hanging.id)">
                  Point class here
                </button>
              }
            } @else {
              <span class="coming-soon-action"><i aria-hidden="true"></i>Walk-up coming soon</span>
            }
          </div>
        } @else {
          <div class="empty-nail" aria-label="No exhibit published">
            <span aria-hidden="true"></span>
            <strong>{{ emptyLabel() }}</strong>
            <p>{{ location.team.displayName }} is still preparing its exhibit.</p>
          </div>
        }
      </article>
    }
  </div>
  <div class="floor" aria-hidden="true"></div>
</div>
`, styles: ['/* src/app/templates/exhibit-hall/ui/hall-corridor.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.gallery-viewport {\n  position: relative;\n  min-height: 31rem;\n  overflow: hidden;\n  border: 1px solid #6a5741;\n  border-radius: 0.7rem;\n  background:\n    linear-gradient(\n      180deg,\n      #1d1b20 0 9%,\n      #4f473e 9% 74%,\n      #2a2119 74% 100%);\n  box-shadow: inset 0 0 5rem rgba(9, 7, 8, 0.7215686275), 0 0.8rem 2rem rgba(11, 9, 8, 0.3764705882);\n}\n.gallery-viewport::before {\n  position: absolute;\n  z-index: 0;\n  inset: 9% 0 26%;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.031372549) 0 1px,\n      transparent 1px 19rem),\n    linear-gradient(\n      90deg,\n      #2f2928,\n      #5b5147 18%,\n      #5e544a 82%,\n      #302a28);\n  content: "";\n}\n.ceiling {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  justify-content: space-around;\n  height: 11%;\n  background: linear-gradient(#141217, #242026);\n}\n.ceiling i {\n  width: 3.4rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 0,\n      rgba(255, 228, 169, 0.6901960784),\n      transparent 68%);\n  clip-path: polygon(43% 0, 57% 0, 100% 100%, 0 100%);\n}\n.corridor {\n  position: relative;\n  z-index: 3;\n  display: grid;\n  grid-auto-columns: minmax(15rem, 24vw);\n  grid-auto-flow: column;\n  gap: clamp(1rem, 3vw, 2.4rem);\n  min-height: 31rem;\n  overflow-x: auto;\n  overscroll-behavior-inline: contain;\n  padding: 3.7rem clamp(1rem, 4vw, 3rem) 4.2rem;\n  scroll-padding-inline: 2rem;\n  scroll-snap-type: x mandatory;\n  scrollbar-color: #b59055 #211914;\n  scrollbar-width: thin;\n}\n.hall-location {\n  position: relative;\n  display: grid;\n  grid-template-rows: 1fr auto auto;\n  min-height: 23rem;\n  align-content: center;\n  scroll-snap-align: center;\n}\n.location-number {\n  position: absolute;\n  top: -1.8rem;\n  left: 50%;\n  color: #cbbfae;\n  font: 700 0.58rem/1 ui-monospace, monospace;\n  letter-spacing: 0.18em;\n  transform: translateX(-50%);\n}\n.frame {\n  position: relative;\n  display: block;\n  width: 100%;\n  min-height: 16rem;\n  overflow: hidden;\n  border: 0.68rem ridge #a47c3e;\n  padding: 0.26rem;\n  background: #20150e;\n  box-shadow:\n    0 0 0 0.18rem #211812,\n    0 0.7rem 1.1rem rgba(11, 8, 6, 0.5019607843),\n    0 0 2.5rem rgba(233, 188, 89, 0.2509803922);\n  cursor: pointer;\n  transform: perspective(70rem) rotateX(0deg) rotateY(0deg);\n  transform-style: preserve-3d;\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n.frame::before {\n  position: absolute;\n  z-index: 2;\n  inset: 0;\n  border: 1px solid rgba(244, 217, 149, 0.5411764706);\n  pointer-events: none;\n  content: "";\n}\n.frame-glint {\n  position: absolute;\n  z-index: 3;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      125deg,\n      rgba(255, 249, 223, 0.1215686275),\n      transparent 35% 72%,\n      rgba(255, 243, 197, 0.0705882353));\n}\n.preview-frame {\n  isolation: isolate;\n  padding: 0;\n  background: #110c08;\n}\n.preview-frame img {\n  position: absolute;\n  z-index: 0;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(1.025);\n  transition: filter 180ms ease, transform 260ms ease;\n}\n.preview-frame .scene-depth {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(2, 1, 0, 0) 45%,\n      rgba(5, 3, 1, 0.5607843137) 100%),\n    radial-gradient(\n      ellipse at 50% 42%,\n      transparent 44%,\n      rgba(9, 5, 2, 0.3215686275) 100%);\n  box-shadow: inset 0 0 2.2rem rgba(5, 3, 1, 0.768627451), inset 0 -2.8rem 2rem rgba(3, 2, 1, 0.4588235294);\n}\n.preview-frame.available:hover {\n  box-shadow:\n    0 0 0 0.18rem #211812,\n    -0.35rem 1rem 1.35rem rgba(11, 8, 6, 0.6),\n    0 0 3.2rem rgba(239, 195, 107, 0.4392156863);\n  transform: perspective(70rem) translateY(-0.3rem) rotateX(1.5deg) rotateY(-1.6deg);\n}\n.preview-frame.available:hover img {\n  filter: saturate(1.08) contrast(1.03);\n  transform: scale(1.07);\n}\n.preview-frame.unavailable {\n  cursor: default;\n}\n.preview-frame.unavailable img {\n  filter: saturate(0.82) brightness(0.82);\n}\n.preview-status {\n  position: absolute;\n  z-index: 4;\n  right: 0.65rem;\n  bottom: 0.65rem;\n  border: 1px solid rgba(243, 223, 183, 0.4784313725);\n  border-radius: 999px;\n  padding: 0.38rem 0.62rem;\n  color: #fff8ea;\n  background: rgba(33, 24, 17, 0.8745098039);\n  box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.5333333333);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.02em;\n}\n.available-status {\n  color: #30220f;\n  background: rgba(241, 206, 120, 0.9294117647);\n}\n.hall-location.focused .frame {\n  outline: 0.25rem solid #e8bc62;\n  outline-offset: 0.3rem;\n  box-shadow: 0 0 0 0.18rem #211812, 0 0 2.6rem rgba(239, 195, 107, 0.5803921569);\n}\n.standing-plate {\n  position: absolute;\n  z-index: 5;\n  top: -1rem;\n  left: 50%;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  border: 1px solid #e4c785;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  color: #2e2316;\n  background: #f1d88f;\n  box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.4666666667);\n  font-size: 0.6rem;\n  font-weight: 900;\n  white-space: nowrap;\n  transform: translateX(-50%);\n}\n.standing-plate i {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #8f2f28;\n}\n.museum-label {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 84%;\n  margin: 0.65rem auto 0;\n  border: 1px solid #bca880;\n  padding: 0.45rem 0.55rem;\n  color: #312c28;\n  background: #e9dfc7;\n  box-shadow: 0 0.25rem 0.6rem rgba(0, 0, 0, 0.3333333333);\n}\n.museum-label div {\n  display: grid;\n  min-width: 0;\n}\n.museum-label strong,\n.museum-label span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.museum-label strong {\n  font: 700 0.7rem Georgia, serif;\n}\n.museum-label span,\n.museum-label small {\n  color: #6a5c4b;\n  font-size: 0.52rem;\n}\n.location-actions {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n  margin-top: 0.6rem;\n}\n.location-actions button {\n  min-height: 2.3rem;\n  border: 1px solid #cbb17f;\n  border-radius: 999px;\n  padding: 0.4rem 0.7rem;\n  color: #fff8e8;\n  background: #30271f;\n  font-size: 0.64rem;\n  font-weight: 800;\n}\n.location-actions .point {\n  color: #2d251b;\n  background: #d6b56d;\n}\n.coming-soon-action {\n  display: inline-flex;\n  min-height: 2.3rem;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid #9b8c77;\n  border-radius: 999px;\n  padding: 0.4rem 0.7rem;\n  color: #ddd1bf;\n  background: #28231f;\n  font-size: 0.64rem;\n  font-weight: 800;\n}\n.coming-soon-action i {\n  width: 0.42rem;\n  height: 0.42rem;\n  border-radius: 50%;\n  background: #bfa977;\n  box-shadow: 0 0 0 0.18rem rgba(191, 169, 119, 0.1450980392);\n}\n.empty-nail {\n  display: grid;\n  min-height: 18rem;\n  place-items: center;\n  align-content: center;\n  border: 1px dashed #ad9a81;\n  padding: 1.2rem;\n  color: #e5d8c5;\n  text-align: center;\n  background: rgba(25, 23, 25, 0.1411764706);\n}\n.empty-nail > span {\n  position: relative;\n  display: block;\n  width: 0.55rem;\n  height: 0.55rem;\n  margin-bottom: 1rem;\n  border-radius: 50%;\n  background: #b6a894;\n  box-shadow: 0 0.15rem 0.18rem rgba(0, 0, 0, 0.8);\n}\n.empty-nail > span::after {\n  position: absolute;\n  top: 0.42rem;\n  left: 50%;\n  width: 5rem;\n  height: 4rem;\n  border-right: 1px solid #aa9983;\n  border-bottom: 1px solid #aa9983;\n  transform: translateX(-50%) rotate(45deg);\n  content: "";\n}\n.empty-nail strong {\n  margin-top: 4rem;\n  font: 700 1.1rem Georgia, serif;\n}\n.empty-nail p {\n  max-width: 13rem;\n  margin: 0.35rem 0 0;\n  color: #bfb2a3;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.floor {\n  position: absolute;\n  z-index: 1;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 26%;\n  background:\n    repeating-linear-gradient(\n      100deg,\n      rgba(0, 0, 0, 0) 0 4.8rem,\n      rgba(23, 16, 12, 0.4) 4.9rem 5rem),\n    linear-gradient(#473528, #241913);\n  clip-path: polygon(7% 0, 93% 0, 100% 100%, 0 100%);\n}\nbutton:focus-visible {\n  outline: 3px solid #69c8d6;\n  outline-offset: 3px;\n}\n@media (max-width: 720px) {\n  .gallery-viewport,\n  .corridor {\n    min-height: 35rem;\n  }\n  .corridor {\n    grid-auto-columns: calc(100vw - 3.25rem);\n    gap: 1rem;\n    padding: 3.4rem 1rem 4.2rem;\n  }\n  .hall-location {\n    min-height: 27rem;\n  }\n  .frame {\n    min-height: 20rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .corridor {\n    scroll-behavior: auto;\n  }\n  .frame,\n  .preview-frame img {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=hall-corridor.component.css.map */\n'] }]
  }], null, { locations: [{ type: Input, args: [{ isSignal: true, alias: "locations", required: true }] }], focusedHangingId: [{ type: Input, args: [{ isSignal: true, alias: "focusedHangingId", required: false }] }], emptyLabel: [{ type: Input, args: [{ isSignal: true, alias: "emptyLabel", required: false }] }], teacherMode: [{ type: Input, args: [{ isSignal: true, alias: "teacherMode", required: false }] }], opened: [{ type: Output, args: ["opened"] }], pointed: [{ type: Output, args: ["pointed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HallCorridorComponent, { className: "HallCorridorComponent", filePath: "src/app/templates/exhibit-hall/ui/hall-corridor.component.ts", lineNumber: 14 });
})();

// src/app/templates/exhibit-hall/rooms/museum-walkthrough.component.ts
var _forTrack02 = ($index, $item) => $item.locationId;
function MuseumWalkthroughComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function MuseumWalkthroughComponent_For_15_Template_button_click_0_listener() {
      const room_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.enter(room_r2.locationId));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const room_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.activeRoom()?.locationId === room_r2.locationId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.number(room_r2.position));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", room_r2.snapshot?.accessibleData?.title, " ");
  }
}
function MuseumWalkthroughComponent_Conditional_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-museum-room-presentation", 7);
  }
  if (rf & 2) {
    const room_r5 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("board", ctx)("label", "Room " + ctx_r2.number(room_r5.position));
  }
}
function MuseumWalkthroughComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "button", 4);
    \u0275\u0275listener("click", function MuseumWalkthroughComponent_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.enter());
    });
    \u0275\u0275text(2, "\u2190 Museum entrance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function MuseumWalkthroughComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.nextRoom());
    });
    \u0275\u0275text(6, "Next room \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, MuseumWalkthroughComponent_Conditional_16_Conditional_7_Template, 1, 2, "app-museum-room-presentation", 7);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Room ", ctx_r2.number(ctx.position));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.activeBoard()) ? 7 : -1, tmp_3_0);
  }
}
function MuseumWalkthroughComponent_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Rooms will appear here after their curators submit them.");
    \u0275\u0275elementEnd();
  }
}
function MuseumWalkthroughComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-museum-scene", 8);
    \u0275\u0275listener("selected", function MuseumWalkthroughComponent_Conditional_17_Template_app_museum_scene_selected_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.enter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(1, MuseumWalkthroughComponent_Conditional_17_Conditional_1_Template, 2, 0, "p", 9);
    \u0275\u0275elementStart(2, "p", 10);
    \u0275\u0275text(3, "Choose a door or a room name above. Each room opens on its own.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("content", ctx_r2.lobby());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.rooms().length ? 1 : -1);
  }
}
var MuseumWalkthroughComponent = class _MuseumWalkthroughComponent {
  locations = input(
    [],
    ...ngDevMode ? [{ debugName: "locations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publishedRooms = input(
    void 0,
    ...ngDevMode ? [{ debugName: "publishedRooms" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opened = output();
  activeId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "activeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rooms = computed(
    () => this.publishedRooms()?.map((room) => ({
      locationId: room.room.roomId,
      position: room.position,
      snapshot: { visitorSafeData: room.board, accessibleData: { title: room.board.title } },
      hanging: { id: room.id },
      team: { displayName: room.board.teamCredit.displayName }
    })) ?? this.locations().filter((location) => location.hanging && isMuseumBoardSnapshotData(location.snapshot?.visitorSafeData) && location.snapshot?.visitorSafeData.museumRoom),
    ...ngDevMode ? [{ debugName: "rooms" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeRoom = computed(
    () => this.rooms().find((room) => room.locationId === this.activeId()),
    ...ngDevMode ? [{ debugName: "activeRoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeBoard = computed(
    () => {
      const data = this.activeRoom()?.snapshot?.visitorSafeData;
      return isMuseumBoardSnapshotData(data) ? data : void 0;
    },
    ...ngDevMode ? [{ debugName: "activeBoard" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lobby = computed(
    () => ({
      kind: "lobby",
      doors: this.rooms().map((room) => ({
        id: room.locationId,
        number: this.number(room.position),
        title: room.snapshot.accessibleData.title,
        curator: room.team.displayName
      }))
    }),
    ...ngDevMode ? [{ debugName: "lobby" }] : (
      /* istanbul ignore next */
      []
    )
  );
  number(position) {
    return String(position + 1).padStart(2, "0");
  }
  enter(id) {
    const room = this.rooms().find((item) => item.locationId === id);
    this.activeId.set(room?.locationId);
    this.opened.emit(room?.hanging?.id);
  }
  nextRoom() {
    const rooms = this.rooms();
    const index = rooms.findIndex((room) => room.locationId === this.activeId());
    this.enter(rooms[(index + 1) % rooms.length]?.locationId);
  }
  static \u0275fac = function MuseumWalkthroughComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumWalkthroughComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MuseumWalkthroughComponent, selectors: [["app-museum-walkthrough"]], inputs: { locations: [1, "locations"], publishedRooms: [1, "publishedRooms"] }, outputs: { opened: "opened" }, decls: 18, vars: 3, consts: [[1, "museum-walkthrough"], [1, "museum-heading"], ["aria-hidden", "true", 1, "museum-seal"], ["aria-label", "Museum rooms", 1, "museum-directory"], ["type", "button", 3, "click"], ["type", "button"], [1, "visitor-navigation"], [3, "board", "label"], [3, "selected", "content"], [1, "empty-museum"], [1, "museum-note"]], template: function MuseumWalkthroughComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "A place for every story.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Enter a room. Look closely. Discover what its curators want you to see.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "span", 2);
      \u0275\u0275text(10, "M");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "nav", 3)(12, "button", 4);
      \u0275\u0275listener("click", function MuseumWalkthroughComponent_Template_button_click_12_listener() {
        return ctx.enter();
      });
      \u0275\u0275text(13, " Museum entrance ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, MuseumWalkthroughComponent_For_15_Template, 4, 3, "button", 5, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, MuseumWalkthroughComponent_Conditional_16_Template, 8, 2)(17, MuseumWalkthroughComponent_Conditional_17_Template, 4, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("THE CLASS MUSEUM \xB7 ", ctx.rooms().length, " SUBMITTED ROOMS");
      \u0275\u0275advance(8);
      \u0275\u0275attribute("aria-pressed", !ctx.activeRoom());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.rooms());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_3_0 = ctx.activeRoom()) ? 16 : 17, tmp_3_0);
    }
  }, dependencies: [MuseumSceneComponent, MuseumRoomPresentationComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #243f50;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.museum-walkthrough[_ngcontent-%COMP%] {\n  padding: 28px;\n  background: #f3ead7;\n  border: 1px solid #d5cbb6;\n  border-radius: 7px;\n  border-top: 4px solid #23495b;\n  box-shadow: inset 0 3px #bc8b39;\n}\n.museum-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  padding: 12px 5px 24px;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.artifact-label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 700 10px/1.6 Arial, sans-serif;\n  letter-spacing: 0.13em;\n}\nh2[_ngcontent-%COMP%] {\n  font: 400 clamp(26px, 3vw, 40px)/1.15 Georgia, serif;\n  margin: 10px 0;\n}\np[_ngcontent-%COMP%] {\n  font: 14px/1.7 Arial, sans-serif;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: #676b5e;\n  max-width: 780px;\n}\n.museum-seal[_ngcontent-%COMP%] {\n  font: 40px Georgia, serif !important;\n  border: 1px solid #b79961;\n  outline: 1px solid #b79961;\n  outline-offset: 4px;\n  padding: 12px 18px;\n  color: #9c7a41;\n}\n.museum-directory[_ngcontent-%COMP%], \nnav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.museum-directory[_ngcontent-%COMP%] {\n  padding: 14px 0;\n  border-top: 1px solid #d7ceb9;\n  margin-bottom: 8px;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 42px;\n  padding: 10px 14px;\n  border: 1px solid #c9bea7;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #294c60;\n  cursor: pointer;\n  font: 12px/1.4 Arial, sans-serif;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #ece6d5;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #fff9e7;\n  background: #23495b;\n  border-color: #23495b;\n}\nbutton[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a78343;\n  font-weight: bold;\n  margin-right: 5px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #a57930;\n  outline-offset: 3px;\n}\n.visitor-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 10px 0 20px;\n  font: 12px Arial, sans-serif;\n}\n.room-presentation[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  padding: 5px 0 20px;\n}\n.room-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 20px;\n}\n.room-grid.inspecting[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) 285px;\n}\n.room-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.room-stage[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.artifact-label[_ngcontent-%COMP%] {\n  padding: 26px 22px;\n  background: #fffbf2;\n  border: 1px solid #d7cdb8;\n  align-self: start;\n  border-top: 4px solid #b28b49;\n  border-radius: 4px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: normal;\n  margin: 12px 0;\n}\nh4[_ngcontent-%COMP%] {\n  font: bold 11px Arial, sans-serif;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  margin-top: 22px;\n}\n.artifact-label[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font: 11px/1.7 Arial, sans-serif;\n  overflow-wrap: anywhere;\n}\n.artifact-label[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%] {\n  border-top: 1px solid #ddd2bd;\n  padding-top: 15px;\n}\na[_ngcontent-%COMP%] {\n  color: #345c74;\n  text-underline-offset: 3px;\n}\n.reading-view[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  border-top: 1px solid #d4c9b2;\n  padding-top: 15px;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.reading-view[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  max-width: 780px;\n  border-bottom: 1px solid #ded4c0;\n  padding: 10px 0;\n}\n.museum-note[_ngcontent-%COMP%], \n.empty-museum[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #646958;\n  text-align: center;\n}\n@media (max-width: 850px) {\n  .room-grid.inspecting[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .artifact-label[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .museum-walkthrough[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .museum-seal[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .museum-heading[_ngcontent-%COMP%] {\n    padding: 5px 0 18px;\n  }\n  .museum-directory[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 130px;\n  }\n  .visitor-navigation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media print {\n  app-museum-scene[_ngcontent-%COMP%], \n   nav[_ngcontent-%COMP%], \n   .visitor-navigation[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .reading-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .reading-view[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .museum-walkthrough[_ngcontent-%COMP%] {\n    border: 0;\n    padding: 0;\n  }\n}\n/*# sourceMappingURL=museum-presentation.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumWalkthroughComponent, [{
    type: Component,
    args: [{ selector: "app-museum-walkthrough", imports: [MuseumSceneComponent, MuseumRoomPresentationComponent], template: `
    <section class="museum-walkthrough">
      <header class="museum-heading">
        <div>
          <span>THE CLASS MUSEUM \xB7 {{ rooms().length }} SUBMITTED ROOMS</span>
          <h2>A place for every story.</h2>
          <p>Enter a room. Look closely. Discover what its curators want you to see.</p>
        </div>
        <span class="museum-seal" aria-hidden="true">M</span>
      </header>
      <nav class="museum-directory" aria-label="Museum rooms">
        <button type="button" [attr.aria-pressed]="!activeRoom()" (click)="enter()">
          Museum entrance
        </button>
        @for (room of rooms(); track room.locationId) {
          <button
            type="button"
            [attr.aria-pressed]="activeRoom()?.locationId === room.locationId"
            (click)="enter(room.locationId)"
          >
            <span>{{ number(room.position) }}</span> {{ room.snapshot?.accessibleData?.title }}
          </button>
        }
      </nav>
      @if (activeRoom(); as room) {
        <div class="visitor-navigation">
          <button type="button" (click)="enter()">\u2190 Museum entrance</button
          ><span>Room {{ number(room.position) }}</span
          ><button type="button" (click)="nextRoom()">Next room \u2192</button>
        </div>
        @if (activeBoard(); as board) {
          <app-museum-room-presentation [board]="board" [label]="'Room ' + number(room.position)" />
        }
      } @else {
        <app-museum-scene [content]="lobby()" (selected)="enter($event)" />
        @if (!rooms().length) {
          <p class="empty-museum">Rooms will appear here after their curators submit them.</p>
        }
        <p class="museum-note">Choose a door or a room name above. Each room opens on its own.</p>
      }
    </section>
  `, styles: ['/* src/app/templates/exhibit-hall/rooms/museum-presentation.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #243f50;\n}\n* {\n  box-sizing: border-box;\n}\n.museum-walkthrough {\n  padding: 28px;\n  background: #f3ead7;\n  border: 1px solid #d5cbb6;\n  border-radius: 7px;\n  border-top: 4px solid #23495b;\n  box-shadow: inset 0 3px #bc8b39;\n}\n.museum-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  padding: 12px 5px 24px;\n}\nheader span,\n.artifact-label > span {\n  font: 700 10px/1.6 Arial, sans-serif;\n  letter-spacing: 0.13em;\n}\nh2 {\n  font: 400 clamp(26px, 3vw, 40px)/1.15 Georgia, serif;\n  margin: 10px 0;\n}\np {\n  font: 14px/1.7 Arial, sans-serif;\n}\nheader p {\n  margin: 8px 0 0;\n  color: #676b5e;\n  max-width: 780px;\n}\n.museum-seal {\n  font: 40px Georgia, serif !important;\n  border: 1px solid #b79961;\n  outline: 1px solid #b79961;\n  outline-offset: 4px;\n  padding: 12px 18px;\n  color: #9c7a41;\n}\n.museum-directory,\nnav {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.museum-directory {\n  padding: 14px 0;\n  border-top: 1px solid #d7ceb9;\n  margin-bottom: 8px;\n}\nbutton {\n  min-height: 42px;\n  padding: 10px 14px;\n  border: 1px solid #c9bea7;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #294c60;\n  cursor: pointer;\n  font: 12px/1.4 Arial, sans-serif;\n}\nbutton:hover {\n  background: #ece6d5;\n}\nbutton[aria-pressed=true] {\n  color: #fff9e7;\n  background: #23495b;\n  border-color: #23495b;\n}\nbutton span {\n  color: #a78343;\n  font-weight: bold;\n  margin-right: 5px;\n}\nbutton:focus-visible,\nsummary:focus-visible,\na:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #a57930;\n  outline-offset: 3px;\n}\n.visitor-navigation {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 10px 0 20px;\n  font: 12px Arial, sans-serif;\n}\n.room-presentation > header {\n  padding: 5px 0 20px;\n}\n.room-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 20px;\n}\n.room-grid.inspecting {\n  grid-template-columns: minmax(0, 1fr) 285px;\n}\n.room-stage {\n  min-width: 0;\n}\n.room-stage nav {\n  margin-top: 10px;\n}\n.artifact-label {\n  padding: 26px 22px;\n  background: #fffbf2;\n  border: 1px solid #d7cdb8;\n  align-self: start;\n  border-top: 4px solid #b28b49;\n  border-radius: 4px;\n}\nh3 {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: normal;\n  margin: 12px 0;\n}\nh4 {\n  font: bold 11px Arial, sans-serif;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  margin-top: 22px;\n}\n.artifact-label .source,\nli {\n  font: 11px/1.7 Arial, sans-serif;\n  overflow-wrap: anywhere;\n}\n.artifact-label .source {\n  border-top: 1px solid #ddd2bd;\n  padding-top: 15px;\n}\na {\n  color: #345c74;\n  text-underline-offset: 3px;\n}\n.reading-view {\n  margin-top: 20px;\n  border-top: 1px solid #d4c9b2;\n  padding-top: 15px;\n}\nsummary {\n  padding: 10px 0;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.reading-view article {\n  max-width: 780px;\n  border-bottom: 1px solid #ded4c0;\n  padding: 10px 0;\n}\n.museum-note,\n.empty-museum {\n  font-size: 12px;\n  color: #646958;\n  text-align: center;\n}\n@media (max-width: 850px) {\n  .room-grid.inspecting {\n    grid-template-columns: 1fr;\n  }\n  .artifact-label {\n    max-width: 100%;\n  }\n  .museum-walkthrough {\n    padding: 14px;\n  }\n  .museum-seal {\n    display: none;\n  }\n  .museum-heading {\n    padding: 5px 0 18px;\n  }\n  .museum-directory button {\n    flex: 1 1 130px;\n  }\n  .visitor-navigation span {\n    display: none;\n  }\n}\n@media print {\n  app-museum-scene,\n  nav,\n  .visitor-navigation {\n    display: none;\n  }\n  .reading-view {\n    display: block;\n  }\n  .reading-view > * {\n    display: block;\n  }\n  .museum-walkthrough {\n    border: 0;\n    padding: 0;\n  }\n}\n/*# sourceMappingURL=museum-presentation.css.map */\n'] }]
  }], null, { locations: [{ type: Input, args: [{ isSignal: true, alias: "locations", required: false }] }], publishedRooms: [{ type: Input, args: [{ isSignal: true, alias: "publishedRooms", required: false }] }], opened: [{ type: Output, args: ["opened"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MuseumWalkthroughComponent, { className: "MuseumWalkthroughComponent", filePath: "src/app/templates/exhibit-hall/rooms/museum-walkthrough.component.ts", lineNumber: 56 });
})();

export {
  ExhibitRenderHostComponent,
  HallCorridorComponent,
  MuseumWalkthroughComponent
};
//# debugId=cfc6d752-9fa1-5b5a-8800-9c25816bbe72
//# sourceMappingURL=chunk-3QPUEH3H.js.map
