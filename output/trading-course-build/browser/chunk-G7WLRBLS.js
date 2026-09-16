import {
  Component,
  Input,
  Output,
  computed,
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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
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
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";

// src/app/templates/journey-replay/ui/map/living-journey-map.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.voyageId;
function LivingJourneyMapComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 30)(1, "div")(2, "span", 31);
    \u0275\u0275text(3, "Expedition atlas");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275domElementStart(8, "small");
    \u0275\u0275text(9, "Chart your course \xB7 Record your story");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "header", 33)(11, "div", 34)(12, "button", 35);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setCover("regional"));
    });
    \u0275\u0275text(13, " Atlantic chart ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "button", 35);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setCover("world"));
    });
    \u0275\u0275text(15, " World chart ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "div", 36)(17, "button", 37);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomBy(-0.25));
    });
    \u0275\u0275text(18, " \u2212 ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "output", 38);
    \u0275\u0275text(20);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "button", 39);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomBy(0.25));
    });
    \u0275\u0275text(22, " + ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(23, "button", 35);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetView());
    });
    \u0275\u0275text(24, "Fit map");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.map().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.cover() === "regional" ? "Atlantic passage" : "World overview");
    \u0275\u0275advance(5);
    \u0275\u0275attribute("aria-pressed", ctx_r1.cover() === "regional");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.cover() === "world");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.zoom() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r1.zoom() * 100).toFixed(0), "%");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.zoom() >= 2.8);
  }
}
function LivingJourneyMapComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 7);
    \u0275\u0275domElement(1, "rect", 40)(2, "path", 41);
    \u0275\u0275domElementStart(3, "text", 42);
    \u0275\u0275text(4, "ATLANTIC");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "text", 43);
    \u0275\u0275text(6, "OCEAN");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "text", 44);
    \u0275\u0275text(8, "INDIAN OCEAN");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "text", 45);
    \u0275\u0275text(10, "PACIFIC OCEAN");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "text", 46);
    \u0275\u0275text(12, "AFRICA");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "text", 47);
    \u0275\u0275text(14, " SOUTH AMERICA ");
    \u0275\u0275domElementEnd()();
  }
}
function LivingJourneyMapComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 8);
    \u0275\u0275domElement(1, "path", 48)(2, "path", 49)(3, "path", 50)(4, "path", 51);
    \u0275\u0275domElementStart(5, "g", 52);
    \u0275\u0275domElement(6, "circle", 53);
    \u0275\u0275domElementStart(7, "text", 54);
    \u0275\u0275text(8, "STORM");
    \u0275\u0275domElementEnd()()();
  }
}
function LivingJourneyMapComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 9);
    \u0275\u0275domElement(1, "ellipse", 55)(2, "ellipse", 56);
    \u0275\u0275domElementStart(3, "text", 57);
    \u0275\u0275text(4, "HIGH SEAS");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "text", 58);
    \u0275\u0275text(6, "REEFS");
    \u0275\u0275domElementEnd()();
  }
}
function LivingJourneyMapComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 10);
    \u0275\u0275domElement(1, "path", 59);
    \u0275\u0275domElementStart(2, "text", 60);
    \u0275\u0275text(3, "INDIAN OCEAN TRADE");
    \u0275\u0275domElementEnd()();
  }
}
function LivingJourneyMapComponent_For_19_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text", 64);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const route_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r1.candidateLabelPoint(route_r4).x)("y", ctx_r1.candidateLabelPoint(route_r4).y - 7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.candidateLabel(route_r4.id), " ");
  }
}
function LivingJourneyMapComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 61);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_For_19_Template_g_click_0_listener() {
      const route_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspectRoute(route_r4.id));
    })("keydown.enter", function LivingJourneyMapComponent_For_19_Template_g_keydown_enter_0_listener() {
      const route_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspectRoute(route_r4.id));
    })("keydown.space", function LivingJourneyMapComponent_For_19_Template_g_keydown_space_0_listener($event) {
      const route_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.inspectRoute(route_r4.id));
    });
    \u0275\u0275domElementStart(1, "title");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "path", 62)(4, "path", 63);
    \u0275\u0275conditionalCreate(5, LivingJourneyMapComponent_For_19_Conditional_5_Template, 2, 3, ":svg:text", 64);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const route_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r1.selectedRouteId() === route_r4.id);
    \u0275\u0275attribute("aria-label", ctx_r1.candidateAriaLabel(route_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.candidateAriaLabel(route_r4));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r1.candidatePath(route_r4.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r1.candidatePath(route_r4.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showRouteLabels() ? 5 : -1);
  }
}
function LivingJourneyMapComponent_For_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 67);
  }
  if (rf & 2) {
    const layer_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("d", ctx_r1.path(layer_r5.route));
  }
}
function LivingJourneyMapComponent_For_22_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 68);
    \u0275\u0275domElement(1, "circle", 69);
    \u0275\u0275domElementStart(2, "text", 70);
    \u0275\u0275text(3, "\u2022");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "title");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const event_r6 = ctx.$implicit;
    const layer_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + ctx_r1.project(event_r6.point).x + " " + ctx_r1.project(event_r6.point).y + ")");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", layer_r5.team.name, " \xB7 ", event_r6.label);
  }
}
function LivingJourneyMapComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "path", 65)(2, "path", 66);
    \u0275\u0275conditionalCreate(3, LivingJourneyMapComponent_For_22_Conditional_3_Template, 1, 1, ":svg:path", 67);
    \u0275\u0275repeaterCreate(4, LivingJourneyMapComponent_For_22_For_5_Template, 6, 3, ":svg:g", 68, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const layer_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%route-color", layer_r5.team.color);
    \u0275\u0275classProp("featured", ctx_r1.featuredVoyageId() === layer_r5.voyageId)("context-route", ctx_r1.featuredVoyageId() !== void 0 && ctx_r1.featuredVoyageId() !== layer_r5.voyageId);
    \u0275\u0275attribute("class", "voyage " + ctx_r1.teamClass(layer_r5.team));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r1.path(layer_r5.route));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r1.path(layer_r5.route));
    \u0275\u0275advance();
    \u0275\u0275conditional(layer_r5.team.linePattern === "double" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(layer_r5.events);
  }
}
function LivingJourneyMapComponent_For_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text", 76);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function LivingJourneyMapComponent_For_25_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "text", 77);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.voyageIds.length, " routes");
  }
}
function LivingJourneyMapComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 71);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_For_25_Template_g_click_0_listener() {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(location_r8));
    })("keydown.enter", function LivingJourneyMapComponent_For_25_Template_g_keydown_enter_0_listener() {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(location_r8));
    })("keydown.space", function LivingJourneyMapComponent_For_25_Template_g_keydown_space_0_listener($event) {
      const location_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.inspect(location_r8));
    });
    \u0275\u0275domElementStart(1, "g");
    \u0275\u0275domElement(2, "circle", 72)(3, "path", 73)(4, "circle", 74);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "text", 75);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, LivingJourneyMapComponent_For_25_Conditional_7_Template, 2, 1, ":svg:text", 76);
    \u0275\u0275conditionalCreate(8, LivingJourneyMapComponent_For_25_Conditional_8_Template, 2, 1, ":svg:text", 77);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    let tmp_24_0;
    const location_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("inspected", ctx_r1.inspectedLocationId() === location_r8.id)("shared", ctx_r1.intersectionAt(location_r8.id))("candidate-destination", ctx_r1.candidateDestinationIds().has(location_r8.id))("candidate-map-option", ctx_r1.candidateLocations().has(location_r8.id))("selected-destination", ctx_r1.selectedDestinationId() === location_r8.id || ctx_r1.selectedCandidateLocationId() === location_r8.id)("active-decision", ctx_r1.activeLocationId() === location_r8.id);
    \u0275\u0275attribute("transform", "translate(" + ctx_r1.locationPoint(location_r8).x + " " + ctx_r1.locationPoint(location_r8).y + ")")("aria-label", ctx_r1.locationAriaLabel(location_r8));
    \u0275\u0275advance();
    \u0275\u0275attribute("transform", ctx_r1.cover() === "regional" ? "scale(.62)" : null);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("x", ctx_r1.labelPlacement(location_r8).x)("y", ctx_r1.labelPlacement(location_r8).y)("text-anchor", ctx_r1.labelPlacement(location_r8).anchor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", location_r8.shortName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = ctx_r1.candidateLocationLabels()[location_r8.id]) ? 7 : -1, tmp_23_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_24_0 = ctx_r1.intersectionAt(location_r8.id)) ? 8 : -1, tmp_24_0);
  }
}
function LivingJourneyMapComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 78);
    \u0275\u0275domElement(1, "ellipse", 80)(2, "path", 81)(3, "image", 82);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("href", ctx_r1.vesselArt());
  }
}
function LivingJourneyMapComponent_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "ellipse", 83)(2, "path", 84)(3, "path", 85)(4, "path", 86)(5, "path", 87);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", ctx_r1.cover() === "regional" ? "translate(0 -13) scale(.65)" : "translate(0 -18)");
  }
}
function LivingJourneyMapComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 17);
    \u0275\u0275conditionalCreate(1, LivingJourneyMapComponent_Conditional_26_Conditional_1_Template, 4, 1, ":svg:g", 78)(2, LivingJourneyMapComponent_Conditional_26_Conditional_2_Template, 6, 1, ":svg:g");
    \u0275\u0275domElement(3, "circle", 79);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ship_r9 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + ctx_r1.project(ship_r9).x + " " + ctx_r1.project(ship_r9).y + ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.expeditionStyle() && ctx_r1.vesselArt() ? 1 : 2);
  }
}
function LivingJourneyMapComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 18);
    \u0275\u0275domElement(1, "path", 88);
    \u0275\u0275domElementStart(2, "text", 89);
    \u0275\u0275text(3, "TERRA INCOGNITA");
    \u0275\u0275domElementEnd()();
  }
}
function LivingJourneyMapComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 29)(1, "button", 90);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_42_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pan(-45, 0));
    });
    \u0275\u0275text(2, "\u2190");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 91);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_42_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pan(0, -32));
    });
    \u0275\u0275text(4, "\u2191");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 92);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_42_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pan(0, 32));
    });
    \u0275\u0275text(6, "\u2193");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 93);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_42_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pan(45, 0));
    });
    \u0275\u0275text(8, "\u2192");
    \u0275\u0275domElementEnd()();
  }
}
function LivingJourneyMapComponent_Conditional_43_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275domElement(1, "i", 100);
    \u0275\u0275text(2, "Other class voyages");
    \u0275\u0275domElementEnd();
  }
}
function LivingJourneyMapComponent_Conditional_43_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 35);
    \u0275\u0275domListener("click", function LivingJourneyMapComponent_Conditional_43_For_15_Template_button_click_0_listener() {
      const lens_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleLens(lens_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const lens_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.lensOn(lens_r12));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lens_r12, " ");
  }
}
function LivingJourneyMapComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 94)(1, "span");
    \u0275\u0275domElement(2, "i", 95);
    \u0275\u0275text(3, "Ports & waypoints");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span");
    \u0275\u0275domElement(5, "i", 96);
    \u0275\u0275text(6, "Possible passage");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span");
    \u0275\u0275domElement(8, "i", 97);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(10, LivingJourneyMapComponent_Conditional_43_Conditional_10_Template, 3, 0, "span");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "footer", 98)(12, "span");
    \u0275\u0275text(13, "Chart overlays");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(14, LivingJourneyMapComponent_Conditional_43_For_15_Template, 2, 2, "button", 99, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275styleProp("background", ctx_r1.team().color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.featuredVoyageId() ? "Featured voyage" : "Recorded voyage");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.featuredVoyageId() && ctx_r1.classVoyages().length > 1 ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.map().lenses);
  }
}
var LivingJourneyMapComponent = class _LivingJourneyMapComponent {
  map = input.required(
    ...ngDevMode ? [{ debugName: "map" }] : (
      /* istanbul ignore next */
      []
    )
  );
  route = input(
    [],
    ...ngDevMode ? [{ debugName: "route" }] : (
      /* istanbul ignore next */
      []
    )
  );
  team = input.required(
    ...ngDevMode ? [{ debugName: "team" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateRouteIds = input(
    [],
    ...ngDevMode ? [{ debugName: "candidateRouteIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateRouteLabels = input(
    {},
    ...ngDevMode ? [{ debugName: "candidateRouteLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedRouteId = input(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedRouteId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateLocationIds = input(
    [],
    ...ngDevMode ? [{ debugName: "candidateLocationIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateLocationLabels = input(
    {},
    ...ngDevMode ? [{ debugName: "candidateLocationLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCandidateLocationId = input(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedCandidateLocationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeLocationId = input(
    void 0,
    ...ngDevMode ? [{ debugName: "activeLocationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  immersive = input(
    false,
    ...ngDevMode ? [{ debugName: "immersive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showRouteLabels = input(
    true,
    ...ngDevMode ? [{ debugName: "showRouteLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expeditionStyle = input(
    false,
    ...ngDevMode ? [{ debugName: "expeditionStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vesselArt = input(
    ...ngDevMode ? [void 0, { debugName: "vesselArt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dragOrigin;
  startPan(event) {
    if (!this.expeditionStyle() || event.target.closest('[role="button"]'))
      return;
    const surface = event.currentTarget;
    const box = surface.getBoundingClientRect(), view = this.viewBox().split(" ").map(Number);
    this.dragOrigin = {
      x: event.clientX,
      y: event.clientY,
      panX: this.panX(),
      panY: this.panY(),
      scale: Math.min(box.width / view[2], box.height / view[3])
    };
    surface.setPointerCapture(event.pointerId);
  }
  dragPan(event) {
    const start = this.dragOrigin;
    if (!start)
      return;
    this.panX.set(start.panX - (event.clientX - start.x) / start.scale);
    this.panY.set(start.panY - (event.clientY - start.y) / start.scale);
  }
  endPan() {
    this.dragOrigin = void 0;
  }
  classVoyages = input(
    [],
    ...ngDevMode ? [{ debugName: "classVoyages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  featuredVoyageId = input(
    void 0,
    ...ngDevMode ? [{ debugName: "featuredVoyageId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  intersections = input(
    [],
    ...ngDevMode ? [{ debugName: "intersections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapLabel = input(
    "Living journey map",
    ...ngDevMode ? [{ debugName: "mapLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locationInspected = output();
  routeInspected = output();
  cover = signal(
    "regional",
    ...ngDevMode ? [{ debugName: "cover" }] : (
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
  panX = signal(
    0,
    ...ngDevMode ? [{ debugName: "panX" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panY = signal(
    0,
    ...ngDevMode ? [{ debugName: "panY" }] : (
      /* istanbul ignore next */
      []
    )
  );
  enabledLenses = signal(
    /* @__PURE__ */ new Set(["navigation"]),
    ...ngDevMode ? [{ debugName: "enabledLenses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectedLocationId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "inspectedLocationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewBox = computed(
    () => {
      const base = this.cover() === "world" ? { x: 0, y: 0, width: 1e3, height: 500 } : this.regionalView();
      const zoom = this.zoom();
      const width = base.width / zoom;
      const height = base.height / zoom;
      const x = base.x + (base.width - width) / 2 + this.panX();
      const y = base.y + (base.height - height) / 2 + this.panY();
      return `${x} ${y} ${width} ${height}`;
    },
    ...ngDevMode ? [{ debugName: "viewBox" }] : (
      /* istanbul ignore next */
      []
    )
  );
  voyageLayers = computed(
    () => {
      const classVoyages = this.classVoyages();
      if (classVoyages.length > 0)
        return classVoyages.map((voyage) => this.classLayer(voyage));
      return [
        {
          voyageId: "active-voyage",
          team: this.team(),
          route: this.route(),
          events: this.route().filter((point) => point.eventId !== void 0).map((point) => ({ point, label: "Recorded journey event" }))
        }
      ];
    },
    ...ngDevMode ? [{ debugName: "voyageLayers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentPoint = computed(
    () => this.route().at(-1),
    ...ngDevMode ? [{ debugName: "currentPoint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateRoutes = computed(
    () => {
      const ids = new Set(this.candidateRouteIds());
      return this.map().routes.filter((route) => ids.has(route.id));
    },
    ...ngDevMode ? [{ debugName: "candidateRoutes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateDestinationIds = computed(
    () => new Set(this.candidateRoutes().map((route) => route.toLocationId)),
    ...ngDevMode ? [{ debugName: "candidateDestinationIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDestinationId = computed(
    () => this.map().routes.find((route) => route.id === this.selectedRouteId())?.toLocationId,
    ...ngDevMode ? [{ debugName: "selectedDestinationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  candidateLocations = computed(
    () => new Set(this.candidateLocationIds()),
    ...ngDevMode ? [{ debugName: "candidateLocations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  project(point) {
    return {
      x: (point.longitude + 180) / 360 * 1e3,
      y: (90 - point.latitude) / 180 * 500
    };
  }
  path(points) {
    return points.map((point, index) => {
      const projected = this.project(point);
      return `${index === 0 ? "M" : "L"}${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
    }).join(" ");
  }
  candidatePath(routeId) {
    return this.path(this.map().routes.find((route) => route.id === routeId)?.coordinates ?? []);
  }
  candidateLabelPoint(route) {
    const point = route.coordinates[Math.floor(route.coordinates.length / 2)];
    return this.project(point ?? this.map().locations[0] ?? { latitude: 0, longitude: 0 });
  }
  candidateLabel(routeId) {
    return this.candidateRouteLabels()[routeId] ?? "Possible route";
  }
  candidateAriaLabel(route) {
    return `${this.candidateLabel(route.id)}. ${route.distanceLabel}. ${route.risk} risk. ${route.windLabel}. Open route details.`;
  }
  locationPoint(location) {
    return this.project(location);
  }
  labelPlacement(location) {
    const point = this.project(location);
    const neighbor = this.map().locations.find((other) => {
      if (other.id === location.id)
        return false;
      const otherPoint = this.project(other);
      return Math.abs(point.x - otherPoint.x) < 18 && Math.abs(point.y - otherPoint.y) < 12;
    });
    const offset = this.cover() === "regional" ? 9 : 14;
    if (this.expeditionStyle() && neighbor && location.longitude < neighbor.longitude) {
      return { x: offset, y: -14, anchor: "start" };
    }
    if (neighbor && location.longitude < neighbor.longitude) {
      return { x: -offset, y: -5, anchor: "end" };
    }
    return { x: offset, y: neighbor ? 11 : 3, anchor: "start" };
  }
  teamClass(team) {
    return `pattern-${team.linePattern}`;
  }
  lensOn(lens) {
    return this.enabledLenses().has(lens);
  }
  toggleLens(lens) {
    this.enabledLenses.update((current) => {
      const next = new Set(current);
      if (next.has(lens))
        next.delete(lens);
      else
        next.add(lens);
      return next;
    });
  }
  setCover(cover) {
    this.cover.set(cover);
    this.resetView();
  }
  zoomBy(delta) {
    this.zoom.update((value) => Math.max(1, Math.min(2.8, value + delta)));
  }
  pan(dx, dy) {
    const scale = 1 / this.zoom();
    this.panX.update((value) => value + dx * scale);
    this.panY.update((value) => value + dy * scale);
  }
  resetView() {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }
  focusArea(focus) {
    this.cover.set(focus.cover);
    if (!focus.bounds) {
      this.resetView();
      return;
    }
    const base = focus.cover === "world" ? { x: 0, y: 0, width: 1e3, height: 500 } : this.regionalView();
    const topLeft = this.project({
      longitude: focus.bounds.west,
      latitude: focus.bounds.north
    });
    const bottomRight = this.project({
      longitude: focus.bounds.east,
      latitude: focus.bounds.south
    });
    const targetWidth = Math.max(1, bottomRight.x - topLeft.x);
    const targetHeight = Math.max(1, bottomRight.y - topLeft.y);
    const padding = 1.45;
    const nextZoom = Math.max(1, Math.min(2.8, Math.min(base.width / (targetWidth * padding), base.height / (targetHeight * padding))));
    const targetCenterX = (topLeft.x + bottomRight.x) / 2;
    const targetCenterY = (topLeft.y + bottomRight.y) / 2;
    this.zoom.set(nextZoom);
    this.panX.set(targetCenterX - (base.x + base.width / 2));
    this.panY.set(targetCenterY - (base.y + base.height / 2));
  }
  inspect(location) {
    this.inspectedLocationId.set(location.id);
    this.locationInspected.emit(location);
  }
  inspectRoute(routeId) {
    this.routeInspected.emit(routeId);
  }
  locationAriaLabel(location) {
    const choiceHint = this.candidateDestinationIds().has(location.id) || this.candidateLocations().has(location.id) ? ` Available option${this.candidateLocationLabels()[location.id] ? `: ${this.candidateLocationLabels()[location.id]}` : ""}. Open details.` : "";
    const currentHint = this.activeLocationId() === location.id ? " Current decision location." : "";
    return `${location.name}. ${location.description}${choiceHint}${currentHint}`;
  }
  intersectionAt(locationId) {
    return this.intersections().find((intersection) => intersection.locationId === locationId);
  }
  mapKey(event) {
    const actions = {
      ArrowLeft: () => this.pan(-45, 0),
      ArrowRight: () => this.pan(45, 0),
      ArrowUp: () => this.pan(0, -32),
      ArrowDown: () => this.pan(0, 32),
      Home: () => this.resetView(),
      "+": () => this.zoomBy(0.25),
      "=": () => this.zoomBy(0.25),
      "-": () => this.zoomBy(-0.25)
    };
    const action = actions[event.key];
    if (action === void 0)
      return;
    event.preventDefault();
    action();
  }
  regionalView() {
    const { bounds } = this.map().regionalCover;
    const topLeft = this.project({ longitude: bounds.west, latitude: bounds.north });
    const bottomRight = this.project({ longitude: bounds.east, latitude: bounds.south });
    return {
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    };
  }
  classLayer(voyage) {
    return {
      voyageId: voyage.voyageId,
      team: voyage.team,
      route: voyage.route,
      events: voyage.route.filter((point) => point.eventLabel !== void 0).map((point) => ({ point, label: point.eventLabel ?? "Journey event" }))
    };
  }
  static \u0275fac = function LivingJourneyMapComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LivingJourneyMapComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LivingJourneyMapComponent, selectors: [["app-living-journey-map"]], inputs: { map: [1, "map"], route: [1, "route"], team: [1, "team"], candidateRouteIds: [1, "candidateRouteIds"], candidateRouteLabels: [1, "candidateRouteLabels"], selectedRouteId: [1, "selectedRouteId"], candidateLocationIds: [1, "candidateLocationIds"], candidateLocationLabels: [1, "candidateLocationLabels"], selectedCandidateLocationId: [1, "selectedCandidateLocationId"], activeLocationId: [1, "activeLocationId"], immersive: [1, "immersive"], showRouteLabels: [1, "showRouteLabels"], expeditionStyle: [1, "expeditionStyle"], vesselArt: [1, "vesselArt"], classVoyages: [1, "classVoyages"], featuredVoyageId: [1, "featuredVoyageId"], intersections: [1, "intersections"], mapLabel: [1, "mapLabel"] }, outputs: { locationInspected: "locationInspected", routeInspected: "routeInspected" }, decls: 44, vars: 18, consts: [["aria-label", "Journey map workspace", 1, "atlas"], [1, "map-stage"], ["tabindex", "0", "role", "group", 1, "world-map", 3, "keydown", "pointerdown", "pointermove", "pointerup", "pointercancel", "lostpointercapture"], ["id", "longitude-grid", "width", "83.333", "height", "83.333", "patternUnits", "userSpaceOnUse"], ["d", "M83.333 0H0V83.333", "fill", "none", "stroke", "#557f82", "stroke-width", "0.8", "opacity", ".28"], ["href", "/journey-replay/world-coastlines.svg", "width", "1000", "height", "500", "preserveAspectRatio", "none", "aria-hidden", "true"], ["href", "/journey-replay/world-atlas-v1.webp", "width", "1000", "height", "500", "preserveAspectRatio", "none", "aria-hidden", "true"], ["aria-hidden", "true", 1, "navigation-layer"], ["aria-label", "Weather lens", 1, "weather-layer"], ["aria-label", "Risk lens", 1, "risk-layer"], ["aria-label", "Trade lens", 1, "trade-layer"], ["aria-label", "Available routes", 1, "candidate-routes"], ["role", "button", "tabindex", "0", 1, "candidate-route", 3, "selected"], ["aria-label", "Recorded voyage routes", 1, "voyage-routes"], [3, "featured", "context-route", "--%NS%route-color"], ["aria-label", "Map locations", 1, "locations"], ["role", "button", "tabindex", "0", 1, "location", 3, "inspected", "shared", "candidate-destination", "candidate-map-option", "selected-destination", "active-decision"], ["aria-label", "Current expedition position", 1, "ship"], ["aria-label", "Uncharted regions", 1, "knowledge-fog"], ["aria-hidden", "true", 1, "chart-compass"], ["viewBox", "0 0 100 100"], ["cx", "50", "cy", "50", "r", "34"], ["cx", "50", "cy", "50", "r", "29"], ["d", "M50 13L57 43 87 50 57 57 50 87 43 57 13 50 43 43Z"], ["d", "M50 13V50L43 43ZM87 50H50L57 43ZM50 87V50L57 57ZM13 50H50L43 57Z", 1, "compass-light"], ["x", "50", "y", "10"], ["x", "50", "y", "99"], ["x", "5", "y", "54"], ["x", "95", "y", "54"], ["aria-label", "Pan map", 1, "pan-pad"], [1, "chart-heading"], [1, "chart-kicker"], [1, "chart-edition"], [1, "atlas-tools"], ["aria-label", "Map scale", 1, "cover-switch"], ["type", "button", 3, "click"], ["aria-label", "Map zoom", 1, "zoom-tools"], ["type", "button", "aria-label", "Zoom out", 3, "click", "disabled"], ["aria-label", "Zoom level"], ["type", "button", "aria-label", "Zoom in", 3, "click", "disabled"], ["width", "1000", "height", "500", "fill", "url(#longitude-grid)"], ["d", "M0 250H1000", 1, "equator"], ["x", "403", "y", "220", "transform", "rotate(-12 403 220)", 1, "ocean-label"], ["x", "398", "y", "233", "transform", "rotate(-12 398 233)", 1, "ocean-label"], ["x", "692", "y", "322", 1, "ocean-label"], ["x", "134", "y", "275", 1, "ocean-label"], ["x", "523", "y", "221", 1, "land-label"], ["x", "310", "y", "300", "transform", "rotate(25 310 300)", 1, "land-label"], ["d", "M402 154C363 168 328 186 301 221"], ["d", "M302 221l15-3-8 13"], ["d", "M431 244C391 262 357 283 329 314"], ["d", "M329 314l15-3-8 13"], ["transform", "translate(390 275)"], ["r", "25"], ["y", "5"], ["cx", "552", "cy", "344", "rx", "54", "ry", "31"], ["cx", "408", "cy", "276", "rx", "47", "ry", "29"], ["x", "552", "y", "349"], ["x", "408", "y", "281"], ["d", "M475 147Q570 116 705 190T792 209"], ["x", "619", "y", "139"], ["role", "button", "tabindex", "0", 1, "candidate-route", 3, "click", "keydown.enter", "keydown.space"], [1, "route-hit"], [1, "route-option"], [1, "route-choice-label"], [1, "route-shadow"], [1, "route-line"], [1, "route-line", "double-line"], [1, "event-marker"], ["r", "7"], ["y", "3"], ["role", "button", "tabindex", "0", 1, "location", 3, "click", "keydown.enter", "keydown.space"], ["r", "14", 1, "location-ring"], ["d", "M0-8A7 7 0 0 1 7-1C7 4 0 10 0 10S-7 4-7-1A7 7 0 0 1 0-8Z", 1, "port-pin"], ["cy", "-1", "r", "2", 1, "pin-center"], [1, "location-label"], ["y", "-16", 1, "map-option-label"], ["y", "-13", 1, "shared-count"], ["transform", "translate(0 -14) scale(.45)", 1, "painted-vessel"], ["r", "11"], ["cx", "0", "cy", "7", "rx", "18", "ry", "3"], ["d", "M-17-18Q-6-16 4-18L3-3Q-8 0-18-3ZM6-17Q14-15 23-17L21-5Q13-2 6-4Z", "fill", "#ecdcaa", "stroke", "#8b7856", "stroke-width", ".3"], ["x", "-35", "y", "-30", "width", "70", "height", "46.7"], ["cy", "10", "rx", "19", "ry", "4"], ["d", "M-19 2Q0 7 19 0L12 11H-10Z", 1, "ship-hull"], ["d", "M-4-30V5M9-22V4M-17-2L-4-28 18-1", 1, "ship-rigging"], ["d", "M-6-27Q-17-15-13-5L-6-6ZM-2-28Q13-17 6-7H-2ZM11-21Q22-12 17-5L11-4Z", 1, "ship-sails"], ["d", "M-4-30L6-29-4-25Z", 1, "ship-flag"], ["d", "M620 75Q740 42 965 95L990 420Q802 462 666 427T620 75Z"], ["x", "785", "y", "260"], ["type", "button", "aria-label", "Pan left", 3, "click"], ["type", "button", "aria-label", "Pan up", 3, "click"], ["type", "button", "aria-label", "Pan down", 3, "click"], ["type", "button", "aria-label", "Pan right", 3, "click"], ["aria-label", "Map legend", 1, "chart-legend"], [1, "legend-port"], [1, "legend-route"], [1, "legend-voyage"], ["aria-label", "Map lenses", 1, "lens-tray"], ["type", "button"], [1, "legend-class"]], template: function LivingJourneyMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, LivingJourneyMapComponent_Conditional_1_Template, 25, 7);
      \u0275\u0275domElementStart(2, "div", 1);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 2);
      \u0275\u0275domListener("keydown", function LivingJourneyMapComponent_Template_svg_keydown_3_listener($event) {
        return ctx.mapKey($event);
      })("pointerdown", function LivingJourneyMapComponent_Template_svg_pointerdown_3_listener($event) {
        return ctx.startPan($event);
      })("pointermove", function LivingJourneyMapComponent_Template_svg_pointermove_3_listener($event) {
        return ctx.dragPan($event);
      })("pointerup", function LivingJourneyMapComponent_Template_svg_pointerup_3_listener() {
        return ctx.endPan();
      })("pointercancel", function LivingJourneyMapComponent_Template_svg_pointercancel_3_listener() {
        return ctx.endPan();
      })("lostpointercapture", function LivingJourneyMapComponent_Template_svg_lostpointercapture_3_listener() {
        return ctx.endPan();
      });
      \u0275\u0275domElementStart(4, "title");
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "desc");
      \u0275\u0275text(7, " Geographic map with recorded voyage routes, available route choices, ports, evidence, weather, trade, and risk overlays. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "defs")(9, "pattern", 3);
      \u0275\u0275domElement(10, "path", 4);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(11, "image", 5)(12, "image", 6);
      \u0275\u0275conditionalCreate(13, LivingJourneyMapComponent_Conditional_13_Template, 15, 0, ":svg:g", 7);
      \u0275\u0275conditionalCreate(14, LivingJourneyMapComponent_Conditional_14_Template, 9, 0, ":svg:g", 8);
      \u0275\u0275conditionalCreate(15, LivingJourneyMapComponent_Conditional_15_Template, 7, 0, ":svg:g", 9);
      \u0275\u0275conditionalCreate(16, LivingJourneyMapComponent_Conditional_16_Template, 4, 0, ":svg:g", 10);
      \u0275\u0275domElementStart(17, "g", 11);
      \u0275\u0275repeaterCreate(18, LivingJourneyMapComponent_For_19_Template, 6, 7, ":svg:g", 12, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "g", 13);
      \u0275\u0275repeaterCreate(21, LivingJourneyMapComponent_For_22_Template, 6, 10, ":svg:g", 14, _forTrack1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "g", 15);
      \u0275\u0275repeaterCreate(24, LivingJourneyMapComponent_For_25_Template, 9, 21, ":svg:g", 16, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(26, LivingJourneyMapComponent_Conditional_26_Template, 4, 2, ":svg:g", 17);
      \u0275\u0275conditionalCreate(27, LivingJourneyMapComponent_Conditional_27_Template, 4, 0, ":svg:g", 18);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(28, "div", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(29, "svg", 20);
      \u0275\u0275domElement(30, "circle", 21)(31, "circle", 22)(32, "path", 23)(33, "path", 24);
      \u0275\u0275domElementStart(34, "text", 25);
      \u0275\u0275text(35, "N");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "text", 26);
      \u0275\u0275text(37, "S");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(38, "text", 27);
      \u0275\u0275text(39, "W");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "text", 28);
      \u0275\u0275text(41, "E");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(42, LivingJourneyMapComponent_Conditional_42_Template, 9, 0, "div", 29);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(43, LivingJourneyMapComponent_Conditional_43_Template, 16, 4);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_14_0;
      \u0275\u0275classProp("regional", ctx.cover() === "regional")("immersive", ctx.immersive())("expedition-style", ctx.expeditionStyle());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.immersive() ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("viewBox", ctx.viewBox())("aria-label", ctx.mapLabel());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.map().title);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.lensOn("navigation") ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.lensOn("weather") ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.lensOn("risk") ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.lensOn("trade") ? 16 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.candidateRoutes());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.voyageLayers());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.map().locations);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_14_0 = ctx.currentPoint()) ? 26 : -1, tmp_14_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.route().length < 5 && ctx.classVoyages().length === 0 ? 27 : -1);
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.zoom() > 1 ? 42 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.immersive() ? 43 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #eee0bd;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.atlas[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid #aa8c50;\n  border-radius: 0.6rem;\n  background: #151d1c;\n  box-shadow: 0 1.2rem 3rem rgba(5, 9, 8, 0.6), inset 0 0 0 3px rgba(183, 154, 88, 0.1254901961);\n}\n.chart-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  background:\n    linear-gradient(\n      115deg,\n      #173b3c,\n      #0c2429);\n}\n.chart-kicker[_ngcontent-%COMP%] {\n  color: #dbb86f;\n  font: 800 0.6rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n}\n.chart-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: #f3e6c6;\n  font: 400 clamp(1.25rem, 2vw, 1.8rem) Georgia, serif;\n}\n.chart-edition[_ngcontent-%COMP%] {\n  color: #d8c794;\n  font: italic 0.8rem Georgia, serif;\n  text-align: right;\n}\n.chart-edition[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  color: #9bb6b1;\n  font: 0.6rem ui-sans-serif, sans-serif;\n}\n.atlas-tools[_ngcontent-%COMP%], \n.lens-tray[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  padding: 0.55rem 0.7rem;\n  background:\n    linear-gradient(\n      90deg,\n      #172724,\n      #21352d 50%,\n      #17241f);\n}\n.atlas-tools[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #816a41;\n}\n.cover-switch[_ngcontent-%COMP%], \n.zoom-tools[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 2.45rem;\n  border: 1px solid #806b43;\n  border-radius: 0.35rem;\n  padding: 0.42rem 0.66rem;\n  color: #e9ddbd;\n  background: #283c34;\n  font:\n    750 0.76rem/1.1 ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-transform: capitalize;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled), \nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #e8c774;\n  color: #1e2823;\n  background: #dfc47c;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \n.world-map[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #72d4dc;\n  outline-offset: 2px;\n}\noutput[_ngcontent-%COMP%] {\n  min-width: 3.4rem;\n  color: #ddc88e;\n  font: 750 0.75rem ui-monospace, monospace;\n  text-align: center;\n}\n.map-stage[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 28rem;\n  overflow: hidden;\n  background: #143c44;\n}\n.map-stage[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 4rem rgba(3, 26, 36, 0.5019607843), inset 0 0 0 5px rgba(212, 189, 117, 0.1411764706);\n}\n.world-map[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: clamp(28rem, 100dvh - 22rem, 46rem);\n  min-height: 28rem;\n  background: #143c44;\n  transition: background 180ms ease;\n}\n.navigation-layer[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.equator[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #efe0a8;\n  stroke-width: 0.5;\n  stroke-dasharray: 3 5;\n  opacity: 0.3;\n}\n.ocean-label[_ngcontent-%COMP%] {\n  fill: #c1d8cb;\n  opacity: 0.68;\n  font: italic 9px Georgia, serif;\n  letter-spacing: 2px;\n  text-anchor: middle;\n}\n.land-label[_ngcontent-%COMP%] {\n  fill: #f2e4b8;\n  font: 7px Georgia, serif;\n  letter-spacing: 1.7px;\n  text-anchor: middle;\n  paint-order: stroke;\n  stroke: #463e26;\n  stroke-width: 0.5;\n}\n.candidate-route[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.expedition-style[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%] {\n  touch-action: none;\n  cursor: grab;\n}\n.expedition-style[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.expedition-style[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%]    > image[_ngcontent-%COMP%] {\n  filter: saturate(0.86) contrast(1.12) brightness(0.91);\n}\n.expedition-style[_ngcontent-%COMP%]   .map-stage[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 110px rgba(2, 27, 45, 0.5019607843);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(232, 195, 106, 0.0509803922),\n      transparent 45%,\n      rgba(1, 29, 45, 0.0941176471));\n}\n.expedition-style[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]:not(.candidate-destination):not(.active-decision):not(.inspected)   .location-label[_ngcontent-%COMP%] {\n  opacity: 0.45;\n  font-weight: 400;\n}\n.expedition-style[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]:hover   .location-label[_ngcontent-%COMP%], \n.expedition-style[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]:focus-visible   .location-label[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n}\n.expedition-style[_ngcontent-%COMP%]   .candidate-destination[_ngcontent-%COMP%]   .location-label[_ngcontent-%COMP%], \n.expedition-style[_ngcontent-%COMP%]   .active-decision[_ngcontent-%COMP%]   .location-label[_ngcontent-%COMP%] {\n  fill: #ffedaf;\n  stroke: #082c38;\n  stroke-width: 2.8;\n}\n.expedition-style[_ngcontent-%COMP%]   .candidate-route[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%] {\n  stroke: #edce81;\n  stroke-width: 3;\n  stroke-dasharray: 3 8;\n  animation: _ngcontent-%COMP%_passage-flow 12s linear infinite;\n  filter: drop-shadow(0 1px 2px #02111d);\n}\n.expedition-style[_ngcontent-%COMP%]   .candidate-route.selected[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%] {\n  stroke: #fff1ae;\n  stroke-width: 5;\n  stroke-dasharray: 8 5;\n  filter: drop-shadow(0 0 4px rgba(233, 199, 120, 0.7019607843)) drop-shadow(0 0 2px #112e38);\n}\n.expedition-style[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke: #c8e8cd;\n  stroke-width: 3;\n  opacity: 0.8;\n}\n.expedition-style[_ngcontent-%COMP%]   .weather-layer[_ngcontent-%COMP%]    > path[_ngcontent-%COMP%] {\n  stroke: #bddedb;\n  stroke-dasharray: 5 5;\n  animation: _ngcontent-%COMP%_wind-flow 15s linear infinite;\n}\n.expedition-style[_ngcontent-%COMP%]   .weather-layer[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: rgba(180, 202, 207, 0.1254901961);\n  stroke: rgba(171, 196, 208, 0.5137254902);\n}\n.expedition-style[_ngcontent-%COMP%]   .painted-vessel[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 3px 2px rgba(3, 21, 26, 0.7019607843));\n}\n.expedition-style[_ngcontent-%COMP%]   .painted-vessel[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  stroke-width: 0.5;\n}\n.expedition-style[_ngcontent-%COMP%]   .chart-compass[_ngcontent-%COMP%] {\n  opacity: 0.72;\n  right: 22px;\n  bottom: 85px;\n  width: 78px;\n}\n@keyframes _ngcontent-%COMP%_passage-flow {\n  to {\n    stroke-dashoffset: -110;\n  }\n}\n@keyframes _ngcontent-%COMP%_wind-flow {\n  to {\n    stroke-dashoffset: -80;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .expedition-style[_ngcontent-%COMP%]   .candidate-route[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%], \n   .expedition-style[_ngcontent-%COMP%]   .weather-layer[_ngcontent-%COMP%]    > path[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.candidate-route[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.candidate-route[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #fff0bd;\n  stroke-width: 3;\n  stroke-dasharray: 5 7;\n  opacity: 0.9;\n  vector-effect: non-scaling-stroke;\n  filter: drop-shadow(0 0 4px #0b2a2d);\n  pointer-events: none;\n}\n.candidate-route[_ngcontent-%COMP%]   .route-hit[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 18;\n  vector-effect: non-scaling-stroke;\n  pointer-events: stroke;\n}\n.candidate-route[_ngcontent-%COMP%]:hover   .route-option[_ngcontent-%COMP%], \n.candidate-route[_ngcontent-%COMP%]:focus-visible   .route-option[_ngcontent-%COMP%], \n.candidate-route.selected[_ngcontent-%COMP%]   .route-option[_ngcontent-%COMP%] {\n  stroke: #ffe08a;\n  stroke-width: 6;\n  stroke-dasharray: none;\n  opacity: 1;\n  filter: drop-shadow(0 0 8px #102d32) drop-shadow(0 0 3px #fff1b9);\n}\n.route-choice-label[_ngcontent-%COMP%] {\n  fill: #fff5d6;\n  font:\n    800 8px ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-anchor: middle;\n  paint-order: stroke;\n  stroke: #13363a;\n  stroke-width: 3.5;\n  stroke-linejoin: round;\n  pointer-events: none;\n}\n.route-shadow[_ngcontent-%COMP%], \n.route-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  vector-effect: non-scaling-stroke;\n}\n.voyage-routes[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.route-shadow[_ngcontent-%COMP%] {\n  stroke: #17211e;\n  stroke-width: 7;\n  opacity: 0.78;\n}\n.route-line[_ngcontent-%COMP%] {\n  stroke: var(--%NS%route-color);\n  stroke-width: 4;\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));\n  animation: _ngcontent-%COMP%_route-reveal 850ms ease-out both;\n}\n.voyage.context-route[_ngcontent-%COMP%] {\n  opacity: 0.32;\n}\n.voyage.context-route[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-width: 3;\n  filter: none;\n}\n.voyage.context-route[_ngcontent-%COMP%]   .route-shadow[_ngcontent-%COMP%] {\n  opacity: 0.35;\n}\n.voyage.featured[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-width: 6;\n  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4666666667));\n}\n.voyage.featured[_ngcontent-%COMP%]   .route-shadow[_ngcontent-%COMP%] {\n  stroke-width: 10;\n}\n.pattern-long-dash[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-dasharray: 20 10;\n}\n.pattern-short-dash[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-dasharray: 8 7;\n}\n.pattern-dot-dash[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-dasharray: 2 7 15 7;\n}\n.pattern-double[_ngcontent-%COMP%]   .route-line[_ngcontent-%COMP%] {\n  stroke-width: 8;\n}\n.pattern-double[_ngcontent-%COMP%]   .double-line[_ngcontent-%COMP%] {\n  stroke: #1d2a26;\n  stroke-width: 2;\n}\n.event-marker[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: #f0dbc0;\n  stroke: var(--%NS%route-color);\n  stroke-width: 3;\n  vector-effect: non-scaling-stroke;\n}\n.event-marker[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #33251a;\n  font: 900 16px Georgia, serif;\n  text-anchor: middle;\n}\n.weather-layer[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #eef9e7;\n  stroke-width: 3;\n  stroke-dasharray: 14 7;\n  opacity: 0.72;\n  vector-effect: non-scaling-stroke;\n}\n.weather-layer[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: rgba(72, 92, 98, 0.6666666667);\n  stroke: #e6f4ef;\n  stroke-width: 2;\n}\n.weather-layer[_ngcontent-%COMP%]   text[_ngcontent-%COMP%], \n.risk-layer[_ngcontent-%COMP%]   text[_ngcontent-%COMP%], \n.trade-layer[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #edf4e9;\n  font: 800 11px ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-anchor: middle;\n}\n.risk-layer[_ngcontent-%COMP%]   ellipse[_ngcontent-%COMP%] {\n  fill: rgba(165, 63, 54, 0.3333333333);\n  stroke: #90352d;\n  stroke-width: 3;\n  stroke-dasharray: 8 7;\n}\n.trade-layer[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #8e572c;\n  stroke-width: 5;\n  stroke-dasharray: 3 8;\n  opacity: 0.75;\n}\n.trade-layer[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #654124;\n}\n.location[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.port-pin[_ngcontent-%COMP%] {\n  fill: #ede0b7;\n  stroke: #314943;\n  stroke-width: 2.4;\n  vector-effect: non-scaling-stroke;\n}\n.pin-center[_ngcontent-%COMP%] {\n  fill: #765126;\n}\n.location-ring[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 4;\n  vector-effect: non-scaling-stroke;\n}\n.location[_ngcontent-%COMP%]:hover   .location-ring[_ngcontent-%COMP%], \n.location[_ngcontent-%COMP%]:focus-visible   .location-ring[_ngcontent-%COMP%], \n.location.inspected[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%] {\n  stroke: #eff5d6;\n}\n.location.candidate-destination[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%], \n.location.candidate-map-option[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%] {\n  stroke: #ffe08a;\n  stroke-dasharray: 3 3;\n  animation: _ngcontent-%COMP%_destination-pulse 1.6s ease-in-out infinite alternate;\n}\n.location.selected-destination[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%] {\n  stroke: #fff2b8;\n  stroke-width: 7;\n  stroke-dasharray: none;\n}\n.location.active-decision[_ngcontent-%COMP%]   .port-pin[_ngcontent-%COMP%] {\n  fill: #f7cb65;\n  stroke: #173e3d;\n}\n.location.active-decision[_ngcontent-%COMP%]   .location-label[_ngcontent-%COMP%] {\n  fill: #fff6d7;\n  font-weight: 900;\n}\n.location.shared[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%] {\n  stroke: #7b2e66;\n  stroke-dasharray: 4 4;\n}\n.location[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.location-label[_ngcontent-%COMP%], \n.shared-count[_ngcontent-%COMP%], \n.map-option-label[_ngcontent-%COMP%] {\n  fill: #fff1cc;\n  font: 700 11px Georgia, serif;\n  paint-order: stroke;\n  stroke: #102d32;\n  stroke-width: 3;\n  stroke-linejoin: round;\n}\n.map-option-label[_ngcontent-%COMP%] {\n  fill: #ffe08a;\n  font:\n    800 7px ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-anchor: middle;\n  text-transform: uppercase;\n}\n.regional[_ngcontent-%COMP%]   .location-label[_ngcontent-%COMP%] {\n  font-size: 7px;\n  stroke-width: 2.4;\n}\n.shared-count[_ngcontent-%COMP%] {\n  fill: #6b245c;\n  font: 800 10px ui-sans-serif, sans-serif;\n  text-anchor: middle;\n}\n.ship[_ngcontent-%COMP%] {\n  color: #f0c96a;\n  filter: drop-shadow(0 5px 5px rgba(19, 32, 29, 0.7333333333));\n  transition: transform 650ms ease;\n  pointer-events: none;\n}\n.ship[_ngcontent-%COMP%]   ellipse[_ngcontent-%COMP%] {\n  fill: rgba(4, 26, 32, 0.6666666667);\n}\n.ship[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  stroke: #e2be73;\n  stroke-width: 1;\n  vector-effect: non-scaling-stroke;\n}\n.ship[_ngcontent-%COMP%]   .ship-hull[_ngcontent-%COMP%] {\n  fill: #694024;\n}\n.ship[_ngcontent-%COMP%]   .ship-rigging[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #704a2d;\n}\n.ship[_ngcontent-%COMP%]   .ship-sails[_ngcontent-%COMP%] {\n  fill: #fff1c9;\n  stroke: #9f7c43;\n}\n.ship[_ngcontent-%COMP%]   .ship-flag[_ngcontent-%COMP%] {\n  fill: #d87144;\n}\n.ship[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #f5df95;\n  stroke-width: 2;\n  stroke-dasharray: 5 5;\n  vector-effect: non-scaling-stroke;\n  animation: _ngcontent-%COMP%_ship-pulse 1.6s ease-in-out infinite alternate;\n}\n.knowledge-fog[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: rgba(20, 60, 68, 0.1882352941);\n  stroke: none;\n}\n.knowledge-fog[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #e3d7af;\n  font: italic 13px Georgia, serif;\n  letter-spacing: 0.14em;\n  text-anchor: middle;\n}\n.knowledge-fog[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.chart-compass[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 1rem;\n  bottom: 1rem;\n  width: 5.2rem;\n  pointer-events: none;\n  opacity: 0.9;\n  filter: drop-shadow(0 2px 4px #031c24);\n}\n.chart-compass[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow: visible;\n}\n.chart-compass[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: rgba(18, 49, 59, 0.5019607843);\n  stroke: #c3a05a;\n  stroke-width: 0.65;\n}\n.chart-compass[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: #c4a25d;\n  stroke: #f3deb0;\n  stroke-width: 0.5;\n}\n.chart-compass[_ngcontent-%COMP%]   .compass-light[_ngcontent-%COMP%] {\n  fill: #f6eac8;\n}\n.chart-compass[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #f3e6c5;\n  font: 9px Georgia, serif;\n  text-anchor: middle;\n}\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.65rem 1.2rem;\n  padding: 0.65rem 0.85rem;\n  background: #102b30;\n  color: #c2d3cb;\n  font: 0.65rem ui-sans-serif, sans-serif;\n}\n.chart-legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.chart-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 1.1rem;\n}\n.legend-port[_ngcontent-%COMP%] {\n  width: 0.45rem !important;\n  height: 0.45rem;\n  border: 1px solid #f9e9bc;\n  border-radius: 50%;\n  background: #bd9551;\n}\n.legend-route[_ngcontent-%COMP%] {\n  border-top: 2px dashed #efdfab;\n}\n.legend-voyage[_ngcontent-%COMP%] {\n  height: 3px;\n  border-radius: 2px;\n}\n.legend-class[_ngcontent-%COMP%] {\n  height: 3px;\n  border-radius: 2px;\n  background: #aab7ae;\n  opacity: 0.45;\n}\n.pan-pad[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1rem;\n  left: 1rem;\n  display: grid;\n  grid-template-columns: repeat(4, 2.5rem);\n  gap: 0.25rem;\n}\n.pan-pad[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  padding: 0;\n}\n.lens-tray[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  border-top: 1px solid #816a41;\n}\n.lens-tray[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-right: 0.35rem;\n  color: #c8b681;\n  font: 850 0.68rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.lens-tray[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.15rem;\n  font-size: 0.68rem;\n}\n@keyframes _ngcontent-%COMP%_route-reveal {\n  from {\n    opacity: 0;\n    stroke-dashoffset: 40;\n  }\n}\n@keyframes _ngcontent-%COMP%_ship-pulse {\n  to {\n    r: 15;\n    opacity: 0.3;\n  }\n}\n@keyframes _ngcontent-%COMP%_destination-pulse {\n  to {\n    stroke-width: 7;\n    opacity: 0.55;\n  }\n}\n@media (max-width: 760px) {\n  .atlas-tools[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .chart-heading[_ngcontent-%COMP%] {\n    padding: 0.85rem;\n  }\n  .chart-edition[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .cover-switch[_ngcontent-%COMP%], \n   .zoom-tools[_ngcontent-%COMP%] {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n  .world-map[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: 24rem;\n    aspect-ratio: 4/3;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .route-line[_ngcontent-%COMP%], \n   .ship[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], \n   .location.candidate-destination[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%], \n   .location.candidate-map-option[_ngcontent-%COMP%]   .location-ring[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .ship[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.map-stage[_ngcontent-%COMP%] {\n  min-height: var(--%NS%journey-map-min-height, 28rem);\n}\n.world-map[_ngcontent-%COMP%], \n.regional[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%] {\n  height: var(--%NS%journey-map-height, clamp(28rem, 100dvh - 22rem, 46rem));\n  min-height: var(--%NS%journey-map-min-height, 28rem);\n}\n.atlas.immersive[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: minmax(0, 1fr);\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\n.atlas.immersive[_ngcontent-%COMP%]   .map-stage[_ngcontent-%COMP%], \n.atlas.immersive[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%], \n.atlas.immersive.regional[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 0;\n}\n@media (max-width: 760px) {\n  .atlas.immersive[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%], \n   .atlas.immersive.regional[_ngcontent-%COMP%]   .world-map[_ngcontent-%COMP%] {\n    height: 100%;\n    min-height: 0;\n    aspect-ratio: auto;\n  }\n  .atlas.immersive[_ngcontent-%COMP%] {\n    grid-template-rows: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=living-journey-map.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LivingJourneyMapComponent, [{
    type: Component,
    args: [{ selector: "app-living-journey-map", template: `<section\r
  class="atlas"\r
  [class.regional]="cover() === 'regional'"\r
  [class.immersive]="immersive()"
  [class.expedition-style]="expeditionStyle()"
  aria-label="Journey map workspace"\r
>\r
  @if (!immersive()) {\r
    <div class="chart-heading">\r
      <div>\r
        <span class="chart-kicker">Expedition atlas</span>\r
        <h2>{{ map().title }}</h2>\r
      </div>\r
      <span class="chart-edition"\r
        >{{ cover() === 'regional' ? 'Atlantic passage' : 'World overview'\r
        }}<small>Chart your course \xB7 Record your story</small></span\r
      >\r
    </div>\r
    <header class="atlas-tools">\r
      <div class="cover-switch" aria-label="Map scale">\r
        <button\r
          type="button"\r
          [attr.aria-pressed]="cover() === 'regional'"\r
          (click)="setCover('regional')"\r
        >\r
          Atlantic chart\r
        </button>\r
        <button type="button" [attr.aria-pressed]="cover() === 'world'" (click)="setCover('world')">\r
          World chart\r
        </button>\r
      </div>\r
      <div class="zoom-tools" aria-label="Map zoom">\r
        <button\r
          type="button"\r
          aria-label="Zoom out"\r
          [disabled]="zoom() <= 1"\r
          (click)="zoomBy(-0.25)"\r
        >\r
          \u2212\r
        </button>\r
        <output aria-label="Zoom level">{{ (zoom() * 100).toFixed(0) }}%</output>\r
        <button\r
          type="button"\r
          aria-label="Zoom in"\r
          [disabled]="zoom() >= 2.8"\r
          (click)="zoomBy(0.25)"\r
        >\r
          +\r
        </button>\r
        <button type="button" (click)="resetView()">Fit map</button>\r
      </div>\r
    </header>\r
  }\r
\r
  <div class="map-stage">\r
    <svg\r
      class="world-map"\r
      [attr.viewBox]="viewBox()"\r
      tabindex="0"\r
      role="group"\r
      [attr.aria-label]="mapLabel()"\r
      (keydown)="mapKey($event)"
      (pointerdown)="startPan($event)" (pointermove)="dragPan($event)" (pointerup)="endPan()" (pointercancel)="endPan()" (lostpointercapture)="endPan()"
    >\r
      <title>{{ map().title }}</title>\r
      <desc>\r
        Geographic map with recorded voyage routes, available route choices, ports, evidence,\r
        weather, trade, and risk overlays.\r
      </desc>\r
      <defs>\r
        <pattern id="longitude-grid" width="83.333" height="83.333" patternUnits="userSpaceOnUse">\r
          <path\r
            d="M83.333 0H0V83.333"\r
            fill="none"\r
            stroke="#557f82"\r
            stroke-width="0.8"\r
            opacity=".28"\r
          />\r
        </pattern>\r
      </defs>\r
\r
      <image\r
        href="/journey-replay/world-coastlines.svg"\r
        width="1000"\r
        height="500"\r
        preserveAspectRatio="none"\r
        aria-hidden="true"\r
      />\r
      <image\r
        href="/journey-replay/world-atlas-v1.webp"\r
        width="1000"\r
        height="500"\r
        preserveAspectRatio="none"\r
        aria-hidden="true"\r
      />\r
      @if (lensOn('navigation')) {\r
        <g class="navigation-layer" aria-hidden="true">\r
          <rect width="1000" height="500" fill="url(#longitude-grid)" />\r
          <path class="equator" d="M0 250H1000" />\r
          <text class="ocean-label" x="403" y="220" transform="rotate(-12 403 220)">ATLANTIC</text>\r
          <text class="ocean-label" x="398" y="233" transform="rotate(-12 398 233)">OCEAN</text>\r
          <text class="ocean-label" x="692" y="322">INDIAN OCEAN</text>\r
          <text class="ocean-label" x="134" y="275">PACIFIC OCEAN</text>\r
          <text class="land-label" x="523" y="221">AFRICA</text>\r
          <text class="land-label" x="310" y="300" transform="rotate(25 310 300)">\r
            SOUTH AMERICA\r
          </text>\r
        </g>\r
      }\r
\r
      @if (lensOn('weather')) {\r
        <g class="weather-layer" aria-label="Weather lens">\r
          <path d="M402 154C363 168 328 186 301 221" />\r
          <path d="M302 221l15-3-8 13" />\r
          <path d="M431 244C391 262 357 283 329 314" />\r
          <path d="M329 314l15-3-8 13" />\r
          <g transform="translate(390 275)">\r
            <circle r="25" />\r
            <text y="5">STORM</text>\r
          </g>\r
        </g>\r
      }\r
      @if (lensOn('risk')) {\r
        <g class="risk-layer" aria-label="Risk lens">\r
          <ellipse cx="552" cy="344" rx="54" ry="31" />\r
          <ellipse cx="408" cy="276" rx="47" ry="29" />\r
          <text x="552" y="349">HIGH SEAS</text>\r
          <text x="408" y="281">REEFS</text>\r
        </g>\r
      }\r
      @if (lensOn('trade')) {\r
        <g class="trade-layer" aria-label="Trade lens">\r
          <path d="M475 147Q570 116 705 190T792 209" />\r
          <text x="619" y="139">INDIAN OCEAN TRADE</text>\r
        </g>\r
      }\r
\r
      <g class="candidate-routes" aria-label="Available routes">\r
        @for (route of candidateRoutes(); track route.id) {\r
          <g\r
            class="candidate-route"\r
            [class.selected]="selectedRouteId() === route.id"\r
            role="button"\r
            tabindex="0"\r
            [attr.aria-label]="candidateAriaLabel(route)"\r
            (click)="inspectRoute(route.id)"\r
            (keydown.enter)="inspectRoute(route.id)"\r
            (keydown.space)="$event.preventDefault(); inspectRoute(route.id)"\r
          >\r
            <title>{{ candidateAriaLabel(route) }}</title>\r
            <path class="route-hit" [attr.d]="candidatePath(route.id)" />\r
            <path class="route-option" [attr.d]="candidatePath(route.id)" />\r
            @if (showRouteLabels()) { <text
              class="route-choice-label"
              [attr.x]="candidateLabelPoint(route).x"\r
              [attr.y]="candidateLabelPoint(route).y - 7"\r
            >\r
              {{ candidateLabel(route.id) }}\r
            </text> }
          </g>\r
        }\r
      </g>\r
\r
      <g class="voyage-routes" aria-label="Recorded voyage routes">\r
        @for (layer of voyageLayers(); track layer.voyageId) {\r
          <g\r
            [attr.class]="'voyage ' + teamClass(layer.team)"\r
            [class.featured]="featuredVoyageId() === layer.voyageId"\r
            [class.context-route]="\r
              featuredVoyageId() !== undefined && featuredVoyageId() !== layer.voyageId\r
            "\r
            [style.--route-color]="layer.team.color"\r
          >\r
            <path class="route-shadow" [attr.d]="path(layer.route)" />\r
            <path class="route-line" [attr.d]="path(layer.route)" />\r
            @if (layer.team.linePattern === 'double') {\r
              <path class="route-line double-line" [attr.d]="path(layer.route)" />\r
            }\r
            @for (event of layer.events; track $index) {\r
              <g\r
                class="event-marker"\r
                [attr.transform]="\r
                  'translate(' + project(event.point).x + ' ' + project(event.point).y + ')'\r
                "\r
              >\r
                <circle r="7" />\r
                <text y="3">\u2022</text>\r
                <title>{{ layer.team.name }} \xB7 {{ event.label }}</title>\r
              </g>\r
            }\r
          </g>\r
        }\r
      </g>\r
\r
      <g class="locations" aria-label="Map locations">\r
        @for (location of map().locations; track location.id) {\r
          <g\r
            class="location"\r
            [class.inspected]="inspectedLocationId() === location.id"\r
            [class.shared]="intersectionAt(location.id)"\r
            [class.candidate-destination]="candidateDestinationIds().has(location.id)"\r
            [class.candidate-map-option]="candidateLocations().has(location.id)"\r
            [class.selected-destination]="\r
              selectedDestinationId() === location.id ||\r
              selectedCandidateLocationId() === location.id\r
            "\r
            [class.active-decision]="activeLocationId() === location.id"\r
            [attr.transform]="\r
              'translate(' + locationPoint(location).x + ' ' + locationPoint(location).y + ')'\r
            "\r
            role="button"\r
            tabindex="0"\r
            [attr.aria-label]="locationAriaLabel(location)"\r
            (click)="inspect(location)"\r
            (keydown.enter)="inspect(location)"\r
            (keydown.space)="$event.preventDefault(); inspect(location)"\r
          >\r
            <g [attr.transform]="cover() === 'regional' ? 'scale(.62)' : null">\r
              <circle class="location-ring" r="14" />\r
              <path class="port-pin" d="M0-8A7 7 0 0 1 7-1C7 4 0 10 0 10S-7 4-7-1A7 7 0 0 1 0-8Z" />\r
              <circle class="pin-center" cy="-1" r="2" />\r
            </g>\r
            <text\r
              class="location-label"\r
              [attr.x]="labelPlacement(location).x"\r
              [attr.y]="labelPlacement(location).y"\r
              [attr.text-anchor]="labelPlacement(location).anchor"\r
            >\r
              {{ location.shortName }}\r
            </text>\r
            @if (candidateLocationLabels()[location.id]; as optionLabel) {\r
              <text class="map-option-label" y="-16">{{ optionLabel }}</text>\r
            }\r
            @if (intersectionAt(location.id); as shared) {\r
              <text class="shared-count" y="-13">{{ shared.voyageIds.length }} routes</text>\r
            }\r
          </g>\r
        }\r
      </g>\r
\r
      @if (currentPoint(); as ship) {\r
        <g\r
          class="ship"\r
          [attr.transform]="'translate(' + project(ship).x + ' ' + project(ship).y + ')'"\r
          aria-label="Current expedition position"\r
        >\r
          @if (expeditionStyle() && vesselArt()) {
            <g class="painted-vessel" transform="translate(0 -14) scale(.45)">
              <ellipse cx="0" cy="7" rx="18" ry="3" />
              <path d="M-17-18Q-6-16 4-18L3-3Q-8 0-18-3ZM6-17Q14-15 23-17L21-5Q13-2 6-4Z" fill="#ecdcaa" stroke="#8b7856" stroke-width=".3"/>
              <image [attr.href]="vesselArt()" x="-35" y="-30" width="70" height="46.7"/>
            </g>
          } @else { <g
            [attr.transform]="
              cover() === 'regional' ? 'translate(0 -13) scale(.65)' : 'translate(0 -18)'\r
            "\r
          >\r
            <ellipse cy="10" rx="19" ry="4" />\r
            <path class="ship-hull" d="M-19 2Q0 7 19 0L12 11H-10Z" />\r
            <path class="ship-rigging" d="M-4-30V5M9-22V4M-17-2L-4-28 18-1" />\r
            <path\r
              class="ship-sails"\r
              d="M-6-27Q-17-15-13-5L-6-6ZM-2-28Q13-17 6-7H-2ZM11-21Q22-12 17-5L11-4Z"\r
            />\r
            <path class="ship-flag" d="M-4-30L6-29-4-25Z" />\r
          </g> }
          <circle r="11" />\r
        </g>\r
      }\r
\r
      @if (route().length < 5 && classVoyages().length === 0) {\r
        <g class="knowledge-fog" aria-label="Uncharted regions">\r
          <path d="M620 75Q740 42 965 95L990 420Q802 462 666 427T620 75Z" />\r
          <text x="785" y="260">TERRA INCOGNITA</text>\r
        </g>\r
      }\r
    </svg>\r
    <div class="chart-compass" aria-hidden="true">\r
      <svg viewBox="0 0 100 100">\r
        <circle cx="50" cy="50" r="34" />\r
        <circle cx="50" cy="50" r="29" />\r
        <path d="M50 13L57 43 87 50 57 57 50 87 43 57 13 50 43 43Z" />\r
        <path\r
          class="compass-light"\r
          d="M50 13V50L43 43ZM87 50H50L57 43ZM50 87V50L57 57ZM13 50H50L43 57Z"\r
        />\r
        <text x="50" y="10">N</text>\r
        <text x="50" y="99">S</text>\r
        <text x="5" y="54">W</text>\r
        <text x="95" y="54">E</text>\r
      </svg>\r
    </div>\r
\r
    @if (zoom() > 1) {\r
      <div class="pan-pad" aria-label="Pan map">\r
        <button type="button" aria-label="Pan left" (click)="pan(-45, 0)">\u2190</button>\r
        <button type="button" aria-label="Pan up" (click)="pan(0, -32)">\u2191</button>\r
        <button type="button" aria-label="Pan down" (click)="pan(0, 32)">\u2193</button>\r
        <button type="button" aria-label="Pan right" (click)="pan(45, 0)">\u2192</button>\r
      </div>\r
    }\r
  </div>\r
  @if (!immersive()) {\r
    <div class="chart-legend" aria-label="Map legend">\r
      <span><i class="legend-port"></i>Ports &amp; waypoints</span>\r
      <span><i class="legend-route"></i>Possible passage</span>\r
      <span\r
        ><i class="legend-voyage" [style.background]="team().color"></i\r
        >{{ featuredVoyageId() ? 'Featured voyage' : 'Recorded voyage' }}</span\r
      >\r
      @if (featuredVoyageId() && classVoyages().length > 1) {\r
        <span><i class="legend-class"></i>Other class voyages</span>\r
      }\r
    </div>\r
\r
    <footer class="lens-tray" aria-label="Map lenses">\r
      <span>Chart overlays</span>\r
      @for (lens of map().lenses; track lens) {\r
        <button type="button" [attr.aria-pressed]="lensOn(lens)" (click)="toggleLens(lens)">\r
          {{ lens }}\r
        </button>\r
      }\r
    </footer>\r
  }\r
</section>\r
`, styles: ['/* src/app/templates/journey-replay/ui/map/living-journey-map.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #eee0bd;\n}\n* {\n  box-sizing: border-box;\n}\n.atlas {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid #aa8c50;\n  border-radius: 0.6rem;\n  background: #151d1c;\n  box-shadow: 0 1.2rem 3rem rgba(5, 9, 8, 0.6), inset 0 0 0 3px rgba(183, 154, 88, 0.1254901961);\n}\n.chart-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  background:\n    linear-gradient(\n      115deg,\n      #173b3c,\n      #0c2429);\n}\n.chart-kicker {\n  color: #dbb86f;\n  font: 800 0.6rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n}\n.chart-heading h2 {\n  margin: 0.25rem 0 0;\n  color: #f3e6c6;\n  font: 400 clamp(1.25rem, 2vw, 1.8rem) Georgia, serif;\n}\n.chart-edition {\n  color: #d8c794;\n  font: italic 0.8rem Georgia, serif;\n  text-align: right;\n}\n.chart-edition small {\n  display: block;\n  margin-top: 0.35rem;\n  color: #9bb6b1;\n  font: 0.6rem ui-sans-serif, sans-serif;\n}\n.atlas-tools,\n.lens-tray {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  padding: 0.55rem 0.7rem;\n  background:\n    linear-gradient(\n      90deg,\n      #172724,\n      #21352d 50%,\n      #17241f);\n}\n.atlas-tools {\n  border-bottom: 1px solid #816a41;\n}\n.cover-switch,\n.zoom-tools {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\nbutton {\n  min-height: 2.45rem;\n  border: 1px solid #806b43;\n  border-radius: 0.35rem;\n  padding: 0.42rem 0.66rem;\n  color: #e9ddbd;\n  background: #283c34;\n  font:\n    750 0.76rem/1.1 ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-transform: capitalize;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled),\nbutton[aria-pressed=true] {\n  border-color: #e8c774;\n  color: #1e2823;\n  background: #dfc47c;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\n.world-map:focus-visible {\n  outline: 3px solid #72d4dc;\n  outline-offset: 2px;\n}\noutput {\n  min-width: 3.4rem;\n  color: #ddc88e;\n  font: 750 0.75rem ui-monospace, monospace;\n  text-align: center;\n}\n.map-stage {\n  position: relative;\n  min-height: 28rem;\n  overflow: hidden;\n  background: #143c44;\n}\n.map-stage::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 4rem rgba(3, 26, 36, 0.5019607843), inset 0 0 0 5px rgba(212, 189, 117, 0.1411764706);\n}\n.world-map {\n  display: block;\n  width: 100%;\n  height: clamp(28rem, 100dvh - 22rem, 46rem);\n  min-height: 28rem;\n  background: #143c44;\n  transition: background 180ms ease;\n}\n.navigation-layer {\n  pointer-events: none;\n}\n.equator {\n  fill: none;\n  stroke: #efe0a8;\n  stroke-width: 0.5;\n  stroke-dasharray: 3 5;\n  opacity: 0.3;\n}\n.ocean-label {\n  fill: #c1d8cb;\n  opacity: 0.68;\n  font: italic 9px Georgia, serif;\n  letter-spacing: 2px;\n  text-anchor: middle;\n}\n.land-label {\n  fill: #f2e4b8;\n  font: 7px Georgia, serif;\n  letter-spacing: 1.7px;\n  text-anchor: middle;\n  paint-order: stroke;\n  stroke: #463e26;\n  stroke-width: 0.5;\n}\n.candidate-route {\n  cursor: pointer;\n}\n.expedition-style .world-map {\n  touch-action: none;\n  cursor: grab;\n}\n.expedition-style .world-map:active {\n  cursor: grabbing;\n}\n.expedition-style .world-map > image {\n  filter: saturate(0.86) contrast(1.12) brightness(0.91);\n}\n.expedition-style .map-stage::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  box-shadow: inset 0 0 110px rgba(2, 27, 45, 0.5019607843);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(232, 195, 106, 0.0509803922),\n      transparent 45%,\n      rgba(1, 29, 45, 0.0941176471));\n}\n.expedition-style .location:not(.candidate-destination):not(.active-decision):not(.inspected) .location-label {\n  opacity: 0.45;\n  font-weight: 400;\n}\n.expedition-style .location:hover .location-label,\n.expedition-style .location:focus-visible .location-label {\n  opacity: 1 !important;\n}\n.expedition-style .candidate-destination .location-label,\n.expedition-style .active-decision .location-label {\n  fill: #ffedaf;\n  stroke: #082c38;\n  stroke-width: 2.8;\n}\n.expedition-style .candidate-route .route-option {\n  stroke: #edce81;\n  stroke-width: 3;\n  stroke-dasharray: 3 8;\n  animation: passage-flow 12s linear infinite;\n  filter: drop-shadow(0 1px 2px #02111d);\n}\n.expedition-style .candidate-route.selected .route-option {\n  stroke: #fff1ae;\n  stroke-width: 5;\n  stroke-dasharray: 8 5;\n  filter: drop-shadow(0 0 4px rgba(233, 199, 120, 0.7019607843)) drop-shadow(0 0 2px #112e38);\n}\n.expedition-style .route-line {\n  stroke: #c8e8cd;\n  stroke-width: 3;\n  opacity: 0.8;\n}\n.expedition-style .weather-layer > path {\n  stroke: #bddedb;\n  stroke-dasharray: 5 5;\n  animation: wind-flow 15s linear infinite;\n}\n.expedition-style .weather-layer circle {\n  fill: rgba(180, 202, 207, 0.1254901961);\n  stroke: rgba(171, 196, 208, 0.5137254902);\n}\n.expedition-style .painted-vessel {\n  filter: drop-shadow(0 3px 2px rgba(3, 21, 26, 0.7019607843));\n}\n.expedition-style .painted-vessel path {\n  stroke-width: 0.5;\n}\n.expedition-style .chart-compass {\n  opacity: 0.72;\n  right: 22px;\n  bottom: 85px;\n  width: 78px;\n}\n@keyframes passage-flow {\n  to {\n    stroke-dashoffset: -110;\n  }\n}\n@keyframes wind-flow {\n  to {\n    stroke-dashoffset: -80;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .expedition-style .candidate-route .route-option,\n  .expedition-style .weather-layer > path {\n    animation: none;\n  }\n}\n.candidate-route:focus {\n  outline: none;\n}\n.candidate-route .route-option {\n  fill: none;\n  stroke: #fff0bd;\n  stroke-width: 3;\n  stroke-dasharray: 5 7;\n  opacity: 0.9;\n  vector-effect: non-scaling-stroke;\n  filter: drop-shadow(0 0 4px #0b2a2d);\n  pointer-events: none;\n}\n.candidate-route .route-hit {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 18;\n  vector-effect: non-scaling-stroke;\n  pointer-events: stroke;\n}\n.candidate-route:hover .route-option,\n.candidate-route:focus-visible .route-option,\n.candidate-route.selected .route-option {\n  stroke: #ffe08a;\n  stroke-width: 6;\n  stroke-dasharray: none;\n  opacity: 1;\n  filter: drop-shadow(0 0 8px #102d32) drop-shadow(0 0 3px #fff1b9);\n}\n.route-choice-label {\n  fill: #fff5d6;\n  font:\n    800 8px ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-anchor: middle;\n  paint-order: stroke;\n  stroke: #13363a;\n  stroke-width: 3.5;\n  stroke-linejoin: round;\n  pointer-events: none;\n}\n.route-shadow,\n.route-line {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  vector-effect: non-scaling-stroke;\n}\n.voyage-routes {\n  pointer-events: none;\n}\n.route-shadow {\n  stroke: #17211e;\n  stroke-width: 7;\n  opacity: 0.78;\n}\n.route-line {\n  stroke: var(--route-color);\n  stroke-width: 4;\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));\n  animation: route-reveal 850ms ease-out both;\n}\n.voyage.context-route {\n  opacity: 0.32;\n}\n.voyage.context-route .route-line {\n  stroke-width: 3;\n  filter: none;\n}\n.voyage.context-route .route-shadow {\n  opacity: 0.35;\n}\n.voyage.featured .route-line {\n  stroke-width: 6;\n  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4666666667));\n}\n.voyage.featured .route-shadow {\n  stroke-width: 10;\n}\n.pattern-long-dash .route-line {\n  stroke-dasharray: 20 10;\n}\n.pattern-short-dash .route-line {\n  stroke-dasharray: 8 7;\n}\n.pattern-dot-dash .route-line {\n  stroke-dasharray: 2 7 15 7;\n}\n.pattern-double .route-line {\n  stroke-width: 8;\n}\n.pattern-double .double-line {\n  stroke: #1d2a26;\n  stroke-width: 2;\n}\n.event-marker circle {\n  fill: #f0dbc0;\n  stroke: var(--route-color);\n  stroke-width: 3;\n  vector-effect: non-scaling-stroke;\n}\n.event-marker text {\n  fill: #33251a;\n  font: 900 16px Georgia, serif;\n  text-anchor: middle;\n}\n.weather-layer path {\n  fill: none;\n  stroke: #eef9e7;\n  stroke-width: 3;\n  stroke-dasharray: 14 7;\n  opacity: 0.72;\n  vector-effect: non-scaling-stroke;\n}\n.weather-layer circle {\n  fill: rgba(72, 92, 98, 0.6666666667);\n  stroke: #e6f4ef;\n  stroke-width: 2;\n}\n.weather-layer text,\n.risk-layer text,\n.trade-layer text {\n  fill: #edf4e9;\n  font: 800 11px ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-anchor: middle;\n}\n.risk-layer ellipse {\n  fill: rgba(165, 63, 54, 0.3333333333);\n  stroke: #90352d;\n  stroke-width: 3;\n  stroke-dasharray: 8 7;\n}\n.trade-layer path {\n  fill: none;\n  stroke: #8e572c;\n  stroke-width: 5;\n  stroke-dasharray: 3 8;\n  opacity: 0.75;\n}\n.trade-layer text {\n  fill: #654124;\n}\n.location {\n  cursor: pointer;\n}\n.port-pin {\n  fill: #ede0b7;\n  stroke: #314943;\n  stroke-width: 2.4;\n  vector-effect: non-scaling-stroke;\n}\n.pin-center {\n  fill: #765126;\n}\n.location-ring {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 4;\n  vector-effect: non-scaling-stroke;\n}\n.location:hover .location-ring,\n.location:focus-visible .location-ring,\n.location.inspected .location-ring {\n  stroke: #eff5d6;\n}\n.location.candidate-destination .location-ring,\n.location.candidate-map-option .location-ring {\n  stroke: #ffe08a;\n  stroke-dasharray: 3 3;\n  animation: destination-pulse 1.6s ease-in-out infinite alternate;\n}\n.location.selected-destination .location-ring {\n  stroke: #fff2b8;\n  stroke-width: 7;\n  stroke-dasharray: none;\n}\n.location.active-decision .port-pin {\n  fill: #f7cb65;\n  stroke: #173e3d;\n}\n.location.active-decision .location-label {\n  fill: #fff6d7;\n  font-weight: 900;\n}\n.location.shared .location-ring {\n  stroke: #7b2e66;\n  stroke-dasharray: 4 4;\n}\n.location:focus {\n  outline: none;\n}\n.location-label,\n.shared-count,\n.map-option-label {\n  fill: #fff1cc;\n  font: 700 11px Georgia, serif;\n  paint-order: stroke;\n  stroke: #102d32;\n  stroke-width: 3;\n  stroke-linejoin: round;\n}\n.map-option-label {\n  fill: #ffe08a;\n  font:\n    800 7px ui-sans-serif,\n    system-ui,\n    sans-serif;\n  text-anchor: middle;\n  text-transform: uppercase;\n}\n.regional .location-label {\n  font-size: 7px;\n  stroke-width: 2.4;\n}\n.shared-count {\n  fill: #6b245c;\n  font: 800 10px ui-sans-serif, sans-serif;\n  text-anchor: middle;\n}\n.ship {\n  color: #f0c96a;\n  filter: drop-shadow(0 5px 5px rgba(19, 32, 29, 0.7333333333));\n  transition: transform 650ms ease;\n  pointer-events: none;\n}\n.ship ellipse {\n  fill: rgba(4, 26, 32, 0.6666666667);\n}\n.ship path {\n  stroke: #e2be73;\n  stroke-width: 1;\n  vector-effect: non-scaling-stroke;\n}\n.ship .ship-hull {\n  fill: #694024;\n}\n.ship .ship-rigging {\n  fill: none;\n  stroke: #704a2d;\n}\n.ship .ship-sails {\n  fill: #fff1c9;\n  stroke: #9f7c43;\n}\n.ship .ship-flag {\n  fill: #d87144;\n}\n.ship circle {\n  fill: none;\n  stroke: #f5df95;\n  stroke-width: 2;\n  stroke-dasharray: 5 5;\n  vector-effect: non-scaling-stroke;\n  animation: ship-pulse 1.6s ease-in-out infinite alternate;\n}\n.knowledge-fog path {\n  fill: rgba(20, 60, 68, 0.1882352941);\n  stroke: none;\n}\n.knowledge-fog text {\n  fill: #e3d7af;\n  font: italic 13px Georgia, serif;\n  letter-spacing: 0.14em;\n  text-anchor: middle;\n}\n.knowledge-fog {\n  pointer-events: none;\n}\n.chart-compass {\n  position: absolute;\n  right: 1rem;\n  bottom: 1rem;\n  width: 5.2rem;\n  pointer-events: none;\n  opacity: 0.9;\n  filter: drop-shadow(0 2px 4px #031c24);\n}\n.chart-compass svg {\n  display: block;\n  width: 100%;\n  overflow: visible;\n}\n.chart-compass circle {\n  fill: rgba(18, 49, 59, 0.5019607843);\n  stroke: #c3a05a;\n  stroke-width: 0.65;\n}\n.chart-compass path {\n  fill: #c4a25d;\n  stroke: #f3deb0;\n  stroke-width: 0.5;\n}\n.chart-compass .compass-light {\n  fill: #f6eac8;\n}\n.chart-compass text {\n  fill: #f3e6c5;\n  font: 9px Georgia, serif;\n  text-anchor: middle;\n}\n.chart-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.65rem 1.2rem;\n  padding: 0.65rem 0.85rem;\n  background: #102b30;\n  color: #c2d3cb;\n  font: 0.65rem ui-sans-serif, sans-serif;\n}\n.chart-legend span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.chart-legend i {\n  display: inline-block;\n  width: 1.1rem;\n}\n.legend-port {\n  width: 0.45rem !important;\n  height: 0.45rem;\n  border: 1px solid #f9e9bc;\n  border-radius: 50%;\n  background: #bd9551;\n}\n.legend-route {\n  border-top: 2px dashed #efdfab;\n}\n.legend-voyage {\n  height: 3px;\n  border-radius: 2px;\n}\n.legend-class {\n  height: 3px;\n  border-radius: 2px;\n  background: #aab7ae;\n  opacity: 0.45;\n}\n.pan-pad {\n  position: absolute;\n  bottom: 1rem;\n  left: 1rem;\n  display: grid;\n  grid-template-columns: repeat(4, 2.5rem);\n  gap: 0.25rem;\n}\n.pan-pad button {\n  width: 2.5rem;\n  padding: 0;\n}\n.lens-tray {\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  border-top: 1px solid #816a41;\n}\n.lens-tray > span {\n  margin-right: 0.35rem;\n  color: #c8b681;\n  font: 850 0.68rem ui-sans-serif, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.lens-tray button {\n  min-height: 2.15rem;\n  font-size: 0.68rem;\n}\n@keyframes route-reveal {\n  from {\n    opacity: 0;\n    stroke-dashoffset: 40;\n  }\n}\n@keyframes ship-pulse {\n  to {\n    r: 15;\n    opacity: 0.3;\n  }\n}\n@keyframes destination-pulse {\n  to {\n    stroke-width: 7;\n    opacity: 0.55;\n  }\n}\n@media (max-width: 760px) {\n  .atlas-tools {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .chart-heading {\n    padding: 0.85rem;\n  }\n  .chart-edition {\n    display: none;\n  }\n  .cover-switch,\n  .zoom-tools {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n  .world-map {\n    height: auto;\n    min-height: 24rem;\n    aspect-ratio: 4/3;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .route-line,\n  .ship circle,\n  .location.candidate-destination .location-ring,\n  .location.candidate-map-option .location-ring {\n    animation: none;\n  }\n  .ship {\n    transition: none;\n  }\n}\n.map-stage {\n  min-height: var(--journey-map-min-height, 28rem);\n}\n.world-map,\n.regional .world-map {\n  height: var(--journey-map-height, clamp(28rem, 100dvh - 22rem, 46rem));\n  min-height: var(--journey-map-min-height, 28rem);\n}\n.atlas.immersive {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: minmax(0, 1fr);\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\n.atlas.immersive .map-stage,\n.atlas.immersive .world-map,\n.atlas.immersive.regional .world-map {\n  height: 100%;\n  min-height: 0;\n}\n@media (max-width: 760px) {\n  .atlas.immersive .world-map,\n  .atlas.immersive.regional .world-map {\n    height: 100%;\n    min-height: 0;\n    aspect-ratio: auto;\n  }\n  .atlas.immersive {\n    grid-template-rows: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=living-journey-map.component.css.map */\n'] }]
  }], null, { map: [{ type: Input, args: [{ isSignal: true, alias: "map", required: true }] }], route: [{ type: Input, args: [{ isSignal: true, alias: "route", required: false }] }], team: [{ type: Input, args: [{ isSignal: true, alias: "team", required: true }] }], candidateRouteIds: [{ type: Input, args: [{ isSignal: true, alias: "candidateRouteIds", required: false }] }], candidateRouteLabels: [{ type: Input, args: [{ isSignal: true, alias: "candidateRouteLabels", required: false }] }], selectedRouteId: [{ type: Input, args: [{ isSignal: true, alias: "selectedRouteId", required: false }] }], candidateLocationIds: [{ type: Input, args: [{ isSignal: true, alias: "candidateLocationIds", required: false }] }], candidateLocationLabels: [{ type: Input, args: [{ isSignal: true, alias: "candidateLocationLabels", required: false }] }], selectedCandidateLocationId: [{ type: Input, args: [{ isSignal: true, alias: "selectedCandidateLocationId", required: false }] }], activeLocationId: [{ type: Input, args: [{ isSignal: true, alias: "activeLocationId", required: false }] }], immersive: [{ type: Input, args: [{ isSignal: true, alias: "immersive", required: false }] }], showRouteLabels: [{ type: Input, args: [{ isSignal: true, alias: "showRouteLabels", required: false }] }], expeditionStyle: [{ type: Input, args: [{ isSignal: true, alias: "expeditionStyle", required: false }] }], vesselArt: [{ type: Input, args: [{ isSignal: true, alias: "vesselArt", required: false }] }], classVoyages: [{ type: Input, args: [{ isSignal: true, alias: "classVoyages", required: false }] }], featuredVoyageId: [{ type: Input, args: [{ isSignal: true, alias: "featuredVoyageId", required: false }] }], intersections: [{ type: Input, args: [{ isSignal: true, alias: "intersections", required: false }] }], mapLabel: [{ type: Input, args: [{ isSignal: true, alias: "mapLabel", required: false }] }], locationInspected: [{ type: Output, args: ["locationInspected"] }], routeInspected: [{ type: Output, args: ["routeInspected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LivingJourneyMapComponent, { className: "LivingJourneyMapComponent", filePath: "src/app/templates/journey-replay/ui/map/living-journey-map.component.ts", lineNumber: 30 });
})();

export {
  LivingJourneyMapComponent
};
//# debugId=9148bacd-c181-537f-b0da-befc6a4a9d61
//# sourceMappingURL=chunk-G7WLRBLS.js.map
