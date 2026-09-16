import {
  CrisisRuntimeService,
  actionBlockedReason,
  availableCrews,
  crisisForecast,
  visibleEvidence
} from "./chunk-FZTV4EQC.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  DecimalPipe
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/crisis-operations/ui/crisis-icon.component.ts
var icons = {
  video: "M3 6h12v12H3V6Zm12 4 6-3v10l-6-3",
  "video-off": "M3 6h12v12H3V6Zm12 4 6-3v10l-6-3M2 2l20 20",
  "mic-off": "M9 10V5a3 3 0 0 1 6 0v5M6 10v2a6 6 0 0 0 12 0v-2M12 18v4m-4 0h8M2 2l20 20",
  people: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3c0-6 14-6 14 0v3m1-18a4 4 0 0 1 0 8m1 3c3 0 4 2 4 4v3",
  "share-screen": "M3 4h18v14H3V4Zm5 17h8m-4-3v3M12 14V7m-3 3 3-3 3 3",
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7",
  speaker: "M3 3h18v12H3V3Zm0 16h5v3H3v-3Zm7 0h4v3h-4v-3Zm6 0h5v3h-5v-3",
  captions: "M3 4h18v16H3V4Zm7 4H6v8h4m8-8h-4v8h4",
  "phone-down": "M3 16 2 12c5-6 15-6 20 0l-1 4h-5v-5M8 11v5H3",
  radar: "M12 2a10 10 0 1 0 10 10M12 6a6 6 0 1 0 6 6M12 10a2 2 0 1 0 2 2M12 12 21 3",
  play: "m8 4 12 8-12 8V4Z",
  pause: "M8 4v16M16 4v16",
  room: "M3 8 12 3l9 5v12H3V8Zm0 0 9 5 9-5M12 13v7",
  map: "m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16",
  news: "M3 4h18v14H3V4Zm5 17h8M12 18v3M6 8h5v6H6V8Zm8 0h4m-4 3h4m-4 3h4",
  station: "M3 3h18v13H3V3Zm6 17h6m-3-4v4M6 12l4-4 3 3 5-5",
  argus: "M7 7V4h10v3M5 7h14v12H5V7ZM9 11v3m6-3v3m-6 3h6M2 10v6m20-6v6M12 1v3",
  command: "M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6",
  close: "m6 6 12 12M6 18 18 6",
  expand: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  sound: "M3 9h4l5-5v16l-5-5H3V9Zm13-2a8 8 0 0 1 0 10m3-13a12 12 0 0 1 0 16",
  mute: "M3 9h4l5-5v16l-5-5H3V9Zm13 0 6 6m-6 0 6-6",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  pin: "m8 3 8 0-1 6 4 4v2H5v-2l4-4-1-6Zm4 12v7",
  back: "M20 12H4m6-6-6 6 6 6",
  clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  check: "m5 12 4 4L19 6",
  alert: "m12 3 10 18H2L12 3Zm0 6v5m0 3v1",
  reset: "M3 4v6h6M3 10a9 9 0 1 1 0 5",
  layers: "m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"
};
var CrisisIconComponent = class _CrisisIconComponent {
  name = input(
    "room",
    ...ngDevMode ? [{ debugName: "name" }] : (
      /* istanbul ignore next */
      []
    )
  );
  path() {
    return icons[this.name()] ?? icons["room"];
  }
  static \u0275fac = function CrisisIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisIconComponent, selectors: [["app-crisis-icon"]], inputs: { name: [1, "name"] }, decls: 2, vars: 1, consts: [["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.4", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"]], template: function CrisisIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path");
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.path());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\nsvg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=crisis-icon.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisIconComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-icon", template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="path()" /></svg>', styles: ["/* angular:styles/component:scss;84b4ea4f6a9ba314a9637c7788360e4990d068c4356211b0e1af8a489a010bb3;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/crisis-operations/ui/crisis-icon.component.ts */\n:host {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\nsvg {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=crisis-icon.component.css.map */\n"] }]
  }], null, { name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisIconComponent, { className: "CrisisIconComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-icon.component.ts", lineNumber: 42 });
})();

// src/app/templates/crisis-operations/ui/crisis-map.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.action.id;
function CrisisMapComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 21);
  }
  if (rf & 2) {
    const path_r1 = ctx.$implicit;
    \u0275\u0275attribute("d", path_r1);
  }
}
function CrisisMapComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const label_r2 = ctx.$implicit;
    \u0275\u0275attribute("x", label_r2.x)("y", label_r2.y)("class", label_r2.kind === "water" ? "geographic-label" : "terrain-label")("transform", "rotate(" + label_r2.rotation + " " + label_r2.x + " " + label_r2.y + ")");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", label_r2.text, " ");
  }
}
function CrisisMapComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 23);
    \u0275\u0275domElement(1, "path", 37)(2, "path", 38);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(480 350) scale(" + (0.75 + ctx_r2.state().stage * 0.12) + ") translate(-480 -350)");
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r2.config().map.hazard);
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r2.config().map.river)("stroke-width", 22 + ctx_r2.state().stage * 12);
  }
}
function CrisisMapComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 39)(1, "path", 40);
  }
  if (rf & 2) {
    const road_r4 = ctx.$implicit;
    \u0275\u0275attribute("d", road_r4);
    \u0275\u0275advance();
    \u0275\u0275attribute("d", road_r4);
  }
}
function CrisisMapComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "rect", 27);
  }
  if (rf & 2) {
    const b_r5 = ctx.$implicit;
    \u0275\u0275attribute("x", b_r5.x)("y", b_r5.y)("width", b_r5.w)("height", b_r5.h);
  }
}
function CrisisMapComponent_Conditional_35_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 41);
  }
  if (rf & 2) {
    const road_r6 = ctx.$implicit;
    \u0275\u0275attribute("d", road_r6);
  }
}
function CrisisMapComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CrisisMapComponent_Conditional_35_For_1_Template, 1, 1, ":svg:path", 41, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.config().map.roads);
  }
}
function CrisisMapComponent_For_37_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "circle", 44);
  }
  if (rf & 2) {
    const location_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("r", 18 + location_r8.population / 70);
  }
}
function CrisisMapComponent_For_37_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text", 50);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", location_r8.population ? location_r8.population + (location_r8.kind === "shelter" ? " spaces" : " people") : location_r8.elevation + " m elevation", " ");
  }
}
function CrisisMapComponent_For_37_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text", 50);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", location_r8.kind === "sensor" ? "TELEMETRY" : location_r8.elevation + " M ELEVATION", " ");
  }
}
function CrisisMapComponent_For_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 42);
    \u0275\u0275domListener("click", function CrisisMapComponent_For_37_Template_g_click_0_listener() {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.locationSelected.emit(location_r8.id));
    })("keydown.enter", function CrisisMapComponent_For_37_Template_g_keydown_enter_0_listener() {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.locationSelected.emit(location_r8.id));
    })("keydown.space", function CrisisMapComponent_For_37_Template_g_keydown_space_0_listener($event) {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.locationSelected.emit(location_r8.id));
    });
    \u0275\u0275domElement(1, "rect", 43);
    \u0275\u0275conditionalCreate(2, CrisisMapComponent_For_37_Conditional_2_Template, 1, 1, ":svg:circle", 44);
    \u0275\u0275domElement(3, "circle", 45)(4, "circle", 46)(5, "circle", 47)(6, "path", 48);
    \u0275\u0275domElementStart(7, "text", 49);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(9, CrisisMapComponent_For_37_Conditional_9_Template, 2, 1, ":svg:text", 50)(10, CrisisMapComponent_For_37_Conditional_10_Template, 2, 1, ":svg:text", 50);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r8 = ctx.$implicit;
    const $index_r9 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selected() === location_r8.id);
    \u0275\u0275attribute("transform", "translate(" + location_r8.x + " " + location_r8.y + ")")("role", ctx_r2.miniature() ? null : "button")("tabindex", ctx_r2.miniature() ? null : 0)("aria-label", location_r8.name + ", " + location_r8.elevation + " metres elevation. Inspect location.");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.layer() === "people" && location_r8.population > 0 ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("animation-delay", $index_r9 * -0.65 + "s");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(location_r8.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.layer() === "people" ? 9 : 10);
  }
}
function CrisisMapComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 51);
    \u0275\u0275domElement(1, "circle", 52)(2, "circle", 53);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "g");
    \u0275\u0275domElement(4, "rect", 54);
    \u0275\u0275domElementStart(5, "text", 55);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const order_r10 = ctx.$implicit;
    \u0275\u0275attribute("transform", "translate(" + order_r10.location.x + " " + order_r10.location.y + ")");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("transform", "translate(" + (order_r10.location.x - 19) + " " + (order_r10.location.y + 32) + ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u2713 ", order_r10.action.mapLabel);
  }
}
var CrisisMapComponent = class _CrisisMapComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
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
  layer = input(
    "hazard",
    ...ngDevMode ? [{ debugName: "layer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = input(
    "",
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  miniature = input(
    false,
    ...ngDevMode ? [{ debugName: "miniature" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locationSelected = output();
  buildings = computed(
    () => this.config().locations.filter((l) => l.population > 0 && l.kind === "community").flatMap((l) => Array.from({ length: 27 }, (_, i) => ({
      x: l.x - 48 + i % 6 * 16,
      y: l.y - 26 + Math.floor(i / 6) * 14,
      w: 6 + i % 3 * 2,
      h: 5 + i % 2 * 4
    }))),
    ...ngDevMode ? [{ debugName: "buildings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  deployed = computed(
    () => this.state().decisions.map((d) => {
      const action = this.config().actions.find((a) => a.id === d.actionId);
      return { action, location: this.config().locations.find((l) => l.id === action.locationId) };
    }),
    ...ngDevMode ? [{ debugName: "deployed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CrisisMapComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisMapComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisMapComponent, selectors: [["app-crisis-map"]], inputs: { config: [1, "config"], state: [1, "state"], layer: [1, "layer"], selected: [1, "selected"], miniature: [1, "miniature"] }, outputs: { locationSelected: "locationSelected" }, decls: 51, vars: 12, consts: [["viewBox", "0 0 1000 600"], ["id", "crisis-ocean", "x2", "1", "y2", "1"], ["stop-color", "#061a26"], ["offset", "1", "stop-color", "#0d3342"], ["id", "crisis-land", "x2", "0.8", "y2", "1"], ["stop-color", "#1b3942"], ["offset", "0.5", "stop-color", "#163b3b"], ["offset", "1", "stop-color", "#112d32"], ["id", "crisis-hill"], ["stop-color", "#426061", "stop-opacity", ".5"], ["offset", "1", "stop-color", "#213e42", "stop-opacity", "0"], ["id", "crisis-grid", "width", "50", "height", "50", "patternUnits", "userSpaceOnUse"], ["d", "M50 0H0V50", "fill", "none", "stroke", "#6699a5", "stroke-opacity", ".12", "stroke-width", ".6"], ["id", "crisis-hatch", "width", "9", "height", "9", "patternUnits", "userSpaceOnUse", "patternTransform", "rotate(35)"], ["d", "M0 0V9", "stroke", "#f4b566", "stroke-width", "2", "stroke-opacity", ".32"], ["id", "crisis-glow"], ["stdDeviation", "3"], ["width", "1000", "height", "600", "fill", "url(#crisis-ocean)"], ["fill", "url(#crisis-land)", "stroke", "#487b7c", "stroke-width", "1.5"], ["cx", "860", "cy", "112", "rx", "210", "ry", "110", "fill", "url(#crisis-hill)"], ["cx", "829", "cy", "313", "rx", "195", "ry", "130", "fill", "url(#crisis-hill)"], ["fill", "none", "stroke", "#77948b", "stroke-opacity", ".22", "stroke-width", "1"], ["width", "1000", "height", "600", "fill", "url(#crisis-grid)"], [1, "hazard"], ["fill", "none", "stroke", "#72c5da", "stroke-width", "13", "stroke-opacity", ".12", "filter", "url(#crisis-glow)"], ["fill", "none", "stroke", "#5eaeb9"], ["fill", "none", "stroke", "#ade5e9", "stroke-width", "2", "stroke-opacity", ".8", "stroke-dasharray", "3 12 18 12", 1, "river-flow"], ["rx", "1", "fill", "#86a5a0", "opacity", ".35"], [1, "location", 3, "selected"], ["transform", "translate(932 525)", 1, "compass"], ["d", "M0-28-7 0 0-6 7 0Z", "fill", "#b7d3d3"], ["d", "M0-6V13", "stroke", "#b7d3d3"], ["x", "0", "y", "-35", "text-anchor", "middle"], ["transform", "translate(52 552)", 1, "scale"], ["d", "M0-4V4M0 0H100M50-4V4M100-4V4", "stroke", "#aac3c7"], ["y", "20"], ["x", "87", "y", "20"], ["fill", "url(#crisis-hatch)", "stroke", "#f3b160", "stroke-width", "2", "stroke-dasharray", "6 5", 1, "hazard-boundary"], ["fill", "none", "stroke", "#ed9960", "stroke-opacity", ".18"], [1, "road-shadow"], [1, "road"], [1, "resource-route"], [1, "location", 3, "click", "keydown.enter", "keydown.space"], ["x", "-27", "y", "-27", "width", "220", "height", "55", "rx", "12", "fill", "transparent", 1, "hit-area"], ["fill", "#78c2cf", "fill-opacity", ".13", "stroke", "#9ad4d9", "stroke-opacity", ".4"], ["r", "16", 1, "location-halo"], ["r", "16", 1, "location-pulse"], ["r", "6", 1, "location-dot"], ["d", "M-11 0H-7M7 0H11M0-11V-7M0 7V11", "stroke", "currentColor"], ["x", "19", "y", "-6", 1, "location-name"], ["x", "19", "y", "12", 1, "location-detail"], [1, "dispatch-beacon"], ["r", "23", 1, "dispatch-ring"], ["r", "3", "cx", "0", "cy", "-23", 1, "dispatch-orbit"], ["x", "-4", "y", "-11", "width", "158", "height", "20", "rx", "3", "fill", "#123d37", "stroke", "#6cdec0", "stroke-opacity", ".5"], ["x", "2", "y", "3", 1, "order-label"]], template: function CrisisMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275domElement(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "linearGradient", 4);
      \u0275\u0275domElement(6, "stop", 5)(7, "stop", 6)(8, "stop", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "radialGradient", 8);
      \u0275\u0275domElement(10, "stop", 9)(11, "stop", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "pattern", 11);
      \u0275\u0275domElement(13, "path", 12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "pattern", 13);
      \u0275\u0275domElement(15, "path", 14);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "filter", 15);
      \u0275\u0275domElement(17, "feGaussianBlur", 16);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(18, "rect", 17)(19, "path", 18)(20, "ellipse", 19)(21, "ellipse", 20);
      \u0275\u0275repeaterCreate(22, CrisisMapComponent_For_23_Template, 1, 1, ":svg:path", 21, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275domElement(24, "rect", 22);
      \u0275\u0275repeaterCreate(25, CrisisMapComponent_For_26_Template, 2, 5, ":svg:text", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(27, CrisisMapComponent_Conditional_27_Template, 3, 4, ":svg:g", 23);
      \u0275\u0275domElement(28, "path", 24)(29, "path", 25)(30, "path", 26);
      \u0275\u0275repeaterCreate(31, CrisisMapComponent_For_32_Template, 2, 2, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275repeaterCreate(33, CrisisMapComponent_For_34_Template, 1, 4, ":svg:rect", 27, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(35, CrisisMapComponent_Conditional_35_Template, 2, 0);
      \u0275\u0275repeaterCreate(36, CrisisMapComponent_For_37_Template, 11, 11, ":svg:g", 28, _forTrack0);
      \u0275\u0275repeaterCreate(38, CrisisMapComponent_For_39_Template, 7, 3, null, null, _forTrack1);
      \u0275\u0275domElementStart(40, "g", 29);
      \u0275\u0275domElement(41, "path", 30)(42, "path", 31);
      \u0275\u0275domElementStart(43, "text", 32);
      \u0275\u0275text(44, "N");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(45, "g", 33);
      \u0275\u0275domElement(46, "path", 34);
      \u0275\u0275domElementStart(47, "text", 35);
      \u0275\u0275text(48, "0");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "text", 36);
      \u0275\u0275text(50, "2 km");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("miniature", ctx.miniature());
      \u0275\u0275attribute("preserveAspectRatio", ctx.miniature() ? "none" : "xMidYMid meet")("role", ctx.miniature() ? "img" : "group")("aria-label", ctx.config().title + " situation map: select a marked location to inspect conditions");
      \u0275\u0275advance(19);
      \u0275\u0275attribute("d", ctx.config().map.coast);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.config().map.contours);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.config().map.labels);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.layer() === "hazard" ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.config().map.river);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.config().map.river)("stroke-width", 6 + ctx.state().stage * 2);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.config().map.river);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.config().map.roads);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.buildings());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.layer() === "resources" ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.config().locations);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.deployed());
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  font-family: "Segoe UI", sans-serif;\n}\n.geographic-label[_ngcontent-%COMP%] {\n  fill: #658d9a;\n  font-size: 23px;\n  letter-spacing: 10px;\n  opacity: 0.6;\n}\n.terrain-label[_ngcontent-%COMP%] {\n  fill: #8aaba6;\n  font-size: 11px;\n  letter-spacing: 4px;\n  opacity: 0.6;\n}\n.road-shadow[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #101f26;\n  stroke-width: 6;\n}\n.road[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #a9aa83;\n  stroke-width: 2;\n  opacity: 0.65;\n}\n.location[_ngcontent-%COMP%] {\n  color: #a5d9e0;\n  cursor: pointer;\n  outline: none;\n}\n.location-halo[_ngcontent-%COMP%] {\n  fill: #082d36;\n  fill-opacity: 0.6;\n  stroke: currentColor;\n  stroke-opacity: 0.35;\n  stroke-width: 1;\n}\n.location-dot[_ngcontent-%COMP%] {\n  fill: #b7e3e8;\n  stroke: #143f46;\n  stroke-width: 2;\n}\n.location.selected[_ngcontent-%COMP%], \n.location[_ngcontent-%COMP%]:hover, \n.location[_ngcontent-%COMP%]:focus-visible {\n  color: #f9be77;\n}\n.location.selected[_ngcontent-%COMP%]   .location-dot[_ngcontent-%COMP%], \n.location[_ngcontent-%COMP%]:focus-visible   .location-dot[_ngcontent-%COMP%] {\n  fill: #ffc47b;\n}\n.location.selected[_ngcontent-%COMP%]   .location-halo[_ngcontent-%COMP%], \n.location[_ngcontent-%COMP%]:focus-visible   .location-halo[_ngcontent-%COMP%] {\n  stroke-opacity: 1;\n  stroke-width: 2;\n}\n.location-name[_ngcontent-%COMP%] {\n  fill: #e0ece8;\n  font-size: 23px;\n  font-weight: 600;\n  paint-order: stroke;\n  stroke: #0b2830;\n  stroke-width: 4;\n  stroke-linejoin: round;\n}\n.location-detail[_ngcontent-%COMP%] {\n  fill: #99b8b8;\n  font: 12px Consolas, monospace;\n  letter-spacing: 1px;\n  paint-order: stroke;\n  stroke: #0b2830;\n  stroke-width: 3;\n}\n.compass[_ngcontent-%COMP%], \n.scale[_ngcontent-%COMP%] {\n  fill: #aac3c7;\n  font: 10px Consolas, monospace;\n}\n.resource-route[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #76e5c0;\n  stroke-width: 3;\n  stroke-dasharray: 6 6;\n  animation: _ngcontent-%COMP%_flow 7s linear infinite;\n}\n.river-flow[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_river-current 10s linear infinite;\n}\n.hazard[_ngcontent-%COMP%] {\n  transition: transform 1.8s ease;\n}\n.hazard-boundary[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hazard-trace 24s linear infinite;\n}\n.location-pulse[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1;\n  opacity: 0;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.location.selected[_ngcontent-%COMP%]   .location-pulse[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_location-signal 3.8s ease-out infinite;\n}\n.dispatch-beacon[_ngcontent-%COMP%] {\n  pointer-events: none;\n  color: #9eeccc;\n}\n.dispatch-ring[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: currentColor;\n  stroke-opacity: 0.45;\n  stroke-width: 1;\n  stroke-dasharray: 3 5;\n}\n.dispatch-orbit[_ngcontent-%COMP%] {\n  fill: currentColor;\n  transform-origin: 0 0;\n  animation: _ngcontent-%COMP%_dispatch-motion 8s linear infinite;\n  filter: drop-shadow(0 0 4px #9eeccc);\n}\n@keyframes _ngcontent-%COMP%_river-current {\n  to {\n    stroke-dashoffset: -450;\n  }\n}\n@keyframes _ngcontent-%COMP%_hazard-trace {\n  to {\n    stroke-dashoffset: -220;\n  }\n}\n@keyframes _ngcontent-%COMP%_location-signal {\n  0% {\n    opacity: 0.75;\n    scale: 0.7;\n  }\n  80%, 100% {\n    opacity: 0;\n    scale: 2.5;\n  }\n}\n@keyframes _ngcontent-%COMP%_dispatch-motion {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.order-label[_ngcontent-%COMP%] {\n  fill: #9debcf;\n  font-size: 9px;\n}\n.miniature[_ngcontent-%COMP%]   .location-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.miniature[_ngcontent-%COMP%]   .location-detail[_ngcontent-%COMP%], \n.miniature[_ngcontent-%COMP%]   .scale[_ngcontent-%COMP%], \n.miniature[_ngcontent-%COMP%]   .compass[_ngcontent-%COMP%], \n.miniature[_ngcontent-%COMP%]   .terrain-label[_ngcontent-%COMP%] {\n  display: none;\n}\n.miniature[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.miniature[_ngcontent-%COMP%]   .geographic-label[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n@keyframes _ngcontent-%COMP%_flow {\n  to {\n    stroke-dashoffset: -120;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-map.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisMapComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-map", template: `<svg
  viewBox="0 0 1000 600"
  [attr.preserveAspectRatio]="miniature() ? 'none' : 'xMidYMid meet'"
  [attr.role]="miniature() ? 'img' : 'group'"
  [attr.aria-label]="
    config().title + ' situation map: select a marked location to inspect conditions'
  "
  [class.miniature]="miniature()"
>
  <defs>
    <linearGradient id="crisis-ocean" x2="1" y2="1">
      <stop stop-color="#061a26" />
      <stop offset="1" stop-color="#0d3342" />
    </linearGradient>
    <linearGradient id="crisis-land" x2="0.8" y2="1">
      <stop stop-color="#1b3942" />
      <stop offset="0.5" stop-color="#163b3b" />
      <stop offset="1" stop-color="#112d32" />
    </linearGradient>
    <radialGradient id="crisis-hill">
      <stop stop-color="#426061" stop-opacity=".5" />
      <stop offset="1" stop-color="#213e42" stop-opacity="0" />
    </radialGradient>
    <pattern id="crisis-grid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M50 0H0V50" fill="none" stroke="#6699a5" stroke-opacity=".12" stroke-width=".6" />
    </pattern>
    <pattern
      id="crisis-hatch"
      width="9"
      height="9"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(35)"
    >
      <path d="M0 0V9" stroke="#f4b566" stroke-width="2" stroke-opacity=".32" />
    </pattern>
    <filter id="crisis-glow"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  <rect width="1000" height="600" fill="url(#crisis-ocean)" />
  <path
    [attr.d]="config().map.coast"
    fill="url(#crisis-land)"
    stroke="#487b7c"
    stroke-width="1.5"
  />
  <ellipse cx="860" cy="112" rx="210" ry="110" fill="url(#crisis-hill)" />
  <ellipse cx="829" cy="313" rx="195" ry="130" fill="url(#crisis-hill)" />
  @for (path of config().map.contours; track $index) {
    <path [attr.d]="path" fill="none" stroke="#77948b" stroke-opacity=".22" stroke-width="1" />
  }
  <rect width="1000" height="600" fill="url(#crisis-grid)" />
  @for (label of config().map.labels; track $index) {
    <text
      [attr.x]="label.x"
      [attr.y]="label.y"
      [attr.class]="label.kind === 'water' ? 'geographic-label' : 'terrain-label'"
      [attr.transform]="'rotate(' + label.rotation + ' ' + label.x + ' ' + label.y + ')'"
    >
      {{ label.text }}
    </text>
  }
  @if (layer() === 'hazard') {
    <g
      class="hazard"
      [attr.transform]="
        'translate(480 350) scale(' + (0.75 + state().stage * 0.12) + ') translate(-480 -350)'
      "
    >
      <path
        class="hazard-boundary"
        [attr.d]="config().map.hazard"
        fill="url(#crisis-hatch)"
        stroke="#f3b160"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
      <path
        [attr.d]="config().map.river"
        fill="none"
        stroke="#ed9960"
        [attr.stroke-width]="22 + state().stage * 12"
        stroke-opacity=".18"
      />
    </g>
  }
  <path
    [attr.d]="config().map.river"
    fill="none"
    stroke="#72c5da"
    stroke-width="13"
    stroke-opacity=".12"
    filter="url(#crisis-glow)"
  />
  <path
    [attr.d]="config().map.river"
    fill="none"
    stroke="#5eaeb9"
    [attr.stroke-width]="6 + state().stage * 2"
  />
  <path
    class="river-flow"
    [attr.d]="config().map.river"
    fill="none"
    stroke="#ade5e9"
    stroke-width="2"
    stroke-opacity=".8"
    stroke-dasharray="3 12 18 12"
  />
  @for (road of config().map.roads; track $index) {
    <path [attr.d]="road" class="road-shadow" />
    <path [attr.d]="road" class="road" />
  }
  @for (b of buildings(); track $index) {
    <rect
      [attr.x]="b.x"
      [attr.y]="b.y"
      [attr.width]="b.w"
      [attr.height]="b.h"
      rx="1"
      fill="#86a5a0"
      opacity=".35"
    />
  }
  @if (layer() === 'resources') {
    @for (road of config().map.roads; track $index) {
      <path [attr.d]="road" class="resource-route" />
    }
  }
  @for (location of config().locations; track location.id) {
    <g
      class="location"
      [class.selected]="selected() === location.id"
      [attr.transform]="'translate(' + location.x + ' ' + location.y + ')'"
      [attr.role]="miniature() ? null : 'button'"
      [attr.tabindex]="miniature() ? null : 0"
      [attr.aria-label]="
        location.name + ', ' + location.elevation + ' metres elevation. Inspect location.'
      "
      (click)="locationSelected.emit(location.id)"
      (keydown.enter)="locationSelected.emit(location.id)"
      (keydown.space)="$event.preventDefault(); locationSelected.emit(location.id)"
    >
      <rect class="hit-area" x="-27" y="-27" width="220" height="55" rx="12" fill="transparent" />
      @if (layer() === 'people' && location.population > 0) {
        <circle
          [attr.r]="18 + location.population / 70"
          fill="#78c2cf"
          fill-opacity=".13"
          stroke="#9ad4d9"
          stroke-opacity=".4"
        />
      }
      <circle class="location-halo" r="16" />
      <circle class="location-pulse" r="16" [style.animation-delay]="$index * -0.65 + 's'" />
      <circle r="6" class="location-dot" />
      <path d="M-11 0H-7M7 0H11M0-11V-7M0 7V11" stroke="currentColor" />
      <text x="19" y="-6" class="location-name">{{ location.name }}</text>
      @if (layer() === 'people') {
        <text x="19" y="12" class="location-detail">
          {{
            location.population
              ? location.population + (location.kind === 'shelter' ? ' spaces' : ' people')
              : location.elevation + ' m elevation'
          }}
        </text>
      } @else {
        <text x="19" y="12" class="location-detail">
          {{ location.kind === 'sensor' ? 'TELEMETRY' : location.elevation + ' M ELEVATION' }}
        </text>
      }
    </g>
  }
  @for (order of deployed(); track order.action.id) {
    <g
      class="dispatch-beacon"
      [attr.transform]="'translate(' + order.location.x + ' ' + order.location.y + ')'"
    >
      <circle class="dispatch-ring" r="23" />
      <circle class="dispatch-orbit" r="3" cx="0" cy="-23" />
    </g>
    <g
      [attr.transform]="
        'translate(' + (order.location.x - 19) + ' ' + (order.location.y + 32) + ')'
      "
    >
      <rect
        x="-4"
        y="-11"
        width="158"
        height="20"
        rx="3"
        fill="#123d37"
        stroke="#6cdec0"
        stroke-opacity=".5"
      />
      <text class="order-label" x="2" y="3">\u2713 {{ order.action.mapLabel }}</text>
    </g>
  }
  <g class="compass" transform="translate(932 525)">
    <path d="M0-28-7 0 0-6 7 0Z" fill="#b7d3d3" />
    <path d="M0-6V13" stroke="#b7d3d3" />
    <text x="0" y="-35" text-anchor="middle">N</text>
  </g>
  <g class="scale" transform="translate(52 552)">
    <path d="M0-4V4M0 0H100M50-4V4M100-4V4" stroke="#aac3c7" />
    <text y="20">0</text>
    <text x="87" y="20">2 km</text>
  </g>
</svg>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-map.component.scss */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  font-family: "Segoe UI", sans-serif;\n}\n.geographic-label {\n  fill: #658d9a;\n  font-size: 23px;\n  letter-spacing: 10px;\n  opacity: 0.6;\n}\n.terrain-label {\n  fill: #8aaba6;\n  font-size: 11px;\n  letter-spacing: 4px;\n  opacity: 0.6;\n}\n.road-shadow {\n  fill: none;\n  stroke: #101f26;\n  stroke-width: 6;\n}\n.road {\n  fill: none;\n  stroke: #a9aa83;\n  stroke-width: 2;\n  opacity: 0.65;\n}\n.location {\n  color: #a5d9e0;\n  cursor: pointer;\n  outline: none;\n}\n.location-halo {\n  fill: #082d36;\n  fill-opacity: 0.6;\n  stroke: currentColor;\n  stroke-opacity: 0.35;\n  stroke-width: 1;\n}\n.location-dot {\n  fill: #b7e3e8;\n  stroke: #143f46;\n  stroke-width: 2;\n}\n.location.selected,\n.location:hover,\n.location:focus-visible {\n  color: #f9be77;\n}\n.location.selected .location-dot,\n.location:focus-visible .location-dot {\n  fill: #ffc47b;\n}\n.location.selected .location-halo,\n.location:focus-visible .location-halo {\n  stroke-opacity: 1;\n  stroke-width: 2;\n}\n.location-name {\n  fill: #e0ece8;\n  font-size: 23px;\n  font-weight: 600;\n  paint-order: stroke;\n  stroke: #0b2830;\n  stroke-width: 4;\n  stroke-linejoin: round;\n}\n.location-detail {\n  fill: #99b8b8;\n  font: 12px Consolas, monospace;\n  letter-spacing: 1px;\n  paint-order: stroke;\n  stroke: #0b2830;\n  stroke-width: 3;\n}\n.compass,\n.scale {\n  fill: #aac3c7;\n  font: 10px Consolas, monospace;\n}\n.resource-route {\n  fill: none;\n  stroke: #76e5c0;\n  stroke-width: 3;\n  stroke-dasharray: 6 6;\n  animation: flow 7s linear infinite;\n}\n.river-flow {\n  animation: river-current 10s linear infinite;\n}\n.hazard {\n  transition: transform 1.8s ease;\n}\n.hazard-boundary {\n  animation: hazard-trace 24s linear infinite;\n}\n.location-pulse {\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1;\n  opacity: 0;\n  transform-box: fill-box;\n  transform-origin: center;\n}\n.location.selected .location-pulse {\n  animation: location-signal 3.8s ease-out infinite;\n}\n.dispatch-beacon {\n  pointer-events: none;\n  color: #9eeccc;\n}\n.dispatch-ring {\n  fill: none;\n  stroke: currentColor;\n  stroke-opacity: 0.45;\n  stroke-width: 1;\n  stroke-dasharray: 3 5;\n}\n.dispatch-orbit {\n  fill: currentColor;\n  transform-origin: 0 0;\n  animation: dispatch-motion 8s linear infinite;\n  filter: drop-shadow(0 0 4px #9eeccc);\n}\n@keyframes river-current {\n  to {\n    stroke-dashoffset: -450;\n  }\n}\n@keyframes hazard-trace {\n  to {\n    stroke-dashoffset: -220;\n  }\n}\n@keyframes location-signal {\n  0% {\n    opacity: 0.75;\n    scale: 0.7;\n  }\n  80%, 100% {\n    opacity: 0;\n    scale: 2.5;\n  }\n}\n@keyframes dispatch-motion {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.order-label {\n  fill: #9debcf;\n  font-size: 9px;\n}\n.miniature .location-name {\n  font-size: 18px;\n}\n.miniature .location-detail,\n.miniature .scale,\n.miniature .compass,\n.miniature .terrain-label {\n  display: none;\n}\n.miniature .location {\n  pointer-events: none;\n}\n.miniature .geographic-label {\n  font-size: 28px;\n}\n@keyframes flow {\n  to {\n    stroke-dashoffset: -120;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-map.component.css.map */\n'] }]
  }], null, { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], layer: [{ type: Input, args: [{ isSignal: true, alias: "layer", required: false }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: false }] }], miniature: [{ type: Input, args: [{ isSignal: true, alias: "miniature", required: false }] }], locationSelected: [{ type: Output, args: ["locationSelected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisMapComponent, { className: "CrisisMapComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-map.component.ts", lineNumber: 9 });
})();

// src/app/templates/crisis-operations/ui/crisis-monitor-wall.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.actionId;
function CrisisMonitorWallComponent_Conditional_23_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r4 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 2, value_r3, "1.2-2"));
  }
}
function CrisisMonitorWallComponent_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275repeaterCreate(1, CrisisMonitorWallComponent_Conditional_23_Conditional_4_For_2_Template, 5, 5, "span", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.values());
  }
}
function CrisisMonitorWallComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "button", 29);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_23_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.history.set(!ctx_r1.history()));
    });
    \u0275\u0275text(2);
    \u0275\u0275element(3, "app-crisis-icon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CrisisMonitorWallComponent_Conditional_23_Conditional_4_Template, 3, 0, "div", 31);
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, "Use the trend alongside field reports.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.history());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.history() ? "Hide readings" : "Compare readings");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.history() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Observed data \xB7 ", ctx_r1.runtime.time());
  }
}
function CrisisMonitorWallComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "button", 32);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_46_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cameraZoom.set(!ctx_r1.cameraZoom()));
    });
    \u0275\u0275element(2, "app-crisis-icon", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 29);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_46_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.locate.emit(ctx_r1.runtime.config.newsCamera.locationId));
    });
    \u0275\u0275text(5, " Locate on table");
    \u0275\u0275element(6, "app-crisis-icon", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.cameraZoom());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.cameraZoom() ? "Wide view" : "Inspect image");
  }
}
function CrisisMonitorWallComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 22)(1, "button", 35);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_56_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReport());
    });
    \u0275\u0275text(2, "\u2190 All reports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 36)(12, "button", 37);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_56_Template_button_click_12_listener() {
      const selected_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pin(selected_r7));
    });
    \u0275\u0275element(13, "app-crisis-icon", 38);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 39);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_56_Template_button_click_15_listener() {
      const selected_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.locate.emit(selected_r7.locationId));
    });
    \u0275\u0275element(16, "app-crisis-icon", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const selected_r7 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap("confidence " + selected_r7.confidence.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", selected_r7.confidence, " \xB7 ", ctx_r1.runtime.time(selected_r7.minute));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(selected_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(selected_r7.source);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(selected_r7.body);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.runtime.state().sharedEvidenceIds.includes(selected_r7.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().sharedEvidenceIds.includes(selected_r7.id) ? "Pinned to table" : "Pin evidence");
  }
}
function CrisisMonitorWallComponent_Conditional_57_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_57_For_1_Template_button_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.read(item_r9));
    });
    \u0275\u0275elementStart(1, "span", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("data-report-id", item_r9.id)("tabindex", ctx_r1.active() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.time(item_r9.minute));
    \u0275\u0275advance();
    \u0275\u0275classMap("confidence " + item_r9.confidence.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.confidence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.source);
  }
}
function CrisisMonitorWallComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CrisisMonitorWallComponent_Conditional_57_For_1_Template, 9, 8, "button", 40, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.reports());
  }
}
function CrisisMonitorWallComponent_For_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const crew_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("assigned", crew_r10 > ctx_r1.runtime.crews());
  }
}
function CrisisMonitorWallComponent_Conditional_77_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r12.action.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r12.action.crews);
  }
}
function CrisisMonitorWallComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CrisisMonitorWallComponent_Conditional_77_For_4_Template, 6, 2, "div", 44, _forTrack12);
    \u0275\u0275elementStart(5, "button", 29);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_77_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigate.emit("command"));
    });
    \u0275\u0275text(6, " Coordinate response");
    \u0275\u0275element(7, "app-crisis-icon", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.orders().length, " RESPONSE ORDERS DISPATCHED");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.orders());
  }
}
function CrisisMonitorWallComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function CrisisMonitorWallComponent_Conditional_79_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activate(ctx_r1.selectedScreen()));
    });
    \u0275\u0275elementStart(1, "span", 47);
    \u0275\u0275text(2, "Monitor wall ");
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "\u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "CLICK TO INSPECT");
    \u0275\u0275elementEnd()()();
  }
}
var CrisisMonitorWallComponent = class _CrisisMonitorWallComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  active = input(
    false,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  available = input(
    true,
    ...ngDevMode ? [{ debugName: "available" }] : (
      /* istanbul ignore next */
      []
    )
  );
  open = output();
  navigate = output();
  locate = output();
  selectedScreen = signal(
    "camera",
    ...ngDevMode ? [{ debugName: "selectedScreen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cameraZoom = signal(
    false,
    ...ngDevMode ? [{ debugName: "cameraZoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = signal(
    false,
    ...ngDevMode ? [{ debugName: "history" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedReportId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedReportId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reports = computed(
    () => this.runtime.reports().filter((r) => !r.roleIds.length || this.runtime.state().sharedEvidenceIds.includes(r.id) || r.confidence === "Unverified"),
    ...ngDevMode ? [{ debugName: "reports" }] : (
      /* istanbul ignore next */
      []
    )
  );
  report = computed(
    () => this.reports().find((r) => r.id === this.selectedReportId()),
    ...ngDevMode ? [{ debugName: "report" }] : (
      /* istanbul ignore next */
      []
    )
  );
  values = computed(
    () => [
      ...this.runtime.config.primaryMetric.initialTrend,
      ...this.runtime.config.bulletins.slice(1, this.runtime.state().stage + 1).map((b) => b.metricValue)
    ],
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  points = computed(
    () => {
      const values = this.values(), min = Math.min(...values) * 0.9, max = Math.max(...values);
      return values.map((n, i) => `${i ? "L" : "M"}${i * 200 / (values.length - 1)} ${85 - (n - min) / (max - min || 1) * 76}`).join(" ");
    },
    ...ngDevMode ? [{ debugName: "points" }] : (
      /* istanbul ignore next */
      []
    )
  );
  crewSlots = Array.from({ length: this.runtime.config.crews }, (_, i) => i + 1);
  focusTimer;
  activate(screen) {
    this.selectedScreen.set(screen);
    if (!this.active())
      this.open.emit();
  }
  read(report) {
    this.activate("wire");
    this.runtime.read(report.id);
    this.selectedReportId.set(report.id);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.element.nativeElement.querySelector(".wire-detail")?.focus({ preventScroll: true }), 0);
  }
  pin(report) {
    this.runtime.share(report.id);
  }
  closeReport() {
    const id = this.selectedReportId();
    this.selectedReportId.set("");
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const buttons = this.element.nativeElement.querySelectorAll("[data-report-id]");
      [...buttons].find((b) => b.dataset["reportId"] === id)?.focus({ preventScroll: true });
    }, 0);
  }
  ngOnDestroy() {
    clearTimeout(this.focusTimer);
  }
  static \u0275fac = function CrisisMonitorWallComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisMonitorWallComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisMonitorWallComponent, selectors: [["app-crisis-monitor-wall"]], inputs: { active: [1, "active"], available: [1, "available"] }, outputs: { open: "open", navigate: "navigate", locate: "locate" }, decls: 80, vars: 40, consts: [[1, "monitor-bank"], ["aria-label", "Screen 1: sensor telemetry", 1, "wall-screen", "telemetry-screen", 3, "click"], [1, "screen-indicator"], [1, "screen-body", "telemetry-body"], [1, "metric-label"], [1, "metric-reading"], ["viewBox", "0 0 200 96", "role", "img", 1, "telemetry-chart"], ["d", "M0 20H200M0 50H200M0 80H200", "stroke", "#477786", "stroke-width", ".5", "stroke-dasharray", "2 4"], ["fill", "#76d6c917"], ["stroke", "#9cf1de", "stroke-width", "1.8", "fill", "none"], [1, "metric-caption"], [1, "screen-extra"], [1, "bezel-light"], ["aria-label", "Screen 2: field camera", 1, "wall-screen", "camera-screen", 3, "click"], [1, "camera-picture"], [3, "src", "alt"], ["aria-hidden", "true", 1, "camera-graticule"], [1, "camera-timestamp"], [1, "camera-lower"], [1, "camera-controls", "screen-extra"], ["aria-label", "Screen 3: incoming reports", 1, "wall-screen", "wire-screen", 3, "click"], [1, "screen-body", "wire-body"], ["tabindex", "-1", 1, "wire-detail"], ["aria-label", "Screen 4: response resources", 1, "wall-screen", "resources-screen", 3, "click"], [1, "screen-body", "resource-body"], [1, "resource-reading"], [1, "crew-bars"], [3, "assigned"], ["data-room-entry", "news", "aria-label", "Open monitor wall", 1, "screen-hit"], [1, "screen-action", 3, "click"], ["name", "station"], ["aria-label", "Sensor reading history", 1, "reading-history"], ["data-monitor-first-control", "", 1, "screen-action", 3, "click"], ["name", "expand"], ["name", "map"], [1, "back-to-wire", 3, "click"], [1, "report-buttons"], [1, "screen-action", 3, "click", "disabled"], ["name", "pin"], ["aria-label", "Locate selected report on situation table", 1, "screen-action", 3, "click"], [1, "wire-item"], [1, "wire-item", 3, "click"], [1, "wire-meta"], [1, "order-count"], [1, "dispatch-line"], ["name", "command"], ["data-room-entry", "news", "aria-label", "Open monitor wall", 1, "screen-hit", 3, "click"], [1, "wall-surface-label"]], template: function CrisisMonitorWallComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1);
      \u0275\u0275listener("click", function CrisisMonitorWallComponent_Template_section_click_1_listener() {
        return ctx.selectedScreen.set("telemetry");
      });
      \u0275\u0275elementStart(2, "header")(3, "span");
      \u0275\u0275element(4, "i");
      \u0275\u0275text(5, "01 / TELEMETRY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 2);
      \u0275\u0275text(7, "DATA");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 3)(9, "span", 4);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 5)(12, "strong");
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(17, "svg", 6);
      \u0275\u0275element(18, "path", 7)(19, "path", 8)(20, "path", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(21, "span", 10);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, CrisisMonitorWallComponent_Conditional_23_Template, 9, 4, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "section", 13);
      \u0275\u0275listener("click", function CrisisMonitorWallComponent_Template_section_click_25_listener() {
        return ctx.selectedScreen.set("camera");
      });
      \u0275\u0275elementStart(26, "header")(27, "span");
      \u0275\u0275element(28, "i");
      \u0275\u0275text(29, "02 / FIELD CAMERA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 2);
      \u0275\u0275text(31, "EXERCISE STILL");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 14);
      \u0275\u0275element(33, "img", 15);
      \u0275\u0275elementStart(34, "div", 16)(35, "span");
      \u0275\u0275text(36, "+");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "span", 17);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 18)(40, "span");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "h2");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "p");
      \u0275\u0275text(45);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(46, CrisisMonitorWallComponent_Conditional_46_Template, 7, 2, "div", 19);
      \u0275\u0275element(47, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "section", 20);
      \u0275\u0275listener("click", function CrisisMonitorWallComponent_Template_section_click_48_listener() {
        return ctx.selectedScreen.set("wire");
      });
      \u0275\u0275elementStart(49, "header")(50, "span");
      \u0275\u0275element(51, "i");
      \u0275\u0275text(52, "03 / INCOMING WIRE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "span", 2);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 21);
      \u0275\u0275conditionalCreate(56, CrisisMonitorWallComponent_Conditional_56_Template, 17, 9, "article", 22)(57, CrisisMonitorWallComponent_Conditional_57_Template, 2, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275element(58, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "section", 23);
      \u0275\u0275listener("click", function CrisisMonitorWallComponent_Template_section_click_59_listener() {
        return ctx.selectedScreen.set("resources");
      });
      \u0275\u0275elementStart(60, "header")(61, "span");
      \u0275\u0275element(62, "i");
      \u0275\u0275text(63, "04 / RESPONSE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "span", 2);
      \u0275\u0275text(65, "DISPATCH");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div", 24)(67, "div", 25)(68, "strong");
      \u0275\u0275text(69);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "span");
      \u0275\u0275text(71);
      \u0275\u0275element(72, "br");
      \u0275\u0275text(73, "AVAILABLE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 26);
      \u0275\u0275repeaterCreate(75, CrisisMonitorWallComponent_For_76_Template, 1, 2, "i", 27, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(77, CrisisMonitorWallComponent_Conditional_77_Template, 8, 1, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(78, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(79, CrisisMonitorWallComponent_Conditional_79_Template, 7, 0, "button", 28);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_24_0;
      \u0275\u0275classProp("engaged", ctx.active());
      \u0275\u0275attribute("data-selected", ctx.selectedScreen())("inert", ctx.available() ? null : "")("aria-hidden", ctx.available() ? null : true);
      \u0275\u0275advance();
      \u0275\u0275classProp("selected", ctx.selectedScreen() === "telemetry");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.runtime.config.primaryMetric.label);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 37, ctx.runtime.bulletin().metricValue, "1.1-1"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.config.primaryMetric.unit);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "Recorded readings: " + ctx.values().join(", ") + " " + ctx.runtime.config.primaryMetric.unit);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("d", ctx.points() + " L200 96 L0 96 Z");
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.points());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.primaryMetric.caption);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.active() ? 23 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("selected", ctx.selectedScreen() === "camera");
      \u0275\u0275advance(7);
      \u0275\u0275classProp("magnified", ctx.cameraZoom());
      \u0275\u0275advance();
      \u0275\u0275property("src", ctx.runtime.config.newsImage, \u0275\u0275sanitizeUrl)("alt", ctx.runtime.config.newsCamera.description);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.runtime.config.newsCamera.label, " \xB7 CAPTURED ", ctx.runtime.time(ctx.runtime.config.newsCamera.minute));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.config.newsCamera.network);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.bulletin().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.bulletin().summary);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.active() ? 46 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("selected", ctx.selectedScreen() === "wire");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.reports().length, " REPORTS");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_24_0 = ctx.active() && ctx.report()) ? 56 : 57, tmp_24_0);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("selected", ctx.selectedScreen() === "resources");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.runtime.crews().toString().padStart(2, "0"));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("OF ", ctx.runtime.config.crews, " CREWS");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.crewSlots);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.active() ? 77 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.active() && ctx.available() ? 79 : -1);
    }
  }, dependencies: [CrisisIconComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  left: 23.25%;\n  top: 29.5%;\n  width: 53.7%;\n  height: 20.2%;\n  --%NS%screen-font: 7px;\n  transition: top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1);\n  pointer-events: auto;\n}\n.wall-focused[_nghost-%COMP%] {\n  top: 27.5%;\n  height: 29.5%;\n  --%NS%screen-font: 8px;\n}\n[_nghost-%COMP%]:has(.monitor-bank[inert]) {\n  pointer-events: none;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.monitor-bank[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  color: #d6e8eb;\n  font-family: "Segoe UI", sans-serif;\n  font-size: var(--%NS%screen-font);\n}\n.wall-screen[_ngcontent-%COMP%] {\n  position: absolute;\n  background: #061621;\n  border: 3px solid #111d25;\n  border-radius: 2px;\n  box-shadow:\n    0 0 0 1px rgba(107, 137, 151, 0.2666666667),\n    0 4px 10px rgba(0, 0, 0, 0.6),\n    inset 0 0 30px #07212c;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    box-shadow 0.3s;\n}\n.wall-screen[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(transparent 0 3px, rgba(131, 173, 199, 0.0235294118) 3px 4px);\n  pointer-events: none;\n  z-index: 3;\n}\n.wall-screen.selected[_ngcontent-%COMP%] {\n  box-shadow:\n    0 0 0 1px rgba(129, 175, 172, 0.4),\n    0 0 18px rgba(112, 195, 194, 0.1019607843),\n    0 4px 10px rgba(0, 0, 0, 0.6);\n}\n.wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  padding: 5px 7px;\n  background: #162c39;\n  border-bottom: 1px solid rgba(80, 115, 128, 0.2666666667);\n  flex-shrink: 0;\n  font: 5px Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #9dc0ca;\n}\n.wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  background: #9fd6c9;\n  box-shadow: 0 0 5px rgba(163, 255, 222, 0.3333333333);\n}\n.screen-indicator[_ngcontent-%COMP%] {\n  color: #729dab;\n  font-size: 4px;\n}\n.bezel-light[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 8px;\n  width: 7px;\n  height: 1px;\n  background: #acdac6;\n  box-shadow: 0 0 5px rgba(189, 255, 224, 0.6);\n  z-index: 4;\n}\n.telemetry-screen[_ngcontent-%COMP%] {\n  left: 0;\n  top: 25%;\n  width: 22.4%;\n  height: 57.5%;\n}\n.camera-screen[_ngcontent-%COMP%] {\n  left: 26.8%;\n  top: 0;\n  width: 46.2%;\n  height: 100%;\n}\n.wire-screen[_ngcontent-%COMP%] {\n  left: 76.6%;\n  top: 0;\n  width: 23.4%;\n  height: 49%;\n}\n.resources-screen[_ngcontent-%COMP%] {\n  left: 76.6%;\n  top: 52%;\n  width: 23.4%;\n  height: 48%;\n}\n.engaged[_ngcontent-%COMP%]   .telemetry-screen[_ngcontent-%COMP%] {\n  top: 0;\n  height: 100%;\n}\n@media (min-width: 701px) {\n  .engaged[data-selected=wire][_ngcontent-%COMP%]   .wire-screen[_ngcontent-%COMP%] {\n    height: 67%;\n  }\n  .engaged[data-selected=wire][_ngcontent-%COMP%]   .resources-screen[_ngcontent-%COMP%] {\n    top: 70%;\n    height: 30%;\n  }\n  .engaged[data-selected=wire][_ngcontent-%COMP%]   .resources-screen[_ngcontent-%COMP%]   .order-count[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .engaged[data-selected=resources][_ngcontent-%COMP%]   .wire-screen[_ngcontent-%COMP%] {\n    height: 38%;\n  }\n  .engaged[data-selected=resources][_ngcontent-%COMP%]   .resources-screen[_ngcontent-%COMP%] {\n    top: 41%;\n    height: 59%;\n  }\n}\n.screen-body[_ngcontent-%COMP%] {\n  padding: 8px;\n  overflow: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #365c6b #071d29;\n  min-height: 0;\n  flex: 1;\n}\n.monitor-bank[_ngcontent-%COMP%]:not(.engaged)   .screen-body[_ngcontent-%COMP%] {\n  overflow: hidden;\n  padding: 5px 7px;\n}\n.monitor-bank[_ngcontent-%COMP%]:not(.engaged)   .metric-reading[_ngcontent-%COMP%] {\n  margin: 2px 0;\n}\n.monitor-bank[_ngcontent-%COMP%]:not(.engaged)   .metric-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.monitor-bank[_ngcontent-%COMP%]:not(.engaged)   .telemetry-chart[_ngcontent-%COMP%] {\n  min-height: 10px;\n}\n.screen-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 3px;\n}\n.screen-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #426b79;\n}\n.screen-body[_ngcontent-%COMP%]::-webkit-scrollbar-button {\n  display: none;\n}\n.telemetry-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.metric-label[_ngcontent-%COMP%] {\n  font: 5px/1.5 Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #8fb8c3;\n}\n.metric-reading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 5px;\n  margin: 4px 0;\n}\n.metric-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 300;\n  line-height: 1.1;\n}\n.metric-reading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #80b2b7;\n}\n.telemetry-chart[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 13px;\n  height: 38%;\n  flex: 1;\n}\n.metric-caption[_ngcontent-%COMP%] {\n  font: 4px/1.5 Consolas, monospace;\n  color: #b4bc97;\n  letter-spacing: 0.4px;\n  margin-top: 3px;\n}\n.camera-picture[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  flex: 1;\n  min-height: 0;\n}\n.camera-picture[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  object-fit: cover;\n  filter: brightness(0.82) saturate(0.65);\n  transition: transform 1s cubic-bezier(0.2, 0.65, 0.15, 1);\n  transform-origin: 50% 54%;\n}\n.camera-picture.magnified[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  transform: scale(1.65);\n}\n.camera-graticule[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 15% 7% 33%;\n  border: 1px solid rgba(208, 244, 237, 0.1333333333);\n  pointer-events: none;\n  display: grid;\n  place-items: center;\n}\n.camera-graticule[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: rgba(201, 239, 236, 0.4666666667);\n  font-size: 16px;\n  font-weight: 200;\n}\n.camera-timestamp[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  left: 7px;\n  color: #c8dad9;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n  text-shadow: 0 1px 3px #000;\n}\n.camera-lower[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: auto 0 0;\n  background: linear-gradient(transparent, rgba(7, 27, 43, 0.8509803922) 32%);\n  padding: 25px 8px 7px;\n}\n.camera-lower[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 4px;\n  background: #bd9d68;\n  color: #142936;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.7px;\n  margin-bottom: 5px;\n}\n.camera-lower[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 450;\n  font-size: 10px;\n  line-height: 1.25;\n  margin: 0;\n}\n.camera-lower[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 7px;\n  line-height: 1.6;\n  color: #a6c3cd;\n  margin: 7px 0 0;\n  display: none;\n}\n.camera-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 6px;\n  padding: 6px;\n  flex-shrink: 0;\n  border-top: 1px solid rgba(59, 105, 120, 0.3019607843);\n  background: #0b2430;\n}\n.screen-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 7px;\n  padding: 6px 7px;\n  background: #153740;\n  border: 1px solid #416d76;\n  color: #bfddd9;\n  cursor: pointer;\n  font: inherit;\n  font-size: 6px;\n  line-height: 1.35;\n}\n.screen-action[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 9px;\n  height: 9px;\n}\n.screen-action[_ngcontent-%COMP%]:hover {\n  background: #234c54;\n  border-color: #96c9c0;\n}\n.screen-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.screen-action[_ngcontent-%COMP%]:focus-visible, \n.wire-item[_ngcontent-%COMP%]:focus-visible, \n.back-to-wire[_ngcontent-%COMP%]:focus-visible {\n  outline: 1.5px solid #c3f1d9;\n  outline-offset: -2px;\n}\n.screen-hit[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  background: transparent;\n  border: 0;\n  cursor: zoom-in;\n  outline: none;\n}\n.wall-surface-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 12px);\n  left: 50%;\n  transform: translateX(-50%);\n  color: #d9fff4;\n  font: 11px "Segoe UI", sans-serif;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  text-shadow: 0 2px 8px #00171d;\n  opacity: 0.75;\n  transition: opacity 0.22s;\n  pointer-events: none;\n}\n.wall-surface-label[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  font-weight: 400;\n}\n.wall-surface-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  margin-top: 6px;\n}\n.monitor-bank[_ngcontent-%COMP%]:not(.engaged):has(.screen-hit:is(:hover, :focus-visible))   .wall-screen[_ngcontent-%COMP%] {\n  border-color: #b1f9df;\n  box-shadow:\n    0 0 0 1px #d6ffee,\n    0 0 16px rgba(139, 255, 228, 0.6666666667),\n    0 0 36px rgba(118, 244, 223, 0.3333333333);\n}\n.screen-hit[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .wall-surface-label[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.screen-extra[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_screen-wake 0.65s ease 0.45s both;\n}\n.screen-extra[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 6px;\n  color: #8aafbd;\n  line-height: 1.75;\n  margin: 12px 0 0;\n}\n.screen-extra[_ngcontent-%COMP%]    > .screen-action[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 12px;\n}\n.reading-history[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  margin-top: 10px;\n  border-top: 1px solid #3b606a;\n  font: 7px Consolas, monospace;\n}\n.reading-history[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  padding: 7px 3px;\n  border-bottom: 1px solid rgba(52, 80, 91, 0.3333333333);\n  text-align: center;\n}\n.reading-history[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 4px;\n  margin-bottom: 3px;\n  color: #779aaa;\n}\n.wire-body[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.wire-item[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  border: 0;\n  border-bottom: 1px solid rgba(69, 100, 116, 0.3333333333);\n  width: 100%;\n  background: transparent;\n  color: #cbdfe4;\n  padding: 6px 7px;\n  cursor: pointer;\n  font: inherit;\n}\n.wire-item[_ngcontent-%COMP%]:hover {\n  background: #29424e;\n}\n.wire-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  font: 4px Consolas, monospace;\n  color: #88aebb;\n}\n.confidence[_ngcontent-%COMP%] {\n  color: #a5d4bc;\n  font: 4px Consolas, monospace;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.confidence.forecast[_ngcontent-%COMP%] {\n  color: #edc187;\n}\n.confidence.unverified[_ngcontent-%COMP%] {\n  color: #efa68c;\n}\n.wire-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 6px;\n  font-weight: 500;\n  display: block;\n  margin: 4px 0;\n  line-height: 1.4;\n}\n.wire-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 4px;\n  color: #7ca5b6;\n}\n.wire-detail[_ngcontent-%COMP%] {\n  padding: 7px;\n  outline: none;\n}\n.wire-detail[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  font-size: 8px;\n  font-weight: 500;\n  line-height: 1.4;\n  margin: 5px 0;\n}\n.wire-detail[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  font-size: 5px;\n  color: #8eabb8;\n}\n.wire-detail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 7px;\n  line-height: 1.75;\n  margin: 8px 0;\n  color: #b7ccd3;\n}\n.back-to-wire[_ngcontent-%COMP%] {\n  display: block;\n  font: 5px Consolas, monospace;\n  color: #95c3c8;\n  background: transparent;\n  border: 0;\n  padding: 0 0 9px;\n  cursor: pointer;\n}\n.report-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  position: sticky;\n  bottom: -7px;\n  background: #071d29;\n  padding: 5px 0;\n}\n.report-buttons[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\n.resource-body[_ngcontent-%COMP%] {\n  padding: 7px;\n}\n.resource-reading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n.resource-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 23px;\n  font-weight: 300;\n  line-height: 1;\n}\n.resource-reading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 4px/1.6 Consolas, monospace;\n  letter-spacing: 0.5px;\n  color: #8db3bd;\n}\n.crew-bars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n  margin-top: 8px;\n}\n.crew-bars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 2px;\n  flex: 1;\n  background: #a6d9c5;\n  box-shadow: 0 0 5px rgba(159, 232, 201, 0.1843137255);\n}\n.crew-bars[_ngcontent-%COMP%]   i.assigned[_ngcontent-%COMP%] {\n  background: #365866;\n  box-shadow: none;\n}\n.order-count[_ngcontent-%COMP%] {\n  display: block;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n  color: #8eb7bd;\n  margin-top: 12px;\n}\n.dispatch-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 0;\n  border-bottom: 1px solid #274854;\n  color: #bdcfd6;\n  font-size: 6px;\n}\n.dispatch-line[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 3px;\n  background: #8ed9ba;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.dispatch-line[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font: 6px Consolas, monospace;\n  color: #7ba4b4;\n}\n.engaged[_ngcontent-%COMP%]   .wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  font-size: 5.5px;\n  padding: 5px 7px;\n}\n.engaged[_ngcontent-%COMP%]   .metric-reading[_ngcontent-%COMP%] {\n  margin: 8px 0 3px;\n}\n.engaged[_ngcontent-%COMP%]   .metric-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 35px;\n}\n.engaged[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  font-size: 6px;\n}\n.engaged[_ngcontent-%COMP%]   .metric-caption[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .telemetry-chart[_ngcontent-%COMP%] {\n  height: 50px;\n  flex: 0 0 auto;\n}\n.engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%] {\n  padding: 40px 11px 12px;\n}\n.engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: block;\n}\n.engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .camera-timestamp[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%] {\n  padding: 9px;\n}\n.engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 8px;\n}\n.engaged[_ngcontent-%COMP%]   .wire-meta[_ngcontent-%COMP%], \n.engaged[_ngcontent-%COMP%]   .confidence[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .resource-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.engaged[_ngcontent-%COMP%]   .resource-reading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.engaged[_ngcontent-%COMP%]   .order-count[_ngcontent-%COMP%] {\n  margin-top: 6px;\n}\n.engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%]   .screen-extra[_ngcontent-%COMP%]    > .screen-action[_ngcontent-%COMP%] {\n  margin-top: 7px;\n  padding: 5px;\n}\n@keyframes _ngcontent-%COMP%_screen-wake {\n  from {\n    opacity: 0;\n    transform: translateY(5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 701px) and (max-width: 1050px) {\n  .engaged[_ngcontent-%COMP%]   .wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .metric-caption[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .resource-reading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .wire-meta[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .screen-action[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .wire-detail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .wall-focused[_nghost-%COMP%] {\n    left: 39%;\n    top: 23%;\n    width: 22%;\n    height: 49%;\n    --%NS%screen-font: 8px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wall-screen[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n  .engaged[_ngcontent-%COMP%]   .telemetry-screen[_ngcontent-%COMP%] {\n    left: 0;\n    top: 49%;\n    width: 48%;\n    height: 51%;\n  }\n  .engaged[_ngcontent-%COMP%]   .camera-screen[_ngcontent-%COMP%] {\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 46%;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-screen[_ngcontent-%COMP%] {\n    left: 51%;\n    top: 49%;\n    width: 49%;\n    height: 25%;\n  }\n  .engaged[_ngcontent-%COMP%]   .resources-screen[_ngcontent-%COMP%] {\n    left: 51%;\n    top: 77%;\n    width: 49%;\n    height: 23%;\n  }\n  .engaged[_ngcontent-%COMP%]   .wall-screen[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n    padding: 5px;\n    font-size: 7px;\n    letter-spacing: 0.4px;\n  }\n  .screen-indicator[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .engaged[_ngcontent-%COMP%]   .metric-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  .engaged[_ngcontent-%COMP%]   .telemetry-chart[_ngcontent-%COMP%] {\n    height: 45px;\n  }\n  .engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .engaged[_ngcontent-%COMP%]   .camera-lower[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%] {\n    padding: 5px;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%]   .screen-extra[_ngcontent-%COMP%]    > .screen-action[_ngcontent-%COMP%] {\n    margin-top: 7px;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%]   .order-count[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%]   .dispatch-line[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-body[_ngcontent-%COMP%]   .crew-bars[_ngcontent-%COMP%] {\n    margin-top: 5px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-detail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%] {\n    padding: 6px;\n  }\n  .engaged[_ngcontent-%COMP%]   .camera-controls[_ngcontent-%COMP%]   .screen-action[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 5px;\n  }\n  .engaged[_ngcontent-%COMP%]   .screen-extra[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .engaged[_ngcontent-%COMP%]   .screen-action[_ngcontent-%COMP%] {\n    font-size: 9px;\n    min-height: 28px;\n  }\n  .engaged[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .metric-caption[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-meta[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .confidence[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .wire-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .engaged[_ngcontent-%COMP%]   .back-to-wire[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-detail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .engaged[_ngcontent-%COMP%]   .wire-detail[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .engaged[_ngcontent-%COMP%]   .resource-reading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .engaged[_ngcontent-%COMP%]   .camera-timestamp[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%], \n   *[_ngcontent-%COMP%] {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-monitor-wall.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisMonitorWallComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-monitor-wall", imports: [DecimalPipe, CrisisIconComponent], template: `<div
  class="monitor-bank"
  [class.engaged]="active()"
  [attr.data-selected]="selectedScreen()"
  [attr.inert]="available() ? null : ''"
  [attr.aria-hidden]="available() ? null : true"
>
  <section
    class="wall-screen telemetry-screen"
    [class.selected]="selectedScreen() === 'telemetry'"
    aria-label="Screen 1: sensor telemetry"
    (click)="selectedScreen.set('telemetry')"
  >
    <header>
      <span><i></i>01 / TELEMETRY</span><span class="screen-indicator">DATA</span>
    </header>
    <div class="screen-body telemetry-body">
      <span class="metric-label">{{ runtime.config.primaryMetric.label }}</span>
      <div class="metric-reading">
        <strong>{{ runtime.bulletin().metricValue | number: '1.1-1' }}</strong
        ><span>{{ runtime.config.primaryMetric.unit }}</span>
      </div>
      <svg
        class="telemetry-chart"
        viewBox="0 0 200 96"
        role="img"
        [attr.aria-label]="
          'Recorded readings: ' + values().join(', ') + ' ' + runtime.config.primaryMetric.unit
        "
      >
        <path
          d="M0 20H200M0 50H200M0 80H200"
          stroke="#477786"
          stroke-width=".5"
          stroke-dasharray="2 4"
        />
        <path [attr.d]="points() + ' L200 96 L0 96 Z'" fill="#76d6c917" />
        <path [attr.d]="points()" stroke="#9cf1de" stroke-width="1.8" fill="none" />
      </svg>
      <span class="metric-caption">{{ runtime.config.primaryMetric.caption }}</span>
      @if (active()) {
        <div class="screen-extra">
          <button
            class="screen-action"
            (click)="history.set(!history())"
            [attr.aria-expanded]="history()"
          >
            {{ history() ? 'Hide readings' : 'Compare readings' }}<app-crisis-icon name="station" />
          </button>
          @if (history()) {
            <div class="reading-history" aria-label="Sensor reading history">
              @for (value of values(); track $index) {
                <span
                  ><small>{{ $index + 1 }}</small
                  >{{ value | number: '1.2-2' }}</span
                >
              }
            </div>
          }
          <p>Observed data \xB7 {{ runtime.time() }}<br />Use the trend alongside field reports.</p>
        </div>
      }
    </div>
    <span class="bezel-light"></span>
  </section>

  <section
    class="wall-screen camera-screen"
    [class.selected]="selectedScreen() === 'camera'"
    aria-label="Screen 2: field camera"
    (click)="selectedScreen.set('camera')"
  >
    <header>
      <span><i></i>02 / FIELD CAMERA</span><span class="screen-indicator">EXERCISE STILL</span>
    </header>
    <div class="camera-picture" [class.magnified]="cameraZoom()">
      <img [src]="runtime.config.newsImage" [alt]="runtime.config.newsCamera.description" />
      <div class="camera-graticule" aria-hidden="true"><span>+</span></div>
      <span class="camera-timestamp"
        >{{ runtime.config.newsCamera.label }} \xB7 CAPTURED
        {{ runtime.time(runtime.config.newsCamera.minute) }}</span
      >
      <div class="camera-lower">
        <span>{{ runtime.config.newsCamera.network }}</span>
        <h2>{{ runtime.bulletin().title }}</h2>
        <p>{{ runtime.bulletin().summary }}</p>
      </div>
    </div>
    @if (active()) {
      <div class="camera-controls screen-extra">
        <button
          class="screen-action"
          data-monitor-first-control
          (click)="cameraZoom.set(!cameraZoom())"
          [attr.aria-pressed]="cameraZoom()"
        >
          <app-crisis-icon name="expand" />{{
            cameraZoom() ? 'Wide view' : 'Inspect image'
          }}</button
        ><button class="screen-action" (click)="locate.emit(runtime.config.newsCamera.locationId)">
          Locate on table<app-crisis-icon name="map" />
        </button>
      </div>
    }
    <span class="bezel-light"></span>
  </section>

  <section
    class="wall-screen wire-screen"
    [class.selected]="selectedScreen() === 'wire'"
    aria-label="Screen 3: incoming reports"
    (click)="selectedScreen.set('wire')"
  >
    <header>
      <span><i></i>03 / INCOMING WIRE</span
      ><span class="screen-indicator">{{ reports().length }} REPORTS</span>
    </header>
    <div class="screen-body wire-body">
      @if (active() && report(); as selected) {
        <article class="wire-detail" tabindex="-1">
          <button class="back-to-wire" (click)="closeReport()">\u2190 All reports</button
          ><span [class]="'confidence ' + selected.confidence.toLowerCase()"
            >{{ selected.confidence }} \xB7 {{ runtime.time(selected.minute) }}</span
          >
          <h3>{{ selected.title }}</h3>
          <small>{{ selected.source }}</small>
          <p>{{ selected.body }}</p>
          <div class="report-buttons">
            <button
              class="screen-action"
              (click)="pin(selected)"
              [disabled]="runtime.state().sharedEvidenceIds.includes(selected.id)"
            >
              <app-crisis-icon name="pin" />{{
                runtime.state().sharedEvidenceIds.includes(selected.id)
                  ? 'Pinned to table'
                  : 'Pin evidence'
              }}</button
            ><button
              class="screen-action"
              (click)="locate.emit(selected.locationId)"
              aria-label="Locate selected report on situation table"
            >
              <app-crisis-icon name="map" />
            </button>
          </div>
        </article>
      } @else {
        @for (item of reports(); track item.id) {
          <button
            class="wire-item"
            [attr.data-report-id]="item.id"
            [attr.tabindex]="active() ? 0 : -1"
            (click)="read(item)"
          >
            <span class="wire-meta"
              >{{ runtime.time(item.minute)
              }}<span [class]="'confidence ' + item.confidence.toLowerCase()">{{
                item.confidence
              }}</span></span
            ><strong>{{ item.title }}</strong
            ><small>{{ item.source }}</small>
          </button>
        }
      }
    </div>
    <span class="bezel-light"></span>
  </section>

  <section
    class="wall-screen resources-screen"
    [class.selected]="selectedScreen() === 'resources'"
    aria-label="Screen 4: response resources"
    (click)="selectedScreen.set('resources')"
  >
    <header>
      <span><i></i>04 / RESPONSE</span><span class="screen-indicator">DISPATCH</span>
    </header>
    <div class="screen-body resource-body">
      <div class="resource-reading">
        <strong>{{ runtime.crews().toString().padStart(2, '0') }}</strong
        ><span>OF {{ runtime.config.crews }} CREWS<br />AVAILABLE</span>
      </div>
      <div class="crew-bars">
        @for (crew of crewSlots; track crew) {
          <i [class.assigned]="crew > runtime.crews()"></i>
        }
      </div>
      @if (active()) {
        <div class="screen-extra">
          <span class="order-count">{{ runtime.orders().length }} RESPONSE ORDERS DISPATCHED</span>
          @for (order of runtime.orders(); track order.actionId) {
            <div class="dispatch-line">
              <i></i><span>{{ order.action.title }}</span
              ><b>{{ order.action.crews }}</b>
            </div>
          }
          <button class="screen-action" (click)="navigate.emit('command')">
            Coordinate response<app-crisis-icon name="command" />
          </button>
        </div>
      }
    </div>
    <span class="bezel-light"></span>
  </section>
  @if (!active() && available()) {
    <button
      class="screen-hit"
      data-room-entry="news"
      aria-label="Open monitor wall"
      (click)="activate(selectedScreen())"
    >
      <span class="wall-surface-label">Monitor wall <b>\u2197</b><small>CLICK TO INSPECT</small></span>
    </button>
  }
</div>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-monitor-wall.component.scss */\n:host {\n  position: absolute;\n  left: 23.25%;\n  top: 29.5%;\n  width: 53.7%;\n  height: 20.2%;\n  --screen-font: 7px;\n  transition: top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1);\n  pointer-events: auto;\n}\n:host(.wall-focused) {\n  top: 27.5%;\n  height: 29.5%;\n  --screen-font: 8px;\n}\n:host:has(.monitor-bank[inert]) {\n  pointer-events: none;\n}\n* {\n  box-sizing: border-box;\n}\n.monitor-bank {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  color: #d6e8eb;\n  font-family: "Segoe UI", sans-serif;\n  font-size: var(--screen-font);\n}\n.wall-screen {\n  position: absolute;\n  background: #061621;\n  border: 3px solid #111d25;\n  border-radius: 2px;\n  box-shadow:\n    0 0 0 1px rgba(107, 137, 151, 0.2666666667),\n    0 4px 10px rgba(0, 0, 0, 0.6),\n    inset 0 0 30px #07212c;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    box-shadow 0.3s;\n}\n.wall-screen:after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(transparent 0 3px, rgba(131, 173, 199, 0.0235294118) 3px 4px);\n  pointer-events: none;\n  z-index: 3;\n}\n.wall-screen.selected {\n  box-shadow:\n    0 0 0 1px rgba(129, 175, 172, 0.4),\n    0 0 18px rgba(112, 195, 194, 0.1019607843),\n    0 4px 10px rgba(0, 0, 0, 0.6);\n}\n.wall-screen > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  padding: 5px 7px;\n  background: #162c39;\n  border-bottom: 1px solid rgba(80, 115, 128, 0.2666666667);\n  flex-shrink: 0;\n  font: 5px Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #9dc0ca;\n}\n.wall-screen > header > span:first-child {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.wall-screen > header i {\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  background: #9fd6c9;\n  box-shadow: 0 0 5px rgba(163, 255, 222, 0.3333333333);\n}\n.screen-indicator {\n  color: #729dab;\n  font-size: 4px;\n}\n.bezel-light {\n  position: absolute;\n  bottom: 0;\n  right: 8px;\n  width: 7px;\n  height: 1px;\n  background: #acdac6;\n  box-shadow: 0 0 5px rgba(189, 255, 224, 0.6);\n  z-index: 4;\n}\n.telemetry-screen {\n  left: 0;\n  top: 25%;\n  width: 22.4%;\n  height: 57.5%;\n}\n.camera-screen {\n  left: 26.8%;\n  top: 0;\n  width: 46.2%;\n  height: 100%;\n}\n.wire-screen {\n  left: 76.6%;\n  top: 0;\n  width: 23.4%;\n  height: 49%;\n}\n.resources-screen {\n  left: 76.6%;\n  top: 52%;\n  width: 23.4%;\n  height: 48%;\n}\n.engaged .telemetry-screen {\n  top: 0;\n  height: 100%;\n}\n@media (min-width: 701px) {\n  .engaged[data-selected=wire] .wire-screen {\n    height: 67%;\n  }\n  .engaged[data-selected=wire] .resources-screen {\n    top: 70%;\n    height: 30%;\n  }\n  .engaged[data-selected=wire] .resources-screen .order-count {\n    display: none;\n  }\n  .engaged[data-selected=resources] .wire-screen {\n    height: 38%;\n  }\n  .engaged[data-selected=resources] .resources-screen {\n    top: 41%;\n    height: 59%;\n  }\n}\n.screen-body {\n  padding: 8px;\n  overflow: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #365c6b #071d29;\n  min-height: 0;\n  flex: 1;\n}\n.monitor-bank:not(.engaged) .screen-body {\n  overflow: hidden;\n  padding: 5px 7px;\n}\n.monitor-bank:not(.engaged) .metric-reading {\n  margin: 2px 0;\n}\n.monitor-bank:not(.engaged) .metric-reading strong {\n  font-size: 21px;\n}\n.monitor-bank:not(.engaged) .telemetry-chart {\n  min-height: 10px;\n}\n.screen-body::-webkit-scrollbar {\n  width: 3px;\n}\n.screen-body::-webkit-scrollbar-thumb {\n  background: #426b79;\n}\n.screen-body::-webkit-scrollbar-button {\n  display: none;\n}\n.telemetry-body {\n  display: flex;\n  flex-direction: column;\n}\n.metric-label {\n  font: 5px/1.5 Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #8fb8c3;\n}\n.metric-reading {\n  display: flex;\n  align-items: baseline;\n  gap: 5px;\n  margin: 4px 0;\n}\n.metric-reading strong {\n  font-size: 22px;\n  font-weight: 300;\n  line-height: 1.1;\n}\n.metric-reading > span {\n  font-size: 9px;\n  color: #80b2b7;\n}\n.telemetry-chart {\n  display: block;\n  width: 100%;\n  min-height: 13px;\n  height: 38%;\n  flex: 1;\n}\n.metric-caption {\n  font: 4px/1.5 Consolas, monospace;\n  color: #b4bc97;\n  letter-spacing: 0.4px;\n  margin-top: 3px;\n}\n.camera-picture {\n  position: relative;\n  overflow: hidden;\n  flex: 1;\n  min-height: 0;\n}\n.camera-picture > img {\n  height: 100%;\n  width: 100%;\n  object-fit: cover;\n  filter: brightness(0.82) saturate(0.65);\n  transition: transform 1s cubic-bezier(0.2, 0.65, 0.15, 1);\n  transform-origin: 50% 54%;\n}\n.camera-picture.magnified > img {\n  transform: scale(1.65);\n}\n.camera-graticule {\n  position: absolute;\n  inset: 15% 7% 33%;\n  border: 1px solid rgba(208, 244, 237, 0.1333333333);\n  pointer-events: none;\n  display: grid;\n  place-items: center;\n}\n.camera-graticule > span {\n  color: rgba(201, 239, 236, 0.4666666667);\n  font-size: 16px;\n  font-weight: 200;\n}\n.camera-timestamp {\n  position: absolute;\n  top: 6px;\n  left: 7px;\n  color: #c8dad9;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n  text-shadow: 0 1px 3px #000;\n}\n.camera-lower {\n  position: absolute;\n  inset: auto 0 0;\n  background: linear-gradient(transparent, rgba(7, 27, 43, 0.8509803922) 32%);\n  padding: 25px 8px 7px;\n}\n.camera-lower > span {\n  display: inline-block;\n  padding: 3px 4px;\n  background: #bd9d68;\n  color: #142936;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.7px;\n  margin-bottom: 5px;\n}\n.camera-lower h2 {\n  font-weight: 450;\n  font-size: 10px;\n  line-height: 1.25;\n  margin: 0;\n}\n.camera-lower p {\n  font-size: 7px;\n  line-height: 1.6;\n  color: #a6c3cd;\n  margin: 7px 0 0;\n  display: none;\n}\n.camera-controls {\n  display: flex;\n  justify-content: space-between;\n  gap: 6px;\n  padding: 6px;\n  flex-shrink: 0;\n  border-top: 1px solid rgba(59, 105, 120, 0.3019607843);\n  background: #0b2430;\n}\n.screen-action {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 7px;\n  padding: 6px 7px;\n  background: #153740;\n  border: 1px solid #416d76;\n  color: #bfddd9;\n  cursor: pointer;\n  font: inherit;\n  font-size: 6px;\n  line-height: 1.35;\n}\n.screen-action app-crisis-icon {\n  width: 9px;\n  height: 9px;\n}\n.screen-action:hover {\n  background: #234c54;\n  border-color: #96c9c0;\n}\n.screen-action:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.screen-action:focus-visible,\n.wire-item:focus-visible,\n.back-to-wire:focus-visible {\n  outline: 1.5px solid #c3f1d9;\n  outline-offset: -2px;\n}\n.screen-hit {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  background: transparent;\n  border: 0;\n  cursor: zoom-in;\n  outline: none;\n}\n.wall-surface-label {\n  position: absolute;\n  top: calc(100% + 12px);\n  left: 50%;\n  transform: translateX(-50%);\n  color: #d9fff4;\n  font: 11px "Segoe UI", sans-serif;\n  letter-spacing: 1px;\n  white-space: nowrap;\n  text-shadow: 0 2px 8px #00171d;\n  opacity: 0.75;\n  transition: opacity 0.22s;\n  pointer-events: none;\n}\n.wall-surface-label b {\n  margin-left: 6px;\n  font-weight: 400;\n}\n.wall-surface-label small {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  margin-top: 6px;\n}\n.monitor-bank:not(.engaged):has(.screen-hit:is(:hover, :focus-visible)) .wall-screen {\n  border-color: #b1f9df;\n  box-shadow:\n    0 0 0 1px #d6ffee,\n    0 0 16px rgba(139, 255, 228, 0.6666666667),\n    0 0 36px rgba(118, 244, 223, 0.3333333333);\n}\n.screen-hit:is(:hover, :focus-visible) .wall-surface-label {\n  opacity: 1;\n}\n.screen-extra {\n  animation: screen-wake 0.65s ease 0.45s both;\n}\n.screen-extra > p {\n  font-size: 6px;\n  color: #8aafbd;\n  line-height: 1.75;\n  margin: 12px 0 0;\n}\n.screen-extra > .screen-action {\n  width: 100%;\n  margin-top: 12px;\n}\n.reading-history {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  margin-top: 10px;\n  border-top: 1px solid #3b606a;\n  font: 7px Consolas, monospace;\n}\n.reading-history > span {\n  padding: 7px 3px;\n  border-bottom: 1px solid rgba(52, 80, 91, 0.3333333333);\n  text-align: center;\n}\n.reading-history small {\n  display: block;\n  font-size: 4px;\n  margin-bottom: 3px;\n  color: #779aaa;\n}\n.wire-body {\n  padding: 0;\n}\n.wire-item {\n  display: block;\n  text-align: left;\n  border: 0;\n  border-bottom: 1px solid rgba(69, 100, 116, 0.3333333333);\n  width: 100%;\n  background: transparent;\n  color: #cbdfe4;\n  padding: 6px 7px;\n  cursor: pointer;\n  font: inherit;\n}\n.wire-item:hover {\n  background: #29424e;\n}\n.wire-meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  font: 4px Consolas, monospace;\n  color: #88aebb;\n}\n.confidence {\n  color: #a5d4bc;\n  font: 4px Consolas, monospace;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.confidence.forecast {\n  color: #edc187;\n}\n.confidence.unverified {\n  color: #efa68c;\n}\n.wire-item strong {\n  font-size: 6px;\n  font-weight: 500;\n  display: block;\n  margin: 4px 0;\n  line-height: 1.4;\n}\n.wire-item small {\n  font-size: 4px;\n  color: #7ca5b6;\n}\n.wire-detail {\n  padding: 7px;\n  outline: none;\n}\n.wire-detail > h3 {\n  font-size: 8px;\n  font-weight: 500;\n  line-height: 1.4;\n  margin: 5px 0;\n}\n.wire-detail > small {\n  font-size: 5px;\n  color: #8eabb8;\n}\n.wire-detail > p {\n  font-size: 7px;\n  line-height: 1.75;\n  margin: 8px 0;\n  color: #b7ccd3;\n}\n.back-to-wire {\n  display: block;\n  font: 5px Consolas, monospace;\n  color: #95c3c8;\n  background: transparent;\n  border: 0;\n  padding: 0 0 9px;\n  cursor: pointer;\n}\n.report-buttons {\n  display: flex;\n  gap: 4px;\n  position: sticky;\n  bottom: -7px;\n  background: #071d29;\n  padding: 5px 0;\n}\n.report-buttons > button:first-child {\n  flex: 1;\n}\n.resource-body {\n  padding: 7px;\n}\n.resource-reading {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n.resource-reading strong {\n  font-size: 23px;\n  font-weight: 300;\n  line-height: 1;\n}\n.resource-reading > span {\n  font: 4px/1.6 Consolas, monospace;\n  letter-spacing: 0.5px;\n  color: #8db3bd;\n}\n.crew-bars {\n  display: flex;\n  gap: 3px;\n  margin-top: 8px;\n}\n.crew-bars i {\n  height: 2px;\n  flex: 1;\n  background: #a6d9c5;\n  box-shadow: 0 0 5px rgba(159, 232, 201, 0.1843137255);\n}\n.crew-bars i.assigned {\n  background: #365866;\n  box-shadow: none;\n}\n.order-count {\n  display: block;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n  color: #8eb7bd;\n  margin-top: 12px;\n}\n.dispatch-line {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 0;\n  border-bottom: 1px solid #274854;\n  color: #bdcfd6;\n  font-size: 6px;\n}\n.dispatch-line i {\n  width: 3px;\n  height: 3px;\n  background: #8ed9ba;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.dispatch-line b {\n  margin-left: auto;\n  font: 6px Consolas, monospace;\n  color: #7ba4b4;\n}\n.engaged .wall-screen > header {\n  font-size: 5.5px;\n  padding: 5px 7px;\n}\n.engaged .metric-reading {\n  margin: 8px 0 3px;\n}\n.engaged .metric-reading strong {\n  font-size: 35px;\n}\n.engaged .metric-label {\n  font-size: 6px;\n}\n.engaged .metric-caption {\n  font-size: 5px;\n}\n.engaged .telemetry-chart {\n  height: 50px;\n  flex: 0 0 auto;\n}\n.engaged .camera-lower {\n  padding: 40px 11px 12px;\n}\n.engaged .camera-lower h2 {\n  font-size: 15px;\n}\n.engaged .camera-lower p {\n  display: block;\n}\n.engaged .camera-lower > span {\n  font-size: 5px;\n}\n.engaged .camera-timestamp {\n  font-size: 5px;\n}\n.engaged .wire-item {\n  padding: 9px;\n}\n.engaged .wire-item strong {\n  font-size: 8px;\n}\n.engaged .wire-meta,\n.engaged .confidence {\n  font-size: 5px;\n}\n.engaged .wire-item small {\n  font-size: 5px;\n}\n.engaged .resource-reading strong {\n  font-size: 24px;\n}\n.engaged .resource-reading > span {\n  font-size: 5px;\n}\n.engaged .order-count {\n  margin-top: 6px;\n}\n.engaged .resource-body .screen-extra > .screen-action {\n  margin-top: 7px;\n  padding: 5px;\n}\n@keyframes screen-wake {\n  from {\n    opacity: 0;\n    transform: translateY(5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 701px) and (max-width: 1050px) {\n  .engaged .wall-screen > header,\n  .engaged .metric-label,\n  .engaged .metric-caption,\n  .engaged .resource-reading > span,\n  .engaged .wire-meta,\n  .engaged .wire-item small {\n    font-size: 7px;\n  }\n  .engaged .wire-item strong,\n  .engaged .screen-action,\n  .engaged .wire-detail > p {\n    font-size: 10px;\n  }\n}\n@media (max-width: 700px) {\n  :host(.wall-focused) {\n    left: 39%;\n    top: 23%;\n    width: 22%;\n    height: 49%;\n    --screen-font: 8px;\n  }\n  .engaged .wall-screen {\n    border-width: 2px;\n  }\n  .engaged .telemetry-screen {\n    left: 0;\n    top: 49%;\n    width: 48%;\n    height: 51%;\n  }\n  .engaged .camera-screen {\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 46%;\n  }\n  .engaged .wire-screen {\n    left: 51%;\n    top: 49%;\n    width: 49%;\n    height: 25%;\n  }\n  .engaged .resources-screen {\n    left: 51%;\n    top: 77%;\n    width: 49%;\n    height: 23%;\n  }\n  .engaged .wall-screen > header {\n    padding: 5px;\n    font-size: 7px;\n    letter-spacing: 0.4px;\n  }\n  .screen-indicator {\n    display: none;\n  }\n  .engaged .metric-reading strong {\n    font-size: 29px;\n  }\n  .engaged .telemetry-chart {\n    height: 45px;\n  }\n  .engaged .camera-lower h2 {\n    font-size: 12px;\n  }\n  .engaged .camera-lower p {\n    font-size: 10px;\n  }\n  .engaged .resource-body {\n    padding: 5px;\n  }\n  .engaged .resource-reading strong {\n    font-size: 18px;\n  }\n  .engaged .resource-body .screen-extra > .screen-action {\n    margin-top: 7px;\n  }\n  .engaged .resource-body .order-count,\n  .engaged .resource-body .dispatch-line {\n    display: none;\n  }\n  .engaged .resource-body .crew-bars {\n    margin-top: 5px;\n  }\n  .engaged .wire-item strong {\n    font-size: 11px;\n  }\n  .engaged .wire-detail > p {\n    font-size: 10px;\n  }\n  .engaged .wire-item {\n    padding: 6px;\n  }\n  .engaged .camera-controls .screen-action {\n    font-size: 9px;\n    padding: 5px;\n  }\n  .engaged .screen-extra > p {\n    font-size: 8px;\n  }\n  .engaged .screen-action {\n    font-size: 9px;\n    min-height: 28px;\n  }\n  .engaged .metric-label,\n  .engaged .metric-caption {\n    font-size: 7px;\n  }\n  .engaged .wire-meta,\n  .engaged .confidence,\n  .engaged .wire-item small,\n  .engaged .back-to-wire {\n    font-size: 7px;\n  }\n  .engaged .wire-detail h3 {\n    font-size: 12px;\n  }\n  .engaged .wire-detail > small {\n    font-size: 8px;\n  }\n  .engaged .resource-reading > span {\n    font-size: 7px;\n  }\n  .engaged .camera-timestamp {\n    font-size: 7px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  :host,\n  * {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-monitor-wall.component.css.map */\n'] }]
  }], null, { active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], available: [{ type: Input, args: [{ isSignal: true, alias: "available", required: false }] }], open: [{ type: Output, args: ["open"] }], navigate: [{ type: Output, args: ["navigate"] }], locate: [{ type: Output, args: ["locate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisMonitorWallComponent, { className: "CrisisMonitorWallComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-monitor-wall.component.ts", lineNumber: 25 });
})();

// src/app/templates/crisis-operations/ui/crisis-room-scene.component.ts
function CrisisRoomSceneComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function CrisisRoomSceneComponent_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigate.emit("room"));
    });
    \u0275\u0275elementEnd();
  }
}
function CrisisRoomSceneComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function CrisisRoomSceneComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigate.emit("map"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 15);
    \u0275\u0275element(2, "polygon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4, "Situation table ");
    \u0275\u0275elementStart(5, "b");
    \u0275\u0275text(6, "\u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "CLICK TO INSPECT");
    \u0275\u0275elementEnd()()();
  }
}
var CRISIS_CAMERA_TRANSITION_MS = 1150;
var CrisisRoomSceneComponent = class _CrisisRoomSceneComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
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
  selectedLocation = input(
    "",
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = input(
    "room",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  layer = input(
    "hazard",
    ...ngDevMode ? [{ debugName: "layer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = input(
    1,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  imageFailed = output();
  navigate = output();
  locate = output();
  locationSelected = output();
  zoomOrigin = computed(
    () => {
      const location = this.config().locations.find((item) => item.id === this.selectedLocation());
      return location ? location.x / 10 + "% " + location.y / 6 + "%" : "50% 50%";
    },
    ...ngDevMode ? [{ debugName: "zoomOrigin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CrisisRoomSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisRoomSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisRoomSceneComponent, selectors: [["app-crisis-room-scene"]], inputs: { config: [1, "config"], state: [1, "state"], selectedLocation: [1, "selectedLocation"], view: [1, "view"], layer: [1, "layer"], zoom: [1, "zoom"] }, outputs: { imageFailed: "imageFailed", navigate: "navigate", locate: "locate", locationSelected: "locationSelected" }, decls: 17, vars: 23, consts: [[1, "room-environment"], ["aria-label", "Step back into room", "tabindex", "-1", 1, "room-return-surface"], [1, "room-scene"], ["alt", "", 1, "room-art", 3, "error", "src"], ["aria-hidden", "true", 1, "room-shade"], [3, "open", "navigate", "locate", "active", "available"], [1, "table-projection"], [1, "table-map"], [3, "locationSelected", "config", "state", "miniature", "layer", "selected"], ["data-room-entry", "map", "aria-label", "Open situation table", 1, "table-surface-hit"], ["aria-hidden", "true", 1, "table-sweep"], ["aria-hidden", "true", 1, "table-rim"], ["aria-hidden", "true", 1, "table-glow"], ["aria-label", "Step back into room", "tabindex", "-1", 1, "room-return-surface", 3, "click"], ["data-room-entry", "map", "aria-label", "Open situation table", 1, "table-surface-hit", 3, "click"], ["viewBox", "0 0 100 100", "preserveAspectRatio", "none", "aria-hidden", "true"], ["points", "24.5,1 75.5,1 99.3,99 0.7,99"], [1, "surface-label"]], template: function CrisisRoomSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CrisisRoomSceneComponent_Conditional_1_Template, 1, 0, "button", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "img", 3);
      \u0275\u0275listener("error", function CrisisRoomSceneComponent_Template_img_error_3_listener() {
        return ctx.imageFailed.emit();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "div", 4);
      \u0275\u0275elementStart(5, "app-crisis-monitor-wall", 5);
      \u0275\u0275listener("open", function CrisisRoomSceneComponent_Template_app_crisis_monitor_wall_open_5_listener() {
        return ctx.navigate.emit("news");
      })("navigate", function CrisisRoomSceneComponent_Template_app_crisis_monitor_wall_navigate_5_listener($event) {
        return ctx.navigate.emit($event);
      })("locate", function CrisisRoomSceneComponent_Template_app_crisis_monitor_wall_locate_5_listener($event) {
        return ctx.locate.emit($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "app-crisis-map", 8);
      \u0275\u0275listener("locationSelected", function CrisisRoomSceneComponent_Template_app_crisis_map_locationSelected_8_listener($event) {
        return ctx.locationSelected.emit($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, CrisisRoomSceneComponent_Conditional_9_Template, 9, 0, "button", 9);
      \u0275\u0275element(10, "div", 10);
      \u0275\u0275elementStart(11, "div", 11);
      \u0275\u0275element(12, "i");
      \u0275\u0275text(13, " OPERATIONAL PROJECTION ");
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "SIMULATED DATA");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(16, "div", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-camera", ctx.view());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "map" || ctx.view() === "news" ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.config().roomImage, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("wall-focused", ctx.view() === "news");
      \u0275\u0275property("active", ctx.view() === "news")("available", ctx.view() === "room" || ctx.view() === "news");
      \u0275\u0275advance();
      \u0275\u0275classProp("table-active", ctx.view() === "map");
      \u0275\u0275attribute("inert", ctx.view() === "map" || ctx.view() === "room" ? null : "")("aria-hidden", ctx.view() === "map" || ctx.view() === "room" ? null : true);
      \u0275\u0275advance();
      \u0275\u0275styleProp("transform", "scale(" + (ctx.view() === "map" ? ctx.zoom() : 1) + ")")("transform-origin", ctx.zoomOrigin());
      \u0275\u0275attribute("inert", ctx.view() === "map" ? null : "")("aria-hidden", ctx.view() === "map" ? null : true);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.config())("state", ctx.state())("miniature", ctx.view() !== "map")("layer", ctx.layer())("selected", ctx.selectedLocation());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "room" ? 9 : -1);
    }
  }, dependencies: [CrisisMapComponent, CrisisMonitorWallComponent], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  pointer-events: none;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.room-environment[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  background: #07111c;\n  perspective: 1600px;\n}\n.room-scene[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: max(100vw, 177.69vh);\n  height: max(56.28vw, 100vh);\n  transform: translate(-50%, -50%);\n  transition: transform 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), filter 1.15s;\n  transform-origin: 50% 55%;\n}\n.room-return-surface[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  pointer-events: auto;\n  cursor: zoom-out;\n}\n.room-art[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n}\n.room-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(5, 16, 27, 0.2666666667),\n      transparent 25%,\n      transparent 65%,\n      rgba(6, 19, 34, 0.2));\n  transition: background 1s;\n}\n[data-camera=news][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n  transform: translate(-50%, -50%) translateY(15vh) scale(1.75);\n}\n[data-camera=map][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n  transform: translate(-50%, -50%) perspective(1400px) rotateX(8deg) rotateZ(-1.2deg) translateY(-15vh) scale(1.55);\n}\n[data-camera=map][_ngcontent-%COMP%]   .room-shade[_ngcontent-%COMP%] {\n  background: rgba(4, 19, 26, 0.3333333333);\n}\n[data-camera=map][_ngcontent-%COMP%]   app-crisis-monitor-wall[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\napp-crisis-monitor-wall[_ngcontent-%COMP%] {\n  z-index: 2;\n  transition:\n    opacity 1s,\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1);\n}\n[data-camera=station][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%], \n[data-camera=command][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n  transform: translate(-50%, -50%) scale(1.16);\n  filter: blur(3px) brightness(0.4);\n}\n[data-camera=argus][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n  transform: translate(-50%, -50%) scale(1.05);\n}\n[data-camera=argus][_ngcontent-%COMP%]   .room-shade[_ngcontent-%COMP%] {\n  background: rgba(4, 18, 27, 0.5333333333);\n  z-index: 3;\n}\n[data-camera=argus][_ngcontent-%COMP%]   app-crisis-monitor-wall[_ngcontent-%COMP%] {\n  opacity: 0.45;\n}\n@media (max-width: 700px) {\n  [data-camera=argus][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%);\n  }\n}\n.table-projection[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  left: 24.4%;\n  top: 54.55%;\n  width: 51.5%;\n  height: 15.7%;\n  clip-path: polygon(24.3% 0, 75.7% 0, 100% 100%, 0 100%);\n  opacity: 0.83;\n  background: #092632;\n  filter: saturate(0.8) brightness(1.3);\n  transform: perspective(800px) rotateX(0);\n  transform-origin: center;\n  transition:\n    left 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    width 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    clip-path 1.15s,\n    transform 1.15s,\n    opacity 0.8s,\n    box-shadow 1.15s,\n    filter 1s;\n}\n.table-map[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  transition: transform 0.55s, transform-origin 0.55s;\n}\n.table-surface-hit[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  background: rgba(118, 244, 223, 0.0235294118);\n  color: #d9fff4;\n  pointer-events: auto;\n  cursor: zoom-in;\n  outline: none;\n  transition: background 0.22s;\n}\n.table-surface-hit[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  fill: none;\n  stroke: rgba(161, 247, 222, 0.4);\n  stroke-width: 1;\n  filter: drop-shadow(0 0 4px #80ffe2);\n  transition: stroke 0.22s, filter 0.22s;\n}\n.table-surface-hit[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%] {\n  vector-effect: non-scaling-stroke;\n}\n.surface-label[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 60%;\n  transform: translate(-50%, -50%);\n  white-space: nowrap;\n  font: 11px "Segoe UI", sans-serif;\n  letter-spacing: 1px;\n  text-shadow: 0 2px 8px #00171d, 0 0 14px #00171d;\n  opacity: 0.75;\n  transition: opacity 0.22s;\n}\n.surface-label[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  font-weight: 400;\n}\n.surface-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  margin-top: 6px;\n}\n.table-surface-hit[_ngcontent-%COMP%]:is(:hover, :focus-visible) {\n  background: rgba(118, 244, 223, 0.1411764706);\n}\n.table-surface-hit[_ngcontent-%COMP%]:is(:hover, :focus-visible)   svg[_ngcontent-%COMP%] {\n  stroke: #c8ffe9;\n  stroke-width: 3;\n  filter: drop-shadow(0 0 5px #91ffe7) drop-shadow(0 0 12px #76f4df);\n}\n.table-surface-hit[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .surface-label[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.table-projection.table-active[_ngcontent-%COMP%] {\n  z-index: 3;\n  left: 22%;\n  top: 45.5%;\n  width: 42%;\n  height: 30%;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n  opacity: 1;\n  transform: perspective(800px) rotateX(18deg);\n  pointer-events: auto;\n  overflow: hidden;\n  border: 2px solid #70a9b5;\n  outline: 5px solid #081e28;\n  filter: saturate(1.1) brightness(1.05);\n  box-shadow:\n    0 8px 0 #09202a,\n    0 12px 0 rgba(74, 120, 131, 0.2666666667),\n    0 28px 50px rgba(0, 0, 0, 0.6666666667),\n    0 0 45px rgba(115, 218, 204, 0.2078431373);\n}\n.table-sweep[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0;\n  background:\n    linear-gradient(\n      165deg,\n      transparent 40%,\n      rgba(156, 255, 231, 0.0431372549) 48%,\n      rgba(185, 255, 245, 0.1882352941) 50%,\n      transparent 51%);\n  background-size: 100% 300%;\n}\n.table-active[_ngcontent-%COMP%]   .table-sweep[_ngcontent-%COMP%] {\n  opacity: 1;\n  animation: _ngcontent-%COMP%_table-scan 9s linear infinite;\n}\n.table-rim[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 5px 12px;\n  background: rgba(8, 32, 45, 0.9215686275);\n  border-top: 1px solid rgba(111, 176, 176, 0.3215686275);\n  color: #a7cccf;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1.5px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  opacity: 0;\n  transition: opacity 0.6s;\n  pointer-events: none;\n}\n.table-rim[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  background: #a5efd4;\n  box-shadow: 0 0 8px #a5efd4;\n}\n.table-rim[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #6f949e;\n}\n.table-active[_ngcontent-%COMP%]   .table-rim[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.table-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 32%;\n  top: 50%;\n  width: 36%;\n  height: 23%;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(86, 207, 199, 0.031372549),\n      transparent 68%);\n  pointer-events: none;\n  transition: opacity 1s;\n}\n[data-camera=map][_ngcontent-%COMP%]   .table-glow[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_table-scan {\n  from {\n    background-position: 0 100%;\n  }\n  to {\n    background-position: 0 -100%;\n  }\n}\n@media (min-width: 701px) and (max-width: 1050px) {\n  [data-camera=news][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) translateY(8vh) scale(1.05);\n  }\n  [data-camera=map][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) perspective(1400px) rotateX(5deg) rotateZ(-1deg) translateY(-6vh) scale(1.05);\n  }\n}\n@media (max-width: 700px) {\n  [data-camera=news][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) translateY(0) scale(1.05);\n  }\n  [data-camera=map][_ngcontent-%COMP%]   .room-scene[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) perspective(1400px) rotateX(5deg) rotateZ(-1deg) translateY(-8vh) scale(1.1);\n  }\n  .table-projection.table-active[_ngcontent-%COMP%] {\n    left: 38.5%;\n    top: 33%;\n    width: 23%;\n    height: 22.5%;\n    transform: perspective(800px) rotateX(14deg);\n  }\n  .table-rim[_ngcontent-%COMP%] {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n    padding: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-room-scene.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisRoomSceneComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-room-scene", imports: [CrisisMapComponent, CrisisMonitorWallComponent], template: `<div class="room-environment" [attr.data-camera]="view()">
  @if (view() === 'map' || view() === 'news') {
    <button
      class="room-return-surface"
      aria-label="Step back into room"
      tabindex="-1"
      (click)="navigate.emit('room')"
    ></button>
  }
  <div class="room-scene">
    <img class="room-art" [src]="config().roomImage" alt="" (error)="imageFailed.emit()" />
    <div class="room-shade" aria-hidden="true"></div>
    <app-crisis-monitor-wall
      [class.wall-focused]="view() === 'news'"
      [active]="view() === 'news'"
      [available]="view() === 'room' || view() === 'news'"
      (open)="navigate.emit('news')"
      (navigate)="navigate.emit($event)"
      (locate)="locate.emit($event)"
    />
    <div
      class="table-projection"
      [class.table-active]="view() === 'map'"
      [attr.inert]="view() === 'map' || view() === 'room' ? null : ''"
      [attr.aria-hidden]="view() === 'map' || view() === 'room' ? null : true"
    >
      <div
        class="table-map"
        [attr.inert]="view() === 'map' ? null : ''"
        [attr.aria-hidden]="view() === 'map' ? null : true"
        [style.transform]="'scale(' + (view() === 'map' ? zoom() : 1) + ')'"
        [style.transform-origin]="zoomOrigin()"
      >
        <app-crisis-map
          [config]="config()"
          [state]="state()"
          [miniature]="view() !== 'map'"
          [layer]="layer()"
          [selected]="selectedLocation()"
          (locationSelected)="locationSelected.emit($event)"
        />
      </div>
      @if (view() === 'room') {
        <button
          class="table-surface-hit"
          data-room-entry="map"
          aria-label="Open situation table"
          (click)="navigate.emit('map')"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="24.5,1 75.5,1 99.3,99 0.7,99" />
          </svg>
          <span class="surface-label">Situation table <b>\u2197</b><small>CLICK TO INSPECT</small></span>
        </button>
      }
      <div class="table-sweep" aria-hidden="true"></div>
      <div class="table-rim" aria-hidden="true">
        <i></i> OPERATIONAL PROJECTION <span>SIMULATED DATA</span>
      </div>
    </div>
    <div class="table-glow" aria-hidden="true"></div>
  </div>
</div>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-room-scene.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  pointer-events: none;\n}\n* {\n  box-sizing: border-box;\n}\n.room-environment {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  background: #07111c;\n  perspective: 1600px;\n}\n.room-scene {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: max(100vw, 177.69vh);\n  height: max(56.28vw, 100vh);\n  transform: translate(-50%, -50%);\n  transition: transform 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), filter 1.15s;\n  transform-origin: 50% 55%;\n}\n.room-return-surface {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  pointer-events: auto;\n  cursor: zoom-out;\n}\n.room-art {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n}\n.room-shade {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(5, 16, 27, 0.2666666667),\n      transparent 25%,\n      transparent 65%,\n      rgba(6, 19, 34, 0.2));\n  transition: background 1s;\n}\n[data-camera=news] .room-scene {\n  transform: translate(-50%, -50%) translateY(15vh) scale(1.75);\n}\n[data-camera=map] .room-scene {\n  transform: translate(-50%, -50%) perspective(1400px) rotateX(8deg) rotateZ(-1.2deg) translateY(-15vh) scale(1.55);\n}\n[data-camera=map] .room-shade {\n  background: rgba(4, 19, 26, 0.3333333333);\n}\n[data-camera=map] app-crisis-monitor-wall {\n  opacity: 0.4;\n}\napp-crisis-monitor-wall {\n  z-index: 2;\n  transition:\n    opacity 1s,\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1);\n}\n[data-camera=station] .room-scene,\n[data-camera=command] .room-scene {\n  transform: translate(-50%, -50%) scale(1.16);\n  filter: blur(3px) brightness(0.4);\n}\n[data-camera=argus] .room-scene {\n  transform: translate(-50%, -50%) scale(1.05);\n}\n[data-camera=argus] .room-shade {\n  background: rgba(4, 18, 27, 0.5333333333);\n  z-index: 3;\n}\n[data-camera=argus] app-crisis-monitor-wall {\n  opacity: 0.45;\n}\n@media (max-width: 700px) {\n  [data-camera=argus] .room-scene {\n    transform: translate(-50%, -50%);\n  }\n}\n.table-projection {\n  position: absolute;\n  z-index: 1;\n  left: 24.4%;\n  top: 54.55%;\n  width: 51.5%;\n  height: 15.7%;\n  clip-path: polygon(24.3% 0, 75.7% 0, 100% 100%, 0 100%);\n  opacity: 0.83;\n  background: #092632;\n  filter: saturate(0.8) brightness(1.3);\n  transform: perspective(800px) rotateX(0);\n  transform-origin: center;\n  transition:\n    left 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    top 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    width 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    height 1.15s cubic-bezier(0.22, 0.68, 0.14, 1),\n    clip-path 1.15s,\n    transform 1.15s,\n    opacity 0.8s,\n    box-shadow 1.15s,\n    filter 1s;\n}\n.table-map {\n  width: 100%;\n  height: 100%;\n  transition: transform 0.55s, transform-origin 0.55s;\n}\n.table-surface-hit {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  background: rgba(118, 244, 223, 0.0235294118);\n  color: #d9fff4;\n  pointer-events: auto;\n  cursor: zoom-in;\n  outline: none;\n  transition: background 0.22s;\n}\n.table-surface-hit svg {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  fill: none;\n  stroke: rgba(161, 247, 222, 0.4);\n  stroke-width: 1;\n  filter: drop-shadow(0 0 4px #80ffe2);\n  transition: stroke 0.22s, filter 0.22s;\n}\n.table-surface-hit polygon {\n  vector-effect: non-scaling-stroke;\n}\n.surface-label {\n  position: absolute;\n  left: 50%;\n  top: 60%;\n  transform: translate(-50%, -50%);\n  white-space: nowrap;\n  font: 11px "Segoe UI", sans-serif;\n  letter-spacing: 1px;\n  text-shadow: 0 2px 8px #00171d, 0 0 14px #00171d;\n  opacity: 0.75;\n  transition: opacity 0.22s;\n}\n.surface-label b {\n  margin-left: 6px;\n  font-weight: 400;\n}\n.surface-label small {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  margin-top: 6px;\n}\n.table-surface-hit:is(:hover, :focus-visible) {\n  background: rgba(118, 244, 223, 0.1411764706);\n}\n.table-surface-hit:is(:hover, :focus-visible) svg {\n  stroke: #c8ffe9;\n  stroke-width: 3;\n  filter: drop-shadow(0 0 5px #91ffe7) drop-shadow(0 0 12px #76f4df);\n}\n.table-surface-hit:is(:hover, :focus-visible) .surface-label {\n  opacity: 1;\n}\n.table-projection.table-active {\n  z-index: 3;\n  left: 22%;\n  top: 45.5%;\n  width: 42%;\n  height: 30%;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n  opacity: 1;\n  transform: perspective(800px) rotateX(18deg);\n  pointer-events: auto;\n  overflow: hidden;\n  border: 2px solid #70a9b5;\n  outline: 5px solid #081e28;\n  filter: saturate(1.1) brightness(1.05);\n  box-shadow:\n    0 8px 0 #09202a,\n    0 12px 0 rgba(74, 120, 131, 0.2666666667),\n    0 28px 50px rgba(0, 0, 0, 0.6666666667),\n    0 0 45px rgba(115, 218, 204, 0.2078431373);\n}\n.table-sweep {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0;\n  background:\n    linear-gradient(\n      165deg,\n      transparent 40%,\n      rgba(156, 255, 231, 0.0431372549) 48%,\n      rgba(185, 255, 245, 0.1882352941) 50%,\n      transparent 51%);\n  background-size: 100% 300%;\n}\n.table-active .table-sweep {\n  opacity: 1;\n  animation: table-scan 9s linear infinite;\n}\n.table-rim {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 5px 12px;\n  background: rgba(8, 32, 45, 0.9215686275);\n  border-top: 1px solid rgba(111, 176, 176, 0.3215686275);\n  color: #a7cccf;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1.5px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  opacity: 0;\n  transition: opacity 0.6s;\n  pointer-events: none;\n}\n.table-rim i {\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  background: #a5efd4;\n  box-shadow: 0 0 8px #a5efd4;\n}\n.table-rim span {\n  margin-left: auto;\n  color: #6f949e;\n}\n.table-active .table-rim {\n  opacity: 1;\n}\n.table-glow {\n  position: absolute;\n  left: 32%;\n  top: 50%;\n  width: 36%;\n  height: 23%;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(86, 207, 199, 0.031372549),\n      transparent 68%);\n  pointer-events: none;\n  transition: opacity 1s;\n}\n[data-camera=map] .table-glow {\n  opacity: 0;\n}\n@keyframes table-scan {\n  from {\n    background-position: 0 100%;\n  }\n  to {\n    background-position: 0 -100%;\n  }\n}\n@media (min-width: 701px) and (max-width: 1050px) {\n  [data-camera=news] .room-scene {\n    transform: translate(-50%, -50%) translateY(8vh) scale(1.05);\n  }\n  [data-camera=map] .room-scene {\n    transform: translate(-50%, -50%) perspective(1400px) rotateX(5deg) rotateZ(-1deg) translateY(-6vh) scale(1.05);\n  }\n}\n@media (max-width: 700px) {\n  [data-camera=news] .room-scene {\n    transform: translate(-50%, -50%) translateY(0) scale(1.05);\n  }\n  [data-camera=map] .room-scene {\n    transform: translate(-50%, -50%) perspective(1400px) rotateX(5deg) rotateZ(-1deg) translateY(-8vh) scale(1.1);\n  }\n  .table-projection.table-active {\n    left: 38.5%;\n    top: 33%;\n    width: 23%;\n    height: 22.5%;\n    transform: perspective(800px) rotateX(14deg);\n  }\n  .table-rim {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n    padding: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-room-scene.component.css.map */\n'] }]
  }], null, { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], selectedLocation: [{ type: Input, args: [{ isSignal: true, alias: "selectedLocation", required: false }] }], view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: false }] }], layer: [{ type: Input, args: [{ isSignal: true, alias: "layer", required: false }] }], zoom: [{ type: Input, args: [{ isSignal: true, alias: "zoom", required: false }] }], imageFailed: [{ type: Output, args: ["imageFailed"] }], navigate: [{ type: Output, args: ["navigate"] }], locate: [{ type: Output, args: ["locate"] }], locationSelected: [{ type: Output, args: ["locationSelected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisRoomSceneComponent, { className: "CrisisRoomSceneComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-room-scene.component.ts", lineNumber: 14 });
})();

// src/app/templates/crisis-operations/ui/crisis-table-controls.component.ts
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.actionId;
function CrisisTableControlsComponent_For_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 29);
    \u0275\u0275listener("click", function CrisisTableControlsComponent_For_60_Template_button_click_5_listener() {
      const report_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.runtime.read(report_r2.id);
      return \u0275\u0275resetView(ctx_r2.runtime.share(report_r2.id));
    });
    \u0275\u0275element(6, "app-crisis-icon", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "details")(9, "summary");
    \u0275\u0275text(10, "Read source report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const report_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.time(report_r2.minute), " \xB7 ", report_r2.confidence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r2.title);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.runtime.state().sharedEvidenceIds.includes(report_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.state().sharedEvidenceIds.includes(report_r2.id) ? "On the table" : "Pin report", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(report_r2.body);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r2.source);
  }
}
function CrisisTableControlsComponent_ForEmpty_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " No reports at this station. Check another specialist\u2019s incoming information. ");
    \u0275\u0275elementEnd();
  }
}
function CrisisTableControlsComponent_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "app-crisis-icon", 30);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r4.action.mapLabel);
  }
}
function CrisisTableControlsComponent_For_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "button", 31);
    \u0275\u0275listener("click", function CrisisTableControlsComponent_For_75_Template_button_click_1_listener() {
      const report_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.locationSelected.emit(report_r6.locationId));
    });
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 32);
    \u0275\u0275listener("click", function CrisisTableControlsComponent_For_75_Template_button_click_6_listener() {
      const report_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.unshare(report_r6.id));
    });
    \u0275\u0275element(7, "app-crisis-icon", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const report_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", report_r6.confidence, " \xB7 ", ctx_r2.runtime.time(report_r6.minute));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r6.title);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Unpin " + report_r6.title);
  }
}
function CrisisTableControlsComponent_ForEmpty_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Pin useful evidence from the news or your station. Keep the three reports that matter most. ");
    \u0275\u0275elementEnd();
  }
}
var CrisisTableControlsComponent = class _CrisisTableControlsComponent {
  runtime = inject(CrisisRuntimeService);
  selectedLocation = input.required(
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  layer = input(
    "hazard",
    ...ngDevMode ? [{ debugName: "layer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = input(
    1,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  layerChanged = output();
  zoomChanged = output();
  locationSelected = output();
  navigate = output();
  location = computed(
    () => this.runtime.config.locations.find((l) => l.id === this.selectedLocation()) ?? this.runtime.config.locations[0],
    ...ngDevMode ? [{ debugName: "location" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locationReports = computed(
    () => this.runtime.reports().filter((r) => r.locationId === this.location().id),
    ...ngDevMode ? [{ debugName: "locationReports" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locationOrders = computed(
    () => this.runtime.orders().filter((o) => o.action.locationId === this.location().id),
    ...ngDevMode ? [{ debugName: "locationOrders" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CrisisTableControlsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisTableControlsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisTableControlsComponent, selectors: [["app-crisis-table-controls"]], inputs: { selectedLocation: [1, "selectedLocation"], layer: [1, "layer"], zoom: [1, "zoom"] }, outputs: { layerChanged: "layerChanged", zoomChanged: "zoomChanged", locationSelected: "locationSelected", navigate: "navigate" }, decls: 77, vars: 26, consts: [["aria-label", "Situation table controls", 1, "table-controls"], [1, "table-heading"], ["tabindex", "-1", "data-panel-heading", ""], [1, "return-hint"], ["aria-label", "Return to room", 1, "return-room", 3, "click"], ["name", "close"], [1, "map-toolbar"], ["aria-label", "Map layer", 1, "layer-controls"], ["name", "layers"], [3, "click"], [1, "map-zoom-controls"], ["aria-label", "Zoom out map", 3, "click", "disabled"], ["aria-label", "Zoom in map", 3, "click", "disabled"], [1, "map-legend"], [1, "confirmed-key"], [1, "forecast-key"], [1, "map-workspace"], [1, "location-inspector"], ["tabindex", "-1"], [1, "location-reports"], [1, "eyebrow"], [1, "no-reports"], [1, "location-order"], [1, "map-command", 3, "click"], ["name", "arrow"], [1, "shared-briefing"], [1, "briefing-ident"], ["name", "pin"], [1, "briefing-item"], [3, "click", "disabled"], ["name", "check"], [1, "briefing-locate", 3, "click"], [1, "unpin", 3, "click"]], template: function CrisisTableControlsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Situation table");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Click the surrounding room to step back ");
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "\xB7 Esc");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_9_listener() {
        return ctx.navigate.emit("room");
      });
      \u0275\u0275text(10, " Return to room ");
      \u0275\u0275element(11, "app-crisis-icon", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 6)(13, "div", 7);
      \u0275\u0275element(14, "app-crisis-icon", 8);
      \u0275\u0275elementStart(15, "button", 9);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_15_listener() {
        return ctx.layerChanged.emit("hazard");
      });
      \u0275\u0275text(16, " Hazard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 9);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_17_listener() {
        return ctx.layerChanged.emit("people");
      });
      \u0275\u0275text(18, " People");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_19_listener() {
        return ctx.layerChanged.emit("resources");
      });
      \u0275\u0275text(20, " Resources ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 10)(22, "button", 11);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_22_listener() {
        return ctx.zoomChanged.emit(-0.1);
      });
      \u0275\u0275text(23, " \u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span");
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 12);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_27_listener() {
        return ctx.zoomChanged.emit(0.1);
      });
      \u0275\u0275text(28, " + ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 13)(30, "span");
      \u0275\u0275element(31, "i", 14);
      \u0275\u0275text(32, "Observed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275element(34, "i", 15);
      \u0275\u0275text(35, "Projected extent");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 16)(37, "aside", 17)(38, "h2", 18);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "dl")(43, "div")(44, "dt");
      \u0275\u0275text(45, "Elevation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "dd");
      \u0275\u0275text(47);
      \u0275\u0275elementStart(48, "small");
      \u0275\u0275text(49, "m");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "div")(51, "dt");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "dd");
      \u0275\u0275text(54);
      \u0275\u0275pipe(55, "number");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(56, "div", 19)(57, "span", 20);
      \u0275\u0275text(58, "LATEST EVIDENCE");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(59, CrisisTableControlsComponent_For_60_Template, 15, 7, "article", null, _forTrack03, false, CrisisTableControlsComponent_ForEmpty_61_Template, 2, 0, "p", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(62, CrisisTableControlsComponent_For_63_Template, 4, 1, "div", 22, _forTrack13);
      \u0275\u0275elementStart(64, "button", 23);
      \u0275\u0275listener("click", function CrisisTableControlsComponent_Template_button_click_64_listener() {
        return ctx.navigate.emit("command");
      });
      \u0275\u0275text(65, " Coordinate response ");
      \u0275\u0275element(66, "app-crisis-icon", 24);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(67, "div", 25)(68, "div", 26);
      \u0275\u0275element(69, "app-crisis-icon", 27);
      \u0275\u0275elementStart(70, "span");
      \u0275\u0275text(71, "PINNED EVIDENCE");
      \u0275\u0275elementStart(72, "small");
      \u0275\u0275text(73);
      \u0275\u0275elementEnd()()();
      \u0275\u0275repeaterCreate(74, CrisisTableControlsComponent_For_75_Template, 8, 4, "div", 28, _forTrack03, false, CrisisTableControlsComponent_ForEmpty_76_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275classProp("active", ctx.layer() === "hazard");
      \u0275\u0275attribute("aria-pressed", ctx.layer() === "hazard");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.layer() === "people");
      \u0275\u0275attribute("aria-pressed", ctx.layer() === "people");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.layer() === "resources");
      \u0275\u0275attribute("aria-pressed", ctx.layer() === "resources");
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.zoom() <= 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(26, 21, ctx.zoom() * 100, "1.0-0"), "%");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.zoom() >= 1.4);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.location().name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.location().detail);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.location().elevation, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.location().kind === "shelter" ? "Capacity" : "Population");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(55, 24, ctx.location().population));
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.locationReports());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.locationOrders());
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate2("", ctx.runtime.shared().length, " / ", ctx.runtime.config.evidenceLimit, " REPORTS");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.shared());
    }
  }, dependencies: [CrisisIconComponent, DecimalPipe], styles: ["\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 100px 36px 122px;\n  display: block;\n  pointer-events: none;\n  z-index: 2;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-weight: 400;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b7ebd8;\n  outline-offset: 3px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.6px;\n  color: #a5bfc6;\n}\n.table-controls[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.table-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n  margin-bottom: 18px;\n}\n.table-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin-top: 8px;\n  outline: none;\n}\n.return-hint[_ngcontent-%COMP%] {\n  margin-top: 7px;\n  font-size: 10px;\n  color: #a2c6cb;\n}\n.return-hint[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7396a5;\n}\n.return-room[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 10px;\n  background: rgba(11, 34, 49, 0.8509803922);\n  border: 1px solid #476676;\n  padding: 10px 14px;\n  pointer-events: auto;\n}\n.return-room[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.map-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 11px 20px;\n  border-bottom: 1px solid rgba(55, 84, 97, 0.4);\n}\n.layer-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.layer-controls[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #7da2b0;\n  width: 15px;\n  height: 15px;\n  margin-right: 9px;\n}\n.layer-controls[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #8eacb8;\n  border: 1px solid transparent;\n  padding: 6px 13px;\n  font-size: 10px;\n}\n.layer-controls[_ngcontent-%COMP%]    > button.active[_ngcontent-%COMP%] {\n  color: #c6e5da;\n  border-color: rgba(102, 139, 133, 0.6);\n  background: rgba(52, 88, 79, 0.3333333333);\n}\n.map-legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 17px;\n  color: #8caab8;\n  font: 8px Consolas, monospace;\n}\n.map-legend[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.map-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 13px;\n  height: 7px;\n}\n.confirmed-key[_ngcontent-%COMP%] {\n  background: #64a6b1;\n  opacity: 0.6;\n}\n.forecast-key[_ngcontent-%COMP%] {\n  border: 1px dashed #d2a365;\n  background: rgba(210, 163, 101, 0.1333333333);\n}\n.map-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 260px;\n  flex: 1;\n  min-height: 0;\n}\n.map-viewport[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  min-height: 230px;\n  background: #0b2431;\n}\n.map-zoom[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  transition: transform 0.4s;\n}\n.map-top-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 17px;\n  left: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  pointer-events: none;\n}\n.map-top-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.3px;\n  color: #a2bfc6;\n}\n.map-top-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7797a4;\n}\n.map-zoom-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 20px;\n  bottom: 15px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: rgba(10, 36, 50, 0.8509803922);\n  border: 1px solid rgba(83, 119, 131, 0.5333333333);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.map-zoom-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: #b6d4d4;\n  width: 30px;\n  height: 30px;\n  background: transparent;\n  border: 0;\n}\n.map-zoom-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 9px Consolas, monospace;\n  color: #97b9c2;\n}\n.location-inspector[_ngcontent-%COMP%] {\n  overflow: auto;\n  border-left: 1px solid rgba(76, 110, 123, 0.4);\n  padding: 24px 22px;\n  scrollbar-width: thin;\n  scrollbar-color: #446c75 transparent;\n}\n.location-inspector[_ngcontent-%COMP%]    > .eyebrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n.location-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 25px;\n  margin-top: 13px;\n  outline: none;\n  letter-spacing: -0.5px;\n}\n.location-kind[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #96b7c0;\n  margin-top: 8px;\n}\n.location-inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.8;\n  color: #abc3ce;\n  margin-top: 20px;\n}\n.location-inspector[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  margin: 22px 0;\n  border-bottom: 1px solid rgba(60, 86, 98, 0.4);\n  padding-bottom: 20px;\n}\n.location-inspector[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #84a6b4;\n  margin-bottom: 6px;\n}\n.location-inspector[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  font-size: 23px;\n  font-weight: 300;\n  margin: 0;\n  color: #d7e4e8;\n}\n.location-inspector[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #a4bec8;\n}\n.location-reports[_ngcontent-%COMP%]    > .eyebrow[_ngcontent-%COMP%] {\n  font-size: 7px;\n  letter-spacing: 1.1px;\n}\n.location-reports[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(54, 81, 93, 0.4);\n}\n.location-reports[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  color: #95b9bc;\n}\n.location-reports[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.5;\n  margin-top: 8px;\n  color: #c3d7df;\n}\n.location-reports[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  background: transparent;\n  border: 0;\n  padding: 9px 0;\n  color: #9fcbbc;\n  font-size: 10px;\n}\n.location-reports[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n}\n.location-reports[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: #9bb8c2;\n  font-size: 10px;\n}\n.location-reports[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.location-reports[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.8;\n  padding: 10px 0;\n}\n.location-reports[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n}\n.no-reports[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #84a6b4;\n  line-height: 1.7;\n  margin-top: 12px;\n}\n.map-command[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  font-size: 10px;\n  padding: 12px;\n  margin-top: 24px;\n  border: 1px solid #5a857e;\n  background: rgba(45, 81, 75, 0.6);\n  color: #c2e3d4;\n}\n.map-command[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.location-order[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 10px;\n  color: #a3d0b9;\n  margin-top: 15px;\n}\n.location-order[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n}\n.shared-briefing[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(92, 122, 134, 0.4);\n  display: flex;\n  align-items: stretch;\n  gap: 14px;\n  padding: 16px 20px;\n  min-height: 82px;\n  flex-shrink: 0;\n  background: rgba(16, 39, 51, 0.7019607843);\n}\n.briefing-ident[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  min-width: 155px;\n}\n.briefing-ident[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: #82a9b3;\n}\n.briefing-ident[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #c0d0d3;\n}\n.briefing-ident[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  color: #789fad;\n  letter-spacing: 1px;\n  margin-top: 8px;\n}\n.shared-briefing[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #87a8b7;\n  line-height: 1.7;\n  margin: auto 0;\n  max-width: 440px;\n  padding-left: 20px;\n  border-left: 1px solid rgba(84, 117, 129, 0.3333333333);\n}\n.briefing-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  border: 1px solid rgba(66, 97, 108, 0.4);\n  background: rgba(28, 55, 64, 0.3019607843);\n  min-width: 0;\n}\n.briefing-locate[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  display: block;\n  text-align: left;\n  padding: 8px 12px;\n  flex: 1;\n  min-width: 0;\n}\n.briefing-locate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  color: #97b4ad;\n  letter-spacing: 0.8px;\n  margin-bottom: 6px;\n}\n.briefing-locate[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 400;\n  font-size: 10px;\n  line-height: 1.4;\n  display: block;\n}\n.unpin[_ngcontent-%COMP%] {\n  display: flex;\n  background: transparent;\n  border: 0;\n  padding: 8px;\n  color: #7c9eac;\n}\n.unpin[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n}\n@media (max-width: 950px) {\n  .map-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 225px;\n  }\n  .location-inspector[_ngcontent-%COMP%] {\n    padding: 20px 17px;\n  }\n  .location-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .briefing-ident[_ngcontent-%COMP%] {\n    min-width: 120px;\n  }\n  .briefing-ident[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .shared-briefing[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 14px;\n  }\n  .shared-briefing[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding-left: 12px;\n  }\n  .map-legend[_ngcontent-%COMP%] {\n    font-size: 7px;\n    gap: 12px;\n  }\n}\n@media (max-height: 760px) and (min-width: 800px) {\n  .shared-briefing[_ngcontent-%COMP%] {\n    min-height: 68px;\n    padding: 10px 14px;\n  }\n}\n@media (max-width: 700px) {\n  .map-console[_ngcontent-%COMP%] {\n    overflow: auto;\n    scrollbar-width: thin;\n    scrollbar-color: #3a6272 transparent;\n  }\n  .map-console[_ngcontent-%COMP%]   .console-chrome[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    z-index: 4;\n    background: rgba(22, 46, 59, 0.9607843137);\n  }\n  .map-toolbar[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    flex-wrap: wrap;\n    gap: 12px;\n    flex-shrink: 0;\n  }\n  .layer-controls[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n  .layer-controls[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    padding: 5px 12px;\n    font-size: 9px;\n  }\n  .map-legend[_ngcontent-%COMP%] {\n    font-size: 6px;\n    gap: 14px;\n    width: 100%;\n    padding-left: 3px;\n  }\n  .map-workspace[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    min-height: 0;\n    flex: none;\n  }\n  .map-viewport[_ngcontent-%COMP%] {\n    height: 320px;\n    min-height: 320px;\n    flex-shrink: 0;\n  }\n  .location-inspector[_ngcontent-%COMP%] {\n    overflow: visible;\n    padding: 23px;\n    border-left: 0;\n    border-top: 1px solid rgba(61, 94, 109, 0.5333333333);\n  }\n  .location-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .location-inspector[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n    max-width: 270px;\n  }\n  .location-inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .location-reports[_ngcontent-%COMP%] {\n    max-width: 500px;\n  }\n  .map-command[_ngcontent-%COMP%] {\n    max-width: 350px;\n  }\n  .shared-briefing[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 18px 22px;\n    gap: 12px;\n    flex-shrink: 0;\n  }\n  .briefing-ident[_ngcontent-%COMP%] {\n    padding: 2px 0 10px;\n  }\n  .briefing-ident[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-left: 16px;\n    font-size: 7px;\n  }\n  .shared-briefing[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    padding-left: 0;\n    border: 0;\n    font-size: 11px;\n  }\n  .briefing-item[_ngcontent-%COMP%] {\n    flex: none;\n  }\n  .briefing-locate[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n.map-toolbar[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  gap: 16px;\n  background: rgba(12, 37, 49, 0.9098039216);\n  border: 1px solid rgba(76, 114, 125, 0.4666666667);\n  pointer-events: auto;\n  padding: 8px 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n}\n.map-zoom-controls[_ngcontent-%COMP%] {\n  position: static;\n  gap: 4px;\n  border: 0;\n  border-left: 1px solid rgba(66, 97, 107, 0.5333333333);\n  padding-left: 8px;\n  background: transparent;\n}\n.map-legend[_ngcontent-%COMP%] {\n  gap: 12px;\n  font-size: 7px;\n}\n.map-workspace[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  position: absolute;\n  right: 0;\n  top: 70px;\n  bottom: 85px;\n  width: 258px;\n  pointer-events: none;\n}\n.location-inspector[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 20px;\n  pointer-events: auto;\n  background:\n    linear-gradient(\n      130deg,\n      rgba(16, 44, 56, 0.9490196078),\n      rgba(7, 29, 41, 0.9333333333));\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(79, 120, 135, 0.5411764706);\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4666666667);\n}\n.location-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.location-inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  font-size: 11px;\n}\n.location-inspector[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding-bottom: 15px;\n}\n.shared-briefing[_ngcontent-%COMP%] {\n  margin-top: auto;\n  pointer-events: auto;\n  min-height: 68px;\n  max-height: 90px;\n  padding: 10px 16px;\n  background: rgba(11, 34, 46, 0.9294117647);\n  border: 1px solid rgba(82, 117, 129, 0.4666666667);\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n}\n.table-heading[_ngcontent-%COMP%], \n.map-toolbar[_ngcontent-%COMP%], \n.location-inspector[_ngcontent-%COMP%], \n.shared-briefing[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_surface-wake 0.6s 0.55s both;\n}\n@keyframes _ngcontent-%COMP%_surface-wake {\n  from {\n    opacity: 0;\n    translate: 0 12px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (min-width: 1600px) {\n  [_nghost-%COMP%] {\n    inset: 122px 60px 152px;\n  }\n  .map-workspace[_ngcontent-%COMP%] {\n    width: 310px;\n  }\n  .location-inspector[_ngcontent-%COMP%] {\n    padding: 28px;\n  }\n}\n@media (max-width: 1050px) and (min-width: 701px) {\n  [_nghost-%COMP%] {\n    left: 24px;\n    right: 24px;\n  }\n  .map-legend[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .map-workspace[_ngcontent-%COMP%] {\n    width: 225px;\n  }\n  .location-inspector[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .map-toolbar[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .layer-controls[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n  }\n}\n@media (max-width: 700px) {\n  [_nghost-%COMP%] {\n    inset: 112px 15px 160px;\n  }\n  .table-heading[_ngcontent-%COMP%] {\n    margin-bottom: 14px;\n  }\n  .table-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .table-heading[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n  .return-room[_ngcontent-%COMP%] {\n    font-size: 0;\n    gap: 0;\n    padding: 8px;\n  }\n  .map-toolbar[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n    gap: 5px;\n    width: 100%;\n    padding: 6px;\n  }\n  .layer-controls[_ngcontent-%COMP%] {\n    gap: 1px;\n  }\n  .layer-controls[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .layer-controls[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    padding: 6px 10px;\n    font-size: 9px;\n  }\n  .map-legend[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .map-zoom-controls[_ngcontent-%COMP%] {\n    margin-left: auto;\n    gap: 0;\n    padding-left: 4px;\n  }\n  .map-zoom-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 25px;\n  }\n  .map-zoom-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .map-workspace[_ngcontent-%COMP%] {\n    display: flex;\n    top: 52%;\n    bottom: 76px;\n    width: 100%;\n    min-height: 0;\n  }\n  .location-inspector[_ngcontent-%COMP%] {\n    overflow: auto;\n    padding: 14px 17px;\n    border: 1px solid rgba(79, 120, 135, 0.5411764706);\n  }\n  .location-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n    margin-top: 8px;\n  }\n  .location-inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 11px;\n    margin-top: 10px;\n  }\n  .location-inspector[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n    margin: 12px 0;\n    max-width: none;\n  }\n  .location-inspector[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .location-reports[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n  .map-command[_ngcontent-%COMP%] {\n    max-width: none;\n    margin-top: 14px;\n  }\n  .location-inspector[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .shared-briefing[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 8px;\n    min-height: 62px;\n    max-height: 70px;\n    padding: 8px 10px;\n    overflow: auto;\n  }\n  .briefing-ident[_ngcontent-%COMP%] {\n    min-width: 85px;\n    padding: 0;\n  }\n  .briefing-ident[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .briefing-ident[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 0.5px;\n  }\n  .briefing-ident[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 5px;\n    margin: 5px 0 0;\n    letter-spacing: 0.5px;\n  }\n  .shared-briefing[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 9px;\n    line-height: 1.5;\n    padding: 0;\n    border: 0;\n  }\n  .briefing-item[_ngcontent-%COMP%] {\n    min-width: 150px;\n    flex: 1;\n  }\n  .briefing-locate[_ngcontent-%COMP%] {\n    padding: 4px 6px;\n  }\n  .briefing-locate[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .briefing-locate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n  .unpin[_ngcontent-%COMP%] {\n    padding: 4px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-table-controls.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisTableControlsComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-table-controls", imports: [DecimalPipe, CrisisIconComponent], template: `<section class="table-controls" aria-label="Situation table controls">
  <header class="table-heading">
    <div>
      <h2 tabindex="-1" data-panel-heading>Situation table</h2>
      <p class="return-hint">Click the surrounding room to step back <span>\xB7 Esc</span></p>
    </div>
    <button class="return-room" aria-label="Return to room" (click)="navigate.emit('room')">
      Return to room <app-crisis-icon name="close" />
    </button>
  </header>
  <div class="map-toolbar">
    <div class="layer-controls" aria-label="Map layer">
      <app-crisis-icon name="layers" /><button
        [class.active]="layer() === 'hazard'"
        [attr.aria-pressed]="layer() === 'hazard'"
        (click)="layerChanged.emit('hazard')"
      >
        Hazard</button
      ><button
        [class.active]="layer() === 'people'"
        [attr.aria-pressed]="layer() === 'people'"
        (click)="layerChanged.emit('people')"
      >
        People</button
      ><button
        [class.active]="layer() === 'resources'"
        [attr.aria-pressed]="layer() === 'resources'"
        (click)="layerChanged.emit('resources')"
      >
        Resources
      </button>
    </div>
    <div class="map-zoom-controls">
      <button aria-label="Zoom out map" (click)="zoomChanged.emit(-0.1)" [disabled]="zoom() <= 1">
        \u2212</button
      ><span>{{ zoom() * 100 | number: '1.0-0' }}%</span
      ><button aria-label="Zoom in map" (click)="zoomChanged.emit(0.1)" [disabled]="zoom() >= 1.4">
        +
      </button>
    </div>
    <div class="map-legend">
      <span><i class="confirmed-key"></i>Observed</span
      ><span><i class="forecast-key"></i>Projected extent</span>
    </div>
  </div>
  <div class="map-workspace">
    <aside class="location-inspector">
      <h2 tabindex="-1">{{ location().name }}</h2>
      <p>{{ location().detail }}</p>
      <dl>
        <div>
          <dt>Elevation</dt>
          <dd>{{ location().elevation }} <small>m</small></dd>
        </div>
        <div>
          <dt>{{ location().kind === 'shelter' ? 'Capacity' : 'Population' }}</dt>
          <dd>{{ location().population | number }}</dd>
        </div>
      </dl>
      <div class="location-reports">
        <span class="eyebrow">LATEST EVIDENCE</span>
        @for (report of locationReports(); track report.id) {
          <article>
            <small>{{ runtime.time(report.minute) }} \xB7 {{ report.confidence }}</small>
            <p>{{ report.title }}</p>
            <button
              (click)="runtime.read(report.id); runtime.share(report.id)"
              [disabled]="runtime.state().sharedEvidenceIds.includes(report.id)"
            >
              <app-crisis-icon name="pin" />{{
                runtime.state().sharedEvidenceIds.includes(report.id)
                  ? 'On the table'
                  : 'Pin report'
              }}
            </button>
            <details>
              <summary>Read source report</summary>
              <p>{{ report.body }}</p>
              <small>{{ report.source }}</small>
            </details>
          </article>
        } @empty {
          <p class="no-reports">
            No reports at this station. Check another specialist\u2019s incoming information.
          </p>
        }
      </div>
      @for (order of locationOrders(); track order.actionId) {
        <div class="location-order">
          <app-crisis-icon name="check" /><span>{{ order.action.mapLabel }}</span>
        </div>
      }
      <button class="map-command" (click)="navigate.emit('command')">
        Coordinate response <app-crisis-icon name="arrow" />
      </button>
    </aside>
  </div>
  <div class="shared-briefing">
    <div class="briefing-ident">
      <app-crisis-icon name="pin" /><span
        >PINNED EVIDENCE<small
          >{{ runtime.shared().length }} / {{ runtime.config.evidenceLimit }} REPORTS</small
        ></span
      >
    </div>
    @for (report of runtime.shared(); track report.id) {
      <div class="briefing-item">
        <button class="briefing-locate" (click)="locationSelected.emit(report.locationId)">
          <span>{{ report.confidence }} \xB7 {{ runtime.time(report.minute) }}</span
          ><strong>{{ report.title }}</strong></button
        ><button
          class="unpin"
          (click)="runtime.unshare(report.id)"
          [attr.aria-label]="'Unpin ' + report.title"
        >
          <app-crisis-icon name="close" />
        </button>
      </div>
    } @empty {
      <p>
        Pin useful evidence from the news or your station. Keep the three reports that matter most.
      </p>
    }
  </div>
</section>
`, styles: ["/* src/app/templates/crisis-operations/ui/crisis-table-controls.component.scss */\n:host {\n  position: absolute;\n  inset: 100px 36px 122px;\n  display: block;\n  pointer-events: none;\n  z-index: 2;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\np {\n  margin: 0;\n}\nh2 {\n  font-weight: 400;\n}\nbutton {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton:focus-visible,\nsummary:focus-visible {\n  outline: 2px solid #b7ebd8;\n  outline-offset: 3px;\n}\n.eyebrow {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.6px;\n  color: #a5bfc6;\n}\n.table-controls {\n  position: relative;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.table-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n  margin-bottom: 18px;\n}\n.table-heading h2 {\n  font-size: 22px;\n  margin-top: 8px;\n  outline: none;\n}\n.return-hint {\n  margin-top: 7px;\n  font-size: 10px;\n  color: #a2c6cb;\n}\n.return-hint span {\n  color: #7396a5;\n}\n.return-room {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 10px;\n  background: rgba(11, 34, 49, 0.8509803922);\n  border: 1px solid #476676;\n  padding: 10px 14px;\n  pointer-events: auto;\n}\n.return-room app-crisis-icon {\n  width: 16px;\n  height: 16px;\n}\n.map-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 11px 20px;\n  border-bottom: 1px solid rgba(55, 84, 97, 0.4);\n}\n.layer-controls {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.layer-controls > app-crisis-icon {\n  color: #7da2b0;\n  width: 15px;\n  height: 15px;\n  margin-right: 9px;\n}\n.layer-controls > button {\n  background: transparent;\n  color: #8eacb8;\n  border: 1px solid transparent;\n  padding: 6px 13px;\n  font-size: 10px;\n}\n.layer-controls > button.active {\n  color: #c6e5da;\n  border-color: rgba(102, 139, 133, 0.6);\n  background: rgba(52, 88, 79, 0.3333333333);\n}\n.map-legend {\n  display: flex;\n  gap: 17px;\n  color: #8caab8;\n  font: 8px Consolas, monospace;\n}\n.map-legend > span {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.map-legend i {\n  display: inline-block;\n  width: 13px;\n  height: 7px;\n}\n.confirmed-key {\n  background: #64a6b1;\n  opacity: 0.6;\n}\n.forecast-key {\n  border: 1px dashed #d2a365;\n  background: rgba(210, 163, 101, 0.1333333333);\n}\n.map-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 260px;\n  flex: 1;\n  min-height: 0;\n}\n.map-viewport {\n  position: relative;\n  overflow: hidden;\n  min-height: 230px;\n  background: #0b2431;\n}\n.map-zoom {\n  height: 100%;\n  width: 100%;\n  transition: transform 0.4s;\n}\n.map-top-label {\n  position: absolute;\n  top: 17px;\n  left: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  pointer-events: none;\n}\n.map-top-label span {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.3px;\n  color: #a2bfc6;\n}\n.map-top-label small {\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7797a4;\n}\n.map-zoom-controls {\n  position: absolute;\n  left: 20px;\n  bottom: 15px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: rgba(10, 36, 50, 0.8509803922);\n  border: 1px solid rgba(83, 119, 131, 0.5333333333);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.map-zoom-controls button {\n  font-size: 19px;\n  color: #b6d4d4;\n  width: 30px;\n  height: 30px;\n  background: transparent;\n  border: 0;\n}\n.map-zoom-controls span {\n  font: 9px Consolas, monospace;\n  color: #97b9c2;\n}\n.location-inspector {\n  overflow: auto;\n  border-left: 1px solid rgba(76, 110, 123, 0.4);\n  padding: 24px 22px;\n  scrollbar-width: thin;\n  scrollbar-color: #446c75 transparent;\n}\n.location-inspector > .eyebrow {\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n.location-inspector h2 {\n  font-size: 25px;\n  margin-top: 13px;\n  outline: none;\n  letter-spacing: -0.5px;\n}\n.location-kind {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #96b7c0;\n  margin-top: 8px;\n}\n.location-inspector > p {\n  font-size: 12px;\n  line-height: 1.8;\n  color: #abc3ce;\n  margin-top: 20px;\n}\n.location-inspector dl {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  margin: 22px 0;\n  border-bottom: 1px solid rgba(60, 86, 98, 0.4);\n  padding-bottom: 20px;\n}\n.location-inspector dt {\n  font-size: 9px;\n  color: #84a6b4;\n  margin-bottom: 6px;\n}\n.location-inspector dd {\n  font-size: 23px;\n  font-weight: 300;\n  margin: 0;\n  color: #d7e4e8;\n}\n.location-inspector dd small {\n  font-size: 11px;\n  color: #a4bec8;\n}\n.location-reports > .eyebrow {\n  font-size: 7px;\n  letter-spacing: 1.1px;\n}\n.location-reports article {\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(54, 81, 93, 0.4);\n}\n.location-reports article > small {\n  font: 8px Consolas, monospace;\n  color: #95b9bc;\n}\n.location-reports article > p {\n  font-size: 12px;\n  line-height: 1.5;\n  margin-top: 8px;\n  color: #c3d7df;\n}\n.location-reports article > button {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  background: transparent;\n  border: 0;\n  padding: 9px 0;\n  color: #9fcbbc;\n  font-size: 10px;\n}\n.location-reports article app-crisis-icon {\n  width: 12px;\n  height: 12px;\n}\n.location-reports details {\n  margin-top: 6px;\n  color: #9bb8c2;\n  font-size: 10px;\n}\n.location-reports summary {\n  cursor: pointer;\n}\n.location-reports details p {\n  font-size: 11px;\n  line-height: 1.8;\n  padding: 10px 0;\n}\n.location-reports details small {\n  font-size: 9px;\n}\n.no-reports {\n  font-size: 10px;\n  color: #84a6b4;\n  line-height: 1.7;\n  margin-top: 12px;\n}\n.map-command {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  font-size: 10px;\n  padding: 12px;\n  margin-top: 24px;\n  border: 1px solid #5a857e;\n  background: rgba(45, 81, 75, 0.6);\n  color: #c2e3d4;\n}\n.map-command app-crisis-icon {\n  width: 15px;\n  height: 15px;\n}\n.location-order {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 10px;\n  color: #a3d0b9;\n  margin-top: 15px;\n}\n.location-order app-crisis-icon {\n  width: 13px;\n  height: 13px;\n}\n.shared-briefing {\n  border-top: 1px solid rgba(92, 122, 134, 0.4);\n  display: flex;\n  align-items: stretch;\n  gap: 14px;\n  padding: 16px 20px;\n  min-height: 82px;\n  flex-shrink: 0;\n  background: rgba(16, 39, 51, 0.7019607843);\n}\n.briefing-ident {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  min-width: 155px;\n}\n.briefing-ident > app-crisis-icon {\n  width: 16px;\n  height: 16px;\n  color: #82a9b3;\n}\n.briefing-ident > span {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #c0d0d3;\n}\n.briefing-ident small {\n  display: block;\n  font: 7px Consolas, monospace;\n  color: #789fad;\n  letter-spacing: 1px;\n  margin-top: 8px;\n}\n.shared-briefing > p {\n  font-size: 11px;\n  color: #87a8b7;\n  line-height: 1.7;\n  margin: auto 0;\n  max-width: 440px;\n  padding-left: 20px;\n  border-left: 1px solid rgba(84, 117, 129, 0.3333333333);\n}\n.briefing-item {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  border: 1px solid rgba(66, 97, 108, 0.4);\n  background: rgba(28, 55, 64, 0.3019607843);\n  min-width: 0;\n}\n.briefing-locate {\n  background: transparent;\n  border: 0;\n  display: block;\n  text-align: left;\n  padding: 8px 12px;\n  flex: 1;\n  min-width: 0;\n}\n.briefing-locate span {\n  display: block;\n  font: 7px Consolas, monospace;\n  color: #97b4ad;\n  letter-spacing: 0.8px;\n  margin-bottom: 6px;\n}\n.briefing-locate strong {\n  font-weight: 400;\n  font-size: 10px;\n  line-height: 1.4;\n  display: block;\n}\n.unpin {\n  display: flex;\n  background: transparent;\n  border: 0;\n  padding: 8px;\n  color: #7c9eac;\n}\n.unpin app-crisis-icon {\n  width: 13px;\n  height: 13px;\n}\n@media (max-width: 950px) {\n  .map-workspace {\n    grid-template-columns: minmax(0, 1fr) 225px;\n  }\n  .location-inspector {\n    padding: 20px 17px;\n  }\n  .location-inspector h2 {\n    font-size: 23px;\n  }\n  .briefing-ident {\n    min-width: 120px;\n  }\n  .briefing-ident > span {\n    font-size: 7px;\n  }\n  .shared-briefing {\n    gap: 8px;\n    padding: 14px;\n  }\n  .shared-briefing > p {\n    font-size: 10px;\n    padding-left: 12px;\n  }\n  .map-legend {\n    font-size: 7px;\n    gap: 12px;\n  }\n}\n@media (max-height: 760px) and (min-width: 800px) {\n  .shared-briefing {\n    min-height: 68px;\n    padding: 10px 14px;\n  }\n}\n@media (max-width: 700px) {\n  .map-console {\n    overflow: auto;\n    scrollbar-width: thin;\n    scrollbar-color: #3a6272 transparent;\n  }\n  .map-console .console-chrome {\n    position: sticky;\n    top: 0;\n    z-index: 4;\n    background: rgba(22, 46, 59, 0.9607843137);\n  }\n  .map-toolbar {\n    padding: 10px 12px;\n    flex-wrap: wrap;\n    gap: 12px;\n    flex-shrink: 0;\n  }\n  .layer-controls {\n    gap: 2px;\n  }\n  .layer-controls > button {\n    padding: 5px 12px;\n    font-size: 9px;\n  }\n  .map-legend {\n    font-size: 6px;\n    gap: 14px;\n    width: 100%;\n    padding-left: 3px;\n  }\n  .map-workspace {\n    display: flex;\n    flex-direction: column;\n    min-height: 0;\n    flex: none;\n  }\n  .map-viewport {\n    height: 320px;\n    min-height: 320px;\n    flex-shrink: 0;\n  }\n  .location-inspector {\n    overflow: visible;\n    padding: 23px;\n    border-left: 0;\n    border-top: 1px solid rgba(61, 94, 109, 0.5333333333);\n  }\n  .location-inspector h2 {\n    font-size: 24px;\n  }\n  .location-inspector dl {\n    max-width: 270px;\n  }\n  .location-inspector > p {\n    font-size: 12px;\n  }\n  .location-reports {\n    max-width: 500px;\n  }\n  .map-command {\n    max-width: 350px;\n  }\n  .shared-briefing {\n    flex-direction: column;\n    padding: 18px 22px;\n    gap: 12px;\n    flex-shrink: 0;\n  }\n  .briefing-ident {\n    padding: 2px 0 10px;\n  }\n  .briefing-ident small {\n    display: inline-block;\n    margin-left: 16px;\n    font-size: 7px;\n  }\n  .shared-briefing > p {\n    padding-left: 0;\n    border: 0;\n    font-size: 11px;\n  }\n  .briefing-item {\n    flex: none;\n  }\n  .briefing-locate strong {\n    font-size: 11px;\n  }\n}\n.map-toolbar {\n  align-self: flex-start;\n  gap: 16px;\n  background: rgba(12, 37, 49, 0.9098039216);\n  border: 1px solid rgba(76, 114, 125, 0.4666666667);\n  pointer-events: auto;\n  padding: 8px 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n}\n.map-zoom-controls {\n  position: static;\n  gap: 4px;\n  border: 0;\n  border-left: 1px solid rgba(66, 97, 107, 0.5333333333);\n  padding-left: 8px;\n  background: transparent;\n}\n.map-legend {\n  gap: 12px;\n  font-size: 7px;\n}\n.map-workspace {\n  display: flex;\n  justify-content: flex-end;\n  position: absolute;\n  right: 0;\n  top: 70px;\n  bottom: 85px;\n  width: 258px;\n  pointer-events: none;\n}\n.location-inspector {\n  width: 100%;\n  padding: 20px;\n  pointer-events: auto;\n  background:\n    linear-gradient(\n      130deg,\n      rgba(16, 44, 56, 0.9490196078),\n      rgba(7, 29, 41, 0.9333333333));\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(79, 120, 135, 0.5411764706);\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4666666667);\n}\n.location-inspector h2 {\n  font-size: 24px;\n}\n.location-inspector > p {\n  margin-top: 14px;\n  font-size: 11px;\n}\n.location-inspector dl {\n  margin: 16px 0;\n  padding-bottom: 15px;\n}\n.shared-briefing {\n  margin-top: auto;\n  pointer-events: auto;\n  min-height: 68px;\n  max-height: 90px;\n  padding: 10px 16px;\n  background: rgba(11, 34, 46, 0.9294117647);\n  border: 1px solid rgba(82, 117, 129, 0.4666666667);\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n}\n.table-heading,\n.map-toolbar,\n.location-inspector,\n.shared-briefing {\n  animation: surface-wake 0.6s 0.55s both;\n}\n@keyframes surface-wake {\n  from {\n    opacity: 0;\n    translate: 0 12px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (min-width: 1600px) {\n  :host {\n    inset: 122px 60px 152px;\n  }\n  .map-workspace {\n    width: 310px;\n  }\n  .location-inspector {\n    padding: 28px;\n  }\n}\n@media (max-width: 1050px) and (min-width: 701px) {\n  :host {\n    left: 24px;\n    right: 24px;\n  }\n  .map-legend {\n    display: none;\n  }\n  .map-workspace {\n    width: 225px;\n  }\n  .location-inspector {\n    padding: 16px;\n  }\n  .map-toolbar {\n    gap: 8px;\n  }\n  .layer-controls > button {\n    padding: 6px 8px;\n  }\n}\n@media (max-width: 700px) {\n  :host {\n    inset: 112px 15px 160px;\n  }\n  .table-heading {\n    margin-bottom: 14px;\n  }\n  .table-heading h2 {\n    font-size: 18px;\n  }\n  .table-heading .eyebrow {\n    font-size: 6px;\n  }\n  .return-room {\n    font-size: 0;\n    gap: 0;\n    padding: 8px;\n  }\n  .map-toolbar {\n    flex-wrap: nowrap;\n    gap: 5px;\n    width: 100%;\n    padding: 6px;\n  }\n  .layer-controls {\n    gap: 1px;\n  }\n  .layer-controls > app-crisis-icon {\n    display: none;\n  }\n  .layer-controls > button {\n    padding: 6px 10px;\n    font-size: 9px;\n  }\n  .map-legend {\n    display: none;\n  }\n  .map-zoom-controls {\n    margin-left: auto;\n    gap: 0;\n    padding-left: 4px;\n  }\n  .map-zoom-controls button {\n    width: 24px;\n    height: 25px;\n  }\n  .map-zoom-controls span {\n    font-size: 8px;\n  }\n  .map-workspace {\n    display: flex;\n    top: 52%;\n    bottom: 76px;\n    width: 100%;\n    min-height: 0;\n  }\n  .location-inspector {\n    overflow: auto;\n    padding: 14px 17px;\n    border: 1px solid rgba(79, 120, 135, 0.5411764706);\n  }\n  .location-inspector h2 {\n    font-size: 20px;\n    margin-top: 8px;\n  }\n  .location-inspector > p {\n    font-size: 11px;\n    margin-top: 10px;\n  }\n  .location-inspector dl {\n    margin: 12px 0;\n    max-width: none;\n  }\n  .location-inspector dd {\n    font-size: 20px;\n  }\n  .location-reports {\n    max-width: none;\n  }\n  .map-command {\n    max-width: none;\n    margin-top: 14px;\n  }\n  .location-inspector details p {\n    font-size: 11px;\n  }\n  .shared-briefing {\n    flex-direction: row;\n    gap: 8px;\n    min-height: 62px;\n    max-height: 70px;\n    padding: 8px 10px;\n    overflow: auto;\n  }\n  .briefing-ident {\n    min-width: 85px;\n    padding: 0;\n  }\n  .briefing-ident > app-crisis-icon {\n    display: none;\n  }\n  .briefing-ident > span {\n    font-size: 6px;\n    letter-spacing: 0.5px;\n  }\n  .briefing-ident small {\n    display: block;\n    font-size: 5px;\n    margin: 5px 0 0;\n    letter-spacing: 0.5px;\n  }\n  .shared-briefing > p {\n    font-size: 9px;\n    line-height: 1.5;\n    padding: 0;\n    border: 0;\n  }\n  .briefing-item {\n    min-width: 150px;\n    flex: 1;\n  }\n  .briefing-locate {\n    padding: 4px 6px;\n  }\n  .briefing-locate strong {\n    font-size: 9px;\n  }\n  .briefing-locate span {\n    font-size: 6px;\n  }\n  .unpin {\n    padding: 4px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-table-controls.component.css.map */\n"] }]
  }], null, { selectedLocation: [{ type: Input, args: [{ isSignal: true, alias: "selectedLocation", required: true }] }], layer: [{ type: Input, args: [{ isSignal: true, alias: "layer", required: false }] }], zoom: [{ type: Input, args: [{ isSignal: true, alias: "zoom", required: false }] }], layerChanged: [{ type: Output, args: ["layerChanged"] }], zoomChanged: [{ type: Output, args: ["zoomChanged"] }], locationSelected: [{ type: Output, args: ["locationSelected"] }], navigate: [{ type: Output, args: ["navigate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisTableControlsComponent, { className: "CrisisTableControlsComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-table-controls.component.ts", lineNumber: 14 });
})();

// src/app/templates/crisis-operations/ui/crisis-command-panel.component.ts
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack14 = ($index, $item) => $item.actionId;
function CrisisCommandPanelComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showResponses());
    });
    \u0275\u0275element(1, "app-crisis-icon", 9);
    \u0275\u0275text(2, "All responses ");
    \u0275\u0275elementEnd();
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 3)(1, "button", 10);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showResponses());
    });
    \u0275\u0275text(2, " Responses ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 10);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showLog());
    });
    \u0275\u0275text(4, " Dispatched ");
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", !ctx_r1.showingLog());
    \u0275\u0275attribute("aria-pressed", !ctx_r1.showingLog());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.showingLog());
    \u0275\u0275attribute("aria-pressed", ctx_r1.showingLog());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.orders().length);
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_9_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15)(1, "input", 21);
    \u0275\u0275listener("change", function CrisisCommandPanelComponent_Conditional_0_Conditional_9_For_20_Template_input_change_1_listener() {
      const report_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.attach(report_r7.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const report_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.attached().includes(report_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(report_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", report_r7.confidence, " \xB7 ", report_r7.source);
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_9_ForEmpty_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "p");
    \u0275\u0275text(2, "Pin a report to support this response.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 10);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_9_ForEmpty_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.navigate.emit("station"));
    });
    \u0275\u0275text(4, " Find a report ");
    \u0275\u0275element(5, "app-crisis-icon", 20);
    \u0275\u0275elementEnd()();
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_9_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_9_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "Choose at least one report above.");
    \u0275\u0275elementEnd();
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 5)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 13)(11, "strong");
    \u0275\u0275text(12, "Tradeoff");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "fieldset", 14)(15, "legend");
    \u0275\u0275text(16, " Use evidence ");
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(19, CrisisCommandPanelComponent_Conditional_0_Conditional_9_For_20_Template, 7, 4, "label", 15, _forTrack04, false, CrisisCommandPanelComponent_Conditional_0_Conditional_9_ForEmpty_21_Template, 6, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 17);
    \u0275\u0275conditionalCreate(23, CrisisCommandPanelComponent_Conditional_0_Conditional_9_Conditional_23_Template, 2, 1, "p", 18)(24, CrisisCommandPanelComponent_Conditional_0_Conditional_9_Conditional_24_Template, 2, 0, "p", 18);
    \u0275\u0275elementStart(25, "button", 19);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_9_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.commit());
    });
    \u0275\u0275text(26);
    \u0275\u0275element(27, "app-crisis-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "small");
    \u0275\u0275text(29, "Crews stay assigned for this exercise.");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const action_r8 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r8.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", action_r8.crews, " ", action_r8.crews === 1 ? "crew" : "crews");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", action_r8.duration, " min response");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r8.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(action_r8.tradeoff);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.attachedEvidence().length, " selected");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.shared());
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_10_0 = ctx_r1.runtime.blocked(action_r8)) ? 23 : !ctx_r1.attachedEvidence().length && ctx_r1.runtime.shared().length ? 24 : -1, tmp_10_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.attachedEvidence().length || !!ctx_r1.runtime.blocked(action_r8));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Dispatch ", action_r8.crews, " ", action_r8.crews === 1 ? "crew" : "crews");
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275element(1, "app-crisis-icon", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.confirmation(), " ");
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_10_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 23)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r1.runtime.time(order_r10.minute), " \xB7 ", order_r10.action.crews, " ", order_r10.action.crews === 1 ? "crew" : "crews");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.action.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.action.outcome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", order_r10.evidenceIds.length, " supporting ", order_r10.evidenceIds.length === 1 ? "report" : "reports");
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_10_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "app-crisis-icon", 26);
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "No crews dispatched yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Choose a response to review its cost and evidence.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_10_ForEmpty_4_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showResponses());
    });
    \u0275\u0275text(7, " View responses ");
    \u0275\u0275element(8, "app-crisis-icon", 20);
    \u0275\u0275elementEnd()();
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 6);
    \u0275\u0275conditionalCreate(1, CrisisCommandPanelComponent_Conditional_0_Conditional_10_Conditional_1_Template, 3, 1, "p", 22);
    \u0275\u0275repeaterCreate(2, CrisisCommandPanelComponent_Conditional_0_Conditional_10_For_3_Template, 9, 7, "article", 23, _forTrack14, false, CrisisCommandPanelComponent_Conditional_0_Conditional_10_ForEmpty_4_Template, 9, 0, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.confirmation() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.orders());
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_11_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function CrisisCommandPanelComponent_Conditional_0_Conditional_11_For_4_Template_button_click_0_listener() {
      const action_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectAction(action_r12.id));
    });
    \u0275\u0275elementStart(1, "span")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "app-crisis-icon", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !!ctx_r1.runtime.blocked(action_r12));
    \u0275\u0275attribute("data-action-id", action_r12.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(action_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.blocked(action_r12) || action_r12.duration + " min response");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", action_r12.crews, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r12.crews === 1 ? "crew" : "crews");
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_11_ForEmpty_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "All available responses have been dispatched.");
    \u0275\u0275elementEnd();
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_11_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r13.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.blocked(action_r13));
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 29)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CrisisCommandPanelComponent_Conditional_0_Conditional_11_Conditional_6_For_4_Template, 5, 2, "p", null, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.pendingOptions().length, " ", ctx_r1.pendingOptions().length === 1 ? "response awaiting" : "responses awaiting", " updates ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pendingOptions());
  }
}
function CrisisCommandPanelComponent_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 7)(1, "p", 27);
    \u0275\u0275text(2, "Choose where your crews can help.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CrisisCommandPanelComponent_Conditional_0_Conditional_11_For_4_Template, 11, 6, "button", 28, _forTrack04, false, CrisisCommandPanelComponent_Conditional_0_Conditional_11_ForEmpty_5_Template, 2, 0, "p", 27);
    \u0275\u0275conditionalCreate(6, CrisisCommandPanelComponent_Conditional_0_Conditional_11_Conditional_6_Template, 5, 2, "details", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.responseOptions());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pendingOptions().length ? 6 : -1);
  }
}
function CrisisCommandPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1);
    \u0275\u0275conditionalCreate(2, CrisisCommandPanelComponent_Conditional_0_Conditional_2_Template, 3, 0, "button", 2)(3, CrisisCommandPanelComponent_Conditional_0_Conditional_3_Template, 7, 7, "nav", 3);
    \u0275\u0275elementStart(4, "span", 4);
    \u0275\u0275element(5, "i");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " crews free");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, CrisisCommandPanelComponent_Conditional_0_Conditional_9_Template, 30, 12, "section", 5)(10, CrisisCommandPanelComponent_Conditional_0_Conditional_10_Template, 5, 2, "section", 6)(11, CrisisCommandPanelComponent_Conditional_0_Conditional_11_Template, 7, 2, "section", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedAction() ? 2 : 3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.crews());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.selectedAction()) ? 9 : ctx_r1.showingLog() ? 10 : 11, tmp_3_0);
  }
}
var CrisisCommandPanelComponent = class _CrisisCommandPanelComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  focusTimer;
  active = input(
    false,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestedActionId = input(
    "",
    ...ngDevMode ? [{ debugName: "suggestedActionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  navigate = output();
  selectedActionId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedActionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attached = signal(
    [],
    ...ngDevMode ? [{ debugName: "attached" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showingLog = signal(
    false,
    ...ngDevMode ? [{ debugName: "showingLog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmation = signal(
    "",
    ...ngDevMode ? [{ debugName: "confirmation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedAction = computed(
    () => this.runtime.config.actions.find((action) => action.id === this.selectedActionId()),
    ...ngDevMode ? [{ debugName: "selectedAction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseOptions = computed(
    () => this.runtime.config.actions.filter((action) => action.minStage <= this.runtime.state().stage && !this.runtime.state().decisions.some((order) => order.actionId === action.id)),
    ...ngDevMode ? [{ debugName: "responseOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingOptions = computed(
    () => this.runtime.config.actions.filter((action) => action.minStage > this.runtime.state().stage),
    ...ngDevMode ? [{ debugName: "pendingOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attachedEvidence = computed(
    () => this.runtime.shared().filter((report) => this.attached().includes(report.id)),
    ...ngDevMode ? [{ debugName: "attachedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const id = this.suggestedActionId();
      if (this.active() && id && this.runtime.config.actions.some((action) => action.id === id))
        untracked(() => this.selectAction(id));
    });
  }
  selectAction(id) {
    this.selectedActionId.set(id);
    this.attached.set([]);
    this.showingLog.set(false);
    this.confirmation.set("");
    this.reveal(".order-review");
  }
  showResponses() {
    this.selectedActionId.set("");
    this.showingLog.set(false);
    this.reveal(".response-options");
  }
  showLog() {
    this.selectedActionId.set("");
    this.showingLog.set(true);
    this.reveal(".orders-log");
  }
  attach(id) {
    this.attached.update((ids) => ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]);
  }
  commit() {
    const action = this.selectedAction();
    if (action && this.runtime.commit(action.id, this.attachedEvidence().map((report) => report.id))) {
      this.confirmation.set(`${action.crews} ${action.crews === 1 ? "crew" : "crews"} dispatched.`);
      this.attached.set([]);
      this.showLog();
    }
  }
  reveal(selector) {
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const target = this.element.nativeElement.querySelector(selector);
      this.element.nativeElement.querySelector(".command-panel")?.scrollIntoView({ block: "start", behavior: "instant" });
      target?.focus({ preventScroll: true });
    }, 0);
  }
  ngOnDestroy() {
    clearTimeout(this.focusTimer);
  }
  static \u0275fac = function CrisisCommandPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisCommandPanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisCommandPanelComponent, selectors: [["app-crisis-command-panel"]], inputs: { active: [1, "active"], suggestedActionId: [1, "suggestedActionId"] }, outputs: { navigate: "navigate" }, decls: 1, vars: 1, consts: [[1, "command-panel"], [1, "command-summary"], [1, "back-to-responses"], ["aria-label", "Response views", 1, "command-tabs"], [1, "crew-inventory"], ["tabindex", "-1", "aria-label", "Review response", 1, "order-review"], ["tabindex", "-1", "aria-label", "Dispatched responses", 1, "orders-log"], ["tabindex", "-1", "aria-label", "Available responses", 1, "response-options"], [1, "back-to-responses", 3, "click"], ["name", "back"], [3, "click"], [1, "response-facts"], [1, "response-description"], [1, "tradeoff"], [1, "supporting-evidence"], [1, "attach-evidence"], [1, "empty-evidence"], [1, "dispatch-controls"], [1, "dispatch-hint"], [1, "dispatch-button", 3, "click", "disabled"], ["name", "arrow"], ["type", "checkbox", 3, "change", "checked"], ["role", "status", 1, "dispatch-confirmation"], [1, "log-entry"], [1, "empty-log"], ["name", "check"], ["name", "command"], [1, "list-hint"], [1, "order-option", 3, "disabled"], [1, "pending-orders"], [1, "order-option", 3, "click", "disabled"], [1, "crew-cost"]], template: function CrisisCommandPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CrisisCommandPanelComponent_Conditional_0_Template, 12, 3, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.active() ? 0 : -1);
    }
  }, dependencies: [CrisisIconComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce8e9;\n  font: 14px/1.5 "Segoe UI", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  line-height: 1.3;\n  font-weight: 450;\n  letter-spacing: -0.5px;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  border: 0;\n  background: transparent;\n  padding: 10px 0;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  color: #d9fff0;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b7ecdd;\n  outline-offset: 4px;\n}\nsection[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\napp-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\nsmall[_ngcontent-%COMP%] {\n  color: #96b5bc;\n  font-size: 11px;\n}\n.command-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 740px;\n  margin: 0 auto;\n}\n.command-summary[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: #0c212c;\n  box-shadow: 0 -24px #0c212c;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  min-height: 44px;\n  padding-bottom: 15px;\n  margin-bottom: 18px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.4);\n}\n.command-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n}\n.command-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #8fabba;\n  position: relative;\n}\n.command-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #d0f2e4;\n}\n.command-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  height: 2px;\n  background: #b4e9d4;\n  left: 0;\n  right: 0;\n  bottom: -16px;\n}\n.command-tabs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  opacity: 0.7;\n}\n.crew-inventory[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  white-space: nowrap;\n  color: #a4c0c5;\n  font-size: 12px;\n}\n.crew-inventory[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #d0efdf;\n  font-size: 18px;\n}\n.crew-inventory[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #a3dac1;\n  margin-right: 3px;\n}\n.back-to-responses[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b6d3d8;\n}\n.list-hint[_ngcontent-%COMP%] {\n  color: #9ebbc4;\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.order-option[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  text-align: left;\n  padding: 16px 8px;\n  gap: 24px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  transition: background 0.2s;\n}\n.order-option[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(135, 201, 181, 0.0470588235);\n}\n.order-option[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n  min-width: 0;\n}\n.order-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 16px;\n  font-weight: 450;\n}\n.order-option[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n}\n.order-option[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #80a8ae;\n}\n.crew-cost[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  align-items: baseline;\n  color: #c0dfd4;\n  font-size: 21px;\n  white-space: nowrap;\n}\n.pending-orders[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  color: #89a7b2;\n  font-size: 12px;\n}\n.pending-orders[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 8px 0;\n}\n.pending-orders[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 12px 0 12px 16px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.2);\n}\n.pending-orders[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  margin-top: 4px;\n}\n.response-facts[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n  color: #b0cfc8;\n  font-size: 12px;\n  margin: 12px 0 18px;\n}\n.response-facts[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]    + span[_ngcontent-%COMP%] {\n  border-left: 1px solid rgba(87, 119, 108, 0.4666666667);\n  padding-left: 18px;\n}\n.response-description[_ngcontent-%COMP%] {\n  color: #bad0d4;\n  line-height: 1.7;\n  font-size: 14px;\n}\n.tradeoff[_ngcontent-%COMP%] {\n  margin: 20px 0 26px;\n  color: #c6d0c7;\n  border-left: 2px solid #cbb083;\n  padding: 2px 0 2px 15px;\n  font-size: 12px;\n  line-height: 1.65;\n}\n.tradeoff[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 500;\n  color: #ddc398;\n  margin-bottom: 4px;\n}\n.supporting-evidence[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n}\n.supporting-evidence[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  color: #cbdfdf;\n  font-size: 13px;\n  padding: 0 0 10px;\n}\n.supporting-evidence[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #81a3b0;\n  font-size: 11px;\n}\n.attach-evidence[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 13px;\n  cursor: pointer;\n  padding: 14px 0;\n  border-top: 1px solid rgba(60, 89, 99, 0.2666666667);\n}\n.attach-evidence[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  margin: 3px 0;\n  accent-color: #a9dfca;\n  flex-shrink: 0;\n}\n.attach-evidence[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 450;\n  font-size: 13px;\n}\n.attach-evidence[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n}\n.dispatch-controls[_ngcontent-%COMP%] {\n  padding: 18px 0 2px;\n  border-top: 1px solid rgba(60, 89, 99, 0.4);\n  margin-top: 12px;\n}\n.dispatch-hint[_ngcontent-%COMP%] {\n  color: #c8b992;\n  font-size: 12px;\n  margin-bottom: 12px;\n}\n.dispatch-button[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding: 14px 18px;\n  background: #b1dfcc;\n  border-radius: 3px;\n  color: #112e2c;\n  font-weight: 500;\n}\n.dispatch-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c3f0dd;\n  color: #112e2c;\n}\n.dispatch-controls[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 10px;\n  font-size: 10px;\n  text-align: center;\n}\n.empty-evidence[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(60, 89, 99, 0.2666666667);\n  padding: 14px 0 8px;\n  color: #a6c1c8;\n  font-size: 12px;\n}\n.empty-evidence[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #bfe1d5;\n  margin-top: 6px;\n}\n.log-entry[_ngcontent-%COMP%] {\n  padding: 8px 0 24px;\n  margin-bottom: 22px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n}\n.log-entry[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #91bba9;\n}\n.log-entry[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 9px 0;\n}\n.log-entry[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b3cbd1;\n  font-size: 13px;\n  line-height: 1.7;\n}\n.log-entry[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n}\n.dispatch-confirmation[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  color: #b3e4ca;\n  font-size: 13px;\n  margin-bottom: 24px;\n}\n.empty-log[_ngcontent-%COMP%] {\n  padding: 25px 0;\n}\n.empty-log[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #8db8b1;\n  width: 28px;\n  height: 28px;\n  margin-bottom: 20px;\n}\n.empty-log[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.empty-log[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #9cb8c3;\n  font-size: 13px;\n}\n.empty-log[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #bde3d5;\n  font-size: 13px;\n}\n@media (max-width: 620px) {\n  .command-summary[_ngcontent-%COMP%] {\n    gap: 12px;\n    margin-bottom: 18px;\n    padding-bottom: 12px;\n  }\n  .command-tabs[_ngcontent-%COMP%] {\n    gap: 18px;\n  }\n  .command-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .command-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]:after {\n    bottom: -13px;\n  }\n  .crew-inventory[_ngcontent-%COMP%] {\n    font-size: 10px;\n    gap: 4px;\n  }\n  .crew-inventory[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .crew-inventory[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .order-option[_ngcontent-%COMP%] {\n    gap: 12px;\n    padding: 18px 0;\n  }\n  .order-option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .crew-cost[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .crew-cost[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .response-description[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-command-panel.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisCommandPanelComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-command-panel", imports: [CrisisIconComponent], template: `@if (active()) {
  <div class="command-panel">
    <header class="command-summary">
      @if (selectedAction()) {
        <button class="back-to-responses" (click)="showResponses()">
          <app-crisis-icon name="back" />All responses
        </button>
      } @else {
        <nav class="command-tabs" aria-label="Response views">
          <button
            [class.active]="!showingLog()"
            [attr.aria-pressed]="!showingLog()"
            (click)="showResponses()"
          >
            Responses
          </button>
          <button
            [class.active]="showingLog()"
            [attr.aria-pressed]="showingLog()"
            (click)="showLog()"
          >
            Dispatched <span>{{ runtime.orders().length }}</span>
          </button>
        </nav>
      }
      <span class="crew-inventory"
        ><i></i><strong>{{ runtime.crews() }}</strong> crews free</span
      >
    </header>

    @if (selectedAction(); as action) {
      <section class="order-review" tabindex="-1" aria-label="Review response">
        <h2>{{ action.title }}</h2>
        <div class="response-facts">
          <span>{{ action.crews }} {{ action.crews === 1 ? 'crew' : 'crews' }}</span
          ><span>{{ action.duration }} min response</span>
        </div>
        <p class="response-description">{{ action.description }}</p>
        <p class="tradeoff"><strong>Tradeoff</strong>{{ action.tradeoff }}</p>
        <fieldset class="supporting-evidence">
          <legend>
            Use evidence <span>{{ attachedEvidence().length }} selected</span>
          </legend>
          @for (report of runtime.shared(); track report.id) {
            <label class="attach-evidence"
              ><input
                type="checkbox"
                [checked]="attached().includes(report.id)"
                (change)="attach(report.id)"
              /><span
                ><strong>{{ report.title }}</strong
                ><small>{{ report.confidence }} \xB7 {{ report.source }}</small></span
              ></label
            >
          } @empty {
            <div class="empty-evidence">
              <p>Pin a report to support this response.</p>
              <button (click)="navigate.emit('station')">
                Find a report <app-crisis-icon name="arrow" />
              </button>
            </div>
          }
        </fieldset>
        <div class="dispatch-controls">
          @if (runtime.blocked(action); as reason) {
            <p class="dispatch-hint">{{ reason }}</p>
          } @else if (!attachedEvidence().length && runtime.shared().length) {
            <p class="dispatch-hint">Choose at least one report above.</p>
          }
          <button
            class="dispatch-button"
            [disabled]="!attachedEvidence().length || !!runtime.blocked(action)"
            (click)="commit()"
          >
            Dispatch {{ action.crews }} {{ action.crews === 1 ? 'crew' : 'crews'
            }}<app-crisis-icon name="arrow" />
          </button>
          <small>Crews stay assigned for this exercise.</small>
        </div>
      </section>
    } @else if (showingLog()) {
      <section class="orders-log" tabindex="-1" aria-label="Dispatched responses">
        @if (confirmation()) {
          <p class="dispatch-confirmation" role="status">
            <app-crisis-icon name="check" />{{ confirmation() }}
          </p>
        }
        @for (order of runtime.orders(); track order.actionId) {
          <article class="log-entry">
            <span
              >{{ runtime.time(order.minute) }} \xB7 {{ order.action.crews }}
              {{ order.action.crews === 1 ? 'crew' : 'crews' }}</span
            >
            <h2>{{ order.action.title }}</h2>
            <p>{{ order.action.outcome }}</p>
            <small
              >{{ order.evidenceIds.length }} supporting
              {{ order.evidenceIds.length === 1 ? 'report' : 'reports' }}</small
            >
          </article>
        } @empty {
          <div class="empty-log">
            <app-crisis-icon name="command" />
            <h2>No crews dispatched yet</h2>
            <p>Choose a response to review its cost and evidence.</p>
            <button (click)="showResponses()">
              View responses <app-crisis-icon name="arrow" />
            </button>
          </div>
        }
      </section>
    } @else {
      <section class="response-options" tabindex="-1" aria-label="Available responses">
        <p class="list-hint">Choose where your crews can help.</p>
        @for (action of responseOptions(); track action.id) {
          <button
            class="order-option"
            [attr.data-action-id]="action.id"
            [disabled]="!!runtime.blocked(action)"
            (click)="selectAction(action.id)"
          >
            <span
              ><strong>{{ action.title }}</strong
              ><small>{{
                runtime.blocked(action) || action.duration + ' min response'
              }}</small></span
            ><span class="crew-cost"
              >{{ action.crews }} <small>{{ action.crews === 1 ? 'crew' : 'crews' }}</small></span
            ><app-crisis-icon name="arrow" />
          </button>
        } @empty {
          <p class="list-hint">All available responses have been dispatched.</p>
        }
        @if (pendingOptions().length) {
          <details class="pending-orders">
            <summary>
              {{ pendingOptions().length }}
              {{
                pendingOptions().length === 1 ? 'response awaiting' : 'responses awaiting'
              }}
              updates
            </summary>
            @for (action of pendingOptions(); track action.id) {
              <p>
                <span>{{ action.title }}</span
                ><small>{{ runtime.blocked(action) }}</small>
              </p>
            }
          </details>
        }
      </section>
    }
  </div>
}
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-command-panel.component.scss */\n:host {\n  display: block;\n  color: #dce8e9;\n  font: 14px/1.5 "Segoe UI", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\np {\n  margin: 0;\n}\nh2 {\n  font-size: 24px;\n  line-height: 1.3;\n  font-weight: 450;\n  letter-spacing: -0.5px;\n}\nbutton {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  border: 0;\n  background: transparent;\n  padding: 10px 0;\n}\nbutton:hover {\n  color: #d9fff0;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\nbutton:focus-visible,\ninput:focus-visible,\nsummary:focus-visible {\n  outline: 2px solid #b7ecdd;\n  outline-offset: 4px;\n}\nsection:focus {\n  outline: none;\n}\napp-crisis-icon {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\nsmall {\n  color: #96b5bc;\n  font-size: 11px;\n}\n.command-panel {\n  width: 100%;\n  max-width: 740px;\n  margin: 0 auto;\n}\n.command-summary {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: #0c212c;\n  box-shadow: 0 -24px #0c212c;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  min-height: 44px;\n  padding-bottom: 15px;\n  margin-bottom: 18px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.4);\n}\n.command-tabs {\n  display: flex;\n  gap: 24px;\n}\n.command-tabs button {\n  color: #8fabba;\n  position: relative;\n}\n.command-tabs button.active {\n  color: #d0f2e4;\n}\n.command-tabs button.active:after {\n  content: "";\n  position: absolute;\n  height: 2px;\n  background: #b4e9d4;\n  left: 0;\n  right: 0;\n  bottom: -16px;\n}\n.command-tabs span {\n  font-size: 11px;\n  opacity: 0.7;\n}\n.crew-inventory {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  white-space: nowrap;\n  color: #a4c0c5;\n  font-size: 12px;\n}\n.crew-inventory strong {\n  font-weight: 500;\n  color: #d0efdf;\n  font-size: 18px;\n}\n.crew-inventory i {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #a3dac1;\n  margin-right: 3px;\n}\n.back-to-responses {\n  font-size: 12px;\n  color: #b6d3d8;\n}\n.list-hint {\n  color: #9ebbc4;\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.order-option {\n  width: 100%;\n  display: flex;\n  text-align: left;\n  padding: 16px 8px;\n  gap: 24px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  transition: background 0.2s;\n}\n.order-option:hover:not(:disabled) {\n  background: rgba(135, 201, 181, 0.0470588235);\n}\n.order-option > span:first-child {\n  flex: 1;\n  min-width: 0;\n}\n.order-option strong {\n  display: block;\n  font-size: 16px;\n  font-weight: 450;\n}\n.order-option > span:first-child small {\n  display: block;\n  margin-top: 5px;\n}\n.order-option > app-crisis-icon {\n  color: #80a8ae;\n}\n.crew-cost {\n  display: flex;\n  gap: 5px;\n  align-items: baseline;\n  color: #c0dfd4;\n  font-size: 21px;\n  white-space: nowrap;\n}\n.pending-orders {\n  margin-top: 20px;\n  color: #89a7b2;\n  font-size: 12px;\n}\n.pending-orders summary {\n  cursor: pointer;\n  padding: 8px 0;\n}\n.pending-orders p {\n  padding: 12px 0 12px 16px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.2);\n}\n.pending-orders small {\n  display: block;\n  font-size: 10px;\n  margin-top: 4px;\n}\n.response-facts {\n  display: flex;\n  gap: 18px;\n  color: #b0cfc8;\n  font-size: 12px;\n  margin: 12px 0 18px;\n}\n.response-facts span + span {\n  border-left: 1px solid rgba(87, 119, 108, 0.4666666667);\n  padding-left: 18px;\n}\n.response-description {\n  color: #bad0d4;\n  line-height: 1.7;\n  font-size: 14px;\n}\n.tradeoff {\n  margin: 20px 0 26px;\n  color: #c6d0c7;\n  border-left: 2px solid #cbb083;\n  padding: 2px 0 2px 15px;\n  font-size: 12px;\n  line-height: 1.65;\n}\n.tradeoff strong {\n  display: block;\n  font-weight: 500;\n  color: #ddc398;\n  margin-bottom: 4px;\n}\n.supporting-evidence {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n}\n.supporting-evidence legend {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  color: #cbdfdf;\n  font-size: 13px;\n  padding: 0 0 10px;\n}\n.supporting-evidence legend span {\n  color: #81a3b0;\n  font-size: 11px;\n}\n.attach-evidence {\n  display: flex;\n  gap: 13px;\n  cursor: pointer;\n  padding: 14px 0;\n  border-top: 1px solid rgba(60, 89, 99, 0.2666666667);\n}\n.attach-evidence input {\n  width: 17px;\n  height: 17px;\n  margin: 3px 0;\n  accent-color: #a9dfca;\n  flex-shrink: 0;\n}\n.attach-evidence strong {\n  display: block;\n  font-weight: 450;\n  font-size: 13px;\n}\n.attach-evidence small {\n  display: block;\n  margin-top: 4px;\n}\n.dispatch-controls {\n  padding: 18px 0 2px;\n  border-top: 1px solid rgba(60, 89, 99, 0.4);\n  margin-top: 12px;\n}\n.dispatch-hint {\n  color: #c8b992;\n  font-size: 12px;\n  margin-bottom: 12px;\n}\n.dispatch-button {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding: 14px 18px;\n  background: #b1dfcc;\n  border-radius: 3px;\n  color: #112e2c;\n  font-weight: 500;\n}\n.dispatch-button:hover:not(:disabled) {\n  background: #c3f0dd;\n  color: #112e2c;\n}\n.dispatch-controls > small {\n  display: block;\n  margin-top: 10px;\n  font-size: 10px;\n  text-align: center;\n}\n.empty-evidence {\n  border-top: 1px solid rgba(60, 89, 99, 0.2666666667);\n  padding: 14px 0 8px;\n  color: #a6c1c8;\n  font-size: 12px;\n}\n.empty-evidence button {\n  color: #bfe1d5;\n  margin-top: 6px;\n}\n.log-entry {\n  padding: 8px 0 24px;\n  margin-bottom: 22px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n}\n.log-entry > span {\n  font-size: 11px;\n  color: #91bba9;\n}\n.log-entry h2 {\n  font-size: 18px;\n  margin: 9px 0;\n}\n.log-entry p {\n  color: #b3cbd1;\n  font-size: 13px;\n  line-height: 1.7;\n}\n.log-entry small {\n  display: block;\n  margin-top: 12px;\n}\n.dispatch-confirmation {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  color: #b3e4ca;\n  font-size: 13px;\n  margin-bottom: 24px;\n}\n.empty-log {\n  padding: 25px 0;\n}\n.empty-log > app-crisis-icon {\n  color: #8db8b1;\n  width: 28px;\n  height: 28px;\n  margin-bottom: 20px;\n}\n.empty-log h2 {\n  font-size: 21px;\n}\n.empty-log p {\n  margin: 12px 0;\n  color: #9cb8c3;\n  font-size: 13px;\n}\n.empty-log button {\n  color: #bde3d5;\n  font-size: 13px;\n}\n@media (max-width: 620px) {\n  .command-summary {\n    gap: 12px;\n    margin-bottom: 18px;\n    padding-bottom: 12px;\n  }\n  .command-tabs {\n    gap: 18px;\n  }\n  .command-tabs button {\n    font-size: 12px;\n  }\n  .command-tabs button.active:after {\n    bottom: -13px;\n  }\n  .crew-inventory {\n    font-size: 10px;\n    gap: 4px;\n  }\n  .crew-inventory strong {\n    font-size: 16px;\n  }\n  .crew-inventory i {\n    display: none;\n  }\n  .order-option {\n    gap: 12px;\n    padding: 18px 0;\n  }\n  .order-option strong {\n    font-size: 14px;\n  }\n  .crew-cost {\n    font-size: 18px;\n  }\n  .crew-cost small {\n    font-size: 10px;\n  }\n  h2 {\n    font-size: 22px;\n  }\n  .response-description {\n    font-size: 13px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-command-panel.component.css.map */\n'] }]
  }], () => [], { active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], suggestedActionId: [{ type: Input, args: [{ isSignal: true, alias: "suggestedActionId", required: false }] }], navigate: [{ type: Output, args: ["navigate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisCommandPanelComponent, { className: "CrisisCommandPanelComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-command-panel.component.ts", lineNumber: 23 });
})();

// src/app/templates/crisis-operations/ui/crisis-console.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function CrisisConsoleComponent_Conditional_0_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 14);
    \u0275\u0275element(9, "path", 15)(10, "path", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const reading_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(reading_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", reading_r3.value, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reading_r3.unit);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", reading_r3.label + " history: " + reading_r3.trend.join(", ") + " " + reading_r3.unit);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("d", ctx_r1.trendPath(reading_r3.trend));
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 2)(1, "button", 4);
    \u0275\u0275listener("click", function CrisisConsoleComponent_Conditional_0_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeReport());
    });
    \u0275\u0275element(2, "app-crisis-icon", 5);
    \u0275\u0275text(3, "All reports ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "h2");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, CrisisConsoleComponent_Conditional_0_Conditional_1_Conditional_11_Template, 11, 5, "div", 7);
    \u0275\u0275elementStart(12, "p", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 9)(15, "button", 10);
    \u0275\u0275listener("click", function CrisisConsoleComponent_Conditional_0_Conditional_1_Template_button_click_15_listener() {
      const report_r4 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pin(report_r4));
    });
    \u0275\u0275element(16, "app-crisis-icon", 11);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 12);
    \u0275\u0275listener("click", function CrisisConsoleComponent_Conditional_0_Conditional_1_Template_button_click_18_listener() {
      const report_r4 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inspectLocation.emit(report_r4.locationId));
    });
    \u0275\u0275text(19, " Locate on table ");
    \u0275\u0275element(20, "app-crisis-icon", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const report_r4 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275classMap("confidence " + report_r4.confidence.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(report_r4.confidence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.time(report_r4.minute), " \xB7 ", report_r4.source);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r4.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = report_r4.reading) ? 11 : -1, tmp_7_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r4.body);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.runtime.state().sharedEvidenceIds.includes(report_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.state().sharedEvidenceIds.includes(report_r4.id) ? "Pinned to table" : "Pin to table", " ");
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", role_r6.id)("selected", role_r6.id === ctx_r1.runtime.state().roleId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r6.shortName, " ");
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_2_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function CrisisConsoleComponent_Conditional_0_Conditional_2_For_12_Template_button_click_0_listener() {
      const report_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openReport(report_r8));
    });
    \u0275\u0275elementStart(1, "span", 24)(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "app-crisis-icon", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const report_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("data-station-report-id", report_r8.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.time(report_r8.minute), " \xB7 ", report_r8.source);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r8.title);
    \u0275\u0275advance();
    \u0275\u0275classMap("confidence " + report_r8.confidence.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(report_r8.confidence);
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_2_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "No reports at this station yet.");
    \u0275\u0275elementEnd();
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 17)(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "select", 18);
    \u0275\u0275listener("change", function CrisisConsoleComponent_Conditional_0_Conditional_2_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.runtime.selectRole($event.target.value);
      return \u0275\u0275resetView(ctx_r1.selectedEvidenceId.set(""));
    });
    \u0275\u0275repeaterCreate(4, CrisisConsoleComponent_Conditional_0_Conditional_2_For_5_Template, 2, 3, "option", 19, _forTrack05);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "section", 20)(9, "p", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, CrisisConsoleComponent_Conditional_0_Conditional_2_For_12_Template, 9, 7, "button", 22, _forTrack05, false, CrisisConsoleComponent_Conditional_0_Conditional_2_ForEmpty_13_Template, 2, 0, "p", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.workstation() ? "Specialty" : "Station");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.runtime.state().roleId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.stationRoles());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.unread(), " unread");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.role().focus);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.reports());
  }
}
function CrisisConsoleComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275element(1, "app-crisis-icon", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.confirmation(), " ");
  }
}
function CrisisConsoleComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, CrisisConsoleComponent_Conditional_0_Conditional_1_Template, 21, 10, "section", 2)(2, CrisisConsoleComponent_Conditional_0_Conditional_2_Template, 14, 5);
    \u0275\u0275conditionalCreate(3, CrisisConsoleComponent_Conditional_0_Conditional_3_Template, 3, 1, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.selectedEvidence()) ? 1 : 2, tmp_1_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.confirmation() ? 3 : -1);
  }
}
var CrisisConsoleComponent = class _CrisisConsoleComponent {
  element = inject(ElementRef);
  focusTimer;
  runtime = inject(CrisisRuntimeService);
  view = input.required(
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestedActionId = input(
    "",
    ...ngDevMode ? [{ debugName: "suggestedActionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workstation = input(
    ...ngDevMode ? [void 0, { debugName: "workstation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stationRoles = computed(
    () => {
      const station = this.workstation();
      return station ? this.runtime.config.roles.filter((role) => station.roleIds.includes(role.id)) : this.runtime.config.roles;
    },
    ...ngDevMode ? [{ debugName: "stationRoles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  navigate = output();
  inspectLocation = output();
  selectedEvidenceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedEvidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmation = signal(
    "",
    ...ngDevMode ? [{ debugName: "confirmation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidence = computed(
    () => this.runtime.reports().find((report) => report.id === this.selectedEvidenceId()),
    ...ngDevMode ? [{ debugName: "selectedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.workstation();
      this.selectedEvidenceId.set("");
      this.confirmation.set("");
    });
  }
  openReport(report) {
    this.selectedEvidenceId.set(report.id);
    this.confirmation.set("");
    this.runtime.read(report.id);
    this.reveal(".evidence-reader");
  }
  closeReport() {
    this.selectedEvidenceId.set("");
    this.confirmation.set("");
    this.reveal(".wire");
  }
  pin(report) {
    this.runtime.read(report.id);
    if (this.runtime.share(report.id))
      this.confirmation.set("Report pinned to the situation table.");
  }
  reveal(selector) {
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const target = this.element.nativeElement.querySelector(selector);
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
      target?.focus({ preventScroll: true });
    }, 0);
  }
  trendPath(trend) {
    const min = Math.min(...trend) * 0.9, max = Math.max(...trend);
    return trend.map((value, index) => `${index === 0 ? "M" : "L"}${index * 360 / (trend.length - 1)} ${86 - (value - min) / (max - min || 1) * 70}`).join(" ");
  }
  ngOnDestroy() {
    clearTimeout(this.focusTimer);
  }
  static \u0275fac = function CrisisConsoleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisConsoleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisConsoleComponent, selectors: [["app-crisis-console"]], inputs: { view: [1, "view"], suggestedActionId: [1, "suggestedActionId"], workstation: [1, "workstation"] }, outputs: { navigate: "navigate", inspectLocation: "inspectLocation" }, decls: 2, vars: 3, consts: [[1, "station-panel"], [3, "navigate", "active", "suggestedActionId"], ["tabindex", "-1", "aria-label", "Selected report", 1, "evidence-reader"], ["role", "status", 1, "console-confirmation"], [1, "back-to-reports", 3, "click"], ["name", "back"], [1, "report-meta"], [1, "reading"], [1, "report-body"], [1, "report-tools"], [1, "primary", 3, "click", "disabled"], ["name", "pin"], [3, "click"], ["name", "arrow"], ["viewBox", "0 0 360 100", "role", "img"], ["d", "M0 25H360M0 55H360M0 85H360", "stroke", "#294247", "stroke-width", "1"], ["fill", "none", "stroke", "#82decb", "stroke-width", "2"], [1, "station-heading"], [3, "change", "value"], [3, "value", "selected"], ["tabindex", "-1", "aria-label", "Your incoming reports", 1, "wire"], [1, "station-focus"], [1, "wire-report"], [1, "wire-report", 3, "click"], [1, "wire-copy"], [1, "meta"], ["name", "check"]], template: function CrisisConsoleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CrisisConsoleComponent_Conditional_0_Template, 4, 2, "div", 0);
      \u0275\u0275elementStart(1, "app-crisis-command-panel", 1);
      \u0275\u0275listener("navigate", function CrisisConsoleComponent_Template_app_crisis_command_panel_navigate_1_listener($event) {
        return ctx.navigate.emit($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.view() === "station" ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("active", ctx.view() === "command")("suggestedActionId", ctx.suggestedActionId());
    }
  }, dependencies: [CrisisIconComponent, CrisisCommandPanelComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce8e9;\n  font: 14px/1.5 "Segoe UI", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 450;\n  line-height: 1.3;\n  letter-spacing: -0.5px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 0;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  color: #d9fff0;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.5;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b7ecdd;\n  outline-offset: 4px;\n}\nsection[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\napp-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.station-panel[_ngcontent-%COMP%] {\n  max-width: 740px;\n  margin: 0 auto;\n}\n.station-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding-bottom: 18px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.4);\n}\n.station-heading[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #9ab6bf;\n  font-size: 12px;\n}\n.station-heading[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: #132d36;\n  border: 1px solid rgba(74, 107, 116, 0.3333333333);\n  border-radius: 3px;\n  padding: 8px 30px 8px 12px;\n  max-width: 220px;\n}\n.station-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9abbb8;\n  white-space: nowrap;\n}\n.station-focus[_ngcontent-%COMP%] {\n  color: #8fafb9;\n  font-size: 12px;\n  padding: 18px 0 4px;\n  line-height: 1.6;\n}\n.wire-report[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  text-align: left;\n  padding: 22px 0;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  gap: 18px;\n}\n.wire-report[_ngcontent-%COMP%]:hover {\n  background: rgba(135, 201, 181, 0.0470588235);\n}\n.wire-copy[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.wire-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 16px;\n  font-weight: 450;\n  line-height: 1.4;\n  margin-top: 7px;\n}\n.meta[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8eacb8;\n}\n.confidence[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #a4d9bc;\n  white-space: nowrap;\n}\n.confidence.forecast[_ngcontent-%COMP%] {\n  color: #e1be84;\n}\n.confidence.unverified[_ngcontent-%COMP%] {\n  color: #e3a48e;\n}\n.wire-report[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #81a8b0;\n}\n.back-to-reports[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b2ced4;\n  margin-bottom: 24px;\n}\n.report-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: baseline;\n  flex-wrap: wrap;\n  color: #8faeb9;\n  font-size: 11px;\n  margin-bottom: 12px;\n}\n.report-meta[_ngcontent-%COMP%]   .confidence[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.report-body[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.9;\n  color: #b9cfd5;\n  margin-top: 22px;\n  max-width: 680px;\n}\n.reading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-top: 1px solid rgba(60, 89, 99, 0.3333333333);\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  padding: 22px 0;\n  margin-top: 24px;\n}\n.reading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.reading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9fbac0;\n}\n.reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1.3;\n  color: #c2e8dc;\n}\n.reading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #91b9b7;\n}\n.reading[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  width: 100%;\n  max-width: 360px;\n  height: 85px;\n}\n.report-tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n  align-items: center;\n  padding-top: 24px;\n  margin-top: 24px;\n  border-top: 1px solid rgba(60, 89, 99, 0.3333333333);\n}\n.report-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.report-tools[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  border-radius: 3px;\n  padding: 12px 18px;\n  background: #b1dfcc;\n  color: #112e2c;\n}\n.console-confirmation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #b5e1c8;\n  font-size: 12px;\n  margin-top: 24px;\n}\n@media (max-width: 620px) {\n  h2[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .station-heading[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .station-heading[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    gap: 8px;\n    font-size: 11px;\n  }\n  .station-heading[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    max-width: 170px;\n    padding-right: 15px;\n    font-size: 12px;\n  }\n  .station-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .wire-report[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 18px 0;\n  }\n  .wire-copy[_ngcontent-%COMP%] {\n    flex-basis: calc(100% - 26px);\n  }\n  .wire-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .wire-report[_ngcontent-%COMP%]    > .confidence[_ngcontent-%COMP%] {\n    order: 3;\n    width: 100%;\n  }\n  .report-body[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .reading[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .reading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: 90px;\n  }\n  .reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 33px;\n  }\n  .report-tools[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n}\n/*# sourceMappingURL=crisis-console.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisConsoleComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-console", imports: [CrisisIconComponent, CrisisCommandPanelComponent], template: `@if (view() === 'station') {
  <div class="station-panel">
    @if (selectedEvidence(); as report) {
      <section class="evidence-reader" tabindex="-1" aria-label="Selected report">
        <button class="back-to-reports" (click)="closeReport()">
          <app-crisis-icon name="back" />All reports
        </button>
        <div class="report-meta">
          <span [class]="'confidence ' + report.confidence.toLowerCase()">{{
            report.confidence
          }}</span
          ><span>{{ runtime.time(report.minute) }} \xB7 {{ report.source }}</span>
        </div>
        <h2>{{ report.title }}</h2>
        @if (report.reading; as reading) {
          <div class="reading">
            <div>
              <span>{{ reading.label }}</span
              ><strong
                >{{ reading.value }} <small>{{ reading.unit }}</small></strong
              >
            </div>
            <svg
              viewBox="0 0 360 100"
              role="img"
              [attr.aria-label]="
                reading.label + ' history: ' + reading.trend.join(', ') + ' ' + reading.unit
              "
            >
              <path d="M0 25H360M0 55H360M0 85H360" stroke="#294247" stroke-width="1" />
              <path
                [attr.d]="trendPath(reading.trend)"
                fill="none"
                stroke="#82decb"
                stroke-width="2"
              />
            </svg>
          </div>
        }
        <p class="report-body">{{ report.body }}</p>
        <div class="report-tools">
          <button
            class="primary"
            (click)="pin(report)"
            [disabled]="runtime.state().sharedEvidenceIds.includes(report.id)"
          >
            <app-crisis-icon name="pin" />{{
              runtime.state().sharedEvidenceIds.includes(report.id)
                ? 'Pinned to table'
                : 'Pin to table'
            }}
          </button>
          <button (click)="inspectLocation.emit(report.locationId)">
            Locate on table <app-crisis-icon name="arrow" />
          </button>
        </div>
      </section>
    } @else {
      <header class="station-heading">
        <label
          >{{ workstation() ? 'Specialty' : 'Station'
          }}<select
            [value]="runtime.state().roleId"
            (change)="runtime.selectRole($any($event.target).value); selectedEvidenceId.set('')"
          >
            @for (role of stationRoles(); track role.id) {
              <option [value]="role.id" [selected]="role.id === runtime.state().roleId">
                {{ role.shortName }}
              </option>
            }
          </select></label
        >
        <span>{{ runtime.unread() }} unread</span>
      </header>
      <section class="wire" tabindex="-1" aria-label="Your incoming reports">
        <p class="station-focus">{{ runtime.role().focus }}</p>
        @for (report of runtime.reports(); track report.id) {
          <button
            class="wire-report"
            [attr.data-station-report-id]="report.id"
            (click)="openReport(report)"
          >
            <span class="wire-copy"
              ><span class="meta">{{ runtime.time(report.minute) }} \xB7 {{ report.source }}</span
              ><strong>{{ report.title }}</strong></span
            >
            <span [class]="'confidence ' + report.confidence.toLowerCase()">{{
              report.confidence
            }}</span
            ><app-crisis-icon name="arrow" />
          </button>
        } @empty {
          <p class="station-focus">No reports at this station yet.</p>
        }
      </section>
    }
    @if (confirmation()) {
      <p class="console-confirmation" role="status">
        <app-crisis-icon name="check" />{{ confirmation() }}
      </p>
    }
  </div>
}
<app-crisis-command-panel
  [active]="view() === 'command'"
  [suggestedActionId]="suggestedActionId()"
  (navigate)="navigate.emit($event)"
/>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-console.component.scss */\n:host {\n  display: block;\n  color: #dce8e9;\n  font: 14px/1.5 "Segoe UI", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\np {\n  margin: 0;\n}\nh2 {\n  font-size: 26px;\n  font-weight: 450;\n  line-height: 1.3;\n  letter-spacing: -0.5px;\n}\nbutton,\nselect {\n  font: inherit;\n  color: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 0;\n}\nbutton:hover {\n  color: #d9fff0;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.5;\n}\nbutton:focus-visible,\nselect:focus-visible {\n  outline: 2px solid #b7ecdd;\n  outline-offset: 4px;\n}\nsection:focus {\n  outline: none;\n}\napp-crisis-icon {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.station-panel {\n  max-width: 740px;\n  margin: 0 auto;\n}\n.station-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding-bottom: 18px;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.4);\n}\n.station-heading label {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #9ab6bf;\n  font-size: 12px;\n}\n.station-heading select {\n  background: #132d36;\n  border: 1px solid rgba(74, 107, 116, 0.3333333333);\n  border-radius: 3px;\n  padding: 8px 30px 8px 12px;\n  max-width: 220px;\n}\n.station-heading > span {\n  font-size: 12px;\n  color: #9abbb8;\n  white-space: nowrap;\n}\n.station-focus {\n  color: #8fafb9;\n  font-size: 12px;\n  padding: 18px 0 4px;\n  line-height: 1.6;\n}\n.wire-report {\n  display: flex;\n  width: 100%;\n  text-align: left;\n  padding: 22px 0;\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  gap: 18px;\n}\n.wire-report:hover {\n  background: rgba(135, 201, 181, 0.0470588235);\n}\n.wire-copy {\n  flex: 1;\n  min-width: 0;\n}\n.wire-copy strong {\n  display: block;\n  font-size: 16px;\n  font-weight: 450;\n  line-height: 1.4;\n  margin-top: 7px;\n}\n.meta {\n  font-size: 11px;\n  color: #8eacb8;\n}\n.confidence {\n  font-size: 10px;\n  color: #a4d9bc;\n  white-space: nowrap;\n}\n.confidence.forecast {\n  color: #e1be84;\n}\n.confidence.unverified {\n  color: #e3a48e;\n}\n.wire-report > app-crisis-icon {\n  color: #81a8b0;\n}\n.back-to-reports {\n  font-size: 12px;\n  color: #b2ced4;\n  margin-bottom: 24px;\n}\n.report-meta {\n  display: flex;\n  gap: 12px;\n  align-items: baseline;\n  flex-wrap: wrap;\n  color: #8faeb9;\n  font-size: 11px;\n  margin-bottom: 12px;\n}\n.report-meta .confidence {\n  font-size: 11px;\n}\n.report-body {\n  font-size: 15px;\n  line-height: 1.9;\n  color: #b9cfd5;\n  margin-top: 22px;\n  max-width: 680px;\n}\n.reading {\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-top: 1px solid rgba(60, 89, 99, 0.3333333333);\n  border-bottom: 1px solid rgba(60, 89, 99, 0.3333333333);\n  padding: 22px 0;\n  margin-top: 24px;\n}\n.reading > div {\n  min-width: 120px;\n}\n.reading span {\n  font-size: 11px;\n  color: #9fbac0;\n}\n.reading strong {\n  display: block;\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1.3;\n  color: #c2e8dc;\n}\n.reading small {\n  font-size: 20px;\n  color: #91b9b7;\n}\n.reading svg {\n  flex: 1;\n  min-width: 0;\n  width: 100%;\n  max-width: 360px;\n  height: 85px;\n}\n.report-tools {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n  align-items: center;\n  padding-top: 24px;\n  margin-top: 24px;\n  border-top: 1px solid rgba(60, 89, 99, 0.3333333333);\n}\n.report-tools button {\n  font-size: 13px;\n}\n.report-tools .primary {\n  border-radius: 3px;\n  padding: 12px 18px;\n  background: #b1dfcc;\n  color: #112e2c;\n}\n.console-confirmation {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #b5e1c8;\n  font-size: 12px;\n  margin-top: 24px;\n}\n@media (max-width: 620px) {\n  h2 {\n    font-size: 23px;\n  }\n  .station-heading {\n    gap: 12px;\n  }\n  .station-heading label {\n    gap: 8px;\n    font-size: 11px;\n  }\n  .station-heading select {\n    max-width: 170px;\n    padding-right: 15px;\n    font-size: 12px;\n  }\n  .station-heading > span {\n    font-size: 10px;\n  }\n  .wire-report {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 18px 0;\n  }\n  .wire-copy {\n    flex-basis: calc(100% - 26px);\n  }\n  .wire-copy strong {\n    font-size: 15px;\n  }\n  .wire-report > .confidence {\n    order: 3;\n    width: 100%;\n  }\n  .report-body {\n    font-size: 14px;\n  }\n  .reading {\n    gap: 16px;\n  }\n  .reading > div {\n    min-width: 90px;\n  }\n  .reading strong {\n    font-size: 33px;\n  }\n  .report-tools {\n    gap: 16px;\n  }\n}\n/*# sourceMappingURL=crisis-console.component.css.map */\n'] }]
  }], () => [], { view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: true }] }], suggestedActionId: [{ type: Input, args: [{ isSignal: true, alias: "suggestedActionId", required: false }] }], workstation: [{ type: Input, args: [{ isSignal: true, alias: "workstation", required: false }] }], navigate: [{ type: Output, args: ["navigate"] }], inspectLocation: [{ type: Output, args: ["inspectLocation"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisConsoleComponent, { className: "CrisisConsoleComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-console.component.ts", lineNumber: 23 });
})();

// src/app/templates/crisis-operations/domain/crisis-companion.ts
function nextCompanionStop(current, count, random) {
  if (count < 2) return 0;
  const index = Math.min(count - 1, Math.max(0, Math.trunc(current)));
  if (index === 0) return 1;
  if (index === count - 1) return count - 2;
  return index + (random < 0.5 ? -1 : 1);
}
function companionSignals(config, state) {
  const reports = [...visibleEvidence(config, state)].sort((a, b) => b.minute - a.minute);
  const latest = reports[0];
  const unverified = reports.find((report) => report.confidence === "Unverified");
  const confirmed = reports.filter((report) => report.confidence === "Confirmed").length;
  return {
    reports,
    latest,
    unverified,
    confirmed,
    forecast: reports.filter((report) => report.confidence === "Forecast").length,
    unverifiedCount: reports.filter((report) => report.confidence === "Unverified").length,
    unread: reports.filter((report) => !state.readEvidenceIds.includes(report.id)).length
  };
}
function companionPreview(config, state, actionId) {
  const action = config.actions.find((item) => item.id === actionId);
  const risk = crisisForecast(config, state).risk, crews = availableCrews(config, state);
  const blocked = action ? actionBlockedReason(config, state, action) : "Choose a response.";
  const projected = action && !blocked ? __spreadProps(__spreadValues({}, state), {
    decisions: [
      ...state.decisions,
      {
        actionId: action.id,
        evidenceIds: [],
        minute: config.bulletins[state.stage].minute,
        stage: state.stage
      }
    ]
  }) : state;
  return {
    action,
    blocked,
    risk,
    projectedRisk: crisisForecast(config, projected).risk,
    crews,
    remainingCrews: availableCrews(config, projected)
  };
}

// src/app/templates/crisis-operations/ui/crisis-companion-briefing.component.ts
var _forTrack06 = ($index, $item) => $item.id;
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_36_Template_button_click_2_listener() {
      const unverified_r4 = \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showReport(unverified_r4.id));
    });
    \u0275\u0275text(3, " Show me the source ");
    \u0275\u0275element(4, "app-crisis-icon", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.title, ". Let\u2019s check who reported it and when.");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_37_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.choose("analysis"));
    });
    \u0275\u0275text(3, " Compare the options ");
    \u0275\u0275element(4, "app-crisis-icon", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.shared().length, " reports are pinned. We can compare a response against the crews you have left. ");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " A field report is a good starting point. We can inspect it together and keep it where the team can use it. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_38_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.choose("report"));
    });
    \u0275\u0275text(3, " Bring up a report ");
    \u0275\u0275element(4, "app-crisis-icon", 22);
    \u0275\u0275elementEnd();
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_39_Template_button_click_0_listener() {
      const place_r8 = \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.locate.emit(place_r8.id));
    });
    \u0275\u0275element(1, "app-crisis-icon", 24);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "You were looking at ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Go there \u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.name);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 16);
    \u0275\u0275element(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 18)(9, "div")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div")(18, "span");
    \u0275\u0275text(19, "AVAILABLE CREWS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275elementStart(22, "small");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "span");
    \u0275\u0275text(26, "UNREAD SIGNALS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementStart(29, "small");
    \u0275\u0275text(30, " TO REVIEW");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div", 19);
    \u0275\u0275element(32, "app-crisis-icon", 14);
    \u0275\u0275elementStart(33, "div")(34, "h4");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_36_Template, 5, 1)(37, CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_37_Template, 5, 1)(38, CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_38_Template, 5, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(39, CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Conditional_39_Template, 8, 1, "button", 20);
  }
  if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" AS OF ", ctx_r1.runtime.time());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().summary);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(14, 13, ctx_r1.runtime.bulletin().metricValue, "1.1-1"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.crews());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" / ", ctx_r1.runtime.config.crews);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.signals().unread);
    \u0275\u0275advance(4);
    \u0275\u0275property("name", ctx_r1.signals().unverified ? "alert" : "pin");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.suggestion());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = ctx_r1.signals().unverified) ? 36 : ctx_r1.runtime.shared().length ? 37 : 38, tmp_13_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_14_0 = ctx_r1.location()) ? 39 : -1, tmp_14_0);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Treat this as a lead. A claim becoming popular does not make it confirmed. ");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " This describes what may happen. Keep the forecast separate from what responders have observed. ");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const source_r10 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" This is a confirmed observation at ", ctx_r1.runtime.time(source_r10.minute), ". Check whether a newer report changes the picture. ");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "button", 26);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cycleReport(-1));
    });
    \u0275\u0275text(2, " \u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 27);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cycleReport(1));
    });
    \u0275\u0275text(6, " \u2192 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "article", 28)(8, "div", 29);
    \u0275\u0275element(9, "app-crisis-icon", 14);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h3", 17);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 30);
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 31);
    \u0275\u0275element(22, "app-crisis-icon", 9);
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275conditionalCreate(24, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_24_Template, 1, 0)(25, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_25_Template, 1, 0)(26, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Conditional_26_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 32)(28, "button", 33);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.pin());
    });
    \u0275\u0275element(29, "app-crisis-icon", 34);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template_button_click_31_listener() {
      const source_r10 = \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.locate.emit(source_r10.locationId));
    });
    \u0275\u0275text(32, " Show me where ");
    \u0275\u0275element(33, "app-crisis-icon", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r10 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.signals().reports.length < 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("SOURCE ", ctx_r1.reportIndex() + 1, " / ", ctx_r1.signals().reports.length);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.signals().reports.length < 2);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("data-confidence", source_r10.confidence);
    \u0275\u0275advance();
    \u0275\u0275property("name", source_r10.confidence === "Confirmed" ? "check" : "alert");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r10.confidence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.time(source_r10.minute));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", source_r10.source, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xB7 ", source_r10.channel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r10.body);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(source_r10.confidence === "Unverified" ? 24 : source_r10.confidence === "Forecast" ? 25 : 26);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.runtime.state().sharedEvidenceIds.includes(source_r10.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().sharedEvidenceIds.includes(source_r10.id) ? "On the situation table" : "Keep this on the table");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 17);
    \u0275\u0275text(1, "I\u2019m waiting for a source.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No reports are available at this station yet.");
    \u0275\u0275elementEnd();
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_0_Template, 34, 15)(1, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Conditional_1_Template, 4, 0);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.report()) ? 0 : 1, tmp_2_0);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_For_48_Template_button_click_0_listener() {
      const action_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.actionId.set(action_r12.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.preview().action?.id === action_r12.id);
    \u0275\u0275attribute("aria-pressed", ctx_r1.preview().action?.id === action_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", action_r12.crews, " CREWS");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const estimate_r13 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(estimate_r13.blocked);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Conditional_25_Template_button_click_2_listener() {
      const action_r15 = \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.reviewAction.emit(action_r15.id));
    });
    \u0275\u0275text(3, " Take this to command ");
    \u0275\u0275element(4, "app-crisis-icon", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.tradeoff);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "span");
    \u0275\u0275text(3, "MODELED DISRUPTION RISK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7, "%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "b");
    \u0275\u0275text(9, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "em");
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 51);
    \u0275\u0275element(15, "i")(16, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 52)(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementStart(20, "small");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "CREWS LEFT AVAILABLE");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(24, CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Conditional_24_Template, 2, 1, "p", 53)(25, CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Conditional_25_Template, 5, 1);
  }
  if (rf & 2) {
    let tmp_10_0;
    const estimate_r13 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(estimate_r13.risk);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(estimate_r13.projectedRisk);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", estimate_r13.risk, "%");
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", estimate_r13.projectedRisk, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(estimate_r13.remainingCrews);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" / ", ctx_r1.runtime.config.crews);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(estimate_r13.blocked ? 24 : (tmp_10_0 = estimate_r13.action) ? 25 : -1, tmp_10_0);
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div")(2, "span", 16);
    \u0275\u0275text(3, "OBSERVED SENSOR DATA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 17);
    \u0275\u0275text(5, "Follow the change.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 36);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 37)(12, "div", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 39);
    \u0275\u0275element(14, "path", 40)(15, "path", 41)(16, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div")(18, "span");
    \u0275\u0275text(19, "FIRST READING");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementStart(23, "small");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 43)(26, "span");
    \u0275\u0275text(27, "WHAT WE KNOW");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Confirmed ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div")(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " Forecast ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "strong");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " Unverified ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 44)(41, "div", 45)(42, "span", 16);
    \u0275\u0275text(43, "TRY A RESPONSE / SCENARIO ESTIMATE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45, "PREVIEW ONLY");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 46);
    \u0275\u0275repeaterCreate(47, CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_For_48_Template, 4, 5, "button", 47, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(49, CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Conditional_49_Template, 26, 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "p", 48);
    \u0275\u0275element(51, "app-crisis-icon", 9);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r1.change() >= 0 ? "+" : "", "", \u0275\u0275pipeBind2(8, 14, ctx_r1.change(), "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.config.primaryMetric.unit, " SINCE FIRST READING");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", ctx_r1.runtime.config.primaryMetric.label + ": " + ctx_r1.values().join(", ") + " " + ctx_r1.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("d", ctx_r1.trend() + " L400 124L0 124Z");
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r1.trend());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(22, 17, ctx_r1.runtime.bulletin().metricValue, "1.1-1"), " ", ctx_r1.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r1.runtime.time());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.signals().confirmed);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.signals().forecast);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.signals().unverifiedCount);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.runtime.config.actions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = ctx_r1.preview()) ? 49 : -1, tmp_13_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.bulletin().uncertainty, " ");
  }
}
function CrisisCompanionBriefingComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 0);
    \u0275\u0275element(1, "div", 1);
    \u0275\u0275elementStart(2, "header", 2)(3, "div")(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 4);
    \u0275\u0275text(7, "Let\u2019s take a look.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 5);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigate.emit("room"));
    });
    \u0275\u0275element(9, "app-crisis-icon", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "nav", 7)(11, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.choose("brief"));
    });
    \u0275\u0275element(12, "app-crisis-icon", 9);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Brief me");
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16, "THE SITUATION");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.choose("report"));
    });
    \u0275\u0275element(18, "app-crisis-icon", 10);
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Show a report");
    \u0275\u0275elementStart(21, "small");
    \u0275\u0275text(22, "THE SOURCES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.choose("analysis"));
    });
    \u0275\u0275element(24, "app-crisis-icon", 11);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Work the data");
    \u0275\u0275elementStart(27, "small");
    \u0275\u0275text(28, "THE TRADEOFFS");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "div", 12);
    \u0275\u0275conditionalCreate(30, CrisisCompanionBriefingComponent_Conditional_0_Conditional_30_Template, 40, 16);
    \u0275\u0275conditionalCreate(31, CrisisCompanionBriefingComponent_Conditional_0_Conditional_31_Template, 2, 1);
    \u0275\u0275conditionalCreate(32, CrisisCompanionBriefingComponent_Conditional_0_Conditional_32_Template, 53, 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "footer", 13)(34, "span");
    \u0275\u0275element(35, "i");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 8);
    \u0275\u0275listener("click", function CrisisCompanionBriefingComponent_Conditional_0_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.roamingChanged.emit(!ctx_r1.roaming()));
    });
    \u0275\u0275text(38);
    \u0275\u0275element(39, "app-crisis-icon", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.config.companion?.name || "ARGUS", " / YOUR OPERATIONS PARTNER");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx_r1.mode() === "brief");
    \u0275\u0275attribute("aria-pressed", ctx_r1.mode() === "brief");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx_r1.mode() === "report");
    \u0275\u0275attribute("aria-pressed", ctx_r1.mode() === "report");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx_r1.mode() === "analysis");
    \u0275\u0275attribute("aria-pressed", ctx_r1.mode() === "analysis");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.mode() === "brief" ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.mode() === "report" ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.mode() === "analysis" ? 32 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" SCENARIO BRIEFING \xB7 ", ctx_r1.runtime.time());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", !ctx_r1.roaming());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.roaming() ? "Hold position" : "Resume roaming", " ");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.roaming() ? "pin" : "room");
  }
}
var CrisisCompanionBriefingComponent = class _CrisisCompanionBriefingComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  active = input(
    false,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roaming = input(
    true,
    ...ngDevMode ? [{ debugName: "roaming" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLocation = input(
    "",
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  navigate = output();
  locate = output();
  reviewAction = output();
  roamingChanged = output();
  mode = signal(
    "brief",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reportId = signal(
    "",
    ...ngDevMode ? [{ debugName: "reportId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actionId = signal(
    "",
    ...ngDevMode ? [{ debugName: "actionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  signals = computed(
    () => companionSignals(this.runtime.config, this.runtime.state()),
    ...ngDevMode ? [{ debugName: "signals" }] : (
      /* istanbul ignore next */
      []
    )
  );
  report = computed(
    () => this.signals().reports.find((item) => item.id === this.reportId()) ?? this.signals().latest,
    ...ngDevMode ? [{ debugName: "report" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reportIndex = computed(
    () => this.signals().reports.findIndex((item) => item.id === this.report()?.id),
    ...ngDevMode ? [{ debugName: "reportIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  location = computed(
    () => this.runtime.config.locations.find((item) => item.id === this.selectedLocation()),
    ...ngDevMode ? [{ debugName: "location" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preview = computed(
    () => companionPreview(this.runtime.config, this.runtime.state(), this.actionId() || this.runtime.config.actions.find((action) => !this.runtime.blocked(action))?.id || this.runtime.config.actions[0]?.id || ""),
    ...ngDevMode ? [{ debugName: "preview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  values = computed(
    () => [
      ...this.runtime.config.primaryMetric.initialTrend,
      ...this.runtime.config.bulletins.slice(1, this.runtime.state().stage + 1).map((item) => item.metricValue)
    ],
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trend = computed(
    () => {
      const values = this.values(), min = Math.min(...values) * 0.92, max = Math.max(...values);
      return values.map((v, i) => `${i ? "L" : "M"}${i * 400 / (values.length - 1)} ${112 - (v - min) / (max - min || 1) * 100}`).join(" ");
    },
    ...ngDevMode ? [{ debugName: "trend" }] : (
      /* istanbul ignore next */
      []
    )
  );
  change = computed(
    () => this.values().at(-1) - this.values()[0],
    ...ngDevMode ? [{ debugName: "change" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestion = computed(
    () => this.signals().unverified ? "There\u2019s a claim worth checking." : this.runtime.shared().length ? "Your evidence is ready to use." : "Let\u2019s get a source onto the table.",
    ...ngDevMode ? [{ debugName: "suggestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  choose(mode) {
    this.mode.set(mode);
    if (mode === "report" && this.report())
      this.runtime.read(this.report().id);
    this.focus();
  }
  showReport(id) {
    this.reportId.set(id);
    this.choose("report");
  }
  cycleReport(delta) {
    const reports = this.signals().reports;
    if (!reports.length)
      return;
    this.showReport(reports[(this.reportIndex() + delta + reports.length) % reports.length].id);
  }
  pin() {
    const report = this.report();
    if (report) {
      this.runtime.read(report.id);
      this.runtime.share(report.id);
    }
  }
  focus() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.element.nativeElement.querySelector("[data-intent-heading]")?.focus({ preventScroll: true }), 0);
  }
  ngOnDestroy() {
    clearTimeout(this.timer);
  }
  static \u0275fac = function CrisisCompanionBriefingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisCompanionBriefingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisCompanionBriefingComponent, selectors: [["app-crisis-companion-briefing"]], inputs: { active: [1, "active"], roaming: [1, "roaming"], selectedLocation: [1, "selectedLocation"] }, outputs: { navigate: "navigate", locate: "locate", reviewAction: "reviewAction", roamingChanged: "roamingChanged" }, decls: 1, vars: 1, consts: [["aria-label", "ARGUS companion briefing", 1, "robot-workbench"], ["aria-hidden", "true", 1, "projection-link"], [1, "companion-header"], [1, "eyebrow"], ["tabindex", "-1", "data-panel-heading", ""], ["aria-label", "Return to room", 1, "close-workbench", 3, "click"], ["name", "close"], ["aria-label", "Ask ARGUS", 1, "intent-choices"], [3, "click"], ["name", "argus"], ["name", "news"], ["name", "station"], [1, "briefing-surface"], [1, "companion-footer"], [3, "name"], [1, "brief-intro"], [1, "surface-label"], ["data-intent-heading", "", "tabindex", "-1"], [1, "signal-strip"], [1, "attention-note"], [1, "context-link"], [1, "text-action", 3, "click"], ["name", "arrow"], [1, "context-link", 3, "click"], ["name", "map"], [1, "report-pagination"], ["aria-label", "Previous source report", 3, "click", "disabled"], ["aria-label", "Next source report", 3, "click", "disabled"], [1, "source-on-desk"], [1, "source-stamp"], [1, "source-byline"], [1, "source-observation"], [1, "surface-actions"], [1, "primary-action", 3, "click", "disabled"], ["name", "pin"], [1, "analysis-title"], [1, "trend-change"], [1, "data-lens"], [1, "trend-plot"], ["viewBox", "0 0 400 124", "role", "img"], ["d", "M0 25H400M0 65H400M0 105H400", "stroke", "#4b727960", "stroke-dasharray", "2 5"], ["fill", "#85e8d614"], ["fill", "none", "stroke", "#a2eadb", "stroke-width", "2"], [1, "source-mix"], [1, "response-lens"], [1, "lens-heading"], ["aria-label", "Compare a response", 1, "response-picks"], [3, "selected"], [1, "uncertainty-note"], [1, "response-comparison"], [1, "risk-comparison"], [1, "risk-track"], [1, "crew-comparison"], [1, "comparison-note"]], template: function CrisisCompanionBriefingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CrisisCompanionBriefingComponent_Conditional_0_Template, 40, 17, "section", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.active() ? 0 : -1);
    }
  }, dependencies: [CrisisIconComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 3;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b2ead8;\n  outline-offset: 3px;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%] {\n  font-weight: 400;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  outline: none;\n}\n.robot-workbench[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 39%;\n  right: 5%;\n  top: 112px;\n  bottom: 128px;\n  display: flex;\n  flex-direction: column;\n  pointer-events: auto;\n  background:\n    linear-gradient(\n      120deg,\n      rgba(18, 52, 62, 0.8745098039),\n      rgba(6, 28, 42, 0.9607843137));\n  border: 1px solid rgba(106, 157, 167, 0.4784313725);\n  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(10, 69, 83, 0.1019607843);\n  -webkit-backdrop-filter: blur(18px);\n  backdrop-filter: blur(18px);\n  animation: _ngcontent-%COMP%_project-briefing 0.7s 0.35s both;\n}\n.robot-workbench[_ngcontent-%COMP%]:before, \n.robot-workbench[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  border-color: #a7d9d1;\n  border-style: solid;\n  pointer-events: none;\n}\n.robot-workbench[_ngcontent-%COMP%]:before {\n  top: -1px;\n  left: -1px;\n  border-width: 2px 0 0 2px;\n}\n.robot-workbench[_ngcontent-%COMP%]:after {\n  bottom: -1px;\n  right: -1px;\n  border-width: 0 2px 2px 0;\n}\n.projection-link[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 100%;\n  top: 44%;\n  width: 9vw;\n  height: 34%;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(146, 237, 219, 0.0078431373),\n      rgba(146, 237, 219, 0.0784313725));\n  clip-path: polygon(0 55%, 100% 0, 100% 100%);\n  pointer-events: none;\n}\n.companion-header[_ngcontent-%COMP%] {\n  padding: 20px 24px 17px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n}\n.eyebrow[_ngcontent-%COMP%], \n.surface-label[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.4px;\n  color: #a4c5c9;\n}\n.companion-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #e0ece8;\n  margin-top: 8px;\n  letter-spacing: -0.3px;\n}\n.close-workbench[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(71, 107, 116, 0.3333333333);\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  color: #b4cdd2;\n}\n.close-workbench[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.intent-choices[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0 20px;\n  border-bottom: 1px solid rgba(98, 133, 145, 0.3333333333);\n  gap: 4px;\n}\n.intent-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 8px 14px;\n  background: transparent;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  text-align: left;\n  color: #87aab9;\n  font-size: 11px;\n}\n.intent-choices[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  margin-top: 6px;\n  color: #638b9b;\n}\n.intent-choices[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.intent-choices[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #c8e9df;\n  border-bottom-color: #a1dcca;\n  background: linear-gradient(transparent, rgba(103, 198, 178, 0.0705882353));\n}\n.intent-choices[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #90b7b2;\n}\n.briefing-surface[_ngcontent-%COMP%] {\n  overflow: auto;\n  min-height: 0;\n  flex: 1;\n  padding: 23px 25px;\n  scrollbar-width: thin;\n  scrollbar-color: #466f7c transparent;\n}\n.briefing-surface[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 25px;\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  color: #d8e9e7;\n}\n.briefing-surface[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a8c5cd;\n  line-height: 1.8;\n  font-size: 12px;\n}\n.surface-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 7px;\n  margin-bottom: 11px;\n}\n.surface-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.companion-footer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 4px;\n  height: 4px;\n  background: #a7d9c5;\n  border-radius: 50%;\n  box-shadow: 0 0 7px rgba(167, 217, 197, 0.3333333333);\n}\n.brief-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  max-width: 540px;\n}\n.signal-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr 1fr;\n  padding: 20px 0;\n  border-bottom: 1px solid rgba(65, 101, 113, 0.4);\n  margin-bottom: 22px;\n}\n.signal-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  border-left: 1px solid rgba(66, 103, 115, 0.5333333333);\n  padding-left: 18px;\n}\n.signal-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  border: 0;\n  padding: 0;\n}\n.signal-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #7ca5b2;\n}\n.signal-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 28px;\n  font-weight: 300;\n  color: #d5e9e3;\n  margin-top: 8px;\n}\n.signal-strip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  color: #90b4ba;\n}\n.attention-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.attention-note[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #dbb47f;\n  width: 21px;\n  height: 21px;\n}\n.attention-note[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 17px;\n  line-height: 1.4;\n  color: #d0e3df;\n}\n.attention-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font-size: 11px;\n}\n.text-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 15px;\n  border: 0;\n  border-bottom: 1px solid rgba(118, 182, 168, 0.4);\n  background: transparent;\n  padding: 8px 0;\n  color: #b2ddca;\n  font-size: 11px;\n}\n.text-action[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.context-link[_ngcontent-%COMP%] {\n  margin-top: 21px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  background: rgba(10, 38, 52, 0.3333333333);\n  border: 1px solid rgba(65, 111, 123, 0.4);\n  padding: 12px;\n  text-align: left;\n  color: #9fbdc5;\n  font-size: 10px;\n}\n.context-link[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #d2e3df;\n}\n.context-link[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n  font-size: 9px;\n  color: #8bb6ba;\n}\n.context-link[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.report-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 20px;\n  font: 8px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #a0bcc4;\n}\n.report-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: rgba(18, 55, 68, 0.4666666667);\n  border: 1px solid rgba(75, 126, 135, 0.6);\n  width: 29px;\n  height: 27px;\n  color: #c9dfdb;\n  font-size: 15px;\n}\n.source-stamp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #b4e0c9;\n  font: 8px Consolas, monospace;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 14px;\n}\n.source-stamp[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #86aeb8;\n}\n.source-stamp[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.source-stamp[data-confidence=Unverified][_ngcontent-%COMP%] {\n  color: #e2b48a;\n}\n.source-stamp[data-confidence=Forecast][_ngcontent-%COMP%] {\n  color: #9ebddd;\n}\n.source-on-desk[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.source-byline[_ngcontent-%COMP%] {\n  color: #a6c9ca;\n  font-size: 10px;\n  margin: 12px 0 21px;\n}\n.source-byline[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #658e9d;\n}\n.source-on-desk[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.9;\n}\n.source-observation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  border-left: 2px solid rgba(129, 184, 172, 0.4666666667);\n  padding: 12px 15px;\n  margin-top: 20px;\n  background: rgba(10, 41, 57, 0.2);\n}\n.source-observation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.source-observation[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: #91c3bd;\n}\n.surface-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.surface-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  background: rgba(23, 59, 72, 0.4666666667);\n  border: 1px solid rgba(75, 118, 130, 0.4);\n  font-size: 10px;\n  padding: 12px;\n  color: #a9cbd0;\n}\n.surface-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  background: rgba(52, 94, 80, 0.4);\n  border-color: rgba(125, 170, 152, 0.6666666667);\n  color: #c7e6d5;\n}\n.surface-actions[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.analysis-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.analysis-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.trend-change[_ngcontent-%COMP%] {\n  font-size: 23px;\n  color: #bcebdc;\n  font-weight: 300;\n  text-align: right;\n}\n.trend-change[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 6px Consolas, monospace;\n  color: #8bb4b8;\n  letter-spacing: 0.6px;\n  margin-top: 7px;\n}\n.data-lens[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 122px;\n  gap: 22px;\n  margin: 22px 0;\n}\n.trend-plot[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 110px;\n  display: block;\n}\n.trend-plot[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n.trend-plot[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 6px Consolas, monospace;\n  color: #7298a5;\n}\n.trend-plot[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 11px Consolas, monospace;\n  color: #b8ddd4;\n}\n.trend-plot[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #7ca4b0;\n}\n.source-mix[_ngcontent-%COMP%] {\n  border-left: 1px solid rgba(71, 118, 129, 0.4);\n  padding-left: 15px;\n}\n.source-mix[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 6px Consolas, monospace;\n  color: #779eab;\n  letter-spacing: 0.6px;\n}\n.source-mix[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 9px;\n  color: #91b2bd;\n  margin-top: 12px;\n}\n.source-mix[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 16px Consolas, monospace;\n  color: #b2d8d2;\n  font-weight: 400;\n}\n.response-lens[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(74, 117, 130, 0.4196078431);\n  padding-top: 20px;\n}\n.lens-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n}\n.lens-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  font: 6px Consolas, monospace;\n  color: #809daa;\n  letter-spacing: 1px;\n}\n.response-picks[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  overflow: auto;\n  padding: 4px 0 9px;\n  scrollbar-width: thin;\n  scrollbar-color: #3b6675 transparent;\n}\n.response-picks[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 0 0 145px;\n  padding: 10px 11px;\n  background: rgba(13, 43, 54, 0.4);\n  border: 1px solid rgba(66, 103, 118, 0.4);\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.4;\n  color: #8eafbb;\n}\n.response-picks[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: rgba(138, 192, 175, 0.6588235294);\n  color: #d2e8dc;\n  background: rgba(51, 90, 78, 0.2666666667);\n}\n.response-picks[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7ca4ab;\n  margin-top: 8px;\n}\n.response-comparison[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  margin: 17px 0;\n}\n.risk-comparison[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.risk-comparison[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.crew-comparison[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 6px Consolas, monospace;\n  color: #86aab6;\n  letter-spacing: 1px;\n  display: block;\n}\n.risk-comparison[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 300;\n  display: block;\n  color: #afc5cc;\n  margin: 8px 0;\n}\n.risk-comparison[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.risk-comparison[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0 17px;\n  color: #547a85;\n}\n.risk-comparison[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: #b9e7d1;\n}\n.risk-track[_ngcontent-%COMP%] {\n  height: 3px;\n  position: relative;\n  background: #21444f;\n}\n.risk-track[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.risk-track[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  height: 100%;\n  position: absolute;\n  inset: 0 auto 0 0;\n  transition: width 0.5s;\n  margin: 0;\n}\n.risk-track[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background: rgba(139, 164, 173, 0.5333333333);\n}\n.risk-track[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  background: #b9e7d1;\n}\n.crew-comparison[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 300;\n  font-size: 36px;\n  color: #c5e5d6;\n}\n.crew-comparison[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #789caa;\n}\n.crew-comparison[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-top: 9px;\n  font-size: 6px;\n}\n.briefing-surface[_ngcontent-%COMP%]   .comparison-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.uncertainty-note[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 22px !important;\n  font-size: 10px !important;\n  color: #7da3b0 !important;\n}\n.uncertainty-note[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.companion-footer[_ngcontent-%COMP%] {\n  padding: 11px 20px;\n  border-top: 1px solid rgba(86, 123, 135, 0.2666666667);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 15px;\n}\n.companion-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7aa4ae;\n}\n.companion-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  border: 0;\n  background: transparent;\n  font-size: 9px;\n  color: #a4c3c8;\n  padding: 4px;\n}\n.companion-footer[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n}\n@keyframes _ngcontent-%COMP%_project-briefing {\n  from {\n    opacity: 0;\n    translate: -15px 8px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (min-width: 1600px) {\n  .robot-workbench[_ngcontent-%COMP%] {\n    left: 41%;\n    right: 7%;\n    top: 130px;\n    bottom: 154px;\n  }\n  .briefing-surface[_ngcontent-%COMP%] {\n    padding: 30px;\n  }\n  .companion-header[_ngcontent-%COMP%] {\n    padding: 25px 30px;\n  }\n}\n@media (max-width: 1000px) and (min-width: 701px) {\n  .robot-workbench[_ngcontent-%COMP%] {\n    left: 32%;\n    right: 3%;\n    top: 105px;\n  }\n  .companion-header[_ngcontent-%COMP%] {\n    padding: 17px 20px;\n  }\n  .intent-choices[_ngcontent-%COMP%] {\n    padding: 0 14px;\n  }\n  .intent-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    gap: 6px;\n  }\n  .briefing-surface[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .data-lens[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 95px;\n    gap: 12px;\n  }\n  .source-mix[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .robot-workbench[_ngcontent-%COMP%] {\n    left: 14px;\n    right: 14px;\n    top: 285px;\n    bottom: 158px;\n  }\n  .projection-link[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .companion-header[_ngcontent-%COMP%] {\n    padding: 13px 15px;\n  }\n  .companion-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 19px;\n    margin-top: 6px;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .close-workbench[_ngcontent-%COMP%] {\n    width: 27px;\n    height: 27px;\n  }\n  .intent-choices[_ngcontent-%COMP%] {\n    padding: 0 8px;\n    gap: 1px;\n  }\n  .intent-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px 5px;\n    font-size: 9px;\n    gap: 6px;\n  }\n  .intent-choices[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 15px;\n    height: 15px;\n  }\n  .intent-choices[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 5px;\n    letter-spacing: 0.6px;\n  }\n  .briefing-surface[_ngcontent-%COMP%] {\n    padding: 17px 16px;\n  }\n  .briefing-surface[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .briefing-surface[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .signal-strip[_ngcontent-%COMP%] {\n    padding: 17px 0;\n    margin-bottom: 17px;\n  }\n  .signal-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 5px;\n    letter-spacing: 0.4px;\n  }\n  .signal-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .signal-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .signal-strip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n  .attention-note[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .attention-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .text-action[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .context-link[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .context-link[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    font-size: 8px;\n  }\n  .source-on-desk[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .surface-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .surface-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .trend-change[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n  .trend-change[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 5px;\n    max-width: 90px;\n    line-height: 1.6;\n  }\n  .data-lens[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 88px;\n    gap: 12px;\n  }\n  .trend-plot[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    height: 85px;\n  }\n  .source-mix[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .source-mix[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    font-size: 8px;\n    margin-top: 9px;\n    gap: 7px;\n  }\n  .source-mix[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .lens-heading[_ngcontent-%COMP%]   .surface-label[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 0.7px;\n  }\n  .lens-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    font-size: 5px;\n  }\n  .response-picks[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-basis: 138px;\n  }\n  .risk-comparison[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .crew-comparison[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  .companion-footer[_ngcontent-%COMP%] {\n    padding: 9px 12px;\n    gap: 6px;\n  }\n  .companion-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n  }\n  .companion-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-companion-briefing.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisCompanionBriefingComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-companion-briefing", imports: [DecimalPipe, CrisisIconComponent], template: `@if (active()) {
  <section class="robot-workbench" aria-label="ARGUS companion briefing">
    <div class="projection-link" aria-hidden="true"></div>
    <header class="companion-header">
      <div>
        <span class="eyebrow"
          >{{ runtime.config.companion?.name || 'ARGUS' }} / YOUR OPERATIONS PARTNER</span
        >
        <h2 tabindex="-1" data-panel-heading>Let\u2019s take a look.</h2>
      </div>
      <button class="close-workbench" aria-label="Return to room" (click)="navigate.emit('room')">
        <app-crisis-icon name="close" />
      </button>
    </header>
    <nav class="intent-choices" aria-label="Ask ARGUS">
      <button
        [class.active]="mode() === 'brief'"
        [attr.aria-pressed]="mode() === 'brief'"
        (click)="choose('brief')"
      >
        <app-crisis-icon name="argus" /><span>Brief me<small>THE SITUATION</small></span></button
      ><button
        [class.active]="mode() === 'report'"
        [attr.aria-pressed]="mode() === 'report'"
        (click)="choose('report')"
      >
        <app-crisis-icon name="news" /><span>Show a report<small>THE SOURCES</small></span></button
      ><button
        [class.active]="mode() === 'analysis'"
        [attr.aria-pressed]="mode() === 'analysis'"
        (click)="choose('analysis')"
      >
        <app-crisis-icon name="station" /><span>Work the data<small>THE TRADEOFFS</small></span>
      </button>
    </nav>
    <div class="briefing-surface">
      @if (mode() === 'brief') {
        <div class="brief-intro">
          <span class="surface-label"><i></i> AS OF {{ runtime.time() }}</span>
          <h3 data-intent-heading tabindex="-1">{{ runtime.bulletin().title }}</h3>
          <p>{{ runtime.bulletin().summary }}</p>
        </div>
        <div class="signal-strip">
          <div>
            <span>{{ runtime.config.primaryMetric.label }}</span
            ><strong
              >{{ runtime.bulletin().metricValue | number: '1.1-1' }}
              <small>{{ runtime.config.primaryMetric.unit }}</small></strong
            >
          </div>
          <div>
            <span>AVAILABLE CREWS</span
            ><strong
              >{{ runtime.crews() }}<small> / {{ runtime.config.crews }}</small></strong
            >
          </div>
          <div>
            <span>UNREAD SIGNALS</span
            ><strong>{{ signals().unread }}<small> TO REVIEW</small></strong>
          </div>
        </div>
        <div class="attention-note">
          <app-crisis-icon [name]="signals().unverified ? 'alert' : 'pin'" />
          <div>
            <h4>{{ suggestion() }}</h4>
            @if (signals().unverified; as unverified) {
              <p>{{ unverified.title }}. Let\u2019s check who reported it and when.</p>
              <button class="text-action" (click)="showReport(unverified.id)">
                Show me the source <app-crisis-icon name="arrow" />
              </button>
            } @else if (runtime.shared().length) {
              <p>
                {{ runtime.shared().length }} reports are pinned. We can compare a response against
                the crews you have left.
              </p>
              <button class="text-action" (click)="choose('analysis')">
                Compare the options <app-crisis-icon name="arrow" />
              </button>
            } @else {
              <p>
                A field report is a good starting point. We can inspect it together and keep it
                where the team can use it.
              </p>
              <button class="text-action" (click)="choose('report')">
                Bring up a report <app-crisis-icon name="arrow" />
              </button>
            }
          </div>
        </div>
        @if (location(); as place) {
          <button class="context-link" (click)="locate.emit(place.id)">
            <app-crisis-icon name="map" /><span
              >You were looking at <strong>{{ place.name }}</strong></span
            ><span>Go there \u2197</span>
          </button>
        }
      }
      @if (mode() === 'report') {
        @if (report(); as source) {
          <div class="report-pagination">
            <button
              aria-label="Previous source report"
              (click)="cycleReport(-1)"
              [disabled]="signals().reports.length < 2"
            >
              \u2190</button
            ><span>SOURCE {{ reportIndex() + 1 }} / {{ signals().reports.length }}</span
            ><button
              aria-label="Next source report"
              (click)="cycleReport(1)"
              [disabled]="signals().reports.length < 2"
            >
              \u2192
            </button>
          </div>
          <article class="source-on-desk">
            <div class="source-stamp" [attr.data-confidence]="source.confidence">
              <app-crisis-icon [name]="source.confidence === 'Confirmed' ? 'check' : 'alert'" />{{
                source.confidence
              }}<span>{{ runtime.time(source.minute) }}</span>
            </div>
            <h3 data-intent-heading tabindex="-1">{{ source.title }}</h3>
            <div class="source-byline">
              {{ source.source }} <span>\xB7 {{ source.channel }}</span>
            </div>
            <p>{{ source.body }}</p>
          </article>
          <div class="source-observation">
            <app-crisis-icon name="argus" />
            <p>
              @if (source.confidence === 'Unverified') {
                Treat this as a lead. A claim becoming popular does not make it confirmed.
              } @else if (source.confidence === 'Forecast') {
                This describes what may happen. Keep the forecast separate from what responders have
                observed.
              } @else {
                This is a confirmed observation at {{ runtime.time(source.minute) }}. Check whether
                a newer report changes the picture.
              }
            </p>
          </div>
          <div class="surface-actions">
            <button
              class="primary-action"
              (click)="pin()"
              [disabled]="runtime.state().sharedEvidenceIds.includes(source.id)"
            >
              <app-crisis-icon name="pin" />{{
                runtime.state().sharedEvidenceIds.includes(source.id)
                  ? 'On the situation table'
                  : 'Keep this on the table'
              }}</button
            ><button (click)="locate.emit(source.locationId)">
              Show me where <app-crisis-icon name="map" />
            </button>
          </div>
        } @else {
          <h3 data-intent-heading tabindex="-1">I\u2019m waiting for a source.</h3>
          <p>No reports are available at this station yet.</p>
        }
      }
      @if (mode() === 'analysis') {
        <div class="analysis-title">
          <div>
            <span class="surface-label">OBSERVED SENSOR DATA</span>
            <h3 data-intent-heading tabindex="-1">Follow the change.</h3>
          </div>
          <div class="trend-change">
            {{ change() >= 0 ? '+' : '' }}{{ change() | number: '1.2-2' }}
            <small>{{ runtime.config.primaryMetric.unit }} SINCE FIRST READING</small>
          </div>
        </div>
        <div class="data-lens">
          <div class="trend-plot">
            <svg
              viewBox="0 0 400 124"
              role="img"
              [attr.aria-label]="
                runtime.config.primaryMetric.label +
                ': ' +
                values().join(', ') +
                ' ' +
                runtime.config.primaryMetric.unit
              "
            >
              <path d="M0 25H400M0 65H400M0 105H400" stroke="#4b727960" stroke-dasharray="2 5" />
              <path [attr.d]="trend() + ' L400 124L0 124Z'" fill="#85e8d614" />
              <path [attr.d]="trend()" fill="none" stroke="#a2eadb" stroke-width="2" />
            </svg>
            <div>
              <span>FIRST READING</span
              ><strong
                >{{ runtime.bulletin().metricValue | number: '1.1-1' }}
                {{ runtime.config.primaryMetric.unit
                }}<small> \xB7 {{ runtime.time() }}</small></strong
              >
            </div>
          </div>
          <div class="source-mix">
            <span>WHAT WE KNOW</span>
            <div>
              <strong>{{ signals().confirmed }}</strong> Confirmed
            </div>
            <div>
              <strong>{{ signals().forecast }}</strong> Forecast
            </div>
            <div>
              <strong>{{ signals().unverifiedCount }}</strong> Unverified
            </div>
          </div>
        </div>
        <div class="response-lens">
          <div class="lens-heading">
            <span class="surface-label">TRY A RESPONSE / SCENARIO ESTIMATE</span
            ><span>PREVIEW ONLY</span>
          </div>
          <div class="response-picks" aria-label="Compare a response">
            @for (action of runtime.config.actions; track action.id) {
              <button
                [class.selected]="preview().action?.id === action.id"
                [attr.aria-pressed]="preview().action?.id === action.id"
                (click)="actionId.set(action.id)"
              >
                {{ action.title }}<small>{{ action.crews }} CREWS</small>
              </button>
            }
          </div>
          @if (preview(); as estimate) {
            <div class="response-comparison">
              <div class="risk-comparison">
                <span>MODELED DISRUPTION RISK</span
                ><strong
                  >{{ estimate.risk }}<small>%</small><b>\u2192</b
                  ><em>{{ estimate.projectedRisk }}<small>%</small></em></strong
                >
                <div class="risk-track">
                  <i [style.width.%]="estimate.risk"></i
                  ><b [style.width.%]="estimate.projectedRisk"></b>
                </div>
              </div>
              <div class="crew-comparison">
                <strong
                  >{{ estimate.remainingCrews }}<small> / {{ runtime.config.crews }}</small></strong
                ><span>CREWS LEFT AVAILABLE</span>
              </div>
            </div>
            @if (estimate.blocked) {
              <p class="comparison-note">{{ estimate.blocked }}</p>
            } @else if (estimate.action; as action) {
              <p class="comparison-note">{{ action.tradeoff }}</p>
              <button class="text-action" (click)="reviewAction.emit(action.id)">
                Take this to command <app-crisis-icon name="arrow" />
              </button>
            }
          }
        </div>
        <p class="uncertainty-note">
          <app-crisis-icon name="argus" />{{ runtime.bulletin().uncertainty }}
        </p>
      }
    </div>
    <footer class="companion-footer">
      <span><i></i> SCENARIO BRIEFING \xB7 {{ runtime.time() }}</span
      ><button (click)="roamingChanged.emit(!roaming())" [attr.aria-pressed]="!roaming()">
        {{ roaming() ? 'Hold position' : 'Resume roaming' }}
        <app-crisis-icon [name]="roaming() ? 'pin' : 'room'" />
      </button>
    </footer>
  </section>
}
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-companion-briefing.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 3;\n}\n* {\n  box-sizing: border-box;\n}\nbutton {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton:focus-visible {\n  outline: 2px solid #b2ead8;\n  outline-offset: 3px;\n}\nh2,\nh3,\nh4,\np {\n  margin: 0;\n}\nh2,\nh3,\nh4 {\n  font-weight: 400;\n}\nh2,\nh3 {\n  outline: none;\n}\n.robot-workbench {\n  position: absolute;\n  left: 39%;\n  right: 5%;\n  top: 112px;\n  bottom: 128px;\n  display: flex;\n  flex-direction: column;\n  pointer-events: auto;\n  background:\n    linear-gradient(\n      120deg,\n      rgba(18, 52, 62, 0.8745098039),\n      rgba(6, 28, 42, 0.9607843137));\n  border: 1px solid rgba(106, 157, 167, 0.4784313725);\n  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(10, 69, 83, 0.1019607843);\n  -webkit-backdrop-filter: blur(18px);\n  backdrop-filter: blur(18px);\n  animation: project-briefing 0.7s 0.35s both;\n}\n.robot-workbench:before,\n.robot-workbench:after {\n  content: "";\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  border-color: #a7d9d1;\n  border-style: solid;\n  pointer-events: none;\n}\n.robot-workbench:before {\n  top: -1px;\n  left: -1px;\n  border-width: 2px 0 0 2px;\n}\n.robot-workbench:after {\n  bottom: -1px;\n  right: -1px;\n  border-width: 0 2px 2px 0;\n}\n.projection-link {\n  position: absolute;\n  right: 100%;\n  top: 44%;\n  width: 9vw;\n  height: 34%;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(146, 237, 219, 0.0078431373),\n      rgba(146, 237, 219, 0.0784313725));\n  clip-path: polygon(0 55%, 100% 0, 100% 100%);\n  pointer-events: none;\n}\n.companion-header {\n  padding: 20px 24px 17px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n}\n.eyebrow,\n.surface-label {\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.4px;\n  color: #a4c5c9;\n}\n.companion-header h2 {\n  font-size: 24px;\n  color: #e0ece8;\n  margin-top: 8px;\n  letter-spacing: -0.3px;\n}\n.close-workbench {\n  background: transparent;\n  border: 1px solid rgba(71, 107, 116, 0.3333333333);\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  color: #b4cdd2;\n}\n.close-workbench app-crisis-icon {\n  width: 16px;\n  height: 16px;\n}\n.intent-choices {\n  display: flex;\n  padding: 0 20px;\n  border-bottom: 1px solid rgba(98, 133, 145, 0.3333333333);\n  gap: 4px;\n}\n.intent-choices button {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 8px 14px;\n  background: transparent;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  text-align: left;\n  color: #87aab9;\n  font-size: 11px;\n}\n.intent-choices small {\n  display: block;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  margin-top: 6px;\n  color: #638b9b;\n}\n.intent-choices app-crisis-icon {\n  width: 18px;\n  height: 18px;\n}\n.intent-choices button.active {\n  color: #c8e9df;\n  border-bottom-color: #a1dcca;\n  background: linear-gradient(transparent, rgba(103, 198, 178, 0.0705882353));\n}\n.intent-choices button.active small {\n  color: #90b7b2;\n}\n.briefing-surface {\n  overflow: auto;\n  min-height: 0;\n  flex: 1;\n  padding: 23px 25px;\n  scrollbar-width: thin;\n  scrollbar-color: #466f7c transparent;\n}\n.briefing-surface h3 {\n  font-size: 25px;\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  color: #d8e9e7;\n}\n.briefing-surface p {\n  color: #a8c5cd;\n  line-height: 1.8;\n  font-size: 12px;\n}\n.surface-label {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 7px;\n  margin-bottom: 11px;\n}\n.surface-label i,\n.companion-footer i {\n  width: 4px;\n  height: 4px;\n  background: #a7d9c5;\n  border-radius: 50%;\n  box-shadow: 0 0 7px rgba(167, 217, 197, 0.3333333333);\n}\n.brief-intro > p {\n  margin-top: 12px;\n  max-width: 540px;\n}\n.signal-strip {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr 1fr;\n  padding: 20px 0;\n  border-bottom: 1px solid rgba(65, 101, 113, 0.4);\n  margin-bottom: 22px;\n}\n.signal-strip > div {\n  border-left: 1px solid rgba(66, 103, 115, 0.5333333333);\n  padding-left: 18px;\n}\n.signal-strip > div:first-child {\n  border: 0;\n  padding: 0;\n}\n.signal-strip span {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #7ca5b2;\n}\n.signal-strip strong {\n  display: block;\n  font-size: 28px;\n  font-weight: 300;\n  color: #d5e9e3;\n  margin-top: 8px;\n}\n.signal-strip small {\n  font: 8px Consolas, monospace;\n  color: #90b4ba;\n}\n.attention-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.attention-note > app-crisis-icon {\n  color: #dbb47f;\n  width: 21px;\n  height: 21px;\n}\n.attention-note h4 {\n  font-size: 17px;\n  line-height: 1.4;\n  color: #d0e3df;\n}\n.attention-note p {\n  margin: 8px 0;\n  font-size: 11px;\n}\n.text-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 15px;\n  border: 0;\n  border-bottom: 1px solid rgba(118, 182, 168, 0.4);\n  background: transparent;\n  padding: 8px 0;\n  color: #b2ddca;\n  font-size: 11px;\n}\n.text-action app-crisis-icon {\n  width: 15px;\n  height: 15px;\n}\n.context-link {\n  margin-top: 21px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  background: rgba(10, 38, 52, 0.3333333333);\n  border: 1px solid rgba(65, 111, 123, 0.4);\n  padding: 12px;\n  text-align: left;\n  color: #9fbdc5;\n  font-size: 10px;\n}\n.context-link strong {\n  font-weight: 400;\n  color: #d2e3df;\n}\n.context-link > span:last-child {\n  margin-left: auto;\n  font-size: 9px;\n  color: #8bb6ba;\n}\n.context-link app-crisis-icon {\n  width: 17px;\n  height: 17px;\n}\n.report-pagination {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 20px;\n  font: 8px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #a0bcc4;\n}\n.report-pagination button {\n  background: rgba(18, 55, 68, 0.4666666667);\n  border: 1px solid rgba(75, 126, 135, 0.6);\n  width: 29px;\n  height: 27px;\n  color: #c9dfdb;\n  font-size: 15px;\n}\n.source-stamp {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #b4e0c9;\n  font: 8px Consolas, monospace;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 14px;\n}\n.source-stamp > span {\n  margin-left: auto;\n  color: #86aeb8;\n}\n.source-stamp app-crisis-icon {\n  width: 14px;\n  height: 14px;\n}\n.source-stamp[data-confidence=Unverified] {\n  color: #e2b48a;\n}\n.source-stamp[data-confidence=Forecast] {\n  color: #9ebddd;\n}\n.source-on-desk h3 {\n  font-size: 24px;\n}\n.source-byline {\n  color: #a6c9ca;\n  font-size: 10px;\n  margin: 12px 0 21px;\n}\n.source-byline span {\n  color: #658e9d;\n}\n.source-on-desk > p {\n  font-size: 13px;\n  line-height: 1.9;\n}\n.source-observation {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  border-left: 2px solid rgba(129, 184, 172, 0.4666666667);\n  padding: 12px 15px;\n  margin-top: 20px;\n  background: rgba(10, 41, 57, 0.2);\n}\n.source-observation p {\n  font-size: 11px;\n}\n.source-observation app-crisis-icon {\n  width: 18px;\n  height: 18px;\n  color: #91c3bd;\n}\n.surface-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.surface-actions button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  background: rgba(23, 59, 72, 0.4666666667);\n  border: 1px solid rgba(75, 118, 130, 0.4);\n  font-size: 10px;\n  padding: 12px;\n  color: #a9cbd0;\n}\n.surface-actions .primary-action {\n  background: rgba(52, 94, 80, 0.4);\n  border-color: rgba(125, 170, 152, 0.6666666667);\n  color: #c7e6d5;\n}\n.surface-actions app-crisis-icon {\n  width: 15px;\n  height: 15px;\n}\n.analysis-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.analysis-title h3 {\n  font-size: 22px;\n}\n.trend-change {\n  font-size: 23px;\n  color: #bcebdc;\n  font-weight: 300;\n  text-align: right;\n}\n.trend-change small {\n  display: block;\n  font: 6px Consolas, monospace;\n  color: #8bb4b8;\n  letter-spacing: 0.6px;\n  margin-top: 7px;\n}\n.data-lens {\n  display: grid;\n  grid-template-columns: 1fr 122px;\n  gap: 22px;\n  margin: 22px 0;\n}\n.trend-plot svg {\n  width: 100%;\n  height: 110px;\n  display: block;\n}\n.trend-plot > div {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n.trend-plot > div > span {\n  font: 6px Consolas, monospace;\n  color: #7298a5;\n}\n.trend-plot strong {\n  font: 11px Consolas, monospace;\n  color: #b8ddd4;\n}\n.trend-plot small {\n  font-size: 8px;\n  color: #7ca4b0;\n}\n.source-mix {\n  border-left: 1px solid rgba(71, 118, 129, 0.4);\n  padding-left: 15px;\n}\n.source-mix > span {\n  font: 6px Consolas, monospace;\n  color: #779eab;\n  letter-spacing: 0.6px;\n}\n.source-mix > div {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 9px;\n  color: #91b2bd;\n  margin-top: 12px;\n}\n.source-mix strong {\n  font: 16px Consolas, monospace;\n  color: #b2d8d2;\n  font-weight: 400;\n}\n.response-lens {\n  border-top: 1px solid rgba(74, 117, 130, 0.4196078431);\n  padding-top: 20px;\n}\n.lens-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n}\n.lens-heading > span:last-child {\n  font: 6px Consolas, monospace;\n  color: #809daa;\n  letter-spacing: 1px;\n}\n.response-picks {\n  display: flex;\n  gap: 6px;\n  overflow: auto;\n  padding: 4px 0 9px;\n  scrollbar-width: thin;\n  scrollbar-color: #3b6675 transparent;\n}\n.response-picks button {\n  flex: 0 0 145px;\n  padding: 10px 11px;\n  background: rgba(13, 43, 54, 0.4);\n  border: 1px solid rgba(66, 103, 118, 0.4);\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.4;\n  color: #8eafbb;\n}\n.response-picks button.selected {\n  border-color: rgba(138, 192, 175, 0.6588235294);\n  color: #d2e8dc;\n  background: rgba(51, 90, 78, 0.2666666667);\n}\n.response-picks small {\n  display: block;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7ca4ab;\n  margin-top: 8px;\n}\n.response-comparison {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  margin: 17px 0;\n}\n.risk-comparison {\n  flex: 1;\n}\n.risk-comparison > span,\n.crew-comparison > span {\n  font: 6px Consolas, monospace;\n  color: #86aab6;\n  letter-spacing: 1px;\n  display: block;\n}\n.risk-comparison strong {\n  font-size: 32px;\n  font-weight: 300;\n  display: block;\n  color: #afc5cc;\n  margin: 8px 0;\n}\n.risk-comparison small {\n  font-size: 13px;\n}\n.risk-comparison b {\n  font-size: 20px;\n  margin: 0 17px;\n  color: #547a85;\n}\n.risk-comparison em {\n  font-style: normal;\n  color: #b9e7d1;\n}\n.risk-track {\n  height: 3px;\n  position: relative;\n  background: #21444f;\n}\n.risk-track i,\n.risk-track b {\n  height: 100%;\n  position: absolute;\n  inset: 0 auto 0 0;\n  transition: width 0.5s;\n  margin: 0;\n}\n.risk-track i {\n  background: rgba(139, 164, 173, 0.5333333333);\n}\n.risk-track b {\n  background: #b9e7d1;\n}\n.crew-comparison strong {\n  display: block;\n  font-weight: 300;\n  font-size: 36px;\n  color: #c5e5d6;\n}\n.crew-comparison small {\n  font-size: 12px;\n  color: #789caa;\n}\n.crew-comparison > span {\n  margin-top: 9px;\n  font-size: 6px;\n}\n.briefing-surface .comparison-note {\n  font-size: 11px;\n}\n.uncertainty-note {\n  display: flex;\n  gap: 10px;\n  margin-top: 22px !important;\n  font-size: 10px !important;\n  color: #7da3b0 !important;\n}\n.uncertainty-note app-crisis-icon {\n  width: 17px;\n  height: 17px;\n}\n.companion-footer {\n  padding: 11px 20px;\n  border-top: 1px solid rgba(86, 123, 135, 0.2666666667);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 15px;\n}\n.companion-footer > span {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7aa4ae;\n}\n.companion-footer button {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  border: 0;\n  background: transparent;\n  font-size: 9px;\n  color: #a4c3c8;\n  padding: 4px;\n}\n.companion-footer app-crisis-icon {\n  width: 13px;\n  height: 13px;\n}\n@keyframes project-briefing {\n  from {\n    opacity: 0;\n    translate: -15px 8px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (min-width: 1600px) {\n  .robot-workbench {\n    left: 41%;\n    right: 7%;\n    top: 130px;\n    bottom: 154px;\n  }\n  .briefing-surface {\n    padding: 30px;\n  }\n  .companion-header {\n    padding: 25px 30px;\n  }\n}\n@media (max-width: 1000px) and (min-width: 701px) {\n  .robot-workbench {\n    left: 32%;\n    right: 3%;\n    top: 105px;\n  }\n  .companion-header {\n    padding: 17px 20px;\n  }\n  .intent-choices {\n    padding: 0 14px;\n  }\n  .intent-choices button {\n    font-size: 10px;\n    gap: 6px;\n  }\n  .briefing-surface {\n    padding: 20px;\n  }\n  .data-lens {\n    grid-template-columns: 1fr 95px;\n    gap: 12px;\n  }\n  .source-mix {\n    padding-left: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .robot-workbench {\n    left: 14px;\n    right: 14px;\n    top: 285px;\n    bottom: 158px;\n  }\n  .projection-link {\n    display: none;\n  }\n  .companion-header {\n    padding: 13px 15px;\n  }\n  .companion-header h2 {\n    font-size: 19px;\n    margin-top: 6px;\n  }\n  .eyebrow {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .close-workbench {\n    width: 27px;\n    height: 27px;\n  }\n  .intent-choices {\n    padding: 0 8px;\n    gap: 1px;\n  }\n  .intent-choices button {\n    padding: 10px 5px;\n    font-size: 9px;\n    gap: 6px;\n  }\n  .intent-choices app-crisis-icon {\n    width: 15px;\n    height: 15px;\n  }\n  .intent-choices small {\n    font-size: 5px;\n    letter-spacing: 0.6px;\n  }\n  .briefing-surface {\n    padding: 17px 16px;\n  }\n  .briefing-surface h3 {\n    font-size: 21px;\n  }\n  .briefing-surface p {\n    font-size: 11px;\n  }\n  .signal-strip {\n    padding: 17px 0;\n    margin-bottom: 17px;\n  }\n  .signal-strip span {\n    font-size: 5px;\n    letter-spacing: 0.4px;\n  }\n  .signal-strip > div {\n    padding-left: 10px;\n  }\n  .signal-strip strong {\n    font-size: 24px;\n  }\n  .signal-strip small {\n    font-size: 6px;\n  }\n  .attention-note h4 {\n    font-size: 15px;\n  }\n  .attention-note p {\n    font-size: 10px;\n  }\n  .text-action {\n    font-size: 10px;\n  }\n  .context-link {\n    font-size: 9px;\n  }\n  .context-link > span:last-child {\n    font-size: 8px;\n  }\n  .source-on-desk > p {\n    font-size: 12px;\n  }\n  .surface-actions {\n    flex-direction: column;\n  }\n  .surface-actions button {\n    font-size: 10px;\n  }\n  .trend-change {\n    font-size: 19px;\n  }\n  .trend-change small {\n    font-size: 5px;\n    max-width: 90px;\n    line-height: 1.6;\n  }\n  .data-lens {\n    grid-template-columns: 1fr 88px;\n    gap: 12px;\n  }\n  .trend-plot svg {\n    height: 85px;\n  }\n  .source-mix {\n    padding-left: 10px;\n  }\n  .source-mix > div {\n    font-size: 8px;\n    margin-top: 9px;\n    gap: 7px;\n  }\n  .source-mix strong {\n    font-size: 14px;\n  }\n  .lens-heading .surface-label {\n    font-size: 6px;\n    letter-spacing: 0.7px;\n  }\n  .lens-heading > span:last-child {\n    font-size: 5px;\n  }\n  .response-picks button {\n    flex-basis: 138px;\n  }\n  .risk-comparison strong {\n    font-size: 27px;\n  }\n  .crew-comparison strong {\n    font-size: 29px;\n  }\n  .companion-footer {\n    padding: 9px 12px;\n    gap: 6px;\n  }\n  .companion-footer > span {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n  }\n  .companion-footer button {\n    font-size: 8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-companion-briefing.component.css.map */\n'] }]
  }], null, { active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], roaming: [{ type: Input, args: [{ isSignal: true, alias: "roaming", required: false }] }], selectedLocation: [{ type: Input, args: [{ isSignal: true, alias: "selectedLocation", required: false }] }], navigate: [{ type: Output, args: ["navigate"] }], locate: [{ type: Output, args: ["locate"] }], reviewAction: [{ type: Output, args: ["reviewAction"] }], roamingChanged: [{ type: Output, args: ["roamingChanged"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisCompanionBriefingComponent, { className: "CrisisCompanionBriefingComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-companion-briefing.component.ts", lineNumber: 24 });
})();

// src/app/templates/crisis-operations/ui/crisis-robot.component.ts
function CrisisRobotComponent_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 12);
    \u0275\u0275domElement(1, "i");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.companion.name, " IS WITH YOU");
  }
}
function CrisisRobotComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275domElement(2, "div", 3)(3, "div", 4);
    \u0275\u0275domElementStart(4, "button", 5);
    \u0275\u0275domListener("pointerenter", function CrisisRobotComponent_Conditional_0_Template_button_pointerenter_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.engage("hover", true));
    })("pointerleave", function CrisisRobotComponent_Conditional_0_Template_button_pointerleave_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.engage("hover", false));
    })("focus", function CrisisRobotComponent_Conditional_0_Template_button_focus_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.engage("focus", true));
    })("blur", function CrisisRobotComponent_Conditional_0_Template_button_blur_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.engage("focus", false));
    })("click", function CrisisRobotComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open.emit());
    });
    \u0275\u0275domElementStart(5, "span", 6);
    \u0275\u0275domElement(6, "img", 7)(7, "span", 8)(8, "span", 9)(9, "span", 10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "span", 11)(11, "b");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "i");
    \u0275\u0275text(16, "\u2197");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(17, CrisisRobotComponent_Conditional_0_Conditional_17_Template, 3, 1, "span", 12);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("conversing", ctx_r1.view() === "argus")("away", ctx_r1.view() !== "room" && ctx_r1.view() !== "argus");
    \u0275\u0275attribute("inert", ctx_r1.view() === "room" || ctx_r1.view() === "argus" ? null : "")("aria-hidden", ctx_r1.view() === "room" || ctx_r1.view() === "argus" ? null : true);
    \u0275\u0275advance();
    \u0275\u0275styleProp("left", ctx_r1.pose().x, "%")("top", ctx_r1.pose().y, "%")("--%NS%robot-scale", ctx_r1.pose().scale)("--%NS%travel-time", ctx_r1.duration() + "ms")("--%NS%facing", ctx_r1.facing());
    \u0275\u0275classProp("moving", ctx_r1.moving())("engaged", ctx_r1.view() === "argus")("attentive", ctx_r1.hovered() || ctx_r1.focused());
    \u0275\u0275attribute("data-roaming", ctx_r1.moving());
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", "Call " + ctx_r1.companion.name + " for a briefing")("aria-expanded", ctx_r1.view() === "argus");
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("src", ctx_r1.companion.sprite, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.companion.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activity());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.view() === "argus" ? 17 : -1);
  }
}
var CrisisRobotComponent = class _CrisisRobotComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  view = input(
    "room",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roaming = input(
    true,
    ...ngDevMode ? [{ debugName: "roaming" }] : (
      /* istanbul ignore next */
      []
    )
  );
  open = output();
  ready = signal(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moving = signal(
    false,
    ...ngDevMode ? [{ debugName: "moving" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hovered = signal(
    false,
    ...ngDevMode ? [{ debugName: "hovered" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focused = signal(
    false,
    ...ngDevMode ? [{ debugName: "focused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  facing = signal(
    1,
    ...ngDevMode ? [{ debugName: "facing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  duration = signal(
    1150,
    ...ngDevMode ? [{ debugName: "duration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reduced = signal(
    false,
    ...ngDevMode ? [{ debugName: "reduced" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compact = signal(
    false,
    ...ngDevMode ? [{ debugName: "compact" }] : (
      /* istanbul ignore next */
      []
    )
  );
  narrow = signal(
    false,
    ...ngDevMode ? [{ debugName: "narrow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pose = signal(
    this.runtime.config.companion?.roamPoints[0] ?? { x: 78, y: 75, scale: 1 },
    ...ngDevMode ? [{ debugName: "pose" }] : (
      /* istanbul ignore next */
      []
    )
  );
  companion = this.runtime.config.companion;
  attention = computed(
    () => this.runtime.unread() > 0 ? `${this.runtime.unread()} ${this.runtime.unread() === 1 ? "signal" : "signals"} to review` : "Ready when you are",
    ...ngDevMode ? [{ debugName: "attention" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activity = computed(
    () => this.view() === "argus" ? "With you" : this.hovered() || this.focused() ? "You have my attention" : this.moving() ? "On my rounds" : this.attention(),
    ...ngDevMode ? [{ debugName: "activity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stop = 0;
  timer;
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  sizeQuery = window.matchMedia("(max-width: 700px)");
  narrowQuery = window.matchMedia("(max-width: 1050px)");
  preferences = () => {
    this.reduced.set(this.motionQuery.matches);
    this.compact.set(this.sizeQuery.matches);
    this.narrow.set(this.narrowQuery.matches);
  };
  visibility = () => this.sync();
  constructor() {
    this.preferences();
    this.motionQuery.addEventListener?.("change", this.preferences);
    this.sizeQuery.addEventListener?.("change", this.preferences);
    this.narrowQuery.addEventListener?.("change", this.preferences);
    document.addEventListener("visibilitychange", this.visibility);
    effect(() => {
      this.view();
      this.roaming();
      this.reduced();
      this.compact();
      this.narrow();
      if (this.ready())
        untracked(() => this.sync());
    });
  }
  ngAfterViewInit() {
    this.ready.set(true);
  }
  points() {
    return this.compact() ? [
      { x: 54, y: 72, scale: 0.9 },
      { x: 53, y: 78, scale: 1 },
      { x: 48, y: 80, scale: 1.03 },
      { x: 45, y: 76, scale: 0.95 }
    ] : this.narrow() ? [
      { x: 70, y: 79, scale: 0.9 },
      { x: 65, y: 83, scale: 1 },
      { x: 53, y: 85, scale: 1.1 },
      { x: 42, y: 85, scale: 1.1 },
      { x: 34, y: 81, scale: 1 }
    ] : this.companion?.roamPoints ?? [];
  }
  freeze() {
    clearTimeout(this.timer);
    if (this.moving()) {
      const node = this.element.nativeElement.querySelector(".robot-travel");
      if (node && node.offsetParent instanceof HTMLElement) {
        const style = getComputedStyle(node), parent = node.offsetParent;
        if (parent.clientWidth && parent.clientHeight)
          this.pose.set(__spreadProps(__spreadValues({}, this.pose()), {
            x: parseFloat(style.left) / parent.clientWidth * 100,
            y: parseFloat(style.top) / parent.clientHeight * 100
          }));
      }
    }
    this.moving.set(false);
    this.duration.set(0);
  }
  sync() {
    if (!this.ready() || !this.companion)
      return;
    this.freeze();
    if (this.view() === "argus") {
      this.duration.set(this.reduced() ? 0 : 1150);
      this.facing.set(1);
      this.pose.set(this.compact() ? { x: 50, y: 32, scale: 0.85 } : this.narrow() ? { x: 33, y: 80, scale: 1.55 } : { x: 27, y: 80, scale: 2.1 });
      return;
    }
    if (this.view() !== "room")
      return;
    const points = this.points();
    this.stop = Math.min(this.stop, points.length - 1);
    this.duration.set(this.reduced() ? 0 : 1150);
    this.pose.set(points[Math.max(0, this.stop)]);
    if (this.canMove())
      this.schedule(2200);
  }
  canMove() {
    return this.view() === "room" && this.roaming() && !this.reduced() && !document.hidden && !this.hovered() && !this.focused();
  }
  schedule(delay) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.step(), delay);
  }
  step() {
    if (!this.canMove())
      return;
    const points = this.points();
    this.stop = nextCompanionStop(this.stop, points.length, Math.random());
    const next = points[this.stop], duration = 3200 + Math.random() * 2e3;
    this.facing.set(next.x < this.pose().x ? 1 : -1);
    this.duration.set(duration);
    this.moving.set(true);
    this.pose.set(next);
    this.timer = setTimeout(() => {
      this.moving.set(false);
      if (this.canMove())
        this.schedule(3500 + Math.random() * 5500);
    }, duration);
  }
  engage(kind, value) {
    (kind === "hover" ? this.hovered : this.focused).set(value);
    if (value)
      this.freeze();
    else if (this.canMove())
      this.schedule(1200);
  }
  ngOnDestroy() {
    clearTimeout(this.timer);
    document.removeEventListener("visibilitychange", this.visibility);
    this.motionQuery.removeEventListener?.("change", this.preferences);
    this.sizeQuery.removeEventListener?.("change", this.preferences);
    this.narrowQuery.removeEventListener?.("change", this.preferences);
  }
  static \u0275fac = function CrisisRobotComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisRobotComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisRobotComponent, selectors: [["app-crisis-robot"]], inputs: { view: [1, "view"], roaming: [1, "roaming"] }, outputs: { open: "open" }, decls: 1, vars: 1, consts: [[1, "robot-space", 3, "conversing", "away"], [1, "robot-space"], [1, "robot-travel"], ["aria-hidden", "true", 1, "robot-shadow"], ["aria-hidden", "true", 1, "ground-ring"], [1, "robot-character", 3, "pointerenter", "pointerleave", "focus", "blur", "click"], [1, "robot-body"], ["alt", "", "draggable", "false", 3, "src"], ["aria-hidden", "true", 1, "robot-eyelid"], ["aria-hidden", "true", 1, "robot-eyelid", "right-eye"], ["aria-hidden", "true", 1, "attention-spark"], [1, "robot-callout"], [1, "companion-presence"]], template: function CrisisRobotComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CrisisRobotComponent_Conditional_0_Template, 18, 29, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.companion ? 0 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 2;\n}\n.robot-space[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: max(100vw, 177.69vh);\n  height: max(56.28vw, 100vh);\n  transform: translate(-50%, -50%);\n  transform-origin: 50% 55%;\n  transition: transform 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), opacity 0.4s;\n}\n.robot-space.conversing[_ngcontent-%COMP%] {\n  transform: translate(-50%, -50%) scale(1.05);\n}\n.robot-space.away[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.robot-eyelid[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 29.2%;\n  top: 15.5%;\n  width: 10.4%;\n  height: 6.4%;\n  border-radius: 50%;\n  background: #010711;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_robot-blink 7.4s ease-in-out infinite;\n}\n.robot-eyelid.right-eye[_ngcontent-%COMP%] {\n  left: 44.2%;\n}\n@keyframes _ngcontent-%COMP%_robot-blink {\n  0%, 90%, 94%, 100% {\n    opacity: 0;\n  }\n  91.5%, 92.5% {\n    opacity: 1;\n  }\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.robot-travel[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 20%;\n  aspect-ratio: 2/3;\n  transform: translate(-50%, -92%) scale(var(--%NS%robot-scale));\n  transform-origin: 50% 92%;\n  transition:\n    left var(--%NS%travel-time) cubic-bezier(0.3, 0.1, 0.3, 1),\n    top var(--%NS%travel-time) cubic-bezier(0.3, 0.1, 0.3, 1),\n    transform var(--%NS%travel-time) ease;\n}\n.robot-character[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  pointer-events: auto;\n  color: #dceeea;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.robot-body[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  transform: scaleX(var(--%NS%facing));\n  transition: transform 0.6s;\n  transform-origin: 50% 85%;\n  filter: brightness(0.82) saturate(0.8) drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.5333333333));\n  animation: _ngcontent-%COMP%_robot-idle 7s ease-in-out infinite;\n}\n.robot-body[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.robot-shadow[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10%;\n  bottom: 3%;\n  width: 80%;\n  height: 12%;\n  border-radius: 50%;\n  background: rgba(2, 6, 11, 0.9411764706);\n  filter: blur(4px);\n  opacity: 0.85;\n}\n.ground-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 2%;\n  left: 5%;\n  width: 90%;\n  height: 14%;\n  border: 1px solid rgba(155, 221, 221, 0.4666666667);\n  border-radius: 50%;\n  box-shadow: 0 0 8px rgba(144, 223, 218, 0.2666666667);\n  opacity: 0.35;\n  transition: opacity 0.3s, scale 0.3s;\n}\n.moving[_ngcontent-%COMP%]   .robot-body[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_robot-roll 0.6s ease-in-out infinite;\n}\n.moving[_ngcontent-%COMP%]   .ground-ring[_ngcontent-%COMP%] {\n  border-style: dashed;\n}\n.attentive[_ngcontent-%COMP%]   .robot-body[_ngcontent-%COMP%], \n.engaged[_ngcontent-%COMP%]   .robot-body[_ngcontent-%COMP%] {\n  filter: brightness(1) saturate(0.9) drop-shadow(0 3px 5px rgba(122, 233, 238, 0.0862745098));\n}\n.attentive[_ngcontent-%COMP%]   .ground-ring[_ngcontent-%COMP%], \n.engaged[_ngcontent-%COMP%]   .ground-ring[_ngcontent-%COMP%] {\n  opacity: 1;\n  scale: 1.1;\n}\n.robot-character[_ngcontent-%COMP%]:focus-visible   .ground-ring[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.robot-character[_ngcontent-%COMP%]:focus-visible {\n  outline: 1px solid #b8ead3;\n  outline-offset: 3px;\n  border-radius: 40%;\n}\n.robot-callout[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 11%;\n  right: 86%;\n  display: grid;\n  grid-template-columns: auto 12px;\n  gap: 4px 13px;\n  text-align: left;\n  padding: 9px 12px;\n  background: rgba(10, 37, 49, 0.9333333333);\n  border: 1px solid rgba(119, 182, 180, 0.4588235294);\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4666666667);\n  opacity: 0;\n  translate: 5px 0;\n  transition: opacity 0.2s, translate 0.2s;\n  white-space: nowrap;\n  pointer-events: none;\n}\n.robot-callout[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  color: #c1e5e0;\n}\n.robot-callout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  grid-column: 1;\n  font: 7px "Segoe UI", sans-serif;\n  color: #9bbbbf;\n}\n.robot-callout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  grid-column: 2;\n  grid-row: 1/3;\n  align-self: center;\n  font: 12px "Segoe UI";\n}\n.attentive[_ngcontent-%COMP%]   .robot-callout[_ngcontent-%COMP%] {\n  opacity: 1;\n  translate: 0 0;\n}\n.engaged[_ngcontent-%COMP%]   .robot-callout[_ngcontent-%COMP%] {\n  display: none;\n}\n.attention-spark[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 47%;\n  top: 38%;\n  width: 3px;\n  height: 3px;\n  background: #9efff0;\n  border-radius: 50%;\n  box-shadow: 0 0 8px 2px #63d6dd;\n  animation: _ngcontent-%COMP%_status-glow 4s ease-in-out infinite;\n}\n.companion-presence[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -1%;\n  left: 50%;\n  transform: translateX(-50%);\n  font: 5px Consolas, monospace;\n  letter-spacing: 1.2px;\n  white-space: nowrap;\n  color: #b4d4d1;\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.companion-presence[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  background: #acdfca;\n  box-shadow: 0 0 6px #acdfca;\n}\n@keyframes _ngcontent-%COMP%_robot-idle {\n  0%, 100% {\n    rotate: 0deg;\n    translate: 0 0;\n  }\n  30% {\n    rotate: 1.5deg;\n  }\n  65% {\n    rotate: -1deg;\n    translate: 0 -1px;\n  }\n}\n@keyframes _ngcontent-%COMP%_robot-roll {\n  0%, 100% {\n    translate: 0 0;\n    rotate: -1deg;\n  }\n  50% {\n    translate: 0 -0.7px;\n    rotate: 0deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_status-glow {\n  0%, 100% {\n    opacity: 0.35;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (max-width: 700px) {\n  .robot-space.conversing[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%);\n  }\n  .robot-callout[_ngcontent-%COMP%] {\n    right: 70%;\n    padding: 8px;\n  }\n  .robot-callout[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n   .robot-callout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .engaged[_ngcontent-%COMP%]   .companion-presence[_ngcontent-%COMP%] {\n    font-size: 6px;\n    bottom: -3%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-robot.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisRobotComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-robot", template: `@if (companion) {
  <div
    class="robot-space"
    [class.conversing]="view() === 'argus'"
    [class.away]="view() !== 'room' && view() !== 'argus'"
    [attr.inert]="view() === 'room' || view() === 'argus' ? null : ''"
    [attr.aria-hidden]="view() === 'room' || view() === 'argus' ? null : true"
  >
    <div
      class="robot-travel"
      [class.moving]="moving()"
      [class.engaged]="view() === 'argus'"
      [class.attentive]="hovered() || focused()"
      [style.left.%]="pose().x"
      [style.top.%]="pose().y"
      [style.--robot-scale]="pose().scale"
      [style.--travel-time]="duration() + 'ms'"
      [style.--facing]="facing()"
      [attr.data-roaming]="moving()"
    >
      <div class="robot-shadow" aria-hidden="true"></div>
      <div class="ground-ring" aria-hidden="true"></div>
      <button
        class="robot-character"
        [attr.aria-label]="'Call ' + companion.name + ' for a briefing'"
        [attr.aria-expanded]="view() === 'argus'"
        (pointerenter)="engage('hover', true)"
        (pointerleave)="engage('hover', false)"
        (focus)="engage('focus', true)"
        (blur)="engage('focus', false)"
        (click)="open.emit()"
      >
        <span class="robot-body"
          ><img [src]="companion.sprite" alt="" draggable="false" /><span
            class="robot-eyelid"
            aria-hidden="true"
          ></span
          ><span class="robot-eyelid right-eye" aria-hidden="true"></span
          ><span class="attention-spark" aria-hidden="true"></span
        ></span>
        <span class="robot-callout"
          ><b>{{ companion.name }}</b
          ><span>{{ activity() }}</span
          ><i>\u2197</i></span
        >
      </button>
      @if (view() === 'argus') {
        <span class="companion-presence"><i></i> {{ companion.name }} IS WITH YOU</span>
      }
    </div>
  </div>
}
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-robot.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 2;\n}\n.robot-space {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: max(100vw, 177.69vh);\n  height: max(56.28vw, 100vh);\n  transform: translate(-50%, -50%);\n  transform-origin: 50% 55%;\n  transition: transform 1.15s cubic-bezier(0.22, 0.68, 0.14, 1), opacity 0.4s;\n}\n.robot-space.conversing {\n  transform: translate(-50%, -50%) scale(1.05);\n}\n.robot-space.away {\n  opacity: 0;\n  pointer-events: none;\n}\n.robot-eyelid {\n  position: absolute;\n  left: 29.2%;\n  top: 15.5%;\n  width: 10.4%;\n  height: 6.4%;\n  border-radius: 50%;\n  background: #010711;\n  opacity: 0;\n  animation: robot-blink 7.4s ease-in-out infinite;\n}\n.robot-eyelid.right-eye {\n  left: 44.2%;\n}\n@keyframes robot-blink {\n  0%, 90%, 94%, 100% {\n    opacity: 0;\n  }\n  91.5%, 92.5% {\n    opacity: 1;\n  }\n}\n* {\n  box-sizing: border-box;\n}\n.robot-travel {\n  position: absolute;\n  height: 20%;\n  aspect-ratio: 2/3;\n  transform: translate(-50%, -92%) scale(var(--robot-scale));\n  transform-origin: 50% 92%;\n  transition:\n    left var(--travel-time) cubic-bezier(0.3, 0.1, 0.3, 1),\n    top var(--travel-time) cubic-bezier(0.3, 0.1, 0.3, 1),\n    transform var(--travel-time) ease;\n}\n.robot-character {\n  position: absolute;\n  inset: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  pointer-events: auto;\n  color: #dceeea;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.robot-body {\n  display: block;\n  width: 100%;\n  height: 100%;\n  transform: scaleX(var(--facing));\n  transition: transform 0.6s;\n  transform-origin: 50% 85%;\n  filter: brightness(0.82) saturate(0.8) drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.5333333333));\n  animation: robot-idle 7s ease-in-out infinite;\n}\n.robot-body img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.robot-shadow {\n  position: absolute;\n  left: 10%;\n  bottom: 3%;\n  width: 80%;\n  height: 12%;\n  border-radius: 50%;\n  background: rgba(2, 6, 11, 0.9411764706);\n  filter: blur(4px);\n  opacity: 0.85;\n}\n.ground-ring {\n  position: absolute;\n  bottom: 2%;\n  left: 5%;\n  width: 90%;\n  height: 14%;\n  border: 1px solid rgba(155, 221, 221, 0.4666666667);\n  border-radius: 50%;\n  box-shadow: 0 0 8px rgba(144, 223, 218, 0.2666666667);\n  opacity: 0.35;\n  transition: opacity 0.3s, scale 0.3s;\n}\n.moving .robot-body {\n  animation: robot-roll 0.6s ease-in-out infinite;\n}\n.moving .ground-ring {\n  border-style: dashed;\n}\n.attentive .robot-body,\n.engaged .robot-body {\n  filter: brightness(1) saturate(0.9) drop-shadow(0 3px 5px rgba(122, 233, 238, 0.0862745098));\n}\n.attentive .ground-ring,\n.engaged .ground-ring {\n  opacity: 1;\n  scale: 1.1;\n}\n.robot-character:focus-visible .ground-ring {\n  opacity: 1;\n}\n.robot-character:focus-visible {\n  outline: 1px solid #b8ead3;\n  outline-offset: 3px;\n  border-radius: 40%;\n}\n.robot-callout {\n  position: absolute;\n  top: 11%;\n  right: 86%;\n  display: grid;\n  grid-template-columns: auto 12px;\n  gap: 4px 13px;\n  text-align: left;\n  padding: 9px 12px;\n  background: rgba(10, 37, 49, 0.9333333333);\n  border: 1px solid rgba(119, 182, 180, 0.4588235294);\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4666666667);\n  opacity: 0;\n  translate: 5px 0;\n  transition: opacity 0.2s, translate 0.2s;\n  white-space: nowrap;\n  pointer-events: none;\n}\n.robot-callout b {\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.8px;\n  color: #c1e5e0;\n}\n.robot-callout span {\n  grid-column: 1;\n  font: 7px "Segoe UI", sans-serif;\n  color: #9bbbbf;\n}\n.robot-callout i {\n  grid-column: 2;\n  grid-row: 1/3;\n  align-self: center;\n  font: 12px "Segoe UI";\n}\n.attentive .robot-callout {\n  opacity: 1;\n  translate: 0 0;\n}\n.engaged .robot-callout {\n  display: none;\n}\n.attention-spark {\n  position: absolute;\n  left: 47%;\n  top: 38%;\n  width: 3px;\n  height: 3px;\n  background: #9efff0;\n  border-radius: 50%;\n  box-shadow: 0 0 8px 2px #63d6dd;\n  animation: status-glow 4s ease-in-out infinite;\n}\n.companion-presence {\n  position: absolute;\n  bottom: -1%;\n  left: 50%;\n  transform: translateX(-50%);\n  font: 5px Consolas, monospace;\n  letter-spacing: 1.2px;\n  white-space: nowrap;\n  color: #b4d4d1;\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.companion-presence i {\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  background: #acdfca;\n  box-shadow: 0 0 6px #acdfca;\n}\n@keyframes robot-idle {\n  0%, 100% {\n    rotate: 0deg;\n    translate: 0 0;\n  }\n  30% {\n    rotate: 1.5deg;\n  }\n  65% {\n    rotate: -1deg;\n    translate: 0 -1px;\n  }\n}\n@keyframes robot-roll {\n  0%, 100% {\n    translate: 0 0;\n    rotate: -1deg;\n  }\n  50% {\n    translate: 0 -0.7px;\n    rotate: 0deg;\n  }\n}\n@keyframes status-glow {\n  0%, 100% {\n    opacity: 0.35;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (max-width: 700px) {\n  .robot-space.conversing {\n    transform: translate(-50%, -50%);\n  }\n  .robot-callout {\n    right: 70%;\n    padding: 8px;\n  }\n  .robot-callout b,\n  .robot-callout span {\n    font-size: 8px;\n  }\n  .engaged .companion-presence {\n    font-size: 6px;\n    bottom: -3%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-robot.component.css.map */\n'] }]
  }], () => [], { view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: false }] }], roaming: [{ type: Input, args: [{ isSignal: true, alias: "roaming", required: false }] }], open: [{ type: Output, args: ["open"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisRobotComponent, { className: "CrisisRobotComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-robot.component.ts", lineNumber: 23 });
})();

// src/app/templates/crisis-operations/domain/crisis-workstations.ts
function workstationReports(config, state, station) {
  const ids = new Set(
    station.roleIds.flatMap(
      (roleId) => visibleEvidence(config, __spreadProps(__spreadValues({}, state), { roleId })).map((report) => report.id)
    )
  );
  return config.evidence.filter((report) => ids.has(report.id)).sort((a, b) => b.minute - a.minute);
}

// src/app/templates/crisis-operations/ui/crisis-weather-screen.component.ts
var _forTrack07 = ($index, $item) => $item.id;
function CrisisWeatherScreenComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 1)(1, "div", 33);
    \u0275\u0275element(2, "app-crisis-icon", 34);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "REGIONAL WEATHER DESK");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 35)(8, "button", 36);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mode.set("radar"));
    });
    \u0275\u0275text(9, " Doppler radar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 36);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mode.set("satellite"));
    });
    \u0275\u0275text(11, " Satellite ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 37);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275element(13, "app-crisis-icon", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.weather().network);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("aria-pressed", ctx_r1.mode() === "radar");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.mode() === "satellite");
  }
}
function CrisisWeatherScreenComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 19);
  }
  if (rf & 2) {
    const road_r3 = ctx.$implicit;
    \u0275\u0275attribute("d", road_r3);
  }
}
function CrisisWeatherScreenComponent_Conditional_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 44);
  }
}
function CrisisWeatherScreenComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 39)(2, "path", 40)(3, "path", 41)(4, "path", 42)(5, "path", 43);
    \u0275\u0275conditionalCreate(6, CrisisWeatherScreenComponent_Conditional_26_Conditional_6_Template, 1, 0, ":svg:path", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("filter", "url(#" + ctx_r1.uid + "-texture)");
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.frame().intensity > 0.65 ? 6 : -1);
  }
}
function CrisisWeatherScreenComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 22);
    \u0275\u0275element(1, "ellipse", 45)(2, "ellipse", 46)(3, "ellipse", 47)(4, "ellipse", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("filter", "url(#" + ctx_r1.uid + "-cloud)");
  }
}
function CrisisWeatherScreenComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 49);
    \u0275\u0275element(1, "circle", 50);
    \u0275\u0275elementStart(2, "text");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const location_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r1.selectedLocation() === location_r4.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("cx", location_r4.x)("cy", location_r4.y);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", location_r4.x + 10)("y", location_r4.y + 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", location_r4.name, " ");
  }
}
function CrisisWeatherScreenComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "button", 36);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_48_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoom.set(!ctx_r1.zoom()));
    });
    \u0275\u0275element(2, "app-crisis-icon", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 53)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "i");
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.zoom() ? "Show whole weather region" : "Zoom to selected location")("aria-pressed", ctx_r1.zoom());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.mode() === "radar" ? "LIGHT" : "THIN");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.mode() === "radar" ? "HEAVY" : "THICK");
  }
}
function CrisisWeatherScreenComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "button", 36);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_49_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.playing.set(!ctx_r1.playing()));
    });
    \u0275\u0275element(2, "app-crisis-icon", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 56);
    \u0275\u0275listener("input", function CrisisWeatherScreenComponent_Conditional_49_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.scrub($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "b");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 57)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "h3");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.playing() ? "Pause weather loop" : "Play weather loop");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.playing() ? "pause" : "play");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.time(ctx_r1.frames()[0].minute));
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.frames().length - 1)("value", ctx_r1.frameIndex());
    \u0275\u0275attribute("aria-valuetext", ctx_r1.runtime.time(ctx_r1.frame().minute));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.time(ctx_r1.frames()[ctx_r1.frames().length - 1].minute));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.playing() ? "LOOP" : "PAUSED");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-alert", ctx_r1.runtime.bulletin().alert);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().alert.toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().summary);
  }
}
function CrisisWeatherScreenComponent_Conditional_50_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const place_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", place_r8.id)("selected", ctx_r1.selectedLocation() === place_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", place_r8.name, " ");
  }
}
function CrisisWeatherScreenComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 32)(1, "span", 58);
    \u0275\u0275text(2, "WATERSHED OUTLOOK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 59);
    \u0275\u0275element(8, "app-crisis-icon", 60);
    \u0275\u0275elementStart(9, "div")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "small");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 61)(19, "span");
    \u0275\u0275text(20, "FORECAST CONFIDENCE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label", 62);
    \u0275\u0275text(24, "Watch location");
    \u0275\u0275elementStart(25, "select", 63);
    \u0275\u0275listener("change", function CrisisWeatherScreenComponent_Conditional_50_Template_select_change_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectedLocation.set($event.target.value));
    });
    \u0275\u0275repeaterCreate(26, CrisisWeatherScreenComponent_Conditional_50_For_27_Template, 2, 3, "option", 64, _forTrack07);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 65)(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 36);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_50_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.locate.emit(ctx_r1.selectedLocation()));
    });
    \u0275\u0275text(34, " Inspect on situation table ");
    \u0275\u0275element(35, "app-crisis-icon", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "button", 67);
    \u0275\u0275listener("click", function CrisisWeatherScreenComponent_Conditional_50_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reports.emit());
    });
    \u0275\u0275element(37, "app-crisis-icon", 68);
    \u0275\u0275text(38, "Open weather reports ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p", 69);
    \u0275\u0275text(40, " Simulated radar and satellite loop. Playback does not advance the exercise. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.time(), " forecast");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().forecast);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.bulletin().metricValue, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.caption);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().uncertainty);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.selectedLocation());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.config.locations);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.location().elevation, " m elevation");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.location().detail);
  }
}
var weatherSurfaceId = 0;
var CrisisWeatherScreenComponent = class _CrisisWeatherScreenComponent {
  runtime = inject(CrisisRuntimeService);
  weather = input.required(
    ...ngDevMode ? [{ debugName: "weather" }] : (
      /* istanbul ignore next */
      []
    )
  );
  miniature = input(
    false,
    ...ngDevMode ? [{ debugName: "miniature" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = input(
    true,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leave = output();
  reports = output();
  locate = output();
  uid = `weather-${++weatherSurfaceId}`;
  mode = signal(
    "radar",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = signal(
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frameIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "frameIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = signal(
    false,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLocation = signal(
    this.runtime.config.locations[0].id,
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  location = computed(
    () => this.runtime.config.locations.find((location) => location.id === this.selectedLocation()),
    ...ngDevMode ? [{ debugName: "location" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frames = computed(
    () => this.weather().frames.filter((frame) => frame.stage === this.runtime.state().stage && frame.minute <= this.runtime.bulletin().minute),
    ...ngDevMode ? [{ debugName: "frames" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frame = computed(
    () => this.frames()[Math.min(this.frameIndex(), this.frames().length - 1)],
    ...ngDevMode ? [{ debugName: "frame" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stormTransform = computed(
    () => `translate(${this.frame().x - 500}px, ${this.frame().y - 270}px) scale(${0.78 + this.frame().intensity * 0.35})`,
    ...ngDevMode ? [{ debugName: "stormTransform" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapTransform = computed(
    () => this.zoom() ? `translate(${500 - this.location().x * 1.45} ${300 - this.location().y * 1.45}) scale(1.45)` : "translate(0 0)",
    ...ngDevMode ? [{ debugName: "mapTransform" }] : (
      /* istanbul ignore next */
      []
    )
  );
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionChanged = (event) => {
    if (event.matches)
      this.playing.set(false);
  };
  timer;
  constructor() {
    effect(() => {
      this.runtime.state().stage;
      this.frameIndex.set(0);
    });
    this.motionQuery.addEventListener?.("change", this.motionChanged);
    this.timer = setInterval(() => {
      if (this.active() && this.playing() && !document.hidden)
        this.frameIndex.update((index) => (index + 1) % this.frames().length);
    }, 1400);
  }
  scrub(value) {
    this.playing.set(false);
    this.frameIndex.set(Math.max(0, Math.min(this.frames().length - 1, Number(value) || 0)));
  }
  ngOnDestroy() {
    clearInterval(this.timer);
    this.motionQuery.removeEventListener?.("change", this.motionChanged);
  }
  static \u0275fac = function CrisisWeatherScreenComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisWeatherScreenComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisWeatherScreenComponent, selectors: [["app-crisis-weather-screen"]], hostVars: 2, hostBindings: function CrisisWeatherScreenComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("miniature", ctx.miniature());
    }
  }, inputs: { weather: [1, "weather"], miniature: [1, "miniature"], active: [1, "active"] }, outputs: { leave: "leave", reports: "reports", locate: "locate" }, decls: 51, vars: 33, consts: [[1, "weather-window"], [1, "weather-topbar"], [1, "weather-content"], [1, "weather-broadcast"], [1, "map-canvas"], ["viewBox", "0 0 1000 600", "preserveAspectRatio", "xMidYMid slice"], ["x", "-30%", "y", "-30%", "width", "160%", "height", "160%", 3, "id"], ["type", "fractalNoise", "baseFrequency", ".025", "numOctaves", "3", "seed", "8", "result", "noise"], ["in", "SourceGraphic", "in2", "noise", "scale", "45", "xChannelSelector", "R", "yChannelSelector", "G"], ["stdDeviation", "2"], ["type", "fractalNoise", "baseFrequency", ".015", "numOctaves", "4", "seed", "4", "result", "noise"], ["in", "SourceGraphic", "in2", "noise", "scale", "65"], ["stdDeviation", "7"], ["width", "100", "height", "100", "patternUnits", "userSpaceOnUse", 3, "id"], ["d", "M100 0H0V100", "fill", "none", "stroke", "#c7def4", "stroke-opacity", ".07", "stroke-width", "1"], ["width", "1000", "height", "600", "fill", "#0b2a43"], ["fill", "#263b31"], ["width", "1000", "height", "600", "preserveAspectRatio", "none"], ["fill", "none", "stroke", "#8dad99", "stroke-opacity", ".35", "stroke-width", "1"], ["fill", "none", "stroke", "#d2cbaf", "stroke-width", "2", "stroke-opacity", ".35"], ["fill", "none", "stroke", "#8cc4e3", "stroke-width", "3", "stroke-opacity", ".6"], [1, "weather-system"], ["fill", "#f1f2ef"], ["fill", "none", "stroke", "#d0e4ed", "stroke-opacity", ".13", "stroke-width", "1", 1, "radar-rings"], ["cx", "578", "cy", "246", "r", "110"], ["cx", "578", "cy", "246", "r", "220"], ["cx", "578", "cy", "246", "r", "330"], [1, "weather-location", 3, "selected"], ["width", "1000", "height", "600"], [1, "map-brand"], [1, "weather-bug"], [1, "frame-stamp"], [1, "forecast-panel"], [1, "network-mark"], ["name", "radar"], ["aria-label", "Weather layers", 1, "weather-tabs"], [3, "click"], ["aria-label", "Return to room", 1, "weather-close", 3, "click"], ["name", "close"], ["d", "M225 26Q370 9 466 118T655 245Q747 303 869 445L906 540Q744 552 628 433T424 319Q318 284 214 145Z", "fill", "#249448"], ["d", "M272 69Q382 53 456 151T633 271Q708 318 813 453L807 485Q697 450 603 370T416 274Q330 219 272 69Z", "fill", "#4bcc52"], ["d", "M371 149Q443 143 487 225T629 296L730 419Q629 396 583 356T429 267Z", "fill", "#b6db43"], ["d", "M399 177Q470 179 501 237T615 302L664 352Q571 350 529 301T453 260Z", "fill", "#f3d644"], ["d", "M449 206Q503 227 516 261T579 300Q561 335 512 292T449 206Z", "fill", "#f29438"], ["d", "M481 243Q502 232 524 272L553 295Q525 312 503 277Z", "fill", "#e84b44"], ["cx", "435", "cy", "167", "rx", "210", "ry", "70", "transform", "rotate(34 435 167)", "opacity", ".75"], ["cx", "570", "cy", "292", "rx", "190", "ry", "62", "transform", "rotate(37 570 292)", "opacity", ".85"], ["cx", "756", "cy", "404", "rx", "160", "ry", "48", "transform", "rotate(35 756 404)", "opacity", ".65"], ["cx", "435", "cy", "167", "rx", "145", "ry", "30", "transform", "rotate(34 435 167)"], [1, "weather-location"], ["r", "4", "fill", "white"], [1, "map-tools"], ["name", "expand"], [1, "weather-legend"], [1, "weather-playback"], [3, "name"], ["type", "range", "min", "0", "aria-label", "Weather loop frame", 3, "input", "max", "value"], [1, "weather-lower-third"], [1, "forecast-label"], [1, "river-reading"], ["name", "station"], [1, "forecast-confidence"], [1, "weather-location-select"], [3, "change", "value"], [3, "value", "selected"], [1, "location-context"], ["name", "arrow"], [1, "weather-reports", 3, "click"], ["name", "news"], [1, "exercise-note"]], template: function CrisisWeatherScreenComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, CrisisWeatherScreenComponent_Conditional_1_Template, 14, 3, "header", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5)(6, "defs")(7, "filter", 6);
      \u0275\u0275element(8, "feTurbulence", 7)(9, "feDisplacementMap", 8)(10, "feGaussianBlur", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "filter", 6);
      \u0275\u0275element(12, "feTurbulence", 10)(13, "feDisplacementMap", 11)(14, "feGaussianBlur", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "pattern", 13);
      \u0275\u0275element(16, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(17, "rect", 15);
      \u0275\u0275elementStart(18, "g");
      \u0275\u0275element(19, "path", 16)(20, "image", 17)(21, "path", 18);
      \u0275\u0275repeaterCreate(22, CrisisWeatherScreenComponent_For_23_Template, 1, 1, ":svg:path", 19, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275element(24, "path", 20);
      \u0275\u0275elementStart(25, "g", 21);
      \u0275\u0275conditionalCreate(26, CrisisWeatherScreenComponent_Conditional_26_Template, 7, 2, ":svg:g")(27, CrisisWeatherScreenComponent_Conditional_27_Template, 5, 1, ":svg:g", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "g", 23);
      \u0275\u0275element(29, "circle", 24)(30, "circle", 25)(31, "circle", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(32, CrisisWeatherScreenComponent_For_33_Template, 4, 7, ":svg:g", 27, _forTrack07);
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "rect", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(35, "div", 29)(36, "span", 30);
      \u0275\u0275text(37, "WX");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "h2");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 31);
      \u0275\u0275element(44, "i");
      \u0275\u0275text(45);
      \u0275\u0275elementStart(46, "strong");
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(48, CrisisWeatherScreenComponent_Conditional_48_Template, 9, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(49, CrisisWeatherScreenComponent_Conditional_49_Template, 18, 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(50, CrisisWeatherScreenComponent_Conditional_50_Template, 41, 10, "aside", 32);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("miniature", ctx.miniature())("playing", ctx.playing() && ctx.active())("satellite", ctx.mode() === "satellite");
      \u0275\u0275attribute("aria-label", ctx.miniature() ? null : ctx.weather().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.miniature() ? 1 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("role", ctx.miniature() ? null : "img")("aria-label", ctx.miniature() ? null : ctx.mode() + " weather loop for " + ctx.runtime.config.title + ", exercise frame " + ctx.runtime.time(ctx.frame().minute));
      \u0275\u0275advance(2);
      \u0275\u0275property("id", ctx.uid + "-texture");
      \u0275\u0275advance(4);
      \u0275\u0275property("id", ctx.uid + "-cloud");
      \u0275\u0275advance(4);
      \u0275\u0275property("id", ctx.uid + "-grid");
      \u0275\u0275advance(3);
      \u0275\u0275attribute("transform", ctx.mapTransform());
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.runtime.config.map.coast);
      \u0275\u0275advance();
      \u0275\u0275attribute("href", ctx.weather().satelliteImage)("opacity", ctx.mode() === "radar" ? 0.54 : 0.95);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.runtime.config.map.coast);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.config.map.roads);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("d", ctx.runtime.config.map.river);
      \u0275\u0275advance();
      \u0275\u0275styleProp("transform", ctx.stormTransform());
      \u0275\u0275attribute("opacity", 0.45 + ctx.frame().intensity * 0.45);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mode() === "radar" ? 26 : 27);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.runtime.config.locations);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("fill", "url(#" + ctx.uid + "-grid)");
      \u0275\u0275advance(5);
      \u0275\u0275attribute("tabindex", ctx.miniature() ? null : -1)("data-panel-heading", ctx.miniature() ? null : "");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.weather().title, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mode() === "radar" ? "DOPPLER \xB7 PRECIPITATION" : "SATELLITE \xB7 CLOUD COVER");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.miniature() ? "RADAR LOOP" : "EXERCISE LOOP");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.time(ctx.frame().minute));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.miniature() ? 48 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.miniature() ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.miniature() ? 50 : -1);
    }
  }, dependencies: [CrisisIconComponent], styles: ['\n[_nghost-%COMP%] {\n  color-scheme: dark;\n  position: absolute;\n  inset: 84px 24px 24px;\n  z-index: 5;\n  display: block;\n  color: #eef7ff;\n  font: 13px/1.45 "Segoe UI", sans-serif;\n  animation: _ngcontent-%COMP%_weather-open 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #82d5ff;\n  outline-offset: 3px;\n}\nh2[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.weather-window[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #101e2d;\n  border: 1px solid rgba(83, 115, 140, 0.5333333333);\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.7333333333);\n}\n.weather-window.miniature[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0;\n  overflow: hidden;\n}\n.weather-topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 12px 20px;\n  background: #102f54;\n  border-bottom: 1px solid rgba(104, 149, 185, 0.3333333333);\n  flex: none;\n}\n.network-mark[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  font-weight: 700;\n  font-size: 13px;\n  letter-spacing: 0.2px;\n}\n.network-mark[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  width: 27px;\n  height: 27px;\n  color: #9adaff;\n}\n.network-mark[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8px;\n  display: block;\n  letter-spacing: 1.4px;\n  font-weight: 400;\n  color: #97b9d4;\n  margin-top: 2px;\n}\n.weather-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  background: #071c32;\n  padding: 3px;\n  border-radius: 6px;\n}\n.weather-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 7px 12px;\n  border-radius: 4px;\n  font-size: 11px;\n  color: #a5c2d8;\n}\n.weather-tabs[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #2468a5;\n  color: white;\n}\n.weather-close[_ngcontent-%COMP%] {\n  padding: 7px;\n  border-radius: 5px;\n}\n.weather-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.0784313725);\n}\n.weather-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n}\n.weather-broadcast[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n}\n.map-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  background: #142f39;\n}\n.map-canvas[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  inset: 0;\n}\n.weather-system[_ngcontent-%COMP%] {\n  transform-origin: 500px 270px;\n}\n.playing[_ngcontent-%COMP%]   .weather-system[_ngcontent-%COMP%] {\n  transition: transform 1.35s linear, opacity 1.35s linear;\n}\n.weather-location[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font: 12px "Segoe UI", sans-serif;\n  fill: white;\n  paint-order: stroke;\n  stroke: #061321;\n  stroke-width: 3px;\n  stroke-linejoin: round;\n}\n.weather-location.selected[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: #7de1ff;\n  stroke: #a8ebff;\n  stroke-width: 8px;\n  stroke-opacity: 0.2;\n}\n.weather-location.selected[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.map-brand[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  top: 18px;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  text-shadow: 0 2px 8px #000;\n}\n.weather-bug[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  place-items: center;\n  background: #135b9e;\n  box-shadow: inset 0 0 0 1px rgba(119, 189, 235, 0.3333333333);\n  border-radius: 4px;\n  font-size: 18px;\n  font-weight: 700;\n  font-style: italic;\n}\n.map-brand[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 600;\n}\n.map-brand[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1.5px;\n  color: #b0d4e8;\n}\n.frame-stamp[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  top: 17px;\n  padding: 8px 11px;\n  background: rgba(9, 23, 35, 0.8509803922);\n  border: 1px solid rgba(106, 139, 166, 0.3333333333);\n  border-radius: 5px;\n  letter-spacing: 1px;\n  font-size: 8px;\n  display: grid;\n  grid-template-columns: 6px 1fr;\n  gap: 2px 7px;\n  align-items: center;\n}\n.frame-stamp[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  background: #73d3a5;\n  border-radius: 50%;\n}\n.frame-stamp[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  grid-column: 2;\n  font: 20px "Consolas", monospace;\n  letter-spacing: 0.5px;\n}\n.weather-legend[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 18px;\n  left: 18px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(7, 21, 33, 0.8588235294);\n  padding: 8px 10px;\n  border-radius: 5px;\n  font-size: 8px;\n  color: #ccdce4;\n  letter-spacing: 0.5px;\n}\n.weather-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 135px;\n  height: 7px;\n  background:\n    linear-gradient(\n      90deg,\n      #249448,\n      #4bcc52,\n      #b6db43,\n      #f3d644,\n      #f29438,\n      #e84b44);\n}\n.satellite[_ngcontent-%COMP%]   .weather-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #2b455c,\n      #738899,\n      #c8d3da,\n      #fff);\n}\n.map-tools[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  bottom: 18px;\n}\n.map-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 9px;\n  border: 1px solid rgba(116, 153, 178, 0.3333333333);\n  background: rgba(12, 32, 48, 0.8078431373);\n  border-radius: 5px;\n}\n.weather-playback[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  padding: 11px 17px;\n  background: #0a1c2d;\n  border-top: 1px solid rgba(87, 123, 148, 0.2);\n  flex: none;\n}\n.weather-playback[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: #226da2;\n}\n.weather-playback[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.weather-playback[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 10px "Consolas", monospace;\n  color: #a4c0d4;\n}\n.weather-playback[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  accent-color: #72cfff;\n  height: 4px;\n  cursor: pointer;\n}\n.weather-playback[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1px;\n  font-weight: 500;\n  color: #7ed1f4;\n  width: 38px;\n}\n.weather-lower-third[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  background: #123d68;\n  flex: none;\n}\n.weather-lower-third[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #d9a942;\n  color: #1d2025;\n  font-weight: 800;\n  font-size: 12px;\n  letter-spacing: 1px;\n  writing-mode: vertical-rl;\n  transform: rotate(180deg);\n  padding: 14px 11px;\n}\n.weather-lower-third[_ngcontent-%COMP%]    > span[data-alert=Critical][_ngcontent-%COMP%], \n.weather-lower-third[_ngcontent-%COMP%]    > span[data-alert=Emergency][_ngcontent-%COMP%] {\n  background: #c9443e;\n  color: #fff;\n}\n.weather-lower-third[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 17px 20px;\n}\n.weather-lower-third[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 21px;\n  line-height: 1.2;\n  font-weight: 600;\n}\n.weather-lower-third[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #b9d4e9;\n  margin-top: 7px;\n  line-height: 1.5;\n}\n.forecast-panel[_ngcontent-%COMP%] {\n  width: 280px;\n  flex: none;\n  background: #101e2d;\n  border-left: 1px solid rgba(89, 115, 139, 0.3333333333);\n  overflow: auto;\n  padding: 25px 22px;\n}\n.forecast-label[_ngcontent-%COMP%], \n.forecast-confidence[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #7facca;\n  letter-spacing: 1.3px;\n}\n.forecast-panel[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  font-size: 23px;\n  font-weight: 450;\n  margin: 6px 0 15px;\n}\n.forecast-panel[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.forecast-confidence[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.location-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #b6c9d8;\n}\n.river-reading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 13px;\n  border-top: 1px solid rgba(89, 115, 139, 0.2666666667);\n  border-bottom: 1px solid rgba(89, 115, 139, 0.2666666667);\n  padding: 20px 0;\n  margin: 22px 0;\n}\n.river-reading[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #8fd7ef;\n  margin-top: 5px;\n}\n.river-reading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #91aec3;\n  font-size: 8px;\n  letter-spacing: 0.5px;\n}\n.river-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 39px;\n  font-weight: 400;\n  line-height: 1.5;\n}\n.river-reading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #9ab7c8;\n}\n.forecast-confidence[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 11px;\n}\n.weather-location-select[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 22px;\n  color: #8caec6;\n  font-size: 10px;\n}\n.weather-location-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 7px;\n  border: 1px solid #527086;\n  background: #172d40;\n  border-radius: 4px;\n  padding: 8px;\n  font-size: 12px;\n}\n.location-context[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.location-context[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #9bc9dc;\n}\n.location-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-top: 6px;\n}\n.location-context[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 0;\n  font-size: 10px;\n  color: #89d1f4;\n}\n.location-context[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.weather-reports[_ngcontent-%COMP%] {\n  margin-top: 25px;\n  border: 1px solid #5a829c;\n  border-radius: 5px;\n  padding: 10px 12px;\n  font-size: 11px;\n  width: 100%;\n  background: #19354a;\n}\n.exercise-note[_ngcontent-%COMP%] {\n  font-size: 9px !important;\n  color: #758c9e !important;\n  margin-top: 18px;\n}\n.miniature[_ngcontent-%COMP%] {\n  animation: none !important;\n}\n.miniature[_ngcontent-%COMP%]   .weather-topbar[_ngcontent-%COMP%] {\n  display: none;\n}\n.miniature[_nghost-%COMP%] {\n  inset: 0;\n  z-index: auto;\n  animation: none;\n  pointer-events: none;\n}\n.miniature[_ngcontent-%COMP%]   .weather-window[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0;\n}\n.miniature[_ngcontent-%COMP%]   .weather-content[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.miniature[_ngcontent-%COMP%]   .map-brand[_ngcontent-%COMP%] {\n  left: 5px;\n  top: 5px;\n  gap: 4px;\n}\n.miniature[_ngcontent-%COMP%]   .map-brand[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 5px;\n}\n.miniature[_ngcontent-%COMP%]   .map-brand[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 3px;\n  letter-spacing: 0;\n}\n.miniature[_ngcontent-%COMP%]   .weather-bug[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  font-size: 6px;\n}\n.miniature[_ngcontent-%COMP%]   .frame-stamp[_ngcontent-%COMP%] {\n  right: 4px;\n  top: auto;\n  bottom: 4px;\n  padding: 2px 3px;\n  font-size: 3px;\n  letter-spacing: 0;\n  gap: 1px 2px;\n  grid-template-columns: 3px 1fr;\n}\n.miniature[_ngcontent-%COMP%]   .frame-stamp[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 6px;\n}\n.miniature[_ngcontent-%COMP%]   .frame-stamp[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 2px;\n}\n.miniature[_ngcontent-%COMP%]   .weather-location[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.miniature[_ngcontent-%COMP%]   .weather-window[_ngcontent-%COMP%] {\n  background: #0b2130;\n}\n@keyframes _ngcontent-%COMP%_weather-open {\n  from {\n    opacity: 0;\n    transform: translate(-10vw, 12vh) scale(0.83);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (max-width: 1050px) {\n  [_nghost-%COMP%] {\n    inset: 84px 16px 18px;\n  }\n  .forecast-panel[_ngcontent-%COMP%] {\n    width: 225px;\n    padding: 20px 17px;\n  }\n  .weather-topbar[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n    gap: 12px;\n  }\n  .network-mark[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .network-mark[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .weather-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 7px 10px;\n    font-size: 10px;\n  }\n  .map-brand[_ngcontent-%COMP%] {\n    top: 12px;\n    left: 12px;\n  }\n  .map-brand[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .weather-bug[_ngcontent-%COMP%] {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n  .frame-stamp[_ngcontent-%COMP%] {\n    top: auto;\n    bottom: 60px;\n    font-size: 7px;\n  }\n  .frame-stamp[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .weather-playback[_ngcontent-%COMP%] {\n    gap: 7px;\n    padding: 9px 12px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n@media (max-width: 700px) {\n  [_nghost-%COMP%] {\n    inset: 100px 8px 12px;\n  }\n  .weather-window[_ngcontent-%COMP%] {\n    overflow: auto;\n  }\n  .weather-topbar[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    padding: 10px 11px;\n    flex-wrap: wrap;\n    gap: 9px;\n  }\n  .network-mark[_ngcontent-%COMP%] {\n    font-size: 10px;\n    flex: 1;\n  }\n  .network-mark[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n    width: 21px;\n  }\n  .weather-tabs[_ngcontent-%COMP%] {\n    order: 3;\n    width: 100%;\n    justify-content: center;\n  }\n  .weather-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .weather-content[_ngcontent-%COMP%] {\n    display: block;\n    flex: none;\n    min-height: 0;\n  }\n  .weather-broadcast[_ngcontent-%COMP%] {\n    height: 490px;\n    min-height: 0;\n  }\n  .forecast-panel[_ngcontent-%COMP%] {\n    width: 100%;\n    border-left: 0;\n    border-top: 1px solid rgba(89, 115, 139, 0.3333333333);\n    padding: 22px;\n  }\n  .map-canvas[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 170%;\n    max-width: none;\n    left: -38%;\n  }\n  .map-brand[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .map-brand[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .frame-stamp[_ngcontent-%COMP%] {\n    right: 10px;\n    bottom: 54px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .weather-lower-third[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .weather-playback[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .weather-legend[_ngcontent-%COMP%] {\n    left: 10px;\n    bottom: 14px;\n    gap: 5px;\n    font-size: 7px;\n  }\n  .weather-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    width: 100px;\n  }\n  .map-tools[_ngcontent-%COMP%] {\n    right: 10px;\n    bottom: 14px;\n  }\n  .map-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 6px;\n  }\n  .river-reading[_ngcontent-%COMP%] {\n    margin: 18px 0;\n  }\n  .forecast-panel[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .miniature[_ngcontent-%COMP%]   .weather-broadcast[_ngcontent-%COMP%] {\n    height: 100%;\n  }\n  .miniature[_ngcontent-%COMP%]   .weather-content[_ngcontent-%COMP%] {\n    display: flex;\n    height: 100%;\n  }\n  .miniature[_ngcontent-%COMP%]   .map-canvas[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    left: 0;\n    width: 100%;\n  }\n  .miniature[_ngcontent-%COMP%]   .weather-window[_ngcontent-%COMP%] {\n    overflow: hidden;\n  }\n  .miniature[_ngcontent-%COMP%]   .map-brand[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 4px;\n  }\n  .miniature[_ngcontent-%COMP%]   .frame-stamp[_ngcontent-%COMP%] {\n    bottom: 3px;\n    right: 3px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%] {\n    animation: none;\n  }\n  .playing[_ngcontent-%COMP%]   .weather-system[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=crisis-weather-screen.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisWeatherScreenComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-weather-screen", imports: [CrisisIconComponent], host: { "[class.miniature]": "miniature()" }, template: `<section
  class="weather-window"
  [class.miniature]="miniature()"
  [class.playing]="playing() && active()"
  [class.satellite]="mode() === 'satellite'"
  [attr.aria-label]="miniature() ? null : weather().title"
>
  @if (!miniature()) {
    <header class="weather-topbar">
      <div class="network-mark">
        <app-crisis-icon name="radar" /><span
          >{{ weather().network }}<small>REGIONAL WEATHER DESK</small></span
        >
      </div>
      <div class="weather-tabs" aria-label="Weather layers">
        <button (click)="mode.set('radar')" [attr.aria-pressed]="mode() === 'radar'">
          Doppler radar</button
        ><button (click)="mode.set('satellite')" [attr.aria-pressed]="mode() === 'satellite'">
          Satellite
        </button>
      </div>
      <button class="weather-close" (click)="leave.emit()" aria-label="Return to room">
        <app-crisis-icon name="close" />
      </button>
    </header>
  }
  <div class="weather-content">
    <div class="weather-broadcast">
      <div class="map-canvas">
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          [attr.role]="miniature() ? null : 'img'"
          [attr.aria-label]="
            miniature()
              ? null
              : mode() +
                ' weather loop for ' +
                runtime.config.title +
                ', exercise frame ' +
                runtime.time(frame().minute)
          "
        >
          <defs>
            <filter [id]="uid + '-texture'" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".025"
                numOctaves="3"
                seed="8"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="45"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter [id]="uid + '-cloud'" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".015"
                numOctaves="4"
                seed="4"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="65" />
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <pattern [id]="uid + '-grid'" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M100 0H0V100"
                fill="none"
                stroke="#c7def4"
                stroke-opacity=".07"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="#0b2a43" />
          <g [attr.transform]="mapTransform()">
            <path [attr.d]="runtime.config.map.coast" fill="#263b31" />
            <image
              [attr.href]="weather().satelliteImage"
              width="1000"
              height="600"
              preserveAspectRatio="none"
              [attr.opacity]="mode() === 'radar' ? 0.54 : 0.95"
            />
            <path
              [attr.d]="runtime.config.map.coast"
              fill="none"
              stroke="#8dad99"
              stroke-opacity=".35"
              stroke-width="1"
            />
            @for (road of runtime.config.map.roads; track $index) {
              <path
                [attr.d]="road"
                fill="none"
                stroke="#d2cbaf"
                stroke-width="2"
                stroke-opacity=".35"
              />
            }
            <path
              [attr.d]="runtime.config.map.river"
              fill="none"
              stroke="#8cc4e3"
              stroke-width="3"
              stroke-opacity=".6"
            />
            <g
              class="weather-system"
              [style.transform]="stormTransform()"
              [attr.opacity]="0.45 + frame().intensity * 0.45"
            >
              @if (mode() === 'radar') {
                <g [attr.filter]="'url(#' + uid + '-texture)'">
                  <path
                    d="M225 26Q370 9 466 118T655 245Q747 303 869 445L906 540Q744 552 628 433T424 319Q318 284 214 145Z"
                    fill="#249448"
                  />
                  <path
                    d="M272 69Q382 53 456 151T633 271Q708 318 813 453L807 485Q697 450 603 370T416 274Q330 219 272 69Z"
                    fill="#4bcc52"
                  />
                  <path
                    d="M371 149Q443 143 487 225T629 296L730 419Q629 396 583 356T429 267Z"
                    fill="#b6db43"
                  />
                  <path
                    d="M399 177Q470 179 501 237T615 302L664 352Q571 350 529 301T453 260Z"
                    fill="#f3d644"
                  />
                  <path
                    d="M449 206Q503 227 516 261T579 300Q561 335 512 292T449 206Z"
                    fill="#f29438"
                  />
                  @if (frame().intensity > 0.65) {
                    <path d="M481 243Q502 232 524 272L553 295Q525 312 503 277Z" fill="#e84b44" />
                  }
                </g>
              } @else {
                <g [attr.filter]="'url(#' + uid + '-cloud)'" fill="#f1f2ef">
                  <ellipse
                    cx="435"
                    cy="167"
                    rx="210"
                    ry="70"
                    transform="rotate(34 435 167)"
                    opacity=".75"
                  />
                  <ellipse
                    cx="570"
                    cy="292"
                    rx="190"
                    ry="62"
                    transform="rotate(37 570 292)"
                    opacity=".85"
                  />
                  <ellipse
                    cx="756"
                    cy="404"
                    rx="160"
                    ry="48"
                    transform="rotate(35 756 404)"
                    opacity=".65"
                  />
                  <ellipse cx="435" cy="167" rx="145" ry="30" transform="rotate(34 435 167)" />
                </g>
              }
            </g>
            <g
              class="radar-rings"
              fill="none"
              stroke="#d0e4ed"
              stroke-opacity=".13"
              stroke-width="1"
            >
              <circle cx="578" cy="246" r="110" />
              <circle cx="578" cy="246" r="220" />
              <circle cx="578" cy="246" r="330" />
            </g>
            @for (location of runtime.config.locations; track location.id) {
              <g class="weather-location" [class.selected]="selectedLocation() === location.id">
                <circle [attr.cx]="location.x" [attr.cy]="location.y" r="4" fill="white" />
                <text [attr.x]="location.x + 10" [attr.y]="location.y + 4">
                  {{ location.name }}
                </text>
              </g>
            }
          </g>
          <rect width="1000" height="600" [attr.fill]="'url(#' + uid + '-grid)'" />
        </svg>
        <div class="map-brand">
          <span class="weather-bug">WX</span>
          <div>
            <h2
              [attr.tabindex]="miniature() ? null : -1"
              [attr.data-panel-heading]="miniature() ? null : ''"
            >
              {{ weather().title }}
            </h2>
            <span>{{
              mode() === 'radar' ? 'DOPPLER \xB7 PRECIPITATION' : 'SATELLITE \xB7 CLOUD COVER'
            }}</span>
          </div>
        </div>
        <div class="frame-stamp">
          <i></i>{{ miniature() ? 'RADAR LOOP' : 'EXERCISE LOOP'
          }}<strong>{{ runtime.time(frame().minute) }}</strong>
        </div>
        @if (!miniature()) {
          <div class="map-tools">
            <button
              (click)="zoom.set(!zoom())"
              [attr.aria-label]="zoom() ? 'Show whole weather region' : 'Zoom to selected location'"
              [attr.aria-pressed]="zoom()"
            >
              <app-crisis-icon name="expand" />
            </button>
          </div>
          <div class="weather-legend">
            <span>{{ mode() === 'radar' ? 'LIGHT' : 'THIN' }}</span
            ><i></i><span>{{ mode() === 'radar' ? 'HEAVY' : 'THICK' }}</span>
          </div>
        }
      </div>
      @if (!miniature()) {
        <div class="weather-playback">
          <button
            (click)="playing.set(!playing())"
            [attr.aria-label]="playing() ? 'Pause weather loop' : 'Play weather loop'"
          >
            <app-crisis-icon [name]="playing() ? 'pause' : 'play'" /></button
          ><span>{{ runtime.time(frames()[0].minute) }}</span
          ><input
            type="range"
            min="0"
            [max]="frames().length - 1"
            [value]="frameIndex()"
            (input)="scrub($any($event.target).value)"
            aria-label="Weather loop frame"
            [attr.aria-valuetext]="runtime.time(frame().minute)"
          /><span>{{ runtime.time(frames()[frames().length - 1].minute) }}</span
          ><b>{{ playing() ? 'LOOP' : 'PAUSED' }}</b>
        </div>
        <div class="weather-lower-third">
          <span [attr.data-alert]="runtime.bulletin().alert">{{
            runtime.bulletin().alert.toUpperCase()
          }}</span>
          <div>
            <h3>{{ runtime.bulletin().title }}</h3>
            <p>{{ runtime.bulletin().summary }}</p>
          </div>
        </div>
      }
    </div>
    @if (!miniature()) {
      <aside class="forecast-panel">
        <span class="forecast-label">WATERSHED OUTLOOK</span>
        <h3>{{ runtime.time() }} forecast</h3>
        <p>{{ runtime.bulletin().forecast }}</p>
        <div class="river-reading">
          <app-crisis-icon name="station" />
          <div>
            <span>{{ runtime.config.primaryMetric.label }}</span
            ><strong
              >{{ runtime.bulletin().metricValue }}
              <small>{{ runtime.config.primaryMetric.unit }}</small></strong
            ><span>{{ runtime.config.primaryMetric.caption }}</span>
          </div>
        </div>
        <div class="forecast-confidence">
          <span>FORECAST CONFIDENCE</span>
          <p>{{ runtime.bulletin().uncertainty }}</p>
        </div>
        <label class="weather-location-select"
          >Watch location<select
            [value]="selectedLocation()"
            (change)="selectedLocation.set($any($event.target).value)"
          >
            @for (place of runtime.config.locations; track place.id) {
              <option [value]="place.id" [selected]="selectedLocation() === place.id">
                {{ place.name }}
              </option>
            }
          </select></label
        >
        <div class="location-context">
          <span>{{ location().elevation }} m elevation</span>
          <p>{{ location().detail }}</p>
          <button (click)="locate.emit(selectedLocation())">
            Inspect on situation table <app-crisis-icon name="arrow" />
          </button>
        </div>
        <button class="weather-reports" (click)="reports.emit()">
          <app-crisis-icon name="news" />Open weather reports
        </button>
        <p class="exercise-note">
          Simulated radar and satellite loop. Playback does not advance the exercise.
        </p>
      </aside>
    }
  </div>
</section>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-weather-screen.component.scss */\n:host {\n  color-scheme: dark;\n  position: absolute;\n  inset: 84px 24px 24px;\n  z-index: 5;\n  display: block;\n  color: #eef7ff;\n  font: 13px/1.45 "Segoe UI", sans-serif;\n  animation: weather-open 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\nbutton,\nselect {\n  font: inherit;\n  color: inherit;\n}\nbutton {\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\nbutton:focus-visible,\nselect:focus-visible,\ninput:focus-visible {\n  outline: 2px solid #82d5ff;\n  outline-offset: 3px;\n}\nh2:focus {\n  outline: none;\n}\n.weather-window {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #101e2d;\n  border: 1px solid rgba(83, 115, 140, 0.5333333333);\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.7333333333);\n}\n.weather-window.miniature {\n  border: 0;\n  border-radius: 0;\n  overflow: hidden;\n}\n.weather-topbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 12px 20px;\n  background: #102f54;\n  border-bottom: 1px solid rgba(104, 149, 185, 0.3333333333);\n  flex: none;\n}\n.network-mark {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  font-weight: 700;\n  font-size: 13px;\n  letter-spacing: 0.2px;\n}\n.network-mark > app-crisis-icon {\n  width: 27px;\n  height: 27px;\n  color: #9adaff;\n}\n.network-mark small {\n  font-size: 8px;\n  display: block;\n  letter-spacing: 1.4px;\n  font-weight: 400;\n  color: #97b9d4;\n  margin-top: 2px;\n}\n.weather-tabs {\n  display: flex;\n  gap: 4px;\n  background: #071c32;\n  padding: 3px;\n  border-radius: 6px;\n}\n.weather-tabs button {\n  padding: 7px 12px;\n  border-radius: 4px;\n  font-size: 11px;\n  color: #a5c2d8;\n}\n.weather-tabs button[aria-pressed=true] {\n  background: #2468a5;\n  color: white;\n}\n.weather-close {\n  padding: 7px;\n  border-radius: 5px;\n}\n.weather-close:hover {\n  background: rgba(255, 255, 255, 0.0784313725);\n}\n.weather-content {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n}\n.weather-broadcast {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n}\n.map-canvas {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  background: #142f39;\n}\n.map-canvas svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  inset: 0;\n}\n.weather-system {\n  transform-origin: 500px 270px;\n}\n.playing .weather-system {\n  transition: transform 1.35s linear, opacity 1.35s linear;\n}\n.weather-location text {\n  font: 12px "Segoe UI", sans-serif;\n  fill: white;\n  paint-order: stroke;\n  stroke: #061321;\n  stroke-width: 3px;\n  stroke-linejoin: round;\n}\n.weather-location.selected circle {\n  fill: #7de1ff;\n  stroke: #a8ebff;\n  stroke-width: 8px;\n  stroke-opacity: 0.2;\n}\n.weather-location.selected text {\n  font-weight: 700;\n}\n.map-brand {\n  position: absolute;\n  left: 18px;\n  top: 18px;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  text-shadow: 0 2px 8px #000;\n}\n.weather-bug {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  place-items: center;\n  background: #135b9e;\n  box-shadow: inset 0 0 0 1px rgba(119, 189, 235, 0.3333333333);\n  border-radius: 4px;\n  font-size: 18px;\n  font-weight: 700;\n  font-style: italic;\n}\n.map-brand h2 {\n  font-size: 19px;\n  font-weight: 600;\n}\n.map-brand > div > span {\n  font-size: 8px;\n  letter-spacing: 1.5px;\n  color: #b0d4e8;\n}\n.frame-stamp {\n  position: absolute;\n  right: 16px;\n  top: 17px;\n  padding: 8px 11px;\n  background: rgba(9, 23, 35, 0.8509803922);\n  border: 1px solid rgba(106, 139, 166, 0.3333333333);\n  border-radius: 5px;\n  letter-spacing: 1px;\n  font-size: 8px;\n  display: grid;\n  grid-template-columns: 6px 1fr;\n  gap: 2px 7px;\n  align-items: center;\n}\n.frame-stamp i {\n  width: 5px;\n  height: 5px;\n  background: #73d3a5;\n  border-radius: 50%;\n}\n.frame-stamp strong {\n  grid-column: 2;\n  font: 20px "Consolas", monospace;\n  letter-spacing: 0.5px;\n}\n.weather-legend {\n  position: absolute;\n  bottom: 18px;\n  left: 18px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(7, 21, 33, 0.8588235294);\n  padding: 8px 10px;\n  border-radius: 5px;\n  font-size: 8px;\n  color: #ccdce4;\n  letter-spacing: 0.5px;\n}\n.weather-legend i {\n  width: 135px;\n  height: 7px;\n  background:\n    linear-gradient(\n      90deg,\n      #249448,\n      #4bcc52,\n      #b6db43,\n      #f3d644,\n      #f29438,\n      #e84b44);\n}\n.satellite .weather-legend i {\n  background:\n    linear-gradient(\n      90deg,\n      #2b455c,\n      #738899,\n      #c8d3da,\n      #fff);\n}\n.map-tools {\n  position: absolute;\n  right: 16px;\n  bottom: 18px;\n}\n.map-tools button {\n  padding: 9px;\n  border: 1px solid rgba(116, 153, 178, 0.3333333333);\n  background: rgba(12, 32, 48, 0.8078431373);\n  border-radius: 5px;\n}\n.weather-playback {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  padding: 11px 17px;\n  background: #0a1c2d;\n  border-top: 1px solid rgba(87, 123, 148, 0.2);\n  flex: none;\n}\n.weather-playback button {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: #226da2;\n}\n.weather-playback button app-crisis-icon {\n  width: 17px;\n  height: 17px;\n}\n.weather-playback span {\n  font: 10px "Consolas", monospace;\n  color: #a4c0d4;\n}\n.weather-playback input {\n  flex: 1;\n  min-width: 0;\n  accent-color: #72cfff;\n  height: 4px;\n  cursor: pointer;\n}\n.weather-playback b {\n  font-size: 8px;\n  letter-spacing: 1px;\n  font-weight: 500;\n  color: #7ed1f4;\n  width: 38px;\n}\n.weather-lower-third {\n  display: flex;\n  align-items: stretch;\n  background: #123d68;\n  flex: none;\n}\n.weather-lower-third > span {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #d9a942;\n  color: #1d2025;\n  font-weight: 800;\n  font-size: 12px;\n  letter-spacing: 1px;\n  writing-mode: vertical-rl;\n  transform: rotate(180deg);\n  padding: 14px 11px;\n}\n.weather-lower-third > span[data-alert=Critical],\n.weather-lower-third > span[data-alert=Emergency] {\n  background: #c9443e;\n  color: #fff;\n}\n.weather-lower-third > div {\n  padding: 17px 20px;\n}\n.weather-lower-third h3 {\n  font-size: 21px;\n  line-height: 1.2;\n  font-weight: 600;\n}\n.weather-lower-third p {\n  font-size: 11px;\n  color: #b9d4e9;\n  margin-top: 7px;\n  line-height: 1.5;\n}\n.forecast-panel {\n  width: 280px;\n  flex: none;\n  background: #101e2d;\n  border-left: 1px solid rgba(89, 115, 139, 0.3333333333);\n  overflow: auto;\n  padding: 25px 22px;\n}\n.forecast-label,\n.forecast-confidence > span {\n  font-size: 8px;\n  color: #7facca;\n  letter-spacing: 1.3px;\n}\n.forecast-panel > h3 {\n  font-size: 23px;\n  font-weight: 450;\n  margin: 6px 0 15px;\n}\n.forecast-panel > p,\n.forecast-confidence p,\n.location-context p {\n  font-size: 12px;\n  line-height: 1.7;\n  color: #b6c9d8;\n}\n.river-reading {\n  display: flex;\n  gap: 13px;\n  border-top: 1px solid rgba(89, 115, 139, 0.2666666667);\n  border-bottom: 1px solid rgba(89, 115, 139, 0.2666666667);\n  padding: 20px 0;\n  margin: 22px 0;\n}\n.river-reading > app-crisis-icon {\n  color: #8fd7ef;\n  margin-top: 5px;\n}\n.river-reading span {\n  display: block;\n  color: #91aec3;\n  font-size: 8px;\n  letter-spacing: 0.5px;\n}\n.river-reading strong {\n  display: block;\n  font-size: 39px;\n  font-weight: 400;\n  line-height: 1.5;\n}\n.river-reading small {\n  font-size: 15px;\n  color: #9ab7c8;\n}\n.forecast-confidence p {\n  margin-top: 8px;\n  font-size: 11px;\n}\n.weather-location-select {\n  display: block;\n  margin-top: 22px;\n  color: #8caec6;\n  font-size: 10px;\n}\n.weather-location-select select {\n  display: block;\n  width: 100%;\n  margin-top: 7px;\n  border: 1px solid #527086;\n  background: #172d40;\n  border-radius: 4px;\n  padding: 8px;\n  font-size: 12px;\n}\n.location-context {\n  margin-top: 12px;\n}\n.location-context > span {\n  font-size: 10px;\n  color: #9bc9dc;\n}\n.location-context p {\n  font-size: 11px;\n  margin-top: 6px;\n}\n.location-context button {\n  margin-top: 10px;\n  padding: 0;\n  font-size: 10px;\n  color: #89d1f4;\n}\n.location-context app-crisis-icon {\n  width: 14px;\n  height: 14px;\n}\n.weather-reports {\n  margin-top: 25px;\n  border: 1px solid #5a829c;\n  border-radius: 5px;\n  padding: 10px 12px;\n  font-size: 11px;\n  width: 100%;\n  background: #19354a;\n}\n.exercise-note {\n  font-size: 9px !important;\n  color: #758c9e !important;\n  margin-top: 18px;\n}\n.miniature {\n  animation: none !important;\n}\n.miniature .weather-topbar {\n  display: none;\n}\n:host.miniature {\n  inset: 0;\n  z-index: auto;\n  animation: none;\n  pointer-events: none;\n}\n.miniature .weather-window {\n  border: 0;\n  border-radius: 0;\n}\n.miniature .weather-content {\n  height: 100%;\n}\n.miniature .map-brand {\n  left: 5px;\n  top: 5px;\n  gap: 4px;\n}\n.miniature .map-brand h2 {\n  font-size: 5px;\n}\n.miniature .map-brand > div > span {\n  font-size: 3px;\n  letter-spacing: 0;\n}\n.miniature .weather-bug {\n  width: 13px;\n  height: 13px;\n  font-size: 6px;\n}\n.miniature .frame-stamp {\n  right: 4px;\n  top: auto;\n  bottom: 4px;\n  padding: 2px 3px;\n  font-size: 3px;\n  letter-spacing: 0;\n  gap: 1px 2px;\n  grid-template-columns: 3px 1fr;\n}\n.miniature .frame-stamp strong {\n  font-size: 6px;\n}\n.miniature .frame-stamp i {\n  width: 2px;\n  height: 2px;\n}\n.miniature .weather-location text {\n  font-size: 15px;\n}\n.miniature .weather-window {\n  background: #0b2130;\n}\n@keyframes weather-open {\n  from {\n    opacity: 0;\n    transform: translate(-10vw, 12vh) scale(0.83);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (max-width: 1050px) {\n  :host {\n    inset: 84px 16px 18px;\n  }\n  .forecast-panel {\n    width: 225px;\n    padding: 20px 17px;\n  }\n  .weather-topbar {\n    padding: 12px 15px;\n    gap: 12px;\n  }\n  .network-mark {\n    font-size: 11px;\n  }\n  .network-mark small {\n    font-size: 7px;\n  }\n  .weather-tabs button {\n    padding: 7px 10px;\n    font-size: 10px;\n  }\n  .map-brand {\n    top: 12px;\n    left: 12px;\n  }\n  .map-brand h2 {\n    font-size: 15px;\n  }\n  .weather-bug {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n  .frame-stamp {\n    top: auto;\n    bottom: 60px;\n    font-size: 7px;\n  }\n  .frame-stamp strong {\n    font-size: 17px;\n  }\n  .weather-lower-third h3 {\n    font-size: 17px;\n  }\n  .weather-lower-third > div {\n    padding: 14px;\n  }\n  .weather-playback {\n    gap: 7px;\n    padding: 9px 12px;\n  }\n  .weather-lower-third > span {\n    font-size: 10px;\n  }\n}\n@media (max-width: 700px) {\n  :host {\n    inset: 100px 8px 12px;\n  }\n  .weather-window {\n    overflow: auto;\n  }\n  .weather-topbar {\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    padding: 10px 11px;\n    flex-wrap: wrap;\n    gap: 9px;\n  }\n  .network-mark {\n    font-size: 10px;\n    flex: 1;\n  }\n  .network-mark > app-crisis-icon {\n    width: 21px;\n  }\n  .weather-tabs {\n    order: 3;\n    width: 100%;\n    justify-content: center;\n  }\n  .weather-tabs button {\n    flex: 1;\n  }\n  .weather-content {\n    display: block;\n    flex: none;\n    min-height: 0;\n  }\n  .weather-broadcast {\n    height: 490px;\n    min-height: 0;\n  }\n  .forecast-panel {\n    width: 100%;\n    border-left: 0;\n    border-top: 1px solid rgba(89, 115, 139, 0.3333333333);\n    padding: 22px;\n  }\n  .map-canvas svg {\n    width: 170%;\n    max-width: none;\n    left: -38%;\n  }\n  .map-brand h2 {\n    font-size: 14px;\n  }\n  .map-brand > div > span {\n    font-size: 7px;\n  }\n  .frame-stamp {\n    right: 10px;\n    bottom: 54px;\n  }\n  .weather-lower-third h3 {\n    font-size: 17px;\n  }\n  .weather-lower-third p {\n    font-size: 10px;\n  }\n  .weather-lower-third > div {\n    padding: 14px;\n  }\n  .weather-playback {\n    padding: 10px;\n  }\n  .weather-legend {\n    left: 10px;\n    bottom: 14px;\n    gap: 5px;\n    font-size: 7px;\n  }\n  .weather-legend i {\n    width: 100px;\n  }\n  .map-tools {\n    right: 10px;\n    bottom: 14px;\n  }\n  .map-tools button {\n    padding: 6px;\n  }\n  .river-reading {\n    margin: 18px 0;\n  }\n  .forecast-panel > h3 {\n    font-size: 24px;\n  }\n  .miniature .weather-broadcast {\n    height: 100%;\n  }\n  .miniature .weather-content {\n    display: flex;\n    height: 100%;\n  }\n  .miniature .map-canvas svg {\n    left: 0;\n    width: 100%;\n  }\n  .miniature .weather-window {\n    overflow: hidden;\n  }\n  .miniature .map-brand h2 {\n    font-size: 4px;\n  }\n  .miniature .frame-stamp {\n    bottom: 3px;\n    right: 3px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  :host {\n    animation: none;\n  }\n  .playing .weather-system {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=crisis-weather-screen.component.css.map */\n'] }]
  }], () => [], { weather: [{ type: Input, args: [{ isSignal: true, alias: "weather", required: true }] }], miniature: [{ type: Input, args: [{ isSignal: true, alias: "miniature", required: false }] }], active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], leave: [{ type: Output, args: ["leave"] }], reports: [{ type: Output, args: ["reports"] }], locate: [{ type: Output, args: ["locate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisWeatherScreenComponent, { className: "CrisisWeatherScreenComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-weather-screen.component.ts", lineNumber: 23 });
})();

// src/app/templates/crisis-operations/ui/crisis-workstations.component.ts
var _forTrack08 = ($index, $item) => $item.id;
function CrisisWorkstationsComponent_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 3);
    \u0275\u0275element(1, "image", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("viewBox", ctx.viewBox);
    \u0275\u0275advance();
    \u0275\u0275attribute("href", ctx_r2.runtime.config.roomImage);
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-crisis-weather-screen", 13);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("weather", ctx)("miniature", true)("active", ctx_r2.view() === "room");
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_12_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 20);
  }
  if (rf & 2) {
    const person_r4 = ctx.$implicit;
    \u0275\u0275property("src", person_r4.portrait, \u0275\u0275sanitizeUrl);
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14)(1, "span", 19);
    \u0275\u0275repeaterCreate(2, CrisisWorkstationsComponent_For_2_Conditional_12_For_3_Template, 1, 1, "img", 20, _forTrack08);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "YOU");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 21);
    \u0275\u0275text(7);
    \u0275\u0275element(8, "i");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const call_r5 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(call_r5.participants);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(call_r5.title);
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_13_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 25);
    \u0275\u0275element(7, "path", 26)(8, "polyline");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "span", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, ctx_r2.runtime.bulletin().metricValue, "1.1-1"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("points", ctx_r2.trend());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.primaryMetric.label);
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_13_Case_6_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const crew_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("assigned", crew_r6 > ctx_r2.runtime.crews());
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_13_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "CREWS FREE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275repeaterCreate(6, CrisisWorkstationsComponent_For_2_Conditional_13_Case_6_For_7_Template, 1, 2, "i", 29, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 27);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.crews().toString().padStart(2, "0"));
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.crewSlots);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.orders().length, " RESPONSES DISPATCHED");
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_13_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "REPORTS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275element(6, "i")(7, "i")(8, "i")(9, "i")(10, "i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 27);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r2.reports.toString().padStart(2, "0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", station_r2.unread, " UNREAD SIGNALS");
  }
}
function CrisisWorkstationsComponent_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275element(1, "i");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "LINKED");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, CrisisWorkstationsComponent_For_2_Conditional_13_Case_5_Template, 11, 7)(6, CrisisWorkstationsComponent_For_2_Conditional_13_Case_6_Template, 10, 2)(7, CrisisWorkstationsComponent_For_2_Conditional_13_Case_7_Template, 13, 2);
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const station_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", station_r2.side === "left" ? "01" : "02", " / ", station_r2.instrument);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_12_0 = station_r2.instrument) === "telemetry" ? 5 : tmp_12_0 === "resources" ? 6 : tmp_12_0 === "reports" ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.time());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", station_r2.unread, " NEW");
  }
}
function CrisisWorkstationsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function CrisisWorkstationsComponent_For_2_Template_button_click_0_listener() {
      const station_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.open.emit(station_r2.id));
    });
    \u0275\u0275conditionalCreate(1, CrisisWorkstationsComponent_For_2_Conditional_1_Template, 2, 2, ":svg:svg", 3);
    \u0275\u0275element(2, "span", 4);
    \u0275\u0275elementStart(3, "span", 5);
    \u0275\u0275element(4, "span", 6);
    \u0275\u0275elementStart(5, "span", 7);
    \u0275\u0275element(6, "span", 8)(7, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "span", 10);
    \u0275\u0275elementStart(9, "span", 11)(10, "span", 12);
    \u0275\u0275conditionalCreate(11, CrisisWorkstationsComponent_For_2_Conditional_11_Template, 1, 3, "app-crisis-weather-screen", 13)(12, CrisisWorkstationsComponent_For_2_Conditional_12_Template, 9, 1, "span", 14)(13, CrisisWorkstationsComponent_For_2_Conditional_13_Template, 12, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "span", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 16)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementStart(18, "small");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "b");
    \u0275\u0275text(21, "\u2197");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "span", 17);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_25_0;
    let tmp_27_0;
    const station_r2 = ctx.$implicit;
    \u0275\u0275styleProp("--%NS%room-x", station_r2.surface?.x)("--%NS%room-y", station_r2.surface?.y)("--%NS%room-width", station_r2.surface?.width)("--%NS%room-height", station_r2.surface?.height)("--%NS%room-aspect", station_r2.surface?.aspect)("--%NS%screen-x", station_r2.surface?.screenX + "%")("--%NS%screen-y", station_r2.surface?.screenY + "%")("--%NS%screen-width", station_r2.surface?.screenWidth + "%")("--%NS%screen-height", station_r2.surface?.screenHeight + "%")("--%NS%screen-clip", station_r2.surface?.clip);
    \u0275\u0275classProp("integrated", station_r2.surface);
    \u0275\u0275attribute("data-side", station_r2.side)("data-workstation-id", station_r2.id)("aria-label", "Open " + station_r2.name + " workstation")("aria-describedby", "workstation-info-" + station_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_25_0 = station_r2.surface) ? 1 : -1, tmp_25_0);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("special-display", station_r2.conference || station_r2.weather);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_27_0 = station_r2.weather) ? 11 : (tmp_27_0 = station_r2.conference) ? 12 : 13, tmp_27_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(station_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r2.weather ? "Weather channel" : station_r2.conference ? "Field conference" : "Open workstation");
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "workstation-info-" + station_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", station_r2.description, " ", station_r2.reports, " reports available, ", station_r2.unread, " unread.");
  }
}
var CrisisWorkstationsComponent = class _CrisisWorkstationsComponent {
  runtime = inject(CrisisRuntimeService);
  view = input(
    "room",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  open = output();
  crewSlots = Array.from({ length: this.runtime.config.crews }, (_, index) => index + 1);
  stations = computed(
    () => (this.runtime.config.workstations ?? []).map((station) => {
      const reports = workstationReports(this.runtime.config, this.runtime.state(), station);
      return __spreadProps(__spreadValues({}, station), {
        surface: station.roomSurface ? this.surfaceLayout(station.roomSurface) : null,
        reports: reports.length,
        unread: reports.filter((report) => !this.runtime.state().readEvidenceIds.includes(report.id)).length
      });
    }),
    ...ngDevMode ? [{ debugName: "stations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  surfaceLayout(surface) {
    const [x, y, width, height] = surface.bounds;
    const screenX = Math.min(...surface.screen.map((point) => point[0]));
    const screenY = Math.min(...surface.screen.map((point) => point[1]));
    const screenWidth = Math.max(...surface.screen.map((point) => point[0])) - screenX;
    const screenHeight = Math.max(...surface.screen.map((point) => point[1])) - screenY;
    return {
      x,
      y,
      width,
      height,
      viewBox: surface.bounds.join(" "),
      aspect: width * 1.7769 / height,
      screenX: (screenX - x) / width * 100,
      screenY: (screenY - y) / height * 100,
      screenWidth: screenWidth / width * 100,
      screenHeight: screenHeight / height * 100,
      clip: `polygon(${surface.screen.map((point) => `${(point[0] - screenX) / screenWidth * 100}% ${(point[1] - screenY) / screenHeight * 100}%`).join(",")})`
    };
  }
  trend = computed(
    () => {
      const values = [
        ...this.runtime.config.primaryMetric.initialTrend,
        ...this.runtime.config.bulletins.slice(0, this.runtime.state().stage + 1).map((bulletin) => bulletin.metricValue)
      ];
      const min = Math.min(...values) * 0.9, span = Math.max(...values) - min || 1;
      return values.map((value, index) => `${index * 160 / (values.length - 1)},${44 - (value - min) / span * 36}`).join(" ");
    },
    ...ngDevMode ? [{ debugName: "trend" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CrisisWorkstationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisWorkstationsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisWorkstationsComponent, selectors: [["app-crisis-workstations"]], inputs: { view: [1, "view"] }, outputs: { open: "open" }, decls: 3, vars: 4, consts: [[1, "workstation-space"], [1, "workstation", 3, "integrated", "--%NS%room-x", "--%NS%room-y", "--%NS%room-width", "--%NS%room-height", "--%NS%room-aspect", "--%NS%screen-x", "--%NS%screen-y", "--%NS%screen-width", "--%NS%screen-height", "--%NS%screen-clip"], [1, "workstation", 3, "click"], ["preserveAspectRatio", "none", "aria-hidden", "true", 1, "room-fragment"], ["aria-hidden", "true", 1, "desk-shadow"], ["aria-hidden", "true", 1, "desk-hardware"], [1, "desk-pedestal"], [1, "desk-top"], [1, "keyboard"], [1, "control-pad"], [1, "monitor-stand"], [1, "monitor-bezel"], [1, "station-display"], [3, "weather", "miniature", "active"], [1, "mini-call"], [1, "bezel-status"], [1, "station-name"], [1, "station-info", 3, "id"], ["x", "0", "y", "0", "width", "100", "height", "100", "preserveAspectRatio", "none"], [1, "mini-call-people"], ["alt", "", 3, "src"], [1, "mini-call-title"], [1, "display-header"], [1, "display-footer"], [1, "display-reading"], ["viewBox", "0 0 160 50"], ["d", "M0 15H160M0 32H160M0 49H160"], [1, "display-caption"], [1, "crew-lights"], [3, "assigned"], [1, "signal-bars"]], template: function CrisisWorkstationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, CrisisWorkstationsComponent_For_2_Template, 24, 36, "button", 1, _forTrack08);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("away", ctx.view() !== "room");
      \u0275\u0275attribute("inert", ctx.view() === "room" ? null : "")("aria-hidden", ctx.view() === "room" ? null : true);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.stations());
    }
  }, dependencies: [CrisisWeatherScreenComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 3;\n  pointer-events: none;\n}\n.station-display.special-display[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0;\n  overflow: hidden;\n}\n.mini-call[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: #25262a;\n  display: flex;\n  flex-direction: column;\n  padding: 3px;\n  gap: 3px;\n}\n.mini-call-people[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr 1fr;\n  gap: 2px;\n  flex: 1;\n  min-height: 0;\n}\n.mini-call-people[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  min-height: 0;\n  border-radius: 1px;\n}\n.mini-call-people[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  background: #3f4653;\n  font-size: 6px;\n  color: #ced7e3;\n}\n.mini-call-title[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 4px;\n  color: #cdd7e3;\n  padding: 1px 2px;\n}\n.mini-call-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 4px;\n  background: #e5484f;\n  border-radius: 2px;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.workstation-space[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 1;\n  transition: opacity 0.35s, filter 0.55s;\n}\n.workstation-space.away[_ngcontent-%COMP%] {\n  opacity: 0;\n  filter: blur(4px);\n  pointer-events: none;\n}\n.workstation[_ngcontent-%COMP%] {\n  --%NS%desk-light: #97dfd6;\n  position: absolute;\n  top: 50%;\n  width: clamp(200px, 21vw, 310px);\n  transform: translateY(-50%);\n  aspect-ratio: 1.18;\n  padding: 0;\n  color: #d3e8e6;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  pointer-events: auto;\n  text-align: left;\n  font-family: "Segoe UI", sans-serif;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.workstation[data-side=left][_ngcontent-%COMP%] {\n  left: 3%;\n}\n.workstation[data-side=right][_ngcontent-%COMP%] {\n  right: 3%;\n  --%NS%desk-light: #e7c494;\n}\n.away[_ngcontent-%COMP%]   .workstation[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.desk-hardware[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 18px;\n  transform: perspective(700px) rotateY(12deg) rotateX(2deg);\n  transform-origin: center bottom;\n  transition: filter 0.25s, transform 0.3s;\n}\n[data-side=right][_ngcontent-%COMP%]   .desk-hardware[_ngcontent-%COMP%] {\n  transform: perspective(700px) rotateY(-12deg) rotateX(2deg);\n}\n.desk-shadow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 78% -10% -7%;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(0, 0, 0, 0.8),\n      transparent 68%);\n  filter: blur(6px);\n}\n.desk-pedestal[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 77%;\n  left: 15%;\n  width: 70%;\n  height: 24%;\n  background:\n    linear-gradient(\n      90deg,\n      #101a22,\n      #29343c 10%,\n      #0b1118 35%,\n      #17232d 90%,\n      #050a10);\n  clip-path: polygon(0 0, 100% 0, 86% 100%, 14% 100%);\n  border-top: 1px solid #5b7684;\n  box-shadow: inset 0 8px 12px rgba(0, 0, 0, 0.8);\n}\n.desk-pedestal[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  left: 28%;\n  right: 28%;\n  top: 42%;\n  height: 2px;\n  background: var(--%NS%desk-light);\n  opacity: 0.45;\n  box-shadow: 0 0 7px var(--%NS%desk-light);\n}\n.desk-top[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 65%;\n  left: 0;\n  width: 100%;\n  height: 20%;\n  background:\n    linear-gradient(\n      160deg,\n      #3e4e58,\n      #111e29 47%,\n      #253946);\n  clip-path: polygon(12% 0, 87% 0, 100% 83%, 100% 96%, 0 96%, 0 83%);\n  border-bottom: 3px solid #070e16;\n  box-shadow: inset 0 -5px rgba(88, 120, 131, 0.4666666667);\n}\n.keyboard[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 46%;\n  height: 36%;\n  left: 22%;\n  top: 42%;\n  transform: skewX(-10deg);\n  border: 1px solid rgba(104, 139, 145, 0.3333333333);\n  background:\n    repeating-linear-gradient(\n      0deg,\n      #172d38 0 2px,\n      transparent 2px 4px),\n    repeating-linear-gradient(\n      90deg,\n      rgba(116, 157, 160, 0.2666666667) 0 1px,\n      #0a1922 1px 6px);\n}\n.control-pad[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 73%;\n  top: 41%;\n  width: 9%;\n  height: 30%;\n  border: 1px solid rgba(96, 132, 133, 0.3333333333);\n  background: rgba(116, 186, 173, 0.1450980392);\n  border-radius: 2px;\n}\n.monitor-stand[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 43%;\n  top: 51%;\n  width: 15%;\n  height: 23%;\n  background:\n    linear-gradient(\n      90deg,\n      #111923,\n      #44545b 48%,\n      #0b1720 80%);\n  clip-path: polygon(27% 0, 75% 0, 70% 87%, 100% 100%, 0 100%, 30% 87%);\n}\n.monitor-bezel[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 6%;\n  top: 0;\n  width: 88%;\n  height: 63%;\n  padding: 5px 5px 8px;\n  border: 1px solid rgba(101, 129, 140, 0.5333333333);\n  border-radius: 4px;\n  background:\n    linear-gradient(\n      145deg,\n      #3b505d,\n      #0e1b25 35%,\n      #273d46);\n  box-shadow:\n    0 5px 3px rgba(0, 0, 0, 0.6666666667),\n    0 12px 20px rgba(0, 0, 0, 0.4),\n    inset 0 1px rgba(179, 213, 221, 0.2666666667);\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.station-display[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n  padding: 7px 9px 5px;\n  background:\n    radial-gradient(\n      ellipse at 65% 20%,\n      rgba(29, 73, 80, 0.2),\n      transparent),\n    #081a24;\n  border: 1px solid rgba(0, 0, 0, 0.7333333333);\n  color: var(--%NS%desk-light);\n}\n.station-display[_ngcontent-%COMP%]:after {\n  content: "";\n  pointer-events: none;\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(transparent 0 3px, rgba(161, 217, 220, 0.0235294118) 3px 4px);\n}\n.display-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font: 5px Consolas, monospace;\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  opacity: 0.75;\n}\n.display-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 3px;\n  background: var(--%NS%desk-light);\n  border-radius: 50%;\n  box-shadow: 0 0 5px var(--%NS%desk-light);\n}\n.display-header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-weight: 400;\n  font-size: 4px;\n  opacity: 0.6;\n}\n.display-reading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  align-items: baseline;\n  margin-top: 7px;\n  min-height: 0;\n  flex: 1;\n}\n.display-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: clamp(22px, 2.1vw, 34px);\n  font-weight: 300;\n  line-height: 1;\n}\n.display-reading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 5px Consolas, monospace;\n  white-space: nowrap;\n}\n.display-reading[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 46%;\n  height: 30px;\n  margin-left: auto;\n  align-self: center;\n  overflow: visible;\n}\n.display-reading[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  stroke: rgba(102, 140, 146, 0.1333333333);\n  stroke-width: 1;\n  fill: none;\n}\n.display-reading[_ngcontent-%COMP%]   polyline[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: var(--%NS%desk-light);\n  stroke-width: 2;\n}\n.display-caption[_ngcontent-%COMP%] {\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.4px;\n  opacity: 0.65;\n  margin-top: 4px;\n}\n.display-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid rgba(95, 139, 145, 0.1607843137);\n  padding-top: 4px;\n  margin-top: 5px;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n}\n.crew-lights[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 3px;\n  margin-left: auto;\n  align-self: center;\n  width: 25%;\n}\n.crew-lights[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 8px;\n  background: var(--%NS%desk-light);\n  box-shadow: 0 0 3px rgba(231, 196, 148, 0.2);\n  opacity: 0.7;\n}\n.crew-lights[_ngcontent-%COMP%]   i.assigned[_ngcontent-%COMP%] {\n  background: #374449;\n  box-shadow: none;\n  opacity: 0.5;\n}\n.signal-bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  height: 28px;\n  gap: 4px;\n  margin-left: auto;\n}\n.signal-bars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 40%;\n  width: 5px;\n  background: var(--%NS%desk-light);\n  opacity: 0.5;\n}\n.signal-bars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(2n) {\n  height: 70%;\n}\n.signal-bars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  height: 100%;\n}\n.bezel-status[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3px;\n  right: 10px;\n  width: 8px;\n  height: 1px;\n  background: var(--%NS%desk-light);\n  box-shadow: 0 0 7px var(--%NS%desk-light);\n}\n.station-name[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 6%;\n  right: 6%;\n  top: -25px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  font-size: 12px;\n  text-shadow: 0 2px 8px #000;\n  color: #b6d0d6;\n  transition: color 0.2s;\n}\n.station-name[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--%NS%desk-light);\n}\n.station-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n  font-size: 9px;\n  font-weight: 400;\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n  color: #91a8b3;\n}\n.workstation[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .monitor-bezel[_ngcontent-%COMP%] {\n  border-color: var(--%NS%desk-light);\n  box-shadow:\n    0 0 0 1px var(--%NS%desk-light),\n    0 0 20px color-mix(in srgb, var(--%NS%desk-light) 55%, transparent),\n    0 12px 20px rgba(0, 0, 0, 0.4666666667);\n}\n.workstation[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .station-name[_ngcontent-%COMP%] {\n  color: #e2fff1;\n}\n.workstation[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .desk-hardware[_ngcontent-%COMP%] {\n  filter: brightness(1.22);\n}\n.station-info[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n@media (max-width: 1050px) {\n  .workstation[_ngcontent-%COMP%] {\n    width: 210px;\n  }\n  .workstation[data-side=left][_ngcontent-%COMP%] {\n    left: 2%;\n  }\n  .workstation[data-side=right][_ngcontent-%COMP%] {\n    right: 2%;\n  }\n}\n@media (max-width: 700px) {\n  .workstation[_ngcontent-%COMP%] {\n    width: 152px;\n  }\n  .workstation[data-side=left][_ngcontent-%COMP%] {\n    left: 10px;\n  }\n  .workstation[data-side=right][_ngcontent-%COMP%] {\n    right: 10px;\n  }\n  .monitor-bezel[_ngcontent-%COMP%] {\n    padding: 3px 3px 6px;\n  }\n  .station-display[_ngcontent-%COMP%] {\n    padding: 4px 5px;\n  }\n  .display-reading[_ngcontent-%COMP%] {\n    margin-top: 4px;\n    gap: 3px;\n  }\n  .display-reading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .display-header[_ngcontent-%COMP%] {\n    font-size: 4px;\n  }\n  .display-header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n   .display-caption[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .display-reading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 4px;\n  }\n  .display-reading[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    height: 24px;\n  }\n  .display-footer[_ngcontent-%COMP%] {\n    font-size: 4px;\n    padding-top: 3px;\n    margin-top: 3px;\n  }\n  .station-name[_ngcontent-%COMP%] {\n    left: 0;\n    right: 0;\n    font-size: 10px;\n    gap: 3px;\n  }\n  .crew-lights[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n  .crew-lights[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    height: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-workstations.component.css.map */', '\n.workstation.integrated[_ngcontent-%COMP%] {\n  --%NS%scene-width: max(100vw, 177.69vh);\n  --%NS%scene-height: max(56.28vw, 100vh);\n  left: calc(50% + var(--%NS%scene-width) * (var(--%NS%room-x) - 50) / 100);\n  right: auto;\n  top: calc(50% + var(--%NS%scene-height) * (var(--%NS%room-y) - 50) / 100);\n  width: calc(var(--%NS%scene-width) * var(--%NS%room-width) / 100);\n  height: calc(var(--%NS%scene-height) * var(--%NS%room-height) / 100);\n  aspect-ratio: var(--%NS%room-aspect);\n  transform: none;\n}\n.room-fragment[_ngcontent-%COMP%] {\n  display: none;\n  pointer-events: none;\n}\n.integrated[_ngcontent-%COMP%]   .desk-shadow[_ngcontent-%COMP%], \n.integrated[_ngcontent-%COMP%]   .desk-top[_ngcontent-%COMP%], \n.integrated[_ngcontent-%COMP%]   .desk-pedestal[_ngcontent-%COMP%], \n.integrated[_ngcontent-%COMP%]   .monitor-stand[_ngcontent-%COMP%], \n.integrated[_ngcontent-%COMP%]   .bezel-status[_ngcontent-%COMP%] {\n  display: none;\n}\n.integrated[_ngcontent-%COMP%]   .desk-hardware[_ngcontent-%COMP%] {\n  inset: 0;\n  transform: none;\n  pointer-events: none;\n}\n.integrated[_ngcontent-%COMP%]   .monitor-bezel[_ngcontent-%COMP%] {\n  left: var(--%NS%screen-x);\n  top: var(--%NS%screen-y);\n  width: var(--%NS%screen-width);\n  height: var(--%NS%screen-height);\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: none;\n  box-shadow: none;\n  transition: filter 0.25s;\n}\n.integrated[_ngcontent-%COMP%]   .monitor-bezel[_ngcontent-%COMP%]:before {\n  content: "";\n  position: absolute;\n  inset: -2px;\n  clip-path: var(--%NS%screen-clip);\n  background: var(--%NS%desk-light);\n  opacity: 0.3;\n  transition: opacity 0.25s;\n}\n.integrated[_ngcontent-%COMP%]   .station-display[_ngcontent-%COMP%] {\n  clip-path: var(--%NS%screen-clip);\n  border: 0;\n  filter: brightness(0.88);\n}\n.integrated[_ngcontent-%COMP%]   .station-name[_ngcontent-%COMP%] {\n  top: 58%;\n  left: 5%;\n  right: 5%;\n  min-height: 54px;\n  padding: 8px 12px;\n  border-left: 2px solid color-mix(in srgb, var(--%NS%desk-light) 65%, transparent);\n  border-bottom: 1px solid rgba(107, 138, 152, 0.2666666667);\n  background:\n    linear-gradient(\n      100deg,\n      rgba(6, 17, 29, 0.937254902),\n      rgba(7, 18, 29, 0.8509803922) 70%,\n      rgba(7, 18, 29, 0.3333333333));\n  color: #e1edf0;\n  font-size: clamp(13px, 1.22vw, 19px);\n  font-weight: 500;\n  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3333333333);\n  transition: border-color 0.25s, background 0.25s;\n}\n.integrated[_ngcontent-%COMP%]   .station-name[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 29px;\n  height: 29px;\n  flex-shrink: 0;\n  font-size: 19px;\n  border: 1px solid rgba(141, 166, 179, 0.2666666667);\n  border-radius: 50%;\n}\n.integrated[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .monitor-bezel[_ngcontent-%COMP%] {\n  box-shadow: none;\n  filter: drop-shadow(0 0 8px var(--%NS%desk-light));\n}\n.integrated[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .monitor-bezel[_ngcontent-%COMP%]:before {\n  opacity: 1;\n}\n.integrated[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .station-name[_ngcontent-%COMP%] {\n  border-color: var(--%NS%desk-light);\n  background:\n    linear-gradient(\n      100deg,\n      rgba(20, 50, 61, 0.9294117647),\n      rgba(8, 25, 36, 0.9098039216));\n}\n.integrated[_ngcontent-%COMP%]:is(:hover, :focus-visible)   .station-name[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  background: var(--%NS%desk-light);\n  color: #06121b;\n}\n@media (max-aspect-ratio: 3/2) {\n  .workstation.integrated[_ngcontent-%COMP%] {\n    top: 50%;\n    width: min(42vw, 270px);\n    height: auto;\n    transform: translateY(-50%);\n  }\n  .workstation.integrated[data-side=left][_ngcontent-%COMP%] {\n    left: 0;\n  }\n  .workstation.integrated[data-side=right][_ngcontent-%COMP%] {\n    left: auto;\n    right: 0;\n  }\n  .integrated[_ngcontent-%COMP%]   .room-fragment[_ngcontent-%COMP%] {\n    display: block;\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-mask-image:\n      linear-gradient(\n        transparent,\n        #000 8%,\n        #000 82%,\n        transparent);\n    mask-image:\n      linear-gradient(\n        transparent,\n        #000 8%,\n        #000 82%,\n        transparent);\n  }\n  .integrated[_ngcontent-%COMP%]   .station-name[_ngcontent-%COMP%] {\n    left: 4%;\n    right: 4%;\n    padding: 8px;\n    gap: 5px;\n    font-size: 14px;\n  }\n  .integrated[_ngcontent-%COMP%]   .station-name[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    width: 25px;\n    height: 25px;\n  }\n  .integrated[_ngcontent-%COMP%]   .station-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 0.3px;\n  }\n}\n/*# sourceMappingURL=crisis-integrated-workstations.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisWorkstationsComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-workstations", imports: [DecimalPipe, CrisisWeatherScreenComponent], template: `<div
  class="workstation-space"
  [class.away]="view() !== 'room'"
  [attr.inert]="view() === 'room' ? null : ''"
  [attr.aria-hidden]="view() === 'room' ? null : true"
>
  @for (station of stations(); track station.id) {
    <button
      class="workstation"
      [class.integrated]="station.surface"
      [style.--room-x]="station.surface?.x"
      [style.--room-y]="station.surface?.y"
      [style.--room-width]="station.surface?.width"
      [style.--room-height]="station.surface?.height"
      [style.--room-aspect]="station.surface?.aspect"
      [style.--screen-x]="station.surface?.screenX + '%'"
      [style.--screen-y]="station.surface?.screenY + '%'"
      [style.--screen-width]="station.surface?.screenWidth + '%'"
      [style.--screen-height]="station.surface?.screenHeight + '%'"
      [style.--screen-clip]="station.surface?.clip"
      [attr.data-side]="station.side"
      [attr.data-workstation-id]="station.id"
      [attr.aria-label]="'Open ' + station.name + ' workstation'"
      [attr.aria-describedby]="'workstation-info-' + station.id"
      (click)="open.emit(station.id)"
    >
      @if (station.surface; as surface) {
        <svg
          class="room-fragment"
          [attr.viewBox]="surface.viewBox"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <image
            [attr.href]="runtime.config.roomImage"
            x="0"
            y="0"
            width="100"
            height="100"
            preserveAspectRatio="none"
          />
        </svg>
      }
      <span class="desk-shadow" aria-hidden="true"></span>
      <span class="desk-hardware" aria-hidden="true">
        <span class="desk-pedestal"></span
        ><span class="desk-top"
          ><span class="keyboard"></span><span class="control-pad"></span
        ></span>
        <span class="monitor-stand"></span>
        <span class="monitor-bezel">
          <span
            class="station-display"
            [class.special-display]="station.conference || station.weather"
          >
            @if (station.weather; as weather) {
              <app-crisis-weather-screen
                [weather]="weather"
                [miniature]="true"
                [active]="view() === 'room'"
              />
            } @else if (station.conference; as call) {
              <span class="mini-call"
                ><span class="mini-call-people">
                  @for (person of call.participants; track person.id) {
                    <img [src]="person.portrait" alt="" />
                  }
                  <span>YOU</span></span
                ><span class="mini-call-title">{{ call.title }}<i></i></span
              ></span>
            } @else {
              <span class="display-header"
                ><i></i>{{ station.side === 'left' ? '01' : '02' }} / {{ station.instrument
                }}<b>LINKED</b></span
              >
              @switch (station.instrument) {
                @case ('telemetry') {
                  <span class="display-reading"
                    ><strong>{{ runtime.bulletin().metricValue | number: '1.1-1' }}</strong
                    ><small>{{ runtime.config.primaryMetric.unit }}</small
                    ><svg viewBox="0 0 160 50">
                      <path d="M0 15H160M0 32H160M0 49H160" />
                      <polyline [attr.points]="trend()" /></svg
                  ></span>
                  <span class="display-caption">{{ runtime.config.primaryMetric.label }}</span>
                }
                @case ('resources') {
                  <span class="display-reading"
                    ><strong>{{ runtime.crews().toString().padStart(2, '0') }}</strong
                    ><small>CREWS FREE</small
                    ><span class="crew-lights">
                      @for (crew of crewSlots; track crew) {
                        <i [class.assigned]="crew > runtime.crews()"></i>
                      }</span
                  ></span>
                  <span class="display-caption"
                    >{{ runtime.orders().length }} RESPONSES DISPATCHED</span
                  >
                }
                @case ('reports') {
                  <span class="display-reading"
                    ><strong>{{ station.reports.toString().padStart(2, '0') }}</strong
                    ><small>REPORTS</small
                    ><span class="signal-bars"><i></i><i></i><i></i><i></i><i></i></span
                  ></span>
                  <span class="display-caption">{{ station.unread }} UNREAD SIGNALS</span>
                }
              }
              <span class="display-footer"
                >{{ runtime.time() }}<span>{{ station.unread }} NEW</span></span
              >
            }
          </span>
          <span class="bezel-status"></span>
        </span>
      </span>
      <span class="station-name"
        ><span
          >{{ station.name
          }}<small>{{
            station.weather
              ? 'Weather channel'
              : station.conference
                ? 'Field conference'
                : 'Open workstation'
          }}</small></span
        ><b>\u2197</b></span
      >
      <span class="station-info" [id]="'workstation-info-' + station.id"
        >{{ station.description }} {{ station.reports }} reports available,
        {{ station.unread }} unread.</span
      >
    </button>
  }
</div>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-workstations.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  z-index: 3;\n  pointer-events: none;\n}\n.station-display.special-display {\n  position: relative;\n  padding: 0;\n  overflow: hidden;\n}\n.mini-call {\n  position: absolute;\n  inset: 0;\n  background: #25262a;\n  display: flex;\n  flex-direction: column;\n  padding: 3px;\n  gap: 3px;\n}\n.mini-call-people {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr 1fr;\n  gap: 2px;\n  flex: 1;\n  min-height: 0;\n}\n.mini-call-people img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  min-height: 0;\n  border-radius: 1px;\n}\n.mini-call-people > span {\n  display: grid;\n  place-items: center;\n  background: #3f4653;\n  font-size: 6px;\n  color: #ced7e3;\n}\n.mini-call-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 4px;\n  color: #cdd7e3;\n  padding: 1px 2px;\n}\n.mini-call-title i {\n  width: 10px;\n  height: 4px;\n  background: #e5484f;\n  border-radius: 2px;\n}\n* {\n  box-sizing: border-box;\n}\n.workstation-space {\n  position: absolute;\n  inset: 0;\n  opacity: 1;\n  transition: opacity 0.35s, filter 0.55s;\n}\n.workstation-space.away {\n  opacity: 0;\n  filter: blur(4px);\n  pointer-events: none;\n}\n.workstation {\n  --desk-light: #97dfd6;\n  position: absolute;\n  top: 50%;\n  width: clamp(200px, 21vw, 310px);\n  transform: translateY(-50%);\n  aspect-ratio: 1.18;\n  padding: 0;\n  color: #d3e8e6;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  pointer-events: auto;\n  text-align: left;\n  font-family: "Segoe UI", sans-serif;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.workstation[data-side=left] {\n  left: 3%;\n}\n.workstation[data-side=right] {\n  right: 3%;\n  --desk-light: #e7c494;\n}\n.away .workstation {\n  pointer-events: none;\n}\n.desk-hardware {\n  position: absolute;\n  inset: 0 0 18px;\n  transform: perspective(700px) rotateY(12deg) rotateX(2deg);\n  transform-origin: center bottom;\n  transition: filter 0.25s, transform 0.3s;\n}\n[data-side=right] .desk-hardware {\n  transform: perspective(700px) rotateY(-12deg) rotateX(2deg);\n}\n.desk-shadow {\n  position: absolute;\n  inset: 78% -10% -7%;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(0, 0, 0, 0.8),\n      transparent 68%);\n  filter: blur(6px);\n}\n.desk-pedestal {\n  position: absolute;\n  top: 77%;\n  left: 15%;\n  width: 70%;\n  height: 24%;\n  background:\n    linear-gradient(\n      90deg,\n      #101a22,\n      #29343c 10%,\n      #0b1118 35%,\n      #17232d 90%,\n      #050a10);\n  clip-path: polygon(0 0, 100% 0, 86% 100%, 14% 100%);\n  border-top: 1px solid #5b7684;\n  box-shadow: inset 0 8px 12px rgba(0, 0, 0, 0.8);\n}\n.desk-pedestal:after {\n  content: "";\n  position: absolute;\n  left: 28%;\n  right: 28%;\n  top: 42%;\n  height: 2px;\n  background: var(--desk-light);\n  opacity: 0.45;\n  box-shadow: 0 0 7px var(--desk-light);\n}\n.desk-top {\n  position: absolute;\n  top: 65%;\n  left: 0;\n  width: 100%;\n  height: 20%;\n  background:\n    linear-gradient(\n      160deg,\n      #3e4e58,\n      #111e29 47%,\n      #253946);\n  clip-path: polygon(12% 0, 87% 0, 100% 83%, 100% 96%, 0 96%, 0 83%);\n  border-bottom: 3px solid #070e16;\n  box-shadow: inset 0 -5px rgba(88, 120, 131, 0.4666666667);\n}\n.keyboard {\n  position: absolute;\n  width: 46%;\n  height: 36%;\n  left: 22%;\n  top: 42%;\n  transform: skewX(-10deg);\n  border: 1px solid rgba(104, 139, 145, 0.3333333333);\n  background:\n    repeating-linear-gradient(\n      0deg,\n      #172d38 0 2px,\n      transparent 2px 4px),\n    repeating-linear-gradient(\n      90deg,\n      rgba(116, 157, 160, 0.2666666667) 0 1px,\n      #0a1922 1px 6px);\n}\n.control-pad {\n  position: absolute;\n  left: 73%;\n  top: 41%;\n  width: 9%;\n  height: 30%;\n  border: 1px solid rgba(96, 132, 133, 0.3333333333);\n  background: rgba(116, 186, 173, 0.1450980392);\n  border-radius: 2px;\n}\n.monitor-stand {\n  position: absolute;\n  left: 43%;\n  top: 51%;\n  width: 15%;\n  height: 23%;\n  background:\n    linear-gradient(\n      90deg,\n      #111923,\n      #44545b 48%,\n      #0b1720 80%);\n  clip-path: polygon(27% 0, 75% 0, 70% 87%, 100% 100%, 0 100%, 30% 87%);\n}\n.monitor-bezel {\n  position: absolute;\n  left: 6%;\n  top: 0;\n  width: 88%;\n  height: 63%;\n  padding: 5px 5px 8px;\n  border: 1px solid rgba(101, 129, 140, 0.5333333333);\n  border-radius: 4px;\n  background:\n    linear-gradient(\n      145deg,\n      #3b505d,\n      #0e1b25 35%,\n      #273d46);\n  box-shadow:\n    0 5px 3px rgba(0, 0, 0, 0.6666666667),\n    0 12px 20px rgba(0, 0, 0, 0.4),\n    inset 0 1px rgba(179, 213, 221, 0.2666666667);\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.station-display {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n  padding: 7px 9px 5px;\n  background:\n    radial-gradient(\n      ellipse at 65% 20%,\n      rgba(29, 73, 80, 0.2),\n      transparent),\n    #081a24;\n  border: 1px solid rgba(0, 0, 0, 0.7333333333);\n  color: var(--desk-light);\n}\n.station-display:after {\n  content: "";\n  pointer-events: none;\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(transparent 0 3px, rgba(161, 217, 220, 0.0235294118) 3px 4px);\n}\n.display-header {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font: 5px Consolas, monospace;\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  opacity: 0.75;\n}\n.display-header i {\n  width: 3px;\n  height: 3px;\n  background: var(--desk-light);\n  border-radius: 50%;\n  box-shadow: 0 0 5px var(--desk-light);\n}\n.display-header b {\n  margin-left: auto;\n  font-weight: 400;\n  font-size: 4px;\n  opacity: 0.6;\n}\n.display-reading {\n  display: flex;\n  gap: 5px;\n  align-items: baseline;\n  margin-top: 7px;\n  min-height: 0;\n  flex: 1;\n}\n.display-reading strong {\n  font-size: clamp(22px, 2.1vw, 34px);\n  font-weight: 300;\n  line-height: 1;\n}\n.display-reading small {\n  font: 5px Consolas, monospace;\n  white-space: nowrap;\n}\n.display-reading svg {\n  width: 46%;\n  height: 30px;\n  margin-left: auto;\n  align-self: center;\n  overflow: visible;\n}\n.display-reading path {\n  stroke: rgba(102, 140, 146, 0.1333333333);\n  stroke-width: 1;\n  fill: none;\n}\n.display-reading polyline {\n  fill: none;\n  stroke: var(--desk-light);\n  stroke-width: 2;\n}\n.display-caption {\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.4px;\n  opacity: 0.65;\n  margin-top: 4px;\n}\n.display-footer {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid rgba(95, 139, 145, 0.1607843137);\n  padding-top: 4px;\n  margin-top: 5px;\n  font: 4px Consolas, monospace;\n  letter-spacing: 0.6px;\n}\n.crew-lights {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 3px;\n  margin-left: auto;\n  align-self: center;\n  width: 25%;\n}\n.crew-lights i {\n  height: 8px;\n  background: var(--desk-light);\n  box-shadow: 0 0 3px rgba(231, 196, 148, 0.2);\n  opacity: 0.7;\n}\n.crew-lights i.assigned {\n  background: #374449;\n  box-shadow: none;\n  opacity: 0.5;\n}\n.signal-bars {\n  display: flex;\n  align-items: flex-end;\n  height: 28px;\n  gap: 4px;\n  margin-left: auto;\n}\n.signal-bars i {\n  height: 40%;\n  width: 5px;\n  background: var(--desk-light);\n  opacity: 0.5;\n}\n.signal-bars i:nth-child(2n) {\n  height: 70%;\n}\n.signal-bars i:last-child {\n  height: 100%;\n}\n.bezel-status {\n  position: absolute;\n  bottom: 3px;\n  right: 10px;\n  width: 8px;\n  height: 1px;\n  background: var(--desk-light);\n  box-shadow: 0 0 7px var(--desk-light);\n}\n.station-name {\n  position: absolute;\n  left: 6%;\n  right: 6%;\n  top: -25px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  font-size: 12px;\n  text-shadow: 0 2px 8px #000;\n  color: #b6d0d6;\n  transition: color 0.2s;\n}\n.station-name b {\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--desk-light);\n}\n.station-name small {\n  display: block;\n  margin-top: 4px;\n  font-size: 9px;\n  font-weight: 400;\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n  color: #91a8b3;\n}\n.workstation:is(:hover, :focus-visible) .monitor-bezel {\n  border-color: var(--desk-light);\n  box-shadow:\n    0 0 0 1px var(--desk-light),\n    0 0 20px color-mix(in srgb, var(--desk-light) 55%, transparent),\n    0 12px 20px rgba(0, 0, 0, 0.4666666667);\n}\n.workstation:is(:hover, :focus-visible) .station-name {\n  color: #e2fff1;\n}\n.workstation:is(:hover, :focus-visible) .desk-hardware {\n  filter: brightness(1.22);\n}\n.station-info {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n@media (max-width: 1050px) {\n  .workstation {\n    width: 210px;\n  }\n  .workstation[data-side=left] {\n    left: 2%;\n  }\n  .workstation[data-side=right] {\n    right: 2%;\n  }\n}\n@media (max-width: 700px) {\n  .workstation {\n    width: 152px;\n  }\n  .workstation[data-side=left] {\n    left: 10px;\n  }\n  .workstation[data-side=right] {\n    right: 10px;\n  }\n  .monitor-bezel {\n    padding: 3px 3px 6px;\n  }\n  .station-display {\n    padding: 4px 5px;\n  }\n  .display-reading {\n    margin-top: 4px;\n    gap: 3px;\n  }\n  .display-reading strong {\n    font-size: 21px;\n  }\n  .display-header {\n    font-size: 4px;\n  }\n  .display-header b,\n  .display-caption {\n    display: none;\n  }\n  .display-reading small {\n    font-size: 4px;\n  }\n  .display-reading svg {\n    height: 24px;\n  }\n  .display-footer {\n    font-size: 4px;\n    padding-top: 3px;\n    margin-top: 3px;\n  }\n  .station-name {\n    left: 0;\n    right: 0;\n    font-size: 10px;\n    gap: 3px;\n  }\n  .crew-lights {\n    gap: 2px;\n  }\n  .crew-lights i {\n    height: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=crisis-workstations.component.css.map */\n', '/* src/app/templates/crisis-operations/ui/crisis-integrated-workstations.scss */\n.workstation.integrated {\n  --scene-width: max(100vw, 177.69vh);\n  --scene-height: max(56.28vw, 100vh);\n  left: calc(50% + var(--scene-width) * (var(--room-x) - 50) / 100);\n  right: auto;\n  top: calc(50% + var(--scene-height) * (var(--room-y) - 50) / 100);\n  width: calc(var(--scene-width) * var(--room-width) / 100);\n  height: calc(var(--scene-height) * var(--room-height) / 100);\n  aspect-ratio: var(--room-aspect);\n  transform: none;\n}\n.room-fragment {\n  display: none;\n  pointer-events: none;\n}\n.integrated .desk-shadow,\n.integrated .desk-top,\n.integrated .desk-pedestal,\n.integrated .monitor-stand,\n.integrated .bezel-status {\n  display: none;\n}\n.integrated .desk-hardware {\n  inset: 0;\n  transform: none;\n  pointer-events: none;\n}\n.integrated .monitor-bezel {\n  left: var(--screen-x);\n  top: var(--screen-y);\n  width: var(--screen-width);\n  height: var(--screen-height);\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: none;\n  box-shadow: none;\n  transition: filter 0.25s;\n}\n.integrated .monitor-bezel:before {\n  content: "";\n  position: absolute;\n  inset: -2px;\n  clip-path: var(--screen-clip);\n  background: var(--desk-light);\n  opacity: 0.3;\n  transition: opacity 0.25s;\n}\n.integrated .station-display {\n  clip-path: var(--screen-clip);\n  border: 0;\n  filter: brightness(0.88);\n}\n.integrated .station-name {\n  top: 58%;\n  left: 5%;\n  right: 5%;\n  min-height: 54px;\n  padding: 8px 12px;\n  border-left: 2px solid color-mix(in srgb, var(--desk-light) 65%, transparent);\n  border-bottom: 1px solid rgba(107, 138, 152, 0.2666666667);\n  background:\n    linear-gradient(\n      100deg,\n      rgba(6, 17, 29, 0.937254902),\n      rgba(7, 18, 29, 0.8509803922) 70%,\n      rgba(7, 18, 29, 0.3333333333));\n  color: #e1edf0;\n  font-size: clamp(13px, 1.22vw, 19px);\n  font-weight: 500;\n  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3333333333);\n  transition: border-color 0.25s, background 0.25s;\n}\n.integrated .station-name b {\n  display: grid;\n  place-items: center;\n  width: 29px;\n  height: 29px;\n  flex-shrink: 0;\n  font-size: 19px;\n  border: 1px solid rgba(141, 166, 179, 0.2666666667);\n  border-radius: 50%;\n}\n.integrated:is(:hover, :focus-visible) .monitor-bezel {\n  box-shadow: none;\n  filter: drop-shadow(0 0 8px var(--desk-light));\n}\n.integrated:is(:hover, :focus-visible) .monitor-bezel:before {\n  opacity: 1;\n}\n.integrated:is(:hover, :focus-visible) .station-name {\n  border-color: var(--desk-light);\n  background:\n    linear-gradient(\n      100deg,\n      rgba(20, 50, 61, 0.9294117647),\n      rgba(8, 25, 36, 0.9098039216));\n}\n.integrated:is(:hover, :focus-visible) .station-name b {\n  background: var(--desk-light);\n  color: #06121b;\n}\n@media (max-aspect-ratio: 3/2) {\n  .workstation.integrated {\n    top: 50%;\n    width: min(42vw, 270px);\n    height: auto;\n    transform: translateY(-50%);\n  }\n  .workstation.integrated[data-side=left] {\n    left: 0;\n  }\n  .workstation.integrated[data-side=right] {\n    left: auto;\n    right: 0;\n  }\n  .integrated .room-fragment {\n    display: block;\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-mask-image:\n      linear-gradient(\n        transparent,\n        #000 8%,\n        #000 82%,\n        transparent);\n    mask-image:\n      linear-gradient(\n        transparent,\n        #000 8%,\n        #000 82%,\n        transparent);\n  }\n  .integrated .station-name {\n    left: 4%;\n    right: 4%;\n    padding: 8px;\n    gap: 5px;\n    font-size: 14px;\n  }\n  .integrated .station-name b {\n    width: 25px;\n    height: 25px;\n  }\n  .integrated .station-name small {\n    font-size: 8px;\n    letter-spacing: 0.3px;\n  }\n}\n/*# sourceMappingURL=crisis-integrated-workstations.css.map */\n'] }]
  }], null, { view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: false }] }], open: [{ type: Output, args: ["open"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisWorkstationsComponent, { className: "CrisisWorkstationsComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-workstations.component.ts", lineNumber: 14 });
})();

// src/app/templates/crisis-operations/ui/crisis-conference.component.ts
var _forTrack09 = ($index, $item) => $item.id;
function CrisisConferenceComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275text(1, "Join live meeting ");
    \u0275\u0275element(2, "app-crisis-icon", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("href", ctx, \u0275\u0275sanitizeUrl);
  }
}
function CrisisConferenceComponent_Conditional_17_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const report_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", report_r4.confidence, " \xB7 ", report_r4.source);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r4.body);
  }
}
function CrisisConferenceComponent_Conditional_17_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1, " Pin a field report to the situation table to include it here. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 35);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_17_ForEmpty_24_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePanel("reports"));
    });
    \u0275\u0275text(3, "Open field reports");
    \u0275\u0275elementEnd();
  }
}
function CrisisConferenceComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 34);
    \u0275\u0275element(2, "app-crisis-icon", 26);
    \u0275\u0275text(3, "You are presenting the situation briefing ");
    \u0275\u0275elementStart(4, "button", 35);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sharing.set(false));
    });
    \u0275\u0275text(5, "Stop sharing");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 36)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 37)(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "small");
    \u0275\u0275text(17, "crews available");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementStart(20, "small");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275repeaterCreate(22, CrisisConferenceComponent_Conditional_17_For_23_Template, 7, 4, "article", null, _forTrack09, false, CrisisConferenceComponent_Conditional_17_ForEmpty_24_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("SITUATION BRIEFING \xB7 ", ctx_r1.runtime.time());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.bulletin().summary);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.crews());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.bulletin().metricValue, " ", ctx_r1.runtime.config.primaryMetric.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.primaryMetric.label);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.shared());
  }
}
function CrisisConferenceComponent_Conditional_18_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 47);
    \u0275\u0275listener("error", function CrisisConferenceComponent_Conditional_18_For_2_Conditional_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r7);
      const person_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.portraitFailed(person_r6.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", person_r6.portrait, \u0275\u0275sanitizeUrl)("alt", person_r6.name + ", simulated participant portrait");
  }
}
function CrisisConferenceComponent_Conditional_18_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.initials(person_r6.name));
  }
}
function CrisisConferenceComponent_Conditional_18_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_18_For_2_Template_button_click_0_listener() {
      const person_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectParticipant(person_r6.id));
    });
    \u0275\u0275conditionalCreate(1, CrisisConferenceComponent_Conditional_18_For_2_Conditional_1_Template, 1, 2, "img", 45)(2, CrisisConferenceComponent_Conditional_18_For_2_Conditional_2_Template, 2, 1, "span", 46);
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275element(4, "app-crisis-icon", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const person_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", "Focus on " + person_r6.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.failedPortraits().includes(person_r6.id) ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(person_r6.name);
  }
}
function CrisisConferenceComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, CrisisConferenceComponent_Conditional_18_For_2_Template, 6, 3, "button", 39, _forTrack09);
    \u0275\u0275elementStart(3, "div", 40)(4, "div", 41);
    \u0275\u0275text(5, "You");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 42);
    \u0275\u0275text(7, "Camera off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 43);
    \u0275\u0275element(9, "app-crisis-icon", 19);
    \u0275\u0275text(10, "You \xB7 Command center");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.call().participants);
  }
}
function CrisisConferenceComponent_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "img", 52);
    \u0275\u0275elementStart(1, "img", 47);
    \u0275\u0275listener("error", function CrisisConferenceComponent_Conditional_19_Conditional_1_Template_img_error_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.portraitFailed(ctx_r1.selected().id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.selected().portrait, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.selected().portrait, \u0275\u0275sanitizeUrl)("alt", ctx_r1.selected().name + ", simulated participant portrait");
  }
}
function CrisisConferenceComponent_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.initials(ctx_r1.selected().name));
  }
}
function CrisisConferenceComponent_Conditional_19_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("FIELD UPDATE \xB7 ", ctx_r1.update() ? ctx_r1.runtime.time(ctx_r1.update().minute) : ctx_r1.runtime.time());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.update()?.title ?? "Standing by for the next available field report.");
  }
}
function CrisisConferenceComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, CrisisConferenceComponent_Conditional_19_Conditional_1_Template, 2, 3)(2, CrisisConferenceComponent_Conditional_19_Conditional_2_Template, 2, 1, "span", 46);
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4, "PARTICIPANT STILL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 49)(6, "span", 43);
    \u0275\u0275element(7, "app-crisis-icon", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, CrisisConferenceComponent_Conditional_19_Conditional_11_Template, 5, 2, "div", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-speaker", ctx_r1.selected().id);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.failedPortraits().includes(ctx_r1.selected().id) ? 1 : 2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selected().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selected().role);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.captions() ? 11 : -1);
  }
}
function CrisisConferenceComponent_Conditional_20_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 56);
    \u0275\u0275listener("error", function CrisisConferenceComponent_Conditional_20_For_2_Conditional_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r11);
      const person_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.portraitFailed(person_r10.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", person_r10.portrait, \u0275\u0275sanitizeUrl);
  }
}
function CrisisConferenceComponent_Conditional_20_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.initials(person_r10.name));
  }
}
function CrisisConferenceComponent_Conditional_20_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_20_For_2_Template_button_click_0_listener() {
      const person_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectParticipant(person_r10.id));
    });
    \u0275\u0275conditionalCreate(1, CrisisConferenceComponent_Conditional_20_For_2_Conditional_1_Template, 1, 1, "img", 55)(2, CrisisConferenceComponent_Conditional_20_For_2_Conditional_2_Template, 2, 1, "span", 46);
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const person_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.selected().id === person_r10.id && !ctx_r1.sharing());
    \u0275\u0275attribute("aria-label", "Focus on " + person_r10.name)("aria-pressed", ctx_r1.selected().id === person_r10.id && !ctx_r1.sharing());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.failedPortraits().includes(person_r10.id) ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(person_r10.name);
  }
}
function CrisisConferenceComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, CrisisConferenceComponent_Conditional_20_For_2_Template, 5, 6, "button", 53, _forTrack09);
    \u0275\u0275elementStart(3, "div", 40)(4, "div", 41);
    \u0275\u0275text(5, "You");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 43);
    \u0275\u0275element(7, "app-crisis-icon", 19);
    \u0275\u0275text(8, "You");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.call().participants);
  }
}
function CrisisConferenceComponent_Conditional_21_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_21_Conditional_6_For_2_Template_button_click_0_listener() {
      const person_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectParticipant(person_r14.id));
    });
    \u0275\u0275elementStart(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "app-crisis-icon", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.initials(person_r14.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(person_r14.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(person_r14.role);
  }
}
function CrisisConferenceComponent_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275repeaterCreate(1, CrisisConferenceComponent_Conditional_21_Conditional_6_For_2_Template, 9, 3, "button", null, _forTrack09);
    \u0275\u0275elementStart(3, "div", 62)(4, "span", 63);
    \u0275\u0275text(5, "You");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span")(7, "strong");
    \u0275\u0275text(8, "You");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10, "Command center \xB7 camera off");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Fictional participants for this exercise. Your microphone and camera are off.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.call().participants);
  }
}
function CrisisConferenceComponent_Conditional_21_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "app-crisis-console", 64);
    \u0275\u0275listener("inspectLocation", function CrisisConferenceComponent_Conditional_21_Conditional_7_Template_app_crisis_console_inspectLocation_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.locate.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("view", "station")("workstation", ctx_r1.workstation());
  }
}
function CrisisConferenceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 15)(1, "header")(2, "h2", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 58);
    \u0275\u0275listener("click", function CrisisConferenceComponent_Conditional_21_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel(ctx_r1.panel() === "people" ? "people" : "reports"));
    });
    \u0275\u0275element(5, "app-crisis-icon", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, CrisisConferenceComponent_Conditional_21_Conditional_6_Template, 13, 0, "div", 60)(7, CrisisConferenceComponent_Conditional_21_Conditional_7_Template, 2, 2, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.panel() === "people" ? "Participants (" + (ctx_r1.call().participants.length + 1) + ")" : "Field reports", " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.panel() === "people" ? 6 : 7);
  }
}
var CrisisConferenceComponent = class _CrisisConferenceComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  workstation = input.required(
    ...ngDevMode ? [{ debugName: "workstation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leave = output();
  locate = output();
  call = computed(
    () => this.workstation().conference,
    ...ngDevMode ? [{ debugName: "call" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = computed(
    () => this.call().participants.find((person) => person.id === this.selectedId()) ?? this.call().participants[0],
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gallery = signal(
    false,
    ...ngDevMode ? [{ debugName: "gallery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  captions = signal(
    true,
    ...ngDevMode ? [{ debugName: "captions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sharing = signal(
    false,
    ...ngDevMode ? [{ debugName: "sharing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panel = signal(
    "",
    ...ngDevMode ? [{ debugName: "panel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failedPortraits = signal(
    [],
    ...ngDevMode ? [{ debugName: "failedPortraits" }] : (
      /* istanbul ignore next */
      []
    )
  );
  update = computed(
    () => this.runtime.reports().find((report) => this.selected().evidenceIds.includes(report.id)),
    ...ngDevMode ? [{ debugName: "update" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusTimer;
  selectParticipant(id) {
    this.selectedId.set(id);
    this.gallery.set(false);
    this.sharing.set(false);
  }
  togglePanel(panel) {
    this.panel.set(this.panel() === panel ? "" : panel);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.element.nativeElement.querySelector(this.panel() ? ".call-sidebar h2" : `[data-call-panel="${panel}"]`)?.focus({ preventScroll: true }), 0);
  }
  initials(name) {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  }
  portraitFailed(id) {
    this.failedPortraits.update((ids) => [...ids, id]);
  }
  ngOnDestroy() {
    clearTimeout(this.focusTimer);
  }
  static \u0275fac = function CrisisConferenceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisConferenceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisConferenceComponent, selectors: [["app-crisis-conference"]], inputs: { workstation: [1, "workstation"] }, outputs: { leave: "leave", locate: "locate" }, decls: 53, vars: 17, consts: [["aria-label", "Field video conference", 1, "conference-window"], [1, "call-topbar"], [1, "meeting-title"], ["name", "video"], ["tabindex", "-1", "data-panel-heading", ""], [1, "call-top-actions"], ["target", "_blank", "rel", "noopener noreferrer", 1, "live-meeting", 3, "href"], [1, "layout-button", 3, "click"], [3, "name"], [1, "call-body"], [1, "call-stage"], ["aria-label", "Situation table shared in exercise call", 1, "shared-table"], [1, "gallery-grid"], [1, "video-tile", "speaker-tile"], ["aria-label", "Call participants", 1, "participant-strip"], [1, "call-sidebar"], ["aria-label", "Call controls", 1, "call-toolbar"], [1, "media-controls"], ["disabled", "", "title", "Microphone available in a live meeting"], ["name", "mic-off"], ["disabled", "", "title", "Camera available in a live meeting"], ["name", "video-off"], [1, "meeting-controls"], ["data-call-panel", "people", 3, "click"], ["name", "people"], [1, "share-control", 3, "click"], ["name", "share-screen"], ["aria-label", "Toggle field update captions", 3, "click"], ["name", "captions"], ["data-call-panel", "reports", 3, "click"], ["name", "news"], [1, "leave-call", 3, "click"], ["name", "phone-down"], ["name", "arrow"], [1, "sharing-banner"], [3, "click"], [1, "briefing-sheet"], [1, "briefing-metrics"], [1, "briefing-empty"], [1, "video-tile", "gallery-tile"], [1, "video-tile", "local-tile"], [1, "local-avatar"], [1, "camera-note"], [1, "tile-name"], [1, "video-tile", "gallery-tile", 3, "click"], [3, "src", "alt"], [1, "avatar-fallback"], [3, "error", "src", "alt"], [1, "portrait-status"], [1, "speaker-identity"], ["name", "pin"], [1, "field-caption"], ["alt", "", "aria-hidden", "true", 1, "speaker-backdrop", 3, "src"], [1, "video-tile", "participant-tile", 3, "selected"], [1, "video-tile", "participant-tile", 3, "click"], ["alt", "", 3, "src"], ["alt", "", 3, "error", "src"], ["tabindex", "-1"], ["aria-label", "Close call sidebar", 3, "click"], ["name", "close"], [1, "people-list"], [1, "call-reports"], [1, "you-row"], [1, "person-avatar"], [3, "inspectLocation", "view", "workstation"]], template: function CrisisConferenceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-crisis-icon", 3);
      \u0275\u0275elementStart(4, "div")(5, "h2", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Exercise call \xB7 Simulated participants");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275conditionalCreate(10, CrisisConferenceComponent_Conditional_10_Template, 3, 1, "a", 6);
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_11_listener() {
        ctx.gallery.set(!ctx.gallery());
        return ctx.sharing.set(false);
      });
      \u0275\u0275element(12, "app-crisis-icon", 8);
      \u0275\u0275elementStart(13, "span");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "div", 9)(16, "div", 10);
      \u0275\u0275conditionalCreate(17, CrisisConferenceComponent_Conditional_17_Template, 25, 8, "section", 11)(18, CrisisConferenceComponent_Conditional_18_Template, 11, 0, "div", 12)(19, CrisisConferenceComponent_Conditional_19_Template, 12, 5, "div", 13);
      \u0275\u0275conditionalCreate(20, CrisisConferenceComponent_Conditional_20_Template, 9, 0, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, CrisisConferenceComponent_Conditional_21_Template, 8, 2, "aside", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "footer", 16)(23, "div", 17)(24, "button", 18);
      \u0275\u0275element(25, "app-crisis-icon", 19);
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "Mic off");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 20);
      \u0275\u0275element(29, "app-crisis-icon", 21);
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "Camera off");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 22)(33, "button", 23);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_33_listener() {
        return ctx.togglePanel("people");
      });
      \u0275\u0275element(34, "app-crisis-icon", 24);
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36, "Participants");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "button", 25);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_37_listener() {
        ctx.sharing.set(!ctx.sharing());
        return ctx.gallery.set(false);
      });
      \u0275\u0275element(38, "app-crisis-icon", 26);
      \u0275\u0275elementStart(39, "span");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "button", 27);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_41_listener() {
        return ctx.captions.set(!ctx.captions());
      });
      \u0275\u0275element(42, "app-crisis-icon", 28);
      \u0275\u0275elementStart(43, "span");
      \u0275\u0275text(44, "Captions");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "button", 29);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_45_listener() {
        return ctx.togglePanel("reports");
      });
      \u0275\u0275element(46, "app-crisis-icon", 30);
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "Reports");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "button", 31);
      \u0275\u0275listener("click", function CrisisConferenceComponent_Template_button_click_49_listener() {
        return ctx.leave.emit();
      });
      \u0275\u0275element(50, "app-crisis-icon", 32);
      \u0275\u0275elementStart(51, "span");
      \u0275\u0275text(52, "Leave");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.call().title);
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_1_0 = ctx.call().meetingUrl) ? 10 : -1, tmp_1_0);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.gallery() ? "Speaker view" : "Gallery view")("aria-pressed", ctx.gallery());
      \u0275\u0275advance();
      \u0275\u0275property("name", ctx.gallery() ? "speaker" : "grid");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.gallery() ? "Speaker view" : "Gallery view");
      \u0275\u0275advance();
      \u0275\u0275classProp("has-panel", ctx.panel());
      \u0275\u0275advance();
      \u0275\u0275attribute("inert", ctx.panel() ? "" : null);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.sharing() ? 17 : ctx.gallery() ? 18 : 19);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.gallery() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.panel() ? 21 : -1);
      \u0275\u0275advance(12);
      \u0275\u0275attribute("aria-pressed", ctx.panel() === "people");
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-pressed", ctx.sharing());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.sharing() ? "Stop sharing" : "Share table");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.captions());
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-pressed", ctx.panel() === "reports");
    }
  }, dependencies: [CrisisIconComponent, CrisisConsoleComponent], styles: ['\n[_nghost-%COMP%] {\n  color-scheme: dark;\n  position: absolute;\n  inset: 84px 24px 24px;\n  z-index: 5;\n  display: block;\n  font: 13px/1.4 "Segoe UI", sans-serif;\n  color: #f2f2f5;\n  animation: _ngcontent-%COMP%_call-open 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 0;\n  cursor: pointer;\n  background: transparent;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #76b9ff;\n  outline-offset: 3px;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.conference-window[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #42444a;\n  border-radius: 12px;\n  background: #191a1e;\n  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.7333333333);\n}\n.call-topbar[_ngcontent-%COMP%] {\n  padding: 13px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  background: #232428;\n  flex: none;\n}\n.meeting-title[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.meeting-title[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  color: #63b4ff;\n  width: 26px;\n  height: 26px;\n}\n.meeting-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n}\n.meeting-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a1a4ac;\n  font-size: 11px;\n  display: block;\n  margin-top: 2px;\n}\n.call-top-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.layout-button[_ngcontent-%COMP%], \n.live-meeting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  text-decoration: none;\n  padding: 7px 9px;\n  border: 1px solid #54565c;\n  border-radius: 5px;\n}\n.layout-button[_ngcontent-%COMP%]:hover {\n  background: #3d3f45;\n}\n.live-meeting[_ngcontent-%COMP%] {\n  color: #9bcaff;\n}\n.call-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  position: relative;\n}\n.call-stage[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 14px;\n}\n.video-tile[_ngcontent-%COMP%] {\n  background: #303238;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 0;\n}\n.video-tile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  inset: 0;\n}\n.speaker-tile[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #687078;\n}\n.speaker-tile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  object-position: 50% 42%;\n  object-fit: contain;\n}\n.speaker-tile[_ngcontent-%COMP%]   .speaker-backdrop[_ngcontent-%COMP%] {\n  object-fit: cover;\n  filter: blur(24px) brightness(0.35);\n  transform: scale(1.1);\n}\n.speaker-tile[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  inset: 55% 0 0;\n  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7333333333));\n  pointer-events: none;\n}\n.portrait-status[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  background: rgba(0, 0, 0, 0.5333333333);\n  padding: 4px 7px;\n  border-radius: 4px;\n  font-size: 8px;\n  letter-spacing: 1px;\n  color: #eee;\n}\n.tile-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  position: absolute;\n  left: 6px;\n  bottom: 6px;\n  padding: 4px 7px;\n  background: rgba(20, 21, 25, 0.8);\n  border-radius: 4px;\n  font-size: 11px;\n  color: white;\n  z-index: 1;\n}\n.tile-name[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n}\n.speaker-identity[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  bottom: 15px;\n  z-index: 1;\n}\n.speaker-identity[_ngcontent-%COMP%]   .tile-name[_ngcontent-%COMP%] {\n  position: static;\n  width: fit-content;\n  font-size: 15px;\n  padding: 4px 8px;\n}\n.speaker-identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: block;\n  padding: 4px 8px;\n  color: #e0e2e6;\n  font-size: 11px;\n}\n.field-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  bottom: 23px;\n  right: 20px;\n  max-width: 52%;\n  padding: 9px 13px;\n  background: rgba(16, 17, 19, 0.8509803922);\n  border-radius: 5px;\n}\n.field-caption[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1px;\n  color: #a4c8e1;\n}\n.field-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.participant-strip[_ngcontent-%COMP%] {\n  height: 110px;\n  flex: none;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 10px;\n  max-width: 760px;\n  width: 100%;\n  margin: 0 auto;\n}\n.participant-tile[_ngcontent-%COMP%] {\n  border: 2px solid transparent;\n}\n.participant-tile.selected[_ngcontent-%COMP%] {\n  border-color: #6cadfb;\n}\n.participant-tile[_ngcontent-%COMP%]:hover {\n  border-color: #b0cbe9;\n}\n.local-tile[_ngcontent-%COMP%] {\n  flex-direction: column;\n  background:\n    radial-gradient(\n      ellipse at 50% 25%,\n      #3a3d45,\n      #27282c);\n}\n.local-avatar[_ngcontent-%COMP%], \n.avatar-fallback[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  background: #526479;\n  width: 52px;\n  height: 52px;\n  display: grid;\n  place-items: center;\n  font-size: 20px;\n}\n.camera-note[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  color: #a7aab2;\n  font-size: 11px;\n}\n.avatar-fallback[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  font-size: 30px;\n}\n.gallery-grid[_ngcontent-%COMP%] {\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  grid-auto-rows: minmax(0, 1fr);\n  gap: 12px;\n}\n.gallery-tile[_ngcontent-%COMP%]   .tile-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.gallery-tile[_ngcontent-%COMP%]:hover {\n  box-shadow: inset 0 0 0 2px #70aeef;\n}\n.call-sidebar[_ngcontent-%COMP%] {\n  width: 330px;\n  flex: none;\n  background: #25262b;\n  border-left: 1px solid #414248;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.call-sidebar[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 17px 18px;\n  border-bottom: 1px solid #424349;\n}\n.call-sidebar[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.call-sidebar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  padding: 5px;\n}\n.people-list[_ngcontent-%COMP%], \n.call-reports[_ngcontent-%COMP%] {\n  overflow: auto;\n  padding: 12px 18px;\n  flex: 1;\n}\n.people-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.you-row[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 10px;\n  text-align: left;\n  padding: 13px 0;\n}\n.people-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2) {\n  flex: 1;\n}\n.people-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  color: #aeb0b8;\n}\n.person-avatar[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  background: #454e60;\n  color: #dbe4ed;\n  border-radius: 50%;\n  width: 34px;\n  height: 34px;\n  font-size: 11px;\n  flex: none;\n}\n.people-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n}\n.people-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #999fae;\n  font-size: 10px;\n  margin-top: 4px;\n}\n.people-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #999fae;\n  margin-top: 20px;\n}\n.call-reports[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.call-toolbar[_ngcontent-%COMP%] {\n  background: #232428;\n  border-top: 1px solid #3c3d43;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 18px;\n  flex: none;\n}\n.media-controls[_ngcontent-%COMP%], \n.meeting-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.call-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 58px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 10px;\n}\n.call-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.call-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #41434a;\n}\n.call-toolbar[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #353d49;\n  color: #aaceff;\n}\n.call-toolbar[_ngcontent-%COMP%]   .share-control[_ngcontent-%COMP%] {\n  color: #7bdd8f;\n}\n.call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%] {\n  background: #d83640;\n  min-width: 68px;\n  font-size: 12px;\n  color: white;\n  flex-direction: row;\n  gap: 8px;\n  padding: 10px 13px;\n}\n.call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%]:hover {\n  background: #ec424d;\n}\n.call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 18px;\n}\n.shared-table[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  border: 2px solid #6cd886;\n  border-radius: 7px;\n  background: #13202a;\n}\n.sharing-banner[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 8px 14px;\n  background: #387448;\n  font-size: 11px;\n  z-index: 1;\n}\n.sharing-banner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: #df4448;\n  border-radius: 4px;\n  padding: 5px 9px;\n  font-size: 10px;\n}\n.briefing-sheet[_ngcontent-%COMP%] {\n  padding: 28px;\n  max-width: 850px;\n  margin: auto;\n}\n.briefing-sheet[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #86b6be;\n  letter-spacing: 1.6px;\n}\n.briefing-sheet[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 26px;\n  line-height: 1.2;\n  font-weight: 500;\n  margin: 12px 0;\n}\n.briefing-sheet[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #b9c6ce;\n  line-height: 1.6;\n}\n.briefing-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 40px;\n  margin: 20px 0;\n}\n.briefing-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 400;\n}\n.briefing-metrics[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #91a9b6;\n}\n.briefing-sheet[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-top: 1px solid #40535c;\n  padding: 16px 0;\n}\n.briefing-sheet[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #8fbfc0;\n}\n.briefing-sheet[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 6px 0;\n}\n.briefing-sheet[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  color: #9ec8ef;\n  padding: 8px 0;\n}\n@keyframes _ngcontent-%COMP%_call-open {\n  from {\n    opacity: 0;\n    transform: translate(10vw, 12vh) scale(0.83);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (max-width: 1050px) {\n  [_nghost-%COMP%] {\n    inset: 84px 16px 18px;\n  }\n  .call-topbar[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n  }\n  .participant-strip[_ngcontent-%COMP%] {\n    height: 88px;\n  }\n  .call-stage[_ngcontent-%COMP%] {\n    padding: 10px;\n    gap: 8px;\n  }\n  .call-toolbar[_ngcontent-%COMP%] {\n    padding: 9px 10px;\n    gap: 6px;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 6px;\n    min-width: 45px;\n    font-size: 9px;\n  }\n  .media-controls[_ngcontent-%COMP%], \n   .meeting-controls[_ngcontent-%COMP%] {\n    gap: 3px;\n  }\n  .call-sidebar[_ngcontent-%COMP%] {\n    width: 290px;\n  }\n  .field-caption[_ngcontent-%COMP%] {\n    max-width: 54%;\n    right: 12px;\n    bottom: 18px;\n  }\n  .field-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .speaker-identity[_ngcontent-%COMP%] {\n    left: 8px;\n    bottom: 12px;\n  }\n  .speaker-identity[_ngcontent-%COMP%]   .tile-name[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 700px) {\n  [_nghost-%COMP%] {\n    inset: 100px 8px 12px;\n  }\n  .call-topbar[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 6px;\n  }\n  .meeting-title[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .meeting-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .meeting-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .meeting-title[_ngcontent-%COMP%]    > app-crisis-icon[_ngcontent-%COMP%] {\n    width: 20px;\n  }\n  .layout-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .call-top-actions[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .live-meeting[_ngcontent-%COMP%] {\n    font-size: 9px;\n    max-width: 95px;\n  }\n  .live-meeting[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .call-body.has-panel[_ngcontent-%COMP%]   .call-sidebar[_ngcontent-%COMP%] {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    z-index: 3;\n  }\n  .call-stage[_ngcontent-%COMP%] {\n    padding: 7px;\n  }\n  .participant-strip[_ngcontent-%COMP%] {\n    height: 72px;\n    gap: 5px;\n  }\n  .participant-strip[_ngcontent-%COMP%]   .tile-name[_ngcontent-%COMP%] {\n    font-size: 8px;\n    left: 2px;\n    bottom: 2px;\n    padding: 2px 3px;\n    max-width: calc(100% - 4px);\n    white-space: nowrap;\n  }\n  .local-avatar[_ngcontent-%COMP%] {\n    width: 34px;\n    height: 34px;\n    font-size: 13px;\n  }\n  .speaker-tile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    object-position: 50% 35%;\n    object-fit: cover;\n  }\n  .field-caption[_ngcontent-%COMP%] {\n    left: 12px;\n    right: 12px;\n    bottom: 72px;\n    max-width: none;\n  }\n  .speaker-identity[_ngcontent-%COMP%] {\n    bottom: 12px;\n    left: 6px;\n  }\n  .speaker-identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    font-size: 10px;\n  }\n  .portrait-status[_ngcontent-%COMP%] {\n    font-size: 7px;\n    right: 7px;\n    top: 7px;\n  }\n  .call-toolbar[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 7px;\n    padding: 10px 8px;\n  }\n  .meeting-controls[_ngcontent-%COMP%] {\n    order: 1;\n    flex: 1;\n    justify-content: center;\n  }\n  .media-controls[_ngcontent-%COMP%] {\n    gap: 0;\n  }\n  .media-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 39px;\n    font-size: 8px;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 44px;\n    font-size: 8px;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%] {\n    min-width: 49px;\n    padding: 9px;\n    font-size: 10px;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .call-toolbar[_ngcontent-%COMP%]   .leave-call[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .media-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.0705882353);\n    padding-bottom: 5px;\n  }\n  .media-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 6px;\n  }\n  .gallery-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .gallery-tile[_ngcontent-%COMP%]   .tile-name[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .briefing-sheet[_ngcontent-%COMP%] {\n    padding: 17px;\n  }\n  .briefing-sheet[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .sharing-banner[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 7px;\n    gap: 5px;\n  }\n  .sharing-banner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .sharing-banner[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=crisis-conference.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisConferenceComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-conference", imports: [CrisisIconComponent, CrisisConsoleComponent], template: `<section class="conference-window" aria-label="Field video conference">
  <header class="call-topbar">
    <div class="meeting-title">
      <app-crisis-icon name="video" />
      <div>
        <h2 tabindex="-1" data-panel-heading>{{ call().title }}</h2>
        <span>Exercise call \xB7 Simulated participants</span>
      </div>
    </div>
    <div class="call-top-actions">
      @if (call().meetingUrl; as url) {
        <a class="live-meeting" [href]="url" target="_blank" rel="noopener noreferrer"
          >Join live meeting <app-crisis-icon name="arrow"
        /></a>
      }
      <button
        class="layout-button"
        [attr.aria-label]="gallery() ? 'Speaker view' : 'Gallery view'"
        (click)="gallery.set(!gallery()); sharing.set(false)"
        [attr.aria-pressed]="gallery()"
      >
        <app-crisis-icon [name]="gallery() ? 'speaker' : 'grid'" /><span>{{
          gallery() ? 'Speaker view' : 'Gallery view'
        }}</span>
      </button>
    </div>
  </header>
  <div class="call-body" [class.has-panel]="panel()">
    <div class="call-stage" [attr.inert]="panel() ? '' : null">
      @if (sharing()) {
        <section class="shared-table" aria-label="Situation table shared in exercise call">
          <div class="sharing-banner">
            <app-crisis-icon name="share-screen" />You are presenting the situation briefing
            <button (click)="sharing.set(false)">Stop sharing</button>
          </div>
          <div class="briefing-sheet">
            <span>SITUATION BRIEFING \xB7 {{ runtime.time() }}</span>
            <h3>{{ runtime.bulletin().title }}</h3>
            <p>{{ runtime.bulletin().summary }}</p>
            <div class="briefing-metrics">
              <strong>{{ runtime.crews() }}<small>crews available</small></strong
              ><strong
                >{{ runtime.bulletin().metricValue }} {{ runtime.config.primaryMetric.unit
                }}<small>{{ runtime.config.primaryMetric.label }}</small></strong
              >
            </div>
            @for (report of runtime.shared(); track report.id) {
              <article>
                <small>{{ report.confidence }} \xB7 {{ report.source }}</small>
                <h4>{{ report.title }}</h4>
                <p>{{ report.body }}</p>
              </article>
            } @empty {
              <p class="briefing-empty">
                Pin a field report to the situation table to include it here.
              </p>
              <button (click)="togglePanel('reports')">Open field reports</button>
            }
          </div>
        </section>
      } @else if (gallery()) {
        <div class="gallery-grid">
          @for (person of call().participants; track person.id) {
            <button
              class="video-tile gallery-tile"
              (click)="selectParticipant(person.id)"
              [attr.aria-label]="'Focus on ' + person.name"
            >
              @if (!failedPortraits().includes(person.id)) {
                <img
                  [src]="person.portrait"
                  [alt]="person.name + ', simulated participant portrait'"
                  (error)="portraitFailed(person.id)"
                />
              } @else {
                <span class="avatar-fallback">{{ initials(person.name) }}</span>
              }
              <span class="tile-name"><app-crisis-icon name="mic-off" />{{ person.name }}</span>
            </button>
          }
          <div class="video-tile local-tile">
            <div class="local-avatar">You</div>
            <span class="camera-note">Camera off</span
            ><span class="tile-name"><app-crisis-icon name="mic-off" />You \xB7 Command center</span>
          </div>
        </div>
      } @else {
        <div class="video-tile speaker-tile" [attr.data-speaker]="selected().id">
          @if (!failedPortraits().includes(selected().id)) {
            <img class="speaker-backdrop" [src]="selected().portrait" alt="" aria-hidden="true" />
            <img
              [src]="selected().portrait"
              [alt]="selected().name + ', simulated participant portrait'"
              (error)="portraitFailed(selected().id)"
            />
          } @else {
            <span class="avatar-fallback">{{ initials(selected().name) }}</span>
          }
          <span class="portrait-status">PARTICIPANT STILL</span>
          <div class="speaker-identity">
            <span class="tile-name"><app-crisis-icon name="pin" />{{ selected().name }}</span
            ><span>{{ selected().role }}</span>
          </div>
          @if (captions()) {
            <div class="field-caption">
              <span
                >FIELD UPDATE \xB7
                {{ update() ? runtime.time(update()!.minute) : runtime.time() }}</span
              >
              <p>{{ update()?.title ?? 'Standing by for the next available field report.' }}</p>
            </div>
          }
        </div>
      }
      @if (!gallery()) {
        <div class="participant-strip" aria-label="Call participants">
          @for (person of call().participants; track person.id) {
            <button
              class="video-tile participant-tile"
              [class.selected]="selected().id === person.id && !sharing()"
              (click)="selectParticipant(person.id)"
              [attr.aria-label]="'Focus on ' + person.name"
              [attr.aria-pressed]="selected().id === person.id && !sharing()"
            >
              @if (!failedPortraits().includes(person.id)) {
                <img [src]="person.portrait" alt="" (error)="portraitFailed(person.id)" />
              } @else {
                <span class="avatar-fallback">{{ initials(person.name) }}</span>
              }
              <span class="tile-name">{{ person.name }}</span>
            </button>
          }
          <div class="video-tile local-tile">
            <div class="local-avatar">You</div>
            <span class="tile-name"><app-crisis-icon name="mic-off" />You</span>
          </div>
        </div>
      }
    </div>
    @if (panel()) {
      <aside class="call-sidebar">
        <header>
          <h2 tabindex="-1">
            {{
              panel() === 'people'
                ? 'Participants (' + (call().participants.length + 1) + ')'
                : 'Field reports'
            }}
          </h2>
          <button
            (click)="togglePanel(panel() === 'people' ? 'people' : 'reports')"
            aria-label="Close call sidebar"
          >
            <app-crisis-icon name="close" />
          </button>
        </header>
        @if (panel() === 'people') {
          <div class="people-list">
            @for (person of call().participants; track person.id) {
              <button (click)="selectParticipant(person.id)">
                <span class="person-avatar">{{ initials(person.name) }}</span
                ><span
                  ><strong>{{ person.name }}</strong
                  ><small>{{ person.role }}</small></span
                ><app-crisis-icon name="mic-off" />
              </button>
            }
            <div class="you-row">
              <span class="person-avatar">You</span
              ><span><strong>You</strong><small>Command center \xB7 camera off</small></span>
            </div>
            <p>Fictional participants for this exercise. Your microphone and camera are off.</p>
          </div>
        } @else {
          <div class="call-reports">
            <app-crisis-console
              [view]="'station'"
              [workstation]="workstation()"
              (inspectLocation)="locate.emit($event)"
            />
          </div>
        }
      </aside>
    }
  </div>
  <footer class="call-toolbar" aria-label="Call controls">
    <div class="media-controls">
      <button disabled title="Microphone available in a live meeting">
        <app-crisis-icon name="mic-off" /><span>Mic off</span></button
      ><button disabled title="Camera available in a live meeting">
        <app-crisis-icon name="video-off" /><span>Camera off</span>
      </button>
    </div>
    <div class="meeting-controls">
      <button
        data-call-panel="people"
        (click)="togglePanel('people')"
        [attr.aria-pressed]="panel() === 'people'"
      >
        <app-crisis-icon name="people" /><span>Participants</span></button
      ><button
        class="share-control"
        (click)="sharing.set(!sharing()); gallery.set(false)"
        [attr.aria-pressed]="sharing()"
      >
        <app-crisis-icon name="share-screen" /><span>{{
          sharing() ? 'Stop sharing' : 'Share table'
        }}</span></button
      ><button
        (click)="captions.set(!captions())"
        [attr.aria-pressed]="captions()"
        aria-label="Toggle field update captions"
      >
        <app-crisis-icon name="captions" /><span>Captions</span></button
      ><button
        data-call-panel="reports"
        (click)="togglePanel('reports')"
        [attr.aria-pressed]="panel() === 'reports'"
      >
        <app-crisis-icon name="news" /><span>Reports</span>
      </button>
    </div>
    <button class="leave-call" (click)="leave.emit()">
      <app-crisis-icon name="phone-down" /><span>Leave</span>
    </button>
  </footer>
</section>
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-conference.component.scss */\n:host {\n  color-scheme: dark;\n  position: absolute;\n  inset: 84px 24px 24px;\n  z-index: 5;\n  display: block;\n  font: 13px/1.4 "Segoe UI", sans-serif;\n  color: #f2f2f5;\n  animation: call-open 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\na {\n  font: inherit;\n  color: inherit;\n}\nbutton {\n  border: 0;\n  cursor: pointer;\n  background: transparent;\n}\nbutton:focus-visible,\na:focus-visible {\n  outline: 2px solid #76b9ff;\n  outline-offset: 3px;\n}\nh2,\nh3,\nh4,\np {\n  margin: 0;\n}\nh2:focus {\n  outline: none;\n}\n.conference-window {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #42444a;\n  border-radius: 12px;\n  background: #191a1e;\n  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.7333333333);\n}\n.call-topbar {\n  padding: 13px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  background: #232428;\n  flex: none;\n}\n.meeting-title {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.meeting-title > app-crisis-icon {\n  color: #63b4ff;\n  width: 26px;\n  height: 26px;\n}\n.meeting-title h2 {\n  font-size: 15px;\n  font-weight: 600;\n}\n.meeting-title span {\n  color: #a1a4ac;\n  font-size: 11px;\n  display: block;\n  margin-top: 2px;\n}\n.call-top-actions {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.layout-button,\n.live-meeting {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  text-decoration: none;\n  padding: 7px 9px;\n  border: 1px solid #54565c;\n  border-radius: 5px;\n}\n.layout-button:hover {\n  background: #3d3f45;\n}\n.live-meeting {\n  color: #9bcaff;\n}\n.call-body {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  position: relative;\n}\n.call-stage {\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 14px;\n}\n.video-tile {\n  background: #303238;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 0;\n}\n.video-tile img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  inset: 0;\n}\n.speaker-tile {\n  flex: 1;\n  border: 1px solid #687078;\n}\n.speaker-tile img {\n  object-position: 50% 42%;\n  object-fit: contain;\n}\n.speaker-tile .speaker-backdrop {\n  object-fit: cover;\n  filter: blur(24px) brightness(0.35);\n  transform: scale(1.1);\n}\n.speaker-tile:after {\n  content: "";\n  position: absolute;\n  inset: 55% 0 0;\n  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7333333333));\n  pointer-events: none;\n}\n.portrait-status {\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  background: rgba(0, 0, 0, 0.5333333333);\n  padding: 4px 7px;\n  border-radius: 4px;\n  font-size: 8px;\n  letter-spacing: 1px;\n  color: #eee;\n}\n.tile-name {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  position: absolute;\n  left: 6px;\n  bottom: 6px;\n  padding: 4px 7px;\n  background: rgba(20, 21, 25, 0.8);\n  border-radius: 4px;\n  font-size: 11px;\n  color: white;\n  z-index: 1;\n}\n.tile-name app-crisis-icon {\n  width: 13px;\n  height: 13px;\n}\n.speaker-identity {\n  position: absolute;\n  left: 16px;\n  bottom: 15px;\n  z-index: 1;\n}\n.speaker-identity .tile-name {\n  position: static;\n  width: fit-content;\n  font-size: 15px;\n  padding: 4px 8px;\n}\n.speaker-identity > span:last-child {\n  display: block;\n  padding: 4px 8px;\n  color: #e0e2e6;\n  font-size: 11px;\n}\n.field-caption {\n  position: absolute;\n  z-index: 1;\n  bottom: 23px;\n  right: 20px;\n  max-width: 52%;\n  padding: 9px 13px;\n  background: rgba(16, 17, 19, 0.8509803922);\n  border-radius: 5px;\n}\n.field-caption > span {\n  font-size: 8px;\n  letter-spacing: 1px;\n  color: #a4c8e1;\n}\n.field-caption p {\n  margin-top: 4px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.participant-strip {\n  height: 110px;\n  flex: none;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 10px;\n  max-width: 760px;\n  width: 100%;\n  margin: 0 auto;\n}\n.participant-tile {\n  border: 2px solid transparent;\n}\n.participant-tile.selected {\n  border-color: #6cadfb;\n}\n.participant-tile:hover {\n  border-color: #b0cbe9;\n}\n.local-tile {\n  flex-direction: column;\n  background:\n    radial-gradient(\n      ellipse at 50% 25%,\n      #3a3d45,\n      #27282c);\n}\n.local-avatar,\n.avatar-fallback {\n  border-radius: 50%;\n  background: #526479;\n  width: 52px;\n  height: 52px;\n  display: grid;\n  place-items: center;\n  font-size: 20px;\n}\n.camera-note {\n  margin-top: 12px;\n  color: #a7aab2;\n  font-size: 11px;\n}\n.avatar-fallback {\n  width: 90px;\n  height: 90px;\n  font-size: 30px;\n}\n.gallery-grid {\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  grid-auto-rows: minmax(0, 1fr);\n  gap: 12px;\n}\n.gallery-tile .tile-name {\n  font-size: 13px;\n}\n.gallery-tile:hover {\n  box-shadow: inset 0 0 0 2px #70aeef;\n}\n.call-sidebar {\n  width: 330px;\n  flex: none;\n  background: #25262b;\n  border-left: 1px solid #414248;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.call-sidebar > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 17px 18px;\n  border-bottom: 1px solid #424349;\n}\n.call-sidebar h2 {\n  font-size: 14px;\n}\n.call-sidebar header button {\n  display: grid;\n  place-items: center;\n  padding: 5px;\n}\n.people-list,\n.call-reports {\n  overflow: auto;\n  padding: 12px 18px;\n  flex: 1;\n}\n.people-list button,\n.you-row {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 10px;\n  text-align: left;\n  padding: 13px 0;\n}\n.people-list button > span:nth-child(2) {\n  flex: 1;\n}\n.people-list button > app-crisis-icon {\n  width: 14px;\n  color: #aeb0b8;\n}\n.person-avatar {\n  display: grid;\n  place-items: center;\n  background: #454e60;\n  color: #dbe4ed;\n  border-radius: 50%;\n  width: 34px;\n  height: 34px;\n  font-size: 11px;\n  flex: none;\n}\n.people-list strong {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n}\n.people-list small {\n  display: block;\n  color: #999fae;\n  font-size: 10px;\n  margin-top: 4px;\n}\n.people-list p {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #999fae;\n  margin-top: 20px;\n}\n.call-reports {\n  font-size: 12px;\n}\n.call-toolbar {\n  background: #232428;\n  border-top: 1px solid #3c3d43;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 18px;\n  flex: none;\n}\n.media-controls,\n.meeting-controls {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.call-toolbar button {\n  min-width: 58px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 10px;\n}\n.call-toolbar button:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.call-toolbar button:hover:not(:disabled) {\n  background: #41434a;\n}\n.call-toolbar button[aria-pressed=true] {\n  background: #353d49;\n  color: #aaceff;\n}\n.call-toolbar .share-control {\n  color: #7bdd8f;\n}\n.call-toolbar .leave-call {\n  background: #d83640;\n  min-width: 68px;\n  font-size: 12px;\n  color: white;\n  flex-direction: row;\n  gap: 8px;\n  padding: 10px 13px;\n}\n.call-toolbar .leave-call:hover {\n  background: #ec424d;\n}\n.call-toolbar .leave-call app-crisis-icon {\n  width: 18px;\n}\n.shared-table {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  border: 2px solid #6cd886;\n  border-radius: 7px;\n  background: #13202a;\n}\n.sharing-banner {\n  position: sticky;\n  top: 0;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 8px 14px;\n  background: #387448;\n  font-size: 11px;\n  z-index: 1;\n}\n.sharing-banner button {\n  margin-left: auto;\n  background: #df4448;\n  border-radius: 4px;\n  padding: 5px 9px;\n  font-size: 10px;\n}\n.briefing-sheet {\n  padding: 28px;\n  max-width: 850px;\n  margin: auto;\n}\n.briefing-sheet > span {\n  font-size: 9px;\n  color: #86b6be;\n  letter-spacing: 1.6px;\n}\n.briefing-sheet h3 {\n  font-size: 26px;\n  line-height: 1.2;\n  font-weight: 500;\n  margin: 12px 0;\n}\n.briefing-sheet p {\n  font-size: 13px;\n  color: #b9c6ce;\n  line-height: 1.6;\n}\n.briefing-metrics {\n  display: flex;\n  gap: 40px;\n  margin: 20px 0;\n}\n.briefing-metrics strong {\n  font-size: 26px;\n  font-weight: 400;\n}\n.briefing-metrics small {\n  display: block;\n  font-size: 10px;\n  color: #91a9b6;\n}\n.briefing-sheet article {\n  border-top: 1px solid #40535c;\n  padding: 16px 0;\n}\n.briefing-sheet article small {\n  font-size: 10px;\n  color: #8fbfc0;\n}\n.briefing-sheet h4 {\n  font-size: 16px;\n  margin: 6px 0;\n}\n.briefing-sheet > button {\n  color: #9ec8ef;\n  padding: 8px 0;\n}\n@keyframes call-open {\n  from {\n    opacity: 0;\n    transform: translate(10vw, 12vh) scale(0.83);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (max-width: 1050px) {\n  :host {\n    inset: 84px 16px 18px;\n  }\n  .call-topbar {\n    padding: 12px 15px;\n  }\n  .participant-strip {\n    height: 88px;\n  }\n  .call-stage {\n    padding: 10px;\n    gap: 8px;\n  }\n  .call-toolbar {\n    padding: 9px 10px;\n    gap: 6px;\n  }\n  .call-toolbar button {\n    padding: 6px;\n    min-width: 45px;\n    font-size: 9px;\n  }\n  .media-controls,\n  .meeting-controls {\n    gap: 3px;\n  }\n  .call-sidebar {\n    width: 290px;\n  }\n  .field-caption {\n    max-width: 54%;\n    right: 12px;\n    bottom: 18px;\n  }\n  .field-caption p {\n    font-size: 12px;\n  }\n  .speaker-identity {\n    left: 8px;\n    bottom: 12px;\n  }\n  .speaker-identity .tile-name {\n    font-size: 12px;\n  }\n}\n@media (max-width: 700px) {\n  :host {\n    inset: 100px 8px 12px;\n  }\n  .call-topbar {\n    padding: 12px;\n    gap: 6px;\n  }\n  .meeting-title {\n    gap: 8px;\n  }\n  .meeting-title h2 {\n    font-size: 13px;\n  }\n  .meeting-title span {\n    font-size: 9px;\n  }\n  .meeting-title > app-crisis-icon {\n    width: 20px;\n  }\n  .layout-button span {\n    display: none;\n  }\n  .call-top-actions {\n    gap: 5px;\n  }\n  .live-meeting {\n    font-size: 9px;\n    max-width: 95px;\n  }\n  .live-meeting app-crisis-icon {\n    display: none;\n  }\n  .call-body.has-panel .call-sidebar {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    z-index: 3;\n  }\n  .call-stage {\n    padding: 7px;\n  }\n  .participant-strip {\n    height: 72px;\n    gap: 5px;\n  }\n  .participant-strip .tile-name {\n    font-size: 8px;\n    left: 2px;\n    bottom: 2px;\n    padding: 2px 3px;\n    max-width: calc(100% - 4px);\n    white-space: nowrap;\n  }\n  .local-avatar {\n    width: 34px;\n    height: 34px;\n    font-size: 13px;\n  }\n  .speaker-tile img {\n    object-position: 50% 35%;\n    object-fit: cover;\n  }\n  .field-caption {\n    left: 12px;\n    right: 12px;\n    bottom: 72px;\n    max-width: none;\n  }\n  .speaker-identity {\n    bottom: 12px;\n    left: 6px;\n  }\n  .speaker-identity > span:last-child {\n    font-size: 10px;\n  }\n  .portrait-status {\n    font-size: 7px;\n    right: 7px;\n    top: 7px;\n  }\n  .call-toolbar {\n    flex-wrap: wrap;\n    gap: 7px;\n    padding: 10px 8px;\n  }\n  .meeting-controls {\n    order: 1;\n    flex: 1;\n    justify-content: center;\n  }\n  .media-controls {\n    gap: 0;\n  }\n  .media-controls button {\n    min-width: 39px;\n    font-size: 8px;\n  }\n  .call-toolbar app-crisis-icon {\n    width: 18px;\n    height: 18px;\n  }\n  .call-toolbar button {\n    min-width: 44px;\n    font-size: 8px;\n  }\n  .call-toolbar .leave-call {\n    min-width: 49px;\n    padding: 9px;\n    font-size: 10px;\n  }\n  .call-toolbar .leave-call app-crisis-icon {\n    display: none;\n  }\n  .call-toolbar .leave-call {\n    order: 2;\n  }\n  .media-controls {\n    width: 100%;\n    justify-content: center;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.0705882353);\n    padding-bottom: 5px;\n  }\n  .media-controls button {\n    flex-direction: row;\n    gap: 6px;\n  }\n  .gallery-grid {\n    gap: 6px;\n  }\n  .gallery-tile .tile-name {\n    font-size: 9px;\n  }\n  .briefing-sheet {\n    padding: 17px;\n  }\n  .briefing-sheet h3 {\n    font-size: 21px;\n  }\n  .sharing-banner {\n    font-size: 9px;\n    padding: 7px;\n    gap: 5px;\n  }\n  .sharing-banner button {\n    font-size: 8px;\n  }\n  .sharing-banner app-crisis-icon {\n    display: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  :host {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=crisis-conference.component.css.map */\n'] }]
  }], null, { workstation: [{ type: Input, args: [{ isSignal: true, alias: "workstation", required: true }] }], leave: [{ type: Output, args: ["leave"] }], locate: [{ type: Output, args: ["locate"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisConferenceComponent, { className: "CrisisConferenceComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-conference.component.ts", lineNumber: 22 });
})();

// src/app/templates/crisis-operations/ui/crisis-center.component.ts
var _forTrack010 = ($index, $item) => $item.id;
function CrisisCenterComponent_Conditional_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 41);
    \u0275\u0275listener("click", function CrisisCenterComponent_Conditional_31_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.navigate("station"));
    });
    \u0275\u0275element(2, "span", 42);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "My station ");
    \u0275\u0275elementStart(5, "b");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "app-crisis-icon", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.runtime.unread());
  }
}
function CrisisCenterComponent_Conditional_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1, " Room artwork could not load. All six operations consoles are available below. ");
    \u0275\u0275elementEnd();
  }
}
function CrisisCenterComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CrisisCenterComponent_Conditional_31_Conditional_0_Template, 8, 1, "div", 39);
    \u0275\u0275conditionalCreate(1, CrisisCenterComponent_Conditional_31_Conditional_1_Template, 2, 0, "p", 40);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r3.runtime.config.workstations?.length ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.imageFailed() ? 1 : -1);
  }
}
function CrisisCenterComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-crisis-conference", 43);
    \u0275\u0275listener("leave", function CrisisCenterComponent_Conditional_32_Template_app_crisis_conference_leave_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showView("room"));
    })("locate", function CrisisCenterComponent_Conditional_32_Template_app_crisis_conference_locate_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.locate($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("workstation", ctx_r3.selectedWorkstation());
  }
}
function CrisisCenterComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-crisis-weather-screen", 44);
    \u0275\u0275listener("leave", function CrisisCenterComponent_Conditional_33_Template_app_crisis_weather_screen_leave_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showView("room"));
    })("reports", function CrisisCenterComponent_Conditional_33_Template_app_crisis_weather_screen_reports_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openStationReports());
    })("locate", function CrisisCenterComponent_Conditional_33_Template_app_crisis_weather_screen_locate_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.locate($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("weather", ctx);
  }
}
function CrisisCenterComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 23)(1, "header", 45)(2, "div")(3, "h2", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 47);
    \u0275\u0275listener("click", function CrisisCenterComponent_Conditional_34_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showView("room"));
    });
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Return to room");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "app-crisis-icon", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 49)(10, "app-crisis-console", 50);
    \u0275\u0275listener("navigate", function CrisisCenterComponent_Conditional_34_Template_app_crisis_console_navigate_10_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigate($event));
    })("inspectLocation", function CrisisCenterComponent_Conditional_34_Template_app_crisis_console_inspectLocation_10_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.locate($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r3.viewTitle());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.viewTitle());
    \u0275\u0275advance(6);
    \u0275\u0275property("view", ctx_r3.view())("suggestedActionId", ctx_r3.suggestedActionId())("workstation", ctx_r3.selectedWorkstation());
  }
}
function CrisisCenterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 51)(1, "div")(2, "h2", 46);
    \u0275\u0275text(3, "Monitor wall");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 47);
    \u0275\u0275listener("click", function CrisisCenterComponent_Conditional_35_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showView("room"));
    });
    \u0275\u0275text(5, " Return to room ");
    \u0275\u0275element(6, "app-crisis-icon", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 52);
    \u0275\u0275element(8, "i");
    \u0275\u0275text(9, " Select a screen to inspect. Click the surrounding room to step back \xB7 Esc ");
    \u0275\u0275elementEnd();
  }
}
function CrisisCenterComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-crisis-table-controls", 53);
    \u0275\u0275listener("layerChanged", function CrisisCenterComponent_Conditional_36_Template_app_crisis_table_controls_layerChanged_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.layer.set($event));
    })("zoomChanged", function CrisisCenterComponent_Conditional_36_Template_app_crisis_table_controls_zoomChanged_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.changeZoom($event));
    })("locationSelected", function CrisisCenterComponent_Conditional_36_Template_app_crisis_table_controls_locationSelected_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectLocation($event));
    })("navigate", function CrisisCenterComponent_Conditional_36_Template_app_crisis_table_controls_navigate_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showView($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("selectedLocation", ctx_r3.selectedLocation())("layer", ctx_r3.layer())("zoom", ctx_r3.zoom());
  }
}
function CrisisCenterComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.runtime.storageNotice());
  }
}
function CrisisCenterComponent_For_42_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 56);
  }
}
function CrisisCenterComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function CrisisCenterComponent_For_42_Template_button_click_0_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigate(item_r11.id));
    });
    \u0275\u0275element(1, "app-crisis-icon", 16);
    \u0275\u0275elementStart(2, "span", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CrisisCenterComponent_For_42_Conditional_4_Template, 1, 0, "i", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r3.view() === item_r11.id);
    \u0275\u0275property("title", item_r11.title + " \xB7 " + item_r11.code);
    \u0275\u0275attribute("data-view", item_r11.id)("aria-label", item_r11.title)("aria-pressed", ctx_r3.view() === item_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r11.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r11.id === "station" && ctx_r3.runtime.unread() > 0 ? 4 : -1);
  }
}
function CrisisCenterComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 57);
    \u0275\u0275listener("click", function CrisisCenterComponent_Conditional_52_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.message.set(""));
    });
    \u0275\u0275element(4, "app-crisis-icon", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.message());
  }
}
var CrisisCenterComponent = class _CrisisCenterComponent {
  runtime = inject(CrisisRuntimeService);
  element = inject(ElementRef);
  view = signal(
    "room",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  layer = signal(
    "hazard",
    ...ngDevMode ? [{ debugName: "layer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLocation = signal(
    this.runtime.config.locations[0].id,
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = signal(
    1,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  running = signal(
    false,
    ...ngDevMode ? [{ debugName: "running" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioEnabled = signal(
    false,
    ...ngDevMode ? [{ debugName: "audioEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fullscreen = signal(
    false,
    ...ngDevMode ? [{ debugName: "fullscreen" }] : (
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
  imageFailed = signal(
    false,
    ...ngDevMode ? [{ debugName: "imageFailed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  robotRoaming = signal(
    true,
    ...ngDevMode ? [{ debugName: "robotRoaming" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestedActionId = signal(
    "",
    ...ngDevMode ? [{ debugName: "suggestedActionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workstationId = signal(
    "",
    ...ngDevMode ? [{ debugName: "workstationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stationReports = signal(
    false,
    ...ngDevMode ? [{ debugName: "stationReports" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedWorkstation = computed(
    () => this.runtime.config.workstations?.find((station) => station.id === this.workstationId()),
    ...ngDevMode ? [{ debugName: "selectedWorkstation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  conference = computed(
    () => this.view() === "station" && !this.stationReports() ? this.selectedWorkstation()?.conference : void 0,
    ...ngDevMode ? [{ debugName: "conference" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weather = computed(
    () => this.view() === "station" && !this.stationReports() ? this.selectedWorkstation()?.weather : void 0,
    ...ngDevMode ? [{ debugName: "weather" }] : (
      /* istanbul ignore next */
      []
    )
  );
  specializedStation = computed(
    () => !!this.conference() || !!this.weather(),
    ...ngDevMode ? [{ debugName: "specializedStation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locations = this.runtime.config.locations;
  views = [
    { id: "room", name: "Room", title: "Operations room", code: "01" },
    { id: "map", name: "Table", title: "Situation table", code: "02" },
    { id: "news", name: "Wall", title: "Monitor wall", code: "03" },
    { id: "station", name: "Reports", title: "My station", code: "04" },
    { id: "argus", name: "ARGUS", title: "Call ARGUS", code: "05" },
    { id: "command", name: "Command", title: "Command console", code: "06" }
  ];
  viewTitle = computed(
    () => this.view() === "station" && this.selectedWorkstation() ? this.selectedWorkstation().name : this.views.find((v) => v.id === this.view()).title,
    ...ngDevMode ? [{ debugName: "viewTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  focusTimer;
  audio;
  previousFocus;
  previousRoomSurface;
  onFullscreen = () => this.fullscreen.set(document.fullscreenElement === this.element.nativeElement);
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === "room" || target === "map" || target === "news" || target === "station" || target === "command")
        this.navigate(target);
    });
    document.addEventListener("fullscreenchange", this.onFullscreen);
  }
  openWorkstation(id) {
    const station = this.runtime.config.workstations?.find((item) => item.id === id);
    if (!station)
      return;
    this.stationReports.set(false);
    this.workstationId.set(id);
    if (!station.roleIds.includes(this.runtime.state().roleId))
      this.runtime.selectRole(station.roleIds[0]);
    this.showView("station");
  }
  navigate(view) {
    if (view === "station")
      this.workstationId.set("");
    this.showView(view);
  }
  openStationReports() {
    this.stationReports.set(true);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.element.nativeElement.querySelector("[data-panel-heading]")?.focus({ preventScroll: true }), 0);
  }
  showView(view) {
    if (this.view() === view)
      return;
    const sourceFocus = document.activeElement;
    if (this.view() === "room" && document.activeElement instanceof HTMLElement) {
      this.previousFocus = document.activeElement;
      const surface = this.previousFocus.closest("[data-room-entry]")?.dataset["roomEntry"];
      this.previousRoomSurface = surface === "map" || surface === "news" ? surface : void 0;
    }
    this.view.set(view);
    if (view !== "command")
      this.suggestedActionId.set("");
    this.runtime.message.set("");
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      if (this.view() !== view || document.activeElement !== sourceFocus && document.activeElement !== document.body)
        return;
      if (view !== "room")
        this.element.nativeElement.querySelector("[data-panel-heading]")?.focus({ preventScroll: true });
      else if (this.previousFocus?.isConnected)
        this.previousFocus.focus({ preventScroll: true });
      else
        this.element.nativeElement.querySelector(this.previousRoomSurface ? `[data-room-entry="${this.previousRoomSurface}"]` : '.view-button[data-view="room"]')?.focus({ preventScroll: true });
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : CRISIS_CAMERA_TRANSITION_MS);
  }
  locate(id) {
    this.selectedLocation.set(id);
    this.showView("map");
  }
  reviewSuggestedAction(id) {
    this.suggestedActionId.set(id);
    this.showView("command");
  }
  selectLocation(id) {
    this.selectedLocation.set(id);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const heading = this.element.nativeElement.querySelector(".location-inspector h2");
      heading?.scrollIntoView({ block: "nearest", behavior: "instant" });
      heading?.focus({ preventScroll: true });
    }, 0);
  }
  advance() {
    if (this.runtime.advance() && this.audioEnabled())
      this.chime();
    if (this.runtime.finished()) {
      this.running.set(false);
      clearInterval(this.timer);
    }
  }
  toggleRunning() {
    this.running.update((value) => !value);
    clearInterval(this.timer);
    if (this.running())
      this.timer = setInterval(() => this.advance(), this.runtime.config.bulletinIntervalSeconds * 1e3);
  }
  async toggleAudio() {
    if (this.audioEnabled()) {
      this.audioEnabled.set(false);
      return;
    }
    try {
      this.audio ??= new AudioContext();
      await this.audio.resume();
      this.audioEnabled.set(true);
      this.chime();
    } catch {
      this.runtime.message.set("Audio alerts are unavailable in this browser.");
    }
  }
  chime() {
    if (!this.audio)
      return;
    const oscillator = this.audio.createOscillator(), gain = this.audio.createGain(), start = this.audio.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(540, start);
    oscillator.frequency.setValueAtTime(720, start + 0.12);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.055, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(1e-3, start + 0.5);
    oscillator.connect(gain);
    gain.connect(this.audio.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.55);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }
  async toggleFullscreen() {
    try {
      if (document.fullscreenElement)
        await document.exitFullscreen();
      else
        await this.element.nativeElement.requestFullscreen();
    } catch {
      this.runtime.message.set("Full screen is unavailable. The room still works in this view.");
    }
  }
  changeZoom(delta) {
    this.zoom.update((n) => Math.min(1.45, Math.max(1, Math.round((n + delta) * 10) / 10)));
  }
  resetExercise() {
    clearInterval(this.timer);
    this.running.set(false);
    this.runtime.reset();
    this.resetOpen.set(false);
    this.selectedLocation.set(this.locations[0].id);
    this.showView("room");
  }
  shortcut(event) {
    if (event.key === "Escape" && !this.resetOpen() && this.view() !== "room") {
      event.preventDefault();
      this.showView("room");
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey || this.resetOpen() || event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(event.target.tagName)))
      return;
    if (event.key === "Escape" && this.view() !== "room") {
      event.preventDefault();
      this.showView("room");
    }
    const position = Number(event.key) - 1;
    if (position >= 0 && position < this.views.length && /^\d$/.test(event.key)) {
      event.preventDefault();
      this.navigate(this.views[position].id);
    }
  }
  ngOnDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.focusTimer);
    document.removeEventListener("fullscreenchange", this.onFullscreen);
    void this.audio?.close();
  }
  static \u0275fac = function CrisisCenterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CrisisCenterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrisisCenterComponent, selectors: [["app-crisis-center"]], hostBindings: function CrisisCenterComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function CrisisCenterComponent_keydown_HostBindingHandler($event) {
        return ctx.shortcut($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 68, vars: 47, consts: [["resetDialog", ""], [1, "crisis-room"], [3, "navigate", "locate", "locationSelected", "imageFailed", "config", "state", "selectedLocation", "view", "layer", "zoom"], ["aria-hidden", "true", 1, "edge-vignette"], [3, "open", "view"], [3, "open", "view", "roaming"], [1, "room-hud"], [1, "operation-identity"], ["routerLink", "/projects", "aria-label", "Return to project library", "title", "Return to projects", 1, "icon-control", "exit-room"], ["name", "back"], [1, "eyebrow"], [1, "hud-status"], [1, "alert-state"], [1, "sim-clock"], [1, "hud-tools"], [1, "icon-control", 3, "click", "title"], [3, "name"], ["title", "Full screen", 1, "icon-control", "fullscreen-control", 3, "click"], ["name", "expand"], ["aria-label", "Reset local exercise", "title", "Reset exercise", 1, "icon-control", 3, "click"], ["name", "reset"], [3, "workstation"], [3, "weather"], [1, "focus-console"], [3, "selectedLocation", "layer", "zoom"], [3, "roamingChanged", "navigate", "locate", "reviewAction", "active", "roaming", "selectedLocation"], [1, "operations-footer"], ["role", "status", 1, "storage-note"], ["aria-label", "Operations room views", 1, "view-dock"], [1, "view-button", 3, "active", "title"], [1, "scenario-controls"], [1, "play-button", 3, "click", "disabled", "title"], [1, "next-update", 3, "click", "disabled"], ["name", "arrow"], ["role", "status", 1, "room-notice"], ["aria-live", "polite", 1, "sr-only"], [1, "reset-dialog", 3, "close", "cancel"], ["autofocus", "", 3, "click"], [1, "confirm-reset", 3, "click"], [1, "spatial-controls"], ["role", "status", 1, "art-error"], [1, "spatial-target", "station-target", 3, "click"], [1, "target-dot"], [3, "leave", "locate", "workstation"], [3, "leave", "reports", "locate", "weather"], [1, "console-chrome"], ["tabindex", "-1", "data-panel-heading", ""], ["aria-label", "Return to room", 1, "return-room", 3, "click"], ["name", "close"], [1, "console-content"], [3, "navigate", "inspectLocation", "view", "suggestedActionId", "workstation"], [1, "wall-heading"], [1, "wall-guidance"], [3, "layerChanged", "zoomChanged", "locationSelected", "navigate", "selectedLocation", "layer", "zoom"], [1, "view-button", 3, "click", "title"], [1, "view-name"], [1, "unread-dot"], ["aria-label", "Dismiss message", 1, "icon-control", 3, "click"]], template: function CrisisCenterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "main", 1)(1, "app-crisis-room-scene", 2);
      \u0275\u0275listener("navigate", function CrisisCenterComponent_Template_app_crisis_room_scene_navigate_1_listener($event) {
        return ctx.showView($event);
      })("locate", function CrisisCenterComponent_Template_app_crisis_room_scene_locate_1_listener($event) {
        return ctx.locate($event);
      })("locationSelected", function CrisisCenterComponent_Template_app_crisis_room_scene_locationSelected_1_listener($event) {
        return ctx.selectLocation($event);
      })("imageFailed", function CrisisCenterComponent_Template_app_crisis_room_scene_imageFailed_1_listener() {
        return ctx.imageFailed.set(true);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(2, "div", 3);
      \u0275\u0275elementStart(3, "app-crisis-workstations", 4);
      \u0275\u0275listener("open", function CrisisCenterComponent_Template_app_crisis_workstations_open_3_listener($event) {
        return ctx.openWorkstation($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-crisis-robot", 5);
      \u0275\u0275listener("open", function CrisisCenterComponent_Template_app_crisis_robot_open_4_listener() {
        return ctx.showView("argus");
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "app-workspace-tools")(6, "header", 6)(7, "div", 7)(8, "a", 8);
      \u0275\u0275element(9, "app-crisis-icon", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div")(11, "span", 10);
      \u0275\u0275text(12, "CRISIS CENTER");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "h1");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 11)(16, "span", 12);
      \u0275\u0275element(17, "i");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 13)(20, "strong");
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, "EXERCISE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 14)(25, "button", 15);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_25_listener() {
        return ctx.toggleAudio();
      });
      \u0275\u0275element(26, "app-crisis-icon", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 17);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_27_listener() {
        return ctx.toggleFullscreen();
      });
      \u0275\u0275element(28, "app-crisis-icon", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 19);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_29_listener() {
        \u0275\u0275restoreView(_r1);
        const resetDialog_r2 = \u0275\u0275reference(56);
        ctx.resetOpen.set(true);
        return \u0275\u0275resetView(resetDialog_r2.showModal());
      });
      \u0275\u0275element(30, "app-crisis-icon", 20);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(31, CrisisCenterComponent_Conditional_31_Template, 2, 2);
      \u0275\u0275conditionalCreate(32, CrisisCenterComponent_Conditional_32_Template, 1, 1, "app-crisis-conference", 21);
      \u0275\u0275conditionalCreate(33, CrisisCenterComponent_Conditional_33_Template, 1, 1, "app-crisis-weather-screen", 22);
      \u0275\u0275conditionalCreate(34, CrisisCenterComponent_Conditional_34_Template, 11, 5, "section", 23);
      \u0275\u0275conditionalCreate(35, CrisisCenterComponent_Conditional_35_Template, 10, 0);
      \u0275\u0275conditionalCreate(36, CrisisCenterComponent_Conditional_36_Template, 1, 3, "app-crisis-table-controls", 24);
      \u0275\u0275elementStart(37, "app-crisis-companion-briefing", 25);
      \u0275\u0275listener("roamingChanged", function CrisisCenterComponent_Template_app_crisis_companion_briefing_roamingChanged_37_listener($event) {
        return ctx.robotRoaming.set($event);
      })("navigate", function CrisisCenterComponent_Template_app_crisis_companion_briefing_navigate_37_listener($event) {
        return ctx.showView($event);
      })("locate", function CrisisCenterComponent_Template_app_crisis_companion_briefing_locate_37_listener($event) {
        return ctx.locate($event);
      })("reviewAction", function CrisisCenterComponent_Template_app_crisis_companion_briefing_reviewAction_37_listener($event) {
        return ctx.reviewSuggestedAction($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "footer", 26);
      \u0275\u0275conditionalCreate(39, CrisisCenterComponent_Conditional_39_Template, 2, 1, "p", 27);
      \u0275\u0275elementStart(40, "nav", 28);
      \u0275\u0275repeaterCreate(41, CrisisCenterComponent_For_42_Template, 5, 9, "button", 29, _forTrack010);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 30)(44, "span");
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div")(47, "button", 31);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_47_listener() {
        return ctx.toggleRunning();
      });
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 32);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_49_listener() {
        return ctx.advance();
      });
      \u0275\u0275text(50);
      \u0275\u0275element(51, "app-crisis-icon", 33);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(52, CrisisCenterComponent_Conditional_52_Template, 5, 1, "div", 34);
      \u0275\u0275elementStart(53, "span", 35);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "dialog", 36, 0);
      \u0275\u0275listener("close", function CrisisCenterComponent_Template_dialog_close_55_listener() {
        return ctx.resetOpen.set(false);
      })("cancel", function CrisisCenterComponent_Template_dialog_cancel_55_listener() {
        return ctx.resetOpen.set(false);
      });
      \u0275\u0275elementStart(57, "span", 10);
      \u0275\u0275text(58, "LOCAL EXERCISE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "h2");
      \u0275\u0275text(60, "Start a fresh response?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "p");
      \u0275\u0275text(62, "This clears the current orders, pinned reports, and timeline on this device.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div")(64, "button", 37);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_64_listener() {
        \u0275\u0275restoreView(_r1);
        const resetDialog_r2 = \u0275\u0275reference(56);
        return \u0275\u0275resetView(resetDialog_r2.close());
      });
      \u0275\u0275text(65, "Keep current response");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "button", 38);
      \u0275\u0275listener("click", function CrisisCenterComponent_Template_button_click_66_listener() {
        \u0275\u0275restoreView(_r1);
        const resetDialog_r2 = \u0275\u0275reference(56);
        ctx.resetExercise();
        return \u0275\u0275resetView(resetDialog_r2.close());
      });
      \u0275\u0275text(67, " Reset exercise ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_24_0;
      \u0275\u0275classProp("focused", ctx.view() !== "room")("specialized-station", ctx.specializedStation());
      \u0275\u0275attribute("data-view", ctx.view())("data-alert", ctx.runtime.bulletin().alert);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.runtime.config)("state", ctx.runtime.state())("selectedLocation", ctx.selectedLocation())("view", ctx.view())("layer", ctx.layer())("zoom", ctx.zoom());
      \u0275\u0275advance(2);
      \u0275\u0275property("view", ctx.view());
      \u0275\u0275advance();
      \u0275\u0275property("view", ctx.view())("roaming", ctx.robotRoaming());
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.config.title, " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.bulletin().alert.toUpperCase());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.time());
      \u0275\u0275advance(4);
      \u0275\u0275property("title", ctx.audioEnabled() ? "Mute alert tones" : "Enable alert tones");
      \u0275\u0275attribute("aria-label", ctx.audioEnabled() ? "Mute alert tones" : "Enable alert tones")("aria-pressed", ctx.audioEnabled());
      \u0275\u0275advance();
      \u0275\u0275property("name", ctx.audioEnabled() ? "sound" : "mute");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.fullscreen() ? "Exit full screen" : "Enter full screen");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.view() === "room" ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.conference() ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_24_0 = ctx.weather()) ? 33 : -1, tmp_24_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() !== "room" && ctx.view() !== "news" && ctx.view() !== "map" && ctx.view() !== "argus" && !ctx.specializedStation() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "news" ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view() === "map" ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("active", ctx.view() === "argus")("roaming", ctx.robotRoaming())("selectedLocation", ctx.selectedLocation());
      \u0275\u0275advance();
      \u0275\u0275attribute("inert", ctx.specializedStation() ? "" : null)("aria-hidden", ctx.specializedStation() ? true : null);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.storageNotice() ? 39 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.views);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("", ctx.runtime.state().stage + 1, " / ", ctx.runtime.config.bulletins.length, " UPDATES");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.runtime.finished())("title", ctx.running() ? "Pause updates" : "Auto-play updates every " + ctx.runtime.config.bulletinIntervalSeconds + " seconds");
      \u0275\u0275attribute("aria-label", ctx.running() ? "Pause scenario updates" : "Auto-play scenario updates");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.running() ? "\u2161" : "\u25B7");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.runtime.finished());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.runtime.finished() ? "All updates received" : "Next update");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.message() ? 52 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3("Update ", ctx.runtime.state().stage + 1, ". ", ctx.runtime.bulletin().title, " ", ctx.runtime.crews(), " crews available.");
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    RouterLink,
    CrisisIconComponent,
    CrisisTableControlsComponent,
    CrisisConsoleComponent,
    CrisisRoomSceneComponent,
    CrisisCompanionBriefingComponent,
    CrisisRobotComponent,
    CrisisWorkstationsComponent,
    CrisisConferenceComponent,
    CrisisWeatherScreenComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #061018;\n  color: #dae8e9;\n  font-family:\n    "Segoe UI",\n    Arial,\n    sans-serif;\n  font-size: 14px;\n  --%NS%cyan: #9ed8d4;\n  --%NS%muted: #91aab8;\n  --%NS%amber: #efbd7e;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #b7ebd8;\n  outline-offset: 4px;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%] {\n  font-weight: 450;\n}\n.crisis-room[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100dvh;\n  min-height: 650px;\n  overflow: hidden;\n  isolation: isolate;\n  background: #06121c;\n}\n.edge-vignette[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(7, 21, 32, 0.7333333333),\n      transparent 19%,\n      transparent 60%,\n      rgba(7, 17, 28, 0.7490196078) 89%,\n      rgba(7, 17, 28, 0.9411764706)),\n    linear-gradient(\n      90deg,\n      rgba(6, 19, 28, 0.2196078431),\n      transparent 30%,\n      transparent 70%,\n      rgba(6, 19, 28, 0.2196078431));\n}\n.room-hud[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n  padding: 26px 32px;\n  z-index: 4;\n  background: linear-gradient(rgba(5, 18, 27, 0.7411764706), transparent);\n  pointer-events: none;\n}\n.room-hud[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  pointer-events: auto;\n}\n.operation-identity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.icon-control[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid transparent;\n  padding: 7px;\n  color: #a3bbc5;\n  width: 35px;\n  height: 35px;\n  text-decoration: none;\n}\n.icon-control[_ngcontent-%COMP%]:hover {\n  background: rgba(24, 52, 64, 0.6705882353);\n  border-color: #4b6e7a;\n}\n.exit-room[_ngcontent-%COMP%] {\n  margin-right: 1px;\n  width: 30px;\n}\n.operation-symbol[_ngcontent-%COMP%] {\n  height: 34px;\n  width: 34px;\n  border: 1px solid #a5cccc;\n  transform: rotate(45deg);\n  position: relative;\n  margin-right: 5px;\n}\n.operation-symbol[_ngcontent-%COMP%]:before {\n  content: "";\n  position: absolute;\n  inset: 6px;\n  border: 1px solid #7faaaa;\n}\n.operation-symbol[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 11px;\n  background: #b4d8d3;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font:\n    9px Consolas,\n    "Courier New",\n    monospace;\n  letter-spacing: 2px;\n  color: #a5bfc6;\n  display: block;\n}\n.operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 19px;\n  letter-spacing: 0.1px;\n  margin-top: 6px;\n  white-space: nowrap;\n}\n.operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 10px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7895a5;\n  margin-left: 13px;\n}\n.hud-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 25px;\n}\n.alert-state[_ngcontent-%COMP%] {\n  font: 10px Consolas, monospace;\n  letter-spacing: 2px;\n  color: var(--%NS%amber);\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.alert-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.transmission-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--%NS%amber);\n  box-shadow: 0 0 9px rgba(239, 189, 126, 0.2666666667);\n}\n.sim-clock[_ngcontent-%COMP%] {\n  padding-left: 24px;\n  border-left: 1px solid rgba(93, 120, 141, 0.3333333333);\n  text-align: center;\n}\n.sim-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font: 22px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #d8e5e9;\n}\n.sim-clock[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 7px Consolas, monospace;\n  color: #8ba6b5;\n  letter-spacing: 1.5px;\n  display: block;\n  margin-top: 4px;\n}\n.hud-tools[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n}\n.room-context[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 130px;\n  left: 83px;\n}\n.room-context[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #8ba7b5;\n  letter-spacing: 1.6px;\n}\n.room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 350;\n  line-height: 1.45;\n  margin-top: 16px;\n  color: #d2e0e6;\n  text-shadow: 0 2px 12px #07111b;\n}\n.room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: #92afba;\n}\n.context-coordinate[_ngcontent-%COMP%] {\n  display: block;\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.2px;\n  color: #7393a4;\n  margin-top: 24px;\n}\n.context-coordinate[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  padding: 0 5px;\n  color: #b3d5d0;\n}\n.spatial-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.spatial-target[_ngcontent-%COMP%] {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 11px;\n  pointer-events: auto;\n  background: transparent;\n  border: 0;\n  padding: 10px;\n  color: #cfdee4;\n}\n.target-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #c4e6e2;\n  box-shadow:\n    0 0 0 5px rgba(157, 204, 207, 0.0784313725),\n    0 0 0 6px rgba(145, 189, 193, 0.3098039216),\n    0 0 16px rgba(177, 233, 235, 0.4666666667);\n}\n.spatial-target[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.target-dot) {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  background: rgba(10, 31, 45, 0.8549019608);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 10px 15px;\n  border: 1px solid rgba(127, 169, 181, 0.3137254902);\n  font-size: 11px;\n  letter-spacing: 0.2px;\n  box-shadow: 0 5px 30px rgba(2, 12, 22, 0.5647058824);\n}\n.spatial-target[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  color: #9bbec4;\n}\n.spatial-target[_ngcontent-%COMP%]:hover    > span[_ngcontent-%COMP%]:not(.target-dot) {\n  border-color: #b0d6d2;\n  background: #163440;\n}\n.spatial-target[_ngcontent-%COMP%]:hover   .target-dot[_ngcontent-%COMP%] {\n  box-shadow:\n    0 0 0 7px rgba(169, 215, 207, 0.1490196078),\n    0 0 0 8px rgba(183, 237, 228, 0.4196078431),\n    0 0 19px rgba(177, 233, 235, 0.6666666667);\n}\n.spatial-target[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font: 9px Consolas, monospace;\n  border-radius: 2px;\n  color: #edc186;\n  background: rgba(75, 66, 49, 0.5019607843);\n  padding: 3px 5px;\n  margin-left: -6px;\n}\n.station-target[_ngcontent-%COMP%] {\n  left: 14%;\n  top: 59%;\n  transform: translateX(-50%);\n}\n.argus-target[_ngcontent-%COMP%] {\n  left: 78.5%;\n  top: 57%;\n  transform: translateX(-50%);\n}\n.incoming-transmission[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 40px;\n  bottom: 139px;\n  width: 318px;\n  padding: 16px 17px;\n  background:\n    linear-gradient(\n      120deg,\n      rgba(13, 36, 48, 0.9019607843),\n      rgba(16, 35, 43, 0.7215686275));\n  border: 1px solid rgba(82, 106, 119, 0.3333333333);\n  border-left: 2px solid #d2af79;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.transmission-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.2px;\n  color: #e0bd86;\n}\n.transmission-label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #87a4b3;\n}\n.transmission-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 4px;\n  height: 4px;\n}\n.incoming-transmission[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  border: 0;\n  padding: 12px 0 0;\n  background: transparent;\n  text-align: left;\n  font-size: 14px;\n  font-weight: 450;\n  line-height: 1.4;\n}\n.incoming-transmission[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 16px;\n}\n.incoming-transmission[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #91adb9;\n  font-size: 10px;\n  line-height: 1.7;\n  margin-top: 9px;\n}\n.room-readout[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 143px;\n  right: 40px;\n  width: 235px;\n  color: #a5bfca;\n  padding: 17px 0 0 18px;\n  border-left: 1px solid rgba(119, 150, 162, 0.3333333333);\n}\n@media (min-width: 701px) {\n  .crisis-room[data-view=room][_ngcontent-%COMP%]   .room-readout[_ngcontent-%COMP%] {\n    top: 120px;\n    bottom: auto;\n  }\n}\n.room-readout[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #7696a6;\n}\n.room-readout[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.room-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 30px;\n  font-weight: 300;\n  letter-spacing: 1px;\n  color: #d1e0e7;\n}\n.room-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.3px;\n  margin-top: 4px;\n}\n.room-readout[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: transparent;\n  border: 0;\n  padding: 8px 0;\n  font-size: 10px;\n  color: #95b3be;\n}\n.room-readout[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n}\n.operations-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: auto 0 0;\n  padding: 21px 32px 25px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  z-index: 5;\n  background: linear-gradient(transparent, rgba(5, 19, 28, 0.9215686275) 60%);\n}\n.footer-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  flex: 1;\n  min-width: 0;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.3px;\n  color: #b2c9cb;\n}\n.connection-light[_ngcontent-%COMP%] {\n  display: block;\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #a4cfb7;\n  margin-top: 2px;\n}\n.footer-meta[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 6px/1.9 Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #6e94a5;\n  margin-top: 6px;\n  max-width: 170px;\n}\n.view-dock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid rgba(86, 123, 137, 0.3490196078);\n  border-radius: 6px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 48, 64, 0.8509803922),\n      rgba(13, 32, 44, 0.8745098039));\n  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.2666666667), inset 0 1px rgba(184, 213, 220, 0.0705882353);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  padding: 6px;\n}\n.view-button[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  min-width: 94px;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  padding: 14px 10px 10px;\n  color: #89a6b6;\n  transition: background 0.2s, color 0.2s;\n}\n.view-button.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(57, 84, 90, 0.5333333333),\n      rgba(54, 85, 89, 0.3333333333));\n  border-color: rgba(139, 173, 167, 0.3607843137);\n  color: #cfebe5;\n}\n.view-button.active[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  left: 26%;\n  right: 26%;\n  bottom: -7px;\n  height: 2px;\n  background: #c0ddc9;\n  box-shadow: 0 0 10px rgba(189, 228, 204, 0.4);\n}\n.view-button[_ngcontent-%COMP%]:hover {\n  background: rgba(54, 81, 92, 0.4);\n  color: #d4e5e7;\n}\n.view-index[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 7px;\n  top: 5px;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: rgba(118, 150, 164, 0.5607843137);\n}\n.view-name[_ngcontent-%COMP%] {\n  font-size: 9px;\n  white-space: nowrap;\n}\n.view-button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 24px;\n  width: 4px;\n  height: 4px;\n  background: #e8b47a;\n  border-radius: 50%;\n  box-shadow: 0 0 6px rgba(231, 184, 139, 0.4);\n}\n.scenario-controls[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 10px;\n}\n.scenario-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.6px;\n  color: #8da6b3;\n}\n.scenario-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.play-button[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 30px;\n  border: 1px solid rgba(70, 99, 114, 0.5333333333);\n  background: rgba(15, 37, 50, 0.631372549);\n  color: #c4d9dc;\n  font-size: 17px;\n  display: grid;\n  place-items: center;\n}\n.next-update[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: transparent;\n  border: 0;\n  padding: 5px 0 5px 5px;\n  font-size: 10px;\n  color: #c1d3d9;\n  white-space: nowrap;\n}\n.next-update[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.focused[_ngcontent-%COMP%]   .edge-vignette[_ngcontent-%COMP%] {\n  background: rgba(3, 17, 27, 0.2196078431);\n}\n.focus-console[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 105px;\n  bottom: 132px;\n  left: max(40px, (100vw - 1200px) / 2);\n  right: max(40px, (100vw - 1200px) / 2);\n  background:\n    linear-gradient(\n      145deg,\n      rgba(16, 40, 51, 0.9607843137),\n      rgba(10, 29, 42, 0.9803921569) 80%);\n  border: 1px solid rgba(117, 146, 155, 0.4);\n  box-shadow: 0 20px 120px rgba(0, 0, 0, 0.6), inset 0 1px rgba(181, 210, 210, 0.0784313725);\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  animation: _ngcontent-%COMP%_console-in 0.4s ease-out;\n}\n.console-chrome[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 23px;\n  border-bottom: 1px solid rgba(88, 114, 125, 0.4);\n  background: rgba(22, 46, 59, 0.5333333333);\n  gap: 20px;\n  flex-shrink: 0;\n}\n.console-chrome[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n.console-status-dot[_ngcontent-%COMP%] {\n  height: 5px;\n  width: 5px;\n  border-radius: 50%;\n  background: #99cdbc;\n  box-shadow: 0 0 7px rgba(182, 223, 196, 0.3333333333);\n}\n.console-chrome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  outline: none;\n}\n.console-reference[_ngcontent-%COMP%] {\n  font: 8px Consolas, monospace;\n  color: #769aab;\n  letter-spacing: 1px;\n  margin-left: 14px;\n}\n.return-room[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  border: 0;\n  background: transparent;\n  color: #a8bfca;\n  font-size: 10px;\n  padding: 0;\n}\n.return-room[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.return-room[_ngcontent-%COMP%]:hover {\n  color: #f1e5ce;\n}\n.console-content[_ngcontent-%COMP%] {\n  padding: 26px 30px;\n  overflow: auto;\n  min-height: 0;\n  scrollbar-width: thin;\n  scrollbar-color: #426773 transparent;\n}\n.room-notice[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 128px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 6;\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  border: 1px solid rgba(156, 162, 132, 0.6);\n  background: rgba(33, 56, 51, 0.9607843137);\n  color: #d9e9d6;\n  padding: 10px 14px 10px 20px;\n  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4);\n  max-width: min(90vw, 700px);\n  font-size: 12px;\n}\n.room-notice[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.art-error[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 35%;\n  left: 30%;\n  right: 30%;\n  font-size: 12px;\n  color: #bdd1d7;\n  text-align: center;\n}\n.reset-dialog[_ngcontent-%COMP%] {\n  color: #d2e2e3;\n  background: #102935;\n  border: 1px solid rgba(130, 158, 171, 0.4);\n  max-width: 480px;\n  padding: 30px;\n  font-family: "Segoe UI", sans-serif;\n  box-shadow: 0 20px 120px rgba(0, 0, 0, 0.6);\n}\n.reset-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(2, 13, 23, 0.6509803922);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.reset-dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  font-size: 25px;\n}\n.reset-dialog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.8;\n  color: #a6bdc7;\n}\n.reset-dialog[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 28px;\n}\n.reset-dialog[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #567681;\n  background: #163643;\n  color: #d4e4e8;\n  font-size: 12px;\n  padding: 12px;\n}\n.reset-dialog[_ngcontent-%COMP%]   .confirm-reset[_ngcontent-%COMP%] {\n  background: #b9d9c7;\n  color: #16382f;\n}\n.crisis-room[data-alert=Critical][_ngcontent-%COMP%] {\n  --%NS%amber: #f2a182;\n}\n.crisis-room[data-alert=Critical][_ngcontent-%COMP%]   .room-shade[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(183, 63, 35, 0.0901960784),\n      transparent 35%,\n      transparent 65%,\n      rgba(183, 63, 35, 0.0901960784));\n}\n@keyframes _ngcontent-%COMP%_console-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.99);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (min-width: 1700px) {\n  .room-hud[_ngcontent-%COMP%] {\n    padding: 32px 48px;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    top: 150px;\n    left: 102px;\n  }\n  .room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%] {\n    left: 55px;\n    bottom: 165px;\n    width: 370px;\n    padding: 20px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .transmission-label[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .room-readout[_ngcontent-%COMP%] {\n    right: 55px;\n    bottom: 165px;\n  }\n  .operations-footer[_ngcontent-%COMP%] {\n    padding: 28px 48px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    min-width: 112px;\n    padding: 17px 15px 12px;\n  }\n  .view-name[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .view-button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 23px;\n    height: 23px;\n  }\n  .focus-console[_ngcontent-%COMP%] {\n    top: 122px;\n    bottom: 152px;\n  }\n  .room-notice[_ngcontent-%COMP%] {\n    bottom: 150px;\n  }\n}\n@media (max-width: 1200px) {\n  .room-hud[_ngcontent-%COMP%] {\n    padding: 23px;\n  }\n  .operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hud-status[_ngcontent-%COMP%] {\n    gap: 15px;\n  }\n  .hud-tools[_ngcontent-%COMP%] {\n    gap: 0;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    left: 66px;\n    top: 125px;\n  }\n  .room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%] {\n    left: 25px;\n    bottom: 140px;\n    width: 280px;\n  }\n  .room-readout[_ngcontent-%COMP%] {\n    right: 25px;\n    width: 190px;\n  }\n  .operations-footer[_ngcontent-%COMP%] {\n    padding: 18px 23px 23px;\n    gap: 15px;\n  }\n  .footer-meta[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .scenario-controls[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n  }\n  .view-dock[_ngcontent-%COMP%] {\n    margin: 0 auto;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    min-width: 90px;\n  }\n  .focus-console[_ngcontent-%COMP%] {\n    left: 25px;\n    right: 25px;\n  }\n  .station-target[_ngcontent-%COMP%] {\n    left: 10%;\n  }\n  .argus-target[_ngcontent-%COMP%] {\n    left: 83%;\n  }\n}\n@media (max-width: 950px) {\n  .room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .hud-status[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .alert-state[_ngcontent-%COMP%] {\n    font-size: 9px;\n    letter-spacing: 1px;\n  }\n  .sim-clock[_ngcontent-%COMP%] {\n    padding-left: 15px;\n  }\n  .hud-tools[_ngcontent-%COMP%]   .icon-control[_ngcontent-%COMP%] {\n    width: 30px;\n    padding: 6px;\n  }\n  .operation-identity[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 7px;\n    letter-spacing: 1.3px;\n  }\n  .operation-identity[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .operation-symbol[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n  }\n  .operation-symbol[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    inset: 9px;\n  }\n  .operation-symbol[_ngcontent-%COMP%]:before {\n    inset: 5px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    min-width: 76px;\n    padding: 14px 7px 10px;\n  }\n  .view-name[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%] {\n    width: 248px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .room-readout[_ngcontent-%COMP%] {\n    width: 160px;\n  }\n  .room-readout[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    left: 30px;\n    top: 113px;\n  }\n  .context-coordinate[_ngcontent-%COMP%] {\n    font-size: 7px;\n    max-width: 180px;\n    line-height: 1.8;\n  }\n  .station-target[_ngcontent-%COMP%] {\n    left: 9%;\n    top: 58%;\n  }\n  .argus-target[_ngcontent-%COMP%] {\n    left: 88%;\n    top: 59%;\n  }\n  .spatial-target[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.target-dot) {\n    padding: 8px 10px;\n    gap: 8px;\n  }\n  .console-content[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n@media (max-width: 1050px) {\n  .room-readout[_ngcontent-%COMP%], \n   .incoming-transmission[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-height: 760px) and (min-width: 800px) {\n  .crisis-room[_ngcontent-%COMP%] {\n    min-height: 590px;\n  }\n  .room-hud[_ngcontent-%COMP%] {\n    padding-top: 18px;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    top: 105px;\n  }\n  .room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .room-context[_ngcontent-%COMP%]   .context-coordinate[_ngcontent-%COMP%] {\n    margin-top: 15px;\n  }\n  .operations-footer[_ngcontent-%COMP%] {\n    padding-bottom: 17px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    padding: 11px 8px 8px;\n  }\n  .view-name[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%] {\n    bottom: 118px;\n    padding: 13px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .room-readout[_ngcontent-%COMP%] {\n    bottom: 114px;\n  }\n  .focus-console[_ngcontent-%COMP%] {\n    top: 90px;\n    bottom: 115px;\n  }\n  .console-chrome[_ngcontent-%COMP%] {\n    padding: 13px 22px;\n  }\n  .room-notice[_ngcontent-%COMP%] {\n    bottom: 116px;\n  }\n}\n@media (max-width: 700px) {\n  .crisis-room[_ngcontent-%COMP%] {\n    height: 100dvh;\n    min-height: 680px;\n  }\n  .room-hud[_ngcontent-%COMP%] {\n    padding: 20px 15px;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .operation-identity[_ngcontent-%COMP%] {\n    gap: 9px;\n  }\n  .operation-symbol[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .exit-room[_ngcontent-%COMP%] {\n    width: 25px;\n    margin-right: 0;\n  }\n  .operation-identity[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .hud-status[_ngcontent-%COMP%] {\n    gap: 10px;\n    align-items: center;\n    flex-wrap: wrap;\n    justify-content: flex-end;\n    max-width: 165px;\n  }\n  .alert-state[_ngcontent-%COMP%] {\n    font-size: 7px;\n    letter-spacing: 1px;\n  }\n  .sim-clock[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .sim-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 18px;\n    letter-spacing: 1px;\n  }\n  .sim-clock[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n  }\n  .hud-tools[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n    gap: 7px;\n  }\n  .hud-tools[_ngcontent-%COMP%]   .icon-control[_ngcontent-%COMP%] {\n    width: 25px;\n    height: 25px;\n    padding: 4px;\n  }\n  .fullscreen-control[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    top: 112px;\n    left: 24px;\n  }\n  .room-context[_ngcontent-%COMP%]    > .eyebrow[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .room-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 22px;\n    line-height: 1.4;\n    margin-top: 12px;\n  }\n  .context-coordinate[_ngcontent-%COMP%] {\n    font-size: 6px;\n    max-width: 100%;\n    margin-top: 16px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%] {\n    left: 20px;\n    right: 20px;\n    bottom: 167px;\n    width: auto;\n    padding: 12px 14px;\n  }\n  .incoming-transmission[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .incoming-transmission[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding-top: 8px;\n  }\n  .transmission-label[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .room-readout[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .operations-footer[_ngcontent-%COMP%] {\n    padding: 14px 14px 21px;\n    gap: 14px;\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n  .view-dock[_ngcontent-%COMP%] {\n    width: 100%;\n    order: 2;\n    padding: 4px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n    padding: 16px 4px 10px;\n    gap: 7px;\n  }\n  .view-name[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .view-button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 19px;\n    height: 19px;\n  }\n  .view-index[_ngcontent-%COMP%] {\n    left: 4px;\n    top: 4px;\n    font-size: 5px;\n  }\n  .view-button.active[_ngcontent-%COMP%]:after {\n    bottom: -5px;\n  }\n  .unread-dot[_ngcontent-%COMP%] {\n    top: 12px;\n    right: 14px;\n  }\n  .scenario-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    flex: auto;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    order: 1;\n    padding: 0 5px;\n    gap: 8px;\n  }\n  .scenario-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n  .scenario-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .play-button[_ngcontent-%COMP%] {\n    height: 24px;\n    width: 24px;\n    font-size: 16px;\n  }\n  .next-update[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .room-scene[_ngcontent-%COMP%] {\n    width: 177.69vh;\n    height: 100vh;\n  }\n  .room-context[_ngcontent-%COMP%] {\n    z-index: 1;\n  }\n  .station-target[_ngcontent-%COMP%] {\n    left: 15%;\n    top: 61%;\n  }\n  .argus-target[_ngcontent-%COMP%] {\n    left: 86%;\n    top: 59%;\n  }\n  .spatial-target[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.target-dot) {\n    font-size: 8px;\n    padding: 8px;\n    gap: 6px;\n  }\n  .spatial-target[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 11px;\n    height: 11px;\n  }\n  .focus-console[_ngcontent-%COMP%] {\n    left: 12px;\n    right: 12px;\n    top: 111px;\n    bottom: 157px;\n  }\n  .console-chrome[_ngcontent-%COMP%] {\n    padding: 13px 15px;\n    gap: 10px;\n  }\n  .console-chrome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .console-reference[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .return-room[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .return-room[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n  }\n  .console-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .room-notice[_ngcontent-%COMP%] {\n    bottom: 159px;\n    width: calc(100% - 35px);\n    font-size: 11px;\n    padding: 8px 10px 8px 15px;\n  }\n  .reset-dialog[_ngcontent-%COMP%] {\n    max-width: calc(100vw - 35px);\n    padding: 25px;\n  }\n  .reset-dialog[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .reset-dialog[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .art-error[_ngcontent-%COMP%] {\n    left: 20%;\n    right: 20%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.wall-heading[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 99px;\n  left: 5%;\n  right: 5%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_surface-reveal 0.6s 0.5s both;\n}\n.wall-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin-top: 9px;\n  font-weight: 350;\n  outline: none;\n}\n.wall-heading[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 2px;\n}\n.wall-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: rgba(11, 34, 49, 0.8509803922);\n  border: 1px solid #476676;\n  padding: 10px 14px;\n}\n.wall-guidance[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  bottom: 155px;\n  transform: translateX(-50%);\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font: 9px Consolas, monospace;\n  color: #a7c6cd;\n  white-space: nowrap;\n  background: rgba(10, 32, 41, 0.737254902);\n  padding: 12px 20px;\n  border: 1px solid rgba(70, 99, 106, 0.3333333333);\n  animation: _ngcontent-%COMP%_surface-reveal 0.6s 0.75s both;\n  pointer-events: none;\n}\n.wall-guidance[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #b4e9db;\n  box-shadow: 0 0 8px #b4e9db;\n}\n@keyframes _ngcontent-%COMP%_surface-reveal {\n  from {\n    opacity: 0;\n    translate: 0 8px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (max-width: 700px) {\n  .wall-heading[_ngcontent-%COMP%] {\n    top: 112px;\n    left: 20px;\n    right: 20px;\n  }\n  .wall-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .wall-heading[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n  .wall-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 0;\n    gap: 0;\n    padding: 8px;\n  }\n  .wall-guidance[_ngcontent-%COMP%] {\n    bottom: 165px;\n    font-size: 7px;\n    width: 90%;\n    white-space: normal;\n    line-height: 1.6;\n    padding: 9px 12px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wall-heading[_ngcontent-%COMP%], \n   .wall-guidance[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=crisis-center.component.css.map */', '\n.room-hud[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  gap: 20px;\n}\n.operation-identity[_ngcontent-%COMP%] {\n  gap: 12px;\n}\n.operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 19px;\n  margin-top: 5px;\n}\n.hud-status[_ngcontent-%COMP%] {\n  gap: 18px;\n}\n.sim-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.operations-footer[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 28px;\n  padding: 14px 24px 20px;\n  pointer-events: none;\n}\n.operations-footer[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  pointer-events: auto;\n}\n.view-dock[_ngcontent-%COMP%] {\n  padding: 5px;\n  background: rgba(11, 32, 44, 0.8549019608);\n  border-color: rgba(103, 134, 139, 0.3333333333);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2666666667);\n  gap: 2px;\n}\n.view-button[_ngcontent-%COMP%] {\n  min-width: 78px;\n  padding: 10px 13px;\n  border: 0;\n  gap: 6px;\n}\n.view-button.active[_ngcontent-%COMP%] {\n  background: rgba(54, 89, 79, 0.4);\n}\n.view-button.active[_ngcontent-%COMP%]:after {\n  display: none;\n}\n.view-button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.view-name[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  top: 9px;\n  right: 18px;\n}\n.scenario-controls[_ngcontent-%COMP%] {\n  flex: none;\n  gap: 7px;\n}\n.scenario-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 0.6px;\n}\n.next-update[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.play-button[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n}\n.storage-note[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 100%;\n  left: 24px;\n  color: #dbbc8b;\n  font-size: 11px;\n}\n.focus-console[_ngcontent-%COMP%] {\n  top: 92px;\n  bottom: 108px;\n  left: max(24px, (100vw - 1000px) / 2);\n  right: max(24px, (100vw - 1000px) / 2);\n  border-radius: 6px;\n  background: rgba(12, 33, 44, 0.9607843137);\n  border-color: rgba(108, 137, 145, 0.4);\n}\n.console-chrome[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  background: transparent;\n}\n.console-chrome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 15px;\n  letter-spacing: 0;\n}\n.console-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.return-room[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: transparent;\n  color: #a9c5cb;\n}\n.wall-heading[_ngcontent-%COMP%] {\n  top: 105px;\n}\n.wall-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 21px;\n  margin-top: 0;\n}\n.wall-guidance[_ngcontent-%COMP%] {\n  font-family: "Segoe UI", sans-serif;\n  font-size: 10px;\n  letter-spacing: 0;\n}\n@media (min-width: 1600px) {\n  .focus-console[_ngcontent-%COMP%] {\n    top: 108px;\n    bottom: 120px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    min-width: 90px;\n  }\n}\n@media (max-width: 1050px) {\n  .operations-footer[_ngcontent-%COMP%] {\n    gap: 22px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    min-width: 65px;\n    padding: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .room-hud[_ngcontent-%COMP%] {\n    padding: 17px 16px;\n    gap: 12px;\n  }\n  .operation-identity[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .operation-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .hud-status[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .sim-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .operations-footer[_ngcontent-%COMP%] {\n    padding: 12px 14px 18px;\n    flex-direction: column-reverse;\n    align-items: stretch;\n    gap: 12px;\n  }\n  .view-dock[_ngcontent-%COMP%] {\n    width: 100%;\n    gap: 0;\n    padding: 4px;\n  }\n  .view-button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n    padding: 9px 3px;\n    gap: 5px;\n  }\n  .view-name[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .view-button[_ngcontent-%COMP%]   app-crisis-icon[_ngcontent-%COMP%] {\n    width: 17px;\n    height: 17px;\n  }\n  .unread-dot[_ngcontent-%COMP%] {\n    right: 10px;\n    top: 8px;\n  }\n  .scenario-controls[_ngcontent-%COMP%] {\n    align-self: flex-end;\n    flex-direction: row;\n    align-items: center;\n    gap: 14px;\n  }\n  .scenario-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .next-update[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .focus-console[_ngcontent-%COMP%] {\n    top: 106px;\n    bottom: 138px;\n    left: 12px;\n    right: 12px;\n  }\n  .console-chrome[_ngcontent-%COMP%] {\n    padding: 14px 18px;\n  }\n  .console-chrome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .console-content[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .wall-heading[_ngcontent-%COMP%] {\n    top: 114px;\n  }\n  .wall-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .wall-guidance[_ngcontent-%COMP%] {\n    font-size: 9px;\n    line-height: 1.5;\n  }\n}\n/*# sourceMappingURL=crisis-simplified-shell.css.map */', "\n.specialized-station[_ngcontent-%COMP%]   .operations-footer[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.specialized-station[_ngcontent-%COMP%]   .operations-footer[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n/*# sourceMappingURL=crisis-station-shell.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrisisCenterComponent, [{
    type: Component,
    args: [{ selector: "app-crisis-center", imports: [
      WorkspaceToolsComponent,
      RouterLink,
      CrisisIconComponent,
      CrisisTableControlsComponent,
      CrisisConsoleComponent,
      CrisisRoomSceneComponent,
      CrisisCompanionBriefingComponent,
      CrisisRobotComponent,
      CrisisWorkstationsComponent,
      CrisisConferenceComponent,
      CrisisWeatherScreenComponent
    ], template: `<main\r
  class="crisis-room"\r
  [class.focused]="view() !== 'room'"\r
  [class.specialized-station]="specializedStation()"\r
  [attr.data-view]="view()"\r
  [attr.data-alert]="runtime.bulletin().alert"\r
>\r
  <app-crisis-room-scene\r
    [config]="runtime.config"\r
    [state]="runtime.state()"\r
    [selectedLocation]="selectedLocation()"\r
    [view]="view()"\r
    [layer]="layer()"\r
    [zoom]="zoom()"\r
    (navigate)="showView($event)"\r
    (locate)="locate($event)"\r
    (locationSelected)="selectLocation($event)"\r
    (imageFailed)="imageFailed.set(true)"\r
  />\r
  <div class="edge-vignette" aria-hidden="true"></div>\r
  <app-crisis-workstations [view]="view()" (open)="openWorkstation($event)" />\r
  <app-crisis-robot [view]="view()" [roaming]="robotRoaming()" (open)="showView('argus')" />\r
  <app-workspace-tools><header class="room-hud">\r
    <div class="operation-identity">\r
      <a\r
        routerLink="/projects"\r
        class="icon-control exit-room"\r
        aria-label="Return to project library"\r
        title="Return to projects"\r
        ><app-crisis-icon name="back"\r
      /></a>\r
      <div>\r
        <span class="eyebrow">CRISIS CENTER</span>\r
        <h1>\r
          {{ runtime.config.title }}\r
        </h1>\r
      </div>\r
    </div>\r
    <div class="hud-status">\r
      <span class="alert-state"><i></i>{{ runtime.bulletin().alert.toUpperCase() }}</span>\r
      <div class="sim-clock">\r
        <strong>{{ runtime.time() }}</strong\r
        ><span>EXERCISE</span>\r
      </div>\r
      <div class="hud-tools">\r
        <button\r
          class="icon-control"\r
          (click)="toggleAudio()"\r
          [attr.aria-label]="audioEnabled() ? 'Mute alert tones' : 'Enable alert tones'"\r
          [attr.aria-pressed]="audioEnabled()"\r
          [title]="audioEnabled() ? 'Mute alert tones' : 'Enable alert tones'"\r
        >\r
          <app-crisis-icon [name]="audioEnabled() ? 'sound' : 'mute'" /></button\r
        ><button\r
          class="icon-control fullscreen-control"\r
          (click)="toggleFullscreen()"\r
          [attr.aria-label]="fullscreen() ? 'Exit full screen' : 'Enter full screen'"\r
          title="Full screen"\r
        >\r
          <app-crisis-icon name="expand" /></button\r
        ><button\r
          class="icon-control"\r
          (click)="resetOpen.set(true); resetDialog.showModal()"\r
          aria-label="Reset local exercise"\r
          title="Reset exercise"\r
        >\r
          <app-crisis-icon name="reset" />\r
        </button>\r
      </div>\r
    </div>\r
  </header></app-workspace-tools>\r
\r
  @if (view() === 'room') {\r
    @if (!runtime.config.workstations?.length) {\r
      <div class="spatial-controls">\r
        <button class="spatial-target station-target" (click)="navigate('station')">\r
          <span class="target-dot"></span\r
          ><span\r
            >My station <b>{{ runtime.unread() }}</b\r
            ><app-crisis-icon name="arrow"\r
          /></span>\r
        </button>\r
      </div>\r
    }\r
    @if (imageFailed()) {\r
      <p class="art-error" role="status">\r
        Room artwork could not load. All six operations consoles are available below.\r
      </p>\r
    }\r
  }\r
\r
  @if (conference()) {\r
    <app-crisis-conference\r
      [workstation]="selectedWorkstation()!"\r
      (leave)="showView('room')"\r
      (locate)="locate($event)"\r
    />\r
  }\r
  @if (weather(); as weatherConfig) {\r
    <app-crisis-weather-screen\r
      [weather]="weatherConfig"\r
      (leave)="showView('room')"\r
      (reports)="openStationReports()"\r
      (locate)="locate($event)"\r
    />\r
  }\r
  @if (\r
    view() !== 'room' &&\r
    view() !== 'news' &&\r
    view() !== 'map' &&\r
    view() !== 'argus' &&\r
    !specializedStation()\r
  ) {\r
    <section class="focus-console" [attr.aria-label]="viewTitle()">\r
      <header class="console-chrome">\r
        <div>\r
          <h2 tabindex="-1" data-panel-heading>{{ viewTitle() }}</h2>\r
        </div>\r
        <button class="return-room" aria-label="Return to room" (click)="showView('room')">\r
          <span>Return to room</span><app-crisis-icon name="close" />\r
        </button>\r
      </header>\r
\r
      <div class="console-content">\r
        <app-crisis-console\r
          [view]="view()"\r
          [suggestedActionId]="suggestedActionId()"\r
          [workstation]="selectedWorkstation()"\r
          (navigate)="navigate($event)"\r
          (inspectLocation)="locate($event)"\r
        />\r
      </div>\r
    </section>\r
  }\r
\r
  @if (view() === 'news') {\r
    <header class="wall-heading">\r
      <div>\r
        <h2 tabindex="-1" data-panel-heading>Monitor wall</h2>\r
      </div>\r
      <button class="return-room" aria-label="Return to room" (click)="showView('room')">\r
        Return to room <app-crisis-icon name="close" />\r
      </button>\r
    </header>\r
    <div class="wall-guidance">\r
      <i></i> Select a screen to inspect. Click the surrounding room to step back \xB7 Esc\r
    </div>\r
  }\r
  @if (view() === 'map') {\r
    <app-crisis-table-controls\r
      [selectedLocation]="selectedLocation()"\r
      [layer]="layer()"\r
      [zoom]="zoom()"\r
      (layerChanged)="layer.set($event)"\r
      (zoomChanged)="changeZoom($event)"\r
      (locationSelected)="selectLocation($event)"\r
      (navigate)="showView($event)"\r
    />\r
  }\r
\r
  <app-crisis-companion-briefing\r
    [active]="view() === 'argus'"\r
    [roaming]="robotRoaming()"\r
    [selectedLocation]="selectedLocation()"\r
    (roamingChanged)="robotRoaming.set($event)"\r
    (navigate)="showView($event)"\r
    (locate)="locate($event)"\r
    (reviewAction)="reviewSuggestedAction($event)"\r
  />\r
  <footer\r
    class="operations-footer"\r
    [attr.inert]="specializedStation() ? '' : null"\r
    [attr.aria-hidden]="specializedStation() ? true : null"\r
  >\r
    @if (runtime.storageNotice()) {\r
      <p class="storage-note" role="status">{{ runtime.storageNotice() }}</p>\r
    }\r
    <nav class="view-dock" aria-label="Operations room views">\r
      @for (item of views; track item.id) {\r
        <button\r
          class="view-button"\r
          [attr.data-view]="item.id"\r
          [attr.aria-label]="item.title"\r
          [class.active]="view() === item.id"\r
          [attr.aria-pressed]="view() === item.id"\r
          (click)="navigate(item.id)"\r
          [title]="item.title + ' \xB7 ' + item.code"\r
        >\r
          <app-crisis-icon [name]="item.id" /><span class="view-name">{{ item.name }}</span>\r
          @if (item.id === 'station' && runtime.unread() > 0) {\r
            <i class="unread-dot"></i>\r
          }\r
        </button>\r
      }\r
    </nav>\r
    <div class="scenario-controls">\r
      <span>{{ runtime.state().stage + 1 }} / {{ runtime.config.bulletins.length }} UPDATES</span>\r
      <div>\r
        <button\r
          class="play-button"\r
          (click)="toggleRunning()"\r
          [disabled]="runtime.finished()"\r
          [attr.aria-label]="running() ? 'Pause scenario updates' : 'Auto-play scenario updates'"\r
          [title]="\r
            running()\r
              ? 'Pause updates'\r
              : 'Auto-play updates every ' + runtime.config.bulletinIntervalSeconds + ' seconds'\r
          "\r
        >\r
          {{ running() ? '\u2161' : '\u25B7' }}</button\r
        ><button class="next-update" (click)="advance()" [disabled]="runtime.finished()">\r
          {{ runtime.finished() ? 'All updates received' : 'Next update'\r
          }}<app-crisis-icon name="arrow" />\r
        </button>\r
      </div>\r
    </div>\r
  </footer>\r
  @if (runtime.message()) {\r
    <div class="room-notice" role="status">\r
      <span>{{ runtime.message() }}</span\r
      ><button class="icon-control" aria-label="Dismiss message" (click)="runtime.message.set('')">\r
        <app-crisis-icon name="close" />\r
      </button>\r
    </div>\r
  }\r
  <span class="sr-only" aria-live="polite"\r
    >Update {{ runtime.state().stage + 1 }}. {{ runtime.bulletin().title }}\r
    {{ runtime.crews() }} crews available.</span\r
  >\r
</main>\r
<dialog\r
  #resetDialog\r
  class="reset-dialog"\r
  (close)="resetOpen.set(false)"\r
  (cancel)="resetOpen.set(false)"\r
>\r
  <span class="eyebrow">LOCAL EXERCISE</span>\r
  <h2>Start a fresh response?</h2>\r
  <p>This clears the current orders, pinned reports, and timeline on this device.</p>\r
  <div>\r
    <button autofocus (click)="resetDialog.close()">Keep current response</button\r
    ><button class="confirm-reset" (click)="resetExercise(); resetDialog.close()">\r
      Reset exercise\r
    </button>\r
  </div>\r
</dialog>\r
`, styles: ['/* src/app/templates/crisis-operations/ui/crisis-center.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  background: #061018;\n  color: #dae8e9;\n  font-family:\n    "Segoe UI",\n    Arial,\n    sans-serif;\n  font-size: 14px;\n  --cyan: #9ed8d4;\n  --muted: #91aab8;\n  --amber: #efbd7e;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\na,\nselect {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton:focus-visible,\na:focus-visible,\nsummary:focus-visible {\n  outline: 2px solid #b7ebd8;\n  outline-offset: 4px;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\nh1,\nh2 {\n  font-weight: 450;\n}\n.crisis-room {\n  position: relative;\n  width: 100%;\n  height: 100dvh;\n  min-height: 650px;\n  overflow: hidden;\n  isolation: isolate;\n  background: #06121c;\n}\n.edge-vignette {\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(7, 21, 32, 0.7333333333),\n      transparent 19%,\n      transparent 60%,\n      rgba(7, 17, 28, 0.7490196078) 89%,\n      rgba(7, 17, 28, 0.9411764706)),\n    linear-gradient(\n      90deg,\n      rgba(6, 19, 28, 0.2196078431),\n      transparent 30%,\n      transparent 70%,\n      rgba(6, 19, 28, 0.2196078431));\n}\n.room-hud {\n  position: absolute;\n  inset: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n  padding: 26px 32px;\n  z-index: 4;\n  background: linear-gradient(rgba(5, 18, 27, 0.7411764706), transparent);\n  pointer-events: none;\n}\n.room-hud > * {\n  pointer-events: auto;\n}\n.operation-identity {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.icon-control {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid transparent;\n  padding: 7px;\n  color: #a3bbc5;\n  width: 35px;\n  height: 35px;\n  text-decoration: none;\n}\n.icon-control:hover {\n  background: rgba(24, 52, 64, 0.6705882353);\n  border-color: #4b6e7a;\n}\n.exit-room {\n  margin-right: 1px;\n  width: 30px;\n}\n.operation-symbol {\n  height: 34px;\n  width: 34px;\n  border: 1px solid #a5cccc;\n  transform: rotate(45deg);\n  position: relative;\n  margin-right: 5px;\n}\n.operation-symbol:before {\n  content: "";\n  position: absolute;\n  inset: 6px;\n  border: 1px solid #7faaaa;\n}\n.operation-symbol span {\n  position: absolute;\n  inset: 11px;\n  background: #b4d8d3;\n}\n.eyebrow {\n  font:\n    9px Consolas,\n    "Courier New",\n    monospace;\n  letter-spacing: 2px;\n  color: #a5bfc6;\n  display: block;\n}\n.operation-identity h1 {\n  font-size: 19px;\n  letter-spacing: 0.1px;\n  margin-top: 6px;\n  white-space: nowrap;\n}\n.operation-identity h1 > span {\n  font: 10px Consolas, monospace;\n  letter-spacing: 1px;\n  color: #7895a5;\n  margin-left: 13px;\n}\n.hud-status {\n  display: flex;\n  align-items: center;\n  gap: 25px;\n}\n.alert-state {\n  font: 10px Consolas, monospace;\n  letter-spacing: 2px;\n  color: var(--amber);\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.alert-state i,\n.transmission-label i {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--amber);\n  box-shadow: 0 0 9px rgba(239, 189, 126, 0.2666666667);\n}\n.sim-clock {\n  padding-left: 24px;\n  border-left: 1px solid rgba(93, 120, 141, 0.3333333333);\n  text-align: center;\n}\n.sim-clock strong {\n  display: block;\n  font: 22px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #d8e5e9;\n}\n.sim-clock > span {\n  font: 7px Consolas, monospace;\n  color: #8ba6b5;\n  letter-spacing: 1.5px;\n  display: block;\n  margin-top: 4px;\n}\n.hud-tools {\n  display: flex;\n  gap: 3px;\n}\n.room-context {\n  position: absolute;\n  top: 130px;\n  left: 83px;\n}\n.room-context .eyebrow {\n  font-size: 8px;\n  color: #8ba7b5;\n  letter-spacing: 1.6px;\n}\n.room-context p {\n  font-size: 26px;\n  font-weight: 350;\n  line-height: 1.45;\n  margin-top: 16px;\n  color: #d2e0e6;\n  text-shadow: 0 2px 12px #07111b;\n}\n.room-context p em {\n  font-style: normal;\n  color: #92afba;\n}\n.context-coordinate {\n  display: block;\n  font: 8px Consolas, monospace;\n  letter-spacing: 1.2px;\n  color: #7393a4;\n  margin-top: 24px;\n}\n.context-coordinate b {\n  padding: 0 5px;\n  color: #b3d5d0;\n}\n.spatial-controls {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.spatial-target {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 11px;\n  pointer-events: auto;\n  background: transparent;\n  border: 0;\n  padding: 10px;\n  color: #cfdee4;\n}\n.target-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #c4e6e2;\n  box-shadow:\n    0 0 0 5px rgba(157, 204, 207, 0.0784313725),\n    0 0 0 6px rgba(145, 189, 193, 0.3098039216),\n    0 0 16px rgba(177, 233, 235, 0.4666666667);\n}\n.spatial-target > span:not(.target-dot) {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  background: rgba(10, 31, 45, 0.8549019608);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 10px 15px;\n  border: 1px solid rgba(127, 169, 181, 0.3137254902);\n  font-size: 11px;\n  letter-spacing: 0.2px;\n  box-shadow: 0 5px 30px rgba(2, 12, 22, 0.5647058824);\n}\n.spatial-target app-crisis-icon {\n  width: 14px;\n  height: 14px;\n  color: #9bbec4;\n}\n.spatial-target:hover > span:not(.target-dot) {\n  border-color: #b0d6d2;\n  background: #163440;\n}\n.spatial-target:hover .target-dot {\n  box-shadow:\n    0 0 0 7px rgba(169, 215, 207, 0.1490196078),\n    0 0 0 8px rgba(183, 237, 228, 0.4196078431),\n    0 0 19px rgba(177, 233, 235, 0.6666666667);\n}\n.spatial-target b {\n  font: 9px Consolas, monospace;\n  border-radius: 2px;\n  color: #edc186;\n  background: rgba(75, 66, 49, 0.5019607843);\n  padding: 3px 5px;\n  margin-left: -6px;\n}\n.station-target {\n  left: 14%;\n  top: 59%;\n  transform: translateX(-50%);\n}\n.argus-target {\n  left: 78.5%;\n  top: 57%;\n  transform: translateX(-50%);\n}\n.incoming-transmission {\n  position: absolute;\n  left: 40px;\n  bottom: 139px;\n  width: 318px;\n  padding: 16px 17px;\n  background:\n    linear-gradient(\n      120deg,\n      rgba(13, 36, 48, 0.9019607843),\n      rgba(16, 35, 43, 0.7215686275));\n  border: 1px solid rgba(82, 106, 119, 0.3333333333);\n  border-left: 2px solid #d2af79;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.transmission-label {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.2px;\n  color: #e0bd86;\n}\n.transmission-label > span {\n  margin-left: auto;\n  color: #87a4b3;\n}\n.transmission-label i {\n  width: 4px;\n  height: 4px;\n}\n.incoming-transmission > button {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  border: 0;\n  padding: 12px 0 0;\n  background: transparent;\n  text-align: left;\n  font-size: 14px;\n  font-weight: 450;\n  line-height: 1.4;\n}\n.incoming-transmission > button app-crisis-icon {\n  width: 16px;\n}\n.incoming-transmission > p {\n  color: #91adb9;\n  font-size: 10px;\n  line-height: 1.7;\n  margin-top: 9px;\n}\n.room-readout {\n  position: absolute;\n  bottom: 143px;\n  right: 40px;\n  width: 235px;\n  color: #a5bfca;\n  padding: 17px 0 0 18px;\n  border-left: 1px solid rgba(119, 150, 162, 0.3333333333);\n}\n@media (min-width: 701px) {\n  .crisis-room[data-view=room] .room-readout {\n    top: 120px;\n    bottom: auto;\n  }\n}\n.room-readout > span {\n  font: 8px Consolas, monospace;\n  letter-spacing: 2px;\n  color: #7696a6;\n}\n.room-readout > div {\n  margin: 12px 0;\n}\n.room-readout strong {\n  display: block;\n  font-size: 30px;\n  font-weight: 300;\n  letter-spacing: 1px;\n  color: #d1e0e7;\n}\n.room-readout small {\n  display: block;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.3px;\n  margin-top: 4px;\n}\n.room-readout button {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: transparent;\n  border: 0;\n  padding: 8px 0;\n  font-size: 10px;\n  color: #95b3be;\n}\n.room-readout app-crisis-icon {\n  width: 13px;\n  height: 13px;\n}\n.operations-footer {\n  position: absolute;\n  inset: auto 0 0;\n  padding: 21px 32px 25px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  z-index: 5;\n  background: linear-gradient(transparent, rgba(5, 19, 28, 0.9215686275) 60%);\n}\n.footer-meta {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  flex: 1;\n  min-width: 0;\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.3px;\n  color: #b2c9cb;\n}\n.connection-light {\n  display: block;\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #a4cfb7;\n  margin-top: 2px;\n}\n.footer-meta small {\n  display: block;\n  font: 6px/1.9 Consolas, monospace;\n  letter-spacing: 0.8px;\n  color: #6e94a5;\n  margin-top: 6px;\n  max-width: 170px;\n}\n.view-dock {\n  display: flex;\n  align-items: stretch;\n  border: 1px solid rgba(86, 123, 137, 0.3490196078);\n  border-radius: 6px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 48, 64, 0.8509803922),\n      rgba(13, 32, 44, 0.8745098039));\n  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.2666666667), inset 0 1px rgba(184, 213, 220, 0.0705882353);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  padding: 6px;\n}\n.view-button {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  min-width: 94px;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  padding: 14px 10px 10px;\n  color: #89a6b6;\n  transition: background 0.2s, color 0.2s;\n}\n.view-button.active {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(57, 84, 90, 0.5333333333),\n      rgba(54, 85, 89, 0.3333333333));\n  border-color: rgba(139, 173, 167, 0.3607843137);\n  color: #cfebe5;\n}\n.view-button.active:after {\n  content: "";\n  position: absolute;\n  left: 26%;\n  right: 26%;\n  bottom: -7px;\n  height: 2px;\n  background: #c0ddc9;\n  box-shadow: 0 0 10px rgba(189, 228, 204, 0.4);\n}\n.view-button:hover {\n  background: rgba(54, 81, 92, 0.4);\n  color: #d4e5e7;\n}\n.view-index {\n  position: absolute;\n  left: 7px;\n  top: 5px;\n  font: 6px Consolas, monospace;\n  letter-spacing: 1px;\n  color: rgba(118, 150, 164, 0.5607843137);\n}\n.view-name {\n  font-size: 9px;\n  white-space: nowrap;\n}\n.view-button app-crisis-icon {\n  width: 20px;\n  height: 20px;\n}\n.unread-dot {\n  position: absolute;\n  top: 12px;\n  right: 24px;\n  width: 4px;\n  height: 4px;\n  background: #e8b47a;\n  border-radius: 50%;\n  box-shadow: 0 0 6px rgba(231, 184, 139, 0.4);\n}\n.scenario-controls {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 10px;\n}\n.scenario-controls > span {\n  font: 7px Consolas, monospace;\n  letter-spacing: 1.6px;\n  color: #8da6b3;\n}\n.scenario-controls > div {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.play-button {\n  height: 30px;\n  width: 30px;\n  border: 1px solid rgba(70, 99, 114, 0.5333333333);\n  background: rgba(15, 37, 50, 0.631372549);\n  color: #c4d9dc;\n  font-size: 17px;\n  display: grid;\n  place-items: center;\n}\n.next-update {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: transparent;\n  border: 0;\n  padding: 5px 0 5px 5px;\n  font-size: 10px;\n  color: #c1d3d9;\n  white-space: nowrap;\n}\n.next-update app-crisis-icon {\n  width: 14px;\n  height: 14px;\n}\n.focused .edge-vignette {\n  background: rgba(3, 17, 27, 0.2196078431);\n}\n.focus-console {\n  position: absolute;\n  z-index: 2;\n  top: 105px;\n  bottom: 132px;\n  left: max(40px, (100vw - 1200px) / 2);\n  right: max(40px, (100vw - 1200px) / 2);\n  background:\n    linear-gradient(\n      145deg,\n      rgba(16, 40, 51, 0.9607843137),\n      rgba(10, 29, 42, 0.9803921569) 80%);\n  border: 1px solid rgba(117, 146, 155, 0.4);\n  box-shadow: 0 20px 120px rgba(0, 0, 0, 0.6), inset 0 1px rgba(181, 210, 210, 0.0784313725);\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  animation: console-in 0.4s ease-out;\n}\n.console-chrome {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 23px;\n  border-bottom: 1px solid rgba(88, 114, 125, 0.4);\n  background: rgba(22, 46, 59, 0.5333333333);\n  gap: 20px;\n  flex-shrink: 0;\n}\n.console-chrome > div {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n.console-status-dot {\n  height: 5px;\n  width: 5px;\n  border-radius: 50%;\n  background: #99cdbc;\n  box-shadow: 0 0 7px rgba(182, 223, 196, 0.3333333333);\n}\n.console-chrome h2 {\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  outline: none;\n}\n.console-reference {\n  font: 8px Consolas, monospace;\n  color: #769aab;\n  letter-spacing: 1px;\n  margin-left: 14px;\n}\n.return-room {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  border: 0;\n  background: transparent;\n  color: #a8bfca;\n  font-size: 10px;\n  padding: 0;\n}\n.return-room app-crisis-icon {\n  width: 17px;\n  height: 17px;\n}\n.return-room:hover {\n  color: #f1e5ce;\n}\n.console-content {\n  padding: 26px 30px;\n  overflow: auto;\n  min-height: 0;\n  scrollbar-width: thin;\n  scrollbar-color: #426773 transparent;\n}\n.room-notice {\n  position: absolute;\n  bottom: 128px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 6;\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  border: 1px solid rgba(156, 162, 132, 0.6);\n  background: rgba(33, 56, 51, 0.9607843137);\n  color: #d9e9d6;\n  padding: 10px 14px 10px 20px;\n  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4);\n  max-width: min(90vw, 700px);\n  font-size: 12px;\n}\n.room-notice > span {\n  flex: 1;\n}\n.art-error {\n  position: absolute;\n  top: 35%;\n  left: 30%;\n  right: 30%;\n  font-size: 12px;\n  color: #bdd1d7;\n  text-align: center;\n}\n.reset-dialog {\n  color: #d2e2e3;\n  background: #102935;\n  border: 1px solid rgba(130, 158, 171, 0.4);\n  max-width: 480px;\n  padding: 30px;\n  font-family: "Segoe UI", sans-serif;\n  box-shadow: 0 20px 120px rgba(0, 0, 0, 0.6);\n}\n.reset-dialog::backdrop {\n  background: rgba(2, 13, 23, 0.6509803922);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.reset-dialog h2 {\n  margin: 16px 0;\n  font-size: 25px;\n}\n.reset-dialog p {\n  font-size: 13px;\n  line-height: 1.8;\n  color: #a6bdc7;\n}\n.reset-dialog > div {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 28px;\n}\n.reset-dialog button {\n  border: 1px solid #567681;\n  background: #163643;\n  color: #d4e4e8;\n  font-size: 12px;\n  padding: 12px;\n}\n.reset-dialog .confirm-reset {\n  background: #b9d9c7;\n  color: #16382f;\n}\n.crisis-room[data-alert=Critical] {\n  --amber: #f2a182;\n}\n.crisis-room[data-alert=Critical] .room-shade {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(183, 63, 35, 0.0901960784),\n      transparent 35%,\n      transparent 65%,\n      rgba(183, 63, 35, 0.0901960784));\n}\n@keyframes console-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.99);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (min-width: 1700px) {\n  .room-hud {\n    padding: 32px 48px;\n  }\n  .room-context {\n    top: 150px;\n    left: 102px;\n  }\n  .room-context p {\n    font-size: 32px;\n  }\n  .incoming-transmission {\n    left: 55px;\n    bottom: 165px;\n    width: 370px;\n    padding: 20px;\n  }\n  .incoming-transmission > p {\n    font-size: 12px;\n  }\n  .transmission-label {\n    font-size: 8px;\n  }\n  .room-readout {\n    right: 55px;\n    bottom: 165px;\n  }\n  .operations-footer {\n    padding: 28px 48px;\n  }\n  .view-button {\n    min-width: 112px;\n    padding: 17px 15px 12px;\n  }\n  .view-name {\n    font-size: 10px;\n  }\n  .view-button app-crisis-icon {\n    width: 23px;\n    height: 23px;\n  }\n  .focus-console {\n    top: 122px;\n    bottom: 152px;\n  }\n  .room-notice {\n    bottom: 150px;\n  }\n}\n@media (max-width: 1200px) {\n  .room-hud {\n    padding: 23px;\n  }\n  .operation-identity h1 > span {\n    display: none;\n  }\n  .hud-status {\n    gap: 15px;\n  }\n  .hud-tools {\n    gap: 0;\n  }\n  .room-context {\n    left: 66px;\n    top: 125px;\n  }\n  .room-context p {\n    font-size: 23px;\n  }\n  .incoming-transmission {\n    left: 25px;\n    bottom: 140px;\n    width: 280px;\n  }\n  .room-readout {\n    right: 25px;\n    width: 190px;\n  }\n  .operations-footer {\n    padding: 18px 23px 23px;\n    gap: 15px;\n  }\n  .footer-meta {\n    display: none;\n  }\n  .scenario-controls {\n    flex: 0 0 auto;\n  }\n  .view-dock {\n    margin: 0 auto;\n  }\n  .view-button {\n    min-width: 90px;\n  }\n  .focus-console {\n    left: 25px;\n    right: 25px;\n  }\n  .station-target {\n    left: 10%;\n  }\n  .argus-target {\n    left: 83%;\n  }\n}\n@media (max-width: 950px) {\n  .room-context p {\n    font-size: 21px;\n  }\n  .hud-status {\n    gap: 12px;\n  }\n  .alert-state {\n    font-size: 9px;\n    letter-spacing: 1px;\n  }\n  .sim-clock {\n    padding-left: 15px;\n  }\n  .hud-tools .icon-control {\n    width: 30px;\n    padding: 6px;\n  }\n  .operation-identity .eyebrow {\n    font-size: 7px;\n    letter-spacing: 1.3px;\n  }\n  .operation-identity {\n    gap: 12px;\n  }\n  .operation-identity h1 {\n    font-size: 17px;\n  }\n  .operation-symbol {\n    width: 28px;\n    height: 28px;\n  }\n  .operation-symbol span {\n    inset: 9px;\n  }\n  .operation-symbol:before {\n    inset: 5px;\n  }\n  .view-button {\n    min-width: 76px;\n    padding: 14px 7px 10px;\n  }\n  .view-name {\n    font-size: 8px;\n  }\n  .incoming-transmission {\n    width: 248px;\n  }\n  .incoming-transmission > p {\n    font-size: 9px;\n  }\n  .room-readout {\n    width: 160px;\n  }\n  .room-readout button {\n    font-size: 9px;\n  }\n  .room-context {\n    left: 30px;\n    top: 113px;\n  }\n  .context-coordinate {\n    font-size: 7px;\n    max-width: 180px;\n    line-height: 1.8;\n  }\n  .station-target {\n    left: 9%;\n    top: 58%;\n  }\n  .argus-target {\n    left: 88%;\n    top: 59%;\n  }\n  .spatial-target > span:not(.target-dot) {\n    padding: 8px 10px;\n    gap: 8px;\n  }\n  .console-content {\n    padding: 24px;\n  }\n}\n@media (max-width: 1050px) {\n  .room-readout,\n  .incoming-transmission {\n    display: none;\n  }\n}\n@media (max-height: 760px) and (min-width: 800px) {\n  .crisis-room {\n    min-height: 590px;\n  }\n  .room-hud {\n    padding-top: 18px;\n  }\n  .room-context {\n    top: 105px;\n  }\n  .room-context p {\n    font-size: 21px;\n  }\n  .room-context .context-coordinate {\n    margin-top: 15px;\n  }\n  .operations-footer {\n    padding-bottom: 17px;\n  }\n  .view-button {\n    padding: 11px 8px 8px;\n  }\n  .view-name {\n    font-size: 8px;\n  }\n  .incoming-transmission {\n    bottom: 118px;\n    padding: 13px;\n  }\n  .incoming-transmission > p {\n    display: none;\n  }\n  .room-readout {\n    bottom: 114px;\n  }\n  .focus-console {\n    top: 90px;\n    bottom: 115px;\n  }\n  .console-chrome {\n    padding: 13px 22px;\n  }\n  .room-notice {\n    bottom: 116px;\n  }\n}\n@media (max-width: 700px) {\n  .crisis-room {\n    height: 100dvh;\n    min-height: 680px;\n  }\n  .room-hud {\n    padding: 20px 15px;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .operation-identity {\n    gap: 9px;\n  }\n  .operation-symbol {\n    display: none;\n  }\n  .exit-room {\n    width: 25px;\n    margin-right: 0;\n  }\n  .operation-identity .eyebrow {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .operation-identity h1 {\n    font-size: 16px;\n  }\n  .hud-status {\n    gap: 10px;\n    align-items: center;\n    flex-wrap: wrap;\n    justify-content: flex-end;\n    max-width: 165px;\n  }\n  .alert-state {\n    font-size: 7px;\n    letter-spacing: 1px;\n  }\n  .sim-clock {\n    padding-left: 10px;\n  }\n  .sim-clock strong {\n    font-size: 18px;\n    letter-spacing: 1px;\n  }\n  .sim-clock > span {\n    font-size: 5px;\n    letter-spacing: 0.5px;\n  }\n  .hud-tools {\n    width: 100%;\n    justify-content: flex-end;\n    gap: 7px;\n  }\n  .hud-tools .icon-control {\n    width: 25px;\n    height: 25px;\n    padding: 4px;\n  }\n  .fullscreen-control {\n    display: none !important;\n  }\n  .room-context {\n    top: 112px;\n    left: 24px;\n  }\n  .room-context > .eyebrow {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .room-context p {\n    font-size: 22px;\n    line-height: 1.4;\n    margin-top: 12px;\n  }\n  .context-coordinate {\n    font-size: 6px;\n    max-width: 100%;\n    margin-top: 16px;\n  }\n  .incoming-transmission {\n    left: 20px;\n    right: 20px;\n    bottom: 167px;\n    width: auto;\n    padding: 12px 14px;\n  }\n  .incoming-transmission > p {\n    display: none;\n  }\n  .incoming-transmission > button {\n    font-size: 12px;\n    padding-top: 8px;\n  }\n  .transmission-label {\n    font-size: 6px;\n    letter-spacing: 1px;\n  }\n  .room-readout {\n    display: none;\n  }\n  .operations-footer {\n    padding: 14px 14px 21px;\n    gap: 14px;\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n  .view-dock {\n    width: 100%;\n    order: 2;\n    padding: 4px;\n  }\n  .view-button {\n    flex: 1;\n    min-width: 0;\n    padding: 16px 4px 10px;\n    gap: 7px;\n  }\n  .view-name {\n    font-size: 7px;\n  }\n  .view-button app-crisis-icon {\n    width: 19px;\n    height: 19px;\n  }\n  .view-index {\n    left: 4px;\n    top: 4px;\n    font-size: 5px;\n  }\n  .view-button.active:after {\n    bottom: -5px;\n  }\n  .unread-dot {\n    top: 12px;\n    right: 14px;\n  }\n  .scenario-controls {\n    width: 100%;\n    flex: auto;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    order: 1;\n    padding: 0 5px;\n    gap: 8px;\n  }\n  .scenario-controls > span {\n    font-size: 6px;\n  }\n  .scenario-controls > div {\n    gap: 10px;\n  }\n  .play-button {\n    height: 24px;\n    width: 24px;\n    font-size: 16px;\n  }\n  .next-update {\n    font-size: 10px;\n  }\n  .room-scene {\n    width: 177.69vh;\n    height: 100vh;\n  }\n  .room-context {\n    z-index: 1;\n  }\n  .station-target {\n    left: 15%;\n    top: 61%;\n  }\n  .argus-target {\n    left: 86%;\n    top: 59%;\n  }\n  .spatial-target > span:not(.target-dot) {\n    font-size: 8px;\n    padding: 8px;\n    gap: 6px;\n  }\n  .spatial-target app-crisis-icon {\n    width: 11px;\n    height: 11px;\n  }\n  .focus-console {\n    left: 12px;\n    right: 12px;\n    top: 111px;\n    bottom: 157px;\n  }\n  .console-chrome {\n    padding: 13px 15px;\n    gap: 10px;\n  }\n  .console-chrome h2 {\n    font-size: 12px;\n  }\n  .console-reference {\n    display: none;\n  }\n  .return-room > span {\n    display: none;\n  }\n  .return-room app-crisis-icon {\n    width: 18px;\n    height: 18px;\n  }\n  .console-content {\n    padding: 20px;\n  }\n  .room-notice {\n    bottom: 159px;\n    width: calc(100% - 35px);\n    font-size: 11px;\n    padding: 8px 10px 8px 15px;\n  }\n  .reset-dialog {\n    max-width: calc(100vw - 35px);\n    padding: 25px;\n  }\n  .reset-dialog > div {\n    flex-wrap: wrap;\n  }\n  .reset-dialog button {\n    font-size: 11px;\n  }\n  .art-error {\n    left: 20%;\n    right: 20%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.wall-heading {\n  position: absolute;\n  top: 99px;\n  left: 5%;\n  right: 5%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  pointer-events: none;\n  animation: surface-reveal 0.6s 0.5s both;\n}\n.wall-heading h2 {\n  font-size: 22px;\n  margin-top: 9px;\n  font-weight: 350;\n  outline: none;\n}\n.wall-heading .eyebrow {\n  font-size: 8px;\n  letter-spacing: 2px;\n}\n.wall-heading button {\n  pointer-events: auto;\n  background: rgba(11, 34, 49, 0.8509803922);\n  border: 1px solid #476676;\n  padding: 10px 14px;\n}\n.wall-guidance {\n  position: absolute;\n  left: 50%;\n  bottom: 155px;\n  transform: translateX(-50%);\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font: 9px Consolas, monospace;\n  color: #a7c6cd;\n  white-space: nowrap;\n  background: rgba(10, 32, 41, 0.737254902);\n  padding: 12px 20px;\n  border: 1px solid rgba(70, 99, 106, 0.3333333333);\n  animation: surface-reveal 0.6s 0.75s both;\n  pointer-events: none;\n}\n.wall-guidance i {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #b4e9db;\n  box-shadow: 0 0 8px #b4e9db;\n}\n@keyframes surface-reveal {\n  from {\n    opacity: 0;\n    translate: 0 8px;\n  }\n  to {\n    opacity: 1;\n    translate: 0 0;\n  }\n}\n@media (max-width: 700px) {\n  .wall-heading {\n    top: 112px;\n    left: 20px;\n    right: 20px;\n  }\n  .wall-heading h2 {\n    font-size: 18px;\n  }\n  .wall-heading .eyebrow {\n    font-size: 6px;\n  }\n  .wall-heading button {\n    font-size: 0;\n    gap: 0;\n    padding: 8px;\n  }\n  .wall-guidance {\n    bottom: 165px;\n    font-size: 7px;\n    width: 90%;\n    white-space: normal;\n    line-height: 1.6;\n    padding: 9px 12px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wall-heading,\n  .wall-guidance {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=crisis-center.component.css.map */\n', '/* src/app/templates/crisis-operations/ui/crisis-simplified-shell.scss */\n.room-hud {\n  padding: 20px 24px;\n  gap: 20px;\n}\n.operation-identity {\n  gap: 12px;\n}\n.operation-identity h1 {\n  font-size: 19px;\n  margin-top: 5px;\n}\n.hud-status {\n  gap: 18px;\n}\n.sim-clock strong {\n  font-size: 23px;\n}\n.operations-footer {\n  justify-content: center;\n  gap: 28px;\n  padding: 14px 24px 20px;\n  pointer-events: none;\n}\n.operations-footer > * {\n  pointer-events: auto;\n}\n.view-dock {\n  padding: 5px;\n  background: rgba(11, 32, 44, 0.8549019608);\n  border-color: rgba(103, 134, 139, 0.3333333333);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2666666667);\n  gap: 2px;\n}\n.view-button {\n  min-width: 78px;\n  padding: 10px 13px;\n  border: 0;\n  gap: 6px;\n}\n.view-button.active {\n  background: rgba(54, 89, 79, 0.4);\n}\n.view-button.active:after {\n  display: none;\n}\n.view-button app-crisis-icon {\n  width: 18px;\n  height: 18px;\n}\n.view-name {\n  font-size: 10px;\n}\n.unread-dot {\n  top: 9px;\n  right: 18px;\n}\n.scenario-controls {\n  flex: none;\n  gap: 7px;\n}\n.scenario-controls > span {\n  font-size: 8px;\n  letter-spacing: 0.6px;\n}\n.next-update {\n  font-size: 11px;\n}\n.play-button {\n  width: 30px;\n  height: 30px;\n}\n.storage-note {\n  position: absolute;\n  bottom: 100%;\n  left: 24px;\n  color: #dbbc8b;\n  font-size: 11px;\n}\n.focus-console {\n  top: 92px;\n  bottom: 108px;\n  left: max(24px, (100vw - 1000px) / 2);\n  right: max(24px, (100vw - 1000px) / 2);\n  border-radius: 6px;\n  background: rgba(12, 33, 44, 0.9607843137);\n  border-color: rgba(108, 137, 145, 0.4);\n}\n.console-chrome {\n  padding: 16px 28px;\n  background: transparent;\n}\n.console-chrome h2 {\n  font-size: 15px;\n  letter-spacing: 0;\n}\n.console-content {\n  padding: 24px 32px;\n}\n.return-room {\n  background: transparent;\n  border-color: transparent;\n  color: #a9c5cb;\n}\n.wall-heading {\n  top: 105px;\n}\n.wall-heading h2 {\n  font-size: 21px;\n  margin-top: 0;\n}\n.wall-guidance {\n  font-family: "Segoe UI", sans-serif;\n  font-size: 10px;\n  letter-spacing: 0;\n}\n@media (min-width: 1600px) {\n  .focus-console {\n    top: 108px;\n    bottom: 120px;\n  }\n  .view-button {\n    min-width: 90px;\n  }\n}\n@media (max-width: 1050px) {\n  .operations-footer {\n    gap: 22px;\n  }\n  .view-button {\n    min-width: 65px;\n    padding: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .room-hud {\n    padding: 17px 16px;\n    gap: 12px;\n  }\n  .operation-identity {\n    gap: 8px;\n  }\n  .operation-identity h1 {\n    font-size: 16px;\n  }\n  .hud-status {\n    gap: 10px;\n  }\n  .sim-clock strong {\n    font-size: 20px;\n  }\n  .operations-footer {\n    padding: 12px 14px 18px;\n    flex-direction: column-reverse;\n    align-items: stretch;\n    gap: 12px;\n  }\n  .view-dock {\n    width: 100%;\n    gap: 0;\n    padding: 4px;\n  }\n  .view-button {\n    flex: 1;\n    min-width: 0;\n    padding: 9px 3px;\n    gap: 5px;\n  }\n  .view-name {\n    font-size: 9px;\n  }\n  .view-button app-crisis-icon {\n    width: 17px;\n    height: 17px;\n  }\n  .unread-dot {\n    right: 10px;\n    top: 8px;\n  }\n  .scenario-controls {\n    align-self: flex-end;\n    flex-direction: row;\n    align-items: center;\n    gap: 14px;\n  }\n  .scenario-controls > span {\n    font-size: 8px;\n  }\n  .next-update {\n    font-size: 10px;\n  }\n  .focus-console {\n    top: 106px;\n    bottom: 138px;\n    left: 12px;\n    right: 12px;\n  }\n  .console-chrome {\n    padding: 14px 18px;\n  }\n  .console-chrome h2 {\n    font-size: 14px;\n  }\n  .console-content {\n    padding: 18px;\n  }\n  .wall-heading {\n    top: 114px;\n  }\n  .wall-heading h2 {\n    font-size: 20px;\n  }\n  .wall-guidance {\n    font-size: 9px;\n    line-height: 1.5;\n  }\n}\n/*# sourceMappingURL=crisis-simplified-shell.css.map */\n', "/* src/app/templates/crisis-operations/ui/crisis-station-shell.scss */\n.specialized-station .operations-footer {\n  opacity: 0;\n  pointer-events: none;\n}\n.specialized-station .operations-footer > * {\n  pointer-events: none;\n}\n/*# sourceMappingURL=crisis-station-shell.css.map */\n"] }]
  }], () => [], { shortcut: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrisisCenterComponent, { className: "CrisisCenterComponent", filePath: "src/app/templates/crisis-operations/ui/crisis-center.component.ts", lineNumber: 49 });
})();
export {
  CrisisCenterComponent
};
//# debugId=6a91b673-f1e7-5aca-b70a-7e945c7e747b
//# sourceMappingURL=chunk-NMWYD2ZM.js.map
